PUTUSAN: PERBAIKI

Kelengkapan: 6/7 butir terpenuhi. Ukur ulang: 5/6 klaim cocok.

| Kelengkapan | Ya/tidak | Bukti |
|---|---|---|
| Heading sama dengan template | Ya | PENGIKAT, TEKNIK, bagian 1–8, Cek kemiripan, Catatan pakai sesuai. |
| Delapan bagian berisi angka/pengamatan spesifik | Ya | Ada hex, proporsi teks, shot, jenis footage, lapisan, gerak kamera, onset SFX, dan level musik. |
| Proporsi terukur: tabel per jenis adegan | Ya | Delapan baris jenis adegan k1–k8. |
| Ada 6–8 frame kunci | Ya | Delapan JPG di keyframes/. |
| Diambil untuk sesuai nama file dan paling rinci | Ya | Storytellingwithfootage.mp4; struktur cerita dijabarkan menjadi delapan babak beserta fungsi dan perlakuan footage. |
| Cek kemiripan bisa dicek dari still | Tidak | Butir twist memerlukan pergantian musik, urutan open loop, dan CTA di akhir; still tidak membuktikan musik/urutan. |
| Tidak ada aturan lama tampil teks dalam detik | Ya | Penanda waktu mencatat babak sumber; tidak menetapkan durasi wajib tiap teks. |

Semua frame ukur berukuran 1080×608. Kotak (x0,y0,x1,y1), batas kanan/bawah eksklusif; koordinat dihitung dari kiri atas.
Sumber diverifikasi dengan ffprobe: 1276×718, 24 fps, 46,291667 detik; ukuran dinormalisasi terhadap tinggi/lebar still.
Metode: kontur Canny untuk judul; segmentasi merah/putih untuk teks; komponen bingkai putih untuk foto; median RGB untuk latar.
Rasio k4 memakai puncak huruf sampai garis dasar: delusional 60 px; ascender h pada enough 29 px, tanpa ekor g. Ambang putih 160–200 diperiksa ulang.
Toleransi: ukuran/rasio ≤15% relatif; posisi ≤5 poin persen per sumbu; warna ≤20 tiap kanal RGB.

| Klaim | Nilai di kartu | Frame + kotak piksel | Hasil ukur | Selisih | Cocok? |
|---|---|---|---|---|---|
| Tinggi kata judul | 52% tinggi | 55-k2-kartu-judul.jpg (87,103,993,505) | 402 px = 66,12% | 27,15% relatif | Tidak |
| Tinggi pita talent | 8,9% tinggi | 55-k3-arsip-teks-kinetik.jpg (548,276,736,330) | 54 px = 8,88% | 0,21% relatif | Ya |
| Pusat blok teks kinetik | (50%,50%) | 55-k3-arsip-teks-kinetik.jpg (329,276,736,331) | (49,31%,49,92%) | (0,69;0,08) poin persen | Ya |
| Rasio delusional/enough | 2,3× | 55-k4-wawancara-teks-tumpuk.jpg (159,149,513,209); h: (312,214,330,243) | 60/29 = 2,07× | 10,04% relatif | Ya |
| Tinggi satu foto alas potong | 86% tinggi | 55-k5-foto-alas-potong.jpg (358,47,744,573) | 526 px = 86,51% | 0,60% relatif | Ya |
| Warna latar putih | #FDFBFE | 55-k1-arsip-bingkai-putih.jpg (0,0,1080,80) | Median #FBF9FC | RGB (2,2,2) | Ya |

Terlihat tetapi tidak tertulis:
- 55-k3-arsip-teks-kinetik.jpg dan 55-k4-wawancara-teks-tumpuk.jpg: pola titik/kisi rapat yang teratur terlihat pada wajah dan teks, berbeda dari grain acak.
- 55-k4-wawancara-teks-tumpuk.jpg: lengan mikrofon diagonal memenuhi kiri bawah; mikrofon besar berada di depan dada subjek.
- 55-k5-foto-alas-potong.jpg: cetakan foto sedikit miring, dengan tepi atas naik ke kanan.
- 55-k6-dinding-foto.jpg: foto atas dan foto samping terpotong batas frame, sedangkan foto tengah terlihat utuh.

Usul koreksi angka:
- Tinggi kata judul pada k2: 66,1% tinggi frame (402/608 px), menggantikan angka 52%.

Skrip reproduksi: periksa_scripts/ukur_independen.py; hasil mentah: periksa_scripts/hasil.json.
