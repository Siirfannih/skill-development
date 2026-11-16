# Audit frame per frame (tanpa sampling)

Sumber: `qc/frames` · 2496 frame · 83.28 dtk · potongan 10 dtk · lembar = 1 detik (6×5 = 30 frame)

Cara periksa (agen LAIN dari yang membangun; satu agen per potongan, paralel): buka SEMUA `s*.jpg` di potongan, baca `INFO.md`,
nilai tiap detik: visual (teks terbaca, tidak terpotong, tidak bertumpuk, keseimbangan), transisi (halus, tanpa frame kosong/kedip),
jarak antar-frame (tidak ada lompatan/patahan di luar potong disengaja, gerak tidak tertahan), audio (cue SFX ada di momen cerita:
jatuh/mendarat/klik/ganti adegan; suara tidak tertutup musik; strip energi), dan cocok dengan kata yang diucapkan.
Tulis `VERDICT.md`: satu baris per masalah `dtk | frame | jenis | apa yang terlihat | usul`, lalu baris terakhir
`PUTUSAN: LULUS` atau `PUTUSAN: GAGAL`. Tanda otomatis hanya penapis: tiap tanda dinilai, bukan disalin.
Baris `HASH:` di VERDICT jangan diubah: verdict hanya berlaku untuk isi potongan itu. Periksa hanya potongan
berstatus `perlu periksa`; bila ada `VERDICT.prev.md`, baca temuan yang sudah diputuskan di ronde sebelumnya.

| Potongan | Frame | Tanda otomatis | Status |
|---|---|---|---|
| `c01_000.0-010.0s` | 0–299 | 0 | dipakai ulang |
| `c02_010.0-020.0s` | 300–599 | 2 | perlu periksa |
| `c03_020.0-030.0s` | 600–899 | 4 | perlu periksa |
| `c04_030.0-040.0s` | 900–1199 | 5 | dipakai ulang |
| `c05_040.0-050.1s` | 1200–1499 | 3 | dipakai ulang |
| `c06_050.1-060.1s` | 1500–1799 | 2 | perlu periksa |
| `c07_060.1-070.1s` | 1800–2099 | 3 | perlu periksa |
| `c08_070.1-080.1s` | 2100–2399 | 5 | perlu periksa |
| `c09_080.1-083.3s` | 2400–2495 | 0 | perlu periksa |

## Hasil pemeriksaan dua model (17 Nov, ronde 4 (potongan berubah; c01/c04/c05 dipakai ulang), blind)
Kesepakatan per detik: 87/88 = 99%; per potongan putusan sama: 8/9. Temuan tanpa frame dibuang: 0.

| Potongan | #1 Codex | #2 Sonnet | Disepakati | Perlu putus | PUTUSAN |
|---|---|---|---|---|---|
| `c01_000.0-010.0s` | LULUS | GAGAL (1, di-DISMISS Sutradara) | 0 | 0 | LULUS |
| `c02_010.0-020.0s` | LULUS | LULUS | 0 | 0 | LULUS |
| `c03_020.0-030.0s` | LULUS | LULUS | 0 | 0 | LULUS |
| `c04_030.0-040.0s` | LULUS | LULUS | 0 | 0 | LULUS |
| `c05_040.0-050.1s` | LULUS | LULUS | 0 | 0 | LULUS |
| `c06_050.1-060.1s` | LULUS | LULUS | 0 | 0 | LULUS |
| `c07_060.1-070.1s` | LULUS | LULUS | 0 | 0 | LULUS |
| `c08_070.1-080.1s` | LULUS | LULUS | 0 | 0 | LULUS |
| `c09_080.1-083.3s` | LULUS | LULUS | 0 | 0 | LULUS |
