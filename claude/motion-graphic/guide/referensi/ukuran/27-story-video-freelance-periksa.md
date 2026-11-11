PUTUSAN: PERBAIKI

Klaim cocok: **4 dari 6**. Kelengkapan belum penuh: satu butir cek kemiripan memerlukan gerak/audio.

| Kelengkapan | Ya/tidak | Bukti |
|---|---|---|
| Heading sesuai template | Ya | Seluruh heading wajib berurutan; tambahan Proporsi terukur tersedia. |
| 1. Warna & tekstur spesifik | Ya | Hex palet, grain ±2,4, luma 188/22. |
| 2. Teks spesifik | Ya | Empat keluarga/bobot, leading negatif 20–40 %, posisi kanan. |
| 3. Ritme spesifik | Ya | Dua belas babak, durasi, 17,8 cut/menit. |
| 4. B-roll / footage spesifik | Ya | Kebun salak, jalan setapak, cermin cembung, foto wisuda. |
| 5. Motion graphic spesifik | Ya | Skala foto/poster/HP dan jumlah lapisan. |
| 6. Kamera & transisi spesifik | Ya | Geser <3 %, dorong +25 %, hard cut, glitch identitas. |
| 7. SFX spesifik | Ya | ±12 aksen, hit/pop/whoosh, puncak −0,5 sampai −7 dBFS. |
| 8. Musik spesifik | Ya | Tiga judul lagu, bpm, −14,3 LUFS. |
| Proporsi terukur bertabel per jenis adegan | Ya | Delapan baris jenis adegan. |
| Ada 6–8 frame kunci | Ya | Delapan JPG, k1 sampai k8. |
| Diambil untuk sesuai nama dan bagian paling rinci | Ya | Story video.mp4 diarahkan ke struktur cerita; bagian 3 paling rinci. |
| Semua Cek kemiripan bisa dicek dari still | Tidak | “Tanpa ... paralaks” memerlukan urutan gerak; lelucon di antara tiap klaim memerlukan konteks dialog/audio. |
| Tidak ada aturan lama durasi tampil teks dalam detik | Ya | Detik merupakan catatan ritme sumber; masuk teks dinyatakan dalam frame. |

Ukur ulang: frame 960×720; kotak (x0,y0,x1,y1), batas akhir eksklusif. Tinggi kapital dihitung dari puncak sampai baseline, tanpa glow/tanda baca. AKU memakai huruf A karena kata saling menimpa; baseline dikonfirmasi pada K.
Rentang: selisih relatif ke batas terdekat, nol bila di dalam rentang. Batas cocok: ukuran ≤15 %, posisi ≤5 poin persen, RGB tiap kanal ≤20.

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi AKU (kapital A) | 14,5–15,6 % H | 27-k1-wajah-teks.jpg (498,105,638,286) | 181 px = 25,14 % H | +61,15 % terhadap 15,6 | Tidak |
| Tinggi MENCOBA | 24–34 % H | 27-k2-kartu-judul.jpg (13,17,491,243) | 226 px = 31,39 % H | 0 %; dalam rentang | Ya |
| Tinggi kapital dialog | 3,6 % H | 27-k4-dialog-biru.jpg (46,192,573,224) | Median 32 px = 4,44 % H | +23,46 % | Tidak |
| Pusat blok FRESH GRADUATE | x 50 %, y 42–57 % | 27-k5-foto-kata.jpg (88,251,873,463) | (50,05;49,58) % | x +0,05 pp; y dalam rentang | Ya |
| Skala foto cutout, lebar × tinggi | 59 × 98 % | 27-k3-cutout-hijau.jpg (236,31,775,720) | 539×689 px = 56,15×95,69 % | −4,84 %; −2,35 % | Ya |
| Hex latar dialog | #061D51 | 27-k4-dialog-biru.jpg (100,540,300,610) | Median RGB (6,29,83), #061D53 | ΔRGB (0,0,2) | Ya |

Kapital dialog tetap 31–32 px saat ambang warna diperketat; selisih tetap di atas toleransi. Tepi foto memakai gradien median agar halo tidak masuk skala aset.
Skrip: periksa_scripts/ukur.py; hasil numerik dan sampel baseline: periksa_scripts/hasil.json. Tidak membaca ukuran.md atau skrip penulis.

### Terlihat tetapi tidak tertulis
- 27-k2-kartu-judul.jpg: “ON-” diputar 90°, sedangkan “LINE” horizontal di kanan bawah.
- 27-k3-cutout-hijau.jpg: bidang gelap bertekstur di depan lensa membentuk diagonal besar sepanjang sisi kiri foto.
- 27-k5-foto-kata.jpg: FRESH berada di atas GRADUATE; baris bawah membentang hampir dua kali lebar baris atas.
- 27-k6-poster.jpg: judul merah ber-outline hitam dan pita CTA merah di bawah menjadi dua bidang kuat di dalam poster.

### Usul koreksi angka
- Tinggi AKU pada k1: **25,14 %** tinggi frame (kapital A, 181 px).
- Tinggi kapital dialog pada k4: **4,44 %** tinggi frame (32 px).
