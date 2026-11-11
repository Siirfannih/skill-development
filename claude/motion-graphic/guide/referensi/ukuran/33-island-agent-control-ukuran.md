# 33 · Ukuran mentah (11 Nov 2026)

Sumber: `.../instagram/daa504957c9923dc242a/video.mp4` · 1276×720, 25 fps, 103,07 dtk, AAC.
Frame: `frames/f001…f103.jpg` (1 dtk). Sheet kerja bercap waktu: `work/sheet1s.jpg`. Skrip: `work/measure.py` (bbox piksel yang beda > ambang dari warna latar, % frame), `work/cam.py` (ORB + estimateAffinePartial2D antara frame awal+0,15 dtk dan akhir−0,15 dtk tiap shot).

## Per frame kunci (y/x dalam px 1276×720; h = tinggi bbox % H, w = % W)
| Frame | Elemen | bbox | h % | w % | pusat (x,y %) | warna |
|---|---|---|---|---|---|---|
| k1 t=1 | "Agents" seluruh | y340–719 x0–1275 | 52,6 | 100 | 50, 71 | latar #F0EBE8 |
| k1 | x-height (batang n) | y426–675 | 34,7 | — | — | #92B8AA |
| k1 | 't' ascender | y362–675 | 43,6 | — | — | gradien #BCABD8 → #83BD9E |
| k2 t=4,5 | medan titik | 381 komponen | Ø 4,3 (31 px) | — | — | #393436 |
| k3 t=12 | titik tajam / titik buram | y144–241 / y48–146 | 13,6 / 13,8 | 7,7 | 45,27 / 8,13 | #393436 / #514C4A |
| k3 | "Onboarding" | y457–529 x281–689 | 10,1 | 32,1 | 38, 68 | #3A3537 |
| k3 | "Getting Started" | y433–447 | 2,1 | 7,7 | 26, 61 | #8E8986 |
| k3 | pil "Skipped" teks | y428–455 | 3,9 | 8,6 | 88, 61 | #E08487 di #FDFDFD |
| k4 t=26 | "-$0.42" | y250–479 x711–1275 | 31,9 | 44,3 | 78, 51 | #373438; bayangan #797476 |
| k4 | "Delegating.." | y352–381 | 4,2 | 11,4 | 28, 51 | #635E5B |
| t=9 | kalimat kecil | y344–377 x341–1025 | 4,7 | 53,7 | 54, 50 | #4B4644 |
| t=30 | "your agents worked on your terms?" | y349–405 x216–1072 | 7,9 (asc–desc) | 67,2 | 50, 52 | x-height 3,6 % |
| k5 t=35 | baris 1 judul | y280–364 x250–968 | 11,8 (dgn italic) | 56,3 | 48, 45 | #F8FBFE di langit #8BADC1 |
| k5 | kapital 'A' "Agentic" | y380–444 | 8,9 | — | — | — |
| k5 | bingkai kartu | tepi kiri 28 px, atas 23 px | 3,2 | 2,2 | — | #F0EBE8; rumput #345237 |
| k6 t=56 | "Identity Gateway" | y60–92 x905–1203 | 4,6 | 23,4 | 83, 11 | #EDF5F7 di #051414 |
| k6 | "GitHub" | y356–379 | 3,3 | 7,4 | 14, 51 | kartu #C6EBE3; toggle #8FDDBE |
| k6 | panel kiri / kanan | x24–833 / x858–1250, y24–696 | 93 | 63 / 31 | — | — |
| t=48 | "AI Skills" / baris tabel | y80–123 / y370–410 | 6,1 / 5,7 | 16,1 / 24,1 | 31,14 / 28,54 | #373537 di #FDFDFD |
| t=88 | "John Coltrane" | y346–368 | 3,2 | 15,1 | 31, 50 | latar buram #1F2A21 |
| k7 t=71 | jendela chat | — | — | — | — | #232024; senja oranye |
| k8 t=95 | 't' / baris / pil | y316–375 / y316–390 / y288–411 | 8,3 / 10,4 / 17,2 | — / 30,7 / 56,3 | 49, 49 | #A7EFD4 di #051414 |
| t=97 | "the future of enterprise work" 2 baris | y287–432 x229–1051 | 20,3 | 64,5 | 50, 50 | #F0FAF6 |

Ketajaman (Laplacian var): lanskap tajam t=35 75,3; lanskap di belakang UI t=88 2,0, t=39 6,8; hutan t=56 1597 (tajam, detail tinggi).

## Kamera (cam.py; skala >1 = push, tx/ty % frame)
6,80–33,92 (27,1 dtk) s 0,741 ty +13,9 % (morph, inlier 10, lemah) · 37,68–41,76 s 1,116 · 54,68–57,68 s 0,977 · 60,28–62,56 s 0,922 · 72,76–76,60 s 1,151 · 76,60–78,80 ty −18,7 % · 84,04–88,56 tx −49,5 % · 90,24–91,84 tx −25,4 % · 91,84–95,84 s 1,140 (inlier 13, lemah) · sisanya |s−1| < 0,035. Shot tanpa fit: kartu judul/teks (fitur kurang).
Cut ffmpeg scene>0,25: 30 titik (1,8 2,72 4,48 6,56 6,8 33,92 37,68 41,76 42,64 46,6 50,84 54,68 57,68 60,28 62,56 63,92 69,72 72,76 76,6 78,8 80,84 84,04 88,56 90,24 91,84 95,84 98,32 98,56 98,72); 31 shot, median 2,48 dtk, 17,5 cut/menit. pace_read: 26 cut, 15,1/menit, median 2,7, event visual 35/menit, bicara 4,6 suku kata/dtk.

## Audio
ebur128: I −14,3 LUFS, LRA 4,5 LU, peak +0,2 dBFS (earshot: true peak +0,2 dBTP). librosa (wav 22,05 kHz mono): tempo 123,0 bpm; 471 onset (274/menit); energi < 250 Hz 27 %; chroma teratas A, G, G#, C; RMS per 8 dtk −20,9 −19,6 −19,4 −18,0 −16,8 −18,1 −17,9 −20,4 −19,8 −19,4 −18,3 −19,8 −24,8 dB.
earshot timeline --detail high: 689 event (6,7/dtk), tag 37 ui / 18 voice / 13 whoosh / 10 note / 7 foley / 5 hit / 3 riser / 2 key / 1 drum; grid ±122 bpm clarity 0,16; 6 seksi (0–14,4 tech house?; sisanya corporate inspiratif, pizzicato pada 34–60 dan 87–103); gap 0,3–0,6 dtk di 2,40 5,30 7,35 9,95 61,15; 91 % dari 66 cut punya onset ≤ 100 ms.

## Batas ketelitian
- 1 px = 0,14 % tinggi / 0,08 % lebar. Bbox mengikutsertakan ascender/descender kecuali disebut x-height/kapital.
- Frame diambil per detik: kata yang sedang memudar/masuk bisa terukur lebih kecil. Hex = median 12×12 px, terkompresi H.264.
- Font diidentifikasi dari mata, bukan metrik. Tag earshot = tebakan CLAP. Level musik vs VO tidak terukur (tanpa stem).
- Skala titik depan ±20 % dan diagram cincin 51×91 % diukur dari montase skala 0,627 (±2 %).
