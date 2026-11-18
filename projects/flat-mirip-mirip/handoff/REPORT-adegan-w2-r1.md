# REPORT adegan w2 r1 · P04, P05, P06

Kartu review · flat-mirip-mirip-adegan-w2-r1

Berubah: P04 unggah → prompt → kirim/flash; P05 feed makin cepat → masuk unggahan; P06 bedah ilustrasi slop sampai lapisannya terakit kembali.
Coba: buka [lembar P04](../media/acuan/adegan/P04-lembar-r1.png), [lembar P05](../media/acuan/adegan/P05-lembar-r1.png), [lembar P06](../media/acuan/adegan/P06-lembar-r1.png); untuk prompt lengkap lihat [P04 f105](../media/acuan/adegan/P04-f105.png), untuk kartu lengkap lihat [P06 f244](../media/acuan/adegan/P06-f244.png).
Bukti: dua typecheck lulus, motion_lint PASS, tema W2 LULUS; 17 still tengah kelompok + 17 still gerak, 7 still Sequence identik, 3 lembar ringkasan.
Butuh keputusanmu: penilaian visual Sutradara atas still; tidak ada pertanyaan implementasi yang menahan tugas.
Jawab: ✅ flat-mirip-mirip-adegan-w2-r1 | 🔁 flat-mirip-mirip-adegan-w2-r1: catatan | ❓ flat-mirip-mirip-adegan-w2-r1

Status: implementasi dan gerbang teknis selesai; siap dinilai Sutradara. Ini bukan putusan juri video final. Agen: Codex. Basis main: `f2851a8`. Waktu naskah masih SEMENTARA.

## File

| File | Isi |
|---|---|
| `remotion/src/adegan/P04.tsx` | Ekspor `P04`; AppClaudeTerang bersama, drag chip, kamera composer, prompt D-11, kirim, Flash. |
| `remotion/src/adegan/P05.tsx` | Ekspor `P05`; BingkaiIPhone + BerandaIG bersama, 12 unggahan, scroll berkurva, blur vertikal, punch-in. |
| `remotion/src/adegan/P06.tsx` | Ekspor `P06`; raster slop, tumpukan, grid, bagian KartuSlop, rakit ulang. Seluruhnya ilustrasi. |
| `remotion/src/adegan/w2-kata.tsx` | Wrapper kelompok VO/waktu komposisi, penempatan KataKecil/KataTekan, serta KanvasW2 yang menunggu commit DOM setelah font dimuat. |
| `remotion/src/adegan/uji-w2.tsx` | `UjiRoot`: Composition P04/P05/P06 dan `W2-sequence` untuk menguji posisi waktu di master. |
| `remotion/src/index-w2.ts` | `registerRoot(UjiRoot)`. |
| `media/acuan/adegan/P04-*.png`, `P05-*.png`, `P06-*.png` | 41 still 1920×1080 dan 3 lembar ringkasan. |
| `handoff/REPORT-adegan-w2-r1.md` | Laporan ini. |

Komponen bersama, tema, naskah, Root/index utama tidak diubah. Tidak commit atau render video penuh, sesuai BRIEF. PETA tidak diperbarui karena di luar FILE BOLEH. Preflight `doctor.sh` LULUS; `profil_cek.py /home/irfan/work/data-video/merek/behindwork` LULUS. Branch belum merge yang menyentuh `claude/` telah dilaporkan di percakapan; aturan yang dipakai tetap main terbaru. Papan acuan r1, contact sheet Tesla dan kedelapan keyframe 86 dibuka; kartu teks tidak dibaca, sesuai brief pekerja. README contoh gagal dan gambar terkait komposisi/UI/teks juga dibuka.

## Penguncian gerak ke kata

Semua waktu gerak berasal dari `kataRelatif(id)` dan durasi `NASKAH[id]`, memakai fps komposisi. Angka frame berikut hanya hasil ukur data saat ini, bukan pemicu tetap di adegan.

| Adegan / gerak | Pemicu dan kurva | Hasil dengan waktu sementara |
|---|---|---|
| P04 kamera | Mulai pada `banyak`, selesai sampai onset `semakin`; `heavy`, kemudian napas `drift` sepanjang adegan. | Lebar 0,82× → composer ±1,50×, tanpa memindahkan narasi ke kolom prompt. |
| P04 chip | Prop lampiran aktif pada onset `video`; wrapper lokal menggeser chip asli dari kanan atas menuju posisi composer, selesai pada `semakin`, kurva `land`. | f31–f41; blur hanya dari kecepatan drag. Tidak membuat chip/UI kedua. |
| P04 ketik | Mulai pada `semakin`; selesai pada akhir `menit,` dikurangi 30% durasi kata terakhir; cps dihitung ulang dari panjang prompt dan jendela ini. | 70 karakter, f41–f105, **32,8135 cps**; akhir VO `hitungan menit,` = f108. |
| P04 kirim/flash | Tombol kirim pada durasi adegan dikurangi 3 frame; Flash pada durasi dikurangi 2 frame. | Kirim f117; Flash f118–119, lalu cut. Prompt lengkap sudah tertahan sebelum kirim. |
| P05 scroll | Sepanjang durasi beat; `0,18 × progres + 0,82 × move(..., 'leave')`, sehingga kecepatan awal sedang lalu meningkat. | Posisi f0/f12/f24/f36/f47: 120 / 403,73 / 940,52 / 1934,23 / 4223,63 px; kecepatan pada f12/f24/f36/f47: 31,78 / 57,82 / 111,57 / 407,79 px per frame. |
| P05 blur | Besar blur Y berasal dari selisih posisi scroll frame sekarang dan sebelumnya, maksimal 14 px dalam koordinat feed. | Hanya isi feed yang blur; status bar, wordmark, ikon tab dan bingkai tetap tajam sebelum punch. |
| P05 isi feed | Urutan: k1-01, k1-05, k2-01, k1-02, k1-01, k3-02, k1-01, k1-03, k1-05, k2-02, k1-01, k1-04. | Dominan k1 berulang, diselingi k2/k3; akun/caption bawaan adegan adalah isi UI fiktif. |
| P05 punch | Setelah kata terakhir selesai, kurva `heavy` menuju pusat media unggahan ketujuh k1-01. | f44–f47. Label tidak tertimpa iPhone yang membesar; gambar memenuhi frame di akhir. Ekornya pendek karena durasi sementara P05 hanya 48 frame. |
| P06 pembuka | Hard cut pada awal kelompok `Coba perhatiin`, `video yang dibuat`, `AI di berandamu:`; k1-01 → k1-05 → k1-02, push `drift` per kelompok. | Unggahan diperbesar memenuhi layar; crop menjaga kepala di bawah teks putih. Overlay tinta 64% untuk kontras. |
| P06 tumpukan | Pada `visual`, 3 k3 masuk dari kanan dengan `land`; jeda `react(urutan)` dan durasi dari jarak/bobot. | k3-01/k3-02/k3-03 bertumpuk miring; blur berasal dari kecepatan masuk. |
| P06 grid | Pada `mirip`, masuk per baris dengan `react(baris)` dan `land`; tetap pada `satu sama lain,`. | Grid 3×3 k1-01/k1-05/k1-01 berulang. Selama masuk, tepi yang belum mendarat boleh melewati frame; hasil grid utuh tetap dalam margin. |
| P06 latar | Pada `latar krem`, hanya `KartuSlop bagian="latar"`; pada `warna-warni,`, fill bergeser krem → peach → mawar dengan `heavy`. | Warna hanya dari PENGECUALIAN tema, lewat wrapper CSS lokal. Kanvas luar tetap putih. |
| P06 siluet | Cut pada `siluet`; hanya `bagian="siluet"` seed 7, posisi dihitung dari pusat sosok seed yang sama. | Sosok berada di pusat kanvas; narasi di kiri pada garis tengah, tanpa menutup kepala. |
| P06 rakit | Pada `dan`, latar/matahari/gunung/siluet/teks bergerak dari arah berbeda dengan `react` + `land`; seed dan koordinat tiap lapisan tetap sama. | Terakit menjadi satu KartuSlop. `dan` kecil diganti pada onset `AI`; `AI` dan `Slop.` memakai dua KataTekan merah dengan posisi satu baris, masing-masing mengikuti onset sendiri. |

Wrapper teks memilih kelompok `kelompok` dari naskah dahulu, agar komponen bersama tidak menggabungkan tiap tiga kata lintas frasa. Onset dikonversi ke waktu komposisi melalui selisih frame global dan lokal; teks kelompok tertahan sampai kelompok berikutnya. Narasi tetap hanya satu lapisan. KanvasW2 mengatasi balapan antara `Fonts.setState` dan pelepasan `delayRender` tanpa mengubah Fonts bersama: gerbang tambahan baru dilepas dalam layout effect anak setelah DOM dengan font selesai dipasang.

## Pemeriksaan

| Perintah / cek | Hasil |
|---|---|
| Dari `remotion/`: `npx tsc --noEmit -p .` | LULUS, exit 0, `TypeScript: No errors found`. |
| Dari `remotion/`: `npx tsc --noEmit --target ES2020 --module ES2020 --moduleResolution bundler --jsx react-jsx --strict --skipLibCheck --esModuleInterop --resolveJsonModule --lib DOM,ES2020 src/index-w2.ts` | LULUS, exit 0. Tambahan ini penting: include tsconfig utama belum memasukkan entry/adegan W2. |
| `python3 claude/motion-graphic/scripts/juri/motion_lint.py projects/flat-mirip-mirip/remotion/src/adegan` | **PASS**, exit 0. |
| `tema_cek.py .../remotion/src/adegan` sesuai teks kontrak | Tool berhenti karena mencari `adegan/bersama/tema.ts`; path ini tidak cocok dengan struktur proyek. Tidak menyalin/mengubah tema ke adegan. |
| `python3 claude/motion-graphic/scripts/juri/tema_cek.py projects/flat-mirip-mirip/remotion/src` | Tidak menandai file W2; exit 1 karena **19 file lama** di `pinjam/` dan `papan/`, di luar tugas. |
| tema_cek pada direktori sementara berisi symlink 6 file W2 + symlink `bersama/tema.ts` asli | **LULUS: gaya adegan hanya dari tema.ts.**, exit 0; bukan pemeriksaan yang melewati aturan warna. Cara reproduksi di bawah. |
| Ukuran dan cakupan still | 34/34 still adegan 1920×1080; 17/17 kelompok naskah memiliki still titik tengah. Ditambah 7 still Sequence dan 3 lembar. |
| W2-sequence vs mandiri | **7/7 pasangan identik, 0 piksel berbeda** dengan PIL ImageChops. Frame global/lokal: P04 321/105, 333/117, 334/118; P05 371/35; P06 457/73, 628/244, 659/275. |
| Render ulang cache font | P04 f117, P06 f125, P06 f275 masing-masing dirender 3×; **9/9 identik** dengan still final. Teks tetap tampil. |
| Flash | f118 dan f119 seluruh piksel RGB = 255; f117 masih UI dengan narasi dan tombol kirim aktif. |
| Kontras narasi | Tinta/putih **18,883:1**; merah/putih **5,121:1**; putih pada ilustrasi dengan overlay tinta 64% minimal **5,684:1**, bahkan pada piksel sumber putih. Nilai dihitung sRGB dari token. |

Reproduksi tema W2, dari root repo (direktori cek sementara otomatis dibuang):

```bash
python3 - <<'PY'
from pathlib import Path
import tempfile, subprocess
root = Path.cwd()
src = root / 'projects/flat-mirip-mirip/remotion/src'
with tempfile.TemporaryDirectory(prefix='w2-tema-') as d:
    p = Path(d)
    (p / 'bersama').mkdir()
    (p / 'bersama/tema.ts').symlink_to(src / 'bersama/tema.ts')
    for name in ['P04.tsx', 'P05.tsx', 'P06.tsx', 'w2-kata.tsx', 'uji-w2.tsx']:
        (p / name).symlink_to(src / 'adegan' / name)
    (p / 'index-w2.ts').symlink_to(src / 'index-w2.ts')
    result = subprocess.run(['python3', str(root / 'claude/motion-graphic/scripts/juri/tema_cek.py'), d])
    raise SystemExit(result.returncode)
PY
```

Still dibuat lewat bundler + `renderStill` Remotion 4.0.380, PNG resolusi penuh, dari entry W2. Reproduksi satu still lewat CLI dari `remotion/`:

```bash
npx remotion still src/index-w2.ts P04 ../media/acuan/adegan/P04-f105.png --frame=105
```

## Still tengah kelompok · sudah dilihat

Titik tengah dihitung `round((mulai kata pertama + selesai kata terakhir) / 2 × fps)`. Karena kata baru muncul pada onset, beberapa titik tengah memang belum menampilkan kata terakhir kelompok. Itu bukan kata yang dihilangkan; misalnya `video` baru masuk satu frame setelah still P04 f030. Nama kelompok lengkap tercantum untuk membantu penilaian.

| Kelompok | Still | Yang terlihat / kecocokan ADEGAN |
|---|---|---|
| P04 · dan membuat | [f010](../media/acuan/adegan/P04-f010.png) | UI Claude lebar; dua kata hitam berjarak di garis tengah, composer masih kosong. Sesuai. |
| P04 · banyak video | [f030](../media/acuan/adegan/P04-f030.png) | Kamera sedang masuk ke composer; `banyak` sudah tampil, `video` dan lampirannya masuk pada onset berikutnya. Sesuai tahap waktu. |
| P04 · semakin mudah | [f051](../media/acuan/adegan/P04-f051.png) | Chip video.mp4 sudah mendarat, prompt mulai `Claude ple`; `semakin` berada di luar composer. Sesuai. |
| P04 · diedit dalam | [f073](../media/acuan/adegan/P04-f073.png) | `diedit` di atas composer; prompt sudah sampai bagian `... this vid`. Sesuai. |
| P04 · hitungan menit, | [f096](../media/acuan/adegan/P04-f096.png) | `hitungan` di luar kolom, prompt hampir lengkap sampai `... professional vi`; ketikan selesai sebelum akhir frasa. Sesuai. |
| P05 · tapi rasanya | [f013](../media/acuan/adegan/P05-f013.png) | iPhone di tengah, dua kata di kiri, feed siluet/krem berulang bergerak. Sesuai. |
| P05 · AI-slop. | [f035](../media/acuan/adegan/P05-f035.png) | KataTekan hitam besar di kiri dengan margin aman; feed bergerak cepat, chrome iPhone tetap tajam. Sesuai. |
| P06 · Coba perhatiin | [f013](../media/acuan/adegan/P06-f013.png) | Media k1-01 memenuhi frame, teks putih di atas kepala siluet. Sesuai. |
| P06 · video yang dibuat | [f042](../media/acuan/adegan/P06-f042.png) | Cut ke k1-05; `video yang` muncul sebelum `dibuat`, kepala berada di bawah teks. Sesuai. |
| P06 · AI di berandamu: | [f073](../media/acuan/adegan/P06-f073.png) | Cut ke k1-02; tiga kata putih, muka siluet bebas dari teks. Sesuai. |
| P06 · visual berantakan, | [f104](../media/acuan/adegan/P06-f104.png) | Tiga k3 penuh warna bertumpuk miring di kanan; dua kata hitam di kiri. Sesuai. |
| P06 · mirip | [f125](../media/acuan/adegan/P06-f125.png) | Grid sedang masuk per baris; dua baris hampir mendarat dan baris terakhir menyusul. Kata `mirip` tetap terbaca. Sesuai gerak. |
| P06 · satu sama lain, | [f145](../media/acuan/adegan/P06-f145.png) | Grid 3×3 utuh, gambar k1 berulang; `satu sama` tampil, `lain,` mengikuti onset. Sesuai. |
| P06 · latar krem | [f169](../media/acuan/adegan/P06-f169.png) | Hanya bidang krem dari KartuSlop di kanan, `latar` di kiri; kata `krem` menyusul. Sesuai pemisahan lapisan. |
| P06 · warna-warni, | [f189](../media/acuan/adegan/P06-f189.png) | Bidang yang sama bergeser ke pastel peach; tidak ada siluet/gunung. Sesuai. |
| P06 · siluet orang, | [f212](../media/acuan/adegan/P06-f212.png) | Hanya siluet vektor di pusat kanvas, `siluet` di kiri; `orang,` menyusul onset berikut. Sesuai. |
| P06 · dan AI Slop. | [f236](../media/acuan/adegan/P06-f236.png) | `AI` merah sudah masuk, `Slop.` belum diucapkan; beberapa lapisan sedang menuntaskan rakitan. Sesuai tahap waktu. |

## Still gerak · sudah dilihat

| Still | Yang terlihat / kecocokan ADEGAN |
|---|---|
| [P04 f000](../media/acuan/adegan/P04-f000.png) | UI lebar dan kata pertama `dan` langsung masuk pada cut. Sesuai. |
| [P04 f033](../media/acuan/adegan/P04-f033.png) | Chip video.mp4 sedang diseret ke composer dengan motion blur; `banyak video` terlihat di atasnya. Sesuai. |
| [P04 f041](../media/acuan/adegan/P04-f041.png) | Kamera telah mengunci composer, chip mendarat dan caret siap mengetik. Sesuai. |
| [P04 f105](../media/acuan/adegan/P04-f105.png) | Prompt D-11 lengkap persis, `hitungan menit,` masih tampil di luar kolom. Sesuai. |
| [P04 f117](../media/acuan/adegan/P04-f117.png) | Prompt lengkap, tombol kirim tertekan, narasi tertahan sampai flash. Sesuai. |
| [P04 f118](../media/acuan/adegan/P04-f118.png) | Flash putih penuh, frame pertama. Sesuai. |
| [P04 f119](../media/acuan/adegan/P04-f119.png) | Flash putih penuh, frame kedua sebelum cut. Sesuai. |
| [P05 f000](../media/acuan/adegan/P05-f000.png) | Beranda Instagram dan unggahan pertama k1-01 jelas; kata `tapi` mulai tampil. Sesuai. |
| [P05 f038](../media/acuan/adegan/P05-f038.png) | Feed makin cepat, `AI-slop.` masih terbaca utuh di kiri sebelum punch. Sesuai. |
| [P05 f044](../media/acuan/adegan/P05-f044.png) | Akhir VO; label selesai, feed masih laju dan punch baru dimulai. Sesuai pemisahan fokus. |
| [P05 f045](../media/acuan/adegan/P05-f045.png) | Kamera mendekati media, iPhone membesar, blur vertikal mengikuti scroll. Sesuai transisi. |
| [P05 f046](../media/acuan/adegan/P05-f046.png) | Push sangat dekat melewati chrome ponsel; belum mendarat pada unggahan tujuan. Sesuai transisi cepat. |
| [P05 f047](../media/acuan/adegan/P05-f047.png) | K1-01 mengisi layar dengan jejak gerak vertikal; siap hard cut ke ilustrasi sama pada P06. Sesuai. |
| [P06 f122](../media/acuan/adegan/P06-f122.png) | Baris pertama grid masuk, baris berikut menyusul; `mirip` tidak hilang. Sesuai react. |
| [P06 f128](../media/acuan/adegan/P06-f128.png) | Ketiga baris hampir mendarat; `mirip` tertahan sampai kelompok berikut. Sesuai. |
| [P06 f244](../media/acuan/adegan/P06-f244.png) | `AI Slop.` merah lengkap di kiri, lima lapisan menjadi satu kartu di kanan. Sesuai. |
| [P06 f275](../media/acuan/adegan/P06-f275.png) | Kartu dan penekanan tetap lengkap pada frame terakhir, dengan push halus; siap hard cut. Sesuai. |

## Still integrasi dan lembar · sudah dilihat

| Still | Yang terlihat / kecocokan |
|---|---|
| [P04 Sequence f321](../media/acuan/adegan/P04-sequence-f321.png) | Identik P04 f105: prompt lengkap dan narasi. |
| [P04 Sequence f333](../media/acuan/adegan/P04-sequence-f333.png) | Identik P04 f117: kirim tertekan, teks masih tampil. |
| [P04 Sequence f334](../media/acuan/adegan/P04-sequence-f334.png) | Identik P04 f118: flash pada waktu global yang benar. |
| [P05 Sequence f371](../media/acuan/adegan/P05-sequence-f371.png) | Identik P05 f035: label tidak mendahului atau tertinggal dari feed. |
| [P06 Sequence f457](../media/acuan/adegan/P06-sequence-f457.png) | Identik P06 f073: tiga kata mengikuti waktu relatif adegan. |
| [P06 Sequence f628](../media/acuan/adegan/P06-sequence-f628.png) | Identik P06 f244: kartu dan penekanan terakit utuh. |
| [P06 Sequence f659](../media/acuan/adegan/P06-sequence-f659.png) | Identik P06 f275: teks bertahan hingga akhir adegan di master. |
| [P04 lembar](../media/acuan/adegan/P04-lembar-r1.png) | Lima titik tengah kelompok memperlihatkan gerak lebar → composer → ketikan. |
| [P05 lembar](../media/acuan/adegan/P05-lembar-r1.png) | Dua titik tengah memperlihatkan perbandingan KataKecil dan KataTekan, chrome yang sama dengan papan. |
| [P06 lembar](../media/acuan/adegan/P06-lembar-r1.png) | Sepuluh titik tengah menunjukkan urutan bedah lengkap; kata terakhir frasa belum tentu muncul pada titik tengah. |

## Batas hasil / titik lanjut

- Penilaian ini atas still dan ukuran teknis. Belum ada audit seluruh frame atau penilaian gerak real time oleh Sutradara; tidak mengklaim video final lulus.
- Belum dikunci ke VO aktual. Setelah `naskah.ts` diganti, render ulang still tengah kelompok dan periksa khusus ekor pendek punch P05 serta urutan lapisan P06. Rumus mengikuti kata/kelompok, tetapi nama file still saat ini merekam timing sementara.
- Suara, SFX, musik, serta perakitan master berada pada tugas Sutradara; adegan ini tidak menambah audio.
- Tidak ada kekurangan props bersama yang perlu diubah: drag chip, pergantian fill latar, posisi teks, adaptasi waktu, dan kesiapan DOM ditangani wrapper lokal.
- Kuota/token sesi tidak tersedia dari alat; tidak diestimasi sebagai angka pemakaian.
