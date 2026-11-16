# REPORT r10 — revisi 16 Nov

Lima revisi diterapkan tanpa commit/push, tanpa doctor/pull/PENDING, tanpa render video. Instruksi tugas mengatasi protokol awal/akhir sesi repo.

## Perubahan

| Butir | Implementasi dan angka |
|---|---|
| R7-1 | `Paper` sekarang bidang rata #0E0D0C, tanpa SVG turbulence, tanpa tekstur tambahan, tanpa gradien radial. Tetap di dunia kamera. Memperbaiki B2, B4, B12 melalui komponen bersama. FilmLook warisan tetap pada ketiganya; grain/halation dari FilmLook masih terlihat, bukan bercak Paper. |
| R7-2 | T06 diambil dari TEKS tervalidasi, kapital lewat CSS, Poppins 700 amber. RESILIENCE dipindah ke children Cam sesudah Print, multiply, tanpa shadow/glow/blur masuk. Posisi dunia (960,315), ukuran 250 px pada onset; scaleX 0,72 agar huruf kapital muat dalam bingkai (lebar tampak sekitar 950–970 px layar di still). Masuk dari mask translateY 140%→0, mulai f130, `move(..., dur(250/z*1.4,30,1.35), 'reveal')`, durasi 20 f. Cut di f153. Matters putih 600, ukuran 130/z onset, posisi dunia y315+250/z, muncul pada onset katanya, cut f153. T05/T07 dan kamera tidak diubah. |
| R7-3 | `keepLeft` dihapus dari under() untuk seluruh B4, koordinat dunia tetap. Providing tertinggal di cetakan pertama pada f375 dan keluar layar ketika kamera bergerak ke cetakan kedua di f380. |
| R7-4 | Hanya cabang B5 f≥543: footage percik dan multiply/lighten dihapus. Isi huruf #FFD678→#D68028, ukuran 300, tracking −0,03em, posisi dan P5t sama. LightSweep salinan lokal memakai background 300%×300%, angle 45°, posisi `(160−140p)%, (−60+140p)%`, p kurva land f545–559 (14 f). Offset latar bergerak kanan sekaligus naik; pita tegak lurus lintasan. Glow hanya salinan pita, blur 27 px, amplitudo 0,55×sin(πp). Film kartu dilepas pada cabang ini agar latar benar-benar #0E0D0C bersih. Still tambahan f547/f549 memperlihatkan perpindahan kilat. |
| R7-5 | T38–T41/T43/T44 memakai sy **332**, ukuran 120, sx960, center. T42 sy200, big290. sy370 gagal batas 40 px pada frame masuk. Evaluasi seluruh 110 frame f813–922 dengan metrik glyph Poppins di Chromium, onset kata, translate masuk, scale skala, dan proyeksi kamera menghasilkan batas bawah maksimum y489,9425 pada f853/T41; jarak terhadap acuan batang y530 = **40,0575 px**. sy333 sudah melampaui y490, jadi 332 adalah integer terbesar yang memenuhi perhitungan tersebut. |

## Pemeriksaan

- `cd remotion && npx tsc --noEmit`: PASS, exit 0 (`qc/r10/tsc.log`, kosong karena tanpa galat).
- `python3 ../../claude/motion-graphic/scripts/juri/motion_lint.py remotion/src --hanya remotion/src/shots.tsx remotion/src/engine/media.tsx remotion/src/lib/curves.ts remotion/src/lib/LightSweep.tsx`: PASS (`qc/r10/motion-lint.log`).
- `git diff --check`: PASS.
- `curves.ts` identik dengan sumber repo melalui cmp. Sumber berada di `../../claude/...` dari folder proyek; path `../../../claude/...` pada brief tidak ditemukan.
- Diff terhadap ca3df35: hanya imports pendukung/B2/B4/B5 cabang kartu/B8a serta Paper; tambahan baru lib/curves.ts dan lib/LightSweep.tsx. Teks.tsx tidak diubah; validasi ucapan tetap dijalankan saat render.
- `qc/r10/scope-check.json`: sumber beat B1/B3/B6/B7/B9/B10/B11/B12 identik; cabang B5 sebelum f543 dan B8 sejak f923 identik; Main/Cam/Film/camera/theme/Teks identik. B12 berubah tampilannya hanya lewat Paper sesuai permintaan. Tidak dilakukan perbandingan piksel render baseline pada semua frame beat terlindungi; bukti penjagaan cakupan berupa identitas sumber dan dependency yang tidak diubah.
- Batas B8 memakai geometri glyph inti terhadap acuan batang y530 yang diberikan brief, bukan segmentasi batang bergerak setiap frame; halo/blur warisan Teks tidak termasuk kotak glyph. Still kontrol serta f853 dilihat langsung dan tidak menabrak batang.
- Semua still 960×540, Main, scale0.5; visual diperiksa sendiri. Tidak ada video/final/frames sequence yang dirender.

## Still di qc/r10

- [f140.png](../qc/r10/f140.png)
- [f150.png](../qc/r10/f150.png)
- [f300.png](../qc/r10/f300.png)
- [f375.png](../qc/r10/f375.png)
- [f380.png](../qc/r10/f380.png)
- [f546.png](../qc/r10/f546.png)
- [f547.png](../qc/r10/f547.png)
- [f548.png](../qc/r10/f548.png)
- [f549.png](../qc/r10/f549.png)
- [f553.png](../qc/r10/f553.png)
- [f558.png](../qc/r10/f558.png)
- [f840.png](../qc/r10/f840.png)
- [f853.png](../qc/r10/f853.png)
- [f875.png](../qc/r10/f875.png)
- [f900.png](../qc/r10/f900.png)
- [f1340.png](../qc/r10/f1340.png)
- [f1400.png](../qc/r10/f1400.png)

Bukti tambahan: `bounds.json` + `check-bounds.cjs` (perhitungan batas), `source.diff`, `LightSweep.diff`, dan log per render. Cache browser sementara pemeriksaan sudah dibersihkan. Perubahan DECISIONS/audio lain yang terlihat pada working tree bukan bagian pekerjaan ini dan tidak disentuh.
