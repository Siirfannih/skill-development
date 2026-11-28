---
name: sg-qc-auditor
description: Menjalankan pengecekan teknis deterministik (durasi, loudness, safe-zone, anti-slop) dan audit visual 6 frame (skor >= 8/10) sebelum masuk antrean review Irfan.
---
# Skill 07: Automated QC Auditor & Approval Queue

## Trigger
Dijalankan otomatis setelah `episodes/epXX/render.mp4` selesai dirender.

## Tahap 1 — Deterministic Technical Gate (0 Token LLM)
Jalankan `bash tools/run_qc.sh episodes/epXX`:
- Cek resolusi tepat `1080x1920`, fps `30`.
- Cek durasi `45.0s – 60.0s`.
- Cek loudness audio `-14.0 ± 1.5 LUFS`.
- Cek `slop-grep.sh` pada `script.md` & `Scene.tsx` (termasuk blokir SFX kayu).
- Ekstrak 6 frame kunci aktual dari `render.mp4` (`0s, 3s, 15s, 30s, 45s, end-1s`).

## Tahap 2 — Visual & Editorial Audit (Manda / Gemini Auditor)
Evaluasi 6 frame hasil render berdasarkan **Rubrik Anti-Slop (Skor 0–10)**:
1. **Hook Frame 1 (0–2 pts)**: Objek dan cap kata langsung terbaca jelas tanpa intro/logo?
2. **Style Fidelity (0–2 pts)**: Benar-benar terasa Style A (Einstein editorial wrap + halftone) atau Style B (Vox tactile archive + highlighter/polaroid), bukan template AI polos?
3. **Typography & Safe Zone (0–2 pts)**: Tidak ada teks terpotong, tidak keluar dari `y: 250..1520px`, kontras tinggi?
4. **Visual Pacing & Clarity (0–2 pts)**: Setiap frame menyampaikan 1 pesan jernih ("1 Frame 1 Message") tanpa tumpukan elemen berantakan?
5. **Brand & Policy Safety (0–2 pts)**: Tanpa logo merek asli, tanpa klaim medis/finansial berbahaya, maskot Gini konsisten?

## Keputusan Routing Otomatis
- **Skor >= 8/10 & Technical Gate PASS**:
  - Salin `render.mp4` + `qc-report.json` + 6 frame ke `ready-for-review/epXX/`.
  - Kirim ringkasan 5 baris ke Irfan (siap di-review kapan saja saat luang). **Dilarang auto-upload tanpa persetujuan Irfan.**
- **Skor < 8/10 atau Technical Gate FAIL**:
  - Tulis daftar perbaikan spesifik (maksimal 3 poin paling kritis) ke `episodes/epXX/qc-report.json`.
  - Kembalikan otomatis ke `06-sg-scene-composer` (maksimal **2× retry**). Jika gagal ke-3 kalinya, pindahkan ke `needs-human/epXX/`.
