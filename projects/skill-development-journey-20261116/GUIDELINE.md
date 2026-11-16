# Guideline editing · Skill Development (talking head, 16 Nov 2026)

File ini adalah otoritas untuk edit video ini, di bawah instruksi langsungku di chat. Kerjakan sampai Delivery Gate tanpa bertanya "lanjut?": rencana yang tertulis di sini sudah kusetujui. Berhenti hanya di dua titik yang kutulis di §2 (storyboard dan file sumber §8 yang tidak ditemukan).

**Cara membaca file ini.** File ini menjelaskan hasil yang kumau dan batas yang tidak boleh dilanggar; ia bukan resep frame demi frame. Ada tiga jenis isi:
- **Wajib** (§4.2 dan baris "Wajib" di tiap babak): sedikit, dan berlaku apa pun yang terjadi.
- **Hasil yang kumau**: apa yang harus terasa oleh penonton. Ini yang dinilai juri.
- **Usulan**: titik awal dariku. Kamu yang melihat footage, transkrip, dan still-nya, jadi kamu yang memutuskan. Bila kondisi nyata membuat cara lain lebih baik, pakai cara itu dan tulis satu baris alasannya di `DECISIONS.md`. Mengikuti usulan yang hasilnya jelek adalah kegagalan, bukan kepatuhan.

Urutan menang bila bertabrakan: catatanku yang aktif > file ini > `claude/motion-graphic/LANTAI.md` > kartu kiblat 83 > spec Gemini (`sumber/`).

## 0. Ringkas
- **Sumber:** `DJI_20261116162607_0603_D.MP4`, 3:29, 1920×1080, 59,94 fps, mono 48 kHz, horizontal, aku bicara ke kamera di kamar.
- **Hasil:** 16:9, **1920×1080, 29,97 fps** (sumber dikonversi dengan membuang frame selang-seling; tanpa interpolasi). Kenapa 30: render separuh lebih ringan, semua angka frame di file ini dan `frame_audit.py` sudah per 30 frame/dtk. Orientasi tetap horizontal dari awal sampai akhir.
- **Durasi target:** ±1:25 (boleh 1:20–1:32; isi tidak dikorbankan demi durasi).
- **Akun:** personal (@siirfannih), bukan Jadisatu. Palet "jadisatu-gelap" dari Gemini tidak dipakai (lihat §4).
- **Referensi:** kartu 83 Barsol Media (`claude/motion-graphic/pustaka/kartu/83-barsolmedia-kt-talking-head.md`) hanya menyumbang tiga hal: **cara kinetic typography-nya bekerja, gerak kameranya, dan transisinya.** Ruang yang meredup di referensi itu adalah pencahayaan saat syuting; footage-ku tidak punya itu, jadi **tidak ditiru**. Warna dan ruangnya juga tidak.
- **Komponen lain memakai pustaka yang sudah ada.** Untuk bagian motion graphic dan visual pendamping, pilih satu kiblat dari `pustaka/PETA.md` di gerbang G1 (kandidat awal: 07 Baikov/Shapes untuk UI sebagai subjek; 05 Hook momentum; 08 Mosycreate) dan tulis alasannya di `RESEP.md`. Bedah kamera dan transisi kartu 83 masih tipis: ukur dulu dari video sumbernya (`scripts/bedah-kamera.py`) sebelum dipakai.
- **Rough cut v1 (60 dtk)** dari sesi sebelumnya tidak dipakai sebagai dasar: hook, urutan, dan potongannya berbeda dari alur ini (misalnya "100% full pakai AI" dibuang di v1). v1 tetap di Drive sebagai arsip.

## 1. Siapa mengerjakan apa

### 1.1 Keputusan orkestrasi
**Opus memimpin. Semua subagen minimal Sonnet. Haiku tidak dipakai.** Codex membangun kode, dua pemeriksa lain menilai frame.

| Opsi | Cara | Dampak | Putusan |
|---|---|---|---|
| **A · Opus memimpin, subagen Sonnet** | Opus menulis setiap TASK, memutus setiap gerbang, menilai hasil. Sonnet dan Codex mengerjakan yang berulang. | Kesalahan termahal lahir di kepala: TASK yang salah dibangun Codex, dirender, lalu diaudit dua pemeriksa sebelum ketahuan. Satu ronde salah seperti itu lebih mahal daripada selisih token Opus vs Sonnet di kepala. Boros yang dulu terjadi (kuota 5 jam habis ±3 jam) datang dari Opus mengerjakan semuanya sendiri: audit 30 frame per detik, polling, membaca gambar, sesi panjang. Itu yang dilarang di §1.4, bukan Opus-nya. | **Dipakai** |
| B · Sonnet memimpin, Opus hanya di gerbang | Sonnet menulis TASK dan memutus di antara gerbang. | Lebih murah per langkah, tapi spec yang lemah baru ketahuan setelah render; ronde ulang memakan lebih banyak dari yang dihemat. | Tidak |
| C · Codex memimpin, Claude konsul | Codex orkestrasi, Claude lewat `tools/tanya-claude.sh`. | Paling hemat kuota Claude, tapi Codex memutus arah sendiri di antara konsultasi; hasil uji Bali Digifest kurang memuaskan. | Tidak, untuk video ini |

Akun: semua sesi Claude di PC server memakai akun pekerja `claude2` (irfangede1789). Akun Pro diskusi tidak dipakai untuk kerja.

### 1.2 Tabel peran

| Peran | Model / alat | Di mana | Kerjanya | Kenapa model ini | Tidak boleh |
|---|---|---|---|---|---|
| **Sutradara** (kepala) | Claude **Opus** | Claude Code, PC server, `~/work`; **sesi baru per fase** dari `STATUS.md` + handoff | Menulis `handoff/TASK-*.md` (format `orkestrasi.md` §3) dan handoff fase, memutus arah (RESEP, metafora, peran teks), juri still vs kiblat, memutus beda pendapat pemeriksa, Delivery Gate, bicara denganku | Kualitas spec menentukan jumlah ronde; rasa dan konflik aturan butuh model terkuat | Lihat §1.4 |
| **Pra-mortem** (opsional) | Claude **Fable** | Satu sesi, sekali | Sebelum build: membaca storyboard + `RESEP.md` + `teks.json`, mencari 5 kesalahan arah yang paling mahal bila lolos ke render | Satu bacaan teks di titik dengan daya ungkit terbesar | Dipakai lebih dari sekali. Bila Fable tidak tersedia, langkah ini dilewati |
| **Pemotong** | Subagen **Sonnet** | PC server | Fase 1a: transkrip kata, cocokkan alur §5 ke kata asli, buang kata sampah dan jeda, rencana cut, recut, gerbang potong | Teks + timestamp yang terikat aturan | Membuat ucapan baru; memakai timestamp Gemini tanpa verifikasi kata |
| **Penata suara** | Subagen **Sonnet** | PC server | Fase 2 (bersihkan suara), fase 4 (cue SFX dari peta objek), fase 6 (musik dua varian) | Pemilihan dari katalog `SFXIRFAN.md` + angka `ears.py`/`music_fit.py`; daftar cue diputus Opus | Mengecilkan atau me-loudness suara asli; sintesis SFX |
| **Builder** | **Codex** (ChatGPT Pro 5x) | PC server, `tools/codex-pc.sh <proyek> handoff/TASK-xx.md` | Semua komponen visual §6 sebagai kode, `lego.json`, typecheck; push git di akhir | Kuota terpisah dari Claude; kuat di kode berulang bila TASK-nya lengkap | Memutus arah visual; memeriksa hasil buatannya sendiri; memakai gambar raster di UI (§6) |
| **Builder cadangan** | Subagen **Sonnet** | PC server | Komponen yang gagal 2× di Codex | Eskalasi `orkestrasi.md` §8 | Sama dengan Builder |
| **Matte** | Skrip `presenter_mattes.py` (Apple Vision) | **Mac** | Matte pembicara seluruh durasi hasil cut, untuk cincin kata di belakang kepala, dan kata raksasa di belakang kepala | Satu-satunya jalur matte yang terbukti; di Linux matte dilewati | Dijalankan sebelum cut dikunci |
| **Pemeriksa frame #1** | **Codex** jalur QC terpisah (`-l qc-skill-dev`) | PC server | Audit per detik, blind | Kuat di sinkron dan atribusi (bdf26 v10) | Melihat konteks pembuatan |
| **Pemeriksa frame #2** | **Gemini** (`agy`), cadangan subagen **Sonnet** | Mac / PC | Audit per detik, blind; opini kedua audio | Melengkapi #1 (bdf26: menemukan kata yang tak tampil) | Klaim angka tanpa diverifikasi alat ukur |

Pekerjaan mekanis (`ffprobe`, `df`, ringkas log, isi baris `STATUS.md`) tidak memakai subagen: Opus menjalankan skripnya langsung dan membaca ≤ 20 baris terakhir. Memanggil subagen untuk perintah tiga baris lebih mahal daripada menjalankannya.

Eskalasi: pekerja gagal 2× di butir yang sama → naik satu tingkat (Codex → subagen Sonnet → Opus). Bila jalur Gemini atau Codex mati 2×, tandai di `STATUS.md` dan pakai cadangan.

### 1.3 Gerbang yang Opus putus sendiri (tidak didelegasikan)
- **G1 Arah** (fase 1b): `RESEP.md`, `beats.json → metafora`, `teks.json` (peran dan cara tampil per blok, dengan alasan), mode A/B/C per kalimat, kiblat motion graphic, 6 still storyboard. Lalu Fable pra-mortem bila tersedia.
- **G2 Juri still** (fase 3, per babak 1–2, 3, 4–6): lembar sanding still kita vs kartu 83 dan vs tampilan asli produk (§6), maks 960 px.
- **G3 Beda pendapat** (fase 5): hanya detik yang putusan pemeriksa #1 dan #2 berbeda.
- **G4 Delivery Gate** (fase 5): `delivery-gate.md`, sebelum render ditunjukkan ke aku.

### 1.4 Supaya Opus sebagai kepala tidak boros
- Satu fase = satu sesi Opus baru dari handoff + `STATUS.md`. Sesi tidak dibawa melewati fase (riwayat panjang dikirim ulang di tiap panggilan).
- Opus tidak menulis kode adegan > 10 baris, tidak merender sendiri selain menjalankan `render.sh`, tidak mengaudit frame per detik.
- Gambar hanya untuk G2 dan G3, maks 960 px. Angka dari skrip dulu.
- Menunggu job: `tools/tunggu.sh jalan …` lalu satu kali `tunggu`, tanpa polling.
- Menilai hasil pekerja: REPORT + `git diff --stat` + maks 3 file kunci, tidak membaca transkrip pekerja.
- Maks 3 ronde per beat; gagal 2× di butir yang sama = ubah pendekatan TASK, bukan mengulang perintah yang sama.
- Catat kuota 5 jam dan mingguan di awal dan akhir tiap fase di `STATUS.md`.

## 2. Alur kerja per fase
Tiap fase dimulai sesi Opus baru dari `templates/handoff-fase.md`, supaya konteks pendek; pekerjaan berulang di fase itu diserahkan ke subagen Sonnet atau Codex, yang melapor ≤ 15 baris.

| Fase | Pemilik | Masukan | Keluaran | Gerbang PASS |
|---|---|---|---|---|
| 0 Siap | Opus (skrip langsung) | `main` terbaru | `STATUS.md` akses (codex login, agy, Mac matte), disk ≥ 15 GB | `tools/doctor.sh` |
| 1a Potong | Pemotong (Sonnet) | sumber DJI, alur §5 | `CUT-MAP-v2.json`, `suara.wav`, `wajah.mp4` 29,97 fps, `transkrip-hasil.md` per babak, waktu + naskah asli di `CUT-SHEET.md` | `cut_check.py`, `audio_order.py lock suara --words … --source-words … --cut-map … --voice-source …` |
| 1b Arah | Opus (G1), Fable opsional | transkrip hasil, file ini, kartu 83 | `CUT-SHEET.md` terkunci, `RESEP.md`, `beats.json`, `teks.json` (`teks_plan.py` → peran), `contract.json`, 6 still papan | `board.py`, `kt_check.py teks.json` |
| **Henti 1** | aku | 6 still + ringkasan 10 baris | ya / revisi | — |
| 1c Matte | skrip di Mac (dijalankan Opus lewat koneksi PC→Mac yang sudah ada) | `wajah.mp4` terkunci | matte per frame seluruh durasi, disalin balik ke PC | jumlah frame matte = jumlah frame `wajah.mp4`; 6 frame uji tepi rambut/bahu bersih. Bila Mac tidak terjangkau 2×: laporkan ke aku, jangan diam-diam membuang efek belakang-kepala |
| 2 Suara | Penata suara | `suara.wav` | stem suara bersih | `pause_clean.py`, `voice_level.py suara_sumber.wav suara_hasil.wav` |
| 3 Visual | Codex (bangun) → Opus (gerbang + G2) | kontrak, matte, komponen §6 | lapisan lego + `lego.json`, still per beat, draft 0,5 | `motion_lint.py`, `balance_check.py`, `kt_check.py`, cek tanpa raster (§6), G2 |
| 4 SFX | Penata suara | `objects.json` dari kode (nama objek = isinya) | `cues.json`, stem SFX | `sfx_density.py render.mp4 cues.json --objects objects.json`, `audio_phone.py`, opini Gemini (diverifikasi alat) |
| 5 Finishing | 2 pemeriksa → Opus (G3, G4) | semua | `render.sh … frames` → `frame_audit.py` → `VERDICT.md` → render final sekali | semua potongan `PUTUSAN: LULUS`, G4 |
| 6 Musik dua varian | Penata suara → Opus | `master_gambar.mov`, stem suara + SFX, §7.1 | `varian-A.mp4`, `varian-B.mp4`, `tanpa-musik.mp4` (gabung `-c:v copy`) | `music_check.py`, `audio_phone.py`, cek titik sambung, daftar kredit lagu |

Setelah lulus: unggah `varian-A.mp4`, `varian-B.mp4`, dan `tanpa-musik.mp4` ke Drive "Claude edit/2026-11-16 — Siirfan — Di Balik Skill Development", Codex push ke `main`, laporan ke aku ≤ 10 baris.

Henti 2: bila file sumber §8 tidak ditemukan, tanyakan sekali; sambil menunggu, kerjakan komponen §6 yang tidak bergantung pada footage.

### 2.1 Cut sheet: satu tabel yang dibaca semua pekerja
Format kerjaku untuk video adalah **Timeline Cut Sheet & Mapping Visual** (template: `claude/motion-graphic/templates/cut-sheet.md`; draf video ini: `CUT-SHEET.md`). Satu baris = satu kalimat: waktu sumber, timeline hasil, naskah + titik cut, mode, visual dan asetnya, bunyi.
- Fase 1a (Pemotong) mengganti waktu dan naskah draf dengan angka dan kata asli. Fase 1b (kamu, Sutradara) memecahnya per kalimat dan mengunci Mode + Visual setelah storyboard kusetujui.
- Setiap TASK dan handoff untuk subagen **mengutip baris cut sheet yang ia kerjakan + butir Wajib yang relevan**, bukan menyuruhnya membaca file ini, `LANTAI.md`, atau repo. Subagen visual membaca kolom Visual, penata suara membaca kolom Bunyi, pemeriksa frame membaca Naskah + Timeline.
- Cut sheet adalah satu-satunya tempat status per baris (`rencana` → `still lulus` → `audit lulus`); perubahan keputusan ditulis di barisnya, alasannya di `DECISIONS.md`.

## 3. Aturan potong (fase 1a)
- Timestamp sumber di §5 berasal dari Gemini dan **belum terverifikasi**. Cari kalimatnya di `words.json` take sumber (Whisper di PC), lalu potong di batas kata asli. Geser sampai ±10 dtk bila kalimatnya ternyata di tempat lain.
- Buang kata sampah, ulangan, dan jeda berpikir; jeda klausa wajar (≤ 0,5 dtk) dipertahankan. Suara tidak dipercepat atau di-pitch.
- Kata isi tidak teriris > 20 ms, guard 50 ms di tiap batas, durasi kata hasil ≥ 85 % (Lantai E23).
- Babak 3 menggabungkan dua rentang sumber (±28 dtk) ke ±24 dtk: pangkas pengulangan, bukan kalimat isi.
- Tulis per babak di `transkrip-hasil.md`: kalimat persis + waktu mulai/akhir di timeline hasil. Semua jangkar waktu di §5 dihitung ulang dari file ini, bukan dari angka frame Gemini.
- Sebut nama paket langganan persis seperti yang kuucapkan; jangan dikoreksi di transkrip. "Pro Max 20x" benar: paket itu kupakai bulan lalu saat skill development dibangun.

## 4. Sistem visual

### 4.1 Tiga mode yang bergantian
Video ini berpindah di antara tiga mode, mengikuti isi ucapan:
- **Mode A · wajah penuh.** Aku bicara ke kamera, teks kinetik hidup di sekitar kepalaku. Dipakai saat ekspresi dan nadaku yang membawa kalimat.
- **Mode B · wajah di pojok + visual.** Wajahku mengecil ke pojok (lingkaran), layar diisi gambaran dari apa yang kuucapkan. Dipakai saat ada benda nyata yang bisa ditunjukkan (repo, tabel, kartu).
- **Mode C · motion graphic penuh.** Tanpa wajah atau wajah sangat kecil; menjelaskan cara kerja sesuatu. Dipakai saat ucapanku menjelaskan mekanisme (alur fase, relay antar-agen).

Mode per kalimat diputuskan dari transkrip hasil dan still, bukan dari tabel di §5. Hasil yang kumau: perpindahan mode terasa punya alasan (isi ucapan berubah), tidak ada satu mode yang bertahan sampai membosankan, dan wajahku tetap terlihat setiap kali ekspresiku yang paling penting.

### 4.2 Wajib (berlaku apa pun yang diputuskan di lapangan)
1. Horizontal 1920×1080 dari awal sampai akhir.
2. Semua visual dibangun di kode, tanpa PNG/JPG/screenshot; UI dan logo meniru tampilan aslinya (§6).
3. Teks hanya dari ucapanku; semua ucapan tampil sebagai teks kinetik; tidak ada pita subtitle kalimat; kata tidak tampil dua kali di saat yang sama.
4. Setiap teks terbaca: kontras ≥ 4,5 : 1 **diukur di still**, tampil sampai selesai diucapkan, tidak menutupi wajah, tidak di kiri atas, tidak di atas visual yang dirujuknya.
5. Warna punya arti: merah/coral = negatif, biru = solusi, hijau = terverifikasi, putih/tinta = netral. Biru tidak dipakai di latar gelap atau navy.
6. Ruang kamarku tidak diganti hitam kosong, dan wajahku bukan cutout di atas hitam.
7. Suara asliku tidak diturunkan, di-loudness, di-limit, dipercepat, atau di-pitch.
8. `LANTAI.md` tetap berlaku; bila butirnya bertabrakan dengan kondisi nyata video ini, tulis penyesuaiannya di `RESEP.md`, jangan dilanggar diam-diam.

### 4.3 Teks kinetik: yang kumau dan yang kuhindari
**Yang kuhindari:** hasil seperti video-videoku sebelumnya, di mana teks hanya muncul kata per kata dengan fade in/fade out dari awal sampai akhir.

**Yang kumau:** teks yang variatif dan mengikuti isi kalimat, seperti referensi 83. Dalam satu video ada beberapa cara teks hadir, misalnya:
- kata per kata, huruf per huruf, diketik (typing), fade untuk kalimat tenang;
- 2D seperti subtitle (satu kata/frasa di dekat wajah);
- 2.5D: kata melingkari kepala dan lewat di belakangnya, kata bertumpuk sebagai tag;
- 3D: kata raksasa di belakang kepala yang hurufnya bergelombang lalu tenang.

Cara mana dipakai di kalimat mana **kamu yang memutuskan** setelah melihat transkrip, footage, dan ruang kosong di tiap shot. Pegangan memilihnya sudah ada di `typography.md` §8a (peran kalimat → gerak) dan kartu 83 §2; variasi datang dari peran kalimat, bukan dari mengacak efek. Ukuran, jumlah kata per busur, durasi, dan posisi ditentukan dari still, bukan dari angka di file ini.

Catatan dari pengukuranku (bahan, bukan keputusan): dinding kamarku abu-abu sedang (±`#6C787C`); putih hangat di atasnya hanya 4,3 : 1, biru dan coral ±1,5 : 1. Jadi teks berwarna langsung di atas dinding tidak akan terbaca. Cara mengatasinya kamu pilih dan uji di still (misalnya: taruh di area gelap seperti pintu biru tua, beri bayangan/garis tepi halus, grade footage sedikit, atau bawa warna lewat objek dan bukan lewat huruf). Meredupkan ruang seperti referensi bukan pilihan bawaan.

### 4.4 Kamera dan transisi
Diambil dari referensi 83: kamera yang ikut menekankan kata kunci (punch in/out), dan transisi yang menyatu dengan gerak (potong di puncak gerak, blur gerak). Ukur dulu dari video sumbernya. Yang tidak diambil: kilat putih penuh di akhir frase.
Hasil yang kumau: tidak ada shot > 2 detik yang datar, perpindahan mode tidak terasa "nongol", satu transisi khas yang berulang supaya video terasa satu keluarga. Kurva dari `scripts/remotion/curves.ts`.

### 4.5 Huruf dan warna awal (usulan)
Font tersedia di `claude/motion-graphic/fonts/`: Poppins untuk teks kinetik, Anton untuk kata raksasa, Inter dan JetBrains Mono untuk UI dan terminal. Warna awal: putih hangat `#FAF8EC`, coral `#F97066` (di gelap) atau `#D93A3F` (di terang), biru `#2E5BFF` (di terang), hijau GitHub `#1A7F37`, tinta `#1F2328`. Boleh diganti mengikuti kiblat motion graphic yang dipilih, selama arti warna di §4.2 tetap.

## 5. Per babak
Tiap babak berisi: ucapan, hasil yang kumau, yang wajib, dan usulanku. Waktu mengikuti `transkrip-hasil.md`; angka detik di bawah hanya perkiraan. Mode A/B/C lihat §4.1.

### B1 · Hook (±0–4 dtk) "Oke, finally project ini selesai juga"
- **Hasil yang kumau:** sejak frame pertama penonton tahu ada proyek besar yang baru selesai dan penasaran proyek apa. Layar tidak pernah hanya kamar polos.
- **Wajib:** mulai wajah penuh, lalu **sebelum detik ke-3** wajahku mengecil jadi lingkaran di pojok kanan bawah dan latarnya menjadi UI repo GitHub `Siirfannih/skill-development` yang dibangun di kode (data asli repo saat build). Teks konteks sudah ada sejak frame 0.
- **Usulan:** punch kamera di "finally"; kata hero "PROJECT SELESAI" dengan kilat cahaya (`LightSweep.tsx`); centang hijau di commit terakhir tepat di "selesai". Jangan menjejalkan lebih dari ±3 kejadian dalam 4 detik.

### B2 · Pain (±4–14 dtk) "tren edit pakai AI, hasilnya masih AI slop dan putus-putus"
- **Hasil yang kumau:** penonton merasakan "patah"-nya hasil edit AI, bukan hanya membacanya.
- **Wajib:** wajahku tetap terlihat; "AI slop" adalah penekanan terkuat babak ini dan bernada negatif.
- **Usulan:** metafora timeline yang patah (klip terpisah celah merah), kata "putus-putus" menyatu dengan klipnya; guncangan kecil di "AI slop".

### B3 · Solusi & pembeda (±14–38 dtk) "skill untuk membantu model memutuskan · bukan template Apple style · sistem yang mempelajari workflow"
- **Hasil yang kumau:** penonton paham bedanya: ini bukan cetakan gaya, tapi cara memutuskan. Ini babak terpanjang, jadi di sinilah mode harus paling sering berganti supaya tidak melelahkan.
- **Wajib:** isi visual diambil dari skill asliku (bukan opsi A/B/C karangan); kata "template" disingkirkan secara visual; "workflow" jadi penekanan bernada solusi.
- **Usulan:** tabel keputusan asli `typography.md` §8a dengan satu pilihan menyala; kartu "template Apple style" dilempar keluar frame; rel fase asli dari `PETA.md` dirakit bertahap (cocok untuk mode C).

### B4 · Stakes (±38–53 dtk) "nggak usah ditanya kenapa nggak open source… perlu balik modal, Pak!… langganan"
- **Hasil yang kumau:** ini bagian paling hidup dan lucu; ekspresi dan intonasiku yang mendominasi, grafik hanya menemani.
- **Wajib:** mode A di "balik modal, Pak!"; kartu paket dibangun di kode meniru UI asli (ChatGPT Pro 20x, Claude Max 5x), tanpa invoice, tanpa bunyi koin/logam.
- **Usulan:** zoom pelan ke wajah di "balik modal"; kata hero "BALIK MODAL"; kartu paket mendarat di sisi bahu yang kosong, angka "20x" bergerak.

### B5 · Aha (±53–70 dtk) "sistem kerja lintas agent… kayak yang kalian lihat ini"
- **Hasil yang kumau:** momen "oh, begitu cara kerjanya". Penonton sempat membaca alurnya.
- **Wajib:** tepat di "kayak yang kalian lihat ini" layar berpindah ke gambaran sistemnya (mode C atau B); alur dibaca kiri → kanan (horizontal); isi terminal/log adalah teks asli dari kerja kita, dibangun di kode; cukup lama ditahan untuk dibaca.
- **Usulan:** kamera menembus ke terminal, terminal berubah jadi diagram ChatGPT sesi A → Claude → ChatGPT sesi B dengan garis balik (loop belajar), centang hijau saat sinyal tiba.

### B6 · Reveal & penutup (±70–85 dtk) "ini 100% full pakai AI… profesional atau masih AI slop? Komen di bawah…"
- **Hasil yang kumau:** penonton merasa ditanya langsung dan tahu harus berbuat apa (komen).
- **Wajib:** kembali ke mode A; dua pilihan jawaban tampil sebagai benda yang bisa "dipilih"; ajakan komen memakai kata-kataku sendiri; tidak ada end card yang memotong suaraku.
- **Usulan:** "100% FULL AI" dengan kilat cahaya yang sama seperti hook (awal dan akhir berima); dua kapsul di kiri-kanan wajah; satu pil ajakan di bawah.

## 6. Komponen (TASK untuk Codex, satu file satu komponen)
Daftar di bawah adalah usulan awal yang mengikuti usulan §5; daftar final ditentukan setelah G1.
Pakai ulang dulu: `TeksBlok.tsx`, `LightSweep.tsx`, `Penghitung.tsx`, `curves.ts`, `lego/lapisan.py`. Nama objek di kode = isinya, supaya SFX bisa diturunkan dari nama (`objects.json`).

**Semua visual dibangun di kode oleh pekerja, tanpa PNG/JPG/screenshot di lapisan render** (satu-satunya raster: footage wajah dan matte-nya). Tiap UI (GitHub, tabel markdown, terminal, halaman paket, logo ChatGPT/Claude) dibuat sebagai komponen vektor yang meniru tampilan aslinya, supaya setiap bagian bisa digerakkan sendiri: ini video motion graphic, bukan gambar diam. Pekerja boleh melihat tampilan asli produk sebagai acuan; acuan itu hanya dipakai juri G2 untuk sanding, tidak di-import ke komponen. Gerbang: `grep -rE "\.(png|jpe?g|webp)" src/` di folder komponen hasil = kosong.

| ID | Komponen | Babak | Catatan |
|---|---|---|---|
| K-01 | `RepoGitHub.tsx` UI repo terang | B1 | kode penuh meniru GitHub asli + data repo saat build |
| K-02 | `LingkaranWajah.tsx` frame ↔ lingkaran | B1, B3, B5 | satu komponen, tiga pakai |
| K-03 | `CincinKata.tsx` (kata melingkari kepala) | semua | matte untuk bagian belakang |
| K-04 | `SlabGelombang.tsx` (kata raksasa bergelombang) | B1–B6 | gelombang sinus → tenang; opsi G8 |
| K-05 | `TimelinePutus.tsx` | B2 | kata melintasi klip + celah |
| K-06 | `TabelKeputusan.tsx` | B3 | isi asli `typography.md` §8a |
| K-07 | `KartuTemplate.tsx` + `RelFase.tsx` | B3 | isi asli `PETA.md` |
| K-08 | `KartuPaket.tsx` | B4 | ChatGPT Pro 20x + Claude Max 5x, logo SVG |
| K-09 | `TerminalAgen.tsx` | B5 | terminal kode, log asli diketik |
| K-10 | `RelayAgen.tsx` | B5 | horizontal, log asli |
| K-11 | `KapsulVoting.tsx` | B6 | dua pilihan + pil ajakan |

## 7. Suara
- **Suara asli:** hanya peredam noise, lalu gain naik bersih ke ±−16 LUFS bila perlu. Tidak diturunkan, tidak di-loudness global, tidak di-limit. Sumber terukur −16,7 LUFS, true peak −1,8 dBTP (rough cut v1).
- **SFX: satu peran satu file, satu objek penting satu bunyi, KT kata per kata tanpa bunyi.**

Tabel ini usulan peran bunyi; daftar cue final diturunkan dari objek yang benar-benar ada di video (`objects.json`).

| Peran | Kapan | Karakter | Jumlah ±|
|---|---|---|---|
| punch-kamera | C01 (B1 "finally", B4 "balik") | sub-whoosh pendek, mendarat bersama kamera | 2 |
| transisi-dunia | frame ↔ lingkaran, C03, C06 | whoosh tipis mid 500 Hz–2 kHz, gaya Apple | 6–7 |
| kata-hero | kata raksasa masuk | thud sub −12 dB, 4 f hening sebelumnya | 4 |
| objek-mendarat | kartu, tabel, kapsul, pil | pop renyah, low-pass ±6 kHz | 7–8 |
| terverifikasi | centang commit, centang node | satu konfirmasi bersih (glass ping lembut) | 4 |
| lempar | kartu template keluar | swish pendek | 1 |
| putus | celah timeline | glitch tipis | 1 |
| sinyal | loop menutup | swell halus | 1 |
| penutup | setelah kata terakhir | cue tenang | 1 |

Sumber: `~/sfx/SFXIrfan` dan Kenyset dulu (`SFXIRFAN.md`), lalu Epidemic/ElevenLabs bila tak ada yang cocok; tanpa kayu/thock, koin/logam, kartun, 8-bit, sintesis. Gain −4 sampai −10 dB; batas spam Lantai E24.
- **Musik:** dua konsep dariku, jadi dua video hasil (§7.1). Musik dipasang paling akhir.

### 7.1 Audio dipasang di akhir: satu render gambar, dua mix
- Gambar dirender final **sekali** (render.sh lego → `master_gambar.mov`, tanpa musik). Suara bersih, SFX, dan musik adalah stem terpisah. Tiap varian = mix audio baru lalu digabung dengan `ffmpeg -c:v copy` (gambar tidak diencode ulang). Ganti musik = mix ulang ±1 menit, bukan render ulang.
- Audit per detik (§2 fase 5) dijalankan pada gambar + suara + SFX. Musik dicek per varian dengan `music_check.py`, `audio_phone.py`, dan dengar ulang di titik sambung lagu.
- Unduh hanya bagian yang dipakai (`yt-dlp --download-sections`, opsi `--js-runtimes node --remote-components ejs:github` bila hanya dapat audio/HLS lambat). Simpan di `musik/sumber/` beserta URL dan judulnya.

| Trek | Judul (dicek dari YouTube) | URL |
|---|---|---|
| Aware | "Aware", Adrián Berenguer | https://www.youtube.com/watch?v=-y7dFbceo5E |
| With Some Malice | "With Some Malice", Francesco D'Andrea | https://www.youtube.com/watch?v=8O637MAbJMg |
| Ecosystem | "Ecosystem · The Creator", Adrián Berenguer | https://www.youtube.com/watch?v=RmzM7qmwoF4 |
| Ticking Tension | "Ticking Tension", Soundridemusic (berlabel no copyright) | https://www.youtube.com/watch?v=xN6y84DCAxk |
| Back To Black (instrumental) | "Amy Winehouse - Back To Black (Instrumental)", unggahan Mr Destiny; ambil bagian depannya | https://youtu.be/8kTl1m4irgc |

**Varian A · Sandwich (2 lagu)**
| Babak | Musik | Sambungan |
|---|---|---|
| B1 hook | Aware 00:00–00:04 (plucked/marimba ringan, rasa ingin tahu) | — |
| B2–B4 | With Some Malice | **potong** di frame lingkaran membesar ke B2 (transisi-dunia), di ketukan kuat Malice; whoosh transisi menutupi sambungan |
| B5–B6 | Aware dari 00:30+ (strings penuh) | **potong** di frame push-through C03 "kayak yang kalian lihat ini", bukan di batas babak: strings masuk tepat saat kita masuk ke sistem. Kalimat pembuka B5 (±4 dtk) masih di atas Malice |
Awal dan akhir satu tema, jadi video terasa tertutup.

**Varian B · Pembuka berbeda**
Sama dengan A, kecuali pembuka B1 dipilih model dari tiga kandidat: **Ecosystem** (satu komposer dengan Aware), **Ticking Tension** (berdetak), atau **bagian depan Back To Black instrumental**.

**Lagu-lagu ini usulan, bukan kuncian.** Musik di video ini pengisi supaya tidak sunyi, jadi yang menentukan adalah suasana video yang sudah jadi:
- Setelah gambar + suara + SFX final, Penata suara mengukur tiap kandidat dan tiap bagiannya terhadap tempo dan suasana per babak (`pace_read.py`, `music_fit.py`), lalu mengusulkan bagian mana dipakai di mana. Timestamp di tabel varian A adalah titik awal, boleh digeser ke bagian lagu yang lebih pas.
- Opus memutus dan menulis alasannya di `DECISIONS.md` (satu baris per pilihan). Bila satu kandidat tidak cocok dengan suasana babaknya, pakai kandidat lain dari daftar; bila tidak ada yang cocok, cari padanan di Epidemic Sound dan catat.
- Dua varian harus tetap terdengar berbeda di pembuka; selebihnya boleh sama.

**Aturan sambung dan level (dua varian)**
- Titik potong lagu di ketukan, bukan di tengah frase; tidak ada detik bolong tanpa musik. Bila bagian lagu lebih pendek dari babaknya, sambung di batas frase lagu itu sendiri (bukan loop kasar), ukur dengan `music_check.py`.
- Musik di rentang backsound −21 sampai −41 dB, ducking −6 sampai −8 dB di bawah suara, EQ tengah dipotong supaya suara tetap di depan. Suara asli tidak disentuh (§7).
- SFX tetap sama di dua varian; hanya musik yang beda.

**Publikasi dan kredit**
- Video diunggah di akun personalku, bukan iklan atau konten komersial, dan aku menulis kredit lagu di caption. Jalur lagu mana pun boleh dipakai.
- Keluaran fase 6 menyertakan `KREDIT.md`: judul, artis, dan URL tiap lagu yang benar-benar dipakai per varian, siap kutempel di caption.
- Selalu ekspor juga **versi tanpa musik** (gambar + suara + SFX) sebagai cadangan: deteksi otomatis platform bisa membisukan audio walau kredit ditulis, dan dengan file ini musik bisa diganti dari pustaka aplikasi tanpa render ulang.

- Lolos di simulasi volume HP 20/50/100 % (`audio_phone.py`), tanpa SFX tajam 2–6 kHz.

## 8. Yang aku siapkan (Henti 2 bila belum ada)
UI, logo, kartu, dan terminal tidak butuh aset dariku: semuanya dibangun pekerja di kode (§6).
1. **Lokasi file sumber DJI** di PC server. Bila tidak ditemukan dengan `find ~/work -name "DJI_20261116162607*"`, minta aku sekali.

## 9. Koreksi terhadap spec Gemini (ringkas)
| Spec Gemini | Masalah | Diganti |
|---|---|---|
| Kanvas B5 vertikal 1080×1920 | video horizontal; aturanku orientasi sumber | 1920×1080 horizontal |
| Biru `#6F8DFF` di navy `#0F172A` | biru di latar gelap dilarang | biru hanya di permukaan terang |
| Teks biru/coral langsung di footage | kontras 1,5–1,6 di dinding kamar | cara dipilih di lapangan dan diukur di still (§4.3) |
| `#34C759` centang | kontras 2,2 | `#1A7F37` hijau GitHub |
| Font Outfit | tidak ada di repo (A7) | Poppins / Anton / Inter / JetBrains Mono |
| Kartu hook di atas/kiri-atas kepala | teks tidak di atas visual, tidak di kiri atas | slab tengah-kiri berseberangan dengan lingkaran |
| "100% AI WORKFLOW", "AGENT RELAY // LEARNING LOOP", "FREE SKILL", "Input → Decision → Motion" | tidak diucapkan (A5) | ucapan asli atau data UI asli |
| Kartu opsi A/B/C, sub-status Inggris | UI karangan (D20) | tabel keputusan asli, log asli |
| C09 di hook, C10 untuk kartu | arti kode salah | C01, kurva `land` |
| Frame absolut f0–f510 | dihitung dari timestamp yang belum diverifikasi | jangkar kata dari transkrip hasil |
| Invoice / screenshot langganan | data pribadi, gambar diam tidak bisa dianimasikan | kartu paket dibangun di kode |
