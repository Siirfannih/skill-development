PUTUSAN: PERBAIKI

Kelengkapan:
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading wajib sama dengan template | Ya | Semua heading tetap ada; Proporsi terukur merupakan tambahan. |
| 1. Warna & tekstur spesifik | Ya | Hex latar/aksen, grain, grade footage. |
| 2. Teks spesifik | Ya | Empat bentuk teks, cap, lapisan, kursor, sorot. |
| 3. Ritme spesifik | Ya | 28,7 cut/menit, median 1,6 dtk, variasi shot. |
| 4. B-roll / footage spesifik | Ya | Overhead, tangan mengetik, split-screen dua panel. |
| 5. Motion graphic spesifik | Ya | Kolase uang, figur miniatur, grafik, skala dan kedalaman. |
| 6. Kamera & transisi spesifik | Ya | Pan 8–11%, cut keras, zoom-through, scroll vertikal. |
| 7. SFX spesifik | Ya | Kepadatan, kosakata, waktu aksen, level. |
| 8. Musik spesifik | Ya | Instrumen, 112 bpm, LUFS, celah audio. |
| Proporsi terukur bertabel per jenis adegan | Ya | Sembilan jenis adegan. |
| Ada 6–8 frame kunci | Ya | Delapan JPG di keyframes/. |
| Diambil untuk sesuai nama file dan paling rinci | Ya | Nama asli disebut; ID tidak menunjukkan teknik. Motion graphic, teks dan kedalaman yang dipilih dirinci. |
| Cek kemiripan bisa dicek dari still | Tidak | Butir terakhir memuat cut/menit, median shot dan gerak kamera; memerlukan video. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Angka waktu merupakan observasi shot/audio/transisi, bukan kewajiban durasi teks. |

Ukur ulang: 6/6 cocok. Seluruh koordinat pada JPG 1080×608; kotak (x0,y0,x1,y1), ujung kanan/bawah eksklusif. Nama k1–k6 merujuk nama lengkap di tabel.
Cap diukur dari puncak huruf kapital sampai dasar huruf B/R, tanpa kursor atau descender; pusat judul memakai batas teks tampak termasuk huruf biru, tanpa kursor.
Segmentasi RGB memisahkan objek/foto/huruf; warna memakai median area lantai kosong. Skrip: periksa_scripts/ukur.py; rincian: periksa_scripts/hasil.json.
Toleransi: ukuran relatif ≤15%; posisi ≤5 poin persentase (pp) per sumbu; warna ≤20 per kanal RGB.

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Rentang tinggi benda | 9–25% tinggi | 81-k1-objek-hitam.jpg: terkecil (487,283,560,335); terbesar (138,233,212,387) | 52–154 px = 8,55–25,33%; sembilan benda diperiksa | Relatif batas bawah 4,97%; atas 1,32% | Ya |
| Skala gabungan empat foto, tinggi × lebar | 25,5% × 56% | 81-k3-teks-besar.jpg (256,226,860,382) | 156 × 604 px = 25,66% × 55,93% | Relatif 0,62% × 0,13% | Ya |
| Tinggi cap judul, huruf B | 8,6% tinggi | 81-k5-footage-ketik.jpg (166,82,207,141) | 59 px = 9,70% | Relatif 12,84% | Ya |
| Pusat blok judul (x,y) | (44%,17%) | 81-k5-footage-ketik.jpg (166,82,823,142) | (45,79%,18,42%) | (1,79;1,42) pp | Ya |
| Tinggi cap prompt, huruf R | 6,5% tinggi | 81-k6-prompt-sorot.jpg (128,195,157,235) | 40 px = 6,58% | Relatif 1,21% | Ya |
| Warna lantai krem | #DFC8BC = RGB(223,200,188) | 81-k2-orang-krem.jpg (15,430,75,580) | #E1C9BD = RGB(225,201,189) | Kanal RGB (2,1,1) | Ya |

Terlihat tetapi tidak tertulis:
- 81-k2-orang-krem.jpg: posisi kerja mencampur meja laptop bertiang untuk berdiri, kursi kantor beroda, dan beanbag; keragaman furnitur membentuk siluet komposisi.
- 81-k3-teks-besar.jpg: empat foto tersusun dalam satu deret horizontal dengan sela putih seragam; bukan kisi dua baris.
- 81-k4-grafik-uang.jpg: kurva mendatar panjang di kiri lalu melengkung menanjak curam di kanan; bentuk grafiknya menentukan komposisi.
- 81-k6-prompt-sorot.jpg: paragraf empat baris rata kiri dengan ujung kanan tidak rata, walaupun bloknya berada di tengah frame.

Usul koreksi angka:
- Tidak ada: keenam klaim masih dalam toleransi.

Dasar putusan: kelengkapan belum penuh walaupun 6/6 klaim cocok; temuan mata tidak dihitung sebagai kegagalan angka.
