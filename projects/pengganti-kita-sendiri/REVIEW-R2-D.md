# REVIEW R2-D

Perubahan (remotion/src/scenes):
- P1 ukuran anchor VO seragam 130 px: S04a, S05a (lapisan kontra-skala), S05c, S05f, S05h, S06g, S04c (ARAHNYA x1400 y795 di bawah garis solid; JANJINYA x1440 y265 di atas garis putus-putus). S06e sudah 130.
- P2 S00: pre-roll 2 frame Gates di t=0 (frame 0-1 tidak kosong); framing Gates s 1,38 -> 1,46, tx -155 -> -228 (pita lower-third CNBC keluar frame, wajah tetap).
- P2 S02a: titik anchor close-up gy 450 -> 565 (header WIKIPEDIA tidak terpotong 21,3-21,9 s).
- P2 S03a: pusat kamera dijepit agar kotak prompt punya margin kiri >= 60 px (41-45 s).
- P3: sfxMark whoosh 23,0 s (S02a).

Hasil checker (probe + tools/seg2_layout_check.py): S02a, S03a, S04c, S06e, S05a, S06g LOLOS. S04a/S05c/S05f/S05h hanya CONTR 1 frame di frame masuk anchor (diterima). S00 hanya CONTR teks narasumber di atas footage (diterima koordinator, termasuk "the" 3,9:1).
Still: r2d_s02a.jpg, r2d_s03a.jpg, r2d_anchors.jpg (lokal, /home/claude/pks/v10/a/).

Tidak bisa dikerjakan (file di luar daftar): mark transisi 12,67 s (S01), 55,9 s (S03c), 71,03 s (S04d), 126,25 s (S06f); anchor Perlahan/Tempat kita di S03c (ditangani koordinator).
