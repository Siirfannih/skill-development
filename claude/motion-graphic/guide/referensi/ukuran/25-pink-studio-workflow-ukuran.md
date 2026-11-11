# 25 · ukuran mentah (11 Nov 2026)

Sumber: `siirfannih_DcvVp-Qof2x.mp4`, 1276×718, 24 fps, 26,44 dtk, audio 44,1 kHz. Frame penuh diambil `ffmpeg -ss t` ke `full/`.

## Teks (bbox mask warna; % terhadap 718 px tinggi / 1276 px lebar, kecuali disebut)
| t (dtk) | teks | mask | bbox px | tinggi | lebar | pusat x,y |
|---|---|---|---|---|---|---|
| 6.5 (k2) | "Publish" huruf | saturasi | x700-879 y161-289 | 18,0 % (32 % area 403 px) | 14,1 % (huruf saja) | — |
| 8.0 | "IT'S LIVE!!!" | putih | x16-255 y522-579 | 11,3 % area 514 px (cap ±7 %) | 18,8 % | 11 %, 87 % |
| 14.5 (k3) | "many" 3D | pink | x315-810 y400-493 | 13,1 % | 38,9 % | 44 %, 62 % |
| 16.5 (k4) | "Answers" | putih | x304-974 y292-428 | 19,1 % (cap visual ±16 %, termasuk awan) | 52,6 % | 50 %, 50 % |
| 16.5 | "and easy workflows" | — | mask gagal; visual | ±4,8 % penuh, x-height ±2,7 % | ±28 % | 63 %, 61 % |
| 17.5 | "One course / Teaches Full" | gelap | x47-201 y605-660 | 7,8 % (2 baris) | 12,1 % | 10 %, 88 % |
| 21.0 (k6) | "Go beyond tutorials." | gelap | x500-859 y289-339 | 7,1 % bbox, x-height 2,5 % | 28,2 % | 53 %, 44 % |
| 21.75 | "start!!!!!" | magenta | x443-844 y311-389 | 11,0 % | 31,5 % | 50 %, 49 % |
| 22.25 | "Building" | gelap | x567-749 y336-381 | 6,4 % | 14,3 % | 52 %, 50 % |
| 22.9 (k7) | "Real" | magenta | x0-1275 y48-657 | 85,0 % | 100 % (terpotong) | 50 %, 49 % |
| 23.3 | "projects" | pink | x562-713 y341-376 | 5,0 % | 11,9 % | 50 %, 50 % |

## Subjek (mask pink/ungu)
- 6.5 tombol Publish: y159-559 x380-1275 → 56 % tinggi (penuh area letterbox), 70 % lebar.
- 16.5 payung (+teks pink): 33 % × 29 %; payung saja visual ±22 % lebar.
- Letterbox (baris rata-rata luma ≤ 12): 5,0 dtk 25/24 px; 5,5 152/151; 6,0–7,0 158/157; 7,5 121; 8,0 102; 8,5 97/96; 9,0 0/96; 9,5 14/14.

## Warna (rata-rata 8×8 px atau median mask)
meja ungu `#C591D9`/`#D2A4DD` · tombol `#C36DCC` · kursor `#A83CAB`/median `#9139A5` · langit `#C4D8DF` · latar datar tengah `#F2F1ED`, sudut `#DCD7D4` · UI `#F0EFEB` · penutup `#E5E3E6`, pita bawah `#8C898C` · "Real" `#E2177E` · "start" `#E00AE1` · "projects" `#D13277` · teks gelap `#1F183A` · logo `#E75776` · pil `#3E8BAB` · "workflows" `#C662BB` · latar "many" `#E8A494` (bloom hangat).

## Cut (beda absolut luma + korelasi histogram tiap frame 320 px)
Keras: 3.167, 9.17–9.33 (letupan), 11.33–11.58 (letupan), 13.375, 15.50–15.75 (letupan warna terbalik), 21.5–21.96 (kedip start), 22.54 (Real masuk), 23.042/23.125. ffmpeg scene>0.25: 3.17 9.17 11.33 11.42 15.5 15.58 15.63 21.58 21.67 23.13.
Daftar shot (dtk): 3.17, 2.2, 2.1, 1.58, 2.25, 2.05, 1.2, 0.9, 1.8, 1.3, 1.4, 0.4, 1.1, 0.25, 0.35, 0.44, 0.59, 0.38, 2.94 → median 1,3.

## Kamera (ORB + estimateAffinePartial2D, langkah 0,25 dtk, akumulasi)
S1 meja ×0,50 rot −28° · S2 ruang ×0,61 rot −36° · S3 Publish ×1,61 · S4 laptop ×0,71 rot +19° · S5 marker ×0,70 (2/8 langkah valid) · S6 papan ×0,97 rot −50° · S7 pita ×1,59 (1/5 valid) · S8 many ×0,96 · S9 payung ×1,01 · S10 payung+halaman ×0,90 · S11 folder ×1,02 · S13 UI ×0,70 · S16 Real tx −15 % · S18 logo ×1,05.

## Audio
- ebur128: I −14,7 LUFS, LRA 4,1 LU, true peak −0,5 dBFS. earshot: −14,9 LUFS, TP −0,8 dBTP, 3 babak (−17 / −13 / −16 LUFS), 143 event, label 45 whoosh / 26 drum / 13 hit / 7 foley / 1 riser / 1 key / 1 ui; ±88 bpm pulsa lemah 0,21.
- librosa: 107,7 bpm, 120 onset (rapat 0,12–0,14 dtk di 7–24 dtk = not 1/16), harmonik:perkusif energi 1,19, kroma C#/F/D#.
- pace_read.py: 10 cut, 22,7/menit, median 2,2 dtk, event visual 59/menit, kategori energi.

## Skrip
`/tmp/meas25.py` (bbox teks), skrip inline Python (cv2 cut/letterbox/ORB, hex, librosa), ffmpeg ebur128/scene, `earshot timeline --detail high` → `earshot.txt`, `scripts/audio/pace_read.py`.

## Batas ketelitian
1 px = 0,14 % tinggi. Kata putih di langit dan kata kecil berwarna: mask tidak bersih, angka visual ±15 %. Kamera: render 3D dengan paralaks dan objek bergerak membuat ORB kasar; shot dengan < 3 langkah valid hanya arah, bukan besaran. Label earshot = petunjuk; "drum" bisa bagian musik, bukan SFX terpisah. Font: perkiraan visual, tidak dicocokkan glyph.
