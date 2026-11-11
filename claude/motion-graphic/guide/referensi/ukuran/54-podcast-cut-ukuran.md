# 54 · Podcast_cut.mp4 — data ukur mentah (11 Nov 2026)

Sumber 720×1280, 23,976 fps, 21,97 dtk, audio 48 kHz stereo. Trailer tampil di viewer After Effects yang difoto HP.
Sudut panel (frame HP, dari kartu putih f_036 via kontur): TL (232,432) TR (662,432) BR (632,724) BL (200,688).
Diluruskan ke 960×540 (`scripts/m54_rect.py`) → semua % di bawah relatif terhadap panel 16:9 itu.

## Teks per frame kunci (tinggi tinta / glyph, % tinggi panel; pusat % lebar)
| Frame | Isi | Ukuran | Pusat / lebar |
|---|---|---|---|
| k1 f_002 (0,5 dtk) | "Everything" + "around you" | tinggi tinta 6,9 | y 39–46 %, blok 14–85 % (mengapit TV) |
| k2 f_008 (3,5) | "By People" | B huruf besar 7,0; e x-height 5,2; tinta 8,7 | cx 50,1, lebar 24 % |
| f_010 (4,5) | "no smarter" | tinta 6,5 | cx 50,0, lebar 26 % |
| f_013 (6,0) | "for a new industry" | d ascender 4,8 (latar salju terang, kurang pasti) | cx 49,9, lebar 45 % |
| f_016 (7,5) | "energy" | e x-height ±6,9 (termasuk tepi blur) | cx 49,9, lebar 17 % |
| f_018 (8,5) | "The future of currency" (redup) | tinta 7,6; currency x-height 5,0 | cx 50,3, lebar 53 % |
| k4 f_021 (10,0) | "just be" (be hijau) | be ascender 13,3; e x-height 9,8 | cx 51,2, lebar 30 % |
| k3 f_022 (10,5) | "Wattage" | W huruf besar 10,9 | cx 49,8, lebar 34 % |
| f_026 (12,5) | "Nuclear" | tinta ±14 (termasuk latar terang) — tidak dipakai | cx 49,8 |
| k6 f_036 (17,5) | "the sun" | sun x-height 7,4; the t–h 10,0 | sun cx 56,3 |
| k7 f_040 (19,5) | "100%" + "of all" | digit 25,2; of all (l) 8,0 → 3,15× | cx 50,2, lebar 49 % |
| k5 f_042 (20,5) | "it's really" | tinta 8,7 | cx 76,4, y 40–48 % |
| k8 f_015 (frame HP) | caption kuning luar | huruf besar 19 px = 1,5 % tinggi HP | y 16 %, lebar 78 % |

## Warna (median petak 12×12 px, panel diluruskan)
- Hitam f_022 pusat `#050505`, sudut `#030303` (luminans 3,0 vs 3,0 → tanpa vignette); f_018 `#000000`.
- Putih f_036 pusat/sudut `#FFFFFF`. Kata redup "the" luminans min 209, "sun" 101.
- Langit f_040: atas `#AB636E`, tengah `#2C345E`, bawah `#323665`. Hijau "be" `#4CB487` (2425 px).
- Teks redup di hitam: persentil 99 luminans 72 (≈`#484848`). Caption luar kuning `#CBBE3D`.

## Cut & gerak (`m54_cut.py`, `m54_shots.py`)
- Cut = korelasi histogram HSV < 0,4 DAN selisih piksel rata > 20, di panel 480×270. 45 cut, 46 shot, median 0,29 dtk, 123,5 cut/menit, 15 shot ≤ 3 frame. Dicek ke strip frame-per-frame (1,0 / 3,8 / 11,0 / 12,2 / 14,2 / 14,9 dtk).
- ffmpeg scene (0,2) di frame HP penuh hanya menangkap 1 cut; pace_read.py membaca 0 cut (panel terlalu kecil) → angka cut dari skrip sendiri.
- ORB + estimateAffinePartial2D frame awal→akhir shot (≥ 8 frame). Dipakai bila inlier ≥ 30: TV 0,00 −12,0 % (155/257); Jobs 2,29 +4,6 % (96/221); currency 8,17 −23,2 % (154/217); Wattage 10,51 −6,8 % (272/338); Huang 16,27 +14,0 % (37/248); Musk 20,44 +9,4 % (119/382). Shot lain diam (±0,3 %) atau tidak andal (inlier < 30: 7,17, 12,97, 14,39, 17,18).

## Audio
- ebur128: −14,0 LUFS, true peak −0,3 dBFS, LRA 2,5 LU. librosa: tempo 123 bpm (lemah), 109 onset, RMS per 0,1 dtk p5/p50/p99 −27,8/−17,5/−11,2 dB.
- earshot `--detail high` (`earshot.txt`): 138 event 6,3/dtk; 47 voice, 20 ui, 10 whoosh, 6 foley, 5 riser, 4 note, 3 hit; pulse clarity 0,07; 92 % cut ber-onset ≤ 100 ms.
- pace_read: 3,9 suku kata/dtk, event visual 52/menit (cut 0 = salah baca, lihat atas).

## Batas ketelitian
- 1 px sumber ≈ 0,35 % tinggi panel (panel ±284 px). Kata kecil bisa meleset ±10 %; pada latar terang (salju, Nuclear) ambang putih ikut menangkap latar.
- Homografi dari satu frame; HP sedikit bergerak, galat posisi diperkirakan < 1 %.
- Warna tergeser layar laptop + kamera HP (kuning caption jelas lebih kusam dari aslinya).
- Skala wajah, TV, matahari: perkiraan visual dari frame lurus, bukan segmentasi.
- Font: dikenali dari bentuk huruf, bukan metadata.
