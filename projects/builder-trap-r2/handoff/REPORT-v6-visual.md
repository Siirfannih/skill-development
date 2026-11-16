# Handoff visual v6 · 16 Nov 2026

Basis v5 r3, peta `knots_v6.json` 2.493 frame, 30 fps. Frame nyata di bawah zero-based, dihitung dari `W` aktual dan dibulatkan seperti engine. Pemeriksaan kreatif independen dan audit seluruh frame masih diperlukan; ini bukan verdict SHIP.

## Perubahan

- `ui/DummyContent.tsx`: empat ilustrasi SVG flat orisinal, orang generik/perangkat/alur, palet linen dan biru. Dipakai di dinding, media Threads, dan hasil YouTube; shell platform tetap. `data/yt_search.json` mengganti seluruh 16 record dengan ID, judul, kanal, dan angka fiktif. Warna dan perangkat menyatukan konten dengan dunia proyek; komposisi bervariasi agar isi bukan placeholder abu-abu. Arsip pembuka tidak disentuh.
- B08: kamera mulai wide agar 12 kartu terlihat utuh; scene masuk f433, lift pertama f442 (9 frame/0,30 dtk). Gelombang kanan paling luar, kanan dalam, kiri: lift f442/448/457; awal jatuh f445/451/460. Urutan ID dan kelompok ada di event list. Gerak lift/jatuh kini memakai frame nyata (`useRealFrame`), durasi kanan 9 frame dan kiri 16 frame; akhir f454/460/476, sebelum cut f487. Ini menghapus lompatan akibat peta W old f499→509. Tidak ada perubahan engine.
- B09: media jadi dummy. Usulan hold konteks tidak dipakai: 'Kalau' mulai real f545 bersamaan cut dan 'mau' f552; percobaan menahan konteks membuat punch selesai f558 dan mengorbankan keterbacaan kata yang sedang diucapkan. Kamera dipertahankan baseline.
- B12 tetap wide saat buka dan history, tanpa punch kosong dan cap. B13b satu gerak `heavy` ke prompt f993–999, karakter pertama f1000, lengkap f1028, mosaik f1051: 23 frame/0,77 dtk tersedia sebelum transisi. Tiada `B13_BACK` atau jalur kursor balik. Still f1032 memperlihatkan prompt lengkap; trajectory kode monoton menuju zoom 3,8 dan konstan sesudahnya.
- B20: 19 ID disimpan dalam tujuh gelombang 3/3/3/3/3/3/1; first visible f1535/1555/1575/1594/1615/1635/1650. Grup pertama sudah mulai bergerak sebelum cut; seluruh anggotanya muncul pertama saat cut f1535. Landing tiap kartu berbeda karena durasi yang ada; jangan tafsirkan entrance serentak sebagai landing serentak. Punch f1646, freeze f1672. Jarak punch ke wave akhir 4 frame. Kamera, posisi, freeze, dan teks B20 tidak diubah.
- `Stage.tsx`: default motion blur 10 → 16 sampel; prop override tetap ada. `lib/curves.ts` disalin dari skill main dan dipakai untuk satu punch kamera.

## Bukti

- `./remotion/node_modules/.bin/tsc --noEmit -p remotion/tsconfig.json`: PASS setelah perubahan scene, dan perlu dijalankan lagi oleh lead setelah integrasi final.
- Pencarian pada file render yang direvisi: nol `yt/*.jpg`, nama creator nyata yang diaudit, dan `B13_BACK`.
- Still melalui `scripts/juri/render.sh`, `nice 10`, `KONKURENSI=2`, TMPDIR khusus; `qc/stills-v6/wall.png` f440, `wall-wave2.png` f452, `wall-wave3.png` f460, `threads.png` f546, `search.png` f710, `gpt-type.png` f1032, `b20.png` f1597. Wall diperbarui setelah kamera wide; still scene lain dibuat sebelum revisi kamera B08 yang tidak menyentuh scene tersebut. Still dibuka sebagai montage; search dan prompt memperlihatkan isi yang dimaksud. Threads f546 berada saat punch dan motion blur, bukan bukti keterbacaan kutipan.
- `edit/v6/visual-events.json`: onset, puncak, ID dan grup aktual untuk SFX. Untuk B08 onset adalah lift, `fall_realframe` adalah awal jatuh; untuk B20 onset adalah first visible, peak adalah landing per kartu. Acuan cue grup: onset bersama, bukan 19 hit landing.

## Batas / tugas berikut

- Penilaian playback native rentang B08/B09/B13/B20, audit antartaburan SFX lengkap (termasuk punch/freeze), sinkronisasi SFX dan audit seluruh frame v6 dilakukan fase berikut oleh lead/reviewer. Peta W masih melompat old f499→509, tetapi gerak jatuh B08 sekarang berjalan pada frame nyata. Playback native tetap memerlukan peninjauan lead.
- Tidak ada render final atau seluruh frame. Tidak ada perubahan audio/VO/map, Face, Main, source v5 atau global skill dalam scope pekerja ini.

## Perbaikan F-v6-V01

- `useRealFrame()` untuk lift dan jatuh B08; titik jatuh f445/451/460, durasi 9/9/16 frame, selesai f454/460/476 sebelum cut f487. `visual-events.json` diperbarui; `peakframe` untuk setiap kartu B08 adalah akhir gerak, bukan awal jatuh. Lift kelompok kiri sekarang f457.
- Draft B08: `qc/draft_433-486.mp4`. Contact sheet f460–476 menunjukkan kartu kiri bergerak bertahap dan tidak menutupi teks di kanan. Ini pemeriksaan mekanis, bukan persetujuan kreatif playback.
- Draft B12–B13 awal gagal 404 `wall_mac.jpg` karena symlink absolut dalam bundle cache. Target sumber ada; atas izin lead symlink di `remotion/public/wall_mac.jpg` diganti salinan lokal, lalu bundle dibangun ulang; source v5 tetap read-only. SHA-256 sumber dan salinan sama: `914c81f22258c49b742d3457bfe20778857ae6bdfdbc5e9830ca0d13166b92f2`. Render diulang.
- Draft rentang yang tersedia untuk reviewer: `qc/draft_433-486.mp4`, `qc/draft_849-1058.mp4`, `qc/draft_1535-1680.mp4`; seluruhnya muted, setengah resolusi, dirender melalui render.sh. Reviewer sudah diberi tahu.

## Perbaikan F-v6-V02

- Kamera B08 kini memakai frame nyata, dengan pose lama yang sama pada anchor f433/f460/f487, kurva `drift` lalu `heavy`; pose subframe untuk blur juga pada clock nyata. `Stage` menerima prop opsional `frame` dan `screenPose`, default tidak berubah. `TextLayer` tetap memakai proyeksi fit frame lama melalui `screenPose` → `keBaru`, sehingga penghitungan ukuran tidak terikat hanya frame render sekarang. Tidak ada perubahan global timewarp.
- Pengukuran source asli pada setiap frame tersimpan di `work/visual-audit/v6-b08-real-camera.json`: f453–466 berturut-turut 2,54 / 2,23 / 1,89 / 1,55 / 1,20 / 0,85 / 0,51 / 0,17 / 0,33 / 1,05 / 1,90 / 2,91 / 4,14 / 5,66 px per frame. Puncak gerak f473 = 58,33 px/frame, Stage menggunakan blur pada bagian cepat. Frame tidak lagi menahan lalu melompat akibat W.
- `Act2.tsx` SHA-256 `8f2cfe623f06c528187637ff018f8153a4e8eab53417cb5658b673b0b7eff678`; `Stage.tsx` SHA-256 `e424bdd82ff279249342a0b13c4b86c826895e3e1dc19a3b3a25f3c8c4841783`. TSC PASS. Draft B08 `qc/draft_433-486.mp4` dibuat ulang melalui render.sh, dan dikirim ke reviewer untuk pemeriksaan gerak/teks. Event kartu tidak berubah; peak event kamera diperbarui f473.
