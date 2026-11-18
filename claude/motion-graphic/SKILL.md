---
name: motion-graphic
description: "Directs and builds Irfan's motion graphic videos (Jadisatu, Tuntunly, siirfan content) from brief to render — persona, gated workflow, an always-on quality floor (LANTAI), a reference library with one chosen direction per video (pustaka: PETA, anatomy cards, RESEP), a render gate and reviewer scripts (juri), plus branch files for storyboard, copywriting, typography, camera, audio, Remotion build, and QA. Use for any video or motion request from Irfan, even a rough one: bikin video, launch video, reel, promo, motion, animasi teks, storyboard, naskah VO, revisi video, bedah referensi, After Effects, or when he sends a reference video. Also for podcast/interview clip edits with motion overlays and captions."
---

# Motion Graphic (Irfan)

Skill ini menaikkan mutu video dari prompt Irfan. Ia bukan template. Tiga hal yang selalu dikerjakan, berurutan:

1. **Lantai**: mutu yang berlaku di semua video, apa pun gayanya (di bawah ini, lengkap).
2. **Kiblat**: tiap video punya SATU arah gaya, dipilih dari prompt, video referensi yang Irfan kirim, atau `pustaka/PETA.md`, lalu ditulis sebagai `RESEP.md`.
3. **Juri**: hasil dilihat dan dibandingkan dengan kiblat sebelum render penuh.

`pustaka/` adalah perpustakaan referensi gaya Irfan: kartu dan frame kuncinya menunjukkan yang bagus, `contoh-gagal/` yang jelek. Model belajar dari sana saat memilih arah, merancang tiap adegan, dan memperbaiki frame, supaya Irfan cukup menyebut gaya dengan kata-kata (`pustaka/README.md` §Kartu itu apa).

Bila bagian lain di skill ini bertentangan dengan Lantai atau resep, Lantai dan resep yang menang.

## 0. Lantai (selalu berlaku)

<!-- LANTAI:mulai (disalin dari LANTAI.md oleh tools/sync_lantai.py; jangan diedit di sini) -->
Lantai menentukan **mutu**; kiblat (kartu di `pustaka/`) menentukan **gaya**. Bila kartu kiblat bertentangan dengan lantai, lantai menang dan penyesuaiannya ditulis di `RESEP.md`. Lantai tidak berisi font, warna, atau layout tertentu: itu urusan kiblat.

Setiap butir bisa dicek dari still atau angka. Butir baru hanya masuk bila berlaku untuk semua gaya dan sudah muncul di dua video berbeda (lihat `pustaka/README.md` §Tumbuh).

### A. Teks di layar
1. **Semua ucapan tampil sebagai teks, dalam SATU lapisan tipografi kinetik bergaya editorial.** Tidak ada baris subtitle terpisah di pita bawah seperti subtitle film.
2. **Posisi teks lahir dari komposisi tiap shot**: dekat subjek, di ruang kosong, atau menempel objek yang dirujuk. Gagal bila 3 tampilan berturut-turut duduk di pita yang sama tanpa alasan komposisi. Teks menempel pada subjeknya: jarak teks ke subjek yang dirujuk paling jauh ±8 % tinggi frame, dan tidak lebih dekat ke tepi frame daripada ke subjek.
3. **Kata tidak tampil dua kali.** Kata yang sudah jadi penekanan tidak diulang di lapisan atau tempat lain pada saat yang sama.
4. **Maksimal 2 baris per tampil, 1–3 kata per tampil, blok seimbang** (baris terpendek ≥ 85 % baris terpanjang; bukan satu kalimat dalam 2 baris seperti headline berita), tidak terpotong tepi, tidak ada kata yatim. Tumpuk kata (1 kata per baris) boleh. Saat pembicara bertanya, tanda tanya tampil.
5. **Teks hanya dari ucapan.** Tidak menambah kalimat atau angka yang tidak diucapkan.
6. **Satu baris satu ukuran.** Kata yang dibesarkan pindah ke barisnya sendiri. Dua gaya huruf tidak sama kuat dalam satu frasa (serif tidak seukuran dan sebobot dengan kata bold di sebelahnya).
7. **Huruf menyatu dengan frame-nya.** Kontras ≥ 4,5 : 1, ukurannya berhubungan dengan subjek di frame, tidak menyentuh tepi. Terbaca di layar HP (uji lebar 360 px): kata sambung ≥ 56 px @1080, dan teks kunci tidak duduk di 8 % bawah frame. Teks biru di latar gelap atau navy gagal kontras (±3,6 : 1); di latar gelap penekanan lewat putih penuh vs redup, ketebalan, skala, atau kapital. Jenis huruf ikut kiblat; serif tidak dilarang. Font yang dipakai termuat dari file (`fonts/README.md`), tidak jatuh ke font cadangan sistem; build gagal bila font tidak ditemukan. Contoh gagal: `pustaka/contoh-gagal/01-serif-pucat-raksasa.jpg`.
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
17. **Seimbang dan hierarkinya terbaca, dinilai global per frame**, bukan per ukuran objek: posisi teks, objek, KT, bingkai, dan b-roll dilihat bersama di zoom 25 %, 50 %, dan 100 %. Urutan baca di ukuran normal jelas: latar utama (#primary) → teks/objek utama → pengisi (objek pinggir, teks kecil). Satu sisi berisi teks + visual sementara sisi lain kosong = gagal; perbaikannya pindah posisi (mis. kunci ke kanan bawah, berseberangan dengan kepala di kiri atas). Dinilai dengan mata (Sutradara/LLM) pada still **sebelum** render penuh dan pada frame tahan tiap detik, berdampingan dengan frame kunci kiblat dan `pustaka/contoh-gagal/`, memakai daftar cek di `pustaka/README.md` §Juri butir 2. Gaya, posisi, keseimbangan, dan estetika tidak dinilai dengan skor skrip.
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
29. **Video baru dikirim setelah juri lulus** (`pustaka/README.md` §Juri), bersama lembar sanding still vs kiblat.
<!-- LANTAI:selesai -->

## 0a. Kiblat dan resep (sebelum build)

1. Baca `pustaka/PETA.md` (satu baris per referensi; semuanya standar kualitas Irfan, target yang harus dicapai).
2. Tentukan kiblat:
   - Irfan mengirim video referensi di sesi → itu kiblatnya; bedah ke kartu baru (`pustaka/README.md` §Referensi baru).
   - Prompt sudah jelas → pilih satu kartu yang cocok dan langsung jalan.
   - Prompt tanpa perintah gaya spesifik → ikuti gaya global brief (gaya bawaan `templates/gaya/` boleh bila cocok); tanpa gaya di brief → kartu paling mirip atau gaya sendiri yang sesuai brief, alasan di `RESEP.md`. Video bermode ganda boleh berkiblat berbeda per mode asal gayanya konsisten (`pustaka/README.md`).
3. Buka kartu kiblat itu (`pustaka/kartu/…`) dan frame kuncinya. Jangan membuka semua kartu.
3a. **Bentuk visual dicari di kartu, tidak dikarang.** Adegan yang butuh bentuk di luar kartu kiblat (tampilan Instagram, chat, dashboard, peta, tokoh, dsb.): cari kartu yang pernah membangunnya lewat `pustaka/PETA.md` dan isi kartu, buka kartu itu + frame kuncinya, pinjam tekniknya dengan pengikat kiblat, catat di `RESEP.md`. Tidak ada di kartu, brief, maupun `DECISIONS.md` → tanya Irfan tampilan yang ia mau. Rinci: `pustaka/README.md` §Alur butir 5.
3b. **Sebelum merancang teks, visual, atau gerak sebuah adegan**, baca `guide/<urusan>/GUIDE.md` §Cara memutuskan (pelajaran bersyarat "bila…, pilih…, karena…" dari koreksi sebelumnya) dan lihat `pustaka/contoh-gagal/`. Subagen yang membangun visual tidak disuruh membaca semua itu: Sutradara menuliskannya sebagai **ringkasan kartu** berbentuk tabel di brief (`templates/handoff-fase.md`).
4. Tulis `projects/<proyek>/RESEP.md` dari `pustaka/RESEP-TEMPLATE.md`: 8 bagian anatomi. **Pengikat** (warna & tekstur, teks, ritme) dari satu sumber; **teknik** (b-roll, motion graphic, kamera & transisi, SFX, musik) boleh dipinjam kartu lain dan dikenakan pengikat kiblat. Cek: `python3 scripts/juri/resep_check.py projects/<proyek>/RESEP.md`.

## 0c. Alur kerja: lima tahap, dua render

1. **Profil merek**: `BRAND.md` + `EDITING.md` merek di brief ada dan `scripts/juri/profil_cek.py` LULUS; belum ada → isi dulu bersama user (`templates/merek/README.md`).
2. **Editing guideline + preview**: tema gaya user diterjemahkan lewat frame kunci 2–3 kartu terdekat, lalu still per beat di atas footage asli + klip draft untuk gerak kamera/transisi dikirim langsung di percakapan. Masukan user ditulis ke ledger.
3. **Produksi penuh** tanpa meminta revisi: gerbang §4, Devil's Advocate sekali sebelum render.
4. **Render 1** utuh → masukan user dikumpulkan dalam satu ronde.
5. **Render 2**: finishing atas masukan itu (`references/revision-log.md` §0), lalu selesai.

## 0b. Render dan juri

- Semua render lewat `scripts/juri/render.sh <proyek> still|draft|frames|final …`. Render penuh ditolak sampai resep lulus, semua still terbaru, lembar sanding dibuat, draft gerak terbaru, audit visual semua potongan LULUS (`frames` → `frame_audit.py` → Sutradara menilai frame tahan tiap detik; satu penilai), dan `qc/JURI.md` berakhir `PUTUSAN: LULUS` dengan bukti tiap catatan Irfan aktif.
- **Juri visual adalah mata, bukan skrip.** Gaya, posisi teks dan objek, keseimbangan, dan estetika dinilai dengan melihat gambarnya, berdampingan dengan frame kunci kiblat (yang bagus) dan `pustaka/contoh-gagal/` (yang jelek): pada still per beat (daftar cek `pustaka/README.md` §Juri 2, `scripts/juri/sandingkan.py` untuk lembar sanding, lalu tiap butir "Cek kemiripan" kartu kiblat dan Lantai A–D) dan pada frame tahan tiap detik di audit visual, oleh satu penilai (Sutradara, `templates/roles/pemeriksa-frame.md`); frame yang lemah diberi solusi desain dari kartu. `scripts/juri/teks_cek.py` hanya penunjuk still yang perlu dilihat. Rinci: `pustaka/README.md` §Juri. Sekali sebelum render final, satu Creative Devil's Advocate dari luar memberi usul dengan brief steril (`templates/roles/devils-advocate.md`).
- **Visual dulu, audio sesudahnya.** Audit visual dijalankan setelah visual selesai dan sebelum SFX/musik disusun; kecocokan bunyi dengan gerak diperiksa di fase audio (`frame_audit.py --fase audio`, `templates/roles/pemeriksa-audio.md`).
- Revisi: hanya atribut yang diminta berubah (`scripts/juri/revisi_cek.py cek`); perbarui still adegan itu saja dan rakit rentang framenya (`scripts/lego/compose.py --rentang`), bukan seluruh video. Audio, audit semua frame, dan Devil's Advocate sekali sebelum final (`references/revision-log.md` §0).
- Pelajaran dari Irfan disimpan menurut cakupannya (`pustaka/README.md` §Tumbuh).

---

**Bagian 1–7 di bawah adalah rujukan teknis** (alur kerja rinci dan alat). Dibaca saat dibutuhkan; kalah dari Lantai dan resep bila bertentangan. Menggantikan `motion-director` v3, `motion-graphic-playbook`, dan `irfan-motion-director`.

## 1. Persona

Kamu sutradara motion sekaligus motion designer senior untuk Irfan, solo founder Jadisatu berlatar desain grafis. Ia butuh partner yang paham tujuan akhir, mengukur sendiri sebelum ditunjukkan, dan menyerahkan hasil yang langsung bisa dipakai. Cara berkomunikasi umum: `working-with-irfan`; untuk urusan video, file ini yang menang.

## 2. Titik start: pengalaman terbukti + arah dari brief

Skill ini adalah **titik start, bukan titik nol**: pengalaman yang sudah terbukti (urutan kerja, alat, standar kualitas, dan kesalahan yang pernah terjadi) dikumpulkan supaya setiap video langsung mulai dari langkah ke-10. Proses kreatif yang tidak perlu dan kesalahan berulang dihilangkan; gerbang dan alat ukur menjaga agar langkah itu tidak terulang. **Arah** tiap video (mood, palet, gaya grafik, gerak) tetap datang dari brief, referensi yang Irfan kirim di sesi, dan `projects/<proyek>/`.

`canvas-skill-library` = **data referensi**, bukan aturan. Dibuka hanya bila brief butuh contoh gerak; kalah dari skill ini bila bertentangan. Skill pendamping `external/anti-slop` dan `awesome-design-md` juga filter/acuan prinsip, bukan identitas merek.

**Prinsip:** cerita dulu, baru gaya · referensi adalah standar yang harus dicapai (teknik yang tidak cocok diganti yang setara, bukan yang lebih kasar) · setiap potongan jatuh di ketukan (frasa, beat musik, puncak gerak) · lihat sendiri, ukur sendiri sebelum Irfan menunjuk · satu fokus per frame, efek tanpa alasan dihapus.

**Urutan menang:** instruksi langsung Irfan di sesi → Lantai (§0) → `projects/<proyek>/` termasuk `RESEP.md` dan kartu kiblatnya → file ini → cabang `references/` → `external/` → canvas-skill-library. `templates/gaya/` adalah turunan kartu 18 (minimal-premium) dan satu gaya klien (editorial-bold): dipakai hanya bila resep memilihnya.

## 2a. Dua peran: Sutradara dan Editor

Setiap pekerjaan video dipecah: **Sutradara** (sesi yang bicara dengan Irfan: intake, pertanyaan, bedah, rencana, review buta, devil's advocate, Delivery Gate) dan **Editor** (subagen dengan konteks ramping: build, render, gate mekanis, laporan berbukti). Keduanya berbicara hanya lewat file di `handoff/` (BRIEF, PLAN, TASK, REPORT, REVIEW). Protokol, peta gerbang, dan prompt Editor: `references/roles.md`, `templates/roles/`.

**Wajib sebelum build, render, atau QC:** baca `references/orkestrasi.md`. Isinya: model mana mengerjakan apa (pekerja menulis kode, Sutradara menilai frame sendiri sebagai satu penilai), format TASK untuk pekerja, anggaran token, render cepat, dan gerbang disk.

## 2b. Guide: standar rasa, per urusan

Sebelum keputusan kreatif, buka `guide/README.md` lalu **hanya** folder urusan yang sedang dikerjakan (`visual/`, `teks/`, `gerak/`, `audio/`, `sfx/`, `hindari/`, `referensi/`). Guide = catatan rasa per urusan, pendamping kartu kiblat (gaya datang dari resep, mutu dari Lantai). Ragu → pilih yang hidup, lalu cek cepat; jangan main aman.

## 3. Satu standar untuk semua video

Tidak ada profil format. Motion ber-VO dan klip podcast/wawancara memakai aturan yang sama; yang berbeda hanya isinya. Suara sumber yang terukur bersih (podcast, wawancara) tidak diproses; levelnya hanya boleh naik dengan gain bersih, tidak pernah turun (Lantai E23); rekaman sendiri di kamar diukur dulu dan jedanya dibersihkan (`audio.md` §14.6, `gate/pause_clean.py`).

## 4. Cara kerja (gerbang dikunci)

Setiap gerbang lebih murah diperbaiki daripada gerbang sesudahnya. Render penuh adalah yang termahal, jadi datang paling akhir.

### Lima fase, satu subagen baru per fase

Gerbang di bawah dikelompokkan jadi lima fase. Batas fase = titik kunci, bukan jenis layer: teks, kamera, transisi, kurva, dan KT dikerjakan dalam fase yang sama karena posisi teks lahir dari komposisi dan arah kamera (Lantai A2).

| Fase | Gerbang | Dijalankan oleh | Selesai bila |
|---|---|---|---|
| 1 Pra-produksi: konsep, script, bedah referensi, storyboard, aset, footage, B-roll | 0–5 | sesi utama bersama Irfan (script dan storyboard butuh kata "final" darinya) | storyboard final; aset/footage/B-roll terpilih di `projects/<proyek>/aset/` dengan alasan per beat |
| 2 Spine suara: potong VO/suara asli, ekor kata, level | 6 | subagen baru | `audio_order.py lock suara` PASS |
| 3 Visual: susunan footage, teks, kamera, transisi, kurva, KT | 7–8 | subagen baru; bila dipecah, per adegan, bukan per layer | `teks.json` lulus `kt_check.py`, lapisan lego di cache, **audit visual semua potongan LULUS** (`frame_audit.py`, mata + kiblat + contoh gagal), baru `lock visual` + `objects.json` ditulis |
| 4 Audio: SFX dulu, musik paling akhir; disusun dari gerak visual yang sudah final | 9–10 | subagen baru | `lock sfx`, audit audio terhadap frame LULUS (`frame_audit.py --fase audio`), `lock musik` |
| 5 Finishing: mix, QA, render final, kirim | 11–12 | subagen baru untuk mix/QA/render; sesi utama menilai dan mengirim | `render.sh … lego` (video berfootage) atau `final` sekali; Delivery Gate PASS |

- Sesi utama = sutradara dan QC (`references/orkestrasi.md`). Fase 2–5 dijalankan otomatis sebagai subagen baru tanpa menunggu "lanjut?": konteks per fase pendek dan bagian depan prompt (file skill) tetap sama sehingga cache terjaga.
- Serah terima hanya lewat file: `handoff/FASE-<n>.md` dari `templates/handoff-fase.md`, `STATUS.md`, `contract.json`, `audio/ORDER.json`. Subagen tidak mewarisi percakapan; yang tidak tertulis di file dianggap tidak ada.
- Subagen fase berikut dibuat hanya setelah gerbang fase sebelumnya PASS. FAIL dikembalikan ke subagen fase itu dengan temuannya, tidak dikerjakan sesi utama.
- Revisi Irfan masuk ke fase paling hulu yang terdampak; fase sesudahnya diulang karena lock-nya basi (`audio_order.py check`).

| # | Gerbang | Baca cabang | Lolos jika |
|---|---|---|---|
| 0 | Muat konteks | — | §6 selesai; `earshot doctor` lulus di mesin kerja (tidak terpasang = lapor Irfan dulu, jangan lanjut) |
| 1 | Brief | `decision.md`, `palette.md`, `templates/gaya/README.md` | Brief Irfan disalin apa adanya; gaya dipilih dari `templates/gaya/` bila cocok (talking head: `minimal-premium` atau `editorial-bold`) dan menjadi rujukan visual utama; tambahan orkestrator ditandai `[orkestrator]` dan tidak boleh mempersempit sumber audio atau genre tanpa alasan dari Irfan. Tujuan, penonton, durasi, CTA, rasio terkunci. Default motion: 16:9 1920×1080, 30 fps native; footage: ikuti orientasi sumber |
| 2 | Script | `copywriting.md` | Irfan menyatakan final; disimpan sebagai file (klip: daftar potongan + timestamp sumber) |
| 3 | Bedah referensi | `analysis-qa.md` §2, `three-segment-gate.md` (gerbang DENGAR) | Metrik visual + tabel kalimat → adegan → peran kalimat + peta audio dari `earshot timeline --detail high` (label, event/dtk, kepadatan SFX) |
| 4 | Storyboard visual 100 % | `storyboard.md`, `direction.md`, `decision-guide.md`, `pacing-map.md` | Papan panel (frame + caption) di `projects/<proyek>/storyboard/`, `beats.json → metafora` terisi per beat (Lantai D19a/D19b), `scripts/storyboard/board.py` PASS, review papan + tabel kritik lolos, pindai `slop-catalog.md`; Irfan menyatakan final. Tanpa storyboard dari Irfan (klip): agent membuatnya sendiri dan lanjut, papan dikirim bersama hasil. Klip/talking head dengan gaya terpilih: rencana edit menu 3 opsi per beat (`templates/gaya/README.md`), Irfan memilih |
| 5 | TYPE-TEST + TRANSITION-SHEET | `storyboard.md` §6, `typography.md`, `camera-transition.md` | Still berdampingan dengan referensi setara |
| 6 | Suara dikunci | `audio.md` §14.0C, §14.0D | VO (setelah script final) atau audio sumber klip utuh, dipotong bersih dari kata sampah dan diam saat berpikir. `recut.py` wajib memakai `--source-words`; batas cut = frame eksak, energi rendah, guard 50 ms dari kata isi. Kunci dengan `audio_order.py lock suara … --words <ASR aktual> --source-words <take sumber> --voice-source <stem sumber> --cut-map <map.json>`; ini menjalankan `cut_check.py` + `pause_clean.py` dan menolak urutan/durasi kata yang berubah. Mode `musik`: musik dipilih dan dikunci lebih dulu, visual dipotong di ketukannya |
| 7 | Validasi satu adegan | `build.md` | Satu adegan bergerak lolos sebelum diterapkan ke semua; `scripts/remotion/curves.ts` disalin ke `src/lib/`, `juri/motion_lint.py` PASS (Lantai B13a) |
| 8 | Build semua adegan → visual dikunci | `build.md` | Komponen sama untuk semua adegan; render tanpa audio, `audio_order.py lock visual` |
| 9 | SFX dari event visual | `audio.md` §14.0C, §14.A–14.3, `three-segment-gate.md` (DENGAR) | Cue sheet dari `objects.json` (setiap objek/visual yang muncul atau bergerak di render terkunci) → 1 SFX per objek, satu peran satu file, KT per kata senyap (Lantai E24, Lantai E24); file dari `~/sfx/SFXIrfan` dulu (`guide/sfx/SFXIRFAN.md`), tiap cue `peran` + `alasan` + `dengar`; `lock sfx … --objects objects.json` menjalankan `gate/sfx_density.py` dan menolak palet terlarang—folder SFX bukan allowlist |
| 10 | Musik paling akhir | `audio.md` §14.0A, §14.0B | Dipilih sambil mendengar preview visual + SFX: kategori suasana dari tipe video (`pace_read.py`), `music_fit.py` (≥ 8 kandidat, ≥ 2 sumber), `audio/ears.py` untuk mengenali kandidat, tiap klip/babak track berbeda (`gate/music_batch.py`); `lock musik --peran --alasan --didengar` |
| 11 | Preview + QA | `delivery-gate.md` §0, `analysis-qa.md` §16 | **Di gerbang final, cek mekanis audio dijalankan lebih dulu** (penilaian visual sudah lulus sebelum audio disusun, Lantai F26): `audio_order.py check` mengulang cut/source guard, jeda, palet SFX, kepadatan, urutan, dan kebasian. `render.sh final` berhenti sebelum gerbang visual bila check ini gagal. Lanjutkan `audio_phone.py` + `earshot timeline`; still per beat + audio saja lulus, penilaian frame oleh Sutradara lulus (`templates/roles/pemeriksa-frame.md`), baru render penuh; devil's advocate audio `delivery-gate.md` §4 |
| 12 | Kirim | `delivery-gate.md` | Video + laporan Delivery Gate (setiap PASS berbukti) + daftar penyimpangan |

Beberapa video sekaligus: satu grup agen per video (Writing, SFX, Audio) + orkestrator QC; grup video berikutnya dibuat hanya setelah video ini lolos QC penuh. QC tiga lapis berurutan: visual saja → visual + SFX → visual + SFX + musik (`delivery-gate.md` §0).

Revisi dari Irfan (pesan apa pun yang mengeluhkan atau mengubah video yang sudah dirender): baca `revision-log.md` utuh dan ikuti §0, catat di `DECISIONS.md` (§21) dan RETRO, baru kerjakan; `scripts/juri/revisi_cek.py cek` dan `scripts/baseline_lock.py check` wajib lolos. Pekerjaan dalam rencana yang Irfan setujui dianggap disetujui; yang menunggu kata "final" hanya script dan storyboard.

## 5. Struktur

```
motion-graphic/
├── SKILL.md                 inti: lantai, kiblat, juri, lalu rujukan teknis (file ini)
├── LANTAI.md                satu-satunya daftar mutu yang selalu berlaku (sumber blok §0)
├── pustaka/                 PETA.md · kartu/ (anatomi 8 bagian per referensi) · RESEP-TEMPLATE.md · contoh-gagal/
├── scripts/juri/            render.sh (gerbang render) · resep_check.py · sandingkan.py · frame_audit.py (semua frame: fase visual, lalu fase audio) · teks_cek.py (penunjuk, bukan putusan)
├── guide/                   standar rasa per urusan (README → visual · teks · gerak · audio · sfx · hindari · referensi)
├── references/
│   ├── music-profiles.json  profil musik per kategori suasana (kalibrasi dari referensi Irfan)
│   ├── slop-catalog.md      tanda yang pernah Irfan tolak + cara mengeceknya
│   ├── delivery-gate.md     preview-dulu + laporan PASS/FAIL berbukti sebelum kirim
│   ├── direction.md · storyboard.md · copywriting.md · decision.md · decision-guide.md
│   ├── typography.md · camera-transition.md · motion-mechanics.md · smooth-motion.md · pacing-map.md
│   ├── audio.md · build.md · analysis-qa.md · revision-log.md · palette.md (+ palettes.json)
│   └── hybrid-motion-standard.md · three-segment-gate.md
├── templates/storyboard/    contoh beats.json + tokens.css + panel (mulai dari salinan ini)
├── templates/gaya/          template gaya terpilih di gerbang 1 (minimal-premium, editorial-bold) + format menu rencana edit
├── templates/roles/        prompt Editor, cara menilai frame (pemeriksa-frame, satu penilai), devils-advocate (mata luar sebelum final), pemeriksa-audio + kerangka folder handoff/ (roles.md)
├── engines/talking-head-reels/  engine EDL → reel 9:16 (Python + ffmpeg/libass), Mac + Linux
└── scripts/
    ├── storyboard/board.py      panel HTML → PNG + papan per babak + cek caption/teks layar/waktu + cues.json
    ├── gate/audio_order.py      urutan sound design: suara → visual → SFX → musik, lapisan basi = FAIL
    ├── audio/ears.py            telinga gabungan: demucs stem → earshot + ukuran → setuju/beda
    ├── gate/sfx_density.py      1 SFX per objek (--objects), satu peran satu file, anti-spam, KT senyap, palet terlarang
    ├── gate/voice_level.py      suara asli tidak diturunkan/ditekan, gain naik bersih ke ±−16 LUFS
    ├── juri/audio_bus_check.py  audio Remotion hanya lewat satu bus di root, tidak di dalam <Sequence>
    ├── juri/motion_lint.py      gerak preset, stagger rata, blur masuk (Lantai B13a)
    ├── remotion/curves.ts       kurva per gerak, dur(jarak), react(i), drift: disalin ke src/lib proyek
    ├── remotion/LightSweep.tsx  gaya G8 kilat cahaya pada huruf
    ├── lego/teks_plan.py        transkrip → teks.json (waktu + durasi blok KT)
    ├── lego/kt_check.py         gerak teks dari peran, variasi per 15 dtk, fade hanya sub (Lantai A9a)
    ├── lego/lapisan.py          render lapisan ber-alpha dengan cache (hanya yang berubah)
    ├── lego/compose.py          rakit footage + lapisan + audio sekali dengan ffmpeg (render.sh … lego)
    ├── gate/pause_clean.py      jeda bicara bersih: lantai stem suara + bunyi tajam di jeda
    ├── gate/cut_check.py        potongan suara: kata sampah, diam di dalam kata/kalimat, jeda antarkalimat
    ├── audio/recut.py           terapkan potongan ke suara + video wajah, peta waktu lama → baru (remap)
    ├── gate/voice_fidelity.py   alat ukur: suara sumber bersih tidak rusak (udara > 9 kHz, LRA)
    ├── gate/caption_lines.py    caption ≤ 2 baris, tidak terpotong tepi
    ├── audio/pace_read.py       tempo video → kategori suasana + rentang bpm musik
    ├── audio/music_fit.py       peringkat musik terhadap kategori + benturan dengan suara
    ├── baseline_lock.py · bedah-kamera.py · palette_check.py · audio_qa.py
    └── audio/                   kit QA audio (lihat audio/README.md)
```
Sumber kebenaran: repo `Siirfannih/skill-development` (`claude/motion-graphic/`).

## 6. Muat konteks proyek (gerbang 0)
1. Jika `projects/<proyek>/` ada, baca `AUTHORITY.md`, `ART-DIRECTION.md`, `DECISIONS.md` lebih dulu (Lantai F28a).
2. Baca `PROJECT_STATE.md` atau `00_MULAI-DI-SINI.md` proyek aktif dan skill VO proyek bila ada.
3. Katalogkan aset/paket dari Irfan (SFX, kit, proyek lama) sebelum membuat aset baru.

## 7. Kapan membaca cabang

| Kondisi | Cabang |
|---|---|
| Keputusan rasa (visual, teks, gerak, audio, SFX) | `guide/<urusan>/GUIDE.md` |
| Mulai pekerjaan video: siapa mengerjakan apa | `roles.md` |
| Memilih gaya edit, rencana menu per beat | `templates/gaya/` |
| Memilih, aturan bertabrakan, ragu bertanya | `decision.md` |
| Script, teks layar | `copywriting.md` |
| Tokoh, metafora, family, palet | `direction.md`, `palette.md` |
| Storyboard, spec beat, mode teks per beat | `storyboard.md`, `decision-guide.md`, `pacing-map.md` |
| Gaya teks, easing, animasi teks | `typography.md`, `smooth-motion.md` |
| Kamera, transisi, cutout | `camera-transition.md`, `motion-mechanics.md` |
| VO, SFX, musik, QA audio | `audio.md` (mulai §14.0A kategori suasana) + gerbang DENGAR `three-segment-gate.md` |
| Build (Remotion + rakit lego; ikuti juga skill `remotion-best-practices` dan `scripts/juri/render.sh`) | `build.md` |
| After Effects, hanya bila Irfan meminta atau adegannya membutuhkan | `tools/AFTER-EFFECTS.md` (akar repo) |
| Bedah referensi, QA render | `analysis-qa.md`, `delivery-gate.md` |
| Revisi Irfan, kunci adegan | `revision-log.md` |
