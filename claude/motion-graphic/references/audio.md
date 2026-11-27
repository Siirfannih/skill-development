# Audio — VO, SFX, musik

Baca hanya di gerbang audio (setelah script dan storyboard final) dan saat QA audio. Nomor § sama dengan motion-director v3 agar rujukan lama tetap berlaku.

## Aturan inti (Lantai E23-E25a): baca ini dulu

Ringkasan butir LANTAI E, dengan alasannya; bunyi lengkap ada di bagian §14 di bawah (peta butir lama: `MIGRASI-LANTAI.md`). Ini bacaan wajib di langkah Audio `SKILL.md` dan sebelum mengunci suara.

- **E23 Suara utuh** (NEGATIF 9). Suara tidak dipercepat, jedanya bersih, tak ada fonem yang digunting; tempo dirapatkan dengan memotong jeda mati. Kata sampah (eee, emm, tuh) dan diam saat berpikir dibuang di tahap potong. Rencana cut divalidasi terhadap transkrip take sumber: kata isi tidak teriris > 20 ms, tiap batas punya guard 50 ms, durasi kata hasil ≥ 85 %, urutan ASR tetap sama (jumlah entri JSON bukan bukti suara utuh). Jeda tidak diisi room tone kotor: stem suara di jeda ≤ -50 dBFS (`gate/pause_clean.py`). Level suara asli tidak diturunkan, di-loudness-kan, atau di-limit: hanya peredam noise, lalu gain naik bersih ke ±-16 LUFS bila sumber terlalu pelan; musik dan SFX yang menyesuaikan ke suara. Alasan: ini penolakan audio yang paling sering. Cek: `audio_order.py lock suara ...`, `cut_check.py`, `gate/voice_level.py suara_sumber.wav suara_hasil.wav`.
- **E24 Sound design lima pilar, satu cue satu pilar, dengan jarak** (`guide/sfx/FAMILI.md` §0): (1) bed ambien rekaman konstan ±-36 LUFS supaya tidak ada hening digital; (2) transisi kamera dan split: udara/kain low-pass atau thud teredam, puncak di kecepatan tertinggi gerak; (3) tick KT dan UI: per kata KT hanya bila proyek memilih `kt_tick: per-word` (selain itu `accent-only`: kata penekanan dan event visual) dan per elemen UI yang berubah, 2-4 varian berputar; (4) foley taktil untuk objek fisik; (5) aksen dan riser menuju aksen, satu sampai dua per babak. Jarak: dua bunyi ≥ 100 ms, whoosh ≥ 1 dtk, maksimal 5 event non-tick dan 8 tick dalam 2 dtk. SFX mulai di level alami `0 dB` dan ditempatkan relatif VO (-2...-6 dB transisi/aksen, -12...-18 dB tick/foley). Palet terlarang: kayu/thock/felt, koin/logam, kartun/langkah kaki, 8-bit, noise/sinus sintetis, rope-creak. Alasan: tiap penolakan SFX user lahir dari bunyi tanpa sebab atau tanpa jarak. Cek: `gate/sfx_density.py render.mp4 cues.json --objects objects.json`, `sfx_vet.py`.
- **E25 Musik mengikuti tempo dan suasana**, per babak (bukan satu track dari awal sampai akhir), tidak bolong, tidak melawan emosi ucapan; kategori dari tempo video (`scripts/audio/pace_read.py`), dipilih dengan `scripts/audio/music_fit.py`. Bed ada sejak frame 0. Duck dengan automation (turun saat dialog, naik halus di jeda ≥ 0,3 dtk lewat ramp ≥ 250 ms), bukan kompresor.
- **E25a SFX terdengar, nyaman, dan diuji di speaker HP.** Stem SFX diukur di bagian padat aksi; SFX yang berdesis atau tajam ditolak, tidak dikeraskan dengan saturasi (bed ambien boleh berdesis lembut asal ≤ -35 LUFS dan tanpa distorsi). `scripts/audio/audio_phone.py` dan `scripts/audio_qa.py --module5` lulus sebelum render final.

## 14. Audio

### 14.0A Kategori suasana dulu, baru cari audio
Sebelum memilih musik atau SFX apa pun, tulis di brief **satu kategori suasana per babak** (juga untuk klip podcast: musik per babak, Lantai E25). Kategori diturunkan dari **tempo video**, bukan selera siapa pun: video cepat (cut rapat, bicara cepat) butuh musik cepat yang menyaingi tempo; video tenang butuh musik tenang. Ukur dulu: `python3 scripts/audio/pace_read.py video.mp4 [--words words.json]` (cut/menit, event visual, laju bicara → usulan kategori + rentang bpm). Lalu cek isi: masalah/ancaman → `tegang`, harapan/CTA → `hangat`. Tulis alasannya satu baris.

| Kategori | Kapan | Musik (profil terukur di `music-profiles.json`) | Karakter SFX (jumlah dari kiblat, Lantai E24) |
|---|---|---|---|
| `fokus` | menjelaskan, edukatif, podcast santai | lambat-sedang, ketukan jarang, tidak terang, tanpa build | lembut, pendek, bernada |
| `slowdown` | reflektif, emosional, personal | lambat, sangat jarang, gelap/hangat, minor | lembut, level lebih rendah, ekor pendek |
| `energi` | hype, motivasi, launch | cepat, padat, terang, build/drop boleh | punchy, terikat ke cut |
| `tegang` | masalah, ancaman, investigasi | sedang-cepat, berdenyut, minor | tick/pulse, satu hit terbesar di engsel |
| `hangat` | harapan, solusi, penutup/CTA | sedang, mayor, terang secukupnya | lembut, aksen terbesar di CTA |

Lalu **ukur, jangan percaya label**. Kata "lofi" atau "EDM" di nama file, tag situs, atau mood dari earshot sering salah (earshot `docs/LIMITS.md`: mood musik top-1 keliru ±18 %). Keputusan diambil dari:
```
python3 scripts/audio/music_fit.py --category fokus --voice sumber.mp4 --duration 76 kandidat/*.mp3
```
Skrip mengukur tempo yang dirasakan, kepadatan ketukan, kecerahan, build/drop, dinamika, mayor/minor, dan **benturan dengan suara**: selisih suara vs musik di pita 500–4000 Hz pada level rencana (min 12 dB; ≤ 4 dB kurang = boleh diatasi EQ −4 dB §14.1, lebih dari itu ganti track). Pakai track teratas yang `PAKAI`; tulis keluarannya di laporan Delivery Gate. bpm/onset di luar rentang = `GUGUR`; earshot rank dipakai bila terpasang (tanpa earshot skrip tetap jalan dengan peringatan "belum didengar alat"); kumpulan kandidat di bawah bawaan (≥ 20 file dari ≥ 2 folder sumber) = peringatan, bukan FAIL; proyek/REF-SPEC boleh mengubah angkanya (`--min-kandidat`).

**Cara memilih backsound yang terbukti**:
1. Kumpulkan kandidat berlisensi (bawaan ≥ 20 dari ≥ 2 sumber; REF-SPEC/proyek boleh mengubah angkanya) (pustaka lokal + YouTube lewat `yt-dlp`, sumber dicatat di `SOURCES.md`). Skrip memberi peringatan di bawah bawaan, bukan FAIL.
2. Peringkat dengan `music_fit.py` pada **potongan yang benar-benar dipakai** (`--duration` = durasi video, mulai dari offset yang akan dipakai), bukan track utuh: onset bisa berayun 2,2 → 3,6 hanya karena titik mulai bergeser (N3 Embrace: mulai 32 dtk = 2,22, 34–44 dtk = 3,1–3,6).
3. Kenali dengan `earshot describe` pada potongan itu bila earshot ada (tanpa itu: cek bebas vokal dari judul/sumber dan spektrum, tandai "belum didengar alat"): instrumental (tanpa tag Speech/Singing AudioSet) dan mood sesuai brief.
4. Tolak bila menutupi suara (masking > 4 dB di 500–4000 Hz), terbaca sedih/melankolis padahal brief tidak, atau bpm/onset di luar rentang.
5. Track berbeda per klip hanya bila proyek memintanya (`gate/music_batch.py` mengeceknya).
6. Pilih bagian yang **tidak punya breakdown di dalam durasi klip** (lewati intro braam, dip, outro fade); cek RMS 5 dtk potongannya.

Profil di `music-profiles.json`: `energi` disesuaikan dengan 6 video referensi yang disetujui (musik ±104–136 bpm, `guide/referensi/`); kategori lain masih hipotesis. Kalibrasi dari **stem musik video referensi yang suasananya cocok** (bukan dari track favorit): `music_fit.py --calibrate <k> stem1 stem2 stem3`. SFX untuk kandidat: `earshot rank "<peran>" kandidat/*` untuk karakter, `sfx_comfort.py` untuk desis; jumlahnya mengikuti event visual (Lantai E24), bukan kategori.

### 14.0B Mengenali audio: earshot = skor pertama, lalu divalidasi
Claude tidak mendengar sendiri. Setiap alat telinga punya titik buta, jadi kesimpulan "audio ini seperti apa" diambil dari beberapa sumber yang saling dicek, bukan dari satu label.
1. **Input bersih dulu.** Label musik diambil dari **stem musik** (stem proyek, atau pisahkan suara dengan `demucs` untuk referensi), bukan dari mix yang ada suaranya. Contoh satu track piano: track asli → "jazz, solo piano, sedih"; stem musik → "solo piano +3,5, sedih +3,7"; mix dengan suara podcast → "funk, vocal chop +3,1". Earshot benar; inputnya yang tercampur.
2. **Earshot memberi skor awal** (`describe`, `match`, `timeline`): label + z. Itu hipotesis, bukan putusan.
3. **Cek dengan minimal satu sumber lain yang independen:**
   - ukuran: `music_fit.py` / `pace_read.py` (bpm, mayor/minor, kecerahan, kepadatan ketukan, dinamika per babak);
   - telinga kedua bila ada: Gemini mendengar file yang sama (`agy` di Mac, fallback Gemini API), diberi pertanyaan spesifik ("instrumen utama?", "tempo terasa cepat/lambat?", "suasana berubah di detik berapa?"), bukan "deskripsikan"; tanpa Gemini, sumber independen kedua adalah ukuran `music_fit`/`pace_read` + metadata sumber;
   - metadata sumber: judul/tag Epidemic, `SearchSimilarToRecording`, catatan pustaka asal file;
   - identitas track: `gate/music_batch.py` (sidik jari) untuk "apakah ini track yang sama".
4. **Sepakat → pakai. Berbeda → cari sebabnya** (input tercampur suara? jendela waktu salah? label di luar kosakata earshot? metadata salah?), lalu tulis mana yang benar dan buktinya. Jangan memilih diam-diam salah satu.
5. Laporan audio memuat tabel kecil: klaim → sumber yang setuju → sumber yang tidak → putusan.

### 14.0C Urutan sound design: satu lapisan dikunci, baru lapisan berikutnya
Sound design = suara (VO/vokal), SFX, dan musik latar sebagai satu kesatuan. Lapisannya dikerjakan **berurutan**, setiap lapisan dicocokkan ke lapisan yang sudah terkunci. Bila dikerjakan paralel tanpa tahap mencocokkan, SFX tidak terikat ke gerak dan musik dipilih tanpa mendengar videonya.

Pilih mode di brief dan tulis alasannya:

| Mode | Urutan | Kapan |
|---|---|---|
| `konten` (default) | suara → visual → SFX → musik | Video yang digerakkan isi/ucapan: klip podcast, explainer, iklan dengan VO. Visual mengikuti timing suara; SFX disusun dari event visual yang sudah jadi; musik dipilih terakhir karena "tipe videonya begini, jadi musiknya ini" |
| `musik` | musik → visual → SFX | Video yang digerakkan lagu/ketukan: video lirik, montage potong di ketukan. Musik menentukan timeline; visual dipotong di ketukannya; SFX menyusul event visual |

Langkah mode `konten`:
1. **Suara dikunci**: VO final (atau audio sumber klip utuh). `audio_order.py init --mode konten`, lalu `audio_order.py lock suara suara.wav --words words_actual.json --source-words words_source.json --cut-map map.json --voice-source suara_sumber.wav`. Lock menjalankan ulang pemeriksaan kata/jeda dan menyimpan hash semua buktinya.
2. **Visual dibangun di atas timing suara**, render tanpa audio, `lock visual`.
3. **SFX dari event visual terkunci**: mulai dari `cues.json` storyboard, lalu geser ke onset nyata di render (`sync_cues.py`); bunyi untuk momen cerita dan gerak terlihat (Lantai E24), tiap cue punya peran + alasan. `lock sfx cues.json --objects objects.json` menjalankan `sfx_density.py` terhadap render terkunci: objek tanpa SFX, peran tidak konsisten, spam, dan palet terlarang ditolak.
4. **Musik paling akhir**: render preview visual + SFX tanpa musik, dengarkan/ukur (`pace_read.py`), tentukan kategori suasana per babak, pilih kandidat (`music_fit.py`, kenali dengan `ears.py`), lalu `lock musik --peran --alasan --didengar preview.mp4`.
5. **Mix dan QA**: `audio_order.py check` harus PASS sebelum render final.

Revisi visual setelah SFX/musik dikunci membuat lapisan sesudahnya **basi** (`check` = FAIL): SFX disinkron ulang ke render baru, musik didengar ulang. Ini yang mencegah "visual diubah, audio ketinggalan".

### 14.0D Potong suara: bersih sebelum dikunci
Suara yang dikunci (langkah Storyboard) harus sudah bebas kata sampah dan diam saat berpikir. Bila tidak, sampah itu ikut ke teks layar ("tuh" tampil di pembuka), jeda terdengar seperti orang ragu, dan SFX/musik menutupi lubang yang seharusnya tidak ada.
1. **Ukur dengan ambang relatif**, bukan angka mati: diam = energi 10 ms < median ucapan − 18 dB. Ambang −45 dB lama tidak melihat jeda di kamar yang lantai noise-nya −38 dB.
2. **Diam di dalam kata dihitung.** Whisper menelan jeda ke durasi kata (bisa 0,15–0,45 dtk per kata). Periksa energi di dalam setiap rentang kata, bukan hanya celah antarkata.
3. **Kata sampah**: eee, emm, eh, hmm, uh, tuh, dan pengulangan/awal salah. Transkrip pancingan (`initial_prompt` berisi "eee, emm") membantu memunculkannya, tapi bisa berhalusinasi: setiap kandidat diverifikasi dengan energi/earshot, bukan dipercaya mentah.
4. **Bunyi bersuara di luar kata** (gesekan mik, tangan, benda) dibuang bersama jedanya; dengar dulu dengan `earshot describe`.
5. **Sisa jeda**: tengah kalimat 0,06 dtk; antarkalimat ±0,28 dtk; jeda dramatis yang disengaja (sebelum twist, setelah klimaks, antarbabak) ≤ 0,5 dtk dan ditulis di DECISIONS (Lantai E23).
6. **Alat**: `scripts/gate/cut_check.py suara.wav words_source.json --suggest potong.json` (FAIL bila ada sampah/diam) → dengar/edit usulan → `scripts/audio/recut.py cut --audio … --video wajah.mp4 --remove potong.json --source-words words_source.json --out DIR` (menolak endpoint bersuara, overlap kata, guard < 50 ms, dan drift; audio/video dipotong pada frame sama, micro-fade maksimal 2 ms, `map.json`) → `recut.py remap` untuk kata, beat, event, dan cue. Kode adegan yang menulis frame langsung harus memakai peta yang sama.
6a. **Pengecualian guard 50 ms bernama-berbukti.** Bila kata sampah (mis. "tuh") menempel kata tetangga sehingga jeda nyatanya < 50 ms, batas itu boleh dikecualikan per sambungan lewat `--guard-exceptions <file.json>` (`cut_check.py`, `audio_order.py lock suara`). Tiap entri: {detik, kata_kiri, kata_kanan, alasan, bukti{retensi ≥ 0,95, irisan_ms ≤ 20, path}}, dan angka yang DIUKUR alat harus memenuhi syarat itu. Overlap kata, retensi, dan urutan tidak pernah dikecualikan; setiap pengecualian tercetak di laporan.
7. **Tidak mengisi jeda dengan room tone** dari kamar yang sama (§14.6).
7b. **Potong ulang setelah visual dibangun**: jangan memotong video render di titik jeda (animasi melompat). Buat peta waktu W(t_baru) → t_lama: bekas jeda saat layar diam atau berisi cut keras = lompatan 1:1; bekas jeda di tengah animasi = disebar ±1,5× panjang jeda (contoh `projects/builder-trap-r2/edit/make_knots.py`). Adegan diputar di `<Freeze frame={W(f)}>`; video wajah dan **waktu tampil teks memakai frame nyata + kata di timeline baru** (teks yang ikut W bisa meleset sampai 20 frame).
7c. Ambang diam di dalam kata: 0,18 dtk di rekaman kamar (0,15 menangkap konsonan/henti b-t-k); ulangi `cut_check` setelah tiap potong — diam yang lebih kecil baru terlihat setelah yang besar dibuang.
8. Setelah dipotong: transkrip ulang tanpa prompt menjadi `words_actual.json`; `cut_check.py suara.wav words_actual.json --source-words words_source.json --map map.json` PASS. Semua kata isi dan durasi fonem harus benar-benar ada—daftar kata hasil remap/caption tersembunyi tidak membuktikan audio utuh. Dengar setiap sambungan dan cek ekor kata, onset kata berikut, serta lubang fade-to-zero.

### 14.A Memilih suara: logika
Bagian ini menentukan **suara apa dan kapan**; §14.0–14.10 memeriksa **sumber dan kualitas mix**. Pilihan diturunkan dari dua kolom tabel beat yang sudah ada: mekanik (`kamera-gerak.md`) dan nada (`pacing-map.md`). Suara lahir dari gerak, bukan dari kata.

**Mekanik visual → SFX**

| Mekanik | SFX (stok §14.8) | Waktu |
|---|---|---|
| Punch-in serius | dentum pendek (`v17_thud_1`), **hanya di punch-in terkuat** | onset kata kunci |
| Whip | whoosh tipis (`v17_whip_1/2`) | puncak di frame blur tengah |
| Push-through | riser pendek → impact | riser mengikuti dorongan, impact di cut |
| Pull-back reveal | whoosh mundur / udara (whoosh gelombang) | selama mengecil |
| Orbit gather, kartu masuk | pop lembut, satu per kartu yang terlihat terpisah (`soft-subtle-ui-pop`, §14.9 stagger) | saat kartu mendarat |
| Flash montage | klik shutter 1:1 per foto | per foto |
| Teks diegetik di UI | tap UI (`ipad_click`) | saat teks muncul |
| Ganti topik | swoosh transisi (whoosh gelombang) | di cut |

**Nada → musik dan karakter SFX** (jumlah SFX dari kiblat, Lantai E24)

| Nada | Musik | Karakter SFX |
|---|---|---|
| Serius / klaim | turun ke drone, **turun bukan hilang** | lebih pelan, beri ruang di kata |
| Penjelasan / data | bed stabil | tick UI pada data |
| Analogi / ringan | elemen ringan masuk | main-main, bernada |
| Emosional | tipis, satu instrumen | paling lembut, level rendah |
| Puncak | **drop jatuh tepat di kata puncak** | hit terbesar video |
| Penutup / CTA | resolve, melambat | aksen terbesar di CTA |

Satu event satu suara; tidak ada suara yang tidak terikat ke sesuatu di layar. Setiap cue di lembar cue menyebut mekanik atau nada yang melahirkannya.


### 14.0 Gerbang sumber SFX (WAJIB sebelum menyusun cue apa pun)
Yang dicegah gerbang ini: memakai bank bunyi **sintetis** (earshot `pool/bank`) atau bunyi Mixkit yang tidak sesuai gaya sebelum sumber milik user dicek.

Aturan:
1. **Inventaris dulu, dalam urutan ini**, dan tulis hasilnya di `STATUS.md` proyek. Urutan = urutan mencari, **bukan batas**: bila tidak ada file yang cocok untuk satu peran, lanjut ke sumber berikutnya:
   - (a) folder SFX lokal bila ada (mis. `SFXIrfan` dan `Kenyset` bila tersedia di mesin ini); tanpa folder lokal, mulai dari (c);
   - (b) folder `sfx/` proyek yang sudah disetujui, misalnya `projects/jadisatu-60s/remotion/sfx-el` di repo ini;
   - (c) sumber gratis berlisensi lewat `scripts/audio/sfx_cari.py --famili <id>` (Freesound CC0 + Mixkit) dan `scripts/audio/musik_cari.py --kategori <k>` (Mixkit), lalu ElevenLabs SFX dan Music bila ada akunnya (biaya disebut dulu); Epidemic Sound hanya bila MCP `Epidemic_Sound` ada di daftar tool sesi atau `~/.config/epidemic/key` tidak kosong (`guide/sfx/FAMILI.md` §2).
   Musik mengikuti urutan yang sama: kandidat berlisensi (bawaan ≥ 20 dari ≥ 2 sumber). Brief atau orkestrator tidak boleh mempersempit sumber audio ("hanya pustaka yang sudah dipakai") tanpa alasan tertulis dari user.
2. **Akses dipastikan di awal.** Folder belum terhubung, kredensial belum ada, atau situs memblokir: catat di `STATUS.md`, lewati ke sumber berikutnya, dan sebut sumber yang tak terjangkau di laporan kirim. Jangan lanjut dengan pengganti karangan (butir 3).
3. **Dilarang memakai bunyi sintetis/karangan sebagai SFX final.** Termasuk bank earshot `sfx_render`, sinus, dan noise generator. Bank earshot hanya untuk analisis/QA.
4. **Gaya Apple motion** = rekaman UI nyata:
   - klik app/iPad/mouse;
   - **tick (pilar 3; per kata hanya bila `per-word`, selain itu per elemen UI) = klik impuls tunggal rekaman nyata** (tuts keyboard digital atau typewriter, saklar, shutter, dial); bukan thock kayu atau rentetan ketikan untuk tiap kata;
   - **whoosh "wave" halus** (swoosh udara lembut), bukan angin badai atau terowongan;
   - pop/notif iOS yang lembut.
5. **VO tidak diberi reverb/ekor ruang buatan.** Narator TTS harus kering dan dekat; ekor ruang membuatnya terdengar menggema.

### 14.1 Hierarki mix
1. **VO pemilik panggung**: VO narator kompresi ringan, +2 dB di 3 kHz. Suara sumber klip yang terukur bersih tidak diproses; rekaman sendiri di kamar dibersihkan jedanya (§14.6).
2. **SFX penekan**: SFX besar jatuh di sela kata; dynamic EQ 200–500 Hz pada SFX saat VO; HPF 40 Hz bus SFX.
3. **Musik pembangun emosi & level SFX alami**: musik diletakkan tetap di bawah VO sebagai bed emosi (±−16…−22 dB di bawah ucapan, bukan −4 dB yang menenggelamkan SFX), −4 dB di 3 kHz. SFX momen/gerakan dimulai pada level alaminya (`0 dB` dasar) dan baru disesuaikan bila mengalahkan VO. **Dynamic ducking lewat automation, bukan kompresor**: musik turun saat dialog dan naik halus di jeda ≥ 0,3 dtk dan transisi visual, dengan ramp ≥ 250 ms dan lookahead ±250 ms; level di §14.10. Tidak naik-turun per kata, karena pompaan cepat terdengar.
4. **Semua angka level ada di satu tempat: tabel §14.10.** Bagian lain tidak menulis angka level sendiri.

### 14.2 Musik: beberapa cue sesuai babak (tidak pernah satu bed dari awal sampai akhir)
- Dua babak energi (Holy Freak):
  - hook/masalah: bed musik/sub + SFX padat (±2,5/dtk)
  - penjelasan/solusi: musik tipis, SFX ±1/dtk; musik turun, tidak bolong (Lantai E25)
  - engsel: satu riser panjang (±50 f) + hit tepat di kata pivot
- Contoh: tegang/repetitif (masalah) → tape-stop/kill tepat di engsel → jernih/rasional → bertenaga (demo) → hangat lega (CTA).
- Grid beat diukur dengan librosa. Cut besar di downbeat, kamera mulai/mendarat di beat (±2 f).
- Bass putus ±1 dtk sebelum atau tepat di cut ke end card.

### 14.3 Penempatan SFX (acuan Baikov: "SFX mendukung semua visual")
- **SFX menandai momen cerita dan gerak yang terlihat; kosakata dan kepadatan dari kiblat** (Lantai E24):
  - momen: pembuka, judul/jawaban hook, twist (riser → drop), puncak, penutup;
  - gerak kamera besar dan benda yang muncul/mendarat/diklik karena ucapan;
  - kata kinetik hanya di pergantian kata kunci (triad), **tidak per kata**; subtitle bawah tidak berbunyi (tick per kata hanya bila `kt_tick: per-word`);
  - rentetan sejenis = satu cue panjang (rattle); cut di suku kata dan sisipan wajah boleh senyap.

  Cakupan event (`scripts/audio/visual_coverage.py`) hanya informasi, bukan target.
- **Peran + alasan wajib di setiap cue SFX dan musik**: `{t, peran, alasan, file, terikat_ke_visual, offset, dB}`. `peran` = fungsinya (mis. `kata_kinetik`, `kartu_mendarat`, `transisi`, `musik_babak2`); `alasan` = satu kalimat kenapa bunyi itu ada di titik itu (mis. "kata 'worthy' mendarat, penekanan emosi babak 3"). Cue tanpa peran atau alasan = FAIL di `gate/sfx_density.py`. Tidak ada bunyi yang "sekadar ada".
- **Batasnya spam, bukan jumlah**: whoosh/swoosh/whip maksimal 1 per detik dan puncaknya tidak melebihi puncak VO −6 dB; satu file yang sama tidak diulang dalam 1 detik; maksimal 2 bunyi per 100 ms (§14.9). `gate/sfx_density.py` menandai pelanggaran.
- **Peta SFX yang terbukti**:
  - `t` cue dihitung supaya **puncak** bunyi jatuh di frame visual (t = frame − offset puncak file setelah trim);
  - whoosh **hanya** di gerak cepat yang terlihat (panel wipe, dash, sapuan, slide), puncak di kecepatan tertinggi; tidak pernah di cut;
  - satu pop per elemen ilustrasi yang mendarat; garis tergambar senyap;
  - satu hit rendah untuk end card;
  - tanda rapat yang berulang (mis. 50 tanda X) = satu rattle berirama, bukan 50 tick;
  - dua event < 0,1 dtk (3 f) berbunyi satu (peran prioritas membawa keduanya), supaya tidak flam;
  - mixer mengubah cue gerak yang mulai < 1 dtk setelah cue gerak sebelumnya jadi tick: rencanakan jarak whoosh ≥ 1 dtk.
- **Satu event satu bunyi.** Tidak ada layering beberapa file untuk satu event; pilih satu file yang karakternya sudah lengkap.
- **Waktu @30 fps** (SFX tidak pernah mendahului objek, Lantai E24):
  - pop: +1…+2 f setelah objek terlihat jelas (§14.9)
  - dentum/impact: di frame mendarat
  - hard cut / ganti frame: klik (`cut_click`), atau senyap bila tertutup panel/kanvas yang sedang masuk; **bukan whoosh**
  - push-through / zoom-through: satu riser kontinu yang berakhir di cut, lalu impact di pendaratan
  - slam: impact di frame mendarat; sebelumnya musik turun ke drone, bukan senyap
  - whoosh/riser memuncak di landing, cut, atau v_max kamera (§14.9)
- **Cluster**: elemen yang muncul bersamaan diberi satu rangkaian pop bernada naik (staggered), bukan senapan mesin.
  - Ketikan tetap terdengar sebagai keyboard, jangan ikut di-cluster jadi pop.
  - Seri blip untuk item daftar: bunyi sama, interval tetap.
- **UI micro-pop**: hanya klik/perubahan state UI yang dibicarakan ucapan (tombol yang ditekan, post terbit); hover dan perubahan kecil senyap.
- Transien kecil yang jatuh di konsonan VO digeser ±2 f. Level: §14.10.
- Kepadatan = SFX berlabel di kiblat (kartu §7), bukan onset total: angka onset referensi (4,7–7,7/dtk) memuat ketukan musik. Kepadatan kiblat hanya acuan rasa, bukan batas: jumlah SFX mengikuti jumlah objek/visual penting (Lantai E24). Gerbang `scripts/gate/sfx_density.py render.mp4 cues.json --objects objects.json`: FAIL bila objek tanpa SFX (kecuali `senyap` + `alasan`), satu peran memakai > 1 file atau satu file > 1 peran, dua bunyi < 100 ms, bunyi per kata KT yang tidak berlabel `pilar: tick`, > 5 cue dalam 2 dtk, cue tanpa `dengar`/`peran`/`alasan`, atau palet terlarang. `--ref-density`/`--max-density` hanya dipakai bila user meminta batas. Acuan: kiblat 55 ±0,65/dtk.
- Sinkron: hit bunyi vs onset visual ±1–2 f (±45 ms), dicek per cue dari render.

### 14.4 Titik balik: turun, bukan hilang
Penekanan di titik balik dibuat dengan **musik turun ke drone/room tone** (stop-down ≤ 0,5 dtk), lalu hantaman atau drop di kata pivot. Tidak ada hening total (digital silence), dan musik tidak pernah 0 di bawah klip narasumber (§14.7). Alasan: hening total terdengar seperti audio rusak dan memutus perhatian (Lantai E25). Panjang turunnya mengikuti nada di `pacing-map.md`, bukan resep frame tetap.

### 14.5 Standar "Nyaman, jelas, tanpa ear-fatigue"
**Acuannya palet yang terbukti lulus** (`projects/jadisatu-60s/remotion/tools/audio_build.py`). Bunyi thock/felt/wood ber-LPF 1,5–2,5 kHz tidak dipakai: hasilnya palet gelap seperti ketukan kayu.

- **Sumber**: hanya stok nyata (§14.0), yaitu Kenyset, SFX proyek user, dan ElevenLabs dengan prompt "dry, clean". Tidak ada SFX yang disintesis di kode.
- **Apple-style** berarti:
  - tap/klik digital, contohnya `ipad_click`, `mouse-click`, `pop-up-notify-smooth-modern`;
  - keyboard digital iPhone (`iphone-keyboard-typing`);
  - whoosh gelombang halus (`whoosh-gelombang`, `swoosh-014`, `simple-whoosh-382724`).
- **Disiplin pita per keluarga** (The Gap v17, tanpa saturasi):
  - UI: HPF 300 Hz / LPF 8 kHz, cekungan −4 dB di 2,8–4,5 kHz;
  - gerak: 400 Hz–2,5 kHz;
  - tekstur: 400 Hz–2,6 kHz;
  - low: di bawah 2 kHz + body 150–450 Hz.
- **Jangan menggelapkan klik dengan LPF 1,5–2,5 kHz.** Referensi Audio.mp4 terukur: klik/tick ber-centroid 8–10 kHz, whoosh berpusat di 1,4–1,9 kHz tanpa energi di atas 6 kHz. Yang dibuang adalah desis di atas 6 kHz, bukan kecerahan klik.
- **Dilarang**: ketukan kayu/woodblock/thock, felt knock, koin, logam, kartun, langkah kaki kartun, 8-bit, white/pink noise atau sinus sintetis, `rope-creak`, bank `sfx_render`, salinan bunyi sistem Apple, dan potongan SFX yang "dipahat" dari video referensi orang lain. `sfx_density.py` menolak nama file atau label `dengar` yang cocok; keberadaan file di SFXIrfan tidak mengizinkannya.
- **QA telinga**: Gemini tidak andal untuk level dan timestamp, dan tabel aturannya tidak boleh menggantikan data proyek yang sudah lulus. Ukur dengan alat sendiri; telinga user adalah hakim terakhir.
- Sumber dan lisensi tiap file dicatat di `CREDITS.md`.

---

## 14.6–14.10 Standar mix (Modul 1–5)

Angka diukur dengan `scripts/audio_qa.py`. Contoh hasil ukur satu video (v2) dibandingkan referensi:

| Video | Sub | Low-mid | Penurunan mendadak |
|---|---|---|---|
| v2 | 5,8 % | 67,9 % | 100 |
| Ref Krea 2 | 55,4 % | 33,6 % | 3 |
| Ref Renaissance | 39,3 % | 35,2 % | 17 |

> Krea 2 dan Renaissance adalah referensi musik/motion **tanpa VO**, jadi tidak bisa dipakai sebagai target pita untuk video ber-narasi. Referensi ber-VO terukur: The Gap sub 14 % / low-mid 63 %, Emotion 18 % / 64 %. Lihat §14.10.

Implementasi rujukan ada di `experimental/dual-agent-sound/examples/pengganti-kita-sendiri/v13/`: `assemble12.py`, `mix13.py`, `sfx_rules.py`, `roomtone.py`.

Akar masalah di v2:
- **Low-mid 68 % bukan hanya dari klip berita.** Narator sendiri 72–78 % low-mid karena EQ +1,5 dB @160 Hz.
- **Musik tanpa lapisan sub.** Echoes di-LPF 1,2 kHz, ostinato berupa pluck.
- **Klip Jensen/Altman masuk mentah.** Dimuat tanpa EQ dan level-nya 5–7 dB di bawah narator.
- **Ujung potongan memakai fade 12–30 ms.** Ducking juga pumping saat release.
- **Musik dimatikan ke 0 di bawah Jensen** (aturan lama "hening total", sekarang dicabut).

### 14.6 Modul 1 — pre-processing klip narasumber
Berlaku untuk klip eksternal (berita, wawancara, konferensi, podcast) yang **terukur buruk** (gema, boxy, level jauh dari narator). Klip yang sudah bersih tidak diproses; levelnya hanya boleh dinaikkan dengan gain linear bila terlalu pelan (tidak pernah diturunkan), tanpa EQ/denoise/kompresor, dan dibuktikan dengan `scripts/gate/voice_fidelity.py sumber.mp4 render.mp4` (udara > 9 kHz ≥ 70 % sumber, LRA turun ≤ 2 LU). Rantai untuk klip yang terukur buruk:

**Rekaman sendiri (talking head di kamar).** Ukur dulu dengan `scripts/gate/pause_clean.py stem_suara.wav words.json`. Bila lantai jeda > −50 dBFS atau ada bunyi tajam di jeda (piring, klik, benturan): high-pass 70 Hz + `afftdn` sangat ringan (nr 3, nf −55; nr 8 mengikis udara > 9 kHz, `voice_fidelity.py` FAIL), lalu jeda antarkata ≥ 0,15 dtk diredam −36 dB dengan ramp 25 ms, rentang ucapan dilindungi [awal − 0,06; akhir + 0,12] dtk (resep: `projects/builder-trap-r2/audio/voice_clean.py`). Jangan mengisi jeda antarpotongan dengan room tone dari kamar yang sama. Gate yang dilarang di bawah ini berlaku untuk klip narasumber bergema, bukan untuk jeda rekaman sendiri.

```
ffmpeg -y -i klip_mentah.mp4 -vn -af "pan=mono|c0=0.5*c0+0.5*c1,highpass=f=120:poles=2,equalizer=f=320:t=q:w=1.8:g=-5.0,equalizer=f=3200:t=q:w=1.4:g=2.5,lowpass=f=9000:poles=2,afftdn=nf=-25,volume=<gain_naik>dB" -ar 48000 -ac 2 klip_bersih.wav
```
- **mono**: side/mid = 0, menghapus gema fase ruangan;
- **HPF 120 + mud cut −5 dB @320 Hz**: anti-boxy;
- **+2,5 dB @3,2 kHz**: kejelasan;
- **afftdn** meredam noise; **tanpa kompresor, limiter, atau loudnorm** pada suara asli (Lantai E23).
- **Level**: gain linear NAIK saja (`volume=+X dB`), dihitung supaya suara ±−16 LUFS; tidak pernah diturunkan. Bila puncak akan > −1 dBFS, target gain diturunkan sedikit, bukan ditutup limiter. Bukti: `scripts/gate/voice_level.py`.
  - **Sumber rekaman sendiri pelan dengan puncak terpotong saat rekam** (headroom < gain yang dibutuhkan): terima level sumber lewat `voice_level.py --terima-pelan "<alasan>"`; suara tetap tanpa limiter, kompresor, atau declip. Suara harus jelas dan bersih dari peredam noise + EQ di atas; musik/SFX yang turun menyesuaikan.
  - Limiter hanya untuk stem musik/SFX, tidak pernah untuk suara.
  - Tambahkan **mud cut kedua −3 dB @220 Hz** untuk suara pria/ruang konferensi. Hasil uji: low-mid Altman 56 → 41 %, Gates 51 → 33 %.
  - **Jangan pakai gate/expander**: tidak mengurangi gema, dan menambah potongan mendadak di dalam ucapan.
- **Cara mengukur gema**: ekor energi 40–150 ms setelah akhir kata, relatif ke level kata (pakai timestamp STT).
  - Autokorelasi lag 15–23 ms **tidak valid** untuk ucapan, karena terdominasi periodisitas F0 (2 periode suara pria ±15–20 ms) dan ikut naik oleh sub-pad 41 Hz.
- **EQ narator juga dicek.** Tanpa boost 150–300 Hz; mulai dari HPF 90, −4,5 dB @300 Hz Q1, +1,5 dB @3 kHz. Ukur low-mid hasil akhirnya.

### 14.7 Modul 2 — tanpa potong mendadak (guillotine), J-cut / L-cut, bed kontinu
- **Larangan keras**: audio klip berhenti tepat di frame terakhir potongan tanpa handle/fade.
- **Handle dari audio sumber**:
  - pre-roll ≤ 4 f (133 ms), fade-in ease-out quad;
  - post-roll ≤ 8 f (266 ms), fade-out ease-in cubic sepanjang handle;
  - handle ditumpuk di atas celah **tanpa menggeser timeline**;
  - handle dibatasi supaya tidak memasukkan kata tetangga dari sumber (pakai timestamp kata STT). Bila kata berikutnya menempel, beri minimal 35 ms fade, tetap setelah konsonan terakhir.
- **Jangan memotong di tengah kata/fonem**: post-roll ≥ 150–250 ms setelah konsonan terakhir bila sumber memungkinkan.
- **Bridge SFX di setiap perpindahan** berita→berita, berita→VO, VO→klip, dan klip→VO:
  - jenis bunyi: tape switch, camera shutter, atau sub-whoosh LPF ± 250 ms;
  - puncaknya tepat di frame pergantian visual.
- **Room tone sumber** mengisi celah antarpembicara (jendela paling hening klip itu sendiri, di-loop dan di-crossfade; `roomtone.py`).
- **Bed musik/sub-pad tidak pernah 0** saat klip bicara:
  - turun 6 dB dengan ramp 12 f sebelum klip dan naik lagi 15 f sesudah klip;
  - beat drop ke hening total tidak dipakai lagi.
- **Proyek yang menaruh audio di Remotion** (bukan pre-mix) wajib memakai `scripts/remotion/SmoothAudioClip.tsx` (pre-roll, post-roll, envelope fade).
  - Hati-hati: `<Sequence>` yang durasinya sama dengan potongan visual meng-unmount audio seketika.

### 14.8 Modul 3 — taksonomi & palet SFX
Dilarang:
- whoosh dari white/pink noise mentah;
- beep/blup sinus 8-bit;
- laser sci-fi sintetis (stok user `Lasertransision` dan `ES_Scifi…Glitch 02` tetap boleh sesuai fungsinya);
- langkah kaki kartun.

**Tidak dipakai:** wood/felt, thock LPF 1,5 kHz, lapisan sub thump di bawah whoosh, dan micro-tick + felt pulse, karena:
- dua bunyi untuk satu event melanggar aturan "1 adegan 1 pesan 1 SFX";
- palet gelap bertentangan dengan referensi dan dengan palet The Gap.

Satu peran memakai **satu bunyi yang sama sepanjang video**, sama seperti aturan tipografi. Satu event hanya mendapat **satu bunyi**.

| Visual | Bunyi (stok user) | Catatan |
|---|---|---|
| Kata KT muncul (pilar 3, tick) | klik impuls tunggal famili `mekanik` (`FAMILI.md` §0), 2–4 varian + playbackRate 0,95–1,05 | satu tick per kata yang muncul (bila `kt_tick: per-word`); klik mouse hanya untuk kursor yang benar-benar mengklik |
| Kata slam/penekanan | `v17_thud_1` (dentum pendek) | satu bunyi, bukan pop + sub |
| Ketikan (teks yang benar-benar diketik) | satu rentang ketikan per kalimat (`iphone-keyboard-typing` atau typewriter, sesuai gaya) | bukan thock kayu |
| Kursor/tombol ditekan | `mouse-click-290204` | |
| Kartu/UI/agent muncul | `pop-up-notify-smooth-modern` | |
| Kartu/tile mendarat | `soft-subtle-ui-pop` | |
| Kamera patah / transisi dengan gerak cepat terlihat | satu file whoosh yang sama sepanjang video, puncak di v_max | tanpa lapisan sub |
| Cut / ganti frame / potongan antar pembicara tanpa gerak | klik cut pelan; senyap bila tertutup panel yang masuk | bukan whoosh |
| Whip / cut on motion | `v17_whip_1/2` | |
| Zoom-through / build | `riser` (ElevenLabs, video #2), berakhir di cut | |
| Beat drop / pendaratan besar | `v17_impact_1`, ekor ≤ 0,9 dtk | tidak ada hantaman di frame 0 (The Gap D-038) |
| Foto montase berganti / gambar berganti | `Pergantianfoto` (SFXIrfan, satu klik) atau shutter; di montase cepat (< 0,7 dtk/shot) berselang, bukan 1:1 | bukan whoosh/swipe |
| Bidang cahaya menyala/padam | `switch` (klik saklar) | |
| Garis/grafik tergambar | `v17_glide_2` | |
| Penutup | jeda pra-drop −18 dB (bukan hening mati) → bass drop + ekor musik asli | tanpa akor sinus |

### 14.9 Modul 4 — sinkron kurva kamera ↔ audio (velocity-peak)
- Kamera Apple-style tidak linear: spring (stiffness 160–220, damping 22–28) atau `cubic-bezier(0.22, 1, 0.36, 1)`. Kecepatan maksimum ada di 25–35 % durasi gerak.
- **Whoosh/swell**:
  - puncak transien jatuh tepat di frame v_max kamera;
  - file dimulai 3–4 f sebelumnya;
  - ekornya mereda mengikuti settle;
  - rumus: `sfxStart = camStart + round(0.28 × moveDur) − whooshPeakOffset`;
  - di cue, pakai `align:"peak"` + `peak` = detik puncak di file.
- **Pop/klik kemunculan**: transien di +1…+2 f setelah skala melewati 0,6 (objek pertama kali terlihat jelas), bukan di frame 0.
- **Stagger banyak item** (grid, barisan): item yang masuk terpisah (> 2 frame) masing-masing mendapat satu bunyi dari peran yang sama; item yang muncul bersamaan dalam ≤ 2 frame dihitung satu event. Maksimal 2 bunyi per 100 ms, dan dua bunyi berperan sama tidak boleh jatuh dalam 100 ms (The Gap `sync_cues.py`). Kata KT yang muncul mendapat tick per kata bila `kt_tick: per-word` (pilar 3: varian berputar, playbackRate 0,95–1,05, level detail); subtitle bawah yang hanya berganti tidak berbunyi (Lantai E24).

### 14.9b Resep mix yang terbukti
Dicek setiap mix:
- **Tidak ada auto-gain atau kompresor yang menaikkan bed musik di jeda bicara**. Bed dibuat rata per babak dengan gain tetap; kenaikan di jeda panjang atau antarbabak hanya lewat automation tetap ber-ramp ≥ 250 ms (§14.1 butir 3), besarnya di tabel §14.10.
- **Kejernihan suara dicapai dengan musik yang turun saat dialog lewat automation** (§14.1 butir 3), bukan kompresor sidechain: ramp ≥ 250 ms, tidak per kata, naik lagi hanya di jeda ≥ 0,3 dtk dan transisi visual.
- **Urutan proses**: normalisasi loudness musik dulu, baru envelope/duck. Bila duck dipasang sebelum normalisasi, normalisasi mengembalikan level yang di-duck (v2 awal: duck −6 dB hilang, gain musik −7,3 → −4,0).
- **SFX diratakan di puncak bunyinya** (`align: peak` default): file dengan awalan sunyi (`pin.mp3` 0,41 dtk, `basmenyebar` memuncak di 1,27 dtk) berbunyi terlambat bila ditaruh di onset.
- **Boom sub-bass tidak terdengar di speaker HP** (high-pass ±300 Hz): untuk momen yang harus terdengar di HP, pilih hit yang punya isi 300 Hz–3 kHz; sub murni hanya "terasa" di headphone.
- **Stem ditulis float** (`subtype='FLOAT'`): WAV 16-bit memotong suara yang di-gain di atas 0 dBFS, lalu alat QA membaca clipping palsu.
- **Uji HP dengan stem versi yang sama**: `audio/audio_phone.py --root <folder berisi stem_vo/stem_music/stem_sfx/mix/cues versi ini> --list` — target: setiap SFX momen terdengar di 50 %, jendela suara < 8 dB di atas bed ≤ 5.

### 14.10 Modul 5 — gerbang QA audio otomatis (wajib sebelum render/kirim final)
```
python3 claude/motion-graphic/scripts/audio_qa.py mix_master.wav --module5 <stem_dir> timeline.json placed.json
python3 claude/motion-graphic/scripts/audio_qa.py mix.mp4 ref1.mp4 ref2.mp4   # bandingkan dengan referensi segenre
```
Lulus bila semua terpenuhi:

| Cek | Ambang |
|---|---|
| Integrated | mengikuti suara (suara ±−16 LUFS, mix biasanya −14…−16); **tidak dikejar dengan loudnorm/limiter global** |
| True peak | ≤ −1 dBTP |
| Pita spektral | **dibandingkan dengan referensi segenre (video ber-VO), bukan angka tetap.** The Gap: sub 14 % / low-mid 63 %. Emotion: sub 18 % / low-mid 64 %. Jangan memakai sub 25–55 % / low-mid < 42 %: angka itu dari referensi musik tanpa VO dan mendorong penambahan sub-pad sinus. |
| Abrupt cutoff (> 18 dB/50 ms) di ujung klip narasumber | tidak ada celah mati: di potongan antar pembicara selalu ada jembatan (whoosh + musik/room tone), jendela 100 ms < −45 dBFS = 0. Penurunan di akhir kata VO kering itu normal (The Gap 46). |
| Kepadatan & level SFX (demucs no_vocals, `refaudit/sfx_profile.py`) | event menonjol ±1,8–2,1/dtk; puncak SFX median ±−9…−10 dB dari puncak VO; bed −13…−15 dB di bawah VO (The Gap: 2,05/dtk, −10 dB, −14,8 dB) |
| Gema VO | energi ekor 40–150 ms setelah kata ≤ −25 dB dari kata (`scripts/audio/vo_echo.py`) |
| VO / suara asli per blok | ≥ −17 LUFS, tidak pernah lebih pelan dari sumbernya, crest turun ≤ 2 dB (`gate/voice_level.py`) |
| Klip narasumber per blok | sama dengan baris di atas; antarnarasumber disamakan dengan gain naik, bukan turun |
| Musik di bawah VO | −22…−25 LUFS |
| Musik di jeda ≥ 0,3 dtk / transisi visual | naik +3…+6 dB dari level saat dialog lewat automation ramp ≥ 250 ms, lookahead ±250 ms (titik awal: gain 0,12 saat dialog → 0,25 di jeda); referensi terukur: median +0,6 dB, jangkauan −8,9…+6,0 (`guide/sfx/FAMILI.md` §4) |
| Bed ambien (pilar 1) | rekaman room tone/projector hum/vinyl/tape, konstan sepanjang video, ±−36 LUFS di mix (titik awal: file −20 LUFS × gain 0,10); tanpa clipping/distorsi (`sfx_vet.py --famili ruang`) |
| Gain SFX setelah normalisasi puncak | −4…−10 dB (lantai −10; −33 dB tidak terdengar) |
| Sebaran RMS bed musik per 3 dtk | ≤ 4 dB, tanpa lubang (Behindwork 1,1–3,2 dB) |
| Median puncak SFX UI per kelas | −16…−20 dBFS |
| Median puncak ketikan | −22…−25 dBFS |
| Hit terbesar video (puncak) | ≈ setara puncak VO, maksimal 1–2 per video |

**Resep mix yang terbukti**:
- musik masuk di −15,5…−16,5 dB (track ber-beat/sub bass 1 dB lebih rendah); `dynaudnorm` + auto-gain RMS tahap 2 (1 dtk, maks ±8 dB; jangan menaikkan bed di jeda bicara) meratakan breakdown → sebaran bed 1,1–3,2 dB;
- kantong EQ untuk suara (−4 dB 2,8 kHz, −2 dB 450 Hz), gerak musik saat kata ≤ 1,5 dB;
- tidak ada limiter di bus master yang memuat suara: limiter yang bekerja memipihkan suara ("mendem"). Loudness dicapai dengan menaikkan suara secara bersih, musik/SFX menyesuaikan;
- puncak mix ≤ −1 dBTP dicapai dengan otomasi gain lokal dan penangkap true peak oversampled pada stem musik/SFX saja (sebelum dijumlah dengan suara): `ffmpeg -i stem_musik.wav -af "aresample=192000,alimiter=limit=0.85:attack=1:release=50:level=false,aresample=48000" stem_musik_tp.wav`; suara = stem terkunci × 1,0; puncak sampel dari skrip bukan true peak;
- saat mux ke AAC turunkan −0,4 dB, karena AAC menaikkan puncak ±0,5 dB (N2 sebelum diperbaiki: −0,9 dBTP di MP4);
- hasil 3 klip: −14,2 LUFS, −1,4 dBTP WAV, `voice_fidelity` PASS (ΔLRA −0,1…+0,2).

Catatan pengukuran:
- Stem dialog mono harus diukur sebagai stereo (+3 dB), karena diputar di kedua kanal.
- Angka gerbang dilaporkan apa adanya ke user.

**Tidak dipakai lagi** (abaikan bila masih tertulis di proyek lama):
- gerbang LRA ≥ 7 LU;
- "musik mati / hening total saat klip Jensen";
- beat drop ke hening 1 dtk sebelum klip;
- dinamika narator per babak (−2,5 / −4 dB).
