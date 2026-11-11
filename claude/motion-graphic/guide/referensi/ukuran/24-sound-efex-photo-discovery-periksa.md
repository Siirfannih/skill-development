PUTUSAN: PERBAIKI

## Kelengkapan
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | PENGIKAT, TEKNIK, delapan subbagian, Cek kemiripan, Catatan pakai; tambahan Proporsi terukur tersedia. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | Palet hex, ukuran teks, ritme, radius foto, skala, transisi, level SFX, bpm/mix. |
| Proporsi terukur: tabel per jenis adegan | Ya | Sepuluh jenis adegan. |
| Ada 6–8 frame kunci | Ya | Delapan JPG lokal, k1–k8; isi k4 tidak sesuai label dock. |
| Diambil untuk sesuai file dan paling rinci | Ya | Sound efex 2.mp4 → SFX; bagian 7 merinci kosakata, kepadatan, pemetaan waktu, dan level. |
| Cek kemiripan bisa diperiksa dari still | Tidak | Butir gerak memerlukan dua waktu; butir audio memerlukan suara. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Angka waktu menjelaskan gerak, transisi, ritme, dan audio; bukan aturan durasi teks. |

## Ukur ulang
Metode: skrip mandiri `periksa_scripts/ukur.py`; hasil mentah `periksa_scripts/hasil.json`. Semua JPG 1080×608; kotak (x0,y0,x1,y1), batas kanan/bawah eksklusif. Video sumber terverifikasi 1276×718, 30 fps, 40,074785 dtk.
Tinggi baris diukur dari batas tinta, termasuk descender untuk rasio **baris** 1,8; bukan rasio **cap** ±2,5 yang disebut terpisah. Warna memakai median bagian dalam huruf setelah erosi 1 px; ukuran objek tidak memasukkan bayangan.
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi PHOTOGRAPHS? | 9,6% tinggi frame | 24-k2-teks-dua-ukuran.jpg (255,299,831,357) | 58 px = 9,54% | 0,63% relatif | Ya |
| Rasio baris utama/kata sambung | 1,8× | 24-k2-teks-dua-ukuran.jpg utama (255,299,831,357); kecil (446,262,641,295) | 58/33 = 1,76× | 2,36% relatif | Ya |
| Pusat Chase Photographer | cx 49–51%; cy 51% | 24-k3-foto-melayang.jpg (322,288,751,334) | cx 49,68%; cy 51,15% | x dalam rentang; y +0,15 poin persen | Ya |
| Skala kartu foto hero | 47×48% frame | 24-k1-foto-hero-teks-samping.jpg (285,157,792,451) | 507×294 px = 46,94×48,36% | lebar 0,12%; tinggi 0,74% relatif | Ya |
| Skala pil fotografer | lebar 37–41%; tinggi ±17% | 24-k6-grid-pil-fotografer.jpg, Mobe (96,442,528,601) | 432×159 px = 40,00×26,15% | lebar dalam rentang; tinggi +53,83% relatif | Tidak |
| Aksen merah teks | #E53726–#E53828 | 24-k4-ui-dock-ikon.jpg, teks aktual (249,268,813,340) | RGB (216,40,42), #D8282A | terhadap #E53726: ΔRGB (13,15,4), semua ≤20 | Ya |

Hasil: **5 dari 6 klaim cocok**. Ambang: ukuran ≤15% relatif; posisi ≤5 poin persen; setiap kanal warna ≤20. Kelengkapan belum penuh, sehingga putusan PERBAIKI.
Ketidaksesuaian aset: `24-k4-ui-dock-ikon.jpg` menampilkan teks merah “Never get them!”, bukan dock; rujukan k4 pada bagian 5 dan tabel proporsi tidak sesuai gambar tersebut.

## Terlihat tetapi tidak tertulis
- `24-k1-foto-hero-teks-samping.jpg`: bingkai persegi merah–kuning berada di dalam foto; tangan besar menjulur melewati sisi kiri bingkai itu, memberi kesan keluar menuju penonton.
- `24-k6-grid-pil-fotografer.jpg`: setiap pil memiliki logo dalam lingkaran di kiri; sebagian nama disertai badge kecil berbingkai tipis (“Top Rated”, “Pro”, “Elite”).

## Usul koreksi angka
- Tinggi pil fotografer pada k6: **±17% → 26,15% tinggi frame**, berdasarkan pil Mobe utuh; lebarnya 40,00% sudah cocok dengan rentang kartu.
