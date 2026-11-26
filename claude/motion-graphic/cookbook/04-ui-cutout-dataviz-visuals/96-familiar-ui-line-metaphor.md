---
id: "96"
pola: Familiar-UI Line Metaphor
pack: 04-ui-cutout-dataviz-visuals
kategori: layout
kategori_lain: [typography, camera, texture]
trigger: kalimat VO tentang alat/kebiasaan digital diperankan UI harian frameless; typo lalu dibetulkan; polarity flip
fungsi: [jelaskan, balik]
sumber: UI metaphor 30 fps
dilihat_bergerak: ya
diukur: ya
alias: []
vault: [../_vault/03-spatial-and-ui-layouts/96-familiar-ui-line-metaphor.md]
---
### 96 · Familiar-UI Line Metaphor
- **Trigger:** kalimat VO tentang alat/kebiasaan digital diperankan UI harian frameless; typo lalu dibetulkan; polarity flip
- **Anti-Pattern:** Membungkus UI harian ke dalam bezel iPhone fisik atau membuat mockup SaaS fiktif yang tidak disebut brief, menaruh kata narasi ke kolom prompt saat bukan aksi ketik, atau memakai opacity fade lambat saat flip terang-gelap.
- **Invariant:** Tampilkan 1 UI familier frameless per kalimat (search bar, chat bubble, kanvas, typo-to-correction) yang direkonstruksi di kode; lakukan flip polaritas terang↔gelap dalam 0–2 frame di ketukan kata negasi/koreksi.
- **Primitives/Ref:** `Kursor.tsx`, `FlashCut.tsx`, `InvertFlash.tsx`, `curves.ts`. · Vault: `../_vault/03-spatial-and-ui-layouts/96-familiar-ui-line-metaphor.md`
- **Gate:** `TKS-14` (narasi tidak bocor ke input UI) + `teks_cek.py` + `sfx_density.py` PASS.
