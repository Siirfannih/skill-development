# Footage · Episode 01 · Jensen Huang ("Dari Toilet Asrama ke Booth Denny's")

Semua URL YouTube dan timestamp di bawah ini sudah diverifikasi terhadap metadata dan transkrip video aslinya (22 Nov 2026).

## 1. Sumber YouTube Terverifikasi & Perintah `yt-dlp`

| Beat | Kebutuhan | Judul & Channel | URL Verbatim | Timestamp | Tag B-Roll | Catatan Lisensi / Pakai |
|---|---|---|---|---|---|---|
| #1 | Hook keynote jaket kulit | **NVIDIA GTC 2026 Keynote with Jensen Huang Highlights** · NVIDIA | `https://www.youtube.com/watch?v=kDd24YOeqQQ` | `0:10–0:20` | `[HOOK-KEYNOTE]` `[JAKET-KULIT]` | Klip resmi NVIDIA, potong ≤4 dtk, grade B&W/desaturasi |
| #2, #7 | Jensen jaket kulit cerita Denny's | **Nvidia CEO started as a waiter at Denny's and now runs one of the world's most valuable companies** · Fortune Magazine | `https://www.youtube.com/watch?v=UM5NP6MapmM` | `0:00–0:20` | `[DENNYS-WAITER]` `[JAKET-KULIT]` `[BROLL-SANTAI]` | Visual bagus untuk #2 & #7 (audio dimatikan, di bawah VO) |
| #4 | Cerita asrama Oneida Kentucky | **America's Poorest County School: Oneida Baptist Institute Story #shorts** · JJREClips | `https://www.youtube.com/watch?v=gywBwbXkvlQ` | `0:00–0:25` | `[ONEIDA-BAPTIST]` `[KENTUCKY-1972]` | Klip cerita sekolah asrama; tampilkan dalam frame dokumenter |
| #6 | **Quote Cut 1:** Bersihkan toilet | **Jensen Huang, Founder and CEO of NVIDIA** · Stanford Graduate School of Business | `https://www.youtube.com/watch?v=lXLBTBBil2U` | `30:38–30:46` | `[QUOTE-CUT-1]` `[CLEANING-TOILETS]` `[SUARA-ASLI]` | **Audio asli dipakai!** *"I used to clean toilets. I've cleaned more toilets than all of you combined."* |
| #8 | **Quote Cut 2:** Dishwasher terbaik Denny's | **Jensen Huang, Founder and CEO of NVIDIA** · Stanford Graduate School of Business | `https://www.youtube.com/watch?v=lXLBTBBil2U` | `06:24–06:29` | `[QUOTE-CUT-2]` `[DISHWASHER]` `[SUARA-ASLI]` | **Audio asli dipakai!** *"I was probably Denny's best dishwasher."* |
| #10 | Cerita awal booth Denny's (opsional cadangan) | **Jensen Huang, Founder and CEO of NVIDIA** · Stanford Graduate School of Business | `https://www.youtube.com/watch?v=lXLBTBBil2U` | `01:16–01:30` | `[DENNYS-1993]` `[FOUNDING-STORY]` | Cadangan visual/audio pendirian di Denny's |
| #9, #10 | 6 bulan pertama NVIDIA | **Jensen Huang-The First Six Months of NVIDIA** · Entrepreneurship.org | `https://www.youtube.com/watch?v=yU3GUHDf0mk` | `00:38–01:15` | `[NVIDIA-EARLY-DAYS]` `[RETRO-TALK]` | Klip arsip suasana awal pendirian 1993 |
| Cadangan | Dokumenter biografi ringkas (Taiwan 1963 → 1993) | **The Rise and Reckoning of Jensen Huang \| The Circuit with Emily Chang** · Bloomberg Originals | `https://www.youtube.com/watch?v=JW5s9Md4U2U` | `07:32–08:11` | `[ARCHIVAL-BIO]` `[TIMELINE-1963-1993]` | B-roll cadangan transisi karir AMD → LSI Logic |

### Perintah Unduh Cepat (`yt-dlp`)
```bash
mkdir -p footage
yt-dlp --download-sections "*0:10-0:20" -f "bv*[height<=1080]+ba/b" --force-keyframes-at-cuts -o "footage/ep01_keynote_%(section_start)s.%(ext)s" "https://www.youtube.com/watch?v=kDd24YOeqQQ"
yt-dlp --download-sections "*0:00-0:20" -f "bv*[height<=1080]+ba/b" --force-keyframes-at-cuts -o "footage/ep01_fortune_%(section_start)s.%(ext)s" "https://www.youtube.com/watch?v=UM5NP6MapmM"
yt-dlp --download-sections "*0:00-0:25" -f "bv*[height<=1080]+ba/b" --force-keyframes-at-cuts -o "footage/ep01_oneida_%(section_start)s.%(ext)s" "https://www.youtube.com/watch?v=gywBwbXkvlQ"
yt-dlp --download-sections "*30:38-30:46" --download-sections "*06:24-06:29" --download-sections "*01:16-01:30" -f "bv*[height<=1080]+ba/b" --force-keyframes-at-cuts -o "footage/ep01_stanford_%(section_start)s.%(ext)s" "https://www.youtube.com/watch?v=lXLBTBBil2U"
yt-dlp --download-sections "*0:38-1:15" -f "bv*[height<=1080]+ba/b" --force-keyframes-at-cuts -o "footage/ep01_first6mo_%(section_start)s.%(ext)s" "https://www.youtube.com/watch?v=yU3GUHDf0mk"
```

## 2. Artefak Jangkar & Gambar Statis
- **Artefak Jangkar:** Foto plakat booth NVIDIA di Denny's San Jose (NBC Bay Area / NVIDIA Blog 2023): `https://blogs.nvidia.com/blog/nvidia-dennys-trillion/`
- **Bio & Foto Resmi:** NVIDIA Board Bio (`https://www.nvidia.com/en-us/about-nvidia/board-of-directors/jensen-huang/`) & Stanford Engineering Heroes (`https://engineering.stanford.edu/about/history/heroes/2018-heroes/jensen-huang`).
- **Catatan:** Jangan ambil kutipan *"ample doses of pain and suffering"* dari `lXLBTBBil2U` (Stanford GSB 2024), karena kutipan itu berasal dari acara Stanford lain (SIEPR).
