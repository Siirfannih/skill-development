# TASK-R4-audio · fase 4 audio versi A (revisi putaran 4)

TUJUAN
SFX dan musik versi A disesuaikan dengan master gambar putaran 4 (`qc/master_gambar.mp4`), dikunci lewat `audio_order.py` di `audio/order-A`, dan menghasilkan `audio/mix_A.wav` + pratinjau `out/kandidat-A-r4.mp4` yang lulus gerbang audio. Versi B dan tanpa-musik TIDAK dibutuhkan (Irfan: "kita pakai versi A only").

Proyek `P = ~/work/skill-development/projects/skill-development-journey-20261116`. Skrip gerbang: `~/work/skill-development/claude/motion-graphic/scripts/gate/` (`audio_order.py`, `sfx_density.py`, `voice_level.py`, `pause_clean.py`), `scripts/audio/audio_phone.py` bila ada. Python: `~/work/mg-venv/bin/python`. Baca docstring tiap skrip untuk sintaks persis; lihat `audio/order-A/ORDER.json` untuk argumen lock yang dipakai sebelumnya (suara sudah TERKUNCI, jangan dikunci ulang).

KONTEKS
- Visual berubah (ledger `DECISIONS.md` D-401…D-409): KT nama "ChatGPT,/Claude,/Gemini," DIHAPUS diganti bubble sapaan tokoh (objek `bubble-sapa` ±8,58 / 9,44 / 9,81 dtk), panah goresan (objek `coretan`, B11 ±58,6 dan IG ±81,0–81,3), tulisan tangan (objek `tulisan-tangan`, senyap), keluar teks sekarang potongan (bukan pudar) — waktu objek lain bisa bergeser beberapa frame.
- `audio/sfx_build.py` sudah diberi peran baru oleh Sutradara: `sapa` = `../Kenyset/marimba-bloop-3-188151.mp3` (−8 dB), `coretan` = `../Kenyset/message-envoye-iphone-apple-391098.mp3` (−10 dB), `tulisan-tangan` senyap. Peta `role_of` + `PRI` sudah memuatnya. Jangan ubah peran/file lain.
- `audio/music_build.py` membuat A dan B; boleh dijalankan apa adanya (B dibiarkan), atau dibatasi ke A saja dengan perubahan minimal (argumen opsional).
- Suara = `edit/suara.wav` × 1,0. Tidak ada limiter/kompresor/declip pada suara, tidak ada limiter di bus master yang memuat suara (aturan Irfan 18 Nov, `references/audio.md` §14.6). Puncak mix ≤ −1,0 dBFS hanya lewat otomasi gain lokal stem SFX/musik (sudah di `automate()`).

FILE BOLEH
`audio/sfx_build.py` (hanya bila perlu menggeser waktu cue audit yang ber-angka tetap agar cocok dengan visual baru — catat alasannya), `audio/music_build.py` (opsi hanya-A), keluaran turunan di `audio/` (`cues.json`, `objects.json`, `stem_*`, `mix_A.wav`, `mix_report.json`, `order-A/ORDER.json`, `phone_A/`), `out/kandidat-A-r4.mp4`, `handoff/REPORT-R4-audio.md`.
FILE JANGAN: `edit/*`, `lego/*`, `remotion/*`, `qc/master_gambar.mp4`, `objects.json` di root proyek (sumber dari builder), `out/varian-*.mp4`, `DECISIONS.md`, skrip di `claude/motion-graphic/scripts/*`.

LANGKAH
1. `audio_order.py lock visual` (order-A) terhadap `qc/master_gambar.mp4` terbaru.
2. `python3 audio/sfx_build.py` (dari folder proyek; ia membaca `objects.json` root). Periksa cetakan: jumlah cue per peran, jarak minimum, maks per 2 dtk.
3. Periksa cue sheet terhadap visual baru: (a) tidak ada cue `kunci-slam` tersisa untuk nama yang sudah dihapus; (b) 3 cue `sapa` jatuh ≤ 2 f dari frame pop bubble; (c) cue `coretan` di awal goresan panah; (d) cue audit ber-angka tetap (34,731 · 50,384 · 53,558 · 72,139 · 28,929 · 30,554 · 21,55) masih jatuh di event visualnya pada master baru — ukur dari frame (perbedaan frame berurutan/`ffmpeg select`), geser bila meleset > 2 f dan catat.
4. `sfx_density.py qc/master_gambar.mp4 audio/cues.json --objects audio/objects.json` PASS, lalu `audio_order.py lock sfx … --objects audio/objects.json` (order-A).
5. `music_build.py` → `mix_A.wav`; laporan: LUFS mix, puncak dBFS, kejernihan suara (SNR jendela), selisih suara di mix vs `edit/suara.wav` (harus ≤ 1e-6 = ×1,0).
6. `audio_order.py lock musik` (order-A, `--peran --alasan --didengar` sama seperti sebelumnya, lihat ORDER.json) lalu `audio_order.py check` di order-A PASS.
7. Uji HP: `audio_phone.py` (bila ada) pada mix_A — 3 bubble sapa dan 2 coretan harus terdengar; laporkan angkanya.
8. Pratinjau: `ffmpeg -i qc/master_gambar.mp4 -i audio/mix_A.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 320k -ar 48000 -shortest out/kandidat-A-r4.mp4`; ffprobe: 2512 frame, durasi video vs audio selisih < 1 frame.

LULUS BILA
`sfx_density` PASS, `lock visual/sfx/musik` LULUS, `audio_order.py check` PASS di order-A, suara di mix = ×1,0, puncak mix ≤ −1,0 dBFS, tanpa limiter pada suara, pratinjau terbentuk.

JANGAN
render final, mengubah visual, mengunci ulang suara, mengubah palet/peran SFX lain, commit/push git.

LAPORAN
`handoff/REPORT-R4-audio.md`: angka tiap langkah (20 baris terakhir keluaran gerbang), cue yang digeser + alasan, path keluaran. Laporan balik ke Sutradara ≤ 20 baris.
