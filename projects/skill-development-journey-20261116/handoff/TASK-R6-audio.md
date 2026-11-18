# TASK-R6-audio · mix audio putaran 6 (pemulihan R4 + adegan D/E/IG baru)

TUJUAN: `audio/r6/mix_r6.wav` = suara asli ×1,0 + musik R4 apa adanya + SFX R4 yang hanya diubah di rentang yang visualnya berubah, sehingga setiap bunyi jatuh tepat di objek yang terlihat di `qc/r6/visual_r6.mp4`.

## AWAL SESI SUDAH DIKERJAKAN SUTRADARA
`git pull` + `tools/doctor.sh` sudah dijalankan; satu-satunya GAGAL adalah "PETA.md basi" karena file lokal yang belum di-commit. Itu bukan penghalang tugas ini. JANGAN jalankan `doctor.sh --fix` dan jangan menyentuh PETA.md; langsung kerjakan tugas di bawah.

## KONTEKS
Video 16:9 1920×1080, 29,97 fps, 2512 frame = 83,817 dtk. Visual putaran 6 sudah dikunci oleh Sutradara (`lego/lego_r6.json` → `qc/r6/visual_r6.mp4`, tanpa audio). Audio R4 final 1 dibangun dari stem yang ada di folder ini dan dipakai ulang (keputusan Irfan D-442):
- `audio/stem_suara.wav` (mono 48 kHz, TERKUNCI, jangan diubah levelnya), `audio/stem_musik_A.wav` (musik R4, jangan diubah), `audio/stem_sfx_A.wav` + `audio/cues.json` (69 cue SFX R4; daftar peran → file di `audio/sfx_build.py`), `audio/music_build.py` (cara mix R4: suara ×1,0 tanpa limiter/kompresor; puncak ≤ −1 dBFS hanya lewat stem musik/SFX), `audio/mix_report.json` (ukuran mix R4 sebagai pembanding).

Yang berubah secara visual (bunyi di luar rentang ini TIDAK disentuh):
1. **8,3–12,3 dtk bubble perkenalan** (D-417): isi bubble berubah ("Aku yang ngedit loh." Claude bete, "Hi! Aku nemenin Claude." ChatGPT, Gemini "…"). Cue `sapa` 8,575 / 9,495 / 9,81 dan `objek-mendarat` 8,306: cek frame kemunculan tiap bubble/tokoh di `visual_r6.mp4`; geser cue supaya puncaknya di frame objek muncul (±1 frame). Peran/file tetap.
2. **57,658–72,075 adegan D** (workflow satu sesi Claude, latar hitam, tanpa teks kinetik). HAPUS semua cue R4 di rentang ini (milik papan lama: 57,919 transisi-dunia, 58,269, 58,559 coretan, 60,515, 61,065, 62,47, 62,8, 64,7, 65,05, 67,648, 68,8, 69,465, 70,01, 70,558). Ganti dengan cue baru dari tabel di bawah. Waktu dunia w0 = 57,9246 dtk (57,6576 + 8 frame).
   | Objek | Waktu absolut | Peran |
   |---|---|---|
   | gelombang grid biru memancar dari bubble prompt, menutup wajah lalu membuka jendela Claude | mulai 57,66, cincin paling padat ±58,05, habis ±58,52 | `gelombang` (BARU: shimmer/sweep digital lembut berbutir, bukan whoosh angin; satu bunyi untuk seluruh transisi, puncak ±58,05) |
   | "Update dari ChatGPT · session A" masuk | w0+1,781 | `pesan` (file R4 yang sama) |
   | pesan Claude "Saya sudah memerintahkan…" | w0+3,721 | `claude-balas` (BARU: tik UI sangat lembut, −10 dB) |
   | "Messaged ChatGPT · session A" (kirim) | w0+4,881 | `kirim` (BARU: swoosh kirim pesan pendek) |
   | "terkirim" ✓ | w0+5,531 | `terverifikasi` (file R4 yang sama) |
   | pesan Claude "Saya minta ChatGPT session B…" | w0+5,686 | `claude-balas` |
   | "Messaged ChatGPT · session B" | w0+6,831 | `kirim` |
   | "Update dari ChatGPT · session B" masuk | w0+8,006 | `pesan` |
   | "Edit guide/teks/GUIDE.md" + diff hijau | w0+10,844 | `claude-balas` |
   | "Ran cut_check.py" → PASS ✓ + Clawd lega | w0+12,459 | `terverifikasi` |
   | ringkasan "Pelajaran tersimpan…" | w0+12,609 | — (terlalu dekat PASS, senyap) |
   Teks Claude yang mengalir per kata TIDAK berbunyi per kata.
3. **72,075–76,41 adegan E** (Blender: Claude dari belakang mengetik di keyboard, monitor timeline): cue 72,075 transisi-dunia (potong keras D→E) dan 72,181 `ketik` tetap; cek 72,608 `kata-hero` jatuh di frame "100%" muncul (lapisan T081 sekarang, bukan T096); 75,645 `objek-mendarat` hanya dipertahankan bila ada objek yang muncul di frame itu, bila tidak ada → hapus.
4. **76,41–83,82 IG** (versi R5c: tanpa tulisan tangan, narasi di dalam bidang video). HAPUS 80,825 `coretan` (tulisan tangan sudah dihapus, D-414). Cek 79,553 dan 80,118 `pesan` jatuh di frame komentar pop; 78,659 `kacau` (dulu untuk "profesional" berhuruf acak; sekarang "profesional" tidak lagi kacau) → ganti peran ke `kata-hero` bila kata itu tampil sebagai kata besar, atau hapus bila tampil sebagai narasi biasa; 82,407 `kunci-slam` cek ke kata yang tampil; 83,55 `penutup` tetap.

## FILE BOLEH
- BARU: `audio/r6_audio.py` (skrip pembangun), `audio/r6/**` (keluaran: `cues_r6.json`, `objects_r6.json`, `stem_sfx_r6.wav`, `mix_r6.wav`, `mix_report_r6.json`, log gerbang, lembar periksa).
## FILE JANGAN
Semua file lain. Terutama: `audio/stem_*.wav`, `audio/cues*.json`, `audio/mix_*.wav`, `audio/order-*`, `audio/sfx_build.py`, `audio/music_build.py`, `edit/`, `lego/`, `remotion/`, `qc/` (kecuali membaca `qc/r6/visual_r6.mp4`), folder proyek lain, `~/sfx` (baca saja).

## TEMUAN
Tidak ada temuan ronde sebelumnya; ini ronde 1.

## KARTU
Kartu 07 (SFX): pop per objek/shape baru, satu peran satu file; bunyi UI tipis dan bersih, bukan kartun.

## LARANGAN
- Suara asli tidak diturunkan, di-loudness, di-limit, atau dikompres (E23). Musik R4 tidak diganti.
- 1 SFX untuk 1 objek penting; satu peran = satu file dan satu file = satu peran; jarak antar-bunyi ≥ 100 ms, whoosh ≥ 1 dtk, maksimal 5 cue per 2 dtk; gain −4 sampai −10 dB (E24).
- File SFX baru dari `~/sfx/SFXIrfan` dulu; cek karakternya dengan `audio/sfx_dengar.py`/`sfx_dengar.json` atau `claude/motion-graphic/scripts/audio/sfx_profile.py`. Palet terlarang: kayu/thock/felt, koin/logam, kartun/langkah kaki, 8-bit, noise/sinus sintetis, rope-creak. Sumber berdesis/tajam ditolak, bukan dikeraskan.
- Bunyi di luar empat rentang di atas harus identik sampel dengan stem_sfx_A.wav.

## LULUS BILA
1. `audio/r6/mix_r6.wav` 48 kHz stereo, panjang = 83,817 dtk ±1 ms; puncak ≤ −1 dBFS; suara di mix = stem_suara ×1,0 (cek korelasi/selisih di bagian tanpa SFX).
2. Di luar rentang 8,3–12,3 / 57,6–76,41 / 76,41–83,82: selisih stem_sfx_r6 vs stem_sfx_A = 0 (sampel identik).
3. Tiap cue baru/geser: frame objek di `visual_r6.mp4` disebut di `cues_r6.json` (`terikat_ke_visual` + frame), dan lembar periksa `audio/r6/cek_cue.jpg` (still frame puncak tiap cue di rentang yang berubah, diberi label waktu+peran).
4. Gerbang PASS dan log disimpan di `audio/r6/`:
   - `python3 ~/work/skill-development/claude/motion-graphic/scripts/gate/sfx_density.py <video+mix sementara> audio/r6/cues_r6.json --objects audio/r6/objects_r6.json`
   - `python3 ~/work/skill-development/claude/motion-graphic/scripts/gate/voice_level.py audio/stem_suara.wav audio/r6/mix_r6.wav`
   - `python3 ~/work/skill-development/claude/motion-graphic/scripts/audio/audio_phone.py …` (lihat docstring-nya untuk argumen)
   Video sementara untuk gerbang: mux `qc/r6/visual_r6.mp4` + `mix_r6.wav` ke `audio/r6/cek_r6.mp4` (copy video, AAC 320k).
5. Loudness integrated mix dalam ±1 LU dari mix R4 (`audio/mix_report.json`).

## JANGAN
Render video, ubah visual/kontrak, sentuh rentang lain, ganti musik, merancang ulang peran R4 di luar rentang. Kata kabur → tulis pertanyaan di REPORT, jangan menebak.

## LAPORAN
Tulis `handoff/REPORT-R6-audio.md`: daftar cue dihapus/digeser/ditambah (waktu, peran, file, frame objek), file SFX baru + alasan, hasil tiap gerbang (≤ 3 baris per gerbang), dan hal yang tidak bisa diputuskan.
