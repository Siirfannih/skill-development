# juri lolos narasi kecil wajah berulang
Origin: [A] agent inference
Project: projects/builder-trap-r2
What happened: carried over from the retired `PENDING.md` (line 20, kept verbatim in `archive/riwayat/PENDING.md`). Text, in the original Indonesian:
> Juri meluluskan builder-trap-r2 v1 (12 Nov) padahal narasi 34–58 px dan 11 sisipan wajah ber-crop sama (ditemukan di evaluasi mandiri 13 Nov). Tambah ke `scripts/juri/teks_cek.py`: tinggi huruf narasi < 56 px @1080 = FAIL; dan cek sisipan wajah berurutan dengan crop sama (dari `PLAN.json`/props) = FAIL?
Evidence: as cited in the text above.
Suggested lesson: Judge passed narration at 34-58 px and 11 identical face crops: add a narration height check (< 56 px at 1080 = FAIL) and a consecutive same-crop face check to `teks_cek.py`?
