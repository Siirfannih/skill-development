# seedance judder plate ai
Origin: [A] agent inference
Project: (none)
What happened: carried over from the retired `PENDING.md` (line 17, kept verbatim in `archive/riwayat/PENDING.md`). Text, in the original Indonesian:
> Output Seedance (Dreamina) 11 Nov: 24 fps bertimestamp tidak rata + frame duplikat (vA 20/121) → judder 0,17 dtk di render 30 fps. Cara yang terbukti: buang duplikat dengan timestamp asli, `minterpolate` mci ke 30 fps, `tmix` 3-frame. Masukkan ke `build.md` sebagai langkah wajib plate AI?
Evidence: as cited in the text above.
Suggested lesson: Add the proven fix (drop duplicates by real timestamp, minterpolate to 30 fps, 3-frame tmix) to `references/build.md` as a step for AI plates?
