# 22 · Data ukur mentah (11 Nov 2026)

Sumber: `Kinetictypography,effect 2.mp4` · 960×720, 30 fps, 51,824 dtk, audio 44,1 kHz stereo.
Frame: `frames/f%03d.jpg` tiap 0,5 dtk (fN = t (N−1)/2 dtk), 103 frame. Frame kunci = ekstrak ulang dari video, JPEG q85.

## Teks (bbox komponen terhubung; % tinggi/lebar frame; termasuk ascender/descender dan sedikit glow)
Mask kuning: R>200, G>170, B<110 · putih: R,G,B>225 · close 3×9 lalu connectedComponents (`scripts/measure.py`).
| Frame kunci | t | Objek | h % | w % | pusat x,y % |
|---|---|---|---|---|---|
| k1 wajah-kolase | 0,5 | "So" kuning | 12,6 | 15,0 | 27, 80 |
| k1 | 0,5 | "started" | 6,9 | 21,6 | 25, 42 |
| k1 | 0,5 | "you" | 8,6 | 14,6 | 75, 68 |
| k2 siluet-kata | 3,5 | kata putih (gabungan per baris) | 3,8–10,3 | 7–16 | 21–43, 24–95 |
| k3 fisheye-bulat | 5,5 | "show" kuning (busur) | 10,0 | 17,4 | 57, 14 |
| k3 | 5,5 | "The Fisheye" (busur) | 7,2 | 20,9 | 47, 70 |
| k3 | 5,5 | "Let"/"you" putih | 12,5–13,6 (bbox miring) | 11 | 30/71, 21–24 |
| k4 menu 123 | 9,0 | "So save this" | 5,4 | 9+6 | 51–73, 33–38 |
| k4 | 9,0 | ikon bookmark | 26,8 | 16,5 | 61, 54 |
| k5 huruf kolase | 11,0 | "This is" / "VISUAL" / "STORYTELLING" | ±6,3 / ±12,5 / ±11,5 | 30 / 45 / 58 | 55, 70–85 (taksiran mata dari grid; mask warna gagal pada huruf multiwarna) |
| fisheye-kotak "Use fisheye" | 12,5 | "Use fisheye" kuning | 6,0 | 16,7 | 18, 16 |
| k6 fisheye-kotak | 16,5 | baris "Keep your subject" putih | 4,7–5,6 | 9,5–13,3/kata | 15–51, 50 |
| k6 | 16,5 | "centered" kuning | 3,9 | 16,1 | 67, 50 |
| bola "distortion" | 21,0 | "distortion" kuning / "Let the grow" putih | 4,7 / 8,6 (tumpuk 2 baris) | 18,5 / 17,3 | 30,67 / 27,60 |
| UI caption | 28,0 | "Describe" kuning | 4,2 | 19,1 | 50, 66 |
| k7 UI caption | 31,5 | "Claude's" putih | 4,3 | 18,8 | 50, 66 |
| UI caption | 39,0 | "Assistant," putih | 5,0 | 21,4 | 50, 66 |
| k8 CTA | 49,0 | "Comment "Effect"" kuning | 7,5 | 25,5 | 50, 68 |
| CTA | 50,0 | "link" kuning / kata putih | 4,2 / 4,0 | 7,5 / 6,8 | 50, 66 |

## Warna (rata-rata patch 12×12 px)
Teks kuning inti `#EDDE40` `#EEDF40` `#EFE247` `#EEE242` `#EEDD3C` · bidang kuning `#FCFF32` · hitam fisheye `#0D0D0D`/`#0E0B0C` · UI `#151515` `#161616` `#212121` (`#020202` di luar panel dialog) · cokelat menu `#241A13` `#3D2F22` `#513F2B` · dinding A-roll `#4662E7` `#446BEF` `#4E72ED` · siluet `#093AD0` di `#FFFFFF`.
Vignette (lum 0–255, sudut 60 px vs tengah): k3 13/65 · bola 21 dtk 12/74 · UI 21/24, 25/32.

## Skala subjek (threshold luma + komponen terbesar, dikoreksi mata dari grid)
Bola fisheye 55–62 % lebar × 80–95 % tinggi · kotak fisheye 82–88 × 82–83 % · siluet biru 41 × 72 %, siluet kuning 63 × 86 % (terpotong bawah) · panel dialog UI ±73–76 × 75 % · wajah A-roll ±30 % tinggi (taksiran mata; cascade wajah tidak tersedia di cv2 ini) · cutout presenter k1 ±55 % lebar (taksiran mata).

## Kamera (ORB + estimateAffinePartial2D, frame awal vs akhir segmen)
fisheye bulat 4,5→6,0: skala 0,934, dx 3,2 %, dy 3,2 % (128 inlier) · kotak 12,5→14,5: 0,995, 2,5 %, 1,0 % · kotak→bola 16→18: 0,999, 1,5 %, −1,7 % (381) · UI cari 24,5→27: 0,738, dy 8 % · UI dialog 30,5→34: 1,215, dx 17,4 % · editor 37,5→43: 0,990 (56). Segmen dengan teks berubah banyak/kolase (hook, menu, A-roll+bidang kuning) gagal atau < 20 inlier: tidak dipakai.
Transisi dilihat di strip 30/20 fps (1,4–2,2 dtk dan 11,4–12,6 dtk).

## Ritme & audio
- Scene detect ffmpeg (gt(scene,0,25)): 0,1 1,73 2,23 2,77 4,6 9,9 10,43 11,57 12,27 15,8 19,77 22,57 24,23 37,47 48,7 (+ duplikat berdekatan).
- `scripts/audio/pace_read.py`: 19 cut = 22,0/menit, shot median 1,4 dtk, event visual 37/menit, laju bicara 3,9 suku kata/dtk, kategori energi.
- ebur128: I −14,1 LUFS, LRA 2,5 LU, true peak +1,5 dBFS. earshot: −14,3 LUFS, TP 0,1 dBTP, 363 event (7,0/dtk), 4 seksi (techno → tech house? → funk → funk/dubstep?), pulse clarity 0,13.
- librosa beat_track: 143,6 bpm (tanpa grid tegas, jadi lemah); onset 6,1/dtk; RMS per dtk −11 s/d −31 dB, mayoritas −14 s/d −19.

## Batas ketelitian
- 1 px = 0,14 % tinggi; glow kuning menambah bbox ±0,3–0,5 %; teks melengkung/miring membuat bbox lebih tinggi dari tinggi huruf sebenarnya (k3, k4).
- Kata kecil yang bersentuhan bisa tergabung jadi satu komponen (k2).
- Font tidak terukur pasti: tebakan visual (Helvetica Neue Bold / Inter ExtraBold).
- SFX dan musik tidak dipisah stem; tag earshot hanya petunjuk. Durasi easing per kata tidak diukur per frame selain dua strip transisi.
