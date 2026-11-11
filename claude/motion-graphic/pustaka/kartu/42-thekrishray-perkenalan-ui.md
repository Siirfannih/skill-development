# 42 · Perkenalan motion designer lewat komponen UI, thekrishray (IG DcnW2OZzyT4)

> **Status: standar kualitas Irfan.** Video ini target yang harus dicapai, bukan contoh opsional.
> Sumber: https://www.instagram.com/reel/DcnW2OZzyT4/ (file Irfan "siirfannih_DcnW2OZzyT4 (thekrishray)") · 1:1 (720×720), 30 fps, 33,6 dtk · analisis asal: canvas-skill-library, reference_id DcnW2OZzyT4 · Frame: `../../guide/referensi/sheets/42-thekrishray-perkenalan-ui.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/42-k*.jpg` · Bedah lengkap: `canvas-skill-library: skills/canvas-reference-director/references/cards.json (reference_id DcnW2OZzyT4)`; data ukur: `ukuran.md`
> Kedalaman bedah: **dalam** (diukur dari video sumber 11 Nov; batas: sumber 720 px, 1 px = 0,14 %)

> Video yang sama dengan kartu 09 (`09-thekrishray.md`); kartu ini kiblatnya.
**DNA (satu kalimat):** Perkenalan diri tanpa wajah: tiap kalimat VO menjadi satu komponen UI bergaya iOS (pil, kartu harga, kolom chat, dropdown, gelembung iMessage, kalender) yang berbunyi saat disentuh dan berubah bentuk menjadi komponen kalimat berikutnya, lalu ditutup tipografi kinetik hitam-putih.
**Cocok untuk:** perkenalan diri/jasa, cerita perjalanan dengan VO, penawaran yang bisa diperagakan sebagai UI · **Tidak cocok untuk:** talking head, dokumenter footage, konten yang butuh foto nyata
**Kata kunci gaya:** UI sebagai cerita, bersih iOS, biru sistem, lincah, morph, taktil
**Diambil untuk:** "siirfannih_DcnW2OZzyT4 (thekrishray)": nama tidak menyebut bagian; lihat bagian terkuat. Terkuat: motion graphic UI (rantai morph komponen) + SFX UI yang menempel tiap aksi + kamera push/pan pada komponen.

## PENGIKAT (diambil utuh dari SATU kiblat; ini yang membuat video terasa satu keluarga)

### 1. Warna & tekstur
- Latar per babak (sampel piksel): putih `#FCFCFC` (pembuka, harga, gelembung, kata tunggal, kalender); gradien biru langit `#65A9F4` sudut → `#B1D2EB` tengah ("my name is krish"); putih `#FCFCFE` → biru pucat `#B6DFF5` dari kiri ke kanan (pemilih platform); hitam ke navy `#011120`–`#04233F` (chat); hitam amber `#432E03`–`#170D01` (ketik "For the last few years"); hitam `#000000` (penutup).
- Aksen tunggal: biru sistem iOS `#2283EF` (tombol harga) / `#0B80F2` (gelembung); kalender bergeser ke biru-ungu `#4B3FE0` dengan pita lavender `#BFB2F7`–`#E3E0FB`.
- Aksen kata kedua hanya satu kata per frasa: coral/pink `#BE5A6C` ("making", "happens", "designer" saat masuk), biru ("posting", "exciting").
- Tanpa grain atau tekstur. Kedalaman lewat pendar biru di belakang kartu (`#DAEBFA` di 15 % lebar dari tepi kartu), bayangan lembut ubin, motion blur, dan pendar putih nama penutup (naik dari 6 ke 58 nilai abu dalam 14 % tinggi).
- Komponen UI gelap (kolom chat `#282C2F`, pil hitam) di atas latar gelap; kartu abu terang `#ECECEC` di atas putih.

### 2. Teks
- Font paling mirip: SF Pro Display Semibold (alternatif Inter Semibold) untuk kalimat; SF Pro Regular/Medium untuk teks di dalam UI. Satu keluarga sans saja.
- Tiga ukuran saja: kata tunggal 8,2–9,2 % tinggi (asc–desc), kalimat utama 6,1–7,2 %, teks UI 2,6–4,6 %. Rasio kata tunggal : teks UI ±3 kali; kalimat : label UI ±1,7 kali.
- Kalimat di tengah (x 49–50 %, y 43–51 %), satu baris, lebar 46–75 % frame. Label komponen duduk DI ATAS komponen (y 30–33 %); teks lain hidup DI DALAM komponen (chat, dropdown, gelembung, tombol).
- Kata per tampil: 1 (ketukan "land / my / client"), 3–5 (kalimat), sampai 9 di kolom chat.
- Masuk: per kata, kata kunci masuk lebih besar dan berwarna pink lalu menyusut ke hitam ("motion designer."); "my" naik dengan stagger; efek ketik dengan kursor kuning `#D1A511` (tinggi ±18 % termasuk pendar) di latar amber; kata tunggal masuk sekaligus dengan blur. Keluar: smear horizontal, zoom blur, atau ditutup objek berikutnya.
- Penekanan: warna satu kata, pita seleksi UI (dropdown, pil segmen), sorot biru yang maju kata demi kata di chat. Tanpa box hiasan, tanpa garis bawah.
- Penutup: kalimat putih menyapu ke kiri (±35–40 % lebar/dtk), lalu "thekrishray" putih 7,2 % tinggi berpendar di hitam.

### 3. Ritme
- `pace_read.py`: 11 cut = 19,6/menit, shot median 1,3 dtk, event visual 41/menit (kategori energi). Scene detect: 8 hard cut berbeda (1,9 · 7,3 · 15,8 · 24,4 · 24,8 · 25,6 · 30,0 · 31,1 dtk); sisanya morph.
- Lambat: kolom chat 9–15 dtk (satu komponen ±6 dtk, kamera pan). Cepat: 24–27 dtk (kilas hitam/putih + kata tunggal, 4 pergantian dalam ±2,5 dtk).
- 90 % cut jatuh ≤ 100 ms dari onset audio (earshot); 1 cut tanpa bunyi (24,37).

## TEKNIK (boleh dipinjam referensi lain; selalu dikenakan pengikat kiblat)

### 4. B-roll / footage
- Tidak ada footage maupun wajah. Seluruhnya grafik UI, emoji/ikon app (berwarna asli), dan teks.

### 5. Motion graphic
- Rantai morph satu objek: teks → pil hitam (34×7 %) → orbit ikon app produktivitas ("challenging myself") → kartu harga "−1000 $ +" dengan slider (angka naik 973 → 1000) → titik → hard cut.
- Ketik di latar amber → piksel larut → kolom chat gelap (tombol +, lampiran, "Flash" dropdown, mik, kirim) → dropdown 3 baris "Right now / I have / zero clients" dengan pita seleksi turun per baris → pil segmen "No audience / No agency / behind me".
- Gelembung iMessage biru (teks putih, "Read 3:15 PM") naik bertumpuk; pemilih platform: ubin putih dengan tombol panah biru, kursor tangan mengklik, logo Instagram → X → YouTube di ubin yang sama.
- Kata "client" → kotak lavender → titik biru 12 % → tanggal 15 kalender → baris tanggal terbangun → cakram "?" masuk dari kanan.
- Tiap komponen menggambarkan isi kalimat secara harfiah (harga untuk tarif, dropdown untuk daftar, gelembung untuk "obsesi", kalender untuk "first client").
- **Skala subjek:** SATU komponen di tengah. Kolom chat 86×34 %, kartu harga 58×54 % (saat di-push), gelembung 57×11 %, ubin platform 31×29 %, pil 34×7 %, titik 12×12 %. Sisa frame kosong.
- **Kedalaman:** 2 lapis (latar polos/gradien + komponen), ditambah pendar biru di belakang kartu, bayangan lembut ubin, motion blur saat pindah; tanpa paralaks terukur, tanpa lapis depan.

### 6. Kamera & transisi
- Push ke komponen: kartu harga +32 % lalu +29 % dalam 1 dtk (5,5–6,5), lalu pull 0,56× saat keluar; panel biru napas +9 %/−12 %; "I'll be posting" +18 % dalam 1,5 dtk.
- Pan: kolom chat geser kiri ±23 % frame dalam 2 dtk lalu tilt naik ±25 %; kalender pan kiri yang makin cepat (−18 → −37 → −71 % per 0,5 dtk); kalimat penutup geser kiri ±17–20 % per 0,5 dtk.
- Transisi: morph (mayoritas), zoom blur, smear horizontal, larut piksel, kilas hitam/putih, smear radial biru sebelum nama. Pemicu: kata VO dan aksi UI (klik, kirim).

### 7. SFX
- earshot: 219 event (6,5/dtk); berlabel 34 voice, 19 UI (notification ding, chat pop), 13 note (glockenspiel), 11 hit, 8 whoosh, 4 key, 4 foley, 3 riser.
- Pemakaian: ketukan keyboard saat teks diketik (5,1 · 7,3 · 10,5); pop/ding saat gelembung muncul (17,4 · 18,8); ding tiap klik pemilih platform (22,8–23,9, terkuat +21 dB di atas bed); whoosh pada transisi awal (0,3 · 2,8 · 3,9); reverse cymbal swell +25 dB sebelum nama (31,85).
- Level: puncak SFX −4 sampai −2 dBFS, sejajar VO, 10–20 dB di atas bed.

### 8. Musik
- Trap beat / glitch hop dengan vocal chop, ±136–140 bpm (librosa 136, earshot 140, pulse lemah 0,16); bass sangat berat (pita <100 Hz +17 dB di atas 300 Hz–3 kHz).
- Babak: 0–7,6 glitch hop; 7,6–27,25 trap; 27,25–33,6 menipis, VO di depan (speech 0,83); ekor 1,5 dtk sunyi.
- Mix −14,2 LUFS, true peak +1,6 dBTP (clip), LRA 2,8 LU. VO laki-laki ±4,5 suku kata/dtk.

## Proporsi terukur (11 Nov, video sumber 720×720; % terhadap frame 1:1)
Data mentah dan skrip: `ukuran.md`. Frame kunci: `keyframes/42-k1…k8-*.jpg`.

| Jenis adegan | Kata kunci (% tinggi) | Kata sambung | Posisi teks | Skala subjek | Kedalaman |
|---|---|---|---|---|---|
| Teks + emoji (k1) | kalimat 6,4 (x-height 3,8); saat masuk "designer" pink lebih besar | sama ukuran setelah menetap | tengah x 50, y 43; 4 emoji di sudut (y 22–65 %) | teks 75 % lebar | 1 lapis putih rata |
| Panel gradien (k2) | "my" 8,3 (masuk) | "name is krish" 6,1 | tengah x 50, y 48; bintang di 4 sisi | teks 58 % lebar | gradien biru 2 nada |
| Kartu harga (k3) | "1000 $" 7,6 | label 4,6, "$0/$1000" 4,2 | label di atas tombol (y 33), angka di tombol (y 50) | kartu 58×54 %, tombol 50×17 % | kartu + pendar biru + putih |
| Chat gelap (k4) | kalimat x-height 2,2 (±3,1 cap) | dropdown 2,6 | di dalam bar, kiri; dropdown di bawah kanan | bar 86×34 %, terpotong kiri | navy gradien + bar + dropdown |
| Gelembung (k5) | ±3,7 cap | "Read" ±1,8 | di dalam gelembung | 2 gelembung 57×11 % dan 48×9 % | 1 lapis putih rata |
| Pemilih platform (k6) | judul 7,2 | — | di atas ubin (y 30) | ubin 31×29 % di y 42–70 % | gradien putih→biru + bayangan ubin |
| Kata tunggal (k7) | 8,2–9,2 | — | tengah x 50, y 50–68 (bergeser) | kata 16–30 % lebar | putih rata, blur masuk |
| Kalender (k8) | angka 5,7 | — | 3 baris penuh lebar (y 28 / 53 / 77) | titik 15 ±12 %, pita penuh lebar | motion blur pan kuat |
| Nama penutup (f066, tanpa frame kunci) | 7,2 | — | tengah x 50, y 50 | nama 42 % lebar | hitam + pendar putih |

- Rasio kata tunggal/kalimat : teks UI ±3 kali; tiga ukuran saja, tidak ada ukuran perantara.
- Semua fokus di pita tengah y 27–77 %; 20 % atas dan bawah hampir selalu kosong.

## Cek kemiripan (dipakai juri saat menyandingkan still)
- Tidak ada footage atau wajah; tiap still berisi SATU komponen UI di tengah atau satu frasa, sisa frame kosong.
- Komponen mengisi 30–60 % lebar frame (kolom chat boleh 86 % dan terpotong tepi); bukan banyak objek kecil.
- Kalimat 6–7,5 % tinggi frame di tengah (y 43–51 %); kata tunggal 8–9 %; teks di dalam UI 2,5–4,5 %; tiga ukuran saja.
- Satu keluarga sans semibold (SF Pro/Inter); tanpa serif, tanpa box hiasan.
- Satu aksen biru sistem (±`#0B80F2`–`#2283EF`); paling banyak satu kata coral/pink atau biru per frasa.
- Latar polos atau gradien 2 nada (putih `#FCFCFC`, biru langit, navy, amber gelap, hitam); tanpa grain.
- Kedalaman 2 lapis + pendar/bayangan lembut di belakang komponen; bukan lapisan bertumpuk.
- Label komponen duduk di atas komponen; 20 % atas dan bawah frame kosong.
- Still berurutan memperlihatkan objek yang sama berubah bentuk (pil → kartu → titik), dan still di tengah perpindahan punya motion blur.

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
