PUTUSAN: PERBAIKI

Lima dari enam klaim cocok; kelengkapan belum penuh karena satu butir Cek kemiripan memerlukan video bergerak.

## Kelengkapan
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading wajib sama dengan template | Ya | PENGIKAT, TEKNIK, bagian 1–8, Cek kemiripan, Catatan pakai lengkap; Proporsi terukur ditambahkan. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | 1: hex; 2: tinggi huruf; 3: cut; 4: jenis arsip; 5: skala; 6: transformasi; 7: jumlah SFX; 8: bpm/LUFS. |
| Proporsi terukur dengan tabel per jenis adegan | Ya | Delapan jenis adegan, k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan berkas JPG, k1–k8. |
| Diambil untuk sesuai nama file dan paling rinci | Ya | Nama asli “IG DfFsUfUx0dZ” dicatat tanpa menerka maksudnya; fokus foto kelompok/teks/ritme dijabarkan paling rinci di bagian 1–3, 5–6. |
| Cek kemiripan dapat diperiksa dari still | Tidak | Butir terakhir: median shot 0,6 dtk dan push 8–13% per detik membutuhkan urutan waktu. |
| Tidak ada aturan lama durasi tampil teks dalam detik | Ya | Bagian Teks tidak menetapkan durasi tampil; waktu di bagian lain menerangkan shot, kamera, atau audio. |

## Ukur ulang
Semua frame 1276×718; kotak (x0,y0,x1,y1), ujung kanan/bawah eksklusif. Tinggi huruf mengikuti ascender–garis dasar: “l” pada Paul dan “M” pada Million; juluran simbol $ tidak dihitung.
| Klaim | Nilai di kartu | Frame + kotak piksel | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi Paul Gra… | 13,2% tinggi | 39-k1-foto-kelompok.jpg (699,69,725,164), huruf l | 95 px = 13,23% | 0,24% relatif | Ya |
| Tinggi $43 Million | 12,1% tinggi | 39-k4-kata-besar.jpg (583,311,660,397), huruf M | 86 px = 11,98% | 1,01% relatif | Ya |
| Pusat blok Five thousand more | cx 50%, cy 50% (tabel k2) | 39-k2-kartu-judul.jpg (497,344,838,373) | cx 52,31%, cy 49,93% | 2,31 dan 0,07 poin persen | Ya |
| Warna pusat latar pucat | #FAF7FB = (250,247,251) | 39-k2-kartu-judul.jpg (618,299,658,329), area tanpa teks | Median #FCFAFD = (252,250,253) | RGB: 2,3,2 | Ya |
| Skala kartu foto, termasuk bingkai | 50% lebar × 52% tinggi | 39-k5-kartu-foto.jpg (326,171,962,540) | 636×369 px = 49,84% × 51,39% | 0,31% dan 1,17% relatif | Ya |
| Lebar tiap ubin kolase | 15–20% lebar | 39-k6-kolase.jpg (631,312,968,576), potret kanan bawah | 337 px = 26,41% | 32,05% relatif terhadap batas terdekat 20% | Tidak |

Metode: segmentasi luminans untuk huruf; pusat kotak tinta; median RGB; gradien profil median untuk tepi kartu/ubin, tanpa bayangan. Ambang huruf diuji ±10 tingkat: tinggi k1 94–95 px, k4 tetap 86 px. Toleransi: ukuran 15% relatif, posisi 5 poin persen, RGB 20 per kanal; rentang dibandingkan dengan batas terdekat.

## Terlihat tetapi tidak tertulis
- 39-k5-kartu-foto.jpg: seluruh kelompok dalam kartu kembali berwarna; perlakuannya berbeda dari seleksi warna pada k1.
- 39-k6-kolase.jpg: gugus ubin tersusun memanjang vertikal dengan ruang hitam luas di kiri–kanan; beberapa ubin terpotong tepi atas frame.
- 39-k3-arsip-caption.jpg: bidang oranye mendominasi latar atas, sofa hijau membingkai tubuh, dan laptop besar menutup kiri bawah.

## Usul koreksi angka
- Lebar ubin kanan bawah k6: 26,41% lebar frame (337/1276), di luar rentang 15–20%; hasil ini khusus ubin tersebut, bukan ukuran semua ubin.

Skrip: periksa_scripts/ukur.py; hasil lengkap: periksa_scripts/hasil.json. Pemeriksaan ini tidak menilai klaim lain yang tidak dipilih.
