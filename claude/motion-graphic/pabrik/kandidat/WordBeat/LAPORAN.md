# Laporan uji WordBeat

Spec: `07-T1` (tipografi). Lulus = nol dosa (skrip + vision + jangkar) DAN metrik keras dalam ambang (`uji.py` AMBANG).

## Putaran 1: GAGAL

Dosa terpicu: a, d, f, j

Temuan:
- DOSA a: banding.py F1 gradien ragu-ragu di frame [112]
- DOSA d: fokus < 20 % dan pusat dalam ±12 % tengah pada 46 sampel berturut (stride 2 frame)
- DOSA f: vision: Baris 1: kata 'kecil' merah buram dan lingkaran merah tepinya lembut, padahal kata itu sudah selesai masuk dan harus dibaca. Baris 2: 'besar' dan 'hasil' sudah tajam, jadi blur hanya berlaku di baris 1. Di baris 4 teks sudah terlalu kecil untuk dibaca (±0,02 tinggi frame).
- DOSA j: f12: 'kecil' x 'kecil'; f40: 'besar' x 'besar'; f70: 'besar' x 'besar'; f112: 'besar' x 'besar'

| Metrik | Nilai |
|---|---|
| banding F1 terpicu / F3 jarang (dari 4 still) | 1 / 0 |
| fokus kecil-tengah, sampel berturut maks | 46 dari 60 |
| probe: teks kecil / tabrakan / terpotong | 0 / 4 / 1 (frame [12, 40, 70, 112]) |
| warna luar palet | tidak ada |
| struktur vs referensi (terbaik; rata-rata per ref; n ref) | 0.6194 (ssim 0.746, edge 0.4928; frame 70 vs `guide/referensi/sheets/keyframes/07-k1-pertanyaan-per-kata.jpg`); 0.3288; 8 |
| gerak (tipografi) | frame berubah 0.613 |
| dua token (edge / ssim / selisih piksel) | 1.0 / 0.7663 / 204.23 |

5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):
1. Baris 1: kata 'kecil' sudah di posisi akhir tapi masih buram dan berwarna merah, sedangkan di referensi 'makes' tajam di tengah blur masuknya. Blur-nya tidak selesai mengecil, jadi kata utama terlihat tidak fokus. Perbaikan: ke nol di ≈ 10 frame dan pastikan tajam sebelum kata berikutnya masuk.
2. Baris 1: kata 'Kerja' menempel di tepi kiri frame (x≈490 dari sel yang mulai di 485) dan kata+shape memenuhi lebar sampai 'kecil' hampir menyentuh tepi kanan. Tidak ada margin aman. Perbaikan: geser grup supaya kata terbaru ada di sekitar tengah-kanan dan beri margin ≥ 0,05 lebar frame.
3. Baris 1 dan 2: lingkaran merah dan kuartal hijau besar (≈ 0,15–0,2 lebar frame) memotong huruf 'a' dari 'Kerja' dan huruf 'b' dari 'besar'. Letaknya di lapisan atas teks, bukan di bawah. Perbaikan: taruh shape di lapisan paling bawah dengan tumpang tindih kecil (≈ 0,2 lebar shape) supaya teks tetap terbaca.
4. Baris 2 dan 3: 'hasil' terpotong di tepi kiri sebagai 'hasil' → 'il', dan baris 3 mulai dengan potongan 'il bikin'. Potongan huruf di tepi terlihat seperti salah crop. Perbaikan: dorong kata keluar frame sepenuhnya secara halus (blur gerak, fade), jangan menyisakan huruf separuh.
5. Baris 4: ukuran akhir sekitar 0,02 tinggi frame, jauh di bawah target 0,04–0,05. Satu baris kecil di tengah dengan ruang kosong luas terasa tidak tuntas. Shape di sela kata juga hampir sama besar dengan huruf, jadi tidak terbaca sebagai tanda baca. Perbaikan: tahan di cap ≈ 0,045 tinggi frame dan kecilkan shape ke ≈ 0,04 tinggi frame.

Lembar side-by-side (referensi kiri | kandidat kanan): `pabrik/kandidat/WordBeat/lembar-r1.jpg`

## Putaran 2: GAGAL

Dosa terpicu: d

Temuan:
- DOSA d: fokus < 20 % dan pusat dalam ±12 % tengah pada 12 sampel berturut (stride 2 frame)

| Metrik | Nilai |
|---|---|
| banding F1 terpicu / F3 jarang (dari 4 still) | 0 / 0 |
| fokus kecil-tengah, sampel berturut maks | 12 dari 60 |
| probe: teks kecil / tabrakan / terpotong | 0 / 0 / 0 (frame [19, 49, 80, 112]) |
| warna luar palet | tidak ada |
| struktur vs referensi (terbaik; rata-rata per ref; n ref) | 0.5424 (ssim 0.7022, edge 0.3827; frame 49 vs `guide/referensi/sheets/keyframes/07-k1-pertanyaan-per-kata.jpg`); 0.3084; 8 |
| gerak (tipografi) | frame berubah 0.605 |
| dua token (edge / ssim / selisih piksel) | 1.0 / 0.6549 / 204.06 |

5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):
1. Baris 1 dan 2 (kata tunggal 'kecil' dan 'besar'): kata ditaruh di tengah-kanan dengan margin kiri besar dan sisi kanan hampir menempel tepi. Tidak ada gerak kamera yang terbaca dan tidak ada kata sebelumnya yang terdorong keluar. Tampilannya seperti kartu judul statis, bukan satu kata per ketukan. Perbaikan: tampilkan 2–3 kata dalam grup yang bergeser horizontal, dengan kata lama terpotong di tepi kiri.
2. Baris 1 dan 2: tidak ada blur horizontal saat masuk dan tidak ada jejak gerak di tepi kata. KIRI punya blur di tepi kanan 'makes'. Kandidat tampak beku dan tanpa energi. Perbaikan: pada frame awal, beri motion-blur horizontal yang mengecil dalam 8–12 frame.
3. Baris 1 dan 2: shape penanda (lingkaran merah, seperempat lingkaran hijau) menempel dan memotong huruf pertama ('k' dan 'b'), sehingga huruf pertama sulit dibaca. Itu bukan tanda baca di antara kata. Shape sebesar tinggi kapital, jauh lebih besar dari spesifikasi 0,10–0,27 lebar frame yang ditumpuk di bawah kata, dan tampak seperti logo bocor. Perbaikan: pindahkan shape ke sela antar kata, perkecil, dan taruh di lapisan paling bawah.
4. Baris 3 dan 4: kalimat penuh dikemas dalam bar hitam tipis (tinggi sekitar 0,06 frame) di tengah, dengan latar krem kosong di atas dan bawah. Itu melanggar 'latar polos tanpa bar', dan teks sekitar 0,03 tinggi frame lebih kecil dari target cap 0,04–0,05. Hasilnya terlihat seperti lower-third atau subtitle, bukan penarikan akhir. Perbaikan: hapus bar hitam, tulis tinta gelap langsung di krem, dan naikkan cap ke ≈0,045.
5. Baris 3 dan 4: ketiga kotak warna (merah, biru, hijau) sangat kecil, sekitar 0,01 frame, dan tampak seperti piksel nyasar di sela 'Kerja▪kecil bikin▪hasil▪besar'. Foto/shape buram tidak ada, dan warna per kata tidak berganti. Hanya 'besar' yang kuning dan semua kata lain putih. Dua frame akhir identik, jadi tidak ada gerak. Perbaikan: perbesar shape ke sekitar 0,04 tinggi frame dan beri warna aksen hanya pada satu atau dua kata akhir. Tampilkan juga fase kata tunggal dengan 4–6 foto buram di sekelilingnya.

Lembar side-by-side (referensi kiri | kandidat kanan): `pabrik/kandidat/WordBeat/lembar-r2.jpg`

## Putaran 3: GAGAL

Dosa terpicu: a, d, j2

Temuan:
- DOSA a: banding.py F1 gradien ragu-ragu di frame [49]
- DOSA d: fokus < 20 % dan pusat dalam ±12 % tengah pada 3 sampel berturut (stride 2 frame)
- DOSA j2: jangkar j2 (gradien pucat ragu-ragu, halo di belakan...): Baris 2: 'besar' berwarna lavender pucat (kira-kira #CFD2E8) di atas krem terang. Kontrasnya sangat rendah, sama dengan teks abu di latar hampir putih pada j2. Kata ini adalah kata penutup kalimat, tetapi paling tidak terbaca.

| Metrik | Nilai |
|---|---|
| banding F1 terpicu / F3 jarang (dari 4 still) | 1 / 1 |
| fokus kecil-tengah, sampel berturut maks | 3 dari 60 |
| probe: teks kecil / tabrakan / terpotong | 0 / 0 / 0 (frame [19, 49, 80, 112]) |
| warna luar palet | tidak ada |
| struktur vs referensi (terbaik; rata-rata per ref; n ref) | 0.5007 (ssim 0.6608, edge 0.3405; frame 49 vs `guide/referensi/sheets/keyframes/07-k1-pertanyaan-per-kata.jpg`); 0.3043; 8 |
| gerak (tipografi) | frame berubah 0.647 |
| dua token (edge / ssim / selisih piksel) | 1.0 / 0.5842 / 203.79 |

5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):
1. Baris 2, kata 'besar' berwarna lavender pucat di atas krem, kontrasnya hampir hilang. Kiri memakai warna jenuh (biru) atau tinta gelap untuk kata aktif. Perbaikan: kata yang baru 'dipukul' harus jenuh dan gelap, misalnya biru atau merah penuh. Kalau mau memudar, pudarkan hanya kata lama, bukan kata yang sedang masuk.
2. Baris 1 dan 2 hanya menampilkan satu kata ('kecil', lalu 'besar') per frame. Kata sebelumnya tidak terlihat di kiri dan tidak ada kamera yang menggeser grup, jadi terasa seperti slide ganti, bukan kalimat yang dibangun. Kiri menunjukkan 'What' hitam tetap ada di samping 'makes' biru. Perbaikan: pertahankan kata lama dalam tinta netral di kiri dan geser grup ke kiri saat kata baru masuk.
3. Baris 1: titik merah di depan 'kecil' menempel di tepi kiri frame dan nyaris menyentuh huruf 'k'. Titik ini tidak ditumpuk di bawah huruf dan tidak berukuran bervariasi. Kiri memberi ruang napas di tepi kiri. Perbaikan: letakkan foto atau shape di sela dua kata, lebih besar (10-27 % lebar), ditumpuk di bawah huruf, dan jangan jadikan titik kecil seragam.
4. Baris 3-4: kalimat akhir dikurung pita hitam tebal setinggi kira-kira 0,07 tinggi frame di tengah. Pita ini tidak ada di spesifikasi (latar polos terang tanpa kotak) dan menambah kesan template. Teksnya putih kecil, dengan titik-titik pemisah berukuran sekitar 3 px yang nyaris tak terlihat. Perbaikan: hapus pita, tulis kalimat dalam tinta gelap langsung di krem, dan perbesar penanda sela jadi shape yang terbaca.
5. Baris 3 dan 4 hampir identik (posisi dan isi sama) di frame 80 dan 112, jadi tahap penarikan akhir dan penahanan tidak menunjukkan perkembangan. Tidak ada transisi dari kata raksasa ke baris kecil dan tidak ada kata aksen berikutnya dikelilingi foto buram seperti kiri. Dua dari empat sampel terbuang untuk keadaan statis yang sama. Perbaikan: tunjukkan frame tengah penarikan dan frame kata tunggal yang dikelilingi 4-6 foto buram.

Lembar side-by-side (referensi kiri | kandidat kanan): `pabrik/kandidat/WordBeat/lembar-r3.jpg`
