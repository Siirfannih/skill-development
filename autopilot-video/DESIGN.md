---
status: principle
scope: autopilot-video
how_to_use: "Desain sistem yang belum dikunci sebagai aturan global."
---

# Design doc · Autopilot produksi video

## 1. Riset: rakit, jangan adopsi utuh
Tidak ada sistem siap pakai untuk produksi video motion dengan QC terhadap storyboard dan beberapa model berlangganan. Pola yang dipinjam:

| Sumber | Pola yang diambil |
|---|---|
| Orchestrator agent coding ([daftar Augment, Agu 2026](https://www.augmentcode.com/tools/open-source-agent-orchestrators)): Agent Orchestrator, Bernstein, Claude Squad, Vibe Kanban | Satu tugas = satu folder kerja; reviewer terpisah dari pembuat; verifikasi otomatis sebelum hasil diterima |
| [GitHub Spec Kit](https://developer.microsoft.com/blog/spec-driven-development-spec-kit/) | constitution (skill repo) -> specify (PRD/brief) -> plan (storyboard -> kontrak) -> tasks (per beat) -> implement |
| [BMAD Method](https://github.com/ResourcefulAI/bmad-method) | Dokumen besar dipecah: satu file tugas per beat berisi semua konteks beat itu |
| [OpusClip LLM-as-judge](https://medium.com/opus-engineering/a-scalable-llm-as-a-judge-framework-for-video-quality-evaluation-74612034bd1e) | Rubrik sederhana 0-1-2; anchor set; uji regresi setiap prompt penilai diubah (kesesuaian dengan manusia +-75%) |
| [Co-Director (Google)](https://arxiv.org/html/2604.24842) | Kritikus per tahap; hanya bagian yang ditandai dibuat ulang; maks 3 percobaan; hakim model lemah di kualitas visual -> Irfan tetap gerbang akhir |
| [Rubinlake radar, Mei 2026](https://rubinlake.com/en/technology-radar/ai-and-data-engineering/ignoring-durability-agent-workflows) | Syarat minimum ketahanan: state tersimpan, checkpoint, tugas idempoten, retry terbatas, riwayat eksekusi |

## 2. Arsitektur
```
Irfan gerbang 1 (approve paket) -> contract.json (terkunci) -> Orchestrator (Claude)
  -> per beat: Builder (ChatGPT/Codex atau DeepSeek) -> Render proxy -> Cek mekanis -> Kritikus (Gemini + lensa Irfan) -> Devil's advocate
       gagal / temuan lolos (maks 3 ronde) -> kembali ke Builder
       tanpa temuan -> Beat dikunci (baseline_lock)
  -> Render penuh + cek ulang + laporan pagi -> Irfan gerbang 2
Maximus menyuplai riset/aset yang diminta tugas.
```

| Komponen | Tempat |
|---|---|
| Diskusi, naskah, storyboard, gerbang 1-2 | Mac / HP |
| Orchestrator, builder, render, cek, kritikus, TTS | PC server (`node-c-pc`, Ubuntu, 24 jam) |
| Maximus | Cloud Grok Bot |
| Kontrak, tugas, log, laporan | Repo + `projects/<proyek>/` |

Struktur proyek: `contract.json`, `refs/` (+ catatan ambil/jangan), `tasks/B01.md...`, `runs/<waktu>/`, `locks/`, `decisions.log`, `STATUS.md`, `REPORT.md`.

## 3. Kontrak dan gerbang kualitas
- `contract.json` dibuat dari storyboard (spec beat §15 `motion-graphic/references/storyboard.md`) setelah gerbang 1, dikunci hash. Hanya Irfan yang bisa mengubah. Contoh: `templates/contract.example.json`.
- Per beat: jendela VO, kata pemicu, teks layar persis, kode G/T/C/X, subjek, SFX + waktu, referensi + "ambil/jangan", `lulus_bila`.
- Empat lapis, berurutan:
  1. **Cek mekanis** (script): teks muncul tepat waktu (OCR, belum terpasang), cut di batas beat, onset SFX, kontras, layout (§16.7), jeda VO, loudness (-14 LUFS), kejelasan VO (Whisper WER), `compare.py`, `baseline_lock.py`.
  2. **Kritikus video** (Gemini lewat `agy`): rubrik R1-R7 + kompas premium, tanpa konteks pembuatan.
  3. **Kritikus frame + lensa Irfan** (Claude): frame vs referensi (gerbang R6) + "masukan apa yang akan Irfan beri?" dari ledger/RETRO.
  4. **Devil's advocate** (§2a `working-with-irfan`) atas setiap temuan sebelum dikirim ke builder.
- Kontrak menang atas semua penilai; cek mekanis gagal tidak bisa diluluskan kritikus.

## 4. Pembagian model (hemat kuota Claude)
| Peran | Model | Boleh | Tidak boleh |
|---|---|---|---|
| Orchestrator | Claude | Pecah tugas, rute, devil's advocate, laporan, QC still (6-8 per video) | Membangun, mengubah kontrak |
| Builder kit/komponen | ChatGPT/Codex (`tools/gpt-bridge`) | Kode, gambar, kit visual | Menyentuh beat lain/kontrak |
| Builder per video | DeepSeek di PC | Mengisi konfigurasi adegan dari kit | Merancang komponen baru (naik ke Claude/GPT) |
| Render, TTS, mix | Script di PC | — | — |
| Kritikus video | Gemini | Menilai | Memberi perintah langsung ke builder |
| Riset/aset | Maximus | Yang diminta tugas | Riset bebas |

Aturan anti-melenceng: satu sumber kebenaran (kontrak + file tugas beat); perbaikan wajib menyebut ID beat + ID temuan; beat lulus dikunci; maks 3 ronde, gagal 2x di butir sama = ganti pendekatan; keputusan di luar kontrak pakai default + `decisions.log`; temuan kritikus yang gagal devil's advocate dibuang.

## 5. Gaya visual yang sudah dikunci untuk video edukasi/explainer
- Tanpa latar putih; gambar full-bleed; langsung zoom ke objek; objek dibelah sampai bagian dalamnya terlihat (masukan Irfan 27 Okt).
- Ganti shot +-2 dtk; X merah di atas miskonsepsi; shot lebar hanya untuk ukuran (penggaris + badge peringatan). Dari bedah referensi Insinyur Dadakan (3,5 jt views).
- Opsi berikutnya: 3D prosedural lewat kode (`@remotion/three`) dengan kit komponen per niche (lihat ADR-9).

## 6. Mode gagal dan mitigasi
| Mode gagal | Mitigasi |
|---|---|
| Lulus kontrak, kurang rasa | Lensa Irfan + anchor set; setiap penolakan jadi kasus uji |
| Storyboard samar | Validator kontrak menolak beat tanpa kode G/T/C/X, teks persis, SFX |
| Kritikus salah/terlalu keras | Devil's advocate + batas ronde + kontrak menang |
| Perbaikan merusak beat lain | `baseline_lock.py` |
| Builder memperkenalkan regresi | Loop QC berikutnya (terjadi di pilot r1) |
| Disk penuh / Chrome crash | Render di PC; render per potongan 300 frame (`tools/render/render_chunks.sh`) |
| Kuota habis | Runner menjeda jalur, catat di laporan |
| Biaya kredit | TTS lokal (`tools/voice`); audio hanya setelah gerbang 1 |
