---
id: "24"
pola: Visual-Event Pop Mapping
kategori: sfx
kategori_lain: [typography, layout, camera]
trigger: promo atau explainer fitur 30–60 dtk dengan VO yang menyebut elemen layar satu per satu; teks, ikon, atau UI yang berganti hampir tiap detik; pembalik "daripada X, cukup Y" setelah jeda sunyi
sumber: Sound efex 2 (promo aplikasi berbagi foto; arsip Motion) · 16:9 · 40,1 dtk
dilihat_bergerak: tidak
diukur: ya
alias: []
---
# 24 · Visual-Event Pop Mapping

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: `Sound efex 2.mp4` (folder asal: Motion; analisis asal canvas-skill-library, reference_id LOC-66bdc54741a3; promo Nma Photo) · 16:9 (1276×718), 30 fps, 40,1 dtk · Frame: `../../guide/referensi/sheets/24-sound-efex-photo-discovery.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/24-k1…k8-*.jpg` (k1 foto hero + teks samping, k2 teks dua ukuran, k3 foto melayang, k4 **menampilkan teks merah "Never get them!", bukan dock** (periksa), k5 roda kata, k6 grid pil fotografer, k7 mockup web miring, k8 toggle di lanskap 3D) · Ukuran mentah: `../../guide/referensi/ukuran/24-sound-efex-photo-discovery-ukuran.md` · Laporan periksa: `../../guide/referensi/ukuran/24-sound-efex-photo-discovery-periksa.md`
> Video sumber: `/home/irfan/work/canvas-skill-library-20261102/data/local-videoanalys-20261102/Motion/Sound efex 2.mp4`
> Dilihat bergerak: **tidak** (bedah dari frame diam, onset audio, dan label earshot; label bunyi dari model, belum didengar telinga; tanpa stem terpisah VO/musik/SFX). Kedalaman bedah: dalam.

**Inti mekanik (1 kalimat):** Hampir setiap perubahan gambar (teks muncul, ikon masuk, pil menjadi tombol, toggle berpindah) diberi satu bunyi pendek yang sesuai jenis objeknya di atas musik 4/4 ±102 bpm, dengan sub-drop di awal tiap babak dan satu breakdown tanpa bass sebelum pembalik.
**Narrative trigger:**
- Promo atau explainer yang tiap kalimatnya menunjuk satu elemen layar → T1, T3
- Awal babak atau konsep baru ("Instead of…", "Premium Features") → T2
- Pembalik masalah → solusi setelah jeda sunyi → T2
- Teks satu sampai tiga kata dengan kata sambung kecil di atas kata kunci → T4
- Menunjukkan "banyak vs satu" (foto melayang, grid pil) → T5
- Gambar berganti tanpa cut keras (hanya 5 cut dalam 40 dtk) → T6
**Jangan dipakai untuk:** talking head, cerita emosional panjang, konten tenang tanpa musik berdenyut.
**Kata kunci gaya:** bersih, pastel hangat, sigap, Apple-ish, padat SFX, satu aksen merah
**Diambil untuk:** nama file: "Sound efex" → SFX (bagian 7, dibedah paling dalam). Bagian terkuat berikutnya: teks kinetik dan ritme. Catatan: kategori sfx di cookbook ini adalah kosakata dan pemetaan, bukan target kepadatan; kepadatan mengikuti objek penting (`../../guide/sfx/GUIDE.md`: satu bunyi per objek penting, kata KT per kata senyap).

## Kondisi footage asli
- 16:9; tidak ada footage kamera. Gambar nyata hanya foto acara/potret dalam kartu bersudut bulat (radius ±8 % sisi pendek, bayangan lembut, tidak pernah full-frame) dan screenshot web produk.
- Latar putih kebiruan dengan gumpalan merah muda di sudut bawah (gradien mesh yang bergeser antar-adegan); tanpa grain, tanpa vignette gelap.
- Objek bergantian: satu subjek besar (foto hero 47×48 %, toggle 55×20 %) dan banyak objek kecil (8–9 foto 11–18 % lebar, pil 37–41 % lebar, terpotong tepi).
- Hampir tiap adegan bergerak pelan (skala 2–6 % per 0,5 dtk); diam total hanya URL penutup (38,5–40 dtk).

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
- Latar `#FCF8FD`; gumpalan merah muda `#F3D7D7`→`#F5C1BC`/`#F7B4B0`; penutup putih `#FFFFFF`. Aksen tunggal merah teks `#E53726`–`#E53828` (periksa: teks aktual `#D8282A`, tiap kanal ≤ 20 dari rentang), teks daftar `#CA372C`, logo `#FE3300`; oranye `#E55D2F` hanya untuk kata sambung kecil dan blob pembuka; teks netral `#251F23`.
- Satu adegan berwarna: lanskap bukit 3D (langit `#B0CFE1`, bukit `#FCB6AA`/`#FDE0B7`/`#F6BF8B`) di belakang toggle kaca.
### Teks
- Sans grotesk (padanan SF Pro Display/Inter) Semibold–Bold, tracking rapat; pil memakai sans bulat karena itu UI produk. 1–3 kata per tampil, selalu di tengah (cx 49–51 %, cy 46–54 %), kata utama 9,5–12,5 % tinggi baris. Penekanan: merah = aksi/masalah, hitam = konsep.
### Ritme
- Hanya 5 cut keras (5,8 · 7,2 · 8,3 · 29,5 · 34 dtk) tetapi komposisi berganti ±36 kali (±54/menit, median ±1,0 dtk) lewat morph/blur/zoom. Cepat 0–13 dtk dan 23–27 dtk; lambat 16–18,5 (grid pil), 19–23 (mockup), 27–29,5 (toggle). RMS turun ke −29/−31 dB di 21–22,5 dtk sebelum "Instead of".

## Pola

### T1 · One-Pop-Per-Change Pairing · sfx
- **Trigger:** teks atau ikon yang baru muncul pada kalimat VO; promo dengan banyak elemen layar kecil.
- **Yang terlihat (termasuk gerak):** tiap teks, ikon, atau kartu yang muncul diikuti satu pop pendek; sekitar 1 bunyi per perubahan visual (onset audio 54 = 81/menit; event earshot 6,0/dtk). Pop pendek (decay 40–130 ms, centroid 1,5–3,5 kHz). Pemetaan terukur: 10,31/10,45 pop ikon kamera di "Take a [ikon] Selfie" (terkeras, +16 dB); 19,48–19,81 tiga pop beruntun saat mockup masuk; 30,45 counter poin. (k1…k8; 0–40 dtk)
- **Kenapa bekerja:** kepadatan tinggi bisa diterima karena tiap bunyi menempel satu kejadian visual dan jenisnya sama untuk peran yang sama; musik 4/4 menjaga bunyi tetap di bawah denyut.
- **Mekanik Remotion (titik awal):**
  - Lapisan (audio): musik bed → VO → lapisan SFX per cue (`<Audio>` di `<Sequence from={frame objek}>`), puncak bunyi jatuh di frame visual, tidak mendahului objek.
  - Gerak: jadwal cue dibangkitkan dari `objects.json` (frame kemunculan objek); jarak antarbunyi ≥ 100 ms dan ≤ 5 cue dalam 2 dtk (`../../guide/sfx/GUIDE.md`).
  - Ruang: tidak berlaku.
  - Blur & blend: tidak berlaku; level pop −4…−10 dB di bawah puncak, detail kecil −12…−16 dB.
- **SFX:** `pop up.mp3` untuk kartu/post muncul; `ES_User Interface, Click, Pops, Glass, UI, Pops` untuk pop lembut ikon; kata KT per kata tetap senyap (GUIDE: bunyi per kata ditolak).
- **Pakai bila:** tiap objek muncul sebagai kejadian terpisah dan jelas. · **Jangan pakai bila:** teks hanya subtitle per kata (kata KT per kata senyap) atau cerita sinematik (bunyi UI salah palet).
- **Remix (anti-jiplak):**
  1. Promo SaaS → pertahankan satu pop per objek baru, jenis bunyi sama untuk peran sama · ganti ikon kamera dengan tombol fitur produk.
  2. Katalog UMKM → pertahankan pasangan satu bunyi satu kartu · ganti foto acara dengan foto produk, pop dengan `Notif.mp3` untuk pesanan masuk.
  3. 9:16 → pertahankan 1 bunyi per perubahan · jarak bunyi diperlebar (maks 3 cue per 2 dtk) karena layar lebih kecil.
- *Pengamatan di video asli, bukan target:* pop 9–17 dB di atas bed (puncak −1 s/d −9 dBFS), setara atau sedikit di bawah VO (+20–28 dB di atas bed).

### T2 · Section-Start Sub Drop with Breakdown · sfx
- **Trigger:** awal babak atau konsep baru; pembalik masalah → solusi; masuk ke puncak ("Instead of").
- **Yang terlihat (termasuk gerak):** sub-drop 300–2000 ms di awal tiap babak (1,7 · 8,26 · 11,83 · 14,61 · 31,95 dtk); satu whoosh untuk ganti babak (8,68 ke "Just"); bass/kick penuh 0–17,5 dtk, breakdown tanpa bass 17,5–27 dtk (RMS −29/−31 dB di 21–22,5 dtk), bass kembali tepat di 27 dtk saat toggle lanskap; outro turun ke −25/−28 dB RMS di 38–40 dtk. Uplifter/swish di 39,37 dtk. (sheet seluruh video)
- **Kenapa bekerja:** pembalik terasa karena didahului sunyi; sub-drop menandai awal babak tanpa teks tambahan.
- **Mekanik Remotion (titik awal):**
  - Lapisan (audio): musik per bagian dengan `volume` per frame; sub-drop sebagai cue terpisah.
  - Gerak: `volume` bed turun ke ~−12 dB dalam 12 f sebelum pembalik; bass dan bed kembali penuh pada frame objek puncak (`interpolate`, `CURVE.reveal`); sub-drop mulai ±3 f sebelum frame visual agar puncak bunyi jatuh di frame.
  - Ruang: tidak berlaku.
  - Blur & blend: tidak berlaku.
- **SFX:** `ES_Designed, Bass Dive, Bass Drop, Deep Sub, 50Hz` untuk twist dan punchline; `ES_Designed, Riser, Transition, Fast, Short, Clean 01` menuju pembalik; `Woosh.mp3` untuk ganti babak; kick pendek dan hi-hat kiblat tidak ada di SFXIrfan.
- **Pakai bila:** ada struktur masalah → pembalik → solusi. · **Jangan pakai bila:** konten tanpa pembalik (sub-drop jadi hiasan).
- **Remix (anti-jiplak):**
  1. Iklan jasa → pertahankan breakdown sunyi sebelum kalimat solusi · ganti tech house dengan musik piano tipis.
  2. Video produk 16:9 → pertahankan bass kembali di objek puncak · ganti toggle lanskap dengan peluncuran produk.
  3. 9:16 → pertahankan sunyi 1,5 dtk · lebih pendek (60 f) agar tidak kehilangan ritme.
- *Pengamatan di video asli, bukan target:* bass <150 Hz 13–19 dB di 0–17,5 dtk; −8…+5 dB di 17,5–27; 11–17 dB di 27–37. Terkeras 30–33 dtk (−12,9 LUFS short-term).

### T3 · Literal UI Click Mapping · sfx
- **Trigger:** elemen UI yang bergerak sesuai ucapan ("Download" → toggle pindah; "One Event" → pil jadi tombol).
- **Yang terlihat (termasuk gerak):** pil fotografer menjadi tombol merah "One Event" (17,67 dtk) dengan bunyi tepat di perubahan; toggle Browse → Preview → Download dengan klik di 28,21 / 28,63 / 29,09 dtk (lanskap 3D buram, toggle kaca tajam); klik dock 7,24 dtk (+12 dB); ding glockenspiel pada klik UI (toggle 27,4 · 29,9; ikon 11,15). Gerak menggambarkan ucapan secara harfiah ("Chase Photographer" = foto menjauh). (k5, k6, k8)
- **Kenapa bekerja:** bunyi dan gerak jatuh di frame yang sama dan sesuai peran UI (klik = tombol berubah), jadi gerak terasa berbobot.
- **Mekanik Remotion (titik awal):**
  - Lapisan: toggle/pil (komponen React dengan state dari frame) → bayangan lembut → latar.
  - Gerak: toggle `translateX` 8–10 f `CURVE.land` per posisi; pil → tombol: `width`/`background` morph 10 f `CURVE.reveal`; cue bunyi di frame awal gerak.
  - Ruang: toggle kaca di atas lanskap `blur(12px)`.
  - Blur & blend: backdrop blur kaca (`backdropFilter: blur(20px)`).
- **SFX:** `ES_User Interface, Click, UI Buttons, Confirm, Menu` untuk konfirmasi; `Enter.mp3` untuk klik penting; `ES_User Interface, Click, Pops, Glass, UI, Pops` untuk ding lembut; hanya klik UI yang benar-benar terjadi di layar.
- **Pakai bila:** UI asli atau tiruan yang mengubah keadaan. · **Jangan pakai bila:** adegan sinematik (bunyi UI salah palet).
- **Remix (anti-jiplak):**
  1. Onboarding aplikasi → pertahankan satu klik per perubahan state · ganti toggle jadi tab dan lanskap jadi dashboard.
  2. Formulir pesanan UMKM → pertahankan tombol yang berubah warna · ganti pil fotografer dengan opsi pengiriman.
  3. 16:9 latar gelap → pertahankan klik tegas · ganti kaca terang jadi kaca gelap.
- *Pengamatan di video asli, bukan target:* pil Mobe 40,00 % lebar × **26,15 %** tinggi (periksa, menggantikan ±17 %); toggle 55–56 × 20–23 % (dengan glow).

### T4 · Small-Over-Large Text Pair · typography
- **Trigger:** frasa dengan kata sambung dan kata kunci ("Where are my PHOTOGRAPHS?"); kata merah untuk masalah.
- **Yang terlihat (termasuk gerak):** satu sampai tiga kata di tengah; kata sambung kecil oranye (5,2 %) menempel tepat di atas kata kunci kapital hitam (9,54 % menurut periksa; rasio baris 1,76×); teks pendamping foto dua baris hitam 3,9–4,9 % di kiri dan kanan foto (x 9–17 % dan 78–91 %). Masuk dari blur dengan skala turun pelan (−2…−6 % per 0,5 dtk); per kata ditambah ("Sending" → "Sending Huge" → "Sending Huge Files"); "Sometimes" per huruf; roda kata (kata aktif merah penuh, tetangga pudar ±30 % opasitas, panah merah di kiri). (k1, k2, k5)
- **Kenapa bekerja:** teks di tengah bidang polos; satu aksen merah; kata sambung menempel kata kunci sehingga terbaca satu frasa.
- **Mekanik Remotion (titik awal):**
  - Lapisan: latar gradien mesh → teks.
  - Gerak: `blur(10px)→0` + `scale` 1,06→1 dalam 8–10 f `CURVE.reveal`, lalu pull `scale` 1→0,95 selama hold `CURVE.drift`; roda kata: `translateY` 8 f `CURVE.land`, tetangga `opacity` 0,3.
  - Ruang: datar.
  - Blur & blend: blur masuk saja.
- **SFX:** senyap per kata (KT); satu `pop up.mp3` hanya pada kata puncak yang bergerak sebagai objek.
- **Pakai bila:** frasa 1–3 kata di bidang polos. · **Jangan pakai bila:** latar ramai atau kalimat panjang.
- **Remix (anti-jiplak):**
  1. Judul promo produk → pertahankan kata sambung kecil di atas kata kunci · ganti merah-oranye ke satu aksen merek.
  2. Latar gelap → pertahankan pasangan dua ukuran · ganti hitam ke putih, kata sambung abu.
  3. 9:16 → pertahankan roda kata · tetangga hanya satu di atas dan satu di bawah.
- *Pengamatan di video asli, bukan target:* "PHOTOGRAPHS?" 58 px = 9,54 % tinggi, rasio baris 1,76× (periksa, cocok); "Where are my" 5,2 %; "Never get them!" 12,5 %.

### T5 · Hero Card vs Scattered Cluster Alternation · layout
- **Trigger:** menunjukkan satu hal penting lalu banyak hal; "banyak fotografer?" vs "satu tempat".
- **Yang terlihat (termasuk gerak):** foto hero di tengah dalam kartu bersudut bulat (46,94×48,36 %) dengan bingkai merah-kuning di dalam foto dan tangan menjulur ke luar; berganti ke 8–9 foto melayang tersebar (11–18 % lebar, tepi kiri dan kanan-bawah buram); grid pil bergeser pan kiri ±3 %/0,5 dtk dengan tiga baris terpotong tepi; mockup web miring 3D memudar ke bawah (±90 % lebar). Bayangan lembut merah muda di bawah kartu dan pil. (k1, k3, k6, k7; 0–23 dtk)
- **Kenapa bekerja:** pergantian satu besar ↔ banyak kecil membawa pesan "kacau vs rapi" tanpa teks; objek tepi buram menjaga fokus.
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): gradien mesh → kartu/pil buram di tepi (`blur(6px)`) → kartu fokus → teks.
  - Gerak: foto melayang masuk `translate` kecil + `scale` 0,9→1 7 f `CURVE.land`, stagger 2–3 f; grid pil `translateX` konstan (3 % per 15 f); mockup `rotateX(55°) rotateZ(−30°)` dengan `perspective: 1400px`.
  - Ruang: `perspective` pada mockup; parallax 0,8×/1×/1,2× untuk foto melayang.
  - Blur & blend: lapis tepi buram; mockup memudar dengan mask gradien.
- **SFX:** `Pergantianfoto.mp3` (potong satu klik per foto, atau rentetan) untuk foto yang berganti; `pop up.mp3` untuk kartu muncul.
- **Pakai bila:** ada kontras banyak vs satu dalam cerita. · **Jangan pakai bila:** hanya satu objek.
- **Remix (anti-jiplak):**
  1. Marketplace UMKM → pertahankan hero vs gugus tersebar · ganti foto acara dengan foto produk.
  2. UI SaaS → pertahankan mockup miring 3D memudar ke bawah · ganti web produk dengan dashboard.
  3. Latar gelap → pertahankan lapis tepi buram · ganti bayangan merah muda dengan glow tipis.
- *Pengamatan di video asli, bukan target:* kartu hero 507×294 px = 46,94×48,36 % frame; kartu mockup 21–24 % lebar, toggle 56×23 % (dengan glow).

### T6 · Cutless Morph Transition Set · camera
- **Trigger:** pergantian cepat tanpa cut keras; kata VO atau ketukan memicu perubahan komposisi.
- **Yang terlihat (termasuk gerak):** blur-dissolve (blob oranye melebar jadi teks, 1,5 dtk), morph (pil → tombol, foto → siluet), zoom-through (33,5 → 34 dtk, skala +142 % dalam 0,5 dtk, swish di 34,65), wipe lewat objek (siluet kepala menyapu di 12,5 dtk), hard cut di ketukan (hanya 5 dalam video). Kamera pada teks: pull 2–6 %/0,5 dtk; foto hero push +1,2→+2,4 %/0,5 dtk. (sheet seluruh video)
- **Kenapa bekerja:** gerak kecil terus-menerus ditambah morph membuat gambar berganti terasa mengalir sementara bunyi menandai tiap perubahan.
- **Mekanik Remotion (titik awal):**
  - Lapisan: adegan A → bentuk transisi (blob, siluet) → adegan B.
  - Gerak: blur-dissolve `blur(0→24px)` + `opacity` 12–15 f; zoom-through `scale` 1→2,4 `CURVE.whip` 8–10 f; morph `clipPath`/`borderRadius` 10 f `CURVE.reveal`.
  - Ruang: zoom-through menembus objek (teks besar di depan kamera).
  - Blur & blend: `<CameraMotionBlur shutterAngle={200} samples={16}>`.
- **SFX:** `Wooshcameramovementtransisi.mp3` di zoom-through; `Woosh.mp3` untuk ganti babak; `ES_User Interface, Glitch, Glitch Databend 04` bila transisi antarbabak berupa glitch.
- **Pakai bila:** tiap adegan punya elemen yang bisa menjadi jembatan. · **Jangan pakai bila:** narasi yang butuh potongan tegas.
- **Remix (anti-jiplak):**
  1. Promo fitur → pertahankan blur-dissolve dari blob ke teks · ganti blob oranye ke warna merek.
  2. Latar gelap → pertahankan zoom-through lewat teks · ganti teks putih lebih tebal.
  3. 9:16 → pertahankan morph bentuk · arah zoom-through vertikal.
- *Pengamatan di video asli, bukan target:* zoom-through s +142 % di 33,5–34 dtk; ORB menunjukkan teks −6,4/−2,3/−2,3 % per 0,5 dtk di 9–10,5 dtk.

## Audio (bila dibedah)
- Kosakata (earshot 96 event bertag dari 239): 47 UI pop/klik, 17 hit sub-bass, 6 kick/drum, 3 nada glockenspiel/piano, 2 tekan tombol, 1 whip whoosh (8,68), 1 uplifter/swish (39,37); ke-96 label dari model, belum didengar.
- Pemetaan terukur lain: 7,24 klik dock (+12 dB); 17,67 pil jadi tombol; 34,65 swish zoom-through; 38,49 hi-hat saat logo. Bunyi VO kadang dipotong jadi chop vokal sebagai bagian musik.
- Musik: tech house dengan vocal chop, ±102–103 bpm (earshot 102, librosa 103,4), pulse lemah 0,17. Mix −14,4 LUFS, true peak −0,4 dBTP (terlalu panas), LRA 4,1 LU.

## Yang harus terasa sama saat disandingkan
- Hampir setiap perubahan visual penting punya satu bunyi pendek yang sesuai jenis objek, bukan bunyi per kata?
- Jeda sunyi sebelum pembalik terasa jelas, dan bass kembali tepat di objek puncak?
- Teks dua ukuran: kata sambung kecil menempel di atas kata kunci, satu aksen merah?
- Pergantian satu objek besar ↔ banyak objek kecil terbaca sebagai kontras?
- Gambar berganti lewat morph/blur dengan sedikit cut keras?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
