# REPORT r9 — B1 reframe f10

- Diff hanya blok B1 di `remotion/src/shots.tsx`; isi sebelum B1 dan mulai B2 hingga akhir diverifikasi identik dengan salinan sebelum edit.
- f0–9: jalur close dengan fokus FACE_A = (547, 308), skala 1,12 pada f0 → 1.122869 pada f9. Jalur close mempertahankan laju push lama (target 1,1536 pada f104).
- Tepat f10: beralih keras ke P1 lama, skala 1.002846; push lama 1,00 → 1,03 tetap berjalan. Tidak ada tween antar framing. Jalur dipilih dari frame utama, sehingga sampel shutter Cam tidak menyeberangi cut.
- T01 tetap modus kata dan memakai pose penempatan P1 lama: posisi serta ukuran dunia tetap. Tidak ada perubahan teks. Jarak dari batas kepala data T01 (x=806,9) adalah 110 px dunia: sekitar 123,2–123,5 px layar pada close, dan 110,3 px pada f10; ambang 4% layar = 76,8 px. Cadangan 30 px untuk telinga/kacamata tetap menyisakan sekitar 89,6 px pada close dan 80,2 px pada f10. Frasa utuh tetap satu baris; pemeriksaan geometri berdasarkan penempatan yang ada, bukan render baru.
- Validasi: `cd remotion && npx tsc --noEmit` **PASS**, exit 0. Tidak melakukan render; hasil visual akhir belum diverifikasi lewat render.
- File keluaran: `remotion/src/shots.tsx` (B1 saja), `handoff/REPORT-r9.md`.
