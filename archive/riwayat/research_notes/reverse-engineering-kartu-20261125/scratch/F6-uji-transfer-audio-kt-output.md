# F6 · Uji Transfer Buta: 2 Frame Kunci "Posting tiap hari nggak bikin UMKM laku"

Tema `editorial-metaphor-canvas`, struktur `S01` (F5 §1.1: F1 = anggapan umum, F2 = bantahan + alasan). Kanvas 1080x1920, 30 fps, % H dari 1920 px.
Asumsi: VO ±0,22 dtk/suku kata; "% area" jangkar saya baca sebagai lebar objek terhadap lebar frame; satu aksen kobalt `#1757F0` untuk seluruh video; kata biasa senyap (`accent-only`), tanpa tick.
Metafora (19a): makna = "banyak posting, tak ada yang datang; yang menggerakkan orang adalah satu pesan jelas". Objek 1 = bel kasir yang tak pernah dibunyikan. Objek 2 = satu gelembung pesan, kabur lalu tajam.

---

## FRAME 1 · Hook, 0 sampai ±4,4 dtk (f0-132)

VO 10 kata = ±4,3 dtk, bukan 3 dtk (Hambatan 1). Still kunci = f114 (3,8 dtk), saat "sepi?".

### 1. Komposisi
Kutub gelap `#0C0C07` datar, vignette tepi <= 12 %, tanpa glow.

| Elemen | Posisi / ukuran | Warna |
|---|---|---|
| Bel kasir garis (jangkar) | cx 50 %, cy 62 %, lebar 58 % W, tinggi 29 % H, stroke 10 px, tanpa isi | `#F2F0E8` |
| Garis meja | y 75,5 %, x 12-88 %, 6 px | `#F2F0E8` |
| Titik tombol bel | puncak bel, 36 px | kobalt (aksen tunggal) |
| Tumpukan 3 kotak "postingan" | kiri bawah di atas meja, x 5,5-14,5 %, 96 px, outline 6 px, miring <= 3 derajat | `#6E6E69` redup |
| Teks | cy 33 % (blok y 29,8-36,3 %); "sepi?" tinggi ±16 % | putih / redup `#8A8A84` |

Ruang kosong ±75 %; 20 % bawah kosong (zona UI platform).
Alasan dengan kata saya:
- **K1:** hook 3 detik harus terbaca sekali lirik. Satu bel besar yang menganggur sudah berarti "ada toko, tak ada pembeli"; kotak kecil hanya pendukung redup, tidak berebut mata.
- **K2:** teks menempel di atas puncak bel (jarak ±8 % H), jadi mata hanya satu langkah dari objek ke kalimat. Poros tengah terkunci tidak perlu karena latar tidak berganti cepat.
- **K4:** kobalt cuma seluas tombol bel; tombol yang tak ditekan adalah titik ceritanya. Merah saya hindari karena F3 anti-contoh 2 mencatat merah di hitam "nabrak".
- **K7/I3:** tanpa bayangan; hierarki dari nilai terang (bel terang, kotak redup).
- **Tumpukan 3 kotak (D19):** "tiap hari" harus terlihat menumpuk, bukan grid simetris (`S-V8`, C14).

Kamera: push-in 1,00 ke 1,04 selama 132 f, `CURVE.drift`, tumpu di bel (B10-B12); teks terkunci ke dunia.

### 2. Kinetic typography
Satu lapisan, satu sans SemiBold, tanpa serif (serif disimpan 1x untuk penutup). Skala dua kutub (I2): kalimat seragam 104 px (5,4 % H), hero 250 px (13 % H, 2,4x).

| Tampil | Teks | Peran | Waktu (f) | Sinkron VO |
|---|---|---|---|---|
| T1 | "Kamu udah posting" | R1 | 0-40 | "Kamu" |
| T2 | "tiap hari, tapi" | R1 | 40-81 | "tiap" |
| T3 | "yang beli tetap" | R1 | 81-114 | "yang" |
| T4 | "sepi?" | R6 hero | 114-147 | "sepi" |

- Masuk T1-T3: `T01` word rise dalam mask, geser 28 px ke 0, 6 f, `CURVE.reveal`, mulai 3 f sebelum onset VO. Tanpa skala dari 0, tanpa ease-in masuk.
- Penekanan: semua kata mulai redup `#8A8A84` (5,6:1), menyala putih dalam 6 f tepat saat diucapkan. Satu sistem penekanan, posisi tidak bergeser (K5a).
- T4: `T04` settle 1,15 ke 1,0, 10 f, `CURVE.heavy`; satu kata di baris sendiri, "?" tampil (A4), tidak diwarnai (A6).
- Keluar 3 f, naik 14 px dalam mask, `CURVE.leave`; frasa baru masuk setelah lama >= 95 % hilang (TKS-11).
- Kotak: mendarat di "posting" (f27), "hari" (f54), "tapi" (f71); `CURVE.land` 8 f dari atas-kiri, jarak ±300 px.

### 3. Sound design (0 dB = VO ±-16 LUFS)
| Waktu | Bunyi | Level | Peran |
|---|---|---|---|
| 0,00 (f0) | denyut rendah teredam 0,25 dtk (sub + body 150-450 Hz agar hidup di HP), mendahului VO 4 f | -6 dB | pilar 5: bel "mendarat"; 22c bunyi di frame 0 |
| 0,00 | bed musik tipis (pad tanpa ketukan) + room tone | musik ±-13 dB di bawah VO; room tone ±-36 LUFS | pilar 1, tidak ada hening digital |
| 0,90 | satu foley kertas lembut untuk kotak 1 | -16 dB | pilar 4, satu objek satu cue |
| 3,80 | musik turun 4 dB selama 0,6 dtk, naik lagi ramp >= 250 ms | -4 dB | napas untuk hero |

**Senyap, dan kenapa:** kata biasa + perubahan nilai terang (tick per kata = lapisan klik, `S-A11`); kotak 2 dan 3 (tumpukan itu satu objek, jaga <= 0,5 momen/dtk); whoosh (tak ada gerak cepat, `S-A12`); **bel tidak berdering sama sekali**. Ironi "sepi" dipertahankan; bunyi bel akan menjawab pertanyaan hook yang justru harus menggantung. Musik tidak berhenti di sini; stop total saya simpan untuk titik balik.

### 4. Yang sengaja TIDAK dilakukan
- Wajah, stok foto toko, screenshot IG (UI publik wajib asli, D20).
- Pita subtitle kedua atau kata ganda (`S-T1`, A1, A3).
- Grid kartu postingan identik (C14, contoh-gagal/03); angka karangan "0 pembeli" (A5).
- Glow biru/Apple Glass/drop shadow slide (`S-V21`); teks merah atau biru di gelap (`S-T5`).
- Fade/blur-in atau skala 0 (F4 2.1.1); crossfade ke Frame 2 (K8: potong polaritas).
- Kata mini di kanvas kosong (contoh-gagal/02): ada objek 58 % W.

---

## FRAME 2 · Titik balik, 18,0-23,0 dtk (f0-150 relatif)

VO ±5,4 dtk dengan jeda, lewat jendela ±0,4 dtk. Still kunci = +4,9 dtk, saat "pesanmu".

### 1. Komposisi
Potong keras polaritas ke krem `#EFE9D7` datar (tanpa vignette gelap, `S-V18`). Teks `#0C0C07` (±15:1), aksen kobalt sama.

| Elemen | Posisi / ukuran | Keadaan |
|---|---|---|
| Gelembung pesan frameless (ekor kiri bawah, tanpa bezel) | cx 50 %, cy 62 %, 74 % W x 26 % H | kobalt solid, tanpa isi/bayangan; awal blur 12 px, opacity 55 % |
| 3 gema kontur gelembung | geser 14 px per gema, opacity 40/25/12 % | hanya saat "sering" |
| KT | blok cy 33 % (y 20-46 %) | lihat bagian 2 |

Ruang kosong ±62 %; jarak dasar teks ke puncak gelembung 3 % H.
Alasan:
- **K8:** gelap = dunia "sepi", terang = dunia "jelas". Potong polaritas sudah menandai pergantian pikiran; whoosh/crossfade tidak perlu.
- **19b:** gelembung solid = "satu pesan" secara harfiah, bukan hiasan.
- **Kabur ke tajam = "jelas":** blur 12 px (batas atas I3) dipakai bermakna pada objek, bukan sebagai gaya masuk (B13a pengecualian).
- **Gema = "sering":** repetisi tanpa kejelasan; saat "Tapi" gema runtuh ke satu bentuk. Dua kalimat jadi satu lengkung: banyak-kabur ke satu-tajam.
- **A9:** gelembung bukan kotak penyangga teks; teks di atasnya, kontras sudah lolos.

Kamera: push-in 1,00 ke 1,035 selama 150 f, `CURVE.drift`.

### 2. Kinetic typography
Skala sama seperti F1: 104 px kalimat, 240 px hero (2,3x).

| Tampil | Teks | Peran | Waktu rel. (f) | Sinkron VO |
|---|---|---|---|---|
| S1 | "Masalahnya bukan" | R1 | 3-38 | "Masalahnya" |
| S2 | "seberapa sering." | R1 | 38-75 | "seberapa" |
| jeda napas | diam | | 75-85 | |
| S3 | "Tapi seberapa" | R1 | 85-122 | "Tapi" |
| S4 | "jelas" | R6 hero | 122-135 | "jelas" |
| S5 | "satu" / "pesanmu" tumpuk 1 kata per baris | R6 hero | 135-162 | "satu", "pesanmu" |

- S1-S3 sama dengan F1 (`T01`, 6 f, `CURVE.reveal`, keluar 3 f). Nilai redup krem `#6B665B` (4,8:1).
- "sering." sesudah diucapkan (f68) turun nilai ke `#6B665B` dalam 6 f: kata yang dibantah memudar, posisi tetap.
- S4: `T04` settle 10 f `CURVE.heavy`, bersama gelembung menajam (blur 12 ke 0, opacity 55 ke 100 %, skala 0,94 ke 1,0, 8 f, mulai 2 f sebelum onset).
- S5: "satu" `T01` 6 f, "pesanmu" menyusul 6 f kemudian; lebar "pesanmu" ±924 px, di dalam margin 5 %.

### 3. Sound design
| Waktu abs | Bunyi | Level | Peran |
|---|---|---|---|
| 17,55-18,00 | riser pendek memuncak tepat di potongan | -6 dB | pilar 5, antar polaritas |
| 18,00-18,25 | musik berhenti, tersisa room tone; VO mulai 18,10 | bed tetap | ruang untuk potongan, bukan whoosh |
| 18,25 | musik masuk lebih terang (babak baru), ramp 400 ms | -13 dB bawah VO | E25 per babak |
| 20,85-21,15 | musik naik +2 dB di jeda napas, ramp 250 ms | +2 dB | naik hanya di jeda >= 0,3 dtk |
| 21,70-22,05 | vakum: hanya stem musik ke ±-45 dBFS, room tone tetap | | ruang sebelum hantaman |
| 22,03 (2 f sebelum "jelas") | sub drop + chime/klik body 150-450 Hz, ekor 0,5 dtk | -3 dB | Tingkat A (1 dari maks 2 per video), bersama gelembung menajam |
| 22,05-23,00 | musik naik pelan ke -13 dB, ramp >= 400 ms | | tidak menabrak "pesanmu" |

**Senyap:** semua kata biasa dan "sering." memudar; runtuhnya gema saat "Tapi" (bila diberi bunyi, hierarki Tingkat A/B/C hilang); blur-ke-tajam tidak punya bunyi sendiri, hantaman 22,03 sudah bunyinya; potong polaritas tanpa whoosh (`S-A12`); "satu pesanmu" setelah hantaman dibiarkan hanya bersama VO.

### 4. Yang sengaja TIDAK dilakukan
- Penanda slide generik: "01/02", panah "→", bilah aksen (F4 2.1 butir 4); gradien biru-ungu (`contoh-gagal/04`); bayangan gelembung (`S-V2`).
- Bezel ponsel, centang/emoji, teks palsu di dalam gelembung (D22, A9).
- Angka/grafik yang tak diucapkan (A5); pop/bounce per kata, RGB split (`S-V7`); hero motion cuma satu (gelembung menajam).
- Dua hantaman besar; serif italic untuk "jelas" (disimpan untuk 1 kata penutup, KT-4).
- Skala 0 atau ease-in masuk.

---

## HAMBATAN

1. **Jendela waktu tidak muat.** Brief "0-3 dtk" untuk 10 kata; di "±140 kata/menit" itu ±4,3 dtk (3 dtk = ±200 wpm). Frame 2 ±5,4 dtk di jendela 5 dtk. Draf tidak memberi aturan bila VO lebih panjang; E23 melarang VO dipercepat, jadi jendela yang saya geser.
2. **A8/A4/TKS-11 saling menekan di 2,3 kata/dtk.** F4 menulis durasi baca `>= max(0,8; 0,30 + 0,06 x huruf)` (diberi label "A8", padahal LANTAI A8 tanpa rumus). "jelas" terucap 0,45 dtk, "sepi?" 0,6 dtk, rumus minta 0,8. Ditambah "tiap frasa tampil sampai selesai diucapkan" dan "frasa lama >= 95 % hilang sebelum baru masuk": tidak ada celah. Saya melanggar rumus di "jelas" dan memotong frasa lama ±3-5 f lebih awal.
3. **"baris terpendek >= 85 % baris terpanjang" (A4) vs "blok rapat dua tingkat ... rasio 1,8-4,0x" (K3).** Lebar piksel atau jumlah huruf? Saya hindari dengan satu ukuran per tampil dan hero sendiri.
4. **I2 "seragam 1,0-1,3x ATAU >= 2,3-8x" vs K3 "kata sambung 3-7 % H, kata kunci 8-18 % H".** 8 % H = 154 px, tetapi "Masalahnya bukan" hanya muat 1 baris di <= ±105 px. Kata kunci 154 px vs 104 px = 1,5x, "ukuran tanggung". Persen "% H" kartu berasal dari video 16:9; di 9:16 apakah mengikuti tinggi 1920 atau lebar 1080? F3 juga menyebut "kata isi >= 110 px @1080" (88) tanpa kaitan ke 56 px.
5. **"30-65 % area fokus" (K1) / "1 Jangkar 30-75 %" (I1).** Area frame, tinggi, atau lebar? Di 9:16, 30 % area hampir menutup lebar. Saya pakai lebar objek (58-74 % W).
6. **Aksen: 18a "Satu keluarga aksen dominan" vs K4 "maksimal 1 aksen aktif per babak".** Per video atau per babak? Saya ambil per video. K4 juga memasangkan merah dengan "vonis", sedangkan F3 mencatat `D-18` "merah di hitam nabrak" (merah `#ED2F3D` di `#0C0C07` hanya ±4,7:1). Boleh merah sebagai teks?
7. **Vakum bunyi.** SD-4/I7 "vakum -43...-55 dBFS" vs `S-A3` "celah < -45 dBFS tanpa alasan tertulis dibaca audio rusak" vs E24 "bed ±-36 LUFS ... tidak ada hening digital". dBFS dan LUFS dicampur; tidak jelas apakah vakum hanya untuk stem musik (saya anggap iya). "-13,2 dB di bawah bicara" (88): puncak, rata-rata, atau LUFS jangka pendek?
8. **"-2...-6 dB relatif VO" (E24):** relatif puncak VO, LUFS VO, atau kata yang sedang diucapkan? Hantaman tepat di onset "jelas" bisa menutup konsonan; saya majukan 2 f tanpa bisa mendengarnya.
9. **Tick: wajib atau opsional?** E24: "lima pilar", pilar 3 "satu klik per kata KT (`per-word` ... atau `accent-only`)". F4 I7 menjadikan senyap default; SD-2 menyebut pelanggaran `S-A4` bila objek baru masuk tanpa SFX. Saya memilih `accent-only`; pembaca lain bisa menafsir lima pilar wajib.
10. **22c "bunyi di frame 0" vs palet terlarang** (kayu/felt, koin/logam). Bel kasir identik dengan logam. Draf tidak bilang bunyi apa yang boleh untuk objek logam yang "mendarat" (pilar 2 hanya udara/kain/thud untuk gerak kamera).
11. **A1 (semua ucapan jadi teks) vs C14 ("visual kuat tampil tanpa teks tandingan").** Hook saya punya objek kuat sekaligus kalimat penuh; tak ada cara menimbang dari draf. Saya seimbangkan lewat ukuran saja.
12. **Blur.** B13a "Tidak ada fade-up atau blur-in sebagai cara masuk bawaan; blur hanya untuk gerak cepat" vs LANTAI 13 (blur-to-sharp bermotif boleh) vs `T02` dipakai di KT-3/KT-4. Batas "bawaan" vs "bermotif" tak jelas; satuan 12 px terhadap resolusi mana juga tidak disebut.
13. **"Maksimal 1 hero motion per adegan" (F4 2.1 butir 5):** apakah drift kamera dihitung, padahal B10 mewajibkan gerak kamera shot >2 dtk? Saya anggap pendukung.
14. **Tidak bisa melihat contoh.** Tebal garis bel (10 px) dan gaya garis hanya tebakan; "pita atas cy 12-22 %" dan "garis ukur putus-putus 1 px" tak bisa dicocokkan dengan keyframe. Kode `S-V*`, `S-T*`, `S-A*`, `TKS-*`, `R-017` merujuk berkas yang tidak boleh saya buka, jadi hanya dituruti lewat kutipan sekunder di F3/F4.
15. **`S01` (bantah + alasan + 1 langkah)** menuntut 3 beat, brief hanya 2 frame kunci; apakah "1 langkah" perlu visual sendiri tidak jelas.
