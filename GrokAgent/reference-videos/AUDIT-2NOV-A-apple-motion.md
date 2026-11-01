# Audit 2 Nov — A: "Apple_Styele" (Holo ad) + "Motion" (IG Save Reminders concept)

Analis: subagent audit A · 2026-11-02 · semua angka diukur ulang dengan alat sendiri (ffmpeg, OpenCV optical flow, pyloudnorm, demucs htdemucs 2-stem, faster-whisper word timestamps). Kerja/bukti: `/home/claude/refaudit/A/` (contact sheet `f_*_sheet*.jpg`, strip transisi `tr_*.jpg`, debug bbox `dbg_*.jpg`, spektrogram `spec_*.png`, stem `sep/`).

> Catatan verifikasi: `VISUAL-BREAKDOWN / STYLE-SYNTHESIS / AUDIO-ANALYSIS.md` lama membahas 5 video LAIN (Krea, Spark, Renaissance, GRII, Energy) — **tidak berlaku** untuk dua video ini. Klaim lama "spring dengan overshoot" **tidak terbukti** di sini: semua gerak kamera bersih yang diukur berhenti di 100 % tanpa overshoot (max progress 1.000).

| | Apple_Styele | Motion |
|---|---|---|
| File | 1276×718, 30 fps, 44,7 s | 960×720, 30 fps, 39,0 s (letterbox hitam ±3,5 % atas/bawah di sebagian shot) |
| VO | EN, pria, 75 kata / 42 s = **1,8 kata/s** (banyak jeda) | EN, 51 kata dalam 0–20 s = **2,6 kata/s**, lalu hampir tanpa VO (hanya "Forever" 26,5 s) |
| Jumlah shot | ±21 (rata 2,1 s; 0–13 s ±1,3 s/shot) | ±15 (0–18 s ±1,2 s/shot; lalu hold 6 s + 6,5 s + end card 8 s) |
| Latar dominan | putih + blob gradien pink/oranye/biru | abu muda UI (#EDEDED), hitam untuk momen "But," dan penutup |

---

## 1. Shot list — Apple_Styele

Posisi = bbox teks % frame (x0–x1 / y0–y1). Tinggi = tinggi bbox (asc–desc) % tinggi frame. Kontras = rasio WCAG dari warna median teks vs latar.

| TC (s) | Visual | Masuk / keluar | Kamera (terukur) | Teks · posisi · tinggi · warna · kontras | Kinetic type |
|---|---|---|---|---|---|
| 0,00–0,70 | "You" raksasa | reveal dari baseline ±15 f / keluar smear vertikal (slit-scan) **3 f** | statis | "You" x27–88, y20–84, **~60 %** (hero), gradien pink→biru di putih, 3,0:1 | huruf tumbuh dari bawah (mask baseline) |
| 0,70–2,60 | "You built something" di blob gradien → pill | pill menyusut jadi garis oranye **8 f** (2,37–2,63) | zoom-out ×0,50 (ease-in-out, t50/t98 = 0,74) | x32–59, y43–56, **12 %**, putih di gradien, **2,8:1** | per kata, blur vertikal |
| 2,60–4,90 | "A business" + HP + ikon 3D | garis meledak jadi partikel piksel yang menyusun teks **10 f**; keluar piksel-dissolve **4 f** + hard cut | tilt/pan-down 31 % | x25–75, **y14–30**, 16 %, putih di gradien, 3,0:1 | dirakit partikel |
| 4,90–7,13 | "An idea" → "Worth knowing about" dikelilingi kolase foto | hard cut / keluar zoom-in + bubble blur **4 f** | pan-up 75 % (t50/t98 0,28, t90 0,86 → cubic in-out) | "An idea" x35–65, y41–54, 13 %; "Worth…" x24–72, y45–54, 9,5 %; hitam/putih **21:1** | per kata |
| 7,13–8,37 | "Now" raksasa | huruf "o" **morph jadi bola** (match-morph) **6 f** | zoom ×0,66 | x7–88, y13–70, **~57 %**, gradien, 2,9:1 | — |
| 8,37–10,43 | bola gradien + chip UI mengorbit | **hard cut** tepat di akhir riser 9,5–10,4 s | push ×1,32 | **tanpa teks** | — |
| 10,43–12,23 | "Meet" → logo "holo" | hard cut / hard cut | zoom-out ×0,61, **ease-out** (t50 0,17 s, selesai 13 f) | "Meet" x37–63, y40–57, 16 %; logo 12 %; hitam 21:1 | huruf masuk gradien lalu **disapu jadi hitam L→R ±6 f** |
| 12,23–13,00 | field "domain." | hard cut / zoom-out field menyusut **3 f** | — | x40–80, y36–64, putih di gradien, **2,7:1** | **typing + kursor, ±2,7 f/huruf** |
| 13,00–15,30 | maskot jetpack terbang | flash putih **2 f** | track maskot | **tanpa teks** | — |
| 15,30–21,50 | daftar Ads/Socials/Emails/SEO kiri + kartu UI asli kanan (IG, email, Google) | kartu swap ±6 f; keluar blur **4 f** | daftar scroll naik per item | kolom **x11–37, y20–81**, item ±9 %; aktif hitam (15:1) + titik gradien, nonaktif abu #CCC (**1,7:1**) | aktif = ganti warna, **ukuran tetap** |
| 21,50–23,60 | toggle → "Autopilot" + kolase iklan | toggle zoom-out reveal **4 f** | zoom-out ×0,74 | x30–51, y45–56, 11 %, hitam 21:1 | teks didorong masuk dari kiri |
| 23,60–26,17 | kolase menyusut ke layar monitor "All Day" → "All Night" | **match zoom-out 8 f** / kartu mengecil jadi pill **6 f** | zoom-out ×0,24, **expo-out** (t50 = 0,08·T, t90 = 0,32·T, T = 53 f) | x42–54, y46–53, 6 %, hitam di layar 19:1 | ganti kata in-place |
| 26,17–28,70 | daftar tugas bergulir ("Drafting Newsletter"…) | hard cut | scroll vertikal | **x44–100 (terpotong kanan), y1–100**, ±5 %; aktif hitam, lain abu 1,6:1 | aktif = warna |
| 28,70–30,70 | produk → grid konten | hard cut | zoom-out ×0,46 (quart/expo-out) | **tanpa teks** | — |
| 30,70–31,77 | "Generating [emoji berganti]" | hard cut / teks runtuh ke ikon **4 f** | push ×1,20 | x28–62, y45–57, 12 %, hitam 21:1 | emoji inline berganti tiap ±6 f |
| 31,77–35,23 | grid kreatif iklan bergeser | hard cut | pan kiri 87 % (cubic in-out) | **tanpa teks** | — |
| 35,23–37,70 | HP di meja (foto nyata) | hard cut ×2 | push halus | **tanpa teks** | — |
| 37,70–39,67 | "Chief [ikon] Marketing [ikon] Officer" | hard cut ×2 | zoom ×1,48 | x10–87, y46–57, 11 %, hitam 21:1 | per kata, **gradien→hitam**, ikon inline di antara kata |
| 39,67–41,27 | counter "45 693$→45 708$" + bar chart gradien | hard cut / counter jatuh keluar **6 f** | — | x14–88, y34–65, **31 %**, hitam 21:1 | digit roll, digit yang berubah berwarna gradien |
| 41,27–44,70 | "tryholo.ai" end card | — | statis | x38–63, y45–54, 9 %, hitam 21:1 | typing ±2 f/huruf, hold 3,4 s |

## 2. Shot list — Motion

| TC (s) | Visual | Masuk / keluar | Kamera | Teks · posisi · tinggi · kontras | Kinetic type |
|---|---|---|---|---|---|
| 0,00–2,07 | post IG asli (motocross) + coretan tangan "like it", "Save" | zoom-out dari foto ke post **10 f**; keluar whip scroll blur **6 f** | zoom-out ×0,76 | UI asli + coretan merah; **tanpa teks overlay** | coretan write-on |
| 2,07–2,70 | feed scroll cepat | scroll blur ke gelap **9 f** | pan vertikal besar | — | — |
| 2,70–3,75 | "And just like that…" | — / teks **diseleksi (highlight biru)** lalu smear **6 f** | ±1,2 zoom | x31–65, y47–53, **5 %**, putih di gelap-gradien, 10,9:1 | per kata ±3 f stagger, fade |
| 3,75–4,50 | "You lose [thumbnail post]" + kursor | hard cut | — | x15–55, y48–56, **8 %**; "You" putih, "lose" abu; 15:1 | thumbnail inline |
| 4,50–6,57 | "IN YOUR" → grid video → "COLLECTION" | hard cut ber-motion-blur; COLLECTION slide dari kanan + blur **6 f** | whip horizontal (−363 %) | "IN YOUR" full-bleed **x5–100, ~42 %** gradien pink 2,2:1; "COLLECTION" x23–90, 10 %, hitam extended 17,6:1 | motion-blur slide |
| 6,57–8,00 | "But," lalu "what if [ikon IG]" di latar hitam ber-dot | hard cut, **focus-blur-in 2–3 f** | zoom-out ×0,44, ease-out (t50 0,24·T, 25 f) | x27–60, y47–54, **7 %**; "But," bold, "what if" regular **ukuran sama**; 19,9:1 | blur→tajam, kata ditambah |
| 8,00–11,43 | UI "Save Reminders" → tombol bookmark → kartu Reminder | hard cut / kartu blur-out **4 f** | push ×1,27 ke ikon bookmark | "…had **Save Reminders**?" y40–53, x0–69 (kalimat bergeser keluar kiri), 7,8:1 | gradien pada "Reminders" |
| 11,43–12,20 | bookmark 3D + "And done..!" | whip keluar kiri **6 f** | — | x48–88, y45–62, hitam 17,5:1 | pop |
| 12,20–15,00 | "Instagram's gonna [notifikasi] you" → notifikasi besar | notif zoom-in blur **6 f** / blur-out **6 f** | — | x11–90, y41–51, ±4 %, 13,5:1 | **objek UI inline di antara kata** |
| 15,00–18,40 | post: reference, tutorial (UI nyata, tombol diklik kursor) | scroll | pan vertikal | caption kecil "[that reference]" | kursor klik |
| 18,40–24,50 | foto "her" hangat + caption "[that photo of her?]" | scroll masuk | push ×1,12 (diam, emosional) | caption **y75–95**, 4,2:1 | — |
| 24,50–31,00 | zoom ke kartu "Reminder time: Every day (forever)" + tulisan tangan kuning "Forever?" | — / **dissolve ke hitam ±18 f** | push ×1,47 selama 6,5 s, cubic-out (t50 0,28·T) | "Forever?" x5–40, **y60–92**, kuning; vignette | write-on tangan ±10 f |
| 31,00–39,00 | end card "MADE BY A HUMAN" | fade-out akhir **±24 f** | statis | x34–67, y48–51, **3 %**, putih 20:1; footer y85, abu 5,3:1 | fade |

## 3. Safe zone (x 15–85 %, y 20–80 %)

| Video | Di dalam zona | Pengecualian (disengaja) |
|---|---|---|
| Apple | 12/18 blok teks | Hero word "You" (x→88) & "Now" (x7–88, y13); "A business" **y14** (di atas, untuk memberi ruang HP); daftar Ads… **x11** (kolom kiri, kartu kanan); daftar tugas **x44–100, terpotong tepi** (efek scroll tak berujung); "Chief Marketing Officer" x10–87 |
| Motion | 9/14 | "IN YOUR" full-bleed (x5–100); "Save Reminders" bergeser keluar kiri; caption foto **y75–95**; "Forever?" **x5–40, y60–92**; footer end card y85 |

Pola: **kalimat pesan selalu di pita tengah y 40–60 %** (median pusat y ≈ 50 %). Yang keluar zona hanya (a) hero word full-bleed 1 kata, (b) daftar/caption sekunder, (c) elemen yang sedang bergerak keluar.

## 4. Audio (terukur; stem dipisah demucs htdemucs)

| Ukuran | Apple | Motion |
|---|---|---|
| Integrated (mix) | **−14,1 LUFS**, TP −0,8 dBTP, LRA 5,2 LU | **−14,3 LUFS**, TP **+0,1 dBTP** (mepet clip), LRA **15,6 LU** |
| Short-term 3 s | −10…−18 sepanjang video (rata) | −11…−14 (0–20 s) → −21…−32 (bagian emosional + end card) |
| VO stem (integrated) | −18,1 LUFS; momentary saat bicara median −18,6 | −14,6 LUFS; momentary median −14,7 |
| Backsound di bawah VO (momentary, persentil-30) | −21,0 → **−2,4 dB rel VO** | −21,9 → **−7,2 dB rel VO** |
| Backsound saat jeda VO | −20,1 (musik tak turun) | −29,2 (musik turun jauh) |
| Pita 1–4 kHz saat bicara: VO − musik | **+12,4 dB** | **+13,1 dB** |
| Pita <250 Hz saat bicara: musik − VO | +2,5 dB | +3,3 dB |
| Spektrum stem non-VO | 94 % energi <250 Hz (bass/kick berat) | 89 % <250 Hz |
| Tempo musik (beat tracker, kasar) | ±89 BPM (673 ms) | ±101 BPM (592 ms) |
| SFX dominan | klik/tik broadband pada cut & ganti item, riser 9,5→10,4 s berakhir tepat di cut "Meet", sparkle tonal 6–10 kHz di akhir counter (40,4–41 s) | klik UI, whoosh/swell 4,6–5,6 s (centroid 6,7 kHz di 7,76 s), shimmer 10–12 kHz di "Forever?" |
| Level SFX vs VO | puncak hit di stem non-VO −7…−11 LUFS-M = **+7…+11 dB di atas median VO** (termasuk kick musik; transien mid 1,2–2,8 kHz naik +6…+16 dB dari bed) | puncak SFX **−2,7…+1,2 dB rel VO** (SFX setara VO, tidak menutupi) |
| Sinkron SFX ↔ event visual (transien >3 kHz terdekat) | segmen 15–31 s: 9/11 event dalam ±115 ms (|median| ~40 ms); keseluruhan 9/23 dalam ±100 ms (hi-hat musik padat; baseline acak 345 ms) | **12/18 event (bagian bermusik) dalam ±100 ms, median −20 ms** (suara ≈ frame yang sama / sedikit mendahului); baseline acak 1 408 ms → jelas disengaja |
| Cut ↔ beat | tidak dikunci ke beat (1/20 dalam 1 frame) — cut mengikuti **VO**, bukan ketukan | sama (1/15) |
| Teks ↔ kata VO | teks muncul **0–500 ms sebelum** kata ("Meet" −170, "Autopilot" −300, "Chief/Marketing/Officer" −310/−400/−500 ms) | **±100 ms** dari kata (And, You lose, IN YOUR, COLLECTION, But, Save Reminders, done, Forever) |

Catatan devil's advocate: (1) demucs bisa membocorkan bass ke stem VO, jadi angka "bed rel VO" Apple (−2,4 dB) adalah loudness K-weighted yang didominasi sub-bass; secara pendengaran VO tetap jelas karena di pita 1–4 kHz VO unggul +12 dB. (2) Banyak onset sub-250 Hz di Apple adalah kick musik (jatuh di beat ±10 ms), bukan SFX desain. (3) Timestamp whisper bisa terlambat ±100–200 ms, jadi "teks mendahului VO" di Apple mungkin sedikit lebih kecil.

## 5. Apa yang bagus & mengapa

| Temuan | Mengapa berhasil |
|---|---|
| Satu pita baca di tengah (y 40–60 %) untuk semua kalimat | Mata tak perlu mencari; cut cepat tetap terbaca |
| Ukuran font **seragam dalam satu kalimat**; penekanan lewat **warna/berat** (aktif hitam vs abu 1,6:1; "But," bold vs "what if" regular) | Hierarki jelas tanpa merusak ritme baris |
| Kalimat pesan hitam di putih 21:1; teks di atas gradien hanya kata pendek, besar, ≤2 s (2,6–3,0:1) | Kontras rendah diterima hanya bila teks besar & sebentar |
| **Objek inline di antara kata** ("Chief [ikon] Marketing", "Instagram's gonna [notif] you", "You lose [post]") | Teks dan visual terhubung, bukan berdiri sendiri |
| Transisi = **morph/match** (huruf "o"→bola, kolase→layar monitor, pill→garis→partikel→teks), 3–10 frame | Tiap transisi punya alasan naratif |
| Kamera **ease-out kuat** (expo/quart: 50 % gerak selesai di 8–28 % durasi, tanpa overshoot), push lambat cubic-out 3–6 s untuk momen emosional | Gerak cepat lalu tenang = "Apple feel"; ruang baca di akhir gerak |
| UI produk **asli** (IG, Gmail, Google, kartu reminder) + kursor klik | Relatable dan kredibel |
| Shot **tanpa teks** saat visual kuat (maskot, kolase, HP di meja, foto "her") | Teks tidak berlomba dengan visual |
| Motion: fase cepat (0–18 s, 2,6 kata/s) → fase hening & musik turun −7 dB lagi (LRA 15,6) | Kontras emosi; "Forever?" mendarat di ruang sunyi |
| SFX ditempatkan di frame event (median −20 ms), setara level VO (Motion) | Terasa "menempel" pada objek, tidak mengganggu |

## 6. Aturan untuk video kita (1920×1080, 30 fps)

| # | Aturan | Angka |
|---|---|---|
| 1 | Pita teks utama | pusat y **45–55 %**, bbox di x 15–85 %; pengecualian hanya hero 1 kata full-bleed atau daftar/caption sekunder |
| 2 | Ukuran teks | kalimat: tinggi bbox **9–13 % frame** (≈100–140 px; cap ≈ 65–95 px); hero 1 kata **50–60 %**; angka/counter **≈30 %**; label/caption **3–5 %** |
| 3 | Satu kalimat = satu ukuran | penekanan via warna/berat (aktif #000 vs nonaktif ≈#CCC), bukan ukuran |
| 4 | Kontras | teks kalimat ≥ **15:1** (hitam/putih); teks di atas gradien hanya bila ≥ 9 % tinggi & tampil ≤ 2 s (min ≈ 3:1) |
| 5 | Masuk kata | per kata, stagger **3 f**; reveal 6 f (gradien→warna akhir disapu L→R) atau blur→tajam **2–3 f**; typing **2–3 f/huruf** + kursor |
| 6 | Waktu teks vs VO | onset teks **0 s/d −6 f** (≤ 200 ms) sebelum kata diucapkan; jangan setelahnya |
| 7 | Transisi | morph/match **6–10 f**; smear/whip/blur **3–6 f**; flash putih **2 f**; hard cut untuk ganti ide; dissolve hanya ke penutup (**18–24 f**) |
| 8 | Easing kamera | move cepat: easeOutExpo/Quart, 10–15 f (zoom besar ≤ 55 f), tanpa overshoot; push emosional: cubic-out 3–6 s, skala total ≤ ×1,5 |
| 9 | Tempo edit | fase hook 1,2–1,5 s/shot; jeda emosional 6 s+; end card hold ≥ 3 s |
| 10 | Mix | integrated **−14 LUFS**, TP ≤ **−1 dBTP** (Motion +0,1 terlalu mepet); VO unggul **≥ +12 dB di 1–4 kHz**; musik di bawah VO **−7 dB** (gaya Motion, lebih aman untuk aturan kita) dan boleh turun ke ≈ **−15 dB rel VO** di bagian emosional |
| 11 | SFX | onset dalam **±1 frame (≤ 33 ms)** dari event visual (referensi median −20 ms); level puncak ≈ **VO ±2 dB**; klik UI mid 1–3 kHz; low-pass whoosh ≤ 5–6 kHz (ref Motion punya whoosh centroid 6,7 kHz — jangan ditiru) |
| 12 | Riser | riser berakhir **tepat di frame cut** reveal (ref: 9,5→10,43 s ke "Meet") |
| 13 | Cut mengikuti VO | jangan memaksa cut ke beat; ganti visual pada kata kunci VO |
