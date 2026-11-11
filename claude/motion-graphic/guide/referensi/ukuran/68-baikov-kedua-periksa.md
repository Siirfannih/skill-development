PUTUSAN: PERBAIKI

Klaim cocok: **6/6**; kelengkapan belum penuh. Pemeriksaan independen, tanpa membaca ukuran.md atau skrip penulis.
Metode: PIL/numpy/OpenCV, frame 736×414; kotak (x0,y0,x1,y1), batas kanan/bawah eksklusif, titik asal kiri-atas. Tinggi cap sampai garis dasar, tanpa ekor g/y; E dan h menjadi acuan tinggi pada k1. Posisi memakai pusat kotak tinta teks, tanpa gagang seleksi; skala UI memakai batas tepi neon, tanpa halo. Warna memakai median RGB area latar.
Toleransi: ukuran/rasio ≤15% relatif; posisi ≤5 poin persentase (pp) per sumbu; warna ≤20 per kanal. Skrip dan hasil: periksa_scripts/ukur.py, periksa_scripts/hasil.json.

## Kelengkapan
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading wajib sama dengan template | Ya | PENGIKAT, TEKNIK, bagian 1–8, Cek kemiripan, Catatan pakai tersedia; Proporsi terukur tambahan. |
| 1. Warna & tekstur spesifik | Ya | Hex, statistik tekstur, saturasi dan blur. |
| 2. Teks spesifik | Ya | Bentuk huruf, bobot, tinggi, rasio, posisi dan cara masuk/keluar. |
| 3. Ritme spesifik | Ya | 6 cut, 7,6/menit, median 5,7 dtk dan pembagian babak. |
| 4. B-roll / footage spesifik | Ya | Dua klip, ±19%, ukuran foto dan perlakuan footage. |
| 5. Motion graphic spesifik | Ya | Jenis objek, ukuran subjek dan tiga lapis kedalaman. |
| 6. Kamera & transisi spesifik | Ya | Rentang skala/geser, pemicu dan durasi transisi. |
| 7. SFX spesifik | Ya | Jumlah event, kosakata bunyi, dBFS dan selisih terhadap bed. |
| 8. Musik spesifik | Ya | Instrumen, BPM, LUFS, true peak dan LRA. |
| Proporsi terukur: tabel per jenis adegan | Ya | Delapan jenis adegan k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPG di keyframes/, k1–k8. |
| Diambil untuk sesuai nama file; sasaran paling rinci | Tidak | Teks dan transisi dirinci; tetapi “Nama file asli” ditulis “baikovphilipp (video Baikov lain, 47 dtk)”, bukan baikovphilipp_ssspin.io_1793345363.mp4. |
| Cek kemiripan dapat dicek dari still | Tidak | “Memicu transisi” dan “kamera virtual diam… gerak dari objek” memerlukan perbandingan temporal. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Durasi di Ritme merupakan pengamatan sumber, bukan aturan durasi teks untuk karya baru. |

## Ukur ulang
Nama frame di bawah merujuk berkas di keyframes/.
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi cap Everything | 4,8% T | 68-k1-teks-gelap.jpg; E (149,195,162,214) | 19 px = 4,59% T | 4,39% relatif | Ya |
| Rasio kata kunci : kata sambung | 1,0 | 68-k1-teks-gelap.jpg; E (149,195,162,214), h (405,197,416,215) | 19/18 = 1,056 | 5,56% relatif | Ya |
| Pusat blok teks objek kaca | (29%,85%) | 68-k2-objek-kaca.jpg; (54,340,367,367) | (28,60%,85,39%) | x 0,40 pp; y 0,39 pp | Ya |
| Tinggi cap GROWTH | 11,6% T | 68-k4-tipografi-terang.jpg; (340,181,638,229) | 48 px = 11,59% T | 0,05% relatif | Ya |
| Skala dashboard L × T | 48% × 53% | 68-k6-ui-dashboard.jpg; (196,95,540,315) | 344×220 px = 46,74% × 53,14% | L 2,63%; T 0,26% relatif | Ya |
| Latar hijau gelap | #08261C | 68-k1-teks-gelap.jpg; (10,10,110,90) | Median #08261C; RGB (8,38,28) | ΔRGB (0,0,0) | Ya |

## Terlihat tetapi tidak tertulis
- 68-k2-objek-kaca.jpg: bola teal besar terpotong batas atas dan kanan, di belakang kubus kaca.
- 68-k2-objek-kaca.jpg: kontur roda bergerigi besar, tipis dan transparan, terpotong di kanan-bawah.
- 68-k4-tipografi-terang.jpg: garis hitam pendek miring menumpang bagian atas huruf G; berbeda dari kursor balok limau yang dijelaskan kartu.
- 68-k6-ui-dashboard.jpg: bilah navigasi sempit di kiri dashboard bergradasi hijau–limau, dengan ikon ditumpuk vertikal.

## Usul koreksi angka
Tidak ada; seluruh enam klaim yang diuji cocok dalam toleransi.
