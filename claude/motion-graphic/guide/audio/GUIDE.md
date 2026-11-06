# Audio: musik ikut suasana video

**Tujuan.** Musik terasa satu tubuh dengan video. Video cepat → musik cepat yang menyaingi tempo (EDM, beat rapat). Video tenang → musik tenang (lofi, ambient). Bukan selera siapa pun (Irfan 6 Nov).

## Bagus itu seperti apa
- 01–05: cut 12–65/menit, bicara cepat → musik ±104–136 bpm, beat padat.
- 06: cut jarang, gerak lembut → musik tetap bergerak tapi tidak mendorong.
- Klip DOAC 6 Nov (7 cut/menit, penjelasan): seharusnya lofi tenang; musik tegang merusak.

## Cara
1. **Baca tempo video**: `python3 scripts/audio/pace_read.py video.mp4 [--words words.json]` → cut/menit, event visual, laju bicara, usulan kategori + rentang bpm. Motion tanpa VO: pakai event visual, bukan cut.
2. **Cek isi**: masalah/ancaman → `tegang`; harapan/CTA → `hangat`; bisa per babak.
3. **Pilih musik terukur**: `python3 scripts/audio/music_fit.py --category <k> --voice sumber.mp4 kandidat/*` → peringkat, benturan dengan suara, saran EQ.
4. Suara pembicara asli tidak diproses (format B, aturan 43). Musik yang menyesuaikan.

## Cek cepat
- Tempo musik searah dengan cut/bicara? (cepat-cepat, tenang-tenang)
- Musik turun saat kalimat penting, tidak menutupi kata? (`music_fit` snr ≥ 12 dB)
- Ada lubang hening mati atau build/drop yang tidak diminta suasana?

## Bebas diputuskan
Genre, instrumen, track mana dari kandidat yang lulus, titik drop, ganti musik per babak.

## Detail lanjut
`../../references/audio.md` §14.0A, §14.B, §14.10 · `formats.md`
