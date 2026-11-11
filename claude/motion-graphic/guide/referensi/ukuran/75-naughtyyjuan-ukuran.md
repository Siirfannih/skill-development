# 75-naughtyyjuan · data ukur mentah

Sumber: `/home/irfan/work/pustaka-video/mac/naughtyyjuan_Dd14iTCBEfV.mp4` · 720×1280, 30 fps, 92,04 dtk, audio 44,1 kHz stereo.
Frame: `frames/f_NNN.jpg` tiap 1 dtk (f_NNN = detik NNN−1). Semua % terhadap frame penuh 720×1280.

## Skrip
- `skrip/m75.py` teks: latar = median piksel tepi, mask |Δ|>90, buka morfologi 2×2, kotak gabungan + profil baris (jarak >4 px = baris baru). Tinggi = kotak ascender–descender, bukan cap height.
- `skrip/s75.py` subjek: komponen terhubung terbesar beda dari latar (>60); vignette = 1 − luma sudut 80 px / luma pusat; ketajaman = varian Laplacian; grain = std potongan datar 150×150.
- `skrip/cam75.py` kamera: ORB 1500 + `estimateAffinePartial2D` antara frame awal+0,1 dtk dan akhir−0,1 dtk tiap shot (360×640).
- Audio: ebur128, `earshot timeline --detail high`, `pace_read.py`, librosa beat_track + HPSS + chroma.

## Teks (per frame)
| Frame | Isi | Latar | Warna teks | Kotak x / y % | Pusat | Tinggi baris % |
|---|---|---|---|---|---|---|
| f004 | the craziest part | #000000 | #FBFBFB | 20–72 / 48–52 | (46,50) | 3,8 |
| f012 (k4) | FOLLOW (panel bawah) | #E3E2E7 | #3B51A0 | – / 61–82 | (50,71) | 8,1 |
| f016 | it does... | #E3E2E7 | #262629 | 35–65 / 48–52 | (50,50) | 3,7 |
| f021 (k5) | NOT | #E3E2E7 | #CC0004 | 35–65 / 47–53 | (50,50) | 6,6 |
| f022 | that | #E3E2E7 | #2E2E31 | 41–59 / 48–52 | (50,50) | 4,4 |
| f029 | STRATEGY MATTERS | #E3E2E7 | #BB0004 | 17–84 / 39–50 | (50,44) | 5,2 + 5,3 |
| f037 | to | #ECEFF4 | #2E2F33 | 46–54 / 47–51 | (50,49) | 3,9 |
| f054 | better.. | #000000 | #F1F1F1 | 36–64 / 47–51 | (50,49) | 4,4 |
| f055 | better.. you actually get | #000000 | putih + #F4EA18 | 36–75 / 47–66 | (55,56) | 4,4 per baris (4 baris rapat) |
| f058 | SKILL | #E3E2E7 | #2C2C2C | 15–87 / 45–55 | (51,50) | 9,8 |
| f063 | to get the same result | #000000 | #E0E0E0 | 18–82 / 48–52 | (50,50) | 3,8 |
| f082 | clients.. | #E3E2E7 | #232325 | 34–66 / 47–53 | (50,50) | 5,5 |
| f085 | yk that ur skill is there. | #E3E2E7 | gelap + merah | 22–78 / 49–52 | (50,50) | 3,1 |
| f086 | THE REAL PROBLEM | #79001C | #FAF3F5 | 14–86 / 49–52 | (50,50) | 3,0 |
| f088–89 (k8) | dm me: "METHOD" | bata #221D1D | putih | 14–85 / 44–53 | (50,48) | 2,1 + 5,4 |

## Subjek, vignette, ketajaman
- Kartu marun f023–f026 (k6): 71–77 % lebar × 59–64 % tinggi, pusat (50,50). Kartu IG f064 (k7): 80 × 36 %, pusat (50,47). Ikon avatar f042: 13 × 7 %.
- Memoji f078: diameter lingkaran 26–28 % lebar (Hough, ada deteksi palsu 15–19 dan 41 %).
- Vignette: f002 73 %, f003 75 %, f006 41 %, f007 42 %, f009 52 %, f078 45 %, f080 63 %, f088 70 %, f090 76 %; teks datar 0.
- UI buram f006: ketajaman pusat 715 vs tepi atas 54 (DOF ±13×).
- Grain: abu f016/f022 std 2,16; hitam f052 std 0.
- Warna: kuning #F4EA18 (f055), biru selotip #2C3185 (f010), kayu #8B5032, merah NOT #CC0004.

## Kamera (per shot, cv2)
- Push 1,03–1,13: 11,5–15,3; 29,7–32,4; 36,4–42,1 (+tx 7,6 %); 44,0–46,7; 62,6–69,0; 85,7–89,6.
- Pull 0,83–0,96: 18,9–22,2; 27,9–29,7; 42,1–43,0; 57,9–62,6; 69,0–71,9; 77,7–79,9; 84,6–85,7.
- Besar: 1,07–3,0 pull 0,45 rot −24° (3D); 46,7–48,1 punch 2,12×; 56,4–57,9 pan 20,5 % horizontal.
- Tak terukur (titik fitur kurang / isi berganti): 4–11,5; 22,2–25,2; 32,4–35,5; 50,6–56,4; 74,1–77,7; 81,2–84,6. Nilai rot ±180° = salah cocok pada teks simetris, abaikan.

## Ritme & audio
- Scene >0,25: 52 cut (33,9/menit), median 1,4 dtk; scene >0,06: 108 perubahan.
- ebur128: −14,1 LUFS, TP +0,1 dBFS, LRA 2,3 LU. earshot: −1,7 dBTP, 583 onset (6,3/dtk), 96 berlabel (52 ui, 21 voice, 17 hit, 3 foley, 2 whoosh, 1 note), funk + vocal chop, akhir chiptune?, pulse clarity 0,03.
- librosa: 117,5 bpm, onset 303/menit, HPSS harmonik −19,8 dB / perkusif −21,5 dB, kroma puncak C. pace_read: 6,6 suku kata/dtk, kategori energi.

## Batas ketelitian
- 720p: 1 px = 0,078 % tinggi, 0,139 % lebar; kata kecil ±0,2 % absolut.
- Sampel 1 fps: animasi masuk/keluar per kata tidak terukur; kata yang tampil <1 dtk bisa terlewat.
- Mask latar gagal pada footage/bata (f013, f034, f059, f081: kotak 100 %), angka itu dibuang.
- Label earshot hanya petunjuk; "chat message pop" bisa juga konsonan VO.
