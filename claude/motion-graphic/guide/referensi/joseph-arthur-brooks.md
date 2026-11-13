# 18 Joseph (Ultimate Editors) · gaya "minimal premium" Arthur Brooks + cara melatih Claude

> Dibedah Claude 11 Nov dari video kiriman Irfan: YouTube `g9xoKm5DEeU` "How to Edit VIRAL Talking Head Videos Using ONLY Claude" (Joseph, 20:57). Bahan: transkrip faster-whisper, contact sheet tiap 8 dtk, frame kunci 720p, scene detect, `pace_read.py`, `earshot timeline`, `audio/ears.py` (stem demucs) pada potongan hasil akhir 17:56–18:53. Standar kualitas Irfan; kartu anatominya `../../pustaka/kartu/18-arthur-brooks.md`. Bila bertentangan dengan `../../LANTAI.md`, lantai menang. Usulan yang menyentuh aturan ada di §8 dan di `PENDING.md`.
> Contact sheet: `sheets/18-arthur-brooks-10-adegan.jpg` (contoh 10 jenis adegan), `sheets/18-arthur-brooks-hasil.jpg` (hasil edit akhir, tiap 2 dtk).
> Video ini juga iklan kursus berbayar. Klaim angka (74 SFX, 225 animasi, waktu kerja) adalah kata Joseph, belum dicek kecuali yang ditandai "terukur".

---

## 0. DNA dalam satu kalimat
**Klip podcast vertikal yang bergantian antara wajah pembicara dan adegan bertekstur kertas (lukisan, garis biru, ilustrasi kasar, grafik bercahaya), semuanya diikat satu pasangan huruf (sans + serif italic), satu warna aksen biru, dan teks yang ditempatkan di celah sekitar kata kunci.**

Cocok: klip wawancara/podcast edukatif, filosofi, psikologi, karier. Tidak cocok: promo produk cepat, UI demo.

## 1. Hasil akhir (terukur)
| Item | Nilai |
|---|---|
| Kanvas | 1080×1920, 57 dtk |
| Ritme | 26 cut = 27,4/menit, shot median 1,7 dtk, event visual 37/menit (`pace_read.py`) |
| Porsi | ±35 % wajah (A-roll + caption), ±65 % adegan grafis/lukisan/B-roll (hitungan contact sheet tiap 2 dtk) |
| Palet | hitam/arang, putih kertas, satu aksen biru elektrik (sampel 720p ±`#005FDF`–`#3480E4`, perkiraan); lukisan membawa warnanya sendiri |
| Font | Inter (narasi) + Playfair Display Italic (kata istimewa) |
| Mix | −20,2 LUFS, true peak −3,2 dBTP, LRA 2,0 LU |
| Musik (stem demucs) | string quartet / orkestra pizzicato, E mayor, ±108 bpm (librosa), tanpa drum; di mix tidak ada grid beat (pulse clarity 0,05); duduk jauh di bawah suara |
| SFX | earshot menandai 20 klik/UI, 4 riser, 2 whoosh (sisanya tak berlabel). Klaim Joseph: 74 SFX (±78/menit): klik untuk teks, highlighter untuk grafik, whoosh untuk transisi |

## 2. Sepuluh jenis adegan (taksonomi Joseph, 0:46–5:47)
| # | Adegan | Isi | Dipakai saat |
|---|---|---|---|
| 1 | Caption layar (A-roll) | Baris ≤ 5 kata. Kata terpenting dibuat besar bold (sans bold atau serif italic bold) di tengah; kata lain kecil di celah atas/bawahnya | Pembicara memperkenalkan sesuatu; penonton perlu melihat wajah |
| 2 | B-roll + teks | B-roll yang menggambarkan kalimat; tekstur kertas tipis, tepi digelapkan dan sedikit di-blur agar mata ke titik fokus; teks memakai logika #1 | Kalimat bisa ditunjukkan sebagai adegan nyata |
| 3 | Lukisan + teks | Lukisan klasik yang menggambarkan kalimat, tekstur cat + kertas kasar, teks mengelilingi subjek lukisan, kamera slide-in singkat | Poin filosofis/cerita pribadi |
| 4 | Garis + teks | Latar hitam/putih bertekstur kertas; satu garis biru menuju teks, terputus oleh teks, lalu berlanjut ke teks berikutnya; kamera mengikuti ujung garis | Rangkaian kata kunci yang saling terhubung |
| 5 | Garis + ilustrasi | Garis yang sama menuju ilustrasi: horizontal dengan titik putih penanda objek, atau zigzag dengan kamera pan memperlihatkan objek di kiri-kanan | Progres beberapa fase |
| 6 | Adegan teks | Latar putih atau biru, tekstur kertas sangat kasar, tanda kutip di sekitar tengah, kalimat di tengah | Kutipan/kalimat penutup |
| 7 | Ilustrasi tengah | Ilustrasi kasar bertekstur cat/noise di separuh bawah yang "berdarah" ke tengah; teks di ruang sisanya; varian: otak dari atas, pola lingkaran garis tipis, profil kepala bertekstur kain | Ide utama kalimat yang bisa jadi satu gambar |
| 8 | Ilustrasi samping | Tokoh/setengah lingkaran bertekstur di satu sisi, teks di sisi lain (kadang berputar mengelilingi) | Dua hal sekaligus |
| 9 | Objek + teks | Satu benda/foto bagian cerita, teks mengelilinginya, reveal kasar | Benda atau foto nyata dalam cerita |
| 10 | Grafik/statistik | Latar gelap bertekstur, grid garis putih tipis bercahaya, bola biru sebagai ujung kurva, kamera mengikuti bola | Angka atau tren |

Semua adegan memakai tekstur, tepi, dan warna yang sama: itu yang membuatnya satu keluarga.

## 3. Logika penempatan (dari rencana edit Joseph, 13:31–15:32)
Ini bagian yang paling bisa dipakai: adegan dipilih dari **peran kalimat**, bukan dari selera.
- Pembuka: tetap di wajah + caption ("There's four career patterns, psychologically") supaya penonton terhubung dulu dengan pembicara.
- **Mengumumkan kategori baru → wajah. Menjelaskannya → tunjukkan** (lukisan, grafik, B-roll).
- Kata yang diulang ("up and up and up…") → grafik yang naik satu anak tangga tiap kata.
- Kalimat dua bagian ("expert, which is like slow and steady") → wajah dulu, ganti ke grafik garis datar di tengah kalimat.
- Menyebut orang ("my dad had the same job for 42 years") → callout tokoh.
- Cerita pribadi ("leaving the French horn…") → callout objek dengan foto asli pembicara.
- Lelucon ("circus clown or firefighter") → ilustrasi pembicara dengan lingkaran yang memutar pilihan.
- Poin besar berisi deretan kata kunci → garis + teks yang melewati tiap kata (calling, agility, courage).
- Penutup → adegan teks dengan tanda kutip.
- Keseimbangan: jenis adegan bergiliran supaya alurnya enak ditonton.

## 4. Cara melatih Claude pada satu gaya (7:52–11:04)
1. Unduh ±20 video terbaik kreator itu.
2. Tonton sebagai editor; tiap adegan bagus ditanya: kenapa adegan ini, desain ini, warna ini, efek ini, animasi ini.
3. Papan Figma: screenshot tiap adegan yang disukai (±130), lalu kelompokkan ke 10 jenis adegan; tiap kelompok dibedah font, warna, ukuran, pola.
4. Claude menerima 20 video + tautan papan dengan tiga tugas: (a) di mana animasi diletakkan terhadap naskah, (b) bagaimana desainnya tersusun, (c) logika animasi: durasi dan rasanya. Transkrip kata per kata + bedah frame per frame.
5. Hasilnya satu skill gaya: aturan ukuran, layout, tekstur, bentuk, warna, plus pustaka **225 animasi** dalam folder, masing-masing dengan desain referensi dan lembar keyframe.
Prinsip Joseph: video referensi mengajarkan logika animasi, papan mengajarkan desain.

## 5. Alur produksi (11:44–17:50) · ±2 jam
| Tahap | Siapa | Waktu (klaim) |
|---|---|---|
| Transkrip kata per kata tingkat milidetik, potong semua jeda dengan sisa 30 ms, lalu dokumen rencana | Claude | 15 mnt |
| Dokumen rencana: naskah + klip di kanan, kiri **3 desain rekomendasi per beat** dari folder referensi, tiap opsi mengutip sumbernya ("Pattern 1 of 4. V10-A02 …", "seen in the reels"); 15 beat | Claude → Joseph memilih/menulis catatan | 15 mnt |
| Build: baca rencana → ambil referensi terpilih → daftar aset (lukisan Wikipedia, stok Pexels, foto tokoh Wikipedia) → font Google → caption seluruh video → adegan satu per satu di Remotion → render | Claude | 60 mnt |
| Revisi bernomor dengan timestamp (6 poin); Claude bertanya "siap sound design atau revisi lagi?" | Joseph | 10 mnt |
| Sound design dicocokkan ke 20 referensi: musik sinematik, klik teks, highlighter grafik, whoosh transisi | Claude | 15 mnt |

Draft pertama dianggap 60–70 % jadi. Enam revisinya berguna sebagai daftar cek:
1. Desain teks adegan pertama lemah; kata "psychologically" harus tetap di adegan yang sama.
2. Potongan kasar antara grafik dan shot berikutnya: tahan teks grafik sampai 0:06, baru potong.
3. Tekstur cat terlalu berat dan **tidak ikut bergerak dengan lukisannya**: kekuatan separuh, tempel ke layer.
4. Potongan jelek di 0:24.
5. Spiral harus tampil lebih lama.
6. Tanda kutip di adegan teks penutup.

## 6. Format video Joseph sendiri (bonus)
Video penjelasnya memakai latar gelap ber-grid, kartu 9:16 melayang, carousel bernomor untuk 10 prinsip, dan **panah anotasi berlabel** ("flat dark background →", "white thin glowing lines →"). Format "bedah dengan anotasi" ini cocok untuk konten edukasi siirfan.

## 7. Yang sudah ada di skill kita
- Kata besar + kata pengantar kecil, serif hanya sebagai penekanan: `decision-guide.md` §2, `pedro-andradeok.md` §4.
- Satu aksen warna, netral membawa frame: `guide/visual/`, `palette.md`.
- SFX di momen cerita (aturan 43), revisi sebagai diff bernomor (aturan 18), build Remotion, loop kritik sebelum kirim.

## 8. Celah skill yang terlihat dari video ini

Status 11 Nov: butir 1–5 diterapkan (`templates/gaya/minimal-premium`, `analysis-qa.md` §2, `storyboard.md` §1, `references/roles.md`) atas permintaan Irfan membuat template dari bedah ini; butir 6–7 masih di `PENDING.md`.
1. **Bedah referensi belum memetakan penempatan terhadap naskah.** `analysis-qa.md` §2 mengukur cut, tinggi teks, SFX, tetapi tidak menghasilkan tabel "kalimat pemicu → jenis adegan → peran kalimat (umumkan / jelaskan / sebut orang / cerita / lelucon / angka / penutup)". Itu inti metode Joseph.
2. **Belum ada paket gaya lintas banyak video satu kreator.** Guideline 14–17 dan kartu `canvas-skill-library` dibuat per video. Belum ada taksonomi adegan bernama + pustaka animasi ber-ID (still awal/tengah/akhir + lembar keyframe) yang bisa dikutip saat merencanakan.
3. **Belum ada "rencana edit" berbentuk menu.** Storyboard kita memilih satu visual per beat; variasi hanya bila diminta. Untuk klip podcast, Irfan tidak punya titik memilih sama sekali (agent membuat storyboard sendiri). Format Joseph: 3 opsi per beat, tiap opsi mengutip ID referensi, Irfan memilih ±15 menit sebelum build.
4. **Belum ada sistem tekstur/material**: kertas, tepi gelap + blur di B-roll, cat/kertas kasar di lukisan, kain kasar di ilustrasi, dan cek QA "tekstur menempel ke layer, kekuatan terkalibrasi" (revisi 3).
5. **Sumber aset visual belum diatur.** Aturan 50 hanya ikon/logo. Belum ada jalur lukisan domain publik (Wikimedia), stok video (Pexels), foto tokoh, dan daftar aset + lisensi sebelum build (audio sudah punya `CREDITS.md`).
6. **`pace_read.py` hanya membaca tempo.** Video ini terbaca "energi, 100–140 bpm"; tempo stem musiknya memang ±108 bpm, tetapi warnanya string pizzicato tanpa drum, jauh di bawah suara. Profil "energi" kita tidak menggambarkan register premium-edukatif ini.
7. **Benturan dengan aturan 15** (tidak ada elemen biru di latar gelap): gaya ini memakai garis dan bola biru bercahaya di hitam. Teksnya tetap putih; biru hanya garis/titik/latar penuh. Perlu keputusan Irfan bila gaya ini dipakai.
