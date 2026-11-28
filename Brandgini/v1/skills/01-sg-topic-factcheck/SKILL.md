---
name: sg-topic-factcheck
description: Memilih topik harian dari bank 164 topik Soalnya Gini dan menyusun fakta.md terverifikasi dengan sumber primer sebelum naskah ditulis.
---
# Skill 01: Topic Router & Fact-Sheet Builder

## Trigger
Dijalankan otomatis oleh Manda setiap awal siklus harian (00:00 WITA) atau saat antrean `queue/pending/` kosong.

## Anti-Pattern
- Mengambil fakta dari memori model tanpa verifikasi sumber primer (BI, SNI, Apple Support, jurnal, atau dokumentasi resmi).
- Memilih topik uang abstrak tanpa benda fisik yang bisa divisualisasikan.
- Memasukkan topik berisiko kebijakan **Tinggi** (nasihat medis/investasi, sengketa hukum/politik) di 30 hari pertama.

## Invariant
1. **Rotasi Gaya & Pilar**:
   - Pilih 1 topik dari bank 164 topik (prioritaskan `soalnya-gini-10-plan.md` untuk Episode 01–10).
   - Tentukan gaya visual di metadata:
     - `STYLE_A_EINSTEIN`: topik sains harian, psikologi, mitos, ekonomi konseptual (Indomaret, Mabuk Mobil, Es Puter, HP Beras, Rice Cooker).
     - `STYLE_B_VOX`: topik investigatif, sistem/mesin fisik, uang, regulasi, arsip (ATM, Uang Rp100rb, Petir TV, Septic Tank SNI, Karang Gigi).
2. **Struktur Wajib `episodes/epXX/fakta.md`**:
   - `topic_id`, `title`, `style_preset` (`STYLE_A_EINSTEIN` | `STYLE_B_VOX`), `opening_cap` (`Kalau…` | `Kenapa…` | `Katanya…`).
   - **5–8 Fakta Inti** masing-masing disertai URL/dokumen sumber primer.
   - **Zona Larangan (Forbidden Claims)**: daftar klaim yang dilarang masuk naskah (contoh: tanpa logo merek asli, tanpa saran medis/obat, tanpa klaim mutlak strategi perusahaan).
   - **Visual Anchor**: 3–5 objek fisik utama yang harus muncul sebagai *cutout* atau diagram.

## Gate (Wajib Lulus)
- Minimal **2 sumber primer** terverifikasi untuk klaim teknis/angka.
- Tidak ada tanda `[TBD]` atau angka tanpa sumber. Jika sebuah fakta belum terverifikasi, pindahkan ke bagian `UNVERIFIED_DO_NOT_USE` agar `02-sg-script-director` tidak memakainya.
