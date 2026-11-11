PUTUSAN: PERBAIKI

Kelengkapan penuh; **4 dari 6 klaim cocok** (syarat LAYAK: minimal 5/6).

## Kelengkapan
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading sesuai template | Ya | PENGIKAT, TEKNIK, delapan subbagian, Cek kemiripan, Catatan pakai; tambahan Proporsi terukur tersedia. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | Termasuk observasi ketiadaan footage di bagian 4; bagian lain memuat angka atau ciri konkret. |
| Proporsi terukur dengan tabel per jenis adegan | Ya | Delapan jenis adegan k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPG, seluruhnya 736×414. |
| Diambil untuk sesuai nama dan paling rinci | Ya | Nama Jordan_Esfa tidak menyebut aspek; kartu menyatakan pilihan teks kinetik, dirinci paling banyak di bagian Teks. |
| Cek kemiripan bisa dicek dari still | Ya | Bentuk, proporsi, warna, lapisan dari still; butir kamera secara eksplisit memakai pasangan still berurutan. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Waktu yang dicatat merupakan pengamatan animasi/ritme sumber, bukan ketentuan durasi tampil untuk video baru. |

## Ukur ulang
Kotak `(x0,y0,x1,y1)` memakai batas akhir eksklusif; koordinat pada JPG asli 736×414. Tinggi teks = seluruh tinta baris dari ascender hingga baseline/descender, mengikuti kartu; pusat = pusat kotak tinta. Panah = seluruh siluet, termasuk sisi terang.
Skrip: `periksa_scripts/ukur_independen.py`; hasil mentah: `periksa_scripts/hasil_ukur.json`. Masker teks: rata-rata RGB ≥180, rentang kanal ≤45; ROI mengecualikan titik grid. Uji ambang 120–220 disimpan; k1 stabil 15 px pada 120–200, ambang 220 memangkas tepian menjadi 14 px.
Selisih ukuran relatif terhadap nilai kartu; untuk rentang gunakan jarak ke batas terdekat (nol bila di dalam). Posisi memakai poin persen (pp). Ambang cocok: ukuran ≤15%, posisi tiap sumbu ≤5 pp.

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi kata awal “Sometimes” | 3,1% H (tabel k1) | 73-k1-kata-awal.jpg; (316,196,421,211) | 15 px = 3,62% H | +16,9% relatif | Tidak |
| Tinggi “in After Effects.” | 8,0% H | 73-k3-kata-kunci-besar.jpg; (216,181,521,214) | 33 px = 7,97% H | −0,4% relatif | Ya |
| Tinggi “motion” | 9,4% H | 73-k6-kata-tunggal-maks.jpg; (283,177,453,215) | 38 px = 9,18% H | −2,4% relatif | Ya |
| Rasio kata besar terhadap kata kecil | ±2,5–3× | 73-k6-kata-tunggal-maks.jpg (283,177,453,215) / 73-k1-kata-awal.jpg (316,196,421,211) | 38/15 = 2,53× | 0%; dalam rentang | Ya |
| Pusat blok teks k4 | (55%,49%) (tabel k4) | 73-k4-tambah-per-kata.jpg; (324,185,439,226) | (51,83%,49,64%) | x −3,17 pp; y +0,64 pp | Ya |
| Tinggi panah k2 | 9,4% H (tabel k2) | 73-k2-frasa-panah.jpg; (351,264,394,311) | 47 px = 11,35% H | +20,8% relatif | Tidak |

## Terlihat tetapi tidak tertulis
- **73-k4-tambah-per-kata.jpg:** “by” berada lebih tinggi daripada “the”; kata-kata pada saat masuk belum berbagi garis dasar. Detail ini belum dicatat dan membatasi klaim “selalu satu baris”.
- **73-k2-frasa-panah.jpg, 73-k3-kata-kunci-besar.jpg:** siluet kepala panah memiliki cekungan V di sisi belakang; bentuk cekungnya belum dijelaskan oleh sebutan panah/kursor 3D low-poly.

## Usul koreksi angka
- Tinggi kata awal k1: **3,62% tinggi frame** (15 px), menggantikan 3,1% pada baris k1.
- Tinggi panah k2: **11,35% tinggi frame** (47 px), menggantikan 9,4% pada baris k2.
