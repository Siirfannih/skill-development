# TASK-R7B2-claudekaca

Status: **siap ditinjau Sutradara; QA teknis lolos**. Penilaian mata terpisah dan finishing kamera/transisi tetap tahap Sutradara (D-484).

- Adegan: [r7b2_claudekaca_app.mp4](../lego/cache/r7b2_claudekaca_app.mp4), 1920×1080, 30000/1001 fps, 324 frame, tanpa audio.
- Rakitan rentang: [assembled.mp4](../qc/r7/claudekaca/assembled.mp4), 393 frame, waktu global 23,390033–36,503133 detik.
- [Sebelum / papan disetujui / sesudah](../qc/r7/claudekaca/sanding_sebelum_papan_sesudah.jpg), [12 still keadaan](../qc/r7/claudekaca/stills/sheet.jpg).

## Kondisi dan arah

Frame sebelum di 27,96 detik (`qc/r7/claudekaca/reference/sebelum.png`) berisi jendela Claude Code besar dan wajah kecil di kanan bawah; teks narasi berada di dalam jendela. Adegan baru sesuai D-479 mengganti seluruh bidang itu dengan padang: langit terang dan lapang di atas, bunga serta bebatuan ramai di bawah, tanpa wajah. Kolom dan balasan kaca menempati tengah; latar diburamkan ringan untuk membedakan kedalaman tanpa menambahkan objek.

Sumber visual: `qc/r7/brief2/papan_gerak_UI_claude.jpg`, `qc/r7/penilai/spine/ui_kaca_alur.py`, `sumber/ref-r6/ref-chat-kaca.png`. Susunan, teks, ukuran dasar, dan material diambil dari sumber tersebut. SF Pro dipakai karena sumber UI memakainya; oranye hanya untuk logo, unggahan, dan kirim. Kaca memisahkan isi percakapan dari warna padang; grid memperagakan pergantian chat setelah klik, bukan hiasan latar. Arah: adegan demonstrasi UI Claude kaca untuk penonton video ini; ENERGY 2 / RHYTHM 2 / MOTION 2.

Inti brief: tiga percakapan memperlihatkan perubahan dari memilih gaya ke menyerahkan pilihan pada Claude. Keunggulannya: MP4, perintah, dan balasan memberi hubungan sebab-akibat yang bisa dibaca. Risiko bagi penonton awam adalah chat berganti tanpa pemicu; bagi penonton skeptis, pilihan template sudah muncul sebelum slash; bukti isi dan waktunya berada di papan serta `edit/words.json`. Keduanya dicegah lewat klik Chat baru yang terlihat dan menu yang hanya muncul setelah `/`; putusan mengikuti D-479…D-484.

## Implementasi

Kode baru hanya di `remotion/src/video/claudekaca/` (`ClaudeKaca.tsx`, `draw.ts`, `timeline.ts`); `Root.tsx` mendapat komposisi `R7B2ClaudeKaca`. UI digambar ulang di Canvas dalam Remotion agar warna dan alpha sel grid berasal dari piksel objek yang benar-benar digambar, termasuk bayangannya. Logo diraster dari komponen `LogoClaude.tsx` asli; kedua berkas SF Pro lokal wajib selesai dimuat sebelum frame dilepas.

Kolom memakai lebar 1000 px dan pembungkusan berdasarkan `measureText`; gelembung, balasan, menu, kartu MP4, dan tombol dihitung dari isi serta padding. Setiap label diperiksa pada empat sisi dengan `actualBoundingBox*`. Gelembung naik memakai `CURVE.heavy` selama 8 frame; balasan memakai `land`; kursor mengikuti lintasan melengkung. Tidak ada kamera global, transisi antaradegan, narasi, subtitle, atau modifikasi wajah/audio.

Grid: sel 24 px, alpha 60%, pita tepi 60 px dengan variasi kecil per sel. Hanya piksel ber-alpha milik UI yang boleh tersisa; ruang kosong, lubang antarobjek, dan padang tidak menerima sel. Warna sel adalah rerata piksel objek berbobot alpha. Tombol Chat baru serta kursor digambar terpisah dari objek yang dihapus, sehingga pemicunya tetap terlihat.

## Waktu terukur

Onset dan kata sumber dibaca langsung dari `edit/words.json`; ikatan lengkap ada di [word_bindings.json](../qc/r7/claudekaca/word_bindings.json).

| Peristiwa | Frame global / waktu hasil |
|---|---|
| Awal adegan | f707, 23,590233 dtk |
| Unggah MP4 / ketik slash / pilih Apple | terikat “Jadi” 25,6297 / “bilang” 27,9557 / “Apple's” 28,929 |
| Gelembung Apple pertama terlihat | f886, 29,562867 dtk |
| Chat baru + grid pertama | f904–915; 6 hapus kanan→kiri + 6 muncul kiri→kanan; kembali siap di f916 |
| Ketik sinematik | terikat “Cinematic” 30,5538 dan “Storytelling” 31,1838–31,8338 |
| Gelembung sinematik | f954, 31,831800 dtk |
| Chat baru + grid kedua | f965–976; 6 + 6 frame; kembali siap di f977 |
| Gelembung cerita | f1006, 33,566867 dtk |
| Balasan “Oke. Aku tonton dulu, lalu aku pilih gaya yang cocok.” | f1016, 33,900533 dtk |
| Akhir adegan, eksklusif | f1031, 34,401033 dtk |

Setiap arah grid berlangsung 0,2002 detik. Sesudah f1030, rakitan memperlihatkan lapisan di bawahnya; transisi keluar belum dibuat sesuai pembagian tugas.

## Integrasi

[r7_override_claudekaca.json](../lego/r7_override_claudekaca.json) membuang `D_APP`, `D_APP_WAJAH`, T039–T049, lalu menambahkan `D_APP` baru di atas lapisan lama. Override UI terbaru sudah melepas D_APP/T048; penggabung standar berhasil menghasilkan 54 lapisan. [integration_conflicts.json](../qc/r7/claudekaca/integration_conflicts.json) kosong. Tidak ada override pekerja lain yang diedit oleh tugas ini.

ID milik pekerja lain yang bersinggungan dengan rentang tinjau dan tetap dipertahankan: `GRADE` (sampai 23,723507), `T038` (sampai 23,639413), dan `T051_lbl` (mulai 36,403033). GRADE/T038 berada di bawah D_APP selama adegan ini. `T051_lbl` tampil sesudah adegan baru berakhir.

Rakitan memakai `r7_gabung.py` asli dalam folder staging di `qc/r7/claudekaca/merge_input/`, dengan semua override terbaru, tanpa mengubah resep bersama. Input rentang dipotong dahulu agar composer tidak mendekode seluruh video; perhitungan kamera dasar yang sudah ada dipertahankan, bukan dirancang ulang. Resep penuh: `lego_preview.json`; resep rentang: `lego_range.json`.

## Bukti teknis

| Cek | Hasil / bukti |
|---|---|
| Seluruh frame dan wadah teks | 324 frame, 1.800 kemunculan label, tidak ada teks keluar wadah; [summary.json](../qc/r7/claudekaca/summary.json), rincian `bounds_and_grid.json` |
| Grid seluruh siklus | 24 frame; dua siklus 6+6; nol piksel grid di luar alpha objek |
| Uji piksel terpisah | Piksel 1 px ikut terhapus, lubang objek tetap kosong, 1.122 piksel sel ber-alpha 153/255 mempertahankan warna sumber; [grid_fixture.json](../qc/r7/claudekaca/grid_fixture.json) |
| Regresi | Uji piksel dan durasi fase direkam gagal sebelum perbaikan (`grid_red.log`, `timing_red.log`), lalu lolos (`grid_green.log`, `timing_green.log`) |
| TypeScript | Dari `remotion/`: `npx tsc --noEmit -p ../qc/r7/claudekaca/tsconfig.json` mencakup sumber video dan Root; `typecheck.log` |
| Gerak | `motion_lint.py remotion/src/video/claudekaca` PASS; `motion_lint.log` |
| Berkas cache / rakitan | 324 / 393 frame, 1920×1080, 30000/1001, hanya stream video; `probe.json`, `assembly_probe.json` |
| Ketepatan rakitan | Seluruh 324 frame dibandingkan dengan cache pada offset 6 frame; PSNR 55,487 dB; [assembly_alignment.json](../qc/r7/claudekaca/assembly_alignment.json) |
| Sumber dan keluaran terbaru | SHA-256 di [manifest.json](../qc/r7/claudekaca/manifest.json) |

Strip referensi yang benar-benar dibuka: [grid_motion.jpg](../qc/r7/claudekaca/reference/grid_motion.jpg), semua 36 frame berurutan pada 3,35–4,55 detik `ref-grid.mp4`, plus ikhtisar 1 fps. Teknik di referensi bekerja karena klik terlihat dan grid terikat pada peralihan UI; di sini bentuknya diubah menjadi sapuan kanan→kiri lalu kiri→kanan sesuai D-482/D-483, dibatasi objek di atas padang yang tetap.

Lima strip hasil terbaru sudah dibuka, masing-masing 18 frame berurutan, termasuk sebelum/sesudah aksi:

- [Grid pertama](../qc/r7/claudekaca/strips/grid_1.jpg), [grid kedua](../qc/r7/claudekaca/strips/grid_2.jpg).
- [Kirim Apple](../qc/r7/claudekaca/strips/kirim_apple.jpg), [kirim sinematik](../qc/r7/claudekaca/strips/kirim_cinematic.jpg), [kirim cerita](../qc/r7/claudekaca/strips/kirim_cerita.jpg).

Gate antislop dalam cakupan keluaran video: wadah/aset/isi PASS (`summary.json`, sumber papan dan logo asli); tujuan teknik PASS (kaca untuk kedalaman, grid untuk chat baru); arah dan fokus PASS terhadap brief (dial 2/2/2, oranye sebagai aksen); build/runtime/strip PASS. Warna dan perlakuan kaca mengikuti pilihan eksplisit papan D-479…D-484. Persyaratan kontrol aplikasi interaktif seperti keyboard, halaman tujuan, dan penanganan error web tidak diterapkan pada berkas video.

## Menjalankan ulang

Dari folder proyek: `python3 lego/r7_claudekaca.py prepare`, kemudian `render`, `check`, `stills`, `strips`, `assemble`. Render memakai concurrency 3. Tidak perlu mengubah file pekerja lain.

Belum dilakukan dalam TASK ini: penilaian mata independen, kamera/transisi finishing, SFX, musik, dan render master. Tidak ada commit/push atau perubahan PETA/skill sesuai handoff. Token sesi tidak tersedia pada antarmuka ini.
