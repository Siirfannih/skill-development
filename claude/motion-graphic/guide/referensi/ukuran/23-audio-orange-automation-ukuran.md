# 23 · ukuran mentah (11 Nov 2026)

Sumber: `Audio.mp4` 1280×720, 24 fps, 23,40 dtk, audio 48 kHz stereo. Frame tiap 0,5 dtk: `frames/` (47). Frame ukur PNG: `ukur/m_<dtk>.png`.

## Skrip
- `ukur/cuts23.py`: beda absolut rata-rata (160×90 abu) + beda histogram 8³ antar-frame; cut = mad > 12 atau hist > 0,3.
- `ukur/meas23.py`: warna latar (mode warna kuantisasi 8), komponen terhubung piksel jauh dari latar (Σ|ΔRGB| > 120).
- `ukur/m2.py`: tinggi komponen huruf per pita (maks = ascender/descender, median ≈ x-height), bbox teks, ukuran blob/avatar, gradien pendaran, patch hex.
- `ukur/cam.py`: ORB + `estimateAffinePartial2D` (skala, translasi) antar frame; phaseCorrelate per frame untuk kecepatan pan.
- `pace_read.py` (scripts/audio) → `pace.txt`; `earshot timeline --detail high` → `earshot.txt`; ffmpeg ebur128; librosa (beat_track, tempo, RMS 300 ms, rolloff 85 %, chroma).

## Per frame kunci (% tinggi H / lebar W)
| Frame | dtk | Latar | Teks: maks h / median h | bbox teks | Lain |
|---|---|---|---|---|---|
| k1 ketik-glitch | 1,5 | #FCFAF6 | 5,56 / 4,03 | x 24,1–77,0 y 46,5–53,3 | pendaran: y56 #FEF7F2, y67 #FEB393, y72 #FA7940, y78 #ED5310, y89 #A43607, y94 #832B05; teks hitam #000000, aksen #58260E–#C43C04 |
| (Not any more) | 2,9 | #FCFAF6 | 5,42 / 4,03 | x 38,2–61,7 y 46,5–53,3 | glitch: frame krem/hitam berganti tiap 2 frame 2,25–2,67 dtk |
| k2 blob-logo | 4,0/4,5/5,0 | #1C1414 di krem | wordmark ±6 | – | blob gelap 49×68 % (6 % area) → 47×86 % (23 %) → 70×100 % (60 %) |
| k3 kata-raksasa | 6,5 | #1C1414 | komponen 76,2 / 63,6 / 61,8 | y 15,4–93,6 | huruf terang #D4D4D4–#EEEEEE |
| k4 kalimat-gelap | 9,0 | #1E1014 | 5,97 / 3,61 | x 22,2–77,7 y 46,8–53,2 | teks #FFFFFE; latar 97 % frame |
| k5 daftar-fitur | 12,5 | #FCFAF6 | label 4,44/3,33; aktif 4,72/3,33; abu 4,72/3,47 | label x 10,4–24,3; aktif x 29,5–69,9 y 48,3–54,2; abu y 11,1–16,9 | pil #FC4D00; abu #A8A6A3 |
| And many more | 14,0 | #FC4D00 | 4,86 / 3,61 | x 40,6–64,5 y 47,6–53,5 | – |
| 9000 | 15,5 | #FC4D00 | digit 91,7 | y 1,7–93,2 | digit putih→#FCE4DC |
| k6 diagram-hub | 18,0 | #FC4D00 | 9000+ 5,28; Zapier 5,14; Slack 2,64 | semua x 7,0–88,2 y 17,4–82,1 | kolom cx 20 / 51 / 87 |
| k7 lanskap-prompt | 20,4 | foto | ±4 (taksiran visual) | kotak ±58 % W | – |
| logo | 21,5 | #FC4D00 | 5,97 / 5,56 | x 37,2–59,9 y 44,7–52,2 | – |
| k8 avatar-akhir | 22,5 | #FDF4E7 | – | – | avatar x 42,1–57,7 y 34,0–62,4 (15,6×28,3 %) |

## Kamera (ORB, inlier)
- 1,5→2,9: skala 0,886, tx +9 % W (133/515) = pull-out pelan. 17,2→18,0: skala 0,96 (155/465). 19,3→19,7: 1,000 (diam). 19,7→20,4: skala 1,805 (235/740) = jump-zoom. 20,4→20,9: tx −2 % (2241/2344).
- Pan "Automate" 5,83–8,33: phaseCorr −4,4…−7 %W/frame di awal, ±0 di akhir; total ±1 lebar frame (taksiran, teks berulang membuat korelasi tak stabil). Pan "9000" 15,1–17,1: 7–20 %W/frame.

## Audio
- ebur128: I −17,8 LUFS, LRA 8,7 LU (−23,0…−14,2), TP +2,0 dBFS. earshot: 118 event 5,1/dtk, pulse clarity 0,11, sinkron 60 % cut ≤ 1 frame.
- librosa: beat_track 89,1 bpm; tempo median 123,0 (tidak sepakat → tak ada tempo tegas). RMS 300 ms: median −27,2, p10 −33,0, min −34,9, maks −8,6 dBFS @ 22,3 dtk. Rolloff median: 0–3,75 5937 Hz; 3,75–9,6 1824; 9,6–13,8 2670; 13,8–17,1 1345; 17,1–21 5119; 21–23,4 1195. Chroma teratas C, A, E, D (kunci tidak disimpulkan).
- pace_read: 11 cut, 28,2/menit, shot median 1,2 dtk, event visual 39/menit.

## Batas ketelitian
- 720p: 1 px = 0,14 % H; huruf kecil ±0,3 % H. "maks h" bisa ascender atau descender (p, g); median komponen mendekati x-height tapi tercampur tanda baca.
- Hex dari frame lossy H.264, ±3 per kanal. Label earshot (CLAP) hanya petunjuk; jenis instrumen musik tebakan dengar-mesin.
- Ukuran font raksasa dari frame dengan motion blur → ±3 % H. Kotak prompt dan teksnya ditaksir dari gambar, tidak diukur komponen.
