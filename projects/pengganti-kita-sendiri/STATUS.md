# STATUS: Pengganti Kita Sendiri (@siirfannih)

_Update terakhir: 1 Nov 2026 16.20 WITA. Sesi cloud ditutup karena terlalu panjang; lanjutkan di sesi baru dari dokumen ini._

## Posisi sekarang
- **Versi terakhir: v4** (`PenggantiKitaSendiri_v4_1080p.mp4`, 132,8 dtk, 1920×1080 @ 30 fps) = visual v2 + audio v14.
- **Menunggu review Irfan** atas audio v14. Ada dua keputusan terbuka:
  1. Langkah kaki piktogram di detik 54 dan 99–101 saat ini tanpa SFX. Perlu bunyi langkah lembut?
  2. Klik kata `ipad_click` terang (energi di 2–6 kHz), letaknya 16 dB di bawah VO. Masih nyaman, atau perlu tap yang lebih lembut?
- Audit audio dan alasan semua perubahan ada di `AUDIO-AUDIT-1NOV.md`. Aturan yang direvisi ada di `claude/motion-graphic/references/audio.md` §14.5 dan §14.8–14.10.

## Keputusan terkunci
- Storyboard: Wonder export panel 00a–06g (03a/03b memakai versi R2).
- VO: narator perempuan ElevenLabs, playback 1,0. Klip berita, Jensen, dan Altman playback 1,0.
- Cold open: supercut berita dengan kinetic typography per kata, kiri→kanan, tidak menutupi pembicara.
- Audio v14:
  - VO kering, tanpa reverb.
  - SFX hanya dari stok Irfan: Kenyset, SFX Tuntunly, ElevenLabs The Gap (`jadisatu-60s/remotion/sfx-el`), ElevenLabs video #2.
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
