# BRIEF — jensen-pain-suffering

## Brief Irfan (apa adanya)
- Prompt + guideline: lihat `../RESEP.md` (prompt disalin) dan `../GUIDELINE-IRFAN.md` (cut sheet 10 beat + b-roll).
- Jawaban 15 Nov: 16:9 1920×1080 · kartu 55 "campur" (brand Behindwork + perlakuan babak kartu 55) · tanpa logo/identitas Behindwork dulu · musik & SFX internet boleh.

## Keputusan terkunci
- Output 1920×1080, 30 fps. Durasi ±47,6 dtk = suara terkunci 46,1 dtk + ekor 1,5 dtk.
- Suara: `audio/suara.wav` (terkunci, jangan diubah). Video wajah tersinkron: `audio/wajah.mp4` (1280×720 asli Stanford, sama panjang). Kata per kata: `audio/words.json` (waktu baru).
- Font: Poppins (SemiBold 600 kata sambung, Bold 700 kata kunci). Harus termuat dari file (`claude/motion-graphic/fonts/`), bukan fallback.
- Palet: hitam hangat `#0E0D0C`, putih `#F4F1EA`, aksen amber `#E8A33D` (hanya kata kunci). Penekanan = warna amber, ukuran sama dengan kata sambung (kartu 55).
- Tanpa gradien radial/blob. Vignette di b-roll boleh (kartu 55).
- Teks layar hanya dari ucapan (Inggris, persis `audio/words.json`; "it's greatness" dibaca "Greatness" — kata "it's" @33,67 adalah salah dengar, jangan ditampilkan).
- Tidak ada logo/wordmark Behindwork. Tidak ada subtitle pita bawah.
- Safe frame 5 % (x 96–1824, y 54–1026).

## Aset (semua lokal di proyek)
| File | Isi | Lisensi |
|---|---|---|
| `audio/wajah.mp4` | Jensen di Stanford (PodiumVC YouTube vOvQSqY7Jgc), 720p | YouTube, Irfan urus |
| `broll/pexels/7712312-hd_1920_1080_30fps.mp4` | pasangan wisuda berpose (landscape) | Pexels |
| `broll/pexels/7945851-hd_1080_1920_25fps.mp4` | wisudawan bertepuk tangan (vertikal) | Pexels |
| `broll/pexels/6290471-uhd_2560_1440_30fps.mp4` | pria memegang kepala di meja laptop | Pexels |
| `broll/pexels/5281595-uhd_2560_1440_30fps.mp4` | mengetik di gelap | Pexels |
| `broll/pexels/forge_5846379.mp4` | mesin tempa menekan batang logam membara (landscape) | Pexels |
| `broll/pexels/forge_35117150.mp4` | percikan api tungku (60 fps) | Pexels |
| `broll/pexels/6754830-uhd_2560_1440_25fps.mp4` | close-up PCB | Pexels |
| `broll/pexels/20563164-uhd_2560_1440_30fps.mp4` | siluet pria di ruang gelap depan laptop | Pexels |
| `broll/yt/DpQQi2scsHo.mp4` | 60 Minutes: Jensen / NVIDIA (1080p, 13 mnt), transkrip `broll/yt/60m_transkrip.txt` | YouTube, Irfan urus |
| `broll/yt/yU3GUHDf0mk.mp4` | Jensen "First Six Months of NVIDIA" (400×226, arsip lama) | YouTube |
| `broll/yt/UM5NP6MapmM.mp4` | Fortune short: Denny's (vertikal 608×1080, ada caption tertanam) | YouTube |

## Hard Gate relevan
Lantai A–F (`claude/motion-graphic/LANTAI.md`). Teks hanya dari ucapan. Yang bicara tampil di frame kecuali b-roll layar penuh. Tidak ada placeholder. Render lewat `scripts/juri/render.sh`.
