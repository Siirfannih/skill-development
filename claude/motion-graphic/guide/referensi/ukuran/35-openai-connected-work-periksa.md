PUTUSAN: PERBAIKI
Klaim cocok: 6/6. Kelengkapan belum penuh pada “Diambil untuk” dan “Cek kemiripan”.

## Kelengkapan
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading wajib sama dengan template | Ya | Semua heading tetap ada; tambahan “Proporsi terukur” sesuai permintaan. |
| 1. Warna & tekstur spesifik | Ya | Hex per babak, tekstur kertas, pengecualian merah. |
| 2. Teks spesifik | Ya | Tinggi, rasio, posisi, bobot dan pergantian kata. |
| 3. Ritme spesifik | Ya | 21,2 pergantian/menit, median shot 1,9 dtk. |
| 4. B-roll / footage spesifik | Ya | Pantai untuk prompt, pinus berkabut untuk editor, bunga bergerak. |
| 5. Motion graphic spesifik | Ya | Enam cabang, skala UI, jumlah kartu dan lapisan. |
| 6. Kamera & transisi spesifik | Ya | Arah, laju per 0,2 dtk dan objek penghubung transisi. |
| 7. SFX spesifik | Ya | Jenis bunyi, onset, kepadatan dan level. |
| 8. Musik spesifik | Ya | Genre, ±108 bpm, RMS dan LUFS. |
| Proporsi terukur: tabel per jenis adegan | Ya | Sembilan jenis adegan. |
| Ada 6–8 frame kunci | Ya | Delapan JPEG, k1–k8, masing-masing 1080×608. |
| “Diambil untuk” sesuai nama dan paling rinci | Tidak | Nama “IG Dcn6EINyzaa” konsisten dengan sumber; kamera/transisi yang ditunjuk bukan bagian paling rinci: 135 kata, dibanding Teks 210 dan Motion graphic 205. |
| “Cek kemiripan” dapat dicek dari still | Tidak | Butir terakhir mensyaratkan gerak ≥0,5 %/0,2 dtk serta ketiadaan cut keras; memerlukan urutan bertempo/video, bukan still tunggal. |
| Tidak ada aturan lama durasi tampil teks | Ya | Tidak menetapkan berapa detik teks wajib tampil; waktu shot/transisi bukan aturan durasi teks. |

## Ukur ulang
Sumber ukur: video asli 1280×720; frame dicocokkan ke JPEG keyframe dengan galat citra terkecil. Kotak memakai (x0,y0,x1,y1), batas kanan/bawah eksklusif.
Kartu tidak mendefinisikan baseline: tinggi dihitung dari seluruh tinta huruf termasuk ekor g/y, tanpa halo blur; putih RGB >100, biru B >55 dan dominan. Rasio memakai definisi tinggi yang sama.
Cincin: batas luar warna biru tanpa bayangan; prompt: rentang tepi kapsul terdeteksi; editor: tepi jendela tanpa bayangan; warna: median RGB area kosong.
| Klaim | Nilai di kartu | Frame + kotak piksel sumber | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi “thoughts” | 8,2 % tinggi | 35-k1-teks-gelap, 2,500 dtk; (516,325,740,382) | 57 px = 7,92 % | 3,46 % relatif | Ya |
| Rasio tinggi “thoughts” / “too many” | 1,7× | k1; (516,325,740,382) / (364,345,508,378) | 57/33 = 1,73× | 1,60 % relatif | Ya |
| Diameter luar cincin | 79 % tinggi | 35-k3-cincin-zoom, 8,500 dtk; (356,74,922,646) | 572 px = 79,44 % | 0,56 % relatif | Ya |
| Lebar kotak prompt | 67 % lebar | 35-k4-prompt-alam, 12,033 dtk; (210,321,1066,382), tepi terdeteksi | 856 px = 66,88 % | 0,19 % relatif | Ya |
| Lebar editor saat jauh | 65 % lebar | 35-k6-kode-hutan, 16,500 dtk; (225,114,1057,606) | 832 px = 65,00 % | 0,00 % relatif | Ya |
| Warna latar gelap | #020305 | k1; (0,0,250,200) | #020305 | ΔRGB = (0,0,0) | Ya |
Toleransi: ukuran ≤15 % relatif; warna ≤20 tiap kanal. Angka audio/ritme tidak diuji dalam enam klaim ini.

## Terlihat tetapi tidak tertulis
- 35-k3-cincin-zoom.jpg: bagian dalam cincin berupa bidang hitam besar, dengan “connected.” putih; bukan hanya tepian biru di atas latar putih.
- 35-k4-prompt-alam.jpg: ranting berdaun masuk dari sudut kiri atas, membentuk lapisan depan dan membingkai langit.
- 35-k6-kode-hutan.jpg: jendela editor bersudut membulat, memiliki tiga tombol merah–kuning–hijau di kiri atas, bilah menu dan status bawah.

## Usul koreksi angka
Tidak ada: keenam angka yang diuji cocok dalam toleransi.

Skrip reproduksi: `periksa_scripts/ukur.py`; frame sumber, pencocokan dan hasil numerik tersimpan di folder yang sama. Kartu tidak diubah.
