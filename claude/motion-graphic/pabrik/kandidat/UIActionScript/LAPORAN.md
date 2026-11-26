# Laporan uji UIActionScript

Spec: `63-T5` (permukaan_ui). Lulus = nol dosa (skrip + vision + jangkar) DAN metrik keras dalam ambang (`uji.py` AMBANG).

## Putaran 1: GAGAL

Dosa terpicu: g, j, o, q

Temuan:
- DOSA g: vision: Baris 1: panel preview 'Cerita Awal' hanya kotak biru gelap dengan segitiga play, tanpa frame video. Daftar 'klip-01/klip-02' juga tanpa thumbnail. Di referensi preview berisi wajah dan video asli, jadi di sini kotak itu berfungsi sebagai pengganti konten.
- DOSA j: f3: 'Media' tertutup 100%; f3: 'klip-01' tertutup 100%; f3: 'klip-02' tertutup 100%; f3: 'Cerita Awal' tertutup 100%; f3: '100%' tertutup 100%
- DOSA o: f3: lapisan non-teks di atas 'Media' (100% titik); f3: lapisan non-teks di atas 'klip-01' (100% titik); f3: lapisan non-teks di atas 'klip-02' (100% titik); f3: lapisan non-teks di atas 'Cerita Awal' (100% titik); f3: lapisan non-teks di atas '100%' (100% titik)
- DOSA q: vision baris 3 (f74): Sel grid biru menumpuk di kotak prompt dan melintasi kata 'musik' dan 'Nova 5'. Teks masih terbaca, tetapi kontrasnya turun di sel yang terang. Tepi frame tetap memotong 'Cerita Awal' dan awal kalimat.

| Metrik | Nilai |
|---|---|
| banding F1 terpicu / F3 jarang (dari 4 still) | 0 / 0 |
| fokus kecil-tengah, sampel berturut maks | 0 dari 52 |
| probe (39 frame): teks kecil / tabrakan / tertutup-j / lapisan-o / tak terlihat | 0 / 0 / 297 / 297 / 0 |
| warna: nyasar (cek-warna) / luar palet / kulit bocor | 0 / 0 / 0 |
| struktur vs referensi | paired 0.1597 vs tak-selaras 0.1157 (n 8) |
| gerak (permukaan_ui) | frame berubah 0.456; korelasi energi vs klip -0.043 |
| latar | {"dipakai": false} |
| dua token (edge / ssim / selisih piksel) | 0.9567 / 0.8072 / 44.3 |

5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):
1. Baris 1, isi jendela: preview 'Cerita Awal' hanya kotak biru dengan segitiga play. Di referensi isinya potret orang dan thumbnail video, jadi jendela kandidat tampak seperti wireframe. Ganti dengan frame foto atau gradien bermakna, dan isi track dengan thumbnail dan waveform.
2. Baris 1, wallpaper: gradien periwinkle datar dengan dua lapis siluet gunung terlihat vektor dan hampa. Referensi memakai foto matahari terbenam yang kaya tekstur dan hangat. Beri tekstur, kabut, cahaya hangat berarah, dan grain, atau pakai foto sungguhan.
3. Baris 1, nada: wallpaper biru terang dan UI navy sama-sama dingin, jadi kontras luma ada tetapi tidak ada kontras hue. Jendela tidak terpisah tegas seperti oranye hangat melawan UI hitam di referensi. Hangatkan wallpaper atau buat UI netral gelap.
4. Baris 2–3, kotak prompt: pada tampilan zoom kotak tampak datar, hanya sedikit lebih terang dari panel di belakangnya. Tidak ada kaca semi-transparan dengan blur latar dan bayangan lembut seperti di referensi. Radiusnya juga lebih kecil dari ±0,2 sisi pendek. Tambahkan backdrop blur, bayangan, dan radius pil.
5. Baris 3, sapuan sel: sel berwarna biru solid seragam dan menutupi kotak prompt tanpa mengambil warna tone foto. Referensi memakai sel hangat emas/oranye semi-transparan yang pecah menjadi blok-blok kecil dengan gradasi. Ganti ke warna hangat dari wallpaper, variasikan ukuran dan opasitas sel, dan jangan menumpuk di teks.

Lembar side-by-side (referensi kiri | kandidat kanan, selaras waktu): `pabrik/kandidat/UIActionScript/lembar-r1.jpg`

## Putaran 2: GAGAL

Dosa terpicu: g, j, o, q

Temuan:
- DOSA g: vision: Baris 1: panel pratinjau memakai siluet kepala generik biru gelap sebagai pengganti video. Tiga thumbnail Media/klip-01/klip-02 berupa kotak biru polos. Trek Video, Suara, dan Musik di baris 1-3 hanya berisi pita tick seragam sebagai pengganti waveform. Semuanya terbaca sebagai pengisi, bukan konten asli.
- DOSA j: f3: 'Media' tertutup 100%; f3: 'klip-01' tertutup 100%; f3: 'klip-02' tertutup 100%; f3: 'Cerita Awal' tertutup 100%; f3: '100%' tertutup 100%
- DOSA o: f3: lapisan non-teks di atas 'Media' (100% titik); f3: lapisan non-teks di atas 'klip-01' (100% titik); f3: lapisan non-teks di atas 'klip-02' (100% titik); f3: lapisan non-teks di atas 'Cerita Awal' (100% titik); f3: lapisan non-teks di atas '100%' (100% titik)
- DOSA q: vision baris 3 (f74): Sel grid gelap menutupi bagian kanan kotak prompt di sekitar 'Nova 5' dan 'Sedang', sehingga 'Sedang' kabur. Tepi kiri tetap memotong 'klip, lalu...' dan 'erita Awal' seperti baris 2.
- struktur selaras waktu 0.132 < max(0.15, tak-selaras 0.105)

| Metrik | Nilai |
|---|---|
| banding F1 terpicu / F3 jarang (dari 4 still) | 0 / 0 |
| fokus kecil-tengah, sampel berturut maks | 0 dari 52 |
| probe (39 frame): teks kecil / tabrakan / tertutup-j / lapisan-o / tak terlihat | 0 / 0 / 276 / 276 / 0 |
| warna: nyasar (cek-warna) / luar palet / kulit bocor | 0 / 0 / 0 |
| struktur vs referensi | paired 0.1316 vs tak-selaras 0.1052 (n 8) |
| gerak (permukaan_ui) | frame berubah 0.456; korelasi energi vs klip -0.022 |
| latar | {"dipakai": false} |
| dua token (edge / ssim / selisih piksel) | 0.9451 / 0.817 / 41.86 |

5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):
1. Wallpaper pada baris 1-3 adalah ilustrasi pegunungan datar biru-ungu dengan gradien langit. Kiri memakai foto matahari terbenam yang kaya tekstur, hangat, dan jenuh. Ganti dengan foto beresolusi tinggi atau tekstur dengan bayangan dan kabut, dan pakai palet hangat agar jendela gelap terpisah dari latar.
2. Kontras tonal jendela terhadap wallpaper lemah. Jendela biru-navy di atas langit periwinkle memisahkan UI dan latar jauh lebih lemah daripada UI hitam di atas oranye cerah di referensi. Gelapkan jendela ke luma hampir hitam dan buat wallpaper lebih cerah dan jenuh.
3. Isi UI di baris 1-3 hanya placeholder: siluet kepala di pratinjau, thumbnail biru polos, dan trek berisi pita tick seragam. Referensi punya wajah asli, tombol dan menu kecil yang rapat, dan kunci warna kuning-merah-teal di timeline. Ganti dengan frame video nyata dan klip berwarna yang beragam dengan label kecil.
4. Transisi di baris 3 hanya beberapa sel gelap, jarang dan kusam, di sekitar tombol kirim. Di referensi sel berwarna hangat dan menyapu penuh dari kiri melintasi kotak prompt. Buat sel lebih rapat, ambil warna dari tone wallpaper, dan sapu dari kiri ke seluruh lebar kotak. Jangan taruh sel di atas label 'Nova 5 Sedang' sampai teks itu tertutup.
5. Setelah punch di baris 2-3, tepi frame memotong 'Cerita Awal', 'Posisi', 'Opasitas', dan awal klip secara acak, dan wallpaper kanan hanya sebidang datar biru. Dock hilang dari frame. Referensi masih menyisakan dock dan wallpaper kanan sebagai konteks. Atur pusat kamera dan skala (~1,6×) supaya dock dan lebih banyak wallpaper tetap terlihat, dan pangkas elemen UI yang terpotong tanpa makna.

Lembar side-by-side (referensi kiri | kandidat kanan, selaras waktu): `pabrik/kandidat/UIActionScript/lembar-r2.jpg`

## Putaran 3: GAGAL

Dosa terpicu: j, o, q

Temuan:
- DOSA j: f3: 'Media' tertutup 100%; f3: 'klip-01' tertutup 100%; f3: 'klip-02' tertutup 100%; f3: 'Cerita Awal' tertutup 100%; f3: '100%' tertutup 100%
- DOSA o: f3: lapisan non-teks di atas 'Media' (100% titik); f3: lapisan non-teks di atas 'klip-01' (100% titik); f3: lapisan non-teks di atas 'klip-02' (100% titik); f3: lapisan non-teks di atas 'Cerita Awal' (100% titik); f3: lapisan non-teks di atas '100%' (100% titik)
- DOSA q: vision baris 3 (f74): Sapuan sel grid biru (x≈660–840, y≈622–700) menutupi 'tambah musik dan sfx' di kotak prompt. Sebagian huruf ('tambah', 'musik') berada di bawah blok biru dan kontrasnya turun. Label 'Sedang' juga tertutup sel.
- struktur selaras waktu 0.125 < max(0.15, tak-selaras 0.108)

| Metrik | Nilai |
|---|---|
| banding F1 terpicu / F3 jarang (dari 4 still) | 0 / 0 |
| fokus kecil-tengah, sampel berturut maks | 0 dari 52 |
| probe (39 frame): teks kecil / tabrakan / tertutup-j / lapisan-o / tak terlihat | 0 / 0 / 253 / 253 / 0 |
| warna: nyasar (cek-warna) / luar palet / kulit bocor | 0 / 0 / 0 |
| struktur vs referensi | paired 0.1251 vs tak-selaras 0.108 (n 8) |
| gerak (permukaan_ui) | frame berubah 0.437; korelasi energi vs klip -0.079 |
| latar | {"dipakai": false} |
| dua token (edge / ssim / selisih piksel) | 0.9572 / 0.8138 / 32.75 |

5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):
1. Wallpaper baris 1 adalah gradien biru datar dengan siluet gunung vektor, sedangkan referensi memakai foto matahari terbenam yang kaya tekstur. Itu yang membuat UI terasa mengambang di atas dunia nyata. Ganti dengan foto atau render lanskap dengan detail, jenuh, dan hangat, supaya kontras gelap-terang dengan UI kembali.
2. Jendela UI di baris 1 hanya sedikit lebih gelap daripada latar biru, jadi pemisahan nada lemah. Di referensi, UI hampir hitam melawan oranye cerah. Turunkan luma jendela dan naikkan kecerahan wallpaper agar jendela terbaca sebagai satu objek.
3. Baris 2 dan 3 (punch): wallpaper hampir hilang. Hanya pita biru tipis di kanan atas, dan dock terpotong separuh di bawah. Konteks desktop yang diminta (tepi kanan jendela, wallpaper kanan, sebagian dock) terlalu sedikit dibanding referensi, yang masih memperlihatkan gunung dan dock. Kurangi skala punch atau geser pusat kamera agar lebih banyak wallpaper terlihat.
4. Sapuan grid di baris 3 memakai sel biru-ungu dari palet UI, bukan warna hangat dari foto seperti di referensi (oranye-amber). Selnya persegi datar dan buram, tanpa gradasi, sehingga terlihat seperti kotak kosong yang menutup teks, bukan sapuan cahaya. Ambil warna sel dari tone wallpaper, tambahkan variasi opasitas per sel, dan jangan biarkan sel menutup kata kunci.
5. Isi UI terlalu sederhana dan seragam di baris 1: panel Media dan Inspector berupa kotak biru polos, thumbnail 'Cerita Awal' hanyalah gunung vektor, dan timeline berisi balok datar. Referensi punya UI editor nyata dengan thumbnail video, waveform, dan panel yang padat. Tambahkan thumbnail berbeda, detail panel, dan waveform agar UI terbaca sebagai aplikasi sungguhan.

Lembar side-by-side (referensi kiri | kandidat kanan, selaras waktu): `pabrik/kandidat/UIActionScript/lembar-r3.jpg`
