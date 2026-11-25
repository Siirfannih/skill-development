# Phase 0 · Bedah Referensi 5 Lapis (protokol anti-slop)

Wajib dijalankan setiap kali user membawa referensi (video, gambar, link), **sebelum** storyboard dibuat atau di-upgrade. Tujuannya: yang dipindahkan dari referensi adalah **alasan dan mekanismenya**, bukan kulitnya. Hasilnya diisi ke `REFERENCE-BRIEF.md` di folder proyek (templat di bawah); storyboard belum boleh disentuh sebelum brief ini terisi.

Sebelum mulai, petakan **peran tiap referensi**: apa yang dipelajari dari masing-masing (misal satu untuk arsitektur UI dan alur cerita, satu untuk energi pacing dan materialitas). Referensi yang digabung tanpa peran akan saling bertabrakan (*style bleeding*). Kemiripan palet dengan merek user adalah alasan untuk lebih waspada menyalin kulitnya, bukan alasan menjadikannya kiblat utama.

Bukti tetap wajib: contact sheet + timestamp untuk setiap klaim (lihat sendiri, jangan menebak dari nama file).

## Lapis 1 · State machine naratif (alasan di balik warna dan latar)

Dilarang hanya mencatat "latar biru / putih / gelap". Petakan **kapan dan kenapa** suasana visual berubah:
- **Pemicu emosi/babak**: misal gelap + aura pekat hanya dipakai di babak masalah/hambatan; begitu masuk babak solusi, latar *state flip* ke terang dengan aura lembut.
- **Aturan untuk video baru**: latar hanya boleh berganti saat argumen berpindah (Masalah → Titik balik → Solusi → Bukti nyata), **bukan selang-seling tiap slide**.

## Lapis 2 · Audit fungsi objek: mekanisme vs properti permukaan

Untuk setiap objek menonjol di referensi (bola, garis vektor, kartu kaca, kursor, tekstur kertas), jawab satu pertanyaan uji: **"Kalau objek ini dihapus, apakah alur cerita atau transisinya putus?"**
- **Mekanisme (wajib diekstrak)**: cara objek itu bekerja. Contoh: garis yang menuntun kamera dari satu tahap ke tahap berikutnya, toggle yang mengubah keadaan sebelum-sesudah, split-screen aksi-reaksi.
- **Properti permukaan (wajib diblokir)**: bentuk spesifiknya, misal bola glossy, peta titik berwarna, garis gelombang simetris, ikon timbangan/radar generik. Masukkan ke daftar hitam agar tidak terbawa ke video baru.

## Lapis 3 · Kontrak dominasi per frame

Klasifikasikan setiap shot referensi (dan nanti setiap frame video baru) ke **satu** mode fokus, supaya tidak pernah ada frame setengah teks setengah ikon:
- **TYPO_HERO**: tipografi kinetik adalah 100 % visualnya (skala, kontras bobot/italic, mask reveal, word rise). Nol ilustrasi tambahan.
- **UI_PROOF**: antarmuka/produk/data nyata jadi fokus penuh, dipandu kursor atau macro zoom-in. Teks hanya bagian organik dari UI atau label mikro.
- **SYSTEM_FLOW**: hubungan antar-elemen (node, kartu yang bertransformasi, toggle) jadi panggung utama, tanpa teks panjang terpisah di sudut layar.

## Lapis 4 · Rantai sebab-akibat kamera dan transisi

Bukan mencatat "cut, zoom in, fade in", tetapi bagaimana akhir shot A secara fisik melahirkan shot B:
- **Elemen jangkar** apa yang bertahan melintasi potongan? (tombol yang diklik membesar jadi kanvas baru; gerak garis ke kanan memicu pan kamera).
- **Rasio hold vs motion burst**: berapa lama diam agar mata bisa membaca, dibanding ledakan gerak cepat (6–12 frame).

## Lapis 5 · Peta upgrade ke storyboard asal (tanpa dekorasi palsu)

Jembatan antara hasil bedah dan storyboard yang sudah ada. Sebelum menggambar ulang, petakan setiap beat ke satu strategi upgrade konkret:
- **Beat abstrak/emosional** → upgrade lewat tipografi kinetik dan state shift, bukan menempelkan ikon radar atau bola.
- **Beat sistem/proses** → upgrade lewat UI nyata, progressive staging, atau node flow yang terhubung dengan kamera, bukan lingkaran di garis miring atau kartu dummy berisi garis placeholder.

## Templat `REFERENCE-BRIEF.md` (wajib diisi sebelum storyboard)

```markdown
# REFERENCE DECONSTRUCTION BRIEF

## 0. Peran tiap referensi
- [referensi]: dipelajari untuk ... · tidak dipakai untuk ...
- Aturan resolusi konflik: [kapan mekanik referensi A dipakai, kapan referensi B]

## 1. Narrative State Machine (kapan & kenapa latar berubah)
- State A (Problem/Tension): [palet, pencahayaan, tekstur, pemicu naratif]
- State B (Solution/Clarity): [palet, pencahayaan, tekstur, pemicu naratif]
- State C (Proof/Tactile): [palet, pencahayaan, tekstur, pemicu naratif]
- Aturan transisi antar-state: [kapan state flip terjadi; bukan selang-seling acak]

## 2. Mechanism vs. Forbidden Surface Props
- Mekanik yang diambil (abstrak):
  1. [nama mekanik, misal Line-as-Camera-Lead / Cursor Punch-In / Toggle Before-After]
     - Fungsi naratif: ...
     - Timing & kamera (dengan timestamp bukti): ...
- Surface props yang DILARANG disalin (anti-slop list):
  - [misal bola glossy, garis gelombang simetris, peta titik, ikon generik]

## 3. Dominance Contract & Upgrade Mapping (storyboard lama → baru)
Untuk setiap scene:
- Scene / VO: ...
- Mode fokus (pilih SATU): [TYPO_HERO | UI_PROOF | SYSTEM_FLOW]
- Masalah di storyboard awal: [kenapa masih polos/statis]
- Strategi upgrade (tanpa dekorasi): [tipografi kinetik / UI nyata / transisi kamera]
- Causality link ke scene berikutnya: [elemen apa yang menggerakkan kamera/transisi keluar]
```

Setelah brief terisi: buat 3 style frame kunci (still dari kode yang sama dengan render) untuk mengunci komposisi, keterbacaan, dan ruang negatif, baru storyboard penuh.
