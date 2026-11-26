---
id: "M18"
pola: UI-Staged Cursor & Component Morph
pack: 04-ui-cutout-dataviz-visuals
kategori: layout
kategori_lain: [camera, typography]
trigger: panggung UI produk dengan kursor aktif; prompt ke hasil; komponen UI berubah mengikuti kalimat VO
fungsi: [langkah, bukti]
sumber: gabungan mekanik UI showreel, kursor, & morph komponen
dilihat_bergerak: tidak
diukur: ya
alias: ["05", "28", "68", "71", "50", "9", "42"]
vault: [../_vault/03-spatial-and-ui-layouts/05-ui-staged-sentence-props.md, ../_vault/03-spatial-and-ui-layouts/28-cursor-threaded-ui-showreel.md, ../_vault/02-typography-and-captions/68-design-tool-text-edit-sentences.md, ../_vault/03-spatial-and-ui-layouts/71-ui-component-morph-chain.md]
---
### M18 · UI-Staged Cursor & Component Morph
- **Trigger:** panggung UI produk dengan kursor aktif; prompt ke hasil; komponen UI berubah mengikuti kalimat VO
- **Anti-Pattern:** Menganimasikan kartu UI sebagai balok mati tanpa koreografi lapis internal, menggerakkan kursor lurus tanpa overshoot/tekan, memakai crossfade 4–6 frame antar isi kartu, atau membuat SaaS fiktif yang tidak diminta brief.
- **Invariant:** Beri koreografi bertahap internal per komponen (`container → +3f header → +3f konten → +3f badge`), gerakkan `Kursor.tsx` melengkung dengan `hover → press 0,95 → rebound` dan reaksi elemen tetangga, serta morph/wipe konten lewat `curves.ts`.
- **Primitives/Ref:** `Kursor.tsx`, `SpatialAnchorCamera.tsx`, `curves.ts` (`CURVE.land`/`whip`/`react`). · Vault: `../_vault/03-spatial-and-ui-layouts/05-ui-staged-sentence-props.md` · `../_vault/03-spatial-and-ui-layouts/28-cursor-threaded-ui-showreel.md` · `../_vault/02-typography-and-captions/68-design-tool-text-edit-sentences.md` · `../_vault/03-spatial-and-ui-layouts/71-ui-component-morph-chain.md`
- **Gate:** `VIS-04` (kursor di dalam bbox tombol target) + `motion_lint.py` + `sfx_density.py` (`tick`) PASS.
