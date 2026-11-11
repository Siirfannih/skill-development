# 26 · Data ukur mentah (11 Nov 2026)

Sumber: `Kinetic Typography + Transision.mp4`, 960×720, 24 fps, 77,83 dtk, AAC. Letterbox hitam baris 0–53 dan 667–719 → konten 960×612–614 (baris rata-rata > 8). Kartu judul 0:01 memakai 720 baris penuh.

## Teks per frame kunci (kotak huruf dari masker warna; % tinggi konten, pusat x/y % konten)
| Frame | Kata | px | % tinggi | % lebar | pusat x,y |
|---|---|---|---|---|---|
| k1 0:15,0 | "To him," putih | 49 | 8,0 | 17,0 | 37, 34 |
| k1 | "it wasn't just a" putih | 37 | 6,0 | 29,9 | 44, 42 |
| k1 | "COMPUTER" kuning | 71 | 11,6 | 33,6 | 46, 52 |
| k2 0:01,0 | "STO" merah (frame 720) | 194 | 26,9 | 41,5 | 46, 32 |
| k2 | "RY" | 220 | 30,6 | 38,9 | 47, 62 |
| k3 0:03,0 | "went" putih | 67 | 10,9 | 22,0 | 67, 54 |
| k3 | "from" (perspektif) | 151 | 24,6 | 33,0 | 73, 72 |
| k4 0:06,0 | "paid" kuning | 65 | 10,6 | 13,2 | 40, 37 |
| k4 | "the" | 69 | 11,3 | 11,4 | 39, 70 |
| k5 0:08,0 | "OBSESSED" kuning | 47 | 7,7 | 23,9 | 22, 53 |
| k5 | "he was" putih / "with" kuning | 36 / 39 | 5,9 / 6,4 | – | 14,48 / 75,47 |
| k6 0:33,0 | "client" / "a" putih | 56 / 33 | 9,1 / 5,4 | 16,1 | 48, 20 |
| k7 0:52,5 | "version" / "comfort" (miring) | 44 / 80 | 7,2 / 13,1 (kotak miring, lebih besar dari huruf asli) | – | – |
| k8 1:13,5 | "DREAM" 3D | 126 | 20,6 | 74,7 | 51, 72 |
| k8 | "comment" / "sounds" | 25 / 22 | 4,1 / 3,6 | 18,1 | 51,56 / 28,29 |
| 0:46,0 | caption monokrom | 23 | 3,8 | 12,3 | 50, 89 |
| 0:53,5 | "that version" di kartu putih | 39 | 6,3 | 27,3 | 59, 49 |
| 1:03,0 | "JAPAN" merah | 155 | 25,3 | 92,5 | 50, 27 |

## Warna (median potongan piksel / median masker)
krem kartu `#F9F6D8`, merah judul `#8B272D`, kuning A-roll `#F7E610`, kuning CTA `#F6FC48`, kuning kolase `#EACD40`, merah poster `#DD4041`, ungu `#544B74`, gabus gelap `#412D1B` / terang `#8A5C34`, putih kartu `#FEFEFE`, hitam monokrom `#080808` (|R−B| rata-rata 0,15), caption monokrom `#CEB377`, baju `#0B0716`, sofa `#31080F`, rumput kolase `#9B9831`.

## Skala subjek (taksiran dari frame penuh, bukan masker)
potret k5 ±86 % tinggi × 55 % lebar; TV k6 ±34 × 33 %; orang k3 ±45 % tinggi; figur kolase k4 ±25 %; subjek k7 ±60 %. Masker otomatis TV/CLIENT gagal (latar bertekstur ikut terhitung), jadi angka ini dari koordinat visual.

## Kamera (ORB 1500–2000 titik, estimateAffinePartial2D, frame awal+0,1 / akhir−0,1 dtk)
Andal (inlier ≥ 20): 0:02,1–2,7 +29 %; 0:02,7–3,3 +26 %; 0:03,3–4,1 +10 %; 0:07,3–8,0 +13 %; 0:39,0–39,7 0 %; 0:41,4–45,6 +14 %; 0:45,6–47,6 +5 %; 0:47,6–49,0 +30 %; 0:55,6–56,9 +22 %; 0:56,3–57,0 +1 %; 1:06,3–1:07 0 %; A-roll 0:13,6–17,0 −1,5 %; 1:07,2–1:10,4 −35 % (punch-out); 1:10,6–1:12,9 +11 %.
Tidak andal (inlier < 10, adegan grafis beranimasi): sisanya; dibuang.

## Cut & ritme
- ffmpeg `select=gt(scene,0.3)`: 47 cut (termasuk frame glitch). Digabung bila < 0,3 dtk: 32 shot, median 1,38 dtk, 23,9/menit — scene detect melewatkan cut di 0:11–0:23 dan 1:07–1:17, jadi angka gabungan terlalu rendah.
- `pace_read.py`: 36,2 cut/menit, median 0,7 dtk, event visual 58/menit, 3,9 suku kata/dtk, kategori energi. Hitung mata dari sheet 0,5 dtk: ±45 adegan.
- Transisi per frame: strip 24 fps di 0:00,4–1,0, 0:10,2–11,4, 1:04,6–1:05,8 (`tr.jpg`).

## Audio
- ebur128: I −14,2 LUFS, LRA 2,8 LU, true peak −0,4 dBTP. RMS per detik −12 s/d −33 dB.
- librosa beat_track 123,0 bpm; onset 4,8/dtk. earshot `timeline --detail high`: 486 event, 96 bertag (60 voice, 10 ui, 8 whoosh, 7 riser, 4 foley, 4 hit, 3 note), pulse clarity 0,07, genre per babak (corporate → house 1:07). Sinkron cut: 54 % dalam 1 frame, 89 % dalam 100 ms.
- Level musik vs suara: tidak terukur (demucs/`ears.py` tidak dijalankan karena batas waktu).

## Skrip
`measure.py`, `m2.py` (masker warna → kotak huruf, hex), `cam.py` (shot list + ORB affine), `pace_read.py`, `earshot`, librosa satu baris. Output mentah: `pace.txt`, `earshot.txt`, `cuts.txt`.

## Batas ketelitian
Sumber 720p terkompresi, ±0,16 % per piksel tinggi konten. Masker warna bisa memotong tepi glow atau menangkap bayangan; kata miring/3D melebihkan tinggi. Nama font tidak terukur (dibandingkan dengan mata). Tag earshot = petunjuk CLAP, sering salah pada musik.
