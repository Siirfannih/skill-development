# alat juri: render.sh final berhenti diam tanpa tema.ts, frame_audit.py relatif ke cwd, unggahan Drive > 10 MB
Origin: [A] agent inference
Project: projects/behindwork-launch
What happened: carried over from an uncommitted edit to the retired `PENDING.md` in the owner's checkout (26 Nov; not in `archive/riwayat/PENDING.md`). Text, in the original Indonesian:
> Alat juri (behindwork-launch, 26 Nov): (1) `render.sh final` berhenti diam (exit 2, tanpa pesan GAGAL) bila `remotion/src/*/bersama/tema.ts` tidak ada: `TEMA="$(ls -d … | head -1)"` di bawah `set -euo pipefail`; proyek lama dengan `src/bersama/` langsung kena. Usul: `|| true` + pesan "tata letak harus src/<…>/bersama". (2) `frame_audit.py` menulis `qc/frame_audit` relatif ke cwd; dijalankan dari `remotion/` ia membuat folder salah tanpa peringatan. (3) Drive MCP menolak unggahan > 10 MB; MP4 final diunggah lewat `rclone copyto gdrive:"Claude edit"/…` + cek md5. Perbaiki (1)–(2) di skrip dan tulis (3) di delivery?
Evidence: as cited in the text above (render.sh, frame_audit.py).
Suggested lesson: (1)-(2) are Mechanical script fixes (a clear error message; paths relative to the project, not cwd); (3) is a delivery note. Fix in a skill-change session; not a production rule.
