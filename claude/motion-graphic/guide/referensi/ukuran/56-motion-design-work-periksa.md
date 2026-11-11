PUTUSAN: PERBAIKI

Lima dari enam klaim cocok; kelengkapan belum penuh.

| Kelengkapan | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | PENGIKAT, TEKNIK, delapan subbagian, Cek kemiripan, Catatan pakai sesuai; Proporsi terukur ditambahkan. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | Termasuk B-roll: tidak ada footage; bagian lain memuat ukuran, gerak, atau bunyi spesifik. |
| Proporsi terukur bertabel per jenis adegan | Ya | Enam baris, grid kosong sampai runtuh/keluar. |
| Ada 6–8 frame kunci | Ya | Enam JPG tersedia di keyframes/. |
| Diambil untuk sesuai nama file dan paling rinci | Ya | Motiondesaignwork.mp4 → motion graphic/teks; grafik, gerak, kamera dan teks dibahas terinci. |
| Cek kemiripan bisa diperiksa dari still | Tidak | Ease-out, push pada hit musik, kamera diam, ketik/hapus terbalik memerlukan video/audio. |
| Tidak ada aturan lama tampil teks dalam detik | Tidak | Bagian Teks mencatat masuk 0,3→0,8 dtk dan keluar 6,0→6,5 dtk; template melarang pencatatan kapan/durasi teks di bagian ini. |

Ukur ulang independen: koordinat pada 720×1280, (x0,y0,x1,y1), batas kanan/bawah eksklusif. Selisih ukuran relatif terhadap angka kartu; posisi dalam poin persen (pp).
Inti huruf dipisahkan dari bloom memakai ambang kanal RGB minimum 150 (judul), 120 (label), komponen ≥6 piksel. Kapital O diukur puncak→garis dasar; label total mencakup titik i. Tinggi label tetap 16 px pada ambang 80/100/120.

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi kapital judul | 1,64% tinggi | 56-k3-batang-teoria.jpg (168,318,188,339) | O: 21 px = 1,6406% | 0,04% | Ya |
| Tinggi total label | 1,56% tinggi | 56-k3-batang-teoria.jpg (208,854,257,870) | teoria: 16 px = 1,25% | 19,87% | Tidak |
| Pusat blok judul | x 50%, y 26% | 56-k3-batang-teoria.jpg (168,317,553,345) | x 50,07%, y 25,86% | 0,07 / 0,14 pp | Ya |
| Skala batang erro | 4,7% lebar × 34,8% tinggi | 56-k5-erro-push.jpg (475,438,509,880) | Inti: 34×442 px = 4,72% × 34,53% | 0,47% / 0,77% | Ya |
| Aksen batang hijau | #4BD61D = RGB(75,214,29) | 56-k5-erro-push.jpg (485,500,499,800) | Median RGB(78,217,31) = #4ED91F | RGB: 3 / 3 / 2 | Ya |
| Cut per menit | 0 cut/satu shot → 0/menit | Semua 167 frame sumber, tiap frame (0,0,720,1280) | 0 cut → 0/menit | 0, sama persis | Ya |

Batang diukur sebagai komponen hijau jenuh, tanpa bola/glow. Warna memakai median area inti. Cut diperiksa dengan FFmpeg scene >0,3 dan contact sheet sumber; tidak ditemukan pergantian shot. Batas cocok: ukuran ≤15%, posisi ≤5 pp, setiap kanal warna ≤20; nol cut harus sama persis.
Skrip: periksa_scripts/ukur.py; data: periksa_scripts/hasil.json; contact sheet: periksa_scripts/source_contact.jpg.

### Terlihat tetapi tidak tertulis
- 56-k1-grid-kosong.jpg: garis grid memudar menuju batas atas dan kanan; bidang grid tidak memiliki bingkai luar tertutup.
- 56-k3-batang-teoria.jpg: sumbu berbentuk L tanpa panah, angka skala, atau tanda takik.
- 56-k4-batang-pratica.jpg: batang berupa persegi panjang ramping dengan puncak datar dan sudut siku.
- 56-k5-erro-push.jpg: isi batang hijau memiliki pita vertikal lebih terang di bagian kiri/tengah dan sisi kanan lebih gelap, selain halo di luarnya.

### Usul koreksi angka
- Tinggi total label pada 56-k3-batang-teoria.jpg: 1,25% tinggi frame (16 px), dibanding 1,56% di kartu.
