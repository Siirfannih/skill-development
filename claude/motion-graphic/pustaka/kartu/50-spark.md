# 50 · Merantau (motion design 2D/2,5D, Dyanee) — file `2dmotion.mp4`, BUKAN video Spark

> **Status: standar kualitas Irfan.** Video ini target yang harus dicapai, bukan contoh opsional.
> Sumber: file Irfan `2dmotion.mp4` (pustaka-video/mac); kredit di layar: "Movie / Motion Design — Dyanee", "Music / Audio — Ian post – Arisaig" · 16:9 (1280×720, 24 fps), 47,1 dtk · Frame: `../../guide/referensi/sheets/50-spark.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/50-k*.jpg` · Bedah lengkap: `ukuran.md` (bedah 11 Nov)
> **Catatan identitas:** nama asli dari Irfan "2dmotion.mp4 (diduga video Spark)". Isinya ternyata bukan "02 Everything Starts With a Spark" (tidak ada VO, gradien hijau-kuning, dashboard, atau kata "works"). Ini film pendek tanpa kata tentang pergi merantau, judul "Merantau" di akhir. Kartu lama 50-spark (GrokAgent V2, 47,3 dtk, `GrokAgent/reference-videos/VISUAL-BREAKDOWN.md`, `AUDIO-ANALYSIS.md` 02_spark, `STYLE-SYNTHESIS.md`, `data/`) membedah video lain; tautan itu tidak berlaku untuk file ini. Kemiripan durasi (47,1 vs 47,3 dtk) kebetulan atau salah label.
> Kedalaman bedah: **dalam** (visual dan audio diukur dari video sumber; tidak ada ucapan, jadi hubungan grafik–kata tidak bisa dibedah)

**DNA (satu kalimat):** Cerita tanpa kata yang dibawa benda (kalender, jam, pintu, koper, pesawat kertas, pesawat), satu benda besar per adegan dalam ilustrasi 2,5D bercahaya hangat lalu kebiruan, dirangkai transisi yang memakai gerak benda itu sendiri, ditutup judul script tipis di langit biru pucat.
**Cocok untuk:** pembuka/teaser cerita, brand film emosional, intro tanpa VO, video perjalanan/perubahan hidup · **Tidak cocok untuk:** talking head, konten padat data, promo dengan CTA keras
**Kata kunci gaya:** sinematik, hangat-ke-dingin, simbolik, 2,5D, cahaya bocor, tenang
**Diambil untuk:** "2dmotion.mp4" → motion graphic 2D (ilustrasi, skala dan kedalaman subjek, gerak kamera, transisi). Bagian ini dibedah paling dalam.

## PENGIKAT (diambil utuh dari SATU kiblat; ini yang membuat video terasa satu keluarga)

### 1. Warna & tekstur
- Dua babak suhu: hangat-gelap di rumah (dinding `#25262B`, pintu kayu `#7D502B`, cahaya kuning `#7E6B41`–`#BDB68A`) → terang-dingin di perjalanan (langit `#C4D8D7`/`#CFDCD5`, fasad lavender `#BBBFDA`, langit akhir `#5F6F89`–`#68758E`).
- Kertas kalender putih hangat `#F9F7F1`, angka arang `#363636`, aksen merah tunggal `#B03840`–`#B53C46` (Minggu + lingkar tanggal 20), nama bulan emas zaitun `#958B59`. Koper merah tua `#9C4D41` satu-satunya warna jenuh di babak perjalanan.
- Matahari selalu ada sebagai titik putih `#FDFBF5`/`#F5EDD8` dengan lens flare dan pita cahaya miring (light leak diagonal ±40°), muncul di sebagian besar adegan (hitungan dari sheet, bukan ukur piksel).
- Vignette tergantung adegan: interior gelap sudut 38 vs tengah 171 (luma), pintu sudut lebih terang (+38, cahaya masuk), adegan langit/kota sudut 27–58 lebih gelap. Kertas kalender tanpa vignette.
- Tekstur: bayangan dan gradien lembut ala render 3D sederhana, tanpa grain kertas, tanpa outline. Kedalaman dari kabut (haze) dan blur, bukan dari garis.
- Penutup memudar ke versi abu-abu (pintu yang sama, 45–47 dtk): desaturasi = kenangan.

### 2. Teks
- Teks nyaris tidak ada; "teks" utama adalah tipografi benda: angka tahun "2026" Archivo/Inter Black-ish (sans geometris sangat tebal) setinggi **38 % frame**, angka tanggal sans tipis-sedang (mirip Poppins/Questrial) **5 %**, rasio ±7,5×.
- Satu-satunya penekanan: lingkaran merah coretan tangan di "20" (±22 % tinggi saat close-up; angka "20" 10–12 %).
- Judul "Merantau": script tipis miring (mirip Great Vibes/Alex Brush, satu bobot), putih kebiruan `#C2CBD7`–`#DDE6EB`. Masuk pertama kali BESAR: 24 % tinggi, 66 % lebar, pusat (51 %, 76 %), separuh terpotong haze di bawah; lalu mengecil ke 17 % tinggi / 30 % lebar, rata kiri-tengah di (27 %, 39 %).
- Kredit di bawah judul: monospace kecil, label 2,4 % dan nama 1,5 % tinggi (bobot tebal), rata tengah terhadap judul; rasio judul : kredit ±7–11×.
- Watak masuk: pelan, fade + naik dari kabut; tidak ada pop, tidak ada per-huruf. Teks tidak pernah menempel ke subjek; tampil sendiri di langit kosong.

### 3. Ritme
- 8–10 cut keras (pace_read 8 = 10,2/menit; deteksi ffmpeg 10), shot median 3,5 dtk, event visual 28/menit. Gerak lebih banyak di dalam shot daripada antar-shot.
- Cepat di babak rumah (0–24 dtk: shot 1–4 dtk, ganti benda tiap 1–2 ketukan), lambat di babak terbang (24–45 dtk: satu shot langit ±14 dtk untuk judul).
- Cut jatuh dekat bunyi glockenspiel/pizzicato (earshot: cut 2,5 / 9,5 / 12,9 / 28,3 / 45,1 dtk dalam ±60 ms dari nada; cut 11,7 dtk tanpa bunyi), bukan pada whoosh.

## TEKNIK (boleh dipinjam referensi lain; selalu dikenakan pengikat kiblat)

### 4. B-roll / footage
- Tidak ada footage. Semuanya ilustrasi 2,5D (bentuk datar + bayangan render, kabut, flare).

### 5. Motion graphic
- Urutan benda = cerita: jendela kota (rindu) → kalender dibalik bulan per bulan 2025→2026 → tanggal 20 Agustus dilingkari → jam berdetak → pintu → kertas kalender beterbangan → koper merah di cakrawala → pesawat kertas melintasi gedung → pesawat → kota dari jendela pesawat → sayap → langit + judul → pintu abu-abu.
- Satu ide visual per adegan; benda simbolik, bukan diagram.
- Gerak benda organik dan lambat: halaman kalender melengkung saat dibalik, kalender berputar (roll ±100° dalam 4 dtk), jarum jam berjalan, kertas melayang, pesawat kertas meluncur diagonal.
- **Skala subjek:** SATU subjek besar, sering melewati tepi frame: angka "2026" 36 % lebar × 38 % tinggi; jam close-up melewati frame lalu ±45–66 % tinggi saat ditarik mundur; pintu ±48 % lebar × 100 % tinggi; koper merah 89 % lebar × 19 % tinggi di sepertiga bawah; pesawat siluet 18 % × 25 %; pesawat kertas ±15 % lebar (perkiraan visual). Tidak ada adegan banyak objek kecil kecuali kertas beterbangan (16 dtk).
- **Kedalaman:** 3 lapis tetap: latar berkabut/langit (terang, rendah kontras) · subjek tajam · lapisan depan cahaya (flare, pita cahaya, bokeh bulat lembut). Adegan kota: bangunan dekat gelap dan besar, jauh pucat masuk kabut (perspektif udara kuat); paralaks saat kamera maju. Porthole pesawat = bingkai depan buram abu `#747474`–`#999999`.

### 6. Kamera & transisi
- Kamera virtual selalu bergerak pelan (estimasi cv2, kasar): jendela pull ±8 % + tilt; kalender push ±7 %; kalender meja roll ±100°; jam pull ±35 %; kota push ×1,5 dalam 3,5 dtk sambil mengikuti pesawat kertas; jendela pesawat push ×2,2; langit judul geser lateral pelan.
- Transisi memakai benda: halaman kalender membalik = wipe ke tahun berikut; flash cahaya putih (light leak) jam → pintu; kertas kalender terbang → menjadi pesawat kertas (match by object); pesawat kertas → pesawat sungguhan (match cut 23,7 dtk); bingkai jendela pesawat menyapu masuk sebagai iris (±29 dtk); kota → langit lewat fade putih; akhir: cut ke pintu abu-abu.
- Cut keras sedikit; sebagian besar perpindahan adalah dissolve/flash 4–8 frame atau wipe benda.

### 7. SFX
- Hampir tanpa SFX terpisah: earshot melabeli 2 whoosh (2,7–3,1 dtk saat halaman dibalik; 15,4 dtk), 1 riser/reverse cymbal (42,1 dtk sebelum penutup), sisanya nada musik. Tidak ada klik/pop untuk teks.
- Detik jam (tick-tock) terdeteksi lemah di bagian jam (AST "tick").

### 8. Musik
- Orkestra kecil "inspirational": pizzicato strings + glockenspiel + celesta + orchestral stab (0–24 dtk), berganti gitar akustik sendu (24–42 dtk, babak terbang), kembali pizzicato + riser untuk penutup (42–47 dtk).
- librosa 136 bpm (kemungkinan 68 terasa); centroid median 750 Hz (lembut, gelap).
- Mix −14,3 LUFS, true peak −0,7 dBTP, LRA 3,8 LU; level per 3 dtk −25 (intro) → −17 sampai −20 → puncak −15,4 di 33–36 dtk (judul) → senyap 45,8 dtk.

## Proporsi terukur (11 Nov, dari video sumber 1280×720; % terhadap frame 16:9)
| Jenis adegan | Kata kunci (% tinggi) | Kata sambung | Posisi teks | Skala subjek | Kedalaman |
|---|---|---|---|---|---|
| Interior + jendela kota (k1) | tanpa teks | – | – | jendela ±70 % lebar, miring (perkiraan visual) | dinding gelap + kota senja + flare |
| Tipografi kalender (k2) | "2026" 38 | tanggal 5 (rasio ±7,5) | tahun kiri (x 3–39 %), grid tanggal kanan | angka tahun mengisi tinggi | kertas datar, tanpa vignette |
| Kalender close-up lingkar (k3) | "20" 10–12 | – | grid miring, lingkar merah sebagai penekanan | angka besar, grid melewati frame | satu bidang, roll kamera |
| Objek jam (k4) | tanpa teks | – | – | 1 jam ±45–66 % tinggi (perkiraan) | dinding gelap + jam + bocor cahaya kuning |
| Pintu + cahaya (k5) | tanpa teks | – | – | pintu ±48 % lebar × 100 % tinggi | dinding · pintu · pita cahaya depan |
| Koper di cakrawala (k6) | tanpa teks | – | – | koper 89 % × 19 % sepertiga bawah | langit haze · koper · matahari di belakang |
| Kota + pesawat kertas (k7) | tanpa teks | – | – | gedung dekat ±40 % lebar, pesawat kertas ±15 % (perkiraan visual) | perspektif udara kuat, paralaks |
| Judul + kredit (k8) | "Merantau" 24 (besar) → 17 | kredit 1,5–2,4 (rasio 7–11) | besar: tengah-bawah (51 %, 76 %); akhir: kiri (27 %, 39 %) | pesawat kecil ±2 % sebagai titik | langit biru pucat + pita cahaya diagonal |

## Cek kemiripan (dipakai juri saat menyandingkan still)
- Satu benda simbolik per adegan, besar (≥ 45 % tinggi atau melewati tepi frame); bukan banyak ikon kecil.
- Ada lapisan cahaya depan di hampir tiap still: matahari putih + flare + pita cahaya miring.
- Latar selalu berkabut/rendah kontras; subjek lebih tajam dari latar (perspektif udara terlihat di adegan kota).
- Babak awal hangat-gelap (`#25262B`, kayu `#7D502B`), babak akhir biru pucat (`#C4D8D7`→`#5F6F89`); tidak ada warna neon atau gradien jenuh.
- Satu aksen merah (`#B03840`–`#B53C46`) atau merah tua koper; tidak ada aksen kedua.
- Tipografi benda: angka tahun sans sangat tebal ±38 % tinggi vs angka kecil ±5 % (rasio ≥ 7).
- Judul script tipis putih kebiruan di langit kosong, tidak menempel pada subjek; kredit monospace ≤ 2,5 % tinggi.
- Tidak ada caption, ikon UI, atau teks berjalan; tanpa outline/garis tebal.
- Transisi memakai benda (halaman dibalik, kertas → pesawat, bingkai jendela) atau flash cahaya; cut keras ≤ 12/menit.

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
