# Fase 2.2: AGENTS.md jadi pintu 3 KB
Masalah: AGENTS.md 15 KB (~4,3k token) dimuat tiap sesi; memuat duplikat, upacara awal/akhir sesi, dan klaim arsip yang saling bertentangan.
Perubahan: `AGENTS.md` kini 3.070 byte: blok 5 invarian (byte 0, sama persis dengan MOTION-CORE.md, 1.047 byte), urutan otoritas satu kalimat, tabel rute 8 baris, satu paragraf "Kerja". PETA.md tetap memuat tabel Rute lengkap (dibangkitkan; `WAJIB_RUTE` dan tes tetap berlaku). Rujukan "AGENTS.md §Cara membaca butir 2 / §Akhir sesi" di cookbook README, 00-core-invariants, alur-teknis, decision-guide, MOTION-CORE, LANTAI, peta.py, sumber_cek.py, INDEX, README, sync.sh, doctor.sh dialihkan.
Tujuan baris KEEP (RULES §1.1) dan rumah barunya:
- A01-A05 invarian: tetap di blok byte 0. A09 urutan otoritas: paragraf "Urutan otoritas" (instruksi Irfan menang; NEGATIF [mutlak] 4, 5, 9; folder proyek lain bukan aturan).
- A13 koreksi dicatat saat diterima dan A24 rem pertumbuhan: paragraf "Kerja" + `placement.md` §6.
- A16 bukti: paragraf "Kerja" ("Lulus" dengan keluaran alat terbaru; ledger untuk video terkirim) + `delivery-gate.md`, `revision-log.md`.
- A17 tarik `main`, A19, A20: paragraf "Kerja". A25 instruksi + alasan + cek, asal-usul ke SUMBER: paragraf "Kerja" + `references/writing.md`, SKILL.md §5 skill-steward; ditegakkan `sumber_cek.py`.
- A27, A35: paragraf "Kerja" (+ `maintenance.md` §7). A31 Jadisatu Canvas: baris rute; aturan keamanannya ada di `claude/jadisatu-canvas/SKILL.md` baris 12-19. A32, A36: baris rute naskah; titik lanjut di `scriptwriter/README.md`. A33: baris Kerja + `placement.md` §1. A06/A07/A10-A12/A14: baris rute dan "Kerja".
- A29 (batas ukuran): tidak lagi di AGENTS; SKILL.md motion-graphic ≤ 12 KB dan NEGATIF tepat 10 ditegakkan tes dan `sync_negatif.py`; batas lain di `steward_check.py`.
Dihapus tanpa pengganti (CUT): A08 rantai bacaan video lengkap, A15 tabel "aturannya tidak ada" (bacaan arsip), A22 pertanyaan PENDING (sudah di commit 1), A28 tag `Agent:` di commit; PETA P01-P02 (urutan otoritas basi, syarat "aturannya tidak ada").
Bukti: RULES A06-A37, P01-P02; backlog baris 21.
Hasil cek: 344 tes OK (64 skip); peta, cookbook, sumber_cek, sync_lantai, sync_negatif bersih; steward_check 2 error (LANTAI/MOTION-CORE, commit 4), 79 peringatan. Belum diuji: perilaku sesi baru.
Dampak: ±3,1k token lebih hemat tiap sesi; sesi yang membaca "Awal sesi/Akhir sesi" tidak menemukannya lagi.
Level: Behavior
Persetujuan: ya, fase 2 disetujui seluruhnya
Cara membatalkan: `git revert` commit ini.
