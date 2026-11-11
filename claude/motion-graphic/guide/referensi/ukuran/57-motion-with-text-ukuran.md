# 57 · Motion with text — data ukur mentah

Sumber: `/home/irfan/work/pustaka-video/unggahan/Motionwithtext.mp4` · h264 720×960, 60 fps, 284 frame, 4,733 dtk, bt709, **tanpa stream audio**.
% x terhadap lebar 720, % y/tinggi huruf terhadap tinggi 960.

## Per frame kunci
| Frame | t (dtk) | Ukur |
|---|---|---|
| k1-cincin | 0,40 | isi x 12,5–87,4 %, y 21,9–78,0 % (cincin luar 75 %); cincin dalam ±25 % lebar; garis 2–3 px, inti `#D0CCC8`; label "2023" h 1,25 % (12 px) di x 75,8 y 24,4 + "$42,000" h 1,35 % `#7B7873`; "Match" h 1,46 % x 57,2 y 40,9 + "$4,200" h 1,56 % |
| k2-morph | 0,68 | lingkaran→rounded square; luar tetap 75 × 56 %; label "2023" x 75,7 y 23,5 h 1,35 %; "Match" x 55,7 y 41,5 h 1,56 % |
| k3-kotak-bersarang | 1,22 | panel `#1E1B16` x 12,4–87,5 y 21,8–78,1 (75,3 × 56,5 %); bagian 28,2 × 20,7 % di pojok kiri-bawah |
| k4-bar-persen | 1,80 | lime `#CEFF0A` x 12,5–85,1 → 87,4 (penuh), y 57,5–78,1; "65%" h 4,6 % ; "35%" h 4,6 % |
| (t 2,5) | 2,50 | "53%" x 14,3 y 44,1 w 16,9 % h 4,69 % (45 px) `#FEFCF9`; "APY" h 1,25 %; "Match" di lime h 1,25 %; "47%" h 4,58 %; lime atas y 50,4 % |
| k5-transisi-geser | 2,98 | isi x 7,8–83,2 % (geser −4,6 % dari 12,4); tanpa motion blur |
| k6-dial | 3,80 | cincin x 17,8–82,1 %, diameter 464 px = 64,4 % lebar, 48 % tinggi; isi y 25,8–84,6; track `#28251C`; busur lime 3 px; nilai "$50.00" h 4,06 % (39 px) pusat x 50; "Ira Match" h 1,46 % `#888481` y 47; skala "0/25/50/75" h 1,67 %; pil tahun aktif lime h 6,25 % kotak x 14,6 %, teks h 1,46 % y 81,9 |
| k7-zoom-akhir | 4,72 | isi x 15,1–84,7, y 23,8–87,4 (dari 17,9–82,1 / 25,8–84,6 pada 4,4 dtk) = push +9 % dalam 0,28 dtk |

## Lintasan gerak (sampel tiap 3 frame, 60 fps)
- 0,00–0,30: lebar isi 71,9 → 75,0 % (ease-out; beda antar-frame 2,8 → 0,6).
- 0,55–0,90: morph lingkaran → kotak (beda frame 0,5–2,6, puncak 0,65).
- 1,10–1,25: panel terisi `#1E1B16`; lime muncul 1 frame (beda 7,9 pada 1,25).
- 1,55–1,95: tepi kanan lime 40,7 → 42,1 → 45,1 → 63,6 → 82,1 → 85,1 → 86,7 → 87,2 % (ease-in-out tajam; 37 % lebar dalam 0,1 dtk).
- 2,25–2,60: tepi atas lime 57,5 → 57,1 → 56,7 → 53,8 → 50,8 → 50,1 % (sama).
- 2,70–3,00: isi kiri 12,1 → 11,7 → 10,7 → 9,7 → 7,8 % (ease-in, keluar ke kiri).
- 3,05–3,55: dial masuk, kiri 27,9 → 23,9 → 21,4 → 20,1 → 19,3 → 18,6 → 18,1 → 17,9 → 17,8 % (ease-out, offset awal +10 %).
- 3,70 dan 3,90: pil tahun melompat (1 frame); busur 3,90–4,20 tumbuh (lime x kiri 50,0 → 21,9 %).
- 4,45–4,73: push-in, beda frame 0,15 → 2,5 (makin cepat, terpotong di akhir).
- Scene detect ffmpeg (ambang 0,1): hanya 3,033 dtk (pergantian panel → dial).

## Warna (median piksel)
latar `#110E09` (sudut = tengah kiri, tanpa vignette; std 3,3) · panel `#1E1B16` · track `#28251C` · lime `#CEFF0A`–`#D0FF30` · label `#C3C0BB`–`#E2DEDB` · nilai sekunder `#7B7873`–`#888481` · angka besar `#FEFCF9`.

## Skrip
- `work/measure.py`: bbox isi (beda >40 dari latar), bbox/hex lime (G>180, B<80), panel.
- `work/text.py`: komponen teks (abu terang sat<40 atau gelap di sekitar lime), dilasi 3×9, tinggi baris piksel.
- Lintasan per frame: skrip inline cv2 (bbox isi, tepi lime, beda absolut antar-frame).
- `ffmpeg select='gt(scene,0.1)'` untuk cut; frame 0,5 dtk di `frames/`, 0,1 dtk di `work/d_*.jpg`; sheet padat `sheet-padat-0.1s.jpg`.

## Batas ketelitian
- 720p: 1 px = 0,104 % tinggi / 0,139 % lebar. Tinggi teks = tinggi tinta baris (termasuk `$`, `%`, ekor), bukan cap height murni; label kecil ±1 px (±8 %).
- Teks gelap di atas lime terbaca warna campuran anti-alias; hex aslinya tidak terukur.
- Font hanya perkiraan visual (neo-grotesk Regular), tidak dicocokkan glyph per glyph.
- Audio: tidak ada stream, jadi ebur128/earshot/pace_read/bpm tidak bisa dijalankan.
