# 04 · Cognition story

> **Status: standar kualitas Irfan.** Video ini target yang harus dicapai, bukan contoh opsional.
> Sumber: Cognition story (dokumenter narator, foto arsip; kreator tidak tercatat), file `founded_De9ykdsOC_X.mp4` · 9:16 (720×1280, 29,97 fps), 87,2 dtk · Frame: `../../guide/referensi/sheets/04-cognition-story.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/04-k*.jpg` · Bedah lengkap: `ukuran.md` (data mentah 11 Nov); catatan Gemini lama di `../../guide/referensi/README.md`
> Kedalaman bedah: **dalam**
> Isi dicek: benar cerita Cognition (Scott Wu, kontes coding, Scale/Alexandr Wang, "PayPal mafia", Founders Fund). Batas: sumber 720p (1 px = 0,08 % tinggi); semua angka dari satu video.

**DNA (satu kalimat):** Foto arsip dan kartu polos (merah, arang, kertas abu) berganti ±1 kali per detik dengan push/pan kecil, sementara satu baris teks kecil selalu terkunci di garis tengah layar, mencampur serif miring tipis dan sans tebal dengan ukuran yang sama; seluruh frame dilapisi raster titik halus.
**Cocok untuk:** cerita bisnis/tokoh bernarator, dokumenter pendek berbasis foto arsip dan logo · **Tidak cocok untuk:** talking head, tutorial UI, konten ceria berwarna banyak
**Kata kunci gaya:** editorial, arsip, merah-arang, raster, cepat-tenang
**Diambil untuk:** nama file "founded_De9ykdsOC_X (diduga Cognition story)": nama tidak menyebut bagian; lihat bagian terkuat. Bagian terkuat: **teks** (campuran serif miring + sans tebal di garis tengah) dan **sistem kartu warna + ritme**.

## PENGIKAT (diambil utuh dari SATU kiblat; ini yang membuat video terasa satu keluarga)

### 1. Warna & tekstur
- Tiga latar kartu saja: merah `#BE0011`–`#CE080E` (sudut ±13 % lebih gelap, `#A6000E`), arang rata `#151515` (tanpa vinyet), kertas abu `#D9D9D9`–`#E3E3E3` dengan grain kasar (simpangan piksel 37–46).
- Satu aksen di luar palet: pita oranye HRT `#D65F10` di atas hitam `#000000` (16–17 dtk).
- Seluruh frame (foto, merah, logo) dilapis **raster titik halus** (periode ±2,6 px di 720p, puncak FFT 270× rata-rata; terlihat jelas saat di-zoom). Di kartu HRT ada pinggiran RGB tipis (chromatic aberration).
- Grade foto arsip: hangat dan gelap (rata-rata RGB 67/51/39), vinyet kuat (sudut bawah L 22 vs pusat 62). B-roll kota dibuat nyaris monokrom dingin.
- Kliping majalah ditaruh sebagai benda fisik di atas merah, dengan bayangan/cahaya miring (merah 75 di kanan atas vs 161 di kanan bawah).

### 2. Teks
- Font paling mirip: serif miring kontras tinggi ramping (≈ Instrument Serif Italic) + sans grotesk tebal rapat (≈ Inter Display Bold / Neue Haas Grotesk Display Bold). Dua keluarga saja.
- **Ukuran sama**, bukan beda ukuran: tinggi kata 2,0–2,8 % tinggi frame untuk keduanya; x-height sans ±1,5–1,7 %, serif ±1,1–1,4 %. Penekanan murni lewat **bobot** (kepadatan goresan sans 0,24–0,44 vs serif 0,10–0,15), bukan ukuran/warna/kotak.
- Pola frasa: kata sambung serif miring, kata kunci sans tebal ("*what* **Wang told**", "*and* **coding contests.**", "*they want to* **find**"). Frasa netral seluruhnya serif ("*it's what the*", "*A few months*").
- Posisi: pusat vertikal 49,8–50,7 % di SEMUA adegan berteks (foto, merah, UI). Horizontal di tengah blok (pusat kata 38–60 %); lebar blok 8–47 %. Satu baris, 1–4 kata.
- Adegan logo: caption kecil di **atas** logo (y 34,5 %, tinggi 2,3–2,9 %), logo tetap di y 50 %. Kartu HRT: caption tepat di atas pita (y ±32 %).
- Warna: putih di foto/merah/arang/UI; hitam di kertas abu. Tanpa kotak, bayangan, atau stroke.
- Masuk: kata menumpuk dalam satu baris ("they want" → "they want to find"), lalu baris diganti utuh. Logo muncul dengan reveal kiri→kanan ("Cognit|ion") atau dari kabur-besar ke tajam (Scale). Tanpa slide/bounce terlihat pada sampel 0,5 dtk. Durasi animasi per frame: tidak terukur (sampel 2 fps).

### 3. Ritme
- Cut mentah 122 = 83,9/menit, shot median 0,57 dtk (termasuk kilat montase). Digabung (cut < 0,25 dtk dianggap satu): 87 cut = 59,9/menit, median 0,8 dtk, rata-rata 1,0 dtk, terlama 4,5 dtk (logo/UI). `pace_read.py`: 65,4 cut/menit, median 0,7, event visual 65/menit, bicara 4,6 suku kata/dtk.
- Cepat: pembuka 0–3 dtk (tumpukan foto, cut tiap 2–3 frame) dan penutup 84,5–86 dtk (kilat montase 14 cut dalam 1,8 dtk). Paling lambat 45–60 dtk (10 cut per 15 dtk) saat UI produk Cognition.
- Porsi (hitung mata, sheet 1 dtk, 87 frame): foto/footage ±55 %, kartu merah ±16 %, kartu logo ±16 %, UI gelap ±6 %, majalah/berita ±5 %, kartu merek ±2 %.
- Kartu merah = jeda napas berisi frasa sambung saja ("it's what the", "they", "In 2024"); logo = setiap nama perusahaan disebut.

## TEKNIK (boleh dipinjam referensi lain; selalu dikenakan pengikat kiblat)

### 4. B-roll / footage
- Foto arsip asli tokoh (pesta ulang tahun, kontes, panggung), potret studio, foto kelompok; stok: layar bursa, uang dolar, gedung Wall Street, kantor trading.
- Literal ke ucapan: nama orang → potretnya ("Alexander", "Scott Wu"), "coding contests" → layar terminal tua, "$4 billion" → uang, "the profit" → papan NYSE, "paypal mafia" → foto PayPal mafia.
- Perlakuan: penuh layar tanpa bingkai, kecuali kliping Forbes (benda fisik 55 % tinggi × 70 % lebar) dan tangkapan berita (kartu terang).

### 5. Motion graphic
- Kartu logo: logo asli monokrom di tengah, lebar 40–51 % frame, tinggi wordmark 3,8–4,9 %; caption angka/kata kerja di atasnya ("built companies", "worth", "$100 billion.").
- UI produk: dua jendela kode gelap kecil di tengah layar arang, teks narasi menimpa di y 50 %.
- Kartu merek HRT: pita oranye 16:9 (34 % tinggi, penuh lebar) di hitam, logo tersusun dari balok-balok putih.
- Pembuka: tumpukan foto/potongan kartu kertas bergeser masuk dari kanan, lalu zoom tembus ke satu foto.
- **Skala subjek:** satu subjek besar per frame: potret tokoh ±90 % tinggi × ±55 % lebar; wajah close-up mengisi frame; logo kecil (≤ 5 % tinggi) di lautan latar kosong.
- **Kedalaman:** umumnya 2 lapis (foto + teks) + raster di atas; kliping = 3 lapis (merah, kertas fisik, bayangan); pembuka = 2–3 kartu foto bertumpuk dengan offset. Kartu warna rata, tanpa paralaks.

### 6. Kamera & transisi
- 41 shot ≥ 0,7 dtk diukur (ORB + affine, `shots_cam.py`): push 15, pull 8, pan geser 9, diam 8, sisanya kartu polos (tak terukur).
- Push umum +2 sampai +30 % per shot (tipikal ±8–11 % dalam ±1 dtk, laju ±10 %/dtk); pull −2 sampai −30 %; pan geser 3–43 % lebar tanpa skala (foto meluncur).
- Transisi: hampir semua hard cut; pembuka = tumpukan kartu + zoom-through (+107 % dalam 1,1 dtk); penutup = kilat montase. Tidak ada whip/morph terlihat.

### 7. SFX
- earshot: 511 event (5,9/dtk), label 31 ui/pop, 15 hit (sub bass drop), 3 riser, 1 whoosh; AST mendeteksi "single-lens reflex camera" di 0–33 dtk (bunyi rana).
- Transien frekuensi tinggi (> 4 kHz) jatuh di 51 % cut vs 33 % acak; hentakan bass di 25 % cut vs 9 % acak: SFX menempel pada sebagian cut, bukan semua.

### 8. Musik
- Beat hip-hop/trailer dengan sub bass, perkusi orkestra, pizzicato (earshot stem); 123 bpm (librosa + ears.py), cenderung mayor (C, margin kecil).
- Mix −14,1 LUFS, true peak +0,5 dBFS (menyentuh clip), LRA 2,8 LU. Stem musik −18 s.d. −26 dB per 10 dtk, paling keras di 10 dtk akhir (−18,2).
- Bagian (earshot): 0–25 dtk "inspirational corporate", 25–33 dan 47–60 dtk lebih ramping, 33–47 funk, 60–87 dtk kembali penuh; narasi VO terus menerus.

## Proporsi terukur (11 Nov, dari video sumber; % terhadap frame 720×1280)

| Jenis adegan | Kata kunci (% tinggi) | Kata sambung | Posisi teks | Skala subjek | Kedalaman |
|---|---|---|---|---|---|
| Foto arsip + teks (k1) | 2,3–2,7 (sans tebal) | 2,0–2,3 (serif miring), rasio ±1,1 | y 50 %, di tengah, menimpa dada/badan | satu tokoh ±90 % tinggi | foto bervinyet + teks + raster |
| Kartu merah (k2) | 2,3–2,7 | 2,1–2,8 | y 50 %, satu baris | tanpa subjek | merah rata, sudut −13 % |
| Logo terang (k3) | caption 2,3–2,9 | sama | caption y 34,5 %, logo y 50 % | logo 40–51 % lebar, ≤ 5 % tinggi | kertas abu + grain kasar |
| Logo gelap (k4) | caption 2,6 | sama | caption y 34 %, logo y 50 % | logo ±51 % lebar, 4,4–4,9 % tinggi | arang rata |
| UI gelap (k5) | 2,3–2,7 | ±2,2 | y 50 % menimpa jendela kode | 2 jendela kecil di tengah | arang + UI redup + teks |
| Kartu merek (k6) | 2,3 | 2,3 | y ±32 %, di atas pita | pita 34 × 99 % | hitam + pita oranye + balok |
| Kliping majalah (k7) | Tidak terukur: tanpa teks narasi di frame | – | – | kliping 55 × 70 % | 3 lapis: merah, kertas, bayangan |
| Kolase pembuka (k8) | 2,3–2,6 | ±2,2 | y 50 % | 2–3 kartu foto bertumpuk | foto + kartu + teks |

- Rasio kata kunci : kata sambung **±1,0–1,3** (sama ukuran); bedanya bobot. Ini kebalikan kartu 18 (rasio 3–5).
- Teks selalu jatuh di pita y 49–51 % kecuali adegan logo/pita (caption naik ke 32–35 %).

## Cek kemiripan (dipakai juri saat menyandingkan still)
- Pusat vertikal teks 49–51 % tinggi frame (caption logo 32–35 %); satu baris, 1–4 kata.
- Tinggi kata 2,0–2,8 % frame; serif miring dan sans tebal **sama tinggi** (rasio ≤ 1,3), beda hanya bobot.
- Hanya dua keluarga huruf: serif miring tipis untuk sambung, sans grotesk tebal rapat untuk kata kunci.
- Latar kartu hanya merah ±`#BE0011`, arang `#151515`, atau abu kertas `#D9D9D9`–`#E3E3E3`; maksimal satu aksen lain (oranye) di seluruh video.
- Raster titik halus terlihat di zoom 4× pada foto dan kartu merah; kertas abu ber-grain kasar; arang rata.
- Foto arsip hangat-gelap dengan vinyet (sudut jauh lebih gelap dari pusat), penuh layar tanpa bingkai.
- Logo monokrom lebar 40–51 % frame, tinggi ≤ 5 %, di y 50 %, sisanya kosong.
- Satu subjek besar per foto (tokoh ±90 % tinggi atau wajah penuh), bukan banyak objek kecil.
- Ritme: ±60 cut/menit (shot median 0,7–0,8 dtk), push kecil ±10 % per shot pada foto.

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
