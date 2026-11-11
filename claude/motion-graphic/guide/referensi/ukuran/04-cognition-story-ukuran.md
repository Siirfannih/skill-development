# 04 · Cognition story: data ukur mentah (11 Nov 2026)

Sumber: `/home/irfan/work/pustaka-video/mac/founded_De9ykdsOC_X.mp4` · 720×1280, 29,97 fps, 87,21 dtk, audio 44,1 kHz.
Frame: `frames/` tiap 1 dtk (87), `f05/` tiap 0,5 dtk (174, 360 px). Sheet: `sheet.jpg` (tiap 2 dtk, sel 300 px, 8 kolom), `sheet1s.jpg`.

## Skrip (di `scripts/`)
- `measure_text.py light <frames>`: pita y 40–60 %, piksel putih (min > 215, kroma < 40), komponen terhubung, dikelompokkan jadi kata bila jarak > 1,2 % lebar. Keluaran: tinggi kotak kata (h), median tinggi komponen (≈ x-height), lebar, pusat, kepadatan goresan.
- `color_cam.py`: median pusat (y 30–40 %) vs sudut 8 %, simpangan piksel, FFT 256² untuk raster.
- `shots_cam.py`: ffmpeg `select='gt(scene,0.25)'` → cut; gabung cut < 0,25 dtk; tiap shot ≥ 0,7 dtk: ORB 2000 + `estimateAffinePartial2D` antara awal+0,08 dan akhir−0,08 dtk. Hasil di `cam.txt`.
- Logo: threshold terhadap median latar (±60–70) setelah blur 2 px + closing (inline, lihat log).
- Audio: `ffmpeg ebur128=peak=true`; `earshot timeline --detail high` → `earshot.txt`; `pace_read.py` → `pace.txt`; `ears.py` (demucs) → `ears.txt`; librosa beat_track + flux > 4 kHz / < 150 Hz di ±60 ms cut.

## Teks (h = tinggi kotak kata % tinggi frame; d = kepadatan goresan)
| Frame | Isi | Hasil |
|---|---|---|
| f013 (12 dtk) | *and* **coding contests.** | h 2,73, x-h 1,64, lebar 47 %, cx 50, cy 50,0 |
| f022 | frasa campur | h 2,58, x-h 1,56, lebar 38 %, cy 50,0, d 0,24 |
| f028 | *what* **Wang told** | serif h 2,11 x-h 1,48 d 0,16 · sans h 2,66 x-h 2,11 d 0,39 · cy 49,8–49,9 |
| f030 (merah) | *they want to* **find** | serif h 2,66 x-h 1,56 d 0,10 · sans h 2,34 x-h 1,60 d 0,35 · cy 49,8 |
| f007 (merah) | *it's what the* | h 2,27, cy 50,0, d 0,12–0,15 |
| f033 (merah) | *A few months* | h 2,03, cy 50,1, d 0,13 |
| f047/f063/f070 | serif/sans | h 2,19–2,27; d serif 0,13–0,15, sans 0,44; cy 49,7–50,2 |
| f052/f062 | **that writes code.** / **11 employees,** | h 2,42–2,73, x-h 1,64–1,72, d 0,33–0,35, cy 49,8–50,0 |
| f004 logo gelap | caption + logo | caption h 2,58 cy 34,3; logo h 4,38 lebar 32 % (wordmark) cy 51 |
| f050/f079 logo gelap | ikon + wordmark | ikon h 5,2–6,3; wordmark h 4,1–4,9; total lebar ±51 % |
| f005/f078 Scale terang | caption + logo | caption h 2,3–2,9 cy 34,5; logo h 3,8–4,8, lebar 24–41 % cy 50 |
| f006 Decagon | caption + logo | caption h 2,3–2,5 cy 34,5; logo h 3,1–5,9, total ±47 % lebar |
| f059 Hyperliquid | logo | h 4,4–5,9, total ±50 % lebar, cy 50–51 |
| k6 (15,8 dtk) HRT | pita | oranye `#D65F10` h 33,8 w 98,6 cy 50; latar `#000000`; caption cy ±32 |
| k7 (40,6 dtk) Forbes | kliping | h 54,8 w 69,7 cx 53 cy 51 |

## Warna
- Merah f007/f030 pusat `#BE0011`/`#BE0012`, sudut `#A6000E` (rasio L 0,87); PNG tanpa kompresi 6,3 dtk: `#CE080E`.
- Arang f004/f050 `#151515` pusat = sudut. Kertas f005/f006 `#E1E1E1`/`#D9D9D9`, simpangan 37–46.
- Raster: FFT tambalan merah 256² (PNG) puncak di (−92, 38) → periode 2,57 px, 277× rata-rata spektrum.
- Arsip k1: rata RGB 67/51/39; L pusat 62, sudut kiri atas 106 (lampu), kanan bawah 22.

## Ritme & kamera
- Cut mentah 122 (83,9/menit, median 0,57); gabung 87 (59,9/menit, median 0,80, maks 4,5). Per 15 dtk (gabung): 19/15/17/10/12/14.
- `pace_read`: 95 cut, 65,4/menit, median 0,7, event 65/menit, 4,6 suku kata/dtk, usulan "energi" 100–140 bpm.
- Kamera (41 shot): push 15, pull 8, pan 9, diam 8, tak terukur 11. Contoh: 6,51–7,27 +17,4 %; 10,34–11,44 +6,1 %; 25,59–26,86 +29,3 %; 23,09–24,02 −20,6 %; 14,78–15,62 geser x −41,8 %; 64,70–67,10 geser x +43,3 %; 0–1,10 +106,6 % (zoom-through pembuka).

## Audio
- ebur128: I −14,1 LUFS, LRA 2,8 LU (−15,6…−12,8), true peak +0,5 dBFS. earshot (wav mono): −14,5 LUFS, TP −1,5 dBTP, tanpa grid beat jelas (pulse clarity 0,04).
- librosa 123,0 bpm; ears.py 123 bpm, C mayor (margin 0,129), stem musik −21,2/−26,1/−22,6/−22,1/−23,6/−23,0/−21,2/−22,3/−18,2 dB per 10 dtk.
- earshot: 511 event, 96 berlabel (41 voice, 31 ui, 15 hit, 4 note, 3 riser, 1 whoosh, 1 step); stem: hip hop heavy bass / epic trailer; orchestral percussion, pizzicato, sub bass.
- Flux > 4 kHz di ±60 ms cut: 51 % (acak 33 %); < 150 Hz: 25 % (acak 9 %).

## Batas ketelitian
- 720p: 1 px = 0,078 % tinggi, 0,14 % lebar; kata kecil ±0,1–0,2 % poin. Ukur teks di frame foto bising (f001, f008, f009, f066 dibuang).
- Porsi jenis adegan = hitungan mata dari sheet 1 dtk; skala tokoh/wajah = perkiraan visual dari keyframe (±5 %).
- Font = kemiripan visual, bukan identifikasi pasti. Durasi animasi masuk/keluar tidak terukur (sampel 2 fps).
- Label earshot/AST adalah petunjuk, bukan kepastian; SFX dan musik tercampur dengan VO.
