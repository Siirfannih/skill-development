# Footage · Behindwork #06 Nintendo (Hitung Mundur)

Semua URL dicek ada pada 22 Nov 2026 (Commons via API metadata; YouTube via `yt-dlp --skip-download` metadata). Belum ada yang diunduh. Timestamp bertanda **(cek visual)** belum dilihat frame-nya: video tidak diunduh/ditonton, jadi rentang adalah perkiraan dari struktur video atau durasi penuh. Editor wajib memastikan sebelum memotong.

| # | kebutuhan (shot di script) | URL | timestamp | jenis | catatan lisensi |
|---|---|---|---|---|---|
| F1 | Artefak jangkar: kartu hanafuda Nintendo (0–3, semua pembatas, 78–81) | https://commons.wikimedia.org/wiki/File:Nintendo_Hanafuda.jpg | - | foto | CC BY 2.0, fuzzcat. Atribusi di caption. |
| F2 | Kotak hanafuda lama (3–9, variasi pembatas) | https://commons.wikimedia.org/wiki/File:Hanafuda_-_DSCN4659.JPG | - | foto | CC BY-SA 3.0, Gamagnyax ("Hanafuda card game box of 1930"). Share-alike: atribusi + lisensi di caption. |
| F3 | Kantor pertama Nintendo 1889 (3–9) | https://commons.wikimedia.org/wiki/File:Nintendo_1889.jpg | - | foto arsip | Public domain (menurut halaman Commons). |
| F4 | Logo Marufuku 1889 (3–9, zoom penutup) | https://commons.wikimedia.org/wiki/File:Nintendo_Marufuku_logo.jpg | - | logo arsip | Public domain menurut Commons; tetap merek Nintendo, pakai editorial saja. |
| F5 | Taksi Daiya 1971 berlogo Nintendo (31–41) | https://www.nintendolife.com/news/2022/03/random-70s-photo-reminds-us-that-once-upon-a-time-nintendo-ran-a-taxi-firm (artikel memuat tweet foto Erik Voskuil / BeforeMario) | - | foto arsip | Hak cipta pemilik foto. Minta izin ke Erik Voskuil (@beforemario / beforemario.com). Tanpa izin: kartu teks "TAKSI DAIYA". Nintendo Life memblokir fetch otomatis (403); buka manual. |
| F6 | Sampul buku Game Over (10–30) | foto fisik/scan sampul milik sendiri; referensi: David Sheff, *Game Over*, Random House 1993 | - | foto buku | Sampul buku: pakai sebagai kutipan editorial, kecil di frame. |
| F7 | Ultra Hand asli memanjang (42–64) | https://www.youtube.com/watch?v=Xy1X0ySHcKc ("ウルトラハンド実演（横井軍平 作）", kanal GY, 2010, 0:58) | 0:00–0:58 | video demo produk | Hak cipta pengunggah; durasi pendek, pakai potongan ≤5 dtk, kredit kanal. |
| F8 | Ultra Hand close-up alternatif | https://www.youtube.com/watch?v=y0GxTT7EGn0 ("Episode 2 - Nintendo Ultra Hand - 1966", Retro Collection Studio, 6:38) | 0:30–1:30 (cek visual) | video kolektor | Hak cipta pengunggah; minta izin atau potongan ≤5 dtk. |
| F9 | Wawancara TV Gunpei Yokoi 1996 (42–58) | https://www.youtube.com/watch?v=qGCUQdDgmdo ("(1996) TV Report on Video Games & Gunpei Yokoi Interview", The Video Game Vault, 5:36) | 2:00–3:30 (cek visual) | arsip TV | Re-upload arsip; hak cipta stasiun TV asal. Potongan pendek, editorial, kredit "arsip TV 1996". |
| F10 | Iklan TV mainan Nintendo era 70-an + TV Game 6/15 (17–21, 58–72) | https://www.youtube.com/watch?v=JBLXO_gN0tY ("任天堂 ファミリーコンピュータ発売までの関連CM集 1970–1983年", GCMC, 9:13) | mainan: 0:00–2:00; TV Game: 3:00–5:00 (cek visual, kompilasi kronologis) | iklan TV arsip | Hak cipta Nintendo. Potongan ≤3 dtk per klip, editorial. |
| F11 | Museum Nintendo, eksterior + interior hanafuda (81–86) | https://www.youtube.com/watch?v=JApUMBscKOc ("Nintendo Museum Direct", Nintendo of America, 19 Agu 2024, 13:19) | 0:00–0:30 eksterior; 7:20–8:00 bagian bermusik tradisional Jepang, kemungkinan segmen hanafuda (cek visual) | video resmi perusahaan | Hak cipta Nintendo; materi promosi resmi, pakai editorial dengan kredit "Nintendo". |
| F12 | Pintu masuk Museum Nintendo (foto cadangan) | https://commons.wikimedia.org/wiki/File:Nintendo_Museum_Entrance.jpg | - | foto | CC BY-SA 4.0, Nagomijirap. |
| F13 | Kantor pusat Nintendo masa kini (cadangan transisi #1) | https://commons.wikimedia.org/wiki/File:Headquarters_of_Nintendo_Co.,_Ltd.jpg | - | foto | CC BY-SA 4.0, Tokumeigakarinoaoshima (2020). |
| F14 | Love Tester (cadangan item #2, Yokoi) | https://commons.wikimedia.org/wiki/File:Love_tester_tan.jpg | - | foto produk | CC BY-SA 4.0. |
| F15 | Hotel Marufukuro di bekas kantor Nintendo (cadangan NT-12) | https://commons.wikimedia.org/wiki/File:Marufukuro_extrior.jpg | - | foto | CC BY-SA 4.0, Yrwg. |
| F16 | Halaman sejarah resmi Nintendo (screen capture untuk kartu sumber) | https://www.nintendo.co.jp/corporate/en/history/ | - | screenshot web | Screenshot editorial; jangan crop logo jadi seolah sponsor. |

**Jangan dipakai:** https://commons.wikimedia.org/wiki/File:Hiroshi_Yamauchi.png (CC0) adalah foto Duta Besar Jepang untuk Argentina, bukan presiden Nintendo. Foto Hiroshi Yamauchi asli tidak ada di Commons; kalau perlu, beli/lisensi dari Getty/Kyodo/AP, atau tampilkan nama saja.

## Perintah yt-dlp (siap jalan, dijalankan nanti oleh editor)

```bash
mkdir -p footage
# F7 Ultra Hand demo (penuh)
yt-dlp --download-sections "*0:00-0:58" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" "https://www.youtube.com/watch?v=Xy1X0ySHcKc"
# F8 Ultra Hand close-up (cek visual)
yt-dlp --download-sections "*0:30-1:30" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" "https://www.youtube.com/watch?v=y0GxTT7EGn0"
# F9 Yokoi wawancara TV 1996 (cek visual)
yt-dlp --download-sections "*2:00-3:30" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" "https://www.youtube.com/watch?v=qGCUQdDgmdo"
# F10 iklan mainan + TV Game (cek visual)
yt-dlp --download-sections "*0:00-2:00" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" "https://www.youtube.com/watch?v=JBLXO_gN0tY"
yt-dlp --download-sections "*3:00-5:00" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" "https://www.youtube.com/watch?v=JBLXO_gN0tY"
# F11 Nintendo Museum Direct
yt-dlp --download-sections "*0:00-0:30" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" "https://www.youtube.com/watch?v=JApUMBscKOc"
yt-dlp --download-sections "*7:20-8:00" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" "https://www.youtube.com/watch?v=JApUMBscKOc"
```

Foto Commons: unduh dari tombol "Download" di halaman file (resolusi asli), simpan atribusi di `footage/CREDITS.txt`.

## Kredit untuk caption

Foto: fuzzcat (CC BY 2.0), Gamagnyax (CC BY-SA 3.0), Nagomijirap (CC BY-SA 4.0), Wikimedia Commons. Video: Nintendo (Nintendo Museum Direct), arsip iklan TV Nintendo, arsip TV 1996. Foto taksi Daiya: Erik Voskuil / BeforeMario (dengan izin).
