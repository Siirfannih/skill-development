# Fase 3.2: audio berlisensi keluar dari git (Q2)
Masalah: 19 berkas audio (Epidemic Sound dan lagu komersial Otis, 40.057.333 byte) ada di git; repo akan dijual dan dipasang orang lain.
Perubahan:
- `git rm` tepat 19 path di `reports/drive-verified-Q2.txt` (sama persis dengan isi `Asset/audio/video-perkenalan-20261118/` di git; sudah diunggah ke Drive dan dicocokkan byte demi byte).
- `Asset/audio/video-perkenalan-20261118/LOKASI.md`: lokasi Drive (`Claude edit/skill-development/backup-20261127/`, path sama), manifest `drive-backup-manifest.tsv`, pemulihan dari tag `pra-bersih`.
- `.gitignore`: mp3/wav/m4a/flac/ogg di bawah `Asset/audio/` tidak bisa ditambahkan lagi.
Penting: berkas-berkas ini MASIH ada di riwayat git (dan di tag `pra-bersih`). Menghapusnya dari riwayat berarti menulis ulang riwayat, yang juga membatalkan tag pemulihan dan commit `basis` yang dibaca `qc/revisi.json`; itu keputusan terpisah milikmu, tidak dilakukan di sini.
Hasil cek: lihat commit; tidak ada berkas aktif yang membaca audio ini (hanya `projects/video-perkenalan-20261118/alat/mix*.py` lewat path absolut `~/work/...`).
Level: Behavior
Persetujuan: ya, jawaban Q2
Cara membatalkan: `git revert` commit ini, atau `git checkout pra-bersih -- Asset/audio/video-perkenalan-20261118`.
