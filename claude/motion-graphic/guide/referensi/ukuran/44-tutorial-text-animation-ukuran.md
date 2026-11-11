# 44 · Data ukur mentah (IG DeCyKOiRa2o)

Sumber: `canvas-skill-library-20261102/.../instagram/3001252af79222356f87/video.mp4` · ffprobe: 720×720, 30 fps, 39,23 dtk, ada audio.
Frame: `frames/fNNN.jpg` tiap 0,5 dtk (fNNN = t (NNN−1)/2 dtk), 78 frame. % terhadap 720 px.

## Frame kunci (keyframes/)
| Kunci | t | Teks | Ukur |
|---|---|---|---|
| k1 hook-judul | 0,5 | "Text animation" | blok x 13,4–90,1, y 40,5–60,1; glif x-height 6,0–6,9, kapital T 8,9–9,2, "tio" naik 10,6 |
| k2 hook-kartu-ui | 1,5 | – | kartu x 14–87, y 23–66 (grid manual); gerak 1,0→1,5 dtk skala 1,74, dx −32 %, dy −25 % |
| k3 hook-kalimat-blur | 4,0 | "Nobody wants to reveal" | x 12,2–93,3, y 45,8–54,1; glif 4,2–4,7 (x-height), 5,0–6,4 (naik), 7,6 (gabungan) |
| k4 caption-bergaris | 6,0 | "how to"/"recreate it" | y 52,8–57,1 (comps), grid 51–61; glif maks 4,3; garis `#2181CD` |
| k5 ui-caption | 16,5 | "down to zero" | x 34,9–65,3, y 92,5–96,2; glif maks 3,61, median 2,50 |
| k6 ui-menu-zoom | 18,5 | "animator" | menu Animate x ±55–94, y ±38–100 (grid manual) |
| k7 ui-ekspresi | 28,5 | "my expressions" | x 36,1–63,9, y 92,5–97,2; glif 3,61 / 2,64 |
| k8 demo-cta | 37,5 | "expressions" biru | CTA y 77,8–85,3, x 27–73; glif biru maks 5,7–7,5; demo teks y ±49–56, x 23–75 |

Caption lain: f017 "in <1 minute" x 33,6–66,4 y 92,5–97,2 · f022 "layer." 34,3–65,7 · f026 "Change these" 40,8–59,2 · f064 "from 0 to 100" 32,5–67,6 (semua kapital 3,5–3,6, x-height 2,5).

## Warna (median potongan)
langit atas `#54C0F8`, langit dekat cakrawala `#67CCFB`, rumput `#A9D24B`, sudut kiri atas `#83D3F9` (lebih terang: tanpa vignette); panel AE `#1D1D1D` (sd 0,0); preview `#000000`; CTA biru `#1689E3`; garis caption awal `#2181CD`. Grain high-pass sd: langit 0,33, UI 0,00.

## Kamera (ORB + estimateAffinePartial2D antar frame 0,5 dtk, caption dibuang)
Pindah besar (|dx| > 15 % atau skala ≠ 1 ± 8 %): 8,5 / 10,0 / 12,5 / 13,5 / 15,5 / 17,0 / 18,5 / 20,5 / 22,5–23,5 (0,64×) / 26,5 (1,66×) / 30,5 / 32,5 / 34,5 dtk.
Pola ease-out, contoh: 12,5→13,0 dx −36,4 %, 13,0→13,5 −9,9 %, lalu ±1 %; 32,5→33,0 +54,6 %, +24,6 %, +8,3 %, lalu diam. Jeda median 2,0 dtk.
Hook: 0→0,5 skala 1,12; 4,0→5,0 skala 1,19 lalu 1,15 (push), dy −9…−13 % (naik).
ffmpeg scene > 0,25: 5,47 / 5,50 / 7,53 / 7,60 / 10,17 / 15,67 / 20,8 (hanya 5,5 cut keras; lainnya pindah kamera cepat).

## Audio
ebur128: −14,3 LUFS, LRA 4,1 LU, true peak −0,5 dBFS. earshot: 297 onset (7,6/dtk), 4 seksi (tech house 0–5,2 / glitch hop 5,2–11,45 / house 11,45–33,25 / trap 33,25–39,15), pulse clarity 0,09; label: 63 voice, 26 ui, 3 foley, 1 hit, 1 key, 1 whoosh-runner-up. librosa beat_track per seksi: 161,5 / 136,0 / 117,5 bpm (total 129,2). pace_read: 6 cut = 9,2/menit, shot median 5,1 dtk, event visual 34/menit, bicara ±6,3 suku kata/dtk.

## Skrip
- `scripts/ukur.py`, `scripts/ukur2.py`: mask putih (min BGR > 215) / putih-di-langit (S < 35–60, V > 225–240) / biru (H 95–125, S > 120) + connectedComponents; tinggi glif = tinggi komponen.
- `scripts/grid.py`: overlay grid 5 % untuk baca manual (tmp/g1.jpg, g2.jpg).
- `scripts/warna_kamera.py`: median hex, luma sudut, grain, estimasi gerak global.
- Audio: ffmpeg ebur128, `earshot timeline --detail high` (tmp/earshot.txt), `pace_read.py`, librosa.

## Batas ketelitian
- 1 px = 0,14 %; tepi glif berbayang/bergaris menambah ±1–2 px (±0,3 %). Garis biru caption ikut terukur pada CTA (5,7–7,5 % termasuk garis).
- Teks di langit: awan putih bisa ikut ter-mask; angka hook dicek ulang dengan grid manual.
- Gerak kamera: sampel 0,5 dtk terlalu jarang untuk easing per frame; pada blur berat/cut, "tak terukur". Font: dugaan dari bentuk, tidak diverifikasi.
- Musik dan VO tidak dipisah (tanpa demucs): bpm per seksi dan label earshot adalah petunjuk; level musik vs suara tidak terukur.
