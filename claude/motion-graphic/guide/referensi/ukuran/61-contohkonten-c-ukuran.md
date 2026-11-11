# 61 · Contohkonten2 — data ukur mentah

Sumber: `/home/irfan/work/pustaka-video/unggahan/Contohkonten2.mp4` · 720×1280, 30 fps, 88,70 dtk, audio 44,1 kHz.
Skrip (folder ini): `ukur2.py` (blok teks putih per baris), `kamera.py`/`kamera2.py` (cut + ORB/estimateAffinePartial2D), `sfx.py` (HF burst, HPSS, bpm), skrip inline untuk hex/vignette/porsi adegan; `earshot.txt`, `pace.txt`, `scenes.txt`.

## Teks (px pada 1280 tinggi; % = px/1280)
| Frame | Elemen | y px | tinggi % | lebar % W | pusat x,y % |
|---|---|---|---|---|---|
| k2 15,0 dtk | "WASTE" kapital | 224–418 | 15,16 | 65 | 50, 25,1 |
| k2 | "which is actually a complete" | 174–204 | 2,34 (asc+desc) | 77 | 50, 14,8 |
| 1,0 dtk | "66 SECONDS" | 249–371 | 9,53 | 76 | 50, 24,2 |
| 1,0 dtk | progress bar | 138–142 | 0,31 | 66 | 55, 10,9 |
| 1,0 dtk | label 0:00 / 1:06 | 164–182 | 1,41 | 82 | 50, 13,5 |
| k3 4,0 dtk | "FORGET" | 233–381 | 11,56 | 31 | 46, 24,0 |
| k3 | "Anything" | 421–439 | 1,41 | 19 | 50, 33,6 |
| k4 30 dtk | "R" (PURE, huruf aktif) | 190–387 | 15,39 | — | 61, 22,5 |
| k4 | "The" / "Framework" | 150–170 / 409–430 | 1,56 / 1,64 | 7 / 20 | 50 |
| k4 | "personal useful relevant" | 515–540 | 1,95 (asc 1,56, x 1,25) | 58 | 40, 41,2 |
| k1 13 dtk | caption "watching a" | 745–797 | 4,06 asc+desc; komponen asc 33–35 px = 2,7 | 37 | 50, 60,2 |
| 17 dtk | caption "after the class" | 614–660 | 3,59 | 54 | 50, 49,8 |
| 55 dtk | caption "one of my" | 748–817 | 5,39 (termasuk bayangan) | 45 | 50, 61,1 |
| k8 88 dtk | "THARUN" komponen huruf | 129 px | 10,08 | 73 (dgn kutip) | 50, 65,3 |
| k8 | "& I will share them" | 941–960 | 1,48 | 45 | 50, 74,3 |
Rasio: kata kunci 9,5–15,4 / caption asc 2,7 = 3,5–5,7; / kata pengantar 1,6–1,8 = 6–9.

## Warna (median potongan piksel)
Panel merah k4: pojok `#3C0002`, `#440002`; tengah polos `#790A10`; luma tengah 120 vs tepi 23. Kartu k3: pojok `#31080C`, tengah `#91232B`, luma 86 vs 24.
Footage k1: latar `#3C2116`/`#42261A`, tengah `#63402D`, baju `#41301E`; luma p50 42, p95 150; saturasi HSV median 156.
Aksen: FORGET terang `#F9E6B6`, "Never" `#ECCFA4`, label kunci `#FDE5CD`, PURE pudar `#C08083`, caption `#FFF9F8`.
Grain (std high-pass σ2 di area polos): panel 0,26, kartu 0,27, footage 0,23 → tekstur noda visual, bukan grain kuat.
Garis sambung split (turun tajam rata-rata R−G): y = 640 px (50,0 %) pada 7,5 / 22 / 30 / 50 / 52 / 58 / 59 dtk.

## Kamera & cut
Scene detect ≥0,25: 26 cut; ditambah 13 jump cut 0,12–0,24 yang dicek visual (10,6 12,6 14,03 39,57 54,67 56,17 71,23 75,5 76,6 77,97 79,77 80,2 84,83). Total 39 cut, 41 shot, median 1,97 dtk, 26,4/menit.
Push-in dalam shot wajah (skala awal→akhir): 21,5–23,9 +5,1 %; 23,9–25,8 +4,7 %; 36,9–38,8 +4,9 %; 45,9–48,3 +5,8 %; 61,6–63,6 +5,4 %; 69,6–71,2 +6,6 %; translasi −2,3 % W, −2,4 % H (menuju wajah). Shot split/diam: 0,0 % (inlier 700–1660).
Kartu kunci: 49,4–52,6 +29,2 %; 63,6–69,6 −23,1 % / ty −35 %; kartu judul 3,2–6,0 −40 % (slam masuk).
Jump cut (bagian bawah frame sebelum vs sesudah): 14,03 +12,7 %; 16,0 −12,7 %; 72,2 −11,8 %; 75,5 +13,6 %; 76,6 −16,7 %; 79,77 +5,7 %.
Masuk kartu judul 3,17 dtk: 1 frame putih penuh, lalu FORGET terbang dari kanan-atas (3,37–3,57 dtk).

## Audio
ebur128: −14,2 LUFS, LRA 2,8 LU, true peak +2,3 dBFS (earshot +1,7 dBTP). RMS p5 −32,9 / p50 −19,0 / p95 −11,8 dB.
librosa bpm 107,7 (campuran dan stem perkusif sama); HPSS perkusif/harmonik −6,6 dB; earshot pulse clarity 0,07 (tanpa grid beat tegas).
earshot seksi: 0–6,7 techno; 6,7–15,9 corporate; 15,9–35,2 techno; 35,2–61,3 trap; 61,3–75,5 house; 75,5–78,0 tanpa musik (−20 LUFS); 78,0–88,6 funk. Tag genre lemah.
Tag non-suara 31: hit 13 (sub bass drop ±200 Hz), whoosh 9, ui 4, foley/pop 3, riser 2. Daftar waktu: lihat `earshot.txt`.
pace_read: cut 18 (12,2/menit, detektor kasar), event visual 58/menit, 5,6 suku kata/dtk, kategori energi.
HF burst >9 dB (sfx.py) 162/menit = didominasi sibilan suara; tidak dipakai untuk menghitung SFX.

## Batas ketelitian
- Resolusi 720p: 1 px = 0,078 % tinggi, 0,14 % lebar. Glow/bayangan menambah ±0,3 % pada tinggi teks.
- Font: perkiraan visual (Bebas Neue/Anton, SF Pro/Inter); tidak ada metadata.
- Estimasi kamera dari ORB pada seluruh frame; shot dengan inlier < 50 (kartu grafik, gerak tangan) tidak andal.
- Tag SFX earshot = tebakan CLAP; level dan waktu terukur, jenis bunyi petunjuk saja. Porsi adegan dari ambang kemerahan per 0,5 dtk (adegan kertas/produk bisa salah kelas).
- Skala subjek ilustrasi dibaca dari grid 10 % di atas frame (±2 %).
