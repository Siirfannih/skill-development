# MIGRASI-LANTAI: ke mana tiap butir Lantai pindah

`LANTAI.md` dan `MOTION-CORE.md` tinggal di disk sebagai arsip referensi; pintu aktif adalah `SKILL.md`. Tidak ada butir yang dihapus: tiap ID di bawah punya rumah baru, dan bunyi aslinya masih bisa dibaca di `LANTAI.md`. Yang berubah adalah kapan aturan itu sampai ke model (langkah alur atau bagian referensi yang dibuka per tahap) dan siapa yang menegakkannya (skrip). `tools/sync_lantai.py` dan `scripts/tests/test_migrasi_lantai.py` memastikan setiap ID `LANTAI.md` ada di tabel ini dan semua rumahnya nyata.

Pemetaan mengikuti desain Fase 1 (laporan audit struktur skill, bagian "Nasib 46 butir"). Rumah pertama di kolom kedua adalah file yang dibuka; kolom ketiga adalah penegak mekanis (kosong = dinilai dengan mata).

| ID | Rumah baru | Penegak |
|---|---|---|
| A1 | `SKILL.md` (NEGATIF 6) + `references/teks.md` | `scripts/lego/kt_check.py` |
| A2 | `references/teks.md` | `scripts/gate/tabrakan_cek.py`, `scripts/gate/cek_komposisi.py` |
| A3 | `SKILL.md` (NEGATIF 6) + `references/teks.md` | `scripts/lego/kt_check.py` |
| A4 | `SKILL.md` (NEGATIF 6) + `references/teks.md` | `scripts/lego/kt_check.py` |
| A5 | `SKILL.md` (NEGATIF 6) + `references/teks.md` | `scripts/lego/kt_check.py` |
| A6 | `references/teks.md` | `scripts/lego/kt_check.py` |
| A7 | `SKILL.md` (NEGATIF 1); non-huruf di `references/teks.md` | `scripts/gate/negatif_cek.py` (K1) |
| A8 | `references/teks.md` | `scripts/lego/kt_check.py` |
| A9 | `references/teks.md` | `scripts/lego/kt_check.py` |
| A9a | `references/teks.md` + `references/typography.md` §8a | `scripts/lego/kt_check.py` |
| B10 | `references/kamera-gerak.md`; prinsip di `SKILL.md` (NEGATIF 10) | `scripts/juri/motion_lint.py` |
| B11 | `references/kamera-gerak.md`; prinsip di `SKILL.md` (NEGATIF 10) | `scripts/juri/motion_lint.py` |
| B12 | `references/kamera-gerak.md`; prinsip di `SKILL.md` (NEGATIF 10) | `scripts/juri/motion_lint.py` |
| B13 | `references/kamera-gerak.md`; prinsip di `SKILL.md` (NEGATIF 10) | `scripts/juri/motion_lint.py` |
| B13a | `references/kamera-gerak.md` | `scripts/juri/motion_lint.py`, `scripts/remotion/curves.ts` |
| B13b | `references/kamera-gerak.md` | `scripts/juri/motion_lint.py` |
| C14 | `SKILL.md` (NEGATIF 5) | `scripts/gate/tabrakan_cek.py`; lihat L2 |
| C14a | `SKILL.md` (NEGATIF 2) | `scripts/gate/negatif_cek.py` (K2) -> `scripts/gate/permukaan_cek.py` |
| C15 | `SKILL.md` (alur langkah 4, L2) | `scripts/gate/tabrakan_cek.py`, `scripts/gate/cek_komposisi.py` |
| C16 | `SKILL.md` (alur langkah 4, L2) | `scripts/gate/cek_komposisi.py` (tanda `TEPI`) |
| C17 | `SKILL.md` (alur langkah 4-5 dan hukum besi) | `scripts/lihat.py` (zoom penuh + crop 100 %) |
| C18 | `SKILL.md` (alur langkah 4, L0-L3) | `scripts/gate/negatif_cek.py`; lihat per lapis |
| C18a | `references/dunia-visual.md` (palet dikunci di RESEP proyek) | `scripts/palette_check.py` |
| C18b | `SKILL.md` (NEGATIF 10) | `scripts/juri/motion_lint.py` |
| D19 | `references/storyboard.md` §9 | lihat per lapis (L1) |
| D19a | `SKILL.md` (alur langkah 1) + `references/storyboard.md` §2 | `scripts/storyboard/board.py` |
| D19b | `SKILL.md` (alur langkah 1) + `references/storyboard.md` §2 | `scripts/storyboard/board.py` |
| D19c | `SKILL.md` (alur langkah 1) + `references/storyboard.md` §9 | `scripts/storyboard/board.py` |
| D20 | `references/storyboard.md` §9 | lihat L1 |
| D21 | `references/storyboard.md` §9 | lihat L1 |
| D22 | `SKILL.md` (NEGATIF 4) | `scripts/gate/negatif_cek.py` (heuristik placeholder) |
| D22a | `references/storyboard.md` §9 | `references/storyboard.md` §5 (review papan) |
| D22b | `SKILL.md` (alur langkah 1) + `references/storyboard.md` §9 | `scripts/storyboard/board.py` |
| D22c | `SKILL.md` (NEGATIF 4) | `scripts/juri/frame_audit.py` |
| E23 | `SKILL.md` (NEGATIF 9) + `references/audio.md` (aturan inti) | `scripts/gate/cut_check.py`, `scripts/gate/voice_level.py` |
| E24 | `references/audio.md` (aturan inti, wajib di langkah 7) | `scripts/gate/sfx_density.py` |
| E25 | `references/audio.md` (aturan inti, wajib di langkah 7) | `scripts/audio/music_fit.py` |
| E25a | `references/audio.md` (aturan inti, wajib di langkah 7) | `scripts/audio/audio_phone.py` |
| F26 | `SKILL.md` (Alur) | `scripts/juri/tahap.py`, `scripts/juri/render.sh` |
| F26a | `SKILL.md` (Alur langkah 4-5) | `scripts/lihat.py` |
| F27 | `references/revisi.md` | `scripts/juri/revisi_cek.py` |
| F28 | `SKILL.md` (Sebelum mulai) | - |
| F28a | `SKILL.md` (Sebelum mulai) | - |
| F28b | `SKILL.md` (Sebelum mulai) | - |
| F28c | `SKILL.md` (Sebelum mulai) | - |
| F29 | `SKILL.md` (hukum besi) | `scripts/juri/render.sh` |
