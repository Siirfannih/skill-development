# TODO autorun PKS v9 (centang + tanggal saat selesai; tulis catatan singkat di bawah item)

## 0. Setup
- [x] Brief dikunci di `AUTORUN-2NOV.md`, rencana audio di `SOUND-PLAN-IRFAN-2NOV.md`
- [x] Akses folder Mac `~/Documents/Skill-Development/AI-Video` (granted 1 Nov) — petakan media + proyek Remotion
- [x] Tentukan tempat render (Mac via Desktop Commander vs cloud) + cek Codex CLI di Mac
  - Render di Mac (M2 16 GB): pks-studio/remotion punya node_modules; codex 0.163, rtk, ffmpeg ada.
- [x] Heartbeat/trigger lanjutan aktif

## 1. Audit A — video v8 (Claude utama)
- [x] Peta timeline v8: beat, kalimat VO, klip, scene (dari `remotion/src/timeline.json`, `beats.json`)
- [x] Audit audio terukur: noise floor per babak, dead air (> 300 ms sunyi), spektrum SFX, LUFS
- [x] Audit visual: frame per beat vs `GrokAgent/reference-videos/*` + storyboard; daftar yang tidak rapi
- [x] Tulis `AUDIT-V8-2NOV.md` (temuan → prioritas → fix)

## 2. Audit B — repo skill-development (sub-agent)
- [x] Laporan `AUDIT-REPO-2NOV.md` + file kandidat dipindah ke `_archive/` (tidak dihapus)

## 3. Audio v9
- [x] Cue sheet babak (riser / drone+heartbeat / arp+perkusi / jembatan / piano-pad)
- [x] Sourcing musik/stems: Epidemic (stems) → ElevenLabs → internet. Tanpa sintesis.
  - Kandidat palet satu artis (Lennon Hutton): DOX 07e2e4ec (74 bpm, bass+instruments → drone Babak 2), Mindscape 4cb08b97 (108 bpm, pulses → Babak 3), 77 Cycles b303cb62 (drums/arp → puncak 0:41). Refleksi: Gray 25c74293 (solo piano). Cek key cocok sebelum download WAV.
- [x] Sourcing SFX per peran (sci-fi whoosh, sub-impact, UI glass/hologram, telemetry, riser) dari library
- [x] Room tone / ambient bed konsisten (hospital-air loop, −54 dBFS)
- [x] Mix: EQ carving 1–4 kHz, ducking klip asli −6..−8 dB, pan agent, reverb ruang, −14 LUFS
- [x] QA: dead air = 0, telinga-HP 20/50/100 %, tidak ada 2–6 kHz menusuk

## 4. Visual + kinetic type v9
- [x] Daftar anchor words per kalimat (bahasa ikut audio) + timestamp suku kata
- [x] Komponen AnchorWord: snap–hantam–ease-out, posterize 8–12 fps, tekstur
- [x] Masking teks di belakang subjek/objek + tracking ke UI
- [x] Perbaiki visual tidak rapi dari Audit A (B3–B14 + feedback 00.16: orbit S05e, checklist S02e, teks narasumber bervariasi)
- [x] Render v9 + QC visual (visual_qc) + devil's advocate

## 5. Selesai
- [x] Update STATUS.md, push main, kirim PKS_v9 ke Irfan (2 Nov 03.00)

## Log 2 Nov 00.00
- Bed musik: `audio-v19/music_bed.py` (77 Cycles stems offset −16 s, DOX bass −4 st = C min, Dark Water piano dari 75,2 s). Ducking −6/−8 dB, carving 1–4 kHz −4 dB, trim per babak terukur.
- B14 flash diperbaiki (S02d/S02e match cut), bloom lain ≤ 40 %. `AnchorWord` di `remotion/src/lib/AnchorWord.tsx`.
- `ANCHORS-V9.md`: 45 anchor. Onset suku kata VO masih estimasi → ukur di gelombang.
- Codex (gpt-5.6-sol, Mac) membuat matte narasumber → `pks-studio/public/mattes/` + `SubjectMatte.tsx`.
- PENTING sinkron kode: repo `projects/.../remotion` vs Mac `pks-studio/remotion` (Mac punya perubahan lokal). Sinkronkan per file, jangan timpa.

## ALUR RENDER PER SEGMEN (keputusan Irfan 2 Nov 00.00)
Setiap perbaikan langsung dirender per segmen dan di-QC, baru render final sekali di akhir.
- Mac: `pks-studio/seg.sh <nama> <start_s> <end_s> [scale]` → bundle sekali (ulang hanya jika src berubah) → `seg/<nama>.mp4` dengan audio `seg/master19.wav`.
- Urutan segmen QC: S1 0–10 cold open · S2 10–22 · S3 22–41 · S4 41–55 agent · S5 55–75 Jensen/bridge/Altman · S6 75–103 · S7 103–132,8.
- Tiap segmen: visual_qc + lihat frame ≤ 960 px + cek audio → perbaiki → render ulang segmen itu saja.

## Log 2 Nov 01.33
- Bug sistemik diperbaiki: AnchorWord `at`/`until` kini frame ABSOLUT (sebelumnya anchor di 15 adegan tidak muncul).
- Matte narasumber dibuat di cloud (`tools/make_mattes.py`, rembg u2net_human_seg → VP9 alpha) → `public/mattes/*.webm` di Mac. Codex dihentikan (sandbox tanpa jaringan).
- SFX: `tools/sfxev_to_cues.py` memetakan penanda kode (SFXEV dari render segmen) → peran library; anti-spam (return-drag dibuang, snap ≥ 250 ms, maks 2/100 ms).
- QC segmen lolos: 0–10 (setelah fix Gates/remaja), 10–22, 22–41, orbit 85–92. Sedang: 41–55, 75–103, 103–133. Menunggu matte Altman/Jensen untuk 55–75.
- Pelajaran: job cloud wajib `run_in_background` (proses nohup mati saat giliran berakhir); render Mac dipantau dengan send_later 8–10 menit, bukan heartbeat 50 menit.

## Disk Mac (izin Irfan 2 Nov 02.00: jaga > 10 GB)
- Dihapus 02.01: cache wonder updater (2,6 GB), Brave, node-gyp, npm, uv, potongan tar _cloud-handoff → 9 → 13 GB.
- Offload: `Documents/Orange 4 Backups` (1,5 GB, 13.561 file) disalin ke Internxt `Personal/Mac-Offload-2026-11-02`. `fileproviderctl` di Mac ini tidak punya `evict` → upload tak bisa dibuktikan dari CLI. Asli BELUM dihapus; tunggu Irfan konfirmasi di app Internxt, lalu hapus asli + "Free up space" di Finder.
- Sinkron cloud→Mac: selalu stagedPath baru per sinkron (device_commit_files menyimpan cache per path; file lama sempat tertulis ulang 2 Nov).

- 02.13: s5 gagal (delayRender 28 s, matte Altman VP9 alpha 1080p). seg.sh/final.sh: --concurrency=4 --timeout=120000. chain9 = s5 lalu final.

- 02.36: FINAL_DONE + patch Altman. QC final: 132,8 s, 1080p30, −14,0 LUFS, TP −1,3, dead air 0. Patch ke-2 Altman (90 px, x100–775 | 1080) sedang.
- 03.00: patch Altman ke-3/4 (SINGLE/BILLION/COMPANY ditumpuk rata kanan di kiri kartu, frame 2120–2300). PKS_v9 terkirim. Menunggu review Irfan.
