#!/usr/bin/env python3
"""snap_words.py (alat lokal ep01, bukan gerbang): rapatkan s/e tiap kata dari faster-whisper ke energi suara nyata.
Whisper sering memperpanjang e kata sampai menelan jeda sesudahnya (cut_check lalu gagal 'diam_kata' dan recut menolak
rentang karena guard 50 ms). Ambang diam = sama dengan cut_check: max(median ucapan - 18 dB, lantai noise p10 + 8 dB).
  snap_words.py suara.wav words_in.json words_out.json
"""
import json, sys
import numpy as np, soundfile as sf
wav, words_in, words_out = sys.argv[1:4]
x, sr = sf.read(wav, always_2d=True); x = x.mean(axis=1)
hop = int(sr * 0.01)
n = len(x) // hop
rms = np.array([np.sqrt(np.mean(x[i*hop:(i+1)*hop] ** 2) + 1e-12) for i in range(n)])
db = 20 * np.log10(rms + 1e-9)
speech = db[db > np.percentile(db, 30)]
med = np.median(speech)
floor = np.percentile(db, 10)
thr = max(med - 18, floor + 8)
W = json.load(open(words_in))
W = W if isinstance(W, list) else W["words"]
out = []
for i, w in enumerate(W):
    lo = int(max(0, w["s"] - 0.12) / 0.01); hi = int(min(n * 0.01, w["e"] + 0.04) / 0.01)
    if i > 0: lo = max(lo, int((W[i-1]["e"] + w["s"]) / 2 / 0.01) if W[i-1]["e"] > w["s"] else lo)
    idx = [k for k in range(lo, min(hi, n)) if db[k] >= thr]
    if idx:
        run_end = idx[0]
        for k in idx[1:]:
            if k - run_end <= 12: run_end = k   # lompatan diam > 0,12 dtk = kata berikutnya, bukan bagian kata ini
            else: break
        s2 = idx[0] * 0.01; e2 = (run_end + 1) * 0.01
        if i + 1 < len(W): e2 = min(e2, W[i+1]["e"])  # jangan melewati kata berikut
    else:
        s2, e2 = w["s"], w["e"]
    out.append({"w": w["w"], "s": round(s2, 3), "e": round(max(e2, s2 + 0.03), 3)})
json.dump(out, open(words_out, "w"), ensure_ascii=False, indent=0)
print(f"ambang {thr:.1f} dBFS · kata {len(out)} · rata-rata dipangkas {np.mean([a['e']-a['s']-(b['e']-b['s']) for a,b in zip(out,W)]):+.3f} dtk")
