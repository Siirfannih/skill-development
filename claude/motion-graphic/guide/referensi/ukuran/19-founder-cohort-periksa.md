PUTUSAN: PERBAIKI

Pemeriksaan independen: 5 dari 6 klaim cocok; kelengkapan belum penuh. Kartu tidak diubah.

| Kelengkapan | Ya/tidak | Bukti |
|---|---|---|
| Heading mengikuti template | Ya | PENGIKAT, TEKNIK, bagian 1–8, Cek kemiripan, Catatan pakai; Proporsi ditambahkan sesuai kewajiban. |
| Delapan bagian berisi pengamatan spesifik | Ya | 1: hex; 2: ukuran/posisi; 3: cut; 4: jenis footage; 5: skala/lapisan; 6: zoom/transisi; 7: onset; 8: genre/mix. |
| Proporsi terukur bertabel per jenis adegan | Ya | Delapan jenis adegan, k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPEG di keyframes/. |
| Diambil untuk sesuai nama file | Ya | Nama sumber tepat; nama tidak memberi petunjuk bagian, dinyatakan secara terbuka. |
| Bagian Diambil untuk paling rinci | Ya | Bagian 5 dan 2 yang diprioritaskan merinci skala, lapisan, sorot wajah, ukuran dan posisi teks. |
| Cek kemiripan dapat diperiksa dari still | Tidak | “kata muncul per kata” serta transisi “1–5 frame” memerlukan urutan video. |
| Tidak ada aturan lama durasi tampil teks dalam detik | Ya | Detik dipakai untuk babak, shot, kamera dan audio; bukan aturan lama tampil teks. |

Ukur ulang: koordinat (x0,y0,x1,y1), batas kanan/bawah eksklusif. JPEG 1080×608; video 1276×718.
Teks: inti putih min(R,G,B) ≥220, komponen ≥4 piksel, tanpa halo; kapital dari puncak sampai dasar huruf, italic memakai tinggi penuh termasuk descender sesuai kolom kartu.
Rentang dinilai terhadap batas terdekat (0 bila di dalam); posisi memakai poin persen; toleransi ukuran/cut 15%, posisi 5 poin persen.
k1 = 19-k1-inset-foto-teks.jpg; k2 = 19-k2-sorot-wajah-kapital.jpg; k4 = 19-k4-lukisan-latar-putih.jpg.

| Klaim | Nilai di kartu | Frame + kotak | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi kapital | 11,6–13,2%H | k2: HE (157,309,249,383); BUILT (450,304,632,385); REDDIT (750,309,996,379) | 12,17%; 13,32%; 11,51%H | Maks. 0,93% relatif | Ya |
| Tinggi penuh italic inset | 6,1–6,3%H | k1: kiri (106,285,306,323); kanan (771,285,974,323) | Keduanya 38 px = 6,25%H | 0% terhadap rentang | Ya |
| Pusat vertikal blok kapital | y 56,5% | k2: (157,304,996,385) | y 56,66% | 0,16 poin persen | Ya |
| Skala kartu foto, termasuk bingkai | 36%W × 37%H | k1: (345,173,736,396) | 391×223 px = 36,20%W × 36,68%H | W 0,57%; H 0,87% relatif | Ya |
| Skala lukisan | 53%W × 50%H | k4: (262,128,841,432) | 579×304 px = 53,61%W × 50,00%H | W 1,15%; H 0% relatif | Ya |
| Cut per menit | 39 batas / 33,3 dtk ≈70/menit | Video sumber, f0–994; kotak tiap frame (0,0,1276,718); daftar batas di periksa_scripts/hasil.json | ≥50 batas / 33,1999 dtk = ≥90,36/menit | ≥29,09% relatif terhadap 70 | Tidak |

Hitungan cut adalah batas bawah: 50 pergantian komposisi/subjek diverifikasi dari pasangan frame; termasuk potret singkat, tanpa menghitung kata baru, glitch, inversi/flash mandiri atau zoom kontinu sebagai shot tambahan.
Satu rangkaian whip/flash menuju adegan baru dihitung satu pergantian. Batas bawah saja sudah melampaui toleransi; jumlah total tidak dipaksakan menjadi angka pasti.
Bukti: periksa_scripts/ukur.py, finalkan.py, hasil.json, kandidat-cut.jpg, batas-terpilih.jpg dan semua-potret-angkatan.jpg. Frame 554 memastikan potret kedua tidak terlewat di antara inversi dan potret berikutnya.

### Terlihat tetapi tidak tertulis
- 19-k1-inset-foto-teks.jpg: bingkai memiliki garis abu di sisi dalam dan bidang putih luar, memberi tepi bertingkat di sekeliling foto.
- 19-k4-lukisan-latar-putih.jpg: dua pria condong ke benda di meja; teks menutup wilayah tangan/benda tersebut, sementara kedua wajah tetap terbaca di atasnya.
- 19-k6-footage-caption.jpg: sosok tampak profil dari kiri menghadap kanan; monitor besar mendominasi kanan, laptop lebih kecil berada di bawah-tengah, membentuk susunan layar bertingkat.

### Usul koreksi angka
- Ritme: sedikitnya 50 batas shot, setara sedikitnya 90,36 cut/menit (50×60/33,1999); klaim 39 batas dan 70/menit terlalu rendah.
