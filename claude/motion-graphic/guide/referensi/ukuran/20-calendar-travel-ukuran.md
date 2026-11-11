# 20-calendar-travel · data ukur mentah (11 Nov 2026)

Sumber: `siirfannih_Dd6SAbAp5JP.mp4` · 1280×720 (16:9), 24 fps, 47,12 dtk, audio 48 kHz stereo. Tanpa narasi.
Skrip: `scripts/ukur.py` (teks, hex, skala, cahaya), `scripts/kamera.py` (ORB + estimateAffinePartial2D per 6 frame, dirantai per shot), cek pasangan langsung (inline, hasil di bawah), ffmpeg `select=gt(scene,0.25)` + `ebur128=peak=true`, librosa (bpm, chroma, energi >4 kHz di titik transisi), `earshot timeline --detail high` (`earshot.txt`), `pace_read.py`.
Semua % terhadap frame 1280×720. 1 px = 0,14 % tinggi / 0,08 % lebar.

## Per frame kunci
| Frame | t | Ukuran | Warna (hex rata-rata potongan) |
|---|---|---|---|
| k1 kota-jendela | 1,0 | luma pusat 166, sudut 37 (vignette/ruang gelap kuat) | dinding `#25262B`, langit senja `#757078` |
| k2 kalender-tahun | 4,0 | digit "20/26" tinggi 35,0–37,9 % (4 digit), blok x 0,7–39,2 %; tanggal 4,3 % → rasio ±8,5× | angka `#373737`, Minggu merah `#B73A43`, kertas ±`#E4E4E4` (luma 232) |
| k3 tanggal-dilingkari | 8,0 | angka tanggal 9,2–10,1 % (close-up), satu 5,6 % (terpotong); lingkaran merah coretan tangan di "20" | merah `#B33E44`, kertas `#E4E4E4` |
| k4 jam | 11,8 | jam bulat 39,8 % lebar × 70 % tinggi, pusat (50, 49) %; luma pusat 242 vs sudut 103 | latar `#18181B`, sorot cahaya `#D1D09E`, muka jam `#FCFAF4` |
| k5 pintu | 14,0 | pintu kayu ±20 % lebar di kanan-tengah (sheet), dinding motif wajik | pintu `#4E493D`, dinding `#867648`; epilog 43 dtk pintu sama abu `#393939` |
| k6 koper-merah | 18,0 | badan merah 83 % lebar × 28,3 % tinggi, pusat (47, 86) %; gagang ke y ±40 %; flare di cakrawala y ±58 % | koper `#9F5142`, langit `#E9E1D6` |
| k7 pesawat | 24,5 | siluet 31,6 × 45,6 % (termasuk bayangan), pusat (48, 57) %; luma pusat 176 < sudut 199 (kabut terang) | langit `#FAF6DF`, pesawat `#EFE6D4` |
| k8 judul-script | 38,5 | "Merantau" x 8,8–41,5 % (lebar 32,7 %), y 34,7–58,2 % bbox; badan huruf 250–339 px = 12,4 % tinggi; kredit 14 px (1,9 %) dan 10–12 px (1,4–1,7 %) → rasio 6,5–9×; pusat judul (25, 41) % | latar kiri `#60708A`, sinar kanan `#A8AEBD`, atas `#D1D3DD` |

Grain: std high-pass di area rata 1,3–1,4 (k6, k7) → tanpa grain, render bersih. Nilai 5–9 di k2/k4/k8 berasal dari tepi huruf/jam, bukan grain.

## Kamera (ORB, pasangan langsung; inlier < 15 = lemah)
| Shot | Hasil |
|---|---|
| 0–2,5 kota-jendela | dirantai: skala ×0,93 (tarik −7 %), geser vertikal ±20 % (9 pasang ok) |
| 7,0→8,5 kalender close | skala ×1,45 (push +45 %), rot +7°, tx −49 % ty −37 % (inl 18) |
| 8,5→9,3 keluar kalender | rot +81°, skala ×0,73 (inl 449): putar cepat = transisi spin ke jam |
| 10,0→11,5 jam | rot +46°, skala ×0,84 (inl 15, lemah): jam berputar sambil menjauh |
| 13,0→15,3 pintu | skala ×0,54 (inl 6, tidak andal); sheet: nyaris diam, cahaya bergeser |
| 20,3→23,5 kota low-angle | skala ×1,05, rot −3°, tx +12 % (inl 9, lemah): dolly maju pelan |
| 24,0→25,7 pesawat | objek menjauh ×0,49 (pesawat mengecil), latar diam |
| 30–41,5 awan + judul | fitur terlalu sedikit; sheet: sinar diagonal bergeser pelan, judul fade |

## Cut / transisi (scene detect 0,25 + cek sheet)
Pergantian isi: 2,5 (sapu halaman) · 4,5 cut · 5,5 cut · 9,5 spin-out · 12,9 cut · 15,5 kertas menyapu · 16,9 kertas → koper · 19,5 kilat abu (lipat jadi pesawat kertas) · 20,2 cut · 23,7 pesawat kertas → pesawat asli · 25,8 cut · 27,4 bingkai jendela pesawat masuk · 30 larut ke awan · 41,5 fade · 42 pintu abu · 45,1 hitam.
= 15 pergantian / 45 dtk ≈ 20/menit, durasi shot median ±2,6 dtk. `pace_read`: 8 cut keras = 10,2/menit, median 3,5 dtk, event visual 28/menit, gerak layar 5,1.

## Audio
ebur128: −14,3 LUFS terintegrasi, true peak −0,7 dBFS, LRA 3,8 LU. librosa: ±136 bpm (beat_track; separuhnya 68), chroma teratas G, C, D, E (G/C mayor, perkiraan).
RMS per 2 dtk (dB): −74 (0 dtk), −27, −21 … −13 (10 dtk) … −15/−17 (34–38 dtk), −42 (46 dtk).
Energi > 4 kHz di titik transisi vs median: +20 dB (2,5), +19 (4,5), +30 (12,9), +26 (15,5), +25 (17,0), +18 (20,2) → bunyi kertas/swish di transisi.
earshot: babak 0–15,6 "electric piano, warm and cozy"; 15,6–41,9 "lo-fi hip hop beat, electric piano"; 41,9–47 "pizzicato strings, romantic", AST tick-tock. Label: short swish 2,70 (+15 dB), paper rustling 3,66, tick-tock 9,61, notification ding 12,07/12,50 (+15 dB), whoosh/reverse cymbal 15,44.
Kredit di layar: Music/Audio "Ian post – Arisaig"; Movie/Motion Design "Dyanee".

## Batas ketelitian
- Sumber 720p; kata kecil (kredit) bisa meleset ±1 px = ±7 %.
- Kamera dari ORB global: di adegan 3D yang objeknya ikut bergerak (halaman, jam, pesawat) angka menggabungkan gerak objek dan kamera; inlier < 15 hanya petunjuk.
- SFX dan musik tercampur (tidak dipisah demucs); label earshot "?" lemah. Level SFX relatif musik tidak terukur.
- Hex = rata-rata potongan kecil; gradien cahaya membuat kertas bervariasi `#C1C1C1`–`#F0F0F0`.
