"""Rentang buang per celah antarkata (words rapat). Titik potong di grid 100 Hz yang lolos kriteria recut.endpoint_quiet (20 ms di sisi dipakai <= batas relatif)
dan guard 0,06 dtk ke kata. Memilih rentang terpanjang yang mungkin; celah tanpa titik aman dilewati."""
import json, sys, itertools
import numpy as np, soundfile as sf
wav, wj, out = sys.argv[1:4]
x, sr = sf.read(wav); x = x if x.ndim == 1 else x.mean(1)
hop = int(0.01 * sr)
fr = 20 * np.log10(np.sqrt(np.array([np.mean(x[i:i + hop] ** 2) for i in range(0, len(x) - hop, hop)])) + 1e-9)
lim = max(float(np.percentile(fr, 90)) - 32.0, float(np.percentile(fr, 10)) + 10.0)
def db(a, b):
    seg = x[int(round(a * sr)):int(round(b * sr))]; return 20 * np.log10(np.sqrt(np.mean(seg ** 2)) + 1e-9) if len(seg) else -120
W = json.load(open(wj)); R = []; skip = 0; G = 0.052
for a, b in zip(W, W[1:]):
    kal = a["w"].rstrip().endswith((".", "?", "!"))
    keep_min = 0.26 if kal else 0.03          # sisa jeda minimum (antarkalimat ±0,28; tengah kalimat ≤ 0,12)
    lo, hi = a["e"] + G, b["s"] - G
    g0, g1 = int(np.ceil(lo * 100)), int(np.floor(hi * 100))
    cs = [i for i in range(g0, g1 + 1) if db(i / 100 - .02, i / 100) <= lim]   # titik awal buang
    ce = [i for i in range(g0, g1 + 1) if db(i / 100, i / 100 + .02) <= lim]   # titik akhir buang
    best = None
    for s in cs:
        for e in ce:
            if e > s and (b["s"] - a["e"]) - (e - s) / 100 >= keep_min - 1e-6:
                if best is None or e - s > best[1] - best[0]: best = (s, e)
    if best and (best[1] - best[0]) >= 2: R.append([round(best[0] / 100, 4), round(best[1] / 100, 4), ("antarkalimat " if kal else "tengah kalimat ") + a["w"] + "->" + b["w"]])
    else: skip += 1
json.dump(R, open(out, "w"), ensure_ascii=False, indent=0)
print("batas relatif", round(lim, 1), "dBFS;", len(R), "rentang, total", round(sum(r[1]-r[0] for r in R), 2), "dtk; celah dilewati:", skip)
