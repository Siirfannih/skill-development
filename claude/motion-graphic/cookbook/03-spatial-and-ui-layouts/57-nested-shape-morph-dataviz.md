---
id: "57"
pola: Nested Shape-Morph Dataviz
kategori: layout
kategori_lain: [typography]
trigger: angka produk fintech/SaaS yang berubah (persen, saldo, match, APY); penjelas fitur bertahap dari total ke bagian; reel data 3–6 dtk tanpa suara
sumber: kreator tidak diketahui · 3:4 · 4,73 dtk, tanpa trek audio
dilihat_bergerak: tidak
diukur: ya
alias: []
---
# 57 · Nested Shape-Morph Dataviz

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: unggahan Irfan, file `Motionwithtext.mp4` (kreator tidak diketahui) · 3:4 (720×960, 60 fps), 4,73 dtk, **tanpa trek audio** · Frame: `../../guide/referensi/sheets/57-motion-with-text.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/57-k1-cincin.jpg`, `57-k2-morph.jpg`, `57-k3-kotak-bersarang.jpg`, `57-k4-bar-persen.jpg`, `57-k5-transisi-geser.jpg`, `57-k6-dial.jpg`, `57-k7-zoom-akhir.jpg` · Bedah ukuran: `../../guide/referensi/ukuran/57-motion-with-text-ukuran.md`; pengukur independen: `57-motion-with-text-periksa.md`
> Video sumber: `/home/irfan/work/pustaka-video/unggahan/Motionwithtext.mp4`
> Dilihat bergerak: **tidak** (bedah dari frame diam 60 fps dan pengukuran; bedah geraknya sebelum dipakai)

**Inti mekanik (1 kalimat):** Satu bentuk garis tipis berubah wujud (cincin → kotak → bar persen → dial) di tengah latar hitam hangat, label menempel pada bentuk dan ikut bergeser saat morph, satu aksen lime mengisi bentuk saat angkanya bertambah.
**Narrative trigger:**
- Angka total yang dipecah ke bagian ("dari $42.000, $4.200 yang cocok") → T1
- Persentase yang bergeser antara dua pihak (35 % → 50 %) → T2
- Satu metrik yang naik per periode (2022 → 2023 → 2024) → T3
**Jangan dipakai untuk:** cerita emosional, wajah/podcast, konten yang butuh foto/footage.
**Kata kunci gaya:** minimal, data-viz, presisi, morph, flat, lime-on-black
**Diambil untuk:** motion graphic dan teks (dibedah paling dalam: morph bentuk, easing, ukuran teks, posisi label).

## Kondisi footage asli
Tanpa footage; 100 % vektor flat. 3:4, SATU subjek besar di tengah (panel 75 × 56 % frame, persegi 540 px, pusat 50/50; cincin awal 72 % lebar; dial 64 × 48 %), margin kiri-kanan ±12 %. Kamera diam kecuali push akhir. Tanpa bayangan, blur, glow, atau paralaks.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Latar `#110E09` (hitam hangat), rata tanpa vignette/gradien. Panel `#1E1B16`, track dial `#28251C`. Satu aksen lime `#CEFF0A`. Garis bentuk putih hangat redup (inti ±`#D0CCC8`, 2–3 px = 0,3–0,4 % lebar). Teks: label `#D6D2D0`, nilai sekunder abu `#7B7873`–`#888481`, angka besar `#FEFCF9`. Tanpa grain.
### Teks
Neo-grotesk netral (mirip Inter / Neue Haas Grotesk) Regular di semua ukuran. Dua ukuran saja: angka besar 4,1–4,7 % tinggi frame dan label 1,25–1,6 %. Pasangan label terang di atas + nilai abu di bawah. Penekanan lewat warna lime dan ukuran, tanpa kotak/garis bawah/bobot.
### Ritme
2 shot (3,03 + 1,70 dtk), satu transisi geser. Gerak cepat 0,1–0,4 dtk → diam 0,15–0,5 dtk → gerak berikutnya (±11 event gerak).

## Pola

### T1 · Concentric-to-Box Morph · layout
- **Trigger:** total yang dipecah menjadi bagian; "dari semua X, hanya Y".
- **Yang terlihat (termasuk gerak):** dua cincin bersarang (luar = total, dalam = bagian) dengan label di luar kontur masing-masing, kanan-atas; lingkaran → rounded square → kotak tajam 0,55–1,1 dtk, dua bentuk morph bersamaan; kotak dalam bagian di pojok kiri-bawah panel; isi lime muncul tiba-tiba dalam 1 frame (1,23 dtk), bukan fade. Pembesaran awal 0–0,3 dtk (+4 % lebar, ease-out). (k1–k3; 0–1,4 dtk)
- **Kenapa bekerja:** satu bentuk yang berubah menjaga mata di tempat yang sama; hubungan total–bagian terlihat sebagai ukuran kotak.
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): latar → panel → garis bentuk → isi lime → label.
  - Gerak: `borderRadius` 50 % → 24 % → 0 dengan `CURVE.whip` 33 f @60 → 17 f @30; label berpindah bersama (`translate`, tidak pudar); isi lime muncul pada 1 frame (`opacity` 0 → 1 tanpa tween).
  - Ruang: datar. Blur & blend: tanpa blur, tanpa blend.
- **SFX:** file sumber tanpa audio; usul: senyap atau satu `pop up.mp3` saat isi lime muncul.
- **Pakai bila:** dua nilai yang berhubungan total–bagian. · **Jangan pakai bila:** lebih dari tiga bentuk dalam satu bidang.
- **Remix (anti-jiplak):**
  1. Latar terang → garis dan label gelap, isi aksen brand; pertahankan morph cincin → kotak.
  2. Produk UMKM → "dari 100 pesanan, 35 repeat order" dengan kotak diisi warna produk.
  3. 9:16 → panel memenuhi lebar, bagian di pojok kiri-bawah.
- *Pengamatan di video asli, bukan target:* kotak 540×541 px = 75,00 × 56,35 % (periksa, cocok); morph 0,55–1,1 dtk.

### T2 · Lime-Fill Percent Bar · layout
- **Trigger:** pembagian dua pihak (65 / 35) dan pergeserannya.
- **Yang terlihat (termasuk gerak):** bidang lime melebar dari 45 % ke 82 % lebar dalam 0,1 dtk (1,65–1,75), ekor pelan sampai 1,95; naik ke 50/50 dengan pola sama (2,35–2,6); persen di kiri-bawah tiap bidang rata kiri (x 14 %), "65%" tepat di atas garis batas, "35%" di dasar bidang lime; angka menghitung (counter roll 35→50 %). Strip panel gelap tersisa di sisi kanan bidang lime. (k4; 1,6–2,6 dtk)
- **Kenapa bekerja:** perubahan cepat lalu diam memberi waktu membaca; angka berhitung membuat perubahan terasa nyata.
- **Mekanik Remotion (titik awal):**
  - Lapisan: panel → bidang lime → persen → label.
  - Gerak: `Easing.bezier(0.85, 0, 0.15, 1)` (setara `CURVE.whip`) 6 f @60 untuk lebar, ekor `CURVE.reveal` 12 f; angka `Math.round(interpolate(...))`; tahan 15–30 f setelahnya.
  - Ruang: datar. Blur & blend: tanpa.
- **SFX:** usul: `Move.mp3` pada lebar lime saat naik; sisanya senyap (sumber tanpa audio).
- **Pakai bila:** dua nilai yang jumlahnya 100 %. · **Jangan pakai bila:** lebih dari dua bagian.
- **Remix (anti-jiplak):**
  1. Latar terang → bidang aksen gelap di panel krem.
  2. Layanan jasa → "klien lama vs baru" dengan ikon kecil di tiap bidang.
  3. 16:9 → bar horizontal, persen rata kiri bidang.
- *Pengamatan di video asli, bukan target:* angka besar 4,6875 % tinggi (periksa, cocok); rasio angka : label ±3 (diperdebatkan: periksa 3,46–3,75, sensitif ±1 px).

### T3 · Push-Slide Dial Handoff · camera
- **Trigger:** pindah dari satu metrik ke metrik berikut; metrik yang naik per periode.
- **Yang terlihat (termasuk gerak):** panel keluar ke kiri dengan percepatan (ease-in, ±5 % dalam 0,3 dtk), dial masuk dari kanan (offset +10 % → 0) dengan perlambatan 0,5 dtk (2,7–3,55 dtk); busur dial mengisi per tahun (2022 → 2023 → 2024) mengikuti counter ($0 → $50 → $67), pil tahun aktif melompat seketika; angka skala 0/25/50/75 di empat arah dalam cincin; nilai besar di pusat. Akhir 4,45–4,73 dtk: push-in ±+9 % makin cepat, terpotong (kemungkinan zoom-through ke klip berikut). Tanpa motion blur dan tanpa whoosh. (k5–k7)
- **Kenapa bekerja:** dua gerak berlawanan arah menyambung dua bentuk tanpa cut; busur mengikuti counter sehingga angka dan bentuk berjalan serempak.
- **Mekanik Remotion (titik awal):**
  - Lapisan: panel lama → dial baru (dua `<AbsoluteFill>` bergeser).
  - Gerak: keluar `CURVE.leave` 18 f @60 (−5 %); masuk `CURVE.land` 30 f (+10 % → 0); busur `strokeDashoffset` mengikuti counter; push akhir `scale 1→1.09` `CURVE.heavy` 17 f.
  - Ruang: datar. Blur & blend: tanpa.
- **SFX:** usul: `Wooshcameramovementtransisi.mp3` pada geser bila diberi suara; sumber tanpa audio.
- **Pakai bila:** satu metrik per periode dengan ≤3 periode. · **Jangan pakai bila:** periode >4.
- **Remix (anti-jiplak):**
  1. Latar terang → dial garis gelap, aksen brand.
  2. Skor kepuasan pelanggan per kuartal dengan angka di pusat.
  3. Geser vertikal untuk 9:16 (panel keluar ke atas).
- *Pengamatan di video asli, bukan target:* cincin dial 64 × 48 %; pusat vertikal y 50,0 % (periksa; kartu lama menulis 55 %, selisih 5 pp, koreksi diterapkan); pil tahun di y 82 %.

## Audio (bila dibedah)
Tidak ada: file tidak punya trek audio (ffprobe hanya stream video). Semua usul SFX di atas belum diuji.

## Yang harus terasa sama saat disandingkan
- Satu subjek di tengah selebar 64–75 % frame, margin samping ±12 %?
- Hanya satu aksen (lime) untuk bidang terisi, busur, dan pil aktif?
- Hanya dua ukuran huruf, label menempel pada bentuk?
- Bentuk berubah wujud (morph), bukan diganti cut; diam 0,15–0,5 dtk di antara gerak?
- Angka menghitung bersama bentuk, flat tanpa bayangan atau glow?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
