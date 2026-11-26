---
id: "M19"
pola: SaaS Flow Scaffold & State Morph
pack: 04-ui-cutout-dataviz-visuals
kategori: layout
kategori_lain: [camera, typography]
trigger: alur produk SaaS bertahap; approval sequence; framework bertingkat; masalah acak berubah jadi sistem teratur
fungsi: [langkah, banding]
sumber: gabungan mekanik alur SaaS, scaffold framework, & dot-field
dilihat_bergerak: tidak
diukur: ya
alias: ["30", "33", "36", "84"]
vault: [../_vault/03-spatial-and-ui-layouts/30-gradient-word-to-object-morph.md, ../_vault/03-spatial-and-ui-layouts/33-dot-field-world-shift.md, ../_vault/03-spatial-and-ui-layouts/36-one-object-approval-sequence.md, ../_vault/03-spatial-and-ui-layouts/84-single-take-ui-scaffold.md]
---
### M19 · SaaS Flow Scaffold & State Morph
- **Trigger:** alur produk SaaS bertahap; approval sequence; framework bertingkat; masalah acak berubah jadi sistem teratur
- **Anti-Pattern:** Menampilkan puluhan node kecil identik yang memenuhi layar tanpa fokus (`contoh-gagal` 03/05), menggambar workflow bergaris kaku seperti diagram PPT, atau memotong kata raksasa ke tepi tanpa izin.
- **Invariant:** Visualisasikan kekacauan vs sistem lewat perubahan keadaan spasial (sebaran titik/kartu → terstruktur satu fokus atau tombol approval tunggal) dengan `react(i)` tidak rata dan satu fokus aktif per beat.
- **Primitives/Ref:** `SpatialDepthStage.tsx`, `SpatialAnchorCamera.tsx`, `curves.ts` (`CURVE.heavy`/`react`). · Vault: `../_vault/03-spatial-and-ui-layouts/30-gradient-word-to-object-morph.md` · `../_vault/03-spatial-and-ui-layouts/33-dot-field-world-shift.md` · `../_vault/03-spatial-and-ui-layouts/36-one-object-approval-sequence.md` · `../_vault/03-spatial-and-ui-layouts/84-single-take-ui-scaffold.md`
- **Gate:** `cek_komposisi.py` + `motion_lint.py` + `VIS-02` (alur masuk akal) PASS.
