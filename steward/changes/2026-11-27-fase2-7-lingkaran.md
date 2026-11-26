# Fase 2.7: lebih sedikit lingkaran kerja
Masalah: empat tempat catat revisi (DECISIONS, RETRO, BUILD-LOG, evals/inbox), loop kritik tiga putaran sampai skor 8/10, dan angka pertanyaan yang berbeda di lima file.
Perubahan:
- Satu buku catatan: `DECISIONS.md` proyek. `revision-log.md` §20 "RETRO per gerbang (wajib)" dan catatan BUILD-LOG dihapus (nomor §20 dibiarkan sebagai penanda, supaya §21.x tetap); RETRO.md jadi riwayat beku dengan header baru; ICW "setiap revisi jadi aturan di RETRO" dihapus (bertentangan dengan rem pertumbuhan); `decision.md` mengarahkan usul aturan ke `steward/inbox/`. Salinan di `evals/inbox` sudah hilang di commit 1.
- Loop kritik: `analysis-qa.md` §16.5 tidak lagi "minimal 3 putaran sampai ≥ 8/10"; menjadi satu pindai mode gagal (daftar kriteria dan mode gagal dipertahankan karena berguna; yang dibuang adalah ulangannya dan `review_log.md`). Satu audit frame + satu putaran mata luar. `SKILL.md` langkah 4: per lapis L0-L3 hanya untuk style frame pertama dan frame yang gagal (RULES M12).
- Satu aturan bertanya: maks 3 pertanyaan berpilihan + rekomendasi, bersama draf/keyframe pertama: `SKILL.md` motion-graphic, `cookbook/README.md` §2 (sudah di commit 4), `script-workshop` (3-4 jadi 3), `working-with-irfan` §3; bingung = tanya + lanjutkan yang tak bergantung (W07); bentrok aturan diputus urutan otoritas dan disebut satu kalimat (W06). `dunia-visual.md` §3 tidak diubah (batas ukuran 15 KB).
- DA proporsional (W04): hanya untuk masukan yang mengubah arah; lima langkah ditampilkan ringkas bila putusan bukan "pakai apa adanya"; koreksi kecil langsung dikerjakan. "Masukan tidak diterima mentah" tetap. `script-workshop`: sama.
- Rencana edit (SB01): satu rencana + rekomendasi per beat; opsi alternatif hanya untuk beat yang ragu (`storyboard.md`, `alur-teknis.md`, `roles.md`, `templates/gaya/README.md`). W11: "sertakan checklist QA bila ada artefak" sudah di commit 6.
- Dua pemberhentian sah tetap: naskah final dan storyboard + racikan; tidak ada kredit sebelum gerbangnya terbuka.
Dihapus tanpa pengganti: RETRO per gerbang, BUILD-LOG, `review_log.md` dan "verdict SHIP", "minimal 3 putaran", "ulangi".
Bukti: RULES RL05, RL06, IC18, AQ03, M04, M12, W04, W06, W07, S06, S07, SB01; baseline Risk 6.
Hasil cek: 356 tes OK (64 skip); peta, cookbook, sumber_cek, sync_lantai, sync_negatif bersih; steward_check 0 error, 56 peringatan; SKILL.md motion-graphic 12.286 byte.
Dampak: lebih sedikit tinjauan berulang dan pencatatan ganda.
Level: Behavior
Persetujuan: ya, fase 2 disetujui seluruhnya
Cara membatalkan: `git revert` commit ini.
