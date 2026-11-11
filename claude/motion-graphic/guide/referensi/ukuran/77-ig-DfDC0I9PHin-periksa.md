PUTUSAN: PERBAIKI

| Kelengkapan | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | Semua heading wajib ada; tambahan Proporsi terukur tersedia. |
| 1. Warna & tekstur spesifik | Ya | Hex latar, aksen, dan gradien. |
| 2. Teks spesifik | Ya | X-height, rasio kata, posisi, penekanan tajam/redup. |
| 3. Ritme spesifik | Ya | 99 cut/menit, median shot 0,35 dtk. |
| 4. B-roll / footage spesifik | Ya | Tokoh, stok, paten Edison, hubungan objek dengan VO. |
| 5. Motion graphic spesifik | Ya | Skala TV/tokoh, grid, jumlah lapisan. |
| 6. Kamera & transisi spesifik | Ya | Push-in 8–9%, pan 4%, hard cut/streak. |
| 7. SFX spesifik | Ya | Kepadatan dan jenis event; keterbatasan pemisahan stem disebutkan. |
| 8. Musik spesifik | Ya | BPM, genre per babak, LUFS, true peak, LRA. |
| Proporsi terukur, tabel per jenis adegan | Ya | Delapan jenis adegan. |
| Ada 6–8 frame kunci | Ya | Delapan JPG, k1–k8. |
| Diambil untuk sesuai nama file dan paling rinci | Ya | Nama sumber dicantumkan; tidak menyiratkan bagian tertentu; Teks/Ritme dipilih dan dibahas rinci. |
| Cek kemiripan bisa dicek dari still | Tidak | Butir teks bertahan 2–4 shot dan laju cut/median/ledakan 4 frame membutuhkan urutan video. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Waktu yang dicatat merupakan pengamatan kejadian/shot, bukan ketentuan durasi teks. |

Pengukuran mandiri pada still konten 1080×608; persentase tetap setara dengan 1280×720. Kotak (x0,y0,x1,y1), batas akhir eksklusif. X-height memakai huruf kecil tanpa ascender/descender, dari puncak tinta hingga baseline; bukan tinggi kapital.
Nama frame: k2 = `77-k2-objek-teks-mengapit.jpg`; k4 = `77-k4-kartu-hitam-teks.jpg`;
k5 = `77-k5-footage-teks-tengah.jpg`; k6 = `77-k6-kartu-putih-teks.jpg` (semuanya di keyframes/).

| Klaim | Nilai di kartu | Frame + kotak piksel | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| X-height aktif kartu hitam | 5,3% H | k4, u pada future: (366,287,396,322) | 35 px = 5,76% H | 8,6% relatif | Ya |
| X-height Nuclear | 8,1% H | k5, a: (591,294,620,327) | 33 px = 5,43% H | 33,0% relatif | Tidak |
| Pusat blok kartu hitam | x50%, y50% | k4, (212,272,867,335) | x49,95%, y49,92% | x0,05; y0,08 poin persen | Ya |
| Rasio kata kunci : kata sambung | 1:1 | k6, sun (547,279,691,331); e pada the (476,280,521,330) | 52:50 = 1,04:1 | 4,0% relatif | Ya |
| Tinggi badan TV | 65% H | k2, (315,44,759,461) | 417 px = 68,59% H | 5,5% relatif | Ya |
| Latar kartu hitam | #000000 | k4, (0,0,1080,240) | Median RGB (0,0,0), #000000 | Tiap kanal 0 | Ya |

Hasil: 5/6 cocok; kelengkapan belum penuh. Ambang: ukuran ≤15% relatif, posisi ≤5 poin persen, warna ≤20 tiap kanal. Ambang segmentasi Nuclear 150–190 memberi 33–34 px (5,43–5,59% H); ketidakcocokan tetap sama. Rasio k6 memakai ambang setengah kontras lokal agar blur tidak dihitung sebagai pembesaran huruf.

Terlihat tetapi tidak tertulis:
- `77-k2-objek-teks-mengapit.jpg`: layar CRT bertepi melengkung dengan garis pindai horizontal rapat.
- `77-k2-objek-teks-mengapit.jpg`: dua lampu meja mengapit TV pada ketinggian berbeda; kap kanan terpotong tepi frame.
- `77-k5-footage-teks-tengah.jpg`: cahaya teal membentuk garis horizontal ke kanan dari sekitar puncak objek, tepat di bawah teks.

Usul koreksi angka:
- X-height “Nuclear” pada k5: 8,1% → 5,43% tinggi frame (33/608 px; rentang segmentasi 5,43–5,59%).

Skrip dan bukti kotak: `periksa_scripts/ukur.py`, `periksa_scripts/hasil.json`, `periksa_scripts/77-k*-kotak.png`.
