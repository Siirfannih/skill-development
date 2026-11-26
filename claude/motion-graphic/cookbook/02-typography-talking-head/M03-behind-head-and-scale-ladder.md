---
id: "M03"
pola: Behind-Head Slab & Scale Ladder
pack: 02-typography-talking-head
kategori: typography
kategori_lain: [camera, layout]
trigger: kata kunci raksasa di belakang kepala pembicara; scale ladder di dada; pill staircase klimaks
fungsi: [penekanan, hook]
sumber: gabungan mekanik oklusi kepala & tangga skala
dilihat_bergerak: ya
diukur: ya
alias: ["83", "59", "69", "78", "16", "43", "61", "51"]
vault: [../_vault/02-typography-and-captions/83-head-space-word-staging.md, ../_vault/02-typography-and-captions/59-occluded-giant-keyword-slam.md, ../_vault/02-typography-and-captions/69-behind-head-scale-ladder.md, ../_vault/02-typography-and-captions/78-roto-sandwiched-giant-word.md, ../_vault/02-typography-and-captions/16-silhouette-backed-verdict-word.md, ../_vault/02-typography-and-captions/43-size-ladder-chest-words.md, ../_vault/02-typography-and-captions/61-chest-caption-keyword-backdrop.md]
---
### M03 · Behind-Head Slab & Scale Ladder
- **Trigger:** kata kunci raksasa di belakang kepala pembicara; scale ladder di dada; pill staircase klimaks
- **Anti-Pattern:** Menaruh slab di atas wajah tanpa matte, meletakkan pengantar jauh dari sudut slab, memasang teks dada di baju bermotif, memakai lower-third terpisah, atau membiarkan KT tampil tanpa tick SFX.
- **Invariant:** Susun `latar → slab condensed (35–55% tinggi) → matte RVM (persepsi.py) → teks depan`; tempel pengantar kecil ≤ 0,5× tinggi hero; jika baju bermotif/latar terang, pindah ke ruang polos samping atau full-bleed slab (`M05`); satu penekanan per frasa.
- **Primitives/Ref:** `SpatialDepthStage.tsx`, `scripts/lego/persepsi.py`, `curves.ts` (`CURVE.land`/`whip`), keyframes `83-k1..k6`. · Vault: `../_vault/02-typography-and-captions/83-head-space-word-staging.md` · `../_vault/02-typography-and-captions/59-occluded-giant-keyword-slam.md` · `../_vault/02-typography-and-captions/69-behind-head-scale-ladder.md` · `../_vault/02-typography-and-captions/78-roto-sandwiched-giant-word.md` · `../_vault/02-typography-and-captions/16-silhouette-backed-verdict-word.md` · `../_vault/02-typography-and-captions/43-size-ladder-chest-words.md` · `../_vault/02-typography-and-captions/61-chest-caption-keyword-backdrop.md`
- **Gate:** `kt_ocr.py` + `cek_komposisi.py` (`WAJAH` 0) + `sfx_density.py` (`tick` sesuai mode `kt_tick`) PASS.
