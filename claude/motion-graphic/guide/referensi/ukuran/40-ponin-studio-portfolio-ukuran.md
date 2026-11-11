# 40 · Ponin Studio: data ukur mentah (11 Nov 2026)

Sumber: `.../instagram/c9a0a055d65940766b5e/video.mp4` ("IG DfKmIL6C5vq") · 720×1280 (9:16), 19 fps, 21,63 dtk, ada audio.
Frame: tiap 0,5 dtk → `frames/f001…f043.jpg` (fN = (N−1)×0,5 dtk). Transisi dicek ulang di 10 fps (8,2–11,4 dtk; 1,4–2,2 dtk) dan 5 fps (12,8–16,8 dtk).

## Teks (bbox piksel gelap/terang dalam pita; % terhadap 1280 tinggi / 720 lebar)
| Frame kunci | Teks | Ambang | Tinggi baris % | Lebar % | Pusat (x,y) % |
|---|---|---|---|---|---|
| k1 f003 1,0 dtk | "You built something brilliant." hitam | <70 | 3,2 (termasuk ekor g) | 77,9 | 49,7 · 50,0 |
| k3 f012 5,5 dtk | "So we make it move." putih | >245 | 2,5 | 57,4 | 49,8 · 63,4 |
| k4 f019 9,0 dtk | "We make it." hitam | <60 | 5,8 | 65,7 | 49,9 · 49,9 |
| k5 f020 9,5 dtk | "Mean something." tajam di pita | <60 | 5,9 | ±60 | 50 · 50 |
| k5 f020 | baris raksasa "meth/omet/som/sc" | <60 | 18,8 · 16,5 · 12,7 · 12,8 (terpotong + blur) | >100 | baris y 1–90 |
| k6 f025 12,0 dtk | "Feature." hitam | <70 | 4,8 | 36,8 | 49,9 · 50,0 |
| k7 f029 14,0 dtk | "They remember / how it felt" putih | >235 | 4,8 + 3,75 (2 baris) | 58,2 | 49,9 · 50,0 |
| k8 f043 21,0 dtk | "STUDIO" putih, spasi lebar | >240 | 2,4 | 30,1 | 50,2 · 56,7 |
| k8 | "PONIN" | — | ±7,8 (perkiraan dari grid; awan putih mengganggu ambang) | ±57 | 50 · 52 |

Rasio raksasa : kalimat tajam di k5 = 12,7–18,8 / 5,9 ≈ 2,2–3,2×. "PONIN" : "STUDIO" ≈ 3,2×.

## Warna (rerata patch 10×10 px)
- Krem pembuka f003: `#DDDBCE`, `#E3E1D4`; krem kata f025: `#EBEAE6`, `#E9E8E3`; krem tipografi f020: `#F8F7F2`, `#FAF9F4`.
- Teks hitam f025: `#2E2D2C`. Titik aksen oranye: f019 `#C9792F`, f025 `#C87B2F`, f003 `#BF8047` (titik kecil, antialias).
- Terowongan f008: `#7B3D2D` (bayangan), `#BD6862` (dinding salem), `#FEF8FA` (cahaya ujung).
- Ruang 3D f012: karpet `#BC6525`, dinding `#AF927F`, bayangan `#863A13`.
- Lanskap kabut f029: `#829DA6`, `#B4C0C0`. Langit/logo f043: biru `#065287`, rumput `#50782B`, awan `#98999D`.

## Kamera (cv2 ORB + estimateAffinePartial2D antar-frame 0,5 dtk, dikalikan per shot)
| Shot | Rentang | Skala | Geser | Pasangan sah | Catatan |
|---|---|---|---|---|---|
| S1 krem+ubin | 0–1,5 | ×0,71 | −14 % W, +14 % H | 2/3 | pull-out, ubin mengecil |
| S2 terowongan | 2,0–3,5 | tidak andal | — | 2/3 | rotasi −178° = salah cocok; terlihat: terbang maju + guling |
| S3 ruang 3D | 4,0–6,0 | ×2,67 | — | 4/4 | push-in kuat (ruang lebar → meja → close-up) |
| S4 panel kaca | 6,5–8,0 | — | — | 0/3 | fitur kurang (panel tembus pandang) |
| S5 UI ponsel | 8,5–9,0 | ×1,05 | — | 1/1 | push pelan; kartu UI bergeser vertikal |
| S6 tipografi | 9,5–10,0 | ×1,00 | −5 % W | 1/1 | baris raksasa bergeser horizontal |
| S10 lanskap | 13,0–15,5 | ×0,74 | — | 3/5 | teks mengecil + kamera tilt (meja naik dari bawah) |
| S11 langit | 16,0–21,0 | ×0,91 | — | 9/10 | awan bergerak; logo diam |

## Ritme
- Pergantian adegan manual (sheet + 10 fps): 0 · 1,75 · 4,0 · 6,5 · 8,5 · 9,6 · 10,5 · 10,75 · 11,2 · 12,0 · 13,1 · 16,0 · 21,6 → 12 pergantian = 33/menit; shot median 1,4 dtk (0,25–5,6).
- `ffmpeg select=gt(scene,0.2)`: 1,74 · 8,53 · 9,58 · 10,53 · 10,68–11,21 (5) · 13,11 · 16,0.
- `pace_read.py`: cut 6 = 16,6/menit (hanya cut keras), median 2,3 dtk, event visual 42/menit, gerak layar 8,3, usulan kategori "energi", musik 100–140 bpm.

## Audio
- ebur128: −14,1 LUFS, true peak −0,2 dBFS, LRA 6,8 LU.
- librosa (wav mono 22,05 kHz): tempo 103,4 bpm; 90 onset (4,2/dtk); padat 2,6–3,4 dtk, 10,5–12,8 dtk, 17,6–20,7 dtk.
- RMS/0,5 dtk: −19 → −10 dB puncak di 4,5–7,5 dtk (ruang 3D), −18 s.d. −22 dB di 12–20 dtk, fade ke −60 dB di 21,5 dtk.
- earshot `timeline --detail high`: **gagal** (timeout 240 dtk pada mp4 dan wav). Label SFX tidak terukur.

## Skrip dan batas
- Skrip: `/tmp/m40.py` (bbox teks, hex, pita oranye), `/tmp/cam40.py` (kamera), librosa satu baris (bpm/onset/RMS), ffmpeg ebur128 + scene.
- Sumber 720p: 1 px = 0,08 % tinggi; kata kecil ±0,2 %. Bbox mengukur tinggi baris (ascender–descender), bukan cap-height murni.
- Teks di atas footage (k3, k7) dan logo di awan: ambang terang ikut menangkap latar; angka k8 "PONIN" dari grid, bukan ambang.
- Kamera di adegan 3D/teks tipis tidak andal (sedikit fitur, objek bergerak sendiri); dipakai hanya sebagai arah.
