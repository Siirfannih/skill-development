# 59 · Contohkonten.mp4 — data ukur mentah

Sumber: `/home/irfan/work/pustaka-video/unggahan/Contohkonten.mp4` · 720×1280 (9:16), 30 fps, 32,33 dtk video / 32,46 dtk audio (44,1 kHz stereo). Isi 0–28,3 dtk; 28,3–32,4 kartu logo BARSOL MEDIA.
Skrip (di folder ini): `ukur.py` (bbox teks per mask warna + komponen terhubung), `cam.py` (ORB + estimateAffinePartial2D, frame awal+0,12 vs akhir−0,12 tiap shot), `cuts.py` (korelasi histogram HSV + selisih luma per frame). Hex/vignette: skrip Python sekali jalan (median potongan 12×12 px; luma tengah 40×20 % vs rata-rata 4 sudut 12×10 %).

## Teks per frame kunci (% tinggi/lebar frame; h = bbox tinta, termasuk ekor huruf)
| Kunci | t | Kata | Mask | h % | w % | pusat x,y % |
|---|---|---|---|---|---|---|
| k1 judul-kotak-belakang | 2,6 | "WIN" (mengisi kotak bingkai) | merah | 57,9 | 85,3 | 49,2 , 34,0 |
| k1 | | "You" serif italic | putih | 3,9 | 12,4 | 24,6 , 28,0 |
| k1 | | "filling" / "Room" | putih | 3,7 / 2,8 | 15,8 / 18,1 | 64,1 , 30,6 / 69,9 , 33,2 |
| k2 kolase-kartu | 9,1 | "win" | merah | 7,3 | 21,9 | 47,8 , 23,6 |
| k2 | | "ROOM" serif italic | merah | 7,6 | 45,4 | 50,1 , 58,1 |
| k2 | | "AFTER" italic | putih | 7,7 | 44,9 | 40,3 , 65,7 |
| k2 | | "what the" / "does" | putih | 2,8 / 2,8 | 21,5 / 7,8 | 39,2 , 51,9 / 73,5 , 51,5 |
| k3 kartu-foto-hitam | 10,8 | "RECAP" (+ garis putih) | merah gelap | 13,9 | 58,6 | atas 17,0 |
| k3 | | "The" | putih | 3,8 | 14,7 | 14,5 , 30,2 |
| k4 layar-led | 13,4 | "SPON" / "SORS" (2 baris) | terang | 9,5 / 10,0 | 63,8 | 50 , 50,7 / 60,5 |
| k5 putih-profil-kurva | 17,0 | "DEAL" (terpotong tepi kanan) | merah gelap | 32,0 | 48,1 | 75,9 , 27,9 |
| k6 closeup-label | 19,3 | "BONUS" (miring ±8°, di chip putih) | merah gelap | 6,8 | 26,7 | 46,6 , 78,4 |
| k6 | | "The" / "is" / "not" | putih | 2,7 / 2,8 / 4,1 | 11,2 / 5,0 / 14,6 | 50,8 , 13,6 / 73,7 , 31,7 / 71,5 , 40,9 |
| k7 judul-belakang-gelap | 22,9 | "MARKETING" (italic condensed, ekor gerak) | merah | 17,0 | 57,9 | 48,9 , 32,2 |
| k7 | | "is" | putih | 3,8 | 6,1 | 47,8 , 18,6 |
| k8 teks-melengkung | 24,0 | "Everything else" busur | — | Tidak terukur: mask gagal (huruf miring di busur); dari grid ±3 % per huruf, busur ±60 % lebar, pusat y ±60 % | | |

## Subjek dan grafik
- k3 kartu foto: 44,0 % tinggi × 78,1 % lebar, y 30,9–74,9 %, x 10,8–88,9 %, sudut membulat, bayangan jatuh ke bawah.
- k2 kolase: mask latar krem gagal memisahkan (kartu + subjek + dinding tersambung); dari grid: kartu menyebar x ±8–90 %, y ±23–85 %.
- Skala subjek (dibaca dari grid 10 %, bukan segmentasi): wide duduk 70–75 % tinggi × 35–45 % lebar (k1, k7, k8); berdiri krem kepala y ±27 %, terpotong di pinggang-paha; profil putih k5 kepala y ±19 % sampai bawah; close-up k6 kepala y ±13 %, mengisi ±85 % tinggi.

## Warna (median potongan)
Dinding studio `#210408`–`#2F0104`; lantai/rim biru `#25314D`; latar merah gelap k7 `#610E1D` (bawah) → `#0C0C0E` (atas); latar hitam k3 `#0E0E0E`; LED k4 pinggir `#070707`; dinding krem `#988C7E`–`#B3A796`; latar putih k5 `#E8D5D7` (putih kemerahan karena glow). Merah teks: "ROOM" `#6C030D`, "MARKETING" `#6F010C`, "WIN" `#6E0306`, "DEAL" `#640006`, "BONUS" `#7C212E`, kurva `#530206`.
Luma tengah / sudut: k1 34/31 · k2 47/149 · k3 65/14 · k4 69/1 · k5 153/178 · k6 82/33 · k7 28/19 · k8 34/26.

## Shot dan kamera (cam.py; skala >1 = push)
Batas shot (dtk): 0 · 3,80 · 5,73 · 6,47 · 9,40 · 9,67 · 12,23 · 13,07 · 14,00 · 15,80 · 17,63 · 19,80 · 21,10 · 21,90 · 23,50 · 24,43 · 25,47 · 26,40 · 28,33 (logo) · 32,4.
Hasil andal (inlier ≥ 90): 3,80–5,73 diam (+0,8 %); 5,73–6,47 pull −14 %; 21,10–21,90 pull −3,5 %; 23,50–24,43 push +5,4 %; 24,43–25,47 pull −13 %; 25,47–26,40 pull −8 %; 26,40–28,33 push +6,7 %.
Tidak andal (inlier < 50, teks/kartu menutupi): 0–3,8, 6,47–9,4, 9,67–12,23, 14,0–17,63, 17,63–19,8, 21,9–23,5. Dari strip 30 fps: 15,8–16,2 geser lateral cepat (depan → profil), 17,63 dan 19,8 masuk dengan blur gerak.

## Audio
ebur128: −14,3 LUFS, true peak −1,0 dBFS, LRA 4,8 LU. earshot: 198 event (6,1/dtk), 96 berlabel: 38 suara, 16 whoosh, 10 UI, 9 note, 7 hit, 7 foley, 6 drum, 3 key. Grid ±88/176 BPM lemah (clarity 0,20); librosa 172 BPM. Bagian: 0–5,7 music box/chiptune; 5,7–27,7 bed korporat + vocal chop; 27,7–32,35 hip hop bass. Jeda 2,70 dtk 1,4 dtk (−39 LUFS). 68 % cut punya onset ≤ 1 frame. pace_read: 28 cut "terdeteksi" (termasuk pop teks), event visual 48/menit, laju bicara 6,1 suku kata/dtk.

## Batas ketelitian
Sumber 720p: 1 px = 0,078 % tinggi; huruf kecil ±0,2 % absolut. Bbox mencakup ekor/kemiringan, jadi tinggi huruf kapital nyata ±10 % lebih kecil untuk kata miring (BONUS, Everything). Font hanya dicocokkan mata. Skala subjek dari grid, ±5 %.
