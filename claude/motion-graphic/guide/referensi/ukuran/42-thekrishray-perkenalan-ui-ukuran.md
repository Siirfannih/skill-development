# 42 · data ukur mentah (11 Nov)

Sumber: `.../instagram/e840d184a040a403b49f/video.mp4` · 720×720, 30 fps, 33,63 dtk, audio 33,69 dtk.
Frame tiap 0,5 dtk: `frames/f001…f067.jpg` (fNNN ≈ t = (NNN−1)×0,5 dtk). Frame kunci: `keyframes/42-k1…k8-*.jpg`.

## Skrip
- `scripts/ukur.py`: warna tepi/tengah + garis teks otomatis (connected components) per frame.
- `scripts/roi.py`: tinggi tinta (asc–desc), x-height (baris dengan kepadatan > 35 % puncak), lebar, posisi, hex latar/tinta per kotak ROI.
- `scripts/subjek.py`: bbox komponen UI lewat topeng warna (toleransi 6–60) + morph open 5 px.
- `scripts/kamera.py`: ORB 1500 titik + estimateAffinePartial2D (RANSAC 3 px) antar frame 0,5 dtk → skala, tx, ty (% frame). Hasil: `kamera.txt`.
- Audio: ffmpeg ebur128; `earshot timeline --detail high` → `earshot.txt`; `pace_read.py` → `pace.txt`; librosa beat_track/onset/STFT pita.

## Teks (roi.py; % tinggi frame; h = asc–desc tinta, xh = x-height)
| Frame | Isi | h | xh | lebar | posisi (x, y) | latar → tinta |
|---|---|---|---|---|---|---|
| f004 k1 | "Hey I'm a motion designer." | 6,4 | 3,8 | 74,9 | 14–88, 40–47 | #FCFCFC → #2C2B2A |
| f007 k2 | "my" (masuk) | 8,3 | 4,3 | 10,6 | 21–31, 42–50 | #4C9AF3 → #E9FBFF |
| f007 k2 | "name is krish" | 6,1 | 4,3 | 45,7 | 33–79, 45–51 | #509AF3 → #E9FCFF |
| f014 k3 | "−1000 $ +" | 7,6 | 6,4 | 28,5 | 38–66, 46–54 | #2284F3 → #ECFBFF |
| f014 k3 | "video editing" | 4,6 | 2,5 | 27,9 | 38–66, 31–35 | #ECECEC → #0B0B0B |
| f014 k3 | "$0 … $1000" | 4,2 | 3,2 | 45,0 | 31–75, 63–67 | #ECECEC → #898989 |
| f026 k4 | kalimat chat (+kursor) | 5,8 | 2,2 | 77,5 | 1–79, 36–42 | #282C2F → #B8BEC4 |
| f026 k4 | baris dropdown | 2,6 | 1,5 | 12,8 | 44–56, 66–68 | #1C1D21 → #ACB5B7 |
| f039 k5 | teks gelembung (tercampur tepi) | 6,4* | 2,6 | 51,7 | 24–76, 38–44 | #0B81F1 → putih |
| f044 k6 | "I'll be posting on" | 7,2 | 4,2 | 56,4 | 22–78, 27–34 | #E7F3FD → #03050C |
| f047 | "I'll keep making" | 8,8 | 5,3 | 67,8 | 16–83, 46–55 | #FCFCFC → hitam + #BE5A6C |
| f052/53/54 k7 | "land" / "my" / "client" | 8,2 / 8,5 / 9,2 | 6,7 | 22 / 16 / 30 | 38–60 / 41–57 / 34–64 | #FCFCFC → #030304 |
| f058 k8 | angka kalender | 5,7 | — | penuh | 3 baris y 28/53/77 | #FCFCFC; pita #BFB2F7 |
| f063 | "and that's what makes it exciting" | 7,8 | 6,0 | >100 (geser) | y 46–53 | #000 → #DBDBDB |
| f066 | "thekrishray" (tinta >230) | 7,2 | — | 42,4 | 29–71, 46–53 | #000 → #EFEFEF + pendar |
*k5: kotak ROI menyentuh tepi gelembung; cap terbaca dari frame ±3,7 %.

## Subjek (subjek.py; % lebar × % tinggi)
kartu harga f014 57,8×54,4 (x 23–81, y 22–77) · tombol biru 50,1×17,1 · kolom chat f026 86,2×34,2 (x 0–86, y 29–63) · gelembung 1 f039 57,4×11,2, gelembung 2 47,9×9,3 · ubin platform f044 30,6×28,7 (y 42–70) · pil hitam f010 34,2×7,4 · titik biru-ungu f056 12,5×12,2.

## Warna (rata-rata 6×6 px)
f007 sudut #65A9F4 / #6DADF5, tengah #B1D2EB · f014 pendar kartu #DAEBFA, kartu #ECECEC, tombol #2283EF · f017 amber #432E03 / #5D4E27 / #170D01, kursor #D1A511 · f030 navy #011120 → #04233F · f039 gelembung #0B80F2 · f044 #FCFCFE kiri → #B6DFF5 kanan · f058 pita #BFB2F7 / #E3E0FB · f066 nama #EFEFEF, pendar kolom tengah 6→58 dalam 14 % tinggi.

## Kamera (kamera.txt; hanya pasangan dengan inlier > 100 dipercaya)
2,0–3,0 skala 1,094 lalu 0,878 · 5,5–6,5 skala 1,325 & 1,287 (inlier 46/113) · 10,0–12,0 tx −4,0/−10,4/−6,4/−2,1 % (pan kiri ±23 %) · 12,0–13,5 ty −7,2/−3,2/−15,1 % · 14,0–14,5 skala 1,125 · 18,5–19,0 skala 1,207 · 20,0–21,5 skala 1,108/1,025/1,050 · 28,0–29,0 tx −37/−71 % (inlier rendah, blur) · 30,0–31,5 tx −20,6/−17,5/−17,4 %.
Scene detect (>0,25): 1,87 · 7,33/7,37 · 15,83 · 24,37/24,80/24,93 · 25,63 · 30,03/30,20 · 31,03/31,10.

## Audio
ebur128: −14,2 LUFS, LRA 2,8 LU, true peak +1,6 dBFS. librosa: 136 bpm, 43 onset (1,28/dtk); pita STFT rata dB: <100 Hz 21,9 · 100–300 18,3 · 300–3k 4,4 · 3–8k −6,8 · >8k −12,3. RMS per 2 dtk −16…−21 dB, 32–33,6 dtk −49 dB.
earshot: 140 bpm (clarity 0,16), 219 event, 3 babak (0–7,6 glitch hop; 7,6–27,25 trap; 27,25–33,6 VO maju), 19 cut: 90 % ≤ 100 ms dari onset. pace_read: 11 cut = 19,6/menit, shot median 1,3 dtk, 41 event visual/menit, 4,5 suku kata/dtk.

## Batas ketelitian
- 1 px = 0,14 %; teks kecil (<3 %) meleset ±10 %. Kompresi IG mengaburkan tepi; tinta diukur dengan ambang selisih warna 120.
- Frame 0,5 dtk melewatkan keadaan antara; durasi animasi dan easing tidak terukur (perlu frame 30 fps per transisi).
- Kamera ORB tidak sah di latar polos/blur (inlier < 50); angka itu hanya arah.
- Label earshot = tebakan CLAP; SFX dan musik tidak dipisah (tanpa stem).
