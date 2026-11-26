# Review gerbang Fase 2 (27 Nov 2026)

Pemeriksa kedua atas cabang `bersih/fase2` (9 commit pelaksana, 07c1474f..5366b45d) dengan ukuran pemilik: perbaikan tidak boleh membuat regresi atau membuang yang sudah bagus.

## Yang diubah review

- **Musik**: bawaan kandidat kembali ke ≥ 20 dari ≥ 2 sumber (standar kerja pemilik sebelum fase 2, juga di rencana), tetap peringatan; REF-SPEC/proyek boleh mengubah. `guide/audio/GUIDE.md`, `references/audio.md`, `delivery-gate.md`, `alur-teknis.md`, `music_fit.py` (`--min-kandidat` bawaan 20) + uji baru.
- **Earshot opsional konsisten**: eval mg-047/mg-055 dan `guide/sfx/GUIDE.md` menulis "belum didengar alat" (NOT RUN) bila earshot tidak ada.
- **Gerbang render**: kalimat tenggat yang hilang dipulihkan di `references/build.md` §5 ("Tenggat bukan alasan melewati gerbang yang bisa jalan"); §7 kini selaras dengan katup NOT RUN §5. Uji `test_audit_dokumen.py` menjaga kalimatnya.
- **Rute**: `AGENTS.md` kembali menunjuk `working-with-irfan`; `templates/TAHAP.md` Tahap 5 kembali menunjuk palet terkunci (C18a, `dunia-visual.md`).
- **Inbox**: usulan PENDING [A] dan entri RETRO pemilik yang belum di-commit dibawa ke `steward/inbox/` (2026-11-25-retro-behindwork-launch-r2, 2026-11-26-alat-juri-behindwork-launch, 2026-11-26-da-sebelum-audit-frame-akhir).

## Putusan atas simpangan pelaksana

- Musik ≥ 5: diganti ≥ 20 (lihat atas).
- Hybrid Motion sebagai referensi bawaan: diterima.
- §16.5 kriteria tetap, loop dibuang: diterima.
- Larangan 3D AI → tiga pertanyaan NEGATIF + kunci gaya aset: diterima.
- Tiga catatan 3D/gradien di inbox: diterima; tidak ada keputusan yang dinyatakan.
- `pabrik/lib.py` mkstemp 0600 di `pabrik/out` (diabaikan git, dir 0700, teruji): diterima. Sisa path `/tmp` yang bisa ditebak hanya kunci render bersama (`/tmp/remotion-heavy-render.lock`), sengaja sama dengan `render.sh` dan `bench.sh`; tidak diubah.

## Cek

unittest 357 OK (skip 64); `peta.py --check` terbaru; cookbook 44 kartu 0 GAGAL; `sumber_cek` bersih; `sync_lantai` 46 ID; `sync_negatif` sama; `steward_check` 0 error, 56 peringatan; `bash -n` doctor/sync/tanya-claude OK.
