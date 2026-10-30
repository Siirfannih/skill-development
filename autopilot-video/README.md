---
status: principle
scope: autopilot-video
how_to_use: "Muat saat mengerjakan sistem autopilot. Statusnya masih percobaan."
---

# Autopilot produksi video

Sistem yang membawa satu video dari paket yang disetujui Irfan (naskah + storyboard + referensi) sampai render final, tanpa Irfan memeriksa revisi di tengah. Irfan hadir di dua gerbang saja: menyetujui paket dan menerima hasil.

Status: **v0, diuji sekali** (pilot `aff-pompa-01`, 27 Okt 2026). Semua ADR masih "Diusulkan" sampai Irfan menyetujui. Versi dokumen hidup ada di Claude Docs "Autopilot Produksi Video · PRD & Design Doc".

## Mulai proyek video baru (urutan baca untuk sesi baru)

1. `INDEX.md` repo, lalu `claude/working-with-irfan`, lalu `claude/motion-graphic` (hanya cabang yang perlu).
2. Folder ini: `PRD.md` (apa dan kenapa) -> `DESIGN.md` (bagaimana) -> `CONOPS.md` (alur pemakaian) -> `ADR.md` (keputusan).
3. `pilot/aff-pompa-01/LESSONS.md`: kesalahan yang sudah terjadi. Jangan diulang.
4. Salin `templates/contract.example.json` ke `projects/<proyek>/contract.json` setelah gerbang 1.

## Isi folder

| Path | Isi |
|---|---|
| `PRD.md` | Masalah, tujuan, non-tujuan, ukuran berhasil |
| `DESIGN.md` | Riset alat yang ada, arsitektur, kontrak, gerbang kualitas, pembagian model, mode gagal |
| `CONOPS.md` | Simulasi pemakaian: jalur normal, beat macet, kritikus salah, mesin mati |
| `ADR.md` | Catatan keputusan arsitektur |
| `templates/contract.example.json` | Contoh kontrak terkunci (dari pilot) |
| `tools/gpt-bridge/` | Satu pintu ke ChatGPT/Codex (kuota Pro) dari agent mana pun, sesi per jalur |
| `tools/render/` | Render per potongan (anti crash), mix audio (VO + musik + SFX low-pass), rapatkan jeda VO |
| `tools/voice/` | TTS lokal gratis (OmniVoice): buat suara baru, pasang VO ke jendela waktu, cek kejelasan (Whisper WER) |
| `pilot/aff-pompa-01/` | Naskah, tugas builder per ronde, log keputusan, laporan, kode Remotion, lembar QC |

## Prasyarat mesin

- Render, TTS, dan kerja berat di **PC server** (`node-c-pc`, Tailscale). Mac hanya untuk diskusi: disk Mac sempat penuh dua kali saat pilot.
- Codex login ChatGPT, Claude CLI login (untuk audit-bridge), Node 22+, ffmpeg, Python 3.12 + venv OmniVoice.
