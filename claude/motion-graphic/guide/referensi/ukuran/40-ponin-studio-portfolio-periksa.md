PUTUSAN: PERBAIKI

Audit independen: 5 dari 6 klaim cocok; kelengkapan belum penuh.

| Kelengkapan | Ya/tidak | Bukti |
|---|---|---|
| Heading wajib sama dengan template | Ya | Semua heading wajib ada; Proporsi terukur merupakan tambahan. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | 1 hex/grain; 2 ukuran/posisi; 3 cut; 4 jenis footage; 5 lapisan; 6 kamera; 7 onset; 8 bpm/LUFS. |
| Proporsi terukur, tabel per jenis adegan | Ya | Delapan jenis adegan, k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPG di keyframes/. |
| Diambil untuk sesuai nama file; bagian terkait paling rinci | Ya | Nama asal yang dicantumkan: IG DfKmIL6C5vq, tanpa petunjuk bagian khusus; pilihan teks dibahas paling rinci. |
| Cek kemiripan bisa diperiksa dari still | Tidak | Butir “Material berganti tiap 1–3 dtk” dan “penutup lega ≥ 5 dtk” memerlukan video. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Angka waktu menjelaskan ritme/transisi, bukan kewajiban durasi teks. |

Ukur ulang pada JPG asli 720×1280; kotak (x0,y0,x1,y1), batas kanan/bawah eksklusif. Tinggi = rentang tinta glif, termasuk descender; titik oranye tidak masuk tinggi huruf. Posisi = pusat kotak tinta. Warna = median inti glif setelah erosi 2 piksel.
Toleransi: ukuran relatif ≤15%; posisi ≤5 poin persen; tiap kanal RGB ≤20. Untuk rentang, selisih nol bila hasil berada di dalamnya.
Frame: k1 = 40-k1-krem-kalimat.jpg; k3 = 40-k3-ruang-3d.jpg; k4 = 40-k4-ui-ponsel.jpg; k5 = 40-k5-tipografi-raksasa.jpg.

| Klaim | Nilai di kartu | Frame + kotak piksel | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi kalimat pembuka | 3,2% H | k1 (83,619,650,661) | 42 px = 3,281% H | 2,54% relatif | Ya |
| Tinggi “We make it” | 5,8% H | k4 (125,603,595,677) | 74 px = 5,781% H | 0,32% relatif | Ya |
| Rasio huruf raksasa / kalimat tajam | 2,2–3,2× | k5 raksasa (0,336,710,548); tajam (72,602,648,678) | 212/76 = 2,789× | 0; dalam rentang | Ya |
| Pusat vertikal teks ruang 3D | y 63% | k3 (150,794,567,829) | y 811,5 px = 63,398% H | +0,398 poin persen | Ya |
| Lebar kartu UI | 55–65% W | k4 (151,885,566,916), irisan badan kartu tajam bawah | 415 px = 57,639% W | 0; dalam rentang | Ya |
| Warna teks | #2E2D2C = RGB(46,45,44) | k4 (125,603,595,677), inti glif | #020000 = RGB(2,0,0) | ΔRGB absolut (44,45,44) | Tidak |

Skrip dan bukti: periksa_scripts/ukur.py, hasil.json, kotak-ukur.jpg. Frame terdekat video sumber: k1 1,000 dtk; k3 5,526 dtk; k4 9,000 dtk; k5 9,947 dtk. Kotak kartu mengukur satu kartu tajam yang batas sampingnya terlihat, bukan seluruh tumpukan.

## Terlihat tetapi tidak tertulis
- 40-k2-terowongan-bingkai.jpg: pena/stilus tipis berdiri di tepi kanan bawah, terpisah dari perangkat besar yang melayang.
- 40-k3-ruang-3d.jpg: kursi oranye besar menjadi lapisan depan di kanan bawah dan terpotong tepi kanan frame.
- 40-k3-ruang-3d.jpg: jam dinding analog dan banyak kertas tempel kuning/oranye mengisi dinding di atas monitor.

## Usul koreksi angka
- Warna teks pada k4: #2E2D2C → #020000 (median inti glif pada still ini).
