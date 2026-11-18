# REPORT adegan w3 r2 · P08

**Status: P08 siap ditinjau; QA teknis lolos.** Narasi Studio berada di ruang kosong di atas timeline, terpisah dari kotak preview pada seluruh 139 frame Studio. Kamera masuk ke 1,65–1,66×; Clawd senang memegang playhead dengan tinggi 17,2–18,5% frame setelah punch-in. P09/P10 dan bagian Claude tetap.

Acuan: `TASK-adegan-w3-r2.md`, `BRIEF-ADEGAN.md` aturan 7 dan `REPORT-adegan-w3-r1.md`.

Lihat [sebelum/sesudah](../media/acuan/adegan/P08-r2-sanding.png), [seluruh still](../media/acuan/adegan/P08-r2-semua-still.png), [Sequence beruntun](../media/acuan/adegan/P08-r2-rakit.png), dan [uji lebar 360 px](../media/acuan/adegan/P08-r2-phone.png).

## Cakupan dan dasar revisi

Ledger lokal TASK ini disimpan di laporan karena `DECISIONS.md` berada di luar FILE BOLEH.

| ID | Permintaan | Lapisan yang boleh berubah |
|---|---|---|
| W3-1 | “Pindahkan semua narasi di bagian Studio ke panel kanan Props yang kosong (…) ATAU ke ruang di atas timeline; tidak ada piksel narasi di dalam kotak preview.” | Penempatan narasi Studio P08; ruang preview lokal untuk menyediakan jalur narasi; ukuran tetap token, putih di UI gelap |
| W3-2 | “Punch-in kamera ke area timeline (skala ±1,5–1,8) saat Sequence tersusun beruntun; Clawd tinggi ±16–20 % frame, emosi 'senang', mendorong/menarik playhead yang melesat; Sequence baru muncul beruntun dengan react(i) di dekatnya.” | Kamera Studio P08, ukuran/pose/grip Clawd, hubungan gerak playhead dan Sequence |
| W3-3 | “Bagian Claude (awal P08) tetap” dan “P09 dan P10 sudah LULUS dan tidak diubah.” | Tidak ada perubahan; pembanding r1 disimpan sebelum edit |

Dibaca sebagai demo editor untuk penonton Behindwork, mengikuti kiblat 86 dan komponen yang sudah disetujui: ENERGY 3 / RHYTHM 2 / MOTION 3. Fokus adegan ialah Clawd yang mempercepat penyusunan timeline; narasi memakai ruang UI kosong agar caption video tetap terpisah.

## Pemeriksaan awal

- `git fetch origin main`: basis `547c284`, HEAD sama dengan origin/main saat mulai.
- `doctor.sh`: LULUS/Siap. `profil_cek.py /home/irfan/work/data-video/merek/behindwork`: LULUS.
- Branch remote dengan skill belum masuk main sama dengan laporan r1; aturan yang digunakan tetap main.
- Baseline SHA-256 seluruh src dan seluruh still r1 P08/P09/P10 disimpan di `/tmp/flat-w3-r2/baseline.json`; salinan P08 sebelum edit di `/tmp/flat-w3-r2/P08-r1.tsx`.
- Tidak commit, tidak mengubah PETA, tidak render video penuh, mengikuti BRIEF khusus pekerja.

## Perubahan

Kode yang diedit TASK ini hanya `remotion/src/adegan/P08.tsx`. Helper `w3-*`, komponen bersama, token tema, naskah, Root/index, entry uji, dan tsconfig tidak diedit oleh TASK ini. Pemeriksaan disk terakhir mendeteksi `Root.tsx` berubah selama pekerjaan paralel; file itu tidak disentuh atau dipulihkan. Entry uji w3 tidak mengimpor Root, sehingga pembanding still tetap memakai jalur mandiri yang sama.

- **W3-1:** preview lokal memakai zoom 68% di dalam panel Studio untuk menyediakan ruang narasi di atas kontrol/timeline. Narasi putih mengikuti tinggi ruang itu, sementara ukuran layar tetap token 76 px/172 px. Kelompok, waktu kata, reveal, bobot, dan penekanan per kata tetap dari `TeksW3`. Tidak menambah kotak di belakang teks. Isi preview tetap video Jensen yang sudah jadi.
- **W3-2:** kamera mulai masuk pada **bikin**, kurva `heavy` selama `dur(height × .3, fps, .55)`, lalu pan mengikuti playhead dengan batas bidang Studio dan drift skala sampai 1,66×. Clawd memakai rig bersama, skala lokal 1,2, pose depan, emosi senang, `pegangPlayhead`; titik rotasi tepat di genggaman, sehingga gerak condong pada **bagus** tidak melepas tangan dari garis playhead. Blur Clawd berasal dari kecepatan layar dan dibatasi 1 px agar wajah terbaca.
- **W3-2:** lima onset Sequence memakai `react(n)` yang dinormalisasi ke 80% rentang **bikin → sampai**. Playhead mencapai titik awal tiap Sequence pada onset yang sama, dengan kurva `heavy` antarjangkar. Batang tumbuh memakai `land` dan durasi dari jarak. Tidak ada stagger rata atau frame peristiwa yang ditulis tetap.
- **W3-2:** pada **jauh → cepat.**, playhead kembali melesat dan berhenti di frame sumber 399, menyisakan 0,7 detik dari akhir media untuk menjaga tangan/Clawd di dalam frame. Grade dan sumber video tidak diganti.
- **W3-3:** cabang Claude mempertahankan komponen, pesan terkirim, teks, serta rumus push r1. Still f008 terbukti identik.

## Bukti pengukuran hasil terbaru

Render memakai bundle entry `src/index-w3.ts` yang dibangun dari kode terbaru, `@remotion/renderer` 4.0.380, Chrome headless, 1920×1080, 30 fps. DOM diukur setelah `seekToFrame` selesai dan font siap pada **156/156 frame P08**; ini pemeriksaan geometri, bukan klaim audit visual semua frame video.

| Pemeriksaan | Hasil |
|---|---|
| `npx tsc --noEmit -p .` | **PASS**, exit 0; include seluruh `src` dari tsconfig saat ini |
| `motion_lint.py …/remotion/src/adegan` | **PASS**, exit 0 |
| Regex resmi `tema_cek.py` pada P08 | **PASS**: 0 warna hex, 0 font literal, 0 ukuran huruf literal |
| `tema_cek.py …/remotion/src` | Masih menandai 19 file lama di `pinjam/` dan `papan/`, sama dengan r1; **tidak menandai P08 atau helper w3**. Bukan PASS seluruh src. |
| Narasi vs preview, f017–155 | **PASS**, 139/139 frame: 0 irisan kotak tiap kata yang terlihat dengan kotak preview; jarak vertikal minimal **139,52 px**, sehingga piksel narasi berada di luar preview |
| Ukuran/warna narasi Studio | **PASS**, seluruh frame: hanya **76 px / 172 px**, putih `rgb(255,255,255)` |
| Kontras narasi | **PASS**, putih di latar UI asli `#1F2428` = **15,66:1**; garis pemisah hitam memberi kontras lebih tinggi |
| Margin kotak narasi | **PASS**, minimal **185,08 px** ke tepi frame |
| Kamera | Mulai 1× f017; melewati 1,5× pada **f022 (1,56492×)**, mendekati 1,65× f025, berakhir 1,66× |
| Tinggi Clawd setelah skala kamera ≥1,5× | **185,34–200,16 px**, **17,16–18,53% H**, f022–155; di lima frame awal punch-in ukurannya masih bertambah |
| Genggaman vs garis playhead | **PASS**, galat horizontal maksimal **0,037 px** pada seluruh frame Studio; pusat genggaman mengikuti garis, termasuk saat condong |
| P08 mandiri f082 vs Sequence master f934 | **PASS**, **0 piksel RGB berbeda** |
| Claude f008 r1 vs r2 | **PASS**, **0 piksel RGB berbeda** |
| File sumber P09/P10, helper w3, bersama/tema, naskah, entry uji | **PASS**, SHA-256 sama dengan basis. P08.tsx berubah sesuai TASK; Root.tsx berubah di workspace paralel, di luar edit TASK ini |
| Still P09/P10 r1 di disk | **PASS**, seluruh **19 SHA-256** tetap |
| Render ulang P09/P10 dari bundle terbaru | **PASS**, **19/19 still = 0 piksel RGB berbeda** terhadap r1, termasuk still `W3-Sambung` |

Jarak horizontal ujung Sequence baru ke genggaman di frame pertama batang terlihat:

| Sequence | Onset dari kata + react | Pertama terlihat | Playhead sumber | Jarak |
|---|---|---|---|---|
| 1 | f017 | f018 | 6 | 21,63 px |
| 2 | f021 | f022 | 108 | 23,81 px |
| 3 | f025 | f026 | 183 | 8,45 px |
| 4 | f031 | f032 | 241 | 9,27 px |
| 5 | f037 | f038 | 271 | 3,81 px |

Angka frame di tabel adalah hasil naskah sementara, bukan angka waktu yang ditanam di kode. Sequence muncul beruntun dalam **20 frame / 0,67 detik**, di dekat Clawd/playhead.

19 still regresi: P09 f008/028/048/068/088/097/108/110/131 dan sequence-f097; P10 f000/023/034/058/089/104/108/111 dan sequence-f089. Render regresi disimpan di `/tmp/flat-w3-r2/`, tidak menimpa still r1.

SHA-256 sumber yang dilindungi, sama sebelum/sesudah:

```text
P09.tsx      eb5dc47cb2c5200ee7c906014e4d63c2facacb45aac8539a9e5eb03569221eb9
P10.tsx      21e7b2dc06a122eb00c3b224a7236a506f00dbae987bc2bce378ea510b73639a
w3-waktu.tsx cbc19699c51eb1870b5d2b3c338e49f1eff981ee2d16f61fc0999fd027494a5f
w3-grid.tsx  c12bdac3048eb1d1e52d99b6dab722ab9fbb8f01e8d20f0e7d6fb37a259eb189
```

## Still yang sudah dilihat

**23 still mandiri + 1 still Sequence**, seluruhnya PNG 1920×1080. Lima frame tengah kelompok sama dengan r1; tambahan menunjukkan frasa lengkap, semua penekanan, dan rakit bertahap. Seluruhnya dibuka melalui lembar kontak; f052/f082/f096/f121/f144 juga diperiksa besar. Teks kecil dan ekspresi Clawd diperiksa pada lembar lebar 360 px.

| Still | Yang terlihat |
|---|---|
| [f008](../media/acuan/adegan/P08-r2-f008.png) | Tengah “dan AI”: Claude terang, pesan terkirim, “dan”; identik r1 |
| [f013](../media/acuan/adegan/P08-r2-f013.png) | “dan AI” lengkap di ruang chat; bagian Claude tetap |
| [f017](../media/acuan/adegan/P08-r2-f017.png) | Cut Studio pada “bikin”, preview Jensen di atas dan narasi di bawahnya, Clawd mulai memegang playhead |
| [f018](../media/acuan/adegan/P08-r2-f018.png) | Sequence pertama mulai tumbuh di genggaman; kamera mulai masuk |
| [f022](../media/acuan/adegan/P08-r2-f022.png) | Sequence kedua masuk di dekat tangan; kamera 1,56×, Clawd terbaca |
| [f026](../media/acuan/adegan/P08-r2-f026.png) | Sequence ketiga tumbuh, Clawd senang; narasi “bikin” di ruang UI |
| [f029](../media/acuan/adegan/P08-r2-f029.png) | Tengah “bikin kita”: tiga Sequence terlihat, “bikin” saja karena kita belum onset |
| [f030](../media/acuan/adegan/P08-r2-f030.png) | “kita” mulai reveal di samping bikin; tangan tetap pada playhead |
| [f032](../media/acuan/adegan/P08-r2-f032.png) | Sequence keempat mulai, Clawd mendorong playhead di titik baru |
| [f035](../media/acuan/adegan/P08-r2-f035.png) | “bikin kita” utuh; empat Sequence sedang tersusun |
| [f036](../media/acuan/adegan/P08-r2-f036.png) | Empat Sequence, akhir perpindahan menuju awal Sequence kelima |
| [f038](../media/acuan/adegan/P08-r2-f038.png) | Sequence kelima muncul beruntun, tepat dekat genggaman |
| [f042](../media/acuan/adegan/P08-r2-f042.png) | “sampai” mulai reveal; lima Sequence, playhead sudah melesat |
| [f052](../media/acuan/adegan/P08-r2-f052.png) | Tengah “sampai ke”: “sampai” putih di atas timeline; tidak menimpa caption preview |
| [f053](../media/acuan/adegan/P08-r2-f053.png) | Lima Sequence tersusun, Clawd senang, “sampai” tetap terpisah dari video |
| [f060](../media/acuan/adegan/P08-r2-f060.png) | “sampai ke” lengkap di ruang UI atas timeline |
| [f082](../media/acuan/adegan/P08-r2-f082.png) | Tengah “hasil yang bagus”: “hasil yang” putih; tidak ada caption video di belakang narasi |
| [f096](../media/acuan/adegan/P08-r2-f096.png) | “hasil yang bagus” utuh; Clawd bereaksi pada bagus tanpa melepas playhead |
| [f108](../media/acuan/adegan/P08-r2-f108.png) | “jauh” KataTekan putih; kedipan mata bawaan rig, genggaman tetap |
| [f121](../media/acuan/adegan/P08-r2-f121.png) | Tengah “jauh lebih cepat.”: “lebih” KataTekan putih, playhead mendekati akhir |
| [f130](../media/acuan/adegan/P08-r2-f130.png) | “cepat.” KataTekan putih, Clawd senang di sisi kanan timeline |
| [f144](../media/acuan/adegan/P08-r2-f144.png) | “cepat.” di atas timeline; Clawd tinggi ±18%, tangan tidak terpotong |
| [f155](../media/acuan/adegan/P08-r2-f155.png) | Tahan akhir P08; teks, Clawd, dan batas timeline tetap aman |
| [sequence-f082](../media/acuan/adegan/P08-r2-sequence-f082.png) | P08 dipasang pada waktu master; sama persis dengan f082 mandiri |

## Alasan visual dan pemeriksaan akhir

- **Kontras/posisi PASS:** narasi berada di ruang UI kosong yang berhubungan dengan timeline; ukuran dan Helvetica Neue mengikuti token kiblat 86. Preview dikecilkan lokal untuk memberi ruang bagi 172 px tanpa bertabrakan dengan caption.
- **Fokus/gerak PASS untuk still TASK:** punch-in dan pan menunjukkan Clawd bekerja; senang terbaca pada lembar 360 px, Sequence baru muncul dekat tangan. Drift, condong, dan blur mempunyai fungsi mengikuti aksi; tidak menambah hiasan atau warna merek baru.
- **Konten/scope PASS:** ucapan tidak ditambah atau diubah, sumber video jadi tetap; kode replika UI asli tetap dipakai. Pengujian tombol/form/keyboard web tidak berlaku pada animasi video ini.
- **Review kode PASS:** gerak bersumber dari kata/fps, kurva dan grip memakai helper kanonis; perubahan lokal satu file, tanpa dependensi, rahasia, atau perubahan shared. Tidak ada suppression lint/typecheck atau cek yang dilemahkan.

Reproduksi dari folder `remotion/`:

```bash
npx tsc --noEmit -p .
npx remotion still src/index-w3.ts P08 ../media/acuan/adegan/P08-r2-f082.png --frame=82
```

Dari root repo:

```bash
python3 claude/motion-graphic/scripts/juri/motion_lint.py projects/flat-mirip-mirip/remotion/src/adegan
```

Pengukuran dan pembanding sesi: `/tmp/flat-w3-r2/{baseline.json,geometry.json,summary.json,verify.cjs}`; bundle terbaru: `/mnt/storage-projects/flat-w3-r2-bundle-c`. Rebuild awal ke folder bundle lama sempat gagal `EEXIST` pada symlink media; seluruh hasil yang dilaporkan memakai folder bundle baru yang dibangun berhasil.

## Batas penyerahan

Waktu VO masih sementara. Ini revisi P08 beserta still dan pemeriksaan geometri; belum MP4/draft gerak, audit visual semua frame oleh Sutradara, atau QA audio/SFX/musik. Tidak merender video penuh. Tidak mengklaim persetujuan kreatif. Token sesi tidak tersedia dari harness, tidak diestimasi.
