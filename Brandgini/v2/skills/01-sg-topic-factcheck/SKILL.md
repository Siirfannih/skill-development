---
name: sg-topic-factcheck
description: Pakai saat antrean Soalnya Gini butuh topik baru atau item berada di tahap ide/fakta; memilih topik dari bank 164 topik dengan aturan rotasi dan menyusun fakta.md bersumber primer.
---
# 01 · Topik dan lembar fakta (tahap kanonik: Brief)

## 1. Kapan jalan
- `tools/antrean.py berikut` menunjuk item Soalnya Gini di tahap `ide` atau `fakta`. Tidak dipicu jam tetap.
- Default batch: sekali seminggu 14 topik (2/hari × 7) supaya Irfan menyetujui naskah dalam satu paket (README §4.2). Model: Sonnet.

## 2. Pilih topik
1. Sumber: `plan/soalnya-gini-10-plan.md` §0 untuk episode 1–10 (urutan tayang di sana), lalu bank `plan/topik-dan-skema-shorts-id.md` §3 (skor 5 dulu, digilir per pilar A–L, §5c).
2. Tolak: risiko **Tinggi** di 30 hari pertama (plan topik §5c); uang abstrak tanpa benda fisik (§1 butir 2); berita/geopolitik (analisis-channel §2 butir 3).
3. Tentukan dan tulis di front matter: `gaya` (`A-kolase` untuk konsep/psikologi/ekonomi/mitos; `B-arsip` untuk sejarah benda, uang fisik, regulasi), `opening_cap`, `pilar`.
4. Rotasi (dicek mekanis di skill 02 dengan `tools/variasi_cek.py --meta --log`): cap sama ≤ 2× berturut, gaya sama ≤ 3× berturut, pilar tidak sama berturut-turut.

## 3. `episodes/sgNNN/fakta.md`
```
---
episode: sg001
judul: "Kenapa Indomaret dan Alfamart selalu sebelahan? – Soalnya Gini"
gaya: A-kolase
opening_cap: "Kalau…"
pilar: F
risiko: Sedang (merek: tanpa logo)
---
## Fakta
F0 · pengandaian/ilustrasi yang bukan klaim (mis. "pantai 1 km") · tanpa sumber, wajib ditandai F0
F1 · <klaim satu kalimat> · <URL/dokumen primer> · <tanggal dibaca> · ✅/⚠
...
## Jangan dipakai (UNVERIFIED_DO_NOT_USE)
## Zona larangan
## Objek visual (3–5 benda fisik yang bisa dirakit/dipotong)
```
- 5–8 fakta; tiap angka/klaim teknis ≥ 2 sumber, salah satunya primer (BI, SNI, jurnal, dokumen resmi produsen). Pakai daftar "Fakta yang wajib dicek" di plan per hari sebagai titik awal, bukan sebagai bukti.
- Fakta ⚠ di plan (mis. sumber karang gigi belum dibuka, plan Hari 6) tetap ⚠ sampai sumbernya dibaca; skill 02 tidak boleh memakainya.

## 4. Gerbang
- `bash tools/slop-grep.sh episodes/sgNNN/fakta.md` exit 0 (menangkap `[TBD]`, `TODO:`).
- Setiap F≥1 punya URL dan tanggal dibaca; tidak ada angka tanpa nomor F.
- Lolos → `antrean.py pindah <id> naskah --oleh mesin`.
