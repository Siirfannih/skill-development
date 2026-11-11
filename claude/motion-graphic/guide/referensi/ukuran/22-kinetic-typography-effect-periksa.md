PUTUSAN: PERBAIKI

## Kelengkapan
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | Seluruh 12 heading struktural template hadir berurutan; tambahan Proporsi terukur sesuai permintaan. |
| Delapan bagian spesifik | Ya | Bagian 1–8 berisi pengamatan konkret/angka, termasuk footage kuil, scanline, gerak UI, SFX, dan mix. |
| Proporsi terukur, tabel per jenis adegan | Ya | Delapan jenis adegan k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPG k1–k8 tersedia. |
| Diambil untuk sesuai file dan paling rinci | Ya | Nama file asli disebut; bagian Teks paling rinci, mencakup bentuk, proporsi, posisi, dan animasi. |
| Cek kemiripan dapat diperiksa dari still | Tidak | Butir terakhir memerlukan video: cut/menit, median shot, dan kepadatan hook. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Durasi babak/transisi disebut; tidak ada aturan durasi baca/tahan teks. |

## Ukur ulang
Koordinat piksel setengah terbuka (x0,y0,x1,y1), frame 960×720; kN merujuk nama lengkap pada daftar di bawah.
Tinggi = bbox tinta termasuk ascender/descender; glow dikecualikan. Rasio memakai tinggi bbox kedua kata, bukan ukuran font nominal.
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi “So” | 12,6% H | k1 (244,491,364,565) | 74 px = 10,28% H | 18,43% relatif | Tidak |
| Rasio “So” terhadap “started” | 1,8× | k1 So (244,491,364,565); started (177,293,361,346) | 74/53 = 1,396× | 22,43% relatif | Tidak |
| Pusat kalimat “Keep your subject centered” | x50%, y50% | k6 (239,343,721,378) | x50,00%, y50,07% | x0,00; y0,07 poin persen | Ya |
| Tinggi bola fisheye | 80–95% H | k3 (224,137,741,596) | 459 px = 63,75% H | 20,31% di bawah batas 80% | Tidak |
| Warna bidang petir | #FCFF32 | k5 (20,20,150,120) | Median RGB (253,242,39), #FDF227 | ΔRGB absolut (1,13,11) | Ya |
| Pusat caption UI “through” | x50%, y66% | k7 (400,458,560,496) | x50,00%, y66,25% | x0,00; y0,25 poin persen | Ya |

Cocok: **3 dari 6**. Ambang: ukuran ≤15% relatif, posisi ≤5 poin persen, warna tiap kanal ≤20; rentang dibandingkan ke batas terdekat.
Segmentasi tinta diuji pada lima ambang: So 73–75 px, started 52–53 px, rasio 1,396–1,423×; seluruhnya tetap tidak cocok.
Batas bola dipilih pada tepi footage, tanpa teks busur/glow; ketidakpastian ±6 px (±0,83 poin persen), tetap di luar toleransi.
Nama frame: k1 `22-k1-wajah-kolase.jpg`; k3 `22-k3-fisheye-bulat-teks-lengkung.jpg`; k5 `22-k5-wajah-huruf-kolase.jpg`; k6 `22-k6-fisheye-kotak-kalimat.jpg`; k7 `22-k7-ui-caption-satu-kata.jpg`.
Skrip dan bukti: `periksa_scripts/ukur.py`, `hasil.json`, `sensitivitas.json`, serta PNG kotak ukur; sumber video terverifikasi 960×720, 30 fps.

## Terlihat tetapi tidak tertulis
- `22-k3-fisheye-bulat-teks-lengkung.jpg` dan `22-k6-fisheye-kotak-kalimat.jpg`: kisi tipis horizontal/vertikal menutupi footage dan melengkung mengikuti distorsi fisheye.
- `22-k5-wajah-huruf-kolase.jpg`: judul tersusun dua baris, VISUAL di atas STORYTELLING; kepingan huruf memiliki kemiringan dan garis dasar berbeda.

## Usul koreksi angka
- k1, tinggi “So”: **10,28% tinggi frame** (74 px).
- k1, rasio tinggi “So”/“started”: **1,40×** (74/53 px).
- k3, tinggi bola fisheye pada still ini: **63,75% tinggi frame** (459 px; ±0,83 poin persen).
