---
id: "65"
pola: Camera Dive Into UI
pack: 01-motion-camera-transitions
kategori: camera
kategori_lain: [layout, typography]
trigger: demo fitur atau konsep aplikasi dengan titik masuk kecil (ikon, tombol); kata inline benda UI
sumber: camera dive UI · 30 fps
dilihat_bergerak: sebagian
diukur: ya
alias: ["8"]
vault: [../_vault/01-camera-and-transitions/65-camera-dive-into-ui.md]
---
### 65 · Camera Dive Into UI
- **Trigger:** demo fitur atau konsep aplikasi dengan titik masuk kecil (ikon, tombol); kata inline benda UI
- **Anti-Pattern:** Crossfade polos saat masuk ke komponen UI, menyisipkan teks di dalam kotak input saat bukan aksi ketik, atau mengunci kamera statis saat elemen berpindah.
- **Invariant:** Gunakan ikon/tombol sebagai jangkar *push-through* kamera menuju adegan UI berikutnya dengan kurva `CURVE.whip` + `MotionBlurWrapper`; jaga kata inline sejajar baseline tanpa menabrak avatar/ikon.
- **Primitives/Ref:** `SpatialAnchorCamera.tsx`, `WhipPanTransition.tsx`, `MotionBlurWrapper.tsx`, keyframes `65-k1..k10`. · Vault: `../_vault/01-camera-and-transitions/65-camera-dive-into-ui.md`
- **Gate:** `motion_lint.py` PASS + `frame_audit.py` bebas patahan masuk-keluar + `sfx_density.py` PASS.
