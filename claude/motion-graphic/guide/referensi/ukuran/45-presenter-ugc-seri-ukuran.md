# 45 · Ukuran mentah (IG DeerQIuSXHo)

Sumber: `.../instagram/5adf501ff6fbea2b21e7/video.mp4` · 720×1280 (9:16), 30 fps, 66,17 dtk, audio 44,1 kHz.
Semua % terhadap frame penuh (tinggi 1280 px = 100 %, 1 px = 0,078 %; lebar 720 px, 1 px = 0,14 %).

## Teks (mask warna krem R>215,G>190,B 140–225 / karat R>130,G<90,B<80; kotak per baris setelah close+dilate)
Tinggi kotak = puncak ascender sampai dasar descender pada kata itu (bukan cap height murni).
| Frame | Kata | Kotak x % | Kotak y % | Tinggi % | Lebar % |
|---|---|---|---|---|---|
| k1 1,0 s | "Did" | 12–37 | 17,6–24,5 | 6,95 | 24,9 |
| k1 | "you" (sisip kecil) | 42–54 | 23,0–25,9 | 2,97 | 11,7 |
| k1 | "know?" | 43–88 | 27,0–32,3 | 5,31 | 44,9 |
| k1 | caption "get paid" | 37–63 | 53,0–56,6 | 3,3–3,7 | 25,4 |
| 9,0 s | "This" | 11–31 | 10,5–17,0 | 6,48 | 19,9 |
| 9,0 s | "Day" / "2" | 13–43 / 49–58 | 15,4–25,7 | 10,3 / 8,5 | 30,7 / 9,0 |
| 9,0 s | baris kecil "and grow as a get" | 10–70 | 25,5–29,1 | 2,7–3,3 | 60 |
| 23,6 s | "User" / "Generated" | 11–35 / 23–71 | 17–23 / 24–29 | 5,9 / 4,9 | 24 / 47 |
| 49,5 s | "So" / "How" | 11–18 / 11–57 | 11–14 / 15,5–22 | 3,2 / 6,4 | 7 / 46 |
| k8 64,6 s | "“UGC”" | 25–75 | 22,5–31,9 | 9,38 | 49,9 |
| k4 46,0 s | caption "managed to" | 27–73 | 53,6–58,0 | 4,45 (g) | 45,6 |
| 19,0 s / 23,0 s / 64,0 s | caption 1 kata | 35–65 | 53,4–57,7 | 1,95–4,3 | 19–30 |
| k3 13,5 s | "where" karat di kartu krem | 40–60 | 47,2–50,5 | 3,28 | 19,6 |
| k2 15,0 s | judul "recommend" di atas inset | 32–68 | 9,5–12,3 | 2,89 | 36,8 |

Pusat caption dada: x 50 %, y 55–56 % di semua frame wajah. Judul atas kepala: y 10–32 %, rata kiri x ≈ 10–12 % (kecuali "UGC" tengah).
Animasi (strip 15 fps 6,4–7,6 s dan 44,5–45,5 s): kata muncul utuh dalam 1 frame, tanpa fade/slide; judul menumpuk per kata; caption diganti kata per kata (1–2 kata).

## Warna (median potongan piksel)
Krem kartu `#FCE2B8` (rata, sudut = tengah: tanpa vignette/grain) · karat bingkai `#BA4730` · huruf karat di krem `#B94C35` · huruf krem judul `#FEE2BB`/`#FFE0B8`.
Set presenter: plafon `#493D34`, dinding `#6E5A4A`, matras `#024650`, sudut bawah `#041119`, sudut atas `#0B1013`. Luma tengah (r<0,3) 76 vs tepi (r>1,1) 35 → vignette ±−6,7 dB.
Rata-rata keyframe: k1 `#3C433C` S 141 · k5 b-roll hijau `#142519` L 39 · k6 grid layar `#201A16` L 35 (p99 77 = digelapkan) · k7 tangan `#412D22`.

## Skala subjek (grid 5 % pada 46,0 s dan 1,0 s)
Kepala y 34–48 % (±13 % tinggi), x 41–59 %. Badan/hoodie x 15–90 %, y 45–65 %. Matras teal y 63–100 % (lapis depan). Plafon y 0–32 % = ruang judul.
Inset (bingkai karat, potongan kolom/baris non-karat): masuk 84 % lebar → 67 % dalam ±1 dtk (14,35→15,35 s: 84/76/72/70/69 %), lalu diam 67 %. 9:16, pusat (50, 50). 38,8 s: 82→66 %. 61 s: kartu karat kata saja (inset tidak ada).

## Kamera (ORB + estimateAffinePartial2D, frame awal vs tiap 0,2 s dalam shot)
Push-in shot wajah: 1,00→1,08 (0,2 s)→1,15 (0,6 s)→1,20 (1,4 s) lalu tahan; terukur di 18,4 / 27,2 / 43,3 / 52,6 s. Ease-out.
Pull-out (mulai 1,33×→1,00): 0,0 / 10,3 / 63,4 s; 0–6,4 s pull → tahan → push lagi di 4,4 s (1,33× dalam 1,2 s).
Tengah shot 54,5–58,2 s: diam 1,6 s lalu push +25 %. Shot 6,4–10,3 dan 20,8–24,3 s: diam (1,00).
Cut (beda piksel >18 dan >2,5× median lokal): 25 cut = 22,7/menit, shot median 2,23 s. ffmpeg scene>0,25: 20 cut. pace_read: 17 cut, median 2,6 s, event visual 28/menit.

## Audio
ebur128: −14,1 LUFS, true peak −0,2 dBFS, LRA 3,2 LU. RMS 50 ms: p50 −17,9 dB, p5 −31 dB (dasar musik di jeda) → musik ±13 dB di bawah suara.
librosa: 99,4 bpm, PLP 0,18. earshot: musik AST 0,55–0,65 sepanjang video (tag: tech house / chiptune / house, vocal chop); UI pop 15, glockenspiel/pluck ±20, whoosh 3, riser 1 (52,6 s pada cut 52,57). pace_read: 6,8 suku kata/dtk.
Pop jatuh pada cut: 33,21 (cut 33,20), 50,67 (50,63), 63,47 (63,43), 18,54 (18,37), 13,68 (inset 14,3).

## Skrip
`tmp/measure.py` (mask warna → kotak teks), Python inline: cut + ORB affine per shot, profil skala tiap 0,2 s, lebar inset tiap 0,25 s, median hex, vignette radial, librosa bpm/RMS. earshot timeline --detail high, pace_read.py, ffmpeg ebur128/scene.

## Batas ketelitian
Sumber 720p hasil unduhan IG (kompresi). Tinggi kotak termasuk ascender/descender: "Day" 10,3 % memuat "y"; cap height "2" 8,5 % lebih jujur. Mask krem ikut menangkap highlight footage (kotak <1 % dibuang). Skala kamera dari ORB ±1 %; pada shot dengan inset/kartu, skala = gerak inset, bukan kamera. Label earshot = tebakan CLAP; glockenspiel bisa melodi musik atau SFX ding. Font tidak terukur pasti (tanpa metadata).
