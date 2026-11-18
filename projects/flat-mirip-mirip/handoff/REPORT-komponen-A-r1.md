# REPORT komponen A r1

Komponen dan papan still siap dinilai Sutradara. Pemeriksaan mekanis lulus. Belum ada VO; waktu kata di papan adalah data contoh. Tidak ada commit, push, atau render video penuh.

## File dan props

Semua file di bawah berada dalam `remotion/src/`, relatif ke folder proyek.

| File | Props / fungsi |
|---|---|
| `bersama/Fonts.tsx` | `children?`: menahan children sampai Helvetica Neue Roman 400, Medium 500, Bold 700 termuat; `delayRender` + `staticFile` + `FontFace`; kegagalan memanggil `cancelRender`. |
| `bersama/Kanvas.tsx` | `children?, drift=0`: latar `MEREK.latar`, amplitudo drift 0–1; pada 1, skala 1→1,02 selama durasi dengan kurva `drift`. |
| `bersama/KataKecil.tsx` | `kata: readonly Kata[], diFootage=false`: kelompok maksimal `TEKS.maksKata`, ukuran/bobot narasi, tinta atau putih, celah kanvas/footage, offset Y deterministik dari indeks. |
| `bersama/KataTekan.tsx` | `kata: Kata, warna='tinta'` (pilihan `tinta` atau `primer`): satu kata dengan ukuran/bobot tekan. |
| `bersama/KataRaksasa.tsx` | `kata: readonly Kata[], lebar=0.75`: menerima 1–2 kata; ukuran dihitung dengan Canvas `measureText` setelah font siap; warna primer, bobot raksasa. |
| `bersama/Invert.tsx` | `children, mulai: frame, selesai?: frame`: `invert(1)` langsung pada mulai, kembali pada selesai; interval setengah terbuka. |
| `bersama/Flash.tsx` | `mulai: frame`: putih penuh tepat dua frame, lalu hilang. |
| `bersama/KartuSlop.tsx` | `seed: number, rasio='4:5'` (atau `9:16`), `bagian?` (`latar`, `matahari`, `gunung`, `siluet`, `teks`), `style?`: SVG deterministik; bagian yang tidak dipilih transparan. |
| `bersama/Papan.tsx` | `tampilan='urutan'` (atau `slop`): urutan contoh pada ukuran komposisi asli, atau grid 12 kartu sepanjang komposisi. |
| `bersama/BarisKata.tsx` | Internal: `kata, ukuran, bobot, warna, celah, goyang?`; pengukuran, pemusatan blok, mask + geser kecil dengan kurva `reveal`, 3–4 frame per kata. |
| `bersama/waktu.ts` | Tipe `Kata = {t: string; mulai: number; selesai: number}`, validasi, pembulatan onset ke frame pertama yang mencapai waktu kata, pemilihan kelompok. |
| `bersama/useFrameKomposisi.ts` | Menjaga waktu terhadap awal komposisi, termasuk di dalam `Sequence`; memakai `Internals.useTimelinePosition` dari Remotion 4.0.380 yang terpasang. |
| `bersama/index.ts` | Ekspor komponen publik, props, dan tipe `Kata`. |
| `Root.tsx` | Mendaftarkan `PinjamRoot` dan `PapanA`: 1920×1080, 30 fps, 150 frame. |
| `index.ts` | Entry sekarang memakai `Root` baru. |

Font lokal yang disalin, identik byte dengan sumber dan semuanya diabaikan Git:

- `remotion/public/fonts/helvetica-neue-roman.otf` ← `~/fonts-lokal/helvetica-neue/HelveticaNeueRoman.otf`
- `remotion/public/fonts/helvetica-neue-medium.otf` ← `~/fonts-lokal/helvetica-neue/HelveticaNeueMedium.otf`
- `remotion/public/fonts/helvetica-neue-bold.otf` ← `~/fonts-lokal/helvetica-neue/HelveticaNeueBold.otf`

`tema.ts`, `src/pinjam/**`, `bersama/ui-asli/**`, dan `Clawd.tsx` milik TASK B tidak diedit. Tidak ada dependensi baru atau perubahan konfigurasi TypeScript.

## Kontrak waktu dan tampilan

`Kata.mulai/selesai` dalam detik relatif awal komposisi; `Invert`/`Flash` memakai nomor frame relatif awal komposisi. Kelompok berisi paling banyak tiga entri berurutan. Kata yang sudah masuk ditahan sampai kelompok berikutnya mulai, termasuk bila ada jeda antarkelompok; kelompok terakhir hilang pada selesai terpanjangnya. Pergantian kelompok hard cut. Tanda baca tetap melekat pada `t`, termasuk tanda tanya. Posisi kelompok sudah menghitung semua kata dalam kelompok, sehingga kata sebelumnya tidak bergeser ketika kata berikutnya masuk.

Papan memakai kanvas putih dan Helvetica Neue sesuai brief/kiblat 86. Pembacaan arah: papan komponen untuk Sutradara, tipografi grotesk renggang dengan penekanan merah; ENERGY 2 / RHYTHM 2 / MOTION 2. Grid kartu sengaja seragam untuk memperlihatkan pola konten yang dikritik; tiap seed mengubah geometri matahari, gunung, siluet, dan garis teks. Tidak ada tekstur, gradien, gambar raster, fade, atau blur sebagai cara masuk.

| Frame PapanA | Isi |
|---|---|
| 0–44 | Narasi; f030 memuat `kenapa banyak video`, f036 mengganti kelompok; tanda tanya pada kelompok kedua. |
| 45–74 | KataTekan `flat`; flash menutup seluruh frame pada f073–074. |
| 75–104 | KataRaksasa `sudah mengubah`, merah, lebar 0,75. |
| 105–119 | KataRaksasa `industri kreatif`, invert aktif: cyan di hitam. |
| 120–149 | Grid 12 seed; enam kartu 4:5 dan enam kartu 9:16. |

## Hasil pemeriksaan

| Pemeriksaan | Hasil |
|---|---|
| `npx tsc --noEmit -p .` di `remotion/` | **LULUS, exit 0** pada kode akhir. |
| `tema_cek.py`, scope TASK A | **LULUS, exit 0**, tanpa temuan warna/font/ukuran literal. Rincian path di bawah. |
| Tinggi kapital narasi | **55 px**, diukur dengan `measureText('H')` pada font yang sudah termuat, bobot 500, ukuran token 76 px; target 54–58 px terpenuhi. X-height `x`: 40 px. |
| Kontras piksel hasil render | Narasi 18,88:1, merah 5,12:1, cyan hasil invert 12,60:1 terhadap latar masing-masing. |
| Pemusatan dan celah narasi | Pusat blok x=960; celah kanvas 84,48 px; `diFootage` putih dengan celah 134,4 px. Offset Y konsisten saat scrub dan berada dalam ±12,96 px. |
| KataTekan | Ukuran 172 px, bobot 700; rasio ukuran terhadap narasi 2,26×, mengikuti token. |
| KataRaksasa | `sudah mengubah`: lebar DOM 1439,84375 px; target 1440 px (75% × 1920), selisih 0,15625 px karena metrik/kuantisasi browser. `industri kreatif`: 1439,890625 px. |
| Waktu dan reveal | 9 cek fungsi waktu lulus; pemeriksaan browser pada 35 frame lulus, termasuk hard cut f035→036, tanda tanya, reveal 3/4 frame, dan maksimal tiga kata terlihat. Opacity tetap 1, tanpa filter blur pada kata. |
| Sequence | Onset kata pada frame komposisi 20 tetap f020 di dalam `Sequence from={10}`; invert/flash juga mengikuti frame komposisi. |
| Invert dan flash | Invert mati f104, aktif f105–119, kembali f120. Flash mati f072, aktif f073–074, mati f075. Piksel f073 seluruhnya putih. Piksel dominan f116 sesuai token hasil invert: cyan (41,223,212) dan hitam. |
| Drift | Skala f000=1, f075=1,01011, f149=1,02. |
| KartuSlop | 12 geometri unik, seed sama menghasilkan SVG identik; kedua rasio benar; masing-masing 2–3 gunung dan 2–3 garis teks. Kelima pilihan `bagian` hanya memuat lapisan yang dipilih. |
| Font hilang | Uji negatif memakai folder public sementara tanpa Bold: render still **ditolak, exit 1**, pesan `Font lokal wajib gagal dimuat`; tidak menghasilkan PNG. Font proyek tetap lengkap. |
| Runtime | Chromium bawaan Remotion, console tanpa error/warning; tidak membutuhkan Chrome DevTools MCP atau pemasangan baru. |
| Komposisi | `remotion compositions` menampilkan enam komposisi lama dan `PapanA` dengan 150 frame. |
| Still | Tujuh PNG 1920×1080 dirender dari kode akhir; still yang diulang identik byte. Grid terpisah identik dengan f140. |

Perintah `tema_cek` persis dari brief tidak dapat memeriksa sumber: skrip menambahkan `/bersama/tema.ts` ke argumen, sehingga argumen `.../src/bersama` mencari `.../src/bersama/bersama/tema.ts` dan keluar 1. Skrip tidak diubah. Untuk memeriksa TASK A tanpa memasukkan komponen pinjaman, dipakai struktur `src` sementara berisi symlink ke file sumber asli:

```bash
python3 claude/motion-graphic/scripts/juri/tema_cek.py /tmp/flat-komponen-A-tema-pcpicp_l
# LULUS: gaya adegan hanya dari tema.ts.
```

Folder itu berisi `bersama/tema.ts`, 13 file bersama TASK A, `Root.tsx`, dan `index.ts`. TASK B tidak termasuk scope. SHA256 tema yang dipakai: `19f913b44b0ceae8703be41421150893725dd30d76f8616fd9c7ab7d5284a308`.

Bukti uji lokal tambahan: `/tmp/flat-komponen-A-browser.cjs`, `/tmp/flat-komponen-A-browser.json`, `/tmp/flat-komponen-A-waktu.cjs`, `/tmp/flat-komponen-A-font-missing-8d4jlusg/hasil.txt`.

## Still

Semua path relatif ke folder proyek:

- [media/acuan/komponen/A-papan-f030.png](../media/acuan/komponen/A-papan-f030.png): tiga kata narasi.
- [media/acuan/komponen/A-papan-f090.png](../media/acuan/komponen/A-papan-f090.png): teks raksasa merah.
- [media/acuan/komponen/A-papan-f140.png](../media/acuan/komponen/A-papan-f140.png): grid 12 kartu.
- [media/acuan/komponen/A-slop-grid.png](../media/acuan/komponen/A-slop-grid.png): grid mandiri, prop `tampilan=slop`.
- [media/acuan/komponen/A-papan-f060.png](../media/acuan/komponen/A-papan-f060.png): KataTekan.
- [media/acuan/komponen/A-papan-f073.png](../media/acuan/komponen/A-papan-f073.png): flash putih penuh.
- [media/acuan/komponen/A-papan-f116.png](../media/acuan/komponen/A-papan-f116.png): invert aktif.

Contoh render ulang dari `remotion/`:

```bash
npx remotion still src/index.ts PapanA ../media/acuan/komponen/A-papan-f030.png --frame=30
npx remotion still src/index.ts PapanA ../media/acuan/komponen/A-slop-grid.png --frame=140 --props='{"tampilan":"slop"}'
```

## Catatan handoff

- Tidak membutuhkan token baru. Nilai gaya memakai tema yang diberikan; angka geometri SVG, waktu contoh, dan amplitudo kamera mengikuti brief.
- Tiga frame kunci 86 sudah dibuka. Gambar storyboard P03/P05/P09 dan screenshot profil IG tidak tersedia di `media/acuan/`; bentuk slop mengikuti rincian TASK dan uraian proyek. Kecocokan terhadap gambar yang belum tersedia belum dinilai.
- Profil Behindwork masih gagal pada dua field logo sesuai STATUS; TASK A memakai tema eksplisit dari brief. Persetujuan visual papan dan perubahan TAHAP tetap milik Sutradara.
- `useFrameKomposisi` terikat API internal Remotion 4.0.380; saat versi Remotion dinaikkan, ulangi uji Sequence.
- `doctor.sh` lulus; HEAD sama dengan `origin/main` pada awal kerja (`275f9c2`). Tidak menggabungkan aturan dari branch lain.
- `ops-report add` tidak dijalankan karena perintah tersebut otomatis commit/push, sedangkan brief melarang commit. Laporan sesi disimpan hanya di file handoff ini.

Gerbang antislop yang berlaku untuk keluaran video: **Hard PASS** (ukuran, kontras teks, konten dari brief, runtime teruji); **Purpose PASS** (grid seragam untuk contoh slop, merah untuk penekanan, invert/flash untuk kejadian yang ditentukan); **Liveliness PASS** (hierarki narasi/tekan/raksasa, ruang kosong dan aksen mengikuti kiblat); **Craft PASS** (SVG deterministik, token konsisten, tidak ada kontrol UI semu). Navigasi, form, tema aplikasi, dan breakpoint situs tidak berlaku pada komposisi video tetap 16:9 ini.

Rujukan API font: [Remotion, Using fonts](https://www.remotion.dev/docs/fonts), [delayRender dan kegagalan render](https://www.remotion.dev/docs/delay-render). Implementasi diverifikasi terhadap paket 4.0.380 lokal dan render aktual.
