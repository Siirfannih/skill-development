# TODO autorun PKS v9 (centang + tanggal saat selesai; tulis catatan singkat di bawah item)

## 0. Setup
- [x] Brief dikunci di `AUTORUN-2NOV.md`, rencana audio di `SOUND-PLAN-IRFAN-2NOV.md`
- [ ] Akses folder Mac `~/Documents/Skill-Development/AI-Video` (granted 1 Nov) — petakan media + proyek Remotion
- [ ] Tentukan tempat render (Mac via Desktop Commander vs cloud) + cek Codex CLI di Mac
- [ ] Heartbeat/trigger lanjutan aktif

## 1. Audit A — video v8 (Claude utama)
- [ ] Peta timeline v8: beat, kalimat VO, klip, scene (dari `remotion/src/timeline.json`, `beats.json`)
- [ ] Audit audio terukur: noise floor per babak, dead air (> 300 ms sunyi), spektrum SFX, LUFS
- [ ] Audit visual: frame per beat vs `GrokAgent/reference-videos/*` + storyboard; daftar yang tidak rapi
- [ ] Tulis `AUDIT-V8-2NOV.md` (temuan → prioritas → fix)

## 2. Audit B — repo skill-development (sub-agent)
- [ ] Laporan `AUDIT-REPO-2NOV.md` + file kandidat dipindah ke `_archive/` (tidak dihapus)

## 3. Audio v9
- [ ] Cue sheet babak (riser / drone+heartbeat / arp+perkusi / jembatan / piano-pad)
- [ ] Sourcing musik/stems: Epidemic (stems) → ElevenLabs → internet. Tanpa sintesis.
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
