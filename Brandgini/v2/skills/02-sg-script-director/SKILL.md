---
name: sg-script-director
description: Pakai saat item Soalnya Gini di tahap naskah; mengubah fakta.md menjadi naskah VO dan shotlist.json v2 yang lolos gerbang mekanis, lalu mengirimnya ke paket review naskah Irfan.
---
# 02 · Naskah dan shotlist (tahap kanonik: Naskah)

## 1. Pintu skill-development yang dipakai
- `claude/motion-graphic/references/copywriting.md` dan `../irfan-creative-workflow/SKILL.md` §3 (uji storyteller).
- `LANTAI.md` A4–A5 (KT 1–3 kata, hanya dari ucapan), D19–D19b (metafora dulu: makna → aksi → satu metafora → objek → bentuk).
- `script-workshop` (skill Irfan) untuk hook.

## 2. Naskah (`script.md`) · ditulis sebagai OMONGAN LISAN (keputusan Irfan D-04)
- Sampel VO yang Irfan suka adalah obrolan spontan: partikel "loh/tuh/gitu/ya/nih/deh", "Kok bisa?", "Nah,", kalimat pendek, tempo ±2,9 kata/dtk. Naskah narasi baku terdengar "membaca". Contoh bentuk (sumber: uji A/B `vo-uji/ab-*-lisan.wav`): "Eh, kalau kamu jualan es di ujung pantai nih, saingan kamu tuh bakal buka persis di sebelahmu. Kok bisa? Soalnya gini…"
- Gaya lisan tidak mengubah isi: setiap klaim tetap dari `fakta.md` (F≥1) atau pengandaian F0; partikel tidak boleh menggeser makna atau membuat klaim terdengar mutlak.
- Panjang: hitung dari tempo 2,9 kata/dtk → ±145–165 kata untuk 50–57 dtk; durasi nyata ditentukan setelah TTS (skill 03), lalu shotlist disesuaikan ke `words.json`.
- Tanpa anotasi gaya/arah suara di naskah (tidak ada `[gembira]`, HURUF KAPITAL untuk stres, atau catatan sutradara di teks yang dibacakan).
- Sapaan "kamu" (plan; sampel lisan juga memakai "kamu"). Varian lo/gue ala edubizz hanya bila Irfan memintanya.
- Struktur: 0–3 dtk hook + cap pembuka (objek di layar, tanpa intro) → 3–6 dtk "Soalnya gini…" (momen `tanda_tangan_buka`) → build 4–6 langkah, satu komponen baru per "Tapi…/Masalahnya…" (REFERENSI.md §E butir 2) → payoff satu kalimat → loop/pertanyaan komentar.
- Klaim kesehatan/keuangan: info umum; "salah satu penjelasan" bila sumbernya teori.

## 3. Shotlist (`shotlist.json`, skema `kit/shotlist.schema.json`)
Contoh lengkap yang lolos semua cek: `kit/contoh/sg001.shotlist.json` (naskah plan Hari 1 apa adanya, 15 beat).
- Beat 1,0–5,0 dtk; isi `perubahan_sec` sehingga jarak antar-perubahan visual ≤ 2,2 dtk (MOTION-CORE §1). Perubahan = objek baru, ganti keadaan, gerak kamera yang terlihat; bukan cut wajib.
- `transisi_masuk.tipe` dari daftar skema; tidak sama berturut-turut, ≥ 4 tipe per 30 dtk (Lantai B13/B13a). Catatan: plan §2.3 menulis "satu keluarga transisi (push-in + potongan melintang)"; v2 mengikuti Lantai dan menjadikan push/potongan sebagai **transisi khas** (satu per video), bukan satu-satunya (K-05).
- `kt`: 1–3 kata, kata harus ada di `vo_text` beat itu, beri `peran` (R1–R6) dan `kode` T dari `references/typography.md` §8.
- `metafora` wajib (D19a). `maskot`: `karakter` + `aksi` (kata kerja) + `fungsi` (KRK-01).
- `fakta_ids` wajib untuk beat yang menyebut angka.
- `kartu_kiblat`: 2–4 kartu (gaya A: 95; gaya B: M09/M10/M11; diagram berlabel: 17) lewat `scripts/cookbook/pilih_kartu.py`.

## 4. Gerbang mekanis (semua exit 0)
```
bash tools/slop-grep.sh episodes/sgNNN/script.md
python3 tools/variasi_cek.py episodes/sgNNN/script.md --arsip arsip/naskah --meta episodes/sgNNN/meta.json --log arsip/tayang.jsonl
python3 tools/beat_frames.py cek episodes/sgNNN/shotlist.json
python3 -c "import json,jsonschema;jsonschema.validate(json.load(open('episodes/sgNNN/shotlist.json')),json.load(open('kit/shotlist.schema.json')))"
```
Gagal → perbaiki sendiri (maks 2 putaran, Sonnet); gagal ke-3 pada gerbang yang sama → Opus satu kali; masih gagal → `antrean.py tahan`.

## 5. Gerbang pemilik
Lolos → `antrean.py pindah <id> review_naskah --oleh mesin`. Irfan menyetujui dalam paket mingguan; persetujuan ditulis sebagai ID di `DECISIONS.md` episode (MOTION-CORE invarian 3). Naskah yang disetujui dikunci: perubahan sesudahnya = review ulang.
