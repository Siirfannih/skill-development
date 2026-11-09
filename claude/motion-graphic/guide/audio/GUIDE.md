# Audio: musik ikut suasana video

**Tujuan.** Musik terasa satu tubuh dengan video. Video cepat → musik cepat yang menyaingi tempo (EDM, beat rapat). Video tenang → musik tenang (lofi, ambient). Bukan selera siapa pun (Irfan 6 Nov).

## Bagus itu seperti apa
- 01–05: cut 12–65/menit, bicara cepat → musik ±104–136 bpm, beat padat.
- 06: cut jarang, gerak lembut → musik tetap bergerak tapi tidak mendorong.

## Cara
1. **Baca tempo video**: `python3 scripts/audio/pace_read.py video.mp4 [--words words.json]` → cut/menit, event visual, laju bicara, usulan kategori + rentang bpm. Motion tanpa VO: pakai event visual, bukan cut.
2. **Cek isi**: masalah/ancaman → `tegang`; harapan/CTA → `hangat`; bisa per babak.
3. **Pilih musik terukur**: `python3 scripts/audio/music_fit.py --category <k> --voice sumber.mp4 kandidat/*` → peringkat, benturan dengan suara, saran EQ.
4. Suara sumber klip yang terukur bersih tidak diproses (`audio.md` §14.6). Musik yang menyesuaikan.
5. **Kandidat musik ≥ 20 dari ≥ 2 sumber** (lokal + YouTube via `yt-dlp`, Epidemic, ElevenLabs Music, folder Irfan); bukan hanya "yang pernah dipakai" (gerbang skrip FAIL di < 8). Satu track tidak dipakai untuk semua klip dalam satu batch; tiap klip genre berbeda (Irfan 8 Nov, gagal: V5 tiga klip memakai piano yang sama; Irfan 9 Nov, Behindwork).
6. **Ukur potongan yang dipakai, bukan track utuh**: offset mulai mengubah onset (2,2 → 3,6). `earshot describe` potongan itu: instrumental, tidak sedih. Pilih bagian tanpa breakdown di dalam durasi klip. Mix: `audio.md` §14.10 resep Behindwork (Irfan 9 Nov).

## Cek cepat
- Tempo musik searah dengan cut/bicara? (cepat-cepat, tenang-tenang)
- Musik turun saat kalimat penting, tidak menutupi kata? (`music_fit` snr ≥ 12 dB)
- Ada lubang hening mati atau build/drop yang tidak diminta suasana? (sebaran RMS bed per 3 dtk ≤ 4 dB)
- Backsound terbaca melankolis/sedih padahal brief tidak? Ganti (gagal: Behindwork sesi awal).

## Bebas diputuskan
Genre, instrumen, track mana dari kandidat yang lulus, titik drop, ganti musik per babak.

## Detail lanjut
`../../references/audio.md` §14.0A, §14.10
