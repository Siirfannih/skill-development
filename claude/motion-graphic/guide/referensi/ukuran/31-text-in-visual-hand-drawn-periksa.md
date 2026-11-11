PUTUSAN: PERBAIKI

Lima dari enam klaim cocok; kelengkapan belum penuh karena sebagian “Cek kemiripan” memerlukan video.

**Kelengkapan**
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading wajib sama dengan template | Ya | PENGIKAT, TEKNIK, bagian 1–8, Cek kemiripan, Catatan pakai sesuai; Proporsi terukur merupakan tambahan wajib audit. |
| Bagian 1. Warna & tekstur spesifik | Ya | Hex langit, kertas, tinta, dan caption. |
| Bagian 2. Teks spesifik | Ya | Tinggi tinta, rasio, posisi, jumlah kata, cara pergantian. |
| Bagian 3. Ritme spesifik | Ya | 5,8 dan 28,8 cut/menit beserta definisi detektor. |
| Bagian 4. B-roll / footage spesifik | Ya | Laptop 18,6–20,3 detik dan bukti sosial bertumpuk. |
| Bagian 5. Motion graphic spesifik | Ya | Doodle, kepala 40–52%, ukuran stiker, tiga lapis. |
| Bagian 6. Kamera & transisi spesifik | Ya | Skala 0,98–1,03 dan kamera diangkat 22,4–25,6 detik. |
| Bagian 7. SFX spesifik | Ya | 487 onset, contoh transien, −14,9 LUFS. |
| Bagian 8. Musik spesifik | Ya | Pergantian genre, waktu masuk, tempo dan pita bas. |
| Proporsi terukur berupa tabel per jenis adegan | Ya | Delapan jenis adegan, ukuran dan posisi. |
| Ada 6–8 frame kunci | Ya | Delapan JPG tersedia: k1 sampai k8. |
| Diambil untuk sesuai nama file dan paling rinci | Ya | “Cara penggunaan Text dalam visual video.mp4” → teks dalam visual; bagian 2 paling rinci. |
| Cek kemiripan bisa dicek dari still | Tidak | “Stiker muncul utuh pada frame cut, tanpa animasi masuk; kamera diam” memerlukan rangkaian frame/video. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Waktu yang dicatat berupa kejadian sumber, bukan ketentuan durasi baca/tampil untuk produksi. |

**Ukur ulang**
Frame 960×720. Kotak (x0,y0,x1,y1), batas kanan/bawah eksklusif. Ukuran: toleransi relatif ≤15%; posisi ≤5 poin persen; warna setiap kanal ≤20.
Tinggi huruf mengikuti tinta dari puncak sampai garis dasar; caption berasender mengecualikan descender. Ukuran stiker termasuk pinggir kertas, ketelitian batas manual ±2 px.
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi tinta angka “5” | 17,2% tinggi | 31-k1-daftar-judul.jpg (64,71,125,195) | 124 px = 17,22% | 0,13% relatif | Ya |
| Rasio TOPIC : caption berasender | ±3,5× | 31-k2-kata-kunci-stempel.jpg; TOPIC (153,134,393,237), caption (370,649,590,678) | 103/29 = 3,55× | 1,48% relatif | Ya |
| Pusat blok caption | x50%, y92% | 31-k3-butir-daftar.jpg (353,639,606,696) | x49,95%, y92,71% | x0,05; y0,71 poin persen | Ya |
| Ukuran stiker tokoh bosan | 29×50% lebar×tinggi | 31-k4-doodle-samping-wajah.jpg (120,141,404,511) | 284×370 px = 29,58×51,39% | 2,01%; 2,78% relatif | Ya |
| Ukuran bintang merah | ±35×30% lebar×tinggi | 31-k5-grafik-bintang.jpg (23,118,479,600) | 456×482 px = 47,50×66,94% | 35,71%; 123,15% relatif | Tidak |
| Warna kotak caption | #FE583C | 31-k6-bukti-sosial.jpg (408,643,550,694) | Median piksel merah #FD593C | RGB absolut (1,1,0) | Ya |

**Terlihat tetapi tidak tertulis**
- 31-k2-kata-kunci-stempel.jpg: kedua wajah kertas ditimpa pita coretan hitam bermata yang melebar melewati tepi wajah; dua panah kertas mengarah ke bawah dari TOPIC.
- 31-k3-butir-daftar.jpg: tangan besar dan sangat buram mengisi depan kiri bawah, menambah lapisan dekat kamera yang tidak dicatat dalam uraian kedalaman.
- 31-k5-grafik-bintang.jpg: tepi putih kertas mengikuti ujung-ujung bintang; grafik di depannya memiliki bingkai hitam tebal yang digambar tidak rata.

**Usul koreksi angka**
- Ukuran bintang k5: ±35×30% → ±47,50×66,94% lebar×tinggi frame (termasuk pinggir kertas). Tinta merah saja sudah 46,56×65,14%, tetap di luar toleransi.

Skrip: `periksa_scripts/ukur.py`; data, masker dan kotak anotasi: `periksa_scripts/hasil.json`, `mask-*.png`, `kotak-k*.png`.
