PUTUSAN: PERBAIKI

## Kelengkapan
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading mengikuti template | Ya | Seluruh heading wajib ada; tambahan Proporsi terukur sesuai permintaan. |
| 1. Warna & tekstur spesifik | Ya | Hex per babak, luma, tekstur render. |
| 2. Teks spesifik | Ya | Tinggi digit, rasio, posisi judul, jenis huruf. |
| 3. Ritme spesifik | Ya | Cut/menit, median shot, pembagian babak. |
| 4. B-roll / footage spesifik | Ya | Render 3D low-poly; pemetaan benda ke makna. |
| 5. Motion graphic spesifik | Ya | Rantai kertas–pesawat, skala dan lapisan. |
| 6. Kamera & transisi spesifik | Ya | Push, rotasi, daftar transisi lewat benda. |
| 7. SFX spesifik | Ya | Swish, tick-tock, ding dan waktu kejadian. |
| 8. Musik spesifik | Ya | Instrumen, BPM, babak dan LUFS. |
| Proporsi terukur: tabel per jenis adegan | Ya | Delapan jenis adegan, k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPG tersedia. |
| Diambil untuk sesuai file dan menjadi bagian paling rinci | Tidak | File asli benar; fokus menunjuk 5/6/2, tetapi §5 hanya 4 butir (138 kata), §2 lebih rinci: 6 butir (171 kata). |
| Cek kemiripan dapat dicek dari still | Tidak | Pergantian lewat benda memerlukan gerak; musik dan masuknya beat memerlukan audio. |
| Tidak ada aturan lama tampil teks dalam detik | Tidak | §2 mencatat masuk judul 31,5–33 dtk, perpindahan 36–37 dtk, keluar 41,5 dtk. |

## Ukur ulang
Koordinat pada JPG 1080×608, asal kiri-atas; (x0,y0,x1,y1), batas akhir eksklusif. Ukuran dibanding relatif terhadap klaim; rentang yang mencakup hasil berselisih 0. Posisi dibanding dalam poin persen (pp).
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi digit tahun | 35–38% tinggi | 20-k2-kalender-tahun.jpg: (32,42,220,271); (229,42,422,273); (7,287,218,501); (228,285,423,506) | Median 225 px = 37,01%; per digit 35,20–37,99% | 0; masuk rentang | Ya |
| Rasio digit tahun : tanggal | ±8,5× | 20-k2-kalender-tahun.jpg: kotak tahun di atas; tanggal (639,194,645,220), (698,194,715,219) | Tinggi tanggal median 25,5 px; 225/25,5 = 8,82× | +3,81% relatif | Ya |
| Skala jam | 40% lebar × 70% tinggi | 20-k4-jam.jpg: (323,87,757,517) | 434×430 px = 40,19×70,72% | +0,46% / +1,03% relatif | Ya |
| Lebar daun pintu | ±20% lebar | 20-k5-pintu.jpg: (406,225,703,540) | 297 px = 27,50% lebar; kusen dikecualikan | +37,50% relatif | Tidak |
| Pusat blok judul | (25,41)% | 20-k8-judul-script.jpg: (95,182,449,287) | (25,19;38,57)% | x +0,19 pp; y −2,43 pp | Ya |
| Warna kertas kalender | ±#E4E4E4 | 20-k2-kalender-tahun.jpg: (450,300,530,500) | Median RGB (244,244,244) = #F4F4F4 | RGB (+16,+16,+16), tiap kanal ≤20 | Ya |

Hasil: **5 dari 6 klaim cocok**. Kelengkapan belum penuh, sehingga putusan PERBAIKI.
Metode: segmentasi piksel/komponen terhubung; tinggi angka dari puncak sampai batas bawah angka (angka tanpa descender), median antardigit. Pusat judul memakai kotak huruf saja, tanpa kredit. Lebar pintu dari gradien tepi vertikal pada pita y=225–540.
Jam memakai cakram terang, tanpa bayangan; sampel warna mengambil kertas kosong pada pencahayaan frame. Skrip, hasil mentah dan kotak visual: `periksa_scripts/ukur.py`, `hasil.json`, `kotak-ukur.jpg`.

## Terlihat tetapi tidak tertulis
- 20-k1-kota-jendela.jpg: bukaan jendela membentuk trapesium perspektif; ambang bawah menanjak ke kanan.
- 20-k4-jam.jpg: wajah jam tanpa angka, hanya penanda garis; jarum detik merah tipis berbeda dari jarum hitam.
- 20-k5-pintu.jpg: daun pintu berpanel persegi panjang mendatar, dengan gagang hitam di sisi kiri.
- 20-k7-pesawat.jpg: pesawat dilihat dari bawah, hidung menuju kanan-atas dan badan menyilang diagonal.

## Usul koreksi angka
- Lebar daun pintu pada k5: **27,5% lebar frame**, menggantikan angka ±20% (tidak termasuk kusen).
