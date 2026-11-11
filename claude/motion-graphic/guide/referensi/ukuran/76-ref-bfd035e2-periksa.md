PUTUSAN: PERBAIKI

Keenam klaim cocok dalam toleransi; kelengkapan belum penuh. Pemeriksaan independen dari kartu, template, tujuh keyframe, dan video sumber.

**Kelengkapan**
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading sesuai template | Ya | PENGIKAT, TEKNIK, delapan subbagian, Cek kemiripan, Catatan pakai tersedia; ditambah Proporsi terukur yang diwajibkan. |
| 1. Warna & tekstur spesifik | Ya | Hex, saturasi, rentang fade. |
| 2. Teks spesifik | Ya | Tinggi huruf, rasio, koordinat, opasitas. |
| 3. Ritme spesifik | Ya | Cut/menit, median dan rentang shot. |
| 4. B-roll / footage spesifik | Ya | Tiga jenis shot podcast, reaksi pendengar. |
| 5. Motion graphic spesifik | Ya | Caption, angka, skala kepala dan keburaman. |
| 6. Kamera & transisi spesifik | Ya | Persentase punch-in/geser dan cut penutup. |
| 7. SFX spesifik | Ya | Tidak terdengar SFX; onset ucapan dan level sunyi. |
| 8. Musik spesifik | Ya | Tidak ada musik; LUFS, true peak, LRA. |
| Proporsi terukur, tabel per jenis adegan | Ya | Enam jenis adegan, termasuk penutup. |
| Ada 6–8 frame kunci | Ya | Tujuh JPG di keyframes/, k1–k7. |
| Diambil untuk sesuai nama dan paling rinci | Ya | Nama hash tanpa petunjuk dinyatakan; fokus Warna/Teks/Kamera dijabarkan rinci, Teks paling panjang. |
| Cek kemiripan bisa diperiksa dari still | Tidak | Fade 9–11 frame, waktu pergantian angka, tanpa musik/SFX, dan −14 LUFS membutuhkan video/audio. |
| Tidak mencatat aturan lama tampil teks dalam detik | Tidak | §2 menetapkan kredit “hanya di 4,6 dtk pertama” serta rentang blok angka 12,4–16,3 dtk; template melarang pencatatan kapan/berapa lama teks tampil di bagian ini. |

**Ukur ulang**
Koordinat pada 1080×1920: (x0,y0,x1,y1), batas kanan/bawah eksklusif. Selisih ukuran relatif terhadap kartu; posisi dalam poin persen (pp).
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi angka 1 | 11,35% tinggi; 218 px | 76-k5-statistik-angka.jpg (313,1198,408,1416) | 218 px = 11,354% | 0,04% relatif | Ya |
| Rasio angka : x-height hour | ±3,6:1 | 76-k5-statistik-angka.jpg angka (313,1198,408,1416); o/u/r (525,1356,699,1417) | 218/60 = 3,633:1 | 0,93% relatif | Ya |
| Pusat caption | x 50%, y 67% | 76-k6-warna-kembali.jpg (226,1255,750,1333) | x 45,185%, y 67,396% | x 4,815 pp; y 0,396 pp | Ya |
| Skala kepala pendengar | y 4–37% → tinggi 33% | 76-k3-pendengar-abu.jpg (350,66,883,789) | Tinggi 723 px = 37,656%; y 3,438–41,094% | Tinggi 14,11% relatif; ujung 0,562/4,094 pp | Ya |
| Warna dinding k1 | #565154 | 76-k1-wajah-warna-caption.jpg (50,50,250,200) | Median RGB (82,78,81) = #524E51 | Absolut R/G/B: 4/3/3 | Ya |
| Cut per menit | 8 cut; 25/menit | Video f000–f457; ROI tiap frame (0,0,1080,1056) | 9 cut / 19,083 dtk = 28,297/menit | 13,19% relatif | Ya |

Metode: mask teks RGB minimum >215, tinggi tinta tanpa bayangan; angka dari puncak sampai garis dasar. X-height memakai median tinggi o/u/r (61/60/60 px), bukan ascender h. Ambang 200/215/230 memberi tinggi angka sama.
Kepala ditandai manual dari puncak rambut sampai dagu/janggut; skrip menghitung proporsinya. Pusat teks memakai kotak tinta seluruh frasa. Warna memakai median bidang dinding polos.
Cut: beda absolut rerata grayscale ROI atas, diperkecil 180×176, ambang >20; kandidat minimum 28,69, perubahan non-cut maksimum 14,63. Sembilan pasangan sebelum/sesudah diperiksa visual.
Cut pada f001,045,111,172,234,257,389,394,428; f001 memang berganti sudut setelah satu frame awal. Skrip dan bukti tersimpan di periksa_scripts/ukur.py, hasil.json, bukti_cut.jpg, bukti_kepala.jpg.

**Terlihat tetapi tidak tertulis**
- 76-k1-wajah-warna-caption.jpg dan 76-k6-warna-kembali.jpg: kartu cetak hitam berbingkai putih memenuhi meja depan secara diagonal; bagian terdekat kamera buram.
- 76-k4-closeup-abu.jpg: tangan yang memberi gestur membesar dan buram di kanan bawah, menjadi lapisan depan selain wajah, latar, dan teks.
- 76-k1-wajah-warna-caption.jpg dan 76-k5-statistik-angka.jpg: dinding tersusun sebagai panel persegi panjang dengan garis sambungan gelap horizontal dan vertikal.

**Usul koreksi angka**
Tidak ada angka yang tidak cocok menurut toleransi yang ditetapkan.
