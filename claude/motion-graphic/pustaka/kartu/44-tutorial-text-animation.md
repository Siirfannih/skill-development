# 44 · Tutorial "Text animation" huruf melengkung turun (IG DeCyKOiRa2o)

> **Status: standar kualitas Irfan.** Video ini target yang harus dicapai, bukan contoh opsional.
> Sumber: https://www.instagram.com/reel/DeCyKOiRa2o/ · 1:1 (720×720), 30 fps, 39,2 dtk · analisis asal: canvas-skill-library, reference_id DeCyKOiRa2o · Frame: `../../guide/referensi/sheets/44-tutorial-text-animation.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/44-k*.jpg` · Bedah lengkap: `canvas-skill-library: skills/canvas-reference-director/references/cards.json (reference_id DeCyKOiRa2o)`; data ukur: `ukuran.md`
> Kedalaman bedah: **dalam** (sumber 720 px: 1 px = 0,14 %; musik dan suara tidak dipisah, jadi level musik tidak terukur)

**DNA (satu kalimat):** Hook padang rumput cerah dengan judul putih yang hurufnya melengkung turun, lalu rekaman layar After Effects gelap yang kameranya meluncur dari kontrol ke kontrol, dengan caption kecil membulat di 5 % bawah frame.
**Cocok untuk:** tutorial singkat langkah demi langkah di aplikasi, "begini cara membuatnya dalam <1 menit" · **Tidak cocok untuk:** cerita/talking head tanpa layar aplikasi
**Kata kunci gaya:** cerah lalu gelap, tutorial, huruf melengkung, caption kecil membulat, kamera meluncur
**Diambil untuk:** "IG DeCyKOiRa2o": nama tidak menyebut bagian; lihat bagian terkuat (teks: judul animasi per huruf dan caption; kedua: kamera yang mengikuti kontrol)

## PENGIKAT (diambil utuh dari SATU kiblat; ini yang membuat video terasa satu keluarga)

### 1. Warna & tekstur
- Hook (0–5,5 dtk): langit `#54C0F8` (atas) → `#67CCFB` (dekat cakrawala), rumput `#A9D24B`; awan putih. Tanpa vignette (sudut kiri atas malah lebih terang, luma 190 vs 165 di tengah atas), grain nyaris nol (high-pass sd 0,33).
- Tutorial (5,5–39 dtk): panel After Effects `#1D1D1D` rata (sd 0), preview `#000000`; nilai kontrol biru bawaan AE.
- Satu aksen biru: garis caption awal `#2181CD`, isi CTA `#1689E3`. Teks lain putih.
- Tidak ada grade di rekaman layar; tanpa tekstur.

### 2. Teks
- **Tiga keluarga tampilan:** (a) judul/kalimat hook: sans grotesk rapat, mirip SF Pro Display / Inter Medium, putih dengan bayangan lembut; (b) caption: sans geometris membulat, mirip Quicksand Bold / Nunito ExtraBold (dugaan dari bentuk); (c) CTA: font caption, isi biru `#1689E3` + garis putih tebal.
- **Judul "Text animation" (k1):** huruf kapital 9 % tinggi frame, x-height 6,5 %, blok 77 % lebar, pusat (50, 50 %). Huruf masuk satu-satu di jalur melengkung: "tio" masih naik ±10,6 % saat huruf awal sudah mendarat.
- **Kalimat hook "Nobody wants to reveal" (k3):** x-height 4,2 %, huruf naik 5,6–6,4 %, blok 81 % lebar (12–93 %), y 46–54 %. Masuk per kata dari kanan, lalu seluruh huruf diburamkan (defocus) dan berubah menjadi "How it's done" yang naik pelan.
- **Caption awal (k4, 5,5–8 dtk):** putih bergaris biru `#2181CD` + glow, x-height ±3–4,5 %, y 52–61 %: menempel di atas panel timeline, naik ±4 % dalam 0,5 dtk.
- **Caption tutorial (k5–k7):** putih tanpa kotak, bayangan hitam tipis. Huruf kapital 3,6 %, x-height 2,5 % (rasio 1,4). Blok 18–35 % lebar, pusat x 50 %, **y 92,5–97,2 % (pusat 95 %)**: duduk di pita paling bawah, menimpa UI. 1–3 kata per tampil; frasa diganti di tempat yang sama, kadang ditambah per kata ("in" → "in <1" → "in <1 minute"). Masuk/keluar sigap (tanpa gerak yang tertangkap di sampel 0,5 dtk).
- **Penekanan:** tidak ada kata kunci yang dibesarkan di bagian tutorial; satu-satunya penekanan ukuran adalah CTA biru (k8): 5,7–7,5 % (dengan garis), y 77–85 %, = 2× caption.
- **Demo (k8):** "This is a Text Layer" putih, kapital ±4,5 %, lebar 52 %, di tengah preview hitam; huruf melengkung turun lalu meluruskan ke satu baris.

### 3. Ritme
- Cut keras sedikit: `pace_read` 6 cut = 9,2/menit, shot median 5,1 dtk; tapi **event visual 34/menit** karena kamera terus berpindah.
- Pindah framing besar di tutorial: 13 kali dalam 33,7 dtk (±23/menit), jeda antarpindah median 2,0 dtk (1–4 dtk).
- Hook 5,5 dtk berisi 4 keadaan (judul → kartu → kalimat → "How it's done"), ±1,4 dtk per keadaan; bagian tercepat. Tutorial memelan (diam 1–4 dtk di tiap kontrol); demo akhir 33–39 dtk, video berhenti di tengah animasi.
- Caption berganti mengikuti ucapan, hampir di tiap sampel 0,5 dtk.

## TEKNIK (boleh dipinjam referensi lain; selalu dikenakan pengikat kiblat)

### 4. B-roll / footage
- Satu latar ilustratif (padang rumput + langit, tampak render/ilustrasi) hanya di hook; tetap tajam di balik teks dan kartu.
- Sisanya satu rekaman layar After Effects yang di-zoom 2–3× (label UI ±2 % tinggi). Tidak ada pembicara, tidak ada stok footage.

### 5. Motion graphic
- Hook: tiga kartu UI rounded miring bertumpuk (biru, hitam berfoto, putih berikon hijau) di tengah langit, masuk dengan dorongan besar (skala 1,74× dalam 0,5 dtk) dan motion blur, lalu bergeser kiri.
- Tidak ada ilustrasi lain; grafiknya tipografi + UI asli.
- **Skala subjek:** kartu bertumpuk 73 × 43 % (x 14–87 %, y 23–66 %), satu kelompok besar di tengah. Tutorial: kontrol yang dibahas mengisi 40–60 % frame (menu Animate 40 × 62 %, k6). Demo: preview hitam 80 × 84 %.
- **Kedalaman:** hook 3 lapis: latar tajam / kartu dengan bayangan jatuh + motion blur / teks dengan bayangan lembut; kalimat hook diburamkan sementara latar tetap tajam. Tutorial datar 2 lapis (UI + caption), blur hanya dari gerak kamera.

### 6. Kamera & transisi
- Hook: push pelan + naik (skala 1,02–1,15 per 0,5 dtk, teks "How it's done" naik ±5 %).
- Tutorial: kamera meluncur dari kontrol ke kontrol dengan ease-out: langkah pertama 36–55 % lebar dalam 0,5 dtk, sisa 10–25 % di 0,5 dtk berikutnya, berhenti dalam ±1 dtk (mis. 12,5→13,5 dtk: −36 %, −10 %, lalu diam). Zoom out 0,64× (23 dtk) dan zoom in 1,66× (26,5 dtk) untuk pindah panel; motion blur saat meluncur.
- Hook → tutorial (5,5 dtk): cut keras dengan satu frame bentuk geometris putih miring (wipe/flash), langsung ke UI gelap. Pemicu: kata "So here's".
- Transisi dipicu kalimat langkah berikutnya ("Go to animate", "add another animator").

### 7. SFX
- earshot: 297 onset (7,6/dtk); berlabel 26 UI/pop, 3 foley, 1 hit (11,67 dtk), 1 klik kunci (32,55 dtk), 1 whoosh (20,76 dtk, di pindah kamera). Label banyak keliru karena musik + suara padat; kosakata pasti: pop/klik pendek, satu impact, satu whoosh.
- Sinkron: 91 % cut punya onset dalam 100 ms; hanya 1 cut ditemani whoosh.

### 8. Musik
- Elektronik ber-beat (earshot: tech house → glitch hop → house → trap), vocal chop; tempo librosa 161 (hook) → 136 (tutorial) → 118 bpm (demo); pulse clarity 0,09.
- Mix keras: −14,3 LUFS, true peak −0,5 dBTP, LRA 4,1 LU; hook paling keras (−11,4 LUFS short-term). VO narasi di atas musik; level musik terhadap suara tidak terukur: tanpa stem.

## Proporsi terukur
| Jenis adegan | Kata kunci (% tinggi) | Kata sambung | Posisi teks | Skala subjek | Kedalaman |
|---|---|---|---|---|---|
| Hook judul (k1) | kapital 9, x-height 6,5 | satu kata, tidak ada | tengah (50, 50), blok 77 % lebar | tanpa subjek; padang di 35 % bawah | latar tajam + teks berbayang |
| Hook kartu UI (k2) | tanpa teks | – | – | 3 kartu 73 × 43 %, pusat (50, 45) | 3 lapis, bayangan jatuh, motion blur |
| Hook kalimat (k3) | x-height 4,2, naik 6 | sama ukuran | y 46–54 %, 81 % lebar | tanpa subjek | teks buram, latar tajam |
| Caption bergaris (k4) | x-height 3–4,5 | sama ukuran | y 52–61 %, menempel di atas panel | UI 2–3× zoom | 2 lapis + garis biru glow |
| UI + caption (k5) | kapital 3,6, x-height 2,5 | sama ukuran (rasio 1,0) | **y 92,5–97 %**, 18–35 % lebar, tengah | kontrol 40–60 % frame | datar |
| Menu zoom (k6) | sama k5 | sama | caption menimpa menu | menu 40 × 62 % | datar, motion blur saat masuk |
| Ekspresi (k7) | sama k5 | sama | sama k5 | baris kode ±2 % tinggi | datar |
| Demo + CTA (k8) | CTA 5,7–7,5 (biru) | demo 4,5 | CTA y 77–85 %, demo y 49–56 % | preview hitam 80 × 84 % | 2 lapis |

- Tidak ada pasangan kata kunci/kata sambung: semua kata dalam satu tampil sama ukuran. Hierarki dari ukuran per adegan: judul 9 % > kalimat 6 % > CTA 6–7,5 % > caption 3,6 %.

## Cek kemiripan (dipakai juri saat menyandingkan still)
- Caption tutorial kecil: huruf kapital 3–4 % tinggi frame, pusat y ±95 %, lebar ≤ 35 %, tanpa kotak.
- Judul hook besar: huruf kapital ±9 %, blok ±75 % lebar di tengah frame, ada huruf yang masih di jalur melengkung.
- Hook memakai langit cyan ±`#54C0F8` + rumput ±`#A9D24B`, tanpa vignette dan tanpa grain.
- Bagian tutorial: latar `#1D1D1D` rata, UI di-zoom sehingga kontrol yang dibahas mengisi 40–60 % frame.
- Hanya satu aksen biru (`#1689E3`–`#2181CD`), dipakai untuk garis caption awal dan isi CTA.
- Hook punya 3 lapis: latar tajam, kartu/teks dengan bayangan; blur hanya mengenai teks/kartu, bukan latar.
- CTA ±2× tinggi caption, biru bergaris putih, di y 77–85 %.
- Semua kata dalam satu tampil sama ukuran (tidak ada kata kunci besar + kata sambung kecil).

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
