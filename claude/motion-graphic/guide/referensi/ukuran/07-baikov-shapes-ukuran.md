# 07 · Baikov / Shapes · data ukur mentah (11 Nov 2026)

Sumber: B = `02_Baikov_TEKS-SFX-CUT.mp4` (67,0 dtk, 736×414, 30 fps, 290 kbps, md5 ec51b27d…); A = `baikovphilipp_ssspin.io_1794219313.mp4` (47,3 dtk, 736×414, 30 fps, 258 kbps, md5 2d4d4d4d…). Dua video berbeda (bukan salinan). Kartu berpusat pada B.

## Teks per frame kunci (`scripts/ukur_baris.py`: mask warna dalam ROI, dipecah per baris; % dari 414 / 736 px)
| Frame | Teks | Tinggi bbox | Lebar | Pusat (x, y) | Warna |
|---|---|---|---|---|---|
| k1 B 0,5 | What / makes | 20,0 / 20,0 % | 38 / 48 % | 23,51 / 72,54 | tinta `#2F2D2A` / biru `#445DF8` |
| B 1,0 | your | 19,3 % | 32 % | 83,52 | merah `#E85C59` |
| k2 B 3,2 | Mission | 6,8 % | 18 % | 50,50 | tinta |
| B 4,2 / k3 B 5,5 | Rituals / Feedback (miring) | 11,4 / 9,2 % | 21 / 21 % | 50,50 / 52,47 | tinta |
| B 8,2 | Onboarding | 7,0 % | 26 % | 50,48 | tinta |
| B 13,2 / 64,6 | logo "shapes" | 7,5 / 9,7 % | 14 % | 53,48 / 55,50 | tinta |
| k4 B 19,5 | AI agents (roda) | 10,1 % (miring) | 29 % | 48,47 | `#272E30` di `#3A5BFE` |
| k5 B 28,5 | eyebrow serif / Good Afternoon | 4,6 / 4,8 % | 17 / 29 % | 29,22 / 35,28 | putih kebiruan |
| k6 B 37,5 | bubble chat | 3,9 % | 39 % | 29,42 | abu `#686868` |
| A 1,6 | Everything starts with a | 5,6 % | 39 % | 40,50 | lime bold + pucat regular |
| A 6,3 / 16,5 | Question / GROWTH | 10,1 / 10,9 % | 32 / 41 % | 30,58 / 69,50 | pucat / lime `#E2EE32` |
| A 35,0 | Clear actions | 5,3 % | 21 % | 56,48 | pucat + bold |
| k8 A 41,5 | Because/great/design/isn't just/how it looks | 9,7/11,6/12,3/12,6/12,1 % | 29/18/22/28/43 % | x 19–32, y 16/35/51/68/85 | pucat regular, lime bold |
| A 46,5 | Ready to grow? | 9,9 % | 43 % | 54,51 | hijau tua |
Kartu angka B 55,5 gagal diukur otomatis (teks abu di kartu putih); angka ±7–9 % dari pembacaan visual sheet.

## Skala subjek (`scripts/skala.py`: komponen terhubung terbesar, lebar×tinggi % frame)
B 13,2 hex putih 52×91 % (luas 34 %) · B 4,2 kartu Rituals 38×68 % · B 5,5 shape 37×100 / 32×75 / 55×33 % · B 8,2 tangga 93×43 % @ y 78 % · B 3,2 foto/shape 37×41 (gerombol), 27×39, 18×21, 10×18 % · B 55,5 kartu 28–32 × 34–36 % · B 37,5 bubble 39 % W · A 21,0 foto ±60×60 % (komponen otomatis menyatu dengan pita, dibaca visual).

## Warna (`scripts/warna_kamera_sync.py`, k-means k=5, % piksel)
B 0,5 `#FBF7F4`92 `#445DF8`3 `#2F2D2A`3 · B 4,2 `#FCC64C`34 `#FCFCCD`26 `#FEEC4F`24 · B 5,5 `#F2EFEC`49 `#4D78FD`26 `#EB615D`9 `#58C872`8 `#2C5D38`8 · B 8,2 `#FBF5F4`64 `#E84F47`15 `#F4C2C2`12 `#F08081`9 · B 13,2 `#3A5BFD`28 `#649AFD`22 `#CCD7FE`15 · B 55,5 `#446BFD`41 `#5E91FD`27 · sudut UI B 28,5 `#4F62D7`/`#CCD4F5` · A 1,6 `#052A21`57 `#084836`31 `#87AE37`6 · A 16,5 `#F5FBE3`50 `#E7F9D4`43 `#E2EE32`2 · A 41,5 `#05261F`/`#064134`/`#096147` + `#C9DC42`.

## Cut, kamera, ritme
- ffmpeg `select=gt(scene,0.30)`: B 4,93 5,13 12,23 12,33 12,43 12,80 12,93 16,93 33,47 49,60 49,67 51,20 53,27 60,60 60,67; A 14,2 19,87 23,80 23,83 33,77 42,10 (dicek ke sheet).
- pace_read.py: B 13,4 cut/menit, median 1,8 dtk, event 49/menit, `energi`; A 7,6/menit, median 5,7 dtk, 32/menit, `fokus`.
- Kamera (ORB 800 titik + estimateAffinePartial2D tiap 3 frame, dikalikan per shot) B: 0–4,9 ×0,15; 5,1–12,2 ×2,64; 12,9–16,9 ×0,96; 16,9–33,5 ×2,15 geser x −155 %; 33,5–49,6 ×4,67 (14 langkah gagal); 49,6–51,2 ×0,70; 51,2–53,3 ×0,83; 53,3–60,6 ×1,40; 60,6–67 ×0,25. A: 0–14,2 ×1,65; 19,9–23,8 ×0,99; 23,8–33,8 ×0,33; 33,8–42,1 ×0,87.

## Audio
- ebur128: B −14,5 LUFS, LRA 4,2, peak −0,8 dBFS; A −12,8 LUFS, LRA 4,1, peak +0,3 dBFS.
- earshot `timeline --detail high` (work/earB.txt, earA.txt): B 405 onset 6,0/dtk, tag 55 ui/20 voice/11 hit/5 drum/2 riser; A 242 onset 5,1/dtk, 69 ui/16 voice/8 note/1 whoosh, 10 stop-down.
- librosa: bpm 117,5 untuk keduanya (curiga: earshot pulse clarity 0,04 = tanpa grid); chroma B D/C♯/E, A F♯/G♯/E.
- `scripts/sync_kuat.py`: aksen ≥ +15 dB vs puncak beda-frame (persentil 80), ±70 ms: B 37 aksen, 46 % (acak 33 %); A 51 aksen, 29 % (acak 28 %).

## Batas ketelitian
- 736×414: 1 px = 0,24 % H / 0,14 % W; bbox teks mencakup ascender/descender; teks miring membesarkan bbox; ROI dipilih manual dari grid frame.
- Kamera dari ORB tercampur gerak elemen (motion graphic tanpa kamera nyata): arah dapat dipercaya, besarnya kasar.
- Tag earshot adalah petunjuk; "speech" belum diverifikasi telinga. Grain/tekstur tidak terukur karena bitrate rendah. Font tidak teridentifikasi pasti.
