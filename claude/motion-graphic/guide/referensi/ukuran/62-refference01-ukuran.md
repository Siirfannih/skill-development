# 62-refference01 · data ukur mentah

Sumber: `/home/irfan/work/pustaka-video/unggahan/Refference01.mp4` · 720×1280, 30 fps, 9,658 dtk, audio 44,1 kHz stereo.
Frame: `frames/f001–f019.jpg` (fps=2; fN ≈ t=(N−1)·0,5 dtk); strip 10 fps `dense.jpg`; contact sheet `cs_all.jpg`, `sheet.jpg`.

## Skrip
- `scripts/ukur.py`: mask merah (r>120, r−g>70, r−b>60), run baris, bbox subjek gelap (V<70), sampel latar 16×16.
- `scripts/kata.py`: tinggi/lebar per kata di crop tetap (mask merah; kata pucat pakai ambang longgar).
- Inline Python (cv2): ORB 2000 + `estimateAffinePartial2D` (RANSAC 3 px) di area y 600–1150 antara frame awal/akhir adegan; bbox orang V<60, y>450.
- Inline librosa: beat_track, onset, RMS 0,1 dtk, energi pita >5 kHz di sekitar cut.
- ffmpeg: `select='gt(scene,0.15)'`, `ebur128=peak=true`; `pace_read.py`.

## Teks per frame kunci (y px, tinggi % frame, lebar %, pusat x,y %)
| Frame | Kata | y | tinggi | lebar | pusat |
|---|---|---|---|---|---|
| f003 (1,0 s) | Hera | 417–559 | 11,1 | 61 | 50, 38 |
| f003 | My name is | 385–419 | 2,7 | 31 | 38, 31 |
| f003 | rose | 540–572 | 2,5 | 14 | 70, 43 |
| f006 (2,5 s) | CEO | 135–344 | 16,3 | 73 | 51, 19 |
| f006 | of (pil) | 355–409 | 4,2 | 10 | 26, 30 |
| f006 | personal (pil) | 363–409 | 3,6 | 23 | 75, 30 |
| f006 | Brand | 742–842 | 7,8 | 51 | 51, 62 |
| f006 | launch (putih) | 842–909 | 5,2 | 44 | 50, 68 |
| f010 (4,5 s) | Marketing (dgn g) | 210–339 | 10,1 | 82 | 47, 21 |
| f010 | Agency (dgn y) | 330–449 | 9,3 | 66 | 51, 30 |
| f010 | The socials / media | 177–209 | 1,6 / 2,5 | 31 / 20 | 27,16 / 75,15 |
| f014 (6,5 s) | Currently we are looking for | 286–364 | 6,1 (2 baris) | 38 | 53, 25 |
| f014 | HARDWORKING / and / COMMITED | 377–517 | 3,3 / 1,9 / 4,0 | 66 / 18 / 50 | 53–58, 31–38 |
| f018 (8,5 s) | Clients | 602–734 | 10,3 | 69 | 50, 52 |
| f018 | Who can edit our | 588–604 | 1,2 (mask pucat; visual ±2,3) | 38 | 54, 47 |
Visual dari crop: cap "Marketing" ±7,4 %, cap "The socials" ±2,5 %.

## Warna (median piksel)
CEO gelap `#690001`, CEO sorot `#E10005`, Brand `#DE000E`, Marketing `#A60018`, HARDWORKING `#90101D`, langit `#87C5D0`, latar f003 `#E7E1E9`/`#E6E4E7`, lantai dgn cahaya `#E8CAD2`, latar f010 `#F2EDF3`, f018 `#E7E2E8`. Luma sudut 227 vs tepi tengah 228: tanpa vignette.

## Subjek & kamera
- Orang (bbox gelap, termasuk kursi sebagian): 0,5 s 43 %; 1,3 s 39 %; 1,5–2,5 s 43–44 %; 3,0–4,5 s 35–36 %; 7,5–8,5 s 37–39 %; 9,0 s 46 % (kartu berambut gelap ikut terhitung).
- Astronaut f014: 58 % tinggi × 79 % lebar.
- ORB: Hera f5→f40 skala 1,165 (226 inlier, push); CEO f45→f88 0,940 (217, pull); Clients f225→f280 0,734 (239, pull); Marketing 0,801 (7 inlier) dan Astro 1,226 (23 inlier) tidak andal.
- Scene detect: 0,10; 3,03; 4,90; 6,23 (rack blur, bukan cut); 7,30–7,40 (glitch). Transisi 1,4 dtk (cincin) tidak tertangkap detektor; dilihat di strip 10 fps.

## Audio
- ebur128: −14,0 LUFS, LRA 2,4 LU, true peak −0,9 dBFS.
- librosa: 129,2 bpm, ketukan tiap ±0,45 dtk; 66 onset dalam 9,7 dtk; centroid 1985 Hz.
- Pita >5 kHz di atas median: 1,4 s +21 dB; 3,03 s +10,8; 4,9 s +6,4; 6,23 s +9,3; 7,3 s +16,9; 9,4 s +15,4. Puncak berkala tiap ±0,45 dtk = hi-hat.
- pace_read: 5 cut, 31,1/menit, median 1,2 dtk, event visual 38/menit, 6,5 suku kata/dtk, kategori energi, musik 100–140 bpm.
- earshot `timeline --detail high`: dihentikan setelah 150 dtk (mesin dipakai sesi paralel) → label SFX tidak terukur.

## Batas ketelitian
720p: 1 px = 0,078 % tinggi / 0,139 % lebar. Huruf berblur gerak dan bayangan merah menambah ±0,5 poin; mask merah bisa ikut menangkap bingkai kartu, jadi crop dipilih manual. Ukuran kartu dari still (±3 %). Durasi 9,7 dtk: ritme dan musik hanya dari 5 adegan.
