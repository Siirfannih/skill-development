---
id: "M11"
pola: Essay Archive Intercut & Spotlight
pack: 03-documentary-story-narrative
kategori: typography
kategori_lain: [camera, layout]
trigger: esai opini/analogi sejarah ber-intercut bukti arsip, klip, dan kata kunci sorot bertahap
fungsi: [bukti, penekanan]
sumber: gabungan mekanik intercut esai & spotlight kutipan
dilihat_bergerak: ya
diukur: ya
alias: ["89", "32", "77", "52", "54"]
vault: [../_vault/02-typography-and-captions/89-block-reveal-essay-montage.md, ../_vault/01-camera-and-transitions/32-presenter-archive-intercut.md, ../_vault/02-typography-and-captions/77-brightness-spotlight-caption.md]
---
### M11 · Essay Archive Intercut & Spotlight
- **Trigger:** esai opini/analogi sejarah ber-intercut bukti arsip, klip, dan kata kunci sorot bertahap
- **Anti-Pattern:** Menampilkan foto/klip orang lain yang mulutnya berbicara saat VO milik pembicara utama (`TKS-12`), membiarkan frasa menyeberang ke wajah orang lain (`TKS-13`), atau memakai kata pengisi umum.
- **Invariant:** Sandingkan klaim naskah langsung dengan bukti visual (arsip bisu, tangan, dokumen) per frasa; gunakan *block reveal* (`CURVE.reveal`) atau *brightness spotlight* di antara cut dengan ritme kontras (hook rapat → tubuh tenang).
- **Primitives/Ref:** `HighlighterSweep.tsx`, `WhipPanTransition.tsx`, `SceneChain.tsx`, `curves.ts`. · Vault: `../_vault/02-typography-and-captions/89-block-reveal-essay-montage.md` · `../_vault/01-camera-and-transitions/32-presenter-archive-intercut.md` · `../_vault/02-typography-and-captions/77-brightness-spotlight-caption.md`
- **Gate:** `frame_audit.py` bebas `TKS-12`/`TKS-13` + `motion_lint.py` PASS.
