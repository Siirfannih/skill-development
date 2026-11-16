# Handoff · Sutradara (Opus) · skill-development-journey-20261116 · fase 0 → Henti 1

Kamu Sutradara (kepala) video ini, akun claude1. Pemberi tugas: sesi claude2 atas perintah Irfan (16 Nov malam). Jawab dan tulis dalam Bahasa Indonesia.

## Baca dulu (urut)
1. `~/work/skill-development/AGENTS.md` bagian Awal sesi (main sudah terbaru: fd6c674; doctor sudah LULUS dengan `--fix`; jangan ulangi fix).
2. `projects/skill-development-journey-20261116/GUIDELINE.md` — terutama **§10 (catatan aktif Irfan, menang atas semua)**, lalu §1–§9.
3. `claude/motion-graphic/SKILL.md`, `LANTAI.md`, `references/orkestrasi.md`, kartu `pustaka/kartu/83-barsolmedia-kt-talking-head.md`.

## Izin dari Irfan
"Semua akses diizinkan, tidak perlu minta izin lagi." Kerjakan tanpa bertanya "lanjut?". Merge/push ke `main` skill-development boleh.
Batas tetap: jangan sentuh file/proyek sesi lain (bdf26, jensen-pain-suffering, bali-digifest-day1, dll.), jangan hapus data di luar folder proyek ini.

## Fakta yang sudah dicek
- Sumber: `~/.codex/attachments/d9062ade-e728-4775-b6cd-1b2e61bfd5b8/DJI_20261116162607_0603_D.MP4` — **diverifikasi 16 Nov 19:58**: 951.742.464 byte pertama unduhan Drive `1aV0olxgPTcZ9gi37DMwUTCDt3L9cpPe-` identik byte-per-byte (unduhan terhenti karena disk penuh), ukuran total sama, durasi 209,39 dtk, frame cocok dengan screenshot Irfan. Jangan unduh ulang.
- Transkrip sumber penuh (Whisper, v1): `~/Documents/Codex/2026-11-16/files-mentioned-by-the-user-dji/work/transcript-source.{txt,json}`. Kata tetap diverifikasi di 1a.
- **Disk hanya ±1,4 GB bebas** (gerbang §0 minta 15 GB). Fase 0–1b + maskot cukup dengan ruang kecil: simpan hanya `wajah.mp4` 29,97 fps, still JPG ≤ 960 px, tanpa folder frames. Sebelum fase 3/5 (render) disk harus dibebaskan oleh Irfan; catat sebagai blok di STATUS.md. Jangan hapus file di luar proyek ini.
- Sebelum menulis file > 100 MB cek `df -h /`; bila bebas < 600 MB, berhenti dan tulis blok disk di STATUS.md (disk penuh merusak sesi lain).
- Mesin belum dibenchmark (doctor AWAS): jangan jalankan bench sekarang (disk).

## Kerjakan
1. **Fase 1a Potong** (subagen Sonnet / Codex sesuai GUIDELINE §1): alur 6 babak + **B1b** (§10.1) dari kata asli → `CUT-MAP-v2.json`, `suara.wav`, `wajah.mp4` 29,97 fps, `transkrip-hasil.md`, waktu+naskah asli di `CUT-SHEET.md`. Gerbang: `cut_check.py`, `audio_order.py lock …`.
2. **Fase 1b Arah (G1, kamu sendiri):** `RESEP.md` (kiblat MG dari PETA), `beats.json`, `teks.json`, `contract.json`, mode per kalimat, CUT-SHEET terkunci per kalimat termasuk baris B1b maskot. Easing: semua keyframe ease-in-out dari `curves.ts` (§10.3).
3. **K-12 `MaskotAI.tsx` lebih dulu & paralel** (Codex builder lewat `tools/codex-pc.sh`, TASK lengkap format `orkestrasi.md` §3): tiga maskot voxel (ChatGPT, Claude, Gemini) di `@remotion/three`, sesuai §10.2, acuan `sumber/ref/maskot-acuan-pixel-crab.png` dan `sumber/ref/karakter-di-ruangan.webp`. Komposit di atas still footage B1b (frame di kata "CGPT", "Claude", "Gemini"), uji 3 still + 1 lembar 2 dtk (animasi idle). Juri G2 kamu: apakah terasa ada di ruangan (cahaya, bayangan, tepi halus)? Maks 3 ronde.
4. **Storyboard:** 6 still papan (`board.py`) + 1 still maskot, maks 960 px, di `handoff/henti1/`.
5. **Berhenti di Henti 1.** Tulis `handoff/henti1/RINGKASAN.md` ≤ 10 baris (keputusan arah, durasi hasil, risiko, kebutuhan disk), perbarui `STATUS.md` + `DECISIONS.md`, commit + push `main`. Unggah still + ringkasan ke Drive folder "Claude edit/2026-11-16 — Siirfan — Di Balik Skill Development" bila alat Drive tersedia; bila tidak, cukup di repo.
6. Kabari claude2 via bus: `BUS_ME=claude1 bus send claude2 "skill-dev henti1" "<path RINGKASAN + 3 baris>"`.

## Hemat kuota (GUIDELINE §1.4)
Kamu tidak menulis kode adegan > 10 baris, tidak audit per frame, gambar hanya untuk G1/G2 maks 960 px, tunggu job pakai `tools/tunggu.sh`. Laporan akhirmu ke pemberi tugas ≤ 15 baris.
