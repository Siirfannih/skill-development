# AUTORUN PKS v9 — brief Irfan 1 Nov 2026 23.32 WITA (sumber kebenaran tugas ini)

Sesi baru: baca file ini + `STATUS.md` + `TODO-AUTORUN.md`. Jangan buka file lain kecuali ditunjuk.

## Peran Claude
Planner, sound designer, QC. Tugas otonom, persisten, bertahap sampai selesai. Boleh spawn sub-agent
(worker = Sonnet), boleh Codex/ChatGPT via terminal/PC server (model high tier sesekali), pakai RTK +
autocompact, pecah jadi task kecil, pasang trigger/heartbeat supaya tidak berhenti.

## Masalah v8 (PKS_v8.mp4, 132,8 s, 1080p30)
1. Beberapa visual kurang rapi, tidak sesuai brief/rencana awal — acuan: `GrokAgent/` di root repo.
2. SFX + backsound salah (krusial).

## Wajib pertama: 2 audit (paralel)
- A. Audit video v8 (visual + audio) → daftar kelemahan & ketidaksesuaian. → Claude utama.
- B. Audit repo skill-development: efisien & maksimal, tanpa file spam/tak berguna, tanpa plugin/tool
  yang berat saat load atau tidak efektif. → sub-agent. File yang dibuang **dipindah ke `_archive/`**,
  Irfan cek daftar dulu baru dihapus permanen.

## Kesalahan model sebelumnya (jangan diulang)
- Menganggap earshot sebagai source of truth — earshot hanya membantu mencocokkan judul sound.
- Membuat SFX sendiri (sintetis) — padahal ada ElevenLabs, Epidemic Sound, dan internet untuk download SFX yang cocok.
- Over-engineering / over-code — proses lama, output tidak sebanding.

## Diagnosis audio Irfan (kenapa fatal)
- Kontras ekstrem: 10 s awal klip wawancara bising → animasi grafis dengan noise floor nol mutlak.
- Tanpa BGM sebagai pengikat, tiap jeda napas jadi dead air.
- SFX UI/grafis terlalu minimalis, frekuensi tipis, kurang low-end dan reverb/ruang → animasi tak punya bobot taktil.
- Tanpa ambient, VO kering dan terisolasi, terasa draf yang belum di-mix.
- Isi ruang dengan room tone halus / soundscape nada rendah konsisten tanpa mengorbankan kejernihan VO.

## Rencana audio Irfan → `SOUND-PLAN-IRFAN-2NOV.md` (wajib dibaca)
Stems per babak: Riser di bawah cold open → hard drop → sub-drone 40–60 Hz + heartbeat → arpeggiator/ticking
clock + perkusi naik (otomasi dB) → piano/pad unresolved di refleksi. SFX: sci-fi whoosh/data glitch/digital
suction + sub-impact untuk teks besar; UI modern click/hologram tap/glass ping/telemetry untuk UI (pitch beda
per agent); shepard/synth riser + data blips untuk grafik naik. Mix: EQ carving 1–4 kHz di BGM/SFX, ducking
−6..−8 dB di bawah klip asli, panning agent (CEO 30 % L, CS 30 % R), reverb ruang.
Celah 0:55–1:15 tidak disebut → Claude memutuskan (jembatan Babak 3→4) dan mencatat alasannya.

## Visual + kinetic typography (micro-revision)
1. **Anchor words**: berhenti menyalin naskah. Layar hanya 1–3 kata kunci emosi per kalimat, raksasa, kata demi
   kata, tepat di milidetik suku katanya. **Bahasa ikut audio yang terdengar**: Inggris saat klip berita/Altman/
   Jensen/narsum, Indonesia saat VO.
2. **Spatial compositing & depth**: teks di belakang objek (masking/roto kepala subjek, bangunan, UI), motion
   tracking supaya teks tertancap pada objek / ikut scroll UI.
3. **Taktil**: posterize time 8–12 fps + tekstur grunge/paper cut-out/goresan **khusus anchor words**. UI asli,
   grafik, kamera tetap 30 fps mulus.
4. **Kurva agresif**: tanpa linear/fade malas. Cepat–Hantam–Lambat (hard snap/whip masuk, extreme ease-out).

## Keputusan dari tanya-jawab 1 Nov
- Anchor words: bahasa ikut audio (lihat di atas).
- Stop-motion + tekstur: anchor words saja.
- Sound: Claude pegang penuh; Gemini hanya second opinion QC yang diverifikasi alat ukur.
- Audit repo: pindah ke `_archive/` dulu.
- Perubahan = diff pada kode v8, bukan bangun ulang. VO tidak diregenerasi (playback 1,0).

## Standar Hybrid Motion (1 Nov 23.48)
Wajib dipenuhi sebagai barrier minimum: `claude/motion-graphic/references/hybrid-motion-standard.md`.
Flash radial putih di 0:32 = temuan B14.
