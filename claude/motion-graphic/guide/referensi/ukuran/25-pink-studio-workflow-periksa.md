PUTUSAN: PERBAIKI

Kelengkapan
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading sesuai template | Ya | Semua heading wajib hadir; tambahan Proporsi terukur. |
| 1. Warna & tekstur spesifik | Ya | Hex per babak, halftone, bloom, DOF. |
| 2. Teks spesifik | Ya | Cap, x-height, rasio, posisi dan bobot. |
| 3. Ritme spesifik | Ya | 18 perpindahan, median 1,3 dtk, variasi kepadatan. |
| 4. B-roll / footage spesifik | Ya | Render 3D, rekaman UI dan panel naik. |
| 5. Motion graphic spesifik | Ya | Objek, skala subjek dan jumlah lapisan. |
| 6. Kamera & transisi spesifik | Ya | Sudut, faktor skala, bar dan frame transisi. |
| 7. SFX spesifik | Ya | 143 event, jenis bunyi dan level. |
| 8. Musik spesifik | Ya | BPM, LUFS per babak, true peak dan LRA. |
| Proporsi terukur bertabel per jenis adegan | Ya | Delapan jenis adegan. |
| 6–8 frame kunci | Ya | Delapan JPG, k1–k8. |
| Diambil untuk sesuai nama dan fokus paling rinci | Ya | ID file sumber tepat; nama tidak menunjuk bagian; fokus §6/§2/§1 dijabarkan rinci. |
| Cek kemiripan dapat diperiksa dari still | Tidak | Durasi 4–6 frame, animasi letterbox dan gerak awal–akhir membutuhkan rangkaian frame. |
| Tidak ada aturan lama durasi tampil teks | Ya | Waktu yang dicatat menjelaskan kejadian sumber, bukan kewajiban durasi baca. |

Ukur ulang
Koordinat pada JPG 1080×608: (x0,y0,x1,y1), ujung kanan/bawah eksklusif; penyebut seluruh frame termasuk bar. Cap diukur dari puncak huruf sampai garis dasar, tanpa halo buram; balon memakai siluet material huruf yang terlihat. Warna memakai median RGB isi huruf.
Toleransi ukuran: selisih relatif ≤15%; warna: selisih tiap kanal ≤20. Keenam klaim dipilih dari proporsi tipografi, subjek, aksen dan susunan UI.
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Cap Answers | ±16% tinggi | 25-k4-objek-tunggal-teks-langit.jpg (257,247,355,344), huruf A | 97 px = 15,95% | 0,29% relatif | Ya |
| Tinggi huruf balon many pada k3 | 13% tinggi | 25-k3-tipografi-3d-balon.jpg (373,200,703,413) | 213 px = 35,03% | 169,48% relatif | Tidak |
| Cap terlihat Real | ±85% tinggi | 25-k7-kata-raksasa.jpg (0,44,1080,549) | 505 px = 83,06% | 2,28% relatif | Ya |
| Skala payung, lebar × tinggi | ±22% × 33% | 25-k4-objek-tunggal-teks-langit.jpg (437,194,681,402) | 244×208 px = 22,59% × 34,21% | 2,69% / 3,67% relatif | Ya |
| Magenta Real | #E2177E | 25-k7-kata-raksasa.jpg (250,260,290,310) | #E6157D; RGB (230,21,125) | ΔRGB (4,2,1) | Ya |
| Lebar strip thumbnail | ±27% lebar | 25-k6-halaman-ui.jpg (369,269,754,337) | 385 px = 35,65% | 32,03% relatif | Tidak |

Hasil: 4/6 cocok, 2 tidak cocok, 0 ragu; kelengkapan belum penuh. Angka berlaku pada still yang disebut, bukan seluruh rentang animasi. K3 cocok dengan sumber 14,50 dtk; kelanjutan shot memperlihatkan kata many menghadap kamera.

Terlihat tetapi tidak tertulis
- 25-k3-tipografi-3d-balon.jpg: garis putih tipis melengkung seperti sapuan tangan melintas di depan huruf balon dan kertas.
- 25-k4-objek-tunggal-teks-langit.jpg: pita putih horizontal membatasi tepi atas dan bawah gambar langit.
- 25-k6-halaman-ui.jpg: sidebar krem di kiri membentang setinggi frame, berisi ikon/menu vertikal dan dua tombol bertumpuk di bawah.

Usul koreksi angka
- Tinggi balon many pada k3: 13% → 35,03% tinggi frame (213/608 px).
- Lebar strip thumbnail pada k6: 27% → 35,65% lebar frame (385/1080 px).

Skrip: [ukur_independen.py](periksa_scripts/ukur_independen.py); hasil lengkap, metode segmentasi, hash masukan dan pencocokan video: [hasil.json](periksa_scripts/hasil.json). Bukti kotak: `periksa_scripts/kotak-*.png`.
