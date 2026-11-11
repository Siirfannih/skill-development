# 63 · Motiongrapich — data ukur mentah

Sumber: `/home/irfan/work/pustaka-video/unggahan/Motiongrapich.mp4` · 736×414, 30 fps, 32,2 dtk, audio 44,1 kHz.
Frame: `frames/f001…f064.png` (fps 2; fNNN = t (NNN−1)×0,5 dtk). Frame kunci: `keyframes/63-k1…k8-*.jpg` (ffmpeg -ss, q:v 3; lebar asli 736 px).
Skrip: `ukur.py` (bbox teks via ambang luma + median hex), `ukur2.py` (pil, kartu, dock, gerak kamera ORB + estimateAffinePartial2D antar-frame 0,5 dtk), librosa (bpm/onset/RMS/centroid/flatness), `pace_read.py`, ffmpeg ebur128 + scene>0,25.

## Teks (bbox; h,w % frame; cx,cy % pusat)
| Frame kunci | Elemen | h | w | cx | cy | ambang |
|---|---|---|---|---|---|---|
| k2 (f005, 2,0 dtk) | "Your" sendirian | 15,9 | 26,4 | 50,6 | 49,4 | luma<170 |
| k2 (f006, 2,5 dtk) | "Your videos now." | 6,3 | 36,4 | 49,9 | 49,6 | luma<100 |
| k3 (f010, 4,5 dtk) | "Claude" di pil | 4,6 | 11,3 | 51,5 | 48,8 | luma>200 |
| k3 (f010) | pil | 11,1 | 25,0 | 49,9 | 48,9 | 45<luma<90 |
| k5 (f020, 9,5 dtk) | salam serif "Good afternon…" | 5,8 | 41,7 | 33,8 | 32,5 | luma>235 |
| k7 (f040, 19,5 dtk) | prompt chat normal (huruf) | 2,7 | – | 5,1 | 82,9 | luma>150 |
| (f058, 28,5 dtk) | prompt punch-in "g and add sfx and music" | 10,6 | 43,3 | 22,0 | 34,2 | luma>190 (termasuk ekor g) |
| k8 (f062, 30,5 dtk) | logo "invideo editor" 2 baris | 18,1 | 26,2 | 48,5 | 51,2 | luma>200 |
| k8 (f062) | CTA 2 baris | 6,0 | 18,2 | 48,2 | 62,8 | luma>120 |

## Subjek
- Dock (f001): baris 166–233 px → 16,2 % tinggi; lebar ±33 % (dari sheet).
- Kartu setup (f013): 52 × 34 %, pusat (51, 51).
- Strip 4 klip (f024/f025): 32,6–36,2 % tinggi × 33,6–36,0 % lebar, pusat x 39 %.
- Jendela editor (f036): baris 81–332 (60,6 %), kolom 294–735 (59,9 %); f040: 57,2 × 55,6 %. Panel chat kiri 0–293 px = 39–40 % lebar.

## Warna (median potongan)
Putih kartu `#F4EFF4` (atas-kiri), `#FDF8FC` (tengah), `#EEEBEF` (sudut) · biru "Your" `#1986C4` · langit biru `#1887E6` · UI gelap `#09060A`, kartu `#0C090D`, glow bawah `#5B2E06` · oranye tombol `#E4550F` · wash oranye `#F37F02` (f016) · ladang `#E14C10`/`#D05C31` · langit senja `#DD8262` · panel chat `#181519` · end card `#0D090D`.

## Kamera (skala, dx, dy antar-frame 0,5 dtk; inlier tinggi saja)
- 0–1: 1,067/1,069 (push), dx −3,5 %. 6,0–6,5: 1,051. 8,0–8,5: 1,138. 11,0–12,0: 1,086 → 1,107.
- 13,5–14,5: dx +6 → +18 % (editor terdorong, panel masuk). 16,5–17,5: dx +17 / +9 %. 18,0–18,5: 1,143, dx −32 %. 18,5–19,0: 0,845, dx +20 %.
- 19,5–21,5: 1,000, dx 0,0 (diam). 22,0–22,5: 1,209, dx −30 %. 23,5–24,5: 1,035 → 1,098. 26,0–26,5: 0,889.
- 27,0–27,5: 1,398, dx −39 %, dy −26 % (punch ke prompt). 30,5–31,0: 1,082 (push end card).
- Inlier < 15 % = transisi: 1,5–3,0; 3,5–4,0; 5,0–5,5; 7,0–7,5; 9,5–10,0; 15,0–16,0; 28,5–29,5.

## Cut / ritme
- ffmpeg scene>0,25: 3,07 · 7,47 · 10,07 · 12,97 · 15,43 · 16,23 · 17,23 · 18,47 · 19,20 · 22,27 · 27,60 · 29,20 (sebagian = geser panel, bukan cut).
- pace_read: cut 11 = 20,5/menit · shot median 3,0 dtk · gerak layar 4,1 · event visual 41/menit · usulan kategori energi, musik 100–140 bpm.

## Audio
- ebur128: I −14,5 LUFS · LRA 5,0 LU (−18,2 … −13,2) · true peak +0,6 dBTP.
- librosa: 117,5 bpm, 61 ketukan; onset 178 (5,53/dtk).
- RMS/1 dtk (dB): −18 −16 −13 −17 −16 −17 −19 −18 −18 −16 −16 −20 −18 −18 −17 −22 −22 −22 −20 −19 −19 −18 −25 −23 −13 −17 −18 −15 −17 −16 −17 −15 −24.
- Centroid kHz/1 dtk puncak: 5,8 (7 dtk), 5,8/5,5 (10–11), 4,1 (20), 5,9 (28); flatness 0,05–0,08 di titik itu → bunyi transisi berderau.
- earshot `timeline --detail high`: dihentikan setelah 200 dtk, tanpa keluaran → label SFX tidak terukur.

## Batas ketelitian
- 1 px = 0,24 % tinggi / 0,14 % lebar. Teks < 3 % tinggi: ±20 %. Bbox teks berwarna di atas foto (salam serif) bisa memasukkan awan terang.
- Gerak kamera dari ORB pada frame berjarak 0,5 dtk; saat UI berubah isi (typing, panel masuk) skala/dx bercampur dengan gerak layer, bukan kamera murni.
- Ukuran mosaik, kecepatan ketik dan durasi transisi: perkiraan visual dari tile 10 fps, bukan ukur piksel.
- Ada/tidaknya VO tidak dipastikan (tidak didengar, tanpa transkrip).
