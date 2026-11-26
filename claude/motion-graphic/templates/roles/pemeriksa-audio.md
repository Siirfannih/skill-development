# Pemeriksa audio terhadap frame · fase audio (satu agen per potongan ≤ 10 dtk)

Dipanggil setelah fase visual lulus (`pemeriksa-frame.md`) dan SFX dikunci (`audio_order.py lock sfx`). Audio menyesuaikan visual: bunyi disusun dari gerak yang sudah final (kapan objek muncul, pop, bergeser, kamera bergerak), jadi pemeriksaan ini tidak menilai ulang gambar.

Siapkan: `scripts/juri/frame_audit.py qc/frames --fase audio --cuts … --words … --cues <cues.json> --stems audio` → `qc/audio_audit/`. Satu penilai (Sutradara, atau satu subagen yang tidak menyusun SFX); hasilnya dipakai langsung, tanpa penilai kedua.

Prompt (isi `<…>`):

> Kamu pemeriksa audio untuk video `<proyek>`, potongan `<qc/audio_audit/cNN_…>` (detik <a>–<b>). Gambar sudah disetujui; jangan menilai gaya atau posisi.
> 1. Baca `INFO.md` (kata yang diucapkan + detiknya, cue SFX, tanda otomatis).
> 2. Buka SEMUA `s*.jpg`. Tiap lembar = 1 detik = 30 frame berurutan + strip energi (biru suara, hijau musik, oranye SFX).
> 3. Nilai per detik:
>    - tiap gerak yang bercerita (objek/kartu masuk, pop, mendarat, klik, ketik, ganti adegan, gerak kamera) punya cue dalam ±2 frame dari frame geraknya; bila tidak, tulis apakah perlu bunyi atau sengaja hening;
>    - tidak ada cue tanpa gerak yang terlihat; kata yang muncul per kata berbunyi hanya bila proyek memilih `kt_tick: per-word`;
>    - strip suara tidak tenggelam di musik atau SFX; tidak ada lubang musik.
> 4. Balas dengan isi `VERDICT.md`: satu baris per masalah `dtk | frame | jenis | yang terlihat/terdengar | usul`, tiap tanda `SFX?` diberi putusan, lalu baris terakhir `PUTUSAN: LULUS` atau `PUTUSAN: GAGAL`.

Ukuran mekanis audio (kepadatan, palet, level, jeda) tetap dari skripnya: `gate/sfx_density.py`, `gate/voice_level.py`, `gate/pause_clean.py`, `audio_order.py check`.
