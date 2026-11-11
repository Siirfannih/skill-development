# 17 · _ganimate_ "Editorial Explainer System"

> **Status: standar kualitas Irfan.** Video ini target yang harus dicapai, bukan contoh opsional.
> Sumber: _ganimate_, `_ganimate__DfICqhOvP-0.mp4` (nama asli "_ganimate_ showreel"; mosaik 2×2, empat panel explainer diputar bersamaan) · 16:9 (1280×720, tiap panel 640×360), 23,98 fps, 14,4 dtk · Frame: `../../guide/referensi/sheets/17-ganimate.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/17-k*.jpg` · Bedah lengkap: `../../guide/referensi/ganimate.md` (kode G-T/G-X, komponen Remotion); data ukur: `ukuran.md`
> Kedalaman bedah: **sedang**. Sebab: semua angka diukur dari piksel, tetapi tiap proyek hanya tampil sebagai panel 640×360 (±0,28 % tinggi per piksel) dan potongan ≤ 14 dtk; audio adalah satu campuran untuk keempat panel. Ukur ulang dari video proyek tunggal sebelum angka ritme/SFX dijadikan kiblat.

**DNA (satu kalimat):** Explainer editorial-tech: grotesk bersih, objek nyata (UI asli, logo, arsip, ikon isometrik) dihidupkan satu per satu mengikuti VO, dengan kotak tag teal dan satu sorotan kuning sebagai satu-satunya aksen.
**Cocok untuk:** explainer AI/teknologi/bisnis, brand story, data story, launch produk · **Tidak cocok untuk:** tidak disebut di bedah lama; dari ukur: talking head emosional (tidak ada wajah pembicara sebagai A-roll)
**Kata kunci gaya:** editorial, tech, bersih, sigap, mahal
**Diambil untuk:** "_ganimate_ showreel": nama tidak menyebut bagian; lihat bagian terkuat. Terkuat: sistem teks + tag (§2) dan motion graphic isometrik/data (§5).

## PENGIKAT (diambil utuh dari SATU kiblat; ini yang membuat video terasa satu keluarga)

### 1. Warna & tekstur
- Tiga latar, satu per adegan: hitam `#000000`–`#050505` (kata tunggal), navy `#020A15` + grid 1 px `#1D2530` (isometrik, peta, tag), putih `#FFFFFF` / UI `#FAFAFA` (editorial, chart).
- Aksen terukur: teal tag `#12A4A5`–`#23A9AD` (teks di dalam tag tampak `#A6E6E9`, terang kebiruan), teal peta gelap `#0B7376`/`#0F5C5B`, kuning sorotan `#F4D650` (bar chart `#F4D76F`), oranye gradien judul `#C17855`→`#E8976B` (hanya pembuka), biru "AI" `#98ABE8` dengan glow `#E3E7F5`.
- Chart: bar lain abu `#E5E5E5`, satu bar kuning. Editorial: garis registrasi 1 px `#454545` + titik kotak hitam di simpul.
- Tekstur: arsip ber-grain dan scanline (sheet "Wind"); kata "Wattage" memakai RGB-split tipis; grafik datar tanpa grain. Tidak ada vignette di grafik.

### 2. Teks
- Font: grotesk geometris (padanan Aeonik / Manrope / Inter Display) untuk semua kata; monospace kecil untuk label chart ("Instinct", "$12,480"). Bobot Regular–Medium; "Wattage" dan kata arsip tampak Semibold/Bold, jadi aturan lama "maks Medium" tidak mutlak.
- Hierarki terukur (% tinggi panel): hero editorial "Source" cap 24,7 %; judul pembuka "Graphic" 18–21 %; kata tunggal di hitam "Wattage" 10,8 %; kata di atas footage "Life"/"Wind" 7,2–9,2 %; tag 5,0–6,9 %; kata sambung "of" x-height 5,0 % (tinta 6,9 %); editorial kecil "and its own power" x-height 5,6 %; label chart mono 1,9 %.
- Rasio hero : kata narasi ±3–4×; hero : label chart ±12×. Tiga tingkat saja (hero, kata, label), tanpa ukuran perantara.
- Posisi: kata tunggal di pusat panel (x 48–58 %, y 48–50 %), tepat di atas subjek footage ("Life" di badan roket). Tag menempel tepi objek: kiri-bawah atau kanan-atas bangunan (x 31 % / 83 %), atau di bawah peta. Judul pembuka rata kiri dua baris, pusat y 33 % dan 62 %.
- Kata per tampil 1–3 (tag ≤ 4: "America needs more power." dua baris).
- Penekanan: kotak warna penuh (teal tag, kuning hero), bukan garis bawah; logo/ikon sebagai kata dalam kalimat ("AI ✦ ⌀ ◎ ⛵ tools").
- Watak: sigap. Kata ganti di tempat per kata VO; hero editorial masuk dengan pan horizontal; tag wipe kiri→kanan (sheet "cover from the weather" terpotong setengah). Durasi animasi dalam frame: tidak terukur per frame (frame 0,5 dtk).

### 3. Ritme
- `pace_read.py` (seluruh mosaik): 25 cut/menit, shot median 2,1 dtk, event visual 75/menit, kategori `energi`.
- Per panel (deteksi cut sendiri): panel arsip 28 cut = 118/menit, median 0,33 dtk; rentetan 4 f per cut di 12,5–13,8 dtk (Wind → Solar → Nuclear). Panel grafik hanya 2–3 hard cut/menit-potongan (8–13/menit); perubahannya lewat gerak kamera, bukan cut.
- Babak terbaca: pembuka (judul + UI) → konsep (kata hero di putih/hitam) → mekanisme (UI asli) → data (isometrik, peta, chart).

## TEKNIK (boleh dipinjam referensi lain; selalu dikenakan pengikat kiblat)

### 4. B-roll / footage
- Arsip/stok sinematik penuh frame (roket, TV tua, menara pendingin, panel surya, bulan) dengan grade hangat-kusam dan scanline; satu kata putih di tengah.
- Foto dalam kartu bersudut membulat ±22×44 % panel di latar hitam (perempuan + ponsel).
- Wallpaper alam macOS + dock asli; UI dashboard asli ("tracky") dalam bingkai registrasi.
- Grid wajah tokoh (montase 3×3) untuk "By People / no smarter than you".

### 5. Motion graphic
- Isometrik dua nada tanpa outline (atap `#BCDFE3`, dinding teal) + tag; muncul satu per satu saat disebut.
- Objek 3D tunggal (koin "$") + tag; peta AS piksel teal, sel menyala per negara bagian; chart bar dengan satu bar kuning dan anotasi kurung titik.
- Kolom input AI: cursor I-beam, "+ AI" biru, glow biru lembut membesar.
- **Skala subjek:** satu subjek sedang, bukan banyak objek kecil: dock 69×26 % (ikon 20 % tinggi), sepasang bangunan 38×64 % (satu bangunan ±22×39 %), koin 35×43 %, peta 51×57 % (terpotong tepi), chart 73×67 %, UI dashboard 58×78 %.
- **Kedalaman:** 2 lapis datar: latar (navy + grid 1 px, atau putih + registrasi) dan objek + tag. Tanpa blur kedalaman; satu-satunya lembut = glow kolom AI dan light burst arsip. Bayangan hanya di sisi isometrik/koin.

### 6. Kamera & transisi
- Isometrik: truck diagonal mengikuti sumbu iso (±25°), per 0,5 dtk −10…−37 % lebar dan +5…+32 % tinggi (±40–60 % lebar/dtk) di 5,0–8,5 dtk; bangunan baru masuk dari tepi. Angka lama "2–4 %/dtk" tidak cocok.
- UI: zoom-in kuat ke dock, skala kumulatif ±2× dalam ≤ 1,5 dtk (0–1,5 dtk; bisa tercampur animasi ikon).
- Editorial: pan horizontal ±1 lebar panel per dtk (5,0–7,0 dtk, "Which AI Source"); kolom input: slide −80 % lebar dalam 0,5 dtk.
- Arsip: push pelan ±8 %/dtk (roket), punch 1,14× di 7,0 dtk; selebihnya diam.
- Transisi: hard cut pada kata; slide/whip searah gerak; zoom-out 0,65× sebagai keluar adegan (8,5 dtk).

### 7. SFX
- earshot: 82 event (5,7/dtk) dengan VO; label non-suara: 12 UI/pop, 9 whoosh, 7 foley, 6 note, 3 hit, 3 riser, 1 key.
- Kosakata: pop UI di tag/ikon, whoosh pada slide (1,0–1,2; 3,1–3,4; 7,1 dtk), hit + riser di pergantian babak (4,1–4,3; 7,2 dtk), note/klik rapat di babak data 10–13,9 dtk. Level: sebagian besar +2…+5 dB di atas bed, di bawah suara (+10…+25 dB).
- Kepadatan campuran 4 panel: jangan dijadikan acuan per proyek.

### 8. Musik
- earshot: "inspirational corporate, pizzicato strings", tanpa grid beat tegas (pulse clarity 0,06); librosa 120 bpm (lemah).
- Mix −14,0 LUFS, true peak −1,9 dBTP, LRA 2,0 LU (kartu lama −17,2 LUFS: tidak cocok dengan ukur ini).
- Pergeseran: centroid 2,1–2,6 kHz (0–4 dtk) turun ke 1,0–1,6 kHz setelah 4 dtk; lembah energi di 3 dtk dan 10 dtk (−20 dB RMS) sebelum babak berikut.

## Proporsi terukur (11 Nov 2026, dari video sumber; % terhadap panel 640×360)
| Jenis adegan | Kata kunci (% tinggi) | Kata sambung | Posisi teks | Skala subjek | Kedalaman |
|---|---|---|---|---|---|
| Tipografi gelap (k1) | cap 18–21 ("Graphic") | baris 2 setinggi baris 1 | rata kiri, y 33 / 62 % | logo ±15 % tinggi sebagai kata | hitam rata + teks |
| Arsip + kata (k2) | cap 7,2–9,2 ("Life", "Wind") | tidak ada | tengah (50, 50 %), di atas subjek | footage penuh | footage grain + 1 kata |
| UI asli (k3) | tidak ada teks | – | – | dock 69×26 %, ikon 20 % | wallpaper tajam + dock kaca |
| Editorial hero (k4) | cap 24,7 ("Source") | x 5,6 ("and its own power") | tengah, kotak kuning 65×47 % | tanpa subjek | putih + registrasi |
| Isometrik + tag (k5) | tag cap 6,9 | – | tag di tepi bangunan (x 31 / 83 %) | 2 bangunan 38×64 % | navy + grid + objek |
| Objek 3D + tag (k6) | tag x 5,0 | – | tag kiri-bawah objek (31, 76 %) | koin 35×43 % | navy + grid + bayangan koin |
| Peta piksel (k7) | tag cap 5,0 | – | tag di bawah/samping peta | peta 51×57 % | navy + grid + sel |
| Chart (k8) | label 5,6, mono 1,9 | – | label kiri-atas (28, 19 %) | chart 73×67 % | putih + registrasi |

## Cek kemiripan (dipakai juri saat menyandingkan still)
- Latar hanya salah satu: hitam rata, navy `#020A15` dengan grid 1 px, atau putih dengan garis registrasi tipis.
- Aksen per still hanya teal tag (±`#14A5A6`) atau kuning (±`#F4D650`); oranye hanya di judul pembuka.
- Tiga tingkat ukuran: hero 18–25 %, kata 7–11 %, tag/label 5–7 %; rasio hero : kata ±3–4×.
- Kata tunggal di pusat panel (y 48–52 %) dan menumpang di atas subjek footage.
- Tag = kotak teal tanpa radius, teks terang, menempel tepi objek; bukan teks melayang.
- Satu subjek sedang mengisi 35–70 % lebar; bukan ikon kecil bertebaran.
- Kedalaman 2 lapis datar tanpa blur latar; bayangan hanya di sisi objek isometrik/3D.
- Chart: satu bar kuning, sisanya abu terang, label angka monospace kecil.
- Footage arsip ber-grain/scanline, grade hangat-kusam, 1 kata putih.

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
