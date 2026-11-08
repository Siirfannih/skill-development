# Pelajaran yang menunggu keputusan Irfan

Dibaca di awal setiap sesi (lihat `AGENTS.md`). Satu baris per pelajaran. Irfan menjawab **ya** (pindahkan ke skill tujuan lalu hapus barisnya), **tidak** (hapus barisnya), atau membiarkannya. Model tidak memakai baris di sini sebagai aturan.

Sumber: `[I]` = ada kata Irfan, `[A]` = analisis AI.

- [A] Pilot raea (raea.io) **hanya** sebagai renderer cepat proyek HyperFrames di Mac, setelah satu uji berdampingan (SSIM + waktu) melawan CLI HyperFrames. Tidak dipakai sebagai engine ketiga: raea tidak menjalankan kode Remotion, statusnya canary, dan render HTML-nya 108 dtk vs 50 dtk CLI HyperFrames (PR #3 raea, 6 Nov). Preview hemat sudah ada lewat still per beat + audio saja (`delivery-gate.md` §0).
- [A] Profil `music-profiles.json` selain `energi` (fokus, slowdown, tegang, hangat) masih hipotesis. Usul: pisahkan stem musik (demucs di PC server) dari video referensi yang suasananya cocok, minimal 3 per kategori, lalu `music_fit.py --calibrate`.
- [A] Unduh YouTube: yt-dlp tanpa JS runtime kadang hanya memberi audio atau HLS lambat; pakai `--js-runtimes node --remote-components ejs:github` (doac5 7 Nov).
- [A] `music_fit.py` segfault (numba/librosa) bila beberapa proses jalan paralel; jalankan berurutan dengan `NUMBA_CACHE_DIR` per proyek (doac5 7 Nov).

_Riwayat:_ Daftar 4 Nov (16 pelajaran dari proyek Fore, kartu usulan 30 Okt, dan RETRO 2 Nov) ditolak Irfan 4 Nov: proyek Fore tidak selesai dan pelajarannya bersifat kasus.
