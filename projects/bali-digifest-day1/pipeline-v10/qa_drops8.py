"""QA v8d: penurunan mendadak (dan bertahan >= 150 ms) di MIX FINAL (yang terdengar penonton): level jendela 20 ms turun > 15 dB dalam 60 ms
dari kondisi bersuara (> -30 dBFS), di luar 3,5 dtk terakhir (logo). Dilaporkan bersama bite VO yang sedang/baru berakhir."""
import json, sys, numpy as np, soundfile as sf
mix = sys.argv[1] if len(sys.argv) > 1 else 'mixout6/mix.wav'
x, sr = sf.read(mix); x = x.mean(1) if x.ndim > 1 else x; h = int(sr * 0.02)
e = np.array([20 * np.log10(np.sqrt(np.mean(x[i:i + h] ** 2)) + 1e-9) for i in range(0, len(x) - h, h)])
vo = json.load(open('edl6.json'))['vo']
def near(t):
    best = min(vo, key=lambda p: abs(p['v'] + p['b'] - p['a'] - t)); return f"{best['id']} (akhir {best['v'] + best['b'] - best['a']:.2f})"
out = []
for i in range(len(e) - 3):
    t = i * 0.02
    if t > len(x) / sr - 3.5: break
    if e[i] > -30 and e[i] - min(e[i + 1:i + 4]) > 15 and e[i] - np.mean(e[i + 3:i + 11]) > 15 and (not out or t - out[-1] > 0.3):   # hilang >= 150 ms
        out.append(t); print(f'{t:6.2f} dtk: {e[i]:.0f} -> {min(e[i + 1:i + 4]):.0f} dBFS  dekat {near(t)}')
print('penurunan mendadak:', len(out))
