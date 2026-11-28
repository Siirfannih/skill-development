---
name: style-b-vox-documentary
description: Spesifikasi mekanik visual, tekstur arsip, kamera 3D, dan motion untuk Style B (Vox Investigative Documentary) diekstrak dari vox.mp4 dan vox2.mp4.
---
# Skill 05: Style B — Vox Investigative Documentary / Tactile Archive

Gaya ini diekstrak dari referensi `vox.mp4` dan `vox2.mp4`. Memberikan kesan dokumenter investigatif yang taktil, kredibel, dan sinematik untuk topik sistem fisik, uang, sejarah benda, dan regulasi.

## 1. Perpustakaan Permukaan Taktil (Wajib Berganti Antar-Babak)
Setiap video Style B menggunakan 2–3 permukaan taktil berikut (disimpan di `kit/textures/`):
1. **Blueprint Grid** (`#1D3C6B` + garis grid putih tipis `opacity: 0.18` + vignette gelap) — untuk diagram teknis, skema mesin, dan kata kunci melayang.
2. **Graph Paper / Kertas Arsip** (`#E8E6DF` kusut halus + garis kotak tipis + bayangan tepi) — untuk potongan koran, *timeline*, dan perbandingan produk.
3. **Dark Charcoal / Wood Planks** (`#15171A` dengan tekstur goresan film & debu halus, atau papan kayu gelap tampak atas) — untuk pembuka tanggal, *top-down assembly*, dan *payoff* dramatis.
- **Global Finishing Pass**: Semua scene dibungkus *subtle halftone dot* (`opacity: 0.08`), *film grain* (6%), dan *vignette* tepi (`radial-gradient` gelap 25%).

## 2. Komponen Mekanik Khas Vox (Wajib Minimal 3 per Video)
1. **Archive Headline + Highlighter Sweep**:
   - Potongan koran/dokumen miring (`rotate: -2deg` hingga `3deg`) dengan bayangan jatuh tegas.
   - Bar stabilo kuning (`#E8C547`, `mixBlendMode: 'multiply'`) menyapu dari kiri ke kanan (`scaleX: 0 → 1`, 10 frame) di belakang kalimat kunci.
   - Lingkaran atau garis bawah spidol merah (`#D6202B`, SVG path `strokeDashoffset`) menyorot angka/fakta vital (misal: `200`, `10 meter`, `Rp100.000`).
2. **Polaroid / Photo Evidence Drop**:
   - Foto berbingkai putih tebal + label bawah (font condensed bold) jatuh masuk dari luar frame dengan *spring physics* (`damping: 14, stiffness: 180`) dan rotasi acak tipis (`-4deg` / `+3deg`).
3. **Typewriter Date / Chapter Stamp**:
   - Teks monospace/condensed putih di latar gelap (`OKTOBER, 2026|` atau `SNI 2398:2017|`) dengan kursor berkedip dan garis bawah merah tipis (`#D6202B`) yang memanjang.
4. **Red Translucent Tape / Kinetic Ribbon**:
   - Pita merah semi-transparan (`#D6202B`, `opacity: 0.82`) meluncur horizontal di atas kertas grafik berisi teks italic berjalan saat transisi urutan waktu.
5. **Stacked Kinetic Impact Typography**:
   - Untuk kalimat penutup/klimaks: 3–5 baris teks bertumpuk di tengah dengan warna kontras bergantian (Putih `#FFFFFF`, Kuning `#E8C547`, Biru Gini `#2D6BFF`, Merah `#D6202B`) yang *pop* satu per satu tepat pada beat VO.

## 3. Kamera & Transisi
- **Continuous Camera Motion**: Tidak boleh ada gambar diam! Selalu beri *slow push-in* (`scale: 1.0 → 1.07`) atau *2.5D parallax* (foreground bergerak 1.4× lebih cepat dari background).
- **Transisi**: Whip-pan dengan *motion blur* vertikal/horizontal (6–8 frame), *match-cut* (objek di tengah frame 1 berubah jadi bentuk geometris sama di frame 2), atau *keyhole/iris reveal* untuk momen pengungkapan rahasia.
- **Maskot Gini**: Muncul sebagai stiker/pin arsip di pojok atau membuka kotak bukti saat momen *"Soalnya gini"*.

## Gate Visual Style B
- Minimal 3 komponen mekanik Vox dipakai secara natural (bukan tempelan acak).
- Tidak ada teks penting di luar safe zone (`y: 250..1520px`).
- Transisi antar-beat selalu dilengkapi SFX foley taktil (kertas bergeser, kamera shutter, spidol/highlighter, whoosh rendah — **dilarang SFX kayu**).
