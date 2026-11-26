# Laporan uji WordBeat

Spec: `07-T1` (tipografi). Lulus = nol dosa (skrip + vision + jangkar) DAN metrik keras dalam ambang (`uji.py` AMBANG).

## Putaran 1: GAGAL

Dosa terpicu: a, d, j, q

Temuan:
- DOSA a: banding.py F1 gradien ragu-ragu di frame [74, 110]
- DOSA d: fokus < 20 % dan pusat dalam ±12 % tengah pada 23 sampel berturut (stride 2 frame)
- DOSA j: f3: 'Satu' x 'Satu'; f6: 'Satu' x 'Satu'; f9: 'Satu' x 'Satu'; f12: 'Satu' x 'Satu'; f12: 'kata' x 'kata'
- DOSA q: vision baris 3 (f74): Huruf 'u' di tepi kiri baris tengah terpotong frame (potongan 'Satu'). Kata sebelumnya masih tersangkut di tepi, padahal seharusnya terdorong keluar bersih.
- struktur selaras waktu 0.542 < max(0.15, tak-selaras 0.547)

| Metrik | Nilai |
|---|---|
| banding F1 terpicu / F3 jarang (dari 4 still) | 2 / 0 |
| fokus kecil-tengah, sampel berturut maks | 23 dari 60 |
| probe (44 frame): teks kecil / tabrakan / tertutup-j / lapisan-o / tak terlihat | 0 / 83 / 70 / 0 / 0 |
| warna: nyasar (cek-warna) / luar palet / kulit bocor | 0 / 0 / 0 |
| struktur vs referensi | paired 0.5419 vs tak-selaras 0.547 (n 8) |
| gerak (tipografi) | frame berubah 0.555; korelasi energi vs klip -0.3 |
| latar | {"dipakai": false} |
| dua token (edge / ssim / selisih piksel) | 1.0 / 0.7919 / 225.52 |

5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):
1. Baris 1, spasi antar kata: celah 'Satu' ke 'kata' sekitar 0,4 kali tinggi kapital, lebih longgar dari target 0,2–0,3 dan lebih longgar dari referensi 'What makes'. Rapatkan word-spacing ke ≈0,25 tinggi kapital.
2. Baris 1, tinggi huruf: kapital 'S' sekitar 0,2 tinggi frame, tetapi blok teks naik ke sepertiga atas frame (pusat sekitar 0,4), bukan 0,51–0,54 seperti referensi yang duduk di tengah. Turunkan pusat vertikal baris ke ≈0,52.
3. Baris 1–2, blur masuk: 'Satu kata' dan 'ketukan' tajam sempurna pada f19 dan f52, tanpa blur horizontal di tepi kanan seperti 'What makes' di referensi. Gerak terasa kaku. Tambahkan motion blur horizontal yang mengecil dalam 8–12 frame.
4. Baris 3–4, foto/shape: hanya kotak 0,02–0,03 tinggi frame dan lingkaran navy, seragam dan datar, diletakkan sebaris di antara kata. Referensi memakai foto nyata yang bertumpuk menimpa tepi dan buram. Perbesar, tumpuk sedikit menimpa kata, taruh di lapisan bawah, dan beri variasi ukuran dan rotasi.
5. Baris 4, fase penutup: setelah baris kecil, tidak ada kata tunggal berikutnya yang dikelilingi 4–6 foto/shape buram yang tersebar di sudut. Frame hampir kosong dengan teks mungil di tengah, sedangkan referensi baris 4 penuh komposisi tersebar. Tambahkan fase 'Mission' dengan elemen tersebar.

Lembar side-by-side (referensi kiri | kandidat kanan, selaras waktu): `pabrik/kandidat/WordBeat/lembar-r1.jpg`

## Putaran 2: GAGAL

Dosa terpicu: a, d, j, q

Temuan:
- DOSA a: banding.py F1 gradien ragu-ragu di frame [4, 58]
- DOSA d: fokus < 20 % dan pusat dalam ±12 % tengah pada 11 sampel berturut (stride 2 frame)
- DOSA j: f12: 'kata' tertutup 12%; f15: 'kata' tertutup 12%; f18: 'kata' tertutup 21%; f21: 'kata' tertutup 17%; f24: 'di' tertutup 33%
- DOSA q: vision baris 3 (f58): Huruf 'S' di 'Satu' menempel dan sedikit terpotong tepi kiri frame (x≈483). Kalimat selebar ±0,8 frame. Titik dan kuarter-pie menempel pada 'kata●di' dan 'tiap◢ketukan' tanpa celah.

| Metrik | Nilai |
|---|---|
| banding F1 terpicu / F3 jarang (dari 4 still) | 2 / 0 |
| fokus kecil-tengah, sampel berturut maks | 11 dari 60 |
| probe (43 frame): teks kecil / tabrakan / tertutup-j / lapisan-o / tak terlihat | 0 / 0 / 43 / 0 / 0 |
| warna: nyasar (cek-warna) / luar palet / kulit bocor | 0 / 0 / 0 |
| struktur vs referensi | paired 0.5051 vs tak-selaras 0.4396 (n 8) |
| gerak (tipografi) | frame berubah 0.613; korelasi energi vs klip -0.278 |
| latar | {"dipakai": false} |
| dua token (edge / ssim / selisih piksel) | 1.0 / 0.7518 / 219.19 |

5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):
1. Latar kanan lavender dingin (≈#F5F5FB), sedangkan referensi krem hangat. Mekanik meminta terang hangat. Ganti ke krem netral hangat seperti kiri supaya tidak terkesan template.
2. Huruf tampak seperti sans bawaan sistem (DejaVu-like) yang lebar dan longgar, bukan grotesk rapat berbobot seperti referensi. Tebal dan spasi 'Satu' dan 'ketukan' terasa default. Ganti ke grotesk dengan tracking sekitar -2%.
3. Baris 2: 'ketukan' memenuhi sekitar 0,72 lebar frame, jauh di atas target 0,32-0,48. Kata menekan tepi kanan dan tidak ada kata sebelumnya di kiri, jadi terasa seperti kata tunggal yang kebesaran. Kecilkan skala dan perlihatkan kata sebelumnya yang terdorong keluar.
4. Baris 3: kalimat selebar ±0,8 frame dan 'S' terpotong tepi kiri, sedangkan referensi ±0,5 dan berada di tengah. Titik, kuarter-pie, dan kotak menempel pada huruf ('kata●di', 'tiap◢ketukan') dengan celah tidak sama. Beri ruang konsisten, rapatkan skala grup, dan pusatkan.
5. Baris 4: kotak navy tua besar di kanan atas dan kuarter-lingkaran biru raksasa di kiri bawah jauh lebih berat daripada 'Mission' kecil. Bentuknya hanya primitif datar dengan warna sama, bukan foto beragam, dan buramnya seragam. Perkecil dan ringankan bentuk, beri variasi nilai warna dan ukuran, jauhkan dari tepi, dan beri sedikit gerak berbeda per bentuk.

Lembar side-by-side (referensi kiri | kandidat kanan, selaras waktu): `pabrik/kandidat/WordBeat/lembar-r2.jpg`

## Putaran 3: GAGAL

Dosa terpicu: c, f, j, j3, q, r

Temuan:
- DOSA c: vision: Baris 2-4: kuadran biru besar di kiri bawah, lingkaran gelap di kiri atas, lingkaran biru di tengah atas, dan kotak abu-abu buram di kanan atas dan bawah. Semuanya shape generik tanpa isi. Kalau dihapus, pesan 'Satu kata tiap ketukan' tidak berkurang. Tidak ada foto yang menjadi tanda baca seperti di referensi.
- DOSA f: vision: Baris 1: 'kata' sangat buram (blur horizontal berat) dan sama sekali tidak terbaca di f4. Baris 2-4: shape dekoratif sengaja diburamkan, tetapi teksnya tajam. Cacat yang jelas ada di baris 1, pada konten yang harus dibaca.
- DOSA j: f12: 'kata' tertutup 17%; f24: 'ketuk' tertutup 12%; f26: 'ketuk' tertutup 17%; f27: 'ketuk' tertutup 17%; f30: 'ketuk' tertutup 17%
- DOSA j3: jangkar j3 (zona biru selalu di pojok kanan bawah ya...): Baris 2, 3, dan 4 memakai komposisi shape yang sama persis di posisi yang sama: kuadran biru di kiri bawah, lingkaran gelap di kiri atas, kotak abu-abu di kanan. Itu pola template tetap seperti zona biru di pojok pada j3. Shape tidak berubah tempat dan hampir tidak bergerak antar frame. Pada baris 4 shape juga tidak mengelilingi kata secara rapat, sehingga terasa seperti dekorasi pojok.
- DOSA q: vision baris 2 (f26): Kuadran biru besar di kiri bawah menyentuh dan sedikit menimpa bagian bawah huruf 'p' di 'tiap'. Huruf 'i' dan 'a' di tepi kiri juga terpotong frame. Tapi 'tiap' seharusnya masih terbaca.
- DOSA r: vision baris 1 (f4): 'Satu' menempel di tepi kiri frame dan nyaris terpotong. 'kata' terlalu buram, mirip artefak render. Celah antar kata dan kotak lebar sekali, jauh dari 'rapat'.

| Metrik | Nilai |
|---|---|
| banding F1 terpicu / F3 jarang (dari 4 still) | 0 / 0 |
| fokus kecil-tengah, sampel berturut maks | 1 dari 60 |
| probe (44 frame): teks kecil / tabrakan / tertutup-j / lapisan-o / tak terlihat | 0 / 0 / 28 / 0 / 0 |
| warna: nyasar (cek-warna) / luar palet / kulit bocor | 0 / 0 / 0 |
| struktur vs referensi | paired 0.3928 vs tak-selaras 0.3489 (n 8) |
| gerak (tipografi) | frame berubah 0.454; korelasi energi vs klip -0.026 |
| latar | {"dipakai": false} |
| dua token (edge / ssim / selisih piksel) | 0.9997 / 0.624 / 211.99 |

5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):
1. Baris 1, kata 'kata': blur horizontal terlalu berat dan masih tidak terbaca di f4. Di referensi blur hanya tipis di tepi kanan dan kata tetap terbaca. Perbaikan: kurangi blur awal sekitar 70%, dan majukan kata sehingga tajam lebih cepat.
2. Baris 1: celah 'Satu' ke kotak biru dan ke 'kata' lebih dari 0,5 kali tinggi kapital, dan 'Satu' menempel di tepi kiri. Referensi rapat sekitar 0,2-0,3 kali. Perbaikan: rapatkan celah dan pusatkan grup sebelum kata baru masuk.
3. Baris 2-4: shape dekoratif (kuadran biru, lingkaran, kotak abu-abu) diam di posisi sama dan diburamkan merata, sehingga terlihat seperti wallpaper. Referensi memakai foto nyata yang menumpuk dan memberi isi. Perbaikan: ganti dengan gambar bermakna, sebar acak, dan buat tiap shape bergerak sedikit.
4. Baris 2: kuadran biru besar menyentuh dasar huruf 'p' dan 'tiap'. Di referensi foto tidak pernah memotong teks. Perbaikan: jauhkan shape dari kotak teks atau letakkan benar-benar di bawah kata.
5. Baris 3: kalimat akhir sangat kecil (cap sekitar 0,03 tinggi frame) dan 'Satu' biru pucat nyaris hilang di latar lavender. Referensi tetap terbaca dengan aksen kuning dan biru yang tegas. Perbaikan: naikkan ukuran ke 0,04-0,05, gelapkan biru aksen, dan hanya aksenkan satu atau dua kata.

Lembar side-by-side (referensi kiri | kandidat kanan, selaras waktu): `pabrik/kandidat/WordBeat/lembar-r3.jpg`
