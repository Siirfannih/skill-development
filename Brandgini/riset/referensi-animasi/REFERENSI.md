# Referensi Animasi untuk Soalnya Gini: Breakdown Komposisi

Disusun 25 Nov 2026 (WITA). Semua link dicek hidup via yt-dlp hari ini, dan view adalah angka persis saat dicek. Tidak ada yang diposting.
File pendukung:
- Frame kunci tiap referensi ada di `RNN-nama/` (6 frame: 0,3 dtk · 1,5 dtk · 3 dtk · 35% · 65% · 92% durasi).
- Contact sheet gabungan: `contact-sheet.jpg`.
- Data mentah (video, info.json, transkrip, skor scene) di `_raw/`.

**Cara menilai**
- *Ritme* diukur otomatis dengan ffmpeg scene score (fps 10). "Cut" = scene ≥ 0,30. "Perubahan" = ≥ 0,05, mencakup gerak kamera besar dan objek baru muncul. Untuk 3D satu kamera kontinu, angka cut memang 0; ritmenya terlihat di kolom perubahan.
- *Kata/detik* dihitung dari transkrip otomatis YouTube, jadi angkanya kasar.
- *LUFS* = loudness terintegrasi audio.
- *SFX/musik* tidak saya dengar langsung. Penilaiannya dari loudness, transkrip, dan visual, jadi ditandai "perkiraan".
- *Skor anti-slop* 0–10 memakai rubrik `/workspace/anti-slop-skill/SKILL.md`. Ini penilaian saya dari frame, subjektif.

---

## A. Ringkasan link

| # | Judul | Akun | Views (25 Nov 2026) | Kenapa visualnya bagus (1 kalimat) |
|---|---|---|---|---|
| R01 | [How a Hole in Your Yard Becomes a Swimming Pool](https://www.youtube.com/shorts/7KaSozRDHBs) | You Built It | 8.494.223 | **Akun dari postingan Ernesto**: satu set rumah + balok tanah terpotong, kata "If" di tengah, tiap masalah menambah satu komponen 3D. |
| R02 | [How a Hole in Your Yard Becomes a Septic Tank](https://www.youtube.com/shorts/p-LRiZMw_BY) | You Built It | 2.797.894 | Topik yang sama dengan episode 9 kita, dirakit dari lubang sampai tangki dua ruang, dengan potongan tanah yang selalu terbaca. |
| R03 | [How a Snowdrift Becomes An Igloo](https://www.youtube.com/shorts/EmJqO41Wx2A) | From The Ground Up | 26.012.052 | Palet hampir monokrom (putih-biru es) dengan satu figur oranye, jadi mata langsung tahu harus melihat ke mana. |
| R04 | [How a Jungle Hole Becomes the Cu Chi Tunnels](https://www.youtube.com/shorts/7J2V-np5Bks) | You Made It | 37.918.045 | Kamera menyelam dari permukaan hutan ke lorong bawah tanah dalam satu gerakan kontinu. |
| R05 | [How a Ditch in a Field Becomes a Trench](https://www.youtube.com/shorts/6SDuStkFbrE) | Marshal Iron | 22.923.940 | Satu potongan tanah, satu figur, tiap kalimat "But…" menambah satu lapisan konstruksi. |
| R06 | [How a Hole on a Beach Becomes a Tsunami Tower](https://www.youtube.com/shorts/hoX5b79F_gA) | Low Poly Films | 12.307.381 | Karakter low-poly konsisten, panah putih untuk gaya/air, dan label kuning hanya untuk satu angka kunci. |
| R07 | [How a Hole in the Sand Becomes a Bank](https://www.youtube.com/shorts/TdGAohni4ec) | MiniTopias | 415.176 | Gaya mainan, satu kata kunci berwarna kuning, HUD counter di atas yang membuat ekonomi jadi "game". |
| R08 | [How a Hole in a Hill Becomes a House](https://www.youtube.com/shorts/YRT6uKUp9Qc) | Mildly Elsewhere | 10.540.862 | Versi sinematik dari format gali tanah: sudut kamera berganti tiap ±3 dtk, dan ada panel termal untuk konsep yang tak kasatmata. |
| R09 | [He Flooded His Own Basement Before the River Could](https://www.youtube.com/shorts/rMmG7s-IIMQ) | Mildly Elsewhere | 45.600.150 | Hook cerita di kalimat pertama, lalu analogi benda sehari-hari (kaleng soda) untuk menjelaskan tekanan air. |
| R10 | [How airliner brakes work](https://www.youtube.com/shorts/tNLV1n2-vCM) | Animagraffs | 1.269.119 | Standar emas exploded view: latar krem polos, komponen transparan x-ray, label kecil hitam, merah hanya untuk merek. |
| R11 | [How do Mechanical Pencils Work?](https://www.youtube.com/shorts/vpR8piWPdKo) | Branch Education | 406.662 | Benda nyata di meja langsung "dibelah" jadi potongan 3D dengan label bergaris penunjuk, paling dekat dengan janji "dibongkar sampai oh gitu". |
| R12 | [Inside of Big Ben](https://www.youtube.com/shorts/unQjxm7DGAk) | Jared Owen | 2.397.509 | Kamera terbang menembus dinding dan naik tangga spiral; caption kapital di kotak hitam kecil yang selalu terbaca. |
| R13 | [How Stitches Work](https://www.youtube.com/shorts/ttuKeS5k4Uo) | Zack D. Films | 255.840.052 | Satu objek, satu shot macro yang terus mendorong masuk, dan proses mekanis divisualkan bertahap tanpa potongan. |
| R14 | [How to Cut a Sandwich Perfectly – With Science](https://www.youtube.com/shorts/hvmIZAvt3jE) | Kurzgesagt | 19.079.325 | Motion graphic isometrik dengan maskot burung; satu ide besar per adegan dan palet terang yang disiplin. |
| R15 | [Kenapa Sisi Lancip Sedotan Gampang Patah…?](https://www.youtube.com/shorts/91NOSqFfBGg) | Lhoh Kok? (ID) | 6.531.525 | Benda sehari-hari Indonesia, latar mint polos, ada maskot kecil, dan potongan melintang sedotan dengan panah gaya merah. |
| R16 | [Kenapa UN Pakai Pensil 2B?](https://www.youtube.com/shorts/46DTYFRaJgk) | Lhoh Kok? (ID) | 7.328.617 | Minimalis: satu objek di tengah latar polos, kata pembuka "Lhoh…" sebagai cap seri, sangat dekat dengan gaya calm yang kita mau. |
| R17 | [Kenapa Bikin Kolam Renang Nggak Bisa Cuma Gali Tanah](https://www.youtube.com/shorts/V68Q_uLKcQ8) | Pernah Pikir Kenapa? (ID) | 10.668.092 | **Bukti format R01 jalan di Indonesia** dalam versi 2D bahasa Indonesia ("Kalau kamu gali lubang di halaman…"). |
| R18 | [Sisa Evolusi di Tubuh Kita Ini Udah 'Ngga Berguna'](https://www.youtube.com/shorts/brLgiAgh4dg) | Kok Bisa? (ID) | 14.361.443 | Hybrid host + sisipan 2D flat yang muncul tiap ±2 dtk. Tidak faceless, tapi cara memakai sisipan grafisnya layak dipelajari. |
| *R19* | *[Kenapa kita bisa mabuk saat naik mobil](https://www.youtube.com/shorts/ql9MBUUzufs)* | *Material Populer (ID)* | *5.064.296* | *Pembanding, jangan ditiru: views tinggi tapi visualnya gambar AI generatif.* |
| *R20* | *[2 lembar uang nempel di ATM bukan bonus](https://www.youtube.com/shorts/ZvmJpdjQCec)* | *Kita Bedah (ID)* | *1.843.185* | *Pembanding/kompetitor langsung: rapi, tapi render statis dan teks padat.* |

Catatan pencarian:
- Dari daftar Irfan, **Lagon** dan **Exploded Works** tidak bisa dipakai. Pencarian "Lagon" hanya menemukan channel scanner 3D (2 video, < 1 rb view). Exploded Works (10,2 rb subs) tidak punya Shorts yang terbaca oleh yt-dlp.
- **MiniTopias** ketemu (972 subs), tapi view-nya kecil, jadi dipakai sebagai contoh gaya saja.
- Kok Bisa? hampir semua Shorts-nya host-on-camera. Saya pilih satu yang sisipan animasinya paling banyak.
- Kandidat lain yang dibuang: Zack D. "McFlurry spoon" (167 jt), karena live-action + presenter, bukan animasi; Kok Bisa? "Bangunin orang tidur" (8,2 jt), karena isinya host saja. Frame-nya ada di `_raw/excluded/`.

---

## B. Soal akun "If" dari postingan Ernesto

- **Hampir pasti You Built It (@youbuilt_it).** Frame pertama R01 identik dengan frame besar di `ernesto.jpg`: rumah dua lantai yang sama, rumput bergaris, balok-balok tanah beterbangan, kata "If" di tengah tepi lubang (lihat `R01-youbuiltit-pool/f1-*.jpg` vs `ernesto.jpg`).
- Possible.sh menulis format ini membawa satu akun baru ke 57 jt view TikTok dalam 18 hari, dengan video pertama "How a Hole in Your Yard Becomes a Swimming Pool" (13,1 jt TikTok, 7,7 jt YouTube). Itu cocok dengan R01, yang sekarang 8,49 jt di YouTube.
- ⚠ **Belum terverifikasi**: video 21,4 jt di grid Ernesto (thumbnail bertuliskan "Back") tidak ada di YouTube You Built It (79 Shorts, tertinggi 8,49 jt). Kemungkinan grid itu dari TikTok/Instagram mereka. TikTok `@youbuilt_it` tidak bisa dibaca dari box (yt-dlp: "private or embedding disabled"; oEmbed: 400), jadi angka 21,4 jt belum bisa saya cocokkan.
- **Format ini sudah dikloning banyak akun** dalam 2 bulan, semuanya diunggah Okt–Nov 2026 dengan template yang hampir identik (kata tunggal di tengah, balok tanah, kalimat "If… you have… But… So you…"): From The Ground Up (26 jt), You Made It (37,9 jt), Marshal Iron (22,9 jt), Low Poly Films (12,3 jt), MiniTopias, Mildly Elsewhere (45,6 jt).
- Sudah ada kit berbayar yang menjual cara membuatnya dengan Blender + AI (Payhip "You Built It Video Kit", possible.sh). Artinya di pasar Inggris format ini mulai jenuh. Di Indonesia baru Pernah Pikir Kenapa? (R17, 2D) yang memakainya. Ini peluang, tapi juga alasan kita harus punya ciri sendiri (Gini + Gang Soalnya Gini), bukan menyalin rumah Amerika.

---

## C. Tabel ritme terukur

| # | Durasi | Hard cut | Perubahan visual (≥0,05) | Rata-rata per perubahan | Kata/detik VO | LUFS |
|---|---|---|---|---|---|---|
| R01 You Built It · pool | 66 dtk | 0 | 24 | 2,7 dtk | ±3,5* | −18,6 |
| R02 You Built It · septic | 61 | 0 | 24 | 2,4 | ±3,5* | −17,6 |
| R03 Ground Up · igloo | 69 | 0 | 11 | 5,8 | 3,4 | −14,0 |
| R04 You Made It · Cu Chi | 70 | 0 | 12 | 5,4 | 4,0 | −15,6 |
| R05 Marshal Iron · trench | 70 | 0 | 8 | 7,8 | 3,9 | −15,5 |
| R06 Low Poly · tsunami | 64 | 1 | 33 | 1,9 | 4,4 | −15,1 |
| R07 MiniTopias · bank | 52 | 9 | 28 | 1,8 | 3,6 | −15,0 |
| R08 Mildly Elsewhere · hill | 70 | 8 | 47 | 1,5 | 3,5 | −14,0 |
| R09 Mildly Elsewhere · flood | 71 | 9 | 63 | 1,1 | 3,1 | −14,0 |
| R10 Animagraffs · brakes | 29 | 0 | 3 | 7,2 | (musik dominan) | −14,1 |
| R11 Branch · pencil | 60 | 0 | 3 | 14,9 | (transkrip parsial) | −26,0 |
| R12 Jared Owen · Big Ben | 59 | 4 | 26 | 2,2 | 3,7 | −18,0 |
| R13 Zack D. · stitches | 31 | 0 | 1 | 15,4 | 2,5 | −12,0 |
| R14 Kurzgesagt · sandwich | 52 | 10 | 23 | 2,2 | 3,4 | −11,6 |
| R15 Lhoh Kok? · sedotan | 43 | 1 | 19 | 2,1 | 2,6 | −13,9 |
| R16 Lhoh Kok? · pensil 2B | 53 | 0 | 19 | 2,7 | 2,4 | −15,4 |
| R17 Pernah Pikir · kolam | 54 | 16 | 22 | 2,3 | 2,3 | −23,6 |
| R18 Kok Bisa? · evolusi | 52 | 11 | 39 | 1,3 | 3,0 | −10,1 |
| R19 Material Populer | 64 | 10 | 24 | 2,5 | 2,5 | −12,7 |
| R20 Kita Bedah | 70 | 0 | 18 | 3,7 | 3,5 | −14,3 |

\* Transkrip R01/R02 hanya tersedia sebagai terjemahan otomatis Indonesia, jadi kata/detik diperkirakan dari klon sejenis.

Bacaan cepat:
- Video 60–71 dtk dengan perubahan visual tiap **1,5–3 dtk** (R01, R02, R06, R08, R09) adalah kelompok dengan views tertinggi per subscriber.
- Video berbahasa Indonesia jalan di **2,3–3,0 kata/detik**. Naskah kita (132–142 kata) pas untuk 50–58 dtk.
- Video tanpa hard cut tetap terasa cepat karena **kamera bergerak terus dan objek baru muncul**. Jadi "visual berganti tiap 3–5 dtk" tidak harus berarti cut.

---

## D. Breakdown per referensi

### R01 · You Built It, "How a Hole in Your Yard Becomes a Swimming Pool"
8.494.223 views · diunggah 11 Okt 2026 · 67 dtk · 60 fps · 67,3 rb subs · frame: `R01-youbuiltit-pool/`
- **Framing/kamera**: diorama 3/4 dari atas. Sepertiga atas langit + rumah, dua pertiga bawah balok tanah yang terpotong seperti kue, jadi bagian bawah tanah selalu kelihatan. Kamera kontinu: dolly pelan, kadang turun menembus tanah (lapisan air tanah biru) lalu naik lagi. Tidak ada hard cut sama sekali.
- **Palet**: hijau rumput, cokelat tanah, putih rumah, dan **biru hanya untuk air**. Panah putih besar untuk gaya angkat air tanah, merah kecil untuk katup.
- **Tipografi caption**: **satu kata per layar**, sans bold putih dengan bayangan hitam tipis, kecil (±5% tinggi layar), diletakkan tepat di garis permukaan tanah (y ≈ 55%). Tidak ada judul atau headline di layar.
- **Ritme**: perubahan visual tiap ±2,7 dtk. Tiap kalimat "But…" langsung menambah satu komponen (lapisan batu, besi tulangan, beton, filter, pompa).
- **Hook 0–3 dtk**: frame 0 sudah aksi (tanah meledak keluar dari lubang) + kata "If". VO: "If you dig a hole in your yard and fill it with water, you have a swimming pool." Masalah dan solusi palsu langsung di kalimat pertama.
- **Gerak & transisi**: komponen muncul dengan "tumbuh" atau jatuh ke tempatnya; tanah digali dengan balok-balok yang terbang keluar. Satu keluarga gerak saja.
- **Maskot/karakter**: tidak ada karakter tetap. **Set-lah yang jadi maskot**: rumah yang sama di semua video membuat orang mengenali seri dari thumbnail.
- **SFX/musik (perkiraan)**: VO tenang, musik tipis, SFX gali/air per aksi. Loudness −18,6 LUFS (lebih pelan dari rata-rata).
- **Skor anti-slop**: 7/10. Rapi dan konsisten. Minusnya: caption terlalu kecil untuk HP, dan aset stok terasa generik.
- **Adopsi untuk Soalnya Gini**: ini cetak biru "Gang Soalnya Gini": satu diorama tetap dengan tanah terpotong di bawah rumah, dipakai ulang di semua episode. Pola kalimat "Kalau kamu…, kamu udah punya… Tapi… Jadi…" sudah ada di naskah ATM/septic/rice cooker. Caption kita sebaiknya **lebih besar** dari punya mereka (80 px sesuai token).

### R02 · You Built It, "How a Hole in Your Yard Becomes a Septic Tank"
2.797.894 views · 13 Okt 2026 · 61 dtk · 60 fps · `R02-youbuiltit-septic/`
- **Framing**: set yang sama dengan R01, rumah dipotong melintang sehingga kamar mandi dan pipa kelihatan masuk ke tanah.
- **Palet**: sama dengan R01. Air limbah kehijauan pucat, air tanah biru.
- **Caption**: satu kata putih di garis tanah ("You", "House", "Have", "In", "Cleaning", "Sign").
- **Ritme**: ±2,4 dtk per perubahan. Pipa memanjang, tangki muncul, sekat, bidang resapan, papan "SEPTIC" di akhir.
- **Hook**: "If you run every drain in your house into a hole in your yard, you have a septic system. But…"
- **Gerak**: pipa "menjalar"; lapisan tanah diperbesar saat menjelaskan air tanah.
- **Karakter**: tidak ada.
- **Skor anti-slop**: 7/10.
- **Adopsi**: **referensi langsung untuk episode 9 (septic vs sumur)**. Tiru logika urutan komponen dan potongan tanahnya, tapi tambahkan sumur dan penggaris "10 m" sesuai SNI 2398:2017, ganti rumah Amerika dengan rumah kampung, dan biarkan Gini memegang meteran.

### R03 · From The Ground Up, "How a Snowdrift Becomes An Igloo"
26.012.052 views · 28 Okt 2026 · 69 dtk · 60 fps · `R03-groundnup-igloo/`
- **Framing**: klon R01. Gundukan salju di atas, potongan salju padat di bawah.
- **Palet**: **hampir monokrom** putih-abu-biru es, dengan satu figur berompi oranye sebagai titik fokus. Ini contoh terbaik aturan "1 aksen".
- **Caption**: satu kata putih di tengah.
- **Ritme**: ±5,8 dtk per perubahan besar, lebih lambat, tapi badai salju (partikel) membuat layar terus hidup.
- **Hook**: "If you dig a hole in a snowdrift to hide from a blizzard, you have an igloo. But the powder is soft…"
- **Gerak**: perubahan cahaya siang ke malam ke siang untuk menandai waktu (adegan "Drips" gelap).
- **Karakter**: satu figur kecil oranye, tanpa wajah jelas.
- **Skor anti-slop**: 8/10. Disiplin warna paling bagus di grup ini.
- **Adopsi**: aturan warna kita. Seluruh gang di nada netral desaturasi, dan **hanya hal yang sedang dijelaskan yang diberi Biru Gini** (air, arus, sinyal). Perubahan siang/malam bisa dipakai di episode petir.

### R04 · You Made It, "How a Jungle Hole Becomes the Cu Chi Tunnels"
37.918.045 views · 24 Okt 2026 · 70 dtk · 60 fps · 137 rb subs · `R04-youmadeit-cuchi/`
- **Framing**: hutan di sepertiga atas; sebagian besar layar adalah tanah merah. Kamera **turun masuk ke dalam lorong** dan mengikuti jalurnya.
- **Palet**: merah bata tanah, hijau-abu hutan, cahaya lampu minyak hangat di lorong.
- **Caption**: satu kata putih tengah ("Dig", "To", "Thin", "Out", "Frog").
- **Ritme**: ±5,4 dtk per perubahan besar, tapi kamera tidak pernah diam.
- **Hook**: "If you dig a hole in the jungle to hide from the bombs, you have a hideout. But soldiers walking past spot the hole…" Bahaya langsung di kalimat kedua.
- **Gerak**: kamera melintasi lorong demi lorong (trap, ventilasi, sumur).
- **Karakter**: tentara kecil tanpa detail wajah.
- **Skor anti-slop**: 7/10. Topik sejarah dan perang membawa risiko kebijakan; jangan ditiru topiknya.
- **Adopsi**: **kamera menyelam ke dalam objek** adalah cara terbaik memvisualkan "masuk ke dalam" ATM, rice cooker, dan kabel listrik.

### R05 · Marshal Iron, "How a Ditch in a Field Becomes a Trench"
22.923.940 views · 21 Okt 2026 · 70 dtk · 24,1 rb subs · `R05-marshaliron-trench/`
- **Framing/palet**: potongan tanah cokelat, langit abu berasap. Palet kusam dan sangat terbatas.
- **Caption**: satu kata putih tengah.
- **Ritme**: perubahan besar jarang (±7,8 dtk), tapi tiap kalimat menambah satu elemen kecil (papan, karung pasir, anak tangga).
- **Hook**: "If you dig a ditch across a field and jump in, you have a trench. But the first rain fills it…"
- **Catatan**: 22,9 jt views dengan **hanya 24,1 rb subscriber**. Ini bukti algoritme mendorong format, bukan besar channel.
- **Skor anti-slop**: 6/10. Kamera agak statis dan render polos.
- **Adopsi**: pembuktian bahwa channel baru bisa menembus jutaan view hanya dengan format yang jelas. Jangan meniru tema perangnya.

### R06 · Low Poly Films, "How a Hole on a Beach Becomes a Tsunami Tower"
12.307.381 views · 15 Nov 2026 · 64 dtk · 33,6 rb subs · `R06-lowpoly-tsunami/`
- **Framing**: lubang di pasir dengan karakter di tengah; kemudian wide shot kota pantai; potongan air laut dengan panah putih.
- **Palet**: pasir krem, laut toska, langit biru muda. Karakter memakai topi merah dan baju toska.
- **Caption**: **potongan 2–4 kata**, putih bold dengan outline hitam, di sepertiga bawah. Ada **label kuning kapital terpisah di atas hanya untuk angka kunci** ("AS FAST AS A JET").
- **Ritme**: tercepat di grup gali tanah: ±1,9 dtk per perubahan.
- **Hook**: karakter sudah di dalam lubang di frame 0. VO: "If you dig a hole on the beach and hide in it, you have a tsunami shelter. But the ocean fills your hole in seconds."
- **Gerak**: karakter beranimasi (melompat, menunjuk); air digambar dengan panah lurus berjalan.
- **Karakter**: **karakter tetap yang konsisten** (siluet low-poly, topi merah), mirip peran yang kita rencanakan untuk Gini.
- **Skor anti-slop**: 7/10.
- **Adopsi**: (1) label angka kunci terpisah dari caption: kita pakai pelat putih kecil dengan angka Biru Gini, mis. "10 m", "100 °C"; (2) karakter yang bereaksi di dalam adegan, bukan sekadar menonton.

### R07 · MiniTopias, "How a Hole in the Sand Becomes a Bank"
415.176 views · 18 Okt 2026 · 52 dtk · 972 subs (saat dicek) · `R07-minitopias-bank/`
- **Framing**: pulau kecil dengan karakter mainan di tengah, kamera mendekat dan menjauh.
- **Palet**: cerah ala mainan, tapi tetap terkendali (pasir, hijau, laut).
- **Caption**: **besar, kapital, satu kata**, putih dengan outline hitam di bawah tengah. **Kata kunci berwarna kuning** ("BANK").
- **Ritme**: ±1,8 dtk per perubahan, dengan 9 hard cut.
- **Hook**: "If you dig a hole and put your money in it, you've built a bank. But anyone with a stick can dig it up."
- **Unik**: **HUD di bagian atas** (penghitung koin dan papan "ACCOUNTS") yang ikut berubah sepanjang cerita. Konsep abstrak (bunga, rekening) jadi angka yang terlihat.
- **Skor anti-slop**: 7/10.
- **Adopsi**: HUD sederhana untuk episode berangka, mis. meter "mual" di episode mabuk, termometer di es puter/rice cooker, penghitung lembar di ATM. Caption kita sudah memakai pola yang sama (kata aktif Biru Gini).

### R08 · Mildly Elsewhere, "How a Hole in a Hill Becomes a House"
10.540.862 views · 11 Nov 2026 · 70 dtk · 24 fps · 103 rb subs · `R08-mildlyelsewhere-hillhouse/`
- **Framing**: sinematik. Close-up ekskavator, potongan bukit, interior gelap, lalu **panel termal** (gradasi oranye-biru) untuk suhu tanah.
- **Palet**: realistis natural. Panel data memakai warna termal, satu-satunya tempat gradasi dipakai, dan itu karena datanya memang gradasi.
- **Caption**: **kalimat 2 baris huruf kecil**, putih sans regular dengan bayangan, di bawah tengah. Watermark kecil di atas. Lebih tenang dibanding caption satu kata.
- **Ritme**: perubahan ±1,5 dtk, hard cut ±7,7 dtk (8 cut). Gabungan cut dan gerak kamera.
- **Hook**: "If you dig into a hill and put a door on it, you have a house. But after the first big rain, the dirt ceiling turns to mud and falls on your bed."
- **Gerak**: 24 fps sinematik, gerak kamera lembut, depth of field.
- **Skor anti-slop**: 8/10.
- **Adopsi**: gaya caption dua baris huruf kecil ini paling dekat dengan selera "calm, Apple-style". **Panel data** (termal, potongan) cocok untuk episode petir (medan magnet) dan es puter (suhu).

### R09 · Mildly Elsewhere, "He Flooded His Own Basement Before the River Could"
45.600.150 views · 14 Nov 2026 · 71 dtk · `R09-mildlyelsewhere-flood/`
- **Framing**: pembukaan medium shot orang menyiram selang ke basement; wide shot dua rumah saat banjir; close-up analogi kaleng soda; interior basement.
- **Palet**: natural, langit cerah; banjir cokelat.
- **Caption**: 2 baris huruf kecil putih, sama dengan R08.
- **Ritme**: perubahan tercepat di daftar ini (±1,1 dtk), dengan 9 hard cut.
- **Hook**: **paradoks dalam satu kalimat**: "He flooded his own basement the day before the river could." Lalu kontras dengan tetangga yang menumpuk karung pasir.
- **Analogi**: kaleng soda diremas, yang menjelaskan kenapa dinding basement kosong runtuh tapi yang berisi air bertahan.
- **Skor anti-slop**: 8/10.
- **Adopsi**: **struktur hook paradoks** untuk judul "Kenapa…" kita ("Petirnya jauh, kok TV-mu yang rusak?") dan **analogi benda dapur** untuk konsep fisika (tekanan, induksi). Ini satu-satunya video di grup gali tanah yang tidak berjudul "How a hole…" tapi paling tinggi viewsnya, jadi variasi judul boleh.

### R10 · Animagraffs, "How airliner brakes work"
1.269.119 views · 26 Jan 2024 · 29 dtk · 24 fps · 1,94 jt subs · `R10-animagraffs-brakes/`
- **Framing**: objek di tengah, latar **krem polos**, kamera mengorbit pelan. Roda menjadi **transparan x-ray**, lalu komponen terurai (exploded) ke samping.
- **Palet**: krem, abu metal, hitam. **Merah hanya untuk merek** di bawah. Paling dekat dengan prinsip 1-1-1.
- **Tipografi**: judul tetap di kotak putih di atas ("How airliner brakes work"); label komponen kecil hitam di kotak putih ("rotors") dengan garis penunjuk.
- **Ritme**: lambat (perubahan besar ±7 dtk), tapi satu orbit kontinu yang tidak pernah berhenti.
- **Hook**: tanpa VO di 2 detik pertama; hook-nya visual (roda pesawat nyata langsung jadi transparan).
- **Skor anti-slop**: 9/10. Sangat bersih.
- **Adopsi**: **gaya "Gini membuka diri"**: saat flap kardus terbuka, objek jadi transparan x-ray lalu terurai. Untuk thumbnail kita: latar polos + objek tunggal terurai.

### R11 · Branch Education, "How do Mechanical Pencils Work?"
406.662 views · 20 Sep 2021 · 60 dtk · 2,78 jt subs · `R11-branch-pencil/`
- **Framing**: diawali meja kerja nyata, kamera mendekat ke pensil, lalu **potongan melintang 3D** dengan latar gelap.
- **Palet**: latar gelap; komponen diberi warna fungsional (per merah muda, jari plastik hijau toska); label kuning/cyan.
- **Tipografi**: label teks berwarna dengan garis penunjuk, menempel pada komponen. Watermark kanal di bawah.
- **Ritme**: lambat dan mekanis. Satu aksi diulang (tekan, per terkompresi, jari terbuka) sampai paham.
- **Hook**: "But how does it work?" di atas benda yang semua orang punya.
- **Skor anti-slop**: 8/10. Label agak banyak warna, tidak ketat 1 aksen.
- **Adopsi**: **mengulang satu mekanisme dua kali**, sekali cepat dan sekali pelan dengan label, untuk momen "klek" rice cooker dan roda penarik ATM. Label dengan garis penunjuk menjadi format standar kita (Tinta + satu kata Biru Gini).

### R12 · Jared Owen, "Inside of Big Ben"
2.397.509 views · 14 Jun 2024 · 59 dtk · 4,45 jt subs · `R12-jaredowen-bigben/`
- **Framing**: kamera menembus dinding menara dan naik mengikuti tangga spiral; wide shot menara; interior lonceng isometrik.
- **Palet**: warna batu bata hangat dan biru langit. Gaya 3D setengah low-poly yang bersih.
- **Tipografi**: **caption kapital putih di kotak hitam kecil**, di tengah layar, maksimal 2 baris, selalu terbaca di latar apa pun.
- **Ritme**: perubahan ±2,2 dtk, dengan 4 hard cut.
- **Hook**: "For the last 150 years, the only way to climb up the clock tower is…" Fakta + rasa penasaran tentang tempat yang dikenal semua orang.
- **Skor anti-slop**: 8/10.
- **Adopsi**: **kotak di belakang caption** (pelat) terbukti efektif di latar ramai, cocok dengan pelat putih kita. "Fly-through" untuk episode Indomaret (kamera menyusuri gang dari ujung ke ujung).

### R13 · Zack D. Films, "How Stitches Work"
255.840.052 views · 24 Feb 2024 · 31 dtk · 29,8 jt subs · `R13-zackd-stitches/`
- **Framing**: **satu shot macro** pada betis; CG luka dan jahitan dikomposit di atas plate yang tampak live-action; push-in terus sampai potongan lapisan kulit.
- **Palet**: kulit natural, merah luka, putih benang. Hanya tiga warna penting.
- **Tipografi**: caption putih kecil (di video ini hampir tidak dominan).
- **Ritme**: nol cut. Seluruh 31 dtk adalah satu proses yang bertahap.
- **Hook**: luka terbuka di frame 0, gambar yang langsung memancing reaksi.
- **Skor anti-slop**: 7/10. Efektif, tapi gaya "ngeri"-nya tidak sesuai selera calm kita.
- **Adopsi**: **satu proses, satu shot, tanpa cut** untuk beat inti, mis. plak yang mengeras jadi karang di episode 6. Tetap jaga visual tidak menjijikkan sesuai catatan risiko.

### R14 · Kurzgesagt, "How to Cut a Sandwich Perfectly – With Science"
19.079.325 views · 25 Mei 2023 · 52 dtk · 25,8 jt subs · `R14-kurzgesagt-sandwich/`
- **Framing**: isometrik flat. Mesin pemotong di atas meja kotak-kotak; kemudian diagram lapisan; bumi dengan roti; tumpukan warna-warni.
- **Palet**: terang dan jenuh, tapi tiap adegan memakai keluarga warna sendiri. Maskot burung merah selalu ada.
- **Tipografi**: judul di awal; caption kecil putih di bawah.
- **Ritme**: ±2,2 dtk per perubahan, dengan 10 hard cut.
- **Hook**: judul + pertanyaan: "With a single straight cut, can you halve a three-ingredient sandwich with all components perfectly halved?"
- **Maskot**: burung Kurzgesagt sebagai **penonton/reaktor** di pojok adegan, peran yang sama dengan yang kita rencanakan untuk Gini.
- **Skor anti-slop**: 9/10.
- **Adopsi**: maskot sebagai reaktor kecil yang konsisten, dan isometrik flat sebagai **opsi produksi lebih murah** daripada 3D penuh untuk Gang Soalnya Gini. Palet jenuh Kurzgesagt **jangan** ditiru; tetap netral + Biru Gini.

### R15 · Lhoh Kok?, "Kenapa Sisi Lancip Sedotan Gampang Patah Tapi Sisi Tumpul Kuat?"
6.531.525 views · 24 Mei 2026 · 43 dtk · 154 rb subs · `R15-lhohkok-sedotan/`
- **Framing**: es kopi susu boba di bawah layar, sedotan dari atas; latar **mint polos**; foto kafe sebagai selingan; potongan melintang sedotan dengan panah gaya merah.
- **Palet**: mint pucat dominan; merah untuk panah gaya. Ada maskot bulat kecil berwajah.
- **Tipografi**: caption kecil putih bold dengan bayangan, di bawah tengah. Cap pembuka "Lhoh…".
- **Ritme**: ±2,1 dtk per perubahan.
- **Hook**: "Loh, kok kalau nusuk pakai sedotan lancip, sedotannya malah jebol ya? Tapi pas dibalik pakai sisi satunya malah aman-aman aja." Pengalaman yang semua orang Indonesia pernah alami.
- **Skor anti-slop**: 7/10. Campuran foto dan ilustrasi agak kurang konsisten.
- **Adopsi**: **bukti terkuat bahwa benda sehari-hari Indonesia + gaya minimal = jutaan view** di pasar kita. Cap pembuka seri ("Lhoh…") sejalan dengan rencana cap "Kalau… / Kenapa… / Katanya…".

### R16 · Lhoh Kok?, "Kenapa UN Pakai Pensil 2B?"
7.328.617 views · 11 Sep 2025 · 53 dtk · `R16-lhohkok-pensil2b/`
- **Framing**: satu objek (pensil, lembar jawaban) di tengah latar polos. Pemindai lembar jawaban sebagai objek kedua.
- **Palet**: mint/abu muda, biru pensil, putih kertas. Sangat tenang.
- **Tipografi**: caption hitam kecil di bawah objek, tanpa pelat. Tulisan cap "Lhoh…" di frame pertama.
- **Ritme**: ±2,7 dtk. Perubahannya adalah objek baru masuk frame, bukan cut.
- **Hook**: "Loh, kok tiap ujian nasional dulu harus pakai pensil 2B ya? Kenapa dari semua jenis pensil di dunia cuman si 2B yang jadi anak emas?" **Nostalgia sekolah + pertanyaan "kenapa"**.
- **Skor anti-slop**: 7/10. Caption terlalu kecil untuk 160 px.
- **Adopsi**: gaya "satu objek di tengah latar polos" untuk **thumbnail dan frame 1** kita; pola nostalgia (es puter) terbukti. Caption kita lebih besar.

### R17 · Pernah Pikir Kenapa?, "Kenapa Bikin Kolam Renang Nggak Bisa Cuma Gali Tanah"
10.668.092 views · 28 Okt 2026 · 54 dtk · 24 fps · 19,2 rb subs · `R17-pernahpikir-kolam/`
- **Framing**: halaman rumah modern dari atas 3/4. Orang menggali, mengisi air, pekerja menyemprot beton, potongan pipa filter, kolam jadi.
- **Palet**: ilustrasi kartun semi-realistis, krem dan hijau, air biru.
- **Tipografi**: caption **sangat kecil** putih di bawah. Hampir tidak terbaca di HP.
- **Ritme**: 16 hard cut, ±2,3 dtk per perubahan. Gambar diam dengan zoom/pan pelan.
- **Hook**: "Kalau kamu gali lubang di halaman, terus isi air, selamat! Kamu berhasil bikin kolam renang. Tapi tunggu…" **Terjemahan langsung pola R01 ke bahasa Indonesia.**
- **Audio**: loudness **−23,6 LUFS**, sangat pelan untuk Shorts. Kelemahan teknis.
- **Skor anti-slop**: 5/10. ⚠ Gaya dan tekstur ilustrasinya kemungkinan gambar AI generatif (still yang di-pan), belum pasti. Caption kecil dan audio pelan.
- **Adopsi**: **bukti bahwa format "Kalau kamu gali…" sudah 10,6 jt di Indonesia** dengan channel 19 rb subs. Kita menang dengan: caption besar, audio −14 LUFS, objek yang benar-benar dirakit (bergerak), dan set Indonesia, bukan rumah modern generik.

### R18 · Kok Bisa?, "Sisa Evolusi di Tubuh Kita Ini Udah 'Ngga Berguna'"
14.361.443 views · 14 Feb 2022 · 52 dtk · 6,5 jt subs · `R18-kokbisa-evolusi/`
- **Framing**: host medium close-up dengan sisipan 2D flat yang muncul di depan atau di samping host (gigi, usus, manusia purba).
- **Palet**: **merah Kok Bisa? sebagai satu aksen merek**, ilustrasi flat pastel.
- **Tipografi**: teks besar kapital putih dengan aksen merah ("BEBERAPA BAGIAN TUBUH", "GAK AKAN ADA EFEKNYA").
- **Ritme**: ±1,3 dtk per perubahan, 11 cut. Paling padat di daftar ini.
- **Hook**: "Hai, kalian sadar enggak kalau sekarang beberapa bagian tubuh kita tuh udah nggak berguna?"
- **Skor anti-slop**: 8/10 untuk sisipan grafisnya. Tidak faceless.
- **Adopsi**: konsistensi **satu warna merek** selama bertahun-tahun (merah Kok Bisa?) persis seperti rencana Biru Gini. Gaya sisipan flat 2D bisa jadi *B-roll* murah di sela adegan 3D.

### R19 · Material Populer, "Kenapa kita bisa mabuk saat naik mobil" (pembanding)
5.064.296 views · 23 Jul 2026 · `R19-materialpopuler-mabuk/`
- **Yang works**: hook berupa kartu komentar penonton ("min bahas kenapa…"), dan caption dengan kata kunci kuning.
- **Kenapa jangan ditiru**:
  - Gambar orang dan otak jelas buatan AI (wajah dan tangan berubah antar frame, kaos bermerek channel ditempel).
  - Visual tidak menjelaskan mekanisme, hanya mengilustrasikan kalimat.
- **Skor anti-slop**: 3/10.
- **Pelajaran**: topik mabuk terbukti 5 jt **walaupun** visualnya lemah. Versi yang benar-benar menjelaskan (telinga dalam vs mata, episode 2 kita) punya ruang naik.

### R20 · Kita Bedah, "2 lembar uang nempel di ATM bukan bonus" (pembanding / kompetitor)
1.843.185 views · 14 Nov 2026 · 71 dtk · `R20-kitabedah-atm/`
- **Yang works**: headline tetap di atas dengan satu kata kuning; karaoke caption dengan kata aktif kuning; tag seri ("GERAK LAMBAT").
- **Kelemahan**:
  - Visual berupa render 3D/AI statis yang di-zoom; 0 hard cut, perubahan ±3,7 dtk.
  - Teks padat (headline + caption + tag + kartu info) bersaing di satu layar.
  - Palet abu-krem datar.
- **Skor anti-slop**: 5/10.
- **Pelajaran**: kita membedakan diri lewat **gerak nyata** (komponen benar-benar bergerak), **satu fokus teks per layar**, dan aksen biru (bukan kuning).

---

## E. 7 pelajaran komposisi utama untuk Soalnya Gini

1. **Set tetap = maskot kedua.** R01–R05 memakai rumah dan potongan tanah yang sama di setiap video, sehingga penonton mengenali seri dari frame pertama. Kunci satu diorama "Gang Soalnya Gini" dengan **potongan tanah selalu terbuka di sepertiga bawah layar**, dan pakai ulang di semua episode.
2. **Kalimat pertama = jebakan solusi naif.** Semua video gali tanah dengan views > 10 jt dibuka dengan "If you [cara naif], you have [benda]. But…", termasuk versi Indonesia R17 (10,6 jt). Tiap "Tapi…" wajib memunculkan **satu komponen baru di layar**. Itu yang membuat 60–70 dtk terasa cepat.
3. **Ritme datang dari gerak, bukan dari cut.** R01/R02 tidak punya hard cut sama sekali, tapi ada perubahan visual tiap 2,4–2,7 dtk (komponen tumbuh, kamera menyelam). Target kita: **perubahan tiap 2–3 dtk, hard cut maksimal 1 per 8–10 dtk**, kamera hampir tidak pernah diam.
4. **Satu aksen untuk "yang sedang dijelaskan".** R03 (putih + satu figur oranye) dan R10 (krem + merah untuk merek saja) terbaca paling cepat. Di Soalnya Gini: dunia netral desaturasi, **Biru Gini hanya untuk aliran yang dijelaskan** (air tanah, arus petir, sinyal PIN, uap), dan sama di caption.
5. **Caption harus menang di layar HP.** Referensi terbaik memakai satu kata (R01) atau maksimal 2 baris (R08, R12). Yang gagal terbaca (R16, R17) memakai huruf terlalu kecil. Kita pakai **80 px bold di pelat putih, maksimal 2 baris, kata aktif biru**, dan angka kunci di label terpisah (pola R06: "10 m", "100 °C").
6. **Momen "buka" = signature.** Animagraffs (x-ray lalu exploded), Branch (benda nyata lalu potongan 3D), dan Zack D. (push-in sampai lapisan dalam) sama-sama punya satu momen transformasi yang selalu ditunggu. Jadikan **flap kardus Gini terbuka, objek jadi transparan, lalu terurai** sebagai momen wajib di detik 4–6 setiap episode, dengan sound logo yang sama.
7. **Durasi 55–70 dtk boleh, asalkan ada build lengkap. Audio harus keras dan bersih.** Data viralshooter: Shorts 70 dtk Mildly Elsewhere tipikal 2,9 jt vs 156 rb untuk versi 30 dtk. Hampir semua referensi > 1 jt ada di −10 s/d −16 LUFS, sementara R17 (−23,6) terlalu pelan. Target kita: **50–60 dtk, loudness ±−14 LUFS, VO 2,5–3 kata/detik** dalam bahasa Indonesia.

---

## F. Yang belum bisa diverifikasi
- Video 21,4 jt di grid Ernesto dan angka TikTok You Built It. TikTok tidak bisa dibaca dari box, jadi kecocokan akun hanya dari visual frame dan keterangan possible.sh.
- Facebook Reels dan Instagram: tidak ada pengecekan (perlu login).
- Penilaian SFX/musik adalah perkiraan; audio tidak saya dengarkan.
- Dugaan bahwa R17 (Pernah Pikir Kenapa?) memakai gambar AI belum pasti. R19 (Material Populer) jelas AI.
- Lagon dan Exploded Works dari daftar awal tidak ditemukan dalam bentuk yang bisa dipakai.
