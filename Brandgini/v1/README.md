# Soalnya Gini Studio — 24/7 Autonomous Production Skill System

Arsitektur sistem skill modular untuk produksi video Shorts & Reels (**45–60 detik, 1080×1920 @ 30fps**) secara **otomatis penuh dalam siklus 1 hari** di Ubuntu Server 24 jam, sehingga Irfan hanya melakukan *async review* saat ada waktu luang.

## Pembeda Utama (Dual-Style Signature)
Untuk membedakan diri dari seluruh channel explainer Indonesia, pipeline ini menggabungkan dua gaya visual kelas internasional:
1. **Style A — Einstein Editorial / Surreal Collage** (`04-style-a-einstein-editorial`): Kanvas periwinkle/indigo halftone bertekstur, potongan foto B&W dengan bayangan lembut, aksen piksel retro & panah orbit putus-putus, serta tipografi editorial *spatial-wrap* (bukan subtitle kotak biasa). Cocok untuk topik **cara kerja, sains, ekonomi, psikologi, & mitos**.
2. **Style B — Vox Investigative Documentary** (`05-style-b-vox-documentary`): Tekstur arsip taktil (blueprint grid, kertas grafik, papan gelap, kayu), guntingan koran dengan *yellow highlighter sweep* & lingkaran merah spidol, polaroid drop, kamera *push-in* 3D, dan *film grain*. Cocok untuk topik **fakta mengejutkan, sejarah benda, uang, & sistem di balik layar**.

## Siklus Produksi 1 Hari (Autonomous 24/7 Queue)
| Jam Server (WITA) | Tahap | Skill & Worker | Output Kontrak |
| :--- | :--- | :--- | :--- |
| `00:00 – 01:00` | 1. Riset & Fact-Check | `01-sg-topic-factcheck` (Manda) | `episodes/epXX/fakta.md` |
| `01:00 – 02:30` | 2. Naskah & Shotlist | `02-sg-script-director` (Claude Sonnet) | `script.md` + `shotlist.json` |
| `02:30 – 03:00` | 3. Voiceover & Timing | `03-sg-voice-align` (Gemini TTS / ElevenLabs + Whisper) | `vo.wav` + `words.json` |
| `03:00 – 06:00` | 4. Build & Render | `06-sg-scene-composer` + Style A/B (Codex/Sonnet + Remotion) | `Scene.tsx` + `render.mp4` |
| `06:00 – 07:00` | 5. Auto QC & Audit | `07-sg-qc-auditor` (`run_qc.sh` + Gemini 6-Frame Audit) | `qc-report.json` + 6 PNG |
| *Async (Irfan)* | 6. Review & Upload | Antrean `ready-for-review/` (Notifikasi jika skor >= 8/10) | Approval → Upload YT/FB |

> **Aturan Retry Otomatis**: Jika gagal di tahap 2 atau tahap 5 (skor < 8/10), worker otomatis melakukan revisi maksimal **2 kali** berdasarkan log error. Jika masih gagal setelah 2×, episode dipindahkan ke `needs-human/` agar token tidak terbuang.
