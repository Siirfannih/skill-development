# Panduan keputusan: teks, visual, kotak, warna (logika, bukan contoh)

Dibaca saat menulis tabel storyboard (langkah 5 `SKILL.md`) dan saat QA sebelum deliver (langkah 8). Setiap keputusan per beat diambil dengan urutan di bawah, lalu dicatat di tabel beat dengan kolom **mode · alasan · cek**. File ini panduan rasa; urutan otoritas ada di `AGENTS.md` (Urutan otoritas), dan aturan teks per beat (TEKS | VISUAL | MENYATU) di NEGATIF 6 dan `teks.md`. Gerbang DENGAR di `three-segment-gate.md` tidak dikalahkan file ini.

Prinsip dasarnya: penonton HP hanya menangkap **satu hal per momen**. Semua aturan di bawah adalah cara memilih hal itu.

## 1. Mode teks per beat

Tentukan dulu jenis kalimat VO-nya, baru modenya.

| Kalimat VO membawa… | Mode | Logika |
|---|---|---|
| Konsep yang bisa digambar: objek, angka, perbandingan, proses | **Visual saja.** Teks paling banyak berupa label kecil yang menempel ke objek | Gambar dipahami lebih cepat daripada kata. Kata yang sama dengan gambar = dibaca dua kali |
| Satu kata inti: klaim, vonis, istilah baru, angka kunci | **Penekanan.** Footage atau latar bersih, kata besar di barisnya sendiri | Penekanan hanya terasa bila sekitarnya tenang |
| Kata yang punya padanan benda nyata (jam, catatan, tombol, playlist, layar) | **Teks diegetik**: kata ditulis DI objek itu (layar, kertas, tombol, papan) | Kata dan visual jadi satu benda, jadi tidak butuh subtitle |
| Penjelasan, jembatan, ekspresi pembicara | **Footage saja** (mode VISUAL) | Wajah dan suara sudah membawa informasinya |
| Cerita dokumenter dengan banyak foto/footage arsip | **Teks tenang**: kecil, tanpa kotak, kata kunci berbobot lebih tebal, hanya di beat bermode TEKS | Footage adalah pahlawannya; teks cukup jadi penunjuk |
| Fakta yang harus dibaca tepat (nama studi, sumber, harga) | **Label informasi** kecil yang tenang | Ketepatan lebih penting daripada gaya |

**Satu pemenang per momen.** Beat visual dan beat penekanan tidak tampil bersamaan. Bila keduanya perlu, beri urutan: teks dulu, lalu visual menggantikannya (atau sebaliknya), bukan berdampingan dengan bobot sama.

**Teks dan visual tidak mengatakan hal yang sama.** Bila gambar sudah jelas (ponsel grayscale), kata "GRAY" dihapus. Bila gambar lemah atau abstrak, teks yang menang dan gambarnya mundur.

**Teks muncul satu per satu mengikuti VO**, bukan sekaligus. Elemen boleh menumpuk menjadi komposisi asal yang baru masuk selalu menjadi fokus.

### Caption
Tidak ada mode caption terpisah. Teks layar diputuskan per beat (NEGATIF 6); bentuk blok (≤ 2 baris, 1-3 kata, tanda tanya) dan penempatannya ada di `teks.md`. Subtitle di pita bawah tidak dipakai.

## 2. Ukuran dan hierarki teks
- **Satu baris = satu ukuran.** Kata yang dibesarkan pindah ke barisnya sendiri (ditumpuk), maksimal satu kata kunci per frasa, dan harus kata yang membawa makna inti. Alasan: besar-kecil-besar dalam satu baris tanpa alasan membuat baris tidak seimbang.
- Lompatan skala antar level (sambung kecil → kunci besar) terjadi **antar baris atau antar momen**, tidak di dalam baris.
- **Satu sistem huruf (NEGATIF 1).** Satu keluarga utama; penekanan lewat bobot, ukuran, warna, atau kapital. Huruf kedua (serif, script, tulisan tangan) sah bila ia sistem: punya peran tetap (mis. suara logo, kata penutup), frekuensi terbatas (≤ 1 per frame), dan datang dari merek atau REF-SPEC. Alasan: yang jadi tanda slop adalah satu kata "emosional" yang berganti huruf di banyak frasa tanpa peran; dua gaya yang sama kuat tanpa peran membuat mata bingung mana yang utama.

## 3. Posisi teks
- Posisi lahir dari komposisi frame itu: ruang kosong, di belakang subjek (matte), atau menempel objek yang dirujuk.
- Gagal bila 3 frasa berturut-turut ada di pita tinggi yang sama tanpa alasan .
- Teks tidak menutupi wajah atau objek yang sedang dibicarakan.

## 4. Kotak, scrim, dan bayangan
Kotak di belakang teks adalah **alat keterbacaan**, bukan dekorasi.
1. Ukur kontras teks terhadap latar di area teks **selama teks tampil**. Bila ≥ 4,5 : 1 dan latarnya stabil, tanpa kotak.
2. Bila gagal: pindahkan teks ke area tenang, ganti warna teks, atau beri bayangan lembut.
3. Bila masih gagal (latar terlalu terang/gelap/ramai, atau berganti cut di bawah teks): baru pakai kotak atau scrim.
4. Kotak sebagai **gaya** (label, chip) hanya bila ditetapkan di brief sebagai elemen sistem dan dipakai konsisten sepanjang video.

Halo atau glow di belakang teks yang menurunkan kontras (< 4,5 : 1) adalah sidik jari slop, HD atau tidak. Bayangan dan kilau pada benda sah bila satu sistem (satu arah cahaya, satu jenis per benda sejenis) dan ada di REF-SPEC atau beralasan tertulis.

## 5. Grafik di atas footage
Pilih satu dari dua, jangan di tengah-tengah:
- **Menyatu dengan footage:** warna dari footage atau palet, saturasi tidak melebihi footage, ada bayangan/cahaya dan grain yang sama, ukuran proporsional dengan subjek.
- **Dunia sendiri:** layar penuh atau panel tegas dengan latar palet. Footage boleh hilang sesaat.

Gagal: grafik vivid mengambang di atas footage yang di-blur dan digelapkan. Itu yang terasa "tempelan".
Satu keluarga gaya grafik per video: flat, 3D, line, atau foto. Jangan dicampur.

## 6. Warna
Ikuti `warna.md`: palet dipilih di brief, satu keluarga aksen dominan, netral membawa frame.

## 7. Devil's advocate per beat (wajib, dicatat di tabel beat)
1. Kalau elemen ini dihapus, apakah penonton kehilangan informasi? Kalau tidak, hapus.
2. Squint test: blur still 10 px. Gumpalan mana yang menang? Kalau ada dua gumpalan yang sama kuat, gagal.
3. Apakah teks dan visual mengatakan hal yang sama? Kalau ya, buang salah satu.
4. Kotak, blur, atau efek ini menyelesaikan masalah apa? Kalau tidak bisa disebut, hapus.
5. Warna di beat ini ada di palet terpilih? Kalau tidak, ganti.

Panduan rasa ini sengaja diberi cek supaya tidak kalah oleh aturan yang terukur (cakupan kata, safe zone).
