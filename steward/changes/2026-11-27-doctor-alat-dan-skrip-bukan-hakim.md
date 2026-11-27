# Doctor memeriksa alat; skrip ukur jadi informasi

Tanggal: 27 Nov 2026. Tingkat: berisiko (menyentuh skrip gerbang; pemilik: "Ya lanjutkan").

## Kata pemilik

Skill-development memaksa persiapan (alat terpasang, workflow dipahami) dan meminimalkan kesalahan yang dikenal; penilaian hasil kreatif ada di model dan user, bukan skrip. Analisis video = dengar audio, bedah frame visual, bedah frame gerak, transkrip; satu tidak terlaksana berarti analisis gagal.

## Perubahan

- `tools/doctor.sh` ditulis ulang. Bagian Codex dihapus. Memeriksa: render frame (Playwright + Chromium), pemecah video (ffmpeg), analisa gerak, dengar (earshot), transkrip (Whisper), Remotion (Node), lalu alat tambahan. Menulis `~/.config/skill-development/alat.md` (alat, status, cara pakai) supaya sesi berikutnya cukup membaca file itu. Cek pemeliharaan repo pindah ke `--repo`.
- `AGENTS.md`: baris Kerja menunjuk `alat.md`; invarian 4 menyebut skrip ukur sebagai indera, bukan hakim.
- `bedah-referensi.md` dan `SKILL.md` langkah 1: definisi analisis video empat bagian.
- `scripts/juri/render.sh final`: butir GAGAL dicetak sebagai informasi dan render dilanjutkan; `KETAT=1` mengembalikan penolakan.
- `SKILL.md`, `storyboard.md`, `dunia-visual.md`: kata "hijau/PASS" sebagai syarat diganti "lihat, perbaiki atau tulis alasan".
- Tes disesuaikan: `test_gerbang_produksi.py` (penolakan hanya bila KETAT), `test_audit_dokumen.py` tetap.

## Tidak diubah

Kode keluar tiap skrip (`banding.py`, `negatif_cek.py`, `board.py`, `scripts/gate/*`) masih 1 saat ada temuan; yang berubah cara dokumen dan `render.sh` memperlakukannya. Penolakan langsung di `render.sh` untuk urutan audio, revisi, dan Python audio masih ada. `sync.sh` masih memasang ke Codex.

## Belum dibuktikan

Tidak ada video atau storyboard yang dijalankan dengan aturan ini. `doctor.sh` baru dijalankan di satu mesin (semua alat ada), jadi cabang KURANG belum teruji pada mesin kosong.
