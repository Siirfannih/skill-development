---
id: "98"
pola: Three-Constant Sticker List
pack: 04-ui-cutout-dataviz-visuals
kategori: layout
kategori_lain: [typography, camera]
trigger: daftar tips/skill cepat tanpa nomor; satu benda stiker per item; aset campur gaya tetap satu sistem
sumber: sticker list · 30 fps
dilihat_bergerak: ya
diukur: ya
alias: [grid-paper-sticker-list, sticker-list]
vault: [../_vault/03-spatial-and-ui-layouts/98-grid-paper-sticker-list.md]
---
### 98 · Three-Constant Sticker List
- **Trigger:** daftar tips/skill cepat tanpa nomor; satu benda stiker per item; aset campur gaya tetap satu sistem
- **Anti-Pattern:** Mencampur gaya aset (meme, pixel, vektor, 3D) tanpa palet & bayangan pengikat hingga terlihat seperti kolase acak (`contoh-gagal` 03), atau memasang gambar 3D AI di proyek 2D.
- **Invariant:** Kunci 3 konstanta pengikat di seluruh video (latar grid/kertas yang sama, perlakuan label/bayangan seragam, palet merek terkendali); ganti item lewat *palette-band wipe* `CURVE.whip` dan munculkan 1 objek stiker tepat per kata kunci.
- **Primitives/Ref:** `WhipPanTransition.tsx`, `MotionBlurWrapper.tsx`, `curves.ts` (`CURVE.whip`/`land`). · Vault: `../_vault/03-spatial-and-ui-layouts/98-grid-paper-sticker-list.md`
- **Gate:** `palette_check.py` + `cek_komposisi.py` + `sfx_density.py` (`taktil`/`transisi`) PASS.
