# Footage · Ep 08 · Dyson

Semua URL dicek 22 Nov 2026. Video YouTube: judul, kanal, dan tanggal unggah dibaca lewat metadata yt-dlp, dan timestamp diambil dari transkrip video. Belum ada yang diunduh. Cek visual setiap potongan saat edit, karena timestamp dicocokkan dari audio, bukan dari gambar.

| # | Kebutuhan | URL | Timestamp | Jenis | Catatan lisensi |
|---|---|---|---|---|---|
| 1 | Artefak jangkar: G-Force pink 1986 | https://collections.vam.ac.uk/item/O146046 | - | Foto museum (V&A M.64-1993) | Gratis hanya untuk non-komersial online ≤768 px, maksimal 5 tahun. Untuk kanal yang dimonetisasi, minta lisensi ke V&A Licensing atau rekam sendiri di Room 74. RISIKO |
| 2 | Artefak cadangan: G-Force + kemasan asli | https://collection.sciencemuseumgroup.org.uk/objects/co49526/g-force-cyclonic-vacuum-cleaner | - | Foto museum (SMG 1990-465) | CC BY-NC-SA 4.0 (non-komersial). Untuk komersial, lisensi lewat Science & Society Picture Library |
| 3 | Artefak cadangan 2 | https://designmuseum.org/adopt/move/dyson-g-force | - | Foto museum | Hak cipta Design Museum. Hanya referensi, kecuali ada izin |
| 4 | Dyson muda di Coach House, bengkel "Engine Room", Dyson di Nishiazabu 1985, G-Force di rumah 1986 | http://web.archive.org/web/20260720160332/https://www.dyson.com/james-dyson/invention-a-life/05 | - | Foto arsip resmi (memoar "Invention: A Life" bab 5) | © Dyson. Pakai sebagai komentar/kutipan singkat, cantumkan kredit "Dyson / Invention: A Life" |
| 5 | Foto keluarga 1975, Ballbarrow, timber merchant Hill Leigh | http://web.archive.org/web/20260717055357/https://www.dyson.com/james-dyson/invention-a-life/04 | - | Foto arsip resmi (bab 4) | © Dyson, kredit sama |
| 6 | Siklon industri di penggergajian kayu | https://commons.wikimedia.org/wiki/File:Cyclonic_Separator_in_UK_Sawmill.jpg | - | Foto Commons | CC BY 4.0, atribusi ke User:Encik Tekateki |
| 7 | DC01 | https://commons.wikimedia.org/wiki/File:Dyson_DC01._01.jpg | - | Foto Commons | CC BY-SA 4.0, atribusi ke User:Lankyrider |
| 8 | Prototipe rapuh, "development then failure" | https://www.youtube.com/watch?v=ypMsb2FtcBM ("The trailer, from Invention: A Life, by James Dyson", kanal Dyson, 16 Sep 2021) | 2:35 sampai 2:48 | Dokumenter resmi | © Dyson. Potongan pendek sebagai komentar; risiko rendah sampai sedang |
| 9 | "One test a day… year after year" (bengkel, uji siklon) | URL sama #8 | 2:48 sampai 3:05 | Dokumenter resmi | Idem |
| 10 | Montase Coach House "engine room" | URL sama #8 | 3:15 sampai 3:40 | Dokumenter resmi | Idem |
| 11 | Dyson: "5,126 failures… four years… the 5,127 worked" | https://www.youtube.com/watch?v=EkezmPpKdzo ("James Dyson: How to invent breakthrough products", Masters of Scale, 6 Jun 2024) | 5:18 sampai 5:36 | Wawancara video podcast | © Masters of Scale/WaitWhat. Kutip ≤3 dtk audio, sisanya B-roll tanpa suara |
| 12 | Dyson soal produsen yang tak mau meninggalkan kantong | URL sama #11 | 7:51 sampai 8:02 | Wawancara | Idem |
| 13 | Dyson soal pinjaman £600.000 dan rumah sebagai jaminan | URL sama #11 | 8:17 sampai 9:03 | Wawancara | Idem |
| 14 | B-roll Dyson bicara soal siklon <20 mikron (tanpa audio) | https://www.youtube.com/watch?v=zFCFe38EIfE ("James Dyson Answers Design Questions From Twitter", WIRED, 30 Nov 2021) | 4:25 sampai 4:45 | Video editorial | © Condé Nast. Bisu saja; audio 4:46 menyebut "5 1/2 thousand", jangan dipakai |
| 15 | Cadangan: Dyson soal utang | https://www.youtube.com/watch?v=x8xlO9qaAU0 ("How Dyson Built a Global Empire on Failure & Creativity", The Business of Creativity) | 17:15 sampai 17:35 | Wawancara | Cek konteks dulu; belum dipakai di naskah |
| 16 | Potret James Dyson masa kini (kartu sumber/penutup) | https://commons.wikimedia.org/wiki/File:Sir_James_Dyson_CBE_FREng_FRS.jpg | - | Foto Commons | CC BY-SA 4.0, atribusi ke Royal Society |

## Perintah yt-dlp (siap pakai, jangan dijalankan sebelum disetujui)

```bash
# Invention: A Life trailer (Dyson resmi)
yt-dlp --download-sections "*2:35-2:48" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=ypMsb2FtcBM
yt-dlp --download-sections "*2:48-3:05" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=ypMsb2FtcBM
yt-dlp --download-sections "*3:15-3:40" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=ypMsb2FtcBM

# Masters of Scale
yt-dlp --download-sections "*5:18-5:36" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=EkezmPpKdzo
yt-dlp --download-sections "*7:51-8:02" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=EkezmPpKdzo
yt-dlp --download-sections "*8:17-9:03" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=EkezmPpKdzo

# WIRED (B-roll bisu)
yt-dlp --download-sections "*4:25-4:45" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=zFCFe38EIfE

# Cadangan
yt-dlp --download-sections "*17:15-17:35" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=x8xlO9qaAU0
```

## Grafis yang dibuat sendiri

- Counter besar #0000 sampai #5.127 (mono/tabular digit, putih di atas hitam), stempel ✕ merah dan ✓ hijau, label kecil "ilustrasi" selama montase.
- Kartu teks: "DITOLAK", "£600.000", "rumah = jaminan", "1993 · DC01".
