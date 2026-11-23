# Engine Vibedesign

Mesin render HTML/CSS/SVG → PNG yang deterministik. Mesin ini hanya berisi blok netral yang dipakai ulang di semua proyek. Kode slide dan tema selalu ditulis baru per proyek di `projects/<proyek>/`.

## Isi

| Path | Fungsi |
|---|---|
| `core/frame.css` | Font lokal, token default netral, reset, kanvas `.slide` 1080×1350, tekstur (`.bg-dots`, `.bg-hair`, `.bg-mat`), paper grain |
| `core/components.css` | Komponen workspace: `.chrome`, `.sel`, `.fcursor`, `.mbub`, `.label-tape`, `.tape`, `.win`, `.dock`, tipografi bersama |
| `core/ui.js` | Menempel `.fcursor[data-anchor]` ke pojok elemen, lalu memberi tanda `body[data-ready="1"]` |
| `cast/cast.js` | Karakter SVG papercut (lihat `cast/README.md`) |
| `fonts/` | Plus Jakarta Sans, Instrument Serif, Fredoka, JetBrains Mono (woff2, latin) + lisensi SIL OFL 1.1 |
| `scripts/lib.js` | Argumen `--proyek`, perakit halaman, peluncur browser, penunggu halaman siap (dipakai juga oleh `juri/`) |
| `scripts/build_index.js` | Merakit `<proyek>/index.html` dari `slides/` |
| `scripts/preview_slide.js` | Preview satu slide (1×) ke `/tmp/qc/`, aman dijalankan paralel |
| `scripts/export_slides.js` | Export final 2× ke `<proyek>/output/slide-0N.png` (2160×2700) |

## Kontrak proyek

```
projects/<proyek>/
├── slides/slide-01.html …   satu <style> (selector #slide-N) + satu <section class="slide …" id="slide-N">
├── assets/theme.css         token palet proyek (menimpa token default engine); opsional
├── assets/manifest.json     karakter, gambar, font + sumber & izin (dibaca juri/aset_cek.js)
├── output/                  PNG hasil export
└── qc/                      laporan juri (JSON)
```

Satu file per slide membuat beberapa agent bisa mengerjakan slide berbeda secara paralel tanpa bentrok. Slide hanya menambah gaya lewat `#slide-N …`. Slide tidak mengubah `core/`.

Urutan muat: `core/frame.css` → `core/components.css` → `<proyek>/assets/theme.css` → slide → `cast/cast.js` → `core/ui.js`.

Atribut anotasi untuk juri (tidak mengubah tampilan):
- `data-baca="1|2|3…"` pada elemen teks atau wadahnya: urutan baca yang dimaksud.
- `data-dekor` pada elemen dekoratif (chrome UI, teks blur, thumbnail, penggaris, metadata kecil): dikecualikan dari cek teks dan kontras. Teks yang membawa pesan tidak boleh diberi `data-dekor`.
- `data-bleed` pada kata raksasa yang sengaja terpotong tepi kanvas: boleh keluar tepi di `teks_cek`.
- `data-baca-pola="cerita"` pada `<section>`: urutan dibangun posisi (setup di atas, punchline di bawah), bukan ukuran.

## Perintah

Jalankan dari root repo.

```bash
cd claude/vibedesign/engine && npm install && cd -                       # sekali per mesin
node claude/vibedesign/engine/scripts/preview_slide.js --proyek projects/<p> --slide 3
node claude/vibedesign/engine/scripts/export_slides.js --proyek projects/<p>     # rakit index.html + export 2×
node claude/vibedesign/engine/scripts/build_index.js  --proyek projects/<p>      # hanya rakit index.html
```

Browser: Chromium milik Playwright. Bila belum terpasang (`npx playwright install chromium`), skrip memakai `CHROME_PATH` atau Chrome sistem (`/usr/bin/google-chrome`, atau Google Chrome di macOS).

## Determinisme

- Semua font dimuat dari `fonts/`, tanpa jaringan.
- Export menunggu `document.fonts.ready`, semua gambar, dan `body[data-ready]` sebelum memotret.
- Emoji font berwarna tidak ter-render di Chrome headless. Gambar ikon emoji sebagai SVG di slide.
- Baseline piksel hanya sah di mesin yang sama. Render di OS atau versi Chrome lain bisa beda beberapa piksel. Pakai satu mesin render (PC server OpenBot) sebagai sumber kebenaran.

## Ukuran output

PNG 2160×2700 berukuran sekitar 3–4,5 MB per slide (±17 MB untuk 5 slide). Bila total satu proyek melewati 20 MB, simpan PNG di Drive dan simpan JPG kualitas 92 di repo.
