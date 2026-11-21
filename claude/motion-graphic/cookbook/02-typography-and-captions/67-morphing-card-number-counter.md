---
id: "67"
pola: Morphing Card Number Counter
kategori: typography
kategori_lain: [layout, sfx]
trigger: pengumuman angka atau milestone tanpa narator ("$400M", "Series F"); recap brand 15–30 detik yang dipotong ke beat musik; kalimat misi 5–6 kata yang disusun per kata di tengah
sumber: IG life.at.island (Ddq_MPiIuKB; brand Island, pengumuman pendanaan 21,1 dtk) · 16:9 (1276×720) · 21,1 dtk
dilihat_bergerak: tidak
diukur: ya
alias: []
---
# 67 · Morphing Card Number Counter

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: akun Instagram life.at.island (Island, perusahaan enterprise browser), file `pustaka-video/mac/life.at.island_Ddq_MPiIuKB.mp4` · 16:9 (1276×720, 24 fps), 21,1 dtk, tanpa narator · Frame: `../../guide/referensi/sheets/67-island-funding.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/67-k1-angka-raksasa.jpg`, `67-k2-tumpukan-foto.jpg`, `67-k3-teks-ulang-strip.jpg`, `67-k4-grafik-angka.jpg`, `67-k5-kartu-gelap.jpg`, `67-k6-serif-langit.jpg`, `67-k7-footage-statistik.jpg`, `67-k8-tagline.jpg` · Ukuran mentah: `../../guide/referensi/ukuran/67-island-funding-ukuran.md`; periksa: `67-island-funding-periksa.md` (LAYAK, 5/6)
> Catatan silang: ini BUKAN video yang sama dengan kartu 33 (explainer 103 dtk, brand sama). Angka kartu ini semua dari video pengumuman 21,1 dtk.
> Video sumber: `/home/irfan/work/pustaka-video/mac/life.at.island_Ddq_MPiIuKB.mp4`
> Dilihat bergerak: **tidak** (bedah dari frame diam dan pengukuran piksel/ORB per 0,5 dtk; bedah geraknya sebelum dipakai). Kedalaman bedah ukur: dalam (sumber 720p, tanpa suara narator).

**Inti mekanik (1 kalimat):** Angka raksasa dan kata pendek hidup di SATU kartu bersudut bulat yang terus berubah ukuran, warna, dan isi (counter berputar, pull-back reveal, push-in, zoom-through), dipotong ketat ke beat musik 108 bpm tanpa narator.
**Narrative trigger:**
- Angka pengumuman yang naik ke nilai akhir ($397M → $400M) → T1
- Kata ulang yang menandai kategori ("Series F" lima baris) → T2
- Kalimat misi 5–6 kata yang tumbuh per kata ("The future of work is on…") → T3
- Statistik daftar yang menggulir ("largest companies") → T4
- Penutup merek: tagline zoom-through ke logo dalam hening → T5
**Jangan dipakai untuk:** talking head, edukasi bernarasi panjang, konten yang butuh banyak kalimat.
**Kata kunci gaya:** editorial, premium, tenang-tapi-cepat, kartu, angka besar, Swiss
**Diambil untuk:** nama file "life.at.island": nama tidak menyebut bagian. Bagian terkuat: teks kinetik + gerak tata letak (kartu yang berubah bentuk, angka raksasa, kata diulang), lalu ritme cut-ke-beat.

## Kondisi footage asli
- 16:9. Tanpa orang. Satu dunia footage: render padang rumput tenang dengan meja kerja kosong, selalu di dalam kartu/panel bersudut, tidak pernah full-bleed; grade pudar sejuk (langit `#7C97A2`, tepi `#64808B` ±10 % lebih gelap, kabut `#ACB0B3`, rumput `#162418`).
- Tidak ada gerak kamera pada footage (skala 1,000–1,005 per 0,5 dtk); semua gerak berasal dari tata letak (ORB + affine antar-frame 0,5 dtk).
- Kartu: inset 33 px di semua sisi (2,6 % lebar, 4,6 % tinggi), radius ±17 px (±2,4 % tinggi); tanpa bayangan, grain, atau gradien pada kartu.
- Ruang teks: tengah kartu, y 40–55 %.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Dua warna dasar bertukar peran: hijau-hitam `#061613` dan putih hangat `#F9F3F3`. Babak 1 (0–5,9 dtk): kartu putih di bingkai gelap; babak 2 (6–21 dtk): bingkai putih, kartu gelap atau footage. Satu aksen hijau mint `#60DDB2`–`#67E6AE`, hanya untuk satu kata/angka per tampilan. Garis rambut 1 px abu-abu sebagai pemisah baris dan garis penunjuk label. Warna bingkai gelap diukur ulang `#041313`.
### Teks
Sans grotesk geometris Regular (mirip Aeonik/Suisse Int'l; pengganti gratis Inter Display Regular), tidak pernah bold; kata istimewa serif italic sempit (mirip Instrument Serif Italic) dengan tinggi sama. Penekanan lewat ukuran dan warna, bukan bobot: angka 15–42 % tinggi, label 1,5–4 %. Per tampilan: 1–2 kata atau satu kalimat 5–6 kata dalam 2 baris. Logo "◐ Island" kecil selalu menempel di atas atau kanan kata kunci (2,9–6 % tinggi). Teks di tengah horizontal (x 50 %). Keluar: zoom-through atau morph kartu, bukan fade.
### Ritme
7 cut = 19,9/menit, shot median 1,5 dtk, event visual 46/menit (gerak tata letak lebih banyak dari cut); ffmpeg scene ≥ 0,25: 9 perubahan. Babak: angka (0–5,9) → valuasi (5,9–7,6) → kalimat misi + statistik (7,6–15,8, satu-satunya bagian panjang 6 dtk dengan scroll bertahap) → tagline (15,8–18,3) → logo diam 2,7 dtk dalam hening. 65 % perubahan jatuh dalam 1 frame dari onset musik, 100 % dalam 100 ms.

## Pola

### T1 · Motion-Blur Counter Roll · typography
- **Trigger:** angka pengumuman yang naik ke nilai akhir.
- **Yang terlihat (termasuk gerak):** angka raksasa berputar seperti counter dengan motion blur ($397M → $398M → $400M); angka lebih lebar dari kartu, digit > 42 % tinggi terpotong tepi bawah kartu, logo 4,9–6,1 % di y 43 %; di tumpukan foto, "$" 19 % + digit 16,9 % (45 % lebar) di antara tumpukan kartu foto atas dan bawah (seperti dek, tepi buram) dengan label "Island Announcing" 3,89 % tinggi (diukur ulang; kartu lama 1,9 %). Pembuka: pull-back angka raksasa mengecil ×0,45 jadi "$400M" (0,5→1,0 dtk), lalu push-in ×1,72 (2,0→2,5). Angka muncul dulu sebagai titik halftone lalu padat. (k1, k2; 0–5,9 dtk)
- **Kenapa bekerja:** satu subjek besar per tampilan; blur gerak pada counter memberi berat; push-in menekankan nilai akhir.
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): bingkai gelap → kartu putih → tumpukan foto (atas/bawah, tepi blur) → angka → logo kecil.
  - Gerak: digit-roll per kolom `translateY` dengan `CURVE.land` 6 f, digit terakhir mendarat paling lambat (+4 f); pull-back scale 1,0→0,45 selama 15 f `CURVE.heavy`; push-in scale 1,0→1,72 selama 15 f `CURVE.heavy`.
  - Ruang: datar.
  - Blur & blend: motion blur nyata `<CameraMotionBlur shutterAngle={200} samples={16}>` pada digit; tepi tumpukan foto `blur(6px)`.
- **SFX:** riser/swell di masuk angka (pengamatan 1,01 dtk); `ES_Designed, Riser, Transition, Fast, Short, Clean 01`; counter sendiri senyap; stab kuat di morph kartu (4,56 dtk) bila `ES_Designed, Bass Dive…` dipakai sebagai hit (hit pendek tidak ada di SFXIrfan).
- **Pakai bila:** angka adalah subjek tunggal dan ada beat musik. · **Jangan pakai bila:** angka bukan puncak cerita.
- **Remix (anti-jiplak):**
  1. Omzet UMKM → pertahankan counter berputar + tumpukan foto atas-bawah · ganti foto dengan foto produk.
  2. UI SaaS → pertahankan pull-back lalu push-in · ganti kartu putih dengan panel dashboard.
  3. Latar gelap → pertahankan kartu bersudut bulat · ganti putih hangat dengan hijau tua dan angka mint.
- *Pengamatan di video asli, bukan target:* rasio digit : label 4,39× (diukur ulang; kartu lama ±9×); hierarki dua tingkat (pahlawan 15–42 %, label 1,5–4 %).

### T2 · Echoed Word Rows With Footage Strip · typography
- **Trigger:** kata kategori yang diulang sebagai tekstur ("Series F").
- **Yang terlihat (termasuk gerak):** 5 baris "Series F" bergeser diagonal; baris luar diburamkan; baris tengah putih di atas strip footage (y 37–63 %, padang rumput), baris lain hitam di atas putih; cap 19,7 % (diukur ulang cap S 18,47 %); logo 4,2 % di kanan (rasio 4,7); garis rambut 1 px memisahkan baris. (k3; 3,60–4,5 dtk; whoosh di 3,60–3,74)
- **Kenapa bekerja:** pengulangan menggambarkan "seri" secara tipografis; blur baris luar memberi kedalaman tanpa bayangan.
- **Mekanik Remotion (titik awal):**
  - Lapisan: kartu putih → baris luar (blur) → strip footage → baris tengah putih → logo.
  - Gerak: tiap baris masuk dari kanan `translateX(40%)`→offset diagonal `CURVE.land` 10 f dengan jeda `react(i, fps)`; strip footage clip `inset(0 0 0 100%)`→0 `CURVE.reveal` 8 f.
  - Ruang: datar.
  - Blur & blend: baris luar `filter: blur(8px)`, baris dalam `blur(0)`.
- **SFX:** `Woosh.mp3` pada transisi ke baris (pengamatan: whoosh 3,60–3,74); baris senyap.
- **Pakai bila:** kata pendek, bahasa dengan kata kategori yang bermakna jika diulang. · **Jangan pakai bila:** kata panjang (lima baris tak muat).
- **Remix (anti-jiplak):**
  1. Event "Batch 5" → pertahankan baris diulang + strip → ganti padang rumput dengan foto peserta.
  2. Latar gelap → pertahankan baris luar diburamkan · ganti hitam di putih dengan putih di hitam.
  3. 9:16 → pertahankan diagonal · ganti lima baris horizontal dengan tiga baris vertikal.
- *Pengamatan di video asli, bukan target:* teks baris tengah putih di atas footage, baris lain hitam di atas putih (pergantian warna antarbaris).

### T3 · Left-Shift Sentence Growth · typography
- **Trigger:** kalimat misi yang tumbuh per kata dan harus tetap di tengah.
- **Yang terlihat (termasuk gerak):** "The" → "The future" → "The future of": kalimat bergeser ke kiri supaya tetap di tengah tiap kata ditambah; serif italic besar di langit polos (cap 20,0 %; serif italic 28,7 % asc+desc, diukur ulang 28,75 %; x-height 15,4 %; teks 79 % lebar, y 39–68 %), kemudian mengecil ×0,33 masuk ke panel footage (8,5 → 9,0 dtk); kartu gelap dengan cap 9,0 % saat push-in (±7 % sebelum), pusat vertikal y 51,4 % (diukur ulang); tagline 2 baris cap 6,8 %. Pada frame k6 serif tampil putih; klaim "serif italic hijau" tidak terkonfirmasi di k6 (hijau terlihat pada kata/angka lain). (k5, k6, k8; 6–9 dtk dan 15,8–18,3 dtk)
- **Kenapa bekerja:** teks yang selalu berpusat memberi kestabilan sementara kalimat tumbuh; pull-back ke panel menyatukan teks dan footage.
- **Mekanik Remotion (titik awal):**
  - Lapisan: langit/footage → kalimat (satu baris `display:flex` dengan `justify-content: center`) → logo.
  - Gerak: tiap kata tambah memicu `translateX` baris −(lebar kata baru)/2 selama 4 f `CURVE.land`; kata baru `opacity` 0→1 dalam 3 f; pull-back scale 1→0,33 `CURVE.heavy` 15 f ke panel.
  - Ruang: datar.
  - Blur & blend: tanpa blur; satu kata serif italic dengan `font-style: italic`.
- **SFX:** senyap per kata; satu `Wooshcameramovementtransisi.mp3` pada pull-back ke panel bila dianggap gerak besar.
- **Pakai bila:** kalimat ≤ 6 kata dengan satu kata istimewa. · **Jangan pakai bila:** kalimat harus terbaca utuh di frame pertama.
- **Remix (anti-jiplak):**
  1. Visi startup → pertahankan kalimat tumbuh per kata dan tetap di tengah · ganti serif italic dengan script tipis.
  2. Latar terang → pertahankan geser kiri per kata · ganti langit dengan bidang krem.
  3. 9:16 → pertahankan satu kata istimewa · ganti satu baris dengan dua baris bertumpuk.
- *Pengamatan di video asli, bukan target:* cap tagline 6,8 %; serif asc+desc 28,75 %.

### T4 · Stepped Statistic Column Scroll · layout
- **Trigger:** daftar statistik yang bertambah bertahap.
- **Yang terlihat (termasuk gerak):** panel footage 62×91 % bergeser +16,6 % ke kanan saat kolom statistik masuk (9,5 → 10,0 dtk); kolom kiri 2,5–33 % lebar, kartu tiap 30 % lebar × ±25 % tinggi menggulir bertahap 2,6–8,3 % tinggi per langkah; kartu aktif berlatar foto + angka hijau 15,0 %, kartu lain pucat; label statistik 1,5–2,2 %; kalimat cap 6,7 % di tengah panel (y 42–60 %). Grafik angka: kartu 55 % lebar (diukur ulang 55,17 %), angka kiri terpotong tepi kanan kartu ("$" 37,6 %, digit 30–33 %), grid garis putus-putus 2022–2026 (bukan garis kontinu). (k4, k7; 7,6–15,8 dtk; whoosh scroll 12,39)
- **Kenapa bekerja:** langkah scroll kecil dan berulang membuat daftar terasa "terus bertambah"; hanya satu kartu aktif.
- **Mekanik Remotion (titik awal):**
  - Lapisan: kartu gelap → panel footage → kolom statistik → kalimat.
  - Gerak: panel `translateX(0→16,6%)` `CURVE.heavy` 15 f; kolom naik per langkah 6 f dengan `CURVE.land`, aktif berganti tiap langkah (opacity kartu lain 0,35).
  - Ruang: datar.
  - Blur & blend: tanpa blur; kartu pucat lewat opacity.
- **SFX:** `Woosh.mp3` pada geser panel (pengamatan whoosh 12,39); langkah scroll senyap (satu peran = satu bunyi).
- **Pakai bila:** ≥ 4 angka dengan satu yang disorot. · **Jangan pakai bila:** angka perlu perbandingan presisi (pakai tabel).
- **Remix (anti-jiplak):**
  1. Laporan tahunan → pertahankan kolom menggulir bertahap · ganti foto dengan ikon kategori.
  2. UI SaaS → pertahankan satu kartu aktif · ganti hijau mint dengan biru tua.
  3. Latar terang → pertahankan kartu pucat · ganti kartu gelap dengan putih bergaris tipis.
- *Pengamatan di video asli, bukan target:* kartu statistik 30 % × ±25 %; rasio angka : label ±7.

### T5 · Tagline Zoom-Through To Silent Logo · camera
- **Trigger:** penutup merek.
- **Yang terlihat (termasuk gerak):** tagline dua baris di kartu gelap (cap 6,8 %, x 5,2 %, lebar 58 %); zoom-through ×2,6 ke logo (18,0 → 18,5 dtk) dengan riser/swell di 17,98–18,56 (−15 dBFS); wordmark cap 8,1 %, simbol 10,6 %, 25 % lebar di tengah; logo berdiri diam 2,7 dtk dalam hening (−61 LUFS). Musik berhenti di 18,75 dtk. (k8; 15,8–21,1 dtk)
- **Kenapa bekerja:** setelah ritme padat, logo dalam hening terbaca sebagai tanda tangan.
- **Mekanik Remotion (titik awal):**
  - Lapisan: kartu gelap → tagline → logo.
  - Gerak: scale 1,0→2,6 selama 15 f `CURVE.whip` dengan tagline keluar di 10 f terakhir `CURVE.leave`; logo masuk dari scale 0,4→1 `CURVE.land` 10 f lalu hold 80 f.
  - Ruang: datar.
  - Blur & blend: motion blur 200°/16 sampel pada zoom-through.
- **SFX:** `ES_Designed, Riser, Transition, Fast, Short, Clean 01` menuju logo; setelah logo muncul tanpa SFX 2,3 dtk.
- **Pakai bila:** video berakhir di merek. · **Jangan pakai bila:** ada CTA tindakan di akhir (hening menunda).
- **Remix (anti-jiplak):**
  1. Brand lokal → pertahankan zoom-through ke logo + hening · ganti kartu gelap dengan kartu krem.
  2. Latar gelap → pertahankan hening 2,7 dtk · ganti logo diam dengan logo berdenyut sangat pelan.
  3. 9:16 → pertahankan zoom-through · ganti dua baris dengan tiga baris pendek.
- *Pengamatan di video asli, bukan target:* zoom-through ×2,6 selama 0,5 dtk; logo diam 2,7 dtk.

## Audio (bila dibedah)
Menyatu dengan musik (tak ada lapisan SFX terpisah yang jelas). earshot: 117 event (5,6/dtk), label: 42 drum, 13 foley/pop, 9 note/stab, 8 UI, 7 riser, 6 whoosh. Whoosh di transisi ke "Series F" (3,60–3,74) dan scroll statistik (12,39); riser/swell di 1,01 (masuk $400M) dan 17,98–18,56 (ke logo, −15 dBFS); stab kuat +30 dB di morph kartu (4,56) dan 13,29. Logo berdiri dalam hening 2,3 dtk (−61 LUFS). Musik: glitch hop/elektronik dengan vocal chop, 108–109 bpm (librosa 107,7; earshot 109, pulse clarity 0,35), satu babak tanpa perubahan instrumen, berhenti di 18,75 dtk. Mix −14,0 LUFS, true peak −2,9 dBTP, LRA 6,1–7,7 LU. Tanpa narator, musik mengisi penuh.

## Yang harus terasa sama saat disandingkan
- Ada kartu bersudut bulat dengan inset sama di empat sisi, dan latar di luarnya polos?
- Hanya dua warna dasar yang bertukar peran, dengan satu aksen mint maksimal satu kata per still?
- Tidak ada teks bold; penekanan lewat ukuran, serif italic, atau mint?
- Still angka: angka jauh lebih besar dari label (rasio ≥ 4)?
- Still kalimat: maksimal 2 baris di tengah, satu kata serif italic?
- Footage selalu di dalam panel bersudut dengan grade pudar sejuk, dan kedalaman hanya dari blur tanpa bayangan jatuh?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
