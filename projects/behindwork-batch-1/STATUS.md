# STATUS · behindwork-batch-1

Diperbarui 22 Nov 2026 (claude2).

## Posisi
- Storyboard v1 (zip Irfan) diaudit: `AUDIT.md`. Panel sumber v1 tidak ada, jadi dibangun ulang (D-01) dengan gaya baru Story Cinematic (D-02), 16:9 (D-04).
- **Ep01 Jensen Huang selesai sebagai acuan** (D-03): `storyboard/ep01/` (13 beat, 25 frame, `board.py` PASS). Review: https://claude.ai/artifact/8yXZrwpBF2d4RbfpzguHt9
- Menunggu: persetujuan Irfan atas ep01 sebelum ep02–10.

## Cara kerja (dipakai ulang untuk ep02–10)
1. Footage dari `riset/episode/<ep>/footage.md` → `/mnt/storage-projects/behindwork-batch-1/<ep>/footage/` (yt-dlp `--js-runtimes node --remote-components ejs:github`; video Stanford perlu `-f 137+140`).
2. Still → `storyboard/<ep>/plates/` (crop, warna selektif lewat matte RVM `~/work/persepsi/.venv`).
3. `storyboard/<ep>/gen.py` menulis `panels/*.html` + `beats.json` memakai `storyboard/tools/panel.py` dan `storyboard/tokens.css`.
4. `board.py storyboard/<ep>` sampai PASS, lihat lembar kontak, perbaiki.
5. `storyboard/tools/review.py <out> ep01 …` → publish Artifact (URL di atas, path file yang sama).
6. Sumber tiap plate di `storyboard/<ep>/SUMBER-ASET.md`.
