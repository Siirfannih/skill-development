# Evaluasi · gerbang audio first-pass · 16 Nov 2026

## Akar masalah

1. Panduan audio ada, tetapi render final tidak mengeksekusi gerbangnya.
2. Validator cut memakai timeline hasil/remap, bukan kata take sumber dan energi batas.
3. Validator SFX mengukur kepadatan, bukan kepatuhan palet terlarang.
4. Perbaikan session tertahan di branch proyek; instalasi Mac/PC tidak konsisten terhadap `main`.

## Perubahan

- Cut source-safe: overlap kata isi, guard, retensi durasi, urutan kata, endpoint energi rendah.
- Recut audio/video berbatas frame sama dan menolak drift.
- `audio_order.py` menjadikan words aktual + source words + cut map sebagai bukti terkunci dan diuji ulang.
- SFX denylist diterapkan pada nama file dan label dengar.
- `render.sh final` memanggil gerbang audio sebelum gerbang visual.

## Bukti uji

- `python3 -m unittest scripts/tests/test_audio_gates.py -v`: **10/10 PASS**. Kasusnya mencakup overlap kata, gap aman, filler non-`tuh`, format Whisper `segments[].words[]` pada gate cut dan jeda, palet SFX terlarang, klik UI yang sah, bukti lock suara, frame-exact recut, dan render final yang fail-closed.
- `quick_validate.py claude/motion-graphic`: **PASS** (`Skill is valid!`).
- `bash -n render.sh`, `py_compile`, tiga `json.tool`, dan `git diff --check`: **PASS**.
- Artefak nyata `builder-trap-r2_v5-remotion-r3.mp4` + `edit/v5/cues.json`: **FAIL yang benar**, karena cue 89,80 dtk memakai `/home/irfan/sfx/SFXIrfan/Lasertransision.mp3`.
- Artefak nyata `edit/v5/map.json` terhadap transkrip take sumber: **FAIL yang benar**, termasuk overlap `Apa` 166,7 ms dan `yang.` 260 ms. Ini membuktikan klaim lama “semua kata retained” tidak boleh dipakai sebagai pengganti validasi sumber.
- Uji `render.sh final` tanpa variabel `PYTHON` di Mac memilih `/usr/bin/python3` yang memiliki numpy/soundfile, lalu menghentikan proyek lama sebelum render karena bukti `ORDER.json` hilang/basi. Tidak ada MP4 dibuat.
- Audit distribusi: Codex Mac memakai salinan beku 27 Okt (15 file) sementara repo punya 38 file. `sync.sh` dan `doctor.sh` kini mengharuskan symlink Claude+Codex ke checkout `main` yang sama serta memeriksa runtime audio.

Status: **PASS untuk perubahan gerbang; kandidat video lama sengaja tidak diluluskan.**
