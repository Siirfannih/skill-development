---
id: "34"
pola: Receding Zoom-Out Chain
kategori: camera
kategori_lain: [typography, layout]
trigger: teaser masalah 10 detik tentang alat atau aplikasi yang terpisah-pisah; kalimat vonis pendek yang perlu disorot satu kata ("kerja hari ini rusak"); pergantian adegan beruntun tanpa jeda sebelum merek muncul
sumber: IG "disconnected-work teaser" (DbszEmpIfK8; brand ClickUp) · 16:9 (1276×718) · 10,0 dtk
dilihat_bergerak: tidak
diukur: ya
alias: []
---
# 34 · Receding Zoom-Out Chain

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: file Irfan "IG DbszEmpIfK8", https://www.instagram.com/reel/DbszEmpIfK8/ · 16:9 (1276×718, 30 fps), 10,0 dtk, tanpa ucapan · Frame: `../../guide/referensi/sheets/34-clickup-disconnected-work.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/34-k1-judul-per-kata.jpg`, `34-k2-sorot-kata.jpg`, `34-k3-cincin-lencana.jpg`, `34-k4-putih-panel-ui.jpg`, `34-k5-morf-cincin-cari.jpg`, `34-k6-kolom-cari.jpg`, `34-k7-wordmark-cakrawala.jpg` · Ukuran mentah: `../../guide/referensi/ukuran/34-clickup-disconnected-work-ukuran.md`; periksa: `34-clickup-disconnected-work-periksa.md`
> Video sumber: `/home/irfan/work/canvas-skill-library-20261102/data/online-20261102/data/instagram/07435b43e6a90804a7fd/video.mp4` (dipastikan 21 Nov 2026: manifest unduhan mencatat URL DbszEmpIfK8 → berkas ini; k1, k6, k7 cocok dengan frame video pada 0,5; 7,0; 9,0 dtk, RMSE 2,9–14; k3–k5 bergerak cepat dan tidak cocok pada sampel 4 fps tetapi isinya sama)
> Dilihat bergerak: **tidak** (bedah dari frame diam dan pengukuran ORB per 0,1 dtk; bedah geraknya sebelum dipakai).

**Inti mekanik (1 kalimat):** Tiap adegan 1–2 dtk terus mundur menjauh (zoom-out) dengan kurva cepat-pelan-cepat, dan keluar lewat percepatan zoom-out sampai cut keras bersama hit SFX, sehingga seluruh teaser terasa satu gerak mundur yang tak berhenti sampai wordmark naik di atas cakrawala.
**Narrative trigger:**
- Kalimat vonis pendek yang diketik per kata lalu satu kata disorot ("Work today is broken") → T1
- Metafora jumlah dan keterpisahan (banyak lencana mengorbit satu pusat) → T2
- Pergantian adegan beruntun yang harus terasa satu tarikan → T3
- Klimaks solusi: bidang berubah bentuk jadi kolom cari lalu merek → T4
**Jangan dipakai untuk:** onboarding atau tutorial yang butuh aksi UI nyata, klip berbicara atau podcast, penjelasan panjang.
**Kata kunci gaya:** teal gelap, glow sian, zoom-out terus, sorot seleksi, teaser, minimal
**Diambil untuk:** nama file "IG DbszEmpIfK8": nama tidak menyebut bagian; bagian terkuat: gerak kamera mundur-terus + keluar zoom-out yang menyambung antar-adegan, sorot kata gaya seleksi editor, metafora cincin aplikasi → kolom cari.

## Kondisi footage asli
- 16:9. Tidak ada footage; grafik 3D/2,5D, lencana aplikasi, dan tangkapan layar UI pada panel perangkat.
- Latar gelap: sudut hitam, pusat atas teal gelap; vignette radial kuat (luma tengah 36–50 vs sudut 5–11 pada skala 0–255); satu adegan berbalik putih rata.
- Kamera virtual bergerak terus: tidak ada shot diam kecuali 1 dtk terakhir (wordmark).
- Ruang teks: tengah frame; lencana dan panel di sekeliling.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Sudut hitam `#000000`–`#010206`, pusat teal gelap `#001B27`–`#021019`. Aksen tunggal sian: cincin `#0CB8C0`–`#0EB3BC`, glow `#01BCC2`, cakrawala `#59B5C8`, berkas cahaya `#00708D`; sorot kata biru lebih dingin `#4490D3`. Judul bukan putih murni: `#AEBEC7`; wordmark putih penuh. Adegan putih `#FBFDFA` rata tanpa tekstur. Glow/bloom di semua garis sian; tanpa grain; tepi objek dekat diburamkan.
### Teks
Sans (paling mirip SF Pro Display / Inter) Semibold–Bold, tracking rapat, satu keluarga tanpa serif. Selalu di tengah frame; maks 4 kata per tampil; penekanan hanya lewat kotak seleksi (sekali) dan skala adegan, bukan ukuran per kata. Masuk per kata dari blur ke tajam (0,1 dtk/kata), per huruf diketik di kolom cari, wordmark naik dari abu ke putih.
### Ritme
5 cut dalam 10 dtk (0,78 · 1,83 · 4,10 · 5,93 · 7,95) = 30/menit; shot median 1,9 dtk (0,8–2,3); event visual 48/menit. Tiap shot: masuk cepat, tengah melambat, akhir mempercepat ke cut. Diam hanya 1 dtk terakhir.

## Pola

### T1 · Selection-Box Word Spotlight · typography
- **Trigger:** kalimat vonis pendek yang kata kuncinya disorot ("broken").
- **Yang terlihat (termasuk gerak):** "Work today is broken" masuk per kata dari blur ke tajam di satu baris tengah (x-height 4,4 % H, lebar 41 % W); cut keras punch-in 2,06× di 0,78 dtk (x-height 9,1 %, ascender 12,1 %, baris meluber keluar kiri); kata "broken" disorot kotak seleksi biru dengan dua gagang seperti teks yang dipilih di editor, menyapu per huruf dalam ±0,1 dtk, teks di dalam kotak menjadi gelap; kotak 16,9 % H × ±30 % W. Setelah itu mundur 1,39× dalam 0,5 dtk plus pan kanan 8,8 % W. (k1, k2; 0–1,8 dtk)
- **Kenapa bekerja:** metafora editor teks membuat satu kata terasa "dipilih" untuk dihapus atau diganti; punch-in 2× memberi skala sebelum kata disorot, jadi sorot jadi puncak.
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): latar teal + vignette → baris teks → kotak seleksi (`<div>` biru `#4490D3` opacity 0,9) + dua gagang bulat → salinan teks gelap di dalam kotak (di-clip).
  - Gerak: kata masuk 3 f per kata dengan `CURVE.reveal` dan `filter: blur(8px)`→0; punch-in 1,00→2,06 sebagai cut keras (tanpa interpolate) di frame kata terakhir; kotak seleksi `clipPath: inset(0 100% 0 0)`→`inset(0)` selama 3 f; setelah sorot, mundur 1,00→0,72 selama 15 f `CURVE.heavy`.
  - Ruang: datar.
  - Blur & blend: motion blur di mundur dan di kata masuk (`<CameraMotionBlur shutterAngle={200} samples={16}>`); teks di dalam kotak di-clip dengan `clipPath`.
- **SFX:** famili `glitch`, `mekanik` · pengamatan: klik keyboard per kata dan wood-block pada punch-in; di sini diganti sesuai `../../guide/sfx/GUIDE.md`: judul per kata senyap; satu bunyi di punch-in (`Cut.mp3`) dan satu di sorot (`Enter.mp3`, tombol penting).
- **Pakai bila:** kalimat ≤ 4 kata dengan satu kata isi. · **Jangan pakai bila:** kalimat panjang (punch-in 2× memotong baris).
- **Remix (anti-jiplak):**
  1. Video edukasi → pertahankan kotak seleksi bergagang pada satu kata · ganti latar teal dengan krem dan sorot kuning stabilo.
  2. Iklan jasa → pertahankan punch-in 2× lalu mundur · ganti kata disorot dengan harga.
  3. Latar terang → pertahankan sapuan seleksi per huruf · ganti teks gelap-di-dalam-kotak jadi teks putih di kotak biru tua.
- *Pengamatan di video asli, bukan target:* x-height "broken" 9,05 % H (diukur ulang); pusat blok judul (46–49 %, 50–51 %).

### T2 · Orbiting Badge Rings · layout
- **Trigger:** metafora keterpisahan atau kelebihan jumlah ("terlalu banyak aplikasi yang tidak terhubung").
- **Yang terlihat (termasuk gerak):** 3 cincin konsentris bercahaya sian (terluar ±88 % H diameter di 3,5 dtk, > frame saat masuk); 6–7 lencana aplikasi 10–11 % H lalu 8 % H mengorbit ±45° searah jarum jam selama 2 dtk; teks 2 baris di dalam cincin terdalam ("Too many" x 1,5 % H di atas "disconnected apps" x 2,1 %, lebar 20,5 % W); lencana dekat kamera buram dengan motion blur. Seluruh adegan mundur 3,5× dalam 2 dtk. (k3; 1,83–4,10 dtk)
- **Kenapa bekerja:** satu pusat dengan banyak satelit kecil membuat "banyak" terbaca sekilas; mundur 3,5× membuat cincin terasa membesar dan mengusir penonton.
- **Mekanik Remotion (titik awal):**
  - Lapisan: latar teal → cincin (SVG `stroke` sian + `filter: drop-shadow(0 0 12px #01BCC2)`) → teks pusat → lencana (satu `<div>` per lencana).
  - Gerak: orbit `rotate(0→45deg)` selama 60 f `CURVE.drift`; lencana tegak lurus dengan `rotate(-θ)` agar ikon tidak berputar; seluruh grup scale 3,5→1,0 dengan `CURVE.heavy`.
  - Ruang: 2,5D ringan; lencana depan `translateZ` dengan blur.
  - Blur & blend: lencana depan `filter: blur(3px)` + motion blur; glow cincin `mixBlendMode: "screen"`.
- **SFX:** famili `ui` · pengamatan: ding notifikasi pada cut ke cincin. `Notif.mp3` di cut masuk; lencana senyap.
- **Pakai bila:** ada 5–8 objek yang bisa dikenali dari bentuknya. · **Jangan pakai bila:** objek mirip satu sama lain.
- **Remix (anti-jiplak):**
  1. Toko online → pertahankan satu pusat + satelit mengorbit · ganti lencana aplikasi dengan logo kurir dan marketplace.
  2. Latar putih → pertahankan cincin konsentris · ganti sian bercahaya dengan garis tipis arang.
  3. Konten kreator → pertahankan mundur 3,5× · ganti cincin dengan lingkaran foto profil.
- *Pengamatan di video asli, bukan target:* rasio kata kunci : kata sambung 1,36× (diukur ulang 1,50×); lencana putih punya bayangan lembut.

### T3 · Accelerating Exit Zoom Cut · camera
- **Trigger:** ganti adegan yang harus terasa lanjutan, bukan potongan; kalimat tanpa jeda.
- **Yang terlihat (termasuk gerak):** kurva zoom-out tiap shot: cepat di awal (8–11 %/0,1 dtk), pelan di tengah (1–2 %/0,1 dtk), lalu mempercepat sampai 27 %/0,1 dtk tepat sebelum cut keras (keluar zoom-through, dengan hit SFX). Adegan putih mundur 1,8×; kolom cari ±6 % pelan; wordmark naik 7,7 % H tanpa skala. Pemicu: kata (punch-in setelah kata terakhir diketik) dan selesainya gerak objek (cincin mengecil → cut). (seluruh video)
- **Kenapa bekerja:** percepatan di ujung shot membuat cut terasa sebagai konsekuensi gerak; 80 % cut punya onset SFX dalam 1 frame.
- **Mekanik Remotion (titik awal):**
  - Lapisan: grup adegan di `<AbsoluteFill>` yang di-scale.
  - Gerak: scale dari 1,0 turun ke 0,3 lewat `Easing.bezier(0.1,0.75,0.15,1)` untuk 25 % awal, hold pelan, lalu `Easing.bezier(0.55,0,0.9,0.35)` (`CURVE.leave`) 8 f terakhir; kurva dirancang per shot, bukan satu preset (`../../scripts/remotion/curves.ts`).
  - Ruang: datar.
  - Blur & blend: motion blur 200° dengan 16 sampel pada 8 f terakhir (`../../references/smooth-motion.md`).
- **SFX:** famili `glitch`, `mekanik`, `air` · satu hit tegas di cut (`Cut.mp3` atau `Cutcontrastransision.mp3` untuk terang ↔ gelap); `Woosh.mp3` bila zoom-out besar.
- **Pakai bila:** ≥ 3 adegan beruntun dengan satu pusat visual tiap adegan. · **Jangan pakai bila:** adegan butuh dibaca lama (gerak terus tak memberi jeda).
- **Remix (anti-jiplak):**
  1. Montase fitur aplikasi → pertahankan mundur + cut di percepatan · ganti pusat tiap adegan dengan satu layar fitur.
  2. Pembuka vlog → pertahankan percepatan keluar · ganti dengan zoom-out foto polaroid.
  3. Latar terang → pertahankan kurva · ganti glow dengan bayang jatuh lembut.
- *Pengamatan di video asli, bukan target:* zoom-out ORB per 0,1 dtk; judul 1,39× dalam 0,5 dtk; cincin 3,5× dalam 2 dtk; putih 1,8×.

### T4 · Disc-To-Search-Bar Morph Into Horizon · layout
- **Trigger:** klimaks solusi: dari bentuk abstrak ke fungsi nyata lalu merek.
- **Yang terlihat (termasuk gerak):** cincin glow 3D berputar di sekitar cakram gelap; cakram berubah bentuk (morph) menjadi kolom cari (6,4 dtk) lalu diketik per huruf rata kiri "How can I organize my work?" (x-height 1,8 % H); cincin 3D lewat di depan dan belakang pill dengan motion blur; kolom 48,9–54,4 % W × 10,7–11,4 % H dengan ikon kaca pembesar di ujung kanan; penutup: planet/cakrawala melengkung mulai y 74 % H dengan berkas cahaya vertikal di belakang wordmark (cap 12,9 % H, lebar 35,5 % W, pusat (50 %, 49 %)) yang naik 7,7 % H dalam 0,9 dtk dari abu ke putih. (k5, k6, k7; 6,4–10 dtk)
- **Kenapa bekerja:** morph bentuk tunggal menggantikan cut sehingga klimaks terasa satu objek berubah; ekor diam 1 dtk membuat merek terbaca.
- **Mekanik Remotion (titik awal):**
  - Lapisan: latar teal → cakrawala + berkas cahaya → cincin 3D (belakang) → kolom cari → cincin 3D (depan, buram) → wordmark.
  - Gerak: cakram → pill dengan interpolasi `borderRadius` 50%→999px dan `width` 8→50 % lebar `CURVE.whip` 20 f; teks diketik 1–2 f per huruf; wordmark `translateY(7,7 % H)`→0 `CURVE.reveal` 27 f dan warna `#AEBEC7`→`#FFFFFF`.
  - Ruang: cincin 3D lewat `perspective: 900px` + `rotateX`.
  - Blur & blend: cincin depan `filter: blur(4px)` + motion blur; berkas cahaya `mixBlendMode: "screen"`.
- **SFX:** famili `air`, `riser` · pengamatan: whoosh pada morph (6,55), swell terbalik ke wordmark (7,88), ekor sunyi 0,9 dtk. whoosh famili `air` yang mengembang lembut (file SFXIrfan lama dilarang; `Woosh.mp3` atau `sfx_cari.py --famili air`) di morph; `ES_Designed, Riser, Transition, Fast, Short, Clean 01` menuju wordmark; wordmark dibiarkan hening.
- **Pakai bila:** produk punya satu fungsi pusat yang bisa jadi bentuk kolom/kartu. · **Jangan pakai bila:** fungsi pusat tidak punya antarmuka tunggal.
- **Remix (anti-jiplak):**
  1. Aplikasi catatan → pertahankan morph bentuk → input · ganti pill jadi kartu catatan yang terbuka.
  2. Logo merek lokal → pertahankan wordmark naik dari abu ke putih · ganti cakrawala dengan garis lengkung kertas.
  3. Latar terang → pertahankan morph + hold 1 dtk · ganti glow sian dengan bayang lembut.
- *Pengamatan di video asli, bukan target:* kolom cari diukur ulang 54,35 % W × 11,35 % H (kartu lama 48,9 × 10,7).

### T5 · Tilted Device Panels Around Flat Text · layout
- **Trigger:** "semuanya ada di mana-mana" — banyak layar yang mengelilingi satu kalimat.
- **Yang terlihat (termasuk gerak):** adegan putih rata; 4 panel perangkat miring berisi UI di sudut, terpotong tepi frame, berputar ±50° berlawanan arah jam sedangkan teks 2 baris tetap datar (x 3,1 % H, lebar 25,7 % W); dibangun per kata, kata pertama blur-in; panel punya bingkai tebal hitam-abu sebagai ketebalan perangkat; denting kaca per kata di 4,26–4,57, swell terbalik di bawah panel berputar (4,68–4,94). (k4; 4,10–5,93 dtk)
- **Kenapa bekerja:** teks diam di tengah sementara pinggir berputar menandai kekacauan di sekeliling.
- **Mekanik Remotion (titik awal):**
  - Lapisan: putih rata → panel (CSS 3D, 4 buah) → teks datar.
  - Gerak: `rotate(0→−50deg)` selama 50 f `CURVE.drift`; panel `rotateY(±18deg)` konstan; mundur 1,0→0,55 `CURVE.heavy` (zoom-out 1,8×).
  - Ruang: `perspective: 1000px`.
  - Blur & blend: tepi panel buram sedikit (`blur(2px)`) pada lapis dekat.
- **SFX:** famili `stab`, `riser` · `Lasertransision.mp3` (ting kaca) satu kali pada kata terakhir; swell terbalik hanya satu: riser `ES_Designed, Riser, Transition, Fast, Short, Clean 01`.
- **Pakai bila:** ada 3–4 tangkapan layar yang bisa terpotong tepi. · **Jangan pakai bila:** tangkapan layar harus terbaca.
- **Remix (anti-jiplak):**
  1. Gambaran kekacauan inbox → pertahankan panel berputar mengelilingi teks datar · ganti panel dengan pesan WhatsApp.
  2. Latar gelap → pertahankan panel terpotong tepi · ganti putih rata dengan arang.
  3. 9:16 → pertahankan rotasi berlawanan arah jam · ganti 4 panel jadi 2 di atas dan bawah teks.
- *Pengamatan di video asli, bukan target:* latar putih median `#FDFFFC` (diukur ulang; kartu lama `#FBFDFA`).

## Audio (bila dibedah)
earshot: 27 event (2,7/dtk). Klik keyboard satu per kata saat judul diketik (0,05–0,68), wood-block hit pada punch-in (0,78, −1,3 dBFS, paling keras), ding notifikasi pada cut ke cincin (1,81), denting kaca/lonceng per kata di adegan putih (4,26–4,57), swell terbalik di bawah panel berputar (4,68–4,94), hit pada cut ke gelap (5,90), whoosh pada morph (6,55), swell terbalik ke wordmark (7,88), tick hi-hat 8,02–8,14, ekor sunyi 0,9 dtk. 80 % cut punya onset dalam 1 frame; SFX sejajar musik, bukan di bawahnya. Musik: 0–4 dtk glitch-hop/glockenspiel tipis, 4–10 dtk beat trap dengan hi-hat renyah, tanpa ucapan; tempo lemah (librosa 161, earshot ±187 bpm, pulse clarity 0,23). Mix −14,4 LUFS, true peak +0,8 dBTP (klip), LRA 6,3 LU; paling keras 5,5–8,5 dtk (−12,8 LUFS).

## Yang harus terasa sama saat disandingkan
- Tiap still dari tengah shot sudah lebih kecil (lebih mundur) daripada still awal shot, dan tidak ada shot yang diam selain penutup?
- Gerak terasa cepat di awal, melambat di tengah, dan mempercepat tepat sebelum cut?
- Satu kata disorot kotak seleksi bergagang setelah punch-in, dan itu satu-satunya sorot di video?
- Adegan metafora punya satu pusat besar dengan teks kecil di inti dan lencana sebagai satelit, dengan lapis depan buram?
- Latar gelap bertepi hitam dan pusat teal, hanya satu aksen bercahaya?
- Tepat satu adegan putih rata dengan panel miring yang terpotong tepi?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
