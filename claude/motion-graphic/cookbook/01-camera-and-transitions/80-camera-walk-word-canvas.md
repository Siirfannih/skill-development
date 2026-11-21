---
id: "80"
pola: Camera-Walk Word Canvas
kategori: camera
kategori_lain: [typography, layout]
trigger: esai ide atau opini bernarasi tanpa wajah; kalimat "ada jarak antara X dan Y" atau kontras dua sisi; transisi dari teks ke bukti UI
sumber: siirfannih (IG, "The Gap", taste gap) · 16:9 · 95 dtk
dilihat_bergerak: tidak
diukur: ya
alias: []
---
# 80 · Camera-Walk Word Canvas

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: Instagram @siirfannih, file `siirfannih_De9apo4TnUi.mp4` · 16:9 (1276×718, 30 fps), 95 dtk · Frame: `../../guide/referensi/sheets/80-ig-De9apo4TnUi.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/80-k1-kinetik-gelap.jpg` … `80-k8-kalimat-ui.jpg` (k1 kinetik gelap, k2 grafik garis, k3 tokoh potong, k4 teks + chip video, k5 UI melayang, k6 diagram ikon, k7 kata besar dotgrid, k8 kalimat + UI) · Bedah lengkap: `../../guide/referensi/ukuran/80-ig-De9apo4TnUi-ukuran.md`, pemeriksa: `80-ig-De9apo4TnUi-periksa.md`
> Video sumber: `/home/irfan/work/pustaka-video/mac/siirfannih_De9apo4TnUi.mp4`
> Dilihat bergerak: **tidak** (bedah lama dari frame diam dan pengukuran; isi dari frame diam, bedah geraknya sebelum dipakai)

**Inti mekanik (1 kalimat):** Esai VO "berjalan" di satu kanvas: kata besar muncul satu-dua per tampil dan kamera virtual menggeser ke kata berikutnya dengan motion blur horizontal, garis penghubung tumbuh di antara dua kata, lalu kanvas yang sama berubah menjadi grafik, UI chat, dan kartu melayang, dengan zoom-through sebagai sambungan.
**Narrative trigger:**
- Kalimat dua kutub atau jarak ("ada ——— jarak"; "di satu sisi, kita") → T1, T2
- Penjelasan konsep lewat dua kurva (selera vs hasil karya) → T3
- Kalimat yang disela rujukan visual kecil ("rasa [foto] kecewa itu") → T4
- Masuk dari klaim ke bukti UI → T5
- Memperkenalkan tokoh dengan kutipan → T6
**Jangan dipakai untuk:** talking head, klip podcast, promo diskon cepat.
**Kata kunci gaya:** editorial, Apple-ish, bersih, kinetik, satu-tarikan, gelap-terang
**Diambil untuk:** nama file tidak menyebut bagian; bagian terkuat: teks kinetik + kamera yang mengikuti kata, lalu UI melayang. PETA: tidak sama dengan kartu bernomor mana pun; isinya cocok dengan karya sendiri "The Gap" (PETA baris 79 lama: "The Gap v18"); belum dipastikan versi mana.

## Kondisi footage asli
- 16:9. Tidak ada A-roll wajah. Footage stok kecil hanya sebagai chip bersudut bulat ±13 % tinggi, foto B/W bernomor 01–03, foto tokoh dipotong tanpa latar atau dalam lingkaran berbingkai hitam.
- Latar: gelap `#0D0B0E` (tengah `#121013`, vignette radial: sudut 13 vs tengah 22) atau putih/lavender `#EBEEFD`/krem `#F8F7F3`. Teks di tengah (cy 45–65 %) atau pita atas (cy 12–22 %) bila ada objek di bawah.
- Kamera: virtual satu kanvas; tidak ada kamera fisik.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Dua latar bergantian: gelap `#0D0B0E` dan putih `#FEFEFE`; terang varian lavender dan krem. Satu aksen biru `#2A54DF`–`#3C5EDF` (kata "Tapi", "enggan", pil "taste-mu"). Merah `#ED565F` hanya untuk bendera "MULAI" dan silang gagal; oranye bata `#B44F3B` hanya di tombol kirim UI. Tekstur: grid titik halus di latar gelap, arsir diagonal di bawah kurva; tanpa grain. Foto/video bersudut membulat dengan bayangan lembut; foto proses B/W.
### Teks
Neo-grotesk semibold/bold tracking rapat (mirip Inter Display / Helvetica Now Display SemiBold); pendamping serif italic tipis-kontras untuk judul tokoh (mirip Instrument Serif Italic), mono kecil untuk kredit, caps berjarak lebar untuk label grafik. Kata kunci 12–16 % tinggi frame, kata sambung 3,6–6,8 %; rasio 2,2–3,8×. Penekanan: ukuran, warna abu untuk kata kedua, biru untuk kata balik, pil biru berisi teks putih, chip foto menyelip. Kata akhir sering ditutup titik.
### Ritme
23 cut keras = 14,5/menit, shot median 2,9 dtk; dua tarikan 18 dtk tanpa cut (27–45 dtk, 59–77 dtk). Cepat di pembuka (0–15 dtk) dan penutup demo AI (77–91 dtk); lambat di grafik kurva (20–27 dtk) dan logo akhir.

## Pola

### T1 · Camera-Walk Word Pan · camera
- **Trigger:** kalimat yang dibaca urut kiri ke kanan, kata demi kata ("Ada — antara — jarak").
- **Yang terlihat (termasuk gerak):** kata tidak muncul di tempat; kamera menggeser ke kata berikutnya (pan dx −10 s/d −30 % lebar per 0,5 dtk, 5–9 dtk, 27–31 dtk, 77–81 dtk) dengan motion blur horizontal; kata dan kamera berbagi satu kanvas. (k1)
- **Kenapa bekerja:** mata mengikuti gerak kamera sehingga kalimat terasa "dijalani"; ruang gelap polos membuat kata besar terbaca.
- **Mekanik Remotion (titik awal):**
  - Lapisan: latar → grup kanvas (semua kata ditaruh pada koordinat tetap) → vignette.
  - Gerak: kamera virtual `translateX` antar kata `CURVE.heavy` 14 f, hold 10–20 f; tiap kata fade-in 6 f saat kamera tiba.
  - Ruang: datar. Blur & blend: `<CameraMotionBlur shutterAngle={200} samples={16}>` pada pembungkus kanvas.
- **SFX:** `Woosh.mp3` pada pan cepat (video asli 29,1 dtk); kata senyap; `scaningfast.mp3` untuk pan terpendek; jarak antarwhoosh ≥ 1 dtk.
- **Pakai bila:** kalimat 3–6 kata inti. · **Jangan pakai bila:** kata muncul < 0,5 dtk berurutan (pan tidak sempat).
- **Remix (anti-jiplak):**
  1. Esai produk → pertahankan pan antarkata · ganti arah menjadi vertikal (turun).
  2. Latar terang → pertahankan blur horizontal · kata gelap, vignette dihilangkan.
  3. 9:16 → pan vertikal ke atas, 2 kata per tampil.
- *Pengamatan di video asli, bukan target:* kata kunci 14,8–17,8 % tinggi (pengukur 14,80/17,76 %).

### T2 · Growing Connector Line · typography
- **Trigger:** jarak atau hubungan antara dua kata ("Ada ——— jarak").
- **Yang terlihat (termasuk gerak):** satu baris pada cy 50 %, dua kata di ujung kiri-kanan, garis tipis tumbuh di antaranya dengan batang vertikal pendek di kedua ujung seperti penanda ukuran; kata sambung kecil ("antara") di atas garis. (k1)
- **Kenapa bekerja:** garis membuat jarak terlihat, bukan hanya diucapkan.
- **Mekanik Remotion (titik awal):**
  - Lapisan: kata kiri/kanan → garis → kata kecil.
  - Gerak: garis `scaleX 0→1` `CURVE.reveal` 18 f dari kata kiri; kata kanan masuk 6 f sebelum garis selesai.
  - Ruang: datar. Blur & blend: tanpa.
- **SFX:** `Scanning dan gerak kurva.mp3` pelan di garis (satu bunyi sama untuk garis lain).
- **Pakai bila:** dua kata dengan jarak makna. · **Jangan pakai bila:** > 2 kata utama.
- **Remix (anti-jiplak):**
  1. "Harga ——— nilai" → pertahankan garis tumbuh · ganti kata dan latar putih.
  2. Dua produk → garis menghubungkan dua foto.
  3. 9:16 → garis vertikal.
- *Pengamatan di video asli, bukan target:* "antara" 26 px (pengukur); rasio 3,46–4,15×.

### T3 · Dual-Curve Gap Graph · layout
- **Trigger:** konsep dua kutub dijelaskan dengan dua kurva ("selera" vs "banyak karya").
- **Yang terlihat (termasuk gerak):** grafik garis putih di latar gelap: kurva "TASTE/SELERA" menanjak lalu melandai vs garis titik-titik "BANYAK KARYA" makin curam; titik naik di garis = jumlah karya; gap = arsir di antara dua kurva; sumbu L abu tipis tanpa angka; push pelan +1–5 %/0,5 dtk (23–26 dtk). (k2)
- **Kenapa bekerja:** gap yang diarsir terlihat langsung.
- **Mekanik Remotion (titik awal):**
  - Lapisan: dotgrid → sumbu → kurva → titik → arsir → label.
  - Gerak: `stroke-dashoffset` kurva `CURVE.reveal` 40 f; titik muncul `react(i)`; arsir opacity 0→0,25 12 f.
  - Ruang: datar; push `scale 1.00→1.04` `CURVE.drift`.
  - Blur & blend: tanpa.
- **SFX:** `Scanning dan gerak kurva.mp3` di garis menggambar; titik senyap.
- **Pakai bila:** dua kutub saling menjauh. · **Jangan pakai bila:** data riil perlu skala.
- **Remix (anti-jiplak):**
  1. Pertumbuhan usaha vs gaji → latar terang, kurva hijau tua.
  2. SaaS → kurva biaya vs nilai.
  3. 9:16 → kurva vertikal.
- *Pengamatan di video asli, bukan target:* kurva memenuhi ±70 % lebar; label caps ±2 %.

### T4 · Inline Chip Insert · typography
- **Trigger:** kalimat yang disela rujukan visual kecil ("Dan rasa [foto] kecewa itu [foto] tanda").
- **Yang terlihat (termasuk gerak):** chip foto/video bersudut membulat ±13 % tinggi menyelip di antara kata, pil biru berisi teks putih ("taste-mu"); baris terpotong batas atas/kanan frame; cut tiap 0,4–1,5 dtk di pembuka dengan motion blur. (k4)
- **Kenapa bekerja:** gambar menggantikan kata di dalam kalimat sehingga bacaan tetap satu baris.
- **Mekanik Remotion (titik awal):**
  - Lapisan: latar → baris kata + chip (inline-block) → pil.
  - Gerak: baris menggeser `translateX` `CURVE.heavy` 10 f per frasa; chip `scale 0.8→1` `CURVE.land` 8 f.
  - Ruang: datar. Blur & blend: `blur(4px)` saat menggeser.
- **SFX:** senyap per kata; `pop up.mp3` hanya untuk pil yang menjadi kunci.
- **Pakai bila:** ada rujukan visual yang pendek. · **Jangan pakai bila:** chip tak terbaca di 13 % tinggi.
- **Remix (anti-jiplak):**
  1. Resep → chip foto bahan di antara kata.
  2. Latar putih → chip dengan bayangan lunak.
  3. 9:16 → baris berlapis dua.
- *Pengamatan di video asli, bukan target:* kata kunci "tanda" 13,2 % tinggi; pil `#2953E3` (pengukur).

### T5 · Floating UI With Satellite Blur · layout
- **Trigger:** masuk dari klaim ke bukti produk; "ini hasilnya".
- **Yang terlihat (termasuk gerak):** satu jendela UI tajam di tengah (57 % H × 52 % W), kartu satelit sangat buram di sekeliling (ketajaman Laplacian 10 vs 1974 pada subjek); kartu hasil berjajar; kartu berputar mengelilingi kamera (88 dtk); lup pembesar menyorot detail ("Arah ke kedai"); zoom-through ×1,1–1,3 per 0,5 dtk masuk ke UI/lup (59, 64–65, 68–69, 79 dtk); pull-out ×0,4–0,7 dari detail ke gambar besar (14, 18,5, 31,5, 40, 49 dtk). (k5, k8)
- **Kenapa bekerja:** satu objek tajam menjadi pusat, kartu buram memberi skala tanpa mengalihkan.
- **Mekanik Remotion (titik awal):**
  - Lapisan: latar lavender → kartu satelit (blur 8–12 px) → jendela UI + bayangan lembut → lup.
  - Gerak: zoom-through `CURVE.whip` 14 f ke area lup; orbit kartu `rotateY` 0→360° dalam 90 f `CURVE.drift`.
  - Ruang: `perspective: 1400px`, satelit `translateZ` berbeda.
  - Blur & blend: motion blur wajib saat zoom.
- **SFX:** `Wooshcameramovementtransisi.mp3` di zoom besar; `pop up.mp3` tiap kartu hasil; `Lasertransision.mp3` untuk logo akhir.
- **Pakai bila:** satu UI jadi bukti. · **Jangan pakai bila:** UI harus dibaca penuh.
- **Remix (anti-jiplak):**
  1. Toko kopi → ganti UI ke mock halaman toko, satelit foto produk.
  2. Latar gelap → satelit gelap, UI terang.
  3. 9:16 → satelit di atas dan bawah.
- *Pengamatan di video asli, bukan target:* jendela 57,2 % H (pengukur); kalimat + UI: kalimat 90 % lebar di pita atas cy 12–22 %, UI 62 % H × 73 % W.

### T6 · Cutout Portrait Serif Title · layout
- **Trigger:** memperkenalkan tokoh dengan kutipan.
- **Yang terlihat (termasuk gerak):** tokoh potong tanpa latar menempel tepi kiri-bawah (90 % H × 43 % W) di latar putih; judul serif italic besar ("the gap" 29,4 %) di kanan (cx 70 %); kredit mono kecil di bawah; versi kedua: lingkaran berbingkai hitam (80 × 45 %). (k3)
- **Kenapa bekerja:** potongan besar + serif italic = nada editorial.
- **Mekanik Remotion (titik awal):**
  - Lapisan: putih → tokoh (matte) → judul → kredit.
  - Gerak: tokoh `translateX(-60px)→0` `CURVE.land` 14 f; judul `reveal` 12 f setelah 4 f.
  - Ruang: datar. Blur & blend: tanpa bayangan (putih rata).
- **SFX:** `documenter.mp3` pendek bila foto mendarat; selain itu senyap.
- **Pakai bila:** ada foto potong berkualitas. · **Jangan pakai bila:** foto beresolusi rendah.
- **Remix (anti-jiplak):**
  1. Pendiri UMKM → potret di lingkaran.
  2. Latar gelap → serif putih.
  3. 9:16 → tokoh bawah, judul atas.
- *Pengamatan di video asli, bukan target:* "the gap" cx 69,8 % (pengukur 69,81 %).

## Audio (bila dibedah)
Pengamatan: 601 onset (6,3/dtk termasuk suara), 96 berlabel: 30 UI/pop, 19 hit/sub-drop, 7 note, 4 foley, 4 whoosh, 2 riser. Sub-bass drop pada pergantian babak (7,4 dtk +27 dB), whoosh pada pan cepat (29,1 dtk), ding notifikasi di logo akhir (89,6 dtk +30 dB); 86 % cut punya onset ≤ 100 ms. Musik elektronik minimal ±129 bpm; mix −14,1 LUFS, true peak −0,4 dBTP, LRA 2,4 LU.

## Yang harus terasa sama saat disandingkan
- Kamera terasa berjalan dari kata ke kata dengan blur horizontal, bukan kata yang muncul di tempat?
- Adegan teks ≤ 3 kata di tengah; bila ada objek, teks pindah ke pita atas?
- Satu subjek tajam ≥ 50 % tinggi, objek lain kecil dan buram?
- Latar hanya gelap atau terang datar; gradien hanya di dalam kartu?
- Pergantian lewat pan/zoom-through, bukan fade lambat?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
