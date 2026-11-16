# DELIVERY jensen-pain-suffering v1 · 16 Nov 2026

**File:** `out/jensen-pain-suffering_v1.mp4` (PC, tidak di-commit) · 1920×1080 · 30 fps · 1428 frame · 47,600 dtk · H.264 + AAC 320k · −14,5 LUFS, puncak −1,6 dBFS

| Gerbang | Hasil | Bukti |
|---|---|---|
| Resep (kartu 55 campur brand Behindwork) | PASS | `resep_check.py` |
| Suara terkunci, potongan bersih | PASS (7 jeda retoris diterima, D-006) | `audio/ORDER.json`, `cut_check` |
| Teks layar = ucapan, 66 tampil | PASS | `teks_cek` 28 still TIDAK ADA TANDA; `handoff/TEKS.json` |
| Audit frame per frame tanpa sampling (Gemini + ChatGPT) | 5/5 LULUS | `qc/frame_audit/*/VERDICT*.md` |
| Juri still vs kiblat + keputusan Irfan | LULUS | `qc/JURI.md`, `qc/sanding.jpg` |
| SFX | PASS, 15 cue (0,32/dtk) | `sfx_density`, `audio/cues.json` |
| Musik 2 track per babak | PASS | `audio_order check`, D-010/D-011 |
| Loudness | −14,5 LUFS, true peak −1,4 dBTP (mix) | ebur128 |

**Penyimpangan dari kiblat/brief:**
- Kartu judul SUFFERING ±20 % tinggi (kartu 55: ±50 %), batas Poppins Bold satu baris.
- Teks di belakang kepala (kartu 55) tidak dibuat: belum ada matte di Linux.
- Tanpa logo/identitas Behindwork (D-003).
- Sumber Stanford 720p, di-upscale 1,5×.
- 3 dari 15 SFX (klik foto, ketikan) tipis di speaker HP.

**Lisensi (Irfan yang mengurus):** YouTube (Stanford PodiumVC, 60 Minutes, Max Richter, Two Steps From Hell), Pexels, Freesound (`sfx/internet/SOURCES.txt`).
