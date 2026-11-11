PUTUSAN: PERBAIKI

## Kelengkapan
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading mengikuti template | Ya | PENGIKAT, TEKNIK, delapan subbagian, Cek kemiripan, Catatan pakai sesuai; Proporsi terukur ditambahkan. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | Warna: hex; Teks: ukuran/posisi; Ritme: cut; Footage: jenis/bingkai; Motion: lapisan/skala; Kamera: gerak; SFX: jenis/level; Musik: babak/BPM/mix. |
| Proporsi terukur dengan tabel per jenis adegan | Ya | Tujuh jenis adegan, termasuk k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPEG di keyframes/. |
| Diambil untuk sesuai nama file dan paling rinci | Ya | Nama “explore” tidak menunjuk teknik; kartu menyatakan pilihan teks/warna, dengan uraian teks paling rinci. |
| Cek kemiripan bisa dicek dari still | Tidak | Butir terakhir menyebut hit sub bass dan pop pada cut/kata; perlu audio/urutan waktu. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Rentang waktu adalah penunjuk adegan sumber; tidak menetapkan durasi teks untuk pemakaian berikutnya. |

## Ukur ulang
Sumber: video asli 960×720, 30 fps. Skrip: `periksa_scripts/ukur.py`; hasil rinci: `periksa_scripts/hasil.json`.
Frame dicocokkan ke video dengan galat gambar mini terkecil: k1 5,000 s; k2 12,500 s; k3 23,400 s; k6 37,500 s.
Kotak (x0,y0,x1,y1), asal kiri atas, batas kanan/bawah eksklusif; singkatan kN menunjuk nama lengkap di bawah.
Tinggi kapital: puncak sampai garis dasar; subtitle mencakup naik-turun huruf. Masker kuning-hijau memisahkan huruf dari latar; ketidakpastian glow ±1 poin persen sesuai kartu tidak mengubah status.
Untuk rentang, selisih relatif dihitung terhadap batas terdekat; nilai di dalam rentang berselisih 0. Posisi memakai poin persen (pp); warna memakai selisih kanal absolut.
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi kapital AKU, diwakili U | 12–14% | k1 (791,105,910,295) | 190 px = 26,39% | +88,49% terhadap batas 14% | Tidak |
| Tinggi LINE pada layar warna | 23–31% | k2 (390,206,938,378) | 172 px = 23,89% | 0; dalam rentang | Ya |
| Pusat blok teks kinetik | (73%,49%) | k1 (469,105,941,605) | (73,44%,49,31%) | x +0,44 pp; y +0,31 pp | Ya |
| Tinggi subtitle “sekarang umur 18” | 2,6% | k3 (338,606,622,640) | 34 px = 4,72% | +81,62% | Tidak |
| Latar oranye-merah | #E2431F | k2 (50,150,300,550) | Median RGB (240,79,26), #F04F1A | RGB (14,12,5), semuanya ≤20 | Ya |
| Skala sisipan wisuda, lebar × tinggi | 82% × 82% | k6 (96,75,864,650) | 768×575 px = 80,00% × 79,86% | −2,44%; −2,61% relatif | Ya |
Nama frame: k1 `03-k1-wajah-teks-kinetik.jpg`; k2 `03-k2-kartu-warna-tipografi.jpg`; k3 `03-k3-montase-foto.jpg`; k6 `03-k6-sisipan-bingkai.jpg`.
Pada U, puncak diisolasi melalui (890,90,904,240), garis dasar melalui lengkung bawah (830,260,855,300), agar PENGEN yang bertumpuk tidak ikut menentukan tinggi.
Hasil: **4 dari 6 cocok**, tanpa klaim ragu. Ambang: ukuran ≤15% relatif; posisi ≤5 pp; tiap kanal RGB ≤20. Kelengkapan juga belum penuh.

## Terlihat tetapi tidak tertulis
- `03-k3-montase-foto.jpg` dan `03-k6-sisipan-bingkai.jpg`: subtitle berwarna kuning-hijau di atas kotak gelap; kartu hanya menyebut subtitle putih.
- `03-k2-kartu-warna-tipografi.jpg`: blok “ON-/LINE/YA.” terkumpul di kanan atas, dengan bidang oranye kosong luas di kiri dan bawah; posisi khusus ini belum dicatat.
- `03-k5-footage-teks-raksasa.jpg`: sinar matahari langsung membentuk bayangan keras pada wajah dan badan; arah/kerasnya pencahayaan belum dicatat.

## Usul koreksi angka
- Tinggi AKU pada k1: **26,39%** tinggi frame (190 px), menggantikan angka 12–14% untuk kata pada frame ini saja.
- Tinggi subtitle pada k3: **4,72%** tinggi frame (34 px), menggantikan angka 2,6% untuk subtitle pada frame ini saja.
