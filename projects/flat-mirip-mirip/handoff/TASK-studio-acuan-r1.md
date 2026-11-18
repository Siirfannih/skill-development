TUJUAN
Ambil screenshot acuan Remotion Studio ASLI (bukan rekonstruksi) dari proyek ini, untuk acuan membangun ulang UI Remotion Studio sama persis.

KONTEKS
Proyek Remotion: projects/flat-mirip-mirip/remotion (entry src/index.ts, node_modules sudah terpasang, Remotion 4.0.380). Komposisi tersedia: Karakter, DuniaRepo, Slop, AppClaude, DuniaIG, LembarPixel. Playwright + Chromium sudah terpasang di mesin (require('playwright') jalan; chromium.launch() tanpa opsi).
Acuan gaya tampilan Studio yang ingin dicapai: panel kiri daftar komposisi, preview di tengah, panel Props/Renders kanan, timeline bawah berisi beberapa <Sequence> dan satu track audio bila ada.

FILE BOLEH
- projects/flat-mirip-mirip/media/acuan/U4-remotion-studio-*.png
- projects/flat-mirip-mirip/handoff/REPORT-studio-acuan-r1.md
- file skrip sementara di /tmp/claude-1000/ (hapus setelah selesai)

FILE JANGAN
Semua file di projects/flat-mirip-mirip/remotion/ (jangan ubah kode atau package), folder proyek lain, repo lain.

LANGKAH
1. Jalankan `npx remotion studio src/index.ts --port 3123 --no-open` dari folder remotion di latar belakang.
2. Dengan Playwright (viewport 1920x1080, deviceScaleFactor 2), buka komposisi DuniaRepo, tunggu preview tergambar, simpan: U4-remotion-studio-utuh.png (seluruh jendela), U4-remotion-studio-timeline.png (crop timeline bawah), U4-remotion-studio-kiri.png (panel kiri), U4-remotion-studio-preview.png (area preview + kontrol). Ulangi satu screenshot dengan playhead di tengah durasi: U4-remotion-studio-playhead.png.
3. Catat di REPORT: warna latar tiap panel (hex, diambil dari piksel), font yang dipakai (dari computed style), tinggi baris timeline, lebar panel kiri/kanan (px @1x).
4. Matikan server Studio (pastikan port 3123 bebas).

LULUS BILA
5 PNG ada (lebar 3840), REPORT berisi tabel ukuran/warna/font, tidak ada proses studio yang tertinggal (`pgrep -af "remotion studio"` kosong).

JANGAN
Commit, ubah kode, render video.

LAPORAN
REPORT-studio-acuan-r1.md.
