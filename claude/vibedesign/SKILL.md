---
name: vibedesign
description: Mendesain konten statis (carousel Instagram, poster, slide sosial, cover) 100% lewat kode HTML/CSS/SVG lalu export PNG deterministik, dengan urutan baca yang jelas dan karakter yang beraksi. Pakai setiap kali ada permintaan carousel, poster, feed IG, cover, atau revisi desain statis; bukan untuk video (motion-graphic) atau UI aplikasi/website.
---

# Vibedesign

Desain konten = urutan baca yang jelas, visual sebagai pendukung. Ini bukan UI: layout UI menuntut struktur yang seragam dan rapi, sedangkan desain konten menuntut mata pembaca jatuh di tempat yang aku tentukan, lalu bergerak berurutan sampai pesan habis.

Skill ini lapisan penaik mutu, bukan template. **Konsep dan pesanku + 2–4 kartu mekanik dari `cookbook/` = desain baru.** Gaya satu proyek tidak dibawa ke proyek lain.

## Mulai di sini
1. **Sesi produksi desain:** baca `DESIGN-CORE.md`, lalu `projects/<proyek>/` (`BRIEF.md`, `RESEP.md`, `DECISIONS.md`, `TAHAP.md`). Belum ada kode sebelum BRIEF terisi.
2. **Revisi dariku:** catat dulu ke `projects/<proyek>/DECISIONS.md`, lalu ubah kode yang ada (bedah, bukan bangun ulang). Bagian yang aku puji atau tidak aku komentari tetap utuh.
3. **Membedah referensi baru:** `cookbook/BEDAH.md` (tiga lapis, wajib sebelum menulis kartu atau meracik dari referensi baru) → `cookbook/KARTU-TEMPLATE.md`.
4. **Mengubah aturan skill:** `../../SARINGAN.md` + `../../EVALS-DESIGN.md`; asal-usul ke `SUMBER.md`.

## NEGATIF bersama
Batas keras anti-slop (sans saja, permukaan datar, objek lengkap, satu fokus) ada di `../_bersama/NEGATIF.md`; baca sebelum merancang.
Untuk desain statis berlaku butir 1-5 dan 7; butir 6 dan 8-10 khusus video. Hanya kalimat eksplisit Irfan di sesi itu yang membuka butir [keras].

## Lantai (selalu berlaku; isi lengkap di `LANTAI.md`)
- **TKS-01** Teks terbaca: kontras ≥ 4,5 : 1 (≥ 3 : 1 untuk ≥ 24 px atau ≥ 18,5 px tebal); tidak ada teks terpotong tepi atau menimpa teks lain.
- **KRK-02** Karakter, maskot, logo, dan aset bukan milik pihak lain (termasuk tiruan lewat bentuk + warna); semua aset tercatat di `assets/manifest.json`.

## Isi folder
| Path | Kapan dibuka |
|---|---|
| `DESIGN-CORE.md` | awal setiap sesi produksi |
| `guide/README.md` → `guide/<urusan>/GUIDE.md` | saat langkahmu menyebut urusan itu (pesan, hierarki, tipografi, komposisi, warna, karakter, hindari) |
| `cookbook/INDEX.md` | saat meracik; buka 2–4 kartu saja |
| `cookbook/BEDAH.md` | saat ada referensi baru yang belum jadi kartu |
| `tokens/README.md` | saat butuh ukuran kanvas atau rasio skala |
| `engine/README.md` | saat membangun, preview, atau export |
| `juri/README.md` | saat menjalankan atau membaca gerbang |
| `templates/` | saat membuat proyek baru |
| `evals/README.md` | saat mengubah skill |
| `SUMBER.md` | hanya saat mengubah skill (bukan instruksi) |
