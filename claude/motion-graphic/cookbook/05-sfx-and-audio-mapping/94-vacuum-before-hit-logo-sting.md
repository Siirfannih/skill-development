---
id: "94"
pola: Vacuum-Before-Hit Logo Sting
kategori: sfx
kategori_lain: [camera, typography]
trigger: pembuka atau penutup merek tanpa suara manusia yang harus terasa mahal dalam 6–10 dtk; kemunculan kata/logo yang perlu hantaman besar tunggal; demo "ketik prompt, klik kirim, hasil muncul" yang dibawa bunyi
sumber: studio motion (IG/ssspin, kode ZawyaStudio1_ssspin.io_1795320236, sting logo produk AI) · 16:9 (736×414), 30 fps · 8,9 dtk
dilihat_bergerak: ya
diukur: ya
alias: []
---
# 94 · Vacuum-Before-Hit Logo Sting

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: file kiriman Irfan `94-zawya-ssspin.mp4` (nama asli `ZawyaStudio1_ssspin.io_1795320236`, IG/ssspin) · 16:9 (736×414), 30 fps, 8,85 dtk, AAC stereo, tanpa suara manusia · Frame: `../../guide/referensi/sheets/94-zawya-sting.jpg` (4 fps) · Frame kunci: `../../guide/referensi/sheets/keyframes/94-k1…k10-*.jpg` + urutan `94-k11-urutan-garis-ke-kata.jpg`, `94-k12-urutan-huruf-merek.jpg` + peta bunyi `94-k13-peta-bunyi.jpg`
> Video sumber: `~/work/pustaka-video/unggahan/94-zawya-ssspin.mp4`
> Dilihat bergerak: **ya** (semua 265 frame 30 fps di strip berlabel nomor frame; audio: spektrogram, `earshot timeline`, puncak dan RMS per jendela 5–20 ms, dicek 22 Nov 2026)
> Kartu pasangan (bunyi pada video bernarasi): `23-sonic-event-hierarchy.md`, `93-change-marked-sound-hierarchy.md`

**Inti mekanik (1 kalimat):** Satu hantaman terbesar disimpan untuk kemunculan kata merek, bunyi dikosongkan ke lantai −45…−55 dBFS (bukan −∞) selama 0,3–0,45 dtk tepat sebelum hantaman dan sebelum klik kirim, dan sisa bunyi dibagi tiga tingkat level (satu −1 dB, beberapa −5…−17, sisanya −18…−36) sehingga tiap gerak punya bunyi seukuran bobotnya.
**Narrative trigger:**
- Merek atau judul muncul sebagai puncak pembuka → T1
- Seluruh sting punya satu puncak, sisanya harus lebih kecil → T2
- Tombol kirim/konfirmasi setelah kursor tiba → T3
- Bunyi harus menempel pada gerak (pecah, zoom, potong, tombol) → T4
- Kamera menyelam dari kata ke UI lalu ke hasil → T5
- Merek/kata penutup dibentuk huruf demi huruf, lalu selesai → T6
**Jangan dipakai untuk:** video ber-VO panjang (bed dan tingkat di sini tidak ada suara yang harus dibawa; lihat 93 dan 23), konten emosional yang tidak butuh vonis besar, momen berurutan yang semuanya penting (tiga tingkat jadi datar).
**Kata kunci gaya:** sting, hitam + satu rona, cahaya radial, vinyet, bidang jauh buram, vakum, hantaman tunggal
**Diambil untuk:** dikirim Irfan sebagai referensi mutu **sound design dan pembuka yang tidak sepi** (nama file hanya "Zawya … ssspin"); bagian yang diambil: urutan tingkat level, vakum sebelum hantaman, gestur "isi daya lalu klik", sinkron bunyi vs frame, ekor penutup. Tidak diambil: bintang/merek aslinya, warna koral, isi teks UI.

## Kondisi footage asli
Tanpa footage kamera; semua grafis. 16:9, latar hitam pekat dengan pendar radial satu rona (koral) dan vinyet. Satu pusat per frame. UI obrolan diperlihatkan sebagai bidang jauh yang buram lalu diperbesar. Tidak ada pembicara, tidak ada musik berlagu; satu-satunya bunyi adalah sound design.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Hitam + satu rona hangat bercahaya (garis, bintang, bilah UI, tombol) dan putih untuk kata; pendar lembut di sekitar objek terang; bidang jauh diberi blur kedalaman.
### Teks
Satu kata merek serif besar di tengah (f57–), teks UI sangat kecil (mikro) hanya untuk tekstur, kata merek akhir grotesk bulat tebal.
### Ritme
265 frame; potongan keras hanya dua (f170 ke layar teks, f207 ke bintang raksasa); sisanya satu adegan berlanjut: titik → bintang → kata → UI → zoom → kursor → teks → bintang → kata baru. Gestur bunyi ±19 dalam 8,85 dtk (≈2,1/dtk).

## Pola

### T1 · Squash, Vacuum, Then The Single Big Hit · sfx
- **Trigger:** kata/logo muncul sebagai puncak pembuka (kata merek, nama produk, judul seri).
- **Yang terlihat (termasuk gerak):** bintang berputar makin lambat (f25–50), memipih horizontal jadi garis selama 6 frame (f50–56), lalu kata merek muncul di f57 (1,90 dtk) dengan cahaya. (k3, k4; urutan k11)
- **Yang terdengar:** bunyi menyusut dari bed sparse (−32 RMS) ke lantai **−43 RMS (puncak −24,7), 1,32–1,80 dtk (0,45 dtk)**, melewati dasar −55 di 1,5–1,6; reverse-swell 0,25 dtk (−55 → −27) mulai ±1,75; lalu **hantaman**: onset −20 dB di 1,855 (−1 f dari frame kata), puncak 1,96 = −0,9 dBFS (RMS 240 ms −7,9), isi 40–90 Hz dengan ekor sub ±2,5 dtk (RMS 40–120 Hz: −14 selama 1 dtk, −26…−31 sampai 4,5 dtk). (k13)
- **Kenapa bekerja:** telinga dikosongkan dulu, jadi hantaman terdengar jauh lebih keras daripada angka ukurnya (≈ +35 dB dari lantai); gerak memipih memberi isyarat visual bahwa sesuatu "ditarik masuk"; ekor sub menjembatani ke adegan berikutnya tanpa bed musik.
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): latar hitam → pendar radial → bintang → kata merek; audio: track bed rendah → cue swell → cue hit → ekor sub.
  - Gerak: squash 6 f `CURVE.reveal` (`../../scripts/remotion/curves.ts`), kata masuk `CURVE.land` ±6 f dengan cahaya meredup 12 f; gain bed turun ke ±−45…−55 dBFS dalam ramp 8–10 f mulai 12 f sebelum squash, swell 7–8 f, hit di frame kata (onset 1 f sebelum f kata, puncak +2 f).
  - Ruang: datar; vinyet + pendar; blur: `filter: blur()` kecil pada kata saat muncul, hilang dalam 6–8 f (`../../references/smooth-motion.md`).
- **SFX:** famili `impact` · hantaman sub pendek berekor ≤ 2,5 dtk (pilar 5), didahului `riser` 0,25 dtk (reverse swell); vakum dibuat dengan menurunkan bed, **bukan** hening digital (`../../references/audio.md` §14.4; `sfx_cari.py --famili impact`).
- **Pakai bila:** ada satu kata/objek yang layak jadi puncak sting; ruang pembuka cukup panjang untuk vakum 0,3–0,45 dtk. · **Jangan pakai bila:** ada suara manusia di jendela vakum (suara tidak boleh ikut turun), atau hantaman kedua sudah ada < 2 dtk sebelumnya.
- **Remix (anti-jiplak):**
  1. Judul seri 16:9 untuk video tutorial → huruf judul menumpuk dari satu garis, vakum 0,4 dtk, hit di kata "Eps. 1"; pertahankan urutan squash → vakum → hit, ganti bentuk (garis → kotak) dan warna.
  2. 9:16 talking head: cut ke judul hitam 0,6 dtk → vakum 0,3 dtk → hit + kata; suara narator berhenti sendiri di jendela vakum (bukan di-duck).
  3. Latar terang → pendar gelap tipis di tepi, lantai bed −45 dBFS tetap (bunyi, bukan warna, yang dikosongkan).
- *Pengamatan di video asli, bukan target:* vakum 1 = 0,45 dtk (RMS −43), vakum 2 = 0,33 dtk (RMS −42,5); hit 1 = −0,9 dBFS, sisanya ≥ 9 dB lebih pelan.

### T2 · Three-Tier Peak Budget · sfx
- **Trigger:** sting/pembuka dengan banyak gerak yang masing-masing minta bunyi; pembuka "padat tapi tidak melelahkan".
- **Yang terlihat (termasuk gerak):** ±19 gestur bunyi untuk 265 frame: titik muncul, garis pecah, bintang berputar, memipih, kata, bilah UI naik, dorongan kamera, zoom-snap, kursor, klik, potong, teks mengalir, potong, bintang menyusut, huruf diketik. (k13)
- **Yang terdengar:** tiga tingkat **puncak**: **A** −0,9 (satu hantaman, kata merek); **B** −5…−17 (hit di zoom-snap −10,2, sapuan+glock −5, hit di potong ke bintang −10,1, whoosh −14,4, swell −15…−17, kilau −16,8); **C** −18…−29 (tik UI, tik ketikan −20, klik kirim −26, RMS −32…−36). Gerak berputar diberi **tik berirama** (8 tik ±50 ms, ≈19/dtk, sentroid 5–7 kHz, RMS −32) di bawah pad 150–700 Hz, bukan satu bunyi panjang. Loudness −20,9 LUFS, LRA 6,4 LU, true peak −0,5 dBTP.
- **Kenapa bekerja:** hierarki level mengajari penonton mana yang penting: tidak ada dua hantaman bertanding; yang kecil tetap hidup karena selalu ada sesuatu tiap ≤ 0,6 dtk, kecuali vakum yang disengaja.
- **Mekanik Remotion (titik awal):**
  - Lapisan: satu `cues.json` dengan kolom `tingkat: A|B|C` + `dB`; tingkat A maksimal 1 (`../../scripts/gate/sfx_density.py` melaporkan puncak per cue).
  - Gerak (audio): gain cue = puncak yang dikehendaki dikurangi normalisasi puncak file; tik putar = rangkaian cue C dengan jarak 45–55 ms, 2–4 varian berputar (`../../guide/sfx/GUIDE.md` Cara 6).
  - Ruang: tidak berlaku.
- **SFX:** famili `mekanik` untuk tik C (klik impuls, pilar 3), `ui` untuk bilah/kursor, `air` untuk whoosh B; tidak ada kayu/kertas/koin (`../../guide/sfx/FAMILI.md` §0).
- **Pakai bila:** ≥ 8 gestur dalam ≤ 10 dtk. · **Jangan pakai bila:** hanya 2–3 gestur (tingkat A dan B cukup, tanpa C).
- **Remix (anti-jiplak):**
  1. Reel produk 9:16: foto produk masuk (C), harga membesar (B), tombol beli (A, satu-satunya hantaman).
  2. Pembuka 16:9 tutorial: logo seri (A), baris judul (B), tiga ikon kecil (C, tik).
  3. Pembuka dokumenter: kata judul (A), tahun muncul (B), garis bergerak (C, tik tipis).
- *Pengamatan di video asli, bukan target:* selisih A–B ±9–10 dB, B–C ±5–20 dB; sub 40–120 Hz hanya menyala di sekitar A dan B (−14 → −26…−31 → −38 → −33 di 6,0–6,5).

### T3 · Charge Then Confirm Cursor Gesture · sfx
- **Trigger:** "ketik prompt/teks, klik kirim" atau tombol penting setelah kursor tiba.
- **Yang terlihat (termasuk gerak):** kursor muncul kecil di bawah (f141) dan melaju ke tombol dalam 6 frame (f141–147), menetap 12 frame (f147–159), tombol menekan di f160 (5,333 dtk), zoom bertambah dan blur-kilat di f164, UI meredup f165–169, potong f170. (k7)
- **Yang terdengar:** vakum kedua 4,70–5,03 (RMS −42,5) selama kursor melaju; di 5,03 (f151, 4 f setelah kursor tiba) nada 170 Hz bertahan lalu **sapuan naik ke 1 kHz** (5,15–5,2) dan glock 620+900 Hz memuncak 5,19 (−5,0; RMS 240 ms −17); **klik kecil terpisah** di 5,33 (0 f dari tekanan visual, RMS −36); blur-kilat 5,47 senyap. (k13)
- **Kenapa bekerja:** konfirmasi dipisah dua: **bunyi emosi** (nada naik + glock) selesai 4 f sebelum tombol menekan, dan **klik fisik** kecil tepat di frame tekan; penonton merasa "daya terkumpul, lalu terkirim", dan klik tetap sinkron presisi.
- **Mekanik Remotion (titik awal):**
  - Lapisan: UI → kursor (`../../scripts/remotion/Kursor.tsx`) → tombol → cue: nada naik (C/B) + glock (B) + klik (C).
  - Gerak: kursor `CURVE.reveal` 6 f; nada naik mulai saat kursor menetap (+4 f), selesai 4 f sebelum frame tekan; klik di frame tekan (±0 f).
  - Ruang: dorong kamera + blur kedalaman pada UI.
- **SFX:** famili `stab` untuk glock/nada naik (stok lokal tipis; `sfx_cari.py --famili stab`), famili `mekanik` untuk klik fisik 0,05 dtk.
- **Pakai bila:** ada aksi pengguna yang jadi pusat momen (kirim, simpan, beli). · **Jangan pakai bila:** tombol hanya hiasan.
- **Remix (anti-jiplak):**
  1. Stempel/vonis akhir pada video cerita: stempel turun (nada naik pendek), klik di tumbukan, bukan stempel + ledakan.
  2. Tombol "buat" di aplikasi: nada naik 0,2 dtk lalu klik, hasil muncul sesudahnya.
  3. 9:16 kartu sentuh jari: jari tiba (vakum 0,3 dtk), nada naik, ketukan jari.
- *Pengamatan di video asli, bukan target:* nada naik 0,17 dtk; glock 0,15 dtk; jeda klik fisik 0,14 dtk setelah glock.

### T4 · Land On Objects, Lead On Cuts · sfx
- **Trigger:** semua bunyi yang menempel pada gerak atau potongan; keluhan "bunyi telat" atau "bunyi mendahului".
- **Yang terlihat (termasuk gerak):** garis muncul f3; pecah f19–20; kata f57; zoom-snap f118; tekan f160; potong f170; potong f207. (k1, k2, k4, k6, k7, k8, k9)
- **Yang terdengar (frame @30 fps):**
  | Peristiwa visual | Bunyi | Onset vs visual | Puncak vs visual |
  |---|---|---|---|
  | garis muncul (0,100) | "shing" tinggi 0,11 | +0,3 f | +4 f (0,22) |
  | garis pecah (0,633) | klik+percik 0,633 | 0 f | +1,7 f |
  | kata merek (1,900) | hantaman 1,855 | −1,4 f | +1,9 f |
  | zoom-snap (3,933) | hit 3,94 | +0,2 f | +1…+3 f |
  | tombol menekan (5,333) | klik 5,33 | 0 f | — |
  | potong ke teks (5,667) | whoosh 5,715 | +1,5 f | +3…+7 f |
  | potong ke bintang (6,900) | swell mulai 6,745, hit 6,84 | −5 f (swell) | −2 f (hit) |
- **Kenapa bekerja:** objek yang muncul/mendarat → bunyi tepat di frame atau 1–2 f sesudahnya; **potongan keras → bunyi mendahului** karena swell/riser memuncak di potongan; whoosh lembut yang mengikuti potongan berpuncak 3–7 f sesudahnya. Satu aturan "tidak pernah telat > 2 f" menutup semua keluhan telat.
- **Mekanik Remotion (titik awal):**
  - Lapisan: `cues.json` dengan `align: "peak"` dan `peak` (detik puncak file) (`../../references/audio.md` §14.9); t cue = frame target − offset puncak.
  - Gerak: untuk objek: onset di frame pertama objek terlihat penuh (0…+1,5 f), untuk potongan: puncak swell/hit −2…0 f; untuk whoosh sesudah potongan: onset +1…+2 f.
  - Ruang: tidak berlaku.
- **SFX:** famili `riser` untuk swell yang memuncak di potongan, `impact` untuk hit di kemunculan, `mekanik` untuk klik tekan; semuanya `align: "peak"` (cek per cue dari render, `../../scripts/audio/sync_cues.py`).
- **Pakai bila:** setiap video dengan SFX. · **Jangan pakai bila:** tidak ada.
- **Remix (anti-jiplak):**
  1. Kartu judul 16:9 yang berganti: hit di frame kartu, whoosh pendek 2 f setelah cut ke kartu berikutnya.
  2. 9:16 centang dicoret: tik di frame goresan terakhir tergambar (+1 f), bukan saat goresan mulai.
  3. Kalender bergeser: ketukan geser di frame berhenti, swell hanya bila ada zoom besar.
- *Pengamatan di video asli, bukan target:* semua onset berada −1,4…+1,5 f dari frame visual kecuali swell di potongan keras (−5 f); tidak ada satu pun yang telat > 2 f.

### T5 · Depth-Blurred UI Dive With Snap Zoom · camera
- **Trigger:** kata merek/judul diikuti demo UI; "dari kata ke produk" dalam satu pegangan kamera.
- **Yang terlihat (termasuk gerak):** bilah UI naik dari bawah selama 25 f (f65–90) dalam bidang jauh buram dan bertingkat (kotak prompt, empat kapsul kecil), kata merek tetap di atas; dorongan lambat f90–117; **snap zoom 3 frame** di f118 dengan blur gerak (kata merek jadi besar, kotak prompt di kiri-bawah terpotong); dorongan lambat lagi f120–164; kursor melaju 6 f; zoom tambahan dan blur-kilat 1 frame di f164; UI meredup 4 f; potong ke layar teks mikro (f170); 36 f; potong ke bintang raksasa buram (f207). (k5, k6, k7, k8, k9)
- **Kenapa bekerja:** snap zoom dan potongan keras dipakai hanya di tiga titik, dan masing-masing dibayar satu hit; dorongan lambat memberi jeda tanpa bunyi baru; bidang buram memberi kedalaman tanpa menambah elemen.
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): latar hitam → pendar → UI (blur 6–10 px, scale 0,8) → kata merek → kursor.
  - Gerak: UI naik `translateY` 25 f `CURVE.drift`; dorongan `scale` 1,00→1,06 selama 27 f; snap zoom `scale` ×1,7 dalam 3 f `CURVE.whip` dengan `CameraMotionBlur`; potongan keras tanpa transisi.
  - Ruang: `perspective` ringan, blur kedalaman pada bidang jauh; kata merek tidak ikut buram.
  - Blur & blend: `<CameraMotionBlur shutterAngle={200} samples={16}>` hanya di 3 f snap zoom (`../../references/smooth-motion.md`); pendar dengan `mixBlendMode: screen`.
- **SFX:** famili `air` untuk dorongan (swell naik 0,8 dtk di bawah −17), famili `impact` untuk snap zoom (hit −10); potongan keras mengikuti T4.
- **Pakai bila:** aksi pengguna bisa diperlihatkan ke satu titik di UI. · **Jangan pakai bila:** UI harus terbaca penuh sebelum zoom.
- **Remix (anti-jiplak):**
  1. Dasbor pelanggan: kartu angka naik buram dari bawah, snap zoom ke satu angka, kursor ke tombol "unduh".
  2. 9:16: kolom prompt dari bawah, snap zoom ke satu baris teks.
  3. Studio produk: foto produk di bidang jauh, snap zoom ke label.
- *Pengamatan di video asli, bukan target:* UI naik 25 f; snap 3 f; dorongan 27 dan 44 f; potong ke teks tinggal 36 f.

### T6 · Sparkle Ahead Of Letters, Long Decay Tail · typography
- **Trigger:** kata/merek penutup dibentuk huruf demi huruf; penutup sting; akhir yang tidak boleh mendadak.
- **Yang terlihat (termasuk gerak):** bintang raksasa menyusut dalam 23 f (f207–230) lalu berkilau satu titik (f229), "c" muncul di f231, tiap huruf 5 frame (167 ms) sampai "calude" lengkap di f253, logo diam f253–265 (±0,37 dtk), video berakhir. (k9, k10; urutan k12)
- **Yang terdengar:** nada pad 600+800 Hz mulai 6,85 dan bertahan sampai 8,5; **arpeggio kilau 9 denting ±87 ms (1,3 / 4 / 7 kHz, puncak −16,8, RMS −36) di 7,32–7,9 saat bintang menyusut, sebelum huruf pertama (7,70)**; huruf sendiri hampir senyap (2 denting lemah 7,92 dan 8,05, < −40); pad meluruh RMS −49 (8,0–8,85) dan pudar ke −∞ di 8,85 (0,3 dtk): ekor bunyi ±0,95 dtk sesudah denting terakhir. (k13)
- **Kenapa bekerja:** perhatian diberi pada **transformasi** (bintang jadi kata) bukan pada ketikan; huruf tidak perlu bunyi bila kilau sudah berjalan; ekor panjang memberi rasa selesai tanpa sting penutup.
- **Mekanik Remotion (titik awal):**
  - Lapisan: bintang → kilau → huruf (`TeksBlok`, `../../scripts/remotion/TeksBlok.tsx`) → logo diam.
  - Gerak: huruf muncul `CURVE.reveal` 5 f per huruf; tidak ada animasi keluar; logo diam ≥ 10 f; audio: kilau mulai 10 f sebelum huruf pertama.
  - Ruang: datar; blur: huruf masuk dari blur kecil 4 f.
- **SFX:** famili `ui` untuk kilau (denting naik, `sfx_cari.py --famili ui`) dan ekor pad dari famili `ruang`/`stab`; huruf senyap + alasan (perhatian di kilau, `../../guide/sfx/GUIDE.md`).
- **Pakai bila:** kata terakhir adalah merek/judul. · **Jangan pakai bila:** kalimat penutup bernarasi (suara menutup sendiri).
- **Remix (anti-jiplak):**
  1. Judul "Eps. 2" diketik: kilau 9 denting saat angka lama memudar, huruf senyap.
  2. 9:16: nama akun ditulis di bawah wajah, kilau halus dulu.
  3. Latar terang: kilau diganti tik tipis; ekor pad tetap ≥ 0,9 dtk.
- *Pengamatan di video asli, bukan target:* 9 denting dalam 0,6 dtk; ekor 0,95 dtk; logo diam 0,37 dtk.

## Audio (bila dibedah)
- earshot: 66 event onset (7,4/dtk) termasuk ekor dan tik berderet; gestur manusia ±19 (≈2,1/dtk). −20,9 LUFS, LRA 6,4 LU, true peak −0,5 dBTP, tidak ada beat grid (pulse clarity 0,11). Dua bagian: 0–4,4 dtk (whoosh/swoosh) dan 4,4–8,9 (ding).
- Tidak ada bed musik: ekor sub dari hantaman menjembatani 1,86–8,0 dtk; dua vakum dan satu ekor pad penutup. Label bunyi dari earshot = hipotesis (sering salah pada bunyi bernada); nada naik 5,03–5,2 dan arpeggio 7,32–7,9 dikenali dari spektrogram dan nada, bukan dari label. Belum pasti: pemisahan tik UI kecil dari ekor sub di 2,15–2,9.
- Peta waktu: `../../guide/referensi/sheets/keyframes/94-k13-peta-bunyi.jpg`.

## Yang harus terasa sama saat disandingkan
- Ada satu hantaman terbesar saja, jatuh di kemunculan kata, dan sebelumnya ada jeda sunyi sekitar setengah detik (bukan hening mati)?
- Tiga tingkat level terdengar: satu keras, beberapa sedang, sisanya halus?
- Nada naik sebelum klik selesai sebelum tombol menekan, lalu ada klik kecil terpisah di frame tekan?
- Whoosh setelah potongan lembut dan swell sebelum potongan memuncak tepat di potongan?
- Pembuka tidak pernah sepi lebih dari ±0,6 dtk kecuali vakum yang disengaja, dan penutup punya ekor ≥ 0,9 dtk?

## Catatan pakai
- Belum pernah dipakai (22 Nov 2026).
