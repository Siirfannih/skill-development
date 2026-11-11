PUTUSAN: PERBAIKI

**Kelengkapan**
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | Seluruh heading baku ada; tambahan Proporsi terukur memenuhi permintaan. |
| 1. Warna & tekstur spesifik | Ya | Hex langit, rumput, panel, aksen; pengamatan grain/vignette. |
| 2. Teks spesifik | Ya | Tinggi, lebar, pusat, keluarga huruf, jalur masuk. |
| 3. Ritme spesifik | Ya | 9,2 cut/menit; median shot 5,1 dtk. |
| 4. B-roll / footage spesifik | Ya | Padang rumput hanya pada hook; rekaman AE di-zoom 2–3×. |
| 5. Motion graphic spesifik | Ya | Tiga kartu; skala, kemiringan, susunan lapisan. |
| 6. Kamera & transisi spesifik | Ya | Perpindahan 36–55 % lebar; zoom 0,64× dan 1,66×. |
| 7. SFX spesifik | Ya | Pop/klik, impact, whoosh; kepadatan dan sinkronisasi. |
| 8. Musik spesifik | Ya | Genre, bpm per babak, LUFS dan true peak. |
| Proporsi terukur bertabel per jenis adegan | Ya | Delapan jenis adegan, enam kolom. |
| Ada 6–8 frame kunci | Ya | Delapan JPEG, k1–k8. |
| Diambil untuk sesuai nama; bagian itu paling rinci | Tidak | Nama `44-tutorial-text-animation` menunjukkan animasi teks; isian hanya menyebut ID IG dan mengatakan nama tidak menyebut bagian. Bagian Teks sudah paling rinci. |
| Cek kemiripan dapat diperiksa dari still | Ya | Ukuran, posisi, warna, kotak, lapisan dan blur tampak pada still. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Waktu yang dicantumkan berupa penanda sumber/sampel dan durasi gerak, bukan aturan durasi caption untuk video baru. |

**Ukur ulang**
Metode: JPEG 720×720; kotak (x0,y0,x1,y1) berujung eksklusif. Tinggi glyph dari puncak sampai dasar huruf, tanpa bayangan; x-height memakai “o” tanpa ascender/descender. Mask isi putih RGB minimum 210, rentang kanal ≤45; komponen huruf dipisahkan. Kotak kartu mengecualikan bayangan; warna memakai median RGB area langit kosong.
Toleransi: ukuran relatif ≤15 %; posisi ≤5 poin persen (pp); warna tiap kanal ≤20. Skrip, hasil mentah, dan gambar kotak ada di `periksa_scripts/`; ambang huruf 200/210/220 semuanya tetap cocok.
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi kapital judul “T” | 9 % tinggi | 44-k1-hook-judul.jpg (107,335,156,397) | 62 px = 8,61 % | 4,32 % relatif | Ya |
| X-height kalimat, “o” pada Nobody | 4,2 % tinggi | 44-k3-hook-kalimat-blur.jpg (144,343,174,375) | 32 px = 4,44 % | 5,82 % relatif | Ya |
| Tinggi kapital caption “B” | 3,6 % tinggi | 44-k5-ui-caption.jpg (236,667,256,692) | 25 px = 3,47 % | 3,55 % relatif | Ya |
| Pusat blok caption (x,y) | (50 %,95 %) | 44-k5-ui-caption.jpg (236,666,484,700) | (50 %,94,86 %) | (0;0,14) pp | Ya |
| Kelompok tiga kartu, lebar × tinggi | 73 × 43 % | 44-k2-hook-kartu-ui.jpg (104,159,600,455) | 496×296 px = 68,89 × 41,11 % | (5,63;4,39) % relatif | Ya |
| Warna langit atas | #54C0F8 | 44-k1-hook-judul.jpg (280,30,440,100) | #59C6FF | RGB absolut (5,6,7) | Ya |

Jumlah cocok: **6 dari 6**. Klaim lain di luar enam ukuran ini tidak divalidasi angkanya.

**Terlihat tetapi tidak tertulis**
- `44-k1-hook-judul.jpg`, `44-k2-hook-kartu-ui.jpg`: beberapa objek kecil bersayap tersebar di langit, terpisah dari judul/kartu utama.
- `44-k1-hook-judul.jpg`: rumput dan bunga paling depan di tepi bawah buram; lapisan latar tidak seluruhnya tajam seperti deskripsi kartu.
- `44-k1-hook-judul.jpg`: huruf “a” dan “t” di ujung kanan jauh lebih kecil daripada “Text”; jalurnya melengkung sekaligus berubah ukuran per huruf.

**Usul koreksi angka**
Tidak ada: keenam klaim yang diuji masih dalam toleransi.

Alasan putusan: kelengkapan belum penuh pada butir Diambil untuk, meskipun 6/6 klaim ukur cocok.
