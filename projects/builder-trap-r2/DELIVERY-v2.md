# Delivery · Builder trap r2 v2 (14 Nov 2026)

File: `out/builder-trap-r2_v2.mp4` (PC) · Drive: `Claude edit/builder-trap-r2/builder-trap-r2_v2.mp4` · 1920×1080, 30 fps, 94,97 dtk, H.264 + AAC 256k. v1 tidak ditimpa.

Alasan versi: koreksi Irfan 13 Nov (audio berisik + SFX salah pilih) dan evaluasi visual mandiri (Irfan sengaja tidak menyebut bagian visual yang salah). Rincian: `DECISIONS.md` R-017/R-018, `handoff/REVIEW-v1-self.md`.

## Audio
| Cek | v1 | v2 | Bukti |
|---|---|---|---|
| Jumlah SFX | 324 (3,41/dtk), 220 klik per kata | 48 (0,51/dtk), 0 per kata | `audio/cues_v2.json`, `sfx_density.py --ref-density 0.65` PASS (v1 FAIL) |
| Sumber SFX | 0 file SFXIrfan, 228 dari set v17 proyek lain, tidak didengar | SFXIrfan dulu (nama = fungsi), tiap cue berlabel `dengar` (earshot) | `audio/build_cues_v2.py` |
| Stem suara di jeda | −31,7 dBFS (13 dB di bawah ucapan), 10/11 jeda bertransien | −64,3 dBFS (46 dB di bawah), 0 transien | `pause_clean.py` PASS (v1 FAIL) |
| Kejernihan suara asli | — | udara > 9 kHz 0,85, ΔLRA 0 | `voice_fidelity.py` PASS |
| SFX terdengar di HP | 241/324 | 35/48 (sisa: 2 boom sub-bass judul/"sadar." + klik kecil di bawah ucapan, sengaja tidak dikeraskan) | `audio_phone.py` |
| Suara vs musik (HP) | — | median 21,2 dB, 8 jendela < 8 dB | `audio_phone.py` |
| Loudness | −14,8 LUFS | −15,0 LUFS, puncak −1,0 dBFS | ebur128 pada MP4 |
Perubahan mix: tanpa auto-gain bed ±8 dB; duck musik −6 dB saat bicara (sesudah normalisasi); babak 4 −2 dB; semua cue diratakan di puncak bunyi (v1: pin 0,41 dtk terlambat).

## Visual (REVIEW-v1-self F-v1-01…07, Editor A r3a + Editor B r3b/r3c)
Babak 3 gelap netral tanpa biru (R-005) · narasi ≥ 56 px, kunci ≥ 96 px · crop wajah sinematik bergantian (mata / mulut+tangan / sisi) · punch-in ke prompt, Create repository, Releases, "No threads yet" · teks menempel objek · kerapian (sisa mosaik, kata basi triad, teks menumpuk kartu B20). Bukti: `qc/JURI.md` (LULUS), `qc/sanding.jpg`, `qc/v2_final_sheet.jpg`.

## Penyimpangan
1. Material kiblat 55 (alas hijau, gabus oranye, twist merah) tidak dipakai: palet brief "putih utama + aksen" (R-009) dan larangan biru (R-005) menang.
2. Boom judul dan "sadar." sub-bass: terasa di headphone/speaker, samar di speaker HP.
3. Render penuh gagal 2× ("Page crashed" = disk penuh, ENOSPC); ruang dibebaskan dari cache `uv`/npm/sisa render; render ke-3 sukses (sisa disk minimum 438 MB). `render.sh` kini memperingatkan bila disk < 6 GB.
