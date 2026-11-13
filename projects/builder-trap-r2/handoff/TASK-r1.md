# TASK r1 · Mesin video + babak 1 (B01–B05) + B06 sebagai validasi satu adegan

Proyek: `/home/irfan/work/skill-development/projects/builder-trap-r2` (sebut `P`). Repo skill: `/home/irfan/work/skill-development` (sebut `R`).

Cakupan: membuat proyek Remotion baru di `P/remotion/` dan membangun B01–B06 sesuai `handoff/PLAN.json`. Beat lain belum disentuh, tapi mesin harus siap dipakai babak lain (Editor lain akan menambah file adegan sendiri).

## Boleh dibaca
- `R/claude/motion-graphic/LANTAI.md`, `P/RESEP.md`, `R/claude/motion-graphic/pustaka/kartu/55-storytelling-with-footage.md`, `R/claude/motion-graphic/pustaka/kartu/63-motiongrapich.md`
- `P/handoff/BRIEF.md`, `P/handoff/PLAN.json`, file ini
- `R/claude/motion-graphic/references/typography.md`, `references/smooth-motion.md`, `references/camera-transition.md`
- skill Remotion (`remotion-best-practices` dan turunannya) untuk API
- Frame kiblat: `R/claude/motion-graphic/guide/referensi/sheets/55-storytelling-with-footage.jpg`, `.../sheets/keyframes/55-k*.jpg`, `.../sheets/63-motiongrapich.jpg`, `.../sheets/keyframes/63-k*.jpg` (lihat gambarnya sebelum membangun)
- Contoh gagal (yang tidak boleh terulang): `R/claude/motion-graphic/pustaka/contoh-gagal/README.md` + gambarnya

## Persiapan
1. `P/remotion/`: package.json Remotion versi sama dengan `R/projects/builder-trap-show-your-work/remotion/package.json` (boleh `npm install`, atau symlink `node_modules` dari proyek lama untuk hemat disk; **kode `src/` proyek lama jangan dibuka**). Komposisi `Main` 1920×1080, 30 fps, 2849 frame. Audio komposisi = `face_edit.mp4` (suara) — salin/symlink ke `public/`.
2. Font: SF Pro Display (`~/fonts-lokal/sf-pro-display/`), Playfair Display (`R/claude/motion-graphic/fonts/playfair-display/`), Caveat (`P/assets/fonts/Caveat.ttf`), Inter (`R/claude/motion-graphic/fonts/inter/`) ke `public/fonts/`; dimuat dengan FontFace + delayRender. Tambahkan `public/fonts/sf-pro-display/` ke `.gitignore` (lisensi lokal).
3. Klip arsip: potong subklip pendek (≤ 3 dtk, 1920 lebar, 30 fps, H.264) dari `P/assets/footage/*.mp4` ke `public/footage/`. Pilih momen yang memperlihatkan orang/aksi (tonton contact sheet klipnya dulu). Catat detik sumber tiap subklip di `P/handoff/REPORT-r1.md`.
4. Logo: paket npm `simple-icons` (path SVG asli) untuk OpenAI, Threads, GitHub, YouTube.

## Mesin yang dibangun (dipakai semua babak)
- `Stage`: kamera perspektif sungguhan (posisi x/y/z, rx/ry/rz, fov) dengan 4 lapisan pada kedalaman berbeda (L1 latar, L2 dunia, L3 teks, L4 objek depan); keyframe kamera dengan easing (bezier/spring, bukan linear); motion blur saat kecepatan kamera tinggi (mis. `@remotion/motion-blur` CameraMotionBlur atau trail) .
- `TextLayer` membaca `P/edit/words_final.json` (salin ke `src/data/`) dan menampilkan kode N, K3, K4, J, H sesuai BRIEF §Sistem teks. Satu sumber kebenaran: tiap kata muncul tepat sekali, pada waktunya. Buat fungsi pengecek yang mencetak kata yang tidak tampil / tampil dobel (dipakai semua babak).
- `Face`: sisipan dari `face_edit.mp4` (OffthreadVideo, frame = frame timeline), preset crop F1–F4 + grade per babak (BRIEF §Wajah).
- `Print` (cetakan foto/kartu fisik: bingkai putih, bayangan jatuh, pin, rotasi kecil), `Cursor` (panah macOS besar), `PixelMosaic` (transisi kotak ±8 % tinggi, warna aksen + putih), `WipeLinear`.
- Struktur file: `src/engine/*`, `src/scenes/Act1.tsx`, `src/scenes/Act2.tsx` …, `src/Main.tsx` merangkai Sequence per beat dari waktu PLAN. Editor babak lain akan menambah `Act3.tsx`, `Act4.tsx`; buat agar mereka tinggal menambah file dan satu baris di Main.

## Keluaran wajib
- Still tiap beat B01–B06 (minimal 2 per beat: awal dan puncak) lewat `R/claude/motion-graphic/scripts/juri/render.sh P still Main <label:frame> …` (label `B01a`, `B01b`, …).
- `python3 R/claude/motion-graphic/scripts/juri/teks_cek.py P/qc/stills/` → salin keluaran.
- Draft gerak 0–11 dtk: `render.sh P draft Main 0-330`.
- Lembar still (contact sheet) `P/qc/r1_sheet.jpg` dengan overlay safe frame (garis tipis merah x 165–1755, y 140–935) supaya mudah dicek.
- `handoff/REPORT-r1.md` (format `R/claude/motion-graphic/templates/roles/handoff.md`).

## Selesai bila
- B01–B06 sesuai `lulus_bila` di PLAN; kata di 0–14,92 dtk tampil tepat sekali (keluaran pengecek kata).
- Font termuat dari file (bentuk huruf SF Pro, bukan fallback).
- Tidak ada `radial-gradient` di src (`grep -r radial-gradient src` kosong).
- Tidak ada shot > 2 dtk tanpa gerak kamera.

## Jangan
- Menulis di luar `P/remotion/`, `P/qc/`, `P/handoff/REPORT-r1.md`, `P/handoff/QUESTIONS.md`.
- Render penuh (`final`).
