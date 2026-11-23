# tokens: nilai netral-gaya (format W3C DTCG)

Hanya nilai yang berlaku lintas proyek: ukuran kanvas, zona aman, skala export, dan rasio skala huruf/spasi. Warna, font, dan nilai merek tidak di sini; tempatnya `DESIGN.md` proyek (`../templates/merek/DESIGN.md`).

Format: `*.tokens.json`, setiap token punya `$value` dan `$type`, keterangan di `$description`, alias ditulis `{grup.token}`. Bisa diubah ke CSS variables dengan Style Dictionary.

| File | Isi |
|---|---|
| `canvas.tokens.json` | ukuran kanvas per format, zona aman, skala export |
| `skala.tokens.json` | rasio ukuran teks terhadap elemen fokus + jarak dalam kelompok |

Angka rasio di `skala.tokens.json` adalah titik awal (kelas P), bukan hukum.
