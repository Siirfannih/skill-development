---
name: motion-graphic
description: "Directs and builds Irfan's motion graphic videos (Jadisatu, Tuntunly, siirfan content) from brief to render — persona, gated workflow, an always-on quality floor (LANTAI), a reference cookbook of motion mechanics remixed onto the user's own concept (cookbook: INDEX, pattern cards with narrative triggers, RESEP), a render gate and reviewer scripts (juri), plus branch files for storyboard, copywriting, typography, camera, audio, Remotion build, and QA. Use for any video or motion request from Irfan, even a rough one: bikin video, launch video, reel, promo, motion, animasi teks, storyboard, naskah VO, revisi video, bedah referensi, After Effects, or when he sends a reference video. Also for podcast/interview clip edits with motion overlays and captions."
---

# Motion Graphic (Irfan)

Skill ini lapisan penaik mutu video. Ia bukan template dan bukan pembajak konsep: **konsep user + mekanik cookbook = output baru**. Tema, palet, aset, dan arahan user selalu menjadi fondasi. Dari referensi hanya dipindahkan mekanik gerak, ritme kamera, hierarki tipografi, dan standar audio. Draf atau kode user diaudit dan dihaluskan, tidak dirombak (`cookbook/README.md` §1, §3).

**Pintu produksi ramping: `MOTION-CORE.md`** (alur dua langkah, 10 aturan Lantai, gerbang wajib, larangan keras), lalu `projects/<proyek>/`. `PETA.md`, `RETRO.md`, `SUMBER.md`, dan `cookbook/CATALOG.md` utuh tidak dimuat di awal sesi (cukup muat `cookbook/00-core-invariants.md`; kartu dimuat per kartu lewat `pilih_kartu.py`); sisa file ini dibuka saat sebuah langkah menyebut bagiannya.

**Alur setiap video (urut):**
1. Tahap Brief, Naskah, dan Storyboard/block out (`MOTION-CORE.md` §1, `../irfan-creative-workflow/SKILL.md` §2). **Sebelum mendesain, buka `../motion-theme-director/SKILL.md`**: bila user membawa referensi, Phase 0 `BEDAH-REFERENSI.md` dulu (isi `REFERENCE-BRIEF.md`), lalu pilih tema, dan jalankan 4 uji biner pada setiap frame storyboard. Bedah bahan user dulu (naskah/transkrip, footage, aset), lalu naskah final, lalu storyboard, masing-masing dengan persetujuan user. Belum ada kode sebelum storyboard disetujui.
2. Di tahap Storyboard/block out ada **Langkah 1 cookbook**. Tulis fungsi cerita tiap beat, lalu cari kartunya dengan `python3 scripts/cookbook/pilih_kartu.py --cari "<fungsi cerita>" [--kategori …] [--bergerak]` (keluaran: ID, nama, status, path kartu, frame kunci). Buka hanya 2–4 kartu, lalu ajukan tabel racikan dan remix per beat (beat → pola → remix → SFX) untuk disetujui (`cookbook/README.md` §2).
3. **Langkah 2** (tahap Animate sampai Deliver): kode Remotion ditulis dari nol dari tabel itu, dengan Lantai (`LANTAI.md`) sebagai standar mutu, dan render lewat `scripts/juri/render.sh final`, yang menjalankan `gerbang_produksi.sh` (§0b).

Tiga hal yang selalu dikerjakan: **Lantai** (mutu di semua video; ringkasan di bawah, bunyi lengkap di `LANTAI.md`) → **pengikat/kiblat + racikan pola** di `RESEP.md` (dipinjam dari kartu hanya bila user tidak membawa gaya) → **Juri** (hasil disandingkan dengan frame kunci sebelum render penuh). `cookbook/` menyimpan kartu dan frame kuncinya sebagai contoh yang bagus, dan `cookbook/contoh-gagal/` sebagai contoh yang jelek.

Urutan otoritas: kalimat kanonik `AGENTS.md` (repo) §Cara membaca repo ini butir 2. Bagian lain skill ini kalah dari Lantai dan resep.

## 0. Lantai (selalu berlaku; ringkasan)

<!-- LANTAI:mulai (ringkasan; tiap ID LANTAI.md wajib ada di tabel ini, dicek tools/sync_lantai.py --check) -->
Lantai menentukan **mutu**, kiblat (kartu) menentukan **gaya**; bila bertentangan, Lantai menang dan penyesuaiannya ditulis di `RESEP.md`. Tabel ini hanya peta. **`LANTAI.md` dibaca utuh saat juri, revisi, dan sebelum render**, dan bunyi lengkapnya yang berlaku.

| Kelompok | Inti | ID |
|---|---|---|
| Teks: satu lapisan | ucapan tampil sebagai satu lapisan tipografi kinetik; hanya dari ucapan; kata tidak tampil dua kali | A1, A3, A5 |
| Teks: posisi dan keterbacaan | dekat subjek (≤ ±8 % tinggi frame); 1–3 kata, maks 2 baris, blok seimbang; kontras ≥ 4,5 : 1, terbaca di HP; tampil sampai selesai diucapkan | A2, A4, A7, A8 |
| Teks: penekanan dan gerak | satu sistem penekanan per baris; kotak hanya bila kontras gagal; gerak teks dari peran kalimat (`kt_check.py`) | A6, A9, A9a |
| Kamera | frame tidak datar; satu objek fokus per beat; elemen diam, kamera yang bergerak | B10, B11, B12 |
| Gerak dan transisi | nol crossfade polos; kurva per gerak `curves.ts` (`motion_lint.py`); format berulang berbeda framing | B13, B13a, B13b |
| Komposisi | satu fokus per momen; teks-objek satu kesatuan; tepi bersih; seimbang dinilai global per frame dengan mata | C14, C15, C16, C17 |
| Rapi, palet, efek | rapi; palet dikunci di resep; setiap efek punya fungsi | C18, C18a, C18b |
| Isi visual: makna | visual menggambarkan makna; metafora dulu (`board.py`); bentuk yang menjelaskan; storyboard Irfan = struktur | D19, D19a, D19b, D19c |
| Isi visual: nyata | UI merek asli, UI konseptual frameless; pembicara tampil; tanpa placeholder; tokoh konsisten; logika dunia nyata; tiga detik pertama | D20, D21, D22, D22a, D22b, D22c |
| Suara | tidak dipercepat, fonem utuh, jeda bersih, level suara asli tidak diturunkan (`cut_check.py`, `voice_level.py`) | E23 |
| Bunyi dan musik | SFX lima pilar berjarak (`sfx_density.py`); musik mengikuti tempo, di-duck dengan automation; mix diuji di speaker HP | E24, E25, E25a |
| Alur dan revisi | tahap kanonik + dua render, visual lulus dulu lalu audio; revisi = diff satu ronde (`revisi_cek.py`) | F26, F27 |
| Cara kerja | ragu = tanya; baca folder proyek sebelum build; koreksi berlaku untuk frame yang disebut; tanpa generate berbayar sebelum gerbangnya; kirim setelah juri lulus | F28, F28a, F28b, F28c, F29 |
<!-- LANTAI:selesai -->

## 0a. Kiblat dan resep (sebelum build)

1. Baca `cookbook/00-core-invariants.md`, lalu cari kartu per fungsi cerita lewat `scripts/cookbook/pilih_kartu.py` (membaca `cookbook/CATALOG.md`; filter `--pack` dari tabel tipe konten `cookbook/INDEX.md`). Pack utuh tidak dimuat. Untuk satu teknik lintas kartu: `cookbook/POLA.md`. Semua kartu adalah contoh mutu dan sumber mekanik, bukan ukuran untuk disalin.
2. Tentukan pengikat (kiblat):
   - User membawa gaya, brand, atau draf → gaya user adalah pengikatnya. Kartu hanya menyumbang mekanik.
   - Irfan mengirim video referensi di sesi → itu kiblatnya. Bedah dulu ke kartu baru (`cookbook/README.md` §Referensi baru).
   - Prompt menyebut gaya → pilih satu kartu yang paling cocok sebagai pengikat dan sebut ke user.
   - Prompt tanpa gaya → ikuti gaya global brief (gaya bawaan `templates/gaya/` boleh dipakai bila cocok). Brief juga tanpa gaya → pakai kartu paling mirip, tulis alasannya di `RESEP.md`.
   - Video bermode ganda boleh berkiblat berbeda per mode, asal gayanya konsisten.
3. Racik pola per beat dari 2–4 kartu untuk seluruh video, dipilih lewat *Narrative trigger*. Buka hanya kartu itu dan frame kuncinya, lalu isi tabel racikan (`cookbook/README.md` §2) dan minta persetujuan user. Jangan membuka semua kartu.
3a. **Bentuk visual dicari di kartu, tidak dikarang.** Adegan yang butuh bentuk tertentu (tampilan Instagram, chat, dashboard, peta, tokoh, dsb.):
   - Cari lewat `cookbook/INDEX.md` / `scripts/cookbook/pilih_kartu.py` / `POLA.md`.
   - Buka kartunya + frame kuncinya.
   - Pinjam mekaniknya dengan gaya user atau pengikat, lalu catat di `RESEP.md`.
   - Tidak ada di kartu, brief, maupun `DECISIONS.md` → tanya Irfan tampilan yang ia mau.
   Rinci: `cookbook/README.md` §5.
3b. **Sebelum merancang teks, visual, atau gerak sebuah adegan**, baca `guide/<urusan>/GUIDE.md` §Cara memutuskan (pelajaran bersyarat "bila…, pilih…, karena…" dari koreksi sebelumnya) dan lihat `cookbook/contoh-gagal/`. Subagen yang membangun visual tidak disuruh membaca semua itu: Sutradara memberinya brief bergambar (`templates/handoff-fase.md`): frame footage adegannya, frame kunci atau potongan klip referensi, still spine, maksud adegan, dan teknik kartu yang dipakai beserta syarat dan penyesuaiannya, bukan tabel angka.
4. Tulis `projects/<proyek>/RESEP.md` dari `cookbook/RESEP-TEMPLATE.md`: 8 bagian anatomi. **Pengikat** (warna & tekstur, teks, ritme) dari satu sumber; **teknik** (b-roll, motion graphic, kamera & transisi, SFX, musik) boleh dipinjam kartu lain dan dikenakan pengikat kiblat. Cek: `python3 scripts/juri/resep_check.py projects/<proyek>/RESEP.md`.
5. **Kondisi footage dulu, baru teknik.** Lembar kondisi footage per jenis shot (rasio, skala wajah, terang-gelap latar, pakaian, ruang kosong, benda ramai, kamera) ditulis sebelum teknik kartu dipilih; teknik yang syaratnya tidak cocok disesuaikan atau tidak dipakai. Angka di kartu adalah pengamatan di video asli, bukan target (`cookbook/README.md` §6 butir 1).
6. **Spine gaya dikunci sebelum pekerja paralel mulai**: satu still per peran teks (R1–R6, `references/typography.md` §8a) di atas footage asli, dinilai Sutradara berdampingan dengan frame kunci (`cookbook/README.md` §6 butir 2).

## 0c. Alur kerja: tahap kanonik, dua render

Tahap, pintu, dan buktinya: tabel `MOTION-CORE.md` §1.
1. **Brief**: `BRAND.md` + `EDITING.md` merek di brief ada dan `scripts/juri/profil_cek.py` LULUS; belum ada → isi dulu bersama user (`templates/merek/README.md`).
2. **Naskah**: naskah final disetujui pemilik.
3. **Storyboard/block out**: storyboard + tabel racikan disetujui pemilik; tema gaya user diterjemahkan lewat frame kunci 2–3 kartu terdekat, lalu still per beat di atas footage asli + klip draft untuk gerak kamera/transisi dikirim langsung di percakapan. Masukan user ditulis ke ledger.
4. **Animate → Effects & grade → Mix** tanpa meminta revisi: gerbang render (`MOTION-CORE.md` §3), Devil's Advocate sekali sebelum render.
5. **Deliver**: render 1 utuh → masukan user dikumpulkan dalam satu ronde → render 2 (finishing, `references/revision-log.md` §0) → unggah Drive + caption.

Di awal video salin `templates/TAHAP.md` ke `projects/<proyek>/TAHAP.md`. `python3 scripts/juri/tahap.py projects/<proyek>` menunjuk langkah berikutnya dan bagian file yang dibaca untuk langkah itu; langkah selesai = dicentang + bukti. Satu TASK = satu subagen baru; sesi yang konteksnya sudah besar menulis `STATUS.md` lalu diganti (`references/roles.md` §6).

## 0b. Render dan juri

- Semua render lewat `scripts/juri/render.sh <proyek> still|draft|frames|final …`. Render penuh ditolak sampai resep lulus, semua still terbaru, lembar sanding dibuat, draft gerak terbaru, audit visual semua potongan LULUS (`frames` → `frame_audit.py` → Sutradara menilai frame tahan tiap detik; satu penilai), dan `qc/JURI.md` berakhir `PUTUSAN: LULUS` dengan bukti tiap catatan Irfan aktif.
- **Juri visual adalah mata, bukan skrip.** Gaya, posisi teks dan objek, keseimbangan, dan estetika dinilai dengan melihat gambarnya, berdampingan dengan frame kunci kiblat (yang bagus) dan `cookbook/contoh-gagal/` (yang jelek): pada still per beat (daftar cek `cookbook/README.md` §Juri 2, `scripts/juri/sandingkan.py` untuk lembar sanding, lalu tiap pertanyaan "Yang harus terasa sama saat disandingkan" kartu kiblat dan Lantai A–D) dan pada frame tahan tiap detik di audit visual, oleh satu penilai (Sutradara, `templates/roles/pemeriksa-frame.md`); frame yang lemah diberi solusi desain dari kartu. `scripts/juri/teks_cek.py` hanya penunjuk still yang perlu dilihat. Rinci: `cookbook/README.md` §Juri. Sekali sebelum render final, satu Creative Devil's Advocate dari luar memberi usul dengan brief steril (`templates/roles/devils-advocate.md`).
- **Visual dulu, audio sesudahnya.** Audit visual dijalankan setelah visual selesai dan sebelum SFX/musik disusun; kecocokan bunyi dengan gerak diperiksa di fase audio (`frame_audit.py --fase audio`, `templates/roles/pemeriksa-audio.md`).
- Revisi: hanya atribut yang diminta berubah (`scripts/juri/revisi_cek.py cek`); perbarui still adegan itu saja dan rakit rentang framenya (`scripts/lego/compose.py --rentang`), bukan seluruh video. Audio, audit semua frame, dan Devil's Advocate sekali sebelum final (`references/revision-log.md` §0).
- Pelajaran dari Irfan disimpan menurut cakupannya (`cookbook/README.md` §Tumbuh).

## Rujukan teknis

Persona, rincian per tahap, peran Sutradara/Editor, struktur folder, dan kapan membaca cabang ada di `references/alur-teknis.md` (§1–7). Jangan membacanya utuh di awal sesi: `TAHAP.md` proyek menyebut bagian mana yang dibuka di tiap langkah (`templates/TAHAP.md`, `scripts/juri/tahap.py`).

- **Rekaman talking head mentah → paket untuk editor manusia** (timeline ber-timecode, rough cut, aset PNG, storyboard, animatic): `references/selects-editor.md` + `scripts/selects/`.
- **Color grading footage**: `references/grade.md` + `scripts/gate/grade_ukur.py`.
