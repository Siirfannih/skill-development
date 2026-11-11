PUTUSAN: PERBAIKI

Klaim cocok: **2 dari 6**. Kelengkapan belum penuh.

| Kelengkapan | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | Semua heading wajib ada; Proporsi terukur merupakan tambahan. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | Warna: hex; Teks: proporsi; Ritme: cut; B-roll: aset/crop; Motion: skala; Kamera: gerak; SFX: event; Musik: BPM/LUFS. |
| Proporsi terukur, tabel per jenis adegan | Ya | Delapan jenis adegan, k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPG tersedia dalam keyframes/. |
| Diambil untuk sesuai nama file dan menjadi bagian paling rinci | Tidak | Nama asli generik dicatat, tetapi “lihat bagian terkuat” menunjuk ritme/caption tanpa menetapkan satu bagian utama yang paling rinci. |
| Cek kemiripan bisa diperiksa dari still | Tidak | Butir terakhir memerlukan video: cut/menit, median shot, push, dan drift. |
| Tidak ada aturan lama durasi tampil teks dalam detik | Ya | 1–2 frame menjelaskan animasi masuk; tidak mengatur lama tahan caption. |

Pengukuran: frame 960×720; kotak (x0,y0,x1,y1), batas akhir eksklusif. Skrip: periksa_scripts/ukur.py; data dan gambar anotasi berada di folder yang sama.
Tinggi memakai kotak tinta terlihat sesuai istilah “tinggi kotak” pada kartu; renaissance/of a tidak memiliki descender, sehingga batas bawahnya garis dasar. Rasio membandingkan renaissance dengan of a pada k1.
Selisih ukuran relatif terhadap angka kartu; posisi dibandingkan dengan rentang terdekat. Ambang: ukuran ≤15%, posisi ≤5 poin persen, tiap kanal warna ≤20.

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi renaissance | 11% tinggi | 32-k1-wajah-caption.jpg (104,498,859,601) | 103 px = 14,31% | 30,1% | Tidak |
| Rasio kata kunci : kata sambung | ±1,6× | 32-k1-wajah-caption.jpg renaissance (104,498,859,601); of a (166,339,269,388) | 103/49 = 2,10× | 31,4% | Tidak |
| Pusat blok kata kunci | (50%,72–78%) pada tabel k1 | 32-k1-wajah-caption.jpg (104,498,859,601) | (50,16%,76,32%) | x 0,16; y 0 poin persen | Ya |
| Tinggi angka 1440 | ±54% tinggi | 32-k3-judul-angka-tekstur.jpg (0,222,948,551) | 329 px = 45,69% | 15,4% | Tidak |
| Merah printing | #C91F29 | 32-k4-gravir-kertas.jpg (468,383,690,446) | Median interior #CB1F28, RGB (203,31,40) | Kanal (2,0,1) | Ya |
| Lebar potret dokumen | ±20% lebar | 32-k6-dokumen-ui.jpg (482,164,756,523) | 274 px = 28,54% | 42,7% | Tidak |

Batas vertikal 1440 tetap y=222–551 pada tiga ambang piksel terang (145/165/185); selisih 15,4% sedikit melewati batas 15%. Potret diukur sebagai panel gambar utuh, bukan hanya wajah; panah merah dikeluarkan dari segmentasi.

### Terlihat tetapi tidak tertulis

- 32-k1-wajah-caption.jpg: tangan besar di kanan menjadi lapisan depan yang buram, lebih dekat daripada wajah dan caption.
- 32-k2-arsip-berita.jpg: lower-third bawaan siaran bertumpuk merah/putih/hitam, dengan headline besar dan ticker kecil memenuhi bagian bawah.
- 32-k3-judul-angka-tekstur.jpg: isi angka terang krem berkontras dengan lukisan luar bernuansa biru/negatif; bagian tangan tetap tersambung melintasi batas angka.
- 32-k5-hitung-ikon.jpg: ikon buku menutupi sebagian digit angka vertikal di kanan; lapisan ikon berada di depan angka.
- 32-k6-dokumen-ui.jpg: panel potret bersudut membulat dan memiliki tombol kaca pembesar bulat di pojok kanan atas.

### Usul koreksi angka

- Tinggi renaissance pada k1: **14,31%** tinggi frame.
- Rasio renaissance : of a pada k1: **2,10×**.
- Tinggi angka 1440 pada k3: **45,69%** tinggi frame.
- Lebar panel potret pada k6: **28,54%** lebar frame.
