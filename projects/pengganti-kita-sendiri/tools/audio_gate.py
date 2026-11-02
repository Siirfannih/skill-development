"""Gerbang audio (Segmen 3). python3 audio_gate.py <mix_dir> <cues.json> <dialog.wav>
Diukur pada mix proyek sendiri (bukan angka referensi):
  1 keterdengaran: tiap cue SFX, RMS 300 ms terkeras (≤1 s dari onset) stem_sfx vs RMS (dialog+bed) di jendela sama ≥ −10 dB  → target ≥ 85 %
  2 VO di atas latar (pita HP 300 Hz–8 kHz) saat ucapan: median & p5 selisih dB                                  → median ≥ 10 dB, p5 ≥ 0 dB
  3 tusukan 2–6 kHz: porsi energi SFX di 2–6 kHz dan > 5 kHz                                                       → > 5 kHz < 5 %
  4 backsound dBFS (RMS 400 ms, setelah normalisasi master) p10/p50/p90                                           → di dalam −21..−41
  5 loudness master & true peak (ffmpeg ebur128)                                                                  → −14 LUFS, TP ≤ −1
  6 dead air: jendela 300 ms master < −50 dBFS                                                                     → 0
"""
import sys, json, subprocess, re
import numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt

D, CUES, DLG = sys.argv[1:4]
m, sr = sf.read(f'{D}/master.wav'); bed, _ = sf.read(f'{D}/stem_bed.wav'); sfx, _ = sf.read(f'{D}/stem_sfx.wav')
dlg, _ = sf.read(DLG)
if dlg.ndim > 1: dlg = dlg.mean(1)
N = len(m); dlg = np.pad(dlg, (0, max(0, N - len(dlg))))[:N]
mono = lambda x: x.mean(1) if x.ndim > 1 else x
bed, sfx, mm = mono(bed), mono(sfx), mono(m)
# gain normalisasi master terhadap jumlah stem (stem disimpan sebelum normalisasi)
pre = dlg + bed + sfx
g = np.sqrt((mm ** 2).mean() / max((pre ** 2).mean(), 1e-12))
db = lambda x: 20 * np.log10(np.sqrt((x ** 2).mean()) + 1e-12)
w = int(0.3 * sr)
ok = tot = 0; weak = []
for c in json.load(open(CUES)):
    a0 = int(c['t'] * sr)
    if a0 + w > N: continue
    tot += 1
    # jendela 300 ms TERKERAS cue dalam 1 s pertama (whoosh/riser memuncak setelah onset)
    a = max(range(a0, min(N - w, a0 + sr), int(0.05 * sr)), key=lambda i: db(sfx[i:i + w])); b = a + w
    d = db(sfx[a:b]) - db(dlg[a:b] + bed[a:b])
    if d >= -10: ok += 1
    else: weak.append((round(c['t'], 2), c['role'], round(d, 1)))
band = butter(4, [300, 8000], 'band', fs=sr, output='sos')
vb, lb = sosfilt(band, dlg), sosfilt(band, bed + sfx)
hop = int(0.1 * sr); diffs = []
for i in range(0, N - hop, hop):
    v = vb[i:i + hop]
    if db(v) > -40: diffs.append(db(v) - db(lb[i:i + hop]))
S = np.abs(np.fft.rfft(sfx)) ** 2; fq = np.fft.rfftfreq(len(sfx), 1 / sr)
p26 = S[(fq >= 2000) & (fq < 6000)].sum() / S.sum(); p5 = S[fq >= 5000].sum() / S.sum()
n4 = int(0.4 * sr); k = len(bed) // n4
bdb = 20 * np.log10(np.sqrt((bed[:k * n4].reshape(k, n4) ** 2).mean(1)) * g + 1e-12)
mdb = 20 * np.log10(np.sqrt((mm[:(N // w) * w].reshape(-1, w) ** 2).mean(1)) + 1e-12)
er = subprocess.run(['ffmpeg', '-nostats', '-i', f'{D}/master.wav', '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
I = re.findall(r'I:\s+(-?[\d.]+) LUFS', er)[-1]; TP = re.findall(r'Peak:\s+(-?[\d.]+) dBFS', er)[-1]
print(f"1 keterdengaran SFX: {ok}/{tot} = {100 * ok / max(tot, 1):.0f} %  (target ≥ 85 %)")
print(f"2 VO di atas latar (HP): median {np.median(diffs):.1f} dB, p5 {np.percentile(diffs, 5):.1f} dB")
print(f"3 SFX 2–6 kHz {100 * p26:.1f} %, >5 kHz {100 * p5:.1f} %")
print(f"4 backsound dBFS p10/p50/p90: {np.percentile(bdb, 10):.1f} / {np.percentile(bdb, 50):.1f} / {np.percentile(bdb, 90):.1f}  (rentang −21..−41)")
print(f"5 master {I} LUFS, TP {TP} dBFS")
print(f"6 dead air (<−50 dBFS 300 ms): {(mdb < -50).sum()}")
if weak: print("cue lemah:", weak[:30])
