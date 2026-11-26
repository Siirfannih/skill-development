# Kerangka proyek desain

```
projects/<proyek>/
├── BRIEF.md · RESEP.md · TAHAP.md · DECISIONS.md · STATUS.md · DESIGN.md (bila proyek menimpa profil merek)
├── slides/slide-0N.html     satu file per slide
├── assets/manifest.json     daftar aset + sumber + izin
├── qc/                      keluaran juri terakhir, lembar sanding
└── output/                  PNG final (atau tautan Drive bila besar)
```

## Kontrak slide
Setiap `slides/slide-0N.html` berisi tepat:
1. satu `<style>` yang semua selektornya diawali `#slide-N`;
2. satu `<section class="slide …" id="slide-N">` berukuran kanvas dari `tokens/canvas.tokens.json`.

Tidak ada `<html>`, `<head>`, atau aset eksternal (font dan gambar lokal saja). Script kecil boleh di dalam section bila menunggu `document.fonts.ready`. Kontrak ini yang membuat satu subagen per slide bisa bekerja paralel tanpa bentrok.

## `assets/manifest.json`
```json
{
  "aset": [
    { "id": "cast-klik", "jenis": "karakter", "file": "engine/cast/cast.js#klik", "sumber": "buatan sendiri (SVG)", "izin": "milik proyek" },
    { "id": "font-jakarta", "jenis": "font", "file": "engine/fonts/plus-jakarta-sans-*.woff2", "sumber": "Google Fonts via @fontsource", "izin": "OFL-1.1" }
  ]
}
```
Setiap gambar, font, ikon, dan karakter yang tampil wajib punya baris (LANTAI KRK-02).
