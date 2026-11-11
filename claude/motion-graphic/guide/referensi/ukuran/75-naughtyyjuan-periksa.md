PUTUSAN: PERBAIKI

Kecocokan ukur: **4 dari 6**. Kelengkapan belum penuh: satu butir Cek kemiripan memerlukan video/audio.

| Kelengkapan | Ya/tidak | Bukti |
|---|---|---|
| Heading wajib sama dengan template | Ya | Semua heading wajib persis; Proporsi terukur tambahan. |
| 1. Warna & tekstur spesifik | Ya | Hex, grain std 2,2, vignette dalam %. |
| 2. Teks spesifik | Ya | Tinggi huruf, rasio, posisi, bobot dan contoh kata. |
| 3. Ritme spesifik | Ya | 52 cut, 33,9/menit, median 1,4 dtk. |
| 4. B-roll / footage spesifik | Ya | Buku/selotip, uang, UI dan split 60/40. |
| 5. Motion graphic spesifik | Ya | Toggle, grid avatar, ukuran kartu dan lapisan. |
| 6. Kamera & transisi spesifik | Ya | Push/pull dalam %, rotasi −24°, punch-in 2,1×. |
| 7. SFX spesifik | Ya | Jumlah onset, jenis bunyi, dBFS. |
| 8. Musik spesifik | Ya | Funk, ±117 bpm, LUFS dan LRA. |
| Proporsi terukur: tabel per jenis adegan | Ya | Delapan jenis adegan. |
| Ada 6–8 frame kunci | Ya | Delapan berkas 75-k1 sampai 75-k8. |
| Diambil untuk sesuai nama; fokus paling rinci | Ya | Nama kreator tanpa petunjuk bagian; fokus Teks/Ritme dijelaskan paling rinci. |
| Semua Cek kemiripan bisa dicek dari still | Tidak | Butir terakhir menyebut cut/menit, median shot dan pop/klik yang terdengar. |
| Tidak ada aturan lama durasi tampil teks | Ya | Angka detik berupa pengamatan ritme/shot, bukan aturan durasi teks. |

Kotak (x0,y0,x1,y1), batas kanan/bawah eksklusif, koordinat frame asli 720×1280. Tinggi huruf memakai inti goresan dari puncak sampai garis dasar; glow tidak dihitung. Pusat teks memakai pusat kotak huruf.

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi NOT | 6,6% tinggi | 75-k5-kata-tunggal.jpg (254,599,467,680) | 81 px = 6,33% | 4,12% relatif | Ya |
| Tinggi FOLLOW | 8,1% tinggi | 75-k4-split-teks.jpg (68,939,658,1042) | 103 px = 8,05% | 0,66% relatif | Ya |
| Pusat vertikal FOLLOW | y 71% | 75-k4-split-teks.jpg (68,939,658,1042) | y 990,5 px = 77,38% | 6,38 poin persen | Tidak |
| Skala kartu putih | 71–77% lebar × 59–64% tinggi | 75-k6-kartu-maroon.jpg (90,239,630,1041) | 540×802 px = 75,00% × 62,66% | 0; dalam kedua rentang | Ya |
| Latar marun | #6B172E | 75-k6-kartu-maroon.jpg (0,0,720,200) | Median RGB (107,23,46) = #6B172E | ΔRGB (0,0,0) | Ya |
| Lebar buku pada k3 | 70% lebar | 75-k3-buku-footage.jpg (0,253,720,1088) | Halaman terlihat 720 px = 100%; buku terpotong tepi | ≥42,86% relatif | Tidak |

Rentang dibandingkan ke batas terdekat (selisih nol bila di dalam). Toleransi: ukuran relatif ≤15%, posisi ≤5 poin persen, warna tiap kanal ≤20. Kotak buku membatasi halaman yang terlihat; lebar penuh buku setidaknya sebesar bagian terlihat. Skrip dan hasil: periksa_scripts/ukur.py, hasil.json, sensitivitas.json, verifikasi.py, verifikasi.json.

### Terlihat tetapi tidak tertulis
- 75-k2-ui-blur.jpg: pola kisi piksel/moire sangat rapat melapisi layar, termasuk area di sekitar angka tajam; berbeda dari grain acak.
- 75-k3-buku-footage.jpg dan 75-k4-split-teks.jpg: kata LIES pada judul buku diberi garis bawah merah.
- 75-k1-ilustrasi3d.jpg: kursor tangan putih memakai kontur hitam sangat tebal dan garis hitam pada jari.
- 75-k6-kartu-maroon.jpg: toggle berisi kenop lingkaran putih di kanan dengan centang hijau.

### Usul koreksi angka
- Pusat vertikal FOLLOW pada 75-k4-split-teks.jpg: **77,38% tinggi frame**.
- Lebar buku yang terlihat pada 75-k3-buku-footage.jpg: **100% lebar frame** (lebar penuh ≥100%, terpotong).
