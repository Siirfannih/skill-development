---
id: "56"
pola: Bouncing-Ball Bar Build
kategori: layout
kategori_lain: [typography, sfx]
trigger: perbandingan tiga hal dengan punchline berbentuk angka ("X vs Y vs Z"); klaim "yang terakhir paling besar"; sisipan data 5–7 dtk di video edukasi
sumber: kreator tidak tercantum (teks Portugis), unggahan Irfan · 9:16 · 6,8 dtk, berulang mulus
dilihat_bergerak: tidak
diukur: ya
alias: []
---
# 56 · Bouncing-Ball Bar Build

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: unggahan Irfan, file `Motiondesaignwork.mp4` (kreator tidak tercantum; teks Portugis) · 9:16 (720×1280, 25,3 fps), 6,8 dtk, satu shot, berulang mulus (frame awal = akhir, beda rata-rata 1/255) · Frame: `../../guide/referensi/sheets/56-motion-design-work.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/56-k1-grid-kosong.jpg`, `56-k2-judul-ketik.jpg`, `56-k3-batang-teoria.jpg`, `56-k4-batang-pratica.jpg`, `56-k5-erro-push.jpg`, `56-k6-runtuh-keluar.jpg` · Bedah ukuran: `../../guide/referensi/ukuran/56-motion-design-work-ukuran.md`; pengukur independen: `56-motion-design-work-periksa.md`
> Video sumber: `/home/irfan/work/pustaka-video/unggahan/Motiondesaignwork.mp4`
> Dilihat bergerak: **tidak** (bedah dari frame diam 10 fps dan pengukuran; gerak diturunkan dari ukuran antar-frame, bedah geraknya sebelum dipakai)

**Inti mekanik (1 kalimat):** Satu grafik batang bercahaya di ruang hitam "dibangun" oleh bola putih yang memantul; tiap batang tumbuh dari tempat bola mendarat tepat pada ketukan musik, batang terakhir (punchline) menembus grid, mengubah warna kata di judul, dan memicu push kamera satu-satunya.
**Narrative trigger:**
- "Seberapa banyak aku belajar dari A, B, atau C?" dengan jawaban yang mengejutkan di item terakhir → T1
- Punchline berbentuk angka yang harus "terasa lebih besar" dari dua pendahulunya → T2
- Judul yang harus diketik sambil kata kuncinya berganti warna ke pemenang → T3
**Jangan dipakai untuk:** adegan wajah, UI produk, cerita panjang, perbandingan lebih dari 4 item.
**Kata kunci gaya:** gelap, neon-glow, playful, presisi, loop
**Diambil untuk:** motion graphic dan teks (dibedah paling dalam: gerak grafik, sinkron ke musik, kamera, teks).

## Kondisi footage asli
Tanpa footage; 100 % grafik di latar hitam murni. 9:16; satu grafik mengisi x 15–80 %, y 22–73 % (±65 % lebar × 51 % tinggi), 22 % atas dan 27 % bawah kosong. Kamera diam sampai punchline. Tanpa suara manusia, hanya musik + SFX pendek.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Latar `#000000` murni di sudut, bloom lembut di belakang grafik (luma tengah 8→16/255 saat batang hijau penuh). Warna semantik per batang: merah `#E52C1C`, kuning `#ECD217`, hijau `#4BD61D`; tiap batang ber-glow warnanya sendiri. Teks `#DAE8D6` ber-glow putih, label `#C3C1BF`, kata yang ditekan `#87C573`. Grid putih redup (±10–20 %), sumbu putih terang, bola putih murni. Tanpa grain.
### Teks
Segoe UI / Selawik. Judul Semibold satu baris di atas grafik (lebar 53 %, pusat x 50 %, y 26 %), label Regular 1 kata di bawah tiap batang (y 67–68 %). Penekanan lewat warna, bukan ukuran. Masuk diketik per huruf, keluar dihapus terbalik.
### Ritme
0 cut, satu shot. Aksi 0,4–0,6 dtk lalu diam ±1 dtk; tiap aksi lebih besar dari sebelumnya.

## Pola

### T1 · Bouncing-Ball Bar Build · layout
- **Trigger:** perbandingan 3 item di mana item terakhir adalah jawaban.
- **Yang terlihat (termasuk gerak):** grid dan sumbu digambar dari titik asal 0–0,9 dtk; bola putih (±4 % lebar) memantul dari sumbu, mendarat di puncak batang, melompat ke kolom berikut; batang tumbuh dari titik pendaratan, ease-out sangat cepat (10 → 27 % dalam 1 frame) lalu mengendap; squash/stretch terlihat (tinggi bola 1,5–4,6 %). Urutan: teoria 0,3–1,0 · tahan 1,3 dtk · prática 2,3–2,8 · tahan 1,1 dtk · erro 3,9–4,5. Runtuh kiri → kanan selang ±0,3 dtk 5,0–6,3. (k1–k6)
- **Kenapa bekerja:** bola memberi sebab bagi tiap batang dan jalur mata dari kiri ke kanan; jeda diam ±1 dtk membuat tiap angka terbaca sebelum yang berikutnya.
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): hitam + bloom radial → grid redup → batang ber-glow → bola → teks.
  - Gerak: bola `arc()` dari `../../scripts/remotion/curves.ts` (x `land`, y `heavy`) ±10–12 f antar kolom, squash `scaleY` 0,75 saat mendarat; batang `move(frame, landing, 3, "land")` dari tinggi 0; runtuh `react(i)` kiri → kanan dengan `CURVE.leave`.
  - Ruang: datar.
  - Blur & blend: motion blur pada bola `<CameraMotionBlur shutterAngle={200} samples={16}>`; glow `filter: drop-shadow(0 0 20px <warna batang>)`.
- **SFX:** satu bunyi per batang naik: teoria `Move.mp3` (benda mendarat), prática `pop up.mp3`; punchline `ES_Designed, Riser, Transition, Fast, Short, Clean 01` lalu `ES_Designed, Bass Dive, Bass Drop, Deep Sub, 50Hz`; stab orkestra untuk runtuh tidak ada di SFXIrfan (jenis bunyi: stab pendek).
- **Pakai bila:** tepat 3 item dengan nilai naik. · **Jangan pakai bila:** item lebih dari 4 atau nilai tidak berurutan.
- **Remix (anti-jiplak):**
  1. Latar terang → batang warna brand solid dengan bayangan lunak, bola jadi titik gelap; pertahankan "bola membangun batang".
  2. Produk UMKM → "penjualan sebelum / saat / sesudah promo" dengan ikon produk menggantikan bola.
  3. 16:9 → grafik di setengah kanan, judul di kiri; pertahankan loop (akhir = awal).
- *Pengamatan di video asli, bukan target:* batang 9 → 15 → 35 % tinggi (rasio ±1 : 1,6 : 3,8), lebar 4,6 %, jarak antar batang ±19 % lebar; puncak erro 34 % vs puncak grid 41 %.

### T2 · Punchline Overshoot Push · camera
- **Trigger:** satu puncak cerita yang harus terasa meledak; angka yang "keluar dari grafik".
- **Yang terlihat (termasuk gerak):** kamera diam 0–4,2 dtk; saat batang erro naik, push-in ±8 % dalam 0,5 dtk (judul 53,3 → 57,5 % lebar), jangkar kanan-atas (≈ x 83 %, y 20 %) sehingga grafik turun-kiri ±3–5 %; garis sirkuit hijau samar muncul di grid kanan-atas; ditahan lalu kembali saat runtuh (6,0–6,4). Pemicu = batang punchline + hit musik. (k5)
- **Kenapa bekerja:** satu-satunya gerak kamera dalam klip, sehingga terbaca sebagai kejadian.
- **Mekanik Remotion (titik awal):**
  - Lapisan: seluruh grafik dalam satu grup yang di-`scale`.
  - Gerak: `scale 1→1.08` `CURVE.heavy` 15 f dengan `transformOrigin: "83% 20%"`; kembali `CURVE.leave` 12 f; batang punchline melampaui grid (tinggi ±3–4× batang pertama).
  - Ruang: datar. Blur & blend: motion blur kamera 200°; bloom hijau naik bersama batang.
- **SFX:** `ES_Designed, Bass Dive, Bass Drop, Deep Sub, 50Hz` di frame push; riser mendahului.
- **Pakai bila:** hanya satu push per klip. · **Jangan pakai bila:** semua batang didorong (kehilangan punchline).
- **Remix (anti-jiplak):**
  1. Kartu angka tunggal → push + angka membesar menembus bingkai.
  2. Talking head → grafik kecil di sudut mengisi frame saat punchline (punch-in).
  3. Latar terang → push sama, bloom diganti bayangan lebih dalam.
- *Pengamatan di video asli, bukan target:* batang 4,58 → 5,00 % lebar selama push; level hit −1,3 dBFS (+14 dB di atas bed).

### T3 · Typewriter Color-Handoff Headline · typography
- **Trigger:** judul pertanyaan yang jawabannya ditandai warna; kata kunci mengambil warna pemenang.
- **Yang terlihat (termasuk gerak):** judul diketik per huruf 0,3→0,8 dtk (±50 huruf/dtk); label diketik saat batangnya tumbuh; "aprendo com..." berubah dari putih ke hijau tepat saat batang erro naik (4,3 dtk); dihapus-ketik terbalik 6,0→6,5. (k2, k5, k6)
- **Kenapa bekerja:** warna menghubungkan kata dengan elemen pemenang tanpa ukuran atau kotak.
- **Mekanik Remotion (titik awal):**
  - Lapisan: teks di atas grid.
  - Gerak: ketik `Math.floor((frame-start)*1.9)` huruf per frame (≈ 50 huruf/dtk @25), hapus terbalik; warna `interpolateColors` 4 f saat pemenang naik.
  - Ruang: datar. Blur & blend: glow putih `textShadow`.
- **SFX:** senyap (huruf dan kata KT); ketik panjang bila perlu: `Keyboardtyping.mp3` dipotong, dengan alasan tertulis.
- **Pakai bila:** judul ≤ 6 kata, satu kata kunci. · **Jangan pakai bila:** kalimat panjang.
- **Remix (anti-jiplak):**
  1. Judul bahasa Indonesia dua baris, kata kunci mengganti warna ke aksen brand.
  2. Latar terang → teks gelap, kata kunci diwarnai aksen.
  3. Judul di bawah grafik pada 16:9.
- *Pengamatan di video asli, bukan target:* kapital judul 1,64 % tinggi (periksa: 1,6406 %, cocok); label total 1,25 % (periksa 16 px; koreksi dari 1,56 %); rasio judul:label ±1,3 (dengan koreksi mendekati 1,3).

## Audio (bila dibedah)
earshot: 19 event (2,8/dtk): hit/snare 0,67 (teoria naik), pop UI 3,01–3,04, riser 3,73 → sub drop 4,01 → stab orkestra 4,29 (erro naik + push), stab 5,81–6,40 (runtuh). Hit punchline −1,3 dBFS, +14 dB di atas bed; bunyi kecil −16 dBFS. Musik: trap/hip-hop, ±112 bpm, pulse clarity 0,06; mix −14,2 LUFS, true peak −1,3 dBTP, LRA 1,3 LU; centroid 2,5 → 1,4 kHz setelah drop.

## Yang harus terasa sama saat disandingkan
- Tiap batang punya sebab (bola mendarat) dan tumbuh dengan ease-out sigap lalu diam?
- Batang punchline jelas jauh lebih besar dan menembus grid?
- Hanya satu gerak kamera, tepat di punchline?
- Penekanan lewat warna elemen pemenang, bukan ukuran atau kotak?
- Latar benar-benar bersih, glow hanya di sekitar grafik?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
