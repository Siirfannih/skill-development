"""QA v8f: jeda 'diam' yang tersisa DI DALAM ucapan (sesudah pemotongan): energi sumber <= ref-22 dB selama >= 0,12 dtk."""
import json, numpy as np, soundfile as sf, sys
src = open('sil6.py').read(); SRC = eval(src[src.index('SRC = ') + 6:src.index('}', src.index('SRC = ')) + 1])
sp = json.load(open('speech6.json')); tot = 0; out = []
for bid, d in sp.items():
    off, f = [q for q in SRC[d['clip']] if q[0] <= d['parts'][0][0]][-1]
    x, sr = sf.read(f); x = x.mean(1) if x.ndim == 2 else x; h = int(sr * 0.01)
    for a, b in d['parts']:
        e = np.array([20 * np.log10(np.sqrt(np.mean(x[int((t - off) * sr):int((t - off) * sr) + h] ** 2)) + 1e-9) for t in np.arange(a, b, 0.01)])
        ref = np.percentile(e, 90); low = e <= ref - 22; i = 0
        while i < len(low):
            if low[i]:
                j = i
                while j < len(low) and low[j]: j += 1
                if (j - i) * 0.01 >= 0.12 and i > 3 and j < len(low) - 3: out.append((bid, a + i * 0.01, a + j * 0.01, float(e[i:j].max() - ref))); tot += (j - i) * 0.01
                i = j
            else: i += 1
for bid, p, q, mx in out: print(f'{bid:4s} jeda {p:.2f}-{q:.2f} ({q - p:.2f} dtk, puncak {mx:+.0f} dB dari ref)')
print(f'jeda tersisa: {len(out)}, total {tot:.2f} dtk')
