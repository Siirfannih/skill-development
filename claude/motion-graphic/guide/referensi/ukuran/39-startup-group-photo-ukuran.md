# 39 · Data ukur mentah

Sumber: `.../instagram/7a31e0dadfa29ad9bde7/video.mp4` · 1276×718, 24 fps, 80,245 dtk, audio 44,1 kHz.
Frame: PNG penuh lewat `ffmpeg -ss t -frames:v 1` (work/full/), sheet 0,5 dtk (frames/, 160 frame).

## Teks (work/measure.py: bbox piksel putih min RGB>thr & selisih kanal<30, atau gelap max RGB<thr, dalam ROI %)
| Frame | Teks | h % | w % | cx % | cy % | px |
|---|---|---|---|---|---|---|
| k1 t10.5 | "next to" (asc) | 3,48 | 8,9 | 42,2 | 7,0 | 25 |
| k1 t10.5 | "Paul Gra" (semi-transparan) | 13,23 | 32,4 | 53,7 | 16,4 | 95 |
| k2 t57.0 | "Five thousand more" | 4,04 | 26,7 | 52,3 | 49,9 | 29 |
| k2b t25.5 | "the largest private round" (asc+desc) | 5,01 | 33,0 | 49,1 | 49,9 | 36 |
| k3 t68.5 | "before it" | 3,90 | 11,0 | 41,0* | 49,8 | 28 |
| k4 t16.0 | "$43 Million" (incl. $) | 12,12 | 42,6 | 49,9 | 49,9 | 87 |
| t13.5 | "customers" (x-height) | 10,17 | 38,6 | 49,6 | 49,6 | 73 |
| k5 t1.5 | "important" (asc+desc) | 5,85 | 15,7 | 14,2 | 49,4 | 42 |
| k6 t60.0 | "built fifteen companies" | 5,29 | 36,3 | 46,9 | 49,5 | 38 |
| k7 t74.0 | "USVC" biru | 15,18 | 28,5 | 50,0 | 49,7 | 109 |
| t77.5 | "comment" / "GUIDE" | 5,15 / 9,75 | 29,8 / 30,2 | 50,7 / 50,5 | 45,3 / 52,7 | 37 / 70 |
| k8 t79.0 | "for" / "2026" | 4,60 | 4,2 / 4,9 | 37,2 / 64,4 | 51,4 | 33 |
*frasa belum lengkap; frasa penuh di sheet terpusat.
Gagal/dibuang: "in history" t26.0 (teks sedang memudar), "with the" t9.5 (ambang), "The PayPal Mafia" 10 % (tercemar latar terang; dari mata ±5 %).

## Subjek (bbox dibaca dari frame penuh, mata + koordinat piksel)
- k1 t10.5: Sam x 240–780 (42 % lebar), y 150–718 (79 %); Paul x 760–1276.
- k5 t1.5: kartu foto x 328–962 (49,7 %), y 170–540 (51,5 %), pusat 50,6/49 %.
- t58.5 kartu PayPal: x 348–919 (44,7 %), y 143–616 (66 %).
- k8 folder (mask oranye R>200,B<90): 21,0 × 18,7 %, pusat 46,7/51,9 %.
- Saturasi (HSV S>45): t9.5 28,3 %, t10.5 27,1 %, t37.5 23,5 % frame.
- Ketajaman Laplacian t10.5: latar abu 12–15, tokoh 11–13 → tokoh tidak lebih tajam; pemisah = warna + skala, bukan fokus.

## Warna (rata-rata patch 24×24 px)
- Kartu putih t26/t74/t79: pusat (50,25) `#FAF7FB`, tepi kiri `#D6D3D7`, sudut `#CDCACE`, bawah `#F0EDF1`. t1.5: pusat `#E9E1DC`, sudut `#C6C3C7`.
- Kartu hitam t25.5: `#000000`. USVC median `#1785FC`. Folder median `#E0842A`.
- Grain (std high-pass): kartu putih 0,44, hitam 0,0, arsip 1,7–5,8.

## Cut & kamera (work/cam.py)
- `ffmpeg select='gt(scene,0.25)'` → 125 titik; gabung <0,2 dtk → 99 shot, median 0,58 dtk, 74,1/menit.
- ORB 1500 + estimateAffinePartial2D (RANSAC 3 px) antara awal+0,1 dan akhir−0,1 shot ≥0,6 dtk: push 9 (+7…+13 %, tx −5…−7 %, ty −4 %), pull 2 (−29 %, −7 %), pan 8, diam 8; 26 shot datar/tak cocok (kartu polos, kilat, kolase).

## Audio
- ebur128: I −14,4 LUFS, LRA 4,7 LU (−16,4…−11,7), true peak −0,6 dBFS.
- earshot timeline --detail high: 541 onset (6,8/dtk), 18 whoosh, 16 hit, 9 UI, 3 riser, 3 drum; 92 % cut ada onset ≤100 ms; 5 babak musik.
- pace_read.py: 111 cut = 83,0/menit, median 0,5 dtk, event 86/menit, 4,2 suku kata/dtk.
- librosa beat_track (wav mono 22,05 kHz): 103,4 bpm total; 0–8,8 dtk 123; sisanya 103.

## Batas ketelitian
- 1 px = 0,14 % tinggi; bbox memasukkan ascender/descender, jadi tinggi kapital murni ±15 % lebih kecil.
- Teks di atas footage terang bisa tercampur piksel latar; angka diperiksa dengan mata di frame penuh.
- Estimasi kamera gagal pada kartu polos dan shot <0,6 dtk; skala ORB ±1 %.
- Label earshot = petunjuk, bukan identifikasi pasti. Font = perkiraan visual, tidak terverifikasi.
