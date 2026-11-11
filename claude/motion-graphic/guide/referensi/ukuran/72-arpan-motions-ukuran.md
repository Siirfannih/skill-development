# 72 · arpan.motions: data ukur mentah (11 Nov 2026)

Sumber: `arpan.motions_DfCMjSySmJd.mp4`, h264 720×1280, 30 fps, 22,42 dtk, AAC 48 kHz.
Tata letak (baris kecerahan f013): panel storyboard y 8–414, garis hitam 415–422, **panel final y 423–832 (720×410, 16:9)**, panel CTA y 834–1280. Semua % di bawah terhadap panel final.

## Skrip (folder `scripts/`)
- `diff.py`: beda absolut rata-rata per frame panel final (180×102) → pergantian adegan.
- `measure.py`: mask warna (hijau tua g−r>40 & g<165; putih min>215–235) dalam ROI ketat → bbox, baris, warna median; median 30×35 px untuk hex latar.
- `cam.py`: ORB 2000 + `estimateAffinePartial2D` RANSAC antara frame awal/akhir tiap shot.
- ffmpeg `select=gt(scene,0.15)` per panel; `ebur128=peak=true`; earshot `timeline --detail high`; librosa beat/onset/RMS; `pace_read.py`.

## Teks (bbox mask)
| t (dtk) | isi | tinggi % | lebar % | pusat (x,y) % | warna median |
|---|---|---|---|---|---|
| 1,2 | "Netherl" (putih) | 23,7 | 82 (keluar tepi) | 59, 22 | #F9FBFC |
| 5,5 | "and still arrive" | 5,6 | 25,1 | 50, 50 | #60967C (anti-alias) |
| 6,2 | "unsettled" | 13,2 | 39,0 | 50, 49 | #41936C |
| 9,5 | "and a dedicated" | 5,6 | 30,7 | 51, 50 | #5A9275 |
| 11,0 | "coordinator" di kartu | 7,8 | 29,0 | 50, 50 | #458767 |
| 17,6 | "You always know" (ada huruf turun) | 7,1 | 31,1 | 51, 52 | #699C82 |
| 18,2 | "the next" (masuk per kata) | 5,1 | 14,9 | 45, 50 | #6C9D83 |
| 19,5 | pil "one message away" | 14,6 | ±41 | 50, 50 | #2C8856 |
| 21,8 | "relocate" outline | ±20 (baca koordinat) | ±49 | ±58, ±49 | garis #C5B7A0 |
Mask gagal: "Most students" (putih semi-transparan di awan), teks putih di pil, "relocate" (Canny); diisi dari koordinat piksel bila ditulis "±".

## Skala objek (koordinat piksel pada crop 720×410)
pesawat x 115–540, y 135–270 (59×33 %) · bar cari x 160–567, y 62–107 (57×11 %) · ponsel oranye #CC7D30 x 201–520 (44 %), atas 4,6 %, keluar bawah · kartu coordinator x 230–495, y 90–325 (37×57 %) · lingkaran ±440 px (61 % lebar) · pil x 215–512, y 175–235.

## Hex latar (median)
langit 0,4–2,8 dtk: atas #2E9EFB, kiri-atas #BADDFD · lanskap 4,0: #C69A67 / #CE7552 · gradien 5,5–19,5 (identik): pita atas #D4E2D6, tengah #F4F4ED, bawah-tengah #6BAC86, kanan-bawah #BED6C4 · coordinator 10,5: #6DE4A3 / #2A8654 / #9DE7BD · penutup 21,8: #1A1812, #110F0D, #735732 · storyboard ±#F7F7F7 (kecerahan 247).

## Pergantian adegan (panel final)
ffmpeg 0,15: 1,43 3,47 4,67 6,47 6,6 10,03 11,17 20,97 (panel storyboard: +5,93 8,93 11,3 12,9 14,63 17,27).
diff.py puncak: 1,43 (41, meluruh 0,45 dtk) · 3,47 (62) · 4,50–4,67 (naik lalu 62) · 6,47–6,6 (56) · 10,03 (59) · 11,17–11,5 (41, meluruh) · 17,23 (12) · 20,97 (146).
Pergantian lembut dari sheet 0,5 dtk: ±5,9 (→unsettled), ±8,9 (→simbol), ±17,3, ±18,0, ±18,5.
Shot (dtk): 1,43 · 2,04 · 1,2 · ±1,3 · ±0,5 · ±2,4 · ±1,1 · 1,14 · ±6,1 · ±0,7 · ±0,5 · ±2,5 · 1,43 → 13 shot, median ±1,3.

## Kamera (cam.py; dipercaya hanya bila inlier > 40 %)
lanskap 3,5–4,5: skala −5,0 %, tx +2,5 % (357/752) · unsettled: +0,4 % (502/593, diam) · coordinator 10,07–11,15: +7,6 %, tx −3,6 %, ty −4,0 % (413/523) · relocate 21,0–22,3: tx −18,5 % (77/138). Lainnya inlier < 25 % (latar gradien tanpa fitur, objek bergerak sendiri): tidak terukur.

## Audio
ebur128: −14,2 LUFS, LRA 1,7 LU, true peak +0,8 dBFS. earshot: −14,3 LUFS, TP −0,0 dBTP, ~110 bpm (clarity 0,16), house + vocal chop, VO narasi, 157 event (41 ui, 33 hit, 15 voice, 4 foley, 2 note, 1 key). librosa: 117,5 bpm, onset 5,76/dtk, RMS p10/p50/p95 −23,0/−17,2/−12,2 dB, centroid 2316 Hz, porsi <200 Hz 0,17 · 200–2k 0,42 · >2k 0,41. RMS per 2 dtk: −15,4 −16,0 −17,9 −16,6 −17,8 −16,1 −15,6 −17,1 −16,6 −16,9 −14,4 −19,4.
pace_read.py (frame penuh): 1 cut, event visual 35/menit, 4,6 suku kata/dtk (proxy) → tidak mewakili panel final.

## Batas ketelitian
720 p, panel final 410 px: 1 px = 0,24 % tinggi. Tinggi teks = bbox huruf naik–garis dasar (atau huruf turun bila ada), ±10 % untuk kata < 6 %. Warna teks median ter-campur anti-alias (lebih pucat dari isi huruf; isi huruf ±#2C8856). Font dari mata, bukan identifikasi. Level SFX/musik terhadap VO tidak terukur (tanpa pemisahan stem).
