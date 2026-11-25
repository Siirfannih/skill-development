---
id: "M21"
pola: Change-Marked SFX & Pop Mapping
pack: 05-audio-sfx-pacing
kategori: sfx
kategori_lain: [camera, typography]
trigger: setiap perubahan visual/gestur/KT memicu bunyi sesuai bentuk gerak; kepadatan SFX invers terhadap bicara
sumber: gabungan peta cue berbasis perubahan & pop event
dilihat_bergerak: ya
diukur: ya
alias: ["93", "24"]
vault: [../_vault/05-sfx-and-audio-mapping/93-change-marked-sound-hierarchy.md, ../_vault/05-sfx-and-audio-mapping/24-visual-event-pop-mapping.md]
---
### M21 · Change-Marked SFX & Pop Mapping
- **Trigger:** setiap perubahan visual/gestur/KT memicu bunyi sesuai bentuk gerak; kepadatan SFX invers terhadap bicara
- **Anti-Pattern:** Mengisi SFX pada setiap hard cut biasa, menumpuk 324 klik identik di level tinggi tanpa variasi, mematikan bunyi saat gerak masih berjalan (`SFX-01`), atau memakai palet terlarang (kayu/thock/felt/koin/8-bit).
- **Invariant:** Petakan 1 cue per objek/perubahan di `objects.json` dengan famili dari `FAMILI.md` (bentuk bunyi mengikuti durasi & arah gestur); jalankan `kt_tick` sesuai mode (`per-word` 2–4 varian `rate` 0,95–1,05 atau `accent-only`) serta jaga jarak ≥ 100 ms & whoosh ≥ 1 dtk.
- **Primitives/Ref:** `SmoothAudioClip.tsx`, `scripts/audio/sfx_cari.py`, `sfx_vet.py`, `sfx_span.py`. · Vault: `../_vault/05-sfx-and-audio-mapping/93-change-marked-sound-hierarchy.md` · `../_vault/05-sfx-and-audio-mapping/24-visual-event-pop-mapping.md`
- **Gate:** `sfx_density.py` + `sfx_span.py` + `audio_phone.py --gate` PASS.
