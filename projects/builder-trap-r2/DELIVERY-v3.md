# Delivery · Builder trap r2 v3 (15 Nov 2026)

File: `out/builder-trap-r2_v3.mp4` (PC) · Drive: `Claude edit/builder-trap-r2/builder-trap-r2_v3.mp4` · 1920×1080, 30 fps, 83,37 dtk (2501 frame), H.264 + AAC. v1 dan v2 tidak ditimpa. Lembar 1 frame / 2 dtk: `out/builder-trap-r2_v3_sheet.jpg`.

Alasan versi: koreksi Irfan 15 Nov — potongan suara tanpa kata sampah dan diam (Lantai E23), KT seimbang dan kartu per kata (R-019, R-020), keseimbangan global per frame (Lantai C17), B12–B13 ke DNA kartu 63 (R-021, R-022), dan "pastikan dulu semuanya sebelum render final" (R-023).

## Suara dan audio
| Cek | v2 | v3 | Bukti |
|---|---|---|---|
| Kata sampah ("tuh" ×3) dan diam saat berpikir | ada | 0; 39 rentang dibuang, 94,97 → 83,37 dtk | `cut_check.py` PASS (sampah 0, diam_kata 0, diam_kal 0, antar_kal 0) |
| Jeda bersih | PASS | PASS, jeda median −66,9 dBFS | `pause_clean.py` |
| SFX | 48 cue | 49 cue (0,59/dtk); cue B12–B13 mengikuti event baru: klik dock, jendela terbuka, punch, ketik, kirim | `sfx_density.py --ref-density 0.65` PASS, earshot |
| Musik | duck −6 dB | duck ≤ 1,5 dB (anti-pumping), sesudah normalisasi | `audio/mix_v3.py` |
| Loudness | −15,0 LUFS | −14,8 LUFS, puncak −1,3 dBFS | ebur128 pada MP4 |

## Visual
- Bibir dan teks sinkron dengan suara baru: adegan diputar lewat peta waktu (`Freeze`), teks dan wajah di frame nyata; `cekkata` semua kata tampil tepat sekali saat diucapkan (kecuali 12 kata B12/B13b, sengaja tanpa KT, R-021).
- KT: blok seimbang (baris terpendek ≥ 85 %), "unik."/"FOMO." sejajar ujung, tumpuk kata B16–B18, tanpa kotak headline.
- B01–B03: kartu per kata mengelilingi bingkai, kartu kunci kanan-bawah; pergantian kata tanpa kartu kosong / tumpuk tajam, kata tidak melompat (r7f).
- B12–B13 (kartu 63 + layar Mac Irfan): foto CC0 padang hijau sebagai wallpaper, desktop macOS (menu bar, ikon, jam flip, kalender, dock), kursor klik ChatGPT di dock → ikon memantul → jendela gelap terbuka di tengah; punch = zoom kamera 3,8–4× ke kotak prompt di dalam jendela; "build something" diketik; tanpa KT.
- Bukti: `qc/JURI.md` (Catatan Irfan R-001…R-023 + kartu 63, PUTUSAN LULUS), `qc/sanding.jpg`, `qc/r7_sanding.jpg`, `qc/r7d_motion_sheet.jpg`, `qc/r7f_kartu.jpg`, draft penuh `qc/draft.mp4` dilihat sebelum final.

## Penyimpangan / catatan
1. Wajah Irfan tidak muncul ±11,5 dtk di B14–B15 (dinding bukti), lebih panjang dari "tiap 3–5 dtk" (R-007); struktur sama dengan v2, tidak diubah.
2. Mosaik B13→B14 tetap biru/putih proyek, bukan oranye kartu 63 (palet R-009 menang).
3. Tata letak ChatGPT: kotak prompt di bawah jendela (keadaan kosong ChatGPT versi lama) supaya punch kamera tidak memotong judul.
4. Render final gagal 2× (halaman render crash: disk jatuh ke 561 MB, render memakai ±3,6 GB + proses lain di PC naik-turun 2–3 GB). Ruang dibebaskan (cache model Whisper `large-v3`, `medium.en`, `small.en` — bisa diunduh ulang), render ke-3 sukses. `render.sh` kini memperingatkan bila disk < 8 GB.
5. Dua kali render final dimulai sebelum B12 pasti benar (dihentikan / tidak dikirim); gerbang `render.sh final` kini mewajibkan draft gerak terbaru, semua still terbaru, dan bukti tiap catatan Irfan di JURI.
