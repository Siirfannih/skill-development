---
id: "73"
pola: Beat-Locked Word Build
kategori: typography
kategori_lain: [camera]
trigger: hook teks tanpa VO di atas musik berirama; intro tutorial atau teaser kursus; satu kalimat dibangun kata demi kata sampai satu kata kunci jadi besar
sumber: Jordan Esfa (teks tunggal di grid ungu) · 16:9 · 26,6 dtk
dilihat_bergerak: tidak
diukur: ya
alias: []
---
# 73 · Beat-Locked Word Build

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: Jordan Esfa (unduhan ssspin.io), file `pustaka-video/mac/Jordan_Esfa_ssspin.io_1794023669.mp4` · 16:9 (736×414, 30 fps), 26,6 dtk · Frame: `../../guide/referensi/sheets/73-jordan-esfa.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/73-k1…k8-*.jpg` (k1 kata awal, k2 frasa + panah, k3 kata kunci besar, k4 tambah per kata, k5 kalimat kecil, k6 kata tunggal maks, k7 keluar per huruf, k8 penutup serif)
> Video sumber: `/home/irfan/work/pustaka-video/mac/Jordan_Esfa_ssspin.io_1794023669.mp4`
> Dilihat bergerak: **tidak** (bedah dari frame diam dan pengukuran; bedah geraknya sebelum dipakai). Batas: sumber 736×414 (1 px = 0,24 % tinggi); satu video; tanpa suara bicara, jadi hubungan teks-ucapan tidak terukur.

**Inti mekanik (1 kalimat):** Satu baris teks putih di tengah, dibangun kata demi kata di atas ketukan musik (frasa berganti ±1 per ketukan, potong keras), dengan kata kunci ditahan sendirian dan diperbesar oleh kamera yang tak pernah diam; satu objek 3D kecil melayang menemani.
**Narrative trigger:**
- Hook teks tanpa VO yang mengumumkan apa yang akan dipelajari ("kita akan bahas X") → T1
- Satu kata kunci yang harus ditahan dan terasa penting di tengah kalimat → T2
- Kamera ikut menyentak pada kata penekanan, tarik mundur saat jeda → T2
- Penutup yang meluruh dengan satu kata berbeda gaya ("dengan percaya diri") → T3
**Jangan dipakai untuk:** cerita bertokoh, demo UI rinci, video dengan banyak footage, VO yang menuntut sinkron teks-ucapan.
**Kata kunci gaya:** gelap, ungu neon, minimal, berirama, kinetic, techy
**Diambil untuk:** nama tidak menyebut bagian (file asli "Jordan_Esfa"); bagian terkuat: teks kinetik yang dikunci ke ketukan + kamera yang tak pernah diam. Tidak diambil: ungu neon dan panah 3D.

## Kondisi footage asli
- 16:9 (736×414), 100 % grafis, satu shot kontinu 26,6 dtk, tanpa cut. Latar gelap ungu ber-grid, banyak ruang kosong, tidak ada subjek besar.
- Kamera virtual tak pernah diam: per 0,5 dtk skala 0,91–1,10 (p10–p90), 14 interval push, 17 pull, 21 hampir diam; geser median 2 % lebar per 0,5 dtk.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Latar pusat `#1A0825`–`#1A092A` (ungu sangat gelap), sudut `#020104`–`#060205`, vignette radial kuat (pusat ±10× lebih terang dari sudut). Grid persegi tipis redup, titik sian `#7EBCBC`–`#86C1C1` di persimpangan, terlihat di tengah saja. Teks `#FFF9FF`; kata baru masuk abu-ungu `#BBB0C2` sesaat. Satu aksen: panah 3D low-poly ungu `#6C4598`–`#8459A9`, sisi terang `#C7AAE7`. Tanpa grain dan footage. Penutup lebih gelap (pusat `#09050B`).
### Teks
Poppins SemiBold (geometris); penutup satu kata serif italic (Playfair Display Italic). Satu baris, selalu di pusat: x 49–51 %, y 47–49 %. 1–6 kata per tampil; dibangun per kata ("we" → "we will" → "we will break down"), lalu frasa diganti utuh. Pada saat masuk kata belum berbagi garis dasar ("by" lebih tinggi dari "the"), jadi "selalu satu baris" tidak mutlak (periksa). Penekanan = kata sendirian + diperbesar kamera; tanpa warna/kotak/garis bawah.
### Ritme
0 cut. Event teks 75 (±170/menit, jarak median 0,20 dtk = ⅓ ketukan); frasa berganti ±1 per ketukan (100 bpm = 0,6 dtk). Cepat di 9–16 dtk dan 21–25 dtk (tambah kata tiap 0,17–0,2 dtk); jeda panjang 7,1–9,0 dtk ("in After Effects." ditahan) dan 17,4–19,7 dtk ("smooth/readable/motion").

## Pola

### T1 · Word-By-Word Phrase Build · typography
- **Trigger:** kalimat pembuka tanpa VO yang membangun maksud kata demi kata.
- **Yang terlihat (termasuk gerak):** kata baru muncul dengan opasitas rendah (abu `#BBB0C2`) lalu putih dalam ±2–3 f, baris bergeser agar tetap di tengah; ganti frasa: potong keras tanpa transisi. Teks terus membesar saat tampil ("Sometimes" +±34 % lebar dalam 0,33 dtk; "readable" +±5 %). Kata-kata saat masuk belum berbagi garis dasar (k4 "by the", periksa). (k1, k4, k5)
- **Kenapa bekerja:** tiap ketukan = satu perubahan teks, jadi mata dan telinga sinkron; satu baris di pusat tidak menyebar perhatian.
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): latar + vignette → grid → teks → objek 3D.
  - Gerak: tiap kata masuk `move(frame, start+i*6, 3, "reveal")` (6 f @30 ≈ ⅓ ketukan = 0,2 dtk) dari opasitas 0,35 abu ke putih; baris re-center dengan `measureText` (`@remotion/layout-utils`); ganti frasa di kelipatan 18 f (100 bpm); skala teks naik 1,00→1,05 selama tampil.
  - Ruang: datar. Blur & blend: tanpa blur.
- **SFX:** famili `ui`, `mekanik` · per kata senyap; sesekali `Kinetictypography(gunakansecaraacak).mp3`; aksen asli: pop/klik menyatu dengan musik (+15 dB di 0,62 dtk, klik +16 dB di 1,43 dtk).
- **Pakai bila:** musik 90–110 bpm tersedia dan teks pendek. · **Jangan pakai bila:** ada VO yang menentukan waktu kata.
- **Remix (anti-jiplak):**
  1. Teaser kursus desain → pertahankan bangun per kata · ganti latar jadi krem terang, teks gelap, tanpa grid.
  2. Hook produk UMKM → pertahankan potong keras per ketukan · ganti font tebal lokal dan satu aksen merek.
  3. 9:16 → pertahankan satu baris di pusat · lebar maksimal 80 %, kalimat dipecah 2 tampil.
- *Pengamatan di video asli, bukan target:* "Sometimes" 15 px = 3,62 % tinggi (terukur ulang; kartu lama 3,1 %); jarak event median 0,20 dtk.

### T2 · Camera-Punched Keyword Hold · camera
- **Trigger:** kata kunci yang harus ditahan dan terasa penting; jeda sebelum kalimat berikutnya.
- **Yang terlihat (termasuk gerak):** lompatan kamera pada frasa kunci: push ×1,34 di 7,5 dtk ("in After Effects." ditahan sampai 9,0 dtk), ×1,20 di 19,0 dtk ("motion"), tarik ×0,53 di 15,5 dtk. Kata kunci terukur "in After Effects." 7,97 % tinggi (kartu lama 8,0 %), "motion" 9,18 % (kartu lama 9,4 %), "smooth" 7,5 %; rasio kunci : sambung ±2,5–3× (terukur 2,53×). Panah 3D berputar pelan di bawah/samping teks, kepala panah punya cekungan V di belakang (periksa), tidak menutup teks; tinggi panah k2 terukur ulang 11,35 % (kartu lama 9,4 %). (k2, k3, k6)
- **Kenapa bekerja:** ruang kosong luas; kata ditahan sementara kamera tetap bergerak, jadi terasa hidup tanpa pengisi.
- **Mekanik Remotion (titik awal):**
  - Gerak: kamera virtual pada grup (grid + teks, panah di lapisan parallax berbeda): push 1,00→1,34 `CURVE.whip` 6 f; hold `drift()` 40–50 f; tarik 1,00→0,53 `CURVE.heavy` 14 f; panah berputar `rotateY` 0,5°/f.
  - Ruang: 2,5D: panah `translateZ` +120 px, shading `drop-shadow`.
  - Blur & blend: `<CameraMotionBlur shutterAngle={200} samples={16}>`.
- **SFX:** famili `air` · `Woosh.mp3` hanya pada push besar; hold senyap.
- **Pakai bila:** 1–2 kata kunci per 10 dtk. · **Jangan pakai bila:** semua kata diperlakukan sebagai kunci.
- **Remix (anti-jiplak):**
  1. Penjelasan fitur SaaS → pertahankan push pada kata kunci · ganti panah jadi kursor gelap di latar terang.
  2. Reel quote → pertahankan jeda panjang pada satu kata · ganti objek melayang jadi ikon produk.
- *Pengamatan di video asli, bukan target:* push ×1,34 di 7,5 dtk, ×1,20 di 19,0 dtk, tarik ×0,53 di 15,5 dtk.

### T3 · Per-Letter Exit And Serif Close · typography
- **Trigger:** akhir kalimat yang meluruh; penutup video dengan satu kata bergaya berbeda.
- **Yang terlihat (termasuk gerak):** keluar per huruf dari kiri ("these animations yourself," → "yourself,", ±0,4 dtk) atau kata awal meredup ("place to start"). Penutup "with *confidence.*": kata istimewa serif italic satu-satunya, tinggi 6 %, tanpa panah, latar lebih gelap. (k7, k8)
- **Kenapa bekerja:** perubahan gaya hanya di satu kata menandai akhir.
- **Mekanik Remotion (titik awal):**
  - Gerak: huruf keluar `CURVE.leave` 3 f per huruf, selisih `react()` dari kiri; serif italic masuk `CURVE.reveal` 12 f.
  - Blur & blend: tanpa.
- **SFX:** famili `stab` · `Lasertransision.mp3` ting penutup pada kata serif; keluar senyap. Musik meluruh ke −24 LUFS.
- **Pakai bila:** penutup. · **Jangan pakai bila:** tengah kalimat.
- **Remix (anti-jiplak):**
  1. Penutup video jasa → pertahankan satu kata beda gaya · ganti serif jadi tulisan tangan.
  2. Latar terang → pertahankan keluar per huruf · ganti teks gelap.
- *Pengamatan di video asli, bukan target:* keluar ±0,4 dtk; penutup 6,0 % tinggi.

## Audio (bila dibedah)
earshot: 192 onset (7,2/dtk), tag: 42 drum, 25 note, 11 key, 10 UI (pop/klik), 2 whoosh. Pop/klik menyatu dengan musik; tidak terukur apakah SFX terpisah. Musik glitch hop/elektronik 100 bpm (earshot ±100, librosa 99,4), pulse jelas (0,77), tanpa VO; babak: 0–15,3 −19 LUFS; 15,3–21,7 −21 LUFS (tick); 21,7–26,6 lebih ringan, hi-hat, −24 LUFS. Mix −20,3 LUFS, true peak −2,9 dBTP, LRA 6,6 LU.

## Yang harus terasa sama saat disandingkan
- Hanya satu baris teks di pusat, pergantian frasa jatuh di ketukan?
- Kata kunci sendirian 2,5–3× lebih besar dari kalimat panjang?
- Latar gelap bervignette dengan grid yang hanya terlihat di tengah?
- Still berurutan 0,5 dtk menunjukkan skala grid berubah (kamera bergerak), bukan diam?
- Satu objek aksen kecil di bawah/samping teks, tidak menutupi teks?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
