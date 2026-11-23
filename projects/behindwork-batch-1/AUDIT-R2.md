# Audit r1 → r2 (revisi Irfan 23 Nov 2026, D-24..D-30)

Diukur dengan `remotion/bangun/cek_komposisi.py` di data r1 (aset dipetakan `aset_peta.py`: MediaPipe + Haar, OCR, zona teks).

| Ep | WAJAH (KT menutup wajah) | NAPAS | Potong 15 dtk pertama | Inset kecil di kanvas polos | Pola template yang Irfan sebut |
|---|---|---|---|---|---|
| 01 | 5 (kutipan Stanford 06b, 08) | 0 kanvas napas di 89 dtk | potong + invert | 0 | infografis profil linier; klip Jensen tanpa dinamika; 100 anak vs chip berbobot sama |
| 02 | 10 (klip EW: KT di sisi wajah yang di-zoom) | 0 | potong | 0 | jam/tahun seperti kalender digital; "You're not" tanpa ruang hening |
| 03 | 0 | 0 | potong | 10 (zoo 640×480 di hitam, slide) | timeline detik membungkus video asli |
| 04 | 4 ("3 guests", "hotels: full", 11a, 12b) | 0 | potong | 6 (sereal, POST A ROOM, listing tegak, Nathan) | listicle Line 1–6; sereal hanya satu item |
| 05 | 0 | 0 | potong | 1 | dua siklus simetris = salin-tempel; kutipan tenggelam |

Akar masalah:
- Alat persepsi (MediaPipe) sudah terpasang di PC tapi tidak dijalankan sebelum merancang posisi KT; posisi KT ditebak dari still.
- Perangkat khas tiap episode diulang per beat (detik ke-N, Line N, jam), jadi pola terbaca di detik ke-5.
- Aset tegak/kecil dipasang sebagai inset ber-bayangan di kanvas polos, bukan dijadikan jangkar full-bleed atau dibangun ulang sebagai UI.

Perbaikan r2: jangkar spasial dengan kamera pegas, kanvas napas tiap 6–10 dtk, tata potong (whip, grid, kilat putih, invert), UI editorial (artikel + stabilo, obrolan, iklan baris) untuk adegan digital, pre-processor aset + cek komposisi wajib nol sebelum render.
