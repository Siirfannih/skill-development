# 43 · Data ukur mentah (IG Dcc8NmZgmiw)

Sumber: video.mp4 720×1280, 30 fps, 103,73 dtk (ffprobe). Frame tiap 1 dtk → `frames/` (104). % terhadap frame penuh.

## Skrip
- `scripts/ukur_teks.py`: piksel V>205 & S<45 (putih), dilatasi 9×3, komponen terhubung → kotak kata (ascender–descender).
- `scripts/ukur_warna_panel.py`: median hex potongan; batas panel = baris/kolom dengan >35 % piksel luma >34.
- `scripts/kamera.py`: ORB 1500 + estimateAffinePartial2D (RANSAC 3 px) antar sampel 0,5 dtk → skala, dx, dy → `kamera.txt`.
- Audio: ffmpeg ebur128; `earshot timeline --detail high` → `earshot.txt`; `pace_read.py` → `pace.txt`; librosa beat_track/onset.

## Teks per frame kunci
| Frame | Kata | Tinggi % | Lebar % | Pusat (x,y) % |
|---|---|---|---|---|
| k1 1,3 dtk | lo | 2,2 | 4,4 | 24, 53 |
| | nggak | 4,0 | 18,6 | 73, 57 |
| | perlu | 5,5 | 20,8 | 21, 61 |
| | pakai | 9,7 | 37,4 | 50, 69 |
| k1 1,0 dtk | pakai (masih menyusut) | 10,5 | 42,8 | 50, 72 |
| k2 5,2 | gimana + bikinnya (lavender) | 16,6 gabung, gimana ±11 | 86,4 | 50, 22 |
| k3 10,0 | gagal (serif italic) | 16,7 | ±71 (terpotong) | ±60, 72 |
| k4 15,0 | Flicker | 6,9 | 32,9 | 41–50, 50 |
| | judul "20+ Premium preset text" | 3,5–4,3 | 11–27 per kata | 22 baris |
| k6 24,5 | "preset" | 10,5 | 36,9 | 40, 49 |
| | Comment | 2,4 | 19,4 | 50, 43 |
| | gua kirim link di DM | 2,0–2,3 | per kata 4–17 | 53 baris |
| k7 41,0 | after / effect / pakai / perlu / nggak | 6,6 / 6,4 / 7,2 / 5,8 / 3,8 | 32,6 / 27,4 / 23,3 / 21,2 / 18,1 | (49,63) (77,70) (79,55) (49,50) (74,46) |
| k8 51,0 | "semua teksnya" (#ABACAC) | 3,3 | 32,5 | 48, 46 |
| 80,5 | selesai? | 4,9–5,2 | 37,5–38,8 | 50, 49 |

## Warna (median potongan)
dinding `#58443B`, kulit `#84463C`, hoodie `#08040E`, teks `#FFFEFF`, gimana `#B6BCE4`, ubin Ae `#030055`, kartu ungu `#1A042D` / luar `#201827`, judul oranye `#DD781A`, CTA `#0A0A0C`–`#0F0F0F`, panel latar atas `#111113`–`#222126` bawah `#060606`–`#0A0A0A`, selesai? `#171717`, penutup `#000000`, kolase `#FFFFFF`, sudut gagal `#1F1E18`.

## Bidang
- Panel layar: x 10–86 %, y 13–80 % (36, 41, 51 dtk). Kolase k5: jendela 31×35 % (0,8), 33×48 % (67,18), 49×49 % (1,47).
- Wajah: tidak terukur otomatis (cv2 tanpa CascadeClassifier); visual dari frame penuh: kepala y ±13–45 %, x ±28–72 %.

## Kamera (kamera.txt)
- 0,5–3,5 dtk skala 0,870/0,828/0,937/0,952/0,972/0,980 (pull ±0,6×); 4,0 dtk 1,065.
- 10,0–11,5 dtk 0,793/0,853/0,886/0,906 (susut ke panel).
- 26–100 dtk: 141 sampel; |skala−1|>1 %: 38; |dx|>1 %: 73; |dy|>1 %: 39; |dx| median 1,6 %, p90 29,1 %; |dy| p90 4,2 %; skala p10/p90 0,97/1,01.
- Scene detect (>0,3): 0,07 0,17 0,27 3,5 3,6 7,27 9,2 9,47 19,9 22,77 26,6 26,87 80,93 81,4.

## Audio
- ebur128: −14,1 LUFS, LRA 4,1 LU, true peak −0,2 dBFS. RMS dB p10/p50/p90: −27,9/−19,2/−12,9.
- librosa 117,5 bpm; earshot ±120 bpm (clarity 0,25); onset 535 (309/menit).
- pace_read: 14 cut = 8,1/menit, shot median 1,9 dtk, event visual 34/menit, bicara ±7,2 suku kata/dtk.
- earshot: 702 event (6,8/dtk); 43 ui, 39 voice, 9 hit, 4 note, 1 drum. Hit (sub-bass drop): 1,30 3,71 11,57 13,79 21,19 22,84 66,09. Gap: 8,65 (0,55 dtk), 87,95 89,75 93,10.

## Batas ketelitian
- 720p: 1 px = 0,078 % tinggi / 0,139 % lebar. Kata kecil (<2 %) ±15 %.
- Kotak kata termasuk ascender/descender; kata tanpa keduanya tampak lebih kecil. Kata sedang animasi scale/blur meleset ±10 %.
- Label earshot "UI/chat pop" sebagian besar konsonan suara; jumlah SFX nyata tidak terpisah dari suara (tanpa stem).
- Font "Coolvetica" dibaca dari UI CapCut di layar; serif italic tidak terkonfirmasi.
