# 21 · ukuran mentah (theartexpo.mp4, 1276×718, 24 fps, 53,05 dtk)

## Skrip
- Frame: `ffmpeg -vf fps=2` → frames/f_0001…0106 (f_n ≈ t = n·0,5 − 0,25 dtk).
- Teks: `/tmp/m21.py` (tidak disimpan; logika: ROI manual, piksel V>225 & S<40 di HSV, segmentasi baris dari proyeksi horizontal).
- Kamera: `cam21.py` → `cam21.txt` (scene detect ffmpeg 0,25; ORB 1500 + estimateAffinePartial2D antara awal+0,08 dan akhir−0,08 dtk tiap shot, frame 638×359).
- Warna: `warna21.py` → `warna21.txt` (bayangan = rerata 10 % piksel tergelap, sorot = 5 % terterang, vignette = L* sudut/L* tengah, hf-noise = std(gray − blur5)).
- Audio: ebur128; `earshot timeline --detail high` → `earshot21.txt`; librosa beat_track/onset/STFT; `pace_read.py`.

## Teks (% frame)
| Frame | Teks | Blok x | Blok y | Pusat | Lebar | Tinggi baris | Warna |
|---|---|---|---|---|---|---|---|
| f5 (2,2 dtk) | ITS/DAY/310 | 78,1–84,7 | 23,0–41,1 | 81,4 / 32,0 | 6,7 | 4,5 / 5,0 / 5,0 | #EEE8EC |
| f8 (3,7 dtk) | WITHOUT A BOSS | 41,6–58,4 | 91,5–94,3 | 50,0 / 92,9 | 16,8 | 2,9 (huruf besar kapital kecil) | #F6F2ED |
| f11 (5,2 dtk) | YOOOO,/WHAT'S/THE/UPDATE? | 63,2–73,2 | 41,2–56,1 | 68,2 / 48,7 | 10,0 | 2,9 / 3,6 / 2,8 / 2,9 | #F1F0EB |
- Masuk "ITS DAY 310": strip 8 fps 0,4–2,4 dtk, terbuka kanan→kiri dalam ±4 frame-strip (0,5 dtk). "YOOOO…": per huruf 3,8–5,0 dtk. "WITHOUT A BOSS" hilang di cut 3,79.

## Warna per frame kunci
| Kunci | Bayangan | Median | Sorot | Sat | Vignette | hf-noise |
|---|---|---|---|---|---|---|
| k1 f5 teks-tangan | #120F14 | #3B2F35 | #D4D8C8 | 22 % | 0,39 | 1,7 |
| k2 f8 ruang-lebar | #151318 | #4D4448 | #C7CABA | 17 % | 0,24 | 3,6 |
| k3 f11 punggung-teks | #18141A | #473F42 | #A9AA96 | 20 % | 0,81 | 2,2 |
| k4 f23 closeup-tangan | #161116 | #4B302A | #AD8C5F | 38 % | 0,50 | 3,2 |
| k5 f46 eksterior | #0C070B | #4D3836 | #E0F1EA | 30 % | 0,47 | 4,9 |
| k6 f54 jalan-ikut | #151010 | #565043 | #E9E2D0 | 25 % | 0,63 | 1,9 |
| k7 f86 toko-piringan | #161110 | #604E4C | #D1CDB9 | 24 % | 0,64 | 5,9 |
| k8 f104 malam-turntable | #110C0A | #5A1F13 | #F5CE8D | 57 % | 0,22 | 2,1 |

## Skala subjek (dibaca dari kotak batas di frame 638 px; manual, ±3 %)
- k1 kaki 100 % tinggi × ±24 % lebar · k2 orang 14×50 % (x 21–36 %) · k3 kepala-bahu ±39×70 % · k4 paket 41 % lebar, tangan memenuhi tepi · k5 tanpa subjek, gedung tepi 0–11 % & 82–100 % · k6 orang 11×38 % (pusat x 53 %) · k7 orang 36×72 % (x 49–85 %) · malam f99 orang 25×57 % · k8 piringan 46×84 %.

## Kamera (ringkas dari cam21.txt, 70 shot)
- diam/halus 21 · push 15 · pull 12 · pan 9 · terlalu pendek 7 · tak terbaca 6.
- Gerak terbesar: 0,00 push 1,28 · 2,38 push 1,31 · 19,46 pull 0,43 · 22,46 push 1,21 + tx −45 % · 51,67 pull 0,71.
- Shot: median 0,62 dtk, rerata 0,76, maks 3,88. pace_read: 63 cut, 71,2/menit, median 0,6, event visual 87/menit.

## Audio
- ebur128: −14,2 LUFS, TP −1,7 dBFS, LRA 6,0 LU (earshot: −14,4 / −2,3 dBTP / 6,1).
- bpm librosa 95,7; earshot ~98 (clarity 0,18). Onset 3,5/dtk; earshot 248 event (4,7/dtk).
- Cut vs ketukan: 58 % dalam ±80 ms (acak 26 %); dengan setengah ketukan 72 %.
- RMS per 4 dtk (dBFS): −17,0 −16,2 −17,5 −20,1 −16,0 −20,0 −19,2 −20,1 −21,4 −19,5 −16,5 −16,1 −17,1.
- Centroid 0/12/24/36/46 dtk: 3308/2257/2156/1984/2102 Hz; energi <150 Hz 4,2→11,4 %.

## Batas ketelitian
- Sumber 718 px tinggi: 1 px = 0,14 %; tinggi huruf tulisan tangan ±0,3 %.
- Scene detect 0,25 ikut menghitung gerak cepat sebagai cut di beberapa tempat; pace_read (63) lebih konservatif.
- Gerak kamera = perubahan global awal→akhir shot; lensa lebar + paralaks membuat skala/tx kasar (±3 %). Shot < 0,35 dtk tidak diukur.
- Label earshot hanya petunjuk; SFX terpisah dari musik tidak bisa dipastikan tanpa stem. Font tidak dikenali otomatis (dibandingkan mata).
