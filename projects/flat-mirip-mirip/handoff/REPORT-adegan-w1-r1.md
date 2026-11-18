# REPORT · adegan W1 · r1

Siap dinilai Sutradara: P01, P02, P03, P13, P15 dibangun dari komponen bersama yang sudah lulus. Tersedia **43 still 1920×1080**: 15 titik tengah kelompok, 23 momen tambahan, dan 5 pembanding Sequence. Seluruh still terakhir sudah saya lihat melalui lima lembar kontak; momen orbit, wipe, preview Studio, invert, dan frasa penekanan juga dibuka pada ukuran penuh. Penilaian ini pemeriksaan pekerja, bukan persetujuan visual Sutradara.

Lembar kontak: [P01](../media/acuan/adegan/P01-lembar.png) · [P02](../media/acuan/adegan/P02-lembar.png) · [P03](../media/acuan/adegan/P03-lembar.png) · [P13](../media/acuan/adegan/P13-lembar.png) · [P15](../media/acuan/adegan/P15-lembar.png).

## File

| File | Isi |
|---|---|
| [P01.tsx](../remotion/src/adegan/P01.tsx) | Orbit lokal delapan raster, bingkai putih, bayangan token, pusaran, dan sapuan kartu terakhir; juga mengekspor geometri jejak untuk P13. |
| [P02.tsx](../remotion/src/adegan/P02.tsx) | StudioRemotion asli, preview video Jensen, Clawd memegang playhead, serta kata Claude putih. |
| [P03.tsx](../remotion/src/adegan/P03.tsx) | KataRaksasa merah dan pembalikan seluruh frame saat industri. |
| [P13.tsx](../remotion/src/adegan/P13.tsx) | Pertanyaan dan orbit kosong dari P01, dengan penekanan mudah diingat?. |
| [P15.tsx](../remotion/src/adegan/P15.tsx) | KataRaksasa Seleramu merah dan tahan dengan drift. |
| [w1-waktu.tsx](../remotion/src/adegan/w1-waktu.tsx) | Adapter waktu relatif → waktu komposisi, pemilihan kelompok asli naskah, dan push berdasarkan durasi adegan. |
| [uji-w1.tsx](../remotion/src/adegan/uji-w1.tsx) | Lima Composition adegan + W1Sequence untuk memeriksa penempatan pada offset master sebenarnya. |
| [index-w1.ts](../remotion/src/index-w1.ts) | Entry registerRoot terpisah. |

File keluaran hanya `media/acuan/adegan/P01-*.png`, `P02-*.png`, `P03-*.png`, `P13-*.png`, `P15-*.png` dan laporan ini. Komponen bersama, tema, naskah, Root/index utama, serta adegan pekerja lain tidak saya ubah. Tidak ada commit atau render video penuh.

## Penguncian gerak ke kata

Semua onset dibaca dari `kataRelatif(id)`; pembulatan mengikuti `frameDariDetik`. Adapter memilih `kelompok` naskah, bukan mengandalkan pembagian otomatis tiap tiga kata dalam BarisKata. Saat berada di Sequence, selisih frame komposisi dan frame lokal ditambahkan hanya untuk komponen teks/Invert yang membaca waktu komposisi. Kelompok terakhir ditahan sampai akhir adegan supaya ekor sementara tidak menjadi layar kosong. Push kanvas 1→1,012 dihitung dari durasi adegan, sehingga tidak melambat mengikuti durasi seluruh master.

| Adegan | Durasi sementara | Pengikat gerak dan bukti |
|---|---|---|
| P01 | 156 f / 5,2 dtk | Onset flat memulai masuk kartu dengan kurva land, durasi dari jarak melalui dur(), dan stagger react(i). Pada mirip-mirip?, radius merapat dengan heavy dan sudut berakselerasi terus sampai sapuan. Blur berarah dihitung dari perubahan posisi/skala selama ½ frame, bukan blur untuk memunculkan kartu. Sapuan dimulai pada 64% rentang onset pertanyaan → frame terakhir, lalu kartu yang paling dekat saat itu membesar dengan heavy dan menutup layar tepat di frame terakhir. Waktu sekarang: flat f104, mirip-mirip? f120, sapuan f142→155; angka ini hasil naskah, bukan pemicu yang ditulis mati. |
| P02 | 12 f / 0,4 dtk | Rentang onset→selesai kata Claude menggerakkan playhead dengan heavy. Preview mencari frame yang sama melalui Sequence lokal `from={frame-playhead}`; ini menghindari clamp/offset Freeze pada komposisi pendek. Rentang media 195→237 adalah shot Jensen dalam video jadi, dan bukan waktu ucapan. Posisi tangan = posisiPlayheadStudio − CLAWD_GENGGAM×skala, sehingga genggaman dan garis selalu bertemu. Blur horizontal mengikuti kecepatan tarikan; push UI 1→1,004 berjalan sepanjang adegan. |
| P03 | 48 f / 1,6 dtk | Kelompok sudah mengubah dan industri kreatif, berganti pada onset kelompok. Invert aktif tepat pada onset industri (f20 lokal / f188 pada master sementara); tetap aktif sampai cut. Kedua frasa memakai KataRaksasa lebar 0,75. |
| P13 | 147 f / 4,9 dtk | Pergantian kelompok dan kemunculan tiap kata berasal dari naskah. Onset mudah mengaktifkan penekanan, lalu diingat? masuk pada onsetnya sendiri. Jejak mengimpor geometri P01: pusat 50%/50%, radius 35,5% W dan 28,5% H, kemiringan awal −9°, stroke NETRAL.garis. Tidak ada kartu. |
| P15 | 48 f / 1,6 dtk | Seleramu terungkap pada onset kata, ditahan sampai akhir durasi naskah, dan diberi push halus. Tidak dipotong menjadi 1,2 dtk karena waktu kata sementara sendiri 1,44 dtk. |

Dua kekurangan props ditangani lokal, mengikuti pola wrapper PapanFootage: P02 memakai KataTekan dengan warna narasi dipaksa NETRAL.putih pada lingkupnya sendiri; P13 memakai KataKecil dua kata dengan ukuran/bobot token penekanan karena KataTekan hanya menerima satu kata. Tidak ada literal warna/font/ukuran huruf baru. Pada P01, flat dan dan ditampilkan bergantian agar satu baris tidak berisi dua ukuran.

## Pemeriksaan

| Pemeriksaan | Hasil terakhir |
|---|---|
| `npx tsc --noEmit -p .` dari remotion/ | **PASS**, exit 0: TypeScript: No errors found. |
| TypeScript dengan entry `src/index-w1.ts` ditambahkan ke konfigurasi yang sama melalui Compiler API, `noEmit: true` | **PASS**, exit 0: W1 tsc: PASS (7 file adegan). Pemeriksaan tambahan perlu karena include tsconfig proyek belum mencakup folder adegan/ dan index-w1.ts. Tidak mengubah tsconfig. |
| `python3 claude/motion-graphic/scripts/juri/motion_lint.py projects/flat-mirip-mirip/remotion/src/adegan` | **PASS**, exit 0. |
| `tema_cek.py .../src/adegan` persis seperti BRIEF | **GAGAL prasyarat path**: mencari `adegan/bersama/tema.ts`, padahal tema asli berada di `src/bersama/tema.ts`. Tidak membuat tema duplikat di folder adegan. |
| `tema_cek.py .../src` | Menemukan **19 butir lama** di papan/ dan pinjam/; **tidak menandai file W1**. Tidak memperbaiki file di luar cakupan. |
| Checker tema yang sama pada pohon sementara berisi symlink tema asli + kedelapan file W1 | **LULUS**, exit 0: gaya adegan hanya dari tema.ts. Seluruh sumber yang diperiksa tetap file asli, bukan salinan yang dimodifikasi. |
| PNG | **43/43 utuh**, masing-masing 1920×1080; ditambah lima lembar kontak. |
| Pembanding standalone vs Sequence | **5/5 identik, 0 piksel RGB berbeda**: P01 f130, P02 f5, P03 f40, P13 f124, P15 f22. |

Runtime render dipindah ke folder sementara SSD dan konkurensi diturunkan menjadi satu setelah Chrome gagal mengambil screenshot saat ruang disk sistem hampir habis. Sisa still berhasil dirender dengan exit 0; hasil akhirnya diverifikasi ulang. Tidak menurunkan resolusi atau menghapus data sesi lain.

Contoh render ulang dari `remotion/` (gunakan TMPDIR di SSD bila disk sistem masih sempit):

```bash
npx remotion still src/index-w1.ts P01 ../media/acuan/adegan/P01-f130.png --frame=130 --image-format=png
```

## Daftar still yang dilihat

Frame kelompok = pembulatan titik tengah onset pertama dan selesai kata terakhir kelompok. Kata yang belum diucapkan pada titik itu tetap tersembunyi; still tambahan menunjukkan frasa lengkap dan gerak utamanya. Nomor kelompok di tabel mulai dari 1 (field naskah mulai dari 0). Semua temuan di bawah sesuai rancangan adegan; putusan visual akhir tetap milik Sutradara.

| Still | Jenis | Yang terlihat |
|---|---|---|
| [P01-f000.png](../media/acuan/adegan/P01-f000.png) | Gerak / frasa lengkap | “Kenapa” sudah terlihat pada kanvas putih dengan jejak elips tipis; pembuka tidak kosong. |
| [P01-f017.png](../media/acuan/adegan/P01-f017.png) | Kelompok 1 | “Kenapa banyak” berjarak lebar di garis tengah; “video” belum diucapkan. |
| [P01-f029.png](../media/acuan/adegan/P01-f029.png) | Gerak / frasa lengkap | “Kenapa banyak video” lengkap, satu baris dan satu lapisan narasi. |
| [P01-f042.png](../media/acuan/adegan/P01-f042.png) | Kelompok 2 | “yang” menggantikan kelompok sebelumnya; tempat “ada” masih disediakan tanpa menampilkan kata lebih awal. |
| [P01-f046.png](../media/acuan/adegan/P01-f046.png) | Gerak / frasa lengkap | “yang ada” lengkap dengan ukuran narasi yang sama. |
| [P01-f064.png](../media/acuan/adegan/P01-f064.png) | Kelompok 3 | “di sosial” muncul berurutan; “media” belum diucapkan. |
| [P01-f072.png](../media/acuan/adegan/P01-f072.png) | Gerak / frasa lengkap | “di sosial media” lengkap dan tetap berada di dalam elips. |
| [P01-f091.png](../media/acuan/adegan/P01-f091.png) | Kelompok 4 | “sekarang” tampil sendiri sebelum onset “terasa”. |
| [P01-f098.png](../media/acuan/adegan/P01-f098.png) | Gerak / frasa lengkap | “sekarang terasa” lengkap, tanpa sisa kata kelompok sebelumnya. |
| [P01-f104.png](../media/acuan/adegan/P01-f104.png) | Gerak / frasa lengkap | “flat” menjadi penekanan dan kartu mulai masuk dari luar frame, sesuai onset kata. |
| [P01-f112.png](../media/acuan/adegan/P01-f112.png) | Kelompok 5 | “flat” hitam besar dikelilingi delapan kartu raster k1/k2 bertepi putih dan bayangan token. |
| [P01-f117.png](../media/acuan/adegan/P01-f117.png) | Gerak / frasa lengkap | “dan” kembali kecil sementara delapan kartu sudah berada di lintasan orbit. |
| [P01-f120.png](../media/acuan/adegan/P01-f120.png) | Gerak / frasa lengkap | “mirip-mirip?” masuk dengan tanda tanya dan memulai fase percepatan pusaran. |
| [P01-f130.png](../media/acuan/adegan/P01-f130.png) | Kelompok 6 | Pertanyaan tetap tajam sementara orbit merapat dan kartu memiliki blur searah geraknya. |
| [P01-f142.png](../media/acuan/adegan/P01-f142.png) | Gerak / frasa lengkap | Orbit tetap cepat sesudah merapat; kartu terdekat siap mengambil alih layar. |
| [P01-f149.png](../media/acuan/adegan/P01-f149.png) | Gerak / frasa lengkap | Kartu terdekat membesar dengan blur gerak dan menyapu pertanyaan dari depan. |
| [P01-f155.png](../media/acuan/adegan/P01-f155.png) | Gerak / frasa lengkap | Isi kartu memenuhi layar pada frame terakhir; siap cut ke P02 tanpa bidang putih kosong. |
| [P01-sequence-f130.png](../media/acuan/adegan/P01-sequence-f130.png) | Pembanding Sequence | Hasil pada offset master identik dengan P01 f130; pertanyaan tetap tajam sementara orbit merapat dan kartu memiliki blur searah geraknya. |
| [P02-f000.png](../media/acuan/adegan/P02-f000.png) | Gerak / frasa lengkap | Studio menampilkan Jensen frame sumber 195, “Claude” putih di kanan atas preview, dan Clawd sudah memegang playhead. |
| [P02-f005.png](../media/acuan/adegan/P02-f005.png) | Kelompok 1 | Preview bergerak ke Jensen frame 212; Clawd menarik playhead dengan blur horizontal sementara “Claude” tetap menjauhi wajah. |
| [P02-f011.png](../media/acuan/adegan/P02-f011.png) | Gerak / frasa lengkap | Tarikan selesai di Jensen frame 237; genggaman tetap mengikuti garis playhead dan kaki Clawd berada di dalam frame. |
| [P02-sequence-f005.png](../media/acuan/adegan/P02-sequence-f005.png) | Pembanding Sequence | Hasil pada offset master identik dengan P02 f005; preview bergerak ke Jensen frame 212; Clawd menarik playhead dengan blur horizontal sementara “Claude” tetap menjauhi wajah. |
| [P03-f010.png](../media/acuan/adegan/P03-f010.png) | Kelompok 1 | “sudah mengubah” merah besar tersusun kata per kata di kanvas putih. |
| [P03-f014.png](../media/acuan/adegan/P03-f014.png) | Gerak / frasa lengkap | Frasa merah terbaca lengkap dengan lebar target 75% frame. |
| [P03-f019.png](../media/acuan/adegan/P03-f019.png) | Gerak / frasa lengkap | Frame terakhir sebelum onset “industri” masih merah di putih. |
| [P03-f020.png](../media/acuan/adegan/P03-f020.png) | Gerak / frasa lengkap | Pada onset “industri”, seluruh kanvas langsung negatif: hitam dengan teks sian. |
| [P03-f032.png](../media/acuan/adegan/P03-f032.png) | Kelompok 2 | “industri kreatif,” menggantikan frasa pertama dan kata kedua sedang terungkap sesuai onset. |
| [P03-f040.png](../media/acuan/adegan/P03-f040.png) | Gerak / frasa lengkap | “industri kreatif,” lengkap, besar, dan sian di hitam seperti papan acuan. |
| [P03-f047.png](../media/acuan/adegan/P03-f047.png) | Gerak / frasa lengkap | Frasa negatif ditahan sampai frame terakhir tanpa jeda kosong. |
| [P03-sequence-f040.png](../media/acuan/adegan/P03-sequence-f040.png) | Pembanding Sequence | Hasil pada offset master identik dengan P03 f040; “industri kreatif,” lengkap, besar, dan sian di hitam seperti papan acuan. |
| [P13-f000.png](../media/acuan/adegan/P13-f000.png) | Gerak / frasa lengkap | “Jadi” terlihat di kanvas putih dan elips yang sama dengan P01, tanpa kartu. |
| [P13-f009.png](../media/acuan/adegan/P13-f009.png) | Kelompok 1 | “Jadi” masih tampil; “apa” belum diucapkan pada titik tengah kelompok ini. |
| [P13-f031.png](../media/acuan/adegan/P13-f031.png) | Kelompok 2 | “yang membuat” berganti di garis tengah dengan jejak orbit tetap tipis. |
| [P13-f056.png](../media/acuan/adegan/P13-f056.png) | Kelompok 3 | “video tetap” terungkap berurutan, dengan ukuran narasi dari token. |
| [P13-f081.png](../media/acuan/adegan/P13-f081.png) | Kelompok 4 | “spesial,” terlihat sebelum onset “unik”; tidak ada kartu yang kembali. |
| [P13-f114.png](../media/acuan/adegan/P13-f114.png) | Kelompok 5 | “dan” kecil berada di atas penekanan “mudah”; “diingat?” masih menunggu onset. |
| [P13-f124.png](../media/acuan/adegan/P13-f124.png) | Gerak / frasa lengkap | “dan” kecil dan “mudah diingat?” besar membentuk dua baris dengan tanda tanya utuh. |
| [P13-f146.png](../media/acuan/adegan/P13-f146.png) | Gerak / frasa lengkap | Pertanyaan lengkap ditahan sampai akhir, dengan elips kosong dan push halus. |
| [P13-sequence-f124.png](../media/acuan/adegan/P13-sequence-f124.png) | Pembanding Sequence | Hasil pada offset master identik dengan P13 f124; “dan” kecil dan “mudah diingat?” besar membentuk dua baris dengan tanda tanya utuh. |
| [P15-f000.png](../media/acuan/adegan/P15-f000.png) | Gerak / frasa lengkap | “Seleramu” merah mulai terungkap langsung di kanvas putih. |
| [P15-f022.png](../media/acuan/adegan/P15-f022.png) | Kelompok 1 | “Seleramu” merah besar terbaca penuh, dengan lebar 75% frame. |
| [P15-f047.png](../media/acuan/adegan/P15-f047.png) | Gerak / frasa lengkap | “Seleramu” tetap terbaca pada akhir adegan; perubahan kecil skala berasal dari drift kamera. |
| [P15-sequence-f022.png](../media/acuan/adegan/P15-sequence-f022.png) | Pembanding Sequence | Hasil pada offset master identik dengan P15 f022; “Seleramu” merah besar terbaca penuh, dengan lebar 75% frame. |

## Batas yang belum dibuktikan

- Waktu masih `SUMBER_WAKTU = sementara`. Sinkron terhadap VO final belum diuji; tidak ada audio/SFX/musik yang ditambahkan dalam tugas ini.
- Still membuktikan komposisi dan keadaan gerak pada frame terpilih. Audit semua frame, kelancaran saat diputar, dan penilaian Sutradara masih diperlukan pada tahap berikutnya.
- Integrasi ke Root/index utama tidak dikerjakan karena di luar FILE BOLEH; W1Sequence hanya komposisi uji dengan offset sebenarnya.
- Perintah tema pada folder adegan tetap punya masalah path, sedangkan pemeriksaan seluruh src masih gagal pada 19 berkas lama di luar cakupan. File W1 sendiri bersih dengan checker asli dan tema asli.
- Durasi P02 dan P15 mengikuti naskah sementara (0,4 dan 1,6 dtk). Setelah VO dikunci, nilai durasi/gerak akan mengikuti data baru; kelayakan tempo akhirnya belum diklaim.
