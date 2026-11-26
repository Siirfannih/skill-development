---
id: "25"
pola: Radial Burst World Bridge
pack: 01-motion-camera-transitions
kategori: camera
kategori_lain: [typography, layout]
trigger: promo atau teaser digerakkan musik; pindah antar-dunia visual; pukulan akhir skala besar
fungsi: [transisi, hook, penutup]
sumber: launch burst · 30 fps
dilihat_bergerak: tidak
diukur: ya
alias: []
vault: [../_vault/01-camera-and-transitions/25-radial-burst-world-bridge.md]
---
### 25 · Radial Burst World Bridge
- **Trigger:** promo atau teaser digerakkan musik; pindah antar-dunia visual; pukulan akhir skala besar
- **Anti-Pattern:** Menyelipkan aset 3D mentah pada proyek `render_mode: 2d-flat`, memotong kata kunci penting ke tepi layar tanpa `bleed-display`, atau membiarkan transisi tanpa suara puncak.
- **Invariant:** Jembatani dua dunia berbeda lewat burst/goresan radial vektor 2D (`FlashCut` + mask radial) di puncak energi; jaga kedalaman lewat `SpatialDepthStage` 2,5D (bukan mesh 3D) dan ikat puncak ke sub-impact (`Pilar 5`).
- **Primitives/Ref:** `SpatialDepthStage.tsx`, `FlashCut.tsx`, `Kursor.tsx`, `curves.ts` (`CURVE.whip`). · Vault: `../_vault/01-camera-and-transitions/25-radial-burst-world-bridge.md`
- **Gate:** `motion_lint.py` + `cek_komposisi.py` + `sfx_density.py` (`aksen`) PASS.
