# REPORT r10 · Timeline v5 aktif di kode; gate media tertahan resource

Butir: builder-trap-r2-v5-r10 · tertahan
Selesai: integrasi kode v5 91,300 dtk / 2739 frame; 9 cut dan 3 tuh utuh; typecheck, cek kata, 7 tes r10 + 5 tes cut PASS.
Sisa: build mix/wajah penuh, transkrip large-v3, audit dengar dan lip-sync, still before/after B17/B25, proxy komposisi.
Gerbang: data PASS · typecheck PASS · cek kata PASS · transkrip BELUM · dengar BELUM · lip-sync BELUM · still BELUM · proxy BELUM.
Perlu keputusan: tidak ada. PID 4108755 selesai; resource gate kini menunggu job sync9.py PID 4124114 >250% CPU selesai.
Tidak ada render final. Tidak ada proses sesi lain dihentikan.

## Perubahan dalam cakupan TASK

- Root dan Main menggunakan DUR_V5 dari knots_v5 (2739 frame) dan mix_v5.wav. Words memakai words_v5; caption tetap 225 kata dan audio aktual tetap 228 termasuk tiga tuh (R-026).
- Face memakai face_edit_v5.mp4 pada frame nyata; clamp menjadi DUR_V5 − 1 (2738), bukan 2500. FACE_JUMPS dihitung langsung dari sembilan removed interval map.json: f282, 714, 1145, 1353, 1729, 1870, 2190, 2247, 2560. Ini titik sambungan matematis, belum bukti hasil wajah telah dilihat.
- Hold B23 [2066,2065] dihapus: berasal dari edit lama dan membekukan bibir saat audio v5 tetap berjalan. Fade akhir memakai DUR_V5 − 15 sampai DUR_V5 − 1 (f2724–2738), durasi fade lama dipertahankan.
- make_v5.py --face disiapkan untuk memotong video sumber penuh dengan rentang frame yang identik, concat tanpa overlap, encoder dua thread dan filter concurrency satu. BELUM dieksekusi karena gate resource. Builder menolak perubahan sembilan cut atau validator FAIL sebelum menulis media.
- Transkrip large-v3 lokal tanpa prompt sekarang dibandingkan terhadap words_actual.json (228), bukan daftar caption tanpa filler. Ketidakcocokan menghasilkan exit nonzero dan diff; normalisasi sekarang hanya case/punctuation, sehingga perbedaan ejaan/angka harus ditinjau dan tidak otomatis dianggap kata hilang.
- Gate resource eksplisit menolak PID 4108755 sekalipun CPU turun, job >250%, ffmpeg lain dan render/transkrip lain yang dikenali. Audio cleaner/mixer memeriksa gate sebelum tiap subprocess ffmpeg; BLAS/OMP/MKL dibatasi dua thread. Concurrency pekerjaan r10 satu.
- Symlink folder public sebelumnya menunjuk checkout bersama. Diganti direktori lokal dengan symlink baca aset lama; hanya dua keluaran v5 diarahkan ke edit/v5 lokal. Tidak menulis media ke checkout bersama. Kedua target v5 belum tersedia, sehingga integrasi kode belum menjadi komposisi siap render. Public tidak ditrack.

## Bukti data dan tes ringan

- edit/v5/test-r10.log: 7 tes PASS. Peta tetap 9 cut; seluruh kata sumber mempertahankan teks, waktu remap, durasi; tiga tuh tetap ada; caption tepat actual tanpa tuh; audio suara.wav dan voice_clean.wav masing-masing 4.382.400 sampel @48 kHz = 91,300 dtk; penolakan PID diam/CPU tinggi teruji; transkrip tanpa filler atau kata isi ditolak.
- edit/v5/gate-r10.log: 5 tes adversarial cut PASS.
- edit/v5/typecheck-r10.log: tsc --noEmit exit 0 pada jalur aktif v5.
- edit/v5/cekkata-r10.log: exit 0, semua kata caption tampil tepat sekali dan terlihat saat diucapkan. Catatan TAHAN tetap ada; ini bukan bukti dengar/sinkron bibir.
- Python py_compile dan git diff --check PASS. Durasi clean audio yang tersedia diverifikasi dari header; durasi mix/video penuh belum bisa diverifikasi. Belum mengklaim kesamaan empat durasi <=1 frame.
- edit/v5/sync-plan-r10.json mencatat seluruh sembilan join dan spot awal 1,00 / tengah 45,65 / akhir 89,50 dtk, dengan status dengar/lip-sync pending. Metadata sambungan tidak dipakai sebagai hasil audit audio/visual.

## Resource dan gate yang belum dijalankan

Doctor PASS; disk tersedia sekitar 15 GB. Pemeriksaan berulang menemukan edge10f.py PID 4108755 tetap aktif, sekitar 587–591% CPU, kemudian PID itu selesai. Gate sempat PASS dan make_v5.py --audio berhasil (build-r10.log). Sebelum cleaner meluncurkan ffmpeg, job baru sync9.py PID 4124114 muncul >250% CPU (hingga 611% saat cek ulang); cleaner menolak sebelum subprocess (clean-r10.log). edit/v5/resource-r10.log menyimpan penolakan terakhir. Tidak menjalankan Whisper, ffmpeg, atau Remotion dalam sesi r10 selama gate tertutup. Typecheck dan esbuild cek kata adalah tes ringan, bukan render.

Tidak ada hasil transkrip baru, audit dengar Gemini/ChatGPT, spot lip-sync, still B17/B25 baru atau proxy komposisi baru. Artefak r9 yang parsial/salah beat tetap tidak dipakai sebagai PASS.

## Titik lanjut saat resource aman

Jalankan dari checkout ini, berurutan, dengan OMP_NUM_THREADS=2 OPENBLAS_NUM_THREADS=2 MKL_NUM_THREADS=2 GOMAXPROCS=2; jangan jalankan dua pekerjaan sekaligus. Interpreter: /home/irfan/work/mg-venv/bin/python.

1. edit/make_v5.py --check-resources harus PASS; ulangi gate sebelum setiap pekerjaan berat. PID 4108755 harus sudah hilang, bukan sekadar CPU turun.
2. Dari root repo: python projects/builder-trap-r2/edit/make_v5.py --audio (sudah berhasil di jendela gate PASS). Dari folder proyek: python audio/voice_clean_v5.py; python audio/cues_v5.py; python audio/mix_v5.py. Lalu dari root: python projects/builder-trap-r2/edit/make_v5.py --face. Semua cut tetap beku.
3. --transcribe pada make_v5.py; baca transcript-check.json, bedakan ejaan/angka dari kata isi hilang. Durasi mix/clean/video penuh dan Root harus berbeda <=1 frame, hitung frame video secara eksplisit.
4. setup_stills_r10.py sudah menyiapkan staging lokal before/after dan still-plan-r10.json: B17 f1502/f1526, B25 f2520/f2554. Belum dirender. Buat still before/after B17 dan B25 pada frame nyata v5 yang dihitung dari waktu adegan lama, bukan f1344 (B16). Baseline before harus hanya membalik perspektif r9, dengan timing v5 yang sama. Gunakan render.sh dalam staging lokal agar qc di luar FILE BOLEH tidak berubah; concurrency 1 dan encoder <=2 thread. Jangan memakai B25-after r9 sebagai pasangan before/after.
5. Audit dengar + lip-sync awal/tengah/akhir dan sembilan join; catat hasil sebenarnya di sync-plan-r10.json. Proxy komposisi 0,5 hanya setelah gate aman, still tepat beat dan durasi/transkrip lulus. Render final tetap dilarang.

## Batas sesi

Tidak mengubah skill, keputusan, sumber audio/video, cut, tiga filler atau scene perspektif B17/B25. DAILY tidak diedit karena di luar FILE BOLEH; titik lanjut disimpan di laporan ini dan STATUS. AUTHORITY.md proyek tidak tersedia; TASK-r10 + R-024..R-026 menjadi otoritas spesifik. Skill Remotion memakai path aktual external/remotion-skills/skills/remotion-render/SKILL.md; path lama .../remotion/SKILL.md tidak tersedia. Salinan skill lama akun claude.ai yang disebut doctor diabaikan.
