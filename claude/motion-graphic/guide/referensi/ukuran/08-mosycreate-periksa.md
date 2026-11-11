PUTUSAN: PERBAIKI

Audit independen atas `kartu.md`, template, dan 8 frame kunci; tidak membaca data ukur atau skrip penulis.

| Kelengkapan | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | Semua heading wajib identik dan berurutan; tambahan Proporsi terukur tersedia. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | §1–8 masing-masing berisi palet, ukuran, ritme, isi post, objek, gerak, bunyi, atau mix spesifik. |
| Proporsi terukur bertabel per jenis adegan | Ya | Delapan jenis adegan, k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPG, seluruhnya 960×720. |
| Diambil untuk sesuai nama file dan paling rinci | Ya | Motion.mp4 → gerak; §5–6 merinci objek, lapisan, kamera, faktor zoom, scroll, dan transisi. |
| Cek kemiripan bisa diperiksa dari still | Tidak | Butir ke-6 memerlukan video untuk push/pull, scroll, dan perbedaan gerak antar babak. |
| Tidak ada aturan lama durasi tampil teks | Ya | Tidak ada ketentuan lama tampil teks dalam detik; waktu yang tercantum menjelaskan sumber/shot/gerak/audio. |

Kotak `(x0,y0,x1,y1)` memakai piksel asli, origin kiri atas, batas akhir eksklusif; persen terhadap seluruh frame 960×720, termasuk bilah hitam.
Tinggi huruf diukur dari tinta teratas ke baseline, bukan kotak font; koma dikecualikan dari rasio huruf. Posisi memakai pusat kotak teks, tanpa ikon.
Hero berblur memakai rentang kanal RGB >80; variasi ambang 60–100 menghasilkan tinggi 43,47–46,11%, semuanya tetap cocok.
Kartu diukur pada badan putih, tanpa bayangan/gelembung penghubung; warna memakai median patch kosong.

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi huruf “You lose” | 7,9% H | 08-k2-teks-objek-inline-gelap.jpg (144,343,524,402) | 59 px = 8,19% H | 3,73% relatif | Ya |
| Tinggi hero “IN YOUR” | 44,6% H | 08-k3-hero-word.jpg (0,198,950,520) | 322 px = 44,72% H | 0,27% relatif | Ya |
| Rasio tinggi “But” : “what if” | 8,5 : 8,3 = 1,024× | 08-k4-pivot-hitam-dot.jpg (256,337,365,390); (386,338,579,388) | 53 : 50 px = 1,060× | 3,51% relatif | Ya |
| Pusat vertikal teks pivot | y 51% | 08-k4-pivot-hitam-dot.jpg (256,337,579,398) | y 367,5 px = 51,04% | 0,04 poin persen | Ya |
| Skala badan kartu Reminder | 61% H × 48% W | 08-k5-produk-kartu-ui.jpg (415,268,870,681) | 413×455 px = 57,36% H × 47,40% W | 5,96% H; 1,26% W relatif | Ya |
| Latar UI | #EDEDED | 08-k6-teks-notif-inline.jpg (50,80,900,220) | RGB (237,237,237), #EDEDED | ΔRGB (0,0,0) | Ya |

Enam dari enam klaim cocok: ukuran ≤15% relatif, posisi ≤5 poin persen, warna ≤20 per kanal. Putusan PERBAIKI karena kelengkapan belum penuh.

### Terlihat tetapi tidak tertulis

- `08-k1-ui-post-coretan.jpg`: bookmark berada di atas lingkaran abu solid; bagian kiri caption dan ikon bawah tampak buram sementara area simpan lebih tajam.
- `08-k2-teks-objek-inline-gelap.jpg`: thumbnail memiliki kotak seleksi garis putus-putus terang di luar bingkai fotonya.
- `08-k5-produk-kartu-ui.jpg`: dua gelembung putih di kiri atas membentuk penghubung visual menuju badan kartu Reminder.
- `08-k7-foto-payoff.jpg`: caption kurung siku ditaruh di atas strip gelap transparan, bukan langsung di foto.
- `08-k8-tulisan-tangan-vinyet.jpg`: pita UI abu terang dan avatar lingkaran hitam masih terlihat di atas foto, di belakang tulisan “Forever?”.

### Usul koreksi angka

Tidak ada; keenam klaim terpilih berada dalam toleransi.

Skrip: `periksa_scripts/ukur.py`; hasil mentah, ROI, ambang, dan pemeriksaan struktur: `periksa_scripts/hasil.json`.
