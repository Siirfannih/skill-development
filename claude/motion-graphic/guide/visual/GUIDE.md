# Visual: rapi, tersusun, hierarki terbaca

**Tujuan.** Dalam setengah detik mata tahu: ini yang utama, itu pendukung.

## Bagus itu seperti apa
- 01: layar penuh satu warna + satu objek di tengah + label kecil. Tidak ada yang berebut.
- 04: foto penuh, teks kecil di tengah. Kontras skala (foto besar vs teks kecil) = hierarki tanpa dekorasi.
- 06: kartu putih + banyak ruang kosong; chip babak di bawah sebagai peta, tidak mengganggu.
- 02: maksimalis tetap rapi karena **satu sistem** (semua elemen kolase sejenis, palet stiker tetap).

## Cara (pilih yang cocok)
- Tentukan satu fokus per momen dulu, baru isi pendukung. Pendukung lebih kecil, redup, atau diam.
- Palet: satu keluarga aksen dominan + netral (01, 04, 05, 06). Mau ramai? Pilih gaya maksimalis secara sadar dan konsisten satu sistem (02), tulis di brief.
- Grafik di atas footage: menyatu (warna/cahaya footage) **atau** dunia sendiri layar penuh (01). Jangan setengah-setengah.
- UI = UI asli (05: post IG, lock screen, notes). Bangun ukuran asli, kamera yang zoom.
- Ruang kosong = struktur, bukan sisa.

## Brand dulu, gaya referensi kedua
- Video untuk brand: palet dan gaya ikon dari brand (token di repo produk). Dari referensi ambil struktur, gerak, dan komposisi; warna, emoji 3D, kaca, atau gradien hanya kalau brief menyebutnya (Irfan 7 Nov: "collor Brand video kita adalah White, Biru sebagai icon … kita ga punya permintaan 3d ke semua bagian termasuk efek glasses berwarna biru"; gagal: trojan v4 v2).
- Cek: `scripts/palette_check.py render.mp4 --max 1` untuk brand satu aksen.

- Video brand Jadisatu: ikon 2D, tanpa gradien merah, tanpa latar putih bergradien biru (Irfan 7 Nov).

## Kualitas render
- **Bukan render three.js mentah** (Irfan 7 Nov: "bukan renderan three js mentah seperti sebelum-sebelumnya"). Visual akhir dibangun dengan React/CSS/SVG di Remotion atau AE; three.js hanya untuk plate 3D yang sudah final (material, cahaya, anti-alias) dan lolos still 100 % berdampingan dengan referensi.
- Still per beat dibandingkan dengan frame referensi setara sebelum render penuh.

## Cek cepat
- Blur still 10 px: ada satu gumpalan yang menang? Dua sama kuat = rapikan.
- Hitung keluarga warna di frame: lebih dari aksen + netral tanpa alasan gaya = kebanyakan.
- Ganti logo dengan merek lain: masih terasa punya identitas? Kalau tidak, tambah motif.

## Bebas diputuskan
Gaya grafik (flat, kolase, foto, 3D), latar gelap/terang, layout, ukuran objek, jumlah ruang kosong. Pilih yang paling cocok dengan isi; tulis alasan satu baris.

## Detail lanjut
`../../references/decision-guide.md` §1, §4, §5 · `direction.md` · `palette.md` (+ `scripts/palette_check.py`)
