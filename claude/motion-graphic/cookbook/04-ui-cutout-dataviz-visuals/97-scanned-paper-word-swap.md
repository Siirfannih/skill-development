---
id: "97"
pola: Scanned-Paper Word Swap
pack: 04-ui-cutout-dataviz-visuals
kategori: typography
kategori_lain: [texture, layout]
trigger: monolog faceless curhat/ragu di mana tiap kata/frasa punya visual kertas/stop-motion dan medium berbeda
sumber: stop-motion kertas · 30 fps
dilihat_bergerak: ya
diukur: ya
alias: [kertas scan kata per kata, stop-motion kertas]
vault: [../_vault/02-typography-and-captions/97-scanned-paper-word-swap.md]
---
### 97 · Scanned-Paper Word Swap
- **Trigger:** monolog faceless curhat/ragu di mana tiap kata/frasa punya visual kertas/stop-motion dan medium berbeda
- **Anti-Pattern:** Menggunakan satu tekstur kertas statis berulang di semua beat tanpa variasi medium, melanggar kontras teks di atas tekstur ramai, atau membiarkan gerak stop-motion memakai `Math.random()`.
- **Invariant:** Rancang komposisi halaman dengan slot kata terukur, swap antar-medium taktil (kertas scan, sobekan, coretan, stempel) tepat di onset kata, dan gunakan PRNG berbiji (`acak.ts`) + `onTwos` deterministik dengan foley kertas (`Pilar 4`).
- **Primitives/Ref:** `acak.ts`, `Scrim.tsx`, `TeksBlok.tsx`, `curves.ts`. · Vault: `../_vault/02-typography-and-captions/97-scanned-paper-word-swap.md`
- **Gate:** `kt_ocr.py` + `sfx_density.py` (`taktil` & `tick`) + cek kontras p10 ≥ 4,5:1 PASS.
