PUTUSAN: PERBAIKI

Kelengkapan
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading wajib sama dengan template | Ya | Seluruh heading wajib sama dan berurutan; tambahan Proporsi terukur tersedia. |
| 1. Warna & tekstur spesifik | Ya | Hex studio, merah, dan langit; perbandingan luma. |
| 2. Teks spesifik | Ya | Tinggi, rasio, posisi, lapisan, dan perlakuan huruf. |
| 3. Ritme spesifik | Ya | 31 cut/menit, median 1,2 dtk, 38 event/menit. |
| 4. B-roll / footage spesifik | Ya | Kartu CEO/Clients, kemiringan 5–10°, astronaut. |
| 5. Motion graphic spesifik | Ya | Skala subjek, urutan lapisan, roket, ponsel kaca. |
| 6. Kamera & transisi spesifik | Ya | Push/pull dalam persen; cincin 3–5 frame. |
| 7. SFX spesifik | Ya | Pita >5 kHz, lonjakan +21/+17/+11 dB. |
| 8. Musik spesifik | Ya | 129 bpm, −14 LUFS, −0,9 dBTP. |
| Proporsi terukur dengan tabel per jenis adegan | Ya | Tujuh jenis/baris k1–k7. |
| Ada 6–8 frame kunci | Ya | Tujuh JPG, seluruhnya 720×1280; dicocokkan ke video sumber. |
| Diambil untuk sesuai nama dan paling rinci | Ya | Menyebut Refference01.mp4 sebagai nama netral; fokus teks/transisi dirinci terutama pada bagian 2 dan 6. |
| Cek kemiripan seluruhnya bisa dicek dari still | Tidak | Larangan “bukan crossfade” memerlukan urutan gambar, bukan satu still. |
| Tidak ada aturan lama durasi tampil teks | Ya | Angka waktu menyatakan gerak/transisi/ritme, bukan kewajiban durasi tampil teks. |

Ukur ulang
Kotak (x0,y0,x1,y1) pada frame asli 720×1280, batas akhir eksklusif; k1/k2/k4 masing-masing pada 1,2/2,7/6,6 dtk video sumber.
Huruf: batas isi merah, halo diabaikan; bingkai foto dikeluarkan dari mask CEO. Subjek: landmark visual ±3 px; orang tanpa kursi/bayangan, astronaut termasuk mouse+keyboard (batas konservatif terbesar). Warna: median RGB area latar.
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi Hera | 11,1% H | 62-k1-wajah-teks-nama.jpg (110,396,611,545) | 149 px = 11,64% H | 4,9% relatif | Ya |
| Rasio Hera / My name is | ±4× (tabel k1) | 62-k1-wajah-teks-nama.jpg: Hera (110,396,611,545); sambung (192,353,393,397) | 149/44 = 3,39× | 15,3% relatif; sensitif blur | Ragu |
| Pusat blok CEO | (51%,19%) | 62-k2-wajah-kartu-foto.jpg (102,134,631,345) | (50,90%,18,71%) | (0,10;0,29) poin persen | Ya |
| Tinggi pembicara k1 | 33→39% H | 62-k1-wajah-teks-nama.jpg (208,445,514,1116) | 671 px = 52,42% H | 34,4% relatif terhadap batas terdekat 39% | Tidak |
| Tinggi astronaut | 58% H | 62-k4-ilustrasi-astronaut-ui.jpg (76,575,711,1095) | 520 px = 40,63% H, termasuk perangkat | 30,0% relatif | Tidak |
| Hex latar studio | #E6E2E8–#F2EDF3 | 62-k1-wajah-teks-nama.jpg (20,20,180,180) | #E7E7E7 = RGB(231,231,231) | ΔRGB=(1,5,1) terhadap #E6E2E8 | Ya |
Rasio ditandai ragu: perubahan ambang merah untuk huruf pucat menghasilkan 3,31–3,55×, melintasi batas toleransi 3,40×; tidak dihitung sebagai tidak cocok.
Rekap: 3/6 cocok, 2 tidak cocok, 1 ragu. Toleransi: ukuran 15% relatif; posisi 5 poin persen; warna maksimum 20 per kanal.

Terlihat tetapi tidak tertulis
- 62-k1-wajah-teks-nama.jpg: pergelangan kaki bersilang dan kedua telapak tangan di lutut; pose ini menentukan siluet duduk.
- 62-k3-wajah-ui-ponsel.jpg: ketiga kartu konten memakai garis tepi putih, berbeda dari bingkai merah kartu foto.
- 62-k4-ilustrasi-astronaut-ui.jpg: ponsel kaca mempunyai pil merah horizontal tepat di tengah atas sebagai notch.

Usul koreksi angka
- Tinggi pembicara pada k1: 52,4% H.
- Tinggi astronaut pada k4, termasuk mouse dan keyboard: 40,6% H.

Bukti pengukuran: periksa_scripts/ukur.py, periksa_scripts/hasil.json, dan gambar *-kotak.jpg. Kartu dan berkas sumber tidak diubah.
