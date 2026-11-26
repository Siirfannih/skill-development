# AUDIT 2 Nov — B: Kinetic typography (3 referensi)

Analis: Claude (subagen audit referensi) · 2026-11-02 · alat: ffmpeg (scene, ebur128), python numpy/PIL/opencv, librosa, pyloudnorm, faster-whisper (base) · kerja & data mentah: `/home/claude/refaudit/B/` (frame 4/6 fps, contact sheet `s*.jpg`, strip full-fps `st_*.jpg`, `asr.json`, `aud_*.json`, `vis_*.json`).

| Kode | File | Ukuran | Durasi | Isi |
|---|---|---|---|---|
| **G** | `_ganimate__DfICqhOvP-0.mp4` | 1280×720, 23.976 fps | 14.4 s | Showreel **grid 2×2** (tiap sel 640×360 = video sendiri) di atas satu VO kutipan (Jobs/Musk dll., tentang energi). |
| **K** | `baikov0943_ssspin.io…mp4` | 736×414, 30 fps | 67.2 s | Launch **Krea 2** — teks hitam di putih + kolase gambar + VO. (= "V1" di analisis lama.) |
| **I** | `life.at.island_…mp4` | 1276×720, 24 fps | 21.1 s | Pengumuman pendanaan **Island** ($400M Series F) — tanpa VO, musik + SFX. |

Catatan metode: % posisi = % lebar/tinggi frame (untuk G = % sel 640×360 kecuali disebut lain). "Tinggi huruf" = tinggi bbox baris (kapital + descender bila ada); tinggi kapital ≈ 0.75–0.8× angka itu bila ada descender.

---

## 1. Shot list

### K — Krea 2 (67 s)
| TC | Visual | Transisi (frame) | Kamera | Teks (bbox x / y, tinggi baris) |
|---|---|---|---|---|
| 0.0–1.4 | Kolase foto mengambang, keluar ke atas | — | statis, kartu bergerak sendiri | — |
| 1.5–2.2 | Ketik "This is" | ketik per huruf ~3–4 f/huruf | statis | x 43–57 %, y 46–50 %, **4.4 %** |
| 2.27 | **Punch-in**: potong 1 frame ke skala ±4.7× di tengah pengetikan | hard cut 1 f | lateral **mengikuti kursor** (teks terpotong di kiri, x=0) | "This is Kr…" 20.6 % |
| 2.7–3.9 | "This is" meredup ke abu ±25 % (3 f), "Krea 2" tetap hitam | fade 3 f | settle | "Krea 2" x 27–73 %, y 39–60 %, **20.6 %** |
| 4.0–5.3 | "An image model" → "made for" | kata ditambah, baris di-recenter instan | statis | x 30–70 %, y 46–54 %, 8.3 % |
| 5.4–7.4 | "made for aesthetics" putih di atas montase gambar | **hard cut tiap 0.13–0.23 s (4–7 f)** | statis | y 49 %, CR 2.9–5.4 (lemah di gambar terang) |
| 7.5–10.6 | "Create" → "Create in any style" → "A horse" | append per kata (0.25 s), recenter | statis | x 29–73 %, 8.3 %; "A horse" 6.1 % |
| 10.7–16 | Siluet kuda hitam → gaya berganti (clay/2D/anime/3D), strip thumbnail di bawah | match-cut siluet | statis | — |
| 16–20.5 | "Show it a moodboard" + gambar terbang masuk dari tepi | — | statis | tengah |
| 20.7–23.9 | "It gets it" → "It gets you" (ganti 1 kata) → ikon | swap kata | statis | x 42–58 %, 5.3 % |
| 24–31 | Gambar mengorbit bola di tengah (3D) | — | orbit | — |
| 31.2–32.4 | "The more you use it" kecil + **di-select (highlight biru)** | — | statis | x 34–64 %, 5.3 % |
| 32.5–34.6 | Punch-in ketik besar "The better it gets\|" dengan kursor | hard cut + ketik 3 f/huruf | lateral mengikuti kursor | **31 %** (kapital ±24 %), x 0–67 % |
| 34.7–41 | Cutout pria jas, flip kartu, kolase | cut/flip | — | — |
| 41–42 | "With unique controls" | append | statis | x 24–72 %, 8.2 % |
| 42.25–51 | UI: gambar + label slider kiri (Creativity/Randomness/Style strength) + dial radial | gambar morph per slider | statis | label x 5–16 % (pengecualian safe zone) |
| 51–62 | **Z pull-out** ke galaksi ribuan thumbnail → menyusut ke titik | — | dolly-out ease-in-out ±11 s | — |
| 62.5–67 | Logo → "krea.ai/k2" | fade | statis | x 42–57 %, 4.6 % |

### I — Island (21 s)
| TC | Visual | Transisi | Kamera | Teks |
|---|---|---|---|---|
| 0.0–0.9 | Counter **$396M→$399M** raksasa abu gelap di off-white, logo atas-tengah | step angka tiap 6 f | statis | bleed: x 8–96 %, y 54–94 %, **±40 %** (sengaja terpotong) |
| 0.92–3.0 | Hard cut ke **$400M kecil** + label "Announcing"; strip foto (blinds) membuka atas-bawah | hard cut; "M" hijau sesaat | statis | x 30–70 %, y 43–64 %, **20.8 %** (glyph $) |
| 3.2–4.9 | "Series F" **echo stack** 5 salinan + garis; pita foto menyapu baris tengah (teks putih di pita) | cut, wipe horizontal | statis | x 4–96 % |
| 4.92–5.9 | "$6.4B" **dot-matrix → solid** (~12 f) + label "Island valuation" | cut | pan kiri, teks bleed kiri (x 2.7 %) | — |
| 5.9–7.5 | Latar gelap #04150F, "$6.4B valuation" — "$6.4B" hijau → putih | cut, color flash | statis | x 29–71 %, y 41–56 %, 10 %; CR 18.9 |
| 7.58–8.9 | Close-up "The *future* of" diketik per huruf (~2.6 f/huruf), "future" **serif italic** | cut | close-up | — |
| 8.96–9.8 | Wide: "The *future* of / work is on Island" putih di langit foto | cut ke wide | wide | x 32–66 %, y 41–59 %, kapital ±6.5 %; **CR 2.3** |
| 9.8–15.7 | Pan kiri: daftar counter "16/12/10/9/8 of the largest …" — kartu hijau menyorot item aktif, angka hitung mundur | pan ease-out ±0.5 s | lateral | kolom x 2–30 % (di luar safe zone, informasi sekunder) |
| 15.75–16.2 | **Close-up blur** "the *agentic* control / for enterprises" — rack-focus berjalan per kata (11 f) | cut | pan close-up | — |
| 16.25–18.4 | Cut ke wide: 2 baris tengah | **break ke wide** | statis | x 21–79 %, y 36–61 %, 9.2 %/8.3 %; hijau CR 7.3, putih 18.9 |
| 18.5–21 | Logo glow hijau → putih, hold 2.5 s | — | statis | x 37–62 %, 10.4 % |

### G — ganimate grid 2×2 (14 s)
| Sel | TC | Visual | Teks & cara masuk |
|---|---|---|---|
| TL (kiri-atas) | 0–2.5 | Hitam, "Graphic / tools" 2 baris **bertangga** (baris 2 menjorok kanan), lalu "AI + ikon tool" (oranye) disisipkan | "Graphic" blur→tajam 3 f; "tools" naik dari mask ±4 f; "AI" naik 3 f. Tinggi baris ±26 % sel, x 6–96 %, y 23–73 % sel |
| TL | 2.5–14 | Footage + kata VO ("energy", "The future", "of currency") | putih di hitam, CR >15 |
| TR | 0–14 | Interview Jobs → hitam "By People" → **video wall** "no smarter" → "you need", "Wattage", "Nuclear" | teks kecil ±7 % sel, tengah; CR 14–20; **sinkron VO**: "By" +80 ms, "People" ±0 |
| BL | 0–5 | Dock macOS (ikon asli WhatsApp/Notion/Meet/Drive/Calendar), jendela app nyata | UI asli, bukan generik |
| BL | 5.3–7 | "Which AI **Source**" — teks besar (±31 % sel) **pan horizontal kontinu ke kiri** (terpotong kiri); "Source" muncul lewat **kotak kuning dither/pixel reveal ±8 f** | ukuran seragam; emphasis = kotak |
| BL/BR | 6–14 | Isometrik gedung + label teal (Schools/Universities/Hotels), peta US, bar chart | label kotak teal + teks putih, muncul bersama objek, kamera diagonal drift |

---

## 2. Tipografi kinetik — temuan lintas video

| Aspek | K (Krea) | I (Island) | G (ganimate) |
|---|---|---|---|
| Font | Grotesk netral (SF/Inter-like), 1 bobot medium | Grotesk + **serif italic** untuk 1 kata emphasis | Grotesk; emphasis = kotak warna |
| Ukuran dalam 1 kalimat | **Seragam**. Beda skala hanya lewat *punch-in kamera* (kecil 4.4 % → besar 20–31 %), bukan font beda ukuran | **Seragam**; emphasis lewat italic + hijau | **Seragam**; emphasis lewat kotak kuning/teal |
| Tingkat ukuran | 2 tier kecil (≈4.5 % & ≈6.5 % kapital) + tier hero 20–24 % | body ±6.5–7 % kapital, hero angka 15–40 % | sel: 7 % (caption) / 26–31 % (hero) |
| Kapitalisasi | Sentence case, hanya kata pertama + brand ("Create in any style", "Show it a moodboard") | Sentence case ("The future of work is on Island") | Ikuti VO: fragmen tengah kalimat **huruf kecil** ("no smarter", "you need", "than you"); kapital hanya awal kalimat/kata tunggal ("Wattage", "Nuclear") |
| Tanda baca | Tidak ada | Tidak ada | Tidak ada |
| Cara masuk | Ketik per huruf 3–4 f/huruf (8–10 huruf/s) atau append per kata + recenter instan | Ketik per huruf ~2.6 f; dot-matrix resolve 12 f; rack-focus blur 11 f | Blur→tajam 3 f; naik dari mask 3–4 f; dither reveal 8 f |
| Menyusun baris | Satu baris, re-center tiap kata baru; kata lama **diredupkan** saat kata kunci tiba | 2 baris tengah, rata tengah | 2 baris bertangga (baris 2 menjorok) |
| Warna/kontras | Hitam #1D1D1D di putih (CR ±16); putih di foto CR 2.9–5.4 | Gelap di off-white CR 11.6; putih di #04150F CR 18.9; hijau aksen CR 7.3; **putih di langit CR 2.3** (lemah) | Putih di hitam CR 14–20; hitam di putih CR 20.9 |
| Saat tanpa teks | Saat visual sudah bicara: kuda berganti gaya, orbit, galaksi (±45 % durasi) | Hampir selalu ada teks (iklan angka) | Sel UI/isometrik tanpa teks besar |

## 3. Safe zone (x 15–85 %, y 20–80 %)

| Video | Di dalam | Pengecualian (disengaja) |
|---|---|---|
| K | Semua kalimat kecil: x 23–77 %, y 45–55 % | Hero punch-in mengetik (x mulai 0 %, kamera ikut kursor, lalu settle ke 27–73 %); label UI slider x 5–16 % |
| I | Semua pernyataan final + logo: x 21–79 %, y 36–61 % | Counter raksasa & "$6.4B" bleed ke tepi (dibaca sebagai tekstur/angka besar, bukan kalimat); kolom daftar x 2–30 % |
| G | Caption kecil di tengah sel | Hero "Which AI" bleed kiri saat pan; "Graphic/tools" memakai 6–96 % lebar sel |

Pola: **kalimat yang harus dibaca selalu di dalam safe zone dan di tengah**; yang keluar zona hanya angka/kata hero yang sedang bergerak (ketik/pan) dan akhirnya mendarat di dalam.

## 4. Audio (diukur)

| Metrik | G | K | I |
|---|---|---|---|
| LUFS integrated | **−14.0** | **−14.0** | **−14.1** |
| True peak | −1.9 dBTP | **+3.1 dBTP** (clip setelah transcode) | −2.9 dBTP |
| LRA / short-term 3 s min–max | 2.0 LU / −15.5…−12.9 | 7.4 LU / −35.4…−9.9 | 7.7 LU / −32.6…−12.4 |
| VO | ya, kontinu (14 s) | ya, 2.6 kata/s, jeda antar-kalimat 0.5–1.3 s | **tidak ada** |
| Backsound relatif VO (saat VO) | ≈ **−7 dB** (hanya 4 jeda, kepercayaan rendah) | ≈ **−9 dB** (jeda: −5…−14 dB) | — |
| Musik saat VO berhenti | — | naik ke ≈ level VO: 34–41 s **−1 dB**, 49.5–52.6 s **+4 dB** rel. puncak VO (un-duck ±8–10 dB) | musik −11.9 LUFS(50 ms) median |
| Energi spektrum (power) <250 / 250–2k / 2–6k / >6k | 46 / 51 / **2.2** / 0.6 % | 75 / 23 / **1.0** / 0.5 % | 90 / 8 / **1.7** / 0.2 % |

### SFX teridentifikasi
| Video | t (s) | Event visual | Δ onset vs visual | Band (energi naik 120 ms) | Level |
|---|---|---|---|---|---|
| K | 2.18 | punch-in "Krea" | −17 ms | >6 kHz 46 % (klik udara) | — |
| K | 32.53–32.79 | punch-in ketik besar "The better" | −136…+38 ms | 250–2k 76–80 % → sub 93 % (cen 940→138 Hz): "thock" + badan rendah | +3 dB di atas puncak VO, naik 21–34 dB dari hening |
| K | 42.45–42.76 | UI controls + gambar muncul | +46 / −58 ms | <250 Hz 98–100 % (cen 69–80 Hz) | +5…+6 dB rel. puncak VO |
| I | 3.62 | cut ke "Series F" | −3 ms | 2–6 kHz 53 % (cen 2.3 kHz) tick | ≈ level musik (0…+2 dB) |
| I | 7.30 / 7.58 / 8.94 / 11.12 | cut/color-flash/zoom | +11 / −2 / −18 / −45 ms | <250 Hz 97–99 % (cen 63–117 Hz) sub thump | **+5…+8.5 dB** di atas median musik |
| G | 6.30 | transisi ke chip | −36 ms | 2–6k 51 %, >6k 23 % (air/whoosh tipis) | ≈ −1 dB rel. VO |
| G | 11.06–11.18 | cut "Nuclear" | +11 / −40 ms | <250 Hz 91–93 % | +3 dB rel. puncak VO |

Sinkron agregat (semua onset kuat p75, termasuk ketukan musik & VO): dalam ±84 ms dari event visual → K 55 %, G-TR 56 %, I 47 %. **SFX yang benar-benar SFX semuanya dalam ±60 ms** (kebanyakan ±20 ms); onset yang meleset 300–1000 ms adalah kick musik/suku kata VO.

---

## 5. Verifikasi analisis lama (VISUAL-BREAKDOWN / STYLE-SYNTHESIS / AUDIO-ANALYSIS)

| Klaim lama | Status |
|---|---|
| Hanya V1 (Krea) = file K; VO G = VO "V5 Energy & The Sun" (versi 22 s); Island tidak dibahas sama sekali | Cakupan berbeda — jangan pakai file lama untuk G/I |
| Krea LUFS −14.08, VO 2.61 kata/s | ✔ (saya −14.0) |
| Krea 0:00–0:07 "hard cuts ~0.5 s" | ✘ — pembuka = kolase mengambang keluar ke atas lalu ketik teks; hard cut cepat hanya 5.4–7.5 s, interval **0.13–0.23 s** |
| "Pop and drift 0→100 % 3–4 f lalu 100→105 %" | ✘ untuk teks Krea/Island — teks diketik/append, tanpa drift skala; pop 3 f hanya terlihat di G |
| "1–3 kata per layar" | Sebagian ✘ — K/I menampilkan kalimat utuh 3–6 kata satu baris (dibangun per kata) |
| Sinkron cut↔audio "82 % dalam ±80 ms" | ✘ untuk Krea: tabel lama sendiri 53 %; saya 55 %. Rata-rata 82 % menyesatkan |
| "harsh 2–6k ≤ 0.30" | Metrik beda; dengan power spektrum ketiga referensi hanya **1–2.2 %** di 2–6 kHz |

---

## 6. Apa yang bagus & mengapa

1. **Satu ukuran per kalimat, skala lewat kamera.** Kalimat tidak pernah campur ukuran font; dramatisasi dengan *punch-in* 1 frame (×4–5) ke tengah pengetikan → terasa "kamera mendekat", hierarki tetap bersih.
2. **Emphasis tanpa ukuran:** redupkan kata lama ke ±25 % abu (K), ganti gaya ke serif italic + hijau (I), kotak warna (G). Mata langsung ke kata kunci, ritme tipografi tetap rapi.
3. **Close-up → break ke wide** (I 7.6→8.96, 15.75→16.25): kata kunci diperlihatkan besar/blur dulu, lalu cut ke kalimat lengkap kecil di tengah — sama dengan aturan kamera Irfan.
4. **Teks mengikuti VO hampir frame-akurat** (G: "By" +80 ms, "People" 0 ms; K: "Krea" punch-in tepat saat kata diucapkan).
5. **Kalimat yang dibaca selalu di tengah safe zone**; bleed hanya untuk angka/kata hero yang sedang bergerak.
6. **SFX hemat & rendah:** hanya di punch-in, cut besar, objek UI muncul; mayoritas sub <250 Hz; tick 2–6 kHz pelan (≈ level musik). Total energi 2–6 kHz 1–2 % → tidak melelahkan telinga.
7. **Ducking jelas:** musik ±9 dB di bawah VO saat bicara, naik ke level VO saat jeda visual panjang (K 34–41 s).
8. **Tanpa teks saat visual kuat** (K: kuda berganti gaya, orbit, galaksi) — teks kembali hanya saat ide baru.

Yang **tidak** ditiru: teks putih di foto terang/langit (CR 2.3–2.9 di K 6.2 s & I 9.2 s) — melanggar aturan kontras tinggi Irfan; true peak +3.1 dBTP di K.

## 7. Aturan yang bisa diterapkan (Remotion 1920×1080)

| # | Aturan | Angka |
|---|---|---|
| 1 | Satu kalimat = satu ukuran font, satu baris | Tier: caption kapital 4.5 % H (≈49 px), body 6.5 % H (≈70 px), hero 20–24 % H (≈216–260 px) |
| 2 | Hero via punch-in kamera, bukan font lebih besar | Cut 1 frame, skala ×4–5, kamera ikut kursor/kata aktif lalu settle di tengah |
| 3 | Kata masuk | Ketik 3–4 f/huruf (30 fps) **atau** append per kata tiap 6–8 f dengan recenter instan; pop blur→tajam 3 f; reveal mask naik 3–4 f |
| 4 | Emphasis | Kata lama → opacity 25 % dalam 3 f, **atau** ganti ke italic serif + warna aksen, **atau** kotak highlight (reveal 6–8 f) |
| 5 | Kapitalisasi | Sentence case; fragmen tengah kalimat tetap huruf kecil; tanpa tanda baca |
| 6 | Safe zone | Kalimat dibaca: x 20–80 %, y 36–64 %; bleed hanya untuk angka/hero yang bergerak dan harus mendarat di dalam zona |
| 7 | Kontras | ≥ 7:1 untuk teks (target 15:1 hitam-putih/putih di #04150F); jangan putih di foto terang (CR <4.5) — tambah scrim/gelapkan plate |
| 8 | Close-up→wide | Close-up blur/rack-focus 10–12 f per kata kunci, lalu hard cut ke wide kalimat lengkap |
| 9 | Montase cepat | Cut 4–7 f (0.13–0.23 s) hanya di blok "eksplosif" ≤2 s, teks tetap diam di tengah |
| 10 | Loudness | −14 LUFS integrated, true peak ≤ −1 dBTP |
| 11 | Backsound | −9 dB (±2) di bawah VO saat bicara; naik ke −1…+4 dB rel. VO pada jeda visual >1.5 s |
| 12 | SFX | Onset ±20 ms (maks ±60 ms) dari frame objek/cut; impact sub (cen 60–120 Hz) +3…+8 dB di atas bed/VO; tick UI 2–6 kHz ≈ level bed (0…+2 dB); total energi 2–6 kHz mix ≤ 3 % |
| 13 | Tanpa teks | Biarkan ±30–45 % durasi tanpa teks saat visual sudah menjelaskan |
