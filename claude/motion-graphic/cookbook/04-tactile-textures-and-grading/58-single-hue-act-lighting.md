---
id: "58"
pola: Single-Hue Act Lighting
kategori: texture
kategori_lain: [layout, camera]
trigger: cerita masalah → solusi 10–20 dtk; perubahan suasana per babak lewat satu warna cahaya (netral → bahaya → untung); satu elemen info per adegan di ruang gelap
sumber: GatesFX (iklan broker forex, watermark di frame) · 9:16 · 12,8 dtk
dilihat_bergerak: tidak
diukur: ya
alias: []
---
# 58 · Single-Hue Act Lighting

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: GatesFX (iklan broker forex, watermark gatesfx di semua frame), file `pustaka-video/unggahan/GatesFX_ssspin.io_1794219240.mp4` · 9:16 (720×1280, 30 fps), 12,8 dtk · Frame: `../../guide/referensi/sheets/58-gatesfx.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/58-k1-grafik-naik-karakter.jpg`, `58-k2-kartu-kata-kunci.jpg`, `58-k3-karakter-ikon-masuk.jpg`, `58-k4-karakter-ikon-lengkap.jpg`, `58-k5-penghitung-profit.jpg`, `58-k6-cut-dari-gelap.jpg` · Bedah ukuran: `../../guide/referensi/ukuran/58-gatesfx-ukuran.md`; pengukur independen: `58-gatesfx-periksa.md` (putusan LAYAK)
> Video sumber: `/home/irfan/work/pustaka-video/unggahan/GatesFX_ssspin.io_1794219240.mp4`
> Dilihat bergerak: **tidak** (bedah dari frame diam dan pengukuran; bedah geraknya sebelum dipakai)

**Inti mekanik (1 kalimat):** Satu maskot 3D bulat dari kaca/krom di ruang hitam pekat disinari satu sumber cahaya berwarna per babak (putih → merah → hijau); tiap adegan hanya membawa satu elemen info yang menempel di sekitar maskot, dan warna cahaya sendiri yang memberi tahu penonton suasana babak.
**Narrative trigger:**
- Cerita masalah → solusi pendek yang butuh pergantian suasana tanpa kata ("lalu rugi… lalu untung") → T1
- Satu nilai/kebiasaan yang disebut sebagai kunci ("disiplin") → T2
- Angka hasil yang menghitung naik di akhir → T3
- Dua shot pembuka yang bergerak searah melintasi cut → T4
**Jangan dipakai untuk:** podcast/talking head, konten hangat-personal, penjelasan padat data, brief tanpa objek/maskot yang konsisten.
**Kata kunci gaya:** noir, 3D glossy, minimal, sinematik, satu aksen per babak
**Diambil untuk:** nama file "GatesFX" tidak menyebut bagian; bagian terkuat menurut kartu lama: cahaya + warna per babak dan skala maskot, lalu motion graphic 3D. Tidak ada keterangan bahwa kartu ini diambil untuk SFX/transisi (lihat Audio: hanya petunjuk earshot).

## Kondisi footage asli
Tanpa footage; semua adegan 3D render dengan maskot yang sama. 9:16, latar hitam pekat ≥70 % frame, satu subjek besar di tengah (pusat x 50 %, y ±45 %), 20 % bawah frame kosong (watermark di y 78–82 %). Kamera: truck menyamping di dua shot pembuka, lalu hampir diam.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Latar `#000000`–`#0A0A0A`, tanpa grain atau tekstur kertas. Satu warna cahaya per babak, tidak pernah dua aksen: putih netral, merah (glow tepi atas `#36090D`, rim light kepala `#FFEEF2`), hijau (bar `#1A4507` bergradien ke tepi terang, beam `#112D05`, titik putih di puncak beam). Warna garis merah: `#812B39` menurut kartu lama, median inti ≈ `#4E2C32` menurut pengukur independen (koreksi diterapkan; sampel garis tipis). Biru `#1264AA` hanya di logo watermark. Material: maskot kaca/krom dengan rim light tajam dan pantulan lantai; bingkai grafik kaca berkilau di sudut kiri atas; cahaya volumetrik di shot 1–2 dan 4.
### Teks
Sangat sedikit: satu kata kunci dan satu angka. "DISCIPLINE" ≈ sans extended bold italic kapital (mirip Eurostile Extended / Michroma Italic) bergradien abu gelap → putih di kanan; angka + label ≈ Montserrat Bold/SemiBold. Satu kata atau satu angka per tampil; kata menempel objek (kartu), tidak per huruf.
### Ritme
4 shot, 3 cut (1,77 · 3,27 · 9,27 dtk) = 14 cut/menit; durasi shot 1,8 / 1,5 / 6,0 / 3,5 dtk. Dua shot cepat bergerak, satu shot panjang diam yang mengisi diri, satu shot hasil. Cut 2 dan 3 jatuh ±0,07–0,10 dtk sebelum kalimat VO baru.

## Pola

### T1 · Single-Hue Act Lighting · texture
- **Trigger:** pergantian suasana per babak (netral → masalah → untung) tanpa mengandalkan kata.
- **Yang terlihat (termasuk gerak):** shot 1–2 cahaya putih netral (grafik naik, kartu); shot 3 glow merah dari tepi atas tumbuh sepanjang shot (piksel terang zona atas 695 → 5.936), rim light pada kepala maskot, garis merah turun diagonal; shot 4 beam hijau dari bawah dengan titik putih di puncak. Hanya satu warna cahaya pada satu waktu. (k1, k3–k5)
- **Kenapa bekerja:** latar hitam pekat membuat satu sumber cahaya berwarna menentukan seluruh frame; warna menjadi sinyal suasana sehingga satu maskot yang sama bisa membawa tiga babak.
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): hitam → glow/beam (gradien radial/linear) → maskot (render/PNG) + pantulan lantai → elemen info → watermark.
  - Gerak: glow tumbuh dengan `interpolate` linier-lembut (`CURVE.drift`) selama seluruh shot; pergantian warna di cut, bukan crossfade.
  - Ruang: datar atau 2,5D ringan (maskot dan elemen info satu grup).
  - Blur & blend: `mixBlendMode: "screen"` untuk glow; `filter: blur(40px)` untuk volumetrik; rim light dengan `drop-shadow` tipis.
- **SFX:** senyap pada perubahan warna; drone/bed musik mengikuti. Bila diberi suara: satu `ES_Designed, Riser, Transition, Fast, Short, Clean 01` menuju babak merah.
- **Pakai bila:** latar hitam dan satu subjek konsisten di tengah. · **Jangan pakai bila:** subjek terang/berwarna ramai (cahaya berwarna tidak terbaca).
- **Remix (anti-jiplak):**
  1. Produk UMKM botol/kotak di meja hitam → pertahankan satu cahaya per babak (putih → oranye peringatan → hijau), ganti maskot jadi produk nyata dengan matte.
  2. UI SaaS → satu kartu dashboard kaca di tengah, cahaya berubah dari biru netral ke merah (error) ke hijau (selesai).
  3. Latar terang → ganti hitam dengan tinta gelap/ungu dalam satu panel; cahaya diganti warna latar (krem → merah muda → mint), tetap satu warna per babak.
- *Pengamatan di video asli, bukan target:* piksel terang zona atas shot 3 naik 695 → 5.936.

### T2 · Glass Mascot Keyword Plate · layout
- **Trigger:** satu kata nilai atau kebiasaan yang jadi inti pesan ("disiplin", "konsisten").
- **Yang terlihat (termasuk gerak):** kartu putih miring (paralelogram 54 × 12,5 %) keluar dari sisi kanan dada maskot seperti plakat yang dipegang; "DISCIPLINE" kapital gradien (cap 2,266 % tinggi menurut pengukur, kartu lama 2,2 %); kartu sudah ada saat cut dan ikut tergeser gerak kamera menyamping; sudut kiri-bawah kartu tertutup bahu maskot. Maskot siluet gelap ±45 % lebar, sorot cahaya diagonal. Di shot 3: ikon kaca bulat (Ø ±13 % lebar) muncul satu per satu di busur tipis di atas kepala dengan titik putih di ujung busur dan puncaknya, garis merah turun memotong diagonal di depan busur dan maskot. (k2–k4)
- **Kenapa bekerja:** objek info menempel tubuh maskot sehingga terbaca sebagai milik karakter; ikon satu per satu memberi ritme tanpa teks.
- **Mekanik Remotion (titik awal):**
  - Lapisan: sorot cahaya → maskot gelap → kartu (tumpang tindih dengan bahu) → ikon → garis merah paling depan.
  - Gerak: ikon masuk `move(frame, start + react(i), 8, "land")` dengan jeda tidak rata (`react` dari `curves.ts`); busur digambar `strokeDashoffset` 20 f; garis merah `CURVE.reveal` 12 f.
  - Ruang: datar; kartu `skewX(-12deg)`.
  - Blur & blend: tanpa blur gerak; glow ikon `drop-shadow`.
- **SFX:** ding/glockenspiel bersamaan ikon pertama + busur (4,19–4,75 dtk), pop kecil di ikon berikutnya (5,15 dan 6,96 dtk); padanan SFXIrfan: `ES_User Interface, Click, Pops, Glass, UI, Pops` untuk ikon kaca, `pop up.mp3` untuk kartu muncul; satu bunyi per ikon, bukan per huruf kata.
- **Pakai bila:** satu kata, satu objek pembawa. · **Jangan pakai bila:** kalimat panjang di kartu.
- **Remix (anti-jiplak):**
  1. Talking head kreator → kartu kata keluar dari sisi bahu, pertahankan miring + gradien, ganti huruf dan warna.
  2. Produk UMKM → kartu kata keluar dari kotak kemasan; ikon manfaat di busur di atas produk.
  3. 16:9 → busur ikon di sisi kosong, kartu di sisi lain.
- *Pengamatan di video asli, bukan target:* kepala maskot Ø 19 % lebar di shot 3 (periksa: 19,44 %, cocok), maskot 23 × 36 % di shot 3, 27 × 42 % di shot 1; ikon Ø ±13 % lebar.

### T3 · Beam-Anchored Counting Panel · layout
- **Trigger:** angka hasil yang naik cepat sebagai penutup ("untung 578.799").
- **Yang terlihat (termasuk gerak):** panel hijau tipis (64 % lebar) di sepertiga atas, angka besar cap 4,5 % tinggi (lebar 42 %, pusat (60, 27) menurut kartu lama; periksa (59,93; 27,46), cocok) dengan label "Profit" 1,3 % di kiri atasnya (rasio 3,4×; periksa 3,21×, cocok); angka menghitung naik ±95.000/dtk (odometer); beam hijau segitiga berpuncak tajam di bawahnya; push sangat pelan (skala 1,009), puncak beam naik 491 → 454 px. Tanpa maskot. (k5; 9,3–12,8 dtk)
- **Kenapa bekerja:** beam menunjuk ke angka sehingga mata mengikuti cahaya ke hasil; hanya satu angka di frame.
- **Mekanik Remotion (titik awal):**
  - Lapisan: hitam → beam volumetrik → panel hijau → angka + label → watermark.
  - Gerak: counter `Math.round(interpolate(frame,[s,s+105],[0,N],{easing: CURVE.reveal}))` selama ±3,5 dtk; push `scale 1→1.009` `CURVE.drift`.
  - Ruang: datar. Blur & blend: beam `mixBlendMode: "screen"`.
- **SFX:** `Notif.mp3` atau `ES_User Interface, Click, UI Buttons, Confirm, Menu` di tiba angka akhir; riser pendek selama menghitung bila perlu.
- **Pakai bila:** satu angka hasil dengan label satu kata. · **Jangan pakai bila:** lebih dari satu angka.
- **Remix (anti-jiplak):**
  1. Penjualan UMKM → "Terjual 1.240" dengan beam warna produk.
  2. Dashboard SaaS → angka retensi menghitung di panel kaca.
  3. Latar terang → angka gelap di panel aksen, beam diganti sinar tipis.
- *Pengamatan di video asli, bukan target:* panel 64 % lebar; beam puncak di y 36 %.

### T4 · Same-Direction Truck Cut · camera
- **Trigger:** dua adegan pembuka yang harus terasa satu gerak meski berganti objek.
- **Yang terlihat (termasuk gerak):** shot 1 dan 2 truck menyamping ke kanan; maskot bergeser ke kiri 24 % lebar (1,7 dtk) lalu 21 % lebar (1,5 dtk); arah sama melintasi cut; shot 3 diam (skala 1,001, geser <0,2 %); cut 2 dan 3 lewat frame hampir hitam. (k1, k2, k6)
- **Kenapa bekerja:** momentum searah menyambung dua shot, shot diam sesudahnya terasa sebagai jeda.
- **Mekanik Remotion (titik awal):**
  - Gerak: grup scene `translateX(0 → −24 %)` 51 f @30 `CURVE.heavy`; shot berikutnya mulai dengan kecepatan sama, `−21 %` 45 f; frame hitam 2–3 f di cut.
  - Ruang: datar atau parallax latar 0,8×. Blur & blend: motion blur 200°.
- **SFX:** `scaningfast.mp3` atau `Woosh.mp3` satu per truck bila diberi suara; belum dibedah di sumber.
- **Pakai bila:** dua shot dengan arah gerak sama. · **Jangan pakai bila:** arah berlawanan (terasa mundur).
- **Remix (anti-jiplak):**
  1. Dua kartu produk berurutan, truck ke kiri.
  2. UI scroll horizontal antar bagian.
  3. Vertikal untuk 9:16 (naik).
- *Pengamatan di video asli, bukan target:* truck 24 % dan 21 % lebar; cut pada ±0,07–0,10 dtk sebelum VO.

## Audio (bila dibedah)
earshot: 78 event, 52 berlabel suara VO; sisanya petunjuk: 9 UI (ding/pop), 3 whoosh, 2 riser, 2 hit; whoosh 7,37 dtk. Level SFX relatif VO dan musik tidak terukur (tanpa stem). Musik: VO pria di atas bed "inspirational corporate", tanpa grid beat jelas (librosa 89 bpm, tidak kuat); mix −16,9 LUFS, true peak +0,6 dBFS (ebur128) / −0,2 dBTP (earshot), LRA 3,7 LU; penurunan musik di 2,60 dtk (0,5 dtk) dan 8,90 dtk (0,4 dtk) sebelum cut.

## Yang harus terasa sama saat disandingkan
- Satu warna cahaya per adegan, tidak dicampur, dan suasana babak terbaca dari warna saja?
- Latar benar-benar pekat dengan rim light tipis pada subjek?
- Satu elemen info per adegan, menempel pada subjek?
- Angka menghitung dengan beam yang menunjuk ke angka?
- Dua shot pembuka bergerak searah melintasi cut, lalu shot diam?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
