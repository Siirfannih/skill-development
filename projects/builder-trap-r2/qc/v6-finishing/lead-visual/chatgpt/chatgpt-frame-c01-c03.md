# Review visual independen c01–c03

30/30 sheet sudah dibuka dan seluruh 900/900 sel f0–899 (0–30 dtk) diperiksa. Semua 20 tanda otomatis diputuskan dari gambar. Ada satu observasi cadence P3 pada punch pembuka; tidak ditemukan blank export, crop kata foreground baru, atau kebocoran creator fotografis baru pada area dummy dalam rentang ini.

Cakupan ini selesai sebagai review gambar c01–c03. Ini bukan sertifikasi 2493 frame, fase 5 PASS, SHIP, audio, atau provenance ekspor keseluruhan. Identitas source 429142 / 83,1 dtk berasal dari lead; bukti byte gambar diperiksa langsung.

## Cara dan batas pemeriksaan

- Semua s000.0.jpg–s029.0.jpg dibuka sebagai sheet asli; seluruh 5×6 sel tiap sheet ditelaah, tanpa sampling.
- INFO ketiga chunk dibaca, termasuk marker kata dan cue. Strip hanya grafik; tidak ada klaim mendengar audio.
- 17 raw JPEG canonical dibuka utuh pada 960×540: f149–154, f450, f464, f473, f476, f486, f561, f861–865.
- SHA-256 30 sheet sebelum/sesudah identik. JSON menyimpan tiap nama, frame, SHA, status dibuka, catatan 30 sel, serta SHA raw/INFO/source yang dibaca.
- Tidak membaca tail; tidak mengulang still70. Tidak mengedit source/JURI/VERDICT atau menjalankan render.

## Temuan

**C01-CADENCE-01 · P3 · f149–153 / 4,967–5,133 dtk:** dua pose punch yang masih blur bertahan dua frame lalu tiga frame tepat sebelum cut wajah f154. Raw f149=f150 dan f151=f152=f153 byte-identik. Ini berbeda dari hold baca yang tajam: gambar masih memiliki directional blur ketika berhenti.

Peta aktual: f147–155 → old160,161,162,162,163,163,163,164,164. Main.tsx:45 membungkus adegan dalam Freeze(W); Archive/archCam di Act1.tsx:48/53 membaca scene frame lama, sedangkan timewarp.ts:28 membulatkan W. Jadi pengulangan pose terbukti berasal dari clock; tingkat gangguan perseptual belum dipastikan lewat playback native pada review ini.

Kepastian observasi 1,00; dugaan tidak disengaja 0,80; kepastian tingkat gangguan 0,60. Bukan blocker otomatis atau alasan memperluas desain. Jika lead melihat punch tertahan pada playback f142–154, polish lokal dapat memakai actual clock untuk archCam/blur dengan cut tetap. File minimal: remotion/src/scenes/Act1.tsx; jangan mengganti peta global atau triad baseline.

Bukti SHA f149–150: 21fbee54f7973dea73b5439f0b4307b628b09997e2176fdb6b408c92b29a4ba9.

Bukti SHA f151–153: 198480468a349c366d09f33fca101f0f7de3ac4197952047ae09907b0be94542.

## Adjudikasi tanda otomatis

| Frame / detik | Tanda | Keputusan berdasarkan gambar |
|---|---|---|
| f9 / 0.300 | LOMPAT | Cut arsip Jensen ke penonton. Framing putih dan kartu semua terus konsisten. |
| f25 / 0.833 | LOMPAT | Cut arsip ke presenter di latar hijau; onset label membangun masuk di langkah berikut, bukan export rusak. |
| f57 / 1.900 | LOMPAT | Cut footage wawancara ke presenter panggung; kata membangun tetap utuh. |
| f73 / 2.433 | LOMPAT | Cut arsip ke peta/UI dan label membuat, tanpa frame kosong. |
| f114 / 3.800 | LOMPAT | Cut presenter ke Jensen; kartu/label tetap di komposisi. |
| f149 / 4.967 | LOMPAT | Awal punch/blur menuju cut wajah. Perubahan ukuran memang terlihat; cadence hold terkait dicatat terpisah pada BEKU f151. |
| f151 / 5.033 | LOMPAT | Langkah kedua punch/blur memang memperbesar kartu. Bukan teleport terpisah, tetapi pose ini berulang tiga frame; lihat C01-CADENCE-01. |
| f151 / 5.033 | BEKU | Raw f151–153 byte-identik pada pose punch yang masih motion-blur, setelah f149–150 juga identik. Cut langsung f154. W memetakan 151–153 ke old163; ini hold gerak pendek, bukan hold baca. Perceptual severity P3, bukan blocker otomatis. |
| f262 / 8.733 | LOMPAT | Pixel mosaic mulai menutupi title yang sebelumnya utuh/held; bagian dari wipe antarbabak. |
| f263 / 8.767 | LOMPAT | Pixel mosaic menutup layar; desain transisi, bukan blank/flash export. |
| f267 / 8.900 | LOMPAT | Pixel mosaic mulai membuka foto narator. |
| f268 / 8.933 | LOMPAT | Akhir reveal mosaik ke kartu narator + Memasuki. |
| f404 / 13.467 | SFX? | Cut yang bersih dari kartu narator ke close-up; gambar tidak memperlihatkan cacat. Tidak menyimpulkan ketiadaan/kehadiran SFX dari strip. |
| f487 / 16.233 | SFX? | Cut sengaja setelah orang lain punya ke wajah/caption dan. Tidak ada word crop; audio tidak dinilai. |
| f561 / 18.700 | BEKU | Kamera Threads sudah settle dan quote utuh untuk dibaca. Raw f561 tajam, tidak ada gerak aktif yang tersendat; hold berlanjut di frame berikut. |
| f777 / 25.900 | SFX? | Cut search YouTube ke wajah setelah caption banyak orang coba; tidak ada frame kosong atau crop kata. Audio tidak dinilai. |
| f834 / 27.800 | SFX? | Cut wajah/FOMO ke desktop establishing shot yang jelas; bukan blank. Audio tidak dinilai. |
| f862 / 28.733 | LOMPAT | ChatGPT window mulai terbuka dari dock. Raw f861–865 menunjukkan latar desktop tetap wide; perubahan ada pada skala/posisi window. |
| f863 / 28.767 | LOMPAT | Window melanjutkan entrance menuju posisi tengah, tidak kembali kecil. |
| f864 / 28.800 | LOMPAT | Window mendekati ukuran menetap; seluruh shell utuh. Gerak adalah entrance app, bukan pull kamera. |

15 perubahan/hold visual sesuai konteks; 1 observasi cadence terverifikasi; 4 tanda SFX? menunjukkan cut visual yang bersih dengan penilaian audio tetap di luar cakupan.

## Detail yang dibuka ulang

- **B08 f433–486:** seluruh 54 sel dinilai. Raw f450/464/473/476/486 memastikan caption utuh dan gerak jatuh/kamera berlanjut. Label putih f450 menimpa gambar dummy sebagai foreground tetapi tidak menghilangkan kata. Orang lain punya utuh sebelum cut f487. Tidak ditemukan teleport atau kerusakan scale-fit baru.
- **Threads:** quote utama utuh dan tajam setelah push, ditahan sampai f653. BEKU f561 berada pada settle/hold membaca. Potongan post di tepi merupakan konteks UI, bukan potongan quote utama.
- **Dummy YouTube:** wall dan hasil search yang ditampilkan di rentang ini memakai flat vector dan metadata generik; tidak terlihat creator foto/avatar asli baru. Arsip pembuka dan insert wajah Irfan adalah konteks yang sengaja dipertahankan.
- **ChatGPT sampai f899:** desktop f834, entrance window dari dock f862–868, lalu wide. Raw f861–865 menunjukkan skala jendela yang bertambah sementara desktop tetap wide; flag bukan zoom-out/reset kamera. B13 push/typing berada di luar c03 dan tidak disertifikasi ulang di laporan ini.
- **Konteks teks:** title mempublikasikan selesai reveal f215 dan terbaca penuh sebelum mosaik; NCard lead singkat dan pengulangan verb triad dinilai sebagai baseline yang disengaja.

## Bukti pembukaan tiap sheet

| Sheet | Frame | Sel dibuka | SHA-256 |
|---|---|---|---|
| c01_000.0-010.0s/s000.0.jpg | 0–29 | 30/30 | 9e1941e06576518256d5fc07cdd8cf1cb6b91a87cd8a3a133ac2bed8dc2fc3bf |
| c01_000.0-010.0s/s001.0.jpg | 30–59 | 30/30 | 421ae652a358d3fe347b1a259353daa9220b3f3f017f3300cf73f63e79d8a0b8 |
| c01_000.0-010.0s/s002.0.jpg | 60–89 | 30/30 | 1a5b5f4efc914dd2038e04cfe6d4628dbfbf3395e4597c4941a263f37e3ded66 |
| c01_000.0-010.0s/s003.0.jpg | 90–119 | 30/30 | 42492d100c1bce45e757ce63a4849ebb6dd187d57b241dc65a249839dea45aab |
| c01_000.0-010.0s/s004.0.jpg | 120–149 | 30/30 | ff7ef4940064bdd3d14cf76629c586228a931f89035c569d5d835ac5dbd48b8e |
| c01_000.0-010.0s/s005.0.jpg | 150–179 | 30/30 | d05da8ba40efc70afb0e7369fe0379daa6d830179b30517ced0aef6541a341c8 |
| c01_000.0-010.0s/s006.0.jpg | 180–209 | 30/30 | a52a2c72342fb28fbd0b99283d1502c365a2b77711154d021494a3a40b5e9c3b |
| c01_000.0-010.0s/s007.0.jpg | 210–239 | 30/30 | 343826a0f326ace8d9a761e6205a705c348a220fb9ba4524dd40051f07af41cc |
| c01_000.0-010.0s/s008.0.jpg | 240–269 | 30/30 | 3bd71f85276aef985b974ccbb993ae9c262c80680ace87af34bbea321baa53b3 |
| c01_000.0-010.0s/s009.0.jpg | 270–299 | 30/30 | a7c1cc34c0cdf9a444be31750f21fed7985d44facc36c3bba3f8590d1d3152c1 |
| c02_010.0-020.0s/s010.0.jpg | 300–329 | 30/30 | 5d4dc078f12e90fc7e5874a22c76009cd6612166e7e5fd8f025fb6deb7473a2b |
| c02_010.0-020.0s/s011.0.jpg | 330–359 | 30/30 | c33161222047e68f93c73f6023986299a60da00aa1b6d456c94d559d93367459 |
| c02_010.0-020.0s/s012.0.jpg | 360–389 | 30/30 | c0805a073f4198a406956c61ffaed9b64ce89b1a52e1a68d98430d639e68c2a2 |
| c02_010.0-020.0s/s013.0.jpg | 390–419 | 30/30 | c13f652e52042faad7ca86a7e7c46518200a1fe44724cdb84eda34bc792b1024 |
| c02_010.0-020.0s/s014.0.jpg | 420–449 | 30/30 | e92a8b5dcb52787f8b2149a5e9a7ba0fd208f339ab2ecc09ced5aef5e4bae941 |
| c02_010.0-020.0s/s015.0.jpg | 450–479 | 30/30 | 267f5458d8cc406d73ff1c83f3ba2ebf81661742865b8259fb114add949f9ea8 |
| c02_010.0-020.0s/s016.0.jpg | 480–509 | 30/30 | 1e57be3a6d66ab423c1c87906af523c1eca00e2074af772c51bedd9fd20a9f8d |
| c02_010.0-020.0s/s017.0.jpg | 510–539 | 30/30 | 1d309bd64b6c1234e849d585d2e0a22b11f766ba5a6a16b07a2e6d3024811a77 |
| c02_010.0-020.0s/s018.0.jpg | 540–569 | 30/30 | 55b83017db19399cc8bd22efb9d51f1ed0d0f266bb341dacb7026ea8e887d61c |
| c02_010.0-020.0s/s019.0.jpg | 570–599 | 30/30 | 0d4652cc8111b597aeec86aec6413180a3e346ec92daf1f1bd15a694f4b72d69 |
| c03_020.0-030.0s/s020.0.jpg | 600–629 | 30/30 | 0480f77df122f5264c5e6711e852f948c28a4303b6dcb244dbafc67a77b1fc06 |
| c03_020.0-030.0s/s021.0.jpg | 630–659 | 30/30 | 7b60c970c540a7891a7dc70149b5a6fb474f79b9526565dc920a67a2db4bd345 |
| c03_020.0-030.0s/s022.0.jpg | 660–689 | 30/30 | 36023b4f311b514c8f6d3b7ae47420fcbde88bc4d7e55d2224f852da313441bb |
| c03_020.0-030.0s/s023.0.jpg | 690–719 | 30/30 | 13980c3b83d3b7027b197a8ef994cd1c07790f644aab3743301b5c0bf5376f04 |
| c03_020.0-030.0s/s024.0.jpg | 720–749 | 30/30 | 83fafae485bea35a99431a5868c2a7c237aa677bfd63e8c04d4976578447892c |
| c03_020.0-030.0s/s025.0.jpg | 750–779 | 30/30 | 9ff6ca68f874978c8122c3bb61515f13052e9003f5060cb9bb32f4614b035f63 |
| c03_020.0-030.0s/s026.0.jpg | 780–809 | 30/30 | a1a911c0460c226f3fa30935d72de5ebf9b5eeaaccc2aaf4162fd123339e4f1b |
| c03_020.0-030.0s/s027.0.jpg | 810–839 | 30/30 | 42525d8d68493994aa51b06bb6a0868950068852cddd3cefa0a240dd1a909475 |
| c03_020.0-030.0s/s028.0.jpg | 840–869 | 30/30 | 232222a73d3acb8bce583cab565cbf443ecb92a7ebdf8f360b8169a442143ce4 |
| c03_020.0-030.0s/s029.0.jpg | 870–899 | 30/30 | 5977afd1878da4122f907a351a6e3ecc6d1752f6f3970a24283fb8e4f3d2862e |

JSON pendamping menyimpan seluruh rincian pembukaan, semua 20 auto flag, 17 raw frame, source clock, dan batas kesimpulan.
