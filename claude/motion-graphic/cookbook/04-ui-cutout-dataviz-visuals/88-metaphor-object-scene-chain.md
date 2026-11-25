---
id: "88"
pola: Metaphor-Object Scene Chain
pack: 04-ui-cutout-dataviz-visuals
kategori: layout
kategori_lain: [typography, texture]
trigger: klaim bukan X tapi Y dijelaskan lewat satu benda diagram 2D; rantai fakta tiap kalimat ganti benda
sumber: diagram esai 2D · 30 fps
dilihat_bergerak: ya
diukur: ya
alias: []
vault: [../_vault/03-spatial-and-ui-layouts/88-metaphor-object-scene-chain.md]
---
### 88 · Metaphor-Object Scene Chain
- **Trigger:** klaim bukan X tapi Y dijelaskan lewat satu benda diagram 2D; rantai fakta tiap kalimat ganti benda
- **Anti-Pattern:** Menggambar kiasan ucapan secara harfiah sebagai adegan konyol (`D22b`), memakai render 3D mentah, atau membiarkan benda diagram diam membeku > 1 dtk.
- **Invariant:** Pilih bentuk penjelas dari kata kerja aksi (`exploded view`, `stick figure`, `line-art`, `graph`, `map-route`), hubungkan dua bagian dengan busur tergambar, dan jaga transisi benda terurai/morph lewat `curves.ts`.
- **Primitives/Ref:** `SpatialDepthStage.tsx`, `HighlighterSweep.tsx`, `curves.ts` (`CURVE.drift`/`reveal`). · Vault: `../_vault/03-spatial-and-ui-layouts/88-metaphor-object-scene-chain.md`
- **Gate:** `board.py` (`metafora` terisi penuh) + `motion_lint.py` + `sfx_density.py` PASS.
