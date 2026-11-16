# PETA repo skill-development

Dibuat oleh `tools/peta.py` dari isi file; jangan diedit tangan (ubah RUTE di skrip itu). Tujuannya: model membuka hanya file yang dibutuhkan pekerjaan. Bila file berubah, jalankan `python3 tools/peta.py`; `tools/doctor.sh` menandai peta yang basi.

## Rute: pekerjaan → buka ini (urut, berhenti bila cukup)

| Pekerjaan | Buka | Jangan buka |
|---|---|---|
| Awal sesi apa pun | `AGENTS.md` → `PETA.md` (file ini) → `PENDING.md` | seluruh `references/` sekaligus |
| Video apa pun | `claude/motion-graphic/SKILL.md` (Lantai termuat di dalamnya) → `projects/<proyek>/STATUS.md` | skill di `archive/` |
| Fase 1 pra-produksi: script, bedah referensi, storyboard | `claude/motion-graphic/references/storyboard.md`, `claude/motion-graphic/pustaka/PETA.md` → satu kartu kiblat, `claude/script-workshop/SKILL.md` | `audio.md`, `build.md` |
| Fase 2 suara: potong, ekor kata, level | `claude/motion-graphic/references/audio.md` §14.0C–14.0D, §14.6, `scripts/gate/cut_check.py`, `scripts/audio/recut.py`, `scripts/gate/voice_level.py` | tipografi, kamera |
| Fase 3 visual: teks/KT, kamera, kurva, lapisan lego | `claude/motion-graphic/references/typography.md` §8a, `claude/motion-graphic/references/build.md` (Rakit lego), `scripts/lego/teks_plan.py` → `kt_check.py`, `scripts/remotion/curves.ts`, `TeksBlok.tsx`, `LightSweep.tsx`, `claude/motion-graphic/references/camera-transition.md` | audio |
| Fase 4 SFX lalu musik | `claude/motion-graphic/guide/sfx/GUIDE.md`, `claude/motion-graphic/guide/sfx/SFXIRFAN.md`, `claude/motion-graphic/references/audio.md` §14.3–14.9, `scripts/gate/sfx_density.py`, `claude/motion-graphic/guide/audio/GUIDE.md` | tipografi |
| Fase 5 finishing: mix, QA, render sekali | `claude/motion-graphic/references/delivery-gate.md`, `scripts/juri/render.sh` (`lego` untuk video berfootage), `scripts/juri/frame_audit.py` | storyboard |
| Revisi dari Irfan | `claude/motion-graphic/references/revision-log.md`, `projects/<proyek>/DECISIONS.md`, `scripts/baseline_lock.py` | menulis ulang dari nol |
| Orkestrasi subagen / model lain | `claude/motion-graphic/references/orkestrasi.md`, `claude/motion-graphic/templates/handoff-fase.md` | — |
| Tulisan konten (caption, hook, carousel) | `claude/script-workshop/SKILL.md` | skill video |
| Proyek dengan PRD/QUEUE | `claude/autopilot-prd/SKILL.md` | — |
| Mengubah skill | `AGENTS.md` §Akhir sesi, `EVALS-DESIGN.md`, `claude/motion-graphic/pustaka/README.md` §Tumbuh, lalu `python3 tools/peta.py` | — |

## Skill aktif (`claude/`)

| Skill | Pakai saat |
|---|---|
| `claude/autopilot-prd/SKILL.md` | Pakai setiap kali mengerjakan proyek Irfan yang sudah punya PRD, QUEUE, atau rencana tertulis (Pandu/Tuntunly, Hermes, Jadisatu). Eksekusi sampai antrean habis tanpa menunggu "lanjutkan"; berhenti hanya di Tier 2. Mengal |
| `claude/cinedance-block-library/SKILL.md` | CINEDANCE — BLOCK LIBRARY v1. Assembles a full video-generation prompt from a short brief (TRICK, FORMAT, ASSETS, MAIN, FAIL, COUNT, TASK, ACTING) plus a list of block codes (FACE, BODY, MODEST, TASK, CAM-HANDHELD, CAM-L |
| `claude/irfan-creative-workflow/SKILL.md` | Workflow and hard-won lessons for any creative project with Irfan (launch videos, motion graphics, scripts, campaigns): gate order, script quality bar, credit discipline, and what experience to carry vs leave behind. Use |
| `claude/jadisatu-canvas/SKILL.md` | Use when an AI client connects to, reads, edits, or resumes a shared Jadisatu Canvas board, including uploaded references, room resets and stale-context conflicts. |
| `claude/jadisatu-narrator-vo/SKILL.md` | Pengaturan VO narator Inggris Jadisatu yang sudah disetujui Irfan (suara, model, cara baca, cara merakit). Pakai setiap kali membuat voiceover marketing/promo Jadisatu dalam bahasa Inggris. |
| `claude/motion-graphic/SKILL.md` | Directs and builds Irfan's motion graphic videos (Jadisatu, Tuntunly, siirfan content) from brief to render — persona, gated workflow, core rules, an always-on quality floor (LANTAI), a reference library with one chosen  |
| `claude/script-workshop/SKILL.md` | Menulis konten Irfan dari ide sampai naskah siap take: script reels/video, carousel, caption, thread, ideasi, dan hook, untuk Jadisatu maupun akun pribadinya. Pakai setiap kali Irfan minta ide konten, hook, naskah, carou |
| `claude/working-with-irfan/SKILL.md` | Cara bekerja dengan Irfan — cara memahami permintaannya, bertanya, meneliti bahan, membuat skill/prompt, dan menyampaikan hasil. Pakai di setiap tugas dari Irfan sebelum menghasilkan output. |

## motion-graphic · inti

| File | Isi / kapan dibuka |
|---|---|
| `claude/motion-graphic/LANTAI.md` | **LANTAI: mutu yang berlaku di semua video** — Lantai menentukan mutu; kiblat (kartu di pustaka/) menentukan gaya. |
| `claude/motion-graphic/RETRO.md` | **RETRO · catatan pelajaran per gerbang** — Format dan aturan: lihat MOTION-SYSTEM.md §8. |
| `claude/motion-graphic/pustaka/PETA.md` | **PETA pustaka referensi** — Semua video di sini adalah standar kualitas Irfan: target yang harus dicapai, dan nilainya setara. |
| `claude/motion-graphic/pustaka/README.md` | **Pustaka: cara memakai referensi** — Tujuan repo ini menaikkan mutu hasil dari prompt Irfan, bukan menyediakan template. |

## motion-graphic · references (cabang; dibuka saat SKILL.md atau RUTE menyuruh)

| File | Isi / kapan dibuka |
|---|---|
| `claude/motion-graphic/references/analysis-qa.md` | **Analysis & QA — bedah referensi dan gerbang kirim** — Baca saat membedah referensi (gerbang 3) dan sebelum mengirim render (gerbang 11). |
| `claude/motion-graphic/references/audio.md` | **Audio — VO, SFX, musik** — Baca hanya di gerbang audio (setelah script dan storyboard final) dan saat QA audio. |
| `claude/motion-graphic/references/build.md` | **Build — After Effects & engine kode** — Baca saat mulai build atau menulis ExtendScript/expression. |
| `claude/motion-graphic/references/camera-transition.md` | **Camera & transition** — Baca saat memilih gerak kamera (C) dan transisi (X) per potongan. |
| `claude/motion-graphic/references/copywriting.md` | **Copywriting — script VO dan teks layar** — Baca di gerbang 2 (script) dan setiap kali menulis teks yang tampil di layar. |
| `claude/motion-graphic/references/core-rules.md` | **Aturan inti lengkap (teks penuh)** — SKILL.md memuat LANTAI.md (mutu yang selalu berlaku) dan indeks bertingkat (Hard Gate / Purpose-Gate / Quality Lock) dengan satu baris per aturan. |
| `claude/motion-graphic/references/decision-guide.md` | **Panduan keputusan: teks, visual, kotak, warna (logika, bukan contoh)** — Dibaca di gerbang storyboard (4) dan QA (9). |
| `claude/motion-graphic/references/decision.md` | **Decision — memilih, memutuskan, dan kapan bertanya** — Baca saat harus memilih di antara beberapa pilihan (family, gaya teks, teknik, transisi), saat dua aturan terasa bertabrakan, atau saat ragu apakah perlu bertanya ke Irfan. |
| `claude/motion-graphic/references/delivery-gate.md` | **Delivery Gate (wajib sebelum video ditunjukkan ke Irfan)** — Laporan PASS/FAIL ini dikirim bersama video. |
| `claude/motion-graphic/references/direction.md` | **Direction — prinsip sutradara, family visual, elemen, warna** — Baca saat menentukan apa yang terjadi di setiap beat: tokoh, subjek, metafora, family visual, palet. |
| `claude/motion-graphic/references/hybrid-motion-standard.md` | **Standar Hybrid Motion (barrier minimum, bukan nilai absolut)** — Diekstrak Irfan (1 Nov 2026) dari video referensi yang selama ini jadi acuan (GrokAgent/reference-videos/). |
| `claude/motion-graphic/references/motion-mechanics.md` | **Mekanik gerak: kamera, transisi, cutout (logika dan cara kerja)** — Dibaca saat memilih gerak kamera atau transisi, bersama camera-transition.md. |
| `claude/motion-graphic/references/orkestrasi.md` | **Orkestrasi: kamu memimpin, model lain yang mengulang** — Baca file ini sampai habis sebelum mengerjakan build, render, atau QC video. |
| `claude/motion-graphic/references/pacing-map.md` | **Peta nada → gerak (dari transkrip + audio)** — Dibaca di gerbang storyboard (4), sebelum motion-mechanics.md. |
| `claude/motion-graphic/references/palette.md` | **Palet: cara memilih dan memakai warna** — Dibaca di gerbang brief (1) saat mengunci palet, dan di QA (9). |
| `claude/motion-graphic/references/revision-log.md` | **Revision log & RETRO** — Baca saat Irfan memberi revisi: catat dulu, baru kerjakan. |
| `claude/motion-graphic/references/roles.md` | **Dua peran: Sutradara dan Editor (layer komunikasi)** — Dibaca di gerbang 0 setiap pekerjaan video. |
| `claude/motion-graphic/references/slop-catalog.md` | **Katalog slop (tanda yang pernah Irfan tolak)** — Dipakai untuk memindai, bukan melarang teknik. |
| `claude/motion-graphic/references/smooth-motion.md` | **Smooth motion — resep motion blur, teks, dan kamera yang terbukti** — Baca saat membangun animasi teks, mengatur motion blur, atau saat Irfan bilang gerak "kurang smooth", "patah-patah", atau "kamera berantakan". |
| `claude/motion-graphic/references/storyboard.md` | **Storyboard visual: dari script atau daftar potongan ke papan panel** — Baca di gerbang 4–5. Storyboard adalah gerbang review termurah: satu panel diperbaiki dalam menit, satu render dalam jam. |
| `claude/motion-graphic/references/three-segment-gate.md` | **Gerbang 3 Segmen (Irfan, 2 Nov 2026 06.48)** — Claude tidak melihat video saat menulis kode. |
| `claude/motion-graphic/references/typography.md` | **Typography & kinetic text** — Baca saat memilih gaya teks, ukuran, dan teknik T, atau mengatur easing. |

## motion-graphic · guide (rasa per urusan)

| File | Isi / kapan dibuka |
|---|---|
| `claude/motion-graphic/guide/audio/GUIDE.md` | **Audio: musik ikut suasana video** — Tujuan. Musik terasa satu tubuh dengan video. |
| `claude/motion-graphic/guide/gerak/GUIDE.md` | **Gerak: smooth, tidak kaku, cutout rapi** — Tujuan. Setiap perpindahan terasa punya arah dan alasan; tidak ada yang "nongol" atau patah. |
| `claude/motion-graphic/guide/hindari/GUIDE.md` | **Hindari (cek akhir)** — Ini daftar pindai, bukan larangan teknik. |
| `claude/motion-graphic/guide/referensi/18-arthur-brooks-ukuran.md` | **Kartu 18 · Tambahan ukuran: proporsi teks, skala subjek, kedalaman** — Sumber: ~/work/_downloads/g9xoKm5DEeU/video.mp4 (1280×720, 30 fps), 17:56–18:53, frame tiap 0,5 dtk (114 frame, frames/f_NNN.jpg; ts = 17:56 + (NNN−1)×0,5 dtk). |
| `claude/motion-graphic/guide/referensi/README.md` | **Video referensi Irfan (catatan ukur)** — > Peta dan kartu anatomi tiap referensi sekarang di ../../pustaka/PETA.md dan ../../pustaka/kartu/. |
| `claude/motion-graphic/guide/referensi/baikov.md` | **07 Baikov / Shapes: format product film & onboarding** — Disalin dari Siirfannih/jadisatu-skills skills/jadisatu-motion/references/BAIKOV.md (bedah seluruh 2010 frame, Okt 2026); bagian IHSG di sana khusus proyek lain. |
| `claude/motion-graphic/guide/referensi/ganimate.md` | **17 _ganimate_ · "Editorial Explainer System": guideline editing** — > Dibedah Claude 9 Nov dari video kiriman Irfan (contact sheet di sheets/, scene detect ffmpeg, ebur128, spektrogram + onset librosa). |
| `claude/motion-graphic/guide/referensi/jefferson-fisher.md` | **15 jefferson_fisher · "Card Caption Clean": guideline editing** — > Dibedah Claude 9 Nov dari video kiriman Irfan (contact sheet di sheets/, scene detect ffmpeg, ebur128, spektrogram + onset librosa). |
| `claude/motion-graphic/guide/referensi/joseph-arthur-brooks.md` | **18 Joseph (Ultimate Editors) · gaya "minimal premium" Arthur Brooks + cara melatih Claude** — > Dibedah Claude 11 Nov dari video kiriman Irfan: YouTube g9xoKm5DEeU "How to Edit VIRAL Talking Head Videos Using ONLY Claude" (Joseph, 20:57). |
| `claude/motion-graphic/guide/referensi/markbrazil.md` | **16 markbrazil · "Noir Stage Podcast": guideline editing** — > Dibedah Claude 9 Nov dari video kiriman Irfan (contact sheet di sheets/, scene detect ffmpeg, ebur128, spektrogram + onset librosa). |
| `claude/motion-graphic/guide/referensi/pedro-andradeok.md` | **14 pedro.andradeok · "Grid Cut Editorial": guideline editing** — > Dibedah Claude 9 Nov dari video kiriman Irfan (contact sheet di sheets/, scene detect ffmpeg, ebur128, spektrogram + onset librosa). |
| `claude/motion-graphic/guide/sfx/GUIDE.md` | **SFX: satu bunyi untuk setiap objek/visual penting, bukan untuk setiap kata** — Tujuan. Setiap objek atau visual yang muncul/bergerak dan penting bagi cerita (kartu, ikon, transisi, gerak kamera, kata slam) punya satu bunyi sesuai peruntukannya, dan bunyi yang sama selalu berarti hal yang sama. |
| `claude/motion-graphic/guide/sfx/SFXIRFAN.md` | **Katalog `~/sfx/SFXIrfan` (didengar 13 Nov dengan `earshot describe`)** — Sumber pertama untuk SFX (aturan 43), bukan allowlist. |
| `claude/motion-graphic/guide/teks/GUIDE.md` | **Teks: sedikit kata, maks 2 baris, tidak bertumpuk** — Tujuan. Teks membantu menangkap kalimat, bukan dibaca seperti artikel. |
| `claude/motion-graphic/guide/visual/GUIDE.md` | **Visual: rapi, tersusun, hierarki terbaca** — Tujuan. Dalam setengah detik mata tahu: ini yang utama, itu pendukung. |

## motion-graphic · templates

| File | Isi / kapan dibuka |
|---|---|
| `claude/motion-graphic/templates/gaya/README.md` | **Template gaya** — Satu folder = satu gaya edit yang bisa dipilih di gerbang 1. |
| `claude/motion-graphic/templates/gaya/editorial-bold/STYLE.md` | **Gaya: editorial-bold (talking head cepat)** — Template gaya untuk reel talking head yang cepat dan tegas: Anton besar, aksen merah, B-roll hitam-putih, split screen, transisi kamera. |
| `claude/motion-graphic/templates/gaya/minimal-premium/STYLE.md` | **Gaya: minimal-premium (talking head edukatif)** — Template gaya untuk klip podcast/talking head yang tenang dan "mahal": wajah pembicara bergantian dengan adegan bertekstur kertas (lukisan, garis biru, ilustrasi kasar, grafik bercahaya). |
| `claude/motion-graphic/templates/handoff-fase.md` | **Handoff fase <n> · <proyek> · <tanggal>** — Kamu subagen untuk satu fase saja. |
| `claude/motion-graphic/templates/roles/editor.md` | **Prompt Editor (diisi Sutradara, dikirim lewat Agent / SendMessage)** — Ganti <…>. Jangan menambah cerita proses, pendapat, atau kutipan chat Irfan; Editor hanya perlu fakta, keputusan, dan tugas (roles.md §1). |
| `claude/motion-graphic/templates/roles/handoff.md` | **Kerangka folder `handoff/`** — Salin bagian yang dibutuhkan ke projects/<proyek>/handoff/. |
| `claude/motion-graphic/templates/roles/pemeriksa-frame.md` | **Pemeriksa frame (satu agen per potongan ≤ 10 dtk)** — Dipanggil Sutradara setelah render.sh <proyek> frames dan scripts/juri/frame_audit.py. |

## motion-graphic · skrip (alat dan gerbang)

| File | Isi / kapan dibuka |
|---|---|
| `claude/motion-graphic/scripts/audio_qa.py` | Audio QA gate — ukur mix video sendiri dan referensi dengan definisi yang SAMA. |
| `claude/motion-graphic/scripts/baseline_lock.py` | Kunci adegan yang sudah disetujui Irfan sebagai frame baseline, lalu gagalkan render yang mengubahnya. |
| `claude/motion-graphic/scripts/bedah-kamera.py` | Bedah gerak kamera dari video jadi: transform kemiripan antar-frame (ORB + RANSAC) → zoom, geser, putar per frame. |
| `claude/motion-graphic/scripts/palette_check.py` | QC palet: hitung keluarga warna aksen di sebuah render. Gagal bila keluarga > 2, atau keluarga terbesar < 70 % piksel vivid (tidak ada warna dominan). |
| `claude/motion-graphic/scripts/audio/audio_phone.py` | v16 audio QA (Irfan 18:52): does every SFX survive a phone speaker at 20 / 50 / 100 % volume, is the VO always clear, and is any SFX harsh (2–6 kHz)? Uses render/mix.wav + stems + render/cues.json. |
| `claude/motion-graphic/scripts/audio/ears.py` | Telinga gabungan: earshot = skor pertama, lalu dicek ukuran independen (audio.md §14.0B, Irfan 8 Nov). |
| `claude/motion-graphic/scripts/audio/el_music.py` | v15 score: one continuous ElevenLabs Music composition whose sections are timed to the VO acts (vo.json). Usage: python3 tools/el_music.py <out.mp3> [plan.json] — key read from .el_key (never printed) |
| `claude/motion-graphic/scripts/audio/el_sfx.py` | v15: real SFX from ElevenLabs sound generation for the kinds that were code-synthesized (Irfan 17:52). Warm / thock / no ear-fatigue brief baked into every prompt. Writes sfx/el/<kind>_<n>.mp3. Key fr |
| `claude/motion-graphic/scripts/audio/env.py` |  |
| `claude/motion-graphic/scripts/audio/music_check.py` | Check a generated score against the act plan: duration, loudness per section, energy jump at boundaries. |
| `claude/motion-graphic/scripts/audio/music_fit.py` | Seleksi musik terukur: kandidat diukur dan diberi peringkat terhadap kategori suasana + suara video. |
| `claude/motion-graphic/scripts/audio/pace_read.py` | Baca tempo video lalu usulkan kategori suasana untuk audio (aturan 45). |
| `claude/motion-graphic/scripts/audio/recut.py` | Terapkan rentang buang ke suara + video wajah (sinkron bibir) dan buat peta waktu lama -> baru (Irfan 15 Nov). |
| `claude/motion-graphic/scripts/audio/sfx_comfort.py` | v17 (Irfan 19:20: some SFX feel rough/kasar). Comfort scorecard for SFX files: hiss = share of energy above 6 kHz (desis) bite = share in 2–6 kHz (where harshness lives) rough = envelope modulation 30 |
| `claude/motion-graphic/scripts/audio/sfx_profile.py` | Profil SFX referensi: dari stem no_vocals (demucs) cari transien, ukur level relatif VO, durasi, pita, kelas kasar. Pakai: python3 sfx_profile.py <nama> [<nama> ...] (membaca sep/htdemucs/<nama>/{voca |
| `claude/motion-graphic/scripts/audio/sync_cues.py` | v18 (Irfan 19:33): SFX must land WITH the object — not before it appears, not after — and not pile up. For every cue in render/cues.json, look at the picture around it (cells of an 8×6 grid, so a smal |
| `claude/motion-graphic/scripts/audio/tighten.py` | v14 finishing: shorten the video by tightening the VO — never by cutting speech. 1. tempo: TEMPO is locked at 1.0; the VO is never sped up (Irfan 6 Nov). Only pauses are tightened. 2. pauses: every qu |
| `claude/motion-graphic/scripts/audio/visual_coverage.py` | v16 (Irfan: every object, visual and text gets its own sound, no exceptions). Finds visual events in the rendered picture (frame-difference onsets: something appears, moves off, cuts, lands) and check |
| `claude/motion-graphic/scripts/audio/vo_echo.py` | Cek gema VO (audio.md §14.10): energi ekor 40-150 ms setelah akhir kata, relatif ke level kata. |
| `claude/motion-graphic/scripts/audio/vo_gaps.py` | List every silent run in the assembled VO (from vo.json chunk starts + trim wavs). usage: vo_gaps.py vo.json vodir |
| `claude/motion-graphic/scripts/gate/audio_order.py` | Gerbang urutan sound design: tiap lapisan audio dikunci berurutan ke lapisan sebelumnya (Irfan 8 Nov). |
| `claude/motion-graphic/scripts/gate/caption_lines.py` | Hitung jumlah baris caption di render. Gagal bila ada caption > 2 baris (aturan 44, Irfan 9 Nov) atau terpotong di tepi. |
| `claude/motion-graphic/scripts/gate/cut_check.py` | Gerbang potongan suara (gerbang 6, Lantai E23; Irfan 15 Nov): sebelum suara dikunci, potongan harus bersih dari kata sampah dan diam saat pembicara berpikir — termasuk diam yang ditelan transkrip ke d |
| `claude/motion-graphic/scripts/gate/music_batch.py` | Gerbang: satu track musik tidak boleh dipakai untuk semua klip/babak dalam satu batch (Irfan 8 Nov). Gagal pertama: V5 8 Nov, tiga klip podcast memakai Mixkit #22 "Piano Reflections" yang sama. |
| `claude/motion-graphic/scripts/gate/pause_clean.py` | Gerbang jeda bersih (Lantai E23, Irfan 13 Nov): saat pembicara berhenti/berpikir, stem suara tidak membawa dengung kamar, piring, klik, atau room tone kotor yang ikut dikeraskan. |
| `claude/motion-graphic/scripts/gate/sfx_density.py` | Gerbang aturan 43 (Irfan 13 Nov): SFX menandai momen cerita dan gerak yang terlihat, kepadatan dari kiblat, tanpa bunyi per kata dan tanpa spam. Hening yang disengaja boleh. |
| `claude/motion-graphic/scripts/gate/voice_fidelity.py` | Gerbang suara asli pembicara (format klip podcast/wawancara). |
| `claude/motion-graphic/scripts/gate/voice_level.py` | Gerbang level suara asli (Lantai E23; Irfan 16 Nov): suara asli (narasumber, rekaman sendiri, VO) tidak pernah diturunkan, di-loudness-kan, atau di-limit. Yang boleh: peredam noise, lalu gain NAIK yan |
| `claude/motion-graphic/scripts/juri/audio_bus_check.py` | Audio di Remotion hanya lewat satu bus global (Irfan 16 Nov). <Audio> yang ditaruh di dalam <Sequence> adegan ikut berhenti saat adegan selesai, sehingga ekor kata/SFX/musik terpotong di setiap batas  |
| `claude/motion-graphic/scripts/juri/balance_check.py` | Juri keseimbangan visual per frame (Lantai C17, Irfan 15 Nov). Dijalankan pada still SEBELUM render penuh. |
| `claude/motion-graphic/scripts/juri/frame_audit.py` | Audit SEMUA frame sebelum render MP4 (Irfan 15 Nov): tanpa sampling, video dipecah per <=10 dtk, tiap potongan diperiksa per detik (30 frame) oleh agen lain (subagen/model lain), mencakup visual, audi |
| `claude/motion-graphic/scripts/juri/motion_lint.py` | Gerak dirancang per gerak, bukan preset (Lantai B13a; Irfan 16 Nov; diadaptasi dari motion-kit, MIT). |
| `claude/motion-graphic/scripts/juri/render.sh` | Satu pintu render Remotion: still dulu, draft kecil, render penuh paling akhir (LANTAI F26). |
| `claude/motion-graphic/scripts/juri/resep_check.py` | Cek RESEP.md sebelum build: 8 bagian terisi, tiga pengikat dari SATU sumber, kartu kiblat ada. |
| `claude/motion-graphic/scripts/juri/sandingkan.py` | Lembar sanding: still kita di kiri, frame kiblat di kanan, supaya selisihnya terlihat sebelum render penuh. |
| `claude/motion-graphic/scripts/juri/teks_cek.py` | Cek teks di still per beat (LANTAI A1-A4, A7): bukan subtitle film, tidak ganda, tidak menyentuh tepi. |
| `claude/motion-graphic/scripts/lego/compose.py` | Rakit video seperti lego (Irfan 16 Nov): footage dasar + lapisan (teks/KT, visual, overlay) yang sudah dirender TERPISAH dan disimpan di cache digabung SEKALI dengan ffmpeg. Lapisan yang tidak berubah |
| `claude/motion-graphic/scripts/lego/kt_check.py` | Gerbang tipografi kinetik (Lantai A9a; Irfan 16 Nov: "animasi KT selalu sama, hampir semuanya fade"). |
| `claude/motion-graphic/scripts/lego/lapisan.py` | Render lapisan lego satu per satu dengan cache (Irfan 16 Nov). Hanya lapisan yang berubah yang dirender ulang. |
| `claude/motion-graphic/scripts/lego/teks_plan.py` | Kerangka teks.json dari transkrip (Irfan 16 Nov): isi teks KT/subtitle sudah pasti = ucapan, jadi yang dihitung mesin hanya WAKTU dan DURASI tiap blok. Peran, kode gerak (T..), gaya (G..), posisi, dan |
| `claude/motion-graphic/scripts/remotion/LightSweep.tsx` | LightSweep.tsx — gaya G8 "kilat cahaya" (typography.md §7.5; Irfan 16 Nov, ref siirfannih_DfRh4w0SfAk "Golden rule"). |
| `claude/motion-graphic/scripts/remotion/SmoothAudioClip.tsx` | SmoothAudioClip.tsx — audio motion-graphic §14.7 (Modul 2, audit 31 Okt 2026). |
| `claude/motion-graphic/scripts/remotion/TeksBlok.tsx` | TeksBlok.tsx — satu blok teks KT sebagai lapisan lego ber-alpha (Lantai A9a, F26; Irfan 16 Nov). |
| `claude/motion-graphic/scripts/remotion/curves.ts` | curves.ts — gerak dirancang per gerak, bukan preset (Lantai B13a, 16 Nov 2026). |
| `claude/motion-graphic/scripts/storyboard/board.py` | Storyboard visual: render panel HTML -> PNG, susun papan (pola kanvas Wonder), lalu periksa (Irfan 8 Nov). |

## tools/ (perawatan repo)

| File | Isi / kapan dibuka |
|---|---|
| `tools/ELEVENLABS.md` | Kunci API tidak pernah ada di repo ini, di chat, atau di memori. |
| `tools/doctor.sh` | Cek apakah Claude Code dan Codex memuat skill-development dengan benar. Dijalankan di "Awal sesi" (AGENTS.md). |
| `tools/peta.py` | Tulis PETA.md: peta repo supaya model membuka hanya file yang dibutuhkan (Irfan 16 Nov). |
| `tools/sync.sh` | ## Tugas video, konten, naskah, storyboard, atau skill -> repo skill-development Folder ini adalah titik masuk remote, jadi aturan video tidak terbaca otomatis. Untuk tugas jenis ini: 1. Baca dulu `{r |
| `tools/sync_lantai.py` | Salin isi claude/motion-graphic/LANTAI.md ke dalam SKILL.md (di antara penanda LANTAI), supaya lantai ikut termuat setiap kali skill dimuat. Sumber kebenaran: LANTAI.md. Jalankan setelah mengubah LANT |

## projects/ (keputusan per video; hanya untuk proyek itu)

| Proyek | Isi |
|---|---|
| `projects/ai-change-everything/` | STATUS · ai-change-everything ("Pengganti kita sendiri") · mulai dari STATUS.md |
| `projects/bali-digifest-day1/` | DECISIONS · Bali Digifest 2026 Day 1 (60 dtk) |
| `projects/builder-trap-r2/` | STATUS · builder-trap-r2 (diperbarui 15 Nov 22.40) · mulai dari STATUS.md |
| `projects/builder-trap-show-your-work/` | Ledger · Builder trap / show your work (cinematic story) |
| `projects/doac-5-klip/` |  |
| `projects/jadisatu-60s/` | STATUS — The Gap (Jadisatu) · Remotion · mulai dari STATUS.md |
| `projects/jadisatu-launch/` |  |
| `projects/jadisatu-trojan-v4/` | Keputusan yang diambil sendiri · Trojan v4 (mandat jalan otomatis, Irfan 7 Nov) |
| `projects/jensen-pain-suffering/` | STATUS jensen-pain-suffering (orkestrasi.md §2, §9) · mulai dari STATUS.md |
| `projects/pengganti-kita-sendiri/` | STATUS: Pengganti Kita Sendiri (@siirfannih) · mulai dari STATUS.md |
| `projects/personal-brand-day-02/` | Ledger · Personal branding, konten kedua challenge |

## Lain-lain

| File | Isi / kapan dibuka |
|---|---|
| `INDEX.md` | katalog skill dan folder |
| `AGENTS.md` | aturan awal/akhir sesi untuk semua model |
| `PENDING.md` | pelajaran yang belum disetujui; bukan aturan |
| `EVALS-DESIGN.md` | cara menguji perubahan skill |
| `experimental/` | alur sampingan yang belum terbukti; bukan aturan |
| `archive/` | skill lama; jangan dimuat |
