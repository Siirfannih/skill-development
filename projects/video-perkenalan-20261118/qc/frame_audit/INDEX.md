# Audit frame per frame (tanpa sampling) · fase visual

Sumber: `qc/frames` · 2006 frame · 66.87 dtk · potongan 10 dtk · lembar = 1 detik (6×5 = 30 frame)

Cara menilai (fase VISUAL, gambar saja): `templates/roles/pemeriksa-frame.md`.
Kalibrasi dulu: nilai satu entri `pustaka/contoh-gagal/` dan satu frame kunci kiblat tanpa membaca keterangannya;
penilai yang tidak menemukan kesalahan contoh gagal belum boleh menulis LULUS.
Lalu buka frame kunci kartu kiblat, `RESEP.md`, dan `pustaka/contoh-gagal/` sebagai pembanding.
`SELURUH.jpg` (1 fps seluruh video) → video sebagai satu karya: keluarga gaya, skala antarperan, ritme, kata ganda.
Masalah lintas adegan ditulis di sini dan dimiliki Sutradara.
`tahan/*.jpg` (ukuran besar, satu per detik) → gaya, posisi teks dan objek, keterbacaan, estetika.
`s*.jpg` (30 frame kecil per detik) → gerak, transisi, jarak antar-frame saja.
Satu penilai (Sutradara), tanpa pemeriksa kedua. Tulis `VERDICT.md`: satu baris per masalah
`dtk | frame | apa yang terlihat | solusi | pembanding`, lalu 3 hal paling amatir berperingkat (wajib, juga saat
lulus; "tidak ada temuan" tidak diterima), lalu baris terakhir `PUTUSAN: LULUS` atau `PUTUSAN: GAGAL`.
Tanda otomatis hanya penunjuk: tiap tanda dinilai, bukan disalin.
Baris `HASH:` di VERDICT jangan diubah: verdict hanya berlaku untuk isi potongan itu. Periksa hanya potongan
berstatus `perlu periksa`; bila ada `VERDICT.prev.md`, baca temuan yang sudah diputuskan di ronde sebelumnya.

| Potongan | Frame | Tanda otomatis | Status |
|---|---|---|---|
| `c01_000.0-010.0s` | 0–299 | 1 | perlu periksa |
| `c02_010.0-020.0s` | 300–599 | 0 | perlu periksa |
| `c03_020.0-030.0s` | 600–899 | 0 | perlu periksa |
| `c04_030.0-040.0s` | 900–1199 | 0 | perlu periksa |
| `c05_040.0-050.0s` | 1200–1499 | 0 | perlu periksa |
| `c06_050.0-060.0s` | 1500–1799 | 1 | perlu periksa |
| `c07_060.0-066.9s` | 1800–2005 | 9 | perlu periksa |
