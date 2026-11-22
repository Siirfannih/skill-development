# Footage · Episode 10 · Samsung Sanghoe (22 Nov 2026)

Semua URL dicek ada pada 22 Nov 2026 (gambar Hoam: HTTP 200; YouTube: oEmbed OK; Commons: halaman file terbaca). Belum ada yang diunduh.
**Timestamp YouTube di bawah adalah perkiraan rentang** (video belum ditonton). Tonton dulu dan koreksi angka sebelum menjalankan perintah.

| # shot | Kebutuhan | URL | Timestamp | Jenis | Catatan lisensi |
|---|---|---|---|---|---|
| 1, 6, 7, 11 | **Artefak jangkar**: gedung Samsung Sanghoe, Ingyo-dong, Daegu | http://www.hoamfoundation.org/eng/images/hoam/img_hoam0203_01.jpg (halaman: https://www.hoamfoundation.org/eng/hoam/hoam_history03.asp) | – | Foto arsip | Hak cipta Yayasan Ho-Am/Samsung. Pakai editorial dengan kredit "Ho-Am Foundation"; idealnya minta izin. **Resolusi rendah (18 KB)**: perlu upscale hati-hati, jangan menambah detail palsu. |
| 1 (alt) | Foto 1930-an berjudul 삼성상회 | https://commons.wikimedia.org/wiki/File:%EC%82%BC%EC%84%B1%EC%83%81%ED%9A%8C.jpg | – | Foto arsip 510×336 | Commons: PD-Korea (hak cipta habis di Korsel); tag PD-AS belum ada. Subjek belum pasti (kategori *Rice mills*). |
| 3 | Lokasi bekas Samsung Sanghoe sekarang | http://www.hoamfoundation.org/eng/images/hoam/img_hoam0203_02.jpg | – | Foto | Ho-Am, kredit |
| 2 | Potret Lee Byung-chul (1950) | https://commons.wikimedia.org/wiki/File:Lee_Byung-chul.jpg | – | Foto | Commons: PD-Korea; tag PD-AS belum ada. Kredit "Wikimedia Commons". |
| 2 (alt) | Lee Byung-chul di koran 1969 | https://commons.wikimedia.org/wiki/File:Lee_Byung-chul,_1969-02-08,_Maeil_Business.png | – | Kliping koran | Cek lisensi di halaman file sebelum pakai |
| 8 | Merek "Star Noodles" (Mi Bintang) | http://www.hoamfoundation.org/eng/images/hoam/img_hoam0203.jpg | – | Foto produk | Ho-Am, kredit |
| 9 | Logo tiga bintang lama | https://www.samsung.com/levant/about-us/brand-identity/heritage/ (video "History of Samsung Lettermark") | rekam layar bagian logo pertama | Video resmi | Milik Samsung; pakai pendek untuk komentar, risiko klaim rendah-sedang. Logo adalah merek dagang: tampilkan sebagai referensi sejarah, bukan endorsement. |
| 10 | Arsip Samsung Electronics awal (pabrik, TV hitam-putih), "36 orang → 300 ribu" | https://www.youtube.com/watch?v=lTdImVvjmKg (Yonhap TV, 2:50) | perkiraan 0:20–0:35 | Berita TV | Hak cipta Yonhap TV; potong ≤5 dtk, matikan audio asli |
| 10 (alt) | Ulang tahun 50 Samsung Electronics, arsip | https://www.youtube.com/watch?v=IoF5r3TwG0M (YTN, 7:05) | perkiraan 0:30–0:45 | Berita TV | Hak cipta YTN; ≤5 dtk, tanpa audio |
| 10 (alt) | Idem | https://www.youtube.com/watch?v=b_WhrlPwqsM (Yonhap TV, 2:53) | perkiraan 0:15–0:30 | Berita TV | Idem |
| 10 | Header "The History of Samsung Electronics (1)" | https://img.global.news.samsung.com/global/wp-content/uploads/2012/04/The-history-of-samsung_m.jpg | – | Grafik newsroom | Samsung Newsroom: umumnya boleh editorial dengan kredit |
| 6/11 (opsional) | Peresmian ruang memorial bekas Samsung Sanghoe, Daegu (2011) | https://www.youtube.com/watch?v=nM6y_FAqmHE (kanal pribadi 최문곤, 21:18) | perkiraan 1:00–1:10 | Rekaman acara | Kanal pribadi: minta izin atau hindari |
| 11 (opsional) | Jejak Samsung di Daegu hari ini | https://www.youtube.com/watch?v=eBfAj1EwoSQ (Maeil Shinmun, 5:41) | perkiraan 0:40–0:50 | Berita | Hak cipta Maeil Shinmun; ≤5 dtk |

## Perintah yt-dlp (jalankan setelah timestamp dikoreksi)

```bash
mkdir -p footage
yt-dlp --download-sections "*0:20-0:35" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=lTdImVvjmKg
yt-dlp --download-sections "*0:30-0:45" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=IoF5r3TwG0M
yt-dlp --download-sections "*0:15-0:30" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=b_WhrlPwqsM
yt-dlp --download-sections "*1:00-1:10" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=nM6y_FAqmHE
yt-dlp --download-sections "*0:40-0:50" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=eBfAj1EwoSQ
```

Gambar (unduh manual setelah izin/cek lisensi): `curl -o footage/hoam_samsung_sanghoe.jpg http://www.hoamfoundation.org/eng/images/hoam/img_hoam0203_01.jpg`

## Dihindari
- Kanal YouTube pihak ketiga "History of Samsung" (BlasterTechnology, MaazTech, Origin Empires, dll.): reupload/kompilasi, sering memakai visual AI dan klaim "truk di Busan".
- Video pendek "그때의 사정" (8CqsGMkfy1I): kemungkinan visual rekaan.
- Foto Getty/Reuters: berbayar.
