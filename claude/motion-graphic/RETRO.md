# RETRO · catatan pelajaran per gerbang

Format dan aturan: lihat MOTION-SYSTEM.md §8. Entri terbaru di bawah.

### 2026-10-13/14 · Tuntunly launch · v15 (entri awal, ditulis dari sesi perencanaan)
Revisi Irfan: efek "neon stroke" salah tafsir; file kerja terhapus cleanup; prompt terbaca build ulang; objek pengisi tanpa makna; transisi putus; tokoh hilang di tengah; Lupakan kurang dramatis; PDF digambar sebagai kertas.
Akar masalah: efek dideskripsikan dengan kata tanpa video acuan; tidak ada larangan menghapus; tidak ada definisi "revisi"; tidak ada aturan makna objek, peta transisi, dan kehadiran karakter.
Usulan aturan: semuanya sudah dituangkan ke TYPE-STYLES.md (G4 color flash, larangan) dan MOTION-SYSTEM.md §1–7.
Status: diterapkan

### 2026-10-17 · Jadisatu launch · gerbang script (sebelum storyboard)
Revisi Irfan: agent membuat audio (3x generate ElevenLabs, ±7.300 kredit) dan mulai menulis kode build sebelum script final dan storyboard disetujui; agent tidak membaca skill & standar dari proyek Tuntunly lebih dulu.
Akar masalah: (1) skill irfan-motion-director, MOTION-SYSTEM.md, TYPE-STYLES.md, RETRO.md versi terbaru hanya ada di ~/Proyek/video-editor/skills, tidak tersinkron ke sesi cloud, dan tidak ada aturan "ambil skill dari Mac dulu"; (2) urutan gerbang di irfan-motion-director §3 tidak menyebut audio secara eksplisit, sehingga agent menganggap VO boleh dibuat lebih awal untuk timing.
Usulan aturan: tambahkan ke irfan-motion-director §3 sebagai langkah 0 dan aturan audio: "0. Sebelum menulis apa pun, muat ketiga skill + MOTION-SYSTEM + TYPE-STYLES + RETRO dari ~/Proyek/video-editor/skills (minta akses folder jika perlu). Urutan gerbang dikunci: Script final → Storyboard 100% (+ TYPE-TEST & TRANSITION-SHEET) → disetujui → baru audio (VO/SFX/musik) → build. Dilarang generate audio berbayar sebelum script final disetujui Irfan."
Status: menunggu persetujuan

### 2026-10-17 · Jadisatu launch · gerbang build (animatic)
Revisi Irfan: "Video dibangun horizontal dengan style desain premium seperti referensi (rules ada di skill proyek Tuntunly)". Animatic dibangun 1080×1920 (vertikal) dengan gaya slide/kartu yang belum setara referensi ssspin.
Akar masalah: (1) format master tidak dicek ke preseden Tuntunly (STANDAR-KUALITAS: master 16:9 1920×1080 yang ditonton di HP) dan ke referensi gaya proyek (ref_gaya_ssspin.mp4 horizontal); (2) agent tidak membaca docs/brief/STANDAR-KUALITAS.md di ~/Proyek/tuntunly-motion sebelum build, karena dokumen itu tidak dirujuk dari skill; (3) TYPE-TEST + TRANSITION-SHEET (MOTION-SYSTEM §7) dilewati sebelum build.
Usulan aturan: tambahkan ke MOTION-SYSTEM §7: "Sebelum build, kunci format master (default 16:9 1920×1080 untuk ditonton di HP, kecuali Irfan menyebut lain) dan bandingkan satu style frame per adegan berdampingan dengan referensi gaya proyek. Baca ~/Proyek/tuntunly-motion/docs/brief/STANDAR-KUALITAS.md (Kompas premium, ukuran tipografi 16:9, rubrik R1–R7) di setiap proyek video baru."
Status: menunggu persetujuan

### 2026-10-17 · Jadisatu launch · gerbang style frame horizontal
Revisi Irfan: (1) gambar storyboard dipakai sebagai background utuh lalu ditumpuk teks — storyboard adalah referensi komposisi, bukan aset final; adegan harus dibangun dari elemen terpisah (plate latar, karakter, meja/monitor/properti, UI, teks) dengan depth nyata; objek utama 3D low-poly bila kamera pindah sudut; sprite pixel tidak boleh diputar seperti kartu pipih. (2) Builder Trap = family tipografi gelap 2D: "{ Builder / Trap }", gradient, percikan, typing; tanpa labirin. (3) Canvas putih tetap UI datar, elemen (avatar outline berwarna, cursor, kartu, konektor) bergerak independen, bukan UI 3D. (4) Teks bawaan storyboard tidak boleh terbawa; tidak menumpuk teks baru di atas teks tercetak; tidak ada teks di luar voiceover.full_text (contoh salah: "Rp47.000.000", tambahan "belum cukup bagus"). (5) Validasi satu adegan dengan preview bergerak sebelum menerapkan ke semua adegan.
Akar masalah: tidak ada aturan "storyboard = referensi, bukan aset"; tidak ada definisi family visual (kolase+karakter / tipografi gelap / canvas putih) dan aset per family; tidak ada gerbang "validasi 1 adegan bergerak" sebelum menerapkan pendekatan ke seluruh video; teks layar tidak dicek terhadap full_text VO.
Usulan aturan: tambahkan ke MOTION-SYSTEM §7 (gerbang sebelum build): "Storyboard hanya referensi komposisi; aset final dibangun per elemen (plate latar tanpa objek utama, objek utama 3D low-poly atau sprite terpisah, UI, teks). Sebelum menerapkan pendekatan visual ke seluruh video, buat preview bergerak SATU adegan + daftar elemen per jenis (model 3D / sprite / plate / teks-UI) dan tunggu persetujuan. Setiap teks layar harus bisa ditunjuk sumbernya di voiceover.full_text."
Status: menunggu persetujuan

### 2026-10-17 · Jadisatu launch · validasi S5 "Ini Irfan" (v2)
Revisi Irfan: kamera menyorot monitor di belakang Irfan, padahal di depannya ada laptop terbuka yang sedang ia kerjakan. Seharusnya angle berganti: kamera dari belakang (over-the-shoulder) memperlihatkan layar laptop.
Akar masalah: shot dipilih dari "objek apa yang paling gampang di-zoom" (monitor yang sudah menghadap kamera), bukan dari logika aksi tokoh; tidak ada aturan "subjek = objek yang sedang dikerjakan/dilihat tokoh" dan "ganti sudut kamera bila aksi ada di sisi yang membelakangi kamera (pakai aset tampak belakang, bukan memutar sprite)".
Usulan aturan: tambahkan ke irfan-motion-director §1 prinsip 9 (kamera mengikuti subjek): "Sebelum memilih shot, tanyakan: tokoh sedang melihat/mengerjakan apa? Itulah subjek. Bila subjek menghadap tokoh dan membelakangi kamera (laptop, buku, HP), ganti sudut: reverse / over-the-shoulder dengan aset tampak belakang. Objek latar (monitor di belakang tokoh, rak) tidak boleh jadi fokus aksi."
Status: menunggu persetujuan

## 17 Okt 2026 — Teks selalu di pojok atas (Jadisatu S5 v4)
- Masalah: semua frase jatuh di pojok kanan/kiri atas. Penyebab: aturan "blok teks di ruang negatif samping subjek" dipakai sebagai default, dan komposisi shot tidak dirancang bersama teks.
- Aturan baru (motion-director §4): posisi teks berotasi per frase — di belakang tokoh (sampul majalah), tengah melebar + latar diredupkan, tengah bawah satu baris, tengah atas kecil, menempel objek, baru samping subjek. Dua frase berurutan tidak boleh di zona sama.
- Teknik: teks di belakang tokoh = teks 2D dipotong siluet sprite (destination-out).
- Status: diterapkan di S5 v5.

## 17 Okt 2026 — Eye-tracking S5: perhatian terpecah
- Masalah: teks dipindah demi variasi (aturan "rotasi zona" yang saya buat sendiri). "Irfan." tertutup kepala; "Membongkarnya." merebut fokus dari aksi layar; mata bingung.
- Koreksi Irfan: Holy Freak memindah teks karena OBJEK yang dijelaskan berubah. Tetapkan objek pembicaraan tiap beat → elemen pertama yang dilihat → gerak yang mengantar ke berikutnya. Teks memimpin hanya bila teks membawa pesan.
- Peran referensi: Holy Freak = hierarki/storytelling; Shapes = Baikov (transisi lewat objek/skala); Baseline = Klickpin (sebab-akibat UI, pindah dunia vertikal).
- Aturan rotasi zona DIHAPUS dari motion-director; diganti prinsip 7 + pola posisi teks §4.

### 2026-10-18 · Jadisatu launch · review v4b (12:41–13:14)
Revisi Irfan: tipografi glitch/terpotong ("dilewati", "terjebak", "belum cukup"); animasi teks & UI kaku tanpa easing halus; blok merah solid di belakang kata; teks ekstrusi "Jadisatu"/"COBA" kasar; transisi mendadak; kinetic typography 1 layer datar tanpa rotasi seperti Holy Freak; post Threads yang diperbesar terpotong kolom; whitespace terburu-buru (teks besar kiri + kartu kanan); "Tapi sistem yang rapi"/"BELUM CUKUP."/chip bertumpuk; banyak kemunculan teks, count angka, transisi tanpa SFX; Gemini dipercaya penuh; After Effects + skill Tuntunly tidak dipakai; skill terpecah.
Akar masalah: (1) skill terbaru di ~/Proyek/video-editor/skills tidak dimuat (aturan yang dilanggar — larangan teks kiri+UI kanan, larangan stabilo/blok, TYPE-TEST, TRANSITION-SHEET — sudah ada di playbook/TYPE-STYLES); (2) tidak ada alat ukur audio sendiri, tidak ada cek tumpang tindih teks di QA; (3) pipeline dipilih engine kode tanpa membandingkan dengan AE yang sudah terbukti; (4) skill terpecah di 5+ file.
Usulan aturan: disatukan ke motion-director v3 (SKILL.md, 18 Okt): §0 muat konteks dari Mac; §2 bedah referensi per frame + peta audio (librosa + Demucs, Gemini hanya tambahan); §3 AE default + hibrida engine; §6.3/§6.11 larangan teks kiri+UI kanan dan elemen diperbesar keluar frame; §7.3 larangan blok/scrim/glitch; §7.4 default teks 2.5D, ekstrusi hanya lolos TYPE-TEST; §8 T28–T32 rotasi 2.5D; §14.3 SFX ≥85 % terukur termasuk onset teks/counter/transisi; §16 cek tumpang tindih + loop kritik ≥3 putaran. motion-graphic-playbook, irfan-motion-director, MOTION-SYSTEM, TYPE-STYLES menjadi arsip (versi lama motion-director: SKILL.v2-17okt.md).
Status: menunggu persetujuan


### 2026-10-26 · Jadisatu The Gap · review v3 (13:01–13:02)
Revisi Irfan: (1) "Adele." biru di latar navy = kontras tidak enak; pola warna ini sudah ia ubah di storyboard tapi muncul lagi. (2) Layout label kecil di pojok + "Johnny Cash"/"Adele." miring bertangga. (3) Storyboard dipakai sebagai visual akhir (garis ukur + teks "seleramu/kemampuanmu"); seharusnya hanya struktur kasar, visual akhir harus dikembangkan jadi visual yang mudah dipahami (acuan: grafik editorial Cielo "field vs firework", "positioning ladder", kurva good/bad habits).
Akar masalah: skill mengizinkan "gelap = navy + biru"; tidak ada aturan bahwa storyboard hanya struktur; model membangun dari moodboard artifact tanpa membaca projects/jadisatu-60s (DECISIONS D-024 tanpa abu-abu, Geist, Ira di latar putih).
Aturan: direction.md §13 (biru hanya di latar terang, cek kontras ≥ 7:1), §13.1 (larangan layout label pojok + kata miring bertangga; storyboard = struktur), SKILL.md rules inti 15–16.
Status: diterapkan (Irfan meminta langsung: "tambahkan rules").

### 2026-10-26 · Jadisatu The Gap · review v7a storyboard (13:48–14:06)
Revisi Irfan: (1) UI chat AI dibuat sendiri (generik); seharusnya UI asli ChatGPT/Claude seperti ref Apple Style (Gmail/IG/Google asli). (2) Kode S2/S3 ditulis ulang, sehingga beat yang sudah bagus di v6 (grid "Dan rasa kecewa itu tanda taste-mu sedang bekerja") hilang; yang ia minta hanya kamera close lalu slide per kata, baru reveal. (3) Feedback ditelan mentah tanpa QC sendiri. (4) Grafik selalu format/posisi sama; perlu variasi kamera + effect family (negative, klik, RGB). (5) Teks pojok kiri atas; aturan teks/visual bergiliran, hitam = fokus, putih = transformasi.
Akar masalah: rule 14 (adegan disetujui tidak disentuh) ada tapi tidak dipraktikkan sebagai diff per beat; tidak ada aturan UI produk asli.
Aturan: SKILL.md rules inti 18–21.
Status: diterapkan (v8: v6 grid dipulihkan + kamera baca; ChatGPT & Claude UI asli; fx.json → SFX Kenyset via earshot).

### 2026-10-26 · Jadisatu The Gap · review v8 (14:41–14:48)
Revisi Irfan: (1) SFX negative sumbang; seharusnya camera click. (2) Negative ditabur (spam); yang benar hanya di "taste berhenti". (3) Shape placeholder storyboard (lingkaran + garis, kotak biru, kartu kosong) jadi visual final; harus gambar/ilustrasi nyata yang relevan. (4) Rick Rubin foto kanan, teks kiri; urutan baca terbalik. (5) Musik piano yang sama dari awal sampai akhir; tidak membangun suasana. (6) Garis + wordmark di akhir tanpa makna. (7) "AI bisa…" terlalu polos. (8) 4 tugas dalam satu sesi Claude + timer 3 detik = tidak logis; kiasan digambar harfiah. (9) Landing page hasil AI terlalu mentah, tidak lolos sebagai website asli: "visual is king".
Akar masalah: tidak ada gerbang uji realisme dan kualitas objek; placeholder storyboard dianggap selesai; efek dan musik dirancang sebagai lapisan, bukan berdasarkan fungsi per babak.
Aturan: SKILL.md rules inti 22–25 (+ devil's advocate dari working-with-irfan §2a dipakai untuk keputusan visual sendiri).
Status: diterapkan di v9 (Designs.tsx: 11 desain nyata; sesi Claude terpisah; S5 draft logo/arah desain/loupe; Rick foto kiri; AI bisa ala Apple; musik per babak + track Kenyset).

### 2026-10-26 · Jadisatu The Gap · review storyboard v9 (15:15)
Revisi Irfan: (1) "ribuan" digambar harfiah jadi dinding ribuan gambar + lubang hitam di tengah (masker teks); seharusnya kiasan "tanpa batas" cukup titik-titik (atau tombol Generate yang berlipat seperti ref Output Motion). (2) Penutup "seleramu" masih polos teks serif + latar; minta urutan ref: kartu berputar seperti pusaran → merapat jadi orbit di sekitar teks → kartu kaca di latar gelap dengan kursor.
Akar masalah: masukan kritik subagent ("ganti titik dengan karya nyata") diterapkan tanpa devil's advocate terhadap maksud kiasan; masker "clear zone" untuk teks terlihat sebagai objek.
Aturan: rule 23 diperluas: kiasan VO (ribuan, hitungan detik) = metafora visual, bukan hitungan harfiah; masukan reviewer/subagent juga lewat devil's advocate; masker keterbacaan teks tidak boleh tampak sebagai bentuk.
Status: diterapkan (titik dikembalikan tanpa lubang; Finale = pusaran → orbit → kartu kaca + kursor ChatGPT/Claude/Gemini di luar, "Kamu" di dalam).

### 2026-10-26 · Jadisatu The Gap · review v9 (15:49)
Revisi Irfan: kamera masih menampilkan semua bagian; minta close-up mengikuti titik taste lalu patah ke wide saat negative; barisan kartu "sama" disapu kiri→kanan tanpa teks; "bagus." masih text box; 0–8 detik skor 2 (piano gagal, terlalu text box, tanpa gebrakan), 8–22 skor 5 (piano sedih vs cut cepat). Lampiran panduan Gemini: dipakai selektif.
Akar masalah: kamera dipakai sebagai framing statis per adegan, bukan alat fokus; musik dipilih per babak tapi babak 1 tidak dicocokkan dengan tempo visual; hook tidak diuji terhadap perilaku scroll Instagram.
Aturan: SKILL.md rules inti 26–28.
Status: diterapkan di v10 (hook kata terbelah + hantaman frame 0; kamera tracking kurva; taste close→cut wide; sapuan kartu kembar; push-in composer Claude; tracking draft logo; push loupe + blur luar; studio Logic 8 take untuk "bagus."; tension bed 112 bpm).

### 2026-10-26 · Jadisatu The Gap · v10 → v11 (16:19, panduan Irfan + Gemini)
Temuan yang terverifikasi: kamera grid "Dan rasa kecewa" meninggalkan kata sebelum kata berikutnya diucapkan; framing setelah push-in Claude memotong bubble atas; SFX mengetik/coretan/playhead ada di cue sheet tapi terlalu pelan (stem −40 s/d −42 LUFS).
Temuan Gemini yang ditolak (bertentangan dengan Irfan atau tidak terbukti): "sama." harus muncul (Irfan minta dihapus), "tidak ada SFX sama sekali" (stem membuktikan ada), glow biru di latar gelap (melanggar aturan warna), plugin @remotion/motion-blur & SFX data-URI prosedural (render 8× lebih lambat / duplikasi pipeline audio yang sudah ada).
Aturan: SKILL.md rules inti 29–30.

### 2026-10-26 · Jadisatu The Gap · review v11 (16:40)
Revisi Irfan: (1) kartu website/Kopi Senja di grafik pembuka tidak relevan, karena bagian awal bicara ekspektasi (perilaku manusia), bukan output; (2) "bekerja." sempat terpotong saat muncul (keyframe + kecepatan); (3) beat "AI." masih teks polos, perlu visual ketakutan (karakter di tengah, gaya neuronvisuals); (4) backsound masih ada bagian kosong/tiba-tiba sepi; (5) bagian terbaik: mulai detik 1 ke atas (backsound masuk, SFX jelas, transisi halus).
Akar masalah: visual dipilih dari aset yang sudah ada, bukan dari subjek kalimat; stop-down musik dibuat hening total; bed pembuka fade-in 2 detik.
Aturan: SKILL.md rules inti 31–32.
Status: diterapkan di v12 (orang + sorot cahaya ke ujung SELERA; lingkaran zona nyaman, kita tersentak, percik AI jadi salinan yang merebut tengah; drone + swell setelah "berhenti"; bed penuh sejak frame 0; riser pra-drop).
- 16:44 koreksi: piktogram orang di grafik pembuka dibatalkan (lebih kecil dari kurva, tidak masuk akal; v10 sudah bagus, hanya kameranya yang diminta). AI di beat "takut digantikan" digambar sebagai AI (tile ChatGPT/Claude/Gemini), bukan manusia. Rule 31 diperjelas.

### 2026-10-29 · AI change everything · narator menjadi biografi lalu reportase

- Bukti: draf A1 (block 73194) membuka “Dia takut pekerjaannya diganti AI”, lalu mengenalkan Irfan. Setelah dikritik, A2 (block 49218) memajukan Sam Altman tetapi langsung dilanjutkan angka Klarna. Keduanya ditolak.
- Koreksi Irfan, verbatim: “Kita nggak nge-report apa yang terjadi di dunia, tapi kita menceritakan permasalahan yang terjadi.”
- Diagnosis sementara: pusat cerita kandidat pertama berpindah. Konteks otoritas penulis dianggap cerita personal, lalu permintaan bukti dianggap alasan mendahulukan laporan kasus. Skill sudah dibaca; belum terbukti perlu aturan baru.
- Keputusan khusus konten: narator mengembangkan keresahan bersama dan kontradiksinya; kutipan/data memeriksa serta memperjelas persoalan itu. Pembuka asli diapresiasi, belum dinyatakan final. Penempatan akhir insert Sam masih terbuka.
- Batas: bukan larangan data untuk akun personal atau kewajiban membuka semua video dengan tokoh terkenal.
- Status: kegagalan dicatat; belum ada draf perbaikan yang disetujui atau evaluasi perilaku lama vs baru; tidak ada patch aturan aktif.
- Bukti lengkap: [catatan proyek](../../projects/ai-change-everything/NARRATOR-REVIEW.md). [Inbox evaluasi](evals/inbox/2026-10-29-ai-change-everything-narrator.md).

### 31 Okt 2026 · Pengganti Kita Sendiri · gerbang audio (SFX)
Revisi Irfan:
- SFX bukan gaya Apple motion: masih pakai setelan lama, hanya diperbanyak.
- Yang diminta: click, keyboard digital (bukan tick mekanik), whoosh wave halus.
- VO menggema.
- Sumber SFX tidak dipastikan di awal; agent memakai bunyi karangan. 2 jam kerja audio tidak menghasilkan apa-apa.

Akar masalah:
- Tidak ada gerbang inventaris sumber SFX. Agent memakai bank sintetis earshot yang kebetulan ada di container.
- Pack Kenyset di `~/Downloads` tidak pernah diminta aksesnya.
- Reverb VO ditambahkan tanpa diminta.

Usulan aturan: `audio.md` §14.0 (gerbang sumber SFX + larangan bunyi sintetis + definisi gaya Apple + VO tanpa reverb).

Status: diterapkan (diminta Irfan).

### 2026-11-01 · Pengganti Kita Sendiri · audit audio vs The Gap/video #2 (00:23)
Revisi Irfan: SFX Kenyset terbukti membangun suasana di The Gap dan video #2. Masalahnya kemungkinan dari Gemini atau dari aturan workflow yang berubah. Dia meminta:
- periksa feedback lama, termasuk "1 adegan 1 message 1 SFX";
- audit ulang referensi;
- pakai solusi audit independen yang relevan (VO kering dan jernih, SFX kayu dihapus);
- kata per kata belum punya SFX, jadi hapus semua SFX dan susun ulang.

Akar masalah:
- (1) Tabel Gemini (Modul 3/5 dan `Refference-audio.json`) dikodekan ke `audio.md` §14.5/§14.8/§14.10 tanpa dibandingkan dengan proyek yang sudah lulus. Isinya: wood/felt/thock LPF 1,5 kHz, sub thump di bawah whoosh, tick + pulse, dan gerbang sub 25–55 % yang berasal dari referensi musik tanpa VO.
- (2) Untuk lolos gerbang itu, ditambahkan sub-pad sinus. Akibatnya bed hanya −5,8 dB di bawah VO (The Gap −14,8) dan event SFX yang menonjol tinggal 0,26/dtk (The Gap 2,05).
- (3) Dua bunyi per event melanggar "1 adegan 1 pesan 1 SFX".

Aturan:
- `audio.md` §14.5 (palet The Gap + pita per keluarga + referensi terukur), §14.8 (satu peran satu bunyi; tabel Gemini dicabut), §14.9 (stagger; kata tidak pernah dipangkas), §14.10 (pita dibandingkan dengan referensi ber-VO; kepadatan/level/gema terukur).
- `scripts/audio/sfx_profile.py`.
- Laporan: `projects/pengganti-kita-sendiri/AUDIO-AUDIT-1NOV.md`.

Status: diterapkan (1 Nov).

## 2 Nov 2026 · PKS v9 dikirim dengan 44 cacat dan SFX tak terdengar

Keluhan Irfan (06.05): "kenapa masih ada banyak bug … tidak ada sfx sama sekali … devil's advocate dan QC sepertinya ga kamu jalankan". 9 screenshot: cahaya kotak kasar, matte Gates dobel, teks di posisi salah padahal ada ruang kosong, "AI" hitam tanpa alasan, "JANJI" kehilangan kata kedua, visual kalender jadi shape polos, Jensen/Altman tidak full frame, teks Altman dipaksakan.

Akar masalah:
- (1) Level SFX dinormalisasi ke PUNCAK dialog −20 dB → bunyi pendek 17–26 dB di bawah VO (praktis hilang). QA hanya mengukur LUFS total, dead air, pita 2–6 kHz; keterdengaran per cue tidak pernah diukur.
- (2) QC visual memakai contact sheet 240 px; ghost matte, tepi cahaya, dan komposisi tidak terlihat. Gerbang §16 (R6 reviewer segar, loop kritik 3 putaran sampai SHIP) dilewati; video dikirim tanpa verdict SHIP.
- (3) Masalah komposisi (Altman) ditambal koordinat 4× tanpa devil's advocate atas keputusan sendiri.
- (4) Worker diberi spesifikasi tanpa kewajiban bukti render; tidak ada media di cloud sehingga tidak bisa memverifikasi sendiri.

Aturan (usulan, menunggu gerbang EVALS):
- Gerbang keterdengaran SFX wajib: gain dari RMS jendela 300 ms terkeras relatif RMS ucapan; ≥ 85 % cue ≥ −10 dB terhadap dialog+bed di jendela 250 ms (`audio-v19/mix_v19.py` PKS).
- QC visual minimal 2 fps @960 px atas seluruh video oleh reviewer segar + strip penuh di setiap momen yang diubah; contact sheet kecil hanya untuk navigasi.
- Tidak ada pengiriman ke Irfan sebelum verdict SHIP dari reviewer segar.
- Setiap worker wajib render still sebelum/sesudah per cacat; media proyek disalin ke tempat worker bekerja.
- Revisi komposisi yang gagal 2× → ganti pendekatan, bukan geser koordinat lagi (§16.4 "dua putaran gagal").

Status: usulan (2 Nov). Laporan: `projects/pengganti-kita-sendiri/FEEDBACK-2NOV-0605.md`, `AUDIT-V9-INDEPENDEN.md`.

### 2026-11-02 · Pengganti Kita Sendiri · v10 → v20 (06.05–22.25)
Revisi Irfan, dalam urutan:
- gerbang 3 segmen dan safe zone;
- teks prioritas 2;
- font ramping;
- tanpa scrim;
- hierarki subagent;
- SFX salah karakter, dengan earshot dipakai sebagai telinga;
- pelajari The Gap/video #2/referensi lewat earshot;
- folder SFXIrfan + SFX family;
- running text + variasi kinetic;
- audio dari nol (sesi baru, prinsip saja).

Pada 22.25 masalah lama muncul lagi:
- shadow hitam 0:08;
- jeda;
- AI slop;
- kinetic typography menjadi subtitle datar.

Akar masalah:
1. Aturan terkunci tidak dijadikan cek otomatis, jadi perbaikan menyasar satu sumber (text-shadow) dan melewatkan sumber lain (radial-gradient di S00).
2. Perbaikan kuantitatif (cakupan kata 75 %) dianggap selesai, padahal kualitas kinetic tidak dinilai terhadap referensi.
3. Tambal di atas tambal pada audio; baru membaik setelah mulai ulang dari prinsip.

Aturan baru:
- larangan visual (scrim, shadow besar) dicek dengan grep + still di setiap teks;
- kinetic dinilai terhadap referensi per beat, bukan cakupan saja;
- bila feedback berulang di area yang sama, susun ulang dari prinsip di sesi segar.

Detail: `projects/pengganti-kita-sendiri/LEARNINGS-2NOV.md`, `HANDOFF-SESI-BARU.md`.
Status: dicatat; revisi dilanjutkan di sesi baru.

### 2026-11-03 · Pengganti Kita Sendiri · v21 → v22 · SELESAI
Feedback Irfan (05.31): teks VO tidak diam. Teks berganti secepat mungkin, dan ada dip (teks yang sama hilang lalu muncul lagi) yang hanya terlihat frame per frame.

Akar masalah:
- teks VO disembunyikan lewat CSS `:has()` setiap kali ada penekanan;
- frasa dipotong per 32 karakter;
- QC hanya menyampel 1 still per detik.

Perbaikan:
- gerbang kedip per frame (`tools/text_flicker_check.py`), wajib di three-segment-gate dan dijalankan juga pada render final;
- blok teks per klausa, diam sampai VO selesai, ditukar di tempat.

Hasil: DIP 4→0, CEPAT 7→0, DULUAN HILANG 6→0. QC render per frame menemukan «Sebagian» menimpa kartu, lalu ditambal.

**Video dinyatakan selesai oleh Irfan (3 Nov 20.43). Versi final: `PKS_v22_video1.mp4`** (backsound Particle Emission).

Pelajaran lintas proyek:
1. Kesalahan temporal (kedip, buru-buru, tumpang tindih sesaat) hanya tertangkap dengan QC per frame. Contact sheet per detik tidak cukup.
2. Aturan yang sudah dikunci harus jadi cek otomatis, bukan catatan.
3. Proses panjang dijalankan di latar belakang dengan laporan progres.
4. Sesi yang dibuat sebagai scheduled task tidak muncul di daftar chat. Beri tahu Irfan tautan sesinya sejak awal.

### 2026-11-06 · Klip DOAC (clip01_final) · audio + caption
Revisi Irfan: suara pembicara di-damp padahal audio podcast sudah bagus; musik tidak tenang (harusnya lofi/fokus); caption dua baris muncul lagi padahal referensi tidak memakainya.
Akar masalah: skill hanya mengenal satu jenis video (motion ber-VO narator). Aturan 38 mewajibkan rantai Modul 1 (mono, LPF 9 kHz, denoise, kompresor, loudnorm) untuk *setiap* klip narasumber, musik per babak/tension berlaku untuk semua, dan aturan caption tidak membatasi jumlah baris. Terukur: udara > 9 kHz 0,29× dibanding versi lain dari sumber yang sama, LRA 0,7 LU; caption 2 baris di 14,5 / 24,2 / 72,8 dtk.
Perubahan: profil format A/B (`formats.md`), aturan 43 dan 44, Modul 1 dibatasi ke format A, `slop-catalog.md`, `delivery-gate.md` (preview dulu, laporan berbukti), `scripts/gate/`. Kasus eval mg-043, mg-044.
Status: diterapkan (Irfan 6 Nov: "langsung restrukturisasi")

### 2026-11-06 malam · Guide per urusan dari 6 video referensi
Permintaan Irfan: standar video (rapi, hierarki terbaca, audio ikut suasana, SFX per objek, hindari warna kebanyakan/teks bertumpuk/kaku/cutout kasar) sebagai referensi per folder, bukan aturan kaku; audio ikut tempo video, bukan selera.
Perubahan: `guide/` (README + visual, teks, gerak, audio, sfx, hindari, referensi + 6 contact sheet terukur), `scripts/audio/pace_read.py`, profil `energi` 100–140 bpm dari referensi, aturan 45 diperbarui; konflik yang ditemukan agen uji diperbaiki (bpm/level fokus, subtitle statis hanya format A, frame 0 aturan 27).
Uji: 2 brief × (skill lama vs dengan guide), 5/5 assertion lulus di keduanya: keputusan inti sudah tertanam di aturan; guide menambah contoh dan rasa, belum terbukti menaikkan skor. Terbuka: video 06 (Sleeko) terbaca `fokus` padahal musiknya ±117 bpm (atau 58, ragu oktaf).
Status: diterapkan (Irfan 6 Nov)

### 2026-11-08 · V5 tiga klip podcast (PC server) · piano + SFX minim
Revisi Irfan: ketiga klip memakai piano yang sama dan SFX sangat minim, padahal aturan kita 1 SFX per gerak; earshot tidak dipakai; penilaian DOAC 6 Nov tidak valid sebagai standar karena proyeknya tidak selesai.
Terukur (render final 8 Nov): 0,15–0,27 SFX/dtk (acuan 1,8–2,1), cakupan event 5–11 %; Mixkit #22 lulus `music_fit` di fokus/slowdown/tegang walau bpm 123 di luar ketiganya; `earshot_z: null` di 5 laporan (submodule tidak di-init di PC server).
Akar masalah: (1) revisi DOAC 6 Nov digeneralisasi menjadi profil Format B yang membuat SFX jarang ("hanya di sisipan", "85 % tidak berlaku", "caption tidak berbunyi") dan membebaskan B dari aturan 25/30/35/37; perbaikan "SFX tiap objek" malam itu ditulis di bagian umum tanpa menghapus pengecualian; (2) gerbang DENGAR hanya ada di `three-segment-gate.md`, tidak tersambung ke tabel gerbang, dan `music_fit` melewati earshot diam-diam; (3) brief mengunci musik ke 8 track lama dan menulis "piano/biola" sebelum ref didengar; (4) reviewer menandai "sepi/datar" tetapi menilai dengan aturan B, builder hanya menaikkan level.
Perubahan: profil Format A/B dan semua aturan turunan penilaian DOAC dihapus (`formats.md`, §14.B, tanda [A]/[B], S-A4 lama, contoh DOAC di `pacing-map.md`, eval mg-043/045); aturan 43 baru "1 frame / 1 pesan / 1 objek visual / 1 gerakan = 1 SFX" sebagai Hard Gate; kategori suasana hanya mengatur karakter SFX; gerbang DENGAR di gerbang 0/3/6/9; `music_fit.py` GUGUR di luar rentang, error tanpa earshot, FAIL bila kandidat < 8 / < 2 sumber; `scripts/gate/sfx_density.py`; devil's advocate audio di `delivery-gate.md` §4; eval mg-046, mg-047.
Status: diterapkan (Irfan 8 Nov: "Hapus saja aturan lama yang sudah tidak berlaku")

### 2026-11-08 · Skill utama tidak termuat di mesin kerja
Gejala: sesi Claude baru di PC server (akun claude2, `~/.claude-2`) tidak mengenal `motion-graphic`, aturan SFX, maupun skill Remotion; Mac memakai salinan 27 Okt (repo Mac tertinggal 134 commit) plus `motion-reel` lama; pustaka akun claude.ai masih memuat `motion-graphic` 25 Okt, `motion-director`, `motion-graphic-playbook`.
Akar masalah: `tools/sync.sh` menyalin snapshot hanya ke `~/.claude`; PC server pindah ke akun claude2 pada 7 Nov tanpa sinkron ulang; agent hanya membaca skill bila brief menulis path-nya.
Perubahan: `sync.sh` memasang symlink + skill Remotion resmi + hook SessionStart `git pull`, mendukung `CLAUDE_CONFIG_DIR`, dan memperingatkan skill video lama di pustaka akun. Dijalankan di Mac dan PC server.
Uji: pertanyaan yang sama ke sesi baru. Sebelum (PC): "tidak ada skill yang mengatur jumlah SFX". Sesudah (PC dan Mac): memuat `motion-graphic`, menyebut aturan 43, `remotion-*` tersedia. Sisa: duplikat di pustaka akun claude.ai harus dibereskan Irfan dari Settings.
Status: diterapkan (Irfan 8 Nov)

### 2026-11-08 · Storyboard visual diturunkan dari Wonder
Permintaan Irfan: sebelum menulis kode video, model membedah target per frame, membuat rencana, lalu langsung membuat storyboard bergambar (letak dan posisi objek); pelajari cara kerja Wonder dari history di Mac.
Sumber: `wonder-local.db` Mac (4 thread storyboard: Marketing, Motion Lagu, Pengganti Kita Sendiri, Trojan v4; 22.042 event) + skill Wonder `new-design`, `new-design-arrange`, `design-review` hasil `get_skills`. Pola Wonder: arah gaya tertulis sebelum menggambar → kerangka → artboard per item (frame 16:9 + caption beat/VO/aksi/kamera/keluar/SFX), satu baris per babak → screenshot setiap panel → design-review sekali (kritis/dasar/poles) → versi lama diarsip. Skill di internet (shotkit, orchestkit video-storyboarding, seedance-storyboard) hanya menghasilkan spesifikasi/prompt, tidak menyusun panel visual; dari shotkit diambil file data terbaca mesin + validator.
Perubahan: `references/storyboard.md` ditulis ulang (jalur tanpa storyboard/tanpa referensi, urutan kerja, format panel, 13 aturan dari umpan balik Irfan di Wonder, review papan); `scripts/storyboard/board.py` (render panel HTML → PNG, papan per babak, `cues.json` untuk gerbang SFX, cek caption, peran/alasan, waktu, teks layar satu baris tanpa tanda baca, kerangka tersisa); `templates/storyboard/`; gerbang 4 di SKILL.md; eval mg-048.
Uji: `board.py` pada templat: tanpa panel → FAIL; kerangka tersisa → FAIL; teks layar bertanda baca dan keluar frame → FAIL; panel lengkap → PASS, papan 3 beat/4 frame terbaca. Belum diuji: sesi baru membuat storyboard proyek nyata dengan cabang ini (mg-048).
Status: diterapkan (Irfan 8 Nov: "turunkan jadi skill storyboard ke repo")

### 2026-11-08 · Uji C: audit V5 dengan skill 15c04a0
Sesi baru di PC server dengan skill-development 15c04a0 mengaudit 3 klip V5. Skor 24 (sebelumnya terbaik 11; tanpa skill 3; skill 7 Nov 0). Lulus kriteria: audio di 3 temuan teratas, track sama tertangkap dengan bukti terukur, satu-satunya dari 8 kondisi. Rincian: `evals/results/2026-11-08-audit-v5.md`.
Sisa: label genre earshot masih dijadikan bukti (funk pada track piano yang sama); SFX jarang hanya di urutan 7 "sedang" walau aturan 43 gerbang keras; musik datar per babak tidak disebut. Usulan di PENDING.
Status: diterapkan sebagai hasil uji; perbaikan sisa menunggu Irfan
