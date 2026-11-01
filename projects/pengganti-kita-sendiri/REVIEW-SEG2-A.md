# REVIEW SEG2 · worker A (0–65 s)

## Perubahan mekanis (diterapkan)
| temuan | perubahan | status |
|---|---|---|
| SAFE company 5,6–6,1 / was 9,1 | baris remaja/Bloomberg baseline 800→760 (gap remaja 24), baris FAST 870→770 (+ elips latar FAST yang sudah ada ikut y 840→750) | LOLOS |
| SAFE PENGGANTI 13,3–14,4 | size 210→140 (lebar layar ≤ safe setelah push kamera 1,15×) | LOLOS |
| SAFE LEBIH/CEPAT 18,7–18,9 | size 150→130 (whip masuk tetap di dalam safe) | LOLOS |
| SAFE SEDERHANA 24,3–25,1 | JANJI SEDERHANA dipindah ke bawah sumbu (x 470/870, y 770); zoom kamera 1,12 tidak lagi mendorong keluar | LOLOS |
| SAFE KREATIF 30,9–31,7 | size 136→108 + pusat layar bidang digeser −130 px (anch.x = BLOOM_PT.x−130) | LOLOS |
| SAFE Jensen 58,4–61,1 | baseline 266→306, x 300→312 | LOLOS |
| SAFE TEKNOLOGI INI / NGGAK / PEDULI 61,3–64,3 | size 150/200→120 (seragam satu kalimat) | LOLOS |
| font | BERLOMBA-LOMBA (cat lintasan, S01) → Geist Sans 600, huruf kapital di awal | — |

## Diterima — keputusan Irfan 07.30 (teks terbaca tanpa scrim)
CONTR teks narasumber di atas video (montase Gates 1,6–3,6 s; Bloomberg 6,8–7,4 s: Technical, thing, ever, my, lifetime, in, a, Raised, over, Billion). Scrim yang sempat saya buat sudah DIBUANG.
CONTR TEMPAT 54,2 s: 1 frame saja, frame masuk blur→tajam; bukan cacat.

## Usulan (perubahan desain, belum diterapkan — Claude utama yang memutuskan)
1. **BERLOMBA-LOMBA (S01 11,4–12,6 s) keluar safe.** Masalah: cat lintasan 150 px selebar 1438 px bergeser 9 px/frame bersama lintasan, jadi kiri kata keluar x<288 dan terbaca saat zoom-through. Usulan: font 120, mulai x 400 di ruang dunia, kata bergeser hanya 0,4× kecepatan lintasan (selesai ≤ 100 px) agar tetap di safe selagi dicat. Prinsip: teks utuh di safe, hierarki. Penonton: mata mengikuti pemimpin balapan lalu membaca cat dari kiri ke kanan tanpa terpotong. Pratinjau: tidak dirender di commit (eksperimen sudah lolos checker pada versi 0,4×).
2. Kontras narasumber tetap diterima; tidak ada usulan.
# Segmen 2 · laporan tata letak (/home/claude/pks/seg2/A)

Frame diperiksa: 148 · temuan: 12

| aturan | objek | frame (s) | contoh |
|---|---|---|---|
| CONTR | speaker:Technical | 1.6–3.6 (2) | 2.1:1 |
| CONTR | speaker:thing | 3.0–3.6 (3) | 2.2:1 |
| CONTR | speaker:ever | 3.0–3.6 (3) | 3.5:1 |
| CONTR | speaker:my | 3.0–3.6 (3) | 3.8:1 |
| CONTR | speaker:lifetime | 3.2–3.6 (2) | 4.4:1 |
| CONTR | speaker:in | 3.6–3.6 (1) | 2.0:1 |
| CONTR | speaker:a | 6.8–7.4 (4) | 4.3:1 |
| CONTR | speaker:Raised | 7.0–7.4 (3) | 3.5:1 |
| CONTR | speaker:over | 7.0–7.4 (3) | 3.8:1 |
| CONTR | anchor:Billion | 7.0–7.4 (3) | 3.2:1 |
| CONTR | anchor:TEMPAT | 54.2–54.2 (1) | 4.4:1 |
| SAFE | text:BERLOMBA-LOMBA | 11.4–12.6 (7) | x -1032–864 y 804–1080 |

GAGAL — perbaiki kode lalu ulangi Segmen 2

## Putaran lanjutan (keputusan Claude utama, diterapkan)
- BERLOMBA-LOMBA (S01): size 120, mulai x 400, geser 0,4x lintasan, Geist Sans 600; probe hanya saat teks tampak (paint>0, bukan zoom-through). Checker 11-13 s LOLOS; still /home/claude/pks/v10/berlomba_{1,2,3}.png.
- S02b: satu baris rapat "Janji sederhana" (x kedua = x pertama + lebar "Janji" + 0,26 em, pusat dunia 990 = sekitar 960 layar setelah zoom), y 770. Checker 24-26 s LOLOS.
- S03c Jensen: baris di ruang layar (bukan lapisan kamera); kedua baris size 62 mulai x ~ 310-330, berakhir x <= 1010 (kepala Jensen > 1050). Checker 56-62 s: tersisa CONTR 1 frame Job 56,7 dan "lose" 58,2 di atas video narasumber (diterima, keputusan Irfan 07.30). Still /home/claude/pks/v10/jensen_chk.jpg (f1701, 1770, 1812, 1830).
