# TASK r2b · Threads + GitHub: B09 dan babak 3 (B16–B22)

Editor B. Berjalan paralel dengan Editor A (TASK r2a: babak 2 + B15 + mesin). P = `projects/builder-trap-r2`.

## Cakupan
- File kamu: `src/scenes/Act2b.tsx`, `Act2b.text.ts` (B09), `src/scenes/Act3.tsx`, `Act3.text.ts` (B16–B22), komponen baru `src/ui/Threads.tsx` (terang + gelap: feed, composer "New thread", dialog "Save to drafts?", profil dengan empty state "No threads yet", post terbit) dan `src/ui/GitHub.tsx` (gelap: halaman repo dengan kotak "Add a README", form "Create a new repository", sidebar "Releases · No releases published"). Threads.tsx juga dipakai Editor C (B25, Threads terang: composer → Post → 3 post terbit), jadi buat props yang bisa dipakai ulang (mode, isi teks, state per frame).
- **Jangan menyentuh** `src/engine/*` (milik Editor A; butuh perubahan → tulis permintaan di `handoff/QUESTIONS.md` awalan `Q-B` dan kerjakan sementara di file sendiri), `Act1*`, `Act2.*`, `Act3a.*`, `Act4.*`.
- B15 (dinding gelap) dibangun Editor A; B16 dimulai di frame `beatF('B16')[0]`.

## Bangun (PLAN.json, lulus_bila per beat)
- B09 (wajah F2 lalu post kutipan Threads terang, punch-in teks ≥ 9 % tinggi frame), B16 (wajah gelap + K3 triad yang bertahan B16–B18), B17 (composer gelap → Cancel → "Save to drafts?" → Save; teks draft = kata yang diucapkan "Selama satu tahun aku mencoba untuk belajar"), B18 (repo gelap "Add a README"), B19 (form Create repository + wajah "adiktif."), B20 (loop repo makin cepat → tumpukan → beku; nama repo nyata dari `P/assets/repos.json` urut pushed_at, ≥ 14), B21 (wajah, dua crop, dua K4), B22 (profil Threads gelap "No threads yet", avatar dari frame wajah, handle `siirfannih`, kamera mundur jauh; tumpukan draft dari B17 terlihat).
- UI asli: acuan `P/assets/ref_ui/threads_*.webp` (Threads web terang; buat versi gelap sesuai tema gelap Threads: latar #101010, teks #F3F5F7, garis #333638), `github_*.png`. Boleh mengambil screenshot halaman publik GitHub dengan Playwright sebagai acuan (mis. `https://github.com/Siirfannih/Jadisatu`, mode gelap via `colorScheme:'dark'`). UI dibangun sebagai kode (D-013), bukan screenshot ditempel. Logo Threads/GitHub dari `Logo`.
- Babak 3 gelap: latar `DarkWall` (linear) atau UI gelap; teks `#F4F5F7`, aksen teks `#6F8DFF`; tanpa radial/vignette.
- Sisipan wajah grade `gelap` / `gelapHangat` (B21), teks `#F4F5F7`.

## Boleh dibaca
`R/claude/motion-graphic/LANTAI.md`, `P/RESEP.md`, kartu 55 dan 63, `P/handoff/BRIEF.md`, `PLAN.json`, `REPORT-r1.md` (API mesin), `REVIEW-r1.md`, file ini, kode `P/remotion/src` (baca mesin untuk memakai API, jangan mengubah), `R/claude/motion-graphic/references/typography.md`, `smooth-motion.md`, `camera-transition.md`, skill Remotion, contoh gagal `R/claude/motion-graphic/pustaka/contoh-gagal/`.

## Render
Semua render lewat `flock P/qc/.render.lock R/claude/motion-graphic/scripts/juri/render.sh …`. Still minimal 2 per beat (label `B09a`, `B16a`…), jangan menimpa still Editor lain. Draft rentang beatmu saja.

## Keluaran wajib
Still B09, B16–B22 + lembar `P/qc/r2b_sheet.jpg` (overlay safe frame) · `teks_cek.py` · `node scripts/cekkata.mjs 18.4 24.4` dan `48.95 75.4` · draft `render.sh P draft Main 1469-2262` · laporan sebagai teks balasan · pertanyaan `handoff/QUESTIONS.md` (awalan `Q-B`).

## Selesai bila
lulus_bila PLAN · semua kata di rentangmu tampil tepat sekali · tanpa radial · tiap shot > 2 dtk bergerak · UI menyerupai acuan asli · tombol Post tidak diklik di babak 3.
