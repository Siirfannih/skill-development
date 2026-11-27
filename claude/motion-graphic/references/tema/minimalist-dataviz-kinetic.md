---
name: tema-minimalist-dataviz-kinetic
description: Cara berpikir tema angka/grafik minimal (satu wadah data, satu aksen pemenang, angka besar + label menempel); buka setelah router memilih tema ini atau meminjam 1–2 beat angka.
---
# Tema: minimalist-dataviz-kinetic

## 1. Identitas
Satu layar = satu angka atau perbandingan di satu wadah datar, kanvas gelap atau putih hangat, satu aksen menunjuk pemenang.
Cocok: beat bukti angka (jam hemat, pesanan, omzet), recap milestone, sisipan 5–7 dtk di tema lain. Tidak cocok: argumen tanpa angka, demo UI, rasa buatan tangan.
Peringatan: 0 dari 4 kartu dilihat bergerak; semua gerak dan bunyi = hipotesis dari still + vault.
Ukuran: px pada sisi 1080 (lebar 9:16, tinggi 16:9). Angka hanya dari naskah/data, jangan dikarang.

## 2. Keyframe contoh
Folder: `../../guide/referensi/sheets/keyframes/`
- `57-k4-bar-persen.jpg`: 3:4 gelap; panel ±75 % lebar, tanpa bayangan; blok atas abu-gelap, "65%" putih Regular di dasar blok, "APY" kecil di pojok kiri-atas; blok bawah lime, "35%" dan "Match" hitam. Satu aksen, nol bold.
- `67-k2-tumpukan-foto.jpg`: 16:9; kartu putih hangat berinset di bingkai hijau-gelap; "Island Announcing" kecil tepat di atas "$400M" besar (≈ 4,4×); kartu foto buram mengapit atas-bawah.
- `67-k7-footage-statistik.jpg`: kolom 4 kartu statistik; hanya kartu teratas menyala (foto gelap + "16" mint), 3 lainnya pucat; panel foto di kanan.

## 3. Keputusan visual (ukuran dan hex yang teramati di contoh)
**V1 Satu wadah fokus.** Default: wadah 760 px lebar, pusat y 860 (9:16); di luarnya kosong. Pemicu: ≥ 3 metrik → baris dalam satu wadah, satu aktif. → Niat: relasi skala terbaca tanpa mencari di empat sudut. → Frame: semua data dalam satu bidang. → Penonton (hipotesis): nilai tertangkap sekali lirik. → Gagal bila wadah jadi kartu kecil berbayang. → Bukti: 56-k3 (±60 %), 57-k3 (75 %), 57-k6 (64 %), 58-k5 (64 %, + beam dan logo); 67 memakai kartu hampir penuh berinset.

**V2 Satu aksen aktif.** Satu aksen per video; satu elemen per frame memakainya (pemenang, baris aktif, nilai baru); sisanya putih/abu, pucat 30 %. Teks di atas aksen terang → hitam. → Niat: aksen = kursor. → Frame: satu titik terang. → Penonton (hipotesis): tahu pemenang sebelum baca. → Gagal bila tiap kategori/merek diberi warna sendiri. → Bukti: 57-k4, 58-k5, 67-k7, 67-k8; pelanggaran (jangan ditiru): 56-k5 batang merah-kuning-hijau.

**V3 Grid dan wadah redup.** Grid 2 px, opasitas ≤ 20 %; wadah = bidang datar beda nilai tipis dari latar (#1E1B16 di #110E09), tanpa border tebal, tanpa bayangan. Pemicu: kontur yang sedang jadi subjek morph → boleh putih penuh. → Niat: alat ukur bukan pesan. → Frame: data paling terang. → Penonton (hipotesis): tidak terasa slide. → Gagal bila grid seterang data. → Bukti: 56-k1, 57-k3, 58-k1, 67-k3, 67-k4.

**V4 Ledakan singkat, lalu diam.** Perubahan nilai/bentuk 0,3 dtk dengan perlambatan saat mendarat, lalu diam ≥ 0,5 dtk sebelum gerak berikut; ganti keadaan lewat morph, geser, atau cut; tanpa crossfade. → Niat: angka yang terus bergerak tak terbaca. → Frame: kontras tempo aksi/diam. → Penonton (hipotesis): nilai akhir sempat dibaca. → Gagal bila angka melompat ke nilai akhir dalam 1 frame atau ticker linear. → Bukti: vault 56 (tumbuh 0,4–0,6, diam 1,1–1,3), 57 (0,1–0,4, diam 0,15–0,5), 67 (pull-back 0,5); belum dilihat bergerak.

## 4. Kinetic typography
**KT1 Angka vs label, dua tingkat.** Default: angka 230 px Regular/Medium, label 64 px (3,6×); sah 2,4–7×; tidak ada ukuran ketiga di wadah. Label ≥ 56 px walau referensi lebih kecil. Pemicu: perbandingan kategori tanpa angka di layar → judul:label 1,0–1,3×, skala dibawa tinggi batang. → Niat: angka dibaca dulu, label mengonfirmasi. → Frame: arah baca terkunci. → Penonton (hipotesis): nilai tertangkap pertama. → Gagal bila 1,3–1,8× (bobot kembar). → Bukti: 57-k4 (±3,5×), 58-k5 (±3,3×), 67-k2 (4,4×), 67-k7 (±7×), 57-k6 (2,4×, ada tingkat ketiga); kategori 56-k3.

**KT2 Label menempel.** Label 1–3 kata menempel angka/batang (jarak ≤ 0,5 tinggi angka) atau di pojok blok sama; terpaksa jauh → satu garis rambut 2 px. Tanpa panah, legenda, kotak. → Niat: angka + label = satu unit. → Frame: sisi luar kanvas sunyi. → Penonton (hipotesis): tak mencocokkan legenda. → Gagal bila label dipindah ke sudut "biar rapi". → Bukti: 56-k3, 57-k1, 58-k5, 67-k2, 67-k4; 57-k4 sebagian.

**KT3 Satu pembeda penekanan.** Default: kata kunci berganti ke warna aksen elemen pemenang. Pemicu: frasa = tagline tanpa angka → satu kata naik ke bobot Bold keluarga yang sama, tanpa warna (huruf kedua hanya sebagai sistem beralasan, NEGATIF 1). Tak menumpuk bold + warna + pil. → Niat: penekanan tanpa memberatkan ruang. → Frame: warna menyambung judul ke batang tanpa panah. → Penonton (hipotesis): terasa dikurasi. → Gagal bila serif dipasang dengan sans bold. → Bukti: 56-k5 (hanya warna), 67-k6 (italic saja); pengecualian: 67-k8 (italic + mint), 57-k6 (pil lime di belakang tahun).

**KT4 Counter terkurva + tahan.** Counter 0,5 dtk, digit terakhir mendarat paling lambat, tahan sampai VO selesai menyebut angka (min 0,8 dtk); tabular-nums agar digit tak bergetar; nilai lama hilang sebelum nilai baru masuk. → Niat: gerak beri bobot, tahan beri waktu baca. → Frame: tak ada dua angka bertumpuk. → Penonton (hipotesis): angka terasa presisi. → Gagal bila angka hilang sebelum VO selesai menyebutnya. → Bukti: vault 56, 57, 67; Penghitung.tsx; belum dilihat bergerak.

## 5. Sound design (semua belum didengar)
**S1 Bunyi di perubahan keadaan.** Digit berputar, baris berulang, huruf judul: senyap. Satu bunyi bersih saat nilai mendarat, batang pemenang naik, kartu baru muncul. Tick (bila RESEP pilih `per-word`): klik tunggal −12…−18 dB relatif VO (LANTAI E24), jarak ≥ 100 ms. → Niat: bunyi menandai hasil, bukan proses. → Frame: diam = sedang menghitung, bunyi = terkunci. → Penonton (hipotesis): telinga tak lelah. → Gagal dua arah: tick tiap digit (S-A11, spam) atau nilai mendarat bisu di video beraudio (S-A4, sepi). → Bukti: event terdeteksi 56, 58 mengelompok di batang naik/ikon muncul; "senyap per digit" = rekomendasi kolom SFX, bukan pengamatan.

**S2 Build singkat, satu hantaman.** Riser ≤ 0,5 dtk, hantaman terkeras tepat di frame nilai pemenang, isi 150–450 Hz untuk HP; bunyi lain lebih pelan. → Niat: satu puncak punya arti. → Frame: klimaks data = klimaks bunyi. → Penonton (hipotesis): ingat angka pemenang. → Gagal bila tiap angka dihantam setara. → Bukti: 56 (riser → drop → stab +14 dB), 67 (riser → stab +30 dB).

**S3 Musik turun 0,4 dtk menjelang cut.** Hanya stem musik; bed ambien tetap. → Niat: memberi engsel antar-babak. → Frame: cut terasa disiapkan. → Penonton (hipotesis): sadar babak baru. → Gagal bila hening digital. → Bukti: 58 (0,5 dtk dan 0,4 dtk sebelum cut), 33 (lintas tema).

**S4 Mode suara dari narator.** Tanpa VO: musik ber-ketukan jelas (±110 bpm) memimpin, cut di ketukan. Dengan VO: bed lemah-ketukan (±90 bpm); layar hanya menahan angka yang diucapkan. Whoosh hanya untuk panel besar bergeser/zoom-through, bukan di cut diam (S-A12). → Niat: satu pemimpin ritme. → Frame: cut ikut ketukan/ucapan. → Penonton (hipotesis): ritme tak bertabrakan. → Bukti: 56, 67 tanpa VO; 58 ber-VO; whoosh 67 di geser panel.

## 6. Anti-contoh (`../../cookbook/contoh-gagal/`)
- `20-inset-kecil-di-kanvas-kosong.jpg`: kartu kecil berbayang di kanvas putih luas, "Line 2" jauh di kiri atas, subtitle kotak abu. Penyebab: aset kecil dipasang apa adanya; bayangan + kotak = slide.
- `17-frasa-terpisah.jpg`: "SKILL" kecil di kiri atas jauh dari "GRATIS". Penyebab: label dijauhkan dari nilai, terbaca dua pesan (S-V13, teks-visual berjauhan).
- `16-punchline-di-kotak.jpg`: "PROFESIONAL" di kotak video kecil dalam tampilan IG. Penyebab: hero dikurung di wadah kecil, skalanya hilang; di sini: angka hero jangan kecil dalam kartu.

## 7. Contoh kerja (9:16, 1080×1920)
**A. Jadisatu, "Admin 14 jam seminggu jadi 3 jam"**
Sebelum: grid 2×2 kartu metrik sama terang (ikon, gradien, bayangan), angka 72 px, label 48 px; tick tiap digit; whoosh tiap kartu.
Sesudah: latar #110E09; wadah 760×760 px, pusat (540, 860), bidang #1E1B16; "14 jam" 230 px putih di dasar blok, "admin / minggu" 64 px di pojok kiri-atas. Di kata "jadi": blok menyusut ke 3/14 tinggi (163 px) 0,4 dtk sementara counter 14→3 ikut (satu sumber gerak); blok baru terisi lime, angka hitam; tahan 1,0 dtk. Cue: counter senyap; riser 0,4 dtk → satu hantaman di frame "3" mendarat; musik turun 0,4 dtk sebelum cut.
Alasan: empat kartu sama terang tak punya pemenang; 72/48 = 1,5× (bobot kembar); tinggi blok membawa perbandingan, kartu lain tak perlu; bunyi hanya di perubahan keadaan.

**B. @siirfannih, "Dari 4 channel, cuma satu yang bawa pembeli"** (sisipan 6 dtk)
Sebelum: pie 3D empat warna merek, legenda pojok kanan bawah, persen 40 px di luar irisan; whoosh saat pie berputar.
Sesudah: putih hangat #F7F3EF; wadah 820 px, 4 baris × 200 px, jarak 24 px, pusat y 900; tiap baris angka 160 px + nama channel 64 px menempel kanannya (2,5×). Tiga baris pucat 30 %, satu baris pemenang penuh dengan angka beraksen tua (kontras ≥ 4,5 : 1 di terang). Sorot turun per baris mengikuti VO, pindah 0,3 dtk lalu diam. Cue: klik UI pelan tiap pindah (jarak ≥ 1 dtk), satu hantaman di baris pemenang, tanpa whoosh.
Alasan: warna merek per irisan = pelangi tanpa pemenang; legenda jauh memaksa mata bolak-balik; satu baris aktif membawa logika kartu aktif referensi tanpa meniru layout-nya.

## 8. Pertanyaan pembeda + status bukti
1. "≥ 60 % beat butuh angka/perbandingan?" Tidak → pinjam 1–2 beat saja.
2. "Layar cukup 1 angka + 1–3 kata, narasi di suara?" Tidak → editorial.
3. "Merek bisa 1 latar + 1 aksen?" Tidak → tema lain.
Status: 0/4 dilihat bergerak; bunyi dari deteksi otomatis, belum didengar; dampak penonton hipotesis.
Catatan (1 kartu, belum prinsip): angka/batang memotong tepi wadah lalu ditarik ke tampilan utuh hanya di 67 (+33, merek sama), belum dilihat bergerak; musik putus penuh 2,3 dtk sebelum logo hanya 67; 57 tanpa trek audio.
