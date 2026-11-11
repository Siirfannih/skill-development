PUTUSAN: PERBAIKI

Kelengkapan
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | Seluruh heading wajib ada; Proporsi terukur merupakan tambahan. |
| Delapan bagian spesifik | Ya | 1 hex/vignette; 2 ukuran/posisi; 3 cut; 4 jenis arsip; 5 komposit; 6 affine/transisi; 7 transien; 8 bpm/LUFS. |
| Proporsi terukur, tabel per jenis adegan | Ya | Delapan jenis adegan, k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPG di keyframes, dirujuk sebagai k1–k8. |
| Diambil untuk sesuai nama file; bagian itu paling rinci | Tidak | Menyebut ID IG dan “nama tidak menyebut bagian”, mengabaikan “dokumenter-arsip” pada nama berkas; teks memang paling rinci. |
| Cek kemiripan bisa dicek dari still | Tidak | Butir terakhir memuat push-in per shot, cut/menit, dan median shot; perlu video. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Angka frasa/1,2 dtk adalah pengamatan ritme, bukan aturan durasi tampil. |

Ukur ulang: 4/6 cocok. Frame 720×1280; kotak (x0,y0,x1,y1), kanan/bawah eksklusif.
Huruf memakai batas tinta naik–turun, tanpa glow/bayangan; kotak caption memakai batas warna.
Rosario mencakup rantai/manik yang terlihat sampai ujung salib, tanpa tangan; batasnya dianotasi visual dalam skrip.
Selisih ukuran relatif terhadap klaim; posisi dalam poin persen (pp), warna per kanal RGB.
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi kotak caption | k3 median 3,8% H | 48-k3-arsip-caption-kuning.jpg (244,608,488,662) | 54 px = 4,22% H | 11,02% | Ya |
| Pusat vertikal caption | k3 y 49–50% | 48-k3-arsip-caption-kuning.jpg (244,608,488,662) | y 635 px = 49,61% | Dalam rentang; 0,11 pp dari tengah rentang | Ya |
| Median kuning kotak | #F9FC30 | 48-k3-arsip-caption-kuning.jpg (250,610,480,660) | #FBFF27; median piksel kuning, tinta dikecualikan | RGB (2,3,9) | Ya |
| Tinggi angka 1954 | 7,0% H | 48-k6-tahun-besar.jpg (267,589,455,675) | 86 px = 6,72% H | 4,02% | Ya |
| Tinggi pengantar one sunday | k6 1,3% H | 48-k6-tahun-besar.jpg (278,554,414,588) | 34 px = 2,66% H | 104,33% | Tidak |
| Tinggi rosario | k4 ±70% H | 48-k4-gelap-teks-bebas.jpg (344,280,463,904) | 624 px = 48,75% H | 30,36% | Tidak |

Ambang tinta pengantar 90–160 menghasilkan tinggi 2,27–2,66% H; seluruhnya tetap melampaui toleransi terhadap 1,3%.
Skrip: periksa_scripts/ukur.py; hasil lengkap dan uji ambang: periksa_scripts/hasil.json.
Metadata video sumber dikonfirmasi ffprobe: 720×1280, 12 fps, 59,672426 dtk.

Terlihat tetapi tidak tertulis
- 48-k6-tahun-besar.jpg: angka 1954 mempunyai bayangan abu-abu bergeser kanan-bawah; ini juga berlawanan dengan “Tanpa bayangan jatuh” di kartu.
- 48-k4-gelap-teks-bebas.jpg: kilau salib berbentuk bintang dengan pancaran horizontal/diagonal, bukan hanya glow rata.
- 48-k1-objek-warna.jpg: kedua tepi objek dolar sendiri buram, sementara ukiran ONE di tengah tajam; kartu hanya menyebut pelunakan footage belakang.
- 48-k3-arsip-caption-kuning.jpg: banyak orang dan koper berjajar memenuhi lebar, tanpa satu tokoh yang dominan; kartu menyatakan satu subjek besar dan hanya k2 banyak objek.

Usul koreksi angka
- Pengantar k6: 1,3% → 2,66% tinggi frame (34 px, batas tinta naik–turun).
- Rosario k4: ±70% → 48,75% tinggi frame (624 px, rantai + salib yang terlihat, tanpa tangan).
