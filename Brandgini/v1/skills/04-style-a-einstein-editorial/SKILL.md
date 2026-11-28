---
name: style-a-einstein-editorial
description: Spesifikasi mekanik visual, tipografi, warna, dan motion untuk Style A (Einstein Editorial / Surreal Collage) diekstrak dari editing.mp4.
---
# Skill 04: Style A — Einstein Editorial / Surreal Collage

Gaya ini diekstrak dari referensi `editing.mp4` dan disesuaikan dengan token brand **Soalnya Gini**. Belum ada channel explainer Indonesia yang memakai gaya editorial surealis ini secara konsisten.

## 1. Canvas & Permukaan (Backdrop Invariant)
- **Base Gradient**: Radial spotlight lembut dari pusat terang (`#F2F4FF`) menuju tepi periwinkle-indigo (`#7E84E4` → `#6369D1`).
- **Tekstur Wajib**: Overlay *halftone dot / fine canvas mesh* (`opacity: 0.14`, `mixBlendMode: 'multiply'`) + subtle film grain (`4–6%`). **Dilarang** memakai latar solid polos tanpa tekstur.

## 2. Subjek & Aset Visual (Cutout + Surreal Accents)
- **Monochrome Photographic / High-Contrast Cutouts**: Objek utama (orang, jam weker, mobil, mesin, otak, bola lampu, produk) diproses menjadi monokrom/duotone dingin (tint `#1B1E59` di shadow, putih bersih di highlight) dengan **bayangan jatuh lembut (*grounded contact shadow*)** di bawah objek.
- **Surreal Digital Accents**:
  - Panah garis putus-putus putih (`stroke: #FFFFFF`, `strokeDasharray: "10 8"`, `strokeWidth: 3`) yang melingkari atau menunjuk subjek (`strokeDashoffset` dianimasikan masuk dalam 12–18 frame).
  - Aksen *retro pixel* (kursor piksel putih-hitam, *grid-sparkle* kotak-kotak putih berkedip cepat 4–6 frame di atas subjek saat momen transisi/ide).
  - *Visual Metaphor Swap*: Ganti cutout secara tiba-tiba pada puncak beat (misal: pengendara ramping → pengendara gemuk, bohlam melayang → bohlam kempis) dengan *scale punch* (`0.92 → 1.04 → 1.0`, 6–8 frame, `Easing.bezier(0.22, 1, 0.36, 1)`).

## 3. Tipografi Editorial Spatial-Wrap (Pembeda Terbesar!)
- **Dilarang** menaruh semua teks di kotak subtitle monoton di bagian bawah.
- **Hierarki Dua Lapis**:
  1. **Kata Penghubung (*Connector*)**: Font tipis miring (*Plus Jakarta Sans Light Italic* atau *Instrument Serif Italic*), `36–44px`, warna `#1B1E59` (`opacity: 0.85`).
  2. **Kata Kunci Jangkar (*Anchor Keyword*)**: Font tebal rapat ALL-CAPS (*Plus Jakarta Sans ExtraBold* / *Oswald Bold* / *Anton*, tracking `-0.03em`), `88–130px`, warna `#1B1E59` (atau aksen Biru Gini `#2D6BFF` untuk kata klimaks).
- **Penempatan Spasial**: Teks muncul berurutan mengikuti `words.json` dan **membungkus area kosong di atas, kiri/kanan, dan bawah subjek** (tetap di dalam safe zone: `y: 250..1520px`, `x: 64..1016px`).

## 4. Ritme & Transisi
- Setiap 3–5 detik ganti komposisi penuh (hard cut + *scale punch* 1.08 → 1.0 atau *whip-slide* cepat 6 frame).
- Objek melayang diberi *micro-float* sinusoidal halus (`±6px` vertikal, periode 90 frame) agar frame tidak pernah terasa mati.
- **Maskot Gini**: Muncul sebagai *cutout* kardus kecil di beat pembuka (0–3s) dan beat *"Soalnya gini"* (3–6s) dengan tint warna yang menyatu di palet periwinkle/navy.

## Gate Visual Style A
- Cek via `npx remotion still` pada 6 frame kunci: tidak ada teks yang menimpa wajah/fokus utama cutout, kontras teks `#1B1E59` vs spotlight terang selalu >= 7:1, dan tekstur halftone terlihat jelas.
