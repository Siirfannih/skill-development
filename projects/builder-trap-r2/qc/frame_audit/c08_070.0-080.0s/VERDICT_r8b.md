# VERDICT c08_070.0-080.0s · audit r8b (pemeriksa: subagen Sonnet, paralel, 15 Nov)

2286-2299 | 76.20-76.63 | visual/teks | Latar modal "New thread" digelapkan jadi abu-abu. Teks narasi "apa yang" (abu-abu muda, kata yang belum diucap) hampir menyatu dengan latar dan nyaris tak terbaca. Teks baru jelas terbaca setelah f2300, ketika latar terang. Kata "apa" diucapkan di 76.09 tetapi baru samar-samar muncul di sekitar f2289 (76.3). | Pakai warna teks lebih gelap atau beri kontras tetap selama latar redup. Atau munculkan "apa yang" di f2300 dan hilangkan redup pada kata pertama. Kata "apa" juga sebaiknya muncul sedekat mungkin ke 76.09.

Catatan:
- 76.20 | f2286 | audio | Potong adegan dari wajah ke composer tidak punya cue potong_adegan. Cue terdekat adalah Enter (klik_ui) di 76.44, selisih +0.24 dtk, masih dalam ±0,3 tetapi perannya klik, bukan potong. Usul: tambah cue potong_adegan di ~76.20, atau terima Enter sebagai penanda potong.
- 76.44 / 76.61 | f2293 / f2299 | audio | Enter dan pop up hanya berjarak 0,17 dtk sehingga nyaris menumpuk. Posisinya benar: kursor sudah di tombol Post sejak f2290, dan latar berubah terang tepat di f2299. Usul: kalau terdengar rapat, geser Enter ~0,1 dtk lebih awal.
- 77.31 | f2319 | audio | Glass pop jatuh 0,06 dtk sebelum gulir feed mulai (f2321) dan ~0,2 dtk sebelum post kedua muncul (f2325, 77.5). Masih dalam toleransi, terdengar sedikit mendahului.
- 78.52 | f2356 | audio | Pop up pas di awal gulir ke post ketiga (f2357), post muncul f2362 (78.73). Dalam toleransi.
- 75.2-76.1 | f2256-2285 | visual | Crop wajah dekat (potongan di f2253 disengaja): bagian atas rambut dan pipi kiri terpotong di tepi. Mungkin ada pergeseran wajah dan skala kecil antara f2279 dan f2280 (wajah lebih ke tengah dan lebih besar) yang tidak ditandai otomatis. Dianggap gerak kepala atau dorong kamera.
- 71.8-72.2 | f2154-2167 | teks | Tulisan tangan "titik awal" terlambat ~0,1-0,3 dtk dari kata (titik 71.62, awal 71.90), tetapi wajar untuk animasi menulis. Cue marker 71.67 pas dengan goresan lingkaran awal (f2150-2152).
- 77.4-77.5 | f2322-2324 | transisi | Teks lama "apa yang aku alami." (blur) dan teks baru "apa" (samar) tampak bersamaan ~0,1 dtk. Itu crossfade terblur, bukan dua teks tajam.
- 76.6-77.2 | f2299-2310 | transisi | Crossfade composer ke feed memperlihatkan gambar hantu ganda (foto wajah dan tangan) di f2302-2304. Singkat dan selaras dengan momen "post terbit". Dibiarkan.
- 70.27 | f2108 | teks | Kemungkinan satu frame tanpa teks antara "dan sekarang aku" dan "memutuskan". Tidak mengganggu.
- 77.5-80.0 | f2326-2399 | visual | Tahan hampir statis ±1 dtk di akhir (f2370-2399) sebelum potong sengaja di f2400. Dapat diterima.

Putusan tanda otomatis:
- f2168 (72.27) LOMPAT 158.6: potong adegan dari papan ke wajah, cue Katapertama 72.27 tepat. Sah, tidak masalah.
- f2213 (73.77) LOMPAT 148.6: potong kembali dari wajah ke papan, cue Cutcontrastransision 73.77 tepat. Sah, tidak masalah.
- f2286 (76.20) LOMPAT 108.7: potong dari wajah ke composer. Visual sah, tetapi tidak punya cue potong_adegan sendiri (lihat catatan). Terkait masalah keterbacaan teks di 76.2-76.6.
- f2299 (76.63) LOMPAT 29.3: kecerahan latar naik tiba-tiba saat modal selesai dikirim. Bersamaan dengan pop up 76.61, jadi sengaja. Sah, tidak masalah.

PUTUSAN: GAGAL
