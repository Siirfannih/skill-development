# TASK r1 · bangun seluruh visual (tanpa SFX/musik) sampai still per beat + draft 0,5 lulus gate mekanis

Proyek: `/home/irfan/work/skill-development/projects/jensen-pain-suffering` (singkat: `P`). Repo skill: `/home/irfan/work/skill-development` (singkat: `R`).

Cakupan: B1–B12 (semua beat di `handoff/PLAN.json`).

Boleh dibaca:
- `R/claude/motion-graphic/LANTAI.md`, `P/RESEP.md`, `R/claude/motion-graphic/pustaka/kartu/55-storytelling-with-footage.md`
- `P/handoff/BRIEF.md`, `P/handoff/PLAN.json`
- `R/claude/motion-graphic/references/build.md`, `typography.md`, `smooth-motion.md`, `R/claude/motion-graphic/fonts/README.md`
- Engine boleh disalin dan disesuaikan dari `R/projects/builder-trap-r2/remotion/` (package.json, remotion.config.ts, `src/engine/*`: camera.ts, fonts.ts, words.ts, TextLayer.tsx, Print.tsx, Transitions.tsx, Face.tsx). node_modules: symlink seperti di proyek itu (`R/projects/jadisatu-trojan-v4/remotion/node_modules`).
- Skill Remotion (`remotion-best-practices`) bila perlu.

## Siapkan media (ke `P/remotion/public/`)
Potong dulu dengan ffmpeg (re-encode H.264 CRF 16, tanpa audio kecuali wajah tidak perlu audio juga) agar render ringan:
| Nama keluaran | Sumber | Rentang (dtk sumber) | Catatan |
|---|---|---|---|
| wajah.mp4 | `P/audio/wajah.mp4` | utuh | sinkron dengan `audio/suara.wav`, frame 0 = 0,0 dtk |
| grad_pose.mp4 | `P/broll/pexels/7712312-hd_1920_1080_30fps.mp4` | 0–4 | |
| grad_clap.mp4 | `P/broll/pexels/7945851-hd_1080_1920_25fps.mp4` | 1–4 | vertikal → crop ke 16:10 di bagian tangan bertepuk + wajah |
| arsip_dennys.mp4 | `P/broll/yt/DpQQi2scsHo.mp4` | 473,5–476,5 | eksterior Denny's malam |
| arsip_meja.mp4 | sama | 487,5–490,0 | foto Jensen muda di meja kantor (cek frame; pakai rentang yang memperlihatkan foto lama itu) |
| arsip_komputer.mp4 | sama | 513,0–519,0 | Jensen muda di depan komputer lama |
| arsip_logo.mp4 | sama | 521,5–527,5 | Jensen muda di depan logo NVIDIA lama |
| nv_hq.mp4 | sama | 467,0–471,0 | HQ NVIDIA dari udara |
| nv_tim.mp4 | sama | 551,5–556,5 | foto tim NVIDIA awal |
| stres.mp4 | `P/broll/pexels/6290471-uhd_2560_1440_30fps.mp4` | 0–5 | skala ke 1920 |
| ketik.mp4 | `P/broll/pexels/5281595-uhd_2560_1440_30fps.mp4` | 0–3 | |
| tempa.mp4 | `P/broll/pexels/forge_5846379.mp4` | 0–5 | |
| percik.mp4 | `P/broll/pexels/forge_35117150.mp4` | 0–3 | 60 fps → 30 fps |
| pcb.mp4 | `P/broll/pexels/6754830-uhd_2560_1440_25fps.mp4` | 0–2 | |
| gelap.mp4 | `P/broll/pexels/20563164-uhd_2560_1440_30fps.mp4` | 0–5 | |
Rentang 60 Minutes diperkirakan dari lembar kontak; periksa frame-nya sendiri (`P/qc/60m_arsip.jpg` labelnya salah skala: waktu asli = 462 + (label − 462)/2). Logo/bug "60 Minutes" di sudut boleh tertutup crop; watermark sumber kartu 55 dibiarkan, jadi tidak wajib dihapus. Bila rentang salah, cari ±5 dtk dan tulis pilihanmu di REPORT.

## Bangun
- Komposisi `Main` 1920×1080, 30 fps, 1428 frame (47,6 dtk). Audio `suara.wav` dipasang di komposisi (hanya suara; JANGAN tambah SFX/musik).
- Ikuti PLAN.json per beat: visual, kamera, teks (isi teks persis PLAN, waktu muncul dari `audio/words.json`), material per babak.
- Teks: Poppins dari file font repo (bukan fallback), tinggi huruf kata sambung dan kata kunci sama di satu tampil, kata kunci amber `#E8A33D`, sisanya putih `#F4F1EA`. Kontras ≥ 4,5:1 (beri bayangan lembut/scrim gelap lokal bila perlu, bukan kotak).
- Kamera: tiap shot > 2 dtk bergerak (push/pan), satu objek fokus per beat; elemen diam di dunianya. Motion blur di punch-in B3 dan gerak cepat.
- Babak II: foto fisik = video arsip di dalam bingkai putih bertepi (cetakan), bayangan jatuh, meja/kertas gelap bertekstur `#0E0D0C`, vignette.
- Babak III: grade monokrom kontras tinggi + grain; kartu judul "SUFFERING" dengan video percikan di dalam huruf (mask teks).
- B12: kartu hitam, tanpa logo/wordmark apa pun.

## Keluaran wajib
1. Still tiap beat via `R/claude/motion-graphic/scripts/juri/render.sh P still Main B1:<f> … B12:<f>` (pilih frame saat teks utama beat tampil penuh; untuk B3 juga satu frame tepat setelah punch-in, untuk B5 frame kartu judul).
2. Gate: `python3 R/claude/motion-graphic/scripts/juri/teks_cek.py` dan `balance_check.py` pada `P/qc/stills` (lihat `--help`); salin keluaran apa adanya.
3. Draft gerak 0,5: `render.sh P draft Main` → `P/qc/draft.mp4`.
4. `P/handoff/REPORT-r1.md` (format: tabel Beat | Dikerjakan | Bukti | Angka/gate | Menyimpang?).

Selesai bila: 12 still ada, teks_cek tanpa FAIL, tidak ada teks di luar safe frame 5 %, draft.mp4 ada dan panjangnya 47,6 dtk ±1 frame.
Jangan: menambah teks yang tidak ada di PLAN, menulis "final"/"lulus", render final, menyentuh `audio/`.
