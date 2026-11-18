# REPORT editor isi r1

Status: **siap ditinjau; QA teknis lolos**. Acuan: D-17 dan `TASK-editor-isi-r1.md`.

UjiB f60–119 dan UjiC f45–89 sekarang memakai video jadi Jensen Huang melalui `OffthreadVideo` dan `staticFile`. Source Monitor Premiere memakai video mentah F2-b. Kode yang berubah hanya `UjiB.tsx` dan `UjiC.tsx`; keluaran lain hanya laporan ini dan still `E-*.png`.

## Pilihan isi

Jensen dipilih juga untuk Premiere karena wajah dan penekanan besar “HIGH EXPECTATIONS” terbaca di monitor kecil. Contact sheet proxy SDJ memperlihatkan adegan UI/timeline pada detik 2–3; memilih Jensen menghindari isi itu. Program dimulai pada detik 0,50 supaya still f070 memperlihatkan penekanan tersebut. Rasio video dipertahankan dengan `objectFit: contain`.

Studio memakai komposisi `JensenHuang`, `JensenHuang-Vertical`, `Thumbnail`, dan `Intro`, dengan `JensenHuang` aktif. Lima baris `<Sequence>` mengikuti potongan Jensen, ditambah `voice.wav` dan `music.mp3` sepanjang 14 detik. Posisi genggaman Clawd memakai fungsi posisi playhead yang sama dengan Studio dan durasi 420 frame.

Premiere memakai lima klip berurutan di V1, `voice.wav` di A1, dan `music.mp3` di A2. Nama klip adalah label demo yang diminta brief, bukan klaim nama berkas dalam proyek sumber Jensen.

| Potongan | Rentang brief (detik) | Batas frame 30 fps, akhir eksklusif | Label Premiere |
|---|---|---|---|
| 1 | 0–3,47 | 0–104 | `A001_jensen.mov` |
| 2 | 3,47–6,07 | 104–182 | `broll_kelulusan.mp4` |
| 3 | 6,07–8,00 | 182–240 | `A001_jensen.mov` |
| 4 | 8,00–9,03 | 240–271 | `A001_jensen_CU.mov` |
| 5 | 9,03–14,00 | 271–420 | `broll_arsip.mp4` |

Batas detik dibulatkan ke frame terdekat. Kedua demo tetap 30 fps sesuai entry yang sudah ada.

## Still wajib dan frame sumber

Nomor frame sumber di bawah dihitung dari nol.

| Still | Entry / komposisi | Frame video yang tampil | Isi yang dilihat |
|---|---|---|---|
| [E-studio-f090.png](../media/acuan/komponen/E-studio-f090.png) | `src/indexB.ts` / `UjiB`, f090 | Jensen **f195, 6,500 detik** | Jensen menghadap kanan, teks “how to teach”; playhead Studio 195 / `00:06.15`; Clawd memegang garis playhead |
| [E-premiere-f070.png](../media/acuan/komponen/E-premiere-f070.png) | `src/indexC.ts` / `UjiC`, f070 | Program: Jensen **f040, 1,333 detik**; Source: F2-b **f025, 0,833 detik** | Program: Jensen + “HIGH EXPECTATIONS”; Source: pria berkemeja biru; playhead/program `00:00:01:10` |

Sinkronisasi Studio: `frame video = playhead = 165 + (frame UjiB − 60)`, yaitu f165–224 sepanjang bagian Studio. `trimBefore={165}` memberikan offset yang sama pada video, dengan kecepatan 1×.

Sinkronisasi Premiere: `frame video Program = 15 + (frame UjiC − 45)`, yaitu f015–059; playhead dalam detik = frame itu / 30. `Sequence from={45}` memberi waktu lokal kepada kedua video; Source berjalan dari f000–044. Tidak memakai `Freeze`, still sebagai media, atau PNG di preview/monitor. Ketiga `OffthreadVideo` diberi `muted`.

Rujukan API: [OffthreadVideo dan trimBefore](https://www.remotion.dev/docs/offthreadvideo), [waktu lokal Sequence](https://www.remotion.dev/docs/sequence). Implementasi diperiksa dengan tipe paket lokal versi 4.0.380.

Pencocokan crop monitor terhadap frame hasil decode MP4 menghasilkan korelasi piksel 0,996318 (Studio f195), 0,999215 (Program f040), dan 0,999352 (Source f025). Perbandingan memperhitungkan ukuran monitor; resampling dan kompresi membuat piksel tidak identik.

## Pemeriksaan

- **PASS TypeScript proyek:** `./node_modules/.bin/tsc --noEmit`, dijalankan dari `projects/flat-mirip-mirip/remotion`.
- **PASS TypeScript kedua entry:** perintah di bawah memeriksa UjiB dan UjiC secara langsung, termasuk bila tidak terjangkau entry utama.
- **PASS runtime:** dua still wajib berhasil dirender dan dibuka. Pemeriksaan tambahan memakai bundler/renderer Remotion 4.0.380, entry yang sama, dan satu browser yang dipakai ulang; 0 console error dan 0 warning.
- **PASS gerak video:** [Studio f060](../media/acuan/komponen/E-studio-f060.png) → [f119](../media/acuan/komponen/E-studio-f119.png) memperlihatkan foto kelulusan → Jensen. [Premiere f045](../media/acuan/komponen/E-premiere-f045.png) → [f089](../media/acuan/komponen/E-premiere-f089.png) memperlihatkan perubahan wajah/teks dan posisi playhead. Area video yang berubah lebih dari 12 tingkat RGB: Studio 90,049%; Program Premiere 15,407%; Source 19,147%.
- **PASS regresi:** [Claude f030](../media/acuan/komponen/E-claude-f030.png) dan [Instagram f030](../media/acuan/komponen/E-instagram-f030.png) dibandingkan dengan still sebelum edit: masing-masing **0 dari 2.073.600 piksel berubah**. Cabang kode Claude f0–59, cabang Instagram f0–44, dan daftar akun Instagram juga identik dengan basis sebelum edit.
- **PASS cakupan:** SHA-256 68 file yang dijaga tetap sama, mencakup komponen bersama di `src/bersama`, `tema.ts`, `Root*.tsx`, `index*.ts`, dan `pinjam/**` yang ada saat pemeriksaan awal. `PapanFootage.tsx` tidak diedit; file itu tidak termasuk manifest hash ini. `git diff --check` pada kedua file sumber lulus.

```bash
./node_modules/.bin/tsc --noEmit --target ES2020 --module ES2020 --moduleResolution bundler --jsx react-jsx --strict --skipLibCheck --esModuleInterop --resolveJsonModule --lib DOM,ES2020 src/indexB.ts src/indexC.ts
```

Perintah untuk mengulang still wajib dari direktori `remotion`:

```bash
./node_modules/.bin/remotion still src/indexB.ts UjiB ../media/acuan/komponen/E-studio-f090.png --frame=90 --log=error
./node_modules/.bin/remotion still src/indexC.ts UjiC ../media/acuan/komponen/E-premiere-f070.png --frame=70 --log=error
```

## Pemeriksaan visual dalam cakupan D-17

Arah: demo editor untuk penonton video, mengikuti rekonstruksi Studio/Premiere yang sudah diterima; ENERGY 2 / RHYTHM 1 / MOTION 2. Fokusnya pekerjaan di monitor, dengan video dan playhead bergerak 1×.

- **PASS Hard gate:** media berasal dari MP4 yang disediakan; monitor pada still yang diperiksa berisi video jadi/footage mentah, tanpa UI/timeline bersarang atau PNG sebagai media.
- **PASS Purpose:** pilihan Jensen menjaga keterbacaan di monitor kecil; pemetaan cut dan playhead menjelaskan video yang sedang diedit; `contain` menjaga gambar utuh.
- **PASS Liveliness:** isi monitor berubah pada pasangan frame pemeriksaan dan playhead mengikuti waktu yang sama; identitas editor serta aksen playhead berasal dari komponen yang sudah diterima.
- **PASS Craftsmanship:** kedua entry berjalan, still dilihat langsung, dan komponen serta bagian di luar revisi lolos pemeriksaan hash/piksel. Ini keluaran video 1920×1080; pengujian interaksi editor, tema, atau breakpoint aplikasi tidak berlaku pada tugas ini.

## Batas pemeriksaan

Metadata statis bawaan komponen Premiere dipertahankan: Project Panel, label Source `referensi_01.mp4`, timecode Source `00:00:09:15`, dan durasi monitor `00:00:24:00` belum mengikuti media baru karena tidak tersedia sebagai props. Waktu media aktual tercatat di tabel di atas; Program dan playhead timeline sudah sinkron.

`revisi_cek.py` mengukur rencana lego, sedangkan `baseline_lock.py` membutuhkan master MP4. Tugas ini mengubah dua demo JSX dan melarang render video penuh; penjagaan revisi memakai D-17, perbandingan cabang kode, hash file, serta still sebelum/sesudah. Sampling still memeriksa frame yang disebut di atas, bukan audit setiap frame atau audio.

Tidak ada commit, push, atau render video penuh. `DECISIONS.md`, `TAHAP.md`, dan PETA tidak ditulis karena berada di luar daftar file yang diizinkan.
