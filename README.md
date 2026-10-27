# Skill Development

Perpustakaan skill untuk semua model yang bekerja dengan Irfan. Satu repo, satu sumber kebenaran: skill tidak lagi terpecah di beberapa lokasi, dan setiap skill punya peran yang jelas sehingga hanya yang relevan yang dimuat.

**Mulai dari [INDEX.md](INDEX.md).**

- `claude/` — skill yang dikembangkan Irfan
- `external/` — skill open-source yang teruji (submodule terkunci versi)
- `projects/` — dokumen otoritas dan art direction per proyek
- `scriptwriter/` — pengembangan cara kerja ide menjadi naskah dan storyboard, terhubung ke skill aktif
- `archive/` — skill lama yang sudah digantikan (baseline eval)

Dokumen kerja: `AUDIT-2026-10-25.md` (audit dan rencana), `EVALS-DESIGN.md` (agar skill membaik tiap sesi), `DIAGNOSA-JADISATU-V7.md`.

Pasang ke Mac: `./tools/sync.sh` (salin `claude/` ke `~/.claude/skills`, cabut skill di `archive/`, cadangan otomatis).

Clone beserta submodule: `git clone --recurse-submodules https://github.com/Siirfannih/skill-development.git`
