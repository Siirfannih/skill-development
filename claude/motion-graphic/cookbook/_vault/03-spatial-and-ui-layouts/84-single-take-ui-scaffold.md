---
id: "84"
pola: Single-Take UI Scaffold
kategori: layout
kategori_lain: [typography, script]
trigger: penjelasan framework atau formula bertingkat ("struktur X", bab 1 sampai 6); angka audiens yang dipecah (1000 orang jadi 700 dan 100); daftar bab yang tumbuh mengikuti ucapan
sumber: Sky (ClipCut, talking head edukasi IG) · 9:16 · 56,0 dtk
dilihat_bergerak: tidak
diukur: ya
alias: []
---
# 84 · Single-Take UI Scaffold

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: file kiriman Irfan `talkinghead.mp4` (kreator Sky, ClipCut, menyebut diri di caption) · 9:16 (720×1280), 30 fps, 56,0 dtk · Frame: `../../guide/referensi/sheets/84-sky-clipcut-caption.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/84-k1-judul-serif-kartu-struktur.jpg` (k1), `84-k2-badge-titik-audiens.jpg` (k2), `84-k3-grid-1000-titik.jpg` (k3), `84-k4-kepala-reaksi-merah.jpg` (k4), `84-k5-kerangka-caption-penuh.jpg` (k5), `84-k6-cta-notifikasi.jpg` (k6)
> Video sumber: tidak ada di mesin ini
> Dilihat bergerak: **tidak** (isi dari frame diam, scene-detect 0,5 fps dan loudness; bedah geraknya sebelum meminjam teknik gerak). Kedalaman bedah sedang: transkrip, SFX, dan musik belum ditranskrip dan belum dipisah stem.

**Inti mekanik (1 kalimat):** Satu shot talking head tanpa potongan, dan seluruh ceritanya dibangun oleh lapisan UI yang tumbuh di ruang kosong sekitar kepala (kartu struktur, titik audiens, kepala reaksi, kerangka bab berwarna) mengikuti urutan ucapan.
**Narrative trigger:**
- Pembuka yang menjanjikan struktur ("ini formula X, enam bagian") → T1
- Angka yang dipecah jadi kelompok (1000 → 700 + 100 orang) → T2
- Penonton disebut dan perlu "menjawab" ("pasti kamu mikir…") → T3
- Penjelasan bertingkat yang menumpuk bab demi bab sampai penuh → T4
**Jangan dipakai untuk:** cerita emosional sinematik, konten tanpa struktur atau daftar, video yang butuh banyak b-roll.
**Kata kunci gaya:** gelap, UI overlay, neon multiwarna, serif-miring + sans, terstruktur, tanpa cut
**Diambil untuk:** `talkinghead.mp4` → konsep **talking head** utuh, terutama cara teks/UI menjelaskan isi tanpa memotong shot (bagian 2 dan 5 terkuat). Tanpa subtitle kecil sebagai fokus; gaya neon tidak diambil.

## Kondisi footage asli
9:16, satu shot utuh dalam ruang gelap hangat (rak dan monitor biru-hijau buram di belakang), wajah diterangi lembut, grade rendah kontras, tanpa grain. Kepala + bahu ±45-50 % tinggi frame, tengah bawah; ruang kosong di sepertiga atas dan pinggang bawah dipakai UI. Pakaian gelap polos. Kamera statis, tanpa punch-in terlihat dari sheet.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Latar hampir hitam. Teks dasar putih; aksen oranye-emas (judul serif, titik, badge) + **satu warna per bab** di kerangka caption: merah (Introduction), kuning (Struggle), ungu (Rise), cyan (Proof), magenta (Unique Mechanism), putih (Expectations), hijau (Two-Door CTA). Warna bab konsisten di kartu kecil dan kerangka besar. UI bercahaya lembut; panel kartu tipis bergaris abu, sudut membulat.
### Teks
- Dua keluarga: serif miring (judul hero "Ultimate", "1000 comments", "700 people") dalam oranye-emas bergradien + sans geometris putih untuk subtitle dan UI.
- Subtitle kata: 1-3 kata per tampil, sans putih ±2,5 % tinggi frame, tengah, di dada/bawah dagu (bukan pita bawah), berganti per frasa. Hero serif ±5-6 % tinggi, di bawah wajah, sekali per ide besar. Teks UI sangat kecil (label bab ±1,5 %, isi ±1 %), sengaja tidak untuk dibaca penuh: bacaannya "banyak isi + strukturnya berwarna".
- Masuk sigap per baris (mengetik/tumbuh dari atas ke bawah); kerangka menumpuk ke bawah lalu menggulir ke atas saat penuh.
### Ritme
- **0 potongan kamera** dalam 56 dtk (scene-detect ambang 0,25). Ritme dari pergantian lapisan: ±1 perubahan overlay tiap 2 dtk; subtitle berganti ±2-3 kali per detik.
- Babak: 0-8 dtk judul + kartu struktur → 8-16 konsep audiens → 16-26 angka (grid 1000/700/100) → 26-50 kerangka bab + kepala reaksi → 50-56 CTA + notifikasi.

## Pola

### T1 · Structure Card Above Head · layout
- **Trigger:** pembuka yang menjanjikan struktur atau formula; judul besar sekali per ide.
- **Yang terlihat (termasuk gerak):** kartu vertikal bergaris berisi daftar bab berwarna muncul di atas kepala dengan garis putus melengkung menunjuk ke judul serif; ikon platform menempel di sudut. Sebagian UI lewat **di belakang kepala** (matte pembicara). (k1; 0-8 dtk; gerak masuk belum dilihat)
- **Kenapa bekerja:** ruang di atas kepala gelap dan kosong; kartu bergaris tipis dan sudut membulat terbaca tanpa menutup wajah.
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): footage → kartu struktur → matte pembicara (`persepsi.py`, RVM) → judul serif.
  - Gerak: kartu tumbuh dari atas ke bawah, baris per baris, `move(frame, start + react(i, 30), 8, "reveal")`; garis putus digambar dengan `strokeDashoffset` 12 f.
  - Ruang: datar; bagian kartu di belakang kepala lewat matte.
  - Blur & blend: glow lembut `drop-shadow(0 0 16px)` pada judul; tanpa blend mode.
- **SFX:** famili `ui` · `pop up.mp3` pada kartu muncul; baris isi senyap. Bunyi referensi belum dibedah.
- **Pakai bila:** talking head dengan ruang kosong di atas kepala; matte tersedia bila UI harus lewat di belakang kepala. · **Jangan pakai bila:** kepala besar menyentuh tepi atas; terang atau ramai di atas kepala.
- **Remix (anti-jiplak):**
  1. Kreator kuliner → pertahankan kartu tumbuh baris demi baris · ganti bab dengan bahan/langkah, warna dari palet dapur.
  2. Latar terang 16:9 → pertahankan kartu di sisi kosong · ganti glow dengan bayangan lunak, teks gelap.
  3. Produk SaaS tanpa wajah → pertahankan garis putus penunjuk · ganti kepala dengan layar produk.
- *Pengamatan di video asli, bukan target:* hero serif ±5-6 % tinggi frame; label bab ±1,5 %.

### T2 · Dot-Grid Quantity Split · layout
- **Trigger:** angka audiens yang dipecah (1000 → 700 + 100); membuat besaran terasa nyata.
- **Yang terlihat (termasuk gerak):** badge pilihan (dua pil ikon + label) di atas kepala, di bawahnya titik oranye-putih membentuk dua kurung mengapit thumbnail reel (k2). Grid 1000 titik dalam kotak yang berubah oranye → hijau saat angka dibagi (700 / 100 people), label serif + sans di kiri (k3). (8-26 dtk; urutan perubahan belum dilihat)
- **Kenapa bekerja:** titik seragam membuat proporsi terbaca sebelum angkanya; warna berpindah hanya pada titik yang dibicarakan.
- **Mekanik Remotion (titik awal):**
  - Lapisan: footage → kotak grid → label → wajah tidak tertutup.
  - Gerak: titik berubah warna dengan jeda tidak rata dari `react(i, 30)` (bukan stagger konstan), tiap titik 4 f; angka label berganti dengan `CURVE.land` 8 f.
  - Ruang: datar; grid di sepertiga atas atau samping kepala.
  - Blur & blend: tanpa blur; warna lewat `fill` transisi.
- **SFX:** famili `ui` · `Kinetictypography(gunakansecaraacak).mp3` sesekali saat satu kelompok titik berganti; sisanya senyap.
- **Pakai bila:** ada angka besar yang dibagi jadi kelompok. · **Jangan pakai bila:** angka kecil (≤ 10) atau tidak ada pembagian.
- **Remix (anti-jiplak):**
  1. Survei pelanggan toko (100 pembeli, 30 balik lagi) → pertahankan grid titik + warna berpindah · ganti titik dengan ikon keranjang kecil.
  2. Data konversi SaaS → pertahankan pembagian bertahap · ganti titik dengan kotak persegi; warna aksen merek.
  3. 16:9 latar terang → pertahankan jeda warna tidak rata · titik gelap di panel putih.
- *Pengamatan di video asli, bukan target:* 1000 titik; 700 dan 100 sebagai angka pembagi.

### T3 · Audience-Head Reaction Bubbles · layout
- **Trigger:** penonton disebut dan perlu "menjawab" di layar; momen kegagalan atau bukti.
- **Yang terlihat (termasuk gerak):** 4-5 foto kepala bulat kecil di sekitar dada pembicara, tiap kepala punya teks reaksi singkat berwarna ("Wait, that's literally me.", "8,000 reels? Tell me more."); kepala berpendar warna bab (merah saat "None of it worked?!", hijau saat bukti). (k4; 26-50 dtk; gerak masuk belum dilihat)
- **Kenapa bekerja:** pembicara mengobrol dengan "penonton" tanpa potongan; warna bab mengikat reaksi ke isi.
- **Mekanik Remotion (titik awal):**
  - Lapisan: footage → kepala bulat + teks reaksi → subtitle.
  - Gerak: tiap kepala `scale 0,6→1` + opacity 8 f `CURVE.land`, jeda dari `react(i, 30)`; pendar warna bab `box-shadow` 0→20 px 10 f.
  - Ruang: datar; kepala di pinggang/dada, tidak menutup wajah pembicara.
  - Blur & blend: foto dibuat bulat (`borderRadius: 50%`); privasi: wajah audiens dipikseli di frame (k5).
- **SFX:** famili `ui` · `pop up.mp3` per kepala hanya bila kepala masuk sebagai objek; reaksi berturutan cukup satu bunyi per kelompok.
- **Pakai bila:** ada ruang kosong di bawah wajah; reaksi ≤ 5 kata. · **Jangan pakai bila:** foto audiens tidak boleh dipakai; badan pembicara bergestur di area itu.
- **Remix (anti-jiplak):**
  1. Testimoni pelanggan UMKM → pertahankan kepala bulat + teks singkat · ganti foto dengan inisial atau avatar ilustrasi.
  2. Latar terang → pertahankan pendar warna bab · ganti pendar dengan tepi warna solid.
  3. Video produk tanpa pembicara → pertahankan balon reaksi · ganti kepala dengan ikon pelanggan di sekitar produk.
- *Pengamatan di video asli, bukan target:* 4-5 kepala sekaligus; wajah audiens dipikseli di sheet.

### T4 · Chapter-Color Outline Stack · typography
- **Trigger:** penjelasan bertingkat yang menumpuk bab demi bab; isi harus terasa banyak tetapi tertata.
- **Yang terlihat (termasuk gerak):** garis vertikal putus-putus di kiri + titik warna per bab + teks isi kecil; menumpuk tiap bab diucapkan, menempati sepertiga atas frame, kepala tetap terlihat; setelah penuh menggulir ke atas. Di akhir, kartu notifikasi "Appointment Confirmed" + komentar "Content" muncul di sudut bawah (k5, k6). (26-56 dtk; gerak masuk belum dilihat)
- **Kenapa bekerja:** satu warna per bab dipakai konsisten di kartu kecil dan kerangka besar sehingga struktur terbaca dari warna, bukan dari membaca teks.
- **Mekanik Remotion (titik awal):**
  - Lapisan: footage → kerangka → subtitle → CTA di sudut.
  - Gerak: bab baru masuk `translateY(16px→0)` + opacity 10 f `CURVE.reveal`; gulir ke atas `CURVE.heavy` 14 f saat penuh; garis putus tumbuh dengan `scaleY`.
  - Ruang: datar.
  - Blur & blend: bab lama turun ke opacity 0,6 saat bab baru masuk; tanpa blend mode.
- **SFX:** famili `ui` · `Notif.mp3` atau `pop up.mp3` pada kartu notifikasi CTA; titik bab senyap.
- **Pakai bila:** 4-7 bab bertingkat dan ada sepertiga atas kosong. · **Jangan pakai bila:** bab harus dibaca penuh (teks isi sengaja kecil).
- **Remix (anti-jiplak):**
  1. Penjelasan resep/langkah produksi → pertahankan tumpukan + warna per bab · ganti bab dengan tahap kerja.
  2. Latar terang → pertahankan garis putus dan titik warna · teks isi gelap di panel semi-putih.
  3. 16:9 → tumpukan di kolom kiri, wajah di kanan.
- *Pengamatan di video asli, bukan target:* 7 bab berwarna; label ±1,5 %, isi ±1 % tinggi frame.

## Audio (bila dibedah)
Transkrip, SFX, dan musik belum dibedah; mix terintegrasi −14,1 LUFS.

## Yang harus terasa sama saat disandingkan
- Tidak ada potongan kamera; perubahan datang dari overlay?
- UI tidak pernah menutup wajah; kepala pembicara terbaca utuh?
- Daftar atau struktur tumbuh bertahap mengikuti ucapan, tidak tampil sekaligus?
- Satu warna per bab, sama di semua elemen bab itu?
- Paling banyak satu hero serif per ide, sisanya sans kecil?
- Subtitle 1-3 kata di dada/bawah dagu, bukan di pita bawah?

## Catatan pakai
- Belum pernah dipakai.
