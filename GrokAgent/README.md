# GrokAgent

Reference analysis folder produced by **Grok Bot** agent **Maximus** (roles: Creative Director, Sound Designer, Visual Cinematic Storyteller).

| Field | Value |
|---|---|
| Date | 2026-10-30 (Asia/Makassar) |
| Repo role | Reference findings for other AI agents — **not** a skill that overrides Irfan's rules |
| Authority | Irfan's `claude/` skills (especially `claude/motion-graphic/`) always win. Anything here that conflicts is a **proposal awaiting Irfan**, not a new rule. |

## What this folder is

Bedah visual + audio dari lima video referensi motion / cinematic yang dipakai sebagai konteks belajar. Tujuannya: agent lain bisa membawa angka terukur, pola edit, dan konflik dengan aturan repo yang sudah ada — tanpa menebak ulang dari nol.

## How agents should use it

1. Baca file ini, lalu `reference-videos/STYLE-SYNTHESIS.md` untuk ringkasan aturan yang diusulkan.
2. Detail visual per video: `reference-videos/VISUAL-BREAKDOWN.md` (catatan audio di situ bersifat inferensi awal dan **digantikan** oleh `AUDIO-ANALYSIS.md`).
3. Detail audio terukur: `reference-videos/AUDIO-ANALYSIS.md`.
4. Bukti mentah (JSON, transcript, scene cuts): `reference-videos/data/`.
5. Sebelum menerapkan perubahan ke skill, bandingkan dengan `claude/motion-graphic/` dan dokumen proyek di `projects/`. Usulkan revisi ke Irfan; jangan menulis ulang skill dari folder ini tanpa gerbang eval (`EVALS-DESIGN.md`).

## File index

| Path | Isi |
|---|---|
| `README.md` | Folder purpose, authority, index |
| `reference-videos/VISUAL-BREAKDOWN.md` | Timeline visual V1–V5 + pola lintas video |
| `reference-videos/AUDIO-ANALYSIS.md` | Laporan audio terukur (ffmpeg / librosa / pyloudnorm / Whisper) |
| `reference-videos/STYLE-SYNTHESIS.md` | Gabungan style + audio rules, angka, konflik dengan aturan repo |
| `reference-videos/data/json/` | Metrik audio per video + `sync.json` + `all_audio.json` |
| `reference-videos/data/transcripts/` | Transcript Whisper (`.txt` + `.json`) |
| `reference-videos/data/scenes/` | Scene-cut timestamps dan raw scene detect (text only) |

## Source videos (not committed)

MP4 tidak di-commit karena ukuran. Nama sumber:

1. **01 Krea 2 launch**
2. **02 Everything Starts With a Spark**
3. **03 The Next Renaissance**
4. **04 GRII Batam sermon**
5. **05 Energy & The Sun**

## Authority note / proposed rule changes

Temuan di folder ini adalah **reference findings**. Mereka tidak menimpa:

- `claude/motion-graphic/` dan cabang `references/`-nya
- dokumen otoritas di `projects/`
- skill Irfan lain di `claude/`

Proposal yang menunggu keputusan Irfan (detail di `STYLE-SYNTHESIS.md`):

1. Highlight box di belakang teks (muncul di Video 2) vs larangan highlight box di repo.
2. Montase multi-fokus overlapping sengaja chaotic (Video 3/4) vs mandat satu fokus per frame.
3. “Avoid harsh 2–6 kHz”: refs mengukur fraction **0.15–0.29** → usul ceiling **~0.30**, bukan penghapusan band.
4. Sync tolerance **80 ms** (mean ~82% cuts dalam ±80 ms beat/onset); loudness **-14.5 … -12.5 LUFS**; VO pace **2.5–3.7 words/s** → **1–3 words** on screen.
