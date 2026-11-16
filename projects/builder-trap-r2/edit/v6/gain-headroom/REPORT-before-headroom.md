# Spine suara v6 · 16 November 2026

**Diterima untuk proyek dengan deviasi terdaftar; gate kanonis masih FAIL.** Timing terkunci pada **83,100000 detik / 2.493 frame / 3.988.800 sampel**, 30 fps, 48 kHz mono. Lead menerima source/editorial setelah QC audio independen; Irfan memilih **“Pertahankan dinamika alami (rekomendasi)”** melalui R-033 sehingga VO saat ini dipertahankan. Tidak ada keputusan audio user yang masih tertunda. Kontrak ini siap dipakai fase visual. Fase2 tidak merender komposisi final dan tidak membuat atau memalsukan lock `audio_order`/`ORDER.json`.

Builder menyediakan hasil dan pengukuran. Penilaian dengar berasal dari Gemini native audio melalui lead, bukan audit kreatif builder atas hasilnya sendiri. Laporan native, daftar `read_file`, stream tool berstatus DONE, serta hash snapshot disimpan di `edit/v6/native-qc/`.

## Media dan kontrak timing

Semua path di bawah relatif terhadap `projects/builder-trap-r2/`.

| Artefak | Isi |
|---|---|
| `edit/v6/timing-contract.json` | Kontrak 2.493 frame dan SHA256 source/media/map/ASR/knots/caption. |
| `edit/v6/adjudications.json` | Disposition tepat 25 kejadian, satu splice R-032, deviasi level R-033, dan hasil gate asli. |
| `edit/v6/source_raw.wav` | Montage dibangun dari `raw/src48.wav`: 97,2 detik / 2.916 frame; sebelas kelompok raw dan padding jeda eksplisit. |
| `edit/v6/source-origins.json` | Provenance raw/source/EDL lama, padding, dan fase grid keping10. |
| `edit/v6/suara.wav` | Recut sumber tanpa pemrosesan. |
| `edit/v6/voice_clean.wav` | VO final fase2, 83,1 detik / 3.988.800 sampel float mono. |
| `edit/v6/map.json`, `edit/potong_v6.json` | 28 rentang cut, total14,1 detik; raw_times, source/output frames, endpoint energy, dan guard. |
| `edit/v6/face_edit_v6.mp4` | 1920×1080,30fps,tepat2.493frame; source dan recut memakai peta audio yang sama. |
| `edit/v6/face-audio-proxy.mp4` | Wajah+VO untuk pemeriksaan sinkron; tanpa scene, musik, atau SFX. |
| `remotion/src/data/knots_v6.json`, `words_v6.json` | Peta scene monotonic dan225token caption;228token kanonis tetap di peta ucapan. Tiga `tuh` disembunyikan pada caption sesuai baseline. |

SHA256 utama:

- VO: `d200737bed8d2ea23e3f300da2296c9f3b72861af15feb35ae73773c85929806`
- Map: `65bc52f10e535370fa1a66df72c0b90e263e8034022544b90a713b98448738f0`
- Face: `59f0d32beb0fa0163a8b3a280fdc948d35f7ed555249d243186d14b56d731500`

`Root` mengambil durasi dari peta v6. `Main` menunjuk `v6/voice_clean.wav`; `Face` menunjuk `v6/face_edit_v6.mp4`, menggunakan frame program langsung dan FACE_JUMPS dari peta v6. Scene tetap memakai waktu naskah lama melalui knots. Alias DUR_V5 hanya mempertahankan kompatibilitas impor scene yang sudah ada. Link `remotion/public/v6 → ../../edit/v6` dibuat lead dan mengarah ke worktree ini.

## Fonem yang dipulihkan

**Opening:** EDL lama memasukkan raw69,95–70,3833 lalu melompat ke70,65. Pembandingan raw menunjukkan fragmen awal membawa bleed kata sebelumnya, `sekarang`. Batas final raw70,666667 mempertahankan onset `Semua` tanpa bleed. Native blind opening dan whole-file final menyatakan `Semua`, `membangun`, `membuat`, dan `software` utuh dan natural. Tidak ada fade nol pada awal konsonan. Bukti: `native-qc/v6-opening-gemini.txt` dan `voice-final-whole.txt`.

**English:** endpoint raw47,266667 dari EDL lama memang mengiris akhir `something`. Source diperpanjang sampai **47,6**, dengan cakupan kata konservatif hingga47,6 agar gate noise tidak memakan ekornya. Native membandingkan endpoint47,3833/47,4/47,6/47,8/48,2:47,6 utuh, tanpa `Tapi`;47,8 mulai membawa kata berikutnya. Final processed output dan raw diperiksa lagi: `build something` lengkap. ASR final kini mendengar Build33,74–34,26 dan something34,26–34,60. Crop QC English pertama memakai indeks98–99 sehingga sempat memotong onset Build dalam cuplikan pemeriksaan; cuplikan yang benar memakai97–98 dengan handles400ms. Kehilangan `-thing` adalah cacat program yang terpisah dan telah diperbaiki. Bukti: `native-qc/english-tail.txt`, `voice-final-critical.txt`, `qc-final/windows.json`.

**Apa:** v5 menghilangkan Apa kedua sebelum pengalaman. R-032 mengizinkan satu false-start `yang` dibuang, sambil memulihkan Apa. Splice final adalah **raw105,65→107,15**, opsi2 yang dinilai native sebagai Apa utuh, tanpa yang, dan natural. Keping10 memakai asal94,983333, fase grid−16,666667ms; durasi source/output tetap frame30 eksak. Provenance menyimpan fase ini, bukan mengaku semua batas berada pada grid raw tanpa fase.

R-032 merupakan **deviasi guard dan fade yang nyata**: cut source90,233333→91,733333, join outputframe2338; cakupan Apa89,823333→90,233333 tetap konservatif. Guard kiri0ms, kanan61,667ms; RMS endpoint−21,954/−55,843dBFS. Fade sin²3ms/144sampel per sisi mengikuti opsi native yang diterima. Batas kiri bukan ruang sunyi50ms. Label kata tidak dipendekkan untuk membuat PASS. Lead menerima pengecualian spesifik ini berdasarkan pilihan user dan native raw–hasil; final native dan ASR mengonfirmasi Apa utuh.

Penutup tetap **“Share. Ngebagiin apa yang belum sempurna”**. Tidak berhenti pada daftar pengalaman. Dugaan lama bahwa kata `lengkap` hilang berasal dari prompt QC dan telah ditolak lead.

## Pemrosesan, latency, dan level

Source difilter sekali: `highpass=f=70,afftdn=nr=3:nf=-55`, padding250ms per sisi. Korelasi lima jendela mengukur delay1199sampel /24,979167ms. Setelah kompensasi, lag0,0,0,−1,+1sampel: maksimum0,020834ms, di bawah batas1ms. Source/hasil unity dan bukti tersimpan dalam `voice_clean.provenance.json`.

Jeda di luar cakupan ucapan memakai handles60ms sebelum/100ms sesudah, atenuasi−36dB, ramp sin²25ms. Join biasa diberi fade2ms hanya bila dua guard≥50ms; satu join origin dengan guard kanan26,667ms dilewati tanpa fade. R-032 adalah satu-satunya fade yang sengaja mengecualikan syarat guard tersebut. Semua28cut memiliki energy proof dan pasangan source/result WAV pada `cut-windows/`.

Puncak source yang membatasi gain dinilai native sebagai plosif alami, bukan klik; tidak di-declick. Gain statis25frasa hanya naik **+1,108..+8,035dB**, berubah melalui ramp8ms di jendela terukur≤−42dBFS. Tidak ada limiter, kompresor, penurunan suara isi, atau time stretch. Hasil **−21,5LUFS /peak−1,05dBFS**, source recut−23,8LUFS; crest17,0→17,4dB. Tambahan gain menuju batas−17LUFS memerlukan sekitar4,5dB, sedangkan headroom tersisa sekitar0,05dB sebelum−1dBFS. Irfan memilih mempertahankan dinamika alami (R-033); musik/SFX harus mengikuti VO ini. Gate level default tetap FAIL. Keterdengaran campuran dan speaker HP tetap harus dinilai pada fase5.

## Gerbang aktual

Gate kanonis dijalankan terpisah dengan **default asli**, tanpa menghilangkan `tuh` dari filler atau melonggarkan max-inner. `canonical-gates.json` menyimpan command, exit code, stdout/stderr, versi gate, dan hash input. Capture seluruh temuan dibuktikan sama dengan CLI langsung; shim ffmpeg hanya membatasi thread.

| Pemeriksaan | Hasil | Bukti |
|---|---|---|
| Source overlap/retention/sequence | Tidak ada overlap/retention/sequence failure | Seluruh token isi yang dinilai retained1,0; `canonical-source-validation.json`. |
| Source guard default | **FAIL**,exit1 | Tepat `guard Apa@89.823333: <0.05s`; R-032 diterima spesifik. Minimum guard cut lain51,667ms. |
| Cut_check default | **FAIL**,exit1 | sampah3,diam_kata6,diam_kal13,antar_kal0; gumam3 berstatus PERIKSA. Semua25kejadian memiliki disposition. |
| Pause_clean default | **PASS**,exit0 | Satu jeda yang memenuhi window gate; ucapan−22,0/jeda−60,6dBFS,selisih38,6dB; tidak ada sharp transient yang ditandai. Ini bukan klaim bahwa seluruh program hanya punya satu jeda. |
| Voice_level default | **FAIL**,exit1 | Hanya `pelan−21,5LUFS<−17`; gain positif, crest terjaga, peak memenuhi batas. Deviasi R-033 diterima user. |
| Audio/face frame | **PASS** | 3.988.800=2.493×1.600sampel; ffprobe2.493frame/30fps/83,1s; `face-check.json`. |
| Scene warp / Face playback math | **PASS** | Seluruh2.493frame monotonic; Sequence child mengikuti frame program tanpa reset; `timeline-check.json`. Ini pemeriksaan mekanis, bukan QC video final. |
| Filter latency | **PASS** | Maksimum1sampel setelah kompensasi pada5jendela. |
| Actual ASR tanpa prompt | Exact-text **FAIL**; konten dinilai independen | large-v3 cached,int8,CPU2;229hasil vs228token target. Build/something/Apa sekarang ada. Lihat catatan berikut. |
| Typecheck | **PASS**,exit0 | `node node_modules/typescript/bin/tsc --noEmit`; log kosong. |
| Snapshot adjudication | Integritas **PASS** | `adjudication-check.json`; perubahan hash suara atau hilangnya satu disposition terbukti ditolak pada `adjudication-negative-checks.json`. |
| Audio_order / ORDER | **Tidak diklaim PASS** | Tool belum menerima adjudikasi pengecualian VO yang dibangun ulang. ORDER lama tidak diubah; tidak memakai mode warisan untuk memintasnya. |

ASR final disimpan asli pada `words_actual.json`, terikat hash VO/map lewat `asr-provenance.json`. Diff exact hanya20-an→20an,kelihatannya→keliatannya,jadi→menjadi,publish→publis,autentik→otentik,dan tambahanASR `Terima kasih`. Native whole final mendengar penutup hanya `belum sempurna`. Artefak `Terima` bertimestamp82,00–82,16 menumpang ekor ucapan aktif(RMS−19,90dBFS), sedangkan `kasih` berdurasi0; jangan menyebut bagian itu sunyi atau memasukkan halusinasi ini ke caption. Native whole/critical dan actual ASR dipertahankan terpisah; tidak ada transkrip hasil yang ditambal supaya lolos.

## Disposition seluruh temuan default

`canonical-qc/windows.json` mencatat25pasangan source/result dengan handles600ms dan inverse map dari program sebenarnya. Disposition di bawah terikat hash pada `adjudications.json`.

| Case | Temuan default pada waktu program | Dasar penerimaan |
|---|---|---|
|00–02|tuh0,49/2,11/3,57s|R-026 keputusan sutradara+TASK; tepat source indices2,7,12. Bukan klaim user secara eksplisit meminta tiga tuh dipertahankan.|
|03|hal23,62s,internal0,15s|Adjudikasi lead dari konteks whole-file final.|
|04|Dan28,12s,internal0,17s|Adjudikasi lead dari konteks whole-file final.|
|05|Build34,02s,internal0,16s|Adjudikasi lead dari whole-file+critical final; English utuh.|
|06|Sampai66,76s,internal0,16s|Adjudikasi lead dari konteks whole-file final.|
|07|mungkin72,00s,internal0,23s|Adjudikasi lead dari whole-file; alternatif pemangkasan sekitar Dimana/mungkin sudah ditolak native.|
|08|sekedar73,53s,internal0,16s|Adjudikasi lead dari konteks whole-file final.|
|09|aku→perlu10,86s,0,15s|Adjudikasi lead dari konteks whole-file final.|
|10|yang→gak15,11s,0,20s|Native residual00; artikulasi/konteks current diterima.|
|11|gak→orang15,38s,0,18s|Native residual01; current diterima.|
|12|Untuk→belajar32,08s,0,19s|Native kontrol current vs tighter memilih current; tighter mengiris onset.|
|13|aku→mencoba36,49s,0,24s|Native residual03; current diterima.|
|14|Tapi→satu41,91s,0,24s|Adjudikasi lead dari konteks whole-file final.|
|15|satu→hal42,03s,0,28s|Adjudikasi lead dari konteks whole-file final.|
|16|tidak→menjual44,23s,0,21s|Native residual04; current diterima.|
|17|Dan→ngebangun48,94s,0,26s|Native residual05; current diterima.|
|18|jadi→adiktif50,37s,0,21s|Native residual06; current diterima.|
|19|sama→kesempurnaan57,59s,0,45s|Native residual07; current diterima.|
|20|akhirnya→aku62,68s,0,20s|Native residual08; current diterima.|
|21|yang→aku75,90s,0,20s|Native residual10; current diterima.|
|22–24|gumam31,42/43,44/80,01s|PERIKSA bukan bukti dirty noise; lead menerima berdasarkan pause_clean nyata dan whole native tanpa dirty-gap defect.|

Untuk kasus03–09/14–15, pemeriksa whole-file menyalin seluruh konteks dan memberi defects[]/clarity high; **tidak diklaim bahwa native menamai tiap rentang itu sebagai release/napas tertentu**. Semua laporan residual terdahulu menjadi pendukung; whole-file final mengikat penilaian ke SHA VO final. Jumlah temuan berbeda dari eksperimen awal karena ambang default mengikuti lantai noise/output; ambang tersebut tidak diubah untuk penerimaan proyek.

## Serah terima

Fase visual menggunakan tepat2.493frame dan artefak yang terdaftar di `timing-contract.json`. Semua pilihan source/editorial dan level telah diputuskan; tidak ada eksperimen VO tambahan kecuali muncul cacat nyata baru pada mix/video. Verifier lokal memeriksa snapshot176artefak dan seluruh disposition, sekaligus tetap menyatakan canonical_pass=false/audio_order_pass=false. Jalankan `python3 edit/v6/verify_adjudications.py` dari direktori proyek untuk memeriksa integritasnya.

Fase3/4/5 tetap perlu menyelesaikan visual, bed/SFX yang mengikuti level VO, mekanisme penerimaan lock yang sah, render komposisi, sinkronisasi gambar-suara aktual, dan preview campuran di speaker HP. Keterdengaran stem native yang baik belum menggantikan QC campuran tersebut. Tidak ada source v5 atau file scene/UI yang diubah oleh builder VO.
