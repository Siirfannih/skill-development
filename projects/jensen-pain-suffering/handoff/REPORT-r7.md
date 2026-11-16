# REPORT r7 · Editor · jensen-pain-suffering (perbaikan audit r6, diff)

Draft: `qc/draft.mp4`, 960×540, 1428 frame, 47,600 dtk (render 2211 dtk, KONKURENSI=2; mesin dipakai bersama sesi lain). Still: `qc/stills/` (42 still). Selain set r6, ada still bukti B04d f378, B03d f248, B07d f760, dan B09d f1016.

| # | Temuan audit | Perbaikan | Bukti |
|---|---|---|---|
| 1 | B4 f376–382: 'providing' ikut terseret keluar, lalu 4 f kosong | Teks cetakan tetap mengikuti dunia, tetapi tepi kirinya ditahan di x 140 px layar (`keepLeft`) saat kamera pindah cetakan. Tampil lama tetap di layar sampai tampil berikut masuk dengan silang. Teks B4 digambar satu salinan tajam (`textSharp`), tanpa motion blur subframe kamera. Berlaku untuk ketiga perpindahan cetakan. | B04d f378 ('providing' tajam di kiri bawah saat pan); draft f378 |
| 2 | Kotak bertepi di B5 (f498–541) dan B8a (f817–843) | Penyebabnya **bukan scrim**: kotak hanya muncul di render video, tidak di still. Lapisan film resolusi rendah memakai `will-change: transform`, dan Chrome hanya me-raster ulang daerah di sekitar teks yang berubah, jadi terbentuk kotak. Bukti: rentang f500–540 dirender dua kali, kotak ada dengan `will-change` dan hilang tanpanya. `will-change` dihapus. Penggelap B5 (rata 55 % + vignette) dan B8a (gradien linear dari atas) sudah tanpa tepi. | draft f510, f530, f820, f840: tanpa kotak |
| 3 | Teks utuh mendahului ucapan | T32, T37, T38 → modus `kata`. T36 'pain and suffering.' → `kata` 175 px amber, tengah. Waktu masuk tampil sekarang dihitung dari onset kata pertama yang **tampil**, jadi T49 'Greatness comes' mulai di 33,79 (f1012), bukan 33,67. | B07d f760 ('pain and' sebagian), B09d f1016 |
| 4 | Jarak teks–kepala di talking head | Jarak dari tepi kepala terdeteksi (data per frame `head.json`, maks selama tampil, semua talking head B1/B3/B6c/B7b/B9b/B11) dinaikkan 80 → 110 px. Deteksi kulit+rambut tidak menangkap kacamata dan telinga (±30 px), jadi jarak ke kacamata/rambut sekarang ±80 px (≥ 4 % lebar). T13 'suffering' pada punch-in: 190 → 180 px dan skala masuk berporos kiri, jadi tidak lagi melebar ke arah kepala. | B03d f248, B06d f712, B07c f814 |
| 5 | B8b T45 mepet kiri ±5 % | 150 → 132 px. Tepi kiri ±205 px = 10,7 % | B08f f935 |
| 6 | Blok piksel di silang f796–797 | Penyebab yang sama dengan #2 (raster parsial lapisan `will-change`). Setelah dihapus, draft f797 bersih ('in' masuk, 'And I mean that' memudar). | draft f797 |

## Gate (keluaran apa adanya)
`teks_cek.py qc/stills`
```
still dicek: 42
TIDAK ADA TANDA
exit 0
```
`balance_check.py qc/stills`
```
PERIKSA B01a.png                     kiri 0.51 kanan 0.49 · atas 0.90 bawah 0.10 · pusat (0.46, 0.36)
PERIKSA B01b.png                     kiri 0.52 kanan 0.48 · atas 0.89 bawah 0.11 · pusat (0.45, 0.32)
FAIL    B01c.png                     kiri 0.74 kanan 0.26 · atas 0.83 bawah 0.17 · pusat (0.35, 0.33)  ← berat kiri
FAIL    B02a.png                     kiri 0.25 kanan 0.75 · atas 0.80 bawah 0.20 · pusat (0.59, 0.41)  ← berat kanan
ok      B02b.png                     kiri 0.56 kanan 0.44 · atas 0.36 bawah 0.64 · pusat (0.48, 0.49)
PERIKSA B03a.png                     kiri 0.54 kanan 0.46 · atas 0.89 bawah 0.11 · pusat (0.44, 0.36)
PERIKSA B03b.png                     kiri 0.49 kanan 0.51 · atas 0.79 bawah 0.21 · pusat (0.48, 0.43)
PERIKSA B03c.png                     kiri 0.48 kanan 0.52 · atas 0.79 bawah 0.21 · pusat (0.47, 0.44)
PERIKSA B03d.png                     kiri 0.49 kanan 0.51 · atas 0.79 bawah 0.21 · pusat (0.48, 0.43)
ok      B04a.png                     kiri 0.35 kanan 0.65 · atas 0.35 bawah 0.65 · pusat (0.56, 0.53)
ok      B04b.png                     kiri 0.59 kanan 0.41 · atas 0.48 bawah 0.52 · pusat (0.46, 0.48)
ok      B04c.png                     kiri 0.45 kanan 0.55 · atas 0.48 bawah 0.52 · pusat (0.52, 0.49)
ok      B04d.png                     kiri 0.42 kanan 0.58 · atas 0.65 bawah 0.35 · pusat (0.52, 0.42)
ok      B05a.png                     kiri 0.50 kanan 0.50 · atas 0.34 bawah 0.66 · pusat (0.51, 0.57)
ok      B05b.png                     kiri 0.49 kanan 0.51 · atas 0.50 bawah 0.50 · pusat (0.50, 0.50)
ok      B05c.png                     kiri 0.61 kanan 0.39 · atas 0.39 bawah 0.61 · pusat (0.47, 0.55)
ok      B05d.png                     kiri 0.58 kanan 0.42 · atas 0.30 bawah 0.70 · pusat (0.49, 0.62)
ok      B06a.png                     kiri 0.52 kanan 0.48 · atas 0.56 bawah 0.44 · pusat (0.52, 0.44)
ok      B06b.png                     kiri 0.37 kanan 0.63 · atas 0.68 bawah 0.32 · pusat (0.53, 0.38)
ok      B06c.png                     kiri 0.54 kanan 0.46 · atas 0.57 bawah 0.43 · pusat (0.46, 0.42)
PERIKSA B06d.png                     kiri 0.53 kanan 0.47 · atas 0.89 bawah 0.11 · pusat (0.47, 0.36)
FAIL    B06e.png                     kiri 0.27 kanan 0.73 · atas 0.62 bawah 0.38 · pusat (0.58, 0.40)  ← berat kanan
FAIL    B07a.png                     kiri 0.72 kanan 0.28 · atas 0.25 bawah 0.75 · pusat (0.34, 0.60)  ← berat kiri
ok      B07b.png                     kiri 0.48 kanan 0.52 · atas 0.40 bawah 0.60 · pusat (0.48, 0.54)
PERIKSA B07c.png                     kiri 0.54 kanan 0.46 · atas 0.89 bawah 0.11 · pusat (0.46, 0.37)
FAIL    B07d.png                     kiri 0.97 kanan 0.03 · atas 0.14 bawah 0.86 · pusat (0.29, 0.64)  ← berat kiri
ok      B08a.png                     kiri 0.40 kanan 0.60 · atas 0.72 bawah 0.28 · pusat (0.54, 0.37)
FAIL    B08b.png                     kiri 0.28 kanan 0.72 · atas 0.79 bawah 0.21 · pusat (0.53, 0.33)  ← berat kanan
ok      B08c.png                     kiri 0.48 kanan 0.52 · atas 0.67 bawah 0.33 · pusat (0.50, 0.39)
ok      B08d.png                     kiri 0.48 kanan 0.52 · atas 0.42 bawah 0.58 · pusat (0.49, 0.55)
FAIL    B08e.png                     kiri 0.80 kanan 0.20 · atas 0.73 bawah 0.27 · pusat (0.41, 0.36)  ← berat kiri
ok      B08f.png                     kiri 0.58 kanan 0.42 · atas 0.35 bawah 0.65 · pusat (0.45, 0.56)
ok      B09a.png                     kiri 0.52 kanan 0.48 · atas 0.77 bawah 0.23 · pusat (0.47, 0.29)
ok      B09b.png                     kiri 0.56 kanan 0.44 · atas 0.63 bawah 0.37 · pusat (0.44, 0.36)
PERIKSA B09c.png                     kiri 0.60 kanan 0.40 · atas 0.78 bawah 0.22 · pusat (0.40, 0.36)
PERIKSA B09d.png                     kiri 0.57 kanan 0.43 · atas 0.86 bawah 0.14 · pusat (0.43, 0.38)
ok      B10.png                      kiri 0.44 kanan 0.56 · atas 0.44 bawah 0.56 · pusat (0.51, 0.46)
PERIKSA B11.png                      kiri 0.47 kanan 0.53 · atas 0.92 bawah 0.08 · pusat (0.49, 0.31)
PERIKSA B11b.png                     kiri 0.46 kanan 0.54 · atas 0.92 bawah 0.08 · pusat (0.50, 0.31)
PERIKSA B12a.png                     kiri 0.57 kanan 0.43 · atas 0.85 bawah 0.15 · pusat (0.46, 0.35)
ok      B12b.png                     kiri 0.50 kanan 0.50 · atas 0.50 bawah 0.50 · pusat (0.50, 0.50)
ok      B12c.png                     kiri 0.50 kanan 0.50 · atas 0.50 bawah 0.50 · pusat (0.50, 0.48)
lembar 25 %/50 %: /home/irfan/work/skill-development/projects/jensen-pain-suffering/qc/stills/balance_sheet.jpg
FAIL: 7 frame berat sebelah
exit 1
```

## Lain
- File antara milik saya dihapus: `qc/draft_458-560.mp4`, `qc/draft_561-620.mp4`, `qc/draft_500-540.mp4`, `qc/draft_528-532.mp4`. Disk sekarang ±14 GB bebas.
- Render draft 2× lebih lama dari r6. Penyebabnya mesin dipakai bersama, dan tanpa `will-change` lapisan film di-raster ulang penuh setiap frame.
