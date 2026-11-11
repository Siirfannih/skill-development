# 66 · Data ukur mentah (11 Nov 2026)

Video: `LOC-08c5a6ff5ac1/reference.mp4` 720×1280, 30 fps, 17,27 dtk (518 frame), audio 17,37 dtk.
Panel preview hasil edit: y 142–643 (502 px), x 0–719 → semua % "preview" relatif ke kotak ini.

## Skrip
- `scripts/ukur.py`: per frame: luminans rata preview, porsi piksel >235, beda antar-frame (90×63) → cut/flash/flicker.
- `scripts/ukur2.py`: bbox siluet (connected component piksel >235), pil label (ukuran, tinggi teks), sampel warna UI.
- `scripts/kamera.py`: ORB 2000 + estimateAffinePartial2D frame awal+4 → akhir−2 tiap shot.
- ffmpeg ebur128; librosa beat_track/onset; `earshot timeline --detail high`; `pace_read.py`.

## Frame kunci (keyframes/, 720×1280 penuh)
| File | Frame | Ukur |
|---|---|---|
| 66-k1-ui-tutorial | 300 (10,0 dtk) | pil efek x218–501 y650–720 (39 %×5,5 %), cap 25 px = 2,0 %; pil SFX y1017–1087, teks 24 px |
| 66-k2-flash-putih | 240 (8,00) | luminans rata 240, putih 99,8 %, 1 frame |
| 66-k3-flicker-siluet | 107 (3,57) | siluet x34 y41 w16 h57 % preview, luas 5,6 %, warna #F6F0E3 |
| 66-k4-siluet-transparan | 264 (8,80) | siluet abu ±60 % opasitas (dilihat, bbox tidak diukur) |
| 66-k5-cutout-lapis | 237 (7,90); siluet di 235 | 235: x46 y26 w25 h74 %, luas 12,7 %; 237 orang asli bertepi putih |
| 66-k6-cutout-transisi | 411 (13,70) | gelas+tangan di atas latar toko; frame 410–414, latar ganti di 415 |
| 66-k7-flash-overexpose | 382 (12,73) | luminans 217, putih 65 %; 383: 127; 384: 161; 385 normal |
| 66-k8-footage-grade | 352 (11,73) | senja, siluet orang, grade hangat |

## Pola flicker (luminans / putih %)
- 3,53–4,13: 106–108 nyala (105/5,6 %), 109–110 mati (96/0), 111–112 nyala … 122–123 nyala, 124 mati → 2/2 frame, 5 nyala.
- 5,70–6,03: dua siluet (2,2 % + 1,8 %), nyala 171–173, 175–177, 179–181 (pola 3/1).
- 7,83–7,97: 235 siluet (12,7 %), 236 orang asli, 237 siluet tipis/tepi (4,2 %), 238 asli, 240 flash.

## Cut (diff >25 di preview, dicek ke sheet)
1,40 · 2,40 (flash) · 6,07 · 6,87 · 8,00 (flash) · 8,83 · 9,47 · 10,67 · 11,73 · 12,73 (flash) · 13,67 (cut-out; latar 13,83) · 14,70 · 15,67 → 13 transisi, 45/mnt, median shot 1,0 dtk.

## Kamera (skala, dx %, dy %)
0,00–1,40: 1,473/−22/−27 (handheld blur, kurang andal) · 1,40–2,40: 1,002/−0,4/−0,2 · 2,40–6,07: 1,000/0/0 · 6,07–6,87: 1,001/−0,3 · 6,87–8,00: 1,000/−0,8 · 8,00–8,83: 0,998/1,2/0,7 · 8,83–9,47: 0,999/2,8 · 9,47–10,67: 1,009/3,6 · 10,67–11,73: 1,000/0 · 11,73–12,73: 1,001/−0,7 · 12,73–13,67: 0,998/0,2/0,8 · 13,67–14,70: 0,884/−1,9/4,4 · 14,70–15,67: 1,080/3,3/−6,1 · 15,67–17,27: 0,982/−5,5/19,1.

## Warna (rata preview, HSV S/V)
f30 #605956 53/99 · f150 #635e57 61/104 · f200 #6a7582 72/137 · f230 #5a6872 105/129 · f300 #7b787b 65/141 · f430 #716748 122/119 · f500 #7c726d 71/135.
Judul: putih #F4EEEC, kuning #D1AD4F; tinggi baris 4,4 % / 3,4 % preview; "shot on iphone" 2,2 %.

## Audio
ebur128: I −14,5 LUFS, LRA 6,6 LU, true peak +2,6 dBFS. earshot: −14,8 LUFS, TP 0,2 dBTP, 73 event (4,2/dtk), 2 babak (lo-fi hip hop → trap, vocal chop), pulse clarity 0,11. librosa 136 bpm, 48 onset.
Flicker 1 SFX: 12 event KEY 3,55–4,17 (spacebar/shutter). Aksen: 0,54 +26 dB, 5,77 +24 dB, 15,81 +19 dB (uplifter).
pace_read (seluruh layar, tidak representatif): cut 6,9/mnt, median 4,7 dtk, event visual 55/mnt.

## Batas ketelitian
- Preview 502 px tinggi: 1 px ≈ 0,2 %; teks kecil ±10–15 %. Judul pembuka bisa termasuk piksel latar terang (±1 % tinggi).
- Bbox siluet dari ambang >235; siluet transparan (k4) tidak terambang → tidak terukur.
- Kamera shot handheld blur (pembuka) dan shot cut-out berlapis tidak andal.
- Label SFX berasal dari teks tutorial + tebakan CLAP earshot; tidak ada stem terpisah, level SFX vs musik tidak terukur langsung.
- Font: tebakan visual (tidak ada metadata).
