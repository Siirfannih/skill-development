# TASK-R7-sfx-r2 · sinkron ulang ke visual final yang dikoreksi (1 frame)
Baca `handoff/R7-BERSAMA.md` (awal sesi) dan laporanmu `handoff/REPORT-R7-sfx.md`.
## TEMUAN
Versi `qc/r7/visual_r7_fin.mp4` yang kamu pakai berisi 2511 frame: perakit finishing Sutradara membuang frame 2171 (frame terakhir blok transisi 2148–2171), sehingga semua frame sesudahnya maju 1 frame (33,37 ms) dan gambar mendahului suara. File itu SUDAH diganti dengan versi benar: **2512 frame, 83,817067 dtk**; frame 0–2171 sama, frame ≥ 2172 kembali ke posisi aslinya (+1 dibanding versi yang kamu ukur). Bukti: PROFESIONAL kamu catat f2356, posisi benar f2357.
## TUGAS
Ukur ulang semua cue yang terikat ke frame ≥ 2172 terhadap visual baru (atau geser +1 frame bila objeknya terbukti sama), cek cue di 2148–2171 dan 76,41 tetap tepat, bangun ulang `stem_sfx_r7.wav`, `mix_final_bgmbaru.wav`, `mix_final_bgmlama.wav`, mux ulang `cek_final_*.mp4` dari visual baru (harus 2512 paket video).
## FILE BOLEH / JANGAN
Sama dengan TASK-R7-sfx.
## LULUS BILA
Gerbang yang sama PASS; tabel cue ≥ 2172 sebelum/sesudah; mux 2512 frame; bagian "Ronde 2" di `handoff/REPORT-R7-sfx.md`.
