---
id: "03"
pola: Flat-Color Giant Type Cards
kategori: typography
kategori_lain: [sfx, layout]
trigger: cerita pribadi bernada humor dengan satu kata inti yang kuat; menyamakan dua frasa ("A = B"); percakapan dua orang yang direka ulang
sumber: "explore" (vlog dokumenter ID; kreator tidak tercatat) · 4:3 · 111,2 dtk
dilihat_bergerak: tidak
diukur: ya
alias: []
---
# 03 · Flat-Color Giant Type Cards

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: "explore" (`explore_DcAjrL1S8PO.mp4`), vlog dokumenter ID; kreator tidak tercatat (di layar: poster "@dimas.siji", halaman bio "s.mono") · 4:3 (960×720, 30 fps), 111,2 dtk · Frame: `../../guide/referensi/sheets/03-explore-vlog.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/03-k1-wajah-teks-kinetik.jpg`, `03-k2-kartu-warna-tipografi.jpg`, `03-k3-montase-foto.jpg`, `03-k4-kartu-dialog-biru.jpg`, `03-k5-footage-teks-raksasa.jpg`, `03-k6-sisipan-bingkai.jpg`, `03-k7-broll-subtitle.jpg`, `03-k8-layar-ponsel.jpg` · Bedah: `../../guide/referensi/ukuran/03-explore-vlog-ukuran.md` (ukur 11 Nov) · Periksa: `../../guide/referensi/ukuran/03-explore-vlog-periksa.md`
> Video sumber: `/home/irfan/work/pustaka-video/mac/explore_DcAjrL1S8PO.mp4`
> Dilihat bergerak: **tidak** (bedah dari frame diam dan pengukuran numerik; gerak belum ditonton). Sumber 960×720: ±0,14 % tinggi per piksel; tinggi teks berpendar ±1 % karena glow.

**Inti mekanik (1 kalimat):** Vlog selfie kampung bersaturasi pekat dipotong keras ke layar warna datar berisi tipografi raksasa satu warna kuning-hijau berpendar, kata kunci terpotong tepi, sementara subtitle kecil putih berjalan di bawah dan tidak pernah bercampur dengan teks raksasa.
**Narrative trigger:**
- Cerita pribadi dengan kata inti yang bisa diucapkan satu per satu ("aku lagi pengen nyoba judi online") → T1
- Dua frasa disamakan atau dikontraskan ("JUDI ONLINE = JUAL DIRI") → T2
- Dua orang bercakap-cakap yang direka ulang dalam teks → T3
- Kilas balik umur atau masa lalu dalam montase foto cepat → T4
- Ucapan yang bisa digambarkan harfiah (wisuda, poster jasa, rekaman layar) → T5
- Kata penting jatuh tepat pada hentakan: cut keras ke layar warna + sub bass → T6
**Jangan dipakai untuk:** product film, konten UI, video korporat yang rapi.
**Kata kunci gaya:** mentah, tipografi raksasa, warna datar, CRT, jenaka, dokumenter
**Diambil untuk:** tidak disebut (nama file "explore"). Bagian terkuat: tipografi raksasa + teks kinetik tipis, dan warna.

## Kondisi footage asli
- 4:3 (960×720). Selfie dekat: wajah mengisi separuh kiri dan 100 % tinggi frame, separuh kanan kosong untuk teks; jalan setapak, kebun salak, cermin jalan cembung, ruang gelap berjendela, drone/peta satelit.
- Saturasi tinggi (rata-rata S 136–199 dari 255), hitam dipadatkan (p5 luma 3), hijau dedaunan pekat. Sebagian lensa fisheye dengan vinyet lingkaran hitam penuh.
- Kamera handheld/diam; selfie 0:00–0:04 diam. Satu subjek besar per frame; tanpa blur latar, bayangan jatuh, atau paralaks.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Satu warna teks grafis: kuning-hijau `#D7FF0C`–`#D8FF10` (tepi berpendar `#D4F32B`). Layar datar: hijau `#104716`–`#164C19`, oranye-merah `#E2431F` (diperiksa: `#F04F1A`, dalam toleransi), biru tua `#061D52` (kartu dialog, letterbox 16:9). Garis scan CRT horizontal periode ±2,9 px (dari 720 px), lemah; teks bloom/glow lebar. Kartu biru: aberasi kromatik, tanpa garis scan.
### Teks
Lima peran yang tidak pernah dicampur: kinetik tipis di atas wajah; tipografi raksasa di layar warna (condensed ala Druk Condensed/Anton + extended ala Druk Wide/Archivo Black dicampur); teks raksasa di atas footage; kartu dialog biru kapital miring; subtitle sans regular putih kecil di kotak gelap. Penekanan = ukuran dan warna kuning-hijau saja; tanpa kotak, garis bawah, atau warna kedua.
### Ritme
30 shot, 15,6 cut/menit (scene detect), `pace_read.py`: 36 cut = 19,4/menit, median 1,6 dtk, 39 event visual/menit. Cepat 0:00–0:26 (teks per kata, layar warna, montase 0,1 dtk/foto = 3 frame); lambat di kartu biru (10 dan 7 dtk satu shot), poster, kredit (13 dtk).

## Pola

### T1 · Thin Kinetic Stack Beside Face · typography
- **Trigger:** cerita pribadi pembuka; kata isi diucapkan satu-satu.
- **Yang terlihat (termasuk gerak):** sans geometris regular tipis, kapital, kuning-hijau, satu kata per tampil ("LANGSUNG", "AJA", "AKULAGI"), lalu menumpuk jadi blok 5 baris saling tindih (leading negatif). Selalu di separuh kanan (x 49–98 %, pusat x 73 %), wajah mengisi separuh kiri. Masuk sekaligus per kata tanpa animasi, ganti dengan cut keras. (k1; 0:00–0:05)
- **Kenapa bekerja:** wajah selfie dekat di kiri menyisakan separuh kanan kosong; teks tipis yang bertumpuk terasa seperti pikiran yang berlomba.
- **Mekanik Remotion (titik awal):**
  - Lapisan: footage (wajah di kiri) → teks tumpuk (satu `<AbsoluteFill>` di separuh kanan) → vinyet.
  - Gerak: tiap kata muncul pada frame ucapan (`opacity` 0→1 dalam 1 f, tanpa easing); tumpuk dibuat dengan `line-height: 0,8` dan `translateY` negatif per baris; ganti seluruh blok lewat cut keras, bukan fade.
  - Ruang: datar. Blur & blend: tanpa.
- **SFX:** pop atau klik pendek per kata di kiblat; dalam repo ini kata KT per kata senyap (`../../guide/sfx/GUIDE.md`); satu `Katapertama.mp3` di kata pertama video.
- **Pakai bila:** wajah mengisi satu sisi, sisi lain gelap/polos. · **Jangan pakai bila:** wajah di tengah dengan teks harus menutup wajah.
- **Remix (anti-jiplak):**
  1. Video produk satu objek di kiri → pertahankan tumpuk kata di sisi kosong · ganti wajah menjadi produk, sans tipis menjadi serif tipis.
  2. Latar terang → tumpuk tinta hitam tanpa glow.
  3. 9:16 → tumpuk di sepertiga bawah, lebar penuh, 4 baris.
- *Pengamatan di video asli, bukan target:* "AKU" 26,39 % tinggi pada k1 (diperiksa; kartu lama 12–14 % untuk "AKULAGI/AKU", sehingga angka lama hanya berlaku untuk kata sambung ±7–8 %); pusat blok (73,44 %; 49,31 %).

### T2 · Flat-Color Giant Type Card · typography
- **Trigger:** kata inti yang harus menampar; dua frasa disamakan dengan tanda "=".
- **Yang terlihat (termasuk gerak):** layar warna datar (hijau/oranye) berisi kata ultra-bold raksasa dalam dua lebar: condensed ("MENCOBA") dan extended ("JUAL DIRI", "ON-LINE", "JUDI ONLINE"). Kata kunci 23–31 % H, kata pengiring 13–15 %, kata kecil ±6–8 %; menempel dan terpotong tepi, satu kata diputar 90° ("ON-"), tanda "=" sebagai grafik. Dibangun per kata: MENCOBA sendirian dulu, lalu JUAL DIRI, lalu ON-LINE. Layar punya garis scan CRT dan glow lebar. (k2; 0:06–0:16)
- **Kenapa bekerja:** tanpa subjek lain; kata terpotong tepi terasa lebih besar dari frame; dua lebar huruf memberi hierarki tanpa warna kedua.
- **Mekanik Remotion (titik awal):**
  - Lapisan: warna datar → garis scan (gradien berulang 2,9 px, opacity 0,08) → kata raksasa → glow (salinan blur 12 px, `mixBlendMode: "screen"`).
  - Gerak: kata muncul per frame ucapan tanpa easing (hard); bila perlu `scale 1,06→1` 4 f `CURVE.land`; kata putar 90° `rotate(90deg)` tanpa animasi.
  - Ruang: datar. Blur & blend: glow bloom lebar; tanpa motion blur (sumber tidak menampakkan easing).
- **SFX:** sub bass drop tepat pada cut ke layar warna: `ES_Designed, Bass Dive, Bass Drop, Deep Sub, 50Hz` (peran twist/punchline) atau `basmenyebar.mp3` (judul/puncak); satu per layar warna.
- **Pakai bila:** satu kata inti per layar; naskah boleh agresif. · **Jangan pakai bila:** kalimat panjang atau tone korporat.
- **Remix (anti-jiplak):**
  1. Promo UMKM → pertahankan kata raksasa terpotong tepi · ganti hijau/oranye menjadi satu warna merek, kuning-hijau menjadi putih krem.
  2. Latar terang → kata hitam raksasa di krem, garis scan dihapus.
  3. 9:16 → kata condensed vertikal memenuhi tinggi, extended di bawahnya.
- *Pengamatan di video asli, bukan target:* "LINE" 23,89 % H (diperiksa, dalam rentang); blok "ON-/LINE/YA." terkumpul di kanan atas, ruang kosong luas di kiri-bawah (diperiksa, belum tertulis).

### T3 · Typed Dialogue Card Pair · typography
- **Trigger:** dialog dua orang direka ulang dalam teks, nada kocak atau canggung.
- **Yang terlihat (termasuk gerak):** kartu biru tua letterbox 16:9 dengan kapital miring kuning-hijau, bayang RGB; dua blok seperti dua orang: kiri rata kiri (x 5–60 %), kanan rata kanan (x 39–95 %). Tampil per huruf seperti mesin ketik; blok lama naik dan keluar atas. (k4; 0:27–0:48)
- **Kenapa bekerja:** posisi kiri-kanan memisahkan penutur tanpa nama; tanpa subjek, teks adalah pemeran.
- **Mekanik Remotion (titik awal):**
  - Lapisan: biru datar + letterbox → blok teks dengan bayang RGB (dua salinan offset ±2 px merah/cyan).
  - Gerak: ketik 1 huruf/f; blok lama `translateY(0→-120px)` + opacity 1→0 `CURVE.leave` 8 f saat blok baru mulai.
  - Ruang: datar. Blur & blend: bayang RGB `mixBlendMode: "screen"`.
- **SFX:** kiblat: pop tiap baris. Di repo ini senyap per huruf; `Keyboardtyping.mp3` dipotong sepanjang blok bila ingin bunyi mesin ketik.
- **Pakai bila:** dialog 4–6 baris. · **Jangan pakai bila:** lebih dari dua penutur.
- **Remix (anti-jiplak):**
  1. Chat bisnis → pertahankan dua blok kiri-kanan · ganti kapital miring menjadi gelembung chat sans.
  2. Latar terang → blok tinta gelap di kertas.
  3. 9:16 → blok bertumpuk atas-bawah, bukan kiri-kanan.
- *Pengamatan di video asli, bukan target:* kapital ±4,5 % H, 3–5 baris/blok; satu shot 10 dtk dan 7 dtk.

### T4 · Rapid Photo Flash Montage · layout
- **Trigger:** menyebut umur atau masa lalu ("sekarang umur 18"); riwayat singkat.
- **Yang terlihat (termasuk gerak):** 8 foto lama miring di latar hijau datar, tiap foto 0,1 dtk (3 frame), subtitle tetap di bawah. Foto 40–80 % lebar, tepi rapi dengan glow tipis. (k3)
- **Kenapa bekerja:** kecepatan foto menjadi "waktu berlari"; subtitle yang tetap menjaga kalimat terbaca.
- **Mekanik Remotion (titik awal):**
  - Lapisan: hijau datar → foto miring dengan glow → subtitle.
  - Gerak: ganti foto per 3 f tanpa transisi; rotasi acak ±8° per foto (biji tetap); tanpa easing.
  - Ruang: datar. Blur & blend: glow tepi `drop-shadow(0 0 8px)`.
- **SFX:** `Pergantianfoto.mp3` (satu potongan panjang untuk rentetan foto), bukan satu klik per foto.
- **Pakai bila:** ≥ 6 foto arsip. · **Jangan pakai bila:** foto harus dibaca satu per satu.
- **Remix (anti-jiplak):**
  1. Riwayat merek → pertahankan 3 f per gambar · ganti foto menjadi logo/versi produk lama.
  2. Latar terang → latar krem, foto dengan bayangan lunak.
  3. 16:9 → foto bergantian di tengah, miring ±5°.
- *Pengamatan di video asli, bukan target:* subtitle pada k3 4,72 % H dan berwarna kuning-hijau di kotak gelap (diperiksa; kartu lama 2,6 % putih).

### T5 · Literal Illustration Insert · layout
- **Trigger:** ucapan yang punya wujud: wisuda, poster jasa, rekaman layar akun.
- **Yang terlihat (termasuk gerak):** "fresh graduate" → video wisuda dalam bingkai sisipan (80×80 % frame, latar hitam) dengan teks raksasa FRESH GRADUATE di tengah, lebih lebar dari bingkai (9–91 % lebar); "jasa edit" → poster di latar hijau (63×84 %), lalu dinding poster berulang; "dicek di akun" → rekaman layar ponsel miring 3D di latar gelap (75×71 %). (k5, k6, k8)
- **Kenapa bekerja:** satu sisipan satu ide; teks yang lebih lebar dari bingkai mengikat teks dan gambar.
- **Mekanik Remotion (titik awal):**
  - Lapisan: footage penuh → sisipan berbingkai → teks raksasa → subtitle.
  - Gerak: sisipan `scale 0,94→1` `CURVE.land` 8 f; dinding poster `scale 1→0,67` selama ±90 f (`CURVE.heavy`) menjauh; ponsel geser −11 % lalu −27 % lebar `CURVE.drift`.
  - Ruang: ponsel `rotateY(-18deg) rotateX(8deg)` `perspective: 1200px`.
  - Blur & blend: tanpa.
- **SFX:** senyap kecuali satu `pop up.mp3` saat sisipan muncul.
- **Pakai bila:** ucapan konkret. · **Jangan pakai bila:** abstrak.
- **Remix (anti-jiplak):**
  1. Promo kursus → pertahankan sisipan berbingkai + teks lebih lebar · ganti wisuda menjadi sertifikat.
  2. Latar terang → sisipan di kertas krem.
  3. 9:16 → sisipan di sepertiga atas, teks di bawah.
- *Pengamatan di video asli, bukan target:* sisipan wisuda 80,00×79,86 % (diperiksa; lama 82×82); pemandangan sinar matahari memberi bayangan keras di wajah (k5).

### T6 · Hit-Synced Hard Cuts · sfx
- **Trigger:** kata kunci yang tepat jatuh pada hentakan.
- **Yang terlihat (termasuk gerak):** semua transisi cut keras tanpa whip/zoom/morph; 22 dari 28 cut jatuh pada transien audio ≥ 4× median. Gerak kamera: push +8 % (0:17), pull −17 % (0:17,5), pull −33 % ke dinding poster (0:58–1:01). (seluruh video)
- **Kenapa bekerja:** potongan mengikuti ucapan, sehingga cut terasa memiliki alasan.
- **Mekanik Remotion (titik awal):**
  - Lapisan: satu urutan `<Sequence>` per shot.
  - Gerak: cut pada frame ucapan; push kecil `scale 1→1,08` `CURVE.drift` ±30 f pada shot yang ditahan.
  - Ruang: datar. Blur & blend: tanpa.
- **SFX:** `Cut.mp3` atau sub bass di cut ke layar warna; `Woosh.mp3` hanya untuk satu gerak keluar (kiblat: satu whoosh di 0:35,6).
- **Pakai bila:** naskah punya kata kunci jelas. · **Jangan pakai bila:** tempo tenang.
- **Remix (anti-jiplak):**
  1. Reels cepat → pertahankan cut di ucapan · ganti layar warna menjadi b-roll produk.
  2. Latar terang → hit digantikan klik halus.
  3. 16:9 → cut bergantian dua sudut.
- *Pengamatan di video asli, bukan target:* subtitle satu ukuran; rasio kata kunci : subtitle ±5× di footage, ±9–12× di layar warna.

## Audio (bila dibedah)
earshot: 756 event (6,8/dtk, sebagian besar onset musik/bicara); 96 berlabel: 46 UI/pop, 21 drum, 13 hit, 13 suara, 1 whoosh, 1 foley. Sub bass drop/hit tepat pada cut ke layar warna (0:02,1; 0:05,57 masuk MENCOBA +21 dB di atas bed; 0:12,8; 0:17,0); pop pendek per kata dan tiap baris kartu dialog (puncak −1 s/d −7 dBFS); satu whoosh (0:35,6) dan satu glockenspiel (0:20,4). Musik: chiptune + vocal chop 0:00–0:17, jeda 0:17–0:21, funk di bawah narasi, funk/soul + snare roll di kredit; ±103 bpm tanpa grid tegas; −14,3 LUFS, true peak +0,7 dBFS (clip), LRA 5,5 LU. Tiga lagu dikreditkan.

## Yang harus terasa sama saat disandingkan
- Semua teks grafis satu warna, tanpa warna kedua kecuali subtitle?
- Kata kunci di layar warna terasa lebih besar dari frame (terpotong tepi) dan bergaris scan lembut?
- Dua lebar huruf ultra-bold berbagi satu layar?
- Subtitle kecil tidak pernah menyatu dengan teks raksasa?
- Wajah di satu sisi, teks di sisi lain, tanpa menutup wajah?
- Footage tampak jenuh dan hitam pekat, bukan pucat?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
