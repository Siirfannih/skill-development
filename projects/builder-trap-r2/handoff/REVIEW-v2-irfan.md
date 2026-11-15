# REVIEW v2 (catatan Irfan 15 Nov + analisis KT Sutradara)

## Catatan Irfan (verbatim, dipotong)
- I-01 · B07b: "Unik besarkan lagi ukuran fontnya 2–4 px supaya lebih besar dari 'sesuatu yang'".
- I-02 · B11: "Begitu juga fomo supaya ujung akhiran katanya sama".
- I-03 · B17: "'Aku tidak mempublikasikan apapun' pecah jadi kata per kata dan 1 baris per kata".
- I-04 · umum: "KT yang kamu buat seringkali ga balance kadang yang diatas terlalu panjang dan dibawahnya terlalu pendek, kadang monoton misalnya pada awalan dimana Shape + Text dibuat 2 baris jadi keliatan kayak Headline berita dan nilai editorialnya kurang". Pembanding: semua kartu + `_ganimate_` (ref 17).

## Bedanya cara kerja KT referensi vs v2 (bukti: `~/work/_downloads/ganimate-kt/kt_01.jpg`, `kt_02.jpg`; kartu 55, 57, 73, 08)
| Referensi | v2 kita |
|---|---|
| **1–3 kata per tampil**, frasa diganti utuh ("By" → "By People" → "no smarter" → "than you"; jordan 1–6; mosycreate 2–5) | kalimat menumpuk jadi 2 baris panjang ("Dan aku termakan kata-kata motivasi.", "aku gak mau jadi orang yang FOMO.") = terbaca seperti subtitle |
| **Blok dua baris seimbang**: lebar baris setara, satu blok ("Graphic / AI tools", bertangga kiri-kanan); bila ada kata besar, kata kecil hanya 1–2 kata (kartu 55 "delusional / enough", pedro "esta / transición") | baris kecil 4–6 kata di atas kata besar pendek → atas panjang, bawah pendek (B07, B11, B21) |
| **Tidak ada kotak di belakang narasi**. Kotak hanya (a) chip label yang menempel dan ikut bergerak dengan objek ("Schools", "dealerships"), (b) blok sorot satu kata hero ("Source") | B01–B03 kotak putih + kalimat 2 baris di bingkai arsip = lower-third berita |
| **Mode berganti**: kata hero sendirian sangat besar ("Wattage", "Which AI Source"), frasa pendek di tengah, label menempel objek, kata disisipkan ke dalam blok ("Graphic tools" → "Graphic AI tools") | hampir semua tampilan wajah = mode sama (kecil + besar, pita kanan-tengah) → monoton |
| Penekanan = kata dipisah sendirian + dibesarkan | penekanan = kata besar, tapi baris pengantarnya terlalu panjang sehingga kata besar kalah lebar |

## Kriteria v3 (dipakai TASK-r4)
- **KT-1 blok seimbang**: tampilan 2+ baris = satu blok; baris terpendek ≥ 85 % lebar baris terpanjang (kecuali satu kata sambung 1 suku di atas kata hero). Kata besar diskalakan sampai lebarnya = lebar baris kecil (±5 %), tanpa turun di bawah lantai 96 px atau keluar safe frame.
- **KT-2 satuan tampil**: narasi 1–3 kata per tampil (maks 4 bila tidak bisa dipecah); frasa berganti utuh (ganti, bukan menumpuk jadi kalimat). Semua kata tetap tampil saat diucapkan (cekkata).
- **KT-3 tanpa kotak narasi**: tidak ada kotak/label di belakang teks narasi; kotak hanya chip yang menempel objek atau sorot satu kata hero.
- **KT-4 variasi mode**: mode = {hero satu kata, blok 2 baris seimbang, frasa pendek, label menempel objek, tumpuk kata}; tidak ada > 2 tampilan berturut-turut dengan mode + posisi sama.
- **KT-5 (catatan Irfan per frame)**: I-01 "unik." lebar ≥ lebar "sesuatu yang", ujung kanan sejajar; I-02 ujung kanan "FOMO." sejajar ujung baris di atasnya; I-03 B17 tumpuk kata: satu kata per baris, muncul per kata saat diucapkan, blok seimbang (pengecualian Lantai A4 untuk frame yang Irfan sebut, aturan 40). Triad B16 dan B18 memakai perlakuan yang sama supaya tiga kalimat triad tetap satu keluarga (aturan 3); dicatat sebagai keputusan Sutradara.
- Tetap: lantai ukuran (≥ 56/96 px), palet, babak 3 tanpa biru, isi kata, timing ucapan, audio v2.
