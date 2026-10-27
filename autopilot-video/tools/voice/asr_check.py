# Cek mekanis kejelasan VO: transkripsi faster-whisper lalu hitung WER terhadap naskah.
import sys, re, json
from faster_whisper import WhisperModel
wav, ref = sys.argv[1], open(sys.argv[2]).read()
m = WhisperModel("medium", device="cpu", compute_type="int8")
import soundfile as sf, numpy as np, scipy.signal as ss
x, sr = sf.read(wav)
x = x.mean(1) if x.ndim > 1 else x
x = ss.resample_poly(x, 16000, sr).astype(np.float32)
segs, _ = m.transcribe(x, language="id", vad_filter=True)
hyp = " ".join(s.text for s in segs)
norm = lambda t: re.sub(r"[^a-z0-9 ]", " ", t.lower()).split()
r, h = norm(ref), norm(hyp)
d = [[0] * (len(h) + 1) for _ in range(len(r) + 1)]
for i in range(len(r) + 1): d[i][0] = i
for j in range(len(h) + 1): d[0][j] = j
for i in range(1, len(r) + 1):
    for j in range(1, len(h) + 1):
        d[i][j] = min(d[i-1][j] + 1, d[i][j-1] + 1, d[i-1][j-1] + (r[i-1] != h[j-1]))
print("WER", round(d[-1][-1] / len(r), 3))
print("HYP", hyp.strip())
