---
status: principle
scope: motion
how_to_use: "Muat saat memilih gaya teks. Nama font dan ukuran Jadisatu di dalamnya bukan syarat proyek lain."
---

# Typography & kinetic text

Baca saat memilih gaya teks, ukuran, dan teknik T, atau mengatur easing. Nomor § sama dengan motion-director v3 agar rujukan lama tetap berlaku.

## Isi

- 7. Tipografi — diperlakukan seperti design system website
- 7.1 Peran font (maksimal 2 keluarga + 1 mono per proyek)
- 7.2 Skala & hierarki
- 7.3 Kapital, warna, tata letak
- 7.4 Kebijakan teks 3D
- 7.5 Gaya teks (TYPE-TEST)
- 8. Library teks kinetik (frame @30 fps; satu konsep satu kode)
- 11. Easing, pegas, timing

## 7. Tipografi — diperlakukan seperti design system website

### 7.1 Peran font (maksimal 2 keluarga + 1 mono per proyek)
| Peran | Fungsi | Pilihan (Jadisatu) | Ukuran @1080 |
|---|---|---|---|
| Display/Kunci | Kata kunci, slam | Inter Black 900 (atau Neue Haas Grotesk Display 95 di Adobe Fonts) | 200–320 px |
| Headline | Kata utama | Inter ExtraBold 800 / NHG 65 | 110–170 px |
| Sambung/Body | Pengantar, penjelas | Inter Medium 500 / NHG 45 | 56–80 px |
| Aksen | Satu kata emosional | Instrument Serif Italic, 1,5–2× headline, baseline sejajar | — |
| Data | Angka, kode | Silkscreen (dunia pixel) / JetBrains Mono (UI) | 60–140 px |
| Label | Kategori, callout | JetBrains Mono / Inter SemiBold | 36–48 px |

Pairing display + aksen harus kontras keluarga (sans tebal vs serif italic). Verifikasi PostScript name sebelum build.

### 7.2 Skala & hierarki
- Level (relatif tinggi H): XS 1,5–2,5 %, S 3–5 %, M 7–10 %, L 14–20 %, XL 35–80 % (boleh bleed).
- Dalam satu layar maksimal 2 level yang lompat ≥ 2 tingkat (S+L, M+XL). M+M dilarang.
- Dalam setiap 5 detik minimal 2 level skala yang sangat berbeda.
- Kata terpenting masuk **terakhir dan berbeda**.

### 7.3 Kapital, warna, tata letak
- **Sentence case** untuk narasi.
  - KAPITAL hanya untuk kata vonis/klaim satu-dua kata (slam) dan label kategori mono (+100…+200 tracking).
  - Tidak ada paragraf kapital.
  - Satu proyek memakai satu kebiasaan tanda baca, misalnya titik di akhir frase pendek.
- Warna:
  - teks dasar putih hangat `#FAF8EC` di gelap, navy `#0F172A` di terang
  - **satu kata aksen per frase** (coral `#F97066` di gelap / biru `#2563EB` di terang)
  - warna data biru
- **Dilarang:**
  - blok warna solid / stabilo di belakang kata
  - scrim, bayangan gelap, atau blur di belakang teks
  - outline, glow, neon menetap
  - glitch pengacak huruf
  - teks bertumpuk/menabrak teks atau objek
  - pergantian font di tengah satu kata/adegan
- Keterbacaan diselesaikan dengan komposisi: pindah ke ruang kosong, geser kamera, atau redupkan latar.
- Ruang kosong adalah kemewahan, jangan diisi dekorasi.
- Whitespace merata. Teks dan visual tidak berebut.
- Body maksimal 2 baris, patah di jeda makna.
- Pola posisi teks sesuai objek pembicaraan:
  - di belakang tokoh (sampul majalah, dipotong siluet)
  - tengah melebar + latar diredupkan (puncak)
  - tengah bawah satu baris (emosi)
  - tengah atas kecil (pengantar)
  - menempel objek (diegetik)
  - ruang negatif samping subjek (hanya bila subjek tunggal dan teks satu-satunya bacaan)
- Teks tidak menutupi wajah atau subjek. Objek boleh menutup ≤ 10 % huruf, tidak menutup huruf pertama, dan tidak menutup apa pun selama jeda baca.
- **Tidak ada subtitle statis.** Teks kinetik itulah caption-nya. Kata muncul +1…+4 f setelah onset kata VO.

### 7.4 Kebijakan teks 3D
- Default: **tipografi 2.5D**. Kata, huruf, dan baris adalah bidang di ruang perspektif yang berotasi X/Y/Z, berlapis kedalaman, ikut kamera, dan tajam.
  - Di AE: animator teks 3D per karakter (`Enable Per-character 3D`) + kamera AE.
- Teks **bervolume (extruded)** hanya untuk maksimal 1–2 kata hero per video, dan hanya bila eksekusinya setara referensi:
  - bevel halus, material dan cahaya yang matang, bayangan kontak
  - divalidasi berdampingan dengan frame referensi di TYPE-TEST

  Ekstrusi gelap polos tanpa cahaya terlihat "kurang matang" dan menurunkan kualitas (revisi 18 Okt, "Jadisatu" dan "COBA").
- Teks yang "tidur di lantai lalu diangkat" bukan 3D yang dimaksud.

### 7.5 Gaya teks (TYPE-TEST)
| Kode | Gaya | Spesifikasi |
|---|---|---|
| G1 | Slam | Display, L–XL, tracking −20, satu baris; masuk T03 + C14 shake; keluar T15/T14 |
| G2 | Headline | Headline M, maksimal 2 baris; hampir selalu berpasangan dengan G3 di kata kuncinya |
| G3 | Aksen serif | Instrument Serif Italic, satu kata per kalimat, masuk terakhir |
| G4 | Color flash (acuan Baikov "What makes your company unique?") | Kata masuk dengan ISI huruf warna aksen + motion blur geraknya sendiri, tahan ±6 f, settle ke warna dasar 2–3 f; keluar kebalikannya. Tanpa stroke, glow, atau bayangan. SFX: satu pop kecil per kata |
| G5 | Berperspektif | Layer 3D menempel bidang ruang (rotasi X 55–70° sesuai bidang); blur hanya dari gerak/DoF kamera |
| G6 | Dalam adegan | Di antara latar dan objek depan (satu ruang) |
| G7 | Label/pil | Inter SemiBold XS–S, pil rounded; tidak pernah jadi fokus kedua sejajar headline |

---

## 8. Library teks kinetik (frame @30 fps; satu konsep satu kode)

Peran teks dibedakan lewat GERAK. Peran yang sama selalu bergerak dengan cara yang sama di seluruh video.
- **R1 narasi** = T01/T19
- **R2 kata kunci** = T03/T20
- **R3 klaim** = T03 + shake
- **R4 label** = T23/T10
- **R5 UI diketik** = T11
- **R6 kata pahlawan** = T04/C05, maksimal 2× per video

| Kode | Nama | Cara kerja & angka | Build AE |
|---|---|---|---|
| T01 | Word rise | Per kata naik 24–40 px dari balik mask garis dasar, 10–14 f, stagger 2–3 f (±1 f variasi), pegas tanpa overshoot. Huruf mulai ≥ 140 % tingginya di bawah mask supaya tidak mengintip | Text Animator Position Y + Opacity, Range Based On Words, Ramp Up, Offset −100→100 |
| T02 | Blur-to-focus | 12→0 px dalam 3 f, kata pertama frase reflektif; maksimal 1 per 15 dtk | + properti Blur |
| T03 | Slam | f1 2.0× + rotasi Y ±15° → f2 1.3× → f3 1.0×, motion blur, impact −1…−2 f; maksimal 1 per frase | Scale + Rotation Y, Motion Blur |
| T04 | Scale-down settle | Kata raksasa 300 %→100 % dalam 8–10 f, ease out kuat | Scale |
| T05 | Marquee select & fill | Kotak dashed (Trim Paths 8 f) → fill 4 f → klik | Shape + Trim Paths |
| T06 | Cursor activate | Kursor melengkung, melambat, klik 100→85→100 (4 f) + ripple 10 f | Path + ripple |
| T07 | Slot swap | Kata di posisi tetap berganti: lama keluar ke atas, baru dari bawah, 3–4 f, hold 10–15 f, makin cepat. Berurutan: yang lama ≥ 95 % hilang sebelum yang baru mendarat | Layer per varian + mask |
| T08 | Inline icon | Ikon 0,9–1,3× cap-height di antara kata, pop 0→110→100 + rotasi −12→0 (10 f), boleh shuffle tiap 2 f selama 8–12 f | Scale/Rotation |
| T09 | Sticker drop | Label jatuh, bounce kecil, miring ±3–8°, stagger 3–5 f | Bounce expression |
| T10 | Card stack | Kartu kata jatuh bertumpuk Y −60, rotasi ±5°, 8 f per kartu | Layer + drop shadow lembut |
| T11 | Typewriter UI | 1–2 karakter/f + caret; **hanya di UI/prompt**, tidak pernah headline naratif; satu bunyi ketik per kata atau per tombol | Source Text expression |
| T12 | Big type typing | Cut ke close-up raksasa teks yang sedang diketik, kamera ikut caret, 1–1,5 dtk | Duplikat layer, scale 600–1000 % |
| T13 | Tracking converge | 2 kata berjarak ±40 % lebar merapat, 15 f ease-out (bukan spread untuk makna "jauh") | Tracking |
| T14 | Letter scatter | Huruf lepas dan jatuh dengan rotasi dan gravitasi, 12–20 f (bukan acakan glitch) | Per-character Position/Rotation |
| T15 | Smear exit | Scale X 100→160 + directional blur, 4–6 f | Directional Blur |
| T16 | Counter | Roll ease-out expo 12–27 f, boleh lewat target +15–20 % lalu settle; bunyi tick roll + lock | Slider + `Math.round` |
| T17 | Text on arc | Kalimat mengikuti busur shape | Path Options |
| T18 | Teks di silinder | Daftar pada roda melengkung, step-rotate 15–25 f, item aktif ganti warna | 3D per-char + rotasi X |
| T19 | Word-pop ikut VO | Kata muncul +1…+4 f setelah onset kata VO; 3–4 f: scale 0.85→1 + naik ½ cap-height | Marker dari timestamp VO |
| T20 | Color flash/settle | = G4; travel ±110 px + motion blur, flash 2–4 f, settle ±8 f | Fill Color animator |
| T21 | Decode data | Digit mono/pixel biru → glitch 1–2 f → kata, ±5 f (hanya kata teknis/angka) | Source Text |
| T22 | World-locked | Teks sebagai objek di ruang kamera (push/pull/fly-through). Saat dolly-in, batasi skala teks ≤ 1,06× supaya tidak menabrak tokoh | Layer 3D + kamera |
| T23 | Diegetik | Label/callout menempel objek dengan garis tipis, mono 36–48 px | Parent ke objek |
| T24 | Anchor word | Satu kata besar tetap, latar berganti tiap 14–22 f | — |
| T25 | Chaotic | Frase bergetar 2–4 px 8 Hz, bertumpuk 2–3 lapis, maksimal 1,5 dtk (frustrasi) | Wiggle |
| T26 | Distorsi bersama transisi | Mosaik/pixelate menyatu dengan transisi blok, 5–6 f | Mosaic |
| T27 | Huruf naik dari objek | Huruf naik dari bar/objek dengan tinggi acak lalu terkunci, ±20 f | Per-char Position |
| T28 | **Flip-up X** | Per kata/huruf rotasi X 90°→0 dari garis dasar (pivot baseline), stagger 2–3 f, 8–12 f, expo-out tanpa overshoot | Per-char 3D, Rotation X, Range Based On Words/Characters |
| T29 | **Swing Y** | Rotasi Y ±60–75°→0 dari tepi kiri, 10–14 f | Rotation Y, anchor kiri |
| T30 | **Spin Z + scale** | Rotasi Z ±20–45° + scale 0.6→1, 8–10 f, untuk kata hero | Rotation Z |
| T31 | **Depth push** | Datang dari Z jauh ke bidang fokus, layer berbeda kedalaman bergerak paralaks dengan kamera | Position Z + kamera |
| T32 | **Word swap 3D** | Kata lama flip menjauh di X, kata baru flip masuk (carousel 3D) | Dua layer, Rotation X |

Aturan pemakaian:
- 4–6 teknik berbeda per 15 dtk; teknik sama maksimal 2× berturut.
- Masuk lebih lambat dari keluar (masuk 8–14 f, keluar 4–8 f).
- Teks keluar bersama transisi shot (2–6 f) atau lewat mask 4–6 f, tidak fade.
- Opacity saja tidak dihitung animasi. Opacity hanya menemani gerak, kecuali eyebrow/sub-line kecil yang boleh fade.
- Pada adegan tenang, fade 2D elegan boleh untuk kalimat serius (contoh: "Hasilnya harus terbukti.").

---

## 11. Easing, pegas, timing

| Karakter | Influence out (key awal) | Influence in (key akhir) | Kapan |
|---|---|---|---|
| Snappy out (paling sering) | 10–15 % | 85–95 % | teks masuk, kamera mendarat, panel |
| Smooth in-out | 50–66 % | 50–66 % | drift, gradasi |
| Accelerate | 70–85 % | 5–10 % | exit, zoom-through, jatuh |
| Overshoot | snappy + inertia | | pop ikon/pill |

- Padanan web/engine: masuk `cubic-bezier(0.16,1,0.3,1)`, keluar `cubic-bezier(0.7,0,0.84,0)`.
- Pegas closed-form (respons, rasio redaman), fungsi murni waktu:
  - snappy 0.22/0.8 (pill, tombol)
  - default 0.4/0.86 (kartu, panel, kamera)
  - heavy 0.5/1.0, tanpa overshoot (teks besar, logo)
  - playful 0.5/0.45 (maskot saja)
- **Overshoot ≤ 1,05** pada UI. Tidak ada overshoot pada teks besar. Settle 6–10 f, tidak berhenti mendadak.
- Satu keluarga easing per video. Tidak ada linear kecuali drift/rotasi loop.
- Ritme:
  - satu event baru tiap 12–24 f; sesuatu yang baru tiap 2–4 dtk
  - hold teks = 0,25 dtk + 0,3 dtk/kata (0,8–2,5 dtk)
  - stagger 2–4 f dengan variasi ±1 f
- **Puncak visual memimpin ketukan** supaya terbaca tepat di beat. Bunyi tetap di grid; apex gerak, bukan awal adegan, yang menabrak beat.
- Swap berurutan: yang lama keluar penuh sebelum yang baru mendarat.
