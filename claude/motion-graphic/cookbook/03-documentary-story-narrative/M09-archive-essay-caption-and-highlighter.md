---
id: "M09"
pola: Archive Essay Caption & Highlighter
pack: 03-documentary-story-narrative
kategori: typography
kategori_lain: [layout, texture]
trigger: narasi tokoh atau sejarah di atas foto arsip; kutipan tulisan yang disorot stabilo
sumber: gabungan mekanik caption arsip & sapuan stabilo
dilihat_bergerak: ya
diukur: ya
alias: ["92", "04", "48"]
vault: [../_vault/02-typography-and-captions/92-negative-space-cumulative-caption.md, ../_vault/02-typography-and-captions/04-centerline-weight-contrast-caption.md, ../_vault/02-typography-and-captions/48-highlighter-caption-box.md]
---
### M09 · Archive Essay Caption & Highlighter
- **Trigger:** narasi tokoh atau sejarah di atas foto arsip; kutipan tulisan yang disorot stabilo
- **Anti-Pattern:** Memburamkan seluruh dokumen bukti hingga tak terbaca, menaruh teks tipis langsung di atas tekstur batu/kertas ramai (`contoh-gagal` 18), atau memakai opacity fade-in polos.
- **Invariant:** Bangun ulang kutipan/halaman secara tajam dan sorot kalimat kunci dengan `HighlighterSweep.tsx` (`multiply`/solid) tepat di detik ucapan; di foto arsip polos pakai ruang negatif bertumpuk dengan `Scrim.tsx` bila p10 kontras < 4,5:1.
- **Primitives/Ref:** `HighlighterSweep.tsx`, `Scrim.tsx`, `SpatialAnchorCamera.tsx`, `curves.ts` (`CURVE.reveal`). · Vault: `../_vault/02-typography-and-captions/92-negative-space-cumulative-caption.md` · `../_vault/02-typography-and-captions/04-centerline-weight-contrast-caption.md` · `../_vault/02-typography-and-captions/48-highlighter-caption-box.md`
- **Gate:** `teks_cek.py` + `kt_ocr.py` + cek kontras p10 ≥ 4,5:1 PASS.
