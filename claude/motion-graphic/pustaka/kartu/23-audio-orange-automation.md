# 23 · Audio "Orange Automation" (promo Zapier)

> **Status: standar kualitas Irfan.** Video ini target yang harus dicapai, bukan contoh opsional.
> Sumber: `Audio.mp4` (folder asal: Motion) · 16:9 (1280×720), 24 fps, 23,4 dtk · analisis asal: canvas-skill-library, reference_id LOC-37e054f734e9 · Frame: `../../guide/referensi/sheets/23-audio-orange-automation.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/23-k*.jpg` · Bedah lengkap: `canvas-skill-library: skills/canvas-reference-director/references/cards.json (reference_id LOC-37e054f734e9)`; data ukur 11 Nov: `ukuran.md`
> Video yang sama dengan kartu 53 (`53-zapier.md`, audit audio GrokAgent `AUDIT-2NOV-C-audio.md`). Angka audio di sini diukur ulang dan cocok (−17,8 LUFS, LRA 8,7, TP +2,0).
> Kedalaman bedah: **dalam** (frame tiap 0,5 dtk, ukur piksel per jenis adegan, earshot `--detail high`, librosa). Batas: sumber 720p lossy; tanpa VO, jadi relasi teks–ucapan tidak ada.

**DNA (satu kalimat):** Spot produk tanpa narasi yang bergerak dari krem-berpendar-oranye ke oranye penuh, dibawa grotesk netral dalam dua skala ekstrem (kalimat ±5 % dan kata raksasa yang terpotong frame), dan setiap kejadian layar punya bunyinya sendiri di atas bed glockenspiel yang tak pernah putus.
**Cocok untuk:** promo produk/fitur tanpa VO, penjelasan otomasi/integrasi (hub dan cabang), acuan mix musik + SFX · **Tidak cocok untuk:** talking head, prosedur linear rinci, konten emosional/naratif panjang
**Kata kunci gaya:** oranye, krem, bersih, sigap, tanpa VO, SFX berlapis
**Diambil untuk:** `Audio.mp4`: "Audio" → musik dan SFX (bagian 7 dan 8, dibedah paling dalam); visual dan teks diukur sebagai pendukung.

## PENGIKAT (diambil utuh dari SATU kiblat; ini yang membuat video terasa satu keluarga)

### 1. Warna & tekstur
- Empat latar saja: krem `#FCFAF6`, cokelat-hitam `#1E1014`, oranye penuh `#FC4D00`, krem hangat `#FDF4E7` (akhir). Aksen tunggal oranye `#FC4D00` (pil daftar, strip logo, titik).
- Pembuka: pendaran oranye radial dari bawah, gradien vertikal di x 50 %: `#FEF7F2` (y 56 %) → `#FA7940` (72 %) → `#ED5310` (78 %) → `#832B05` (94 %); tepi bawah gelap terbakar.
- Teks: hitam di krem, putih di gelap/oranye; kata aksen kalimat bergradien cokelat → oranye (`#58260E`–`#C43C04`). Item daftar nonaktif abu `#A8A6A3`.
- Kata raksasa: gradien abu-putih (`#D4D4D4`–`#EEEEEE`) di cokelat gelap; "9000+" putih → peach (`#FCE4DC`).
- Flat, tanpa grain (std patch latar 2,5). Satu-satunya "foto": lanskap bukit render 3D jam emas (k7).

### 2. Teks
- Font: grotesk netral mirip **Inter Medium** (a dua tingkat, t terpotong miring); kata raksasa grotesk yang sama, bobot regular–medium. Sentence case.
- Dua skala ekstrem tanpa perantara: kalimat ascender 5,4–6,0 % / x-height 3,3–4,0 % tinggi frame; kata/angka raksasa x-height ±62 %, ascender ±76 % ("Automate"), angka 92 % ("9000"). Rasio ±14–17×.
- Posisi: kalimat selalu di pusat (cy 50 %, cx 50–53 %), satu baris, lebar 24–56 % frame. Daftar: label "Automate" kiri (cx 17 %), item aktif di tengah dalam pil oranye, item lama naik dan memudar abu di atasnya.
- Kata per tampil: 3–5 (kalimat diketik); 1 kata raksasa; 1–3 kata per item daftar.
- Masuk: diketik per huruf dengan kurung `> … <` (kursor terminal); "Not any more" diketik per kata; raksasa masuk dari whip-pan horizontal dengan motion blur; item daftar slot-machine (geser naik). Keluar: glitch, mask blob, atau cut keras.
- Penekanan: warna (cokelat→oranye pada kata akhir), pil oranye, atau skala raksasa. Tidak ada garis bawah/kotak lain.

### 3. Ritme
- `pace_read.py`: 11 cut = 28,2/menit, shot median 1,2 dtk, event visual 39/menit. Hitung manual: 6 cut keras (9,58 · 13,79 · 19,21 · 20,0 jump-zoom · 21,0 · 22,08) + 5 transisi bergerak.
- Babak: masalah diketik (0–2,2) → glitch (2,25–2,7) → "Not any more" + bar (2,7–4,0) → blob membesar ke logo (4,0–5,7) → "Automate" raksasa disapu (5,7–8,3) → kalimat gelap (8,3–9,6) → daftar fitur (9,6–13,8) → "And many more" (13,8–15,1) → "9000+" disapu ke diagram hub (15,1–19,2) → lanskap + prompt (19,2–21,0) → logo diketik (21,0–22,1) → avatar (22,1–23,4).
- Cepat: glitch dan hub (bunyi tiap ±70 ms). Lambat: kalimat gelap, "And many more" (±1,3 dtk diam).

## TEKNIK (boleh dipinjam referensi lain; selalu dikenakan pengikat kiblat)

### 4. B-roll / footage
- Tidak ada footage kamera. Satu still lanskap render 3D (bukit emas, pohon merah muda) sebagai alas kotak prompt kaca, full-bleed, tanpa grade tambahan; satu avatar memoji 3D di akhir.

### 5. Motion graphic
- Simbol kode melayang (`[ ] < > % ^`), snippet kode kecil, petir biru, kotak biru muda buram = "kacau". Blob gelap organik yang tumbuh = jawaban. Pil + slot daftar = fitur. Hub bergaris putus-putus (9000+ → Zapier → Slack/Asana/GitHub/Stripe) = integrasi.
- Watak gerak: sigap, ease-out cepat; tidak ada bounce.
- **Skala subjek:** satu subjek per adegan. Blob 49×68 % → 70×100 % (mask penuh) dalam 1 dtk; kata raksasa melebihi frame; hub melebar 81 % lebar × 65 % tinggi tapi tiap elemen kecil (teks 5 %); avatar kecil 15,6×28,3 % di pusat; kotak prompt ±58 % lebar.
- **Kedalaman:** umumnya 1–2 lapis rata. Pembuka 3 lapis (krem, pendaran oranye, simbol berbeda blur: % biru besar buram di belakang, simbol hitam tajam di depan). Daftar: item lama memudar abu = kedalaman waktu; titik oranye bercahaya lembut. Lanskap: kotak kaca semi-transparan dengan border gradien ungu→oranye. Tanpa bayangan jatuh.

### 6. Kamera & transisi
- Pembuka: pull-out pelan ±11 % (skala 0,886, 1,5→2,9 dtk).
- "Automate": whip-pan horizontal menyapu kata ±1 lebar frame dalam 2,5 dtk (awal 4–7 %/frame, melambat), motion blur, warna berubah oranye→putih.
- "9000+": pan cepat menyapu angka (7–20 %/frame), "+" berubah menjadi hub; hub lalu pull-out ±4 % (17,2→18,0).
- Lanskap: jump-zoom ×1,8 ke kotak prompt pada 20,0 dtk, lalu drift kiri 2 %.
- Transisi: glitch negatif (selang-seling krem/hitam tiap 2 frame, 0,45 dtk), morph blob-mask, whip, cut keras ke oranye penuh, logo diketik. Pemicu: musik/SFX, bukan kata (tanpa VO).

### 7. SFX
- earshot: 118 event (5,1/dtk); 30 nada, 21 UI, 15 riser, 12 foley, 9 tombol. 60 % cut punya onset dalam 1 frame (median selisih 22 ms).
- Kosakata per peristiwa: reverse-cymbal swell di frame 0 (+38 dB dari hening); ketikan = klik + ding glockenspiel per kata (0,86–1,66); glitch = klik toggle tiap flicker (2,26–2,58, ±80 ms); blob = rentetan tombol/lego (3,97–4,73); "Automate" = orchestral stab rendah 123 Hz (5,69); cut ke kalimat = stab 107 Hz (+19 dB, 8,33); cut ke daftar = bell chime (+18 dB, 9,61).
- Item daftar: nada glockenspiel ±2,1 kHz + cork pop **berpasangan berjarak 0,13–0,15 dtk**, satu pasang tiap ±0,7 dtk (10,04 · 10,87 · 11,58 · 12,50 · 13,16), +13…+17 dB di atas bed.
- "9000": hit sub 47 Hz (15,24); "+": hit 111 Hz (16,61). Hub tergambar: rattle mekanis tiap ±70 ms (17,2–19,2), +5…+10 dB. Prompt: ding tinggi 3,6–11 kHz (19,4–19,7). Logo diketik: tombol/hi-hat (21,0–21,8).
- Puncak terkeras di akhir: RMS 300 ms −8,6 dBFS pada 22,3 dtk (avatar), swell bukan transien. Cut tanpa bunyi: 6,0 · 13,0 · 20,0 · 22,08.

### 8. Musik
- Tanpa VO. Bed glockenspiel/music box + pluck, warna "corporate inspirational", tanpa drum tegas; tidak ada grid beat (pulse clarity 0,11); bpm tidak tegas (librosa 89 vs 123).
- Mix −17,8 LUFS, LRA 8,7 LU, true peak +2,0 dBTP (clip; jangan ditiru). RMS median −27,2 dBFS, p10 −33, min −35: bed tidak pernah mati.
- Filter sweep per babak (rolloff 85 % median): pembuka 5,9 kHz terang → blob/Automate 1,8 kHz → daftar 2,7 kHz → "And many more"/9000 1,3 kHz → hub/lanskap 5,1 kHz → logo 1,2 kHz.
- Babak (earshot): 0–3,75 glitch-hop (−14 LUFS, terkeras), 3,75–17,1 corporate tenang (−19), 17,1–23,3 glitch-hop/music box (−18).

## Proporsi terukur (11 Nov, dari video sumber 720p; % terhadap frame 16:9)
| Jenis adegan | Kata kunci (% tinggi) | Kata sambung | Posisi teks | Skala subjek | Kedalaman |
|---|---|---|---|---|---|
| Ketik + glitch (k1) | asc 5,6 / x 4,0 (kata aksen sama ukuran, beda warna) | sama | pusat, cx 51 cy 50, lebar 53 % | tanpa subjek; simbol kecil tersebar | 3 lapis: krem, pendaran oranye bawah 40 %, simbol tajam/buram |
| Blob → logo (k2) | wordmark asc ±6 | – | pusat, di dalam blob | blob 49×68 % → penuh | 2 lapis + pendaran |
| Kata raksasa (k3) | x 62, asc 76 (terpotong) | – | memenuhi frame, cy 54 | kata = subjek, > frame | 1 lapis, motion blur |
| Kalimat gelap (k4) | asc 6,0 / x 3,6 | sama | pusat, lebar 56 % | tanpa subjek | rata `#1E1014` |
| Daftar fitur (k5) | item aktif asc 4,7 / x 3,3 dalam pil | label 4,4 | label cx 17; pil cx 50 cy 51 | pil ±31 % lebar | item lama abu memudar di atas |
| Diagram hub (k6) | 9000+ 5,3; Zapier 5,1 | label kanan 2,6 | 3 kolom: x 20 / 51 / 87 % | hub 81×65 % dari elemen kecil | rata oranye, garis putus-putus |
| Lanskap + prompt (k7) | teks prompt ±4 | – | dalam kotak kaca | kotak ±58 % lebar | 2 lapis: lanskap + kaca |
| Avatar akhir (k8) | – | – | – | avatar 15,6×28,3 %, pusat | 1 lapis krem |
- Angka/kata raksasa : kalimat ±14–17×; kalimat satu ukuran saja.

## Cek kemiripan (dipakai juri saat menyandingkan still)
- Hanya dua skala teks: kalimat x-height 3,3–4 % (ascender 5–6 %) dan kata raksasa x-height ≥ 60 % yang terpotong tepi frame.
- Kalimat satu baris di pusat (cy 48–52 %), lebar ≤ 56 % frame, grotesk medium sentence case.
- Latar hanya krem `#FCFAF6`, cokelat-hitam `#1E1014`, atau oranye penuh `#FC4D00`; oranye sebagai aksen tunggal.
- Pembuka krem punya pendaran oranye dari bawah yang menggelap ke `#832B05` di tepi; tanpa grain.
- Satu subjek per adegan; objek kecil (avatar, label) tetap di pusat, bukan ditumpuk.
- Diagram berupa hub tengah dengan garis putus-putus ke kotak bergaris putus-putus, putih di oranye.
- Kedalaman tipis: maksimal 3 lapis, tanpa bayangan jatuh; kedalaman lewat blur/pudar abu.
- Audio: bed tidak pernah di bawah −35 dBFS RMS; tiap item daftar = pasangan nada+pop berjarak ±0,14 dtk; tiap kata/angka raksasa = hit rendah < 130 Hz.
- Puncak keras disimpan untuk akhir/logo; true peak kita ≤ −1 dBTP (referensi clip).

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
