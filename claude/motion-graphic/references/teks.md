# Teks di layar: posisi, keterbacaan, gerak

Dibuka saat mengatur teks layar (langkah 4-6 alur `SKILL.md`). Butir lama LANTAI A1-A9a dipadatkan di sini, tiap butir dengan alasannya; bunyi aslinya tetap di `LANTAI.md` (arsip). Sistem huruf (utama + huruf kedua bila ia punya peran dan frekuensi) diatur NEGATIF 1 dan tidak diulang di sini. Gerak teks per peran kalimat: `references/typography.md` §8a (tabel T dan G).

## Satu lapisan, hanya dari ucapan (A1, A3, A5)
- Semua ucapan tampil sebagai SATU lapisan tipografi kinetik. Tidak ada subtitle terpisah di pita bawah; pita hanya sah untuk label identitas non-ucapan yang muncul sekali. Alasan: dua lapisan teks berebut mata dan terbaca sebagai subtitle film, bukan desain.
- Teks hanya dari ucapan: tidak menambah kalimat atau angka yang tidak diucapkan (NEGATIF 6).
- Kata yang sudah jadi penekanan tidak diulang di lapisan atau tempat lain pada saat yang sama. Alasan: pengulangan terbaca sebagai salah ketik.

## Posisi (A2)
- Posisi lahir dari komposisi tiap shot: dekat subjek, di ruang kosong, atau menempel objek yang dirujuk. Tiga tampilan berturut-turut di pita yang sama tanpa alasan komposisi = gagal.
- Jarak teks ke subjek yang dirujuk paling jauh ±8 % tinggi frame, dan tidak lebih dekat ke tepi frame daripada ke subjek. Alasan: teks yang jauh dari subjeknya terbaca sebagai bagian terpisah. Cek: `tabrakan_cek.py`, `cek_komposisi.py`.

## Ukuran dan bentuk blok (A4, A6, A8)
- Maksimal 2 baris dan 1-3 kata per tampil; blok seimbang (baris terpendek ≥ 85 % baris terpanjang), tidak terpotong tepi, tidak ada kata yatim. Tumpuk kata (satu kata per baris) boleh. Tanda tanya tampil saat pembicara bertanya. Alasan: di HP lebih dari tiga kata tidak terbaca sebelum hilang.
- Satu baris satu ukuran dan satu sistem penekanan; kata yang dibesarkan pindah ke barisnya sendiri. Dua sistem penekanan tidak dicampur dalam satu frasa.
- Terbaca berurutan dan cukup lama: satu arah baca, tiap frasa tampil sampai selesai diucapkan.

## Keterbacaan (butir lama A7, bagian non-huruf)
- Kontras ≥ 4,5 : 1, tanpa halo di belakang teks; ukuran berhubungan dengan subjek; tidak menyentuh tepi. Uji lebar 360 px: kata sambung ≥ 56 px @1080, dan teks kunci tidak duduk di 8 % bawah frame (area UI platform).
- Teks biru di latar gelap atau navy gagal kontras (±3,6 : 1). Di latar gelap, penekanan lewat putih penuh vs redup, ketebalan, skala, atau kapital.
- Font termuat dari file (`fonts/README.md`), tidak jatuh ke font cadangan sistem; build gagal bila font tidak ditemukan.

## Kotak dan gerak teks (A9, A9a)
- Kotak di belakang teks hanya bila kontras gagal, bukan hiasan; narasi kinetik tanpa kotak atau shape.
- Gerak teks dipilih dari peran kalimat, bukan fade untuk semua. Isi teks = ucapan (waktu dan durasi dihitung `scripts/lego/teks_plan.py`). Tiap blok diberi peran (R1 narasi, R2 kata kunci, R3 klaim, R4 label/daftar, R5 UI, R6 hero, sub), satu gerak T dari tabel `typography.md` §8a, gaya G, posisi, dan alasan.
- Satu peran = satu gerak di seluruh video; tiap 15 dtk ≥ 3 gerak berbeda dan ≥ 1 penekanan, kecuali adegan tenang yang alasannya ditulis. Fade hanya untuk sub-line kecil. Efek pada huruf adalah gaya terdefinisi (mis. G8 kilat cahaya), bukan footage atau tekstur yang dimasukkan ke huruf. Cek: `scripts/lego/kt_check.py teks.json` PASS.

Dilihat per lapis: teks adalah L2 (`scripts/lihat.py`); tabrakan dengan objek diperiksa `scripts/gate/tabrakan_cek.py`.
