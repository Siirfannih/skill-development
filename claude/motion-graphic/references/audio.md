# Audio — VO, SFX, musik

Baca hanya di gerbang audio (setelah script dan storyboard final) dan saat QA audio. Nomor § sama dengan motion-director v3 agar rujukan lama tetap berlaku.

## 14. Audio

### 14.0A Kategori suasana dulu, baru cari audio (Irfan 6 Nov)
Sebelum memilih musik atau SFX apa pun, tulis di brief **satu kategori suasana per babak** (juga untuk klip podcast: musik per babak, aturan 25). Kategori diturunkan dari **tempo video**, bukan selera siapa pun: video cepat (cut rapat, bicara cepat) butuh musik cepat yang menyaingi tempo; video tenang butuh musik tenang (Irfan 6 Nov). Ukur dulu: `python3 scripts/audio/pace_read.py video.mp4 [--words words.json]` (cut/menit, event visual, laju bicara → usulan kategori + rentang bpm). Lalu cek isi: masalah/ancaman → `tegang`, harapan/CTA → `hangat`. Tulis alasannya satu baris.

| Kategori | Kapan | Musik (profil terukur di `music-profiles.json`) | Karakter SFX (jumlah dari kiblat, aturan 43) |
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
Skrip mengukur tempo yang dirasakan, kepadatan ketukan, kecerahan, build/drop, dinamika, mayor/minor, dan **benturan dengan suara**: selisih suara vs musik di pita 500–4000 Hz pada level rencana (min 12 dB; ≤ 4 dB kurang = boleh diatasi EQ −4 dB §14.1, lebih dari itu ganti track). Pakai track teratas yang `PAKAI`; tulis keluarannya di laporan Delivery Gate. bpm/onset di luar rentang = `GUGUR`; earshot rank wajib jalan (skrip berhenti bila tidak terpasang); kandidat < 8 file atau dari < 2 folder sumber = FAIL (Irfan 8 Nov).

**Cara memilih backsound yang terbukti** (Irfan 9 Nov, Behindwork: "pemilihan audio tepat, penggunaan backsound tepat"; 3 short Naval):
1. Kumpulkan **≥ 20 kandidat dari ≥ 2 sumber** (pustaka lokal + YouTube lewat `yt-dlp`, sumber dicatat di `SOURCES.md`). Gerbang skrip tetap FAIL di < 8; 20 adalah target kerja.
2. Peringkat dengan `music_fit.py` pada **potongan yang benar-benar dipakai** (`--duration` = durasi video, mulai dari offset yang akan dipakai), bukan track utuh: onset bisa berayun 2,2 → 3,6 hanya karena titik mulai bergeser (N3 Embrace: mulai 32 dtk = 2,22, 34–44 dtk = 3,1–3,6).
3. Kenali dengan `earshot describe` pada potongan itu: instrumental (tanpa tag Speech/Singing AudioSet) dan mood sesuai brief.
4. Tolak bila menutupi suara (masking > 4 dB di 500–4000 Hz), terbaca sedih/melankolis padahal brief tidak, atau bpm/onset di luar rentang.
5. Tiap klip satu genre berbeda (Behindwork: orkestra Forzisimo / lo-fi Canals / chillstep Embrace).
6. Pilih bagian yang **tidak punya breakdown di dalam durasi klip** (lewati intro braam, dip, outro fade); cek RMS 5 dtk potongannya.

Profil di `music-profiles.json`: `energi` disesuaikan dengan 6 video referensi Irfan (musik ±104–136 bpm, `guide/referensi/`); kategori lain masih hipotesis. Kalibrasi dari **stem musik video referensi yang suasananya cocok** (bukan dari track favorit): `music_fit.py --calibrate <k> stem1 stem2 stem3`. SFX untuk kandidat: `earshot rank "<peran>" kandidat/*` untuk karakter, `sfx_comfort.py` untuk desis; jumlahnya mengikuti event visual (aturan 43), bukan kategori.

### 14.0B Mengenali audio: earshot = skor pertama, lalu divalidasi (Irfan 8 Nov)
Claude tidak mendengar sendiri. Setiap alat telinga punya titik buta, jadi kesimpulan "audio ini seperti apa" diambil dari beberapa sumber yang saling dicek, bukan dari satu label.
1. **Input bersih dulu.** Label musik diambil dari **stem musik** (stem proyek, atau pisahkan suara dengan `demucs` untuk referensi), bukan dari mix yang ada suaranya. Bukti 8 Nov, track piano V5: track asli → "jazz, solo piano, sedih"; stem musik → "solo piano +3,5, sedih +3,7"; mix dengan suara podcast → "funk, vocal chop +3,1". Earshot benar; inputnya yang tercampur.
2. **Earshot memberi skor awal** (`describe`, `match`, `timeline`): label + z. Itu hipotesis, bukan putusan.
3. **Cek dengan minimal satu sumber lain yang independen:**
   - ukuran: `music_fit.py` / `pace_read.py` (bpm, mayor/minor, kecerahan, kepadatan ketukan, dinamika per babak);
   - telinga kedua: Gemini mendengar file yang sama (`agy` di Mac, fallback Gemini API), diberi pertanyaan spesifik ("instrumen utama?", "tempo terasa cepat/lambat?", "suasana berubah di detik berapa?"), bukan "deskripsikan";
   - metadata sumber: judul/tag Epidemic, `SearchSimilarToRecording`, catatan pustaka asal file;
   - identitas track: `gate/music_batch.py` (sidik jari) untuk "apakah ini track yang sama".
4. **Sepakat → pakai. Berbeda → cari sebabnya** (input tercampur suara? jendela waktu salah? label di luar kosakata earshot? metadata salah?), lalu tulis mana yang benar dan buktinya. Jangan memilih diam-diam salah satu.
5. Laporan audio memuat tabel kecil: klaim → sumber yang setuju → sumber yang tidak → putusan.

### 14.0C Urutan sound design: satu lapisan dikunci, baru lapisan berikutnya (Irfan 8 Nov)
Sound design = suara (VO/vokal), SFX, dan musik latar sebagai satu kesatuan. Lapisannya dikerjakan **berurutan**, setiap lapisan dicocokkan ke lapisan yang sudah terkunci. Gagal V5: visual, SFX, dan musik dikerjakan paralel tanpa tahap mencocokkan, sehingga SFX tidak terikat ke gerak (cakupan 5–11 %) dan musik dipilih tanpa mendengar videonya.

Pilih mode di brief dan tulis alasannya:

| Mode | Urutan | Kapan |
|---|---|---|
| `konten` (default) | suara → visual → SFX → musik | Video yang digerakkan isi/ucapan: klip podcast, explainer, iklan dengan VO. Visual mengikuti timing suara; SFX disusun dari event visual yang sudah jadi; musik dipilih terakhir karena "tipe videonya begini, jadi musiknya ini" |
| `musik` | musik → visual → SFX | Video yang digerakkan lagu/ketukan: video lirik, montage potong di ketukan. Musik menentukan timeline; visual dipotong di ketukannya; SFX menyusul event visual |

Langkah mode `konten`:
1. **Suara dikunci**: VO final (atau audio sumber klip utuh). `audio_order.py init --mode konten` lalu `lock suara`.
2. **Visual dibangun di atas timing suara**, render tanpa audio, `lock visual`.
3. **SFX dari event visual terkunci**: mulai dari `cues.json` storyboard, lalu geser ke onset nyata di render (`sync_cues.py`); bunyi untuk momen cerita dan gerak terlihat (aturan 43), tiap cue punya peran + alasan. `lock sfx` menjalankan `sfx_density.py` terhadap render terkunci.
4. **Musik paling akhir**: render preview visual + SFX tanpa musik, dengarkan/ukur (`pace_read.py`), tentukan kategori suasana per babak, pilih kandidat (`music_fit.py`, kenali dengan `ears.py`), lalu `lock musik --peran --alasan --didengar preview.mp4`.
5. **Mix dan QA**: `audio_order.py check` harus PASS sebelum render final.

Revisi visual setelah SFX/musik dikunci membuat lapisan sesudahnya **basi** (`check` = FAIL): SFX disinkron ulang ke render baru, musik didengar ulang. Ini yang mencegah "visual diubah, audio ketinggalan".

### 14.A Memilih suara: logika (Irfan 6 Nov)
Bagian ini menentukan **suara apa dan kapan**; §14.0–14.10 memeriksa **sumber dan kualitas mix**. Pilihan diturunkan dari dua kolom tabel beat yang sudah ada: mekanik (`motion-mechanics.md`) dan nada (`pacing-map.md`). Suara lahir dari gerak, bukan dari kata.

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

**Nada → musik dan karakter SFX** (jumlah SFX dari kiblat, aturan 43)

| Nada | Musik | Karakter SFX |
|---|---|---|
| Serius / klaim | turun ke drone, **turun bukan hilang** | lebih pelan, beri ruang di kata |
| Penjelasan / data | bed stabil | tick UI pada data |
| Analogi / ringan | elemen ringan masuk | main-main, bernada |
| Emosional | tipis, satu instrumen | paling lembut, level rendah |
| Puncak | **drop jatuh tepat di kata puncak** | hit terbesar video |
| Penutup / CTA | resolve, melambat | aksen terbesar di CTA |

Satu event satu suara; tidak ada suara yang tidak terikat ke sesuatu di layar. Setiap cue di lembar cue menyebut mekanik atau nada yang melahirkannya.


### 14.0 Gerbang sumber SFX (WAJIB sebelum menyusun cue apa pun; Irfan 31 Okt 23:38)
Kesalahan terbesar di proyek *Pengganti Kita Sendiri*:
- Agent memakai bank bunyi **sintetis** (earshot `pool/bank`) dan bunyi Mixkit yang tidak sesuai gaya.
- Sumber milik Irfan tidak dicek lebih dulu.
- Akibatnya 2 jam kerja audio terbuang.

Aturan:
1. **Inventaris dulu, dalam urutan ini**, dan tulis hasilnya di `STATUS.md` proyek. Urutan = urutan mencari, **bukan batas**: bila tidak ada file yang cocok untuk satu peran, lanjut ke sumber berikutnya (Irfan 8 Nov):
   - (a) folder SFX Irfan: PC server `~/sfx/SFXIrfan` dan `~/sfx/Kenyset` (Mac: `~/Downloads/SFXIrfan`, `~/Downloads/Kenyset`);
   - (b) folder `sfx/` proyek yang sudah disetujui, misalnya `projects/jadisatu-60s/remotion/sfx-el` di repo ini;
   - (c) Epidemic Sound (MCP `Epidemic_Sound`, SFX dan musik), sumber internet berlisensi (Pixabay, Freesound CC0, Mixkit), ElevenLabs SFX dan Music.
   Musik mengikuti urutan yang sama: kandidat ≥ 8 dari ≥ 2 sumber. Brief atau orkestrator tidak boleh mempersempit sumber audio ("hanya pustaka yang sudah dipakai") tanpa alasan tertulis dari Irfan (gagal: V5 8 Nov).
2. **Akses dipastikan di awal.** Folder belum terhubung, kredensial belum ada, atau situs memblokir: minta izin atau lapor ke Irfan **sebelum** bekerja. Jangan lanjut dengan pengganti karangan.
3. **Dilarang memakai bunyi sintetis/karangan sebagai SFX final.** Termasuk bank earshot `sfx_render`, sinus, dan noise generator. Bank earshot hanya untuk analisis/QA.
4. **Gaya Apple motion** = rekaman UI nyata:
   - klik app/iPad/mouse;
   - **keyboard digital (iPhone/Magic Keyboard), bukan tick/thock mekanik**;
   - **whoosh "wave" halus** (swoosh udara lembut), bukan angin badai atau terowongan;
   - pop/notif iOS yang lembut.
5. **VO tidak diberi reverb/ekor ruang buatan.** Narator TTS harus kering dan dekat; ekor ruang membuatnya terdengar menggema.

### 14.1 Hierarki mix
1. **VO pemilik panggung**: VO narator kompresi ringan, +2 dB di 3 kHz. Suara sumber klip yang terukur bersih tidak diproses; rekaman sendiri di kamar dibersihkan jedanya (§14.6).
2. **SFX penekan**: SFX besar jatuh di sela kata; dynamic EQ 200–500 Hz pada SFX saat VO; HPF 40 Hz bus SFX.
3. **Musik pembangun emosi**: diletakkan tetap di bawah VO (level di §14.10), −4 dB di 3 kHz. **Tidak ada ducking kompresor 6–12 dB**: musik bergerak ≤ 1,5 dB saat kata diucapkan (anti-pumping) dan hanya naik di jeda panjang/antarbabak lewat automation ramp ≥ 250 ms. Alasan: musik yang sudah duduk di level yang benar tidak perlu dipompa, dan pompaan terdengar (The Gap v17, Irfan 26 Okt; diputuskan 6 Nov).
4. **Semua angka level ada di satu tempat: tabel §14.10.** Bagian lain tidak menulis angka level sendiri (Irfan 6 Nov).

### 14.2 Musik: beberapa cue sesuai babak (tidak pernah satu bed dari awal sampai akhir)
- Dua babak energi (Holy Freak):
  - hook/masalah: bed musik/sub + SFX padat (±2,5/dtk)
  - penjelasan/solusi: musik tipis, SFX ±1/dtk; musik turun, tidak bolong (aturan inti 32)
  - engsel: satu riser panjang (±50 f) + hit tepat di kata pivot
- Contoh: tegang/repetitif (masalah) → tape-stop/kill tepat di engsel → jernih/rasional → bertenaga (demo) → hangat lega (CTA).
- Grid beat diukur dengan librosa. Cut besar di downbeat, kamera mulai/mendarat di beat (±2 f).
- Bass putus ±1 dtk sebelum atau tepat di cut ke end card.

### 14.3 Penempatan SFX (acuan Baikov: "SFX mendukung semua visual")
- **SFX menandai momen cerita dan gerak yang terlihat; kosakata dan kepadatan dari kiblat** (aturan 43, Irfan 13 Nov):
  - momen: pembuka, judul/jawaban hook, twist (riser → drop), puncak, penutup;
  - gerak kamera besar dan benda yang muncul/mendarat/diklik karena ucapan;
  - kata kinetik hanya di pergantian kata kunci (triad), **tidak per kata**; subtitle tidak berbunyi;
  - rentetan sejenis = satu cue panjang (rattle); cut di suku kata dan sisipan wajah boleh senyap.

  Cakupan event (`scripts/audio/visual_coverage.py`) hanya informasi, bukan target (gagal: builder-trap-r2 v1, cakupan 87 % lewat 220 klik per kata).
- **Peran + alasan wajib di setiap cue SFX dan musik** (Irfan 8 Nov): `{t, peran, alasan, file, terikat_ke_visual, offset, dB}`. `peran` = fungsinya (mis. `kata_kinetik`, `kartu_mendarat`, `transisi`, `musik_babak2`); `alasan` = satu kalimat kenapa bunyi itu ada di titik itu (mis. "kata 'worthy' mendarat, penekanan emosi babak 3"). Cue tanpa peran atau alasan = FAIL di `gate/sfx_density.py`. Tidak ada bunyi yang "sekadar ada".
- **Batasnya spam, bukan jumlah** (Irfan 8 Nov): whoosh/swoosh/whip maksimal 1 per detik dan puncaknya tidak melebihi puncak VO −6 dB; satu file yang sama tidak diulang dalam 1 detik; maksimal 2 bunyi per 100 ms (§14.9). `gate/sfx_density.py` menandai pelanggaran.
- **Peta SFX yang terbukti** (Irfan 9 Nov, Behindwork, 3 short Naval ±110–120 cue/60 dtk):
  - `t` cue dihitung supaya **puncak** bunyi jatuh di frame visual (t = frame − offset puncak file setelah trim);
  - whoosh **hanya** di gerak cepat yang terlihat (panel wipe, dash, sapuan, slide), puncak di kecepatan tertinggi; tidak pernah di cut;
  - satu pop per elemen ilustrasi yang mendarat; garis tergambar senyap;
  - satu hit rendah untuk end card;
  - tanda rapat yang berulang (mis. 50 tanda X) = satu rattle berirama, bukan 50 tick;
  - dua event < 0,1 dtk (3 f) berbunyi satu (peran prioritas membawa keduanya), supaya tidak flam;
  - mixer mengubah cue gerak yang mulai < 1 dtk setelah cue gerak sebelumnya jadi tick: rencanakan jarak whoosh ≥ 1 dtk.
- **Satu event satu bunyi.** Tidak ada layering beberapa file untuk satu event; pilih satu file yang karakternya sudah lengkap (Irfan 6 Nov).
- **Waktu @30 fps** (SFX tidak pernah mendahului objek, aturan inti 37):
  - pop: +1…+2 f setelah objek terlihat jelas (§14.9)
  - dentum/impact: di frame mendarat
  - hard cut / ganti frame: klik (`cut_click`), atau senyap bila tertutup panel/kanvas yang sedang masuk; **bukan whoosh** (Irfan 9 Nov, Behindwork)
  - push-through / zoom-through: satu riser kontinu yang berakhir di cut, lalu impact di pendaratan
  - slam: impact di frame mendarat; sebelumnya musik turun ke drone, bukan senyap
  - whoosh/riser memuncak di landing, cut, atau v_max kamera (§14.9)
- **Cluster**: elemen yang muncul bersamaan diberi satu rangkaian pop bernada naik (staggered), bukan senapan mesin.
  - Ketikan tetap terdengar sebagai keyboard, jangan ikut di-cluster jadi pop.
  - Seri blip untuk item daftar: bunyi sama, interval tetap.
- **UI micro-pop**: hanya klik/perubahan state UI yang dibicarakan ucapan (tombol yang ditekan, post terbit); hover dan perubahan kecil senyap.
- Transien kecil yang jatuh di konsonan VO digeser ±2 f. Level: §14.10.
- Kepadatan = SFX berlabel di kiblat (kartu §7), bukan onset total: angka onset referensi (4,7–7,7/dtk, PKS 2 Nov) memuat ketukan musik. Gerbang `scripts/gate/sfx_density.py --ref-density <kiblat>`: FAIL bila > 1,5× kiblat (default > 1,2/dtk), ada bunyi per kata, > 5 cue dalam 2 dtk, atau cue tanpa `dengar`. Acuan: kiblat 55 ±0,65/dtk; builder-trap-r2 v2 0,52/dtk (Irfan 13 Nov).
- Sinkron: hit bunyi vs onset visual ±1–2 f (±45 ms), dicek per cue dari render.

### 14.4 Titik balik: turun, bukan hilang
Penekanan di titik balik dibuat dengan **musik turun ke drone/room tone** (stop-down ≤ 0,5 dtk), lalu hantaman atau drop di kata pivot. Tidak ada hening total (digital silence), dan musik tidak pernah 0 di bawah klip narasumber (§14.7). Alasan: hening total terdengar seperti audio rusak dan memutus perhatian (aturan inti 32; diputuskan Irfan 6 Nov). Panjang turunnya mengikuti nada di `pacing-map.md`, bukan resep frame tetap.

### 14.5 Standar "Nyaman, jelas, tanpa ear-fatigue" (direvisi 1 Nov 2026)
Versi lama bagian ini mewajibkan bunyi thock/felt/wood dengan LPF 1,5–2,5 kHz. Bersama tabel Gemini §14.8, aturan itu menghasilkan palet gelap seperti ketukan kayu di Pengganti Kita Sendiri v3, yang ditolak Irfan pada 31 Okt pukul 23.34. **Acuan sekarang adalah palet yang terbukti lulus**, yaitu The Gap v17/v18 dan Jadisatu #2 (`projects/jadisatu-60s/remotion/tools/audio_build.py`):

- **Sumber**: hanya stok nyata (§14.0), yaitu Kenyset, SFX proyek Irfan, dan ElevenLabs dengan prompt "dry, clean". Tidak ada SFX yang disintesis di kode.
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
- **Dilarang**: ketukan kayu/woodblock, felt knock, koin, logam, kartun, langkah kaki kartun, salinan bunyi sistem Apple, potongan SFX yang "dipahat" dari video referensi orang lain.
- **QA telinga**: Gemini tidak andal untuk level dan timestamp, dan tabel aturannya tidak boleh menggantikan data proyek yang sudah lulus. Ukur dengan alat sendiri; telinga Irfan adalah hakim terakhir.
- Sumber dan lisensi tiap file dicatat di `CREDITS.md`.

---

## 14.6–14.10 Aturan audit audio 31 Okt 2026 (Modul 1–5)

Sumber: audit DSP Gemini atas `PenggantiKitaSendiri_v2`, diminta dan diadopsi Irfan sebagai masukannya sendiri. Angka diverifikasi ulang dengan `scripts/audio_qa.py`. Hasil ukur v2 dibandingkan referensi:

| Video | Sub | Low-mid | Penurunan mendadak |
|---|---|---|---|
| v2 | 5,8 % | 67,9 % | 100 |
| Ref Krea 2 | 55,4 % | 33,6 % | 3 |
| Ref Renaissance | 39,3 % | 35,2 % | 17 |

> Catatan 1 Nov 2026: Krea 2 dan Renaissance adalah referensi musik/motion **tanpa VO**, jadi tidak bisa dipakai sebagai target pita untuk video ber-narasi. Referensi ber-VO terukur: The Gap sub 14 % / low-mid 63 %, Emotion 18 % / 64 %. Lihat §14.10.

Implementasi rujukan ada di `experimental/dual-agent-sound/examples/pengganti-kita-sendiri/v13/`: `assemble12.py`, `mix13.py`, `sfx_rules.py`, `roomtone.py`.

Akar masalah di v2:
- **Low-mid 68 % bukan hanya dari klip berita.** Narator sendiri 72–78 % low-mid karena EQ +1,5 dB @160 Hz.
- **Musik tanpa lapisan sub.** Echoes di-LPF 1,2 kHz, ostinato berupa pluck.
- **Klip Jensen/Altman masuk mentah.** Dimuat tanpa EQ dan level-nya 5–7 dB di bawah narator.
- **Ujung potongan memakai fade 12–30 ms.** Ducking juga pumping saat release.
- **Musik dimatikan ke 0 di bawah Jensen** (aturan lama "hening total", sekarang dicabut).

### 14.6 Modul 1 — pre-processing klip narasumber
Berlaku untuk klip eksternal (berita, wawancara, konferensi, podcast) yang **terukur buruk** (gema, boxy, level jauh dari narator). Klip yang sudah bersih cukup disamakan levelnya dengan gain linear, tanpa EQ/denoise/kompresor, dan dibuktikan dengan `scripts/gate/voice_fidelity.py sumber.mp4 render.mp4` (udara > 9 kHz ≥ 70 % sumber, LRA turun ≤ 2 LU). Rantai untuk klip yang terukur buruk:

**Rekaman sendiri (talking head di kamar, Irfan 13 Nov).** Ukur dulu dengan `scripts/gate/pause_clean.py stem_suara.wav words.json`. Bila lantai jeda > −50 dBFS atau ada bunyi tajam di jeda (piring, klik, benturan): high-pass 70 Hz + `afftdn` ringan (nr 8, nf −50), lalu jeda antarkata ≥ 0,15 dtk diredam −36 dB dengan ramp 25 ms, rentang ucapan dilindungi [awal − 0,06; akhir + 0,12] dtk (resep: `projects/builder-trap-r2/audio/voice_clean.py`). Jangan mengisi jeda antarpotongan dengan room tone dari kamar yang sama. Gate yang dilarang di bawah ini berlaku untuk klip narasumber bergema, bukan untuk jeda rekaman sendiri.

```
ffmpeg -y -i klip_mentah.mp4 -vn -af "pan=mono|c0=0.5*c0+0.5*c1,highpass=f=120:poles=2,equalizer=f=320:t=q:w=1.8:g=-5.0,equalizer=f=3200:t=q:w=1.4:g=2.5,lowpass=f=9000:poles=2,afftdn=nf=-25,acompressor=threshold=-20dB:ratio=3.5:attack=5:release=80:makeup=4dB,loudnorm=I=-15.5:TP=-2.0:LRA=5.0" -ar 48000 -ac 2 klip_bersih.wav
```
- **mono**: side/mid = 0, menghapus gema fase ruangan;
- **HPF 120 + mud cut −5 dB @320 Hz**: anti-boxy;
- **+2,5 dB @3,2 kHz**: kejelasan;
- **afftdn + kompresor + loudnorm −15,5**: setara narator.
- **loudnorm dijalankan sebagai penyamaan level LINEAR** (gain terukur, atau `loudnorm` dua-pass `linear=true`), bukan mode dinamis.
  - Pada klip pendek, mode dinamis bekerja seperti AGC dan mengangkat ekor ruangan. Hasil uji Altman: low-mid 61 → 70 %.
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
- laser sci-fi;
- langkah kaki kartun.

**Direvisi 1 Nov 2026.** Kolom "Wajib" versi Gemini dicabut: wood/felt, thock LPF 1,5 kHz, lapisan sub thump di bawah whoosh, dan micro-tick + felt pulse. Penyebabnya:
- dua bunyi untuk satu event melanggar aturan "1 adegan 1 pesan 1 SFX";
- palet gelap bertentangan dengan referensi dan dengan palet The Gap.

Satu peran memakai **satu bunyi yang sama sepanjang video**, sama seperti aturan tipografi. Satu event hanya mendapat **satu bunyi**.

| Visual | Bunyi (stok Irfan) | Catatan |
|---|---|---|
| Kata kunci berganti (triad), bukan tiap kata | `Kinetictypography(gunakansecaraacak)` (SFXIrfan) | tidak per kata (Irfan 13 Nov); klik mouse hanya untuk kursor yang benar-benar mengklik |
| Kata slam/penekanan | `v17_thud_1` (dentum pendek) | satu bunyi, bukan pop + sub |
| Ketikan | `iphone-keyboard-typing`, satu rentang per kalimat yang diketik | keyboard digital, bukan thock mekanik |
| Kursor/tombol ditekan | `mouse-click-290204` | |
| Kartu/UI/agent muncul | `pop-up-notify-smooth-modern` | |
| Kartu/tile mendarat | `soft-subtle-ui-pop` | |
| Kamera patah / transisi dengan gerak cepat terlihat | whoosh gelombang (rotasi 3 sampel mirip), puncak di v_max | tanpa lapisan sub |
| Cut / ganti frame / potongan antar pembicara tanpa gerak | klik cut pelan; senyap bila tertutup panel yang masuk | bukan whoosh (Irfan 9 Nov, Behindwork) |
| Whip / cut on motion | `v17_whip_1/2` | |
| Zoom-through / build | `riser` (ElevenLabs, video #2), berakhir di cut | |
| Beat drop / pendaratan besar | `v17_impact_1`, ekor ≤ 0,9 dtk | tidak ada hantaman di frame 0 (The Gap D-038) |
| Foto montase berganti / gambar berganti | `Pergantianfoto` (SFXIrfan, satu klik) atau shutter; di montase cepat (< 0,7 dtk/shot) berselang, bukan 1:1 | bukan whoosh/swipe (Irfan 2 Nov 12.36, 13 Nov) |
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
- **Stagger banyak item** (grid, barisan): satu cue rentetan/rattle untuk seluruh barisan, bukan satu bunyi per item (Irfan 13 Nov). Item yang muncul bersamaan dalam ≤ 2 frame dihitung sebagai satu event. Maksimal 2 bunyi per 100 ms, dan dua bunyi berperan sama tidak boleh jatuh dalam 100 ms (The Gap `sync_cues.py`). Kata tidak berbunyi per kata; subtitle tidak berbunyi (aturan 43).

### 14.10 Modul 5 — gerbang QA audio otomatis (wajib sebelum render/kirim final)
```
python3 claude/motion-graphic/scripts/audio_qa.py mix_master.wav --module5 <stem_dir> timeline.json placed.json
python3 claude/motion-graphic/scripts/audio_qa.py mix.mp4 ref1.mp4 ref2.mp4   # bandingkan dengan referensi segenre
```
Lulus bila semua terpenuhi:

| Cek | Ambang |
|---|---|
| Integrated | −14,0…−14,5 LUFS |
| True peak | ≤ −1 dBTP |
| Pita spektral | **dibandingkan dengan referensi segenre (video ber-VO), bukan angka tetap.** The Gap: sub 14 % / low-mid 63 %. Emotion: sub 18 % / low-mid 64 %. Angka lama (sub 25–55 %, low-mid < 42 %) berasal dari referensi musik tanpa VO (Krea 2, Renaissance) dan mendorong penambahan sub-pad sinus; dicabut 1 Nov 2026. |
| Abrupt cutoff (> 18 dB/50 ms) di ujung klip narasumber | tidak ada celah mati: di potongan antar pembicara selalu ada jembatan (whoosh + musik/room tone), jendela 100 ms < −45 dBFS = 0. Penurunan di akhir kata VO kering itu normal (The Gap 46). |
| Kepadatan & level SFX (demucs no_vocals, `refaudit/sfx_profile.py`) | event menonjol ±1,8–2,1/dtk; puncak SFX median ±−9…−10 dB dari puncak VO; bed −13…−15 dB di bawah VO (The Gap: 2,05/dtk, −10 dB, −14,8 dB) |
| Gema VO | energi ekor 40–150 ms setelah kata ≤ −25 dB dari kata (`scripts/audio/vo_echo.py`) |
| VO per blok | −14 LUFS ±1 |
| Klip narasumber per blok | −15,0…−15,5 LUFS (±0,5) |
| Musik di bawah VO | −22…−25 LUFS |
| Gain SFX setelah normalisasi puncak | −4…−10 dB (lantai −10; −33 dB tidak terdengar; Irfan 9 Nov, Behindwork) |
| Sebaran RMS bed musik per 3 dtk | ≤ 4 dB, tanpa lubang (Behindwork 1,1–3,2 dB) |
| Median puncak SFX UI per kelas | −16…−20 dBFS |
| Median puncak ketikan | −22…−25 dBFS |
| Hit terbesar video (puncak) | ≈ setara puncak VO, maksimal 1–2 per video |

**Resep mix yang terbukti** (Irfan 9 Nov, Behindwork; alat: `behindwork/tools/mix.py`):
- musik masuk di −15,5…−16,5 dB (track ber-beat/sub bass 1 dB lebih rendah); `dynaudnorm` + auto-gain RMS tahap 2 (1 dtk, maks ±8 dB; jangan menaikkan bed di jeda bicara, gagal: builder-trap-r2 v1) meratakan breakdown → sebaran bed 1,1–3,2 dB;
- kantong EQ untuk suara (−4 dB 2,8 kHz, −2 dB 450 Hz), gerak musik saat kata ≤ 1,5 dB;
- satu kali limiter (lebih banyak = dinamika pembicara gepeng, gagal LRA), target −14 LUFS;
- setelah mix, langkah true peak oversampled (hanya menangkap puncak, gain tetap): `ffmpeg -i raw.wav -af "aresample=192000,alimiter=limit=0.85:attack=1:release=50:level=false,aresample=48000" -c:a pcm_s16le mix.wav`; puncak sampel dari skrip bukan true peak;
- saat mux ke AAC turunkan −0,4 dB, karena AAC menaikkan puncak ±0,5 dB (N2 sebelum diperbaiki: −0,9 dBTP di MP4);
- hasil 3 klip: −14,2 LUFS, −1,4 dBTP WAV, `voice_fidelity` PASS (ΔLRA −0,1…+0,2).

Catatan pengukuran:
- Stem dialog mono harus diukur sebagai stereo (+3 dB), karena diputar di kedua kanal.
- Angka gerbang dilaporkan apa adanya ke Irfan.

**Aturan lama yang digantikan per 31 Okt 2026**:
- gerbang LRA ≥ 7 LU (blueprint 31 Okt pagi);
- "musik mati / hening total saat klip Jensen";
- beat drop ke hening 1 dtk sebelum klip;
- dinamika narator per babak (−2,5 / −4 dB).
