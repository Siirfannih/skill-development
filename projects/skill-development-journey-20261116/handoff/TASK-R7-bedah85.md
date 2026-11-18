# TASK-R7-bedah85 · bedah ritme, transisi, SFX, musik, tipografi kartu 85 + peta "hal baru" video kita
## AWAL SESI SUDAH DIKERJAKAN SUTRADARA
`git pull` + doctor sudah jalan; satu-satunya GAGAL "PETA.md basi". JANGAN `doctor.sh --fix`, jangan sentuh PETA.md, jangan commit.

TUJUAN: tahu PERSIS bagaimana video referensi Sam John (`sumber/ref-r6/ref-samjohn.mp4`, = kartu 85) membuat penonton tidak bosan — tiap 3–5 dtk ada yang baru — lewat transisi, SFX, musik, dan tipografi; lalu peta yang sama untuk video kita supaya Sutradara tahu di mana harus menambah.

## KONTEKS
- Irfan: "Jangan lihat dari topik atau durasinya, tapi dari seberapa cepat dia ngomong (video kita TIDAK dipercepat) … yang harus dianalisis: effect transition yang dia pakai, sound effect-nya, background musiknya, dan cara dia menggunakan tipografinya supaya orang nggak bosen dan ngerasa setiap 3-5 detik itu selalu ada yang baru."
- Kartu yang ada: `~/work/skill-development/claude/motion-graphic/pustaka/kartu/85-*.md` (bagian 6 kamera & transisi, 7 SFX, 8 musik masih tipis). Alat: `~/work/skill-development/claude/motion-graphic/scripts/` (lihat `audio/` untuk pace_read/ears/sfx_profile, demucs ada di `~/work/mg-venv`, whisper/ASR yang dipakai proyek di `edit/`).
- Video kita sekarang: `qc/r6/visual_r6.mp4` + audio `out/varian-A_r6-pemulihan.mp4`; suara `audio/stem_suara.wav`, kata `edit/words.json`.

## Yang diukur
A. Referensi (seluruh 82,5 dtk):
 1. Laju bicara: kata/detik (ASR), jeda antar-kalimat (median, p90), ada/tidaknya jeda > 0,3 dtk.
 2. Tabel setiap pergantian visual (scene-detect + mata): waktu, jenis (cut, punch-in, slab warna, glitch, kartu, teks hero, b-roll), pemicu (kata yang diucapkan / ketukan musik), durasi transisi.
 3. "Hal baru" per detik: interval antar-peristiwa baru (visual ATAU teks ATAU SFX); median, p90, interval terpanjang.
 4. SFX: pisahkan stem (demucs: vocals vs other) lalu daftar tiap bunyi non-musik: waktu, jenis (whoosh, hit, riser, klik, glitch, pop, kertas…), terikat ke peristiwa visual apa, level relatif.
 5. Musik: bpm, kunci kasar, genre/rasa, struktur (drop/stop-down/ganti lagu), kapan musik berhenti/berubah dan hubungannya dengan kata kunci; level musik di bawah suara (LU).
 6. Tipografi: jenis per peran (subtitle, hero, neon, ketik), kapan dipakai, berapa lama tampil, ukuran % tinggi frame, masuk/keluar.
B. Video kita (`out/varian-A_r6-pemulihan.mp4`): peta "hal baru" yang sama (poin 3) + daftar rentang ≥ 3 dtk tanpa hal baru (detik, isi frame), dan laju bicara (poin 1).

## FILE BOLEH
BARU: `qc/r7/bedah85/**` (lembar, stem, json), `handoff/BEDAH-85.md` (laporan). UBAH: kartu `~/work/skill-development/claude/motion-graphic/pustaka/kartu/85-*.md` bagian 3, 6, 7, 8 (isi ukuran, tanpa nama/tanggal di teks aturan) — tandai baris yang diubah di laporan.
## FILE JANGAN
Semua file proyek lain (visual, audio, lego, remotion), override pekerja lain.
## LULUS BILA
Tabel A2, A4 lengkap untuk seluruh video; angka A1, A3, A5, B; lembar bukti di `qc/r7/bedah85/`.
## LAPORAN
`handoff/BEDAH-85.md`: ringkasan 10 baris "yang bisa kita tiru (bentuk, bukan warna/topik)" + tabel B (rentang diam video kita + usulan apa yang ditambahkan di situ, dari kosakata referensi).
