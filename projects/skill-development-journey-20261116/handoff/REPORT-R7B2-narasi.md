# REPORT · TASK-R7B2-narasi

**Siap ditinjau oleh penilai mata terpisah.** Lapisan sudah dirender dan didaftarkan di `lego/r7_override_ktwajah.json`. Ini laporan builder, bukan putusan QC kreatif. Tidak commit, tidak mengubah PETA atau skill.

Mulai dari [sebelum / sesudah / spine](../qc/r7/ktwajah/b2/sebelum_sesudah_spine.jpg), [ukuran HP](../qc/r7/ktwajah/b2/phone.jpg), dan [daftar strip gerak](../qc/r7/ktwajah/b2/strips.json).

## Acuan dan kondisi footage

Rute revisi: AGENTS → PETA (Rute) → PENDING → motion-graphic → TAHAP/STATUS/RESEP → revision-log → D-465, D-473–D-478, D-484 → R7B2-BERSAMA. Awal sesi mengikuti bukti pull/doctor Sutradara dalam handoff; tidak menjalankan --fix. Profil siirfan diperiksa kembali dengan profil_cek: LULUS.

Footage yang dibuka: [lembar asli](../qc/r7/ktwajah/b2/footage_sheet.jpg), [kamera yang sudah ada](../qc/r7/ktwajah/b2/footage_zoom_sheet.jpg), dan [pemeriksaan tambahan](../qc/r7/ktwajah/b2/footage_checks.jpg). Spine 1/4/7 serta contoh gagal 14/17 juga dibuka.

- **Pembuka dan tangga 0–8,5 dtk.** Wajah di tengah, dinding abu-biru kanan kepala kosong; sisi kiri bawah memuat pintu biru dan benda gantung. Kemeja berpola putih serta tangan dan mic memenuhi dada. Narasi dipindah ke dinding kanan, satu jangkar per frasa, tanpa wadah.
- **K4 12,5–15 dtk.** DECISION dan tokoh sudah menjadi objek kuat di depan badan; tangan naik di sekitarnya. Dinding di kanan atas kepala, di atas tokoh Gemini, memberi ruang untuk narasi. Posisi “dalam” yang telah diperbaiki dipertahankan, sedangkan frasa berikutnya berpindah ke dinding.
- **Sesudah parodi, 20,9–22,7 dtk.** Wajah dan tangan masih di tengah; slab AI SLOP berdiri di belakang kepala. Dinding kanan menyediakan ruang untuk “Dan ya”, “beberapa bagian”, “masih”. Slab lama diberi blur selama narasi ini, tanpa mengubah teks, warna atau animasi asalnya.
- **WORKFLOW-NYA, 36,4–38,5 dtk.** Kepala di tengah dan sedikit miring, dengan ruang lebar di kedua sisinya; tangan dan mic berada di bawah. Slab tetap satu kata utuh di belakang kepala. Label menempel di atas kiri slab, tidak lagi menjadi pesan kecil terpisah jauh di sudut.
- **Biaya/langganan, 41,7–47,1 dtk.** Kamera yang sudah ada mendekat; kemeja dan mic menutupi banyak bidang dada. Ruang polos di kanan kepala masih cukup. “Ini / habis / banget” menjadi satu tumpukan dengan bobot penekanan, tanpa pil biru.
- **Kartu angka, 49,2–53,7 dtk.** Kedua kartu memakai dinding di kiri/kanan atas bahu, sehingga posisi narasi kanan atas bertabrakan dengan angka. Narasi ditempatkan pada dinding di bawah kartu kanan, lalu dijauhkan sedikit dari ujung jari yang naik. Kartu, angkanya, dan UI tidak diedit.
- **Cincin dan LINTAS AGENT, 53,9–57,7 dtk.** Kepala berada dekat busur, dengan tangan di bawah kedua ujungnya; matte memungkinkan huruf lewat di belakang kepala/badan. Ukuran dan lintasan cincin r4 dipertahankan, gerak masuk diperjelas. Slab LINTAS AGENT menjadi satu bidang utuh, dengan label rapat di atas dan berakhir pada potongan ke D.

## Referensi bergerak yang dibuka

- [Zache 2,85–3,45](../qc/r7/ktwajah/b2/ref_zache_wave.jpg): seluruh frame berurutan, huruf baru naik, blur saat bergerak, tracking merapat; kata lama tetap di barisnya. Dinding polos di samping kepala memungkinkan teknik yang sama; warna tetap putih hangat merek.
- [Zache 13,0–15,5](../qc/r7/ktwajah/b2/ref_zache_focus.jpg): narasi depan tajam, teks belakang menjadi latar yang lebih lunak. Dipakai pada waktu narasi beririsan dengan slab, bukan sebagai blur masuk bawaan.
- [Lembar gerak](../qc/r7/brief2/lembar_gerak.jpg), baris a/d: FINALLY masuk utuh, hidup melalui skala; WORKFLOW lama naik dari bawah. Slab baru mengambil perilaku FINALLY.
- Barsol/kartu 83: tag bekerja di ruang gelap dan kata dada di pakaian polos. Kedua kondisi itu tidak ada pada footage ini, sehingga wadah tidak dipertahankan di narasi normal.

## Perubahan sesuai ledger

| Cakupan | Hasil | Dasar |
|---|---|---|
| Tangga dan K4 normal | Poppins putih hangat tanpa wadah, tumpukan per frasa di dinding; kata sebelumnya tidak digeser oleh kata baru | D-476, D-478 |
| Makna frasa | “yang kita pake”, “Karena belakangan ini”, “Ini habis banget”, “uji coba” tetap satu kelompok; tidak tersebar ke sudut berbeda | D-465, D-476 |
| Gerak narasi | Huruf naik berurutan dengan blur gerak dan tracking merapat; cincin memakai gerak yang sama | D-475, D-478 |
| Slab WORKFLOW-NYA / BALIK MODAL / LINTAS AGENT | Anton, satu bidang utuh di belakang kepala; potong masuk, skala membesar pelan, potong keluar | D-477, D-478 |
| Label slab | Diperbesar dari versi lama dan ditempatkan rapat di atas slab; gap diperiksa pada rakitan | D-476 §7.4, D-477 |
| Fokus kedalaman | Slab diburamkan ringan saat narasi depan hadir; AI SLOP memakai salinan aset lama dengan efek fokus saja | D-476 kasus 3.6, D-478 |
| “Jadi/gak” T052 | Penundaan lama untuk menghindari slab dihapus; kini mengikuti cue ucapan, sementara slab menjadi latar | D-478 |
| Akhir LINTAS AGENT | Label 43 f dan slab 20 f, berhenti pada potongan ke D; tidak mengubah D/kamera/transisi | D-476, D-484 |

FINALLY, DECISION, VIRAL!! dan efek parodi dipertahankan. Pengecualian wadah adalah narasi parodi yang memang disengaja. **171 frame lapisan narasi parodi (15,215–20,921 dtk) identik**, diperiksa dengan framemd5 video tanpa audio: [bukti](../qc/r7/ktwajah/b2/parody_identity.json). “Dan ya” setelah fase parodi masuk narasi normal. Jarak “dalam” dari r4 tetap; mask geraknya menjaga huruf dari tepi bawah.

## Bukti hasil

- [Sanding sebelum/sesudah/spine](../qc/r7/ktwajah/b2/sebelum_sesudah_spine.jpg): narasi wajah, frasa, ketiga slab, biaya/langganan, kartu, cincin.
- [Ukuran HP 360 px](../qc/r7/ktwajah/b2/phone.jpg).
- **77 strip, masing-masing 20 frame berurutan**, tercantum dalam [strips.json](../qc/r7/ktwajah/b2/strips.json). Termasuk tiap onset narasi/label/slab; urutan yang melewati batas klip bukti disambung dari klip berikutnya.
- [Keluar LINTAS AGENT ke D](../qc/r7/ktwajah/b2/exit_lintas_ke_D.jpg): 12 frame sebelum dan sesudah untuk penilaian batas adegan.
- Rakitan sesudah: [0–15](../qc/r7/ktwajah/b2/after/rentang_0-15.mp4), [15–23,7](../qc/r7/ktwajah/b2/after/rentang_15-23.7.mp4), [36–58](../qc/r7/ktwajah/b2/after/rentang_36-58.mp4). Rakitan sebelum berada di `qc/r7/ktwajah/b2/before_render/`.
- [Snapshot sumber](../qc/r7/ktwajah/b2/input_sources.json) dan [kesegaran sumber](../qc/r7/ktwajah/b2/range_freshness.json): sebelum dan sesudah memakai kamera dan override pekerja lain yang sama; tidak ada input yang berubah setelah rakitan terbaru.

## Pemeriksaan teknis

| Pemeriksaan | Hasil |
|---|---|
| TypeScript `npx tsc --noEmit` | PASS |
| `motion_lint.py .../kt83` | PASS |
| `r7_ktwajah.py check` / `check-b2` | PASS: 15 grup, **1.264 frame**, alpha dan 30000/1001; ID/urutan ganti/tambah/buang tetap |
| `pixels-b2` | Seluruh 1.264 frame dibaca; nol temuan area wajah atau tepi pada lapisan yang diubah. Parodi dilindungi dari penataan ulang |
| Tangan/mic | Nol irisan pada 278 frame aktif yang memiliki mask; 4 frame tanpa data mask diperiksa dari footage dan strip. [Rincian](../qc/r7/ktwajah/b2/hands_mic.json) |
| Onset T052 | Jadi: 24 ms; gak: 5,83 ms setelah cue sumber. Ucapan sama; cue lain dipertahankan. [Rincian](../qc/r7/ktwajah/b2/onset_adjustments.json) |
| Rakitan rentang | PASS durasi/fps; sebelum/sesudah menggunakan grid frame yang sama |
| Python/whitespace | py_compile dan git diff --check PASS |
| Penerbitan cache | Berkas aktif diganti atomik sesudah render berhasil. Uji nyata 15 f: 18 sampel saat render, nol penerbitan dini, MOV/alpha valid. [Bukti](../qc/r7/ktwajah/b2/atomic_publish.json) |

AI SLOP adalah salinan efek dari cache lama: 87 frame, 30 fps, 1560×970; grid/durasi asalnya dipertahankan. Ia bukan salah satu dari 15 grup Remotion baru di tabel.

Masalah yang ditemukan saat merakit telah diperbaiki: label menyentuh slab, narasi kartu menimpa angka/terlalu dekat jari, dan narasi “video” menyentuh tokoh Gemini. Angka batas saja tidak menemukan keduanya; posisi akhir dipilih setelah membuka rakitannya. Kegagalan moov cache disebabkan pembaca membuka MOV yang masih ditulis; keluaran cache sekarang memakai berkas sementara lalu os.replace, dan rakitan diulang setelah lapisan siap.

## File dan cara melanjutkan

Kode: `remotion/src/video/bersama/kt83/{Narasi,Slab,GelombangKata,gelombang,Cincin,KataDada,index,types}`, `lego/r7_ktwajah.py`; pendaftaran: `lego/r7_override_ktwajah.json`. Root.tsx dan tema.ts tidak perlu diedit. Tidak mengedit override pekerja lain, UI/IG/Blender/D, audio, edit, r7_gabung.py, kamera atau transisi global.

Cache: `lego/cache/r7b2_narasi_*.mov`, symlink ke `/mnt/storage-projects/skill-dev-journey/r7/ktwajah/b2/`. Snapshot sebelum revisi dan props setiap grup ada di `qc/r7/ktwajah/b2/`.

Urutan bila perlu dibangun ulang dari folder proyek:

```sh
python3 lego/r7_ktwajah.py prepare-b2
python3 lego/r7_ktwajah.py render-b2
python3 lego/r7_ktwajah.py blur-aislop-b2
python3 lego/r7_ktwajah.py override-b2
python3 lego/r7_ktwajah.py check
python3 lego/r7_ktwajah.py pixels-b2
```

Rakit daftar global dengan `python3 r7_gabung.py` dari folder `lego/` (skrip memakai path relatif; hanya dijalankan, tidak diedit). Bukti rentang dibuat dengan `python3 qc/r7/ktwajah/b2/proof.py ranges`, lalu `stills` dan `strips`; fungsi rentang memakai compose.py dan mempertahankan grid kamera/footage. Pekerja lain harus selesai menulis aset yang dibaca saat merakit bukti.

**Sisa:** penilaian mata terpisah atas kesamaan rasa dan gerak; kamera/transisi finishing oleh Sutradara, lalu integrasi SFX/audio. Tidak ada pertanyaan atau persetujuan baru yang diperlukan untuk lapisan ini. Token sesi tidak tersedia dari lingkungan ini.

## Ronde 2

Cakupan D-485 / `TASK-R7B2-narasi-r2`: T012 (“yang kita pake,”), T036/T037 (“beberapa bagian”, “masih”), waktu masuk T052 (“Jadi gak usah”), dan penutup “bagi yang beruntung.”. Adegan lain serta VIRAL!! dipertahankan.

### Kondisi sebelum perubahan

Frame sumber yang dibuka: [sebelum](../qc/r7/ktwajah/b2/ronde2/before_sheet.jpg), still footage 7,8 / 21,9 / 38,4 / 83,6 di direktori yang sama. Kepala berada di tengah, baju bermotif dan tangan/mic memenuhi dada. Pada 7,8 dtk busur memenuhi kanan atas; di bawah ujung kanannya ada dinding kosong. Pada 21,9–22,6 dtk slab memenuhi bidang atas, tetapi dinding kanan bawah di luar slab masih kosong; dekorasi VIRAL!! memang disengaja dan tidak menjadi sasaran perubahan. Pada 38,4 dtk slab serta label masih hadir, sehingga cincin harus menunggu keduanya habis. Pada penutup, dinding kanan kepala tenang dan cukup lebar untuk tumpukan dua baris; dada justru dilintasi jari.

Acuan yang dibuka: [spine 1/7, strip Zache dan contoh gagal](../qc/r7/ktwajah/b2/ronde2/acuan_dibuka.jpg). Gelombang bekerja karena huruf baru masuk di bidang polos dan kata lama tetap pada jangkar yang sama. Kondisi ini ada di dinding, sehingga penutup memakai satu jangkar, Poppins putih hangat, tanpa wadah; “beruntung.” lebih besar dan bobot 800.

Awal sesi: `git fetch origin main`; doctor hanya gagal PETA basi, sama dengan pengecualian tertulis di R7B2-BERSAMA. Profil siirfan LULUS. Tidak mengubah PETA/skill, tidak commit.

### Hasil dan bukti terbaru

[Still sebelum / sesudah / spine](../qc/r7/ktwajah/b2/ronde2/sebelum_sesudah_spine.jpg) · [klip penutup sampai 84,52](../qc/r7/ktwajah/b2/ronde2/penutup_82.98-84.52.mp4) · [frame terakhir](../qc/r7/ktwajah/b2/ronde2/sesudah_2532.jpg).

| Momen | Perubahan D-485 | Bukti gerak, 20 frame berurutan |
|---|---|---|
| 7,8 | T012 turun ke dinding kanan di bawah ujung busur; seluruh frasa “yang kita pake,” tetap satu jangkar. Busur tidak diubah | [yang kita pake](../qc/r7/ktwajah/b2/ronde2/strip_yang_kita_pake.jpg) |
| 21,7–22,6 | T036/T037 turun ke bawah bidang AI SLOP di dinding kanan. Slab, warna, kepala, serta semua dekorasi parodi tetap | [beberapa / bagian](../qc/r7/ktwajah/b2/ronde2/strip_beberapa_bagian.jpg), [masih](../qc/r7/ktwajah/b2/ronde2/strip_masih.jpg) |
| 38,1–38,5 | T052 ditahan sampai frame 1155 (38,5385 dtk), sesudah slab/label habis pada 38,5218 dtk. “Jadi/gak” yang sudah diucapkan muncul dengan usia gerak aslinya; “usah” meneruskan gelombangnya. Kata berikutnya tidak digeser | [slab keluar → cincin masuk](../qc/r7/ktwajah/b2/ronde2/strip_slab_keluar_cincin_masuk.jpg) |
| 83,0–84,52 | “bagi” di dinding, lalu “yang / beruntung.” di satu jangkar. Poppins putih hangat, tanpa wadah; kata terakhir 104 px/bobot 800, pengantar 88 px/bobot 700. Gelombang masuk, tanpa gerak keluar | [bagi](../qc/r7/ktwajah/b2/ronde2/strip_bagi.jpg), [yang / beruntung](../qc/r7/ktwajah/b2/ronde2/strip_yang_beruntung.jpg), [ekor tetap](../qc/r7/ktwajah/b2/ronde2/strip_ekor_tetap.jpg) |

Seluruh still dan tujuh strip dibuka. Penilaian kreatif tetap milik penilai mata terpisah. Kepadatan/dekorasi VIRAL!! dipertahankan sesuai penolakan Sutradara terhadap usul merapikannya; pemeriksaan Ronde 2 ini memastikan narasi di luar bidang slab.

### QA teknis

- TypeScript, motion_lint, py_compile dan diff whitespace: **PASS**.
- Empat cache: **519 frame**, 1920×1080, 30000/1001. [Cakupan atribut dan cache](../qc/r7/ktwajah/b2/ronde2/checks.json) hanya mengizinkan T012, T036/T037, gerbang tampil T052, dan penutup. Cue/kata, kamera dan blok lain identik.
- [Perbandingan frame](../qc/r7/ktwajah/b2/ronde2/frame_identity.json): dari 473 frame tiga grup lama, **416 identik**; 57 yang berubah tepat di rentang yang diminta. **171 frame parodi tetap identik**. Bagian T053 dan seterusnya memakai paket ProRes lama langsung, sehingga tidak ikut berubah karena render ulang.
- [Pemeriksaan alpha](../qc/r7/ktwajah/b2/ronde2/alpha_checks.json): tidak ada irisan bidang busur/slab pada 15 frame T012 dan 33 frame T036/T037. T052 kosong selama slab masih ada; tinta pertama frame 1155.
- Penutup 46 frame mulai f2487. Teks tetap utuh pada **27 frame terakhir**, termasuk **f2532 pada 84,4844 dtk**, yang bertahan sampai durasi 84,5178 dtk (= 84,52). Tidak ada animasi keluar. [Waktu](../qc/r7/ktwajah/b2/ronde2/timing.json).
- Still/strip diambil dengan indeks frame langsung; nomor pada strip tidak bergantung pada seek waktu.
- Rakitan sebelum/sesudah memakai kamera dan aset pekerja lain yang sama. Klip: [7,25–8,5](../qc/r7/ktwajah/b2/ronde2/after_render/rentang_7.25-8.5.mp4), [21,4–22,8](../qc/r7/ktwajah/b2/ronde2/after_render/rentang_21.4-22.8.mp4), [37,95–39,3](../qc/r7/ktwajah/b2/ronde2/after_render/rentang_37.95-39.3.mp4). Indeks lengkap: [ranges.json](../qc/r7/ktwajah/b2/ronde2/ranges.json), [strips.json](../qc/r7/ktwajah/b2/ronde2/strips.json).

### Integrasi dan kepemilikan

Override sendiri mengganti sumber T006, T026, T052 dan menambah `NARASI_PENUTUP_R2`. Cache aktif: `lego/cache/r7b2_narasi_r2_{workflow_raw,parodi_raw,publish,penutup}.mov`. Semua diterbitkan atomik; cache sebelum revisi tetap ada. Uji pembaca saat T052 dibangun ulang ada di [atomic_publish.json](../qc/r7/ktwajah/b2/ronde2/atomic_publish.json).

Penutup memakai patch opak pada 82,9829–84,5178 dtk. Basisnya merender ulang **hanya ekor** DuniaIG dengan kamera/props yang sama, menyembunyikan T094/T095 melalui komposisi `PenutupBasis` milik narasi, lalu memasang alpha narasi baru. Tidak ada edit di b6/IG, override IG, audio, r7_gabung.py atau r7_finishing.py. Karena resep dasar berhenti pada 83,817, langkah ekor finishing yang sudah ada tetap diperlukan pada rakitan utama; frame terakhirnya sekarang sudah memuat “yang beruntung.”. Cache patch sendiri juga mencakup seluruh ekor 84,52.

Perubahan kode: `lego/r7_ktwajah.py`, `kt83/types.ts`, `kt83/{Narasi,Cincin,PenutupBasis}.tsx` serta satu Composition tambahan di Root.tsx. `tampilMulai` hanya dipakai T052; ukuran kata khusus hanya dipakai “beruntung.”. Hash r7_gabung, r7_finishing dan seluruh override pekerja lain tetap sama ([checks.json](../qc/r7/ktwajah/b2/ronde2/checks.json)). `r7_gabung.py` hanya dijalankan untuk memperbarui resep turunan; tidak diedit. Tidak commit.

Bangun ulang dari folder proyek:

```sh
python3 lego/r7_ktwajah.py prepare-r2
python3 lego/r7_ktwajah.py render-r2
python3 lego/r7_ktwajah.py override-r2
python3 lego/r7_ktwajah.py check-r2
python3 qc/r7/ktwajah/b2/ronde2/proof.py identity
python3 qc/r7/ktwajah/b2/ronde2/alpha_check.py
```

Bukti dibuat dengan `proof.py ranges` lalu `proof.py images`. **Siap ditinjau**; belum merupakan putusan QC kreatif atau render master penuh. Token sesi tidak tersedia dari lingkungan ini.
