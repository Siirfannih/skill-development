# 56 · Data ukur mentah (Motiondesaignwork.mp4)

Sumber: 720×1280, 5061/200 fps (25,3), 6,758 dtk, audio 44,1 kHz. Satu shot (scene detect ffmpeg ambang 0,15: 0 cut).
Frame: `frames/` (2 fps, 13 bh), `frames10/` (10 fps, 66 bh; dipakai untuk ukur). Sheet 10 fps: `cs10.jpg`; ringkas: `sheet.jpg` (1 per 2 dtk, 4 frame, sisanya sel kosong karena video 6,8 dtk).

## Per frame kunci (% frame; x terhadap lebar 720, y terhadap tinggi 1280)
| Frame | t | Judul | Batang (x kiri, lebar, puncak, tinggi, warna inti) | Lain |
|---|---|---|---|---|
| k1 grid-kosong | 0,2 | belum | — | sumbu tumbuh; asal (21,8; 65,8) |
| k2 judul-ketik | 0,5 | y 24,8–26,9, lebar 26,7 (sedang diketik) | merah mulai 0,8 | bola (32,3; 64,3) 4,0×2,3 |
| k3 teoria | 1,3 | y 24,8–26,9, x 23,3–76,7, pusat 50,0 | merah 30,1 / 4,58 / 56,3 / 9,3 / #E52C1C | sumbu y 25,0, sumbu x 45,6 |
| k4 prática | 3,4 | sama | kuning 48,8 / 4,44 / 50,4 / 15,2 / #ECD217 | bola di udara (50,6; 61,9) 4,3×4,6 (stretch) |
| k5 erro+push | 4,8 | y 25,2–27,3, x 18,6–75,4 | hijau 66,1 / 4,72 / 34,0 / 34,8 / #4BD61D; merah 25,8/5,00 | asal (16,7; 69,1); bola (68,4; 32,8) |
| k6 runtuh | 5,6 | sama, mulai dihapus 6,0 | kuning tinggal 2,0; hijau 30,8 | — |

- Kapital "O" judul: tinggi 1,64 %, lebar 2,78 %. Label "teoria/prática": tinggi total 1,56 % (y 66,7–68,2), x-height ±0,95 %, warna #C3C1BF.
- Judul putih #DAE8D6, hijau #87C573 (kata "aprendo com..."), 1044 px sampel.
- Latar sudut #000000; luma rata tengah 12,5 (0,4 dtk) → 41,5 (4,7 dtk) → 17,5 (6,3 dtk) = bloom ikut batang.
- Glow kanan batang hijau (luma per 10 px): 125, 38, 31, 28, 23, 21, 17, 16, 16, 11.
- Grid: luma median area grid 24, garis 150–210 (sumbu).

## Linimasa (tinggi batang % / lebar judul %), 10 fps
- Judul diketik 0,3→0,8 (0 → 53,3). Merah 0,5→0,9 (0 → 9,2). Kuning 2,3→2,8 (0 → 15,1). Hijau 3,9→4,5 (0,3 → 33,8; lompat 10 → 27 di 4,2→4,3).
- Push: lebar judul 53,3 (4,2) → 57,5 (5,2) = skala 1,078; jangkar dihitung dari judul & batang ≈ (82–84 %, 19–21 %).
- Runtuh: merah 5,0→5,5, kuning 5,3→5,9, hijau 5,6→6,4. Judul dihapus 6,0→6,5. Frame awal vs akhir: beda rata 1,07/255 (loop).

## Audio
- ffmpeg ebur128: −14,2 LUFS, LRA 1,3 LU. earshot: −14,3 LUFS, TP −1,3 dBTP, pulse clarity 0,06, 19 event; aksen 0,67 (+8 dB), 4,01 (+24 dB sub drop), 4,29 stab −1,3 dBFS, 6,40 (+5 dB).
- librosa: tempo 112,3 bpm, beat 0,19 0,72 1,28 1,79 2,28 2,79 3,30 3,78 4,32; onset 0,19 0,70 1,28 3,04 3,76 4,32 5,85. RMS per 0,5 dtk (dB): −21,9 −17,2 −16,9 −14,4 −17,4 −22,1 −28,2 −19,6 −13,1 −16,2 −17,1 −14,8 −12,5 −16,6. Centroid per dtk: 2523 2073 2095 2152 2036 1374 1363 Hz.
- pace_read.py: 0 cut, shot median 6,8, gerak layar 1,3, usulan slowdown (tidak cocok: tidak ada bicara, gerak sigap).

## Skrip (salinan di `scripts/`)
- `measure.py` (judul, batang HSV, warna inti), `m2.py` (kapital, label, sumbu/grid, bola, warna judul, glow), `tl.py` (linimasa batang/judul), `cam.py` (asal sumbu per frame + librosa).
- Perintah: ffmpeg fps=2/fps=10, scene detect, ebur128; `earshot timeline --detail high`; `pace_read.py`.

## Batas ketelitian
- 720p: 1 px = 0,078 % tinggi / 0,139 % lebar; huruf kecil ±0,1 % (±8 %). Glow melebarkan batas ambang ±1–2 px.
- Batang diukur dengan ambang HSV; tepi glow bisa menambah ±0,3 %. Jangkar push dihitung dari 3 titik, ±3 %.
- Font hanya kemiripan visual (Segoe UI/Selawik), tidak dicek dengan metadata.
- Label SFX earshot = tebakan CLAP (lemah pada musik); waktu dan level terukur. Musik dan SFX bercampur di satu track (tanpa stem).
