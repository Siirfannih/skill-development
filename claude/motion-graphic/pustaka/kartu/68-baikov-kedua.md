# 68 · Baikov kedua "hijau tumbuh" (promo brand desain, 47 dtk)

> **Status: standar kualitas Irfan.** Video ini target yang harus dicapai, bukan contoh opsional.
> Sumber: baikovphilipp (Instagram, unduhan ssspin.io), file `pustaka-video/mac/baikovphilipp_ssspin.io_1793345363.mp4` · 16:9 (736×414, 30 fps), 47,3 dtk · Frame: `../../guide/referensi/sheets/68-baikov-kedua.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/68-k*.jpg` · Bedah lengkap: `ukuran.md`
> Kedalaman bedah: **dalam** (batas: sumber hanya 414 px tinggi, 1 px = 0,24 % tinggi; kata kecil bisa meleset ±10 %)

**DNA (satu kalimat):** Promo brand bermotion "tumbuh": satu dunia hijau (gelap pekat ↔ terang krem-limau) tempat kalimat diketik/dipilih seperti di Figma, dan satu maskot bunga kuning yang terbang menjadi pemicu transisi antar adegan.
**Cocok untuk:** promo brand/agensi desain, launch produk SaaS/app, manifesto singkat · **Tidak cocok untuk:** klip podcast/wajah, tutorial panjang, konten berita
**Kata kunci gaya:** brand-motion, glow, bersih tanpa grain, satu hue, playful-premium
**Diambil untuk:** nama tidak menyebut bagian; lihat bagian terkuat (teks kinetik bergaya UI + transisi dipicu objek). Nama file asli: "baikovphilipp (video Baikov lain, 47 dtk)".

## PENGIKAT (diambil utuh dari SATU kiblat; ini yang membuat video terasa satu keluarga)

### 1. Warna & tekstur
- Satu hue hijau, dua dunia: gelap `#08261C` (latar) → `#12503B` (tengah) → glow teal `#18A579`; terang `#FDFEEE` → `#E6FFD3`, pusat limau `#E9FF7E`.
- Satu aksen kuning-limau `#C1E63A` (median semua piksel aksen; varian `#A3CF3A`) untuk kata kunci, maskot bunga, kursor, kotak sorot.
- Teks: krem-putih di gelap, hijau tua `#2B6741` di terang.
- Tekstur: TIDAK ada grain (std high-pass 0,0 di area rata). Kedalaman dari gradien buram besar: cincin/blob glow raksasa (lebih besar dari frame) yang bergeser pelan, bukan vignette tetap (rasio luma sudut/pusat 0,34–2,27, berubah per adegan).
- Footage digrade dingin-pudar, saturasi median 31–37 (dari 255), di-blur kuat (Laplacian var 9–72 vs UI 182).

### 2. Teks
- Font: grotesk sans, `a` dua tingkat, `g` satu tingkat, `t` terpotong miring; paling mirip General Sans / Satoshi. Dua bobot: Regular (kata sambung) + Bold (kata kunci).
- Penekanan lewat BOBOT + WARNA, bukan ukuran: "Everything" bold limau vs "starts with a" regular putih, tinggi sama (rasio 1,0); "grow" bold di kotak seleksi bergagang ala Figma (rasio 1,15); "Ideas" bold di pita sorot limau; "how it looks" bold limau di baris terakhir lockup.
- Dua ukuran: kalimat pendamping objek cap 4,3–4,8 % tinggi; kata/lockup sendirian cap 7,4–10,6 %; satu kata tipografi raksasa ("GROWTH") cap 11,6 %.
- Kata per tampil: 1 kata (Idea, Sketch, Question, GROWTH, CLARITY) sampai 1 kalimat 4–6 kata; lockup penutup 7 kata ditumpuk 5 baris rata kiri.
- Posisi: kiri-tengah (pusat x 27–40 %) saat ada objek di kanan; tengah (x 51 %) hanya untuk CTA; teks menempel ke UI (di layar monitor footage, di samping kartu cuaca, di busur cincin "Just flow and simple").
- Watak masuk sigap per huruf/per kata: diketik dengan kursor balok limau ("Beca▬"), huruf "Question" jatuh acak ke tempatnya, pil "Spark" meluncur dari kursor panah, kata ditulis pada busur kurva, fade per huruf kiri→kanan ("It's how"). Keluar: dihapus/disapu oleh objek terbang.

### 3. Ritme
- ffmpeg scene 0,25: 6 cut keras (7,6/menit, `pace_read.py`), shot median 5,7 dtk; tapi video satu alur kontinu: ±18 tableau dalam 47 dtk (±23/menit, median ±2 dtk), event visual 32/menit.
- Babak: 0–9 dtk gelap, kata tunggal cepat (Idea→Sketch→Question tiap ±1,5 dtk); 10–23 dtk footage + terang (lebih lambat, foto ditahan 4 dtk); 24–37 dtk UI gelap; 38–47 dtk lockup + CTA terang, tahan 3 dtk di akhir.
- Gelap↔terang bergantian 4 kali; jeda musik 0,5–1,2 dtk tepat di pergantian babak (2,1 / 4,8 / 8,3 / 16,3 / 19,0 dtk).

## TEKNIK (boleh dipinjam referensi lain; selalu dikenakan pengikat kiblat)

### 4. B-roll / footage
- Hanya 2 klip stok (±9 dtk, 19 %): orang di depan monitor desain (di-blur, jadi latar teks) dan wanita dengan laptop (foto berbingkai persegi 60×61 % di latar terang).
- Perlakuan: grade dingin pudar, blur latar, dibungkus elemen brand (cincin hijau melingkari kepala, titik grid di layar). Footage menggambarkan "Turning ideas into experiences" dan "Not clutter. Not waiting. Just flow and simple".

### 5. Motion graphic
- Kosakata: maskot bunga kuning (bintang 8 kelopak) + cincin glow besar + kubus kaca bercahaya + UI dashboard 3D (kartu cuaca "Hello, Lucy", gauge 45 %/60 %) + kursor/kotak seleksi ala alat desain + busur kurva dengan teks.
- Ucapan → gambar: "grow" = bunga di dalam kubus kaca; "Design shapes the journey" = dashboard terakit dari panel kaca; "crafted to move" = bunga dan bola bergerak.
- **Skala subjek:** satu subjek sedang, bukan banyak objek kecil: kubus kaca ±27 % L × 50 % T; foto 60 × 61 %; dashboard 48 × 53 %; kartu cuaca 33 × 30 % (miring); bunga transisi 19 % L. Subjek di kanan/tengah, teks di kiri.
- **Kedalaman:** 3 lapis: (1) gradien/cincin glow buram raksasa, (2) subjek tajam berkilau (tepi neon, glass), (3) partikel kecil & bunga di depan. Di adegan tipografi terang: kata yang sama diulang 4–5 baris di belakang dengan kontras sangat rendah. Bayangan lembut di bawah kartu UI; panel kaca transparan bergaris tepi teal.

### 6. Kamera & transisi
- Kamera virtual DIAM saat teks/objek tertahan (ORB affine antar 0,5 dtk: skala 0,99–1,01, geser < 1 %). Gerak ada di dalam layer: objek terbang, kartu miring 3D.
- Footage: nyaris diam (drift ≤ 2,5 %/0,5 dtk). Dashboard 25–28 dtk: dolly/rotasi 3D (skala 0,87–0,98 per 0,5 dtk).
- Transisi dipicu OBJEK, ±0,5 dtk: bunga/pil cahaya terbang menyapu (8,5→10), wedge cahaya membuka footage (9,5), lingkaran mask membuka dunia terang (13,5→14), busur kurva "swoosh" menyeret ke adegan berikut (17–18), bunga besar meledak lalu panel kaca muncul (29,5), blob kuning menyapu gelap→terang (41,5→42).

### 7. SFX
- earshot: 242 event (5,1/dtk), 96 berlabel: 69 UI pop (chat pop, bubble pop, glockenspiel/celesta), 8 nada, 2 foley, 1 whoosh.
- Kosakata: pop lembut/bubble untuk tiap kata/objek muncul, kilau glockenspiel/celesta untuk bunga & glow, klik keyboard untuk ketikan. Hampir tanpa whoosh: transisi bersuara "ting", bukan desis.
- Level: puncak SFX −0,5 s/d −6 dBFS, +12–26 dB di atas bed; setara suara VO, bukan di bawahnya.

### 8. Musik
- Corporate inspirasional, pizzicato strings + bel/celesta (earshot, 3 seksi sama), ada VO narator pria.
- Tanpa grid beat jelas (pulse clarity 0,04); librosa 117 bpm (tidak stabil, pakai sebagai kisaran).
- Master keras: −12,8 LUFS, true peak +0,3 dBFS, LRA 4,1 LU; 0–17,6 dtk −14 LUFS, sisanya −12 LUFS (naik di babak UI).
- Level musik terhadap VO: Tidak terukur: tidak ada stem terpisah (demucs tidak dijalankan).

## Proporsi terukur (11 Nov 2026, dari video sumber 736×414; % tinggi/lebar frame)
| Jenis adegan | Kata kunci (cap, % T) | Kata sambung | Posisi teks | Skala subjek | Kedalaman |
|---|---|---|---|---|---|
| Kalimat di latar gelap (k1) | 4,8 bold limau | 4,8 (rasio 1,0) | kiri-tengah, pusat (40, 50) | pil "Spark" + kursor kecil | glow buram + teks + partikel |
| Objek kaca + kalimat (k2) | 5,6 bold di kotak seleksi | 4,3 (1,3) | kiri-bawah, pusat (29, 85) | kubus 27 × 50 %, kanan | glow + kaca neon + bunga |
| Footage + teks (k3) | 7,9 ("Turning"), "Ideas" di pita | ±6 x-height | menempel layar monitor, (38, 46) | footage penuh, blur | footage buram + grid titik + teks |
| Tipografi terang (k4) | 11,6 ("GROWTH") | — | kanan-tengah (66, 49) | tanpa subjek | kata diulang 4–5 baris samar di belakang |
| Foto + cincin (k5) | tidak terukur (teks miring di busur) | — | mengikuti busur kurva | foto 60 × 61 % tengah | latar terang + foto + cincin di depan kepala |
| UI dashboard (k6) | 6,5 ("shapes") | 3,4 | kiri (30, 61), UI di kanan | dashboard 48 × 53 % | grid panel gelap + kaca + glow tepi |
| Lockup kalimat (k7) | 9,7 bold limau (baris akhir) | 9,7 regular (1,0) | 5 baris rata kiri, x 10–45 % | tanpa subjek; garis bunga | glow + outline bunga tipis |
| CTA terang (k8) | 7,7 ("Ready to grow?") | 7,7 | tengah (51, 51) + ikon bunga | tanpa subjek | gradien terang saja |

- Rasio kata kunci : kata sambung 1,0–1,3: penekanan dari bobot/warna/kotak, ukuran hampir tidak beda.
- Teks tidak pernah di 10 % tepi atas/bawah kecuali k2 (y 80–89 %).

## Cek kemiripan (dipakai juri saat menyandingkan still)
- Hanya satu hue hijau (latar gelap ±`#08261C` atau terang ±`#FDFEEE`) + satu aksen limau ±`#C1E63A`; tidak ada warna lain selain footage.
- Latar bersih tanpa grain; kedalaman dari glow/cincin buram yang lebih besar dari frame.
- Kata kunci dibedakan bobot bold + warna limau (atau kotak seleksi/pita sorot), tinggi sama dengan kata sambung (rasio ≤ 1,3).
- Kalimat pendamping objek cap 4–5 % tinggi; kata tunggal/lockup 7,5–10,5 %; satu kata tipografi raksasa ±11–12 %.
- Teks kiri-tengah (pusat x 27–40 %), subjek di kanan; hanya CTA yang di tengah.
- Satu subjek sedang per adegan (27–60 % lebar), tajam dan berkilau di atas latar buram; partikel/bunga kecil di lapis depan.
- Footage di-blur dan dingin-pudar, dibungkus elemen brand (cincin, grid titik), tidak tampil polos.
- Ada maskot/objek berulang (bunga kuning) yang muncul di hampir tiap adegan dan memicu transisi.
- Kamera virtual diam saat tertahan; gerak dari objek, bukan zoom/pan global.

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
