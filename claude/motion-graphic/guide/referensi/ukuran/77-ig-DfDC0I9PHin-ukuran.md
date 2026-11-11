# 77 · data ukur mentah (siirfannih_DfDC0I9PHin.mp4)

ffprobe: 720×1280, 23,976 fps (2997/125), 21,972 dtk, ada audio. Sama dengan kartu 52 (durasi, LUFS, bpm, onset identik).

## Penyearahan viewer
- Viewer AE di frame HP (frame ref 18 dtk-an, f_036): sudut TL(232,432) TR(662,432) BR(632,724) BL(200,688) px.
- Per frame: ORB pada UI di luar viewer → homografi ke frame ref → warp viewer ke 1280×720 (`scripts/rectify.py`, 525 frame).
- Lebar viewer p5/p50/p95 = 430/430/436 px; pusat x 431,5–432,8 → kamera HP diam.
- Viewer = 60 % lebar, ±21 % tinggi frame HP. Caption kuning `#CCBE3E` y 195–215 px (1,6 % tinggi), x 79–639.

## Teks (`scripts/textmeasure.py`; % terhadap 1280×720)
| t (dtk) | teks | bbox tinggi | x-height | lebar | pusat x,y | warna |
|---|---|---|---|---|---|---|
| 0,5 | Everything | 6,4 | 3,5 | 13,3 | 21,8 / 44,6 | #E0D0CD |
| 0,5 | around you | 3,8* | 3,6 | 11,6 | 77,1 / 44,3 | #D6D1D3 |
| 3,6 | By People | 8,6 | 6,0 | 24,0 | 50,3 / 51,0 | #DCE4E4 |
| 4,1 | no | 5,0 | 4,9 | 5,6 | 39,8 / 50,7 | #DCE3E7 |
| 6,0 | for a new industry | 6,2 | 4,4 | 43,8 | 50,0 / 50,5 | #EAF1F1 |
| 8,4 | future (aktif) | 5,8 | 5,3 | 9,6 | 42,8 / 50,1 | #C0C0C0 |
| 8,4 | of currency (pasif) | 7,8 | 5,6 | 22,3 | 69,1 / 51,2 | #333333 |
| 9,8 | will essentially | 11,0† | 7,5 | 41,1 | 60,9 / 46,3 | #EFEEEB |
| 10,0 | just (hijau) | 10,8 | 7,2 | 16,9 | 58,3 / 35,4 | #73AB43 |
| 10,6 | Wattage (extended) | 14,4 | 7,4 | 39,5 | 49,7 / 49,2 | #DFE1E3 |
| 12,6 | Nuclear | 11,0† | 8,1 | 19,1 | 50,0 / 52,3 | #DEEDE1 |
| 17,3 | the (aktif, hitam) | 10,7 | 7,5 | 11,6 | 42,1 / 48,8 | #2C2C2C |
| 17,6 | sun (aktif) | 7,4 | 6,8 | 11,7 | 56,6 / 50,2 | #202020 |
| 19,3 | 100% | 26,9 | 25,1 | 48,8 | 50,2 / 44,3 | #F3EEEE |
| 20,0 | of all energy | 13,8† | 7,6 | 46,0 | 50,1 / 64,3 | #E4DFE7 |
| 20,9 | all about the sun | 7,5 | 5,7 | 5,5‡ | 52,4 / 44,8 | #DFEBF7 |
\* tanpa descender penuh · † bbox membesar oleh glow/footage terang · ‡ hanya kata aktif lolos ambang.

## Warna (rata-rata potongan)
kartu hitam #000000 (std 0) · kartu putih #FFFFFF, sudut #FCFCFC · senja atas #AF686B, tengah #34345D, bawah #313766 · ruang TV #58362A · WEF biru #0D205D · bingkai HP: atas #1A0C05, keyboard #030305.

## Cut & gerak (`scripts/cuts_motion.py`: beda piksel 160×90 >18 atau beda histogram >0,35; gabung ≤3 frame)
- 41 perubahan: 1,00 1,17 1,33 1,50 2,29 3,09 3,25 3,42 3,59 3,84 5,34 5,59 5,80 6,21 6,51 7,17 8,17 9,43 10,51 11,01 11,22 11,47 11,93 12,47 12,64 12,80 12,97 13,14 13,30 13,47 13,64 13,81 14,26 14,76 15,18 15,77 16,27 17,18 18,56 20,44 21,65.
- Dicek ke strip: 3,09–3,84 = sel grid tersusun; 5,34/5,59/13,x = ganti kata atau shot di bawah teks yang sama. Median 0,35 dtk, rata 0,52 dtk.
- Affine ORB awal→akhir shot (skala %, tx % lebar, ty % tinggi): TV 0–1,0 +8,5 / −4,1 / −5,0; chip 7,17 −1,2 / −4,1; lampu 9,43 +0,5 / −4,6; Altman 16,27 +8,1; Musk 20,44 +9,3. Nilai ±95–99 % = cocokan gagal (shot glitch/blur), dibuang.

## Audio
- ebur128: −14,0 LUFS, LRA 2,5 LU, true peak −0,3 dBFS. earshot (mono 22,05 kHz): −14,2 LUFS, TP −2,6 dBTP (selisih karena resampling), 133 event 6,1/dtk, 2 babak (0–15,7 / 15,7–21,9), pulse clarity 0,07.
- librosa: 123 bpm (mix dan perkusif), onset 4,98/dtk, chroma C/A/G, RMS p95−p10 12,7 dB.
- pace_read.py: 0 cut, 52 event visual/menit, 3,9 suku kata/dtk; tidak berlaku untuk cut (viewer kecil di dalam frame HP).

## Batas ketelitian
- Sumber 720p; viewer asli ±430×270 px diperbesar ±3×: 1 px asli ≈ 0,37 % tinggi viewer; kata kecil ±15 %.
- Ambang teks per potongan dipilih manual; bbox di footage terang tercemar (tanda †). x-height lebih andal daripada bbox.
- Skala subjek dibaca dari grid 10 % (bukan segmentasi). Font dari mata, bukan OCR font.
- Label SFX earshot lemah ("?"); stem tidak dipisah.
