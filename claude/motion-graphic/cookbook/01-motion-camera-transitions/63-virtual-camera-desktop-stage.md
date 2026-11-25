---
id: "63"
pola: Virtual Camera Desktop Stage
pack: 01-motion-camera-transitions
kategori: camera
kategori_lain: [layout, typography]
trigger: demo fitur produk atau AI tool tanpa pembicara; urutan klik lalu hasil muncul; prompt terbaca
sumber: desktop stage · 30 fps
dilihat_bergerak: ya
diukur: ya
alias: []
vault: [../_vault/01-camera-and-transitions/63-virtual-camera-desktop-stage.md]
---
### 63 · Virtual Camera Desktop Stage
- **Trigger:** demo fitur produk atau AI tool tanpa pembicara; urutan klik lalu hasil muncul; prompt terbaca
- **Anti-Pattern:** Memotong kaku antar tangkapan layar penuh tanpa jangkar ruang, menaruh teks kaca di atas latar terang tanpa kontras, atau memotong huruf ucapan di tepi jendela.
- **Invariant:** Susun UI di satu kanvas `Papan.tsx` / `SpatialAnchorCamera.tsx` dan gerakkan kamera virtual mengikuti aksi klik; jendela aktif mengisi fokus utama dengan teks ucapan di dalam margin aman 5% (`role: bleed-display` hanya untuk teks grafis latar).
- **Primitives/Ref:** `SpatialAnchorCamera.tsx`, `MotionBlurWrapper.tsx`, `Papan.tsx`, `curves.ts`, keyframes `63-k1..k10`. · Vault: `../_vault/01-camera-and-transitions/63-virtual-camera-desktop-stage.md`
- **Gate:** `motion_lint.py` + `teks_cek.py` PASS + `sfx_density.py` (`transisi` & `tick`) PASS.
