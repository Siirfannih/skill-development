# 48 · Data ukur mentah (11 Nov 2026)

Sumber: `.../instagram/45e4aeed870f1296a833/video.mp4` · 720×1280, 12 fps, 59,67 dtk, audio 44,1 kHz.
Frame: `frames/f0001–f0119.jpg` (tiap 0,5 dtk; fN = (N−1)×0,5 dtk). Sheet: `sheet.jpg` (tiap 2 dtk, 8 kolom).
Skrip (di `work/`): `measure_yellow.py` (kotak kuning: HSV h20–38, s>150, v>200, komponen terbesar, rasio lebar>2,2×tinggi; teks = piksel <90 di dalam kotak), `measure_lines.py` (profil baris teks per area: bright >200, dark <70, yellow HSV), `camera.py` (ORB 3000 + estimateAffinePartial2D RANSAC, frame awal+0,17 dtk vs akhir−0,17 dtk).

## Frame kunci (keyframes/, 720×1280)
| Kunci | t | Ukuran |
|---|---|---|
| k1 objek-warna | 3,0 | "are" putih: x-height 2,27 %, y 19,8 %, x 30–39 %; dolar y ±26–70 % (44 % tinggi), lebar terpotong tepi |
| k2 kolase-kertas | 6,5 | (f13) kotak W 39,6 % H 3,59 % cx 49,9 cy 52,1; teks 3,12 %; kotak `#FBFF2F`; latar tengah `#FDFDFD`, L tengah 229/sudut 181 |
| k3 arsip-caption-kuning | 12,5 | (f26) kotak W 33,8 % H 4,14 % cx 50,8 cy 49,6; teks 3,20 %; patch foto `#A8A8A8`; L 129/81; sat median 0 |
| k4 gelap-teks-bebas | 17,5 | (f36) "Christian" kuning glow: tinggi 3,91 %, x 12,9–41,5 %, y 51,1 %; "suddenly turn" putih baris 2,66 % + 0,86 %, x 17–33 %; latar `#2A2A2A`, L 80/30 |
| k5 kotak-merah | 21,5 | (f44) kotak merah x 36,8–63,6 % (26,8 % lebar), y 47,6–51,2 % (3,6 %), `#C6384D`; sat median 13 |
| k6 tahun-besar | 37,5 | (f76) "1954" kuning: tinggi 6,95 %, lebar 26,2 %, x 36,9–63,1 %, y 45,9 %; "one sunday" 1,25 % y 44,1 %; latar `#EEEEEE`, L 238/186; grain std 0,3 |
| k7 split-teks-inset | 40,5 | (f78) "he was sitting in" hitam 3,52 % (naik–turun), lebar 36 %, y 22,4 %; (f82) "preacher" ±5,6 % dan "when/the/told" ±1,9 % dari montase 1/3 skala (perkiraan, ukur otomatis tergabung dengan foto); inset lingkaran ±29 % lebar |
| k8 koran-sorot | 51,5 | (f104) kotak kuning tinggi 3,83 %, x 30,6–68,2 %, y 58,2 %; teks hitam 2,27 % |

## Statistik kotak kuning (59 dari 119 frame)
- Tinggi teks (naik–turun) min 2,50 (q1) · median 3,20 · maks 3,98 %; tinggi kotak median 3,83 % (3,20–5,00).
- Lebar kotak 24,4 · median 37,5 · 55,1 %. Pusat x 47,8–50,8 % (satu 71 % = frasa terbelah). Pusat y: 36 frame di 48,8–53,0 %, 23 frame di 60,1–60,7 %.
- Warna kotak `#F3FA2D`–`#FAFE37` (sampel tepi kiri; nilai `#CACD34`/`#DADC2E` = frame saat kotak sedang masuk/memudar).

## Cut dan kamera
Scene 0,25: 5,17 7,50 12,08 13,33 15,00 18,58 19,42 23,17 24,42 24,67 25,42 27,75 31,17 33,17 36,25 38,25 44,50 47,17 50,17 51,33 53,92 57,67 → 22 cut, 23 shot, median 2,33, rerata 2,59, min 0,25 (kilatan putih L 209), maks 6,25 dtk.
Gerak (skala / tx % lebar / ty % tinggi / inlier):
- push-in: 25,4–27,8 +18,1/−0,4/−9,0 (1310); 27,8–31,2 +24,4 (12, lemah); 33,2–36,3 +15,7/−19,9/−7,9 (645); 47,2–50,2 +13,6 (765); 50,2–51,3 +10,7 (659); 51,3–53,9 +9,5/+12,5 (638); 24,7–25,4 +6,8.
- pan: 12,1–13,3 tx −10,7 (1548); 13,3–15,0 tx −17,1 (1274); 31,2–33,2 tx −11,6, skala +4,0.
- diam (<3 %): 5,2–7,5 (tx 13 % = kolase geser), 18,6–19,4, 23,2–24,4, 36,3–38,3, 38,3–44,5, 44,5–47,2, 53,9–57,7, 57,7–59,7.
- komposit/morf (inlier <15, angka tidak dipakai): 0–5,2, 7,5–12,1 (dolar → kolase), 15,0–18,6 (rosario), 19,4–23,2.

## Audio
- ebur128: I −14,1 LUFS, LRA 3,1 LU (−15,0 s/d −11,9), true peak −0,1 dBFS.
- librosa (wav 22,05 kHz): bpm 107,7; onset 4,9/dtk; perkusi HPSS 26 %; chroma teratas E, D#, D; RMS per 5 dtk −18 −18 −15 −16 −18 −17 −18 −17 −18 −18 −17 −19 dB.
- pace_read: 19 cut (19,1/menit), shot median 3,0, gerak layar 4,9, event visual 32/menit, 4,7 suku kata/dtk, kategori energi.
- earshot timeline --detail high: seksi 0–4,6 house+pizzicato; 4,6–15,3 house+electric piano; 15,3–59,6 house+strings; event: 71 UI ("chat message pop"), 14 VOICE, 5 HIT (sub bass drop), 5 NOTE (celesta), 1 KEY. Pop 66–160 ms, +12–17 dB di atas bed.

## Batas ketelitian
- 720p: 1 px = 0,078 % tinggi, 0,139 % lebar; huruf kecil bisa meleset ±10 %. JPEG frame q3.
- 12 fps: easing dan durasi masuk/keluar teks tidak terukur di bawah ±83 ms.
- Tinggi teks dalam kotak = naik–turun huruf (bukan x-height). Kata lepas-kotak di atas foto ramai diukur dari montase (perkiraan, ditandai).
- Gerak kamera: affine global; shot komposit berlapis (inlier rendah) tidak dapat dipisah per lapis. Paralaks tidak terukur.
- Level musik vs suara dan tag SFX: tanpa pemisahan stem; tag earshot CLAP lemah.
