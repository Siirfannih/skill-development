# Fase 3.4: templates/gaya diarsipkan (Q4)
Masalah: dua template gaya tetap (editorial-bold, minimal-premium) dan README-nya ("rujukan visual utama") bertentangan dengan prinsip kanvas kosong (invarian 1 AGENTS).
Perubahan:
- `git mv claude/motion-graphic/templates/gaya` ke `archive/riwayat/claude/motion-graphic/templates/gaya` (3 berkas).
- Yang tidak ikut hilang: format rencana edit `MENU.md` (dipakai `roles.md`, `storyboard.md`) dipindah ringkas ke `references/roles.md`, di bawah tabel berkas handoff. Dibuang tanpa pengganti: tabel dua gaya, "Membuat gaya baru (metode ref 18)", kalimat "gaya terpilih = rujukan visual utama", dan MP-xx/ID adegan gaya.
- Rujukan dialihkan: `storyboard.md` (baris klip/talking head, tanpa gaya tetap, adegan dari kartu + RESEP; ukuran 15.224 B, batas tes 15.360), `alur-teknis.md` (4 tempat), `roles.md` (3 tempat + PLAN.json), `templates/roles/editor.md`, `handoff.md`, `analysis-qa.md`, `engines/talking-head-reels/ENGINE.md`, evals `mg-051`/`mg-052`, catatan di `joseph-arthur-brooks.md`. `PETA.md` dibangkitkan ulang. Tidak diubah: teks sejarah `SUMBER.md`, kartu 18 (catatan 11 Nov), `scriptwriter/DAILY.md`.
Tes: tidak ada tes yang menyebut folder ini; tes ukuran 15 KB `storyboard.md` dijaga (tidak dilonggarkan).
Hasil cek: 357 tes OK (64 skip), peta, cookbook 44 kartu, sumber_cek, sync_lantai, sync_negatif bersih; steward_check 0 error, 55 peringatan.
Level: Behavior
Persetujuan: ya, jawaban Q4
Cara membatalkan: `git revert` commit ini.
