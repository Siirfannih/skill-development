PUTUSAN: PERBAIKI

Kelengkapan
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading wajib sama dengan template | Ya | Semua heading template ada; tambahan Proporsi terukur. |
| 1. Warna & tekstur spesifik | Ya | Hex palet, persentase piksel, grain, vignette. |
| 2. Teks spesifik | Ya | Contoh kata/font, tinggi, rasio, posisi, perilaku masuk. |
| 3. Ritme spesifik | Ya | Segmen, cut/menit, event/menit, bagian cepat/lambat. |
| 4. B-roll / footage spesifik | Ya | Tanpa footage/foto/wajah; 100% grafik 3D. |
| 5. Motion graphic spesifik | Ya | Delapan jenis objek, skala, tiga lapis kedalaman. |
| 6. Kamera & transisi spesifik | Ya | Flow, pan, orbit, zoom-through dan smear. |
| 7. SFX spesifik | Ya | 14 riser, 3 whoosh, 2 hit; batas pemisahan dari lagu dinyatakan. |
| 8. Musik spesifik | Ya | 123 bpm, −14 LUFS, pembagian babak. |
| Proporsi terukur dengan tabel per jenis adegan | Ya | Delapan baris adegan k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPEG k1–k8; semuanya cocok dengan video sumber. |
| Diambil untuk sesuai nama file dan paling rinci | Ya | Nama asli IG DetQ8tOOEkg tidak memberi petunjuk; fokus teks sebagai objek 3D dan kamera dirinci pada §2, §5–6. |
| Cek kemiripan dapat dicek dari still | Ya | Palet, ukuran, extrude, grid, kedalaman dan jumlah subjek terlihat. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Angka waktu menjelaskan segmen referensi, bukan aturan lama tampil teks. |

Ukur ulang
Kotak (x0,y0,x1,y1) memakai koordinat asli 720×1280; x1/y1 eksklusif. Tinggi huruf mencakup extrude, tanpa bayangan jatuh terpisah. Selisih ukuran relatif terhadap angka kartu; batas cocok 15%, warna ≤20 per kanal.
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi KNOW | 20% tinggi | 47-k1-kata3d.jpg (86,212,618,461) | 249 px = 19,45% | 2,73% | Ya |
| Tinggi Knows | 12% tinggi | 47-k3-cincin-lirik.jpg (66,294,590,440) | 146 px = 11,41% | 4,95% | Ya |
| Tinggi TRAINING | 30% tinggi | 47-k7-judul.jpg (85,328,625,716) | 388 px = 30,31% | 1,04% | Ya |
| Tinggi batang pilar (§5) | 40% tinggi | 47-k2-pilar.jpg (235,99,548,1280) | Terlihat 1181 px = ≥92,27% | ≥130,66% | Tidak |
| Lebar benda geometri terbesar | ±25% lebar | 47-k8-geometri.jpg (77,685,349,945) | Torus 272 px = 37,78% | 51,11% | Tidak |
| Warna latar krem | #EFE9D7 | 47-k1-kata3d.jpg (80,820,270,940) | Median RGB (244,237,218), #F4EDDA | ΔRGB (5,4,3) | Ya |
Batang pilar terpotong tepi bawah, sehingga tinggi adalah batas minimum; tabel Proporsi sendiri sudah menyebut setinggi frame. Batas siluet torus dibaca manual (±3 px per sisi); ketidakpastian tidak mengubah hasil cocok/tidak.

Terlihat tetapi tidak tertulis
- 47-k3-cincin-lirik.jpg: pita atas memuat deretan chevron teal yang semuanya menunjuk ke kanan.
- 47-k4-kata-objek.jpg: potongan pita perekat gelap dipasang diagonal pada sudut beberapa ubin huruf.
- 47-k6-plakat.jpg: sejumlah plakat berbentuk balon percakapan dengan ekor runcing, bukan hanya papan persegi.

Usul koreksi angka
- Tinggi batang pilar k2: 40% → ≥92,27% tinggi frame yang terlihat.
- Lebar benda geometri terbesar k8: ±25% → ±37,78% lebar frame.

Hasil: kelengkapan penuh, 4/6 klaim cocok; syarat minimal 5/6 belum terpenuhi.
Reproduksi: `~/work/mg-venv/bin/python periksa_scripts/ukur_independen.py`; hasil, waktu frame sumber, dan gambar kotak ukur tersimpan di `periksa_scripts/hasil_ukur.json` serta `ukur-1.png` sampai `ukur-6.png`.
