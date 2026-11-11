PUTUSAN: PERBAIKI

Kelengkapan belum penuh; **5 dari 6 klaim cocok**. Kartu tidak diubah.

| Kelengkapan | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Tidak | Heading 5 menambah “(inti: tiga efek pada nama file)” pada “Motion graphic”. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | Semua bagian 1–8 berisi angka atau pengamatan konkret, termasuk lokasi B-roll, jenis SFX, dan genre musik. |
| “Proporsi terukur” dengan tabel per jenis adegan | Ya | Tujuh jenis adegan, termasuk UI tutorial. |
| Ada 6–8 frame kunci | Ya | Delapan berkas di keyframes/, k1–k8. |
| “Diambil untuk” sesuai nama file dan paling rinci | Ya | Flash/Flicker/Cutout sesuai nama; bagian 5 menguraikan ketiganya beserta varian, skala, dan lapisan. |
| “Cek kemiripan” bisa dicek dari still | Tidak | Kedip 2/2 frame, tik/shutter, urutan cutout, median shot, dan sinkron beat membutuhkan video/audio. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Angka 1,40 dtk adalah pengamatan hilangnya judul sumber, bukan aturan durasi teks untuk video baru. |

Ukur ulang memakai PIL/numpy/OpenCV; skrip: `periksa_scripts/ukur.py`, hasil: `periksa_scripts/hasil.json`.
Koordinat piksel (x0,y0,x1,y1), batas kanan/bawah eksklusif; ukuran layar 720×1280. Preview terukur (0,142,720,644), tinggi 502 px.
Tinggi huruf dihitung dari puncak kapital ke batas bawah garis dasar; ambang RGB <100 mengabaikan halo JPEG. Bbox k4/k5 memakai kontur manual; tinggi subjek adalah bagian yang terlihat dalam preview.
Toleransi: ukuran relatif ≤15%; posisi ≤5 poin persen (pp); warna setiap kanal RGB ≤20. Klaim skala cocok bila lebar dan tinggi sama-sama memenuhi toleransi.

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi kapital label FLASH EFFECT | 2,0% layar | 66-k1-ui-tutorial.jpg (238,672,483,697) | 25 px = 1,953% | 2,34% relatif | Ya |
| Pusat vertikal pil FLASH EFFECT | 53,5% layar | 66-k1-ui-tutorial.jpg (218,650,502,721) | y=685,5 px = 53,555% | 0,055 pp | Ya |
| Skala siluet k3, lebar × tinggi | 16×57% preview | 66-k3-flicker-siluet.jpg (243,351,358,638) | 115×287 px = 15,97×57,17% | 0,17% / 0,30% relatif | Ya |
| Skala siluet transparan k4, lebar × tinggi | ±20×45% preview | 66-k4-siluet-transparan.jpg (337,315,501,644) | 164×329 px = 22,78×65,54% | 13,89% / 45,64% relatif | Tidak: tinggi |
| Skala cutout k5, lebar × tinggi | 25×74% preview | 66-k5-cutout-lapis.jpg (327,273,513,645) | 186×372 px = 25,83×74,10% | 3,33% / 0,14% relatif | Ya |
| Warna putih efek flash | #F6F0E3–#F4F2EC | 66-k2-flash-putih.jpg (0,142,720,644) | Median RGB (244,239,235), #F4EFEB | Terhadap #F4F2EC: ΔRGB=(0,3,1) | Ya |

Batas k5 menyertakan baris tepi y=644; bila dipotong tepat pada preview, tinggi menjadi 371 px (73,90%), tetap cocok. Ketidakpastian kontur ±2 px tidak mengubah putusan k4.

**Terlihat tetapi tidak tertulis**

- `66-k4-siluet-transparan.jpg`: siluet bergeser ke kiri terhadap orang asli yang tetap terlihat; kepala siluet menutupi sisi kiri wajah asli, sehingga terbaca sebagai dua posisi subjek yang bertumpuk.

**Usul koreksi angka**

- Tinggi siluet transparan k4 dalam tabel “Proporsi terukur”: **45% → sekitar 65,5% tinggi preview** (329/502 px). Lebarnya masih dalam toleransi, sehingga tidak diusulkan koreksi.
