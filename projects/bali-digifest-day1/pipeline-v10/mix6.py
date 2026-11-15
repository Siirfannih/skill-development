"""Mix audio Bali Digifest day 1 dari edl.json -> stems + mix.wav (48 kHz stereo).
Lapisan: VO (audio asli testimoni) · NAT (suara asli tiap b-roll) · MUSIK (lagu tema resmi) · SFX.
Level mengikuti audio.md §14.10: blok narasumber -14,5 LUFS, musik di bawah suara -23 LUFS, master -14,2 LUFS / TP <= -1.
v3: VO dari DeepFilterNet (atten-lim 18 dB) + EQ/kompresi ringan, VO -14,5 LUFS, musik di bawah ucapan -29 LUFS.
v6 (Irfan 13 Nov): semua kemunculan audio naik/turun perlahan (ease in/out), kecuali bagian ending.
v5: potongan VO dalam satu bite disambung rapat (crossfade 10 ms); nat b-roll di-duck -16 dB dari amplop VO;
hook: sorakan asli dulu, lagu resmi masuk di edl.music_in dengan level -13,5 LUFS.
Pakai: python mix5.py edl5.json sfx5.json outdir
"""
import json, sys, glob, subprocess, numpy as np, soundfile as sf, pyloudnorm as pyln, os
from paths6 import src_path

SR = 48000
edl = json.load(open(sys.argv[1])); cues = json.load(open(sys.argv[2])); out = sys.argv[3]
os.makedirs(out, exist_ok=True)
N = int(edl['dur'] * SR) + SR
meter = pyln.Meter(SR)

def load(path, a=None, b=None, mono=True):
    args = ['ffmpeg', '-v', 'error']
    if a is not None: args += ['-ss', f'{a:.4f}']
    if b is not None: args += ['-t', f'{b - a:.4f}']
    args += ['-i', path, '-map', '0:a:0', '-ac', '1' if mono else '2', '-ar', str(SR), '-f', 'f32le', '-']
    x = np.frombuffer(subprocess.run(args, capture_output=True, check=True).stdout, np.float32).copy()
    return x if mono else x.reshape(-1, 2)

def fade(x, fin, fout):
    n = len(x); i = min(int(fin * SR), n); o = min(int(fout * SR), n)
    if i: x[:i] *= (np.sin(np.linspace(0, np.pi / 2, i)) ** 2)[:, None] if x.ndim == 2 else np.sin(np.linspace(0, np.pi / 2, i)) ** 2
    if o: x[n - o:] *= (np.cos(np.linspace(0, np.pi / 2, o)) ** 2)[:, None] if x.ndim == 2 else np.cos(np.linspace(0, np.pi / 2, o)) ** 2
    return x

def lufs(x):
    y = x if x.ndim == 2 else np.stack([x, x], 1)
    return meter.integrated_loudness(y) if len(y) > SR * 0.4 else -70

def place(bus, x, t):
    i = int(round(t * SR))
    if i < 0: x = x[-i:]; i = 0
    j = min(i + len(x), len(bus)); bus[i:j] += x[:j - i]

VOSRC = {'0361': [(10, '../v3/vo_src/dfn18/0361_10_DeepFilterNet3.wav')], '0378': [(10, 'vo_src/dfn24/0378_10_DeepFilterNet3.wav')],
         '0530': [(105, 'vo_src/dfn24/0530_105_DeepFilterNet3.wav')], '0525': [(172, 'vo_src/dfn24/0525_172_DeepFilterNet3.wav')],
         '0426': [(12, 'vo_src/dfn24/0426_12_DeepFilterNet3.wav')], '0531': [(95, 'vo_src/dfn24/0531_95_DeepFilterNet3.wav')],
         '0399': [(36, 'vo_src/dfn24/0399_36_DeepFilterNet3.wav')],
         '0704': [(0, 'raw23/dfn24/a_0704_DeepFilterNet3.wav')], '0712': [(0, 'raw23/dfn24/a_0712_DeepFilterNet3.wav')],
         '0713': [(0, 'raw23/dfn24/a_0713_DeepFilterNet3.wav')], '0718': [(0, 'raw23/dfn24/a_0718_DeepFilterNet3.wav')],
         '0723': [(0, 'raw23/dfn24/a_0723_DeepFilterNet3.wav')]}
VOCHAIN = 'highpass=f=85,equalizer=f=250:t=q:w=1.2:g=-2,equalizer=f=3200:t=q:w=1.0:g=3,acompressor=threshold=-24dB:ratio=2.5:attack=8:release=120:makeup=1'
def vo_load(clip, a, b):
    c = clip.split('/')[-1]
    off, f = [x for x in VOSRC[c] if x[0] <= a][-1]
    args = ['ffmpeg', '-v', 'error', '-ss', f'{a-off:.4f}', '-t', f'{b-a:.4f}', '-i', f, '-af', VOCHAIN, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-']
    return np.frombuffer(subprocess.run(args, capture_output=True, check=True).stdout, np.float32).copy()

def raw(clip): return src_path(clip)

# ---------- VO: blok per pembicara, satu gain linear per blok (tanpa kompresor; sumber diukur bersih) ----------
vo = np.zeros(N, np.float32)
blocks = {}
for p in edl['vo']:
    blocks.setdefault(p['clip'] + ':' + p['bite'], []).append(p)
for key, ps in blocks.items():
    parts = []
    for k, p in enumerate(ps):
        nxt_cut = k + 1 < len(ps) and ps[k + 1].get('cut_in')
        pre = p.get('pre', 0.06) if k == 0 else (0.0 if p.get('cut_in') else 0.005); post = p.get('post', 0.14) if k == len(ps) - 1 else (0.0 if nxt_cut else 0.005)   # v8: ruang terukur (sil6)
        x = vo_load(p['clip'], p['a'] - pre, p['b'] + post)
        # v7: di jeda koma setelah potongan isi, fade 40 ms supaya kata tidak terdengar terpancung
        x = fade(x, pre if k == 0 else (0.04 if p.get('cut_in') else 0.010), max(post, 0.03) if k == len(ps) - 1 else (0.04 if nxt_cut else 0.010))
        parts.append((x, p['v'] - pre))
    cat = np.concatenate([x for x, _ in parts])
    g = 10 ** ((-14.5 - lufs(cat)) / 20)
    for x, t in parts:
        L = lufs(x); adj = np.clip(-14.5 - (L + 20*np.log10(g)), -3, 3) if L > -60 else 0  # ratakan potongan yang jauh dari blok
        place(vo, x * g * 10 ** (adj / 20), t)
    print(f'VO {key}: gain {20*np.log10(g):+.1f} dB')

# ---------- NAT: suara asli b-roll; level = LUFS target per shot, ease in/out 0,35 dtk ----------
nat = np.zeros(N, np.float32); natd = np.zeros(N, np.float32)   # natd = di-duck oleh VO
for s in edl['shots']:
    if s.get('talk') or 'nat' not in s: continue
    d = s['v1'] - s['v0']
    FI = s.get('fade_in', 0.35); FO = s.get('fade_out', 0.35)          # ease in/out; bersilangan dengan shot tetangga
    x = load(raw(s['clip']), max(0, s['src'] - FI / 2), s['src'] + d + FO / 2)
    L = lufs(x); g = 10 ** ((s['nat'] - L) / 20) if L > -60 else 0
    place(natd, fade(x * g, FI, FO), s['v0'] - FI / 2)

# ---------- NAT FX: sorakan/tepuk tangan asli + suasana ruangan menerus (tidak ada detik sunyi) ----------
for e in edl.get('natfx', []):
    x = load(raw(e['clip']), e['src'], e['src'] + e['dur'])
    L = lufs(x); g = 10 ** ((e['lv'] - L) / 20) if L > -60 else 0
    place(natd if e.get('duck', True) else nat, fade(x * g, e.get('fi', 0.5 if e['dur'] > 5 else 0.12), e.get('fo', 0.5 if e['dur'] > 5 else 0.4)), e['v'])
# ducking dari amplop VO: -16 dB saat VO bicara (serang 60 ms, lepas 250 ms), 0 dB di celah
h = SR // 100; env = np.array([np.sqrt(np.mean(vo[i:i + h] ** 2)) for i in range(0, N, h)])
act = (20 * np.log10(env + 1e-9) > -45).astype(np.float32)
k = 25; act = np.convolve(act, np.ones(2 * k + 1), 'same') > 0         # v8d: tahan 250 ms -> satu kalimat = satu redaman (tanpa pumping di sela kata)
g = np.zeros(len(act), np.float32); cur = 0.0
for i, a in enumerate(act):
    tgt = -16.0 if a else 0.0; cur += (tgt - cur) * (1 - np.exp(-0.01 / (0.12 if tgt < cur else 0.40))); g[i] = cur   # v8d: serang 120 ms, lepas 400 ms
nat += natd * np.repeat(10 ** (g / 20), h)[:N]
print('nat duck: aktif %.1f%% waktu' % (100 * act.mean()))

# ---------- MUSIK ----------
mus = np.zeros((N, 2), np.float32)
lv = {'M0': -13.5, 'M1': -17.0, 'M2': -27.0, 'M2b': -27.0, 'M3': -15.5}
for m in edl['music']:
    x = load(m['file'], m['a'], m['b'], mono=False)
    g = 10 ** ((lv[m['id']] - lufs(x)) / 20)
    x = x * g
    if m['id'] in ('M2', 'M2b'):  # ratakan bed: auto-gain RMS 1 dtk, maks +-8 dB, dihaluskan 1,5 dtk
        h = SR // 2; mono = x.mean(1)
        r = np.array([np.sqrt(np.mean(mono[i:i + 2 * h] ** 2) + 1e-12) for i in range(0, len(mono), h)])
        rdb = 20 * np.log10(r); gdb = np.clip(np.median(rdb) - rdb, -8, 8)
        k = 3; gdb = np.convolve(np.pad(gdb, k, mode='edge'), np.ones(2 * k + 1) / (2 * k + 1), 'valid')
        x = x * (10 ** (np.interp(np.arange(len(x)), np.arange(len(gdb)) * h + h, gdb) / 20))[:, None]
        x = x * 10 ** ((lv[m['id']] - lufs(x)) / 20)
    if m['id'] == 'M0': x = fade(x, m.get('fade_in', 0.6), 0.6)        # lagu hook naik perlahan
    if m['id'] == 'M1': x = fade(x, 0.02, 0.06)
    if m['id'] == 'M2': x = fade(x, 0.4, m.get('xfade_out', 0.45))           # masuk lembut di bawah hook, stop-down sebelum chorus
    if m['id'] == 'M2b': x = fade(x, m.get('xfade_in', 1.0), 0.45)       # v9: sambungan loop bed (crossfade 1 dtk)
    if m['id'] == 'M3': x = fade(x, 0.005, 0.9)
    i = int(m['v'] * SR); mus[i:i + len(x)] += x[:N - i]
# automation M2: naik +4 dB di jendela tanpa ucapan (ramp 300 ms), bergerak <=1,5 dB saat kata
auto = np.zeros(N, np.float32)
for a, b, db in edl.get('music_auto', []):
    i, j = int(a * SR), int(b * SR); r = int(0.3 * SR)
    env = np.ones(j - i, np.float32) * db; env[:r] = np.linspace(0, db, r); env[-r:] = np.linspace(db, 0, r)
    auto[i:j] = env
mus *= (10 ** (auto / 20))[:, None]
# bagian lagu yang lebih padat di bawah satu potongan VO: turunkan sampai -24,5 LUFS (ramp 300 ms di luar kata)
duck = np.zeros(N, np.float32)
for p in edl['vo']:
    a, b = int(p['v'] * SR), int((p['v'] + p['b'] - p['a']) * SR)
    over = lufs(mus[a:b]) - p.get('duck', -31.0)   # v8g: -29 -> -31 (Irfan: hanya suara pembicara)          # v7: hook -23 (lagu tetap terasa), bagian lain -29
    if over > 0.3:
        r = int(0.3 * SR); env = np.full(b - a + 2 * r, -over, np.float32)
        env[:r] = np.linspace(0, -over, r); env[-r:] = np.linspace(-over, 0, r)
        i0 = max(0, a - r); env = env[i0 - (a - r):]; duck[i0:b + r] = np.minimum(duck[i0:b + r], env[:len(duck[i0:b + r])])   # v9: suara mulai di 0,04 dtk
mus *= (10 ** (duck / 20))[:, None]
# v7: jeda antar-potongan VO >= 0,4 dtk -> musik naik sampai campuran musik+nat ~ -22 dBFS (Irfan: "suara tiba-tiba hilang"
# sesudah "seni"). Ramp 120 ms dari ujung kata, turun lagi 120 ms sebelum kata berikutnya; naik maks +12 dB.
gap = np.zeros(N, np.float32); vos = sorted(edl['vo'], key=lambda p: p['v'])
for p, q in zip(vos, vos[1:]):
    e = p['v'] + p['b'] - p['a']; s_ = q['v']
    if s_ - e < 0.4: continue
    a, b = int((e + 0.03) * SR), int((s_ - 0.03) * SR); r = int(0.12 * SR)
    lvl = 20 * np.log10(np.sqrt(np.mean((mus[a:b].mean(1) + nat[a:b]) ** 2)) + 1e-9)
    db = float(np.clip(-22.0 - lvl, 0, 12))
    if db < 0.5: continue
    env = np.full(b - a, db, np.float32); env[:r] = np.linspace(0, db, r); env[-r:] = np.linspace(db, 0, r)
    gap[a:b] = np.maximum(gap[a:b], env)
    print(f"jeda {p['id']}->{q['id']} {s_ - e:.2f} dtk: musik {lvl:.1f} dBFS -> +{db:.1f} dB")
mus *= (10 ** (gap / 20))[:, None]

# ---------- SFX ----------
sfx = np.zeros(N, np.float32)
for c in cues:
    x = load(os.path.expanduser(c['file']))
    pk = np.max(np.abs(x)) + 1e-9
    x = x / pk * 10 ** (c['gain'] / 20)                  # gain relatif puncak 0 dBFS
    place(sfx, fade(x, 0.005, 0.05), c['t'] - c['peak'])  # puncak SFX tepat di frame event

# ---------- MASTER ----------
st = lambda m: np.stack([m, m], 1)
mix = st(vo) + st(nat) + mus + st(sfx)
for name, b in [('vo', st(vo)), ('nat', st(nat)), ('music', mus), ('sfx', st(sfx))]:
    sf.write(f'{out}/stem_{name}.wav', b[:int(edl['dur'] * SR)], SR, subtype='PCM_24')
mix = mix[:int(edl['dur'] * SR)]
g = 10 ** ((-14.2 - lufs(mix)) / 20); mix *= g
sf.write(f'{out}/mix_pre.wav', mix, SR, subtype='PCM_24')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'{out}/mix_pre.wav', '-af',
                'aresample=192000,alimiter=limit=0.85:attack=1:release=50:level=false,aresample=48000',
                '-c:a', 'pcm_s16le', f'{out}/mix.wav'], check=True)
y, _ = sf.read(f'{out}/mix.wav')
print(f'master: {meter.integrated_loudness(y):.2f} LUFS, gain {20*np.log10(g):+.1f} dB')
