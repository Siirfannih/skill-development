# Finishing v6 · gerbang, render, dan media akhir

Tujuan: menghasilkan MP4 1920×1080, 30fps, tepat2.493 frame /83,1detik dari visual+audio v6 yang sudah diterima, dengan bukti QA terbaru. Jangan mengubah pilihan naskah, scene, VO, atau palet SFX.

## Baca hanya

- BRIEF-v6, REVIEW/REPORT-v6-voice, REPORT-v6-visual, REPORT-v6-sfx bila sudah terbit, dan DECISIONS R-027..034.
- `edit/v6/{timing-contract,adjudications,canonical-gates,canonical-findings}.json` dan `verify_adjudications.py`.
- Latest main `claude/motion-graphic/scripts/juri/{render.sh,frame_audit.py}` serta delivery-gate.md untuk gerbang visual.
- Source root, peta/word/beat data yang diperlukan untuk membuat daftar still/cut dan bundle final. Jangan membaca proyek lain.

## Otoritas dan batas

Suara diterima untuk proyek dengan deviasi eksplisit. R-032 mengizinkan penghapusan false-start yang menyatu dengan Apa, sehingga guard50ms tidak ada tepat pada sambungan itu. R-033: user memilih “Pertahankan dinamika alami (rekomendasi)” setelah preview VO. Default `voice_level.py` tetap FAIL target level; kata utuh, dinamika, noise, dan peak tetap diperiksa. Filler/diagnostik residual ditutup satu per satu oleh lead dalam adjudications terikat hash. `audio_order.py` kanonis tidak punya jalur adjudikasi dan tidak boleh diklaim PASS atau ORDER.json dipalsukan.

Jika perlu renderer proyek untuk mewakili keputusan user yang tidak didukung tool kanonis, buat penerimaan proyek yang fail-closed dan jelas, simpan hasil FAIL default, lalu terapkan SEMUA gerbang render visual dan SFX yang sama. Tidak boleh sekadar menghapus pemeriksaan audio, menulis ORDER manual agar tampak lolos, mengubah mode konten, atau memperlonggar skill global. Lead harus mereview validator dan memberi SHIP sebelum MP4 final. Semua temuan baru/stale/hash berubah di luar perubahan yang diterima harus memblokir.

Ada penyesuaian gain sumber positif untuk headroom AAC sedang diselesaikan builder VO; tunggu kontrak/hash FINAL sebelum bundle/render. Durasi/map/face tidak berubah. SFX builder masih menata mix; tunggu media bus final sebelum still/draft/semua-frame agar bukti tidak basi.

## File boleh

- `tools/finish_v6.py` atau `tools/render_v6.sh` untuk validasi/render proyek; `handoff/REPORT-v6-finishing.md`.
- `qc/stills`, `qc/draft*`, `qc/frames`, `qc/frame_audit`, logs/provenance QA, `handoff/beats_v6_frames.txt`.
- `out/v6-chunks/*`, `out/builder-trap-r2_v6.mp4`; hasil akhir disalin ke outputs workspace sesi oleh lead.
- Jangan menulis scene/UI/engine/VO/map/cues/mix/ORDER, symlink/source v5, skill global, atau file sesi lain.

## Urutan wajib

1. Siapkan validator proyek dan daftar26beat actual frame dari knots final. Default gate dijalankan terpisah, hasil/exit code disimpan. Jalankan verifier176artefak dan pemeriksaan negative hash/missing disposition yang sudah ada. SFX-density terhadap draft+objects wajib PASS dengan validator terbaru; audio-bus satu root dan typecheck PASS. Gate voice yang menyimpang wajib cocok persis dengan adjudications dan R-032/R-033, bukan waiver generik.
2. Setelah bus audio final: render still26beat dan tambahan titik kritis melalui `render.sh still`, lalu montage untuk lead. Jangan membawa still lama seolah terbaru. Font/assets tidak boleh404; wallpaper public lokal adalah copy dengan hash sama sumber.
3. Render draft full skala0,5 tanpa audio melalui `render.sh draft`; ini bahan gerak. Render SEMUA2.493 JPEG skala0,5 lewat `render.sh frames` dengan kunci berat global. Jangan mencampur frame render lama dan baru. Gunakan `frame_audit.py --src remotion/src`, cuts/cues/words/stems v6; semua83,1detik dalam9potongan≤10detik, 30frame perlembar1detik. Stem nama harus cocok pola alat (VO/music/SFX), dapat memakai link QA sendiri.
4. Laporkan INDEX dan daftar flags ke lead. Lead mengatur pemeriksa Gemini DAN ChatGPT independen pada SEMUA lembar; jangan isi VERDICT LULUS sendiri, jangan sampling atau menyebutnativevideo1fps sebagai playback kontinu. Lead mengadjudikasi perbedaan dan membuat JURI terbaru/sanding/alasan keseimbangan bila perlu.
5. TUNGGU SHIP eksplisit lead. Disk saat ini7–8GB; render final dalam chunk kecil (mis300frame) dengan nice10, thread2, TMPDIR khusus, `flock /tmp/remotion-heavy-render.lock`. Jangan render video penuh sebelum QA. Semua gate visual lama wajib terpenuhi untuk source final. Bila final memakai renderer proyek karena R033, log alasan dan hasil tool kanonis yang ditolak secara eksplisit. Chunk video muted, CRF≤18, gabung memakai concatFILTER+encode ulangCRF14 dan pasang mix83,1s sekali. Jangan concatdemuxer-copy: baseline v4 kehilangan frame di sambungan.
6. Final verifikasi ffprobe1920×1080/30fps/2493frame, durasi audio/video, sambungan chunk tanpa framehilang/ulang, AAC truepeak≤−1dBTP, voice waveform/provenance tidak berubah, tidak ada decodeerror. Simpan parameter encode/hash. Jika gagal, laporkan akar masalah sebelum mengubah media.

Resource: `/home/irfan/work/mg-venv/bin/python`, nice10, KONKURENSI2, OMP/OPENBLAS/MKL2, ffmpeg filter_threads1, TMPDIR `/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery/work/tmp`. Jangan mematikan proses atau menghapus cache sesi lain. Doctor tugas PASS pada `work/session-config/doctor.log`; jika diulang gunakan konfigurasi skill khusus tugas, bukan global BDF.
