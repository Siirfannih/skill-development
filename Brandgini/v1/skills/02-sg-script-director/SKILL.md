---
name: sg-script-director
description: Mengubah fakta.md menjadi naskah VO bahasa Indonesia natural (130-142 kata) dan shotlist.json terstruktur untuk Style A (Einstein) atau Style B (Vox).
---
# Skill 02: Script & Beat Director

## Trigger
Dijalankan oleh Worker PC (Claude Sonnet; eskalasi ke Opus hanya jika gagal QC 2×) segera setelah `episodes/epXX/fakta.md` lolos Gate 01.

## Anti-Pattern
- Menulis bahasa Indonesia kaku bergaya artikel/berita (*"merupakan"*, *"oleh karena itu"*, *"sebagai berikut"*).
- Membuka video dengan intro, salam, atau *"Simak sampai habis!"*.
- Memasukkan fakta atau angka yang tidak tertulis di `fakta.md`.
- Membuat *beat* visual statis lebih dari 4 detik.

## Invariant
1. **Spesifikasi Naskah VO (`script.md`)**:
   - **Panjang**: 130–142 kata (target durasi nyata 50–58 detik pada tempo ~2,5 kata/detik).
   - **Gaya Bahasa (Natural Conversational)**: Gunakan *"kamu/kita"* (atau *"lo/gua"* jika profil suara memakai gaya santai Jakarta), *"nggak"*, *"banget"*, *"soalnya gini"*.
   - **Rekayasa Intonasi TTS**:
     - Pecah kalimat panjang menjadi klausa pendek 6–10 kata.
     - Sisipkan `...` untuk jeda napas mikro (~0,3 detik) sebelum *punchline*.
     - Sisipkan tanda tanya `?` untuk intonasi penasaran alami.
     - Gunakan HURUF KAPITAL pada maksimal 1 kata penekanan per kalimat jika perlu stres vokal.
   - **Struktur 5 Babak**:
     1. `0–3s` **Hook + Cap Pembuka** (`Kalau…` / `Kenapa…` / `Katanya…`) — langsung objek, tanpa intro.
     2. `3–6s` **Transisi Tanda Tangan**: ucapkan *"Soalnya gini..."* (momen Maskot Gini membuka flap / transisi cutaway).
     3. `6–42s` **Build-Up (6–8 Beat, tiap 3–5 detik ganti visual)**: satu ide per beat, rakit dari sederhana ke sistem utuh.
     4. `42–51s` **Payoff ("Oh gitu" Moment)**: jawaban hook dalam satu kalimat tajam yang mudah diingat.
     5. `51–56s` **Loop + Pertanyaan Komentar**: satu pertanyaan ringan yang memicu komentar, visual menutup kembali ke frame 1.
2. **Kontrak Output (`shotlist.json`)**:
   - Wajib mematuhi `kit/shotlist.schema.json`.
   - Setiap beat wajib menyertakan: `beat_id`, `start_sec`, `end_sec`, `vo_text`, `display_keywords` (1–3 kata kunci besar untuk tipografi layar), `visual_type`, `subject_cutout`, `motion_primitive`, `sfx_cue` (**tanpa SFX kayu**).

## Gate (Wajib Lulus)
- Jalankan `bash tools/slop-grep.sh episodes/epXX/script.md` -> harus exit code `0`.
- Validasi JSON terhadap `kit/shotlist.schema.json`.
- 100% klaim faktual terpetakan ke `fakta.md`.
