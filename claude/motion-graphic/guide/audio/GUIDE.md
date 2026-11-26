# Audio: musik ikut suasana video

**Tujuan.** Musik terasa satu tubuh dengan video. Video cepat → musik cepat yang menyaingi tempo (EDM, beat rapat). Video tenang → musik tenang (lofi, ambient). Bukan selera siapa pun.

## Bagus itu seperti apa
- 01–05: cut 12–65/menit, bicara cepat → musik ±104–136 bpm, beat padat.
- 06: cut jarang, gerak lembut → musik tetap bergerak tapi tidak mendorong.

## Cara
1. **Baca tempo video**: `python3 scripts/audio/pace_read.py video.mp4 [--words words.json]` → cut/menit, event visual, laju bicara, usulan kategori + rentang bpm. Motion tanpa VO: pakai event visual, bukan cut.
2. **Cek isi**: masalah/ancaman → `tegang`; harapan/CTA → `hangat`; bisa per babak.
3. **Pilih musik terukur**: `python3 scripts/audio/music_fit.py --category <k> --voice sumber.mp4 kandidat/*` → peringkat, benturan dengan suara, saran EQ.
4. Suara sumber klip yang terukur bersih tidak diproses (`audio.md` §14.6); rekaman sendiri diukur dulu dan jedanya dibersihkan (`gate/pause_clean.py`). Musik yang menyesuaikan.
5. **Kandidat musik ≥ 20 dari ≥ 2 sumber** (folder Irfan dan `Asset/musik/MUSIK.md`; `scripts/audio/musik_cari.py --kategori <k>` untuk Mixkit berlisensi; ElevenLabs Music dengan biaya disebut dulu; Epidemic hanya bila tersedia, `../sfx/FAMILI.md` §2; YouTube via `yt-dlp` hanya untuk mengukur, bukan final tanpa lisensi); bukan hanya "yang pernah dipakai" (gerbang skrip FAIL di < 8). Satu track tidak dipakai untuk semua klip dalam satu batch; tiap klip genre berbeda.
6. **Ukur potongan yang dipakai, bukan track utuh**: offset mulai mengubah onset (2,2 → 3,6). `earshot describe` potongan itu bila earshot ada (tanpa itu: `music_fit.py` + cek bebas vokal dari judul/sumber, tandai "belum didengar alat"): instrumental, tidak sedih. Pilih bagian tanpa breakdown di dalam durasi klip. Mix: `audio.md` §14.10 resep Behindwork.

## Cara memutuskan (alasan dari koreksi Irfan; rujukan menimbang, bukan aturan)
- **[AUD-02] Titik potong suara diukur dari gelombang dan transkrip ulang** · kelas P · cek: sebelum suara dikunci
  - Pemicu: memangkas jeda, isian, atau ujung bite dari rekaman ucapan.
  - Anti-pola: memotong di timestamp kata ASR atau di lembah energi tanpa memeriksa kata yang tersisa, sehingga suku terakhir (penutupan /t/ /k/, jeda antarsuku ucapan cepat) terpancung.
  - Invarian: taruh titik potong di bagian yang 20 ms sisi terpakainya sudah sunyi, lalu transkrip ulang jendela [ujung − 1,6 dtk; ujung] bersama versi yang diperpanjang 0,4 dtk; bila katanya berbeda, geser ujung ke sunyi berikutnya.
  - Karena: lolos cek gelombang belum berarti katanya utuh, dan penonton mendengar kata yang terpancung sebagai potongan kasar.
  - Boleh: kepadatan dicapai dengan merapatkan jeda antarpembicara dan membuang isian dari celah ke celah, tidak dengan memendekkan vokal (takaran jeda ikut kiblat).
  - Gerbang: `scripts/gate/cut_check.py` PASS dan transkrip ulang tiap ujung sama dengan versi yang diperpanjang.
- **[AUD-03] Jeda ucapan tidak meninggalkan lubang senyap** · kelas P · cek: sesudah mix, per 100 ms
  - Pemicu: ucapan berhenti panjang (montase, b-roll tanpa suara) di atas musik yang renggang.
  - Anti-pola: suara momen masuk dengan fade panjang sehingga jendela antara akhir ucapan dan bunyi berikutnya nyaris senyap.
  - Invarian: isi jeda dengan suara momen itu sendiri yang mulai sedikit sebelum ucapan habis dengan fade ≤ 0,2 dtk, ditambah perata bed musik, sampai tidak ada jendela 100 ms di bawah −45 dBFS di mix.
  - Karena: lubang senyap di tengah video terdengar seperti audio putus, bukan jeda yang disengaja.
  - Boleh: hening dramatis yang dirancang dengan rentang tertulis; level musik terhadap suara diatur AUD-01.
  - Gerbang: tabel RMS mix per 100 ms; jendela < −45 dBFS di luar rentang hening tertulis = GAGAL.
- **[AUD-04] Denoise hanya untuk sumber yang memang ber-noise** · kelas P · cek: sebelum gain dan sebelum suara dikunci
  - Pemicu: suara akan diredam noise, dinaikkan gainnya, atau di-encode ulang.
  - Anti-pola: menjalankan denoise FFT dan encode lossy berulang pada sumber yang sudah bersih, atau menaikkan gain sebelum denoise pada rekaman terkompresi sehingga desis 2–16 kHz ikut naik.
  - Invarian: ukur noise floor sumber dulu; ≤ −50 dB dipotong PCM langsung tanpa denoise dan di-encode lossy sekali, > −50 dB diredam dulu lalu gain naik bersih tanpa limiter (Lantai 23).
  - Karena: denoise memotong 8–16 kHz 9–12 dB dan AAC berulang menambah kehilangannya, sehingga suara yang jernih terdengar mendem.
  - Boleh: desis codec yang menyatu dengan suara (tidak terpisah sebagai noise latar) diredam dengan rak HF statis tipis, bukan denoise.
  - Gerbang: `scripts/gate/voice_fidelity.py` membandingkan porsi > 9 kHz hasil dengan sumber, dan `gate/voice_level.py` PASS.
- **[AUD-05] Loudness suara diratakan per frasa, hanya naik** · kelas P · cek: sesudah potong, sebelum mix
  - Pemicu: sebagian frasa terdengar lebih pelan dari sisanya, terutama di detik awal.
  - Anti-pola: menaikkan seluruh suara atau memakai kompresor/limiter, sehingga frasa pelan tetap kalah dan hentakan memipih.
  - Invarian: ukur loudness per frasa, angkat frasa di bawah median dengan gain statis berampa di dalam jeda (hanya naik; ambang selisih *usulan* 2 dB), lalu naikkan seluruh suara bersih sampai puncak −1 dBFS; bila suara + ekor hit melewati −1 dBFS, bus musik+SFX yang turun di titik itu dengan rampa 30 ms.
  - Karena: frasa yang lebih pelan terdengar kurang jelas di HP, dan menekan suara mengubah karakter ucapan.
  - Boleh: frasa yang sengaja berbisik, dengan alasan tertulis.
  - Gerbang: tabel LUFS per frasa sesudah gain; frasa > 2 dB di bawah median tanpa alasan = GAGAL, dan `gate/voice_level.py` PASS.

- **[AUD-06] Rakitan klip ditranskrip ulang per klip** · kelas P · cek: sesudah rakitan, sebelum dikirim
  - Pemicu: klip dipilih dari rekaman mentah memakai timestamp ASR, terutama bila ada take ulang atau dua klip diambil dari ucapan yang bersambung tanpa sunyi.
  - Anti-pola: memercayai tabel timeline, padahal ASR menelan take ulang ke satu kata panjang (kalimat terdengar dua kali) dan celah 0,1 dtk di ucapan cepat membuang satu kata pendek.
  - Invarian: pilih satu take utuh per kalimat, tandai kata berdurasi tak wajar di transkrip sumber, potong dua klip bersambung di lembah energi yang sama tanpa celah, lalu transkrip ulang tiap klip hasil rakitan.
  - Karena: kata ganda atau hilang tidak terlihat di tabel tetapi langsung terdengar oleh penonton.
  - Boleh: celah yang sengaja membuang isian, bila transkrip ulang membuktikan kata isinya utuh.
  - Gerbang: `scripts/selects/rakitan_cek.py sumber` (frasa berulang, kata panjang; jendelanya ditranskrip ulang tanpa VAD) dan `rakitan_cek.py rakitan` tanpa selisih kata.
- **[AUD-01] Musik punya lantai relatif suara setelah semua tahap gain** · kelas P · cek: sesudah mix, per detik
  - Pemicu: musik melewati lebih dari satu tahap penurunan (ducking, dip per momen, jeda punchline, EQ, perata level).
  - Anti-pola: menyetel tiap tahap sendiri-sendiri lalu menilai dari loudness terintegrasi; penurunan bertumpuk membuat musik hilang di beberapa detik.
  - Invarian: setelah semua tahap, ukur keras-K musik dan suara per jendela 0,5–1 dtk; saat bicara musik ≥ suara − 12…14 dB, saat jeda ≥ median suara − 10 dB, kata yang harus paling bersih ≥ suara − 16 dB; angkat yang kurang dengan kurva halus berbatas.
  - Karena: tiap tahap masuk akal sendiri, tetapi hasil kalinya bisa 20–35 dB di bawah suara dan penonton mendengarnya sebagai musik yang hilang.
  - Boleh: senyap musik yang sengaja dirancang (drop, hening dramatis) dengan rentang tertulis.
  - Gerbang: tabel per detik musik vs suara; selisih > 18 dB saat bicara di luar rentang senyap tertulis = GAGAL.

## Cek cepat
- Tempo musik searah dengan cut/bicara? (cepat-cepat, tenang-tenang)
- Musik turun saat kalimat penting, tidak menutupi kata? (`music_fit` snr ≥ 12 dB)
- Ada lubang hening mati atau build/drop yang tidak diminta suasana? (sebaran RMS bed per 3 dtk ≤ 4 dB)
- Backsound terbaca melankolis/sedih padahal brief tidak? Ganti.

## Bebas diputuskan
Genre, instrumen, track mana dari kandidat yang lulus, titik drop, ganti musik per babak.

## Detail lanjut
`../../references/audio.md` §14.0A, §14.10
