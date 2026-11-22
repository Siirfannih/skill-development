# Footage · YouTube Awalnya Situs Kencan

Semua URL dicek ada pada 22 Nov 2026 (YouTube via oEmbed + metadata yt-dlp tanpa unduh; Commons via API, lisensi dibaca dari metadata berkas). Belum ada yang diunduh.

| # | kebutuhan | URL | timestamp | jenis | catatan lisensi |
|---|---|---|---|---|---|
| 1 | Artefak jangkar: "Me at the zoo" (hook, tengah, penutup) | https://commons.wikimedia.org/wiki/File:Me_at_the_zoo.webm (cermin YouTube: https://www.youtube.com/watch?v=jNQXAC9IVRw) | 0:00–0:19 (total 19 dtk) | video arsip | **CC BY 3.0** (Jawed Karim dan Yakov Lapitsky) di Commons. Wajib atribusi di caption/kartu sumber. Utamakan berkas Commons |
| 2 | Karim cerita fase awal dan pendirian | https://www.youtube.com/watch?v=XAJEXUNmP5M (r \| p 2006, ACM UIUC, 50:48) | 34:27–37:15 (bab "Founding and initial struggle") | ceramah | Hak cipta ACM UIUC. Potongan pendek + komentar (fair use). Tonton dulu untuk ambil 3–5 dtk wajah Karim |
| 3 | Karim cerita pemasaran awal (situs kencan, 747, Craigslist) | sama dengan #2 | 37:15–40:31 (bab "Early marketing efforts") | ceramah | Sama dengan #2. Cocokkan ucapan dengan VO sebelum dipakai |
| 4 | Situs dibuka untuk umum | sama dengan #2 | 40:31–42:18 (bab "Revamping the platform") | ceramah | Sama dengan #2 |
| 5 | Hurley dan Chen setelah akuisisi Google | https://www.youtube.com/watch?v=QCVxQ_3Ejkg ("A Message From Chad and Steve", kanal YouTube resmi, unggah 10 Okt 2006) | 0:00–0:10 | video pendiri | Hak cipta YouTube/Google. Klip pendek (fair use) |
| 6 | Foto Hurley dan Chen | https://commons.wikimedia.org/wiki/File:Walt_Mossberg,_Steve_Chen_and_Chad_Hurley.jpg | — | foto | CC BY 2.0, Joi Ito, 31 Mei 2007. Crop Mossberg; atribusi |
| 7 | Foto Jawed Karim | https://commons.wikimedia.org/wiki/File:Jawed_Karim_2008.jpg | — | foto | Domain publik (Robin Brown, 2008) |
| 8 | Foto Steve Chen | https://commons.wikimedia.org/wiki/File:YouTube_TaiwanVersionLaunch_SteveChen-1.jpg | — | foto | CC BY-SA 3.0. Atribusi + share-alike |
| 9 | Komposit tiga pendiri (spotlight satu per satu) | https://commons.wikimedia.org/wiki/File:Youtube_founders.jpg | — | foto | CC BY-SA 3.0 (komposit oleh Ianmacm) |
| 10 | Tsunami 2004 di Aceh | https://commons.wikimedia.org/wiki/File:Street_in_downtown_Banda_Aceh_after_2004_tsunami_DD-SD-06-07372.JPEG · cadangan https://commons.wikimedia.org/wiki/File:Aceh_2004_tsunami_standing_mosque_USGS.jpg | — | foto arsip | Domain publik (pemerintah AS). Gunakan dengan hormat, tanpa efek glitch |
| 11 | Pidato wisuda Karim 2007 (sumber versi tsunami + slogan) | https://commencement.illinois.edu/wp-content/uploads/2019/10/JawedKarimCommencementAddress.pdf | halaman 2 (paragraf "Tune in – Hook up") | dokumen | Screenshot dokumen untuk kutipan/berita (fair use) |
| 12 | Artikel Time "The YouTube Gurus" (koreksi mitos) | https://time.com/archive/6596757/the-youtube-gurus/ | paragraf dinner party | dokumen | Screenshot judul + paragraf, blur sisanya |
| 13 | Rilis pers akuisisi Google | https://www.sec.gov/Archives/edgar/data/1288776/000119312506206884/dex991.htm | judul "Google To Acquire YouTube for $1.65 Billion in Stock" | dokumen | Dokumen SEC publik |
| 14 | Chen di SXSW 2016 (opsional, untuk kartu sumber) | https://tubefilter.com/2016/03/15/youtube-dating-site-steve-chen/ | — | artikel | Screenshot judul saja |

Kartu teks (tanpa footage): "Tune in, Hook up", "Satu masalah.", iklan baris Craigslist (label **ilustrasi**), "747?", kartu pelajaran, kartu sumber.

## Perintah yt-dlp (siap pakai, belum dijalankan)

```bash
mkdir -p footage
# 1 Me at the zoo (cermin YouTube; utamakan unduh manual berkas .webm Commons yang CC BY 3.0)
yt-dlp --download-sections "*0:00-0:19" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=jNQXAC9IVRw
# 2 Karim ACM 2006: pendirian
yt-dlp --download-sections "*34:27-37:15" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=XAJEXUNmP5M
# 3 Karim ACM 2006: pemasaran awal (situs kencan, Craigslist)
yt-dlp --download-sections "*37:15-40:31" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=XAJEXUNmP5M
# 4 Karim ACM 2006: situs dibuka untuk umum
yt-dlp --download-sections "*40:31-42:18" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=XAJEXUNmP5M
# 5 Chad dan Steve setelah akuisisi
yt-dlp --download-sections "*0:00-0:10" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=QCVxQ_3Ejkg
```

Catatan: video 2005–2006 beresolusi rendah (Me at the zoo 240p); upscale ringan + grain agar seragam. Untuk 9:16, letakkan video 4:3 di tengah dengan latar blur dari frame yang sama.

## Revisi struktur "Bedah 19 Detik" (22 Nov 2026)

"Me at the zoo" (#1) kini tampil sepanjang video dengan timeline scrubber 00:00 / 00:19 dan freeze frame di detik 0, 2, 4, 7, 9, 12, 15, 17, 19. Ekspor frame dari berkas Commons (CC BY 3.0) di titik itu; scrubber dibuat sebagai motion sederhana di editor. Shot #2 tidak lagi dipakai (pendirian kini lewat komposit #9); #3, #4, #5–#13 tetap. Klip #5 cukup 0:00–0:04.
