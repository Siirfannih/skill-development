# 64-koushik-kds · data ukur mentah

Sumber: `/home/irfan/work/pustaka-video/unggahan/koushik_kds_ssspin.io_1794368193.mp4`
ffprobe: h264 720×960, 30 fps, 8,3 dtk, 249 frame, 652 kb/s. **Tidak ada stream audio** → ebur128, earshot, pace_read, librosa tidak bisa dijalankan.
Scene detect (`select=gt(scene,0.2)`): 0 cut.

## Skrip (di `tools/`, dijalankan `~/work/mg-venv/bin/python -I`)
- `ukur.py` — statistik per frame (luma, % biru, % hitam, % putih, selisih antar-frame), kestabilan masker teks.
- `teks.py` — tinggi baris judul, kotak putih/biru, baris teks kecil, logo, hex latar + grain, tangga biru sapuan, tepi grid.
- `kotak.py` — tepi label per baris (frame hitam), tinta judul, tebal batang.
- `arah.py` — titik berat biru/putih selama sapuan (arah gelombang).

## Frame kunci (keyframes/, ukuran asli 720 px, tidak di-upscale)
| File | t | luma rata | biru % | hitam % | putih % |
|---|---|---|---|---|---|
| k1-latar-hitam | 0,50 | 19,8 | 2,5 | 90,6 | 6,3 |
| k2-sapuan-ke-putih | 1,00 | 97,6 | 41,9 | 46,0 | 20,6 |
| k3-latar-putih | 2,00 | 240,9 | 2,5 | 1,8 | 95,3 |
| k4-sapuan-ke-hitam | 3,17 | 137,7 | 40,8 | 32,3 | 39,0 |
| k5/k6-tumpukan-teks | crop 520×420 @ (80,300) dari t 2,0 / 0,5 | | | | |
Hanya 4 keadaan berbeda di video; k5/k6 adalah crop detail, bukan adegan baru.

## Teks (frame t=2,0)
- Baris 1 "I'M THE": y 343–384 (42 px = 4,38 %), x 338–515 (24,6 % lebar), pusat (59,2 %, 37,9 %)
- Baris 2 "OPPOSITE": y 422–465 (44 px = 4,58 %), x 125–381 (35,6 %), pusat (35,1 %, 46,2 %)
- Baris 3 "OF AI": y 502–544 (43 px = 4,48 %), x 255–381 (17,5 %), pusat (44,2 %, 54,5 %)
- Tebal batang (baris 1, y 365): 7–9 px.
- Label putih (frame t=0,5): baris 1 y 322–403 x 319–535; baris 2 y 403–484 x 105–401; baris 3 y 484–566 x 235–401. Gabungan 430×242 px = 59,9 × 25,2 %.
- Kotak biru: y 564–691, x 402–558 → 21,7 × 13,2 %, pusat (66,7 %, 65,4 %), `#2713E9`.
- Teks kecil (5 baris): tinggi 14,14,14,13,18 px (1,35–1,88 %; baris 5 berisi descender "y"), lebar 12–16 %.
- Logo KDS: y 39–55 (1,77 %), x 334–385 (7,2 %).

## Warna
- Latar putih `#FAFAFA` std 2,0 · latar hitam `#010101` std 1–2 · tinta judul `#070606`.
- Sapuan biru (t=1,0) persentil luma 10/50/90: `#090780` / `#2013D5` / `#887EE4`.

## Gerak
- Periode loop 3,33 dtk (statistik t=0,00 = t=3,33 = t=6,67).
- Selisih antar-frame: 0 saat diam, puncak 13,9/255 saat sapuan; rata 4,7. Tidak ada frame > 20 (tidak ada cut/flash).
- Tepi grid pita (baris y 100/250): x 560, 640 → sel 80 px (11,1 % lebar).
- Titik berat biru sapuan ke putih: (60 %, 59 %) t 0,7 → (41 %, 30 %) t 1,3. Sapuan ke hitam: (64 %, 63 %) t 2,9 → (41 %, 36 %) t 3,5.
- Masker teks (tinta < 60) di frame dengan latar sama: perubahan 0,0–0,5 % → teks dan kamera diam. (Nilai 35 % di frame hitam = latar hitam ikut terhitung, bukan gerak teks.)

## Batas ketelitian
- Sumber 720 px: 1 px = 0,1 % tinggi / 0,14 % lebar; kompresi 652 kb/s mengaburkan tepi pita biru.
- Font tidak bisa dipastikan dari piksel; "Helvetica Now Display Bold / Neue Haas Display" adalah perkiraan dari bentuk G/S/R dan tracking.
- Pemisahan biru/hitam/putih memakai ambang tetap (B−R > 60, luma < 40, > 225); persentase sapuan bergeser ±5 bila ambang diubah.
- SFX/musik: tidak terukur (tanpa audio).
