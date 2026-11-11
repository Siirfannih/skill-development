# LANTAI: mutu yang berlaku di semua video

Lantai menentukan **mutu**; kiblat (kartu di `pustaka/`) menentukan **gaya**. Bila kartu kiblat bertentangan dengan lantai, lantai menang dan penyesuaiannya ditulis di `RESEP.md`. Lantai tidak berisi font, warna, atau layout tertentu: itu urusan kiblat.

Setiap butir bisa dicek dari still atau angka. Butir baru hanya masuk bila berlaku untuk semua gaya dan sudah muncul di dua video berbeda (lihat `pustaka/README.md` §Tumbuh).

## A. Teks di layar
1. **Semua ucapan tampil sebagai teks, dalam SATU lapisan tipografi kinetik bergaya editorial.** Tidak ada baris subtitle terpisah di pita bawah seperti subtitle film (Irfan 2 Nov, 11 Nov).
2. **Posisi teks lahir dari komposisi tiap shot**: dekat subjek, di ruang kosong, atau menempel objek yang dirujuk. Gagal bila 3 tampilan berturut-turut duduk di pita yang sama tanpa alasan komposisi.
3. **Kata tidak tampil dua kali.** Kata yang sudah jadi penekanan tidak diulang di lapisan atau tempat lain pada saat yang sama.
4. **Maksimal 2 baris per tampil**, tidak terpotong tepi, tidak ada kata yatim. Saat pembicara bertanya, tanda tanya tampil (Irfan 9 Nov).
5. **Teks hanya dari ucapan.** Tidak menambah kalimat atau angka yang tidak diucapkan.
6. **Satu baris satu ukuran.** Kata yang dibesarkan pindah ke barisnya sendiri. Dua gaya huruf tidak sama kuat dalam satu frasa (serif tidak seukuran dan sebobot dengan kata bold di sebelahnya) (Irfan 6 Nov).
7. **Huruf menyatu dengan frame-nya.** Kontras ≥ 4,5 : 1, ukurannya berhubungan dengan subjek di frame, tidak menyentuh tepi. Jenis huruf ikut kiblat; serif tidak dilarang. Font yang dipakai termuat dari file (`fonts/README.md`), tidak jatuh ke font cadangan sistem (Irfan 12 Nov). Contoh gagal: `pustaka/contoh-gagal/01-serif-pucat-raksasa.jpg` (Irfan 11 Nov).
8. **Terbaca berurutan dan cukup lama**: satu arah baca, tiap frasa tampil sampai selesai diucapkan, terbaca di layar HP (Irfan 9 Nov).
9. **Kotak di belakang teks hanya bila kontras gagal**, bukan hiasan (Irfan 6 Nov).

## B. Kamera dan gerak
10. **Frame tidak datar.** Setiap shot lebih dari 2 detik punya gerak kamera yang disengaja (push/zoom pelan untuk fokus, pan, atau mengikuti objek). Pengecualian hanya bila kartu kiblat memang berkamera diam, dan itu ditulis di `RESEP.md` (Irfan 9 Nov).
11. **Kamera mengikuti SATU objek fokus per beat**, dari objek itu muncul sampai selesai, tidak kembali ke posisi awal di tengah jalan (Irfan 9 Nov).
12. **Elemen diam di dunianya, kamera yang bergerak.** Saat kamera zoom, ia melewati teks dan objek; teks tidak ikut bergeser sendiri (Irfan 25 Okt, 9 Nov).
13. **Tidak ada pergantian yang mendadak atau malas**: yang masuk datang dari suatu arah atau berubah bentuk, gerak cepat memakai motion blur, easing tidak linear. Overlay/gradien masuk dan keluar dengan gerak (Irfan 9 Nov).

## C. Komposisi
14. **Satu fokus per momen.** Mata tahu harus melihat ke mana.
15. **Teks, objek, dan visual satu kesatuan**: tidak tumpang tindih, tidak bertabrakan, tidak berjauhan seperti bagian terpisah (Irfan 9 Nov).
16. **Tepi frame bersih.** Tidak ada objek penting di zona tepi kecuali karena gerak kamera; margin aman 5 % (Irfan 11 Nov).
17. **Seimbang.** Ruang kosong disengaja; teks tidak menumpuk di bawah atau satu sisi sementara tengah atau sisi lain kosong tanpa alasan (Irfan 2 Nov).
18. **Rapi**: garis berakhir di tepi bentuknya, jarak antar-elemen sama, stroke dan radius konsisten (Irfan 9 Nov).

## D. Isi visual
19. **Visual menggambarkan makna ucapan**, bukan bentuk atau hiasan. Penonton harus lebih mudah paham karena visual itu (Irfan 9 Nov, 11 Nov).
20. **Tampilan platform dan logo adalah yang asli** (Threads, Instagram, ChatGPT, GitHub), dibangun ulang sebagai animasi, bukan UI karangan. Ikon memakai ikon jadi (Irfan 26 Okt, 9 Nov, 11 Nov).
21. **Yang sedang bicara tampil di frame**, kecuali tertutup visual layar penuh (Irfan 9 Nov).
22. **Tidak ada placeholder** di render.

## E. Audio
23. **Suara tidak dipercepat.** Tempo dirapatkan dengan memotong jeda mati (Irfan 6 Nov, 8 Nov).
24. **Setiap gerak visual punya SFX yang cocok dengan jenis geraknya dan terdengar** (gain −4 sampai −10 dB), tanpa spam (Irfan 1, 8, 9 Nov).
25. **Musik mengikuti tempo dan suasana video**, tidak bolong, tidak melawan emosi ucapan (Irfan 6, 8 Nov).

## F. Cara kerja
26. **Urutan render: still per beat → draft skala 0,5 → render penuh.** Semua lewat `scripts/juri/render.sh`; render penuh ditolak sebelum resep dan still lulus. Satu render penuh 1080p ±8–18 menit di PC server, jadi ia langkah terakhir.
27. **Revisi = diff.** Adegan yang sudah disetujui tidak disentuh; yang dirender ulang hanya rentang yang berubah.
28. **Tidak yakin = tanya, jangan menebak.**
29. **Video baru dikirim setelah juri lulus** (`pustaka/README.md` §Juri), bersama lembar sanding still vs kiblat.
