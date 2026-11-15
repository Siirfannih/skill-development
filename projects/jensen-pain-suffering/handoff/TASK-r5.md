# TASK r5 · lapisan film + glow (ref Irfan siirfannih_DfH6JYPqNjk) supaya b-roll pengisi mundur dan frame tidak flat

Alasan Irfan (15 Nov): render masih flat; b-roll pengisi terlihat seperti aset utama. Efek film + glow membuat footage jadi tekstur dan menambah rasa estetik/satisfying, sementara teks tetap fokus.
Bedah: `ref/BEDAH-FILMGLOW.md` + frame `ref/fg_50.png`, `ref/fg_detail.png` (lihat gambarnya).

## Lapisan (komponen `FilmLook` yang dipasang per shot, di atas footage, DI BAWAH teks)
1. **Bloom**: salinan footage blur ±18–28 px @1080, threshold sorot (brightness/contrast), `mix-blend-mode: screen`, opasitas 0,35–0,5.
2. **Halation**: salinan sorot yang sama diwarnai oranye-merah (#FF5A1F-ish), blur ±10 px, screen, opasitas 0,15–0,25 (tipis, hanya di tepi sorot).
3. **Halftone**: pola titik rapat (radial-gradient berulang ±5 px @1080), blend overlay/soft-light, opasitas 0,12–0,2.
4. **Aberasi kromatik + blur tepi**: tengah ±60 % tajam; ke tepi frame salinan R dan B bergeser 2–4 px berlawanan + blur ±4–6 px, dimask radial (tengah transparan).
5. **Hitam terangkat**: lantai hitam ±8–12 /255 (bukan pekat), sedikit hangat; brand #0E0D0C tetap terasa.
6. **Vignette** yang sudah ada dipakai (sudut 0,75–0,85× tengah di shot terang).
7. **Grain** halus yang sudah ada di semua shot (bukan hanya babak III).

## Takaran per jenis footage (alasan: peran footage)
| Jenis | Shot | Takaran |
|---|---|---|
| b-roll stok pengisi | B2, B5a, B6a, B7a, B8a, B8b, B9a, B10 | penuh (semua lapisan, bloom + halftone paling kuat) → footage mundur jadi tekstur |
| arsip bermakna | B4 cetakan, B6b foto tim | sedang (bloom, halation, grain, halftone tipis; tanpa blur tepi supaya wajah terbaca) |
| pembicara Jensen | B1, B3, B6c, B7b, B9b, B11, B12a | ringan (halation + bloom tipis, grain, aberasi hanya di tepi luar 10 %) — wajah tetap tajam |
| kartu (SUFFERING, AMPLE DOSES) | B5b, B12 | grain + glow teks saja |

## Teks
- Teks tetap tajam di atas semua lapisan (lapisan film TIDAK menimpa teks).
- Tambah **glow teks** lembut: halo ±20–30 px @1080, opasitas 0,25–0,35, warna sama dengan teks (amber untuk kunci). Kontras tetap ≥ 4,5.

## Keluaran
- Still semua beat (frame sama dengan r2/r4) + `render.sh draft Main` penuh. Catat waktu render per frame sebelum/sesudah (lapisan blur bisa memperlambat; bila > 2× lebih lambat, pakai blur yang dihitung sekali per klip/skala kecil lalu diperbesar).
- Lembar sanding: still kita B5a, B7a, B6b, B3 berdampingan dengan `ref/fg_50.png` (`scripts/juri/sandingkan.py` atau hstack ffmpeg) → `qc/sanding_film.jpg`.
- `handoff/REPORT-r5.md`.
Jangan ubah teks/posisi/kamera dari r4.
