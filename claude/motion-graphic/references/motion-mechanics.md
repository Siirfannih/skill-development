# Mekanik gerak: kamera, transisi, cutout (logika dan cara kerja)

Dibaca saat memilih gerak kamera atau transisi, bersama `camera-transition.md`. Setiap mekanik ditulis sebagai: **kapan dipakai → cara kerja → angka awal → cek**. Angka frame diukur per frame (30 fps) dari referensi yang Irfan setujui (6 Nov) dan adalah titik awal, bukan hukum; ubah bila tempo VO menuntut.

Prinsip: transisi adalah **logika ruang** (dari mana adegan berikutnya datang), bukan efek. Pilih mekanik dari hubungan dua adegan.

| Hubungan adegan A → B | Mekanik |
|---|---|
| B ada "di dalam" A (layar, jendela, dokumen, foto) | Push-through |
| A ternyata bagian dari B (konten ternyata di dalam produk) | Pull-back reveal |
| Pindah topik atau energi naik | Whip |
| Pembuka/penutup, masuk ke dunia | Depth fly-through |
| Banyak hal → satu gagasan | Orbit gather |
| Akumulasi, "begitu banyak", hook/penutup cepat | Flash montage |
| Ganti pernyataan di dunia yang sama | Ganti di tempat (kata/objek bertukar, kamera tetap) |

## Push-through
- **Kapan:** adegan berikutnya adalah isi dari objek di layar.
- **Cara kerja:** kamera mendorong masuk ke permukaan objek dengan percepatan (ease-in). Saat isi objek memenuhi frame, cut ke adegan B pada framing yang cocok. Motion blur hanya di frame terakhir sebelum cut.
- **Angka awal:** dorongan ±12–14 f, cut di puncak kecepatan; 2–3 f terakhir ber-blur.
- **Cek:** framing akhir A dan framing awal B harus segaris (isi layar = frame B).

## Pull-back reveal
- **Kapan:** menunjukkan bahwa yang barusan dilihat adalah layar/produk.
- **Cara kerja:** footage penuh mengecil (ease-out), lalu bingkai perangkat dan latar palet muncul di sekelilingnya.
- **Angka awal:** ±10–12 f mengecil, bingkai mendarat 4–6 f sesudahnya.
- **Cek:** footage tetap tajam selama mengecil; latar baru adalah latar palet.

## Whip
- **Kapan:** pindah topik atau menaikkan energi.
- **Cara kerja:** blur arah kuat selama 2–4 f, lalu mendarat keras di adegan B tanpa easing panjang.
- **Angka awal:** 3 f blur.
- **Cek:** arah whip konsisten dengan arah baca atau arah gerak sebelumnya; SFX whoosh memuncak di frame blur tengah.

## Depth fly-through
- **Kapan:** pembuka, penutup, atau masuk ke dunia produk.
- **Cara kerja:** objek ditata di beberapa lapisan kedalaman. Kamera bergerak maju; lapisan depan bergerak lebih cepat daripada belakang (parallax). Depth of field menyempit sampai gambar larut ke latar palet.
- **Angka awal:** ±20–25 f; blur naik di 6 f terakhir.
- **Cek:** minimal 3 lapisan kedalaman dengan kecepatan berbeda; tidak ada flash putih yang menutup frame.

## Orbit gather
- **Kapan:** "banyak masalah/alat → satu solusi".
- **Cara kerja:** kartu/foto masuk dari tepi frame dan berkumpul membentuk cincin di sekitar teks kecil di tengah, lalu cincin berputar pelan selama ditahan.
- **Cek:** teks tengah tetap kecil dan terbaca; cincin tidak menutupinya.

## Flash montage
- **Kapan:** akumulasi atau ritme hook/penutup.
- **Cara kerja:** foto berganti tiap 2–3 f, dalam satu grade warna yang sama.
- **Cek:** maksimal ±1 detik per rangkaian; grade seragam, kalau tidak terasa acak.

## Tahan dengan drift
- Saat ditahan, frame tidak pernah benar-benar diam: skala 1–3 % atau rotasi/orbit pelan, linear boleh.
- Alasan: frame mati terasa seperti slide. Pengecualian: momen informasional yang harus dibaca tepat.

## Teks yang muncul bertahap
- Kata masuk satu per satu, jeda 2–4 f, mengikuti onset VO.
- Kata baru masuk dengan warna tipis (tint aksen) lalu mengendap ke warna teks dalam 4–6 f. Ini penekanan tanpa memperbesar huruf.
- Mengetik dengan kursor dipakai untuk pernyataan tenang dan CTA.

## Cutout
Memisahkan subjek dari latarnya (rotoscope/matte). Dipakai karena fungsi, bukan hiasan.
- **Subjek ke dunia palet:** bila latar asli footage bertabrakan dengan palet atau mengganggu, potong subjek (tangan + ponsel, orang) dan taruh di latar palet. Footage pun menyatu dengan dunia video.
- **Teks di belakang subjek:** bila kata adalah pahlawan dan subjek cukup diam. Kata ditaruh di antara latar dan subjek. Syarat: matte bersih di tepi rambut/tangan, kata tetap terbaca ≥ 70 % hurufnya.
- **Cek:** tepi matte dicek di still 100 % pada frame tercepat; tidak ada halo.

## Kamera mengikuti makna
- Kamera dekat dan mengikuti saat satu objek bergerak; dipatahkan ke wide saat penekanan atau pergantian makna.
- Gerak besar hanya di pergantian makna; di dalam satu makna, drift saja.
