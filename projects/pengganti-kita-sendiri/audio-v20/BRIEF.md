# Audio PKS v20: sesi baru, mulai dari nol (Irfan 2 Nov 17.14)

> "Settingan audionya masih pakai settingan lama, buat project session baru dan lepas semua aturan audio, hanya gunakan prinsipnya aja. Karena audio yang aku minta dipakai, ekspektasiku kamu akan susun ulang jadi audionya udah mulai dari awal."

## Dilarang dipakai (settingan lama)
Jangan membaca, menyalin, atau menurunkan angka dari file berikut:
- `audio-v18/`, `audio-v19/` (mix_v19, mix_v10c, mix_v11, music_bed, palette_*, cues_*);
- `tools/sfxev_to_cues*.py`, `tools/audio_gate.py`;
- `claude/motion-graphic/references/audio.md`, beserta bagian audio di `three-segment-gate.md` dan SKILL.md.

Yang termasuk settingan lama dan tidak boleh dipakai: tabel level REL, SFX duck 3–5 dB, bed duck, room tone, band filter per keluarga, limiter lama, target keterdengaran 85 %, gerbang >5 kHz, dan backsound orkestrasi stem v19.

Semua keputusan disusun ulang dari materi di bawah dan diuji dengan telinga (earshot) pada mix ini sendiri.

## Prinsip (hanya ini yang dibawa)
1. **Satu objek atau peristiwa visual = satu bunyinya sendiri, dengan makna.** Tidak ada objek bergerak atau muncul yang diam. Tidak ada bunyi tanpa objek (spam).
2. **Kata kode yang sama = keluarga bunyi yang sama.** Nama file Irfan adalah peruntukannya, misalnya:
   - Pergantianfoto: pergantian gambar;
   - Pergantianfoto:gambarpertama: gambar pertama;
   - Keyboardtyping + Enter: ketikan dan kirim;
   - Kinetictypography: kata muncul, dipakai acak;
   - Katapertama: kata pertama;
   - Wooshcameramovementtransisi: kamera bergerak;
   - Move: objek bergerak;
   - Popup user interface: AI;
   - ResponAI;
   - Notif;
   - Scanning dan gerak kurva;
   - scaningfast;
   - Cut / Variasitransisiataucut / Cutcontrastransision;
   - Lasertransision;
   - basmenyebar;
   - file ES_* sesuai namanya.

   File yang namanya tidak cocok dengan peristiwa mana pun tidak wajib dipakai.
3. **SFX family:** satu file bisa berisi beberapa varian. Potong per varian, dengarkan, dan pakai varian yang paling cocok, bukan seluruh file. "(gunakansecaraacak)" berarti varian dirotasi.
4. **Bunyi jatuh tepat bersama objeknya.** Bukan sebelum, bukan sesudah. Whoosh memuncak di gerak tercepat kamera. Whoosh hanya untuk gerak nyata; Irfan menyebut whoosh v10 "berisik dan spam".
5. **Karakter:** renyah, agak nyaring, bernada seperti motion Apple. Tidak kasar, tidak terlalu deep. Gema hanya yang alami dari file.
6. **Backsound membangun emosi**, tanpa lubang hening mendadak. VO selalu terdengar jelas, termasuk di speaker HP.
   - Level SFX dan backsound ditentukan dari VO proyek ini sendiri: suara narator perempuan, serius, tema reflektif.
   - Referensi hanya studi kasus, bukan angka yang disalin.
7. **Nilai dengan telinga.** Pakai earshot (`external/earshot`; pasang dengan `pip install -e external/earshot --break-system-packages`, CPU torch):
   - `describe` / `match` per varian;
   - `timeline --video --cues` pada hasil mix;
   - `critique --profile` terhadap profil referensi, kalau berguna. Profil ada di Mac; boleh dibuat ulang dari referensi yang tersedia, atau dilewati.
   - Ukuran Hz/LUFS dipakai sebagai pendukung, bukan pengganti telinga.

## Materi
- **Video bisu final v11:** `/mnt/user-data/uploads/AI-Video/pks-studio/seg/v11final_v.mp4` (1920×1080, 30 fps, 132,8 dtk). Lihat gambarnya sendiri (contact sheet / frame) untuk memahami setiap peristiwa.
- **Penanda kode** (frame persis tiap objek/peristiwa, dari render): `/mnt/user-data/uploads/AI-Video/pks-studio/seg/v11final.sfx`. Formatnya `SFXEV <jenis> <detik> <scene:objek:peristiwa>`. Nama objek ada di id.
  - Kata `word:` = kata kinetik/penekanan; subtitle berjalan tidak punya penanda dan tidak perlu bunyi.
  - `type:start|end` = rentang ketikan; `enter` = tombol kirim.
  - Penanda boleh dikoreksi bila gambar menunjukkan lain. Peristiwa visual tanpa penanda boleh ditambah dari gambar.
- **VO + klip narasumber (dialog utuh):** `/mnt/user-data/uploads/AI-Video/pks-studio/remotion/public/audio/v8/dialog.wav`. Jangan diubah tempo/pitch-nya.
- **SFX Irfan:** `/mnt/user-data/uploads/SFXIrfan/` (35 file).
- **Backsound pilihan Irfan:**
  - `ES_Particle Emission - Soundpembuka.mp3` (163 dtk);
  - `Reggaesoundpembuka-pakeawalannyaaja sebelumsuarapiano.mp3` — "pakai awalannya saja sebelum suara piano";
  - `documenter.mp3` (16,6 dtk);
  - `ES_Ambience, Office…` (ambience kantor).

  Irfan minta dua versi: **Video 1** dan **Video 2** dengan backsound berbeda. Kombinasinya kamu pilih dan beri alasan.
- **Contoh video ber-audio bagus** (boleh didengar sebagai studi kasus): `/mnt/user-data/uploads/AI-Video/pks-studio/out/PKS_v10c2.mp4` TIDAK termasuk, karena itu settingan lama. Referensi asli ada di Mac (`~/Documents/Skill-Development/Personal-video/Refference/`). Pakai hanya bila perlu, lewat tool remote-devices.

## Hasil
Semua dikerjakan di folder baru `projects/pengganti-kita-sendiri/audio-v20/`, dengan skrip sendiri:
- `SOUND-MAP.md`: setiap peristiwa (detik, objek, bunyi + varian, alasan);
- `build.py`;
- master `master_video1.wav` dan `master_video2.wav` (48 kHz, sekitar −14 LUFS, true peak ≤ −1 dBTP) di `/home/claude/pks/v20/`;
- `LISTEN.md`: hasil earshot dan keputusan yang diubah karena hasil dengar.

Commit file kecil (bukan audio besar) ke main dengan `git pull --rebase --autostash origin main && git push origin HEAD:main`. Pesan commit diakhiri:
```
Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01QPNycWQtoYsG5NpceQZXbF
```
