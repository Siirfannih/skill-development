# Laporan uji WorldStage

Spec: `63-T1` (gerak_kamera). Lulus = nol dosa (skrip + vision + jangkar) DAN metrik keras dalam ambang (`uji.py` AMBANG).

## Putaran 1: GAGAL

Dosa terpicu: g, j, j3, o, r

Temuan:
- DOSA g: vision: Baris 1: tiga bar gelap polos di dalam jendela, kotak persegi kosong di sisi kiri, dan bar panjang di bawah, semuanya pengganti konten. Garis abu horizontal pengganti teks ada di panel kanan atas pratinjau. Baris 2: bar kosong 'Musik' di baris bawah timeline dan bar abu panjang paling bawah. Baris 3 dan 4: tombol abu kosong di pojok kanan atas dan kartu putih kosong di kanan bawah.
- DOSA j: f3: 'K' tertutup 100%; f3: 'P' tertutup 100%; f3: 'T' tertutup 100%; f3: 'M' tertutup 100%; f3: 'S' tertutup 100%
- DOSA j3: jangkar j3 (zona biru selalu di pojok kanan bawah ya...): Zona biru terang selalu menumpuk di sisi kanan dan bawah pada baris 1 dan 2. Pada baris 3 dan 4 panel dan blok biru tetap ada di pojok kanan. Objek terlalu kecil: kartu atau jendela UI di baris 1 dan 2 berisi teks mikro yang sulit dibaca.
- DOSA o: f3: lapisan non-teks di atas 'K' (100% titik); f3: lapisan non-teks di atas 'P' (100% titik); f3: lapisan non-teks di atas 'T' (100% titik); f3: lapisan non-teks di atas 'M' (100% titik); f3: lapisan non-teks di atas 'S' (100% titik)
- DOSA r: vision baris 2 (f52): Dua bar 'Pembuka' dan 'Wawancara' bertumpuk di timeline. Dock memotong pojok kiri bawah wallpaper biru dengan bentuk miring.
- gerak RMS 0.3491 > 0.15
- gerak rasio durasi 0.173 di luar 0.5-2.0

| Metrik | Nilai |
|---|---|
| banding F1 terpicu / F3 jarang (dari 4 still) | 0 / 0 |
| fokus kecil-tengah, sampel berturut maks | 0 dari 60 |
| probe (44 frame): teks kecil / tabrakan / tertutup-j / lapisan-o / tak terlihat | 0 / 0 / 7 / 7 / 0 |
| warna: nyasar (cek-warna) / luar palet / kulit bocor | 0 / 0 / 0 |
| struktur vs referensi | paired 0.1572 vs tak-selaras 0.1428 (n 8) |
| gerak (gerak_kamera) | frame berubah 0.387; lintasan {"rms": 0.3491, "rasio_durasi": 0.173, "durasi": 0.433, "n_segmen": 3}; korelasi energi vs klip -0.123 |
| latar | {"dipakai": false} |
| dua token (edge / ssim / selisih piksel) | 0.9785 / 0.8715 / 36.37 |

5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):
1. Wallpaper adalah blok biru periwinkle datar di baris 1 dan 2. Referensi memakai foto matahari terbenam yang kaya tekstur dan gradasi, sehingga latar kandidat terlihat seperti kertas warna. Ganti dengan wallpaper bergradasi bertekstur, atau gradien bertitik cahaya yang jelas.
2. Jendela UI di baris 1 dan 2 berisi kotak abu, bar polos, dan garis tipis yang tidak berarti. Referensi menampilkan editor video nyata dengan timeline, thumbnail, dan kontrol. Isi jendela dengan konten yang spesifik, misalnya thumbnail klip, waveform, dan label track nyata.
3. Dock di bawah jendela memakai kotak berhuruf tunggal (K, P, M, S, A) dengan warna biru dan hitam bergantian. Ini terlihat seperti placeholder, sedangkan referensi punya ikon aplikasi berwarna, berbayang, dan dikenali. Buat ikon dengan bentuk dan warna khas serta bayangan halus.
4. Transisi grid piksel di baris 1 berupa blok besar berukuran tidak seragam dan menutup sisi kanan jendela. Referensi memakai kisi kecil seragam yang menyapu dan menembus konten dengan lembut. Perkecil sel hingga seragam, sapu dari kiri ke kanan dengan tepi bergelombang rapi, dan jangan tumpuk di atas jendela.
5. Baris 3 dan 4 hampir identik: kartu prompt 'Buat latar lebih hangat' di latar navy datar, ditambah kotak kosong di kanan. Punch referensi tetap memperlihatkan konteks (foto, dock, ikon) di sekitar teks dan ada progres antar frame. Pertahankan wallpaper dan elemen UI di sekitar target punch, dan beri perubahan visual yang jelas, misalnya teks diketik atau efek hangat muncul.

Lembar side-by-side (referensi kiri | kandidat kanan, selaras waktu): `pabrik/kandidat/WorldStage/lembar-r1.jpg`

## Putaran 2: GAGAL

Dosa terpicu: f, g, j, q, r

Temuan:
- DOSA f: vision: Baris 2 dan 3: teks jendela 'Studio Klip' dan isi timeline sangat kecil, sehingga detail kecil (label Skala/Posisi/Opasitas, V1/V2/A1) berada di batas terbaca. Teks asisten di baris 2 juga terpotong tepi kiri ('Asisten', 'ambah subjudul'). Ini bukan blur sebenarnya, hanya detail kecil yang tidak tajam saat dibaca. Karena tidak ada blur nyata, jawaban ini lemah dan ragu mengarah ke Tidak.
- DOSA g: vision: Baris 1: tiga garis abu tipis horizontal di kanan jendela (x~745-860, y~72-125) berfungsi sebagai pengganti teks. Dua tombol biru kosong tanpa label di y~160 dan satu bar gelap kosong di y~177. Dock memuat kotak-kotak polos tanpa ikon di baris 1 dan hampir semua ikon dock tak bermakna. Baris 4: kotak putih kosong di kanan bawah (x~915-965, y~1010-1055).
- DOSA j: f8: teks ada di DOM tetapi selisih render penuh vs tanpa-teks 0.0
- DOSA q: vision baris 4 (f104): Kanan atas: 'V1 V2 A1' terpotong tepi frame dan sebagian tertimpa panel gelap. Kotak putih kosong di kanan bawah memotong tepi frame.
- DOSA r: vision baris 4 (f104): Frame punch berisi potongan tak terbaca: label 'V1 V2 A1' raksasa di pojok kanan atas dan kotak putih terpotong di kanan bawah, dengan strip biru dan abu tipis di tepi kiri-tengah (x~900-915). Tidak ada konteks UI yang tersisa, wallpaper tidak terlihat.
- gerak RMS 0.3127 > 0.15
- gerak rasio durasi 0.293 di luar 0.5-2.0

| Metrik | Nilai |
|---|---|
| banding F1 terpicu / F3 jarang (dari 4 still) | 0 / 0 |
| fokus kecil-tengah, sampel berturut maks | 0 dari 60 |
| probe (44 frame): teks kecil / tabrakan / tertutup-j / lapisan-o / tak terlihat | 0 / 0 / 0 / 0 / 1 |
| warna: nyasar (cek-warna) / luar palet / kulit bocor | 0 / 0 / 0 |
| struktur vs referensi | paired 0.1555 vs tak-selaras 0.1417 (n 8) |
| gerak (gerak_kamera) | frame berubah 0.513; lintasan {"rms": 0.3127, "rasio_durasi": 0.293, "durasi": 0.733, "n_segmen": 3}; korelasi energi vs klip -0.28 |
| latar | {"dipakai": false} |
| dua token (edge / ssim / selisih piksel) | 0.9914 / 0.8149 / 46.02 |

5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):
1. Baris 1, jendela 'Studio Klip': isinya hanya waveform dan tiga garis abu serta dua bar kosong tanpa teks. Referensi punya editor video nyata dengan timeline, preview wajah, dan panel properti. Perbaikan: isi garis dan bar itu dengan label dan data nyata, dan beri preview berisi konten.
2. Baris 1-3, wallpaper: ungu-biru datar dengan dua pita diagonal putih. Referensi memakai foto senja berdetail dengan matahari, gunung, dan bunga, jadi ada kedalaman dan nada hangat yang menjadi lawan UI gelap. Perbaikan: beri wallpaper tekstur, titik fokus, dan gradasi bernada sedang yang bervariasi, bukan dua pita yang sama sepanjang frame.
3. Baris 1 dan 2, dock: kapsul putih dengan kotak-kotak persegi polos berwarna biru atau hitam. Dock referensi punya ikon aplikasi nyata dengan bentuk dan warna beragam (kalender 'JUL 17', Finder). Perbaikan: ganti kotak dengan ikon bermakna dengan siluet berbeda, kedalaman, dan kecerahan yang beragam.
4. Baris 2 dan 3, panel Asisten: dipotong tepi kiri frame (huruf awal hilang), tanpa pemisah jelas dari jendela, dan tekstur terlihat seperti strip polos. Di referensi panel masuk menggeser jendela dengan ruang jelas dan teks utuh. Perbaikan: beri margin kiri dan geser jendela lebih jauh agar panel utuh, dengan batas atau bayangan.
5. Baris 4, frame punch: layar hampir kosong, dengan satu kotak input gelap besar dan potongan 'V1 V2 A1' raksasa di pojok. Punch referensi (grid blok piksel hangat yang menutup sebagian teks) tetap menampilkan konteks wallpaper dan dock. Perbaikan: arahkan pivot ke detail UI yang punya isi (kurva, nilai, klip), bukan teks label kosong, dan pertahankan sedikit wallpaper agar nada tetap terbaca.

Lembar side-by-side (referensi kiri | kandidat kanan, selaras waktu): `pabrik/kandidat/WorldStage/lembar-r2.jpg`

## Putaran 3: GAGAL

Dosa terpicu: g, q

Temuan:
- DOSA g: vision: Baris 1-3: grafik 'Pratinjau' hanya satu kurva ease di kotak navy kosong, tanpa preview video. Ini kotak pengganti preview. Baris 2-3: kolom kiri 'Asisten' kosong di tengah. Track V1/V2/A1 berupa balok biru berlabel dan waveform batang seragam, yang terbaca sebagai stand-in dari timeline Premiere di referensi. Ragu: sebagian ini bisa dibaca sebagai desain minimal sengaja, tapi preview kosong jelas terlihat.
- DOSA q: vision baris 4 (f104): Punch zoom memotong panel kanan: label 'V1 V2 A1' terpotong di tepi atas kanan. Jendela hanya terlihat sebagian dan ikon dock terpotong di tepi bawah (tombol putar terpotong di x=966). Tepi frame memotong konten UI. Teks di kolom kiri utuh.
- struktur selaras waktu 0.134 < max(0.15, tak-selaras 0.124)
- gerak RMS 0.3331 > 0.15
- gerak rasio durasi 0.253 di luar 0.5-2.0

| Metrik | Nilai |
|---|---|
| banding F1 terpicu / F3 jarang (dari 4 still) | 0 / 0 |
| fokus kecil-tengah, sampel berturut maks | 0 dari 60 |
| probe (43 frame): teks kecil / tabrakan / tertutup-j / lapisan-o / tak terlihat | 0 / 0 / 0 / 0 / 0 |
| warna: nyasar (cek-warna) / luar palet / kulit bocor | 0 / 0 / 0 |
| struktur vs referensi | paired 0.1341 vs tak-selaras 0.1239 (n 8) |
| gerak (gerak_kamera) | frame berubah 0.513; lintasan {"rms": 0.3331, "rasio_durasi": 0.253, "durasi": 0.633, "n_segmen": 3}; korelasi energi vs klip -0.338 |
| latar | {"dipakai": false} |
| dua token (edge / ssim / selisih piksel) | 0.987 / 0.745 / 42.46 |

5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):
1. Latar low-poly biru-ungu (seluruh frame kanan, semua baris) adalah wallpaper stok generik. Referensi memakai foto matahari terbenam yang hangat dan kaya, dengan kedalaman yang nyata. Ganti dengan satu gradien foto atau mesh halus dan hangat bernada sedang, dan kurangi faset kontras tinggi yang berebut perhatian dengan UI.
2. Kotak 'Pratinjau' di jendela Studio Klip (baris 1-3, kiri atas jendela) hanya berisi satu kurva ease di kotak kosong. Referensi menampilkan potret orang di tengah editor, jadi ada subjek. Isi dengan thumbnail atau frame video yang jelas, atau hapus kotak itu dan perbesar timeline.
3. Timeline V1/V2/A1 (baris 1-3, bawah jendela) memakai balok biru datar dengan waveform batang seragam, tanpa playhead, ruler, atau variasi lebar klip. Itu terbaca sebagai ilustrasi, bukan editor sungguhan. Tambahkan playhead, penanda waktu, dan variasi tinggi dan warna track.
4. Dock (baris 1-3, bawah jendela) berisi enam tombol bulat, kotak, dan segitiga monokrom dengan sudut putih. Referensi memakai ikon aplikasi berwarna dan bertekstur. Ganti dengan ikon yang beridentitas, ukuran konsisten, dan bayangan halus. Sekarang ikon-ikon itu terlihat seperti kontrol media bawaan.
5. Panel 'Asisten' di baris 2-3 (kolom kiri) menyisakan ruang kosong besar di antara header dan bubble chat, dan bubble-nya mengambang di bawah tanpa alur percakapan. Referensi memakai panel gelap dengan satu input di dasar. Rapatkan percakapan, tambah satu atau dua pesan agar panel terisi, dan beri margin yang rapi. Selain itu transisi grid piksel yang diharapkan tidak muncul sama sekali di baris 4, jadi punch terlihat sebagai crop kasar.

Lembar side-by-side (referensi kiri | kandidat kanan, selaras waktu): `pabrik/kandidat/WorldStage/lembar-r3.jpg`
