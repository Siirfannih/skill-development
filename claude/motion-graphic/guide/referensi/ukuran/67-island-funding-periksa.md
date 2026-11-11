PUTUSAN: LAYAK
Kelengkapan penuh; 5 dari 6 klaim cocok. Kartu tidak diubah.

## Kelengkapan
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading sesuai template | Ya | Semua heading wajib ada dan urut; tambahan Proporsi terukur. |
| 1. Warna & tekstur spesifik | Ya | Hex dasar, inset 33 px, radius ±17 px. |
| 2. Teks spesifik | Ya | Tinggi angka/label, posisi, counter, lima baris ulang. |
| 3. Ritme spesifik | Ya | 7 cut, 19,9/menit, median 1,5 dtk. |
| 4. B-roll / footage spesifik | Ya | Padang rumput muncul tiga kali; meja kosong, grade sejuk. |
| 5. Motion graphic spesifik | Ya | Counter, tumpukan foto, grid tahun, kolom statistik; ukuran dan blur. |
| 6. Kamera & transisi spesifik | Ya | Faktor skala, perpindahan panel, morph 95→55 % lebar. |
| 7. SFX spesifik | Ya | 117 event dan waktu whoosh/riser/stab. |
| 8. Musik spesifik | Ya | 108–109 bpm, −14 LUFS, −2,9 dBTP. |
| Proporsi terukur + tabel per adegan | Ya | Sembilan jenis, termasuk logo akhir. |
| 6–8 frame kunci | Ya | Delapan berkas JPG, k1–k8. |
| Diambil untuk sesuai nama dan paling rinci | Ya | Nama life.at.island tanpa petunjuk teknik; fokus teks/layout dijelaskan paling rinci pada 2, 5, 6 dan tabel. |
| Cek kemiripan dapat dicek dari still | Ya | Delapan butir tentang bentuk, warna, ukuran, font, posisi, footage, blur. |
| Tidak ada aturan lama durasi tampil teks | Ya | Waktu yang dicatat merupakan pengamatan babak/transisi, bukan ketentuan durasi baca teks. |

## Ukur ulang
Skrip: `periksa_scripts/ukur.py`; data: `periksa_scripts/hasil.json`. Semua kotak (x0,y0,x1,y1) memakai sumber 1276×720, batas akhir eksklusif; bukan koordinat JPG 1080×610.
k1–k6 cocok dengan sumber pada 0,50; 2,50; 4,00; 5,50; 7,00; 8,50 dtk. Tinggi cap/digit diukur puncak sampai dasar; serif mengikuti ascender+descender. Ambang setengah kontras membuang pinggir blur.
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Warna bingkai gelap | #061613 | 67-k1-angka-raksasa.jpg (10,100,25,600) | Median RGB (4,19,19), #041313 | Kanal R/G/B: 2/3/0 | Ya |
| Rasio digit terhadap label | ±9×; label 1,9 % | 67-k2-tumpukan-foto.jpg digit (571,323,663,446); cap I label (521,268,525,296) | 123/28 = 4,39×; label 3,89 % | Rasio 51,2 % relatif; label 104,7 % relatif | Tidak |
| Tinggi cap Series F | 19,7 % | 67-k3-teks-ulang-strip.jpg cap S (357,290,457,423) | 133 px = 18,47 % | 6,23 % relatif | Ya |
| Lebar kartu grafik | 55 % | 67-k4-grafik-angka.jpg (34,34,738,686), tepi di y=200 | 704 px = 55,17 % | 0,31 % relatif | Ya |
| Pusat vertikal blok teks | y 46–55 % | 67-k5-kartu-gelap.jpg (328,330,940,410), tanpa logo | y=370 px = 51,39 % | 0 pp di luar rentang | Ya |
| Tinggi serif future, asc+desc | 28,7 % | 67-k6-serif-langit.jpg (471,268,993,475) | 207 px = 28,75 % | 0,17 % relatif | Ya |
Ambang: ukuran/rasio ≤15 % relatif; posisi ≤5 pp dari rentang; warna tiap kanal ≤20. Hierarki k2 dihitung satu klaim; tinggi label adalah penyebutnya.

## Terlihat tetapi tidak tertulis
- 67-k3-teks-ulang-strip.jpg: teks baris tengah putih di atas footage, sedangkan baris lain hitam di atas putih; pergantian warna teks antarbaris belum dicatat.
- 67-k4-grafik-angka.jpg: grid memakai garis putus-putus, bukan garis kontinu; kartu hanya menyebut grid tipis.
- 67-k6-serif-langit.jpg: future putih seperti The; warna serif pada frame ini belum dicatat secara tepat, DNA justru menyebut serif italic hijau.

## Usul koreksi angka
- k2: rasio digit/label ±9× → 4,39×; tinggi cap label 1,9 % → 3,89 % (28/720). Tidak memasukkan simbol logo atau descender g ke tinggi cap label.
