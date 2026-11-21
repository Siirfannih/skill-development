---
id: "49"
pola: Typed Sentence Punch-In
kategori: typography
kategori_lain: [camera, layout]
trigger: pengumuman produk di layar putih kosong; kalimat yang tumbuh satu kata dan berpuncak di nama produk; fitur yang punya banyak contoh gambar untuk diperlihatkan
sumber: baikov0943 (launch produk kreatif, IG) · 16:9 · 67,1 dtk
dilihat_bergerak: tidak
diukur: ya
alias: []
---
# 49 · Typed Sentence Punch-In

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: "baikov0943" (file `baikov0943_ssspin.io_1793345288.mp4`; dulu "01 Krea 2 launch"; analisis asal GrokAgent 30 Okt, audit ulang 2 Nov) · 16:9 (736×414), 30 fps, 67,1 dtk · Frame: `../../guide/referensi/sheets/49-krea-2-launch.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/49-k*.jpg` (k1 teks kecil, k2 hero punch-in, k3 teks di montase, k4 kartu + strip, k5 cincin gambar, k6 figur cutout, k7 UI slider, k8 galaksi thumbnail) · Ukuran: `../../guide/referensi/ukuran/49-krea-2-launch-ukuran.md`, periksa `…-periksa.md`
> Video sumber: `/home/irfan/work/pustaka-video/mac/baikov0943_ssspin.io_1793345288.mp4`
> Dilihat bergerak: **tidak** (isi dari frame diam dan pengukuran; sumber 414p; bedah geraknya sebelum dipakai)

**Inti mekanik (1 kalimat):** Kalimat hitam kecil diketik per kata di tengah layar putih, lalu kamera menghantam masuk ±4,5× ke kata produk dalam 1 frame, dan di antara kalimat gambar-gambar contoh melayang, mengorbit, atau menyusut ke satu titik.
**Narrative trigger:**
- Kalimat yang tumbuh dan berpuncak di nama (pola "ini adalah [nama produk]") → T1, T2
- Penegasan satu kata produk setelah rangkaian kalimat biasa → T2
- Klaim "bisa gaya apa pun" yang perlu bukti banyak contoh → T3, T5
- Penutup yang menyatukan banyak hasil jadi satu logo atau satu angka → T4
**Jangan dipakai untuk:** talking head, konten tanpa stok gambar yang kuat, kalimat yang harus dibaca lama (kalimat hilang seketika).
**Kata kunci gaya:** putih bersih, ketik, punch-in 1 frame, galeri melayang, minimal
**Diambil untuk:** nama sumber tidak menyebut bagian. Bagian terkuat: teks ketik + punch-in kamera dan gambar melayang di putih. Audit 2 Nov pernah memasukkannya ke kelompok "Kinetic typography".

## Kondisi footage asli
- 16:9, **tanpa footage kamera**: semua bahan gambar hasil model (editorial, anime, 3D clay, poster, foto produk).
- Latar `#FFFFFF` murni di adegan teks (96–99,8 % piksel putih); teks hitam `#000000`.
- ±50 % frame tanpa teks sama sekali; satu subjek sedang di tengah atau banyak objek kecil, tidak ada yang mengisi frame kecuali montase 2 dtk.
- Kamera diam di hampir semua kalimat; gerak datang dari punch-in, objek, atau susut ke titik.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Putih murni + hitam murni; kata lama memudar ke abu terang (±`#E1E1E1`) saat hero mendarat; satu aksen UI: highlight select biru `#B3D2F6`. Tanpa grain, gradien, vignette. Warna hanya dari gambar. Bayangan lembut hanya di figur cutout dan kartu flip; kartu lain tanpa bayangan, sudut membulat kecil.
### Teks
Grotesk netral (mirip Inter Display / SF Pro) Medium, satu bobot, sentence case, tanpa tanda baca. Pusat (50, 50) ±1 %. Kapital kalimat kecil diukur ulang **±6,8 % tinggi frame** (28 px; angka lama 4,3–4,6 % keliru menurut laporan periksa); hero (nama produk) 20,3 % (84 px, cocok); rasio hero : kecil ±3×, bukan 4,5× (turunan koreksi).
### Ritme
16 cut = 14,3/menit, 14 di antaranya di montase 5,47–7,50 dtk (3–7 f per gambar). Di luar itu perpindahan lewat ketik, gerak objek, dan kamera. Babak: teks + hero (0–5) → montase cepat → kuda berganti gaya (9–16) → moodboard (16–24) → cincin gambar (24–31) → hero 2 (31–34) → figur (34–41) → slider (41–51) → galaksi (51–62) → logo/URL (62–67).

## Pola

### T1 · Growing Typed Sentence · typography
- **Trigger:** kalimat deklaratif pendek yang tumbuh kata demi kata; kalimat yang berganti satu kata ("It gets it" → "It gets you").
- **Yang terlihat (termasuk gerak):** tiap kata muncul sekaligus atau diketik per huruf dengan kursor `|` hitam setinggi baris; baris di-recenter tiap kata masuk. Kata lama redup ke abu saat kata berikutnya jadi hero. Keluar: cut ke putih atau gambar. Satu momen: highlight select biru atas kalimat, lalu kalimat yang sama diketik besar. (k1, k3)
- **Kenapa bekerja:** layar putih kosong dan satu baris di pusat: perhatian hanya ke kata yang baru masuk.
- **Mekanik Remotion (titik awal):**
  - Lapisan: putih → teks → kursor.
  - Gerak: `Math.floor((frame - start) / 2)` huruf terlihat (2 f per huruf), kursor `|` berkedip tiap 15 f; recenter dengan `measureText` tiap kata; kata lama `color` hitam→`#E1E1E1` dalam 3 f.
  - Ruang: datar.
  - Blur & blend: tanpa blur.
- **SFX:** famili `glitch`, `ui` · kata senyap; satu `Katapertama.mp3` pada kata pertama video. Video asli: pop UI pendek tiap teks muncul (0,04; 2,09; 3,90; 7,58 dtk), terlalu padat dan UI-ish untuk cerita sinematik.
- **Pakai bila:** kalimat ≤ 6 kata, latar polos. · **Jangan pakai bila:** kalimat panjang atau informasi yang harus langsung terbaca utuh.
- **Remix (anti-jiplak):**
  1. Brand UMKM latar krem → pertahankan ketik + recenter · ganti hitam jadi cokelat tua, kursor warna aksen.
  2. UI SaaS → kalimat diketik di kolom input produk sungguhan, bukan di layar kosong.
  3. Talking head → kalimat diketik di sisi kosong frame, wajah tidak tertutup.
- *Pengamatan di video asli, bukan target:* 1–6 kata per tampil; kata lama memudar dalam ±3 f.

### T2 · One-Frame Punch-In Hero · camera
- **Trigger:** kata produk atau nama setelah kalimat biasa; "The better it gets" sebagai puncak argumen.
- **Yang terlihat (termasuk gerak):** di 2,20 dtk skala melompat ±4,5× dalam 1 frame ke kata produk, lalu pan kiri ±15,6 % lebar selama 0,4 dtk mengikuti kursor, settle di tengah (skala 1,000 di 2,7–3,4 dtk). "The better it gets": pan −33 % lebar selama 0,7 dtk; teks lebih lebar dari frame dan terpotong kiri. Font dan bobot sama. (k2)
- **Kenapa bekerja:** hero lahir dari kamera, bukan dari font besar, sehingga kalimat tetap satu rasa sampai tepat di kata kunci.
- **Mekanik Remotion (titik awal):**
  - Lapisan: putih → grup teks (satu `AbsoluteFill`).
  - Gerak: `scale` 1→4,5 dalam 1 f (`interpolate` linear), lalu `translateX` ke kursor 12 f `CURVE.land`, settle scale `CURVE.drift`; kata lama ke abu 3 f.
  - Ruang: datar; kamera = transform pada grup.
  - Blur & blend: 1 frame punch-in boleh diberi motion blur (`<CameraMotionBlur shutterAngle={200} samples={16}>`) agar tidak patah.
- **SFX:** famili `glitch`, `impact`, `mekanik` · `Cut.mp3` di frame punch-in (puncak bunyi 90 ms sebelum visual, seperti video asli); kiblat memakai klik/thock tipis tanpa bas, `Cut.mp3` adalah padanan terdekat. Hero kedua: `basmenyebar.mp3` bila itu puncak video.
- **Pakai bila:** satu kata produk tegas. · **Jangan pakai bila:** lebih dari dua kali dalam video (kehilangan efek).
- **Remix (anti-jiplak):**
  1. Nama kursus → pertahankan lompatan skala 1 frame · ganti pan mengikuti kursor dengan pan mengikuti garis bawah.
  2. Layar laptop → punch-in ke tombol di UI asli.
  3. Latar gelap → teks putih, kata lama redup ke abu gelap.
- *Pengamatan di video asli, bukan target:* 4,5× di 2,20 dtk; 2 kali di seluruh video.

### T3 · Tilted Card Orbit Ring · layout
- **Trigger:** klaim "bisa gaya apa pun" atau "banyak hasil" yang dibuktikan dengan gambar.
- **Yang terlihat (termasuk gerak):** ±10 kartu miring (rotasi kecil) mengorbit dua bulatan kecil di tengah, bulatan kanan avatar kartun dan kiri wajah (laporan periksa); set gambar berganti per warna (biru → pink → campur). Moodboard: gambar meluncur dari tepi dan berhenti di tepi sementara teks tetap di tengah. Kartu 11 % lebar, tinggi 25–31 %. (k5, k4 untuk kartu + strip tiga thumbnail, thumbnail tengah paling pekat)
- **Kenapa bekerja:** ruang putih besar; kartu kecil di tepi mengepung pusat tanpa menutup teks.
- **Mekanik Remotion (titik awal):**
  - Lapisan: putih → kartu belakang (opacity 0,6) → kartu depan → bulatan pusat.
  - Gerak: posisi = `cos/sin(θ0 + frame·0,6°)`, tiap kartu `rotateZ` ±8° tetap; masuk meluncur `CURVE.land` 14 f dari tepi dengan `react(i)`; pergantian set dengan cut 1 f.
  - Ruang: datar.
  - Blur & blend: bayangan lembut `box-shadow: 0 8px 24px rgba(0,0,0,0.12)`.
- **SFX:** famili `mekanik` · `Pergantianfoto.mp3` untuk rentetan kartu masuk; tiap kartu senyap.
- **Pakai bila:** ≥ 8 gambar bagus dengan set warna terkoordinasi. · **Jangan pakai bila:** gambar lemah (banyak berarti kelihatan jelek).
- **Remix (anti-jiplak):**
  1. Katalog UMKM → kartu = foto produk, orbit mengelilingi logo.
  2. Karya klien → kartu = tangkapan layar halaman hasil.
  3. Latar terang berwarna → kartu dengan bingkai putih tebal.
- *Pengamatan di video asli, bukan target:* median 11 % lebar; kartu kuda 48,9 % × 49,3 % (cocok).

### T4 · Cards-to-Point Collapse · layout
- **Trigger:** klimaks tentang skala atau akumulasi ("semua ini dari satu…"), diakhiri logo.
- **Yang terlihat (termasuk gerak):** ratusan thumbnail menyebar lalu menyusut ke satu titik menjadi logo; cakupan non-putih 36 % (56,5 dtk) → 4,4 % (60,5) → 0 (62,5); riser 50,78 dtk mengantar; musik stop-down 0,7–0,8 dtk sebelumnya. (k8)
- **Kenapa bekerja:** ruang putih memberi akhir yang bersih; susut ke titik adalah "pull-out" tanpa kamera.
- **Mekanik Remotion (titik awal):**
  - Lapisan: putih → thumbnail (40+, median 4,7 % lebar) → logo.
  - Gerak: tiap thumbnail menuju pusat dengan `CURVE.heavy`, `scale` 1→0 dan `translate` ke (50,50) selama 90–120 f; `react(i)` pada keberangkatan.
  - Ruang: datar.
  - Blur & blend: tanpa blur; logo muncul `scale` 0,9→1 `CURVE.land`.
- **SFX:** famili `impact`, `riser` · `ES_Designed, Riser, Transition, Fast, Short, Clean 01` menuju titik, `basmenyebar.mp3` saat galaksi/UI muncul (thump sub 91–99 % di bawah 250 Hz, paling keras −6,5…−10,7 dBFS).
- **Pakai bila:** ada jumlah besar yang bermakna. · **Jangan pakai bila:** tanpa logo atau angka penutup.
- **Remix (anti-jiplak):**
  1. Jumlah pelanggan → thumbnail avatar menyusut ke angka.
  2. Portofolio → karya menyusut ke URL.
  3. Latar gelap → titik terakhir bercahaya.
- *Pengamatan di video asli, bukan target:* 40+ objek; susut ±4 dtk.

### T5 · Silhouette Style Swap · layout
- **Trigger:** "satu bentuk, banyak gaya"; membuktikan variasi tanpa mengubah subjek.
- **Yang terlihat (termasuk gerak):** siluet kuda hitam ditahan di kartu 49×49 %, isi gayanya berganti (strip 3 thumbnail di bawah menunjukkan sumber gaya); transisi match-cut siluet; figur cutout berpose lalu kartu-kartu figur berjejer bergeser (kartu flip) dengan bayangan lembut; panel persegi putih kelabu bertepi lembut di belakang figur (periksa). (k4, k6)
- **Kenapa bekerja:** bentuk tetap, perubahan terbaca sebagai gaya, bukan objek baru.
- **Mekanik Remotion (titik awal):**
  - Lapisan: putih → kartu → siluet (mask) → strip thumbnail.
  - Gerak: isi diganti dengan `<Sequence>` per gaya (hard cut 1 f), mask tetap; kartu flip `rotateY` 0→180° `CURVE.whip` 10 f.
  - Ruang: `perspective: 1000px` untuk flip.
  - Blur & blend: bayangan hanya di figur.
- **SFX:** famili `mekanik`, `ui` · `pop up.mp3` pada kartu pertama; flip senyap atau satu `Cutcontrastransision.mp3` bila flip jadi motif.
- **Pakai bila:** ada ≥ 4 versi gaya dari satu subjek. · **Jangan pakai bila:** subjek tidak punya siluet jelas.
- **Remix (anti-jiplak):**
  1. Logo → pertahankan mask + ganti isi tekstur/warna.
  2. Foto produk → siluet botol berisi lima label.
  3. 9:16 → kartu vertikal, strip di bawah.
- *Pengamatan di video asli, bukan target:* figur 52 % tinggi × 11 % lebar; dial UI 46 % tinggi (k7, slider + dial radial bertick, gambar dalam lingkaran berubah mengikuti nilai).

## Audio (bila dibedah)
Pita total: <250 Hz 75,6 %, 250–2k 22,8 %, 2–6k 1,1 %, >6k 0,5 %: gelap dan berat. earshot: 96 bunyi, 49 "chat message pop"; riser 50,78 dtk (+30 dB). Musik ±129 bpm (grid lemah, pulse clarity 0,07), −14,0 LUFS, true peak +3,1 dBTP (clip setelah transcode; jangan ditiru), LRA 7,4 LU; RMS per 5 dtk −24 → −13 (55–60) → −30 (60–65) → senyap; stop-down sebelum hero 2 (31,75) dan galaksi (49,65). Musik ±9 dB di bawah VO (audit 2 Nov, tidak diukur ulang).

## Yang harus terasa sama saat disandingkan
- Layar terasa kosong dan teks kecil di tengah, sampai punch-in membuat kata produk besar tanpa mengganti font?
- Kata hero lahir dari lompatan kamera 1 frame, bukan dari tulisan yang sudah besar?
- Kartu/gambar terasa mengambang di putih tanpa mengisi frame (kecuali montase)?
- Hanya dua lapis (putih dan objek), tanpa blur kedalaman?
- Setengah frame tanpa teks sama sekali, dan gambarnya yang menjelaskan?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
