# BEDAH: membedah referensi jadi mekanik, lalu jadi desain baru

Bedah dikerjakan sebelum menulis kartu dan sebelum meracik dari referensi baru. Tujuannya membuat desain baru yang lebih bagus dari mekaniknya, bukan menyalin referensinya. Tiga lapis dikerjakan berurutan; hasilnya satu kartu (`KARTU-TEMPLATE.md`) dan, bila diminta, satu remix ke konten kita.

## Lapis 1 · Learn & deconstruct: kenapa ini bagus
Reverse-engineer anatominya. Jangan berhenti di "warnanya biru, fontnya bold". Cari **3–5 mekanik** yang membuat mata terkunci. Kategori yang sering muncul:
- **Kedalaman & layering taktil (sumbu Z):** objek menyembul keluar wadah, panel solid yang menutupi sebagian benda di belakangnya (frosted/glass dilarang, K2), satu bayangan kontak tajam yang menunjukkan siapa di depan.
- **Micro-tension tipografi:** grotesk geometris dengan tracking rapat (±−0,03 em) dan line-height ketat (±0,95); pil label diputar (±12°) menimpa ujung huruf untuk memecah grid simetris.
- **Kontras suhu warna:** latar dingin bersaturasi tinggi vs objek fokus hangat/netral, sehingga fokus menonjol tanpa memperbesar ukuran.
- **Framing halus:** garis lengkung beropasitas rendah sebagai "rel" yang mengarahkan mata atas → tengah → bawah.

Setiap mekanik ditulis dalam tiga bagian: **apa yang terlihat → kenapa bekerja (persepsi) → angka terukur.**

**Angka diverifikasi dengan alat, bukan mata.** Sampel warna piksel (`PIL.Image.getpixel` di beberapa titik: tepi, tengah, atas), ukur rasio ukuran dan posisi (bbox per elemen dibagi lebar kanvas), lalu catat bila tebakan meleset. Tebakan yang meleset sering mengubah teknik: latar yang dikira polos bisa ternyata bergradien di referensi (di karya kita tetap polos/datar, K2).

```python
from PIL import Image
im = Image.open("ref.png").convert("RGB"); W, H = im.size
for nama, (x, y) in {"tepi": (8, H//2), "atas-tengah": (W//2, 40), "pusat": (W//2, H//2)}.items():
    print(nama, "#%02X%02X%02X" % im.getpixel((x, y)))
```

## Lapis 2 · Adaptasi jadi sistem: bukan copy 1:1
Pecah mekanik jadi token yang bisa dipakai ulang di konten lain:
- **Skala proporsi kanvas:** ukuran tiap elemen sebagai rasio kanvas (contoh 4:5, 1080 × 1350), bukan px mentah.
- **Sistem radius bertingkat yang konsisten:** wadah luar > bibir/tab > kartu (contoh 40 → 28 → 16 px). Radius dalam = radius luar − jarak.
- **Slot konten dinamis:** setiap teks statis diganti variabel (judul, label, angka, gambar) sehingga isi bisa diganti tanpa merusak layout. Tulis panjang maksimum tiap slot.

## Lapis 3 · Arsitektur mekanik kode
Tulis **pohon lapisan z-index** dari belakang ke depan, misalnya:
1. ambient: latar, kurva SVG pengarah mata;
2. tipografi hero + pil melayang;
3. backplate + objek utama (rotasi/translate);
4. wadah depan: panel solid datar bergaris tepi (bukan frosted/`backdrop-filter`, K2), badan, metadata, tombol aksi;
5. footer identitas + bar ikon SVG.

Lalu catat **bagian teknis tersulit dan solusinya**. Contoh: sudut cekung/tab folder tidak bisa dibuat dengan `border-radius`, jadi pakai SVG path Bezier atau `clip-path: path(...)`.

## Keluaran
1. Satu kartu cookbook dengan tiga lapis terisi (`KARTU-TEMPLATE.md`), plus satu baris di `INDEX.md`.
2. Bila diminta, satu remix ke konten kita: tabel "dipertahankan → diganti" beserta alasannya. Remix lolos bila tidak ada satu pun elemen identitas referensi (teks, merek, objek khas, palet persis) yang tersalin, sementara mekaniknya terbaca.
