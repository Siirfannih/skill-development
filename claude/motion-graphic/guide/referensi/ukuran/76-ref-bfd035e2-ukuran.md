# 76-ref-bfd035e2 · data ukur mentah

Sumber: `/home/irfan/work/pustaka-video/mac/bfd035e2-43b5-4465-a49d-df28319e5c85.mp4` · 1080×1920, 24 fps, 19,1 dtk, AAC 48 kHz stereo.
Frame: `frames/` tiap 0,5 dtk (38). Sheet: `sheet.jpg` (tiap 2 dtk), `sheet05.jpg` (tiap 0,5 dtk).

## Per frame kunci (% terhadap 1080×1920)
| Frame | t (dtk) | Saturasi rata (0–255) | Teks (y %, tinggi %, x %) | Hex sampel |
|---|---|---|---|---|
| k1 wajah-warna-caption | 0,6 | 72 | baris y 66,5–69,7; "your" asc–desc 3,28; "o" 2,40 (46 px); kredit y 75,5–77,4 h 1,98 x 13–79 | dinding `#565154`, baju `#523128`, kulit `#653D3B`, meja `#3B2D2C`; kata redup p99 RGB 185/160/147 |
| k2 transisi-ke-abu | 1,62 | ±38 (menurun) | "gray." y 66,1–69,4 x 36–54 | — |
| k3 pendengar-abu | 3,6 | 0 | y 65,2–69,4 h 4,2 | dinding `#525252`/`#797979`, baju `#3A3A3A`; luma pusat 47 / sudut 89 |
| k4 closeup-abu | 7,4 | 0 | y 65,2–69,4 | latar `#3E3E3E`; Laplacian var latar 1 vs wajah 6 |
| k5 statistik-angka | 14,0 | 0 | "1" y 62,40–73,70 h 11,35 (218 px) x 29,0–37,7; "hour" x-h 3,12 (60 px); "back every" y 57,66–59,79 h 2,19; "day" y 77,14–81,15 h 4,06; "7" h 11,35 x 23,8–37,7 | `#484848`, kulit `#555555`; luma pusat 60 / sudut 81 |
| k6 warna-kembali | 17,1 | 72 | y 65,2–68,5 | dinding `#555461`/`#7F747C`, baju `#432822` |
| k7 kartu-penutup | 18,5 | 0 | kalimat y 46,61–50,26 h 3,70 x 12,4–87,1; kredit y 52,34–54,27 h 1,98, maks `#CBCBCB` | latar `#0D0D0D` |

## Waktu
- Cut (ffmpeg scene>0,2 + diff frame): 1,875 · 4,625 · 7,167 · 9,75 (9,833 = gerak lanjutan, dihitung satu) · 10,708 · 16,208 · 16,417 · 17,833. Shot: 1,88/2,75/2,54/2,58/0,96/5,50/0,21/1,42/1,27 → median 1,88.
- Fade ke abu: saturasi 72 (1,33) → 65 (1,42) → 50 (1,54) → 25 (1,67) → 8 (1,75–1,83) → 1 (cut 1,875).
- Fade ke warna: 4 (16,42) → 26 (16,54) → 51 (16,67) → 70 (16,79).
- Blok angka: 0 piksel (12,375) → penuh (12,458): masuk 1–2 frame. Swap 1→7: 15,33→15,375. Keluar redup 16,21–16,42.
- Gerak kamera (cv2 goodFeatures + LK + estimateAffinePartial2D, frame awal vs akhir shot, area caption di-mask): skala +1,1/+1,5/+0,7/−2,2/+1,1/+1,7/−0,2/+3,4/−1,1 %; tx shot 7,17–9,79 = +17,9 % (ikut gerak tubuh), lainnya ≤ 4,8 %.

## Audio
- ebur128: I −14,0 LUFS, true peak −2,1 dBTP, LRA 4,0 LU.
- earshot timeline --detail high: 106 event 5,5/dtk (tag kebanyakan ucapan; AST music 0,00), pulse clarity 0,05, jeda 0,35 dtk di 14,65, ekor sunyi 1,47 dtk (−69 LUFS). Sinkron cut: median offset 26 ms, 2 cut tanpa bunyi.
- pace_read.py: 6 cut, 18,8/menit, median 2,5 dtk, gerak layar 6,4, event visual 47/menit, 7,9 suku kata/dtk.
- librosa beat_track 136 bpm: artefak suku kata, bukan musik.

## Skrip (folder `scripts/`)
- `ukur.py` pita teks putih (min RGB > 238) + saturasi/luma per frame.
- `glyph.py` bbox glyph per wilayah (ambang 225/200/180).
- `warna_kamera.py` hex median per patch, luma pusat/sudut, gerak kamera per shot.
- `sat_frame.py` saturasi + diff per frame 24 fps di sekitar transisi.
- `teks_masuk.py` jumlah piksel teks per frame (watak masuk/keluar).

## Batas ketelitian
- 1 px = 0,052 % tinggi; tinggi glyph ±1–2 px (JPEG q3, tepi antialias). Ambang putih memotong kata redup, jadi kata redup diukur dari baris yang sama saat putih.
- "hour" ascender (h) tidak tertangkap ambang (tertimpa rambut terang); ±4,2 % dibaca dari crop.
- Skala subjek (kepala y %) dibaca dari still, ±3 %; bukan deteksi wajah.
- Font Inter = pencocokan visual (a satu-tingkat, y lurus, angka 1 berbendera), bukan dari metadata.
- Label SFX earshot adalah tebakan CLAP; kesimpulan "tanpa SFX/musik" dari AST + dengar-baca bentuk gelombang, bukan dari stem.
