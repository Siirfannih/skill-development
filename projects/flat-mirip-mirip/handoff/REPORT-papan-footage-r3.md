# REPORT · papan-footage-r3

**Siap ditinjau.** P11/P12 mengikuti D-18, D-19, D-20: penekanan putih, teks P12 di kiri, footage di kanan, dan ketiga KartuSlop dihapus. QA teknis lolos: `tsc`, kontras tiga still yang diminta ≥ 4,5:1, jarak bbox kepala–teks P12 ≥ 40 px, serta P14 f190 **0 piksel berbeda** dari acuan ronde 1. Tidak ada commit, push, atau render video penuh.

| Still 1920×1080 | Kontras minimum seluruh teks pada still | Hasil |
|---|---:|---|
| [D3-p11-f040.png](../media/acuan/komponen/D3-p11-f040.png) | **5,2730:1** | Putih, overlay hitam 52% |
| [D3-p12-f100.png](../media/acuan/komponen/D3-p12-f100.png) | **4,5416:1** | “orangnya,” putih, pusat blok x 28% |
| [D3-p12-f140.png](../media/acuan/komponen/D3-p12-f140.png) | **4,9204:1** | “bukan videonya.” di kiri, awal memudar |
| [D3-p14-f190.png](../media/acuan/komponen/D3-p14-f190.png) | 16,4830:1 | Bukti render pembanding, identik dengan D-p14-f190.png |

## Implementasi dan sisa ronde 2

- **D-18 / P11 dan penekanan P12:** `KataTekan` hanya menerima `'tinta' | 'primer'`. Dipakai fallback yang diminta: wrapper lokal `TekanFootage` berisi `KataKecil diFootage`; putih berasal dari `NETRAL.putih`. Selector yang dibatasi ke wrapper menerapkan `HURUF.ukuran.tekan` = **172 px** dan `HURUF.bobot.tekan` = **700**. Lebar span dibuat `auto` agar pengukuran 76 px bawaan tidak menyisakan bbox yang salah setelah ukuran diperbesar. Offset acak luar span dinonaktifkan pada wrapper ini agar penekanan tetap pada garisnya seperti sebelumnya; reveal masuk bawaan tetap. Runtime mengonfirmasi 172 px/700/putih pada kedua kata penekanan. Komponen bersama tidak diubah.
- **D-18 / overlay P11:** gradien sisa ronde 2 (hitam 88,3% pada sebagian besar frame) dihapus. Overlay rata 50% dicoba kembali: f040 lolos, tetapi highlight di bawah “kepercayaan,” pada f047 menghasilkan **4,4157:1**. Overlay dinaikkan menjadi **52%**, dengan saturasi tetap 0,6; f047 menjadi **4,7422:1**. Seluruh teks P11 putih, tanpa aksen merah.
- **D-19 / P12:** crop sisa ronde 2 dipertahankan pada skala **1,38→1,42**, origin `50% 10%`, push dengan kurva `drift`. Geser kanan awal **345,6 px** (18% lebar); tambahan pan pelan **19,2 px** pada f100–125 menjaga jarak saat kepala bergerak ke kiri. Setelah itu geser kanan ditahan **364,8 px**. Teks memakai pusat blok **x 537,59 px (28%)**, celah `JARAK.l` = 64 px; overlay tetap 45%.
- **D-20 / P12:** import, ketiga instans `KartuSlop`, pembungkus fade kartu, dan perhitungan geometri kartu dihapus. Pemeriksaan DOM pada frame yang dirender menemukan **0 SVG dan 0 kartu** di P11/P12. Import dan selector aksen merah juga dihapus.
- “bukan videonya.” tetap memudar dari `NETRAL.putih` menuju `NETRAL.redup` memakai kurva `leave`, f135–155. Pada f140 warnanya RGB(251,251,251); f155 tepat RGB(107,107,107). Kontras rendah pada ujung fade adalah efek “lupa” yang diizinkan TASK, bukan klaim kelulusan teks baca biasa.

## Bbox kepala+wajah terhadap teks P12

Koordinat piksel pada 1920×1080, titik (0,0) kiri atas; format `(x0,y0)–(x1,y1)`. Bbox kepala+wajah ditandai **manual secara konservatif pada still terbaru**, mencakup rambut, kedua telinga, dan dagu, lalu dibulatkan keluar. Pusat kepala+wajah dihitung dari bbox ini, bukan landmark pupil. Bbox teks adalah gabungan `getBoundingClientRect()` semua kata yang terlihat, termasuk kotak tipografinya dan offset vertikal. Jarak = tepi kiri bbox kepala − tepi kanan bbox teks; rentang vertikalnya bertemu, jadi ini jarak minimum antarkotak.

| Frame / teks | Bbox kepala+wajah | Bbox teks | Pusat kepala+wajah x | Pusat blok teks x | Jarak minimum | Irisan |
|---|---|---|---:|---:|---:|---|
| **f100 / orangnya,** | (988,110)–(1686,1080) | (129,78;454,11)–(945,41;626,11) | **69,64%** | **28,00%** | **42,59 px** | 0 px² |
| f125 / orangnya, · kontrol akhir tahan | (992,104)–(1690,1080) | (129,78;454,00)–(945,41;626,00) | 69,84% | 28,00% | **46,59 px** | 0 px² |
| **f140 / bukan videonya.** | (968,106)–(1688,1080) | (228,23;491,51)–(846,95;590,71) | **69,17%** | **28,00%** | **121,05 px** | 0 px² |

Pada koordinat desimal tabel, titik koma memisahkan x dan y. Ketiga kotak kepala meliputi batas subjek yang terlihat dengan ruang tambahan; angka jarak menggunakan bbox konservatif tersebut, bukan hanya tinta huruf.

Crop tidak membuka tepi kosong. Bbox gambar P12 pada f100 adalah `(-37,50; -43,10)–(2648,70; 1467,89)`, pada f140 `(-36,78; -45,18)–(2686,38; 1486,60)`; keduanya menutup kanvas penuh. Sepanjang P12, skala ≥ 1,38 dan geser ≤ 19% lebar: overscan horizontal minimal `(1,38−1)/2 = 19%`, sehingga seluruh gerak tetap tercakup gambar. Origin vertikal dan skala juga menutup atas/bawah.

## Kontras per kata

Pada frame yang sama, Chromium ditangkap dua kali: render asli dan latar dengan tipografi disembunyikan hanya pada halaman QA sementara. Footage berupa frame statis `OffthreadVideo`, kamera dan overlay tetap. Mask inti huruf memakai alpha ≥ 0,95 dari selisih kedua gambar; tepi antialias dikecualikan. Semua piksel inti diukur dengan luminansi sRGB linear, `L = 0,2126R + 0,7152G + 0,0722B`, lalu `(L_terang+0,05)/(L_gelap+0,05)`. Minimum berikut berasal dari latar tepat di bawah huruf, bukan rata-rata frame.

| Still / kata | RGB teks | Piksel inti | Sampel latar terburuk: (x,y) → RGB | Kontras minimum |
|---|---|---:|---|---:|
| f040 / jualan | 255,255,255 | 3.720 | (1035,397) → 69,67,60 | **9,9003:1** |
| f040 / kepercayaan, | 255,255,255 | 52.638 | (1235,512) → 108,108,104 | **5,2730:1** |
| f100 / orangnya, | 255,255,255 | 39.017 | (352,582) → 120,118,112 | **4,5416:1** |
| f140 / bukan | 251,251,251 | 3.752 | (348,546) → 113,110,102 | **4,9204:1** |
| f140 / videonya. | 251,251,251 | 5.402 | (519,557) → 107,102,93 | **5,5090:1** |

Kontrol tambahan: P11 f047 “kepercayaan,” **4,7422:1**; P12 f112 “orangnya,” **4,6068:1**, f125 **4,6733:1**. Pada akhir fade f155: “bukan” **1,0005:1**, “videonya.” **1,0661:1**; ini dilaporkan sebagai efek menghilang yang disengaja. Pemeriksaan mencakup still dan frame kontrol yang disebut, bukan audit seluruh 210 frame.

## Verifikasi dan batas perubahan

`npx tsc --noEmit -p .` dijalankan dari `projects/flat-mirip-mirip/remotion/` setelah perubahan terakhir: **exit 0, `TypeScript: No errors found`**.

Still dirender melalui `@remotion/renderer` 4.0.380 (`renderStill`, Chromium), entry `src/index.ts`, komposisi `PapanFootage`, PNG 1920×1080, 30 fps, total komposisi tetap 210 frame. Frame kontrol: **40,47,48,74,98,100,112,125,140,155,156,190**; setelah overlay P11 menjadi 52%, hanya f40/f47 diulang, lalu f190 diperiksa kembali memakai bundle terbaru. Tidak ada browser error/warning; Helvetica Neue 400/500/700 berstatus `loaded`. PNG serahan disalin langsung dari keluaran renderer, tanpa pengolahan gambar.

Rentang `Sequence` dan seluruh waktu kata tetap: P11 f0–47, P12 f48–155, P14 f156–209. Hard cut tetap; metadata adegan pada f47/f48 dan f155/f156 sesuai batas tersebut.

P14 dibandingkan dalam **RGBA penuh 1920×1080**, tanpa resize atau toleransi, terhadap `D-p14-f190.png`: **0 dari 2.073.600 piksel berbeda, maksimum selisih kanal 0**. PNG acuan dan render terbaru juga identik byte; SHA-256 keduanya:

```text
b53c093384953361a1bd600245e6cc114335af56ea0272e79005c9759142e638
```

Blok sumber `const P14` identik dengan snapshot sebelum pekerjaan. Sumber yang ditulis sesi ini hanya `remotion/src/uji/PapanFootage.tsx`; hasil lain hanya empat `media/acuan/komponen/D3-*.png` di tabel dan laporan ini. `tema.ts`, `Root.tsx`, serta komponen bersama tidak diedit. Snapshot mendeteksi perubahan UjiB/UjiC selama pekerja lain aktif; keduanya tidak disentuh sesi ini. Ledger D-18–D-20 sudah tersedia; tidak ada penulisan ke ledger, TAHAP, skill, PETA, atau berkas proyek lain karena whitelist TASK.

Artefak QA sementara: `/tmp/papan-footage-r3-qa/` (`metadata.json`, `contrast.json`, `bbox.json`, `p14-identity.json`, snapshot sumber, render/latar). Skrip: `/tmp/papan-footage-r3-qa.cjs` dan `/tmp/papan-footage-r3-contrast.py`. `revisi_cek.py` memerlukan rencana lego dan `baseline_lock.py` memerlukan video; untuk papan still ini cakupan dicek lewat diff sumber dan kunci P14 dicek langsung pada piksel PNG dengan syarat yang lebih ketat.
