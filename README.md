# Skill Development

Perpustakaan skill untuk semua model yang bekerja dengan Irfan. Satu repo, satu sumber kebenaran: skill tidak lagi terpecah di beberapa lokasi, dan setiap skill punya peran yang jelas sehingga hanya yang relevan yang dimuat.

**Mulai dari [INDEX.md](INDEX.md).** Ikuti langkah awal dan akhir sesi di [AGENTS.md](AGENTS.md); pelajaran yang belum disetujui ada di [PENDING.md](PENDING.md).

- `claude/` — skill yang dikembangkan Irfan
- `external/` — skill open-source yang teruji (submodule terkunci versi)
- `projects/` — dokumen otoritas dan art direction per proyek
- `scriptwriter/` — pengembangan cara kerja ide menjadi naskah dan storyboard, terhubung ke skill aktif
- `archive/` — skill lama yang sudah digantikan (baseline eval)

Dokumen kerja: `AUDIT-2026-10-25.md` (audit dan rencana), `EVALS-DESIGN.md` (agar skill membaik tiap sesi), `DIAGNOSA-JADISATU-V7.md`.

Pasang di setiap mesin kerja: Mac `./tools/sync.sh`, PC server `CLAUDE_CONFIG_DIR=~/.claude-2 ./tools/sync.sh`. Skill dipasang sebagai symlink (ikut `git pull`), plus skill Remotion resmi, cabut skill di `archive/`, hook SessionStart `git pull`. Wajib dijalankan ulang bila mesin atau akun Claude berganti (gagal: PC server 7–8 Nov, akun claude2 tanpa skill video). Sesi remote dari Mac dimulai di `~/work` PC (bukan di repo ini), jadi `sync.sh` juga menambah rujukan ke `AGENTS.md` di `~/work/CLAUDE.md` dan `doctor.sh` memeriksanya; folder lain: `ENTRY_DIR=...` (Irfan 8 Nov).

Clone beserta submodule: `git clone --recurse-submodules https://github.com/Siirfannih/skill-development.git`
