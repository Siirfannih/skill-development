# 71 · Ukuran mentah (Motionkonsep.mp4, 720×720, 30 fps, 33,69 dtk)

Frame: `frames/fNNN.jpg` (fps=2; fNNN = (NNN−1)×0,5 dtk). Skrip: `scripts/ukur_teks.py`, `scripts/ukur_roi.py`, `scripts/warna_kamera.py` (Python mg-venv: PIL, numpy, scipy, cv2).

## Teks (ukur_roi.py: ROI manual, tinta = |piksel − median tepi ROI| > 150)
| Frame (kunci) | Teks | Latar | Huruf besar/ascender | x-height | Lebar blok | Pusat (x,y) |
|---|---|---|---|---|---|---|
| f004 (k1) | Hey I'm a motion designer | #FCFCFC | 5,0 % | 3,8 % | 75 % | 51,43 |
| f007 (k2) | my name is krish | #569DF3 | 5,8 | 4,3 | 66 | 53,47 |
| f014 (k3) | −1000 $ (pil) | #2284F3 | 6,5 | 4,2 | 41 | 52,50 |
| f014 (k3) | video editing | #ECECEC | 3,4 | 2,6 | 28 | 52,33 |
| f022 (k4) | baris chat | #252C34 | 2,8 | 2,1 | 84 | 56,50 |
| f039 (k5) | gelembung 1 | #0B80F1 | 2,8 | – | 53 | 50,38 |
| f043 (k6) | I'll be posting on | #E5F3FC | 5,4 | 4,0 | 54 | 50,32 |
| f047 | I'll keep making | #FCFCFC | 6,9 | 5,3 | 68 | 49,51 |
| f054 | client | #FCFCFC | 8,6 | 6,8 | 30 | 49,52 |
| f059 (k7) | kalender 11–14 | #FCFCFC | 6,5 | – | 67 | 39,24 |
| f018 | last few years (emas) | #4C3300 | 6,9 | 5,4 | 59 | 32,50 |
| f062/f063 (k8) | and that's what makes it exciting | #000000 | 7,6–7,9 | 6,0–6,1 | 84–100 | 42–50,50 |
"Read 3:15 PM" (f039) 1,7 %. f002: kata masuk satu per satu dengan offset vertikal + glow magenta (lihat sheet 0:00,5).

## Skala subjek (bbox piksel warna, persentil 1–99)
kartu abu f014 56×52 % (x 24–80, y 23–76); pil biru 49×17 %; kotak chat f022 82×33 %; gelembung f039 55×28 %; ubin carousel f043 ±30–36×27 % (batas ubin putih lemah); lingkaran ungu f059 18×18 %; cincin ikon f010 64×62 %; sebaran emoji f004 75×37 %.

## Warna (rata-rata 6×6 px)
Latar putih #FCFCFC · biru gradien #67A9F5 / #579FF4 / #6EACF5 · carousel #FCFCFE→#B6DFF5 · gelap #000002, sudut #05203B · kotak chat #24313E · emas #886000→#1D1501, kursor #C89F0C · glow kartu #C9E0FC · kartu #ECECEC · pil #2284F3 · gelembung (inti) #0B80F1 · tombol #73A5EC · ungu #1815DD, pita #8C6CF1. Kata berwarna (median piksel jenuh): making #EC5E70, designer #DF4B5D, posting #4C85F0, exciting #1497D3.

## Kamera (ORB 1500 + estimateAffinePartial2D antar frame 0,5 dtk; skala, dx %, dy %, inlier)
0,5 1,02/−1/+1 · 1,0 1,14/−7/−7 · 2,5 1,11/−8/−3 · 3,0 0,88/+6/+7 · 6,0 1,33/−15/−20 · 6,5 1,29/−15/−11 · 7,0 0,56/+23/+22 · 8,5 1,12/−15/−6 · 10,5–12,0 1,00/−4,−10,−6,−2 · 12,5–13,5 dy −7,−3,−15 · 15,5 1,65/−71/−33 · 19,0 1,21/−10/−9 · 20,5 1,11/−3/−19 · 24,0 0,88/+14/+7 · 25,0 0,94/−65/+9 · 28,0 1,25/−19/−14 · 28,5 1,10/−39 · 29,0 1,18/−70 · 30,5–31,5 dx −21,−18,−17 (teks bergulir). "–" = fitur terlalu sedikit (latar rata/blur).
Catatan: di grafik datar, gerak kamera dan gerak objek tak bisa dipisah; angka = gerak global gambar.

## Cut & ritme
ffmpeg select scene > 0,25: 1,87 · 7,33 · 7,37 · 15,83 · 24,37 · 24,80 · 24,93 · 25,63 · 30,03 · 30,20 · 31,03 · 31,10 (pasangan berdekatan = satu cut/kilat). pace_read.py: 11 cut, 19,6/menit, shot median 1,3 dtk, event visual 41/menit, gerak layar 4,0, bicara ±4,5 suku kata/dtk.

## Audio
ffmpeg ebur128 (stereo): I −14,2 LUFS, LRA 2,8 LU, true peak +1,6 dBFS. earshot (mono 44,1 k): −15,6 LUFS, TP −1,2 dBTP, ±140 bpm (clarity 0,16), 221 event 6,6/dtk; tag 37 voice, 19 ui, 14 hit, 14 note, 4 key, 4 whoosh, 2 riser, 2 foley; babak 0–7,6 glitch hop, 7,6–27,25 trap beat, 27,25–33,6 tipis + ding; ekor sunyi 1,4 dtk. librosa: bpm 136, 202 onset (6,0/dtk), RMS per 2 dtk −15,8…−21,3 dB, 32 dtk −49 dB.

## Batas ketelitian
- 720 px: 1 px = 0,14 %; huruf kecil dan frame berblur meleset ±10 %. ROI teks dipilih manual dari grid 10 %.
- Hex dari JPEG q2 (kompresi ±3 per kanal). Font tidak terukur (dibaca dari bentuk). Easing dan durasi animasi per frame tidak diukur (sampel 0,5 dtk).
- Tag earshot adalah petunjuk; label SFX vs musik bisa tertukar (vocal chop dibaca "voice").
