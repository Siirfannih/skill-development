---
id: "48"
pola: Highlighter Caption Box
kategori: typography
kategori_lain: [texture, layout]
trigger: narasi sejarah atau asal-usul dengan foto arsip; frasa pendek 2–4 kata yang jatuh tepat di tengah cerita; tahun atau kata kunci yang perlu lepas dari caption
sumber: kreator tak tertulis (IG De_WoP-CwRe, dokumenter "In God We Trust") · 9:16 · 59,7 dtk
dilihat_bergerak: tidak
diukur: ya
alias: []
---
# 48 · Highlighter Caption Box

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: https://www.instagram.com/reel/De_WoP-CwRe/ (analisis asal canvas-skill-library, reference_id De_WoP-CwRe) · 9:16 (720×1280, **12 fps**), 59,7 dtk · Frame: `../../guide/referensi/sheets/48-dokumenter-arsip-in-god-we-trust.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/48-k*.jpg` (k1 dolar pembuka, k2 kolase kertas, k3 arsip + caption kuning, k4 gelap + teks bebas, k5 kotak merah, k6 tahun besar, k7 teks mengapit inset, k8 koran disorot) · Ukuran: `../../guide/referensi/ukuran/48-dokumenter-arsip-in-god-we-trust-ukuran.md`, periksa `…-periksa.md`
> Video sumber: `/home/irfan/work/canvas-skill-library-20261102/data/online-20261103/data/instagram/45e4aeed870f1296a833/video.mp4` (dicocokkan lewat dimensi dan durasi; ffprobe menguatkan 720×1280, 12 fps, 59,67 dtk)
> Dilihat bergerak: **tidak** (isi dari frame diam dan pengukuran; sumber 12 fps sehingga easing per frame kasar; bedah geraknya sebelum dipakai)

**Inti mekanik (1 kalimat):** Narasi di atas foto arsip monokrom full-bleed diberi satu caption serif italic di kotak kuning lemon pas-badan tepat di tengah frame, dibangun per kata, sementara kata kunci atau tahun sesekali lepas dari kotak dan jauh lebih besar.
**Narrative trigger:**
- Narasi bernarator tentang asal-usul atau sejarah, satu foto per frasa → T1, T3
- Kata kunci, nama, atau tahun yang harus menjadi pusat satu momen → T2
- Cerita yang menyebut dua hal sekaligus (tokoh dan tempat) → T4
- Pembuka yang menunjukkan satu objek simbol lalu melebar ke konteks → T5
**Jangan dipakai untuk:** tutorial aplikasi, talking head, kalimat panjang (kotak ikut melebar dan menutup subjek).
**Kata kunci gaya:** arsip monokrom, kotak kuning lemon, serif italic, vignette, editorial
**Diambil untuk:** nama file "IG De_WoP-CwRe" tidak menyebut bagian. Bagian terkuat: teks (caption kotak kuning + kata kunci besar) dan perlakuan arsip monokrom.

## Kondisi footage asli
- 9:16, seluruhnya foto/footage arsip tanpa pembicara; tiap shot menggambarkan frasa yang tampil.
- Foto full-bleed (crop tengah), monokrom, vignette kuat; orang di foto 30–80 % tinggi, sering banyak orang dan koper berjajar tanpa satu tokoh dominan (laporan periksa).
- Ruang untuk caption: tengah frame di dada atau perut subjek; di adegan gelap, sisi kosong objek.
- Kamera: diam atau push-in pelan 10–24 % pada 6 shot, pan 11–17 % pada 2 shot, ±9 shot nyaris diam.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Footage monokrom (saturasi median 0); warna asli hanya pada objek kunci (uang dolar hijau, mesin cetak). Kotak kuning lemon agak kehijauan ±`#F9FC30` (diukur ulang `#FBFF27`); aksen kedua sekali saja: kotak merah `#C6384D` berhuruf putih. Vignette kuat di semua adegan (tengah vs sudut 129→81 arsip, 80→30 gelap). Kolase pucat: putih `#FDFDFD` di tengah, abu `#B5B5B5` di sudut, grid garis tipis. Grain tidak terlihat.
### Teks
Satu keluarga: serif kondensed italic kontras tinggi (perkiraan Instrument Serif Italic atau PP Editorial New Italic), tanpa sans. Huruf hitam di kotak kuning; tinggi kotak 3,6–4,3 % frame, lebar 24–55 %, pusat x 50 %, y 49–50 % (atau 60 % bila subjek duduk di tengah). Kata kunci lepas-kotak: kuning bercahaya di latar gelap, tahun kuning besar, atau hitam besar di foto terang.
### Ritme
22 cut = 22,1/menit, shot median 2,3 dtk (0,25–6,25 dtk); satu shot memuat 1–4 frasa (±1 frasa/1,2 dtk). Cepat di 23–27 dtk (shot 0,25–1,25 dtk + kilatan putih), paling lambat 38–44 dtk. Berakhir di footage tanpa kartu penutup.

## Pola

### T1 · Highlighter Caption Box · typography
- **Trigger:** narasi frasa demi frasa di atas foto arsip; fakta yang diucapkan datar tapi perlu dibaca.
- **Yang terlihat (termasuk gerak):** kotak kuning pas-badan (padding ±0,3 % atas-bawah) di pusat frame; frasa dibangun per kata di tempat ("This" → "This is" → "This is the") dan kotak melebar per kata. Keluar: hilang sekaligus saat frasa berikutnya masuk (tidak ada gerak keluar pada 12 fps). Di koran, headline disorot kuning menyapu. (k3, k8)
- **Kenapa bekerja:** kotak kuning satu-satunya warna di foto monokrom; ukurannya hampir tetap di semua adegan (hanya lebar yang berubah), jadi mata belajar posisinya.
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): foto → vignette → kotak → teks.
  - Gerak: lebar kotak dari `measureText` (`@remotion/layout-utils`) per kata, `interpolate` lebar 3 f `CURVE.reveal`; tiap kata `opacity` 0→1 dalam 2 f; keluar langsung 0 pada frame frasa berikutnya. Sorot koran: kotak `scaleX` 0→1 dari kiri 8 f `CURVE.reveal`, `transformOrigin: left`.
  - Ruang: datar.
  - Blur & blend: tanpa blur; `mixBlendMode: "multiply"` untuk sorot di atas koran agar tulisan terbawah tetap terbaca.
- **SFX:** satu `pop up.mp3` pada kotak yang pertama masuk di tiap shot, bukan per kata (kata senyap). Video asli: pop pendek 66–160 ms di tiap frasa (±1,2/dtk), terlalu padat untuk ditiru langsung.
- **Pakai bila:** foto dengan ruang di tengah dada/perut subjek. · **Jangan pakai bila:** wajah subjek tepat di tengah frame (kotak menutupinya; turunkan ke y ±60 %).
- **Remix (anti-jiplak):**
  1. Footage berwarna → pertahankan kotak pas-badan satu warna · ganti kuning dengan warna aksen brand, footage diturunkan saturasinya.
  2. UI SaaS → kotak menjadi penanda sorot di tangkapan layar, frasa di tengah layar.
  3. 16:9 → kotak tetap di tengah, tinggi kotak ±5 % frame (bukan 3,8 %).
- *Pengamatan di video asli, bukan target:* tinggi kotak 3,8 % median (diukur 4,22 %), lebar median 37 %.

### T2 · Escaped Keyword Scale · typography
- **Trigger:** satu tahun, nama, atau kata kunci per beat yang harus jadi pusat perhatian ("1954", "preacher", "Christian").
- **Yang terlihat (termasuk gerak):** kata lepas dari kotak dan 2–5× pengantarnya: "1954" kuning ±7 % tinggi di ruang kosong tengah dengan bayangan abu bergeser kanan-bawah (laporan periksa; kartu lama menulis tanpa bayangan); "preacher" hitam ±5,6 %; "Christian" kuning bercahaya di gelap 3,9 %. Pengantar kecil putih/hitam di atasnya, rata kiri. Masuk per digit ("1" → "195" → "1954"). (k4, k6, k7)
- **Kenapa bekerja:** hanya kata kunci yang keluar kotak, sehingga lompatan ukuran 2–5× terbaca sebagai penekanan, bukan variasi gaya.
- **Mekanik Remotion (titik awal):**
  - Lapisan: foto (dipudarkan ke putih berkabut bila tahun) → kata kunci → pengantar.
  - Gerak: digit masuk satu per satu dengan `Math.floor` jumlah digit terlihat tiap 3 f; kata kunci `scale` 1,06→1 `CURVE.land` 8 f.
  - Ruang: datar.
  - Blur & blend: tahun di foto kabut: `text-shadow: 3px 3px 0 rgba(0,0,0,0.25)`; kata kuning di gelap: glow `drop-shadow(0 0 16px)`.
- **SFX:** satu `Katapertama.mp3` pada kata kunci utama video; sisanya senyap.
- **Pakai bila:** ada ruang kosong di tengah foto atau foto bisa dikaburkan. · **Jangan pakai bila:** kata kunci lebih dari satu per beat.
- **Remix (anti-jiplak):**
  1. Angka harga/statistik → pertahankan lompatan ukuran + masuk per digit · ganti font serif jadi grotesk brand.
  2. Latar terang → kata kunci gelap, pengantar abu.
  3. Video talking head → kata kunci di sisi kosong lawan wajah, pengantar kecil rata kiri di atasnya.
- *Pengamatan di video asli, bukan target:* 1954 diukur 6,7 % tinggi; pengantar "one sunday" diukur 2,66 % (kartu lama 1,3 %), jadi rasio ±2,5×, bukan 5×.

### T3 · Spot-Colour Archive Grade · texture
- **Trigger:** foto lama yang berbeda-beda sumbernya perlu terasa satu dokumen; satu objek simbol perlu menonjol dari foto.
- **Yang terlihat (termasuk gerak):** semua foto monokrom dengan vignette; warna asli hanya pada uang di pembuka (k1: kedua tepi dolar buram sementara ukiran "ONE" di tengah tajam, dari laporan periksa) dan mesin cetak penutup; foto Soviet sedikit kemerahan, gereja sekali disepia; di adegan tahun, foto gedung dipudarkan ke putih berkabut. Salib di gelap berkilau seperti bintang dengan pancaran horizontal/diagonal. (k1, k4, k6)
- **Kenapa bekerja:** satu grade menyatukan arsip dari era berbeda; warna menjadi sinyal "objek ini penting".
- **Mekanik Remotion (titik awal):**
  - Lapisan: foto → `filter: grayscale(1) contrast(1.1)` → objek berwarna (matte atau crop terpisah) → vignette radial.
  - Gerak: push-in foto 1,00→1,10–1,24 sepanjang shot `CURVE.drift`; objek warna masuk `scale` 1,15→1 `CURVE.land` 10 f.
  - Ruang: datar atau paralaks 1,05×.
  - Blur & blend: vignette `radial-gradient` transparan ke `rgba(0,0,0,0.55)`; kabut putih = gradien putih opacity 0→0,85 di atas foto 12 f.
- **SFX:** senyap (grade tidak berbunyi); satu `documenter.mp3` (kertas/kain) bila foto atau koran mendarat sebagai objek.
- **Pakai bila:** foto arsip dari sumber campur. · **Jangan pakai bila:** footage yang warnanya adalah informasi (produk, makanan).
- **Remix (anti-jiplak):**
  1. Foto produk UMKM → pertahankan monokrom + satu objek berwarna · ganti objek jadi produk, vignette lebih ringan.
  2. Slide data → latar abu, hanya satu angka berwarna.
  3. Latar terang → ganti vignette gelap dengan vignette putih lembut.
- *Pengamatan di video asli, bukan target:* vignette tengah vs sudut 129→81 (arsip), 229→181 (kolase terang).

### T4 · Circle-Inset Flanked Text · layout
- **Trigger:** frasa yang menyebut objek kedua di samping tokoh ("when the preacher told…" dengan gambar gereja).
- **Yang terlihat (termasuk gerak):** inset lingkaran (gereja) di samping kepala subjek; teks mengapit inset di kiri-kanan atas ("when" kecil, "preacher" besar, "the" kecil); kepala belakang gelap di depan sebagai lapis depan, pendeta + salib di tengah. (k7)
- **Kenapa bekerja:** tiga lapis terpisah jelas (kepala depan, pendeta, inset) dan teks hanya menempati ruang kosong di atas inset.
- **Mekanik Remotion (titik awal):**
  - Lapisan: foto → inset lingkaran (`clipPath: circle`) → teks mengapit → kepala depan (matte) bila ada.
  - Gerak: inset `scale` 0→1 `CURVE.land` 10 f; teks masuk 3 f sesudahnya `CURVE.reveal`.
  - Ruang: inset `translateZ` sedikit lebih dekat.
  - Blur & blend: tepi inset `box-shadow` lembut.
- **SFX:** `pop up.mp3` saat inset muncul.
- **Pakai bila:** frasa menyebut dua objek yang bisa ditunjukkan. · **Jangan pakai bila:** tanpa ruang kosong di atas kepala.
- **Remix (anti-jiplak):**
  1. Video produk → inset menunjukkan detail bahan di samping produk.
  2. UI SaaS → inset lingkaran memperbesar satu tombol.
  3. 16:9 → inset di sisi kosong, teks di atas inset.
- *Pengamatan di video asli, bukan target:* inset ±29 % lebar; kepala depan ±35×30 % frame.

### T5 · Hero Object Zoom-Out Collage · layout
- **Trigger:** pembuka dengan objek simbol yang kemudian dibuka ke konteks.
- **Yang terlihat (termasuk gerak):** uang dolar hijau ±44 % tinggi, melebihi lebar frame, membesar menutupi footage berwarna, lalu zoom-out (skala −90 %) ke kolase pucat di atas grid: Capitol kiri-bawah, uang miring kanan-bawah, potongan koran di atas, koin di masker persegi kuning. (k1, k2; ±7,5 dtk)
- **Kenapa bekerja:** objek yang terpotong tepi terbaca sebagai close-up; zoom-out memberi "dari satu objek ke dunia" tanpa kata.
- **Mekanik Remotion (titik awal):**
  - Lapisan: kolase → grid → objek hero.
  - Gerak: scale objek 1→0,1 `CURVE.heavy` 20 f sambil kolase muncul dari opacity 0 → 1 bertahap per objek `react(i)`.
  - Ruang: datar.
  - Blur & blend: kolase pucat opacity 0,7, kabut putih tipis.
- **SFX:** `Move.mp3` (benda besar mendarat) saat objek hero pertama masuk; zoom-out senyap.
- **Pakai bila:** ada objek simbol tunggal. · **Jangan pakai bila:** tidak ada objek yang mewakili tema.
- **Remix (anti-jiplak):**
  1. Produk UMKM → hero = kemasan, kolase = bahan baku di sekitarnya.
  2. Kisah tokoh → hero = potret, kolase = tempat.
  3. Latar gelap → kolase di atas papan gelap.
- *Pengamatan di video asli, bukan target:* skala dolar ±44 % tinggi × >100 % lebar.

## Audio (bila dibedah)
earshot: 71 transien "chat message pop" (±1,2/dtk), 5 sub-drop, 5 nada celesta; tanpa whoosh atau riser (tag CLAP lemah). Bacaan: pop 66–160 ms (+12–17 dB di atas bed) tiap frasa/kotak masuk; hit bass di cut besar. Musik: house + strings/pizzicato, ±108 bpm, −14,1 LUFS, true peak −0,1 dBTP, LRA 3,1 LU, RMS per 5 dtk datar −15…−19 dB. Level terhadap suara: tidak terukur.

## Yang harus terasa sama saat disandingkan
- Kotak kuning terasa menempel di foto (pas-badan, serif italic, tengah frame), bukan pita subtitle?
- Hanya satu warna aksen di atas foto monokrom, dan warna asli hanya di objek simbol?
- Kata kunci lepas-kotak terasa 2–5× lebih besar dari pengantarnya, dengan pengantar di atasnya?
- Vignette terasa tanpa tampak sebagai filter terpisah?
- Tiap still: 2–4 kata, satu subjek besar, dan gambar menggambarkan frasa yang tampil?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
