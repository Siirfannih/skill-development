PUTUSAN: PERBAIKI

Kelengkapan
| Butir | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | Semua heading wajib ada; tambahan Proporsi terukur tersedia. |
| 1. Warna & tekstur spesifik | Ya | Hex latar/shape, flat, blur gerak. |
| 2. Teks spesifik | Ya | Tinggi, posisi, rasio antar-adegan, arah masuk. |
| 3. Ritme spesifik | Ya | Cut/menit, median shot, pengelompokan cut. |
| 4. B-roll / footage spesifik | Ya | Foto 10–27 % W, masker lingkaran. |
| 5. Motion graphic spesifik | Ya | Fungsi shape, ukuran subjek, jumlah lapis. |
| 6. Kamera & transisi spesifik | Ya | Faktor zoom, pan, wipe, match maskot. |
| 7. SFX spesifik | Ya | Pop, riser, onset, level relatif terhadap musik. |
| 8. Musik spesifik | Ya | Genre, BPM, LUFS, perubahan per babak. |
| Proporsi terukur: tabel per jenis adegan | Ya | Delapan jenis adegan. |
| Ada 6–8 frame kunci | Ya | Delapan JPEG: k1–k8. |
| Diambil untuk sesuai nama file dan paling rinci | Ya | TEKS-SFX-CUT disebut; teks, SFX, ritme paling rinci; varian ssspin dibedakan. |
| Cek kemiripan bisa dicek dari still | Tidak | Dua butir terakhir membutuhkan urutan video/audio: cut, pop, level musik, riser. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Durasi tercatat sebagai pengamatan gerak/shot, bukan aturan lama tampil teks. |

Ukur ulang — 4 dari 6 cocok.
Semua frame 736×414; kotak (x0,y0,x1,y1) memakai batas akhir eksklusif. H = tinggi frame, W = lebar frame.
Tinggi bbox mengikuti kartu: ascender/descender tercakup; pusat = pusat bbox, skala shape = bagian yang terlihat.
| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi “What” | 19–20 % H | 07-k1-pertanyaan-per-kata.jpg (31,171,313,254) | 83 px = 20,05 % H | 0,24 % relatif | Ya |
| Pusat “Mission” | x 50 %, y 50 % | 07-k2-kata-foto-tanda-baca.jpg (302,193,433,221) | (367,5;207) px = (49,93 %;50,00 %) | x 0,07; y 0,00 poin persen | Ya |
| Shape biru kiri Feedback | 37 % W × 100 % H | 07-k3-shape-berfungsi-kata.jpg (0,0,272,414) | 272×414 px = 36,96 % W × 100 % H | W 0,12 %; H 0,00 % relatif | Ya |
| Tinggi item roda “AI agents” | 6–8 % H | 07-k4-roda-daftar.jpg (251,176,464,218) | 42 px = 10,14 % H | 26,81 % relatif | Tidak |
| Tinggi judul “Good Afternoon, Anna” | 4,8 % H | 07-k5-ui-dashboard.jpg (151,106,365,124) | 18 px = 4,35 % H | 9,42 % relatif | Ya |
| Lebar bubble pertanyaan utama | 39 % W | 07-k6-chat-maskot.jpg (46,141,392,200) | 346 px = 47,01 % W | 20,54 % relatif | Tidak |

Metode: segmentasi RGB dan komponen terhubung; kotak beranotasi, ambang, ROI, metadata dan hasil ada di periksa_scripts/ukur.py serta hasil.json.
Selisih rentang dihitung terhadap batas terdekat; cocok ukuran ≤15 %, posisi ≤5 poin persen. Variasi ambang: item roda 41–42 px; bubble 344–349 px; kedua ketidakcocokan tetap melewati toleransi.
Video sumber terverifikasi 47,345 dtk, 1420 frame, 30 fps; kartu menyebutnya varian berbeda dari film Shapes 67 dtk. Enam ukuran di atas berasal dari JPEG k1–k6, bukan atribusi ke video varian.

Terlihat tetapi tidak tertulis
- 07-k2-kata-foto-tanda-baca.jpg: foto persegi panjang bertepi siku menumpang di depan shape biru; objek saling menutupi.
- 07-k5-ui-dashboard.jpg: delapan ikon kategori dalam kotak gelap bersudut bulat berjajar di bawah widget, masing-masing dengan label kecil di bawahnya.
- 07-k6-chat-maskot.jpg: maskot berwarna krem, kedua pipi merah bulat, wajah digambar dengan garis hitam tipis dan alis tidak simetris.

Usul koreksi angka
- Tinggi item roda “AI agents” pada k4: 10,14 % H (42 px), menggantikan rentang 6–8 % H untuk item yang diukur ini.
- Lebar bubble utama pada k6: 47,01 % W (346 px), menggantikan 39 % W.
