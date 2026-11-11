# 46 · Data ukur mentah (11 Nov 2026)

Video: `.../instagram/5f0b1485c88371b37fa2/video.mp4` · 1280×534, 30 fps, 35,27 dtk, audio 35,34 dtk. 1 px = 0,19 % tinggi, 0,08 % lebar.

## Skrip (folder `scripts/`)
- `measure.py img thr [roi] [inv]`: mask putih (min kanal > thr, saturasi < 40) → connected components → bbox per huruf (h %, cy %).
- `colors.py`: median BGR potongan → hex. HSV mask untuk teal/merah (S > 120, V > 90).
- `cuts_motion.py`: cut dari histogram HSV pita atas+bawah 22 px (korelasi, ambang 0,35); gerak per shot: goodFeatures + LK flow + estimateAffinePartial2D antara frame awal+2 dan akhir−3 (320 px).
- ffmpeg `ebur128=peak=true`; `select=gt(scene,0.25)`; librosa beat/onset/HPSS; `pace_read.py`.

## Per frame kunci (px pada 1280×534)
| k | t | ukuran |
|---|---|---|
| k1 pembuka | 3,5 | "one simple" x 148–400, x-height ±32 px (6,0 %), "f" 67 px (12,5 %); "fact" x 869–964; cy 55,5 %. Monitor badan x 488–792. Layar (mask putih) w 169→242→250 px pada 0 / 2 / 4 dtk |
| k2 kolase | 5,0 | kotak putih 305×65 px (23,8 × 12,2 %) di x 425; huruf x-height 30 px (5,7 %), ascender 41–42 px. Teal `#1DB5A6` 29 % area di 4,5 dtk, merah `#990011` 2 % |
| k3 life | 6,5 | "l" h 415 (77,7 %) y 60–475; "i/e" x-height 300–314 (56–59 %); kata x 340–942 (47 % W) |
| k4 kata kecil | 24,0 | "push in and something will pop": x-height 25–27 px (4,7–5,1 %), ascender 35–36 (6,6 %); cy 48,0–50,4 %; celah "push"→"in" 91 px (7,1 % W); deret x 193–1079 |
| k4b | 14,5 | "You can You": x-height 26 (4,9 %), kapital 35 (6,6 %); cy 49,2–50,7 % |
| k5 Change | 12,0 | "C" h 287 (53,7 %), x-height 203–209 (38–39 %), x 14–1266 (97,8 % W); abu `#848185`, latar `#070408`; inset x 440–712, y 345–500 |
| k6 understand | 20,5 | x-height 111 (20,8 %), "d" 152 (28,5 %), x 155–1125 (75,8 % W), cy 51,9 %; kecil "that you can poke" x-height 20 (3,7 %), ascender 27–28 (5,2 %), x mulai 151, cy 39,7 % |
| k7 kotak | 27,5 | kotak 310×59 px (24,2 × 11,0 %) x 466 y 236; huruf x-height 26–27 (5,0 %); "it" meluber sampai x 780 |
| lain | | "people" x-height 170 (31,8 %), x 220–1060 (65,6 % W); "important" x-height 170 (31,8 %); "and"/"out" x-height 408–439 (77–82 %), ascender tembus 0–534 |

## Warna
Teks `#FDFDFD`; kotak `#F6F3F7`; inset gelap 0:19 teal `#1D655E`, merah `#630008`; pembuka rumput `#6A7921`, langit `#DBE7F4`, meja `#8E7460`; penutup hitam `#010002`. Vignette (luma sudut/tengah): f027 21/55, f030 25/91, f045 22/70.

## Cut & kamera
Cut (dtk): 4.67 5.60 6.00 7.07 7.77 7.93 8.53 9.10 10.03 10.70 11.77 12.77 13.73 14.97 15.50 15.97 16.53 17.63 19.30 20.10 21.27 21.70 22.90 23.67 24.17 24.40 24.73 25.73 26.57 27.23 28.23 29.40 30.43 30.77 31.37 31.87 32.67 → 37 cut, median shot 0,80 dtk. ffmpeg scene>0,25: 48 event (ikut perubahan teks). pace_read: 42 cut, 71,3/menit, median 0,7, event visual 68/menit, gerak layar 9,0.
Gerak andal (inlier ≥ 30): 6,00–7,07 skala −11,2 %; 7,93–8,53 −4,5 %; 8,53–9,10 −4,4 %; 17,63–19,30 +12,1 %; shot lain |skala| < 1 %, |t| < 2 %. Shot inlier < 20 (pembuka, 9,1–10,0, 20,1–21,3, 27,2–28,2, 29,4–30,4) tidak dipakai; pembuka diukur dari lebar layar monitor (+48 %).

## Audio
ebur128: I −14,3 LUFS, LRA 2,7 LU, true peak −0,2 dBFS. librosa: 136 bpm, 78 beat, onset 6,0/dtk, HPSS energi perkusif 27 %, centroid median 1814 Hz. RMS: pembuka −17,5 dB, isi −17,7, penutup −15,3. 30/37 cut punya onset ±70 ms. Lonjakan >6 kHz (>4× median): 2,00 2,67 9,37 19,60 22,02.
earshot `timeline --detail high`: dihentikan timeout 200 dtk tanpa keluaran.

## Batas ketelitian
- Sumber 534 px tinggi: kata kecil ±1 px = ±4 % relatif ukurannya; kompresi IG melunakkan tepi (ambang 220–225 dapat memotong 1–2 px).
- x-height diukur dari huruf tanpa ascender; kata yang sedang beranimasi (memudar/membesar) bisa terukur sebelum ukuran akhir.
- Detektor cut memakai pita atas/bawah: cut dengan pita mirip bisa terlewat, perubahan kata raksasa yang menyentuh tepi bisa terhitung cut (7,77/7,93; 24,17/24,40).
- Font hanya perkiraan visual, bukan hasil pencocokan glif. Roto teks di belakang subjek tidak diperiksa di semua frame.
