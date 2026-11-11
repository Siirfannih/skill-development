PUTUSAN: PERBAIKI

Kelengkapan belum penuh; 6 dari 6 klaim terukur cocok.

| Kelengkapan | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | PENGIKAT, TEKNIK, bagian 1–8, Cek kemiripan, Catatan pakai tersedia; Proporsi terukur tambahan wajib. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | 1 hex; 2 x-height; 3 cut; 4 jenis/crop footage; 5 skala/lapis; 6 push/pan; 7 onset; 8 BPM/mix. |
| Proporsi terukur: tabel per jenis adegan | Ya | Delapan jenis adegan, k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPG di keyframes/. |
| Diambil untuk sesuai nama dan paling rinci | Ya | Storytellingkonsep.mp4 → struktur cerita; tabel 11 babak dengan ucapan, waktu, visual dan pola cerita. |
| Cek kemiripan bisa diperiksa dari still | Tidak | Cut/menit, gerak kamera panjang dan ganti musik membutuhkan video/audio; urutan babak membutuhkan urutan waktu. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Waktu babak mendeskripsikan sumber; tidak ada ketentuan durasi tampil teks untuk karya berikutnya. |

Ukur ulang memakai JPG 1080×608; persentase dinormalisasi terhadap ukuran JPG, bukan 718 px sumber.
Kotak (x0,y0,x1,y1), titik asal kiri atas; batas kanan/bawah eksklusif. Ukuran huruf memakai piksel tinta, bukan kotak font.
X-height diwakili huruf tanpa ascender/descender; cap-height diwakili C. Selisih relatif = |ukur/kartu − 1| × 100%; batas cocok ≤15%.
Skrip: periksa_scripts/ukur.py; hasil mentah: periksa_scripts/hasil.json. Segmentasi warna/komponen untuk huruf dan klip; anotasi batas kertas untuk foto gabus, tanpa bayangan.

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Bingkai klip, lebar × tinggi | 67×66% | 70-k1-halaman-putih.jpg (184,103,896,505) | 712×402 px = 65,93×66,12% | 1,60%; 0,18% | Ya |
| Tinggi seluruh huruf judul | 65% | 70-k2-kartu-judul.jpg (88,103,993,504) | 401 px = 65,95% | 1,47% | Ya |
| X-height “talent”, huruf a | 6,8% | 70-k3-wajah-teks-merah.jpg (575,289,612,331) | 42 px = 6,91% | 1,59% | Ya |
| Rasio kata kunci/anak kalimat, e/e | 1,9× | 70-k4-wajah-kata-kunci.jpg (205,164,245,209); (200,223,220,245) | 45/22 px = 2,05× | 7,66% | Ya |
| Cap-height “Charles”, C | 8,2% | 70-k5-matras-polaroid.jpg (591,146,618,190) | 44 px = 7,24% | 11,75% | Ya |
| Foto gabus kiri, lebar × tinggi | ±42×48% | 70-k6-papan-gabus.jpg (126,249,584,551) | 458×302 px = 42,41×49,67% | 0,97%; 3,48% | Ya |

Terlihat tetapi tidak tertulis:
- 70-k2-kartu-judul.jpg: isi huruf judul bergradasi vertikal, sian terang di atas menjadi biru lebih gelap di bawah; kartu hanya menyebut satu hex judul.
- 70-k3-wajah-teks-merah.jpg dan 70-k4-wajah-kata-kunci.jpg: pola titik/kisi kecil teratur melapisi wajah dan teks, berbeda dari grain acak; perlakuan footage tokoh ini belum disebut.
- 70-k4-wajah-kata-kunci.jpg: dua baris kecil “enough to” dan “bet everything” menjorok ke kanan terhadap awal “delusional”; bukan satu tepi kiri bersama.

Usul koreksi angka:
Tidak ada; semua enam hasil berada dalam toleransi. Angka di luar sampel ini tidak dinyatakan telah terverifikasi.
