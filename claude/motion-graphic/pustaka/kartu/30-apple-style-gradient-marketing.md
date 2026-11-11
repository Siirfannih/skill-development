# 30 · Apple style "Gradient Marketing" (iklan Holo)

> **Status: standar kualitas Irfan.** Video ini target yang harus dicapai, bukan contoh opsional.
> Sumber: `Apple Styele.mp4` (folder asal: Motion; Instagram p/Deq1nUPMqtr) · 16:9 (1276×718), 30 fps, 44,7 dtk · analisis asal: canvas-skill-library, reference_id LOC-e42107cea92d · Frame: `../../guide/referensi/sheets/30-apple-style-gradient-marketing.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/30-k*.jpg` · Bedah lengkap: `canvas-skill-library: skills/canvas-reference-director/references/cards.json (reference_id LOC-e42107cea92d)`; data ukur 11 Nov: `ukuran.md` (audit deep/30); audit lama `GrokAgent/reference-videos/AUDIT-2NOV-A-apple-motion.md`
> Kedalaman bedah: **dalam** (ukur ulang dari video sumber 11 Nov: tinggi huruf, posisi, hex, shot list, kamera ORB, LUFS, earshot, librosa)
> Batas: sumber 718 px tinggi (1 px = 0,14 %); nama font tidak bisa dipastikan dari piksel.

**DNA (satu kalimat):** Layar putih bersih, satu kalimat hitam tepat di tengah, diselingi kata raksasa dan objek yang dibalut gradien pink-oranye-ungu buram; tiap gerak cepat lalu diam total, dan adegan berganti lewat morph yang punya alasan.
**Cocok untuk:** iklan/penjelasan produk digital banyak fitur, video UI dengan VO pendek berjeda, launch SaaS · **Tidak cocok untuk:** talking head, tutorial satu fungsi yang butuh kedalaman, konten tanpa produk/UI untuk diperlihatkan
**Kata kunci gaya:** putih, gradien pink-oranye-ungu, premium, bersih, morph, cepat-lalu-diam
**Diambil untuk:** `Apple Styele.mp4`: "Apple Style" → tampilan visual dan gerak UI (bagian 1, 2, 5, 6 dibedah paling dalam). Bagian terkuat: warna + gerak UI.

## PENGIKAT (diambil utuh dari SATU kiblat; ini yang membuat video terasa satu keluarga)

### 1. Warna & tekstur
- Latar `#FFFFFF` murni (median 100 % adegan teks); tidak ada grain, tidak ada vignette.
- Gradien (k-means piksel jenuh, 6 frame): oranye-merah `#F16046` 24 %, magenta `#E6469B` 22 %, ungu-pink `#CC56C2` 18 %, merah-pink `#EF4C6C` 17 %, ungu `#A66ADB` 14 %, biru `#7794F0` 6 %. Biru hanya di tepi; inti hangat.
- Gradien selalu BURAM (tanpa tepi keras): blob/kolom vertikal yang di-smear, mengisi huruf hero, bola, pill, bar chart. Tidak pernah dipakai sebagai latar rata satu warna.
- Teks: hitam `#000000`–`#010102`; abu nonaktif daftar `#CECCCF`; abu daftar tugas `#ADADAD`; putih hanya di atas gradien ("A business", "domain").
- Footage/foto produk dibingkai kartu sudut bulat di atas putih (inset ±3 % kiri-kanan, ±5 % atas-bawah); grade netral dingin (meja `#C5C5C8`, dinding `#3E3F43`).

### 2. Teks
- Font: grotesk geometris rapat (paling mirip Satoshi / General Sans; perkiraan dari bentuk), Medium untuk kalimat, Black untuk angka. Satu keluarga saja.
- Kalimat: satu baris, SATU ukuran, pusat y 49–51 % (6 dari 7 adegan kalimat), pusat x 50 % (kecuali daftar dan task list).
- Tinggi kapital/asender (% tinggi frame): kalimat 7,9–10 ("Worth knowing about" 7,9; "Chief…Officer" 8,6; "Autopilot" 9,3; "Generating" 10; "tryholo.ai" 7,9); x-height 5,5–6,7.
- Hero satu kata: 49–52 % ("You", "Now"), lebar sampai 87 % frame; 5–6× tinggi kalimat. Angka: 31,7 %, Black, hitam pekat di atas bar gradien.
- Tidak ada pembeda kata kunci vs kata sambung di dalam kalimat (rasio 1,0). Penekanan lewat: (a) kata hero sendirian, (b) warna aktif hitam vs abu di daftar + titik gradien, (c) ikon/maskot disisipkan di antara kata ("Chief [maskot] Marketing [maskot] Officer", "Generating [emoji]").
- Kata per tampil: 1 (hero), 1–3 (kalimat), daftar 4 item sekaligus.
- Masuk: kata dibangun per kata dari kiri (CMO: lebar 13→40→58→78 % dalam 0,9 dtk), hero tumbuh dari baseline (lebar 59→87 % dalam 0,67 dtk), typing ("domai|"), huruf bergradien disapu jadi hitam. Keluar: smear/morph ke adegan berikut, bukan fade.
- Posisi terhadap subjek: kalimat di tengah DIKELILINGI kolase ("Worth knowing about", "Autopilot"); di adegan HP kalimat putih DI ATAS objek (y 13–35 %); daftar di KIRI (x 11–40 %) dengan kartu UI di kanan.

### 3. Ritme
- 24 shot dalam 44,7 dtk = 32 shot/menit, median 1,7 dtk (hitung manual: cut keras + morph ganti ide). Cut keras 11 (14,8/menit). `pace_read.py` hanya menangkap 5 cut (morph tak terbaca); event visual 40/menit.
- Cepat di depan: 0–15,3 dtk rata 1,4 dtk/shot; 15,3–44,7 dtk rata 2,3 dtk. Shot terpanjang 6,1 dtk = daftar fungsi (item ganti tiap ±1,2 dtk).
- Setiap build berakhir DIAM total: "holo" 11,0–12,2 dtk dan "Chief Marketing Officer" 38,8–39,5 dtk beda antar-frame 0,0.
- Babak: masalah (You/business/idea) → "Now" → "Meet holo" → fungsi (daftar) → Autopilot → kerja 24 jam → CMO → angka → alamat situs.

## TEKNIK (boleh dipinjam referensi lain; selalu dikenakan pengikat kiblat)

### 4. B-roll / footage
- Footage hanya 2 shot (±5 dtk, 11 %): render meja + monitor "All Day/All Night" dan foto HP di meja; keduanya dalam kartu bulat di putih, tanpa teks besar.
- Kolase iklan/foto produk asli (hot sauce) 4 adegan: mengelilingi kalimat, grid 3×3, sebaran bebas yang dipan. UI asli (Instagram, email, Google) sebagai kartu contoh.

### 5. Motion graphic
- Kata → objek: "o" di "Now" berubah jadi bola gradien; "Meet" jadi logo; pill gradien jadi kolom alamat; toggle → "Autopilot". Grafik selalu menggambarkan kata yang diucapkan.
- Bola gradien dengan chip kota mengorbit (jangkauan global); maskot 3D putih ber-jetpack menembus asap (agen yang bekerja); daftar tugas bergulir terpotong tepi kanan; counter digit roll + bar chart gradien.
- **Skala subjek:** SATU subjek besar per shot: hero kata 49–52 % tinggi; bola ±40 % lebar; maskot + asap 70 % lebar; HP + tangan ±60 % tinggi; angka 74 % lebar. Kolase = banyak objek kecil (6–12 % lebar) tapi selalu mengelilingi satu kalimat di tengah.
- **Kedalaman:** 2–3 lapis: blob gradien buram di belakang → subjek tajam (HP, maskot, kartu UI) → elemen depan (asap putih, ikon 3D/emoji melayang, ikon pill). Ikon depan sebagian buram. Bayangan lembut hanya di objek 3D; kartu UI dengan tepi gradien glow. Tidak ada paralaks kamera terukur.

### 6. Kamera & transisi
- Kamera (ORB, skala/translasi antar awal-akhir shot): daftar tilt naik 22,7 % per pergantian item (skala 1,00); Autopilot pull ×0,89; monitor pull ×0,76; grid produk pull ×0,85; kolase sebaran pull ×0,83 dalam 0,5 dtk lalu pan 4 %; foto HP pull ±×0,9 + tilt 14 % dengan gerak meluruh (beda/frame 9,1→1,2) = ease-out. Bola/maskot: gerak objek, bukan kamera.
- Tidak ada overshoot: semua gerak meluruh ke 0 lalu diam.
- Transisi: 11 cut keras (tiap cut punya bunyi: 11/13 cut ada onset ≤ 120 ms); morph kata→objek (You→pill, "o"→bola, Meet→logo 0,4 dtk); zoom-out melewati Autopilot ke monitor (22,3–23,6 dtk, ramp 1,3 dtk); whip pan kolase 32,5–33,3 dtk (0,8 dtk, puncak di tengah = ease in-out); partikel titik gradien (2,7 dtk).

### 7. SFX
- earshot (0–27 dtk): 16 hit/sub-drop, 12 UI pop/klik, 7 drum, 4 whoosh, 1 riser, 3 not pluck/ding; ±4 onset/dtk. Riser 4,74 dtk menuju cut 4,90; whoosh 8,23 di morph "Now"→bola.
- Pakai: pop/klik di tiap kata/item masuk, sub-drop di cut besar, whoosh di morph, ding/glockenspiel di objek muncul. SFX sejajar musik (+5…+40 dB di atas bed sesaat), tidak ditekan.

### 8. Musik
- earshot: tech house → glitch hop → house dengan vocal chop, "confident and cool". librosa 172 bpm (paruh = 86, cocok audit lama ±89).
- Intro 0–10,4 dtk tipis (energi < 250 Hz 47 %, −18,9 dB); bass/kick masuk di "Meet" 10,4 dtk (< 250 Hz 79–89 %, −13,8…−15 dB).
- Mix −14,1 LUFS, TP −0,8 dBTP, LRA 5,2 LU (terukur ulang). Audit 2 Nov: musik −2,4 dB relatif VO, VO unggul +12,4 dB di 1–4 kHz.

## Proporsi terukur (11 Nov, dari video sumber; % terhadap frame 16:9)
| Jenis adegan | Kata kunci (% tinggi) | Kata sambung | Posisi teks | Skala subjek | Kedalaman |
|---|---|---|---|---|---|
| Hero gradien (k1) | 49–52 (kapital), lebar 74–87 % | tidak ada (1 kata) | pusat x 56–59, y 45–50 | kata = subjek | huruf berisi gradien buram di putih |
| Kalimat + kolase (k2, k6) | 7,9–9,3 | sama (1,0) | tengah y 50 %, dikelilingi kolase | kartu ±6–12 % lebar (perkiraan mata), 8–14 buah | putih + kartu tajam + chip |
| Hero UI di gradien (k3) | 18,8 (asender), x 12,8 | sama | atas, y 13–35 %, di atas HP | HP+tangan ±60 % tinggi | gradien buram → HP → ikon 3D depan |
| Maskot (k4) | tanpa teks besar (pill 2–4) | – | pill alamat di tengah | maskot+asap 70 % lebar | gradien → maskot → asap depan |
| Daftar + kartu UI (k5) | aktif 11,9–12,4 | abu, ukuran sama | kiri x 11–40, y 20–81 | kartu UI x 51–97 % (±46 % lebar), y 6–90 % | putih + kartu ber-glow gradien |
| Footage monitor (k7) | 4,7 (di layar) | – | di layar monitor, tengah | kartu footage 94×90 % | footage dalam kartu bulat |
| Kalimat + ikon sisip | 8,6 | 5,8 (x-height) | tengah y 51 %, lebar 78 % | ikon setinggi huruf | putih rata |
| Angka + bar (k8) | 31,7 | – | tengah y 35–67 % | bar 100 % lebar, separuh bawah | angka hitam di depan bar gradien |

## Cek kemiripan (dipakai juri saat menyandingkan still)
- Latar putih murni; tidak ada grain/vignette; warna hanya di gradien buram pink-oranye-ungu (biru maksimal tepi).
- Kalimat satu baris, satu ukuran, kapital 8–10 % tinggi frame, pusat y 48–52 %, x 50 %.
- Kata hero sendirian 48–55 % tinggi frame, berisi gradien, lebar 70–90 %.
- Angka besar 30–32 % tinggi, Black, hitam pekat di depan bar gradien.
- Satu subjek besar per shot (40–70 % lebar); bila banyak objek kecil, mereka mengelilingi satu kalimat di tengah.
- Kedalaman 2–3 lapis: blob buram di belakang, subjek tajam, satu elemen depan (asap/ikon) sebagian buram.
- Footage/UI selalu dalam kartu sudut bulat di atas putih, bukan full-bleed.
- Daftar: item aktif hitam, lainnya `#CECCCF`, ukuran sama, kolom kiri x 11–40 %.
- Teks putih hanya di atas gradien; teks di putih selalu hitam.

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
