# REPORT adegan w3 r1 · P08–P10

**Status: implementasi dan 28 still siap dinilai Sutradara.** TypeScript dan motion_lint PASS; pemeriksaan tema tidak menemukan literal pada tujuh file w3. Ada masalah jalur pada perintah tema_cek di brief, dirinci di bawah. Ini penyerahan adegan/still, belum penilaian video final.

## File

Semua jalur kode di bawah relatif `projects/flat-mirip-mirip/remotion/`.

| File | Isi |
|---|---|
| `src/adegan/P08.tsx` | Claude dengan prompt terkirim → Studio menyusun lima Sequence, seek video Jensen mengikuti playhead, Clawd bereaksi senang, penekanan putih per kata |
| `src/adegan/P09.tsx` | Dua unggahan → delapan akun dalam grid 4×2; penekanan “sangat mirip” |
| `src/adegan/P10.tsx` | Kelanjutan grid dan kamera P09; pertanyaan, baris atas/bawah memudar, teks menghilang |
| `src/adegan/w3-waktu.tsx` | Jangkar kata, kelompok dari naskah, penyesuaian waktu komponen teks saat di dalam Sequence |
| `src/adegan/w3-grid.tsx` | Grid bersama P09/P10, crop header + media dari UnggahanIG asli, delapan akun/avatar berbeda |
| `src/adegan/uji-w3.tsx` | Composition P08/P09/P10 serta W3-Sambung untuk menguji posisi waktu master |
| `src/index-w3.ts` | Entry registerRoot tersendiri |

Still: `media/acuan/adegan/P08-*.png`, `P09-*.png`, `P10-*.png` (28 PNG, seluruhnya 1920×1080). Komponen bersama, tema, naskah, Root/index utama dan file pekerja lain tidak diubah oleh w3. Tidak commit dan tidak render video penuh, sesuai brief.

## Acuan dan pemeriksaan awal

- `BRIEF-ADEGAN.md` dibaca utuh; ADEGAN §Aturan seluruh video dan P08–P10, RESEP, DECISIONS, STATUS/TAHAP dibaca. Keputusan D-21 dipakai untuk status papan: sudah disetujui, meskipun STATUS lama masih menyebut menunggu.
- Papan acuan r1 dibuka; contact sheet 86 dan delapan keyframe dibuka tanpa membaca kartu, sesuai TASK. Contoh gagal dan gambar terkait UI/teks dibuka.
- `git fetch origin main`: HEAD sama dengan origin/main, basis `f2851a8`.
- `./tools/doctor.sh`: **LULUS/Siap**, termasuk PETA terbaru saat pemeriksaan awal. Tidak menjalankan --fix atau mengubah PETA. File baru w3 diserahkan tanpa regenerasi PETA sesuai instruksi pekerja paralel.
- `profil_cek.py /home/irfan/work/data-video/merek/behindwork`: **LULUS**; BRAND dan EDITING dibaca.
- Branch remote dengan commit `claude/` yang belum masuk main: `origin/builder-trap-r2-v5`, `origin/codex/builder-trap-r2-v6-audit`, `origin/cursor/skill-load-order-3827`, `origin/siirfannih/storyboard-jadisatu-motion-trojan-v4`, `origin/siirfannih/storyboard-video-marketing`. Tetap memakai aturan main.

## Gerak dan kata penguncinya

Angka frame berikut hanya bukti untuk naskah **sementara** saat penyerahan; kode menghitung ulang dari `kataRelatif`, fps, `react`, dan `dur`.

| Adegan | Penguncian |
|---|---|
| P08 · Claude | Kelompok “dan AI” memakai AppClaudeTerang; prompt D-11 sudah tampil sebagai pesan pengguna, composer kosong. Status kerja adalah **Render preview** bawaan komponen; tidak ada balasan “On it.” atau kalimat asisten buatan. |
| P08 · rakit | Cut ke Studio pada onset **bikin** (sekarang f17). Sequence bertumbuh memakai land + dur(jarak, fps, bobot), dimulai pada bikin + react(n): sekarang f17/19/22/25/28. Track audio mempertahankan bentang editor 14 detik. |
| P08 · playhead | Heavy dari bikin ke sampai; drift pada sampai → jauh; heavy lagi jauh → cepat. Preview memakai aset `jensen-v4-00-14.mp4`, frame sumber mengikuti playhead. Freeze(0) + trimBefore(playhead) mencegah frame sumber dijepit durasi komposisi adegan. Batas klip video adalah isi timeline, bukan waktu peristiwa VO. |
| P08 · Clawd/teks | Clawd menyamping saat bekerja, menghadap depan dan senang pada **bagus**, dengan lompatan land. Pada kelompok terakhir, **jauh → lebih → cepat.** berganti satu kata KataTekan putih di tengah. Blur track/playhead/Clawd dihitung dari kecepatan antarframe, bukan blur sebagai cara masuk. Push kamera berjalan sepanjang adegan. |
| P09 · grid | Pull-back dan perpindahan dua kartu utama ke slot grid mulai pada **brand,** (sekarang f48), kurva heavy/land. Enam kartu lain bereaksi dengan react(n), masuk dari luar frame dengan blur dari kecepatan; bukan fade. “sangat” mulai f79, “mirip” f89; kedua kata bertahan bersama sampai kelompok berikutnya. |
| P09/P10 · isi | Seluruh delapan media memakai **satu konstanta sumber** `media/aset-slop/k1-01.png`. Akun fiktif: ruang.rona, nara.studio, bentuk.kita, titik.temu, lini.karya, sora.visual, arah.baru, rakit.cerita; seed avatar 0–7. Header/avatar/ikon memakai UnggahanIG asli, hanya bagian header + media yang ditampilkan. |
| P10 · kontinuitas | Memakai grid yang sama dalam keadaan tersusun; waktu drift diteruskan sebesar durasi P09, tanpa mengulang kemunculan atau posisi kamera. |
| P10 · lupa | Baris atas mulai memudar **setelah biasanya selesai** (sekarang f70); bawah pada waktu itu + react(4) (f81). Keduanya memakai leave. Teks mulai memudar pada **diingat** (f87), habis f108; seluruh frame kosong f111. Kanvas kosong bertahan sampai cut berikutnya (9 frame termasuk f111). Fade ini pengecualian yang diminta untuk makna lupa. |

Teks kecil memakai kelompok naskah, bukan pembagian otomatis tiga kata milik komponen. Wrapper menambahkan offset global hanya saat menyerahkan waktu ke komponen teks bersama; seluruh logika adegan tetap lokal. Penekanan multiword P09 memakai pola wrapper PapanFootage: KataKecil dengan ukuran/bobot KataTekan dari token; tidak mengubah komponen bersama. Ukuran tetap narasi 76 dan tekan 172 (rasio 2,26×).

## Hasil pemeriksaan

| Pemeriksaan | Hasil |
|---|---|
| `npx tsc --noEmit -p .` dari remotion | **PASS**, exit 0 |
| Typecheck entry w3 secara eksplisit | **PASS**, exit 0; diperlukan karena include tsconfig proyek belum mencakup src/adegan/ maupun src/index-w3.ts |
| `motion_lint.py projects/flat-mirip-mirip/remotion/src/adegan` | **PASS**, exit 0 |
| `tema_cek.py …/src/adegan` persis brief | **GAGAL jalur**: skrip mencari `src/adegan/bersama/tema.ts`, yang tidak ada. Bukan temuan gaya pada file w3. |
| `tema_cek.py …/src` | Menemukan **19 file lama** di `pinjam/` dan `papan/`; **tidak menandai file w3**. Tidak diperbaiki karena di luar FILE BOLEH. |
| Regex resmi tema_cek pada tujuh file w3 | **PASS**, 0 warna hex, 0 font literal, 0 ukuran huruf literal. Warna UI wrapper berasal dari token UI asli. |
| Still per kelompok | **14/14 ada**, ditambah 11 still gerak dan 3 still uji Sequence; seluruh 28 sudah dibuka dan dilihat sendiri. |
| P08 mandiri f82 vs W3-Sambung f934 | **0 piksel berbeda**, termasuk preview video dan teks |
| P09 mandiri f97 vs W3-Sambung f1105 | **0 piksel berbeda** |
| P10 mandiri f89 vs W3-Sambung f1229 | **0 piksel berbeda** |
| Cut P09 f131 → P10 f0, di luar pita narasi y450–629 | MAE RGB **0,0322/255**; gerak subpiksel menerus, susunan kartu sama |
| P10 f111 | Seluruh **2.073.600 piksel RGB = 255**, kanvas putih kosong |

Typecheck tambahan yang dijalankan:

```bash
npx tsc --noEmit --strict --skipLibCheck --esModuleInterop --target ES2020 --module ES2020 --moduleResolution bundler --jsx react-jsx --lib DOM,ES2020 src/index-w3.ts
```

Contoh render ulang satu still, dari folder remotion:

```bash
npx remotion still src/index-w3.ts P09 ../media/acuan/adegan/P09-f097.png --frame=97
```

Batch still menggunakan bundle entry yang sama dan `@remotion/renderer.renderStill`, browser baru per still. Reuse browser sempat macet; satu frame CLI mandiri membuktikan adegan tetap dapat dirender. Root sempat ENOSPC saat bundling; cache final dipindah ke storage di luar media/public, cache sementara milik w3 dibersihkan. Tidak menghapus cache/data pekerja lain.

Kontras nominal tinta/kanvas **18,88:1**. Preview P08 memakai saturate(.65) brightness(.44): batas luminans warna latar memberi kontras putih **≥4,94:1** sebelum antialiasing; ini batas matematis filter, bukan klaim audit semua piksel. Selama fade lupa P10, kontras memang turun sampai hilang.

## Daftar still yang sudah dilihat

Semua tautan menuju `media/acuan/adegan/`. “Tengah kelompok” dihitung dari onset kata pertama dan akhir kata terakhir; kata yang belum diucapkan memang belum terlihat.

| Still | Jenis | Yang terlihat / kecocokan ADEGAN |
|---|---|---|
| [P08-f008.png](../media/acuan/adegan/P08-f008.png) | Tengah “dan AI” | Claude terang, prompt terkirim dan Render preview; baru “dan” terlihat, sesuai onset. |
| [P08-f029.png](../media/acuan/adegan/P08-f029.png) | Tengah “bikin kita” | Studio menyusun Sequence, playhead 143, Clawd bergerak dengan blur; “bikin” terlihat, sesuai rakit otomatis. |
| [P08-f052.png](../media/acuan/adegan/P08-f052.png) | Tengah “sampai ke” | Lima Sequence tersusun, preview arsip dalam video Jensen, playhead 274 dan kata “sampai”, sesuai hasil yang cepat tercapai. |
| [P08-f082.png](../media/acuan/adegan/P08-f082.png) | Tengah “hasil yang bagus” | “hasil yang” putih di bawah wajah pada preview, playhead 305; sesuai, bagus belum onset. |
| [P08-f121.png](../media/acuan/adegan/P08-f121.png) | Tengah “jauh lebih cepat.” | “lebih” putih besar, Clawd senang, preview Jensen berubah dan playhead hampir akhir; sesuai penekanan per kata. |
| [P09-f008.png](../media/acuan/adegan/P09-f008.png) | Tengah “Masalahnya,” | Dua unggahan besar, avatar/nama berbeda, gambar sama; teks di celah tengah, sesuai. |
| [P09-f028.png](../media/acuan/adegan/P09-f028.png) | Tengah “begitu dipakai” | Dua unggahan mengapit frasa kecil yang muncul berurutan, sesuai. |
| [P09-f048.png](../media/acuan/adegan/P09-f048.png) | Tengah “buat brand,” | Kata brand mulai reveal dan pull-back mulai; dua unggahan utama masih besar, sesuai onset penggandaan. |
| [P09-f068.png](../media/acuan/adegan/P09-f068.png) | Tengah “hasilnya bisa” | Grid sedang terbentuk, kartu terakhir masih bergerak dari bawah, “hasilnya” di tengah; sesuai. |
| [P09-f088.png](../media/acuan/adegan/P09-f088.png) | Tengah “sangat mirip” | Delapan kartu sudah tersusun, “sangat” besar; mirip belum onset, sesuai. |
| [P09-f108.png](../media/acuan/adegan/P09-f108.png) | Tengah “dan familiar,” | Grid 4×2 identik dengan delapan header berbeda; teks kecil dan familiar di sela baris, sesuai. |
| [P10-f023.png](../media/acuan/adegan/P10-f023.png) | Tengah “dan yang mirip?” | Grid berlanjut utuh dan “dan yang” kecil; mirip? belum onset, sesuai. |
| [P10-f058.png](../media/acuan/adegan/P10-f058.png) | Tengah “biasanya” | Delapan kartu masih utuh dan kata biasanya di tengah; fade belum dimulai, sesuai urutan. |
| [P10-f089.png](../media/acuan/adegan/P10-f089.png) | Tengah “susah diingat” | Kedua kata terbaca, baris atas lebih pudar daripada bawah; sesuai lupa bertahap. |
| [P08-f022.png](../media/acuan/adegan/P08-f022.png) | Gerak rakit | Dua batang Sequence terlihat dan berikutnya mulai, Jensen di preview, Clawd menyamping; sesuai reaksi beruntun. |
| [P08-f080.png](../media/acuan/adegan/P08-f080.png) | Gerak playhead | Playhead 303, preview arsip Jensen, hasil yang di tengah; sesuai seek yang terus berjalan. |
| [P08-f144.png](../media/acuan/adegan/P08-f144.png) | Gerak selesai | “cepat.” putih besar, playhead 419, Clawd senang; sesuai akhir P08. |
| [P09-f097.png](../media/acuan/adegan/P09-f097.png) | Penekanan lengkap | “sangat mirip” bersama dalam satu baris besar di sela delapan kartu, sesuai. |
| [P09-f110.png](../media/acuan/adegan/P09-f110.png) | Grid terkunci | Delapan unggahan dan dan familiar, tetap rapi selama drift; sesuai. |
| [P09-f131.png](../media/acuan/adegan/P09-f131.png) | Akhir P09 | Grid utuh sebelum diteruskan P10; sesuai kontinuitas. |
| [P10-f000.png](../media/acuan/adegan/P10-f000.png) | Awal P10 | Grid tetap utuh dan kata pertama dan masuk saat cut; sesuai. |
| [P10-f034.png](../media/acuan/adegan/P10-f034.png) | Pertanyaan lengkap | “dan yang mirip?” termasuk tanda tanya, tanpa tumpang tindih kartu; sesuai. |
| [P10-f104.png](../media/acuan/adegan/P10-f104.png) | Fade | Baris atas hilang, bawah memudar, susah diingat abu-abu; sesuai pengecualian lupa. |
| [P10-f108.png](../media/acuan/adegan/P10-f108.png) | Fade lanjut | Teks sudah hilang, hanya baris bawah yang tersisa samar; sesuai. |
| [P10-f111.png](../media/acuan/adegan/P10-f111.png) | Akhir lupa | Kanvas seluruhnya putih kosong, sesuai keluar P10. |
| [P08-sequence-f082.png](../media/acuan/adegan/P08-sequence-f082.png) | Uji offset master | Sama persis P08 f82 ketika dipasang pada waktu master 28,4 detik; sesuai. |
| [P09-sequence-f097.png](../media/acuan/adegan/P09-sequence-f097.png) | Uji offset master | Sama persis penekanan lengkap P09 f97 setelah offset 33,6 detik; sesuai. |
| [P10-sequence-f089.png](../media/acuan/adegan/P10-sequence-f089.png) | Uji offset master | Sama persis fade P10 f89 setelah offset 38 detik; sesuai. |

## Batas penyerahan

- Waktu masih SEMENTARA. Seluruh jangkar akan mengikuti naskah VO baru, tetapi still perlu dibuat ulang dan ritme diperiksa setelah VO dikunci.
- AppClaudeTerang tidak menyediakan prop state percakapan terkirim. P08 memakai lapisan pesan pengguna lokal dengan palet/font UI asli; status kerja berasal dari komponen yang sudah lulus. Ini bagian yang perlu ikut dinilai pada still, bukan perubahan API komponen bersama.
- Belum audit semua frame, preview video bergerak, audio, SFX, musik, atau integrasi ke Root master; TASK melarang render video penuh dan perubahan Root. Tidak mengklaim gerak/audio/video final sudah lulus.
- Perintah tema_cek pada subfolder belum bisa menghasilkan exit 0 karena asumsi jalur skrip; hasil tujuh file w3 bersih sudah dibuktikan dengan regex resmi dan tidak muncul dalam keluaran cek src.
- Token sesi tidak tersedia dari harness; tidak diestimasi.
