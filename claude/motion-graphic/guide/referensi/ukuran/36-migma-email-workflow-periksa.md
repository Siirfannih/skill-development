PUTUSAN: PERBAIKI

Kelengkapan:
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | Semua heading wajib ada; tambahan Proporsi terukur. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | Bagian 1–8; termasuk crop foto fashion pada bagian 4. |
| Proporsi terukur dengan tabel per jenis adegan | Ya | Delapan jenis adegan. |
| Ada 6–8 frame kunci | Ya | Delapan berkas 36-k1 sampai 36-k8. |
| Diambil untuk sesuai nama dan paling rinci | Ya | Nama IG generik; fokus demo UI dijabarkan pada bagian 5–6, disertai warna bagian 1. |
| Cek kemiripan dapat diperiksa dari still | Ya | Warna, tipografi, skala, lapisan, gradien, grain. |
| Tidak ada aturan lama durasi tampil teks | Ya | Detik dipakai untuk ritme/peristiwa, bukan aturan durasi teks. |

Ukur ulang — 3 dari 6 klaim cocok; tidak ada hasil ragu.
Koordinat piksel dari kiri atas, kotak [x0,y0,x1,y1), ukuran frame 1276×718.
Tinggi kapital = tinta puncak sampai garis dasar; dipilih Y/E/M tanpa descender. Ambang luminans putih >180, hitam <100. Skala email mencakup bingkai, tanpa bayangan; warna median area kosong panel.
Posisi pusat dibandingkan dengan titik tengah rentang kartu. Selisih ukuran relatif terhadap angka kartu; posisi dalam poin persen (pp); warna per kanal RGB.
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Kapital headline UI | 6,1% tinggi | 36-k5-ui-headline.jpg [275,109,301,153), huruf Y | 44 px = 6,13% | 0,46% relatif | Ya |
| Kapital grid editorial | 7,7% tinggi | 36-k4-grid-editorial.jpg [297,136,339,212), huruf E | 76 px = 10,58% | 37,47% relatif | Tidak |
| Kapital logo | 6,4% tinggi | 36-k1-logo-penutup.jpg [556,306,617,364), huruf M | 58 px = 8,08% | 26,22% relatif | Tidak |
| Pusat headline approve | Tengah; y 9–16% → pusat 12,5% | 36-k6-kartu-approve.jpg [377,61,908,119) | x 50,35%; y 12,53% | x 0,35 pp; y 0,03 pp | Ya |
| Skala email pada adegan pasangan | Lebar 26%; tinggi 51% | 36-k5-ui-headline.jpg [194,218,519,645) | 325×427 px = 25,47×59,47% | Lebar 2,04%; tinggi 16,61% relatif | Tidak |
| Latar panel checklist | #151419 | 36-k5-ui-headline.jpg [800,260,950,295) | #151318; RGB (21,19,24) | Kanal (0,1,1), batas 20 | Ya |

Frame dibandingkan dengan video sumber memakai pencarian tiap 3 frame: k1 sekitar 26,2 dtk; k4 8,7; k5 11,7; k6 15,7. Pengukuran tabel tetap pada JPEG bernama di atas.
Skrip dan bukti kotak: periksa_scripts/ukur.py, hasil.json, sumber.json, bukti-*.jpg. Toleransi: ukuran ≤15%; posisi ≤5 pp; tiap kanal warna ≤20.

Terlihat tetapi tidak tertulis:
- 36-k1-logo-penutup.jpg: emblem M berlipat mengilap di kiri nama, dengan tagline kecil terpisah di bawah susunan logo.
- 36-k2-maskot-glow.jpg: maskot hijau limau memakai dasi kupu-kupu cokelat dan dua mata menonjol di atas kepala.
- 36-k5-ui-headline.jpg: status Passed berada dalam pil hijau; setiap baris memakai ikon outline di kiri dan garis pemisah tipis.
- 36-k6-kartu-approve.jpg: tiga thumbnail email berjajar di atas dua tombol berdampingan; Review abu-abu berada di kanan Approve.

Usul koreksi angka:
- Kapital grid pada k4: 10,58% tinggi frame (76 px).
- Kapital logo pada k1: 8,08% tinggi frame (58 px).
- Tinggi email pasangan pada k5: 59,47% tinggi frame (427 px).
