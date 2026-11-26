# Gerbang warna (masuk dan keluar)

Dipindah dari `dunia-visual.md` §9 agar referensi itu tetap di bawah 15 KB. Alat: `scripts/warna/cek-warna.mjs` (lihat `scripts/warna/README.md`).


Dua gerbang wajib, satu CLI: `scripts/warna/cek-warna.mjs` (Node; `npm ci` sekali di `scripts/warna/`). Kata warna di brief ("biru lembut") bukan nilai; palet datang dari referensi atau profil merek, terukur.

- **Masuk** (sebelum desain): `node scripts/warna/cek-warna.mjs masuk <video|folder still|png...> [--ke-spec REF-SPEC.json] [--ke-tema tema.ts]`. Hasil `palet.json`: per jenis frame (terang/gelap) 4-5 HEX nyata dengan % luas dan peran (latar = luas terbesar, tinta = kontras tertinggi terhadap latar, aksen = OKLCH paling jenuh, netral/permukaan), luminansi, rasio WCAG, dan Lc APCA tinta:latar. `--ke-spec` menyisipkan kunci `palet` ke spec; `--ke-tema` menulis token `tema.ts` (nilai turunan bertanda). Dipakai apa adanya: warna di kode datang dari token ini, bukan tebakan.
- **Keluar** (tiap frame sebelum diserahkan): `node scripts/warna/cek-warna.mjs keluar <frame.png|folder> --palet palet.json [--html frame.html | --tanpa-teks noteks.png] [--abaikan x,y,w,h]`. Tiga cek, keluar 1 bila ada yang gagal:
  1. **warna-nyasar**: klaster warna berluas >= 0,5 % yang ΔE2000-nya > 12 ke semua warna palet (termasuk tint/shade +-25 L dan campuran gradien antar-warna palet). Foto/footage dikecualikan dengan `--abaikan`.
  2. **kontras-apca**: per blok teks, APCA Lc >= 60 (teks biasa) atau >= 45 (besar: >= 48 px @1080, atau tebal >= 38 px); rasio WCAG 2 dilaporkan sebagai aviso. Teks dipisah dengan render dua kali (dengan dan tanpa teks), bukan ditebak: HTML otomatis (`data-lapis="teks"` per blok), Remotion lewat still kedua `sembunyikanTeks` (`toolkit/starter/src/Video.tsx`). axe-core ikut berjalan untuk bingkai HTML sebagai suplemen (aviso), bukan hakim.
  3. **warna-nanggung**: daerah >= 3 % (atau warna teks/latar blok) di pita keruh, OKLCH chroma 0,03-0,08 pada lightness 0,45-0,75, yang bukan warna palet. Perbaikan: pilih abu netral (chroma < 0,03) atau warna tegas (>= 0,08), atau masukkan ke palet dari referensi bila memang bagian dari sistem.
- Pengecualian yang sengaja: teks yang memang memudar atau diredupkan sebagai bahasa cerita diberi `data-sengaja="pudar"`; teks di bawah `filter: blur(>= 1,5px)` dan teks yang tertutup elemen lain dilewati otomatis (tercatat di `dilewati`).
- Gerbang produksi (`gerbang_produksi.sh`) dan `board.py` menjalankan gerbang keluar bila `palet.json` ada di proyek. Rincian ambang dan kalibrasi: `scripts/warna/README.md`.
