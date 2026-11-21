---
id: "66"
pola: Silhouette Flicker Cut
kategori: camera
kategori_lain: [sfx]
trigger: montase b-roll perjalanan tanpa narasi di atas beat; pergantian shot yang perlu terasa "dipotret"; teaser reel energik dengan subjek orang
sumber: tutorial Flash-Flicker-Cutout (rekaman layar CapCut, vlog Kaohsiung) · 9:16 (preview 1,43:1) · 17,3 dtk
dilihat_bergerak: tidak
diukur: ya
alias: []
---
# 66 · Silhouette Flicker Cut

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: file Irfan "tutorial Flash-Flicker-Cutout (threadsdownloader)", reference_id `LOC-08c5a6ff5ac1`; rekaman layar CapCut seluler berisi hasil edit vlog "A Random Walk in Kaohsiung" · 9:16 (720×1280, 30 fps), 17,3 dtk; panel preview hasil 720×502 di y 11–50 % · Frame: `../../guide/referensi/sheets/66-flash-flicker-cutout-tutorial.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/66-k1…k8-*.jpg` (k1 UI tutorial, k2 flash putih, k3 flicker siluet, k4 siluet transparan, k5 cutout lapis, k6 cutout transisi, k7 flash overexpose, k8 grade footage)
> Video sumber: `/home/irfan/work/canvas-skill-library-20261102/data/user-tutorials/LOC-08c5a6ff5ac1/reference.mp4`
> Dilihat bergerak: **tidak** (efek diukur per frame dari bedah lama; bedah geraknya sebelum dipakai). Batas: hasil edit hanya terlihat di panel preview kecil di dalam UI CapCut; audio = hasil edit (musik + SFX), tanpa narator.

**Inti mekanik (1 kalimat):** Tiap pergantian shot "dipotret": siluet putih subjek berkedip 2 frame nyala / 2 frame mati, kilat putih 1–3 frame tepat di cut, dan subjek shot berikutnya (cut-out) muncul lebih dulu di atas latar lama, masing-masing dikunci ke bunyi kamera dan ketukan musik.
**Narrative trigger:**
- Montase b-roll perjalanan atau lifestyle tanpa narasi, pergantian tiap ±1 dtk di atas beat → T1, T3
- Momen "foto diambil" atau subjek yang perlu ditonjolkan sebelum pindah tempat → T2
- Teaser reel atau intro produk berenergi tinggi → T1
**Jangan dipakai untuk:** talking head edukatif panjang, demo UI, konten tenang/premium, footage yang tidak punya subjek orang/benda yang bisa di-cut-out bersih.
**Kata kunci gaya:** snappy, fotografis, kilat, cut-out, vlog, energik
**Diambil untuk:** transisi/efek "Flash, Flicker, Cutout" + SFX pemicunya (nama file). Bagian terkuat: kosakata transisi berbasis siluet + sinkron SFX kamera. Tidak diambil: grade hangat-pudar, judul pembuka, UI CapCut (latar `#141115`, pil label, klip audio cyan, adjustment magenta).

## Kondisi footage asli
- Footage iPhone b-roll vlog (stasiun MRT, trotoar berpohon, skyline, taksi, senja, kedai teh, selfie berdua); dicrop ke ≈1,43:1 di dalam panel preview.
- 10 dari 14 shot diam (skala 1,00, geser < 1 %); pan pelan 2,8–3,6 %; handheld hanya di pembuka (push ±47 %, blur) dan tiga shot terakhir.
- Subjek tunggal (orang/pasangan) 57–74 % tinggi preview, 16–25 % lebar, terpisah jelas dari latar sehingga cut-out AI bersih. Langit putih susu, bayangan cokelat.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Grade hangat-pudar (adjustment "Green Orange"), rata-rata preview `#605956`–`#7c726d`, saturasi HSV 42–72. Putih efek bukan putih murni: siluet/kilat krem `#F6F0E3`–`#F4F2EC` (terukur ulang `#F4EFEB`), kilat penuh rata 240/255. Tanpa grain/vignette terukur.
### Teks
Hanya judul pembuka: "A RANDOM WALK" putih + "IN KAOHSIUNG" kuning `#D1AD4F`, sans condensed bold kapital, tepi kiri, ±4 % tinggi preview; "shot on iphone" kecil di kanan. Hilang di cut 1,40 dtk; masuk tidak terukur.
### Ritme
13 transisi dalam 17,3 dtk = 45/menit, shot median 1,0 dtk (0,63–1,6). Musik ±136 bpm (beat 0,44 dtk); transisi jatuh di beat (1,51→1,40; 2,39→2,40; 8,00; 12,70→12,73; 13,58→13,67; 14,70; 15,84→15,67).

## Pola

### T1 · Two-Frame Silhouette Flicker · camera
- **Trigger:** momen subjek orang "ditangkap" sebelum cut; pembuka energik.
- **Yang terlihat (termasuk gerak):** subjek di-cut-out lalu diisi putih krem penuh dan berkedip **2 f nyala / 2 f mati** (±7,5 Hz) 4–5 kali (3,53–4,13 dtk = 0,6 dtk); latar tetap tajam dan diam. Varian: dua siluet sekaligus (5,70–6,03), siluet diganti orang asli bertepi putih (7,83–7,93), siluet abu transparan ±60 % (8,73–8,80). Siluet transparan bergeser ke kiri terhadap orang asli yang tetap terlihat, sehingga terbaca dua posisi subjek bertumpuk (periksa). (k3, k4)
- **Kenapa bekerja:** siluet tepi tajam tanpa glow terbaca langsung sebagai "foto"; latar diam membuat kedipan jadi satu-satunya gerak.
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): footage → siluet (matte subjek dari `persepsi.py`/RVM, diisi `#F4EFEB`, `opacity` 0/1 per 2 f) → (bila varian) orang asli bertepi putih.
  - Gerak: `Math.floor(frame/2)%2` mengatur nyala; 4–5 kedipan; tanpa easing (kedip biner). Varian transparan: opasitas 0,6.
  - Ruang: datar. Blur & blend: tanpa blur, glow, atau bayangan; tepi siluet tajam.
- **SFX:** famili `mekanik` · rentetan tik tiap 0,04–0,08 dtk selama kedip (12 event): `Pergantianfoto.mp3` (rentetan klik; potong sepanjang kedip), bukan satu bunyi per kedip; `Cutcontrastransision.mp3` untuk klik tunggal.
- **Pakai bila:** subjek tunggal terpisah dari latar, matte bersih. · **Jangan pakai bila:** banyak orang tumpang tindih, matte kasar.
- **Remix (anti-jiplak):**
  1. Produk di atas meja (botol, sepatu) → pertahankan kedip 2/2 siluet · ganti isi siluet warna merek, bukan krem.
  2. Latar terang → pertahankan kedip · ganti siluet gelap `#1A1A1A`.
  3. Reel talking head kreator → pertahankan kedip sebagai penanda ganti topik · hanya 3 kedip, 1 siluet.
- *Pengamatan di video asli, bukan target:* siluet k3 16 × 57 % preview (terukur ulang 15,97 × 57,17 %); k4 siluet transparan tinggi ≈ 65,5 % preview (koreksi periksa; kartu lama 45 %), lebar ≈ 22,8 %.

### T2 · Frame-Locked Flash Cut · camera
- **Trigger:** cut yang perlu diberi aksen "klik kamera"; di beat musik.
- **Yang terlihat (termasuk gerak):** kilat putih penuh 1 f (8,00 dtk, rata 240) atau ramp 3 f overexpose → normal (2,40–2,47; 12,73–12,80), selalu tepat di titik cut. (k2, k7)
- **Kenapa bekerja:** kilat memotong ingatan visual; kepadatan cut 45/menit tetap terbaca karena tiap cut punya penanda yang sama.
- **Mekanik Remotion (titik awal):**
  - Lapisan: shot A → shot B → lapisan putih `#F4EFEB` di atas.
  - Gerak: opasitas 0→1 tepat di frame cut lalu 1→0 dalam 1–3 f (`CURVE.leave`); cut di beat (±0,44 dtk).
  - Blur & blend: bisa `filter: brightness(2.2)` pada shot B selama 3 f sebagai varian overexpose.
- **SFX:** famili `glitch`, `mekanik` · `Cut.mp3` atau `Cutcontrastransision.mp3` di frame kilat (shutter/camera shot); satu peran = satu bunyi.
- **Pakai bila:** shot tegas dan pendek. · **Jangan pakai bila:** konten tenang; kilat di setiap cut (tinggal pada cut kunci).
- **Remix (anti-jiplak):**
  1. Reel produk → pertahankan kilat 1 f di cut · ganti warna kilat jadi putih dingin.
  2. Video 16:9 travel → pertahankan ramp 3 f · hanya pada 1 dari 3 cut.
- *Pengamatan di video asli, bukan target:* panjang efek < 0,2 dtk per denyut.

### T3 · Next-Subject Cut-Out Lead · camera
- **Trigger:** transisi benda/orang ke shot berikutnya yang ingin terasa mengalir.
- **Yang terlihat (termasuk gerak):** subjek shot BERIKUT (tangan + gelas) muncul 5 f (0,17 dtk, 13,67–13,80) di atas latar shot LAMA, lalu latar berganti. Pada 7,83: siluet putih → orang asli bertepi putih di atas latar lama → flash → shot baru. Overlay ditaruh di track terpisah. (k5, k6)
- **Kenapa bekerja:** subjek baru "mengambil alih" sebelum latar; mata sudah berada di subjek berikutnya saat latar ganti.
- **Mekanik Remotion (titik awal):**
  - Lapisan: shot lama (latar) → matte subjek shot baru, diposisikan di tempat ia berada di shot baru → shot baru menggantikan latar di frame ke-5.
  - Gerak: matte subjek baru masuk potong keras 5 f; tanpa easing; tepi putih 3–4 px bila ingin varian bertepi.
  - Ruang: datar.
- **SFX:** famili `mekanik` · klik tunggal (`Cutcontrastransision.mp3`, label tutorial "click"), tidak bertumpuk dengan kilat.
- **Pakai bila:** shot baru punya subjek jelas yang bisa di-cut-out. · **Jangan pakai bila:** subjek baru terpotong tepi.
- **Remix (anti-jiplak):**
  1. Unboxing → pertahankan subjek-muncul-dulu · ganti subjek jadi produk di tangan.
  2. UI → hanya kartu/komponen shot berikut yang masuk dulu (lihat 71).
- *Pengamatan di video asli, bukan target:* gelas cut-out ±75 % tinggi preview; cut-out k5 25 × 74 % (terukur 25,8 × 74,1 %).

## Audio (bila dibedah)
Kosakata (label tutorial + earshot): shutter click, stinger camera shot, camera shot, flicker, click. Flicker = rentetan tik tiap 0,04–0,08 dtk (3,55–4,17 dtk); flicker 2 = aksen +24 dB di 5,77. Kepadatan earshot 4,2 event/dtk; SFX setara musik, kadang di atasnya (+19…+26 dB di atas bed). Musik hip-hop/trap dengan vocal chop (lo-fi hop 0–6,75, trap 6,75–17,25), ±136 bpm; mix −14,5 LUFS, true peak +2,6 dBFS (ebur128), LRA 6,6 LU.

## Yang harus terasa sama saat disandingkan
- Siluet putih krem rata, tepi tajam mengikuti subjek, tanpa glow atau bayangan, latar tetap tajam di belakangnya?
- Kedipan terasa 2 nyala / 2 mati, tiap nyala punya satu tik?
- Kilat jatuh tepat di cut, bukan sebelum atau sesudahnya?
- Subjek shot baru terasa tampil sebentar di atas latar lama sebelum latar berganti?
- Transisi jatuh di beat dan footage tetap hangat-pudar tanpa grain?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
