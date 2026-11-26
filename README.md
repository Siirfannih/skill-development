# Skill Development

Perpustakaan skill untuk semua model yang bekerja dengan Irfan. Satu repo, satu sumber kebenaran: skill tidak lagi terpecah di beberapa lokasi, dan setiap skill punya peran yang jelas sehingga hanya yang relevan yang dimuat.

**Mulai dari [AGENTS.md](AGENTS.md)** (urutan otoritas dan tabel rute), lalu [PETA.md](PETA.md) untuk rute per pekerjaan dan daftar skill. Pelajaran yang belum disetujui menunggu di `steward/inbox/`.

- `claude/` — skill yang dikembangkan Irfan
- `external/` — skill open-source yang teruji (submodule terkunci versi)
- `projects/` — dokumen otoritas dan art direction per proyek
- `scriptwriter/` — pengembangan cara kerja ide menjadi naskah dan storyboard, terhubung ke skill aktif
- `archive/` — skill lama yang sudah digantikan (baseline eval)

Dokumen kerja: `archive/riwayat/AUDIT-2026-10-25.md` (audit dan rencana), `claude/skill-steward/` (cara skill diubah, diuji, dan dirawat), `archive/riwayat/DIAGNOSA-JADISATU-V7.md`. Asal-usul aturan (siapa, kapan, kejadiannya) ada di `SUMBER.md` dan `claude/<skill>/SUMBER.md`: riwayat, bukan instruksi.

Pasang di setiap mesin kerja: Mac `./tools/sync.sh`, PC server `CLAUDE_CONFIG_DIR=~/.claude-2 ./tools/sync.sh`. Skill `claude/*` dipasang sebagai symlink ke Claude Code **dan Codex** (ikut `git pull`); skill Remotion resmi dipasang ke Claude, skill di `archive/` dicabut, dan hook SessionStart Claude menjalankan `git pull`. Wajib dijalankan ulang bila mesin atau akun AI berganti. Sesi remote dari Mac dimulai di `~/work` PC (bukan di repo ini), jadi `sync.sh` juga menambah rujukan ke `AGENTS.md` di `~/work/CLAUDE.md` dan `doctor.sh` memeriksanya; folder lain: `ENTRY_DIR=...`.

Skill engineering (coding, review, keamanan) dipasang terpisah lewat `./tools/engineering-stack.sh`; daftar dan biayanya di [ENGINEERING-STACK.md](ENGINEERING-STACK.md).

Clone beserta submodule: `git clone --recurse-submodules https://github.com/Siirfannih/skill-development.git`
