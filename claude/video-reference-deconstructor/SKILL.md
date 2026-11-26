---
name: video-reference-deconstructor
description: Membedah video referensi menjadi primitif gerak atomik (kinetic typography, visual, kamera, transisi) yang terukur, bebas kulit referensi, dan lolos uji transfer, untuk diturunkan pabrik menjadi preset kode di skill-development. Pakai setiap kali kamu membedah, mensintesis, atau me-reverse-engineer video referensi, atau menulis brief untuk agen yang melakukannya.
---

# Video Reference Deconstructor

## 0. Kenapa skill ini ada

Tujuanku: setiap referensi bagus yang sudah kita bedah menjadi **preset gerak** yang bisa diambil model editing lalu disesuaikan ke frame-nya, sehingga model tidak menulis animasi dari nol di setiap video.

Kegagalan yang terus berulang, bahkan di Opus: hasil bedah berubah menjadi **template yang meniru referensi 1:1**. Penyebabnya ada tiga, dan semuanya dicegah di skill ini:

1. **Unit kerjanya salah.** Model membedah adegan (UI lengkap, latar, panel, objek), bukan cara bergeraknya. → §2 uji atomik.
2. **Metrik penilaiannya salah.** Hasil dibandingkan dengan tampilan referensi (kemiripan per frame, gambar kiri-kanan). Model lalu mengoptimalkan kemiripan kulit. → §6 uji transfer.
3. **Angkanya karangan.** Kata sifat dilarang, lalu model menggantinya dengan angka yang tampak presisi tapi tidak pernah diukur. → §3 aturan ukur.

Tiga hal yang dipindahkan dari referensi: **mekanik** (cara bergerak), **pemicu** (kapan dipakai dalam cerita), dan **alasan bekerja** (kenapa itu efektif bagi penonton). Kulitnya tidak pernah ikut.

## 1. Tiga lapisan setiap elemen

| Lapisan | Perlakuan | Contoh |
|---|---|---|
| **Mekanik** | Ukur, lalu jadikan parameter | perubahan skala, perpindahan (% frame), durasi (dtk), jenis kurva, urutan dan jeda stagger, arah, offset sinkron audio |
| **Pemicu + alasan bekerja** | Ekstrak, dan tulis dengan kata-katamu sendiri | "memecah talking head yang statis saat masuk ke poin baru; bekerja karena perubahan skala memberi tanda bab tanpa memotong suara" |
| **Kulit** | Buang, lalu jadikan slot | hex warna, nama font, maskot, ikon, UI aplikasi tertentu, isi teks, bentuk wadah khas (folder ungu, kartu post) |

Bukti terkuat bahwa sebuah mekanik bisa dipisah dari kulitnya: mekanik itu **muncul lebih dari sekali dengan kulit berbeda**, baik di dalam satu referensi maupun di referensi lain. Catat setiap kemunculannya.

## 2. Uji atomik: satu primitif, satu mekanik

Sebelum menulis primitif, uji: **jika satu bagian dibuang, apakah sisanya masih berfungsi sendiri?** Kalau ya, pecah menjadi dua primitif.

- "Talking head masuk ke wadah + teks mengapit kiri-kanan + ikon muncul bertahap dengan parallax" = **tiga** primitif, bukan satu.
- Kombinasi yang memang bagus disimpan sebagai **resep** yang hanya merujuk id primitif. Resep tidak boleh membawa kode atau kulit sendiri.
- Kalau deskripsi primitifmu menyebut benda (jendela UI, dock, wallpaper, panel chat), periksa ulang. Benda adalah slot, bukan mekanik. Kalau tanpa benda itu mekaniknya tidak bisa dijelaskan, kemungkinan besar yang kamu bedah masih adegan.

Lapisan primitif ada empat: **tipografi kinetik**, **visual** (permukaan, latar, tekstur, lapisan kedalaman), **kamera**, dan **transisi**. Sinkron audio bukan lapisan tersendiri. Ia menjadi parameter di dalam primitif (offset bunyi terhadap puncak gerak).

## 3. Aturan ukur dan kejujuran angka

1. **Ukur di fps asli.** Cek dengan `ffprobe`. Ambil frame di fps asli pada jendela gerak (video 30 fps: 1 frame = 0,033 dtk; gerak 0,35 dtk hanya punya ±10 sampel). Lembar kontak 2 fps hanya untuk peta struktur, tidak boleh untuk mengukur gerak. Cek juga frame duplikat (animasi 12/15/24 fps di kontainer 30 fps).
2. **Pastikan itu memang gerak, bukan cut.** Lacak propertinya per frame (lebar/tinggi bounding box, posisi pusat, opacity) memakai skrip, misalnya mask selisih warna terhadap latar. Kalau properti melompat besar dalam satu frame, itu **cut**, bukan easing. Jangan tulis kurva untuk cut.
3. **Kurva dari data, bukan dari ingatan.** Ubah lintasan yang terukur menjadi progres 0–1, lalu cocokkan ke jenis kurva terdekat. Bezier bawaan yang populer (misalnya `0.16,1,0.3,1` = easeOutExpo) adalah tanda bahaya: kalau tidak berasal dari plot, beri label `estimated`.
4. **Setiap angka punya label dan bukti.** `measured` (dari pelacakan frame, sertakan path skrip/data) atau `estimated` (dari pengamatan visual, sertakan alasan). Primitif dengan kurva `estimated` maksimal berstatus `teruji-sebagian`.
5. **Tidak ada kata sifat kosong**: smooth, cinematic, modern, clean, dinamis, premium. Ganti dengan besaran fisik. Kalau besarannya tidak bisa diukur, tulis "tidak terukur dari bahan ini", jangan dikarang.
6. **Jangan menebak font atau plugin.** Deskripsikan anatominya (grotesk netral + serif miring sebagai aksen 1–2 kata, tinggi huruf ±6% frame).
7. **Audio jujur.** Ukur dulu: kalau track bisu (≤ −80 dBFS), tulis `is_silent_stream: true` dan jangan mengarang SFX. Catat gerak yang sengaja dibiarkan tanpa bunyi.

## 4. Alur kerja

### Tahap 1 — Data objektif
Metadata (resolusi, fps asli, durasi, status audio), lembar kontak 2 fps untuk peta babak dan cut, deteksi cut (`select='gt(scene,0.3)',showinfo`), lalu ekstraksi frame fps asli pada setiap jendela gerak yang akan dibedah.

### Tahap 2 — Audit: pertanyaan, bukan jawaban
Untuk setiap jendela gerak, jawab dari data:
- **Kamera:** apa yang bergerak, kamera atau objek? Ke mana, seberapa jauh, berapa lama? Gerak kontinu atau cut?
- **Tipografi kinetik:** apa unit animasinya (huruf, kata, baris, pil)? Bagaimana penekanan dibuat? Di mana teks berada relatif terhadap subjek? Berapa lama teks bisa dibaca sebelum berubah?
- **Visual:** berapa bidang kedalaman? Dalam urutan apa elemen muncul? Apa yang berubah saat elemen lain bergerak?
- **Transisi:** cut atau termotivasi? Kalau termotivasi, objek apa yang membawa penonton dari adegan A ke B?
- **Ritme dan audio:** di mana bunyi jatuh relatif terhadap puncak gerak? Di mana ada jeda hening?

Jangan membawa angka "umumnya" ke tahap ini (misalnya "hold 3–4 dtk", "pre-hit −0,05 dtk"). Angka seperti itu membuatmu menemukan apa yang kamu harapkan. Kalau repo punya angka pembanding (misalnya `references/camera-transition.md`), buka **setelah** pengukuran selesai, dan hanya untuk membandingkan.

### Tahap 3 — Saring: tidak semua layak jadi primitif
Pola diangkat menjadi primitif hanya kalau:
- lolos uji atomik (§2),
- alasan bekerjanya bisa ditulis dalam satu kalimat tentang penonton, bukan tentang tampilan,
- bisa dipakai di minimal dua konteks format yang berbeda (talking head, demo produk, esai tanpa wajah, dan sejenisnya),
- belum ada di katalog. **Duplikat** = kategori sama dan mekanik inti sama → tambahkan sebagai variasi atau rentang parameter di primitif yang ada, jangan membuat id baru.

### Tahap 4 — Tulis primitif dan arsip
- **Primitif** ditulis sebagai spec pabrik (`claude/motion-graphic/pabrik/spec.schema.json`). Isi wajib ada di §5.
- **Arsip bedah per video** (kronologi, semua observasi, bukti, label) disimpan sebagai satu MD per referensi. Arsip untuk audit dan R&D, **tidak dimuat** di sesi editing.
- Jangan membuat struktur folder atau indeks baru di luar pabrik dan cookbook. Satu perpustakaan, satu registry.

## 5. Isi wajib satu primitif

| Isi | Keterangan | Field pabrik |
|---|---|---|
| id | `<lapisan>-<aksi>-<objek-generik>`, contoh `kamera-cut-ke-wadah-lalu-mundur` | `id`, `komponen_usulan` |
| lapisan | tipografi / visual / kamera / transisi | `kategori` |
| mekanik | kalimat yang **tidak menyebut benda referensi** | `mekanik` |
| parameter | angka + label `measured`/`estimated` + rentang aman | `parameter`, `terukur` |
| pemicu | dari kosakata *Narrative trigger* di `cookbook/CATALOG.md`; kalau tidak ada yang cocok, usulkan istilah baru dan catat | perlu field baru |
| alasan bekerja | satu kalimat tentang penonton | perlu field baru |
| slot | semua yang bisa diganti: wadah, warna, huruf, isi, ukuran | perlu field baru |
| jangan dicuri | daftar kulit referensi yang tidak boleh muncul (warna, bentuk, objek, teks) | `kulit` |
| bukti | file + detik per observasi; sumber kemunculan lain | `bukti` |

Kalau skema pabrik belum punya field yang dibutuhkan (pemicu, alasan bekerja, slot) atau belum punya kategori `transisi` dan `visual`, **perluas skemanya**. Jangan menyelipkannya ke `ringkas` atau `catatan`, karena di sana tidak bisa dicek.

## 6. Uji transfer: syarat primitif lolos

Primitif hanya lolos kalau komponennya dirender dengan **dua isian slot yang berbeda dari referensi** (dua set token netral, isi teks lain, wadah lain) dan memenuhi semua syarat:

1. **Gerak cocok dengan spec**: timing selisih ≤ 2 frame, lintasan/kurva setara dengan data `measured`. Spec `estimated` → status maksimal `teruji-sebagian`.
2. **Kulit tidak bocor**: tidak ada warna dekat palet referensi, dan tidak ada **bentuk, objek, ikon, atau tata letak** dari daftar "jangan dicuri".
3. **Mekaniknya terbaca tanpa kulit**: orang yang membaca kalimat mekanik akan mengenali gerak yang sama di kedua demo.

**Dilarang** menilai lolos/tidak dengan membandingkan tampilan demo terhadap tampilan referensi: SSIM atau korelasi tepi terhadap frame referensi, gambar referensi-kiri kandidat-kanan, atau pertanyaan "apa yang membuat kandidat tampak lebih murah dari referensi". Semua itu mengukur kemiripan kulit dan mendorong kloning. Referensi hanya dipakai sebagai **bahan ukur gerak**. Penilai vision melihat kandidat saja, bersama spec dan daftar "jangan dicuri".

## 7. Kalau dikerjakan lewat subagen

Sebelum mengirim tugas bedah atau sintesis ke subagen, jalankan skill `brief-gate`. Brief wajib memuat:
- **Unit kerja**: satu primitif atomik per subagen, bukan satu adegan atau satu video.
- **Bukan**: tidak membangun ulang UI, latar, objek, atau urutan shot referensi.
- **Bahan**: frame fps asli + data ukur. Frame referensi diberikan sebagai **bahan ukur, bukan target visual**.
- **Cara dinilai**: uji transfer §6, ditulis lengkap.
- **Berhenti dan lapor kalau**: gerak tidak bisa diukur dari bahan, atau mekanik tidak bisa dijelaskan tanpa menyebut benda referensi.

Pilot satu primitif sampai lolos uji §6 dulu sebelum membagi banyak primitif ke banyak subagen.

## 8. Saat primitif dipakai di sesi editing

1. Cocokkan setiap beat naskah dengan pemicu di registry. Muat hanya primitif yang dibutuhkan.
2. Isi semua slot dari tema proyek aktif. Cek daftar "jangan dicuri" sebelum render.
3. **Larangan rangkai ulang**: jangan memakai tiga primitif atau lebih dari satu referensi dalam urutan yang sama seperti di referensinya. Mencampur sumber tidak diwajibkan; setiap primitif tetap harus punya alasan visual di beat-nya.
4. Membuat gerak dari nol hanya boleh kalau tidak ada primitif yang cocok. Catat alasannya, lalu masukkan sebagai kandidat antrean pabrik.

## 9. Contoh: dari klaim karangan ke primitif terukur

Sumber: `indiavideomotion.mp4` (1276×718, 30 fps), 0,00–1,37 dtk. Pelacakan bounding box per frame (mask selisih warna terhadap latar `#FBF9FC`).

**Klaim lama (gagal):** "Talking head full-bleed mengecil `1.0x → 0.42x` dalam `0.35s` (`expo-out`) ke dalam `slot:container_metaphor`, teks mengapit kiri-kanan, elemen pendukung berstagger 0.08s."
- Tidak pernah diukur, dan datanya membantah: tidak ada animasi mengecil.
- Tiga mekanik digabung jadi satu.

**Data:**
| t (dtk) | lebar wadah (fraksi frame) | keterangan |
|---|---|---|
| 0,000–0,600 | 1,000 | full-bleed |
| 0,633 | 0,578 | lompat dalam 1 frame → **cut** |
| 0,667 → 1,367 | 0,569 → 0,531 | turun kontinu ±8% dalam 0,70 dtk, pusat tetap 0,50 |

**Primitif yang benar (satu dari tiga yang terpisah):**
- id: `kamera-cut-ke-wadah-lalu-mundur`
- mekanik: cut dari subjek full-bleed ke subjek di dalam wadah ±0,58 lebar frame di tengah, lalu wadah terus mengecil pelan ±8% selama ±0,7 dtk sambil elemen pendukung dibangun di sekitarnya.
- parameter: lebar awal 0,578 (`measured`), penurunan 0,047 dalam 0,70 dtk (`measured`); bentuk kurva mundur `estimated` (tren hampir linear dengan pelambatan, belum di-fit).
- pemicu: pecah talking head saat masuk ke definisi/poin pembuka.
- alasan bekerja: cut ke wadah langsung memberi "bingkai baru" tanpa menunggu animasi, dan gerak mundur pelan membuat ruang kosong terasa disiapkan untuk informasi yang akan datang.
- slot: bentuk wadah, radius, latar, elemen pendukung.
- jangan dicuri: latar lavender, bar timeline ungu, teks "you're a video editor", tata letak timeline di bawah wadah.
- terpisah dari primitif ini: (a) bar timeline yang dibangun bertahap = primitif visual, (b) teks dengan highlight di sisi wadah = primitif tipografi. Bentuk wadah juga muncul berbeda di 7,0 dtk (kartu post), 8,0 dtk (folder), dan 15,0 dtk (lingkaran). Pola cut-ke-wadahnya perlu diukur per kemunculan sebelum disebut berulang.

## 10. Gerbang sebelum menyimpan

- [ ] fps asli tercatat; gerak diukur di fps asli, bukan dari lembar 2 fps.
- [ ] Setiap gerak sudah dicek bukan cut; tidak ada kurva untuk cut.
- [ ] Setiap angka berlabel `measured`/`estimated` dan punya bukti.
- [ ] Tidak ada kata sifat kosong.
- [ ] Primitif lolos uji atomik; kalimat mekanik tidak menyebut benda referensi.
- [ ] Pemicu memakai kosakata CATALOG; alasan bekerja ditulis tentang penonton.
- [ ] Tidak duplikat dengan primitif yang ada (kategori + mekanik inti).
- [ ] Uji transfer §6 lulus dengan dua isian slot; tidak ada penilaian kemiripan tampilan terhadap referensi.
- [ ] Arsip bedah per video tersimpan sebagai MD tersendiri dan tidak dimuat di sesi editing.
