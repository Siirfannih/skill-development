Butir: builder-trap-r2-v5-r9 · tertahan
Selesai: kandidat konservatif 9 cut, 91,300 dtk / 2739 frame; overlap/durasi/guard PASS; 11 kata regresi 100%; typecheck dan cek kata kandidat PASS; perspektif kamera B17/B25 ditambahkan.
Sisa: alignment waveform tiga filler tuh; integrasi wajah v5; transkrip ulang, audit lip-sync, still before/after tepat beat, proxy lengkap.
Gerbang: overlap ok · transkrip menunggu · lip-sync menunggu · typecheck ok · cek kata ok · still menunggu · proxy menunggu
Perlu keputusan: Lead perlu menyelesaikan kontrak Face.tsx yang di luar FILE BOLEH sebelum mengaktifkan timeline v5; tidak ada permintaan izin ulang ke Irfan.
Catatan reviewer: Main/Root/timewarp/words tetap v4; v5 belum aktif dan belum boleh dirender final.
Kandidat masih memuat tiga tuh dalam audio; words_final/words_v5 adalah TARGET, bukan bukti transkrip.
Resource gate menemukan job sesi lain PID 4108755 (edge10f.py, ~601% CPU); render/Whisper lanjutan ditunda.

## Yang dikerjakan dan buktinya
- `edit/make_v5.py --audio` membuat data + suara kandidat dari voice_raw, tanpa mengubah naskah atau aset sumber. Durasi sumber 94,966667 dtk → 91,300000 dtk; 4.382.400 sampel @48kHz = 2739 frame @30fps. Peta, audio kandidat dan durasi komposisi yang direncanakan sama persis. Komposisi aktif v4 masih 2501 frame.
- 9 cut dipertahankan setelah guard clipping dan pemilihan batas frame dengan RMS 2 ms <−38 dBFS. Tidak memakai equal-power overlap: micro-fade 2 ms hanya di celah berenergi rendah, tanpa pengurangan durasi tersembunyi. Audio dan proxy wajah memakai rentang identik. Energi tiap endpoint di `edit/v5/map.json`.
- `cut_decisions.json` mencatat semua usulan v3 yang dipertahankan/ditolak. Seluruh cut “di dalam kata” dan cut Apa→pengalaman ditolak. Ketiga cut filler ditolak sementara karena timestamp sumber menyentuh kata tetangga; menghapusnya dengan timestamp itu melanggar guard 50 ms. Tidak mengklaim filler hilang.
- `cut_check.py --source-words ... --map ... --validation-out ...`: PASS untuk overlap <=20 ms, retensi >=85%, dan guard 50 ms. Semua kata isi mempertahankan 100%. Lima tes adversarial PASS (`gate-unittest.log`); map v4 ditolak dengan 107 temuan (`gate_tests.json`), termasuk JSON remap palsu.
- `cekkata-candidate.log`: exit 0 saat import words/knots sementara diarahkan ke v5 lalu dikembalikan dalam finally. PASS ini hanya membuktikan target teks tampil; tidak membuktikan audio/filler/transkrip.
- `recut-check.log`: audio orkestrator dan recut identik sampel demi sampel (4.382.400 sampel; 2739 frame).
- `typecheck.log`: `tsc --noEmit` exit 0; Python py_compile dan git diff --check PASS.
- `audio/cues_v5.py`: 75 cue r8 dipetakan ulang dari t_v2 lewat invers knots v5, output `edit/v5/cues.json`. voice_clean_v5 memakai words_actual agar filler yang masih ada tidak teredam karena dikeluarkan dari target JSON. mix_v5 mempertahankan resep musik/mix v3 dan membangun stem cue pada timeline kandidat; belum dieksekusi/diaudit karena resource gate.

## Hambatan integrasi yang konkret
`engine/Face.tsx` (di luar daftar perubahan) mengunci `face_edit_v3.mp4`, `Math.min(vf,2500)`, FACE_JUMPS v3, dan hold pada waktu v3. Mengaktifkan knots v5 di Main sekarang akan membuat video wajah tetap v3 dan berhenti bergerak pada 83,33 dtk. Jangan mengaktifkan data v5 sebelum jalur wajah menerima aset, durasi, dan cut baru. EndFade Act4 juga perlu dipetakan ke durasi baru saat integrasi. Tidak menambal jalur aset publik yang merupakan symlink ke sesi lain.

## Transkrip dan jumlah kata
Sumber `edit/words_final.json` = 228 entri; tanpa tiga tuh = 225. Angka brief “225 dikurangi tiga” berbeda dari sumber; default target 225, tanpa mengubah urutan. `words_actual.json` memuat semua 228 kata yang masih ada pada kandidat; `words_final.json` dan words_v5 memuat target 225. Tidak ada jumlah entri yang dipakai sebagai bukti kata terdengar.
Interpreter Whisper tersedia: `/home/irfan/work/mg-venv/bin/python`, cached large-v3 tersedia. `make_v5.py --transcribe` memakai large-v3 CPU int8, 2 thread, local_files_only, tanpa initial_prompt, lalu menyimpan transcript.json dan perbandingan urutan. Belum dijalankan karena job lain masih berat. Hasil tidak diasumsikan PASS.

## Timestamp regresi (kejadian paling rusak di v4 per kata)
Semua kejadian lain ada di `edit/v5/regression.json`.

| Kata | Sumber (dtk) | Kandidat (dtk) | Durasi utuh |
|---|---|---|---|
| Apa | 89.140–89.560 | 85.473–85.893 | 100% |
| Untuk | 59.140–59.680 | 57.707–58.247 | 100% |
| Dan | 77.820–78.380 | 74.953–75.513 | 100% |
| mungkin | 81.720–82.620 | 78.853–79.753 | 100% |
| Semua | 0.000–0.740 | 0.000–0.740 | 100% |
| Share | 91.280–91.860 | 87.613–88.193 | 100% |
| gak | 16.580–17.380 | 16.080–16.880 | 100% |
| mau | 20.580–21.280 | 20.080–20.780 | 100% |
| satu | 47.180–47.740 | 45.913–46.473 | 100% |
| sekedar | 83.520–84.220 | 80.653–81.353 | 100% |
| aku | 71.040–71.740 | 69.073–69.773 | 100% |

## Visual dan proxy
- Diff hanya kamera/shadow B17 dan B25: Y −2,5°→−1,2° / +2,5°→+1°, X +1°→+0,5° / −1°→−0,3°; semua di bawah batas ±4°/±2°. Stage asli dipakai; UI/kursor bergerak dalam dunia yang sama. B12/B13 dan B18/B19 tidak diubah.
- `edit/v5/B25-after.png`: still skala 0,5, frame nyata v4 2293. Belum ada sanding sebelum/sesudah; belum mengklaim safe frame/kejelasan lulus.
- Dua still f1344 ternyata berada di B16, bukan B17; sudah diberi nama `diagnostic-B16-B17-*.png` dan TIDAK dipakai sebagai bukti B17. B17 yang benar fLama 1522–1574; gunakan fBaru v4 sekitar 1363/1380 untuk composer/dialog. Pending before/after saat resource aman.
- `edit/v5/face-proxy/wajah.mp4` adalah PARSIAL: proses ffmpeg milik r9 dihentikan dengan SIGINT setelah pemeriksaan CPU menemukan job lain. Bukan proxy lulus. Tidak ada render final.
- `make_v5.py --proxy` membuat proxy wajah 0,5 dari sumber yang sama, concurrency satu proses / dua thread, lalu mux voice_clean; gerbang PS menolak saat ada encoder atau job >250% CPU. `resource-gate.log` membuktikan penolakan sebelum memulai proses baru.

## Titik lanjut untuk lead
1. Selesaikan alignment waveform tiga tuh sambil mempertahankan kata tetangga; ulangi validator, jangan mengurangi guard agar hijau.
2. Jalankan ulang `edit/make_v5.py --audio`, voice_clean_v5, cues_v5; transkrip dengan interpreter mg-venv setelah resource aman.
3. Integrasikan Face v5 di scope lead, lalu aktifkan words/knots/mix v5 dan EndFade baru; cek audio/video/komposisi/map <=1 frame dan spot awal/tengah/akhir.
4. Still sanding B17/B25, proxy komposisi skala 0,5 concurrency 1 / <=2 thread, lalu audit Sutradara. Render final tetap dilarang.

## Berkas berubah
- `edit/potong_v5.json`, `edit/make_v5.py`, `edit/v5/*` (data, log, test; WAV/MP4/tmp ignored).
- `audio/{voice_clean,cues,mix}_v5.py`, `remotion/src/data/{knots,words}_v5.json`.
- `remotion/src/scenes/{Act3,Act4}.tsx` (B17/B25 saja).
- `claude/motion-graphic/scripts/{audio/recut,gate/cut_check}.py`, REPORT-r9, STATUS.

## Akses tambahan yang diperlukan

- AUTHORITY.md, claude/motion-graphic/SKILL.md, claude/working-with-irfan/SKILL.md dan external/remotion-skills/skills/remotion/SKILL.md: otoritas proyek dan aturan Remotion wajib.
- remotion/src/engine/{words,Stage,Face}.tsx/.ts, Root.tsx, package.json, cek kata: memahami kontrak peta waktu, wajah, perspektif, komposisi dan perintah validasi; tidak mengubah komponen bersama.
- metadata/path aset suara/video sumber, cue/stem v4 dan knots_v3: merakit ulang dari sumber tanpa menimpa v4; media hanya dibaca.
- ~/.ops-report/INDEX.md dan projects/skill-development.md: kewajiban laporan; git refs untuk pemeriksaan branch.
- tools/doctor.sh di checkout lead `/home/irfan/work/skill-development`: mencari interpreter/audio tooling yang telah lulus doctor untuk transkrip tanpa memasang model baru. Baca metadata cache Hugging Face saja untuk memastikan model lokal tersedia.
- Act3.text.ts/Act4.text.ts: mengambil batas beat agar still B17/B25 tepat sasaran.
