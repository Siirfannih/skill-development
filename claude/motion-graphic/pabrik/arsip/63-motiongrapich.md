# Arsip bedah: Motiongrapich.mp4 (kartu 63)

Arsip audit dan R&D. **Tidak dimuat di sesi editing.**

## Metadata (measured)
- 736x414, r_frame_rate 30/1. Jendela 13,4–15,4 dtk (T1) dan 26,5–29,15 dtk (T5). Tanpa frame duplikat di kedua jendela (animasi 30 fps).

## T1 13,4–15,4 dtk: kamera (gerak.sinyal, LK + RANSAC, inlier ≥ 0,90)
| Frame | Observasi | Label |
|---|---|---|
| f0–f10 | hampir diam: geser x −0,010 W pelan, skala > 0,999 | measured |
| f11–f47 | isi panggung geser x +0,192 W dan skala 0,999 → 0,879 bersamaan; puncak kecepatan f28–29; progres x 1 % di f14, 99 % di f44 | measured |
| f47→ | skala mulai naik lagi (gerak berikutnya, bukan pantul) | measured |
- Tidak ada cut (potong = []). Kurva: fit bezier [0,707, 0,064, 0,252, 0,927] rms 0,0012; `CURVE.heavy` rms 0,031.
- Kurva `settle` (overshoot 1,12) yang diturunkan dari data ukur 320 px sebelumnya tidak didukung data fps asli: overshoot itu adalah awal gerak berikutnya yang ikut masuk segmen. Kurva dicabut dari toolkit.
- Primitif: `kamera-geser-mundur-buka-sisi`.

## T5 26,5–29,15 dtk: aksi UI
| Frame | Observasi | Label |
|---|---|---|
| f0–f31 | kamera mendorong/menarik kontinu (selisih 8,0 → 1,2 → 10,6), teks ketik bertambah di kotak prompt | measured (selisih), laju ketik tidak terukur |
| f32→f33 | selisih 52,7: dorong masuk ke detail dalam 1 frame | cut, tanpa kurva |
| f33–f58 | gerak kamera melambat sampai hampir diam | measured (selisih) |
| ±f60→ | transisi ubin piksel dari kiri bawah | belum diukur |
- **Kursor dan klik tidak ada di referensi**: lintasan kursor, waktu klik, dan tekan tidak terukur dari bahan ini. UIAction tidak disintesis (syarat berhenti: gerak tidak terukur).
- Kandidat primitif, belum diukur: `tipografi-ketik-per-huruf` (teks bergerak bersama kamera; perlu stabilisasi ROI dengan transform kamera sebelum lebar teks diukur), `kamera-potong-dorong-ke-detail` (cut f33; parameter = rasio skala sebelum/sesudah), `transisi-ubin-piksel` (urutan ubin; lihat juga 63-T1 0,6–0,9 dtk = kemunculan kedua dengan kulit berbeda).

## Jangan dicuri
Palet T1 (`ukur/palet.py`): #201C20 #181417 #502A19 #F5B165 #E88052 #7E3E19 #B76140 #5D5053 #8992A1 #F0E9E7. Editor video, wallpaper pegunungan senja, dock, panel chat dan kotak prompt, teks prompt.
