# cek_musik.py · seberapa jauh musik di bawah suara saat bicara: SNR pita 1–4 kHz (kejelasan konsonan) dan pita penuh, per jendela 0,5 dtk.
# Pakai: ~/work/mg-venv/bin/python alat/cek_musik.py kerja/mix_musik
import json, os, sys, numpy as np, soundfile as sf, pyloudnorm as pyln
from scipy.signal import butter, sosfiltfilt
D = sys.argv[1]; SR = 48000
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
v = sf.read(f'{D}/stem_vo.wav')[0][:, 0]; m = sf.read(f'{D}/stem_music.wav')[0].mean(1); x = sf.read(f'{D}/mix.wav')[0]
band = butter(4, [1000, 4000], 'bandpass', fs=SR, output='sos')
vb, mb = sosfiltfilt(band, v), sosfiltfilt(band, m)
words = json.load(open(f'{R}/sumber/words_v6.json'))
win = SR // 2; rows = []
for w in words:
    a = int(w['start'] * SR); b = max(a + int(0.08 * SR), int(w['end'] * SR))
    if np.abs(m[a:b]).max() < 1e-5: continue
    rb = 10 * np.log10((vb[a:b] ** 2).mean() / ((mb[a:b] ** 2).mean() + 1e-12))
    rf = 10 * np.log10((v[a:b] ** 2).mean() / ((m[a:b] ** 2).mean() + 1e-12))
    rows.append((round(w['start'] * 30), w['word'], round(rb, 1), round(rf, 1)))
rb = np.array([r[2] for r in rows]); rf = np.array([r[3] for r in rows])
print(f'{len(rows)} kata di atas musik · SNR 1–4 kHz median {np.median(rb):.1f} dB, min {rb.min():.1f} · pita penuh median {np.median(rf):.1f}, min {rf.min():.1f}')
print('5 kata paling tertutup (frame, kata, SNR 1–4k, penuh):', sorted(rows, key=lambda r: r[2])[:5])
mt = pyln.Meter(SR)
print('LUFS mix', round(mt.integrated_loudness(x), 1), '· suara', round(mt.integrated_loudness(np.stack([v, v], 1)), 1), '· musik', round(mt.integrated_loudness(sf.read(f'{D}/stem_music.wav')[0]), 1),
      '· puncak mix', round(20 * np.log10(np.abs(x).max()), 2), 'dBFS')
