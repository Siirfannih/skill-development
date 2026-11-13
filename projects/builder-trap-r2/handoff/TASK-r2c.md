# TASK r2c · Babak 4 (B23–B26): sadar & janji

Editor C. Dijalankan setelah Editor A (mesin + `src/engine/Wall.tsx`) dan Editor B (`src/ui/Threads.tsx`) selesai. P = `projects/builder-trap-r2`.

## Cakupan
- File kamu: `src/scenes/Act4.tsx`, `Act4.text.ts`. Pakai `Wall` (Editor A) dan `Threads` (Editor B) lewat props; butuh perubahan di komponen mereka → tulis permintaan di `handoff/QUESTIONS.md` (awalan `Q-C`), atau bungkus di file sendiri.
- Jangan menyentuh file lain.

## Bangun (PLAN.json B23–B26, lulus_bila per beat)
- B23: wipe linear gelap→terang dari bawah (75,2–75,6; transisi dari B22 milik Editor B, koordinasikan lewat `over:true` di file kamu bila perlu), wajah F4 grade `bersih`, K4 "sadar." + "sampai akhirnya aku".
- B24: `Wall` mode terang; kamera whip pan kanan→kiri menyusuri benang (motion blur) lalu settle dan push ke cetakan pertama (repo Jadisatu, Nov 2025); H "titik awal" ditulis tangan + lingkaran di sekitarnya; sisipan wajah F2 81,38–82,8 dengan N "Dimana mungkin aku harusnya"; N "gak sekedar membangun." di bawah cetakan pertama.
- B25: wajah F3 84,72–85,9 dengan N "Tapi juga nge-share"; lalu Threads terang: composer "New thread", cetakan dari dinding (foto Irfan, kartu repo, jendela OpenBot) masuk sebagai lampiran, kursor **mengklik Post**, tiga post terbit berurutan (spring dari bawah), tiap frasa "apa yang aku alami." / "apa yang aku buat." / "apa pengalaman yang aku dapatkan." menempel post-nya; kamera mengikuti.
- B26: wajah F4 hangat, K4 "share." lalu "belum sempurna." + "ngebagiin apa yang" di tempat yang sama; push terus sampai frame terakhir 2848; tanpa fade ke hitam.

## Boleh dibaca
`R/claude/motion-graphic/LANTAI.md`, `P/RESEP.md`, kartu 55 dan 63, `P/handoff/BRIEF.md`, `PLAN.json`, `REPORT-r1.md`, `REPORT-r2a.md`, `REPORT-r2b.md`, `REVIEW-*.md`, file ini, kode `P/remotion/src` (baca untuk memakai API), referensi typography/smooth-motion/camera-transition, skill Remotion, contoh gagal.

## Render
`flock P/qc/.render.lock R/claude/motion-graphic/scripts/juri/render.sh …`. Still minimal 2 per beat (`B23a`…). Draft `render.sh P draft Main 2262-2848`.

## Keluaran wajib
Still B23–B26 + lembar `P/qc/r2c_sheet.jpg` (overlay safe frame) · `teks_cek.py` · `node scripts/cekkata.mjs 75.4 94.97` · draft · laporan sebagai teks balasan.
