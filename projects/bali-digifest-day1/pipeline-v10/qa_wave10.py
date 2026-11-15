"""QA v10 (aturan Irfan: jangan pernah memotong gelombang yang masih ada). Untuk setiap batas potongan VO,
ukur 20 ms TERAKHIR yang dipakai (ujung) dan 20 ms PERTAMA yang dipakai (awal) relatif lantai noise bite.
Gagal bila masih bergelombang (> lantai+10 dB dan > ref-26 dB), artinya gelombang dipancung di tengah."""
import json, numpy as np, soundfile as sf
src = open('sil6.py').read(); SRC = eval(src[src.index('SRC = ') + 6:src.index('}', src.index('SRC = ')) + 1])
sp = json.load(open('speech6.json')); bad = 0; n = 0; cache = {}
for bid, d in sp.items():
    if bid in ('H', 'Q', 'T1b') and False: continue
    off, f = [q for q in SRC[d['clip']] if q[0] <= d['parts'][0][0]][-1]
    if f not in cache:
        x, sr = sf.read(f); cache[f] = (x.mean(1) if x.ndim == 2 else x, sr)
    x, sr = cache[f]
    db = lambda t0, t1: 20 * np.log10(np.sqrt(np.mean(x[max(0, int((t0 - off) * sr)):int((t1 - off) * sr)] ** 2)) + 1e-9)
    e = [db(t, t + 0.01) for t in np.arange(d['parts'][0][0], d['parts'][-1][1], 0.01)]
    ref, floor = np.percentile(e, 90), np.percentile(e, 10); lim = max(ref - 26, floor + 10)
    for k, (a, b) in enumerate(d['parts']):
        for kind, v in (('awal', db(a, a + 0.02)), ('ujung', db(b - 0.02, b))):
            n += 1
            if v > lim: bad += 1; print(f'{bid:4s} potongan {k} {kind} {a if kind == "awal" else b:.2f}: masih bergelombang {v - ref:+.0f} dB dari puncak (batas {lim - ref:+.0f})')
print(f'batas memotong gelombang: {bad}/{n}')
