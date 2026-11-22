# Footage · 09 KFC mitos 1.009

Semua URL dicek ada pada 22 Nov 2026 (YouTube via metadata yt-dlp, Commons via API). Timestamp WHAS11 dan What's My Line? dari subtitle otomatis; cek ulang saat edit. Belum ada yang diunduh.

| # | kebutuhan | URL | timestamp | jenis | catatan lisensi |
|---|---|---|---|---|---|
| 1 | Artefak jangkar: kartu pos Sanders Court & Café (1930-an) | https://commons.wikimedia.org/wiki/File:Sanders_Court_and_Cafe_postcard.jpg | – | foto arsip | Public domain (Commons); asal koleksi University of Kentucky. Cantumkan kredit |
| 2 | Kartu nama "Kentucky Fried Chicken", Corbin, akhir 1940-an | https://commons.wikimedia.org/wiki/File:Colonel_Sanders%27_business_card,_c._late_1940s.jpg | – | foto objek museum | Public domain (US, terbit 1929–1977 tanpa notis); foto Flickr bluemaumau. Kredit |
| 3 | Sanders 1970-an in character (zoom "umur 60-an") | https://commons.wikimedia.org/wiki/File:Colonel_Harland_Sanders_in_character.jpg | – | foto | CC BY-SA 3.0, kredit "Edgy01 / Wikimedia Commons" wajib |
| 4 | Kartu registrasi 1917 (opsional, tekstur arsip) | https://commons.wikimedia.org/wiki/File:Harland_sanders_1.jpg | – | dokumen | Public domain |
| 5 | Berita WHAS11 hari wafat (16 Des 1980): Highway 25, Interstate 75 | https://www.youtube.com/watch?v=K0HhMbWJNAk | 1:40–2:05 | arsip berita TV | © WHAS11/TEGNA, diunggah kanal resmi WHAS11. Pakai potongan pendek (fair use/komentar), atau minta izin |
| 6 | WHAS11: first franchisee Salt Lake | https://www.youtube.com/watch?v=K0HhMbWJNAk | 2:50–2:58 | arsip berita TV | sama seperti #5 |
| 7 | WHAS11: "2 million dollars" | https://www.youtube.com/watch?v=K0HhMbWJNAk | 3:14–3:20 | arsip berita TV | sama seperti #5 |
| 8 | What's My Line? 1 Des 1963: Sanders masuk dan tanda tangan papan | https://www.youtube.com/watch?v=bfXBhfM8ga0 | 2:27–2:50 | arsip TV | © pemegang hak What's My Line? (kanal resmi). Potongan ≤5 dtk, fair use |
| 9 | Wawancara WFAA 1971 (Sanders bicara) | https://www.youtube.com/watch?v=vlePigmyQY4 | 0:00–0:20 | arsip TV | Kanal SMU Jones Film (arsip universitas). Cek ketentuan pemakaian di SMU Libraries; kredit |
| 10 | Harman Cafe Salt Lake City hari ini (plakat first KFC) | https://www.youtube.com/watch?v=RgyD6bxSrtA | 0:00–0:15 (cari plakat) | vlog | Video pengguna; minta izin atau ganti foto Commons/rekam sendiri |
| 11 | Sanders Café & Museum Corbin hari ini (eksterior) | https://www.youtube.com/watch?v=EwmvhJC4VKA | 0:00–0:20 (cari eksterior) | vlog | Video pengguna; minta izin. Alternatif: foto Commons kategori Harland Sanders Café |
| 12 | Meme "1.009" | – (buat sendiri) | – | kartu teks rekonstruksi | Jangan pakai meme pihak lain; tandai "versi viral" |
| 13 | Cek Social Security 1950-an | – (buat sendiri) | – | ilustrasi | Tandai "ilustrasi" |
| 14 | Grafis sidang: palu, stempel "BUKTI A/B/C", "VONIS: MITOS", berkas dakwaan | – (buat sendiri) | – | motion graphic | Buatan sendiri; SFX palu dari pustaka bebas royalti |
| 15 | Screenshot judul History.com (8 facts) | https://www.history.com/articles/8-facts-real-colonel-sanders-kfc | – | screenshot web | Crop judul saja, kutipan/kritik (fair use) |
| 16 | Screenshot judul AAP FactCheck | https://www.aap.com.au/factcheck/barely-a-nugget-of-truth-in-colonel-sanders-rags-to-riches-meme/ | – | screenshot web | Crop judul saja, kutipan/kritik (fair use) |

## Perintah yt-dlp (jalankan dari folder episode)

```bash
yt-dlp --download-sections "*1:40-2:05" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" "https://www.youtube.com/watch?v=K0HhMbWJNAk"
yt-dlp --download-sections "*2:50-2:58" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" "https://www.youtube.com/watch?v=K0HhMbWJNAk"
yt-dlp --download-sections "*3:14-3:20" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" "https://www.youtube.com/watch?v=K0HhMbWJNAk"
yt-dlp --download-sections "*2:27-2:50" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" "https://www.youtube.com/watch?v=bfXBhfM8ga0"
yt-dlp --download-sections "*0:00-0:20" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" "https://www.youtube.com/watch?v=vlePigmyQY4"
yt-dlp --download-sections "*0:00-0:15" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" "https://www.youtube.com/watch?v=RgyD6bxSrtA"
yt-dlp --download-sections "*0:00-0:20" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" "https://www.youtube.com/watch?v=EwmvhJC4VKA"
```

Foto Commons: unduh resolusi asli dari halaman file (tombol "Original file"), simpan di `footage/stills/`.

Catatan: arsip asli lain yang lebih kuat tapi berbayar/terbatas: wawancara oral history University of Kentucky (~1977) https://kentuckyoralhistory.org/catalog/xt7xd21rjn1m (perlu akun), CriticalPast (lisensi berbayar).
