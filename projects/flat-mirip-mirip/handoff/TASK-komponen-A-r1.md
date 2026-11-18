TUJUAN
Bangun komponen bersama tipografi + kanvas + efek + kartu slop untuk video flat-mirip-mirip, hanya dari token `remotion/src/bersama/tema.ts`, beserta papan still untuk dinilai Sutradara.

KONTEKS (folder kerja: projects/flat-mirip-mirip; Remotion 4.0.380 sudah terpasang di remotion/)
- Video esai 16:9 1920×1080 30 fps. Kanvas putih polos; teks muncul kata per kata saat diucapkan (waktu kata dari props, belum ada VO: pakai data contoh).
- Kontrak waktu: `type Kata = {t: string; mulai: number; selesai: number}` (detik relatif awal komposisi). Kelompok tampil = maks 3 kata (TEKS.maksKata); kelompok berikutnya MENGGANTI kelompok sebelumnya (hard cut, tanpa fade).
- Komponen yang diminta (semua di `remotion/src/bersama/`):
  1. `Fonts.tsx`: memuat Helvetica Neue (Roman 400, Medium 500, Bold 700) dari `remotion/public/fonts/` lewat staticFile + `delayRender` sampai font siap; build gagal bila font tak termuat. Salin file dari `~/fonts-lokal/helvetica-neue/` (HelveticaNeueRoman.otf, HelveticaNeueMedium.otf, HelveticaNeueBold.otf) ke `remotion/public/fonts/` dengan nama `helvetica-neue-*.otf` (sudah di-.gitignore; berlisensi lokal, jangan di-commit).
  2. `Kanvas.tsx`: latar MEREK.latar penuh + drift kamera halus opsional (prop `drift` 0–1; skala 1→1,02 sepanjang durasi, kurva `drift` dari src/lib/curves.ts).
  3. `KataKecil.tsx`: deretan kata di garis tengah (TEKS.garisY), ukuran HURUF.ukuran.narasi, bobot narasi, warna NETRAL.tinta (prop `diFootage` → NETRAL.putih + celahFootage), jarak antarkata TEKS.celahKanvas × lebar, offset vertikal deterministik per kata ±TEKS.goyangY (seed dari indeks). Kata muncul pada `mulai` dengan masuk 3–4 frame (mask naik/geser kecil, kurva `reveal`), bukan fade. Kelompok dirata tengah horizontal sebagai satu blok.
  4. `KataTekan.tsx`: satu kata HURUF.ukuran.tekan (bobot tekan), di garis tengah; warna prop (tinta atau primer).
  5. `KataRaksasa.tsx`: satu/dua kata merah MEREK.primer bobot raksasa; prop `lebar` (proporsi lebar frame, mis. 0.75) → fontSize dihitung agar lebar teks = lebar×1920 (ukur dengan measureText/@remotion/layout-utils); masuk per kata.
  6. `Invert.tsx`: membungkus children, pada frame `mulai` seluruh frame berbalik warna (CSS filter invert(1)) dalam 1 frame (hard), bisa kembali pada `selesai`.
  7. `Flash.tsx`: kilat putih 2 frame penuh lalu hilang (untuk klik kirim P04).
  8. `KartuSlop.tsx`: generator kartu konten "AI slop" SVG murni (tanpa PNG), rasio 4:5 dan 9:16, varian dari `seed`: latar krem PENGECUALIAN.slopKrem, lingkaran matahari slopPeach/slopMawar, 2–3 gunung slopGunung, siluet kepala-bahu slopSiluet, 2–3 garis teks kecil abu di kiri atas; ≥ 12 varian berbeda posisi/ukuran tetapi jelas "seragam". Prop `bagian` untuk P06 (tampilkan hanya lapisan tertentu: 'latar' | 'matahari' | 'gunung' | 'siluet' | 'teks').
  9. `Papan.tsx` + daftarkan komposisi `PapanA` (1920×1080, 150 frame) di file root baru `remotion/src/Root.tsx` yang mendaftarkan PinjamRoot lama + PapanA, dan ubah `remotion/src/index.ts` agar memakai Root baru. Papan menampilkan: KataKecil 3 kata di kanvas, KataTekan, KataRaksasa "sudah mengubah" lebar 0.75, Invert aktif, dan grid 12 KartuSlop.

KARTU (pekerja tidak membaca kartu; buka gambar frame kuncinya)
| Kartu | Yang diambil | Frame kunci |
|---|---|---|
| 86 Lumitris Tesla (kiblat) | kata kecil grotesk di garis tengah, jarak lebar, offset vertikal kecil; kartu terang bertulisan | claude/motion-graphic/guide/referensi/sheets/keyframes/86-k1-kata-kecil-footage.jpg, 86-k2-kartu-terang.jpg |
| 86 | penekanan satu kata ±2,3× | 86-k3-kata-besar-start.jpg |
| storyboard Irfan | merah ±75 % lebar + invert | media/acuan/ (lihat P03: "sudah mengubah" merah; "industri kreatif" cyan di hitam) |
| contoh slop | kartu krem, siluet, matahari, gunung pastel | storyboard P05/P09 + screenshot profil IG kiriman Irfan (gaya, bukan isi) |

LARANGAN
- Tidak menulis warna, font, atau ukuran di luar token tema.ts (cek tema_cek). Kurva dari src/lib/curves.ts, bukan Easing.ease/inOut.
- Tidak ada fade-in/blur-in sebagai cara masuk; tidak ada crossfade.
- Tidak ada PNG/JPG untuk grafik; SVG/JSX saja.
- Tidak ada vignette, gradien radial, grain.
- Maks 3 kata per tampil; tanda tanya ikut tampil.

FILE BOLEH
- projects/flat-mirip-mirip/remotion/src/bersama/** (kecuali tema.ts: jangan diubah)
- projects/flat-mirip-mirip/remotion/src/Root.tsx (baru), projects/flat-mirip-mirip/remotion/src/index.ts
- projects/flat-mirip-mirip/remotion/public/fonts/helvetica-neue-*.otf
- projects/flat-mirip-mirip/media/acuan/komponen/A-*.png
- projects/flat-mirip-mirip/handoff/REPORT-komponen-A-r1.md

FILE JANGAN
tema.ts; src/pinjam/**; src/bersama/ui-asli/** (milik TASK B); folder proyek lain; file skill di claude/.

LULUS BILA
- `npx tsc --noEmit -p .` di remotion/ lulus.
- `python3 claude/motion-graphic/scripts/juri/tema_cek.py projects/flat-mirip-mirip/remotion/src/bersama` tidak menandai file dari tugas ini (file ui-asli milik TASK B boleh belum ada).
- Still: `media/acuan/komponen/A-papan-f030.png`, `A-papan-f090.png`, `A-papan-f140.png` (npx remotion still), dan `A-slop-grid.png` (12 varian). Teks narasi terukur kapital ±54–58 px.

JANGAN
Commit, render video penuh, mengubah komponen pinjaman, menambah warna/token baru (bila butuh token baru: tulis di REPORT sebagai pertanyaan, jangan dibuat).

LAPORAN
REPORT-komponen-A-r1.md: daftar file, props tiap komponen (satu baris), hasil tsc + tema_cek, path still.
