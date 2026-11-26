# Arsip bedah: 02_Baikov_TEKS-SFX-CUT.mp4 (kartu 07)

Arsip audit dan R&D. **Tidak dimuat di sesi editing**; sesi editing memakai `spec/` dan `registry.json`.

## Metadata (measured)
- 736x414, r_frame_rate 30/1 (ffprobe). Jendela bedah 0,0–3,0 dtk.
- Frame duplikat (gerak.frame_duplikat, 0–4 dtk): f3, 9, 15, 21, 27, 33, 45, 51, … → periode 6 = animasi 25 fps di kontainer 30 fps. Nilai kembar di kurva progres adalah duplikat, bukan jeda.
- Audio tidak dibedah di sesi ini (bunyi tidak diukur → tidak ada klaim SFX).

## Kronologi (frame @30 fps, bukti = `pabrik/ukur/kata_masuk.py` kecuali disebut lain)
| Frame | Observasi | Gerak/cut | Label |
|---|---|---|---|
| f0→f1 | unit 1 muncul penuh dalam 1 frame, aksen warna | cut-in | measured |
| f1→f8 | unit 1 naik 0,149 H dengan perlambatan; progres 0, .47, .47(dup), .66, .80, .89, .96, 1 | gerak | measured |
| f9→f10 | unit 2 muncul penuh, tergeser bawah-kanan, kabur (ketajaman 0,42 × diam) | cut-in | measured |
| f10→f17 | unit 2 naik 0,158 H, kiri ≥0,187 W; progres 0, .35, .63, .79, .88, .88(dup), .95, 1 | gerak | measured |
| f17→f18 | warna unit 2 berganti dari aksen ke warna dasar dalam 1 frame | cut | measured |
| f23→f24 | seluruh kalimat berpindah dan membesar dalam 1 frame (reframe) | cut | measured (selisih frame 17,1–19,9 vs median <5) |
| f24–f29 | sisipan gambar masuk di sela kata, lalu unit 3 | — | tidak dibedah (gambar = kulit) |
| f42→f44 | lebar kalimat 0,977 → 0,818 → 0,697 W dalam 2 frame | tarik mundur sangat cepat (2 frame, tanpa sampel cukup untuk kurva) | measured (lebar), kurva tidak terukur |
| f46→f60 | lebar 0,645 → 0,523 W melambat; tercampur unit baru yang muncul | mundur lanjutan | estimated (lebar bbox tercampur elemen baru) |
| f44→f47 | unit 4 masuk dengan geser ke kiri 0,027 W | gerak | measured, lemah |

## Uji atomik
WordBeat lama = 4 mekanik terpisah. Masing-masing berfungsi sendiri bila yang lain dibuang:
1. `tipografi-unit-masuk-meluncur`: potong-muncul + luncur pendek melambat + blur awal. **Pilot.** Kemunculan berulang dengan kulit berbeda: unit 1 (hijau), unit 2 (biru), unit 4 (kuning, sesudah mundur).
2. `tipografi-tandai-unit-terbaru`: unit terbaru berwarna aksen ±8 frame lalu potong ke warna dasar. Warna = slot; mekanik = durasi tanda + cut. Belum disintesis (satu kemunculan terukur, f10→f18).
3. `kamera-potong-ikut-unit`: reframe 1 frame yang menggeser + membesarkan kalimat supaya unit terbaru tetap di tengah. Cut, **tanpa kurva**. Belum disintesis.
4. `kamera-tarik-mundur-grup`: grup mengecil 0,977 → 0,52 W; bagian cepat 2 frame tidak cukup sampel untuk kurva, ekor tercampur unit baru → kurva `estimated`, status maksimal teruji-sebagian. Belum disintesis.

Resep: `resep/resep-kalimat-dibangun-lalu-mundur.json` (hanya id).

## Jangan dicuri
Palet (k-means Lab 0–2,2 dtk): latar #FAFAFA, tinta #302C2A, aksen #2C5C39 #E84E4A #506DF1 #F3CD69 #ED827D #834538, kulit foto #E4CCBC. Kolase foto di sela kata, teks kalimat referensi, urutan warna aksen per kata.

## Yang tidak terukur dari bahan ini
- Besar blur dalam px (hanya rasio ketajaman) → `blur_awal` estimated.
- Kurva tarik mundur (2 frame + ekor tercampur).
- Sinkron bunyi (audio tidak dibedah).
