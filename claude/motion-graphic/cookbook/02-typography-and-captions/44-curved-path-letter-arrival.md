---
id: "44"
pola: Curved-Path Letter Arrival
kategori: typography
kategori_lain: [camera, layout]
trigger: hook tutorial "begini cara membuatnya dalam kurang dari satu menit"; judul yang masuk huruf demi huruf; caption langkah di rekaman layar yang berganti mengikuti ucapan
sumber: kreator tutorial After Effects (IG DeCyKOiRa2o) · 1:1 · 39,2 dtk
dilihat_bergerak: tidak
diukur: ya
alias: []
---
# 44 · Curved-Path Letter Arrival

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: https://www.instagram.com/reel/DeCyKOiRa2o/ (file Irfan "IG DeCyKOiRa2o") · 1:1 (720×720), 30 fps, 39,2 dtk · analisis asal: canvas-skill-library, reference_id DeCyKOiRa2o · Frame: `../../guide/referensi/sheets/44-tutorial-text-animation.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/44-k1-hook-judul.jpg` … `44-k8-demo-cta.jpg` (k2 kartu UI, k3 kalimat blur, k4 caption bergaris, k5 UI + caption, k6 menu zoom, k7 ekspresi)
> Video sumber: `/home/irfan/work/canvas-skill-library-20261102/data/online-20261103/data/instagram/3001252af79222356f87/video.mp4` (dicocokkan lewat dimensi dan durasi, belum dipastikan isinya)
> Dilihat bergerak: **tidak** (frame diam tiap 0,5 dtk; 1 px = 0,14 %. Bedah geraknya sebelum dipakai)

**Inti mekanik (1 kalimat):** Huruf judul masuk satu per satu di jalur melengkung turun dengan ukuran yang berubah per huruf, lalu bagian tutorial memakai kamera yang meluncur dari kontrol ke kontrol dengan caption kecil membulat di pita 5 % paling bawah.
**Narrative trigger:**
- Hook tutorial singkat "begini cara membuatnya" dengan judul animasi → T1
- Kalimat hook yang berubah makna ("Nobody wants to reveal" → "How it's done") → T2
- Tiga kartu UI yang melambangkan alat di pembuka → T3
- Langkah demi langkah di aplikasi dengan kontrol kecil → T4
- Caption narasi singkat di atas rekaman layar → T5
- Hook cerah menyambung ke tutorial gelap → T6
**Jangan dipakai untuk:** cerita atau talking head tanpa layar aplikasi.
**Kata kunci gaya:** cerah lalu gelap, tutorial, huruf melengkung, caption membulat, kamera meluncur
**Diambil untuk:** "IG DeCyKOiRa2o": nama tidak menyebut bagian; bagian terkuat: judul animasi per huruf dan caption; kedua: kamera yang mengikuti kontrol.

## Kondisi footage asli
- 1:1 (720×720). Hook: latar ilustratif padang rumput + langit, tajam di belakang teks; teks mengisi pusat.
- Tutorial: satu rekaman layar After Effects yang di-zoom 2–3× (label UI ±2 % tinggi), latar panel `#1D1D1D` rata, tanpa pembicara.
- Kontrol yang dibahas mengisi 40–60 % frame; zona bawah (y 92–97 %) berisi UI dan dipakai caption.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Hook: langit `#54C0F8` → `#67CCFB`, rumput `#A9D24B` (terukur langit `#59C6FF`), awan putih; tanpa vignette dan grain. Tutorial: `#1D1D1D` rata, preview `#000000`. Satu aksen biru: garis caption awal `#2181CD`, isi CTA `#1689E3`; teks lain putih. Tidak ada grade di rekaman layar.
### Teks
Tiga keluarga: judul/hook sans grotesk rapat (mirip SF Pro Display / Inter Medium) putih + bayangan lembut; caption sans geometris membulat (dugaan Quicksand Bold / Nunito ExtraBold); CTA font caption biru + garis putih tebal. Semua kata dalam satu tampil sama ukuran; hierarki antar-adegan: judul 9 % > kalimat 6 % > CTA 6–7,5 % > caption 3,6 %.
### Ritme
6 cut = 9,2/menit, shot median 5,1 dtk, tetapi event visual 34/menit karena kamera berpindah. Pindah framing besar 13× dalam 33,7 dtk (jeda median 2,0 dtk). Hook 5,5 dtk berisi 4 keadaan (±1,4 dtk), tutorial memelan.

## Pola

### T1 · Curved-Path Letter Arrival · typography
- **Trigger:** judul hook yang harus terasa "animasi" (nama efek itu sendiri).
- **Yang terlihat (termasuk gerak):** judul "Text animation": huruf kapital 9 % tinggi, blok 77 % lebar, pusat (50, 50 %). Huruf masuk satu-satu di jalur melengkung turun; "tio" masih naik ±10,6 % saat huruf awal sudah mendarat; huruf ujung kanan ("a", "t") lebih kecil daripada "Text", jadi jalurnya melengkung sekaligus berubah ukuran. Demo akhir: huruf melengkung turun lalu meluruskan ke satu baris. (k1, k8)
- **Kenapa bekerja:** jalur melengkung memberi arah baca dan rasa "jatuh"; ukuran per huruf memberi perspektif tanpa 3D.
- **Mekanik Remotion (titik awal):**
  - Lapisan: latar → huruf (`<span>` per huruf, `display:inline-block`) → bayangan lembut.
  - Gerak: tiap huruf `move(frame, start + i*2, 12, "land")` dari titik di lengkung (busur: x pakai `CURVE.land`, y pakai `CURVE.heavy` lewat `arc()`) ke posisi baris; skala huruf ke ujung 1,0 → 0,6; huruf akhir tertunda `react(i)`.
  - Ruang: datar atau `perspective: 900px` ringan.
  - Blur & blend: motion blur `<CameraMotionBlur shutterAngle={200} samples={16}>`; tanpa blend.
- **SFX:** famili `glitch` · senyap per huruf (`../../guide/sfx/GUIDE.md`); satu `Katapertama.mp3` di huruf pertama judul.
- **Pakai bila:** judul ≤ 3 kata. · **Jangan pakai bila:** kalimat panjang.
- **Remix (anti-jiplak):**
  1. Judul "Diskon 50 %" → pertahankan jalur melengkung · ganti arah ke naik, warna merek.
  2. Latar gelap → huruf putih dengan glow.
  3. 9:16 → lengkung lebih tegak (jalur S).
- *Pengamatan di video asli, bukan target:* kapital "T" 62 px = 8,61 % tinggi (terukur; lama 9 %).

### T2 · Defocus Sentence Swap · typography
- **Trigger:** kalimat hook yang berbalik ("Nobody wants to reveal" → "How it's done").
- **Yang terlihat (termasuk gerak):** kalimat masuk per kata dari kanan (x-height 4,2 %, naik 5,6–6,4 %, blok 81 % lebar, y 46–54 %), lalu seluruh huruf diburamkan (defocus) dan berubah menjadi "How it's done" yang naik pelan (±5 %); latar tajam sepanjang waktu. (k3)
- **Kenapa bekerja:** blur sebagai jembatan; latar tajam membuat teks yang buram terasa "keluar fokus", bukan lenyap.
- **Mekanik Remotion (titik awal):**
  - Lapisan: latar → kalimat A → kalimat B.
  - Gerak: kata masuk `translateX` +30 px → 0 `CURVE.land` ±8 f dengan jeda per kata; swap: A `blur(0→14px)` + opasitas 1 → 0 selama 10 f, B `blur(14→0)` + `translateY` 12 px → 0 selama 12 f `CURVE.reveal`.
  - Ruang: datar. Blur & blend: `filter: blur()` hanya pada teks.
- **SFX:** famili `ui` · `Kinetictypography(gunakansecaraacak).mp3` satu kali di swap.
- **Pakai bila:** dua kalimat yang saling menjawab. · **Jangan pakai bila:** kalimat harus terbaca utuh di frame pertama.
- **Remix (anti-jiplak):**
  1. Video produk → "Semua orang bilang mahal" → "Ternyata cuma Rp…"
  2. UI → kalimat masalah buram menjadi solusi.
  3. Latar terang → teks gelap.
- *Pengamatan di video asli, bukan target:* x-height "o" 32 px = 4,44 %.

### T3 · Tilted Card Stack Push · layout
- **Trigger:** menyebut "alat" atau "kartu fitur" di pembuka tutorial.
- **Yang terlihat (termasuk gerak):** tiga kartu UI membulat miring bertumpuk (biru, hitam berfoto, putih berikon hijau) di tengah langit, masuk dengan dorongan besar (skala 1,74× dalam 0,5 dtk) dan motion blur, lalu bergeser ke kiri; kelompok 73 × 43 % (terukur 68,9 × 41,1 %), pusat (50, 45 %). Beberapa objek kecil bersayap tersebar di langit. (k2)
- **Kenapa bekerja:** tiga lapis dengan bayangan jatuh memberi kedalaman; blur gerak memberi tenaga.
- **Mekanik Remotion (titik awal):**
  - Lapisan: langit → kartu 3 → 2 → 1 (bayangan jatuh) → teks.
  - Gerak: tiap kartu `scale` 1,74 → 1 + `rotateZ` ±6° selama 15 f `CURVE.land`, jeda `react(i)`; geser kiri 10 % selama 18 f `CURVE.heavy`.
  - Ruang: `translateZ` berbeda per kartu. Blur & blend: `<CameraMotionBlur>`, bayangan `boxShadow` lembut.
- **SFX:** famili `air`, `ui` · `pop up.mp3` per kartu hanya bila tiap kartu penting; bila tidak satu `Woosh.mp3`.
- **Pakai bila:** 3 objek yang setara. · **Jangan pakai bila:** objek harus dibaca.
- **Remix (anti-jiplak):**
  1. Tiga paket harga → pertahankan tumpukan miring · ganti warna ke palet merek.
  2. Kartu foto UMKM.
  3. Latar gelap → kartu bergaris tipis.
- *Pengamatan di video asli, bukan target:* skala 1,74× dalam 0,5 dtk.

### T4 · Control-to-Control Camera Glide · camera
- **Trigger:** tiap langkah tutorial yang menunjuk kontrol berbeda ("Go to animate", "add another animator").
- **Yang terlihat (termasuk gerak):** kamera meluncur ease-out: langkah pertama 36–55 % lebar dalam 0,5 dtk, sisa 10–25 % di 0,5 dtk berikutnya, berhenti ±1 dtk (12,5→13,5 dtk: −36 %, −10 %, lalu diam). Zoom out 0,64× (23 dtk) dan zoom in 1,66× (26,5 dtk) untuk pindah panel; motion blur saat meluncur; kontrol yang dibahas mengisi 40–60 % frame (menu Animate 40 × 62 %). (k5, k6, k7)
- **Kenapa bekerja:** kamera menunjuk apa yang dibicarakan; jeda 1–4 dtk memberi waktu baca.
- **Mekanik Remotion (titik awal):**
  - Lapisan: rekaman layar satu `<AbsoluteFill>` di `scale`/`translate` → caption (tidak ikut transformasi).
  - Gerak: pose kamera dari array keyframe per langkah; `translate` dengan `CURVE.heavy` ±15 f; zoom antar-panel `CURVE.whip` ±18 f.
  - Ruang: datar. Blur & blend: `<CameraMotionBlur shutterAngle={200} samples={16}>`.
- **SFX:** famili `air`, `mekanik` · whoosh/scan famili `air` tanpa desis (file SFXIrfan lama dilarang; `sfx_cari.py --famili air`) hanya pada zoom antar-panel; langkah kecil senyap. Di asli: 1 whoosh (20,76 dtk), 1 klik kunci (32,55 dtk).
- **Pakai bila:** UI kecil yang perlu diperbesar. · **Jangan pakai bila:** UI sudah besar.
- **Remix (anti-jiplak):**
  1. Tutorial Canva/Figma → pertahankan meluncur per kontrol · ganti ke zoom ke tombol.
  2. Rekaman kode → pertahankan glide · ganti ke baris yang disorot.
  3. 9:16 → panel vertikal, glide ke atas-bawah.
- *Pengamatan di video asli, bukan target:* 13 pindah framing dalam 33,7 dtk; jeda median 2,0 dtk.

### T5 · Bottom-Strip Rounded Caption · typography
- **Trigger:** narasi langkah berupa 1–3 kata yang berganti di tempat yang sama.
- **Yang terlihat (termasuk gerak):** putih tanpa kotak, bayangan hitam tipis; kapital 3,6 % (terukur 3,47 %), x-height 2,5 %, blok 18–35 % lebar, pusat x 50 %, y 92,5–97,2 % (pusat 94,86 %), menimpa UI. 1–3 kata per tampil; frasa diganti di tempat yang sama, kadang ditambah per kata ("in" → "in <1" → "in <1 minute"); masuk/keluar sigap. Caption awal (5,5–8 dtk): putih bergaris biru + glow di y 52–61 %, naik ±4 % dalam 0,5 dtk. (k4, k5)
- **Kenapa bekerja:** pita bawah tidak menutup kontrol UI penting; kata berganti mengikuti ucapan.
- **Mekanik Remotion (titik awal):**
  - Lapisan: rekaman → caption (zona y 92–97 %).
  - Gerak: ganti kata dengan `<Sequence>` per frasa, tanpa interpolasi.
  - Ruang: datar. Blur & blend: `textShadow` hitam 0 1px 3px.
- **SFX:** senyap (kata per kata).
- **Pakai bila:** UI di tengah, pita bawah bebas. · **Jangan pakai bila:** UI memakai pita bawah.
- **Remix (anti-jiplak):**
  1. Video produk → caption di pita bawah · ganti ke teks gelap di latar terang.
  2. Presenter → pindah ke dada.
  3. 9:16 → pita di atas safe zone.
- *Pengamatan di video asli, bukan target:* blok (236,666,484,700) = pusat (50 %; 94,86 %).

### T6 · Flat-Flash Cut To Dark Panel · camera
- **Trigger:** pindah dari hook cerah ke tutorial gelap ("So here's…").
- **Yang terlihat (termasuk gerak):** cut keras pada 5,5 dtk dengan satu frame bentuk geometris putih miring (wipe/flash), langsung ke UI gelap. Pemicu: kata "So here's". (belum dibedah per frame)
- **Kenapa bekerja:** satu frame putih menutup loncatan cerah → gelap.
- **Mekanik Remotion (titik awal):**
  - Lapisan: hook → bentuk putih (1–2 f) → tutorial.
  - Gerak: bentuk `rotate(-20deg)` melintang penuh frame 2 f, cut di tengahnya.
  - Ruang: datar. Blur & blend: tanpa.
- **SFX:** famili `glitch`, `mekanik` · `Cut.mp3` atau `Cutcontrastransision.mp3` (cut terang ↔ gelap).
- **Pakai bila:** perubahan dunia terang → gelap. · **Jangan pakai bila:** dunia berwarna sama.
- **Remix (anti-jiplak):**
  1. Presenter terang → UI gelap · ganti bentuk ke blok warna merek.
  2. Foto produk → rekaman layar.
  3. 16:9 → bentuk miring lebih lebar.
- *Pengamatan di video asli, bukan target:* 91 % cut punya onset dalam 100 ms; hanya 1 cut ditemani whoosh.

## Audio (bila dibedah)
earshot: 297 onset (7,6/dtk); label: 26 UI/pop, 3 foley, 1 hit (11,67 dtk), 1 klik kunci (32,55 dtk), 1 whoosh (20,76 dtk). Label banyak keliru karena musik dan suara padat. Musik elektronik ber-beat, tempo librosa 161 (hook) → 136 (tutorial) → 118 bpm (demo); mix −14,3 LUFS, true peak −0,5 dBTP, LRA 4,1 LU. Level musik terhadap suara tidak terukur.

## Yang harus terasa sama saat disandingkan
- Huruf judul terasa jatuh di lengkung, bukan muncul per huruf lurus?
- Latar hook tetap tajam saat kalimat memburam?
- Kamera menunjuk kontrol yang dibicarakan dan berhenti cukup lama untuk dibaca?
- Caption kecil di pita bawah tidak menutup kontrol UI?
- Hook cerah dan tutorial gelap terasa dua dunia yang disambung satu flash?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
