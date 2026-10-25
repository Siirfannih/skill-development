# Decision — memilih, memutuskan, dan kapan bertanya

Baca saat harus memilih di antara beberapa pilihan (family, gaya teks, teknik, transisi), saat dua aturan terasa bertabrakan, atau saat ragu apakah perlu bertanya ke Irfan.

## Isi

1. Siapa memutuskan apa
2. Urutan prioritas saat aturan bertabrakan
3. Memilih family visual
4. Memilih teknik per momen
5. Membawa pengalaman, bukan template
6. Biaya dan kredit
7. Kapan bertanya

## 1. Siapa memutuskan apa

| Keputusan | Pemilik | Cara |
|---|---|---|
| Tujuan, pesan, CTA, script final, storyboard final | Irfan | Gerbang persetujuan; tunggu kata "final" |
| Family, gaya teks, teknik T/C/X, SFX, timing | Agent | Putuskan sendiri dengan alasan tertulis di spec beat |
| Penyimpangan dari storyboard yang disetujui | Agent, lalu dilaporkan | Catat di daftar penyimpangan saat kirim |
| Generate berbayar (VO, SFX generatif, musik, gambar, video AI) | Agent setelah gerbangnya terbuka | Sebutkan perkiraan biaya sebelum generate |
| Aturan baru di skill ini | Irfan | Usulan lewat RETRO (`revision-log.md` §20), status "menunggu persetujuan" |

Pekerjaan yang sudah tertulis di rencana yang Irfan setujui dianggap disetujui. Kerjakan sampai selesai dan nilai fase secara internal; jangan meminta Irfan menilai tiap fase atau mengirim versi setengah jadi sebagai hasil.

## 2. Urutan prioritas saat aturan bertabrakan

1. Arahan Irfan di proyek ini (brief, revisi, storyboard yang disetujui).
2. Rules inti di `SKILL.md`.
3. Cerita: apa yang membuat beat ini dipahami penonton (`direction.md` §6).
4. Standar kualitas: eksekusi minimal setara referensi.
5. Variasi dan ritme (aturan "≥ 4 tipe per 30 dtk", dsb.).

Jika sebuah teknik tidak cocok dengan cerita di satu beat, ganti dengan teknik lain yang setara kualitasnya. Jangan pernah menyelesaikan konflik dengan eksekusi yang lebih kasar, dan jangan menambah titik fokus kedua demi memenuhi kuota variasi.

## 3. Memilih family visual

Pilih per babak, bukan per shot (detail di `direction.md` §5):

| Isi babak | Family |
|---|---|
| Masalah, tokoh, cerita personal | A. Kolase + karakter |
| Klaim, pertanyaan, titik balik | B. Tipografi gelap |
| Solusi, workflow, produk, CTA | C. Kanvas putih UI |

Perpindahan family adalah momen cerita, jadi selalu memakai transisi bab dan engsel senyap (`audio.md` §14.4).

## 4. Memilih teknik per momen

Tentukan dulu **peran** teks, baru tekniknya. Peran yang sama selalu bergerak dengan cara yang sama di seluruh video (`typography.md` §8):

| Peran | Teknik |
|---|---|
| R1 narasi | T01 / T19 |
| R2 kata kunci | T03 / T20 |
| R3 klaim | T03 + shake |
| R4 label | T23 / T10 |
| R5 UI diketik | T11 |
| R6 kata pahlawan | T04 / C05, maksimal 2× per video |

Untuk transisi, mulai dari pertanyaan "benda apa dari shot A yang bisa dibawa ke shot B?". Jika ada, pakai X01 (object carry). Jika tidak ada, pilih transisi yang arahnya sesuai cerita (`camera-transition.md` §10).

Tulis alasan pilihan dalam satu frasa di spec beat. Pilihan tanpa alasan adalah tanda template.

## 5. Membawa pengalaman, bukan template

Yang dibawa dari proyek lama: urutan gerbang, cara mengukur referensi, cara QA, alat yang terbukti jalan, log kesalahan.

Yang **tidak** dibawa kecuali Irfan meminta: palet, font, gaya teks, karakter, maskot, kit SFX, gaya musik, struktur babak, dan storyboard dari proyek lain. Contoh: aturan hitam/putih Tuntunly tidak berlaku untuk Jadisatu.

Alasannya: template lama membuat karya baru terasa seperti salinan dan mengunci keputusan sebelum brief dipahami. Jika satu aturan lama terasa relevan, usulkan sebagai pilihan dengan alasannya. Jangan menerapkannya diam-diam.

## 6. Biaya dan kredit

- Tidak ada generate berbayar sebelum gerbangnya terbuka: VO setelah script final, musik dan SFX setelah storyboard final (sama dengan gerbang 6 di `SKILL.md`).
- Sebelum generate, sebutkan perkiraan biaya. Generate 1–2 variasi, bukan 4, kecuali Irfan meminta.
- Generate per potong agar potongan yang kurang bisa diulang sendiri.
- Kegagalan nyata: VO di-generate 3 kali (± 7.300 kredit) sebelum script final (Jadisatu, 17 Okt).

## 7. Kapan bertanya

Bertanya hanya untuk ambiguitas yang mengubah hasil secara besar, maksimal 3 pertanyaan di awal, dalam satu pesan. Sebelum bertanya, cek apakah jawabannya ada di file proyek, brief, atau memori.

| Situasi | Tindakan |
|---|---|
| Referensi yang dimaksud belum pasti | Sebutkan dalam satu kalimat "yang aku tangkap dari referensi ini adalah…" sebelum lanjut |
| UI produk tidak bisa diakses | Minta screenshot **sebelum** storyboard |
| Pilihan teknis (teknik, timing, SFX) | Putuskan sendiri, tulis alasannya |
| Gerbang script atau storyboard | Tunggu kata "final" |
| Batas waktu menekan | Bagi waktu per gerbang di awal; batas waktu bukan alasan melompati gerbang script dan storyboard |
