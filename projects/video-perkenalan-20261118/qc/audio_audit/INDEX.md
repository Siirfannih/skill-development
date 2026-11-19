# Audit frame per frame (tanpa sampling) · fase audio

Sumber: `qc/frames` · 2006 frame · 66.87 dtk · potongan 10 dtk · lembar = 1 detik (6×5 = 30 frame)

Cara periksa (fase AUDIO; visual sudah lulus dan tidak dinilai ulang): prompt `templates/roles/pemeriksa-audio.md`.
Buka `s*.jpg` (strip: biru suara, hijau musik, oranye SFX) dan `INFO.md`; nilai apakah tiap gerak yang terlihat
punya bunyinya di frame itu, dan tidak ada bunyi tanpa gerak.
Satu penilai (Sutradara), tanpa pemeriksa kedua. Tulis `VERDICT.md`: satu baris per masalah
`dtk | frame | apa yang terlihat | solusi | pembanding`, lalu 3 hal paling amatir berperingkat (wajib, juga saat
lulus; "tidak ada temuan" tidak diterima), lalu baris terakhir `PUTUSAN: LULUS` atau `PUTUSAN: GAGAL`.
Tanda otomatis hanya penunjuk: tiap tanda dinilai, bukan disalin.
Baris `HASH:` di VERDICT jangan diubah: verdict hanya berlaku untuk isi potongan itu. Periksa hanya potongan
berstatus `perlu periksa`; bila ada `VERDICT.prev.md`, baca temuan yang sudah diputuskan di ronde sebelumnya.

| Potongan | Frame | Tanda otomatis | Status |
|---|---|---|---|
| `c01_000.0-010.0s` | 0–299 | 4 | perlu periksa |
| `c02_010.0-020.0s` | 300–599 | 0 | perlu periksa |
| `c03_020.0-030.0s` | 600–899 | 3 | perlu periksa |
| `c04_030.0-040.0s` | 900–1199 | 3 | perlu periksa |
| `c05_040.0-050.0s` | 1200–1499 | 1 | perlu periksa |
| `c06_050.0-060.0s` | 1500–1799 | 4 | perlu periksa |
| `c07_060.0-066.9s` | 1800–2005 | 13 | perlu periksa |
