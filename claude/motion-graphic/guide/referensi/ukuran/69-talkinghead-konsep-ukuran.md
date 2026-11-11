# 69 · ukuran mentah (11 Nov 2026)

Sumber: `Talkingheadkonsep.mp4`, 960×720, 25 fps, 37,20 dtk, AAC. 1 % tinggi = 7,2 px; 1 % lebar = 9,6 px.

## Teks per frame kunci (tinggi = ascender→baseline, % tinggi frame; x-height dalam kurung)
| Frame | Waktu | Kata | Tinggi | Lebar/posisi |
|---|---|---|---|---|
| k1 wajah-teks-belakang | 15,6 | "CLICK" | 33,3 cap (31,1→64,4) | x 5,4–93,6 % |
| k1 | 15,6 | "y solo" / "con" / "un" | 4,4 (3,2) | baris y 25–29 %; "un" x 70–90 % |
| k2 wajah-kutipan | 36,6 | "huella" | 17,5 (12,7) | x 33–65 %, baseline y 69,2 % |
| k2 | 36,6 | "comentá" | 3,1 (2,2) | atas "huella", rata kiri |
| f001 | 0,0 | "Este" | 8,0 cap | x 12–29 %, y 36–44 %, kotak seleksi |
| k3 broll-teks-seleksi | 2,0 | "slide text" | 14,0 (10,2) | x 23,3–77,7 %, y 41,7–55,7 % |
| f065 | 32,0 | "slide text" (ulang) | 14,3 | x 23,4–77,6 % (sama persis) |
| k4 lanskap-teks | 1,0 | "llama" / "se" | 14,3 (10,7) / x 8,0 | x 10,6–43,1 %, y 38,3–60 % |
| k8 broll-gelap | 8,0 | "invertirle" / "llegaba a" | 9,9 (6,7) / 2,7 (1,7) | x 32–68 %, y 43–55 % |
| k7 kartu-teks | 12,1 | "forma" | 5,4 | x 43–57 %, y 46,5–51,9 %, warna `#272528` |
| f070 | 34,5 | "si vos también lo querés" | 5,0 total (±3,8 asc) | x 31–69 %, warna `#1C1A1D` |
| k6 ui-aftereffects | 19,0 | caption "texto" | 3,5 | x 46–55 %, y 81 % |

## Warna (median potongan piksel)
Kartu abu `#E5E3E6` (f025, f069, blok grid f024) · kartu hitam `#121013` · UI galeri `#FFFFFF` · panel AE `#1B191A` · kotak seleksi `#6C88BA` (1540 px biru di f005) · langit lanskap `#95978D` · kaos `#131418` · ruang `#18201E`.
Luma f028: pojok kiri-atas 190, kanan-atas 27, kiri-bawah 26, pusat 79. Lab bayangan a −1,8 b −0,7; sorot a −2,0 b +3,2. Grain std 2,8 (high-pass σ3).

## Cut & kamera (ORB 3000 fitur + estimateAffinePartial2D RANSAC, frame awal+0,08 vs akhir−0,12 dtk)
Cut manual: 0,84 · 2,62 · 3,62 · 4,40 · 6,06 · 7,20 · 8,30 · 9,22 · 10,04 · 11,24 · 11,72 · 12,40 · 13,00 · 14,00 · 15,80 · 30,40 · 32,30 · 33,70 · 34,88 → 19 cut, 30,6/menit, median shot 1,12 dtk.
ffmpeg scene>0,1 memberi 38 titik (termasuk ganda dan wipe); pace_read 16 cut; earshot 24 cut.
| Shot | Isi | Skala awal→akhir | Gerak |
|---|---|---|---|
| 0,00–0,84 | wajah | −28,4 % | pull/ease-out |
| 2,62–3,62 | wajah | −15,4 % | pull |
| 3,62–4,40, 4,40–6,06 | UI galeri | 0 | diam |
| 6,06–7,20 | wajah | −21,1 % | pull |
| 8,30–9,22 | siluet | +0,9 %, tx −8,4 %W | pan |
| 9,22–10,04 | wajah | −18,2 % | pull |
| 10,04–11,24 | wajah | 0 | diam |
| 13,00–14,00 / 14,00–15,80 | wajah | −9,6 / −3,0 % | pull lembut |
| 15,80–30,40 | AE | zoom ±1,8× di 19,5–20, balik ±28 | zoom layar |
| 30,40–32,30 | kaki | 0, ty −2,9 %H | diam |
| 32,30–33,70 | wajah | −22,7 % | pull |
| 34,88–37,15 | wajah | −19,4 % | pull |
Kurva 34,88: 1,267 · 1,179 (0,2 dtk) · 1,128 · 1,093 (0,5) · 1,071 · 1,052 · 1,039 (1,0) · 1,020 · 1,007 · 1,001 (2,0). Kurva 32,3: 1,355 → 1,067 (0,5) → 1,00 (1,3).

## Audio
ebur128: I −14,2 LUFS, TP +0,3 dBFS, LRA 2,2 LU. librosa: 92,3 bpm, 227 onset (6,1/dtk). earshot: 91 bpm (clarity 0,21), 252 event, 96 berlabel (60 voice, 17 hit, 6 ui, 4 drum, 2 whoosh, 2 step, 1 riser), 88 % cut ≤ 100 ms dari onset. Pita < 150 Hz per 3 dtk (dB rel): 22,8 · 22,3 · 23,2 · 21,5 · **18,0** (12–15) · 21,4 · 20,1 · 20,9 · 21,7 · 22,3 · 22,4 · 20,8 · **17,5** (36–37).

## Skrip
Python mg-venv inline (cv2/numpy/PIL/librosa): komponen-terhubung putih (V>215, S<45), crop berpenggaris 1 % lalu dibaca mata, median warna, ORB affine, pita STFT. `pace_read.py`, `earshot timeline --detail high`, `ffmpeg ebur128`, `select=gt(scene,·)`.

## Batas ketelitian
- Sumber 720p terkompresi: ±1 px = ±0,14 % tinggi; tinggi huruf dibaca dari crop berpenggaris (±0,3 %), kata kecil bisa meleset ±10 %.
- Ambang putih tercampur jendela terbakar, jadi hasil otomatis dicek manual; skala kepala (±20 %) dan jendela AE (±85 %) dibaca dari crop/sheet, bukan segmentasi.
- Skala kamera di shot dengan teks/animasi besar (0,84–2,62, 33,70–34,88) tidak valid (inlier 4–5).
- Label earshot hanya petunjuk; level SFX/musik terhadap suara tidak diukur (tanpa pemisahan stem).
