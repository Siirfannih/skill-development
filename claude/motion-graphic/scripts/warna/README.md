# scripts/warna: gerbang warna masuk dan keluar

Satu CLI Node, `cek-warna.mjs`, memegang seluruh logika (sharp, node-vibrant, culori, apca-w3, axe-core lewat playwright-core). `palet_masuk.py` dan
`palet_keluar.py` hanya pembungkus tipis yang meneruskan argumen dan kode keluar, untuk pemanggil Python.

Pasang sekali (PC server; `node_modules` tidak masuk git): `cd claude/motion-graphic/scripts/warna && npm ci`. Chromium dicari di
`~/.cache/ms-playwright` (cache Playwright yang sama dengan Python) atau `CHROMIUM_PATH`.

## Cara pabrik memanggil

- **Ekstrak (pabrik, tahap bedah referensi)**, sekali per proyek, dari referensi pilihan Irfan:
  `node scripts/warna/cek-warna.mjs masuk <referensi.mp4 | folder still> --out <proyek>/palet.json --ke-spec <proyek>/REF-SPEC.json [--ke-tema <proyek>/remotion/src/tema.ts]`
  (atau `python3 scripts/warna/palet_masuk.py ...` dengan argumen sama). Model membaca `palet` di REF-SPEC.json dan memakai HEX persis.
- **Uji (pabrik, tahap uji/juri)**, tiap frame storyboard atau still render:
  `node scripts/warna/cek-warna.mjs keluar <folder png> --palet <proyek>/palet.json --json`
  - storyboard HTML: `png/<nama>.png` + `panels/<nama>.html` ditemukan otomatis (juga `src/`); tanpa `--html`.
  - Remotion: render still biasa `qc/stills/<nama>.png` dan still kedua `qc/stills/<nama>.tanpa-teks.png` (`--props='{"sembunyikanTeks":true}'`); ditemukan otomatis, atau `--tanpa-teks`.
  - footage/foto: `--abaikan x,y,w,h`.
  Keluar 0 = PASS, 1 = FAIL, 2 = masukan/dependensi. stdout = JSON `{"status","alasan":[{"jenis":"kontras-apca"|"warna-nyasar"|"warna-nanggung",...}],"aviso":[...],"blok":[...]}`; ringkasan manusia di stderr. FAIL berarti frame belum boleh diserahkan.
- `board.py` dan `juri/gerbang_produksi.sh` memanggilnya sendiri bila `palet.json` ada di proyek (`<proyek>/palet.json` atau `qc/palet.json`). Melewati gerbang di produksi hanya dengan alasan tertulis di `qc/warna_lewati.txt`.

## Ambang (kalibrasi pada frame nyata)

| Cek | Ambang | Catatan |
|---|---|---|
| warna-nyasar | luas >= 0,5 %, ΔE2000 > 12 ke palet, tint/shade (+-25 L), campuran antar-warna | luas dari piksel di luar `--abaikan`; anti-aliasing gugur oleh luas |
| kontras-apca | Lc >= 60 biasa, >= 45 besar (>= 48 px @1080 atau tebal >= 38 px) | WCAG 2 4,5 / 3,0 dan p10 terburuk = aviso; ukuran dinormalkan sisi pendek/1080 |
| warna-nanggung | OKLCH C 0,03-0,08, L 0,45-0,75, ΔE2000 > 6 ke palet+tint, luas >= 3 % atau warna teks/latar blok | abu slate redup (mis. `#5a5f86`) jatuh di pita ini; lihat kalibrasi |

Kalibrasi (PC, 26 Nov 2026): 10 still referensi Researchly lulus semuanya (palet dari referensi itu sendiri). Panel L3 r1: v3 11 dari 31 lulus, v2 11 dari 30; sisanya teks redup
(Lc 32-57, memang rendah) dan teks slate `#5a5f86`-`#8487a4` (nanggung; bukan bagian palet referensi). Cek daerah >= 3 % tidak pernah menyala di frame L3/BW; yang menyala hanya warna teks.
66 panel BW v7 dengan palet mereknya: 54 lulus, 12 gagal (teks abu pudar sengaja di 10-2, tinta gelap di atas koral `#D34E33` Lc 35 padahal WCAG 4,8, muted `#646677` Lc 59).
Positif palsu yang diperbaiki: teks tersembunyi (opacity < 0,15), teks tertutup elemen lain, teks di bawah `filter: blur`. Frame `v6` yang ditolak (tangkapan PNG tanpa HTML) lolos (a) dan (c); teks abu `everyone is` hanya
terjaring bila ada sumber teks (`--html` atau `--tanpa-teks`).
Keterbatasan: teks berlatar gradien-teks (`background-clip:text`) tidak terbaca benar; frame tanpa sumber teks (PNG saja) hanya dicek (a) dan (c), tidak kontras.
