# Spesifikasi F7 · format draf skill (untuk penulis file tema)

Sumber keputusan format: `BRIEF-GEMINI.md` §4 F7, `ADDENDUM-2-AUDIO-KT.md` (perubahan format F7), dan hasil F6:
`scratch/F6-penilaian-transfer.md` (uji transfer F6B) dan `scratch/F6-penilaian-transfer-audio-kt.md` (uji F3b).

## Pelajaran dari uji transfer (wajib dipatuhi)
1. **Kode ID tidak boleh berada di badan aturan.** Di uji transfer, ID dipakai sebagai stempel lulus, bahkan terbalik (S-A4 dikutip untuk membela senyap, kartu 63 untuk wallpaper buram). ID kartu/keyframe hanya muncul di baris `Bukti:` di akhir tiap keputusan. Kode slop (S-*) hanya ditulis bersama artinya dalam satu frasa.
2. **Satu nilai default + satu pemicu tegas**, bukan rentang lebar atau menu "a/b/c". Rentang dan "atau" membuat agen memakai semua opsi sekaligus (6 penanda alat desain di satu frame). Bila ada dua mode, tulis pemicu pemilihnya.
3. **Anggaran keras per frame:** maks 1 jenis penanda/dekorasi fungsional, maks 1 cara penekanan per frasa (LANTAI A6; kartu 88 dan 73-k8 melanggarnya, Lantai menang), rasio ukuran teks 1,0–1,3× atau ≥ 1,8× (tidak ada ukuran tanggung di antara 1,3× dan 1,8×; koreksi audit C: kartu editorial 37-k3 1,9× dan 80-k7 2× sah, jadi ambang lama 2,3× terlalu tinggi; lompatan ≥ 4× disimpan untuk titik balik).
   **Koreksi audit C (F6):** "maks 1 hero motion per adegan" GAGAL diverifikasi — kartu 88, 93-k14, 87-k9 memadukan beberapa gerak sekaligus. Jangan tulis sebagai larangan. Yang boleh ditulis (sebagai hipotesis dari uji transfer F6B frame B1): beberapa gerak bersamaan sah bila digerakkan satu sumber (kamera, satu objek yang mendorong lainnya, satu arah); yang dihindari adalah ≥ 2 animasi independen yang dimulai di frame sama dan berebut mata.
   Larangan emoji (F4 §2.1-2) dan larangan copy slop (§2.1-6) juga GAGAL (96-k4 memakai emoji sebagai token) — jangan masukkan. §2.1-1 (scale 0/ease-in), §2.1-4 (penanda slide generik), §2.1-7 (arah gerak) hanya catatan, bukan prinsip kartu.
4. **Ukuran dalam px pada kanvas 1080** (lebar untuk 9:16, tinggi untuk 16:9) + rasio antar-tingkat. Jangan menyalin "% H" kartu 16:9 mentah ke 9:16.
5. **Rantai sebab-akibat**: setiap keputusan (visual, KT, sound) ditulis sebagai:
   `Keputusan` → `Niat creator` (masalah apa yang diselesaikan) → `Dampak ke frame` → `Dampak ke penonton` (tandai `(hipotesis)` bila tanpa data) → `Kapan dilanggar / kapan gagal` (dengan kondisi penyebab) → `Bukti:` (ID kartu + nama file keyframe; label `belum dilihat bergerak` / `belum didengar` bila berlaku).
6. **Anti-contoh menyebut kondisi penyebab**, bukan hanya nama gagalnya, dan menunjuk gambar `contoh-gagal/NN-*.jpg` bila ada.
7. **Keyframe wajib dibuka** (2–3 per tema) masing-masing diberi deskripsi satu kalimat tentang apa yang harus dilihat (karena agen tanpa akses gambar tidak bisa menebak tebal garis, posisi pita, dsb.).

## Hanya prinsip yang lolos F6
Masukkan hanya keputusan berstatus LULUS atau LULUS DENGAN REVISI di `scratch/F6-audit-ulang-{A,B,C}.md` (pakai redaksi pengganti auditor). Butir TURUN JADI CATATAN masuk bagian "Catatan (1 kartu, belum prinsip)" maks 3 baris, atau dibuang. Butir GAGAL dibuang. Perbaiki ID slop yang salah rujuk sesuai temuan auditor.

## Keputusan lintas dokumen (sudah diputuskan di SKILL.md, file tema tidak boleh bertentangan)
- VO tidak pernah dipercepat; bila kata tidak muat, jendela beat yang menyesuaikan.
- Tuturan > 2,5 kata/dtk: gabung jadi frasa 2–3 kata per tampil, bukan memaksa durasi baca per kata.
- Satu keluarga warna aksen per video; satu kemunculan aksen aktif per frasa.
- Tick KT: ikut LANTAI E24 (mode dipilih per proyek di RESEP/EDITING: `per-word` untuk explainer/UI, `accent-only` untuk dokumenter/talking head/editorial tenang). File tema boleh merekomendasikan mode, tidak boleh melarang mode lain. Bentrok ini dicatat untuk Irfan.
- Vakum pra-klimaks hanya berlaku untuk stem musik; bed ambien tetap ada (tidak ada hening digital).
- Blur sebagai makna (kabur→jelas, fokus berpindah) boleh; blur sebagai cara masuk bawaan tidak.
- Glow boleh hanya bila terikat ke kata/peristiwa/objek bermakna (contoh `88-k6` halo dial, `83-k7` neon); glow ambient biru-ungu tanpa objek bermakna = sidik jari slop (NEGATIF 10).
- Demo UI ber-VO: teks ucapan pindah ke pita terpisah di atas UI (tidak menumpuk di UI); bila aksi UI butuh 100 % perhatian, KT boleh jeda ≤ 2 dtk dan dicatat sebagai pengecualian di RESEP.

## Struktur file `draf-skill/tema/<tema>.md` (target 1.500–2.500 token ≈ 6.000–10.000 karakter)
```
---
name: tema-<tema>
description: <satu kalimat: apa + kapan dibuka>
---
# Tema: <nama>
## 1. Identitas (≤ 3 kalimat) + kapan cocok / tidak cocok
## 2. Keyframe wajib dibuka saat mendesain (2–3, path lengkap + 1 kalimat apa yang dilihat)
## 3. Keputusan visual (4–6, format rantai)
## 4. Kinetic typography (3–4, format rantai)
## 5. Sound design (3–4, format rantai)
## 6. Anti-contoh khas tema (2–3, kondisi penyebab + gambar contoh-gagal)
## 7. Dua contoh kerja: sebelum → sesudah, dengan alasan (konten Irfan: Jadisatu / @siirfannih / Soalnya Gini)
## 8. Pertanyaan pembeda (2–3) + status bukti (apa yang masih hipotesis)
```
Bahasa Indonesia lugas, tanpa pujian, tanpa kata sifat kosong ("elegan", "premium"). Path keyframe: `./../motion-graphic/guide/referensi/sheets/keyframes/<file>`.
