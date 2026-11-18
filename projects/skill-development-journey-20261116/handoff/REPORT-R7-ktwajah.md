# REPORT · TASK-R7-ktwajah

Status: **siap ditinjau**. QA teknis lulus; tiga rentang dan seluruh bukti gambar sudah berasal dari cache terbaru. Cakupan D-445/D-462; kamera D-464; label D-450.

## Hasil dan integrasi

45 blok narasi / 89 kata memakai K1, K2, K4, atau pil. T050 dipertahankan. Delapan lapisan lama memakai desain, posisi, waktu, dan sumber mentah yang sama; hanya lubang matte dirender ulang dengan kamera R7. T051_lbl/T057_lbl/T077_lbl tetap pada posisi relatif slab yang sudah dirapatkan D-450. DECISION, VIRAL, S01–S14, T038, tokoh/bubble, audio, dan adegan UI tidak diedit.

- Sumber komponen: `remotion/src/video/bersama/kt83/` (Cincin, Tangga, KataDada, Pil, tipe, pembungkus render).
- `Root.tsx`: tambahan Composition R7KTWajah, 1920×1080, 30000/1001 fps. `tema.ts`: tambahan token bertanda D-462, tanpa mengganti nilai lama.
- Builder: `lego/r7_ktwajah.py`. Override: `lego/r7_override_ktwajah.json` = 17 ganti / 36 buang / 0 tambah. Sembilan grup menyimpan kata-kata tiap blok dalam satu klip untuk menjaga timing dan mengurangi jumlah overlay; 36 ID lama dihapus agar tidak tampil dua kali.
- Pola cache: `lego/cache/r7_ktwajah_<grup>_raw.mov`; cincin memakai hasil `<grup>.mov` setelah potong_zoom; slab memakai `r7_ktwajah_<ID>.mov`. Semua ProRes 4444 alpha. Render Remotion memakai PNG dan `--concurrency=3`.
- Cache dan bukti gambar ditautkan ke `/mnt/storage-projects/skill-dev-journey/r7/ktwajah/` agar tidak memenuhi disk sistem. Bundle sementara dibangun ulang oleh builder saat diperlukan.
- T068 tetap milik ktwajah sesuai TASK. Entri T068 yang sempat muncul di override UI sudah tidak ada. `r7_gabung.py` berhasil menggabungkan 57 lapisan; file pekerja lain tidak diedit oleh tugas ini.

## Komponen dan gerak

| Komponen | Bentuk | Gerak dan hubungan ruang |
|---|---|---|
| Cincin | K1 | Huruf mengikuti lintasan elips dari kontur kepala setiap frame; putar pelan 1,65°/s. Kata muncul pada onset, maksimal tiga kata satu blok. Alpha dipotong potong_zoom sehingga rambut menutupi bagian belakang cincin. |
| Tangga | K2 | Satu kata per tag, turun diagonal di sisi wajah/bahu; maksimal dua tag terlihat. Pop 3 frame, reaksi react(i) pada jarak masuk. Onset tetap dari ucapan, tanpa penundaan tambahan demi stagger. Jarak 114×zoom memberi ruang bagi tag yang berlawanan kemiringannya. Batas alpha Clawd dibaca per frame; tag memberi ruang terhadap rig tanpa mengedit tokoh. T010 duduk di bawah busur workflow agar tidak menutup huruf W. |
| KataDada | K4 | Satu kata berganti per kata, pop skala 0,9→1 selama 3 frame, tanpa fade. Posisi mengikuti kontur dan kamera, tanpa batas posisi yang menahan teks saat zoom. T020/T021 berada di bawah DECISION (y=902) sesuai D-412. |
| Pil | penekanan T060 | Biru startup; “habis” lalu “banget” pada onset masing-masing. Tepi kiri tetap saat pil bertambah panjang. Mengikuti tubuh dan kamera. |

Tidak ada opacity fade pada komponen baru. Keluar berupa potongan. Huruf Poppins 700; pil 800. Ukuran dasar K1/K4/K2 kiri 60 px, parodi 56 px, pil 76 px; semuanya mengikuti zoom.

## Pesan → maksud → alasan → bentuk (D-466)

| Pesan yang diucapkan | Maksud yang harus dipahami | Alasan | Bentuk |
|---|---|---|---|
| “Oke,” | Mulai cerita pribadi | Ekspresi pembicara membuka cerita | Satu kata K4 di dada |
| “Ya, aku baru aja ngebikin … gimana biar … yang kita pake, entah itu” | Menjelaskan proses yang baru dibuat | Busur workflow/AI model sudah menguasai atas kepala | Tangga kiri mengikuti bahu, tag kaca untuk kata-kata proses |
| “itu bisa ngebuat sebuah” | Membangun menuju keputusan | Perhatian bergerak menuju kata hero yang akan datang | Cincin pendek K1 di kepala |
| “dalam ngebuat video gitu.” | Menjelaskan konteks DECISION | Keterangan mengikuti kata besar dan tidak mendahuluinya secara visual | K4 per kata di bawah DECISION |
| “Karena belakangan ini kan lagi” | Mengantar tren | Wajah masih membawa penjelasan sebelum parodi | K4 di dada |
| “banget soal ngedit video pake AI.” | Menunjuk tren edit AI | Parodi VIRAL menjadi pusat visual | Tangga kanan, putih hangat, tag tipis netral |
| “Tapi, kalau dari pandanganku sendiri, hasilnya masih terasa” | Mengantar penilaian pribadi | Narasi harus terbaca sambil parodi tetap dominan | K2 kanan dengan gerak yang sama |
| “Dan ya beberapa bagian masih” | Mengantar kelemahan hasil | Pusat frame disediakan untuk parodi dan T038 | K2 kanan, tanpa aksen baru |
| “Jadi gak usah ditanya kenapa aku gak langsung publish dan open source.” | Menjelaskan alasan menunda rilis | Kalimat tenang dekat pembicara; membutuhkan kedalaman | Cincin K1, belakang lewat rambut |
| “Karena perlu” | Membangun ke BALIK MODAL | Pengantar mendahului slab; label pada slab tetap rapat | K1 sebelum slab, lalu label D-450 yang sudah ada |
| “Pak. Ini habis banget gitu buat biayanya.” | Menekankan biaya yang terkuras | Satu frasa menjadi penekanan, kata lain mengalah | K4; “habis banget” sebagai pil biru |
| “Aku sampai harus langganan … sama Claude Pro yang …” | Menjelaskan langganan untuk menguji sistem | Kartu angka di sisi frame sudah menjadi bukti utama | K4 di dada, T065/T066/T067/T070 tidak diubah |
| “Hanya untuk uji coba sistem ini, gitu.” | Menjelaskan tujuan pengeluaran | Wajah mengikat kembali penjelasan setelah kartu angka | K4 per kata |
| “Dan bahkan sistem workflow ini memungkinkan sistem kerja” | Membangun menuju LINTAS AGENT | Kalimat naik ke konsep yang lebih luas dan slab berikutnya | K1 mengelilingi kepala; label slab tetap rapat |

Tidak menambah ilustrasi, ikon, atau aset generatif. Bentuk diambil dari ringkasan kartu 83 dan frame yang diberikan; warna hanya dari R7-BERSAMA.

## Peta ID → bentuk

| ID | Teks | Bentuk | Grup cache |
|---|---|---|---|
| T001 | Oke, | K4 | buka |
| T006 | Ya, | K2 | workflow |
| T007 | aku | K2 | workflow |
| T008 | baru aja ngebikin | K2 | workflow |
| T010 | gimana biar | K2 | workflow |
| T012 | yang kita | K2 | workflow |
| T013 | pake, entah itu | K2 | workflow |
| T017 | itu bisa ngebuat | K1 | decision_cincin |
| T018 | sebuah | K1 | decision_cincin |
| T020 | dalam ngebuat video | K4 | decision_dada |
| T021 | gitu. | K4 | decision_dada |
| T022 | Karena belakangan | K4 | decision_dada |
| T023 | ini | K4 | decision_dada |
| T024 | kan lagi | K4 | decision_dada |
| T026 | banget soal | K2 | parodi |
| T027 | ngedit video | K2 | parodi |
| T028 | pake AI. | K2 | parodi |
| T029 | Tapi, | K2 | parodi |
| T030 | kalau dari | K2 | parodi |
| T031 | pandanganku sendiri, | K2 | parodi |
| T032 | hasilnya | K2 | parodi |
| T033 | masih terasa | K2 | parodi |
| T035 | Dan ya | K2 | parodi |
| T036 | beberapa bagian | K2 | parodi |
| T037 | masih | K2 | parodi |
| T052 | Jadi gak usah | K1 | publish |
| T053 | ditanya kenapa aku | K1 | publish |
| T054 | gak langsung publish | K1 | publish |
| T055 | dan open source. | K1 | publish |
| T056 | Karena perlu | K1 | publish |
| T058 | Pak. | K4 | biaya |
| T059 | Ini | K4 | biaya |
| T060 | habis banget | Pil | biaya |
| T061 | gitu | K4 | biaya |
| T062 | buat biayanya. | K4 | biaya |
| T063 | Aku sampai | K4 | langganan |
| T064 | harus langganan | K4 | langganan |
| T068 | sama Claude Pro | K4 | langganan |
| T069 | yang | K4 | langganan |
| T071 | Hanya untuk uji | K4 | langganan |
| T072 | coba sistem ini, | K4 | langganan |
| T073 | gitu. | K4 | langganan |
| T074 | Dan bahkan sistem | K1 | lintas |
| T075 | workflow ini memungkinkan | K1 | lintas |
| T076 | sistem kerja | K1 | lintas |

T050 “cuma mempelajari” tidak diganti atau dipindah. Slab yang dipotong ulang: T002, T009, T011, GRADE, T034, T051, T057, T077. Ketiga label _lbl tetap memakai lapisan asli; tidak dibuat ulang.

## Timing per kata

`teks.json.kata` tidak lagi cocok dengan indeks di `edit/words.json` mulai bagian tengah. Builder mencocokkan teks persis dan memilih kemunculan terdekat dengan waktu blok (batas 0,3 detik); tidak mengubah kedua berkas sumber. Teks 45 blok ditemukan persis. Kata tidak ditunda 2 frame seperti lapisan lama.

Onset dibulatkan ke frame pertama sesudah onset suara: selisih 0–33,034 ms pada 30000/1001 fps. Tidak ada kata hilang dari sumber, indeks ganda, atau kata keluar sebelum selesai diucapkan. Kata sebelumnya boleh ditahan saat cincin, dua tag, atau pil terbentuk; kolom akhir tampil di bawah sudah memasukkan tahan tersebut. Semua waktu global video, bukan waktu lokal klip. Data lengkap: `qc/r7/ktwajah/timing.json`.

| ID | Kata | Ucapan mulai–selesai (s) | Tampil mulai–akhir (s) | Selisih onset (ms) |
|---|---|---|---|---|
| T001 | Oke, | 0.2561–0.7011 | 0.2669–0.7341 | 10.83 |
| T006 | Ya, | 4.2535–4.5635 | 4.2709–4.5712 | 17.43 |
| T007 | aku | 4.5735–4.7335 | 4.6046–4.7381 | 31.10 |
| T008 | baru | 4.7985–4.8635 | 4.8048–5.1385 | 6.30 |
| T008 | aja | 4.8985–5.0535 | 4.9049–5.7724 | 6.40 |
| T008 | ngebikin | 5.1085–5.7535 | 5.1385–5.7724 | 29.97 |
| T010 | gimana | 6.3910–6.7060 | 6.4064–6.9736 | 15.40 |
| T010 | biar | 6.7610–6.9510 | 6.7734–6.9736 | 12.43 |
| T012 | yang | 7.5910–7.6410 | 7.6076–7.8412 | 16.60 |
| T012 | kita | 7.6510–7.8310 | 7.6743–7.8412 | 23.33 |
| T013 | pake, | 7.8660–8.0910 | 7.8745–8.4084 | 8.53 |
| T013 | entah | 8.1010–8.3460 | 8.1081–8.4751 | 7.10 |
| T013 | itu | 8.3860–8.4710 | 8.4084–8.4751 | 22.40 |
| T017 | itu | 10.4324–10.4924 | 10.4438–11.6450 | 11.37 |
| T017 | bisa | 10.5624–11.0924 | 10.5772–11.6450 | 14.83 |
| T017 | ngebuat | 11.2145–11.6295 | 11.2446–11.6450 | 30.07 |
| T018 | sebuah | 11.6545–11.8645 | 11.6783–11.8785 | 23.83 |
| T020 | dalam | 12.4545–12.8295 | 12.4791–12.8462 | 24.63 |
| T020 | ngebuat | 12.8295–13.0945 | 12.8462–13.1465 | 16.67 |
| T020 | video | 13.1295–13.4745 | 13.1465–13.4801 | 16.97 |
| T021 | gitu. | 13.5095–13.7045 | 13.5135–13.7137 | 4.00 |
| T022 | Karena | 13.7645–14.0145 | 13.7804–14.1475 | 15.93 |
| T022 | belakangan | 14.1352–14.4352 | 14.1475–14.4478 | 12.27 |
| T023 | ini | 14.4352–14.6252 | 14.4478–14.6480 | 12.57 |
| T024 | kan | 14.6552–14.7302 | 14.6813–14.7814 | 26.13 |
| T024 | lagi | 14.7702–14.9602 | 14.7814–14.9816 | 11.23 |
| T026 | banget | 15.2152–15.4952 | 15.2152–16.0494 | 0.00 |
| T026 | soal | 15.6052–16.0452 | 15.6156–16.0494 | 10.40 |
| T027 | ngedit | 16.0852–16.3302 | 16.1161–16.6166 | 30.90 |
| T027 | video | 16.3502–16.6102 | 16.3830–16.6166 | 32.83 |
| T028 | pake | 16.6152–16.8102 | 16.6166–17.2506 | 1.40 |
| T028 | AI. | 16.8302–17.2352 | 16.8502–17.2506 | 19.97 |
| T029 | Tapi, | 17.3402–17.7602 | 17.3507–17.7844 | 10.47 |
| T030 | kalau | 17.8725–18.0325 | 17.8845–18.2849 | 12.03 |
| T030 | dari | 18.0325–18.2575 | 18.0514–18.2849 | 18.87 |
| T031 | pandanganku | 18.2975–18.6775 | 18.3183–19.1525 | 20.80 |
| T031 | sendiri, | 18.7075–19.1375 | 18.7187–19.1525 | 11.20 |
| T032 | hasilnya | 19.2525–19.5862 | 19.2526–19.5862 | 0.07 |
| T033 | masih | 19.5912–19.7882 | 19.6196–20.1535 | 28.40 |
| T033 | terasa | 19.8282–20.1382 | 19.8532–20.1535 | 24.97 |
| T035 | Dan | 20.8982–21.2232 | 20.9209–21.4881 | 22.70 |
| T035 | ya | 21.3404–21.4604 | 21.3547–21.4881 | 14.27 |
| T036 | beberapa | 21.5254–21.8854 | 21.5549–22.2889 | 29.47 |
| T036 | bagian | 21.9054–22.2854 | 21.9219–22.2889 | 16.50 |
| T037 | masih | 22.3128–22.6679 | 22.3223–22.6893 | 9.50 |
| T052 | Jadi | 38.2142–38.2492 | 38.2382–38.7387 | 24.00 |
| T052 | gak | 38.2991–38.5341 | 38.3049–38.7387 | 5.83 |
| T052 | usah | 38.5341–38.7341 | 38.5385–38.7387 | 4.40 |
| T053 | ditanya | 38.7492–39.1442 | 38.7721–39.6396 | 22.87 |
| T053 | kenapa | 39.2622–39.4322 | 39.2726–39.6396 | 10.37 |
| T053 | aku | 39.4922–39.6072 | 39.5061–39.6396 | 13.93 |
| T054 | gak | 39.6722–39.8522 | 39.6730–40.5739 | 0.77 |
| T054 | langsung | 39.8522–40.1922 | 39.8732–40.5739 | 20.97 |
| T054 | publish | 40.2272–40.5722 | 40.2402–40.5739 | 13.00 |
| T055 | dan | 40.6322–40.7122 | 40.6406–41.5415 | 8.40 |
| T055 | open | 40.7322–41.1372 | 40.7407–41.5415 | 8.50 |
| T055 | source. | 41.1572–41.5122 | 41.1745–41.5415 | 17.27 |
| T056 | Karena | 41.6922–41.9872 | 41.7083–42.2422 | 16.13 |
| T056 | perlu | 42.0957–42.2407 | 42.1087–42.2422 | 13.03 |
| T058 | Pak. | 42.7957–42.9307 | 42.8094–42.9429 | 13.73 |
| T059 | Ini | 43.1477–43.3477 | 43.1765–43.3767 | 28.77 |
| T060 | habis | 43.4651–43.7501 | 43.4768–44.0774 | 11.67 |
| T060 | banget | 43.8101–44.0451 | 43.8104–44.0774 | 0.33 |
| T061 | gitu | 44.1051–44.3351 | 44.1107–44.3443 | 5.63 |
| T062 | buat | 44.4451–44.5951 | 44.4778–44.6780 | 32.67 |
| T062 | biayanya. | 44.6551–45.1601 | 44.6780–45.1785 | 22.87 |
| T063 | Aku | 45.3351–45.4788 | 45.3453–45.5121 | 10.20 |
| T063 | sampai | 45.4791–45.7951 | 45.5121–45.8124 | 33.03 |
| T064 | harus | 45.7951–46.2251 | 45.8124–46.3463 | 17.33 |
| T064 | langganan | 46.3373–47.0523 | 46.3463–47.0804 | 9.00 |
| T068 | sama | 49.1547–49.6297 | 49.1825–49.7497 | 27.77 |
| T068 | Claude | 49.7469–50.0269 | 49.7497–50.1501 | 2.80 |
| T068 | Pro | 50.1419–50.4519 | 50.1501–50.4838 | 8.20 |
| T069 | yang | 50.5701–50.7201 | 50.5839–50.7507 | 13.77 |
| T071 | Hanya | 51.4789–51.8039 | 51.4848–51.8184 | 5.87 |
| T071 | untuk | 51.8039–52.0439 | 51.8184–52.1855 | 14.53 |
| T071 | uji | 52.1689–52.3439 | 52.1855–52.3523 | 16.57 |
| T072 | coba | 52.3789–52.7339 | 52.3857–52.8528 | 6.77 |
| T072 | sistem | 52.8505–53.2155 | 52.8528–53.2198 | 2.30 |
| T072 | ini, | 53.2155–53.4405 | 53.2198–53.4534 | 4.33 |
| T073 | gitu. | 53.5205–53.6955 | 53.5535–53.7203 | 33.00 |
| T074 | Dan | 53.8995–54.0745 | 53.9205–54.7881 | 21.03 |
| T074 | bahkan | 54.0745–54.3995 | 54.0874–54.7881 | 12.87 |
| T074 | sistem | 54.4395–54.7595 | 54.4544–54.7881 | 14.90 |
| T075 | workflow | 54.7595–55.2395 | 54.7881–56.1561 | 28.57 |
| T075 | ini | 55.2395–55.3553 | 55.2552–56.1561 | 15.70 |
| T075 | memungkinkan | 55.3713–56.1361 | 55.3887–56.1561 | 17.37 |
| T076 | sistem | 56.2408–56.5558 | 56.2562–56.9235 | 15.40 |
| T076 | kerja | 56.5708–56.9158 | 56.5899–56.9235 | 19.07 |

## Verifikasi teknis

- Doctor awal dan profil siirfan: lulus.
- `npx tsc --noEmit -p .`: lulus. Tsconfig lama belum mencakup src/video, sehingga entry `src/video/index.ts` juga diperiksa dengan konfigurasi QC yang mewarisi tsconfig proyek, termasuk strict: lulus. Konfigurasinya `qc/r7/ktwajah/tsconfig.video.json`. Log: `qc/r7/ktwajah/tsc.log`, `tsc_video.log`.
- Motion lint pada folder kt83: lulus; `motion_lint.log`.
- `kt_check.py teks.json --w 1920 --h 1080`: informasi saja. Dua temuan lama tentang variasi gerak pada 75–90 dan 80–95 detik, di luar lingkup ini. Log: `kt_check.log`.
- `r7_ktwajah.py check`: 45 blok, 89 kata, semua durasi mencakup akhir ucapan, indeks unik, kepemilikan override sesuai TASK, endpoint kamera cocok dengan rumus compose. Bukti: `checks.json`.
- `r7_ktwajah.py pixels`: seluruh **1.023 frame overlay baru** diperiksa pada 480×270. Nol frame teks yang hilang/tambahan; tidak terdeteksi huruf memasuki zona tengah wajah atau batas rig Clawd (ambang lebih dari 3 piksel ukur). Selubung huruf: x=156–1784, y=72–940, ketelitian ±4 px; berada dalam margin 5% dan di atas 8% bawah frame. Ini pemeriksaan geometri/kehadiran piksel; penilaian komposisi tetap lewat still. Bukti per grup: `pixel_audit.json`.
- Kontras token: putih hangat/biru = **4,857:1**; tag kaca dengan asumsi latar putih maksimum = **5,263:1**; putih/outline cincin pada latar putih maksimum = **10,958:1**. K4 duduk pada baju gelap dengan bayangan lembut. Bukti angka: `contrast_tokens.json`; penilaian di footage ada pada still.

## Rakitan dan bukti gambar

Seluruh rakitan 1920×1080, 30000/1001 fps. Waktu permintaan dibulatkan ke batas frame native. Sidik jari setiap sumber dicek lagi sebelum gambar dibuat; sumber T048 dari UI yang berubah saat QC telah dimasukkan ke rakitan terbaru.

| Rentang permintaan | Frame | Durasi hasil | Klip | Lembar 2 fps |
|---|---|---|---|---|
| 0–15 s | 450 | 15.015000 s | [MP4](../qc/r7/ktwajah/rentang_0-15.mp4) | [30 still](../qc/r7/ktwajah/sheet_0-15_2fps.jpg) |
| 15–23.7 s | 260 | 8.675333 s | [MP4](../qc/r7/ktwajah/rentang_15-23.7.mp4) | [18 still](../qc/r7/ktwajah/sheet_15-23.7_2fps.jpg) |
| 36–57.7 s | 650 | 21.688333 s | [MP4](../qc/r7/ktwajah/rentang_36-57.7.mp4) | [44 still](../qc/r7/ktwajah/sheet_36-57.7_2fps.jpg) |

Enam still 1080p: [4.9 s](../qc/r7/ktwajah/stills/4.9.jpg), [7.8 s](../qc/r7/ktwajah/stills/7.8.jpg), [11.0 s](../qc/r7/ktwajah/stills/11.0.jpg), [39.5 s](../qc/r7/ktwajah/stills/39.5.jpg), [44.0 s](../qc/r7/ktwajah/stills/44.0.jpg), [55.5 s](../qc/r7/ktwajah/stills/55.5.jpg).

[Sanding vs 83-k1/k2](../qc/r7/ktwajah/sanding.jpg) · [sebelum/sesudah](../qc/r7/ktwajah/sebelum_sesudah.jpg) · [uji lebar 360 px](../qc/r7/ktwajah/phone.jpg) · [ruang busur pada 6,5 s](../qc/r7/ktwajah/workflow_6.5.jpg).

Enam still, lembar 2 fps, dan potongan tepi rambut diperiksa secara visual. Tag kiri berada di ruang di samping wajah/bahu; wajah Clawd tetap terbaca. Tag parodi mengalah pada parodi. “dalam ngebuat video” tetap di bawah DECISION. Cincin tidak menutup mata/mulut; “kenapa” dan “memungkinkan” tetap terbaca dengan tepi rambut di depan huruf. Pil biru menjadi penekanan tunggal pada biaya.

### Delapan lapisan matte

Semua memakai `lego/lubang.py potong_zoom` dengan zoom R7. Posisi, waktu, dan sumber desain mentah tidak berubah. [Lembar tepi rambut](../qc/r7/ktwajah/matte/tepi_sheet.jpg) dan [lembar konteks](../qc/r7/ktwajah/matte/sheet.jpg).

| ID | Frame native / waktu zoom maksimum | Zoom | Still maksimum | Pembanding saat alpha masih cukup |
|---|---|---|---|
| T002 | f31 / 1.0344 s | 1.16000× | [still](../qc/r7/ktwajah/matte/T002_max.jpg) | [1.0344 s](../qc/r7/ktwajah/matte/T002_readable.jpg) |
| T009 | f254 / 8.4751 s | 1.11959× | [still](../qc/r7/ktwajah/matte/T009_max.jpg) | [8.3083 s](../qc/r7/ktwajah/matte/T009_readable.jpg) |
| T011 | f254 / 8.4751 s | 1.11959× | [still](../qc/r7/ktwajah/matte/T011_max.jpg) | [8.3417 s](../qc/r7/ktwajah/matte/T011_readable.jpg) |
| GRADE | f624 / 20.8208 s | 1.11878× | [still](../qc/r7/ktwajah/matte/GRADE_max.jpg) | [20.8208 s](../qc/r7/ktwajah/matte/GRADE_readable.jpg) |
| T034 | f624 / 20.8208 s | 1.11878× | [still](../qc/r7/ktwajah/matte/T034_max.jpg) | [20.8208 s](../qc/r7/ktwajah/matte/T034_readable.jpg) |
| T051 | f1141 / 38.0714 s | 1.11943× | [still](../qc/r7/ktwajah/matte/T051_max.jpg) | [38.0714 s](../qc/r7/ktwajah/matte/T051_readable.jpg) |
| T057 | f1291 / 43.0764 s | 1.18609× | [still](../qc/r7/ktwajah/matte/T057_max.jpg) | [43.0764 s](../qc/r7/ktwajah/matte/T057_readable.jpg) |
| T077 | f1709 / 57.0236 s | 1.08741× | [still](../qc/r7/ktwajah/matte/T077_max.jpg) | [57.2572 s](../qc/r7/ktwajah/matte/T077_readable.jpg) |

Pada T009/T011, alpha sudah nol di zoom maksimum karena mask keluar yang diwarisi. T077 masih pada awal masuk dan alphanya juga nol. Still maksimum tetap disertakan; pembanding dipilih pada zoom tertinggi saat massa alpha ≥65% median fase tengah agar tepi rambut dapat diperiksa. Desain/timing tidak diperpanjang demi still. Nilai dan path: `matte_proofs.json`.

Snapshot gabungan dan hash override: `snapshot_r7.json`, `snapshot_inputs.json`. Resep QC dipotong ke rentang untuk menghindari decode seluruh master; kurva yang dipotong hanya linear, dengan endpoint asli. `compose.py --rentang` dijalankan pada resep tersebut dengan waktu lokal mulai 0; offset global dan perintah persis ada di `command_<rentang>.json`. compose.py dan resep sumber tidak diedit.

Manifest 20 klip ProRes 4444 alpha beserta SHA-256: `media_manifest.json`. Hash sumber: `source_hashes.json`. Metadata video: `range_metadata.json`.

## Keputusan Sutradara

Tidak ada keputusan produk baru yang diperlukan. Penerimaan bentuk/komposisi dan audit master gabungan tetap oleh Sutradara. T068 mengikuti pembagian TASK; label D-450 dan desain delapan slab dipertahankan. Commit/push dan pembaruan PETA diserahkan ke Sutradara sesuai R7-BERSAMA. Jika kamera atau rig digeser, `check` memeriksa kecocokan data baked; ulangi prepare dan render grup terkait sebelum QC.

Rujukan API yang diperiksa: [calculateMetadata](https://www.remotion.dev/docs/calculate-metadata) dan [render transparan](https://www.remotion.dev/docs/transparent-videos). Implementasi mengikuti API lokal Remotion 4.0.380 yang terpasang.

## Ronde 2

Status: **siap ditinjau**. QA teknis ukuran, jarak, cakupan, dan rakitan lulus. Penilaian master/commit tetap oleh Sutradara. Dasar: TASK-R7-ktwajah-r2, meneruskan D-462/D-465. Ledger delta disimpan di laporan milik tugas ini karena `DECISIONS.md` dan berkas revisi bersama tidak masuk FILE BOLEH; pencatatan ledger bersama tetap oleh Sutradara.

| Butir | Instruksi revisi | Cakupan yang diubah |
|---|---|---|
| K2-1 | “tag 64–80 px tinggi huruf (kata klimaks/pil lebih besar ±96 px)”; “tumpukan diagonal ±35–45 % tinggi frame”; “jarak ke tokoh/bubble ≥ 60 px” | Ukuran huruf/tag dan posisi/jarak tangga; tangga pembuka pindah ke sisi bebas Clawd. |
| K1-1 | “naikkan ke 58–64 px”; “busur tetap melingkari kepala, maksimal 3 kata terlihat, tidak keluar tepi atas (margin 5 %)” | Ukuran huruf serta posisi/lapangan busur K1. |
| K4-1 | “pastikan ≥ 64 px dan tidak menutupi mikrofon/tangan secara berlebihan” | Ukuran dan posisi K4/pil terhadap dada, tangan, dan mikrofon. |
| Fokus-1 | “saat bubble tampil (8,6–12,0), narasi kecil tidak boleh bersaing: letakkan di sisi yang bebas bubble” | Posisi cincin pembuka di atas kepala, terpisah dari bubble kiri/kanan. |

Bentuk, gerak/kurva, waktu kata, warna, sumber matte/slab, serta tokoh/bubble mengikuti ronde 1. Baseline lokal: `qc/r7/ktwajah/r2/before/` (11 still penuh, sumber komponen, props, timing, resep); cache sebelum revisi di `/mnt/storage-projects/skill-dev-journey/r7/ktwajah/r2/before/`.

### Hasil ukuran dan penempatan

- **K2-1:** T006–T012 menempati sisi kanan yang bebas Clawd. Pada 4,9 s tinggi tumpukan tag **411 px / 38,06%** frame; pada 7,8 s **409 px / 37,87%**. T013 kembali ke kiri bawah ketika Codex masuk di kanan (8,308 s), dengan padding horizontal lebih sempit; jarak minimum **tepi tag–Clawd 64 px**, diukur ulang pada 1920×1080. `key_geometry.json`, `native_gap.json`, `space.json` menyimpan pengukurannya. Tag tetap dua kata maksimum, dengan sudut, arah masuk, kurva, dan onset ronde 1.
- **K1-1:** tinggi huruf acuan **59,4–63,3 px**. Busur tetap elips dengan proporsi yang sama; radius diperbesar bila tiga kata panjang membutuhkan ruang. T017/T018 bergeser ke atas-kiri dan memakai radius lebih besar agar “ngebuat” terbaca di atas rambut serta bebas bubble. Rotasi tetap 1,65°/s dan maksimal tiga kata. Tepi huruf paling atas **y=64 px** (margin 5%=54 px). Jarak minimum cincin–bubble **139 px**, ukur 480×270 lalu dikonversi ke 1080p, ketelitian ±4 px.
- **K4-1:** tinggi huruf acuan **69,3–83,1 px**; posisi turun 55×zoom dan bergeser 70×zoom ke kiri dari dasar ronde 1, sehingga teks duduk pada baju di kiri mikrofon. T020/T021 tetap pada y=902 di bawah DECISION. Pil T060 mempertahankan ukuran dasar 76 px karena tinta frasa lengkap sudah **±94 px**, lalu bergeser 170×zoom ke kiri dan 85×zoom ke bawah untuk membuka mikrofon/tangan.

**Metode ukuran:** tinggi huruf acuan adalah tinggi tinta kapital **H** dari Poppins 700/800 yang benar-benar dimuat, pada skala penuh sebelum pop, bukan nilai CSS atau tinggi tag. Rentang dihitung untuk seluruh frame blok mengikuti zoom; toleransi raster ±1 px. Huruf kecil, ascender, dan ekor g/j mempunyai tinggi tinta berbeda. Semua ukuran CSS, tinggi x, serta tinggi tinta tiap kata lengkap tersedia dalam [sizes.csv](../qc/r7/ktwajah/r2/sizes.csv) dan [sizes.json](../qc/r7/ktwajah/r2/sizes.json). Pil ±94 px memakai tinggi tinta frasa lengkap, termasuk ekor g; ukuran kapitalnya juga ditulis apa adanya pada tabel.

### Ukuran per blok (1080p)

| ID | Bentuk | Huruf H R1 (px) | Huruf H R2 (px) | Ukuran CSS R2 (px) |
|---|---|---:|---:|---:|
| T001 | K4 | 42.4–43.0 | 70.7–71.6 | 100.8–102.0 |
| T006 | K2 | 42.2–42.5 | 70.9–71.5 | 101.0–101.8 |
| T007 | K2 | 42.6–42.7 | 71.1–71.3 | 101.3–101.6 |
| T008 | K2 | 42.8–43.9 | 70.3–72.1 | 100.1–102.7 |
| T010 | K2 | 44.7–45.3 | 70.7–71.7 | 100.7–102.1 |
| T012 | K2 | 46.1–46.4 | 71.0–71.4 | 101.1–101.7 |
| T013 | K2 | 46.4–47.1 | 63.8–64.7 | 90.9–92.2 |
| T017 | K1 | 47.9–49.3 | 60.4–62.2 | 86.1–88.6 |
| T018 | K1 | 49.3–49.6 | 61.2–61.4 | 87.1–87.5 |
| T020 | K4 | 42.8–43.9 | 70.2–72.1 | 100.0–102.8 |
| T021 | K4 | 44.0–44.2 | 71.0–71.4 | 101.2–101.6 |
| T022 | K4 | 42.1–42.9 | 70.5–71.8 | 100.5–102.3 |
| T023 | K4 | 42.9–43.1 | 71.0–71.4 | 101.2–101.6 |
| T024 | K4 | 43.2–43.5 | 70.9–71.5 | 101.0–101.8 |
| T026 | K2 | 41.5–42.4 | 70.4–72.0 | 100.2–102.6 |
| T027 | K2 | 42.6–43.1 | 70.8–71.6 | 100.8–102.0 |
| T028 | K2 | 43.1–43.8 | 70.6–71.7 | 100.6–102.2 |
| T029 | K2 | 39.9–40.4 | 70.8–71.6 | 100.8–102.0 |
| T030 | K2 | 40.5–40.9 | 70.8–71.5 | 100.9–101.9 |
| T031 | K2 | 41.0–41.9 | 70.4–72.0 | 100.3–102.5 |
| T032 | K2 | 42.1–42.4 | 70.9–71.5 | 101.0–101.8 |
| T033 | K2 | 42.5–43.0 | 70.7–71.7 | 100.7–102.1 |
| T035 | K2 | 40.6–41.2 | 70.7–71.7 | 100.7–102.1 |
| T036 | K2 | 41.3–42.1 | 70.5–71.9 | 100.5–102.4 |
| T037 | K2 | 42.1–42.5 | 70.9–71.5 | 101.0–101.9 |
| T052 | K1 | 44.0–44.5 | 60.9–61.7 | 86.8–87.9 |
| T053 | K1 | 44.6–45.6 | 60.6–62.0 | 86.4–88.3 |
| T054 | K1 | 44.8–47.7 | 59.4–63.3 | 84.5–90.1 |
| T055 | K1 | 47.8–48.8 | 60.7–61.9 | 86.4–88.2 |
| T056 | K1 | 45.9–46.5 | 60.9–61.7 | 86.7–87.9 |
| T058 | K4 | 49.6–49.7 | 71.1–71.3 | 101.3–101.5 |
| T059 | K4 | 46.4–46.6 | 71.0–71.4 | 101.2–101.6 |
| T060 | pil | 59.2–64.8 | 59.5–65.1 | 84.4–92.3 |
| T061 | K4 | 51.2–51.5 | 71.0–71.4 | 101.2–101.6 |
| T062 | K4 | 51.7–52.5 | 70.6–71.7 | 100.6–102.2 |
| T063 | K4 | 46.8–47.3 | 70.8–71.6 | 100.8–102.0 |
| T064 | K4 | 47.4–50.0 | 69.3–73.1 | 98.7–104.1 |
| T068 | K4 | 48.0–53.1 | 75.1–83.1 | 107.0–118.3 |
| T069 | K4 | 49.1–49.3 | 71.1–71.3 | 101.2–101.6 |
| T071 | K4 | 48.6–51.0 | 69.5–72.9 | 99.0–103.8 |
| T072 | K4 | 50.7–52.1 | 70.3–72.1 | 100.1–102.7 |
| T073 | K4 | 52.2–52.4 | 71.1–71.3 | 101.3–101.6 |
| T074 | K1 | 47.9–48.7 | 60.8–61.8 | 86.6–88.0 |
| T075 | K1 | 46.6–47.9 | 60.5–62.1 | 86.2–88.5 |
| T076 | K1 | 45.9–46.5 | 60.9–61.7 | 86.8–87.9 |

### Bukti gambar dan rentang

Sebelas waktu yang diminta tersedia sebagai still utuh **1920×1080** di `r2/before/` dan `r2/after/`, serta pasangan **3840×1120** di `r2/compare/` (40 px untuk label, gambar tidak dipotong). Nama berkas memakai waktu permintaan; frame native dan waktu aktual ada dalam `stills.json`.

| Waktu | Sebelum/sesudah penuh |
|---|---|
| 4.9 s | [pasangan](../qc/r7/ktwajah/r2/compare/4.9.jpg) |
| 7.8 s | [pasangan](../qc/r7/ktwajah/r2/compare/7.8.jpg) |
| 11.0 s | [pasangan](../qc/r7/ktwajah/r2/compare/11.0.jpg) |
| 39.5 s | [pasangan](../qc/r7/ktwajah/r2/compare/39.5.jpg) |
| 44.0 s | [pasangan](../qc/r7/ktwajah/r2/compare/44.0.jpg) |
| 55.5 s | [pasangan](../qc/r7/ktwajah/r2/compare/55.5.jpg) |
| 4.5 s | [pasangan](../qc/r7/ktwajah/r2/compare/4.5.jpg) |
| 6.5 s | [pasangan](../qc/r7/ktwajah/r2/compare/6.5.jpg) |
| 16.5 s | [pasangan](../qc/r7/ktwajah/r2/compare/16.5.jpg) |
| 19.5 s | [pasangan](../qc/r7/ktwajah/r2/compare/19.5.jpg) |
| 52.0 s | [pasangan](../qc/r7/ktwajah/r2/compare/52.0.jpg) |

[Lembar sebelum/sesudah 1](../qc/r7/ktwajah/r2/sebelum_sesudah_1.jpg) · [lembar 2](../qc/r7/ktwajah/r2/sebelum_sesudah_2.jpg) · [sanding dengan 83-k1/k2](../qc/r7/ktwajah/r2/sanding.jpg) · [11 still sesudah](../qc/r7/ktwajah/r2/after_sheet.jpg).

37 frame tahan mencakup setiap detik yang mempunyai narasi milik tugas ini (`holds/`, `holds_sheet_1…5.jpg`); 45 still tambahan mencakup setiap blok (`blocks/`, `blocks_sheet_1…5.jpg`). Saat bubble hadir, narasi berada di atas-kiri kepala dan bukan di bidang bubble kiri/kanan. Tiga kata T017 diperiksa lagi pada 11,51 s. K4/pil berada di bidang baju dan mikrofon tetap terlihat. Pada parodi, narasi tetap berupa satu kelompok kata; T031 yang panjang menempati kiri bawah agar tidak terdesak ke tepi kanan/wajah. Penilaian kreatif master tetap oleh Sutradara.

| Rentang | Frame native | Durasi | Keluaran |
|---|---:|---:|---|
| 0–15 s | 450 | 15,015000 s | [MP4](../qc/r7/ktwajah/r2/rentang_0-15.mp4) |
| 15–23,7 s | 260 | 8,675333 s | [MP4](../qc/r7/ktwajah/r2/rentang_15-23.7.mp4) |
| 36–57,7 s | 650 | 21,688333 s | [MP4](../qc/r7/ktwajah/r2/rentang_36-57.7.mp4) |

### QA teknis dan batas integrasi

- `tsc` proyek, `tsc` entry video, dan `motion_lint`: **lulus** (`technical_checks.json`, log masing-masing).
- Seluruh **1.023 frame overlay** terbaru: **0** frame hilang/tambahan, **0** benturan zona mata/mulut dan rig. Selubung tinta x=108–1788, y=64–976, ketelitian ±4 px; `pixel_audit.json`. Pemeriksaan bentuk/komposisi memakai still, bukan verdict geometri ini.
- 45 blok / 89 kata: `timing.json` identik dengan ronde 1; `check.log` dan `checks.json` memeriksa onset/akhir kata, kamera, dan rig. Props hanya bertambah `tata` (ukuran/posisi/jarak); bagian lain identik. `common.ts` (pop, durasi, react), pemuatan font, `teks.json`, `edit/words.json`, serta **delapan cache slab** identik menurut SHA-256; warna, bobot, dan radius tetap seperti ronde 1. Bukti: `scope.json`, `baseline_hashes.json`, `code.diff`.
- `revisi_cek.py beda_lapisan` pada override sendiri: **tidak ada delta** waktu, posisi lapisan, gerak, daftar tambah/buang; `revisi_override.json`. Posisi internal berubah lewat props `tata`. `lego/r7_gabung.py` dijalankan dari folder `lego/`: **57 lapisan**, tidak ada bentrok ID.
- Manifest 20 cache ProRes 4444 alpha dan SHA-256: `media_manifest.json`. Ketiga rentang terbaru 1920×1080, 30000/1001 fps dan jumlah frame tepat (`range_metadata.json`). Sidik jari input dicocokkan sebelum still diambil. `Root.tsx`, `tema.ts`, audio, sumber adegan, tokoh/bubble, dan override pekerja lain tidak diedit.

**QCF-01 · untuk Sutradara saat merakit master.** Bentuk `setpts=PTS-STARTPTS+t/TB` pada `compose.py` dapat membulatkan offset pecahan ke frame sebelumnya; misalnya offset T058 pada rentang 36 s menjadi 203,99999999999986 frame, padahal maksudnya frame 204. Akibatnya still ujung kata bisa kosong satu frame terlalu cepat, walaupun cache masih berisi kata. QC ronde ini memakai wrapper lokal `round_qc.py`: setelah filter fps native, offset dinyatakan sebagai bilangan frame bulat. Tidak mengubah `compose.py`, waktu override, atau animasi. Perintah aktual tersimpan dalam `recipe_<rentang>_actual_ffmpeg.json`; resep dan perintah CLI tetap disertakan. Terapkan pembulatan frame yang sama saat integrasi master; catatan ini bukan izin menggeser cue satu frame. Bukti sebelum pembulatan vs raw cache: [pts_rounding_before.jpg](../qc/r7/ktwajah/r2/pts_rounding_before.jpg).

Commit/push, PETA, ledger bersama, dan audit master tetap ditangani Sutradara sesuai R7-BERSAMA. Tidak ada keputusan desain baru yang diminta.
