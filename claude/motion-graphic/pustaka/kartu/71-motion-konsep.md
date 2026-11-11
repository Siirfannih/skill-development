# 71 · Konsep motion: perkenalan motion designer lewat komponen UI, thekrishray (file "Motionkonsep.mp4")

> **Status: standar kualitas Irfan.** Video ini target yang harus dicapai, bukan contoh opsional.
> Sumber: https://www.instagram.com/reel/DcnW2OZzyT4/ (@thekrishray), file `pustaka-video/mac/Motionkonsep.mp4` · 1:1 (720×720), 30 fps, 33,7 dtk · reference_id DcnW2OZzyT4 · Frame: `../../guide/referensi/sheets/71-motion-konsep.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/71-k*.jpg` · Bedah lengkap: `ukuran.md` (data mentah)
> Kedalaman bedah: **dalam**
> **Video yang sama dengan kartu 42** (`42-thekrishray-perkenalan-ui.md`, sedang) **dan kartu 09** (`09-thekrishray.md`, tipis). Kartu ini menambah angka piksel, audio, dan kamera; urutan adegan rinci tetap di kartu 42.

**DNA (satu kalimat):** Tiap kalimat VO menjadi satu komponen UI bergaya iOS (pil, kartu slider, kolom chat, gelembung pesan, carousel, kalender) yang muncul dengan bunyi UI, didorong kamera yang terus mendekat dan menyapu dengan motion blur berat, lalu ditutup teks kinetik per kata di latar hitam.
**Cocok untuk:** perkenalan diri/jasa, cerita perjalanan kreator, promo aplikasi tanpa wajah · **Tidak cocok untuk:** talking head, topik serius/korporat yang butuh tenang
**Kata kunci gaya:** UI sebagai cerita, iOS bersih, biru, kinetik, motion blur, morph
**Diambil untuk:** nama file "Motionkonsep.mp4" = konsep motion → **Motion graphic** dibedah paling dalam (bagian 5 dan 6), lalu teks.

## PENGIKAT (diambil utuh dari SATU kiblat; ini yang membuat video terasa satu keluarga)

### 1. Warna & tekstur
- Tiga latar bergiliran: putih nyaris murni `#FCFCFC` (±60 % durasi), biru langit gradien `#579FF4`–`#6EACF5` (0:02–0:04) dan `#FCFCFE`→`#B6DFF5` atas-ke-bawah (carousel), gelap `#000002` dengan cahaya biru `#05203B` di kiri-bawah (chat) atau emas `#886000`→`#1D1501` dari atas (0:07–0:09), hitam `#000000` (penutup).
- Aksen utama satu biru iOS: pil `#2284F3`, gelembung `#0B80F1`, tombol `#73A5EC`. Aksen sekunder per kata: merah-pink `#EC5E70` ("making"), magenta `#DF4B5D` ("designer"), biru `#4C85F0`/`#1497D3` ("posting", "exciting"), ungu `#1815DD` + pita `#8C6CF1` (kalender), kuning kursor `#C89F0C`.
- Tekstur: tidak ada grain atau kertas. Kedalaman datang dari glow lunak biru `#C9E0FC` di sekitar kartu, bayangan halus, dan blur gerak.
- Tidak ada footage; tidak ada grade.

### 2. Teks
- Font paling mirip: SF Pro Display (atau Inter) Semibold–Bold untuk narasi; SF Pro Regular di dalam UI (chat, label). Tidak ada serif. Tidak terukur: nama font pasti (dibaca dari bentuk huruf).
- Teks narasi: satu kalimat sebaris, SATU ukuran per kalimat; kata kunci dibedakan WARNA, bukan ukuran. Tinggi huruf besar 5–8,6 % tinggi frame; x-height 3,8–6,8 %.
- Satu kata sendirian paling besar: "client" 8,6 %, "land", "my" (0:25–0:26), satu kata per tampil.
- Teks di dalam UI kecil: chat 2,8 %, gelembung 2,8 %, label kartu 3,4 %, angka pil 6,5 %.
- Posisi: pusat horizontal (x 49–53 %), y 43–52 %; di atas objek bila ada objek (carousel: judul y 32 %, ubin di bawahnya; kartu: judul y 33 %). Teks dikelilingi emoji/ikon kecil (0:00–0:04).
- 2–6 kata per tampil; penutup memakai kalimat lebar yang meluber keluar frame (lebar 84–100 %) dan bergulir ke kiri.
- Masuk per kata: tiap kata naik/turun dari offset vertikal dengan blur dan glow warna, lalu jatuh ke baseline (0:00,5 "Hey I'm a motion designer."). Ketik dengan kursor di chat dan di layar emas. Keluar: blur gerak bersama kamera, bukan fade.

### 3. Ritme
- `pace_read.py`: 11 cut = 19,6/menit, shot median 1,3 dtk, event visual 41/menit, gerak layar 4,0.
- Cut keras sebenarnya hanya 8 (ffmpeg scene > 0,25: 1,9 · 7,3 · 15,8 · 24,4 · 24,8 · 25,6 · 30,0 · 31,0); sisanya pergantian dalam shot lewat morph dan sapuan kamera.
- Lambat di tengah (chat 7,4–15,8 dtk, satu shot 8,5 dtk dengan pan terus); cepat di 24–26 dtk (satu kata per 0,4 dtk, potong hitam/putih bergantian).

## TEKNIK (boleh dipinjam referensi lain; selalu dikenakan pengikat kiblat)

### 4. B-roll / footage
- Tidak ada. Seluruhnya grafik vektor/UI. Ikon aplikasi Apple dan emoji Apple sebagai "foto" pengganti.

### 5. Motion graphic
- Tiap kalimat = satu komponen UI yang memerankan isinya: "challenging myself" = pil hitam dikelilingi 10 ikon aplikasi; "video editing" = kartu slider "−1000 $ +"; "I've been doing what I enjoy" = prompt chat AI yang diketik + dropdown "Right now / I have / zero clients"; "No audience / No agency / behind me" = segmented control; "obsession with creating better videos" = gelembung iMessage + "Read 3:15 PM"; "posting on" = carousel IG → X → YouTube dengan kursor tangan; "15 … ?" = kalender dengan pita sorot menuju tanda tanya.
- Satu komponen berubah jadi komponen berikutnya (pil buram → kartu; chat → segmented control → gelembung), jadi mata tidak pernah kehilangan objek.
- Watak gerak: pegas cepat (scale-in dengan overshoot), blur gerak sangat berat saat bergerak, diam singkat saat dibaca.
- **Skala subjek:** SATU objek besar di tengah: kartu 56×52 %, kotak chat 82×33 % (meluber ke kanan), gelembung 55×28 %, ubin carousel ±30×27 %, kalender meluber penuh; ikon orbit: cincin 64×62 % berisi ±10 ikon kecil 7–8 %.
- **Kedalaman:** 2 lapis (latar gradien/rata + objek UI) + glow halo di belakang objek; blur dipakai sebagai kedalaman waktu (objek yang datang/pergi buram), bukan depth of field. Tidak ada lapisan depan, tidak ada paralaks.

### 6. Kamera & transisi
- Kamera virtual hampir tidak pernah diam (ORB affine antar 0,5 dtk): push-in 1,11–1,33× per 0,5 dtk saat objek baru masuk (1,0 · 2,5 · 6,0–6,5 · 19,0 · 28,0 dtk), lalu pull 0,56× (7,0 dtk) → zoom-through.
- Pan mengikuti kursor ketik di chat: 2–10 % lebar per 0,5 dtk ke kiri (10,0–12,0), lalu naik 3–15 % ke dropdown.
- Whip-pan: 39–70 % lebar per 0,5 dtk dengan blur gerak penuh (15,5 dtk ke gelembung; 28,5–29,0 dtk di kalender).
- Transisi: morph objek (utama), whip-pan berblur, zoom-through ke objek, cut keras putih↔hitam pada kata (24–26 dtk). Pemicu: kata VO baru.

### 7. SFX
- earshot: 221 event (6,6/dtk), bertag 19 UI (ding/pop), 14 hit, 14 nada glockenspiel, 4 ketik, 4 whoosh, 2 riser.
- Kosakata: pop/ding tiap komponen muncul, ketik tombol saat chat, whoosh pada whip-pan, riser/reverse cymbal sebelum babak kinetik (22,5 dtk), ding penutup.
- Level: puncak SFX −4 s/d −5 dBFS, setara puncak suara (−5 s/d −7 dBFS); SFX tidak disembunyikan di bawah VO.

### 8. Musik
- Glitch hop → trap beat dengan vocal chop (earshot), ±136–140 bpm (librosa 136; earshot 140, pulse lemah 0,16).
- Babak: 0–7,6 glitch hop; 7,6–27,3 trap beat; 27,3–33,6 tipis, ditutup drop sunyi 1,4 dtk (−49 dB di 32 dtk).
- Mix −14,2 LUFS, true peak +1,6 dBTP (stereo, ada over), LRA 2,8 LU: padat dan keras.

## Proporsi terukur (11 Nov, dari video sumber 720×720; % terhadap frame 1:1)

| Jenis adegan | Kata kunci (% tinggi) | Kata sambung | Posisi teks | Skala subjek | Kedalaman |
|---|---|---|---|---|---|
| Teks + emoji (k1) | 5,0 (semua kata sama) | sama; beda warna saja | tengah, y 43 %, lebar 75 % | 4 emoji kecil ±5 % di sudut blok | putih rata + objek |
| Pil gradien (k2) | 5,8 | sama | tengah, y 47 % | bintang kecil 3–6 % mengapit | gradien biru + teks |
| Kartu UI (k3) | angka 6,5 | label 3,4 | judul di atas pil (y 33 %), angka y 50 % | kartu 56×52 % | putih + glow `#C9E0FC` + kartu |
| Chat gelap (k4) | 2,8 (tidak ada beda ukuran) | sama; kata kunci biru | dalam kotak, y 50 % | kotak 82×33 %, meluber kanan | gelap + cahaya biru sudut |
| Gelembung (k5) | 2,8 | "Read" 1,7 | dalam gelembung, kanan | 2 gelembung 55×28 % | putih + objek |
| Carousel (k6) | 5,4 | sama | judul di atas ubin, y 32 % | ubin ±30×27 % + 2 tombol | gradien terang→biru |
| Kalender pan (k7) | angka 6,5 | sama | grid penuh frame | lingkaran ungu 18 % | putih + pita sorot + blur gerak |
| Teks kinetik (k8) | 6,9–8,6 | sama; kata kunci berwarna | tengah, y 50–52 %, lebar 30–100 % | tanpa subjek | hitam/putih rata |

- Tidak ada hierarki ukuran kata kunci : kata sambung (rasio ±1). Penekanan = warna, glow saat masuk, dan kata tunggal yang lebih besar.
- Batas ukur: 720 px (±0,14 % per piksel); frame berblur gerak membuat tinggi huruf meleset ±10 %.

## Cek kemiripan (dipakai juri saat menyandingkan still)
- Latar putih `#FCFCFC` mendominasi; selingan biru gradien, gelap berlampu satu sudut, dan hitam penutup. Tanpa grain/kertas.
- Satu objek UI di tengah mengisi 50–80 % lebar (kartu ±56×52 %), bukan banyak objek kecil berserakan.
- Objek UI bergaya iOS: sudut sangat bulat, biru `#2284F3`/`#0B80F1`, glow halo lunak di belakangnya.
- Teks narasi satu baris di tengah (y 43–52 %), tinggi huruf besar 5–8,6 %; semua kata dalam satu kalimat berukuran sama.
- Kata kunci dibedakan warna (merah-pink, biru, magenta), bukan bobot atau kotak.
- Still saat bergerak menunjukkan blur gerak berat searah kamera (whip-pan, zoom).
- Teks di dalam UI kecil (2,8–3,4 %) dan berbentuk komponen asli (chat, gelembung, label harga).
- Tiap komponen baru diiringi pop/ding; SFX setara keras dengan suara; musik beat 136–140 bpm.

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
