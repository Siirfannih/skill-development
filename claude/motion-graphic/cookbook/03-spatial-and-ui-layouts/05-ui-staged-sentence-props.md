---
id: "05"
pola: UI-Staged Sentence Props
kategori: layout
kategori_lain: [camera, typography]
trigger: pesan manifesto pendek yang tiap kalimatnya butuh benda berbeda; hook iklan jasa digital tanpa wajah; kalimat "mereka tidak bisa X" yang dipentaskan di UI asli
sumber: Hook momentum (motion UI + kinetik; akun earn.edits terlihat di frame) · 9:16 · 36,2 dtk
dilihat_bergerak: tidak
diukur: ya
alias: []
---
# 05 · UI-Staged Sentence Props

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: Hook momentum, file `Hookmomentum.mp4` · 9:16 (720×1280, 30 fps), 36,2 dtk · Frame: `../../guide/referensi/sheets/05-hook-momentum.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/05-k1-poster-3d.jpg`, `05-k2-ui-post-neon.jpg`, `05-k3-iphone-meja.jpg`, `05-k4-notes-putih.jpg`, `05-k5-kartu-daftar.jpg`, `05-k6-kinetik-tumpuk.jpg`, `05-k7-judul-gelap-tebal.jpg`, `05-k8-clapper-cta.jpg` · Bedah: `../../guide/referensi/ukuran/05-hook-momentum-ukuran.md` (audit 11 Nov 2026) · Periksa: `../../guide/referensi/ukuran/05-hook-momentum-periksa.md`
> Video sumber: `/home/irfan/work/pustaka-video/mac/Hookmomentum.mp4`
> Dilihat bergerak: **tidak** (bedah dari frame diam dan pengukuran numerik: cv2 akumulasi gerak, earshot; gerak belum ditonton). Sumber 720p: 1 px = 0,08 % tinggi; banyak teks miring/blur gerak sehingga sebagian ukuran perkiraan. Audio tanpa stem.

**Inti mekanik (1 kalimat):** Narasi VO pria yang tiap kalimatnya "dipentaskan" di benda atau UI yang berbeda (poster, playlist, tombol neon, post IG, iPhone di meja, Notes, kartu daftar), teksnya menempel ke benda itu, kamera tidak pernah diam, lalu pecah ke kinetik bertumpuk dengan satu warna hijau sebagai penekanan.
**Narrative trigger:**
- Manifesto pendek, tiap kalimat punya benda sendiri ("They can't steal time" → jam) → T1
- Kalimat yang bisa dipentaskan di UI asli (chat, notes, playlist, post) → T2
- Pergantian dari satu kalimat ke kalimat berikut lewat zoom-through ke dalam gambar → T3
- Kalimat lepas berpenekanan satu kata di latar putih → T4
- Pengulangan frasa ("let them replicate") yang membangun momentum → T5
- CTA penutup rata kiri di bawah satu benda → T6
**Jangan dipakai untuk:** talking head panjang, dokumenter, penjelasan bertahap bertempo pelan.
**Kata kunci gaya:** UI asli, kamera terus bergerak, kinetik, taktil 3D, satu aksen hijau, padat
**Diambil untuk:** tidak disebut (`Hookmomentum.mp4`). Bagian terkuat: teks yang hidup di dalam UI/benda nyata dan kamera yang terus mendorong/menggeser (momentum tanpa jeda).

## Kondisi footage asli
- 9:16. Hampir tidak ada footage nyata: render benda 3D/foto (poster kertas, iPhone di meja kayu, jam + buku, clapper, headphone/kamera melayang) dan UI digambar lengkap. Satu-satunya footage: klip api (motor terbakar) dibingkai di kartu UI drafts.
- Dua dunia bergantian: gelap bervinyet (`#001013`–`#181612`) dan putih datar (`#EEEEEE`/`#FFFFFF`). Satu subjek besar per adegan (iPhone 66–83 % lebar, kartu daftar 77×50 %, clapper 77×28 %); pembuka satu-satunya adegan banyak objek.
- Kamera: tidak ada kamera asli; setiap shot punya gerak kamera virtual terukur (tidak ada frame tanpa gerak).

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Adegan gelap bervinyet kuat (luma pusat/sudut 55/12 poster, 96/11 clapper, 48/25 jam) dan adegan putih rata dengan bayangan lembut kartu. Aksen: hijau terang `#00FD6C`, hijau neon `#5DB903`, hijau gelap teks kinetik `#0C5B29` (diperiksa: `#146A2C`, dalam toleransi); aksen kecil biru iOS, oranye poster, merah neon, kuning "WATCH". Hijau satu-satunya penekanan TEKS. Tekstur taktil: kertas poster berlapis, meja kayu `#F3B578`, bokeh, debu/grain di clapper, pendar neon.
### Teks
SF Pro/Inter untuk UI dan kalimat lepas; display condensed heavy (Anton/Bebas) untuk poster dan judul; lettering komik tangan di balon iPhone; typewriter di label clapper. Teks hampir selalu menempel benda/UI. Penekanan: ganti warna kata (hijau + garis bawah bergelombang), kilau bintang, abu → hitam saat kata diucapkan, ukuran (THEM).
### Ritme
11 hard cut = 18,2/menit, shot median 2,2 dtk; ditambah ±5 transisi lunak: ±16 ganti adegan = ±26/menit. Event visual 66/menit. Cepat: 0–1,6 dtk dan 23,7–26,9 dtk; lambat: blok putih 13,2–23,7 dtk (10,5 dtk tanpa hard cut) dan penutup clapper 5,7 dtk.

## Pola

### T1 · Object Prop Per Sentence · layout
- **Trigger:** kalimat manifesto yang punya padanan benda harfiah.
- **Yang terlihat (termasuk gerak):** judul poster, judul di atas tumpukan buku + jam digital ("They / can't / steal" = 7–8,4 % : 2,4 %, cokelat redup `#654B44`, cy 31–41 %), clapper "After effect users" untuk kalimat itu. Judul menempel benda: poster ±46×36 % dikelilingi kertas, depth of field sempit dengan bokeh dan pita kuning depan buram. Poster: push ×2,0 + putar 22° dalam 1,6 dtk; jam: push pelan +6 %. (k1, k7; 0–1,6 dtk, jam ±16 dtk)
- **Kenapa bekerja:** benda dipilih harfiah dari kalimat; penonton memahami tanpa membaca; kamera selalu bergerak jadi tiap benda terasa hidup.
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): latar bokeh/kayu → benda utama tajam → judul di atas benda → lapisan depan buram (pita, benda melayang) → vinyet.
  - Gerak: kamera `scale 1→2,0` + `rotate(0→22deg)` `CURVE.whip` 48 f untuk poster; jam `scale 1→1,06` `CURVE.drift` penuh shot; judul masuk per kata `translateY(20px→0)` + `blur(6→0)` `CURVE.reveal` 8 f.
  - Ruang: `perspective: 1000px`, benda `rotateY(-14deg)`; lapisan depan di `translateZ` dekat dengan blur 10 px.
  - Blur & blend: `<CameraMotionBlur shutterAngle={200} samples={16}>` pada putar dan push; `filter: blur()` untuk lapisan depan.
- **SFX:** `Move.mp3` atau `documenter.mp3` (kertas/benda mendarat) untuk poster; hit pada hard cut (kiblat 23,78 s: +14,7 dB): `ES_Designed, Bass Dive, Bass Drop, Deep Sub, 50Hz` bila itu punchline; selebihnya senyap.
- **Pakai bila:** kalimat punya benda yang jelas. · **Jangan pakai bila:** kalimat abstrak tanpa padanan benda.
- **Remix (anti-jiplak):**
  1. Promo jasa konsultan → pertahankan teks menempel benda dan kamera terus bergerak · ganti poster menjadi map dokumen, kayu menjadi marmer.
  2. Latar terang → pertahankan benda bokeh · ganti latar gelap menjadi krem hangat dengan bayangan lunak.
  3. 16:9 → benda di kiri-bawah, judul di kanan-atas.
- *Pengamatan di video asli, bukan target:* poster 46,81×35,86 % (diperiksa, cocok); poster dibingkai garis putih tipis dan ornamen emas di empat sudut (diperiksa, belum tertulis); angka jam abu besar mengisi atas layar hitam iPhone (diperiksa).

### T2 · Sentence Staged In Real UI · layout
- **Trigger:** kalimat yang bisa muncul sebagai chat, catatan, playlist, post, atau kartu daftar.
- **Yang terlihat (termasuk gerak):** playlist bergaya Spotify (judul lagu = kalimat), post IG (like 3.825, akun terverifikasi), lock screen iPhone dengan balon chat, Notes dengan ketikan kursor ("Idea / You woke up to write down."), kartu daftar berikon (77×50 %, push +26 % sambil pan mengikuti ketikan), kolom compose, antarmuka kamera iPhone. Teks: diketik dengan kursor, muncul per kata (abu dulu lalu hitam), baris kartu mengetik dari kiri, balon chat pop. Keluar terbawa cut atau dorongan kamera. (k2–k5; 1,6–13 dtk)
- **Kenapa bekerja:** UI asli dikenali sekilas; kamera yang mendorong mengikuti ketikan menggerakkan mata.
- **Mekanik Remotion (titik awal):**
  - Lapisan: latar → jendela UI lengkap (status bar, angka, ikon, kursor) → teks UI.
  - Gerak: ketik 1 huruf/f dengan kursor berkedip 15 f; balon `scale 0,8→1` `CURVE.land` 8 f; kamera `scale 1→1,26` + `translateX` mengikuti kursor `CURVE.heavy`; iPhone pan besar (±110 % lebar) skala tetap.
  - Ruang: iPhone `rotateX(8deg) rotateY(-12deg)` dengan bayangan jendela di kayu.
  - Blur & blend: motion blur 200°/16 sampel pada pan; bokeh lampu hangat di meja.
- **SFX:** `pop up.mp3` (kartu/balon muncul) satu kali per balon hero; `Keyboardtyping.mp3` dipotong sesuai panjang ketikan; `Enter.mp3` bila ada tombol kirim yang benar-benar ditekan. Kiblat: pop/klik di teks/balon muncul (18,04 s +16 dB).
- **Pakai bila:** UI digambar lengkap dan font UI konsisten. · **Jangan pakai bila:** UI hanya bayangan samar (terbaca palsu).
- **Remix (anti-jiplak):**
  1. Brand SaaS → pertahankan ketikan di UI asli + kamera mengikuti kursor · ganti Notes menjadi editor produk sendiri.
  2. Latar terang → pertahankan UI putih · ganti iPhone menjadi laptop di meja putih.
  3. 16:9 → UI memenuhi lebar, kamera mengikuti kursor ke kanan.
- *Pengamatan di video asli, bukan target:* iPhone 67,78×66,80 % (diperiksa); "Idea" 5,00 % H (diperiksa); kartu daftar 77×50 %.

### T3 · Button-to-Post Zoom-Through · camera
- **Trigger:** pergantian kalimat lewat masuk ke dalam gambar.
- **Yang terlihat (termasuk gerak):** tombol neon pendar (Let/them/MIMIC/COLOR) ternyata gambar di dalam post IG; kamera mundur/zoom-through 5,3 dtk dari tombol ke post IG. Transisi lain: whip berblur + rotasi (0→1,6 dtk); hard cut di kata (4,93; 7,33; 11,27; 23,73 dengan hit); slide/morph putih-ke-putih (15,3; 20,6; 22,3); dissolve-blur ±0,8 dtk ke UI kamera (30,3–31,1). 93 % cut punya onset audio dalam 100 ms. (k2; 5,3 dtk dan seluruh video)
- **Kenapa bekerja:** gerak yang tidak berhenti; transisi muncul dari dunia gambar, bukan tempelan.
- **Mekanik Remotion (titik awal):**
  - Lapisan: gambar tombol di dalam post → post IG sebagai lapisan di bawah.
  - Gerak: `scale 1→0,45` (mundur) `CURVE.heavy` 24 f hingga post terlihat; whip: `rotate` + `translate` + blur arah gerak 8 f `CURVE.whip`; slide putih ke putih `translateX` 10 f.
  - Ruang: datar. Blur & blend: motion blur 200°/16 sampel; dissolve = `blur(0→16px)` cross-fade 24 f.
- **SFX:** `Wooshcameramovementtransisi.mp3` pada zoom-through besar; `Woosh.mp3` pada whip; riser menjelang ganti babak (kiblat 12,69; 16,87; 29,56 dtk): `ES_Designed, Riser, Transition, Fast, Short, Clean 01`.
- **Pakai bila:** gambar sumber memuat gambar lain. · **Jangan pakai bila:** tidak ada alasan visual untuk masuk.
- **Remix (anti-jiplak):**
  1. Promo aplikasi → pertahankan masuk ke dalam gambar · ganti tombol neon menjadi ikon aplikasi di layar ponsel.
  2. Latar terang → transisi putih ke putih dengan kartu bergeser.
  3. 16:9 → zoom-through ke dalam jendela monitor.
- *Pengamatan di video asli, bukan target:* zoom-through 5,3 dtk; bintang push +88 % dalam 2 dtk; drafts pull −46 %.

### T4 · Single-Word Emphasis Loose Sentence · typography
- **Trigger:** kalimat lepas dengan satu kata penekanan di latar putih.
- **Yang terlihat (termasuk gerak):** satu baris di tengah (cx 49 %, cy 50 %), 3–4 kata ("But brands can't"), tinggi huruf 3,3–3,8 %, lebar 55–82 %; "can't" hijau + garis bawah bergelombang; bintang hijau besar buram di sekitar kalimat (depan buram); abu → hitam saat kata diucapkan. (frame "But brands can't", 17 dtk)
- **Kenapa bekerja:** latar putih rata memberi ruang untuk satu kata yang berubah warna sebagai penekanan, bintang buram memberi kedalaman.
- **Mekanik Remotion (titik awal):**
  - Lapisan: putih → kalimat → bintang hijau buram di depan.
  - Gerak: kata muncul per kata abu `#BABABA` lalu hitam 4 f; garis bawah bergelombang digambar `strokeDashoffset 1→0` 8 f; bintang `scale 0→1` `CURVE.land` 10 f dengan `drift`.
  - Ruang: dua lapis (bintang depan buram). Blur & blend: bintang `blur(12px)`.
- **SFX:** senyap per kata; satu `Lasertransision.mp3` di kilau bintang bila perlu.
- **Pakai bila:** kalimat 3–4 kata dengan satu kata kontras. · **Jangan pakai bila:** kalimat panjang.
- **Remix (anti-jiplak):**
  1. Brand skincare → pertahankan satu kata berwarna + garis bawah · ganti hijau menjadi merah muda.
  2. Latar gelap → pertahankan baris di tengah · ganti putih/hitam menjadi putih/hijau.
  3. 16:9 → baris diperlebar, tinggi 3 %.
- *Pengamatan di video asli, bukan target:* huruf 3,3–3,8 % H; lebar 55–82 %.

### T5 · Equal-Size Color-Only Stack · typography
- **Trigger:** frasa yang diulang untuk membangun momentum ("let them replicate").
- **Yang terlihat (termasuk gerak):** semua baris sama besar (±9,1 % H, jarak baris 11 %), penekanan hanya warna (hijau gelap di kolom tengah, sisanya abu `#BABABA`), tersusun zigzag: "Let" di kanan, "them" di tengah, "replicate" melebar ke kiri; tepi gelap seperti film (latar `#ABABAB`); kamera push +53 %. Judul tebal ("INNOVATING / THEM") 16 % vs ±7 % (rasio 2,3), putih bertepi/ekstrusi, miring, satu kata kuning ("WATCH"). (k6, k7)
- **Kenapa bekerja:** ukuran seragam membuat pola berulang terasa ritmis; hanya warna yang berubah.
- **Mekanik Remotion (titik awal):**
  - Lapisan: abu → baris berulang (6–8 baris) → vinyet tepi.
  - Gerak: kamera `scale 1→1,53` `CURVE.heavy` ±60 f; baris naik `translateY` 12 px per baris, jeda `react(i, fps)`.
  - Ruang: datar. Blur & blend: tanpa; tepi film gelap overlay.
- **SFX:** `basmenyebar.mp3` pada kata terakhir bila itu puncak; selebihnya senyap.
- **Pakai bila:** frasa pendek diulang. · **Jangan pakai bila:** frasa berbeda tiap baris.
- **Remix (anti-jiplak):**
  1. Jargon brand → pertahankan baris sama besar + satu warna · ganti hijau menjadi jingga.
  2. Latar terang → abu muda dengan tinta hitam, satu warna aksen.
  3. 16:9 → kolom tengah dipertahankan, 4 baris.
- *Pengamatan di video asli, bukan target:* baris 9,14 % dan 9,06 % H (diperiksa).

### T6 · Left-Aligned CTA Under Object · layout
- **Trigger:** CTA penutup.
- **Yang terlihat (termasuk gerak):** "Visit now" 7,2 % + "& download it" 4,3 % (rasio 1,7), rata kiri x 12 %, di bawah clapper (77×28 % di atas); UI kamera iPhone di depan; clapper pull −38 %; dissolve-blur ±0,8 dtk dari UI kamera ke penutup. Shutter + stab orkestra di akhir. (k8; 30,3–36 dtk)
- **Kenapa bekerja:** ruang di bawah objek besar memberi tempat CTA rata kiri yang mudah dipindai.
- **Mekanik Remotion (titik awal):**
  - Lapisan: grain → UI kamera → clapper → CTA.
  - Gerak: clapper `scale 1,38→1` `CURVE.heavy` 30 f; CTA `translateY(16px→0)` + `opacity` `CURVE.reveal` 8 f, baris kedua menyusul 3 f.
  - Ruang: datar. Blur & blend: `filter: blur(8px)` lapisan UI kamera depan.
- **SFX:** `ES_User Interface, Click, Button, Double Click, Fast Phone Tap` (shutter ponsel) di tombol rana; stab orkestra tidak ada di SFXIrfan (stab, tidak ada di SFXIrfan).
- **Pakai bila:** objek besar di atas, ruang kosong di bawah. · **Jangan pakai bila:** CTA butuh URL panjang.
- **Remix (anti-jiplak):**
  1. Kursus online → pertahankan CTA rata kiri di bawah objek · ganti clapper menjadi buku catatan.
  2. Latar terang → CTA hitam di kertas krem.
  3. 16:9 → CTA di kiri-bawah, objek di kanan.
- *Pengamatan di video asli, bukan target:* "Visit now" 7,34 %, "download" 4,30 % (rasio 1,709; diperiksa).

## Audio (bila dibedah)
earshot `--detail high`: 217 onset (6,0/dtk), 96 berlabel: 9 hit, 6 foley/pop, 5 UI (chat pop), 3 riser, 2 whoosh, 1 shutter. Pop/klik saat teks/balon muncul, hit pada hard cut, riser sebelum ganti babak, whoosh di gerak kamera (7,59; 17,48), shutter + stab orkestra di akhir. SFX duduk di dalam mix (umumnya < 12 dB di atas bed). Musik: bed "inspirational corporate / aggressive" dengan vocal chop, ±136 bpm tanpa grid tegas; −14,4 LUFS, true peak −2,1 dBTP, LRA 1,6 LU; VO pria sepanjang video; puncak 28,5–31,5 dtk (−13,2 LUFS).

## Yang harus terasa sama saat disandingkan
- Teks utama menempel pada benda atau UI yang dikenali, bukan melayang di latar kosong?
- Tidak ada frame yang berhenti: kamera terasa mendorong terus?
- Kalimat lepas di putih tetap satu baris di tengah dengan satu kata berwarna?
- Kinetik tumpuk: semua baris sama besar, hanya warna yang berbeda?
- Adegan gelap bervinyet punya 2–3 lapis dengan lapisan depan buram?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
