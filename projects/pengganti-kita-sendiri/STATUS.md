# STATUS: Pengganti Kita Sendiri (@siirfannih)

_Update terakhir: 1 Nov 2026 19.50 WITA._

## Posisi sekarang
- **Versi terakhir: v7** (`PKS_v7.mp4`, 132,8 dtk, 1080p). Visualnya hasil render ulang kode Remotion setelah audit visual. Audionya v17. Menunggu review Irfan.
- **Penanda SFX dari kode (metronom).**
  - Setiap objek menulis `SFXEV <jenis> <detik> <id>` lewat `sfxMark()` di `remotion/src/lib/anim.tsx`, dengan variabel waktu yang sama dengan animasinya. Kata kinetik memakai `KWord` (`SFXEV word`).
  - Render dengan `--props='{"sfxlog":true}' --log=verbose` lalu `grep SFXEV` menghasilkan `audio-v17/sfxev.log` (370+ penanda). Hanya file itu sumber cue.
  - Daftar tangan v14 dan detektor frame tidak dipakai lagi. Daftar itu sempat memuat objek yang tidak ada di kode, misalnya "slab KREATIF" dan "tile ChatGPT".
- **Audit visual 1 Nov.** Berkas cahaya yang terpotong dan lancip diperbaiki di 06a ("MEMBANGUN", screenshot Irfan), 02d, 01c, 03c–03d, dan 05e (sinar). Perbaikan lain:
  - glow bidang terpotong kotak di 06c dan 06d;
  - strip hitam di langit 04a;
  - badan piktogram terpotong di 01d, 06e, dan 06g;
  - kontras teks di 00a dan 04d.
- **Dialog.** Rantai EQ klip berita, Jensen, dan Altman diganti (`audio-v17/assemble15_dialog.py`). Notch 240/350/680 Hz, LPF 10 kHz, dan afftdn dibuang; presence dan high-shelf ditambah. Level klip sekarang setara VO. Klip Gates memang sempit dari sumbernya (rolloff 3,3 kHz, unduhan ulang tetap sama).
- **SFX v17.** Dirakit dengan earshot upstream (`skills/real-sound` `mix.py`, `qa.py`, `master.py`). Pemilihan pakai `audio-v17/pick.py`: earshot match dengan pengecoh, cek nada terhadap kunci lagu G minor (anti-sumbang), roughness, desis, skor earshot harsh/soft, dan realness.
  - Kata: satu tik mesin tik Hermes (Epidemic). Kata slam: hit "Slam Braam".
  - Klik kursor: mouse 15C.
  - Kartu: pop "Small Lid" (nada D).
  - Foto: shutter Nikon D3100.
  - Gerak kamera: "Whoosh Short Wide Noise Dry".
  - Ketik composer: keyboard Apple.
  - Musik: "Leave the Room", tetap.
- **QA v7:**
  - `earshot critique`: launch-grade 23/23.
  - `qa.py`: coverage 331/331, 0 klik.
  - Sync: hit/slam puncaknya +78 ms setelah frame, karena body braam; onset tepat di frame.
  - HP 20 %: 266/331 terdengar, 0 tajam.
  - VO di atas musik+SFX: median 11,2 dB.
  - Master −14 LUFS, peak −2,8 dB.

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
