# Keputusan Irfan · Soalnya Gini Studio v2

Bagian A sudah diputuskan dan sudah dimasukkan ke v2. Bagian B terbuka: tiap butir punya pilihan dan **default yang sudah dipakai v2** sampai Irfan memutus. Urutan B = dampaknya ke produksi episode 1.

## A. Sudah diputuskan

| ID | Keputusan | Tempat di v2 |
|---|---|---|
| F-1 | "24 jam" = sistem produksi yang bekerja terus, bukan posting nonstop | README §0, §4 |
| F-2 | Target 5 konten/hari: Soalnya Gini 2, siirfan 2, Behindwork 1, satu antrean bersama | `kit/antrean.config.json`, `tools/antrean.py` |
| F-3 | skill-development = otak lapisan; Soalnya Gini memanggil, tidak menyalin | README §1 |
| F-4 | Upload selalu menunggu persetujuan Irfan | `antrean.py` (keluar `review_final`/`siap_unggah` hanya `--oleh irfan`), skill 07 §3 |
| D-01 | VO = Gemini Voice Design, `gemini-3.8-flash-tts`, id-ID; suara `sg-perempuan` `voice_58jatqol9qwd`, `sg-laki` `voice_wbxo7x53a5kc` (TTL 1 tahun) | `kit/suara.json`, `tools/tts_gemini.py`, skill 03 |
| D-02 | Suara bergantian per episode: ganjil perempuan, genap laki (menggantikan "satu narator konsisten" di plan §3) | `kit/suara.json` `giliran` |
| D-03 | Kunci API hanya di PC `~/.config/soalnya-gini/gemini.env` (600); tidak pernah dicetak/disalin | `tts_gemini.py` menolak izin longgar, hanya membaca saat `--izin-biaya` |
| D-04 | Naskah VO ditulis sebagai omongan lisan (loh/tuh/gitu/ya/nih, ±2,9 kata/dtk), tanpa anotasi style; fakta tetap dari fakta.md. Uji A/B `vo-uji/ab-*.wav` menunggu penilaian Irfan | skill 02 §2 |
| D-05 | Mastering VO mengikuti skill-development (tanpa loudnorm satu-pass pada stem) | `tools/vo_master.sh --sumber tts` |
| D-06 | Uji produksi episode 1 memakai maskot KLIK dari `vibedesign/engine/cast/cast.js` (NOTE/NODI pendukung), di-port ke Remotion, aturan KRK-01; hanya untuk uji | `aset/maskot/MASKOT.json`, slot generik di shotlist |

### Diputuskan Irfan di chat, 25 Nov 2026 22:00–22:10 (khusus merek Soalnya Gini; tidak berlaku untuk skill-development)
- K-01: review **per episode begitu siap** (bukan sesi batch). `kit/antrean.config.json` perlu disesuaikan sebelum produksi rutin.
- K-02: pengungkapan AI dicentang Irfan sendiri saat upload; di video tidak ada teks pengungkapan, kredit, atau watermark.
- K-03: ditunda sampai Irfan melihat still KLIK dari test produksi.
- K-04: mekanik referensi saja. **Diperbarui 23:17:** visual tidak memakai palet merek; benda digambar mirip bentuk dan warna aslinya (caption K-05 dan maskot tetap). Semua visual dibangun dengan kode, 3 layer (background · karakter/aksi · teks+maskot).
- K-05: **plan menang untuk merek ini**: caption kata per kata di pelat putih pita bawah y 1250–1450 (kata aktif `#1F4FCC`) + satu keluarga transisi (push-in + potongan melintang). Pengecualian merek, Lantai A1/A2/B13a tetap berlaku untuk merek lain.
- K-06: tautan afiliasi lewat profil/bio.
- K-07: khusus stem TTS merek ini, trim linear puncak ≤ 0,5 dB diizinkan bila perlu; aturan audio skill-development untuk suara manusia tidak berubah.
- K-08: selesai (PC skill-development ditarik ke main).
- K-09: Remotion.
- K-10: gaya B dengan mekanik terbatas + rotasi dengan gaya A.

## B. Terbuka

### K-01 · Ritme review dan waktu Irfan
Lima konten/hari = ±5 storyboard + 5 render final per hari + ±35 naskah per minggu.
- (a) **Default:** naskah dibatch sekali seminggu; storyboard + final di dua sesi harian 08:00 dan 20:00 WITA, maks 8 item/sesi; stop-the-line bila antrean > 10. Perkiraan ±30–45 mnt/hari + 60–90 mnt/minggu (belum diuji).
- (b) Review per episode begitu siap (lebih cepat per episode, lebih banyak gangguan).
- (c) Satu sesi harian (lead time +1 hari, butuh buffer stok 3 hari).
Yang perlu dari Irfan: berapa menit per hari yang realistis, dan jam sesinya.

### K-02 · Pengungkapan AI (YouTube "altered or synthetic", label AI Meta)
VO = suara sintetis rancangan (bukan tiruan orang nyata) di atas animasi. Halaman YouTube mewajibkan pengungkapan untuk konten realistis dan tidak memberi contoh persis kasus ini; pengungkapan tidak menurunkan jangkauan menurut YouTube (sumber sekunder).
- (a) **Default:** selalu centang pengungkapan AI di YouTube dan Meta.
- (b) Tidak centang selama visual animasi/tidak realistis.

### K-03 · Maskot final dan logo
- (a) KLIK (cast.js): sudah ada, SVG deterministik, satu keluarga warna dengan Biru Gini (hue 221° vs 222°). Risiko: KLIK juga karakter dunia vibedesign/akun lain Irfan, jadi identitas Soalnya Gini kurang berdiri sendiri; pendukung NOTE (lime) bisa menggagalkan `palette_check` (keluarga warna kedua).
- (b) Kardus "Gini" sesuai plan §2.2: paling dekat dengan janji "dibongkar" dan nama channel; asetnya belum ada.
- (c) Keduanya (Gini utama, KLIK tamu).
- **Default:** `maskot_utama = klik` hanya untuk uji episode 1; keputusan final ditunda sampai Irfan melihat still uji. Logo: tidak ada di video sampai ada (`profil_cek.py` masih GAGAL 2 butir logo).

### K-04 · Seberapa setia ke referensi gaya A/B
Referensi memakai kanvas gradien periwinkle (dilarang plan §2.3 dan anti-slop, S-V21/S-V18), kata sambung ±42 px sebaris dengan kata kunci (Lantai A6/A7), gaya B penuh orang foto-realistis AI, logo media asli, dan palet pelangi + glow.
- (a) **Default:** mekanik saja (kartu 95, M09–M11) dengan token merek: Kabut datar + jaring halus, Plus Jakarta Sans tumpuk baris (sambung 56 px), Biru Gini; gaya B tanpa orang AI, tanpa logo media, tanpa pelangi; stabilo memakai turunan Biru Gini (bukan kuning ala Kita Bedah); spidol merah `#D6202B` jadi satu-satunya warna pengecualian (tanda salah, maks 2×/video, `kit/tema.ts` PENGECUALIAN).
- (b) Setia penuh: periwinkle + huruf condensed + sambung sebaris. Butuh pengecualian Lantai tertulis dari Irfan di RESEP (A6) dan tetap gagal A7 (ukuran) kecuali kata sambung dibesarkan.
- (c) Campuran: kanvas periwinkle **datar** (tanpa gradien/vignette) untuk gaya A saja, sisanya (a).
Terkait: plan mendesain dunia "Gang Soalnya Gini" (isometrik, set berulang ala R01) untuk 10 episode pertama, sedangkan v1 menggantinya dengan gaya A/B tanpa set gang. Default v2: A/B dulu; set Gang dijadikan perlakuan ketiga (skill baru) hanya bila Irfan memintanya.

### K-05 · Dua aturan plan yang bentrok dengan Lantai
- Caption plan §2.3: kata per kata di pelat putih membulat pada y 1250–1450 dengan kata aktif biru. Lantai A1 (satu lapisan teks kinetik, tanpa pita subtitle), A2 (teks lahir dari komposisi, tidak 3× di pita yang sama), A9 (kotak hanya bila kontras gagal). Biru Gini di pelat putih 4,51:1, di Kabut 3,83:1 (gagal A7).
- Transisi plan §2.3: "satu keluarga transisi saja (push-in + potongan melintang)". Lantai B13a/MOTION-CORE: ≥ 4 tipe per 30 dtk, tipe sama tidak berturut-turut; uji T6a menunjukkan shot list plan Hari 1 gagal karena ini.
- (a) **Default:** Lantai menang; push/potongan + buka-maskot menjadi transisi khas, KT dekat subjek tanpa pelat, teks biru memakai `#1F4FCC`.
- (b) Plan menang untuk merek ini: dicatat sebagai pengecualian merek di EDITING.md + `qc/ketat` disetel tanpa PITA.

### K-06 · Afiliasi (episode 10, rice cooker)
Tautan di deskripsi/komentar Shorts tidak bisa diklik; YouTube Shopping affiliate Indonesia hanya untuk anggota YPP; centang "branded content" untuk hubungan komersial; Etika Pariwara Indonesia meminta unsur iklan disebut jelas.
- (a) **Default:** tayang tanpa tautan sampai YPP; video tetap berdiri sendiri; bila ada tautan (mis. di Facebook) caption memuat "link afiliasi" dan centang paid promotion.
- (b) Tautan lewat profil/bio.
- (c) Ganti slot afiliasi dengan topik bukti view (cadangan SPBU/palang kereta/motor matic).

### K-07 · Take TTS yang pelan tetapi berpuncak panas
Uji T10b: take `ab-sg-laki-lisan.wav` −19,1 LUFS, puncak −0,7 dBFS. Kebijakan skill-development: tidak boleh diturunkan, tidak boleh di-limit, puncak ≤ −1 dBFS, ≥ −17 LUFS. Tidak ada jalan yang lulus.
- (a) **Default:** generate ulang take itu sekali (biaya kecil); masih panas → tahan.
- (b) Usulkan ke skill-development: stem TTS (bukan "suara asli") boleh trim linear ≤ 0,5 dB untuk puncak, lalu `--terima-pelan` (U-03).
- (c) Terima take apa adanya dengan pengecualian tertulis.

### K-08 · Salinan skill-development di PC tertinggal
PC `~/work/skill-development` di `42a94a51`, Mac di `5e9d781`; PC belum punya `delivery_probe.py` dan `loudness_2pass.sh`, dan ada perubahan lokal belum di-commit (`PENDING.md`, `RETRO.md`, `projects/behindwork-batch-1/DECISIONS.md`, `.gitignore`). v2 tidak menyentuhnya.
- (a) **Default:** pemilik sesi skill-development mengamankan perubahan lokal lalu `git pull` di PC sebelum episode 1; sampai itu `sg_qc.sh` berhenti dengan GAGAL-ALAT (sengaja).
- (b) Sementara memakai snapshot `~/work/soalnya-gini-studio/_uji/skilldev-snap` (`SKILLDEV=…`): hanya untuk uji, bukan produksi.

### K-09 · Mesin render: Remotion vs Bang Motion (HTML + GSAP)
Bergantung pada analisis di `bang-motion-analisis/` (agen lain). Gerbang berbasis MP4/still di v2 tidak bergantung mesin; `tema_cek`, `motion_lint`, `cek_komposisi`, dan ledger `render.sh` (G0) bergantung Remotion.
- (a) **Default:** Remotion lewat `render.sh` untuk episode 1.
- (b) Bang Motion untuk komponen tertentu, dengan syarat still storyboard tetap dari kode yang sama dengan render final dan ada padanan G0.

### K-10 · Arah visual Style B ke depan
Dua video "vox" adalah iklan penjual template After Effects; meniru gayanya apa adanya mendekatkan kanal ke "template-based" (kebijakan YPP Jul 2026).
- (a) **Default:** gaya B dipakai dengan mekanik terbatas (B1–B8 skill 05) dan rotasi dengan gaya A (`variasi_cek.py` maks 3 gaya sama berturut).
- (b) Cari referensi arsip lain yang bukan template jual (mis. channel dokumenter sungguhan) sebelum episode B pertama.

### Diputuskan Irfan di chat, 26 Nov 2026 00:35 (ep01 v3)
- Dekorasi pasir: dibiarkan. Peta minimarket (ikon tampak depan di peta tampak atas): tetap. Pantai 1 km dimampatkan (konvensi diagram): dibiarkan.
- Golden frame: ep01 v3 dinilai "sudah bagus dan tepat"; still b01, b09, b13, b17 disetujui sebagai golden gaya A-kolase (v2/merek/soalnya-gini/contoh/bagus/, golden.json).

### Diputuskan Irfan di chat, 26 Nov 2026 00:57
- **Soalnya Gini tidak memakai aturan skill-development** (Lantai, gerbang Kelas H, render.sh final, kunci suara cut_check/audio_order). Render di luar render.sh final sah untuk merek ini; tidak ada perubahan alat skill-development untuk TTS.
- G4 (palet) dimatikan untuk merek ini (merek tanpa palet; benda berwarna asli).
- ep03: musik bed pad ambient orisinal buatan agen dipakai; VO proyek Key 3 sudah pas ("santannya" tidak perlu diperbaiki).
- ep03 v2: interior tong digambar sebagai potongan melintang dari samping.

### Diputuskan Irfan di chat, 26 Nov 2026 01:18
- **Maskot KLIK dihapus dari semua video Soalnya Gini** (mengganggu, tidak punya fungsi). Slot maskot dikosongkan.
- **Kalimat tanya selalu tampil dengan tanda tanya** di teks layar (contoh: "tim mabuk atau tim tidur di mobil?").
- **Subtitle pelat statis (caption K-05) dihapus** karena mengganggu visual — berlaku untuk SEMUA video Soalnya Gini (dikonfirmasi 01:20); teks layar tinggal teks kinetik.
