# TASK-R4-audit · audit semua frame (tanpa sampling) sebelum render final versi A

TUJUAN
Setiap detik `out/kandidat-A-r4.mp4` (gambar + mix A) diperiksa oleh DUA pemeriksa buta yang berbeda model — Codex (ChatGPT) dan Claude Sonnet — per potongan ≤ 10 dtk, lalu hasilnya digabung mekanis ke `VERDICT.md` per potongan dan `qc/VERDICT.md`. Kamu koordinator: kamu TIDAK menilai frame sendiri dan tidak memutus beda pendapat (itu Sutradara).

Proyek `P = ~/work/skill-development/projects/skill-development-journey-20261116`. Skrip: `~/work/skill-development/claude/motion-graphic/scripts/juri/frame_audit.py` (baca docstring-nya utuh), template prompt pemeriksa `~/work/skill-development/claude/motion-graphic/templates/roles/pemeriksa-frame.md`.

FILE BOLEH
`qc/frames/` (hapus isi lama dulu), `qc/audit_in/` (stems, cuts.json, words.json — boleh dibuat ulang), `qc/frame_audit/` (keluaran frame_audit.py + VERDICT_*), `qc/VERDICT.md`, `qc/audit_r4/` (skrip runner + log milikmu), `handoff/REPORT-R4-audit.md`.
FILE JANGAN: `lego/`, `remotion/`, `audio/` (kecuali dibaca), `edit/`, `out/`, `DECISIONS.md`, skrip bersama di `claude/motion-graphic/scripts/*`.

LANGKAH
1. Frame: `ffmpeg -i out/kandidat-A-r4.mp4 -vf scale=960:540 qc/frames/%05d.png` (atau format yang diharapkan frame_audit.py — cek docstring/kode). Jumlah frame harus 2512.
2. Masukan audit: `qc/audit_in/stems/` = `edit/suara.wav` sebagai stem_vo, `audio/stem_sfx_A.wav` sebagai stem_sfx, `audio/stem_musik_A.wav` sebagai stem_music (nama mengikuti yang dicari frame_audit.py); `--cues audio/cues.json` (pastikan formatnya terbaca — bila skrip mengharap kunci `cues`, buat salinan pembungkus di `qc/audit_in/cues.json`; cek INFO.md hasilnya memuat cue `sapa`/`coretan` yang baru, bukan cue lama); `--words edit/words.json`; `--cuts qc/audit_in/cuts.json` = frame potongan adegan disengaja (batas klip `dasar` di `lego/lego.json` + daftar `POTONG`/wipe di `lego/waktu.py`, dalam frame 29,97).
3. `python3 frame_audit.py qc/frames --fps 29.97 … --out qc/frame_audit` → `INDEX.md`. Potongan berstatus `dipakai ulang` (HASH sama) tidak diperiksa ulang; semua yang `perlu periksa` diperiksa.
4. Per potongan `perlu periksa`, jalankan DUA pemeriksa paralel (maks 3 potongan bersamaan per model), keduanya buta (tanpa konteks pembuatan, tanpa membaca kode/laporan):
   - Codex: `codex exec --sandbox danger-full-access -C <folder potongan> "<prompt>"` (prompt = template pemeriksa-frame.md diisi + CATATAN DISENGAJA di bawah; minta membuka semua `s*.jpg` dan `INFO.md` di folder itu). Simpan jawaban ke `VERDICT_gpt.md`.
   - Sonnet: `CLAUDE_CONFIG_DIR=~/.claude-2 claude -p --model sonnet --allowedTools Read,Glob "<prompt yang sama, dengan path absolut folder potongan>" < /dev/null`. Simpan ke `VERDICT_sonnet.md`. Bila gagal 2× (limit/akun), coba `CLAUDE_CONFIG_DIR=~/.claude` (akun lain) dan catat.
   - Sertakan `VERDICT.prev.md` bila ada, dengan kalimat: "temuan di VERDICT.prev.md yang sudah diputus Sutradara jangan diangkat lagi kecuali masih terlihat".
5. Gabung per potongan ke `VERDICT.md` (format yang dibaca `render.sh final`: baris terakhir `PUTUSAN: LULUS|GAGAL`, sertakan `HASH:` dari frame_audit): keduanya LULUS → LULUS; keduanya menemukan masalah di detik+jenis sama (±3 frame) → DISEPAKATI (GAGAL); hanya satu → PERLU PUTUS (GAGAL sementara). Temuan tanpa nomor frame dibuang. `qc/VERDICT.md` = ringkasan semua potongan + tingkat kesepakatan per detik.
6. `handoff/REPORT-R4-audit.md`: tabel potongan × (Codex, Sonnet, disepakati, perlu putus, PUTUSAN), lalu daftar SEMUA temuan disepakati dan perlu-putus dengan `dtk | frame | jenis | terlihat | usul | path lembar s<detik>.jpg`.

CATATAN DISENGAJA (berikan ke kedua pemeriksa, verbatim)
- Teks hilang dengan POTONGAN (tanpa pudar) adalah gaya yang disengaja; teks masuk per kata dalam 3 frame.
- Teks besar (FINALLY, BALIK MODAL, WORKFLOW-NYA, LINTAS AGENT, AI SLOP) berdiri di BELAKANG kepala dan sebagian tertutup kepala: disengaja.
- Bubble "Hi, aku Claude/ChatGPT/Gemini!" di atas tokoh pixel adalah teks yang diberikan pemilik video (bukan ucapan): disengaja; nama tokoh tidak muncul lagi sebagai teks terpisah.
- Komentar IG "@…", "masih AI slop", "Lumayan nih", kartu "Claude Max"/"ChatGPT Pro" dan angka berhitung 1×→20×/5×: disengaja.
- Shot meja 3D (Claude bata oranye) dan postingan IG adalah adegan sisipan yang disengaja; tumpukan emoji/panah merah/bingkai neon di 15–22 dtk = parodi "AI slop", disengaja.
- Panah goresan putih (B11 ±58,6) dan tulisan tangan biru/kuning (81–83 dtk) disengaja.
- Teks narasi bisa tertunda ≤ 0,25 dtk dari kata saat transisi lingkaran/wipe sedang menutup frame: disengaja.

LULUS BILA
2512 frame diaudit, setiap potongan punya VERDICT_gpt.md + VERDICT_sonnet.md (atau catatan jalur mati + cadangan), VERDICT.md gabungan per potongan dan `qc/VERDICT.md` ada, REPORT ditulis.

JANGAN
menilai atau memutus sendiri, memperbaiki visual/audio, render final, commit/push git.

Laporan balik ke Sutradara ≤ 20 baris: tabel ringkas + jumlah temuan disepakati/perlu putus + path REPORT.
