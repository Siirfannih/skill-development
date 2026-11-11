# 08 · Mosycreate "Instagram Save Reminders"

> **Status: standar kualitas Irfan.** Video ini target yang harus dicapai, bukan contoh opsional.
> Sumber: @mosycreate, konsep fitur IG tidak resmi, file `pustaka-video/mac/Motion.mp4` · 960×720 (4:3), 39,0 dtk, 30 fps · Frame: `../../guide/referensi/sheets/08-mosycreate.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/08-k*.jpg` · Bedah lengkap: `GrokAgent/reference-videos/AUDIT-2NOV-A-apple-motion.md` (video "Motion"); data ukur: `08-mosycreate-ukuran.md`
> Kedalaman bedah: **dalam** (diukur ulang dari video sumber 11 Nov; font tetap perkiraan visual)

**DNA (satu kalimat):** Rasa kehilangan yang semua orang kenal diceritakan lewat UI Instagram asli di latar abu `#EDEDED`; kalimat pendek satu ukuran dengan objek UI disisipkan di antara kata, kamera terus push/pull/scroll, lalu "But, what if" → fitur konsep → payoff emosional yang mendarat di foto hangat dan ruang sunyi.
**Cocok untuk:** konsep fitur/produk digital, intro berbasis masalah yang relate, video UI dengan VO pendek · **Tidak cocok untuk:** talking head, konten tanpa UI yang dikenal penonton, penjelasan panjang padat informasi
**Kata kunci gaya:** UI asli, kamera hidup, emosional, bersih, kontras gelap-terang, buatan tangan
**Diambil untuk:** nama file "Motion.mp4" → motion graphic dan gerak (kamera, transisi, animasi UI); teks di urutan kedua. Bagian terkuat: kamera yang tak pernah diam di babak 1 + objek UI inline di dalam kalimat.

## PENGIKAT (diambil utuh dari SATU kiblat; ini yang membuat video terasa satu keluarga)

### 1. Warna & tekstur
- Latar UI abu muda rata `#EDEDED` (sama persis di t 6,2 / 9,0 / 13,4); teks UI `#363636`. Tanpa tekstur, tanpa grain.
- Momen kehilangan: gradien gelap `#1D1D1D` (atas) → maroon `#713137` (bawah). Pivot "But,": hitam + titik halftone besar magenta/ungu, celah `#3A0411`.
- Aksen dipakai sekali-sekali: pink gradien hero `#F36C90`→`#EF5FB3`, coretan merah `#C41321`, biru tombol `#256CC7`, hijau toggle `#4EDC5F`, kuning tulisan tangan `#DBCB31`.
- Payoff: foto hangat keemasan `#C37A27` (tepi `#63441A`) berbingkai sudut membulat; lalu vinyet berat (tengah atas `#EEECE7` → bawah `#030302`). End card hitam `#000000`.

### 2. Teks
- Font (perkiraan visual): sans UI ala SF Pro/Inter untuk kalimat; heavy geometric (ala Gilroy/Archivo Black) untuk "COLLECTION"; bold sans bergradien untuk hero; skrip tangan untuk "Save it…" dan "Forever?".
- Ukuran kalimat dua tingkat: pernyataan emosional **7,9–8,5 %** tinggi ("You lose", "But, what if"); kalimat UI/penghubung **3,75–5,1 %** ("Instagram's gonna … you", "…had Save Reminders?"). Satu kalimat = satu ukuran.
- Satu hero full-bleed: "IN YOUR" **44,6 %** tinggi, 100 % lebar (pink, blur gerak, zoom-through). "COLLECTION" 10,3 % tinggi × 77,7 % lebar.
- Posisi: pusat y 47–52 % hampir di semua kalimat (pita tengah); x menyesuaikan objek inline, blok mulai di x 11–27 %.
- Objek UI di dalam kalimat, setinggi 1,3–2,8× huruf: thumbnail post (22 % tinggi) setelah "You lose"; ikon IG (10,6 %) setelah "what if"; notifikasi (10,4 %) di antara "gonna" dan "you".
- Penekanan lewat bobot/warna dalam ukuran sama: "But," bold vs "what if" regular; "Save Reminders" bold di kalimat abu; "And" abu tua vs "done..!" abu muda.
- 2–5 kata per tampil. Masuk per kata dengan fade/blur; "done..!" masuk blur-geser. Caption kecil dalam kurung siku ("[that photo of her?]", "[That tutorial]") ±1,8 % di y 93–96 %, menempel di dalam bingkai foto.
- End card: "MADE BY A HUMAN" 3,5 % di pusat (y 50 %), "@mosycreate" 1,4 %, "An unofficial concept for Instagram" 2,2 % di y 85 %.

### 3. Ritme
- ±15 shot / 39 dtk ≈ 22 cut/menit, shot median ±1,5 dtk (dari sheet 0,5 dtk; ffmpeg scene hanya menangkap 4 karena pergantian ber-blur/zoom; pace_read: 6,2 cut/menit, 32 event visual/menit).
- Babak 1 (0–18,4 dtk): 12 shot, median ±1,0 dtk, audio padat (RMS −12…−20 dB, ±6 onset/dtk).
- Babak 2 (18,4–39 dtk): 3 shot panjang (5,6 · 7 · 8 dtk), audio turun ke −29…−40 dB (±1,5 onset/dtk). Kontras cepat→sunyi adalah inti emosinya.

## TEKNIK (boleh dipinjam referensi lain; selalu dikenakan pengikat kiblat)

### 4. B-roll / footage
- Tidak ada footage kamera. "Footage" = isi post IG asli: foto motocross "SEE IT!", post tutorial berisi screenshot editor, foto "her".
- Foto "her" ditahan ±5,6 dtk (18,4–24 dtk) tanpa teks selain caption kurung siku.

### 5. Motion graphic
- Benda nyata, bukan ilustrasi: kartu post, grid feed, tombol bookmark (garis + jam), kartu "Reminder" (dropdown Month/Day/Time, toggle, tombol "Apply Reminder"), notifikasi iOS bertumpuk, kursor/panah.
- Coretan tangan merah write-on menunjuk tombol simpan ("Save it…" + panah melengkung); "Forever?" kuning write-on dengan garis bawah.
- Bookmark 3D hitam besar + "And done..!" (pop, bayangan elips di lantai).
- Urutan: kehilangan → "But, what if" → fitur → payoff → kredit "MADE BY A HUMAN".
- **Skala subjek:** satu subjek besar per shot. Kartu Reminder 61 % tinggi × 48 % lebar; bookmark 3D 56 × 52 %; notifikasi besar 35 × 91 %; post feed 100 × 89 %; foto "her" 96 × 68 %. Objek kecil hanya sebagai sisipan dalam kalimat (8–24 % lebar).
- **Kedalaman:** 2 lapis. Latar rata (abu/gelap) + subjek UI dengan bayangan lembut; notifikasi bertumpuk 2 kartu (yang belakang miring, memudar). Payoff 3 lapis: foto buram tepi + vinyet + tulisan tangan di depan. Blur gerak sebagai lapis transisi.

### 6. Kamera & transisi
- Babak 1 kamera hampir tidak pernah diam (ORB afin): push ×1,22→×1,07 ke tombol simpan (1–2 dtk); pull ×0,66→×0,89 di "But, what if"; push total ±×1,77 dalam 1 dtk ke ikon bookmark sambil pan kiri, lalu pull ×0,62 ke kartu Reminder; push ke notifikasi (inline 10 % → 35 % tinggi).
- Scroll feed vertikal murni 15,5–19 dtk (ty −6…−59 % per 0,5 dtk, skala tetap 1,000).
- Babak 2: foto nyaris diam (±1 %), lalu push lambat kumulatif ±×1,64 ease-out 24–28 dtk; end card diam 31,5–39 dtk.
- Transisi: whip/scroll blur (2,2–3,0 dtk), zoom-through ke hero "IN YOUR", match-zoom dari objek inline ke versi besarnya (notifikasi, bookmark), blur-in/out, fade ke hitam. Pemicu: kata VO dan objek yang sedang dibicarakan.

### 7. SFX
- earshot: 140 event (3,6/dtk); bertag 36 UI (pop/klik), 25 hit (sub-bass drop/impact), 20 nada, 3 foley. Hampir semua di 0–19,4 dtk: pop UI tiap ±0,3–0,5 dtk menempel munculnya kata/objek, sub-bass hit di pivot dan perpindahan shot.
- Kosakata: pop/klik untuk tiap kata & elemen UI, sub-bass hit untuk punch/zoom, notifikasi "ding" di 0,06 dan 15,65 dtk. Whoosh/riser tidak terlabel earshot (blur transisi tertutup musik); bedah lama mencatat whoosh/swell 4,6–5,6 dtk dan shimmer 10–12 kHz di "Forever?".
- Babak 2 tanpa SFX UI; hanya piano (drop/jeda di 20,1 · 21,7 · 24,8 · 27,6 · 29,0 dtk).
- Bedah lama: 12/18 event dalam ±100 ms dari visual; puncak SFX −2,7…+1,2 dB relatif VO.

### 8. Musik
- Babak 1 (0–19,4 dtk): tech house → funk dengan vocal chop, "confident and cool", −13…−14 LUFS; librosa 199 bpm (terbaca ganda) → ±99–101 bpm; earshot: tanpa grid beat tegas (pulse clarity 0,11).
- Babak 2 (19,4–38,9 dtk): ganti total ke piano elektrik solo, sedih, −27…−30 LUFS (±15 dB lebih pelan), tanpa VO. Pergantian musik = pergantian babak, tepat saat foto "her" masuk.
- Mix −14,3 LUFS, true peak +0,3 dBFS (earshot −0,2 dBTP), LRA 15,6 LU. Musik −7,2 dB di bawah VO saat bicara (bedah lama).

## Proporsi terukur (11 Nov, dari `Motion.mp4`; % terhadap frame 960×720)
Rinci: `08-mosycreate-ukuran.md`. Frame kunci: `keyframes/08-k1…k8-*.jpg`.

| Jenis adegan | Kata kunci (% tinggi) | Kata sambung | Posisi teks | Skala subjek | Kedalaman |
|---|---|---|---|---|---|
| UI post + coretan (k1) | coretan "Save it…" 16,7 × 27 % | teks caption UI ±1,5 | coretan menempel di tombol simpan, kanan-bawah (x 44–71, y 69–85) | kartu post memenuhi frame | latar abu + kartu + coretan |
| Teks + objek inline, gelap (k2) | 7,9 ("You", "lose") | sama ukuran | pita tengah y 48–56, objek di ujung kalimat | thumbnail 22 × 24 % | gradien gelap + teks |
| Hero word (k3) | **44,6** ("IN YOUR") | — | full-bleed, pusat y 50 | huruf = subjek | blur gerak, latar abu |
| Pivot hitam ber-dot (k4) | 8,5 ("But," bold) | 8,3 ("what if" regular) | pusat x 49, y 51 | ikon IG 10,6 % | halftone + teks |
| Produk/kartu UI (k5) | 5,1 ("…Reminders?") | — | teks kiri, kartu kanan | kartu 61 × 48 % | latar abu + kartu berbayang |
| Teks + notif inline (k6) | 3,75 | 3,75 | pita tengah y 46–49 | notif 10,4 × 39 % (lalu push ke 35 × 91) | 2 kartu bertumpuk |
| Foto payoff (k7) | caption 1,8 | — | kurung siku di dalam bingkai, y 93–96 | foto 96 × 68 % | foto + bingkai + tepi gelap |
| Tulisan tangan + vinyet (k8) | "Forever?" 17,5 × 23 % | "imher_" ±3,5 | kiri bawah (x 10–33, y 57–75) | — | vinyet berat + tulisan di depan |

- Rasio pernyataan emosional : kalimat UI ≈ **2 : 1** (7,9–8,5 % vs 3,75–5,1 %); hero satu kali ≈ 5,5× kalimat emosional.
- Objek inline 1,3–2,8× tinggi huruf di kalimatnya, duduk di garis tengah yang sama.

## Cek kemiripan (dipakai juri saat menyandingkan still)
- Latar UI abu rata ±`#EDEDED`, tanpa tekstur; momen kehilangan gelap→maroon, pivot hitam dengan halftone magenta.
- Kalimat di pita tengah (pusat y 46–55 %), satu ukuran per kalimat: 7,5–9 % untuk pernyataan emosional, 3,5–5 % untuk kalimat UI.
- Ada objek UI asli (thumbnail, ikon, notifikasi) di DALAM kalimat, sejajar garis tengah, 1,3–2,8× tinggi huruf.
- Tepat satu hero full-bleed ±45 % tinggi frame dan 100 % lebar; sisa teks kecil.
- Satu subjek besar per shot (kartu/ikon/foto 50–95 % tinggi), bukan banyak objek kecil; bayangan lembut, 2 lapis.
- Babak 1: hampir tiap shot punya push/pull (×1,2–1,8) atau scroll; babak 2 nyaris diam, push lambat ≤ ×1,6.
- Tulisan tangan (merah `#C41321` atau kuning `#DBCB31`) hanya di momen simpan dan payoff.
- Payoff: foto hangat berbingkai membulat dengan caption kurung siku ±1,8 %; end card teks 3,5 % di tengah layar hitam.

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
