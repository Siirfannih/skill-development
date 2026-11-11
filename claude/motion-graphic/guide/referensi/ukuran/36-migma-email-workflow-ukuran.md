# 36 · ukuran mentah (11 Nov 2026)

Sumber: video.mp4 1276×718, 30 fps, 28,12 dtk, ada audio. Frame 0,5 dtk → `frames/f001…f056` (t = (n−1)/2).
Skrip: `scripts/ukur_teks_warna.py` (ambang luminans per ROI, hex rata-rata 8×8 px), `scripts/ukur_subjek_kamera.py` (komponen terbesar per mask; ORB + estimateAffinePartial2D antara awal dan akhir shot), ffmpeg scene>0,25, ebur128, earshot `timeline --detail high`, `pace_read.py`, librosa beat_track.

## Teks (y/x dalam % frame; "baris" = naik–turun, "kap" = huruf kapital pertama)
| Frame kunci | t | Teks | Baris | Kap | Bbox x | Pusat |
|---|---|---|---|---|---|---|
| k3 ponsel | 5,5 | Run your email marketing from Dots. | y13,9–22,1 (8,4) | R 6,5 | 17,6–67,9 | 42,7 / 18 |
| k5 UI | 11,5 | Your emails enhance themselves. | y14,9–21,3 (6,5) | Y 6,1 | 21,6–78,4 | 50,0 / 18 |
| k6 approve | 15,5 | You approve every send. | y8,6–16,4 (7,9) | Y 6,4 | 29,5–71,1 | 50,3 / 12,5 |
| – laporan | 19,5 | Dot reports back. | y16,4–25,9 (9,6) | D 7,8* | 29,2–65,0 | 47,1 / 21 |
| k4 grid | 8,5 | Emai(l) | y21,7–29,5 | E 7,7 | 28,0–37,3 | – |
| k7 konfirmasi | 17,5 | Scheduled for friday. | y62,1–72,1 (10,2) | S 7,9 | 28,1–71,0 | 49,5 / 67 |
| k8 teks kiri | 21,5 | Made to / convert. | y29,9–38,7 · 44,7–55,2 | M 8,9 | 7,1–32,5 | 19,6 / 43 |
| k1 kata besar | 23,0 | Des(ign) | y42,9–57,1 | D 14,2 | 35,7–49,8 | – |
| k1 logo | 26,0 | MigmaAI | y42,2–52,6 | M 6,4 | 43,6–69,4 | – |
*"Dot reports back." diukur saat masih membesar (push), angka sedikit tinggi.

## Warna (hex)
- t0 latar `#010002`; t11,5 kolom x10 %: y5–40 % `#010002`, 45 % `#070302`, 55 % `#190A03`, 65 % `#301201`, 75 % `#4F2003`, 85 % `#772F05`, 98 % `#9E3F04`.
- t26 kolom tengah: 5 % `#010002`, 30 % `#1D000E`, 57 % `#871B31`, 70 % `#C03A40`, 84 % `#E4614E`, 98 % `#F08258`.
- t17,5 bidang konfirmasi horizontal y50 %: `#ED8D41` `#EB7E45` `#EC6E4D` `#E65F57` `#E74F60`.
- Putih t1,5–3 `#FDFBFE`; ponsel t5,5 `#DEDCE1`/`#F0EEF3`; bingkai ponsel `#954C23`; kartu dashboard `#151419`; kata belum aktif `#B4AFB5`.
- Tombol Approve: sampel jatuh di latar (`#552205`); hex tombol tidak terukur.

## Skala subjek (komponen terbesar)
kartu approve t15,0 72×69 %, t15,5 65×62 %, t16,0 86×81 % · dashboard t19,5 78×35 % (x8–86, y36–71) · checklist t11,5 41×50 % · email t21,5 33×51 % (x58–91) · layar ponsel t4,5 51×86 %, miring t5,5 100×61 % · maskot t1,5 18×33 %, t2,5 lingkaran 33×60 %, t3,5 biru 14×26 %. Jendela inbox t13: mask gagal (latar putih menyatu); dari mata ±44×55 %.

## Kamera per shot (skala >1 = dorong; inlier rendah = tidak dipercaya)
0–1,6 ×0,92 (44/106) · 1,6–3,8 tak andal (6/31, maskot berganti) · 3,8–4,83 ×0,70 · 4,83–8,03 tak andal (12/247, ponsel miring) · 8,03–9,5 ×0,72 (46/668) · 9,5–10,2 ×0,63 (194/813) · 10,2–12,37 ×1,27 (149/423) · 12,37–15,07 ×0,89 (konten berganti) · 15,07–17,2 ×2,01 ty −101 % (133/429) · 17,2–18,33 ×1,25 (240/404) · 18,33–20,8 ×1,65 (28/420, lemah) · 20,8–23,07 ×2,16 (461/979) · 23,07–25,07 tak andal · 25,07–28,1 fitur kurang.
Cut scene detect: 1,6 3,8 4,83 8,03 9,5 10,2 12,37 15,07 17,2 18,33 20,8 23,07 25,07 (+3 duplikat 1 frame) → 13 cut, 27,8/menit, median shot 2,15 dtk.

## Audio
ebur128: −14,1 LUFS, TP −2,4 dBFS, LRA 4,1 LU. earshot: −14,4 LUFS, TP −2,9, ±150 bpm (clarity 0,39), 191 onset, 3 babak (0–3,85 / 3,85–20,9 / 20,9–28), jeda 0,35 dtk di 21,6, aksen ding +37 dB 21,95, drum +18 dB 23,02, kick +16 dB 8,05; speech AST ≤0,07. librosa: 112 bpm, 184 onset. pace_read: 34,1 cut/menit (hitung duplikat), event visual 49/menit.

## Batas ketelitian
- 1 px = 0,14 % tinggi; JPEG + kompresi IG memberi ±0,3 % di tepi huruf. Kata yang sedang fade-in terukur lebih kecil/abu.
- Kap diukur dari satu huruf per ROI; bisa ikut garis bawah atau titik bila ROI menyentuhnya.
- Kamera: transform 2D global; animasi isi (objek bergerak sendiri) tercampur dengan gerak kamera.
- Label earshot adalah tebakan CLAP; SFX menyatu dengan drum musik sehingga level SFX vs musik tidak terpisah.
