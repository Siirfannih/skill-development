#!/usr/bin/env python3
"""bersih_jeda.py (alat lokal ep01): redam jeda sunyi di stem TTS (-24 dB, ramp 25 ms, margin 60 ms dari ucapan) seperti perbaikan
terbukti builder-trap-r2/voice_clean.py. Berbasis energi, bukan timestamp ASR. Ucapan tidak disentuh.
  bersih_jeda.py in.wav out.wav
"""
import sys, numpy as np, soundfile as sf
x, sr = sf.read(sys.argv[1], always_2d=True, dtype="float32"); m = x.mean(1)
hop = int(sr*0.01); n = len(m)//hop
db = np.array([20*np.log10(np.sqrt(np.mean(m[i*hop:(i+1)*hop]**2))+1e-9) for i in range(n)])
sp = db[db > np.percentile(db, 30)]; thr = max(np.median(sp)-18, np.percentile(db,10)+8)
quiet = db < thr; g = np.ones(n)
i = 0
while i < n:
    if quiet[i]:
        j = i
        while j < n and quiet[j]: j += 1
        a, b = i+6, j-6   # margin 60 ms
        if b > a: g[a:b] = 10**(-24/20)
        i = j
    else: i += 1
env = np.repeat(g, hop); env = np.concatenate([env, np.ones(len(m)-len(env))])
k = int(0.025*sr); env = np.convolve(env, np.ones(k)/k, mode="same")
sf.write(sys.argv[2], x*env[:,None], sr, subtype="FLOAT")
print("ambang", round(thr,1), "dBFS; jeda diredam", int((g<1).sum()*10), "ms")
