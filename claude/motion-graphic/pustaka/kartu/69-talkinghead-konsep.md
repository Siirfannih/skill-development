# 69 · Talking head konsep "Slide Text" (kreator ES, demo preset After Effects)

> **Status: standar kualitas Irfan.** Video ini target yang harus dicapai, bukan contoh opsional.
> Sumber: file Irfan `Talkingheadkonsep.mp4` (kreator tidak tercatat; bahasa Spanyol Rioplatense, isi: promosi preset AE "Slide Text", CTA komentar "huella") · 4:3 (960×720), 25 fps, 37,2 dtk · Frame: `../../guide/referensi/sheets/69-talkinghead-konsep.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/69-k*.jpg` · Bedah lengkap: `ukuran.md` (folder ini)
> Kedalaman bedah: **dalam**
> Cek PETA: **bukan** kartu 01 Memory Secrets (01 = 9:16, merah neon). Satu keluarga dengan **14 pedro.andradeok** (format 4:3 960×720 sama, kata putih mengorbit pembicara, transisi grid-tile); kreator yang sama belum dipastikan.

**DNA (satu kalimat):** Talking head sinematik gelap-sejuk yang tiap 1 dtk berpindah ke sisipan (lanskap, kaki, tangan, UI), diikat satu neo-grotesk putih rapat yang ukurannya berjenjang ekstrem: kata sambung kecil menempel di atas satu kata kunci raksasa, kadang di belakang kepala.
**Cocok untuk:** talking head edu/kreator, demo alat/preset, "aku tunjukkan triknya", promo produk digital dengan CTA komentar · **Tidak cocok untuk:** dokumenter tenang, materi data berat, palet berwarna
**Kata kunci gaya:** sinematik, editorial, putih tanpa aksen, cepat, berjenjang
**Diambil untuk:** `Talkingheadkonsep.mp4`: nama menunjuk konsep talking head secara utuh (tidak menyebut satu bagian dari daftar); bedah merata. Bagian terkuat: Teks (jenjang ukuran, kata di belakang kepala) dan Kamera (punch-in yang mengendur di tiap shot wajah).

## PENGIKAT (diambil utuh dari SATU kiblat; ini yang membuat video terasa satu keluarga)

### 1. Warna & tekstur
- Teks selalu putih bersih di footage; di kartu polos teks gelap `#272528`/`#1C1A1D` di abu terang `#E5E3E6`; kartu hitam `#121013` dengan teks putih.
- Aksen satu-satunya: kotak seleksi biru `#6C88BA` (bingkai + 8 pegangan, seperti seleksi layer) di sekitar kata pada 0:00 dan 0:02/0:30 "slide text". Bukan warna penekanan, tapi tanda "teks ini bisa diedit".
- Grade footage: kontras, sejuk-netral (bayangan Lab a −1,8, b −0,7; sorot a −2,0, b +3,2), kaos hitam `#131418`, ruang `#18201E`. Jendela belakang dibiarkan terbakar (luma pojok kiri atas 190 vs pusat 79): pembicara gelap di depan latar terang.
- Lanskap 0:01: langit abu kehijauan `#95978D`, sudut dengan tanda bidik (viewfinder) putih tipis.
- Grain ringan (std frekuensi tinggi 2,8 di area rata; sebagian kompresi). Tidak ada vignette buatan; tidak ada gradien grafis.

### 2. Teks
- Font: neo-grotesk bold rapat, paling mirip **Helvetica Neue Bold / Inter Display Bold**, tracking ±−5 % (huruf hampir bersentuhan, "slidetext" nyaris tanpa spasi). Saat beranimasi huruf tampak membulat-gemuk (0:01 "se llama", efek blur/gooey di tengah gerak).
- Jenjang ukuran (tinggi ascender, % tinggi frame): kata raksasa 33 % ("CLICK", lebar 89 %), kata kunci 14–17,5 %, kata kunci kecil 8–10 %, kata sambung 2,7–4,4 %, kartu polos ±5 %. Rasio kunci : sambung **3,7–7,5×**.
- Susunan: kata sambung kecil rata kiri tepat di atas kata kunci, leading negatif (menempel/menimpa bagian atas kata kunci: "llegaba a / invertirle", "comentá / huella", "pero / ahora"). Kadang ekor kecil di bawah ("y te lo paso").
- 1–3 kata per tampil; satu kata kunci per tampil. Kata pembuka "Este / efecto" dipisah ke kiri dan kanan kepala (y 36–44 % dan 50–58 %).
- Posisi terhadap subjek: (a) **di belakang** kepala/badan (CLICK, subjek dipotong di depan teks); (b) di depan dada (huella, y 52–69 %); (c) di ruang kosong samping subjek (lanskap: kiri, x 11–43 %); (d) tengah frame di B-roll; (e) caption kecil bawah-tengah di layar AE (y ±81 %, 3,5 %).
- Penekanan: hanya ukuran + tanda kutip besar ("“huella”"); tanpa warna, tanpa garis bawah.
- Masuk per kata (y solo → con → un → CLICK), gerak "slide": sigap lalu mendarat pelan (grafik kecepatan preset di layar: puncak di awal, ekor panjang). Arah slide bisa dipilih (panel: dari bawah/atas/kiri/kanan). Keluar: dipotong bersama cut.

### 3. Ritme
- 19 cut (cek manual ke sheet) = **30,6 cut/menit**, shot median **1,1 dtk**. `pace_read.py`: 16 cut, 25,8/menit, event visual 40/menit, bicara 4,7 suku kata/dtk.
- 0:00–0:15,8 cepat: 14 cut (±53/menit), wajah ↔ sisipan bergantian tiap 0,5–1,8 dtk.
- 0:15,8–0:30,4 lambat: satu shot layar AE 14,6 dtk (demo), digerakkan oleh zoom layar dan caption per kata.
- 0:30,4–0:37 sedang: ulang "slide text", wajah, kartu CTA, wajah penutup.
- Porsi: wajah ±31 %, B-roll ±17 %, UI ±46 %, kartu polos ±7 %.

## TEKNIK (boleh dipinjam referensi lain; selalu dikenakan pengikat kiblat)

### 4. B-roll / footage
- B-roll milik sendiri, satu gaya sinematik dengan A-roll: pembicara dari belakang menatap lanskap (0:01 "se llama"), kaki berkaus kaki di lantai bercahaya (0:02, 0:30 "slide text"), keyboard laptop (0:07), tangan siluet gelap (0:08 "invertirle"), siluet di jendela (0:08,5 "días completos"), dock aplikasi (0:11 "ahora").
- Hubungan dengan ucapan: suasana/metafora, bukan ilustrasi literal; produk dibuktikan lewat UI asli (galeri ponsel 0:03–0:06, After Effects 0:16–0:30).
- Perlakuan: full-frame, tanpa bingkai; UI galeri putih `#FFFFFF` penuh; AE berupa jendela di atas wallpaper lanskap gunung-danau.

### 5. Motion graphic
- Tidak ada ilustrasi. Grafik = tipografi + UI: kotak seleksi teks, ikon Ae/Pr kecil yang muncul di samping "tanto para" (0:33), grafik kecepatan preset di panel AE.
- **Skala subjek:** wajah = medium shot duduk, kepala ±20 % tinggi, badan ±40 % lebar di tengah; kata raksasa (33 % tinggi) lebih besar dari kepala. Lanskap: satu tokoh dari belakang di sepertiga kanan, teks di sepertiga kiri. Satu subjek besar per shot, tidak pernah banyak objek kecil.
- **Kedalaman:** 3 lapis saat kata di belakang kepala (ruang terang / teks putih / pembicara di depan); selainnya 2 lapis (footage + teks di depan). Tidak ada blur latar buatan; bokeh dari lensa.

### 6. Kamera & transisi
- Tiap shot wajah: **punch-in 1,27–1,36× lalu mengendur ke 1,0×** dengan ease-out eksponensial; setengah jalan dicapai ±0,3 dtk, diam di 1,0–1,9 dtk (ORB, 34,88–37,1: 1,27→1,09 di 0,5 dtk→1,00 di 2,0 dtk). Terukur −15 sampai −28 % di 6 dari 9 shot wajah; 13,0–15,8 lebih lembut (−10 % lalu −3 %), 10,0–11,2 diam.
- B-roll diam (skala 0 %); satu pan 8,4 % lebar (0:08,3–0:09,2).
- Layar AE: zoom ke panel ±1,8× (±0:19,5–0:20) lalu kembali (±0:28).
- Transisi: hard cut di hampir semua pergantian; **grid-tile wipe** (blok abu `#E5E3E6` menutup per petak, 0:11,5–0:11,8) ke kartu teks; panel abu menggeser dari kiri (0:33,5–0:33,7) ke kartu CTA; cut ke AE di 0:15,76 diberi whoosh. Pemicu: kata (cut tepat di kata kunci: "se llama", "slide text", "click").

### 7. SFX
- earshot (`--detail high`): 252 event (6,8/dtk), 96 berlabel: 60 suara, 17 hit, 6 UI, 4 drum, 2 whoosh, 2 step, 1 riser (label petunjuk, banyak yang tercampur ucapan).
- Kosakata: sub-bass hit/impact di kata kunci & cut (0:03,7, 0:13,1 +19 dB, 0:23,1 +24 dB), notification ding/klik UI di demo AE (0:21,9 +26 dB), whoosh di cut ke AE (0:15,76 +10 dB).
- 88 % cut punya onset ≤ 100 ms (median selisih 23 ms); 3 cut tanpa bunyi (0:07,2, 0:14,0, 0:34,9).
- Level SFX terhadap suara: Tidak terukur: stem tidak dipisah.

### 8. Musik
- Elektronik/glitch hop dengan vocal chop, ±92 bpm (librosa 92,3; earshot 91, pulse lemah 0,21). Babak earshot: 0–2,35 "corporate inspiratif", 2,35–14,65 glitch hop agresif, 14,65–31,1 techno (demo AE), 31,1–37 glitch hop.
- Bass jalan terus; pita < 150 Hz turun ±4 dB di 0:12–0:15 (kartu teks, sebelum "click") dan di 0:36 (penutup).
- Mix −14,2 LUFS, true peak +0,3 dBTP (clip), LRA 2,2 LU: keras dan padat ala reels.
- Level musik terhadap suara: Tidak terukur: stem tidak dipisah.

## Proporsi terukur (11 Nov 2026, dari video sumber; % terhadap frame 4:3 960×720)
Rinci: `ukuran.md`. Tinggi = ascender ke baseline (x-height dalam kurung).

| Jenis adegan | Kata kunci (% tinggi) | Kata sambung | Posisi teks | Skala subjek | Kedalaman |
|---|---|---|---|---|---|
| Wajah + kata raksasa (k1) | 33 cap ("CLICK", x 5–94 %) | 4,4 (3,2); rasio ±7,5 | sambung di baris y 25–29 % kiri-kanan kepala; kata raksasa y 31–64 % **di belakang** kepala | kepala ±20 % tinggi | 3 lapis: ruang / teks / pembicara |
| Wajah + kutipan (k2) | 17,5 (12,7) "huella" | 3,1 (2,2); rasio 5,6 | dada, x 33–65 %, y 52–69 %, di depan subjek | medium shot | 2 lapis |
| Wajah + kata pembuka (f001) | 8 cap "Este" | – | kiri & kanan kepala, dalam kotak seleksi | medium shot | 2 lapis + kotak UI |
| B-roll + teks seleksi (k3) | 14,0 (10,2) "slide text" | – | tengah, x 23–78 %, y 42–56 % | kaki, sepertiga tengah | 2 lapis + kotak `#6C88BA` |
| Lanskap + teks (k4) | 14,3 "llama", "se" x-height 8 | ukuran sama | kiri subjek, x 11–43 %, y 38–60 % | tokoh dari belakang, sepertiga kanan | 2 lapis + tanda bidik |
| B-roll gelap (k8) | 9,9 (6,7) "invertirle" | 2,7 (1,7); rasio 3,7 | tengah, x 32–68 %, y 43–55 % | tangan siluet besar | 2 lapis |
| Kartu teks polos (k7) | 5,4 "forma" | kalimat 3,8 | tengah | tanpa subjek | 1 lapis rata |
| UI AE (k6) | – | caption 3,5 | bawah-tengah, y ±81 % | jendela ±85 % lebar | wallpaper / jendela / caption |

## Cek kemiripan (dipakai juri saat menyandingkan still)
- Satu neo-grotesk bold putih rapat (tracking negatif) di semua adegan; tanpa serif, tanpa warna aksen pada teks.
- Kata kunci 14–17,5 % tinggi frame, kata sambung 2,7–4,4 %; rasio ≥ 3,5. Minimal satu momen kata raksasa ±30 % tinggi.
- Kata sambung menempel rata kiri di atas kata kunci dengan leading negatif, bukan baris terpisah berjarak.
- Ada momen teks **di belakang** kepala pembicara (subjek dipotong di depan).
- Teks di ruang kosong samping subjek pada shot lebar; di B-roll di tengah frame.
- Shot wajah dimulai ±1,3× lalu mengendur ke 1,0× (cek dua still: awal shot lebih rapat).
- Footage gelap-sejuk kontras, jendela terang di belakang; kartu polos abu `#E5E3E6` atau hitam `#121013`.
- Satu subjek besar per shot; tidak ada ilustrasi atau ikon dekoratif selain UI asli/kotak seleksi.
- ±30 cut/menit, shot median ±1,1 dtk di babak cepat; satu babak demo panjang boleh.

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
