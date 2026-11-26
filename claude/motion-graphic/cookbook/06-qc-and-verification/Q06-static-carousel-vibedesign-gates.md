---
id: "Q06"
pola: Static Carousel (`vibedesign`) 4-Judge Gates
pack: 06-qc-and-verification
kategori: qc
kategori_lain: [layout, typography]
trigger: produksi desain statis carousel Instagram, poster, atau cover berbasis HTML/CSS/SVG → PNG 2×
fungsi: [qc]
sumber: sintesis 4 juri otomatis vibedesign
dilihat_bergerak: ya
diukur: ya
alias: []
vault: []
---
### Q06 · Static Carousel (`vibedesign`) 4-Judge Gates
- **Trigger:** produksi desain statis carousel Instagram, poster, atau cover berbasis HTML/CSS/SVG → PNG 2×
- **Anti-Pattern:** Mengeluarkan slide dengan urutan baca melompat, > 2 elemen besar per slide, > 2 keluarga huruf tanpa peran, elemen sekunder tepi menyentuh teks utama, atau kontras teks di bawah ambang.
- **Invariant:** Jalankan alur 5 tahap `vibedesign/DESIGN-CORE.md` (Pesan → Racik → Sketsa uji juling → Build HTML/SVG → Export PNG 2× Playwright) dan loloskan seluruh 4 juri otomatis (teks, kontras, hierarki, aset).
- **Primitives/Ref:** `claude/vibedesign/DESIGN-CORE.md`, `claude/vibedesign/juri/`, `claude/vibedesign/cookbook/01..06`. · Vault: `../_vault/03-spatial-and-ui-layouts/95-cutout-collage-metaphor.md`
- **Gate:** Seluruh 4 juri `vibedesign` PASS + PNG 2× diperiksa visual.
