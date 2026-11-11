# 26 · Kinetic typography + transition "Story of How"

> **Status: standar kualitas Irfan.** Video ini target yang harus dicapai, bukan contoh opsional.
> Sumber: `Kinetic Typography + Transision.mp4` (folder asal: Storytelling:Talkinghead/Story-context) · file 960×720 (4:3) dengan letterbox hitam 54 px atas-bawah → frame konten 960×612 (±1,57:1); kartu judul pembuka memakai frame penuh 720 · 77,8 dtk, 24 fps · analisis asal: canvas-skill-library, reference_id LOC-953e36e1e9b2 · Frame: `../../guide/referensi/sheets/26-kinetic-typography-transition.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/26-k*.jpg` · Bedah lengkap: `canvas-skill-library: skills/canvas-reference-director/references/cards.json (reference_id LOC-953e36e1e9b2)`; data ukur: `ukuran.md`
> Kedalaman bedah: **dalam** (frame tiap 0,5 dtk + strip per frame di 3 transisi; teks, warna, kamera, audio diukur dari piksel/sinyal; batas di `ukuran.md`)

**DNA (satu kalimat):** Cerita personal orang ketiga ("he") yang tiap kalimatnya punya adegan sendiri, dan tiap adegan punya perlakuan teks sendiri (teks 3D menempel ruang, kata melengkung di kolase, kata stiker di gabus, kata melingkari kepala), diikat kuning terang, transisi glitch/flash 1–2 frame, dan musik corporate-house 123 bpm yang selalu penuh.
**Cocok untuk:** cerita transformasi kreator (dulu → jatuh → bangkit → CTA), reel/YouTube talking head bernarasi tinggi energi · **Tidak cocok untuk:** penjelasan teknis tenang, merek premium minimal, teks yang harus dibaca lama
**Kata kunci gaya:** kinetik, kolase, maksimalis, kuning terang, glitch, cerita personal
**Diambil untuk:** `Kinetic Typography + Transision.mp4`: "Kinetic Typography" → animasi teks (bagian 2, dibedah paling dalam); "Transision" → transisi (bagian 6, dibedah paling dalam).

## PENGIKAT (diambil utuh dari SATU kiblat; ini yang membuat video terasa satu keluarga)

### 1. Warna & tekstur
- Aksen tunggal yang berulang: kuning teks `#F7E610` (A-roll), `#F6FC48` (CTA 3D), `#EACD40` (kolase). Putih untuk kata sambung. Merah hanya di kartu judul (`#8B272D` di krem `#F9F6D8`) dan poster negara (`#DD4041`).
- Latar per adegan bergiliran: interior hangat gelap (baju `#0B0716`, sofa merah `#31080F`), kertas krem halftone, kertas ungu tergores `#544B74`, gabus `#412D1B`–`#8A5C34` dengan bayangan jendela, hitam `#080808`, kartu putih `#FEFEFE`.
- B-roll "jatuh" (0:36–0:47) monokrom penuh (selisih R–B rata-rata 0,15 → nol warna); sisanya hangat dan jenuh.
- Tekstur menempel: titik halftone di kartu judul dan footage kamar, goresan kertas di adegan foto, bloom/glow pada teks kuning, light leak di CTA dan layar akhir.

### 2. Teks
- **Jumlah keluarga huruf banyak, satu per jenis adegan** (tidak terukur namanya; paling mirip): A-roll = sans geometrik bold rapat (mirip SF Pro/Inter Bold) + serif italic padat hitam untuk kata kunci (mirip Playfair Black Italic dipadatkan); kartu judul = sans tebal membulat, huruf ditumpuk; kolase/foto = huruf tangan marker kuning 3D; footage = sans geometrik ExtraBold huruf kecil (mirip Poppins/Gilroy); gabus = sans rounded tebal putih model stiker; akhir babak = sans sangat padat tinggi ("THAT WHO WAS ME"); CTA = sans rounded heavy 3D kuning bersisi oranye dengan tanda kutip.
- **Ukuran** (tinggi kotak huruf, % tinggi frame konten): kata kunci 10–25 % (CTA "DREAM" 20,6 %; judul "STO/RY" 27–31 % frame penuh); kata sambung 3,6–6 %. Rasio kunci : sambung 1,9× (A-roll) sampai 5–5,7× (CTA). Di kolase dan teks melingkar semua kata sama besar (rasio ±1).
- **Posisi terhadap subjek:** A-roll: blok rata kiri di ruang kosong sebelah kepala (pusat x 37–46 %, y 34–52 %); footage: kata 3D menempel bidang ruang (meja/dinding) di samping subjek; kolase: kata melengkung ditebar mengikuti bukit di sekeliling figur; foto: kata mengapit wajah kiri-kanan setinggi mata; gabus: kata stiker melingkari TV; adegan meja: kata membentuk lingkaran di sekeliling kepala subjek; CTA: kata kunci 3D menutup dada (y 72 %).
- **Kata per tampil:** A-roll 1–3 kata menumpuk sampai 6 kata (3 baris); kolase/gabus/lingkaran: kalimat 8–12 kata menumpuk satu per satu sampai penuh; B-roll monokrom: caption kecil kuning pucat `#CEB377` 1–4 kata (±3,8 %, y 89 %).
- **Penekanan:** ganti font (serif italic padat / 3D), warna kuning, ukuran 2–6×, extrude 3D + glow. Tidak ada kotak/garis bawah.
- **Watak masuk/keluar:** per kata, sigap. Kata pop dengan skala + kilat kuning lalu menjadi putih ("wanted" 1:04, 3 frame); judul merakit per huruf dalam ±4 frame (0:00.41–0:00.58) saat bayangan siluet lewat; "THAT WHO WAS ME" ditulis per huruf menumpuk dari atas; kata kolase/gabus muncul berurutan mengikuti ucapan dan tetap tinggal; keluar dengan cut, tidak di-fade.

### 3. Ritme
- `pace_read.py`: 47 cut = **36,2/menit**, shot median **0,7 dtk** (termasuk frame glitch 1 frame), event visual 58/menit, laju bicara 3,9 suku kata/dtk → kategori **energi**. Hitung mata: ±45 adegan berbeda.
- Lambat hanya di A-roll: 0:13,5–0:17,3 dan 1:07–1:15,7 (CTA, 8,7 dtk dengan punch-in). Tercepat: 0:20–0:30 dan 0:53–1:06 (adegan 0,5–1 dtk).
- Babak: pembuka "story of how" (0–11) → obsesi (11–28) → klien (28–36) → jatuh, monokrom (36–47) → titik balik "that version died" (47–55) → bangkit, angka views/$ (55–67) → CTA "comment DREAM" (67–78).

## TEKNIK (boleh dipinjam referensi lain; selalu dikenakan pengikat kiblat)

### 4. B-roll / footage
- Footage pribadi kreator (kamar, toko sepatu, kerja malam, ruang gelap) ±55 % durasi; A-roll wajah ±20 %; grafis/kolase ±25 %.
- Literal per kalimat: "folding clothes" → lipat baju, "threw it all away" → kartu as jatuh, "house of cards" → rumah kartu, "name tag" → close-up "Hello my name is Zache", "views" → angka 41K → 297K.
- Perlakuan: monokrom penuh untuk masa gagal, push-in pelan, sebagian di-blur DOF; satu inset foto di atas footage (0:38,5).

### 5. Motion graphic
- Kolase surealis (gunung + torii + menara + figur kreator) untuk "anywhere in the world"; poster kolase negara (JAPAN, DUBAI) merah-putih bertekstur cetak; layar statistik close-up (ikon mata + angka); tunnel cahaya hiperspasi untuk "creating"; teks 3D partikel di hitam.
- **Skala subjek:** wajah A-roll badan ±50 % lebar di kanan; foto potret ±86 % tinggi × 55 % lebar; TV di gabus ±34 × 33 %; kolase = banyak objek kecil dengan figur ±25 % tinggi (taksiran visual, lihat `ukuran.md`).
- **Kedalaman:** 3–4 lapis: latar (kertas/gabus/bukit blur) → subjek (foto/TV/figur, berbayang) → teks (3D, kadang di belakang objek) → depan (bayangan siluet daun/tangan, light leak). Bayangan jatuh nyata di semua adegan kertas/gabus.

### 6. Kamera & transisi
- Gerak kamera (ORB + affine awal–akhir shot): B-roll hampir selalu **push-in pelan +5 s/d +30 %** per shot; A-roll nyaris diam (−1,5 %), variasi lewat cut punch-in/out ±35 %; beberapa shot benar-benar diam (0:39, 0:56, 1:06).
- Transisi (strip per frame): **glitch blok horizontal 1 frame → frame putih/siluet 1 frame → kartu** (0:00,38); **whip motion-blur horizontal 2 frame** (1:05); **hitam 1 frame + luma-matte putih 1 frame** (0:10,4); **tunnel → smear horizontal → monokrom** (0:11,0); flash ke kartu putih (0:53); layar statis glitch di akhir (1:17,5). Semua ≤ 2 frame; tidak ada dissolve.
- Pemicu: kata (onset suku kata). earshot: 54 % cut punya onset dalam 1 frame, 89 % dalam 100 ms.

### 7. SFX
- earshot: 486 event (6,3/dtk); bertag 8 whoosh, 7 riser, 4 hit, 10 UI/pop, 3 note, 4 foley (tag = petunjuk). ±28 bunyi non-suara/menit.
- Whoosh di transisi (0:02,7, 0:16,6, 0:21,4, 0:33,6), riser sebelum babak baru (0:33,4, 0:48–0:49), pop/klik UI di kata dan angka (0:35, 0:50, 1:00, 1:02,9), hit pada kata kunci (0:30,7). Puncak SFX −1 s/d −3 dBFS, setara puncak suara; aksen terkuat +30 dB di atas bed (0:49,3).

### 8. Musik
- "Inspirational corporate" dengan bass gitar dan vocal chop, pindah ke house di 1:07 (CTA); librosa ±123 bpm; pulse clarity 0,07 (grid tak tegas di mix).
- Mix −14,2 LUFS, true peak −0,4 dBTP, LRA 2,8 LU (padat, keras sepanjang video). Level musik terhadap suara: tidak terukur (tanpa pemisahan stem).

## Proporsi terukur (11 Nov 2026, dari video sumber; % terhadap frame konten 960×612 kecuali k2)

| Jenis adegan | Kata kunci (% tinggi) | Kata sambung | Posisi teks | Skala subjek | Kedalaman |
|---|---|---|---|---|---|
| Wajah + teks (k1) | 11,6 serif italic kuning | 6,0–8,0 putih (1,5–1,9×) | blok rata kiri, x 37–46 %, y 34–52 %, sebelah kepala | badan ±50 % lebar, kanan | bokeh interior + teks glow |
| Kartu judul (k2) | 27–31 (frame penuh), blok 41 % lebar | – | tengah, dalam kotak seleksi putus-putus | tanpa subjek | kertas halftone + bayangan siluet |
| Footage + teks 3D (k3) | 24,6 "from" | 10,9 "went" (2,3×) | menempel meja kanan, x 67–73 %, y 54–72 % | orang ±45 % tinggi | footage halftone + teks di ruang |
| Kolase + teks melengkung (k4) | 10,6–11,3 semua kata | sama (±1×) | ditebar mengikuti bukit, x 30–75 % | banyak objek kecil, figur ±25 % | 4 lapis, belakang blur |
| Foto + teks samping (k5) | 7,7 "OBSESSED" | 5,9–6,4 (1,3×) | mengapit wajah setinggi mata, y 47–53 % | potret 86 % tinggi × 55 % lebar | kertas tergores + foto potong |
| Papan gabus (k6) | 9,1 "client" | 5,4 "a" (1,7×) | melingkari TV | TV 34 × 33 % tengah | gabus + stiker berbayang + bayangan jendela |
| Teks melingkar (k7) | ±5–7 (kotak miring) | sama | lingkaran mengelilingi kepala | subjek ±60 % tinggi, redup | footage gelap + teks putih |
| CTA wajah (k8) | 20,6 "DREAM" 3D, 75 % lebar | 3,6–4,1 (5–5,7×) | kata kunci di dada y 72 %, kata kecil di samping kepala | wajah tengah | footage + teks 3D + glow |

- Batas ukur: sumber 960×720 terkompresi; tinggi = kotak huruf termasuk ascender/descender; kata miring/3D melebihkan ±10–30 %.

## Cek kemiripan (dipakai juri saat menyandingkan still)
- Kata kunci 10–25 % tinggi frame, kata sambung 3,5–6 %, rasio ≥ 1,9× (CTA ≥ 5×); di adegan kolase/lingkaran semua kata sama besar.
- Teks A-roll di ruang kosong samping kepala (pusat x 35–50 %, y 30–55 %), bukan pita subtitle bawah.
- Tiap jenis adegan punya perlakuan teks berbeda yang menempel subjek: melingkar, mengapit, menempel bidang 3D.
- Satu aksen kuning (`#F0E010`–`#F6FC48`) + putih; merah hanya di kartu judul/poster.
- Ada tekstur nyata (halftone, goresan kertas, gabus) dan bayangan jatuh di adegan grafis.
- Adegan grafis 3–4 lapis dengan lapisan depan (bayangan/light leak) dan latar blur.
- Masa sulit cerita = monokrom penuh dengan caption kecil kuning pucat di y ±89 %.
- Still transisi: blok glitch horizontal, frame putih, atau motion-blur horizontal 1–2 frame; tidak ada dissolve.
- B-roll punya push-in pelan (5–30 % per shot); A-roll diam dengan punch-in.

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
