# DELIVERY jensen-pain-suffering v4 · 16 Nov 2026 (revisi R-007, basis ca3df35)

**File:** `out/jensen-pain-suffering_v4.mp4` (PC, tidak di-commit) · Drive: Claude edit/jensen-pain-suffering/jensen-pain-suffering_v4.mp4 · 1920×1080 · 30 fps · 1428 frame · 47,6 dtk · H.264 CRF 14 + AAC 320k · −15,9 LUFS, true peak −1,0 dBTP

| Gerbang | Hasil | Bukti |
|---|---|---|
| Mode revisi | basis ca3df35; dirender ulang hanya f104–181, 271–457, 543–560, 813–922, 1330–1427; sisanya dari v3 | `qc/revisi.json`, `tools/sambung_v4.sh` |
| Adegan tidak diubah | baseline_lock 9/9 PASS (0,00 % piksel) | `qc/locks/` |
| motion_lint (file berubah), audio_bus, tsc, resep | PASS | `qc/r10/final_*.out` |
| Audio | suara −23,9 → −17,0 LUFS gain bersih, crest 15,5 → 15,4 (voice_level PASS); SFX 16 cue sfx_density --objects PASS; audio_order check --warisan PASS | `audio/tools/mix_v4.py`, `audio/objects.json` |
| Audit frame dua model | c02–c04 LULUS keduanya; c01/c05 temuan hanya di adegan warisan (B1 f10 reframe, flash punch-in f240, B11 f1283/f1299) → putusan LULUS | `qc/frame_audit/*/VERDICT*.md` |
| Juri | LULUS | `qc/JURI.md`, `qc/sanding.jpg` |

**Penyimpangan / catatan:** RESILIENCE memakai amber lebih dalam (#D9782A) karena amber brand di-multiply nyaris hilang; kontras huruf < 4,5:1 disengaja (efek bercampur). Pemeriksa GPT menandai lompatan pose sumber di B11 (42,8 dan 43,3 dtk) — adegan warisan, tidak diubah.
