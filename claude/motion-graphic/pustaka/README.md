# Pustaka: cara memakai referensi

Tujuan repo ini menaikkan mutu hasil dari prompt Irfan, bukan menyediakan template. Caranya: tiap video punya **satu kiblat** yang dipilih sadar, dan hasilnya dibandingkan dengan kiblat itu sebelum dikirim. Video yang punya beberapa mode (mis. talking head dan motion graphic layar penuh) boleh memakai kiblat berbeda per mode, asal gayanya tetap konsisten: palet, huruf, dan register gerak satu keluarga, dan `RESEP.md` menulis kiblat tiap mode beserta pengikat bersamanya.

| File | Isi | Kapan dibaca |
|---|---|---|
| `../LANTAI.md` | mutu yang berlaku di semua video | selalu, sebelum apa pun |
| `PETA.md` | satu baris per referensi | selalu, untuk memilih kiblat |
| `kartu/<ref>.md` + frame kuncinya | anatomi 8 bagian satu referensi dan contoh visualnya | kartu kiblat, dan kartu lain tiap kali sebuah adegan butuh bentuk/teknik di luar kiblat |
| `RESEP-TEMPLATE.md` | resep 8 baris per video | disalin ke `projects/<proyek>/RESEP.md` |
| `teknik/` | pola lintas referensi yang boleh dipinjam (kinetic typography, resep editing, peluncuran produk/UI `launch-motion.md`, animasi karakter maskot `animasi-karakter-clawd.md`) | saat merancang bagian itu |
| `../fonts/README.md` | file font, pengganti, dan peran tiap jenis huruf | saat mengisi baris Teks di resep |
| `contoh-gagal/` | frame yang pernah Irfan tolak + sebabnya | sebelum merancang adegan dan setiap kali menilai still atau frame |

## Kartu itu apa, dan untuk apa
Kartu adalah **perpustakaan referensi gaya Irfan**: tiap kartu membedah satu video yang menurut Irfan bagus, lengkap dengan frame kuncinya (`../guide/referensi/sheets/keyframes/<no>-k*.jpg`). `contoh-gagal/` adalah kebalikannya: frame yang ia tolak. Tujuannya supaya Irfan tidak perlu mengajari model atau mengirim referensi lagi di tiap sesi. Ia cukup menyebut gaya dengan kata-kata, dan model belajar dari kartu: mana yang bagus, mana yang jelek, bagaimana desainnya dibuat, dan bagaimana objek, teks, dan ruang kosongnya disusun.

Kartu dipakai di tiga saat, selalu **dengan melihat frame kuncinya**, bukan hanya membaca teksnya:
1. **Memilih arah.** Permintaan gaya dalam kata-kata (mis. "2,5D, kinetic typography yang bergerak mengelilingi pembicara") jarang tertulis persis di satu kartu. Cari yang **terdekat** lewat `PETA.md` (kolom "Kata kunci gaya", "Cocok untuk", "Diambil untuk") dan isi kartu, buka frame kunci 2–3 kandidat, dan pilih dengan mata. Sebut ke Irfan kartu mana yang dipilih dan kenapa; bertanya hanya bila tidak ada yang mendekati.
2. **Merancang tiap adegan.** Sebelum membangun sebuah bentuk (kata hero, b-roll tipografi, tampilan aplikasi, tokoh), lihat bagaimana kartu membangunnya (§Alur butir 5). Bentuk tidak dikarang dari bayangan sendiri.
3. **Menilai dan memperbaiki.** Frame hasil dibandingkan dengan frame kunci (yang bagus) dan `contoh-gagal/` (yang jelek). Frame yang lemah diperbaiki dengan solusi desain yang prinsipnya ada di kartu, bukan dengan geseran kecil (`../templates/roles/pemeriksa-frame.md`).

Kartu kiblat tetap satu per video dan memegang pengikat (warna, huruf, ritme). Kartu lain dibuka kapan pun sebuah adegan butuh teknik atau bentuk yang tidak dimiliki kiblat.

## Pengikat dan teknik
Delapan bagian anatomi dibagi dua:
- **Pengikat**: warna & tekstur, teks, ritme. Ketiganya diambil utuh dari **satu** sumber (kiblat). Inilah yang membuat video terasa satu keluarga.
- **Teknik**: b-roll/footage, motion graphic, kamera & transisi, SFX, musik. Boleh dipinjam dari kartu lain bila kiblat tidak punya atau lemah di bagian itu. Teknik pinjaman selalu dikenakan pengikat kiblat (warna, huruf, tekstur, dan tempo kiblat), dan pinjamannya ditulis di resep.

**Kartu adalah contoh mutu dan sumber teknik, bukan ukuran untuk disalin.** Video tidak dinilai dengan angka absolut: teknik yang sama butuh ukuran, letak, dan warna berbeda di footage yang berbeda. Yang dicatat kartu untuk tiap teknik (`KARTU-TEMPLATE.md`): **yang terlihat, termasuk geraknya** (apa yang bergerak, urutan masuk, apa yang tajam dan apa yang lunak); **kenapa ia bekerja di video itu** (kondisi footage aslinya: rasio, skala subjek, terang-gelap, ruang kosong, pakaian dan latar); **cara membuatnya** (lapisan, matte, kamera, urutan); **pakai bila / jangan pakai bila**; dan **bila kondisinya beda, sesuaikan apa**. Angka visual (persen tinggi frame, jumlah frame masuk) hanya muncul berlabel "pengamatan di video asli, bukan target"; angka audio dan ritme tetap ditulis karena memang wilayah ukur, juga sebagai pengamatan. Memakai kartu = membaca kondisi footage sendiri dulu, memilih teknik yang syaratnya cocok, lalu menyesuaikannya; bukan menyalin angkanya. **Kapan dan berapa lama** teks atau adegan tampil selalu diambil dari audio video yang sedang dikerjakan (timestamp kata), tidak dari kartu. Kartu boleh menentukan bentuk hitungan tahan (per kata atau per frasa) dan lama gerak masuk-keluar; nilainya tetap dihitung dari audio (`typography.md` §8, §11).

## Urutan sumber
1. **Prompt Irfan**: apa yang dibuat dan syaratnya.
2. **Video referensi yang Irfan kirim di sesi**: kiblat dan pemilik pengikat. Selalu menang atas pustaka.
3. **Pustaka**: mengisi teknik yang tidak ada di kiblat; bila tidak ada referensi baru, satu kartu dipilih dari `PETA.md`.
4. **Lantai**: mengecek hasil, apa pun gayanya.

## Alur satu video
1. Baca `../LANTAI.md` dan `PETA.md`.
2. Tentukan kiblat (`PETA.md` §Cara memilih). Buka kartunya.
3. Salin `RESEP-TEMPLATE.md` ke `projects/<proyek>/RESEP.md`, isi 8 baris. Jalankan `python3 ../scripts/juri/resep_check.py projects/<proyek>/RESEP.md`.
4. Prompt menyebut gaya atau membawa referensi: langsung jalan dan kirim resep bersama hasil. Bagian yang tidak punya perintah gaya spesifik mengikuti gaya global brief video itu (mis. brief "talking head profesional + Apple-style motion" → gaya bawaan yang cocok, seperti `templates/gaya/minimal-premium`, boleh dipakai); bila brief juga tidak menyebut gaya, pilih kartu yang paling mirip dengan isi brief, atau susun gaya sendiri yang sesuai brief, tulis alasannya di `RESEP.md`, lalu jalan tanpa menunggu.
5. **Bentuk visual dicari di kartu, tidak dikarang.** Tiap kali sebuah adegan butuh bentuk yang tidak diatur kartu kiblat (tampilan Instagram, chat, dashboard, peta, grafik, tokoh, dsb.):
   1. Cari di `PETA.md` (kolom "Cocok untuk" dan "Diambil untuk") dan di isi kartu (`grep -il <nama bendanya> kartu/*.md` hanya untuk menemukan kartunya). Buka kartu yang memuatnya **dan frame kuncinya** (`../guide/referensi/sheets/keyframes/<no>-k*.jpg`), lihat bagaimana benda itu dibangun di sana (apa yang dibuang, ruang kosongnya, perlakuan teks, kedalaman, kamera), lalu pinjam tekniknya dengan pengikat kiblat dan catat di baris teknik `RESEP.md`.
   2. Bila tidak ada kartu yang memuatnya, dan brief, `RESEP.md`, serta `DECISIONS.md` juga tidak menjawab: tanya Irfan tampilan seperti apa yang ia mau, sebelum membangun.
   Lihat juga `contoh-gagal/` untuk bentuk yang sama. Membangun dari bayangan sendiri tanpa dua langkah ini = adegan belum siap dibangun.
   Kartu berstatus "format lama" atau "gerak belum dilihat" dipakai dengan membuka frame kunci **dan video sumbernya bergerak** (strip semua frame di momen tekniknya, §Referensi baru butir 1) sebelum tekniknya dipinjam.
6. **Lembar kondisi footage (wajib sebelum build).** Untuk tiap jenis shot di video ini (mis. talking head dekat, talking head lebar, layar aplikasi, adegan 3D, b-roll): satu still footage asli + catatan rasio dan crop, skala wajah/subjek, terang-gelap latar dan di mana, pakaian (polos/bermotif, terang/gelap), letak ruang kosong, benda yang ramai, kamera diam/bergerak. Simpan di `projects/<proyek>/qc/kondisi/` dengan `KONDISI.md`. Tiap teknik kartu yang dipilih dicocokkan dengan "Kenapa bekerja" dan "Pakai bila / Jangan pakai bila"-nya terhadap lembar ini; yang kondisinya beda diberi penyesuaian tertulis di baris teknik `RESEP.md` ("kartu 83 T4 · pakaian bermotif → kata pindah ke dinding polos di samping kepala"), tidak disalin.
7. **Lembar spine gaya (wajib sebelum pekerja paralel mulai).** Satu still per peran teks yang dipakai video ini (R1 narasi, R2 kata kunci, R3 klaim, R4 label/daftar, R5 UI, R6 hero, sub: `../references/typography.md` §8a), masing-masing di atas footage asli dari jenis shot paling sulit di lembar kondisi, ditambah satu still per teknik pinjaman. Sutradara menilai lembar ini berdampingan dengan frame kunci kartu, menguncinya di `qc/spine/SPINE.md` (path still + satu kalimat per peran: ukuran relatif terhadap subjek, letak, warna, gerak), dan baru sesudahnya TASK adegan dikirim. Mengubah peran setelah dikunci = ubah spine dulu, lalu semua adegan yang memakainya.
8. Build. Render hanya lewat `../scripts/juri/render.sh` (still → draft → final).
9. **Juri** sebelum kirim (di bawah).

## Juri
Juri visual adalah mata, dan penilainya satu: Sutradara melihat gambarnya, dengan frame kunci kiblat sebagai contoh yang bagus dan `contoh-gagal/` sebagai contoh yang jelek. Skrip hanya dipakai untuk hal yang tidak terlihat di gambar (sinkron frame, audio) atau sebagai penunjuk frame yang perlu dilihat; tidak ada skrip yang memutus gaya, posisi, keseimbangan, atau estetika. `qc/JURI.md` ditulis dari yang terlihat di gambar (apa, di mana, mirip frame kunci atau contoh gagal yang mana), bukan dari koordinat atau angka skrip, dan menyebut **setiap** still di `qc/stills/`; satu still per beat adalah jumlah paling sedikit.

Dijalankan pada still per beat, sebelum render penuh:
1. `python3 ../scripts/juri/teks_cek.py qc/stills/` (alat bantu, bukan putusan): menunjuk still yang mungkin punya teks di pita bawah berturut-turut, kata tampil dua kali, atau teks menyentuh tepi. Tiap still yang ditunjuk dibuka dan diputus dengan mata. Kata ganda antara teks kinetik dan teks UI = GAGAL, diperbaiki, tidak diberi alasan.
   Proyek lego: `python3 ../scripts/juri/kt_ocr.py <proyek>/lego` membaca tiap kata KT pada onsetnya + 4 f dari render lapisannya; kata yang belum utuh/terbaca = GAGAL di `render.sh final`. OCR yang salah baca huruf bergaya ditulis ke `qc/kt_ocr_terima.json` dengan frame yang dicek mata.
2. **Keseimbangan dan tata letak dinilai dengan mata** (Lantai C17), bukan skor skrip. Buka tiap still di frame **frasa utuh** pada ukuran normal dan kecil (±25 %), lalu jawab per still di `qc/JURI.md`:
   - **Massa kiri-kanan:** elemen yang ditaruh (teks, kartu, tokoh, wajah/lingkaran) mengimbangi sisi lawannya; satu sisi penuh sementara sisi lain kosong = gagal. Detail latar footage (pintu, perabot) bukan massa yang ditaruh.
   - **Satu fokus:** mata tahu harus melihat ke mana; dua teks sama kuat yang tampil bersamaan = gagal.
   - **Urutan baca:** atas→bawah / kiri→kanan sama dengan urutan ucapan; hero di atas narasi yang diucapkan lebih dulu = gagal kecuali narasi sudah hilang.
   - **Satu permukaan:** teks dan objek duduk utuh di satu bidang; huruf yang terpotong tepi jendela/kartu/lingkaran (setengah di dua bidang) = gagal.
   - **Ruang dekat subjek:** teks menempel subjek/objek yang dirujuk dan memakai ruang kosong terdekat **di dalam bidang gambar**, tidak menyentuh margin 5 %, tidak duduk rendah di dekat batas bawah, dan tidak ditaruh di pita kosong di luar gambar selama ada ruang di dalamnya.
   - **Sekeluarga dengan kiblat:** tidak ada elemen yang terasa tempelan (warna di luar palet, tulisan tangan/panah/stiker di tampilan yang netral).
   Tulis `KESEIMBANGAN <still>: LULUS|GAGAL — <yang terlihat>`. GAGAL diperbaiki posisinya.
3. `python3 ../scripts/juri/sandingkan.py qc/stills/ <sheet kiblat> qc/sanding.jpg` : lembar sanding still kita vs frame kiblat.
4. Lihat lembar sanding itu, lalu isi `qc/JURI.md`: tiap pertanyaan "Yang harus terasa sama saat disandingkan" di kartu kiblat (kartu format lama: "Cek kemiripan", dibaca sebagai pertanyaan yang sama, bukan angka yang harus cocok) dan tiap butir `LANTAI.md` A–D diberi LULUS/GAGAL + nama still buktinya + apa yang terlihat. Butir yang bertabrakan dengan Lantai tidak gugur diam-diam: dicatat di `RESEP.md` §Penyesuaian karena LANTAI (bunyi butir → versi yang disesuaikan), lalu dinilai terhadap versi itu. Bandingkan juga dengan `contoh-gagal/`.
   Beat yang meminjam **teknik** dari kartu lain (baris teknik di `RESEP.md`) disandingkan juga dengan frame kunci kartu itu, dan pertanyaan kartu itu yang menyangkut teknik pinjaman masuk `qc/JURI.md` dengan jawaban dari yang terlihat: apakah syarat "Kenapa bekerja" teknik itu terpenuhi di footage kita, atau penyesuaian di `RESEP.md` sudah dikerjakan. Angka kartu bukan ukuran lulus. Kiblat lulus tidak menutupi teknik pinjaman yang meleset.
5. Ada GAGAL = perbaiki adegan itu dan ulangi still-nya saja. Semua LULUS = baris terakhir `qc/JURI.md` ditulis `PUTUSAN: LULUS`, baru `render.sh final`.
6. **Audit visual semua frame, tanpa sampling (setelah visual selesai, sebelum SFX dan musik)**: `render.sh <proyek> frames <Comp>` (semua frame, jpeg skala 0,5) → `python3 ../scripts/juri/frame_audit.py qc/frames --src remotion/src --cuts <beats> --words <words>`. Sutradara menilai tiap potongan ≤ 10 dtk sendiri, mengikuti `../templates/roles/pemeriksa-frame.md`: buka frame kunci kiblat dan `contoh-gagal/` dulu, lalu semua frame tahan (`tahan/*.jpg`, satu per detik, ukuran besar) untuk gaya, posisi, keterbacaan, dan estetika; lembar 30 frame per detik hanya di detik bertanda otomatis, untuk transisi dan patahan. Tiap frame yang lemah diberi solusi desain yang diambil dari kartu, lalu `VERDICT.md` ditulis (masalah per baris + `PUTUSAN: LULUS/GAGAL`). Sesudahnya, sekali sebelum render final, satu **Creative Devil's Advocate** dari luar melihat videonya dengan brief steril dan memberi usul, bukan putusan (`../templates/roles/devils-advocate.md`); cek mekanik (frame kosong, kedip, patahan, teks bertumpuk/terpotong) dikerjakan skrip, bukan model. Audio tidak dinilai di sini: setelah SFX dikunci, kecocokan bunyi dengan gerak diperiksa terpisah (`frame_audit.py --fase audio` → `qc/audio_audit/`, prompt `../templates/roles/pemeriksa-audio.md`). GAGAL = perbaiki lalu audit ulang potongan yang berubah. Audit semua frame ini dijalankan saat membangun video dan sekali sebelum render final; **selama revisi Irfan tidak diulang tiap ronde**: tiap ronde revisi cukup rakit rentang yang berubah dan lembar sebelum/sesudah (`../references/revision-log.md` §0 butir 6).
7. **Sebelum final, pastikan semuanya**: draft seluruh video (`render.sh draft`, skala 0,5) dilihat geraknya per beat, dan setiap catatan Irfan yang aktif di `DECISIONS.md` diberi baris di `qc/JURI.md` (catatan → LULUS + still/frame draft buktinya). Masih ada yang belum pasti (tafsiran belum dicocokkan dengan kartu, gerak belum dilihat, pertanyaan Editor terbuka) = jangan render final.


## Referensi baru
Saat Irfan mengirim video referensi:
1. **Lihat bergerak, bukan hanya diam.** Contact sheet (1 frame per 2 detik) ke `../guide/referensi/sheets/<no>-<nama>.jpg` hanya untuk menemukan momen teknik. Di tiap momen teknik, buat **strip semua frame** ±1,2 dtk dan buka gambarnya:
   `ffmpeg -v error -ss <detik> -t 1.2 -i <video> -vf "scale=220:-1,drawtext=text='%{n}':x=2:y=2:fontsize=12:fontcolor=yellow,tile=6x6" -frames:v 1 <kerja>/strip_<detik>.jpg`
   Dari strip itu catat: apa yang bergerak (kamera atau teks), urutan masuk (per huruf, per kata, sekaligus), apa yang tajam dan apa yang lunak, kapan latar berubah, apa yang menutupi apa, dan cara keluar. Satu frame diam tidak memperlihatkan semua itu: kata yang sengaja buram terbaca sebagai cacat, latar yang diredupkan lewat matte terbaca sebagai pencahayaan syuting. Gambar kerja disimpan di luar repo; yang masuk repo hanya frame kunci (`keyframes/<no>-k*.jpg`). Lalu transkrip dan ukuran ritme (`../scripts/audio/pace_read.py`).
2. Tulis kartu dari `KARTU-TEMPLATE.md`: kondisi footage aslinya dulu, lalu tiap teknik dengan lima bagiannya. Hanya yang terlihat atau terukur; bagian yang belum dibedah ditulis "belum dibedah", tidak dikarang. Baris kepala "Dilihat bergerak" = ya hanya bila strip semua frame sudah dibuka.
3. Kartu dipakai sebagai kiblat sesi itu. Setelah videonya lulus dari Irfan, tambahkan satu baris ke `PETA.md`.

## Tumbuh: ke mana pelajaran disimpan
Skill ini mengajarkan **cara memutuskan** (kapan A, kapan B, dan kenapa), bukan template yang harus dipatuhi. Repo ini memisahkan dua jenis pelajaran, tanpa bertanya ke Irfan apakah koreksinya berlaku untuk video lain:
1. **Aturan proyek (bawaan).** Koreksi Irfan dan alasannya berlaku untuk video itu → `projects/<proyek>/DECISIONS.md`. Selera dan gaya (warna, jenis huruf, tulisan tangan, gaya komik, efek tertentu) selalu di sini. Sesi lain tidak membuka folder proyek ini dan tidak memakainya sebagai aturan.
2. **Pelajaran global (hanya kesalahan kerja).** Bila kesalahannya salah di gaya apa pun (teks menutup wajah atau terpotong, fonem terpotong, yang sudah disetujui ikut berubah, elemen ditambahkan padahal tidak diminta), alasannya diturunkan menjadi learning "bila <kondisi>, pilih <X>, karena <alasan>" di bagian **Cara memutuskan** pada `../guide/<urusan>/GUIDE.md`; asal-usulnya dicatat di `../SUMBER.md`. Learning adalah rujukan menimbang, bukan aturan. Ragu = aturan proyek.

Koreksi itu sendiri disimpan di tempat yang cakupannya paling sempit dan masih benar:
| Koreksi tentang | Simpan di |
|---|---|
| video ini saja, termasuk selera dan gaya | `projects/<proyek>/DECISIONS.md` |
| cara memakai satu gaya | "Catatan pakai" di kartu kiblatnya |
| frame yang ditolak | `contoh-gagal/` : gambar + satu kalimat sebab + konteksnya |
| semua video, apa pun gayanya | usul ke `../../../PENDING.md`; masuk `../LANTAI.md` hanya setelah muncul di 2 video berbeda dan Irfan menyetujui bunyinya |

Yang tidak dilakukan: mengubah satu koreksi menjadi larangan umum (contoh: "serif pucat raksasa tidak menyatu dengan frame ini" bukan "serif dilarang").
