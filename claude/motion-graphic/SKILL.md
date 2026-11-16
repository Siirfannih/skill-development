---
name: motion-graphic
description: "Directs and builds Irfan's motion graphic videos (Jadisatu, Tuntunly, siirfan content) from brief to render — persona, gated workflow, core rules, an always-on quality floor (LANTAI), a reference library with one chosen direction per video (pustaka: PETA, anatomy cards, RESEP), a render gate and reviewer scripts (juri), plus branch files for storyboard, copywriting, typography, camera, audio, Remotion build, and QA. Use for any video or motion request from Irfan, even a rough one: bikin video, launch video, reel, promo, motion, animasi teks, storyboard, naskah VO, revisi video, bedah referensi, After Effects, or when he sends a reference video. Also for podcast/interview clip edits with motion overlays and captions."
---

# Motion Graphic (Irfan)

Skill ini menaikkan mutu video dari prompt Irfan. Ia bukan template. Tiga hal yang selalu dikerjakan, berurutan:

1. **Lantai**: mutu yang berlaku di semua video, apa pun gayanya (di bawah ini, lengkap).
2. **Kiblat**: tiap video punya SATU arah gaya, dipilih dari prompt, video referensi yang Irfan kirim, atau `pustaka/PETA.md`, lalu ditulis sebagai `RESEP.md`.
3. **Juri**: still hasil disandingkan dengan kiblat sebelum render penuh.

Bila bagian lain di skill ini bertentangan dengan Lantai atau resep, Lantai dan resep yang menang.

## 0. Lantai (selalu berlaku)

<!-- LANTAI:mulai (disalin dari LANTAI.md oleh tools/sync_lantai.py; jangan diedit di sini) -->
Lantai menentukan **mutu**; kiblat (kartu di `pustaka/`) menentukan **gaya**. Bila kartu kiblat bertentangan dengan lantai, lantai menang dan penyesuaiannya ditulis di `RESEP.md`. Lantai tidak berisi font, warna, atau layout tertentu: itu urusan kiblat.

Setiap butir bisa dicek dari still atau angka. Butir baru hanya masuk bila berlaku untuk semua gaya dan sudah muncul di dua video berbeda (lihat `pustaka/README.md` §Tumbuh).

### A. Teks di layar
1. **Semua ucapan tampil sebagai teks, dalam SATU lapisan tipografi kinetik bergaya editorial.** Tidak ada baris subtitle terpisah di pita bawah seperti subtitle film (Irfan 2 Nov, 11 Nov).
2. **Posisi teks lahir dari komposisi tiap shot**: dekat subjek, di ruang kosong, atau menempel objek yang dirujuk. Gagal bila 3 tampilan berturut-turut duduk di pita yang sama tanpa alasan komposisi. Teks menempel pada subjeknya: jarak teks ke subjek yang dirujuk paling jauh ±8 % tinggi frame, dan tidak lebih dekat ke tepi frame daripada ke subjek (Irfan oke 15 Nov, dari uji rekonstruksi 18 + Builder Trap).
3. **Kata tidak tampil dua kali.** Kata yang sudah jadi penekanan tidak diulang di lapisan atau tempat lain pada saat yang sama.
4. **Maksimal 2 baris per tampil, 1–3 kata per tampil, blok seimbang** (baris terpendek ≥ 85 % baris terpanjang; bukan satu kalimat dalam 2 baris seperti headline berita), tidak terpotong tepi, tidak ada kata yatim. Tumpuk kata (1 kata per baris) boleh. Saat pembicara bertanya, tanda tanya tampil (Irfan 9 Nov; Irfan oke 15 Nov, dari builder-trap-r2 v2 + jensen-pain-suffering).
5. **Teks hanya dari ucapan.** Tidak menambah kalimat atau angka yang tidak diucapkan.
6. **Satu baris satu ukuran.** Kata yang dibesarkan pindah ke barisnya sendiri. Dua gaya huruf tidak sama kuat dalam satu frasa (serif tidak seukuran dan sebobot dengan kata bold di sebelahnya) (Irfan 6 Nov).
7. **Huruf menyatu dengan frame-nya.** Kontras ≥ 4,5 : 1, ukurannya berhubungan dengan subjek di frame, tidak menyentuh tepi. Jenis huruf ikut kiblat; serif tidak dilarang. Font yang dipakai termuat dari file (`fonts/README.md`), tidak jatuh ke font cadangan sistem (Irfan 12 Nov). Contoh gagal: `pustaka/contoh-gagal/01-serif-pucat-raksasa.jpg` (Irfan 11 Nov).
8. **Terbaca berurutan dan cukup lama**: satu arah baca, tiap frasa tampil sampai selesai diucapkan, terbaca di layar HP (Irfan 9 Nov).
9. **Kotak di belakang teks hanya bila kontras gagal**, bukan hiasan; narasi kinetik tanpa kotak/shape di belakangnya (Irfan 6 Nov, 15 Nov).

### B. Kamera dan gerak
10. **Frame tidak datar.** Setiap shot lebih dari 2 detik punya gerak kamera yang disengaja (push/zoom pelan untuk fokus, pan, atau mengikuti objek). Pengecualian hanya bila kartu kiblat memang berkamera diam, dan itu ditulis di `RESEP.md` (Irfan 9 Nov).
11. **Kamera mengikuti SATU objek fokus per beat**, dari objek itu muncul sampai selesai, tidak kembali ke posisi awal di tengah jalan (Irfan 9 Nov).
12. **Elemen diam di dunianya, kamera yang bergerak.** Saat kamera zoom, ia melewati teks dan objek; teks tidak ikut bergeser sendiri (Irfan 25 Okt, 9 Nov).
13. **Tidak ada pergantian yang mendadak atau malas**: yang masuk datang dari suatu arah atau berubah bentuk, gerak cepat memakai motion blur, easing tidak linear. Overlay/gradien masuk dan keluar dengan gerak (Irfan 9 Nov).
13a. **Gerak dirancang per gerak, bukan preset.** Kurva dipilih menurut apa geraknya dari `scripts/remotion/curves.ts` (`land` masuk dari luar frame, `heavy` objek besar dan kamera, `whip` ganti keadaan, `reveal` teks dari mask, `leave` keluar, `drift` hold), bukan `Easing.ease`/`inOut(cubic)`. Durasi dihitung dari jarak dan bobot (`dur(px, fps, bobot)`), bukan kebiasaan 0,4–0,6 dtk. Satu gerak utama diikuti reaksi berjeda tidak rata (`react(i)`: 0, 67, 150, 250, 367, 500 ms), bukan stagger i × konstanta. Gerak keluar ±0,65× masuk dan makin cepat. Hold > 1 dtk tetap hidup (drift/napas kamera) kecuali diam disengaja. Tidak ada fade-up atau blur-in sebagai cara masuk bawaan; blur hanya untuk gerak cepat. Satu transisi khas per video. `scripts/juri/motion_lint.py` PASS (Irfan 16 Nov, metode dari motion-kit MIT).

### C. Komposisi
14. **Satu fokus per momen.** Mata tahu harus melihat ke mana.
15. **Teks, objek, dan visual satu kesatuan**: tidak tumpang tindih, tidak bertabrakan, tidak berjauhan seperti bagian terpisah (Irfan 9 Nov).
16. **Tepi frame bersih.** Tidak ada objek penting di zona tepi kecuali karena gerak kamera; margin aman 5 % (Irfan 11 Nov).
17. **Seimbang dan hierarkinya terbaca, dinilai global per frame**, bukan per ukuran objek: posisi teks, objek, KT, bingkai, dan b-roll dilihat bersama di zoom 25 %, 50 %, dan 100 %. Urutan baca di ukuran normal jelas: latar utama (#primary) → teks/objek utama → pengisi (objek pinggir, teks kecil). Satu sisi berisi teks + visual sementara sisi lain kosong = gagal; perbaikannya pindah posisi (mis. kunci ke kanan bawah, berseberangan dengan kepala di kiri atas). Dicek pada still **sebelum** render penuh (`scripts/juri/balance_check.py`, lembar 25/50 %) (Irfan 2 Nov, 15 Nov).
18. **Rapi**: garis berakhir di tepi bentuknya, jarak antar-elemen sama, stroke dan radius konsisten (Irfan 9 Nov).

### D. Isi visual
19. **Visual menggambarkan makna ucapan**, bukan bentuk atau hiasan. Penonton harus lebih mudah paham karena visual itu (Irfan 9 Nov, 11 Nov).
19a. **Metafora dulu, baru gambar.** Sebelum panel digambar, tiap kalimat VO diperas di `beats.json → metafora`: makna inti (apa yang harus dipahami penonton), emosi, aksi (kata kerja: membuka, menyambung, bocor, menekan, menumpuk), **satu** metafora, 3–6 objek kunci, dan urutan rakitnya. Teks VO tidak disalin ke gambar. `board.py` FAIL bila kosong (Irfan 16 Nov, metode dari gbro-collage-broll MIT).
19b. **Situasi digambar dengan bentuk yang menjelaskannya** (`metafora.bentuk`): isi atau cara kerja benda → exploded view atau potongan (lapis terurai + garis label); perilaku/perasaan manusia → piktogram/stick figure, bukan produk; sebab-akibat → satu elemen menggerakkan elemen lain; angka → grafik; perjalanan/lokasi → peta rute; aplikasi → UI asli (D20). Bentuk dipilih dari `aksi`, bukan dari gaya yang sedang disukai (Irfan 16 Nov, dari claude-animation-skills MIT).
20. **Tampilan platform dan logo adalah yang asli** (Threads, Instagram, ChatGPT, GitHub), dibangun ulang sebagai animasi, bukan UI karangan. Ikon memakai ikon jadi (Irfan 26 Okt, 9 Nov, 11 Nov).
21. **Yang sedang bicara tampil di frame**, kecuali tertutup visual layar penuh (Irfan 9 Nov).
22. **Tidak ada placeholder** di render.

### E. Audio
23. **Suara tidak dipercepat, jedanya bersih, dan tak ada fonem yang digunting.** Tempo dirapatkan dengan memotong jeda mati (Irfan 6 Nov, 8 Nov). Kata sampah (eee, emm, tuh, …) dan diam saat berpikir dibuang di tahap potong, termasuk diam yang tertelan ke durasi kata. Rencana cut divalidasi terhadap transkrip **take sumber**: kata isi tidak boleh teriris > 20 ms, tiap batas punya guard 50 ms, durasi kata hasil ≥ 85 %, dan urutan ASR aktual tetap sama; jumlah entri JSON/remap bukan bukti suara masih utuh. `audio_order.py lock suara --words … --source-words … --cut-map … --voice-source …` dan `cut_check.py` wajib PASS sebelum suara dikunci (Irfan 15–16 Nov; gagal: builder-trap-r2 v5 ronde 1–2). Saat pembicara berhenti atau berpikir, tidak terdengar dengung kamar, piring, atau klik: jeda tidak diisi room tone kotor, stem suara di jeda ≤ −50 dBFS (`scripts/gate/pause_clean.py`) (Irfan 13 Nov). **Level suara asli tidak pernah diturunkan, di-loudness-kan, atau di-limit**: yang boleh hanya peredam noise, lalu gain naik bersih ke ±−16 LUFS bila sumbernya terlalu pelan atau kalah dari musik/SFX; musik dan SFX yang menyesuaikan ke suara. `gate/voice_level.py suara_sumber.wav suara_hasil.wav` PASS (Irfan 16 Nov; gagal: loudness global −17 dB "mendem", jensen-pain-suffering v3 −22,8 LUFS).
24. **1 SFX untuk 1 objek/visual penting, satu peran satu bunyi, dengan jarak.** Setiap objek atau visual yang muncul/bergerak (kartu, ikon, transisi, gerak kamera, kata slam/penekanan) mendapat satu SFX sesuai peruntukannya, puncaknya di frame objek itu. Item barisan yang masuk terpisah (> 2 frame) masing-masing berbunyi; yang masuk serentak (≤ 2 frame) dihitung satu event. Kata KT/subtitle yang muncul kata per kata **tidak** berbunyi: itu sumber spam lama. Satu peran = satu file sepanjang video, dan satu file = satu peran. Tidak ada batas jumlah, batasnya spam: dua bunyi ≥ 100 ms, whoosh ≥ 1 dtk, maksimal 5 cue dalam 2 dtk. Gain −4 sampai −10 dB. File dari `~/sfx/SFXIrfan` dulu (kandidat, bukan allowlist) dan didengar sebelum dipakai; palet terlarang: kayu/thock/felt, koin/logam, kartun/langkah kaki, 8-bit, noise/sinus sintetis, rope-creak. `gate/sfx_density.py render.mp4 cues.json --objects objects.json` PASS (Irfan 1, 8, 9, 13, 16 Nov; gagal: 14 Nov aturan "1 SFX per objek" terhapus saat koreksi "jangan bunyi per kata").
25. **Musik mengikuti tempo dan suasana video**, tidak bolong, tidak melawan emosi ucapan (Irfan 6, 8 Nov).

### F. Cara kerja
26. **Urutan render: still per beat → draft skala 0,5 → semua frame diaudit → render penuh.** Semua lewat `scripts/juri/render.sh`; render penuh ditolak sebelum resep dan still lulus. Satu render penuh 1080p ±8–18 menit di PC server, jadi ia langkah terakhir. **Audit tanpa sampling sebelum MP4**: semua frame dirender sebagai gambar (`render.sh frames`), dipecah per ≤ 10 dtk, tiap detik (30 frame) diperiksa agen lain (subagen/model lain, paralel per potongan) untuk visual, audio/SFX, transisi, dan jarak antar-frame (`scripts/juri/frame_audit.py`); render penuh ditolak sampai semua potongan `PUTUSAN: LULUS` (Irfan 15 Nov; gagal: builder-trap-r2 v3 patahan di titik potong suara dan Bali Digifest, keduanya lolos cek sampel tiap 8–15 frame).
27. **Revisi = diff.** Adegan yang sudah disetujui tidak disentuh; yang dirender ulang hanya rentang yang berubah.
28. **Tidak yakin = tanya, jangan menebak.**
29. **Video baru dikirim setelah juri lulus** (`pustaka/README.md` §Juri), bersama lembar sanding still vs kiblat.
<!-- LANTAI:selesai -->

## 0a. Kiblat dan resep (sebelum build)

1. Baca `pustaka/PETA.md` (satu baris per referensi; semuanya standar kualitas Irfan, target yang harus dicapai).
2. Tentukan kiblat:
   - Irfan mengirim video referensi di sesi → itu kiblatnya; bedah ke kartu baru (`pustaka/README.md` §Referensi baru).
   - Prompt sudah jelas → pilih satu kartu yang cocok dan langsung jalan.
   - Prompt kabur ("gaya premium") → maksimal 3 pertanyaan dengan pilihan dari peta, lalu pilih.
3. Buka **hanya** kartu kiblat itu (`pustaka/kartu/…`). Jangan membuka semua kartu.
4. Tulis `projects/<proyek>/RESEP.md` dari `pustaka/RESEP-TEMPLATE.md`: 8 bagian anatomi. **Pengikat** (warna & tekstur, teks, ritme) dari satu sumber; **teknik** (b-roll, motion graphic, kamera & transisi, SFX, musik) boleh dipinjam kartu lain dan dikenakan pengikat kiblat. Cek: `python3 scripts/juri/resep_check.py projects/<proyek>/RESEP.md`.

## 0b. Render dan juri

- Semua render lewat `scripts/juri/render.sh <proyek> still|draft|frames|final …`. Render penuh ditolak sampai resep lulus, semua still terbaru, lembar sanding dibuat, draft gerak terbaru, audit frame per frame semua potongan LULUS (`frames` → `frame_audit.py` → agen pemeriksa per ≤ 10 dtk), dan `qc/JURI.md` berakhir `PUTUSAN: LULUS` dengan bukti tiap catatan Irfan aktif.
- Juri pada still: `scripts/juri/teks_cek.py` (pita bawah, kata ganda, tepi), `scripts/juri/balance_check.py` (keseimbangan global per frame + lembar 25/50 %, Lantai C17), `scripts/juri/sandingkan.py` (still kita vs frame kiblat), lalu nilai tiap butir "Cek kemiripan" kartu kiblat dan Lantai A–D. Rinci: `pustaka/README.md` §Juri. Bandingkan juga dengan `pustaka/contoh-gagal/`.
- Revisi: perbarui still adegan itu saja dan render rentang framenya, bukan seluruh video.
- Pelajaran dari Irfan disimpan menurut cakupannya (`pustaka/README.md` §Tumbuh).

---

**Bagian 1–8 di bawah adalah rujukan teknis** (alur kerja rinci, alat audio, indeks aturan lama). Dibaca saat dibutuhkan; kalah dari Lantai dan resep bila bertentangan. Menggantikan `motion-director` v3, `motion-graphic-playbook`, dan `irfan-motion-director`.

## 1. Persona

Kamu sutradara motion sekaligus motion designer senior untuk Irfan, solo founder Jadisatu berlatar desain grafis. Ia butuh partner yang paham tujuan akhir, mengukur sendiri sebelum ditunjukkan, dan menyerahkan hasil yang langsung bisa dipakai. Cara berkomunikasi umum: `working-with-irfan`; untuk urusan video, file ini yang menang.

## 2. Titik start: pengalaman terbukti + arah dari brief

Skill ini adalah **titik start, bukan titik nol**: pengalaman yang sudah terbukti (urutan kerja, alat, standar kualitas, dan kesalahan yang pernah terjadi) dikumpulkan supaya setiap video langsung mulai dari langkah ke-10. Proses kreatif yang tidak perlu dan kesalahan berulang dihilangkan; gerbang dan alat ukur menjaga agar langkah itu tidak terulang. **Arah** tiap video (mood, palet, gaya grafik, gerak) tetap datang dari brief, referensi yang Irfan kirim di sesi, dan `projects/<proyek>/` (Irfan 8 Nov).

`canvas-skill-library` = **data referensi**, bukan aturan. Dibuka hanya bila brief butuh contoh gerak; kalah dari skill ini bila bertentangan (Irfan 6 Nov). Skill pendamping `external/anti-slop` dan `awesome-design-md` juga filter/acuan prinsip, bukan identitas merek.

**Prinsip:** cerita dulu, baru gaya · referensi adalah standar yang harus dicapai (teknik yang tidak cocok diganti yang setara, bukan yang lebih kasar) · setiap potongan jatuh di ketukan (frasa, beat musik, puncak gerak) · lihat sendiri, ukur sendiri sebelum Irfan menunjuk · satu fokus per frame, efek tanpa alasan dihapus.

**Urutan menang:** instruksi langsung Irfan di sesi → Lantai (§0) → `projects/<proyek>/` termasuk `RESEP.md` dan kartu kiblatnya → file ini → cabang `references/` → `external/` → canvas-skill-library. `templates/gaya/` adalah turunan kartu 18 (minimal-premium) dan satu gaya klien (editorial-bold): dipakai hanya bila resep memilihnya.

## 2a. Dua peran: Sutradara dan Editor

Setiap pekerjaan video dipecah: **Sutradara** (sesi yang bicara dengan Irfan: intake, pertanyaan, bedah, rencana, review buta, devil's advocate, Delivery Gate) dan **Editor** (subagen dengan konteks ramping: build, render, gate mekanis, laporan berbukti). Keduanya berbicara hanya lewat file di `handoff/` (BRIEF, PLAN, TASK, REPORT, REVIEW). Protokol, peta gerbang, dan prompt Editor: `references/roles.md`, `templates/roles/` (Irfan 11 Nov).

**Wajib sebelum build, render, atau QC:** baca `references/orkestrasi.md`. Isinya: model mana mengerjakan apa (Codex menulis kode, Gemini + ChatGPT memeriksa per detik), format TASK untuk pekerja, anggaran token, render cepat, dan gerbang disk.

## 2b. Guide: standar rasa, per urusan

Sebelum keputusan kreatif, buka `guide/README.md` lalu **hanya** folder urusan yang sedang dikerjakan (`visual/`, `teks/`, `gerak/`, `audio/`, `sfx/`, `hindari/`, `referensi/`). Guide = catatan rasa per urusan, pendamping kartu kiblat (gaya datang dari resep, mutu dari Lantai). Ragu → pilih yang hidup, lalu cek cepat; jangan main aman (Irfan 6 Nov).

## 3. Satu standar untuk semua video

Tidak ada profil format. Motion ber-VO dan klip podcast/wawancara memakai aturan yang sama; yang berbeda hanya isinya. Suara sumber yang terukur bersih (podcast, wawancara) tidak diproses; levelnya hanya boleh naik dengan gain bersih, tidak pernah turun (Lantai E23); rekaman sendiri di kamar diukur dulu dan jedanya dibersihkan (`audio.md` §14.6, `gate/pause_clean.py`). Profil "Format A/B" turunan penilaian klip DOAC 6 Nov dihapus: proyek itu belum selesai, jadi bukan standar (Irfan 8 Nov).

## 4. Cara kerja (gerbang dikunci)

Setiap gerbang lebih murah diperbaiki daripada gerbang sesudahnya. Render penuh adalah yang termahal, jadi datang paling akhir.

### Lima fase, satu subagen baru per fase (Irfan 16 Nov)

Gerbang di bawah dikelompokkan jadi lima fase. Batas fase = titik kunci, bukan jenis layer: teks, kamera, transisi, kurva, dan KT dikerjakan dalam fase yang sama karena posisi teks lahir dari komposisi dan arah kamera (Lantai A2).

| Fase | Gerbang | Dijalankan oleh | Selesai bila |
|---|---|---|---|
| 1 Pra-produksi: konsep, script, bedah referensi, storyboard, aset, footage, B-roll | 0–5 | sesi utama bersama Irfan (script dan storyboard butuh kata "final" darinya) | storyboard final; aset/footage/B-roll terpilih di `projects/<proyek>/aset/` dengan alasan per beat |
| 2 Spine suara: potong VO/suara asli, ekor kata, level | 6 | subagen baru | `audio_order.py lock suara` PASS |
| 3 Visual: susunan footage, teks, kamera, transisi, kurva, KT | 7–8 | subagen baru; bila dipecah, per adegan, bukan per layer | `lock visual` + `objects.json` ditulis |
| 4 Audio: SFX dulu, musik paling akhir | 9–10 | subagen baru | `lock sfx`, `lock musik` |
| 5 Finishing: mix, QA, render final, kirim | 11–12 | subagen baru untuk mix/QA/render; sesi utama menilai dan mengirim | Delivery Gate PASS |

- Sesi utama = sutradara dan QC (`references/orkestrasi.md`). Fase 2–5 dijalankan otomatis sebagai subagen baru tanpa menunggu "lanjut?": konteks per fase pendek dan bagian depan prompt (file skill) tetap sama sehingga cache terjaga.
- Serah terima hanya lewat file: `handoff/FASE-<n>.md` dari `templates/handoff-fase.md`, `STATUS.md`, `contract.json`, `audio/ORDER.json`. Subagen tidak mewarisi percakapan; yang tidak tertulis di file dianggap tidak ada.
- Subagen fase berikut dibuat hanya setelah gerbang fase sebelumnya PASS. FAIL dikembalikan ke subagen fase itu dengan temuannya, tidak dikerjakan sesi utama.
- Revisi Irfan masuk ke fase paling hulu yang terdampak; fase sesudahnya diulang karena lock-nya basi (`audio_order.py check`).

| # | Gerbang | Baca cabang | Lolos jika |
|---|---|---|---|
| 0 | Muat konteks | — | §6 selesai; `earshot doctor` lulus di mesin kerja (tidak terpasang = lapor Irfan dulu, jangan lanjut) |
| 1 | Brief | `decision.md`, `palette.md`, `templates/gaya/README.md` | Brief Irfan disalin apa adanya; gaya dipilih dari `templates/gaya/` bila cocok (talking head: `minimal-premium` atau `editorial-bold`) dan menjadi rujukan visual utama; tambahan orkestrator ditandai `[orkestrator]` dan tidak boleh mempersempit sumber audio atau genre tanpa alasan dari Irfan (gagal: V5 8 Nov). Tujuan, penonton, durasi, CTA, rasio terkunci. Default motion: 16:9 1920×1080, 30 fps native; footage: ikuti orientasi sumber |
| 2 | Script | `copywriting.md` | Irfan menyatakan final; disimpan sebagai file (klip: daftar potongan + timestamp sumber) |
| 3 | Bedah referensi | `analysis-qa.md` §2, `three-segment-gate.md` (gerbang DENGAR) | Metrik visual + tabel kalimat → adegan → peran kalimat + peta audio dari `earshot timeline --detail high` (label, event/dtk, kepadatan SFX) |
| 4 | Storyboard visual 100 % | `storyboard.md`, `direction.md`, `decision-guide.md`, `pacing-map.md` | Papan panel (frame + caption) di `projects/<proyek>/storyboard/`, `beats.json → metafora` terisi per beat (Lantai D19a/D19b), `scripts/storyboard/board.py` PASS, review papan + tabel kritik lolos, pindai `slop-catalog.md`; Irfan menyatakan final. Tanpa storyboard dari Irfan (klip): agent membuatnya sendiri dan lanjut, papan dikirim bersama hasil (Irfan 8 Nov). Klip/talking head dengan gaya terpilih: rencana edit menu 3 opsi per beat (`templates/gaya/README.md`), Irfan memilih (Irfan 11 Nov) |
| 5 | TYPE-TEST + TRANSITION-SHEET | `storyboard.md` §6, `typography.md`, `camera-transition.md` | Still berdampingan dengan referensi setara |
| 6 | Suara dikunci | `audio.md` §14.0C, §14.0D | VO (setelah script final) atau audio sumber klip utuh, dipotong bersih dari kata sampah dan diam saat berpikir. `recut.py` wajib memakai `--source-words`; batas cut = frame eksak, energi rendah, guard 50 ms dari kata isi. Kunci dengan `audio_order.py lock suara … --words <ASR aktual> --source-words <take sumber> --voice-source <stem sumber> --cut-map <map.json>`; ini menjalankan `cut_check.py` + `pause_clean.py` dan menolak urutan/durasi kata yang berubah. Mode `musik`: musik dipilih dan dikunci lebih dulu, visual dipotong di ketukannya (Irfan 15–16 Nov) |
| 7 | Validasi satu adegan | `build.md` | Satu adegan bergerak lolos sebelum diterapkan ke semua; `scripts/remotion/curves.ts` disalin ke `src/lib/`, `juri/motion_lint.py` PASS (Lantai B13a) |
| 8 | Build semua adegan → visual dikunci | `build.md` | Komponen sama untuk semua adegan; render tanpa audio, `audio_order.py lock visual` |
| 9 | SFX dari event visual | `audio.md` §14.0C, §14.A–14.3, `three-segment-gate.md` (DENGAR) | Cue sheet dari `objects.json` (setiap objek/visual yang muncul atau bergerak di render terkunci) → 1 SFX per objek, satu peran satu file, KT per kata senyap (aturan 43, Lantai E24); file dari `~/sfx/SFXIrfan` dulu (`guide/sfx/SFXIRFAN.md`), tiap cue `peran` + `alasan` + `dengar`; `lock sfx … --objects objects.json` menjalankan `gate/sfx_density.py` dan menolak palet terlarang—folder SFX bukan allowlist |
| 10 | Musik paling akhir | `audio.md` §14.0A, §14.0B | Dipilih sambil mendengar preview visual + SFX: kategori suasana dari tipe video (`pace_read.py`), `music_fit.py` (≥ 8 kandidat, ≥ 2 sumber), `audio/ears.py` untuk mengenali kandidat, tiap klip/babak track berbeda (`gate/music_batch.py`); `lock musik --peran --alasan --didengar` |
| 11 | Preview + QA | `delivery-gate.md` §0, `analysis-qa.md` §16 | **Audio diperiksa lebih dulu** (kesalahan V5 mayoritas audio, Irfan 8 Nov): `audio_order.py check` mengulang cut/source guard, jeda, palet SFX, kepadatan, urutan, dan kebasian. `render.sh final` berhenti sebelum gerbang visual bila check ini gagal. Lanjutkan `audio_phone.py` + `earshot timeline`; still per beat + audio saja lulus, baru render penuh; ≥ 3 putaran kritik, skor ≥ 8; devil's advocate audio `delivery-gate.md` §4 |
| 12 | Kirim | `delivery-gate.md` | Video + laporan Delivery Gate (setiap PASS berbukti) + daftar penyimpangan |

Beberapa video sekaligus: satu grup agen per video (Writing, SFX, Audio) + orkestrator QC; grup video berikutnya dibuat hanya setelah video ini lolos QC penuh. QC tiga lapis berurutan: visual saja → visual + SFX → visual + SFX + musik (`delivery-gate.md` §0) (Irfan 9 Nov, Behindwork).

Revisi dari Irfan: baca `revision-log.md`, catat di `DECISIONS.md` (§21) dan RETRO, baru kerjakan; `scripts/baseline_lock.py check` wajib lolos. Pekerjaan dalam rencana yang Irfan setujui dianggap disetujui; yang menunggu kata "final" hanya script dan storyboard.

## 5. Struktur

```
motion-graphic/
├── SKILL.md                 inti: lantai, kiblat, juri, lalu rujukan teknis (file ini)
├── LANTAI.md                mutu yang selalu berlaku (sumber blok §0)
├── pustaka/                 PETA.md · kartu/ (anatomi 8 bagian per referensi) · RESEP-TEMPLATE.md · contoh-gagal/
├── scripts/juri/            render.sh (gerbang render) · resep_check.py · teks_cek.py · balance_check.py · sandingkan.py · frame_audit.py (semua frame, per detik)
├── guide/                   standar rasa per urusan (README → visual · teks · gerak · audio · sfx · hindari · referensi)
├── references/
│   ├── core-rules.md        teks penuh aturan inti 1–50
│   ├── music-profiles.json  profil musik per kategori suasana (kalibrasi dari referensi Irfan)
│   ├── slop-catalog.md      tanda yang pernah Irfan tolak + cara mengeceknya
│   ├── delivery-gate.md     preview-dulu + laporan PASS/FAIL berbukti sebelum kirim
│   ├── direction.md · storyboard.md · copywriting.md · decision.md · decision-guide.md
│   ├── typography.md · camera-transition.md · motion-mechanics.md · smooth-motion.md · pacing-map.md
│   ├── audio.md · build.md · analysis-qa.md · revision-log.md · palette.md (+ palettes.json)
│   └── hybrid-motion-standard.md · three-segment-gate.md
├── templates/storyboard/    contoh beats.json + tokens.css + panel (mulai dari salinan ini)
├── templates/gaya/          template gaya terpilih di gerbang 1 (minimal-premium, editorial-bold) + format menu rencana edit
├── templates/roles/        prompt Editor + kerangka folder handoff/ (dua peran, roles.md)
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
1. Jika `projects/<proyek>/` ada, baca `AUTHORITY.md`, `ART-DIRECTION.md`, `DECISIONS.md` lebih dulu (aturan 17).
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
| Build (catatan: `build.md` masih berisi alur After Effects lama; untuk Remotion ikuti skill `remotion-best-practices` + `scripts/juri/render.sh`) | `build.md` |
| Bedah referensi, QA render | `analysis-qa.md`, `delivery-gate.md` |
| Revisi Irfan, kunci adegan | `revision-log.md` |

## 8. Indeks aturan inti (teks penuh: `references/core-rules.md`)

Tiga tingkat, mengikuti pola anti-slop: **Hard Gate** mutlak; **Purpose-Gate** teknik boleh asal alasannya ditulis di tabel beat; **Quality Lock** konsistensi.

**Hard Gate**
- 2 Teks layar hanya dari VO/ucapan · 4, 19 UI = UI asli produk · 22 tidak ada placeholder storyboard di render
- 10 Tidak ada generate berbayar sebelum gerbangnya; biaya disebut dulu · 11 build gagal bila font hilang; proyek AE terbuka tidak ditimpa
- 12 Tidak ada video ke Irfan sebelum verdict SHIP + Delivery Gate · 13 tidak yakin = tanya, jangan menebak
- 14 Adegan disetujui tidak disentuh · 17 baca folder proyek sebelum build · 18 revisi = diff, bukan tulis ulang
- 33 VO tidak dipercepat, jeda diukur · 38 Modul 1–5 standar mix · 47 satu dunia + kamera AE + teks menyatu · 48 visual menggambarkan ucapan · 49 yang bicara tampil · 50 logo asli + ikon jadi, rapi
- **43 SFX = 1 objek/visual penting = 1 SFX, satu peran satu bunyi, KT per kata senyap, jarak anti-spam, file didengar** · 44 semua ucapan tampil sebagai SATU lapisan teks kinetik (bukan subtitle pita bawah, kata tidak diulang), ≤ 2 baris, tidak terpotong · 45 audio ikut tempo video: kategori dari `pace_read.py`, musik lulus `music_fit.py`

**Purpose-Gate**
- 6 Kotak di belakang teks hanya bila kontras gagal · 7 setiap efek punya alasan · 24 efek karena fungsi (negative = transisi/before-after)
- 40 Contoh Irfan berlaku untuk frame yang ia sebut · 28 panduan AI lain diterapkan selektif

**Quality Lock**
- 1 Satu fokus per momen · 46 teks berurutan, waktu baca cukup, tanpa tabrakan · 20 teks dan visual bergiliran · 31 visual mengikuti subjek kalimat · 3 tokoh/dunia konsisten
- 5 Nol crossfade; overlay masuk/keluar bergerak · 42 transisi = logika ruang · 26 kamera = alat fokus, frame tidak datar: tiap shot > 2 dtk bergerak, ikuti satu objek per beat (Lantai B) · 29 kamera patuh VO · 9 motion blur di gerak cepat
- 8 Keterbacaan HP · 15 tidak ada biru di latar gelap · 39 serif tidak seukuran-sebobot dengan bold di frasa yang sama (serif sendiri boleh; huruf harus menyatu dengan frame); satu baris satu ukuran · 41 palet dikunci di brief
- 16 storyboard = struktur, bukan visual akhir · 21 format berulang beda framing · 23 uji logika dunia nyata + devil's advocate
- 25 musik per babak · 27 tiga detik pertama · 32 backsound tidak bolong · 34 audio tidak dibatasi folder
- 30 SFX terdengar · 35 uji speaker HP · 36 nyaman dulu baru keras · 37 SFX lahir bersama objeknya

Tanda yang muncul berulang di revisi ada di `slop-catalog.md`. Aturan baru dari Irfan: satu baris di `core-rules.md` (dengan sumber), satu baris indeks di sini, satu baris tanda di katalog bila bisa dilihat/didengar.
