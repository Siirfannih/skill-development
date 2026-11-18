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

- **Bentuk penjelas situasi (Lantai D19b):** isi/cara kerja benda → exploded view (benda terurai per lapis, tiap bagian diberi garis label tipis dan nomor; resep acuan `breakdown` di artemnovitckii/claude-animation-skills) atau potongan melintang; perilaku manusia → stick figure/piktogram yang bergerak (`stick-figure`); satu metafora tenang → line-art minimal (`minimalistic-graphics`); angka → `graph`; rute → `map-route`. Gayanya tetap dari kiblat proyek; yang diambil hanya bentuknya.

## Brand dulu, gaya referensi kedua
- Video untuk brand: palet dan gaya ikon dari brand (token di repo produk). Dari referensi ambil struktur, gerak, dan komposisi; warna, emoji 3D, kaca, atau gradien hanya kalau brief menyebutnya.
- Cek: `scripts/palette_check.py render.mp4 --max 1` untuk brand satu aksen.

## Kualitas render
- **Bukan render three.js mentah**. Visual akhir dibangun dengan React/CSS/SVG di Remotion atau AE; three.js hanya untuk plate 3D yang sudah final (material, cahaya, anti-alias) dan lolos still 100 % berdampingan dengan referensi.
- Still per beat dibandingkan dengan frame referensi setara sebelum render penuh.

## Cara memutuskan (alasan dari koreksi Irfan; rujukan menimbang, bukan aturan)
- **Bila frame terasa flat atau b-roll pengisi terlihat seperti aset utama, beri footage "material"**, bukan menambah objek: lapisan film + glow (bloom, halation, halftone, aberasi kromatik dengan blur tepi, hitam terangkat, vignette, grain) membuat footage mundur menjadi tekstur/kenangan, sedangkan teks tajam bercahaya di atasnya jadi fokus dan frame terasa estetik. Takarannya mengikuti peran footage: stok pengisi paling kuat, arsip bermakna sedang (wajah tetap terbaca), pembicara paling ringan (wajah tajam); teks tidak pernah ikut tertutup lapisan itu.
- **Bila latar canvas/kertas gelap dipakai di belakang foto atau teks, pilih bidang rata yang bersih** (butir halus sangat tipis paling banyak), bukan tekstur bercak frekuensi rendah: bercak terang-gelap terbaca "kasar" dan bersaing dengan foto, sementara lapisan film sudah memberi materialnya.
- **Bila tokoh/maskot AI disebut namanya, pilih tokoh itu memperkenalkan diri lewat bubble sapaan yang menggantikan teks nama, dengan reaksi emosi saat bubble muncul.** Label nama di samping tokoh terasa statis; sapaan dari tokoh membuat interaksi hidup dan kata tidak tampil dua kali. Bubble ikut keluarga gaya tokohnya dan cukup besar untuk HP (huruf ±60 px @1080).
- **Bila maskot merek dibuat ulang dalam gaya keluarga tokoh, pilih siluet logo asli dan warna merek aslinya, bukan bentuk turunan.** Penonton mengenali logo dari siluet + warna; bentuk umum (plus/berlian) dengan warna mirip terbaca sebagai tokoh lain.
- **Bila ucapan menunjuk sesuatu di layar ("lihat ini", "comment di bawah") atau satu kata perlu sentuhan personal, pilih panah goresan atau tulisan tangan yang ditulis mengikuti ucapan, di dalam dunia adegan.** Panah membawa mata ke objek yang dirujuk; dipakai hanya di tempat yang maknanya menunjuk, tidak dipaksakan. **Syaratnya goresan itu sekeluarga dengan adegannya**: di tampilan yang netral (UI Instagram abu-putih) tulisan tangan dan panah berwarna jenuh yang ditempel di luar kartu tidak boleh, karena warnanya menabrak tampilan dan terbaca sebagai tempelan. Yang boleh di situ: biarkan tampilan itu sendiri membawa ajakannya (kolom komentar, tombol yang disorot atau didekati kamera), atau goresan dengan warna dari palet adegan dan menempel di dalam dunianya, seperti aksen tulisan tangan pada kartu 65.

- **Bila beberapa tokoh diperkenalkan bersamaan, pilih watak dan kalimat yang berbeda per tokoh, diturunkan dari perannya dalam cerita** (yang paling banyak bekerja boleh bete, yang menemani senang, yang jarang dipakai diam), bukan sapaan dan ekspresi yang sama untuk semua: sapaan seragam terasa template dan tokoh berubah jadi label nama. Yang boleh tetap seragam: gaya gambar dan ukuran bubble, supaya tetap satu keluarga.
- **Bila tokoh digambarkan sedang mengerjakan sesuatu (mengedit, mengetik), pilih tokoh menghadap pekerjaannya dan kamera fokus ke objek kerjanya**, tokoh cukup terlihat sebagian di tepi frame; tokoh yang menatap kamera saat "sedang bekerja" memutus logika adegan (Lantai D22b). Tatap kamera hanya untuk momen menyapa atau bereaksi ke penonton.
- **Bila adegan sudah punya penunjuk arah (garis alir, panah UI, gerak objek), jangan tambah panah goresan kedua ke objek yang sama**: dua penunjuk untuk satu tujuan terbaca dipaksakan. Panah goresan hanya bila tidak ada hal lain di frame yang membawa mata ke sana.
- **Bila adegan memperagakan UI editor video (timeline, preview, monitor), pilih isi preview dan klip di timeline dari video yang sudah jadi** (render final milik sendiri, talking head yang sudah selesai), bukan adegan buatan yang berisi UI atau timeline lagi: penonton membaca layar editor sebagai pekerjaan sungguhan, dan timeline di dalam timeline tidak masuk akal di dunia nyata (Lantai 22b).

## Cek cepat
- Blur still 10 px: ada satu gumpalan yang menang? Dua sama kuat = rapikan.
- Hitung keluarga warna di frame: lebih dari aksen + netral tanpa alasan gaya = kebanyakan.
- Ganti logo dengan merek lain: masih terasa punya identitas? Kalau tidak, tambah motif.

## Bebas diputuskan
Gaya grafik (flat, kolase, foto, 3D), latar gelap/terang, layout, ukuran objek, jumlah ruang kosong. Pilih yang paling cocok dengan isi; tulis alasan satu baris.

## Detail lanjut
`../../references/decision-guide.md` §1, §4, §5 · `direction.md` · `palette.md` (+ `scripts/palette_check.py`)
