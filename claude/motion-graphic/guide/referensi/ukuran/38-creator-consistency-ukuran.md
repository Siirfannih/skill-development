# 38 · Data ukur mentah (11 Nov 2026)

Sumber: `src.mp4` → video asli IG DfCiOd4N8WL · 960×720, 30 fps, 29,56 dtk, audio 44,1 kHz.
Skrip (folder `scripts/`): `ukur.py` (segmentasi A-roll/sisipan dari warna sudut, gerak kamera awal-akhir, hex latar), `kamera.py` (skala+translasi antar-frame via optical flow LK + estimateAffinePartial2D di area latar kiri/kanan, lompatan skala > 2,5 %/frame), `teks.py` (bbox teks dari masker warna lime/zaitun, komponen < 30 px dibuang). Audio: ffmpeg ebur128, `earshot timeline --detail high` (`earshot.txt`), `pace_read.py`, librosa beat_track.

## Segmen (ukur.py)
A 0,10–1,50 · I 1,50–6,27 · A 6,27–14,70 · I 14,70–16,33 · A 16,33–19,37 · (leak 19,27–19,6) · A 19,43–27,43 · I 27,43–28,27 · A 28,27–29,1 · pudar 29,1–29,5
Scene detect ffmpeg (>0,2): 1,5 2,33 2,47 2,93 3,67 4,13 4,4 4,53 4,67 4,93 5,07 5,33 5,47 5,6 5,87 6,0 6,13 6,27 8,0 8,4 14,7 16,33 19,27 19,6 22,6 27,43 28,27 29,1

## Kamera (kamera.py, drift skala kumulatif per rentang)
0,13–1,5 +6,7 % · 6,27–8,03 +6,8 % · 8,1–11,23 +6,3 % · 11,23–14,7 +3,0 % · 16,33–19,27 +7,0 % · 19,6–22,6 +6,2 % · 22,6–27,43 +0,6 % · 28,27–29,13 +4,3 %
Lompatan: 8,07 (setelah light leak), 11,23 ×0,944, 22,6 ×0,941, 29,13 (pudar).

## Teks per frame kunci (bbox, % frame)
- k1 0,8 dtk "30 days" lime `#EAF909`: h 20,3 w 32,0 cx 19,7 cy 50,1; baris kecil h 2,6 (t 1,0–1,3).
- k2 1,8 dtk "to" zaitun `#565904`: h 8,9 w 9,5 cx 50,0 cy 50,8; 2,2 dtk "own": h 7,2 w 17,0 cx 49,9 cy 51,6.
- caption sisipan (5,2 / 5,8 / 15,5 / 27,8): h 4,0 / 3,1 / 3,2 / 4,2; cy 94,6–95,1; cx 49,1–49,9; w 13–27.
- k5 caption A-roll 9–14,5 dtk lime `#E4F919`: h 2,78 (tanpa ascender) / 3,61; top 93,3; cy 94,7–95,1; w 5,5–24,2; cx 49,8–50,0.
- k6 kata raksasa 21,35–25,6 dtk lime `#E6FD00`: h 18,9–19,0 (tanpa ekor), 23,9–25,3 (dengan ekor), top 41,2–46,1, bot 60,1–66,5, cx 49,8–50,1, w 15,6–90,2.

## Objek sisipan (selisih dari bg `#FCFBCA` > 90, y < 600 px)
3,2 dtk panel video h 57,2 w 57,1 · 4,6 h 54,6 w 33,1 · 5,2 poster h 67,2 w 25,2 · 5,8 h 65,3 w 39,5 · 15,5 kartu analitik h 54,4 w 48,0 · 27,8 kartu profil h 43,2 w 52,3; semua cx 49,9–50,8, cy 49,7–51,4.
7,0 / 7,6 dtk: bbox rusak (menyentuh tepi atas) → tidak dipakai.

## Warna (median potongan)
Sisipan `#FCFBCA` (sudut = tengah-kiri: 250/253/203 vs 250/253/203 → tanpa vignette; std 5 = garis grid). Grid: garis tiap 27–28 px (2,9 % lebar).
A-roll k5: dinding `#CBAF91`, gorden `#573028`, kaus `#333140`, kulit `#DB8F87`. Kartu `#0D0E13`, magenta `#C200C0`.

## Audio
ebur128: I −14,1 LUFS, TP −1,7 dBTP, LRA 1,7 LU. librosa: 112,3 bpm, 187 onset (6,3/dtk), centroid 1737 Hz.
pace_read: 20 cut, 40,6/menit, median 0,8 dtk, event visual 55/menit, 6,5 suku kata/dtk.
earshot: seksi 0–4,45 "techno, aggressive"; 4,45–29,47 "inspirational corporate, confident". Tag: 12 WHOOSH(?), 18 UI(?), 1 uplifter (8,21 dtk, +22 dB), sub drop (18,46). Whoosh sinkron cut: 1,48 (−22 ms), 11,23 (+2 ms), 14,72 (+17 ms).

## Batas ketelitian
- 720p: 1 px = 0,14 % tinggi; caption kecil ±5–10 %. Bbox mengikutkan ascender/descender; tinggi x tidak dipisah kecuali caption (2,78 vs 3,61).
- Skala presenter (kepala ±14–62 %) dibaca dari frame k5, bukan deteksi wajah otomatis (±3 %).
- Font = perkiraan visual, tidak ada metadata. Tag earshot bertanda "?" lemah (tertutup suara + musik).
- Level musik vs suara tidak terukur (tanpa stem). Watak masuk teks dari strip 15 fps, bukan per frame.
