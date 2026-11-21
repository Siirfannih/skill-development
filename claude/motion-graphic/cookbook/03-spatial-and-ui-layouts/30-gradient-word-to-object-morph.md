---
id: "30"
pola: Gradient Word-to-Object Morph
kategori: layout
kategori_lain: [typography, camera]
trigger: iklan atau penjelasan produk digital dengan banyak fitur; kata yang berubah menjadi objek yang dibicarakan; daftar fitur bergulir di samping kartu UI
sumber: iklan agen pemasaran AI (file kiriman Irfan "Apple Styele.mp4"; IG p/Deq1nUPMqtr) · 16:9 · 44,7 dtk
dilihat_bergerak: tidak
diukur: ya
alias: []
---
# 30 · Gradient Word-to-Object Morph

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: `Apple Styele.mp4` (folder asal: Motion; Instagram p/Deq1nUPMqtr; iklan produk "Holo") · 16:9 (1276×718), 30 fps, 44,7 dtk · analisis asal: canvas-skill-library LOC-e42107cea92d; data ukur 11 Nov: `ukuran.md`; audit lama `GrokAgent/reference-videos/AUDIT-2NOV-A-apple-motion.md` · Frame: `../../guide/referensi/sheets/30-apple-style-gradient-marketing.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/30-k1-hero-gradien.jpg` … `30-k8-angka-bar.jpg` (k2 kalimat + kolase, k3 hero UI di gradien, k4 maskot, k5 daftar + kartu UI, k6 Autopilot + kolase, k7 footage di monitor)
> Video sumber: `/home/irfan/work/canvas-skill-library-20261102/data/local-videoanalys-20261102/Motion/Apple Styele.mp4`
> Dilihat bergerak: **tidak** (bedah dari frame diam dan pengukuran, ORB; bedah geraknya sebelum meminjam teknik). Batas: 1 px = 0,14 %; nama font tidak pasti.

**Inti mekanik (1 kalimat):** Layar putih bersih, satu kalimat hitam di tengah, diselingi kata raksasa dan objek yang dibalut gradien pink-oranye-ungu buram; kata berubah jadi objek yang dibicarakan, tiap gerak cepat lalu diam total, dan adegan berganti lewat morph yang punya alasan.
**Narrative trigger:**
- Kata yang disebut berubah menjadi objek yang dibicarakan ("Now" → bola, "Meet" → logo) → T1
- Satu klaim di tengah dikelilingi bukti (banyak contoh hasil) → T2
- Daftar fungsi yang bergulir di samping kartu UI → T3
- Menunjukkan footage atau UI sebagai bukti → T4
- Angka hasil sebagai penutup → T5
**Jangan dipakai untuk:** talking head, tutorial satu fungsi yang butuh kedalaman, konten tanpa produk atau UI untuk diperlihatkan.
**Kata kunci gaya:** putih, gradien pink-oranye-ungu, premium, bersih, morph, cepat-lalu-diam
**Diambil untuk:** **tampilan visual dan gerak UI** ("Apple Style": bagian 1, 2, 5, 6 dibedah paling dalam). Bagian terkuat: warna + gerak UI.

## Kondisi footage asli
16:9, latar putih murni, footage hanya 2 shot (±5 dtk, 11 %: render meja + monitor dan foto HP di meja) di dalam kartu sudut bulat (inset ±3 % kiri-kanan, ±5 % atas-bawah). Kolase iklan sampel dan UI asli (Instagram, email, Google) sebagai kartu contoh. Satu subjek besar per shot. Tanpa grain dan vignette.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Latar `#FFFFFF`. Gradien selalu buram (tanpa tepi keras), mengisi huruf hero, bola, pill, bar chart: oranye-merah `#F16046` 24 %, magenta `#E6469B` 22 %, ungu-pink `#CC56C2` 18 %, merah-pink `#EF4C6C` 17 %, ungu `#A66ADB` 14 %, biru `#7794F0` 6 % (biru di tepi). Teks hitam `#000000`; abu nonaktif `#CECCCF`; putih hanya di atas gradien.
### Teks
Grotesk geometris rapat (mirip Satoshi/General Sans; perkiraan), Medium untuk kalimat, Black untuk angka. Kalimat satu baris, satu ukuran, pusat y 49–51 %, x 50 %, kapital 7,9–10 % tinggi frame. Hero satu kata 49–52 % (lebar sampai 87 %). Angka 31,7 %. Tidak ada pembeda kata kunci (rasio 1,0). Penekanan: kata hero sendirian, hitam vs abu di daftar, ikon atau maskot disisipkan antar kata. Masuk: per kata dari kiri (lebar 13→40→58→78 % dalam 0,9 dtk), hero tumbuh dari baseline (59→87 % dalam 0,67 dtk), typing.
### Ritme
24 shot dalam 44,7 dtk = 32 shot/menit, median 1,7 dtk; 11 cut keras. Cepat 0–15,3 dtk (1,4 dtk/shot), lalu 2,3 dtk. Setiap build berakhir diam total ("holo" 11,0–12,2; "Chief Marketing Officer" 38,8–39,5: beda antarframe 0,0).

## Pola

### T1 · Word-to-Object Gradient Morph · layout
- **Trigger:** kata yang disebut berubah menjadi objek yang dibicarakan.
- **Yang terlihat (termasuk gerak):** "o" di "Now" menjadi bola gradien; "Meet" menjadi logo (0,4 dtk); "You" menjadi pill; pill gradien menjadi kolom alamat; toggle menjadi "Autopilot". Hero berisi gradien buram 49–52 % tinggi, lebar 74–87 %, pusat x 56–59 %. Setelah morph, gerak meluruh ke 0 lalu diam. (k1, k4; 4,9–12,2 dtk)
- **Kenapa bekerja:** grafik selalu menggambarkan kata yang diucapkan; putih bersih membuat gradien menjadi satu-satunya warna.
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): putih → blob gradien buram (SVG `feGaussianBlur` atau `filter: blur(40px)`) → huruf hero (`background-clip: text` dengan gradien yang sama) → objek tajam.
  - Gerak: hero tumbuh dari baseline `scaleY` 0 → 1 `CURVE.reveal` ±20 f; morph huruf → bola `borderRadius`/`scale` `CURVE.whip` ±12 f; semua gerak meluruh ke diam di frame akhir (tanpa overshoot).
  - Ruang: datar.
  - Blur & blend: sisi huruf `blur(2px → 0)` ±8 f (periksa dan catatan 12 Nov: "now" polos karena tidak ada blur di pinggir huruf); `mixBlendMode: "multiply"` untuk gradien di atas putih.
- **SFX:** famili `air`, `impact`, `riser`, `mekanik`, `ui` · riser 4,74 dtk menuju cut 4,90; whoosh 8,23 dtk di morph "Now" → bola; sub-drop di cut besar. Padanan: `ES_Designed, Riser, Transition, Fast, Short, Clean 01`, `Woosh.mp3`, `ES_Designed, Bass Dive, Bass Drop, Deep Sub, 50Hz`; pop/klik per kata di referensi tidak ditiru (kata senyap).
- **Pakai bila:** kata punya objek jelas. · **Jangan pakai bila:** kata abstrak tanpa objek.
- **Remix (anti-jiplak):**
  1. Aplikasi pesan antar → "Pesan" jadi bubble hijau, tanpa gradien pink; palet brand.
  2. Latar gelap → gradien menyala di hitam, hero putih; tetap buram, tanpa tepi keras.
  3. 9:16 → hero dipecah dua baris, bola di baris bawah.
- *Pengamatan di video asli, bukan target:* morph "You" → pill dan "o" → bola; hero lebar 59 → 87 % dalam 0,67 dtk.

### T2 · Sentence Ringed by Proof Cards · layout
- **Trigger:** satu klaim di tengah yang dibuktikan oleh banyak contoh hasil.
- **Yang terlihat (termasuk gerak):** "Autopilot" + toggle hijau di tengah (kapital 9,3 %, y 50 %) dikelilingi kolase 8–14 kartu iklan sampel (termasuk kartu yang terpotong keempat tepi frame, saling menimpa); "Worth knowing about" dengan kolase sama; kamera pull ×0,89 (Autopilot), ×0,85 (grid produk), ×0,83 dalam 0,5 dtk + pan 4 % (sebaran bebas). Whip pan kolase 32,5–33,3 dtk (0,8 dtk, puncak di tengah). (k2, k6)
- **Kenapa bekerja:** satu kalimat tetap terbaca karena kartu mengelilinginya; jumlah kartu menyampaikan "banyak".
- **Mekanik Remotion (titik awal):**
  - Lapisan: putih → kartu (sudut bulat, bayangan tipis) → kalimat.
  - Gerak: kartu masuk dari tepi dengan `react(i, 30)` jeda tidak rata, `CURVE.land` ±10 f; kamera pull 1,00 → 0,85 `CURVE.heavy` ±15 f.
  - Ruang: datar.
  - Blur & blend: bayangan lembut; kartu terpotong tepi (jangan di-padding).
- **SFX:** famili `impact`, `ui` · pop pada kartu penting saja, bukan semua kartu; hit pada pull. Padanan `pop up.mp3`, `Move.mp3`.
- **Pakai bila:** ada ≥ 8 contoh hasil nyata. · **Jangan pakai bila:** contoh sedikit (terlihat kosong).
- **Remix (anti-jiplak):**
  1. Fotografer → kartu = foto klien, kalimat "Dipakai 200+ brand".
  2. Latar abu gelap → kartu tanpa bayangan, garis tepi tipis.
  3. 9:16 → kartu mengelilingi di atas dan bawah, kalimat dua baris.
- *Pengamatan di video asli, bukan target:* periksa: lebar kartu k2 **±15,4 % lebar frame** (kartu lama 6–12 %: dikoreksi); k6 kartu menimpa dan terpotong keempat tepi.

### T3 · Rolling List Beside UI Card · layout
- **Trigger:** daftar fungsi bergulir di samping kartu UI.
- **Yang terlihat (termasuk gerak):** item aktif hitam (11,9–12,4 % tinggi), lainnya abu `#CECCCF` dengan ukuran sama, kolom kiri x 11–40 %, y 20–81 %; kartu UI di kanan (x 51–97 %, y 6–90 %, ±46 % lebar) dengan tepi bergradien glow; tilt naik 22,7 % per pergantian item. Item berganti tiap ±1,2 dtk (shot terpanjang 6,1 dtk). Foto produk berupa close-up botol miring pada panel ungu, terpotong batas panel (periksa). (k5)
- **Kenapa bekerja:** warna aktif vs abu membawa fokus; kartu di kanan memberi bukti per fungsi.
- **Mekanik Remotion (titik awal):**
  - Lapisan: putih → kolom item → kartu UI + glow.
  - Gerak: kolom `translateY` −22,7 % per item `CURVE.land` ±12 f; warna item `interpolateColors` hitam ↔ abu 6 f; kartu ganti isi lewat crossfade.
  - Ruang: datar. Blur & blend: glow tepi kartu `box-shadow` gradien.
- **SFX:** famili `ui`, `mekanik` · pop/klik per item di referensi; di video kita pasangkan satu bunyi per item (objek), bukan per kata. Padanan `ES_User Interface, Click, Pops, Glass, UI, Pops`.
- **Pakai bila:** 4–6 fungsi. · **Jangan pakai bila:** fungsi panjang.
- **Remix (anti-jiplak):**
  1. Aplikasi keuangan → item = kategori, kartu = grafik.
  2. Latar gelap → item aktif putih, lainnya abu gelap.
  3. 9:16 → daftar di atas, kartu di bawah.
- *Pengamatan di video asli, bukan target:* item aktif 11,9–12,4 % tinggi.

### T4 · Rounded Card Footage Inset · layout
- **Trigger:** menunjukkan footage atau UI sebagai bukti.
- **Yang terlihat (termasuk gerak):** kartu footage 94 × 90 % di putih, sudut bulat, teks monitor 4,7 % di layar; foto HP di meja: pull ±×0,9 + tilt 14 % dengan gerak meluruh (beda/frame 9,1 → 1,2). Grade footage netral dingin (meja `#C5C5C8`). (k7)
- **Kenapa bekerja:** footage tidak pernah full-bleed, jadi tetap terasa sebagai bagian dari kanvas putih.
- **Mekanik Remotion (titik awal):**
  - Lapisan: putih → kartu (`overflow: hidden`, `borderRadius: 24px`) → footage → teks.
  - Gerak: kartu `scale` 0,92 → 1 `CURVE.land` ±14 f; footage pull 1,0 → 0,9 meluruh `CURVE.reveal`.
  - Ruang: datar. Blur & blend: bayangan lembut.
- **SFX:** famili `air` · `Woosh.mp3` bila ada gerak kamera; selain itu senyap.
- **Pakai bila:** footage pendek (±5 dtk). · **Jangan pakai bila:** footage panjang (kartu terlalu kecil).
- **Remix (anti-jiplak):**
  1. Demo aplikasi → rekaman layar dalam kartu bulat di krem.
  2. Latar gelap → kartu bergaris putih tipis.
  3. 9:16 → kartu vertikal 80 % tinggi.
- *Pengamatan di video asli, bukan target:* inset ±3 % kiri-kanan, ±5 % atas-bawah.

### T5 · Counter Over Gradient Bar · typography
- **Trigger:** angka hasil sebagai penutup.
- **Yang terlihat (termasuk gerak):** angka 31,7 % tinggi (lebar 74 %), Black, hitam pekat di depan bar chart gradien (100 % lebar, separuh bawah), digit berputar (counter roll). (k8)
- **Kenapa bekerja:** angka hitam di depan gradien tetap terbaca; bar memberi arti "naik".
- **Mekanik Remotion (titik awal):**
  - Lapisan: putih → bar gradien → angka.
  - Gerak: digit roll `translateY` per digit `CURVE.land` ±20 f, digit terakhir mendarat paling lambat; bar `scaleY` 0 → 1 `CURVE.reveal` ±24 f.
  - Ruang: datar. Blur & blend: `blur(4px → 0)` saat roll.
- **SFX:** famili `ui` · pop di digit terakhir; padanan `ES_User Interface, Click, Pops, Glass, UI, Pops`.
- **Pakai bila:** satu angka hasil. · **Jangan pakai bila:** banyak angka.
- **Remix (anti-jiplak):**
  1. Penjualan → "2×" Black di depan bar warna brand.
  2. Latar gelap → angka putih, bar terang.
  3. 9:16 → angka dua baris.
- *Pengamatan di video asli, bukan target:* bar 100 % lebar di separuh bawah.

## Audio (bila dibedah)
earshot (0–27 dtk): 16 hit/sub-drop, 12 UI pop/klik, 7 drum, 4 whoosh, 1 riser, 3 pluck/ding; ±4 onset/dtk. 11 dari 13 cut punya onset ≤ 120 ms. SFX +5…+40 dB di atas bed, tidak ditekan. Musik tech house → glitch hop → house + vocal chop, librosa 172 bpm (paruh 86); intro 0–10,4 tipis, bass/kick masuk di "Meet" 10,4 dtk. Mix −14,1 LUFS, TP −0,8 dBTP, LRA 5,2. Audit 2 Nov: musik −2,4 dB relatif VO.

## Yang harus terasa sama saat disandingkan
- Latar putih murni, warna hanya dari gradien buram tanpa tepi keras?
- Setiap build berakhir diam total, tanpa overshoot?
- Kata berubah menjadi objek yang dibicarakan, bukan sekadar muncul?
- Satu subjek besar per shot, kolase hanya mengelilingi satu kalimat?
- Footage dan UI selalu di kartu sudut bulat, bukan full-bleed?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat di video; baru diuji lewat rekonstruksi still.
- 12 Nov, uji rekonstruksi (Irfan): objek 3D masih three.js mentah, terlalu bertekstur dan kasar: perlu penghalusan (material halus, cahaya lembut). Kata "now" polos karena tidak ada blur di pinggir huruf.
