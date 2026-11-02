# Pembelajaran sesi 1–2 Nov 2026 (PKS v8 → v20)

Ditulis untuk sesi berikutnya. Dari kesalahan yang terulang dan cara yang akhirnya berhasil.

## A. Yang berhasil dan harus dibawa

1. **Kode ditulis seperti visualnya sendiri.** Objek diberi nama sesuai isi, dan `sfxMark` diberi id `<scene>:<objek>:<peristiwa>`.
   - Ini membuat audio, QC dan audit bisa dilacak per objek.
   - Penanda SFX dicatat dari render penuh: `seg.sh … --props {"sfxlog":true}` menghasilkan `.sfx`.
2. **Gerbang 3 segmen.** Kode dicek, lalu pra-render (probe OBJ + `seg2_layout_check` SAFE/CLASH/CONTR), lalu render.
   - Masalah layout tertangkap sebelum render 30 menit.
   - Dokumennya: `claude/motion-graphic/references/three-segment-gate.md`.
3. **Hierarki subagent.**
   - Worker mengerjakan file miliknya saja.
   - Perubahan desain lewat mini proposal + still sebelum/sesudah.
   - Claude utama menilai visual dan mengirim temuan balik ke worker.
   - Kepemilikan file yang tegas (worker T = lib/teks, V = adegan) mencegah tabrakan edit.
4. **Earshot sebagai telinga.** Angka level/spektrum tidak tahu bunyi seperti apa.
   - v10b lolos semua angka, tetapi earshot mendengar "error buzz" dan "record scratch". Irfan mendengarnya seperti starter motor.
   - Wajib: `describe/match` per varian, `timeline --cues` pada mix, `critique --profile` terhadap referensi.
   - `earshot timeline` pada video referensi menunjukkan pola nyata: kosakata bunyi, kepadatan, sinkron potongan, prominence.
5. **SFX family.** Satu file berisi beberapa varian. Potong per varian (`ears/family.py`) dan pakai yang paling cocok.
6. **Audio sesi baru tanpa warisan (v20).** Setelah Irfan meminta "lepas semua aturan audio, pakai prinsipnya saja", agent segar tanpa akses file lama menghasilkan mix yang lebih koheren.
   - Ini mengurangi efek "tambal di atas tambal".
   - Pelajaran: bila feedback berulang di area yang sama, mulai ulang dari prinsip, jangan menambal angka.
7. **Mac sebagai mesin render.** `seg.sh` (bundle sekali, render bertahap) dan sinkron src lewat tgz + checksum (`md5` Mac vs `git show`).
   - Cek kesamaan dulu supaya patch Mac-only tidak tertimpa.

## B. Kesalahan yang terulang (penyebab akar)

| Masalah | Muncul lagi karena | Pencegahan |
|---|---|---|
| **Pita/shadow hitam di belakang teks Bloomberg (0:07–0:08)** | Shadow SpeakerWords sudah dihaluskan, tetapi sumber aslinya **`radial-gradient` gelap di `S00_ColdOpen.tsx` baris ±200** (elips 900×150 px di y 750, aktif dari `shrinkAt − 0.5`). Itu scrim tersembunyi yang tidak tertangkap karena perbaikan hanya menyasar text-shadow. | Aturan terkunci dijadikan cek otomatis: `grep -rn "gradient(.*rgba(1[0-9],1[0-9],2[0-9],0\.[5-9]" src/scenes` + checker luminansi pita di belakang teks. Cari SEMUA sumber, bukan yang pertama ditemukan. |
| SFX salah karakter (starter motor, buzz) | Dipilih dari judul katalog, tidak didengar | Gerbang dengar earshot sebelum bunyi masuk mix |
| Whoosh spam/telat | File ditaruh dari awal file, padahal puncaknya 200–400 ms kemudian; setiap penanda gerak diberi whoosh | Selaraskan puncak/onset isi file; whoosh hanya untuk gerak kamera nyata (kurva gerak video) |
| Klik foto telat 58 ms | Onset 10 % mengambil awal desis | Selaraskan pada puncak transien; verifikasi dengan earshot sync `near` yang konsisten |
| Ketikan tanpa bunyi ketik | Penanda hanya di enter/klik | Setiap objek/visual punya penanda: ketikan memancarkan `type:start|end` |
| Teks hanya 17 % dari VO, lalu jadi "subtitle" | Prinsip "teks = penekanan" dibaca terlalu harfiah. Perbaikannya (CaptionTrack satu baris) hanya memenuhi cakupan, bukan kinetic. | Lihat C.1 |
| Perubahan worker merusak bagian yang dipuji (BERLOMBA, scrim) | Brief memberi wewenang desain tanpa gerbang | `LOCKED.md` + mini proposal |
| Disk cloud penuh | Bundle Remotion 97 MB per probe tertinggal di /tmp | Probe menghapus bundle-nya. Hapus `/tmp/remotion-webpack-bundle-*` lama tanpa tanya (izin Irfan 2 Nov 14.21). |
| Transfer file ke Mac gagal | `device_commit_files` dibatasi 30 MB, dan stagedPath kadang 400 | FLAC/m4a < 30 MB, atau SendUserFile → fileUuid. Video dirakit di Mac dari video bisu + audio. |

## C. Masalah terbuka (feedback Irfan 2 Nov 22.25), wajib diaudit di sesi baru

1. **Kinetic typography VO terlihat seperti subtitle.**
   - Kondisinya: satu baris datar, tanpa variasi, tanpa perpindahan kata, tidak menyesuaikan objek (jadi "tempelan").
   - Animasi masuk/keluar diulang-ulang.
   - Beberapa bagian melanggar kontras dan tidak seimbang, jadi perlu layering baru.
   - Arah: kata hidup di dalam/di sekitar objek (ikut gerak, bisa tertutup objek), susunan berganti (1–3 baris, ukuran per peran, posisi per komposisi), perpindahan kata antar baris, enter/exit bervariasi menurut peran. Lihat referensi kinetic (`GrokAgent/reference-videos/AUDIT-2NOV-B-kinetic.md`, canvas-skill-library kartu "Presenter and personal-story montage", "Pink studio workflow", dll.).
2. **Shadow hitam 0:07–0:08** (lihat B, baris 1).
3. **Jeda dan bagian kurang smooth**, rawan di-skip. Cari dengan kurva gerak (`ears/motion_curve.py`: flow/glob per frame), dengan target tidak ada frame statis > 1 dtk tanpa alasan. Juga contact sheet.
4. **Bentuk objek animasi kurang smooth atau terlalu rapi ("AI slop").** Contohnya piktogram geometris sempurna, kartu identik berderet, gerak linier. Perlu ketidaksempurnaan organik: easing berbeda per objek, stagger tidak seragam, tekstur/grain, variasi bentuk.

## D. Posisi file

- **Repo:** `projects/pengganti-kita-sendiri/` (remotion src = sumber kebenaran; `audio-v20/` = audio aktif; `audio-v19/` + `tools/sfxev_to_cues*` = arsip lama, jangan dipakai).
- **Mac `~/Documents/Skill-Development/AI-Video/pks-studio/`:**
  - `remotion/` (salinan src, tanpa @types → tsc Mac error, abaikan; tsc di cloud);
  - `seg/v11final_v.mp4` (video bisu final v11), `seg/v11final.sfx` (penanda), `seg/master_v20_video{1,2}.flac`;
  - `out/PKS_v20_video{1,2}.mp4`;
  - `ears/` (earshot venv Python 3.12, `palette.py`, `family.py`, `tl_sum.py`, `motion_curve.py`, `refs/*.timeline.json` + `refs/profile.json` dari 6 referensi).
- **SFX dan backsound Irfan:** Mac `~/Downloads/SFXIrfan/`. Kenyset: `~/Downloads/Kenyset [FREE SFX PACK]/`.
- **Referensi:** Mac `~/Documents/Skill-Development/Personal-video/Refference/` (Sound efex, Apple Style, Kinetic typography). The Gap v18: `projects/jadisatu-60s/render/`.
