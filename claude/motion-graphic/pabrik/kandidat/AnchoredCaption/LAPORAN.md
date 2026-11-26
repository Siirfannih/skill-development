# Laporan uji AnchoredCaption

Spec: `90-T1` (tipografi). Lulus = nol dosa (skrip + vision + jangkar) DAN metrik keras dalam ambang (`uji.py` AMBANG).

## Putaran 1: GAGAL

Dosa terpicu: g

Temuan:
- DOSA g: vision: Baris 1: kotak krem membulat kosong di panel oranye bawah (sekitar y 0,68–0,88) dan kotak krem dengan ikon play di atas. Baris 3 dan 4: lima persegi panjang krem kosong miring tanpa isi atau makna. Semuanya terbaca sebagai kotak pengganti, bukan objek yang menggambarkan kalimat.
- gerak: hanya 0.11 pasangan frame berubah (< 0.25)

| Metrik | Nilai |
|---|---|
| banding F1 terpicu / F3 jarang (dari 4 still) | 0 / 0 |
| fokus kecil-tengah, sampel berturut maks | 0 dari 60 |
| probe: teks kecil / tabrakan / terpotong | 0 / 0 / 0 (frame [5, 40, 70, 110]) |
| warna luar palet | tidak ada |
| struktur vs referensi (terbaik; rata-rata per ref; n ref) | 0.3085 (ssim 0.3711, edge 0.2459; frame 5 vs `guide/referensi/sheets/keyframes/90-k6-transisi-kolase-cermin.jpg`); 0.2099; 11 |
| gerak (tipografi) | frame berubah 0.109 |
| dua token (edge / ssim / selisih piksel) | 1.0 / 0.1712 / 147.62 |

5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):
1. Baris 3 dan 4: lima persegi panjang krem/oranye miring (kiri atas, kanan atas, kiri bawah, kanan bawah, satu kecil di kanan) tidak menggambarkan apa pun dari 'angles,' atau 'motions'. KIRI menampilkan kolase wajah yang jelas. Ganti dengan kolase bingkai berisi siluet wajah atau perangkat, atau hapus.
2. Baris 1: kotak krem kosong di panel oranye bawah (y ≈ 0,68–0,88) tidak punya isi, ikon, atau fungsi, dan terlihat seperti sisa layout. Isi dengan objek bermakna (mis. timeline atau frame video) atau buang panelnya.
3. Baris 2: tiang kecil dengan kotak oranye di pojok kiri atas (sekitar 0,05–0,13 lebar, 0,05–0,2 tinggi) terlalu kecil dan terpencil untuk dibaca sebagai lampu. Sofa di bawahnya hanya blok oranye polos tanpa bantalan, kaki, atau bayangan. Beri detail bentuk dan skala yang meyakinkan.
4. Baris 3 dan 4: pita gradien oranye horizontal tepat di belakang teks (y ≈ 0,45–0,6) terlihat seperti sabuk pewarnaan buatan. Ia tidak mengikuti sumber cahaya dan memotong komposisi di titik teks. Pakai latar rata atau gradien vertikal halus, atau gradasi gelap tipis yang memang berfungsi sebagai pelindung kontras.
5. Palet krem dan oranye terlalu seragam di keempat baris, dan latar bergantian antara krem polos (baris 1 dan 2) dan oranye (baris 3 dan 4) tanpa alasan visual. KIRI punya kedalaman, tekstur, dan variasi tonal. Tambahkan lapisan tonal ketiga dan tekstur halus, serta tentukan kapan latar terang atau gelap dipakai.

Lembar side-by-side (referensi kiri | kandidat kanan): `pabrik/kandidat/AnchoredCaption/lembar-r1.jpg`

## Putaran 2: LULUS

Dosa terpicu: tidak ada

| Metrik | Nilai |
|---|---|
| banding F1 terpicu / F3 jarang (dari 4 still) | 0 / 0 |
| fokus kecil-tengah, sampel berturut maks | 0 dari 60 |
| probe: teks kecil / tabrakan / terpotong | 0 / 0 / 0 (frame [5, 40, 70, 110]) |
| warna luar palet | tidak ada |
| struktur vs referensi (terbaik; rata-rata per ref; n ref) | 0.2541 (ssim 0.2911, edge 0.217; frame 5 vs `guide/referensi/sheets/keyframes/90-k6-transisi-kolase-cermin.jpg`); 0.1497; 11 |
| gerak (tipografi) | frame berubah 0.933 |
| dua token (edge / ssim / selisih piksel) | 1.0 / 0.0423 / 152.95 |

5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):
1. Baris 3 dan 4: kolase empat kartu wajah hampir identik (posisi, rotasi, dan warna nyaris sama) dipakai untuk dua kata berbeda ('angles,' lalu 'motions'). Shot kedua terasa seperti salinan, padahal referensi mengganti gambar sesuai frasa. Perbaikan: beri 'motions' ilustrasi sendiri, misalnya panah atau frame yang bergeser, bukan kolase yang sama.
2. Baris 3 dan 4: kolase kartu wajah terdiri dari kartu putih/krem dengan lingkaran dan setengah lingkaran, yaitu siluet avatar yang sangat generik. Ini kurang menggambarkan 'angles' dibanding wajah dari beberapa sudut pandang di referensi. Perbaikan: ubah kartu menjadi tampilan sudut berbeda (profil, tiga perempat, atas) atau tambahkan garis sudut kamera.
3. Baris 3 dan 4: pita gradien oranye yang lebih terang di tengah, tepat di belakang teks, terlihat seperti sabuk horizontal buatan. Pita itu memotong komposisi kartu dan menarik perhatian ke arah yang tidak punya makna. Perbaikan: ganti dengan latar oranye datar, dan pakai kontras teks sendiri, atau gradasi sangat tipis yang tidak terbaca sebagai pita.
4. Baris 1 dan 2: caption hitam di kanan ditempatkan di zona kosong tanpa hubungan dengan objek. 'Your video' mengambang di antara kotak play dan timeline, dan 'still.' di tengah antara lampu dan sofa. Fokus mata jatuh ke tengah tetapi objek terdorong ke tepi atas dan bawah, jadi frame terasa seperti ruang kosong dengan dua gambar terpisah. Perbaikan: rapatkan objek ke arah tengah atau buat jarak teks ke objek konsisten.
5. Baris 2: lampu berdiri di kiri (tiang tipis dengan kap terpotong di tepi atas) dan sofa di bawah terlihat tidak sebanding skalanya. Tiang lampu menyentuh sofa secara canggung, dan kap yang terpotong di tepi atas terasa tidak disengaja. Perbaikan: turunkan lampu sehingga kap utuh di dalam frame, perbaiki proporsi lampu terhadap sofa, atau pindahkan lampu ke sisi sofa dengan jarak jelas.

Lembar side-by-side (referensi kiri | kandidat kanan): `pabrik/kandidat/AnchoredCaption/lembar-r2.jpg`
