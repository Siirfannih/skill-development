# Teks: sedikit kata, maks 2 baris, tidak bertumpuk

**Tujuan.** Teks membantu menangkap kalimat, bukan dibaca seperti artikel.

## Bagus itu seperti apa
- 01: caption putih bold 1–3 kata, satu baris, posisi tetap di area dada. Kata kunci besar condensed muncul terpisah, bukan di baris caption.
- 03: tipografi raksasa memenuhi frame untuk kata inti; subtitle kecil tetap terpisah di bawah.
- 04: teks kecil di tengah, kata per kata, tenang. Kecil tetap terbaca karena latarnya polos.
- 05: kinetik bertumpuk boleh **sebagai tekstur**, asal satu baris menyala yang jadi fokus.

## Cara (pilih yang cocok)
- **Blok seimbang, bukan kalimat**: tampilan dua baris atau lebih adalah satu blok; baris terpendek ≥ 85 % lebar baris terpanjang. Kata besar diskalakan sampai lebarnya = lebar baris kecil di atasnya, ujungnya sejajar ("sesuatu yang / **unik.**"). Gagal: baris pengantar 5–6 kata di atas satu kata besar (atas panjang, bawah pendek).
- **1–3 kata per tampil**, frasa diganti utuh di tempat yang sama ("By" → "By People" → "no smarter" → "than you"); kalimat panjang tidak ditumpuk jadi 2 baris subtitle.
- **Tanpa kotak di belakang narasi.** Bentuk + teks dua baris = lower-third berita, nilai editorialnya hilang. Kotak hanya chip yang menempel dan ikut bergerak dengan objek, atau sorot satu kata hero.
- **Mode berganti**: kata hero sendirian sangat besar, blok seimbang, frasa pendek, label menempel objek, tumpuk kata (satu kata per baris, muncul per kata); tidak > 2 tampilan berturut dengan mode + posisi sama.
- **Satu lapisan teks.** Di beat bermode TEKS (NEGATIF 6), teks tampil sebagai tipografi kinetik yang posisinya lahir dari komposisi shot; beat VISUAL tanpa teks; tidak ada baris subtitle terpisah di pita bawah, dan kata penekanan tidak diulang di tempat lain (NEGATIF 6).
- 1–3 kata saat menyertai VO (NEGATIF 6); tampilan bermode TEKS boleh lebih, maks 2 baris; lebih panjang → pecah jadi tampilan berurutan.
- Waktu baca ≥ max(0,8 dtk; 0,30 + 0,06 × huruf); kata tersebar terbaca satu arah; teks/ikon/kartu tidak bertabrakan (Lantai A8).
- Satu baris satu ukuran; kata yang dibesarkan pindah baris sendiri.
- Gaya teks dipilih sekali per video lalu konsisten (sistem huruf: NEGATIF 1).
- Teks layar dari ucapan saja (Lantai A5).
- **Kata yang sudah tampil tidak bergeser** saat kata berikutnya masuk: dalam satu frasa, wadah (kartu/chip) dikunci di tepi frasa lengkap dan tumbuh ke arah kata baru. Saat kata berganti di tempat yang sama, tidak ada frame dengan dua kata tajam bertumpuk (kata lama blur/pudar dulu) dan tidak ada frame wadah kosong.

## Cara memutuskan (alasan dari koreksi Irfan; rujukan menimbang, bukan aturan)
Cari kelompok yang cocok dengan situasimu, baca butirnya utuh. Kondisinya harus cocok dulu; pelajaran bukan larangan umum.

### Posisi dan keseimbangan di atas footage
- Keseimbangan seluruh frame sesudah koreksi posisi: VIS-01 di `../visual/GUIDE.md`. Kontras huruf: TKS-03.
- **[TKS-04] Ruang teks dipilih dari fungsi objek dan kedekatan ke fokus** · kelas P · cek: still per shot sebelum build
  - Pemicu: teks duduk di atas footage yang memuat subjek atau objek.
  - Anti-pola: memilih ruang paling kosong atau paling gelap yang jauh dari subjek, mendorong teks ke margin luar (rata kiri di 8–12 % lebar) saat subjek di sisi lawan sehingga tengah frame jadi ruang mati, atau memakai satu posisi untuk semua shot.
  - Invarian: tandai fungsi tiap objek (wajah = ekspresi, tangan/karya = bukti, bidang polos = ruang teks), lalu pilih ruang yang jaraknya ke batas terluar subjek yang dirujuk (bahu, kursi, kepala) 4–8 % lebar frame dan lebih kecil dari jaraknya ke tepi (Lantai 2), dengan rata teks menghadap subjek (subjek di kanan → blok teks di tengah-kiri rata kanan; subjek di kiri → tengah-kanan rata kiri) dan bidang di bawah huruf yang lolos TKS-03 di seluruh rentang, bukan hanya di thumbnail.
  - Karena: teks yang jauh dari fokus membuat mata melompat, dan teks yang mepet tepi terasa terdesak.
  - Boleh: footage pengisi yang ditimpa teks (TKS-05); kotak tubuh tidak otomatis melarang teks.
  - Gerbang: tunjukkan still tiap shot dengan kotak subjek, kotak teks, dan dua jarak (ke subjek, ke tepi); kotak wajah diambil dari detektor (semua wajah di foto ramai, bukan hanya satu) dan diukur terhadap kotak teks di awal, tengah, dan akhir tampil dengan transform kamera yang sama; irisan = GAGAL sebelum render.
- **[TKS-06] Penempatan yang diteruskan ke sesi lain memakai peta** · kelas P · cek: sebelum sesi build dimulai
  - Pemicu: posisi teks akan dibangun oleh sesi atau pekerja yang tidak memetakan footage-nya sendiri.
  - Anti-pola: meneruskan koordinat atau gambar koreksi sebagai posisi universal, tanpa fungsi objek dan rentang waktu.
  - Invarian: satu sesi pemetaan melihat frame aktual dan gerak di rentang yang dipakai, lalu menulis `placement-map.json` per shot: objek + fungsi, fokus, area bukti yang dilindungi, kandidat ruang, ruang terpilih, alasan keseimbangan, perlakuan kontras, transform kamera, sumber + rentang waktu.
  - Karena: pembangun yang hanya menerima koordinat tidak tahu kapan posisinya berhenti berlaku saat shot, crop, atau objek berubah.
  - Boleh: video tanpa footage (kartu polos, 3D penuh).
  - Gerbang: `placement-map.json` ada dan tiap shot berisi semua kolom; shot, crop, atau objek yang berubah sesudah pemetaan = entri dipetakan ulang.
- **[TKS-05] Peran footage menentukan peran teks** · kelas P · cek: lembar kondisi footage sebelum build
  - Pemicu: shot berisi footage di bawah teks ucapan.
  - Anti-pola: memperlakukan semua footage sama, sehingga teks mengalah di b-roll pengisi atau menutup wajah di footage yang membawa informasi.
  - Invarian: catat peran tiap shot; footage pengisi (stok tanpa informasi) → teks jadi pemeran utama, boleh besar di tengah menimpa footage; footage informasi (pembicara, arsip yang dirujuk, foto berwajah) → teks di ruang kosong yang menempel subjek (TKS-04) tanpa menutup wajah.
  - Karena: mata harus langsung tahu apa yang dibaca dulu, dan menimpa footage pengisi tidak menghilangkan informasi.
  - Boleh: bila subjek terang hanya di sebagian frame (siluet di atas, sisanya gelap), teks pindah ke bidang kosong lawannya supaya frame seimbang, walau footage-nya stok.
  - Gerbang: tabel shot berisi peran footage, posisi teks, dan alasan; tunjukkan satu frame per shot.
- **[TKS-07] Teks ucapan dari video di dalam tampilan ikut masuk ke bidang video** · kelas P · cek: still tiap tampilan
  - Pemicu: video ditampilkan sebagai isi sebuah tampilan (postingan, jendela aplikasi, ponsel).
  - Anti-pola: menaruh teks ucapan di pita kosong di bawah atau di luar bidang video, sehingga terbaca sebagai subtitle.
  - Invarian: taruh teks ucapan di ruang kosong dekat subjek di dalam bidang video; yang di luar bidang hanya elemen tampilan itu sendiri (caption, komentar, tombol).
  - Karena: ceritanya "video ini sudah diposting", jadi teksnya bagian dari video.
  - Boleh: punchline keluar ke layar penuh (slab warna atau kata besar di atas footage) lalu kembali ke tampilan, karena di kotak kecil punchline kehilangan skala (contoh gagal 16; teknik slab di kartu 85 T1).
  - Gerbang: tunjukkan still tiap tampilan; teks ucapan di luar bidang video tanpa alasan punchline = GAGAL.

### Kata hero dan kedalaman
- Bentuk kata hero, kata di belakang kepala, dan kata hero yang duduk rendah di depan dada: Catatan pakai kartu 83 dan 85. Zona bawah frame dan kontras: Lantai 7, TKS-03.

### Bentuk dan variasi teks
- **[TKS-08] Perlakuan kata yang dipindah diputus ulang dari makna kata barunya** · kelas P · cek: sebelum blok yang diubah dirender
  - Pemicu: naskah atau urutan berubah sehingga warna, ukuran, gaya, atau posisi sebuah kata dipindah ke kata lain.
  - Anti-pola: menyalin perlakuan apa adanya, sehingga emosi kata asal (warna negatif, gaya kacau milik keraguan) menempel di kata yang maknanya lain.
  - Invarian: untuk tiap blok yang diubah, tulis satu baris per atribut (warna = peran X karena …, ukuran = peran Y karena …, posisi = … karena …), diambil dari token tema atau dari peran baru yang ditambahkan ke tema dengan alasan.
  - Karena: perlakuan membawa emosi, dan perlakuan yang salah membuat kata positif terbaca seperti peringatan.
  - Boleh: peran teks yang sudah ada di video dipakai ulang bila maknanya sama.
  - Gerbang: atribut tanpa baris alasan = GAGAL (contoh gagal 12).
- **[TKS-09] Preview tipografi menampilkan seluruh teks beat TEKS di rentangnya** · kelas P · cek: sebelum preview dikirim ke pemilik
  - Pemicu: mengirim uji tipografi atau preview alur untuk satu rentang dialog.
  - Anti-pola: preview hanya memunculkan kata hero sehingga kata sebelumnya tampak hilang, atau seluruh latar digelapkan supaya teks terbaca padahal footage asli diminta tetap.
  - Invarian: tampilkan satu pikiran lengkap dengan semua teks yang dijadwalkan di rentang itu (beat TEKS), di atas footage asli, dan laporkan kontras sebenarnya (TKS-03).
  - Karena: pemilik menyetujui apa yang ia lihat, dan preview yang memotong kata membuat persetujuannya tidak berlaku untuk video jadi.
  - Boleh: bukti teknik internal (satu kata, satu efek) yang tidak dikirim sebagai preview alur.
  - Gerbang: `scripts/juri/kt_ocr.py` pada lapisan preview: tiap kata di rentang terbaca; kata yang hilang = GAGAL.

- **[TKS-01] Urutan baca mengikuti urutan ucapan** · kelas P · cek: lembar kontak per frasa
  - Pemicu: dua frasa atau lebih dari satu kalimat tampil bersamaan.
  - Anti-pola: semua frasa satu value dan ukuran, atau sebagian diberi gaya asing; lolos hanya karena tidak bertabrakan.
  - Invarian: satu keluarga gaya (huruf, hue, kemiringan); frasa yang sedang diucapkan = lapis 1 (value, ukuran, ketajaman tertinggi), frasa yang lewat turun value + blur bertahap; value berpindah di onset frasa berikutnya; posisi mengikuti arah baca (kiri-atas → kanan-bawah).
  - Karena: tanpa beda value mata tidak tahu mulai dari mana; tidak bertabrakan belum berarti terbaca berurutan.
  - Boleh: kiblat yang sengaja datar (grid tipografi seragam) bila kartunya menyatakan begitu.
  - Gerbang: di tiap frame lembar kontak, sebut satu kata paling menonjol; harus kata yang sedang diucapkan, dan huruf lapis 1 tidak terpotong tepi.

### Waktu tampil dan pergantian blok
- **[TKS-10] Kata tampil tepat waktu dan cukup lama untuk dibaca** · kelas P · cek: tabel per kata sebelum render penuh
  - Pemicu: waktu muncul teks dihitung dari timestamp ASR.
  - Anti-pola: mencocokkan per kata sehingga kata bertanda hubung atau angka yang dipecah ASR jatuh ke interpolasi dan terlambat, atau kata terakhir frasa hanya tampil 1–3 frame sebelum frasa atau kata kunci berikutnya masuk.
  - Invarian: cocokkan teks ke transkrip per karakter; tiap kata telat ≤ 0,25 dtk dari onset ucapannya dan tampil ≥ 0,2 dtk, dan kata yang tidak sempat dipindah ke awal frasa berikutnya atau ditahan 0,2 dtk dengan kata kunci digeser sedikit.
  - Karena: kata yang terlambat terasa tidak sinkron, dan kata yang tampil sekejap tidak pernah terbaca.
  - Boleh: teks dunia yang ditinggalkan kamera memakai jendela baca TKS-02.
  - Gerbang: tabel per kata (onset ucapan, frame muncul, lama tampil); telat > 0,25 dtk atau tampil < 0,2 dtk = GAGAL.
- **[TKS-11] Satu blok narasi tampil per waktu di jalur yang sama** · kelas P · cek: frame master hasil rakit sebelum render final
  - Pemicu: blok narasi berganti, atau blok masih tampil saat adegan dipotong.
  - Anti-pola: blok lama pudar keluar 5–7 f bertumpuk dengan blok baru sehingga terbaca kata hantu berebut atensi, atau teks terbawa melewati potongan adegan.
  - Invarian: potong blok lama tepat di frame blok baru masuk, apa pun selisih posisinya, dan akhiri paling lambat di frame sebelum potongan adegan.
  - Karena: dua blok narasi sekaligus memaksa mata memilih, dan teks yang melewati potongan terbaca terlambat.
  - Boleh: lapis yang sengaja bertumpuk dengan beda value (TKS-01); frasa yang menyeberang ke shot penuturnya sendiri (TKS-13).
  - Gerbang: frame master, bukan still 2 dtk: 0 frame dengan dua blok narasi beralfa > 0, dan teks beralfa > 0 di frame sesudah potongan adegan = GAGAL.

- **[TKS-02] Jendela baca teks yang ditinggalkan kamera diukur dari suara** · kelas P · cek: tabel per kata sebelum render penuh
  - Pemicu: teks terkunci di ruang (bidang dunia/3D) dan gerak kamera membuatnya keluar frame atau tertutup subjek.
  - Anti-pola: waktu keluar ditentukan oleh gerak kamera atau urutan kata, bukan oleh kapan kata itu selesai diucapkan.
  - Invarian: tiap kata tampil utuh ≥ 0,3 dtk sesudah offset ucapannya sebelum keluar/tertutup; kata yang paling keras atau bernada tinggi (diukur dari rekaman) mendapat tahan terpanjang; oklusi oleh subjek hanya untuk kata yang memang diminta berada di belakangnya.
  - Karena: kata yang hilang sebelum terbaca terasa seperti bug walau gerak kameranya benar.
  - Boleh: teks dekorasi yang tidak diucapkan.
  - Gerbang: per kata, (frame utuh terakhir − offset ucapan) / fps ≥ 0,3.
- **[TKS-03] Keterbacaan warna diukur di frame render, bukan di palet** · kelas P · cek: frame kunci tiap teks di atas footage/3D
  - Pemicu: memilih atau mengganti warna teks yang duduk di atas footage, 3D, atau latar bertekstur.
  - Anti-pola: menilai kontras dari kode warna atau satu still, lalu teks hilang di bagian latar yang senada.
  - Invarian: ukur kontras huruf terhadap cincin piksel latar di sekitarnya (±0,15 tinggi huruf) di ≥ 3 frame sepanjang tampilnya; nilai yang dipakai persentil-10, bukan median; pilih warna dari token tema yang lolos Lantai 7.
  - Karena: latar bergerak; median bisa lolos sementara sebagian huruf tenggelam di bidang yang senada.
  - Boleh: teks yang sengaja menyatu (blend) bila kartunya meminta, dengan kata kunci tetap lolos.
  - Gerbang: p10 kontras ≥ 4,5 : 1 di setiap frame uji.

### Teks di atas b-roll dan potongan shot
- **[TKS-12] B-roll di bawah suara seseorang tidak menampilkan orang lain yang tampak bicara** · kelas P · cek: still tiap b-roll di bawah suara
  - Pemicu: suara pembicara berlanjut di atas b-roll yang berisi orang.
  - Anti-pola: memakai shot orang lain yang memegang mik, sedang bicara, atau close-up tersenyum dengan mulut terbuka.
  - Invarian: pilih reaksi, tangan, benda yang dibicarakan, suasana, atau wajah yang mulutnya diam.
  - Karena: penonton mengira orang di gambar itulah yang mengucapkan teksnya.
  - Boleh: b-roll penutur itu sendiri.
  - Gerbang: tunjukkan still tiap b-roll; wajah bukan penutur dengan mulut terbuka atau memegang mik = GAGAL.
- **[TKS-13] Frasa tidak menyeberang potongan ke wajah yang bukan penuturnya** · kelas P · cek: tabel frasa vs potongan shot
  - Pemicu: satu frasa teks melintasi pergantian shot.
  - Anti-pola: menahan frasa melewati potongan ke wajah orang lain (sisa 0,1–0,2 dtk pun cukup) sehingga teks terbaca diucapkan orang di shot berikutnya, atau memaksa posisi aman di dua komposisi sampai teks terlempar ke pojok.
  - Invarian: bila shot berikutnya wajah bukan penutur, akhiri frasa ≤ frame potongan (kata terakhirnya sudah selesai diucapkan) atau geser awal b-roll ke batas frasa.
  - Karena: teks milik pembicara A yang menempel di wajah B memindahkan ucapan ke orang yang salah.
  - Boleh: menyeberang bila shot asal atau tujuan adalah wajah penutur sendiri atau b-roll tanpa pembicara, karena menunda frasa di situ meninggalkan layar kosong saat orang bicara.
  - Gerbang: tabel tiap potongan (frasa aktif, shot tujuan, penutur); frame teks > 0 di shot wajah bukan penutur = GAGAL.

### Teks di dalam tampilan aplikasi dan adegan 3D
- **[TKS-14] Kata narasi tidak ditaruh di dalam isi UI** · kelas P · cek: still tiap adegan aplikasi
  - Pemicu: kata narasi jatuh saat layar menampilkan aplikasi (kolom prompt, terminal, pencarian, editor).
  - Anti-pola: memunculkan kata narasi di dalam kolom aplikasi.
  - Invarian: tampilkan kata narasi sebagai teks layar di luar isi UI; isi UI hanya berisi yang memang diketik atau ditampilkan aplikasi itu.
  - Karena: kata di dalam kolom terbaca sebagai isi aplikasi atau perintah yang diketik, bukan ucapan.
  - Boleh: naskah yang memang memperagakan kata itu diketik ke aplikasi.
  - Gerbang: tunjukkan still tiap adegan aplikasi; kata narasi di dalam bbox kolom UI = GAGAL (contoh gagal 13).
- **[TKS-15] Teks di adegan 3D punya bidang** · kelas P · cek: still tiap adegan 3D
  - Pemicu: teks muncul di adegan 3D.
  - Anti-pola: teks melayang di udara di antara objek, atau kata yang sudah tampil di layar monitor adegan digandakan sebagai caption.
  - Invarian: tempel teks di bidang nyata adegan (dinding, meja, layar) dengan perspektif dan cahaya yang sama, atau datar di layar sebagai lapis terdepan, dan satu kata hanya di satu tempat.
  - Karena: teks tanpa bidang tidak punya kedalaman yang terbaca, dan kata ganda membuat mata bolak-balik.
  - Boleh: teks yang sengaja melayang karena kartu kiblatnya menyatakan begitu.
  - Gerbang: tunjukkan still tiap adegan 3D dan sebut bidang tiap teks; teks tanpa bidang = GAGAL (contoh gagal 15; kartu 87 T1).
- **[TKS-17] Ukuran dan posisi teks dipilih dari jenis latar** · kelas P · cek: tabel shot × latar sebelum build
  - Pemicu: teks ucapan di atas tekstur, pola, atau B-roll abstrak tanpa subjek yang dirujuk (sirkuit, kerumunan buram, permukaan).
  - Anti-pola: teks kecil (< 60 px @1080) atau didorong ke pita atas di atas tekstur ramai, sehingga huruf bertabrakan dengan pola dan terbaca seperti keterangan.
  - Invarian: di atas tekstur, teks display besar 88–130 px tebal di tengah (±45 % tinggi), latar diredam dan diburamkan (blur ±6 px, kecerahan ±0,45) atau 1–2 kata kunci diberi kilat invert/flash; teks kecil hanya label sekunder tepat di atas kata kunci raksasa atau callout yang menempel bahu narasumber, tidak berdiri sendiri di kanvas luas.
  - Karena: tekstur tidak punya ruang kosong yang bisa dipinjam; tanpa ukuran dan peredaman, pola mengalahkan huruf.
  - Boleh: tekstur yang memang jadi bukti (dokumen, layar) dibiarkan tajam dan teks pindah ke kanvas sebelum/sesudahnya.
  - Gerbang: still tiap shot bertekstur menunjukkan ukuran huruf, posisi tengah, dan perlakuan latar; teks < 60 px sendirian = GAGAL.
- **[TKS-16] Kata pengantar kecil menempel kata hero-nya** · kelas P · cek: still tiap frasa yang dipecah
  - Pemicu: frasa dipecah menjadi kata pengantar kecil dan kata hero besar.
  - Anti-pola: kata pengantar ditaruh jauh (beda sudut frame) sehingga terbaca sebagai pesan kedua.
  - Invarian: tempel kata kecil di tepi atau sudut kata hero dengan celah *usulan* ≤ 0,5 tinggi huruf hero; bila jarak itu tidak bisa dijaga, satukan dalam satu baris.
  - Karena: frasa yang terpisah jarak dibaca sebagai dua hal.
  - Boleh: label yang memang pesan terpisah.
  - Gerbang: ukur celah bbox kata kecil ke kata hero di still; melebihi batas = GAGAL (contoh gagal 17; kartu 83 T3b, kartu 87 T4).

## Cek cepat
- Lihat frame rapat (tiap 1–2 f) di setiap pergantian kata: ada kartu kosong, dua kata tajam bertumpuk, atau kata yang melompat? Perbaiki sebelum final.
- Ada dua blok teks berbobot sama di satu frame? Pilih satu.
- Teks menutup wajah/objek yang dibicarakan? Pindah.
- `scripts/gate/caption_lines.py render.mp4` lulus.

## Bebas diputuskan
Font, warna aksen kata, posisi, animasi masuk (pop, mask, blur, ketik), kapan pakai penekanan besar. Variasi masuk dianjurkan; teknik sama maks 2× berturut.

## Detail lanjut
`../../references/teks.md` · `decision-guide.md` §1–§3 · `smooth-motion.md`
