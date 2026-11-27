# Delivery Gate (wajib sebelum video ditunjukkan ke Irfan)

Laporan ini dikirim **bersama** video, tiap baris dengan bukti konkret (angka keluaran skrip, timestamp, nama still). Keluaran skrip adalah informasi: lihat sendiri, perbaiki yang memang masalah, tulis alasan untuk sisanya; keputusan kirim ada di user. Gerbang yang tidak bisa dijalankan di lingkungan ini dilaporkan **NOT RUN** beserta alasannya. Ringkasan loop kritik atau laporan workflow lain tidak menggantikan laporan ini.

Pola ini diadopsi dari `external/anti-slop` (Delivery Gate + tiga tingkat aturan), disesuaikan untuk video.

## 0. Preview dulu, render penuh terakhir

Render penuh adalah langkah paling mahal, jadi ia datang paling akhir. Urutan:
1. **Still per beat**: satu still di frame terpenting tiap beat (Remotion `npx remotion still <Comp> out/beat_NN.png --frame=N`; AE: snapshot setara). Blok 2 dan 3 dinilai dari still ini.
2. **Audio saja**: `npx remotion render <Comp> out/mix.wav --codec=wav` (atau mix dari skrip audio). Blok 1 bagian audio dinilai dari file ini.
3. **Rentang bermasalah saja**: `--frames=120-240` untuk mengecek gerak di beat yang diragukan.
4. **Render penuh** hanya setelah 1–3 lulus, lalu jalankan skrip blok 1 sekali lagi pada MP4 final.

Yang terbukti:
- **Draft cepat** untuk QC gerak: `scripts/juri/render.sh <proyek> draft <Comp>` (skala 0,5); still untuk QC layout lewat `render.sh … still`. Render penuh adalah yang termahal, jadi hanya lewat `render.sh … final` setelah juri lulus (`cookbook/README.md` §Juri).
- **QC tiga lapis berurutan**, lapis berikut hanya bila lapis sebelumnya lolos: (1) **visual saja** tanpa audio: urutan baca, waktu baca, terpotong, animasi, transisi, ilustrasi, tabrakan objek, zona aman; (2) **visual + SFX** tanpa musik: tiap SFX sesuai jenis gerak dan tepat waktu (±2 f), tidak ada event tanpa bunyi, tidak ada bunyi tanpa event; (3) **visual + SFX + musik**: bed kontinu dan sesuai emosi, suara jelas, level, tidak ada lubang.

## Blok 1: Gerbang keras (semua harus "tidak")

Di blok ini cek mekanis audio dijalankan lebih dulu. Penilaian visual (gaya, posisi, estetika) sudah lulus sebelum audio disusun (Lantai F26) dan tidak diulang di sini.

| Cek | Bukti | Lantai |
|---|---|---|
| Bila proyek meminta tiap klip berbeda: track musik yang sama dipakai di beberapa klip/babak dalam satu batch? | `python3 scripts/gate/music_batch.py musik_klipA.mp3 musik_klipB.mp3 …` | Lantai E25, S-A9 |
| Ada cue SFX/musik tanpa `peran` + `alasan`, atau spam (whoosh > 1/dtk, file sama < 1 dtk)? | `scripts/gate/sfx_density.py` | Lantai E24, §14.3 |
| Objek/visual penting tanpa SFX, peran memakai > 1 file, bunyi < 100 ms bertumpuk, bunyi per kata KT yang tidak berlabel `pilar: tick`, > 5 cue dalam 2 dtk, cue tanpa `dengar`, atau palet terlarang? | `python3 scripts/gate/sfx_density.py render.mp4 cues.json --objects objects.json` | Lantai E24 |
| Suara masih membawa kata sampah/diam, atau cut menyentuh kata isi >20 ms, guard <50 ms, durasi kata <85 %, urutan ASR aktual berubah? Musik dipompa > 1,5 dB saat bicara? | `audio_order.py check` (mengulang `cut_check.py` dengan source words + cut map) · `audio/audio_phone.py --list` | PASS / jendela < 8 dB ≤ 5 |
| Referensi atau SFX belum didengar (alat: `~/.config/skill-development/alat.md`)? Tanpa alat dengar, analisis audio belum dilakukan: laporan menyebutnya, tidak menyimpulkan bunyinya | log dengar di folder proyek | `bedah-referensi.md` |
| Suara sumber klip yang bersih diproses (udara > 9 kHz < 70 % sumber, LRA turun > 2 LU)? | `python3 scripts/gate/voice_fidelity.py sumber.mp4 render.mp4` | Lantai E25a, §14.6 |
| Kategori suasana tidak tertulis, musik tanpa laporan `music_fit.py` berstatus PAKAI (dengan earshot bila ada), atau kumpulan kandidat di bawah bawaan (≥ 20 dari ≥ 2 sumber; peringatan)? Track yang sama di semua klip/babak dicek hanya bila proyek meminta tiap klip berbeda. | `python3 scripts/audio/music_fit.py --category <k> --voice sumber.mp4 kandidat/*` | Lantai E25, Lantai E24 |
| Ada teks > 2 baris, kata yatim, teks terpotong tepi, ucapan tanpa teks di beat bermode TEKS, baris subtitle di pita bawah, atau kata yang tampil dua kali? | `python3 scripts/juri/teks_cek.py qc/stills/` + keputusan per still yang ditandai (`caption_lines.py` hanya menghitung baris) | Lantai A1, LANTAI A1–A4 |
| Ada teks/angka layar yang tidak diucapkan dan bukan isi UI/produk yang ditunjukkan? | transkrip vs daftar teks | Lantai A5 |
| Ada UI karangan atau placeholder storyboard di render? | still | Lantai D20, Lantai D19c, Lantai D22 |
| Ada adegan terkunci yang berubah? | `scripts/baseline_lock.py check` | Lantai F27 |
| Suara asli diturunkan, ditekan (crest −2 dB), atau < −17 LUFS? True peak > −1 dBTP (diukur di MP4 setelah mux AAC)? | `python3 scripts/gate/voice_level.py suara_sumber.wav suara_hasil.wav` · ebur128 | §14.10, Lantai E23 |
| `audio_qa.py --module5`, `audio_phone.py` (tiap SFX terdengar di HP 20/50/100 %), `visual_coverage.py` ada yang gagal? | keluaran skrip | Lantai E25a, Lantai E24 |
| Generate berbayar sebelum gerbangnya terbuka, atau biaya tidak disebut? | log sesi | Lantai F28c |

## Blok 2: Teknik beralasan (teknik boleh, alasan wajib ditulis di tabel beat)

FAIL bila teknik ini ada tanpa alasan satu baris di tabel beat:
- kotak/scrim di belakang teks (alasan = kontras terukur < 4,5 : 1) — Lantai A9
- glow, gradien, negative, RGB split, flash — Lantai C18b, F28b
- musik dengan build/drop/tension — alasan dari nada babak (`pacing-map.md`)
- grafik di atas footage: pilih menyatu atau dunia sendiri — `decision-guide.md` §5

## Blok 3: Konsistensi (semua harus "ya")

- Satu fokus per momen (squint test 10 px pada still) — Lantai C14
- Palet lulus `scripts/palette_check.py` — Lantai C18a
- Transisi tanpa crossfade, mekaniknya dari logika ruang — Lantai B13
- Satu baris satu ukuran; serif tidak sejajar bold — Lantai A6
- Pindai `slop-catalog.md`: tiap tanda yang muncul punya alasan tertulis atau sudah dibuang

## 4. Devil's advocate audio (wajib, ditulis di laporan sebelum render penuh)

Jawab dengan bukti, bukan klaim. Jawaban yang lemah menunjukkan apa yang diperbaiki sebelum render penuh.
1. Apakah referensi **didengar** (alat di `~/.config/skill-development/alat.md`; tanpa alat, katakan analisis audio belum dilakukan)? Berapa event/dtk dan kosakata bunyinya, dan berapa milik kita?
2. Apakah setiap SFX menandai momen cerita atau gerak yang terlihat, dari kosakata kiblat, dan sudah didengar? Adakah lapisan klik yang terdengar terus? (Lantai E24)
3. Kenapa track musik ini, bukan kandidat lain? Apakah track yang sama dipakai di klip/babak lain?
4. Bila reviewer menandai "sepi", "datar", atau "tidak terdengar": yang diperbaiki **penyebabnya** (jumlah cue, track) atau hanya level?

## Format laporan

```
DELIVERY GATE · <proyek> v<N>
B1 sfx_density PASS: 0,52 SFX/dtk (kiblat 0,65), 0 bunyi per kata, rentetan maks 4/2 dtk · pause_clean PASS: jeda −64,7 dBFS
B1 DENGAR PASS: earshot timeline ref (6,9 event/dtk) + describe 23 file, 0 label salah
B1 caption_lines PASS: 0 frame > 2 baris, 0 tepi (304 frame @4 fps)
B2 kotak beat 7 PASS: kontras 3,1 : 1 tanpa kotak (latar meja putih)
...
Penyimpangan dari storyboard: <daftar + alasan>
```
