# Ledger · Builder trap r2 (ulang dari nol, repo baru)

Sesi 12 Nov 2026, claude2. Tujuan Irfan: pembanding kinerja repo lama (`projects/builder-trap-show-your-work/`, v13) vs repo baru. Folder lama tidak diubah.

| ID | Kata Irfan (verbatim, dipotong) | Cakupan | Status |
|---|---|---|---|
| R-001 | "edit video ini semenarik mungkin, seprofesional mungkin, sepremium mungkin" · tema builder trap, setahun tanpa dokumentasi, "show your work" | Kualitas, tema | Aktif |
| R-002 | "cinematic storytelling ... real footage, real icon ... ChatGPT-nya tampilkan logo yang asli" | Gaya, aset | Aktif |
| R-003 | "Gunakan musik ini" (Aware – Adrián Berenguer, YT Music -y7dFbceo5E) | Musik | Aktif |
| R-004 | "Refferencestory2 ... analisa scriptwritingnya, alur, hook konten, story kemudian tuliskan untukku" · "Motion grapich adalah refferensi ... kualitas visual, penggunaan logo, transision dan camera movement" | Kiblat 55 (naskah, pengikat), kartu 63 (teknik) | Aktif |
| R-005 | Hindari: gambar1 radial putih dikelilingi hitam + 1 lapis; gambar2 nilai sama semua teks + radial coklat; gambar3/4 terlalu banyak biru + radial; gambar4 animasi kurang proper | Larangan visual (frame dari v-lama) | Aktif |
| R-006 | Jawaban: "Mulai dari nol" | Proyek baru | Aktif |
| R-007 | Jawaban: "Setiap 3-5 detik pakai B-roll wajahku muncul sebagai penekanan, pembuka, momen klimaks dan juga saat visual motion kurang kuat untuk ditampilkan" | Wajah sebagai sisipan berkala, bukan blok 20 % | Aktif |
| R-008 | Jawaban: "Susun ulang take asli" | Tanpa VO buatan; ElevenLabs untuk SFX | Aktif |
| R-009 | Jawaban: "Putih utama + aksen" | Palet putih, gelap hanya di belokan (linear) | Aktif |
| R-010 | "Kamu bisa pakai badfeedback ku disession sebelumnya untuk menghindari membuat kesalahan yang sama" | D-010…D-026 lama + slop-catalog S-V18…S-V25, S-T13/14 berlaku | Aktif |
| R-011 | "Oke, aku setuju dan aku approve. Jadi, kamu bisa langsung kerjakan semuanya sampai benar-benar selesai. Nggak perlu konfirmasi apa pun." | Naskah A final; storyboard/PLAN tidak menunggu persetujuan; kerja sampai kirim | Aktif |
| R-012 | (Sutradara) ChatGPT "dots" = agent always-on OpenAI (DevDay 29 Sep 2026, item "Dot" di sidebar ChatGPT); OpenBot = app desktop multi-agent (meetopenbot) yang dipakai Irfan | Isi dinding bukti B14 | Aktif |
| R-013 | (Sutradara) Footage nyata babak 1 dari YouTube (Jensen Huang WGS 2024, Karpathy YC, TED Dohmke, Replit, TED Suarez, Fox teen dev); thumbnail nyata pencarian "cara dapat uang dari AI 2026" untuk B08/B10 | Mengikuti k1 kiblat 55 (arsip tokoh nyata) + brief "real footage" | Aktif |
| R-014 | (Sutradara) Suara dikunci 94,97 dtk (6 jeda mati dirapatkan, jeda antarpotongan diisi room tone asli); `audio_order` mode konten, suara terkunci | Gerbang 6 | Aktif |

| R-015 | (Sutradara) Musik: Aware tetap dipakai walau `music_fit` kategori energi menggugurkannya (membaca 143 bpm sebagai 71,8); genre = musik kiblat 55; babak 3 diganti drone gelap ElevenLabs + Aware tersaring (musik berganti di twist seperti ref02) | Gerbang 10 | Aktif |
| R-016 | (Sutradara) SFX: tick lembut per kata narasi (−19 dB) supaya cakupan event visual ≥ 85 % (§14.8 kata kinetik per kata); kartu repo B20 setelah ke-3 = satu rattle; maks 2 bunyi per 100 ms | Gerbang 9 | Aktif |

Gerbang: 0 lulus (doctor OK, transkrip large-v3 kata per kata `bedah/raw_words.json`) · 2 naskah A final (R-011) · 4 PLAN 26 beat `handoff/PLAN.json` · 6 suara terkunci · 7–8 babak 1–4 dibangun (Editor A/B/C, REVIEW r1–r2c) · 9 SFX terkunci (sfx_density PASS 87 %) · 10 musik terkunci · 11 audio_order PASS, JURI LULUS · render final.

| ID | Kata Irfan (verbatim, dipotong) | Cakupan | Status |
|---|---|---|---|
| R-017 | (13 Nov) "builder-trap-r2_v1 ini ... sangat-sangat berisik ... waktu aku berhenti ngomong, waktu aku mikir, suara piringnya, suara noise, suara clicky" · "masalahnya ga cuma di bagian diam tapi kesalahan pemilihan sfx" | Audio v2: R-014 (room tone isi jeda) dan R-016 (tick per kata) dicabut; suara `audio/voice_clean.py`, SFX `audio/build_cues_v2.py` (49 cue, SFXIrfan dulu), mix `audio/mix_v2.py` | Aktif |
| R-018 | (13 Nov) "iya lanjutkan perbaiki sampai selesai, evaluasi juga visual kembali dibagian yang menurutmu kurang (saya ... sengaja tidak memberitahu bagian mana yang salah dari visual)" | Evaluasi visual mandiri `handoff/REVIEW-v1-self.md` F-v1-01…07; v1 tidak ditimpa, hasil = v2 | Aktif |
