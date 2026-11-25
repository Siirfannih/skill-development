---
name: tema-apple-saas-ui
description: Cara berpikir tema UI produk (UI dibangun ulang, kamera virtual, bunyi saat layar berubah); buka setelah router memilih tema ini untuk demo aplikasi atau launch fitur.
---
# Tema: apple-saas-ui

## 1. Identitas
UI produk dibangun ulang sebagai kode dan menjadi aktor: satu jendela di dunia tenang, kamera yang mendekat, bunyi hanya saat layar berubah. Teks ucapan di luar UI.
Cocok: naskah yang menunjuk aksi software nyata (ketik, klik, setujui), misalnya launch Jadisatu Canvas. Tidak cocok: refleksi tanpa objek UI.

## 2. Keyframe wajib dibuka
Folder: `../../motion-graphic/guide/referensi/sheets/keyframes/`
- `63-k10-urutan-sapuan-grid-dan-punch.jpg`: wallpaper senja tetap tajam di sisi jendela editor gelap; sapuan blok piksel kuning membuka jendela; kamera mendorong ke kotak chat, tepi UI masih tampak.
- `36-k6-kartu-approve.jpg`: headline satu baris condensed putih di pita atas, satu kartu terang ±65 % lebar di bawahnya, bawah frame kosong; aksen hanya di tombol Approve.
- `34-k2-sorot-kata.jpg`: kalimat besar satu ukuran; hanya "broken" diberi sorotan biru muda tembus pandang + 2 handle bulat. Satu penanda, tidak ada yang lain.

## 3. Keputusan visual (px @1920×1080)
**V1 Dunia desktop tajam, panel kontras nada.** Wallpaper foto tajam bernada sedang; jendela UI gelap ±1100×620 px di tengah, wallpaper tampak di empat sisi. Pemicu: panel terang di foto terang → blur backdrop + bayangan lembut. → Niat: panel terpisah lewat nada, bukan border. → Frame: dua bidang jelas di zoom 25 %. → Penonton (hipotesis): percaya ini aplikasi sungguhan. → Gagal bila resep redam B-roll (blur + gelap) dipakai ke wallpaper: jendela gelap larut (uji transfer: 1,06:1); atau jendela > 65 % lebar, terbaca screenshot. → Bukti: 63-k1, 63-k4, 63-k10, 17-k3; terang 28-k5, 35-k4.

**V2 Satu fokus, zona tegas.** Pita teks satu baris y 150–230 px, UI mulai y ≥ 300 px, ±200 px bawah kosong, satu komponen fokus. → Niat: teks dan UI tidak berbobot kembar. → Frame: ruang kosong mengelilingi satu objek. → Penonton (hipotesis): satu titik baca per lirikan. → Gagal bila pita di y < 140 px (zona merah), dua komponen sama besar bersaing, atau kolase tanpa rongga pusat. → Bukti: 36-k5, 36-k6, 30-k5, 49-k5.

**V3 Kamera mendekat, bukan kotak membesar.** Push seluruh panggung (wallpaper + jendela satu grup) ke 1,5× ber-motion blur, tepi jendela tetap tampak. Pemicu: ada pita teks → push dibatasi agar tepi atas jendela ≥ 250 px (biasanya ≤ 1,25×). → Niat: teks UI kecil terbaca tanpa memisah komponen. → Frame: UI tetap satu benda. → Penonton (hipotesis): tidak kehilangan "di mana aku". → Gagal bila zoom ~3× sampai desktop hilang (koreksi Irfan: 3,2× ditolak), atau textbar dibesarkan sendiri. → Bukti: 63-k10, 63-k5; angka 1,4–1,8× hanya dari 63.

**V4 Satu penanda alat desain.** Default: sorotan tembus pandang + 2 handle bulat pada satu kata/objek. Pemicu: melabeli objek ilustrasi → tag siku kecil di sudut objek. Satu jenis per adegan. → Niat: "dipilih/ditandai" dalam bahasa software, ganti kotak teks pasif. → Frame: penekanan menempel di koordinat objek. → Penonton (hipotesis): paham tanpa kata tambahan. → Gagal bila penanda ditumpuk (uji transfer: 6 penanda dalam satu hook). Uji: fungsi tiap penanda bisa diucapkan dalam satu kalimat; bila tidak, hapus. → Bukti: 34-k2, 96-k1, 17-k5, 28-k1.

**V5 Transisi dan kursor dipicu aksi.** Perubahan UI lahir dari klik atau akhir ketikan yang terlihat (sapuan memancar dari tombol yang diklik); masalah→solusi = potong ke dunia warna baru. Satu kursor: melaju, diam sejenak, baru menekan. → Niat: penonton tahu kenapa layar berubah. → Frame: setiap perubahan punya sumber. → Penonton (hipotesis): ikut "menekan". → Gagal bila sapuan/flash di tiap potongan tanpa pemicu (terbaca cacat render), crossfade datar, atau hasil terpilih sebelum kursor memilih. → Bukti: 63-k10; 35-k3, 36-k7, 17-k3, 28-k3 (belum dilihat bergerak); jeda kursor 6 f → 12 f hanya 94.

## 4. Kinetic typography
**KT1 Ucapan di pita luar UI; kolom UI hanya input nyata.** Semua kata VO tampil di pita atas, 72 px, satu poros; prompt berisi perintah yang masuk akal diketik, 1–2 karakter/f. Pemicu: aksi UI butuh 100 % perhatian → pita jeda ≤ 2 dtk, catat di RESEP. Teks yang menunjuk satu elemen menempel ke elemen itu dan ikut kamera. → Niat: narator dan aksi pengguna tidak tertukar. → Frame: dua lapis teks tak pernah mengulang kata. → Penonton (hipotesis): narasi tidak terbaca sebagai perintah AI. → Gagal bila kata VO dibuang diam-diam. → Bukti: koreksi Irfan (builder-trap-r2); 63-k5, 28-k7; 71-k4 menaruh VO di chat, tidak ditiru.

**KT2 Satu ukuran atau dua kutub.** Default narasi: satu ukuran, penekanan lewat bobot atau warna abu→pekat. Pemicu: kata vonis tunggal di kanvas kosong → hero ≥ 1,8× teks sambung; titik balik ≥ 4× (72 → 300 px). → Niat: fokus cepat tanpa kotak. → Frame: tidak ada ukuran tengah. → Penonton (hipotesis): urutan baca jelas. → Gagal bila rasio 1,3–1,8× atau serif sejajar sans bold. → Bukti: 36-k5, 68-k1, 30-k5; 23-k3, 33-k1, 93-k5, 96-k3.

**KT3 Gerak huruf ikut makna.** Masuk narasi: naik singkat 3–6 f, tanpa fade opacity. Pemicu: kata bermakna "berubah/jadi jelas" → teriris atau kabur lalu tajam tepat saat perubahan di gambar selesai. Keluar 3–6 f lewat potong keras atau mask bersama ganti shot. → Niat: perilaku huruf = makna. → Frame: tidak ada kata hantu bertumpuk. → Penonton (hipotesis): makna terasa sebelum terbaca. → Gagal bila distorsi jadi hiasan kata biasa. → Bukti: 93-k13, 93-k14, 94-k12, 63-k9.

## 5. Sound design
**SD1 Bunyi = layar berubah.** Saat VO ±0,5 bunyi/dtk, hanya di perubahan keadaan (klik, kartu lahir, toggle) dan batas babak; potong ke wajah dan ketikan senyap. Tanpa VO boleh rapat. Tick KT: rekomendasi `per-word` −12…−18 dB relatif VO (LANTAI E24, bukan pengamatan); `accent-only` sah bila narasi rapat. → Niat: bunyi menunjuk bukti, VO bersih. → Frame: bunyi dan perubahan jatuh di frame sama. → Penonton (hipotesis): "bunyi = ada yang terjadi". → Gagal bila kepadatan spot non-VO (5–6 onset/dtk) disalin ke atas VO. → Bukti: 93 (12 dari 26 cut berbunyi), 94, 24. Belum didengar.

**SD2 Bentuk bunyi = panjang gerak.** Perubahan ≤ 2 f → klik mekanik ≤ 135 ms, −0,5…+1 f; sapuan 8–24 f → swell rendah sepanjang gestur; batas babak → dentum ≤ 0,5 dtk. Potong keras = klik atau senyap; whoosh hanya untuk gerak cepat terlihat. → Niat: telinga membaca bobot gerak. → Frame: tidak ada bunyi di frame diam. → Penonton (hipotesis): gerak terasa berbobot. → Gagal bila ekor dipotong tanpa fade (koreksi Irfan). → Bukti: 93, 94-k13, 23. Belum didengar.

**SD3 Energi lewat lapisan musik.** Musik konstan di bawah VO; babak baru = instrumen masuk (bass di kata pertama, drum di babak akhir), bukan riser. Pemicu: sebelum klik kirim/logo, stem musik turun 0,3–0,8 dtk; bed ambien tetap. → Niat: naik-turun organik tanpa mencekik VO. → Frame: klimaks punya ruang. → Penonton (hipotesis): merasakan babak tanpa diberi tahu. → Gagal bila riser di tiap kalimat. → Bukti: 93, 65, 23; stop-down 07, 35, 49, 94-k13. Belum didengar.

## 6. Anti-contoh (`.../../motion-graphic/cookbook/contoh-gagal/`)
- `04-builder-trap-biru-gelap.jpg`: navy + kotak biru melayang. Kondisi: dunia digelapkan seragam agar "terasa tech"; tidak ada pemisahan bidang.
- `13-narasi-di-prompt.jpg`: "template." raksasa di prompt. Kondisi: kata VO butuh tempat, kolom input paling dekat; terbaca sebagai perintah.
- `20-inset-kecil-di-kanvas-kosong.jpg`. Kondisi: aset kecil dipasang apa adanya sebagai inset berbayang; frame jadi slide.

## 7. Dua contoh kerja
**A. Demo Jadisatu Canvas 16:9, 12–18 dtk.** VO: "Tinggal tulis brief singkat, Canvas susun papan referensi, pilih satu layout, langsung jadi."
Sebelum (uji transfer, GAGAL): wallpaper blur 10 px + overlay hitam 0,62; jendela #141518 1382×756 px; pita y 70–135 px; 4 kata VO hilang; variasi B terseleksi sebelum diklik; push 1,48×.
Sesudah: foto bukit siang tajam; jendela #17181C 1100×620 px (x 410–1510, y 300–920); dot-grid dan dock dibuang. Pita y 160–232 px, 72 px #141518 di atas langit (≥ 4,5:1): "Tinggal tulis brief singkat," 12,0 → "Canvas susun papan referensi," 13,4 → "pilih satu layout," 15,0 → "langsung jadi." 16,3–17,8. Input diketik "Promo kopi susu gula aren · 4:5 · hangat"; 13,4 papan 3 ubin + push 1,25×; kursor klik ubin B di 15,9, baru saat itu sorotan + 2 handle; 16,3 sapuan dari B membuka layout final. Suara: 13,4 satu pop untuk seluruh papan; 15,9 klik; 16,3 swell sepanjang sapuan; tick per tampil −18 dB.
Alasan: yang salah dunianya. Latar redup membuat panel larut; kata hilang karena pita tak diberi ruang; push dikecilkan karena pita dan jendela berbagi tinggi.

**B. Hook Jadisatu 16:9, 0–3,2 dtk.** VO: "Bikin desain promosi malah kelihatan template?"
Sebelum (LULUS DENGAN CATATAN): 6 penanda (grid, label dimensi, gembok, dst.); "template?" 220 px di kotak solid + 4 handle (tiga penekanan); 3 SFX dalam 3 dtk.
Sesudah: kanvas #F4F4ED polos; poster kopi 480×600 px (x 720–1200, y 320–920) + dua kartu gema bergeser 18 px (metafora "seragam"). Satu baris y 170–258 px, 88 px #141518: "Bikin desain" 0,0 → "promosi malah" 0,9 → "kelihatan template?" 1,9–3,2 (beat diperpanjang, VO tidak dipercepat). Di onset "template": sorotan #0739CF 25 % + 2 handle. Kamera drift 1,04×. Satu klik di frame sorotan; potong berikut senyap.
Alasan: konsep sudah benar; dibuang penanda tanpa fungsi terucap dan penekanan kedua-ketiga.

## 8. Pertanyaan pembeda + status bukti
1. Sebagian besar kalimat menunjuk aksi software nyata? Tidak → tema lain.
2. Ada VO? Tidak → bunyi boleh rapat ala sting.
3. Wajah > 40 % durasi? Ya → tema ini sisipan demo.
Status: gerak terverifikasi hanya 17, 63, 93, 94, 96; bunyi belum didengar; dampak penonton hipotesis; tick `per-word` vs 93 senyap dicatat untuk Irfan. Angka turunan penulis (bukan referensi, uji saat still): push ≤ 1,25× saat ada pita, tepi atas jendela ≥ 250 px, jendela ≤ 65 % lebar.
Catatan (1 kartu): vakum musik + 3 tingkat puncak (94); pengantar menempel 1,76× di atas kata kunci (24); redaman B-roll stok (68).
