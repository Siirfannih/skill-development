PUTUSAN: LAYAK

Kelengkapan:
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | Seluruh heading wajib ada dan sama; Proporsi terukur merupakan tambahan. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | §1–8 masing-masing memuat palet, ukuran, ritme, footage, objek, gerak, SFX, dan musik yang spesifik. |
| Proporsi terukur: tabel per jenis adegan | Ya | Delapan jenis adegan, dengan ukuran teks, posisi, subjek, dan kedalaman. |
| Ada 6–8 frame kunci | Ya | Delapan JPG, k1–k8. |
| Diambil untuk sesuai nama file; fokus paling rinci | Ya | Nama asli IG Dbn1uwLOphN disebut; fokus motion/UI, dua dunia, dan teks dirinci terutama di §1/2/5; §2 paling panjang. |
| Cek kemiripan dapat diperiksa dari still | Ya | Warna, skala, crop, blur, bingkai, panel, dan italic dapat disandingkan. |
| Tanpa aturan lama durasi tampil teks | Ya | Penanda waktu merupakan contoh sumber, bukan aturan durasi tampil teks. |

Ukur ulang: enam klaim; **5 cocok, 1 ragu, 0 tidak cocok**. Semua JPG 1080×610 piksel.
Kotak memakai (x0,y0,x1,y1), batas kanan/bawah eksklusif. Persen ukuran terhadap frame JPG; hasil tetap sebanding dengan video 1276×720.
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi kapital “A” | ±46,5% tinggi | 33-k1-kata-raksasa.jpg (0,288,200,573) | 285 px = 46,72% | 0,48% relatif | Ya |
| Rasio Onboarding : Getting Started | ±5× | 33-k3-titik-dan-ui-garis.jpg (239,388,583,451); (243,368,336,379) | 63/11 = 5,73× | 14,55% relatif; sensitif ambang | Ragu |
| Pusat blok judul lanskap | (50%,50%) | 33-k5-judul-lanskap.jpg (220,244,864,384) | (50,19%,51,48%) | (0,19;1,48) poin persen | Ya |
| Diameter titik tajam | 13,6% tinggi | 33-k3-titik-dan-ui-garis.jpg (447,123,528,205) | 82 px = 13,44% | 1,16% relatif | Ya |
| Latar off-white | #F0EBE8 | 33-k1-kata-raksasa.jpg (300,40,780,180) | Median #F1EDEA | RGB absolut (1,2,2) | Ya |
| Lebar panel gelap kanan | 31% lebar | 33-k6-ui-kaca-panel-gelap.jpg (727,21,1057,591) | 330 px = 30,56% | 1,43% relatif | Ya |

Metode: tinggi A dari puncak kapital sampai baseline; rasio memakai kotak tinta utuh kedua tulisan, termasuk descender, sesuai ukuran kata pada kartu. Posisi memakai pusat kotak gabungan dua baris, bukan pusat massa tinta.
Tinta gelap disegmentasi pada maksimum RGB <125; putih judul minimum RGB >225 dengan rentang kanal <25; panel memakai komponen gelap terbesar, maksimum RGB <50. A memakai jarak RGB dari latar >45.
Uji ambang tinta 100–150 menghasilkan rasio 5,73–6,30× (label kecil 10–11 px). Status melewati batas toleransi pada sebagian ambang; karena itu ragu, tidak dihitung sebagai tidak cocok dan tidak diusulkan koreksi angka.
Skrip: periksa_scripts/ukur.py; hasil dan uji ambang: periksa_scripts/hasil.json. Video diverifikasi ffprobe: 1276×720, 25 fps, 103,070522 detik; tidak mengaudit cut karena keenam klaim dipilih dari still.

Terlihat tetapi tidak tertulis:
- 33-k2-medan-titik.jpg: titik bagian tengah tersusun dalam baris teratur berselang-seling, tepi lebih menyebar, dengan rongga horizontal lebar mengelilingi kalimat.
- 33-k3-titik-dan-ui-garis.jpg: buku besar digambar sebagai outline tipis di kiri judul; garis tabel tipis membagi panel bawah dan kolom nomor.
- 33-k5-judul-lanskap.jpg: satu cemara sangat tinggi mendominasi sisi kiri depan; pepohonan lain kecil dan berderet dekat horizon.
- 33-k6-ui-kaca-panel-gelap.jpg: tiga kartu vertikal berukuran serupa sejajar; GitHub berisi mint, Salesforce putih, HomeOps memucat abu-abu.

Usul koreksi angka:
Tidak ada angka yang terbukti tidak cocok; satu rasio masih ragu.
