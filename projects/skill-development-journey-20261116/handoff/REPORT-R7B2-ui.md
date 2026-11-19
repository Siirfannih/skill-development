Kartu review · TASK-R7B2-ui
Berubah: narasi repo di luar jendela; narasi meja datar di dinding gelap dengan gelombang huruf. Slab ronde 2 dipertahankan; kartu sudah bebas pengulangan nama/angka di dada.
Coba: `qc/r7/ui/b2/sebelum_sesudah_spine.jpg`, lalu `repo.mp4` dan `blender.mp4` di folder yang sama.
Bukti: 123 frame alpha, 61 frame kontras tinta, 110 frame kartu tanpa duplikasi, 15 strip × 18 frame, typecheck dan motion_lint.
Butuh keputusanmu: -
Jawab: ✅ TASK-R7B2-ui | 🔁 TASK-R7B2-ui: <catatan> | ❓ TASK-R7B2-ui

# TASK-R7B2-ui · D-476 / D-477 / D-478 / D-484

**Siap ditinjau; QA teknis UI lolos.** Penilaian kreatif tetap oleh penilai mata terpisah sesuai brief bersama. Tidak ada commit atau perubahan skill.

## Kondisi sebelum edit

Repo: frame 2,8 dtk dari `qc/r7/visual_r7_fin_ekor.mp4` memperlihatkan halaman GitHub putih yang memenuhi kanvas, panel timeline di tengah, dan lingkaran wajah kanan bawah. Narasi hitam duduk di header commit sehingga tampak sebagai isi repo; ruang di luar jendela belum tersedia. Perbaikan perlu memberi halaman batas jendela di kanvas terang, lalu menempatkan narasi di sisi kirinya.

Meja: frame 74,9 dtk memperlihatkan dinding gelap di kiri monitor, lampu di kiri, Clawd besar di bawah, dan monitor yang membawa bukti video. Teks lama kecil dan miring di depan bawah monitor; bidang gelap kiri cukup untuk narasi datar seperti still spine 3. Slab memakai dimensi ronde 2 dan tetap menjadi penekanan tersendiri.

Kartu: frame 50,3 dan 50,7 dtk memperlihatkan dua kartu terang di kiri/kanan wajah; dada berisi kemeja bermotif, tangan, dan mic. Nama serta angka pada kartu sudah kuat; pengulangan nama/angka di dada harus dihilangkan, sementara kata sambung yang tidak ada di kartu dipertahankan.

## Acuan dan alasan

Still yang sudah dibuka: `qc/r7/brief2/1_R1_narasi_wajah.jpg`, `3_R1_narasi_meja.jpg`, serta still sebelum repo, meja, dan kartu di `qc/r7/ui/b2/`.

Gerak: strip frame berurutan Zache dan FINALLY disimpan di `qc/r7/ui/b2/ref_*_strip.jpg`. Gelombang bekerja karena frasa pendek, huruf datang kiri ke kanan, dan kata yang sudah mendarat tidak berpindah; latar tenang membuat narasi terbaca tanpa wadah. Adaptasi repo memakai tinta gelap di kanvas terang; meja memakai putih hangat di dinding gelap, dengan dua baris datar di luar monitor. FINALLY menjadi acuan slab: potong masuk lalu skala tumbuh pelan.

Pembacaan desain: revisi reel personal siirfan dengan narasi Poppins 700 dan penekanan Anton sesuai spine; ENERGY 2 / RHYTHM 3 / MOTION 2. Izin: D-476/477/478/484; kamera global dan transisi milik Sutradara.

Pemeriksaan awal: main terbaru, profil siirfan LULUS. Doctor hanya gagal karena PETA basi; pengecualian dan larangan `--fix`, PETA, commit, serta perubahan skill mengikuti `handoff/R7B2-BERSAMA.md`. Usul PENDING terkait ambang visual tidak dipakai sebagai aturan atau diubah dalam tugas ini.

## Hasil dan batas perubahan

| Bagian | Hasil |
|---|---|
| Repo T003/T005 | Poppins 700 tinta `#080608`, frasa bertumpuk pada jangkar kiri, tanpa wadah. Halaman diberi batas jendela di kanan agar narasi benar-benar berada di luar GitHub. Header commit kembali berisi data repo. SELESAI tetap Anton hitam pada chartreuse `#C8E64A` di dalam timeline; ia ikut skala jendela. |
| Meja T080/T082/T083 | Poppins 700 putih hangat, datar pada lapis depan di dinding kiri. `Ini` → `Dan menurut / kalian` → `videonya / kayak gimana?`; posisi tiap kata dikunci sebelum masuk sehingga kata lama tetap diam. Jangkar (220,320), ukuran 82 dipilih setelah frame awal menunjukkan tiang lampu melintas pada kandidat kiri yang lebih lebar. |
| Slab T081 | Anton, ukuran 222, skala horizontal 0,846, posisi ronde 2. Tiap kata potong masuk utuh, seluruh blok membesar pelan; bukan naik dari bawah atau pop 3 frame. Ukuran penuh terukur **979×206 px**, bbox **[179,346,1158,552]** pada frame sumber 56. |
| Kartu 47–53 dtk | Tidak memerlukan perubahan baru: cache aktif T063 sudah menyisakan `sama`, `yang`, dan kalimat lanjutan; nama/angka dibawa kartu. **110 frame** di sela kata sambung pada f52–183 alpha nol. Sumber dan gerak KARTU1/KARTU2 serta T063 tidak diubah. |

Gerak narasi memakai helper gelombang bersama, dibaca tanpa diedit. Kedua render memakai hash helper yang sama, disimpan di `render_dependencies.json`; `verify_b2.py` menolak bila helper berubah setelah render. Kurva huruf memakai `land`, blur vertikal mengikuti kecepatan, tracking merapat, dan keluar berupa potongan. Jadwal cue dan ucapan tetap; kata pertama repo meneruskan kata pada wajah saat adegan repo dimulai.

Override UI mengubah **src D_REPO, T080, UI_REPO_INTRO**. Intro dipendekkan menjadi 6 frame agar berakhir saat repo masuk; keenam frame itu identik piksel dengan cache intro lama. Entri lama **D_APP/T048** dan daftar buang teks app T039–T049 dilepas dari override UI setelah `r7_override_claudekaca.json` hadir: tanpa pelepasan ini penggabung gagal `ganti T048 tidak ada` dan D_APP lama akan menimpa app baru. Ini penyerahan kepemilikan ke TASK claudekaca; kode/cache/override tugas itu tidak diedit.

Kode yang diubah: `r4/DuniaRepoUI.tsx`, `r4/SurfaceText.tsx`, komponen lokal baru `r4/NarasiUI.tsx`, dan `lego/r7_ui.py`. `lego/r7_override_ui.json` mendaftarkan hasil. Berkas wajah, IG, audio, Blender, kamera global, transisi, dan skill tidak diedit oleh tugas ini.

## Artefak aktif dan rakitan

| Lapisan | Cache di `lego/cache/` | Metadata |
|---|---|---|
| D_REPO | `r7b2_ui_repo.mp4` | 1920×1080, H.264, 88 f, 30 fps |
| T080 | `r7b2_ui_blender.mov` | 1920×1080, ProRes 4444 alpha, 123 f, 30 fps |
| UI_REPO_INTRO | `r7b2_ui_intro.mov` | 1920×1080, ProRes 4444 alpha, 6 f, 30 fps |

Ketiga cache tanpa audio. File cache menunjuk artefak di `/mnt/storage-projects/skill-dev-journey/r7b2-ui/` melalui symlink; bukti tersedia lewat `qc/r7/ui/b2/`. Penyimpanan ini menjaga disk sistem yang tinggal ±2,5 GB. Tidak ada aset berbayar atau dependensi baru.

Penggabungan berhasil: **54 lapisan dari 6 override**. Rakitan berikut memakai waktu native 30000/1001 fps dan audio dinonaktifkan hanya pada klip pemeriksaan visual:

| Klip di `qc/r7/ui/b2/` | Rentang aktual | Frame |
|---|---|---:|
| `repo.mp4` | 1,201200–4,604600 dtk | 102 |
| `kartu.mp4` | 47,013633–53,787067 dtk | 203 |
| `blender.mp4` | 72,005267–76,509767 dtk | 135 |

Rakit memakai fungsi compose resmi, dengan input dipotong dahulu untuk menghindari decode 76 detik untuk pemeriksaan 4 detik. Resep lengkap dan potongan tersimpan dalam `recipe_snapshot.json` dan `<nama>_recipe.json`; kamera dan urutan lapisan berasal dari `r7_gabung.py` tanpa perubahan pembangun gabungan.

## Bukti yang sudah dibuka

- `sebelum_sesudah_spine.jpg`: lima pasangan repo, juga, pertanyaan meja, akhir pertanyaan, dan slab, masing-masing berdampingan dengan spine 1/3/0. Still penuh `before_*.png` / `after_*.png`; waktu dan frame di `stills.json`.
- Untuk meja, gambar sebelum dibuat dari **plate yang sama + cache teks lama**, sehingga transisi finishing pada master lama tidak mengacaukan perbandingan perubahan UI. Repo/kartu sebelum berasal dari `visual_r7_fin_ekor.mp4`.
- `kartu_tanpa_duplikasi.jpg`: enam pasangan dari 47,948–52,686 dtk, memperlihatkan nama/angka pada kartu dan kata sambung yang tetap ada.
- `gerak/lembar_1.jpg` hingga `lembar_3.jpg`: **15 strip, masing-masing 18 frame berurutan**, telah dibuka. Mencakup seluruh kata masuk repo/meja, SELESAI, dan tiga kata slab. Strip tersendiri tersedia di `gerak/`, indeks frame absolut di `motion_index.json`.
- Referensi bergerak yang dibuka: Zache 2,78–3,78 dtk (`ref_zache_strip.jpg`) dan FINALLY 0,5–1,5 dtk (`ref_finally_strip.jpg`).

## QA teknis

- **PASS batas alpha:** seluruh 123 frame cache meja diperiksa. Gabungan bbox narasi **[220,316,867,568]**, di kiri monitor; tiga frame terakhir kosong sehingga tidak terbawa ke IG. `verification.json` memuat bbox tiap frame.
- **PASS kontras:** minimum **16,6367:1** pada 61 frame narasi meja yang mempunyai inti tinta alpha ≥245, diukur terhadap plate Blender asli tanpa teks. Tinta repo terhadap kanvas **18,9473:1**; SELESAI **14,3031:1**. Bukti per frame dan sumber plate di `contrast.json`.
- **PASS cakupan:** hanya tiga src UI berubah, ditambah pelepasan entri app usang ke pemilik barunya. Posisi/waktu/gerak kartu tetap; intro 6 f identik hasil decode. Detail di `verification.json` dan `before-source/`.
- **PASS TypeScript:** proyek, tiga file UI, serta entry video penuh dengan `--lib DOM,DOM.Iterable,ES2020`. Log `tsc_project.log`, `tsc_ui.log`, `tsc_video_dom_iterable.log`. Catatan `tsc_video.log` memakai opsi lama tanpa DOM.Iterable dan menemukan FontFaceSet.add; library DOM.Iterable pada TypeScript yang terpasang mendefinisikan FontFaceSet sebagai Set<FontFace>. Melengkapi library pemeriksaan menyelesaikan temuan tanpa mengubah kode Claude kaca atau menambah suppression.
- **PASS motion_lint, py_compile, diff whitespace:** `motion_lint.log` dan keluaran perintah terakhir; tidak ada preset easing, stagger baru, atau fade masuk. Semua cache dan rakitan diprobe, termasuk codec/alpha, frame, fps, SHA-256, dan ketiadaan audio.

Antislop, mode `during` dari preferensi global:

- **Hard gate PASS:** tidak ada aset/klaim baru; batas alpha dan kontras di atas lolos; lapisan telah dirender dan hasil rakitan dibuka. Pemeriksaan interaksi/responsif aplikasi tidak berlaku pada lapisan video.
- **Purpose gate PASS:** jendela repo menyediakan ruang narasi di luar UI; Poppins mengikuti spine; tinta mengikuti latar; gerak huruf menyampaikan narasi, cut/skala menyampaikan slab.
- **Liveliness PASS:** ENERGY 2 / RHYTHM 3 / MOTION 2, satu peran satu gerak; bukti gerak pada 15 strip, ruang kiri sebagai struktur, chartreuse pada status SELESAI.
- **Quality locks PASS:** sumber huruf/aset proyek, jadwal cue, kartu, serta ukuran slab dipertahankan dan pemeriksaan teknis lolos. Ini laporan pembangun, **bukan verdict QC kreatif**.

## Titik integrasi Sutradara

Masker wajah warisan menutupi awal masuk kata `akhirnya` sebelum repo terbuka penuh; terlihat pada strip T003. Paparan huruf awal perlu dinilai saat Sutradara menyusun ulang jembatan masuk repo sesuai D-484. Tidak ada perubahan kamera/transisi dari pekerja UI. Penilaian akhir seluruh video oleh penilai segar tetap mengikuti brief bersama.

Reproduksi lapisan: `python3 lego/r7_ui.py b2_prepare`, `b2_render`, lalu `b2_assemble`. Pemeriksaan: `python3 qc/r7/ui/b2/verify_b2.py`, `contrast_b2.py`, `evidence_b2.py`. `b2_blender` merender meja saja bila repo tidak berubah. Render memakai `--concurrency=3 --image-format=png`; alpha ProRes 4444, opaque CRF 14.

Laporan pusat dicatat melalui workflow `autopilot-prd`. Metrik token sesi tidak tersedia dari runtime.

## Ronde 2

Izin: **TASK-R7B2-ui-r2 / D-485**, hanya isi dan waktu angka KARTU1/KARTU2 serta perlakuan narasi T066 “Max yang”. Basis keluhan: `qc/r7/penilai/bahan-akhir/video_dinilai.mp4`; snapshot kode dan override sebelum edit di `qc/r7/ui/b2-r2/before-source/`.

**Kondisi footage sebelum edit:** still 48,25 dtk sudah dibuka (`footage_before_48.25.png`). Wajah close-up mengisi tengah; kanan atas ditempati kartu putih yang bagian angkanya kosong, sedangkan pil “Max” duduk di bawahnya. Tangan bermik berada di kanan bawah; bidang dinding di sebelah kanan tangan tersedia untuk narasi tanpa wadah.

**Acuan yang dibuka:** spine `1_R1_narasi_wajah.jpg`, strip 30 frame berurutan Zache di `qc/r7/ui/b2/ref_zache_strip.jpg`, dan kartu angka `07-k7-kartu-angka.jpg`. Di Zache, kata pendek bertambah tanpa menggeser kata lama; whitespace dan kontras membuatnya tidak membutuhkan wadah. Adaptasi T066 memakai dua kata bertumpuk di dinding, di luar transform miring kartu dan di kanan gestur tangan; kartu mempertahankan SF Pro serta bentuk yang sudah ada. ENERGY 2 / RHYTHM 3 / MOTION 2 tetap.

**Cek maksud sebelum implementasi:** kartu berisi sejak masuk membuat identitas dan kuantitas langsung terbaca. Risiko utamanya angka tujuan mendahului atau terlambat dari ucapan, serta narasi berpindah ke tangan; karena itu onset diperiksa per frame hasil rakitan dan seluruh gerak T066 dibuka sebagai strip. Nilai 20×/5× dan 1× berasal dari brief, bukan klaim baru.

**Siap ditinjau; QA teknis ronde 2 lolos.** Penilaian kreatif tetap oleh penilai mata terpisah. Kedua kartu selalu membawa angka: 1× sejak frame pertama sumber, lalu penghitung mencapai 20× / 5× pada frame onset masing-masing. “Max yang” kini dua baris Poppins 700 putih hangat di dinding kanan, tanpa pil, dengan gelombang huruf dan bayangan huruf dari `KT83.bayang` seperti spine. Kata lama tetap di tempat; narasi tidak mengikuti kemiringan kartu.

| Kartu | Onset proyek | Angka tujuan pertama pada rakitan | Selisih | Frame global |
|---|---:|---:|---:|---:|
| ChatGPT Pro → 20× | 48,511367 | 48,515133 | +3,766 ms | 1454 |
| Claude Pro → 5× | 50,786767 | 50,784067 | −2,700 ms | 1522 |

Keduanya frame terdekat onset pada 30000/1001 fps. Pembacaan angka dari piksel rakitan disimpan di `onsets.json`, lengkap dengan frame sebelum/sesudah. Perhitungan Claude memakai awal lapisan **49,986940**, karena pembangun bersama sudah memajukannya 0,30 dtk dari override **50,286940**. Penyesuaian ini hanya pada jam internal penghitung; waktu dan lintasan di override tetap.

**Artefak aktif:** `lego/r7_override_ui.json` hanya mengganti `KARTU1.src` ke `cache/r7b2_ui_kartu1_r2.mov` dan `KARTU2.src` ke `cache/r7b2_ui_kartu2_r2.mov`. Cache ProRes 4444 alpha, 30 fps, **640×720 / 194 frame** dan **640×580 / 102 frame**, tanpa stream audio. Tinggi kanvas kartu pertama bertambah untuk memberi ruang gerak huruf di luar kartu; ukuran badan kartu tetap. Render memakai `--concurrency=3 --image-format=png`. Cache dan bukti berada di `/mnt/storage-projects/skill-dev-journey/r7b2-ui-r2/`, dihubungkan lewat symlink proyek.

**Bukti terbaru di `qc/r7/ui/b2-r2/`:**

- `kartu.mp4`: rakitan sesudah, **208 frame**, 46,946900–53,887167 dtk; `kartu_before.mp4`: kontrol sebelum dengan seluruh footage, kamera, dan lapisan lain dari snapshot rakitan yang sama. `recipe_snapshot.json` dan kedua resep lokal menyimpan sumbernya. Basis keluhan asli tetap `video_dinilai.mp4` di atas.
- `sebelum_sesudah_spine.jpg`: **enam pasangan** pada 47,55 / 48,25 / 48,45 / 48,511 / 50,20 / 50,787 dtk, bersama acuan narasi/angka. Still penuh `before_*.png` / `after_*.png`; frame aktual di `stills.json`. Lembar serta still 48,4484 dtk sudah dibuka.
- `gerak/`: **lima pasang strip sebelum/sesudah, setiap strip 18–24 frame berurutan**. Mencakup masuk ChatGPT f1415–1438, “Max yang” f1440–1457, 20× f1444–1461, masuk Claude f1498–1521, dan 5× f1507–1524. Kelima strip hasil sudah dibuka; indeksnya `motion_index.json`. Seluruh 208 frame kedua klip juga tersedia di `frames/`.

**Pemeriksaan teknis:**

- **PASS isi sepanjang kartu:** seluruh **296 frame** sumber diperiksa dari piksel. Tidak ada frame angka kosong; minimum inti tinta **198 / 196 piksel** pada area angka. Pemeriksaan yang sama pada basis mereproduksi masalah: 38 frame pertama ChatGPT dan 14 frame pertama Claude kosong (`filled_before.json`). Pemeriksaan hasil ada di `verification.json`.
- **PASS batas revisi:** perbandingan override dengan snapshot sebelum edit hanya menemukan dua atribut `src` di atas. `t`, posisi, lintasan, entri UI lain, `tambah`, serta `buang` identik. Sumber kode yang berubah untuk ronde ini hanya `r4/KartuUI.tsx` dan `lego/r7_ui.py`; helper narasi/gelombang, Root, tema, dan teks.json tidak diedit.
- **PASS header:** 194 + 102 frame header dibandingkan dengan cache basis. Selisih maksimum pada piksel tampak **1/255**; selisih RGB maksimum 9/255 dan 8/255 hanya pada bayangan hampir transparan akibat encoding ProRes. Nama, huruf, bentuk, transform, dan ukuran header tetap; tidak diklaim identik piksel.
- **PASS kontras narasi:** **11 frame** dengan inti tinta diperiksa. Putih hangat terhadap dinding polos hanya mencapai minimum **4,115:1**, sehingga dipakai bayangan huruf yang sudah ada pada spine. Kontras minimum terhadap pemisah bayangan gelap di tepi huruf **5,582:1**. Pengukuran memisahkan piksel bayangan dari pinggir huruf antialias; latar diambil dari rakitan khusus tanpa KARTU1/pil lama (`background.mp4`, `background_recipe.json`). Tidak ada wadah baru.
- **PASS konteks:** `baseline_lock.py check` atas konteks sebelum kartu masuk dan setelah keduanya keluar menghasilkan **0,00%** perubahan, ambang 0,5% (`baseline_check.log`).
- **PASS kompilasi:** `npx tsc --noEmit -p .` serta entry video eksplisit dengan `--lib DOM,DOM.Iterable,ES2020`; `motion_lint`, `py_compile`, dan `git diff --check` juga lolos. Tidak ada dependensi baru atau suppression.

Perubahan paralel pada override **ktwajah** dan **IG** terlihat selama sesi (`scope_before.json` / `scope_after.json`). Keduanya hanya dibaca untuk rakitan; pekerja UI tidak menulis atau menimpanya. Hash audio yang diawasi, `lego/r7_gabung.py`, serta `lego/r7_finishing.py` tetap sama. Penggabung hanya dijalankan untuk membangkitkan resep. Tidak ada perubahan kamera/transisi, master penuh, PETA, skill, commit, atau push proyek dari tugas ini.

**Gerbang antislop ronde 2:** Hard gate **PASS**, isi hanya dari brief dan seluruh lapisan telah dirender; kontras pemisah huruf 5,582:1, tidak ada wadah atau teks melintasi wajah/tangan pada strip yang dibuka. Purpose gate **PASS**, angka memberi isi sejak masuk, gelombang/bayangan mengikuti spine, posisi mengikuti ruang dinding. Liveliness **PASS**, ENERGY 2 / RHYTHM 3 / MOTION 2 dan fokus tetap angka/kartu yang dirujuk ucapan. Quality locks **PASS**, header serta atribut lapisan dijaga dengan perbandingan di atas. Pemeriksaan interaksi, keyboard, dan breakpoint aplikasi tidak berlaku pada lapisan video ini.

Reproduksi dari folder proyek: `python3 lego/r7_ui.py b2_r2` → `python3 qc/r7/ui/b2-r2/assemble_cards.py` → `python3 qc/r7/ui/b2-r2/evidence.py` → `python3 qc/r7/ui/b2-r2/verify.py`. Metadata/sha cache ada di `verification.json`; hash kode render di `render_sources.json`. Tidak ada biaya/aset berbayar. Metrik token sesi tidak tersedia dari runtime.
