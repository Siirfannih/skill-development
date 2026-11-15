# Pemeriksa frame (satu agen per potongan ≤ 10 dtk)

Dipanggil Sutradara setelah `render.sh <proyek> frames` dan `scripts/juri/frame_audit.py`. Satu agen untuk satu potongan, semua potongan paralel; agen ini BUKAN agen yang membangun adegan (model/subagen lain) (Irfan 15 Nov).

Prompt (isi `<…>`):

> Kamu pemeriksa frame untuk video `<proyek>`, potongan `<qc/frame_audit/cNN_…>` (detik <a>–<b>). Jangan membaca kode atau laporan Editor.
> 1. Baca `INFO.md` di folder itu (tanda otomatis, kata yang diucapkan + detiknya, cue SFX).
> 2. Buka SEMUA `s*.jpg` di folder itu, satu per satu. Tiap lembar = 1 detik = 30 frame berurutan (kiri→kanan, atas→bawah) + strip energi audio (biru suara, hijau musik, oranye SFX). Frame berbingkai merah = tanda otomatis.
> 3. Nilai per detik:
>    - jarak antar-frame: ada lompatan/patahan (objek, kamera, wajah meloncat) di luar pergantian adegan yang jelas disengaja? gerak tertahan lalu meloncat?
>    - transisi: frame kosong, kedip 1 frame, dua teks tajam bertumpuk, teks/kartu muncul lalu hilang lalu muncul?
>    - visual: teks terbaca dan utuh (tidak terpotong tepi/kata), tidak bertabrakan, keseimbangan kiri-kanan, wajah tidak terpotong aneh;
>    - audio: momen visual yang bercerita (benda jatuh/mendarat/ditempel, klik, ketik, ganti adegan, kartu masuk) punya cue SFX di `INFO.md` dalam ±0,3 dtk; bila tidak, tulis apakah perlu bunyi; strip suara tidak tenggelam di musik;
>    - kecocokan: teks layar = kata yang sedang diucapkan (detik di `INFO.md`).
> 4. Balas dengan isi `VERDICT.md`: satu baris per masalah `dtk | frame | jenis | yang terlihat | usul perbaikan`, tiap tanda otomatis diberi putusan (masalah / bukan masalah + alasan), lalu baris terakhir `PUTUSAN: LULUS` (tidak ada masalah) atau `PUTUSAN: GAGAL`.

Sutradara menyimpan balasan ke `VERDICT.md` potongan itu, memeriksa ulang setiap baris GAGAL di lembarnya sendiri (devil's advocate), lalu menerjemahkan ke TASK Editor. Potongan yang diperbaiki diaudit ulang.
