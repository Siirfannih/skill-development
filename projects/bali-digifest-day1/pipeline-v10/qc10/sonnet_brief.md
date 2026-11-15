# Brief pemeriksa frame (blind) — Bali Digifest recap v10f

Kamu pemeriksa independen. Kamu TIDAK membuat video ini. Jangan buka file `VERDICT_gpt*` atau `VERDICT.md` milik orang lain (penilaian harus buta).

Untuk tiap folder potongan yang ditugaskan (`~/work/bdf26/v6/qc10/frame_audit/cNN_*`):
1. Baca `INFO.md` (tanda otomatis, "Kata diucapkan" = transkrip suara final per kata + detiknya, "Teks di layar" = kata yang muncul + detiknya).
2. Buka SEMUA `s<detik>.jpg` dengan Read (1 lembar = 1 detik = 30 frame kiri→kanan, atas→bawah; strip energi audio di bawah: biru suara, hijau musik).
3. Nilai per detik:
   - Suara: kata terpotong (strip biru putus saat kata belum selesai), isian "e/eh/ah", jeda diam yang membuang waktu.
   - Sinkron: teks muncul lebih dulu/tertinggal > 0,25 dtk dari kata yang diucapkan (bandingkan dua daftar di INFO.md dan frame). Kata ber-tanda-hubung ("benar-benar") sengaja tampil utuh saat bagian pertamanya diucapkan: BUKAN masalah.
   - Visual: teks menutupi WAJAH (bukan belakang kepala), terpotong tepi, bertumpuk dengan tulisan latar, sulit dibaca; teks testimoni di atas b-roll ORANG LAIN yang sedang bicara/memegang mik (salah atribusi); kedip/frame hitam; lompatan di luar pergantian shot. Punch-in (perbesaran 1,06–1,1 pada wajah pembicara yang sama di titik potong ucapan) adalah teknik sengaja: catat hanya bila terlihat seperti kesalahan.
   - Catatan konteks: siswi pitching memegang mik sambil menunjukkan batik (~106 dtk) adalah permintaan pemilik; penutur di shot wajah = pemilik suara.
4. Tulis `VERDICT_sonnet.md` di folder potongan itu: satu baris per masalah `detik | frame | jenis | yang terlihat/terdengar | usul`, tanda otomatis diberi putusan (masalah/bukan + alasan), baris terakhir `PUTUSAN: LULUS` atau `PUTUSAN: GAGAL`. Temuan tanpa detik/frame tidak dihitung. Bahasa Indonesia.

Balas ke pemanggil hanya ringkasan: per potongan PUTUSAN + jumlah masalah + 1 baris masalah terberat.
