# Hierarki: mata jatuh di mana, lalu ke mana

**Desain konten bukan UI.** UI butuh struktur seragam dan rapi agar orang bisa bernavigasi; desain konten butuh urutan baca yang jelas, dengan visual sebagai pendukung. Rapi bukan tujuan; jelas yang tujuan.

## Cara
- Tentukan urutan baca 1 → n di BRIEF sebelum menggambar. Elemen 1 biasanya kata kunci, bukan kalimat pengantar.
- Pakai paling banyak 3 level ukuran teks per slide; beda antar level harus terlihat jelas (level kedua ≤ ±50 % level pertama, lihat `../../tokens/skala.tokens.json`).
- Kalimat pengantar boleh kecil di atas; kata kunci besar di tengah; kalimat lanjutan di bawahnya. Posisi vertikal mengikuti urutan baca.
- Uji juling: perkecil slide ke lebar ±300 px atau blur 8–10 px. Yang masih terbaca = hierarki yang sebenarnya.

## Cara memutuskan
- **[HRK-01] Urutan baca render = urutan BRIEF** · kelas P (kandidat H) · cek: sketsa + juri hierarki
  - Pemicu: slide punya ≥ 2 blok teks, atau teks + objek bertanda baca (bubble, label, chip).
  - Anti-pola: blok yang harus dibaca belakangan lebih besar, lebih kontras, atau lebih tinggi posisinya daripada blok yang harus dibaca duluan.
  - Invarian: urutkan blok sesuai BRIEF; bobot (tinggi huruf × kontras) blok ke-n ≤ bobot blok ke-(n−1), atau posisinya di bawah/kanan blok ke-(n−1) bila bobotnya sama; pengecualian butuh penunjuk arah (panah, garis, tali).
  - Karena: pembaca yang mulai dari blok yang salah kehilangan alur kalimat dan langsung menggeser slide.
  - Boleh: hook yang sengaja dibalik ("jawaban dulu, pertanyaan kemudian") bila ditulis di RESEP.
  - Gerbang: juri hierarki + still uji juling di TAHAP.
- **[HRK-02] Satu fokus per slide** · kelas P (kandidat H) · cek: sketsa
  - Pemicu: slide punya > 1 elemen besar atau berwarna kuat (jendela, kartu, karakter, teks raksasa).
  - Anti-pola: beberapa elemen bersaing sama kuat sehingga mata tidak tahu harus mulai dari mana.
  - Invarian: maksimal 2 elemen besar per slide; elemen terbesar atau paling kontras adalah elemen urutan 1 di BRIEF; ≤ 3 level ukuran teks.
  - Karena: tanpa satu titik masuk, slide terbaca sebagai noise walau idenya kuat.
  - Boleh: slide kolase yang memang memamerkan banyak hal, asal satu headline tetap paling dulu terbaca (lihat KMP-01).
  - Gerbang: still uji juling; juri hierarki menghitung level ukuran.
- **[HRK-03] Prinsip UI tidak dipindah mentah ke desain konten** · kelas P · cek: sketsa
  - Pemicu: layout memakai grid kartu seragam, rata kiri semua, atau ukuran teks yang mirip-mirip karena "rapi".
  - Anti-pola: semua elemen sama berat seperti halaman web, sehingga tidak ada kata yang menarik mata.
  - Invarian: setiap slide punya kontras ukuran yang jelas antara elemen 1 dan 2 (rasio ≥ 2 : 1 tinggi huruf), dan komposisi dipilih dari urutan baca, bukan dari grid.
  - Karena: konten di feed bersaing dengan gerakan jempol; struktur seragam membuatnya tenggelam.
  - Boleh: elemen UI sebagai bahan cerita (jendela, toolbar, chat) asal tetap tunduk pada urutan baca.
  - Gerbang: still + rasio ukuran ditulis di RESEP.
