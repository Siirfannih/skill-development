PUTUSAN: PERBAIKI

## Kelengkapan
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading wajib sama dengan template | Ya | Semua heading wajib identik; tambahan Proporsi terukur tersedia. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | Warna: hex; Teks: tinggi/rasio; Ritme: cut/shot; B-roll: polaroid dan rekaman layar; Motion: skala/lapisan; Kamera: perubahan skala; SFX: kepadatan; Musik: BPM/LUFS. |
| Proporsi terukur: tabel per jenis adegan | Ya | Delapan jenis adegan k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPG dalam keyframes/. |
| Diambil untuk sesuai nama file | Ya | s_tiercontent disebut sebagai nama kreator, bukan nama teknik. |
| Bagian yang diambil paling rinci | Ya | Teks 208 kata; motion 113; kamera 101, sesuai fokus yang disebut. |
| Cek kemiripan bisa diperiksa dari still | Tidak | Butir “Pergantian adegan lewat gerak … tanpa hard cut; kamera tidak pernah diam” memerlukan rangkaian frame/video. |
| Tidak ada aturan lama durasi tampil teks dalam detik | Ya | Waktu yang disebut menjelaskan kejadian/transisi sumber, bukan aturan durasi teks. |

## Ukur ulang
Koordinat JPG 1080×608; (x0,y0,x1,y1), kanan/bawah eksklusif. Persentase dinormalisasi terhadap frame, bukan dibandingkan sebagai piksel sumber 1276×718.
X-height memakai badan huruf sampai baseline: titik i dan ekor g tidak dihitung; pada sans dipakai huruf o. Baseline script ditandai visual, lalu batas tinta dihitung skrip.
Skala subjek memakai kotak pembatas terproyeksi, bukan luas permukaan objek.
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| X-height using | 16,4% tinggi | 74-k1-polaroid-teks.jpg (242,456,527,566) | 110 px = 18,09% | +10,32% relatif | Ya |
| Rasio using : sans | 2× | 74-k1-polaroid-teks.jpg: using (242,456,527,566); o (133,364,182,418) | 110/54 = 2,037× | +1,85% relatif | Ya |
| Pusat pill langkah | (50%,45%) | 74-k3-pill-tulisan-tangan.jpg (278,222,806,327) | (50,19%,45,15%) | (+0,19;+0,15) poin persen | Ya |
| Skala laptop, lebar×tinggi | 64×64% | 74-k4-ui-laptop.jpg (188,124,875,508) | 63,61×63,16% | −0,61%; −1,32% relatif | Ya |
| Skala kartu chat, lebar×tinggi | 46×45% | 74-k5-ui-3d-miring.jpg (309,130,812,409) | 46,57×45,89% | +1,25%; +1,97% relatif | Ya |
| Warna isi pill hijau | #273220–#323D2B | 74-k3-pill-tulisan-tangan.jpg (300,315,780,321) | Median RGB (42,57,34), #2A3922 | ΔRGB terhadap #273220 = (3,7,2) | Ya |

Cocok: **6/6**. Ambang ukuran relatif ≤15%, posisi ≤5 poin persen, warna tiap kanal ≤20. Kelengkapan belum penuh, sehingga putusan PERBAIKI.
Skrip: periksa_scripts/ukur.py; hasil mentah: periksa_scripts/hasil.json; kotak verifikasi: periksa_scripts/kotak-k*.png. Tidak mengukur cut/menit dalam enam klaim ini.

## Terlihat tetapi tidak tertulis
- 74-k1-polaroid-teks.jpg: sudut kanan-bawah polaroid melipat/menggulung ke depan; memberi bentuk kertas tiga dimensi di luar bayangan biasa.
- 74-k1-polaroid-teks.jpg: objek cokelat-oranye buram berada di depan tulisan dan menutup sebagian “using”; lapisan depan bukan hanya teks.
- 74-k2-judul-gelap-logo.jpg: logo ChatGPT putih sangat besar terpotong tepi kiri-atas, menjadi bingkai visual bagi UI kecil di tengah.

## Usul koreksi angka
Tidak ada: keenam klaim memenuhi toleransi. Nilai hasil ukur bukan alasan mengganti angka kartu yang masih cocok.
