PUTUSAN: PERBAIKI

## Kelengkapan
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading sesuai template | Ya | Seluruh heading tetap ada; tambahan “Proporsi terukur” sesuai permintaan. |
| Delapan bagian spesifik | Ya | §1–8 berisi hex, proporsi, jumlah cut, jenis objek, gerak, SFX, dan angka musik. |
| Proporsi terukur per jenis adegan | Ya | Tabel mencakup delapan jenis adegan k1–k8. |
| Enam–delapan frame kunci | Ya | Delapan JPEG k1–k8 tersedia. |
| “Diambil untuk” sesuai nama file dan paling rinci | Tidak | Nama asli tercampur instruksi “Cek PETA.md…”; sasaran disebut sebagai dua bagian terkuat, dengan rincian tersebar di §2/§5/§6. |
| “Cek kemiripan” dapat diperiksa dari still | Tidak | Butir terakhir meminta pan, blur/zoom-through, dan ketiadaan fade lambat; urutan gerak tersebut membutuhkan video. |
| Tidak ada aturan lama durasi tampil teks | Ya | Angka detik menjelaskan ritme, lokasi peristiwa, dan kecepatan kamera, bukan aturan lama tampil teks. |

## Ukur ulang
Koordinat pada JPEG 1080×608; kotak (x0,y0,x1,y1), batas kanan/bawah eksklusif. Persentase memakai dimensi JPEG, bukan piksel video 1276×718.
Tinggi teks = kotak tinta termasuk ascender/descender. Warna = median RGB daerah rata; kotak UI mengecualikan bayangan. Skrip: `periksa_scripts/ukur.py`; data: `periksa_scripts/hasil.json`.
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi kata kunci k1 | 14,9–18,0% H, “Ada”/“jarak” | 80-k1-kinetik-gelap.jpg: Ada (86,257,305,347); jarak (779,256,1056,364) | 90/108 px = 14,80/17,76% H | Relatif 0,65/1,32% | Ya |
| Rasio kata kunci : sambung | 2,2–3,8× | 80-k1-kinetik-gelap.jpg: Ada/jarak seperti di atas; antara (488,357,594,383) | “antara” 26 px; rasio 3,46×/4,15× | Ada dalam rentang; jarak 9,31% di atas 3,8× | Ya |
| Pusat horizontal judul tokoh | cx 70% | 80-k3-tokoh-potong.jpg: “the gap” (530,191,978,369) | cx 754 px = 69,81% W | 0,19 poin persen | Ya |
| Tinggi jendela UI k5 | 57% H | 80-k5-ui-melayang.jpg: (262,130,819,478) | 348 px = 57,24% H | Relatif 0,42% | Ya |
| Latar gelap | #0D0B0E | 80-k1-kinetik-gelap.jpg: (20,20,180,140) | #0D0B0E, RGB (13,11,14) | ΔRGB (0,0,0) | Ya |
| Aksen biru pil | #2A54DF–#3C5EDF | 80-k4-teks-chip-video.jpg: (700,250,900,265), isi pil tanpa huruf | #2953E3, RGB (41,83,227) | Terhadap #2A54DF: ΔRGB (1,1,4) | Ya |
Toleransi: ukuran ≤15% relatif; posisi ≤5 poin persen; warna ≤20 per kanal. Rentang dibandingkan pada batas terdekat bila hasil di luarnya. **Cocok: 6/6.**

## Terlihat tetapi tidak tertulis
- `80-k1-kinetik-gelap.jpg`: garis penghubung diakhiri batang vertikal pendek pada kedua ujung, menyerupai penanda ukuran.
- `80-k2-grafik-garis.jpg`: kurva putih menanjak lalu melandai, sedangkan garis titik-titik makin curam; bentuk kedua kurva ini belum dijelaskan.
- `80-k2-grafik-garis.jpg`: sumbu berbentuk L abu-abu tipis tanpa angka atau tanda skala.
- `80-k4-teks-chip-video.jpg`: kata dan chip terpotong oleh batas atas/kanan frame; komposisi menerus ke luar layar.

## Usul koreksi angka
Tidak ada angka yang gagal toleransi pada enam klaim yang diperiksa.
