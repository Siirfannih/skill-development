# 61 · Contohkonten2 "kunci merah + kata raksasa di belakang kepala" (talking head edukasi, merah gelap)

> **Status: standar kualitas Irfan.** Video ini target yang harus dicapai, bukan contoh opsional.
> Sumber: file unggahan Irfan `Contohkonten2.mp4` (kreator: pembicara India, ruang kerja ber-dekor Batman, CTA "comment THARUN") · 9:16 (720×1280, 30 fps), 88,7 dtk · Frame: `../../guide/referensi/sheets/61-contohkonten-c.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/61-k*.jpg` · Bedah lengkap: `~/audit-claude/deep/61-contohkonten-c/ukuran.md`
> Kedalaman bedah: **dalam** (batas: sumber 720p, 1 px = 0,08 % tinggi; SFX dari tag earshot = petunjuk, bukan pasti)

**DNA (satu kalimat):** Talking head bergrade hangat-gelap yang diselingi panel merah-darah bervignette (split 50/50 atau layar penuh) dan kata kunci condensed raksasa yang berdiri DI BELAKANG kepala pembicara, dipukul sub-boom.
**Cocok untuk:** listicle edukasi "N rahasia/cara", tips belajar/produktivitas, klip talking head dengan sponsor produk · **Tidak cocok untuk:** konten tenang/premium minimal, demo UI, cerita panjang tanpa poin bernomor
**Kata kunci gaya:** merah gelap, sinematik, punchy, YouTube-edukasi, condensed bold, glow
**Diambil untuk:** "Contohkonten2.mp4": nama tidak menyebut bagian; lihat bagian terkuat. Terkuat: (1) teks kata kunci di belakang kepala + caption per 1–3 kata, (2) sistem warna merah + split panel, (3) ritme jump-cut dengan punch-in.

## PENGIKAT (diambil utuh dari SATU kiblat; ini yang membuat video terasa satu keluarga)

### 1. Warna & tekstur
- Dua dunia warna saja: footage oranye-cokelat gelap (latar ruangan `#3C2116`–`#42261A`, tengah `#63402D`, luma median 42/255, saturasi tinggi) dan panel merah darah.
- Panel merah: tengah `#790A10`–`#873D42`, pojok `#3C0002`–`#440002`; vignette radial kuat (luma tengah ±120 → tepi ±23). Kartu judul penuh: pojok `#31080C`, tengah ber-glow `#91232B`.
- Tekstur panel: noda/kertas tipis seperti dinding lusuh (grain halus, std 0,26 di area polos). Footage tanpa grain tambahan.
- Aksen: krem-emas bercahaya untuk judul dan label kunci (`#F9E6B6`, `#FDE5CD`, "Never" `#ECCFA4`) dengan glow oranye; satu aksen kuning untuk baris penting di daftar ("11 years before my birthday").
- Teks lain putih bersih (`#FFF9F8`). Pada judul berhuruf terpisah (P U R E) huruf yang tidak aktif merah muda pudar `#C08083`, huruf aktif putih.
- Pengikat merah: semua grafik duduk di merah yang sama; tidak ada warna latar lain kecuali kartu produk sponsor (biru muda bawaan produk).

### 2. Teks
- Dua lapis teks: **kata kunci** condensed bold kapital (paling mirip Bebas Neue / Anton) dan **narasi** sans semibold (SF Pro Display / Inter SemiBold), putih dengan bayangan lembut.
- Kata kunci: tinggi kapital 9,5–15,4 % tinggi frame ("66 SECONDS" 9,5; "THARUN" 10,1; "FORGET" 11,6; "WASTE" 15,2; "R" di PURE 15,4); lebar blok 65–82 % frame.
- Caption narasi: ascender ±2,7 % (dengan descender 3,6–4 %); kata kecil pengantar ("which is actually a complete", "& that makes it much more", "comment") 1,6–1,8 %.
- Rasio kata kunci : caption **±4–6×**; kata kunci : kata pengantar **±6–9×**.
- **Posisi terhadap subjek:** kata kunci di sepertiga atas (pusat y 14–25 %, x 50 %), DI BELAKANG kepala: rambut menutupi bagian huruf (rotoscope). Kata pengantar kecil di atasnya, disebar rata selebar 77 % frame; kadang kata sisa mengapit di bawah kiri-kanan kepala ("of … time").
- Caption narasi di tengah dada (pusat y ±50–61 %, x 50 %), lebar 37–54 %; di split 50/50 caption duduk tepat di garis sambung panel.
- CTA penutup: kata kunci di dada (y ±65 %) dengan tanda kutip besar, "comment" di atas, "& I will share them" di bawah.
- Kata per tampil: caption 1–3 kata; kata pengantar muncul **per kata** mengikuti ucapan; kata kunci sekaligus.
- Watak: caption dan kata kunci pop seketika (1 frame, tanpa easing), keluar dengan cut. Kata kunci di kartu judul (FORGET) melesat dari kanan-atas dengan skala besar → mengecil, blur gerak, ±0,4 dtk.
- Penekanan: ukuran (bukan warna), glow krem untuk judul, huruf aktif terang vs pudar untuk akronim, kuning untuk satu baris.

### 3. Ritme
- 39 cut = **26,4 cut/menit**, shot median **2,0 dtk** (0,07–5,9). Per babak: 0–30 dtk 26/mnt, 30–60 dtk 30/mnt, 60–89 dtk 23/mnt.
- `pace_read.py` (deteksi kasar) 12,2 cut/menit, event visual 58/menit, bicara ±5,6 suku kata/dtk → kategori energi.
- Porsi waktu (dari frame 0,5 dtk): wajah 56 %, split panel 28 %, grafik layar penuh 15 %. 16 dtk terakhir (72–89) hanya wajah + jump cut.
- Pola: hook wajah + progress bar (0–3 dtk) → kartu judul penuh → tiap "rahasia" dibuka kartu kunci penuh → penjelasan bergantian wajah/split.

## TEKNIK (boleh dipinjam referensi lain; selalu dikenakan pengikat kiblat)

### 4. B-roll / footage
- Hampir tanpa b-roll nyata; satu sisipan foto catatan kertas (±25 dtk, "rough diagram") dan produk sponsor dipegang ke kamera (55–57 dtk).
- A-roll: satu kamera, medium shot di meja, grade oranye gelap, latar ruangan redup dengan aksen dekor.
- Hook memakai **progress bar** palsu di atas (0:00–1:06, garis putih tipis 0,3 % tinggi, isi merah) sebagai janji durasi.

### 5. Motion graphic
- Ikon/ilustrasi tunggal di panel merah yang menggambarkan kata: ikon orang di meja ("after the class"), kepala hitam + otak biru menyala ("working memory"), tanaman tumbuh + penyiram ("short-term → long-term"), kartu produk + daftar bahan yang muncul per baris.
- Motif utama: **kunci** (tangan memegang 5 kunci berlabel "Secret 1–5" di busur), lalu tiap rahasia = satu kunci close-up bercahaya oranye dengan label bernomor, latar judul "FORGET" buram di belakang.
- Daftar/akronim: judul condensed + item kecil per baris (THE PURE FRAMEWORK, Example 1/2).
- **Skala subjek:** satu subjek per panel. Otak ±20 % lebar × 23 % tinggi frame (±45 % tinggi panel); kartu produk ±18 × 13 %; kunci close-up memanjang ±45 % lebar diagonal; tangan + kunci kartu judul ±45 % lebar × 55 % tinggi. Kepala pembicara 22–25 % tinggi (medium), 45 % di punch-in CTA.
- **Kedalaman:** 3 lapis di kartu kunci (judul raksasa buram di belakang → kunci tajam bercahaya → partikel/glow); 3 lapis di adegan wajah + kata kunci (ruangan → kata kunci → kepala di depan). Split panel 2 lapis (latar merah bervignette + ikon). Bayangan lunak pada ikon/produk.

### 6. Kamera & transisi
- A-roll: **push-in digital pelan** ±5 % per shot 2 dtk (diukur +4,7…+6,6 %, ke arah wajah) atau diam; jump cut berganti framing ±12–17 % (75,5 dtk +13,6 %, 76,6 dtk −16,7 %, 14,0 dtk +12,7 %).
- Kartu kunci: kamera mendorong/menggeser sepanjang kunci (skala −23…+29 % per shot, translasi hingga 35 % tinggi).
- Transisi: hampir semua cut keras. Masuk kartu judul: **flash putih 1 frame** + teks slam-in. Kunci: zoom-through dari kartu kunci ke kunci berikutnya.
- Pemicu: kata kunci ucapan ("forget", "waste", angka rahasia) → kartu/kata raksasa; kalimat penjelasan → split.

### 7. SFX
- earshot: 31 bunyi non-suara bertag ≈ **21/menit** (13 hit/sub-boom, 9 whoosh, 4 ui pop/ding, 3 pop, 2 riser).
- Sub-boom (±200 Hz, 1,8–2 dtk) pada slam kartu judul dan kunci (3,1; 5,1; 25,9; 31,2; 49,2; 54,6; 77,7 dtk), 14–28 dB di atas bed.
- Pop/ding pada teks muncul (14,0; 23,9; 39,3 dtk). Whoosh di babak 2–3 untuk pergantian adegan (44–45, 51, 63, 72, 80–83 dtk). Riser sebelum kunci baru (42,4; 61,4 dtk).
- Level SFX setara puncak suara (−1,5…−5 dBFS).

### 8. Musik
- Bed beat elektronik (tag earshot techno/trap/house/funk, lemah) ±108 bpm, berganti tiap babak ±10–25 dtk; vocal chop.
- **Drop musik** 75,5–78 dtk (−20 LUFS, musik nyaris hilang) tepat sebelum babak CTA, lalu masuk lagi.
- Mix keras: −14,2 LUFS, true peak +1,7 dBTP (clip), LRA 2,8 LU; musik dekat di bawah suara (bed p5 −33 dB, median −19 dB).

## Proporsi terukur (11 Nov, dari video sumber 720×1280; % terhadap frame 9:16)
| Jenis adegan | Kata kunci (% tinggi) | Kata sambung | Posisi teks | Skala subjek | Kedalaman |
|---|---|---|---|---|---|
| Wajah + caption (k1) | — | caption 2,7 (asc) | tengah dada, y 50–61 %, lebar 37–54 % | kepala 22–25 % tinggi | ruangan gelap + wajah + teks |
| Wajah + kata raksasa (k2) | 9,5–15,2 | 1,6–1,8 per kata | sepertiga atas y 14–25 %, lebar 65–82 %, **di belakang kepala** | kepala 25 % | ruangan → teks → kepala |
| Kartu judul penuh (k3) | 11,6 (FORGET, glow) | 1,4 ("Never", "Anything") | atas y 14–34 %; subjek di bawah | tangan + 5 kunci 45×55 % | merah vignette + kunci + glow |
| Split judul (k4) | 15,4 (P U R E) | 1,25–1,6 | panel atas, y 12–41 % | tanpa subjek | panel 50 % atas / wajah 50 % bawah |
| Split ilustrasi (k5) | — | caption 2,7 di garis sambung | y ±50 % | otak 20×23 % frame | merah + ikon berbayang |
| Kunci close-up (k6) | label 1,5–1,8 | — | menempel kunci | kunci ±45 % lebar diagonal | judul buram → kunci → glow |
| Split produk (k7) | — | daftar ±1,3 | kanan produk, per baris | produk 18×13 % | merah + produk |
| CTA (k8) | 10,1 (THARUN) | 1,5 | dada y 58–75 %, tanda kutip | kepala 45 % (punch-in) | ruangan → wajah → teks |

- Garis sambung split selalu di **y = 50,0 %** (640/1280 px), terukur di 7 frame.
- Batas ukur: ±1 px = ±0,08 %; tinggi kapital dari blok putih (glow bisa menambah ±0,3 %); skala subjek ilustrasi dari grid visual ±2 %.

## Cek kemiripan (dipakai juri saat menyandingkan still)
- Hanya dua dunia warna: footage oranye-cokelat gelap dan panel merah `#790A10`→`#3C0002` dengan vignette kuat (tepi ≤ 25 % luma tengah).
- Kata kunci condensed bold kapital tinggi 9–15 % frame, di sepertiga atas, dan **sebagian tertutup kepala/rambut** (teks di belakang subjek).
- Caption narasi 1–3 kata, ascender ±2,7 %, di tengah dada (y 50–61 %), putih + bayangan; rasio kata kunci : caption ≥ 4.
- Kata pengantar kecil (1,6–1,8 %) disebar rata di atas kata kunci, bukan satu baris rapat.
- Split screen tepat 50/50: grafik merah di atas, wajah di bawah, caption di garis sambung.
- Panel/kartu memuat SATU subjek bercahaya atau berbayang (kunci, otak, produk), bukan banyak objek kecil.
- Judul kartu: krem-emas `#F9E6B6` dengan glow oranye; satu aksen kuning untuk baris penting.
- Ritme ±26 cut/menit, shot median ±2 dtk; tiap shot wajah punya push-in pelan ±5 % atau jump cut ±12–17 %.
- Ada drop musik singkat sebelum CTA; sub-boom di setiap slam kartu judul.

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
