---
id: "M01"
pola: Zoom & Match-Cut Transition Chain
pack: 01-motion-camera-transitions
kategori: camera
kategori_lain: [layout, texture]
trigger: object-match transition; lompatan waktu antarbab; receding zoom-out; object zoom-through chain
sumber: gabungan mekanik rantai zoom & match-cut
dilihat_bergerak: tidak
diukur: ya
alias: ["20", "34", "35", "82"]
vault: [../_vault/01-camera-and-transitions/20-object-match-transition-chain.md, ../_vault/01-camera-and-transitions/34-receding-zoom-out-chain.md, ../_vault/01-camera-and-transitions/35-object-zoom-through-chain.md]
---
### M01 · Zoom & Match-Cut Transition Chain
- **Trigger:** object-match transition; lompatan waktu antarbab; receding zoom-out; object zoom-through chain
- **Anti-Pattern:** Memakai crossfade lambat 12–20 frame sebagai penyambung adegan, menghentikan gerak zoom di tengah transisi, atau membiarkan dua dunia tidak sejajar titik tengahnya.
- **Invariant:** Gunakan prinsip ruang: masuk ke detail = *push-through*, keluar konteks = *pull-back*, ganti benda seragam = *object-match*. *Micro-blend ≤ 4 f* hanya sah ketika objek/zoom telah mengisi ≥ 80% layar atau `scale ≥ 3×` dengan kurva `CURVE.whip`.
- **Primitives/Ref:** `SpatialAnchorCamera.tsx`, `MotionBlurWrapper.tsx`, `SceneChain.tsx`, `curves.ts` (`CURVE.whip`/`heavy`). · Vault: `../_vault/01-camera-and-transitions/20-object-match-transition-chain.md` · `../_vault/01-camera-and-transitions/34-receding-zoom-out-chain.md` · `../_vault/01-camera-and-transitions/35-object-zoom-through-chain.md`
- **Gate:** `motion_lint.py` PASS + `frame_audit.py` di strip transisi bebas jeda mati.
