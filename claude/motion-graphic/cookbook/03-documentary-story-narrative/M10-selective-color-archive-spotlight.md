---
id: "M10"
pola: Selective-Color Archive Spotlight
pack: 03-documentary-story-narrative
kategori: layout
kategori_lain: [typography, camera]
trigger: menyorot satu tokoh di tengah foto kerumunan arsip lama atau daftar banyak pendiri/tim
fungsi: [penekanan]
sumber: gabungan mekanik spotlight warna selektif di foto arsip
dilihat_bergerak: tidak
diukur: ya
alias: ["19", "39"]
vault: [../_vault/03-spatial-and-ui-layouts/19-archive-photo-spotlight.md, ../_vault/03-spatial-and-ui-layouts/39-selective-color-group-index.md]
---
### M10 · Selective-Color Archive Spotlight
- **Trigger:** menyorot satu tokoh di tengah foto kerumunan arsip lama atau daftar banyak pendiri/tim
- **Anti-Pattern:** Menaruh label nama menutup wajah orang lain di foto ramai (`contoh-gagal` 19), melakukan zoom melebihi 2,2× hingga arsip pecah, atau membiarkan foto diam > 2,2 dtk.
- **Invariant:** Gunakan `SelectiveColorSpotlight.tsx` untuk mendesaturasi kerumunan sementara 1 subjek aktif tetap berwarna; gerakkan kamera `SpatialAnchorCamera` ke ruang dekat subjek dan petakan semua wajah sebelum menaruh label.
- **Primitives/Ref:** `SelectiveColorSpotlight.tsx`, `SpatialAnchorCamera.tsx`, `scripts/lego/persepsi.py`. · Vault: `../_vault/03-spatial-and-ui-layouts/19-archive-photo-spotlight.md` · `../_vault/03-spatial-and-ui-layouts/39-selective-color-group-index.md`
- **Gate:** `cek_komposisi.py` (`WAJAH` 0) + batas zoom arsip ≤ 2,2× + `sfx_density.py` PASS.
