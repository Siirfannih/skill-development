# Fase 3.1: jalur Codex/ChatGPT dipensiunkan (Q3)
Masalah: Codex tidak lagi dipakai; `orkestrasi.md` masih menyuruh pekerja lewat `codex-pc.sh`, `gpt-bridge` dan `tanya-claude.sh`.
Perubahan:
- `git mv` ke `archive/riwayat/`: `tools/codex-pc.sh`, `tools/tanya-claude.sh`, `claude/motion-graphic/templates/roles/konsul.md` (jalur sama di bawah `archive/riwayat/`), `autopilot-video/` (35 berkas).
- `references/orkestrasi.md`: tabel peran tanpa Codex (builder = subagen sonnet atau `claude -p`, cadangan kamu sendiri); paragraf konsul/tanya-claude dihapus; §2 tinggal dua langkah (cek yang ada, jalur gagal 2x ditandai mati). `build.md`: "generate lewat Codex/ChatGPT di Mac" jadi "generator gambar yang tersedia". `roles.md` dan `devils-advocate.md`: kata Codex dibuang; rujukan `autopilot-video/DESIGN.md` dibuang.
- `INDEX.md` baris autopilot-video, `SUMBER.md` bagian codex-pc.sh, baris ledger konsul.md dihapus; contoh di `skill-steward/references/migration.md` dibuat umum; `PETA.md` dibangkitkan ulang (3 baris hilang).
Tidak diubah (sengaja): `sync.sh`/`doctor.sh`/`README.md` tidak menyebut skrip jalur ini; bagian yang memasang skill ke `~/.codex` adalah dukungan klien, bukan jalur pekerja, dan sudah opsional sejak fase 2. `claude/autopilot-prd/SKILL.md` (jembatan `~/AI-OPS/codex-pc/pc.sh`, di luar repo) dan teks sejarah di `projects/*` dan `SUMBER.md` tidak disentuh.
Hasil cek: 357 tes OK (64 skip), peta bersih, cookbook 44 kartu 0 gagal, sumber_cek, sync_lantai, sync_negatif bersih; steward_check 0 error, 56 peringatan; `bash -n` doctor/sync lolos.
Level: Behavior
Persetujuan: ya, jawaban Q3
Cara membatalkan: `git revert` commit ini (semua berkas tersimpan juga di tag `pra-bersih`).
