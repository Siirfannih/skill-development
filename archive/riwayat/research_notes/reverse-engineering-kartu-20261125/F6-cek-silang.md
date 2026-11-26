# F6 · Cek silang bukti, uji transfer, dan banding anti-slop

Tanggal: 25 November 2026. Ditulis oleh Claude (Opus) setelah melanjutkan dari sesi Gemini.

## 0. Metode dan independensi

- **Audit Gemini di `scratch/F6-audit-bukti.md` tidak dipakai sebagai dasar.** Atas permintaan Irfan, semua prinsip diaudit ulang oleh 3 auditor baru (Sonnet). Mereka dilarang membuka `scratch/` lama dan `*-belajar.md`, dan wajib membuka sendiri keyframe, bagian vault, dan contoh gagal untuk minimal 2 kartu per prinsip. Brief auditor: `scratch/BRIEF-AUDIT-ULANG.md`. Laporan lengkap per butir beserta redaksi pengganti: `scratch/F6-audit-ulang-A.md` (apple-saas-ui, talking-head-kinetic), `-B.md` (documentary-archive, tactile-paper-collage), `-C.md` (editorial-metaphor-canvas, minimalist-dataviz-kinetic, F4).
- Status per butir: **LULUS** (≥ 2 kartu independen cocok), **LULUS DENGAN REVISI** (cocok setelah angka/redaksi/bukti diperbaiki), **TURUN** (hanya 1 kartu atau 2 kartu dari kreator yang sama → catatan), **GAGAL** (0 kartu cocok → dibuang).
- Cek otomatis: semua path lengkap yang dikutip di F3/F4/F5 ada di disk (0 hilang).
- Batasan audit:
  - Auditor A memecah kerja ke 3 sub-agent. Hasilnya tetap dari sumber primer, tetapi tidak dikerjakan satu orang.
  - Auditor C menandai 15 keyframe yang dikutip F4 sebagai belum dibuka (TDB: 83-k8, 85, 89, 92, 97, 91, 90, 86, 77, 48, 25, 32, 19-k1, 04, 98-k1). Sebagian besar kartu itu sudah dibuka auditor A/B di audit tema.
  - Klaim yang hanya bersandar pada `F1-decisions-visual.md` ditandai "tidak diverifikasi" karena bukan sumber primer.

## 1. Rekap per file

| File | LULUS | LULUS+REVISI | TURUN | GAGAL |
|---|---|---|---|---|
| F3 apple-saas-ui (9 keputusan + 5 anti-contoh) | 4 | 10 | 1 | 0 |
| F3b apple-saas-ui (10) | 3 | 7 | 0 | 0 |
| F3 talking-head-kinetic (8 + 3) | 2 | 8 | 1 | 0 |
| F3b talking-head-kinetic (10) | 0 | 9 | 1 | 0 |
| F3 documentary-archive | 6 | 10 | 2 | 0 |
| F3b documentary-archive | 3 | 6 | 1 | 0 |
| F3 tactile-paper-collage | 8 | 3 | 0 | 0 |
| F3b tactile-paper-collage | 4 | 3 | 0 | 1 |
| F3 editorial-metaphor-canvas (8 + 7) | 5 | 10 | 0 | 0 |
| F3b editorial-metaphor-canvas (10) | 2 | 8 | 0 | 0 |
| F3 minimalist-dataviz-kinetic (7 + 6) | 3 | 9 | 1 | 0 |
| F3b minimalist-dataviz-kinetic (10) | 4 | 5 | 1 | 0 |
| F4 I1–I8 | 0 | 7 | 1 | 0 |
| F4 §2.1 larangan tambahan (7) | 0 | 1 | 3 | 3 |
| **Total** | **44** | **106** | **12** | **4** |

Satu butir documentary dan satu butir tactile tidak diverifikasi (hanya bersandar F1-decisions / contoh-gagal/10 tidak dibuka); keduanya tidak dibawa ke F7.

Bacaan: hampir semua prinsip tema punya dasar visual nyata, tetapi **106 dari 166 butir butuh revisi**. Yang rusak biasanya bukan prinsipnya, melainkan rujukan, angka, dan label epistemiknya (§3).

## 2. Dibuang atau diturunkan

**GAGAL (dibuang):**
1. F4 §2.1-2 larangan emoji: 0 kartu cocok; `96-k4` justru memakai emoji sebagai token makna.
2. F4 §2.1-5 "maks 1 hero motion per adegan": kartu yang dilihat bergerak (88, 93-k14, 87-k9) memadukan beberapa gerak sekaligus. Sumbernya hanya skill pembanding.
3. F4 §2.1-6 larangan copy slop: tidak ada kartu atau contoh gagal yang menunjukkannya.
4. F3b tactile SD-2 foley kertas terukur: tidak ada kartu dengan bunyi kertas (02 bubble/water drop, 97 tanpa SFX, 98 hanya swish, 95 tanpa bagian Audio). Itu aturan produksi, bukan temuan kartu.

**TURUN jadi catatan (1 kartu atau 1 kreator):**
- apple K9b vakum −45…−55 dBFS + anggaran 3 tingkat puncak (hanya 94).
- talking-head K5 ikat teks ke transform kamera (26 dan 87 sama-sama kreator Zache); rack-focus hanya 87.
- talking-head F3b SD-5 (tempo 1.0, jeda ≤ −50 dBFS, guard 50 ms = aturan repo, bukan pengamatan kartu).
- documentary K-05 stabilo pas-badan (hanya 48 bersih; 46-k2 kotak tidak pas-badan, 86-k6 kontras rendah).
- documentary K-07 teks terkunci di pusat selama montase (still hanya membuktikan posisi; bertahannya lintas potongan tidak terlihat; 46 dan 86 kreator sama, Lumitris).
- documentary F3b SD-5 (hanya 92).
- minimalist D5 dan F3b KT-4 angka menembus batas (hanya 67 + 33, brand sama Island).
- F4 I6 ritme napas (hanya 2 tema bersih, keduanya sebagian hipotesis; 94-k13 adalah peta bunyi, bukan "jeda tekan").
- F4 §2.1-1 scale(0)/ease-in, §2.1-4 penanda slide generik, §2.1-7 kontinuitas arah: dasarnya repo/sumber eksternal atau hanya "ketiadaan".

## 3. Kerusakan sistemik yang diperbaiki di F7

1. **ID slop-catalog salah rujuk di semua tema.** Yang paling berbahaya adalah **S-A4**. Artinya "objek/teks tanpa SFX, video terasa sepi", tetapi F4 I7 dan F3 editorial mengutipnya untuk membela senyap dan menolak spam, jadi maknanya terbalik. Kode lain yang salah rujuk: S-V16, S-T9, S-V18, S-T5, S-V4, S-T10, S-V24, S-V2, S-V6, S-V11, S-T8 (contoh-gagal/13 = TKS-14).
2. **Ringkasan LANTAI tidak setia.**
   - Rumus durasi baca `max(0,8; 0,30 + 0,06×huruf)` tidak ada di A8; rumus itu ada di slop-catalog S-T12.
   - Level tick ditulis −14…−20 dB, padahal E24 menulis −12…−18 dB.
   - Pengecualian "hening bermotivasi seperti 97" tidak ada di E25.
   - C18a artinya "satu keluarga aksen dominan", bukan "1 warna per babak".
3. **Rekomendasi T-card disajikan sebagai pengamatan.** Banyak "keputusan creator" audio di F3b, misalnya nama file `pop up.mp3` atau `basmenyebar.mp3`, berasal dari kolom `SFX:` kartu, yaitu saran adaptasi repo. Bunyi itu tidak terdengar di video referensinya. Di F7 butir seperti ini ditulis sebagai rekomendasi.
4. **Bukti yang salah arah**, dicabut atau dipindah ke "kapan dilanggar":
   - 32-k6: paragraf buram, bukan dokumen tajam.
   - 55-k3: merah di atas footage gelap, melanggar aturannya sendiri.
   - 31-k1: judul melebar sampai x≈97 %.
   - 89-k5/k10: teks di atas wajah.
   - 92-k3: inset ±50 %, bukan 25 %.
   - 56-k5: tiga warna jenuh.
   - 67-k8: serif italic + mint sekaligus.
   - 57-k6: pil di belakang teks, rasio 2,4×.
   - 80-k5: ada bayangan lembut.
   - 64-k3: kotak di belakang teks.
   - 73-k6: kata ±9 % H, bukan raksasa.
   - 83-k1: wajah penuh frame, bukan ruang negatif.
   - 63-k1: wallpaper tajam dan cerah; jangan ditiru sebagai wallpaper buram.
   - Angka "4,5–6,8/dtk" adalah total event earshot, bukan jumlah pop.
5. **Klaim "muncul di ≥ 3 tema" terlalu luas.** Hasil hitung ulang:
   - I1 cocok untuk 3 tema (apple, editorial, minimalist).
   - I4 cocok untuk 3 tema (talking-head, documentary, tactile sebagian).
   - I5 tanpa apple.
   - I8 tanpa minimalist.
6. **Skala dua kutub.** Ambang ≥ 2,3× bentrok dengan editorial (37-k3 1,9×, 80-k7 2×). Ambang diturunkan ke ≥ 1,8×; zona tanggung 1,3–1,8× tetap dihindari.
7. **Kartu yang melanggar LANTAI A6** (campur gaya huruf dalam satu frasa: 88-k7, 73-k8). Lantai menang; pola ini hanya boleh bila ditulis di RESEP proyek.

## 4. Uji transfer

**Uji F6B (Gemini, 2 brief: apple-saas-ui dan talking-head-kinetic).** Dinilai oleh agen Opus terpisah di `scratch/F6-penilaian-transfer.md`. Hasil: 3 frame LULUS DENGAN CATATAN, 1 GAGAL.
- **A2 GAGAL:** wallpaper diburamkan dan digelapkan, padahal 63-k1 tajam dan cerah. Jendela gelap di atas latar gelap kontrasnya 1,06:1. Teks masuk zona merah dan memakai glif ✓.
- **A1:** 6 penanda alat desain dipakai sekaligus, sedangkan referensi masing-masing memakai satu. "template?" diberi 3 cara penekanan.
- **B1:** 3 gerak independen jatuh di frame yang sama, ada ukuran tanggung 1,44×, dan durasi baca tidak mungkin terpenuhi.
- **B2:** paling terasa manusia (bukti tampil berurutan selebar layar, teks diam di satu poros). Catatannya ada whoosh di cut keras.

**Uji F3b (Sonnet, editorial-metaphor-canvas + sound + KT).** Dinilai oleh aku di `scratch/F6-penilaian-transfer-audio-kt.md`. Hasil: Frame 1 LULUS DENGAN CATATAN (5 kelompok elemen vs 2–4 di referensi 88-k6/80-k1), Frame 2 LULUS. Alasan creator dipahami dengan kata sendiri, misalnya "bel tidak berbunyi supaya pertanyaan hook menggantung". Penyebab hasilnya lebih baik (tema lebih sederhana atau agen berbeda) tidak bisa dipisahkan.

**Prinsip yang tidak bisa dipakai tanpa melihat kartu, dan perbaikannya di F7:**
1. Angka rentang dan menu "a/b/c" membuat agen memakai semua opsi. F7 memakai satu default dan satu pemicu.
2. Kode ID di badan aturan dipakai sebagai stempel lulus, sampai terbalik. F7 menaruh ID hanya di baris `Bukti:`.
3. "% H" dari video 16:9 ambigu di 9:16. F7 menulis ukuran dalam px @1080 dan rasio.
4. Jendela waktu dan durasi baca tidak muat pada tuturan cepat. Aturan F7: VO tidak dipercepat, jendela beat yang menyesuaikan; di atas 2,5 kata/dtk, tampilkan frasa 2–3 kata.
5. Resep satu konteks tertempel ke konteks lain (redaman B-roll dipakai di wallpaper desktop). F7 menulis kondisi pemicu, dan uji kontras berlaku juga untuk panel vs latar, bukan hanya teks.
6. Keyframe tanpa deskripsi tidak bisa ditiru. F7 memberi satu kalimat "apa yang dilihat" per keyframe wajib.
7. Bentrok antardokumen yang tidak diputuskan. Tabel "bila bentrok" ada di `draf-skill/SKILL.md`.

## 5. Bentrok yang butuh keputusan Irfan

1. **Tick per kata.** LANTAI E24 (aturanmu) menyediakan mode `per-word` untuk explainer/UI. Kartu referensi yang sudah dilihat bergerak (93, 97, 98) senyap di kata KT, dan S-A4 menganggap teks tanpa SFX sebagai slop.
   - Default di draf: ikut E24, mode dipilih per proyek di RESEP. Tema hanya merekomendasikan.
   - Pertanyaannya: apakah untuk explainer faceless kamu ingin default `accent-only` mengikuti referensi, atau tetap `per-word` lembut?
2. **Campur gaya huruf dalam satu frasa** (88-k7 serif bold + sans; 73-k8 sans + serif italic). Kartu bagus memakainya, LANTAI A6 melarang. Default di draf: A6 menang, pengecualian harus ditulis di RESEP.

## 6. Perbandingan dengan `anti-slop-design` (ADDENDUM-SUMBER)

Laporan lengkap: `scratch/F6-banding-anti-slop.md`.
1. Hampir semua larangan video mereka sudah ada di LANTAI, F4, atau F3: glow biru, kaca dekoratif, kartu identik, bayangan slide, UI palsu, tipografi acak, SFX kayu.
2. Sejalan terkuat, dengan bukti dibuka: contoh-gagal 03, 04, 14, 20 dan `curves.ts`. Larangan palet kayu cocok persis dengan S-A5.
3. Celah yang didukung bukti kita: satu, yaitu menambah `backdrop-filter` ke cek kode `radial-gradient` (contoh-gagal/14 + S-V21).
4. Tidak didukung bukti kita, jadi tidak masuk inti: gradien teks, mono sebagai kostum, font default, Title Case, slop words, emoji, safe area 9:16, angka 3–5 dtk per shot, hook 1,5 dtk.
5. Bentrok font: mereka satu keluarga, kita boleh sans + serif italic. Bukti kita lebih kuat (contoh-gagal/01: masalahnya kontras dan skala, bukan serif).
6. Bentrok tempo: mereka ≤ 5 dtk/shot, kita hold 2–15 dtk. Referensi mereka sendiri melanggar angka itu, jadi ini pedoman, bukan larangan.
7. Bentrok glow: mereka melarang neon, padahal 83-k7 (kartu bergerak) memakainya. Kita menulis "glow terikat kata/peristiwa".
8. Bentrok caption: mereka 4–6 kata dengan pelat, kita 1–3 kata satu jalur. Kita lebih kuat (contoh-gagal/01, 03).
9. Bentrok SFX: mereka SFX di tiap perubahan, kita senyap default. Kita lebih kuat, tetapi S-A4 kita sendiri memuat sisi sebaliknya (lihat §5.1).
10. Bentrok palet krem/near-black + 1 aksen: mereka melarang, padahal itu K4 editorial kita. Palet harus datang dari brief.
11. Kartu dan angka besar (57-k3, 67-k2) adalah contoh positif referensi. Larangan hanya berlaku untuk dekorasi tanpa makna.
12. F4 §2.1, yang ditulis Gemini dari skill ini, sebagian besar tidak lolos audit (§2).
13. Rubrik skor §9 tidak disalin. Skor 0–10 yang ditulis model sendiri tidak dipakai sebagai bukti.

## 7. Status kelulusan F6

Setiap prinsip yang dibawa ke F7 berstatus LULUS atau LULUS DENGAN REVISI dengan redaksi auditor, dan didukung ≥ 2 kartu independen yang dibuka dari sumber primer. Butir TURUN masuk bagian "Catatan" di file tema. Butir GAGAL dan butir yang tidak diverifikasi tidak dibawa.

File F3/F4/F5 lama tidak diedit, supaya tetap menjadi jejak. Koreksi diterapkan di `draf-skill/`.
