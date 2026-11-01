# Audit independen PKS v9 (2 Nov 2026)

Reviewer: subagen QC baru, tidak ikut membuat video. Bahan yang dilihat: 266 frame v9 (2 fps, 960 px), dilihat semuanya lewat 17 contact sheet. 30 frame yang mencurigakan dibuka penuh di 960 px. Pembanding: 14 screenshot keluhan Irfan (v8), `hybrid-motion-standard.md`, `analysis-qa.md` §16.2/§16.4, `AUTORUN-2NOV.md`, `FEEDBACK-2NOV-0016.md`, dan `AUDIT-V8-2NOV.md` (untuk mengecek temuan lama yang belum beres).
Koordinat ditulis dalam skala 1920×1080. Audio **tidak** dinilai karena tidak ada render v9 penuh beraudio, jadi R7 tidak diberi skor.

## 0. Status keluhan screenshot Irfan (v8 → v9)

| Screenshot v8 | Status di v9 |
|---|---|
| 0:00 "AI is the" + Gates | **Belum beres**: Gates tampil dobel (ghost) dan "BIGGEST" terpotong kepala |
| 0:03 "technical thing ever in my lifetime" | **Belum beres**: masih sebaris subtitle di kiri bawah |
| 0:09 "this time pr gress was" | **Belum beres, identik**: "progress" masih tertutup presenter |
| 0:22 Wikipedia + kotak warna | **Belum beres**: kotak dekoratif oranye/ungu/pink/hijau masih ada |
| 0:24 "JANJI" grid biru + kurva putus-putus | **Belum beres, identik** |
| 0:32 flash radial putih | Beres (sekarang daftar centang di latar hitam) |
| 0:35 bar "8 jam" + kartu blur di belakang | **Belum beres, identik**, ditambah "45 menit" dengan masalah sama |
| "DITEPATI" kurva biru | Beres (diganti daftar centang, sesuai F3) |
| 0:57 Jensen "not gonna lose a JOB" | **Belum beres, identik** (kartu kecil di atas, teks menindih badan) |
| 1:14 Altman "SINGLE BILLION COMPANY" + teks orbit | **Belum beres, identik** (dua lapis teks bertabrakan, COMPANY keluar tepi kiri) |
| 1:31 landing "Cofounder" yang berulang | Beres (kartu mengorbit logo ChatGPT, sesuai F1) |
| 1:46 "MEMBANGUN" dengan cahaya kotak | **Belum beres**: kotak cahaya bersudut keras masih terlihat, teks abu |

Hasilnya, 9 dari 12 keluhan yang Irfan tunjukkan dengan screenshot masih muncul di v9. Ini temuan paling berat: v9 belum menjawab keluhan yang sudah ditunjuk langsung.

Temuan lama dari AUDIT-V8 yang juga masih ada:
- B5 (1:58, bidang abu gelap)
- B8 (1:04, kartu linimasa)
- B9 (1:10, grafik di dalam kotak)
- B10 (1:12, Altman)
- B11 (1:18–1:22, grid kosong)

## 1. Tabel cacat

Severity: P0 = rusak/jelek, P1 = lemah, P2 = polish.

| # | Waktu | Adegan | Cacat | Aturan yang dilanggar | Sev | Saran perbaikan |
|---|---|---|---|---|---|---|
| 1 | 0:00–0:01 | Bill Gates CNBC | Dua lapis Gates tumpang tindih: wajah kaget + wajah tenang (f1), Gates kedua mengintip di belakang kepala (f3) | tidak boleh ada layer dobel/ghost | **P0** | Pakai satu klip saja, atau hard cut. Kalau memakai matte kepala, matte harus dari frame klip yang sama (offset 0) |
| 2 | 0:00–0:01 | "AI / is the / BIGGEST" | Blok teks di kuadran kiri atas (x 75–1350, y 180–430). Huruf "T" pada BIGGEST terpotong kepala sehingga terbaca "BIGGES". Kalimat ditumpuk 3 baris | teks tidak boleh di kiri atas; satu kalimat satu baris; keterbacaan | **P0** | Satu baris anchor di ruang kosong backdrop kiri, sumbu tengah: "AI" + "BIGGEST" pada y 480–640, x 120–900. Masking di belakang kepala hanya boleh kalau ≥ 90 % huruf tetap terbaca |
| 3 | 0:01.5–0:03 | Kerumunan / laptop / kafe malam | "technical thing ever in my lifetime" tampil sebagai subtitle kecil di kiri bawah, menutupi lengan dan laptop. "lifetime" memakai tracking berbeda | Rule of Extraction; peran sama = gaya sama | P1 | Ekstrak "LIFETIME" sebagai anchor besar di tengah. Kata lain pakai mask-reveal kecil satu baris di y ≈ 760 |
| 4 | 0:03.5 | Remaja + pewawancara | Angka "16" raksasa ter-blur menimpa kepala pewawancara | satu fokus | P2 | Mulai "16" di ruang kosong jendela (x 420–900), bukan di atas kepala |
| 5 | 0:04.5–0:05.5 | Makro kaos hitam | Teks 4 baris ditumpuk ("16 year old / LAUNCHED / a new AI company") dengan 4 ukuran berbeda. 60 % frame hitam tanpa informasi | satu baris per kalimat; ruang kosong yang disengaja | P1 | Pilih anchor "16" dan "LAUNCHED" saja dalam satu baris di tengah. Sisa kata pakai treatment kecil |
| 6 | 0:06–0:07.5 | Bloomberg | "raised over a / BILLION / dollars" ditumpuk 3 baris di kiri | satu baris per kalimat | P2 | Satu baris "raised over a BILLION" di y ≈ 620, x 120–900 |
| 7 | 0:08.5–0:10 | Grafik "AI progress" + kolase foto | Huruf "o" pada "progress" tertutup presenter sehingga terbaca "pr gress", **identik dengan screenshot keluhan**. "FAST" menindih kartu foto dan thumbnail Wikipedia. Kolase terpotong di semua tepi | teks tidak tumpang tindih objek; no ghost; keluhan langsung Irfan | **P0** | Taruh baris kata di bawah kartu grafik (y 860–940) di ruang hitam kosong. "FAST" ditengahkan di y ≈ 600 dengan zona aman 1000×260 tanpa kartu. Kolase diredupkan 40 % dan blur |
| 8 | 0:10.5–0:11 | Cakrawala bumi biru | "SADAR" bagus, tetapi f23 menampilkan 0,5 dtk cakrawala tanpa isi | tidak ada frame mati | P2 | Potong 8–10 frame, atau masukkan objek berikutnya lebih awal |
| 9 | 0:11.5–0:12 | "BERLOMBA-LOMBA" + ikon AI | Ikon Gemini menutup huruf O sehingga terbaca "LC✦BA". Kata menempel tepi kiri (x ≈ 20). Ikon ChatGPT terpotong tepi atas. Latar biru muda tidak punya makna | teks tidak tertutup objek; area aman; warna harus bermakna | **P0** | Ikon berlomba di jalur atas (y 220–380) dan bawah (y 720–880). Kata di jalur tengah y ≈ 540 dengan margin ≥ 120 px. Latar hitam atau putih sesuai makna |
| 10 | 0:13.5–0:14 | Pictogram spotlight (disukai) | "PENGGANTI" menimpa kepala dan dada pictogram yang menjadi subjek spotlight | teks tidak menutupi subjek (di sini subjek, bukan ruang kosong) | P1 | Taruh di lantai spotlight di bawah elips (y ≈ 900), atau di ruang gelap kiri x 160–760 |
| 11 | 0:15–0:18 | Zoom ke pictogram putus-putus | Pictogram setengah terpotong di tepi kiri selama 3 dtk. Lengkung putus-putus raksasa memenuhi frame ±1 dtk tanpa makna baru | elemen harus berelasi | P2 | Pertahankan sebagai transisi, tetapi persingkat lengkung raksasa jadi ≤ 0,5 dtk |
| 12 | 0:19.5–0:22.5 | Wikipedia ChatGPT | Kotak warna oranye/ungu/pink/hijau murni dekorasi. Kartu terpotong kiri-kanan saat zoom (0:21) | tidak ada warna tanpa alasan; keluhan screenshot | P1 | Hapus 4 kotak warna. Kalau perlu aksen, satu sorotan highlight pada "November 30, 2022" saja |
| 13 | 0:23–0:24.5 | "JANJI" grid biru royal + kurva putus-putus | **Identik dengan screenshot keluhan.** Latar biru royal/navy, kurva tipis di kiri bawah, "JANJI" di kiri bawah, dan 1 dtk pertama hanya grid kosong | tidak ada biru gelap; frame mati; keluhan langsung | **P0** | Hapus grafik. Sambung ke kartu tugas (0:25) di latar hitam, "JANJI" ditengahkan di y 540 lalu kartu masuk. Kalau mau tetap kurva: garis solid vs titik-titik putih di latar hitam (editorial) |
| 14 | 0:25–0:28 | Kartu tugas diseret ke dock WA/Notion/Sampah | Daftar menempel tepi kiri/atas (0:26, 0:28; kartu terpotong x = 0 dan y = 0). Kartu seret mini ±18 px @1080 tidak terbaca. Kartu seret menutup "Balas email pelanggan" (0:27.5). Framing melompat tiap 0,5 dtk | area aman; keterbacaan HP; satu fokus | P1 | Kunci komposisi: daftar di x 480–1080 dan dock di x 1240–1700, sejajar y ≈ 560. Kartu seret ukuran penuh, kamera mengikuti kursor (close-up tracking) |
| 15 | 0:28.5–0:30.5 | Pembuka "KREATIF" (disukai) | Jajar genjang kosong abu/putih tampil ±2 dtk sebelum kata muncul, terbaca sebagai placeholder | tanpa bentuk placeholder | P1 | Kata masuk ≤ 8 f setelah bidang mendarat, atau bidang masuk bersama kata |
| 16 | 0:31–0:31.5 dan 1:45.5–1:47.5 | KREATIF / MEMBANGUN / MERENCANAKAN | Ada **kotak cahaya persegi bersudut keras** di belakang jajar genjang (0:31.5: tepi vertikal di x ≈ 740; 1:45.5: kotak x 810–1830, y 340–850), sama dengan keluhan screenshot 1:46. MEMBANGUN/MERENCANAKAN abu di atas putih, padahal KREATIF hitam pekat, jadi peran yang sama memakai gaya berbeda | tidak ada cahaya kotak/keras; peran sama = gaya sama; kontras | **P0** | Ganti kotak cahaya dengan falloff radial/feather ≥ 200 px tanpa tepi. Semua kata di bidang ini hitam #111 dengan bobot sama seperti KREATIF |
| 17 | 0:32–0:34 | Daftar dicentang + "DITEPATI" | Posisi dan skala daftar berpindah 4× dalam 2 dtk (kiri atas → tengah → kanan atas kecil → kiri). Daftar terpotong tepi bawah (0:32). DITEPATI berpindah sisi | layout sama maks 2 beat, tetapi juga satu fokus dan kamera sebagai alat fokus, bukan lompat acak | P1 | Satu push-in kontinu: daftar di x 360–960 tetap, DITEPATI masuk kanan x 1080–1700 pada centang ke-3 |
| 18 | 0:34.5–0:36.5 | Bar "8 jam" → "45 menit" | **Identik dengan screenshot keluhan.** Kartu blur menjadi layer hantu di belakang bar. Bar berupa pil putih polos dengan noda abu. Knob "45 menit" berupa gumpalan putih. Track kosong tanpa skala | no ghost/double layer; visual is king (tanpa placeholder) | **P0** | Cut bersih ke hitam (kartu dibuang). Track tipis 6 px dengan label "0" dan "8 jam" di ujung. Fill putih whip-compress ke 45 menit dengan motion blur. Angka di ujung fill, bukan di tengah gumpalan |
| 19 | 0:39–0:40.5 | Daftar memanjang + "TAHAP INI" | Daftar mengecil, tinggi baris ±25 px dengan teks ±6 px @1080, tidak terbaca di HP. Anchor "TAHAP INI" tidak membawa emosi (yang penting "TIDAK BERHENTI") | keterbacaan HP; Rule of Extraction | P1 | Pilih anchor "TIDAK BERHENTI". Daftar cukup 5–6 baris dengan skala ≥ 32 px teks, sisanya keluar frame atas (scroll) |
| 20 | 0:41–0:45 | Ketik prompt agent (disukai) | Kontainer input terpotong kanan saat close-up (bisa diterima). Teks UI berakhir titik "jalankan." | tanda baca (pengecualian: UI asli) | P2 | Biarkan, atau hapus titik akhir |
| 21 | 0:46 | "PERSIS" + maskot agent | Maskot ungu menutup huruf "S" terakhir sehingga terbaca "PERSI". Maskot lain berserakan tanpa jarak | teks tidak tumpang tindih objek; bagian yang disukai tidak boleh turun kualitas | **P0** | Maskot di busur mengitari kata dengan clearance ≥ 60 px. Kata di tengah x 700–1220, y 300–420 |
| 22 | 0:46.5–0:49.5 | Papan agent (disukai) | Tag "CEO Agent" menimpa teks "@CEO Agent" di input (0:47–0:47.5). Tag "CE" terpotong tepi kartu (0:48). Pan memotong teks kartu ("n penjualan minggu ini", 0:49.5). Label di shot lebar ±10 px @960 | tidak ada tumpang tindih; keterbacaan HP | P1 | Kursor agent mendarat di atas/samping input (offset y −70). Pan berhenti dengan margin kartu ≥ 80 px |
| 23 | 0:50.5–0:53.5 | "PERLAHAN" + pictogram putus-putus | Garis putus-putus dan bar cahaya menembus huruf. Kata duduk di atas badan pictogram | teks tidak tumpang tindih objek | P1 | Kata di bawah lantai (y ≈ 930) atau garis di-mask 40 px di sekitar kata |
| 24 | 0:54–0:55 | "TEMPAT KITA" | Baseline di y ≈ 1040, di luar title-safe (bawah 5 %) | area aman | P1 | Naikkan ke y 860–960 |
| 25 | 0:55.5 dan 1:10.5 | Frame dalam frame | Adegan menyusut ke kartu berbingkai dengan border terlihat sebagai transisi. 1:10.5 = grafik dalam kotak kecil (B9 v8 belum beres) | transisi Apple mulus; tidak ada kotak/boxy | P1 | Ganti dengan match-cut spasial atau snap zoom. Tanpa kontainer berbingkai |
| 26 | 0:56–1:01 | Jensen Huang | **Identik dengan screenshot keluhan.** Klip hanya ±58 % lebar dan menempel di separuh atas, 40 % bawah kosong mati. "not gonna lose a JOB" / "SOMEBODY who uses AI" menimpa badan dan tangan. Huruf "a" mini | keseimbangan; ruang kosong; teks jangan menutupi subjek; keluhan langsung | **P0** | Klip full-bleed (atau kartu ≥ 85 % lebar di tengah). Teks satu baris di ruang kosong backdrop ungu kanan (x 1150–1800, y 380–520) atau di bawah klip di area gelap, tidak di atas tangan |
| 27 | 1:01.5 dan 1:04 | Cakrawala | Masing-masing 0,5 dtk frame tanpa isi | frame mati | P2 | Potong |
| 28 | 1:04.5–1:05.5 | Linimasa GPT-3 → GPT-5 | Linimasa hanya di separuh atas, separuh bawah kosong. Kartu GPT-5 menindih "o1". Saat whip, kartu berubah jadi **blok abu polos + gumpalan ungu** (1:05.5) | tanpa placeholder; area aman; B8 v8 | **P0** | Linimasa di sumbu tengah y 540. Saat whip pakai motion blur kartu asli (label tetap ada), jangan diganti blok abu |
| 29 | 1:06–1:10 | Grafik grid biru "ARAHNYA / JANJINYA" | Latar biru royal lagi (keluhan grid biru). Garis dan titik data menembus huruf ARAHNYA (1:08). JANJINYA di pojok kanan atas, di atas visual. Posisi label melompat | tidak ada biru gelap; teks tidak di atas visual; tidak tumpang tindih | **P0** | Latar hitam tanpa grid. Garis janji titik-titik vs garis realita solid putih. JANJINYA di ujung kanan garis titik-titik dan ARAHNYA di ujung garis solid, keduanya di kanan dengan jarak ≥ 40 px dari garis. Tidak pakai biru selain aksen solusi |
| 30 | 1:11–1:14.5 | Sam Altman + teks orbit | **Identik dengan screenshot keluhan.** "SINGLE BILLION COMPANY" bertabrakan dengan kata orbit "it is a legitimate". "COMPANY" terpotong tepi kiri (x < 0). "person" di dada | teks tidak tumpang tindih teks; area aman; satu fokus | **P0** | Pilih satu lapis. Anchor stack diganti satu baris "SINGLE PERSON BILLION" di bawah kartu (y 860), atau orbit hanya di setengah kanan elips. Margin kiri ≥ 120 px |
| 31 | 1:15–1:18.5 | Kolase foto putih "SATU / SUKSES" | Kata menempel ke foto (SATU menyentuh tile Altman, SUKSES mepet). ±20 tile terpotong tepi, ramai. Bingkai biru tile Altman tidak bermakna "solusi" | satu fokus; makna warna | P1 | Kolase blur 6 px dan opasitas 50 %. Zona aman 1000×300 di tengah. Bingkai sorotan putih/hitam, bukan biru |
| 32 | 1:19–1:22 | Grid kotak abu + 1 kotak biru → titik biru | Grid kotak abu terbaca placeholder. 1:21.5–1:22 = 1 dtk frame biru muda kosong dengan satu titik (B11 v8 belum beres) | tanpa placeholder; tanpa frame mati | P1 | Ganti grid dengan wajah/pictogram mini nyata (kerumunan pictogram), satu disorot. Potong frame titik kosong ≤ 6 f |
| 33 | 1:22.5–1:23.5 | Foto inset berbingkai vinyet | Foto tidak full-bleed, vinyet berbentuk kotak gelap | tanpa kotak | P2 | Foto full-bleed, grade gelap rata |
| 34 | 1:31.5, 1:33, 1:34.5 | Foto kerumunan "FOUNDER / CEO" | **Strip hitam di kiri frame** (x 0–330): foto tidak menutupi kanvas | render rusak | **P0** | Skala cover 1920×1080 (object-fit: cover), cek setiap foto pada keyframe kamera terluar |
| 35 | 1:32.5–1:35 | "FOUNDER / CEO" | Kata ditaruh di atas wajah kerumunan tanpa logika ruang kosong. Kata yang sama diulang 3 kali di 3 foto | ruang kosong | P2 | Pertahankan, tetapi geser ke zona langit/backdrop tiap foto |
| 36 | 1:36.5–1:38 | Kartu app (Resume AI, Habit AI, …) | Kartu saling menutup nama ("abit AI"). Kartu "Study AI" opasitas 30 % menjadi ghost (1:38) | no ghost; keterbacaan | P1 | Jarak antar kartu ≥ 24 px, z-order rapi, tanpa kartu semi-transparan |
| 37 | 1:38.5–1:43 | Pictogram hitam glossy berkaki di depan barisan kartu | Gaya karakter baru (solid hitam, berkaki, glossy), beda dari pictogram outline/rim-light di adegan lain. Kepala menutup kartu "Caption AI". "SUSAH" di y ≈ 940–1030 mepet bawah | konsistensi karakter (R3); area aman | P1 | Pakai pictogram rim-light yang sama dengan 0:13 dan 1:44. Kartu di atas kepala (y < 380). SUSAH di y 820–920 |
| 38 | 1:44–1:45 dan 1:51–1:52.5 | Jajar genjang putih kosong | Bidang putih kosong ditahan ±1,5 dtk, sekali dengan bola hitam polos | tanpa placeholder/frame mati | P1 | Isi segera dengan kata/UI, atau pendekkan ≤ 10 f |
| 39 | 1:48 | Pull-back ke kursi | Frame hampir kosong, satu kursi mini | frame mati | P2 | Mulai pull-back dari kursi besar tanpa jeda kosong |
| 40 | 1:53.5–1:56.5 | Bar input di jajar genjang putih | UI buatan sendiri yang generik (bar input polos di bidang putih), bukan produk asli. Teks memakai tanda kutip dan koma | UI produk asli; visual is king | P1 | Pakai UI ChatGPT asli (sudah ada di 1:27) di dalam layar, lengkap dengan bubble balasan |
| 41 | 1:57–1:59 | Pictogram abu datar + bidang abu gelap | Kontras ±1,3 : 1 di latar hampir hitam, nyaris tak terlihat. 2 dtk frame mati (B5 v8 belum beres). Gaya pictogram datar abu, berbeda lagi | kontras/keterbacaan; frame mati; konsistensi | **P0** | Pakai pictogram rim-light yang sama, layar mati dengan tepi rim tipis. Durasi ≤ 1 dtk, langsung masuk "TERTINGGAL" |
| 42 | 1:59.5–2:00 | "TERTINGGAL" | "TER" tertutup pictogram / keluar frame sehingga terbaca "RTINGGAL" lalu "TINGGAL". **Maknanya berubah** | teks terpotong; makna | **P0** | Kata utuh di kanan figur, x 520–1500, y 880–1000. Mask hanya kalau seluruh kata tetap terbaca |
| 43 | 2:00.5–2:03 | Barisan teater (disukai) | Baris atas layar terpotong tepi atas. Layar putih kosong menyilaukan (bloom keras) ±2 dtk sebelum logo muncul | cahaya tidak keras/boxy; tanpa placeholder | P1 | Layar langsung menampilkan logo/UI dengan glow lembut ≤ 40 %. Framing menyisakan margin atas ≥ 60 px |
| 44 | 2:08–2:12 | "PERAN KAMU" | Kepala pictogram mengintip di antara dua kata sehingga terbaca seperti huruf "O" nyasar ("PERAN O KAMU"). Badan figur di bawah teks, jadi teks berada di atas visual | teks di atas visual; elemen ambigu | P1 | Figur utuh di kiri (x 200–520), "PERAN KAMU" satu baris di kanan figur. Atau figur di belakang kata dengan kepala tertutup penuh |

**Jumlah: 15 P0 (#1, 2, 7, 9, 13, 16, 18, 21, 26, 28, 29, 30, 34, 41, 42), 20 P1, 9 P2, total 44 baris.** #16 mencakup dua titik waktu.

## 2. Rubrik R1–R7 (skor 1–5, lulus bila semua ≥ 4)

| R | Skor | Bukti |
|---|---|---|
| R1 timing di ketukan | 3 | Kata per kata muncul berurutan sesuai ucapan (0:00, 0:56, 1:11), tetapi tidak bisa diverifikasi ke beat atau suku kata tanpa audio. Ada beberapa tahan kosong 0,5–2 dtk (0:23, 1:21.5, 1:57) |
| R2 satu fokus | 2 | Tabrakan teks dengan objek/teks lain di 0:01, 0:09, 0:12, 0:46, 1:08, 1:13, 1:59. Kolase ramai di 0:09 dan 1:15 |
| R3 konsistensi karakter | 2 | Pictogram muncul dalam 4 gaya: outline putus-putus, rim-light, hitam glossy berkaki (1:39), abu datar (1:57). Palet melompat-lompat: biru royal, biru muda, putih, hitam |
| R4 keterbacaan HP | 3 | Anchor besar terbaca, tetapi ada daftar ±6 px (0:40), kartu seret mini (0:26), label agent ±10 px, "BIGGES"/"pr gress"/"TINGGAL" terpotong, dan abu di atas hitam (1:57) |
| R5 kebenaran produk | 3 | UI ChatGPT asli di 1:27 dan Wikipedia asli bagus. Ada blok abu placeholder (1:05.5), bar input generik (1:53), dan layar putih kosong (2:00) |
| R6 setara referensi | 2 | 9 keluhan screenshot masih identik. Kompas premium gagal (di bawah) |
| R7 audio | – | Tidak dinilai: tidak ada render v9 beraudio di bahan audit |

**Kompas premium: GAGAL.**
1. 1 frame = 1 pesan: ✗ (tabrakan teks)
2. Ruang kosong mewah: ✗ (frame mati, separuh frame kosong di 0:56 dan 1:04, kolase ramai)
3. Teks kinetik ikut suara: ~ (urutan benar, tetapi masih gaya subtitle di 0:01–0:03)
4. Transisi termotivasi: ✗ (frame-dalam-kotak di 0:55.5 dan 1:10.5, frame kosong)
5. Gerak halus berbobot: tidak bisa dinilai di 2 fps
6. Kedalaman dan tekstur halus: ~ (orbit kartu 1:28 dan teater bagus; grid biru datar)
7. UI besar didemokan seperti dipakai: ✓ (agent UI, daftar centang, ChatGPT)
8. Elemen kecil yang hidup: ✓ (kursor agent)
9. Konsistensi palet: ✗
10. Akhir yang mulus: ~ (fade bagus, tetapi ada "O" nyasar)

Satu butir gagal sudah cukup membuat R6 tidak lulus.

## 3. Jawaban

**(a) Tiga hal paling amatir**
1. **Tabrakan teks.** Teks terpotong atau tertimpa objek dan teks lain sampai kata salah terbaca: "BIGGES", "pr gress", "BERLOMBA-LC✦BA", "PERSI", "ARAHNYA" ditembus garis, "SINGLE BILLION COMPANY" bertabrakan dengan teks orbit, "RTINGGAL". Ini ciri paling jelas dari kerja yang belum di-QC frame per frame.
2. **Keluhan v8 dikirim ulang hampir identik.** Grid biru royal dengan kurva (0:23 dan 1:06), bar "8 jam" dengan kartu hantu, Jensen di kartu kecil, Altman dengan teks bertabrakan, kotak cahaya MEMBANGUN, dan Gates dobel. Bagi Irfan, ini lebih fatal daripada cacat baru.
3. **Frame mati dan bentuk placeholder.** Blok abu linimasa (1:05.5), jajar genjang putih kosong (0:29, 1:44, 1:51, 2:00), pictogram abu di atas hitam (1:57–1:59), grid kotak abu + titik (1:19–1:22), dan strip hitam di foto (1:31.5). Ditambah sistem visual yang tidak satu keluarga: empat gaya pictogram dan empat latar warna tanpa makna.

**(b) Apakah langsung ketahuan beda kelas di samping reel referensi premium bergaya Apple?** **Ya, langsung ketahuan.**
- Bagian yang setara referensi: orbit kartu ChatGPT (1:28–1:31), papan agent (0:41–0:49), spotlight pictogram (0:13–0:19), dan barisan teater (2:03–2:06).
- Bagian yang menjatuhkan kelas: grid biru, tabrakan teks, dan frame kosong. Semuanya muncul rata-rata tiap 8–10 detik, jadi penonton akan menangkapnya sebelum sempat terkesan oleh bagian yang bagus.
