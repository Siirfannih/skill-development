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

## R2-3 · KOREKSI PERAN (Irfan 17 Nov ±12:05) — menggantikan "hub skill-development di tengah" di R2-2
skill-development BUKAN router (beda dengan OpenBot). Ia **perpustakaan/library skill**: mengajari cara mengedit/membuat video dan memberi referensi. Agen berkoordinasi LANGSUNG satu sama lain (pesan "Sent by ChatGPT from another chat", TASK→REPORT, mailbox), dan masing-masing MEMBACA perpustakaan yang sama.
- Komposisi B11 baru: tidak ada hub di tengah. Garis pesan menghubungkan agen ke agen secara langsung (ChatGPT ↔ Claude, Claude ↔ session B).
- "skill-development" digambar sebagai **rak/perpustakaan** (lapis belakang, mis. deretan kartu/buku skill bernama asli: LANTAI, kartu kiblat, RESEP, orkestrasi) — saat agen bekerja, satu kartu menyala dan "dibaca" (garis tipis berbeda gaya dari garis pesan, mis. cahaya lembut dari rak ke agen), bukan diteruskan lewat rak.
- Loop pembelajaran = kesalahan **ditulis ke perpustakaan**: kartu "Dicatat: … supaya tidak terulang" terbang dari percakapan masuk ke rak (rak bertambah satu kartu), lalu agen/session berikutnya membaca kartu itu dan langsung benar (centang). Itulah "loop".
- Urutan lahir (tetap satu papan fokus, 2,5D): (1) ChatGPT + pesannya; (2) pesan langsung ke Claude, Claude + balasan lahir (ChatGPT mundur); (3) session B lahir + pesannya; (4) kartu "Dicatat…" ditulis masuk rak; (5) session berikutnya membaca kartu → centang; (6) pull-back: lebih banyak agen lahir, semua membaca rak yang sama = "workspace kerja".

## R2-4 · Koreksi Irfan atas versi Opus REVISI-1 (17 Nov ±12:15) + evaluasi QC Sutradara
Irfan: versi ini sudah difinishing Opus dan lolos QC Sutradara, padahal salah. Perbaiki SEMUA:
a. **SELESAI**: kata hero BESAR di DEPAN (seperti FINALLY tapi di lapis depan, bukan di belakang kepala/UI), Anton, mengisi area kosong bawah timeline B1 dunia repo, seimbang dengan latar putih dan tidak bertabrakan (hijau `#1A7F37` atau tinta, kontras ≥ 4,5).
b. **Kartu paket B4b**: logo ChatGPT sudah benar; bentuk/UI kartu dibuat Apple-style (bersih, modern, elegan: radius lembut, putih/abu sangat muda, tipografi SF/Inter rapi, bayangan lembut berlapis, tanpa kotak kasar). POSISI: kartu ChatGPT di KANAN, lalu kartu Claude muncul di KIRI (bukan bertumpuk di kanan) → kartu mengapit Irfan, seimbang.
c. **LINTAS AGENT**: perspektif 3D — "LINTAS" masuk menjauh ke dalam (vanishing ke belakang kepala), "AGENT" keluar ke kanan (mendekat); tetap di belakang kepala lewat matte, tahan.
d. **B3a**: hapus KT "kayak Apple style"/"Storytelling"/kata yang sama dengan isi UI; fokus ke UI Claude. Lantai A3: kata yang sudah tampil di UI tidak boleh tampil lagi sebagai KT (tanda GANDA `teks_cek` antara KT dan UI = GAGAL, bukan dimaafkan).
e. **Ukuran KT konsisten**: R1 narasi satu ukuran sepanjang video (mis. "gitu" di B4 tiba-tiba kecil, "Kayak" di bawah LINTAS AGENT kecil) → samakan; R1 tidak boleh lebih kecil dari tinggi huruf minimum Lantai (narasi ≥ 56 px @1080).
f. **KT tertutup/terpotong**: "masih ker…" terpotong panel Instagram di B10; "kayak Apple style" terpotong tepi bawah → tidak boleh ada KT terpotong panel/tepi.
g. "dalam" di B4 tidak di kiri atas.
h. Semua tanda `balance_check` diperbaiki komposisinya, bukan diberi alasan, kecuali frame transisi ≤ 12 f.

## Gerbang QC sebelum render final (Irfan: bersihkan → perbaiki → audit → perbaiki lagi → baru render)
1. Builder: gerbang otomatis 0 tanda yang dimaafkan untuk GANDA KT-vs-UI, ukuran KT, terpotong, balance.
2. Opus: rapikan + cek ulang sendiri daftar a–h dengan still per butir.
3. Sutradara: lembar sanding per butir vs coretan Irfan; daftar a–h dicentang satu per satu dengan bukti still.
4. Audit frame dua pemeriksa; temuan diperbaiki; audit ulang potongan berubah.
5. Baru render final + Drive.
