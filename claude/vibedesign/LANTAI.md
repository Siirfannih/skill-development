# LANTAI: mutu yang berlaku di semua desain

Lantai menentukan **mutu**; kartu cookbook menentukan **gaya**. Bila kartu bertentangan dengan lantai, lantai menang dan penyesuaiannya ditulis di `RESEP.md`. Lantai tidak berisi font, warna, atau layout tertentu.

Satu baris per ID. Butir baru hanya masuk lewat `../skill-steward/references/placement.md` §6 (salah di gaya apa pun, bisa diukur biner, muncul di ≥ 2 proyek, disetujui Irfan). Cara ukur rinci ada di docstring skrip `juri/`.

- **TKS-01** Teks terbaca: kontras teks–latar ≥ 4,5 : 1 (≥ 3 : 1 untuk teks ≥ 24 px atau ≥ 18,5 px tebal; logo dan teks dekoratif pengisi dikecualikan), tidak ada teks terpotong tepi kanvas atau wadahnya, dan bounding box teks tidak menimpa teks lain. · gerbang: juri teks + kontras
- **KRK-02** Karakter, maskot, logo, ikon merek, dan aset lain bukan milik pihak ketiga, termasuk tiruan yang dikenali lewat kombinasi bentuk + warna + nama; setiap aset tercatat di `assets/manifest.json` dengan sumber dan izin. · gerbang: juri aset
