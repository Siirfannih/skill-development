# 65 · ukuran mentah (instagram.mp4)

Sumber: 960×720, 30 fps, 38,97 dtk, audio 48 kHz stereo. Frame tiap 0,5 dtk → `frames/f001–f078.jpg` (fNNN = (N−1)×0,5 dtk).
% tinggi = px/7,2; % lebar = px/9,6 (terhadap frame penuh; tepi hitam ikut dihitung).

## Frame kunci (keyframes/)
| File | dtk | Ukuran |
|---|---|---|
| 65-k1-ui-postingan | 0,6 | postingan x 18–82 %, y 11–74 % (dari mosaik); latar `#ECECEC`, kartu `#F5F6FE` |
| 65-k2-teks-gradien | 3,0 | (f007) "And just like that …" huruf maks 4,72 %, median 3,61 %; x 29,9–69,8 %, y 46,9–53,1 %; latar `#1F1E1C`/`#422D27`, sudut `#7C5224` `#72293F` |
| 65-k3-teks-dotmatrix | 7,4 | (f015) "But, what if" maks 8,19 %, median 7,08 %; x 30,8–63,0 %, y 46,0–55,6 %; latar `#090909`, ungu `#16021B`, titik `#454045`; konten baris 64–655 |
| 65-k4-ui-kartu-reminder | 10,5 | (f022) "eminders?" maks 5,0 %, median 3,75 %, y 35–40 %; judul kartu "Reminder" maks 2,92 %; kartu x 418–871, y 266–677 px = 47×57 %; konten baris 18–701 |
| 65-k5-kalimat-notifikasi | 13,0 | (f027) "Instagram's gonna" maks 4,17 %, median 3,06 %, x 10,8–43,2 %, y 46,4–51,5 %; notifikasi inline ±360 px = 37 % lebar; (f029) notifikasi besar x 89–960, y 324–576 = 91×35 %, "Instagram" median 4,1 % |
| 65-k6-feed-scroll | 16,0 | postingan ±65 % lebar; scroll ty −53,8 % / 0,5 dtk |
| 65-k7-foto-vintage | 20,5 | (f041) foto x 156–811, y 43–698 = 68×91 %; caption maks 3,06 % (dgn kurung), median 1,81 %, y 86–93 %; tengah `#D5983D`, tepi `#7B6133`, vignette `#000000` |
| 65-k8-kartu-penutup | 31,0 | (f065) "MADE BY A HUMAN" maks 3,75 %, median 3,61 %, x 33–67 %, y 48–57 % (termasuk handle); latar `#000000` |

Aksen jenuh (median piksel S>120): f017 "Reminders" magenta `#D24E98`, oranye `#E09669`, kuning `#DBA060`; f010 "N YO" `#E85A9D` / `#EE8069`, biru `#5E97D1`.

## Kamera (ORB 1500 + estimateAffinePartial2D, RANSAC 3 px, antar frame 0,5 dtk)
- 0,5–1,5: skala 1,20 lalu 1,07 (push + pan ke kiri-atas). 6,5–7,5: 0,66 × 0,89 = pull ×0,59.
- 8,0–9,5: 1,006 × 1,195 × 1,478 = push ×1,78 ke bookmark; 9,5–10,5: 0,906 × 0,686 = pull ×0,62.
- 15,5–19,0: ty −53,8 / −31,8 / −6,4 / −6,6 / −28,1 / −59,1 / −14,4 % → scroll ±200 % tinggi.
- 20,0–23,0: skala 0,99–1,00, t < 1 % → diam. 23,0–27,5: 1,038…1,130…1,014 → push ×1,64 dan turun ±35 %.
- "lost/few" = frame transisi blur (2,0–6,0; 11,5–12,0; 14,5 dtk) → dianggap whip/zoom-through.
- Cut: ffmpeg scene>0,25: 0,1 / 4,5 / 6,57 / 8,0 dtk; scene>0,12 menambah 2,17 / 4,53. pace_read: 4 cut, 6,2/menit, median 2,1 dtk, gerak layar 7,2, event visual 32/menit. Hitung manual dari sheet: ±13 shot di 0–27 dtk.

## Audio
- ebur128: I −14,3 LUFS, LRA 15,6 LU (−28,5…−12,9), true peak +0,3 dBFS.
- earshot timeline --detail high: 145 event (3,7/dtk), 96 bertag: 30 note, 20 ui, 19 voice, 17 hit, 4 drum, 3 foley, 2 whoosh, 1 key. Babak: 0–5 tech house + vocal chop (−13 LUFS); 5–19,35 corporate + VO/vocal (−13); 19,35–26,45 piano elektrik sedih (−26); 26,45–38,9 grand piano (−25). Stop-down 22,5 / 27,65 / 32,3 dtk. Pulse clarity 0,11.
- librosa beat_track (mono 22,05 kHz): 0–5 dtk 89,1 bpm; 5–19,3 103,4; 19,3–27 129,2; 27–38 143,6 (piano bebas tempo: angka dua babak terakhir tidak andal). RMS −15,1 / −16,4 / −31,8 / −35,3 dB.

## Skrip
- `skrip/meas.py`: tepi hitam (rata-rata baris > 10), tinggi huruf (ambang ±60 dari median kotak, connected components > 8 px), hex (rata 12×12 px).
- `skrip/mot.py`: gerak kamera global antar frame.
- `scripts/audio/pace_read.py`, `earshot timeline --detail high`, `ffmpeg ebur128`, librosa.

## Batas ketelitian
- 720p: 1 px = 0,14 % tinggi; huruf kecil ±10 %. Kotak ukur dipilih manual dari mosaik; "maks" bisa termasuk huruf ber-ekor (j, g) atau kurung.
- Skala subjek dari kotak manual pada mosaik (±2 %). Ukuran "SEE" perkiraan dari mosaik.
- Suara manusia tidak ditranskrip dan tidak dipisah dari musik; level SFX vs musik tidak terukur terpisah (tanpa stem).
- Hex tulisan tangan kuning "Forever": tidak terukur (garis tipis dengan glow, sampel tercampur latar).
