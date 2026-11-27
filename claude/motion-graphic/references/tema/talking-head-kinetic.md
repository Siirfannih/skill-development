---
name: tema-talking-head-kinetic
description: Cara berpikir tema wajah bicara + teks kinetik (caption di bidang polos, kata di belakang kepala, slab penuh); buka setelah router memilih tema ini untuk reel opini atau edukasi berwajah.
---
# Tema: talking-head-kinetic

## 1. Identitas
Wajah dan ruangannya adalah panggung; teks menumpang pada bidang yang disediakan footage (dada polos, headroom, belakang kepala) dan sesekali keluar ke slab warna penuh. Bunyi memukul hanya di engsel.
Cocok: reel berwajah, esai opini, hook opini. Tidak cocok: video ≥ 80 % UI/arsip tanpa wajah. Audit footage dulu: baju polos/bermotif, headroom, dinding gelap/terang, tangan di dada.

## 2. Keyframe contoh
Folder: `../../guide/referensi/sheets/keyframes/`
- `83-k8-urutan-pengantar-at.jpg`: dinding merah gelap; "At" putih kecil muncul dulu, lalu "BARSOL MEDIA" condensed raksasa di belakang kepala, kepala menutup huruf tengah; "At" menempel di sudut kiri atasnya.
- `85-k10-urutan-neon-ruang.jpg`: saat "ORTHODONTIST" neon biru muncul di belakang kepala, hanya dinding yang berubah dari oranye hangat ke biru-hitam; wajah tetap hangat; caption dada tidak berpindah.
- `90-k13-urutan-gambar-ganti-kata-diam.jpg`: caption putih bold satu kata diam di poros tengah sementara shot berganti siluet gelap ↔ profil terang.

## 3. Keputusan visual (ukuran yang teramati di contoh, px @1080×1920)
**V1 Kata vonis di belakang kepala.** Satu kata ≤ 10 huruf, condensed tebal ±280 px, di layer antara dinding dan matte kepala, di headroom; awal/akhir kata dan puncak huruf terbaca, kepala boleh menutup sebagian huruf tengah. Kata pengantar 64 px menempel ≤ 24 px di sudut kata hero (target eksekusi). Pemicu: headroom tipis atau matte rambut kotor → pakai slab (V3). → Niat: kata jadi benda di ruang syuting, pengantar + hero terbaca satu frasa. → Frame: kedalaman tanpa kotak. → Penonton (hipotesis): kontak mata tetap, terasa dibuat editor. → Gagal bila kata panjang kehilangan huruf tengah atau pengantar jauh. → Bukti: 83-k8, 69-k1, 61-k2 (3 kreator).

**V2 Regrade hanya latar.** Saat kata menyala muncul di dinding hangat/sedang, hanya layer dinding diredupkan/didinginkan (potong 1 frame atau geser ±24 f); wajah tetap. Regrade bertahan selama kata tampil dan kembali bersama kata keluar. Pemicu: dinding putih terang → teks gelap atau slab. → Niat: kata jadi sumber cahaya tanpa scrim. → Frame: kontras naik di belakang, kulit utuh. → Penonton (hipotesis): ruang berubah suasana, bukan digelapkan. → Gagal bila wajah ikut gelap atau regrade bolak-balik. → Bukti: 83-k7, 85-k10 (bergerak).

**V3 Punchline keluar ke slab penuh.** Punchline 1–4 kata → potong 1 frame ke kanvas warna penuh, satu kata ±1000 px lebar (kata pendek boleh lebih sempit), 0,3–1 dtk per kata, lalu kembali ke wajah. Pemicu: baju bermotif, tangan di dada, atau sedang di mockup kecil. → Niat: skala penuh tanpa menabrak gestur. → Frame: ganti halaman. → Penonton (hipotesis): perhatian segar di kata terpenting. → Gagal bila slab dikurung di kotak kecil, atau > 1 rangkaian per ±15 dtk. → Bukti: 85-k5, 85-k9 (bergerak), 79-k3 (belum dilihat bergerak).

**V4 Cut keras, transisi sigap hanya di engsel.** Potong keras di batas ucapan; satu transisi sigap (flash 1 f, sapuan 3 f, wipe benda nyata) per engsel babak; jenis boleh beda antar-engsel, tiap jenis ≤ 1 per 2–3 dtk. → Niat: tempo padat tanpa kebisingan. → Frame: tidak ada dissolve lambat. → Penonton (hipotesis): ritme terasa disengaja. → Gagal bila flash/glitch di tiap kalimat. → Bukti: 83-k7, 85-k9, 85-k10, 91-k9.

## 4. Kinetic typography
**KT1 Caption satu poros di bidang polos.** 1–3 kata per tampil, 64 px (≥ 56 px), sans medium huruf kecil, putih tanpa kotak, di dada polos y ±1150 px; tetap di koordinat yang sama saat shot atau B-roll berganti. Pemicu: baju bermotif atau tangan sering di dada → headroom y ±380 px. → Niat: mata tidak mencari teks. → Frame: satu jangkar baca. → Penonton (hipotesis): terbaca sekali lirik di HP. → Gagal bila menabrak motif baju, tangan, atau langit terang (gradien lokal hanya bila < 4,5:1). → Bukti: 83-k9, 90-k13, 91-k2, 61-k1; 91-k7 (gagal kontras).

**KT2 Cara masuk dari panjang kata dan laju bicara.** Default: potong 1 frame per frasa; di tuturan > 2,5 kata/dtk gabung 2–3 kata per tampil. Pemicu: kata hero ≤ 8 huruf diikuti jeda → masuk per huruf ber-motion blur ±0,5–1 f/huruf, lengkap ≤ 8 f. → Niat: huruf selesai terbentuk bersama fonemnya. → Frame: teks tidak tertinggal dari suara. → Penonton (hipotesis): tidak menunggu huruf terakhir. → Gagal bila per huruf dipakai pada kata panjang atau fade ≥ 10 f. → Bukti: 85-k9, 91-k10; 26-k12, 87-k8, 62-k1 (62 belum dilihat bergerak).

**KT3 Dua lapis teks = dua zona.** Bila dua lapis tampil bersama (judul seri + caption, pengantar + hero), pisahkan zona vertikal dan bedakan keluarga/ketebalan; skala ≥ 1,8× (titik balik ≥ 4×). Tidak ada kata tampil di dua tempat. → Niat: urutan baca jelas tanpa garis atau kotak. → Frame: tidak ada dua blok setara. → Penonton (hipotesis): tahu apa dibaca dulu. → Gagal bila ukuran 1,3–1,8× dengan keluarga sama. → Bukti: 45-k1, 69-k2, 85-k11, 26-k12; 87-k2 di rasio lebih rendah karena keluarga dan warna beda.

## 5. Sound design
**SD1 Aksen hanya di engsel.** Aliran kata tanpa pop; impact hanya di pergantian dunia (wajah ↔ slab), kata vonis, objek grafis baru. Mode tick rekomendasi `accent-only` (E24); `per-word` −12…−18 dB relatif VO (LANTAI E24) tetap sah untuk segmen cepat (standar repo, bukan pengamatan). → Niat: kata kunci memukul, VO tak tertimbun. → Frame: bunyi menandai perubahan, bukan teks. → Penonton (hipotesis): tidak terasa pop otomatis. → Gagal bila pop keras tiap kata (koreksi Irfan: "sangat-sangat berisik"). → Bukti: 85, 90, 91, 61; pembanding 22, 59. Belum didengar.

**SD2 Tarik napas sebelum vonis.** Stem musik turun ±0,5 dtk tepat sebelum vonis/CTA, lalu impact saat kata/adegan berikut masuk. Pemicu: pengakuan panjang → hingga ±1,5 dtk. Bed ambien tetap. → Niat: kata telanjang terdengar tanpa menaikkan VO. → Frame: ruang sebelum slab. → Penonton (hipotesis): kesungguhan naik. → Gagal bila hening digital atau drop di tengah kata. → Bukti: 85 (4 drop 0,35–1,30 dtk), 29, 43, 59 (1,4 dtk). Belum didengar.

**SD3 Bunyi ke onset kata dan bentuk gerak.** Aksen jatuh di onset kata kunci atau puncak gerak, bukan grid ketukan musik. Whoosh hanya untuk whip/zoom ber-motion blur; potong keras = klik atau senyap. → Niat: bunyi terbaca sebagai akibat yang terlihat. → Frame: transien ±1 f dari kejadian. → Penonton (hipotesis): perpindahan tidak kasar. → Gagal bila whoosh di potongan tanpa gerak cepat. → Bukti: 26 (89 % onset ≤ 100 ms), 69, 79, 85, 78. Belum didengar.

## 6. Anti-contoh (`../../cookbook/contoh-gagal/`)
- `17-frasa-terpisah.jpg`: "SKILL" di pojok kiri atas, jauh dari "GRATIS"; kepala menelan "A". Kondisi: pengantar ditaruh di pojok frame, bukan di sudut kata hero.
- `16-punchline-di-kotak.jpg`: "PROFESIONAL" di slab di dalam kotak video IG, kepala menutup 3 huruf. Kondisi: slab dipakai di wadah kecil; kata 11 huruf di belakang kepala lebar.
- `09-skilldev-hero-terlalu-bawah.jpg`: "DECISION" di tepi bawah menutup kedua tangan. Kondisi: zona dada dipakai saat tangan bergestur.

## 7. Dua contoh kerja
**A. Hook @siirfannih 9:16, 0–3,4 dtk.** VO: "Video AI itu sering kelihatan murahan, padahal efeknya udah paling rame." (kaos hitam polos, headroom ±25 %, dinding abu gelap)
Sebelum (LULUS DENGAN CATATAN): di 0,85 dtk punch-in 1,14×, "MURAHAN" per huruf (atau hard-cut, belum diputus) dan regrade mulai bersamaan; regrade kembali hangat sesudah 1 dtk; "rame." 104/72 px (1,44×) kuning; kuning 3 kali; "itu" dibuang; whoosh di 0,00 tanpa gerak.
Sesudah: "Video AI itu sering" 0,0–0,8 di dada y 1150, 64 px putih. 0,8: "MURAHAN" Anton 280 px #F7E610 di belakang kepala (y 330–610), potong 1 frame (tuturan 3,7 kata/dtk, per huruf terlalu lambat); "kelihatan" 64 px menempel 20 px di atas sudut kirinya; dinding −22 % bersamaan (satu sumber: kata menyala) dan bertahan sampai kata keluar di 2,0. "padahal efeknya" 2,0–2,7 → "udah paling rame." 2,7–3,4 di dada, 64 px putih, "rame." hanya bold. Punch-in dibuang. Suara: stem musik turun 0,4–0,8; satu impact di 0,8; whoosh dibuang; kata lain senyap.
Alasan: punch-in kamera adalah animasi independen yang mulai di frame sama dan berebut mata (hipotesis uji transfer); kuning bermakna bila sekali; beat diperpanjang 0,4 dtk, VO tidak dipercepat.

**B. Bukti perbandingan @siirfannih 9:16, 18–24 dtk.** VO: "Masalahnya, AI numpuk sepuluh kartu dan glow sekaligus, padahal otak cuma butuh satu fokus."
Sebelum (LULUS DENGAN CATATAN): klip di wadah 950×1306 px; siku kuning di klip slop, border kuning di klip bersih (kuning = masalah sekaligus lulus); whoosh di cut keras; "SATU FOKUS." 1,5×, font "Anton atau Inter"; "Masalahnya, AI" hilang.
Sesudah: kedua klip full-bleed 1080×1920, tajam, berurutan (18,0 slop → 21,0 bersih → 24,0 wajah), potong keras. Teks poros tetap y 260–340 px, 64 px putih (cek kontras per klip): "Masalahnya, AI" → "numpuk sepuluh kartu" → "dan glow sekaligus," → "padahal otak" → "cuma butuh" → "satu fokus." (kuning, satu-satunya aksen; bobot sama). Siku dan border dibuang. Suara: 18,0 klik pendek; 20,6–21,0 stem musik turun lalu masuk lebih lapang; 21,0 dan 24,0 senyap.
Alasan: isi klip sudah membuktikan; penanda tanpa objek dan warna dua makna melemahkan bukti.

## 8. Pertanyaan pembeda + status bukti
1. Wajah panggung utama? Hanya pembuka → ambil mekanik hook saja.
2. Footage punya bidang aman (baju polos, headroom ≥ 20 %, sisi kosong)? Tidak → slab penuh.
3. Tenang atau hentakan? Tenang → caption satu poros saja; hentakan → tambah kata belakang kepala + slab.
Status: gerak terverifikasi hanya 26, 83, 85, 87, 90, 91; bunyi belum didengar; dampak penonton hipotesis. Angka turunan penulis (bukan referensi, uji saat still): jarak pengantar ≤ 24 px, caption dada y ±1150 px @1920.
Catatan (1 kreator): teks diikat ke transform kamera genggam ±1,05× (Zache); nyala aksen→putih 3–6 f (Zache); angka pemangkasan VO (guard 50 ms, jeda ≤ −50 dBFS) adalah standar repo.
