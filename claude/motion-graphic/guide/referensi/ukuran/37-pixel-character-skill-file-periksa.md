PUTUSAN: LAYAK

Kelengkapan:
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading sesuai template | Ya | Semua heading wajib hadir dan berurutan; Proporsi terukur merupakan tambahan yang diminta. |
| 1. Warna & tekstur spesifik | Ya | Hex, vignette, voxel, bloom, mozaik. |
| 2. Teks spesifik | Ya | Keluarga huruf, tinggi, rasio, posisi, contoh kata. |
| 3. Ritme spesifik | Ya | 18,5 cut/menit, median 2,1 dtk, pembagian babak. |
| 4. B-roll / footage spesifik | Ya | Foto meja, kafe pixel, interlude kosmik, monitor editor. |
| 5. Motion graphic spesifik | Ya | Aksi tokoh, ikon alur, skala subjek, tiga lapis kedalaman. |
| 6. Kamera & transisi spesifik | Ya | Persentase push/pull dan jenis transisi. |
| 7. SFX spesifik | Ya | Jenis, jumlah, sinkronisasi, level. |
| 8. Musik spesifik | Ya | Genre, 112 bpm, batas babak, LUFS. |
| Proporsi terukur dengan tabel per jenis adegan | Ya | Delapan jenis adegan, k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPG tersedia di keyframes/. |
| Diambil untuk sesuai nama dan fokus paling rinci | Ya | Nama asli yang dicatat berupa ID “IG Deiz38JJvmv”; fokus teks 3D/set voxel dijelaskan, dan bagian Teks paling rinci. |
| Cek kemiripan dapat diperiksa dari still | Ya | Skala, letak, palet, vignette, kedalaman, perspektif dan mozaik terlihat pada still yang disandingkan. |
| Tidak ada aturan lama durasi tampil teks | Ya | Waktu yang dicatat merujuk babak, kamera, musik atau bunyi. |

Ukur ulang: enam klaim cocok dari enam. Skrip: `periksa_scripts/ukur.py`; hasil mentah: `periksa_scripts/hasil.json`.
Koordinat pada JPG 1080×608, asal kiri atas; kotak (x0,y0,x1,y1) mengecualikan batas kanan/bawah. Tinggi memakai bentang piksel huruf dari puncak sampai dasar, tanpa bayangan; robot termasuk topi dan kaki. Warna memakai median petak latar tengah tanpa objek, bukan sudut vignette.

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi WRONG | 27,1% tinggi | 37-k2-latar-merah-kata-besar.jpg (524,108,942,278) | 170 px = 27,96% | 3,18% relatif | Ya |
| Tinggi skill file. | 11,8% tinggi | 37-k4-meja-voxel-skillfile.jpg (121,245,521,319) | 74 px = 12,17% | 3,14% relatif | Ya |
| Rasio kata kunci / kata sambung | 1,6–2,5× | 37-k3-closeup-pixel-nama.jpg; MIFTAHUL (524,306,1044,377); His name's (527,201,806,238) | 71/37 = 1,92× | 0 terhadap rentang | Ya |
| Pusat horizontal WRONG | x 68% | 37-k2-latar-merah-kata-besar.jpg (524,108,942,278) | x 733 px = 67,87% | 0,13 poin persen | Ya |
| Tinggi robot | 35% tinggi | 37-k6-grid-teal-hitam.jpg (696,322,902,534) | 212 px = 34,87% | 0,38% relatif | Ya |
| Latar merah penuh, bagian tengah | #AF071B | 37-k2-latar-merah-kata-besar.jpg (475,280,585,335) | #AA000C, RGB (170,0,12) | RGB absolut (5,7,15) | Ya |

Ambang: ukuran relatif ≤15%; posisi ≤5 poin persen; warna setiap kanal ≤20. Angka per adegan dipakai untuk tinggi dan posisi; rentang umum dipakai untuk rasio.

Terlihat tetapi tidak tertulis:
- 37-k1-foto-meja-teks.jpg: “VIRAL” mempunyai lapisan huruf merah solid dan lapisan outline merah yang bergeser serta saling bertumpuk di depan monitor; kartu hanya menyebut teks 3D miring/melintang.
- 37-k6-grid-teal-hitam.jpg: robot oranye juga memakai topi abu-abu bertepi lebar dengan pita krem; topi dalam DNA hanya dilekatkan pada detektif.

Usul koreksi angka:
- Tidak ada untuk enam klaim yang diuji.
