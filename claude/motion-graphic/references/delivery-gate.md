# Delivery Gate (wajib sebelum video ditunjukkan ke Irfan)

Laporan PASS/FAIL ini dikirim **bersama** video. Setiap PASS membawa bukti konkret (angka keluaran skrip, timestamp, nama still). PASS tanpa bukti = FAIL. Ada satu FAIL = jangan kirim; perbaiki, jalankan ulang. Ringkasan loop kritik atau laporan workflow lain tidak menggantikan laporan ini.

Pola ini diadopsi dari `external/anti-slop` (Delivery Gate + tiga tingkat aturan), disesuaikan untuk video (Irfan 6 Nov).

## 0. Preview dulu, render penuh terakhir

Render penuh adalah langkah paling mahal, jadi ia datang paling akhir (Irfan 6 Nov). Urutan:
1. **Still per beat**: satu still di frame terpenting tiap beat (Remotion `npx remotion still <Comp> out/beat_NN.png --frame=N`; HyperFrames/AE: snapshot setara). Blok 2 dan 3 dinilai dari still ini.
2. **Audio saja**: `npx remotion render <Comp> out/mix.wav --codec=wav` (atau mix dari skrip audio). Blok 1 bagian audio dinilai dari file ini.
3. **Rentang bermasalah saja**: `--frames=120-240` untuk mengecek gerak di beat yang diragukan.
4. **Render penuh** hanya setelah 1–3 lulus, lalu jalankan skrip blok 1 sekali lagi pada MP4 final.

Yang terbukti di Behindwork (Irfan 9 Nov):
- **Draft cepat** untuk QC gerak: `scripts/juri/render.sh <proyek> draft <Comp>` (skala 0,5); still untuk QC layout lewat `render.sh … still`. Render penuh 1080p terukur ±8–18 menit per video ±97 dtk di PC server (log sesi 9–11 Nov), jadi hanya lewat `render.sh … final` setelah juri lulus (`pustaka/README.md` §Juri).
- **QC tiga lapis berurutan**, lapis berikut hanya bila lapis sebelumnya lolos: (1) **visual saja** tanpa audio: urutan baca, waktu baca, terpotong, animasi, transisi, ilustrasi, tabrakan objek, zona aman; (2) **visual + SFX** tanpa musik: tiap SFX sesuai jenis gerak dan tepat waktu (±2 f), tidak ada event tanpa bunyi, tidak ada bunyi tanpa event; (3) **visual + SFX + musik**: bed kontinu dan sesuai emosi, suara jelas, level, tidak ada lubang.

## Blok 1: Hard Gate (semua harus "tidak")

Audio dicek lebih dulu, karena kesalahan terbanyak ada di audio (Irfan 8 Nov, V5: tiga klip gagal di audio).

| Cek | Bukti | Aturan |
|---|---|---|
| Track musik yang sama dipakai di beberapa klip/babak dalam satu batch? | `python3 scripts/gate/music_batch.py musik_klipA.mp3 musik_klipB.mp3 …` | 25, S-A9 |
| Ada cue SFX/musik tanpa `peran` + `alasan`, atau spam (whoosh > 1/dtk, file sama < 1 dtk)? | `scripts/gate/sfx_density.py` | 43, §14.3 |
| SFX berlebih atau salah pilih (kepadatan > 1,5× kiblat, bunyi per kata, > 5 cue dalam 2 dtk, cue tanpa `dengar`)? Jeda bicara berisik? | `python3 scripts/gate/sfx_density.py render.mp4 cues.json` | 43 |
| Referensi atau SFX tidak didengar (tidak ada log `earshot timeline` ref + `earshot describe` tiap file)? | log earshot di folder proyek | gerbang DENGAR `three-segment-gate.md` |
| Suara sumber klip yang bersih diproses (udara > 9 kHz < 70 % sumber, LRA turun > 2 LU)? | `python3 scripts/gate/voice_fidelity.py sumber.mp4 render.mp4` | 38, §14.6 |
| Kategori suasana tidak tertulis, musik tanpa laporan `music_fit.py` berstatus PAKAI (earshot aktif), kandidat < 8 atau dari < 2 sumber, atau track yang sama dipakai di semua klip/babak? | `python3 scripts/audio/music_fit.py --category <k> --voice sumber.mp4 kandidat/*` | 25, 34, 45 |
| Ada teks > 2 baris, kata yatim, teks terpotong tepi, ucapan tanpa teks, baris subtitle di pita bawah, atau kata yang tampil dua kali? | `python3 scripts/juri/teks_cek.py qc/stills/` + keputusan per still yang ditandai (`caption_lines.py` hanya menghitung baris) | 44, LANTAI A1–A4 |
| Ada teks/angka layar yang tidak diucapkan? | transkrip vs daftar teks | 2 |
| Ada UI karangan atau placeholder storyboard di render? | still | 4, 16, 19, 22 |
| Ada adegan terkunci yang berubah? | `scripts/baseline_lock.py check` | 14 |
| Integrated di luar −14,0…−14,5 LUFS atau true peak > −1 dBTP (diukur di MP4 setelah mux AAC, bukan hanya WAV)? | ebur128 | §14.10 |
| `audio_qa.py --module5`, `audio_phone.py` (tiap SFX terdengar di HP 20/50/100 %), `visual_coverage.py` ada yang gagal? | keluaran skrip | 30, 35, 37, 38 |
| Generate berbayar sebelum gerbangnya terbuka, atau biaya tidak disebut? | log sesi | 10 |

## Blok 2: Purpose-Gate (teknik boleh, alasan wajib ditulis di tabel beat)

FAIL bila teknik ini ada tanpa alasan satu baris di tabel beat:
- kotak/scrim di belakang teks (alasan = kontras terukur < 4,5 : 1) — aturan 6
- glow, gradien, negative, RGB split, flash — aturan 7, 24, 40
- musik dengan build/drop/tension — alasan dari nada babak (`pacing-map.md`)
- grafik di atas footage: pilih menyatu atau dunia sendiri — `decision-guide.md` §5

## Blok 3: Quality Lock (semua harus "ya")

- Satu fokus per momen (squint test 10 px pada still) — 1
- Palet lulus `scripts/palette_check.py` — 41
- Transisi tanpa crossfade, mekaniknya dari logika ruang — 5, 42
- Satu baris satu ukuran; serif tidak sejajar bold — 39
- Pindai `slop-catalog.md`: tiap tanda yang muncul punya alasan tertulis atau sudah dibuang

## 4. Devil's advocate audio (wajib, ditulis di laporan sebelum render penuh)

Jawab dengan bukti, bukan klaim. Satu jawaban lemah = FAIL.
1. Apakah referensi **didengar** dengan earshot? Berapa event/dtk dan kosakata bunyinya, dan berapa milik kita?
2. Apakah setiap SFX menandai momen cerita atau gerak yang terlihat, dari kosakata kiblat, dan sudah didengar? Adakah lapisan klik yang terdengar terus? (aturan 43)
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
