# Arah gaya milik user; eksplorasi gaya bukan gerbang lagi

Tanggal: 27 Nov 2026. Tingkat: perilaku (diminta langsung oleh pemilik).

## Masalah

Pemilik menguji `main` `c1559698` di sesi sendiri. Ia sudah memberi storyboard buatannya dan meminta "lanjutkan dari storyboard ini". Model malah merender satu beat dalam tiga arah gaya di samping keyframe bank referensi repo dan meminta pemilik memilih.

Sebabnya `dunia-visual.md` §7 versi 27 Nov pagi: "Ada referensi atau tema baru: jelajahi gaya ... Pemilik memilih", ditambah langkah 4 alur `SKILL.md` yang baru selesai bila "Irfan memilih arah". Aturan itu tidak membedakan user yang sudah punya arah dari user yang belum.

Kata pemilik: bank 80+ referensi adalah bahan melatih skill, bukan menu untuk user; referensi user menambah nilai dan selalu menang; storyboard user digambar ulang lalu dilengkapi.

## Perubahan

- `references/dunia-visual.md` §7 diganti menjadi "Arah gaya: milik user dulu". Cabang A (user memberi storyboard, referensi, atau arah): tanpa pilihan gaya, gambar ulang setia, tambah yang kurang, patokan banding adalah bahan user. Cabang B (tanpa arah, atau user meminta opsi): 2-3 arah pada satu beat, ditawarkan sekali, bukan gerbang. Storyboard per putaran kecil tetap.
- `SKILL.md` alur langkah 3 dan 4 disesuaikan; langkah 4 tidak lagi menunggu pilihan pemilik.
- `references/storyboard.md` §1 baris "Irfan memberi storyboard": gambar ulang setia, tambah yang kurang.
- `scripts/tests/test_migrasi_lantai.py`: judul bagian yang dicek.

Tidak diubah: `bahan.md`, `jelajah_gaya.py`, NEGATIF, skrip gerbang.

## Belum dibuktikan

Belum ada storyboard yang dijalankan dengan aturan ini. Uji yang cocok: beri storyboard pemilik + naskah, lihat apakah model melanjutkan tanpa menawarkan gaya.

## Revisi kedua (hari yang sama, atas koreksi pemilik)

Versi pertama masih berbentuk aturan bercabang (A/B) dan melarang bertanya saat user sudah memberi arah. Pemilik: workflow ini bahan pertimbangan, bukan langkah wajib; bila arah user belum ada atau lemah, model boleh bertanya; wawancara adalah kekuatan utama; bank referensi repo pendukung untuk mencocokkan maunya user dan mengambil mekanik yang sudah jadi.

§7 ditulis ulang sebagai lima pertimbangan (lebih pendek: `dunia-visual.md` 15.248 → 14.739 B). Judul §3 tidak lagi membatasi bertanya sekali. Tidak ada aturan baru yang ditambah.
