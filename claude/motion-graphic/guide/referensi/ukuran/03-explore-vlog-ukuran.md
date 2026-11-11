# 03-explore-vlog · data ukur mentah (11 Nov 2026)

Sumber: `explore_DcAjrL1S8PO.mp4` · 960×720, 30 fps, 111,2 dtk, audio 44,1 kHz. Frame tiap 1 dtk di `frames/`, sheet 1 dtk berstempel waktu `work/sheet1s.jpg`.
Skrip: `measure.py` (mask kuning-hijau G>225, R>180, B<90, G−B>150 → pita baris → tinggi/posisi; median hex), `cam.py` (ORB + `estimateAffinePartial2D` antara awal+0,15 dtk dan akhir−0,15 dtk tiap shot), potongan inline Python (bbox subjek beda-warna dari latar, vinyet sudut/tengah, periode garis scan via FFT profil baris, onset librosa di titik cut).

## Teks per frame kunci (% tinggi 720 / lebar 960)
| Frame | Pita teks | Tinggi | x | Pusat | Hex |
|---|---|---|---|---|---|
| k1 5,0 dtk | blok 5 baris tumpang tindih | 69 total; AKU/JUDI ±16, PENGEN/NYOBA ±8 (dari sheet) | 49–98 | (73, 49) | `#D7FF0C` |
| 2,5 dtk | "AKULAGI" | 13,5 | 49–95 | (72, 40) | `#D8FF10` |
| k2 12,5 dtk | ON- / LINE / YA. | 23,8 / 23,1 / 15,0 | 51–97, 41–98, 51–80 | (74,15)(69,41)(65,62) | `#D8F126` |
| 8,0 dtk | MENCOBA+JUAL / LINE / LINE / kecil | 30,4 / 13,1 / 12,9 / 6,4 | 2–99, 32–50 | (50,18)(41,69) | `#D4F32B` |
| 15,0 dtk | JUDI ONLINE | 14,2 | 0–99 | (50, 11) | `#DCEF2E` |
| k6 37,5 dtk | FRESH / GRADUATE / subtitle kotak | 13,9 / 13,8 / 3,5 | 27–73, 9–91, 35–65 | (50,42)(50,58)(50,86) | `#D7FF0A` |
| k5 54,5 dtk | MEMBUKA DIRI / UNTUK MENERIMA | ±12 / 8,6 (pita pertama tercampur footage kuning, 36 %) | 7–94 | (50, 48) | `#D7FF0A` |
| k4 34,0 dtk | 7 baris dialog | 4,4–4,9 (termasuk bayang RGB), baris dobel 8,9 | kiri 4–60, kanan 39–96 | – | median `#A7C741` (kabur) |
| 23,0 dtk | subtitle "sekarang umur 18" | teks ±2,6 (baris 613–631 px), kotak ±6 (600–646 px) | ±35–65 | (50, 86) | putih / kotak gelap |
| 1:39 | kredit musik | judul ±2,8, label ±1,6 (dari crop 2×) | tengah | – | kuning-hijau |

## Latar, tekstur, footage
- Latar: oranye `#E2431F` (12,5), hijau `#104716` (8,0; median non-teks `#164C19`), biru `#061D52` (34,0), hijau cutout `#0A5D03` (23,0), `#095C02` (57,0).
- Garis scan: periode 2,9 px, std profil baris 0,44 (oranye), 0,29 (hijau), 0,10 / periode 7,8 (biru = tidak ada).
- Letterbox: kartu biru baris 90–634 (16:9 di 4:3); wisuda bbox x 9–91 %, y 8–91 %; layar ponsel x 17–92 %, y 12–82 %.
- Bbox subjek di latar hijau: 23,0 → 100 % × 83 % (termasuk subtitle); poster 57,0 → 84 % × 63 %.
- Footage (sudut/tengah luma, S rata-rata, p5–p95 luma): 1,0 → 1,00, 167, 3–158 · 54,5 fisheye → 0,03, 199, 3–228 · 80,5 → 0,55, 136, 12–220 · 59,5 poster → 1,01, 97, 48–215 · 99,0 → 0,00, 109, 0–143.

## Cut dan kamera
- Scene detect (ffmpeg `select=gt(scene,0.25)`): 38 titik; 4,2 · 5,57 · 17,0 · 17,53 · 18,57 · 19,63 · 22,13 · 22,87–23,73 (8 kedip montase 0,1 dtk) · 26,4 · 36,43 · 39,4 · 40,47 · 41,4 · 48,53 · 55,63 · 58,53 · 60,9 · 63,1 · 64,73 · 71,7 · 75,67 · 80,5 · 84,23 · 85,53 · 90,2 · 93,63 · 94,8 · 96,23 · 109,33.
- Tanpa kedip montase: 30 shot, median 2,58 dtk, 15,6 cut/menit. `pace_read.py`: 36 cut, 19,4/menit, median 1,6 dtk, gerak layar 4,2, 39 event visual/menit, kategori "energi", usul musik 100–140 bpm.
- Kamera (skala, tx %W, ty %H, inlier): 0–4,2 diam 0/0/0 (168) · 17,0–17,5 +8,3 % (106) · 17,5–18,6 −16,7 %, +8/+8 (488) · 40,5–41,4 −9,5 % (496) · 58,5–60,9 −33,3 %, +14/+23 (144) · 63,1–64,7 diam (897) · 64,7–71,7 +6,8 % (60) · 75,7–80,5 +8,1 %, ty −6,5 (38) · 85,5–90,2 +5,3 %, tx −11 (36) · 90,2–93,6 tx −27 (43) · 94,8–96,2 diam · 96,2–109,3 diam (191). Shot dengan inlier < 30 atau rotasi > 60° (layar warna, kartu biru, montase, fisheye) dibuang: konten berganti di dalam shot.

## Audio
- ebur128: I −14,3 LUFS, LRA 5,5 LU (−17,4 s/d −11,9), true peak +0,7 dBFS.
- librosa: 103,4 bpm seluruh mix; per babak 0–6 dtk 172 (bicara, tidak andal), 6–26 dtk 112, 26–49 dtk 96, 49–111 dtk 103. Pulse clarity (PLP rata-rata) 0,145. RMS per babak −19,6 / −16,3 / −16,9 / −19,1 / −15,8 / −17,1 / −18,8 / −15,4 dB. Centroid 2727 → 1897 Hz (0–96 dtk), 2101 Hz di kredit.
- Onset di titik cut (rasio terhadap median onset): 22 dari 28 cut ≥ 4×, tertinggi 5,57 dtk (13,6×), 96,23 dtk (12,4×), 19,63 dtk (10,8×), 58,53 dtk (10,0×).
- Spectral flatness top 1 %: detik 1–4, 6–9, 44, 99, 103–106.
- earshot `timeline --detail high` (`work/a.wav`, mono 22 kHz; mentah di `work/earshot.txt`): −14,5 LUFS, TP −0,3 dBTP, LRA 5,3; pulse clarity 0,05; 756 event 6,8/dtk; 96 berlabel (46 ui, 21 drum, 13 hit, 13 voice, 1 whoosh, 1 note, 1 foley). Hit sub bass 0:02,13 / 0:05,57 (+21 dB) / 0:12,79 / 0:17,00; whoosh 0:35,57; pop kartu dialog 0:26,4–0:32,4. Babak: chiptune 0–17, corporate 17–21,5, funk 21,5–94, funk+snare roll 94–111.

## Batas ketelitian
- 960×720: 1 px = 0,14 % tinggi. Tinggi teks berpendar ikut glow (±1 %); pita yang menggabung dua baris ditandai.
- Font = kemiripan visual, bukan identifikasi file font.
- Kamera dari affine 2D global: zoom digital dan gerak kamera tidak terbedakan; shot dengan teks/grafik berganti tidak terukur.
- Onset di cut tidak membedakan SFX dari kata yang diucapkan.
