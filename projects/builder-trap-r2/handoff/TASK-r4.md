# TASK r4 · Kinetic typography seluruh video (v3)

Editor KT. P = `projects/builder-trap-r2`, R = root repo. Versi v1 dan v2 sudah dilihat Irfan: jangan menimpa `out/*.mp4`.

## Cakupan
- File kamu: `P/remotion/src/engine/TextLayer.tsx`, `P/remotion/src/text/*`, semua `P/remotion/src/scenes/*.text.ts`. Ubah `scenes/*.tsx` hanya bila posisi/kamera perlu disesuaikan agar blok teks muat (catat di laporan). Mesin lain, UI, audio: jangan.

## Kerjakan (kriteria di `P/handoff/REVIEW-v2-irfan.md`)
1. **Mesin (KT-1):** blok K4/K3/N dua baris atau lebih dihitung sebagai satu blok: ukur lebar tiap baris (fungsi `measure` sudah ada), skala kata besar sampai lebarnya = lebar baris kecil ±5 % (min 96 px, maks sampai safe frame x 165–1755), rata sisi yang sama. Bila baris kecil > 3 kata, pecah ke tampilan sebelumnya (KT-2), jangan kecilkan.
2. **Pecah kalimat panjang (KT-2)** di semua beat: narasi 1–3 kata per tampil (maks 4), frasa diganti utuh di tempat yang sama. Prioritas: B09, B10, B11, B13, B14, B15, B19–B22, B24–B26.
3. **Pembuka B01–B03 (arahan Irfan 15 Nov, menggantikan versi awal butir ini):** kartu (shape + teks) dipertahankan tapi dipecah per kata mengelilingi bingkai footage: kartu 1 "semua" kiri atas, kartu 2 "orang tuh" di kanannya, kartu 3 "bisa" di kanan kartu 2, kartu 4 kata kunci di bawah (posisi label sekarang) berganti membangun → membuat → bikin software. Kartu 1–3 konstan, muncul per kata; kartu ikut push bingkai.
4. **Variasi mode (KT-4):** di sisipan wajah, selang-seling mode (hero satu kata, blok seimbang, frasa pendek) dan sisi/pita; tidak ada > 2 tampilan berturut dengan mode + posisi sama.
5. **Catatan Irfan per frame (KT-5):**
   - B07: "unik." diskalakan sampai lebarnya ≥ lebar "sesuatu yang", ujung kanan sejajar.
   - B11: "FOMO." ujung kanannya sejajar ujung baris kecil di atasnya (baris kecil dipecah dulu bila > 3 kata, KT-2).
   - B17 (dan triad B16, B18): tumpuk kata — satu kata per baris, muncul per kata saat diucapkan, kata kunci tetap putih penuh, kepala abu, blok seimbang (lebar baris dibuat setara lewat ukuran per baris, tetap ≥ 56 px).

## Jangan berubah
Isi kata dan urutannya, timing ucapan, audio, palet (babak 3 tanpa biru), lantai ukuran 56/96 px, transisi antarbabak, UI.

## Boleh dibaca
`P/handoff/REVIEW-v2-irfan.md`, `REVIEW-v1-self.md`, `REPORT-r3a.md`, `REPORT-r3b.md`, `ENGINE-CHANGES.md`, `BRIEF.md`, `PLAN.json`, file ini; `R/claude/motion-graphic/LANTAI.md`; kartu `R/claude/motion-graphic/pustaka/kartu/55-*.md`, `57-*.md`, `73-*.md`, `08-*.md`; `R/claude/motion-graphic/guide/referensi/ganimate.md`; lembar referensi `/home/irfan/work/_downloads/ganimate-kt/kt_01.jpg`, `kt_02.jpg`; kode `P/remotion/src`; skill Remotion.

## Render
`flock P/qc/.render.lock R/claude/motion-graphic/scripts/juri/render.sh P still …` dari R. Still di `P/qc/stills_r4/` (pindahkan dari `qc/stills/` setelah render), minimal 1 per tampilan teks yang berubah. Disk terbatas (±5 GB): hapus still sementaramu.

## Keluaran wajib (sebagai balasan, Sutradara yang menyimpan REPORT)
- Lembar `P/qc/r4_sheet.jpg`
- Tabel per beat: tampilan sebelum → sesudah (kata per tampil, mode, rasio lebar baris pendek/panjang)
- `node P/remotion/scripts/cekkata.mjs 0 94.97` (semua kata tampil tepat sekali)
- `python3 R/claude/motion-graphic/scripts/juri/teks_cek.py P/qc/stills_r4`
- `npx tsc --noEmit`

Selesai bila: KT-1…KT-5 terpenuhi di still, cekkata lulus.
