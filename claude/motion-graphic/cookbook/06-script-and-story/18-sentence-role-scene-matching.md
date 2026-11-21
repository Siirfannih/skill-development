---
id: "18"
pola: Sentence-Role Scene Matching
kategori: script
kategori_lain: [layout, texture, typography]
trigger: klip podcast atau wawancara edukatif yang perlu dipecah per kalimat ke adegan; mengumumkan kategori lalu menjelaskannya; cerita pribadi dan filosofi yang butuh ilustrasi, lukisan, atau grafik pendamping
sumber: Joseph (Ultimate Editors) · YouTube g9xoKm5DEeU "How to Edit VIRAL Talking Head Videos Using ONLY Claude" (20:57), potongan hasil akhir 17:56–18:53, gaya klip podcast filosofi · 9:16 · 57 dtk
dilihat_bergerak: tidak
diukur: ya
alias: []
---
# 18 · Sentence-Role Scene Matching

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: Joseph (Ultimate Editors), YouTube `g9xoKm5DEeU`, potongan hasil akhir 17:56–18:53 (1080×1920 menurut bedah; frame 720p dalam video kursus, panel 9:16 396×704 px), 57 dtk · Frame: `../../guide/referensi/sheets/18-arthur-brooks-hasil.jpg` (hasil, tiap 2 dtk), `../../guide/referensi/sheets/18-arthur-brooks-10-adegan.jpg` (10 jenis adegan) · Frame kunci: `../../guide/referensi/sheets/keyframes/18-k1…k8-*.jpg` (k1 wajah + caption, k2 lukisan + teks, k3 garis + teks, k4 grafik, k5 ilustrasi tengah, k6 potret + cincin, k7 objek + teks, k8 teks biru) · Bedah lengkap: `../../guide/referensi/joseph-arthur-brooks.md` (taksonomi 10 adegan, logika penempatan, cara melatih Claude); ukuran: `../../guide/referensi/18-arthur-brooks-ukuran.md`; template turunan: `../../templates/gaya/minimal-premium/STYLE.md`
> Video sumber: tidak ditemukan di mesin ini
> Dilihat bergerak: **tidak** (isi dari frame diam; jangan pinjam teknik gerak dari kartu ini sebelum videonya didapat). Kedalaman bedah: dalam. Batas: semua ukuran dari SATU potongan 57 dtk di dalam video kursus (frame 720p); metode Joseph memakai ±20 video per gaya, jadi kartu ini harus diperdalam bila ada lebih banyak video gaya ini. Angka "klaim Joseph" (74 SFX, 225 animasi, waktu kerja) belum dicek. Tidak ada laporan periksa independen untuk kartu ini.

**Inti mekanik (1 kalimat):** Klip podcast vertikal bergantian antara wajah pembicara dan adegan bertekstur kertas (lukisan, garis biru, ilustrasi kasar, grafik bercahaya), dan adegan dipilih dari peran kalimat (umumkan → wajah, jelaskan → tunjukkan, sebut orang → callout tokoh), diikat satu pasangan huruf (sans + serif italic) dan satu aksen biru.
**Narrative trigger:**
- Kalimat mengumumkan kategori baru ("ada empat pola karier") lalu menjelaskannya satu per satu → T1
- Kalimat dengan kata kunci yang bisa dibesarkan di antara kata kecil → T2
- Cerita pribadi atau poin filosofis yang bisa ditunjukkan sebagai lukisan atau foto tokoh → T3
- Deretan kata kunci yang saling terhubung, atau kata yang diulang ("naik dan naik") → T4
- Ide utama yang bisa menjadi satu gambar ("spiral setiap 7 sampai 12 tahun") → T5
- Penutup kutipan, atau momen menyebut angka dan gelar → T6
**Jangan dipakai untuk:** promo produk cepat, UI demo.
**Kata kunci gaya:** minimal, premium, tenang, bertekstur kertas, editorial
**Diambil untuk:** nama video tidak menyebut bagian; bagian terkuat: logika penempatan adegan dari peran kalimat (tabel "kalimat pemicu → jenis adegan") dan taksonomi 10 jenis adegan yang diikat satu tekstur.

## Kondisi footage asli
- 9:16, klip podcast: wajah pembicara ±35 % durasi, adegan grafis/lukisan/B-roll ±65 %. A-roll bergantian framing lebar (kepala 36×34 %) dan rapat (kepala ±60 % tinggi, >85 % lebar).
- Latar A-roll tidak lebih buram dari wajah (Laplace 103 vs 106); tepi digelapkan (sudut L 58 vs tengah 109); jendela latar `#92989A`.
- Adegan grafis: kertas halftone, hitam bertekstur, atau biru penuh; lukisan klasik, foto asli pembicara, ilustrasi kasar bertekstur cat.
- Ruang teks A-roll: di bawah dagu, menumpuk di dada atau mik (blok 69 % lebar, pusat (50, 58) %; saat rapat 33 % lebar, pusat (49, 69) %). Di lukisan: kolom ≤ 40 % lebar di dinding kosong samping kepala.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
- Hitam/arang `#111111`–`#121212` (nyaris rata), kertas putih dingin `#F0F0F2`–`#F4F2F5` dengan titik halftone dan sudut ±7 % lebih gelap, satu aksen biru elektrik (garis `#0F69DF`, kotak `#2C79DD`, ilustrasi `#193ECE`/`#132CBD`, penutup `#233993` → `#0C1644` di sudut). Lukisan membawa warnanya sendiri.
- Tekstur sama di semua adegan: kertas tipis di B-roll, cat + kertas kasar di lukisan, kertas sangat kasar di adegan teks, tepi "berdarah" di ilustrasi, kain kasar di profil kepala. B-roll: tepi digelapkan dan sedikit di-blur.
- Revisi Joseph #3: tekstur cat terlalu berat dan tidak ikut bergerak → kekuatan separuh, tempel ke layer. Template turunan memakai token `#0B0B0C`, `#F1EFEA`, `#1F5FE0` (bukan hasil ukur).
### Teks
- Inter (narasi) + Playfair Display Italic (kata istimewa). Satu tampilan ≤ 5 kata: kata terpenting besar bold di tengah, kata lain kecil di celah atas/bawahnya, tidak berbaris rata. Kata kunci 6–10 % tinggi (serif italic 4,5–7,5 %), kata sambung 1,5–2,3 % satu ukuran, rasio ≥ 3.
- Putih di gelap/lukisan/biru, hitam di kertas; di kertas kata istimewa juga biru. A-roll tanpa kata kunci: caption putih kecil 2–3 kata di bawah dagu.
### Ritme
- 26 cut = 27,4/menit, shot median 1,7 dtk, event visual 37/menit (terbaca `energi` dari tempo, registernya tenang). Pembuka tetap di wajah + caption. Kalimat dua bagian: ganti adegan di tengah kalimat. Revisi #2 dan #5: teks grafik ditahan sampai kalimat selesai sebelum cut; adegan ilustrasi (spiral) tampil lebih lama.

## Pola

### T1 · Sentence-Role Scene Matching · script
- **Trigger:** setiap kalimat klip podcast saat menyusun rencana edit.
- **Yang terlihat (termasuk gerak):** adegan dipilih dari peran kalimat, bukan selera. Pembuka tetap di wajah + caption supaya penonton terhubung dulu. Mengumumkan kategori baru → wajah; menjelaskannya → tunjukkan (lukisan, grafik, B-roll). Kata diulang ("up and up and up…") → grafik naik satu anak tangga per kata. Kalimat dua bagian ("expert, which is like slow and steady") → wajah dulu, ganti ke grafik garis datar di tengah kalimat. Menyebut orang → callout tokoh. Cerita pribadi → callout objek dengan foto asli pembicara. Lelucon → ilustrasi pembicara dengan lingkaran yang memutar pilihan. Poin besar berisi deretan kata kunci → garis + teks. Penutup → adegan teks dengan tanda kutip. Jenis adegan bergiliran. (rencana edit Joseph 13:31–15:32; sheet `18-arthur-brooks-10-adegan.jpg`)
- **Kenapa bekerja:** tiap adegan punya alasan dari kalimatnya, jadi penonton tidak merasa grafik acak; keseimbangan jenis adegan menjaga ritme.
- **Mekanik Remotion (titik awal):**
  - Lapisan: A-roll (rail wajah) → adegan grafis di `<Sequence>` pengganti; tabel keputusan (`kalimat pemicu → jenis adegan → peran`) disimpan sebagai data storyboard, bukan kode.
  - Gerak: ganti adegan di tengah kalimat dengan cut atau slide singkat (`CURVE.reveal` 6–8 f); teks grafik ditahan sampai kalimat selesai sebelum cut.
  - Ruang: datar.
  - Blur & blend: tanpa efek khusus; konsistensi lewat tekstur (T6).
- **SFX:** famili `ui`, `air`, `mekanik` · `Kinetictypography(gunakansecaraacak).mp3` sesekali untuk teks yang berganti; `Woosh.mp3` untuk transisi adegan; klaim Joseph (klik untuk teks, highlighter untuk grafik) tidak dipakai: bunyi highlighter tidak ada di SFXIrfan; kata KT per kata senyap.
- **Pakai bila:** klip bicara 30–60 dtk dengan banyak kalimat yang bisa diperagakan. · **Jangan pakai bila:** pembicara emosional yang wajahnya adalah isinya (grafik memutus).
- **Remix (anti-jiplak):**
  1. Klip pelatihan UMKM → pertahankan aturan "umumkan → wajah, jelaskan → tunjukkan" · ganti lukisan dengan foto produk, grafik biru dengan grafik penjualan.
  2. Talking head kreator → pertahankan ganti adegan di tengah kalimat dua bagian · ganti kertas halftone dengan latar bersih merek.
- *Pengamatan di video asli, bukan target:* ±35 % wajah, ±65 % adegan lain; 10 jenis adegan Joseph: caption layar, B-roll + teks, lukisan + teks, garis + teks, garis + ilustrasi, adegan teks, ilustrasi tengah, ilustrasi samping, objek + teks, grafik.

### T2 · Gap-Placed Key Word Caption · typography
- **Trigger:** A-roll atau B-roll dengan kalimat yang punya satu kata kunci jelas; pembukaan klip.
- **Yang terlihat (termasuk gerak):** satu tampilan ≤ 5 kata; kata terpenting besar bold (sans bold atau serif italic bold) di tengah, kata lain kecil di celah atas/bawah, tidak rata ("There's / four / career patterns, / psychologically", 0:08; "And I fell in love with a girl in / San Diego.", 0:20). A-roll: blok di bawah dagu, menumpuk di dada/mik; sambung kecil di kiri-atas kata kunci. (k1; 17:57–18:03 dalam potongan)
- **Kenapa bekerja:** wajah tidak tertutup; kata sambung satu ukuran saja dan kata kunci jauh lebih besar (rasio 3–5), jadi mata langsung ke kata kunci.
- **Mekanik Remotion (titik awal):**
  - Lapisan: footage → vignette ringan → blok teks (kata sambung relatif terhadap kotak kata kunci, ukur `measureText`).
  - Gerak: kata kunci `scale` 1,08→1 `CURVE.land` 8 f dengan motion blur; kata kecil `opacity` + `translateY(6px)` 3 f sesudahnya; kutipan 3 baris, jarak baris rapat (kira-kira −1 px dari ukuran huruf).
  - Ruang: datar.
  - Blur & blend: `<CameraMotionBlur shutterAngle={200} samples={16}>`; tanpa blend.
- **SFX:** famili `glitch` · senyap per kata (KT); satu `Katapertama.mp3` pada tampilan pertama bila ini pembuka.
- **Pakai bila:** ruang di bawah dagu/dada kosong dan kata kunci ≤ 12 huruf. · **Jangan pakai bila:** wajah memenuhi frame tanpa ruang dada (blok menutup mulut).
- **Remix (anti-jiplak):**
  1. Klip konsultan → pertahankan kata kunci besar + kata kecil di celah · ganti sans/serif dengan pasangan huruf merek, aksen biru ke satu warna lain.
  2. Latar terang → pertahankan rasio ≥ 3 · kata gelap, kata kunci diberi bobot saja.
- *Pengamatan di video asli, bukan target:* "transitories" 6,0 % tinggi, "four" 8,8 %, kata sambung 1,6–1,9 % ("There are" 1,85 %), serif "brutal." 4,7 %; blok 69 % lebar, pusat (50, 58) %.

### T3 · Painting with Side Column Text · layout
- **Trigger:** poin filosofis atau cerita pribadi yang diilustrasikan dengan lukisan atau foto asli pembicara.
- **Yang terlihat (termasuk gerak):** lukisan klasik penuh frame dengan teks di kolom kanan (≤ 40 % lebar, pusat x 70–75 %, y 29–35 %) di dinding kosong setinggi kepala tokoh ("San Diego." serif italic 7,1 % / 5,4 %; "Same job" 3,3 % + kotak biru "42 years" 4,3 % dengan panah tipis ke tokoh). Kamera slide-in singkat; lukisan menyatu dengan tekstur kertas kasar, vignette (sudut L 36/19 vs tengah 48). Foto asli pembicara sebagai objek di cerita pribadi (0:40, 0:44). (k2, k7)
- **Kenapa bekerja:** teks duduk di dinding kosong di samping kepala; lukisan besar terpotong tepi memberi "mahal" tanpa animasi rumit.
- **Mekanik Remotion (titik awal):**
  - Lapisan: lukisan (full-bleed, tekstur) → vignette → kolom teks.
  - Gerak: lukisan `translateX` 30 px→0 + `scale` 1,05→1 `CURVE.land` 8–10 f; teks masuk per baris 3 f dengan motion blur; kotak biru `clipPath` tumbuh 6 f.
  - Ruang: datar atau parallax 3 % antara lukisan dan teks.
  - Blur & blend: tekstur cat setengah kekuatan, `mixBlendMode: "multiply"`, tempel ke layer lukisan.
- **SFX:** famili `air`, `taktil` · `Woosh.mp3` untuk slide-in; `documenter.mp3` untuk foto cetak mendarat bila memakai foto asli.
- **Pakai bila:** lukisan atau foto dengan dinding/langit kosong di samping tokoh. · **Jangan pakai bila:** komposisi tanpa ruang kosong (teks menutup wajah tokoh).
- **Remix (anti-jiplak):**
  1. Cerita pendiri UMKM → pertahankan teks di kolom ≤ 40 % samping tokoh · ganti lukisan dengan foto lama toko.
  2. Latar terang → pertahankan kolom teks di ruang kosong · ganti vignette dengan sudut abu muda.
- *Pengamatan di video asli, bukan target:* pasangan lukisan 81×59 %; tokoh k2 f037 76×68 %; kolom teks 37–40 % lebar, pusat (72–74, 29–35) %.

### T4 · Line Threading Through Keywords · layout
- **Trigger:** rangkaian kata kunci yang saling terhubung ("calling, agility, courage"); kata yang diulang menaik; progres fase.
- **Yang terlihat (termasuk gerak):** satu garis biru tebal (±7 % lebar, 27 px = 6,8 % panel) datang dari bawah menuju teks, terputus oleh teks lalu lanjut ke teks berikutnya, berhenti tepat di bawah kata kunci ("agility" 9,8 % tinggi); kamera mengikuti ujung garis; di latar gelap garis putih 2 px + bola biru Ø 1,7–2,6 % sebagai ujung kurva tangga, kamera mengikuti bola ("up and up", satu anak tangga per kata, 0:10–0:12). Callout lengkung tipis ke kata. Garis + ilustrasi: horizontal dengan titik putih penanda objek, atau zigzag dengan kamera pan. (k3, k4; 18:48,5 dan 18:00,5)
- **Kenapa bekerja:** garis memandu mata dari kata ke kata; kamera yang mengikuti ujung garis memberi rasa progres.
- **Mekanik Remotion (titik awal):**
  - Lapisan: kertas bertekstur (atau hitam rata + grid garis putih tipis bercahaya) → garis (SVG path) → teks → bola.
  - Gerak: `strokeDashoffset` mengikuti kata VO `CURVE.reveal` 8–10 f per segmen; kamera virtual ikut `getPointAtLength` ujung garis `CURVE.drift`; teks memotong garis (mask) saat lewat.
  - Ruang: datar.
  - Blur & blend: bola `box-shadow` biru lembut; garis tanpa blur.
- **SFX:** famili `glitch` · bunyi highlighter untuk grafik (kiblat; tidak ada di SFXIrfan, jenis bunyi: sapuan/highlighter); `Scanning dan gerak kurva.mp3` untuk garis/kurva bergerak; senyap per kata.
- **Pakai bila:** 3–5 kata kunci berurutan atau kata yang diulang ≥ 3 kali. · **Jangan pakai bila:** hanya dua kata (garis jadi hiasan).
- **Remix (anti-jiplak):**
  1. Langkah onboarding SaaS → pertahankan garis yang melewati tiap kata kunci · ganti biru dengan satu warna merek dan teks ke label langkah.
  2. Latar gelap → pertahankan garis putih 2 px + bola · ganti bola biru dengan titik berwarna merek.
- *Pengamatan di video asli, bukan target:* garis biru stroke 27 px = 6,8 % lebar panel; kurva tangga 45×37 %, bola Ø 2,6 % tinggi (4,5 % lebar); "careers." 3,1 % (tinggi-x, ≈4,2 % setara cap).

### T5 · Bottom-Half Bleed Illustration · layout
- **Trigger:** ide utama yang bisa menjadi satu gambar ("spiral setiap 7–12 tahun", "secure dan low stress"); lelucon dengan lingkaran pilihan.
- **Yang terlihat (termasuk gerak):** satu figur biru kasar bertekstur cat 62×61 % panel duduk di separuh bawah (pusat (45, 68) %), tepi "berdarah" ke tengah; halo biru muda buram di belakang kepala; teks mengelilingi kepala figur (judul di sepertiga atas "Because it was", "secure" 3,7 % (tinggi-x), kata kedua buram saat masuk); spiral 36×61 % di tengah dengan "7 to 12" 6,25 % atas dan bawah. Ilustrasi samping: potret 57 % tinggi + cincin orbit ±50 % lebar dengan tiga label pilihan mengelilingi (k6). (k5, k6; 18:18,5, 18:42)
- **Kenapa bekerja:** satu subjek besar di separuh bawah dengan sepertiga atas kosong untuk teks; teks menempel dekat subjek, tidak jauh di atasnya.
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): kertas halftone → halo biru buram (`blur(20px)`) → figur bertekstur cat → kata (satu buram, satu tajam).
  - Gerak: figur `translateY` 40 px→0 + `opacity` 8 f `CURVE.land`; kata kedua `blur(8px)→0` 6 f `CURVE.reveal`; cincin orbit `rotate` lambat `CURVE.drift`; label masuk berurutan 4 f.
  - Ruang: tiga lapis dengan parallax 3 %.
  - Blur & blend: tekstur cat `multiply`, tempel ke layer figur (bergerak bersamanya).
- **SFX:** famili `ui` · senyap atau `Kinetictypography(gunakansecaraacak).mp3` sesekali; kata senyap.
- **Pakai bila:** ide yang bisa dibuat ilustrasi satu subjek. · **Jangan pakai bila:** banyak objek kecil yang harus tampil bersamaan.
- **Remix (anti-jiplak):**
  1. Penjelasan strategi bisnis → pertahankan satu figur besar di separuh bawah · ganti figur biru dengan siluet pelaku usaha satu warna merek.
  2. Latar terang 16:9 → pertahankan teks menempel subjek · figur di sepertiga kanan, teks kiri.
- *Pengamatan di video asli, bukan target:* figur 62×61 %, spiral 36×61 %, "spirals" 5,7 %, "7 to 12" 6,25 %, kata sambung 1,6 % ("Because it was" 2,6 %); catatan pakai 12 Nov: teks dekat subjek, "for every" tidak terlalu kecil, angka dekat subjek dan tidak mepet tepi.

### T6 · Paper Texture Locked to Layer · texture
- **Trigger:** menjaga semua adegan satu keluarga; adegan teks penutup atau kutipan.
- **Yang terlihat (termasuk gerak):** tekstur sama di semua adegan dan menempel ke layernya; kertas halftone dengan sudut ±7 % lebih gelap; adegan biru penuh dengan vignette radial kuat (tengah L 60 vs sudut 25, `#233993` → `#0C1644`); adegan teks penutup dengan tanda kutip, kalimat di tengah ("entrepreneurial" 4,8 %, serif italic "life" 7,7 % buram, blok 82 % lebar). Objek + teks: foto 31×60 % di tengah, teks mengapit (kalimat atas, kata kunci "PhD" biru 8,1 % bawah); dua foto 34×41 dan 26×56 % bertumpuk silang. (k7, k8)
- **Kenapa bekerja:** tekstur yang sama dan ikut bergerak dengan layer membuat adegan berbeda terasa dari satu dunia; vignette kuat hanya di adegan biru.
- **Mekanik Remotion (titik awal):**
  - Lapisan: warna dasar → tekstur kertas/cat (PNG tile, `mixBlendMode: "multiply"`) di dalam grup yang sama dengan layer, bukan di atas komposisi → objek → teks.
  - Gerak: tekstur ikut transform layer; tidak ada gerak tersendiri; foto bertepi lurus sedikit miring (±2°) `rotate` 6 f `CURVE.land`; kutipan masuk dengan motion blur, 3 baris maks, tanda kutip tidak diberi baris sendiri.
  - Ruang: datar.
  - Blur & blend: vignette radial di adegan biru (luma sudut ±40 % dari tengah) dengan lapis terluar jatuh di luar frame (catatan pakai 12 Nov).
- **SFX:** famili `taktil` · senyap atau `documenter.mp3` untuk foto mendarat.
- **Pakai bila:** banyak jenis adegan perlu terasa satu keluarga. · **Jangan pakai bila:** tekstur dibiarkan menempel di komposisi (tidak ikut bergerak dengan lukisan; revisi Joseph #3).
- **Remix (anti-jiplak):**
  1. Seri edukasi UMKM → pertahankan tekstur menempel layer dan satu adegan biru penutup · ganti kertas halftone dengan kain atau karton, biru dengan warna merek gelap.
  2. Latar terang → pertahankan sudut sedikit lebih gelap · ganti hitam arang dengan abu tua.
- *Pengamatan di video asli, bukan target:* kertas k7 tengah L 245 vs sudut 242 (hampir tanpa vignette); biru k8 tengah L 60 vs sudut 25; kertas k3 halftone std 6,2.

## Audio (bila dibedah)
- earshot: 20 klik/UI, 4 riser, 2 whoosh (sisanya tak berlabel). Klaim Joseph: 74 SFX (±78/menit) belum dicek; kosakata klaim: klik untuk teks, highlighter untuk grafik, whoosh untuk transisi.
- Musik: string quartet/orkestra pizzicato, E mayor, ±108 bpm (librosa, stem demucs), tanpa drum; tanpa grid beat di mix (pulse clarity 0,05); duduk jauh di bawah suara. Mix −20,2 LUFS, true peak −3,2 dBTP, LRA 2,0 LU.

## Yang harus terasa sama saat disandingkan
- Tiap adegan terasa dipilih dari peran kalimatnya (umumkan → wajah, jelaskan → tunjukkan)?
- Kata kunci jauh lebih besar dari kata sambung (≥ 3×), kata sambung satu ukuran saja?
- Hanya satu aksen biru; sisanya hitam/arang dan putih kertas, lukisan dan wajah membawa warnanya sendiri?
- Tekstur kertas/cat terlihat dan menempel ke layernya di setiap adegan grafis?
- Satu subjek besar per adegan ilustrasi/objek dengan teks di ruang yang tersisa, dekat subjeknya?

## Catatan pakai
- 11 Nov, Builder Trap: template turunan kartu ini (minimal-premium) dipakai; hasil dinilai Irfan belum menggambarkan ucapan dan terlalu banyak gradien biru. Lihat `../contoh-gagal/`.
- 12 Nov, uji rekonstruksi (Irfan): radial biru terlalu kecil sehingga lapisan gelap luarnya terlihat. Radial harus mayoritas frame dan lapisan terluarnya jatuh di luar frame.
- 12 Nov (Irfan): jarak baris kutipan rapat (kira-kira −1 px dari ukuran huruf), kutipan maksimal 3 baris, masuk dengan motion blur. Tanda kutip tidak diberi baris sendiri; frasa pendek digabung satu baris ("not just" di kiri, "money" di sebelahnya).
- 12 Nov (Irfan): adegan ilustrasi sudah cukup bagus; yang salah jarak. Teks menempel dekat subjek, tidak jauh di atasnya; kata sambung ("for every") tidak terlalu kecil; angka ("7–12 years") dekat subjek dan tidak mepet tepi frame.
