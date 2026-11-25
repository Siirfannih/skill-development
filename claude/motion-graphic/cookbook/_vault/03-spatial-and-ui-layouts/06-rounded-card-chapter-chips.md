---
id: "06"
pola: Rounded Card Chapter Chips
kategori: layout
kategori_lain: [typography]
trigger: product film atau landing video berbabak (intro, masalah, solusi, ajakan); pengenalan aplikasi dengan tempo lega; kalimat pembuka yang muncul kata per kata
sumber: Sleeko, product film "HowDo" · 16:9 · ±0:43
dilihat_bergerak: tidak
diukur: tidak
alias: []
---
# 06 · Rounded Card Chapter Chips

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: Sleeko, product film "HowDo" · 16:9, ±0:43 (dari sheet) · Frame: `../../guide/referensi/sheets/06-sleeko-howdo.jpg` (1 frame per 1,85 dtk) · Frame kunci: tidak ada (hanya contact sheet) · Bedah: tidak ada (dari contact sheet + ukur 6 Nov di `../../guide/referensi/README.md`)
> Video sumber: tidak ada di mesin ini
> Dilihat bergerak: **tidak** (isi dari frame diam; gerak belum dilihat, jangan pinjam teknik gerak sebelum videonya didapat). Bedah tipis, tanpa laporan periksa.

**Inti mekanik (1 kalimat):** Semua isi hidup di dalam satu kartu putih bersudut membulat di atas gradien hitam-ke-ungu, teks kecil elegan muncul kata per kata di tengah kartu, dan satu baris chip babak di bawah kartu menjadi peta posisi dengan tepat satu chip aktif.
**Narrative trigger:**
- Product film berbabak yang butuh penanda posisi (Intro / Problem / Use Case / Call to Action) → T1, T3
- Kalimat pembuka lega yang dibaca kata per kata ("Every day, there's something exciting to…") → T2
- Menampilkan aplikasi dengan kartu UI kecil melayang di sekitar ponsel → T4
- Footage tenang (lanskap, tangan + ponsel, kemasan) yang tidak boleh memenuhi layar → T1
**Jangan dipakai untuk:** reels cepat 9:16, talking head, konten berenergi tinggi.
**Kata kunci gaya:** premium, tenang, lega, ungu, elegan
**Diambil untuk:** tidak disebut (referensi tipis; bagian terkuat dari sheet: kartu membulat + chip babak).

## Kondisi footage asli
- 16:9 landscape. Footage lanskap lembut (padang bunga, awan), monitor di meja dengan orang, tangan memegang ponsel, kemasan kardus berkode QR; semuanya hidup di dalam kartu membulat, tidak pernah penuh layar.
- Kartu teks hampir kosong (ruang kosong jauh lebih luas dari teks). Gerak kamera belum dilihat.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Ungu ±62 % + putih (histogram hue). Latar luar gradien hitam di atas ke ungu-magenta di bawah; kartu isi putih bersudut membulat dengan kabut ungu lembut di tepi bawah. Penutup: kartu menjadi gelap dengan logo samar (0:42). Hex tidak terukur.
### Teks
Sans tipis ungu tua di kartu putih, satu baris di tengah kartu, tinggi huruf ±4–5 % frame, ≤ 5 kata per tampil. Kata yang baru masuk tampak lebih pucat dari kata sebelumnya. Di atas footage: logo putih di tengah (0:14), teks UI kecil putih (0:20). Chip babak: teks sangat kecil di kotak putih; chip aktif hitam dengan teks putih. Cara keluar belum dibedah.
### Ritme
5 cut/menit, shot median 8,5 dtk, 27 event visual/menit; satu-satunya referensi lambat di kelompok awal. Jeda belum dibedah.

## Pola

### T1 · Single Rounded Card Stage · layout
- **Trigger:** product film yang butuh footage dan teks berbagi satu panggung tenang.
- **Yang terlihat (termasuk gerak):** satu kartu putih membulat di tengah, gradien hitam-ke-ungu mengelilingi; footage (lanskap 0:14, monitor + orang 0:17–0:20, tangan + ponsel 0:24, kemasan QR 0:29–0:31) memenuhi kartu, bukan frame. Transisi antar-kartu lembut dan panjang, easing ease-out (bukan linear); durasi belum dibedah. (sheet: seluruh video)
- **Kenapa bekerja:** bingkai tetap membuat semua konten terasa satu keluarga; sudut membulat dan ruang kosong menjaga rasa premium.
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): gradien luar → kartu `border-radius: 28px` dengan kabut ungu di tepi bawah → footage/teks di dalam `overflow: hidden`.
  - Gerak: konten berganti dengan cross-dissolve + `scale 1,04→1` di dalam kartu, `CURVE.reveal` 24–36 f; kartu sendiri tetap; hold ≥ 1,5 dtk dengan `drift(frame, fps, 3)`.
  - Ruang: datar atau `perspective: 1200px` sangat ringan pada kartu.
  - Blur & blend: kabut tepi bawah = gradien ungu + `filter: blur(40px)`; tanpa motion blur.
- **SFX:** famili `stab` · senyap atau `Lasertransision.mp3` (ting lembut) di pergantian babak; musik bergerak tetapi tidak mendorong.
- **Pakai bila:** footage beragam kualitas yang perlu dibingkai. · **Jangan pakai bila:** footage harus penuh layar untuk drama.
- **Remix (anti-jiplak):**
  1. Aplikasi fintech → pertahankan satu kartu membulat sebagai panggung · ganti ungu menjadi biru laut, kartu putih menjadi putih hangat.
  2. Latar terang → pertahankan bingkai kartu · ganti gradien gelap menjadi pastel dan kartu menjadi putih dengan bayangan lunak.
  3. 9:16 → kartu membulat vertikal 86 % lebar, chip babak di bawah.
- *Pengamatan di video asli, bukan target:* shot median 8,5 dtk; transisi lembut panjang.

### T2 · Word-by-Word Pale Fade Line · typography
- **Trigger:** kalimat pembuka bernada puitis atau mengajak.
- **Yang terlihat (termasuk gerak):** satu baris ungu tua di kartu putih muncul kata per kata ("Every" → "Every day, there's something" → "exciting to"); kata yang baru masuk tampak lebih pucat daripada kata sebelumnya ("Whatever you are" → "can guide you"). (0:01–0:07, 0:26–0:28)
- **Kenapa bekerja:** tempo kata per kata mengikuti napas VO; kartu putih kosong membuat kata kecil tetap menjadi pusat.
- **Mekanik Remotion (titik awal):**
  - Lapisan: kartu putih → baris teks di tengah.
  - Gerak: tiap kata `opacity 0,25→1` + `translateY(6px→0)` `CURVE.reveal` 10 f, jeda ±8 f antar kata; kata sebelumnya tetap pada opacity 1.
  - Ruang: datar. Blur & blend: tanpa.
- **SFX:** senyap (kata KT per kata selalu senyap, `../../guide/sfx/GUIDE.md`).
- **Pakai bila:** ≤ 5 kata per tampil. · **Jangan pakai bila:** kalimat harus terbaca utuh dari frame pertama.
- **Remix (anti-jiplak):**
  1. Landing video SaaS → pertahankan kata per kata dengan kata baru lebih pucat · ganti ungu tua menjadi arang.
  2. Latar gelap → teks putih, kata baru lebih redup.
  3. 9:16 → baris dipecah 2 baris, 3 kata per baris.
- *Pengamatan di video asli, bukan target:* huruf ±4–5 % H, ≤ 5 kata per tampil.

### T3 · Chapter Chip Progress Map · layout
- **Trigger:** video berbabak yang perlu menunjukkan posisi tanpa narasi tambahan.
- **Yang terlihat (termasuk gerak):** empat chip di bawah kartu (Intro / Problem / Use Case / Call to Action), selalu ada, tepat satu aktif (hitam dengan teks putih), berpindah seiring babak: Intro aktif di 0:00 (chip pudar di 0:01,9), Problem 0:03,7–0:11, Use Case 0:13–0:35, Call to Action 0:37–0:42. Perpindahan chip menyusul pergantian konten. (sheet, seluruh video)
- **Kenapa bekerja:** penonton selalu tahu di bagian mana ia berada; chip kecil tidak berebut dengan kartu.
- **Mekanik Remotion (titik awal):**
  - Lapisan: baris chip (flex, jarak sama) di bawah kartu → chip aktif sebagai "pil hitam" yang bergeser.
  - Gerak: pil aktif `translateX` ke chip berikut `CURVE.land` 10 f; chip pasif opacity 0,6; pergantian terjadi 6–10 f sebelum konten berganti.
  - Ruang: datar. Blur & blend: tanpa.
- **SFX:** famili `ui` · senyap atau `ES_User Interface, Click, UI Buttons, Confirm, Menu` (ding pendek) tiap pindah babak, satu bunyi saja.
- **Pakai bila:** 3–5 babak berurutan. · **Jangan pakai bila:** video di bawah 20 dtk.
- **Remix (anti-jiplak):**
  1. Presentasi proposal → pertahankan satu chip aktif dari empat · ganti nama babak menjadi Konteks / Rencana / Biaya / Langkah.
  2. Latar terang → chip aktif biru tua, pasif abu.
  3. 9:16 → chip menjadi titik vertikal di tepi kiri.
- *Pengamatan di video asli, bukan target:* chip aktif hitam, teks sangat kecil; 4 chip tetap.

### T4 · Floating UI Card Constellation · layout
- **Trigger:** memperkenalkan aplikasi dengan banyak fitur kecil.
- **Yang terlihat (termasuk gerak):** mockup ponsel dengan UI aplikasi di tengah, kartu UI kecil melayang di sekitarnya (0:33–0:37); kolase foto dan objek 3D mengelilingi teks tengah ("but find the solution", 0:11); cincin ungu kecil di tengah (0:12); kursor mengklik di dalam UI (0:22). Pola animasi dan durasi belum dibedah. (sheet 0:11–0:12, 0:22, 0:33–0:37)
- **Kenapa bekerja:** objek mengelilingi satu pusat sehingga mata tetap di tengah; kartu kecil memberi rasa fitur banyak tanpa daftar.
- **Mekanik Remotion (titik awal):** gerak belum dibedah; titik awal berikut hanya struktur.
  - Lapisan: gradien → kartu melayang di belakang ponsel (blur 3 px) → ponsel → kartu depan (tajam) → kursor.
  - Gerak: kartu masuk dengan jeda tidak rata `react(i, fps)` dari pusat ke luar, `CURVE.land` 12 f; `drift` per kartu dengan biji berbeda.
  - Ruang: `perspective: 1200px`, kartu di `translateZ` −80…+60 px.
  - Blur & blend: kartu belakang `blur(3px)`; bayangan lunak.
- **SFX:** famili `ui` · `pop up.mp3` satu kali untuk kartu pertama; sisanya senyap; `ES_User Interface, Click, UI Buttons, Confirm, Menu` saat kursor mengklik.
- **Pakai bila:** 4–8 fitur dengan ikon sederhana. · **Jangan pakai bila:** fitur harus dijelaskan satu per satu.
- **Remix (anti-jiplak):**
  1. Aplikasi kasir UMKM → pertahankan kartu mengelilingi ponsel · ganti isi kartu menjadi struk, produk, notifikasi pesanan.
  2. Latar terang → kartu putih dengan bayangan lunak di pastel.
  3. 9:16 → kartu mengapit ponsel kiri-kanan, 2 per sisi.
- *Pengamatan di video asli, bukan target:* ponsel dengan UI 0:33–0:37; belum diukur.

## Audio (bila dibedah)
Musik ±117 bpm (ragu oktaf; perkiraan dari mix), tetap bergerak tetapi tidak mendorong. SFX, genre, level, perubahan per babak: belum dibedah.

## Yang harus terasa sama saat disandingkan
- Semua isi berada di satu kartu membulat, latar luar gradien gelap ke ungu?
- Chip babak selalu ada di bawah kartu dengan tepat satu chip aktif?
- Teks satu baris di tengah, ≤ ±5 % tinggi frame, ≤ 5 kata?
- Ruang kosong kartu jauh lebih luas dari teks?
- Footage di dalam kartu berwarna lembut dan tidak penuh layar?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
