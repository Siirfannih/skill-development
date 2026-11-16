# Audit frame per frame (tanpa sampling)

Sumber: `qc/frames` · 2739 frame · 91.30 dtk · potongan 10 dtk · lembar = 1 detik (6×5 = 30 frame)

Cara periksa (agen LAIN dari yang membangun; satu agen per potongan, paralel): buka SEMUA `s*.jpg` di potongan, baca `INFO.md`,
nilai tiap detik: visual (teks terbaca, tidak terpotong, tidak bertumpuk, keseimbangan), transisi (halus, tanpa frame kosong/kedip),
jarak antar-frame (tidak ada lompatan/patahan di luar potong disengaja, gerak tidak tertahan), audio (cue SFX ada di momen cerita:
jatuh/mendarat/klik/ganti adegan; suara tidak tertutup musik; strip energi), dan cocok dengan kata yang diucapkan.
Tulis `VERDICT.md`: satu baris per masalah `dtk | frame | jenis | apa yang terlihat | usul`, lalu baris terakhir
`PUTUSAN: LULUS` atau `PUTUSAN: GAGAL`. Tanda otomatis hanya penapis: tiap tanda dinilai, bukan disalin.

| Potongan | Frame | Tanda otomatis |
|---|---|---|
| `c01_000.0-010.0s` | 0–299 | 12 |
| `c02_010.0-020.0s` | 300–599 | 4 |
| `c03_020.0-030.0s` | 600–899 | 1 |
| `c04_030.0-040.0s` | 900–1199 | 6 |
| `c05_040.0-050.0s` | 1200–1499 | 3 |
| `c06_050.0-060.0s` | 1500–1799 | 11 |
| `c07_060.0-070.0s` | 1800–2099 | 3 |
| `c08_070.0-080.0s` | 2100–2399 | 2 |
| `c09_080.0-090.0s` | 2400–2699 | 5 |
| `c10_090.0-091.3s` | 2700–2738 | 0 |
