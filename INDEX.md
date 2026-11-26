# Katalog perpustakaan skill

Katalog skill untuk setiap model yang bekerja dengan Irfan. Pintu masuk repo adalah [AGENTS.md](AGENTS.md) (cara membaca + awal sesi); file yang dibuka per pekerjaan ada di [PETA.md](PETA.md) (Rute). Buka **hanya** skill yang cocok dengan pekerjaan. Jangan memuat semua skill sekaligus.

## Cara memakai

0. Jalankan langkah "Awal sesi" di [AGENTS.md](AGENTS.md).
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
| `GrokAgent/` | Analisis referensi visual+audio (Grok Bot Maximus); mulai dari [GrokAgent/README.md](GrokAgent/README.md) | Reference findings 2026-10-30; tidak menimpa `claude/` |
| `archive/` | Skill lama yang sudah digantikan | Jangan dimuat; hanya baseline untuk eval |
| `experimental/` | Eksperimen yang belum menjadi aturan skill; mulai dari README tiap folder (mis. `dual-agent-sound`: Claude engineer × Gemini director untuk sound design) | Eksperimen, diuji sekali |

## Skill Irfan (`claude/`)

| Skill | Peran | Pakai saat |
|---|---|---|
| `working-with-irfan` | Cara bekerja umum: komunikasi, siklus kerja, cara membuat skill/prompt, jangan menebak | Setiap tugas dari Irfan |
| `brief-gate` | Gerbang brief sebelum mengirim tugas ke subagen/worker: kalimat asli Irfan, baris Bukan, rantai metrik, baca dingin, pilot | Sebelum setiap dispatch subagen, worker, atau model lain |
| `video-reference-deconstructor` | Membedah video referensi jadi primitif gerak atomik terukur (mekanik, pemicu, alasan bekerja; kulit dibuang), lolos uji transfer, untuk pabrik | Membedah/sintesis/reverse-engineer video referensi, atau menulis brief untuk agen yang melakukannya |
| `autopilot-prd` | Eksekusi antrean PRD/QUEUE sampai habis, tier keputusan | Proyek dengan PRD, QUEUE, atau rencana tertulis |
| `jadisatu-canvas` | Aturan ruang bersama MCP lintas penyedia; koneksi, gambar, revisi dan reset konteks | Memakai atau menghubungkan Jadisatu Canvas dari Claude, Codex, Gemini CLI, Cursor, VS Code atau klien MCP lain |
| `irfan-creative-workflow` | Gerbang proyek kreatif, disiplin kredit, uji storyteller | Awal setiap proyek kreatif (video, kampanye, naskah) |
| `motion-graphic` | Semua video motion, talking head, dan klip podcast. Tiga lapis: **Lantai** (mutu yang selalu berlaku, termuat di `SKILL.md`), **Pustaka** (`cookbook/INDEX.md` → satu kiblat per video → kartu anatomi 8 bagian → `RESEP.md`), **Juri** (`scripts/juri/`: gerbang render, cek teks, lembar sanding still vs kiblat). Di bawahnya rujukan teknis: storyboard, copywriting, typography, camera, audio, QA | Setiap permintaan video, motion, potongan podcast, storyboard, naskah VO, bedah referensi |
| `script-workshop` | Semua tulisan konten (reels, carousel, caption, hook, ideasi): riset & validasi hipotesis dulu, evaluasi diri sebelum kirim; `guide/` per urusan (riset, audiens, hook, suara, struktur, produk/FAKTA, hindari). Menggantikan `irfan-content-engine` (Gemini) | Setiap ide konten, hook, naskah, carousel, caption, atau revisi tulisan |
| `jadisatu-narrator-vo` | Suara, model, dan cara merakit VO Inggris Jadisatu | VO marketing Jadisatu berbahasa Inggris |
| `cinedance-block-library` | Merakit prompt video-generation dari blok kode; `PROMPT-BLOCKING.md` = struktur prompt bernomor (identity lock, kamera, set, voice lock, timeline, audio, larangan, prioritas) untuk orang berbicara di Gemini Omni/Veo/Seedance | Brief format TRICK/FORMAT/ASSETS/BLOCKS untuk Seedance/Higgsfield; setiap prompt B-roll AI yang tokohnya berbicara (avatar aku, dialog Indonesia) |
| `vibedesign` | Desain statis berbasis kode (carousel IG, poster, cover): BRIEF → bedah referensi 3 lapis (`cookbook/BEDAH.md`) → racik kartu → bangun HTML/CSS/SVG per slide → juri → export PNG 2×. Engine Playwright, cast stiker SVG, token DTCG | Setiap carousel, poster, feed IG, cover, atau revisi desain statis |

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
| `jadisatu-60s` | Video 60-90 dtk: `DECISIONS.md` ledger, `REFERENSI.md` peran referensi. Gerbang script. |
| `jadisatu-launch` | `AUTHORITY.md` (urutan menang, peran storyboard, gerbang per adegan), `ART-DIRECTION.md` (dunia Pixel vs Apple, peta adegan, transisi antar dunia, audio, peran referensi) |

## Data referensi (repo terpisah)

| Repo | Peran |
|---|---|
| `Siirfannih/canvas-skill-library` | Bukti referensi riset untuk Canvas (kartu video, resep kinetik, profil audio). **Data, bukan aturan**: dibuka hanya bila brief butuh contoh, kalah dari skill `claude/` bila bertentangan, tidak dimuat otomatis di sesi produksi |

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
