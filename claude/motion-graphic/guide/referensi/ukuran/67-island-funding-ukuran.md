# 67 · ukuran mentah (life.at.island_Ddq_MPiIuKB.mp4)

Sumber: 1276×720, 24 fps, 21,13 dtk, audio 44,1 kHz. Frame tiap 0,5 dtk → `frames/f_001…042.jpg` (t = (n−1)/2).
Semua % terhadap tinggi frame (720 px) kecuali disebut lebar (1276 px).

## Frame kunci (keyframes/, lebar 1080)
| Kunci | t (dtk) | Ukur |
|---|---|---|
| k1 angka-raksasa | 0,5 | logo glyph 4,9–6,1 %; digit tinggi tampak 42,4 % (y 52,6 % → tepi kartu 95,3 %, terpotong); x 8,3–95,8 % |
| k2 tumpukan-foto | 2,5 | "$" 19,0 %; "400M" 16,9 % (x 45–70 %); baris "Island Announcing" 1,9 % (y 11,9 %) |
| k3 teks-ulang-strip | 4,0 | "Series F" putih cap 19,7 % (y 40,3 %, x 28–72 %); logo 4,2–4,4 %; strip footage y ±37–63 % |
| k4 grafik-angka | 5,5 | "$" 37,6 %; digit 30,0–32,6 %; kartu x 2,6–57,8 % |
| k5 kartu-gelap | 7,0 | "$6.4B" 11,4 % (dengan $), cap/asc 9,0 %, x-height 6,8–7,1 %; logo 2,9 % |
| k6 serif-langit | 8,5 | "T" 20,0 %; "f" italic 28,7 %; x-height 15,4 %; blok x 10–88,7 % |
| k7 footage-statistik | 11,0 | judul cap 6,7 %, x 5,1 %, "f" italic 9,4 %; logo 3,1 %; angka "12" 15,0 % (2 = 16,5 overshoot); label asc 2,2 %, x 1,5 % |
| k8 tagline | 17,0 | cap/asc 6,8 %, x 5,1–5,3 %; baris y 42,8 % & 53,2 %; x 21–79 % |
| logo akhir | 19,5 | simbol 10,6 %, cap "I" 8,1 %, x 5,8 %; x 37,5–62,1 % |

## Kartu & warna (median piksel)
- Bingkai babak 1 `#061613`/`#071613`; kartu `#F8F3F3`–`#F9F3F3`. Dari 6,0 dtk terbalik (bingkai `#F9F3F3`, kartu `#061613`/`#051512`).
- Kartu x 2,6–97,4 %, y 4,6–95,3 % (inset 33 px tiap sisi); 5,0–5,5 dtk kartu x 2,6–57,8 %. Radius ±17 px (tepi atas: piksel kartu pertama di x+11 px pada baris ke-1).
- Hijau aksen: "$6.4B" t 6,0 `#60DDB2`; "agentic" t 17,0 `#67E6AE`. Hijau angka statistik: tidak tersampel (kotak meleset), terlihat sama secara visual.
- Footage: langit atas `#77939F`–`#78949F`, cakrawala `#ACB0B3`, rumput `#162418`; t 9,0 langit kiri `#6B8791`, tengah `#7C97A2`, kanan `#64808B`.

## Gerak antar-frame (ORB 2000 + estimateAffinePartial2D, RANSAC 3 px)
0,5→1,0 ×0,450 · 1,5→2,0 ×1,030 · 2,0→2,5 ×1,718 · 4,5→5,0 ×0,829 · 5,5→6,0 ×0,742 · 6,5→7,0 ×1,250 · 8,0→8,5 dx −8,8 % · 8,5→9,0 ×0,334 · 9,5→10,0 dx +16,6 % · 11,0→11,5 dy −7,2 % · 11,5→12,0 dy −4,0 % · 12,5→13,0 dy −3,4 % · 13,5→14,0 dy −8,3 % · 14,0→14,5 dy −2,6 % · 15,5→16,0 dx −16,7 % · 18,0→18,5 ×2,582. Sisanya ×1,000–1,009, |d| ≤ 2,5 %.
Catatan: lompatan dengan inlier < 30 (7,0→7,5; 2,5→3,0) adalah cut, angkanya diabaikan.

## Cut & ritme
- ffmpeg `select=gt(scene,0.25)`: 1,04 · 3,21 · 3,63 · 4,92 · 5,88 · 7,58 · 8,96 · 9,79 · 15,75.
- `pace_read.py`: 7 cut, 19,9/menit, median 1,5 dtk, gerak layar 2,2, event visual 46/menit.

## Audio
- ebur128: I −14,1 LUFS, LRA 7,7 LU, true peak −2,9 dBFS. earshot: −14,0 LUFS, LRA 6,1, TP −2,9 dBTP, hening 18,75–21,02 (−61 LUFS).
- librosa: tempo 107,7 bpm, beat pertama 1,04 dtk, 50 onset. earshot: ±109 bpm, clarity 0,35, 117 event, 65 % cut ≤ 1 frame dari onset.
- RMS per 0,5 dtk: −11 sampai −29 dB selama musik; −77 dB setelah 19 dtk.

## Skrip
- `skrip/m67.py` (bbox kartu + warna), `skrip/t67.py` (pita baris teks), `skrip/g67.py` (tinggi per glyph via kolom tinta, |piksel − median| > 45–60), `skrip/c67.py` (gerak global). Python `~/work/mg-venv/bin/python` (cv2, numpy, PIL, librosa).

## Batas ketelitian
- 720p: 1 px = 0,14 % tinggi, 0,08 % lebar. Glyph yang bersentuhan terbaca sebagai satu (mis. "$" + digit); kotak ukur dipilih manual.
- Frame tiap 0,5 dtk: ukuran pada adegan yang sedang zoom hanya sesaat (k2, k5).
- Label SFX dari earshot adalah tebakan CLAP; SFX menyatu dengan musik sehingga tidak dipisah.
- Font: perkiraan visual, tidak terukur.
