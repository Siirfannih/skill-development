---
name: motion-graphic
description: "Directs and builds Irfan's motion graphic videos (Jadisatu, Tuntunly, siirfan content) from brief to render — persona, gated workflow, an always-on quality floor (LANTAI), a reference cookbook of motion mechanics remixed onto the user's own concept (cookbook: INDEX, pattern cards with narrative triggers, RESEP), a render gate and reviewer scripts (juri), plus branch files for storyboard, copywriting, typography, camera, audio, Remotion build, and QA. Use for any video or motion request from Irfan, even a rough one: bikin video, launch video, reel, promo, motion, animasi teks, storyboard, naskah VO, revisi video, bedah referensi, After Effects, or when he sends a reference video. Also for podcast/interview clip edits with motion overlays and captions."
---

# Motion Graphic (Irfan)

Skill ini lapisan penaik mutu video. Ia bukan template dan bukan pembajak konsep: **konsep user + mekanik cookbook = output baru**. Tema, palet, aset, dan arahan user selalu menjadi fondasi. Dari referensi hanya dipindahkan mekanik gerak, ritme kamera, hierarki tipografi, dan standar audio. Draf atau kode user diaudit dan dihaluskan, tidak dirombak (`cookbook/README.md` §1, §3).

**Mulai di sini (urut, bacaan kecil dulu):**
1. `../irfan-creative-workflow/SKILL.md` §2 gerbang. Bedah bahan user dulu (naskah/transkrip, footage, aset), lalu naskah final, lalu storyboard, lalu persetujuan user. Belum ada kode sebelum gerbang 3 lolos.
2. Di gerbang storyboard ada **Langkah 1 cookbook**. Baca `cookbook/INDEX.md`, cocokkan fungsi cerita tiap beat dengan *Narrative trigger*, buka hanya 2–4 kartu, lalu ajukan tabel racikan (beat → pola → remix → SFX) untuk disetujui (`cookbook/README.md` §2).
3. **Langkah 2**: kode Remotion ditulis dari nol dari tabel itu, dengan Lantai di bawah sebagai standar mutu, dan render lewat juri (§0b).

Tiga hal yang selalu dikerjakan: **Lantai** (mutu di semua video, di bawah ini, lengkap) → **pengikat/kiblat + racikan pola** di `RESEP.md` (dipinjam dari kartu hanya bila user tidak membawa gaya) → **Juri** (hasil disandingkan dengan frame kunci sebelum render penuh). `cookbook/` menyimpan kartu dan frame kuncinya sebagai contoh yang bagus, dan `cookbook/contoh-gagal/` sebagai contoh yang jelek.

Bila bagian lain di skill ini bertentangan dengan Lantai atau resep, Lantai dan resep yang menang.

## 0. Lantai (selalu berlaku)

<!-- LANTAI:mulai (disalin dari LANTAI.md oleh tools/sync_lantai.py; jangan diedit di sini) -->
Lantai menentukan **mutu**; kiblat (kartu di `cookbook/`) menentukan **gaya**. Bila kartu kiblat bertentangan dengan lantai, lantai menang dan penyesuaiannya ditulis di `RESEP.md`. Lantai tidak berisi font, warna, atau layout tertentu: itu urusan kiblat.

Setiap butir bisa dicek dari still atau angka. Butir baru hanya masuk bila berlaku untuk semua gaya dan sudah muncul di dua video berbeda (lihat `cookbook/README.md` §Tumbuh).

### A. Teks di layar
1. **Semua ucapan tampil sebagai teks, dalam SATU lapisan tipografi kinetik bergaya editorial.** Tidak ada baris subtitle terpisah di pita bawah seperti subtitle film.
2. **Posisi teks lahir dari komposisi tiap shot**: dekat subjek, di ruang kosong, atau menempel objek yang dirujuk. Gagal bila 3 tampilan berturut-turut duduk di pita yang sama tanpa alasan komposisi. Teks menempel pada subjeknya: jarak teks ke subjek yang dirujuk paling jauh ±8 % tinggi frame, dan tidak lebih dekat ke tepi frame daripada ke subjek.
3. **Kata tidak tampil dua kali.** Kata yang sudah jadi penekanan tidak diulang di lapisan atau tempat lain pada saat yang sama.
4. **Maksimal 2 baris per tampil, 1–3 kata per tampil, blok seimbang** (baris terpendek ≥ 85 % baris terpanjang; bukan satu kalimat dalam 2 baris seperti headline berita), tidak terpotong tepi, tidak ada kata yatim. Tumpuk kata (1 kata per baris) boleh. Saat pembicara bertanya, tanda tanya tampil.
5. **Teks hanya dari ucapan.** Tidak menambah kalimat atau angka yang tidak diucapkan.
6. **Satu baris satu ukuran.** Kata yang dibesarkan pindah ke barisnya sendiri. Dua gaya huruf tidak sama kuat dalam satu frasa (serif tidak seukuran dan sebobot dengan kata bold di sebelahnya).
7. **Huruf menyatu dengan frame-nya.** Kontras ≥ 4,5 : 1, ukurannya berhubungan dengan subjek di frame, tidak menyentuh tepi. Terbaca di layar HP (uji lebar 360 px): kata sambung ≥ 56 px @1080, dan teks kunci tidak duduk di 8 % bawah frame. Teks biru di latar gelap atau navy gagal kontras (±3,6 : 1); di latar gelap penekanan lewat putih penuh vs redup, ketebalan, skala, atau kapital. Jenis huruf ikut kiblat; serif tidak dilarang. Font yang dipakai termuat dari file (`fonts/README.md`), tidak jatuh ke font cadangan sistem; build gagal bila font tidak ditemukan. Contoh gagal: `cookbook/contoh-gagal/01-serif-pucat-raksasa.jpg`.
8. **Terbaca berurutan dan cukup lama**: satu arah baca, tiap frasa tampil sampai selesai diucapkan, terbaca di layar HP.
9. **Kotak di belakang teks hanya bila kontras gagal**, bukan hiasan; narasi kinetik tanpa kotak/shape di belakangnya.
9a. **Gerak teks dipilih dari peran kalimatnya, bukan fade untuk semua.** Isi teks = ucapan (waktu dan durasi dihitung `scripts/lego/teks_plan.py`); tiap blok diberi peran (R1 narasi, R2 kata kunci, R3 klaim, R4 label/daftar, R5 UI, R6 hero, sub), satu gerak T dari tabel `typography.md` §8a, gaya G, posisi, dan alasan. Satu peran = satu gerak di seluruh video; tiap 15 dtk ≥ 3 gerak berbeda dan ≥ 1 penekanan, kecuali adegan tenang yang alasannya ditulis. Fade hanya untuk sub-line kecil. Efek pada huruf adalah gaya terdefinisi (mis. G8 kilat cahaya), bukan footage/tekstur yang dimasukkan ke huruf. `scripts/lego/kt_check.py teks.json` PASS.

### B. Kamera dan gerak
10. **Frame tidak datar.** Setiap shot lebih dari 2 detik punya gerak kamera yang disengaja (push/zoom pelan untuk fokus, pan, atau mengikuti objek). Pengecualian hanya bila kartu kiblat memang berkamera diam, dan itu ditulis di `RESEP.md`.
11. **Kamera mengikuti SATU objek fokus per beat**, dari objek itu muncul sampai selesai, tidak kembali ke posisi awal di tengah jalan. Kamera patuh ucapan: datang di awal kata dan tahan sampai kata berikutnya, keyframe dari tabel waktu kata, dan framing akhir tidak memotong objek.
12. **Elemen diam di dunianya, kamera yang bergerak.** Saat kamera zoom, ia melewati teks dan objek; teks tidak ikut bergeser sendiri.
13. **Tidak ada pergantian yang mendadak atau malas; nol crossfade, fade bukan gerak**: yang masuk datang dari suatu arah atau berubah bentuk, gerak cepat memakai motion blur, easing tidak linear. Overlay/gradien masuk dan keluar dengan gerak. Mekanik transisi dipilih dari hubungan ruang dua adegan (B di dalam A → push-through; A bagian dari B → pull-back; ganti topik → whip): `references/motion-mechanics.md`, `references/pacing-map.md`.
13a. **Gerak dirancang per gerak, bukan preset.** Kurva dipilih menurut apa geraknya dari `scripts/remotion/curves.ts` (`land` masuk dari luar frame, `heavy` objek besar dan kamera, `whip` ganti keadaan, `reveal` teks dari mask, `leave` keluar, `drift` hold), bukan `Easing.ease`/`inOut(cubic)`. Durasi dihitung dari jarak dan bobot (`dur(px, fps, bobot)`), bukan kebiasaan 0,4–0,6 dtk. Satu gerak utama diikuti reaksi berjeda tidak rata (`react(i)`: 0, 67, 150, 250, 367, 500 ms), bukan stagger i × konstanta. Gerak keluar ±0,65× masuk dan makin cepat. Hold > 1 dtk tetap hidup (drift/napas kamera) kecuali diam disengaja. Tidak ada fade-up atau blur-in sebagai cara masuk bawaan; blur hanya untuk gerak cepat. Satu transisi khas per video. `scripts/juri/motion_lint.py` PASS.
13b. **Format yang muncul berulang berbeda framing tiap kemunculan** (grafik kedua dan seterusnya: kamera mengikuti titik, close-up, posisi lain, reveal-out).

### C. Komposisi
14. **Satu fokus per momen.** Mata tahu harus melihat ke mana. Teks dan visual tidak berbobot sama di momen yang sama: teks masuk satu per satu mengikuti ucapan dan yang baru masuk menjadi fokus; visual yang kuat tampil tanpa teks tandingan (`references/decision-guide.md`).
15. **Teks, objek, dan visual satu kesatuan**: tidak tumpang tindih, tidak bertabrakan, tidak berjauhan seperti bagian terpisah.
16. **Tepi frame bersih.** Tidak ada objek penting di zona tepi kecuali karena gerak kamera; margin aman 5 %.
17. **Seimbang dan hierarkinya terbaca, dinilai global per frame**, bukan per ukuran objek: posisi teks, objek, KT, bingkai, dan b-roll dilihat bersama di zoom 25 %, 50 %, dan 100 %. Urutan baca di ukuran normal jelas: latar utama (#primary) → teks/objek utama → pengisi (objek pinggir, teks kecil). Satu sisi berisi teks + visual sementara sisi lain kosong = gagal; perbaikannya pindah posisi (mis. kunci ke kanan bawah, berseberangan dengan kepala di kiri atas). Dinilai dengan mata (Sutradara/LLM) pada still **sebelum** render penuh dan pada frame tahan tiap detik, berdampingan dengan frame kunci kiblat dan `cookbook/contoh-gagal/`, memakai daftar cek di `cookbook/README.md` §Juri butir 2. Gaya, posisi, keseimbangan, dan estetika tidak dinilai dengan skor skrip.
18. **Rapi**: garis berakhir di tepi bentuknya, jarak antar-elemen sama, stroke dan radius konsisten.
18a. **Palet dikunci di resep.** Satu keluarga aksen dominan, netral membawa frame, tidak ada warna di luar palet (`references/palette.md`, `scripts/palette_check.py`).
18b. **Setiap efek punya fungsi.** Glow, gradien, negative, RGB split, dan flash dipakai karena membantu penonton memahami sesuatu (transisi, sebelum-sesudah, penekanan); efek yang fungsinya tidak bisa dijelaskan dihapus.

### D. Isi visual
19. **Visual menggambarkan makna ucapan**, bukan bentuk atau hiasan. Penonton harus lebih mudah paham karena visual itu.
19a. **Metafora dulu, baru gambar.** Sebelum panel digambar, tiap kalimat VO diperas di `beats.json → metafora`: makna inti (apa yang harus dipahami penonton), emosi, aksi (kata kerja: membuka, menyambung, bocor, menekan, menumpuk), **satu** metafora, 3–6 objek kunci, dan urutan rakitnya. Teks VO tidak disalin ke gambar. `board.py` FAIL bila kosong.
19b. **Situasi digambar dengan bentuk yang menjelaskannya** (`metafora.bentuk`): isi atau cara kerja benda → exploded view atau potongan (lapis terurai + garis label); perilaku/perasaan manusia → piktogram/stick figure, bukan produk; sebab-akibat → satu elemen menggerakkan elemen lain; angka → grafik; perjalanan/lokasi → peta rute; aplikasi → UI asli (D20). Bentuk dipilih dari `aksi`, bukan dari gaya yang sedang disukai.
19c. **Storyboard dari Irfan adalah struktur, bukan visual akhir.** Ia menjelaskan apa yang terjadi, urutannya, dan metaforanya; visual akhir tiap beat dirancang supaya paling mudah dipahami penonton.
20. **Tampilan platform dan logo adalah yang asli** (Threads, Instagram, ChatGPT, GitHub), dibangun ulang sebagai animasi, bukan UI karangan. Ikon memakai ikon jadi.
21. **Yang sedang bicara tampil di frame**, kecuali tertutup visual layar penuh.
22. **Tidak ada placeholder** di render. Objek yang tampil (website, poster, aplikasi, dokumen) didesain seperti produk nyata yang profesional, bukan bentuk pengganti dari storyboard.
22a. **Tokoh dan dunia yang sudah diperkenalkan konsisten sampai akhir.**
22b. **Uji logika dunia nyata sebelum merancang beat**: apakah orang sungguhan melakukannya seperti ini? Kiasan dalam ucapan tidak digambar harfiah sebagai fakta.
22c. **Tiga detik pertama menentukan.** Buka dengan gebrakan visual dan bunyi di frame 0, bukan teks kecil di layar kosong.

### E. Audio
23. **Suara tidak dipercepat, jedanya bersih, dan tak ada fonem yang digunting.** Tempo dirapatkan dengan memotong jeda mati. Kata sampah (eee, emm, tuh, …) dan diam saat berpikir dibuang di tahap potong, termasuk diam yang tertelan ke durasi kata. Rencana cut divalidasi terhadap transkrip **take sumber**: kata isi tidak boleh teriris > 20 ms, tiap batas punya guard 50 ms, durasi kata hasil ≥ 85 %, dan urutan ASR aktual tetap sama; jumlah entri JSON/remap bukan bukti suara masih utuh. `audio_order.py lock suara --words … --source-words … --cut-map … --voice-source …` dan `cut_check.py` wajib PASS sebelum suara dikunci. Saat pembicara berhenti atau berpikir, tidak terdengar dengung kamar, piring, atau klik: jeda tidak diisi room tone kotor, stem suara di jeda ≤ −50 dBFS (`scripts/gate/pause_clean.py`). **Level suara asli tidak pernah diturunkan, di-loudness-kan, atau di-limit**: yang boleh hanya peredam noise, lalu gain naik bersih ke ±−16 LUFS bila sumbernya terlalu pelan atau kalah dari musik/SFX; musik dan SFX yang menyesuaikan ke suara. `gate/voice_level.py suara_sumber.wav suara_hasil.wav` PASS.
24. **1 SFX untuk 1 objek/visual penting, satu peran satu bunyi, dengan jarak.** Setiap objek atau visual yang muncul/bergerak (kartu, ikon, transisi, gerak kamera, kata slam/penekanan) mendapat satu SFX sesuai peruntukannya, puncaknya di frame objek itu. Item barisan yang masuk terpisah (> 2 frame) masing-masing berbunyi; yang masuk serentak (≤ 2 frame) dihitung satu event. Kata KT/subtitle yang muncul kata per kata **tidak** berbunyi (bunyi per kata = spam). Satu peran = satu file sepanjang video, dan satu file = satu peran. Tidak ada batas jumlah, batasnya spam: dua bunyi ≥ 100 ms, whoosh ≥ 1 dtk, maksimal 5 cue dalam 2 dtk. Gain −4 sampai −10 dB. File dari `~/sfx/SFXIrfan` dulu (kandidat, bukan allowlist) dan didengar sebelum dipakai; palet terlarang: kayu/thock/felt, koin/logam, kartun/langkah kaki, 8-bit, noise/sinus sintetis, rope-creak. `gate/sfx_density.py render.mp4 cues.json --objects objects.json` PASS.
25. **Musik mengikuti tempo dan suasana video**, tidak bolong, tidak melawan emosi ucapan. Musik per babak, bukan satu track dari awal sampai akhir; kategori suasana diukur dari tempo video (`scripts/audio/pace_read.py`) dan musik dipilih dengan `scripts/audio/music_fit.py`; bed ada sejak frame 0 dan tidak pernah kosong di bawah klip.
25a. **SFX terdengar dan nyaman, dan mix diuji di speaker HP.** Stem SFX diukur di bagian padat aksi, bukan sekadar ada di cue sheet; sumber yang berdesis atau tajam ditolak, tidak dikeraskan dengan saturasi; `scripts/audio/audio_phone.py` dan `scripts/audio_qa.py --module5` lulus sebelum render final (standar mix: `references/audio.md` §14.6–14.10).

### F. Cara kerja
26. **Alur: profil merek → editing guideline + preview → produksi penuh → render 1 → satu ronde masukan → render 2 (finishing).** Masukan user hanya di preview tahap 2 (still di atas footage asli + klip draft untuk gerak kamera/transisi, dikirim langsung di percakapan) dan setelah render 1; di antaranya model tidak meminta revisi dan hanya bertanya bila brief, profil merek, preview yang disetujui, dan kartu tidak menjawab (`templates/merek/README.md`). Di dalam produksi urutannya: still per beat → draft skala 0,5 → audit visual semua frame → SFX → musik → audit audio → render. Visual selesai dan lulus dulu; audio disusun sesudahnya dan menyesuaikan gerak yang sudah final. Semua lewat `scripts/juri/render.sh`; render penuh ditolak sebelum resep dan still lulus. Satu render penuh 1080p ±8–18 menit di PC server, jadi ia langkah terakhir. **Audit tanpa sampling sebelum MP4**: semua frame dirender sebagai gambar (`render.sh frames`), dipecah per ≤ 10 dtk, tiap detik dinilai **dengan mata oleh satu penilai (Sutradara)**: gaya terhadap kiblat, posisi teks dan objek, keterbacaan, transisi, dan jarak antar-frame, dan tiap frame yang lemah diberi solusi desain dari kartu (`scripts/juri/frame_audit.py`, `templates/roles/pemeriksa-frame.md`). Render penuh ditolak sampai semua potongan `PUTUSAN: LULUS`, lalu satu Creative Devil's Advocate dari luar melihat videonya sekali sebelum render final (`templates/roles/devils-advocate.md`): usulnya ditimbang Sutradara, bukan gerbang lulus/gagal. Kecocokan bunyi dengan gerak diperiksa di fase audio (`frame_audit.py --fase audio`, `templates/roles/pemeriksa-audio.md`), bukan di audit visual. **Video berfootage dirakit seperti lego**: footage dan kamera footage dikerjakan ffmpeg, teks/KT dan visual dirender terpisah sebagai lapisan ber-alpha seukuran kotaknya dan di-cache (`scripts/lego/lapisan.py`), lalu dirakit sekali (`render.sh <proyek> lego lego/lego.json`). Revisi waktu/posisi teks = ubah `lego.json`, tanpa render ulang lapisan.
27. **Revisi = diff, satu ronde.** Masukan user atas render 1 dikumpulkan dan dikerjakan sekaligus menjadi render 2; pertanyaan atas masukan yang kabur diajukan sekali di awal ronde. Adegan yang sudah disetujui tidak disentuh; yang dirender ulang hanya rentang yang berubah. Dalam blok yang direvisi pun hanya atribut yang diminta yang berubah (warna, huruf, ukuran, posisi, waktu, gerak); `scripts/juri/revisi_cek.py cek` membandingkan tiap blok teks dan lapisan dengan basis. Tiap ronde revisi dirakit per rentang (`scripts/lego/compose.py --rentang`) dengan lembar sebelum/sesudah; kunci ulang audio, audit semua frame, dan Devil's Advocate dijalankan sekali sebelum render final, bukan tiap ronde. **Revisi video yang dibuat sebelum aturan baru**: tulis `qc/revisi.json` {"basis": "<commit versi yang disetujui>", "alasan": …}; aturan dan gerbang baru (B13a, A9a, E23/E24, lego) berlaku untuk bagian yang diubah saja, bagian yang disetujui tidak dimigrasi kecuali Irfan memintanya. `render.sh final` lalu memeriksa motion_lint hanya pada file yang berubah dan `audio_order.py check --warisan`.
28. **Tidak yakin = tanya, jangan menebak.** Cek dulu sumber yang bisa dicek sendiri (file proyek, kartu, skill ini); bila masih ragu, tanya dengan pertanyaan spesifik.
28a. **Baca folder proyek sebelum build.** Isi `projects/<proyek>/` (RESEP, DECISIONS, STATUS, aset) menang atas moodboard atau ingatan.
28b. **Contoh atau koreksi dari Irfan berlaku untuk frame yang ia sebut**, bukan aturan semua frame; sebut frame mana yang berubah sebelum mengubah massal. Saran dari model lain diterapkan selektif; putusan Irfan menang.
28c. **Tidak ada generate berbayar sebelum gerbangnya terbuka**, dan biayanya disebut dulu.
29. **Video baru dikirim setelah juri lulus** (`cookbook/README.md` §Juri), bersama lembar sanding still vs kiblat.
<!-- LANTAI:selesai -->

## 0a. Kiblat dan resep (sebelum build)

1. Baca `cookbook/INDEX.md` (satu baris per kartu: nama pola, narrative trigger, kategori). Untuk satu teknik lintas kartu: `cookbook/POLA.md`. Semua kartu adalah contoh mutu dan sumber mekanik, bukan ukuran untuk disalin.
2. Tentukan pengikat (kiblat):
   - User membawa gaya, brand, atau draf → gaya user adalah pengikatnya. Kartu hanya menyumbang mekanik.
   - Irfan mengirim video referensi di sesi → itu kiblatnya. Bedah dulu ke kartu baru (`cookbook/README.md` §Referensi baru).
   - Prompt menyebut gaya → pilih satu kartu yang paling cocok sebagai pengikat dan sebut ke user.
   - Prompt tanpa gaya → ikuti gaya global brief (gaya bawaan `templates/gaya/` boleh dipakai bila cocok). Brief juga tanpa gaya → pakai kartu paling mirip, tulis alasannya di `RESEP.md`.
   - Video bermode ganda boleh berkiblat berbeda per mode, asal gayanya konsisten.
3. Racik pola per beat: 1–3 kartu mekanik dipilih lewat *Narrative trigger*. Buka hanya kartu itu dan frame kuncinya, lalu isi tabel racikan (`cookbook/README.md` §2) dan minta persetujuan user. Jangan membuka semua kartu.
3a. **Bentuk visual dicari di kartu, tidak dikarang.** Adegan yang butuh bentuk tertentu (tampilan Instagram, chat, dashboard, peta, tokoh, dsb.):
   - Cari lewat `cookbook/INDEX.md`/`POLA.md`.
   - Buka kartunya + frame kuncinya.
   - Pinjam mekaniknya dengan gaya user atau pengikat, lalu catat di `RESEP.md`.
   - Tidak ada di kartu, brief, maupun `DECISIONS.md` → tanya Irfan tampilan yang ia mau.
   Rinci: `cookbook/README.md` §5.
3b. **Sebelum merancang teks, visual, atau gerak sebuah adegan**, baca `guide/<urusan>/GUIDE.md` §Cara memutuskan (pelajaran bersyarat "bila…, pilih…, karena…" dari koreksi sebelumnya) dan lihat `cookbook/contoh-gagal/`. Subagen yang membangun visual tidak disuruh membaca semua itu: Sutradara memberinya brief bergambar (`templates/handoff-fase.md`): frame footage adegannya, frame kunci atau potongan klip referensi, still spine, maksud adegan, dan teknik kartu yang dipakai beserta syarat dan penyesuaiannya, bukan tabel angka.
4. Tulis `projects/<proyek>/RESEP.md` dari `cookbook/RESEP-TEMPLATE.md`: 8 bagian anatomi. **Pengikat** (warna & tekstur, teks, ritme) dari satu sumber; **teknik** (b-roll, motion graphic, kamera & transisi, SFX, musik) boleh dipinjam kartu lain dan dikenakan pengikat kiblat. Cek: `python3 scripts/juri/resep_check.py projects/<proyek>/RESEP.md`.
5. **Kondisi footage dulu, baru teknik.** Lembar kondisi footage per jenis shot (rasio, skala wajah, terang-gelap latar, pakaian, ruang kosong, benda ramai, kamera) ditulis sebelum teknik kartu dipilih; teknik yang syaratnya tidak cocok disesuaikan atau tidak dipakai. Angka di kartu adalah pengamatan di video asli, bukan target (`cookbook/README.md` §Alur butir 6).
6. **Spine gaya dikunci sebelum pekerja paralel mulai**: satu still per peran teks (R1–R6, `references/typography.md` §8a) di atas footage asli, dinilai Sutradara berdampingan dengan frame kunci (`cookbook/README.md` §Alur butir 7).

## 0c. Alur kerja: lima tahap, dua render

1. **Profil merek**: `BRAND.md` + `EDITING.md` merek di brief ada dan `scripts/juri/profil_cek.py` LULUS; belum ada → isi dulu bersama user (`templates/merek/README.md`).
2. **Editing guideline + preview**: tema gaya user diterjemahkan lewat frame kunci 2–3 kartu terdekat, lalu still per beat di atas footage asli + klip draft untuk gerak kamera/transisi dikirim langsung di percakapan. Masukan user ditulis ke ledger.
3. **Produksi penuh** tanpa meminta revisi: gerbang §4, Devil's Advocate sekali sebelum render.
4. **Render 1** utuh → masukan user dikumpulkan dalam satu ronde.
5. **Render 2**: finishing atas masukan itu (`references/revision-log.md` §0), lalu selesai.

Di awal video salin `templates/TAHAP.md` ke `projects/<proyek>/TAHAP.md`. `python3 scripts/juri/tahap.py projects/<proyek>` menunjuk langkah berikutnya dan bagian file yang dibaca untuk langkah itu; langkah selesai = dicentang + bukti. Satu TASK = satu subagen baru; sesi yang konteksnya sudah besar menulis `STATUS.md` lalu diganti (`references/roles.md` §6).

## 0b. Render dan juri

- Semua render lewat `scripts/juri/render.sh <proyek> still|draft|frames|final …`. Render penuh ditolak sampai resep lulus, semua still terbaru, lembar sanding dibuat, draft gerak terbaru, audit visual semua potongan LULUS (`frames` → `frame_audit.py` → Sutradara menilai frame tahan tiap detik; satu penilai), dan `qc/JURI.md` berakhir `PUTUSAN: LULUS` dengan bukti tiap catatan Irfan aktif.
- **Juri visual adalah mata, bukan skrip.** Gaya, posisi teks dan objek, keseimbangan, dan estetika dinilai dengan melihat gambarnya, berdampingan dengan frame kunci kiblat (yang bagus) dan `cookbook/contoh-gagal/` (yang jelek): pada still per beat (daftar cek `cookbook/README.md` §Juri 2, `scripts/juri/sandingkan.py` untuk lembar sanding, lalu tiap pertanyaan "Yang harus terasa sama saat disandingkan" kartu kiblat dan Lantai A–D) dan pada frame tahan tiap detik di audit visual, oleh satu penilai (Sutradara, `templates/roles/pemeriksa-frame.md`); frame yang lemah diberi solusi desain dari kartu. `scripts/juri/teks_cek.py` hanya penunjuk still yang perlu dilihat. Rinci: `cookbook/README.md` §Juri. Sekali sebelum render final, satu Creative Devil's Advocate dari luar memberi usul dengan brief steril (`templates/roles/devils-advocate.md`).
- **Visual dulu, audio sesudahnya.** Audit visual dijalankan setelah visual selesai dan sebelum SFX/musik disusun; kecocokan bunyi dengan gerak diperiksa di fase audio (`frame_audit.py --fase audio`, `templates/roles/pemeriksa-audio.md`).
- Revisi: hanya atribut yang diminta berubah (`scripts/juri/revisi_cek.py cek`); perbarui still adegan itu saja dan rakit rentang framenya (`scripts/lego/compose.py --rentang`), bukan seluruh video. Audio, audit semua frame, dan Devil's Advocate sekali sebelum final (`references/revision-log.md` §0).
- Pelajaran dari Irfan disimpan menurut cakupannya (`cookbook/README.md` §Tumbuh).

## Rujukan teknis

Persona, gerbang 0–12, peran Sutradara/Editor, struktur folder, dan kapan membaca cabang ada di `references/alur-teknis.md` (§1–7). Jangan membacanya utuh di awal sesi: `TAHAP.md` proyek menyebut bagian mana yang dibuka di tiap langkah (`templates/TAHAP.md`, `scripts/juri/tahap.py`).

- **Rekaman talking head mentah → paket untuk editor manusia** (timeline ber-timecode, rough cut, aset PNG, storyboard, animatic): `references/selects-editor.md` + `scripts/selects/`.
- **Color grading footage**: `references/grade.md` + `scripts/gate/grade_ukur.py`.
