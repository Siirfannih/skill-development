PUTUSAN: PERBAIKI

**Kelengkapan**

| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | Semua heading wajib ada dan sama; tambahan Proporsi terukur tersedia. |
| 1. Warna & tekstur spesifik | Ya | Hex putih, lavender, ungu; footage hangat dan film-burn. |
| 2. Teks spesifik | Ya | Empat ukuran kata, rasio, posisi, font dan lapisan. |
| 3. Ritme spesifik | Ya | 8,1 cut/menit, median shot 1,9 dtk dan pembagian babak. |
| 4. B-roll / footage spesifik | Ya | Presenter, kolase tiga jendela dan dimensi panel editor. |
| 5. Motion graphic spesifik | Ya | Ubin Ae/CapCut, preset, skala subjek dan kedalaman. |
| 6. Kamera & transisi spesifik | Ya | Pull/punch-in, rasio skala, perpindahan horizontal dan film-burn. |
| 7. SFX spesifik | Ya | Pop/klik kata, hit pergantian babak dan jeda sunyi. |
| 8. Musik spesifik | Ya | Funk/vocal chop, 117–120 bpm dan level LUFS. |
| Proporsi terukur: tabel per jenis adegan | Ya | Delapan jenis adegan; tinggi kata, posisi, skala dan kedalaman. |
| Ada 6–8 frame kunci | Ya | Delapan JPG, k1–k8. |
| Diambil untuk sesuai nama file; bagiannya paling rinci | Ya | Fokus teks per kata sesuai 43-tutorial-teks-per-kata; bagian 2 paling rinci, asal IG Dcc8NmZgmiw disebut. |
| Cek kemiripan bisa diperiksa dari still | Ya | Delapan butir tentang ukuran, posisi, font, lapisan dan warna. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Waktu yang dicatat merupakan pengamatan sumber/pergantian dan durasi animasi, tanpa aturan menahan teks. |

**Ukur ulang — 4/6 cocok; kelengkapan penuh.**
Frame 720×1280; kotak (x0,y0,x1,y1), batas akhir eksklusif. Tinggi huruf mencakup titik/ascender sampai descender, tanpa halo blur. Segmentasi putih min RGB ≥180; lavender dipisahkan berdasarkan warna; batas kartu dari gradien piksel.
Toleransi: ukuran relatif ≤15%; posisi ≤5 poin persen (pp); warna selisih setiap kanal ≤20.

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi “pakai” | 9,7% tinggi | 43-k1-wajah-kata-tersebar.jpg (209,859,510,995) | 136 px = 10,63% | 9,54% relatif | Ya |
| Rasio tinggi “pakai”:“lo” | 4,4× | 43-k1-wajah-kata-tersebar.jpg (209,859,510,995); (148,663,174,691) | 136/28 = 4,86× | 10,39% relatif | Ya |
| Pusat horizontal “pakai” | x 50% | 43-k1-wajah-kata-tersebar.jpg (209,859,510,995) | x 359,5 px = 49,93% | 0,07 pp | Ya |
| Tinggi “gimana” | ±11% tinggi | 43-k2-kata-belakang-kepala.jpg (49,172,667,378) | 206 px = 16,09% | 46,31% relatif | Tidak |
| Lebar kartu preset | ±55% lebar | 43-k4-kartu-preset-ungu.jpg (36,344,666,936) | 630 px = 87,50% | 59,09% relatif | Tidak |
| Warna kata belakang kepala | #B6BCE4 | 43-k2-kata-belakang-kepala.jpg (642,245,660,280), bagian dalam “a” kanan | Median RGB (183,189,227) = #B7BDE3 | RGB (1,1,1) | Ya |

Kontrol blur k1: ambang 150–210 memberi tinggi 10,08–11,09%, tetap cocok. Frame sumber video-1.300.png: “pakai” (229,823,490,946) = 9,61%; “lo” (163,661,187,687), rasio 4,73×, keduanya juga cocok. Pada k2, titik “i” dan ekor “g” terlihat sehingga tinggi total dapat diukur meski tengah kata tertutup kepala.

**Terlihat tetapi tidak tertulis**

- 43-k3-contoh-gagal.jpg: pinggir subjek dan huruf “gagal” memiliki pecahan warna merah/sian yang jelas.
- 43-k4-kartu-preset-ungu.jpg: bentuk abu-abu besar dan buram terpotong di sudut kiri atas serta kanan bawah latar.
- 43-k4-kartu-preset-ungu.jpg: baris oranye “20+ Premium” bertumpang tindih dengan baris putih “preset text for capcut”.
- 43-k5-kolase-putih.jpg: susunan jendela berselang—kecil kiri atas, besar kiri bawah, panjang kanan tengah—dengan ruang putih lebar; jendela kanan menyentuh tepi frame.
- 43-k6-cta-gelap.jpg: latar CTA memperlihatkan panel daftar font CapCut yang sangat diredupkan.

**Usul koreksi angka**

- Tinggi “gimana” pada k2: ±11% → **16,1% tinggi frame**.
- Lebar kartu preset pada k4: ±55% → **87,5% lebar frame**.

Reproduksi: `~/work/mg-venv/bin/python periksa_scripts/ukur.py`; hasil rinci `periksa_scripts/hasil.json`, kotak bukti `periksa_scripts/bukti-k*.png`. Kartu tidak diubah.
