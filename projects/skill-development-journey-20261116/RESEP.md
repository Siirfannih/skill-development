# RESEP · Skill Development (G1, Sutradara claude2, 16 Nov malam)

Kartu: 83-barsolmedia-kt-talking-head (mode A, teks di sekitar kepala) · 07-baikov-shapes (mode B/C, bidang & bentuk besar) · 37-pixel-character-skill-file (tokoh pixel)

## 0. Kenapa ronde komponen pertama gagal (Irfan 16 Nov: "jelek, aneh, tidak sesuai prinsip")
Komponen dibangun sebelum RESEP ini dan dinilai di atas latar abu polos, bukan footage, tanpa sanding dengan keyframe kiblat. Hasilnya bahasa UI generik: chip/pil kecil bertitik + panah di bidang kosong, teks bergaris tepi murah, maskot seperti stiker. Semua itu **dilarang** di video ini:
- Tidak ada elemen < 8 % tinggi frame yang membawa makna utama; tidak ada "chip" pil kecil berderet sebagai visual utama.
- Tidak ada bidang kosong > 40 % frame tanpa bentuk/subjek (07 selalu penuh: bidang warna + bentuk raksasa + UI besar).
- Teks bergaris tepi tebal (stroke) dilarang; keterbacaan di atas footage dicapai lewat posisi di area gelap, bayangan lembut, slab di belakang kepala, atau tag semi-transparan (83 K2).
- Still dinilai **hanya** di atas footage asli (`edit/wajah.mp4`) atau di kanvas finalnya, berdampingan dengan keyframe kiblat (`guide/referensi/sheets/keyframes/83-k*.jpg`, lembar 07, lembar 37).

## 1. Bahasa visual per mode
**Mode A · wajah penuh (kiblat 83).** Teks hidup di sekitar kepala, selalu dari ucapan:
- K1 cincin kata: kata kecil-tebal (Poppins 700, huruf kecil, ±4,5 % tinggi frame, putih hangat + bayangan lembut) di busur elips mengelilingi kepala; belakang busur lewat di belakang kepala (matte). Untuk kalimat narasi berjalan.
- K2 tangga tag: kata bertumpuk diagonal di sisi wajah yang kosong (sisi kiri = pintu biru/dinding), tiap kata di tag membulat semi-transparan gelap (rgba(20,22,26,.55), blur latar 12 px); kata klimaks = tag lebih besar bergradien + bevel (pil 3D), miring 4–8°.
- K3 slab raksasa di belakang kepala: Anton 38–55 % tinggi frame, berdiri di belakang kepala (kepala menutupi sebagian huruf), huruf bergelombang sinus lalu tenang; warna mengikuti arti (coral = negatif, putih hangat = netral, hijau = terverifikasi). Footage boleh di-grade sedikit lebih gelap −12…−18 % hanya selama slab (bukan meredupkan ruang jadi hitam).
- K4 kata tunggal di dada: satu kata per tampil, putih ±4 %, saat wajah harus dominan.
- Kamera: punch-in/out di kata kunci (C01 1,04–1,16), blur gerak di potongan; keyframe + ease (curves.ts).

**Mode B/C · visual & motion graphic (kiblat 07).** Bidang warna penuh + bentuk geometris raksasa (rounded-hexagon/blob/lingkaran 60–120 % tinggi frame) yang masuk-keluar sebagai transisi + UI besar (kartu/jendela ≥ 50 % lebar frame) yang di-zoom kamera. Bidang: biru `#2E5BFF` (beat solusi) atau putih hangat `#F6F5F0` (netral); bentuk sekunder biru muda `#C9D6FF`, kuning `#FFD54A`, coral `#F97066`. Teks di bidang biru = putih, besar (Poppins 800 ≥ 9 % tinggi). Transisi khas yang berulang (satu keluarga): **bentuk raksasa menyapu frame** (rounded-hexagon putih/biru membesar dari objek ke luar frame dalam 12–16 f, `whip`), dipakai di setiap pindah A↔B/C.

**Tokoh (kiblat 37 + permintaan Irfan).** Maskot 3D di ruang (B1b) dan sprite pixel 2D di mode C (B5) adalah keluarga yang sama. Tokoh selalu besar: 20–35 % tinggi frame, tidak pernah ikon kecil berderet.

## 2. Per babak (usulan kerja, dikunci setelah storyboard Henti 1)
| Babak | Mode | Visual |
|---|---|---|
| B1 hook | A → B | f0 wajah + K4 "finally"; punch di "finally"; bentuk hexagon putih menyapu → K-01 repo GitHub penuh, wajah jadi lingkaran kanan bawah (< 3 dtk); kamera push ke centang hijau di "selesai"; slab "SELESAI" putih di atas repo. |
| B1b model | A | maskot 3D ChatGPT, Claude, Gemini muncul di kata namanya, di kedalaman berbeda sekitar kepala (Claude bahu kiri dekat kamera, ChatGPT sisi kanan kepala, Gemini kanan bawah); K1 cincin kata untuk narasi "workflow … decision". |
| B2 pain | A (+ objek) | K3 slab "AI SLOP" coral di belakang kepala, guncangan kecil; timeline patah sebagai **kartu besar 3D miring** di sisi kiri (≥ 45 % lebar), klip warna patah; "putus-putus" suku kata di klip. |
| B3 solusi | A → C → A → C | K2 tangga tag "Apple style" / "cinematic storytelling" / "template" (klimaks) di sisi kiri wajah; "template" dicoret lalu tag dilempar; sapuan hexagon → bidang biru: tabel keputusan §8a sebagai jendela putih besar (≥ 60 % lebar) di-zoom ke baris menyala; rel 5 fase = **5 ubin besar** (bukan pil) dirakit, kata "workflow" putih raksasa. |
| B4 stakes | A | K3 slab "BALIK MODAL" putih hangat bergelombang di belakang kepala, zoom pelan ke wajah; kartu paket ChatGPT Pro 20x + Claude Max 5x mendarat di sisi kiri sebagai K5 kartu 3D miring (bevel, bayangan), tanpa stroke. |
| B5 aha | C | di "kayak yang kalian lihat ini" sapuan hexagon → bidang biru: jendela transkrip Claude Code dan chat ChatGPT sebagai **dua jendela putih besar** (masing-masing ±45 % lebar) yang di-zoom bergantian; tokoh pixel 2D besar (±28 % tinggi) di depan jendela menyerahkan amplop; loop besar menutup + centang hijau di atas kartu putih. |
| B6 penutup | A | K3 slab "100% FULL AI" putih + kilat (rima dengan B1); kapsul "profesional?" / "masih kerasa AI?" sebagai K2 pil 3D bevel di kiri-kanan wajah; K4 "comment di bawah" di dada. |

## 3. Matte (prasyarat K1/K3)
Tidak ada koneksi PC→Mac (tanpa host Mac di `~/.ssh/config`), jadi Apple Vision tidak bisa dipakai. Matte di PC: Robust Video Matting (torch, sudah terpasang di mg-venv) atas `edit/wajah.mp4`; gerbang: jumlah frame matte = frame wajah, 6 frame uji tepi rambut/bahu bersih. Bila gagal 2× → lapor Irfan (tidak diam-diam membuang efek belakang kepala).

## 4. Gerbang still (G2) mulai sekarang
Lembar sanding: still kita **di atas footage/kanvas final** di kiri, keyframe kiblat yang setara di kanan, maks 960 px. Lulus bila: skala & kepadatan setara kiblat, tidak ada pelanggaran §0, arti warna benar, teks dari ucapan.
