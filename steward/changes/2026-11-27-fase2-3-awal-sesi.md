# Fase 2.3: awal sesi tidak lagi bisa menghentikan kerja
Masalah: doctor GAGAL bila skill Codex tidak di-symlink (mesin tanpa Codex tak boleh mulai), profil merek dan earshot diperlakukan sebagai penghalang, PENDING ditanyakan tiap sesi, cek branch.
Perubahan:
- `tools/doctor.sh`: bagian Codex hanya dicek bila `~/.codex` ada dan hasilnya AWAS, bukan GAGAL; earshot dinyatakan opsional; pesan akhir tidak lagi menyuruh minta izin dulu. `--fix` tetap mengubah folder akun. Diperiksa dengan `bash -n` dan dibaca; tidak dijalankan.
- Pertanyaan PENDING dan cek branch hilang dari AGENTS (commit 1 dan 2); cek branch hidup di `maintenance.md` §1 (rute mengubah skill). `tools/sync.sh` (teks blok untuk folder masuk remote) tidak lagi bilang "Doctor GAGAL = jangan mulai"; `bash -n` OK.
- `MG/SKILL.md` §Profil merek, `templates/merek/README.md` Tahap 1, `templates/TAHAP.md` langkah pertama: profil belum ada -> draf dari brief dan logo, diajukan bersama keyframe pertama; kerja jalan terus. Literal `- [ ] Profil merek` dan `profil_cek` tetap (dipasang tes). TAHAP.md menerima `→ n/a: <alasan>` untuk langkah yang tidak berlaku (`tahap.py` sudah menerima teks bukti apa pun).
- `references/alur-teknis.md` baris Brief: earshot tidak terpasang -> lanjut dengan `music_fit`, `pace_read`, ebur128 dan tandai "belum didengar alat". Skrip `music_fit.py` yang masih keluar tanpa earshot diubah di commit 5.
Bukti: RULES A18, A21, A22, A23, AT02, T02; backlog baris 19.
Hasil cek: 344 tes OK (64 skip); peta, cookbook, sumber_cek, sync_lantai, sync_negatif bersih; steward_check 2 error, 79 peringatan; SKILL.md 12.286 byte (batas 12.288). Doctor belum dijalankan (aturan sesi).
Dampak: mesin tanpa Codex/earshot/profil merek tetap bisa bekerja; `render.sh final` tetap menolak tahap Brief yang belum dicentang, tetapi centang boleh `n/a: alasan`.
Level: Behavior (doctor.sh/sync.sh = skrip pemasangan: disetujui sebagai bagian fase)
Persetujuan: ya, fase 2 disetujui seluruhnya
Cara membatalkan: `git revert` commit ini.
