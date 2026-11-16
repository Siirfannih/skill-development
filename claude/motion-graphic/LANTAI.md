# LANTAI: mutu yang berlaku di semua video

Lantai menentukan **mutu**; kiblat (kartu di `pustaka/`) menentukan **gaya**. Bila kartu kiblat bertentangan dengan lantai, lantai menang dan penyesuaiannya ditulis di `RESEP.md`. Lantai tidak berisi font, warna, atau layout tertentu: itu urusan kiblat.

Setiap butir bisa dicek dari still atau angka. Butir baru hanya masuk bila berlaku untuk semua gaya dan sudah muncul di dua video berbeda (lihat `pustaka/README.md` §Tumbuh).

## A. Teks di layar
1. **Semua ucapan tampil sebagai teks, dalam SATU lapisan tipografi kinetik bergaya editorial.** Tidak ada baris subtitle terpisah di pita bawah seperti subtitle film (Irfan 2 Nov, 11 Nov).
2. **Posisi teks lahir dari komposisi tiap shot**: dekat subjek, di ruang kosong, atau menempel objek yang dirujuk. Gagal bila 3 tampilan berturut-turut duduk di pita yang sama tanpa alasan komposisi. Teks menempel pada subjeknya: jarak teks ke subjek yang dirujuk paling jauh ±8 % tinggi frame, dan tidak lebih dekat ke tepi frame daripada ke subjek (Irfan oke 15 Nov, dari uji rekonstruksi 18 + Builder Trap).
3. **Kata tidak tampil dua kali.** Kata yang sudah jadi penekanan tidak diulang di lapisan atau tempat lain pada saat yang sama.
4. **Maksimal 2 baris per tampil, 1–3 kata per tampil, blok seimbang** (baris terpendek ≥ 85 % baris terpanjang; bukan satu kalimat dalam 2 baris seperti headline berita), tidak terpotong tepi, tidak ada kata yatim. Tumpuk kata (1 kata per baris) boleh. Saat pembicara bertanya, tanda tanya tampil (Irfan 9 Nov; Irfan oke 15 Nov, dari builder-trap-r2 v2 + jensen-pain-suffering).
5. **Teks hanya dari ucapan.** Tidak menambah kalimat atau angka yang tidak diucapkan.
6. **Satu baris satu ukuran.** Kata yang dibesarkan pindah ke barisnya sendiri. Dua gaya huruf tidak sama kuat dalam satu frasa (serif tidak seukuran dan sebobot dengan kata bold di sebelahnya) (Irfan 6 Nov).
7. **Huruf menyatu dengan frame-nya.** Kontras ≥ 4,5 : 1, ukurannya berhubungan dengan subjek di frame, tidak menyentuh tepi. Jenis huruf ikut kiblat; serif tidak dilarang. Font yang dipakai termuat dari file (`fonts/README.md`), tidak jatuh ke font cadangan sistem (Irfan 12 Nov). Contoh gagal: `pustaka/contoh-gagal/01-serif-pucat-raksasa.jpg` (Irfan 11 Nov).
8. **Terbaca berurutan dan cukup lama**: satu arah baca, tiap frasa tampil sampai selesai diucapkan, terbaca di layar HP (Irfan 9 Nov).
9. **Kotak di belakang teks hanya bila kontras gagal**, bukan hiasan; narasi kinetik tanpa kotak/shape di belakangnya (Irfan 6 Nov, 15 Nov).

## B. Kamera dan gerak
10. **Frame tidak datar.** Setiap shot lebih dari 2 detik punya gerak kamera yang disengaja (push/zoom pelan untuk fokus, pan, atau mengikuti objek). Pengecualian hanya bila kartu kiblat memang berkamera diam, dan itu ditulis di `RESEP.md` (Irfan 9 Nov).
11. **Kamera mengikuti SATU objek fokus per beat**, dari objek itu muncul sampai selesai, tidak kembali ke posisi awal di tengah jalan (Irfan 9 Nov).
12. **Elemen diam di dunianya, kamera yang bergerak.** Saat kamera zoom, ia melewati teks dan objek; teks tidak ikut bergeser sendiri (Irfan 25 Okt, 9 Nov).
13. **Tidak ada pergantian yang mendadak atau malas**: yang masuk datang dari suatu arah atau berubah bentuk, gerak cepat memakai motion blur, easing tidak linear. Overlay/gradien masuk dan keluar dengan gerak (Irfan 9 Nov).

## C. Komposisi
14. **Satu fokus per momen.** Mata tahu harus melihat ke mana.
15. **Teks, objek, dan visual satu kesatuan**: tidak tumpang tindih, tidak bertabrakan, tidak berjauhan seperti bagian terpisah (Irfan 9 Nov).
16. **Tepi frame bersih.** Tidak ada objek penting di zona tepi kecuali karena gerak kamera; margin aman 5 % (Irfan 11 Nov).
17. **Seimbang dan hierarkinya terbaca, dinilai global per frame**, bukan per ukuran objek: posisi teks, objek, KT, bingkai, dan b-roll dilihat bersama di zoom 25 %, 50 %, dan 100 %. Urutan baca di ukuran normal jelas: latar utama (#primary) → teks/objek utama → pengisi (objek pinggir, teks kecil). Satu sisi berisi teks + visual sementara sisi lain kosong = gagal; perbaikannya pindah posisi (mis. kunci ke kanan bawah, berseberangan dengan kepala di kiri atas). Dicek pada still **sebelum** render penuh (`scripts/juri/balance_check.py`, lembar 25/50 %) (Irfan 2 Nov, 15 Nov).
18. **Rapi**: garis berakhir di tepi bentuknya, jarak antar-elemen sama, stroke dan radius konsisten (Irfan 9 Nov).

## D. Isi visual
19. **Visual menggambarkan makna ucapan**, bukan bentuk atau hiasan. Penonton harus lebih mudah paham karena visual itu (Irfan 9 Nov, 11 Nov).
20. **Tampilan platform dan logo adalah yang asli** (Threads, Instagram, ChatGPT, GitHub), dibangun ulang sebagai animasi, bukan UI karangan. Ikon memakai ikon jadi (Irfan 26 Okt, 9 Nov, 11 Nov).
21. **Yang sedang bicara tampil di frame**, kecuali tertutup visual layar penuh (Irfan 9 Nov).
22. **Tidak ada placeholder** di render.

## E. Audio
23. **Suara tidak dipercepat, jedanya bersih, dan tak ada fonem yang digunting.** Tempo dirapatkan dengan memotong jeda mati (Irfan 6 Nov, 8 Nov). Kata sampah (eee, emm, tuh, …) dan diam saat berpikir dibuang di tahap potong, termasuk diam yang tertelan ke durasi kata. Rencana cut divalidasi terhadap transkrip **take sumber**: kata isi tidak boleh teriris > 20 ms, tiap batas punya guard 50 ms, durasi kata hasil ≥ 85 %, dan urutan ASR aktual tetap sama; jumlah entri JSON/remap bukan bukti suara masih utuh. `audio_order.py lock suara --words … --source-words … --cut-map …` dan `cut_check.py` wajib PASS sebelum suara dikunci (Irfan 15–16 Nov; gagal: builder-trap-r2 v5 ronde 1–2). Saat pembicara berhenti atau berpikir, tidak terdengar dengung kamar, piring, atau klik: jeda tidak diisi room tone kotor, stem suara di jeda ≤ −50 dBFS (`scripts/gate/pause_clean.py`) (Irfan 13 Nov).
24. **SFX menandai momen cerita dan gerak yang terlihat, dengan kosakata dan kepadatan dari kiblat**, terdengar (gain −4 sampai −10 dB). Tidak ada bunyi per kata, tidak ada lapisan klik; hening yang disengaja boleh. File dari `~/sfx/SFXIrfan` dulu dan didengar sebelum dipakai, tetapi folder itu kumpulan kandidat—bukan allowlist. `sfx_density.py` harus menolak palet terlarang (kayu/thock/felt, koin/logam, kartun/langkah kaki, laser/sci-fi/8-bit, noise/sinus sintetis, rope-creak) meski cue punya metadata lengkap (Irfan 1, 8, 9, 13, 16 Nov).
25. **Musik mengikuti tempo dan suasana video**, tidak bolong, tidak melawan emosi ucapan (Irfan 6, 8 Nov).

## F. Cara kerja
26. **Urutan render: still per beat → draft skala 0,5 → semua frame diaudit → render penuh.** Semua lewat `scripts/juri/render.sh`; render penuh ditolak sebelum resep dan still lulus. Satu render penuh 1080p ±8–18 menit di PC server, jadi ia langkah terakhir. **Audit tanpa sampling sebelum MP4**: semua frame dirender sebagai gambar (`render.sh frames`), dipecah per ≤ 10 dtk, tiap detik (30 frame) diperiksa agen lain (subagen/model lain, paralel per potongan) untuk visual, audio/SFX, transisi, dan jarak antar-frame (`scripts/juri/frame_audit.py`); render penuh ditolak sampai semua potongan `PUTUSAN: LULUS` (Irfan 15 Nov; gagal: builder-trap-r2 v3 patahan di titik potong suara dan Bali Digifest, keduanya lolos cek sampel tiap 8–15 frame).
27. **Revisi = diff.** Adegan yang sudah disetujui tidak disentuh; yang dirender ulang hanya rentang yang berubah.
28. **Tidak yakin = tanya, jangan menebak.**
29. **Video baru dikirim setelah juri lulus** (`pustaka/README.md` §Juri), bersama lembar sanding still vs kiblat.
