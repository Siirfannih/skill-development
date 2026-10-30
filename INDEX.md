---
status: rule
scope: global
how_to_use: Baca berkas ini dulu. Muat hanya langkah yang tertulis di bawah, sesuai tugas yang sedang dikerjakan.
---

# Urutan muat

Setiap sesi baru memuat sedikit. Bobot berkas mengikuti statusnya, bukan panjangnya.

1. **Aturan inti:** `claude/STYLE-CORE.md`.
2. **Standar proyek:** `projects/<proyek>/BRIEF-STANDARD.md` bila ada. Hanya berkas itu yang menetapkan kriteria sukses proyek tersebut. Standar video sebelumnya dan skill lain tidak ikut sendiri.
3. **Kartu prinsip:** di `claude/principles/`, hanya kartu yang tugas ini butuh. Menu singkatnya ada di `claude/principles/README.md`.
4. **Skill:** `claude/<nama>/SKILL.md` hanya bila perannya cocok dengan tabel di bawah. Cabang `references/` dibuka hanya saat skill itu menyuruh, bagian yang dirujuk saja.
5. **Bukti dan arsip:** `evidence/` dan `archive/` dibuka hanya jika Irfan meminta verifikasi angka atau perbandingan dengan versi lama.

Saat menulis atau mengubah kode di repo ini, pakai `rtk` (https://github.com/rtk-ai/rtk) untuk perintah shell agar keluaran yang masuk ke konteks lebih kecil.

## Arti status

| Status | Arti | Kapan dimuat |
|---|---|---|
| `rule` | Wajib diikuti di cakupannya. Yang `scope: global` hanya hal yang Irfan kunci untuk semua sesi. | Sesuai `scope` |
| `principle` | Panduan desain beserta alasannya. Disesuaikan per proyek. | Hanya kartu atau skill yang tugas ini butuh |
| `benchmark` | Angka terukur dari video referensi tertentu. Rentang awal, bukan target. | Bersama kartu yang memakainya, bila tugasnya butuh |
| `evidence` | Data mentah. Bukan aturan. | Hanya untuk mengecek satu angka |
| `proposal` | Menunggu keputusan Irfan. | Saat membahas butir itu, bukan sebagai syarat |
| `archive` | Sudah diganti. | Tidak dimuat |

Header tiap berkas panduan: `status`, `scope` (`global` atau nama proyek), dan `how_to_use` satu baris. Naskah, storyboard, dan kredit di `projects/` adalah isi proyek, bukan aturan, dan boleh tanpa header itu.

## Otoritas

Instruksi langsung Irfan, lalu berkas standar proyek ini, lalu skill `claude/`, lalu `external/`. Untuk satu proyek, dokumen proyek itu menang atas skill. Usulan di kartu `proposal` tidak menimpa yang sudah dikunci.

## Skill `claude/`

| Skill | Pakai saat |
|---|---|
| `working-with-irfan` | Butuh cara bicara, uji masukan, atau cara menulis skill. Inti wajibnya sudah di STYLE-CORE. |
| `irfan-creative-workflow` | Awal proyek kreatif: urutan gerbang dan apa yang dibawa dari proyek lama. |
| `motion-graphic` | Video, motion, storyboard, naskah VO, bedah referensi. |
| `script-workshop` | Mencari hook dan mengembangkan naskah sampai disetujui. |
| `autopilot-prd` | Proyek dengan PRD atau antrean tertulis. |
| `jadisatu-canvas` | Membaca atau mengubah ruang Jadisatu Canvas. |
| `jadisatu-narrator-vo` | VO ini dipilih berkas standar proyek, atau VO marketing Jadisatu berbahasa Inggris. |
| `cinedance-block-library` | Brief blok untuk Seedance atau Higgsfield. |

Skill `external/` tercatat di `external/README.md`. Skill Irfan menang bila keduanya bentrok.

## Proyek

| Folder | Isi |
|---|---|
| `projects/_TEMPLATE/` | Contoh `BRIEF-STANDARD.md` untuk proyek baru. |
| `projects/ai-change-everything/` | Video 3 «Pengganti Kita Sendiri» (@siirfannih). Kriteria sukses: `BRIEF-STANDARD.md`. |
| `projects/jadisatu-60s/` | The Gap. Keputusannya tidak ikut ke proyek lain. |
| `projects/jadisatu-launch/` | Launch Jadisatu. `AUTHORITY.md` dan `ART-DIRECTION.md` hanya untuk proyek itu. |

Pintu lain: `scriptwriter/README.md` (ide sampai storyboard), `content-ops/README.md` (operasi harian), `autopilot-video/README.md` (sistem produksi). Semuanya prinsip untuk foldernya, bukan aturan global.
