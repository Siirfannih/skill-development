# Desain Evals: skill yang membaik setiap sesi

## Inti ide

Skill tidak memperbaiki dirinya di tengah sesi. Setiap sesi **meninggalkan bukti**: kegagalan, revisi Irfan, dan bagian skill yang dibaca atau diabaikan. Bukti itu diubah menjadi **kasus uji**. Perubahan skill hanya masuk kalau semua kasus lama tetap lulus dan kasus baru ikut lulus. Hasilnya, skill yang dimuat sesi berikutnya terbukti lebih baik, bukan sekadar lebih panjang.

Kenapa tidak membiarkan model langsung mengedit skill saat dipakai:
- Satu revisi selera sesaat bisa berubah menjadi aturan permanen (overfitting).
- Aturan baru bisa bertabrakan dengan aturan lama tanpa ketahuan. Ini persis masalah F1 di audit: tiga skill video saling bertentangan.
- Skill terus membengkak, padahal Anthropic menyarankan body < 500 baris.
- Tidak ada bukti bahwa perubahan itu memperbaiki perilaku.

Pola ini sama dengan siklus resmi Anthropic: Claude A merancang, Claude B memakai, perilaku B diamati, lalu A memperbaiki (*Skill authoring best practices*, "Develop Skills iteratively with Claude").

## Siklus

```
Pakai → Catat → Jadikan kasus → Usul perbaikan → Uji → Setujui → Sinkron → (sesi berikutnya memuat versi baru)
```

| Tahap | Siapa | Apa yang terjadi |
|---|---|---|
| 1. Pakai | Agent di sesi kerja | Memakai skill seperti biasa |
| 2. Catat | Agent di sesi kerja | Setiap revisi Irfan atau kegagalan yang ditemukan sendiri ditulis ke `RETRO.md` (sudah ada di skill) **dan** ke `evals/inbox/<tanggal>-<id>.md`: apa yang diminta, apa yang salah, bukti (file + timestamp) |
| 3. Jadikan kasus | Sesi perbaikan | Inbox diubah menjadi kasus uji `evals/cases/<id>.json`: prompt realistis, file pendukung, dan 2–5 assertion yang bisa dicek |
| 4. Usul perbaikan | Sesi perbaikan | Analis membaca kasus yang gagal, lalu menulis patch ke cabang yang tepat, bukan ke inti kecuali memang aturan inti. Setiap patch menyebut sumbernya |
| 5. Uji | Runner | Agent segar tanpa konteks menjalankan semua kasus dua kali, dengan skill lama dan dengan patch. Grader menilai assertion |
| 6. Setujui | Gerbang otomatis + Irfan | Lihat aturan gerbang di bawah |
| 7. Sinkron | Skrip | Merge ke `main` → `sync.sh` menyalin ke `~/.claude/skills` dan mengemas untuk cloud |

## Dua jenis eval

**A. Eval pemicu (apakah skill dimuat?)**
- `evals/trigger.json`: ± 20 permintaan, campuran yang seharusnya memicu dan yang tidak. Contoh: "bikin reel promo Jadisatu" → ya; "rapikan caption IG ini" → tidak.
- Dijalankan dengan `run_loop.py` + `improve_description.py` dari skill `skill-creator`. Keduanya mengoptimalkan description secara otomatis dan aman karena hanya menyentuh satu field.

**B. Eval perilaku (apakah skill diikuti dengan benar?)**
```json
{
  "id": "mg-017",
  "source": "revision-log 18 Okt v4b: blok merah di belakang kata",
  "prompt": "Beat 4: tekankan kata 'terjebak' supaya lebih kuat.",
  "files": ["fixtures/storyboard-jadisatu-v4.md"],
  "assertions": [
    "Tidak memakai kotak warna, stabilo, atau highlight box di belakang kata",
    "Penekanan lewat warna aksen huruf, skala, atau kamera",
    "Menyebut aturan inti 6 atau typography.md §7.3"
  ]
}
```
Grader adalah subagent terpisah yang hanya melihat transkrip dan output, lalu menilai tiap assertion lulus atau gagal dengan bukti (`agents/grader.md` di skill-creator).

## Gerbang persetujuan

| Jenis perubahan | Syarat masuk |
|---|---|
| Mekanis: path rusak, typo, TOC, description | Semua eval lulus → merge otomatis |
| Aturan baru dari revisi Irfan | Semua eval lulus **dan** Irfan menyetujui di RETRO (status "diterapkan"). Ini mengikuti aturan RETRO yang sudah ada |
| Patch yang membuat satu kasus lama gagal | Ditolak, atau kasus lama itu sengaja dihapus dengan alasan tertulis |
| Patch yang membuat inti > 150 baris atau cabang > 300 baris tanpa TOC | Ditolak; pecah dulu |

## Sinyal tambahan dari pemakaian

- **Cabang yang tidak pernah dibuka** di beberapa sesi: kemungkinan petunjuknya di `SKILL.md` kurang tegas, atau isinya tidak perlu.
- **Cabang yang selalu dibuka**: kemungkinan isinya seharusnya masuk inti.
- **Pertanyaan yang sama diajukan ke Irfan dua kali**: jawabannya harus masuk ke skill.

Sinyal ini dicatat agent di akhir sesi sebagai satu baris di `evals/inbox/usage.md`.

## Struktur repo

```
claude/<skill>/
├── SKILL.md
├── references/
├── RETRO.md
└── evals/
    ├── trigger.json
    ├── cases/*.json
    ├── fixtures/          file pendukung kasus
    ├── inbox/             catatan mentah dari sesi kerja
    └── results/<tanggal>/ hasil runner (skor per kasus, lama vs baru)
tools/
├── run_evals.sh           jalankan semua kasus satu skill
└── sync.sh                salin main ke ~/.claude/skills
```

## Titik awal untuk motion-graphic

Log revisi Irfan (`revision-log.md` §19) sudah berisi ± 25 kegagalan nyata dengan aturan yang lahir darinya. Masing-masing langsung bisa menjadi kasus uji, jadi set eval pertama tidak perlu dikarang.

## Jadwal

- **Per sesi kerja:** tahap 1–2 (otomatis, karena diperintahkan oleh skill).
- **Mingguan** (routine terjadwal) atau saat inbox ≥ 5 catatan: tahap 3–7.
