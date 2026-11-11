# 31 · Ukuran mentah (11 Nov 2026)

Sumber: `Cara penggunaan Text dalam visual video.mp4` · 960×720 (4:3), 23,976 fps, 72,91 dtk, audio 44,1 kHz.
Semua % terhadap frame penuh (x dari 960 px, y dari 720 px). Skrip di `scripts/`.

## Frame kunci (`keyframes/31-k*.jpg`)
| k | t (dtk) | isi | ukuran terukur |
|---|---|---|---|
| k1 daftar-judul | 3,5 | judul merah + 5 butir | "5" 17,2 % h; "PART" 15,0–15,8 %; "STORY TELLING" 9,0–9,7 %; "STRUCTURE" ±6 % (grid); strip judul x 4–97 %, y 8–30 %; daftar x 6–47 %, y 31–85 %; butir ±5–6,5 % (grid); caption teks 3,89 %, kotak 6,8 % × 29,4 %, x 35–65 % |
| k2 kata-kunci-stempel | 14,5 | "TOPIC" + 2 panah + 2 kartu wajah | merah "TOPIC" 18,5 × 14,2 %, x 16–41 %, y 19–33 %; kertas x 8–47 %, y 15–69 %, 10 potong; "PROBLEM" (11,0 dtk) 37 × 12,8 %, x 5–42 %, y 14–27 % |
| k3 butir-daftar | 18,0 | "2. RISING ACTION" | strip 46,6 × 11,8 % (x 4–50 %, y 42–54 %); tinta 42,1 × 5,42 %, pusat (28 %, 48 %) |
| k4 doodle-samping-wajah | 48,5 | tokoh bosan | stiker x 13–42 %, y 20–71 % (29 × 50 %); kepala presenter topi–dagu y 22–66 % (±44 %), x 52–80 % |
| k5 grafik-bintang | 43,3 | kurva di atas bintang merah | komponen merah terbesar x 11–44 %, y 17–38 % (bintang terpecah oleh kertas; dari sheet ±x 2–45 %, y 12–48 %); merah `#C62F33`; kertas x 2–52 %, y 18–69 % |
| k6 bukti-sosial | 8,0 | ubin jumlah tonton | kiri x 6–46 %, y 7–42 % (dari pratinjau, bukan mask) |
| k7 broll | 19,0 | laptop dalam ruang | layar penuh; caption tetap |
| k8 kamera-diangkat | 23,0 | sweter menutup bawah, buram | ORB shot 23,65–25,65: skala 1,372, dx −36,9 %, dy +29,9 % |
Lain: "3. SECOND CONFLICT" (39,6) tinta 36,8 × 5,83 %; "5. RESOLUTION" (59,0) 33,3 × 6,53 %; "4. CLIMAX" ±5 % (grid). Caption di 9,5/11/14,5 dtk: kotak 7,6–7,9 % h, 23–25 % w, teks 4,7–5,0 % (dengan descender), pusat x 50 %, y 92 %.

## Warna (median piksel)
caption `#FE583C`/`#FF583C`; spidol merah `#B52626`, `#BA2B29`, `#B41F20`, `#AC292F`, bintang `#C62F33`; kertas `#E6E5DF`, `#DADACE`, `#DADAD4`; tinta hitam inti `#44413A`; langit `#98C2E2` (atas-kiri) / `#6D96D4` (bawah-kiri); sweter `#012828`; kulit `#A47777`; daun `#314935`.

## Cut, kamera, cakupan
- `cuts.py`: diff abu-abu daerah kanan (x 58–100 %, y 0–86 %) + histogram HSV. `shots.py`: puncak lokal > 3,5× median diff → 35 perubahan (jump cut + ganti stiker), 28,8/menit, segmen median 1,81 dtk. ORB + `estimateAffinePartial2D` antara frame awal+1 dan akhir−2 tiap segmen: skala 0,982–1,034, geser ≤ 4,6 % (kecuali k8).
- `pace_read.py src.mp4`: cut 7 = 5,8/menit, shot median 4,4 dtk, event visual 60/menit, bicara ±5,0 suku kata/dtk.
- Masuk/keluar stiker (frame per frame di 1,9 / 11,25 / 25,6 / 48,95 dtk): 0 frame transisi, berganti di frame cut.
- `coverage.py`: kertas > 1 % daerah kiri pada 71,1 % dari 291 sampel (tiap 6 frame).

## Audio
- ebur128: I −14,9 LUFS, LRA 3,6 LU, true peak +0,4 dBFS. earshot: −14,9 LUFS, TP +0,2 dBTP, pulse clarity 0,13.
- earshot babak: 0–11,4 tanpa musik (kendaraan, narasi); 11,4–18,75 techno + vocal chop; 18,75–39,5 trap beat; 39,5–72,8 techno + vocal chop. 487 onset, 96 bertag (57 voice, 17 ui, 8 whoosh, 6 foley, 5 hit, 3 note). Teks lengkap: `earshot.txt`.
- librosa: 123 bpm (PLP 0,18), chroma teratas C#, A#, G#; bas < 150 Hz 3,7–4,0 % (0–12 dtk) → 8,3–9,9 % (24–72 dtk).
- 29 transien terkuat (persentil 99 onset strength), 11 di ≤ 0,12 dtk dari cut.

## Batas ketelitian
- 1 px = 0,104 % lebar, 0,139 % tinggi. Mask warna: huruf tangan tipis bisa meleset ±0,3 % h; tinggi butir daftar di k1 dari grid 5 % (±0,5 %), bukan mask (strip menempel, mask menyatu).
- Font caption ditebak dari bentuk (Inter/SF Pro Bold), bukan dari metadata. Huruf spidol adalah tulisan tangan, tidak ada font.
- Detektor cut tidak memisahkan jump cut dari ganti stiker tanpa cut (mis. not musik 42–44 dtk); angka 35 = batas atas, 7 = batas bawah.
- SFX/musik dari mix tanpa stem; tag earshot hanya petunjuk. Hex footage tergantung pencahayaan; grain/vignette tidak terukur.
