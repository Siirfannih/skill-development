# LISTEN PKS v20: hasil earshot dan keputusan yang berubah karena hasil dengar

Semua angka dari mix v20 sendiri. Alat: earshot 0.4 (`describe` per varian, `find`, `timeline --video --cues`,
`sheet`), `tools/check_mix.py` (ukuran pendukung: rasio VO:musik penuh dan versi speaker HP 300 Hz-12 kHz, margin
puncak SFX terhadap VO+musik), `tools/video_motion.py` (luminans dan gerak per frame dari video bisu).
`critique --profile` dilewati: profil referensi ada di Mac dan referensinya film launch bermusik, bukan esai
reflektif ber-VO; skor terhadapnya tidak menjawab pertanyaan proyek ini.

## 1. Dengar per varian (sebelum dipakai)

35 file dipotong per hening (`tools/split_variants.py`) menjadi 58 varian, semuanya di-`describe`
(`/home/claude/pks/v20/var/describe.log`). Yang menentukan pilihan:

| file | yang terdengar | keputusan |
|---|---|---|
| Kinetictypography (3 varian) | v00 klik bernada/kalimba 3.8 kHz, v01 'ice cubes' 11.5 kHz, v02 tick 11.9 kHz | ketiganya diacak untuk kata |
| Katapertama | klik bernada singkat 6.6 kHz | kata pertama + kata besar (EMPH) |
| Pergantianfoto (9 varian) | 9 klik identik karakter (key release / shutter, 10-11 kHz) | dirotasi untuk montase foto |
| Cut = Pergantianfoto:gambarpertama | file identik (md5 sama), 'camera shutter click' | cut biasa + foto pertama (makna sama: gambar baru) |
| Kinetictypography = Variasitransisiataucut | file identik | Variasitransisi tidak dipakai untuk cut agar kata dan cut tidak sama bunyinya |
| Cutcontrastransision | klik tajam 7.8 kHz | hanya cut gelap<->terang |
| Wooshcameramovementtransisi | 'fast whoosh' z +4.3, Whoosh 0.65 | gerak kamera |
| Woosh (2 varian) | 'fast whoosh' 0.8-1.5 kHz | wipe layar penuh saja |
| Move (4 varian) | v03 'box lid / punchy impact / fast whoosh' (utama), v02 'quick swipe', v01 ketuk lembut -37 dBFS, v00 rustle | v03+v02 objek bergerak; v01 langkah figur |
| Keyboardtyping (8 varian) | 5 rentang ketik + 3 tuts tunggal, 'mechanical keyboard' z +4.2 | rentang disambung; tuts tunggal untuk kata pendek |
| Popup user interface : AI | 'notification ding / sparkle chime' | AI muncul |
| ResponAI (3 varian) | wood block / kalimba / marimba hangat ~500 Hz | hasil AI muncul |
| ES Scifi Short Beeps | 'digital glitch / computer beeps' 0.77 dtk | teks AI mengalir (rentang 0.83 dtk) |
| Scanning dan gerak kurva | 'digital glitch' naik, 0.6 dtk | garis/kurva digambar, scan |
| Lasertransision | nada F#6 1.5 kHz, 'triangle hit' | lampu/layar menyala; -5 semiton untuk padam |
| basmenyebar | 'deep cinematic boom / sub drop' 66 Hz, 99 % energi < 150 Hz | hantaman; +3 semiton + saturasi agar tidak terlalu deep dan ada jejak di HP |
| ES Riser Clean | 'reverse cymbal swell' z +4.4, puncak di 3.08 dtk | zoom-through, puncak di frame tujuan |
| scaningfast | 'fast whoosh' 12 kHz, AudioSet 'sigh/gasp' | tidak dipakai (tidak ada scan cepat di gambar, terlalu mendesis) |
| ES Bass Dive | sub 50 Hz murni | tidak dipakai (terlalu deep; hilang total di HP) |

## 2. Backsound (didengar per segmen)

| file | yang terdengar | keputusan |
|---|---|---|
| Particle Emission | 'ambient synth pad, dreamy / dark and tense', C minor; makin penuh di ~40 dan ~80 dtk; 120-140 'sad, melancholic' | bed utama kedua video |
| Reggae | 0-9.75 'plucked synth arpeggio, sad/melancholic', E mayor; 9.75 bel/piano masuk (timeline: seksi baru 0:09.75, stab 0:12.71) | pakai 0.30-9.62 saja; bookend Video 2 |
| documenter | 'cloth rustling / paper rustling / match struck', drone 400 Hz + 4 burst, bukan musik | dicoba tipis di cold open Video 2, lalu dibuang (lihat ronde 2) |
| Office ambience | 0-20: 'printer, cash register' (+ AudioSet Speech 0.34); 60-80: 'slow typing' | segmen 20-38 di adegan kerja 32-50, 24 LU di bawah VO |

Reggae (E mayor) dan Particle (C minor) bentrok nada -> tidak ditumpuk, hanya disambung di cut.

## 3. Ronde mix

**Ronde 1 (Video 1).** timeline master: sinkron cue 76 % onset <=40 ms (kebetulan 52 %), 94 % <=100 ms, median 13 ms.
Tag yang terdengar sesuai maksud: 'chat message pop', 'notification ding', 'whip pan whoosh', 'sub bass drop',
'mechanical keyboard', 'reverse cymbal swell'. Masalah dan perubahan:
- Boom akhir 2:10.09 hanya +2.3 dB di atas bed (tertutup swell musik), dan seluruh IMPACT 99 % < 150 Hz:
  margin di HP -27 dB -> boom +3 semiton + saturasi, swell outro diturunkan dari -6 ke -9 LU.
- Kata besar (Pengganti, Lebih Cepat, Nggak Peduli, Billion, Sama, Semalam, Tertinggal, Kreatif) semula boom saja:
  terlalu deep dan tidak menandai frame (attack lembut) -> EMPH = Katapertama di frame + lapisan bas tipis.
- 0:35.83 (kalender dimampatkan, Bass Dive 50 Hz) tidak terdengar sama sekali (margin HP -42 dB) -> Move.
- 0:14.78 teks 'Pengganti' keluar: tidak ada onset -> Move dinaikkan, puncak digeser ke gerak terbesar.
- Whoosh di penanda dipindah ke frame beda-gambar terbesar (±150 ms); 20 peristiwa bergeser, mis. drag kartu +118..+150 ms.
- Gain dinaikkan 1-5 dB untuk CAM, CURVE, CUT, LIGHT, MOVE, WIPE, TYPE (margin median di HP -10..-19 dB).

**Ronde 2 (kedua video).**
- Video 2 stem musik cold open: earshot mendengar 'a bird flapping its wings / a small animal running through grass'
  = burst documenter. Tidak ada objek seperti itu di gambar -> documenter dibuang.
- Outro Particle 2:06-2:12 'acoustic guitar, cheerful ukulele, playful' (z ~2.4-2.9): untuk Video 2 tema Reggae
  kembali sebagai bookend di 'Peran Kamu'; Video 1 tetap Particle (segmen file 120-140 terbaca 'sad, melancholic').
- Uji tingkat SFX 0 / -3 / -6 dB pada 20-55 dan 75-103 dtk: bacaan mood campuran ('techno?, confident') tidak
  berubah (z <= 1.7, tak tervalidasi) -> itu bacaan VO+pulse pad, bukan SFX; level SFX dipertahankan.
- Video 1 'stop-down 0:09.95 0.3 s' (jeda VO sebelum 'Sadar') -> bed naik ke -10 LU di 9.9-10.3 dtk.
- Kata kinetik di atas klip narasumber (Gates, Jensen, Altman) -3 dB: master cold open terbaca 'scroll wheel tick /
  mouse click' paling menonjol.

**Ronde 3.** Cue tanpa hit: 0:33.03 (centang), 1:37.40 / 1:38.17 / 1:38.30 (kartu mendarat) tertelan suku kata VO
(VO -13 dB vs SFX -24 dB di 150 ms itu); 0:49.68 dan 1:04.09 adalah whoosh tanpa onset (VO diam, whoosh 14 dB di atas
musik: terdengar, hanya tidak 'hit'). -> SFX UI kecil (centang, pop, kalender, klik, hasil AI, notif) yang jatuh di
suku kata keras diangkat sampai +4 dB (41 peristiwa). Kata tidak diangkat: kata memang muncul bersama ucapannya.

## 4. Hasil akhir (ronde 4)

Sebelum ronde akhir: jeda VO (9.9, 54.9, 70.1, 125.3 dtk) terukur turun ke -25..-31 LUFS momentary; di Video 2 tema
Reggae bookend mulai dari awal file yang masih fade-in sendiri -> bookend diambil dari bar ke-2 dan swell bed di jeda
dinaikkan ke -5..-8 LU relatif VO. Jeda sekarang -21.5..-24 LUFS (musik jelas mengisi; jeda 0.6 dtk di 74.6 tetap
-28.6 karena terlalu pendek untuk kurva bed, tertutup cut kontras 75.195).

| | Video 1 | Video 2 |
|---|---|---|
| loudness / true peak / LRA | -14.0 LUFS / -1.2 dBTP / 2.0 LU | -14.0 LUFS / -1.2 dBTP / 2.0 LU |
| stop-down / lubang hening | tidak ada (hanya fade akhir 0.8 dtk) | tidak ada (hanya fade akhir 0.8 dtk) |
| sinkron 309 cue | 75 % onset <= 40 ms (kebetulan 52 %), 94 % <= 100 ms, median 15 ms | 74 % / 94 % / median 16 ms |
| sinkron 142 cut gambar | 66 % dalam 1 frame (kebetulan 45 %), 93 % <= 100 ms, median 14 ms | 66 % / 93 % / median 13 ms |
| limiter | GR maks 3.5 dB, > 1 dB selama 4.1 dtk | GR maks 3.5 dB, 3.9 dtk |

Label yang terdengar (tag earshot, hint): VO 'voice-over narration' di semua seksi; 'chat message pop', 'bubble pop',
'notification ding', 'glockenspiel note' (Lasertransision / Katapertama), 'whip pan whoosh', 'fast air whoosh',
'sub bass drop' / 'punchy impact hit' (boom, EMPH), 'reverse cymbal swell / uplifter' (riser), 'mechanical keyboard'
(ketikan). Video 2 penutup terbaca 'plucked synth arpeggio' (tema Reggae kembali), sinkron 16 cue penutup 81 % <= 40 ms,
0 tanpa hit.

Masih tersisa (diterima, bukan cacat):
- 0:49.68 dan 1:04.09: whoosh kamera tanpa onset; VO diam, whoosh 14 dB di atas musik -> terdengar sebagai sapuan.
- 1:37.40 / 1:38.17 / 1:38.30: kartu app mendarat beruntun 0.13-0.27 dtk di bawah VO; pop ada di stem (−22 dBFS),
  detektor onset menggabungkannya dengan kartu sebelumnya. Menaikkan lagi = rentetan pop menyaingi VO.
- 1:42.93: lampu padam pertama dari rentetan 6 (67 ms) dibuat pelan dengan sengaja (padam = turun).
- Bacaan genre/mood master 'techno?, confident' (z <= 2.2, tak tervalidasi) tidak berubah oleh level SFX 0/-3/-6 dB;
  stem musik sendiri terbaca 'ambient synth pad, dreamy / dark and tense'.

## 5. Keterdengaran di HP (ukuran pendukung)

VO:musik di pita speaker HP (300 Hz-12 kHz) >= 12.4 dB di setiap bagian, jadi rasio sama di volume 20 / 50 / 100 %
(volume HP menggeser semuanya bersama). Bed Particle babak akhir berat di bawah 200 Hz sehingga di HP terdengar lebih
tipis (VO:musik ~17 dB) dibanding headphone (~10 dB): emosi tetap terbawa pad tengahnya, VO tidak pernah tertutup.
Boom/bas: di HP yang tersisa adalah harmonik dari saturasi; bobot penuhnya untuk headphone/speaker.
