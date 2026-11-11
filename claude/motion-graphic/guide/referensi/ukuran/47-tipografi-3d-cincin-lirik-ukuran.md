# 47 · Ukuran mentah (IG DetQ8tOOEkg)

Sumber: `video.mp4` 720×1280 (9:16), 30 fps, 30,09 dtk, audio 44,1 kHz. Semua % terhadap frame penuh 720×1280 (tanpa letterbox).
Frame tiap 0,5 dtk → `frames/` (60 frame). Frame kunci → `keyframes/47-k1…k8-*.jpg` (720 px, JPEG 85).

## Skrip
- Frame/sheet: `ffmpeg -vf fps=2`, `tile=10x6` (cek visual), `sheet.jpg` = `fps=0.5,scale=-1:300,tile=8x2`.
- Teks: `tmp/words.py`: kotak manual per kata (dibaca dari frame), mask tinta = V<120 atau (S>90 & V<235), lalu bbox baris/kolom dengan isi >4 %. Tinggi = tinggi ink terlihat, TERMASUK sisi extrude 3D dan ascender/descender.
- Warna: k-means 7 klaster atas 8 frame kunci (subsampel 1/8); per frame median piksel mask latar (S<60, V>200), navy (V<90), coral (H<20, S>110, V>150), teal (H 65–100).
- Kamera: optical flow Farneback 180×320 tiap frame, rata-rata per detik: |flow| median, pan-x/pan-y median, komponen radial (+ = mengembang = push-in), komponen tangensial (rotasi). Satuan % lebar per detik. ORB+affine gagal hampir di semua pasangan (gerak 3D non-affine, tekstur sedikit).
- Cut: `select='gt(scene,0.3)'`; `pace_read.py`; audio: `ebur128`, `earshot timeline --detail high`, librosa (beat_track, onset, RMS 0,5 dtk, HPSS).

## Per frame kunci (t = detik)
| Frame | t | Kata | tinggi % | lebar % | pusat x,y % |
|---|---|---|---|---|---|
| k1 kata 3D | 1,25 | KNOW (coral muka, navy sisi) | 20,0 | 73,6 | 49, 26 |
| | | SHOULD (navy muka, coral sisi) | 21,2 | 84,7 | 53, 50 |
| | | label "+6.2 M" mono | ±3,1 | 26,7 | 76, 63 |
| | | label "+10.4 M" mono | 1,9 | 13,6 | 22, 15 |
| k2 pilar | 2,75 | label "+12.8 M" (pil krem) | 3,4 | 41,7 | 51, 4 |
| | | angka skala "10" | 5,5 | 15,3 | 42, 18 |
| | | batang pilar (navy) | 40 (y 31–71) | 43 (x 33–76) | – |
| | | tutup pilar (coral) | 25 (y 2–27) | 94 | – |
| k3 cincin lirik | 14,93 | "Knows" serif italic tebal, navy | 12,0 | 72,6 | 46, 29 |
| | | lirik pucat pita lain | ±2–4 | – | – |
| k4 kata-objek | 18,25 | "I'M" ubin | 6,1 | 21,9 | 26, 15 |
| | | VUL / nER / aB / le (ubin) | 10,2 / 11,7 / 11,4 / 12,5 | 64 / 63 / 38 / 40 | x 41–49, y 26/42/56/68 |
| k5 tulisan tangan | 20,25 | He's / straight / talking / to my / soul | ±8,6* / 16,4 / 12,5 / 10,5 / 13,0 | 29 / 79 / 67 / 43 / 57 | y 6/17/31/49/65 |
| k6 plakat | 21,25 | "conversation" di ±20 plakat | ±2–5 | plakat 15–30 lebar | tersebar penuh |
| k7 judul | 24,25 | 'cause serif italic | 5,5–6,5 | 31,8 | 22, 19 |
| | | TRAINING grotesk ultra-condensed | 29,8 | 74,9 | 49, 41 |
| | | Season slab italic coral | 14,8 (miring) | 80,6 | 46, 63 |
| | | "122.95 BPM · 30 SEC" mono | 1,9 | ±85 | 49, 76 |
| k8 geometri | 28,25 | tanpa teks; ±30 benda; bola terbesar ±25 % lebar | – | – | massa di y 25–75 |
\* "He's" terukur 10,9 tetapi terkena coretan latar; baca manual dari frame ±8,6.

## Warna (median piksel)
- k-means semua frame kunci: `#EFE9D7` 67 % (latar krem), `#2F3146` 9 % (navy), `#DE8464` 7 % (coral), `#DDC9AF` 6 % (krem bayangan), `#4C4659` 6 % (navy terang/sisi), `#906662`, `#98A499` (teal pucat).
- Latar per frame: `#EFE9D6`–`#F2EBD9` (sangat stabil). Navy `#2A2D41`–`#353850`; coral `#DD7F5B`–`#EA8D63`; teal pita `#7C9C8F`/`#7FAA99`.
- Vignette: rasio terang sudut/tengah di k3 (88 % latar) = 1,01 → tidak ada. Grain: simpangan latar vs blur 5 px = 0,7–2,0 level (halus, nyaris tak ada).

## Kamera (optical flow, % lebar/dtk)
- |flow| median 41–88 hampir di setiap detik; diam hanya 4–5 dtk (1, tahan pilar) dan 22–24 dtk (9–23, tahan judul).
- Turun menyusuri tumpukan cincin 6–8 dtk: pan-y +21…+26. Orbit 8–10 dtk: pan-x +8…+14, rot −8…−10.
- Zoom-through ke plakat 20–22 dtk: radial +33 → +75 (push terkuat di video). Geometri 26–30 dtk: rot +10…+17 (orbit/putar).

## Cut & ritme
- Scene >0,3: 4,73 · 16,90 · 17,40–18,47 (8 deteksi, satu whip/smear berkelompok) · 22,03–22,10 · 24,73–24,80. `pace_read`: 14 cut = 27,9/mnt, median 0,2 dtk (tergelembung oleh smear), event visual 76/mnt.
- Segmen visual nyata (baca sheet): 0–4,7 · 4,7–16,9 · 17,5–19,4 · 19,4–21 · 21–22 · 22–24,7 · 24,7–30 → 7 segmen, median ±2,7 dtk.

## Audio
- ebur128: −14,0 LUFS, true peak −1,7 dBFS, LRA 5,1 LU (earshot 4,9). RMS 5–8 dtk turun ke −27/−28 dB (jeda), terkeras 17–23 dtk (−12…−14 dB).
- librosa 123,05 bpm (IBI 0,488 dtk), 60 beat, onset 3,6/dtk; harmonik/perkusif RMS 1,52. earshot: ±123 BPM, pulse clarity 0,27, 79 event (47 note, 14 riser, 7 drum, 5 voice, 3 whoosh, 2 hit); aksen terkuat 0,53 (+20 dB), 9,21 (+16,9), 16,99 (+16,3).
- Speech AST 0,03–0,04, singing tag ada → lagu bervokal, tanpa VO.

## Batas ketelitian
- 720p: 1 px = 0,08 % tinggi; kata kecil (<3 %) bisa meleset ±0,5 poin karena garis grid dan coretan latar.
- Tinggi kata 3D termasuk sisi extrude dan perspektif; kata pada pita melengkung diukur pada sudut kamera saat itu.
- Flow per detik adalah rata-rata seluruh frame; gerak benda sendiri (pita berputar) tercampur dengan gerak kamera.
- SFX tidak bisa dipisah dari musik (tidak ada stem); label earshot = petunjuk.
