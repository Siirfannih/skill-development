# Acuan Remotion Studio asli · r1

Laporan dibuat: 18 November 2026, 23:09 WITA.

Lima PNG diambil dari Remotion Studio **4.0.380** yang menjalankan `remotion/src/index.ts`, komposisi **DuniaRepo**, pada `http://localhost:3123/DuniaRepo`. Gambar utuh dan playhead adalah screenshot browser langsung. Tiga crop menyalin piksel dari gambar utuh, tanpa mengubah ukuran atau menggambar ulang UI.

Viewport **1920 × 1080 CSS px**, `deviceScaleFactor: 2`, browser zoom 100%, preview Fit, playback 1×, timeline zoom 1×. Browser: Chromium **134.0.6998.35** bawaan paket Remotion; otomasi: Playwright **1.65.1**. Panel kiri dan kanan ditampilkan; tab Compositions dan Props aktif.

## Berkas

Empat gambar pertama berada pada frame 0. Gambar playhead berada pada **frame 48 / 96**, yaitu **1,6 / 3,2 detik** pada 30 fps. Timecode Studio pada gambar playhead adalah `00:01.18` (detik.frame). Angka timer di dalam adegan preview merupakan isi video, terpisah dari timecode Studio.

| PNG | Ukuran berkas gambar (px @2×) | Isi |
|---|---:|---|
| [U4-remotion-studio-utuh.png](../media/acuan/U4-remotion-studio-utuh.png) | 3840 × 2160 | Seluruh viewport Studio |
| [U4-remotion-studio-timeline.png](../media/acuan/U4-remotion-studio-timeline.png) | 3840 × 527 | Timeline bawah, termasuk pemisah atas |
| [U4-remotion-studio-kiri.png](../media/acuan/U4-remotion-studio-kiri.png) | 3840 × 1449 | Panel Compositions/Assets + daftar komposisi |
| [U4-remotion-studio-preview.png](../media/acuan/U4-remotion-studio-preview.png) | 3840 × 1561 | Preview tengah + bagian kontrol di bawahnya |
| [U4-remotion-studio-playhead.png](../media/acuan/U4-remotion-studio-playhead.png) | 3840 × 2160 | Seluruh viewport; playhead frame 48 |

**Ukuran crop:** untuk memenuhi syarat semua PNG berlebar 3840 px, crop kiri dan preview diletakkan di kiri kanvas transparan selebar 3840 px. Piksel UI tetap pada skala asli 2×; ruang transparan bukan bagian UI. Seluruh viewport Studio tetap terlihat pada `utuh` dan `playhead`. Batas crop dibulatkan keluar ke piksel fisik utuh karena layout browser memakai pecahan CSS px.

| Crop | Kotak sumber di PNG utuh: x, y, lebar, tinggi (@2×) | Ruang transparan kanan |
|---|---|---:|
| timeline | `0, 1633, 3840, 527` | 0 px |
| kiri | `0, 73, 767, 1449` | 3073 px |
| preview | `772, 73, 2144, 1561` | 1696 px |

## Ukuran UI

Semua angka berikut adalah **CSS px @1×**, diukur memakai `getBoundingClientRect()` setelah `document.fonts.ready` dan dua animation frame. Titik asal adalah kiri atas viewport, sebelum crop. Ukuran panel mengikuti keadaan screenshot ini; panel Studio dapat diubah lebarnya oleh pengguna.

| Elemen | x | y | Lebar | Tinggi |
|---|---:|---:|---:|---:|
| Menu atas, termasuk border bawah | 0 | 0 | 1920 | 36.5 |
| Panel kiri | 0 | 36.5 | 383.40625 | 724.375 |
| Area preview tengah | 386.40625 | 36.5 | 1071.421875 | 724.375 |
| Panel kanan Props/Renders | 1460.828125 | 36.5 | 459.171875 | 724.375 |
| Bar kontrol global | 0 | 760.875 | 1920 | 56 |
| Timeline, tanpa pemisah atas | 0 | 819.875 | 1920 | 260.125 |
| Satu baris label track Sequence | 0 | 858.875 | 383.40625 | 26 |
| Header timecode/penggaris timeline | 0 | 819.875 | 1920 | 39 |
| Tab Compositions/Assets dan Props/Renders | sesuai panel | 36.5 | setengah panel | 40 |
| Satu item daftar komposisi | 0 | 189.5 untuk DuniaRepo | 383.40625 | 32 |

Pemisah vertikal antarpanel selebar **3 px**. Pemisah horizontal di atas timeline juga **3 px**, mulai y = 816.875. Tinggi baris timeline **26 px**, termasuk border bawah 1 px; batasnya y = 858.875 sampai 884.875. Jarak awal baris komposisi berurutan adalah 33 px (item 32 px + jarak 1 px).

## Warna dari piksel screenshot

Nilai HEX berikut dibaca dari raster `U4-remotion-studio-utuh.png`, bukan disalin dari CSS. Semua sampel memiliki alpha 255. Koordinat @1× dikalikan dua untuk memperoleh koordinat piksel PNG.

| Area | HEX | Sampel (x, y) @1× | Piksel PNG (x, y) @2× |
|---|---|---|---|
| Latar menu atas | `#1F2428` | (500, 15) | (1000, 30) |
| Latar panel kiri | `#1F2428` | (200, 500) | (400, 1000) |
| Latar panel kanan | `#1F2428` | (1700, 200) | (3400, 400) |
| Latar ruang di sekitar preview | `#1F2428` | (900, 80) | (1800, 160) |
| Latar bar kontrol | `#1F2428` | (300, 790) | (600, 1580) |
| Latar kolom label timeline | `#1F2428` | (200, 960) | (400, 1920) |
| Latar area track timeline | `#111111` | (1000, 980) | (2000, 1960) |
| Latar penggaris waktu | `#111111` | (700, 838) | (1400, 1676) |
| Latar tab Renders yang tidak aktif | `#2F363D` | (1910, 60) | (3820, 120) |
| Latar item komposisi terpilih | `#404548` | (200, 205) | (400, 410) |
| Isi klip Sequence biru | `#0B84F3` | (1000, 872) | (2000, 1744) |
| Pemisah panel | `#000000` | (384.5, 400) | (769, 800) |
| Garis tab aktif | `#0B84F3` | (50, 37) | (100, 74) |
| Garis playhead Studio | `#F02C00` | (402.5, 910) | (805, 1820) |

Warna di dalam gambar adegan preview adalah konten komposisi. Latar UI di sekitar preview adalah `#1F2428`.

## Font dari computed style

| Elemen | font-family | font-size | font-weight | line-height |
|---|---|---:|---:|---:|
| Menu File/View/Tools | `Arial, Helvetica, sans-serif` | 13px | 400 | 19.5px |
| Tab panel | `Arial, Helvetica, sans-serif` | 14px | 400 | 21px |
| Item daftar komposisi | `Arial, Helvetica, sans-serif` | 13px | 400 | 19.5px |
| Judul metadata DuniaRepo | `Arial, Helvetica, sans-serif` | 12px | 700 | 18px |
| Pesan panel Props | `sans-serif` | 14px | 400 | 21px |
| Label Sequence | `Arial, Helvetica, sans-serif` | 12px | 400 | 12px |
| Timecode Studio kiri bawah | `monospace` | 16px | 400 | 16px |
| Label penggaris timeline | `Arial, Helvetica, sans-serif` | 12px | 400 | 18px |
| Kontrol Fit dan playback | `Arial, Helvetica, sans-serif` | 16px | 400 | 24px |
| Tombol Render | `Arial, Helvetica, sans-serif` | 14px | 400 | 21px |

Computed style mencatat daftar font yang diminta CSS. Pemeriksaan tambahan melalui CDP `CSS.getPlatformFontsForNode` membuktikan font yang benar-benar dipakai di mesin Linux ini: **DejaVu Sans** untuk menu dan label Sequence, serta **DejaVu Sans Mono** untuk timecode. Menyamakan tampilan piksel screenshot ini perlu mempertimbangkan fallback tersebut, walaupun CSS menyebut Arial/Helvetica.

## Isi Studio yang benar-benar tersedia

- Panel kiri menampilkan enam komposisi: Karakter, DuniaRepo, Slop, AppClaude, DuniaIG, LembarPixel.
- Timeline Studio yang diamati menampilkan **satu** baris `<Sequence>` pada frame 0 dan 48. Tidak ada track audio; jumlah elemen audio pada komposisi yang dibuka adalah 0. Beberapa track berwarna di dalam preview merupakan gambar adegan, bukan track timeline Studio.
- Panel kanan menampilkan tab Props/Renders. Props berisi pesan untuk menambahkan schema pada Composition; komposisi ini belum menyediakan editor Props interaktif. Tidak ada render yang dijalankan.
- Acuan beberapa Sequence dan audio belum tersedia dari keadaan DuniaRepo ini. Kode dipertahankan sesuai batas tugas.

## Pelaksanaan dan verifikasi

Perintah server dijalankan dari folder `projects/flat-mirip-mirip/remotion`:

```sh
npx remotion studio src/index.ts --port 3123 --no-open
```

Playwright tidak terjangkau melalui `require()` di lingkungan sesi ini, sehingga paket otomasi dipasang sementara di direktori tugas di `/tmp/claude-1000/`. `chromium.launch()` tanpa opsi tidak menemukan browser instalasi Playwright; sesi memakai `executablePath` ke Chromium bawaan Remotion yang sudah ada. Tidak ada paket atau kode proyek yang diubah. Untuk mencegah Studio menulis cache ke `remotion/node_modules/`, preload sementara meneruskan `enableCaching: false` ke bundler; kode UI yang dibundel tetap paket Studio asli.

| Pemeriksaan | Hasil dan bukti |
|---|---|
| Lima PNG terbaca | LULUS: kelimanya didekode ulang; seluruh lebar 3840 px; ukuran rinci pada tabel berkas. |
| Crop mempertahankan screenshot asli | LULUS: setiap kanal RGBA pada bagian isi ketiga crop identik dengan kotak sumber PNG utuh; padding kanan memiliki alpha 0 seluruhnya. |
| Playhead tengah | LULUS: tombol frame menunjukkan 48; timecode Studio `00:01.18`; hash gambar berbeda dari frame 0. |
| Pemeriksaan visual | LULUS: lima PNG dibuka dan dilihat setelah pengambilan; preview tergambar dan tab Props/Renders terlihat. |
| Error browser dan request gagal | LULUS: 0 error/peringatan console, 0 pageerror, 0 request gagal selama pengambilan. |
| Integritas folder Remotion | LULUS: 19.879 file/tautan dibandingkan sebelum server dimulai dan setelah server berhenti; tidak ada penambahan, penghapusan, perubahan hash, ukuran, mtime, atau target tautan. |
| Server Studio dihentikan | LULUS: PID 1925458 sudah tidak ada; sesi perintah berakhir 143 setelah SIGTERM. Browser otomasi juga ditutup. |
| Port 3123 bebas | LULUS: `ss -H -ltnp 'sport = :3123'` kosong; koneksi loopback IPv4 dan IPv6 ditolak. |
| Proses server Studio tersisa | LULUS: 0 proses Studio. Catatan tentang pencocokan perintah generik di bawah. |

**Catatan `pgrep`:** pemeriksaan literal `pgrep -af "remotion studio"` saat sesi ini berjalan **tidak kosong**: hanya mencocokkan proses induk **PID 1912416**, yaitu `codex exec ...` yang argumennya memuat salinan teks tugas. Itu proses pelaksana tugas, bukan server Studio, dan tidak dihentikan. Tidak ada kecocokan selain proses induk tersebut; PID server telah hilang dan port sudah bebas. Dengan demikian, syarat tidak ada server tertinggal terpenuhi, sedangkan syarat output `pgrep` kosong secara literal belum dapat dinyatakan selama launcher ini masih hidup.

Berkas skrip, paket otomasi, profil browser, dan catatan ukur sementara pada direktori tugas `/tmp/claude-1000/` dihapus setelah laporan ditulis. Tidak ada commit, perubahan kode/package proyek, atau render video.

## SHA-256 PNG

| Berkas | SHA-256 |
|---|---|
| U4-remotion-studio-utuh.png | `e5f5dd213f1ce124af90f2cec6e55f2df66cbe36c48d1a3ed95374b04e5f2093` |
| U4-remotion-studio-timeline.png | `c5165b7b9236ef502c75a916e51b498cde86a5f5e48ef4a8676eaf0df3381219` |
| U4-remotion-studio-kiri.png | `da681e253319c7d6be3176e7d532e5395d8e1d55b97fca04ac25ec1f1fa1f470` |
| U4-remotion-studio-preview.png | `75e2bd9399fa2faf6c47605805bc068cf9d77a65d9ecdd3d351ee52de99d85a9` |
| U4-remotion-studio-playhead.png | `1fca5b3f613b46b590cec2cc52e7f7e8e240e01ceb724b09965180616eb75d3c` |
