---
id: "M20"
pola: Dataviz Bars, Counters & Tickers
pack: 04-ui-cutout-dataviz-visuals
kategori: layout
kategori_lain: [typography, sfx]
trigger: perbandingan bar chart; angka persentase/milestone berubah; pengumpulan biaya/logo berserakan
sumber: gabungan mekanik grafik batang, penghitung angka, & ticker
dilihat_bergerak: tidak
diukur: ya
alias: ["56", "57", "67", "81"]
vault: [../_vault/03-spatial-and-ui-layouts/56-bouncing-ball-bar-build.md, ../_vault/03-spatial-and-ui-layouts/57-nested-shape-morph-dataviz.md, ../_vault/02-typography-and-captions/67-morphing-card-number-counter.md, ../_vault/03-spatial-and-ui-layouts/81-object-ticker-burst.md]
---
### M20 · Dataviz Bars, Counters & Tickers
- **Trigger:** perbandingan bar chart; angka persentase/milestone berubah; pengumpulan biaya/logo berserakan
- **Anti-Pattern:** Melompatkan angka `0→999` dalam 1 frame, memakai ticker linear kaku saat aksi dramatis, membiarkan bar/grafik statis > 1 dtk, atau mengulang framing grafik yang sama tanpa variasi kamera.
- **Invariant:** Gunakan `Penghitung.tsx` (`±1 dtk` terkurva dengan `react` settle & glow/sub-hit di angka target), animasikan batang/kurva SVG bertahap mengikuti ucapan, dan ubah framing kamera pada kemunculan grafik kedua dst. (`B13b`).
- **Primitives/Ref:** `Penghitung.tsx`, `SpatialAnchorCamera.tsx`, `curves.ts` (`CURVE.land`/`drift`), `acak.ts`. · Vault: `../_vault/03-spatial-and-ui-layouts/56-bouncing-ball-bar-build.md` · `../_vault/03-spatial-and-ui-layouts/57-nested-shape-morph-dataviz.md` · `../_vault/02-typography-and-captions/67-morphing-card-number-counter.md` · `../_vault/03-spatial-and-ui-layouts/81-object-ticker-burst.md`
- **Gate:** `motion_lint.py` + `kt_ocr.py` + `sfx_density.py` (`tick` & `aksen`) PASS.
