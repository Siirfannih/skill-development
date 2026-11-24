---
id: "17"
pola: Diegetic Tag Explainer
kategori: layout
kategori_lain: [typography, camera]
trigger: menyebut daftar objek atau kategori satu per satu; penjelasan data atau skala ("lalu seluruh 50 negara bagian"); pembuka explainer yang menyisipkan kata dan ikon ke dalam satu judul
sumber: _ganimate_ (showreel studio motion, mosaik 2×2) · 16:9 · 14,4 dtk
dilihat_bergerak: ya
diukur: ya
alias: []
---
# 17 · Diegetic Tag Explainer

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: _ganimate_, `_ganimate__DfICqhOvP-0.mp4` (nama asli "_ganimate_ showreel"; empat panel explainer diputar bersamaan, tiap panel 640×360) · 16:9 (1280×720), 23,98 fps, 14,4 dtk · Frame: `../../guide/referensi/sheets/17-ganimate-editorial-explainer.jpg` (juga `17-ganimate.jpg`) · Frame kunci: `../../guide/referensi/sheets/keyframes/17-k1…k8-*.jpg` (k1 tipografi gelap, k2 arsip + satu kata, k3 UI asli + dock, k4 hero + kotak kuning, k5 isometrik + tag, k6 koin 3D + tag, k7 peta piksel + tag, k8 chart editorial) · Bedah lengkap: `../../guide/referensi/ganimate.md` (kode G-T/G-X, komponen Remotion), data ukur `../../guide/referensi/ukuran/17-ganimate-ukuran.md`, laporan periksa `../../guide/referensi/ukuran/17-ganimate-periksa.md`
> Video sumber: `/home/irfan/work/pustaka-video/mac/_ganimate__DfICqhOvP-0.mp4`
> Dilihat bergerak: **ya** (diverifikasi lewat strip 2 fps `_ganimate__DfICqhOvP-0.mp4`: morph judul `Graphic -> AI + tools`, dock/UI zoom, perpindahan sumbu tunggal antar bangunan isometrik, koin 3D, peta piksel, dan bar chart editorial berlabel tag). Kedalaman bedah: sedang. Tiap proyek hanya tampil sebagai panel 640×360 (±0,28 % tinggi per piksel) dan potongan ≤ 14 dtk; audio satu campuran untuk keempat panel.

**Inti mekanik (1 kalimat):** Objek nyata (bangunan isometrik, koin, peta, UI asli) masuk satu per satu tepat saat disebut, masing-masing diberi satu label kotak berwarna yang menempel di tepinya, dan kamera hanya bergeser sepanjang satu sumbu supaya daftar yang bertambah terbaca sebagai gerak maju.
**Narrative trigger:**
- Daftar objek atau kategori yang disebut berurutan ("sekolah, universitas, hotel, dealer…") → T1, T2
- Pergantian skala atau data ("lalu seluruh negara bagian", "pendapatan per sumber") → T2
- Kata kunci hero di tengah kalimat yang tumbuh kata demi kata ("Mana sumber AI…") → T3
- Judul pembuka dengan kata baru yang disisipkan atau diganti ikon ("Graphic → AI tools") → T4
- Kata tunggal berat di atas footage arsip untuk memulai babak → T5
- "Tanyakan ke AI" atau demo kolom input → T6
**Jangan dipakai untuk:** talking head emosional (tidak ada wajah pembicara sebagai A-roll di referensi), cerita personal tanpa objek yang bisa ditunjuk, kalimat panjang yang harus terbaca utuh.
**Kata kunci gaya:** editorial, tech, bersih, sigap, mahal
**Diambil untuk:** nama file "_ganimate_ showreel" tidak menyebut bagian; bagian terkuat: sistem teks + tag (§2 kartu lama) dan motion graphic isometrik/data (§5). Tidak diambil: panel arsip ber-grain sebagai gaya (hanya dicatat di T5).

## Kondisi footage asli
- 16:9; tidak ada talking head sebagai A-roll (sisipan wajah tokoh hanya di montase 3×3 dan klip arsip pendek).
- Empat mode latar, satu per adegan: hitam rata (kata tunggal), navy dengan grid 1 px (isometrik, peta, tag), putih dengan garis registrasi (editorial, chart), wallpaper alam + dock (UI asli).
- Satu subjek sedang mengisi 35–70 % lebar per adegan (bukan banyak ikon kecil); ruang kosong mengelilingi subjek untuk tempat tag.
- Kamera: diam di grafik datar; truck diagonal di isometrik; zoom ke UI; push pelan di arsip.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
- Tiga latar: hitam `#000000`–`#050505`; navy `#020A15` + grid 1 px `#1D2530`; putih `#FFFFFF` / UI `#FAFAFA`.
- Aksen: teal tag `#12A4A5`–`#23A9AD` (teks di dalam tag `#A6E6E9`), teal peta `#0B7376`, kuning sorotan `#F4D650` (bar chart `#F4D76F`), oranye gradien judul `#C17855`→`#E8976B` (hanya pembuka), biru "AI" `#98ABE8` dengan glow `#E3E7F5`.
- Chart: bar lain abu `#E5E5E5`, satu bar kuning. Editorial: garis registrasi 1 px `#454545` + titik kotak hitam di simpul.
- Tekstur: arsip ber-grain dan scanline; kata "Wattage" dengan RGB-split tipis; grafik datar tanpa grain; tanpa vignette di grafik.
### Teks
- Grotesk geometris (padanan Aeonik / Manrope / Inter Display); monospace kecil untuk label chart. Bobot Regular–Medium, tetapi "Wattage" dan kata arsip tampak Semibold/Bold, jadi batas "maks Medium" tidak mutlak.
- Tiga tingkat saja: hero (cap 18–25 % tinggi panel), kata (7–11 %), tag/label (5–7 %); rasio hero : kata ±3–4×, hero : label chart ±12×. Tanpa ukuran perantara.
- Kata per tampil 1–3 (tag ≤ 4, dua baris). Penekanan = kotak warna penuh, bukan garis bawah; logo/ikon berfungsi sebagai kata.
### Ritme
- Seluruh mosaik: 25 cut/menit, shot median 2,1 dtk, event visual 75/menit (`energi`). Panel arsip 118 cut/menit (median 0,33 dtk; rentetan 4 f per cut di 12,5–13,8 dtk); panel grafik hanya 8–13 cut/menit dan berubah lewat gerak kamera.
- Babak: pembuka (judul + UI) → konsep (kata hero) → mekanisme (UI asli) → data (isometrik, peta, chart).

## Pola

### T1 · Diegetic Label Tag · layout
- **Trigger:** setiap kali VO menyebut sebuah objek yang baru muncul ("sekolah", "investasi swasta"); callout nama pada objek isometrik, koin, atau peta.
- **Yang terlihat (termasuk gerak):** kotak warna penuh tanpa radius dengan teks terang menempel di tepi objek, kiri-bawah atau kanan-atas ("Schools" kiri-bawah gedung kecil, "Universities" kanan-atas gedung berpilar), bukan teks melayang. Tag mengikuti objek bila objek bergerak. Masuk dengan wipe kiri→kanan (frame tangkapan "cover from the weather" terpotong setengah). (k5, k6, k7; 5,0–13,9 dtk)
- **Kenapa bekerja:** objek di tengah dengan ruang kosong gelap di sekitarnya; tag menempel di tepi sehingga label dan objek terbaca sebagai satu benda; satu warna teal di atas navy tidak bersaing dengan apa pun.
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): latar navy + grid 1 px → objek (SVG, per bagian bisa dianimasikan) → tag.
  - Gerak: tag `clipPath: inset(0 X% 0 0)` 100→0 % selama 4 f, kurva `CURVE.reveal`, mulai ±2 f setelah onset kata VO; objek `scale` 0→1,05→1 dalam 8 f `CURVE.land`. Tag diposisikan dari kotak objek (kiri-bawah atau kanan-atas), bukan dari frame.
  - Ruang: datar.
  - Blur & blend: tanpa blur kedalaman; bayangan hanya di sisi objek isometrik/koin.
- **SFX:** famili `ui` · `pop up.mp3` pada kemunculan objek+tag (satu bunyi per objek, bukan per tag dan per objek); detail kecil dengan gain −12…−16 dB.
- **Pakai bila:** objek tunggal yang bisa digambar bersih dan punya nama pendek (≤ 4 kata). · **Jangan pakai bila:** label panjang yang menjadi kalimat, atau objek kecil bertebaran (tag menumpuk).
- **Remix (anti-jiplak):**
  1. Produk UMKM di foto meja → pertahankan tag menempel di tepi objek dan wipe kiri→kanan · ganti isometrik jadi cutout foto produk, tag berwarna palet merek (bukan teal).
  2. UI SaaS → pertahankan satu label per elemen yang disebut · ganti objek menjadi komponen UI dalam bingkai, tag sebagai callout berbentuk kotak dengan garis tipis ke komponen.
- *Pengamatan di video asli, bukan target:* tag cap 5,0–6,9 % tinggi, lebar 27–40 % panel; pusat x 31 % (kiri-bawah) atau 83 % (kanan-atas) di k5, k6.

### T2 · Axis-Locked Truck Reveal · camera
- **Trigger:** daftar yang bertambah tanpa cut ("sekolah → universitas → hotel → dealer → properti komersial"); eskalasi skala dari objek ke peta.
- **Yang terlihat (termasuk gerak):** kamera bergeser terus-menerus sepanjang sumbu diagonal isometrik; bangunan lama keluar frame, bangunan baru masuk dari tepi saat disebut, masing-masing dengan tag. Per 0,5 dtk kamera bergeser −10…−37 % lebar dan +5…+32 % tinggi (±40–60 % lebar/dtk). Pada 10,0–10,5 dtk kamera pindah (−52 % lebar/−41 % tinggi) ke peta piksel; sel menyala per negara bagian. (k5, k7; 5,0–10,5 dtk; angka kamera = orde besaran dari estimasi ORB, bukan nilai presisi)
- **Kenapa bekerja:** gerak kamera itu sendiri adalah informasi (daftar bertambah); satu arah, kecepatan hampir tetap, tidak ada gerak lain di frame.
- **Mekanik Remotion (titik awal):**
  - Lapisan: satu "dunia" `<div>` berisi grid, objek, dan tag (semuanya anak dunia, bergerak bersama) → vignette tidak dipakai.
  - Gerak: `translate(dx, dy)` dunia = `frame * kecepatan` sepanjang vektor 25–30°; objek diletakkan di koordinat dunia sehingga masuk dari tepi pada saat disebut (bukan muncul di tengah); kecepatan tetap, `CURVE.drift` hanya untuk mulai/berhenti 6–8 f. Perpindahan ke peta: translate besar `CURVE.heavy` ±15 f.
  - Ruang: sumbu iso 25–30°; tanpa perspective.
  - Blur & blend: `<CameraMotionBlur shutterAngle={200} samples={16}>` di dunia (`../../references/smooth-motion.md`).
- **SFX:** famili `air`, `ui` · tanpa SFX kontinu; `pop up.mp3` hanya per objek baru; whoosh famili `air` yang mengembang lembut (file SFXIrfan lama dilarang; `Woosh.mp3` atau `sfx_cari.py --famili air`) bila kamera pindah ke peta.
- **Pakai bila:** ≥ 3 objek berurutan dengan kecepatan sebut yang kurang lebih sama. · **Jangan pakai bila:** daftar dua item atau objek yang perlu dibandingkan berdampingan sekaligus (kamera yang bergerak menyembunyikan perbandingan).
- **Remix (anti-jiplak):**
  1. Alur langkah produk → pertahankan truck satu sumbu · ganti bangunan iso menjadi kartu langkah, sumbu horizontal murni.
  2. Peta tren per kota → pertahankan perpindahan dari objek ke peta · ganti peta AS menjadi peta kota lokal dengan sel warna merek.
- *Pengamatan di video asli, bukan target:* truck 5,0–8,5 dtk; zoom-out 0,65× sebagai keluar adegan di panel lain (8,5 dtk).

### T3 · Growing Hero with Highlight Block · typography
- **Trigger:** pertanyaan atau klaim yang kata kuncinya baru muncul di ujung kalimat ("Which AI → Source"); kata hero yang perlu disorot sebagai pilihan.
- **Yang terlihat (termasuk gerak):** "Which" → "Which AI" → "Which AI **Source**" dalam satu baris yang tumbuh dari kiri; kata hero dalam kotak kuning (65×47 % panel) dengan teks hitam; sisa kata sebelumnya terpotong di tepi kiri saat baris bergeser. Hero editorial masuk dengan pan horizontal ±1 lebar panel per dtk. Garis registrasi 1 px + titik kotak di simpul memenuhi latar putih. (k4; 5,0–7,0 dtk)
- **Kenapa bekerja:** tiga tingkat ukuran saja dengan hero 3–4× kata biasa; latar putih rata sehingga kotak kuning menjadi satu-satunya warna.
- **Mekanik Remotion (titik awal):**
  - Lapisan: latar putih + registrasi → baris teks → kotak sorot (di belakang kata hero).
  - Gerak: baris digeser `translateX` `CURVE.land` ±10 f tiap kata baru; kotak sorot tumbuh kiri→kanan 5–6 f (`clipPath inset`), mulai bersamaan dengan kata hero.
  - Ruang: datar.
  - Blur & blend: tanpa blur.
- **SFX:** famili `ui` · senyap per kata (KT); `Kinetictypography(gunakansecaraacak).mp3` sesekali bila kata hero bergerak sebagai objek.
- **Pakai bila:** latar rata terang dan kata hero ≤ 10 huruf. · **Jangan pakai bila:** blok warna di belakang kata mengganggu keterbacaan di latar gelap (pertimbangan lama: kotak hanya bila menyelesaikan keterbacaan; alternatif: warna isi huruf).
- **Remix (anti-jiplak):**
  1. Latar gelap → pertahankan baris yang tumbuh · ganti kotak kuning menjadi isi huruf berwarna tanpa blok.
  2. Judul pertanyaan produk ("Pakai yang mana?") → pertahankan pertumbuhan per kata · ganti jenis huruf dan warna sorot ke palet merek.
- *Pengamatan di video asli, bukan target:* "Source" cap 24,7 % tinggi, tinta 54,5 % lebar; kotak kuning `#F4D650`.

### T4 · Balanced Block Word Insertion · typography
- **Trigger:** judul pembuka yang kata kuncinya diganti, disisipkan, atau digantikan ikon ("Graphic tools" → "Graphic AI tools" → "AI ✦ ◎ ⊛ ▲ tools").
- **Yang terlihat (termasuk gerak):** blok dua baris berukuran sama dan lebar setara, bertangga (atas rata kiri, bawah bergeser kanan) di latar hitam; kata baru disisipkan ke dalam blok, ikon asli menggantikan sebagian kata; kata aksen oranye gradien. (k1; 0,25–2,5 dtk; frasa baru muncul tiap ±0,6 dtk)
- **Kenapa bekerja:** dua baris selebar sama membuat blok terbaca sebagai satu bentuk, sehingga penyisipan kata terasa seperti menyusun, bukan berganti kalimat.
- **Mekanik Remotion (titik awal):**
  - Lapisan: hitam rata → blok teks (dua `div` baris) → ikon inline.
  - Gerak: kata baru `opacity` 0→1 + `translateY(8px)` 5 f `CURVE.reveal`; ikon pop 0→1,1→1 dalam 6 f dengan stagger 3 f (G-T1 di bedah lama); kata aksen terakhir.
  - Ruang: datar.
  - Blur & blend: tanpa blur; gradien teks lewat `background-clip: text`.
- **SFX:** famili `glitch` · senyap (kata); `Katapertama.mp3` pada kata pertama video bila ini pembuka.
- **Pakai bila:** judul ≤ 5 kata dengan ikon/logo yang bisa berfungsi sebagai kata. · **Jangan pakai bila:** kalimat yang bagian-bagiannya tidak punya padanan ikon atau nama pendek.
- **Remix (anti-jiplak):**
  1. Nama layanan UMKM → pertahankan penyisipan ke dalam blok · ganti ikon alat AI menjadi ikon produk milik klien.
  2. Latar putih → pertahankan dua baris selebar sama · ganti gradien oranye menjadi satu warna merek.
- *Pengamatan di video asli, bukan target:* "Graphic" cap 18–21 % tinggi (G 20,8 %), pusat (45, 33 %); baris kedua pusat (52, 62 %), lebar 87 %.

### T5 · Single Word over Archive Subject · typography
- **Trigger:** kata tunggal berat yang membuka babak ("Life", "Wind", "Wattage"); montase cepat kategori ("Wind → Solar → Nuclear").
- **Yang terlihat (termasuk gerak):** footage arsip penuh frame dengan grade hangat-kusam, grain dan scanline; satu kata putih di pusat panel (x 48–58 %, y 48–50 %) tepat di atas subjek (kata "Life" di badan roket). Rentetan 9 shot di 12,5–13,8 dtk dengan tiap shot 4 f. "Wattage" sendirian di hitam dengan RGB-split tipis. (k2; 7,0 dtk punch 1,14×)
- **Kenapa bekerja:** footage arsip sinematik penuh frame dan satu kata ≈ 7–11 % tinggi; karena subjek di tengah, kata menjadi bagian dari objek.
- **Mekanik Remotion (titik awal):**
  - Lapisan: footage → grain/scanline → kata putih.
  - Gerak: push pelan 1,00→1,08 selama shot `CURVE.drift`; punch 1,14× di titik tekan 4–6 f `CURVE.land`; rentetan = `<Sequence>` 4 f per shot, kata ganti per shot.
  - Ruang: datar.
  - Blur & blend: RGB-split tipis: tiga salinan kata dengan `mixBlendMode: "screen"` dan offset 2–3 px.
- **SFX:** famili `glitch`, `mekanik`, `impact`, `riser` · `Cut.mp3` atau `Cutcontrastransision.mp3` di tiap pergantian rentetan; hit dan riser di pergantian babak (kiblat; tidak ada hit pendek di SFXIrfan, gunakan `ES_Designed, Bass Dive…` untuk satu puncak).
- **Pakai bila:** footage arsip/stok dengan subjek terpusat dan ruang tengah bersih. · **Jangan pakai bila:** footage sendiri tanpa subjek di tengah (kata bertabrakan dengan wajah).
- **Remix (anti-jiplak):**
  1. Footage produk close-up → pertahankan satu kata tepat di atas objek · ganti arsip menjadi foto produk, grain dikurangi.
  2. Rentetan kategori toko → pertahankan 4 f per shot · ganti kata menjadi nama kategori.
- *Pengamatan di video asli, bukan target:* "Life" cap 7,2 %, pusat (49,92; 50,00) %; "Wattage" W 10,8 %, lebar 34,5 %.

### T6 · Dock Zoom with Input Glow Bloom · camera
- **Trigger:** menunjukkan aplikasi atau kolom input ("tanya AI", "ketik pertanyaan"); jembatan dari konsep ke mekanisme.
- **Yang terlihat (termasuk gerak):** wallpaper alam + dock kaca (69×26 % panel); zoom-in kuat ke dock, skala kumulatif ±2× dalam ≤ 1,5 dtk (×1,47, ×1,09, ×1,61 per 0,5 dtk); pointer panah di bawah ikon WhatsApp; lalu kolom input putih dengan I-beam dan "+ AI" biru; slide −80 % lebar dalam 0,5 dtk; glow biru lembut membesar. (k3; 0–1,5 dtk, 2,0–5,0 dtk; bisa tercampur animasi ikon)
- **Kenapa bekerja:** UI asli dan logo asli; zoom membawa mata dari konteks ke satu elemen; glow menjadi isyarat "AI berpikir".
- **Mekanik Remotion (titik awal):**
  - Lapisan: wallpaper → dock → pointer → glow.
  - Gerak: `scale` 1→2 `CURVE.heavy` 12–16 f dengan pivot di dock; glow lingkaran `filter: blur(40px)` membesar 8–10 f lalu meluruh `CURVE.leave`.
  - Ruang: datar.
  - Blur & blend: `<CameraMotionBlur shutterAngle={200} samples={16}>` pada zoom; glow `mixBlendMode: "screen"`.
- **SFX:** famili `air`, `mekanik`, `ui` · `Woosh.mp3` di zoom; `ResponAI:AIpopup.mp3` bila jawaban AI muncul; ketik `Keyboardtyping.mp3` hanya bila teks benar-benar diketik di UI.
- **Pakai bila:** UI atau dock asli yang bersih dan satu tindakan jelas. · **Jangan pakai bila:** UI padat tanpa elemen yang bisa jadi target zoom.
- **Remix (anti-jiplak):**
  1. Aplikasi Jadisatu → pertahankan zoom ke satu elemen · ganti wallpaper dan dock menjadi dashboard produk asli.
  2. Tutorial fitur → pertahankan glow bloom saat sistem memproses · ganti biru jadi aksen merek.
- *Pengamatan di video asli, bukan target:* ikon ±20 % tinggi; glow `#E3E7F5`, teks AI `#98ABE8`.

## Audio (bila dibedah)
- earshot: 82 event (5,7/dtk) dengan VO; label non-suara: 12 UI/pop, 9 whoosh, 7 foley, 6 note, 3 hit, 3 riser, 1 key. Pop UI di tag/ikon, whoosh pada slide (1,0–1,2; 3,1–3,4; 7,1 dtk), hit + riser di pergantian babak (4,1–4,3; 7,2 dtk), note/klik rapat di babak data 10–13,9 dtk. Kepadatan campuran 4 panel; jangan dijadikan acuan per proyek.
- Musik: "inspirational corporate, pizzicato strings", pulse clarity 0,06, 120 bpm lemah. Mix −14,0 LUFS, true peak −1,9 dBTP, LRA 2,0 LU (angka kartu lama −17,2 LUFS tidak cocok dengan ukur ini). Lembah energi di 3 dtk dan 10 dtk sebelum babak berikut.

## Yang harus terasa sama saat disandingkan
- Setiap objek muncul tepat saat disebut, dengan satu label yang menempel di tepinya (bukan teks melayang)?
- Hanya tiga tingkat ukuran huruf (hero, kata, label), tanpa ukuran perantara?
- Satu aksen per frame (teal atau kuning), bukan keduanya kecuali chart?
- Gerak kamera di adegan data hanya satu arah dengan kecepatan hampir tetap?
- Subjek berukuran sedang (35–70 % lebar) dan ada ruang kosong untuk label, bukan ikon kecil bertebaran?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
