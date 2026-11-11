# 58 · GatesFX "karakter kaca di ruang gelap"

> **Status: standar kualitas Irfan.** Video ini target yang harus dicapai, bukan contoh opsional.
> Sumber: GatesFX (iklan broker forex, watermark www.gatesfx.com), file `pustaka-video/unggahan/GatesFX_ssspin.io_1794219240.mp4` · 9:16 (720×1280, 30 fps), 12,8 dtk · Frame: `../../guide/referensi/sheets/58-gatesfx.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/58-k*.jpg` · Bedah lengkap: `~/audit-claude/deep/58-gatesfx/ukuran.md`
> Kedalaman bedah: **dalam** (video pendek, 4 shot; semua shot diukur. SFX vs VO tidak dipisah stem, lihat 7)

**DNA (satu kalimat):** Satu maskot 3D bulat dari kaca/krom di ruang hitam pekat, disinari satu sumber cahaya berwarna per babak (putih → merah → hijau), dengan satu elemen info per adegan (grafik, kartu kata, ikon, angka) yang menempel di sekitar maskot.
**Cocok untuk:** iklan fintech/trading, explainer produk pendek, cerita masalah → solusi 10–20 dtk · **Tidak cocok untuk:** podcast/talking head, konten hangat-personal, penjelasan padat data
**Kata kunci gaya:** noir, 3D glossy, minimal, sinematik, satu aksen per babak
**Diambil untuk:** nama file "GatesFX" tidak menyebut bagian; lihat bagian terkuat (cahaya + warna per babak dan skala maskot; motion graphic 3D).

## PENGIKAT (diambil utuh dari SATU kiblat; ini yang membuat video terasa satu keluarga)

### 1. Warna & tekstur
- Latar hitam murni `#000000`–`#0A0A0A` di semua shot; tidak ada grain, tidak ada tekstur kertas.
- Satu warna cahaya per babak: putih netral (grafik naik, kartu), merah (masalah), hijau (profit). Tidak pernah dua aksen sekaligus.
- Merah: glow dari tepi atas `#36090D` di sudut, garis turun `#812B39`, rim light kepala `#FFEEF2` (putih kemerahan). Glow tumbuh sepanjang shot 3 (piksel terang zona atas 695 → 5 936).
- Hijau: bar `#1A4507` ber-gradien ke tepi terang, sorot cahaya/beam `#112D05`, titik cahaya putih di puncak beam.
- Biru `#1264AA` hanya di ikon logo GatesFX (watermark tetap).
- Material: maskot kaca/krom dengan rim light tajam dan pantulan lantai; bingkai grafik kaca dengan kilau sudut kiri atas. Cahaya volumetrik (sorot lebar) di shot 1–2 dan 4.

### 2. Teks
- Teks sangat sedikit: satu kata kunci ("DISCIPLINE") dan satu angka ("Profit 578799"); sisanya grafis. Watermark GATESFX + URL di y ±78–82 % tampil di semua frame.
- Font: "DISCIPLINE" ≈ sans extended bold italic (mirip Eurostile Extended / Michroma Italic), huruf kapital, gradien abu gelap → memudar putih di kanan. Angka + label ≈ Montserrat Bold/SemiBold. Logo ≈ sans geometris lebar ExtraBold.
- Kata kunci menempel objek: "DISCIPLINE" dicetak di kartu putih miring (paralelogram 54 × 12,5 %) yang keluar dari sisi kanan dada maskot, seperti layar/plakat yang ia pegang.
- Angka: besar di sepertiga atas (cap 4,5 % tinggi), label "Profit" kecil 1,3 % di kiri atasnya (rasio 3,4×), bar hijau tipis di bawah angka. Angka menghitung naik ±95 000/dtk.
- 1 kata atau 1 angka per tampil. Penekanan lewat kontras (kartu putih di ruang hitam; angka putih di bar hijau), bukan warna kata.
- Watak masuk: kartu "DISCIPLINE" sudah ada saat cut, ikut digeser gerak kamera menyamping; angka menghitung (odometer) tanpa animasi masuk lain. Animasi per huruf: tidak ada.

### 3. Ritme
- 4 shot, 3 cut (1,77 · 3,27 · 9,27 dtk) = 14 cut/menit; durasi shot 1,8 / 1,5 / 6,0 / 3,5 dtk, median 2,6 dtk.
- Pola: dua shot cepat bergerak (pembuka), satu shot panjang diam yang mengisi diri (ikon muncul satu per satu), satu shot hasil (angka naik).
- Event visual ±14/menit menurut `pace_read.py`; ditambah hitungan manual: ±9 kejadian (kurva tergambar, sapuan cahaya, kartu, 3 ikon, busur, garis merah, angka).
- Cut 2 dan 3 jatuh ±0,07–0,10 dtk sebelum VO kalimat baru (gap audio 0,5 dtk dan 0,4 dtk tepat sebelumnya).

## TEKNIK (boleh dipinjam referensi lain; selalu dikenakan pengikat kiblat)

### 4. B-roll / footage
- Tidak ada footage. Semua adegan 3D render (CG) dengan maskot yang sama.

### 5. Motion graphic
- Grafik garis naik dalam bingkai kaca bergrid (65 × 31 %, kiri atas) di belakang maskot: "trading/naik".
- Kartu kata miring keluar dari maskot: nilai/kebiasaan ("DISCIPLINE").
- Ikon kaca bulat (tukar, dompet keluar, peringatan) muncul satu per satu di busur tipis di atas kepala + garis merah turun memotong diagonal: "masalah/kerugian".
- Panel angka + beam hijau dari bawah: "profit".
- Watak gerak: tenang dan meluncur; tidak ada bounce atau shake.
- **Skala subjek:** satu subjek besar. Maskot (kepala + badan) 27 % tinggi × 42 % lebar di shot 1 (kepala Ø 25 % lebar); 23 % tinggi × 36 % lebar di shot 3 (kepala Ø 19 % lebar), pusat x 50 %, y ±45 %. Ikon kecil masing-masing Ø ±13 % lebar.
- **Kedalaman:** 3 lapis: latar hitam + cahaya volumetrik/glow, subjek (maskot + objek info), garis/ikon di depan (garis merah melintas di depan busur dan maskot). Pantulan lantai di bawah badan. Tidak ada blur depan, tidak ada paralaks kuat kecuali truck shot 1–2.

### 6. Kamera & transisi
- Shot 1 dan 2: truck menyamping ke kanan; maskot bergeser ke kiri 24 % lebar (1,7 dtk) lalu 21 % lebar (1,5 dtk). Arah sama melintasi cut = cut searah gerak.
- Shot 3: diam (ECC skala 1,001, geser < 0,2 %); di akhir maskot naik ±2 % tinggi.
- Shot 4: push sangat pelan (skala 1,009), puncak beam naik 491 → 454 px.
- Transisi: cut keras semua; cut 2 dan 3 lewat frame hampir hitam (beda luma kecil, scene detect ffmpeg melewatkan cut 9,27).

### 7. SFX
- earshot: 78 event, 52 berlabel suara VO; selebihnya petunjuk: 9 UI (ding/pop), 3 whoosh, 2 riser, 2 hit.
- Ding/glockenspiel di 4,19–4,75 dtk bersamaan ikon pertama + busur muncul; pop kecil 5,15 / 6,96 dtk dekat ikon berikutnya; whoosh 7,37.
- Tidak terukur: level SFX relatif terhadap VO dan musik (tidak dipisah stem; label earshot hanya petunjuk).

### 8. Musik
- VO narasi (pria, earshot: voice-over narration) di atas latar musik "inspirational corporate"; tanpa grid beat jelas (pulse clarity 0,06); librosa 89 bpm (tidak kuat).
- Mix −16,9 LUFS, true peak +0,6 dBFS (ebur128) / −0,2 dBTP (earshot), LRA 3,7 LU. Dua penurunan: 2,60 dtk (0,5 dtk) dan 8,90 dtk (0,4 dtk) sebelum cut.
- Nada dominan E (chroma). Perubahan musik per babak: tidak terukur tanpa stem.

## Proporsi terukur
| Jenis adegan | Kata kunci (% tinggi) | Kata sambung | Posisi teks | Skala subjek | Kedalaman |
|---|---|---|---|---|---|
| Grafik naik + maskot (k1) | tanpa teks | – | – (watermark y 78–82 %) | maskot 27 × 42 %; grafik 65 × 31 % kiri atas | latar + grafik di belakang + maskot + lantai |
| Kartu kata (k2) | cap 2,2 ("DISCIPLINE"), lebar 48 % | – | kartu menempel sisi kanan dada maskot, pusat (71, 48) | maskot siluet ±45 % lebar, kepala Ø 24 % | sorot cahaya diagonal + maskot gelap + kartu terang |
| Maskot + ikon merah (k3, k4) | tanpa teks | – | – | maskot 23 × 36 % tengah; 3 ikon Ø 13 % di busur di atas kepala | glow merah + maskot + garis merah di depan |
| Panel profit (k5) | angka cap 4,5, lebar 42 % | label 1,3 (rasio 3,4×) | sepertiga atas, pusat (60, 27); bar hijau 64 % lebar di bawahnya | tanpa maskot; beam Ø puncak di y 36 % | latar + beam volumetrik + panel |
| Watermark (semua) | GATESFX 2,2 | URL 1,7 | tengah, y 78–82 % | logo blok 37 % lebar | lapisan paling depan, tidak bergerak |

## Cek kemiripan (dipakai juri saat menyandingkan still)
- Latar hitam ≤ `#0A0A0A` di ≥ 70 % frame; tanpa grain/tekstur.
- Satu warna cahaya per adegan (putih ATAU merah ATAU hijau), tidak dicampur.
- Satu maskot 3D glossy di tengah, tinggi 23–27 % dan lebar 36–42 % frame, pusat y ±45 %; kepala Ø 19–25 % lebar.
- Rim light tipis terang di tepi atas kepala/badan + pantulan di lantai.
- Paling banyak 1 kata atau 1 angka per adegan; kata kunci menempel objek (kartu/panel), bukan melayang bebas.
- Angka besar ±4,5 % tinggi di sepertiga atas dengan label kecil ±1,3 % (rasio ±3,4×).
- Ikon pendukung kecil (Ø ±13 % lebar) melingkar di atas kepala maskot, bukan di samping teks.
- Watermark/logo tetap di tengah bawah y 78–82 %; 20 % bawah frame kosong.

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
