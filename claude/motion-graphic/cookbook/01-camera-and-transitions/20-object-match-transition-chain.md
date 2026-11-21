---
id: "20"
pola: Object-Match Transition Chain
kategori: camera
kategori_lain: [layout, texture, typography]
trigger: pembuka atau teaser cerita perjalanan tanpa narasi; lompatan waktu antarbab (pergantian tahun, pindah kota); meninggalkan tempat lama dan berangkat
sumber: Dyanee, film pendek "Merantau" (arsip siirfannih dan file Irfan 2dmotion.mp4; musik Ian Post – Arisaig) · 16:9 · 47,1 dtk
dilihat_bergerak: tidak
diukur: ya
alias: ["82"]
---
# 20 · Object-Match Transition Chain

> **Cookbook, bukan template.** Dipinjam: mekanik gerak dan syarat berhasilnya; tidak dipinjam: palet, huruf, komposisi, objek, kata. Angka *pengamatan* dari video asli; angka **Mekanik Remotion** titik awal untuk sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber id 20: `siirfannih_Dd6SAbAp5JP.mp4` (reference_id LOC-1c4957b3c919) · 1280×720, 24 fps · Frame: `../../guide/referensi/sheets/20-calendar-travel.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/20-k1…k8-*.jpg` (k1 kota, k2 kalender, k3 lingkaran, k4 jam, k5 pintu, k6 koper, k7 pesawat, k8 judul) · `../../guide/referensi/ukuran/20-calendar-travel-ukuran.md` · `…-periksa.md`
> Sumber id 82 (alias): file Irfan `2dmotion.mp4` (Motion Design — Dyanee; Music — Ian post – Arisaig); bukan "02 Everything Starts With a Spark" · Frame: `../../guide/referensi/sheets/50-spark.jpg` (nama sheet lama, isinya video ini) · Frame kunci: `../../guide/referensi/sheets/keyframes/50-k1-ilustrasi-interior.jpg` … `50-k8-judul-kredit.jpg`
> Video sumber: `/home/irfan/work/canvas-skill-library-20261102/data/local-videoanalys-20261102/Motion/siirfannih_Dd6SAbAp5JP.mp4` (id 20) dan `/home/irfan/work/pustaka-video/mac/2dmotion.mp4` (id 82); MD5 identik.
> Dilihat bergerak: **tidak** (frame diam, pengukuran, estimasi kamera ORB/cv2 kasar; bedah gerak sebelum dipakai). Kedalaman: dalam (SFX tidak dipisah dari musik).

**Inti mekanik (1 kalimat):** Tanpa narasi, satu benda besar per adegan menggantikan kalimat dan menjadi transisi (kalender → tanggal dilingkari → jam → pintu → koper → kertas terlipat jadi pesawat kertas lalu pesawat asli); tiap pergantian dipicu gerak benda itu (halaman, lipatan, bingkai jendela), bukan efek tempelan.
**Narrative trigger:**
- Cerita perjalanan tanpa VO → T1
- Pergantian tahun, satu angka raksasa → T2
- Satu hari penting dalam metafora benda → T3
- Adegan atmosferik tanpa footage; hangat-gelap ke terang-dingin → T4
- Judul/nama di ujung cerita yang muncul pelan → T5
- Epilog: tempat yang ditinggalkan → T6
**Jangan dipakai untuk:** tanggal literal wajib, penjelas padat data, talking head, promo CTA keras.
**Kata kunci gaya:** 2,5D bersih, metafora benda, kertas, hangat-ke-dingin, puitis
**Diambil untuk:** id 20: rantai kertas → pesawat, transisi lewat benda, angka tahun raksasa. Id 82: motion graphic 2D (ilustrasi, skala, kedalaman, kamera, transisi), dibedah paling dalam.

## Kondisi footage asli
Tanpa footage/ucapan; render 3D/2,5D bersih (ganti aset sendiri). Satu subjek besar per adegan, latar berkabut, kamera virtual pelan.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
- Dua babak suhu, satu aksen merah. Rumah (0–15/24 dtk) hangat-gelap: dinding `#18181B`–`#25262B`, sorot `#D1D09E`/`#7E6B41`–`#BDB68A`, pintu `#4E493D` di dinding wajik `#867648` (82: `#7D502B`). Perjalanan terang berkabut `#E9E1D6`–`#FAF6DF`/`#C4D8D7`/fasad `#BBBFDA`; judul `#5F6F89`–`#68758E`/`#60708A` + sinar `#A8AEBD`–`#D1D3DD`.
- Kalender: kertas (diperdebatkan: ±`#E4E4E4`, periksa median `#F4F4F4`, vs `#F9F7F1`), angka `#373737`/`#363636`, merah `#B33E44`–`#B73A43`/`#B03840`–`#B53C46`; koper `#9F5142`/`#9C4D41`, satu-satunya warna jenuh babak perjalanan.
- Matahari titik putih, flare, pita ±40°. Vignette 3D (k1 luma pusat 166 vs sudut 37; interior 171 vs 38; langit/kota sudut 27–58), kalender tanpa vignette. Tanpa grain (std high-pass 1,3–1,4) dan outline; penutup memudar abu 45–47 dtk.
### Teks
Angka tahun sans geometris tebal (padanan Poppins Bold); kisi sans tipis; judul script tipis putih/`#C2CBD7`–`#DDE6EB` (padanan Great Vibes/Allura); kredit mono. Judul "Merantau" masuk BESAR (24 % tinggi, 66 % lebar, pusat 51 %/76 %, separuh terpotong haze) lalu 17 % / 30 % lebar.
### Ritme
Cepat di rumah, lambat saat terbang (shot langit/judul 11,5–14 dtk); babak (20): waktu 0–15,6 → berangkat 15,6–30 → judul 30–41,5 dtk. Cut (diperdebatkan: 20 ±15 pergantian isi ≈ 20/menit, cut keras 8 = 10,2/menit, shot median ±2,6 dtk; 82 8–10 cut keras = 10,2/menit, median 3,5 dtk). Cut dekat nada glockenspiel/pizzicato (2,5 / 9,5 / 12,9 / 28,3 / 45,1 dtk, ±60 ms), bukan whoosh.

## Pola

### T1 · Object-Match Transition Chain · camera
- **Trigger:** rangkaian tanpa VO; tiap benda satu "kalimat"; waktu berlalu.
- **Yang terlihat (termasuk gerak):** halaman kalender dibalik (wipe ke tahun berikut) → kertas menyapu layar (15,5 dtk) → koper (16,9) → flash abu/putih saat kertas dilipat jadi pesawat kertas (19,5) → match cut ke pesawat asli (23,7) → bingkai jendela pesawat iris (27,4–±29) → awan/kota, fade putih (30) → hitam; akhir cut ke pintu abu; flash putih jam → pintu; dissolve/flash/wipe 4–8 frame. (k5–k7)
- **Kenapa bekerja:** satu bahan berpindah bentuk, mata tidak mencatat potongan; arti dari benda (kalender = waktu, koper = berangkat).
- **Mekanik Remotion (titik awal):**
  - Lapisan: latar B → adegan A (di-mask benda) → benda jembatan (SVG/Three) → cahaya depan.
  - Gerak: wipe benda `CURVE.whip` 8–12 f; lipatan `rotateY/rotateX` 4–6 f per lipatan; crossfade 3–4 f saat benda ≥ 80 % frame; `arc()` (x `CURVE.land`, y `CURVE.heavy`); flash naik 3 f, turun 5 f `CURVE.reveal`.
  - Ruang/blur: `perspective: 1200px`, `translateZ`; iris dari tengah jendela; `<CameraMotionBlur shutterAngle={200} samples={16}>` (`../../references/smooth-motion.md`); flash `mixBlendMode: "screen"`.
- **SFX:** `documenter.mp3` pada sapuan kertas; `Woosh.mp3` pada halaman dibalik/kertas terbang; `ES_Designed, Riser, Transition, Fast, Short, Clean 01` menuju penutup; selebihnya senyap.
- **Pakai bila:** tiap adegan punya benda penjembatan. · **Jangan pakai bila:** narasi padat butuh cut tepat di kata; adegan ramai objek kecil.
- **Remix (anti-jiplak):**
  1. Pembukaan toko/UMKM → satu benda berubah bentuk lintas adegan · kertas jadi kain/nota/kardus.
  2. SaaS onboarding → benda penutup layar jadi transisi · kartu UI dibalik; 9:16 sapuan vertikal.
- *Pengamatan di video asli, bukan target:* titik pergantian 2,5 · 4,5 · 5,5 · 9,5 · 12,9 · 15,5 · 16,9 · 19,5 · 20,2 · 23,7 · 25,8 · 27,4 · 30 · 41,5 · 42 · 45,1 dtk.

### T2 · Giant Year Digit Stack · typography
- **Trigger:** pergantian tahun/waktu berlalu sebagai angka raksasa; angka jadi benda di adegan.
- **Yang terlihat (termasuk gerak):** "20/26" dua baris mengisi kiri (x 0,7–39,2 %), digit tebal arang; kisi tanggal kecil di kanan. Halaman membalik diagonal berlapis (2,5–4,5 dtk) 2025 → 2026, lembar berikut melayang di atas; roll ±100° dalam 4 dtk. (k2)
- **Kenapa bekerja:** satu angka separuh frame, kisi jadi tekstur; merah hanya Minggu dan lingkaran.
- **Mekanik Remotion (titik awal):**
  - Lapisan: kertas → digit → kisi → lembar berikut.
  - Gerak: `rotate` diagonal + `translate` 12–18 f `CURVE.heavy` (roll ±100° dalam 120 f @30), bayangan di lipatan.
  - Ruang/blur: datar; `<CameraMotionBlur>` di lembar.
- **SFX:** `documenter.mp3` pada balik halaman; angka senyap.
- **Pakai bila:** angka bermakna cerita. · **Jangan pakai bila:** angka sudah di VO.
- **Remix (anti-jiplak):**
  1. Promo "diskon 7 hari" → angka tebal separuh frame · sobekan kupon.
  2. Latar gelap/9:16 → blok dua baris · digit krem; digit atas, kisi bawah.
- *Pengamatan di video asli, bukan target:* digit 35,0–37,9 % tinggi (median 37,01 %; 82: 36 % lebar × 38 % tinggi); tanggal 4,3 % (82: 5 %); rasio (diperdebatkan: ±8,5× kartu 20, 8,82× periksa, ±7,5× kartu 82, diukur ulang 8,3×).

### T3 · Calendar Circle Push-and-Spin · camera
- **Trigger:** satu hari penting di antara daftar tanggal.
- **Yang terlihat (termasuk gerak):** push +45 % miring ±7° ke "20" (7,0→8,5 dtk), lingkaran merah coretan tangan; putar cepat +81° dan tarik −27 % ke jam (8,5→9,3), jam berputar +46° menjauh, jarum berjalan. Tanggal 9–10 % tinggi. (k3, k4; 7,0–11,5 dtk)
- **Kenapa bekerja:** penekanan lingkaran tangan; spin menutup adegan dengan sentakan.
- **Mekanik Remotion (titik awal):**
  - Lapisan: kisi → lingkaran SVG → kamera virtual (grup).
  - Gerak: `strokeDashoffset` 10–12 f (82: 18 f) `CURVE.reveal`; push `scale` 1→1,45 + `rotate` 7° `CURVE.heavy` ±45 f; spin `rotate` 0→81° + `scale` 1→0,73 `CURVE.whip` 8 f.
  - Ruang/blur: datar; `<CameraMotionBlur shutterAngle={200} samples={16}>` penuh saat spin.
- **SFX:** `Woosh.mp3` pada spin; tick-tock tidak ada di SFXIrfan.
- **Pakai bila:** satu elemen ditandai. · **Jangan pakai bila:** banyak elemen harus terbaca.
- **Remix (anti-jiplak):**
  1. Jadwal kelas → push ke item bertanda · lingkaran jadi garis bawah.
  2. Peta rute → push lalu spin · tanggal jadi pin kota.
- *Pengamatan di video asli, bukan target:* ORB ×1,45, +7° (inlier 18); spin +81°, ×0,73 (inlier 449); lingkar merah 10–12 % (ulang 12,8 %).

### T4 · Hero-Object Three-Layer Light Scene · texture
- **Trigger:** adegan atmosferik tanpa footage; pergeseran suasana aman → jauh; satu benda per fase.
- **Yang terlihat (termasuk gerak):** tiga lapis tetap: depan gelap/bingkai (jendela, porthole abu, badan koper), subjek tajam, latar cahaya berkabut; flare, pita, bokeh, partikel di depan. Kota: gedung dekat gelap, jauh pucat berkabut. Urutan benda = cerita (jendela → kalender → jam → pintu → kertas beterbangan 16 dtk → koper → pesawat → langit + judul → pintu abu). Kamera: jendela pull ±8 % + tilt; kalender push ±7 %; jam pull ±35 %; kota ×1,5 dalam 3,5 dtk; jendela pesawat ×2,2. (k1, k4–k8)
- **Kenapa bekerja:** kedalaman dari kabut dan ketajaman; satu ide besar per adegan; dua suhu + satu aksen membuat pergantian babak terbaca dulu.
- **Mekanik Remotion (titik awal):**
  - Lapisan: langit + sinar → gedung jauh (opacity 0,5, blur 3 px) → gedung dekat → subjek → bingkai gelap → flare + debu → vignette.
  - Gerak: dolly `scale` 1→1,05–1,07 `CURVE.drift`; push ×1,5 dalam 105 f @30 `CURVE.heavy`; suhu bergeser antar adegan lewat flash; penutup `saturate(1→0)` 60 f `CURVE.drift`.
  - Ruang/blur: parallax (depan 1,1–1,4×, subjek 1×, latar 0,6–0,9×), `perspective: 1200px`; subjek ≥ 45 % tinggi; latar `blur(2–6px)` + kabut; flare/pita `mixBlendMode: "screen"` ±40°.
- **SFX:** senyap, atau `ES_Particle Emission - Soundpembuka`; `Move.mp3` hanya saat benda besar mendarat (pintu menutup); musik berganti warna sebagai padanan suhu.
- **Pakai bila:** render bersih, satu subjek besar. · **Jangan pakai bila:** footage nyata/matte; palet brand ketat.
- **Remix (anti-jiplak):**
  1. Produk 3D/latar terang → tiga lapis + dua babak + satu aksen jenuh · jam/koper jadi produk; palet krem → putih-biru muda.
  2. Footage drone kota/origin brand → push + kabut antarlapis · haze gradien di footage.
- *Pengamatan di video asli, bukan target:* k4 luma pusat 242 vs sudut 103; jam 40,19×70,72 % (82: ±45–66 % tinggi); koper (diperdebatkan: 83×28,3 % kartu 20, 89 % × 24,8 % di sepertiga bawah periksa 82, kartu lama 19 %); pesawat ±32 % (82: siluet 18 % × 25 %); pesawat kertas ±15 % lebar; pintu ±48 % lebar × 100 % tinggi.

### T5 · Quiet Column Script Title · typography
- **Trigger:** judul/nama di ujung cerita tanpa kata.
- **Yang terlihat (termasuk gerak):** script tipis putih di kolom kiri (pusat ≈ 25 %, 38,6–41 %), kanan dikosongkan untuk langit dan pesawat kecil (±2 %). Versi 82: masuk besar (24 % tinggi) lalu mengecil ke 17 % dan geser kiri-tengah. Versi 20: tinggi 12,4 %, lebar 32,7 %, fade + naik dari blur (31,5–33 dtk), pindah kiri-tengah (36–37), keluar fade (41,5); kredit mono kecil di bawah. (k8)
- **Kenapa bekerja:** shot paling lambat (11,5 dtk); huruf tipis terbaca di latar lunak; kolom kiri memberi ruang gerak di kanan; rasio ≥ 7×.
- **Mekanik Remotion (titik awal):**
  - Lapisan: latar biru-abu + sinar (gradien kabut) → judul → kredit.
  - Gerak: `opacity` 0→1 + `translateY(24px)` + `blur(6–8px)→0` 24 f `CURVE.reveal`; mengecil `scale 1→0,7` + geser kiri 36 f `CURVE.heavy`; keluar fade 18 f `CURVE.leave`.
  - Ruang/blur: datar; blur masuk saja, tanpa glow.
- **SFX:** `Lasertransision.mp3` (ting) satu kali saat judul tampil bila perlu; `basmenyebar.mp3` hanya bila judul puncak; teks di sumber senyap.
- **Pakai bila:** latar lunak tanpa tekstur tajam; ujung cerita, nama brand. · **Jangan pakai bila:** latar ramai; judul harus terbaca dalam 1 dtk.
- **Remix (anti-jiplak):**
  1. Judul profil/UMKM → kolom satu sisi, masuk dari kabut · serif tipis/huruf brand.
  2. Latar terang/9:16 → huruf tipis dan fade · arang; judul sepertiga atas.
- *Pengamatan di video asli, bukan target:* pusat judul (diperdebatkan: (25,19; 38,57) % periksa, (25, 41) % kartu lama 20, (27, 39) % kartu 82 diukur ulang (25,2; 38,5) %); kredit (diperdebatkan: 14 px (1,9 %) dan 10–12 px (1,4–1,7 %) kartu 20, 2,4 % / 1,5 % kartu 82); rasio judul : kredit 6,5–9×.

### T6 · Desaturated Return Epilogue · texture
- **Trigger:** akhir cerita tentang meninggalkan; rumah yang kosong.
- **Yang terlihat (termasuk gerak):** pintu yang sama dengan adegan awal (k5) menjadi abu `#393939` tanpa warna di 42–45 dtk, lalu hitam 2 dtk; daun pintu berpanel, gagang hitam di kiri. (k5)
- **Kenapa bekerja:** objek dikenali lagi, hanya warna hilang, ditinggalkan tanpa kata.
- **Mekanik Remotion (titik awal):**
  - Lapisan: adegan pintu sama → `saturate(0)` 1→0.
  - Gerak: 18–24 f `CURVE.drift`; cahaya bergeser sangat pelan; fade hitam 12 f.
  - Ruang/blur: datar, tanpa blur.
- **SFX:** senyap; ekor musik 1,3 dtk.
- **Pakai bila:** adegan awal bisa dipakai ulang. · **Jangan pakai bila:** tak ada benda awal.
- **Remix (anti-jiplak):**
  1. Toko tutup → benda awal tanpa warna · pintu jadi etalase.
  2. Video produk/latar terang → desaturasi penutup · memudar ke putih atau satu warna merek.
- *Pengamatan di video asli, bukan target:* lebar daun pintu (diperdebatkan: 27,5 % lebar frame koreksi periksa, ±20 % kartu lama; ±48 % di adegan pintu penuh kartu 82).

## Audio (bila dibedah)
SFX menempel transisi: swish kertas 2,7 dtk (+15 dB di atas musik), gemerisik 3,7, tick-tock 9,6, ding 12,1/12,5, whoosh/reverse cymbal 15,4, riser 42,1; teks tanpa klik/pop; stab orkestra tidak ada di SFXIrfan. Musik "Arisaig" ±136 bpm: piano tanpa beat 0–15,6 (82: pizzicato + glockenspiel 0–24), beat lo-fi 15,6–41,9 (82: gitar sendu 24–42), pizzicato + riser 41,9–47. Mix −14,3 LUFS, TP −0,7 dBTP, LRA 3,8 LU; senyap 45,8 dtk.

## Yang harus terasa sama saat disandingkan
- Pergantian dipicu benda/cahaya yang bergerak, bukan efek biasa?
- Satu subjek besar, tiga lapis, dua suhu, satu aksen merah?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat (kartu 20 dan 82 lama: sama-sama kosong).
