# Fase 2.1: SARINGAN, EVALS-DESIGN, §Tumbuh, PENDING diserap skill-steward
Masalah: empat tempat aturan perawatan yang saling bersaing (dua format butir, dua tempat catat, antrean PENDING yang dibaca tiap sesi dan tidak pernah bisa dijawab user lain). Skill-steward sudah ada tetapi tiga file lama masih dirujuk sebagai aturan aktif.
Perubahan:
- `claude/skill-steward/references/placement.md` §6 (baru): tujuh uji promosi pelajaran, termasuk ambang hukum keras (muncul di 2 proyek berbeda, tidak salah-tembak pada frame yang sudah disetujui, bunyinya disetujui Irfan) dan "satu kejadian hanya ke DECISIONS.md". `testing.md` §7 (baru): format kasus eval dan eval pemicu. `maintenance.md` §6: sinyal pakai (pertanyaan yang sama dua kali, cabang selalu/tak pernah dibuka).
- `SARINGAN.md`, `EVALS-DESIGN.md`, `PENDING.md` dipindah ke `archive/riwayat/` (isi PENDING.md yang terlacak utuh). Dua puluh baris PENDING yang masih terbuka menjadi 20 catatan di `steward/inbox/` (tanda [I]/[A] dan teks asli dipertahankan). Perubahan PENDING.md yang belum di-commit di checkout Irfan akan berbenturan saat merge (modify/delete): salin barisnya ke inbox.
- `cookbook/README.md` §9 Tumbuh jadi penunjuk (frame ditolak tetap ke `contoh-gagal/`; kalimat "Yang tidak dilakukan" dipertahankan). Rujukan ke tiga file itu dialihkan di AGENTS.md, README, PETA (lewat `tools/peta.py`), vibedesign, motion-graphic, scriptwriter, content-ops, autopilot-video.
- Invarian 2 (di AGENTS.md dan MOTION-CORE.md, identik) kini "Promosi aturan hanya lewat `skill-steward`"; tes `INVARIAN` diubah bersama. Blok 1047 byte (< 1050).
- Kasus eval mg-058: asersi "→ PENDING.md" dihapus karena file itu tak dibaca lagi.
- Dihapus tanpa pengganti (ditandai CUT): penghitung `nilai` per ID (SA06), penilaian akhir proyek dan "Pola lama" (SA08), catat ke RETRO dan `evals/inbox` (EV01), jadwal mingguan (EV05), "Catatan pakai" di kartu.
Bukti: RULES.md SA01-SA08, EV01-EV05, PD01; backlog baris 7, 8, 9.
Hasil cek: 344 tes OK (64 skip); peta, cookbook, sumber_cek, sync_lantai, sync_negatif bersih; steward_check 2 error (LANTAI/MOTION-CORE, ditutup di commit 4), 81 peringatan. Uji perilaku: belum diuji (self-check: mg-058 dibaca ulang).
Dampak: sesi baru tidak lagi membaca PENDING atau bertanya ya/tidak. Tiga baris 3D/gradien tetap terbuka di inbox (backlog 12 mengusulkan penutupannya; keputusanmu).
Level: Behavior
Persetujuan: ya, fase 2 disetujui seluruhnya
Cara membatalkan: `git revert` commit ini; atau `git checkout pra-bersih -- PENDING.md SARINGAN.md EVALS-DESIGN.md`.
