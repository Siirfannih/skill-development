# REPORT · adegan W1 · r2

**P02 r2 siap ditinjau. QA teknis lolos.** Clawd kini tajam dengan tinggi siluet 17,39–17,47% frame, memegang kepala playhead yang bergeser 62,98 px. “Claude” putih berada di luar video preview Jensen, dengan kontras 15,66:1. P01/P03/P13/P15 dan 43 PNG r1 tetap identik terhadap hash awal sesi.

## Cakupan revisi

Instruksi sesi membatasi penulisan ke P02, helper W1 yang hanya dipakai P02, PNG `P02-r2-*`, dan laporan ini. Ledger revisi dicatat di sini; DECISIONS, TAHAP, PETA, komponen bersama, dan berkas pekerja lain tidak ditulis.

| Butir | Instruksi | Perubahan yang diizinkan |
|---|---|---|
| W1-1 | “Pindahkan \"Claude\" ke ruang kosong DI LUAR preview video” | Posisi dan skala lokal KataTekan pada pita gelap antara preview dan kontrol timeline; putih dari NETRAL.putih. Kata terbaca sejak onset karena adegan hanya 12 frame. |
| W1-2 | “Clawd diperbesar sampai tinggi badan ±16–20 % tinggi frame” dan “playhead bergeser sedikit selama adegan” | Kamera punch-in sekitar 1,6×; Clawd pose samping memegang playhead, membesar dan tetap tajam; tarikan mengikuti durasi kata. |
| D-17 | Preview editor memakai video yang sudah jadi. | Video Jensen yang sama tetap diputar dan frame medianya mengikuti playhead. |

P01, P03, P13, P15 beserta still r1 menjadi pembanding SHA-256 dari awal sesi. Basis kode/PNG yang belum masuk commit dikunci melalui hash, tanpa membuat berkas QC di luar daftar yang diizinkan.

## Arah visual

P02 memperagakan Clawd bekerja pada timeline editor untuk penonton video Behindwork, dengan UI Studio asli dan grotesk putih dari tema. ENERGY 2 / RHYTHM 2 / MOTION 2: satu aksi menarik playhead, kamera dekat, nama di whitespace yang terpisah dari video. Skala dipilih supaya siluet Clawd cepat dikenali; putih dipilih untuk kontras di panel gelap; kamera dekat mengutamakan tangan dan playhead. Kiblat: RESEP + kartu 86 k3/k7; brief revisi menentukan penempatan nama.

## Pemeriksaan awal

- `git fetch origin`: HEAD dan origin/main sama, f2851a8 saat pemeriksaan.
- `./tools/doctor.sh`: LULUS, termasuk PETA terbaru; tidak menjalankan --fix atau menulis PETA.
- `profil_cek.py /home/irfan/work/data-video/merek/behindwork`: LULUS.
- Branch remote dengan perubahan claude/ di luar main telah dilaporkan; aturan yang dipakai tetap main.

## Bukti hasil

Semua still berikut 1920×1080 dan sudah dibuka sendiri pada ukuran penuh. Rentang adegan tetap 12 frame / 0,4 dtk, mengikuti NASKAH sementara.

| Still | Yang terlihat dan kesesuaian brief |
|---|---|
| [P02-r2-f000.png](../media/acuan/adegan/P02-r2-f000.png) | Awal: Clawd samping sudah utuh dan tajam di atas track, tangan menyentuh kepala playhead. “Claude” langsung lengkap pada pita panel gelap, terpisah dari caption di video Jensen. Preview = frame sumber 195. |
| [P02-r2-f005.png](../media/acuan/adegan/P02-r2-f005.png) | Tengah: badan dan mata Clawd terbaca; tangan tetap menggenggam saat playhead bergerak ke kanan. Nama tidak menimpa karakter atau video. Preview = frame sumber 200. |
| [P02-r2-f011.png](../media/acuan/adegan/P02-r2-f011.png) | Akhir: Clawd masih utuh dengan kaki menyentuh track, genggaman tetap bertemu kepala playhead. Nama tetap pada whitespace yang sama; caption sumber berubah menjadi “it to you” di dalam preview. Preview = frame sumber 206. |
| [P02-r2-sequence-f005.png](../media/acuan/adegan/P02-r2-sequence-f005.png) | Pembanding pada f161 komposisi W1Sequence (= f005 lokal P02): tampilan identik dengan still tengah standalone, 0 piksel RGB berbeda. |

Pembanding revisi: [P02-f005 r1](../media/acuan/adegan/P02-f005.png) → [P02-r2-f005](../media/acuan/adegan/P02-r2-f005.png).

### Ukuran hasil render

Diukur di DOM Chromium saat render, kemudian buffer PNG dicocokkan dengan berkas still: **3/3 identik byte per byte**. Tinggi siluet memakai `getBBox()` grup badan Clawd dan matriks SVG ke layar, bukan ukuran kotak SVG yang mengandung ruang kosong.

| Ukuran | f000 | f005 | f011 |
|---|---:|---:|---:|
| Zoom kamera | 1,600× | 1,603× | 1,608× |
| Tinggi siluet Clawd | 187,77 px (17,39%) | 188,17 px (17,42%) | 188,71 px (17,47%) |
| X playhead di frame | 877,26 px | 905,82 px | 940,23 px |
| Selisih pusat genggaman–kepala playhead, horizontal | 0,84 px | 0,84 px | 0,84 px |
| Kotak tinta “Claude”, termasuk antialias, x/y/lebar/tinggi | 997 / 722 / 400 / 92 px | 998 / 722 / 400 / 92 px | 998 / 723 / 402 / 92 px |
| Batas bawah preview video | 718,27 px | 718,64 px | 719,16 px |

Tinta kata, termasuk antialias, berada sedikitnya 3,36 px di bawah preview pada ketiga still; tidak ada irisan dengan isi video. Putih #FFFFFF pada panel Studio #1F2428 menghasilkan 15,66:1. Piksel panel asli terdeteksi di celah huruf; bukan kotak latar tambahan. Clawd berakhir paling rendah di y1016,40, menyisakan 63,60 px ke tepi bawah (melampaui margin 5% H). Huruf Helvetica Neue terkonfirmasi termuat, kata visible dan tanpa clip sejak f000. Kotak tangan dan kepala playhead beririsan vertikal pada ketiga still.

### Implementasi dan gerbang

Hanya [P02.tsx](../remotion/src/adegan/P02.tsx) diubah. Kamera berfokus pada tengah rentang tarikan; posisi label dan lantai track dihitung dari geometri STUDIO yang sudah ada. Skala lokal KataTekan 0,44 menjaga tulisan muat dalam pita kosong. Override putih dan pembukaan kata langsung dibatasi selector `data-w1-p02`; komponen bersama tetap utuh. Blur lama dihapus karena tarikan sekarang pendek, agar karakter terbaca dalam 0,4 dtk. Gerak playhead memakai kurva heavy sepanjang onset→selesai kata; drift kamera memakai durasi adegan. Frame media 195→206 mengikuti playhead melalui Sequence lokal yang sama dengan r1.

| Pemeriksaan | Hasil |
|---|---|
| `npx tsc --noEmit -p .` dari remotion/ | **PASS**, exit 0. |
| Compiler API dengan tsconfig yang sama + entry src/index-w1.ts | **PASS**, exit 0; mencakup folder adegan yang belum tercantum dalam include tsconfig. |
| `python3 claude/motion-graphic/scripts/juri/motion_lint.py projects/flat-mirip-mirip/remotion/src/adegan` | **PASS**, exit 0. |
| `python3 claude/motion-graphic/scripts/juri/tema_cek.py projects/flat-mirip-mirip/remotion/src` | **P02/W1: 0 temuan.** Exit keseluruhan src = 1 karena berkas di luar cakupan; tidak dilaporkan sebagai PASS global. |
| Render PNG awal/tengah/akhir dengan entry W1, concurrency 1 | **PASS**, 3/3 keluaran PNG utuh pada resolusi penuh. |
| Pengukuran DOM dan kecocokan buffer PNG | **PASS**, tinggi Clawd di rentang 16–20%; genggaman melekat; font termuat; 3/3 buffer identik dengan still tersimpan. |
| Kontras dan irisan kata–preview | **PASS**, 15,66:1; seluruh tinta kata berada di luar preview. |
| Standalone vs Sequence pada offset master | **PASS**, 0 piksel RGB berbeda pada f005 lokal / f161 master. |

Perintah render ulang dari remotion/:

```bash
TMPDIR=/mnt/ssd-win/p02-r2.JmcJ6g npx remotion still src/index-w1.ts P02 ../media/acuan/adegan/P02-r2-f005.png --frame=5 --image-format=png --concurrency=1
```

### Integritas adegan yang sudah lulus

SHA-256 setiap berkas dibandingkan dengan snapshot awal sesi, termasuk PNG yang sudah ada. Tidak merender ulang atau menimpa still r1.

| Adegan | File sumber | PNG r1, termasuk lembar/pembanding Sequence | Hasil |
|---|---:|---:|---|
| P01 | 1 | 19 | Identik SHA-256 |
| P03 | 1 | 9 | Identik SHA-256 |
| P13 | 1 | 10 | Identik SHA-256 |
| P15 | 1 | 5 | Identik SHA-256 |

`w1-waktu.tsx` dan `uji-w1.tsx` juga identik. Sebanyak 85 berkas src di luar folder adegan (termasuk komponen bersama, tema, naskah, entry, Root, dan lib) tetap identik. Lima PNG P02 r1 juga identik. Perubahan P06/W3 dan still P08/P09 dari pekerjaan paralel terlihat pada perbandingan workspace; tidak disentuh atau dipulihkan oleh tugas ini.

### Delivery Gate visual dalam cakupan video

- **Hard Gate PASS:** tinta kata di luar preview, kontras 15,66:1, karakter dan teks berada di area aman; memakai aset dan isi UI yang sudah diizinkan brief.
- **Purpose Gate PASS:** zoom memperjelas aksi edit, putih menjaga kontras, satu tarikan menunjukkan Clawd bekerja; tanpa efek dekoratif baru.
- **Liveliness PASS:** ENERGY 2 / RHYTHM 2 / MOTION 2; aksi tangan/playhead menjadi pasangan fokus dengan kata, kamera tetap drift, whitespace panel memisahkan narasi dari caption video.
- **Craftsmanship PASS dalam cakupan:** still dilihat penuh; ukuran, genggaman, font, pemutaran media, dan PNG diverifikasi lewat render aktual. Pengujian navigasi/keyboard tidak berlaku pada adegan video ini.

Tidak ada commit, render video penuh, perubahan audio, atau pembaruan PETA. Keputusan visual akhir tetap pada Sutradara. Waktu masih sementara; sinkron VO final dan tempo pemutaran akhir tidak diklaim dalam tugas still ini. Token sesi tidak tersedia dari runtime dan tidak diestimasi.
