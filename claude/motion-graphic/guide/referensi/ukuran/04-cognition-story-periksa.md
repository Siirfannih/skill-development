PUTUSAN: PERBAIKI

| Kelengkapan | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | PENGIKAT, TEKNIK, delapan subbagian, Cek kemiripan, Catatan pakai sesuai; Proporsi terukur ditambahkan. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | Bagian 1–8 memuat palet/raster, ukuran huruf, cut, jenis footage, skala, kamera, transien, dan mix. |
| Proporsi terukur berupa tabel per jenis adegan | Ya | Delapan jenis adegan, k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPG tersedia di keyframes/. |
| Diambil untuk sesuai nama file dan paling rinci | Ya | Nama founded_De9ykdsOC_X dicatat; nama tidak menentukan bagian; teks dan sistem kartu/ritme dipilih, dengan bagian Teks paling rinci. |
| Cek kemiripan bisa dicek dari still | Tidak | Butir terakhir memuat cut/menit, median shot, dan push per shot; semuanya membutuhkan urutan video. |
| Tidak ada aturan lama durasi tampil teks dalam detik | Ya | Angka detik merujuk ritme/kamera/audio dan batas sampel, bukan aturan lama tampil teks. |

Ukur independen: frame 720×1280; kotak (x0,y0,x1,y1), batas kanan/bawah eksklusif. Skrip: periksa_scripts/ukur.py; data: periksa_scripts/hasil.json.
Tinggi huruf dihitung dari puncak huruf sampai garis dasar; kata yang diuji tidak memiliki descender. Posisi blok mencakup seluruh tinta, termasuk descender “y”.
Selisih rentang dihitung ke batas terdekat (0 bila di dalam); ukuran/rasio ≤15%, posisi ≤5 poin persen, warna tiap kanal ≤20. Ambang segmentasi diuji ulang untuk huruf dan penampang tokoh.

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi kata kunci Alexander | k1: 2,3–2,7% tinggi | 04-k1-arsip-foto-teks.jpg (218,620,395,651) | 31 px = 2,42% | 0; dalam rentang | Ya |
| Rasio tinggi kata kunci : sambung | 1,0–1,3 | 04-k5-ui-gelap.jpg; writes code (289,626,494,655); that (229,624,284,655) | 29/31 = 0,94 | 6,45% dari batas 1,0 | Ya |
| Pusat vertikal teks kartu merah | y 50% | 04-k2-kartu-merah.jpg (244,623,373,659) | y=641 px = 50,08% | 0,08 poin persen | Ya |
| Lebar tokoh | ±55% lebar | 04-k1-arsip-foto-teks.jpg (31,800,630,801) | Penampang 599 px = 83,19%; lebar total ≥83,19% | ≥51,26% relatif | Tidak |
| Merah latar bagian tengah | #BE0011–#CE080E | 04-k2-kartu-merah.jpg (300,400,420,520) | Median RGB 191/0/18 = #BF0012 | ΔRGB 1/0/1 dari #BE0011 | Ya |
| Lebar logo Scale, simbol + wordmark | 40–51% lebar | 04-k3-logo-terang.jpg (207,611,516,670) | 309 px = 42,92% | 0; dalam rentang | Ya |

Lebar tokoh adalah batas bawah yang pasti dari penampang jaket pada y=800, bukan perkiraan batas keseluruhan tubuh. Ambang rerata RGB <40 memisahkan jaket dari latar pada baris tersebut.
Kelima klaim cocok memenuhi toleransi; satu klaim tidak cocok. Kelengkapan belum penuh, sehingga putusan PERBAIKI.

### Terlihat tetapi tidak tertulis
- 04-k5-ui-gelap.jpg: editor menampilkan diff berdampingan, dengan sorotan baris merah di kiri dan hijau di kanan; bingkai browser dan judul “Expanded Editor” ikut terlihat.
- 04-k4-logo-gelap.jpg: simbol Cognition berwarna abu gelap berkontras rendah, sedangkan wordmark jauh lebih terang.
- 04-k6-kartu-merek.jpg: pita oranye memiliki pusat kuning-oranye yang lebih terang dan tepi kiri/kanan lebih merah; warnanya tidak seragam.

### Usul koreksi angka
- Lebar tokoh k1: ≥83,19% lebar frame (penampang 599/720 px pada y=800); angka ini merupakan batas bawah hasil ukur.
