# 80 · ukuran mentah (siirfannih_De9apo4TnUi.mp4)

Sumber: 1276×718, 30 fps, 94,97 dtk, audio AAC. Frame tiap 1 dtk → `frames/f001…f095.jpg` (fNNN = detik NNN−1).

## Teks (kotak piksel per wilayah; % tinggi/lebar frame)
| Frame | Teks | Tinggi total | Inti (≈x-height) | Lebar | Pusat (x,y) |
|---|---|---|---|---|---|
| f002 (k1) | Ada | 14,9 | 11,3 | 21,9 | 18,8 / 49,6 |
| f002 | jarak | 18,0 | 11,1 | 25,9 | 84,9 / 51,0 |
| f002 | antara | 3,9 | 3,2 | 9,7 | 50,0 / 60,8 |
| f007 (k3) | the gap (serif it.) | 29,4 | 21,9 | 41,5 | 69,8 / 46,0 |
| f007 | Ira Glass | 4,5 | 3,2 | 12,9 | 84,6 / 67,3 |
| f013 (k4) | tanda | 13,2 | 9,9 | 25,8 | 53,1 / 44,7 |
| f033 | Selamat sore (serif UI) | 7,5 | 4,2 | 36,4 | 50,1 / 25,8 |
| f033 | Edit jadi… (UI) | 3,9 | 2,2 | 39,4 | 33,2 / 58,4 |
| f047 | Ira Glass bilang, | 12,3 | 7,5 | 53,4 | 50,2 / 50,6 |
| f052 (k7) | AI memberimu | 6,8 | 4,7 | 31,7 | 50,0 / 44,6 |
| f052 | ribuan. | 15,6 | 11,4 | 35,1 | 50,4 / 64,8 |
| f058 | tiga | 7,8 | 4,7 | 8,8 | 50,1 / 17,1 |
| f064 | (Pen)galaman. | 12,3 | 7,5 | 30,5+ | terpotong kiri |
| f077 | Tapi ia memproduseri | 5,8 | 3,6 | 36,5 | 49,9 / 14,0 |
| f087 (k8) | AI bisa | 3,6 | 2,6 | 7,9 | 50,0 / 11,9 |
| f087 | menciptakan bisnis … malam, | 7,9 | 4,6 | 90,2 | 50,2 / 21,6 |

## Subjek (kotak non-latar, ambang 25)
Ira cutout f007 90 % H × 43 % W (x 0–43, y 10–100) · Rick lingkaran f073 80×45 % (x 50–95) · album CASH f077 53×27 % (termasuk label) · UI langkah f087 62×73 % · 4 kartu f040 57×91 % · 3 foto 01–03 f058 32×52 % · UI tengah f020 ±57×52 % (kotak manual ±2 %) · lingkaran AI f027 ±68×38 % (manual).
Ketajaman (var. Laplacian) f020: UI tengah 1974, kartu satelit kiri 10 → satelit sengaja diburamkan.

## Warna (median patch 6×6 px)
Gelap sudut `#0D0B0E`, tengah `#121013`; luma sudut/tengah f002 13/22, f024 13/23, f052 17/55 (grid titik p99,5 = 85 di atas dasar 14). Putih `#FEFEFE`, lavender `#EBEEFD`, krem `#F8F7F3`. Biru (S>120): f015 `#2A54DF` (2,5 % px), f028 `#2E51CD`, f031 `#3C5EDF`. Merah f062 `#ED565F`. Oranye tombol f033 `#B44F3B`. Grain: std latar gelap rata 0,05 (tanpa grain).

## Cut & kamera
- ffmpeg scene >0,25: 19 titik; >0,12: 47 titik. Beda-frame 30 fps (diff>25 dan >4× median lokal) → 49 frame, digabung jadi 23 cut keras: 4,27 6,9 7,17 10,33 10,83 11,25 11,6 12,5 13,4 14,87 20,4 22,37 27,3 45,5 50,95 55,6 59,55 77,4 78,47 78,67 82,8 84,97 91,5.
- 24 shot, median 2,90 dtk, terpanjang 17,9 dan 18,2 dtk. 50 % frame bergerak (diff>1), 35 % diam (<0,3).
- ORB + estimateAffinePartial2D tiap 0,5 dtk (123/189 pasangan valid). Contoh: 5,5–6,5 pan dx −4 %; 8–9 pan −10 %/0,5 dtk; 23–26 push skala 1,01–1,05; 27,5–31 pan −15…−30 %; 59 zoom ×1,13; 64,5–65 ×1,11–1,31; 68,5–69 ×1,24/1,13; 79 ×1,33; pull-out 14 (×0,69), 18,5 (×0,38), 31,5 (×0,57), 40 (×0,51), 49 (×0,59). Pasangan dengan inlier <25 bisa salah (isi berganti, bukan kamera).
- pace_read.py: cut 15 = 9,5/menit, median 4,2 dtk (deteksinya lebih kasar), event visual 47/menit, gerak layar 2,5.

## Audio
- ebur128: I −14,1 LUFS, LRA 2,4 LU, true peak −0,4 dBFS.
- earshot timeline --detail high (`earshot.txt`): 7 seksi tech house/techno + vocal chop, trap di 1:29–1:35; 601 event (6,3/dtk), 96 berlabel (30 ui, 27 voice, 19 hit, 7 note, 4 foley, 4 whoosh, 2 drum, 2 riser, 1 key); pulse clarity 0,08; sinkron ke 78 cut versi earshot: 86 % dalam 100 ms.
- librosa beat_track (wav mono 22,05 kHz): 129,2 bpm (lemah, tanpa grid jelas). HPSS rms harmonik 0,100 / perkusif 0,081.

## Skrip
`skrip/m80.py` (pita baris teks, kasar), `skrip/r80.py` (tinggi teks per wilayah), `skrip/cam80.py` (cut beda-frame + kamera ORB). Python: `~/work/mg-venv/bin/python`.

## Batas ketelitian
±1 px = 0,14 % tinggi. "Inti" adalah perkiraan x-height dari kepadatan baris, bukan cap height. Font dari mata, tidak diverifikasi. Frame 1 dtk bisa jatuh di tengah transisi (f013, f064 terpotong). Label SFX earshot = tebakan CLAP; banyak onset adalah suara VO. Musik tidak dipisah dari VO (tanpa demucs), jadi bpm dan genre perkiraan.
