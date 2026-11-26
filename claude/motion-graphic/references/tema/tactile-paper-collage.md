---
name: tema-tactile-paper-collage
description: Tema kolase kertas dan benda fisik (alas kertas, strip catatan, label berbayangan) untuk listicle, refleksi, atau talking head beranotasi; buka setelah router memilihnya.
---
# Tema: tactile-paper-collage

## 1. Identitas
Layar adalah meja kerja: satu kertas bertekstur sebagai alas, tiap poin ditempel sebagai benda atau strip kertas, teks terasa dicetak atau ditulis tangan. Semua muncul seketika seperti ditaruh tangan; VO di depan, bunyi hemat.
Cocok: listicle ≥ 4 poin berbenda konkret, refleksi @siirfannih, talking head dengan catatan di sisi kosong. Tidak cocok: demo UI berlabel kecil, naskah abstrak tanpa benda, kamera genggam yang memenuhi layar.

## 2. Keyframe wajib dibuka
`../../guide/referensi/sheets/keyframes/`
1. `98-k2-satu-objek-per-item.jpg` — kertas krem bergrid tipis, tiap sel satu benda (headphone, kardus, kursi); label tebal huruf kecil di blok warna datar, bayangan hitam keras tanpa blur, miring sedikit, sebagian tertutup bendanya.
2. `97-k4-urutan-belokan-but.jpg` — kertas pindai putih; "i love making stuff" tipis kecil → "but" fotokopi hitam ±57 % tinggi → pertanyaan krayon kapital; gaya pecah hanya di belokan.
3. `31-k1-daftar-judul.jpg` — presenter kanan, langit kiri; judul spidol merah di strip kertas melintang di atas kepala; lima strip bergaris tulisan tangan miring di separuh kiri; caption putih di kotak oranye bawah tengah.

## 3. Keputusan visual
**V1 · Satu alas kertas bertekstur menyatukan aset.** Default: kertas krem bergrid tipis (sel ±140 px, garis 1 px), terlihat di ≥ 40 % frame. Pemicu: monolog teks tanpa benda → selembar kertas putih pindai, bukan #FFFFFF.
Niat: 3D, doodle, foto harus terbaca satu meja → frame: teks kontras tanpa kotak gelap → penonton: terasa dirakit tangan (hipotesis) → gagal: putih digital; alas dipaksakan di talking head penuh (di sana dunia kamera alasnya).
Bukti: 98-k2, 98-k4, 97-k1, 97-k5, 02-k7, 02-k8.

**V2 · Bayangan mengikuti material.** Label/doodle datar → keras 8 px 8 px 0 tanpa blur. Benda 3D/foto fisik → bayangan kontak satu lapis, pendek, blur ≤ 24 px, opasitas ≤ 0,2 (satu sistem bayangan, NEGATIF 2). Lembar scan → tanpa bayangan digital.
Niat: blur shadow seragam = slide → frame: tiap benda punya bobot → penonton: membaca benda, bukan kartu UI (hipotesis) → gagal: satu drop shadow blur untuk semua.
Bukti: 98-k2, 98-k4, sheet 95-rt2rj, 02-k7, 31-k1. Angka px tidak terukur dari still.

**V3 · Miring kecil tetap + saling menutup.** Tiap tempelan ±3° dari seed, tetap sepanjang shot; minimal satu benda menutup sebagian labelnya.
Niat: meniru tangan dan mengikat kata ke bendanya → frame: 2–3 lapis, bukan grid datar → penonton: label "milik" bendanya (hipotesis) → gagal: miring acak tiap frame. Dilanggar untuk hero raksasa dan angka yang harus dibaca lurus.
Bukti: 98-k2, 98-k5, 02-k1, 02-k7, 31-k1, 31-k5.

**V4 · Tempelan di luar wajah; caption punya tempat sendiri.** Talking head: subjek di separuh kanan; strip/doodle di x ≤ ±50 %; judul panjang boleh melintas di atas kepala; caption di satu posisi tetap bawah tengah.
Niat: poin dan ucapan dibedakan oleh tempat → frame: wajah utuh, dua zona teks tak berebut → penonton: memilah sekali lihat (hipotesis) → gagal: strip menyentuh mata/mulut; caption di zona strip. Satu kata seruan sangat singkat boleh menutup wajah.
Bukti: 31-k1 (judul sampai x ≈ 97 % di atas topi), 31-k3, 02-k1, 02-k4, 98-k2.

**V5 · Satu benda harfiah per poin; aditif untuk detail, reset untuk topik.** Default: poin baru ditempel di halaman yang sama. Pemicu: topik berganti → reset halaman atau ganti material (kertas diremas, fotokopi).
Niat: poin dipahami dari bendanya sebelum dibaca → frame: halaman tumbuh, jarang dikosongkan → penonton: tak membaca ulang seluruh frame (hipotesis) → gagal: kata abstrak tanpa benda yang terbaca < 0,5 dtk; ikon generik.
Bukti: 98-k2, 98-k5, 97-k1, 97-k3, 97-k5 (±87 % aditif, data vault), 95-rt2rj, 31-k5.

## 4. Kinetic typography
Default 9:16 (lebar 1080): strip/label 64 px; caption 60 px (1,07×); judul/hero 200 px (3,1×); belokan ≥ 4×.

**KT1 · Muncul seketika, keluar bersama cut.** Default: kertas/strip utuh 0 f di onset kata. Pemicu: label mendarat di benda → pop skala 0,5→1 dalam 3 f, 3–6 f setelah onset. Tanpa fade, tanpa exit sendiri.
Niat: kertas nyata tidak memudar → frame: tak ada frame setengah transparan → penonton: teks terasa ditempel, sinkron suara (hipotesis) → gagal: fade/cross-dissolve; exit per kata.
Bukti: 97 (88 % dari 131 pergantian dalam ±0,2 dtk onset; 97-k1, 97-k6), 98 (pop 2–3 f; 98-k1), keduanya dilihat bergerak. 02, 31 hanya resep.

**KT2 · Kalimat dibangun aditif di slot akhirnya.** Tata seluruh frasa/daftar dulu; kata/strip baru muncul di posisi final, yang lama tak bergeser.
Niat: reflow melelahkan → frame: satu arah baca stabil → penonton: tak tersesat di daftar (hipotesis) → gagal: blok bergeser tiap kata masuk.
Bukti: 97-k6, 97-k1, 98-k5, 31-k1, 31-k3.

**KT3 · Ukuran jadi kompas; gaya huruf dipecah maks 2× per video.** Kata fungsi vs kata kunci ≥ 2,7×; satu sistem huruf di ≥ 90 % durasi; pecah gaya hanya di belokan utama atau saat kata memperagakan dirinya. Monolog → satu tinta gelap + satu aksen. Listicle benda → label pakai set warna tetap (maks 4) sebagai kode item; aksen penekanan tetap satu.
Niat: layar penuh benda butuh satu kompas → frame: kata inti tertangkap < 0,3 dtk → penonton: kejutan di belokan (hipotesis) → gagal: semua stiker seukuran; font ganti tiap kata.
Bukti: 97-k2, 97-k4, 98-k3, 98-k1, 31-k2, 02-k1, 95-rt2rj.

## 5. Sound design
Tick direkomendasikan `accent-only`; bila RESEP memilih `per-word`, tick −12…−18 dB relatif VO (LANTAI E24), 2–4 varian. Semua angka belum didengar.
**SD1 · Kata, label, butir senyap; satu cue per benda, hero, atau reset.** Niat: 9–18 kejadian visual per 5 dtk; bunyi per label jadi rentetan klik → ritme: bunyi menandai benda/reset → penonton: cue terasa bernilai (hipotesis) → gagal: pop tiap label; dua bunyi < 100 ms; reset besar sunyi tanpa musik.
Bukti: 97 (0 SFX, 0 musik), 98 (label senyap, swish median 19,7 dB di bawah VO), 02 (42 pop: kasus yang dikoreksi), 31.
**SD2 · Whoosh hanya untuk gerak yang terlihat.** Hard cut dan swap kata tanpa whoosh; wipe/push nyata boleh satu bunyi udara sangat pelan, jarak ≥ 1 dtk.
Niat: pindah dunia vs ganti ide di tempat harus terdengar beda → ritme: cut statis kering → penonton: alur jernih di HP (hipotesis) → gagal: whoosh menambal cut statis.
Bukti: 97 (nol whoosh), 98-k5 (hard cut), 98-k1 (swish di wipe, sinkron belum terbukti), 02 (whoosh rapat, kontra).
**SD3 · Musik = lantai di bawah VO.** Default: bed kontinu ±20 dB di bawah VO, energi berubah per babak. Pemicu: refleksi personal → boleh tanpa musik, jeda VO jadi tanda baca, bed ruang tetap. Puncak ≤ −1 dBTP.
Niat: aset sudah padat → ritme: ganti babak terdengar dari energi → penonton: suara intim (hipotesis) → gagal: musik melawan VO; clip.
Bukti: 98 (bed 21,7 dB di bawah VO), 97 (0 musik), 02 (turun per babak, clip +0,1 dBFS), 31.

## 6. Anti-contoh (`../../cookbook/contoh-gagal/`)
- `02-builder-trap-unik-kecil.jpg`: foto wajah kecil di kanvas pola pucat, "unik." ±3–4 % tinggi, subtitle terpisah. Kondisi: latar tanpa kedalaman + subjek kecil + dua lapis teks. Ganti: satu benda 480–620 px, hero ≥ 2,7× pengantar yang menempel.
- `20-inset-kecil-di-kanvas-kosong.jpg`: kartu kecil berbayangan blur di putih luas. Kondisi: aset kecil + putih digital + blur shadow = slide. Ganti: V1 + V2.
- Caption mengulang strip (31-k3, referensi sendiri): "2. RISING ACTION" dan "rising action." tampil bersamaan. Kondisi: dua lapis teks mengucapkan hal sama. Di proyek Irfan: kata di strip tidak diulang di caption.

## 7. Contoh kerja
**A · @siirfannih, "3 alasan kontenmu mandek" (talking head 9:16).**
Sebelum: stiker neon "3 ALASAN" 120 px menutup dahi; tiga stiker muncul serentak, blur shadow 20 px, fade 12 f; caption mengulang poin; pop + whoosh per stiker.
Sesudah: Irfan di x 520–1080, separuh kiri kosong. "3 ALASAN" spidol merah 200 px di strip HVS, x 60–1000, y 180–400, −2°, ≥ 60 px di atas rambut, 0 f di "tiga". "1. NUNGGU MOOD" 64 px di strip bergaris, x 60–500, y 760, +1,5°, 0 f di "nunggu"; poin 2–3 nanti di y 900 dan 1040 tanpa menggeser poin 1. Caption 60 px di kotak oranye, y 1480, hanya kata yang tak ada di strip. Suara: satu cue di judul; strip dan jump cut senyap; bed musik ±20 dB di bawah VO sejak frame 0.
Kenapa: wajah utuh; satu jenis penanda (strip); tak ada teks ganda; satu cue membuat judul terasa dicap.

**B · Jadisatu, "4 hal yang tercecer di 4 aplikasi" (faceless 9:16).** Poin 1: "ide yang kamu catat jam dua pagi".
Sebelum: #FFFFFF, empat ikon generik serentak di grid 2×2, fade 15 f, label semua 72 px, blur shadow semua, whoosh + pop per ikon.
Sesudah: alas #F3EDE1, grid 1 px tiap 140 px. Cutout tumpukan sticky note lebar 560 px di (540, 1080), bayangan lembut, mendarat 0,88→1 dalam 8 f di "ide". Label "ide jam 2 pagi" 64 px putih di blok biru, x 180–700, y 660, −3°, bayangan keras, pop 3 f sesudah benda; tepinya tertutup 20 px oleh sticky note. Poin berikut: hard cut, benda baru, warna label dari set tetap. Penutup "satu tempat." 200 px, satu-satunya hero. Suara: satu cue per benda mendarat, label senyap, cut tanpa whoosh.
Kenapa: benda menjelaskan sebelum label terbaca; benda lalu label berurutan, bukan dua animasi independen di frame sama; bunyi pindah dari label ke benda.

## 8. Pertanyaan pembeda + status bukti
1. "Kesannya buatan tangan dan personal, atau presisi korporat?"
2. "Berapa poin naskah yang punya benda nyata?" (< 80 % → tema lain)
3. "Ada wajah di layar atau faceless?" (V4 vs V1)
Status: dilihat bergerak 95, 97, 98; 02, 31 belum. Foley kertas tidak terbukti di kartu mana pun (02 terukur bubble/water drop, 97 nol SFX, 98 swish); jenis bunyi cue = aturan produksi repo. Px, sudut, luas alas = default produksi, tak terukur dari still.
Catatan (1 kartu, belum prinsip): wipe pita warna pengganti nomor item (98-k1).
