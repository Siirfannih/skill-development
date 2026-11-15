# TASK r5 · Re-time ke potongan suara v3 + koreksi KT r4

Editor KT (lanjutan r4). P = `projects/builder-trap-r2`, R = root repo. Jangan menimpa `out/*.mp4`.

## Latar
Irfan 15 Nov: potongan suara lama membawa kata sampah ("tuh" ×3) dan diam saat berpikir. Suara dipotong ulang: 39 rentang, 11,6 dtk dibuang, durasi 94,97 → **83,367 dtk = 2501 frame**. `cut_check` PASS. Semua adegan masih ditulis dalam frame timeline lama, jadi visual diputar lewat peta waktu.

## Aset v3 (sudah disiapkan Sutradara)
- `P/remotion/public/face_edit_v3.mp4`: video wajah dipotong di rentang yang sama dengan suara (bibir sinkron). 2502 frame; pakai 2501 pertama.
- `P/remotion/public/mix_v3.wav`: mix final v3 (suara + SFX + musik), 83,367 dtk.
- `P/remotion/src/data/knots_v3.json`: peta W. `knots` = [t_baru, t_lama] dalam detik, interpolasi linear; pasangan berselisih 0,0001 dtk = lompatan.
- `P/remotion/src/data/words_v3.json`: kata per kata di timeline BARU ("tuh" sudah tidak ada).
- `P/handoff/beats_v3_frames.txt`: frame awal–akhir tiap beat di timeline baru (untuk still).

## Kerjakan
1. **Mesin waktu** (`engine/timewarp.ts`): `W(fBaru) → fLama` (interp dari knots, ×30, bulatkan) dan `keBaru(fLama)` (invers). Context React `RealFrame` berisi frame nyata.
2. **Main/Root**: durasi komposisi 2501 frame. Adegan dirender di `<Freeze frame={W(f)}>`, sehingga semua animasi, kamera, dan transisi lama ikut peta tanpa mengubah kode adegan. Audio = `mix_v3.wav` (bukan `face_edit.mp4`).
3. **Wajah**: `Face` memakai `face_edit_v3.mp4` di frame NYATA (`<Freeze frame={realFrame}>` bersarang di dalam Freeze adegan, atau cara setara), supaya bibir sinkron dengan suara baru.
4. **Teks** (penting): saat tampil dan keluar per kata/frasa dihitung dari `words_v3.json` di frame NYATA, bukan dari frame yang di-warp. Posisi tetap ikut kamera adegan. Konstanta frame lama (F_*, `until` angka) dikonversi dengan `keBaru()`. Hasil: setiap kata tampil saat diucapkan di suara baru (±1 frame).
5. **Koreksi KT r4** (jawaban Sutradara atas Q-r4):
   - Q-r4-01 / Q-r4-07 tumpuk kata B16–B18: dikecualikan dari KT-1 (lebar sama). Kata kunci ("menjual", "mempublikasikan", "mendokumentasikan") adalah baris **terbesar** (putih, ≥ 1,3× kepala), kepala dan "apapun." lebih kecil (abu, ≥ 56 px), rata kiri, satu kata per baris, muncul per kata.
   - Q-r4-07 B04: penekanan pada "gak semua orang" (besar), "tapi" kecil pengantar, "bisa" kecil (atau ke tampilan berikutnya). B24e: "aku harusnya" satu frasa (bukan blok even yang membesarkan "aku"). Periksa blok even lain: baris yang dibesarkan harus kata yang membawa makna, bukan kata sambung pendek.
   - Q-r4-02 (triad 3× mode sama): diterima. Q-r4-03 (4 kata), Q-r4-04 ("atau" 0,33 dtk), Q-r4-05 (caption B05), Q-r4-06 (UI B17/B18 lebih kecil): diterima apa adanya.

## Jangan berubah
Isi kata, layout KT r4 selain butir 5, palet, UI, file audio.

## Cek
- `cekkata`: semua kata di `words_v3.json` tampil tepat sekali dan saat diucapkan (sesuaikan skrip agar membaca words_v3 + frame nyata; "tuh" tidak lagi dihitung).
- Still di frame tengah tiap beat (`beats_v3_frames.txt`), plus 3 frame di sekitar setiap bekas jeda yang dihaluskan (`knots_v3.json → jeda`, waktu lama; konversi ke baru): tidak ada lompatan teks dan animasi tidak terlihat terburu-buru.
- Draft gerak skala 0,5 untuk dua rentang: 0–420 dan 2200–2501 (`render.sh P draft Main a-b`).
- `npx tsc --noEmit`.

## Keluaran (sebagai balasan; Sutradara yang menyimpan REPORT)
Lembar `P/qc/r5_sheet.jpg`, path draft, keluaran cekkata/tsc apa adanya, daftar konstanta frame yang dikonversi, pertanyaan terbuka. Disk ±3,4 GB: hapus still sementaramu, jangan menjalankan render final.
