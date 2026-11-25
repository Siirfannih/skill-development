---
id: "37"
pola: Guide-Side Perspective Text
kategori: typography
kategori_lain: [layout, camera]
trigger: tutorial dua menit yang dipandu satu tokoh (hook "kenapa ini salah"); kalimat yang dipecah jadi kata sambung kecil + satu kata kunci besar; CTA "komentar KATA untuk dapat"
sumber: IG "skill-file promotion" (Deiz38JJvmv; tokoh pixel di set voxel) · 16:9 (1280×720) · 120,0 dtk
dilihat_bergerak: tidak
diukur: ya
alias: []
---
# 37 · Guide-Side Perspective Text

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: https://www.instagram.com/p/Deiz38JJvmv/ (file Irfan "IG Deiz38JJvmv") · 16:9 (1280×720, 30 fps), 120,0 dtk, ber-VO · Frame: `../../guide/referensi/sheets/37-pixel-character-skill-file.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/37-k1-foto-meja-teks.jpg`, `37-k2-latar-merah-kata-besar.jpg`, `37-k3-closeup-pixel-nama.jpg`, `37-k4-meja-voxel-skillfile.jpg`, `37-k5-transisi-mozaik.jpg`, `37-k6-grid-teal-hitam.jpg`, `37-k7-panggung-ikon-alur.jpg`, `37-k8-cta-komentar.jpg` · Periksa: `../../guide/referensi/ukuran/37-pixel-character-skill-file-periksa.md` (LAYAK, 6/6)
> Video sumber: `/home/irfan/work/canvas-skill-library-20261102/data/online-20261102/data/instagram/994a0e1fceb584653ec6/video.mp4` (dipastikan 21 Nov 2026: manifest unduhan mencatat URL Deiz38JJvmv → berkas ini; 7 dari 8 frame kunci cocok dengan frame video, mis. k3 di 18,5 dtk RMSE 3,4, k8 di 112,3 dtk RMSE 4,0; k5 mozaik bergerak cepat)
> Dilihat bergerak: **tidak** (bedah dari frame diam dan pengukuran piksel/ORB; bedah geraknya sebelum dipakai).

**Inti mekanik (1 kalimat):** Tiap kalimat VO dipecah menjadi 1–4 kata tebal (kata sambung kecil di atas, kata kunci besar di bawah) yang berdiri di bidang 3D mengikuti perspektif kamera di sisi kosong lawan tokoh pemandu, sementara kamera hampir selalu mendorong masuk dan tiap gerak punya bunyi.
**Narrative trigger:**
- Hook yang membalik anggapan ("pertanyaan yang salah") dengan kata vonis raksasa → T1
- Memperkenalkan satu nama atau istilah di samping tokoh ("namanya MIFTAHUL") → T2
- Kalimat pecah "kata sambung kecil + kata kunci besar" di meja/layar → T3
- Berpindah topik: mozaik atau zoom-through menggantikan cut biasa → T4
- CTA akhir: "Comment / SKILL" dengan tokoh di kiri → T5
**Jangan dipakai untuk:** rekaman fitur asli yang harus terbaca lama, konten tenang/editorial.
**Kata kunci gaya:** pixel-voxel, padat, merah-hitam, playful, sinematik gelap, tokoh berulang
**Diambil untuk:** "IG Deiz38JJvmv": nama tidak menyebut bagian; bagian terkuat: teks 3D yang ikut kamera di samping tokoh pixel, dan set voxel bertingkat kedalaman.

## Kondisi footage asli
- 16:9. Hampir tanpa footage nyata: set voxel 3D dengan tokoh sprite pixel 2D (detektif bertopi + robot oranye berpita) di dunia 3D, dilihat dari atas, depan, dan tiga perempat. Pembuka satu-satunya adegan terang (foto meja di padang rumput, langit `#0E74A4`).
- Tokoh: close-up kepala ±76 % tinggi; detektif di panggung 53–62 % tinggi; robot 20–35 %.
- Vignette kuat di adegan gelap (luma tengah:sudut 84:17 di latar merah, 43:18 di CTA).
- Kamera push-in hampir terus: +2…+4 %/dtk saat tenang, hentakan +11…+30 %/dtk pada kata kunci; pull hanya untuk reveal (−28 % di 32 dtk, −48 % di 98 dtk); CTA terkunci.
- Ruang kosong teks: sisi lawan tokoh (tokoh kiri → teks x 60–75 %).

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Hook 3–7 dtk oranye `#B5400F`–`#BE450F`, lalu dasar merah-hitam: hitam `#010101`–`#030200`, dinding merah tua `#5E0205`, karpet bulat `#8C0306`, latar merah penuh `#AF071B` → `#520005` di sudut (diukur tengah `#AA000C`). Teks putih, merah `#ED2F3D`, krem `#FDE3CC`; aksen sekunder teal/mint `#78FCD1` (angka pixel, kotak PROMPT, CTA), oranye robot, kuning lampu. Kubus voxel, sprite 2D di dunia 3D, bloom pada layar/lampu, glitch RGB-split pada kata tertentu, mozaik kotak merah/putih/hitam untuk transisi.
### Teks
Tiga keluarga: sans geometris sangat tebal bulat (mirip Gilroy ExtraBold/Clash Display) untuk narasi; condensed tebal (mirip Bebas Neue/Anton, kadang italic) untuk vonis; font pixel/dot-matrix teal atau oranye untuk angka; label kecil monospace. 1–4 kata per tampil; kata sambung kecil di atas, kata kunci besar di bawahnya; kata kunci 11–27 % tinggi, kata sambung 4,7–7,6 % (rasio 1,6–2,5×). Penekanan: warna (merah atau hijau) + ganti font ke condensed; kata dicoret, glitch RGB satu kata, kata ditulis ulang setengah jalan. Masuk sigap: ketik per huruf dengan kursor, per kata satu-satu, atau kata miring di bidang 3D mengikuti perspektif kamera; keluar dengan glitch/terurai atau terbawa push kamera.
### Ritme
37 cut = 18,5/menit, shot median 2,1 dtk; event visual 45/menit. Babak cepat 0–43 dtk 32 cut/menit; panggung 43–105 dtk 11 cut/menit (kamera bergerak di dalam satu set 3D); penutup 111–120 dtk diam di CTA. Jeda bunyi 0,3 dtk berulang di babak cepat; hening total 0,5–1 dtk sebelum dua bagian penting (89 dtk, 109 dtk); musik berhenti di 42,6 dtk = pindah dari hook ke penjelasan.

## Pola

### T1 · Frame-Bracketing Hero Word · typography
- **Trigger:** hook pembuka yang membalik anggapan; objek utama (monitor) dibingkai kata.
- **Yang terlihat (termasuk gerak):** foto meja di padang rumput dengan monitor berisi profil; kata "This" (kiri atas), "video" (kanan atas) dan "went" (kiri tengah) putih 13,5–13,8 % mengapit monitor, "VIRAL" 24,7 % tinggi merah-pink miring 3D melintang di bawah monitor dengan lapisan huruf solid dan lapisan outline merah yang bergeser dan saling bertumpuk di depan layar; kursor di layar. Latar merah dengan vonis "WRONG" 27,1 % (diukur 27,96 %) di kanan atas (x 67,9 %), kata dicoret kiri bawah, tokoh kecil ±25 %. (k1, k2; 1,5 dan 7,5 dtk)
- **Kenapa bekerja:** kata mengelilingi objek sehingga monitor menjadi bagian kalimat; di latar merah rata, kata raksasa menggantikan gambar.
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): foto → monitor → kata atas-kiri/kanan → "VIRAL" (dua lapis: solid + outline `-webkit-text-stroke`, offset 6–10 px) → kursor.
  - Gerak: tiap kata `translateZ(−300px)` → 0 + `rotateX(−20deg)`→0 `CURVE.land` 10 f, jeda `react(i, fps)`; "VIRAL" miring `rotateX(55deg) rotateZ(−4deg)`; vonis di latar merah masuk scale 1,15→1 `CURVE.land` 8 f.
  - Ruang: `perspective: 900px` pada kelompok teks.
  - Blur & blend: motion blur 200°/16 sampel; glitch RGB-split dengan tiga salinan teks `mixBlendMode: "screen"` offset ±4 px selama 3 f.
- **SFX:** famili `riser`, `impact` · satu hit pembuka di frame 0 (pengamatan: sub bass drop di vonis); kata per kata senyap; riser menuju vonis bila diperlukan (`ES_Designed, Riser, Transition, Fast, Short, Clean 01`).
- **Pakai bila:** ada satu objek di tengah dengan ruang kiri-kanan-bawah. · **Jangan pakai bila:** objek memenuhi frame.
- **Remix (anti-jiplak):**
  1. Toko sepatu → pertahankan kata mengapit objek + kata vonis miring · ganti monitor dengan kotak sepatu.
  2. Latar terang → pertahankan kata mengapit · ganti putih dengan arang dan merah dengan biru tua.
  3. 9:16 → pertahankan bingkai kata · ganti mengapit kiri-kanan dengan mengapit atas-bawah.
- *Pengamatan di video asli, bukan target:* "VIRAL" 24,7 %; kata sambung 13,5–13,8 %; monitor ±35 % lebar.

### T2 · Name Callout Beside Close-Up · typography
- **Trigger:** memperkenalkan satu nama atau istilah dengan tokoh sebagai wajah.
- **Yang terlihat (termasuk gerak):** close-up wajah pixel di kiri (kepala ±76 % tinggi) dengan "His name's" 6,0 % di atas dan "MIFTAHUL" 11,5 % di bawahnya, kanan tengah (x 62–73 %), rasio 1,92×; latar hitam dengan garis merah-teal. Label callout tipis (garis + titik oranye + nama monospace) menunjuk tokoh. (k3; 18,5 dtk)
- **Kenapa bekerja:** tokoh di satu sisi dan teks di sisi lawan tidak pernah menimpa wajah; label callout menambah identitas tanpa menambah ukuran huruf.
- **Mekanik Remotion (titik awal):**
  - Lapisan: latar hitam + garis → tokoh → teks → label callout.
  - Gerak: kata sambung muncul ketik per huruf dengan kursor 1 f per huruf; kata kunci `scale 1,1→1` `CURVE.land` 8 f; garis callout `stroke-dashoffset` 8 f, titik oranye scale 0→1 `CURVE.reveal` 4 f.
  - Ruang: datar; teks sedikit `rotateY(−8deg)` untuk menempel di bidang 3D.
  - Blur & blend: tanpa blur.
- **SFX:** famili `mekanik` · `Keyboardtyping.mp3` dipotong untuk kata sambung bila diketik (−12…−16 dB); callout senyap.
- **Pakai bila:** ada tokoh/maskot di satu sisi dengan ruang di sisi lain. · **Jangan pakai bila:** wajah memenuhi frame tanpa ruang samping.
- **Remix (anti-jiplak):**
  1. Maskot brand UMKM → pertahankan teks di sisi lawan + callout tipis · ganti tokoh pixel dengan ilustrasi 2D datar.
  2. Latar terang → pertahankan callout garis-titik · ganti hitam dengan krem dan callout arang.
  3. Foto kreator 16:9 → pertahankan nama di sisi lawan wajah · ganti font condensed dengan serif.
- *Pengamatan di video asli, bukan target:* "MIFTAHUL" 71 px vs "His name's" 37 px = 1,92× (diukur ulang); kepala ±76 % tinggi.

### T3 · Left-Flank Text Beside Voxel Screen · typography
- **Trigger:** kalimat pecah dengan kata sambung kecil + kata kunci besar saat objek (layar) di kanan.
- **Yang terlihat (termasuk gerak):** meja voxel + monitor ±65 % lebar di kanan; "as a" 4,7 % di atas "skill file." 11,8 % (diukur 12,17 %), rata kiri x 17–20 %, "file." berwarna krem-oranye; layar menampilkan editor SKILL.md dengan daftar yang berbunyi "Text moves in 3D, never flat" dan "A sound for every motion". 3 lapis: rak buram di belakang, meja tajam, lampu/tanaman depan buram. (k4; 21,5 dtk)
- **Kenapa bekerja:** teks di sisi kosong lawan objek; ketajaman bawah 26 vs tengah 661 (Laplacian) memberi fokus pada monitor dan teks sekaligus.
- **Mekanik Remotion (titik awal):**
  - Lapisan: set voxel buram → monitor tajam → lampu/tanaman depan buram → teks.
  - Gerak: push kamera 1,00→1,06 `CURVE.heavy` 30 f dengan teks ikut (transform yang sama), parallax teks 1,1×; kata sambung masuk dulu, kata kunci +4 f.
  - Ruang: `perspective: 900px`, teks `rotateY(10deg)` mengikuti arah kamera.
  - Blur & blend: lapis depan `blur(6px)`; vignette radial.
- **SFX:** famili `mekanik`, `ui` · satu `pop up.mp3` per kata kunci besar (bukan per kata); ketik di layar `Keyboardtyping.mp3` bila ada ketikan terlihat.
- **Pakai bila:** ada objek besar di satu sisi dan ruang di sisi lain. · **Jangan pakai bila:** objek di tengah tanpa ruang samping.
- **Remix (anti-jiplak):**
  1. Video tutorial coding → pertahankan teks 3D di sisi kosong + push kamera · ganti set voxel dengan ruang kerja foto nyata berkedalaman.
  2. Latar terang → pertahankan 3 lapis fokus · ganti merah-hitam dengan krem dan kayu.
  3. 9:16 → pertahankan teks di sisi · ganti sisi kiri dengan atas.
- *Pengamatan di video asli, bukan target:* "skill file." 74 px = 12,17 % tinggi; push +2…+4 %/dtk saat tenang.

### T4 · Mosaic Wipe Topic Switch · camera
- **Trigger:** pindah topik, atau transisi dari hook ke penjelasan.
- **Yang terlihat (termasuk gerak):** mozaik kotak merah/putih/hitam (±6 % tinggi tiap kotak) memenuhi frame (±3 kali); zoom-through ke layar monitor (pembuka); glitch/kilat putih; whip pada ganti latar; musik berhenti di 42,6 dtk; sub bass drop di 42,9 dan 86,9 dtk (terkuat 94,7 dtk +48 dB). Pemicu: kata pergantian topik ("Here's the part", "So,", "Let's cook"). (k5; 52,3 dtk dan lainnya)
- **Kenapa bekerja:** transisi besar jatuh di kata pergantian topik; hening sebelum bagian penting menahan perhatian.
- **Mekanik Remotion (titik awal):**
  - Lapisan: adegan lama → grid kotak (`<div>` per kotak) → adegan baru.
  - Gerak: tiap kotak menutup dengan jeda acak berbiji (0–10 f), 6 f untuk menutup dan 6 f untuk membuka; tanpa easing linear antar kotak, per kotak `CURVE.whip`.
  - Ruang: datar.
  - Blur & blend: kilat putih `opacity` 0→0,8→0 selama 4 f; glitch RGB-split di ujung.
- **SFX:** famili `glitch`, `impact` · `ES_User Interface, Glitch, Glitch Databend 04` (transisi mosaik/glitch antarbabak); sub drop `ES_Designed, Bass Dive, Bass Drop, Deep Sub, 50Hz` hanya di pindah babak besar; hening 0,5–1 dtk sebelum dua bagian penting.
- **Pakai bila:** ada ≥ 3 perpindahan topik di video panjang. · **Jangan pakai bila:** video pendek tanpa bab.
- **Remix (anti-jiplak):**
  1. Video edukasi → pertahankan mozaik sebagai transisi bab · ganti kotak dengan kotak kertas kraft.
  2. Latar terang → pertahankan jeda acak berbiji · ganti merah/putih/hitam dengan pastel.
  3. 9:16 → pertahankan mosaic grid · ganti 16×9 dengan 9×16.
- *Pengamatan di video asli, bukan target:* kotak ±6 % tinggi; sekitar 3 kali dalam 120 dtk.

### T5 · Left-Guide CTA With Input Box · layout
- **Trigger:** ajakan akhir "komentar KATA untuk dapat".
- **Yang terlihat (termasuk gerak):** panggung CTA terkunci (kamera diam): detektif 62 % tinggi di kiri, "Comment" 6,7 % di atas "SKILL" 11,0 % hijau mint, kanan (x 56–62 %), kotak input di kanan; 3 lapis + vignette; sebelumnya panggung ikon alur dengan banyak objek kecil (tokoh ±25 %, ikon ±10 %, label ±4 % di bawah ikon diagonal) dan garis titik. (k7, k8; 74,5 dan 112,3 dtk)
- **Kenapa bekerja:** CTA yang diam menutup video tanpa gerak baru; kata kunci hijau mint satu-satunya warna terang.
- **Mekanik Remotion (titik awal):**
  - Lapisan: set buram → tokoh → teks → kotak input.
  - Gerak: kamera terkunci; kata "SKILL" diketik per huruf di kotak input 2 f per huruf, kursor berkedip 15 f.
  - Ruang: datar dengan vignette.
  - Blur & blend: vignette radial; latar buram `blur(10px)`.
- **SFX:** famili `mekanik` · `Keyboardtyping.mp3` satu kali di kotak input; musik berhenti hening 1 dtk sebelum CTA (pengamatan: hening di 109 dtk).
- **Pakai bila:** ada kata kunci CTA pendek. · **Jangan pakai bila:** CTA berupa URL panjang.
- **Remix (anti-jiplak):**
  1. Brand makanan → pertahankan tokoh di kiri + kotak input kanan · ganti tokoh pixel dengan maskot koki.
  2. Latar terang → pertahankan CTA diam · ganti merah dengan krem dan kata hijau dengan oranye.
  3. 9:16 → pertahankan tokoh + kotak · ganti kiri-kanan dengan atas-bawah.
- *Pengamatan di video asli, bukan target:* "SKILL" 11,0 %; detektif 62 % tinggi; penutup 111–120 dtk.

## Audio (bila dibedah)
earshot: 752 event (6,3/dtk), 96 berlabel: 20 glockenspiel/pluck, 10 UI (chat pop, tap, rana kamera), 8 hit (sub bass drop), 8 foley (bubble/cork pop, balok kayu), 7 whoosh/swish, 3 ketikan keyboard, 2 langkah kayu, 1 riser (reverse cymbal 39,9 dtk). Pemakaian: glockenspiel/pop = kata atau ikon muncul; ketikan = teks diketik; whoosh = ganti adegan/whip; sub bass drop = vonis dan pindah babak (42,9; 86,9; terkuat 94,7 dtk +48 dB); langkah kayu = tokoh bergerak. 88 % cut punya onset dalam 100 ms (median 32 ms). SFX puncak −2 … −6 dBFS, setara suara; level terhadap suara tak terukur. Musik: hanya 0–42,6 dtk glitch hop + vocal chop (AST music 0,30–0,52), ±112 bpm, pulse clarity 0,03; 42,6–120 dtk musik praktis hilang. Mix −14,1 LUFS, true peak −0,4 dBTP, LRA 2,4 LU; 12 jeda 0,3 dtk dan hening total 89 dtk, 109 dtk.

## Yang harus terasa sama saat disandingkan
- Satu tokoh yang sama muncul di pembuka, tengah, dan penutup, dan di adegan tokoh ia mengisi 50–76 % tinggi frame?
- Kata kunci 11–27 % tinggi dengan kata sambung kecil di atasnya, 1–4 kata per still?
- Teks berada di sisi kosong lawan tokoh dan tidak menimpa wajah?
- Teks tampak di bidang 3D (miring/perspektif) atau terkena glitch, bukan datar statis di semua still?
- Set 3D punya 3 lapis (latar buram, tokoh tajam, lantai/meja depan buram) dan vignette jelas?
- Palet merah-hitam dengan satu aksen teal/mint dan satu kata merah di teks putih?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
