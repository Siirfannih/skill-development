# STATUS: Pengganti Kita Sendiri (@siirfannih)

_Update terakhir: 1 Nov 2026 19.50 WITA._

## Posisi sekarang
- **Versi terakhir: v6** (`PKS_v6.mp4`, 132,8 dtk) = visual v2 + **audio v16**. Seluruh SFX dan backsound v14/v15 dihapus. Yang dipertahankan hanya dialog (VO + klip berita/Jensen/Altman, rantai v14).
- **Audio v16 disusun dengan earshot asli** (github.com/Leonxlnx/earshot 0.4.0, commit 591fa3e, di-clone baru, bukan salinan `external/` repo ini). Prosesnya mengikuti `skills/real-sound` dan `docs/launch-video-sound.md`:
  - **Cue dari picture.** Grammar launch earshot: hard cut, cut zoom, dan pergantian babak tanpa SFX (14 cue dibuang). Gerak kamera mendapat satu swish.
  - **Pemilihan suara.** Setiap peran dipilih dengan `earshot rank`, `realness`, dan `find` dari Epidemic, folder Irfan, papan audisi, dan bank earshot. Bank earshot kalah di semua peran (sintetis / realness rendah).
  - **Mix dan level.** Dirakit dengan `mix.py` (design JSON). Level tiap event diukur di atas bed musik memakai `bed_db` dan offset dari kit `launch`.
  - **Master.** `master.py` −14 LUFS, ceiling 0,6 (AAC ffmpeg overshoot ±5 dB pada ceiling 0,77).
- **Palet (satu peran satu bunyi):**
  - Kata dan kursor: klik mouse (Pixabay 15C, PAKAI Irfan).
  - Foto: shutter Canon 5D (Epidemic).
  - Kartu/pop: UI Bubbly Select (Epidemic).
  - Lampu: light switch (Epidemic).
  - Gerak kamera: Swish Tonal Flyby (Epidemic).
  - Hit: Electric Tonne (Epidemic).
  - Riser: Pixabay 04C.
  - Ketik: Apple keyboard (Epidemic, dipotong per huruf).
  - Lainnya: trash, marker, dan langkah kaki dari Epidemic.
- **Musik:** "Leave the Room" (Damon Greene, Epidemic, 120 BPM, G minor). Diedit di garis birama: drop di 54,93 dtk, outro di akhir. Musik turun 5 dB di bawah VO, dengan stop-down 9 dB sebelum 5 hit besar.
- **QA:**
  - `earshot critique` atas film: launch-grade (22/23, 0 critical/major; sisa minor: low end tipis).
  - `qa.py`: coverage 336/336, sync 0 meleset, 0 klik.
  - Uji HP 20 %: 277/336 terdengar, 0 SFX tajam terhadap presence VO.
  - VO di atas musik+SFX: median 11,5 dB.
- **Kode dan bukti:** `audio-v16-earshot/` (`run.sh` menjalankan semuanya; media dan aset tidak di repo).
- **Menunggu review telinga Irfan atas v6.**

## Keputusan terkunci
- Storyboard: Wonder export panel 00a–06g (03a/03b memakai versi R2).
- VO: narator perempuan ElevenLabs, playback 1,0. Klip berita, Jensen, dan Altman playback 1,0.
- Cold open: supercut berita dengan kinetic typography per kata, kiri→kanan, tidak menutupi pembicara.
- Audio v14:
  - VO kering, tanpa reverb.
  - (v14, digantikan v16) SFX dari stok Kenyset/Tuntunly/ElevenLabs.
- Audio v16: earshot (upstream) menyusun dan memilih; library (Epidemic, folder Irfan) hanya sumber file. Klik per kata = klik mouse, bukan kayu.
  - Satu peran satu bunyi; satu event satu bunyi.
  - Setiap kata kinetik bersuara.
  - SFX tidak pernah mendahului objek.
  - Musik di bawah VO −26,5 LUFS.
  - Master −14 LUFS.
- Gemini hanya sebagai masukan. Tabel aturannya harus diverifikasi terhadap proyek yang sudah lulus (The Gap) dan referensi ber-VO.

## Di mana file berada
- **Kode Remotion:** `remotion/` di repo ini (tanpa `public/` media dan `node_modules`). Komposisi `PenggantiKitaSendiri`.
  - Log event kata: render dengan `--props='{"sfxlog":true}' --log=verbose`, lalu ambil baris `SFXEV`.
- **Kode audio v14:** `audio-v14/`. Alurnya:
  1. `assemble14.py` (dialog + timeline);
  2. `build_cues14.py`;
  3. `sync14.py <render_tanpa_audio.mp4>`;
  4. `mix14.py params14.json`;
  5. `qa14.py` + `claude/motion-graphic/scripts/audio_qa.py`.
- **Media dan input audio** (tidak ada di repo): di Mac, `~/Documents/Skill-Development/AI-Video/_cloud-handoff/pks-cloud-2026-11-01/home_claude/`. Strukturnya sama dengan jalur absolut di skrip (`/home/claude/...`). Untuk menjalankan ulang, salin isinya ke `/home/claude/` di sesi cloud, atau ganti prefiks jalurnya.
  - `pks-out/`: v4 final, video v2 tanpa audio, `word_events.txt`.
  - `pks-video/public/`: semua klip, foto, dan gambar Wonder.
  - `v9/`: take VO (`raw/`), `stt/`, `music10/` (ostinato), `mix14/` (`mix_master.wav`, `stem_dialog.wav`, cue/placed JSON).
  - `cold/`, `v6/mix/clips/`: audio berita, Jensen, Altman. `music_hunt/dl2/188.mp3`: bed Echoes.
  - `sfx_stock/`: salinan stok SFX yang dipakai.
  - Potongan `.tar.part00–09` dan `pks.tar` di folder `_cloud-handoff/` boleh dihapus (checksum `39bebd68fb608c11…` sudah cocok saat diekstrak).

## Sisa pekerjaan
1. Review telinga Irfan atas v4, lalu perbaiki sesuai catatannya (diff, bukan bangun ulang).
2. Uji speaker HP 20/50/100 % (`claude/motion-graphic/scripts/audio/audio_phone.py`).
3. Turunan format bila diminta.
