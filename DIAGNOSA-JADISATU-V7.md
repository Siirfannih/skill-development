# Diagnosa Jadisatu v7: kenapa hasilnya "storyboard jadi MP4"

Bahan yang diperiksa:
- `Jadisatu-Final-v7-1080p30.mp4` (152 dtk, 1920×1080, 30 fps): contact sheet 1 fps, deteksi cut, frame resolusi penuh.
- Repo `motion-production-pc`, branch `finishing/cloud-20261024` (commit `796a075 Final v7 render + QC`): `handoff/jadisatu-20261024/` (README, AGENTS, STATUS, FEEDBACK-LENGKAP, RETRO, `references/analysis/`, `production/video/qa/`).

Kesimpulan singkat: masalahnya ada di **instruksi dan alat ukur** yang diberikan ke model, bukan di modelnya. Karena itu ChatGPT dan Claude menghasilkan hal yang mirip: keduanya mematuhi paket yang sama.

## 1. Yang terlihat di video (bukti)

| Waktu | Masalah | Jenis |
|---|---|---|
| 0:08–0:11 | "Ada 1" lalu "Pertany… yaan ya": kata terpotong tepi dan tampil dobel di sambungan pan | Teks terpotong / dobel |
| 0:17 | "kerja bareng" menumpuk di atas lampu dan meja | Teks menabrak objek |
| 0:02, 0:06, 0:14, 1:31–1:32 | Frame penuh blur tanpa subjek yang terbaca | Blur sebagai pengisi |
| 0:48–0:59 | Tumpukan kartu menutupi teks kartu lain ("Untuk…", "…lesai?") | Teks tertimpa |
| 1:01–1:04 | Judul "1.000 calon pelanggan" dan "Sebelum mulai" terpotong di tepi atas | Keluar area aman |
| 1:03 | "Kebutuhan bisnis" (serif) dan "Calon pelanggan" tampil bersamaan di posisi sama | Dobel exposure (crossfade terselubung) |
| 1:15–2:07 | ± 50 dtk tanpa cut (cut terakhir 1:14,9, berikutnya 2:07,5), seluruhnya UI putih yang mirip satu sama lain | Ritme datar |
| 2:22, 2:27 | Frame hampir kosong | Frame kosong |
| Sepanjang video | Lima dunia visual: bubble Threads putih, UI Apple putih, voxel pixel, layar kode gelap, foto orang asli (NO PERFORM), kolase poster | Tidak ada satu art direction |

Teks, objek, dan visual yang "saling menabrak", seperti yang kamu rasakan, memang terukur di frame-frame di atas.

## 2. Akar masalah

### R1. Dokumen otoritas saling bertentangan, dan model memilih kompromi
| Sumber | Isi |
|---|---|
| `docs/FEEDBACK-LENGKAP.md` baris 25 | "Jangan membangun ulang proyek dari nol" |
| `docs/FEEDBACK-LENGKAP.md` baris 27 | "Storyboard bukan moodboard kasar: komposisinya harus menggambarkan hasil video … secara akurat" |
| `docs/FEEDBACK-LENGKAP.md` baris 270 | "Tidak ada izin untuk merombak desain setelah checkpoint ini" |
| `README.md`, `AGENTS.md` | Storyboard/approved-frames = "otoritas visual"; "pertahankan geometri, latar, urutan shot" |
| `STATUS.md` (mandat 24 Okt 11.44) | "Storyboard = gambaran kasar, bangun ulang versi final" |

Mandat terbarumu hanya tercatat di STATUS, sementara tiga dokumen lain yang dibaca lebih dulu (sesuai urutan "Mulai di sini") masih menyuruh mempertahankan storyboard. Hasilnya kompromi: S02, S07–S12, S14 dibangun ulang, tetapi S01, S03, S04, S13, dinding poster S08, dan plate NPNP tetap "terkunci" (STATUS: "Masih memakai build sebelumnya"). Itulah kenapa video terasa seperti tempelan.

### R2. Referensi digabung menjadi gaya hibrida, bukan satu arah
`00_master_apple_pixel_synthesis.json` menyatukan enam referensi yang gayanya berlawanan (Holy Freak pixel, Baikov, kamera OpenAI, Sol, Klickpin UI, Zapier) menjadi "Hybrid Pixel-Character × Apple-Style". Target "Apple style" butuh satu dunia yang tenang dan konsisten. Router per tipe scene justru mengizinkan tiap adegan memakai referensi berbeda.

### R3. Analisis referensi adalah interpretasi Gemini, bukan ukuran
Tujuh JSON di `references/analysis/` adalah keluaran Gemini. Skill-mu sendiri mencatat Gemini "tidak andal untuk level dan timestamp". Model mengikuti deskripsi kata-kata ("smooth", "premium") yang tidak bisa dieksekusi atau dicek.

### R4. QA mengukur hal yang salah
`qa/ref_compare.py` dan `qa/visual_qc.py` mengukur jumlah gerak (`motion_mean`), % frame diam, hold terpanjang, cut per detik, dan blur. Tidak ada satu pun cek untuk:
- teks terpotong atau keluar area aman
- teks menabrak teks/objek
- dua lapisan teks tampil bersamaan (dobel exposure)
- ukuran teks dan UI di layar HP

Padahal empat hal itu persis kegagalan yang terlihat di v7. Lebih buruk lagi, target "diam ≤ 37 %" mendorong agent menambah drift supaya angkanya lolos (STATUS v6: "Drift saat hold (anti-diam)"). Ini bertentangan dengan tujuanmu, yaitu setiap gerak punya maksud. QA lolos, lalu agent menyatakan selesai.

### R5. Tidak ada penilai independen sebelum dikirim
Agent menilai karyanya sendiri. RETRO ronde 1–3 mencatat pola yang sama berulang ("Lolos storyboard ≠ sudah diedit", "Storyboard approved ≠ kode setara"). Aturan sudah ditulis, tetapi tidak ada gerbang yang memaksanya dicek.

### R6. Skill yang benar tidak termuat, salinan lama ikut terbawa
RETRO finishing: "skill di ~/Proyek/video-editor/skills belum bisa diakses dari sesi cloud". Repo membawa salinan `skills/` sendiri (irfan-motion-director, motion-graphic-playbook), versi yang menurut audit saling bertentangan (temuan F1). Aturan "tidak ada teks tumpang tindih" (motion-director §16.2) ada, tetapi tidak dibaca.

### R7. Skala pekerjaan melompati gerbang "validasi satu adegan"
Mandat "terima beres sampai final": 13 adegan dan 84 shot dibangun ulang lalu dirender penuh dalam satu sesi (± 70 menit render). Tidak ada satu adegan yang lolos review lebih dulu sebelum pendekatannya diterapkan ke semua.

## 3. Cara tahu (deteksi otomatis)

Remotion merender HTML, jadi posisi setiap teks bisa dibaca langsung dari DOM per frame (`getBoundingClientRect`). Ini jauh lebih tepat daripada menebak dari gambar. Checker "layout integrity" per frame:

| Cek | Aturan | Menangkap |
|---|---|---|
| Area aman | Kotak teks di dalam margin 5 %, bukan di 8 % bawah (kecuali bleed XL yang ditandai) | 1:01–1:04 |
| Teks vs teks | Dua kotak teks yang terlihat (opacity > 0,15) tidak beririsan | 1:03, 0:10 |
| Teks vs objek | Kotak teks tidak menutup objek bertanda `data-subject` > 10 % | 0:17, 0:48–0:59 |
| Ukuran minimum | Teks wajib ≥ 56 px di master | layar UI kecil |
| Satu fokus | Maksimal 1 blok teks + 1 subjek aktif per frame | frame padat |
| Frame kosong / blur | Tidak ada frame tanpa elemen tajam > 3 f di luar transisi | 0:06, 0:14, 2:22 |

Ditambah dua cek non-otomatis:
- **Kritikus buta**: subagent baru yang hanya diberi frame kita + frame referensi, menjawab "tiga hal paling amatir" (motion-director §16.4).
- **Satu adegan dulu**: kamu menilai satu adegan jadi sebelum adegan lain dibangun.

## 4. Cara memperbaiki (urut)

1. **Satu dokumen otoritas** (`AUTHORITY.md`) dengan urutan menang yang eksplisit. Tulis tegas apakah storyboard itu "komposisi terkunci" atau "sketsa kasar", lalu hapus atau tandai kalimat lama yang bertentangan. Model tidak bisa menebak versi mana yang kamu maksud.
2. **Satu art direction untuk film ini.** Contoh: Apple-style putih + biru #2273FA sebagai dunia utama. Dunia pixel hanya dipakai bila cerita butuh, dengan satu transisi bab yang jelas. Foto NPNP dan kolase poster diputuskan masuk atau keluar, bukan dibiarkan "terkunci".
3. **Referensi diganti jadi ukuran + contoh frame.** Per referensi: angka terukur (alat sendiri, bukan Gemini), 3–5 frame contoh, plus "ambil: …" dan "jangan ambil: …".
4. **QA diganti.** Pasang checker layout integrity (§3) sebagai gerbang wajib. Hapus target "% diam" sebagai syarat lolos, karena diam saat membaca itu benar.
5. **Kerja per adegan**: build satu adegan → checker lolos → kritikus buta → kamu nilai → baru adegan berikutnya.
6. **Skill**: pakai `motion-graphic` dari repo `skill-development` sebagai satu-satunya skill video, buang salinan lama di `motion-production-pc/skills/`, dan jadikan setiap kegagalan di tabel §1 kasus eval.
