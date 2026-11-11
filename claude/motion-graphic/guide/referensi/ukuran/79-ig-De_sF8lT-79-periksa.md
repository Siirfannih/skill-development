PUTUSAN: PERBAIKI

Kelengkapan:
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | PENGIKAT, TEKNIK, delapan subbagian, Cek kemiripan, Catatan pakai sesuai; Proporsi terukur merupakan tambahan wajib. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | Palet hex; tinggi huruf; cut/menit; duplikasi wajah; ukuran tile; push-in; jumlah SFX; BPM/LUFS. |
| Proporsi terukur dengan tabel per jenis adegan | Ya | Delapan jenis adegan, mencakup teks, posisi, subjek, kedalaman. |
| Ada 6–8 frame kunci | Ya | Delapan JPG k1–k8; isi k1 adalah caption dan k2 kata besar, berlawanan dengan rujukan k1/k2 dalam tabel. |
| Diambil untuk sesuai nama file dan paling rinci | Ya | Nama asli disebut; nama tanpa petunjuk diakui; Teks menjadi bagian paling rinci. |
| Cek kemiripan bisa dicek dari still | Tidak | Dua butir terakhir meminta push-in/scale-up dan hit/whoosh/beat; membutuhkan video/audio. |
| Tidak ada aturan lama tampil teks dalam detik | Tidak | Ritme: kartu kata hitam penuh “selama 0,6–2,5 dtk”. Ini lama tampil, berbeda dari durasi animasi masuk. |

Ukur ulang: 3 cocok, 2 tidak cocok, 1 ragu dari 6 klaim. Kelengkapan belum penuh; syarat LAYAK tidak terpenuhi.
Metode: PIL/NumPy/OpenCV, frame 1276×718; kotak (x0,y0,x1,y1) dengan batas akhir eksklusif, asal kiri atas. Skrip: `periksa_scripts/ukur.py`; data: `periksa_scripts/hasil.json`.
Huruf diukur dari piksel terang, bukan ukuran font: cap = puncak kapital sampai garis dasar; x-height memakai n/a tanpa ascender/descender. Batas UI adalah tepi luar garis kartu/tile, tanpa bayangan.
Toleransi: ukuran relatif ≤15%; posisi ≤5 poin persen (pp); warna ≤20 tiap kanal. Untuk rentang, selisih dihitung terhadap ujung terdekat.

| Klaim | Nilai di kartu | Frame + kotak piksel | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi kapital LAYAK | 36,5% tinggi | 79-k3-kartu-kata-gelap.jpg (49,228,1254,490) | 262 px = 36,49% | 0,03% relatif | Ya |
| Rasio x-height kata kunci : caption | 4–5× | 79-k2-wajah-caption.jpg: n (134,303,227,401); 79-k1-wajah-kata-besar.jpg: a (628,572,652,601) | 98/29 = 3,38× | 15,52% di bawah 4× | Ragu |
| Pusat horizontal ngaku | x 20% | 79-k2-wajah-caption.jpg (134,272,633,439) | x 30,05% | +10,05 pp | Tidak |
| Ukuran kartu chat | 70% lebar × 19% tinggi | 79-k5-ui-chat.jpg (183,255,1088,490) | 905×235 px = 70,92% × 32,73% | lebar +1,32%; tinggi +72,26% relatif | Tidak |
| Gradien merah | #97001C → #72001A | 79-k4-kartu-merah.jpg (20,20,140,140) dan (1120,570,1240,690) | Median #94001C → #75001A | RGB absolut (3,0,0) dan (3,0,0) | Ya |
| Ukuran tile alat | 16% lebar × 29% tinggi | 79-k6-pipeline-alat.jpg (494,177,702,384) | 208×207 px = 16,30% × 28,83% | lebar +1,88%; tinggi −0,59% relatif | Ya |

Ragu rasio: selisih hanya sedikit melampaui ambang; ketidakpastian satu piksel pada x-height caption dapat mengubah status. Tidak dihitung sebagai tidak cocok dan tidak diusulkan koreksi.
Posisi ngaku memakai pusat bbox sesuai konvensi posisi kartu; jika x dimaknai tepi kiri, hasilnya 10,50%, juga berjarak lebih dari 5 pp dari 20%.

Terlihat tetapi tidak tertulis:
- 79-k2-wajah-caption.jpg: di belakang wajah utama yang tajam di kanan terdapat wajah besar lain yang buram/redup, tampak di belakang teks sebelah kiri; duplikasi spesifik ini belum dicatat.
- 79-k3-kartu-kata-gelap.jpg: halo biru juga tampak di tengah, di belakang huruf A/Y, bukan hanya tepi bawah yang disebut kartu.
- 79-k5-ui-chat.jpg: kartu memuat chip lampiran video dengan thumbnail/durasi di kiri atas, tombol kecil di kiri bawah, serta pemilih model dan tombol kirim merah di kanan bawah.
- 79-k6-pipeline-alat.jpg: tile tetangga tampak terpotong di kedua tepi frame, sehingga alur alat melampaui bidang gambar.

Usul koreksi angka:
- Pusat x “ngaku”: 30,05% lebar frame.
- Tinggi kartu chat: 32,73% tinggi frame.
