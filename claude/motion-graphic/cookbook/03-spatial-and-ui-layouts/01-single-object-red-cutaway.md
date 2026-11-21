---
id: "01"
pola: Single-Object Neon Cutaway
kategori: layout
kategori_lain: [typography]
trigger: daftar berurutan "rahasia 1, 2, 3"; menyebut satu produk atau objek konkret di tengah penjelasan; kata kunci pembuka yang perlu ditegaskan di atas kepala
sumber: Memory Secrets (talking head EN; kreator tidak tercatat) · 9:16 · ±1:25
dilihat_bergerak: tidak
diukur: tidak
alias: []
---
# 01 · Single-Object Neon Cutaway

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: Memory Secrets (talking head EN; kreator tidak tercatat) · 9:16, ±1:25 (dari sheet) · Frame: `../../guide/referensi/sheets/01-memory-secrets.jpg` (1 frame per 3,7 dtk) · Frame kunci: tidak ada (hanya contact sheet)
> Video sumber: tidak ada di mesin ini
> Dilihat bergerak: **tidak** (isi dari frame diam; bedah geraknya sebelum dipakai). Bedah tipis, tanpa laporan periksa; catatan Gemini + ukur 6 Nov di `../../guide/referensi/README.md`.

**Inti mekanik (1 kalimat):** Pembicara gelap-hangat sesekali digantikan atau dibelah oleh "dunia" satu warna menyala (merah) yang hanya berisi satu objek berpendar dan label kecil, sementara caption putih pendek tidak pernah pindah dari garis dada.
**Narrative trigger:**
- Daftar berurutan ("secret 1, 2, 3, 4"): satu objek berpendar per butir → T1
- Menyebut produk atau konsep konkret yang harus terlihat sambil pembicara tetap di frame → T2
- Kalimat tips yang mengalir dan perlu penanda baca visual tanpa menutupi wajah → T3
- Kata kunci pembuka atau penutup yang perlu ditegaskan ("66 SECONDS", "MEMORABLE") → T4
**Jangan dipakai untuk:** video tanpa pembicara, konten tenang atau dokumenter, palet banyak warna (satu aksen saja yang membuat pola ini terbaca).
**Kata kunci gaya:** gelap, merah menyala, satu aksen, tegas, edukatif
**Diambil untuk:** tidak disebut (referensi tipis; bagian terkuat dari sheet: sisipan dunia grafik satu objek dan caption dada yang tetap).

## Kondisi footage asli
- 9:16 vertikal. Pembicara **medium shot duduk**, tangan aktif, satu lokasi; framing berganti antara medium dan sedikit lebih dekat. Wajah di tengah-atas frame, ruang kosong di atas kepala dan di bawah dada.
- Baju **hijau zaitun tua polos**, latar cokelat tua; ruang gelap, cahaya hangat. Tidak ada B-roll terpisah; pembicara memegang produk ke kamera saat produk disebut (0:55).
- Kamera: gerak belum dilihat; framing dari sheet tampak dari tripod dengan potongan medium ↔ dekat.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Satu keluarga warna: merah ±88 % (histogram hue). Footage gelap-hangat (hijau zaitun, cokelat tua). Dunia grafik: latar merah tua ke hitam dengan vinyet; objek dan judul berpendar seperti neon. Hex tidak terukur.
### Teks
Caption putih bold huruf kecil, 1–3 kata, satu baris, tetap di area dada (±60–65 % dari atas, tinggi huruf ±3–4 % frame). Kata kunci kapital condensed besar di atas kepala (±7–8 % tinggi) dengan baris kecil di atasnya. Di grafik: label kecil putih/merah muda dekat objek; judul condensed berpendar.
### Ritme
12 cut/menit, shot median 3,3 dtk, 68 event visual/menit: cut jarang, event visual padat. Jeda belum dibedah.

## Pola

### T1 · Single-Object Neon World · layout
- **Trigger:** daftar berurutan; tiap butir mendapat satu objek yang menyala ("Secret 1…4").
- **Yang terlihat (termasuk gerak):** layar penuh merah tua dengan judul besar berpendar di atas ("FORGET") dan gantungan kunci berlabel Secret 1–4 di bawahnya (3,7 dtk). Di butir berikutnya satu kunci berpendar tajam, judul dan kunci lain buram di belakang (22,2; 36,9; 44,3 dtk). Gerak masuk dan pindah fokus belum dibedah.
- **Kenapa bekerja:** satu warna dan satu objek: tidak ada yang berebut mata. Objek tajam di tengah, sisanya buram sebagai tekstur, sehingga butir yang sedang dibahas langsung terbaca.
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): gradien radial merah tua → hitam (vinyet) → judul besar buram dan kunci non-aktif → objek aktif dengan glow → label kecil.
  - Gerak: objek aktif `scale 0,92→1` `CURVE.land` 12 f; perpindahan butir = tarik fokus: objek lama `blur(0→8px)` dan opacity 1→0,5, objek baru `blur(8→0)`, `CURVE.reveal` 8 f. Hold ≥ 1 dtk dengan `drift(frame, fps, 4)` supaya tidak mati.
  - Ruang: datar atau `perspective: 900px` ringan pada gantungan.
  - Blur & blend: glow = `filter: drop-shadow(0 0 24px <aksen>)` + salinan buram di bawah dengan `mixBlendMode: "screen"`.
- **SFX:** famili `ui` · `ES_User Interface, Click, Pops, Glass, UI, Pops` (ding lembut) satu kali per objek yang menyala; kiblat memakai ding tiap kunci (belum diukur).
- **Pakai bila:** daftar 3–5 butir dengan satu objek yang bisa digambar. · **Jangan pakai bila:** butir butuh penjelasan teks panjang di layar.
- **Remix (anti-jiplak):**
  1. Tips produk UMKM → pertahankan satu objek berpendar di dunia satu warna · ganti kunci menjadi kemasan produk, merah menjadi hijau daun, label "Tip 1…3".
  2. Latar terang → pertahankan satu objek + judul buram di belakang · ganti glow menjadi bayangan lunak dan latar menjadi gradien pastel.
  3. UI SaaS → pertahankan satu elemen tajam, sisanya buram · ganti objek menjadi satu kartu fitur di antara kartu lain yang diburamkan.
- *Pengamatan di video asli, bukan target:* merah ±88 % dari piksel dunia grafik; kunci aktif berganti tiap ±14 dtk (0:22, 0:36, 0:44).

### T2 · Split-Screen Object Over Speaker · layout
- **Trigger:** pembicara menyebut produk, konsep, atau nama kerangka yang perlu terlihat sambil wajahnya tetap ada.
- **Yang terlihat (termasuk gerak):** layar belah: grafik merah di ±separuh atas, pembicara di separuh bawah. Isinya satu objek: ikon orang di meja (14,8 dtk), judul "THE PURE FRAMEWORK" + dua contoh teks (33,3), otak (48,0), kemasan produk (55,4) lalu kemasan + daftar bahan (59,1). Pembicara di bawah dipotong sehingga kepala dan tangan tetap terlihat. Transisi masuk belum dibedah.
- **Kenapa bekerja:** wajah tetap hadir (kepercayaan) dan objek dibaca bersamaan; separuh atas satu warna menjaga objek tunggal.
- **Mekanik Remotion (titik awal):**
  - Lapisan: footage pembicara (crop dari medium ke separuh bawah, wajah di sepertiga atas crop) → panel merah separuh atas → objek + label.
  - Gerak: panel masuk `translateY(-100%→0)` `CURVE.heavy` 10 f sambil footage turun/crop; belum dibedah di sumber, jadi sanding dulu. Objek `scale 0,9→1` `CURVE.land` 10 f dengan jeda 3 f dari panel.
  - Ruang: datar. Blur & blend: tanpa; garis batas panel tanpa tepi.
- **SFX:** famili `air`, `ui` · `Woosh.mp3` pada masuknya panel bila gerak terlihat; objek senyap atau `pop up.mp3` bila objek tiba sendiri.
- **Pakai bila:** footage pembicara punya ruang di atas kepala yang boleh dipotong. · **Jangan pakai bila:** wajah menempati > 60 % tinggi frame.
- **Remix (anti-jiplak):**
  1. Tutorial UI → pertahankan separuh atas objek tunggal · ganti objek menjadi satu tangkapan layar tanpa chrome, panel biru tua.
  2. 16:9 → pertahankan pembelahan, tetapi kiri-kanan: panel objek kiri, pembicara kanan.
  3. Footage tanpa ruang atas → panel menjadi pil melayang di pojok, bukan separuh frame.
- *Pengamatan di video asli, bukan target:* dipakai di 0:14, 0:33, 0:48, 0:55–0:59.

### T3 · Chest-Level Fixed Caption · typography
- **Trigger:** kalimat tips yang mengalir; setiap frasa 1–3 kata.
- **Yang terlihat (termasuk gerak):** caption putih bold huruf kecil, 1–3 kata, satu baris, selalu di area dada, tidak pindah-pindah antar-shot ("much more", "everything", "grasp", "actually start"). Cara masuk/keluar belum dibedah.
- **Kenapa bekerja:** posisi tetap membuat mata tidak mencari; dada pembicara berbaju gelap polos menjadi latar bersih.
- **Mekanik Remotion (titik awal):**
  - Lapisan: footage → caption (satu `<div>` posisi tetap, `top: 62%`, tinggi huruf ±3,5 % frame).
  - Gerak: kata ganti dengan cut keras; bila perlu `opacity 0→1` 3 f. Tidak ada gerak posisi.
  - Ruang: datar. Blur & blend: tanpa.
- **SFX:** senyap (caption kata per kata senyap, `../../guide/sfx/GUIDE.md`).
- **Pakai bila:** baju gelap polos di area dada. · **Jangan pakai bila:** pembicara berbaju bermotif atau tangan sering melintas di garis dada.
- **Remix (anti-jiplak):**
  1. Latar terang → pertahankan posisi tetap · ganti putih menjadi gelap dengan stroke tipis.
  2. Footage jarak dekat → pertahankan satu baris tetap · pindahkan garis ke bawah dagu.
  3. Talking head 16:9 → pertahankan posisi tetap di sepertiga bawah tengah.
- *Pengamatan di video asli, bukan target:* ±60–65 % dari atas frame, tinggi huruf ±3–4 %, tampil 0:03–1:25.

### T4 · Overhead Condensed Keyword · typography
- **Trigger:** kata kunci pembuka atau penutup ("66 SECONDS", "HEADINGS", "MEMORABLE") yang perlu menonjol di atas caption.
- **Yang terlihat (termasuk gerak):** kapital condensed besar di atas kepala, terpisah dari baris caption, dengan baris kecil di atasnya ("looking at", "& that makes it much more"). Teks kunci kadang tertutup kepala di tepi bawah huruf. Gerak belum dibedah.
- **Kenapa bekerja:** ruang kosong di atas kepala; skala 2× caption membedakan peran kata kunci tanpa warna baru.
- **Mekanik Remotion (titik awal):**
  - Lapisan: footage → kata kunci (z di bawah kepala bila ingin terselip) → baris kecil.
  - Gerak: `translateY(24px→0)` + opacity `CURVE.reveal` 8 f; baris kecil menyusul 3 f.
  - Ruang: datar. Blur & blend: tanpa.
- **SFX:** famili `glitch` · senyap; satu `Katapertama.mp3` bila ini kata pembuka video.
- **Pakai bila:** ruang di atas kepala ≥ 15 % tinggi frame. · **Jangan pakai bila:** kepala menyentuh tepi atas.
- **Remix (anti-jiplak):**
  1. Video produk tanpa wajah → pertahankan kata condensed besar di atas objek · ganti kepala menjadi objek tengah.
  2. Latar terang → huruf gelap condensed.
  3. 16:9 → kata kunci di sisi kosong lawan wajah.
- *Pengamatan di video asli, bukan target:* tinggi ±7–8 % frame; muncul di 0:00, 1:06, 1:17.

## Audio (bila dibedah)
Cut ke close-up pembicara disertai whoosh (catatan Gemini, belum diukur). Ding tiap kunci muncul (0:02–0:05). Musik ±117 bpm, padat (perkiraan dari mix, ±10 bpm). Kepadatan, level, genre: belum dibedah.

## Yang harus terasa sama saat disandingkan
- Sisipan grafik berisi satu objek berpendar + label kecil, bukan beberapa objek?
- Hanya satu aksen warna; tidak ada warna kedua di grafik?
- Grafik terasa lebih menyala dibanding footage gelap-hangat?
- Caption selalu di garis dada, kata kunci besar selalu di atas kepala, dua peran tidak tercampur?
- Pembicara tetap terlihat di setiap sisipan separuh layar?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
