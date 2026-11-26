---
id: "M06"
pola: Talking-Head Anchored Captions
pack: 02-typography-talking-head
kategori: typography
kategori_lain: [camera, layout]
trigger: caption jangkar di ruang tetap pembicara (dada, atas kepala, mulut) saat shot atau frasa berganti
fungsi: [penekanan]
sumber: gabungan mekanik caption jangkar talking head
dilihat_bergerak: ya
diukur: ya
alias: ["90", "91", "45", "60", "15"]
vault: [../_vault/02-typography-and-captions/90-caption-anchored-shot-swap.md, ../_vault/02-typography-and-captions/91-headroom-phrase-swap-caption.md, ../_vault/02-typography-and-captions/45-ceiling-headline-stack.md, ../_vault/02-typography-and-captions/60-mouth-level-word-flank.md, ../_vault/02-typography-and-captions/15-light-fill-caption-card.md]
---
### M06 · Talking-Head Anchored Captions
- **Trigger:** caption jangkar di ruang tetap pembicara (dada, atas kepala, mulut) saat shot atau frasa berganti
- **Anti-Pattern:** Mendorong teks terlalu rendah ke 8% bawah frame, membiarkan blok lama fade keluar bertumpuk dengan blok baru (`TKS-11`), atau menaruh teks di baju bermotif tanpa scrim/latar bersih.
- **Invariant:** Jaga 1 blok narasi aktif per waktu (1–3 kata, maks 2 baris, baris terpendek ≥ 85% terpanjang) di ruang headroom/dada yang bebas; potong blok lama tepat saat blok baru masuk dan variasikan framing tiap ≤ 2,2 dtk.
- **Primitives/Ref:** `TeksBlok.tsx`, `Scrim.tsx`, `curves.ts` (`CURVE.reveal`), `scripts/lego/teks_plan.py`. · Vault: `../_vault/02-typography-and-captions/90-caption-anchored-shot-swap.md` · `../_vault/02-typography-and-captions/91-headroom-phrase-swap-caption.md` · `../_vault/02-typography-and-captions/45-ceiling-headline-stack.md` · `../_vault/02-typography-and-captions/60-mouth-level-word-flank.md` · `../_vault/02-typography-and-captions/15-light-fill-caption-card.md`
- **Gate:** `kt_check.py` + `caption_lines.py` + `teks_cek.py` PASS.
