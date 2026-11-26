---
id: "14"
pola: Tile-Grid Cut Wipe & Flash Grid
pack: 01-motion-camera-transitions
kategori: camera
kategori_lain: [typography, layout]
trigger: flash grid wipe antar B-roll atau antar demo berenergi tinggi; kata isi di sekitar pembicara
fungsi: [transisi, penekanan]
sumber: tutorial editing 4:3 · 34,3 dtk
dilihat_bergerak: ya
diukur: ya
alias: []
vault: [../_vault/01-camera-and-transitions/14-tile-grid-cut-wipe.md]
---
### 14 · Tile-Grid Cut Wipe & Flash Grid
- **Trigger:** flash grid wipe antar B-roll atau antar demo berenergi tinggi; kata isi di sekitar pembicara
- **Anti-Pattern:** Memanjangkan wipe grid > 7 frame hingga lambat, mengulang > 3× per 10 dtk, fade-in polos, atau face-orbit saat kamera genggam bergerak.
- **Invariant:** Gunakan `GridFlashReveal.tsx` 5–7 frame dengan kilat putih/brand di f3 (tepi tajam tanpa blur); kata orbit di sekitar kepala mensyaratkan tripod statis & ruang kiri-kanan polos; pasangan hero memakai rasio tinggi ≥ 5× pengantar.
- **Primitives/Ref:** `GridFlashReveal.tsx`, `FlashCut.tsx`, `curves.ts` (`CURVE.land`/`whip`), keyframes `14-flash-grid-urutan.jpg`. · Vault: `../_vault/01-camera-and-transitions/14-tile-grid-cut-wipe.md`
- **Gate:** `motion_lint.py` PASS + transisi ≤ 7 frame tanpa frame kosong + `sfx_density.py` (`transisi` & `tick`) PASS.
