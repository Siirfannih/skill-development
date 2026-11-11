PUTUSAN: PERBAIKI

Kelengkapan:

| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading wajib sama dengan template | Ya | PENGIKAT, TEKNIK, delapan subbagian, Cek kemiripan, Catatan pakai sesuai; Proporsi terukur ditambahkan. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | §1–6 spesifik; §4 tanpa footage; §7–8 tanpa audio, terkonfirmasi ffprobe hanya stream video. |
| Proporsi terukur: tabel per jenis adegan | Ya | Lima baris jenis adegan, termasuk dua arah sapuan. |
| Ada 6–8 frame kunci | Ya | Enam JPG; k5/k6 merupakan crop 520×420, empat lainnya 720×960. |
| Diambil untuk sesuai nama file; bagian tersebut paling rinci | Ya | Nama koushik_kds tidak menunjuk teknik; fokus eksplisit tipografi dan latar piksel dijabarkan paling rinci di §2/§5 serta ritme. |
| Cek kemiripan bisa dicek dari still | Tidak | Butir “Sapuan berasal dari arah kotak biru dan membalik latar hitam ↔ putih; tidak ada cut, kamera diam” membutuhkan urutan waktu. |
| Tidak ada pencatatan lama tampil teks dalam detik | Tidak | §2: “Teks diam 8,3 dtk penuh”; template menyatakan kapan/berapa lama teks tampil tidak dicatat di sini. |

Ukur ulang: **6/6 cocok**. Kelengkapan belum penuh sehingga putusan PERBAIKI.
Koordinat (x0,y0,x1,y1), batas kanan/bawah eksklusif; persentase terhadap frame penuh 720×960, bukan crop k5/k6.
k1 = `64-k1-latar-hitam.jpg`; k3 = `64-k3-latar-putih.jpg`, keduanya di `keyframes/`.
Tinggi menghitung rentang vertikal piksel huruf termasuk antialias, ketidakpastian ±1 px; rasio memakai median tiga baris judul dan lima baris kecil. Warna = median RGB area tanpa tulisan.

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi kapital judul | 42–44 px; 4,4–4,6% H | k1: (338,342,517,385); (125,422,383,466); (255,501,383,545) | 43, 44, 44 px; median 44 px = 4,58% H | Dalam rentang; 0% terhadap rentang | Ya |
| Rasio judul : teks kecil | ±3 | k1: tiga kotak judul di atas; kecil (422,584,513,598), (422,601,512,615), (422,617,527,632), (422,636,512,651), (422,654,539,672) | Median tinggi kecil 15 px; 44/15 = 2,93 | 2,22% relatif | Ya |
| Pusat blok judul | (45%,46%) | k1: (105,323,536,565), batas label putih | (44,51%,46,25%) | (0,49;0,25) poin persen | Ya |
| Skala judul + kotak biru | 60×37% frame | k1: (105,323,559,692), kotak pembatas gabungan | 454×369 px = 63,06×38,44% | (5,09%;3,89%) relatif | Ya |
| Biru kotak teks | #2713E9 = RGB(39,19,233) | k1: (410,675,550,688) | #2905E3 = RGB(41,5,227) | Absolut RGB (2,14,6), seluruhnya ≤20 | Ya |
| Latar hitam/putih | #010101 / #FAFAFA | k1: (60,80,280,280); k3: (20,100,200,300) | #010101 / #FAFAFA | Absolut RGB (0,0,0) untuk keduanya | Ya |

Terlihat tetapi tidak tertulis:

- `64-k1-latar-hitam.jpg` dan `64-k3-latar-putih.jpg`: kelima baris teks kecil rata kiri; inset kiri dan atas kotak biru hampir sama, sekitar 20 px.

Usul koreksi angka:

- Tidak ada; keenam klaim memenuhi toleransi. Dua kekurangan di atas terkait kelengkapan, bukan angka yang gagal ukur.

Skrip: `periksa_scripts/ukur_independen.py`; hasil rinci, kotak, metode, dan metadata sumber: `periksa_scripts/hasil_ukur.json`.
