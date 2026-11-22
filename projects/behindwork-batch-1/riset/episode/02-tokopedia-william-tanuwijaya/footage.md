# Episode 02 · Daftar footage

Semua URL dicek ada pada 22 Nov 2026 (metadata YouTube via `yt-dlp --print`, Wayback via CDX API, Commons via API). Timestamp YouTube dari auto-caption; cek ulang ±2 dtk saat memotong. **Belum ada yang diunduh.**

| # shot | Kebutuhan | URL | Timestamp | Jenis | Catatan lisensi |
|---|---|---|---|---|---|
| 2 | "jam 9 malam sampai jam 9 pagi" (suara asli) | https://www.youtube.com/watch?v=ucEDu7O8gyA (Entrepreneurs Wanted!, 2017) | 3:21–3:47 | Talk | Hak cipta kanal; potongan pendek, diberi komentar (kutipan wajar). Kredit di caption |
| 3 | Siantar, kapal 4 hari 3 malam | sama | 2:27–3:03 | Talk | sama; tampil di dalam bingkai CRT |
| 4 | Ayah jatuh sakit; tulang punggung keluarga | sama | 3:12–3:19, 7:48–8:01 | Talk | sama |
| 5 | "jatuh cinta kepada internet" | sama | 3:41–3:55 | Talk | sama |
| 6 | Ide 2007, masalah kepercayaan | sama | 4:01–4:24 | Talk | sama |
| 8 | Dua tahun gagal; "kamu itu tidak spesial" | sama | 5:43–5:58, 8:55–9:28 | Talk | sama; suara asli 2–3 dtk dengan subtitle |
| 9 | "lulusan warnet", "tamparan" | sama | 8:18–8:28, 9:25–9:30 | Talk | sama |
| 12 | "kepercayaan dinilai dari rekam jejak" | sama | 10:01–10:15 | Talk | sama |
| 5 | Talk 2015 tentang warnet (sudut kedua) | https://www.youtube.com/watch?v=ccKfSydqT6o (IDEA FEST, 2015) | 0:40–0:55 | Talk | Hak cipta IDEA FEST; potongan pendek |
| 11 | B-roll merger Gojek–Tokopedia | https://www.youtube.com/watch?v=1CDBeElkYg0 (CNBC Make It, 7 Jun 2021) | 0:25–0:37 | Dokumenter berita | Hak cipta CNBC (risiko lebih tinggi); maks 3–4 dtk, desaturasi + overlay, kredit "CNBC Make It" |
| 11 alt | "Tokopedia started in 2009", William soal demokratisasi perdagangan | sama | 0:54–1:41 | Dokumenter berita | sama |
| 3 alt | Narasi redaksi Siantar–kapal | https://www.youtube.com/watch?v=gYgwH54oZG4 (Tech in Asia ID, 2017) | 0:21–0:59 | Video profil | Cek visual dulu; jangan pakai bila rekaan |
| 1, 10 | **Artefak**: tokopedia.com 26 Agu 2009 | https://web.archive.org/web/20090826145718/http://www.tokopedia.com/ | – | Arsip web | Screenshot arsip, editorial; kredit "Internet Archive Wayback Machine". Merek milik Tokopedia |
| 10 flash | tokopedia.com pra-peluncuran (12 Feb 2009) | https://web.archive.org/web/20090212151358/http://www.tokopedia.com/ | – | Arsip web | sama; cek isinya dulu |
| 13 | Potret William (2018) | https://commons.wikimedia.org/wiki/File:William_Tanuwijaya_1.jpg | – | Foto | **CC BY-SA 4.0**, Priscilla anais; atribusi + tautan lisensi wajib |
| 11 | Rilis merger GoTo 17 Mei 2021 | https://www.gojek.com/blog/gojek/goto | – | Halaman resmi | Screenshot editorial |
| 11 | Rilis GoTo 8 Feb 2023 | https://gotocompany.com/en/news/press/goto-announces-new-leadership-structure-as-it-strengthens-corporate-governance-and-operational-efficiency | – | Newsroom resmi | Screenshot editorial, highlight nama William |
| 1, 7, semua | Bilik warnet + monitor CRT menyala di ruang gelap (latar bingkai) | Stok bebas royalti: https://www.pexels.com/search/crt%20monitor/ dan https://www.pexels.com/search/internet%20cafe/ | – | Stok | Lisensi Pexels (bebas, tanpa atribusi wajib); label "ilustrasi"; bukan warnet tempat William bekerja |
| semua | Jam digital pojok + efek scanline CRT | Dibuat sendiri (motion/After Effects/Remotion) | – | Grafis | Milik sendiri |

## Perintah yt-dlp (siap pakai, belum dijalankan)

```bash
mkdir -p footage

# Entrepreneurs Wanted! 2017 (sumber utama)
yt-dlp --download-sections "*2:27-3:03" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=ucEDu7O8gyA
yt-dlp --download-sections "*3:12-3:55" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=ucEDu7O8gyA
yt-dlp --download-sections "*4:01-4:24" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=ucEDu7O8gyA
yt-dlp --download-sections "*5:43-5:58" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=ucEDu7O8gyA
yt-dlp --download-sections "*7:48-8:28" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=ucEDu7O8gyA
yt-dlp --download-sections "*8:55-9:30" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=ucEDu7O8gyA
yt-dlp --download-sections "*10:01-10:15" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=ucEDu7O8gyA

# IDEA FEST 2015
yt-dlp --download-sections "*0:40-1:12" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=ccKfSydqT6o

# CNBC Make It 2021
yt-dlp --download-sections "*0:25-0:37" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=1CDBeElkYg0
yt-dlp --download-sections "*0:54-1:41" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=1CDBeElkYg0

# Tech in Asia ID 2017 (cek visual dulu)
yt-dlp --download-sections "*0:21-0:59" -f "bv*[height<=1080]+ba/b" -o "footage/%(id)s_%(section_start)s.%(ext)s" https://www.youtube.com/watch?v=gYgwH54oZG4
```

Screenshot arsip/rilis diambil manual dari browser pada 1080×1920 (atau 1440 lalu crop).
