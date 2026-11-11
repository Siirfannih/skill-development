# 79 · data ukur mentah (siirfannih_De_sF8lT-79.mp4)

Sumber: 1276×718, 30 fps, 82,13 dtk, audio 44,1 kHz stereo. Frame tiap 0,5 dtk → `frames/f0001..f0164.jpg` (fN = detik (N−1)/2).

## Teks (work/measure2.py: mask putih min(RGB)>170 & saturasi<60, atau gelap max<70; tinggi bbox = baris ≥2 px; x-height = pita baris dengan cakupan >45 % puncak)
| Frame | Isi | bbox tinggi %H | x-height %H | lebar %W | pusat (x,y) % |
|---|---|---|---|---|---|
| f5 (2,0 s) | "Bosku." + cutout wajah | 22,8 | 16,9 | 53,6 | 39, 47 |
| f11 (5,0) | "taruhan." kartu | 22,6 | 16,7 | 66,2 | 50, 50 |
| f20 (9,5) k1 | "ngaku" di atas wajah | 26,2* | 26,2* | 22,0 | 20, 50 |
| f20 | caption "gak" | 7,0 | 4,0 | 6,8 | 50, 82 |
| f33 (16,0) k4 | "MENJIJIK" kartu merah | 22,7 | 16,3 | 55,8 | 34, 53 |
| f37 (18,0) | caption "di" | 4,5 | 4,2 | 2,4 | 34, 80 |
| f53 (26,0) k5 | judul serif "Selamat pagi, Irfan" | 7,2 | 3,6 | 32,9 | 50, 26 |
| f53 | teks prompt | 2,8 | 1,9 | 20,6 | 27, 55 |
| f58 (28,5) k7 | "aku." di papan (gelap) | 13,1 | 9,5 | 19,8 | 50, 28 |
| f67 (33,0) k6 | "nyusun storyboard" | 9,5 | 5,4 | 48,2 | 45, 17 |
| f75 (37,0) | "bottleneck." di dada | 15,6 | 10,9 | 58,4 | 50, 73 |
| f91 (45,0) | "Nyebelin." di atas maskot | 15,0 | 8,8 | 38,8 | 50, 24 |
| f99 (49,0) | caption "hitungan" / "menit," | 5,7 / 5,6 | 3,2 / 3,2 | 13,1 / 9,6 | 45 / 57, 81 |
| f105 (52,0) k3 | "LAYAK" kartu | 36,5 | 36,5 (kapital) | 94,4 | 51, 50 |
| f122 (60,5) | "20" kartu | 44,8† | 37,5 | 40,1 | 51, 53 |
| f147 (73,0) | "resign." | 23,5 | 14,3 | 46,0 | 50, 51 |
| f160 (79,5) k8 | end card 2 baris / baris 1 | 23,4 / 8,9 | – / 5,6 | 55,2 / 44,6 | 50, 40 / 50, 33 |
*tercemar flare lampu di kiri atas; dari sheet ukuran penuh "ngaku" ±24 % bbox, x-height ±14 % (baca visual). †termasuk glow.

## Warna (median petak 8×8 px)
- Kartu hitam `#010002` (pojok dan tengah); glow bawah `#0F106A` (f105), `#131898` (f122); f11 tanpa glow di baris 690–712.
- Huruf "LAYAK": atas `#F7F7FB`, tengah `#FEFEFE`, bawah `#F3F8FB`.
- Merah f33: `#97001C` (kiri atas) → `#7E001A`/`#72001A` (kanan bawah). Oranye f160 `#F1541D` rata. Maskot `#CA614E`.
- UI chat f53 `#F8F7F3`/`#F6F5F1`. Wajah f20: flare `#C3A4AC`, dinding `#21211F`, bawah `#3A2720`.

## Skala objek (mask warna, persentil 0,5–99,5)
- Maskot + tangan f58: 29,7 × 46,2 % (pusat 50, 62). Maskot f91: 22,3 × 26,3 %.
- Kartu chat f53: 69,6 × 18,5 % (pusat 50, 58). Kartu jawaban ChatGPT f67: 38,6 × 8,2 % (pusat 51, 88). Tile ikon ±16–21 × 29 %.
- Wajah: tidak terukur otomatis (venv cv2 tanpa CascadeClassifier); baca visual ±50 % tinggi.

## Kamera (work/cam.py: ORB 2000 + estimateAffinePartial2D RANSAC, frame awal+0,1 s vs akhir−0,15 s tiap shot)
Andal (inlier ≥ 50 %): 0,8–1,4 s +1,2 % (diam); 1,4–2,5 +7,6 %; 5,5–8,0 +7,9 %; 39,3–42,5 +10,9 %; 42,5–44,8 −7,3 %; 44,8–47,7 +12,8 %; 49,8–51,3 tx −11,5 %W (pan); 55,7–60,6 +11,0 %; 73,6–74,9 +6,8 %. Kartu kata (inlier rendah, isi berubah): 4,8–5,5 +21,6 %; 16,0–16,6 +22,2 %; 51,3–52,3 +22,2 %; 54,9–55,7 +21,3 %. Shot berisi cut internal/animasi besar (inlier < 15 %) dibuang.

## Ritme
- ffmpeg scene>0,25: 34 shot, 24,1 cut/menit, median 2,32 s, min 0,30, maks 7,93.
- pace_read.py: 32 cut = 23,4/menit, median 2,5 s, gerak layar 4,3, event visual 44/menit, laju bicara 6,5 suku kata/dtk (proxy).

## Audio
- ebur128: −14,1 LUFS, LRA 1,0 LU, true peak −1,9 dBFS.
- earshot timeline --detail high: 6 seksi (techno? 0–7,9; tech house 7,9–17,5; house 17,5–65,8; techno? 65,8–77,2; funk 77,2–82); 614 onset, 96 tag (27 hit, 25 voice, 13 whoosh, 8 key, 8 note, 5 ui, 5 foley, 5 drum); aksen terkuat 0:19,74 +38 dB, 1:14,18 +35 dB, 1:00,38 +31 dB; 53 cut, 91 % ada onset ≤ 100 ms, median 24 ms. BPM ±98/196, clarity 0,22.
- librosa: 99,4 bpm, PLP 0,19; transien pita >6 kHz 23 (16,8/menit) di 1,9 4,6 9,8 18,1 19,9 35,2 37,8 73,5 … ; RMS per 6 s −16,2 sampai −18,0 dB (rata).

## Batas ketelitian
- 1 piksel = 0,14 %H / 0,08 %W; JPEG q3 dan motion blur huruf menggeser tepi ±1–2 px; kata kecil (caption) ±10 %.
- Frame 2 fps: animasi masuk per huruf (< 0,5 s) hanya tertangkap sebagian; durasi animasi dalam frame tidak terukur.
- Font dicocokkan visual, bukan dari metadata. Level musik vs suara tidak terukur tanpa stem.
