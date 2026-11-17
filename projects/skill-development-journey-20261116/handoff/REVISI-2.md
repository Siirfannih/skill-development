# REVISI-2 · catatan Irfan 17 Nov ±12:00 (menang atas REVISI-1 untuk butir ini) · Sutradara claude2
Acuan: `sumber/revisi1/irfan-invideo-chat-25d.png` (2,5D InVideo: papan gelap berlapis, satu papan fokus, sisanya di kedalaman), rekaman Irfan openbot `sumber/revisi1/irfan-rekaman-1157-sheet.jpg` (asli: /mnt/storage-projects/skill-dev-journey/ref/irfan-rekaman-1157.mov) — gaya & cara bercerita saja.

## R2-1 · Karakter Codex & Gemini (semua adegan 2D: B1, B1b, B11, dll.)
- Ganti ke keluarga yang SAMA dengan Claude crab: pixel/blok datar, tepi lurus bertangga (tidak cembung, tidak bergelembung), mata kotak gelap, TANPA garis mulut lengkung (ekspresi lewat mata/pose seperti Claude).
- Codex: siluet awan pixel bertangga (seperti ikon asli yang dipixel-kan), warna biru brand (#3E6BFF → #8FB2FF, dua-tiga tingkat warna datar, bukan gradien halus), simbol `>_` pixel putih tegas di tengah.
- Gemini: bintang empat sudut pixel bertangga, biru #4285F4 → ungu #9B72CB (tingkat warna datar), mata kotak.
- Ukuran grid pixel sama dengan Claude supaya satu keluarga; sistem gerak tetap (idle, kedip, take, smear).

## R2-2 · B11 dunia agen (dari "kayak yang kalian lihat ini" s.d. "loop pembelajaran")
Masalah: semua elemen satu lantai, muncul bersamaan → tanpa prioritas/POV.
- **2,5D berlapis**: lapis depan = papan AKTIF (tajam, skala 1,0, terang); lapis belakang = papan sebelumnya mundur ke z jauh (skala 0,82–0,9, blur 6–12 px, opasitas 0,45–0,6, sedikit lebih gelap). Satu papan aktif per saat. Bayangan lembut berlapis seperti acuan InVideo.
- **Lahir berurutan mengikuti ucapan** (bukan muncul semua): (1) node ChatGPT + bubble pesannya lahir sendirian di tengah (fokus); (2) titik-titik mengalir → node hub "skill-development" lahir dari ujung garis; (3) node Claude + bubble balasan lahir, papan ChatGPT mundur ke belakang; (4) node "session B" + pesannya lahir, papan sebelumnya mundur; (5) loop digambar menghubungkan semua + kartu "Dicatat…" lahir dengan centang; (6) kamera pull-back: jaringan TUMBUH (agen-agen kecil tambahan lahir bergelombang dari hub, seperti rekaman openbot) = "workspace kerja", lalu tahan/drift.
- Tiap kelahiran: pop dari titik asal (ujung garis/node induk), kurva land/heavy, reaksi berjeda react(i); kamera berpindah papan ke papan (`heavy`), tidak pernah semua tampil tajam bersamaan.
- Tetap di dalam bingkai layar Mac gelap; pesan asli (handoff/PAHAM-SKILL-DEV.md §D); nama tampil "Claude", "ChatGPT", "Gemini", "session B".
