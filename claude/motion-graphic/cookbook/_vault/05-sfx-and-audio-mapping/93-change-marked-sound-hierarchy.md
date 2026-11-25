---
id: "93"
pola: Change-Marked Sound Hierarchy
kategori: sfx
kategori_lain: [camera, typography]
trigger: klaim "sama tapi beda" yang dibuktikan dengan perbandingan gambar; daftar fitur atau langkah yang tiap katanya punya gambar sendiri; pembuka tanpa suara sebelum kalimat pertama; demo sebelum-sesudah atau perubahan cahaya/warna; kalimat payoff "dari X biasa jadi Y"
sumber: video promo alat video AI bernarasi (IG, kode DfKZ9g_J3x_) · 4:3 · 27,9 dtk
dilihat_bergerak: ya
diukur: ya
alias: []
---
# 93 · Change-Marked Sound Hierarchy

> **Cookbook, bukan template.** Kartu ini sengaja ditulis sebagai **cara memutuskan**: kapan editor memberi bunyi, bunyi berbentuk apa, kapan diam, dan kapan potong. Yang tidak dipinjam: palet merah-putih, huruf, kamar kayu, tema AI, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disetel lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: unggahan referensi "contoh editing expert" (IG, kode `DfKZ9g_J3x_`) · 4:3 (960×720), 24 fps, 27,9 dtk · Frame: `../../guide/referensi/sheets/93-cinematic-looks.jpg` (2 frame per dtk, berlabel detik) · Frame kunci: `../../guide/referensi/sheets/keyframes/93-k1…k11-*.jpg` + urutan gerak `93-k12-urutan-grid-ke-wajah.jpg`, `93-k13-urutan-then-relight.jpg`, `93-k14-urutan-light-atmosphere-slider.jpg` (10 fps)
> Video sumber: tidak disalin ke repo (unggahan sesi, kode IG di atas)
> Dilihat bergerak: **ya** (strip 10 fps seluruh 0–27,9 dtk; deteksi potongan ffmpeg ambang 0,2; 26 potongan). Audio diukur 22 Nov 2026: stem demucs htdemucs (suara / drums / bass / other), transkrip kata faster-whisper, `earshot timeline --detail high` pada stem tanpa suara, `earshot describe` pada 14 potongan stem drums di momen kandidat.

**Inti mekanik (1 kalimat):** Bunyi tidak menandai potongan atau kata, melainkan **perubahan keadaan gambar** yang sedang dibuktikan kalimat; bentuk bunyi mengikuti bentuk perubahannya (seketika = klik terang, gestur 0,5–1 dtk = swell rendah, batas babak = dentum tumpul), kepadatannya berbanding terbalik dengan kepadatan ucapan, dan energi babak dinaikkan lewat lapisan musik, bukan lewat jumlah SFX.
**Narrative trigger:**
- Klaim "sama tapi beda" / "satu klip jadi banyak tampilan" yang harus dibuktikan, bukan diceritakan → T1, T4
- Daftar fitur atau langkah yang tiap katanya punya gambar sendiri ("wide → close up", "shadows, light, atmosphere") → T2, T4, T5
- Pembuka tanpa suara sebelum kalimat pertama → T6
- Demo sebelum-sesudah (slider, cahaya berubah, grading) → T2
- Kalimat payoff "dari X biasa menjadi Y" dan ajakan penutup → T3
**Jangan dipakai untuk:** cerita personal yang tenang tanpa perubahan gambar yang bisa ditunjuk (formula ini butuh "bukti" di layar; tanpa itu tidak ada yang layak diberi bunyi dan video jadi sepi tanpa alasan); klip wawancara satu shot panjang.
**Kata kunci gaya:** bukti-di-layar, bunyi = perubahan, dentum babak, swell gestur, musik berlapis, kata ikut bentuk frame
**Diambil untuk:** dikirim sebagai contoh editing tingkat ahli; yang diminta adalah **pembelajaran dan formula** (kapan dan kenapa editor memilih gerak, komposisi, bunyi), bukan template untuk ditiru. Tidak diambil: tema alat AI, palet merah-putih, huruf glitch, kamar kayu dan karpet merah, kalimat CTA.

## Kondisi footage asli
- 4:3, 24 fps. Semua shot adalah **satu orang di satu kamar** (kayu hangat, lampu oranye, karpet bundar merah) dalam banyak sudut dan tampilan: talking head medium-close, wide, high-angle, top-down, extreme close-up mata, siluet backlight, lantai rendah. Gelap dengan sumber cahaya praktis.
- Kamera virtual bergerak hampir di setiap shot (push lewat pintu, terbang rendah di lantai, high-angle pelan); talking head relatif diam.
- Ruang kosong: kiri/kanan kepala di talking head, lantai dan karpet di shot wide/high-angle. Teks mengisi ruang itu dan **mengikuti bentuk di frame** (busur di atas kepala, orbit di sekitar kaki, lengkung karpet).
- Syarat utama formula: **setiap kata kunci punya perubahan gambar yang nyata** (shot wide saat "wide", cahaya berubah saat "relight"). Footage yang tidak punya perubahan seperti itu tidak bisa meminjam T1/T2 apa adanya; cari "perubahan" lain (objek muncul, grafik berubah, warna berubah).

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Footage hangat gelap; teks putih + satu aksen merah untuk kata kunci; satu kartu terang (krem/abu muda) untuk kata pemisah babak ("THEN", "HERE'S HOW").
### Teks
Grotesk sans putih kecil untuk kata sambung, kata kunci merah atau putih besar dengan distorsi saat masuk; kata ditambahkan per kata dan bertahan sampai potongan berikutnya.
### Ritme
26 potongan dalam 27,9 dtk (±56/menit), median shot ±0,9 dtk; 72 kata, ±2,8 kata/dtk; musik 127 bpm, potongan **tidak** dikunci ke ketukan (23 % jatuh di grid, peluang acak 21 %) melainkan ke kata. *Pengamatan.*

## Pola

### T1 · Sound Marks the Change, Not the Cut · sfx
- **Trigger:** kalimat yang mengubah keadaan gambar yang sama (cahaya, warna, sudut, versi) atau berpindah babak.
- **Yang terlihat (termasuk gerak):** dari 26 potongan, ±12 berbunyi. Yang berbunyi: perubahan keadaan yang **dibicarakan** (13,40 cahaya biru → abu tepat di kata "whole", k7→k8; 14,71 lampu kamar menyala di kata "light"; 15,04 tampilan teal di "atmosphere"; 15,9–18,6 slider sebelum/sesudah, k9) dan batas babak (3,62 hook → isi; 25,08 isi → CTA). Yang **senyap**: potongan kembali ke talking head (8,96; 11,29), potongan antar sudut di dalam satu kalimat (22,58; 22,92; 23,71), kata yang diketik ("Seedance 2.5", 7,0–8,0), dan transisi sobekan cat merah "HERE'S HOW" yang paling ramai secara visual (6,29–6,8; hanya gesek lembut ±−33 LUFS, hampir tenggelam di bed). (k4, k7, k8, k13, k14)
- **Kenapa bekerja:** penonton belajar bahwa bunyi = "lihat, gambarnya berubah". Karena talking head dan potongan biasa diam, setiap klik terasa seperti bukti. Transisi visual yang sudah keras (sobekan cat) tidak diberi bunyi keras karena kalimatnya ("Here's how") sudah membawa beban; dua penekanan di satu momen saling memakan.
- **Rumus keputusan:**
  - Trigger: event visual muncul → tanya "apakah gambar **berubah keadaan** karena kalimat ini, atau hanya **berganti shot**?"
  - Berubah keadaan / batas babak → beri satu bunyi (bentuknya dari T2).
  - Hanya ganti shot di dalam satu gagasan, kembali ke wajah, atau kata yang diketik → senyap (Lantai E24 tetap: kata KT mendapat tick pelan, lihat §Penyesuaian).
  - Visual sudah sangat keras **dan** kalimatnya kunci → bunyi paling lembut atau senyap; biarkan suara memimpin.
  - Syarat berhasil: sisa video cukup sepi sehingga bunyi perubahan terdengar sebagai tanda; bed musik konstan supaya senyap tidak terdengar seperti rusak.
  - Jangan dipakai bila: tidak ada perubahan keadaan yang bisa ditunjuk (bunyi jadi tempelan), atau video yang ceritanya memang dibawa bunyi tanpa VO (pakai kartu 23).
- **Mekanik Remotion (titik awal):**
  - Di `objects.json` beri tiap event kolom `jenis: perubahan | ganti_shot | babak | kata`; hanya `perubahan` dan `babak` yang mendapat cue momen, sisanya `senyap: true` + alasan, kecuali `kata` yang mendapat tick pilar 3.
  - Sinkron: puncak bunyi di frame perubahan, ±1 f (`align: "peak"`).
- **SFX:** famili `mekanik` untuk perubahan seketika (klik saklar/kunci, kecerahan 3,9–7,7 kHz), `impact` untuk batas babak; contoh lokal: `switch` (klik saklar, `../../references/audio.md` §14.8 "bidang cahaya menyala/padam"), selain itu `sfx_cari.py --famili mekanik`.
- **Pakai bila:** demo, perbandingan, daftar fitur, before/after. · **Jangan pakai bila:** cerita emosional tanpa perubahan gambar.
- **Remix (anti-jiplak):**
  1. Video UMKM "foto produk HP vs foto produk studio" → klik saat versi berganti, potongan ke wajah penjual senyap.
  2. Grafik omzet yang berubah dari turun ke naik → satu klik di frame grafik berbalik, bukan per batang.
  3. Kalender/hari berganti di cerita personal → satu klik per lompatan waktu yang diucapkan, bukan per tanggal yang lewat.
- *Pengamatan, bukan target:* ±12 dari 26 potongan berbunyi (±46 %); bunyi perubahan jatuh −0,5…+1 f dari frame perubahannya (3,61↔3,62; 8,27↔8,29; 12,73↔12,75; 13,43↔13,40; 14,74↔14,71; 15,06↔15,04; 22,08↔22,08; 25,08↔25,08); satu-satunya yang mendahului gambar ±2 f adalah klik kartu "THEN" (12,35↔12,42).

### T2 · Sound Shape Follows Gesture Shape · sfx
- **Trigger:** setiap bunyi yang lolos T1.
- **Yang terlihat (termasuk gerak):** empat bentuk perubahan, empat bentuk bunyi, tidak pernah tertukar:
  - **Seketika** (cahaya berganti dalam 1 frame, kartu "THEN" masuk): klik pendek terang, serangan 1–3 ms, peluruhan ≤ 135 ms (12,35; 13,43; 14,74; 15,06; 8,27).
  - **Gestur panjang** (garis slider menyapu 0,5–1 dtk, k9/k14): swell rendah bernada ±55–60 Hz, serangan 130–290 ms, durasi 0,3–0,9 dtk, panjangnya mengikuti sapuan (16,0–16,9; 17,86; 18,58).
  - **Lompatan ruang** (kamera terbang rendah di lantai dan kata "from" lewat di depan lensa, k10): dentum rendah bernada ±54 Hz dengan ekor turun seperti tape stop, 0,7 dtk; ini aksen terkuat video (+12 dB di atas bed).
  - **Batas babak** (hook → isi 3,62; isi → CTA 25,08): dentum tumpul seperti tutup kotak, serangan 27–99 ms, ≤ 0,5 dtk.
  (k9, k10, k14)
- **Kenapa bekerja:** telinga membaca durasi dan nada sebagai durasi dan berat gerak. Klik untuk sapuan 1 dtk terasa telat dan kecil; swell untuk perubahan 1 frame terasa lembek. Nada rendah untuk gerak besar menjaga pita 1–4 kHz tetap milik suara.
- **Rumus keputusan:** ukur dulu **durasi perubahan** di frame: ≤ 2 f → klik; 8–24 f → swell/whoosh yang panjangnya sama dengan gesturnya dan memuncak di kecepatan tertinggi; perubahan yang memindahkan penonton ke ruang lain → dentum rendah; pergantian babak → dentum tumpul. Syarat berhasil: satu bentuk = satu peran sepanjang video. Jangan: dua bunyi untuk satu perubahan (klik + swell).
- **Mekanik Remotion (titik awal):** cue `{t, peran, pilar, famili, dur_gestur}`; untuk swell, `t = frame_mulai + round(0,28 × dur) − peak_file` (`../../references/audio.md` §14.9) dan pangkas file supaya ekornya selesai ±settle gerak; klik tanpa fade-in.
- **SFX:** famili `mekanik` (seketika) · famili `air` gelap / low-pass (gestur panjang, kata kunci "low pass air whoosh", "muffled bass thud transition") · `impact` (lompatan ruang, batas babak, kata kunci "soft bass drop sub", "punchy impact hit" dengan isi 300 Hz–3 kHz supaya terdengar di HP).
- **Pakai bila:** ada lebih dari satu jenis perubahan di video. · **Jangan pakai bila:** semua perubahan sejenis (cukup satu bentuk).
- **Remix:** 1) halaman katalog digeser pelan → swell sepanjang geseran; 2) lampu toko menyala → klik saklar; 3) pindah dari kota ke desa lewat zoom-through → dentum rendah di pendaratan.
- *Pengamatan, bukan target:* klik −29…−37 LUFS (potongan 0,5 dtk), swell dan dentum −20…−23 LUFS; puncak di stem drums −11…−19 dBFS, sementara puncak suara −11…−13 dBFS.

### T3 · Density Inverse to Speech, Energy by Music Layers · sfx
- **Trigger:** menata keseimbangan seluruh video: bagian tanpa suara, bagian penjelasan, payoff, CTA.
- **Yang terlihat (termasuk gerak):**
  - 0–1,8 dtk **tanpa suara**: bagian paling padat bunyi (±13 klik dalam 1,4 dtk, ±7/dtk), satu klik per kotak klip yang muncul (T6).
  - 1,8–25 dtk **penjelasan**: ±12 bunyi dalam ±23 dtk (±0,5/dtk), tidak ada dua bunyi momen dalam 1 dtk kecuali satu gestur slider.
  - **Musik berlapis menggantikan SFX tambahan:** 0–1,8 dtk hanya pluck/pizzicato tanpa bass; bass masuk 1,81 dtk bersama kata pertama; groove drum masuk 19,3 dtk saat kalimat masuk babak terakhir ("adding that handheld shake"), menuju payoff "from one ordinary clip" (22,08, aksen terkuat) dan CTA.
  - Level musik **rata**: median −27 dBFS saat bicara dan −27 dBFS di jeda (tanpa ducking yang terdengar), ±11–13 dB di bawah suara.
- **Kenapa bekerja:** saat ada suara, telinga sibuk dengan kata; SFX padat di situ bersaing. Saat tidak ada suara, bunyi adalah satu-satunya pembawa informasi, jadi boleh rapat. Energi yang naik lewat lapisan musik terdengar sebagai "cerita naik", bukan "berisik".
- **Rumus keputusan:**
  - Petakan per detik: ada suara atau tidak. Tanpa suara → bunyi boleh rapat (satu per objek, rattle). Ada suara → hanya perubahan (T1), jarak ≥ 1 dtk antarbunyi momen.
  - Butuh energi naik? Tambah **lapisan musik** di batas babak (bass, lalu drum), bukan riser per kalimat. Aksen terkuat hanya satu, di kalimat payoff.
  - Tidak ada lubang: bed musik konstan dari frame 0 sampai akhir, jadi bagian "lega" tetap hidup.
  - Syarat berhasil: musik dipilih atau dipotong dengan aransemen yang punya titik masuk lapisan; kalau musik datar dari awal, lapisan dibuat dengan dua cue musik (§14.2 `../../references/audio.md`).
  - Jangan: menyamakan kepadatan di seluruh video (rata = sepi di bagian ramai visual dan ramai di bagian bicara).
- **Mekanik Remotion (titik awal):** cue musik per babak `musik_babak1/2/3` dengan titik masuk di frame kata pertama dan di frame awal babak akhir; automation tetap, tanpa kompresor.
- **SFX:** famili `mekanik` (rattle tanpa suara) + famili di T2 + lapisan musik; famili `riser` tidak dipakai di referensi (tidak terdengar satu pun riser yang jelas).
- **Pakai bila:** video ber-VO dengan pembuka tanpa suara atau bagian demo. · **Jangan pakai bila:** musik harus tetap tipis (podcast, kesaksian), pakai level tetap tanpa lapisan.
- **Remix:** 1) pembuka montase foto UMKM tanpa VO → rattle klik per foto, lalu bass masuk saat pemilik mulai bicara; 2) cerita kegagalan → drum masuk hanya saat kalimat bangkit; 3) tutorial → lapisan masuk per langkah ketiga, bukan per langkah.

### T4 · The Word Is the Image · camera
- **Trigger:** kata yang menyebut tampilan atau keadaan ("wide", "close up", "relight", "light", "atmosphere", "color grading", "handheld", "ordinary clip").
- **Yang terlihat (termasuk gerak):** potongan jatuh ke gambar yang **adalah** kata itu: shot wide di "wide" (k5), extreme close-up mata di "close up" (k6), cahaya berubah di tengah shot pada kata "whole" (k8), kamar terang di "light", slider sebelum/sesudah di "color grading" (k9), operator kamera di "handheld". Komposisi tetap sama saat yang dibandingkan adalah tampilan (14,0–15,9: tiga tampilan kamar yang sama dari sudut yang sama). Potongan mendahului onset kata ±0–2 f (median ±0,06 dtk; rentang −0,21…+0,04).
- **Kenapa bekerja:** klaim "sama tapi beda" hanya meyakinkan bila penonton melihat perbandingannya sendiri; komposisi yang dikunci membuat satu-satunya perbedaan adalah yang sedang diucapkan. Gambar datang sedikit sebelum kata sehingga kata terdengar sebagai label dari yang sudah terlihat.
- **Rumus keputusan:** untuk tiap kata kunci tanya "gambar apa yang membuktikannya?"; bila membandingkan dua keadaan, kunci komposisi dan ubah satu variabel; potong 0–2 f sebelum onset kata (dari `words.json`), bukan di ketukan musik. Jangan: b-roll yang hanya "bertema sama" (ilustrasi, bukan bukti).
- **Mekanik Remotion (titik awal):** cut di `frame(kata.start) − 1`; perubahan cahaya di dalam shot = dua `<OffthreadVideo>`/still bertumpuk dengan potongan keras atau wipe 1–2 f, bukan crossfade (Lantai B13).
- **SFX:** famili `mekanik` untuk potongan yang mengubah keadaan (T1/T2); senyap untuk potongan yang hanya berganti sudut di dalam satu gagasan, karena bunyi di situ tidak menunjuk perubahan apa pun.
- **Remix:** 1) "dulu berantakan, sekarang rapi" → meja yang sama, sudut sama, satu potongan di kata "sekarang"; 2) "zoom" di UI → kamera benar-benar zoom saat kata diucapkan; 3) "lebih terang" → grading naik di frame kata.

### T5 · Keyword Resolves on Arrival, Text Follows Frame Shapes · typography
- **Trigger:** kata kunci yang menyebut hasil/fitur di kalimat daftar.
- **Yang terlihat (termasuk gerak):** kata sambung putih kecil muncul per kata; kata kunci masuk **terdistorsi** (huruf terpotong, bergeser, berpiksel) lalu menjadi bersih ±0,3–0,5 dtk kemudian, saat kata selesai diucapkan ("WIDE" 10,0→10,2; "CLOSE UP" 10,5→11,0; "Shadows" 14,3→14,6; "Atmosphere" 15,0→15,5). Teks mengikuti bentuk di frame: busur di atas kepala ("anything", k2; "angle"), orbit di kaki ("LOOKS", k3), lengkung karpet ("generated", "completely different story"). Kata tidak dihapus sampai potongan; di 5,4 dtk kata lama larut berpiksel sebelum kata baru. Kata "from" terbang melewati lensa kamera di 3D (k10). Tidak ada tick per kata di referensi.
- **Kenapa bekerja:** distorsi = "sedang berubah", bersih = "sudah jadi"; pembacaan kata meniru isi kalimat (tampilan yang berubah). Bentuk lengkung membuat teks terasa bagian dari ruang, bukan tempelan.
- **Rumus keputusan:** pakai distorsi-lalu-bersih hanya untuk kata yang maknanya perubahan/transformasi; kata biasa masuk polos. Lengkungkan teks hanya bila frame punya bentuk lengkung nyata di dekat subjek (kepala, meja bundar, karpet). Jangan: glitch pengacak huruf di semua kata (`../../references/analysis-qa.md` §16.2 menolak glitch pengacak huruf sebagai hiasan).
- **Mekanik Remotion (titik awal):** kata kunci `clipPath` per irisan horizontal dengan `translateX` acak kecil yang meluruh ke 0 dalam 8–12 f (`CURVE.land`); teks lengkung via SVG `<textPath>` pada kurva yang diturunkan dari titik wajah/objek (`../../scripts/lego/persepsi.py`).
- **SFX:** famili `mekanik` sebagai tick pilar 3 per kata (Lantai E24); kata kunci yang resolve tidak mendapat aksen tambahan bila shot-nya sudah mendapat bunyi perubahan (satu event satu bunyi).
- **Remix:** 1) "rapi" masuk berantakan lalu tersusun; 2) teks melengkung di sekitar piring bundar untuk usaha kuliner; 3) 16:9 talking head → busur di ruang kosong samping kepala, bukan di atas.

### T6 · Silent Grid Cold Open · camera
- **Trigger:** pembuka sebelum kalimat pertama yang harus langsung menunjukkan "banyak versi dari satu hal".
- **Yang terlihat (termasuk gerak):** layar hitam terisi kotak-kotak klip kecil (semua tampilan dari kamar yang sama) yang muncul satu per satu, cepat lalu melambat (luas terisi 5 % → 47 % dalam 0,6 dtk, → 78 % di 1,25 dtk); lalu kamera push masuk ke satu kotak (wajah) tepat saat kata pertama dan bass masuk (1,8–2,4 dtk). (k1, k12)
- **Kenapa bekerja:** frame 0 sudah berisi gerak dan bunyi (Lantai D22c) tanpa butuh kalimat; grid memperlihatkan janji video (banyak tampilan) sebelum dijelaskan; push ke satu kotak memilih "satu klip" yang akan dibedah.
- **Rumus keputusan:** pembuka tanpa suara 1–2 dtk boleh bila gambarnya adalah janji video; isi dengan rattle bunyi rapat yang melambat bersama gambarnya; kalimat pertama + lapisan musik pertama + push masuk jatuh di frame yang sama. Jangan: pembuka tanpa suara yang visualnya hanya judul/teks.
- **Mekanik Remotion (titik awal):** kotak muncul dengan jeda `react(i)` yang membesar; tiap kotak satu klik `mekanik` −16…−20 dB dengan varian berputar; push `CURVE.heavy` 14–16 f ke kotak terpilih, motion blur.
- **SFX:** famili `mekanik` (rattle klik per kotak; `Pergantianfoto` untuk montase foto bila lolos dengar).
- **Remix:** 1) grid foto pelanggan UMKM → push ke satu pelanggan yang bercerita; 2) grid tanggal kalender kosong → push ke satu tanggal; 3) grid tangkapan layar komentar → push ke satu komentar.

## Formula sound design
Hierarki dari bawah ke atas, dengan angka *pengamatan* dari referensi ini (bukan target):

| Lapis | Isi | Kapan | Level / kepadatan (pengamatan) |
|---|---|---|---|
| 0. Bed | musik konstan (pluck/pizzicato 127 bpm), tidak di-duck | frame 0 sampai akhir | median −27 dBFS saat bicara = −27 dBFS di jeda; ±11–13 dB di bawah suara; stem tanpa suara −23,4 LUFS terpadu |
| 1. Lapisan musik | bass masuk di kata pertama (1,81 dtk), groove drum di babak akhir (19,3 dtk) | batas babak | pengganti riser; 2 titik masuk dalam 28 dtk |
| 2. Rattle | klik per objek yang muncul | hanya saat tanpa suara | ±13 klik / 1,4 dtk (±7/dtk), melambat bersama gambar |
| 3. Klik perubahan | perubahan keadaan seketika yang diucapkan | saat bicara | ±6 dalam 23 dtk; −29…−37 LUFS; 0…+1 f dari frame |
| 4. Swell gestur | sapuan/gerak 0,5–1 dtk | saat bicara | 2 gestur (3 swell) di 15,9–18,6 dtk; ±55–60 Hz; −20…−23 LUFS |
| 5. Dentum babak | batas hook→isi, isi→CTA | 2× per video | −20…−25 LUFS, serangan 27–99 ms |
| 6. Aksen puncak | payoff "from one ordinary clip" | 1× per video | +12 dB di atas bed, satu-satunya |

Diam yang disengaja: kembali ke talking head, potongan di dalam satu gagasan, teks yang diketik, transisi visual terkeras saat kalimat kunci diucapkan. Kepadatan total ±0,5 bunyi/dtk saat bicara, ±7/dtk saat tanpa suara. Tidak ada riser yang terdengar jelas; tidak ada whoosh di potongan biasa.

**Penyesuaian karena LANTAI:** referensi tidak memberi tick per kata dan tidak terdengar bed ambien terpisah. Lantai E24 tetap berlaku: tick per kata KT tetap dipasang pelan (−14…−20 dB, varian berputar) sebagai lapis paling bawah di atas bed, dan bed ambien ±−36 LUFS tetap ada di bawah musik. Formula kartu ini mengatur lapis 1–6, yaitu bunyi mana yang **naik** dari lapisan detail itu.

## Audio (bila dibedah)
- Transkrip (faster-whisper small, kata): suara mulai 1,54 dtk, 72 kata sampai 27,6 dtk; video berakhir 27,88 dtk dengan musik masih berjalan (format loop IG; penutup mendadak di sini adalah pilihan format, bukan pola untuk video 16:9).
- `earshot timeline` stem tanpa suara: 127 bpm (pulse jelas), tiga bagian (0–9,05 glitch hop/pizzicato; 9,05–18,85 orkestra korporat; 18,85–27,8 glitch hop); 173 event, sebagian besar not musik; 73 % potongan punya onset dalam 1 frame (peluang acak 45 %), 23 % di grid ketukan (acak 21 %).
- Bunyi non-musik diidentifikasi dari stem drums di luar grid ketukan lalu `earshot describe` (label hipotesis): 3,61 "box lid / typewriter" (plausible); 8,27 "mechanical key press" (clear); 12,35 "enter key press" (clear); 13,43 "soft key release click" (clear, 7,7 kHz); 14,74 "quick swipe / key press" (plausible); 16,0–16,9 swell bernada 59 Hz (weak); 17,86 "soft key release" bernada 55 Hz (clear); 18,58 "fast whoosh" bernada 58 Hz (clear); 22,08 "tape stop / box lid" bernada 54 Hz (weak); 25,14 "body falling / box lid" (weak); 6,2–6,8 "quick swipe / page turning" −33 LUFS (plausible, hampir tenggelam).
- Belum pasti: pemisahan SFX dari not musik pizzicato tidak sempurna; klik di 10,2 dtk ("WIDE", 0,79 dtk, "heavy thud") bisa SFX atau ketukan musik.

## Yang harus terasa sama saat disandingkan
- Bila semua SFX dimatikan kecuali yang berlabel `perubahan`/`babak`, apakah setiap bunyi yang tersisa menunjuk ke sesuatu yang berubah di layar dan diucapkan?
- Apakah bentuk tiap bunyi cocok dengan durasi geraknya (klik untuk seketika, swell untuk sapuan)?
- Apakah bagian tanpa suara lebih rapat bunyinya daripada bagian bicara, dan energi babak akhir naik lewat musik, bukan lewat tambahan SFX?
- Apakah ada satu aksen terkuat saja, di kalimat payoff?
- Apakah potongan ke gambar bukti datang 0–2 f sebelum katanya?
- Apakah potongan kembali ke wajah sunyi dari aksen?

## Catatan pakai
- Belum pernah dipakai.
