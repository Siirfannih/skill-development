# Storyboard — dari script final ke rencana beat

Baca di gerbang 4–5 (storyboard, TYPE-TEST, TRANSITION-SHEET). Storyboard adalah gerbang review termurah: memperbaiki satu baris di sini jauh lebih murah daripada memperbaiki render.

## Isi

1. Syarat masuk
2. Storyboard 100 %
3. Melanjutkan storyboard contoh Irfan
4. Spec beat (§15)
5. Tabel kritik sutradara (§16.3)
6. TYPE-TEST dan TRANSITION-SHEET
7. Serah terima

## 1. Syarat masuk

- Script sudah dinyatakan final oleh Irfan dan disimpan sebagai file (lihat `copywriting.md`).
- Brief terkunci: tujuan, penonton, durasi, CTA, format master.
- Referensi sudah dibedah dengan angka (`analysis-qa.md` §2).

## 2. Storyboard 100 %

- Mencakup seluruh durasi. Tidak ada bagian "nanti dilanjutkan saat build".
- Storyboard adalah **referensi komposisi, bukan aset**. Gambar storyboard tidak pernah dipakai sebagai background yang ditumpuk teks.
- Setiap beat menjawab tiga pertanyaan: tokoh sedang melakukan apa, apa subjeknya, objek apa yang sedang dibicarakan (`direction.md` §6.4).
- Setiap beat diisi dengan format §15 di bawah, termasuk kolom SFX. Musik dan SFX baru dibuat setelah storyboard disetujui, tetapi rencananya sudah ditulis di sini.

## 3. Melanjutkan storyboard contoh Irfan

Irfan biasanya menggambar beberapa panel sebagai **arah gaya, bukan batas**. Tugasmu melanjutkan bagian yang tidak digambar seolah-olah Irfan sendiri yang menggambarnya.

Langkahnya:
1. Deskripsikan setiap panel contoh apa adanya sebelum menilai: yang terlihat, lalu aturan yang diturunkan.
2. Catat ciri gaya yang harus dibawa ke semua bagian: bentuk tokoh, palet, posisi teks, jumlah kata per beat, ruang kosong.
3. Untuk setiap pesan baru, tanyakan: **"Jika Irfan menggambar ini dengan tokoh yang sama, tokoh itu sedang melakukan apa?"**

Contoh nyata (Tuntunly, 12 panel):

| Panel | Yang terlihat | Aturan yang diturunkan |
|---|---|---|
| 01–02 | Logo AI berganti, lalu "AI berubah tiap minggu." | Pembuka = fakta dunia, cepat, visual sederhana di tengah |
| 03–05 | Kelas → "Tapi cara kita belajar?" → kelas gelap "Masih sama..." | Kontras dibangun dengan mengubah warna latar dunia yang sama, bukan ganti scene |
| 06 | Tokoh kotak berdiri sendiri | Tokoh diperkenalkan tanpa teks |
| 07 | Tokoh kecil di bawah sorot cahaya, "Jaraknya makin jauh." | Makna "jauh" = jarak ruang antara tokoh dan cahaya |
| 08–10 | Meja yang sama: "Baca." → "Catat. Hafal." → "Ujian." | Rutinitas = komposisi sama, aksi dan ekspresi berubah |
| 11–12 | Buku/kertas masuk tong → "LUPAKAN" | Konsekuensi digambarkan dengan benda fisik |

Bagian yang tidak digambar lalu dilanjutkan dengan tokoh yang sama: "Cara baru: pahami" menjadi tokoh membuka laptop dengan UI Tuntunly asli dan kamera mendekat ke layar; "Langsung praktik" menjadi komposisi meja yang sama seperti "Catat. Hafal.", tetapi kali ini tokoh tersenyum.

## 4. Spec beat (§15)

```
PROJECT | FAMILY per babak | 1920×1080 · 30 fps | VO: <file> | Musik: <cue per babak>
FONT ROLES: Display=<…> Headline=<…> Body=<…> Aksen=<…> Data=<…>
| # | Waktu VO | Kata VO pemicu | Objek pembicaraan | Teks layar (≤6 kata, **kunci**) | Gaya (G) + teknik (T) | Ukuran | Subjek & aksi tokoh | Kamera (C) | Transisi keluar (X) + benda pembawa | SFX (waktu, kelas, terikat ke, offset, dB vs VO) |
```

Kode G, T, C, X diambil dari `typography.md` dan `camera-transition.md`. Jangan menciptakan kode baru di storyboard; kalau butuh teknik baru, tambahkan dulu ke cabang yang sesuai.

Cek sebelum build:
- setiap gerak punya alasan dan bunyi (atau alasan kenapa senyap)
- setiap teks punya sumber VO
- satu fokus per frame
- tidak ada teks kiri + UI kanan

## 5. Tabel kritik sutradara (§16.3) (per beat)

Isi untuk setiap beat saat storyboard selesai, lalu cek ulang pada render:

| Beat | Tokoh ada & beraksi | 1 fokus | Teks ≤ 6 kata | Metafora spasial | Efek punya alasan | Kamera ke subjek | Gerak masuk akal | UI asli | Highlight bermakna | Layout tidak berulang > 2 |
|---|---|---|---|---|---|---|---|---|---|---|

Satu "tidak" harus diperbaiki atau diberi alasan tertulis kenapa dikecualikan.

## 6. TYPE-TEST dan TRANSITION-SHEET

Dibuat sebelum build, setelah storyboard lolos kritik:
- **TYPE-TEST**: satu still per gaya teks yang dipakai (G1–G7, `typography.md` §7.5), berdampingan dengan frame referensi yang sepadan, ditambah video 4 detik untuk gaya yang bergerak.
- **TRANSITION-SHEET**: untuk setiap potongan, frame terakhir A + frame pertama B + kode transisi + benda pembawa.

Alasannya: gaya teks dan transisi adalah dua hal yang paling sering ditolak Irfan setelah render. Mengujinya sebagai still jauh lebih murah.

## 7. Serah terima

Kirim storyboard ke Irfan sebagai file, bersama tabel kritik yang sudah terisi dan daftar singkat keputusan yang menyimpang dari referensi. Storyboard adalah gerbang persetujuan: build baru dimulai setelah Irfan menyatakan final.
