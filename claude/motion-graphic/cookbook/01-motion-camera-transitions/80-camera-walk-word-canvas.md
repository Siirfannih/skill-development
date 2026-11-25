---
id: "80"
pola: Camera-Walk Word Canvas
pack: 01-motion-camera-transitions
kategori: camera
kategori_lain: [typography, layout]
trigger: esai ide atau opini bernarasi tanpa wajah; kontras dua sisi; transisi teks ke bukti UI
sumber: word canvas walk · 30 fps
dilihat_bergerak: tidak
diukur: ya
alias: []
vault: [../_vault/01-camera-and-transitions/80-camera-walk-word-canvas.md]
---
### 80 · Camera-Walk Word Canvas
- **Trigger:** esai ide atau opini bernarasi tanpa wajah; kontras dua sisi; transisi teks ke bukti UI
- **Anti-Pattern:** Memakai fade-in 6 frame pada kata yang ditemui kamera, menggeser teks dunia melawan kamera, atau memotong huruf ucapan di tepi kanvas.
- **Invariant:** Kunci semua kata dan grafik di kanvas 2D `Papan.tsx` sementara kamera `CURVE.heavy` berjalan dari titik ke titik; kata terungkap lewat mask/clip-path tepat saat kamera tiba tanpa fade polos; teks isi tetap di zona aman 5%.
- **Primitives/Ref:** `Papan.tsx`, `SpatialAnchorCamera.tsx`, `curves.ts` (`CURVE.heavy`), keyframes `80-k1..k7`. · Vault: `../_vault/01-camera-and-transitions/80-camera-walk-word-canvas.md`
- **Gate:** `GRK-02` (teks dunia stabil 0 px terhadap kanvas) + `motion_lint.py` + `teks_cek.py` PASS.
