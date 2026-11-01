# STATUS: Pengganti Kita Sendiri (@siirfannih)

_Update terakhir: 1 Nov 2026 23.10 WITA._

## Posisi sekarang
- **Edit di Remotion Studio (lokal di Mac).** Proyek ada di `~/Documents/Skill-Development/AI-Video/pks-studio/remotion`. Jalankan `npx remotion studio --port=3333`, lalu buka http://localhost:3333/PenggantiKitaSendiri.
  - Timeline berisi grup **🎬 Visual**, track **🎙 Dialog** (VO dan klip dengan suara asli), dan satu grup **SFX · <jenis>** per jenis. Setiap cue tampil sebagai Sequence sendiri.
  - Timeline suara diatur oleh `defaultProps` di `remotion/src/Root.tsx`, dengan skema Zod di `remotion/src/SoundLayer.tsx`. Isinya: `dialogMuted`/`dialogGainDb`, `solo`, `lanes[]` (mute/gain per jenis), dan `cues[]` (`at` dalam detik, `gainDb`, `muted`; `codeAt` = frame penanda dari kode, hanya sebagai acuan).
  - Edit di panel Default Props lalu Save. `Root.tsx` ikut tertulis, dan render final membaca nilai dari situ.
  - `audio-v18/gen_studio.py` membangun ulang `Root.tsx` dan `public/audio/v8/` dari mix v8. File WAV tidak masuk git (`public/audio` ada di gitignore).
  - Di pratinjau Studio, posisi SFX dibulatkan ke frame terdekat (±16 ms). Render final memakai detik persis.
  - Rspack dimatikan (`remotion.config.ts`) karena Studio di Mac error `$RefreshReg$`.
- **Versi terakhir: v8** = visual v7 + audio v18.
  - Tanpa backsound. Suara asli tanpa efek (`audio-v18/assemble16_dialog_raw.py`).
  - SFX hanya untuk kata yang berdiri sendiri atau ditekankan (`EMPH` di `audio-v18/build.py`), plus SFX objek dari penanda kode (`sfxMark()` di `remotion/src/lib/anim.tsx`).
  - QA: 263 event, VO jernih (median 21,4 dB), −14 LUFS, TP −4,4 dB.
- **Versi lama dihapus 1 Nov 23.10:** audio-v12, v14, v16-earshot, v17, dan editor artifact. Semuanya digantikan audio-v18 dan Remotion Studio. Riwayatnya tetap ada di git.
- **Sisa pekerjaan:** Irfan mengedit di Studio → Claude membaca `Root.tsx` → `audio-v18/run.sh` → render final.

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
