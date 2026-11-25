---
id: "63"
pola: Virtual Camera Desktop Stage
kategori: camera
kategori_lain: [layout, typography]
trigger: demo fitur produk atau AI tool tanpa pembicara; urutan aksi "klik lalu hasil muncul"; kalimat perintah atau prompt yang harus terbaca
sumber: promo UI "invideo editor" × Claude (file Motiongrapich.mp4, gaya desktop macOS) · 16:9 · 32,2 dtk
dilihat_bergerak: ya
diukur: ya
alias: []
---
# 63 · Virtual Camera Desktop Stage

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: unggahan Irfan, file `Motiongrapich.mp4` (kreator tidak tercantum; end card "invideo editor") · 16:9 (736×414, 30 fps), 32,2 dtk · Frame: `../../guide/referensi/sheets/63-motiongrapich.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/63-k1…k8-*.jpg` (k1 dock + wallpaper, k2 kartu judul, k3 pil tab + grid, k4 kartu UI gelap, k5 prompt kaca, k6 chat + klip, k7 editor split, k8 end card) + urutan gerak `63-k9-urutan-judul-dan-grid.jpg`, `63-k10-urutan-sapuan-grid-dan-punch.jpg`
> Video sumber: `/home/irfan/work/pustaka-video/unggahan/Motiongrapich.mp4`
> Dilihat bergerak: **ya** (strip semua frame 0–1,2; 1,5–2,5; 2,3–3,5; 3,8–5,0; 7,0–8,2; 12,4–13,6; 15,0–16,2 dtk; ikhtisar 1 fps seluruh video). Angka kamera dan audio dari bedah lama (`ukuran.md`), tidak diukur ulang.

**Inti mekanik (1 kalimat):** Seluruh desktop (foto wallpaper, jendela aplikasi, dock, kursor) diperlakukan sebagai satu objek yang dibawa satu kamera virtual yang tidak pernah diam: push pelan, pull saat babak baru, geser saat panel masuk, dan punch ke kotak prompt supaya teks UI terbaca besar; antar-babak dijahit gelombang grid kotak yang dipicu klik.
**Narrative trigger:**
- Demo fitur atau AI tool tanpa pembicara, dari "buka aplikasi" sampai "hasil jadi" → T1
- Judul klaim 2–4 kata di kartu kosong ("Your videos now.") → T2
- Pergantian babak yang dipicu aksi di layar (klik tab, selesai mengetik) → T3
- Kolom input atau prompt tampil di atas latar foto bertekstur → T4
- Kalimat perintah yang diketik dan harus terbaca besar → T5
**Jangan dipakai untuk:** talking head, cerita emosional, konten tanpa UI, UI yang senada nada dengan latarnya.
**Kata kunci gaya:** Apple-like, desktop sinematik, hangat-senja, sigap, UI-sebagai-tokoh
**Diambil untuk:** nama file asli "Motiongrapich.mp4" (= motion graphic). Dibedah paling dalam: gerak UI, kamera, transisi, lalu teks. Bagian terkuat: kamera virtual di atas UI + transisi grid/wash. Tidak diambil: palet senja-oranye dan logo.

## Kondisi footage asli
- Tidak ada footage kamera dan tidak ada pembicara: semua adegan adalah UI yang dibangun ulang di atas **foto wallpaper** (gunung biru di pembuka, senja dan ladang bunga oranye di babak proses), atau latar putih/hitam polos untuk kartu judul dan kartu UI.
- Wallpaper **ramai tetapi bernada sedang-gelap dan jenuh**; UI di atasnya gelap atau kaca terang, jadi UI selalu berbeda nada dengan latarnya.
- 16:9, 414 px tinggi: teks UI kecil tidak dimaksudkan terbaca kecuali saat punch. Tidak ada VO yang terlihat.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Tiga dunia latar: wallpaper foto gunung (langit `#1887E6`), kartu putih `#FDF8FC`, UI gelap `#09060A` dengan glow oranye dari bawah. Setelah babak 2 semua latar foto senja/ladang oranye (langit `#DD8262`); biru hanya di pembuka dan kata "Your" (`#1986C4`). Satu aksen oranye; tombol kirim terukur ulang di k5 = `#C16248` (koreksi periksa; kartu lama `#E4550F`). Tanpa grain; wallpaper hiper-saturasi, UI tajam.
### Teks
Sans sistem Apple (SF Pro/Inter semibold–bold); serif hanya di salam kotak prompt. Penekanan = warna. Tanpa caption. Teks UI 1,5–2,7 % tinggi frame; saat punch 10,6 %.
### Ritme
11 cut = 20,5/menit, shot median 3,0 dtk. Babak: dock (0–2) → judul → tab (3,4–5) → kartu setup → prompt senja (7,3–9,8) → klip jadi → editor split, 3 perintah (12,7–29) → end card (29–32,2). Cepat di 7 dtk pertama; babak editor 16 dtk dipecah panel masuk-keluar dan punch, bukan cut.

## Pola

### T1 · Floating Window Virtual Camera · camera
- **Trigger:** demo produk atau AI tool tanpa pembicara; sisipan layar di video berpembicara.
- **Yang terlihat (termasuk gerak):** satu jendela aplikasi gelap utuh di tengah, wallpaper terlihat di keempat sisi, dock macOS di bawah. Kamera push pelan, pull saat babak baru, dan menggeser jendela ke kanan saat panel chat masuk dari kiri. Jendela tidak terpotong tepi kecuali saat punch. Diam total hanya 19,5–21,5 dtk saat preview berubah. (k1, k7; 12,4–16 dtk)
- **Kenapa bekerja:** foto latar jenuh bernada sedang, jendela gelap: kontras nada memisahkan UI tanpa garis tepi tebal; wallpaper di sekeliling memberi rasa layar komputer sungguhan.
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): foto wallpaper tajam → jendela UI (bayangan lembut) → panel/kursor. Semua di satu `<AbsoluteFill>` yang ditransformasikan; elemen tidak bergerak sendiri-sendiri.
  - Gerak: push 3–7 % per 0,5 dtk = `CURVE.heavy` 1,00→1,06 sepanjang beat; pull 3–11 % saat babak baru (`CURVE.heavy`); geser lateral jendela +17–20 % lebar saat panel masuk (±15 f, `CURVE.land`), kembali −30 % saat panel keluar; hold pakai `drift()` dari `curves.ts`, bukan diam mati.
  - Ruang: datar, 2D transform pada grup.
  - Blur & blend: `<CameraMotionBlur shutterAngle={200} samples={16}>` pada grup; tanpa blend mode.
- **SFX:** famili `air`, `mekanik` · `Woosh.mp3` pada pull besar; `Enter.mp3` hanya pada klik penting; `Keyboardtyping.mp3` dipotong sesuai teks (−12…−16 dB). Kosakata asli belum dikonfirmasi telinga.
- **Pakai bila:** UI dan latar berbeda nada. · **Jangan pakai bila:** UI terang di foto terang atau gelap di gelap; jendela terlalu besar sehingga wallpaper hilang.
- **Remix (anti-jiplak):**
  1. UI aplikasi bertema terang → pertahankan satu kamera + wallpaper tajam di keempat sisi · ganti wallpaper gelap/jenuh.
  2. 9:16 → pertahankan jendela utuh + wallpaper di keempat sisi · ganti jendela jadi lebih sempit dan tinggi.
  3. Dashboard produk UMKM (kasir, stok) di latar foto toko → pertahankan push/pull per babak · ganti dock menjadi bilah menu aplikasi itu.
- *Pengamatan di video asli, bukan target:* jendela ±56–60 % lebar × 57–61 % tinggi (terukur ulang 56,5 × 57,5 %); dock 16 × 33 %.

### T2 · Cut-to-Small-Line Title · typography
- **Trigger:** judul atau klaim 2–4 kata di kartu kosong.
- **Yang terlihat (termasuk gerak):** dari dock, sapuan biru naik menutup frame, lalu latar putih; "Your" muncul huruf demi huruf dengan blur, besar, biru. Satu frame kemudian **potongan** (bukan menyusut pelan) ke bingkai lebih lebar: "Your" kecil, "videos" dan "now." masuk per kata, biru lalu berubah hitam (perubahan warna butuh urutan frame; belum diverifikasi di still). Keluar: sapuan oranye bergradien dari kanan bawah ke hitam. (k2, k9; 1,5–2,7 dtk)
- **Kenapa bekerja:** kartu kosong tanpa objek lain; kata pertama besar sendirian memberi fokus, potongan ke baris kecil memberi ruang seluruh frasa.
- **Mekanik Remotion (titik awal):**
  - Lapisan: latar putih + vignette halus → teks. Dua `<Sequence>`: kata besar, lalu baris lengkap kecil.
  - Gerak: huruf besar `move(frame, start+i, 6, "reveal")` blur 10→0 px; baris kecil per kata ±6 f (±0,2 dtk/kata), warna aksen → hitam dalam 8 f; potong keras antar `Sequence`, tanpa interpolasi skala.
  - Ruang: datar. Blur & blend: `filter: blur()` untuk masuk, tanpa blend.
- **SFX:** famili `air` · senyap (KT per kata); sapuan warna pembuka `Woosh.mp3` bila ingin.
- **Pakai bila:** kartu kosong. · **Jangan pakai bila:** di atas footage ramai atau pembicara.
- **Remix (anti-jiplak):**
  1. Latar gelap → pertahankan potong ke baris kecil · ganti huruf putih, satu aksen; frasa panjang: hanya kata pertama tampil besar.
  2. Kartu produk UMKM → kata besar = nama produk, baris kecil = harga/manfaat.
- *Pengamatan di video asli, bukan target:* "Your" 15,9 % tinggi (terukur ulang 15,94 %), baris akhir 6,3 %, rasio 2,5× (terukur 2,44×).

### T3 · Click-Triggered Grid Wave · camera
- **Trigger:** pergantian babak UI yang dipicu aksi terlihat.
- **Yang terlihat (termasuk gerak):** (a) kursor mengklik tab "Claude", **cincin kotak oranye memancar dari titik klik**, melebar ke seluruh layar dan menipis, meninggalkan hitam (bedah lama menyebutnya mosaik penuh layar; koreksi 19 Nov: gelombang grid). (b) Sapuan kotak kuning-oranye dari tepi kanan ke kiri membuka jendela editor. (c) Di kotak prompt yang di-punch, kotak oranye bergerak kanan ke kiri di dalam bidang prompt. Sebagian kotak hanya garis tipis terang sehingga kisi berlubang (periksa). (k3, k9, k10; 3,8–5,0; 12,4–13,6; 15,0–16,2 dtk)
- **Kenapa bekerja:** selalu ada pemicu terlihat atau arah jelas; warna kotak sama dengan aksen tombol; latar gelap membuat kotak terbaca sebagai cahaya.
- **Mekanik Remotion (titik awal):**
  - Lapisan: scene A → grid kotak (sel ±8 % tinggi) → scene B di bawah grid.
  - Gerak: nyala tiap sel tertunda menurut jarak ke titik klik (cincin) atau ke tepi (sapuan), selisih per sel 1–2 f, pakai `react()` bila jaraknya diskret; tiap sel `CURVE.reveal` 4 f nyala lalu `CURVE.leave` 6 f padam; total 0,3–0,5 dtk.
  - Ruang: datar. Blur & blend: sel diredupkan sekeluarga dengan latar adegan (hitam → bara/arang gelap, catatan 19 Nov); `mixBlendMode: "screen"` bila latar gelap.
- **SFX:** famili `glitch`, `mekanik`, `air` · whoosh/scan famili `air` tanpa desis (file SFXIrfan lama dilarang; `sfx_cari.py --famili air`) atau `Scanning dan gerak kurva.mp3` pada sapuan; klik `Enter.mp3` di pemicu. Satu bunyi per gelombang.
- **Pakai bila:** ada pemicu terlihat (klik, akhir ketikan). · **Jangan pakai bila:** tanpa pemicu (terbaca cacat), di atas pembicara, di setiap transisi.
- **Remix (anti-jiplak):**
  1. Latar terang → pertahankan cincin dari klik · ganti sel gelap/jenuh, bukan pastel.
  2. Merek lain → pertahankan titik pancar di tombol · ganti warna sel dari aksen tombol itu.
- *Pengamatan di video asli, bukan target:* transisi lain di video: wipe warna biru → putih (2,0 dtk), wash oranye (3,2–3,4), zoom-through prompt → chat (9,5–10), cross-dissolve ke end card buram (29).

### T4 · Frosted Prompt Over Busy Photo · layout
- **Trigger:** kolom input tampil di atas latar foto bertekstur nada sedang/gelap.
- **Yang terlihat (termasuk gerak):** wash oranye menyapu dari kartu UI gelap ke foto senja; kotak prompt kaca (terang, buram, tepi tipis) naik dari bawah dan menetap; salam serif di atasnya; push pelan. Bunga paling depan sangat buram, bunga jauh dan langit lebih tajam (bukan hanya buram di balik kaca; periksa). (k5; 7,0–8,2 dtk)
- **Kenapa bekerja:** latar ramai dan jenuh diburamkan di balik kaca sehingga kaca terbaca bidang terang tenang; teks gelap di kaca terang.
- **Mekanik Remotion (titik awal):**
  - Lapisan: foto → bidang kaca (`backdropFilter: blur(24px)` + isi putih ~0,55 + border 1 px terang + bayangan halus) → teks UI.
  - Gerak: naik dari bawah `CURVE.land` ±14 f; push foto 1,00→1,04 `CURVE.drift`.
  - Blur & blend: backdrop blur; tanpa blend.
- **SFX:** famili `ui` · `pop up.mp3` saat kotak menetap; sisanya senyap.
- **Pakai bila:** latar bertekstur sedang/gelap. · **Jangan pakai bila:** latar terang, polos, atau abu muda.
- **Remix (anti-jiplak):**
  1. Latar terang/polos → pertahankan naik dari bawah · ganti bidang solid putih berbayangan jelas atau gelap.
  2. Kolom pencarian toko online di atas foto produk, latar gelap → pertahankan kaca buram (tepi lebih terang) · ganti isi jadi kueri produk.
- *Pengamatan di video asli, bukan target:* kotak kaca ±60 % lebar (terukur ulang 62,1 %).

### T5 · Camera Punch Into Typed Prompt · camera
- **Trigger:** kalimat perintah atau prompt diketik yang harus terbaca.
- **Yang terlihat (termasuk gerak):** kamera melompat dekat ke kotak prompt (potongan, lalu drift); kalimat yang diketik terbaca besar di kiri; tepi jendela dan sedikit wallpaper/dock masih terlihat; lalu pull kembali. Mosaik oranye menyapu kotak prompt dari kiri di 27,7–28,6 dtk. (k7, k10; 15,0–16,2 dan 27,0–27,5 dtk)
- **Kenapa bekerja:** tidak ada teks kinetik terpisah; teks besar dicapai dengan kamera sehingga UI tetap satu objek.
- **Mekanik Remotion (titik awal):**
  - Gerak: keyframe skala+translate pada grup desktop ke kotak prompt, 1,4–1,8×, masuk 4–6 f `CURVE.whip`, hold dengan `drift()`, keluar `CURVE.heavy` ±18 f; kotak prompt tidak dipisah jadi elemen sendiri.
  - Ruang: datar. Blur & blend: motion blur kamera aktif saat gerak.
- **SFX:** famili `air`, `mekanik` · `Woosh.mp3` pada punch; `Keyboardtyping.mp3` selama ketikan (±12 huruf/dtk).
- **Pakai bila:** kalimat perintah yang harus terbaca. · **Jangan pakai bila:** kata narasi non-UI (jangan dimasukkan ke kolom prompt hanya untuk dibesarkan).
- **Remix (anti-jiplak):**
  1. Kalimat diucapkan pembicara → tetap teks kinetik di luar UI.
  2. Terminal atau chat SaaS 9:16 → pertahankan punch 1,4–1,8× dan tepi jendela · ganti objek ke baris perintah.
- *Pengamatan di video asli, bukan target:* punch ±1,4–1,8×, geser −39 % x di 27,0 dtk; teks punch 10,6 % tinggi.

## Audio (bila dibedah)
SFX: lonjakan noise terang di 7, 10–11, 20, 28 dtk = bunyi transisi; onset 5,5/dtk; label earshot tidak terukur. Musik ±117 bpm; mix −14,5 LUFS, true peak +0,6 dBTP (clipping), LRA 5,0 LU. VO: tidak terukur.

## Yang harus terasa sama saat disandingkan
- UI terasa layar komputer sungguhan yang mengambang di atas foto, bukan kotak ditempel di latar polos?
- Nada UI dan latar jelas berbeda sehingga UI terbaca tanpa garis tepi tebal?
- Saat kalimat perintah harus terbaca, terasa kameranya yang mendekat, bukan teks yang ditempel?
- Tiap transisi grid terasa dipicu sesuatu yang terlihat?
- Kamera terasa hidup sepanjang video, tetapi UI tetap satu objek?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat. Dipakai sebagai **teknik** (UI mengambang di atas wallpaper) di builder-trap-show-your-work dan builder-trap-r2.
- builder-trap-r2 v3 B12–B13 ditolak Irfan ("melenceng jauh", 15 Nov): wallpaper gradien pastel polos (bukan foto), jendela ChatGPT terang ±75 % lebar terpotong tepi kanan/bawah, tanpa dock/kursor, KT abu `#A8A69F` di latar oranye, punch 3,2× sampai konteks desktop hilang. Saat dipinjam, yang wajib terbawa: foto wallpaper tajam, jendela utuh 56–60 % lebar × 57–61 % tinggi dengan wallpaper di keempat sisi, UI gelap, dock + kursor beraksi, punch 1,4–1,8× yang masih menyisakan tepi jendela + wallpaper. Jendela rata tengah dan utuh; selama UI tampil tidak ada teks kinetik, satu-satunya teks = teks UI yang diketik ("fokus ke visual saja"). Latar = foto asli (diunduh atau dibuat AI), tone-nya bebas: merah/oranye di kartu ini hanya tone fotonya, bukan warna latar yang harus ditiru dengan gradien.
- Teks prompt besar saat punch dicapai **hanya dengan kamera** yang zoom ke kotak prompt di dalam jendela (§2, §6). UI = satu objek: tidak ada elemen UI (kotak prompt, tombol) yang dipisah lalu diperbesar sendiri.
- 19 Nov 2026 · skill-development-journey-20261116: "mosaik piksel" di bedah ini sebenarnya **gelombang grid**: cincin kotak yang memancar dari titik klik (4,2–4,9 dtk), bukan mosaik penuh layar. Selalu beri pemicu yang terlihat (klik kursor pada tombol/tab) dan ambil warna sel dari pemicu itu, diredupkan sekeluarga dengan latar adegan (latar hitam → bara/arang gelap); tanpa pemicu, kotak yang muncul tiba-tiba terbaca sebagai cacat. Dipakai hanya di momen khusus, bukan semua transisi; transisi lain tetap zoom/cut/b-roll dengan ease + blur gerak. Komponen: `projects/skill-development-journey-20261116/remotion/src/video/bersama/ui-asli/claude/GelombangGrid.tsx`.
