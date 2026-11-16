# Review visual independen c07–c09

Seluruh 24/24 contact sheet dan 693/693 frame aktual f1800–2492 (60–83,1 dtk) dibuka. Semua 23 auto flag dinilai dari gambar, termasuk seluruh 19 raw frame yang ditandai dan tetangganya: 52 raw JPEG dibuka utuh. Hash 24 sheet dan 3 INFO tetap sama sebelum/sesudah review. Dua laporan terdahulu tidak diubah.

Tidak ditemukan blank export/black flash baru. Scan piksel independen pada 693 JPEG hanya menemukan f2492 hitam penuh; fade akhir turun bertahap ke frame itu. Konteks Apa di B25 tetap utuh. Ada satu observasi cadence P3 yang mencakup dua plateau kamera tiga frame saat blur masih aktif; ini bukan full-frame freeze dan bukan keputusan gate.

Identitas source 429142 / 2493 frame berasal dari lead. Review baru dimulai setelah root mengonfirmasi corrected tail terpasang stabil (tail-install SHA prefix 3392e5f0). Bukti di sini adalah hash/isi gambar; review ini tidak menerbitkan VERDICT, gate PASS, audio approval, SHIP, atau sertifikasi provenance ekspor keseluruhan.

## Temuan kecil: C08-CADENCE-01

| Rentang aktual | Scene clock | Yang terlihat |
|---|---|---|
| f2122–2124 / 70,733–70,833 dtk | W = old2422 | Pose kamera dan blur wall diulang saat bergerak menuju titik awal. Kata masih berubah tipis; hanya f2123 dan f2124 byte-identik penuh. |
| f2338–2340 / 77,933–78,033 dtk | W = old2687 | Scroll ke post ketiga berhenti singkat pada pose yang masih memiliki vertical blur, lalu bergerak lagi f2341. Isi/teks membuat raw tidak identik penuh. |

P3. Kepastian plateau 1,00; dugaan tidak disengaja 0,75; kepastian tingkat gangguan perseptual 0,60. CamPath b24Cam/b25Cam masih membaca old frame dalam Main Freeze(W), sehingga pembulatan W mengulang pose. Plateau f2270–2272 (old2578) juga terlihat pada lampiran/camera, tetapi wajah pada lampiran terus bergerak dan Apa jelas; tidak diklasifikasikan sebagai full freeze atau kehilangan konteks.

Lead dapat menilai f2119–2130 dan f2334–2344 pada playback native sebelum memutuskan polish. Bila terasa tertahan, file minimal untuk perbaikan lokal adalah remotion/src/scenes/Act4.tsx, dengan anchor/cut tetap. Tidak ada usulan mengubah peta global, layout, wording, atau gaya scroll yang sudah disetujui.

## Konteks dan akhir video

- Apa sudah gelap dan terbaca pada scrim composer f2267. Frasa pertama lengkap f2289, kedua lengkap f2320, lalu Apa pengalaman tampil setelah scroll f2342–2353. Yang aku dapatkan lengkap f2369 dan held sampai f2387. Blur scroll tidak menghapus konteks frasa.
- Raw f2353/2354/2355 memastikan satu frame caption kosong pada pergantian Apa pengalaman→yang, sementara UI tetap tampil. Ini dicatat sebagai transisi caption singkat; tidak menjadi blank export atau temuan desain baru.
- Join footage f2044 dan f2390 juga tercantum di FACE_JUMPS. Raw tetap berisi wajah, caption/bounds aman; tidak ditemukan black flash pada kedua join.
- Raw penutup f2477/2478/2480/2483/2486/2489/2490/2491/2492 dibuka. EndFade memang memakai actual clock sampai duration-1. Mean RGB rata-rata turun dari f2479 hingga f2492; f2491 masih memiliki max RGB 2/2/3, sedangkan f2492 benar-benar 0/0/0.
- Tidak terlihat kebocoran creator YouTube eksternal baru. Tail menampilkan UI repo/aplikasi sendiri serta wajah/avatar Irfan yang disengaja.

Tidak ada audio yang diputar. Delapan tanda SFX? dinilai hanya dari sisi gambar; grafik envelope dan marker cue tidak membuktikan bunyi terdengar atau tidak.

## Semua auto flag

| Frame / detik | Tanda | Adjudikasi gambar |
|---|---|---|
| f1938 / 64.600 | LOMPAT | Raw f1937/1938 mempertahankan susunan profil/draft. Aku ditambahkan pada caption dan blur/sharpness berubah selama pull; tidak ada teleport atau blank. |
| f1938 / 64.600 | SFX? | Perubahan pull/blur dan caption; raw bukan cut baru. Tidak menyimpulkan kebutuhan atau terdengarnya cue dari strip. |
| f1955 / 65.167 | LOMPAT | Raw f1954/1955 menunjukkan layout yang sama; langkah pull dan perbedaan blur menjelaskan delta. Melangkah tetap utuh. |
| f1955 / 65.167 | SFX? | Bukan cut/flash pada gambar; pull profil berlanjut. Audio tidak didengar atau diputuskan. |
| f1992 / 66.400 | LOMPAT | Masih profil/draft + kemana-mana utuh sebelum wipe. Wipe wajah baru berkembang f1994–1996; tidak ada blank. |
| f2044 / 68.133 | LOMPAT | Join footage wajah, juga tercantum di FACE_JUMPS. Raw f2043/2044 menunjukkan cut pose rekaman dengan sadar tetap utuh; bukan cacat export. |
| f2044 / 68.133 | SFX? | Join footage narator, caption tetap stabil. Tidak menilai kehadiran/kebutuhan SFX. |
| f2122 / 70.733 | BEKU | Raw f2122–2124 menahan pose kamera/blur yang sama; W=old2422 untuk ketiganya. Seluruh frame tidak identik: kata berubah pada f2122→2123, hanya f2123=f2124 byte-identik. C08-CADENCE-01, severity perseptual belum dipastikan. |
| f2142 / 71.400 | SFX? | Cut sengaja dari repo titik awal ke wajah setelah label utuh; raw berisi footage normal. Audio di luar cakupan. |
| f2192 / 73.067 | SFX? | Cut wajah kembali ke repo yang terlingkar; titik awal tetap utuh. Tidak ada flash kosong. Audio di luar cakupan. |
| f2234 / 74.467 | SFX? | Cut dari wall/gak sekedar membangun ke close-up untuk Tapi juga nge-share; raw wajah normal, bukan blank. Audio di luar cakupan. |
| f2270 / 75.667 | BEKU | W old2578 mengulang pose kamera/lampiran f2270–2272, tetapi video wajah di lampiran tetap bergerak. Apa gelap dan jelas pada scrim. Plateau ringan dicatat; tidak menjadi full-frame freeze atau kehilangan konteks. |
| f2275 / 75.833 | LOMPAT | Lampiran mencapai susunan composer dan cursor pada Post; apa yang utuh. Raw menunjukkan gerak UI yang dimaksud, tanpa crop kata. |
| f2284 / 76.133 | LOMPAT | Post mulai hadir di belakang composer saat klik; scrim mulai terbuka. Caption tetap di kanan dan tidak hilang. |
| f2285 / 76.167 | LOMPAT | Composer menghilang/mengungkap post pertama dalam animasi publikasi; double image berasal dari overlap opacity selama transisi, bukan flash export. |
| f2286 / 76.200 | LOMPAT | Post pertama sudah terbuka, kamera melanjutkan push. Apa yang aku utuh, selanjutnya alami lengkap f2289. |
| f2335 / 77.833 | LOMPAT | Scroll kedua mulai dan post ketiga terbit dari bawah. Frasa sebelumnya sudah utuh sebelum keluar, apa untuk post ketiga terlihat. |
| f2336 / 77.867 | LOMPAT | Bagian cepat scroll vertikal dengan motion blur; UI bergerak searah tanpa reset. Caption keluar setelah sebelumnya terbaca. |
| f2337 / 77.900 | LOMPAT | Scroll vertikal berlanjut menuju post ketiga. Blur merupakan bagian gerak; hold blur setelahnya dicatat pada BEKU f2338. |
| f2338 / 77.933 | BEKU | Raw f2338–2340 menahan pose kamera/vertical blur yang sama di tengah scroll; W=old2687. Raw hanya berbeda tipis karena isi/teks, bukan identik penuh. Gerak lanjut f2341; C08-CADENCE-01. |
| f2388 / 79.600 | SFX? | Cut post ketiga ke wajah untuk Share; raw f2388/2389 berisi wajah normal. Tidak ada black flash. Audio di luar cakupan. |
| f2390 / 79.667 | LOMPAT | Join footage/crop narator tercantum dalam FACE_JUMPS; raw f2389→2390 menunjukkan edit pose/punch wajah, bukan blank atau reset UI. |
| f2390 / 79.667 | SFX? | Join footage narator setelah cut UI→wajah. Gambar normal; audio tidak dinilai. |

## Cakupan tiap sheet dan bukti byte

| Sheet | Frame aktual | Sel diperiksa | SHA-256 |
|---|---|---|---|
| c07_060.0-070.0s/s060.0.jpg | 1800–1829 | 30/30 | 6e861d71edbf17b76b5ce48f11d1f6535ce03682a47fc068b856a6829c7df84a |
| c07_060.0-070.0s/s061.0.jpg | 1830–1859 | 30/30 | 557495595df07ea4c61b6b5eb9eb07bdb94ebab7de6995dc40cdfbb68c806da9 |
| c07_060.0-070.0s/s062.0.jpg | 1860–1889 | 30/30 | 58e98825ecbc1920ff9403a390413d8edd70de87549bd76116fe52d033782788 |
| c07_060.0-070.0s/s063.0.jpg | 1890–1919 | 30/30 | 003bd57811fcdda407997ff6dabc65257dd4ddc4cae1e82ed167aad1dd1330a8 |
| c07_060.0-070.0s/s064.0.jpg | 1920–1949 | 30/30 | fe40621fd2a3b4bc9904cc0826f50a96925f4bf590d209b2996b46b6424c01ba |
| c07_060.0-070.0s/s065.0.jpg | 1950–1979 | 30/30 | c9d2911e1312fab0a9af4b367c6e8ff0e1eee3149881e1f0777eced79bde35e8 |
| c07_060.0-070.0s/s066.0.jpg | 1980–2009 | 30/30 | 1ef3e113d0b00a93f701896685a300fd8262916f7b0dfe0d62d1603c2e67bfe8 |
| c07_060.0-070.0s/s067.0.jpg | 2010–2039 | 30/30 | 104f588937b37ce63f18d93407e4ae4b8a694d69568c91e560a1ad9ae9571cac |
| c07_060.0-070.0s/s068.0.jpg | 2040–2069 | 30/30 | 34e5230382ef26aa3a9ec49ed8877c1bc83e1bf2672a489c743a344db25bfda8 |
| c07_060.0-070.0s/s069.0.jpg | 2070–2099 | 30/30 | b38fe0ad73dc38a5da8c5953dbb11b6efb94f2eded19fd91332fe7275082d8a1 |
| c08_070.0-080.0s/s070.0.jpg | 2100–2129 | 30/30 | f739f92799e1c715ff5fb3ef9d2b008853916bbb1df21d9a7f706a85c087c10e |
| c08_070.0-080.0s/s071.0.jpg | 2130–2159 | 30/30 | 56cf09b537662492a0c6d38d36176eda04de656f0781a9d1f7dac2e6fb4a6ed5 |
| c08_070.0-080.0s/s072.0.jpg | 2160–2189 | 30/30 | 32f036631bb5246b072b60599d9eda60d695bd4e4a93fc2f896520adb2475dec |
| c08_070.0-080.0s/s073.0.jpg | 2190–2219 | 30/30 | 394dcc1c76194b65d7a8bbffabf277ad511118db2c0c0c8b348a2f2e2be931ea |
| c08_070.0-080.0s/s074.0.jpg | 2220–2249 | 30/30 | 2424f87e745f142426ca4ea962d15e495959a566299ef47aad5dc9bb4df87ccb |
| c08_070.0-080.0s/s075.0.jpg | 2250–2279 | 30/30 | c6ae87b40bc64f66a76612835b103a77b0d71c4654952aa22ab245d3016a6478 |
| c08_070.0-080.0s/s076.0.jpg | 2280–2309 | 30/30 | faec22c98c0690144050af34f1002fdcc5aa6f7c97bc749adba795152a928199 |
| c08_070.0-080.0s/s077.0.jpg | 2310–2339 | 30/30 | d0a19fae11dec18f529c558ce5d394f9fa4a4c4fd1ff2ae0b589837c18b01a32 |
| c08_070.0-080.0s/s078.0.jpg | 2340–2369 | 30/30 | 4d2824655f4fde65048f2464b152d08bb7f5831c4cb2e2099db06e500a8a4b75 |
| c08_070.0-080.0s/s079.0.jpg | 2370–2399 | 30/30 | c92eead71edf9743e98635145f4f0e6aa8768cbe41ff6cfed4e02062d04f85e5 |
| c09_080.0-083.1s/s080.0.jpg | 2400–2429 | 30/30 | 18b3c5ae36afd70df1f83704c2c105a51dbd24851a5fba36a99b062024697bd5 |
| c09_080.0-083.1s/s081.0.jpg | 2430–2459 | 30/30 | be17648b36c87530232b8249c9be3258befe8cf9c18279009964efe2dc910306 |
| c09_080.0-083.1s/s082.0.jpg | 2460–2489 | 30/30 | 23a212030daa33ba7559237d8aa1f7a284db754637b3574a08df915ba5f37436 |
| c09_080.0-083.1s/s083.0.jpg | 2490–2492 | 3/3 | fe536189acd4ecdbf662a18ea763f67958332c1eabce90cec64e16b117898c2b |

Sheet s083.0 hanya memuat tiga frame film; 27 slot layout kosong tidak dihitung sebagai frame blank. JSON pendamping memuat hash INFO, seluruh 52 raw JPEG yang dibuka, catatan tiap sheet/rentang, semua 23 flag, hasil ukur clock/piksel, dan hash empat file laporan lama yang tetap utuh.

Cakupan ini selesai sebagai review independen c07–c09. Pemeriksaan ini tidak membuka ulang chunk terdahulu atau menilai kandidat patch B19.
