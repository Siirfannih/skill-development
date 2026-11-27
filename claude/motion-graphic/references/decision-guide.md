# Panduan keputusan: teks, visual, kotak, teknik, dan kapan bertanya

Dibaca saat menulis tabel storyboard (langkah 5 `SKILL.md`), saat memilih di antara opsi, saat aturan terasa bentrok, saat ragu perlu bertanya, dan saat QA (langkah 8). Keputusan per beat dicatat di tabel beat: **mode · alasan · cek**. Urutan otoritas: `SKILL.md`, `AGENTS.md`; mode teks per beat: NEGATIF 6 dan `teks.md`. Gerbang DENGAR di `three-segment-gate.md` tidak dikalahkan file ini.

Prinsip dasarnya: penonton HP hanya menangkap **satu hal per momen**. Semua di bawah adalah cara memilih hal itu.

## 1. Mode teks per beat

Tentukan dulu jenis kalimat VO-nya, baru modenya.

| Kalimat VO membawa… | Mode | Logika |
|---|---|---|
| Konsep yang bisa digambar: objek, angka, perbandingan, proses | **Visual saja.** Teks paling banyak label kecil yang menempel ke objek | Gambar dipahami lebih cepat daripada kata; kata yang sama dengan gambar dibaca dua kali |
| Satu kata inti: klaim, vonis, istilah baru, angka kunci | **Penekanan.** Footage atau latar bersih, kata besar di barisnya sendiri | Penekanan hanya terasa bila sekitarnya tenang |
| Kata yang punya padanan benda nyata (jam, catatan, tombol, layar) | **Teks diegetik**: kata ditulis DI objek itu | Kata dan visual jadi satu benda, tanpa subtitle |
| Penjelasan, jembatan, ekspresi pembicara | **Footage saja** (VISUAL) | Wajah dan suara sudah membawa informasinya |
| Cerita dokumenter dengan banyak foto/arsip | **Teks tenang**: kecil, tanpa kotak, kata kunci lebih tebal, hanya di beat TEKS | Footage pahlawannya; teks cukup penunjuk |
| Fakta yang harus dibaca tepat (nama studi, sumber, harga) | **Label informasi** kecil yang tenang | Ketepatan lebih penting daripada gaya |

**Satu pemenang per momen.** Beat visual dan beat penekanan tidak tampil bersamaan dengan bobot sama; bila keduanya perlu, beri urutan (teks dulu lalu visual menggantikannya, atau sebaliknya).

**Teks dan visual tidak mengatakan hal yang sama.** Gambar sudah jelas (ponsel grayscale): kata "GRAY" dihapus. Gambar lemah atau abstrak: teks yang menang, gambarnya mundur.

**Teks muncul satu per satu mengikuti VO.** Elemen boleh menumpuk menjadi komposisi asal yang baru masuk selalu jadi fokus. Tidak ada mode caption atau subtitle pita bawah terpisah; bentuk blok dan penempatan di `teks.md`.

## 2. Ukuran dan hierarki teks
Di `teks.md` (§Huruf, §Ukuran dan bentuk blok). Intinya untuk keputusan: maksimal satu kata kunci per frasa, dan itu kata yang membawa makna inti; lompatan skala terjadi antar baris atau antar momen, tidak di dalam baris.

## 3. Posisi teks
Di `teks.md` §Posisi: posisi lahir dari komposisi frame (ruang kosong, di belakang subjek, menempel objek), tidak menutupi wajah atau objek yang dibicarakan.

## 4. Kotak, scrim, dan bayangan
Kotak di belakang teks adalah **alat keterbacaan**, bukan dekorasi.
1. Ukur kontras teks terhadap latar di area teks **selama teks tampil** (angka di `teks.md` §Keterbacaan). Lolos dan latarnya stabil: tanpa kotak.
2. Gagal: pindahkan teks ke area tenang, ganti warna teks, atau beri bayangan lembut.
3. Masih gagal (latar terlalu terang/gelap/ramai, atau cut berganti di bawah teks): baru kotak atau scrim.
4. Kotak sebagai **gaya** (label, chip) hanya bila ditetapkan di brief sebagai elemen sistem dan dipakai konsisten.

Halo atau glow di belakang teks yang menurunkan kontras adalah sidik jari slop. Bayangan dan kilau pada benda sah bila satu sistem (satu arah cahaya, satu jenis per benda sejenis) dan ada di REF-SPEC atau beralasan tertulis.

## 5. Grafik di atas footage
Pilih satu, jangan di tengah-tengah:
- **Menyatu dengan footage:** warna dari footage atau palet, saturasi tidak melebihi footage, bayangan/cahaya dan grain yang sama, ukuran proporsional dengan subjek.
- **Dunia sendiri:** layar penuh atau panel tegas dengan latar palet; footage boleh hilang sesaat.

Yang terasa "tempelan": grafik vivid mengambang di atas footage yang di-blur dan digelapkan. Satu keluarga gaya grafik per video (flat, 3D, line, atau foto).

## 6. Warna
Ikuti `warna.md`: palet dikunci sebelum desain, satu keluarga aksen dominan, netral membawa frame.

## 7. Devil's advocate per beat (dicatat di tabel beat)
1. Kalau elemen ini dihapus, apakah penonton kehilangan informasi? Kalau tidak, hapus.
2. Squint test: blur still 10 px. Dua gumpalan sama kuat = belum ada pemenang.
3. Teks dan visual mengatakan hal yang sama? Buang salah satu.
4. Kotak, blur, atau efek ini menyelesaikan masalah apa? Tidak bisa disebut: hapus.
5. Warna di beat ini ada di palet terpilih? Kalau tidak, ganti.

## 8. Memilih teknik dan keluarga visual
- Dunia visual datang dari referensi atau brief user. Tanpa itu, `direction.md` §5 memberi satu contoh profil merek (Jadisatu, tiga keluarga), bukan peta babak ke keluarga. Pindah dunia di tengah video adalah momen cerita: transisi babak dan engsel sunyi (`audio.md` §14.4).
- Teks: tentukan **peran** dulu, baru tekniknya; peran yang sama bergerak sama di seluruh video (`teks.md` §Gerak teks per peran).
- Transisi: tanya dulu "benda apa dari shot A yang bisa dibawa ke shot B?". Ada: X01 (object carry). Tidak ada: transisi yang arahnya cocok dengan cerita (`kamera-gerak.md` §Transitions).
- Tulis alasan pilihan dalam satu frasa di spec beat; pilihan tanpa alasan adalah tanda template.
- Aturan bentrok (sesudah arahan user dan `SKILL.md`): cerita (`direction.md` §6) di atas mutu setara referensi, di atas variasi dan ritme. Teknik yang tak cocok dengan cerita diganti teknik lain yang setara mutunya, bukan eksekusi lebih kasar atau fokus kedua demi kuota variasi.
- Dari proyek lama dibawa cara kerja (urutan gerbang, cara ukur referensi, QA, alat terbukti, catatan kesalahan), bukan isinya: palet, huruf, gaya teks, tokoh, kit SFX, gaya musik, struktur babak, storyboard hanya bila user minta. Template lama membuat karya baru terasa salinan; aturan lama yang tampak relevan diajukan sebagai opsi dengan alasannya.

## 9. Siapa memutuskan dan kapan bertanya
| Keputusan | Pemilik | Cara |
|---|---|---|
| Tujuan, pesan, CTA, naskah final, storyboard final | user | gerbang persetujuan; tunggu kata "final" |
| Keluarga, gaya teks, teknik T/C/X, SFX, timing | agen | putuskan sendiri dengan alasan tertulis di spec beat |
| Simpangan dari storyboard yang disetujui | agen, lalu dilaporkan | daftar simpangan saat kirim |
| Generate berbayar (VO, SFX generatif, musik, gambar/video AI) | agen setelah gerbangnya terbuka | sebut perkiraan biaya sebelum generate |
| Aturan baru di skill ini | user | usul di `steward/inbox/` (`claude/skill-steward`), lalu ya dari user |

- Yang tertulis di rencana yang disetujui dianggap disetujui: kerjakan sampai selesai, nilai fase sendiri, jangan kirim versi setengah jadi.
- Biaya: nol generate berbayar sebelum gerbangnya (VO sesudah naskah final; musik dan SFX sesudah storyboard final). Generate 1–2 variasi, bukan 4, kecuali diminta, dan per segmen supaya segmen lemah bisa diulang sendiri. Kegagalan yang dicegah: VO digenerate 3 kali (±7.300 kredit) sebelum naskah final.
- Bertanya (cara: `SKILL.md` Sebelum mulai): setelah file proyek, brief, dan memori dicek; juga di tengah kerja bila yakin rendah, jangan menebak. Referensi belum pasti: tulis "yang aku tangkap dari referensi ini adalah…" sebelum lanjut. UI produk tak bisa diakses: minta screenshot **sebelum** storyboard. Pilihan teknis: putuskan sendiri dengan alasan. Tenggat bukan alasan melewati gerbang naskah dan storyboard.
