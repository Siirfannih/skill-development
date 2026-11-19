# REPORT · adegan W1 · r3

**Siap ditinjau Sutradara. QA teknis lolos.** W1-3a dan W1-3b dikerjakan sesuai TASK: P01 mulai mengundang konten pada “di”, delapan kartu sudah tiba sebelum “flat”, lalu meneruskan pusaran; P13 berisi delapan bayangan kartu kosong. Seluruh 155 pasangan frame berurutan P01 berubah; tidak ditemukan rentang diam >0,5 detik.

Lihat lebih dulu: [lembar P01](../media/acuan/adegan/P01-r3-lembar.png) · [lembar P13](../media/acuan/adegan/P13-r3-lembar.png) · [P01 sebelum/sesudah](../media/acuan/adegan/P01-r3-sanding.png) · [P13 sebelum/sesudah](../media/acuan/adegan/P13-r3-sanding.png).

## Cakupan dan dasar

- Acuan: BRIEF-ADEGAN, REPORT W1 r1, TASK W1 r3, RESEP/kartu 86, dan D-23. Perubahan khusus dua adegan ini; tidak menjadi aturan global.
- `origin/main` sudah diambil; HEAD awal = `eb5966f`. Doctor awal **LULUS**, termasuk PETA; profil Behindwork **LULUS**. Tidak menjalankan `--fix` atau mengubah PETA.
- Ada commit `claude/` di branch remote di luar main; sudah dilaporkan di percakapan, tidak dipakai sebagai aturan.
- Kode berubah hanya [P01.tsx](../remotion/src/adegan/P01.tsx), [P13.tsx](../remotion/src/adegan/P13.tsx), dan [w1-waktu.tsx](../remotion/src/adegan/w1-waktu.tsx). Pembanding SHA-256 atas 113 file `src/` menunjukkan 110 file lain identik dengan awal tugas.
- Keluaran: 156 PNG P01 (`f000`–`f155`), 7 PNG P13, 2 lembar kontak, 2 lembar sebelum/sesudah; seluruhnya memakai awalan `P01-r3-` atau `P13-r3-`. Tidak ada commit, perubahan dokumen proyek lain, atau render video penuh, mengikuti BRIEF.

## W1-3a · P01

Frame 0 tetap kanvas putih + “Kenapa”. Push seluruh dunia adegan berjalan **1,00→1,04 pada f000→f155**. Garis elips digambar selama kelompok pertama, selesai saat kelompok “yang ada” mulai (f034). Pembacaan DOM: f015 sudah 40,27% tergambar; f030 97,04%; geometri dan token stroke tetap sama.

Delapan raster slop lama dipakai kembali. Kata pemicu diambil dari `kataRelatif('P01')`, mulai “di” sampai sebelum “flat”; kartu dibagi ke kata-kata itu, dan reaksi di dalam kata memakai `react(i)`. Kartu masuk dengan `land`, durasi dari `dur()`. Batas reaksi menyisakan waktu tiba sebelum “flat”, tanpa memaksa kartu selesai masuk sebelum kata berikutnya.

| Pemicu | Kartu mulai masuk, frame lokal | Jumlah kartu setelah onset terakhir |
|---|---|---:|
| di | f050, f052 | 2 |
| sosial | f056, f058 | 4 |
| media | f068 | 5 |
| sekarang | f078, f080 | 7 |
| terasa | f093 | 8 |

Pada waktu sementara ini, masuk berlangsung 6 frame: kartu terakhir sudah tiba di f099, **5 frame sebelum “flat” f104**. Jumlah tersebut diperiksa dari DOM render, termasuk f049 = 0 kartu dan f050 = 1 kartu. Angka frame di laporan adalah hasil naskah, bukan pemicu angka tetap dalam kode.

Orbit renggang bergerak 0,3 rad/detik. Fase sudut tetap berjangkar pada “flat”, sehingga kedatangan lebih awal tidak mengubah fase pusaran yang sudah ada. “mirip-mirip?” memulai perapatan/percepatan pada f120; sapuan tetap f142→f155, termasuk blur mengikuti laju dan kartu terakhir yang menutup layar. Ukuran/peran teks dan isi frasa tidak diubah.

## W1-3b · P13

Delapan kartu kosong memakai tepi putih, radius, dan `BAYANGAN.kartu` dari token, **tanpa Img maupun isi gambar**. Pusat, radius elips, dan kemiringan mengimpor `SUMBU_ORBIT` P01: 50%/50%, rx 35,5% W, ry 28,5% H, sudut −9° beserta drift sumbunya.

Kartu ditempatkan dalam dua busur di lintasan yang sama supaya kiri-kanan frasa panjang tetap lega. Kecepatan 0,025 rad/detik (12× lebih pelan daripada orbit renggang P01; sekitar 7° sepanjang P13). Lapisan kartu berada di belakang teks. Ketujuh still P13 yang diperiksa memiliki 8 kartu, 0 gambar di lapisan kosong, dan **0 perpotongan bounding box kartu dengan teks yang terlihat**. Penekanan “mudah diingat?” dan push P13 tetap seperti sebelumnya.

## Gerbang teknis

| Pemeriksaan terbaru | Hasil |
|---|---|
| `npx tsc --noEmit -p .` dari `remotion/` | **PASS**, exit 0, `TypeScript: No errors found`. Konfigurasi sekarang mencakup `src`, termasuk adegan. |
| `python3 claude/motion-graphic/scripts/juri/motion_lint.py projects/flat-mirip-mirip/remotion/src/adegan` | **PASS**, exit 0. |
| `tema_cek.py projects/flat-mirip-mirip/remotion/src` | 19 temuan lama di `papan/` dan `pinjam/`, seperti r1; tidak ada temuan pada file yang diubah. |
| Checker tema pada pohon sementara dengan symlink 3 sumber yang diubah + tema asli | **LULUS**, exit 0; tidak menyalin atau mengubah tema. |
| `git diff --check` pada 3 sumber yang diubah | **PASS**. |
| PNG P01 | **156/156** utuh, 1920×1080, urutan lengkap f000–f155. |
| P01: pasangan frame berurutan | **155/155 berubah**, 0 pasangan identik. Bahkan pasangan dengan perubahan terkecil, f001→f002, memiliki 55 piksel RGB berubah. |
| P01: seluruh jendela bergeser 15 frame / 0,5 detik | **141/141 berubah**; minimum f001→f016 = **10.832 piksel** dengan selisih ≥4 pada setidaknya satu kanal RGB. |
| P13: jumlah/isi/jarak pada 7 still | **PASS**: 8 kartu kosong, 0 Img, 0 perpotongan kotak teks. |
| Regresi P02 f005, P03 f040, P15 f022 | **3/3 identik, 0 piksel RGB berbeda** terhadap render kontrol memakai helper sebelum tugas dan aset saat ini. Hanya pembanding sementara yang dirender; sumber/PNG adegan itu tidak diubah. |
| Standalone vs W1Sequence, pipeline still yang sama | **2/2 identik, 0 piksel RGB berbeda**: P01 f130 (master f130) dan P13 f124 (master f1552). |

Kontrol regresi memakai helper yang disimpan sebelum edit, bukan PNG r1 lama: snapshot lama berbeda dari render saat ini sehingga tidak dipakai untuk menyimpulkan regresi. Perbandingan Sequence P01 juga memakai dua `renderStill`; PNG audit P01 dibuat dengan `renderFrames`. Artefak pengukuran dan skrip pemeriksa ada di `/mnt/ssd-win/flat-w1-r3-check/`, tanpa menambah berkas QC di proyek.

## Bukti rentang P01

Jumlah berikut dihitung dari PNG terbaru; ambang ≥4 menghindari menyamakan perubahan sangat kecil dengan bukti gerak yang berarti. Pemeriksaan ini membuktikan perubahan piksel, sedangkan komposisi dinilai pada still di bawah.

| Pasangan frame | Piksel berubah ≥4 RGB |
|---|---:|
| f000→f001 | 2.141 |
| f000→f015 | 11.393 |
| f015→f030 | 16.028 |
| f030→f045 | 32.271 |
| f045→f060 | 210.709 |
| f060→f075 | 327.045 |
| f075→f090 | 428.464 |
| f090→f105 | 487.033 |
| f105→f120 | 511.455 |
| f120→f135 | 615.221 |
| f135→f150 | 2.028.770 |
| f150→f155 | 1.180.978 |

Tidak ada dua frame berurutan yang identik; rentang gambar identik terpanjang hanya satu frame (1/30 detik), jauh di bawah 0,5 detik.

## Still yang dilihat

Semua titik wajib berikut sudah saya lihat pada lembar kontak terbaru. Tambahan onset, orbit, dan sapuan tercakup di lembar P01; P13 f146 juga dibuka penuh. Ini pemeriksaan pekerja, bukan persetujuan kreatif Sutradara.

| Still | Yang terlihat |
|---|---|
| [P01-r3-f000](../media/acuan/adegan/P01-r3-f000.png) | “Kenapa” di putih; belum ada kartu atau garis lengkap. Sesuai batas frame 0 TASK. |
| [P01-r3-f015](../media/acuan/adegan/P01-r3-f015.png) | “Kenapa banyak”; garis elips sedang memanjang dari kanan. |
| [P01-r3-f030](../media/acuan/adegan/P01-r3-f030.png) | “Kenapa banyak video”; elips hampir selesai. |
| [P01-r3-f017](../media/acuan/adegan/P01-r3-f017.png) · kelompok 1 | Dua kata terlihat; draw-on masih berjalan. |
| [P01-r3-f042](../media/acuan/adegan/P01-r3-f042.png) · kelompok 2 | “yang” pada elips lengkap; kata berikut belum muncul. |
| [P01-r3-f064](../media/acuan/adegan/P01-r3-f064.png) · kelompok 3 | “di sosial” dengan empat kartu yang sudah berdatangan di lintasan. |
| [P01-r3-f091](../media/acuan/adegan/P01-r3-f091.png) · kelompok 4 | “sekarang” dengan tujuh kartu mengorbit; kartu terakhir menyusul pada “terasa”. |
| [P01-r3-f112](../media/acuan/adegan/P01-r3-f112.png) · kelompok 5 | “flat” menjadi fokus, dikelilingi delapan kartu. |
| [P01-r3-f130](../media/acuan/adegan/P01-r3-f130.png) · kelompok 6 | “mirip-mirip?” tetap tajam; orbit merapat dan kartu ber-blur searah geraknya. |
| [P01-r3-f153](../media/acuan/adegan/P01-r3-f153.png) | Kartu penyapu mengisi layar; tidak ada bidang putih kosong. |
| [P01-r3-f154](../media/acuan/adegan/P01-r3-f154.png) | Sapuan mendekati framing akhir, raster tetap menutup layar. |
| [P01-r3-f155](../media/acuan/adegan/P01-r3-f155.png) | Raster memenuhi layar, siap cut; mekanik penutup tetap. |
| [P13-r3-f009](../media/acuan/adegan/P13-r3-f009.png) · kelompok 1 | “Jadi” dan delapan bayangan kartu kosong. |
| [P13-r3-f031](../media/acuan/adegan/P13-r3-f031.png) · kelompok 2 | “yang membuat”; kartu berada di dua busur di luar teks. |
| [P13-r3-f056](../media/acuan/adegan/P13-r3-f056.png) · kelompok 3 | “video”, kemudian “tetap” mulai terungkap; orbit kosong tetap terlihat. |
| [P13-r3-f081](../media/acuan/adegan/P13-r3-f081.png) · kelompok 4 | “spesial,” sebelum “unik”; delapan kartu tidak kembali berisi gambar. |
| [P13-r3-f114](../media/acuan/adegan/P13-r3-f114.png) · kelompok 5 | “dan” di atas “mudah”; bayangan tidak menutup teks. |
| [P13-r3-f124](../media/acuan/adegan/P13-r3-f124.png) · tambahan | “dan / mudah diingat?” lengkap dengan tanda tanya, ruang di kiri-kanan tetap terbaca. |
| [P13-r3-f146](../media/acuan/adegan/P13-r3-f146.png) · tambahan | Pertanyaan ditahan sampai akhir; kartu bergeser sangat pelan, tetap di luar kotak teks. |

## Batas penyerahan

Waktu masih `SUMBER_WAKTU = sementara`. Semua onset masuk kartu, perapatan, draw-on, dan sapuan mengikuti kata/kelompok atau proporsi rentangnya; sinkron VO final menyusul. Audit piksel seluruh P01 dan still terpilih tidak menggantikan audit kreatif seluruh video oleh Sutradara. Audio/SFX/musik tidak dikerjakan dalam TASK ini.

Tidak ada pertanyaan yang menahan pekerjaan. Token sesi tidak tersedia sebagai angka terukur; tidak diestimasi.
