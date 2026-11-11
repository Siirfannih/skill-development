# Gaya: minimal-premium (talking head edukatif)

Template gaya untuk klip podcast/talking head yang tenang dan "mahal": wajah pembicara bergantian dengan adegan bertekstur kertas (lukisan, garis biru, ilustrasi kasar, grafik bercahaya). Diturunkan dari bedah ref 18 (`guide/referensi/joseph-arthur-brooks.md`, Irfan 11 Nov). Sutradara memilihnya di gerbang 1; setelah dipilih, file ini adalah rujukan visual utama Editor. `SKILL.md` Hard Gate tetap menang.

Cocok: wawancara, filosofi, psikologi, karier, edukasi personal. Tidak cocok: promo produk cepat, demo UI (pakai gaya lain).

## 1. Token
| Item | Nilai |
|---|---|
| Kanvas | 1080×1920, 30 fps (ikuti sumber bila 25/24) |
| Ritme | ±27 cut/menit, shot median ±1,7 dtk; wajah ±35 % durasi, adegan ±65 % |
| Latar | hitam `#0B0B0C` · kertas putih `#F1EFEA` · biru penuh (adegan teks) |
| Aksen | satu biru elektrik ±`#1F5FE0` (sampel 720p ref, kalibrasi ulang bila ada sumber HD); teks selalu putih di gelap, hitam di kertas |
| Font | Inter (narasi: Regular/SemiBold, kata kunci: Bold) + Playfair Display Italic / Bold Italic (kata istimewa). Keduanya OFL, ada di `engines/talking-head-reels/assets/fonts/` (Inter Medium, Playfair) atau Google Fonts |
| Tekstur | kertas halus di semua latar; cat + kertas kasar di lukisan; noise/cat kasar dengan tepi "berdarah" di ilustrasi; kain kasar untuk profil tokoh. Tekstur **menempel ke layer dan ikut bergerak**, kekuatan ≤ 50 % dari kesan pertama (revisi Joseph #3) |
| Look | vignette lembut; B-roll: tepi digelapkan + sedikit blur agar mata ke titik fokus |

## 2. Caption (dipakai di semua adegan)
- Satu tampilan ≤ 5 kata. Pilih 1 kata terpenting: Inter Bold atau Playfair Bold Italic, besar, di tengah.
- Kata lain kecil (Inter Regular, ±30–40 % tinggi kata besar) ditempatkan di **celah** atas-kiri / bawah-kanan kata besar, bukan berbaris rata.
- Sesuai `decision-guide.md` §2: satu baris satu ukuran, serif hanya untuk penekanan. Caption ≤ 2 baris (aturan 44).

## 3. Menu adegan (ID dipakai di `PLAN.json → adegan`)
| ID | Adegan | Pakai saat kalimat… | Build |
|---|---|---|---|
| MP-01 | Wajah + caption | membuka, mengumumkan kategori/poin baru, ekspresi | A-roll tight/wide bergantian di cut, push 3 %, caption §2 di bawah dagu |
| MP-02 | B-roll + teks | bisa ditunjukkan sebagai adegan nyata | B-roll 9:16, tekstur kertas tipis, tepi gelap + blur, teks §2 di ruang kosong |
| MP-03 | Lukisan + teks | poin filosofis, cerita, emosi | lukisan domain publik, tekstur cat + kertas, teks mengelilingi subjek lukisan, kamera slide-in 8–12 f |
| MP-04 | Garis + teks | deretan kata kunci yang terhubung | latar hitam/kertas, garis aksen menggambar menuju teks, terputus oleh teks, lanjut ke teks berikutnya; kamera mengikuti ujung garis |
| MP-05 | Garis + ilustrasi | progres beberapa fase | garis horizontal + titik putih penanda objek, atau zigzag + kamera pan memperlihatkan objek kiri/kanan |
| MP-06 | Adegan teks (kutipan) | kutipan, kalimat penutup | latar kertas putih atau biru penuh, tekstur kasar, tanda kutip, kalimat di tengah |
| MP-07 | Ilustrasi tengah | ide utama yang bisa jadi satu gambar | ilustrasi bertekstur di separuh bawah, tepi berdarah ke tengah; teks di ruang sisa |
| MP-08 | Ilustrasi samping | dua hal sekaligus | tokoh/bentuk di satu sisi, teks di sisi lain (boleh berputar mengelilingi) |
| MP-09 | Objek / callout tokoh | menyebut orang, benda, foto pribadi | satu objek atau foto asli, label menempel objek, reveal kasar |
| MP-10 | Grafik | angka, tren, kata yang diulang ("naik dan naik") | latar gelap bertekstur, grid garis putih tipis bercahaya, bola aksen sebagai ujung kurva, kamera mengikuti bola; satu langkah per kata yang diulang |

## 4. Logika penempatan (dari peran kalimat)
| Peran kalimat | Adegan |
|---|---|
| Pembuka (3 dtk pertama) | MP-01: penonton terhubung dulu dengan pembicara, kata kunci besar sudah di frame 0 (aturan 27) |
| Mengumumkan kategori/poin baru | MP-01 |
| Menjelaskan/menggambarkan isinya | MP-02 / MP-03 / MP-07 (tunjukkan, jangan ceritakan) |
| Kalimat dua bagian ("X, yang artinya Y") | MP-01 lalu ganti adegan di tengah kalimat |
| Menyebut orang | MP-09 callout tokoh |
| Cerita pribadi | MP-09 dengan foto asli pembicara (hak pakai dicek) |
| Lelucon | MP-07 ilustrasi pembicara / pilihan yang berputar |
| Angka, tren, pengulangan | MP-10 |
| Poin besar berisi deretan kata kunci | MP-04 |
| Penutup | MP-06 dengan tanda kutip |
Jenis adegan yang sama tidak dua kali berturut bila beat ketiga bisa berbeda.

## 5. Audio
- Musik: string/orkestra lembut (ref: pizzicato ±108 bpm, tanpa drum), bed rendah di bawah suara; dipilih lewat `audio.md` §14.0A–B seperti biasa (profil "premium-edukatif" masih PENDING).
- SFX (aturan 43): klik halus untuk tiap teks, highlighter/gores untuk garis & grafik, whoosh lembut untuk transisi, riser kecil sebelum adegan besar.
- Level akhir mengikuti standar mix kita (`audio.md`), bukan angka ref (−20 LUFS).

## 6. Aset
- Lukisan: domain publik (Wikimedia Commons, museum open access); B-roll: Pexels/Pixabay; foto tokoh: milik sendiri atau berlisensi. Setiap file dicatat di `CREDITS.md` proyek (sumber, lisensi, URL) sebelum build.
- Ilustrasi: SVG/PNG jadi lalu diberi tekstur; tidak menggambar orang mirip tokoh nyata.

## 7. Biru di latar gelap (aturan 15)
Sampai Irfan memutuskan baris PENDING tentang aturan 15: di latar hitam garis memakai **putih bercahaya** dan biru hanya untuk bola/titik kecil; garis biru penuh hanya di latar kertas putih. Teks tidak pernah biru di latar gelap.

## 8. Cek QA khusus gaya (tambahan `analysis-qa.md` §16)
- [ ] Setiap adegan punya peran kalimat di `PLAN.json` dan cocok dengan §4.
- [ ] Desain teks adegan pertama kuat; kata kunci pembuka tetap di adegan yang sama (revisi Joseph #1).
- [ ] Tidak ada potongan kasar antar adegan grafis: teks grafik ditahan sampai kalimatnya selesai (#2, #4).
- [ ] Tekstur ikut bergerak dengan layernya dan tidak menutupi subjek (#3).
- [ ] Adegan ilustrasi bertahan cukup lama untuk dibaca (≥ waktu baca aturan 46) (#5).
- [ ] Adegan kutipan punya tanda kutip (#6).
- [ ] `CREDITS.md` lengkap untuk lukisan, B-roll, foto.

## 9. Engine
Default Remotion (build per adegan, `build.md`). Adegan MP-01/02/03/09 juga bisa dirender `engines/talking-head-reels` (EDL: `full` + `color: true` untuk lukisan, look diganti tekstur kertas); belum diuji untuk gaya ini.
