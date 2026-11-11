PUTUSAN: PERBAIKI

Klaim cocok: **4 dari 6**. Kelengkapan belum penuh: satu butir “Cek kemiripan” memerlukan video.

| Kelengkapan | Ya/tidak | Bukti |
|---|---|---|
| Heading sesuai template | Ya | Semua heading tetap dan bagian 1–8 sama; tambahan “Proporsi terukur” tersedia. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | Termasuk proksi SFX 24/40 cut dan musik −14,2 LUFS; keterbatasannya disebut. |
| “Proporsi terukur” bertabel per jenis adegan | Ya | Delapan jenis adegan, k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPG di keyframes/, sesuai k1–k8 dalam tabel. |
| “Diambil untuk” sesuai file dan menjadi bagian paling rinci | Ya | Nama siirfannih_DcS18mkRyey tidak memberi kategori; teks dipilih dan dibahas paling rinci, dengan b-roll pendukung. |
| “Cek kemiripan” bisa diperiksa dari still | Tidak | Butir terakhir memuat ±30 cut/menit dan push-in 6–14%; keduanya memerlukan video. |
| Tidak ada aturan lama durasi tampil teks dalam detik | Ya | Tidak ditemukan; waktu shot/transisi di bagian ritme/kamera bukan aturan durasi teks. |

Kotak (x0,y0,x1,y1) memakai piksel asli 720×1280; kanan/bawah eksklusif. Cap = puncak huruf sampai baseline; caption mencakup ascender–descender. Siluet pembicara ditandai manual sampai tertutup bunga, lalu dihitung skrip.
Toleransi: ukuran relatif ≤15%; posisi ≤5 poin persen (pp); setiap kanal warna ≤20; cut/menit relatif ≤15%. Untuk rentang, selisih dihitung ke batas terdekat.

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi cap SABAT | 10,0% | 78-k1-wajah-kata-raksasa.jpg; (110,390,610,521) | 131 px = 10,23% | 2,34% relatif | Ya |
| Tinggi caption asc–desc “Ada angka” | 2,7–2,8% | 78-k2-wajah-layar-angka.jpg; (252,622,466,666) | 44 px = 3,44% | 22,77% relatif terhadap 2,8% | Tidak |
| Pusat vertikal caption | y 50% | 78-k2-wajah-layar-angka.jpg; (252,622,466,666) | y 644 px = 50,31% | 0,31 pp | Ya |
| Tinggi pembicara pada layar angka | ±35% | 78-k2-wajah-layar-angka.jpg; (167,383,579,794) | 411 px = 32,11% | 8,26% relatif | Ya |
| Merah teks dokumenter | #B20316 | 78-k6-foto-dokumenter-teks-merah.jpg; (245,438,480,712) | Median isi huruf #F70208, RGB (247,2,8) | ΔRGB (69,1,14) | Tidak |
| Deteksi cut/menit, ambang 0,3 | 53 deteksi; 30,3/menit | Video sumber utuh, 0–105,114 dtk; (0,0,720,1280) | 53 deteksi; 30,253/menit | 0,16% relatif | Ya |

Teks putih disegmentasi dengan kanal minimum 205 dan rentang kanal ≤35; warna merah memakai median 18.570 piksel inti setelah erosi 3×3 untuk menghindari tepi JPEG. Cut dihitung FFmpeg tanpa menggabungkan flash beruntun, mengikuti definisi kartu.

## Terlihat tetapi tidak tertulis
- 78-k3-lukisan-teks.jpg: “pem-” menjadi pecahan baris kecil jauh di kiri, di atas “bebasan”; susunan tidak seluruhnya rata tengah seperti uraian kartu.
- 78-k6-foto-dokumenter-teks-merah.jpg: tanda “&” berdiri kecil di kiri “air”, sementara “air” bergeser ke kanan; tumpukan memiliki susunan bertingkat yang tidak simetris.
- 78-k5-foto-politik-mask.jpg: di bagian bawah ada dua kolom identitas, judul/pembicara di kiri dan nama gereja di kanan, mengapit logo pada pita pucat transparan.
- 78-k4-berita-sorot.jpg: bidang berita memiliki tekstur kisi/titik layar yang terlihat, termasuk pada area abu terang.

## Usul koreksi angka
- Tinggi caption asc–desc pada k2: **3,44% tinggi frame (44 px)**.
- Warna merah teks dokumenter pada k6: **#F70208**, median RGB **(247,2,8)**.

Skrip dan hasil mentah: periksa_scripts/ukur_independen.py dan periksa_scripts/hasil.json; kotak ukur juga disimpan sebagai PNG beranotasi di folder itu.
