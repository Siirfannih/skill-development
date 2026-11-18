# REPORT komponen C r1

Komponen IG, bingkai iPhone, Premiere Pro, dan komposisi `UjiC` selesai dibangun. Pemeriksaan tipe dan render still lulus. **Kemiripan visual masih perlu dinilai Sutradara; hasil ini belum diklaim sama persis secara piksel.** Perbedaan yang terlihat dicatat di bawah.

## Artefak penilaian

| File | Isi | Ukuran |
|---|---|---|
| [C-ig-f000.png](../media/acuan/komponen/C-ig-f000.png) | iPhone, story, unggahan pertama, tab beranda aktif | 1920×1080 |
| [C-ig-f040.png](../media/acuan/komponen/C-ig-f040.png) | Feed sesudah scroll 1.028,677 pt; aksi, caption, dan unggahan berikutnya terlihat | 1920×1080 |
| [C-premiere-f070.png](../media/acuan/komponen/C-premiere-f070.png) | Premiere setelah klip V1 dibelah; playhead `00:00:15:19` | 1920×1080 |
| [C-sanding-ig.png](../media/acuan/komponen/C-sanding-ig.png) | Status bar dan tab bar acuan vs hasil, lebar layar masing-masing 393 pt | 874×356 |
| [C-sanding-premiere.png](../media/acuan/komponen/C-sanding-premiere.png) | Acuan vs hasil, masing-masing lebar 750 px | 1556×500 |

Sandingan IG memakai crop still f000 dengan transform balik skala iPhone 1,12, lalu membandingkannya dengan acuan pada skala `393/924`. Tinggi acuan menjadi 850,649 pt, bukan diregangkan ke 852; sisa paling bawah diisi putih. Bagian yang dibandingkan: status `y=0–54`, tab `y=767–852`. Sudut badan dan Dynamic Island masih terlihat pada crop hasil, karena berasal dari bingkai iPhone.

Avatar foto pada crop acuan IG dan foto isi monitor pada sanding Premiere ditutup di **lembar sanding saja**. Posisi dan piksel kontrol UI di sekitarnya dipertahankan. Komponen tidak memuat screenshot, foto, ataupun akun asli. Acuan sumber tidak diubah.

## Implementasi dan pemakaian

- [BerandaIG.tsx](../remotion/src/bersama/ui-asli/instagram/BerandaIG.tsx): SVG 393×852; `unggahan`, `scrollY`, dan `skala` sesuai kontrak. Header, status, dan tab tetap saat isi feed bergeser. Scroll dibatasi panjang feed agar tidak melewati konten terakhir.
- [ikon.tsx](../remotion/src/bersama/ui-asli/instagram/ikon.tsx): ikon beranda, Reels, DM/kirim, cari, hati, komentar, repost, simpan, tambah, titik tiga, sinyal, Wi-Fi, baterai, dan bulan. Stroke dasar 1,9 pt pada viewBox 24; ujung membulat. Reels mengikuti acuan baru tanpa garis clapperboard.
- [wordmark.tsx](../remotion/src/bersama/ui-asli/instagram/wordmark.tsx): satu path asli dari Commons; bukan teks font.
- [UnggahanIG.tsx](../remotion/src/bersama/ui-asli/instagram/UnggahanIG.tsx): ekspor `DataUnggahanIG`, `UnggahanIG`, dan tinggi kartu 694 pt. Media 393×491,25 pt, tepat 4:5. Caption dibatasi dua baris.
- [BingkaiIPhone.tsx](../remotion/src/bersama/ui-asli/instagram/BingkaiIPhone.tsx): badan SVG 419×878 dengan area layar 393×852, clip sudut, tombol samping, dan Dynamic Island.
- [PremierePro.tsx](../remotion/src/bersama/ui-asli/premiere/PremierePro.tsx): SVG 1920×1080; `program`, `source?`, `klip`, `playhead`, `skala?` sesuai kontrak. Pendukung: menu, Project/bins, timeline, monitor, ikon, warna, dan pemuat font.
- [UjiC.tsx](../remotion/src/bersama/ui-asli/UjiC.tsx), [RootC.tsx](../remotion/src/RootC.tsx), [indexC.ts](../remotion/src/indexC.ts): `UjiCRoot`, komposisi `UjiC`, 1920×1080, 30 fps, 90 frame. f0–44 IG; f45–89 Premiere.

Saat memakai bingkai, skala layar anak tetap 1:

```tsx
<BingkaiIPhone skala={1.12}>
  <BerandaIG unggahan={unggahan} scrollY={scrollY} skala={1} />
</BingkaiIPhone>
```

Slot `media`, `program`, dan `source` memakai `foreignObject` dengan wadah berposisi relatif, sehingga ReactNode berupa SVG maupun JSX/AbsoluteFill bisa mengikuti batas medianya. `MediaUji` hanya berisi persegi krem, lingkaran, dan siluet sesuai brief. Semua akun, angka interaksi, caption, bin, serta nama berkas dalam uji adalah data fiktif. Sutradara mengganti isi media dengan KartuSlop/footage.

Timeline menampilkan jendela waktu 0–24 detik; playhead di luar jendela dijepit di tepinya. Jalur tersedia V11–V1 dan A1–A18; V1–V3 dan A1–A3 diberi target biru. Klip di jalur yang tidak tersedia tidak digambar. Timecode memakai 30 fps. Source berhenti pada waktu contoh 9,5 detik. Komponen merupakan grafis untuk video, dengan perubahan dikendalikan props/frame Remotion.

## Bukti pemeriksaan

| Pemeriksaan | Hasil |
|---|---|
| `npx tsc --noEmit -p .` dari `remotion/` | PASS, exit 0, `TypeScript: No errors found` |
| Pemeriksaan khusus `src/indexC.ts` dan seluruh impor | PASS, exit 0; diperlukan karena `include` tsconfig proyek belum mencakup entry C |
| Remotion bundle `src/indexC.ts`, komposisi `UjiC` | PASS: 1920×1080, 30 fps, 90 frame |
| Render final still f0, f40, f70 melalui renderer Remotion 4.0.380/Chromium | PASS; 0 pesan console browser, termasuk warning/error |
| Batas perpindahan f44/f45, akhir f89, dan potongan f63/f64 | Still tambahan diperiksa di `/tmp`; pergantian IG ke Premiere dan pembelahan V1 terlihat |
| UI tetap saat scroll | Perbandingan piksel f0 vs f40 pada area status/header dan tab menghasilkan **0 piksel berbeda** |
| Integritas wordmark | PASS: string `d` JSX sama persis dengan satu path SVG unduhan Commons |
| Raster di komponen | PASS: audit 20 berkas sumber C menemukan 0 elemen `img`/`image` dan 0 referensi PNG/JPG/WebP |
| Warna UI | PASS: warna aplikasi berada di folder `instagram/` dan `premiere/`; `UjiC` hanya menetapkan kanvas `#FFFFFF` |
| Kebersihan tipe | PASS: 0 `@ts-ignore`, `@ts-nocheck`, atau `eslint-disable` dalam berkas C |

Perintah pemeriksaan khusus:

```bash
npx tsc --noEmit --target ES2020 --module ES2020 \
  --moduleResolution bundler --jsx react-jsx --strict \
  --skipLibCheck --esModuleInterop --lib DOM,ES2020 src/indexC.ts
```

Still dapat dirender ulang dari `remotion/`:

```bash
npx remotion still src/indexC.ts UjiC ../media/acuan/komponen/C-ig-f000.png --frame=0 --image-format=png
npx remotion still src/indexC.ts UjiC ../media/acuan/komponen/C-ig-f040.png --frame=40 --image-format=png
npx remotion still src/indexC.ts UjiC ../media/acuan/komponen/C-premiere-f070.png --frame=70 --image-format=png
```

Scroll memakai `move(frame, 0, 44, 'leave')` dari `src/lib/curves.ts`, dikalikan 1.600. Hasil hitung: f0 = 0; f10 = 35,337; f20 = 160,840; f30 = 431,357; f40 = 1.028,677; f44 = 1.600 pt. Kurva mempercepat scroll menuju akhir. Premiere memakai waktu pemutaran nyata `14.8 + (frame - 45) / 30`; f64 membelah `Komposisi 02` di V1 pada 15,4 detik. Garis potong dan playhead adalah dua elemen terpisah.

## Perbedaan IG yang masih terlihat

| Elemen | Perbedaan / batas verifikasi |
|---|---|
| Halaman | Acuan utama adalah Cari, bukan beranda. Header beranda, story, dan susunan feed mengikuti brief serta struktur IG; belum terverifikasi terhadap screenshot beranda pada build iOS yang sama. Navigasi Reels/DM baru konsisten dengan [pengumuman Meta 2025](https://about.fb.com/news/2025/09/in-india-instagram-debuts-a-reels-first-experience-for-its-mobile-app/). |
| Status bar | Jam, bulan, empat indikator sinyal abu, Wi-Fi, dan baterai mengikuti posisi acuan. Bobot huruf, kurva simbol, dan level isi baterai masih perkiraan vektor; bukan salinan path SF Symbols. |
| Font | SF Pro **Display** lokal dimuat eksplisit; tampilan iOS pada ukuran kecil bisa memakai metrik SF Pro Text. Tracking dan panjang teks karenanya belum identik. |
| Wordmark/header | Path berasal dari `Instagram logo.svg`; berkas alternatif wordmark 2022 tidak bisa diunduh. Ukuran 123×35,5 pt dan posisi tengah dipilih untuk header dengan tambah kiri/hati kanan dari brief. Ukuran dan posisi ini belum punya acuan beranda langsung. |
| Story | Gradien lima stop mendekati ring IG, belum merupakan salinan definisi gradien aplikasi. Semua avatar ilustrasi vektor fiktif; tidak mereplikasi foto acuan. Nama panjang dipotong. |
| Unggahan | Media sudah 4:5, ikon/angka, likes, caption dua baris, dan waktu tersedia. Jarak vertikal serta bentuk hati, komentar, repost, dan bookmark belum dapat disandingkan dengan halaman feed acuan. Angka komentar/repost/kirim dan waktu masih data contoh tetap. |
| Tab bar | Urutan dan pusat ikon mengikuti acuan. Home sengaja terisi karena beranda aktif; di halaman Cari acuan Home berupa outline. Ketebalan Cari, radius kotak Reels, dan lengkungan DM masih berbeda sedikit. Avatar profil sengaja diganti vektor generik. |
| Bingkai | Badan, tombol, radius layar, dan Dynamic Island merupakan rekonstruksi bentuk umum iPhone. Tidak ada foto perangkat pembanding; ukuran fisik satu model belum dibuktikan. Dynamic Island dan sudut hitam tidak muncul pada screenshot Cari yang direkam sistem. |

## Perbedaan Premiere yang masih terlihat

| Elemen | Perbedaan / batas verifikasi |
|---|---|
| Proporsi panel | Project hasil 13,23% lebar vs acuan sekitar 13,1%; Timeline hasil 56,77% vs sekitar 56,9%; monitor 26,04% vs sekitar 26,1%. Celah dan pembatas panel masih berbeda beberapa piksel pada sanding 750 px. |
| Tema | Panel ditetapkan `#2D2D2D`, mendekati piksel dominan acuan 44–46 per kanal. Menu macOS `#E9D5E8` mengikuti warna tint acuan. Variasi antarpanel dan kompresi gambar acuan belum direplikasi. |
| Font | Source Sans 3 adalah pengganti yang diminta; lebar huruf, baseline, dan kepadatan label berbeda dari Adobe Clean. Render vektor juga lebih tajam daripada acuan 750 px yang buram. |
| Menu/workspace | Semua label menu yang diminta dan Import/Edit/Export tersedia. Spasi menu, judul proyek, ikon sistem, serta tombol sudut kanan bukan salinan per piksel; judul/data proyek diganti fiktif. |
| Project/bins | Dua panel kiri dan daftar bin/file mengikuti susunan acuan. Kedalaman folder, jumlah baris, selection, ikon file, dan lebar scrollbar belum identik. |
| Timeline | 29 jalur dipakai untuk kepadatan yang mendekati acuan. Jumlah, urutan, dan tinggi jalur tidak identik dengan screenshot. Track V1–V3 dan A1–A3 serta kunci/mata/M/S tersedia. |
| Klip/audio | Klip ungu-pink dan audio hijau dengan waveform tersedia. Jumlah, potongan, posisi, label fx, envelope, dan bentuk waveform berbeda: semuanya berasal dari data uji, bukan isi proyek acuan. Waveform digambar deterministik, tidak berasal dari audio nyata. |
| Playhead/timecode | Biru dan format timecode mengikuti UI. Angka waktu contoh berbeda dari acuan; ruler memakai jendela 24 detik. Garis dan kepala playhead digambar ulang, sehingga bentuk/detailnya belum identik. |
| Monitor | Gambar Program dan Source memakai viewport 468×347 di susunan kanan atas/bawah, mendekati rasio acuan. Konten SVG uji sengaja berbeda. Label timecode, zoom/resolusi, transport, dan slider menyederhanakan beberapa kontrol kecil acuan. |
| Audio meter/footer | Meter dan tick digambar ulang dengan nilai contoh tetap; tidak mengikuti suara. Ikon/angka mikro dan status footer belum sama persis. |

## Sumber wordmark dan font

**Wordmark:** [Wikimedia Commons, File:Instagram logo.svg](https://commons.wikimedia.org/wiki/File:Instagram_logo.svg), berkas [SVG asli](https://upload.wikimedia.org/wikipedia/commons/2/2a/Instagram_logo.svg). Ditemukan lewat API `commons.wikimedia.org/w/api.php` (`generator=search`, lalu `prop=imageinfo`). User-Agent aplikasi generik: `VectorUIReconstruction/1.0 (generic application; SVG asset import)`, tanpa data pribadi. Metadata Commons menyatakan public domain dan mencantumkan Instagram sebagai pembuat.

SVG asli berukuran 840×300, berisi satu path. `d` disalin utuh; viewBox dipersempit ke batas path `23.9983 48.3202 792.0034 224.6730`, dan fill mengikuti tinta IG. Alternatif `Instagram_2022_wordmark.svg` ditemukan melalui API, tetapi server unduhnya mengembalikan HTTP 429; tidak diganti dengan teks font biasa.

**Premiere:** [repo resmi Adobe Source Sans 3](https://github.com/adobe-fonts/source-sans), [Regular OTF](https://raw.githubusercontent.com/adobe-fonts/source-sans/release/OTF/SourceSans3-Regular.otf), [Semibold OTF](https://raw.githubusercontent.com/adobe-fonts/source-sans/release/OTF/SourceSans3-Semibold.otf), dan [OFL](https://github.com/adobe-fonts/source-sans/blob/release/LICENSE.md). Disimpan sebagai `public/fonts/source-sans-3-regular.otf`, `source-sans-3-semibold.otf`, serta `source-sans-3-LICENSE.md`. Dimuat memakai `FontFace` + `delayRender`/`continueRender`; kegagalan font membatalkan render.

**IG:** subset Latin regular/medium/bold dari font berlisensi lokal `~/fonts-lokal/sf-pro-display/SFPRODISPLAY*.OTF`, disematkan sebagai WOFF2 dalam `instagram/sf-pro-data.ts`. Tidak bergantung pada ketersediaan nama font sistem Chromium. Lisensi font tetap dibawa di tabel font subset; aset lokal ini tidak di-commit.

Checksum SHA-256:

```text
Wordmark SVG   aeb916a631a4812a400156c1f607688bdef7acb95108a124cdb22eb5f6df3a60
Source Regular 08df266400933d3178d081a45f94a08814c3e55b4b7dd2e0ff69cb1329f13ab6
Source Semibold 36f1cd2c344aa3109e64429bce41a41e4b2b923beb2db19b8dbf9bb56f05a4f9
```

## Cakupan dan cek akhir

Design read: rekonstruksi UI asli untuk aset video; ENERGY 1 / RHYTHM 1 / MOTION 3 pada scroll uji. Bentuk, palet, gradien, kepadatan, dan font dipilih untuk mengikuti aplikasi/acuan. Media geometri serta pengulangan isi datang langsung dari brief uji.

PASS: komposisi dan dimensi, SVG/JSX tanpa raster, sumber wordmark, pemuatan font eksplisit, kurva scroll, tipe, render browser, dan sanding tersedia. Kontrol adalah grafis SVG, sehingga uji klik, keyboard, loading jaringan aplikasi, dan breakpoint halaman web tidak berlaku. Kesetiaan visual dicatat per elemen di atas dan tetap menjadi penilaian Sutradara.

Perubahan hanya di subtree Instagram/Premiere, entry C, font berawalan `source-sans-3-`, lima PNG `C-*`, dan REPORT ini. Tidak ada commit, push, render MP4 penuh, atau perubahan file pekerja lain/skill/tema/root utama. PETA dan antrean proyek tidak diubah karena berada di luar daftar FILE BOLEH. Laporan sesi disimpan pada berkas yang diminta ini; pelaporan ops-report yang menghasilkan commit/push tidak dijalankan dalam batas tugas tanpa commit.

Token: total pemakaian tidak diekspos sesi ini; tidak diestimasi sebagai hasil ukur.
