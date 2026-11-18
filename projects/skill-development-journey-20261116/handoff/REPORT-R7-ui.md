Kartu review · TASK-R7-ui
Berubah: teks repo/app ikut kamera UI, tag kartu terhubung kartunya, SELESAI chartreuse; slab AI diturunkan ke 41,94% tinggi.
Coba: buka `qc/r7/ui/sanding.jpg`, lalu `repo.mp4`, `app.mp4`, `kartu.mp4`, `blender.mp4` di folder yang sama.
Bukti: PSNR R4 50,42 / 50,12 dB; kontras SELESAI 14,30:1; hasil pemeriksaan terbaru dirinci di bawah.
Butuh keputusanmu: T068 memakai default pembagian pekerja wajah; tag kartu mulai sesudah narasinya.
Jawab: ✅ TASK-R7-ui | 🔁 TASK-R7-ui: <catatan> | ❓ TASK-R7-ui

# REPORT-R7-ui · D-445 / D-453 / D-462 / D-463

Status: **siap ditinjau; QA teknis lolos**. Penilaian kreatif dan commit/push tetap pada Sutradara sesuai R7-BERSAMA.

R4 dipulihkan dari e6b0358 (b1/b3 identik dengan 2ade90b) ke komposisi baru; berkas basis tidak diedit setelah pengukuran. Seluruh 88 frame repo: PSNR 50,421132 dB; seluruh 345 frame app: 50,118787 dB terhadap cache R4 `*-an.mp4`, sebelum revisi UI. Props historis dan hash kode tersimpan di `qc/r7/ui/r4_proof.json`. Tidak memakai b1/b3 R5.

| Pesan | Maksud | Alasan | Bentuk visual |
|---|---|---|---|
| akhirnya proyek ini / selesai / juga. | Proyek yang dirujuk benar-benar selesai | Repo dan commit menjadi bukti, status sukses memakai merek | SF Pro di header daftar repo / baris commit; blok chartreuse + Anton hitam di ruang timeline; semua dalam kamera halaman R4 |
| Dan ini bukan sebuah template. | Cara kerja ini bukan preset | Kata template merujuk kolom perintah | Label SF Pro di area chat; template menggantikan placeholder kolom prompt |
| Jadi kalau orang-orang kan sering banget bilang edit kayak … | Orang meminta gaya melalui prompt | Nama gaya sudah muncul di saran asli | Narasi SF Pro dekat tepi bawah ruang chat; saran UI tetap satu-satunya nama gaya |
| Nah, aku ngebalik. Progres di baliknya | Beralih dari memilih gaya ke proses | Kata merujuk cerita di jendela | ngebalik dekat jawaban chat; label berikut mengikuti transform jendela yang sama |
| Gimana caranya biar AI ini | Pertanyaan kembali ke pembicara | Perhatian keluar dari demo aplikasi | K4 per kata; mengikuti pembesaran lingkaran wajah R4 lalu kamera wajah R7 |
| ChatGPT Pro Max yang / 20 kali / sama Claude Pro / 5 kali | Membandingkan langganan dua agen | Nama harus terkait kartunya; angka tidak diulang di subtitle | Tag kaca SF Pro di header kartu putih R4; Max yang sementara menggantikan nama di tag header kartu; satu 20× dan satu 5× tetap dari kartu |
| Ini / 100% FULL AI | Karya yang sedang diedit dibuat dengan AI | Monitor adalah bukti; headline sebelumnya menyentuh lampu | Slab dipindah ke ruang kiri di sekitar 40% tinggi; narasi Ini di permukaan meja |
| Dan menurut kalian / videonya kayak gimana? | Mengundang penilaian penonton | Pertanyaan merujuk video di monitor | SF Pro per kata di bidang meja; proyeksi perspektif dari kamera Blender yang sama |

Pembagian T068 (default reversibel): T068 tetap milik tugas wajah; UI tidak mengganti/menghapus ID itu. Tag Claude Pro baru tampak setelah T068 berakhir (50,502 dtk), sehingga nama tidak tampil dua kali bersamaan. KARTU2 tetap mulai di waktu R4 (50,28694). T067/T070 adalah penanda kartu dalam teks.json, bukan lapisan KT di resep R6.

QA: `npx tsc --noEmit -p .` dan typecheck eksplisit `src/video/index.ts` exit 0 (`qc/r7/ui/tsc_result.json`); tujuh lapisan valid, empat rentang, 61 still 2 fps, enam still 1920×1080, serta sanding enam baris terhadap 63-k5/63-k6. Hasil mesin: `qc/r7/ui/requirements.json`, `verification.json`; log per rentang: `assemble_<nama>.log`. Commit/push/PETA tetap tugas Sutradara sesuai R7-BERSAMA.

Kontras teoritis sRGB SELESAI: **14,3031:1** (`#080608` / `#C8E64A`), di atas 4,5:1. Blok menempel bidang timeline; centang memakai isi chartreuse dan tanda hitam.

Integrasi `python3 lego/r7_gabung.py` (cwd lego) berhasil: 57 lapisan dari lima override, tanpa konflik ID T068. Rentang QA terakhir memakai resep R7 gabungan, bukan hanya UI di atas basis R6. Hash tiap override di `qc/r7/ui/override_hashes.json`. T068 pekerja wajah berakhir pada frame lokal 154 dalam props_langganan (akhir global sekitar 50,484); tag kartu dimulai 50,502.

Detail penempatan terbaru: pada masuk repo, kata akhirnya mengikuti peralihan wajah hingga UI terbuka, lalu frasa duduk pada baris commit yang menjadi header daftar repo. Ini mencegah teks ikut terpotong ketika header halaman GitHub masih di luar frame. Di keluar app, K4 64 px berpindah bersama pembesaran lingkaran menuju ruang dada; bayangan hitam 2 px / blur 3 px menjaga kontras pada pakaian dan gestur. Di meja, narasi SF Pro 64 px diproyeksikan pada bidang Z=0,006 dengan homografi dari kamera Blender (46 mm, sensor 36 mm, posisi linear antara zoom 1,15 dan 1,30); adegan/berkas Blender tidak diubah.

Batas alpha hasil terbaru: narasi Blender paling kanan x=1791 (margin kanan 129 px) dan paling bawah y=917; tidak ada huruf menyentuh tepi. T048/T049 paling kanan x=1460 dan paling bawah y=1014 (masih di dalam margin 5%). Data semua frame alpha: `qc/r7/ui/blender_bboxes.json`, `face_exit_bboxes.json`, ringkas di `alpha_bounds.json`. Slab penuh pada frame sumber 54: bbox [248,402,822,504], pusat tinggi 41,944%; kelonggaran sekitar 78 px terhadap tiang lampu/tepi monitor (`slab_placement.json`).

Timing per kata: `qc/r7/ui/timing.md` dan `cue_timing.json`. Seluruh kata yang dipindah memakai jadwal yang sama, bukan teks subtitle lama yang ditumpuk di atas lapisan baru. Daftar hapus/ganti: `lego/r7_override_ui.json`; pembangun yang dapat dijalankan ulang: `python3 lego/r7_ui.py all`.

Pada keluar Blender, akhir ucapan gimana? +2 frame = 76,2765; teks dipotong pada 76,3097 dan lapisan menyisakan tiga frame transparan sebelum masuk IG 76,4097. Ini mencegah frame terakhir teks tertahan oleh kompositor di atas adegan IG.

| Rentang diminta | Klip QA | Frame terukur | Durasi terukur |
|---|---|---:|---:|
| 1.3–4.6 dtk | `qc/r7/ui/repo.mp4` | 99 | 3.3033 dtk |
| 23.4–36.6 dtk | `qc/r7/ui/app.mp4` | 396 | 13.2132 dtk |
| 45–54 dtk | `qc/r7/ui/kartu.mp4` | 269 | 8.9756 dtk |
| 72–76.5 dtk | `qc/r7/ui/blender.mp4` | 135 | 4.5045 dtk |

Durasi dibulatkan ke frame 30000/1001; awal/akhir tepat setiap klip ada di `<nama>_range.json`. Lembar 2 fps: `repo_sheet.jpg`, `app_sheet.jpg`, `kartu_sheet.jpg`, `blender_sheet.jpg`. Still penuh: `still_3.3.png`, `still_25.3.png`, `still_29.5.png`, `still_33.0.png`, `still_49.5.png`, `still_73.8.png`. Sanding: `qc/r7/ui/sanding.jpg`. Tambahan transisi: `repo_check_1.8.png`, `face_transition_check.png`, `detail_76.45.png` (IG bersih dari teks Blender); tambahan dua kata pendek di kartu: `detail_48.45.png`.

Lapisan aktif: `r7_ui_d_repo.mp4`, `r7_ui_d_app.mp4`, `r7_ui_intro.mov`, `r7_ui_face_exit.mov`, `r7_ui_kartu1.mov`, `r7_ui_kartu2.mov`, `r7_ui_blender.mov` di `lego/cache/`. Dua lapisan opak H.264 tanpa audio; lima lapisan alpha dirender ProRes 4444 memakai flags yang diminta (ffprobe membaca alpha 12-bit). `r7_ui_*_basis.mp4` adalah bukti pemulihan; `r7_ui_sama.mov` merupakan aset kerja tidak aktif dan tidak didaftarkan di override.

Aset: kode R4 dari git; logo aplikasi dan font lokal dari aset proyek; frame referensi 63-k5/63-k6 dari path di TASK. Tidak ada aset berbayar baru. Metrik token sesi tidak tersedia dari runtime ini.

## Ronde 2

**U-1 / D-453: siap ditinjau; QA teknis lolos.** Putusan Sutradara sudah diterapkan dan lapisan aktif sudah didaftarkan. Pada still 74,2 dtk, blok penuh **982 × 206 px**, bbox **[178, 347, 1160, 553]**, pusat vertikal **41,67%**. Ukuran acuan R6 terukur **980 × 206 px**; R7 sebelum perbaikan **576 × 102 px**. Ambang pengukuran alpha > 8/255; kanan/bawah bbox eksklusif.

Putusan yang dipakai (TASK-R7-ui-r2, menggantikan syarat bebas seluruh monitor): “Satu baris, ukuran R6 (blok ±980×206 px, Anton `#FAF8EC`), pusat vertikal ±42 %, mulai x ±180 (sisi kanan tiang lampu).” Blok boleh menimpa bin kiri; kepala lampu dan pratinjau wajah kanan tetap bebas. Riwayat benturan ruang sebelum putusan disimpan di `qc/r7/ui/r2/REPORT_before_putusan.md`.

| Pesan | Maksud | Alasan | Bentuk visual |
|---|---|---|---|
| 100% FULL AI | Menegaskan karya pada monitor dibuat dengan AI | D-453 menurunkan posisi; U-1 memulihkan ukuran R6 | Slab satu baris Anton putih hangat, blok ±980×206 px, pusat ±42%, bertambah per kata; hanya bin kiri boleh tertimpa |

| Still diminta | Frame global / waktu aktual | Kata terlihat | Bbox sesudah | Lebar × tinggi | Pusat vertikal |
|---|---|---|---|---|---|
| 73,0 dtk | 2188 / 73,006267 | 100% | [203, 352, 641, 552] | 438 × 200 px | 41,85% |
| 73,6 dtk | 2206 / 73,606867 | 100% FULL | [190, 349, 988, 552] | 798 × 203 px | 41,71% |
| 74,2 dtk | 2224 / 74,207467 | 100% FULL AI | [178, 347, 1160, 553] | 982 × 206 px | 41,67% |

Tiga still sebelum/sesudah 1920×1080: `qc/r7/ui/r2/before_73.0.png` / `after_73.0.png`, `before_73.6.png` / `after_73.6.png`, `before_74.2.png` / `after_74.2.png`; lembar berdampingan `sanding.jpg`. Semuanya memakai frame 30 / 48 / 66 dari rentang 72,005267–76,509767. Klip terbaru `qc/r7/ui/r2/blender.mp4`: **135 frame, 4,5045 dtk, 30000/1001 fps**. Still sesudah berasal dari klip rakitan ini, bukan diagnostik.

Penempatan diperiksa sepanjang **51 frame T081**: batas alpha keseluruhan [176, 346, 1160, 556]. Pratinjau kanan dilindungi dengan batas konservatif x≥1220, sehingga teks menyisakan ≥60 px; kepala lampu berada di atas y=230. Tiang lampu tetap di kiri batas konservatif x=173. Ketiga still sudah dibuka dan dibandingkan pada lembar sebelum/sesudah. Ketika frasa lengkap telah mendarat, pembesaran kamera menghasilkan lebar **976–984 px**, tinggi **205–207 px**, pusat **41,62–41,71%** (`alpha_measurements.json`).

Implementasi: `slab={x:220,y:334,size:222,scaleX:0.846}` dalam `lego/r7_ui.py`; `SurfaceText.tsx` menerima skala horizontal khusus T081 untuk mencapai dimensi blok yang diputuskan, sementara tinggi huruf dan pembesaran kamera tetap dihitung dari transform yang sama. Warna `#FAF8EC`, font Anton, teks, jadwal kata, dan gerak masuk 3 frame di `UIWords.tsx` tetap. Tidak ada perubahan pada T080/T082/T083.

Override aktif `lego/r7_override_ui.json`: hanya `T080.src` berubah ke **`cache/r7_ui_blender_r2.mov`**, karena lapisan gabungan ini memuat T080–T083. T081/T082/T083 asli tetap berada dalam `buang`, sehingga tidak ada duplikasi. Cache baru ProRes 4444 alpha, **1920×1080, 123 frame, 30 fps**, dirender dengan `--concurrency=3 --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le --image-format=png`; ffprobe membaca `yuva444p12le`. Cache R7 lama tetap tersedia sebagai basis.

QA terbaru:

- **Typecheck PASS**: `npx tsc --noEmit -p .` dan pemeriksaan eksplisit entry `src/video/index.ts`; log `tsc_project.log` / `tsc_video.log` di folder R2.
- **Regresi PASS**: seluruh **72 frame alpha di luar T081 identik piksel** dengan cache sebelum revisi. Jadwal seluruh cue juga identik. `baseline_lock.py check` atas tiga frame narasi Blender menghasilkan perubahan terbesar **0,00%**, ambang 0,5% (`baseline_lock.log`).
- **Cakupan PASS**: snapshot 82 file, hanya `SurfaceText.tsx` dan override UI berubah di antara berkas yang diawasi; perubahan pembangun `r7_ui.py` terbatas pada props T081 dan nama cache Blender R2. Audio, b1–b7, Root, tema, UIWords, Blender scene, teks.json, edit, resep R6, pembangun gabungan, dan override pekerja lain identik (`resume_scope_before.json`, `verification.json`). Resep R7 hanya dibangkitkan ulang oleh pembangun gabungan.
- **Integrasi PASS**: pembangun R7 berhasil, **57 lapisan dari lima override**. Rakitan QA dibatasi ke adegan Blender; snapshot resep dan hash override tersedia di folder R2. Pengukuran dapat diulang dengan `python3 qc/r7/ui/r2/verify.py`.
- **Antislop hard gate PASS**: tidak ada teks/aset baru; seluruh alpha T081 berada di dalam frame dan di luar area wajah/lampu yang dilindungi. **Purpose gate PASS**: perubahan skala dan posisi hanya untuk dimensi serta area yang ditetapkan Sutradara. **Liveliness PASS**: arah slab R6 diikuti, satu fokus headline dan gerak per kata dipertahankan. **Quality locks PASS**: perbandingan piksel membuktikan cue tetangga tetap, kedua typecheck lulus, tiga still sudah dilihat.

Tidak ada pertanyaan tersisa untuk U-1. Penilaian kreatif, PETA, commit/push, dan render master tetap tugas Sutradara sesuai R7-BERSAMA. Tidak ada aset berbayar atau dependensi baru; metrik token sesi tidak tersedia dari runtime.
