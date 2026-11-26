# Fase 2.4: LANTAI.md dan MOTION-CORE.md tidak lagi sumber aktif
Masalah: kedua file berlabel arsip tetapi masih disuruh dibaca (revision-log, kartu juri, TAHAP, guide) dan memuat larangan yang sudah kamu cabut (serif, permukaan datar, 3D AI); `steward_check` melaporkan 2 error half-archive.
Perubahan:
- `references/build.md` §4-§7 (baru): gerbang R1-R5 (tabel, catatan R1, file pemicu, "gerbang gagal diperbaiki pada penyebabnya") disalin apa adanya dari MOTION-CORE §3; batas kerja §4 (tak mengedit/mematikan gerbang, satu video satu sesi, tanpa elemen di luar racikan) dengan teks MC15 yang dilunakkan: render langsung boleh bila gerbang tak bisa jalan, dengan gerbang itu dilaporkan NOT RUN (K03: `AGENTS.md` menang atas "jangan lewati render.sh final", termasuk render.sh final); ritme/keragaman (dipindah apa adanya, dilunakkan di commit 6); daftar primitif netral.
- `LANTAI.md` dan `MOTION-CORE.md` ke `archive/riwayat/` (bukan `archive/<nama>/`, agar sync.sh tidak menganggapnya skill). Dibuang tanpa pengganti (CUT): tabel tahap §1 (judul `## Tahap N` di TAHAP.md), salinan 5 invarian, banner/daftar "tidak dimuat", "Lantai 10 aturan tak ditawar" §2 (MC11; berisi kuota "≥ 4 transisi per 30 dtk"), "tak terjawab → tanya" (MC12), larangan 3D AI (MC08; menjadi "3D lolos tiga pertanyaan NEGATIF" + kunci gaya aset), daftar impor "wajib" dan penunjuk `Papan.tsx` proyek lain (MC10; kini "tersedia, pakai sebelum menulis baru").
- Delapan+ rujukan dialihkan ke NEGATIF/`build.md`/`MIGRASI-LANTAI.md`: TAHAP.md, revision-log, cookbook/README (juri 4: NEGATIF 1-10), guide/README, guide referensi, orkestrasi, handoff-fase, editor, konsul, tanya-claude.sh (kini membaca NEGATIF), AFTER-EFFECTS, peta.py, dll. Label RESEP "Penyesuaian karena LANTAI" tetap (dibaca `resep_check.py`). `claude/vibedesign/LANTAI.md` tidak disentuh.
- `tools/sync_lantai.py` membaca `archive/riwayat/LANTAI.md`; 46 ID tetap terpetakan.
- Tes diarahkan ulang, jumlah tetap 344: `test_audit_dokumen` (gerbang, larangan, alur dua langkah, ragam/FlashGrid kini di build.md, cookbook README, guide sfx; baris "tepat 10 aturan Lantai" dan ukuran MOTION-CORE dihapus), `test_migrasi_lantai` (membaca arsip).
- `SKILL.md` motion-graphic: dua rujukan `MOTION-CORE.md §3` jadi `build.md §4`; baris rute "butir Lantai lama" dihapus (peta ada di PETA.md); 12.214 byte.
Bukti: RULES MC01-MC19, L00-L06, T12, RL02, CB04, G01; backlog baris 2, 3, 4, 6, 11, 12.
Hasil cek: 344 tes OK (64 skip); peta, cookbook, sumber_cek, sync_lantai (46 ID), sync_negatif bersih; steward_check 0 error, 56 peringatan (dari 81).
Dampak: model tidak lagi menerapkan larangan serif/datar lama; gerbang R1-R5 hanya ada di build.md (dan salinan arsip).
Level: Behavior
Persetujuan: ya, fase 2 disetujui seluruhnya
Cara membatalkan: `git revert` commit ini.
