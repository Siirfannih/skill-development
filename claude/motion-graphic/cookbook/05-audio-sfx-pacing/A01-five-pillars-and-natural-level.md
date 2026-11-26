---
id: "A01"
pola: Five Pillars & Relative Mix Standard
pack: 05-audio-sfx-pacing
kategori: sfx
kategori_lain: []
trigger: merancang seluruh lapisan audio dari nol dan menyeimbangkan level SFX, bed, dan VO agar lolos speaker HP
fungsi: [audio]
sumber: sintesis standar 5 pilar & level relatif VO
dilihat_bergerak: ya
diukur: ya
alias: []
vault: [../_vault/05-sfx-and-audio-mapping/93-change-marked-sound-hierarchy.md]
---
### A01 · Five Pillars & Relative Mix Standard
- **Trigger:** merancang seluruh lapisan audio dari nol dan menyeimbangkan level SFX, bed, dan VO agar lolos speaker HP
- **Anti-Pattern:** Melemahkan seluruh SFX ke −18…−27 dB sebelum mix sementara musik dibiarkan keras, meninggalkan lubang senyap digital (< −45 dBFS per 100 ms) di luar hening dramatis tertulis, atau memakai SFX tajam 2–6 kHz.
- **Invariant:** Terapkan 5 Pilar (`bed`, `transisi`, `tick`, `taktil`, `aksen`) dari `~/sfx/SFXIrfan` / Tier-2 berlisensi; mulai SFX di `0 dB` pre-fader dan posisikan di mix akhir `−2…−6 dB` (transisi/aksen) & `−12…−18 dB` (tick/foley) relatif VO; potong di jeda sunyi atau fade-out kosinus 150–400 ms (nol fade-in di serangan transien).
- **Primitives/Ref:** `guide/sfx/FAMILI.md`, `SFXIRFAN.md`, `EPIDEMIC.md`, `scripts/audio/ears.py`, `sfx_comfort.py`. · Vault: `../_vault/05-sfx-and-audio-mapping/93-change-marked-sound-hierarchy.md`
- **Gate:** `audio_order.py check` + `sfx_density.py` + `audio_phone.py --gate` (harsh 0, clarity ≥ 8 dB) PASS.
