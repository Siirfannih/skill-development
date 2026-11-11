# 02 · Dimensi Studio · data ukur mentah (11 Nov 2026)

Sumber: `dimensi.works_De_IVVnBaFo.mp4` · 720×1280, 24 fps, 34,13 dtk, AAC. Frame: `frames/f%03d.jpg` tiap 0,5 dtk (fNNN = t (NNN−1)/2).
Skrip (di `scripts/`): `d02_cuts.py` (histogram HS + MAD luma per frame → cut), `d02_meas.py` (komponen pink/hijau, bbox), `d02_rows.py` (profil baris teks per warna → tinggi/lebar/pusat), `d02_col2.py` (median hex per masker warna), `d02_cam.py` (ORB + affine parsial, dirantai tiap 4 frame → skala/geser per shot). Audio: ffmpeg ebur128, `earshot timeline --detail high` (`earshot.txt`), `pace_read.py`, librosa beat_track.

## Teks (% tinggi/lebar frame; tinggi = baris piksel berisi warna teks, termasuk tepi)
| Frame (t) | Teks | Warna masker | y atas | tinggi | lebar | cx |
|---|---|---|---|---|---|---|
| f008 (3,5) k1 | DITONTON | pink | 12,4 | 8,52 | 44 | 50 |
| f008 (3,5) k1 | SAMPAI HABIS | putih | 73,1 | 6,56 | 72 | 51 |
| f011 (5,0) k2 | VISUAL HOOK (per huruf, melengkung) | pink | 6,7–19,6 | 9,0–9,8 | 63 | 48 |
| f013 (6,0) k3 | caption "buat opening" | putih | 73,0 | 1,95 | 22 | 50 |
| f016 (7,5) k4 | CUT! | putih | 37,5 | 31,64 | 79 | 55 |
| f017 (8,0) k5 | ANGLE | putih | 24,6 | 5,39 | 38 | 53 |
| f020 (9,5) | ANGLE (setelah push) | putih | 7,8 | 11,72 | 62 | 60 |
| f034 (16,5) k6 | RATUSAN | putih | 18,0 | 4,92 | 38 | 49 |
| f034 (16,5) k6 | ANIMATED LAYER (2 baris) | putih | 67,0 | 21,25 | 70 | 50 |
| f004 (1,5) | "3" / SIMPEL | putih | 20,0 / 34,8 | 13,36 / 5,16 | 31 / 41 | 33 / 29 |
| f054 (26,5) k7 | WAKTUNYA | navy | 20,2 | 5,70 | 43 | 41 |
| f054 (26,5) k7 | JUALAN | navy | 72,3 | 7,03 | 54 | 57 |
| f064 (31,5) | logo Dimensi Studio | putih | 47,8 | 3,67 | 23 | 50 |
Blok pink stiker: SAMPAI HABIS y 70,2–80,6 (10,4 %), x 12–94 %; RATUSAN y 17,4–24,0. INFORMASI & USP miring ±20°: bbox 9,3 %, tinggi huruf tidak terukur tepat.

## Warna (median piksel bermasker)
pink stiker `#ED3A94` (f008, 11,4 % piksel) · pink gelap `#D22D7F` (f020) · hijau neon `#90EE29` (f034) / `#8EFF0F` (f054) · navy `#2B4790` · biru muda kertas `#5CA9F0` (65 % piksel f058) · pink kertas `#ED4BA4` · putih kertas `#F7F7F7` · studio sudut `#07203C`, frame awal `#0C3150`, terang tengah-kiri `#123C5B` · penutup `#000000`.
Vignette (luma rata-rata sudut / tengah): f008 28,9 / 102,1; f026 20,6 / 82,0; f021 60,4 / 58,7 (wide, karpet terang).
Noise frekuensi tinggi pada patch rata: studio 0,09 (bersih), kertas biru 4,37 (grain kertas).

## Cut (hist HS > 0,25 atau MAD > 60)
2,92 · 4,62 · 6,21 (tangan menutup lensa) · 7,21/7,29 (flash + glitch) · 7,75 · 11,83 · ±14,96 (putar badan, MAD 35) · 17,04 · 18,75 · 27,92 · 30,75. pace_read: 12 cut, 21,1/menit, median 2,6 dtk, event visual 48/menit.
Lonjakan gerak tanpa cut (MAD 25–39, scrapbook): 20,3 · 21,5 · 23,1 · 25,4 · 26,9 dtk.

## Kamera per shot (skala, geser x/y % frame, rotasi; ORB dirantai)
0–2,92 gagal lacak (latar polos) · 3,0–4,62: 0,95, +3/+1, +2° · 4,62–6,2: 1,27, −28/+8, −8° · 6,25–7,2: 1,01 · 7,8–11,8: 4,86, −103/−62 (berlebih, subjek bergerak; dari stiker 2,2× di 8,0→9,5) · 11,85–14,9: 1,02, +38/+8 · 15–17: 0,86 · 17,05–18,7: 0,79 · 18,8–27,9: 1,83, −191/−60 (jelajah kolase) · 27,95–30,7: 1,02, −13/+6.

## Skala subjek (perkiraan visual dari frame 360×640 dan 720×1280, ±3 %)
k1 medium 78×80 % · k2 full body 73 % tinggi · k3 wajah > 70 % lebar · k5 duduk kepala y 35 % → kaki y 74 % = 39×30 % · k6 60 % tinggi · k7 foto bingkai mutiara 35×36 % · k8 HP 69×52 %.

## Audio
ebur128: −14,1 LUFS, LRA 6,3 LU, true peak +0,1 dBFS. earshot: −14,5 LUFS, TP −0,7; babak 0–17,35 −13 LUFS, 17,35–30,35 −17, 30,35–34 −22; 187 event (5,5/dtk): 42 UI, 15 voice, 10 whoosh, 9 foley, 8 hit, 5 drum, 4 note, 2 riser. Musik funk + vocal chop; librosa 123,0 bpm, 176 onset (5,2/dtk); earshot 82 bpm (pulsa lemah 0,23). RMS 2 dtk: puncak −13,3 dB di 4–6 dtk, outro −26 → −48.

## Batas ketelitian
- 720p: 1 px = 0,078 % tinggi; frame JPEG q3, tepi teks bisa melebar ±1 px. Tinggi teks termasuk tepi/bayangan, jadi tinggi huruf murni ±5–10 % lebih kecil.
- Font hanya kemiripan visual, tidak terverifikasi metadata.
- Estimasi kamera dirantai mudah tercemar gerak subjek dan stiker; angka skala > 2 di shot bergerak = kasar.
- Label earshot = petunjuk (CLAP), bukan kepastian; SFX dan musik tidak dipisah stem.
