# REPORT · papan-footage-r1

Papan uji D-14 selesai: komposisi `PapanFootage`, tiga still 1920×1080, dan pemeriksaan TypeScript lulus. Teks putih/awal fade pada ketiga still memenuhi 4,5:1. **Aksen merah belum memenuhi target kontras D-14 di `DECISIONS.md`: overlay 50%/45% masih menyisakan highlight di bawah huruf.** Papan ini diserahkan untuk penilaian Sutradara, belum dianggap sebagai persetujuan visual atau adegan produksi.

Pemeriksaan awal: `main` sama dengan `origin/main`, `tools/doctor.sh` lulus, profil Behindwork lulus. Acuan Jensen yang disebut TASK, frame kunci 86-k1, kartu 86, dan contoh gagal telah dibuka. Arah: footage sebagai latar, grotesk putih berjarak lebar, aksen hanya pada kata kunci; ENERGY 2 / RHYTHM 2 / MOTION 1.

| Still | Waktu papan | Hasil |
|---|---:|---|
| [D-p11-f040.png](../media/acuan/komponen/D-p11-f040.png) | 1,333 dtk | F1-a; hitam 50%, saturasi 0,6; “jualan” putih dan “kepercayaan,” aksen terang |
| [D-p12-f140.png](../media/acuan/komponen/D-p12-f140.png) | 4,667 dtk | F2-b; hitam 45%; “bukan videonya.” pada awal fade, tiga kartu kanan |
| [D-p14-f190.png](../media/acuan/komponen/D-p14-f190.png) | 6,333 dtk | F3-a sebagai latar blur dan kartu foto putih, “ceritamu,” di bawah |

Komposisi memakai 1920×1080, 30 fps, 210 frame. P11 f0–47, P12 f48–155, P14 f156–209; pergantian memakai `Sequence` tanpa overlap atau crossfade. Footage tetap MP4/JPG melalui `OffthreadVideo`/`Img`, tidak dibuat ulang sebagai aset hasil konversi. Kamera F1/F2 memakai `move(..., 'drift')` dari `src/lib/curves.ts`, skala 1,00→1,04 pada masing-masing rentang adegan.

## Komponen dan keputusan implementasi

- `KataRaksasa` tidak memiliki prop warna dan mengunci `MEREK.primer`. P12 memakai fallback `KataTekan` sesuai TASK. Lebar tinta “orangnya,” terukur 815,61 px, sekitar 42,5% frame; ukuran tetap token tekan 172 px.
- `KataTekan` juga hanya menerima `warna: 'tinta' | 'primer'`. Warna token `TURUNAN.primer.terang` diterapkan lewat selector CSS terbatas pada `[data-papan-footage] [data-aksen-footage]`. Sumber komponen tidak diubah. Selector terpisah pada pembungkus fade menginterpolasi `NETRAL.putih` menuju `NETRAL.redup`.
- Narasi memakai `KataKecil diFootage`, sehingga ukuran, font, bobot, dan celah tetap berasal dari komponen/token. `Kanvas` memuat `Fonts`; runtime mengonfirmasi Helvetica Neue 400/500/700 berstatus `loaded`.
- Fade P12 berlangsung f135–155 dengan kurva `leave`. Pada f126 kartu mulai 100%; f140 masih 97,7021% dan teks RGB(251,251,251); f155 kartu tepat 15% dan teks tepat `NETRAL.redup`, RGB(107,107,107). Fade ini menyampaikan “lupa”, sesuai TASK.
- Foto P14 memiliki lebar luar 883,2 px (46% frame), tepi putih 18 px dari `RADIUS.kartu`, rotasi −3°, dan `BAYANGAN.kartu`. Proporsi asli 1280×1025 dipertahankan. Latar memakai gambar yang sama, blur 18 px dari token dan overlay hitam 50%.
- TASK menyebut P14 “1 dtk”, tetapi f156–209 berisi 54 frame = 1,8 dtk. Rentang frame dan total 210 frame dijadikan acuan; kartu dan kata ditahan sampai f209. Waktu kata merupakan timing papan uji, belum sinkron terhadap VO yang dikunci.

## Kontras terukur

Pengukuran memakai render Chromium pada frame yang sama. Pada halaman QA sementara, tipografi disembunyikan dengan opacity 0 untuk memperoleh piksel latar tepat di bawah huruf; footage, kamera, dan overlay tetap. Selisih render berteks dan latar menghasilkan mask inti huruf dengan alpha ≥0,95; tepi antialias tidak dipakai. Semua piksel inti diukur, lalu nilai minimum dilaporkan. Rumus: sRGB dilinearkan, `L = 0,2126R + 0,7152G + 0,0722B`, lalu `(L_terang + 0,05) / (L_gelap + 0,05)`.

Ketiga PNG dari CLI dibandingkan dengan PNG yang dipakai untuk pengukuran: **0 piksel berbeda** untuk masing-masing still. Koordinat berikut berasal dari frame 1920×1080, titik (0,0) di kiri atas.

| Still / kata | RGB teks | Piksel inti | Sampel latar terburuk: posisi → RGB | Kontras minimum | Target teks putih ≥4,5:1 |
|---|---|---:|---|---:|---|
| P11 f040 / jualan | 255,255,255 | 3.720 | (1035,397) → 72,70,62 | **9,4545:1** | PASS |
| P12 f140 / bukan | 251,251,251 | 3.748 | (734,510) → 107,95,88 | **5,9636:1** | PASS, awal fade |
| P12 f140 / videonya. | 251,251,251 | 5.457 | (1226,568) → 82,75,62 | **8,3350:1** | PASS, awal fade |
| P14 f190 / ceritamu, | 255,255,255 | 5.192 | (856,861) → 31,31,31 | **16,4830:1** | PASS |

Temuan terpisah untuk Sutradara:

| Aksen | Sampel latar terburuk | Kontras minimum |
|---|---|---:|
| “kepercayaan,” RGB(232,80,90), f040 | (1235,512) → RGB(113,113,108) | **1,3377:1** |
| “orangnya,” RGB(232,80,90), f112, pemeriksaan tambahan | (950,571) → RGB(110,107,104) | **1,4438:1** |

Kedua aksen belum mencapai 4,5:1. Sampel tambahan f047 pada aksen P11 turun menjadi 1,2041:1. Overlay dan warna tetap mengikuti TASK; tidak ada penggelapan tambahan, kotak teks, atau perubahan komponen bersama. Sebelum adegan dibangun, Sutradara perlu menentukan perlakuan tambahan untuk highlight di bawah aksen. Ini tidak boleh dianggap sebagai kelulusan kontras aksen D-14.

Pada akhir fade yang disengaja, f155, teks redup memiliki kontras minimum 1,1304:1 (“bukan”) dan 1,3110:1 (“videonya.”). Angka tersebut dilaporkan sebagai efek “lupa”, bukan kelulusan teks putih. Pengujian ini mencakup still dan frame pemeriksaan yang disebut di bawah, bukan audit seluruh 210 frame.

## Validasi

Perintah dijalankan dari `projects/flat-mirip-mirip/remotion/`:

```bash
npx tsc --noEmit -p .
npx remotion still src/index.ts PapanFootage ../media/acuan/komponen/D-p11-f040.png --frame=40 --log=error
npx remotion still src/index.ts PapanFootage ../media/acuan/komponen/D-p12-f140.png --frame=140 --log=error
npx remotion still src/index.ts PapanFootage ../media/acuan/komponen/D-p14-f190.png --frame=190 --log=error
```

Semua perintah exit 0; TypeScript: `No errors found`. Ketiga PNG sudah dilihat. Pemeriksaan runtime tambahan pada f0,17,27,40,47,48,74,98,112,125,126,140,155,156,190,209 tidak menghasilkan log browser error/warning. Frame f47→48 dan f155→156 masing-masing hanya memuat adegan tujuan yang benar; kata dari adegan sebelumnya tidak tersisa. Akhir fade dan tahan P14 sampai f209 terkonfirmasi dari DOM.

Berkas QA sementara ada di `/tmp/papan-footage-qa/` (`metadata.json`, `contrast.json`, serta render/latar untuk pengukuran); skrip ukur di `/tmp/papan-footage-qa.cjs` dan `/tmp/papan-footage-contrast.py`. Tidak ada berkas QA tambahan di sumber proyek.

Pemeriksaan token: font dan ukuran teks lewat komponen bersama; celah, posisi teks, padding/tepi, radius, dan bayangan berasal dari token. Angka geometri 12%/46%, rotasi −3°, kamera 1,00→1,04, dan opacity mengikuti TASK; 1280×1025 adalah metadata foto. Warna literal baru hanya `rgba(0,0,0,a)` untuk overlay yang diizinkan. Tidak ada dekorasi atau teks narasi tambahan.

## Berkas hasil dan cakupan

| Berkas | Perubahan |
|---|---|
| `remotion/src/uji/PapanFootage.tsx` | Baru; tiga adegan papan uji dan pembungkus warna yang dibatasi ke papan |
| `remotion/src/Root.tsx` | Satu import dan satu baris `Composition`; baris lain tetap |
| `remotion/public/media` | Symlink baru → `../../media` |
| `media/acuan/komponen/D-p11-f040.png` | Still baru |
| `media/acuan/komponen/D-p12-f140.png` | Still baru |
| `media/acuan/komponen/D-p14-f190.png` | Still baru |
| `handoff/REPORT-papan-footage-r1.md` | Laporan ini |

`.gitignore` tidak perlu diubah: `git check-ignore -v` menunjukkan pola `media` pada baris 1 sudah mencakup `remotion/public/media`. Perbandingan SHA-256 terhadap snapshot 82 berkas sumber/font yang sudah ada sebelum pekerjaan menunjukkan hanya `Root.tsx` berubah; komponen bersama, `tema.ts`, kode pinjaman, serta entry/Root B dan C tetap. `git diff --check` lulus. Tidak ada commit, push, atau render video penuh.
