# 49 · Krea 2 launch — data ukur mentah (11 Nov 2026)

Sumber: `pustaka-video/mac/baikov0943_ssspin.io_1793345288.mp4` · 736×414, 30 fps, 67,1 dtk, audio 67,16 dtk.
Skrip (folder `tools/`): `measure.py` (bbox non-putih/gelap + run baris), `measure2.py` (hex, skala objek via connected components), `camera.py` (ORB + `estimateAffinePartial2D`), `spread.py` (cakupan/sebaran objek), `audio.py` (pita, onset, centroid); plus ffmpeg `select=gt(scene,0.25)`, `ebur128=peak=true`, `pace_read.py`, librosa `beat_track`, `earshot timeline --detail high`.

## Frame kunci (keyframes/, ukuran asli 736×414, JPEG kualitas 85)
| Kunci | t (dtk) | Ukuran |
|---|---|---|
| k1 teks-kecil | 4,5 | "An image model" bbox x 30,6–69,3 y 45,9–54,1 (8,5 % termasuk turunan g); "This is" kapital 19 px = 4,6 %; "Create" 6,3 %; "It gets it" 5,3 % (dgn g); URL "krea.ai/k2" 4,3 % |
| k2 teks-hero-punchin | 2,6 / 3,0 | "Krea 2" kapital 84 px = 20,3 %, blok 45,0 % lebar, pusat (50,1; 49,6); kata lama median `#E1E1E1` (sedang pudar) |
| k3 teks-di-montase | 6,0 | teks putih x 26,6–74,3 y 45,9–52,4; luma rata 72,7 |
| k4 kartu-gambar-strip | 14,5 | kartu 48,9×49,3 % pusat (50; 37,7); thumb 14,3/10,7/12,2 % lebar × 18–19 % di y 80,9 %; cakupan non-putih 30,3 % |
| k5 cincin-gambar | 28,0 | 10 objek, terbesar 15,8×30,9 %, median lebar 11,3 %; cakupan 25,9 % |
| k6 figur-cutout | 35,5 | 1 objek 10,7 % lebar × 51,9 % tinggi, pusat (51,4; 50,4); cakupan 4,1 % |
| k7 ui-slider | 46,5 | dial 26,2×46,4 % pusat (56,5; 50); label 6–10 % lebar × 2,7–2,9 % di x 5–16 %, y 39/49/60 % |
| k8 galaksi-thumbnail | 52,5 | 42 objek (gugus menyatu), median lebar 4,7 %; cakupan 19,8 % |

Hero 2 "The better it gets" (33,0–33,7): tinggi 129 px = 31,2 % termasuk turunan; blok 51→66 % lebar (terpotong kiri).
Highlight select (32,3): `#B3D2F6`, kotak x 33,4–64,5 y 46,1–52,4. Teks hitam: `#000000`. Latar: `#FFFFFF`.
Montase pusat vs sudut luma: 5,6 dtk 40/36 · 6,2 dtk 132/111 · 6,8 dtk 148/108 · 7,2 dtk 132/33.

## Kamera (ORB, frame awal → akhir)
- Ketik kecil 1,6→2,0: skala 1,007, dx −2,1 %. Teks kecil 4,5→5,0: 1,009.
- Punch "Krea" 2,2→2,6: skala 1,051, dx −15,6 % (pan setelah lompatan); settle 2,7→3,4: 1,000.
- "The better it gets" 33,0→33,8: dx −33,2 %.
- Kuda 12,6→13,2 dan 14,5→15,4: skala 1,026 (push pelan). Moodboard 16,8→17,8: 1,004.
- Cincin, figur, galaksi: inlier < 30 % → gerak objek, bukan kamera; angka skala tidak dipakai.
- Lompatan punch-in: dari tile 30 fps, kalimat kecil → besar di frame 2,20 dtk dalam 1 frame; rasio tinggi 84/19 = 4,4×.

## Cut & ritme
- scene>0,25: 5,47 5,70 5,90 6,10 6,30 6,47 6,57 6,70 6,83 6,97 7,10 7,23 7,37 7,50 10,73 39,30 (16).
- pace_read: 15 cut, 13,4/menit, shot median 0,2 dtk, event visual 38/menit, laju bicara 3,7 suku kata/dtk (proxy).
- Galaksi cakupan non-putih: 50,5 21,6 % · 53,5 21,2 · 56,5 35,7 · 58,5 20,0 · 59,5 12,4 · 60,5 4,4 · 61,5 0,8 · 62,5 0,0.

## Audio
- ebur128: I −14,0 LUFS, LRA 7,4 LU, true peak +3,1 dBFS. librosa: 129,2 bpm; 224 onset (3,34/dtk); 67 hit > 2 sd.
- Pita (power): <250 75,6 % · 250–2k 22,8 % · 2–6k 1,1 % · >6k 0,5 %. Frame < −50 dBFS: 4,3 %.
- RMS per 5 dtk (dBFS): −24,3 −20,9 −19,6 −23,0 −18,3 −21,8 −23,6 −16,9 −17,8 −19,3 −14,8 −13,3 −29,6 senyap.
- Hit: 2,11 (−25,8 dB, centroid 978 Hz, 0 % bas) · 32,55 (−29,8, 487 Hz, 69 %) · 41,22 (−13,7, 292 Hz) · 42,77 (−10,7, 115 Hz, 91 %) · 45,26 (−11,9, 539 Hz) · 48,02 (−19,8, 2,8 kHz) · 51,08 (−6,5, 57 Hz, 99 %).
- earshot (`earshot.txt`, mono 22 kHz): −14,4 LUFS, TP −0,4 dBTP, LRA 7,3; 391 event (5,8/dtk), 96 berlabel: 49 ui (mayoritas "chat message pop"), 18 note, 13 hit, 11 voice, 3 drum, 2 riser. Pulse clarity 0,07: tanpa grid beat tegas. Stop-down 31,75 (0,8 dtk), 49,65 (0,7), 63,20 (1,6); ekor senyap 2,3 dtk. Babak: 0–21 house + electric piano (−17 LUFS) · 21–30,5 strings korporat (−15) · 30,5–41,2 bass guitar (−16) · 41,2–63 house deep sub bass (−12) · 63–67 synth pluck arpeggio (−33). Aksen terkuat: 20,99 pop +34 dB di atas bed, 50,78 riser +30 dB.

## Batas ketelitian
- 414 px tinggi: 1 px = 0,24 % tinggi, 0,14 % lebar; kata kecil bisa meleset ±5 %. Tinggi "kapital" diambil dari run baris tanpa turunan; kata ber-g/y dilaporkan dengan turunan.
- Connected components menyatukan kartu yang bersentuhan (galaksi): jumlah objek = batas bawah.
- Hex teks dari piksel ter-antialias; kata redup diukur di tengah pudar.
- Level VO vs musik tidak diukur ulang (tanpa stem); angka ±9 dB dari audit 2 Nov.
- Font pasti tidak terukur (tanpa metadata); "mirip Inter Display/SF Pro" dari bentuk huruf.
