# Panduan keputusan: teks, visual, kotak, warna (logika, bukan contoh)

Dibaca di gerbang storyboard (4) dan QA (9). Setiap keputusan per beat diambil dengan urutan di bawah, lalu dicatat di tabel beat dengan kolom **mode · alasan · cek**. Untuk keputusan teks dan visual, file ini menang atas `three-segment-gate.md` dan `typography.md` bila bertentangan; gerbang DENGAR (audio) di `three-segment-gate.md` tetap wajib dan tidak dikalahkan file ini, dan atas `canvas-skill-library` yang hanya data referensi (Irfan 6 Nov).

Prinsip dasarnya: penonton HP hanya menangkap **satu hal per momen**. Semua aturan di bawah adalah cara memilih hal itu.

## 1. Mode teks per beat

Tentukan dulu jenis kalimat VO-nya, baru modenya.

| Kalimat VO membawa… | Mode | Logika |
|---|---|---|
| Konsep yang bisa digambar: objek, angka, perbandingan, proses | **Visual saja.** Teks paling banyak berupa label kecil yang menempel ke objek | Gambar dipahami lebih cepat daripada kata. Kata yang sama dengan gambar = dibaca dua kali |
| Satu kata inti: klaim, vonis, istilah baru, angka kunci | **Penekanan.** Footage atau latar bersih, kata besar di barisnya sendiri | Penekanan hanya terasa bila sekitarnya tenang |
| Kata yang punya padanan benda nyata (jam, catatan, tombol, playlist, layar) | **Teks diegetik**: kata ditulis DI objek itu (layar, kertas, tombol, papan) | Kata dan visual jadi satu benda, jadi tidak butuh subtitle |
| Penjelasan, jembatan, ekspresi pembicara | **Footage saja** (+ caption bila mode caption nyala) | Wajah dan suara sudah membawa informasinya |
| Cerita dokumenter dengan banyak foto/footage arsip | **Caption tenang**: kecil, tengah, tanpa kotak, kata kunci berbobot lebih tebal | Footage adalah pahlawannya; teks cukup jadi penunjuk |
| Fakta yang harus dibaca tepat (nama studi, sumber, harga) | **Label informasi** kecil yang tenang | Ketepatan lebih penting daripada gaya |

**Satu pemenang per momen.** Beat visual dan beat penekanan tidak tampil bersamaan. Bila keduanya perlu, beri urutan: teks dulu, lalu visual menggantikannya (atau sebaliknya), bukan berdampingan dengan bobot sama.

**Teks dan visual tidak mengatakan hal yang sama.** Bila gambar sudah jelas (ponsel grayscale), kata "GRAY" dihapus. Bila gambar lemah atau abstrak, teks yang menang dan gambarnya mundur.

**Teks muncul satu per satu mengikuti VO**, bukan sekaligus. Elemen boleh menumpuk menjadi komposisi asal yang baru masuk selalu menjadi fokus (Irfan 6 Nov: arti "1 teks + 1 subjek").

### Caption: diputuskan per video, bukan per beat
- **Nyala** bila: video ditonton di feed tanpa suara, formatnya wawancara/pembicara, atau penonton bukan penutur bahasa VO.
- **Mati** bila: VO narator dan setiap beat sudah punya visual, penekanan, atau teks diegetik.
- Bila nyala:
  - **≤ 2 baris**: boleh 4 kata atau lebih per tampil asal tidak lebih dari 2 baris sekaligus, tidak ada kata yatim, tidak terpotong tepi; klausa yang lebih panjang dipecah jadi caption berurutan (aturan 44, Irfan 9 Nov, Behindwork);
  - per klausa 2–5 kata, tidak per kata dan tidak memotong kata;
  - posisinya tetap selama satu shot, boleh pindah antar shot ke area tenang;
  - menghilang saat beat visual atau penekanan;
  - bobotnya selalu lebih ringan daripada visual dan penekanan (kecil, putih, tanpa warna aksen kecuali satu kata).
- Alasan: caption yang bobotnya sama dengan grafik membuat keduanya berebut, dan teks terbaca sebagai subtitle.

## 2. Ukuran dan hierarki teks
- **Satu baris = satu ukuran.** Kata yang dibesarkan pindah ke barisnya sendiri (ditumpuk), maksimal satu kata kunci per frasa, dan harus kata yang membawa makna inti. Alasan: besar-kecil-besar dalam satu baris tanpa alasan membuat baris tidak seimbang (Irfan 6 Nov, "Aku mau makan").
- Lompatan skala antar level (sambung kecil → kunci besar) terjadi **antar baris atau antar momen**, tidak di dalam baris.
- **Serif tidak sejajar dengan bold.** Dalam satu frasa, serif tidak boleh seukuran dan sebobot kata bold. Serif boleh sebagai penekanan (satu kata, kontras jelas) atau penutup; serif italic kecil juga boleh untuk kata sambung bila kata kuncinya sans bold. Alasan: dua gaya yang sama kuat membuat mata bingung mana yang utama (Irfan 6 Nov).

## 3. Posisi teks
- Posisi lahir dari komposisi frame itu: ruang kosong, di belakang subjek (matte), atau menempel objek yang dirujuk.
- Gagal bila 3 frasa berturut-turut ada di pita tinggi yang sama tanpa alasan (kecuali mode caption).
- Teks tidak menutupi wajah atau objek yang sedang dibicarakan.

## 4. Kotak, scrim, dan glow
Kotak di belakang teks adalah **alat keterbacaan**, bukan dekorasi (Irfan 6 Nov).
1. Ukur kontras teks terhadap latar di area teks **selama teks tampil**. Bila ≥ 4,5 : 1 dan latarnya stabil, tanpa kotak.
2. Bila gagal: pindahkan teks ke area tenang, ganti warna teks, atau beri bayangan lembut.
3. Bila masih gagal (latar terlalu terang/gelap/ramai, atau berganti cut di bawah teks): baru pakai kotak atau scrim.
4. Kotak sebagai **gaya** (label, chip) hanya bila ditetapkan di brief sebagai elemen sistem dan dipakai konsisten sepanjang video.

Glow boleh. Syaratnya HD: dibuat di compositing (AE, CSS, shader resolusi penuh), bukan bloom three.js yang hasilnya banding/8-bit. Warna glow mengikuti hue aksen. Cek still 100 % (Irfan 6 Nov).

## 5. Grafik di atas footage
Pilih satu dari dua, jangan di tengah-tengah:
- **Menyatu dengan footage:** warna dari footage atau palet, saturasi tidak melebihi footage, ada bayangan/cahaya dan grain yang sama, ukuran proporsional dengan subjek.
- **Dunia sendiri:** layar penuh atau panel tegas dengan latar palet. Footage boleh hilang sesaat.

Dilarang: grafik vivid mengambang di atas footage yang di-blur dan digelapkan. Itu yang terasa "tempelan".
Satu keluarga gaya grafik per video: flat, 3D, line, atau foto. Jangan dicampur.

## 6. Warna
Ikuti `palette.md`: palet dipilih di brief, satu keluarga aksen dominan, netral membawa frame.

## 7. Devil's advocate per beat (wajib, dicatat di tabel beat)
1. Kalau elemen ini dihapus, apakah penonton kehilangan informasi? Kalau tidak, hapus.
2. Squint test: blur still 10 px. Gumpalan mana yang menang? Kalau ada dua gumpalan yang sama kuat, gagal.
3. Apakah teks dan visual mengatakan hal yang sama? Kalau ya, buang salah satu.
4. Kotak, glow, blur, atau efek ini menyelesaikan masalah apa? Kalau tidak bisa disebut, hapus.
5. Warna di beat ini ada di palet terpilih? Kalau tidak, ganti.

Panduan rasa ini sengaja diberi cek supaya tidak kalah oleh aturan yang terukur (cakupan kata, safe zone).
