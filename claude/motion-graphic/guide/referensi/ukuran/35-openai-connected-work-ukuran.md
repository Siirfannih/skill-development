# 35 · ukuran mentah (video sumber 1280×720, 30 fps, 31,1 dtk)

Skrip: `scripts/ukur.py` (teks, hex, kamera per shot), `scripts/gerak.py` (gerak global ORB per 0,2 dtk → `gerak_raw.txt`), `scripts/skala.py` (bbox subjek → `skala_raw.txt`), cek tambahan inline (cincin, tombol, kode). Audio: `ffmpeg ebur128`, `earshot timeline --detail high` (→ `earshot.txt`), `pace_read.py`, librosa beat_track. Output mentah: `ukur_raw.txt`.
Cara ukur teks: potong kotak di sekitar kata (koordinat dibaca dari frame penuh), tinta = piksel beda > ambang dari median latar; "tinggi tinta" = naik-turun huruf, "pita_x" = baris dengan ≥ 25 % tinta maks (≈ tinggi-x).

## Teks (% tinggi frame; pusat % frame)
| t | Kata | Tinggi tinta | Pita-x | Lebar | Pusat | Tinta / latar |
|---|---|---|---|---|---|---|
| 2,5 | too many (biru) | 4,72 | 3,06 | 11,2 | x34 y50 | `#0A277B`* / `#020408` |
| 2,5 | thoughts | 8,19 | 4,86 | 17,8 | x49 y49 | putih |
| 6,0 | label "12 new messages" | 2,78 | 1,53 | 11,2 | x39 y13 | putih |
| 6,0 | subjudul "pending replies" | 1,81 | 1,11 | 6,2 | x36 y15 | `#202124` |
| 8,5 | connected. | 3,33 | — | 11,6 | tengah | putih di hitam |
| 10,5 | wordmark OpenAI | 11,11 | 7,08 | 15,6 | x50 y50 | `#323233` / `#FAFBFD` |
| 12,0 | What will we build? | 5,83 | 5,56 | 38,1 | x50 y37 | `#3E4953` / `#D7E1E9` |
| 12,0 | isi prompt | 2,64 | 1,53 | 30,5 | x37 y50 | abu |
| 15,0 | Seconds. | 12,36 | 8,19 | 22,0 | x50 y52 | biru→gelap per huruf |
| 22,0 | Feedback / Clients (dekat) | 4,86 / 5,00 | — | 14 / 9,6 | x50 y51 | `#5F5751` |
| 22,0 | Negative (tengah) / Files (jauh) | 3,06 / 2,08 | — | — | — | — |
| 25,5 | label pohon / angka | 2,36 / 1,53 | — | 5,1 | menempel titik | — |
| 18,5 | baris kode dekat | 3,33 | — | — | — | — |
| 29,0 | One place to | 6,53 | 3,89 | 20,5 | x42 y46 | putih |
| 29,5 | One place to Discover. | 6,94 | 4,17 | 37,5 | x50 y46 | putih + biru |
| 30,5 | logo bunga + OpenAI | 16,67 | — | 12,5 | x50 y50 | putih |
*tinta rata-rata termasuk tepi antialias; warna asli lebih terang.

## Warna (median potongan)
gelap `#020305`; titik biru `#0739CF`; cincin `#083EFE`; putih babak 2 `#E6EEF7`–`#FDFDFD`; tombol `#0859F8`; latar "Seconds" tengah `#CDE4FE`; merah `#CE060F`; sorot hijau `#06831C`; sorot merah `#8C0004`; panel editor `#080107`; krem `#F1E8E0`/`#ECE0C4`; titik oranye `#F6AA0C`; langit `#7DA2D1`→`#90AED4`. Grain latar gelap std 0,5–0,8 (bersih); kertas krem std 36–74 (tekstur nyata).

## Skala subjek (bbox, % lebar × % tinggi)
cincin luar 43,9×79,0 (isi hitam 38,9×69,0) · kotak prompt 66,6×9,7 (dari koordinat frame; mask otomatis bocor ke langit) · editor 64,8×68,3 (16,5 dtk), 90,4×73,8 (18,5 dtk, dekat) · pohon: batang 46,9×63,5, sebaran label 94×91 · tombol kirim Ø 13,9 tinggi (14,0 dtk) · garis cabang x0–96 y11–87, piksel terang 1,16 % · 110 titik oranye, Ø median 1,39 % tinggi.

## Kamera (ORB + estimateAffinePartial2D, per 0,2 dtk; % per langkah)
2,2–5,6 pan x −3,4/−9,4/−6,3/−4,8/−3,8 … −2,1 (mengikuti garis, melambat) · 6,0–7,0 x −0,7→−0,2 · 9,0 skala −9,3/−5,9 (keluar cincin) · 11,6 −9,2/−4,5/−2,0 (pull dari pantai) · 12,2–13,6 +13,0/+6,2/+4,6/+9,5/+6,4 (push ke prompt) · 16,0–16,8 −3,0…−1,0 · 17,2 y −37,2 (whip atas) · 18,2–19,0 +1,9/+6,5/+4,9/+2,3 · 19,4 y −31,0 (whip atas) · 21,4 +15,5 x+17,8 · 24,4–26,6 +0,2…+3,6 · 28,8–29,0 +4,1/+4,3 · 29,6–30,6 −2,1/−3,3/−1,7.
Transisi (scene > 0,15 + sheet): 7,73 · 8,9 · 11,3 · 13,33 · 14,93 · 15,6 · 17,43 · 17,8 · 19,7 · 21,0 · 26,57 → 11 = 21,2/menit; shot median 1,87 dtk. pace_read: 9 cut, 17,3/menit, median 1,9, event visual 31/menit.

## Audio
ebur128: −14,2 LUFS, TP −0,2 dBFS, LRA 4,5 LU. earshot: 221 onset (7,1/dtk), 96 bertag (34 hit, 32 ui, 11 voice, 9 drum, 4 foley, 3 note, 3 whoosh); jeda 6,20 dtk (0,85 dtk) dan 29,65 dtk (0,3 dtk); seksi 0–7,05 tech house tipis (−16 LUFS), 7,05–31 house + vocal chop (−14 LUFS). librosa 107,7 bpm (semua babak). RMS per babak: 0–7 −19,0 dB; 7–21 −14,1; 21–26,5 −15,2; 26,5–31 −18,0.

## Batas ketelitian
- Sumber 720p: 1 px = 0,14 % tinggi; kata < 2 % bisa meleset ±10 %. Tinggi tinta memuat ascender/descender.
- Kamera dari ORB: gagal di adegan gelap tipis (0–2 dtk, 7,2–7,8) dan saat zoom-through cepat; angka per shot penuh (awal vs akhir) di `ukur_raw.txt` tidak dipakai karena tiap shot memuat transisi.
- Label CLAP earshot hanya petunjuk; VO vs vocal chop tidak bisa dipastikan tanpa transkrip.
- Vignette: tidak terukur bersih (teks/objek menutup titik sampel).
