TUJUAN
Buat komposisi uji perlakuan footage-sebagai-latar (D-14) untuk P11, P12, P14 dan render 3 still, supaya Sutradara bisa menyetujui papan acuan sebelum adegan dibangun.

KONTEKS
- Aturan D-14 (Irfan): footage nyata bukan POV utama; footage jadi LATAR, tipografi kata per kata yang dominan, seperti video Jensen Huang Behindwork (lihat `/tmp/claude-1000/-home-irfan-work/4940a6b7-bec5-59dd-ab2f-54ead03d408f/scratchpad/jensen.jpg`: footage gelap redup, teks putih di tengah, kata kunci beraksen, foto arsip dibingkai seperti kartu foto putih bertepi).
- Komponen sudah ada (pakai, jangan diubah): `remotion/src/bersama/` → `KataKecil` (prop `diFootage`), `KataTekan`, `KataRaksasa`, `KartuSlop`, `Kanvas`, `Fonts`, token `tema.ts` (pakai `NETRAL.putih`, `TURUNAN.primer.terang` #E8505A untuk kata kunci di footage, `HURUF`, `TEKS`, `BAYANGAN`, `RADIUS`). Kontrak waktu `Kata = {t, mulai, selesai}` (detik).
- Footage (media = symlink ke storage): `media/footage/F1/F1-a-mixkit-teh-pelanggan.mp4`, `media/footage/F2/F2-b-mixkit-potret-pria-rumah.mp4`, `media/footage/F3/F3-a-wikimedia-keluarga-brown-1910.jpg`. Agar terbaca `staticFile`, buat symlink `remotion/public/media` → `../../media` (sudah tercakup .gitignore? bila belum, tambahkan baris `remotion/public/media` ke `projects/flat-mirip-mirip/.gitignore`).
- Adegan:
  - P11 "Founder itu jualan kepercayaan," (1,6 dtk): F1-a layar penuh, digelapkan (overlay hitam 50 %) + saturasi 0,6, push pelan 1,00→1,04; KataKecil putih kata per kata: "Founder itu" lalu "jualan kepercayaan," dengan "kepercayaan," sebagai KataTekan berwarna TURUNAN.primer.terang.
  - P12 "dan kita seringkali lebih mudah ingat orangnya, bukan videonya." (3,6 dtk): F2-b layar penuh digelapkan 45 %, push pelan; kelompok KataKecil putih; pada "orangnya," KataRaksasa (prop lebar ±0,45, warna primer.terang bila komponen mendukung; bila KataRaksasa hanya MEREK.primer, laporkan dan pakai KataTekan primer.terang); "bukan videonya." kecil memudar ke NETRAL.redup bersama 3 KartuSlop kecil (±12 % lebar) di sisi kanan yang memudar 100→15 % (fade di sini disengaja: makna "lupa").
  - P14 "ceritamu," (1 dtk): latar F3-a digelapkan dan di-blur (latar), di tengah F3-a yang sama sebagai kartu foto (tepi putih 18 px, rotasi −3°, BAYANGAN.kartu, ±46 % lebar frame); KataKecil putih "ceritamu," di bawah kartu.
- Komposisi `PapanFootage` (1920×1080, 30 fps, 210 frame: P11 f0–47, P12 f48–155, P14 f156–209) di `remotion/src/uji/PapanFootage.tsx`, didaftarkan di `remotion/src/Root.tsx` (tambahkan satu baris Composition; jangan ubah yang lain).

KARTU
| Acuan | Yang diambil | Gambar |
|---|---|---|
| Jensen Behindwork v4 | footage gelap sebagai latar, teks putih dominan, kartu foto bertepi | scratchpad/jensen.jpg (di atas) |
| 86 kiblat | kata kecil di garis tengah, jarak lebar | claude/motion-graphic/guide/referensi/sheets/keyframes/86-k1-kata-kecil-footage.jpg |

LARANGAN
- Tidak menulis warna/ukuran/font baru di luar token tema.ts (warna overlay hitam boleh `rgba(0,0,0,a)`).
- Kurva gerak dari src/lib/curves.ts; tidak ada crossfade antar adegan (hard cut).
- Teks putih kontras ≥ 4,5:1 di atas footage (cek dengan sampel piksel area teks).
- Footage dipakai sebagai video/foto (OffthreadVideo / Img), tidak dikonversi.

FILE BOLEH
- projects/flat-mirip-mirip/remotion/src/uji/PapanFootage.tsx (baru)
- projects/flat-mirip-mirip/remotion/src/Root.tsx (tambah satu Composition)
- projects/flat-mirip-mirip/remotion/public/media (symlink)
- projects/flat-mirip-mirip/.gitignore (tambah satu baris bila perlu)
- projects/flat-mirip-mirip/media/acuan/komponen/D-*.png
- projects/flat-mirip-mirip/handoff/REPORT-papan-footage-r1.md

FILE JANGAN
src/bersama/** (komponen sudah lulus), tema.ts, pinjam/**, RootB/indexB/RootC/indexC, footage sumber, folder proyek lain.

LULUS BILA
- `npx tsc --noEmit -p .` lulus.
- Still `media/acuan/komponen/D-p11-f040.png`, `D-p12-f140.png`, `D-p14-f190.png` (entry src/index.ts, `npx remotion still`).
- REPORT: kontras teks terukur per still, file diubah.

JANGAN
Commit, render video penuh, mengubah komponen bersama (bila komponen kurang props, laporkan).

LAPORAN
REPORT-papan-footage-r1.md.
