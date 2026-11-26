# Laporan uji WorldStage

Spec: `63-T1` (gerak_kamera). Lulus = nol dosa (skrip + vision + jangkar) DAN metrik keras dalam ambang (`uji.py` AMBANG).

## Putaran 1: GAGAL

Dosa terpicu: a, f, g, j

Temuan:
- DOSA a: banding.py F1 gradien ragu-ragu di frame [4]
- DOSA f: vision: Baris 1: judul 'Rencana produksi' dan daftar 1-3 di atas latar krem kabur total, padahal itu konten yang harus dibaca. Baris 2: teks 'Obrolan Pagi' dan 'Wawancara' di dalam jendela kabur dan nyaris tak terbaca.
- DOSA g: vision: Baris 2 (frame 14): jendela berisi kisi garis hitam dan putih sebagai pengganti isi, jadi tampak sebagai kotak kosong bergaris. Baris 3: kotak 'Asisten' kiri berisi hampir hanya ruang kosong krem, dan kolom kiri bawah di baris 4 juga kosong.
- DOSA j: f91: 'Ganti warna latar ' x '↑'
- gerak RMS 0.3445 > 0.15
- gerak rasio durasi 0.247 di luar 0.5-2.0

| Metrik | Nilai |
|---|---|
| banding F1 terpicu / F3 jarang (dari 4 still) | 1 / 0 |
| fokus kecil-tengah, sampel berturut maks | 0 dari 53 |
| probe: teks kecil / tabrakan / terpotong | 0 / 1 / 2 (frame [4, 14, 53, 91]) |
| warna luar palet | tidak ada |
| struktur vs referensi (terbaik; rata-rata per ref; n ref) | 0.4118 (ssim 0.5515, edge 0.272; frame 4 vs `guide/referensi/sheets/keyframes/63-k4-kartu-ui-gelap.jpg`); 0.2259; 8 |
| gerak (gerak_kamera) | frame berubah 0.433; lintasan {"rms": 0.3445, "rasio_durasi": 0.247, "durasi": 0.617, "n_segmen": 2} |
| dua token (edge / ssim / selisih piksel) | 0.8489 / 0.5402 / 122.74 |

5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):
1. Baris 1 (frame 4): kartu krem polos berisi 'Rencana produksi' tampil kabur di seluruh area. Referensi di kiri menampilkan UI gelap yang tajam dan utuh. Perbaikan: tajamkan teks sebelum transisi dimulai, dan pertahankan UI gelap sebagai frame pembuka sesuai mekanik.
2. Baris 2 (frame 14): grid blok piksel yang seharusnya menyapu ±0,25 dtk dari kiri ke kanan tampil sebagai kisi garis hitam dan putih di atas jendela. Itu terlihat seperti tabel, bukan blok piksel yang menyapu. Referensi memakai blok berwarna yang menyatu dengan isi frame. Perbaikan: pakai blok persegi kecil berwarna sesuai palet, dengan wipe terarah.
3. Baris 2 (frame 14): teks 'Obrolan Pagi' dan tombol 'Wawancara' tertimbun grid dan hampir tak terbaca. Perbaikan: turunkan opasitas grid di atas konten, atau urutkan transisi supaya konten tidak tertimpa.
4. Baris 3 (frame 53): jendela editor hanya berisi lima kotak warna datar (Intro, Wawancara, Penutup) dan daftar teks. Referensi menampilkan UI editor video dengan timeline berlapis, panel properti, dan pratinjau. Perbaikan: tambahkan detail UI nyata seperti baris track, playhead, dan thumbnail supaya punch-in punya sesuatu untuk ditunjukkan.
5. Baris 4 (frame 91): hasil punch 'Intro' dan tombol 'K' terpotong tepi, dan teks krem yang terpotong ('nti warna latar jadi biru, rbesar judul') tidak membentuk kalimat utuh. Referensi menampilkan UI utuh dengan dock rapi. Perbaikan: pilih pivot punch yang menjaga satu elemen lengkap di frame, dan pakai teks input yang tidak terpotong di tengah kata.

Lembar side-by-side (referensi kiri | kandidat kanan): `pabrik/kandidat/WorldStage/lembar-r1.jpg`

## Putaran 2: GAGAL

Dosa terpicu: g, j2

Temuan:
- DOSA g: vision: Baris 3: kotak input putih di panel kiri kosong (hanya 'Model utama' kecil) di atas panel krem yang lebih lapang. Pratinjau video 'Obrolan Pagi' di jendela editor (baris 2-3) hanya kotak gelap berteks, tanpa gambar video.
- DOSA j2: jangkar j2 (gradien pucat ragu-ragu, halo di belakan...): Baris 3 kiri: teks abu kecil 'Klip sudah di timeline. Bagian mana yang mau diubah?' di panel krem hampir putih, kontras lemah. Baris 4: 'Episode 12', 'Suara', 'Video' abu pucat di latar ungu gelap. Ini pola teks abu di latar pucat seperti j2.
- gerak RMS 0.2994 > 0.15
- gerak rasio durasi 0.227 di luar 0.5-2.0

| Metrik | Nilai |
|---|---|
| banding F1 terpicu / F3 jarang (dari 4 still) | 0 / 0 |
| fokus kecil-tengah, sampel berturut maks | 1 dari 56 |
| probe: teks kecil / tabrakan / terpotong | 0 / 0 / 2 (frame [2, 14, 53, 91]) |
| warna luar palet | tidak ada |
| struktur vs referensi (terbaik; rata-rata per ref; n ref) | 0.431 (ssim 0.5714, edge 0.2906; frame 2 vs `guide/referensi/sheets/keyframes/63-k4-kartu-ui-gelap.jpg`); 0.2207; 8 |
| gerak (gerak_kamera) | frame berubah 0.459; lintasan {"rms": 0.2994, "rasio_durasi": 0.227, "durasi": 0.567, "n_segmen": 1} |
| dua token (edge / ssim / selisih piksel) | 0.8779 / 0.6764 / 57.38 |

5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):
1. Baris 2, panel wipe kuning translusen dengan garis kisi merah menutupi separuh kanan jendela, termasuk 'Obrolan Pagi' dan 'Narasi pembuka dan wawancara'. Teks ikut pudar, 'Ekspor' dan 'Penutup' kuning-di-kuning hilang, dan kisinya berupa garis tipis, bukan blok piksel seperti referensi. Perbaikan: wipe berupa blok kotak solid kecil yang menyapu dari kiri ke kanan, dan teks jendela tidak boleh tertutup overlay.
2. Baris 1, kartu pembuka 'Rencana produksi' hanya judul serif dan tiga baris abu rata kiri di latar ungu-hitam datar. Tidak ada objek, tidak ada kedalaman, dan daftarnya terlihat seperti slide PowerPoint. Perbaikan: ganti dengan satu tipografi besar, atau UI gelap sungguhan seperti referensi (bar tab, kartu, kursor), dengan latar bergradasi dan teks utama putih.
3. Baris 3 kiri, panel chat krem lebar ±0,4 frame hampir kosong. Ada tiga baris abu kecil, satu kotak input kosong, dan ruang mati sampai tepi atas. Ini tidak terasa seperti panel yang 'memberi ruang' dan tidak seimbang dengan jendela yang terpotong di kanan. Perbaikan: panel sempit ±0,18 frame, isi dengan pesan dan jawaban nyata, dan gelap seperti jendela utama.
4. Baris 3 kanan, wallpaper pegunungan oranye yang sama dengan baris 2 dipotong oleh jendela yang terdorong sampai tepi kanan. Jendela terpotong, padahal seharusnya tetap utuh dan hanya bergeser ±0,18 frame. Dock 'K P F V M C A' yang berupa huruf di kotak warna terlihat mainan dibanding dock ikon di referensi. Perbaikan: geser lebih sedikit dan ganti dock dengan ikon bergaya satu keluarga.
5. Baris 4 punch, zoom ke timeline memotong 'Suara' dan 'Judul' di tepi atas dan menyisakan panel krem putih yang terpotong di kiri. Pivot-nya tidak ke sudut ruang kerja yang berisi detail UI. Isi UI-nya terlalu sedikit (dua klip dan satu trek suara) sehingga detail terasa kosong, dan 'Episode 12' abu pucat kontrasnya rendah. Perbaikan: zoom ke sudut dengan detail padat (waveform, penanda waktu, ikon) dan naikkan kontras teks sekunder.

Lembar side-by-side (referensi kiri | kandidat kanan): `pabrik/kandidat/WorldStage/lembar-r2.jpg`

## Putaran 3: GAGAL

Dosa terpicu: j

Temuan:
- DOSA j: f2: 'Rencana' x 'produksi'
- gerak RMS 0.5196 > 0.15
- gerak rasio durasi 0.187 di luar 0.5-2.0

| Metrik | Nilai |
|---|---|
| banding F1 terpicu / F3 jarang (dari 4 still) | 0 / 0 |
| fokus kecil-tengah, sampel berturut maks | 0 dari 56 |
| probe: teks kecil / tabrakan / terpotong | 0 / 1 / 2 (frame [2, 14, 60, 95]) |
| warna luar palet | tidak ada |
| struktur vs referensi (terbaik; rata-rata per ref; n ref) | 0.3679 (ssim 0.4579, edge 0.2778; frame 2 vs `guide/referensi/sheets/keyframes/63-k4-kartu-ui-gelap.jpg`); 0.2017; 8 |
| gerak (gerak_kamera) | frame berubah 0.532; lintasan {"rms": 0.5196, "rasio_durasi": 0.187, "durasi": 0.467, "n_segmen": 2} |
| dua token (edge / ssim / selisih piksel) | 0.9206 / 0.6978 / 42.04 |

5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):
1. Frame 2 hanya slide teks datar: judul serif 'Rencana produksi' menempel di kiri atas, tab 'Naskah/Klip/Suara' terpotong di tepi atas, dan sekitar 40% kanan-bawah kosong. KIRI menampilkan kartu UI gelap utuh di tengah dengan ruang napas. Perbaikan: render kartu UI gelap yang sama di tengah frame (±0,6 lebar), jangan slide teks tepi-ke-tepi.
2. Dock di frame 14 dan 60 berisi kotak berwarna polos tanpa glyph, cuma lingkaran, persegi dan belah ketupat, jadi terbaca sebagai ikon placeholder. Dock KIRI punya ikon aplikasi asli yang bisa dikenali. Perbaikan: beri glyph yang bermakna (gunting, play, mic, folder) pada tiap ikon dan kecilkan outline krem tebalnya.
3. Wallpaper frame 14 adalah ilustrasi vektor datar (bukit ungu, matahari lingkaran) dan bagian atasnya jatuh ke oranye polos. Wallpaper KIRI adalah foto senja bertekstur dengan awan dan detail. Karena itu pemisahan nada terasa seperti poster clip-art. Perbaikan: tambah tekstur, grain dan lapisan kedalaman, atau pakai foto, dengan kontras yang lebih jelas terhadap jendela.
4. Frame 60 memotong jendela di tepi kanan dan panel 'Asisten' di kiri adalah blok gelap datar yang menutup wallpaper, tanpa bayangan atau pemisah. Jendela tampak terdorong keluar frame, tidak diberi ruang. KIRI menjaga jendela dan dock utuh. Perbaikan: geser jendela ±0,18 lebar frame sambil mengecil ke ±0,91x supaya tetap utuh, dan beri panel tepi serta bayangan lembut.
5. Punch di frame 95 mendarat pada potongan acak: 'Obrolan Pa' terpotong di tepi kanan, label merah raksasa, sisa panel kiri dengan satu tombol panah merah, dan pita ungu kosong di bawah. Tidak ada detail UI yang jelas ditonjolkan. Di frame 14 ada juga tambalan kotak piksel pudar di kanan atas yang tampak seperti artefak. Perbaikan: pivot punch di satu elemen utuh (timeline atau label) dengan margin, dan buat wipe grid kontras serta menyapu penuh dari kiri ke kanan.

Lembar side-by-side (referensi kiri | kandidat kanan): `pabrik/kandidat/WorldStage/lembar-r3.jpg`
