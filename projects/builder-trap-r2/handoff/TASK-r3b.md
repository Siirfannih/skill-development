# TASK r3b · Babak 3–4 (B14–B26): perbaikan visual dari REVIEW-v1-self

Editor B. Dijalankan setelah Editor A (r3a) selesai mengubah mesin: palet gelap netral, lantai ukuran teks, preset crop wajah baru (`P/handoff/ENGINE-CHANGES.md` r3a, `P/handoff/REPORT-r3a.md`). P = `projects/builder-trap-r2`, R = root repo. Jangan menimpa `out/builder-trap-r2_v1.mp4`.

## Cakupan
- File kamu: `P/remotion/src/scenes/Act3*`, `Act3a*`, `Act4*`. Butuh perubahan di `src/engine/*` atau `src/ui/*` → tulis di `P/handoff/QUESTIONS.md` (awalan `Q-r3b`), atau bungkus di file adeganmu.

## Perbaiki (ID dari `P/handoff/REVIEW-v1-self.md`)
1. **F-v1-01:** pastikan babak 3 (B15–B22) tidak lagi biru: tidak ada warna biru hardcoded di file adeganmu (hex biru, `hiColor` biru di GitHub/Threads, benang/denyut biru). Kata kunci triad B16–B18 putih penuh, kepala/sambung abu (`theme` r3a). Biru `#1A3AD0` hanya di babak terang (B14, B24–B25).
2. **F-v1-02:** narasi/sambung ≥ 56 px, kata kunci ≥ 96 px (lantai mesin r3a); periksa tidak ada override ukuran lebih kecil di `Act3.text.ts`/`Act4.text.ts`.
3. **F-v1-03:** sisipan wajah B16, B19 (56,5–57,8), B21 (dua bagian), B25 (84,72–85,9): pakai preset crop berbeda dari sisipan sebelumnya (mata / mulut+tangan / sisi), teks di ruang kosong crop itu dekat wajah, tidak 3× berturut di pita yang sama. B23 (klimaks "sadar.") dan B26 (penutup) boleh wajah medium bersih.
4. **F-v1-07:** B21 bagian kedua (67,0–70,28): crop/geser pusat supaya benda hitam buram di kiri frame tidak masuk.
5. **F-v1-04:** punch-in ke elemen yang dibicarakan, ≥ 6 % tinggi frame saat kata kuncinya: B19 tombol "Create repository" (56,2); B20 kotak "No releases published" kartu terdepan saat "gak pernah selesai" (±63); B22 teks "No threads yet" / profil kosong saat "gak menjadi siapapun" (±72).
6. **F-v1-05:** B14 "Untuk…" menempel cetakan yang sedang disorot, bukan melayang di dinding; B20 "atau" / "Yang" / "Dan gak pernah selesai." menempel tumpukan kartu repo (bukan sendirian di ruang kosong kiri).
7. **F-v1-06:** B17 — kata "menjual" tidak boleh masih tampil setelah ucapan "mempublikasikan" dimulai (50,74); B18 — tidak ada celah lebar "mempublikasikan␣␣␣apapun." saat kata kunci berganti (ukur ulang lebar, `apapun.` ikut bergeser); B19 — UI form tidak terpotong tepi kiri di awal shot (54,2–54,6) kecuali karena gerak kamera yang terlihat.

8. **F-r3a-01:** di renderer triad lokal `Act3.tsx`, kepala kalimat ("aku tidak", "dan tidak", "apapun.") memakai `C.inkDarkDim`, kata kunci putih penuh.
9. **F-r3a-02:** oper `hiColor` netral (`#C9CBD1`) ke komponen GitHub di B18–B20 lewat prop; `ui/GitHub.tsx` tidak diubah.
10. Still `qc/stills_r3a/` milik Editor A; still-mu di `qc/stills_r3b/`. Sutradara yang membuat still final untuk gerbang render.

## Jangan berubah
Isi teks, urutan dan timing beat, audio, transisi antarbabak (wipe 46,3 dan 75,2), mesin dan file Editor A.

## Boleh dibaca
`P/handoff/BRIEF.md`, `PLAN.json`, `REVIEW-v1-self.md`, `REPORT-r3a.md`, `ENGINE-CHANGES.md`, file ini, `R/claude/motion-graphic/LANTAI.md`, `P/RESEP.md`, kartu 55 dan 63, `pustaka/contoh-gagal/`, kode `P/remotion/src`, skill Remotion.

## Render
`flock P/qc/.render.lock R/claude/motion-graphic/scripts/juri/render.sh P still …` dari root R. Still minimal 2 per beat yang diubah. Disk ±2,8 GB: bersihkan still sementara milikmu, jangan sentuh `out/`.

## Keluaran wajib
- Lembar still `P/qc/r3b_sheet.jpg`
- `teks_cek.py` pada still baru (keluaran apa adanya)
- `node P/remotion/scripts/cekkata.mjs 38.95 94.97`
- `P/handoff/REPORT-r3b.md`: per ID temuan apa yang diubah + path still bukti + angka (ukuran px teks, tinggi elemen UI, hue babak 3)

Selesai bila: kriteria F-v1-01…07 untuk B14–B26 terpenuhi di still, cekkata lulus.
