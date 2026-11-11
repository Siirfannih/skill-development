# 73 Jordan Esfa — data ukur mentah (11 Nov 2026)

Sumber: `pustaka-video/mac/Jordan_Esfa_ssspin.io_1794023669.mp4` · 736×414, 30 fps, 26,566 dtk, ada audio.

## Per frame kunci (keyframes/73-k*.jpg)
Tinggi = tinggi bbox baris teks (% tinggi frame), lebar = % lebar frame, pusat (x, y %).

| Frame | t (dtk) | Teks | Tinggi | Lebar | Pusat | Panah (l×t %, pusat) |
|---|---|---|---|---|---|---|
| k1 kata-awal | 0,3 | Sometimes | 3,1–3,9 | 14–16 | (50, 49) | 5,0×7,0 @ (63, 97) |
| k2 frasa-panah | 1,5 | text animation | 7,0 | 35,6 | (49, 48) | 5,6×9,4 @ (56, 65) |
| k3 kata-kunci-besar | 7,6 | in After Effects. | 8,0 | 41–42 | (50, 48) | 5,8×9,2 @ (43, 67) |
| k4 tambah-per-kata | 21,0 | by the end | 8,9 | 26,1 | (55, 49) | 5,3×9,2 @ (58, 66) |
| k5 kalimat-kecil | 11,5 | this is the perfect place | 4,6 | 31,4 | (50, 50) | 4,5×8,2 @ (86, 86) |
| k6 kata-tunggal-maks | 20,0 | motion | 9,4 | 23,1 | (50, 47) | 5,8×10,6 @ (63, 68) |
| k7 keluar-per-huruf | 24,0 | ...tions yourself, | 6,3 | 14,8 | (53, 49) | 4,9×8,0 @ (57, 66) |
| k8 penutup-serif | 25,5 | with confidence. | 6,0 | 25,5 | (50, 49) | tidak ada |

Warna (median piksel): latar pusat `#1A0825`/`#1A092A`/`#1A0821`; sudut `#020104`–`#060307`; penutup pusat `#09050B`.
Teks `#FFF9FF`–`#FFFAFF`; kata masuk `#BBB0C2`; titik grid `#7CC5C6`–`#86C1C1`; panah median `#6C4598`–`#8459A9`, p90 `#C7AAE7`.
Jarak titik grid ±56 px = 7,6 % lebar (pada skala k7; berubah mengikuti kamera).

## Kamera (affine parsial cv2, LK optical flow, antar-frame 0,5 dtk; 52 pasang)
Skala median 0,994; p10–p90 0,908–1,097; >1,03: 14, <0,97: 17, diam: 21. Geser |tx| median 2,05 % lebar.
Lompatan: 7,5 dtk ×1,34; 15,5 dtk ×0,53; 19,0 dtk ×1,20; 23,5 dtk ×0,86; 25,0 dtk ×1,15.

## Event teks (30 fps, IoU topeng teks pita y 30–70 % < 0,35, digabung bila < 0,15 dtk)
75 event; jarak median 0,20 dtk, min 0,16, maks 1,87 (7,13→9,00). ffmpeg scene >0,25: 0 cut.

## Audio
ebur128: I −20,3 LUFS, LRA 6,6 LU (−23,7…−17,1), true peak −2,9 dBFS.
earshot timeline --detail high: 192 event (7,2/dtk), 100 BPM clarity 0,77; babak 0–15,25 glitch hop −19 LUFS; 15,25–21,65 −21; 21,65–26,59 −24. Tag: 42 drum, 25 note, 11 key, 10 ui, 5 foley, 2 whoosh, 1 hit. AST speech ≤ 0,05 → tanpa VO.
librosa (wav mono 22,05 kHz): beat 99,4 bpm, 146 onset.
pace_read.py: 0 cut, gerak layar 1,5, usulan "fokus 70–100 bpm"; laju bicara 5,7 suku kata/dtk diabaikan (tidak ada ucapan, proxy membaca musik).

## Skrip
- `ukur_teks_kamera.py` (salinan /tmp/m73.py): topeng teks = min(RGB)>120 & (max−min)<45, komponen >12 px, cluster y; panah = B−G>40 & B>90; kamera = goodFeaturesToTrack + calcOpticalFlowPyrLK + estimateAffinePartial2D.
- Event teks: skrip inline cv2 (IoU topeng antar-frame). Warna: median region PIL/numpy.
- Frame: `ffmpeg -vf fps=2` → frames/ (53); sheet: `fps=0.5,scale=-2:300,tile=8x2`.

## Batas ketelitian
- 1 px = 0,24 % tinggi / 0,14 % lebar; kata kecil (±13 px) bisa meleset ±10 %.
- Tinggi baris termasuk ascender/descender; bukan cap height murni. Teks terus membesar, jadi angka bergantung saat frame diambil (±10 %).
- Estimasi kamera mencampur gerak grid dan teks; lompatan ×0,53/×1,34 bisa berupa reset skala saat ganti frasa, bukan gerak kontinu.
- Font dari pengamatan bentuk huruf, bukan metadata.
- SFX dan musik tidak bisa dipisah (satu mix); label earshot adalah petunjuk.
