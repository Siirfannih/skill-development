# 50 · Merantau (`2dmotion.mp4`) — data ukur mentah (11 Nov)

Sumber: `/home/irfan/work/pustaka-video/mac/2dmotion.mp4` · h264 1280×720, 24 fps, 47,12 dtk (1128 frame) · AAC 48 kHz. Bukan video Spark (lihat header kartu).
Frame tiap 0,5 dtk: `frames/` (94). Sheet: `sheet.jpg` (tiap 2 dtk, 8 kolom, sel 300 px), `sheet_dense.jpg` (tiap 1 dtk). Frame kunci: `keyframes/50-k1…k8-*.jpg` (1080 px).

## Per frame kunci (koordinat piksel 1280×720; % terhadap frame)
| Kunci | t (dtk) | Ukuran | Warna (median patch 24 px) |
|---|---|---|---|
| k1 interior-jendela | 0,5 | luma tengah 171 vs sudut 38 (vignette −134) | dinding `#25262B` `#292A31`, langit senja `#A39CAC`, gedung `#48465B`, matahari `#FDFBF5` |
| k2 tipografi-kalender | 3,5 | "26" baris y 320–593 = 38,1 % H; blok "2026" x 44–502 = 35,8 % W; angka tanggal 35–37 px = 4,9–5,1 % H | kertas `#F9F7F1`/`#F5F5F5`, angka `#363636`, merah `#B53C46`, bulan `#958B59` |
| k3 kalender-lingkar | 7,5 | angka "20" kolom: 74–88 px = 10,3–12,2 % H; lingkar merah y 276–434 = 21,9 % H (masker merah, ikut angka merah sebagian) | kertas `#EDEDED`, merah `#B03840` |
| k4 objek-jam | 11,0 | blob putih 639×476 px = 50 % W × 66 % H (bercampur pantulan cahaya; Hough gagal) → dicatat ±45–66 % H | dinding `#282624`, cahaya `#585446`, muka jam `#F7F5F1` |
| k5 pintu-cahaya | 13,5 | saturasi baris y 400: kayu jenuh x ±340–950 = ±48 % W; tinggi melewati frame | kayu `#7D502B`/`#7E5C3E`, dinding `#7E6B41` `#88836B`, sudut terang `#BDB68A` (+38 luma) |
| k6 koper | 17,5 | masker merah 1134×140 px = 88,6 % W × 19,4 % H, y 580–720 | koper `#9C4D41`, langit `#EDE5DA`, matahari `#C36B53`→putih, cakrawala `#734D48` |
| k7 kota-pesawat-kertas | 21,0 | sudut 58 luma lebih gelap dari tengah; skala gedung/pesawat kertas = perkiraan visual | langit `#C4D8D7`/`#CFDCD5`, fasad `#BBBFDA`, pesawat kertas `#CFC9D0` |
| (pesawat) | 25,0 | siluet 225×179 px = 17,6 % W × 24,9 % H, pusat (48 %, 54 %) | siluet `#A5A098`, latar `#E5DFCF`→`#8F9EB5` |
| (porthole) | 29,5 | — | bingkai `#999999`/`#747474`, dalam `#EBE1D4` |
| judul besar | 34,5 | "Merantau" y 459–631 = 23,9 % H, x 225–1073 = 66,2 % W, pusat (50,7 %, 75,7 %) | teks `#C2CBD7`, langit `#E4E5EA`→`#65728B` |
| k8 judul-kredit | 40,0 | judul y 215–340 = 17,4 % H, 29,8 % W, pusat (26,6 %, 38,5 %); label kredit 2,4 % / 1,8 %, nama 1,5 % / 1,7 % H, lebar 10–17 % | teks `#DDE6EB`, langit `#5F6F89`/`#68758E` |

## Cut dan kamera
- ffmpeg scene>0,25: 2,50 · 4,50 · 5,50 · 9,50 · 11,67 · 12,92 · 20,17 · 23,71 · 45,13 (5,5 = kalender kertas → kalender meja dalam satu gerak). Selisih frame tertinggi juga 16,0–16,2 (flash kertas terbang).
- pace_read.py: 8 cut = 10,2/menit, shot median 3,5 dtk, event visual 28/menit.
- Gerak global (optical flow LK + `estimateAffinePartial2D`, frame 640×360 tiap 2 frame, diakumulasi): 0–2,5 skala ×0,92 ty −35 %; 2,5–4,5 ×1,07; 5,5–9,5 roll +108°; 11,67–12,92 ×0,65; 20,17–23,7 ×1,52; 27,5–31 ×2,18; 31–45 tx +53 %. Shot 9,5–11,7, 15,5–20 dan 23,7–27,5 tidak terpakai (titik fitur sedikit, flare/kertas bergerak sendiri → angka absurd).

## Audio
- ebur128: −14,3 LUFS, true peak −0,7 dBTP, LRA 3,8 LU. RMS per 3 dtk (dBFS): −25,1 −19,7 −21,1 −19,6 −17,3 −19,7 −17,8 −17,5 −19,4 −18,9 −19,9 −15,4 −19,4 −20,0 −17,2 −33,5.
- librosa: 136 bpm, 137 onset (2,9/dtk), centroid median 750 Hz.
- earshot `timeline --detail high`: seksi 0–7,6 pizzicato/orkestra · 7,6–13,1 pizzicato hangat · 13,1–24 pizzicato · 24–41,9 gitar akustik sendu · 41,9–47 pizzicato + riser 42,06. Whoosh 2,74 / 3,09 / 15,44; ekor senyap 45,75. Tidak ada ucapan (tidak ada label VOICE kuat bertahan).

## Skrip
`scripts/m50.py` (cut, gerak kamera, librosa), `scripts/px50.py` (hex, bbox subjek, tinggi angka), `scripts/tt50.py` (tinggi/posisi teks judul dengan kontras lokal terhadap blur 41 px). Python `~/work/mg-venv/bin/python`.

## Batas ketelitian
- 720p: 1 px = 0,14 % H, 0,08 % W. Tinggi teks ±2–3 px; script tipis bisa meleset ±10 % karena tepi tipis menyatu dengan kabut.
- Bbox dari masker warna/terang ikut menangkap cahaya atau angka sewarna (jam, lingkar merah); angka itu ditandai perkiraan.
- Gerak kamera = estimasi 2D global pada gambar bertekstur rendah; arah dapat dipercaya, besaran kasar. Tidak ada data kamera 3D.
- Label earshot tebakan CLAP; di atas musik banyak yang salah (mis. "chat message pop" = pizzicato).
- Font hanya kemiripan visual, tidak ada metadata.
