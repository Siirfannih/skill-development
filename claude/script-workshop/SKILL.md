---
name: script-workshop
description: Menulis konten Irfan dari ide sampai naskah siap take: script reels/video, carousel, caption, thread, ideasi, dan hook, untuk Jadisatu maupun akun pribadinya. Pakai setiap kali Irfan minta ide konten, hook, naskah, carousel, caption, atau merevisi tulisan, walau permintaannya singkat ("bikinin script reels soal UMKM", "hook-nya kurang nendang").
---

# Script workshop (Irfan)

Satu skill untuk semua tulisan konten Irfan. File ini alur kerja + aturan mutlak. Rasa dan contoh ada di `guide/` (buka folder urusan yang sedang dikerjakan saja). Naskah video yang sudah final diteruskan ke `motion-graphic`.

Menggantikan `irfan-content-engine` v1/v2 yang dibuat di Gemini (6 Nov). Kesalahan berulangnya dicatat di `guide/hindari/` supaya tidak terulang.

## 1. Aturan mutlak (sedikit, karena pernah merusak)

1. **Jangan mengarang pengalaman, data, atau fitur.** Yang tidak Irfan alami ditulis sebagai hipotesis/pertanyaan, bukan "ternyata…". Fitur & penawaran hanya dari `guide/produk/FAKTA.md`, repo produk yang ditunjuk di sana, atau kata Irfan di sesi. Cari di sana dulu; tidak ketemu → tanya, jangan menebak.
2. **Riset dulu, baru tanya.** Hipotesis Irfan divalidasi lewat web search sebelum menulis; setiap klaim angka/fakta punya sumber yang bisa diklik. Tanya Irfan hanya yang tidak bisa diriset (pengalaman pribadinya, keputusan).
3. **Evaluasi diri sebelum menunjukkan draft.** Jalankan cek di §4 dan tulis temuan + perbaikannya. Jangan menutup dengan meminta pujian ("udah dapet banget kan?") atau bagian "kenapa skrip ini bagus".
4. **Kalau Irfan bilang ada yang kurang tanpa merinci, cari sendiri dulu**: sebut apa yang kurang + cara memperbaikinya, baru tanya bila masih ragu.

Selebihnya di `guide/` adalah arah, bukan aturan: pilih bebas asal bisa jelaskan alasannya satu kalimat. Ragu antara hook berani vs aman → ambil yang berani, lalu uji.

## 2. Alur

| # | Langkah | Buka | Selesai jika |
|---|---|---|---|
| 0 | Muat konteks | `guide/produk/FAKTA.md`, `content-ops/lanes/<jalur>.md` | Jalur (Jadisatu / Siirfan / affiliate), format, durasi, CTA jelas |
| 1 | Riset & validasi | `guide/riset/` | Hipotesis diuji: data mendukung / membantah / campur, dengan link |
| 2 | Gali cerita Irfan | `guide/suara/` | Hanya hal yang tidak bisa diriset; maks 3–4 pertanyaan berpilihan + rekomendasi |
| 3 | Sudut & hook | `guide/audiens/`, `guide/hook/` | ≥ 10 kandidat, digugurkan dengan tabel tolak, 2–3 terbaik + rekomendasi |
| 4 | Draft | `guide/struktur/` | Carousel atau reels; tiap bagian punya jembatan ke bagian berikut |
| 5 | Evaluasi diri | §4 di bawah + `guide/hindari/` | Semua cek dijawab; perbaikan sudah diterapkan |
| 6 | Kirim | — | Draft + catatan evaluasi singkat + sumber + maks 2 pertanyaan yang mengubah langkah berikutnya |

Proyek video panjang: simpan di `projects/<proyek>/` (DECISIONS, INSIGHTS, HOOKS, SCRIPT). Konten harian: cukup `content-ops/pieces/`.

## 3. Bertanya

- Maks 3–4 pertanyaan per ronde, pilihan berhuruf + rekomendasi + alasan satu kalimat. Irfan cukup jawab "1A 2C".
- Jawaban Irfan dicatat verbatim sebelum dikembangkan. Insight yang muncul saat ia menolak opsi juga dicatat.
- Devil's advocate (`working-with-irfan` §2a) untuk setiap masukan Irfan dan setiap draft.

## 4. Evaluasi diri (wajib sebelum kirim)

- [ ] Ada kalimat yang mengaku pengalaman/temuan yang tidak Irfan miliki? → ubah jadi hipotesis/pertanyaan.
- [ ] Setiap fakta/angka punya sumber? Yang tidak → hapus atau tandai `[perlu data]`.
- [ ] Hook: sudah berapa banyak konten membuka dengan kalimat serupa? Kalau "banyak" → cari sudut lain (`guide/hook/`).
- [ ] Hook menyentuh semua audiens target (follower & non-follower; pemilik & pembangun bisnis kecil)? (`guide/audiens/`)
- [ ] Baca keras berurutan: ada perpindahan bagian yang putus/tiba-tiba? Tambah jembatan.
- [ ] Fitur & penawaran sesuai `FAKTA.md`, termasuk penawaran gratis yang relevan?
- [ ] Kata haram & pola AI dari `guide/suara/` dan lane terkait?
- [ ] Mengalir seperti Irfan ngobrol, bukan fragmen bertitik? Storytelling jadi satu cerita utuh?
- [ ] Durasi: 2,5–3 kata/dtk VO Indonesia; durasi per bagian tertulis.
- [ ] Kartu 5W1H terisi, dan dari hook saja pembaca tahu siapa yang disasar + value-nya? (E16)
- [ ] Akun baru: konten memberi value dulu; CTA save/follow/kirim, bukan meminta cerita atau komentar? (E18)
- [ ] Set ide: ≥ 7 jenis konten, ≤ 3 per jenis, ≤ 20 % penawaran, maks 1 angka per konten? (E17, E19, E20)

## 5. Struktur

```
script-workshop/
├── SKILL.md          alur + aturan mutlak (file ini)
└── guide/
    ├── riset/        validasi hipotesis, sumber, cara membingkai bila data tipis
    ├── audiens/      lapisan penonton, follower vs non-follower, pemilik vs pembangun kecil
    ├── hook/         rumus hook, pola yang ditolak Irfan, cara memberi skor
    ├── suara/        suara Irfan, kata & pola haram
    ├── struktur/     reels, carousel, caption; jembatan antar bagian; durasi
    ├── produk/       FAKTA.md: fitur & penawaran Jadisatu yang boleh diklaim
    └── hindari/      pola kesalahan berulang (Gemini 6 Nov, proyek sebelumnya)
```
Bedah video referensi untuk editing: `motion-graphic` (`references/analysis-qa.md`, `guide/referensi/`), bukan skill ini.
