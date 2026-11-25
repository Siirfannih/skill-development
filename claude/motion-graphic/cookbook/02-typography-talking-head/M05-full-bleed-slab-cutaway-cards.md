---
id: "M05"
pola: Full-Bleed Slab & Cutaway Cards
pack: 02-typography-talking-head
kategori: typography
kategori_lain: [layout, camera]
trigger: kata punchline penuh layar; kartu warna datar cutaway saat ucapan memuncak atau berganti gagasan
sumber: gabungan mekanik full-bleed slab & cutaway card
dilihat_bergerak: ya
diukur: ya
alias: ["85", "03", "38", "79", "64"]
vault: [../_vault/02-typography-and-captions/85-full-bleed-slab-word-cuts.md, ../_vault/02-typography-and-captions/03-flat-color-giant-type-cards.md, ../_vault/02-typography-and-captions/38-giant-word-mouth-cover.md, ../_vault/02-typography-and-captions/79-keyword-cutaway-card.md, ../_vault/02-typography-and-captions/64-stepped-label-poster-loop.md]
---
### M05 · Full-Bleed Slab & Cutaway Cards
- **Trigger:** kata punchline penuh layar; kartu warna datar cutaway saat ucapan memuncak atau berganti gagasan
- **Anti-Pattern:** Menciutkan punchline ke dalam kotak/inset kecil, membiarkan pita subtitle bawah tetap hidup di belakang slab, atau menempatkan kata di atas mulut saat kalimat panjang.
- **Invariant:** Potong penuh keluar dari footage ke kanvas warna solid/merek saat punchline atau vonis (1–3 kata raksasa), atau pakai cutaway card singkat yang langsung kembali ke pembicara di onset kalimat berikutnya; nol subtitle pita bawah.
- **Primitives/Ref:** `FlashCut.tsx`, `InvertFlash.tsx`, `TeksBlok.tsx`, `curves.ts`, keyframes `85-k9..k11`. · Vault: `../_vault/02-typography-and-captions/85-full-bleed-slab-word-cuts.md` · `../_vault/02-typography-and-captions/03-flat-color-giant-type-cards.md` · `../_vault/02-typography-and-captions/38-giant-word-mouth-cover.md` · `../_vault/02-typography-and-captions/79-keyword-cutaway-card.md` · `../_vault/02-typography-and-captions/64-stepped-label-poster-loop.md`
- **Gate:** `kt_ocr.py` + `caption_lines.py` (`PITA` 0) + `sfx_density.py` (`aksen`/`tick`) PASS.
