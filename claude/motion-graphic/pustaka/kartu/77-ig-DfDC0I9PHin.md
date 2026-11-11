# 77 · Energy & The Sun (= kartu 52, bedah ulang dalam)

> **Status: standar kualitas Irfan.** Video ini target yang harus dicapai, bukan contoh opsional.
> **Sama dengan kartu 52** (`kartu/52-energy-sun.md`): durasi 21,9 dtk, −14,0 LUFS, 123 bpm, 4,98 onset/dtk identik. Kartu ini menggantikan isi kartu 52.
> Sumber: file `siirfannih_DfDC0I9PHin.mp4` (IG, caption di video "POV: You're Launch look like a Netflix Trailer"); di kartu 52 tercatat sebagai "05 Energy / sun" (Energy & The Sun) · 9:16 (720×1280, 23,976 fps), 21,9 dtk; isi = edit 16:9 di viewer After Effects yang direkam HP · Frame: `../../guide/referensi/sheets/77-ig-DfDC0I9PHin.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/77-k*.jpg` · Bedah lama: `GrokAgent/reference-videos/VISUAL-BREAKDOWN.md` (V5), `GrokAgent/reference-videos/AUDIO-ANALYSIS.md` (05_energy_sun), `GrokAgent/reference-videos/AUDIT-2NOV-B-kinetic.md` (§5), `GrokAgent/reference-videos/data/` · Data ukur: `ukuran.md`
> Kedalaman bedah: **dalam** (viewer AE diluruskan per frame dengan homografi, lalu diukur sebagai frame 16:9 1280×720; semua % teks di bawah terhadap viewer itu)

**DNA (satu kalimat):** Trailer kutipan tokoh 22 dtk: footage arsip/sinematik berganti tiap ±0,35 dtk di bawah satu baris teks sans putih kecil di tengah yang bertahan melintasi cut, kata aktif disorot dengan terang/tajam (kata lain redup dan buram), lalu ditutup penghitung "85%→100%" raksasa di atas langit senja.
**Cocok untuk:** launch trailer, montase kutipan tokoh, hook opini ±20 dtk dengan VO rapat · **Tidak cocok untuk:** tutorial, demo UI, penjelasan panjang
**Kata kunci gaya:** trailer, arsip sinematik, teks tengah kecil, sorot kata, sangat cepat, gelap
**Diambil untuk:** nama file "siirfannih_DfDC0I9PHin" tidak menyebut bagian; lihat bagian terkuat: **Teks** (sorot kata + teks melintasi cut) dan **Ritme** (±99 cut/menit).

## PENGIKAT (diambil utuh dari SATU kiblat; ini yang membuat video terasa satu keluarga)

### 1. Warna & tekstur
- Kartu teks hitam murni `#000000` dan putih murni `#FFFFFF` (tanpa vignette, tanpa grain; std piksel 0).
- Footage di-grade lembut seperti arsip: hangat-oranye (ruang TV `#58362A`), teal (nuklir), biru WEF (`#0D205D`); kontras rendah, sedikit grain/blur film.
- Penutup: gradien senja `#AF686B` (atas) → `#34345D` (tengah) → `#313766` (bawah) dengan bola matahari kuning di belakang angka.
- Satu aksen warna teks: hijau `#73AB43` pada "just"/"be" (9,8–10,3 dtk). Sisanya putih/hitam/abu.
- Bingkai luar (bukan bagian edit): ruang gelap `#1A0C05`, UI After Effects, caption kuning `#CCBE3E`.

### 2. Teks
- Font: neo-grotesk mirip SF Pro Display / Inter, bobot Medium–Semibold; satu kata judul ("Wattage") memakai sans lebar/extended Black.
- Ukuran: x-height 3,5–6 % tinggi frame, kapital ±6–8 %; lebar blok 10–45 % lebar frame. Teks KECIL untuk ukuran trailer. Pengecualian: angka "100%" kapital ±25 % (lebar 49 %), "Wattage"/"Nuclear" ±8 % x-height.
- Kata kunci dan kata sambung **ukuran sama** dalam satu frasa ("for a new industry", "the sun"); penekanan lewat **terang + ketajaman**: kata aktif putih tajam (di putih: hitam `#202020`), kata lain abu redup (`#333333` di hitam) dan diburamkan. Hanya "100%" vs "of all energy" berbeda ukuran (±3,5×).
- Posisi: pusat x 50 %, y 44–52 % (tengah frame) di hampir semua adegan. Variasi: mengapit subjek kiri-kanan (k2: "Everything" x 22 % / "around you" x 77 % di samping TV); di sel kosong grid foto (k3); menempel di depan dada/wajah tokoh (k8, Musk; Jensen).
- 1–4 kata per tampil (median 2).
- Watak: sigap. Sorot pindah antar-kata dalam 1 frame (17,31→17,35 dtk "the"→"sun"); teks tidak bergerak, hanya ganti opasitas/blur. Teks **bertahan melintasi cut** (satu kata menumpang 2–4 shot: "in order" 2, "Nuclear" 4, "Wind" 2, "Solar" 2). Kata "no" muncul memanjang vertikal (stretch) lalu kembali normal.
- Penghitung: 85 %→100 % naik 1 angka per 1–2 frame (18,56–19,3 dtk) dengan blur gerak pada digit.

### 3. Ritme
- 41 perubahan gambar terdeteksi di viewer (±36 cut nyata + 4 sel grid + 1 streak) = **±99 cut/menit, shot median 0,35 dtk, rata-rata 0,52 dtk**. (`pace_read.py` membaca 0 cut karena viewer hanya 60 % lebar frame HP; pakai angka ini.)
- Paling cepat 12,47–13,81 dtk: 8 shot tiap 0,17 dtk (4 frame) untuk "Nuclear / Wind / Solar".
- Lambat: pembuka TV 1,0 dtk; layar putih "the sun" 1,3 dtk; penghitung % 1,9 dtk; Musk penutup 1,2 dtk.
- VO hadir 93 % durasi, 3,66 kata/dtk, tanpa jeda >300 ms (data 30 Okt kartu 52).

## TEKNIK (boleh dipinjam referensi lain; selalu dikenakan pengikat kiblat)

### 4. B-roll / footage
- Hampir 100 % footage; tidak ada wajah pembicara tetap. Jenis: arsip tokoh (Jobs, Zuckerberg, Bezos, Gates, Altman, Jensen Huang, Musk di WEF), stok sinematik (bumi, otak MRI, capung, siput, roket, chip, salju, ombak, panel surya, kincir angin, menara nuklir, mata, api), dokumen (paten Edison).
- Tiap kata benda di VO dapat shot harfiah ("Nuclear" → reaktor, "Wind" → kincir, "Solar" → panel); kutipan tokoh ditunjukkan dengan tokohnya sendiri.
- Perlakuan: full-frame 16:9, satu grade arsip lembut; kecuali grid 3×3 foto tokoh (k3) dan TV retro di ruang (k2).

### 5. Motion graphic
- Grafik minim: grid foto tersusun sel demi sel (4 sel, ±0,17 dtk per sel), penghitung persen, sorot kata, satu streak blur (8,2 dtk).
- **Skala subjek:** satu subjek besar per shot: tokoh arsip ±60–90 % tinggi, sering terpotong bawah (Musk k8 ±90 % × 55 % lebar); TV k2 ±65 % tinggi × 39 % lebar di tengah (dibaca dari grid 10 %); angka "100%" 25 % tinggi × 49 % lebar. Grid k3 = 8 objek kecil (sel 33×33 %).
- **Kedalaman:** 2 lapis: footage + teks datar di depan. Tanpa bayangan teks, tanpa paralaks. Kata pasif diburamkan; footage tidak diburamkan di belakang teks. Penutup 3 lapis: gradien senja + bola matahari (di belakang digit) + angka.

### 6. Kamera & transisi
- Kamera HP diam (lebar viewer 430 px konstan, geser pusat <0,3 %): video ini rekaman layar statis, bukan gerak tangan.
- Di dalam edit: push-in pelan +8–9 % per shot pada arsip (TV 0–1,0 dtk; Altman; Musk 20,4–21,6 dtk), pan samping ±4 % lebar pada stok produk (chip, lampu), sisanya diam.
- Transisi: hampir semua hard cut di bawah teks yang diam; satu streak/whip blur (salju → garis, 8,2 dtk); grid tersusun dengan pop sel; pemicu = kata VO.

### 7. SFX
- earshot: 133 event (6,1/dtk); label lemah: 44 pop/UI, 17 hit sub-drop, 2 whoosh, 1 riser. Mayoritas "?" (<12 dB di atas bed), jadi SFX duduk di dalam musik, bukan menonjol.
- Pola terbaca: pop rapat saat grid tersusun (3,29–3,62 dtk) dan saat penghitung (19,07–19,70 dtk); sub-drop pada cut rapat Nuclear/Wind (11,27–12,76 dtk).
- Level SFX terhadap VO: Tidak terukur: stem tidak dipisah (demucs tidak dijalankan).

### 8. Musik
- 123 bpm (librosa, sama pada stem perkusif); pulse clarity 0,07 (grid beat tidak menonjol di mix). Harmoni condong C/A/G.
- Babak: 0–15,7 dtk "inspirational corporate"; 15,7–21,9 dtk "tech house" lebih keras (−13 LUFS jangka pendek, puncak 17–20 dtk).
- Mix −14,0 LUFS, true peak −0,3 dBFS (ebur128), LRA 2,5 LU, RMS p95−p10 12,7 dB: rapat dan rata, tanpa intro/outro (ekor senyap 0,4 dtk).

## Proporsi terukur (11 Nov 2026, viewer AE diluruskan 1280×720; % terhadap frame 16:9 konten)

| Jenis adegan | Kata kunci % | Kata sambung % | Posisi teks | Skala subjek | Kedalaman |
|---|---|---|---|---|---|
| Bingkai POV AE (k1) | caption POV 1,6 % tinggi HP | sama | y 16 % frame HP, x 11–89 % | viewer 60 % lebar × 21 % tinggi frame HP | ruang gelap + layar + keyboard |
| Objek + teks mengapit (k2) | x-height 3,5 | 3,6 (sama) | kiri x 22 / kanan x 77, y 44 | TV ±65 % tinggi × 39 % lebar | ruang hangat + TV + teks |
| Grid arsip + teks (k3) | x-height 6,0 ("By People") | – | sel tengah, x 50, y 51 | 8 sel foto 33 % | grid datar + teks |
| Kartu hitam (k4) | aktif x-height 5,3 | pasif 5,6 (sama) | x 50, y 50 | tanpa subjek | hitam datar, kata pasif buram |
| Footage + teks tengah (k5) | x-height 8,1 ("Nuclear") | – | x 50, y 52 | objek besar di tengah-bawah | footage + teks |
| Kartu putih (k6) | aktif x-height 6,8–7,5 | pasif sama | x 50, y 49–50 | tanpa subjek | putih datar, pasif abu + buram |
| Angka besar (k7) | "100%" ±25 tinggi, 49 lebar | "of all energy" ±7 (±3,5×) | x 50, y 44 / 64 | angka = subjek | gradien + matahari + angka |
| Arsip tokoh + teks (k8) | x-height 5,7 | sama | x 52, y 45, depan dada tokoh | Musk ±90 % tinggi × 55 % lebar, terpotong bawah | footage + teks |

- Rasio kata kunci : kata sambung **1:1** (penekanan bukan ukuran); satu-satunya lompatan ukuran adalah angka penutup.
- Batas: viewer 1280×720 hasil warp dari ±430×270 px asli (1 px asli ≈ 0,37 % tinggi); kata kecil meleset ±15 %.

## Cek kemiripan (dipakai juri saat menyandingkan still)
- Teks berada di tengah (pusat x 48–52 %, y 44–52 %) kecuali adegan mengapit subjek.
- x-height teks 3,5–8 % tinggi frame; bukan teks raksasa (kecuali satu angka penutup ±25 %).
- Dalam satu frasa semua kata satu ukuran; kata aktif terang/tajam, kata pasif redup + buram.
- 1–4 kata per tampil; satu baris; tanpa kotak, garis, bayangan atau outline.
- Kartu teks murni `#000000` atau `#FFFFFF`; footage satu grade arsip lembut; paling banyak satu aksen warna teks (hijau `#73AB43`).
- Tiap shot satu subjek besar (60–90 % tinggi) yang harfiah dengan kata VO; grid foto hanya sekali.
- Teks yang sama bertahan di atas 2–4 shot berturut (cut di bawah teks).
- ±90–100 cut/menit, shot median ±0,35 dtk; ada ledakan shot 4 frame.
- Penutup: penghitung persen raksasa di atas gradien senja + bola matahari.

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
