PUTUSAN: PERBAIKI

Kelengkapan: 6/7 butir terpenuhi. Ukur ulang: 6/6 klaim cocok; kelengkapan belum penuh.

| Kelengkapan | Ya/tidak | Bukti |
|---|---|---|
| Heading sesuai template | Ya | Seluruh heading wajib ada; tambahan Proporsi terukur sesuai permintaan. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | §1–8 mencatat palet, huruf, ritme, api dalam UI, skala, kamera, SFX, dan musik. |
| Proporsi terukur: tabel per jenis adegan | Ya | Sepuluh jenis adegan, dengan tinggi huruf, posisi, skala, dan kedalaman. |
| Ada 6–8 frame kunci | Ya | Delapan JPG, k1–k8, tersedia di keyframes/. |
| Diambil untuk sesuai nama dan paling rinci | Ya | Hookmomentum.mp4; momentum kamera dan pementasan UI/benda dirinci di §5–6, termasuk sepuluh gerak kamera. |
| Cek kemiripan bisa dicek dari still | Tidak | Butir “tidak ada frame tanpa gerak kamera” memerlukan rangkaian frame/video. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Angka waktu menjelaskan ritme/transisi/peristiwa sumber; tidak mengatur durasi tampil teks. |

Ukur ulang memakai JPG asli 720×1280; sumber video terkonfirmasi 30 fps, 36,166667 dtk lewat ffprobe.
Kotak (x0,y0,x1,y1), batas kanan/bawah eksklusif. Lebar/720; tinggi/1280. Kontur objek ditandai manual tanpa bayangan; huruf memakai mask piksel.
Tinggi huruf dihitung dari puncak ke garis dasar; kata yang turun dari garis dasar tetangganya diukur terpisah. Warna memakai median bagian dalam huruf setelah erosi 2 px.
Toleransi: ukuran/rasio relatif ≤15%; posisi ≤5 poin persen; warna tiap kanal ≤20. Untuk rentang, selisih dihitung terhadap batas terdekat bila berada di luar rentang.

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Skala poster, lebar × tinggi | ±46×36% | 05-k1-poster-3d.jpg (192,411,529,870) | 337×459 px = 46,81×35,86% | Relatif 1,75%; 0,39% | Ya |
| Skala iPhone, lebar × tinggi | 66–83% × 66–82% | 05-k3-iphone-meja.jpg (137,217,625,1072) | 488×855 px = 67,78×66,80% | Dalam kedua rentang | Ya |
| Tinggi “Idea” | 5,0% | 05-k4-notes-putih.jpg (95,485,261,549) | 64 px = 5,00% | 0% | Ya |
| Rasio CTA utama/kata kedua | 1,7 | 05-k8-clapper-cta.jpg: utama (89,525,567,619); download (113,635,423,690); it (445,650,478,703) | 94/55 = 1,709; tinggi 7,34%/4,30%; it 53 px | Relatif rasio 0,53% | Ya |
| Tinggi baris kinetik | ±9,1% | 05-k6-kinetik-tumpuk.jpg: Let (389,273,591,390); them (226,416,563,532) | 117 dan 116 px = 9,14% dan 9,06% | Relatif maksimum 0,45% | Ya |
| Hijau teks kinetik | #0C5B29 | 05-k6-kinetik-tumpuk.jpg (110,550,680,705), mask huruf replicate | Median #146A2C = RGB(20,106,44) | ΔRGB absolut (8,15,3) | Ya |

Terlihat tetapi tidak tertulis:
- 05-k1-poster-3d.jpg: poster utama dibingkai garis putih tipis dan ornamen emas pada empat sudut.
- 05-k2-ui-post-neon.jpg: bidang post IG miring; batas gambar terhadap area putih menurun ke kanan dan isi UI terpotong di sisi kiri.
- 05-k3-iphone-meja.jpg: angka jam abu-abu sangat besar mengisi bagian atas layar hitam; balon putih berada di bawahnya.
- 05-k6-kinetik-tumpuk.jpg: kata hijau tersusun zigzag: Let di kanan, them di tengah, replicate melebar ke kiri; posisi berulang pada baris berikutnya.

Usul koreksi angka:
- Tidak ada; keenam klaim yang diuji masuk toleransi.

Reproduksi: periksa_scripts/ukur.py; hasil mentah periksa_scripts/hasil.json; kotak pengukuran pada JPG beranotasi di folder yang sama.
