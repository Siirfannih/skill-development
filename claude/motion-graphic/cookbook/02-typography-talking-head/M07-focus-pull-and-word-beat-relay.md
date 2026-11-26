---
id: "M07"
pola: Focus-Pull & Word-Beat Relay
pack: 02-typography-talking-head
kategori: typography
kategori_lain: [camera, layout]
trigger: kalimat koreksi bukan X tapi Y; relay kata per beat di pusat frame; teks blur ke tajam
fungsi: [balik, penekanan]
risiko: "relay kata di tengah frame berulang > 3 beat = layout sama berulang (S-V31)"
sumber: gabungan mekanik focus-pull & relay kata pusat
dilihat_bergerak: ya
diukur: ya
alias: ["87", "07", "40", "49", "72", "73", "75"]
vault: [../_vault/02-typography-and-captions/87-focus-pull-word-stack.md, ../_vault/02-typography-and-captions/07-word-per-beat-color-build.md, ../_vault/02-typography-and-captions/40-fixed-center-sentence-relay.md, ../_vault/02-typography-and-captions/49-typed-sentence-punch-in.md, ../_vault/02-typography-and-captions/72-soft-gradient-word-stage.md, ../_vault/02-typography-and-captions/73-beat-locked-word-build.md, ../_vault/02-typography-and-captions/75-single-word-center-beat.md]
---
### M07 · Focus-Pull & Word-Beat Relay
- **Trigger:** kalimat koreksi bukan X tapi Y; relay kata per beat di pusat frame; teks blur ke tajam
- **Anti-Pattern:** Mencampur 3 perlakuan huruf dalam satu baris (regular + bold + serif italic sekaligus), membiarkan dua frasa sama tajam berebut fokus (`TKS-01`), atau menggeser kata yang sudah tampil saat kata baru masuk.
- **Invariant:** Gunakan satu keluarga gaya per frasa dengan kontras value/fokus jelas (kata aktif tajam 100%, kata lewat turun value/blur); jika `blur→tajam` dipakai, padukan dengan gerak `scale`/`translate` lewat `CURVE.reveal` dan lock lebar wadah frasa.
- **Primitives/Ref:** `MotionBlurWrapper.tsx`, `TeksBlok.tsx`, `LightSweep.tsx`, `curves.ts`, keyframes `87-k1..k9`. · Vault: `../_vault/02-typography-and-captions/87-focus-pull-word-stack.md` · `../_vault/02-typography-and-captions/07-word-per-beat-color-build.md` · `../_vault/02-typography-and-captions/40-fixed-center-sentence-relay.md` · `../_vault/02-typography-and-captions/49-typed-sentence-punch-in.md` · `../_vault/02-typography-and-captions/72-soft-gradient-word-stage.md` · `../_vault/02-typography-and-captions/73-beat-locked-word-build.md` · `../_vault/02-typography-and-captions/75-single-word-center-beat.md`
- **Gate:** `kt_check.py` + `kt_ocr.py` + `motion_lint.py` PASS.
