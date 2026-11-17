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
5. **Kandidat musik ≥ 20 dari ≥ 2 sumber** (lokal + YouTube via `yt-dlp`, Epidemic, ElevenLabs Music, folder Irfan); bukan hanya "yang pernah dipakai" (gerbang skrip FAIL di < 8). Satu track tidak dipakai untuk semua klip dalam satu batch; tiap klip genre berbeda.
6. **Ukur potongan yang dipakai, bukan track utuh**: offset mulai mengubah onset (2,2 → 3,6). `earshot describe` potongan itu: instrumental, tidak sedih. Pilih bagian tanpa breakdown di dalam durasi klip. Mix: `audio.md` §14.10 resep Behindwork.

## Cara memutuskan (alasan dari koreksi Irfan; rujukan menimbang, bukan aturan)
- **Potong suara hanya di celah, bukan di gelombang.** Bila memangkas jeda/isian testimoni, titik potong harus berada di bagian tanpa gelombang (20 ms sisi yang dipakai sudah sunyi); kata yang gelombangnya masih naik/stabil dibiarkan habis dulu. Batas kata versi Whisper jatuh di penutupan /t/ /k/ ("dinikma|ti") dan memancung kata, jadi ukur gelombangnya, jangan percaya timestamp.
- **Padat ≠ dipotong rapat.** Kepadatan seperti ref dokumenter dicapai dengan merapatkan jeda ANTAR pembicara (0,3 dtk) dan membuang isian "eee/eh" dari celah ke celah, bukan memendekkan vokal atau memotong napas di tengah kata.
- **Ujung bite di lembah energi belum tentu ujung kata.** Bila titik potong dipilih dari lembah gelombang (−30 dB), transkrip ulang jendela [ujung−1,6, ujung] dan versi diperpanjang 0,4 dtk; bila katanya berbeda ("10 persen" vs "10 per 10 deh", "ngatur gitu" vs "ngatur kita"), lembah itu penutupan /t/ atau jeda antarsuku ucapan cepat, jadi geser ujung ke sunyi berikutnya. Alasan: lolos cek gelombang 20 ms tetapi suku terakhir hilang.
- **Momen tanpa suara pembicara harus tetap berbunyi.** Bila ada jeda VO panjang (montase pitching 4,5 dtk) di atas lagu yang renggang, isi dengan suara momen itu sendiri yang masuk cepat (fade 0,2 dtk, mulai sedikit sebelum VO habis) ditambah perata bed lagu, supaya tidak ada jendela 100 ms di bawah −45 dBFS; fade 0,5 dtk meninggalkan lubang −48 dBFS.
- **Suara asli tidak pernah diturunkan atau ditekan; bila terlalu pelan, redam noise dulu lalu naikkan dengan gain bersih.** Me-limit suara untuk mengejar −14 LUFS memipihkan hentakan ("mendem, ditahan"; crest 18,8 → 14,6 dB), dan loudness global ikut menurunkan suara (±−17 dB). Membiarkan gain 0 dB pada rekaman pelan (−23,9 LUFS) membuat video kalah keras di feed (v3 −22,8 LUFS). Jadi: peredam noise (rekaman terkompresi YouTube/opus: denoise sebelum gain supaya desis 2–16 kHz tidak ikut naik), lalu gain naik bersih ke ±−16 LUFS tanpa limiter, dan musik/SFX diatur relatif ke suara itu; `gate/voice_level.py` PASS.
- **Bila detik awal terasa kurang terdengar, ukur loudness per frasa dulu.** Frasa sumber yang lebih pelan dari median (jensen: "have very low resilience," −2,4 dB) diangkat dengan gain statis berampa di dalam jeda (hanya naik), lalu seluruh suara naik bersih sampai batas puncak −1 dBFS; bila suara + ekor hit melewati −1 dBFS, bus musik+SFX yang mengalah di titik itu (rampa 30 ms), bukan suaranya. Desis codec yang ada DI DALAM suara (demucs: no_vocals −61 LUFS) tidak bisa diredam sebagai noise latar; rak HF statis −2 dB @7,5 kHz cukup.

## Cek cepat
- Tempo musik searah dengan cut/bicara? (cepat-cepat, tenang-tenang)
- Musik turun saat kalimat penting, tidak menutupi kata? (`music_fit` snr ≥ 12 dB)
- Ada lubang hening mati atau build/drop yang tidak diminta suasana? (sebaran RMS bed per 3 dtk ≤ 4 dB)
- Backsound terbaca melankolis/sedih padahal brief tidak? Ganti.

## Bebas diputuskan
Genre, instrumen, track mana dari kandidat yang lulus, titik drop, ganti musik per babak.

## Detail lanjut
`../../references/audio.md` §14.0A, §14.10
