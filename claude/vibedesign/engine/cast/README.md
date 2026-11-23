# Cast: karakter stiker papercut

Tiga karakter orisinal berupa objek di workspace desain. Semuanya digambar 100% dengan SVG di `cast.js`: tanpa gambar raster, sudut tajam, outline putih stiker, drop-shadow halus, dan serat kertas.

| ID | Bentuk | Peran |
|---|---|---|
| `klik` | kursor panah biru | si eksekutor: gerak duluan, gampang panik |
| `note` | sticky note lime dengan selotip | si teknis: kalem, mencatat, kadang pusing |
| `nodi` | anchor pen-tool hitam, dua handle bezier jadi tangan | si idealis: melayang, ekspresif |

## Pakai

```html
<div class="cast" data-cast="klik"
     data-opt='{"eyes":"dot","brow":-16,"look":[3,-4],"arms":[150,60],"sweat":true}'
     style="left:52px;top:522px;width:150px"></div>
```

`cast.js` dimuat setelah slide dan mengisi setiap `[data-cast]`. Lebar elemen menentukan skala, sedangkan tinggi mengikuti rasio viewBox 240:260. Titik pijak kaki ada di y ≈ 236 dari 260. NODI melayang, jadi bagian bawah badannya ada di y ≈ 176.

| Opsi | Nilai |
|---|---|
| `eyes` | `dot` · `wide` · `tiny` · `happy` · `line` · `squeeze` · `dizzy` |
| `brow` | derajat; + marah, − cemas |
| `look` | `[dx, dy]` geser pupil (unit viewBox) |
| `arms` | `[kiri, kanan]` derajat; 0 turun, 90 horizontal keluar, 180 ke atas, negatif ke dalam (NODI: sudut handle) |
| `tilt` | rotasi badan (derajat) |
| `squash` | `[sx, sy]` gepeng/melar dari titik pijak |
| `flip` | `true` = cermin horizontal |
| `sweat` | `true` = tetes keringat |

Lengan digambar di belakang badan, jadi pose "memegang kepala" belum bisa. Kalau perlu pose baru, tambahkan opsi di `cast.js`. Jangan menyalin SVG karakter ke dalam slide.

## Aturan karakter

- Setiap karakter di slide harus punya aksi yang terbaca (menarik, mendorong, menindih, menunjuk). Pose tanpa aksi hanya jadi pajangan.
- **Tidak boleh memakai maskot, logo, atau karakter milik pihak lain.** Ini termasuk tiruan lewat kombinasi bentuk dan warna, misalnya balok berwarna merek dengan mata khasnya, awan dengan simbol terminal, atau bintang empat sudut bergradasi. Karakter baru dirancang orisinal lalu ditambahkan ke file ini.
- Setiap karakter yang dipakai proyek dicatat di `<proyek>/assets/manifest.json` (`karakter[].id`, `sumber`, `izin`). `juri/aset_cek.js` gagal bila ada yang belum tercatat.
