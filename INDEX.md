# Katalog perpustakaan skill

Pintu masuk untuk setiap model yang bekerja dengan Irfan. Baca file ini dulu, lalu buka **hanya** skill yang cocok dengan pekerjaan. Jangan memuat semua skill sekaligus.

## Cara memakai

1. Cocokkan pekerjaan dengan kolom "Pakai saat" di bawah.
2. Buka `SKILL.md` skill itu. Cabang di `references/` dibaca hanya saat `SKILL.md` menyuruh.
3. Jika pekerjaan milik proyek yang punya folder di `projects/`, baca `AUTHORITY.md` proyek itu sebelum yang lain.
4. Jika dua skill bertentangan: **skill Irfan (`claude/`) menang atas skill eksternal (`external/`)**, dan dokumen proyek (`projects/`) menang atas keduanya untuk proyek itu.

## Struktur

| Folder | Isi | Status |
|---|---|---|
| `claude/` | Skill yang dikembangkan Irfan | Aktif |
| `external/` | Skill open-source yang sudah teruji, sebagai submodule terkunci versi | Aktif, dipakai sebagai pendamping |
| `projects/` | Dokumen otoritas dan art direction per proyek | Aktif untuk proyeknya saja |
| `autopilot-video/` | Sistem autopilot produksi video: PRD, desain, ConOps, ADR, tools (gpt-bridge, render, TTS lokal), pilot aff-pompa-01; mulai dari [README](autopilot-video/README.md) | v0, diuji sekali |
| `scriptwriter/` | Mandat peran dan pengembangan cara kerja ide → naskah → storyboard; mulai dari [README](scriptwriter/README.md) | Fondasi awal; memakai skill aktif di `claude/` |
| `content-ops/` | Operasi konten harian tiga jalur; mulai dari [content-ops/README.md](content-ops/README.md) | Aktif |
| `archive/` | Skill lama yang sudah digantikan | Jangan dimuat; hanya baseline untuk eval |

## Skill Irfan (`claude/`)

| Skill | Peran | Pakai saat |
|---|---|---|
| `working-with-irfan` | Cara bekerja umum: komunikasi, siklus kerja, cara membuat skill/prompt, jangan menebak | Setiap tugas dari Irfan |
| `autopilot-prd` | Eksekusi antrean PRD/QUEUE sampai habis, tier keputusan | Proyek dengan PRD, QUEUE, atau rencana tertulis |
| `irfan-creative-workflow` | Gerbang proyek kreatif, disiplin kredit, uji storyteller | Awal setiap proyek kreatif (video, kampanye, naskah) |
| `motion-graphic` | Semua video motion: inti + 11 cabang (direction, storyboard, copywriting, decision, typography, camera-transition, smooth-motion, audio, build, analysis-qa, revision-log) + `scripts/` (baseline_lock, bedah-kamera) | Setiap permintaan video, motion, storyboard, naskah VO, bedah referensi |
| `script-workshop` | Brainstorm sampai script disetujui: bedah hook referensi, bank insight, ledger, devil's advocate, pola hook yang ditolak | Awal setiap script video/reel, mencari hook |
| `jadisatu-narrator-vo` | Suara, model, dan cara merakit VO Inggris Jadisatu | VO marketing Jadisatu berbahasa Inggris |
| `cinedance-block-library` | Merakit prompt video-generation dari blok kode | Brief format TRICK/FORMAT/ASSETS/BLOCKS untuk Seedance/Higgsfield |

## Skill eksternal (`external/`)

Detail versi dan peta pemakaian ada di `external/README.md`.

| Skill | Peran | Pakai saat |
|---|---|---|
| `superpowers` | Brainstorming → plan → develop → evaluasi | Fitur atau ide baru, debugging, sebelum menyatakan selesai |
| `anti-slop` | Filter anti-generik untuk kode, UI, copy | Menulis kode, mendesain UI, menulis copy |
| `awesome-design-md` | Contoh `DESIGN.md` dari sistem desain nyata | Menentukan prinsip visual (bukan meniru merek) |
| `remotion-skills` | Agent Skills resmi Remotion | Membangun, me-render, atau meng-upgrade proyek Remotion |
| `hyperframes` | HTML + GSAP → MP4 deterministik, prinsip gerak | Video berbasis HTML/GSAP, atau migrasi dari Remotion |
| `earshot` | Analisis audio untuk agent: describe, rank, critique terhadap film referensi | QA audio video, memilih SFX, cek mix |

## Proyek (`projects/`)

| Proyek | Isi |
|---|---|
| `jadisatu-60s` | Video 60-90 dtk (proyek baru 25 Okt): `DECISIONS.md` ledger, `REFERENSI.md` peran referensi. Gerbang script. |
| `jadisatu-launch` | `AUTHORITY.md` (urutan menang, peran storyboard, gerbang per adegan), `ART-DIRECTION.md` (dunia Pixel vs Apple, peta adegan, transisi antar dunia, audio, peran referensi) |

## Arsip (`archive/`)

| Skill | Digantikan oleh |
|---|---|
| `motion-director` v3 | `motion-graphic` |
| `motion-graphic-playbook` | `motion-graphic` |
| `irfan-motion-director` | `motion-graphic` |
| `morning` | Skill contoh bawaan Anthropic, bukan milik Irfan |

## Menambah skill baru

1. Skill buatan sendiri: folder baru di `claude/<nama>/` dengan `SKILL.md` (< 500 baris; detail di `references/`), lalu tambahkan satu baris di tabel di atas.
2. Skill open-source: `git submodule add <url> external/<nama>`, lalu catat versi dan perannya di `external/README.md` dan di tabel di atas.
3. Satu konsep, satu skill. Kalau skill baru tumpang tindih dengan yang ada, gabungkan atau pindahkan yang lama ke `archive/`.
