# 34 · ukuran mentah (11 Nov 2026)

Sumber: `.../instagram/07435b43e6a90804a7fd/video.mp4` ("IG DbszEmpIfK8") · 1276×718, 30 fps, 10,0 dtk; audio 44,1 kHz 10,12 dtk.
Frame: `frames/` tiap 0,5 dtk (f000 = 0,0 dtk); `dense/` 10 fps lebar 320 untuk kamera; `keyframes/34-k1…k7-*.jpg` (lebar 1080 px, q≈85).

## Skrip
- `scripts/ukur_teks.py <frame> x0,y0,x1,y1 light|dark <ambang>`: komponen terhubung → baris, tinggi, lebar, pusat.
- `scripts/huruf.py` (sama, persentil 30/90 tinggi komponen = x-height / ascender-cap).
- `scripts/warna_geom.py`: hex rata-rata 12×12 px, kotak sorot (HSV biru), piksel sian terang, jari-jari cincin.
- `scripts/objek_kamera.py`: lencana (blob putih), kolom cari, kamera = ORB 1500 + `estimateAffinePartial2D` antar-frame 0,1 dtk.
- ffmpeg `select=gt(scene,0.15)`, `ebur128=peak=true`; `earshot timeline --detail high` (earshot.txt); `pace_read.py` (pace.txt); librosa beat/onset/chroma (audio.txt).

## Teks per frame kunci (% H = tinggi 718, % W = lebar 1276)
| Frame | t | Teks | x-height | ascender/cap | lebar | pusat |
|---|---|---|---|---|---|---|
| f001 / k1 | 0,5 | "Work today is broken" | 4,4 % (31–33 px) | 5,8 % (40–42 px) | 41,3 % | 45,9 / 50,2 |
| f002 / k2 | 1,0 | "…k today is [broken]" | 9,1 % (65 px) | 12,1 % (87 px) | 68,2 % (meluber) | 34,1 / 48,7 |
| f002 kotak | 1,0 | sorot biru `#4490D3` | – | 16,9 % (baris 289–410) | ±30 % | ±54 / 50 |
| f005 / k3 | 2,5 | "Too many" / "disconnected apps" | 1,53 % / 2,09 % | 2,8 % | 14,5 / 20,5 % | 49,4 / 49 |
| f011 / k4 | 5,5 | "Everything is just......" / "Everywhere" | 3,06 % | 4,2 % | 25,7 / 17,8 % | 47,5–50,2 / 47–53 |
| f014 / k6 | 7,0 | "How can I organize my work?" | 1,81 % | 2,37 % | 23,7 % | 38,4 / 49,4 (rata kiri) |
| f018 / k7 | 9,0 | "ClickUp" | 9,6 % | 12,9 % (91–94 px) | 35,5 % | 50,1 / 49,4 |

## Warna (hex) dan objek
- Latar f001: sudut `#010206`/`#000408`, atas tengah `#001B27`, kanan atas `#021019`; teks `#AEBEC7`.
- Cincin f005/f007 `#0CB8C0`/`#0EB3BC` (area 2,8 %); glow cari f013 `#01BCC2` (area 15,8 %); putih f011 `#FBFDFA`.
- Wordmark f018: berkas `#00708D` (y 150), cakrawala `#59B5C8` (y 600), bawah `#032A38`; garis terang tengah mulai y 531 = 74,0 % H.
- Luma tengah 40 % vs sudut: f001 40/5, f005 50/6, f013 36/11, f018 96/18.
- Cincin f007 pusat (52,0 %, 46,1 %); jari-jari 16,3 / 29,8–36,8 / 44,2–51,1 % H (asimetris karena miring). f005 pusat (50,6, 45,1).
- Lencana f005: 6 blob 10,0–11,1 % H; f007: 7,8–8,8 % H.
- Kolom cari f014: y 316–393, x 310–934 = 48,9 % W × 10,7 % H.

## Kamera (skala kumulatif per shot, < 1 = zoom-out)
- 0,9–1,7 (pasca punch-in): 0,72 (mundur 1,39×), dx total −8,8 % W pada 0,9–1,3; percepatan 0,99 → 0,85 per 0,1 dtk.
- 2,0–4,0 cincin: 0,29 (3,5×); per 0,1 dtk 0,885 → 0,987 (tengah) → 0,731 (akhir); rotasi ±+45° (lencana mengorbit, bukan roll kamera).
- 4,3–5,8 putih: 0,55 (1,8×), ease-out; rotasi panel ±−50°, makin cepat 5,4–5,7 (−8,6°/0,1 dtk); teks tetap datar.
- 6,7–7,8 cari: ±0,94; 7,8 dy −5,3 % H sebelum cut.
- 8,1–9,0 wordmark: dy −2,8 → −0,4 % H/0,1 dtk (total −7,7 % H), skala 0,98; 9,0–10,0 diam.
- 0,1–0,7: angka tidak dipakai (latar gelap, fitur hanya 14–83 inlier, teks sedang muncul).

## Cut dan audio
- Cut: 0,78 (punch-in, tak terdeteksi scene>0,15), 1,83 (0,30), 4,10 (1,0), 5,93 (1,0), 7,95 (dari frame rapat + earshot). Morph 6,4 di dalam shot.
- pace_read: 2 cut, 11,9/menit, median 4,1 dtk, event visual 48/menit, usulan "fokus 70–100 bpm" (dari detektornya sendiri).
- ebur128: −14,4 LUFS, LRA 6,3 LU, true peak +0,8 dBFS. earshot: 27 event, 8 riser, 6 key, 4 ui, 4 foley; 80 % cut onset ≤ 1 frame.
- librosa: 161,5 bpm (earshot 187, lemah); onset rapat 0,14–0,81 dan 4,27–4,71; chroma C#, E, A, D#.

## Batas ketelitian
- 1 px = 0,14 % H / 0,08 % W. Kata kecil (x ≤ 2 % H) bisa meleset ±10 %; frame dengan blur gerak (f003) tidak dipakai untuk ukuran.
- Font ditebak dari bentuk (SF Pro/Inter), tidak dikonfirmasi.
- Kamera: ORB mengikuti objek bergerak (lencana, panel), jadi rotasi = rotasi objek, bukan roll kamera; skala bisa termasuk skala objek.
- Label SFX/genre earshot adalah tebakan CLAP; bpm tidak stabil (pulse lemah).
