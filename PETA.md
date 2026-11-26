# PETA repo skill-development

Dibuat oleh `tools/peta.py` dari isi file; jangan diedit tangan (ubah RUTE di skrip itu). Tujuannya: model membuka hanya file yang dibutuhkan pekerjaan. Bila file berubah, jalankan `python3 tools/peta.py`; `tools/doctor.sh` menandai peta yang basi.

## Cara membaca (ringkas; pintunya `AGENTS.md`)

- Urutan otoritas: kalimat di `AGENTS.md` (kata Irfan → NEGATIF [mutlak] → REF-SPEC → brief/proyek → profil merek → kartu → `references/`/`guide/`).
- Cocokkan setiap pesan baru dengan satu baris Rute sebelum edit pertama.
- File rute dibaca utuh; `grep` bukan membaca.

## Rute: pekerjaan → buka ini (urut, berhenti bila cukup)

| Pekerjaan | Buka | Jangan buka |
|---|---|---|
| Sesi produksi video | `claude/motion-graphic/SKILL.md` (NEGATIF + alur 8 langkah + tabel "Bila … buka …") → `projects/<proyek>/` (`DECISIONS.md`, `RESEP.md`, `TAHAP.md`, `STATUS.md`); kartu per kartu via `claude/motion-graphic/scripts/cookbook/pilih_kartu.py` (2–4 kartu untuk seluruh video; filter `--pack` dari `claude/motion-graphic/cookbook/INDEX.md`) | pack utuh, `PETA.md` selebihnya, `RETRO.md`, `SUMBER.md`, `cookbook/CATALOG.md` utuh, `_vault/`; folder proyek lain; template gaya tetap |
| Awal sesi lainnya | `AGENTS.md` → `PETA.md` (file ini) | seluruh `references/` sekaligus |
| Fase 1 pra-produksi (Brief, Naskah, Storyboard/block out): script, bedah referensi, storyboard | `claude/motion-graphic/cookbook/README.md` (§1 Prinsip, §2 Alur dua langkah) → `claude/motion-graphic/scripts/cookbook/pilih_kartu.py --cari "<fungsi cerita>"` per beat (mencocokkan *Narrative trigger* di `claude/motion-graphic/cookbook/CATALOG.md` lewat router `claude/motion-graphic/cookbook/INDEX.md`; naskah: `--kategori script`) → hanya 2–4 kartu **dan frame kuncinya** (`guide/referensi/sheets/keyframes/`) → tabel racikan disetujui user, `claude/motion-graphic/cookbook/contoh-gagal/README.md`, `claude/motion-graphic/references/storyboard.md`, `claude/script-workshop/SKILL.md` | `audio.md`, `build.md` |
| User membawa draf desain/storyboard/kode Remotion (penaik mutu) | `claude/motion-graphic/cookbook/README.md` §1 + §3 → `claude/motion-graphic/cookbook/INDEX.md` / `POLA.md` / `SFX.md` → `claude/motion-graphic/references/smooth-motion.md`, `claude/motion-graphic/references/camera-transition.md`, `claude/motion-graphic/references/pacing-map.md`, `claude/motion-graphic/guide/sfx/GUIDE.md` → daftar bedah per beat disetujui user, lalu revisi kode yang ada | merombak konsep, palet, huruf, aset, atau urutan user; menulis ulang dari nol |
| Fase 2 suara (Storyboard/block out, kunci suara): potong, ekor kata, level | `claude/motion-graphic/references/audio.md` §14.0C–14.0D, §14.6, `scripts/gate/cut_check.py`, `scripts/audio/recut.py`, `scripts/gate/voice_level.py` | tipografi, kamera |
| Fase 3 visual (Animate, Effects & grade): teks/KT, kamera, kurva, lapisan lego, efek, grade | **Rasa dulu:** `projects/<proyek>/RESEP.md` → kartu kiblat + frame kuncinya (dan kartu lain untuk bentuk di luar kiblat) → `claude/motion-graphic/guide/teks/GUIDE.md`, `claude/motion-graphic/guide/visual/GUIDE.md`, `claude/motion-graphic/guide/gerak/GUIDE.md` (§Cara memutuskan: pelajaran "bila…, pilih…, karena…") → `claude/motion-graphic/cookbook/contoh-gagal/README.md`. **Lalu teknik:** `claude/motion-graphic/references/typography.md` §8a, `claude/motion-graphic/references/build.md` (Rakit lego), `scripts/lego/teks_plan.py` → `kt_check.py`, `scripts/remotion/curves.ts`, `TeksBlok.tsx`, `LightSweep.tsx`, `claude/motion-graphic/references/camera-transition.md`; teks di belakang kepala, glow tepi badan, teks mengapit wajah, cutout subjek: `claude/motion-graphic/references/persepsi.md` + `scripts/lego/persepsi.py` (matte RVM, titik wajah MediaPipe, still rambut BiRefNet). **Effects & grade sebelum kunci visual:** tiap efek berfungsi (Lantai C18b), `claude/motion-graphic/references/grade.md` + `scripts/gate/grade_ukur.py`, lalu `claude/motion-graphic/templates/roles/pemeriksa-frame.md` (menilai frame, satu penilai). Builder hanya mengerjakan TASK dan bertanya langsung ke Sutradara (`claude/motion-graphic/references/roles.md` §5) | audio; `tools/AFTER-EFFECTS.md` kecuali diminta |
| Fase 4 SFX lalu musik (Mix) | `claude/motion-graphic/guide/sfx/GUIDE.md`, `claude/motion-graphic/guide/sfx/FAMILI.md` (famili bunyi, sumber tiga tingkat, `scripts/audio/sfx_cari.py` + `sfx_vet.py`), `claude/motion-graphic/cookbook/SFX.md`, `claude/motion-graphic/guide/sfx/SFXIRFAN.md` dan `claude/motion-graphic/guide/sfx/EPIDEMIC.md` (hanya bila folder SFX lokal ada; selain itu `sfx_cari.py`), `claude/motion-graphic/references/audio.md` §14.3–14.9, `scripts/gate/sfx_density.py`, `claude/motion-graphic/guide/audio/GUIDE.md`, `Asset/musik/MUSIK.md` (katalog lagu + link; file audio di mesin kerja; tanpa itu `musik_cari.py`) | tipografi |
| Fase 5 finishing (Mix, Deliver): mix, QA, render sekali, kirim + caption | `claude/motion-graphic/cookbook/README.md` §Juri, `claude/motion-graphic/templates/roles/pemeriksa-audio.md`, `claude/motion-graphic/templates/roles/devils-advocate.md` (mata luar, sekali sebelum final, brief steril; subagen/model lain bila ada, selain itu satu putaran kritik sendiri), `claude/motion-graphic/references/delivery-gate.md`, `scripts/juri/render.sh` (`lego` untuk video berfootage), `scripts/juri/frame_audit.py`, `claude/irfan-creative-workflow/SKILL.md` §2 (Kirim lewat Drive bila ada, selain itu path/link) | storyboard |
| Revisi dari Irfan: pesan apa pun yang mengeluhkan atau mengubah video yang sudah pernah dirender | **Sebelum edit pertama, urut:** `claude/motion-graphic/references/revision-log.md` utuh (§0 urutan, §21 ledger dan kunci) → ledger di `projects/<proyek>/DECISIONS.md` + `STATUS.md` → `scripts/juri/revisi_cek.py mulai` + `scripts/baseline_lock.py approve` dari versi yang disetujui → baca ulang NEGATIF + kartu kiblat proyek → kerjakan per lapisan, hanya atribut yang diminta → `revisi_cek.py cek` (atribut blok teks + lapisan) + `baseline_lock.py check` → rakit rentang (`scripts/lego/compose.py --rentang`) + still sebelum/sesudah ke Irfan; audio, audit semua frame, dan Devil's Advocate sekali sebelum final; video lama: `qc/revisi.json` (Lantai F27) | mengubah komponen atau aturan bersama untuk keluhan satu blok, menulis ulang dari nol, memigrasi adegan yang sudah disetujui, memasang usul model tanpa Irfan memilih, merakit master penuh tiap ronde |
| Koreksi dari Irfan atas hasil apa pun (di tengah sesi, bukan menunggu akhir) | koreksinya ke `projects/<proyek>/DECISIONS.md` saat diterima (selera dan gaya selalu di sini); hanya kesalahan kerja yang salah di gaya apa pun naik sebagai butir ber-ID di `claude/motion-graphic/guide/<urusan>/GUIDE.md` §Cara memutuskan, lewat `claude/skill-steward/references/placement.md` §6 dan `writing.md` §1; frame yang ditolak ke `claude/motion-graphic/cookbook/contoh-gagal/` | menjadikan satu koreksi larangan umum; menanyakan cakupannya ke Irfan |
| Mendelegasikan ke subagen / model lain (opsional; satu model tidak perlu) | `claude/motion-graphic/references/orkestrasi.md`, `claude/motion-graphic/templates/handoff-fase.md` | — |
| Sesi produksi desain statis (carousel, poster, cover) | `claude/vibedesign/DESIGN-CORE.md` (alur 3 gerbang, pertimbangan utama, gerbang juri) → `projects/<proyek>/` (`BRIEF.md`, `RESEP.md`, `DECISIONS.md`, `TAHAP.md`); referensi baru → `claude/vibedesign/cookbook/BEDAH.md`; kartu lewat `claude/vibedesign/cookbook/INDEX.md` | skill video, `PETA.md` selebihnya |
| Tulisan konten (caption, hook, copy carousel) | `claude/script-workshop/SKILL.md` | skill video |
| Proyek dengan PRD/QUEUE | `claude/autopilot-prd/SKILL.md` | — |
| Mengubah skill | `claude/skill-steward/SKILL.md` (§3 langkah kerja; `references/` dibuka saat tabelnya menyuruh); asal-usul aturan ke `SUMBER.md` skill itu; lalu `python3 tools/sumber_cek.py` dan `python3 tools/peta.py` | menulis nama, tanggal, atau cerita gagal di file instruksi |

## Skill aktif (`claude/`)

| Skill | Pakai saat |
|---|---|
| `claude/autopilot-prd/SKILL.md` | Pakai setiap kali mengerjakan proyek Irfan yang sudah punya PRD, QUEUE, atau rencana tertulis (Pandu/Tuntunly, Hermes, Jadisatu). Eksekusi sampai antrean habis tanpa menunggu "lanjutkan"; berhenti hanya di Tier 2. Mengal |
| `claude/brief-gate/SKILL.md` | Mandatory gate before you send a task to a subagent, worker or another model (Codex, Gemini, Sonnet). Use when you are about to dispatch work to another agent: check the brief against my original words, run the cold-read |
| `claude/cinedance-block-library/SKILL.md` | CINEDANCE — BLOCK LIBRARY v1. Assembles a full video-generation prompt from a short brief (TRICK, FORMAT, ASSETS, MAIN, FAIL, COUNT, TASK, ACTING) plus a list of block codes (FACE, BODY, MODEST, TASK, CAM-HANDHELD, CAM-L |
| `claude/irfan-creative-workflow/SKILL.md` | Workflow and hard-won lessons for any creative project with Irfan (launch videos, motion graphics, scripts, campaigns): gate order, script quality bar, credit discipline, and what experience to carry vs leave behind. Use |
| `claude/jadisatu-canvas/SKILL.md` | Use when an AI client connects to, reads, edits, or resumes a shared Jadisatu Canvas board, including uploaded references, room resets and stale-context conflicts. |
| `claude/jadisatu-narrator-vo/SKILL.md` | Pengaturan VO narator Inggris Jadisatu yang sudah disetujui Irfan (suara, model, cara baca, cara merakit). Pakai setiap kali membuat voiceover marketing/promo Jadisatu dalam bahasa Inggris. |
| `claude/motion-graphic/SKILL.md` | Bikin atau revisi video/motion Irfan (Jadisatu, Tuntunly, siirfan): video, reel, promo, storyboard, naskah VO, bedah referensi, animasi teks, klip podcast. Pakai walau permintaannya kasar atau Irfan hanya mengirim refere |
| `claude/script-workshop/SKILL.md` | Menulis konten Irfan dari ide sampai naskah siap take: script reels/video, carousel, caption, thread, ideasi, dan hook, untuk Jadisatu maupun akun pribadinya. Pakai setiap kali Irfan minta ide konten, hook, naskah, carou |
| `claude/skill-steward/SKILL.md` | Use when changing the skill-development repo itself: adding, changing, deleting, cleaning up, translating or auditing a skill, rule, reference, guide lesson, cookbook card, preset entry, AGENTS.md or PETA route, or turni |
| `claude/vibedesign/SKILL.md` | Mendesain konten statis (carousel Instagram, poster, slide sosial, cover) 100% lewat kode HTML/CSS/SVG lalu export PNG deterministik, dengan urutan baca yang jelas dan karakter yang beraksi. Pakai setiap kali ada permint |
| `claude/video-reference-deconstructor/SKILL.md` | Deconstructs a reference video into atomic motion primitives (kinetic typography, visual, camera, transition) that are measured, free of the reference's skin and pass the slot-swap test, for the factory to turn into code |
| `claude/working-with-irfan/SKILL.md` | Cara bekerja dengan Irfan — cara memahami permintaannya, bertanya, meneliti bahan, membuat skill/prompt, dan menyampaikan hasil. Pakai di setiap tugas dari Irfan sebelum menghasilkan output. |

## motion-graphic · pintu produksi

| File | Isi / kapan dibuka |
|---|---|
| `claude/motion-graphic/SKILL.md` | **Motion Graphic (Irfan)** — Kamu sutradara dan editor video Irfan: ia memberi konsep, bahan, selera; kamu memberi mutu. |
| `claude/motion-graphic/MIGRASI-LANTAI.md` | **MIGRASI-LANTAI: ke mana tiap butir Lantai pindah** — LANTAI.md dan MOTION-CORE.md sudah dipindah ke archive/riwayat/; pintu aktif adalah SKILL.md (gerbang render R1–R5 kini di references/build.md §4). |
| `claude/_bersama/NEGATIF.md` | **NEGATIF: batas keras anti-slop (dipakai motion-graphic dan vibedesign)** — Daftar ini kanonik. claude/motion-graphic/SKILL.md memuat salinan yang sama persis di antara penanda di bawah (dicek tools/sync_negatif.py). |

## motion-graphic · inti dan kamus referensi (opsional di sesi produksi)

| File | Isi / kapan dibuka |
|---|---|
| `claude/motion-graphic/RETRO.md` | **RETRO · catatan pelajaran per gerbang** — Riwayat beku: tidak ditulis lagi. |
| `claude/motion-graphic/cookbook/INDEX.md` | **Cookbook · INDEX (Router)** — ## 1. Domain Packs |
| `claude/motion-graphic/cookbook/00-core-invariants.md` | **00 · Core Invariants (Lintas Semua Format)** — 1. Teks diputuskan per beat (NEGATIF 6; A1, A3, A5). |
| `claude/motion-graphic/cookbook/CATALOG.md` | **Cookbook · CATALOG (Daftar Invariant Cards)** — File ini dibaca otomatis oleh scripts/cookbook/pilih_kartu.py. |
| `claude/motion-graphic/cookbook/README.md` | **Cookbook: perpustakaan mekanik gerak untuk brainstorming dan Remotion** — Cookbook ini lapisan penaik mutu (*quality adjustment layer*), bukan pembajak konsep. |

## motion-graphic · references (cabang; dibuka saat SKILL.md atau RUTE menyuruh)

| File | Isi / kapan dibuka |
|---|---|
| `claude/motion-graphic/references/alur-teknis.md` | **Alur teknis motion-graphic (rujukan)** — Dipindah dari SKILL.md supaya bacaan awal kecil. |
| `claude/motion-graphic/references/analysis-qa.md` | **Analysis & QA — bedah referensi dan gerbang kirim** — Baca saat membedah referensi (tahap Brief) dan sebelum mengirim render (QA di tahap Mix → Deliver). |
| `claude/motion-graphic/references/audio.md` | **Audio — VO, SFX, musik** — Baca hanya di gerbang audio (setelah script dan storyboard final) dan saat QA audio. |
| `claude/motion-graphic/references/bedah-referensi.md` | **Bedah Referensi · reverse engineering jadi REF-SPEC** — Wajib dijalankan setiap kali user membawa referensi (video, gambar, link), sebelum storyboard dibuat atau di-upgrade. |
| `claude/motion-graphic/references/build.md` | **Build — Remotion, rakit lego, dan engine kode** — Baca saat mulai build. |
| `claude/motion-graphic/references/camera-transition.md` | **Camera & transition** — Baca saat memilih gerak kamera (C) dan transisi (X) per potongan. |
| `claude/motion-graphic/references/copywriting.md` | **Copywriting — VO script and on-screen text** — Read at the Script stage and whenever writing text that appears on screen. |
| `claude/motion-graphic/references/decision-guide.md` | **Panduan keputusan: teks, visual, kotak, warna (logika, bukan contoh)** — Dibaca saat menulis tabel storyboard (langkah 5 SKILL.md) dan saat QA sebelum deliver (langkah 8). |
| `claude/motion-graphic/references/decision.md` | **Decision — choosing, deciding, and when to ask** — Read when choosing between options (family, text style, technique, transition), when two rules feel like they conflict, or when unsure whether to ask me. |
| `claude/motion-graphic/references/delivery-gate.md` | **Delivery Gate (wajib sebelum video ditunjukkan ke Irfan)** — Laporan PASS/FAIL ini dikirim bersama video. |
| `claude/motion-graphic/references/delivery-spec.md` | **Spesifikasi pengiriman (profil V1)** — Satu master MP4 untuk semua platform. |
| `claude/motion-graphic/references/direction.md` | **Direction — prinsip sutradara, family visual, elemen, warna** — Baca saat menentukan apa yang terjadi di setiap beat: tokoh, subjek, metafora, family visual, palet. |
| `claude/motion-graphic/references/dunia-visual.md` | **Dunia visual: tema, terjemahan kata gaya, dan gerbang style frame** — Dibuka di langkah 3-5 alur SKILL.md: memilih tema bersama user, lalu menuntun cara berpikir desain, kinetic typography, dan sound design supaya storyboard terasa dibuat editor manusia. |
| `claude/motion-graphic/references/efek-3d.md` | **Effects and 3D: when, which are safe, recipes** — Standalone reference (not a mandatory gate). |
| `claude/motion-graphic/references/grade.md` | **Color grading footage dengan ffmpeg** — Dibuka saat footage (talking head, b-roll) perlu look tertentu. |
| `claude/motion-graphic/references/hybrid-motion-standard.md` | **Hybrid Motion Standard (default from the benchmark references; REF-SPEC wins)** — Extracted from benchmark reference videos (archive/riwayat/GrokAgent/reference-videos/). |
| `claude/motion-graphic/references/kamera-gerak.md` | **Camera, motion, and transitions** — Opened when designing camera movement and transitions (steps 5-6 of the SKILL.md workflow). |
| `claude/motion-graphic/references/motion-mechanics.md` | **Motion mechanics: camera, transitions, cutout (logic and how they work)** — Read when choosing camera moves or transitions, alongside camera-transition.md. |
| `claude/motion-graphic/references/orkestrasi.md` | **Orkestrasi: kamu memimpin, model lain yang mengulang** — Satu model sudah cukup: kamu yang membangun dan menilai, dalam putaran terpisah (bangun dulu; menilai dari gambar sebelum membaca catatan buildmu sendiri). |
| `claude/motion-graphic/references/pacing-map.md` | **Peta nada → gerak (dari transkrip + audio)** — Dibaca di gerbang storyboard (4), sebelum motion-mechanics.md. |
| `claude/motion-graphic/references/palette.md` | **Palet: cara memilih dan memakai warna** — Dibaca di gerbang brief (1) saat mengunci palet, dan di QA (9). |
| `claude/motion-graphic/references/persepsi.md` | **Persepsi — letak orang dan wajah di footage** — Baca saat adegan berfootage butuh tahu di mana orang atau wajahnya: teks atau kata hero di belakang kepala, glow di tepi badan, teks mengapit wajah, latar diganti atau diredupkan lewat matte, cutout s |
| `claude/motion-graphic/references/preset-index.md` | **PRESET-INDEX · Peta Preset Mekanikal Buatan Sendiri (Dekopled dari Remotion)** — Buka file ini hanya pada tahap build (setelah SKILL.md + tema/<tema>.md + *style frame* dikunci). |
| `claude/motion-graphic/references/revisi.md` | **Revision = diff, one round** — Opened when there is a revision message on a video or storyboard, before the first edit (step 8 of the SKILL.md workflow). |
| `claude/motion-graphic/references/revision-log.md` | **Revision log** — Baca saat Irfan memberi revisi: catat dulu, baru kerjakan. |
| `claude/motion-graphic/references/roles.md` | **Dua peran: Sutradara dan Editor (layer komunikasi)** — Dibaca hanya bila pekerjaan dibagi ke Editor (subagen atau model lain); satu model tidak perlu membukanya. |
| `claude/motion-graphic/references/selects-editor.md` | **Paket editor dari rekaman talking head mentah (selects)** — Dibuka saat bahannya rekaman mentah panjang (beberapa menit, banyak take ulang) dan keluarannya paket untuk editor manusia: timeline klip ber-timecode, rough cut, audio, aset motion, storyboard, dan animatic. |
| `claude/motion-graphic/references/slop-catalog.md` | **Slop catalog (signs I have rejected)** — Used to scan, not to ban techniques: fingerprints are written as appearance and measurements (KEBIJAKAN v2, policy v2), and apply unless REF-SPEC states otherwise. |
| `claude/motion-graphic/references/smooth-motion.md` | **Smooth motion — resep motion blur, teks, dan kamera yang terbukti** — Baca saat membangun animasi teks, mengatur motion blur, atau saat Irfan bilang gerak "kurang smooth", "patah-patah", atau "kamera berantakan". |
| `claude/motion-graphic/references/storyboard.md` | **Storyboard visual: dari script atau daftar potongan ke papan panel** — Baca di tahap Storyboard/block out. |
| `claude/motion-graphic/references/teks.md` | **Teks di layar: posisi, keterbacaan, gerak** — Dibuka saat mengatur teks layar (langkah 4-6 alur SKILL.md). |
| `claude/motion-graphic/references/three-segment-gate.md` | **Gerbang 3 Segmen** — Claude tidak melihat video saat menulis kode. |
| `claude/motion-graphic/references/typography.md` | **Typography & kinetic text** — Baca saat memilih gaya teks, ukuran, dan teknik T, atau mengatur easing. |
| `claude/motion-graphic/references/warna.md` | **Colour gate (entry and exit)** — Moved from dunia-visual.md §9 so that reference stays under 15 KB. |

## motion-graphic · guide (rasa per urusan)

| File | Isi / kapan dibuka |
|---|---|
| `claude/motion-graphic/guide/audio/GUIDE.md` | **Audio: musik ikut suasana video** — Tujuan. Musik terasa satu tubuh dengan video. |
| `claude/motion-graphic/guide/gerak/GUIDE.md` | **Gerak: smooth, tidak kaku, cutout rapi** — Tujuan. Setiap perpindahan terasa punya arah dan alasan; tidak ada yang "nongol" atau patah. |
| `claude/motion-graphic/guide/hindari/GUIDE.md` | **Hindari (cek akhir)** — Ini daftar pindai, bukan larangan teknik. |
| `claude/motion-graphic/guide/referensi/18-arthur-brooks-ukuran.md` | **Kartu 18 · Tambahan ukuran: proporsi teks, skala subjek, kedalaman** — Sumber: ~/work/_downloads/g9xoKm5DEeU/video.mp4 (1280×720, 30 fps), 17:56–18:53, frame tiap 0,5 dtk (114 frame, frames/f_NNN.jpg; ts = 17:56 + (NNN−1)×0,5 dtk). |
| `claude/motion-graphic/guide/referensi/README.md` | **Video referensi Irfan (catatan ukur)** — Contact sheet per video di sheets/ (24 frame bertimestamp). |
| `claude/motion-graphic/guide/referensi/baikov.md` | **07 Baikov / Shapes: format product film & onboarding** — Disalin dari Siirfannih/jadisatu-skills skills/jadisatu-motion/references/BAIKOV.md (bedah seluruh 2010 frame, Okt 2026); bagian IHSG di sana khusus proyek lain. |
| `claude/motion-graphic/guide/referensi/ganimate.md` | **17 _ganimate_ · "Editorial Explainer System": guideline editing** — --- |
| `claude/motion-graphic/guide/referensi/jefferson-fisher.md` | **15 jefferson_fisher · "Card Caption Clean": guideline editing** — --- |
| `claude/motion-graphic/guide/referensi/joseph-arthur-brooks.md` | **18 Joseph (Ultimate Editors) · gaya "minimal premium" Arthur Brooks + cara melatih Claude** — --- |
| `claude/motion-graphic/guide/referensi/markbrazil.md` | **16 markbrazil · "Noir Stage Podcast": guideline editing** — --- |
| `claude/motion-graphic/guide/referensi/pedro-andradeok.md` | **14 pedro.andradeok · "Grid Cut Editorial": guideline editing** — --- |
| `claude/motion-graphic/guide/sfx/EPIDEMIC.md` | **Katalog `~/sfx/Epidemic` (diunduh dan diperiksa 21 Nov 2026)** — Stok lokal Tier 1 untuk famili yang tipis di SFXIrfan dan Kenyset, termasuk Master Keyword Matrix lima pilar (FAMILI.md §0). |
| `claude/motion-graphic/guide/sfx/FAMILI.md` | **Famili bunyi: kebutuhan SFX ditulis sebagai karakter, sumbernya dicari** — Tujuan. Kebutuhan bunyi tiap objek ditulis sebagai famili (karakter bunyi), bukan nama file. |
| `claude/motion-graphic/guide/sfx/GUIDE.md` | **SFX: lima pilar sound design, satu cue untuk setiap objek/visual penting** — Tujuan. Video terdengar seperti satu ruang yang hidup: bed ambien konstan di bawah semuanya, dan setiap objek atau visual yang muncul/bergerak punya satu bunyi dari pilarnya: transisi kamera & split,  |
| `claude/motion-graphic/guide/sfx/SFXIRFAN.md` | **Katalog `~/sfx/SFXIrfan` (didengar 13 Nov dengan `earshot describe`)** — Sumber pertama untuk SFX (Lantai E24), bukan allowlist. |
| `claude/motion-graphic/guide/teks/GUIDE.md` | **Teks: sedikit kata, maks 2 baris, tidak bertumpuk** — Tujuan. Teks membantu menangkap kalimat, bukan dibaca seperti artikel. |
| `claude/motion-graphic/guide/visual/GUIDE.md` | **Visual: rapi, tersusun, hierarki terbaca** — Tujuan. Dalam setengah detik mata tahu: ini yang utama, itu pendukung. |

## motion-graphic · templates

| File | Isi / kapan dibuka |
|---|---|
| `claude/motion-graphic/templates/TAHAP.md` | **TAHAP · <proyek>** — Disalin ke projects/<proyek>/TAHAP.md di awal video. |
| `claude/motion-graphic/templates/cut-sheet.md` | **Timeline Cut Sheet & Visual Mapping · <project>** — One table for the whole video. |
| `claude/motion-graphic/templates/handoff-fase.md` | **Handoff fase <n> · <proyek> · <tanggal>** — Kamu subagen untuk satu fase saja. |
| `claude/motion-graphic/templates/merek/BRAND.md` | **<nama merek>** — ## Siapa dan untuk siapa <2–3 kalimat: apa mereknya, penontonnya, kesan yang harus tertinggal setelah video selesai.> |
| `claude/motion-graphic/templates/merek/EDITING.md` | **Editing <nama merek>** — ## Arah yang dipilih user <Tema yang user sebut (mis. |
| `claude/motion-graphic/templates/merek/README.md` | **Profil merek dan folder data user** — Repo ini hanya menyimpan cara kerja dan cetakan kosong. |
| `claude/motion-graphic/templates/roles/devils-advocate.md` | **Creative Devil's Advocate · mata luar sebelum render final** — Pembuat video selalu cenderung meloloskan karyanya sendiri. |
| `claude/motion-graphic/templates/roles/editor.md` | **Prompt Editor (diisi Sutradara, dikirim lewat Agent / SendMessage)** — Ganti <…>. Jangan menambah cerita proses, pendapat, atau kutipan chat Irfan; Editor hanya perlu fakta, keputusan, dan tugas (roles.md §1). |
| `claude/motion-graphic/templates/roles/handoff.md` | **`handoff/` folder skeleton** — Copy the needed sections to projects/<project>/handoff/. |
| `claude/motion-graphic/templates/roles/pemeriksa-audio.md` | **Pemeriksa audio terhadap frame · fase audio (satu agen per potongan ≤ 10 dtk)** — Dipanggil setelah fase visual lulus (pemeriksa-frame.md) dan SFX dikunci (audio_order.py lock sfx). |
| `claude/motion-graphic/templates/roles/pemeriksa-frame.md` | **Menilai frame · fase visual (satu penilai: Sutradara)** — Dijalankan setelah visual selesai disusun dan sebelum SFX dan musik dibuat: render.sh <proyek> frames → scripts/juri/frame_audit.py qc/frames (fase visual). |
| `claude/motion-graphic/templates/sistem-desain/README.md` | **Sistem desain video (satu per proyek)** — Ditulis Sutradara sebelum pekerja adegan mulai, di remotion/src/<…>/bersama/tema.ts proyek. |

## motion-graphic · skrip (alat dan gerbang)

| File | Isi / kapan dibuka |
|---|---|
| `claude/motion-graphic/scripts/audio_qa.py` | Audio QA gate — ukur mix video sendiri dan referensi dengan definisi yang SAMA. |
| `claude/motion-graphic/scripts/banding.py` | banding.py: bandingkan frame dengan frame referensi / REF-SPEC.json (KEBIJAKAN-v2 bagian 1.3 dan 3). |
| `claude/motion-graphic/scripts/baseline_lock.py` | Kunci adegan yang sudah disetujui Irfan sebagai frame baseline, lalu gagalkan render yang mengubahnya. |
| `claude/motion-graphic/scripts/bedah-kamera.py` | Bedah gerak kamera dari video jadi: transform kemiripan antar-frame (ORB + RANSAC) → zoom, geser, putar per frame. |
| `claude/motion-graphic/scripts/lihat.py` | Lihat per lapis: render frame HTML atau still Remotion lapis demi lapis, supaya "bangun, lihat, perbaiki" jadi satu perintah. |
| `claude/motion-graphic/scripts/palette_check.py` | QC palet: hitung keluarga warna aksen di sebuah render. Gagal bila keluarga > 2, atau keluarga terbesar < 70 % piksel vivid (tidak ada warna dominan). |
| `claude/motion-graphic/scripts/ref_spec.py` | ref_spec.py: bedah referensi jadi REF-SPEC terukur (KEBIJAKAN-v2 bagian 3: referensi = kebenaran selera). |
| `claude/motion-graphic/scripts/audio/audio_phone.py` | v16 audio QA: does every SFX survive a phone speaker at 20 / 50 / 100 % volume, is the VO always clear, and is any SFX harsh (2–6 kHz)? Uses render/mix.wav + stems + render/cues.json. |
| `claude/motion-graphic/scripts/audio/ears.py` | Telinga gabungan: earshot = skor pertama, lalu dicek ukuran independen (audio.md §14.0B). |
| `claude/motion-graphic/scripts/audio/el_music.py` | v15 score: one continuous ElevenLabs Music composition whose sections are timed to the VO acts (vo.json). Usage: python3 tools/el_music.py <out.mp3> [plan.json] — key read from .el_key (never printed) |
| `claude/motion-graphic/scripts/audio/el_sfx.py` | v15: real SFX from ElevenLabs sound generation for the kinds that were code-synthesized. Warm / thock / no ear-fatigue brief baked into every prompt. Writes sfx/el/<kind>_<n>.mp3. Key from .el_key. |
| `claude/motion-graphic/scripts/audio/env.py` |  |
| `claude/motion-graphic/scripts/audio/loudness_2pass.sh` | Loudness 2-pass linear untuk MIX AKHIR (bukan stem suara). Lantai E23 / audio.md: suara asli tidak diturunkan, |
| `claude/motion-graphic/scripts/audio/music_check.py` | Check a generated score against the act plan: duration, loudness per section, energy jump at boundaries. |
| `claude/motion-graphic/scripts/audio/music_fit.py` | Seleksi musik terukur: kandidat diukur dan diberi peringkat terhadap kategori suasana + suara video. |
| `claude/motion-graphic/scripts/audio/musik_cari.py` | Kumpulkan kandidat musik per kategori suasana dari Mixkit (Tier 2 musik, guide/sfx/FAMILI.md §4). |
| `claude/motion-graphic/scripts/audio/myinstants_unduh.py` | Unduh SEMUA suara dari hasil pencarian myinstants.com (sumber gratis, guide/sfx/FAMILI.md §2 tingkat 2). |
| `claude/motion-graphic/scripts/audio/pace_read.py` | Baca tempo video lalu usulkan kategori suasana untuk audio (Lantai E25). |
| `claude/motion-graphic/scripts/audio/recut.py` | Terapkan rentang buang ke suara + video wajah (sinkron bibir) dan buat peta waktu lama -> baru. |
| `claude/motion-graphic/scripts/audio/sfx_cari.py` | Cari kandidat SFX per famili bunyi di sumber gratis berlisensi (Tier 2, guide/sfx/FAMILI.md §Sumber). |
| `claude/motion-graphic/scripts/audio/sfx_comfort.py` | Comfort scorecard for SFX files: hiss = share of energy above 6 kHz (desis) bite = share in 2–6 kHz (where harshness lives) rough = envelope modulation 30–150 Hz relative to the mean envelope (grit /  |
| `claude/motion-graphic/scripts/audio/sfx_potong.py` | Potong ujung SFX di batas objeknya tanpa terdengar putus, plus gerbangnya. |
| `claude/motion-graphic/scripts/audio/sfx_profile.py` | Profil SFX referensi: dari stem no_vocals (demucs) cari transien, ukur level relatif VO, durasi, pita, kelas kasar. Pakai: python3 sfx_profile.py <nama> [<nama> ...] (membaca sep/htdemucs/<nama>/{voca |
| `claude/motion-graphic/scripts/audio/sfx_span.py` | Does the sound last as long as the motion? (complements visual_coverage.py, which only checks onsets) |
| `claude/motion-graphic/scripts/audio/sfx_vet.py` | Periksa file SFX sebelum dipasang (Tier 3 sumber SFX, guide/sfx/FAMILI.md §Periksa). |
| `claude/motion-graphic/scripts/audio/sync_cues.py` | v18: SFX must land WITH the object — not before it appears, not after — and not pile up. For every cue in render/cues.json, look at the picture around it (cells of an 8×6 grid, so a small label counts |
| `claude/motion-graphic/scripts/audio/tighten.py` | v14 finishing: shorten the video by tightening the VO — never by cutting speech. 1. tempo: TEMPO is locked at 1.0; the VO is never sped up. Only pauses are tightened. 2. pauses: every quiet run inside |
| `claude/motion-graphic/scripts/audio/tighten_ig.py` | Padatkan jeda mati VO untuk retensi short-form/IG tanpa mempercepat ucapan (TEMPO=1.0). |
| `claude/motion-graphic/scripts/audio/visual_coverage.py` | v16 (every object, visual and text gets its own sound, no exceptions). Finds visual events in the rendered picture (frame-difference onsets: something appears, moves off, cuts, lands) and checks that  |
| `claude/motion-graphic/scripts/audio/vo_echo.py` | Cek gema VO (audio.md §14.10): energi ekor 40-150 ms setelah akhir kata, relatif ke level kata. |
| `claude/motion-graphic/scripts/audio/vo_gaps.py` | List every silent run in the assembled VO (from vo.json chunk starts + trim wavs). usage: vo_gaps.py vo.json vodir |
| `claude/motion-graphic/scripts/blender/render_seq.sh` | Wrapper Blender headless: render urutan frame. Blender mengeksekusi argumen BERURUTAN, jadi -a (atau -f) harus |
| `claude/motion-graphic/scripts/cookbook/pilih_kartu.py` | Pemilih kartu mekanik cookbook per beat: baca cookbook/CATALOG.md, kembalikan 2-4 kartu yang cocok dengan fungsi cerita. |
| `claude/motion-graphic/scripts/gate/audio_order.py` | Gerbang urutan sound design: tiap lapisan audio dikunci berurutan ke lapisan sebelumnya. |
| `claude/motion-graphic/scripts/gate/caption_lines.py` | Hitung jumlah baris caption di render. Gagal bila ada caption > 2 baris (Lantai A1) atau terpotong di tepi. |
| `claude/motion-graphic/scripts/gate/cek_komposisi.py` | Gerbang komposisi data episode sebelum build dan sebelum render final (fail-closed). |
| `claude/motion-graphic/scripts/gate/cut_check.py` | Gerbang potongan suara (kunci suara di tahap Storyboard/block out, Lantai E23): sebelum suara dikunci, potongan harus bersih dari kata sampah dan diam saat pembicara berpikir — termasuk diam yang dite |
| `claude/motion-graphic/scripts/gate/delivery_probe.py` | Cek pasca-render profil pengiriman V1 (lihat references/delivery-spec.md). Alat mandiri, belum jadi gerbang wajib. |
| `claude/motion-graphic/scripts/gate/grade_ukur.py` | Ukur hasil color grading footage dengan angka sebelum dinilai dengan mata (`references/grade.md`). |
| `claude/motion-graphic/scripts/gate/music_batch.py` | Gerbang: satu track musik tidak boleh dipakai untuk semua klip/babak dalam satu batch. |
| `claude/motion-graphic/scripts/gate/negatif_cek.py` | Satu pintu cek NEGATIF (KEBIJAKAN-v2: negatif = simpangan dari REF-SPEC + sidik jari slop, bukan larangan teknik). |
| `claude/motion-graphic/scripts/gate/pause_clean.py` | Gerbang jeda bersih (Lantai E23): saat pembicara berhenti/berpikir, stem suara tidak membawa dengung kamar, piring, klik, atau room tone kotor yang ikut dikeraskan. |
| `claude/motion-graphic/scripts/gate/permukaan_cek.py` | Inventaris permukaan: berapa SISTEM huruf, bayangan, gradien, kaca/blur, dan 3D yang dipakai di kode frame (KEBIJAKAN-v2). |
| `claude/motion-graphic/scripts/gate/sfx_density.py` | Gerbang Lantai E24 (5 Pilar Sound Design, guide/sfx/FAMILI.md §0): SFX menandai momen cerita dan gerak yang terlihat, tiap cue berlabel `pilar` (bed, transisi, tick, taktil, aksen), tanpa spam. |
| `claude/motion-graphic/scripts/gate/tabrakan_cek.py` | Gerbang tabrakan: teks menimpa teks, teks menimpa objek, teks keluar zona aman, diukur dari DOM frame HTML (bukan dari mata). |
| `claude/motion-graphic/scripts/gate/voice_fidelity.py` | Gerbang suara asli pembicara (format klip podcast/wawancara). |
| `claude/motion-graphic/scripts/gate/voice_level.py` | Gerbang level suara asli (Lantai E23): suara asli (narasumber, rekaman sendiri, VO) tidak pernah diturunkan, di-loudness-kan, atau di-limit. Yang boleh: peredam noise, lalu gain NAIK yang bersih sampa |
| `claude/motion-graphic/scripts/juri/audio_bus_check.py` | Audio di Remotion hanya lewat satu bus global. <Audio> yang ditaruh di dalam <Sequence> adegan ikut berhenti saat adegan selesai, sehingga ekor kata/SFX/musik terpotong di setiap batas adegan (penyeba |
| `claude/motion-graphic/scripts/juri/frame_audit.py` | Audit SEMUA frame sebelum render MP4, tanpa sampling, dalam dua fase yang terpisah. |
| `claude/motion-graphic/scripts/juri/gerbang_produksi.sh` | Gerbang produksi untuk render final: komposisi episode, ujung SFX, dan mix di speaker HP. Netral gaya: tidak ada |
| `claude/motion-graphic/scripts/juri/kt_ocr.py` | Cek teks kinetik sudah lengkap dan terbaca beberapa frame setelah blok masuk (LANTAI A1). |
| `claude/motion-graphic/scripts/juri/motion_lint.py` | Gerak dirancang per gerak, bukan preset (Lantai B13a; diadaptasi dari motion-kit, MIT). |
| `claude/motion-graphic/scripts/juri/profil_cek.py` | Cek profil merek (tahap Brief): BRAND.md dan EDITING.md terisi, nilai pasti benar bentuknya, aset yang dirujuk ada. |
| `claude/motion-graphic/scripts/juri/render.sh` | Satu pintu render Remotion: still dulu, draft kecil, render penuh paling akhir (LANTAI F26). |
| `claude/motion-graphic/scripts/juri/resep_check.py` | Cek RESEP.md sebelum build: 8 bagian terisi, tiga pengikat dari SATU sumber (kartu kiblat dari referensi user, atau REF-SPEC.md bila user tanpa referensi), kartu kiblat atau REF-SPEC.md ada. |
| `claude/motion-graphic/scripts/juri/revisi_cek.py` | Gerbang revisi video lego: lapisan yang berubah sejak versi yang disetujui harus tercakup ledger (Lantai F27, revision-log §21.2). |
| `claude/motion-graphic/scripts/juri/sandingkan.py` | Lembar sanding: still kita di kiri, frame kiblat di kanan, supaya selisihnya terlihat sebelum render penuh. |
| `claude/motion-graphic/scripts/juri/tahap.py` | Langkah berikutnya dari TAHAP.md proyek: apa yang dikerjakan dan file/bagian mana yang dibaca SEKARANG. |
| `claude/motion-graphic/scripts/juri/teks_cek.py` | Cek teks di still per beat (LANTAI A1-A4, A7): bukan subtitle film, tidak ganda, tidak menyentuh tepi. |
| `claude/motion-graphic/scripts/juri/tema_cek.py` | Cek sistem desain video: gaya hanya dari tema.ts, warna merek terkendali, warna UI asli di tempatnya. |
| `claude/motion-graphic/scripts/lego/base_pts.py` | Ukur pts tiap frame DASAR (tanpa lapisan, tanpa audio) lewat compose.py yang sama. |
| `claude/motion-graphic/scripts/lego/cek_master.py` | Ukur frame master tempat tiap lapisan ber-alpha benar-benar tampil dan bandingkan dengan rencana lego.json. |
| `claude/motion-graphic/scripts/lego/compose.py` | Rakit video seperti lego: footage dasar + lapisan (teks/KT, visual, overlay) yang sudah dirender TERPISAH dan disimpan di cache digabung SEKALI dengan ffmpeg. Lapisan yang tidak berubah tidak dirender |
| `claude/motion-graphic/scripts/lego/kt_check.py` | Gerbang tipografi kinetik (Lantai A9a). |
| `claude/motion-graphic/scripts/lego/lapisan.py` | Render lapisan lego satu per satu dengan cache. Hanya lapisan yang berubah yang dirender ulang. |
| `claude/motion-graphic/scripts/lego/persepsi.py` | Lapisan persepsi untuk Remotion: footage -> matte orang (RVM, stabil antar frame) + posisi wajah per frame (MediaPipe). |
| `claude/motion-graphic/scripts/lego/teks_plan.py` | Kerangka teks.json dari transkrip: isi teks = ucapan hanya di beat bermode TEKS (jalankan dengan `--beats beats.json`); yang dihitung mesin hanya WAKTU dan DURASI tiap blok. Peran, kode gerak (T..), g |
| `claude/motion-graphic/scripts/remotion/FlashGrid.tsx` | FlashGrid.tsx — pembungkus kompatibilitas ke komponen kanonik ae-primitives/transisi/GridFlashReveal.tsx. |
| `claude/motion-graphic/scripts/remotion/Kursor.tsx` | Kursor.tsx — blok lego: kursor yang bergerak seperti tangan manusia (cookbook/04-ui-cutout-dataviz-visuals/M18-ui-staged-cursor-and-component-morph.md). |
| `claude/motion-graphic/scripts/remotion/LightSweep.tsx` | LightSweep.tsx — gaya G8 "kilat cahaya" (typography.md §7.5). |
| `claude/motion-graphic/scripts/remotion/Penghitung.tsx` | Penghitung.tsx — blok lego: angka yang naik/turun dan bisa dibaca (cookbook/04-ui-cutout-dataviz-visuals/M20-dataviz-bars-counters-and-tickers.md). |
| `claude/motion-graphic/scripts/remotion/SmoothAudioClip.tsx` | SmoothAudioClip.tsx — audio motion-graphic §14.7 (Modul 2). |
| `claude/motion-graphic/scripts/remotion/TeksBlok.tsx` | TeksBlok.tsx — satu blok teks KT sebagai lapisan lego ber-alpha (Lantai A9a, F26). |
| `claude/motion-graphic/scripts/remotion/curves.ts` | curves.ts — kompatibilitas impor lama (`../curves`). Isi kanonik: toolkit/gerak/curves.ts. |
| `claude/motion-graphic/scripts/remotion/timing.ts` | timing.ts — stagger, pegas berlintasan, van Wijk, timeline. Semua murni terhadap `frame`: |
| `claude/motion-graphic/scripts/remotion/ae-primitives/index.ts` | index.ts — satu pintu impor AE-Primitives. Butuh `curves.ts` di folder induk (../curves). |
| `claude/motion-graphic/scripts/remotion/ae-primitives/presets.ts` | presets.ts — titik awal angka untuk semua primitive: kurva, pegas, durasi, intensitas, token warna netral. |
| `claude/motion-graphic/scripts/remotion/ae-primitives/aksen/FlashCut.tsx` | FlashCut.tsx — kilat di titik potong atau di ketukan: bidang warna penuh N frame tanpa naik/turun (GRK-01), |
| `claude/motion-graphic/scripts/remotion/ae-primitives/aksen/InvertFlash.tsx` | InvertFlash.tsx — inversi warna (negatif) 2–4 frame untuk aksen ketukan atau punchline. Intensitas penuh selama |
| `claude/motion-graphic/scripts/remotion/ae-primitives/inti/DirectionalBlur.tsx` | DirectionalBlur.tsx — blur searah (AE "Directional Blur") + pemisahan kanal RGB tipis, lewat satu filter SVG. |
| `claude/motion-graphic/scripts/remotion/ae-primitives/inti/acak.ts` | acak.ts — angka acak berbiji (deterministik per frame). Math.random dilarang di komponen Remotion: |
| `claude/motion-graphic/scripts/remotion/ae-primitives/inti/aeKeyframe.ts` | aeKeyframe.ts — interpolasi keyframe gaya Graph Editor After Effects (speed graph), murni dari frame. |
| `claude/motion-graphic/scripts/remotion/ae-primitives/inti/gerak.ts` | gerak.ts — kecepatan dari fungsi pose murni (frame → pose) dan blur yang setara shutter kamera. |
| `claude/motion-graphic/scripts/remotion/ae-primitives/kamera/MotionBlurWrapper.tsx` | MotionBlurWrapper.tsx — memindahkan isi menurut fungsi pose murni dan memberi blur searah yang dihitung otomatis |
| `claude/motion-graphic/scripts/remotion/ae-primitives/kamera/SpatialAnchorCamera.tsx` | SpatialAnchorCamera.tsx — satu aset (foto, halaman, kanvas HTML), kamera virtual berpindah antar titik fokus. |
| `claude/motion-graphic/scripts/remotion/ae-primitives/kedalaman/SpatialDepthStage.tsx` | SpatialDepthStage.tsx — panggung 2,5D berlapis: latar jauh buram, hero di bidang fokus, teks di depan. |
| `claude/motion-graphic/scripts/remotion/ae-primitives/teks/HighlighterSweep.tsx` | HighlighterSweep.tsx — sorotan stabilo yang menyapu di belakang kutipan, dari kiri (atau kanan) dengan CURVE.reveal. |
| `claude/motion-graphic/scripts/remotion/ae-primitives/tekstur/Scrim.tsx` | Scrim.tsx — gradien gelap dari satu sisi supaya teks di atas foto lolos kontras. Masuk dan keluar dengan gerak |
| `claude/motion-graphic/scripts/remotion/ae-primitives/tekstur/SelectiveColorSpotlight.tsx` | SelectiveColorSpotlight.tsx — satu bagian aset tetap berwarna, sisanya pudar ke abu, redup, dan sedikit buram. |
| `claude/motion-graphic/scripts/remotion/ae-primitives/transisi/GridFlashReveal.tsx` | GridFlashReveal.tsx — adegan baru terbuka per petak grid, tiap petak boleh menyala sesaat (kilat petak) saat |
| `claude/motion-graphic/scripts/remotion/ae-primitives/transisi/SceneChain.tsx` | SceneChain.tsx — rangkaian adegan dengan transisi bertumpang: adegan lama tetap tampil di bawah selama transisi |
| `claude/motion-graphic/scripts/remotion/ae-primitives/transisi/WhipPanTransition.tsx` | WhipPanTransition.tsx — whip pan: adegan lama terlempar, adegan baru masuk, blur searah + regang + geser RGB tipis. |
| `claude/motion-graphic/scripts/selects/cue_sumber.py` | Pindahkan cue (SFX, aset motion, titik musik) dari timeline lama ke timeline baru lewat WAKTU SUMBER. |
| `claude/motion-graphic/scripts/selects/rakitan_cek.py` | Cek take dobel dan kata terpotong pada rakitan klip dari rekaman talking head mentah. |
| `claude/motion-graphic/scripts/selects/timeline.py` | Timeline untuk editor dari rekaman talking head mentah (paket selects, `references/selects-editor.md`). |
| `claude/motion-graphic/scripts/storyboard/board.py` | Storyboard visual: render panel HTML -> PNG, susun papan (pola kanvas Wonder), lalu periksa. |
| `claude/motion-graphic/scripts/warna/palet_keluar.py` | palet_keluar.py: pembungkus tipis untuk `cek-warna.mjs keluar` (GERBANG KELUAR warna (warna nyasar, kontras APCA/WCAG, warna nanggung)). |
| `claude/motion-graphic/scripts/warna/palet_masuk.py` | palet_masuk.py: pembungkus tipis untuk `cek-warna.mjs masuk` (GERBANG MASUK warna (palet HEX nyata + peran dari referensi)). |

## tools/ (perawatan repo)

| File | Isi / kapan dibuka |
|---|---|
| `tools/AFTER-EFFECTS.md` | After Effects bukan jalur bawaan. |
| `tools/ELEVENLABS.md` | Kunci API tidak pernah ada di repo ini, di chat, atau di memori. |
| `tools/cookbook.py` | Alat cookbook motion-graphic (Two-Tier Domain Packs): CATALOG/POLA/SFX, resolver kartu, validasi token & skema. |
| `tools/doctor.sh` | Cek apakah Claude Code dan Codex memuat skill-development dengan benar. Boleh dijalankan di awal sesi (AGENTS.md). |
| `tools/engineering-stack.sh` | Pasang tumpukan skill engineering terkurasi (idempoten). |
| `tools/peta.py` | Tulis PETA.md: peta repo supaya model membuka hanya file yang dibutuhkan. |
| `tools/sumber_cek.py` | Tolak tanda sumber dan cerita kegagalan di file instruksi (`claude/skill-steward/references/writing.md` §3, SKILL.md §5). |
| `tools/sync.sh` | ## Tugas video, konten, naskah, storyboard, atau skill -> repo skill-development Folder ini adalah titik masuk remote, jadi aturan video tidak terbaca otomatis. Untuk tugas jenis ini: 1. Baca dulu `{r |
| `tools/sync_lantai.py` | Cek MIGRASI-LANTAI.md terhadap LANTAI.md. |
| `tools/sync_negatif.py` | Jaga daftar NEGATIF tetap sama di semua tempat. |
| `tools/tunggu.sh` | Jalankan pekerjaan panjang (render, frames, Whisper, mix) lepas dari sesi model, lalu tunggu TANPA polling. |

## projects/ (keputusan per video; buka hanya proyekmu sendiri, isinya bukan aturan untuk video lain)

| Proyek | Isi |
|---|---|
| `projects/ai-change-everything/` | STATUS · ai-change-everything ("Pengganti kita sendiri") · mulai dari STATUS.md |
| `projects/bali-digifest-day1/` | STATUS · Recap Day 1–3 · v11 · mulai dari STATUS.md |
| `projects/behindwork-batch-1/` | STATUS · behindwork-batch-1 · mulai dari STATUS.md |
| `projects/builder-trap-r2/` | STATUS · Builder Trap R2 v6 · 16 Nov 2026 · mulai dari STATUS.md |
| `projects/builder-trap-show-your-work/` | Ledger · Builder trap / show your work (cinematic story) |
| `projects/doac-5-klip/` |  |
| `projects/flat-mirip-mirip/` | STATUS · flat-mirip-mirip · mulai dari STATUS.md |
| `projects/jadisatu-60s/` | STATUS — The Gap (Jadisatu) · Remotion · mulai dari STATUS.md |
| `projects/jadisatu-launch/` |  |
| `projects/jadisatu-trojan-v4/` | Keputusan yang diambil sendiri · Trojan v4 |
| `projects/jensen-pain-suffering/` | STATUS jensen-pain-suffering (orkestrasi.md §2, §9) · mulai dari STATUS.md |
| `projects/kegagalan-eps01/` | Kegagalan eps. 01 · status · mulai dari STATUS.md |
| `projects/pengganti-kita-sendiri/` | STATUS: Pengganti Kita Sendiri (@siirfannih) · mulai dari STATUS.md |
| `projects/personal-brand-day-02/` | Ledger · Personal branding, konten kedua challenge |
| `projects/skill-development-journey-20261116/` | STATUS · Skill Development journey (siirfan) · titik lanjut sesi baru · mulai dari STATUS.md |
| `projects/vibedesign-meta-carousel/` | STATUS · vibedesign-meta-carousel · mulai dari STATUS.md |
| `projects/video-perkenalan-20261118/` | DECISIONS · video perkenalan v7 |

## Lain-lain

| File | Isi / kapan dibuka |
|---|---|
| `AGENTS.md` | pintu: invarian, urutan otoritas, tabel rute |
| `steward/` | keadaan perawatan skill: backlog, kotak masuk pelajaran, laporan perubahan; bukan aturan |
| `SUMBER.md, claude/<skill>/SUMBER.md` | asal-usul aturan; bukan instruksi, jangan dibuka saat mengerjakan tugas |
| `experimental/` | alur sampingan yang belum terbukti; bukan aturan |
| `archive/` | skill lama; jangan dimuat |
