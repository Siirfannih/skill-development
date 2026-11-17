# Audit frame per frame (tanpa sampling)

Sumber: `qc/frames` · 2512 frame · 83.82 dtk · potongan 10 dtk · lembar = 1 detik (6×5 = 30 frame)

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
| `c01_000.0-010.0s` | 0–299 | 5 | perlu periksa |
| `c02_010.0-020.0s` | 300–599 | 3 | perlu periksa |
| `c03_020.0-030.0s` | 600–899 | 1 | perlu periksa |
| `c04_030.0-040.0s` | 900–1199 | 5 | dipakai ulang |
| `c05_040.0-050.1s` | 1200–1499 | 10 | dipakai ulang |
| `c06_050.1-060.1s` | 1500–1799 | 4 | perlu periksa |
| `c07_060.1-070.1s` | 1800–2099 | 3 | perlu periksa |
| `c08_070.1-080.1s` | 2100–2399 | 4 | perlu periksa |
| `c09_080.1-083.8s` | 2400–2511 | 2 | perlu periksa |
