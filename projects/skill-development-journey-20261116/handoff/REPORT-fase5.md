# REPORT-fase5 · finishing (koordinator fase 5, 17 Nov 2026, tanpa commit)
Master gambar: qc/master_gambar.mp4 (lego/lego_master_gambar.json = lego.json tanpa audio, compose.py; 1920x1080, 30 fps sesuai lego.json (bukan 29,97), 2500 frame = 83,33 dtk, H264 crf14, 92 MB). Pratinjau gambar+mix tanpa musik: qc/master_gambar_mix-tanpa-musik.mp4 (audio/mix_tanpa-musik.wav pasca M1-M5, 01:11).
compose --cek PASS (130 lapisan). Frame 960x540 di qc/frames; lembar via frame_audit.py (cuts = batas 14 klip dasar, cues = audio/cues.json, kata = edit/words.json, stem suara + SFX tanpa-musik).
Audit: 9 potongan (c01..c09, 84 lembar), 2 pemeriksa blind per potongan: #1 Codex (gpt) dan #2 Claude Sonnet claude1; tanpa fallback claude2. Mentah: VERDICT_gpt.md, VERDICT_sonnet.md; gabungan: VERDICT.md; ringkas: qc/frame_audit/INDEX.md.
Kesepakatan pemeriksa: 76% detik (64/84 bersih/cocok), putusan potongan sama 6/9 (tak ada potongan LULUS dua-duanya). Temuan tanpa frame dibuang: 0. Aturan cocok: jenis sama dan frame +-3.
TEMUAN DISEPAKATI (6, dua pemeriksa): 9s/f285/visual (Geser label keluar dari lintasan maskot agar teks dan wajah ); 34s/f1027/audio (Tambahkan whoosh lembut sekitar 34,2 detik untuk mendukung t); 49s/f1497/audio (Perlu cue geser sekitar 49,90 detik untuk mengikuti masuknya); 53s/f1606/lompat (Pertahankan framing setelah f1601 atau buat perubahan skala ); 66s/f1988/visual (Sisakan ruang untuk subtitle di atas kartu sepanjang gerakan); 71s/f2146/audio (Tambahkan satu whoosh pendek sekitar 71,5 detik untuk mengir).
Isi: 9s Label 'Claude,' menutupi wajah maskot; 34s/49s/71s tanpa cue SFX di transisi lingkaran wajah, kartu kedua masuk, zoom kartu ke wajah; 53s patah framing f1601 lalu f1606; 66s subtitle 'untuk meminimalisir' menimpa bilah judul kartu putih.
PERLU PUTUS SUTRADARA (25, satu pemeriksa saja; G=Codex S=Sonnet; lembar = qc/frame_audit/<potongan>/s<detik>.0.jpg, detail+usul di VERDICT.md potongan): 1s f55 aud S; 18s f541 vis G; 20s f620 vis S; 34s f1026 kcc S; 34s f1027 trs G; 37s f1126 vis S; 37s f1130 lmp G; 37s f1138 trs S; 42s f1275 vis S; 46s f1382 kcc S; 46s f1386 vis S; 48s f1446 kcc S; 49s f1478 lmp G; 50s f1515 aud S; 53s f1594 aud S; 58s f1769 kcc G; 62s f1884 aud S; 67s f2022 vis G; 67s f2034 vis S; 71s f2142 lmp S; 72s f2180 vis S; 73s f2215 lmp G; 76s f2284 kcc S; 78s f2359 aud S; 83s f2499 kdp G.
Catatan untuk memutus: temuan Sonnet 'teks hero tertutup kepala' (20s AI SLOP, 37s WORKFLOW-NYA, 42s BALIK MODAL, 72s FULL AI) bisa jadi teks-di-belakang-wajah yang disengaja (cek DESAIN); temuan 'kecocokan' (34s, 46s, 47s, 58s, 76s) menyangkut teks frasa muncul sebelum kata diucapkan; 83s kedip (G) vs akhir disengaja (S).
Potongan PUTUSAN: semua GAGAL di VERDICT.md (ada temuan disepakati atau menunggu putusan); render.sh final tetap menolak sampai Sutradara memutus dan potongan terkait diaudit ulang. Adegan tidak diubah, tidak ada render final bervarian.
Disk: / sisa 5 GB sebelum dan sesudah (>= 3 GB), tidak ada yang dihapus. Tambahan proyek: master 92 MB + mix 98 MB + frames 112 MB + lembar.
Sebelumnya di bus: edit/ dilaporkan diganti kandidat R5 (words.json 'CANDIDATE_NOT_LOCKED' tetapi ORDER.json menunjuk sha words yang sama); kata di INFO.md diambil dari edit/words.json. Sutradara cek bila R6 punya words lain.

## Ronde 2 (17 Nov, master 2496 f 29,97 fps, mix_tanpa-musik 01:50)
Frame/lembar dibuat ulang dari master baru (lembar 29 frame, nama s<detik mulai>.jpg; 9 potongan), prompt + VERDICT.prev.md + baris 'teks di belakang kepala = disengaja'. Pemeriksa: Codex (gpt) dan Claude Sonnet; claude1 gagal 2x di semua potongan -> pakai akun claude2 (dicatat di sonnet.fallback). Mentah ronde 1: VERDICT_*.r1.md.
Kesepakatan 79/88 detik = 90%; putusan potongan sama 5/9; potongan LULUS dua-duanya: hanya c09 (80,1-83,3 dtk).
DISEPAKATI (3): 18s f550 visual; 37s f1129 lompat; 69s f2093 transisi. Isi: 18s subtitle 'kalau dari pandanganku' tertimpa stiker '!!'; 37s lompat pose/zoom di f1129; 69s 'pembelajaran' menimpa 'loop'.
PERLU PUTUS (9; G=Codex S=Sonnet; detail + path lembar di VERDICT.md potongan): 9s f286 vis S; 19s f596 vis S; 28s f868 kcc S; 34s f1025 trs G; 43s f1308 vis S; 47s f1425 kdp G; 53s f1593 aud S; 62s f1881 aud S; 78s f2364 trs G.
Catatan: ulangan ronde 1 yang dinilai masih terlihat: 9s label 'Claude,' vs maskot, 18s/19s stiker '!!', 34s bidang putih masker lingkaran, 37s f1129, 53s kartu keluar tanpa SFX, 62s ganti adegan (cek perbaikan sudah masuk master 01:42); baru: 43s 'habis banget' tanpa spasi, 47s 'Pro' 1 frame, 78s 'gak?'/'Atau' bertumpuk, 29s 'Apple style' vs transkrip 'Apple's Tale'.
Semua potongan selain c09 PUTUSAN: GAGAL, maka master TIDAK digabung ke varian-A/B/tanpa-musik (out/ tidak dibuat). Menunggu putusan Sutradara.
Disk: / sisa ~4 GB, tidak ada penghapusan.

## Ronde 3 (17 Nov, master 2496 f 02:26, mix 02:31-02:32 pasca revisi audit 2)
Frame/lembar dibuat ulang, 9 potongan; prompt + VERDICT.prev.md + 'teks di belakang kepala = disengaja' + 'Apple style benar'. claude1 masih limit (reset 03:40), Sonnet lewat claude2 di semua potongan. Mentah ronde 2: VERDICT_*.r2.md.
Hasil: Codex LULUS 9/9. Sonnet LULUS 4/9 (c03, c04, c05, c09), GAGAL 5. Kesepakatan 82/88 detik = 93%; temuan disepakati = 0; PERLU PUTUS = 6, semua hanya Sonnet (jenis sama tidak ada di Codex).
PERLU PUTUS (lembar di VERDICT.md potongan): 9s f286 visual S (Geser "Claude," ke kanan seperti ChatGPT dan Gemini, atau naikkan bebe); 16s f483 kedip S (Perpanjang kotak jadi sekitar 6-10 frame dengan fade-out, atau hapus. ); 58s f1756 visual S (Beri outline atau bayangan gelap pada subtitle di adegan ini, atau ges); 66s f1980 audio S (Tambah cue transisi (woosh pendek, seperti 'Woosh.mp3' di 62,76) di se); 78s f2355 kecocokan S (Majukan penggantian titik-titik ke teks agar tiba sekitar f2340-2342, ); 79s f2384 kecocokan S (Munculkan 'masih kerasa' sekitar f2369-2372, lalu 'AI?' di sekitar f23).
Catatan: 9s 'Claude,' vs maskot dan 66s tanpa SFX transisi adalah ulangan Sonnet dari ronde 1/2 (Codex tidak menemukan); 78s/79s gelembung titik-titik lama sebelum teks.
Karena belum semua LULUS: out/kandidat-varian-A.mp4, out/kandidat-varian-B.mp4, out/kandidat-tanpa-musik.mp4 (master -c:v copy + AAC 320k 48 kHz stereo). ffprobe: video 2496 f 30000/1001 83,2832 dtk; audio 83,264 dtk (selisih 19 ms < 1 frame); lag audio terhadap mix WAV 0 sampel, korelasi 0,9998 (20 dtk pertama). qc/VERDICT.md gabungan belum LULUS (belum ditulis).
Disk / sisa ~4 GB; tidak ada penghapusan; kandidat ±300 MB.

## Ronde 4 (potongan berubah, 17 Nov, master 02:56, mix 02:58, audit 3 di REPORT-audio)
frame_audit ulang: 3 potongan dipakai ulang (c01, c04, c05; HASH sama), 6 perlu periksa (c02, c03, c06, c07, c08, c09) dikirim ke Codex + Sonnet blind dengan VERDICT.prev.md, catatan teks di belakang kepala, Apple style benar, dan putusan DISMISS 9 dtk. claude1 masih limit, Sonnet lewat claude2.
Hasil: Codex LULUS 6/6; Sonnet LULUS 6/6. Satu-satunya temuan tersisa di seluruh video: Sonnet 9s f286 'Claude,' vs maskot (c01, ulangan, sudah di-DISMISS Sutradara) -> c01 LULUS. Kesepakatan 87/88 detik = 99%. Semua 9 VERDICT.md PUTUSAN: LULUS; qc/VERDICT.md gabungan PUTUSAN: LULUS.
Final: out/varian-A.mp4, out/varian-B.mp4, out/tanpa-musik.mp4 (-c:v copy dari master, AAC 320k 48 kHz). ffprobe: 2496 f 30000/1001, video 83,2832 dtk, audio 83,264 dtk (selisih 19 ms < 1 frame), stream video identik master, lag audio 0 sampel, korelasi 0,9998. out/kandidat-*.mp4 dihapus.
Disk / ±4 GB; tidak ada penghapusan lain.

## Ronde 5 (kurva kamera, 17 Nov, master 03:59 2496 f; mix tidak diulang)
objects.json IDENTIK (builder), mix 02:58 dipakai. audio_order check audio/order-A|B: hanya tahap visual basi ('master_gambar.mp4 berubah sejak dikunci'); suara/sfx/musik tetap OK; belum dikunci ulang (urusan penata suara). Durasi mix 83,2832 = master.
Audit ulang: c07 dipakai ulang (HASH sama, LULUS); 8 potongan diperiksa blind: Codex LULUS 9/9; Sonnet (claude1, tanpa fallback) LULUS c06-c09, GAGAL c01-c05. Disepakati 0; kesepakatan 81/88 detik = 92%.
PERLU PUTUS (hanya Sonnet): 3s f95 'selesai' hijau di atas header commit; 14s f428 maskot ganti bentuk 1 frame; 21s f640 bingkai neon jatuh tanpa SFX; 37s f1129 lompat/blur wajah (ulangan, footage + punch) dan 37s f1135 caption 'Jadi' vs hero; 42s f1285 kepala loncat; 47s f1427 kartu masuk tanpa SFX; 48s f1439 hitung 20x telat. Codex tidak menemukan satu pun.
Drive TIDAK diganti (tak ada keputusan LULUS). Kandidat siap: out/kandidat-{varian-A,varian-B,tanpa-musik}.mp4 (-c:v copy, AAC 320k; 2496 f, audio 83,264 dtk). out/varian-*.mp4 lama tetap. qc/VERDICT.md gabungan diubah jadi DITANGGUHKAN (GAGAL) sampai diputus. Disk 3 GB.

## Ronde 6 (17 Nov, master 15:33 2512 f / 83,817 dtk, mix 15:38-15:39, sinkron Revisi-2)
Frame/lembar dibuat ulang (9 potongan, semua HASH berubah); words dari edit/words.json, cues audio/cues.json, stem suara + SFX tanpa-musik; prompt blind + VERDICT.prev.md + catatan (teks di belakang kepala, Apple style, komentar IG dan nama akun generik, meja 3D Blender, karakter pixel). Sonnet via claude2 (claude1 gagal) di semua potongan. Codex c09 membalas prosa LULUS (dibaca sebagai tanpa temuan).
LULUS dua-duanya: c01, c02, c04, c09. Kesepakatan 79/88 detik = 90%. Final TIDAK digabung/diunggah (ada temuan).
DISEPAKATI (1): 76s f2289 kedip (Codex+Sonnet) | usul: Ganti isi f2289 dengan kelanjutan shot pembicara. | lembar c08_070.1-080.1s/s075.9.jpg
PERLU PUTUS (9, satu pemeriksa; G=Codex S=Sonnet):
 - 21s f646 audio S | usul: Tambah whoosh/slide pendek atau glitch ringan di sekitar f644–f650 supaya runtuhnya bingkai terdengar. Jangan  | lembar c03_020.0-030.0s/s021.0.jpg
 - 28s f867 audio S | usul: Tambah bunyi ketikan keyboard pendek, satu klik per huruf atau satu rentetan, pada f867–f878, dengan level ren | lembar c03_020.0-030.0s/s028.7.jpg
 - 29s f889 kedip S | usul: Pastikan isi input tetap '/apple' sampai f896 (klik Enter), lalu ganti jadi '/apple-style' dan jangan kembali  | lembar c03_020.0-030.0s/s028.7.jpg
 - 48s f1458 kecocokan S | usul: Majukan hitungan naik supaya mulai sekitar f1445–1450 dan mencapai 20× tepat di f1452–1455 (kata "20" dan "kal | lembar c05_040.0-050.1s/s047.8.jpg
 - 50s f1515 kecocokan G | usul: Samakan nama paket pada kartu dengan ucapan dan caption. | lembar c06_050.1-060.1s/s050.1.jpg
 - 58s f1766 visual S | usul: Hapus teks LINTAS AGENT tepat di potong adegan f1766 (teks sudah hilang saat Woosh 58.97). Atau lepas matte ke | lembar c06_050.1-060.1s/s058.8.jpg
 - 68s f2042 audio S | usul: Geser cue 68,17 ke sekitar 68,75–68,85 dtk (f2060–2062), saat tooltip mendarat di dock. Atau tambah satu cue p | lembar c07_060.1-070.1s/s067.8.jpg
 - 69s f2070 kedip G | usul: Pertahankan visibilitas kartu pada kedua frame tersebut agar tidak berkedip. | lembar c07_060.1-070.1s/s068.8.jpg
 - 79s f2368 visual G | usul: Geser seluruh kata ke dalam bidang video agar terbaca dan tidak menimpa ikon. | lembar c08_070.1-080.1s/s078.8.jpg
Catatan: 28s/29s soal '/apple' (S) menyangkut layar ketik; 50s G: kartu berlabel 'Claude Max' vs ucapan/caption 'Claude Pro'; 76s f2289 satu frame meja 3D menyela shot wajah = temuan kuat (dua pemeriksa). qc/VERDICT.md tetap DITANGGUHKAN/GAGAL. Disk 3 GB.

## Ronde 7 (17 Nov, master 16:38 2512 f, mix 16:18 tak berubah menurut REPORT-audio, lock b208562a, kunci ulang PASS)
frame_audit ulang: c01, c02 dipakai ulang (HASH sama, LULUS); c03-c09 diperiksa blind Codex + Sonnet (claude2 langsung, claude1 dipakai Opus) dengan VERDICT.prev.md, semua catatan disengaja, dan dismiss 48s (hitung 20x) + 50s ('Claude Max').
Codex LULUS 6/7, Sonnet LULUS 6/7; DISEPAKATI 0; kesepakatan 86/88 detik = 98%. Dua temuan BARU, masing-masing satu pemeriksa:
 - 39s f1187 kedip (Codex, c04): caption 'gak langsung publish' lenyap f1187-1189 lalu 'dan' di f1190 (jeda 3 frame tanpa caption; saya cek montase: benar ada celah, tampak pergantian frasa). Usul: majukan/tahan frasa sampai pergantian berikutnya. Lembar c04_030.0-040.0s/s039.0.jpg.
 - 76s f2300 transisi (Sonnet, c08): saat video menyusut ke kartu IG (f2298-2302) kotak hitam di belakang video tertinggal/menonjol atas-bawah ~5 frame. Usul: satukan gerak kotak hitam dengan video. Lembar c08_070.1-080.1s/s075.9.jpg (di montase saya kotak hitam tampak di atas video, bentuk stabil).
Ada temuan baru, maka final TIDAK digabung dan TIDAK diunggah; qc/VERDICT.md tetap GAGAL/ditangguhkan; Drive tetap versi lama. Disk 3 GB.


## Ronde 8 (17 Nov petang; master 18:26 2512 f, mix 16:18 tak berubah, lock visual 761053891751d179)
Semua 9 HASH berubah (re-encode) maka 9 potongan diaudit blind: Codex LULUS 8/9 dan Sonnet LULUS 8/9 (claude2 langsung), dengan VERDICT.prev.md, semua catatan disengaja (+B4a berbobot kiri) dan dismiss 48s/50s. Disepakati 0; hanya c01-c05 dan c07 LULUS dua-duanya. Perbaikan ronde 7 (39s celah KT, 76s kotak hitam) tidak diangkat lagi.
3 temuan baru satu-pemeriksa: (1) 58s f1766 transisi, Codex (c06): sisa judul 'LINTAS AGENT'/matte satu frame setelah cut; lembar c06_050.1-060.1s/s058.8.jpg; montase f1764-1768 saya tidak menunjukkan sisa teks (tampak bersih, caption 'Bahkan'). (2) 70s f2107 visual, Codex (c08): 'pembelajaran' membesar lewat tepi kanan 1 frame; lembar c08_070.1-080.1s/s070.1.jpg (montase f2105-2109 tidak memperlihatkan kata itu). (3) 80s f2418 lompat, Sonnet (c09): bingkai kartu komentar bergeser 1 frame (skor 26,1, ikon sidebar muncul); lembar c09_080.1-083.8s/s080.1.jpg; Codex menilai itu penataan ulang disengaja di ronde 6 dan 8.
Temuan baru maka final TIDAK digabung/diunggah; qc/VERDICT.md tetap GAGAL/ditangguhkan; Drive tetap versi lama. Disk 11 GB.

## Ronde 9 (17 Nov malam; master 18:47 2512 f, mix 16:18 tak berubah, lock visual c273a676, kunci audio PASS)
frame_audit: c01-c05 HASH sama, c06-c09 berubah; semua 9 tetap diperiksa blind Codex + Sonnet (claude2) dengan VERDICT.prev.md, semua catatan disengaja, dismiss 48s/50s. Codex LULUS 9/9; Sonnet LULUS 7/9. Disepakati 0. Perbaikan 58s/70s/80s tidak diangkat lagi.
2 temuan, satu pemeriksa (Sonnet): (1) 59s f1788 kecocokan (c06): caption tetap 'Bahkan' sampai f1799 padahal 'chat' diucap 59,70 dtk (f1788) dan 'GPT' 59,87; usul 'Bahkan chat' di f1788 lalu 'Bahkan chat GPT' ±59,87; lembar c06_050.1-060.1s/s058.8.jpg (ulangan item ronde 1-2 di area ini). (2) 76s f2282 audio (c08): lingkaran wajah membesar jadi layar penuh (f2280-2285) tanpa cue SFX +-0,3 dtk (pop up 75,64 dan Woosh 76,41 sekitar 0,3-0,4 dtk dari momen); usul Woosh pendek atau geser Woosh 76,41 ke ±76,0; lembar c08_070.1-080.1s/s075.9.jpg.
Karena ada temuan: final TIDAK digabung/diunggah; qc/VERDICT.md tetap GAGAL/ditangguhkan; Drive tetap versi lama. Disk 11 GB.

## Keputusan akhir (17 Nov malam)
G3: kedua temuan ronde 9 di-DISMISS Sutradara; qc/VERDICT.md PUTUSAN: LULUS. Final dibuat dari master c273a676 (-c:v copy, AAC 320k 48 kHz): 2512 f, 83,817 dtk, stream video identik master, lag audio 0 sampel, korelasi 0,9998, decode tanpa galat. Diunggah menimpa ke Drive.
