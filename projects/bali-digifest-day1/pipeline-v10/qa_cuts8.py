"""QA v8d: setiap batas potongan VO (awal, akhir, sambungan) -> apakah SUMBER masih bersuara tepat di luar titik potong.
Terpancung bila energi 40 ms di luar titik potong > ref-20 dB (ref = p90 bite). Ini definisi terukur 'suara hilang tiba-tiba'."""
import json, numpy as np, soundfile as sf, re
src = open('sil6.py').read(); SRC = eval(src[src.index('SRC = ') + 6:src.index('}', src.index('SRC = ')) + 1])
sp = json.load(open('speech6.json')); bad = 0; n = 0
cache = {}
for bid, d in sp.items():
    off, f = [q for q in SRC[d['clip']] if q[0] <= d['parts'][0][0]][-1]
    if f not in cache:
        x, sr = sf.read(f); cache[f] = (x.mean(1) if x.ndim == 2 else x, sr)
    x, sr = cache[f]
    def db(t0, t1):
        s = x[max(0, int((t0 - off) * sr)):int((t1 - off) * sr)]; return 20 * np.log10(np.sqrt(np.mean(s ** 2)) + 1e-9) if len(s) else -99
    a0, b0 = d['parts'][0][0], d['parts'][-1][1]
    ref = np.percentile([db(t, t + 0.01) for t in np.arange(a0, b0, 0.01)], 90)
    for k, (a, b) in enumerate(d['parts']):
        for kind, t0, t1, t in (('awal', a - 0.04, a, a), ('akhir', b, b + 0.04, b)):
            n += 1; v = db(t0, t1) - ref
            if v > -20:
                bad += 1; print(f'{bid:4s} potongan {k} {kind} {t:.2f}: sumber masih bersuara {v:+.0f} dB dari ref  <<< TERPANCUNG')
print(f'batas terpancung: {bad}/{n}')
