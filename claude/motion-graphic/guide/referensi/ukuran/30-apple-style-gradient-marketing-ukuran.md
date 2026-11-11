# 30 · Data ukur mentah (11 Nov 2026)
Sumber: `Apple Styele.mp4` 1276×718, 30 fps, 44,72 dtk, audio 44,1 kHz stereo. Semua % terhadap frame penuh (16:9).
Frame tiap 0,5 dtk di `frames/` (f001 = 0,0 dtk; fNNN = (NNN−1)/2 dtk).

## Teks (scripts/glyphs.py: komponen terhubung dalam potongan; cap/asc = persentil 90 tinggi glyph)
| Frame (dtk) | Isi | cap/asc % | x-height % | blok x % | blok y % | pusat (x,y) |
|---|---|---|---|---|---|---|
| f002 (0,5) | "You" hero (jenuh) | 48,6 | – | 26,5–90,9 | 15,6–84,5 | 58,7 / 50,1 |
| f017 (8,0) k1 | "Now" hero (jenuh) | 52,1 | 41,6 (o,w) | 19,0–93,4 | 16,9–72,3 | 56,2 / 44,6 |
| f008 (3,5) k3 | "A business" putih | 18,8 | 12,8 | 20,6–79,5 | 13,2–35,0 | 50,0 / 24,1 |
| f013 (6,0) k2 | "Worth knowing about" | 7,9 | 5,5 | ±31–92 | 45–55 | ±62 / 50 |
| f023 (11,0) | logo "holo" | 12,6 | 9,6 | 34,2–61,1 | 42,7–55,5 | 47,6 / 49,1 |
| f034 (16,5) k5 | daftar Ads/Socials/Emails/SEO | 11,9–12,4 | 8,5 | 11,3–40,0 | 20,0–81,3 | 25,7 / 50,6 |
| f047 (23,0) k6 | "Autopilot" | 9,3 | 6,7 | 30,0–56,6 | 44,5–56,4 | 43,3 / 50,4 |
| f050 (24,5) k7 | "All Day" di monitor | 4,7 | 1,4 | di layar | – | 50 / 50 |
| f055 (27,0) | task list aktif | 8,0–8,1 | 5,6 | 49,2–100 (terpotong) | 45,8–56,3 | – / 51,0 |
| f063 (31,0) | "Generating [emoji]" | 10,1 | 6,7 | 27,7–72,4 | 44,0–57,1 | 50,0 / 50,6 |
| f078 (38,5) | "Chief·Marketing·Officer" | 8,6 | 5,8 | 10,1–88,0 | 45,0–57,7 | 49,0 / 51,4 |
| f081 (40,0) k8 | "45 703$" | 31,7 | – | 12,8–88,5 | 33,6–68,7 | 50,6 / 51,2 |
| f087 (43,0) | "tryholo.ai" | 7,9 | 5,6 | 37,2–62,8 | 44,3–54,5 | 50,0 / 49,4 |
Build teks (scripts/bbox_track.py, lebar konten non-putih): CMO 12,8→40→58→78 % (37,8–38,8 dtk); "Now" 59→87 % (7,2–7,9 dtk).

## Warna (median piksel / k-means piksel S>120,V>120 dari f003,f008,f017,f028,f081,f019)
Latar `#FFFFFF`; teks `#000000`/`#010102`; daftar abu `#CECCCF`; task abu `#ADADAD`; aktif daftar terbaca `#535253` (antialias, tampak hitam).
Gradien: `#F16046` 24 %, `#E6469B` 22 %, `#CC56C2` 18 %, `#EF4C6C` 17 %, `#A66ADB` 14 %, `#7794F0` 6 %.
Footage: meja foto median `#C5C5C8`, dinding render `#3E3F43`, layar `#EDEBEE`; sudut footage lum 145 vs tengah 225 (isi footage, bukan vignette).
Kartu UI daftar: x 50,9–96,5 %, y 5,6–90,4 % (f040). Kartu footage: x 3,1–96,9 %, y 5,0–94,8 % (f050, f072).

## Shot list (bbox_track.py beda/frame > 40 = cut keras; morph dari sheet + ramp beda/frame)
Mulai shot: 0,0 · 0,7 · 2,7 · 3,10* · 4,90* · 6,85 · 8,37 · 10,43* · 10,8 · 12,23* · 13,00* · 15,30* · 21,37 · 22,30 · 23,63* · 26,03 · 28,77 · 29,07* · 30,70* · 31,77* · 35,23* · 37,70* · 39,55 · 41,13 (* = cut keras/flash).
24 shot, median 1,7 dtk, 32/menit. ffmpeg scene>0,2: 9 deteksi; >0,08: 30 deteksi (termasuk ganti item). pace_read.py: 5 cut, shot median 5,2, event visual 40/menit, 4,9 suku kata/dtk (proxy).
Diam total (beda/frame 0,0): 11,0–12,2 dtk (holo), 38,8–39,5 dtk (CMO), 41,6–44,6 dtk (end card, lebar tetap 25,3 %).

## Kamera (scripts/cam.py: ORB 3000 + estimateAffinePartial2D RANSAC 3 px)
| Rentang dtk | Skala | tx % | ty % | inlier | Bacaan |
|---|---|---|---|---|---|
| 15,5–16,5 | 1,000 | 0,0 | −22,7 | 1110/1511 | tilt naik per item daftar |
| 22,4–23,5 | 0,888 | +9,7 | +5,5 | 256/1138 | pull (Autopilot → monitor) |
| 23,9–25,9 | 0,755 | +11,8 | +10,1 | 97/711 | pull monitor |
| 29,2–30,6 | 0,853 | +7,4 | +7,3 | 749/1263 | pull grid produk |
| 31,9–32,4 | 0,825 | +7,7 | +7,8 | 1086/1580 | pull cepat kolase |
| 33,4–33,8 | 0,991 | −4,1 | +2,6 | 1523/2030 | pan |
| 35,3–37,6 | 0,94 (0,88 di run lain) | +1,0 | +14,3 | 18/739 | pull + tilt, beda/frame 9,1→1,2 (ease-out); lemah |
Tak terpakai (inlier rendah / gerak objek): 3,2–4,8; 5,0–6,7; 8,5–10,3 (bola berputar); 13,1–14,9; 26,1–28,6; 39,7–41,0; 41,3–44,6.

## Audio
ebur128: I −14,1 LUFS, TP −0,8 dBTP, LRA 5,2 LU. librosa: beat 172 bpm (paruh 86), 124 onset (2,8/dtk), 11/13 cut keras punya onset ≤ 120 ms.
Per babak (centroid, energi < 250 Hz, RMS): 0–10,4 1422 Hz 47 % −18,9 dB · 10,4–15,3 1533 Hz 79 % −15,0 · 15,3–23,6 1886 Hz 85 % −13,8 · 23,6–35,2 1733 Hz 84 % −14,6 · 35,2–41,1 1681 Hz 85 % −13,8 · 41,1–44,7 1212 Hz 89 % −15,7.
earshot timeline --detail high (output terpotong di 27 dtk): HIT 16, UI 12, DRUM 7, WHOOSH 4, RISER 1, NOTE 3, VOICE 17, GAP 4; seksi: tech house 0–7,35 → glitch hop 7,35–31,75 → house 31,75–42,3, vocal chop, "confident and cool".

## Skrip
`scripts/measure.py` (bbox gelap/jenuh/non-putih + profil baris), `scripts/glyphs.py`, `scripts/bbox_track.py` (→ `track.txt`), `scripts/shots.py` (→ `shots.txt`, cut histogram; gagal di morph), `scripts/cam.py`; pace_read.py dari skill-development (hanya dibaca).

## Batas ketelitian
- 1 px = 0,14 % tinggi / 0,08 % lebar; huruf kecil ±10 %. cap/asc memasukkan asender (b, k, l), jadi sedikit di atas tinggi kapital.
- Hero bergradien diukur dari piksel jenuh; tepi buram menambah ±2 %.
- Jumlah shot bergantung definisi (morph dihitung shot baru bila ide berganti). Kamera di grafik datar tidak terukur (fitur ORB sedikit).
- Nama font, level SFX vs musik per stem, dan transkrip VO: tidak terukur (tanpa pemisahan stem).
