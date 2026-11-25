---
id: "22"
pola: Subject-Contour Text Wrap
kategori: typography
kategori_lain: [camera, layout]
trigger: tutorial efek atau editing "3 cara" dengan demo sebelum/sesudah; hook kreator yang menyebut kata kunci satu per satu; langkah UI yang dibawa caption satu kata
sumber: tutorial kinetic typography + efek (arsip Motion, "Kinetictypography,effect 2") · 4:3 · 51,8 dtk
dilihat_bergerak: tidak
diukur: ya
alias: []
---
# 22 · Subject-Contour Text Wrap

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: `Kinetictypography,effect 2.mp4` (folder asal: Motion; analisis asal canvas-skill-library, reference_id LOC-25da6909e2ae) · 4:3 (960×720), 30 fps, 51,8 dtk (1552 frame) · Frame: `../../guide/referensi/sheets/22-kinetic-typography-effect.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/22-k1…k8-*.jpg` (k1 wajah + kolase, k2 siluet + kata, k3 bola fisheye + teks lengkung, k4 menu "1 2 3", k5 wajah + huruf kolase, k6 kotak fisheye + kalimat, k7 UI + caption satu kata, k8 wajah + caption CTA) · Ukuran mentah: `../../guide/referensi/ukuran/22-kinetic-typography-effect-ukuran.md` · Laporan periksa: `../../guide/referensi/ukuran/22-kinetic-typography-effect-periksa.md`
> Video sumber: `/home/irfan/work/canvas-skill-library-20261102/data/local-videoanalys-20261102/Motion/Kinetictypography,effect 2.mp4`
> Dilihat bergerak: **tidak** (bedah dari frame diam, pengukuran piksel, dan strip transisi 1,4–2,2 dan 11,4–12,6 dtk; bedah gerak langsung sebelum dipakai). Kedalaman bedah: dalam.

**Inti mekanik (1 kalimat):** Hampir setiap kata yang diucap muncul di layar dan ditempelkan ke bentuk subjek (melengkung di busur bola fisheye, menurun di kontur siluet kepala, di atas bahu), sementara langkah UI yang gelap dibawa caption satu kata di posisi tetap bawah-tengah.
**Narrative trigger:**
- Kalimat hook pendek yang menyebut subjek atau kata kunci ("biar aku tunjukkan efeknya") → T1
- Pembuka dengan tumpukan banyak elemen dan presenter → T2, T3
- Demo sebelum/sesudah ("lengkungkan dunia di sekitar mereka") → T4
- Penomoran "3 cara" atau menu bab yang kembali di antara cara → T5
- Langkah demi langkah di layar UI yang tidak perlu dibaca → T6
**Jangan dipakai untuk:** narasi tenang atau premium, teks panjang yang harus dibaca, brand korporat yang kalem.
**Kata kunci gaya:** energik, kuning-hitam, kolase, kata menempel subjek, teks lengkung, glow
**Diambil untuk:** nama file: "Kinetic typography" → animasi teks (bagian 2, dibedah paling dalam); "effect" → efek visual (bagian 5 dan 6). Bagian terkuat: teks yang menempel/melengkung mengikuti subjek.

## Kondisi footage asli
- 4:3 (960×720). Satu footage contoh (pria di depan kuil, kimono zebra) dipakai berulang sebagai bahan demo efek; A-roll presenter di dinding biru dengan bayangan jendela; rekaman layar Claude/Invideo (panel gelap, dimiringkan 3D, sebagian buram).
- Subjek besar per adegan: bola fisheye 55–62 % lebar, kotak footage ±85 % × 82 %, siluet 41–63 % × 72–86 %, panel UI ±75 × 75 %.
- Latar selalu redup atau buram (hitam bervignette, cokelat buram, kolase, UI gelap); kamera hampir diam di footage fisheye (skala 0,93–1,00, geser ≤ 3 %).

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
- Teks kuning `#EDDE40`–`#EFE247` dengan glow lembut; teks putih dengan bayangan gelap tipis; hanya dua warna teks, huruf kolase membawa warnanya sendiri. Bidang kuning pekat `#FCFF32` berbentuk petir/gerigi (periksa: `#FDF227`) + speed-line hitam-putih di hook.
- Latar gelap `#0D0D0D`–`#0E0B0C` (fisheye), UI `#151515`–`#212121`, menu cokelat buram `#241A13` → `#513F2B`; vignette kuat di fisheye (sudut 12–13 vs tengah 65–74). A-roll dinding biru `#4662E7`–`#4E72ED`; siluet biru `#093AD0` di putih. Tanpa grain; UI diberi scanline halus.
### Teks
- Sans grotesk tebal (padanan Helvetica Neue Bold / Inter ExtraBold), tracking rapat, huruf kecil; kata judul huruf kolase surat kaleng.
- Dua mode: hero kinetik (3–8 kata menumpuk, ukuran campur ±1,4–2× dalam satu frame) dan caption satu kata (x 50 %, y 66 %, bbox 4,0–5,0 % tinggi).
- Masuk per kata dengan pop tanpa fade panjang; kata panjang terbuka per huruf kiri→kanan dalam ±3 frame. Keluar sekaligus di cut; kata lama tetap sampai kalimat selesai (hero).
### Ritme
- 19 cut = 22,0/menit, shot median 1,4 dtk, event visual 37/menit. Porsi: wajah ±21 %, demo efek + grafik ±41 %, rekaman UI ±38 %.
- Babak: hook 0–4,5 dtk paling rapat → demo 4,5–22,5 (bola/kotak ↔ menu) → UI 24–46 lebih lambat, tempo dibawa caption per kata → CTA wajah 46,5–51,8.

## Pola

### T1 · Subject-Contour Text Wrap · typography
- **Trigger:** kalimat hook atau penjelasan yang menyebut subjek yang terlihat; kata kunci kuning di tengah kalimat putih.
- **Yang terlihat (termasuk gerak):** teks melengkung di busur atas bola fisheye ("Let me **show** you", "The Fisheye Effect", "and bend the world around them."), menurun diagonal di kontur depan siluet kepala ("were ahead of your editing"), busur di atas bahu A-roll ("then realised", "same scene"). Kata kunci kuning, sisanya putih, glow lembut di tepi. (k2, k3, k5; 3,5–6,0 dtk, 21 dtk)
- **Kenapa bekerja:** subjek besar di tengah dengan latar redup; lengkungan teks mengulang bentuk subjek sehingga kata dan gambar terbaca sebagai satu benda; satu kata kuning memberi hierarki.
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): latar redup + vignette → subjek (bola/cutout) → glow tepi subjek → teks pada jalur.
  - Gerak: tiap kata `translate` sepanjang `<textPath>` SVG dari jalur lengkung (atas bola atau kontur kepala), kata masuk dari `scale` 0,6→1 + `opacity` 0→1 dalam 5–6 f `CURVE.land`; jeda 3–4 f antar kata; kata kuning tinggal lebih lama.
  - Ruang: datar; kedalaman dari urutan lapis.
  - Blur & blend: glow tepi (`filter: drop-shadow(0 0 16px rgba(255,255,255,.6))`); `<CameraMotionBlur>` hanya bila teks bergerak cepat.
- **SFX:** famili `impact`, `ui` · senyap per kata (KT per kata senyap, `../../guide/sfx/GUIDE.md`); kiblat memberi pop pada kata dan sub-drop di ganti adegan, tidak diambil.
- **Pakai bila:** subjek yang membulat atau kontur jelas dengan ruang kosong di tepinya. · **Jangan pakai bila:** kalimat panjang (lengkungan membuat teks sulit dibaca) atau kontur yang ramai.
- **Remix (anti-jiplak):**
  1. Foto produk bulat (cangkir, jam) → pertahankan kata melengkung di busur atas · ganti bola fisheye jadi produk, glow jadi bayangan lunak.
  2. Talking head di latar terang → pertahankan teks mengikuti bahu dan kepala · ganti kuning-putih jadi warna merek gelap dengan satu kata beraksen.
  3. 9:16 → pertahankan teks di kontur subjek · busur dipotong jadi dua baris pendek di sisi lawan wajah.
- *Pengamatan di video asli, bukan target:* "show" kuning 10 % tinggi (busur), "The Fisheye" 7,2 %; kata campuran dalam satu frame rasio ±1,4–2×.

### T2 · Cutout Collage Burst Hook · layout
- **Trigger:** pembuka berenergi tinggi yang memperkenalkan topik; hook 0–4,5 dtk.
- **Yang terlihat (termasuk gerak):** thumbnail video miring berbingkai kuning, presenter cutout ber-outline putih di depannya, bidang kuning petir/gerigi + speed-line hitam-putih; siluet kepala (kuning di hitam, lalu biru di putih) dengan coretan "ide" di dalam kepala dan kata mengalir di kontur. Siluet dan kolase ganti tiap 0,5–1 dtk. (k1, k2; 0–4,5 dtk)
- **Kenapa bekerja:** banyak lapis yang padat tetapi tiap lapis punya ukuran berbeda (cutout ±55 % lebar); kuning pekat menandai energi; hanya empat sampai lima detik.
- **Mekanik Remotion (titik awal):**
  - Lapisan: bidang kuning bergerigi + speed-line → kolase thumbnail miring → cutout presenter dengan outline putih (`filter: drop-shadow` 3 px putih) → kata.
  - Gerak: tiap elemen pop `scale` 0,8→1 `CURVE.land` 6 f dengan stagger 2–3 f; kolase `rotate` ±6–10°; ganti adegan dengan cut keras tiap 15–30 f.
  - Ruang: datar atau parallax kecil antar lapis.
  - Blur & blend: speed-line `mixBlendMode: "multiply"` di bidang kuning; motion blur pada whip antar adegan.
- **SFX:** famili `ui`, `glitch`, `impact` · `Cut.mp3` atau `Variasitransisiataucut.mp3` di pergantian adegan; `basmenyebar.mp3` hanya sekali bila ada puncak; pop satu per objek penting.
- **Pakai bila:** tutorial atau hook kreator dengan presenter dan cutout bersih. · **Jangan pakai bila:** brand kalem atau topik serius.
- **Remix (anti-jiplak):**
  1. Promo kelas desain → pertahankan kolase miring + bidang warna pekat · ganti kuning ke warna merek, thumbnail ke karya siswa.
  2. Latar terang → pertahankan outline putih tebal di cutout · ganti outline ke gelap, bidang petir ke warna pastel.
  3. 9:16 → pertahankan pergantian tiap 0,5–1 dtk · satu elemen per frame, kolase hanya di sepertiga atas.
- *Pengamatan di video asli, bukan target:* "So" 10,28 % tinggi (periksa, menggantikan 12,6 %), rasio "So":"started" 1,40× (periksa, menggantikan 1,8×); cutout presenter ±55 % lebar (taksiran mata).

### T3 · Ransom-Letter Title Word · typography
- **Trigger:** satu kata atau frasa judul yang menegaskan topik ("VISUAL STORYTELLING").
- **Yang terlihat (termasuk gerak):** huruf kolase surat kaleng, tiap huruf beda font, warna, dan kotak, berganti gaya tiap ±5 frame; susunan dua baris (VISUAL di atas STORYTELLING), kepingan huruf dengan kemiringan dan garis dasar berbeda (periksa). Di atas bidang kuning petir dan A-roll presenter. (k5; 11,0 dtk)
- **Kenapa bekerja:** perubahan gaya tiap ±5 f menjaga mata aktif pada kata pendek; latar kuning pekat membuat huruf multiwarna terbaca.
- **Mekanik Remotion (titik awal):**
  - Lapisan: A-roll → bidang kuning → huruf (satu `<span>` per huruf, `display:inline-block`).
  - Gerak: per ±5 f ganti `fontFamily`/`color`/`rotate(±8°)` dari daftar tetap (deterministik dari indeks huruf dan frame, bukan `Math.random`); masuk pop 4 f.
  - Ruang: datar.
  - Blur & blend: tanpa blur.
- **SFX:** famili `glitch` · `Katapertama.mp3` bila ini kata pertama; selebihnya senyap.
- **Pakai bila:** satu atau dua kata judul pendek. · **Jangan pakai bila:** kalimat (kolase sulit dibaca).
- **Remix (anti-jiplak):**
  1. Judul seri UMKM → pertahankan huruf bergaya berganti · ganti huruf kolase jadi stempel dan kertas label.
  2. Latar terang → pertahankan pergantian gaya · ganti kotak huruf ke warna merek terbatas tiga.
  3. 16:9 → pertahankan dua baris · satu baris di sisi kosong.
- *Pengamatan di video asli, bukan target:* "VISUAL" ±12,5 % tinggi, "STORYTELLING" ±11,5 %, "This is" ±6,3 % (taksiran mata dari grid).

### T4 · Box-to-Sphere Fisheye Morph · camera
- **Trigger:** demo before/after; "bend the world around them".
- **Yang terlihat (termasuk gerak):** kotak footage bersudut bulat (±85 % × 82 %) melengkung menjadi bola fisheye bertepi bercahaya (±1 dtk); kisi tipis horizontal/vertikal menutupi footage dan melengkung mengikuti distorsi. Footage hampir diam (skala 0,93–1,00). Masuk ke fisheye lewat zoom-through putih dengan garis radial (±1–2 frame, 12,0 dan 20,0 dtk). (k3, k6; 4,5–22,5 dtk)
- **Kenapa bekerja:** satu footage yang sama dipakai berulang sehingga perubahan bentuk yang terlihat; bola 63,75 % tinggi memberi ruang gelap untuk teks lengkung.
- **Mekanik Remotion (titik awal):**
  - Lapisan: hitam bervignette → footage (SVG filter `feDisplacementMap` atau shader/Three untuk lensa) → kisi → glow tepi.
  - Gerak: `borderRadius` 24→50 % + `scale` 1→0,75 + intensitas distorsi 0→1 dalam ±30 f `CURVE.heavy`; zoom-through putih `CURVE.whip` 3–4 f.
  - Ruang: bola = lensa 2D; tidak ada `translateZ`.
  - Blur & blend: radial speed-line `mixBlendMode: "screen"`; tepi glow `box-shadow`.
- **SFX:** famili `air`, `impact` · whoosh famili `air` yang mengembang lembut (file SFXIrfan lama dilarang; `Woosh.mp3` atau `sfx_cari.py --famili air`) di zoom-through (kiblat: aksen +23 dB di 12,46 dtk); `ES_Designed, Bass Dive, Bass Drop, Deep Sub, 50Hz` bila dipakai sebagai titik ganti.
- **Pakai bila:** footage demo dengan subjek tengah (efek tidak memotong subjek). · **Jangan pakai bila:** subjek di tepi frame (terdistorsi).
- **Remix (anti-jiplak):**
  1. Demo filter foto produk → pertahankan kotak → bentuk lain · ganti bola ke bentuk kapsul, ganti kuil ke produk.
  2. UI SaaS → pertahankan morph bentuk panel · ganti fisheye jadi panel UI yang melengkung (perspektif).
  3. Latar terang → pertahankan kisi tipis · ganti glow ke bayangan lunak.
- *Pengamatan di video asli, bukan target:* bola 55–62 % lebar; tinggi **63,75 %** tinggi frame (periksa, menggantikan 80–95 %); kotak ±85 × 82 %.

### T5 · Tilted Chapter Menu Return · layout
- **Trigger:** daftar "3 cara" yang diulang; kembali ke menu di antara tiap cara.
- **Yang terlihat (termasuk gerak):** ubin angka transparan "1 2 3" muncul satu per satu di latar cokelat buram, bidang 3D berputar ±30°; panah putih digambar (stroke) ke nomor aktif; ikon bookmark kuning (17 × 27 %) untuk "save this"; kalimat diagonal mengikuti bidang miring. Kembali di antara tiap cara. (k4; 9,0 dtk)
- **Kenapa bekerja:** menu kecil berulang memberi struktur; latar buram menjaga ubin transparan terbaca.
- **Mekanik Remotion (titik awal):**
  - Lapisan: latar footage buram berat → ubin angka → panah SVG → ikon.
  - Gerak: ubin pop dengan stagger 5 f; panah `strokeDashoffset` 8 f `CURVE.reveal`; bidang `rotateX/Y` ±30° `CURVE.drift` selama hold.
  - Ruang: `perspective: 1000px`.
  - Blur & blend: latar `filter: blur(30px)`.
- **SFX:** famili `ui` · `pop up.mp3` per ubin; senyap untuk kata.
- **Pakai bila:** konten bernomor dan berulang (3 cara, 5 langkah). · **Jangan pakai bila:** satu item saja.
- **Remix (anti-jiplak):**
  1. Tips UMKM → pertahankan menu bernomor yang muncul satu per satu · ganti ubin ke kartu solid.
  2. Latar terang → pertahankan ubin transparan · ganti cokelat buram ke krem buram.
  3. 9:16 → pertahankan panah ke nomor aktif · susun vertikal.
- *Pengamatan di video asli, bukan target:* "So save this" 5,4 % tinggi, ikon bookmark 26,8 % tinggi × 16,5 % lebar, pusat (61, 54) %.

### T6 · Fixed-Axis One-Word Caption · typography
- **Trigger:** langkah UI yang gelap dan tidak perlu dibaca; CTA di penutup.
- **Yang terlihat (termasuk gerak):** satu kata di pusat x 50 %, y 66 % ("Describe", "Claude's", "Assistant,"), putih dengan kata kunci kuning; kata baru menggantikan yang lama di tempat yang sama. Panel UI miring 3D dan sebagian buram; kamera UI bergerak pelan (pull ±26 % dalam 2,5 dtk, push ±22 % + pan 17 % dalam 3,5 dtk). CTA "Comment "Effect"" kuning 7,5 %. (k7, k8; 24–51,8 dtk)
- **Kenapa bekerja:** UI gelap dan teks UI tidak dibaca; caption satu kata di posisi tetap membawa makna dan ritme.
- **Mekanik Remotion (titik awal):**
  - Lapisan: hitam → panel UI (miring, `blur(2px)`) → caption.
  - Gerak: tiap kata ganti di tempat (potong, atau `opacity` 2 f); kata kunci kuning; panel `scale` 1→1,22 + `translateX` `CURVE.drift` 100 f.
  - Ruang: panel `rotateY(−12°)` dengan `perspective: 1200px`.
  - Blur & blend: tanpa blur untuk caption.
- **SFX:** famili `mekanik` · senyap per kata; `Enter.mp3` hanya saat klik UI penting.
- **Pakai bila:** rekaman layar yang padat dan teksnya tidak penting. · **Jangan pakai bila:** UI yang harus dibaca (tutorial menunjukkan label).
- **Remix (anti-jiplak):**
  1. Tutorial dashboard produk → pertahankan satu kata di posisi tetap · ganti panel miring ke layar datar dengan zoom ke kontrol aktif.
  2. Latar terang → pertahankan posisi y 66 % · teks gelap, kata kunci diberi bobot.
  3. 9:16 → pertahankan satu kata di poros tetap · taruh di y 70 % di atas zona UI platform.
- *Pengamatan di video asli, bukan target:* caption x 50 %, y 66,25 % (periksa); tinggi 4,2–5,0 %; pusat konstan di seluruh babak UI dan CTA.

## Audio (bila dibedah)
- earshot: 363 event (7,0/dtk); tag 34 hit/sub-drop, 16 pop UI, 4 drum, 2 riser, 1 whoosh (tag petunjuk lemah). Aksen terkuat di transisi: 12,46 dtk (+23 dB, zoom-through), 24,52 (+22 dB, masuk UI), 14,19 (+17 dB). Pop/klik mengiringi kata dan klik UI; sub-drop di ganti adegan; level SFX setara suara (puncak −1 dBFS).
- Musik: techno/tech house 0–18,75 dtk → funk dengan vocal chop sesudahnya; librosa 144 bpm tanpa grid tegas (pulse clarity 0,13). Mix −14,1 LUFS, true peak +1,5 dBFS (clip), LRA 2,5 LU.

## Yang harus terasa sama saat disandingkan
- Teks menempel atau melengkung mengikuti tepi subjek (busur bola, kontur kepala, bahu), bukan baris subtitle?
- Satu kata kuning di antara putih jelas sebagai kunci, dan glow membuat teks terasa menyala?
- Satu subjek besar per adegan dengan latar redup/buram dan teks di depan?
- Caption langkah UI satu kata di poros tetap bawah-tengah dan konstan sepanjang bagian UI?
- Hook 4 dtk pertama terasa lebih rapat dari sisanya?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat di video; baru diuji lewat rekonstruksi still.
- 12 Nov, uji rekonstruksi (Irfan): paling mendekati sejauh ini; kurang bayangan dan pencahayaan supaya tulisan tampak menyala.
