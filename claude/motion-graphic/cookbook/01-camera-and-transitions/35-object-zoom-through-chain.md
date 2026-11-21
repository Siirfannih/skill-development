---
id: "35"
pola: Object Zoom-Through Chain
kategori: camera
kategori_lain: [layout, texture]
trigger: konsep "semua tersambung" atau satu masukan menjadi banyak jalur; perpindahan dari kekacauan gelap ke ketenangan terang; film merek 30 detik tanpa narator
sumber: IG "connected-work concept" (Dcn6EINyzaa; logo bergaya OpenAI, tidak terbukti buatan resmi) · 16:9 (1280×720) · 31,1 dtk
dilihat_bergerak: tidak
diukur: ya
alias: []
---
# 35 · Object Zoom-Through Chain

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: https://www.instagram.com/p/Dcn6EINyzaa/ (file Irfan "IG Dcn6EINyzaa") · 16:9 (1280×720, 30 fps), 31,1 dtk · Frame: `../../guide/referensi/sheets/35-openai-connected-work.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/35-k1-teks-gelap.jpg`, `35-k2-garis-cabang.jpg`, `35-k3-cincin-zoom.jpg`, `35-k4-prompt-alam.jpg`, `35-k5-kartu-poster.jpg`, `35-k6-kode-hutan.jpg`, `35-k7-pohon-label.jpg`, `35-k8-penutup-langit.jpg` · Periksa: `../../guide/referensi/ukuran/35-openai-connected-work-periksa.md` (6/6 angka cocok)
> Video sumber: `/home/irfan/work/canvas-skill-library-20261102/data/online-20261102/data/instagram/6bfcbf309c13691f0a6d/video.mp4` (dipastikan 21 Nov 2026: manifest unduhan mencatat URL Dcn6EINyzaa → berkas ini; 7 dari 8 frame kunci cocok dengan frame video, mis. k8 di 29,5 dtk RMSE 1,7, k2 di 6,0 dtk RMSE 3,1; k5 bergerak sangat cepat dan tidak cocok pada sampel 4 fps)
> Dilihat bergerak: **tidak** (bedah dari frame diam dan pengukuran ORB per 0,2 dtk; bedah geraknya sebelum dipakai).

**Inti mekanik (1 kalimat):** Kamera hampir tak pernah diam dan tiap pergantian adegan dicapai dengan menembus sebuah objek (cincin, tombol kirim, kartu) yang sekaligus menjadi metafora berikutnya, dari gelap pekat ke foto alam terang.
**Narrative trigger:**
- Satu titik atau satu masukan yang bercabang menjadi banyak jalur → T1
- Momen "ledakan" setelah jeda hening: gelap menjadi terang lewat cincin → T2
- Satu aksi (kirim, tekan) yang memicu hasil melimpah → T3
- Kekacauan data yang berubah jadi struktur organik (pohon) → T4
**Jangan dipakai untuk:** talking head, tutorial fitur rinci, relasi banyak arah yang lebih jelas sebagai tabel.
**Kata kunci gaya:** garis halus, sinematik, zoom-through, biru elektrik, alam terang, premium
**Diambil untuk:** "IG Dcn6EINyzaa": nama tidak menyebut bagian; bagian terkuat: kamera + transisi zoom-through yang menyambung metafora (titik → cabang → cincin → tombol → pohon) dan perpindahan gelap → alam.

## Kondisi footage asli
- 16:9. Tanpa orang. Babak 1 (0–7,7 dtk) hitam nyaris murni tanpa grain (std 0,5–0,8), satu titik biru bercahaya dan garis putih tipis (piksel terang ≤ 2 % frame); babak 2 putih kebiruan bergradien radial; foto/video alam penuh layar (pantai pastel, pinus berkabut, langit biru dengan bunga putih yang bergoyang) sebagai panggung UI.
- Kamera virtual bergerak hampir di setiap frame; drift ≤ 0,7 % saat "diam".
- Ruang kosong teks: tengah frame (x 50 ± 5 %, y 45–52 %).

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Babak gelap `#020305` tanpa grain; titik biru `#0739CF`; garis putih tipis; teks sekunder abu `#202124`. Babak terang putih kebiruan `#E6EEF7`–`#FDFDFD`; cincin biru `#083EFE` bergradien sian dengan bayang lembut; tombol kirim `#0859F8`. Aksen biru tunggal untuk titik, cincin, tombol, dan kata sorot. Foto alam grade terang pastel berkabut. Satu pengecualian keras: kilasan merah penuh `#CE060F` di belakang editor (17,4–19,7 dtk) saat baris error; sorot baris hijau `#06831C` / merah `#8C0004`. Adegan pohon: kertas krem `#F1E8E0`–`#ECE0C4` bertekstur kertas cat air nyata (std piksel 36–74).
### Teks
Neo-grotesk bulat (paling mirip SF Pro / OpenAI Sans; Inter pengganti), Regular–Medium; judul prompt Semibold; kode monospace; label stempel condensed miring. Tiap tampil 1–4 kata; kata kunci terbesar 6,5–12 % tinggi ("Seconds." 12,4 %, wordmark 11,1 %, "thoughts" 8,2 %); label melayang 2,1–5 %; subjudul 1,5–1,8 %. Penekanan dengan warna, bukan bobot. Masuk: kata berganti di tempat ("Imagine → Build → Discover" sementara "One place to" diam); "Seconds." muncul per huruf dari biru ke gelap dengan blur gerak; wordmark masuk per huruf dari kiri lalu menyebar saat keluar.
### Ritme
11 pergantian adegan = 21,2/menit (pace_read 9 cut = 17,3/menit), shot median 1,9 dtk; event visual 31/menit. Lambat–cepat–lambat: pembuka 7,7 dtk satu shot (pan mengikuti garis), tengah 8,9–21 dtk cepat (shot 0,4–2,4 dtk), akhir lambat (pohon 5,6 dtk, langit 4,5 dtk). Dua lubang hening (6,2 dtk selama 0,85 dtk; 29,65 dtk selama 0,3 dtk) tepat sebelum ledakan cincin dan sebelum logo.

## Pola

### T1 · Line-To-Branch Pan Follow · camera
- **Trigger:** satu masukan yang bercabang menjadi banyak jalur.
- **Yang terlihat (termasuk gerak):** satu garis bergelombang masuk dari kiri ke titik biru, kamera pan kiri mengikuti garis (−9 → −2 % lebar per 0,2 dtk, melambat) selama 2,2–5,6 dtk; lalu 6 cabang mekar ke ikon ujung (surat, globe, kalender, gambar, kode, jam) dengan label 2,8 % + subjudul abu 1,8 % yang menempel di kanan titik ujung. Sebaran 96×76 % frame, tapi piksel terang hanya 1,2 % frame. (k2; 2,2–7,7 dtk)
- **Kenapa bekerja:** pan yang melambat mengikuti garis mengarahkan mata ke titik; ruang hitam luas membuat garis 1 px tetap terbaca.
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): hitam `#020305` → garis (SVG `path` dengan `stroke-dashoffset` animasi) → titik biru + glow → cabang → ikon + label.
  - Gerak: pan kamera `translateX(0→−18% lebar)` `Easing.bezier(0.1,0.75,0.15,1)` (`CURVE.land`) selama 100 f; cabang mekar `stroke-dashoffset` 18 f per cabang dengan jeda `react(i, fps)` (bukan stagger sama rata).
  - Ruang: datar; kamera virtual 2D.
  - Blur & blend: glow titik `filter: drop-shadow(0 0 18px #0739CF)`; motion blur pan (`<CameraMotionBlur shutterAngle={200} samples={16}>`).
- **SFX:** pop UI kecil per ikon (`pop up.mp3`) hanya bila ikon dianggap objek penting; garis bergerak: `Scanning dan gerak kurva.mp3` (garis/kurva bergerak). Label senyap.
- **Pakai bila:** latar gelap luas dengan elemen tipis. · **Jangan pakai bila:** latar terang (garis 1 px hilang).
- **Remix (anti-jiplak):**
  1. Alur pembayaran → pertahankan garis tunggal bercabang dengan pan mengikuti · ganti ikon dengan ikon bank dan dompet digital.
  2. Latar terang → pertahankan garis + titik · ganti hitam dengan krem dan garis arang tebal 2 px.
  3. 9:16 → pertahankan pan mengikuti · ganti pan horizontal dengan pan vertikal, cabang ke bawah.
- *Pengamatan di video asli, bukan target:* pembuka 7,7 dtk satu shot; garis ±1 px.

### T2 · Ring Burst Black-To-White · camera
- **Trigger:** momen puncak setelah jeda: kacau menjadi terang dan jernih.
- **Yang terlihat (termasuk gerak):** cincin biru membesar menembus kamera → layar menjadi putih → "connected." di tengah (3,3 % tinggi, lebar 11,6 %); bagian dalam cincin tampil sebagai bidang hitam besar dengan teks putih; cincin Ø 79 % tinggi (diukur ulang 79,44 %); dua lubang hening sebelum ledakan (6,2 dtk selama 0,85 dtk); drop musik mulai 7,05 dtk (pop +40 dB). Berlanjut ke wordmark "OpenAI" (11,1 % tinggi) yang masuk per huruf lalu menyebar. (k3; 7,7–11,3 dtk)
- **Kenapa bekerja:** hening 0,85 dtk menahan napas; cincin yang menembus kamera menjadi cut tersembunyi dari gelap ke putih.
- **Mekanik Remotion (titik awal):**
  - Lapisan: gelap → cincin (SVG, gradien biru ke sian) → putih radial → teks.
  - Gerak: cincin scale 0,2→6 selama 18 f `CURVE.whip`, lalu putih fade-in di ±14 f; kamera mendorong mengikuti.
  - Ruang: datar dengan scale besar; bayang lembut di bawah cincin saat sudah di latar putih.
  - Blur & blend: motion blur 200°/16 sampel; wordmark dengan `letter-spacing` 0→0,2em saat keluar.
- **SFX:** `basmenyebar.mp3` atau `ES_Designed, Bass Dive, Bass Drop, Deep Sub, 50Hz` sebagai sub-drop di titik ledakan setelah hening; riser sebelumnya `ES_Designed, Riser, Transition, Fast, Short, Clean 01` (`align: peak`); satu bunyi per peran.
- **Pakai bila:** ada jeda hening sebelum ledakan dan satu bentuk yang bisa dilewati kamera. · **Jangan pakai bila:** tak ada pergantian gelap-terang yang disengaja.
- **Remix (anti-jiplak):**
  1. Launch aplikasi → pertahankan hening + cincin yang menembus kamera · ganti cincin dengan lensa kamera yang membuka.
  2. Video UMKM → pertahankan transisi gelap ke terang · ganti biru dengan satu warna brand.
  3. Latar terang ke gelap (terbalik) → pertahankan menembus objek · ganti putih dengan hitam pekat.
- *Pengamatan di video asli, bukan target:* zoom-through cincin 7,7 dtk dipicu bunyi pop; cincin Ø 79,44 % tinggi.

### T3 · Send-Button Dive Into Card Burst · layout
- **Trigger:** satu aksi menghasilkan hasil melimpah ("dalam hitungan detik").
- **Yang terlihat (termasuk gerak):** kotak prompt kaca di atas pantai (67×10 % frame, diukur ulang 66,88 % lebar; judul 5,8 % Semibold di y 37 %, isi 2,6 %); kamera push ke tombol (+6 → +13 %/0,2 dtk); menembus tombol kirim biru (Ø ±14 % tinggi) → ±14 kartu poster tipografi warna-warni meledak memutar dari tombol, bertumpuk dengan blur gerak di tepi; kartu menyebar ke luar → "Seconds." per huruf 12,4 % tinggi. Ranting berdaun di sudut kiri atas sebagai lapis depan. (k4, k5; 12,0–16,0 dtk)
- **Kenapa bekerja:** menembus tombol menghubungkan aksi ke hasil dalam satu gerakan; kartu memutar dari satu titik terasa sebagai "keluaran melimpah".
- **Mekanik Remotion (titik awal):**
  - Lapisan: foto pantai → kotak prompt kaca (`backdrop-filter`) → tombol → kartu (14 `<div>` tiap kartu rotasi dan jarak sendiri) → "Seconds." per huruf.
  - Gerak: push 1,00→1,9 selama 20 f `CURVE.heavy`; kartu `arc()` dari pusat tombol ke posisi lingkaran dengan `CURVE.land` 16 f, jeda `react(i)`; rotasi tiap kartu membesar 0→360° / 2.
  - Ruang: kartu `perspective: 1100px`, `rotateY` ±12°.
  - Blur & blend: kartu tepi `blur(3px)` + motion blur; lapis depan ranting blur.
- **SFX:** `Enter.mp3` di klik tombol kirim; ledakan kartu `Pergantianfoto.mp3` (rentetan foto/kartu, satu potongan panjang) alih-alih per kartu; pengamatan: UI pop di label.
- **Pakai bila:** ada satu tombol pemicu yang jelas dan 8+ hasil visual yang bisa jadi kartu. · **Jangan pakai bila:** hasil hanya satu.
- **Remix (anti-jiplak):**
  1. Aplikasi resep → pertahankan menembus tombol → kartu meledak · ganti kartu poster dengan foto hidangan.
  2. Latar gelap → pertahankan ledakan memutar · ganti foto pantai dengan hitam dan kartu bercahaya.
  3. 9:16 → pertahankan satu pusat · ganti lingkaran penuh dengan kipas ke atas.
- *Pengamatan di video asli, bukan target:* kartu ±14 buah; zoom keluar logo → pantai di 11,3 dtk; menembus tombol di 13,3; kartu menyebar → "Seconds." di 14,9.

### T4 · Floating Labels To Textured Tree · texture
- **Trigger:** data berserak yang menjadi satu struktur hidup.
- **Yang terlihat (termasuk gerak):** label oranye melayang (Clients, Feedback, …) berukuran 3 tingkat (2,1 / 3,1 / 5 % tinggi) = lapisan Z; kamera terbang melewatinya; terkumpul membentuk pohon bertekstur kertas cat air nyata dengan bunga sakura dan daun, angka naik/turun hijau/merah; pohon menyebar 94×91 % dengan 110 titik oranye Ø 1,4 %; label stempel "MONTHLY REPORT" condensed miring di batang. Push pelan +0,5–2 %/0,2 dtk; durasi 5,6 dtk; lalu crossfade ke langit (26,6 dtk). (k7; 21,0–26,6 dtk)
- **Kenapa bekerja:** tiga ukuran label memberi kedalaman tanpa 3D sungguhan; kertas bertekstur asli menghangatkan setelah babak sintetis.
- **Mekanik Remotion (titik awal):**
  - Lapisan: kertas bertekstur (gambar) → pohon → titik + label dalam 3 ukuran dengan `translateZ` berbeda → angka.
  - Gerak: kamera 3D `perspective: 1400px` dengan `translateZ` 0→400 selama 5 dtk `CURVE.drift`; label tiap tingkat parallax 0,9/1,0/1,15×.
  - Ruang: 2,5D nyata (tiga tingkat Z).
  - Blur & blend: label jauh `blur(1px)`; tekstur kertas `mixBlendMode: "multiply"`.
- **SFX:** `documenter.mp3` (kertas bergemerisik) satu kali di awal pohon; label senyap atau satu `pop up.mp3` di angka pertama.
- **Pakai bila:** ada tekstur nyata yang tersedia dan ≥ 20 label. · **Jangan pakai bila:** tak ada bahan tekstur.
- **Remix (anti-jiplak):**
  1. Laporan penjualan → pertahankan 3 ukuran label sebagai Z · ganti pohon dengan peta kota.
  2. Latar gelap → pertahankan parallax tiga tingkat · ganti kertas krem dengan papan tulis arang.
  3. Foto produk → pertahankan label menempel titik · ganti titik dengan titik panas pada foto.
- *Pengamatan di video asli, bukan target:* label dekat 5 %, jauh 2,1–3,1 %, angka 1,5 %.

### T5 · Fog-Nature Stage With Floating UI · layout
- **Trigger:** setelah klimaks, ketenangan untuk menjelaskan produk.
- **Yang terlihat (termasuk gerak):** foto alam penuh layar sebagai panggung (pantai untuk prompt, hutan pinus berkabut untuk editor kode, langit + bunga untuk penutup); UI melayang dengan bayangan lembut, tanpa bingkai foto; editor kode 65×68 % (diukur ulang 65,00 % lebar saat jauh), lalu 90×74 % saat dekat; jendela bersudut membulat dengan tiga tombol merah-kuning-hijau, menu, dan bilah status; centang hijau per baris, satu baris error merah dengan "Fixing Issue…", kubus biru 3D; kilasan merah penuh 17,4–19,7 dtk; whip vertikal ke atas 2× di 17,4 dan 19,7 dtk (31–37 % tinggi per 0,2 dtk). Penutup: "One place to" putih + "Discover." biru (6,5–6,9 % tinggi), bunga mengisi 44 % bawah. (k6, k8; 16,5–31 dtk)
- **Kenapa bekerja:** alam terang menandai lega setelah gelap; UI melayang berbayang memisahkan lapisan tanpa blur latar.
- **Mekanik Remotion (titik awal):**
  - Lapisan: footage alam → UI melayang (shadow `0 24px 60px rgba(0,0,0,.18)`) → kubus/ikon depan → teks.
  - Gerak: pull −3 %/0,2 dtk dari editor; whip vertikal `translateY(−100%)` 10 f `CURVE.whip` dengan motion blur ke close-up error; kata terakhir berganti di tempat dengan `CURVE.reveal`.
  - Ruang: datar dengan kamera virtual.
  - Blur & blend: foto tidak diburamkan; blur gerak pada tepi UI saat whip.
- **SFX:** `Wooshcameramovementtransisi.mp3` untuk whip (pengamatan: 3 whoosh tipis); `Keyboardtyping.mp3` bila kode diketik; satu `Notif.mp3` di "Fixing Issue".
- **Pakai bila:** foto/video alam atau latar tenang tersedia. · **Jangan pakai bila:** latar foto padat detail di belakang UI.
- **Remix (anti-jiplak):**
  1. Aplikasi desain → pertahankan UI melayang di foto terang · ganti hutan dengan studio berkabut.
  2. Latar gelap → pertahankan whip vertikal · ganti foto alam dengan gradien gelap.
  3. 9:16 → pertahankan jendela membulat · ganti 65 % lebar dengan 88 % lebar vertikal.
- *Pengamatan di video asli, bukan target:* kilasan merah 17,4–19,7 dtk adalah satu-satunya pengecualian warna.

## Audio (bila dibedah)
earshot: 221 onset (7,1/dtk), 96 bertag: 34 hit, 32 UI, 9 drum, 3 whoosh. Kosakata: pop/bubble UI untuk label dan teks muncul, klik shutter di awal, impact + sub-bass drop di pergantian besar, 3 whoosh tipis (whip), "Fixing Issue" ketukan kecil. Aksen terkuat: 7,07 dtk pop +40 dB (masuk cincin), 2,69 dtk impact +31 dB ("thoughts"), 0,46 dtk klik +30 dB. SFX dicampur sejajar musik (puncak −0,3 hingga −8 dBFS). Musik: house/tech house dengan vocal chop, ±108 bpm, pulse clarity 0,18; babak 1 tipis −19 dB RMS, drop 7,05 dtk penuh −14 dB RMS, akhir mereda −18 dB. Mix −14,2 LUFS, true peak −0,2 dBTP, LRA 4,5 LU. VO tak terukur pasti (AST "speech" 0,5–0,76 mungkin vocal chop).

## Yang harus terasa sama saat disandingkan
- Kamera terasa bergerak di setiap still berurutan, dan tiap pergantian adegan ditembus lewat objek, bukan cut keras?
- Babak gelap benar-benar hitam tanpa grain, dengan garis tipis dan sedikit piksel terang?
- Hening sebelum ledakan cincin terasa menahan napas?
- Hanya satu aksen biru (merah hanya untuk error)?
- UI terasa melayang di foto terang berkabut dengan bayangan lembut, tanpa bingkai?
- Adegan data terasa punya kedalaman dari tiga ukuran label dan tekstur kertas nyata?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
