PUTUSAN: PERBAIKI

Enam dari enam klaim cocok; kelengkapan belum penuh. Pemeriksaan mandiri memakai frame 1276×718 dan metadata video sumber, tanpa membaca ukuran.md atau scripts penulis.

| Kelengkapan | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | Seluruh heading wajib sama; tambahan Proporsi terukur tersedia. |
| 1. Warna & tekstur spesifik | Ya | Hex, saturasi, rasio vignette, grain. |
| 2. Teks spesifik | Ya | Tinggi huruf, pusat blok, warna, jumlah kata. |
| 3. Ritme spesifik | Ya | Cut/menit, median shot, kedekatan ketukan. |
| 4. B-roll / footage spesifik | Ya | Urutan kegiatan, POV tangan, sudut rendah. |
| 5. Motion graphic spesifik | Ya | Ukuran orang/piringan, tiga lapis kedalaman. |
| 6. Kamera & transisi spesifik | Ya | Jumlah shot per gerak, faktor push/pull, sudut roll. |
| 7. SFX spesifik | Ya | Stab dan cut diberi timestamp. |
| 8. Musik spesifik | Ya | BPM, LUFS, true peak, LRA. |
| Proporsi terukur: tabel per jenis adegan | Ya | Delapan jenis adegan, k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPG di keyframes/. |
| Diambil untuk sesuai nama dan paling rinci | Tidak | Nama theartexpo.mp4 benar dan netral; fokus 3/1/6 masing-masing 82/101/78 kata, sedangkan teks 174 kata. |
| Cek kemiripan bisa dicek dari still | Tidak | Cut/menit, sinkron ketukan, dan kamera mundur memerlukan rangkaian waktu. |
| Tidak ada aturan lama tampil teks dalam detik | Tidak | DNA dan bagian 2/5 masih membatasi teks pada 0–7 detik. |

Ukur ulang: koordinat dari kiri atas, kotak (x0,y0,x1,y1), batas kanan/bawah eksklusif; ukuran dibagi dimensi frame. Pusat = titik tengah kotak tinta, tanpa margin.
Tinggi huruf kapital/angka = puncak tinta sampai dasar huruf; segmentasi putih RGB minimum 175, rentang kanal ≤55, diverifikasi pada ambang 160 dan 190. Batas paket/orang ditandai visual, ketidakpastian ±3 px; orang mencakup ransel dan ekstremitas, tanpa bayangan.
Rentang kartu dibandingkan dengan batas terdekat; selisih dimensi ≤15%, posisi ≤5 poin persen, warna tiap kanal ≤20 berarti cocok. Klaim majemuk memakai selisih terbesar.

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi tiap baris k1 | 4,5–5,0% H | 21-k1-teks-tangan.jpg: ITS (995,164,1070,199); DAY (996,208,1082,248); 310 (996,258,1083,299) | 35/40/41 px = 4,87/5,57/5,71% H | 0/11,42/14,21% relatif | Ya |
| Tinggi caption k2 | 2,9% H | 21-k2-ruang-lebar.jpg (530,656,747,678) | 22 px = 3,06% H | 5,66% relatif | Ya |
| Pusat blok ucapan k3 | x68%, y49% | 21-k3-punggung-teks.jpg (804,295,936,406) | x68,18%, y48,82% | x+0,18; y−0,18 poin persen | Ya |
| Lebar paket k4 | 41% W | 21-k4-closeup-tangan.jpg (415,140,939,382) | 524 px = 41,07% W | 0,16% relatif | Ya |
| Skala orang k6, W×H | 11×38% | 21-k6-jalan-ikut.jpg (603,278,757,556) | 154×278 px = 12,07×38,72% | W 9,72%; H 1,89% relatif | Ya |
| Median warna penutup | #5A1F13 | 21-k8-malam-turntable.jpg (0,0,1276,718) | Median RGB (90,31,19) = #5A1F13 | ΔRGB (0,0,0) | Ya |

Terlihat tetapi tidak tertulis:
- 21-k1-teks-tangan.jpg: dasar angka “310” menanjak ke kanan; tiga baris tidak memiliki kemiringan seragam.
- 21-k3-punggung-teks.jpg: tulisan melintasi batang lampu hitam, sehingga tinta tampak di depan properti itu.
- 21-k4-closeup-tangan.jpg: lutut di tengah depan menutupi sebagian tepi bawah paket; kedua paha ikut masuk komposisi POV.
- 21-k5-eksterior.jpg: menara gelap yang lebar di kiri-tengah menjadi massa vertikal dominan, selain gedung yang membingkai tepi.

Usul koreksi angka:
Tidak ada angka yang tidak cocok pada enam klaim yang diuji.

Skrip dan bukti: periksa_scripts/ukur.py, hasil.json, struktur.json, crop huruf, serta package-box.jpg dan pedestrian-box.jpg.
