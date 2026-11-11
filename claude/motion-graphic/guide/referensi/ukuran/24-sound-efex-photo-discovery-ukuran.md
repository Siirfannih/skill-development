# 24 · ukuran mentah (Sound efex 2.mp4, 1276×718, 30 fps, 40,07 dtk)

## Skrip (semua di `work/`)
- `meas.py` baris teks: mask gelap (L<110) atau merah (R>150,G<110,B<110), proyeksi baris → y0–y1, x0–x1, median hex.
- `obj.py` objek: Canny 30/90 + dilasi 9 px → komponen terhubung; teks samping k1 per kolom.
- `bg.py` hex latar (rerata 16×16 px di 7 titik) + grain = std (abu − GaussBlur σ3).
- `cam.py` ORB 1500 + estimateAffinePartial2D antar-frame 0,5 dtk → skala %, dx/dy %.
- `aud.py` librosa beat/onset + energi pita <150 Hz / 300–3k / >5k per 0,5 dtk; `ons.py` profil tiap onset (puncak, decay −10 dB, centroid); `vo.py` pyin f0.
- `pace_read.py` (skill audio), `earshot timeline --detail high --out earshot.json`, ffmpeg ebur128, scene>0,25.

## Teks per frame (tinggi baris = ascender–descender, % tinggi frame)
| t (dtk) | teks | y % | tinggi % | x % | cx/cy | hex |
|---|---|---|---|---|---|---|
| 0,6 k1 | "Event / is Over" | 45,5–54,6 | 3,9 + 4,0 | 8,9–17,1 | — | hitam |
| 0,6 k1 | "You are / wondering" | 45,3–55,2 | 3,9 + 4,9 | 78,3–91,2 | — | hitam |
| 2,6 k2 | "Where are my" | 43,3–48,5 | 5,2 | 41,3–59,2 | 50,3/45,9 | #E55D2F |
| 2,6 k2 | "PHOTOGRAPHS?" | 49,2–58,8 | 9,6 | 23,6–76,9 | 50,2/54,0 | #251F23 |
| 4,6 k3 | "Chase Photographer" | 47,4–54,9 | 7,5 | 31,3–69,4 | 50,4/51,1 | merah |
| 6,6 | "Never get them!" | 43,7–56,3 | 12,5 | 21,5–76,8 | 49,1/50,0 | #E53726 |
| 9,0 | "Take a Selfie" | 43,5–53,9 | 10,4 | 29,9–71,9 | 50,9/48,7 | #E53828 |
| 14,0 k5 | "Select" / "Download"(+panah) | 30,6–40,1 / 46,5–59,2 | 9,5 / 12,7 | 40–60 / 20,6–65,3 | — | #CA372C/#CE372B |
| 22,4 k7 | "One Place" | 26,6–33,4 | 6,8 | 38,1–61,8 | 50,0/30,0 | #292122 |
| 33,4 | "Premium Features" | 46,9–52,9 | 6,0 | 20–79 (dgn kurung) | 49,7/49,9 | #1F1314 |
| 36,6 | "One Simple Link" | 44,6–53,8 | 9,2 | 26,7–73,5 | 50,1/49,2 | #3F393B |
| 38,2 | logo (dgn glow) | 40,0–63,0 | 23 (ikon ±14) | 41,5–57,8 | 49,6/51,5 | #FE3300 |
| 39,6 | "nmaphoto.com" | 46,8–53,2 | 6,4 | 37,7–62,2 | 50,0/50,0 | #F53607 |

## Objek (lebar × tinggi % @ pusat)
- k1 0,6: kartu foto 47×48 @ (50,50). k3 4,6: 16×49@(8,58) buram, 18×22@(78,28), 11×26@(51,22), 15×20@(66,81), 15×18@(33,83), 17×43@(91,78) buram.
- k4 7,2: ikon 11×13 @(49,50); dock terpecah 20×11 per segmen. k6 17,5: pil 41×28, 38×24, 40×17, 37×17 (termasuk bayangan).
- k7 22,4: kartu 21–24×32 (4 kolom) + baris 19 % di bawah. k8 28,6: toggle 56×23 (dgn glow) @(48,51). Laplacian var: k8 10,8 (lanskap sangat buram), k6 620.

## Latar
- 2,6: tl #FCF8FD · tc #FAEEEF · bl #F3D7D7 · bc #FDE7E7. 9,0: br #F5C1BC. 14,0: br #F7B4B0. 39,6: semua #FFFFFF.
- 28,6 lanskap: tl #B0CFE1 · bl #FCB6AA · bc #FDE0B7 · br #F6BF8B. Grain std 0,13–0,30 (0,52 lanskap).

## Kamera (per 0,5 dtk; s = skala, dx/dy % frame; inlier rendah = abaikan)
- 0–1: s +1,2/+2,4 (push). 9–10,5 teks: s −6,4/−2,3/−2,3. 16,5–17,5 pil: s +2/+0,8, dx −3,1/−2,5. 27–28,5 lanskap: dx +3,2/+1,5/+0,9. 30–31,5 counter: s −1,6/−1,7/−2,1. 33,5–34: s +142 (zoom-through). 38,5–40: 0.
- Scene>0,25: 5,77 · 7,23 · 8,33 · 29,47 · 34,0.

## Audio
- ebur128: −14,4 LUFS, LRA 4,1 LU, TP −0,4 dBFS. earshot: 102 bpm clarity 0,17; 239 event (6,0/dtk); 96 bertag: 47 ui, 19 voice, 17 hit, 6 drum, 3 note, 2 key, 1 whoosh, 1 riser. Seksi: tech house + vocal chop + VO.
- librosa: 103,4 bpm, 69 beat; onset 54 (80,9/menit). Pita <150 Hz: 13–19 dB (0–17,5), −8…+5 (17,5–27), 11–17 (27–37). RMS −29…−31 dB di 21–22,5.
- Onset terkeras: 10,31/10,45 (−7,8 dB, rise +16), 7,24 (−8,5, +12), 29,68–29,98 (−9,5, +11–13), 17,67 (−10,1, +11).
- pyin: f0 median 240–260 Hz, voiced 14–77 % per 2 dtk. pace_read: 3 cut, 32 event visual/menit, 5,1 suku kata/dtk (proxy).

## Batas ketelitian
- 1 px = 0,14 % tinggi; tinggi baris memuat ascender/descender (cap ±75–80 % darinya). Frame bergerak (blur/skala) → ±10 %.
- Mask merah bisa tertular foto merah (k3 dibatasi y 40–62 %). Objek Canny menyertakan bayangan/glow (+2–5 %).
- Label bunyi = tebakan CLAP/AST, belum didengar; tanpa stem, level SFX vs VO dari "over bed" campuran.
- Hitungan ±36 komposisi dari contact sheet 0,5 dtk (manual), bukan detektor.
