# 68 · Baikov kedua: data ukur mentah

Sumber: `/home/irfan/work/pustaka-video/mac/baikovphilipp_ssspin.io_1793345363.mp4` · 736×414, 30 fps, 47,33 dtk, h264 + audio.
Frame: tiap 0,5 dtk (`frames/fNNN.jpg`, t = (N−1)×0,5). Sheet ringkas `sheet.jpg` (tiap 2 dtk, 8 kolom, sel 300 px).

## Skrip
- `skrip/ukur_teks.py frame x0 y0 x1 y1 mode thr`: mask teks (luma>/luma</kuning-limau HSV), komponen terhubung → tinggi huruf px & %, blok & pusat.
- `skrip/warna_kamera.py`: hex median potongan 20×20, aksen (HSV H 25–42, S>150, V>200), rasio luma sudut/pusat, grain (std high-pass), kamera ORB 1500 + `estimateAffinePartial2D` antar frame 0,5 dtk.
- Skala subjek: bbox otomatis gagal di latar gradien → estimasi visual dari grid frame asli (±3 %).
- Audio: `ffmpeg ebur128=peak=true`; `earshot timeline --detail high` (pada wav ekstrak); `pace_read.py`; librosa beat_track + onset.

## Teks (tinggi px dari 414; cap = huruf kapital/ascender, x = x-height)
| Frame (t) | Isi | Cap | x-height | Blok x / y | Pusat |
|---|---|---|---|---|---|
| f005 (2,0) | "Everything" bold limau + "starts with a" reg | 19–20 px = 4,8 % (sama keduanya) | 13–14 = 3,3 % | 20–60 % / 47–53 % | (40, 50) |
| f013 (6,0) | "Question" | Q 44 = 10,6 %, t 33 | 30 = 7,2 % | 14–46 % / 53–63 % | (30, 58) |
| f018 (8,5) | "What if this could" + "grow" | W 18 = 4,3 % | 13–14 = 3,3 % ; grow 16 = 3,9 % (g 23) | 7–50 % / 80–89 % | (29, 85) |
| f025 (12,0) | "Turning / Ideas" | T 32–33 = 7,9 % | 24–25 = 6,0 % | 27–50 % / 33–60 % | (38, 46) |
| f035 (17,0) | "GROWTH" bold limau | 47–48 = 11,5 % | — | 46–86 % / 44–55 % | (66, 49) |
| f058 (28,5) | "Design / shapes / the journey" | 27 = 6,5 % | 14 = 3,4 % | 18–42 % / 56–67 % | (30, 61) |
| f074 (36,5) | "crafted to move / people forward" | 30–32 = 7,5 % | — | 11–42 % / 63–71 % | (27, 67) |
| f084 (41,5) | lockup 5 baris "Because…how it looks" | 40 = 9,7 % | 28–29 = 7,0 % | 10–45 % / 11–89 % | (28, 50) |
| f091 (45,0) | "Ready to grow?" | 29–32 = 7,4 % | 22–23 = 5,5 % | 26–76 % / 46–56 % | (51, 51) |

## Warna (hex median)
- Gelap f005 sudut `#08261C`; tengah f013 `#12503B`/`#0C5139`; glow f053 `#18A579`; blob limau f005 bawah `#A3CF3A`.
- Terang f034/f091 `#FDFEEE`, `#E6FFD3`, pusat `#E9FF7E`/`#F2FFE1`. Aksen median semua frame `#C1E63A`.
- Teks CTA (luma<120) `#2B6741`; teks lockup (luma>200, campur kata limau) `#E4FFAD`.
- Grain 0,0; rasio luma sudut/pusat per 3 dtk: 1,02 0,56 1,57 2,27 0,34 0,95 1,02 1,91 1,14 0,63 0,76 0,76 0,74 1,20 0,96 1,13.
- Ketajaman Laplacian var: footage blur f022 9,4 / f025 72 / foto f039 39 / UI f058 182. Saturasi median footage 31–37.

## Skala subjek (estimasi visual, % L × % T)
kubus kaca f018 27×50 (x 55–82 %) · foto wanita f047 60×61 (x 20–80, y 19–80) · dashboard f062 48×53 (x 26–74, y 23–76) · kartu cuaca f068 33×30 (x 4–37, y 53–83) · bunga transisi f060 19 % L (otomatis).

## Kamera (ORB, inlier ≥ 100 dianggap andal)
- Tahan: skala 0,997–1,008, geser ≤ 0,5 % (0,5–2; 7,5–8,5; 12,5–13; 20–23; 30,5–31,5; 36,5–37,5; 39,5–41; 44,5–47).
- Footage 10,5–12,5: geser 0,3–2,4 %, inlier 21–134 (lemah).
- Dashboard 25–28: skala 0,871–0,999, dy sampai 30 % (inlier 51–96) = gerak 3D layer.
- Lompatan besar (skala 0,01–0,5, inlier < 15) = transisi/morf, bukan gerak kamera.
- Scene 0,25: 14,20 · 19,87 · 23,80 · 32,50 · 33,77 · 42,10.

## Audio
- ebur128: −12,8 LUFS, LRA 4,1 LU (−16,2…−12,0), true peak +0,3 dBFS (earshot 0,5 dBTP).
- earshot: 242 event (5,1/dtk), 96 tag: 69 ui, 16 voice, 8 note, 2 foley, 1 whoosh; seksi 0–17,6 (−14 LUFS), 17,6–39,55 (−12), 39,55–47,35 (−12); jeda 0,5–1,2 dtk di 2,10 / 4,80 / 8,30 / 16,25 / 19,00; pulse clarity 0,04.
- librosa: 117,5 bpm (tak stabil), 195 onset. RMS per 4 dtk (dB): −20,6 −22,5 −20,2 −18,3 −21,4 −18,0 −17,6 −17,2 −20,1 −17,9 −17,0 −25,9.
- pace_read: 6 cut = 7,6/mnt, shot median 5,7 dtk, event visual 32/mnt, 4,3 suku kata/dtk.

## Batas ketelitian
- 414 px tinggi: 1 px = 0,24 % T; huruf kecil ±1 px = ±7 %. Frame diambil saat animasi bisa menangkap huruf yang belum penuh.
- Font dari bentuk huruf saja (tanpa metadata). Skala subjek visual ±3 %. Level musik vs VO tidak terukur (tanpa stem).
