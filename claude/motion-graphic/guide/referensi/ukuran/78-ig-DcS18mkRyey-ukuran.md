# 78 · Ukuran mentah (siirfannih_DcS18mkRyey.mp4)

Sumber: 720×1280, 30 fps, 105,11 dtk, H.264 + audio. Frame 1 fps di `frames/` (fNNN ≈ t = NN−0,5 dtk). Sama dengan kartu 51.

## Skrip
- `skrip/meas.py <frame> <w|r|o> [x0,y0,x1,y1]`: mask warna (putih >215; merah r>170,g<90,b<90; oranye) → connected components cv2 → bbox, h %, pusat %.
- `skrip/cam.py`: ORB 1500 + `estimateAffinePartial2D` (RANSAC 3 px) antara frame +0,1 dtk awal dan −0,1 dtk akhir tiap shot, 360×640. Inlier <30 = tidak andal.
- `ffmpeg select='gt(scene,0.3)'` → 53 deteksi; `pace_read.py` → 30,3 cut/menit, median 1,7 dtk, event 48/menit, 4,6 suku kata/dtk.
- ebur128: −14,2 LUFS, LRA 4,4 LU, peak −0,7 dBFS. librosa: 123 bpm, onset 5,16/dtk, perkusif:harmonik 0,60, RMS p10/50/95 −28,1/−18,3/−10,7 dB.
- earshot `timeline --detail high`: dihentikan setelah 150 dtk tanpa keluaran (dua kali). SFX = proksi rasio energi >5 kHz.

## Teks per frame (px; % tinggi 1280)
- f049 (48,5 dtk, k1) putih: "SABAT" x114–607 y399–527 → cap 10,0 %, lebar 68 %, pusat x 50 % y 36 %. Logo GRII y848–920 (5,6–5,9 %).
- f056 (55,5 dtk) caption "ngomong tentang": y624–666, h 34–35 px = 2,7 %, pusat y 50 %, x 39–71 %.
- f019, f102: caption h 34–36 px = 2,7–2,8 %, y 50 %. x-height huruf kecil 24–26 px = 2,0 %.
- f010 (k4) merah: "pajak" h110 px = 8,6 % (asc–desc), x189–469; "percet orang pakai" 31–35 px = 2,5 %, y 46 %.
- f065 (k6) merah: "Darah" 71 px 5,5 %, "mata" 73 px 5,7 %, "air" 57 px 4,5 %, "orang melarat" 25–28 px 2,0–2,2 %; x-pusat 50 %, y 37–55 %.
- f074 (k7) oranye: "dapat" x-height 70–71 px 5,5 % (d 90 px 7,0 %), baris 1 y 25 %, baris 2 y 34 %, blok x146–574 = 59 % lebar.
- f023: kata putih terpotong tepi atas, h ≥152 px = 11,9 %.
- f002 (k5): mask LONDO/IRENG tidak bersih (glitch); huruf 82–105 px = 6,4–8,2 %.
- f036 (k3): glow menyatu 260 px (tak bisa dipisah per kata); baris kecil 2,1 %.
- k8 "DIA": taksiran visual ±26 % tinggi, ±56 % lebar (teks biru-putih bertekstur, mask gagal).

## Warna (median potongan)
- Tirai #201211, pita bawah #000000, caption #F9F6FA, merah teks #B20316, angka merah #980009 (termasuk gelap sela), oranye #F19F08, logo 81 #DE1635, berita tengah #E0E0E0, sudut #747474.
- Luminans tengah:sudut — f010 111:120 (tengah tertutup teks), f019 120:43, f023 94:121 (kata putih di atas), f056 82:10, f065 74:19, f102 152:14.

## Kamera per shot (skala %, dx %, dy %; inlier)
- Andal: 2,1 dtk 0 (356); 13,07 +7,0 (491); 19,0 +0,2 (102); 48,17 +14,0 (441); 52,77 0 (172); 54,9 −23,6 (396, kemungkinan cut di dalam); 56,67 0 (251); 59,57 +0,4 (176); 61,77 −7,8 (345); 65,23 0 (669); 66,23 +26,7 (139); 68,7 0 (719); 73,3 −41,9 (82, ganti kostum di dalam shot); 78,13 0; 78,93 +7,9 (542); 85,63 +6,2 (294); 88,47/89,13 0; 100,17 +6,2 (751).
- 90,0 dtk: dx +43,6 dy −39,0 (35) → geser cepat.
- Tidak andal (inlier <30, teks/isi berubah): 3,3; 4,4; 6,9; 8,7; 11,1; 17,5; 23,8; 33,9; 39,1; 49,7; 81,4; 91,4; 93,9; 98,3; 100,8.
- 41 shot setelah gabung ledakan; median 2,33 dtk.

## SFX proksi
- Rasio energi >5 kHz median 0,074; 24/40 cut punya puncak ≥2,5× dalam ±0,25 dtk (maks 11,2× di 30,8 dan 39,1 dtk). Bahasa Indonesia kaya desis /s/: proksi bisa tertipu.

## Skala subjek (dibaca dari frame kunci, ±3 %)
- Pembicara lebar (k1): kepala y 35 %, bunga mulai y 55 % → tampak ±20 % tinggi, bahu ±37 % lebar.
- Pembicara rapat (k7): kepala y 26 % → bunga y 67 %, ±41 % tinggi, ±90 % lebar.
- Nenek (k6) ±80 % tinggi; Kristus (k8) ±66 % tinggi × 25 % lebar; kartu berita (k4) ±68 % lebar.

## Batas ketelitian
- 720p: 1 px = 0,078 % tinggi; anti-alias ±2 px. Teks glow/blend/mask: ±10 %.
- Sampel 1 fps: watak masuk/keluar dibaca kasar; durasi animasi tidak terukur.
- Font = kemiripan visual, bukan identifikasi pasti.
