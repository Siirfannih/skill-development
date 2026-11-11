# 29 · data ukur mentah (11 Nov 2026)

Sumber: `src.mp4` → siirfannih_Dc_0o-nIKYF.mp4 · 960×720, 23,976 fps (2997/125), 73,19 dtk, audio 44,1 kHz.
Skrip (folder ini): `measure.py` (bbox kata putih: HSV V>228 & S<40, dilate 3×9, komponen terhubung), `color_cam.py` (hex median tambalan, vignette, high-pass grain, kamera ORB + estimateAffinePartial2D antara awal+0,15 dtk dan akhir−0,15 dtk tiap shot). Cut: `ffmpeg select='gt(scene,0.25)'` → `scenes.txt`. Loudness: `ffmpeg ebur128=peak=true` → `ebur.txt`. `pace_read.py` → `pace.txt`. `earshot timeline --detail high` (wav mono 22,05 kHz) → `earshot.txt`. librosa beat_track / plp / chroma.

## Frame kunci (keyframes/, waktu sumber)
| file | t | ukuran (% tinggi/lebar) |
|---|---|---|
| k1-wajah-teks | 19,4 | "But" merah `#AC0004` bbox y 17,6–27,6 (10,0 %), x 11,5–30,3 |
| k2-benda-analogi | 12,3 | baris 1 y 44,0–49,6: Simon(serif) h 4,7; had 3,9; a 2,9; pool 4,9 (p turun); of 3,9; hundreds 3,9 (x 78,6–95,3). baris 2 y 51,1–56,0: of 4,0 (x 4,7); creators 3,6; to 3,8; pick 4,9; from. 4,0 (x 85,7–95,2). Mangkuk biru x 39,6–61,4, y 34,6–65,1. Teks `#F5E9DF`, kayu `#492F1A` |
| k3-broll-kata | 22,9 | baris 1 y 57,9–62,8 (h 4,9–5,0), baris 2 y 65,8–72,2 (6,4 dgn descender g), x 12,3–87,9. Langit putih ikut terdeteksi (abaikan bbox >10 %) |
| k4-ui-label | 58,8 | kotak navy `#030176` x 4,6–20,1, y 47,4–53,6 (6,2 %); "finding" putih bold di dalam; tile reels ±33 % lebar |
| k5-kartu-judul | 2,7 | "a" 21,7 %, "b" 25,8 %, "et." 21,4 %; x 11,2–89,1; bg pusat `#152122`, sudut `#03090C`, area 0–20 % `#3F4040` |
| k6-grafik-overlay | 47,9 | and/slowly/started/seing/patterns y 59,7–65,6, h 4,0/5,1/4,2/5,3/5,0, x 9,6–90,9; garis magenta `#CD1CD1`; grafik ±x 26–81, y 26–47 (estimasi visual dari still) |
| k7-checklist-atas | 34,2 | "film" serif italic x 8,8–23,6, y 44,4–55,6 (11,1 %); kertas ±x 38–62, y 28–72 (estimasi visual) |
| k8-kartu-akhir | 72,2 | logo hitam x 35,7–64,5, y 46,5–54,2 (7,6 %); bg `#FEFEFE` |

## Tekstur
- Vignette (luma tengah vs 4 sudut 1/8): 12,5 dtk 91/92 (meja terang rata); 34,5 dtk 136/49; 22,5 dtk 148/68; 65 dtk 120/58.
- Grain: high-pass σ 0,15 di kartu judul gelap, 1,02 di dinding polos 41,5 dtk → tanpa grain tambahan (sisa kompresi).

## Teks masuk
- Luas piksel putih pita y 300–420 dari 9,9–12,4 dtk naik bertangga dalam 1 frame (+2207 px di 10,28; +1519 di 11,11; +832 di 11,69; +908 di 11,94) → kata muncul sekaligus, tanpa fade.

## Ritme & kamera
- 68 lonjakan scene >0,25; pace_read: 63 cut, 51,6/menit, median 0,9 dtk, event 68/menit, 4,5 suku kata/dtk.
- Kamera (skala, tx/ty % frame; inlier <30 = tidak andal): 0–1,2 ×1,50 (rack focus, tidak andal); 4,3–5,4 ×1,18; 6,5–7,4 ×1,07; 13,8–14,6 ×1,055; 35–38,1 ×1,10; 38,1–40,1 ×1,076; 51,6–54,8 ×1,10; 63,5–66,5 ×1,27; 67,5–69,3 ×1,51; 34 shot lain ×1,000±0,003. Tidak andal: 1,2; 24,0 (×3,3); 27,4; 41,7; 45,2; 69,3 (gerak objek/tangan, layar berubah).

## Audio
- ffmpeg ebur128 (stereo 44,1 kHz): −14,2 LUFS, LRA 3,2 LU, true peak +1,9 dBFS. earshot (mono 22 kHz): −14,3 LUFS, TP −1,7, LRA 3,3.
- librosa: 123 bpm, PLP 0,18 (earshot pulse clarity 0,06), onset 4,0/dtk, chroma teratas G A A# C. Rasio energi <150 Hz : 300–3000 Hz 2,3–4,1 (bass musik dominan di seluruh video).
- earshot: 6 bagian (funk + vocal chop; "corporate" 6,75–11,95 dan 39,6–54,95; tanpa musik 69,3–73,1); drop 51,25 / 52,60 / 54,40 / 69,25; 454 event, 96 bertag (51 ui, 23 voice, 12 hit, 3 foley, 3 note, 2 whoosh, 2 riser).

## Batas ketelitian
- 720p: 1 px = 0,14 % tinggi; tinggi kata termasuk ascender/descender, ±0,3 % untuk kata kecil.
- Nama font = kemiripan visual, bukan identifikasi pasti. Bayangan teks tidak terukur.
- Tag SFX earshot adalah petunjuk; pop/klik tidak bisa dipisah tegas dari suara dan musik.
- Skala grafik dan kertas checklist diperkirakan dari still, bukan masker piksel.
