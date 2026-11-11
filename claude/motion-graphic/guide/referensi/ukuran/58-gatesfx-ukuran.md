# 58-gatesfx · data ukur mentah (11 Nov 2026)

Sumber: `GatesFX_ssspin.io_1794219240.mp4` · h264 720×1280, 30 fps, 12,80 dtk · audio 44,1 kHz.
Persen terhadap frame penuh 720×1280 (x = lebar, y = tinggi). 1 px = 0,078 % tinggi / 0,139 % lebar.

## Shot & cut
- Cut dari beda luma antar-frame (cv2, ambang 4): frame 53 (1,77 dtk, Δ29,3), 98 (3,27, Δ24,7), 278 (9,27, Δ10,9). ffmpeg scene>0,08 hanya menemukan 1,77 dan 3,27.
- Shot: 0–1,73 · 1,77–3,23 · 3,27–9,23 · 9,27–12,77 → 14,1 cut/menit, median 2,6 dtk.
- `pace_read.py`: 0 cut (melewatkan cut gelap), event visual 14/menit, laju bicara 4,3 suku kata/dtk (proxy).

## Kamera (posisi kepala via HoughCircles; ECC affine pada 360×640)
- Shot 1: kepala x 593 → 532 → 460 → 418 px (0,1–1,73 dtk) = −24 % lebar; y tetap 535. ECC skala 1,003.
- Shot 2: x 313 → 279 → 163 (1,83–3,2 dtk) = −21 % lebar; skala 0,994.
- Shot 3: kepala x 359–361, y 553 (4,0–8,0 dtk), 530 di 8,67 dtk; ECC skala 1,001, tx −0,2 %.
- Shot 4: puncak beam y 491 → 456 → 454; ECC skala 1,009, tx −2,7 %. (tx ECC shot 1–2 tidak dipakai: cc rendah di frame gelap.)

## Frame kunci
| File | t | Ukuran |
|---|---|---|
| k1 grafik-naik-karakter (f003) | 1,0 | grafik kaca x 5,8–70,7 y 15,0–46,0; kepala x 52,9–77,2 y 39,1–49,9; maskot sampai y ±62,5; lantai terang `#CECECE`; latar `#0A0A0A`/`#000000` |
| k2 kartu-kata-kunci (f006) | 2,5 | kartu putih `#FFFFFF` x 43,9–97,9 y 42,2–54,7 pusat (70,9, 48,4); huruf DISCIPLINE baris 620–647 px = cap 2,2 % tinggi, lebar ±48 %; kepala r 85 px (Ø 23,6 % lebar) |
| k3 karakter-ikon-masuk (f011) | 5,0 | ikon atas + busur saja; glow merah mulai |
| k4 karakter-ikon-lengkap (f017) | 8,0 | maskot y 37,3–60,2 (kepala 485 → badan ±770 px), lebar 32–68 %; kepala Ø 140 px; ikon atas x 43,6–56,2 y 20,5–27,7; kiri x 15,4–29,0 y 28,5–36,2; kanan x 70,0–82,6 y 28,2–35,4; garis merah median `#812B39`; glow sudut `#36090D`; rim `#FFEEF2` |
| k5 penghitung-profit (f022) | 10,5 | angka x 38,8–80,8 y 25,2–29,7 (h 4,5 %); "Profit" x 22,6–32,1 y 23,1–24,5 (h 1,3 %); bar hijau x 21,2–85,1 y 29,1–31,5, `#1A4507`; beam `#112D05` |
| k6 cut-dari-gelap (a0098) | 3,27 | frame pertama shot 3, hampir hitam |
| watermark (semua) | – | GATESFX x 39,7–68,6 y 76,7–78,9 (h 2,2 %); URL y 80,8–82,5 (h 1,7 %); ikon `#1264AA`; blok x 31,8–68,6 |

Angka penghitung (tiap 0,5 dtk): 483392, 531095, 578799, 626502, 674205, 721908, 769611 → +47 703 / 0,5 dtk.

## Audio
- ebur128: I −16,9 LUFS, LRA 3,7 LU, true peak +0,6 dBFS. earshot: −17,3 LUFS, TP −0,2 dBTP, pulse clarity 0,06, 78 event (52 voice, 9 ui, 4 foley, 3 note, 3 whoosh, 2 step, 2 riser, 2 hit, 1 drum), gap 2,60 (0,5 dtk) dan 8,90 (0,4 dtk).
- librosa: 89,1 bpm (lemah), 62 onset, chroma teratas E F D# F#; HPSS harmonik −22,4 dB vs perkusif −23,5 dB RMS.

## Skrip
- `ffprobe`, `ffmpeg -vf fps=2` (frames/), tiap frame (all/), `select=gt(scene,0.08)`, `ebur128=peak=true`.
- Python inline (`~/work/mg-venv/bin/python`): cv2 threshold/bbox per area, median hex dari potongan, HoughCircles kepala, findTransformECC MOTION_AFFINE, librosa beat/onset/chroma/hpss.
- `earshot timeline --detail high audio.wav` → `earshot.txt`; `pace_read.py <video>`.

## Batas ketelitian
- Sumber 720p terkompresi: tepi glow lembut membuat bbox ±5–10 px (±0,5 % tinggi); kata kecil (label, URL) ±15 %.
- Hex di area glow/gradien adalah median potongan, bukan warna tunggal.
- Font: perkiraan visual, bukan identifikasi pasti.
- SFX vs VO vs musik tidak dipisah (tanpa demucs); label earshot hanya petunjuk. Teks VO tidak ditranskrip.
