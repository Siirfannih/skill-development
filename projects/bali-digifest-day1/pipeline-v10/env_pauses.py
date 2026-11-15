"""Amplop energi + jeda untuk satu jendela. Pakai: env_pauses.py <npy> <awal> <akhir> [min_jeda=0.2]
Keluaran: lantai/puncak dB, daftar jeda (di bawah ambang) di dalam jendela."""
import sys, numpy as np
src, a0, a1 = sys.argv[1], float(sys.argv[2]), float(sys.argv[3]); md = float(sys.argv[4]) if len(sys.argv) > 4 else 0.2
x = np.load(src).astype(np.float32) / 32768; sr = 16000
seg = x[int(a0*sr):int(a1*sr)]; hop = int(0.02*sr)
db = np.array([20*np.log10(np.sqrt(np.mean(seg[i:i+hop]**2))+1e-9) for i in range(0, len(seg)-hop, hop)])
k = np.convolve(db, np.ones(3)/3, mode='same')
fl, pk = np.percentile(k, 10), np.percentile(k, 90)
thr = fl + 0.30*(pk-fl)
print(f"floor {fl:.1f} dB, p90 {pk:.1f} dB, ambang {thr:.1f}")
low = k < thr; i = 0; out = []
while i < len(low):
    if low[i]:
        j = i
        while j < len(low) and low[j]: j += 1
        if (j-i)*0.02 >= md: out.append((a0+i*0.02, a0+j*0.02))
        i = j
    else: i += 1
print(' '.join(f"{s:.2f}-{e:.2f}({e-s:.2f})" for s, e in out))
