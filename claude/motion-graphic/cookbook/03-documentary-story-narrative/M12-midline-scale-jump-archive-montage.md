---
id: "M12"
pola: Midline Scale-Jump Archive Montage
pack: 03-documentary-story-narrative
kategori: typography
kategori_lain: [camera, layout]
trigger: narasi analitis atau pidato di atas montase arsip 16:9 dengan kata kunci meledak di garis tengah
fungsi: [penekanan]
sumber: gabungan kartu 86 dan 46 (duplikat mekanik garis tengah)
dilihat_bergerak: sebagian
diukur: ya
alias: ["86", "46"]
vault: [../_vault/02-typography-and-captions/86-midline-word-growth-montage.md, ../_vault/02-typography-and-captions/46-giant-word-scale-jump.md]
---
### M12 · Midline Scale-Jump Archive Montage
- **Trigger:** narasi analitis atau pidato di atas montase arsip 16:9 dengan kata kunci meledak di garis tengah
- **Anti-Pattern:** Memotong kata kunci isi keluar tepi kanvas tanpa alasan `bleed-display`, mengulang kartu jeda putih polos terlalu sering, atau menaruh caption kecil di atas foto ramai tanpa scrim.
- **Invariant:** Susun kata sambung kecil terukur di midline dan pecahkan kata klimaks dengan *scale jump* 4–10× di ruang aman; selingi kolase foto arsip ber-grid tipis atau kartu terang bertekstur sebagai jeda napas antar-babak.
- **Primitives/Ref:** `SpatialAnchorCamera.tsx`, `InvertFlash.tsx`, `Scrim.tsx`, `curves.ts` (`CURVE.land`/`heavy`). · Vault: `../_vault/02-typography-and-captions/86-midline-word-growth-montage.md` · `../_vault/02-typography-and-captions/46-giant-word-scale-jump.md`
- **Gate:** `teks_cek.py` + `kt_ocr.py` + `motion_lint.py` PASS.
