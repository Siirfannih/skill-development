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
- **[VIS-01] Koreksi posisi dinilai ulang di seluruh frame** · kelas P · cek: still sebelum/sesudah koreksi, di tiap tahap gerak
  - Pemicu: satu elemen dipindah, dibesarkan, atau diganti warnanya karena koreksi.
  - Anti-pola: memperbaiki satu sisi sampai sisi lain terlalu berat, atau mempertahankan blok kecil hanya karena lolos geometri (koordinat aman, dua baris seimbang).
  - Invarian: bedah ulang seluruh frame di zoom 25 % dan 100 % (skala terhadap subjek, hierarki, kedekatan ke fokus, berat sisi berlawanan) dengan garis tengah horizontal dan vertikal sebagai alat diagnosis berat, bukan grid penempatan, dan uji crop lebih dekat bila ruang kosong membuat subjek kecil.
  - Karena: koreksi yang hanya memindahkan masalah ke sisi lain tetap terlihat timpang oleh penonton (Lantai 17).
  - Boleh: aksen atau stroke tipis bila memperbaiki pengenalan huruf dan sesuai arah seni; larangan efek pada satu prototype tidak berlaku global (Lantai 28b).
  - Gerbang: tunjukkan still sebelum dan sesudah berdampingan dan sebut sisi terberat di keduanya; sisi berat berpindah tanpa diseimbangkan = GAGAL.
- **[VIS-10] Maskot merek memakai siluet dan warna logo asli** · kelas P · cek: still pertama tokoh merek
  - Pemicu: logo atau maskot merek dibuat ulang dalam gaya keluarga tokoh.
  - Anti-pola: memakai bentuk turunan umum (plus, berlian) dengan warna yang mirip.
  - Invarian: samakan siluet tokoh dengan siluet logo asli dan warnanya dengan hex merek asli (Lantai 20).
  - Karena: penonton mengenali logo dari siluet dan warna; bentuk umum terbaca sebagai tokoh lain.
  - Boleh: merek tanpa logo (`BRAND.md` logo "tidak ada").
  - Gerbang: tunjukkan logo asli dan tokoh berdampingan; siluet atau hex berbeda = GAGAL.

- **[VIS-02] Adegan lolos uji logika dunia nyata** · kelas P · cek: storyboard per beat, sebelum still
  - Pemicu: beat menggambarkan orang, tokoh, atau alat yang sedang bekerja atau dipakai.
  - Anti-pola: tokoh menatap kamera saat "sedang bekerja", atau layar editor berisi adegan buatan yang memuat UI atau timeline lagi.
  - Invarian: hadapkan tokoh yang bekerja ke pekerjaannya dengan kamera fokus ke objek kerjanya (tokoh cukup terlihat sebagian), ambil isi preview dan klip di UI editor dari video yang sudah jadi, dan pakai tatap kamera hanya untuk momen menyapa atau bereaksi ke penonton.
  - Karena: penonton membaca adegan sebagai kejadian sungguhan, dan yang tidak masuk akal di dunia nyata memutus kepercayaan (Lantai 22b).
  - Boleh: kiasan yang memang dirancang sebagai metafora visual, bukan fakta.
  - Gerbang: kolom "orang sungguhan melakukannya begini?" dijawab per beat di storyboard; tunjukkan frame tiap tokoh yang bekerja.
- **[VIS-03] Satu penunjuk per tujuan** · kelas P · cek: still tiap adegan berpenunjuk
  - Pemicu: ingin menambah panah goresan atau penunjuk ke objek di frame.
  - Anti-pola: menambah panah kedua ke objek yang sudah ditunjuk garis alir, panah UI, atau gerak objek.
  - Invarian: hitung penunjuk yang mengarah ke bbox yang sama; paling banyak 1.
  - Karena: dua penunjuk untuk satu tujuan terbaca dipaksakan.
  - Boleh: penunjuk ke tujuan yang berbeda di frame yang sama.
  - Gerbang: tunjukkan still dan sebut penunjuk per tujuan; lebih dari 1 = GAGAL.

- **[VIS-04] Posisi objek yang menunjuk atau mengisi diukur di still komposit** · kelas P · cek: lembar komposit sebelum aset dikirim
  - Pemicu: objek menunjuk, mengisi, atau menimpa objek lain (centang ke kotak, kursor ke tombol, cap ke kertas, pop-up ke jendela).
  - Anti-pola: memosisikan dari aset yang dirender terpisah, sehingga centang di luar kotak, cap keluar dari kertas, atau target tertutup bingkai.
  - Invarian: ukur bbox target di still komposit dan taruh penunjuknya di dalam bbox itu.
  - Karena: aset yang benar sendiri-sendiri bisa meleset saat ditumpuk, dan penonton langsung melihat centang yang meleset.
  - Boleh: penunjuk yang sengaja meleset sebagai lelucon tertulis.
  - Gerbang: bbox penunjuk tidak berada di dalam bbox target pada still komposit = GAGAL.
- **[VIS-05] Grade dingin tidak menghapus detail bayangan** · kelas P · cek: sesudah grade, sebelum render penuh
  - Pemicu: bayangan footage didorong ke teal/biru, atau gamma dan kurva midtone diturunkan.
  - Anti-pola: menarik kanal merah bayangan ke nol, atau menumpuk gamma < 1, kurva midtone turun, dan vignette kuat.
  - Invarian: angkat kanal hijau-biru di titik hitam alih-alih menurunkan merah, sampai tiap kanal bayangan ≥ 0,012 dan median luma turun ≤ 30 % dari footage asli.
  - Karena: pakaian hitam dan dinding gelap jadi navy pekat tanpa detail, dan ruangan redup tenggelam di layar HP.
  - Boleh: look gelap yang sengaja diminta, dengan frame acuan dari pemilik.
  - Gerbang: `scripts/gate/grade_ukur.py` tanpa KANAL HANCUR dan GELAP, atau tiap temuannya punya alasan tertulis.
- **[VIS-06] Look dinilai sesudah kompresi platform tujuan** · kelas P · cek: sebelum render final
  - Pemicu: footage ruangan redup akan ditonton lewat platform yang mengompres ulang (preview Drive, Instagram).
  - Anti-pola: menambah grain dan mengangkat hitam tinggi-tinggi sehingga noise sensor plus grain buatan berubah jadi blok kompresi.
  - Invarian: encode uji klip di bitrate platform tujuan, nilai di pemutar tujuan pada 100 %, dan pilih grading tanpa grain dengan hitam asli atau warna asli kamera bila blok muncul.
  - Karena: penonton melihat hasil kompresi, bukan master, dan gambar yang pecah terlihat murah.
  - Boleh: grain di footage terang dan bersih bila encode uji tidak memunculkan blok.
  - Gerbang: tunjukkan frame 100 % dari encode uji di bidang gelap; blok kompresi terlihat = GAGAL (`references/grade.md`).

## Cek cepat
- Blur still 10 px: ada satu gumpalan yang menang? Dua sama kuat = rapikan.
- Hitung keluarga warna di frame: lebih dari aksen + netral tanpa alasan gaya = kebanyakan.
- Ganti logo dengan merek lain: masih terasa punya identitas? Kalau tidak, tambah motif.

## Bebas diputuskan
Gaya grafik (flat, kolase, foto, 3D), latar gelap/terang, layout, ukuran objek, jumlah ruang kosong. Pilih yang paling cocok dengan isi; tulis alasan satu baris.

## Detail lanjut
`../../references/decision-guide.md` §1, §4, §5 · `direction.md` · `palette.md` (+ `scripts/palette_check.py`)
