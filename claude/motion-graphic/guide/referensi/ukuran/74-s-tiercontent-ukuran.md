# 74 · s_tiercontent — data ukur mentah

Sumber: `/home/irfan/work/pustaka-video/mac/s_tiercontent_DebvOZiMDmo.mp4` · 1276×718, 30 fps, 21,24 dtk, audio 44,1 kHz stereo.
Frame: `frames/` tiap 0,5 dtk (42) · `contact-0.5s.jpg` · `sheet.jpg` (tiap 2 dtk, 8 kolom) · `keyframes/74-k1…k8`.

## Teks (profil baris piksel terang, % tinggi/lebar frame)
| Frame | Teks | Inti (x-height) | Penuh | y | x | RGB |
|---|---|---|---|---|---|---|
| k1 1,0 s | sans "if you're already" | 8,2 | 15,6 | 56,3–71,9 | 2,0–58,1 | 225,213,202 |
| k1 1,0 s | script "using" | 16,4 | 24,7 | 75,2–99,9 | 22,6–48,5 | 224,213,202 |
| k2 4,0 s | sans "Edit entire videos" | 4,0 | 5,7 | 70,2–75,9 | 23,7–52,5 | 204,201,205 |
| k2 4,0 s | script "for" | 15,6 | 15,9 | 71,9–87,7 | 49,0–59,3 | 145,142,146 (blur) |
| k3 6,6 s | script "connect yur AI" | 4,9 | 7,0 | 41,2–48,2 | 35,1–71,3 | 212,223,207 |
| k3 6,6 s | script "1st" | 7,4 | 10,7 | 39,0–49,7 | 27,2–31,9 | – |
| 16,5 s | label "adding captions" | 3,5 | 5,2 | 32,6–37,7 | 54,3–72,6 | – |
| 16,5 s | label "Cutting" | – | 6,4 | 60,4–66,9 | 75,2–85,1 | – |
| 16,5 s | pill sans "chatgpt" | – | 4,9 | 54,9–59,7 | 60,0–70,8 | – |
| k7 16,9 s | sans "doing everything by" | 10,3 | 10,4 | 59,9–70,3 | 21,6–79,5 | 221,224,227 |
| k7 16,9 s | script "itself" | – | 18,7 | 69,9–88,6 | 53,0–78,3 | – |
| 19,3 s | script "comment 'invideo'" | 5,7 | 9,7 | 58,9–68,7 | 31,7–62,5 | – |
| k8 20,8 s | sans pill "to get the MCP link…" | 8,6 | 10,4 | 43,9–54,3 | 28,1–79,2 | 240,240,237 |
Pill hijau k3 (grid): x 25,3–74,5, y 36–53,5. Pill kaca k8: x 26–89, y 42–58; ikon bulat x 5–21.

## Skala subjek (grid 5 % dibaca manual dari frame penuh)
Polaroid 2,9 s: x 36–63, y 25–84 · laptop 7,5 s: x 17,5–81, y 20–84 · UI kecil 4,0 s: x 29–71, y 30–69 · kartu chat 10,8 s: x 28,7–75, y 21,9–66,9 (ambang L>45) · timeline 16,9 s: x 16–85, y 20–78.

## Warna (rata-rata patch 16×16 px)
Latar UI #0E0E0E / #100E12 / #141115 · kartu chat #353236 · pill hijau #323D2B–#273220 · dinding #685B34, bayangan #2C2215 · polaroid krem #8F754D · logo Claude #B35B35 · glow oranye #88542B · langit #3378BD · bukit #63713F / #293F35 · pill pink #E6C8DD · klip timeline #4D637B · pill kaca #5F6760.
Luminans tengah/sudut: 1,0 s 83/76 · 10,8 s 50/14 · 16,9 s 101/14 · 20,8 s 185/96.
Grain (std high-pass, σ3): 0,31 / 0,28 (UI gelap) · 0,51 (dinding).

## Kamera (LK optical flow + estimateAffinePartial2D, langkah 0,5 dtk, frame 638×359)
Andal (inlier ≥ 30): 6,0 s diam · 7,0 s ty −13,7 % (UI naik) · 7,5 s skala −7,8 % · 11,5 s +10,5 % · 15,5 s diam · 16,0 s −24 % · 17,5/18,0/18,5 s −27/−9/−4 % (ease-out) · 19,0 s diam · 19,5/20,0 s +11/+20 %.
Lain (inlier < 15) = transisi/blur, tidak dipakai sebagai angka.
Scene detect (thr 0,25): 1,20 · 1,93 · 13,80–14,07 (flash). Transisi dari strip 0,2 dtk: 2,9 pull+gelap · 4,5 · 6,8 slide-up · 8,6 zoom-through · 13,6 flash putih · 17,3 iris.

## Audio
ebur128: −14,3 LUFS, TP −0,7 dBFS, LRA 2,2 LU · librosa 123,0 bpm, 110 onset, centroid median 1962 Hz.
earshot: 127 event (6,0/dtk): 42 voice, 19 ui, 11 note, 11 whoosh, 7 hit, 4 riser, 1 drum; 2 seksi (0–15,45 pizzicato corporate; 15,45–21,15 + vocal chop); pulse clarity 0,11; 86 % cut punya onset ≤100 ms.
pace_read: 5 cut, event visual 34/menit, 4,4 suku kata/dtk (proxy).

## Skrip
`skrip/ukur_teks_warna.py` (profil teks, hex, vignette, grain) · `skrip/gerak_kamera.py` · `skrip/grid_frame.py` · earshot `timeline --detail high` (`earshot.txt`) · `pace_read.py`.

## Batas ketelitian
718p: 1 px = 0,14 % tinggi. Teks sering blur gerak/glow; "inti" = baris ≥35 % kepadatan maks, bisa meleset ±10 %. Font = kemiripan visual, bukan identifikasi. Skala subjek dibaca dari grid 5 % (±1 %). Gerak kamera gagal di adegan gelap/blur. Label earshot = tebakan CLAP.
