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
