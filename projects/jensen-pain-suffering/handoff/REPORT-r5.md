# REPORT r5 (+ r4) · Editor · jensen-pain-suffering

## r4 (b-roll stok ke tengah)
- B5a T23/T24 `kata` di tengah frame (sx 960, sy 466, 146 px → cap ±105 = 9,7 %). T25 `skala`: 'for' 146 px → 'setbacks' 260 px amber (cap ±186 = 17 %) → 'and' 146 px di bawahnya. Scrim atas diganti penggelap rata 55 % + vignette 0,7, tanpa kotak. Taksiran kontras: putih 8,4 : 1, amber 'setbacks' 4,6 : 1.
- B8b T45/T46 ke tengah frame (sy 465/475), tilt 2,5D tetap.
- Draft r4 terpisah dihentikan atas arahan Sutradara (hanya PID milik saya, lewat TaskStop; tidak ada sisa proses). Draft penuh dirender sekali setelah r5.

## r5 lapisan film + glow
Komponen `remotion/src/engine/Film.tsx` (`FilmLook`), dipasang lewat `Cam film=…`. Footage dan lapisan film digambar lebih dulu; teks (`Cam text=…`) digambar sesudahnya di dunia kamera yang sama, jadi lapisan film tidak menimpa teks.

| Lapisan | penuh (B2, B5a, B6a, B7a, B8a, B8b, B9a, B10) | sedang (B4, B6b foto tim) | ringan (Jensen: B1, B3, B6c, B7b, B9b, B11, B12a) | kartu (B5b, B12) |
|---|---|---|---|---|
| Bloom (salinan threshold brightness 1,15 / contrast 2,2, blur, screen) | 0,48 · blur 24 px | 0,36 · 22 px | 0,20 · 22 px | – |
| Halation (sorot contrast 3, blur 10 px, multiply #FF5A1F, screen) | 0,24 | 0,18 | 0,15 | – |
| Halftone (titik 5 px, soft-light) | 0,20 | 0,10 | – | – |
| Aberasi R/B ±3 px + blur 5 px, mask elips (tajam di tengah) | tengah 55 % tajam → penuh di 88 % | – | ±2 px, hanya 82–100 % (tepi luar) | – |
| Hitam terangkat (screen rgb 12,10,8) | ya | ya | ya | – |
| Grain (turbulence per frame) | 0,16 | 0,13 | 0,10 | 0,12 |
| Vignette | yang sudah ada | yang sudah ada | – | – |

- Glow teks: setiap kata punya halo 26 px warna hurufnya sendiri (putih 0,30, amber 0,34), di atas bayangan gelap 22 px. Judul SUFFERING mendapat salinan amber blur 26 px, screen 0,32.
- Teks, posisi, dan kamera tidak berubah dari r4. Grain lama di B5 (yang tadinya di atas teks) dihapus dan diganti grain FilmLook di bawah teks.

## Waktu render (render.sh draft, skala 0,5, konkurensi 4, rentang f561–620 = 60 frame, bundle sudah ada)
| Versi | Total | Per frame (termasuk ±4–5 dtk start) |
|---|---|---|
| sebelum r5 (r4) | 7,6 dtk | 0,126 dtk |
| r5 semua blur resolusi penuh | 26,2 dtk | 0,436 dtk (3,4×) |
| r5 bloom/halation dihitung di 1/4 skala lalu diperbesar | 20,0 dtk | 0,333 dtk |
| r5 + aberasi dan grain di 1/2 skala (dipakai) | 15,9 dtk | 0,265 dtk (±2,1× total; ±3× bila overhead start dikurangkan) |
| **Draft penuh r5** (1428 frame) | **623 dtk (10 mnt 23 dtk)** | ±0,44 dtk |
Masih di atas 2×. Langkah berikut bila perlu: bloom/halation dihitung sekali per klip dengan ffmpeg (video 480p terpisah, di-screen di Remotion). Itu belum dikerjakan karena lapisan film juga mencakup cetakan/meja (B4) dan crop wajah.

## Keluaran
- Still: `qc/stills/` (34 still, frame sama dengan r2/r4, ditambah B05c f470 dan B05d f540 untuk T23/T25 r4).
- Sanding: `qc/sanding_film.jpg`, berisi B05a (penuh), B07a (penuh), B06c = foto tim B6b (sedang), dan B03c (ringan), masing-masing berdampingan dengan `ref/fg_50.png`.
- Draft: `qc/draft.mp4`, 960×540, 1428 frame, 47,600000 dtk.

## Gate (keluaran apa adanya)
`teks_cek.py qc/stills`
```
still dicek: 34
TIDAK ADA TANDA
exit 0
```
`balance_check.py qc/stills`
```
PERIKSA B01a.png                     kiri 0.48 kanan 0.52 · atas 0.90 bawah 0.10 · pusat (0.49, 0.36)
PERIKSA B01b.png                     kiri 0.56 kanan 0.44 · atas 0.89 bawah 0.11 · pusat (0.43, 0.32)
FAIL    B01c.png                     kiri 0.75 kanan 0.25 · atas 0.83 bawah 0.17 · pusat (0.35, 0.33)  ← berat kiri
FAIL    B02a.png                     kiri 0.28 kanan 0.72 · atas 0.79 bawah 0.21 · pusat (0.58, 0.41)  ← berat kanan
ok      B02b.png                     kiri 0.56 kanan 0.44 · atas 0.36 bawah 0.64 · pusat (0.48, 0.49)
PERIKSA B03a.png                     kiri 0.62 kanan 0.38 · atas 0.89 bawah 0.11 · pusat (0.42, 0.35)
ok      B03b.png                     kiri 0.49 kanan 0.51 · atas 0.77 bawah 0.23 · pusat (0.49, 0.43)
PERIKSA B03c.png                     kiri 0.48 kanan 0.52 · atas 0.79 bawah 0.21 · pusat (0.47, 0.44)
ok      B04a.png                     kiri 0.35 kanan 0.65 · atas 0.35 bawah 0.65 · pusat (0.56, 0.53)
FAIL    B04b.png                     kiri 0.76 kanan 0.24 · atas 0.48 bawah 0.52 · pusat (0.39, 0.48)  ← berat kiri
ok      B04c.png                     kiri 0.45 kanan 0.55 · atas 0.48 bawah 0.52 · pusat (0.52, 0.49)
ok      B05a.png                     kiri 0.51 kanan 0.49 · atas 0.36 bawah 0.64 · pusat (0.51, 0.57)
ok      B05b.png                     kiri 0.49 kanan 0.51 · atas 0.50 bawah 0.50 · pusat (0.50, 0.50)
ok      B05c.png                     kiri 0.60 kanan 0.40 · atas 0.40 bawah 0.60 · pusat (0.47, 0.56)
ok      B05d.png                     kiri 0.58 kanan 0.42 · atas 0.29 bawah 0.71 · pusat (0.49, 0.62)
ok      B06a.png                     kiri 0.52 kanan 0.48 · atas 0.56 bawah 0.44 · pusat (0.52, 0.44)
ok      B06b.png                     kiri 0.38 kanan 0.62 · atas 0.64 bawah 0.36 · pusat (0.58, 0.39)
ok      B06c.png                     kiri 0.54 kanan 0.46 · atas 0.57 bawah 0.43 · pusat (0.46, 0.42)
PERIKSA B06d.png                     kiri 0.55 kanan 0.45 · atas 0.89 bawah 0.11 · pusat (0.45, 0.36)
FAIL    B07a.png                     kiri 0.72 kanan 0.28 · atas 0.27 bawah 0.73 · pusat (0.34, 0.59)  ← berat kiri
ok      B07b.png                     kiri 0.54 kanan 0.46 · atas 0.42 bawah 0.58 · pusat (0.44, 0.54)
PERIKSA B07c.png                     kiri 0.47 kanan 0.53 · atas 0.89 bawah 0.11 · pusat (0.47, 0.37)
FAIL    B08a.png                     kiri 0.28 kanan 0.72 · atas 0.80 bawah 0.20 · pusat (0.52, 0.35)  ← berat kanan
FAIL    B08b.png                     kiri 0.28 kanan 0.72 · atas 0.81 bawah 0.19 · pusat (0.53, 0.33)  ← berat kanan
FAIL    B08c.png                     kiri 0.70 kanan 0.30 · atas 0.77 bawah 0.23 · pusat (0.44, 0.36)  ← berat kiri
FAIL    B08d.png                     kiri 0.85 kanan 0.15 · atas 0.42 bawah 0.58 · pusat (0.26, 0.53)  ← berat kiri
ok      B09a.png                     kiri 0.49 kanan 0.51 · atas 0.67 bawah 0.33 · pusat (0.48, 0.33)
FAIL    B09b.png                     kiri 0.72 kanan 0.28 · atas 0.65 bawah 0.35 · pusat (0.39, 0.38)  ← berat kiri
PERIKSA B09c.png                     kiri 0.67 kanan 0.33 · atas 0.78 bawah 0.22 · pusat (0.38, 0.36)
ok      B10.png                      kiri 0.46 kanan 0.54 · atas 0.44 bawah 0.56 · pusat (0.51, 0.46)
PERIKSA B11.png                      kiri 0.48 kanan 0.52 · atas 0.92 bawah 0.08 · pusat (0.48, 0.30)
PERIKSA B12a.png                     kiri 0.57 kanan 0.43 · atas 0.85 bawah 0.15 · pusat (0.45, 0.35)
ok      B12b.png                     kiri 0.50 kanan 0.50 · atas 0.50 bawah 0.50 · pusat (0.50, 0.50)
ok      B12c.png                     kiri 0.50 kanan 0.50 · atas 0.50 bawah 0.50 · pusat (0.50, 0.48)
lembar 25 %/50 %: /home/irfan/work/skill-development/projects/jensen-pain-suffering/qc/stills/balance_sheet.jpg
FAIL: 9 frame berat sebelah
exit 1
```
Catatan balance: posisi teks dan kamera di r5 tidak berubah. Jumlah FAIL naik dari 2 (r4: B07a/B07b) menjadi 9 setelah lapisan film dipasang. Itu terjadi karena alat menimbang "kepadatan detail" footage, dan bloom, halftone, serta blur tepi mengubah detail itu (mis. B02a, B08a/b berbalik ke kanan). Ini perlu dinilai mata oleh Sutradara/juri.
