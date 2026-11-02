"""Gerbang QC per frame: teks berkedip / terburu-buru (WORKER-BRIEF-V22, Irfan 3 Nov 05.31).
«teks yang muncul itu muncul, terus hilang, terus muncul lagi, padahal masih teks yang sama … harusnya diam dulu, nunggu VO selesai».

Pakai:
  node remotion/seg2_probe.mjs <dir> 0 133 1 0.1          # SETIAP frame (efek 1–3 f tidak terlihat bila sampel per 8 f)
  node tools/kinetic_dump.mjs > <dir>/blocks.json          # tabel blok teks VO dari kode yang SAMA dengan probe
  python3 tools/text_flicker_check.py <dir> [--blocks <dir>/blocks.json] [--from F --to F] > report.md

Sumber: log OBJ (probe DOM Remotion). Blok VO = baris `caption:<kata> blk=<idx> ex=<0..1>` (KineticVO), penekanan = baris
kind text/speaker lain (anchor:<teks>, speaker:<kata>, text:<…>). Terlihat = kotak di layar dan (blok VO) ex < 0,9.

Temuan:
  (a) DIP          blok VO id sama: terlihat → hilang ≤ 15 f → terlihat lagi
  (b) CEPAT        blok VO tampil < max(1,0 dtk; 0,4 dtk + 0,2 dtk × jumlah kata)  (pengecualian beralasan: ALLOW_B)
  (c) DULUAN HILANG blok hilang sebelum akhir ucapan kata terakhirnya (timeline e) + 0,25 dtk ke layar KOSONG,
                   atau hilang (diganti apa pun) sebelum kata terakhir selesai diucapkan,
                   atau animasi keluar dimulai sebelum kata terakhir selesai diucapkan.
                   Diganti langsung (≤ 2 f) oleh blok VO berikutnya / teks penekanan / potongan adegan (beats.json) SETELAH kata
                   terakhir selesai = serah terima,
                   bukan temuan (brief v22: «diam sampai VO selesai + ≥ 0,4 dtk, ATAU sampai blok berikutnya mulai»).
  (d) KEDIP PENEKANAN  AnchorWord/SpeakerWords nama sama: terlihat → hilang ≤ 15 f → terlihat lagi
Info (tidak menggagalkan): KOSONG = jeda tanpa teks VO < 6 f di antara dua blok VO berbeda (kedip antar blok).
LOLOS = 0 temuan a/c/d dan 0 temuan b di luar ALLOW_B.
"""
import sys, os, re, json, glob, collections

GAP = 15          # f: hilang lalu muncul lagi dalam jendela ini = kedip
FPS = 30
# Pengecualian (b) — kunci = teks lengkap blok, nilai = alasan. Kosongkan bila tidak ada.
ALLOW_B: dict[str, str] = {
    "membangun": "terjepit penekanan «BERLOMBA-LOMBA» (dikunci, s/d f375) dan «pengganti kita sendiri» (f400): tampil sepanjang ucapan",
    "untuk mengambil": "terjepit cut 03d (f1602) dan penekanan «tempat kita» (f1626): tampil sepanjang seluruh ucapan sampai penekanan mengambil alih",
    "It is a legitimate": "ucapan Altman terjepit penekanan «single person billion-dollar» (f2162): tampil sejak kata pertama sampai penekanan",
    "AI yang": "terjepit penekanan «tools» (f2560) dan «sama» (f2591): tampil sepanjang ucapan",
}

args = sys.argv[1:]
d = args[0]
opt = lambda k, dv=None: args[args.index(k) + 1] if k in args else dv
blocks_p = opt('--blocks', os.path.join(d, 'blocks.json'))
fA, fB = int(opt('--from', -1)), int(opt('--to', 10 ** 9))

if '--all-frames' in args:  # simulasi (log OBJ sintetis tanpa still): anggap setiap frame 0..N tersampel
    frames = list(range(int(opt('--all-frames')) + 1))
else:
    frames = sorted(int(os.path.basename(q)[1:6]) for q in glob.glob(os.path.join(d, 'f*.jpg')))
frames = [f for f in frames if fA <= f <= fB]
if not frames:
    sys.exit('tidak ada still f*.jpg di ' + d)
steps = collections.Counter(b - a for a, b in zip(frames, frames[1:]))
if steps and max(steps) > 1:
    print(f"> PERINGATAN: sampel tidak tiap frame (langkah {dict(steps)}); kedip 1–3 f bisa terlewat.\n")
fset = set(frames)

BLK = {b['idx']: b for b in json.load(open(blocks_p))} if os.path.exists(blocks_p) else {}
if not BLK:
    print(f"> PERINGATAN: {blocks_p} tidak ada — (b)/(c) tidak bisa dihitung.\n")

cap = collections.defaultdict(dict)   # idx -> {frame: ex}
emph = collections.defaultdict(set)   # name -> frames
for ln in open(os.path.join(d, 'obj.log')):
    p = ln.split()
    if len(p) < 9 or p[2] not in ('text', 'speaker'):
        continue
    f = int(p[1])
    if f not in fset:
        continue
    x, y, w, h = map(float, p[3:7])
    if y < -500000:
        y += 1e6
    if x + w < 0 or y + h < 0 or x > 1920 or y > 1080 or w < 1:
        continue
    name = p[8]
    if name.startswith('caption:'):
        kv = dict(t.split('=', 1) for t in p[9:] if '=' in t)
        if 'blk' not in kv:
            continue
        ex = float(kv.get('ex', 0))
        if ex >= 0.9:
            continue
        cap[int(kv['blk'])][f] = ex
    else:
        emph[name].add(f)

def runs(fs):
    """frame terlihat → daftar [a,b] berurutan (berdasar frame tersampel)"""
    out = []
    idx = {f: i for i, f in enumerate(frames)}
    for f in sorted(fs):
        if out and idx[f] == idx[out[-1][1]] + 1:
            out[-1][1] = f
        else:
            out.append([f, f])
    return out

def dips(rs):
    return [(a[1], b[0]) for a, b in zip(rs, rs[1:]) if b[0] - a[1] - 1 <= GAP]

# potongan adegan (beats.json): teks VO tidak menyeberang cut — hilang TEPAT di cut setelah kata terakhir selesai = serah terima
_here = os.path.dirname(os.path.abspath(__file__))
try:
    CUTS = {round(p['t'] * FPS) for p in json.load(open(os.path.join(_here, '../remotion/src/beats.json')))['panels']}
except OSError:
    CUTS = set()
on_any = collections.defaultdict(set)  # frame -> teks apa pun yang terlihat
for i, fs in cap.items():
    for f in fs: on_any[f].add(('c', i))
for n, fs in emph.items():
    for f in fs: on_any[f].add(('e', n))

A, Bf, C, D, INFO = [], [], [], [], []
DUR, STRICT = [], []  # statistik: lama tampil per blok; hilang < e+0,25 dtk termasuk serah terima
for i, fs in sorted(cap.items()):
    rs = runs(fs)
    blk = BLK.get(i)
    txt = ' '.join(w['t'] for w in blk['words']) if blk else f'#{i}'
    for a, b in dips(rs):
        A.append((a, f"blk {i} «{txt}» hilang f{a + 1}–{b - 1} ({b - a - 1} f) lalu muncul lagi f{b}"))
    first, last = rs[0][0], rs[-1][1]
    if not blk:
        continue
    n = len(blk['words'])
    need = max(1.0, 0.4 + 0.2 * n) * FPS
    dur = last - first + 1
    if dur < need:
        why = ALLOW_B.get(txt)
        Bf.append((first, f"blk {i} «{txt}» tampil {dur} f < {need:.0f} f ({n} kata)" + (f" — DIKECUALIKAN: {why}" if why else ""), bool(why)))
    endF = blk['words'][-1]['endF']
    DUR.append(dur)
    if last != frames[-1] and last + 1 < endF + 0.25 * FPS:
        STRICT.append(i)
    if last == frames[-1]:
        pass  # blok masih tampil di ujung rentang yang diperiksa
    elif last + 1 < endF:
        C.append((last, f"blk {i} «{txt}» hilang f{last + 1} sebelum kata terakhir «{blk['words'][-1]['t']}» selesai diucapkan f{endF}"))
    elif last + 1 < endF + 0.25 * FPS and (last + 1) not in CUTS and not any(g in on_any and on_any[g] - {('c', i)} for g in (last + 1, last + 2)):
        C.append((last, f"blk {i} «{txt}» hilang ke layar kosong f{last + 1}, ucapan «{blk['words'][-1]['t']}» selesai f{endF} (+7,5 f = {endF + 7.5:.0f})"))
    ex0 = min((f for f, e in fs.items() if e > 0.001), default=None)
    if ex0 is not None and ex0 < endF:
        C.append((ex0, f"blk {i} «{txt}» animasi keluar mulai f{ex0} sebelum kata terakhir selesai f{endF}"))
    exs = [f for f, e in fs.items() if e > 0.001]
    if exs and (max(exs) - min(exs) + 1) > 6:
        INFO.append((min(exs), f"blk {i} «{txt}» animasi keluar {max(exs) - min(exs) + 1} f (> 6 f)"))

for name, fs in sorted(emph.items()):
    for a, b in dips(runs(fs)):
        D.append((a, f"{name} hilang f{a + 1}–{b - 1} ({b - a - 1} f) lalu muncul lagi f{b}"))

# info: jeda kosong singkat antar blok VO berbeda (kedip antar blok)
spans = sorted((min(fs), max(fs), i) for i, fs in cap.items())
for (a0, a1, i), (b0, b1, j) in zip(spans, spans[1:]):
    g = b0 - a1 - 1
    if 0 < g < 6:
        INFO.append((a1, f"KOSONG {g} f antara blk {i} dan blk {j} (f{a1 + 1}–{b0 - 1})"))

nb = sum(1 for *_, ok in Bf if not ok)
print(f"# Gerbang kedip teks per frame ({d})\n")
print(f"Frame diperiksa: {len(frames)} (f{frames[0]}–f{frames[-1]}) · blok VO terlihat: {len(cap)} · teks penekanan: {len(emph)}\n")
if DUR:
    ds = sorted(DUR)
    print(f"Blok VO tampil: {len(ds)} · median {ds[len(ds) // 2] / FPS:.2f} dtk · < 1,5 dtk: {sum(x < 45 for x in ds)} · "
          f"hilang < akhir ucapan + 0,25 dtk termasuk serah terima (ketat): {len(STRICT)}\n")
print("| temuan | jumlah |\n|---|---|")
print(f"| (a) DIP | {len(A)} |\n| (b) CEPAT | {nb} (+{len(Bf) - nb} dikecualikan) |\n| (c) DULUAN HILANG | {len(C)} |\n| (d) KEDIP PENEKANAN | {len(D)} |\n| info | {len(INFO)} |\n")
for title, rows in (("(a) DIP", A), ("(b) CEPAT", [(f, t) for f, t, _ in Bf]), ("(c) DULUAN HILANG", C), ("(d) KEDIP PENEKANAN", D), ("info", INFO)):
    if not rows:
        continue
    print(f"\n## {title}\n")
    for f, t in sorted(rows):
        print(f"- {f // FPS // 60}:{f / FPS % 60:05.2f} (f{f}) {t}")
ok = not A and not C and not D and nb == 0
print("\nLOLOS" if ok else "\nGAGAL")
print(f"FLICKER a={len(A)} b={nb} c={len(C)} d={len(D)} -> {'LOLOS' if ok else 'GAGAL'}", file=sys.stderr)
