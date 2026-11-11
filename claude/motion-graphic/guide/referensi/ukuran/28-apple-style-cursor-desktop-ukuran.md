# 28 · Data ukur mentah (Applestyele.mp4)

Sumber: 1280×720, 30 fps, 577 frame, 19,37 dtk, audio 48 kHz stereo. Waktu dari decode cv2 berurutan (nomor frame / 30).
Catatan: `ffmpeg -ss` dan contact sheet `fps=4,tile` di file ini meleset ±0,5–1,5 dtk dari decode berurutan; semua waktu di sini memakai cv2.

## Skrip
- `ukur.py`, `ukur2.py` (folder ini): bbox komponen terhubung (ambang luminans/HSV), hex median per potongan, cut dari selisih rata-rata gray 160×90, gerak kamera = rantai `estimateAffinePartial2D` (ORB 1500, tiap 3 frame) per shot.
- `simpan.py`: frame kunci + sheet.jpg + sampel hex aksen.
- `pace_read.py`, `earshot timeline --detail high` (earshot.txt), ffmpeg ebur128, librosa beat_track/chroma/RMS.

## Per frame kunci (% frame: x kiri-kanan, y atas-bawah)
| k | frame (dtk) | ukuran |
|---|---|---|
| k1 grid-teks | 20 (0,67) | "H" x43,0–52,7 y39,6–60,8 (h21,2); "i" h14,7; kursor x62–67,5 y22,2–31,7 (5,5×9,4); bg #F1F2EA; titik grid min luma 151 |
| (Hi gelap) | 4 (0,13) | "Hi" h11,9; bg #0E0A13 |
| k2 timeline | 42 (1,40) | bg #0E0A14; oranye #F87015; biru #2260E9; abu #CDCACF; satu batang x24,4–55,3 h8,8 |
| k3 tag neon | 90 (3,00) | kursor biru x42–53,1 y48,1–65,6; pill "Motion" (outline biru) x43,8–67,7 y19,2–29,4 (h10,3); glow #223C6E; pada 2,00 dtk baris tag y47,5 h4,9 |
| k4 kartu-tile | 135 (4,50) | 4 tile 15,1×26,8 di (7,7;7,1) (79,1;15,0) (6,1;59,3) (77,0;67,1); kartu ±x22–78 y39–61 (estimasi visual); bg #0F0A13 |
| k5 dock | 210 (7,00) | ikon Discord x27,2–36,1 y42,5–58,3 (8,9×15,8); pada 9,50 dtk (zoom) 13,3×23,3; langit #C5C7CF rumput #53613B air #607F76; bingkai dock #7E8A54 |
| k6 monitor | 350 (11,67) | bezel gelap x12,7–87,6 y12,8–100; latar #000F3A (sudut) / #092972 (atas) |
| (cincin) | 375 (12,50) | cincin biru x30,3–69,8 y28,9–71,1; latar #F2F3EB |
| k7 prompt | 420 (14,00) | kotak putih #FCFDF5 x14,7–100 y31,5–68,5; baris teks y36,8 h8,9; kursor x46,6–52,3 y69,7–81,1 (5,7×11,4) #2D6FFF; bg #F2F3EB |
| (tombol kirim) | 465 (15,50) | kursor 13,5×23,9 (close-up) |
| k8 kartu akhir | 530 (17,67) | baris: y42,8 h7,8 x37,7–62,3 / y56,9 h3,2 x31,1–68,8 / y65,6 h2,1 / y69,7 h2,2; warna atas #000417, tengah #010C2A, bawah-tengah #225CE3, sudut #081E51 |

Kursor biru (median piksel biru): #2869FA (0,67), #2694FD (3,00, terkena glow), #2D6FFF (14,00).

## Cut dan kamera (shot cv2; skala kumulatif, translasi kumulatif % frame)
0–0,30 1,01× · 0,30–1,03 1,02× · 1,03–1,90 1,00× tx −26 % · 1,90–3,60 1,84× tx −206 % ty −55 % · 3,60–5,83 0,66× · 5,83–8,13 1,60× ty −34 % · 8,13–8,97 1,00× ty −25 % · 8,97–10,13 0,89× · 10,13–11,27 0,83× (5 cut kilat 10,13/10,20/10,37/10,47/10,57/10,67) · 11,27–12,00 0,81× · 12,00–12,47 0,32× · 12,47–14,90 0,54× · 14,90–16,27 1,01× tx −11 % · 16,27–19,23 1,01×.
ffmpeg scene>0,2: 0,30 1,03 3,60 7,10 8,13 8,97 9,00 10,20 10,37 10,57 10,67 14,90 16,27.
pace_read: cut 7 = 21,7/menit, median 1,4 dtk, event visual 50/menit.

## Audio
ebur128: −14,1 LUFS, TP −0,6 dBFS, LRA 1,7 LU. earshot: 120 bpm (clarity 0,63), 2 seksi (tech house 0–8,05; techno 8,05–19,27), 161 event, 96 berlabel (77 drum, 4 key, 4 voice/napas, 4 note, 2 whoosh, 2 hit, 1 ui, 1 foley, 1 step); 94 % cut dalam 100 ms dari onset. librosa: 117,5 bpm, chroma teratas D, C#, D#; RMS 0–1 −19,5 dB, 1–8 −13,4, 8–12 −15,4, 12–16,3 −15,0, 16,3–19,3 −16,7.

## Batas ketelitian
- 720p: 1 px = 0,14 % tinggi / 0,08 % lebar. Tinggi baris termasuk ascender/descender; cap height prompt (±6 %) dan label tag (±4–5 %) adalah perkiraan dari tinggi baris/pill.
- Kartu profil dan lebar dock ±52 % diukur visual dari frame, bukan bbox otomatis (latar berwarna mengganggu ambang).
- Translasi ORB kumulatif dalam piksel frame berjalan; saat zoom besar angkanya membengkak (−206 %): baca sebagai "pan besar", bukan jarak tepat. Morph/cincin bukan gerak kamera murni.
- Label earshot adalah tebakan CLAP; "VOICE/breath" di pembuka kemungkinan swell sintetis, bukan suara.
- Font tidak bisa dipastikan dari piksel; Inter/SF Pro = paling mirip secara visual.
