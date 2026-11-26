---
id: "17"
pola: Diegetic Tag Explainer
pack: 04-ui-cutout-dataviz-visuals
kategori: layout
kategori_lain: [typography, camera]
trigger: explainer Vox-style: daftar objek/kategori satu per satu; tag diegetic; sisipan kata & ikon di judul
fungsi: [jelaskan, langkah]
sumber: editorial explainer · 30 fps
dilihat_bergerak: ya
diukur: ya
alias: []
vault: [../_vault/03-spatial-and-ui-layouts/17-diegetic-tag-explainer.md]
---
### 17 · Diegetic Tag Explainer
- **Trigger:** explainer Vox-style: daftar objek/kategori satu per satu; tag diegetic; sisipan kata & ikon di judul
- **Anti-Pattern:** Memakai aset 3D plastik/AI pada proyek bergaya 2D editorial, menaruh tag menutupi label lain, atau membiarkan ikon muncul tanpa suara tick/pop.
- **Invariant:** Bangun label tag diegetic 2D SVG/HTML dengan sumbu gerak terikat (`axis-locked`), sisipkan ikon/pil inline di dalam judul yang mendorong kata sekitar lewat spring, dan beri klik/pop ringan pada tiap tag.
- **Primitives/Ref:** `SpatialAnchorCamera.tsx`, `HighlighterSweep.tsx`, `curves.ts` (`CURVE.land`/`react`). · Vault: `../_vault/03-spatial-and-ui-layouts/17-diegetic-tag-explainer.md`
- **Gate:** `cek_komposisi.py` + `motion_lint.py` + `sfx_density.py` PASS.
