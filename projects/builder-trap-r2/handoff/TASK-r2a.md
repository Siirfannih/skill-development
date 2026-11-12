# TASK r2a · Babak 2 (B07, B08, B10–B14) + B15 (dinding gelap) + perbaikan r1

Editor A (pemilik mesin). Berjalan paralel dengan Editor B (TASK r2b: B09 + B16–B22). P = `projects/builder-trap-r2`.

## Cakupan
- File kamu: `src/scenes/Act2.tsx`, `Act2.text.ts` (B06–B08, B10–B14), `src/scenes/Act3a.tsx`, `Act3a.text.ts` (B15), semua `src/engine/*` (kamu pemiliknya), komponen baru `src/engine/Wall.tsx`, `src/ui/ChatGPT.tsx`, `src/ui/YouTube.tsx`.
- **Jangan menyentuh** `Act2b.*`, `Act3.*`, `Act4.*`, `src/ui/Threads*`, `src/ui/GitHub*` (milik Editor B/C). Perubahan engine yang mengubah perilaku komponen yang sudah ada: tulis di `handoff/ENGINE-CHANGES.md` (satu baris) supaya Editor B tahu.

## Perbaiki (REVIEW-r1)
- F-r1-01 B06: foto ≥ 30 % lebar × 65 % tinggi sejak frame pertama; kamera 1,15 → 1,5.
- F-r1-02 mesin: nada gelap kata terbaru `#B9BEC8` → `#F4F5F7` (kontras settle ≥ 4,5:1).

## Bangun (PLAN.json, lulus_bila per beat)
- B07, B08 (cetakan lain = 12 thumbnail YouTube nyata `P/assets/yt/*.jpg` dicetak seperti foto), B10 (YouTube terang: logo asli dari simple-icons; grid hasil nyata dari `P/assets/yt/search_uang_ai.txt` + thumbnail; tampilan meniru youtube.com hasil pencarian desktop — ambil screenshot acuan dengan Playwright dari `https://www.youtube.com/results?search_query=cara+dapat+uang+dari+AI+2026` bila bisa), B11, B12–B13 (ChatGPT terang, acuan `P/assets/ref_ui/chatgpt.png`, logo `public/logos/openai.svg`), B14 dinding bukti, B15 dinding yang sama mode gelap.
- `Wall.tsx` dipakai juga oleh Editor C (B24, dinding terang yang digulung mundur): props minimal `mode:'terang'|'gelap'`, daftar cetakan berurutan, posisi dunia tiap cetakan (ekspor supaya kamera bisa menuju cetakan ke-n), benang. Isi cetakan: kartu repo GitHub asli (nama, Public/Private, bahasa bila ada, "Updated on <tanggal pushed_at>") dari `P/assets/repos.json` — pilih ±11 yang tersebar Nov 2025 → Nov 2026; 1 cetakan jendela OpenBot (agent asli dari `R/projects/builder-trap-show-your-work/remotion/public/agents/`: badan `forme-*`/`*-corps.webp` + mata; jendela app macOS gelap dengan beberapa agent dan nama peran: Developer, Creative Pro, Sales Ops, Content Research — nama ini dari app Irfan); 1 cetakan ChatGPT dengan item sidebar "Dot" (agent dots OpenAI, sidebar di bawah "New chat"); terakhir foto Irfan (Face di dalam Print, dipakai 44,4–45,7).
- Sisipan wajah: preset F1–F4, teks `#F4F5F7` (Q-06). Ingat R-007: wajah tidak pernah utuh lama.

## Boleh dibaca
Sama dengan TASK-r1 + `handoff/REVIEW-r1.md`, `handoff/REPORT-r1.md`, kode `P/remotion/src` sendiri.

## Render
Semua render lewat `flock P/qc/.render.lock R/claude/motion-graphic/scripts/juri/render.sh …` (dua Editor berbagi bundle). Still minimal 2 per beat, label `B07a`…; jangan menimpa still beat milik Editor lain. Draft rentang babakmu saja.

## Keluaran wajib
Still B06–B15 + lembar `P/qc/r2a_sheet.jpg` (overlay safe frame) · `teks_cek.py` · `node scripts/cekkata.mjs 9.9 48.95` · draft `render.sh P draft Main 297-1469` · laporan sebagai teks balasan (Sutradara menyalinnya ke REPORT-r2a.md) · pertanyaan ke `handoff/QUESTIONS.md` (awali `Q-A`).

## Selesai bila
lulus_bila PLAN B06–B15 · semua kata 9,9–48,95 tampil tepat sekali · tanpa radial · tiap shot > 2 dtk bergerak · UI menyerupai acuan asli.
