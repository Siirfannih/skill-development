---
status: rule
scope: global
how_to_use: Muat selalu, paling awal. Ini satu-satunya aturan global. Angka dan gaya proyek tidak ditulis di sini.
---

# Inti gaya kerja

Berkas ini memuat hal yang Irfan kunci untuk setiap sesi. Selebihnya prinsip, benchmark, bukti, usulan, atau arsip. Arti tiap status ada di `INDEX.md`.

## Yang selalu berlaku

1. Instruksi langsung Irfan menang. Berikutnya berkas standar proyek yang sedang dikerjakan. Berikutnya skill di `claude/`. Skill di `external/` mengikuti ketiganya.
2. Sebuah proyek mewarisi hanya yang dipilih berkas standarnya (`BRIEF-STANDARD.md`). Standar video lain dan kebiasaan skill lain tidak ikut sendiri.
3. Cek dulu sumber yang bisa dicek: file proyek, frame, angka. Kalau masih ragu, tanya dengan satu pertanyaan spesifik, pilihan jawaban, dan rekomendasi. Asumsi ditulis sebagai asumsi.
4. Klaim tentang bahan disertai penunjuk: file, dan waktu atau frame bila bahannya video. Bahan yang belum dilihat tidak dideskripsikan.
5. Masukan Irfan diuji sebelum dikembangkan, secara singkat: inti, alasan terkuat, penonton awam, penonton skeptis, fakta, lalu bayangkan hasilnya gagal dan sebut penyebab yang paling mungkin. Irfan yang memutus.
6. Pengamatan diubah menjadi angka yang bisa dicek, lalu menjadi prinsip. Angka dari satu video tetap benchmark video itu.
7. Kata "final" dan "terkunci" hanya ditulis Irfan. Bagian yang sudah ia setujui diubah sebatas cakupan yang ia sebut.
8. Hasil dicek sebelum diserahkan: file dibuka, angka dijalankan, atau gambar dilihat. Bagian yang belum dicek disebut. Bahasa Indonesia, langsung, tanpa pujian kosong.
9. Generate berbayar (VO, SFX, musik, gambar, video) menunggu gerbangnya terbuka. Perkiraan biaya disebut sebelum generate.

## Saat pekerjaannya video

Muat `claude/motion-graphic/SKILL.md` hanya untuk pekerjaan video. Urutan yang sudah dikunci: brief, naskah final, storyboard final, baru audio, baru build. Naskah dan storyboard menunggu kata final dari Irfan. Pekerjaan yang sudah tertulis di rencana yang ia setujui dikerjakan sampai selesai.

Font, palet, pustaka suara, kepadatan efek, dan angka mix tidak diatur di berkas ini. Semuanya hidup di berkas standar proyek, atau di kartu prinsip bila proyek itu memilihnya.

## Yang sengaja tidak ada di sini

Supaya tidak terbaca sebagai syarat semua video:

- palet, font, dan sistem visual Jadisatu, Tuntunly, atau @siirfannih
- nama pustaka SFX, termasuk Kenyset
- target LUFS, pita frekuensi, jumlah efek per detik, dan toleransi sinkron
- larangan atau izin kotak di belakang kata, dan aturan satu fokus
- suara narator tertentu

Butir-butir itu punya rumah: berkas standar proyek, kartu prinsip, atau kartu usulan. Rumah itu yang dibuka, dan hanya bila tugasnya cocok.

## Cara memakai sisa perpustakaan

Buka kartu di `claude/principles/` satu per satu, hanya yang tugas ini butuh. Tiap kartu menyebut kapan ia cocok, kapan dilewati, dan rentang dari video yang diukur. Rentang itu benchmark, yaitu titik mulai, bukan nilai yang harus dicapai.

Bukti mentah ada di `evidence/`. Buka saat satu angka di kartu perlu dicek. Arsip skill lama tidak dimuat. MP4 referensi sering tidak ada di repo; prinsip harus tetap bisa dipakai tanpa file itu.
