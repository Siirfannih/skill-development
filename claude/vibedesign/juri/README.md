# Juri: gerbang mutu otomatis

Juri adalah skrip yang dijalankan, bukan dokumen yang dibaca. Semuanya membuka proyek lewat engine (Playwright, kanvas 1080 pada skala 1×), lalu mengukur geometri dari DOM (`getClientRects`, `getComputedStyle`) dan piksel latar hasil render. Penilaian rasa (komposisi, gaya) tidak dikerjakan di sini, tapi lewat lembar sanding dan mata.

```bash
node claude/vibedesign/juri/teks_cek.js     --proyek projects/<p>
node claude/vibedesign/juri/kontras_cek.js  --proyek projects/<p>
node claude/vibedesign/juri/hierarki_cek.js --proyek projects/<p>
node claude/vibedesign/juri/aset_cek.js     --proyek projects/<p>
```

Keluar `0` = lulus, `1` = gagal, `2` = argumen salah. Ringkasan dicetak ke stdout, laporan lengkap ditulis ke `<proyek>/qc/<juri>.json`. Butuh `npm install` di `engine/`.

| Juri | GAGAL bila |
|---|---|
| `teks_cek.js` | (1) teks keluar dari tepi kanvas atau terpotong wadah `overflow`; (2) pita tinta dua teks bertumpuk > 8 % dari kotak terkecil (dan > 60 px²), baik di render asli maupun di versi tanpa transform, supaya kotak miring tidak memberi tabrakan palsu; (3) ukuran huruf < 24 px |
| `kontras_cek.js` | Rasio kontras WCAG teks vs median latar di bawah pita tintanya < 4,5:1, atau < 3:1 untuk teks besar (≥ 24 px, atau ≥ 18,5 px dengan berat ≥ 700). Latar diambil dari potret ulang slide dengan semua teks dibuat transparan, sehingga gradien, gambar, dan tekstur ikut terhitung. Opasitas leluhur dikalikan ke warna teks |
| `hierarki_cek.js` | Urutan baca `data-baca` tidak cocok dengan bobot visual. Bobot = Σ ukuran² × jumlah karakter × kontras; urutan ke-n tidak boleh > 1,1× urutan ke-(n−1). Pada `data-baca-pola="cerita"`: urutan harus turun ke bawah dan urutan terakhir (punchline) harus paling menonjol. PERINGATAN (tidak gagal) bila > 3 level ukuran teks atau slide tanpa `data-baca` |
| `aset_cek.js` | Ada `[data-cast]`, `<img>`, `url()` CSS, atau keluarga font yang belum tercatat di `assets/manifest.json`, atau entri manifest tanpa `sumber` / `izin` |

## Anotasi di slide

- `data-baca="1|2|3"`: urutan baca yang dimaksud BRIEF. Boleh dipasang di wadah, karena semua teks di dalamnya ikut dihitung.
- `data-bleed`: kata raksasa yang sengaja terpotong tepi kanvas. Tetap dihitung di kontras dan hierarki, hanya cek "melewati tepi" yang dilewati.
- `data-dekor`: elemen dekoratif yang sengaja redup, kecil, atau terpotong (chrome UI, teks blur, thumbnail, penggaris, ilustrasi "contoh jelek"). Elemen ini tidak dihitung di teks dan kontras. Jangan memberi `data-dekor` pada teks yang memang harus dibaca hanya supaya juri lulus.

Satu kata yang digambar berlapis (isian + outline di dua elemen, teks sama, kotak ≥ 90 % bertumpuk) dihitung sebagai satu teks, supaya tidak dianggap bertabrakan dengan dirinya sendiri dan tidak dihitung dua kali di bobot hierarki.

## Batas yang diketahui

- Bobot hierarki hanya menghitung teks. Panel warna atau objek besar yang menarik mata (misalnya panel biru di belakang judul) belum ikut dihitung, jadi hasil GAGAL di kasus seperti itu perlu dinilai mata lewat lembar sanding.
- Pita tinta dihitung dari metrik font (`measureText`), jadi tumpukan yang sangat tipis bisa lolos atau terdeteksi sedikit berbeda dari mata.
- Teks bergradien (`background-clip:text`) dilaporkan "tidak terukur" di kontras.
- Tabrakan teks↔objek (karakter atau stiker yang menutup teks) belum dicek; lihat lembar sanding.
