"""Suara v2 (koreksi Irfan 13 Nov: jeda berisik — piring, klik, dengung kamar saat berhenti bicara).
voice_raw.wav (suara terkunci, timeline program) → high-pass 70 Hz + afftdn nr 3/nf −55 (nr 8 mengikis udara > 9 kHz: voice_fidelity 0,65 FAIL) → jeda antarkata diredam −36 dB (−24 dB masih menyisakan benturan keras, 88,4 dtk).
Jeda = di luar [awal kata − 0,06; akhir kata + 0,12] (ekor whisper sering terlalu cepat) dan ≥ 0,15 dtk; ramp 25 ms.
Tempo dan isi ucapan tidak diubah (Lantai E23). Keluaran float: audio/voice_clean.wav."""
import json, subprocess, numpy as np, soundfile as sf
SR = 48000
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', 'audio/voice_raw.wav', '-af',
                      'highpass=f=70,afftdn=nr=3:nf=-55', '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'],
                     capture_output=True, check=True).stdout
x = np.frombuffer(raw, np.float32).reshape(-1, 2).copy()
w = json.load(open('edit/words_final.json'))
w = w if isinstance(w, list) else w['words']
spans = sorted((max(0.0, q['s'] - 0.06), q['e'] + 0.12) for q in w)
keep = []  # gabung rentang ucapan
for a, b in spans:
    if keep and a <= keep[-1][1]: keep[-1][1] = max(keep[-1][1], b)
    else: keep.append([a, b])
g = np.full(len(x), 10 ** (-36 / 20), np.float32)
ramp = int(0.025 * SR)
dur = len(x) / SR
for a, b in keep:
    i, j = int(a * SR), min(len(x), int(b * SR))
    g[i:j] = 1.0
# jeda pendek (< 0,15 dtk) tidak diredam: napas antarkata alami
for (a0, b0), (a1, b1) in zip(keep, keep[1:]):
    if a1 - b0 < 0.15: g[int(b0 * SR):int(a1 * SR)] = 1.0
if keep and keep[0][0] < 0.15: g[:int(keep[0][0] * SR)] = 1.0
# haluskan perpindahan (ramp linear 25 ms)
k = np.ones(ramp, np.float32) / ramp
g = np.convolve(g, k, mode='same').astype(np.float32)
y = x * g[:, None]
sf.write('audio/voice_clean.wav', y, SR, subtype='FLOAT')
gaps = [(round(b0, 2), round(a1, 2)) for (a0, b0), (a1, b1) in zip(keep, keep[1:]) if a1 - b0 >= 0.15]
print('rentang ucapan', len(keep), '· jeda diredam', len(gaps), 'total', round(sum(b - a for a, b in gaps), 2), 'dtk · durasi', round(dur, 2))
