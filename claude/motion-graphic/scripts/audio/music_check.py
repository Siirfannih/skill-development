"""Check a generated score against the act plan: duration, loudness per section, energy jump at boundaries."""
import json, sys, numpy as np, librosa
y, sr = librosa.load(sys.argv[1], sr=22050, mono=True)
plan = json.load(open(sys.argv[2]))
print('dur', round(len(y) / sr, 2), 'planned', sum(s['duration_ms'] for s in plan['sections']) / 1000)
hop = 512; rms = librosa.feature.rms(y=y, hop_length=hop)[0]; db = 20 * np.log10(rms + 1e-9); t = librosa.times_like(rms, sr=sr, hop_length=hop)
cen = librosa.feature.spectral_centroid(y=y, sr=sr, hop_length=hop)[0]
on = librosa.onset.onset_strength(y=y, sr=sr, hop_length=hop)
t0 = 0
for s in plan['sections']:
    t1 = t0 + s['duration_ms'] / 1000
    m = (t >= t0) & (t < t1)
    # strongest onset within ±0.6 s of the boundary start
    w = (t >= t0 - 0.6) & (t <= t0 + 0.6)
    pk = t[w][np.argmax(on[w])] if w.any() else 0
    tempo = librosa.beat.beat_track(y=y[int(t0 * sr):int(t1 * sr)], sr=sr)[0] if t1 - t0 > 4 else [0]
    print(f"{s['section_name']:>13} {t0:6.2f}-{t1:6.2f}  rms {np.median(db[m]):6.1f} dB  min {np.min(db[m]):6.1f}  centroid {np.median(cen[m]):5.0f} Hz  bpm {float(np.atleast_1d(tempo)[0]):5.0f}  onset-peak {pk - t0:+.2f}s")
    t0 = t1
# holes
h = int(0.5 * sr / hop); q = [round(t[i], 1) for i in range(0, len(db) - h, h) if np.max(db[i:i + h]) < np.max(db) - 35]
print('quiet 0.5s windows (<-35 dB):', q)
