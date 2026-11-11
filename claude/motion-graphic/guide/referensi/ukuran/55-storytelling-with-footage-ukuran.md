# 55 · Ukuran mentah (Storytellingwithfootage.mp4)

Sumber: 1276×718, 24 fps, 46,34 dtk, audio 44,1 kHz stereo. Semua % terhadap frame penuh (718 px tinggi = 0,14 %/px).

## Frame kunci (keyframes/, lebar 1080, JPEG q85)
| Kunci | dtk | Pengukuran |
|---|---|---|
| k1 arsip-bingkai-putih | 1,5 | latar `#FDFBFE`; bingkai footage x 15,2–84,7 % (w 69,5 %), y 15,2 %; tumbuh 61,6→72,1 % lebar dari 0→2 dtk; caption hitam pita 4,74 % (34 px, termasuk turunan huruf), x 15,3–49,4 %, pusat y 89,4 % |
| k2 kartu-judul | 3,6 | huruf y 17,4–68,8 % (±51,5 % tinggi; mask otomatis hanya menangkap atas 17,4–41,1 % karena gradien, bawah dibaca manual), x 10,6–91,3 %; langit `#6C899E`, laut `#142C3B` |
| k3 arsip-teks-kinetik | 6,5 | "it's not talent." pita 8,91 % (64 px), x 30,6–69,4 %, pusat (50,0; 49,9); merah x 50,8–68,1 %, `#C8080B` (median mask); vignette sudut/tengah 0,73 |
| k4 wawancara-teks-tumpuk | 11,6 | "delusional" 9,89 % (71 px) x 14,8–47,3 % pusat y 29,5; "enough" 4,32 % (31 px) x 18,7–30,3 % pusat y 38,6; latar `#050206` |
| k5 foto-alas-potong | 17,5 | label "Charles" 10,03 % (72 px, termasuk panah) x 53–67,9 %, pusat y 31,9; foto ±36 % × 86 % (baca manual); hijau mat `#147466` (31 % piksel), gelap `#0A3D34`, sudut `#010B0F`; vignette 0,75 |
| k6 dinding-foto | 27,0 | caption "one of" 4,46 % (32 px), pusat (50,0; 92,8); gabus `#B26017` (44 % piksel); vignette 0,58; grain std 2,6 |
| k7 fisheye-grid-merah | 33,6 | caption 4,46 %, pusat (50,0; 92,8); merah `#AA1703` (19 % piksel); vignette 0,66 |
| k8 footage-pribadi | 36,0 | caption "and if you stay to" 5,43 % (39 px), x 30–49,7 %, pusat y 45,5; langit `#D7FBFC`, kaos `#18151B` |
| akhir | 45,5 | kartu hitam `#010002`, teks CTA kecil di tengah |

## Shot dan kamera
- `scripts/shots.py`: cut = jarak Bhattacharyya histogram HS > 0,35 dan > 2,5× median lokal; cut < 4 frame digabung. 33 shot, median 0,83 dtk, 41,5 cut/menit.
- `pace_read.py`: 28 cut, 36,3/menit, median 1,3 dtk, event visual 52/menit, 4,7 suku kata/dtk.
- `scripts/cumcam.py` (ORB + estimateAffinePartial2D antar frame selang 2, dikumulasi), skala %/geser % lebar-tinggi:
  0–0,96 +6,8 % · 6,6–7,4 −0,5 · 9,2–10,9 +0,4 · 10,9–12,7 −4,2 · 12,7–14,2 0,0 · 14,2–16,0 +3,0 ·
  16,0–20,4 **+52,8** (x −23, y −21) · 20,4–30,8 **−57,8** (x +8) · 30,8–33,1 −33,4 · 33,1–35,0 −49,9 ·
  35,0–37,5 0 (x **+111**) · 39,8–41,2 +15,3 · 42,4–44,8 **+64,5**.
- Transisi dicek dari strip 24 fps (tmp/trans.jpg): defocus-masuk 16,0 dan 30,8; kilatan 20,4; judul terbakar 2,6; glitch 37,5; cut keras lainnya.

## Audio
- ebur128: I −14,3 LUFS, LRA 4,8 LU (−16,8…−12,0), true peak +1,8 dBFS.
- earshot `timeline --detail high`: 274 event (5,9/dtk); 51 voice, 17 ui, 12 note, 4 riser, 4 drum, 3 whoosh, 2 foley, 2 hit, 1 key. Seksi: 0–15,85 / 15,85–31,2 inspirational; 31,2–42,75 / 42,75–46,2 glitch hop. Pulse clarity 0,06. Sinkron cut: 78 % dalam 100 ms dari onset.
- librosa (wav mono 22,05 kHz): bpm 123,0 (juga di komponen perkusif); RMS per 4 dtk −18,7 … −22,0 (24–32 dtk) lalu −15,9 (32–40 dtk), −26,6 (ekor); centroid 2,0 / 2,1 / 2,8 / 2,4 / 1,9 / 1,7 kHz per 8 dtk.

## Batas ketelitian
- Tinggi teks = pita tinta per baris (naik huruf sampai turun huruf bila ada), bukan tinggi kapital; meleset ±1–2 px (±0,3 % frame).
- Ukuran foto di k5/k6/k7 dan bawah kartu judul dibaca manual dari frame kunci (±2 %).
- Gerak kamera di shot dengan teks/overlay besar atau lensa cembung bercampur dengan zoom digital dan distorsi; angka arah benar, besaran ±10 %.
- Font: perkiraan visual, tidak ada metadata. Hex: median petak/mask dari JPEG/PNG terkompresi (±3 per kanal).
- Kosakata SFX dari label earshot (petunjuk, bukan kepastian); musik dan SFX tidak dipisah (tanpa demucs).
