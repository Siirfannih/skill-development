# Footage · 07 Toyota dan Mesin Tenun Tipe G

Semua URL dicek ada pada 22 Nov 2026 (YouTube lewat metadata yt-dlp/oEmbed; Commons lewat API). Timestamp di dalam video **belum ditonton**: ditandai "perkiraan", cek sebelum potong. Tidak ada yang diunduh.

| Kebutuhan | URL | Timestamp | Jenis | Catatan lisensi |
|---|---|---|---|---|
| Artefak jangkar: Tipe G beroperasi, ganti teropong (hook, 0:00 dan 0:07) | https://www.youtube.com/watch?v=22Ye_lr2pVw ("Type G Automatic Loom", channel resmi トヨタ産業技術記念館, 0:43, unggah 29 Okt 2019) | 0:00–0:43 (seluruh video pendek) | Video museum resmi | Hak cipta Toyota Commemorative Museum; YouTube standar. Pakai potongan pendek dengan atribusi; idealnya minta izin museum |
| Penjelasan "magic loom" Tipe G (0:07–0:17) | https://www.youtube.com/watch?v=edaYAHM92Qg ("[3/13] Pioneering the industrial modernization of Japan's industry", resmi, 2:44) | perkiraan 0:20–1:40 | Virtual guided tour resmi | Sama seperti di atas |
| Toyoda Power Loom 1896, akar jidoka (0:20–0:33) | https://www.youtube.com/watch?v=Fyztu7C-bAQ ("Toyoda Power Loom", resmi, 0:44) | 0:00–0:44 | Video museum resmi | Sama seperti di atas |
| Barisan Tipe G di pabrik era Showa awal (CTA 1:13) | https://www.youtube.com/watch?v=1e4NJXKgmg0 ("[10/13] Reproducing a textile factory of the early Showa period", resmi, 5:41) | perkiraan 1:00–2:30 | Virtual guided tour resmi | Sama seperti di atas |
| Kiichiro, Platt, catatan lab, awal bisnis mobil (0:35–1:07) | https://www.youtube.com/watch?v=Lxult5Eh9F8 ("[1/15] The Determination - Establishing the automotive business in Japan", resmi, 5:45) | perkiraan 0:30–2:30 (cari segmen perjanjian Platt) | Virtual guided tour resmi | Sama seperti di atas |
| Close-up mekanisme ganti teropong (cadangan) | https://www.youtube.com/watch?v=AQbqmwiwIYw ("Toyoda Model G Auto Shuttle Change", AllAboutLean.com, 3:24) | perkiraan 0:10–1:00 | Rekaman pihak ketiga | Hak cipta AllAboutLean (Christoph Roser); minta izin, jangan pakai tanpa izin |
| Foto Tipe G (still artefak, zoom per babak) | https://commons.wikimedia.org/wiki/File:1924_Non-Stop_Shuttle_Change_Toyoda_Automatic_Loom,_Type_G_1.jpg | — | Foto | CC BY-SA 3.0, oleh Morio; wajib atribusi + share-alike |
| Foto Tipe G (alternatif, bebas atribusi) | https://commons.wikimedia.org/wiki/File:Toyoda_Automatic_Loom_-_National_Museum_of_Nature_and_Science,_Tokyo_-_DSC07343.JPG | — | Foto | CC0, oleh Daderot (unit di National Museum of Nature and Science Tokyo, bukan unit pertama; jangan sebut "unit pertama" di layar saat foto ini) |
| Foto Tipe G (alternatif 2) | https://commons.wikimedia.org/wiki/File:Toyoda_Automatic_Loom.jpg | — | Foto | CC BY-SA 3.0, oleh Momotarou2012 |
| Potret Sakichi Toyoda | https://commons.wikimedia.org/wiki/File:Sakichi_Toyoda.jpg | — | Foto arsip | Public domain (penulis tak dikenal) |
| Potret Kiichiro Toyoda | https://commons.wikimedia.org/wiki/File:Kiichiro_Toyoda.jpg | — | Foto arsip | Public domain (penulis tak dikenal) |
| Foto penandatanganan perjanjian Platt | https://global.toyota/en/company/trajectory-of-toyota/history/01/ (foto "Signing of the patent transfer agreement with Platt Brothers") | — | Foto resmi perusahaan | Hak cipta Toyota; screen-capture sebagai kutipan sejarah dengan atribusi, atau minta izin Toyota Global Newsroom |
| Unit Tipe G Science Museum London (opsional) | https://collection.sciencemuseumgroup.org.uk/objects/co528175/toyoda-automatic-loom | — | Foto koleksi | CC BY-NC-SA 4.0: **non-komersial**. Jika kanal dimonetisasi, lisensikan lewat Science & Society Picture Library atau jangan pakai |
| Halaman sejarah resmi (angka £100.000 → £83.500) | https://www.toyota-global.com/company/history_of_toyota/75years/text/taking_on_the_automotive_business/chapter1/section4/item2.html | — | Screen-record web | Tangkapan layar kutipan; tampilkan URL |
| Abstrak jurnal Wada 2006 | https://ideas.repec.org/a/taf/bushst/v48y2006i1p90-118.html | — | Screen-record web | Kutip judul + abstrak singkat saja |
| Halaman JSME Heritage No. 16 | https://jsme.or.jp/kikaiisan/heritage_016_en.html | — | Screen-record web | Tangkapan layar kutipan |

## Perintah yt-dlp (siap pakai, jangan dijalankan sebelum cek timestamp)

```bash
yt-dlp --download-sections "*0:00-0:43" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" "https://www.youtube.com/watch?v=22Ye_lr2pVw"
yt-dlp --download-sections "*0:20-1:40" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" "https://www.youtube.com/watch?v=edaYAHM92Qg"
yt-dlp --download-sections "*0:00-0:44" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" "https://www.youtube.com/watch?v=Fyztu7C-bAQ"
yt-dlp --download-sections "*1:00-2:30" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" "https://www.youtube.com/watch?v=1e4NJXKgmg0"
yt-dlp --download-sections "*0:30-2:30" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" "https://www.youtube.com/watch?v=Lxult5Eh9F8"
# cadangan, hanya setelah ada izin pemilik:
yt-dlp --download-sections "*0:10-1:00" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" "https://www.youtube.com/watch?v=AQbqmwiwIYw"
```

## Dihindari

- https://www.youtube.com/watch?v=0Qmka7YYjTY ("Non-Stop Shuttle Change Toyoda Automatic Loom, Type G (1924年)"): unggahan akun pribadi "RockumanX", bukan pemilik hak.
- Video kompilasi "Entire History of Toyota" pihak ketiga: sumber tingkat D.
