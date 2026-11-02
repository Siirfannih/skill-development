# Review log · Pengganti Kita Sendiri

## Putaran 1 (R6 segar)

- **Reviewer:** R6 independen. Tidak tahu proses pembuatan; yang dinilai hanya hasil render.
- **Bahan:** `/home/claude/pks/v10/PKS_v10_preview.mp4` (960×540, 30 fps, 132,8 s, audio final 48 kHz).
- **Tanggal:** 2 Nov 2026.

### Metode
- **Visual:**
  - 531 frame 4 fps disusun jadi 27 contact sheet (960 px, 5 dtk per sheet).
  - Frame penuh 960 px diperiksa di 24 titik mencurigakan.
  - Strip 30 fps (±0,2 dtk) dibuat di 40 batas shot.
  - Deteksi scene-cut ffmpeg menemukan 120 cut.
  - Luminansi per frame diukur untuk mencari frame gelap atau kosong.
- **Audio:**
  - EBU R128.
  - Jendela 100 ms terhadap ambang −45 dBFS (dead air).
  - Porsi energi 2–6 kHz dan > 5 kHz (STFT).
  - Onset spectral-flux dibandingkan dengan 79 cut visual.
  - Sebaran level pita ucapan 300–3400 Hz per 2 dtk sebagai proksi kejelasan VO.
- **Batas metode:** mix tidak punya stem. Keterdengaran SFX per cue dan VO-vs-bed hanya bisa diperkirakan, belum terbukti.

### Skor rubrik R1–R7 (1–5)
| R | Skor | Alasan |
|---|---|---|
| R1 timing di ketukan | 3 | Kata kinetik mengikuti VO dengan baik (0:00–0:10, 0:56–1:01, 1:12–1:15). Di montase cepat (1,4–3,7 dtk; 83–86 dtk; 91–95,6 dtk) hanya ±52 % cut punya onset kuat di jendela −40…+120 ms; beberapa pergantian gambar melenceng ±150–260 ms. Transisi besar tanpa hit yang jelas: 12,67 (BERLOMBA → panggung), 23,0 (wipe biru), 55,9 (ke Jensen), 71,03 (ke Altman), 126,25. |
| R2 satu fokus | 3 | Banyak frame sudah satu fokus (kalender, prompt, Wikipedia). Fokus pecah di beberapa frame: 33,75–34,5 (checklist kiri + «Ditepati» kanan), 56–61 (teks Jensen beradu dengan logo cincin), 72–75 (teks Altman melintasi mic dan badan), 8–10 (thumbnail kecil berserakan). |
| R3 konsistensi karakter | 2 | Video bolak-balik antara dua dunia: footage/UI terang ala Apple dan dunia figur garis putus-putus di panggung gelap. Ukuran teks melompat 3–4 level tanpa sistem: «Perlahan» kecil, «Lebih Cepat» sedang, «Semua/Sama/Founder/CEO» raksasa. Kotak miring putih (Kreatif/Membangun/Merencanakan) adalah gaya ketiga. |
| R4 keterbacaan HP | 3 | Teks besar terbaca. Ada yang tidak: teks Altman (~50 px @1080) di latar terang dan ramai, «Single» nyaris tenggelam; kata redup abu Jensen di ungu; «Perlahan» kecil di pojok kanan atas (50–52,5); label kartu UI di 25–28 dtk (~22 px @1080) tidak terbaca di HP 360 px. |
| R5 kebenaran produk | 3 | UI yang ada meyakinkan: kalender Oktober, prompt «Kamu bertindak sebagai CEO», chat multi-agent, ChatGPT, dok. Namun ±40 dtk visual inti cerita (pengganti, perlahan, tempat kita, tertinggal, peran kamu) memakai placeholder, bukan UI/objek nyata. |
| R6 setara referensi | 2 | Kalau diselipkan di showreel bersama referensi, langsung ketahuan beda kelas karena figur garis putus-putus, spotlight kosong, dan layar gelap panjang. Kompas premium gagal di #2 (ruang kosong terasa kosong, bukan mewah), #7 (separuh adegan bukan UI), #10 (akhir gelap dan statis). |
| R7 audio | 4 | −14,0 LUFS / −1,0 dBTP sesuai target, LRA 2,5. Tidak ada jendela 100 ms < −45 dBFS kecuali fade akhir 131,8–132,8. Pita 2–6 kHz median 1,5 %; puncak ~−22 dBFS di jendela pendek bersifat sibilan, tidak menusuk terus-menerus. Ada dua kantong senyap −37 dBFS selama 200 ms (7,84–8,04 dan 122,68–122,88): disengaja sebelum hit, tetapi terdengar sebagai jeda backsound. Margin VO terhadap latar paling sempit (~10 dB) di 12–14, 24–28, 32–34, dan 112–116 dtk. Keterdengaran SFX per cue tidak terverifikasi karena tanpa stem. |

**Rata-rata 2,9. Tidak lulus:** enam butir < 4 (R1–R6). Hanya R7 yang ≥ 4.

**Gerbang R6, jawaban (a) tiga hal paling amatir:**
1. Figur placeholder bergaris putus-putus dan spotlight kosong mendominasi sepertiga video.
2. Layar gelap kosong yang panjang.
3. Teks Altman kecil dan melintang di atas mic.

**Jawaban (b):** ya, langsung ketahuan beda kelas.

### Tabel cacat
| # | Timestamp | P | Apa | Mengapa melanggar | Saran perbaikan konkret |
|---|---|---|---|---|---|
| 1 | 12,7–19,5 · 28,7–31,8 · 50,07–55,9 · 98,5–111,07 · 117,07–132,8 (≈ 44 dtk, 33 % durasi) | **P0** | Dunia «figur manusia» berupa siluet/garis putus-putus, spotlight, podium kosong, kotak putih bercahaya tanpa isi (108–110,9), lalu deret siluet + kartu abu. | Preferensi Irfan: visual is king, UI produk asli, **tanpa shape placeholder**. Kompas #7 gagal. Ini adalah «downgrade cuma shape» yang Irfan keluhkan di poin 7, sekarang dalam skala jauh lebih besar. | Ganti tiap beat dengan objek nyata yang dikerjakan tokoh. Contoh: «Pengganti» = kursi/meja kerja asli yang layarnya diambil alih agen; «Perlahan» = kalender/daftar tugas yang bloknya pindah ke kolom «AI» satu per satu; «Tempat Kita» = org-chart/Slack nyata yang avatar manusianya diganti avatar agen; «Tertinggal/Peran Kamu» = dok/app nyata. Siluet boleh tinggal maksimal satu beat, sebagai simbol yang disengaja. |
| 2 | 14,63–17,87 · 52,03–54,20 · 103,53–105,53 · 28,70–30,13 (total gelap miskin-informasi ≥ 0,5 dtk = 11 dtk) | **P0** | Frame hampir hitam (luma rata-rata < 30, simpangan < 15) dengan satu garis tipis di dalamnya. Hold 2–3 dtk tanpa hal baru. | Irfan: tidak ada frame mati/hitam kosong monoton. Gerbang 3 segmen: hindari hitam polos untuk adegan objek. §16.5: hold > 1 bar tanpa hal baru. | Isi dengan latar gradien premium/lanskap (seperti kalender di 34,6) dan objek nyata. Potong hold menjadi ≤ 1 dtk, atau beri gerak kamera dan elemen hidup. |
| 3 | 72,0–75,2 | P1 | Altman: «Single Person Billion Dollar Company» dalam **satu baris kecil** (~50 px @1080) melintasi mic. «Billion» menempel di kepala mic, «Company» di atas badan, «Single» di latar hijau-putih terang (kontras rendah). | Keluhan Irfan #9 meminta per kata satu baris besar di tengah dengan BILLION ditekankan. Melanggar juga «tidak di atas visual» dan keterbacaan HP. | Satu kata per beat di tengah layar (y 36–64 %), ukuran besar seragam, kata sebelumnya diganti (bukan ditumpuk). «Billion» diberi warna aksen. Beri latar bersih lewat punch-in ke area jendela kabur, atau rack-focus footage. |
| 4 | 56,0–61,2 | P1 | Jensen: teks «Not gonna lose a Job» / «Somebody who uses AI» di **kiri-atas** (y ≈ 24–27 %). Baris menimpa cincin logo Milken; kata redup abu kontrasnya rendah di ungu. | Preferensi Irfan: tidak di kiri-atas, tidak di atas visual, kontras. Keluhan #8 hanya beres separuh (full frame sudah). | Turunkan ke pita tengah kiri (y 45–60 %, x 15–45 %) di area ungu polos di bawah logo, atau punch-in agar logo keluar frame. Ganti abu redup dengan putih 70 %. |
| 5 | 33,75–34,5 | P1 | Checklist kecil di kiri + «Ditepati» di kanan, latar hitam polos. | Gerbang 3 segmen: pola terlarang «blok di kiri + teks di kanan di atas hitam polos». | Hapus kata (visual centang sudah bercerita) atau punch-in ke centang terakhir dengan latar gradien. |
| 6 | 36,8–40,9 | P1 | Daftar Menulis → Memimpin di hitam polos 4 dtk. Kartu terpotong tepi atas (37,0; 38,75; 40,0), kursor AI kecil. | Hitam monoton dan elemen terpotong tepi (§16.2). | Pakai latar langit yang sama dengan kalender. Kamera mengikuti centang dengan pusat di kartu aktif, tanpa memotong kartu di tepi. |
| 7 | 116,5–117,0 | P1 | «Sendiri» diletakkan **di dalam** kartu ChatGPT, tepat di bawah input; terbaca seperti label UI. | Preferensi: teks tidak di atas visual. Rancu antara UI dan anchor. | Letakkan di luar kartu, di ruang gelap bawah (y ≈ 75 %), atau hapus. |
| 8 | 126,25–132,8 | P1 | Akhir: «Peran Kamu» statis ±3,5 dtk di atas siluet redup + garis abu, lalu fade ke hitam 1 dtk. Tidak ada payoff visual. | §16.2: end card tidak statis > 1,5 dtk. Kompas #10 akhir mulus. Frame mati. | Akhiri dengan visual nyata (tangan/UI yang memberi perintah ke agen) dan gerak kecil yang hidup. Hold ≤ 1,5 dtk sebelum fade. |
| 9 | 83,75–86,9 · 92,5–96,3 vs 18,75–19,5 · 54,25–55,5 · 50,25–52,5 | P1 | Skala anchor tidak bersistem. «Semua/Sama/Founder/CEO/Semalam» ±2× «Lebih Cepat/Tempat Kita/Peran Kamu»; «Perlahan» kecil di pojok kanan atas (y ≈ 27 %, x ≈ 85 %, di tepi safe zone). | Aturan teks: ukuran seragam; penekanan lewat warna atau ketebalan, bukan skala. Konsistensi karakter (R3). | Tetapkan dua ukuran saja (anchor dan kutipan). Pindahkan «Perlahan» ke pita tengah. |
| 10 | 8,0–10,3 | P1 | Adegan progress: kartu utama kecil (~16 % lebar), sisanya thumbnail mini acak di hitam; lebih dari 60 % frame kosong. | Visual is king; ruang kosong terasa kosong, bukan mewah. Keluhan #4 memang beres secara posisi teks, tetapi adegannya sendiri lemah. | Zoom kartu utama hingga ±50 % lebar dengan thumbnail sebagai parallax latar kabur. Teks tetap di bawah kartu. |
| 11 | 30,75–31,7 · 105,5–108,0 | P2 | Kata di dalam kotak putih miring (Kreatif/Membangun/Merencanakan). | §16.2 melarang blok warna di belakang kata. Gerbang 3 segmen mengizinkan «kotak sorot». Konflik aturan ini perlu diputuskan Irfan, jangan dipilih diam-diam. | Tanyakan ke Irfan. Bila tetap dipakai, satu gaya untuk seluruh video. |
| 12 | 41,0–45,0 | P2 | Kotak prompt terpotong tepi kiri; teks ketikan mulai di x ≈ 3 %. | Safe zone x 15–85 %; elemen terpotong kontainer. | Kamera mengikuti kursor dengan margin ≥ 15 %, atau skala sedikit lebih kecil. |
| 13 | 21,25–21,9 | P2 | Zoom Wikipedia memotong header «WIKIPEDIA» di tepi atas. | Elemen terpotong tepi. | Geser anchor zoom 40 px ke bawah. |
| 14 | 0,000–0,067 | P2 | Dua frame pertama kosong gelap (luma 17). | §16.5 mode gagal «frame 0 kosong». | Mulai langsung di frame footage. |
| 15 | 0,1–0,6 | P2 | Pita terang di 10 px bawah (sisa lower-third CNBC dari sumber) di klip Gates. | Elemen sumber bocor, tepi kotor. | Crop/scale klip Gates 2 % lagi, atau mask bawah. |
| 16 | 100,0–102,5 | P2 | Deret kartu hanya di 25 % atas frame, sisanya hitam kosong; siluet kecil. | Komposisi kosong, hitam monoton. | Kamera turunkan atau perbesar deret kartu ke pusat. |
| 17 | 9,0–10,3 | P2 | Bayangan teks «This time progress…» melebar jadi pita kabur samar di luar baris (terlihat saat shadow diperjelas). | Mendekati larangan scrim/pita (dikunci); risiko terlihat di layar terang. | Kecilkan radius/opacity text-shadow. |
| 18 | 7,84–8,04 · 122,68–122,88 | P2 | Kantong senyap ±200 ms, mix turun ke −37 dBFS. | Preferensi Irfan: backsound tanpa jeda senyap (walau §16.2 membolehkan kantong sebelum hit). | Bed jangan turun di bawah ~−28 dBFS. Cukup duck 6 dB. |
| 19 | 12,67 · 23,0 · 55,9 · 71,03 · 126,25 | P2 | Transisi besar tanpa transien kuat di ±120 ms. Di montase 83–86 dan 91–95,6, sebagian pergantian gambar melenceng 130–260 ms dari onset terdekat. | SFX jatuh tepat pada objek; 1 event 1 SFX. | Verifikasi dengan stem SFX. Kunci onset whoosh/hit ke frame cut (0…+2 f). |

### Status 9 keluhan Irfan (FEEDBACK-2NOV-0605)
| # | Keluhan | Status | Bukti |
|---|---|---|---|
| 1 | 1:46 MEMBANGUN cahaya kotak kasar | **BERES** | 105,5–107,75: berkas cahaya kerucut dengan falloff lembut, tidak ada tepi persegi. Kotak teks putihnya sendiri tetap ada (lihat #11). |
| 2 | 0:00 Gates dobel (matte) | **BERES** | 0,07–1,43: satu figur, tidak ada ghost. Cacat baru kecil: pita terang bawah 0,1–0,6 (#15). |
| 3 | 0:03 montase teks ke tengah | **BERES** | 1,75–3,5: baris di y ≈ 52 %, rata tengah. |
| 4 | 0:09 progress teks di ruang kosong | **BERES** (posisi) | 8,25–10,3: teks di bawah kartu, y ≈ 69 %, tidak menimpa presenter. Adegannya masih lemah (#10). |
| 5 | 0:22 «AI» hitam di belakang Wikipedia | **BERES** | 19,5–23,0: tidak ada teks «AI». |
| 6 | 0:24 «janji sederhana» dua kata | **BERES** | 23,75–25,2: «Janji sederhana» tanpa kotak, dekat ujung kurva (dikunci). |
| 7 | 0:35 8 jam → UI kalender nyata | **BERES** | 34,6–36,8: kalender Oktober 2026 nyata. Blok Input data/Invoice/Rekap menyusut ke 09.00–09.45 (35,75–36,5). |
| 8 | 0:57 Jensen full frame, teks di kiri | **TIDAK** (separuh) | Full frame sudah. Namun teks di kiri-**atas** (y ≈ 26 %) menimpa cincin logo pada 56,5–59,2, dan «Somebody who uses AI» di 59,4–61,2 juga atas-kiri (#4). |
| 9 | 1:14 Altman per kata besar di tengah, BILLION ditekankan | **TIDAK** | Orbit sudah dibuang dan full frame sudah. Teksnya satu baris kecil berisi lima kata, melintasi mic dan badan, kontras rendah di 72,0–75,2 (#3). |

**Rekap: 7 BERES, 2 TIDAK.**

### Catatan bagian terkunci (LOCKED.md)
Catatan ini diterima apa adanya dan tidak diminta diubah:
- cat «BERLOMBA-LOMBA» (12,0–12,6);
- grid biru «janji sederhana»;
- gradien langit kalender;
- font Geist;
- tanpa scrim.

Satu-satunya catatan: #17 hanya memperingatkan bahwa shadow teks mendekati efek pita. Ini bukan permintaan mengubah keputusan terkunci.

### Gerbang Karpathy (dari sisi reviewer)
- **Konflik aturan yang perlu diputuskan Irfan:** kotak putih di belakang kata. §16.2 melarang, gerbang 3 segmen membolehkan «kotak sorot».
- **Yang tidak bisa dicek reviewer:** `git diff`, cakupan SFX per cue (≥ 85 %), dan keterdengaran per cue. Ketiganya butuh stem dan kode; pembuat wajib melampirkan angkanya.

### VERDICT: **NO-SHIP**
- Ada 2 P0: placeholder shape ≈ 44 dtk dan frame gelap kosong ≈ 11 dtk.
- Ada 8 P1.
- R1–R6 di bawah 4.
- 2 dari 9 keluhan Irfan belum beres (Jensen, Altman).

**Prioritas putaran 2:**
1. Ganti dunia siluet/placeholder dengan objek dan UI nyata (sekaligus menghapus frame gelap).
2. Perbaiki tipografi Altman dan Jensen.
3. Ganti adegan checklist-di-hitam (33,75–40,9) dan akhir video (126–132,8).

## Keputusan Claude utama atas Putaran 1 (devil's advocate)
- **P0 #1 "placeholder shape" (piktogram/wireframe/siluet) — DITOLAK.** Aturan Irfan: kalimat tentang perilaku manusia memakai visual piktogram/cahaya/zona (gaya neuronvisuals); piktogram adalah bahasa visual yang disengaja, bukan placeholder. Yang diterima: bagian yang benar-benar kosong (lihat #2).
- **P0 #2 frame gelap — SEBAGIAN.** Gelap = fokus (aturan Irfan) di ruang piktogram dipertahankan. Bagian UI di atas hitam polos (checklist 02e) dipindah ke latar langit gradien (konsisten dengan kalender, disetujui Irfan 07.09).
- **Diterima & dikerjakan putaran 2:** Altman (#3), Jensen (#4), Ditepati (#5: teks dihapus, visual daftar tercentang sudah kuat), checklist di atas hitam (#6), Sendiri (#7: dihapus — terbaca seperti label UI), ukuran anchor VO tidak seragam (#9), P2: frame pertama kosong, pita terang Gates, kotak prompt & header Wikipedia terpotong, transisi tanpa hit (12,67 / 23,0 / 55,9 / 71,03 / 126,25), kata redup terlalu redup (opasitas 0,45 → 0,6).
- **Ditunda/usulan:** penutup 126–132,8 (#8) → mini proposal payoff dulu. Progress 8–10 (#10): BERES menurut keluhan Irfan #4; kartu kecil disengaja agar ruang teks; tidak diubah.
- **Konflik kotak sorot vs §16.2:** kotak sorot tidak dipakai di video ini; tidak perlu keputusan Irfan sekarang.
- **Audio:** angka per-cue ada di `tools/audio_gate.py` (89 % terdengar, VO p5 +2,8 dB).

## Putaran 2 (R6 segar)

- **Reviewer:** R6 independen. Tidak tahu proses pembuatan; yang dinilai hanya hasil render.
- **Bahan:** `/home/claude/pks/v10/PKS_v10_r2_preview.mp4` (960×540, 30 fps, 132,8 s, audio final).
- **Tanggal:** 2 Nov 2026.
- **Keputusan Irfan yang dipakai sebagai batas:** piktogram/wireframe/siluet = bahasa visual yang disengaja (bukan placeholder); hitam = fokus di ruang piktogram; teks narasumber di atas footage dengan shadow lembut diterima walau kontras terukur rendah; teks = prioritas 2. Bagian di LOCKED.md tidak diminta diubah.

### Metode
- **Visual:**
  - 531 frame 4 fps disusun jadi 23 contact sheet (960 px, 6 dtk per sheet).
  - 16 frame kunci diperiksa pada 480 px dengan overlay safe zone (x 15–85 %, y 20–80 %) dan pita pesan (y 36–64 %).
  - Deteksi cut ffmpeg (scene > 0,25) menemukan 94 cut.
  - Luminansi per frame (3984 frame) dipakai untuk mencari lonjakan dan frame kosong. Hasilnya diverifikasi per frame (select n) di 8,00 · 12,67 · 40,93 · 86,93 · 117,07.
  - Strip 30 fps di 8 batas shot.
- **Audio:**
  - Angka terukur dari pembuat (SFX 89 % terdengar, VO p50/p5 15,2/2,7 dB, > 5 kHz 4,8 %, −14,0 LUFS, TP −1,3) diterima.
  - Pemeriksaan sendiri: kenaikan energi pita 30–150 Hz / 3–10 kHz di jendela −250…+150 ms pada 40 cut besar. Semua cut punya kenaikan ≥ 4 dB.
  - Pada montase, onset transien > 2 kHz cocok dengan 13/19 cut (82,7–87), 22/32 cut (91,3–95,7), dan 8/10 cut (1,4–3,7), dengan offset −49…+76 ms.

### Skor rubrik R1–R7 (1–5)
| R | Skor | Alasan |
|---|---|---|
| R1 timing di ketukan | 4 | Kata kinetik masuk per kata mengikuti VO (Gates, 16 year old, Raised, Jensen, Altman). Ke-40 cut besar punya event audio di jendelanya. Montase sebagian besar terkunci (±50–75 ms). Nilai turun karena glitch di serah-terima: 1 frame hitam di 40,93; 2 frame hitam di 12,67; teks yatim di 8,00. |
| R2 satu fokus | 4 | Kebanyakan frame satu fokus: kalender, prompt, multi-agent, grid 3×3, kartu app, beam Membangun. Pecah di Altman 72–75 (baris teks melintasi kepala/rambut) dan 25,25–28,5 (kartu tugas di kiri-atas, dock di kanan-bawah, tengah kosong). |
| R3 konsistensi karakter | 4 | Dua dunia (UI terang dan ruang piktogram gelap) sekarang terbaca sebagai sistem yang disengaja. Ukuran teks hampir dua tingkat: kutipan narasumber ±52–56 px @1080, anchor VO ±75 px. Ada pengecualian: «Sadar» ±1,6× anchor lain, dan gaya ketiga berupa kata di dalam kotak putih miring (Kreatif/Membangun/Merencanakan). |
| R4 keterbacaan HP | 3 | Teks anchor dan kutipan terbaca. Label UI ±16–22 px @1080 (± 5–7 px di HP 360 px) tidak terbaca di 25,25–28,5 (nama file yang diseret), 33,75–34,3, 39–40,9 (grid), 64,5–65,9 (linimasa GPT), dan 98,5–103,3 (deret kartu app). Di linimasa GPT, label adalah isi pesan. |
| R5 kebenaran produk | 4 | UI meyakinkan dan dipakai seperti sungguhan: kalender Oktober menyusut, prompt «Kamu bertindak sebagai CEO…», chat multi-agent dengan angka omzet, ChatGPT, galeri app. Linimasa GPT-3 → GPT-5 tepat. |
| R6 setara referensi | 3 | Bagian UI sudah setara kelas referensi. Yang membuatnya langsung ketahuan beda kelas: (a) Altman dengan satu baris kecil di atas kepala; (b) akhir statis «Peran Kamu» 3 dtk lalu fade; (c) glitch 1 frame hitam/kedip; (d) hold ±2 dtk tanpa hal baru di ruang piktogram (28,75–30,6 · 103,5–105,4 · 117,3–119,7). Kompas #10 (akhir mulus) gagal. |
| R7 audio | 4 | Loudness dan TP sesuai target. SFX 89 % terdengar, > 5 kHz < 5 %, tanpa dead air. Kekurangannya: VO p5 hanya 2,7 dB di atas latar, artinya 5 % waktu VO nyaris setara bed dan berisiko tenggelam di speaker HP. |

**Rata-rata 3,7. Tidak lulus:** R4 dan R6 < 4.

**Gerbang R6, jawaban (a) tiga hal paling amatir:**
1. Tipografi Altman: satu baris kecil di atas kepala, padahal sudah dua kali dikeluhkan.
2. Akhir video statis lalu fade ke hitam.
3. Kedip 1 frame hitam/abu di 40,93 dan 117,07–117,13.

**Jawaban (b):** ya, masih ketahuan beda kelas, tetapi jaraknya jauh lebih kecil dari putaran 1.

### Tabel cacat
| # | Timestamp | P | Apa | Aturan yang dilanggar | Saran konkret |
|---|---|---|---|---|---|
| 1 | 72,0–75,2 | **P0** | Altman: «Single Person Billion Dollar Company» masih **satu baris** ±56 px @1080 di y ≈ 23 % (tepi atas safe zone). Ujung «Dollar Company» menimpa kepala/rambut Altman. Ini tidak berbeda substansial dari putaran 1. | Keluhan Irfan #9 (per kata, satu baris besar di tengah, BILLION ditekankan); pita pesan y 36–64 %; R6 putaran 1 #3. Keluhan eksplisit klien yang dua kali tidak dipenuhi = penghalang kirim. | Satu kata per beat, rata tengah di y ≈ 50 %, ukuran anchor (±75 px @1080), kata diganti dan bukan ditumpuk: Single → Person → **Billion** (kuning aksen, tanpa membesar) → Dollar → Company. Footage di-rack-focus/blur ringan supaya kata menempel di latar. Boleh menutup wajah (izin Irfan). |
| 2 | 56,0–61,2 | P1 | Jensen: teks di kiri-**atas** (y ≈ 21–24 %, menempel batas atas safe zone) di atas logo. Di 59,4–61,2 «Somebody who uses AI» berada di sejajar rambut/dahi pada potongan close-up. | Keluhan #8 (teks per kata di ruang kosong kiri); pita pesan y 36–64 %. | Pindah ke pita tengah kiri: x 15–45 %, y 45–60 %. Logo cincin cukup digeser/di-crop keluar lewat punch-in kecil, atau teks diletakkan **di bawah** logo di area ungu polos. |
| 3 | 40,933 (frame 1228) | P1 | **Satu frame hitam penuh** antara grid 3×3 dan kotak prompt. Terlihat sebagai kedip. | §16.2: tidak ada frame kosong/blank di serah-terima. | Rapatkan Sequence (from/durasi 1 frame meleset). Uji dengan luminansi per frame: tidak ada frame yang beda > 25 dari kedua tetangganya. |
| 4 | 117,067–117,133 | P1 | Kartu ChatGPT berkedip: gelap → abu → gelap dalam 3 frame sebelum adegan siluet. | §16.2 serah-terima bersih; gerak halus berbobot (kompas #5). | Satu transisi monotonik: kartu meredup 6–8 f lalu cut. Hapus frame yang tumpang. |
| 5 | 126,25–132,8 | P1 | Akhir: «Peran Kamu» statis ±3 dtk (129–131,5) di atas siluet redup + garis abu, lalu fade 1,3 dtk. Teks menempel di atas kepala siluet. Belum ada payoff. | §16.2 end card tidak statis > 1,5 dtk; kompas #10. (Putaran 1 #8: masih menunggu mini proposal.) | Selesaikan proposal payoff: satu layar siluet menyala/berubah menjadi UI yang diberi perintah, gerak kecil terus hidup, hold ≤ 1,5 dtk, lalu cut/fade. Beri jarak teks ≥ 40 px dari kepala siluet. |
| 6 | 50,25–52,6 | P1 | «Perlahan» masih di kanan-atas (y ≈ 22–28 %, tepi kanan di x ≈ 85 %), menempel lingkaran kepala putus-putus di 52,25. | Pita pesan y 36–64 %; safe zone. Putaran 1 #9 diterima Claude utama, tetapi belum dikerjakan. | Taruh di pita tengah sisi kiri (x 15–40 %, y ≈ 50 %) yang kosong, sejajar garis cahaya yang naik. |
| 7 | 25,25–28,5 · 33,75–34,3 · 39,0–40,9 · 64,5–65,9 · 98,5–103,3 | P1 | Label UI ±16–22 px @1080 tidak terbaca di HP. Di 25–28 nama file yang diseret adalah isi beat. Di 64,5–65,9 nama model adalah pesan. | R4 keterbacaan HP; kompas #7 (UI besar didemokan). | Punch-in pada objek aktif (kartu yang diseret, kartu GPT yang menyala) sampai label ≥ 36 px @1080. Shot lebar cukup ≤ 0,5 dtk sebagai establishing. |
| 8 | 64,5–65,9 · 41,0–45,0 | P2 | Kartu «GPT-3» di x ≈ 5 % (di luar safe zone). Teks ketikan prompt mulai di x ≈ 10 % dan kotak terpotong tepi kanan. | Safe zone x 15–85 %. | Geser kamera/skala sampai elemen yang dibaca masuk x ≥ 15 %. |
| 9 | 8,000 (frame 240) | P2 | Satu frame teks «Raised over a Billion dollars» yatim di atas hitam setelah footage hilang. | Serah-terima bersih. | Akhiri teks di frame yang sama dengan klip, atau 1 f lebih awal. |
| 10 | 12,667–12,70 | P2 | Dua frame hitam penuh antara BERLOMBA-LOMBA (dikunci) dan panggung piktogram. | Serah-terima bersih (cat terkunci tidak disentuh; ini hanya celah sesudahnya). | Mulai beam spotlight di frame cut. |
| 11 | 86,933 | P2 | Satu frame gambar montase lain (kerumunan) muncul sendirian tepat sebelum UI ChatGPT. | 1 event 1 SFX; serah-terima bersih. | Potong montase 1 f lebih awal. |
| 12 | 30,75–31,7 · 105,5–107,9 | P2 | Kata di dalam kotak putih miring (gaya ketiga). Catatan Claude utama putaran 1 menyebut «kotak sorot tidak dipakai di video ini», padahal render masih memakainya. | §16.2: tidak ada blok warna di belakang kata. Konflik dengan «kotak sorot» di gerbang 3 segmen belum diputuskan. | Tanyakan Irfan. Pilihannya: tetap (karena kotak = layar yang menyala, bagian piktogram) atau kata ditaruh di luar kotak. Catat keputusannya. |
| 13 | 10,6–11,2 | P2 | «Sadar» ±1,6× ukuran anchor lain. | Ukuran seragam dalam satu urutan. | Samakan ke ukuran anchor. Penekanan lewat kamera/warna. |
| 14 | 28,75–30,6 · 103,5–105,4 · 117,3–119,7 | P2 | Hold ±2 dtk tanpa hal baru: hanya busur siluet / kotak abu kosong / 60 % bawah frame kosong gelap. | §16.5 hold > 1 bar tanpa info baru; kompas #8 (elemen kecil yang hidup). Gelap = fokus diterima; yang dikritik adalah durasi tanpa perubahan. | Potong ≤ 1 dtk, atau isi dengan gerak kecil: beam menyapu, kamera dolly 3–5 %, kotak mulai berpendar lebih awal. |
| 15 | 54,25–55,6 · 119,75–120,5 | P2 | «Tempat Kita» (y ≈ 75 %) menimpa alas siluet. «Tertinggal» di y ≈ 72–79 % menempel batas bawah. | Pita pesan y 36–64 %. | Naikkan ke y ≈ 55–60 %, di ruang gelap samping siluet. |
| 16 | 98,5–103,3 | P2 | Deret kartu app hanya di 15–30 % atas frame dan terpotong tepi atas; bawah frame kosong (temuan putaran 1 #16 belum berubah). | Komposisi; safe zone. | Turunkan deret ke y ≈ 40 %, atau kamera tilt turun. |
| 17 | sepanjang VO (p5) | P2 | VO hanya 2,7 dB di atas latar pada persentil 5. | Vocal dominance; VO selalu paling jelas. | Cari jendela p5 dari stem. Di sana duck bed +3 dB lebih dalam atau geser SFX ±100 ms dari suku kata tekanan. |

**Diterima (keputusan Irfan/dikunci, bukan cacat):**
- dunia piktogram dan siluet (12,7–19,5 · 50–55,9 · 98–132);
- hitam sebagai fokus;
- cat BERLOMBA-LOMBA;
- grid biru «janji sederhana»;
- gradien langit kalender;
- grid 3×3 di 36,75–40,9;
- tanpa scrim;
- footage montase diredupkan di 83–87 (redup global, bukan pita);
- adegan progress 8–10,3 dengan kartu kecil (keputusan putaran 1).

### Status 9 keluhan Irfan (FEEDBACK-2NOV-0605)
| # | Keluhan | Status | Bukti |
|---|---|---|---|
| 1 | 1:46 MEMBANGUN cahaya kotak kasar | **BERES** | 105,5–107,9: berkas cahaya diagonal lembut tanpa tepi persegi. |
| 2 | 0:00 Gates dobel | **BERES** | 0,0–1,43: satu figur. Frame 0 sudah footage. Tidak ada pita terang bawah. |
| 3 | 0:03 montase teks ke tengah | **BERES** | 1,7–3,7: baris di y ≈ 52 %. |
| 4 | 0:09 teks progress di ruang kosong | **BERES** (posisi) | 8,25–10,3: teks y ≈ 69 % di bawah kartu, tidak menimpa presenter. |
| 5 | 0:22 «AI» hitam di belakang Wikipedia | **BERES** | 19,5–23,0: tidak ada. |
| 6 | 0:24 «janji sederhana» | **BERES** | 23,75–25,2. |
| 7 | 0:35 kalender nyata | **BERES** | 34,5–36,6: kalender Oktober, blok menyusut ke 09.00–09.45. |
| 8 | 0:57 Jensen full frame, teks per kata di kiri | **SEBAGIAN** | Full frame dan per kata sudah. Posisinya masih kiri-atas y ≈ 22 %, bukan ruang kosong tengah-kiri (#2). |
| 9 | 1:14 Altman per kata besar di tengah, BILLION | **TIDAK** | Orbit hilang dan BILLION berwarna sudah. Namun masih satu baris kecil di atas, melintasi kepala (#1). |

**Rekap: 7 BERES, 1 SEBAGIAN, 1 TIDAK.**

### VERDICT: **NO-SHIP**
- 1 P0: Altman.
- 6 P1.
- R4 = 3 dan R6 = 3.
- Jalur terpendek ke SHIP:
  1. Altman per kata di tengah.
  2. Jensen ke pita tengah kiri.
  3. Dua glitch frame (40,93 · 117,07).
  4. Payoff akhir.
  5. «Perlahan» ke pita tengah.
  6. Punch-in label UI di 25–28 dan 64,5–66.
- P2 bisa dikerjakan sekaligus karena hampir semuanya tingkat 0 (mekanis).

## Keputusan Claude utama atas Putaran 2
- **P0 Altman — DITERIMA, pendekatan diganti** (dua kali gagal dengan satu baris kecil): kata per kata di SATU slot tengah layar (y ≈ 540, ukuran anchor 130), kata baru menggantikan kata sebelumnya tepat di onset ucapan; «Billion» warna aksen. Tafsir "per kata satu baris besar di tengah" (#9).
- **Jensen — kompromi tetap:** ruang ungu bersih hanya ada di pita atas; bawah tertutup kursi putih (kontras 1,3:1). Turunkan sedikit agar tidak menempel batas atas safe zone (baseline ≥ 300), tidak menimpa dahi saat close-up.
- **Diterima:** frame hitam 40,93; kedip kartu 117,07–117,13; «Perlahan» keluar dari kanan-atas & tidak menempel kepala; teks yatim 8,0; 2 frame hitam 12,67 (transisi saja, cat BERLOMBA tetap dikunci); frame nyasar 86,93; «Sadar» ke 130 px.
- **Penutup 126,25–132,8 — disetujui planner:** dorong kamera pelan 1,00→1,12 (cubic-out) + rim light piktogram naik pelan selama hold; tanpa elemen baru; fade akhir tetap.
- **Ditunda:** punch-in label UI kecil (tidak mengubah alur; dicatat untuk Irfan). Kotak putih miring di KREATIF/MEMBANGUN: bidang cahaya yang sudah disetujui sesudah keluhan #1 → dipertahankan.

## Putaran 3 (R6 segar)
Bahan: `PKS_v10_r3_preview.mp4` (960×540, 30 fps, 132,8 dtk, audio final). Reviewer tidak tahu proses pembuatan.

**Cara periksa:**
- Contact sheet 4 fps (531 frame, 27 lembar 4×5 @240 px) untuk seluruh video, ditambah frame 960 px di 14 momen rawan.
- Strip 30 fps ±3 f di 45 cut (semua cut babak + sampel montase). Deteksi otomatis memakai scene score > 0,25 (89 cut) dan luminansi per frame: frame gelap terisolasi, lonjakan ±25 yang kembali, frame < 10 Y.
- Gerak antar frame per 0,5 dtk di 117–132,8.
- Audio: ebur128, silencedetect −45 dB/100 ms, RMS 100 ms dan 20 ms di ekor.

**Hasil terukur:**
- Nol frame hitam dan nol kedip di seluruh video. Titik bermasalah putaran 2 bersih: 8,00 · 12,67 · 40,93 · 86,93 · 117,07 (luminansi menurun monotonik).
- Integrated −14,0 LUFS, TP −1,1 dBFS, LRA 2,4 LU.
- Satu-satunya jendela < −40 dBFS ada di fade akhir 131,5–132,8.
- Ekor 132,60–132,80: muncul bunyi frekuensi rendah (20–150 Hz) +12 dB (−51 → −38 dBFS) di atas layar hitam, lalu terpotong di frame terakhir.
- Angka pembuat untuk keterdengaran SFX (89 %), VO p50/p5 (15,2/2,7 dB), >5 kHz (4,8 %), dan BGM p50 (−29 dBFS) diterima. Reviewer tidak punya stem untuk mengukur ulang.

### Skor rubrik R1–R7 (1–5)
| R | Skor | Alasan |
|---|---|---|
| R1 timing di ketukan | 4 | Kata masuk per kata dan mengikuti ucapan: Gates, montase, 16 year old, Raised, Jensen, Altman. Montase cut tiap 7–8 f, rapat dengan transien. Semua serah-terima bersih. Nilai belum 5 karena di 126,5–131,5 tidak ada event visual baru selama 5 dtk saat musik masih berjalan. |
| R2 satu fokus | 4 | Hampir semua frame satu fokus. Kalender, prompt, multi-agent, grid 3×3, Altman per kata, dan cahaya Membangun bekerja. Fokus pecah di Jensen 56,4–59,3 (baris teks menabrak logo cincin) dan 25,25–28,5 (tumpukan kartu kiri-atas, dock kanan-bawah, tengah kosong). |
| R3 konsistensi karakter | 4 | Dua dunia (UI terang dan ruang piktogram gelap) konsisten. Ukuran anchor seragam, termasuk «Sadar» yang sudah setara. Entri blur→tajam dipakai konsisten untuk kata VO. |
| R4 keterbacaan HP | 4 | Semua anchor dan kutipan narasumber terbaca di 960 px. Altman 130 px dengan shadow terbaca di atas lengan mikrofon. Label UI kecil ditunda sesuai keputusan Irfan, jadi tidak dihitung sebagai kegagalan (dicatat P2). |
| R5 kebenaran produk | 4 | UI dipakai seperti sungguhan: kalender Oktober menyusut, prompt CEO diketik, chat multi-agent dengan angka omzet, ChatGPT mengetik «tolong balas oke siap…», linimasa GPT-3→GPT-5. Tidak ada klaim produk yang janggal. |
| R6 setara referensi | **3** | Bagian tengah (19–50, 61–71, 87–98) sudah sekelas referensi. Penutup gagal kompas #10: setelah 126,25 frame praktis beku 5 dtk (selisih antar frame rata-rata 0,02–0,4 dari 255, jadi dorongan kamera 1,00→1,12 tidak terlihat). «Peran Kamu» diam 2,6 dtk menempel di atas kepala siluet, lalu fade. Aturan analysis-qa §16.4: gagal satu butir kompas berarti R6 tidak lulus. Ini putaran ketiga butir yang sama gagal, jadi pendekatannya harus diganti, bukan dipoles. |
| R7 audio | 4 | Loudness dan TP sesuai target, nol dead air di tengah, SFX 89 %. Kekurangan: VO p5 hanya 2,7 dB di atas latar, dan ada dentum rendah terpotong di 132,6–132,8 di atas layar hitam. |

**Rata-rata 3,86. Tidak lulus: R6 = 3.**

**Gerbang R6:**
- **(a) Tiga hal paling amatir:**
  1. Penutup beku ±5 dtk dengan «Peran Kamu» menempel di kepala siluet, lalu fade ke hitam. Video berakhir lemah, padahal ini kalimat pesan utamanya.
  2. 4,43–6,17: shot «16 year old» di-crop sampai yang tersisa hanya kaus hitam dan dagu. Wajah subjek hilang ±1,7 dtk dan frame nyaris hitam, terbaca sebagai salah framing.
  3. Jensen: «Not gonna lose a Job» menabrak lingkar atas logo, kata «lose» tertimpa garis logo.
- **(b) Ketahuan beda kelas bila diselipkan di showreel?** Tidak lagi di bagian tengah. Ya di detik-detik akhir: penonton terakhir melihat frame diam.

### Tabel cacat
| # | Timestamp | P | Apa | Aturan | Saran |
|---|---|---|---|---|---|
| 1 | 126,25–132,8 | P1 (eskalasi: 3 putaran) | Penutup praktis statis ±5 dtk. Satu layar menyala di 126,5, setelah itu nyaris tidak ada perubahan. «Peran Kamu» diam 129–131,6 lalu fade 1,2 dtk. Dorongan kamera tidak terukur di render (selisih frame ≤ 0,4/255). Teks hanya ±15 px @540 di atas kepala siluet. | §16.2: end card tidak statis > 1,5 dtk. Kompas #10. §16.4: dua putaran gagal di butir sama berarti ganti pendekatan. | Ganti pendekatan, jangan memoles. Contoh: kamera bergerak nyata (≥ 15 % atau dolly turun dari deret layar ke siluet) selama «Peran», lalu siluet berbalik/terang tepat di «Kamu». Hold ≤ 1,5 dtk, lalu cut ke hitam di ketukan musik. Jarak teks ke kepala ≥ 40 px @1080. |
| 2 | 4,43–6,17 | P1 | Close-up «16 year old» hanya memperlihatkan kaus hitam dan leher/dagu. Frame 4,43–5,5 nyaris hitam total. Subjek tidak terbaca dan wajah terpotong. | Kompas #1; R2 satu fokus (subjek hilang). | Crop ulang supaya mata/wajah ada di sepertiga atas (punch-in ke wajah, bukan ke dada), atau tetap memakai shot medium 3,7–4,4 sampai «company». |
| 3 | 56,4–59,3 | P1 | «Not gonna lose a Job» (y ≈ 26 %) duduk tepat di lingkar atas logo cincin. Kata «lose» tertimpa garis logo. | §16.2: teks tidak tumpang tindih dengan objek. Keluhan #8 (teks di ruang kosong kiri). | Naikkan baris ≥ 30 px @1080 di atas lingkar logo, atau geser kiri ke ruang ungu polos (x 3–25 %). Alternatif: punch-in kecil supaya logo keluar frame kiri. |
| 4 | 132,60–132,80 | P2 | Dentum rendah (20–150 Hz) naik +12 dB di atas layar hitam lalu terpotong di frame terakhir. | Akhir mulus; tidak ada bunyi terpotong. | Hapus cue ekor, atau geser ke cut terakhir dan biarkan meluruh di dalam durasi. |
| 5 | 117,3–119,0 · 28,75–30,6 · 103,5–105,3 | P2 | Hold 1,7–2 dtk tanpa perubahan (selisih frame < 0,3/255). Di 117–119 60 % bawah frame kosong gelap. | §16.5 hold tanpa info baru; kompas #8. | Potong ≤ 1 dtk, atau beri dolly 3–5 % / sapuan cahaya. |
| 6 | 101,0–103,3 | P2 | Deret kartu app di 16–33 % atas, siluet nyaris keluar frame, dua per tiga bawah kosong. | Komposisi; satu fokus. | Tilt turun supaya deret di y ≈ 40 % dan siluet terlihat di bawahnya. |
| 7 | 119,75–120,5 · 54,25–55,6 | P2 | «Tertinggal» di y ≈ 74 % menempel tepi tubuh siluet besar. «Tempat Kita» di y ≈ 73 % menempel alas siluet. | Pita pesan y 36–64 %. | Naikkan ke y ≈ 55–60 % di ruang gelap kanan. |
| 8 | 13,25–14,6 | P2 | «Pengganti» melintang di leher/bahu figur garis putus-putus, teks menutupi subjek. | §16.2 teks vs subjek. Bisa disengaja (label slot kosong); bila disengaja, catat. | Bila bukan disengaja, taruh di atas lingkar kepala atau di bawah alas cahaya. |
| 9 | 25,25–28,5 | P2 | Kartu tugas kiri-atas dan dock kanan-bawah, tengah kanan kosong. Mata harus melompat diagonal. | R2 satu fokus. | Rapatkan dock ke bawah tumpukan kartu, atau kamera mengikuti kartu yang diseret. |
| 10 | 25–28 · 33,75–34,3 · 64,5–65,9 · 98,5–103,3 | P2 (ditunda Irfan) | Label UI kecil (nama file, linimasa GPT, deret aplikasi) < 22 px @1080. | R4. | Ditunda sesuai keputusan Irfan; catat saja. |
| 11 | sepanjang VO (p5) | P2 | VO p5 hanya 2,7 dB di atas latar. | Vocal dominance. | Duck bed +3 dB lebih dalam di jendela p5. |

**Diterima (keputusan Irfan/dikunci, bukan cacat):**
- dunia piktogram dan siluet;
- hitam sebagai fokus;
- cat BERLOMBA-LOMBA;
- grid biru «janji sederhana»;
- gradien langit kalender;
- grid 3×3;
- tanpa scrim;
- bidang cahaya putih miring di KREATIF/MEMBANGUN/MERENCANAKAN;
- teks narasumber di atas footage dengan shadow (Altman di atas lengan mikrofon terbaca);
- teks progress 8–10,3 di y ≈ 69 %.

### Status 9 keluhan Irfan (FEEDBACK-2NOV-0605)
| # | Keluhan | Status | Bukti |
|---|---|---|---|
| 1 | MEMBANGUN cahaya kotak kasar | **BERES** | 105,5–107,9: berkas cahaya diagonal lembut, tanpa tepi persegi. |
| 2 | Gates dobel | **BERES** | 0,0–1,43: satu figur, frame 0 sudah footage. |
| 3 | Montase teks ke tengah | **BERES** | 1,7–3,7: baris di y ≈ 52 %. |
| 4 | Teks progress di ruang kosong | **BERES** | 8,25–10,3: di bawah kartu, tidak menimpa presenter. |
| 5 | «AI» hitam di belakang Wikipedia | **BERES** | 19,5–23,0: tidak ada. |
| 6 | «janji sederhana» | **BERES** | 23,75–25,2: dua kata, tanpa kotak. |
| 7 | Kalender nyata | **BERES** | 34,5–36,6: kalender Oktober, blok menyusut. |
| 8 | Jensen full frame, teks per kata di kiri | **SEBAGIAN** | Full frame dan per kata sudah. Baris masih menabrak logo cincin (cacat #3). |
| 9 | Altman per kata besar di tengah, BILLION | **BERES** | 71,9–75,2: satu kata per beat di y ≈ 58 %, ±130 px, «Billion» kuning, kata saling menggantikan. |

**Rekap: 8 BERES, 1 SEBAGIAN.**

### VERDICT: **NO-SHIP**
- 0 P0, tetapi R6 = 3 (< 4).
- Jalur ke SHIP:
  1. Penutup dengan pendekatan baru (cacat #1).
  2. Crop ulang 16 year old (#2).
  3. Jensen menjauh dari logo (#3).
  4. Hapus dentum ekor (#4).
- Keempatnya kecil dan lokal. Setelah itu R6 kemungkinan naik ke 4, dengan syarat penutup benar-benar bergerak di render (ukur selisih frame, jangan hanya membaca kode).

## Keputusan Claude utama atas Putaran 3
- Tidak ada P0; jalur ke SHIP: (1) penutup pendekatan baru (piktogram menyala di «Kamu» + push-in nyata ≥ 15 %, hold ≤ 1,5 s, gerak diukur dari render), (2) crop ulang close-up «16 year old», (3) reframe Jensen agar teks tidak menabrak logo, (4) dentum ekor — SELESAI (fade bed/SFX/room 131,6–132,6 s; VO berakhir 129,7 s).
- Diterima tanpa perubahan: hold ruang piktogram 1,7–2 s (gelap = fokus), «Pengganti» di bahu figur (disengaja: kata di belakang/di antara piktogram), label UI kecil (ditunda), VO p5 2,7 dB (median 15,2 dB; di atas target 0 dB).
- Ditunda untuk Irfan: deret kartu app 101–103 s di sepertiga atas; komposisi 25–28 s; «Tertinggal»/«Tempat kita» di y ≈ 73 % (dalam safe zone, di luar pita pesan).

## Putaran 4 (R6 segar)
Bahan: `PKS_v10_r4_preview.mp4` (960×540, 132,8 s), dinilai dari render saja. Bahan visual: contact sheet 4 fps (14 lembar), strip 30 fps ±0,27 s di 36 cut/transisi (termasuk awal & akhir montase), strip 15 fps di teks pendek, still 960 px penutup 126–132,2. Numerik: deteksi scene (90 titik), YDIF per frame untuk hold statis, ebur128, RMS 100 ms, porsi 2–6 kHz.

### Angka terukur (ulang oleh R6)
- Loudness −14,0 LUFS, LRA 2,4 LU. Porsi energi 2–6 kHz di mix: 3,9 %.
- Tidak ada jendela 100 ms < −45 dBFS sepanjang 0–132,0 s (tidak ada dead air di perpindahan pembicara). Ekor: −14 dB di 126 s, turun mulus ke −46 dB di 132,0 dan senyap di 132,6. Tidak ada dentum terpotong.
- Hold statis ≥ 1,2 s (YDIF < 0,25): 28,73–29,93 (1,2 s); 103,67–105,47 (1,8 s); **129,47–131,50 (2,0 s, penutup)**. Selisih absolut rata-rata frame 129,5 vs 131,4 = 2,0/255 (setara noise JPEG). Baris teks «Peran Kamu» sama persis.
- Tidak ada flash (lonjakan luma > 40 dalam 1 frame) dan tidak ada frame hitam di tengah video.
- Angka pembuat (SFX 89 %, VO p50 15,2 dB / p5 2,7 dB, SFX > 5 kHz 4,8 %, TP −1,3) diterima. Tidak saya ulang per cue.

### Skor rubrik
| R | Skor | Alasan |
|---|---|---|
| R1 timing di ketukan | 4 | Kata masuk mengikuti VO, termasuk montase «Technical thing ever in my lifetime» (cut ±0,25 s) dan Altman per kata. Cut mendarat di akhir frase. Dua teks terlalu singkat untuk dibaca: «Sukses» ±0,47 s, «Tertinggal» tepat 0,8 s. |
| R2 satu fokus | 4 | Mayoritas frame satu pesan. Masih ada frame berat sebelah: 101–103 (deret app di sepertiga atas), 115–119,7 (layar kecil di atas, 60 % bawah gelap), 25–28 (kartu kiri-atas vs dock kanan-bawah). Sudah ditunda Irfan. |
| R3 konsistensi karakter | 4 | Bahasa piktogram, siluet, garis putus-putus dan bidang cahaya miring konsisten dari 12,7 s sampai penutup. Footage narasumber konsisten diberi grade gelap. |
| R4 keterbacaan HP | 4 | Teks pesan besar, kontras, Geist konsisten. Teks narasumber ≈ 56 px @1080. Label UI kecil masih < 22 px (ditunda). «Sukses» 0,47 s di bawah ambang 0,8 s. |
| R5 kebenaran produk | 4 | UI didemokan seperti dipakai: prompt diketik per huruf, @mention agen, kalender menyusut, centang tugas, chat «tolong balas oke siap». Wikipedia dan kartu GPT-3→GPT-5 masuk akal. |
| R6 setara referensi | 4 | Kompas lulus. #1 1 frame = 1 pesan, ya. #3 kinetik ikut suara, ya. #4 transisi termotivasi: zoom-through ikon 12,6, match-cut Altman ke kartu 75,2, wipe siluet 98,5. #7 UI didemokan, ya. #10 akhir mulus: penutup kini punya push-in + siluet menyala di «Kamu» (128–129,5) lalu fade. Yang masih membedakan dari referensi: hold gelap 2 s di penutup dan dua ruang piktogram yang terasa kosong (115–119, 101–103). Itu menurunkan kelas, tetapi tidak sampai "langsung ketahuan" di showreel. |
| R7 audio | 4 | −14 LUFS, tanpa dead air, ekor bersih, 2–6 kHz rendah, SFX ≥ 85 %. VO p5 hanya 2,7 dB di atas latar: di HP pada momen paling ramai VO bisa tertutup. |

- Rata-rata 4,0.
- Catatan: gerbang R6 §16.4 (rata-rata ≥ 4,5) belum tercapai. Aturan SHIP putaran ini (0 P0 dan semua ≥ 4) terpenuhi.

### (a) Tiga hal paling amatir
1. Penutup tetap beku ±2 s (129,5–131,5) setelah push-in berhenti, lalu fade. Gerak sudah ada, tetapi berhenti terlalu cepat.
2. «Sukses» (78,17–78,6) hanya ±0,47 s. Kata kunci di frase «satu sukses» hilang sebelum terbaca.
3. Ruang piktogram 115,3–119,7 dan 101–103: layar/deret kecil di sepertiga atas, sisanya gelap kosong. Terasa seperti menunggu, bukan fokus.

**(b) Ketahuan beda kelas di showreel?**
- Tidak untuk 0–100 s.
- Di 100–120 dan beberapa detik terakhir ada jeda yang lebih sabar daripada referensi, tetapi tidak merusak.

### Tabel cacat
| # | Timestamp | P | Apa | Aturan | Saran |
|---|---|---|---|---|---|
| 1 | 129,47–131,50 | P2 | Push-in + siluet menyala di «Kamu» sudah bekerja (128–129,5). Setelah itu frame diam 2,0 s (MAD 2,0/255), baru fade 131,5–132,3. Melewati batas 0,5 s. | §16.2: end card tidak statis > 1,5 s. Kompas #10. | Lanjutkan push-in sangat pelan (2–3 %) sampai fade, atau mulai fade 0,5 s lebih awal. Jangan mengubah pendekatannya lagi. |
| 2 | 78,17–78,60 | P2 | «Sukses» tampil ±0,47 s, lalu langsung hilang ke transisi grid. | §16.0: teks diam ≥ 0,8 s saat dibaca. | Tahan sampai ≥ 0,8 s, misalnya geser masuknya 0,3 s lebih awal atau mundurkan transisi grid. |
| 3 | 19,53–19,63 | P2 | Cut dari ruang gelap «Lebih Cepat» ke 3 frame putih nyaris kosong (Wikipedia baru fade-in). Lonjakan terang dari gelap ke putih terasa seperti flash ringan. | §16.2: tidak ada frame kosong di serah-terima. | Biarkan kartu Wikipedia sudah 60–80 % terlihat di frame pertama setelah cut. |
| 4 | 115,3–119,7 | P2 (ditunda) | Ruang dengan layar kecil di sepertiga atas dan siluet di kiri, 60 % frame gelap kosong selama ±4 s. | R2; kompas #8. | Dolly 3–5 % atau sapuan cahaya selama hold. |
| 5 | 101,0–103,3 | P2 (ditunda Irfan) | Deret kartu app di 16–33 % atas, dua per tiga bawah kosong. | Komposisi. | Tilt turun. |
| 6 | 54,25–55,6 · 119,75–120,5 | P2 (ditunda Irfan) | «Tempat Kita» / «Tertinggal» di y ≈ 73–74 %, di luar pita pesan. «Tertinggal» tepat 0,8 s. | Pita 36–64 %. | Naikkan ke y ≈ 55–60 %. |
| 7 | 25,2–28,5 | P2 (ditunda Irfan) | Kartu kiri-atas, dock kanan-bawah. | R2. | Seperti putaran 3. |
| 8 | 25–28 · 64,5–65,9 · 98,5–103 | P2 (ditunda Irfan) | Label UI < 22 px @1080. | R4. | Ditunda. |
| 9 | sepanjang VO (p5) | P2 | VO p5 2,7 dB di atas latar. | Vocal dominance. | Duck bed lebih dalam di jendela p5. Opsional. |

**Diterima (bukan cacat):**
- hitam/piktogram sebagai fokus, termasuk hold 28,7–29,9 dan 103,7–105,5;
- «Pengganti» di bahu figur;
- CONTR saat kata masuk blur → tajam;
- bidang cahaya putih miring KREATIF/MEMBANGUN/MERENCANAKAN;
- teks narasumber di atas footage (Gates, «16 year old» di dada, Jensen, Altman);
- fade ke hitam di akhir;
- semua bagian di LOCKED.md.

**Terverifikasi beres dari putaran 3:**
- close-up «16 year old» kini memperlihatkan wajah (4,43–6,2);
- Jensen: baris di atas logo dengan jarak ±80 px @1080, tidak menabrak garis;
- dentum ekor hilang dan audio meluruh bersih;
- penutup punya gerak dan aksen cahaya nyata di «Kamu».

### Status 9 keluhan Irfan (FEEDBACK-2NOV-0605)
| # | Keluhan | Status | Bukti |
|---|---|---|---|
| 1 | MEMBANGUN cahaya kotak kasar | **BERES** | 105,5–108: berkas cahaya diagonal berfalloff, tanpa tepi persegi. |
| 2 | Gates dobel | **BERES** | 0–1,43: satu figur. |
| 3 | Montase teks ke tengah | **BERES** | 1,7–3,7: baris di tengah frame. |
| 4 | Teks progress di ruang kosong | **BERES** | 8,3–10,3: di bawah kartu, tidak menimpa presenter. |
| 5 | «AI» hitam di belakang Wikipedia | **BERES** | 19,5–23: tidak ada. |
| 6 | «janji sederhana» | **BERES** | 23,75–25,2: dua kata, tanpa kotak. |
| 7 | Kalender nyata | **BERES** | 34,5–36,6: kalender Oktober 2026, blok menyusut. |
| 8 | Jensen full frame, per kata di kiri | **BERES** | 55,9–61,2: full frame, per kata, di atas logo tanpa tabrakan. |
| 9 | Altman per kata besar di tengah, BILLION | **BERES** | 71,9–75,2: satu kata per beat, «Billion» kuning. |

**Rekap: 9/9 BERES.**

### VERDICT: **SHIP**
- 0 P0, 0 P1, semua rubrik = 4.
- Catatan jujur: skor ini di ambang. Rata-rata 4,0 belum mencapai target gerbang R6 §16.4 (4,5).
- Disarankan sebelum render final, murah dan lokal:
  1. P2 #1: lanjutkan push-in sampai fade, atau fade 0,5 s lebih awal.
  2. P2 #2: «Sukses» ≥ 0,8 s.
  3. P2 #3: frame pertama Wikipedia tidak kosong.
- Ketiganya tidak memblokir.

## Keputusan Claude utama atas Putaran 4
- VERDICT reviewer: **SHIP** (0 P0, 0 P1, semua rubrik 4; 9/9 keluhan Irfan BERES). Gerbang §16.4 R6 ≥ 4,5 belum tercapai — dilaporkan apa adanya ke Irfan.
- Tiga P2 yang disarankan diperbaiki sebelum render final: penutup hold 2,0 s → fade dimulai 0,5 s lebih awal (hold ≤ 1,5 s); «Sukses» ditahan sampai cut (≥ 0,8 s); masuk 02a tanpa 3 frame putih kosong (kartu & foto sudah tampil di frame pertama — terverifikasi still f585–590).
- Sisa P2 ditunda untuk Irfan: ruang gelap kosong 101–103 & 115–120, «Tempat kita»/«Tertinggal» di y ≈ 73 %, komposisi 25–28, label UI kecil, VO p5 2,7 dB.
