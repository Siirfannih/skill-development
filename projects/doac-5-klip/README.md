# DOAC 5 klip · sample edit 9:16 (7 Nov 2026)

Kerja dan aset: PC `~/work/clips/2026-11-doac5/` (tidak di repo: video sumber pihak ketiga). Hasil: Drive `Claude edit/DOAC 5 klip - 2026-11-07`.
Brief asal: `BRIEF_clip60.md` (5 kandidat: Sahar Yousef, Mark Cuban, Dana White, Adam Neumann, Rick Rubin). Irfan 7 Nov: edit dari awal, 60–80 dtk per klip, aturan skill terbaru.

## Keputusan
- Format B, kategori `fokus` untuk kelima klip (pace_read: 4,6–9,2 cut/mnt, 3,4–4,5 kata/dtk).
- Segmen dipilih ulang oleh 5 subagen dari komentar teratas + heatmap + judul; durasi akhir 64,6–68,3 dtk (termasuk kartu kredit 1,8 dtk).
- Gaya dari referensi 01 (Memory Secrets): caption putih 1 baris di dada, kata penekanan Anton berlapis, panel layar penuh satu aksen + satu ikon, kartu putih ber-outline. Satu aksen per klip: merah, hijau, oranye, kuning, coral.
- Panel layar penuh dibatasi ±6–7 per klip agar pembicara tetap pemilik panggung; frame 0 selalu wajah pembicara.
- Musik Mixkit lulus music_fit: Lo-Fi 01 (c1, c3), Roses (c2), New York (c4, c5), level −25 LUFS.
- Loudness: gain linear dibatasi TP −1 dBTP; c2/c3/c5 jadi −15,4…−15,9 LUFS (penyimpangan tercatat, usulan di PENDING).
- c3: kata kasar dibisukan + bintang di caption.

## Pipeline (ulang)
`fetch.py` → `cut.py` (faster-whisper + snap RMS) → `reframe.py` → `build_data.py` (beats → data) → stills.mjs (preview) → `mix.py` → `render_all.sh` → `qc.py` (gerbang).
