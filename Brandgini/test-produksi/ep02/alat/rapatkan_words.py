"""Merapatkan s/e tiap kata ke energi suara nyata (frame 10 ms di atas ambang diam). Whisper pada TTS menelan jeda ke durasi kata."""
import json, sys
import numpy as np, soundfile as sf
wav, words, out, thr_db = sys.argv[1], sys.argv[2], sys.argv[3], float(sys.argv[4])
x, sr = sf.read(wav); x = x if x.ndim == 1 else x.mean(1)
h = int(sr * 0.01); n = len(x) // h
rms = 20 * np.log10(np.sqrt((x[:n * h].reshape(n, h) ** 2).mean(1)) + 1e-9)
W = json.load(open(words)); R = []
for w in W:
    a, b = int(w["s"] * 100), min(n, int(np.ceil(w["e"] * 100)))
    idx = [i for i in range(a, b) if rms[i] > thr_db]
    if idx:
        w = dict(w); w["s"] = round(idx[0] / 100, 3); w["e"] = round((idx[-1] + 1) / 100, 3)
    R.append(w)
json.dump(R, open(out, "w"), ensure_ascii=False)
print("kata", len(R), "digeser:", sum(1 for a, b in zip(W, R) if abs(a["s"]-b["s"]) > .005 or abs(a["e"]-b["e"]) > .005))
