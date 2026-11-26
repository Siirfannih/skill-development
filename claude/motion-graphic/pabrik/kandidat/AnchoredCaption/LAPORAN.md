# Laporan uji AnchoredCaption

Spec: `90-T1` (tipografi). Lulus = nol dosa (skrip + vision + jangkar) DAN metrik keras dalam ambang (`uji.py` AMBANG).

## Putaran 1: GAGAL

Dosa terpicu: g, j2, j3, q

Temuan:
- DOSA g: vision: Persegi panjang polos tanpa isi: periwinkle di kiri atas baris 1 (x≈298–433, y≈68–225), abu-ungu di kanan atas baris 2 (x≈433–516, y≈531–733), dan kotak pucat di kanan bawah baris 3 (x≈418–546, y≈1295–1450). Ketiganya tidak membawa pesan dan terbaca sebagai kotak pengganti.
- DOSA j2: jangkar j2 (gradien pucat ragu-ragu, halo di belakan...): Polanya sama dengan 'teks di latar hampir putih'. Teks putih di latar #f0f0f8 hampir lenyap di baris 2 ('yang') dan baris 4 ('ndiri.'), seperti teks abu di latar pucat pada j2. Gradien pucat dan halo tidak ada.
- DOSA j3: jangkar j3 (zona biru selalu di pojok kanan bawah ya...): Zona warna kembali ke pojok kanan bawah di baris 2 (diagonal navy), 3 (kotak pucat), dan 4 (segitiga biru muda). Itu pola template yang sama dengan j3. Objek kosong tanpa makna dan teks tidak terbaca di baris 2 dan 4 juga mengulang j3.
- DOSA q: vision baris 4 (f105): 'sendiri.' melintasi batas bar navy kiri (x≈388). 'se' terbaca di navy, sedangkan 'ndiri.' putih di latar #f0f0f8 hampir tak terlihat.
- struktur selaras waktu 0.186 < max(0.15, tak-selaras 0.186)
- gerak: hanya 0.13 pasangan frame berubah (< 0.25)

| Metrik | Nilai |
|---|---|
| banding F1 terpicu / F3 jarang (dari 4 still) | 0 / 0 |
| fokus kecil-tengah, sampel berturut maks | 0 dari 60 |
| probe (42 frame): teks kecil / tabrakan / tertutup-j / lapisan-o / tak terlihat | 0 / 0 / 0 / 0 / 0 |
| warna: nyasar (cek-warna) / luar palet / kulit bocor | 0 / 0 / 0 |
| struktur vs referensi | paired 0.1856 vs tak-selaras 0.1858 (n 8) |
| gerak (tipografi) | frame berubah 0.126; korelasi energi vs klip 0.18 |
| latar | {"dipakai": false} |
| dua token (edge / ssim / selisih piksel) | 0.8901 / 0.6256 / 123.78 |

5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):
1. Latar kandidat membelah frame jadi zona terang dan gelap tepat di garis teks (baris 2 dan 4, y≈0,5). Teks putih tunggal pasti jatuh ke zona terang. Perbaikan: kunci latar di belakang caption ke luma rendah, atau beri gradasi gelap tipis di y 0,35–0,65. Kiri tak pernah kehilangan satu huruf pun.
2. Persegi periwinkle dan abu-ungu polos di kiri atas baris 1 dan kanan atas baris 2 tidak menggambarkan apa pun. Kiri punya sofa, kolase wajah, dan lorong yang menjelaskan kalimat. Perbaikan: ganti dengan objek yang berhubungan dengan kata yang diucapkan, atau hapus.
3. Teks 'yang lama,' dan 'sendiri.' berubah warna efektif di tengah kata karena melintasi batas navy/terang (baris 2 dan 4). Kiri punya kontras konsisten sepanjang frasa. Perbaikan: batas bentuk tidak boleh lewat di zona teks y 0,40–0,60.
4. Pita kabur horizontal di baris 3 (y≈1140–1180) terlihat seperti sisa gradien yang bocor, bukan arah cahaya yang jelas. Kiri punya kolase dengan kedalaman nyata. Perbaikan: pakai transisi tegas atau gradasi yang jelas sumbernya.
5. Komposisi latar tidak punya hierarki. Kotak dan segitiga tiap frame ditaruh di posisi acak (kiri atas, kanan atas, kanan bawah, kiri) tanpa mengikuti kata atau ritme potongan. Kiri berganti shot dengan makna (sofa → kolase). Perbaikan: tiap shot harus punya satu fokus visual yang selaras dengan kata, dengan potongan keras mengikuti frasa.

Lembar side-by-side (referensi kiri | kandidat kanan, selaras waktu): `pabrik/kandidat/AnchoredCaption/lembar-r1.jpg`

## Putaran 2: GAGAL

Dosa terpicu: g

Temuan:
- DOSA g: vision: Baris 1 dan 2 berisi kotak kosong bertumpuk (putih, biru, abu tembus) tanpa isi. Baris 4 punya panel putih polos besar di bawah klaper (y ≈ 1820–1915). Semuanya terbaca sebagai kotak pengganti.
- struktur selaras waktu 0.151 < max(0.15, tak-selaras 0.159)
- gerak: hanya 0.18 pasangan frame berubah (< 0.25)

| Metrik | Nilai |
|---|---|
| banding F1 terpicu / F3 jarang (dari 4 still) | 0 / 0 |
| fokus kecil-tengah, sampel berturut maks | 0 dari 60 |
| probe (42 frame): teks kecil / tabrakan / tertutup-j / lapisan-o / tak terlihat | 0 / 0 / 0 / 0 / 0 |
| warna: nyasar (cek-warna) / luar palet / kulit bocor | 0 / 0 / 0 |
| struktur vs referensi | paired 0.1514 vs tak-selaras 0.159 (n 8) |
| gerak (tipografi) | frame berubah 0.185; korelasi energi vs klip 0.337 |
| latar | {"dipakai": false} |
| dua token (edge / ssim / selisih piksel) | 0.8867 / 0.7105 / 49.45 |

5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):
1. Baris 1 dan 2: kotak bertumpuk (putih, biru, abu tembus) tidak menggambarkan 'menimpa' atau 'tanpa'. Itu bentuk generik dan menimpa kata hanya secara dekoratif. Ganti dengan gambar yang memang menunjukkan makna kata, misalnya dua kartu yang benar-benar saling menimpa dengan potongan keras.
2. Gambar selalu ditaruh di blok yang sama: kotak di atas teks (baris 1 dan 2), bar chart dan klaper di bawah teks (baris 3 dan 4). Ini terbaca sebagai template. Referensi memakai foto yang memenuhi seluruh frame di belakang teks. Buat gambar mengisi frame penuh dan bervariasi komposisinya.
3. Latar navy datar dengan gradien vertikal tipis. Tidak ada kedalaman, tekstur, atau arah cahaya, sehingga kosong dibanding referensi yang kaya (cahaya lampu oranye, kolase ungu). Beri latar bertekstur atau shot nyata dengan sumber cahaya jelas.
4. Objek di baris 3 dan 4 (bar chart palet dua warna, klaper putih polos) memakai clip-art datar tanpa bayangan, tekstur, atau sudut. Panel putih klaper berupa kotak kosong besar yang menyedot perhatian ke y ≈ 0,9. Ubah jadi bentuk miring dengan detail, atau hapus panel kosongnya.
5. Kosakata visual terlalu sempit: hanya biru periwinkle, putih, dan abu pada navy. Di dua baris pertama, abu tembus di atas biru terlihat keruh. Referensi punya warna dan kontras yang beragam antar shot. Tambah satu aksen hangat dan variasi kecerahan latar antar shot.

Lembar side-by-side (referensi kiri | kandidat kanan, selaras waktu): `pabrik/kandidat/AnchoredCaption/lembar-r2.jpg`

## Putaran 3: LULUS

Dosa terpicu: tidak ada

| Metrik | Nilai |
|---|---|
| banding F1 terpicu / F3 jarang (dari 4 still) | 0 / 0 |
| fokus kecil-tengah, sampel berturut maks | 0 dari 60 |
| probe (42 frame): teks kecil / tabrakan / tertutup-j / lapisan-o / tak terlihat | 0 / 0 / 0 / 0 / 0 |
| warna: nyasar (cek-warna) / luar palet / kulit bocor | 0 / 0 / 0 |
| struktur vs referensi | paired 0.1704 vs tak-selaras 0.1493 (n 8) |
| gerak (tipografi) | frame berubah 0.563; korelasi energi vs klip 0.047 |
| latar | {"dipakai": false} |
| dua token (edge / ssim / selisih piksel) | 0.8149 / 0.7724 / 53.64 |

5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):
1. Panel dan bidang di baris 1 tidak punya hubungan dengan kata 'menimpa'. Tumpukan kartu miring itu hanya dekorasi, bukan peragaan dua hal yang saling menimpa. Referensi memakai wajah dan sofa yang menggambarkan kalimat. Perbaikan: tampilkan dua kata atau blok yang benar-benar saling menimpa di titik yang sama.
2. Di baris 3 grafik batang tanpa label, sumbu, atau angka dipasang di balik 'Gambar'. Batang putih dan biru acak itu terbaca sebagai chart generik dan tidak ada hubungannya dengan kata. Perbaikan: ganti dengan bentuk yang memperagakan 'gambar', misalnya bingkai foto yang berganti, atau hapus.
3. Pita gelap dengan tepi blur lebar di baris 2 dan 3 (y≈650-780 dan y≈1140-1290) terlihat seperti kabut di belakang teks. Gradasi lebar dan lembut ini terbaca sebagai efek murahan, bukan scrim yang terkendali. Perbaikan: pakai gradasi gelap tipis dan sempit di y 0,35-0,65, atau bayangan teks lembut, bukan pita blur lebar.
4. Batang abu-abu pucat di kanan atas baris 2 (x≈470-497, y≈508-628) tidak punya fungsi, arah, atau makna. Abu datar di atas putih membuatnya terbaca sebagai sisa placeholder. Perbaikan: hapus, atau beri peran jelas dan warna yang konsisten dengan palet biru-navy.
5. Di baris 4 teks 'terpisah.' hampir selebar blok di bawahnya, sehingga mepet ke tepi blok dan berada di perbatasan biru ke gelap. Teks juga duduk di atas strip film putih yang ramai, dan kedua sisi gradasi di sekitarnya menurunkan kesan rapi. Referensi punya teks yang bebas dan bernapas di atas gambar. Perbaikan: perkecil blok di belakang teks atau perlebar jarak ke tepinya.

Lembar side-by-side (referensi kiri | kandidat kanan, selaras waktu): `pabrik/kandidat/AnchoredCaption/lembar-r3.jpg`
