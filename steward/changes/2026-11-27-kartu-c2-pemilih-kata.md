# Kartu C2: pemilih kartu mencocokkan kata utuh, menyimpan kata dua huruf, memetakan sinonim, dan menimbang trigger di atas nama
Masalah: `pilih_kartu.py` mencocokkan potongan teks (`ui` kena "build", `tanpa` kena banyak kata), membuang UI/VO/AI/3D, menimbang nama pola (3) di atas narrative trigger (2), dan hanya mengenal kata Indonesia. Brief sehari-hari atau berbahasa Inggris dari industri lain tidak menemukan apa pun.
- `kata_kunci`: token `[\w$%]+` huruf kecil, minimal 2 huruf, kata sambung baru dibuang (`ABAIKAN` ditambah di, ke, video, reel, a, an, of, to, ...), lalu dipetakan lewat tabel `SINONIM` (14 bentuk baku: hook, angka, banding, bukti, langkah, balik, penekanan, transisi, suasana, cta, penutup, jelaskan, ui, wajah; komentar Inggris di atasnya memuat alasan dan aturan menambah).
- `nilai`: kata cocok bila utuh, atau sebagai awalan kata bila ≥ 4 huruf (`foto` kena `fotografi`, `ui` tidak kena `build`). Teks kartu juga dipetakan lewat `SINONIM`, jadi `testimoni` di trigger cocok dengan query `bukti`. Hasil dicache per kartu.
- Bobot: fungsi (4, kosong sampai C3), trigger (3), nama (2), kategori (1). Pesan galat dan docstring diperbarui; kalimat "sekali per beat" diganti: 2-4 kartu itu untuk seluruh video.
Tes diubah sengaja (disebut di pesan commit): `test_kata_kunci_dipisah_spasi_dan_dibersihkan` (kini `["demo","fitur","ui"]`); `test_nama_pola_berbobot_lebih_dari_trigger` diganti nama dan fixture menjadi `test_trigger_berbobot_lebih_dari_nama`. Tes baru: `test_kata_utuh_bukan_potongan`, `test_awalan_untuk_kata_panjang`, `test_sinonim_inggris`, `test_dua_huruf_dipertahankan`. Tes lain tidak diubah dan tetap lolos.
Bukti: `--cari "cutout metaphor" --bergerak` memuat 95; `--cari "demo fitur produk" --bergerak` 4 baris.
Level: Behavior
Persetujuan: perlu ya pemilik sebelum merge ke main
Cara membatalkan: `git revert` commit ini.
