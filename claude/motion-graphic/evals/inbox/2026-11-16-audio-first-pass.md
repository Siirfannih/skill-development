# Kasus mentah: audio first-pass lolos aturan tertulis tetapi gagal di hasil

ID: mg-055.
Status: direproduksi dan dipatch 16 Nov 2026.

## Keluhan Irfan

Semua AI mengulang cut terlalu awal/terlambat sehingga fonem hilang atau jeda diam, serta memilih SFX yang dilarang pada hasil pertama. Session Codex “Perbaiki dan render video Builder Trap…” disebut sebagai contoh langsung.

## Bukti

- Audit Claude ronde 1: `kecanduan.` terpotong di f1729, transien f714, AAC terlambat 2096 sampel.
- Audit ronde 2: perbaikan klik menggeser cut ke dalam ekor `buat.`; baru ronde 3 `PASS_WITH_NOTES`.
- `cut_check.py` lama memeriksa audio final terhadap daftar kata yang sudah diremap; daftar tetap lengkap walau waveform kata teriris.
- `render.sh final` tidak memanggil satu pun gerbang audio.
- `sfx_density.py` lama tidak mempunyai denylist; cue wood/laser/sci-fi tetap PASS bila kepadatan dan metadata lengkap.
- PC worker memuat worktree skill yang berbeda dari `main`; repo kerja PC juga tertinggal dan kotor.

## Kriteria perbaikan

Lihat kasus `evals/cases/mg-055-audio-first-pass.json` dan regression test `scripts/tests/test_audio_gates.py`.
