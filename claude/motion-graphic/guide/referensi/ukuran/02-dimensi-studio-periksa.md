PUTUSAN: PERBAIKI

Hasil: **4 dari 6 klaim cocok**. Kelengkapan belum penuh: satu butir Cek kemiripan memerlukan pengamatan antarwaktu.

| Kelengkapan | Ya/tidak | Bukti |
|---|---|---|
| Heading sesuai template | Ya | Semua heading wajib sama; tambahan Proporsi terukur tersedia. |
| 1. Warna & tekstur spesifik | Ya | Hex studio/aksen, vignette, grain, grade. |
| 2. Teks spesifik | Ya | Keluarga huruf, ukuran, rasio, posisi, perlakuan masuk. |
| 3. Ritme spesifik | Ya | 12 cut, 21,1/menit, median 2,6 dtk, pembagian babak. |
| 4. B-roll / footage spesifik | Ya | Subjek sama; medium, full body, close-up, wide, polaroid. |
| 5. Motion graphic spesifik | Ya | Jenis coretan, skala subjek, jumlah objek/lapis. |
| 6. Kamera & transisi spesifik | Ya | Push-in 2,2×, tangan menutup lensa, flash/glitch, pan kolase. |
| 7. SFX spesifik | Ya | Jumlah/kategori event, fungsi bunyi, level dBFS. |
| 8. Musik spesifik | Ya | Funk, 123 bpm, LUFS, true peak, perubahan per babak. |
| Proporsi terukur: tabel per jenis adegan | Ya | Delapan jenis adegan k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPEG lokal, seluruhnya 720×1280. |
| Diambil untuk sesuai nama file dan paling rinci | Ya | Nama kreator dimensi.works tidak menyebut teknik; pilihan stiker/kolase dirinci terutama di 2, 5, 6 dan tabel. |
| Cek kemiripan dapat dicek dari still | Tidak | Butir “ikut membesar saat push-in” membutuhkan perbandingan ≥2 waktu. |
| Tidak ada aturan lama durasi tampil teks | Ya | Angka detik mencatat kejadian referensi/animasi/transisi, bukan aturan lama membaca teks. |

Metode: kotak tinta huruf tanpa bidang/tepi stiker, dari puncak sampai dasar blok pada sumbu frame; kartu tidak memberi definisi batas huruf lebih rinci. Kotak piksel (x0,y0,x1,y1), kanan/bawah eksklusif. Skala subjek mencakup seluruh tubuh yang tampak, tanpa kursi/bayangan.
Selisih ukuran relatif terhadap angka kartu; ambang ≤15%. Warna: median piksel pink dalam kotak, ambang tiap kanal RGB ≤20. Batas subjek dipilih pada grid piksel (±3 px).

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi DITONTON | 8,5% H | 02-k1-wajah-stiker.jpg (190,167,529,260) | 93 px = 7,27% H | 14,52% relatif | Ya |
| Tinggi SAMPAI HABIS | 6,6% H | 02-k1-wajah-stiker.jpg (91,942,621,1018) | 76 px = 5,94% H | 10,04% relatif | Ya |
| Tinggi RATUSAN | 4,9% H | 02-k6-neon-coretan.jpg (213,230,492,295) | 65 px = 5,08% H | 3,64% relatif | Ya |
| Tinggi seruan CUT! | 31,6% H | 02-k4-stiker-cut.jpg (149,406,697,947) | 541 px = 42,27% H | 33,75% relatif | Tidak |
| Skala subjek wide: lebar × tinggi | 39×30% | 02-k5-wide-studio.jpg (223,441,500,952) | 277×511 px = 38,47×39,92% | lebar 1,35%; tinggi 33,07% relatif | Tidak |
| Pink bidang stiker | #ED3A94 | 02-k1-wajah-stiker.jpg (85,928,635,1032) | #E34D85; RGB (227,77,133) | ΔRGB (−10,+19,−15) | Ya |

CUT! tetap tidak cocok bila memakai huruf tertinggi sendiri: tinta hijau (374,422,697,947), 525 px = 41,02% H; selisih relatif 29,80%. Pengukuran utama tidak memasukkan ekstrusi pink/abu-abu.

**Terlihat tetapi tidak tertulis**

- 02-k1-wajah-stiker.jpg: bidang pink SAMPAI HABIS berisi arsiran gelap diagonal seperti pensil; tekstur serupa tampak pada label RATUSAN di 02-k6-neon-coretan.jpg.
- 02-k2-fullbody-pita.jpg: VISUAL HOOK memakai magenta redup dengan kontras rendah terhadap latar, berbeda tingkat terangnya dari stiker putih/pink k1.
- 02-k3-closeup-caption.jpg: telapak tangan memenuhi lapisan depan dan sangat buram, menutupi sebagian besar wajah serta dada.
- 02-k4-stiker-cut.jpg: tepi huruf memiliki ekstrusi bertingkat pink dan abu-abu yang memberi ketebalan seperti potongan stiker bertumpuk.
- 02-k6-neon-coretan.jpg: coretan besar di tepi frame sangat defokus, sementara coretan kecil dekat tubuh lebih tajam; ada perbedaan ketajaman antarbidang neon.

**Usul koreksi angka**

- CUT! pada k4: 31,6% → **42,27% tinggi frame**.
- Tinggi subjek wide pada k5: 30% → **39,92% tinggi frame**.

Skrip dan hasil rinci: [ukur.py](periksa_scripts/ukur.py), [hasil.json](periksa_scripts/hasil.json); gambar bukti berkotak ada di periksa_scripts/.
