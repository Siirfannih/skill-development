# Pelajaran pilot aff-pompa-01 (27 Okt 2026)

Video affiliate 40 dtk "pompa mentok 7-9 m", dibuat penuh otomatis saat Irfan menyetir. Hasil: Irfan menilai "untuk satu kali prompt cukup bagus, apalagi tanpa minta arahan", lalu satu putaran masukan (r3).

## Kesalahan yang jangan diulang
1. **Latar putih di video edukasi.** Irfan: "jangan ada background putih ... langsung di zoom aja dari objeknya ... pipa itu dibedah dari dalamnya". Sejak awal: full-bleed, close-up, objek dibelah.
2. **Tidak membedah referensi sebelum build.** Bedah per frame dulu (`yt-dlp --extractor-args "youtube:player_client=android_vr,ios,mweb"`, lalu `ffmpeg fps=1/2 + tile`). Klien web default kena 403.
3. **Builder (Codex) disuruh render.** Sandbox memblokir port; aturan AGENTS.md melarang render bila disk < 10 GiB. Render = tugas runner.
4. **Render penuh di Mac yang disknya hampir penuh.** Chrome crash/macet di frame +-974. Pakai `tools/render/render_chunks.sh` (300 frame, concurrency 2, jpeg) atau render di PC.
5. **npm di Mac `omit=dev`.** `@types/react` dan `@rspack/binding-darwin-arm64` hilang. Pasang dengan `--include=dev` dan binding platform eksplisit.
6. **Gemini CLI ineligible / `agy -p` macet menunggu izin.** Kritikus kedua belum teruji; perbaiki di PC (sandbox read-only) sebelum dianggap lapis QC.
7. **Disk penuh menyebabkan file terpotong** (well-full.png tepat 1 MiB) dan job panik. Gambar asli bisa dipulihkan dari `~/.codex/generated_images/`.
8. **Ronde perbaikan membuat regresi** (CTA menumpuk, teks kartu mengecil). Selalu QC ulang beat yang diubah, bukan hanya butir temuan.
9. **ElevenLabs Starter** menolak 192 kbps (pakai 128) dan tidak punya suara Indonesia di library; sekarang diganti TTS lokal.
10. **Suara OmniVoice +-30% lebih cepat** dari VO ElevenLabs; jangan paksa ke timing lama dengan tempo 0,8. Untuk video baru, buat VO dulu, timing visual mengikuti VO.

## Angka
- Wall clock r0: +-42 menit (21:26-22:08); interaksi Irfan 0.
- Gambar ChatGPT: +-2 menit/gambar, paralel. Build Codex: 9 menit (r0), 2-3 menit per ronde perbaikan.
- Render 40 dtk 1080x1920 per potongan: +-2,5 menit di M2.
- Kredit ElevenLabs r0: 737 (VO + musik + 1 SFX). TTS lokal: Rp0, +-35-40 dtk per kalimat di M2, WER Whisper 9,9% (hampir semua beda ejaan).
- Loudness akhir -14,2 LUFS, puncak -1,3/-1,5 dBFS.
