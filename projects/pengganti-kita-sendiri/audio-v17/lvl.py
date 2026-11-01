"""SFX peak (phone band 300 Hz-8 kHz) relative to the VO peak, per kind; VO clarity in the speech band (VO vs music+SFX)."""
import json, numpy as np, soundfile as sf, scipy.signal as ss
from collections import defaultdict
sfx = sf.read('out/audio/stems/sfx.wav')[0].mean(1); mus = sf.read('out/audio/stems/music.wav')[0].mean(1); vo = sf.read('out/audio/dialog_scaled.wav')[0].mean(1)
sr = 48000; ph = lambda x: ss.sosfilt(ss.butter(4, [300, 8000], 'band', fs=sr, output='sos'), x)
S, V = ph(sfx), ph(vo); vpk = 20 * np.log10(np.percentile(np.abs(V[np.abs(V) > 1e-4]), 99.9))
E = json.load(open('out/cues_annotated.json')); g = defaultdict(list)
for e in E:
    i = int(e['t'] * sr); a, b = (i - int(1.2 * sr), i) if e['kind'] == 'riser' else (max(0, i - int(0.05 * sr)), i + int(0.2 * sr))
    g[e['kind']].append(20 * np.log10(np.abs(S[a:b]).max() + 1e-9) - vpk)
print('kind     n   SFX peak vs VO peak (median, min..max)')
for k, v in sorted(g.items()): print(f'{k:8} {len(v):3d}  {np.median(v):6.1f}  ({min(v):.1f}..{max(v):.1f})')
bp = ss.butter(4, [300, 4000], 'band', fs=sr, output='sos'); db = lambda x: 10 * np.log10(np.mean(x ** 2) + 1e-14)
sv, so = ss.sosfilt(bp, vo), ss.sosfilt(bp, mus + sfx); w = sr // 2; r = []
for i in range(0, len(vo) - w, w):
    if db(vo[i:i + w]) > db(vo) - 12: r.append(db(sv[i:i + w]) - db(so[i:i + w]))
r = np.array(r); print(f'VO clarity (speech band, VO vs music+SFX): median {np.median(r):.1f} dB, windows < 8 dB: {(r < 8).sum()}/{len(r)}')
