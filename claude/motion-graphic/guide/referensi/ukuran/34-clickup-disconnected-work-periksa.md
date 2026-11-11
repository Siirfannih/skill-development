PUTUSAN: PERBAIKI

Kelengkapan belum penuh; 6 dari 6 klaim ukur cocok dalam toleransi yang ditentukan.

## Kelengkapan
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | PENGIKAT, TEKNIK, delapan subbagian, Cek kemiripan, Catatan pakai sesuai; Proporsi terukur merupakan tambahan wajib. |
| Delapan bagian spesifik | Ya | §1–3 dan §5–8 memuat angka; §4 menyatakan grafik 3D/2,5D, lencana dan UI perangkat tanpa footage. |
| Proporsi terukur: tabel per jenis adegan | Ya | Tujuh jenis adegan, dari judul hingga wordmark. |
| Ada 6–8 frame kunci | Ya | Tujuh JPEG k1–k7 tersedia. |
| Diambil untuk sesuai nama dan fokus terinci | Ya | Nama asli IG DbszEmpIfK8 disebut dan diakui generik; sorot kata, metafora, dan kamera dijabarkan rinci di §2/5/6. |
| Cek kemiripan bisa diperiksa dari still | Tidak | Butir “Tiap still dari tengah shot…” meminta pembandingan waktu; “tidak ada shot diam kecuali penutup” memerlukan urutan gerak. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Angka per kata/huruf menerangkan gerak masuk/pengetikan; tidak ada aturan durasi baca teks. |

## Ukur ulang
Koordinat dari kiri atas, (x0,y0,x1,y1), batas kanan/bawah eksklusif; JPEG 1080×608, video 1276×718, 300 frame/30 fps = 10,00 detik. W/H = lebar/tinggi frame; pp = poin persen.
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| x-height “broken” | 9,1% H | 34-k2-sorot-kata.jpg; huruf o (556,273,607,328) | 55 px = 9,05% H | 0,59% relatif | Ya |
| Rasio x-height kata kunci : sambung | 1,36× | 34-k3-cincin-lencana.jpg; bawah (452,300,551,317), atas (509,280,573,296) | Median huruf tanpa ascender/descender: 15/10 px = 1,50× | 10,29% relatif | Ya |
| Pusat blok judul | (46%,50%) | 34-k1-judul-per-kata.jpg; (301,280,765,344) | (49,35%,51,32%) | x +3,35 pp; y +1,32 pp | Ya |
| Ukuran kolom cari | 48,9% W × 10,7% H | 34-k6-kolom-cari.jpg; (248,266,835,335) | 587×69 px = 54,35% W × 11,35% H | W 11,15%; H 6,06% relatif | Ya |
| Latar putih | #FBFDFA; RGB(251,253,250) | 34-k4-putih-panel-ui.jpg; (700,340,760,400) | Median RGB(253,255,252) = #FDFFFC | RGB (+2,+2,+2) | Ya |
| Cut per menit | 5/10 detik = 30/menit | video.mp4; f24,55,123,178,240, masing-masing dibanding frame sebelumnya; (0,0,1276,718) | 5/10,00 detik = 30/menit | 0% | Ya |

Metode: PIL/numpy/OpenCV; x-height dari badan huruf hingga baseline, tanpa ascender/descender. Pusat mencakup kata terakhir yang masih blur (minimum kanal RGB >85; ambang 75–110 tetap dalam toleransi posisi). Batas pill memakai kontur Canny 50/100, mengecualikan bloom. Cut diverifikasi pada seluruh video dan pasangan frame, termasuk punch-in sesuai definisi kartu; morph tidak dihitung sebagai cut.
Skrip reproduksi: `periksa_scripts/ukur.py`; hasil mentah: `periksa_scripts/hasil.json`; bukti cut: `periksa_scripts/batas-adegan.jpg` dan `periksa_scripts/seluruh-video.jpg`.

## Terlihat tetapi tidak tertulis
- **34-k6-kolom-cari.jpg:** ujung kanan pill memuat ikon kaca pembesar berupa lingkaran putih bergaris tipis dengan gagang serong ke kanan bawah.
- **34-k4-putih-panel-ui.jpg:** panel UI memiliki bingkai/sisi tebal hitam-abu yang terlihat sebagai ketebalan perangkat di tepi bidang putih.

## Usul koreksi angka
Tidak ada: keenam klaim cocok dalam toleransi. Putusan PERBAIKI berasal dari kelengkapan Cek kemiripan, bukan angka.
