# 17-ganimate · data ukur mentah (11 Nov 2026)

Sumber: `/home/irfan/work/pustaka-video/mac/_ganimate__DfICqhOvP-0.mp4` · 1280×720, 23,976 fps, 14,38 dtk (342 frame), audio 48 kHz stereo.
Mosaik 2×2: semua % terhadap panel 640×360 (TL x0-640/y0-360, TR, BL, BR). Frame: `frames/f_NNN.jpg` (fps 2, t = (N−1)·0,5 dtk).

## Frame kunci (keyframes/, crop panel 640×360, JPEG q85, dari PNG lossless)
| File | t / panel | Ukuran |
|---|---|---|
| 17-k1-tipografi-gelap | 1,5 TL | "Graphic" tinta 79 px = 21,9 %, huruf G 20,8 %, lebar 58 %, pusat (45, 33 %); baris "AI ✦ tools" tinta 21,7 %, lebar 87 %, pusat (52, 62 %), oranye `#C17855`–`#E8976B`; latar `#000000` |
| 17-k2-arsip-kata | 1,5 TR | "Life" cap 26 px = 7,2 %, lebar 12,5 %, pusat (50, 50 %); footage penuh |
| 17-k3-ui-asli-dock | 1,5 BL | dock (koordinat dibaca dari frame) 442×95 px = 69×26 %; ikon ±72 px = 20 % tinggi |
| 17-k4-editorial-highlight | 6,5 BL | "Source" S 89 px = 24,7 %, lebar tinta 54,5 %; kotak kuning `#F4D650` 414×168 px = 65×47 %; latar `#FFFFFF` |
| 17-k5-isometrik-tag | 6,5 BR | tag "Universities" cap 25 px = 6,9 %, tinta 7,2 %, lebar 27 %, pusat (83, 25 %), latar tag `#12A7A6`; 2 bangunan ±243×230 px = 38×64 %; navy `#020A15`; atap `#BCDFE3` |
| 17-k6-objek3d-tag | 10,5 TL | tag "private investment" tinta 8,9 %, x-height 5,0 %, lebar 40 %, pusat (31, 76 %); koin ±225×155 px = 35×43 %; grid `#1D2530` |
| 17-k7-peta-piksel | 13,0 BR | tag "America needs more power." 2 baris, cap A 5,0 %, blok 13,9 % tinggi × 25,5 % lebar, pusat (49, 54 %); peta (10,5 dtk) ±51×57 %; teal peta `#0B7376` |
| 17-k8-chart-editorial | 13,0 BL | label "Revenue by source" cap 5,6 %; mono "Instinct" tinta 1,9 %; bar kuning `#F4D76F`, bar abu `#E5E5E5`; registrasi `#454545`; area chart ±73×67 % |

Lain: "Wattage" (10,5 TR) W 10,8 %, tinta 13,9 %, lebar 34,5 %, pusat (50, 49 %), latar `#050505`. "of" (8,5 TR) x 5,0 %, tinta 6,9 %, pusat (58, 49 %). "and its own power" (8,5 TL) x 5,6 %, tinta 10 %, lebar 46 %, pusat (48, 39 %). "so qualifying" tag tinta 9,4 %, x 5,3 %, pusat (48, 48 %). "Wind" W 9,2 %. Glow kolom AI `#E3E7F5`, teks "AI" `#98ABE8`, latar UI `#FAFAFA`.

## Cut per panel (`scripts/quad_cuts.py` → `cuts.json`)
TL 2 cut (8,4/mnt), TR 28 cut (117,8/mnt, median 0,33 dtk; 9 shot 0,17 dtk di 12,47–13,81), BL 3 (12,6/mnt), BR 2 (8,4/mnt). Panel grafik banyak berubah tanpa cut (gerak kamera/animasi) → angka cut meremehkan perubahan.
`pace_read.py` seluruh frame: 6 cut = 25,0/mnt, median 2,1 dtk, gerak layar 10,9, event visual 75/mnt, `energi`.

## Kamera (`scripts/cam_accum.py` → `cam.txt`; ORB + estimateAffinePartial2D antar-frame, dijumlah per 0,5 dtk)
- BR 5,0–8,5: dx −10…−37 %W, dy +5…+32 %H per 0,5 dtk (truck diagonal iso). BR 2,0–3,5: dx −20, −80, −32, −11 %W (slide). BR 10,0–10,5: −52 %W/−41 %H (pindah ke peta).
- BL 0–1,5: skala ×1,47, ×1,09, ×1,61 (zoom dock). BL 5,0–7,0: dx −21, −47, −20, −19 %W (pan editorial). BL 8,0–8,5: ×0,83, ×0,65 (zoom-out).
- TR 0–1,0: ×1,04 per 0,5 dtk (push roket); 7,0: ×1,135 (punch); lainnya ×1,000 (diam).
- TL 2,5–3,5: ×1,09, ×1,11 (push ±1,2× per dtk).

## Teks & warna (`scripts/text_measure.py` + skrip cap/hex inline yang sama polanya)
Tinta = piksel berjarak RGB > 60 dari median tepi kotak; cap = tinggi kelompok kolom huruf pertama (ambang L > 200 / < 90). Hex = median 7×7 px.

## Audio
- ffmpeg ebur128: −14,0 LUFS, LRA 2,0 LU, true peak −1,9 dBFS. earshot: −14,2 LUFS, −2,3 dBTP, LRA 1,8; pulse clarity 0,06; 82 event (41 voice, 12 ui, 9 whoosh, 7 foley, 6 note, 3 hit, 3 riser, 1 key) → `earshot.txt`.
- librosa: 120,2 bpm (27 beat, lemah), 101 onset (7,0/dtk). RMS per dtk (dB): −14,8 −16,7 −16,8 −21,1 −17,3 −17,8 −15,4 −15,4 −16,3 −17,1 −20,0 −16,3 −16,3 −18,6. Centroid median per 2 dtk: 2078, 2589, 1027, 1138, 1421, 1465, 1642 Hz.

## Batas ketelitian
- Panel 640×360: 1 px = 0,28 % tinggi; kata kecil (< 25 px) bisa meleset ±10 %. JPEG kompresi melebarkan tepi tinta ±1 px.
- Ukuran subjek (dock, bangunan, koin, peta, chart, kotak kuning) dibaca dari koordinat frame penuh secara visual, ±3 %.
- ORB pada grafik datar memakai fitur sedikit; gerak objek/animasi bisa terbaca sebagai gerak kamera. Angka kamera = arah dan orde besaran, bukan nilai presisi.
- Audio = satu campuran untuk 4 panel; SFX/musik tidak bisa dipisah per proyek. Label earshot bertanda "?" = petunjuk.
- Durasi animasi masuk/keluar teks dalam frame: tidak terukur (frame tiap 0,5 dtk; tidak dibedah per frame).
