# 70 · Data ukur mentah (Storytellingkonsep.mp4)

Sumber: 1276×718, 24 fps, 46,34 dtk, AAC 44,1 kHz stereo. Frame tiap 0,5 dtk → `frames/f001…f093.jpg` (fNNN = (NNN−1)×0,5 dtk).
Skrip: `skrip/ukur_teks.py` (ambang piksel + connected components cv2; tinggi = median/maks tinggi komponen). Kamera: ORB 2000 titik + `estimateAffinePartial2D` RANSAC, frame awal (+0,08 dtk) vs akhir (−0,1 dtk) tiap shot. Warna: median BGR potongan. Audio: ffmpeg ebur128, `earshot timeline --detail high`, `pace_read.py`, librosa beat_track (wav mono 22,05 kHz).

## Teks (% tinggi 718 px; med = kira-kira x-height, maks = ascender/kapital)
| Frame | Isi | Ambang | Blok x % | Blok y % | med % | maks % |
|---|---|---|---|---|---|---|
| f003 (1,0) k1 | "Every person who has ever" gelap di putih | <90 | 16,1–43,4 | 86,2–90,9 | 2,92 | 3,90 |
| f013 (6,0) k3 | "it's not" putih | >215 | 30,4–49,6 | 45,4–54,5 | 6,75 | 8,50 |
| f013 | "talent." merah (R>170,G<90,B<90) | warna | 61,1–68,0 | 46,0–54,0 | 4,53* | 7,94 |
| f023 (11,0) k4 | "delusional" | >215 | 14,7–47,5 | 24,1–34,0 | 7,24 | 9,61 |
| f025 (12,0) | "enough to / bet everything" | >215 | 18,5–45,7 | 35,5–48,7 | 3,76 | 6,41** |
| f035 (17,0) | "If you don't know me.." | >215 | 32,7–67,6 | 90,5–96,1 | 3,34 | 4,46 |
| f049 (24,0) | "campaigns" | >215 | 41,1–58,9 | 90,4–96,1 | 3,34 | 4,46 |
| f075 (37,0) | "and if you stay to watch my story…" | >200 | 29,0–70,1 | 41,8–48,7 | 2,51 | 6,96** |
| f092 (45,5) | "COMMENT "YT" / to watch my journey" | >215 | 38,4–62,8 | 44,6–54,2 | 2,37 | 3,20 |
\* merah terpotong ambang (anti-alias); pakai tinggi putih sebaris. ** maks tercemar latar terang/2 baris.
Dari keyframe k5 (1080 lebar, dibaca dari piksel gambar): "Charles" kapital 145–195/608 px = 8,2 %; "Age 20" ±3,6 %. Judul "IMPOSIBLE" (f008): huruf y 17–82 %, x 8–91 % (batas dibaca dari grid frame, bukan ambang: warna huruf dekat langit).

## Skala subjek (dibaca dari frame, ±1 %)
- f003 bingkai klip: x 16,5–83,5 %, y 16,5–83 % → 67×66 %.
- f035 polaroid: x 34–68 %, y 10–92 %; k5 (18,5 dtk): x 29–73 %, tinggi > frame.
- f049 foto gabus: tiap foto ±42 % lebar × 48 % tinggi; 2–3 terlihat.

## Warna (median potongan)
Putih `#FDFBFE` (tengah = sudut; grain std 0,0) · judul terang `#A1D5F4`, gelap `#193E50`, langit `#56717D` · merah teks `#B7000F` (f013, 5506 px), `#B40011` (f015) · latar Musk `#060405` · matras `#0E3F33`, tepi `#185848` · gabus `#9C4721`, sudut `#06090D`, benang `#993C19` · kartu akhir `#010002`.
Vignette (luma pusat/sudut): f035 79/57 · f049 131/59 · f060 159/51 · f023 18/10 · f075 109/167 (langit terang, tanpa vignette).

## Kamera per shot (skala %, tx/ty % frame)
0,0–1,8 +14,4 / −6,5 / −8,6 (bingkai membesar) · 1,8–2,6 +1,5–2,0 · 3,3–4,1 0 · 4,1–5,7 enam shot 0,25 dtk (tidak diukur) · 5,7–8,0 0 s/d +2,4 · 8,0–10,9 pan −3,8 s/d −4,6 · 10,9–16,0 ≤ ±2 · 16,0–20,4 / 20,4–30,8 / 30,8–35,0 / 35,0–37,5: inlier 4–22 (TIDAK andal; dibaca dari sheet 1 dtk: push polaroid, whip/putar ke gabus, susur turun-kanan, push masuk foto, tarik ke matras) · 37,5–39,8 ≤ +1,5 · 39,8–41,2 +15,8 · 41,2–42,4 +6,5 · 42,4–44,8 +61,1 (inlier 470/737) · 44,8–46,3 0.

## Cut
ffmpeg `select=gt(scene,0.25)`: 0,02 / 1,79 2,17 2,63 3,25 3,33 4,08 4,38 4,63 4,88 5,13 5,38 5,67 6,63 7,42 8,00 9,17 10,92 12,67 14,21 15,96 20,42 30,79 35,00 37,46 39,00 39,83 41,17 42,38 44,75 (3,25/3,33 dan 20,42/20,46 = satu transisi). pace_read: 28 cut, 36,3/menit, median 1,3 dtk, event visual 52/menit, laju bicara 4,7 suku kata/dtk.

## Audio
ebur128: I −14,3 LUFS, LRA 4,8 LU (−16,8…−12,0), true peak +1,8 dBFS. earshot: 274 event (5,9/dtk); 51 voice, 17 ui, 12 note, 4 riser, 4 drum, 3 whoosh, 2 foley, 2 hit, 1 key; pulse clarity 0,06; bagian: 0–15,85 / 15,85–31,2 corporate inspirational + vocal chop; 31,2–42,75 glitch hop; 42,75–46,2 glitch hop sisa. librosa bpm: total 123; per bagian 144 / 123 / 108 / 172 (bagian pendek, tidak andal).

## Batas ketelitian
- 1 px = 0,14 % tinggi; huruf kecil ±5–10 %. Ambang putih ikut menangkap latar terang (f075).
- Font "paling mirip" dari mata, bukan pencocokan glif.
- Gerak kamera di adegan benda 2,5D tidak bisa diukur affine (perspektif + footage di dalam foto); ditulis dari sheet.
- Level musik vs suara tidak terukur tanpa pemisahan stem; label earshot = petunjuk.
