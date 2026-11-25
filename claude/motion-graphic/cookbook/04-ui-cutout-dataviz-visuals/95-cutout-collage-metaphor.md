---
id: "95"
pola: Cutout-Collage Metaphor
pack: 04-ui-cutout-dataviz-visuals
kategori: layout
kategori_lain: [typography, camera]
trigger: penjelasan konsep/paradoks lewat satu benda cutout foto/halftone di kanvas gradien bersih + prop interaktif
sumber: cutout halftone 9:16 · 51,7 dtk
dilihat_bergerak: ya
diukur: ya
alias: [cutout, collage, metaphor, halftones]
vault: [../_vault/03-spatial-and-ui-layouts/95-cutout-collage-metaphor.md]
---
### 95 · Cutout-Collage Metaphor
- **Trigger:** penjelasan konsep/paradoks lewat satu benda cutout foto/halftone di kanvas gradien bersih + prop interaktif
- **Anti-Pattern:** Menumpuk banyak stiker ramai tanpa satu fokus, merender gambar 3D AI untuk aset cutout, atau meninggalkan potongan halo kasar di tepi cutout.
- **Invariant:** Pasang 1 subjek photo-cutout nyata/halftone berbayangan lembut (±35–55% lebar) dengan `scale` 0,88→1 `CURVE.land` + drift ±4 px saat hold, dipasangkan jangkar judul + aksi `Kursor.tsx` di ketukan kata kerja.
- **Primitives/Ref:** `Kursor.tsx`, `MotionBlurWrapper.tsx`, `curves.ts` (`CURVE.land`/`drift`). · Vault: `../_vault/03-spatial-and-ui-layouts/95-cutout-collage-metaphor.md`
- **Gate:** `cek_komposisi.py` + still tepi cutout 100% + `sfx_density.py` (`taktil`/`mekanik`) PASS.
