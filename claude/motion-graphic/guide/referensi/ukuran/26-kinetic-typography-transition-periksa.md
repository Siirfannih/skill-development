PUTUSAN: PERBAIKI

Kelengkapan belum penuh; **4 dari 6 klaim cocok**. Semua ukuran menggunakan frame asli 960×720; persentase tinggi memakai konten y=54–666 (612 px), kecuali latar k2 yang memenuhi frame.

| Kelengkapan | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | Semua heading baku ada; tambahan Proporsi terukur sesuai permintaan. |
| 1. Warna & tekstur spesifik | Ya | Hex per adegan, halftone, goresan, gabus. |
| 2. Teks spesifik | Ya | Ukuran, rasio, posisi, perlakuan tiap jenis adegan. |
| 3. Ritme spesifik | Ya | 36,2 cut/menit, median 0,7 dtk, pembagian babak. |
| 4. B-roll / footage spesifik | Ya | Proporsi durasi dan contoh footage per kalimat. |
| 5. Motion graphic spesifik | Ya | Skala figur/TV/potret dan 3–4 lapis. |
| 6. Kamera & transisi spesifik | Ya | Push-in 5–30%, transisi 1–2 frame dengan penanda waktu. |
| 7. SFX spesifik | Ya | Jenis, jumlah, penempatan, puncak dBFS. |
| 8. Musik spesifik | Ya | Instrumen, 123 bpm, LUFS, dBTP, LRA. |
| Proporsi terukur: tabel per jenis adegan | Ya | Delapan jenis adegan k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPG dalam keyframes/. |
| Diambil untuk sesuai file dan paling rinci | Ya | Kinetic Typography + Transision: teks dan transisi dibedah paling rinci. |
| Cek kemiripan dapat diperiksa dari still | Tidak | Push-in 5–30%, A-roll diam/punch-in, durasi transisi dan ketiadaan dissolve memerlukan urutan frame. |
| Tidak ada aturan lama durasi tampil teks dalam detik | Ya | Waktu yang tercatat menandai kejadian/animasi, bukan aturan lama baca teks. |

Ukur ulang: kotak (x0,y0,x1,y1) memakai koordinat gambar utuh, batas akhir eksklusif. Tinggi huruf mencakup ascender/descender, tanpa glow. Kotak subjek ditandai pada siluet terlihat, tanpa bayangan; ukuran dihitung skrip. Toleransi: ukuran ≤15% relatif, posisi ≤5 poin persen, warna ≤20 tiap kanal.

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi COMPUTER | 11,6% tinggi konten | 26-k1-wajah-teks.jpg (280,337,604,408) | 71 px = 11,60% | 0,01% relatif | Ya |
| Latar krem judul | #F9F6D8 | 26-k2-kartu-judul.jpg (800,30,920,100) | Median RGB (249,246,216), #F9F6D8 | ΔRGB (0,0,0) | Ya |
| Pusat kata from | x 67–73%; y 54–72% | 26-k3-footage-teks-3d.jpg (537,400,861,575) | x 72,81%; y 70,83% | 0 poin persen di luar rentang | Ya |
| Tinggi figur kolase | ±25% tinggi konten | 26-k4-kolase-teks-melengkung.jpg (432,400,543,666) | 266 px = 43,46% | 73,86% relatif | Tidak |
| Skala potret, lebar × tinggi | 55% × 86% | 26-k5-foto-teks-samping.jpg (188,117,869,666) | 681×549 px = 70,94% × 89,71% | Lebar 28,98%; tinggi 4,31% relatif | Tidak (lebar) |
| Skala TV, lebar × tinggi | 34% × 33% | 26-k6-papan-gabus.jpg (312,254,632,471) | 320×217 px = 33,33% × 35,46% | Lebar 1,96%; tinggi 7,45% relatif | Ya |

Batas figur/potret yang lunak memberi ketidakpastian sekitar ±4 px; kedua ketidakcocokan tetap melampaui 15%. Bagian subjek di luar frame tidak direkonstruksi. Metadata sumber mengonfirmasi 960×720, 24 fps, 77,83 dtk.
Skrip: [periksa_scripts/ukur.py](periksa_scripts/ukur.py); angka mentah: [hasil.json](periksa_scripts/hasil.json); bukti kotak: [bukti-kotak.jpg](periksa_scripts/bukti-kotak.jpg).

Terlihat tetapi tidak tertulis:
- 26-k2-kartu-judul.jpg: empat kotak hitam solid menjadi handle di sudut kotak seleksi putus-putus.
- 26-k6-papan-gabus.jpg: potongan TV mempunyai pinggiran putih terang yang mengikuti kontur luarnya.
- 26-k8-cta-wajah.jpg (dilihat langsung dari keyframes/): huruf dan tanda kutip DREAM mempunyai kontur putih tebal di luar muka kuning dan sisi jingga.

Usul koreksi angka:
- k4, tinggi figur: ±25% → **43,5% tinggi konten** pada frame yang diperiksa.
- k5, lebar potret: 55% → **70,9% lebar frame** pada frame yang diperiksa.
