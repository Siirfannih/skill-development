---
name: tema-editorial-metaphor-canvas
description: Cara berpikir tema kanvas editorial (satu benda/garis per gagasan, teks menempel, kanvas polos); buka setelah router memilih tema ini.
---
# Tema: editorial-metaphor-canvas

## 1. Identitas
Satu gagasan per adegan jadi satu benda, garis, atau aksi UI kecil di kanvas polos; kalimat menempel pada benda itu. Pikiran berganti = dunia berganti.
Cocok: esai VO tanpa wajah, opini, hook manifesto, konsep produk tanpa demo. Tidak cocok: wajah memimpin, demo UI, mayoritas angka, arsip foto.
Ukuran: px pada sisi 1080 (lebar 9:16, tinggi 16:9).

## 2. Keyframe contoh
Folder: `../../guide/referensi/sheets/keyframes/`
- `88-k6-lingkaran-satu-dial.jpg`: 9:16 putih; "one dial," duduk di tepi atas satu lingkaran biru solid (±19 % lebar); "one" hitam, "dial," masih abu. Empat elemen, >60 % kosong. Yang diambil: satu benda + ruang kosong + teks menempel. Serif dan halo biru pucat di gambar ini bagian gaya referensinya: dipakai hanya bila alasannya berlaku (REF-SPEC); default tema ini teks sans dan lingkaran datar, karena halo pucat menurunkan kontras teks.
- `80-k1-kinetik-gelap.jpg`: 16:9 hitam; "Ada" dan "jarak" sans tebal putih segaris, di antaranya garis ukur tipis bertick, "antara" kecil abu di bawahnya.
- `96-k6-urutan-polaritas.jpg`: 8 still; terang↔gelap tiap 1–3 dtk, 1–3 elemen per adegan, puncak "never" putih raksasa di hitam (kemiringan/italic di gambar tidak punya peran sistem di tema ini; ambil skala dan polaritasnya). Abaikan pita mono kecil di bawah (anti-pola).

## 3. Keputusan visual (ukuran dan hex yang teramati di contoh)
**V1 Satu benda, sisanya kosong.** Satu benda/diagram per adegan, lebar 520–700 px; ≥ 55 % kanvas polos. → Niat: gagasan terbaca sekali lirik bila tanpa tandingan. → Frame: 2–4 kelompok elemen. → Penonton (hipotesis): paham metafora < 1,5 dtk. → Gagal bila ikon pendukung ditambah "biar jelas"; sah dilanggar sekali bila naskah bilang "ramai". → Bukti: 20-k6-koper-merah, 88-k6, 88-k13-otak-jaringan-titik.

**V2 Teks menempel benda.** Default: blok teks di atas tepi benda, jarak 40–60 px. Pemicu: latar berganti < 1,4 dtk/shot → kunci teks di poros 47–55 % tinggi. Pemicu: benda/UI mengisi ≥ 55 % tinggi bawah → teks ke pita atas (pusat 12–26 % tinggi). Benda di satu sisi → teks di sisi lawan, dekat benda. → Niat: mata satu langkah dari benda ke kalimat. → Frame: satu unit. → Penonton (hipotesis): tidak berburu kata. → Gagal bila teks di pojok jauh dari benda (S-V13, teks-visual berjauhan). → Bukti: 88-k6, 88-k7; 40-k4, 80-k3, 80-k8, 37-k3 (belum dilihat bergerak).

**V3 Kutub netral, satu keluarga aksen per video.** Krem #F4F2EC atau arang #0E0E0C datar; satu kemunculan aksen aktif per frasa, pada benda bermakna (titik, tanda salah, busur). Pemicu: adegan vonis → aksen jadi bidang penuh, teks putih. → Niat: warna jadi kursor makna. → Frame: satu titik warna. → Penonton (hipotesis): warna = inti. → Gagal bila aksen biru jadi teks di latar gelap (S-T5) atau tiap gagasan dapat warna sendiri. → Bukti: 40-k1, 20-k3, 88-k5, 64-k1; bidang vonis 37-k2.

**V4 Relasi digambar.** Kata relasional (jarak, menuju, mengoreksi) → garis ukur, busur, kurva, atau aksi UI tanpa bingkai ponsel. → Niat: hubungan dipahami dari bentuk, bukan ikon. → Frame: satu garis ganti dua kartu. → Penonton (hipotesis): "oh, jarak ini". → Gagal bila naskah butuh UI merek lengkap (pindah tema). → Bukti: 80-k1, 80-k2, 88-k3, 96-k1, 96-k2.

**V5 Ganti adegan lewat polaritas.** Default: potong keras terang↔gelap di onset kata/ketukan, ≥ 0,5 dtk antar-lompatan, tanpa crossfade. Pemicu: dua adegan berbagi gagasan → busur tumbuh ±0,8 dtk lalu keluar tepi menarik adegan berikut. Kedalaman: skala, susunan, atau dotgrid; tanpa blur dan bayangan kecuali sebagai sistem material beralasan (NEGATIF 2). → Niat: ganti pikiran terasa fisik. → Frame: tanpa frame buram bertumpuk. → Penonton (hipotesis): babak baru terasa. → Gagal di footage arsip (kedip). → Bukti: 96-k6, 88-k11; 64-k2 (belum dilihat bergerak).

## 4. Kinetic typography
**KT1 Dua kutub skala, tanpa kotak.** Kata sambung 64 px, kata isi 150 px (2,3×); rasio antar-teks satu frame 1,0–1,3× atau ≥ 1,8×; kata titik balik sendirian ≥ 4× (≥ 260 px), maks 2 kali per video. Kotak hanya bila latar berganti hitam↔putih di belakang huruf. → Niat: urutan baca tanpa pil. → Frame: sambung menempel di atas isi. → Penonton (hipotesis): topik tertangkap dari kata besar. → Gagal bila kata kunci mini di kanvas kosong, atau rasio 1,4–1,7×. → Bukti: 80-k7, 88-k7, 37-k3 (1,9×), 96-k3; kotak sah 64-k3.

**KT2 Penekanan di tempat, satu cara per frasa.** Default: kalimat tampil redup (#9A9894 terang, #8A8A84 gelap), kata menyala penuh 3 f sebelum onset VO, posisi tetap. Pemicu: pembalikan makna → tukar satu token di baris tetap (≤ 4 token). Jangan sekaligus menyala + berwarna + membesar. Tuturan > 2,5 kata/dtk → frasa 2–3 kata; VO tidak dipercepat, jendela beat memanjang. → Niat: mata tidak melacak teks melompat. → Frame: baris diam, nilainya bergerak. → Penonton (hipotesis): tahu kata yang ditekan. → Gagal bila pop tiap kata, atau redup terlalu gelap di hitam. → Bukti: 88-k6, 96-k4; kata tenggelam 88-k9.

**KT3 Satu keluarga sans.** SemiBold isi, Regular sambung. Default satu keluarga; huruf kedua (serif/italic) sah bila punya peran tetap dan frekuensi (NEGATIF 1, REF-SPEC atau merek), bukan karena "rasa editorial"; kata penutup ditekan lewat bobot, ukuran, atau warna. → Niat: kontras gaya huruf berharga karena langka. → Frame: satu suara. → Penonton (hipotesis): terasa dikurasi. → Gagal bila serif dipakai demi "rasa editorial". → Bukti: 80-k1, 40-k1, 20-k8; pelanggar A6 (jangan ditiru): 88-k7, 73-k8.

**KT4 Teks terikat geometri.** Kata jadi ujung garis tumbuh, label menempel busur, angka UI menyusut di tempat. Gerak bersamaan sah bila satu sumber (garis mendorong kata, kamera membawa semua; hipotesis); hindari ≥ 2 animasi independen mulai di frame sama. Drift kamera lambat tak dihitung. → Niat: kalimat bekerja secara visual. → Frame: gerak baca = ilustrasi. → Penonton (hipotesis): konsep lebih diingat. → Gagal bila efek literal (scan, glitch) di kata biasa. → Bukti: 88-k11, 96-k2; 80-k1, 37-k4 (belum dilihat bergerak).

## 5. Sound design (semua belum didengar)
**S1 Peran musik dari narator.** Dengan VO: bed stabil ±13 dB di bawah VO, tak dipompa di jeda. Tanpa VO: musik memegang struktur, cut di ketukan. Aransemen ganti per babak, ramp ≥ 250 ms. → Niat: esai abstrak butuh konsentrasi. → Frame: benda boleh bertahan 2–4 dtk. → Penonton (hipotesis): ikut penalaran. → Gagal bila build-drop di bawah esai. → Bukti: loudness vault 88, 96, 37.

**S2 Kata senyap, benda berbunyi.** Rekomendasi tick `accent-only` (mode lain sah via RESEP). Bunyi saat benda lahir, garis bergerak, UI berubah; satu benda satu file. → Niat: tiap bunyi punya peran. → Frame: kata menyala tanpa interupsi. → Penonton (hipotesis): bunyi = "ada yang baru". → Gagal dua arah: klik tiap kata (S-A11, spam) atau benda besar masuk bisu (S-A4, sepi). → Bukti teramati: 20, 96; kolom SFX kartu 88, 40, 73, 80 = rekomendasi, bukan pengamatan.

**S3 Potong polaritas tanpa whoosh.** Whoosh hanya untuk gerak cepat terlihat (pan, whip, sapuan), panjangnya menutup gerak, ≥ 1 dtk antar-whoosh; cut diam = senyap/klik pelan. → Niat: whoosh = udara bergerak. → Frame: cut tajam. → Penonton (hipotesis): tak terasa tempelan. → Gagal bila whoosh di cut diam (S-A12). → Bukti: 20, 37, 80 (vault).

**S4 Kosongkan sebelum puncak.** Sebelum hantaman titik balik, stem musik turun 0,3–0,45 dtk; bed ambien tetap. Puncak bunyi ≤ 0,1 dtk dari frame visual, isi 150–450 Hz untuk HP. → Niat: kontras dinamika memberatkan satu hantaman. → Frame: klimaks punya pasangan bunyi. → Penonton (hipotesis): titik balik terasa. → Gagal bila hening digital atau tiap kalimat dihantam. → Bukti: 37, 94-k13-peta-bunyi (lintas tema), sinkron 96.

## 6. Anti-contoh (`../../cookbook/contoh-gagal/`)
- `02-builder-trap-unik-kecil.jpg`: "unik." ±3–4 % tinggi + foto kecil di kanvas >80 % kosong, subtitle tumbuh di bawah. Penyebab: ruang kosong disalin tanpa membesarkan objek; dua lapis teks.
- `04-builder-trap-biru-gelap.jpg`: navy, garis sirkuit, kotak biru melayang, subtitle. Penyebab: "gelap" diartikan dekorasi teknologi + blob biru (S-V21), bukan satu benda bermakna.
- `01-serif-pucat-raksasa.jpg`: serif italic abu pucat menyentuh tepi, lepas dari ilustrasi, plus subtitle. Penyebab: serif demi gaya, tanpa kontras dan hubungan dengan benda.

## 7. Contoh kerja (9:16, 1080×1920)
**A. Jadisatu, hook "Posting tiap hari, tapi yang beli tetap sepi?"**
Sebelum (uji F6): gelap; bel garis 626 px, pusat y 1190; garis meja y 1450; titik biru di tombol; 3 kotak postingan 96 px redup; kalimat 104 px, "sepi?" 250 px. Cue: denyut f0, foley kertas di kotak.
Sesudah: garis meja dan kotak dibuang; bel 640 px, pusat y 1180; dasar teks 50 px di atas puncak bel; kalimat 96 px redup→putih per kata, "sepi?" 240 px (2,5×) sendirian; titik biru satu-satunya aksen. Cue: bed + room tone sejak f0, denyut rendah saat bel mendarat, tanpa foley, bel tak berbunyi.
Alasan: 5 kelompok elemen vs 2–4 di referensi; kotak merebut mata dan butuh cue kedua; "tiap hari" sudah di VO. Bel diam = makna; bunyinya menjawab pertanyaan yang harus menggantung. VO 10 kata = 4,3 dtk → jendela diperpanjang.

**B. Soalnya Gini, "Tahu belum tentu paham"**
Sebelum: navy radial; kartu "TAHU" dan "PAHAM" 420 px berdampingan + ikon bohlam/otak + bayangan; subtitle bawah; pop tiap kata, whoosh tiap kartu.
Sesudah: arang; "tahu" 160 px, x tengah 540, baseline y 640; garis ukur vertikal 3 px y 700→1180, tick 40 px; "jaraknya" 64 px abu di kanan garis (x 580, y 950); "paham" 160 px baseline y 1340. Garis tumbuh 0,8 dtk dari onset "belum"; satu nada tipis kontinu −12 dB di bawah VO selama garis tumbuh; kata senyap; potong ke krem tanpa whoosh.
Alasan: relasi digambar, ganti kartu kembar + ikon. Susunan kiri-kanan 16:9 diputar vertikal: dua kata 160 px + garis tak muat di lebar 1080. Satu lapis teks; bunyi ikut satu-satunya gerak.

## 8. Pertanyaan pembeda + status bukti
1. "≥ 70 % durasi tanpa wajah, tiap poin bisa jadi satu benda/garis?" Tidak → tema lain.
2. "VO memimpin, atau lagu?" → S1, ritme.
3. Huruf default sans penuh; huruf kedua hanya bila REF-SPEC/merek memberinya peran (NEGATIF 1).
Status: hanya 88 dan 96 dilihat bergerak; bunyi belum didengar; dampak ke penonton hipotesis.
