# REPORT adegan w4 r1 · P07, P11, P12, P14

Empat adegan siap ditinjau dan dirakit oleh Sutradara. Seluruh 69 still 1920×1080 sudah dilihat; typecheck proyek dan entry W4 lulus, motion lint PASS. Kontras minimum seluruh still **5,73:1**. Pada 19 still P12, irisan bbox wajah–teks **0 px²**, jarak minimum **133 px**. Waktu tetap **SEMENTARA** dari naskah; ini penyerahan visual, belum audit master/VO/audio final.

## Hasil yang bisa dibuka

| Adegan | Implementasi | Lembar ringkas | Uji lebar 360 px |
|---|---|---|---|
| P07 | [P07.tsx](../remotion/src/adegan/P07.tsx) | [ringkas](../media/acuan/adegan/P07-w4-ringkas.png) | [360 px](../media/acuan/adegan/P07-w4-360.png) |
| P11 | [P11.tsx](../remotion/src/adegan/P11.tsx) | [ringkas](../media/acuan/adegan/P11-w4-ringkas.png) | [360 px](../media/acuan/adegan/P11-w4-360.png) |
| P12 | [P12.tsx](../remotion/src/adegan/P12.tsx) | [ringkas](../media/acuan/adegan/P12-w4-ringkas.png) | [360 px](../media/acuan/adegan/P12-w4-360.png) |
| P14 | [P14.tsx](../remotion/src/adegan/P14.tsx) | [ringkas](../media/acuan/adegan/P14-w4-ringkas.png) | [360 px](../media/acuan/adegan/P14-w4-360.png) |

[Bukti bbox P12](../media/acuan/adegan/P12-w4-bbox.png). Entry uji: `remotion/src/index-w4.ts`, root uji `adegan/uji-w4.tsx`; helper lokal `w4-shots.ts`, `w4-waktu.tsx`, `w4-footage.tsx`. Tidak mengubah PapanFootage, komponen bersama, tema, naskah, Root/index master, atau file pekerja lain. Tidak ada commit atau render video penuh.

## Pilihan visual dan batas pengerjaan

- P07: G4-c → G4-b bergantian enam kali, 0,633–0,667 dtk. Kartu putih dan bayangan token masuk dari bawah; teks di kanvas tepat di bawah bidang kartu. Pada kata “adalah” pindah ke PremierePro asli. Narasi berada di kanvas di luar jendela, sehingga kedua monitor bebas. Potongan V1 muncul satu demi satu pada onset “adalah / meniru / karya / orang / lain,” dan playhead berjalan sesuai waktu Program.
- P11: empat shot @0,400 dtk. “jualan” berada di atas “kepercayaan,” putih 172 px; crop pada dua klip pelanggan mengutamakan tangan/serah barang, dengan wajah di luar daerah teks.
- P12: tujuh shot rapat. F2-b tepat 15 frame (0,500 dtk), teks kiri dan wajah kanan. “orangnya,” memakai putih besar dari token raksasa, fit maksimum 78% lebar; latarnya siluet komunitas yang dicrop lebih rendah. Pada “bukan videonya.” beralih ke G3-c lalu G3-a, blur bertambah hingga 10,8 px; teks tetap tajam dan putih.
- P14: tiga keadaan kartu: keluarga → jendela bidik → pengalaman pribadi (sketsa lalu buku harian). Hard cut di onset “sudut” dan “hal”; isi video di dalam kartu juga dipotong rapat. Latar selalu sumber yang sama dengan isi kartu, blur 18 px dan gelap. Kartu miring −3° / +2,5° / −2°, masuk dari bawah; bidang masuk dibatasi sebelum area kata.
- Material latar, disalin/dikembangkan lokal dari pola PapanFootage: saturasi 0,62, contrast 0,88 + brightness 1,03 (mengangkat hitam), grain monokrom halus 0,045, bloom 3 px dengan alpha 0,075, pemisahan kanal ±1,2 px hanya dekat tepi. Gelap memakai bidang hitam 0,20 dan gradien **linear** lokal 0,49 pada area teks; tidak ada vignette radial. Semua lapisan ini berada di bawah teks. Isi kartu memakai saturasi 0,65 dan grade ringan.
- Push latar +0,06 per shot dari crop yang dipilih. Kartu tetap drift/push, UI push 1,5%. Blur masuk kartu dihitung dari selisih posisi antarframe, jadi hanya mengikuti kecepatan gerak; tidak ada fade/crossfade atau blur masuk teks.
- Onset ucapan mengambil `kataRelatif`, durasi dari NASKAH. Wrapper lokal mengubah waktu kata ke koordinat komposisi yang dibaca BarisKata; tidak mengubah komponen bersama. Uji P12 lokal f060 melawan P12 di Sequence +30 pada f090 menghasilkan **0 piksel berbeda**, selisih kanal maksimum 0.

## Daftar shot

Frame dan detik adegan bersifat lokal; rentang akhir eksklusif. Waktu sumber adalah detik dalam berkas asli. Foto tidak mempunyai jam sumber. Seluruh video diputar 1×, tanpa percepatan.

### P07 · 192 frame / 6.400 dtk

| Frame adegan | Detik adegan | Berkas | Detik sumber | Durasi |
|---|---|---|---|---|
| 000–020 | 0.000–0.667 | `media/footage/G4/G4-c-homer-murid-penyalin-louvre.jpg` | foto utuh | 0.667 dtk |
| 020–039 | 0.667–1.300 | `media/footage/G4/G4-b-beroud-les-copistes-1909.jpg` | foto utuh | 0.633 dtk |
| 039–059 | 1.300–1.967 | `media/footage/G4/G4-c-homer-murid-penyalin-louvre.jpg` | foto utuh | 0.667 dtk |
| 059–078 | 1.967–2.600 | `media/footage/G4/G4-b-beroud-les-copistes-1909.jpg` | foto utuh | 0.633 dtk |
| 078–098 | 2.600–3.267 | `media/footage/G4/G4-c-homer-murid-penyalin-louvre.jpg` | foto utuh | 0.667 dtk |
| 098–117 | 3.267–3.900 | `media/footage/G4/G4-b-beroud-les-copistes-1909.jpg` | foto utuh | 0.633 dtk |
| 117–192 | 3.900–6.400 | `media/footage/jadi/jensen-v4-00-14.mp4` · Source | 6.100–8.600 | 2.500 dtk |
| 117–192 | 3.900–6.400 | berkas sama · Program | 4.700–7.200 | 2.500 dtk |

Program tertinggal 1,400 dtk dari Source (beberapa potongan). Onset potong manual V1 pada frame lokal P07 **117, 129, 141, 152, 163**; titik sumber Program **4,700; 5,100; 5,500; 5,867; 6,233** detik. Sebelum potongan aktif, sisa klip masih utuh, sehingga tidak tampak otomatis tersusun sekaligus.

### P11 · 48 frame / 1.600 dtk

| Frame adegan | Detik adegan | Berkas | Detik sumber | Durasi |
|---|---|---|---|---|
| 000–012 | 0.000–0.400 | `media/footage/G1/G1-a-mixkit-tangan-barista.mp4` | 3.000–3.400 | 0.400 dtk |
| 012–024 | 0.400–0.800 | `media/footage/G1/G1-b-mixkit-pengrajin-kaca.mp4` | 4.000–4.400 | 0.400 dtk |
| 024–036 | 0.800–1.200 | `media/footage/F1/F1-a-mixkit-teh-pelanggan.mp4` | 4.100–4.500 | 0.400 dtk |
| 036–048 | 1.200–1.600 | `media/footage/F1/F1-b-mixkit-serah-tas-toko.mp4` | 3.600–4.000 | 0.400 dtk |

### P12 · 120 frame / 4.000 dtk

| Frame adegan | Detik adegan | Berkas | Detik sumber | Durasi |
|---|---|---|---|---|
| 000–017 | 0.000–0.567 | `media/footage/G2/G2-a-mixkit-ngobrol-api-unggun.mp4` | 2.500–3.067 | 0.567 dtk |
| 017–035 | 0.567–1.167 | `media/footage/G2/G2-c-mixkit-teman-dari-belakang.mp4` | 3.000–3.600 | 0.600 dtk |
| 035–051 | 1.167–1.700 | `media/footage/G2/G2-b-mixkit-siluet-komunitas.mp4` | 4.500–5.033 | 0.533 dtk |
| 051–066 | 1.700–2.200 | `media/footage/F2/F2-b-mixkit-potret-pria-rumah.mp4` | 1.400–1.900 | 0.500 dtk |
| 066–082 | 2.200–2.733 | `media/footage/G2/G2-b-mixkit-siluet-komunitas.mp4` | 7.200–7.733 | 0.533 dtk |
| 082–101 | 2.733–3.367 | `media/footage/G3/G3-c-mixkit-scroll-malam.mp4` | 5.200–5.833 | 0.633 dtk |
| 101–120 | 3.367–4.000 | `media/footage/G3/G3-a-coverr-jari-scroll-layar.mp4` | 4.000–4.633 | 0.633 dtk |

### P14 · 126 frame / 4.200 dtk

| Frame adegan | Detik adegan | Berkas | Detik sumber | Durasi |
|---|---|---|---|---|
| 000–021 | 0.000–0.700 | `media/footage/F3/F3-a-wikimedia-keluarga-brown-1910.jpg` | foto utuh | 0.700 dtk |
| 021–039 | 0.700–1.300 | `media/footage/F4/F4-a-mixkit-jendela-bidik-danau.mp4` | 4.800–5.400 | 0.600 dtk |
| 039–056 | 1.300–1.867 | `media/footage/F4/F4-a-mixkit-jendela-bidik-danau.mp4` | 8.500–9.067 | 0.567 dtk |
| 056–079 | 1.867–2.633 | `media/footage/G6/G6-a-mixkit-sketsa-pohon.mp4` | 3.600–4.367 | 0.767 dtk |
| 079–103 | 2.633–3.433 | `media/footage/F5/F5-b-mixkit-detail-buku-harian.mp4` | 3.200–4.000 | 0.800 dtk |
| 103–126 | 3.433–4.200 | `media/footage/F5/F5-b-mixkit-detail-buku-harian.mp4` | 6.000–6.767 | 0.767 dtk |

## Pemeriksaan

| Pemeriksaan | Hasil terbaru |
|---|---|
| `./tools/doctor.sh` sebelum mulai | LULUS; PETA saat awal terbaru, skill main sesuai symlink. Tidak menjalankan `--fix`. |
| `git fetch origin main`; jarak HEAD–origin/main | 0 / 0. |
| `profil_cek.py /home/irfan/work/data-video/merek/behindwork` | LULUS. |
| `npx tsc --noEmit -p .` | LULUS: No errors found. |
| Typecheck entry W4 secara eksplisit | LULUS: No errors found. Dijalankan tambahan karena tsconfig proyek tidak memasukkan folder adegan. |
| `motion_lint.py projects/flat-mirip-mirip/remotion/src/adegan` | PASS. |
| `tema_cek.py .../src/adegan` seperti perintah brief | Berhenti: skrip mencari `adegan/bersama/tema.ts`, yang tidak ada. Tidak menyalin tema ke adegan. |
| `tema_cek.py .../src` dari akar src | Tidak menandai satu pun file W4; 19 temuan hanya pada kode `pinjam/` dan `papan/` di luar tugas. |
| Skrip tema yang sama pada cakupan W4 | **LULUS**. Direktori QC sementara berisi symlink ke tujuh file adegan/helper W4, uji W4, entry W4, dan tema bersama asli; tidak mengubah skrip atau tema. |
| Still per kelompok kata | Semua 16 kelompok terwakili tepat frame tengah kelompok; ditambah onset, cut, hold, dan frame terakhir: total 69. |
| Batas teks 5% | LULUS untuk seluruh bbox narasi: x ∈ [96,1824], y ∈ [54,1026]. |
| Uji 360 px | Empat gambar dibuka; kata kecil, penekanan dan kalimat kartu tetap terbaca. |
| Integrasi Sequence | P12 f060 = Sequence +30 f090, **0 piksel berbeda**. |
| File terlindungi | SHA-256 awal/akhir sama: PapanFootage `c2e2b4c2d08de367…`, tema `19f913b44b0ceae8…`, naskah `330d93f4856f250b…`. |

Typecheck W4: dari `remotion/`, `npx tsc --noEmit --target ES2020 --module ES2020 --moduleResolution bundler --jsx react-jsx --strict --skipLibCheck --esModuleInterop --lib DOM,ES2020 src/index-w4.ts`.

Still dibuat memakai Remotion renderer 4.0.380 dalam Chromium headless, bundle entry W4, satu browser dipakai ulang dan rendering berurutan. Tidak membuat MP4. Cache/bundle dan pembanding latar berada di RAM `/dev/shm/flat-w4`, supaya tidak mengambil ruang kerja atau cache pekerja lain.

### Kontras minimum per still dan hasil lihat

Metode: setiap frame dirender dua kali, normal dan `tanpaTeks: true`. Mask narasi = selisih RGB maksimum >3; inti huruf = setiap kanal berjarak ≤2 dari fill (17 pada P07, 255 pada adegan footage). Luminansi sRGB dilinearkan dan dihitung dengan bobot 0,2126 / 0,7152 / 0,0722; kontras = (L lebih terang +0,05)/(L lebih gelap +0,05), minimum pada seluruh inti huruf. Pinggir antialias tidak dihitung. Yang diukur adalah VO adegan, bukan tulisan UI atau teks yang sudah ada dalam file Jensen. Bbox memakai seluruh mask, termasuk pinggir huruf. Tabel berikut adalah hasil render terbaru, bukan nilai dari PapanFootage.

#### P07 · minimum 18.73:1

| Still | Yang terlihat setelah dilihat langsung | Min kontras | Sesuai ADEGAN |
|---|---|---|---|
| [P07-w4-f000.png](../media/acuan/adegan/P07-w4-f000.png) | Kartu G4-c, masuk dari bawah melalui mask; “Buat”. | 18.73:1 | Ya |
| [P07-w4-f003.png](../media/acuan/adegan/P07-w4-f003.png) | Kartu G4-c, masuk dari bawah melalui mask; “Buat”. | 18.73:1 | Ya |
| [P07-w4-f011.png](../media/acuan/adegan/P07-w4-f011.png) | Kartu G4-c, putih miring, arsip terbaca; “Buat belajar”; tengah kelompok 0. | 18.73:1 | Ya |
| [P07-w4-f019.png](../media/acuan/adegan/P07-w4-f019.png) | Kartu G4-c, putih miring, arsip terbaca; “Buat belajar”. | 18.73:1 | Ya |
| [P07-w4-f020.png](../media/acuan/adegan/P07-w4-f020.png) | Kartu G4-b, masuk dari bawah melalui mask; “Buat belajar”. | 18.73:1 | Ya |
| [P07-w4-f029.png](../media/acuan/adegan/P07-w4-f029.png) | Kartu G4-b, putih miring, arsip terbaca; “hal”. | 18.73:1 | Ya |
| [P07-w4-f036.png](../media/acuan/adegan/P07-w4-f036.png) | Kartu G4-b, putih miring, arsip terbaca; “hal ini”; tengah kelompok 1. | 18.73:1 | Ya |
| [P07-w4-f058.png](../media/acuan/adegan/P07-w4-f058.png) | Kartu G4-c, putih miring, arsip terbaca; “karena”. | 18.73:1 | Ya |
| [P07-w4-f064.png](../media/acuan/adegan/P07-w4-f064.png) | Kartu G4-b, masuk dari bawah melalui mask; “karena salah”; tengah kelompok 2. | 18.73:1 | Ya |
| [P07-w4-f078.png](../media/acuan/adegan/P07-w4-f078.png) | Kartu G4-c, masuk dari bawah melalui mask; “karena salah satu”. | 18.73:1 | Ya |
| [P07-w4-f087.png](../media/acuan/adegan/P07-w4-f087.png) | Kartu G4-c, putih miring, arsip terbaca; “cara”. | 18.73:1 | Ya |
| [P07-w4-f098.png](../media/acuan/adegan/P07-w4-f098.png) | Kartu G4-b, masuk dari bawah melalui mask; “cara belajar”. | 18.73:1 | Ya |
| [P07-w4-f099.png](../media/acuan/adegan/P07-w4-f099.png) | Kartu G4-b, masuk dari bawah melalui mask; “cara belajar”; tengah kelompok 3. | 18.73:1 | Ya |
| [P07-w4-f111.png](../media/acuan/adegan/P07-w4-f111.png) | Kartu G4-b, putih miring, arsip terbaca; “cara belajar terbaik”. | 18.73:1 | Ya |
| [P07-w4-f117.png](../media/acuan/adegan/P07-w4-f117.png) | Premiere, kedua monitor berisi Jensen, V1 bertambah potongan; narasi di kanvas; “adalah”. | 18.73:1 | Ya |
| [P07-w4-f129.png](../media/acuan/adegan/P07-w4-f129.png) | Premiere, kedua monitor berisi Jensen, V1 bertambah potongan; narasi di kanvas; “adalah meniru”; tengah kelompok 4. | 18.73:1 | Ya |
| [P07-w4-f140.png](../media/acuan/adegan/P07-w4-f140.png) | Premiere, kedua monitor berisi Jensen, V1 bertambah potongan; narasi di kanvas; “adalah meniru”. | 18.73:1 | Ya |
| [P07-w4-f157.png](../media/acuan/adegan/P07-w4-f157.png) | Premiere, kedua monitor berisi Jensen, V1 bertambah potongan; narasi di kanvas; “karya orang”; tengah kelompok 5. | 18.73:1 | Ya |
| [P07-w4-f169.png](../media/acuan/adegan/P07-w4-f169.png) | Premiere, kedua monitor berisi Jensen, V1 bertambah potongan; narasi di kanvas; “karya orang lain,”. | 18.73:1 | Ya |
| [P07-w4-f191.png](../media/acuan/adegan/P07-w4-f191.png) | Premiere, kedua monitor berisi Jensen, V1 bertambah potongan; narasi di kanvas; “karya orang lain,”. | 18.73:1 | Ya |

#### P11 · minimum 5.73:1

| Still | Yang terlihat setelah dilihat langsung | Min kontras | Sesuai ADEGAN |
|---|---|---|---|
| [P11-w4-f000.png](../media/acuan/adegan/P11-w4-f000.png) | G1-a, tangan/pekerjaan jadi latar; kata kecil putih; “Founder”. | 5.78:1 | Ya |
| [P11-w4-f008.png](../media/acuan/adegan/P11-w4-f008.png) | G1-a, tangan/pekerjaan jadi latar; kata kecil putih; “Founder”; tengah kelompok 0. | 5.73:1 | Ya |
| [P11-w4-f012.png](../media/acuan/adegan/P11-w4-f012.png) | G1-b, tangan/pekerjaan jadi latar; kata kecil putih; “Founder itu”. | 5.73:1 | Ya |
| [P11-w4-f020.png](../media/acuan/adegan/P11-w4-f020.png) | G1-b, tangan/pekerjaan jadi latar; jualan di atas penekanan putih; “jualan”. | 6.37:1 | Ya |
| [P11-w4-f024.png](../media/acuan/adegan/P11-w4-f024.png) | F1-a, tangan/pekerjaan jadi latar; jualan di atas penekanan putih; “jualan”. | 8.43:1 | Ya |
| [P11-w4-f030.png](../media/acuan/adegan/P11-w4-f030.png) | F1-a, tangan/pekerjaan jadi latar; jualan di atas penekanan putih; “jualan kepercayaan,”; tengah kelompok 1. | 7.06:1 | Ya |
| [P11-w4-f036.png](../media/acuan/adegan/P11-w4-f036.png) | F1-b, tangan/pekerjaan jadi latar; jualan di atas penekanan putih; “jualan kepercayaan,”. | 6.49:1 | Ya |
| [P11-w4-f042.png](../media/acuan/adegan/P11-w4-f042.png) | F1-b, tangan/pekerjaan jadi latar; jualan di atas penekanan putih; “jualan kepercayaan,”. | 6.32:1 | Ya |
| [P11-w4-f047.png](../media/acuan/adegan/P11-w4-f047.png) | F1-b, tangan/pekerjaan jadi latar; jualan di atas penekanan putih; “jualan kepercayaan,”. | 6.50:1 | Ya |

#### P12 · minimum 6.28:1

| Still | Yang terlihat setelah dilihat langsung | Min kontras | Sesuai ADEGAN |
|---|---|---|---|
| [P12-w4-f000.png](../media/acuan/adegan/P12-w4-f000.png) | Percakapan kelompok, teks di bawah wajah; “dan”. | 11.63:1 | Ya |
| [P12-w4-f008.png](../media/acuan/adegan/P12-w4-f008.png) | Percakapan kelompok, teks di bawah wajah; “dan kita”. | 7.65:1 | Ya |
| [P12-w4-f016.png](../media/acuan/adegan/P12-w4-f016.png) | Percakapan kelompok, teks di bawah wajah; “dan kita”. | 10.21:1 | Ya |
| [P12-w4-f017.png](../media/acuan/adegan/P12-w4-f017.png) | Teman dari belakang, teks putih tengah; “dan kita seringkali”; tengah kelompok 0. | 6.28:1 | Ya |
| [P12-w4-f031.png](../media/acuan/adegan/P12-w4-f031.png) | Teman dari belakang, teks putih tengah; “dan kita seringkali”. | 6.28:1 | Ya |
| [P12-w4-f035.png](../media/acuan/adegan/P12-w4-f035.png) | Siluet, teks di langit kosong; “lebih”. | 18.46:1 | Ya |
| [P12-w4-f044.png](../media/acuan/adegan/P12-w4-f044.png) | Siluet, teks di langit kosong; “lebih”; tengah kelompok 1. | 18.46:1 | Ya |
| [P12-w4-f051.png](../media/acuan/adegan/P12-w4-f051.png) | Potret sekilas di kanan, teks kiri; “lebih mudah”. | 8.54:1 | Ya |
| [P12-w4-f060.png](../media/acuan/adegan/P12-w4-f060.png) | Potret sekilas di kanan, teks kiri; “ingat”. | 9.09:1 | Ya |
| [P12-w4-f065.png](../media/acuan/adegan/P12-w4-f065.png) | Potret sekilas di kanan, teks kiri; “ingat”. | 9.11:1 | Ya |
| [P12-w4-f066.png](../media/acuan/adegan/P12-w4-f066.png) | Orangnya putih besar; kepala siluet berada di bawah teks; “ingat orangnya,”. | 18.78:1 | Ya |
| [P12-w4-f068.png](../media/acuan/adegan/P12-w4-f068.png) | Orangnya putih besar; kepala siluet berada di bawah teks; “ingat orangnya,”; tengah kelompok 2. | 18.85:1 | Ya |
| [P12-w4-f073.png](../media/acuan/adegan/P12-w4-f073.png) | Orangnya putih besar; kepala siluet berada di bawah teks; “ingat orangnya,”. | 18.88:1 | Ya |
| [P12-w4-f081.png](../media/acuan/adegan/P12-w4-f081.png) | Orangnya putih besar; kepala siluet berada di bawah teks; “ingat orangnya,”. | 18.89:1 | Ya |
| [P12-w4-f082.png](../media/acuan/adegan/P12-w4-f082.png) | Scroll malam, profil di kanan, teks kiri dan blur mulai naik; “bukan”. | 7.22:1 | Ya |
| [P12-w4-f095.png](../media/acuan/adegan/P12-w4-f095.png) | Scroll malam, profil di kanan, teks kiri dan blur mulai naik; “bukan videonya.”; tengah kelompok 3. | 6.90:1 | Ya |
| [P12-w4-f101.png](../media/acuan/adegan/P12-w4-f101.png) | Detail jari/ponsel, blur lebih kuat, teks tetap tajam; “bukan videonya.”. | 8.54:1 | Ya |
| [P12-w4-f104.png](../media/acuan/adegan/P12-w4-f104.png) | Detail jari/ponsel, blur lebih kuat, teks tetap tajam; “bukan videonya.”. | 8.39:1 | Ya |
| [P12-w4-f119.png](../media/acuan/adegan/P12-w4-f119.png) | Detail jari/ponsel, blur lebih kuat, teks tetap tajam; “bukan videonya.”. | 7.78:1 | Ya |

#### P14 · minimum 6.58:1

| Still | Yang terlihat setelah dilihat langsung | Min kontras | Sesuai ADEGAN |
|---|---|---|---|
| [P14-w4-f000.png](../media/acuan/adegan/P14-w4-f000.png) | Foto keluarga bertepi putih miring; gerak masuk dibatasi sebelum area teks; latar gambar yang sama blur gelap; “ceritamu,”. | 16.48:1 | Ya |
| [P14-w4-f003.png](../media/acuan/adegan/P14-w4-f003.png) | Foto keluarga bertepi putih miring; gerak masuk dibatasi sebelum area teks; latar gambar yang sama blur gelap; “ceritamu,”. | 16.29:1 | Ya |
| [P14-w4-f010.png](../media/acuan/adegan/P14-w4-f010.png) | Foto keluarga bertepi putih miring; latar gambar yang sama blur gelap; “ceritamu,”; tengah kelompok 0. | 15.72:1 | Ya |
| [P14-w4-f020.png](../media/acuan/adegan/P14-w4-f020.png) | Foto keluarga bertepi putih miring; latar gambar yang sama blur gelap; “ceritamu,”. | 14.94:1 | Ya |
| [P14-w4-f021.png](../media/acuan/adegan/P14-w4-f021.png) | Video jendela bidik di dalam kartu putih; gerak masuk dibatasi sebelum area teks; latar gambar yang sama blur gelap; “sudut”. | 19.38:1 | Ya |
| [P14-w4-f024.png](../media/acuan/adegan/P14-w4-f024.png) | Video jendela bidik di dalam kartu putih; gerak masuk dibatasi sebelum area teks; latar gambar yang sama blur gelap; “sudut”. | 19.40:1 | Ya |
| [P14-w4-f033.png](../media/acuan/adegan/P14-w4-f033.png) | Video jendela bidik di dalam kartu putih; latar gambar yang sama blur gelap; “sudut”. | 19.37:1 | Ya |
| [P14-w4-f038.png](../media/acuan/adegan/P14-w4-f038.png) | Video jendela bidik di dalam kartu putih; latar gambar yang sama blur gelap; “sudut pandangmu,”; tengah kelompok 1. | 19.27:1 | Ya |
| [P14-w4-f043.png](../media/acuan/adegan/P14-w4-f043.png) | Video jendela bidik di dalam kartu putih; latar gambar yang sama blur gelap; “sudut pandangmu,”. | 16.21:1 | Ya |
| [P14-w4-f055.png](../media/acuan/adegan/P14-w4-f055.png) | Video jendela bidik di dalam kartu putih; latar gambar yang sama blur gelap; “sudut pandangmu,”. | 15.71:1 | Ya |
| [P14-w4-f056.png](../media/acuan/adegan/P14-w4-f056.png) | Video sketsa tangan di dalam kartu putih; gerak masuk dibatasi sebelum area teks; latar gambar yang sama blur gelap; “hal”. | 7.81:1 | Ya |
| [P14-w4-f059.png](../media/acuan/adegan/P14-w4-f059.png) | Video sketsa tangan di dalam kartu putih; gerak masuk dibatasi sebelum area teks; latar gambar yang sama blur gelap; “hal”. | 7.43:1 | Ya |
| [P14-w4-f066.png](../media/acuan/adegan/P14-w4-f066.png) | Video sketsa tangan di dalam kartu putih; latar gambar yang sama blur gelap; “hal yang”; tengah kelompok 2. | 7.77:1 | Ya |
| [P14-w4-f078.png](../media/acuan/adegan/P14-w4-f078.png) | Video sketsa tangan di dalam kartu putih; latar gambar yang sama blur gelap; “cuma”. | 7.31:1 | Ya |
| [P14-w4-f079.png](../media/acuan/adegan/P14-w4-f079.png) | Detail buku harian di dalam kartu putih; latar gambar yang sama blur gelap; “cuma”. | 7.15:1 | Ya |
| [P14-w4-f088.png](../media/acuan/adegan/P14-w4-f088.png) | Detail buku harian di dalam kartu putih; latar gambar yang sama blur gelap; “cuma kamu”. | 6.93:1 | Ya |
| [P14-w4-f095.png](../media/acuan/adegan/P14-w4-f095.png) | Detail buku harian di dalam kartu putih; latar gambar yang sama blur gelap; “cuma kamu”; tengah kelompok 3. | 6.69:1 | Ya |
| [P14-w4-f102.png](../media/acuan/adegan/P14-w4-f102.png) | Detail buku harian di dalam kartu putih; latar gambar yang sama blur gelap; “cuma kamu alami.”. | 6.84:1 | Ya |
| [P14-w4-f103.png](../media/acuan/adegan/P14-w4-f103.png) | Detail buku harian di dalam kartu putih; latar gambar yang sama blur gelap; “cuma kamu alami.”. | 7.07:1 | Ya |
| [P14-w4-f110.png](../media/acuan/adegan/P14-w4-f110.png) | Detail buku harian di dalam kartu putih; latar gambar yang sama blur gelap; “cuma kamu alami.”. | 6.94:1 | Ya |
| [P14-w4-f125.png](../media/acuan/adegan/P14-w4-f125.png) | Detail buku harian di dalam kartu putih; latar gambar yang sama blur gelap; “cuma kamu alami.”. | 6.58:1 | Ya |

## P12 · bbox wajah terhadap teks

Koordinat `[x0,y0,x1,y1]` dalam piksel hasil 1920×1080, ujung kanan/bawah eksklusif. Wajah ditandai manual dari still hasil dan dibuat sebagai envelope konservatif per shot; ini bukan hasil detektor wajah. A mencakup tiga kepala percakapan dan guard di tepi kiri: **[285,40,515,300], [1010,60,1285,350], [1575,70,1900,410], [0,350,130,650]**. B mencakup kepala potret beserta ruang geraknya: **[940,70,1780,1080]**. `∅` berarti tidak ada wajah yang terlihat: punggung, siluet tanpa detail wajah, atau tangan/ponsel. Bbox teks adalah union semua tinta narasi yang tampil. Jarak adalah jarak terdekat antar kotak; seluruh irisan = 0.

| Frame | Shot | Bbox teks | Bbox wajah | Jarak minimum | Irisan |
|---|---|---|---|---|---|
| 000 | G2-a | [530, 503, 658, 551] | A | 203.6 px | 0 px² |
| 008 | G2-a | [530, 495, 922, 576] | A | 169.6 px | 0 px² |
| 016 | G2-a | [530, 495, 922, 573] | A | 169.6 px | 0 px² |
| 017 | G2-c | [530, 495, 1388, 573] | ∅ | — | 0 px² |
| 031 | G2-c | [530, 495, 1388, 573] | ∅ | — | 0 px² |
| 035 | G2-b | [269, 503, 431, 552] | ∅ | — | 0 px² |
| 044 | G2-b | [269, 494, 431, 551] | ∅ | — | 0 px² |
| 051 | F2-b | [269, 494, 807, 573] | B | 133.0 px | 0 px² |
| 060 | F2-b | [454, 494, 624, 565] | B | 316.0 px | 0 px² |
| 065 | F2-b | [454, 494, 624, 565] | B | 316.0 px | 0 px² |
| 066 | G2-b | [260, 312, 1654, 677] | ∅ | — | 0 px² |
| 068 | G2-b | [260, 312, 1654, 675] | ∅ | — | 0 px² |
| 073 | G2-b | [260, 312, 1654, 675] | ∅ | — | 0 px² |
| 081 | G2-b | [260, 312, 1654, 675] | ∅ | — | 0 px² |
| 082 | G3-c | [197, 503, 407, 551] | ∅ | — | 0 px² |
| 095 | G3-c | [197, 495, 878, 587] | ∅ | — | 0 px² |
| 101 | G3-a | [197, 495, 878, 587] | ∅ | — | 0 px² |
| 104 | G3-a | [197, 495, 878, 587] | ∅ | — | 0 px² |
| 119 | G3-a | [197, 495, 878, 587] | ∅ | — | 0 px² |

Tambahan visual: shot hero f066–081 memakai crop 1,50→1,56 dengan origin atas; kepala siluet turun ke bagian bawah frame, sedangkan huruf besar selesai jauh di atasnya (lihat f073 dan f081). Potret F2-b hanya f051–065; f066 sudah cut ke komunitas.

## Catatan untuk integrasi

- `TAHAP.md` masih menunjuk penguncian audio, sedangkan tugas ini secara eksplisit membangun visual dari waktu sementara. Tidak mencentang tahap proyek atau mengklaim video final lulus. Uji kontras/bbox di atas berlaku untuk 69 still ini; audit semua frame master, SFX, musik dan VO bukan bagian penyerahan ini.
- Saat VO terkunci, ganti data waktunya melalui alur proyek, lalu render ulang still: jumlah/durasi shot dan nilai kontras perlu diperiksa terhadap timing baru. Wrapper tidak memerlukan perubahan waktu onset manual.
- Perintah contoh: dari `remotion/`, `npx remotion still src/index-w4.ts P12 ../media/acuan/adegan/P12-w4-f060.png --frame=60`. Pembanding latar memakai entry/komposisi/frame sama dengan `--props='{"tanpaTeks":true}'` dan output sementara. Komposisi `W4-Sequence` tersedia untuk memeriksa offset integrasi.
- Doctor awal LULUS. Sesuai brief pekerja, tidak menjalankan peta/fix atau commit. Branch remote yang masih memiliki perubahan `claude/` di luar main sudah dilaporkan sebelum build: `builder-trap-r2-v5`, `codex/builder-trap-r2-v6-audit`, `cursor/skill-load-order-3827`, `siirfannih/storyboard-jadisatu-motion-trojan-v4`, `siirfannih/storyboard-video-marketing`; tidak memakai aturannya.
- Tidak ada pertanyaan produk baru atau biaya baru. Token sesi tidak tersedia dari terminal worker; tidak diestimasi.
