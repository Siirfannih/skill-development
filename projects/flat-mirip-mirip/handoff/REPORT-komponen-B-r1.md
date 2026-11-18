# REPORT komponen B · r1

Komponen dan still siap dinilai Sutradara. Typecheck proyek dan entry B lulus. Keluaran ini **belum diklaim identik piksel dengan seluruh acuan**; perbedaan per elemen dicatat di bawah. Tidak ada commit atau render video penuh.

**Berkas hasil** (tautan relatif dari laporan ini):

| Berkas | Isi / ukuran |
|---|---|
| [B-claude-f050.png](../media/acuan/komponen/B-claude-f050.png) | UjiB f050, 1920×1080; lampiran video.mp4 dan prompt lengkap |
| [B-studio-f090.png](../media/acuan/komponen/B-studio-f090.png) | UjiB f090, 1920×1080; Studio pada playhead 48, Clawd memegang garis |
| [B-sanding-claude.png](../media/acuan/komponen/B-sanding-claude.png) | 3840×1124; kiri acuan, kanan still f050 |
| [B-sanding-studio.png](../media/acuan/komponen/B-sanding-studio.png) | 3840×1124; kiri U4-playhead, kanan still f090 |
| [B-clawd-pose-emosi.png](../media/acuan/komponen/B-clawd-pose-emosi.png) | 1920×540; 18 kombinasi pose × emosi × lengan bebas/memegang |

Claude mempertahankan rasio acuan 2000×1228: skala UI `1080/1228 = 0,8794788`, lebar 1758,958 px, posisi x 80,521 px dalam frame 1920×1080. Acuan di panel kiri sanding memakai transformasi yang sama, tanpa crop atau peregangan. Studio dibandingkan pada skala CSS 1×: acuan raster 3840×2160 diperkecil 50%, hasil tetap 1920×1080. Kedua sanding memiliki label setinggi 44 px di luar gambar UI. Panel kanan masing-masing sama persis dengan piksel still hasil terakhir.

**Implementasi dan pemakaian**:

| Komponen | Kontrak / sumber port |
|---|---|
| [AppClaudeTerang.tsx](../remotion/src/bersama/ui-asli/claude/AppClaudeTerang.tsx) | Sidebar, composer, status, dan pembagian chat/panel kanan diadaptasi dari `pinjam/b3.tsx` dan `pinjam/bersama/chat/Chrome.tsx`; koordinat disesuaikan dengan acuan U1. Tanpa filter invert atau kamera adegan pinjaman. |
| [StudioRemotion.tsx](../remotion/src/bersama/ui-asli/remotion/StudioRemotion.tsx) | Panel mengikuti ukuran CSS REPORT-studio-acuan-r1. Gelombang diturunkan dari `pinjam/b1::Gelombang`; beberapa siluet ikon dan handle playhead berasal dari paket Studio 4.0.380 terpasang. Font SF Pro Display Medium/Bold. |
| [Clawd.tsx](../remotion/src/bersama/Clawd.tsx) | Jalur pinjaman sebenarnya: `KarakterPixel::KarakterX(model='claude')` meneruskan ke `papan/karakter2d/Karakter2D`. Tabel depan/samping/belakang, badan, empat kaki, posisi mata, dan urutan lapis diport dari rig itu; ekspresi mata senang memakai pola piksel dari KarakterPixel. Warna hanya di [claude/warna.ts](../remotion/src/bersama/ui-asli/claude/warna.ts). Atribusi dan tautan lisensi rig dipertahankan. |
| [UjiB.tsx](../remotion/src/bersama/ui-asli/UjiB.tsx) | f000–059 Claude; f060–119 Studio dan Clawd. Preview memakai ulang `pinjam/b1::DuniaRepo`, bukan gambar UI. Pada f090 isinya benar-benar frame 48. |
| [RootB.tsx](../remotion/src/RootB.tsx), [indexB.ts](../remotion/src/indexB.ts) | `UjiBRoot` mendaftarkan `UjiB`: 1920×1080, 30 fps, 120 frame. Entry terpisah dari Root/index milik task lain. |
| [BidangUI.tsx](../remotion/src/bersama/ui-asli/BidangUI.tsx), [FontsUI.tsx](../remotion/src/bersama/ui-asli/FontsUI.tsx), [IkonClaude.tsx](../remotion/src/bersama/ui-asli/claude/IkonClaude.tsx) | Bidang SVG dengan JSX dalam foreignObject, pemuatan font yang menahan render, dan ikon SVG. Tidak memakai raster UI. |

- `ketik.mulai` dan `kirimPada` adalah **frame lokal**, `cps` karakter per detik. Unicode dihitung per code point. UjiB memakai mulai 0, 45 cps: 70 karakter selesai pada f047; tombol ditekan f054, f055, f056 dan pulih f057. Teks tidak otomatis dihapus sesudah tekanan karena kontrak hanya meminta animasi tombol.
- `lampiran` dan `kirimPada` boleh dihilangkan. Judul sesi berasal dari enam judul netral dalam brief, diulang untuk mempertahankan kepadatan sidebar acuan.
- `track.mulai`, `track.durasi`, dan `playhead` memakai frame. Rentang Studio mengikuti akhir track terpanjang; demo memakai 96 frame. `warna` yang dihilangkan berarti Sequence biru. Track demo: tiga Sequence dan satu Audio hijau. Gelombang bersifat prosedural karena props tidak menerima sumber audio.
- `Clawd.skala = 1` berarti 12 px per satuan rig, kotak SVG 216×120. UjiB memakai 0,8. `CLAWD_GENGGAM` dan `posisiPlayheadStudio` diekspor untuk menyelaraskan posisi tangan dengan garis dalam koordinat UI asli.
- Gerak memakai `src/lib/curves.ts`: `drift` untuk pergeseran playhead, `land` untuk tekanan tombol. Pengetikan/kedip dihitung dari frame. Sequence lokal `from={0}` di preview mencegah Freeze 4.0.380 menambahkan offset adegan 60 ke frame preview.

**Verifikasi mekanis terakhir**:

| Pemeriksaan | Hasil / bukti |
|---|---|
| `npx tsc --noEmit -p .` dari `remotion/` | **LULUS, exit 0**, tanpa diagnostik. |
| Typecheck B secara eksplisit | **LULUS, exit 0**. Konfigurasi sementara memperluas tsconfig proyek dan mengikutkan `src/RootB.tsx` + `src/indexB.ts`; seluruh dependensi B ikut diperiksa. Ini diperlukan karena tsconfig utama belum mendaftarkan entry B. |
| Perintah tema persis dari TASK | **Argumen tidak cocok dengan skrip**: `GAGAL: projects/flat-mirip-mirip/remotion/src/bersama/bersama/tema.ts tidak ada`. Skrip mengharapkan folder `src`, lalu menambahkan `bersama/tema.ts` sendiri. Skrip tidak diubah. |
| Tema dengan argumen `.../remotion/src` | **Tidak ada diagnostik pada file B**. Hasil keseluruhan masih `GAGAL: 19 butir sistem desain`, semuanya pada `pinjam/` dan `papan/` lama. |
| Tema khusus B | **LULUS: gaya adegan hanya dari tema.ts.** Checker asli dijalankan pada struktur sementara berisi tautan file B dan tema asli, tanpa mengubah aturan atau menambahkan pengecualian. |
| Chromium, 23 titik frame | **LULUS**: isi ketikan, kedip 15 frame, tekanan tepat 54–56, batas adegan 59/60, frame akhir 119, empat track, font termuat, dan seek maju/mundur deterministik. |
| Posisi panel Studio | **LULUS** dari DOM: kiri `(0; 36,5; 383,40625; 724,375)`; kanan `(1460,828125; 36,5; 459,171875; 724,375)`; timeline y `819,875`; baris pertama y `858,875`, langkah 26 px. |
| Tangan/playhead f090 | Garis x `1161,09375`, titik tangan x `1161,09453125`; selisih `0,00078125 px`. Timecode Studio `00:01.18`, frame 48. |
| Props dan pose tambahan | **LULUS**: 18 varian Clawd, belakang tanpa wajah, Claude tanpa lampiran/kirim, mulai mengetik di masa depan, Unicode `A🙂B`, timeline satu frame dengan clamp, dan timeline kosong. |
| Raster dan browser | **0** elemen `img/image/canvas/video` pada semua frame/case yang diperiksa; **0** error/peringatan console atau page error; tidak ada overflow horizontal pada bidang render. Kontrol UI merupakan gambar animasi video, bukan aplikasi interaktif yang diuji lewat klik. |
| Determinisme still | Render CLI dan render API terpisah f050/f090 menghasilkan **piksel RGBA identik**. Panel kanan sanding cocok dengan still terakhir. |
| Integritas | Hash seluruh `src/pinjam/`, `src/papan/`, dan `bersama/tema.ts` sama dengan baseline awal. Tidak ada edit B pada Root.tsx/index.ts, skill, package, atau konfigurasi proyek. Tidak ada penekanan error TypeScript atau perubahan tes. |

Log QA dan harness sementara berada di `/tmp/komponen-b-r1/` (`runtime.json`, `cases-results.json`, `tsc-project-final.log`, `tsc-b.log`, `tema-full-final.log`). Harness hanya merender still. Bukti utama yang diserahkan tetap kelima PNG dan laporan ini.

**Perbedaan yang masih terlihat, per elemen**:

| Elemen | Perbedaan terhadap acuan |
|---|---|
| Claude: judul sesi | Sengaja diganti dengan enam judul netral sesuai TASK. Judul diulang pada 20 baris untuk mempertahankan posisi baris dan footer; isi riwayat tidak sama dengan screenshot. |
| Claude: area chat | Kosong pada demo mengetik. Transkrip panjang dalam screenshot U1, tombol turun untuk riwayat, popup slash dan tooltip tidak ditampilkan. Shell dan composer mengikuti kotak acuan; isi chat belum merupakan replika transkrip screenshot. |
| Claude: lampiran | Chip diambil dari bentuk kartu 79, dengan ikon play SVG sesuai TASK. Thumbnail wajah, durasi `1:12`, dan isi ketikan Indonesia pada kartu 79 diganti dengan `video.mp4`, `Video`, dan prompt Inggris yang diminta. |
| Claude: posisi teks composer | Prompt diletakkan di bawah chip; screenshot U1 menampilkan `/Type to filter` di tepi bawah. Tombol plus/enter/mikrofon tetap berada pada baris bawah. Ini perbedaan keadaan input. |
| Claude: ikon | Ikon macOS/toolbar, terminal tugas dengan bingkai kotak, settings, dan ikon file digambar ulang SVG. Beberapa kurva, ketebalan, dan jarak internal belum identik dengan glyph aplikasi. |
| Claude: font dan bayangan | Memakai Inter bawaan kode pinjaman. Identitas font screenshot U1 belum terbukti; bentuk huruf/rasterisasi bisa berbeda. Bayangan composer dan rona area footer lebih sederhana/datar daripada screenshot. |
| Claude: status bawah | Tanda pemisah `·` antara High dan Auto mengikuti TASK; pada screenshot U1 pemisahan tampak berupa jarak. Lingkaran status digambar SVG tanpa aktivitas jaringan. |
| Studio: font | Sengaja **SF Pro Display**, sedangkan acuan U4 yang diambil di Linux memakai DejaVu Sans/Mono. Lebar teks, ketebalan, bentuk angka dan bungkus pesan Props berbeda, termasuk timecode yang di sini mengikuti font SF. |
| Studio: ikon dan detail kontrol | Ikon film/play/handle mengikuti sumber paket; beberapa ikon transport, loop, volume, layout dan Render memakai SVG yang disederhanakan. Detail glyph dan radius belum seluruhnya identik. Ukuran panel dan kotak kontrol dipertahankan; rasterisasi tepi pecahan CSS dapat berbeda pada hasil 1× dibanding acuan 2×. |
| Studio: timeline | Acuan U4 hanya satu Sequence. Demo sengaja menambahkan dua baris Sequence dan satu Audio hijau sesuai TASK. Bentuk gelombang **bukan** analisis audio nyata; detail waveform tidak dapat dibandingkan terhadap U4 karena acuan itu tidak memuat audio. |
| Studio: preview | Memakai kode DuniaRepo pinjaman pada frame 48, sama dengan keadaan playhead acuan. Perbedaan kecil tepi huruf/blur/bayangan masih dapat muncul karena acuan raster 2× dan still 1×. Preview dapat diganti melalui prop `preview`. |
| Clawd: bentuk/material | Geometri rig pinjaman dipertahankan, dibuat datar/piksel tanpa wash, tekstur kuas, mulut lengkung, lantai atau papan. Kartu 79 menampilkan Clawd mengangkat papan dan pencahayaan lebih gelap; demo menampilkan lengan horizontal menggenggam playhead. |
| Clawd: warna/ekspresi | Warna badan `#EE6A4C` dipertahankan dari rig pinjaman, sehingga terlihat lebih terang/oranye daripada warna Clawd pada frame 79-k7. Senang/kaget diwakili mata piksel, bukan ekspresi material/pencahayaan kartu. |

Perbedaan keadaan konten yang diminta TASK dibedakan di tabel dari sisa ketelitian glyph/material. Putusan kemiripan visual tetap pada Sutradara setelah melihat sanding; tidak ada skor kemiripan global atau klaim bahwa seluruh piksel menyamai screenshot.

Untuk memeriksa komposisi tanpa menyentuh entry task lain:

```sh
cd projects/flat-mirip-mirip/remotion
npx remotion still src/indexB.ts UjiB ../media/acuan/komponen/B-claude-f050.png --frame=50 --image-format=png
npx remotion still src/indexB.ts UjiB ../media/acuan/komponen/B-studio-f090.png --frame=90 --image-format=png
```

Masih perlu keputusan produk: **tidak ada**. Pemeriksaan identitas visual berikutnya memakai sanding di atas. `ops-report add` tidak dijalankan karena implementasinya melakukan commit dan push otomatis, sedangkan TASK ini secara eksplisit melarang commit. Tidak ada perubahan skill/PETA atau kiriman ke layanan eksternal.
