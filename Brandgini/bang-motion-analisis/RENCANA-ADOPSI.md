# Rencana adopsi Bang Motion

Pendamping `ANALISIS.md` (kode M1-M16 merujuk tabel di sana). Perkiraan jam adalah perkiraan kerja agen ditambah satu putaran review. **Belum teruji**: angka diambil dari ukuran pekerjaan, bukan dari pengalaman mengerjakan butir serupa.

## Aturan main yang ikut

- Aturan baru **tidak langsung masuk `LANTAI.md`**. Jalurnya `SARINGAN.md` (S/P/H); `LANTAI.md` mensyaratkan butir muncul di dua video berbeda dan berlaku untuk semua gaya. Semua butir baru di bawah masuk sebagai kartu atau pertimbangan (P) dulu.
- `scripts/juri/*` dan `scripts/gate/*` tidak diedit di sesi produksi video (`MOTION-CORE.md` §4). Butir lint dikerjakan di sesi perubahan skill.
- `v2/` Soalnya Gini milik agen lain: tidak ditulis. Butir Soalnya Gini di bawah berupa masukan, bukan perubahan.
- Kartu `dilihat_bergerak` diisi jujur. Kartu dari Bang Motion belum kita lihat bergerak, jadi diberi `tidak` sampai kita render sendiri.

## Struktur yang diusulkan

```
skill-development/claude/motion-graphic/
  cookbook/07-explainer-hidup/        pack baru, kartu mekanik (bukan template gaya)
    BM01-uji-ppt-struktural.md        M1
    BM02-koreografi-kamera-kolase.md  M3 (kosakata shot), M4
    BM03-akresi-bukti-entitas.md      M5, M6
    BM04-panggung-hidup.md            M8 (hukum 1, 2, 3, 7)
    BM05-rig-sendi.md                 M9 (hukum 4, 5)
    BM06-menu-latar.md                M10 (tanpa #2, #3)
    BM07-aksi-kontinu-instrumen.md    M7
    BM08-transisi-dibawa-benda.md     M11 (setelah dibaca penuh)
  scripts/remotion/ae-primitives/rig/ Joint.ts, Stage.tsx, PathDrops.tsx, frameOn.ts
  scripts/juri/struktur_cek.py        lint M1 (mulai sebagai peringatan)
  references/ATRIBUSI-BANG-MOTION.md  notice MIT + daftar turunan
soalnya-gini-studio/                  (lewat agen v2, bukan saya)
  kulit, palet, maskot Gini (rig), diorama; parameter panggung di design-tokens
```

Pemisahan: **mekanik generik di skill-development, kulit dan karakter di Soalnya Gini.** Karakter bersendi (maskot Gini) adalah aset brand, jadi `Joint` generik tinggal di skill-development dan rig maskotnya di Soalnya Gini.

Fork `Siirfannih/bang-motion`: diperlakukan sebagai **arsip bahan dan bukti atribusi**, tidak diubah jadi skill hidup kedua (dua sumber kebenaran).

## Urutan kerja dan prioritas

| Pri | Butir | Isi | Perkiraan | Bergantung |
|---|---|---|---|---|
| **P1** | 1. Atribusi | `ATRIBUSI-BANG-MOTION.md` (teks MIT penuh, "Copyright (c) 2026 Bang Tutorial", v1.19.0, commit `c1aa65e`, URL), komentar kepala di tiap berkas turunan | 0,5 j | - |
| P1 | 2. `struktur_cek.py` | Lint M1 terhadap data episode + `src`: ≥3 adegan layar-penuh yang di-fade, tingkat teks >2 per adegan, zoom kamera minimum, hero hadir <60 %, satu tipe transisi. Mulai peringatan. Perlu membaca skema `episode.json` dulu (belum saya baca) | 3-5 j | skema episode |
| P1 | 3. Kartu BM02 + BM03 | Prinsip tanpa kode: urutan kamera-lalu-teks, kosakata shot, akresi 3-5 elemen, entitas wajib tampil | 3-4 j | - |
| P1 | 4. Kartu BM06 | 12 bahasa gerak latar (minus #2, #3 menunggu D2), permukaan, gaya render. Menggantikan satu baris `direction.md:71` | 2-3 j | D2 |
| P2 | 5. Primitif `Joint` + `Stage` | Port `J()`, idle terukur, kedip, `PathDrops` (tetes mengikuti path), `frameOn`. Satu panggung uji dengan maskot Gini | 10-16 j | butir 3 |
| P2 | 6. Uji determinisme port | Render satu frame sendirian vs setelah frame lain, bandingkan hash (pelajaran dari uji GSAP). Termasuk render paralel | 2 j | butir 5 |
| P2 | 7. Kartu BM04 + BM05 | Hukum panggung dan rig, ditulis setelah port berjalan supaya angka teruji | 3 j | butir 5-6 |
| P2 | 8. BM07 aksi kontinu | Strip aliran, hero, peta rute, "angka disapu subjek". Satu prototipe | 8-12 j | butir 5 |
| P2 | 9. Masukan ke agen v2 | Ringkasan M8-M9 dan REFERENSI R01-R09 dalam satu catatan; keputusan D5 | 1 j | D5 |
| P3 | 10. BM08 transisi dibawa benda | Baca `opener-konsep.md:575-667` penuh, pilih yang melengkapi `motion-mechanics.md` | 3-4 j | - |
| P3 | 11. Cerna 19 konsep opener | Untuk promo Jadisatu; selaraskan dengan tema `apple-saas-ui` | 5-6 j | - |
| P3 | 12. Selidiki sebab beda akses acak GSAP | Hanya bila kita memakai starter Bang untuk prototipe cepat | 2 j | - |
| Tidak dikerjakan | Jembatan AE Higgsfield, starter HTML, WebGL latar, `vo-pauses.html` | Tidak cocok dengan pipeline | - | - |

Total P1 ≈ 9-13 j; P2 ≈ 24-33 j; P3 ≈ 10-12 j.

## Lisensi MIT

- Teks lisensi menyatakan hak cipta dan izin harus ikut di **semua salinan atau bagian substansial**. Aturan praktis: bila satu berkas membawa kode atau teks yang disalin atau diterjemahkan dekat dengan aslinya (mis. fungsi `J()`, daftar angka 96/72 px, tabel menu latar), berkas itu memuat komentar atribusi dan menunjuk `ATRIBUSI-BANG-MOTION.md`. Prinsip yang ditulis ulang dengan kata dan angka kita sendiri lebih aman, tapi batas "substansial" tidak saya putuskan; kalau ragu, beri atribusi.
- Izin penulis yang Irfan sebut: simpan bukti tertulisnya (tangkapan layar balasan atau tautan) di folder `ATRIBUSI` supaya jejaknya ada. Itu tambahan, bukan syarat MIT.
- **Belum dicek:** lisensi `docs/gallery/*.jpg` (gambar tidak ikut disalin), font Google di starter, dan GSAP (bukan MIT; lisensi tersendiri). Karena kita tidak membawa starter maupun GSAP, risikonya kecil, tapi jangan menyalin starter ke repo kita tanpa mengecek.
- Jangan memakai nama "Bang Motion" atau nama penulis seolah-olah menyetujui hasil kita.

## Keputusan yang perlu Irfan

| # | Keputusan | Pilihan | Rekomendasi |
|---|---|---|---|
| **D1** | Nol caption (Hukum 6 kartun panggung) vs LANTAI A1 (semua ucapan jadi KT) | (a) Panggung tetap ber-KT sesuai LANTAI. (b) Panggung boleh nol caption, dicatat sebagai pengecualian di `RESEP.md` | **(a).** Style A/B berbasis tipografi dan LANTAI A1 sudah tegas. Pengecualian hanya bila Irfan minta episode tertentu |
| **D2** | Menu latar #2 (gradien berpindah) dan #3 (blob mengambang) vs S-V21 | (a) Tolak keduanya. (b) Izinkan bila alasannya tertulis | **(a).** Selera yang sudah Irfan tetapkan di katalog slop menang |
| **D3** | "Beda dari proyek sebelumnya" (`SKILL.md:239-246`) | (a) Hanya untuk promo/klien Jadisatu. (b) Juga seri Soalnya Gini. (c) Tidak dipakai | **(a).** `REFERENSI.md` §E.1-2 menunjukkan format tetap justru aset seri. Untuk seri, kulit tetap dan kerangka cerita boleh bervariasi |
| **D4** | Letak kartu baru | (a) Pack baru `07-explainer-hidup`. (b) Sisip ke P01/P04 | **(a).** Kecil, mudah dicabut bila tidak lolos SARINGAN. Perlu persetujuan karena menambah pack ke `cookbook/INDEX.md` |
| **D5** | Soalnya Gini memakai panggung/diorama bersendi sebagai gaya ketiga (Style C) di samping A/B | (a) Tidak, tetap A/B. (b) Ya. (c) Putuskan setelah satu panggung uji maskot Gini (butir 5) | **(c).** Ini keputusan produk di luar yang tertulis, dan v2 sedang dikerjakan agen lain |
| **D6** | `struktur_cek.py` | (a) Peringatan dua video dulu. (b) Langsung memblokir | **(a).** Sejalan dengan jalur SARINGAN; promosi ke pemblokir setelah dua video |
| **D7** | Fork `Siirfannih/bang-motion` | (a) Arsip bahan + atribusi. (b) Dikembangkan jadi skill kedua | **(a).** Menghindari dua sumber kebenaran |

Yang menentukan langkah berikutnya: **D5 dan D1**. Butir P1 1-4 bisa jalan sekarang tanpa menunggu keduanya, kecuali butir 4 yang menunggu D2.
