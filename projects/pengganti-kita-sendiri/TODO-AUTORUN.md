# TODO autorun PKS v9 (centang + tanggal saat selesai; tulis catatan singkat di bawah item)

## 0. Setup
- [x] Brief dikunci di `AUTORUN-2NOV.md`, rencana audio di `SOUND-PLAN-IRFAN-2NOV.md`
- [x] Akses folder Mac `~/Documents/Skill-Development/AI-Video` (granted 1 Nov) — petakan media + proyek Remotion
- [x] Tentukan tempat render (Mac via Desktop Commander vs cloud) + cek Codex CLI di Mac
  - Render di Mac (M2 16 GB): pks-studio/remotion punya node_modules; codex 0.163, rtk, ffmpeg ada.
- [x] Heartbeat/trigger lanjutan aktif

## 1. Audit A — video v8 (Claude utama)
- [ ] Peta timeline v8: beat, kalimat VO, klip, scene (dari `remotion/src/timeline.json`, `beats.json`)
- [x] Audit audio terukur: noise floor per babak, dead air (> 300 ms sunyi), spektrum SFX, LUFS
- [x] Audit visual: frame per beat vs `GrokAgent/reference-videos/*` + storyboard; daftar yang tidak rapi
- [x] Tulis `AUDIT-V8-2NOV.md` (temuan → prioritas → fix)

## 2. Audit B — repo skill-development (sub-agent)
- [x] Laporan `AUDIT-REPO-2NOV.md` + file kandidat dipindah ke `_archive/` (tidak dihapus)

## 3. Audio v9
- [ ] Cue sheet babak (riser / drone+heartbeat / arp+perkusi / jembatan / piano-pad)
- [ ] Sourcing musik/stems: Epidemic (stems) → ElevenLabs → internet. Tanpa sintesis.
  - Kandidat palet satu artis (Lennon Hutton): DOX 07e2e4ec (74 bpm, bass+instruments → drone Babak 2), Mindscape 4cb08b97 (108 bpm, pulses → Babak 3), 77 Cycles b303cb62 (drums/arp → puncak 0:41). Refleksi: Gray 25c74293 (solo piano). Cek key cocok sebelum download WAV.
- [ ] Sourcing SFX per peran (sci-fi whoosh, sub-impact, UI glass/hologram, telemetry, riser) dari library
- [ ] Room tone / ambient bed konsisten
- [ ] Mix: EQ carving 1–4 kHz, ducking klip asli −6..−8 dB, pan agent, reverb ruang, −14 LUFS
- [ ] QA: dead air = 0, telinga-HP 20/50/100 %, tidak ada 2–6 kHz menusuk

## 4. Visual + kinetic type v9
- [ ] Daftar anchor words per kalimat (bahasa ikut audio) + timestamp suku kata
- [ ] Komponen AnchorWord: snap–hantam–ease-out, posterize 8–12 fps, tekstur
- [ ] Masking teks di belakang subjek/objek + tracking ke UI
- [ ] Perbaiki visual tidak rapi dari Audit A
- [ ] Render v9 + QC visual (visual_qc) + devil's advocate

## 5. Selesai
- [ ] Update STATUS.md, push main, kirim PKS_v9 ke Irfan
