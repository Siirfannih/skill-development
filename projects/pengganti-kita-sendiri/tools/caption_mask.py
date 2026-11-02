"""captionMask.json untuk CaptionTrack (v11 Worker T) dari probe seluruh film.
python3 tools/caption_mask.py <probeDir> [--step 2] [--scale 0.25] > remotion/src/lib/captionMask.json
  emph : interval frame [a,b,teks] saat teks penekanan (kind text/speaker, bukan caption:) tampil di layar
  lum  : luminansi relatif ×1000 pita caption (x 400–1520, y 772–828) per sampel `step` frame, piksel warna caption dibuang
stderr: persentase kata VO yang tampil (caption + penekanan) + daftar kata yang hilang.
"""
import sys, os, re, json, glob, collections
import numpy as np
from PIL import Image

d = sys.argv[1]
step = int(sys.argv[sys.argv.index('--step') + 1]) if '--step' in sys.argv else 2
scale = float(sys.argv[sys.argv.index('--scale') + 1]) if '--scale' in sys.argv else 0.25
here = os.path.dirname(os.path.abspath(__file__))
WORDS = json.load(open(os.path.join(here, '../remotion/src/timeline.json')))['words']

def lum(c):
    c = np.asarray(c, float) / 255
    c = np.where(c <= 0.03928, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
    return 0.2126 * c[..., 0] + 0.7152 * c[..., 1] + 0.0722 * c[..., 2]

on = collections.defaultdict(set)  # frame -> nama teks penekanan
for ln in open(os.path.join(d, 'obj.log')):
    p = ln.split()
    if len(p) < 9 or p[2] not in ('text', 'speaker') or p[8].startswith('caption:'): continue
    f = int(p[1]); x, y, w, h = map(float, p[3:7])
    if y < -500000: y += 1e6
    if x + w < 0 or y + h < 0 or x > 1920 or y > 1080: continue
    on[f].add(p[8])

frames = sorted(int(os.path.basename(q)[1:6]) for q in glob.glob(os.path.join(d, 'f*.jpg')))
if '--emph-only' in sys.argv:
    # v22: interval penekanan TEPAT per frame dari probe setiap frame (node seg2_probe.mjs <dir> 0 133 1 0.1) → ganti kunci "emph"
    # captionMask.json saja (lum/busy tetap dari probe step 2):  python3 caption_mask.py <dir> --emph-only --patch <captionMask.json>
    iv = []
    for f in sorted(on):
        if iv and f <= iv[-1][1] + 1:
            iv[-1][1] = f; iv[-1][2] |= on[f]
        else:
            iv.append([f, f, set(on[f])])
    em = [[a, b, ' '.join(sorted(n))] for a, b, n in iv]
    tgt = sys.argv[sys.argv.index('--patch') + 1]
    M = json.load(open(tgt)); M['emph'] = em; M['emphStep'] = 1
    json.dump(M, open(tgt, 'w'), ensure_ascii=False, separators=(',', ':'))
    print(f"emph per frame: {len(em)} interval → {tgt}", file=sys.stderr)
    sys.exit(0)
# interval = sampel pertama..terakhir yang memuat teks (sampel berurutan digabung). Frame di antara sampel untuk teks lib
# (AnchorWord/SpeakerWords) tetap tertutup tepat oleh CSS :has([data-emph]) di CaptionTrack.
iv = []
for f in sorted(on):
    a, b = f, f
    if iv and a <= iv[-1][1] + step:
        iv[-1][1] = max(iv[-1][1], b); iv[-1][2] |= on[f]
    else:
        iv.append([a, b, set(on[f])])
emph = [[a, b, ' '.join(sorted(n))] for a, b, n in iv]

CAP = [np.array([0xFA, 0xF8, 0xEC]), np.array([0x14, 0x16, 0x1A])]
LT, LI = 0.9046, 0.0077  # luminansi #FAF8EC dan #14161A
cr = lambda a, b: (max(a, b) + 0.05) / (min(a, b) + 0.05)
nS = (max(frames) // step + 1) if frames else 0
lumv = [None] * nS
bad = [None] * nS
for f in frames:
    img = np.asarray(Image.open(os.path.join(d, f'f{f:05d}.jpg')).convert('RGB')).astype(float)
    band = img[int(772 * scale):int(828 * scale), int(470 * scale):int(1450 * scale)].reshape(-1, 3)
    keep = np.ones(len(band), bool)
    for c in CAP: keep &= np.abs(band - c).sum(1) > 60
    px = band[keep] if keep.sum() > 0.2 * len(band) else band
    L = lum(px)
    med = float(np.median(L))
    lumv[f // step] = int(round(1000 * med))
    # objek UI/terang-gelap campur di pita caption → caption tak terbaca/menimpa objek: (a) tepi rapat (UI, chip, grid)
    # (b) dengan tinta terbaik, > 22 % piksel pita kontras < 3:1 (mis. bidang putih 06c/06d di bawah teks putih)
    g = img[int(760 * scale):int(836 * scale), int(470 * scale):int(1450 * scale)].mean(2)
    edge = np.abs(np.diff(g, axis=1)).mean() + np.abs(np.diff(g, axis=0)).mean()
    ink = LI if med > 0.19 else LT
    low = float(np.mean([(max(l, ink) + 0.05) / (min(l, ink) + 0.05) < 3 for l in L[::3]]))
    mc = band.mean(0)
    grid = mc[2] - mc[0] > 60  # grid biru (02b/04c): garis tipis, caption putih tetap terbaca → bukan "objek di pita"
    bad[f // step] = (edge > 18 and not grid) or low > 0.22
last = 0; lb = False
for i in range(nS):  # isi sampel kosong dengan tetangga terdekat sebelumnya
    if lumv[i] is None: lumv[i], bad[i] = last, lb
    last, lb = lumv[i], bad[i]
# haluskan: median ±3 sampel (tinta tidak berkedip; sembunyi hanya bila mayoritas sekitar sibuk)
lum_s = [int(np.median(lumv[max(0, i - 2):i + 3])) for i in range(nS)]
bad_s = [sum(bad[max(0, i - 3):i + 4]) * 2 > len(bad[max(0, i - 3):i + 4]) for i in range(nS)]
busy = []
for i, v in enumerate(bad_s):
    if not v: continue
    a_, b_ = i * step, i * step + step - 1
    if busy and a_ <= busy[-1][1] + 1: busy[-1][1] = b_
    else: busy.append([a_, b_])
lumv = lum_s

json.dump({'step': step, 'emph': emph, 'busy': busy, 'lum': lumv}, sys.stdout, ensure_ascii=False, separators=(',', ':'))

# cakupan kata VO
norm = lambda s: re.sub(r'[^a-z0-9]', '', s.lower())
inE = lambda f: any(a <= f <= b for a, b, _ in emph)
inB = lambda f: any(a <= f <= b for a, b in busy)
shown = miss = 0; lost = []
for w in WORDS:
    t = re.sub(r'^[^\w]+|[^\w]+$', '', w['w'])
    if not t: continue
    f = int(np.ceil(w['s'] * 30 - 1e-6))
    if not inE(f) and not inB(f): shown += 1; continue
    names = set()
    for g in range(f - 20, int(w['e'] * 30) + 20):
        names |= {norm(x) for n in on.get(g, ()) for x in re.split(r'[:_]', n)}
    joined = ''.join(sorted(names))
    if norm(t) in names or (len(norm(t)) > 3 and norm(t) in joined) or all(norm(x) in names for x in re.split(r'-', t) if x): shown += 1
    else: miss += 1; lost.append(f"{w['s']:.1f}s {w['w']}({w['src']}{',UI' if not inE(f) else ''})")
tot = shown + miss
print(f"\nCAKUPAN kata VO tampil: {shown}/{tot} = {100 * shown / max(1, tot):.1f} %", file=sys.stderr)
print("hilang: " + ', '.join(lost), file=sys.stderr)
