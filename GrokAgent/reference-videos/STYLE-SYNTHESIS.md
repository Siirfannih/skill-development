# Style Synthesis — Visual + Audio Rules from References

**Analyst:** Grok Bot agent Maximus  
**Date:** 2026-10-30 (Asia/Makassar)  
**Sources:** [`VISUAL-BREAKDOWN.md`](VISUAL-BREAKDOWN.md) + measured [`AUDIO-ANALYSIS.md`](AUDIO-ANALYSIS.md)

**Authority:** Findings below are **proposals for Irfan**. They do **not** override `claude/motion-graphic/` or project `AUTHORITY.md` until Irfan accepts them through the usual eval gate.

---

## Combined production rules (measured + observed)

### Structure & edit rhythm

| Rule | Evidence |
|---|---|
| Hook in first ~3 s | All five refs open with a clear visual/VO beat immediately |
| Escalation mid with ≤0.5 s cuts | V1 collage, V3 content-farm block, V5 solar montage |
| “Breathe” resolution, slower ending | V3 1:11–1:30; V1 logo land; V2 CTA hold |
| Cut ↔ audio sync tolerance **80 ms** | Mean **82%** of detected cuts within ±80 ms of beat **or** onset (see audio report table) |

### Typography & on-screen copy

| Rule | Evidence |
|---|---|
| Heavy sans (SF Pro / Inter / Helvetica-like) | V1–V5 primary type |
| **1–3 words per screen**, syllable-synced | Visual pass + VO pace **2.5–3.7 words/s** → keep on-screen text sparse |
| Text tracks subjects / sandwiched with roto | Cross-video |
| One contrasting font as theme accent | e.g. script “Renaissance” (V3) |

### Motion & compositing

| Rule | Evidence |
|---|---|
| “Pop and drift”: 0→100% in 3–4 frames, then 100→105% drift; almost no fades | Cross-video |
| Spring easing for UI with slight overshoot | V1 sliders, V2 dashboards |
| 2.5D parallax on stills — no truly static plate | V3/V4 art; V1 moodboard |
| Subject isolation / masking | Cross-video |

### Audio / mix targets (measured)

```
loudness_target_lufs:           -14.5 .. -12.5
# promo cluster measured ≈ -14.41 .. -12.84 (mean ≈ -13.9)

cut_audio_sync_tolerance_ms:    80
# mean sync rate across videos with cuts ≈ 82%

vo_pace_words_per_sec:          2.5 .. 3.7
# measured 2.53 .. 3.66 → map to 1–3 words on screen

harsh_2k_6k_energy_fraction:    stay ≤ ~0.30
# measured promo range 0.151 .. 0.293; do not notch to zero

tempo_bpm_promo_expect:         ~117 .. 129  # verify per track
scene_detect_threshold:         0.3 (fallback 0.15 if zero cuts)
```

Per-video LUFS / harsh fraction / sync rates: see comparison table in `AUDIO-ANALYSIS.md`.

---

## Conflicts with existing repo rules

These are **decision items for Irfan**, not silent overrides.

### (a) Highlight box behind text

- **Reference:** Video 2 ends with a gradient **highlight box** behind “works”.
- **Repo today:** `claude/motion-graphic` bans highlight boxes.
- **Proposal:** Keep the ban as default for Jadisatu / branded work; optionally allow a one-off “accent plate” only when brief explicitly asks for Spark-like CTA — **awaiting Irfan**.

### (b) Chaotic overlapping multi-focus montage

- **Reference:** Videos 3 and 4 deliberately use overlapping multi-focus / chaotic text densification (content-farm overload; protest/sermon montage).
- **Repo today:** Mandates **one focus per frame**.
- **Proposal:** Treat multi-focus chaos as a **named act device** (e.g. “overload beat”) with a hard return to single-focus for resolution — not a general license. Decision for Irfan: allow as labeled exception or keep absolute single-focus.

### (c) “Avoid harsh 2–6 kHz”

- **Repo taste:** Avoid harsh 2–6 kHz.
- **Measured:** Refs sit at harsh-band energy fraction **0.15–0.29** of spectral magnitude (not zero; Renaissance peaks **0.293**).
- **Proposal:** Replace absolute avoidance with a **ceiling ≈ 0.30** (stay at or below ref max). Do **not** remove the taste note — refine it. Partially supported only.

### (d) Sync, loudness, VO → on-screen words

| Proposal | Number | Basis |
|---|---|---|
| Sync tolerance | **80 ms** | Mean **82%** of cuts within ±80 ms of beat/onset |
| Loudness target | **-14.5 … -12.5 LUFS** | Promo cluster −14.41 … −12.84 |
| VO pace | **2.5–3.7 words/s** | Whisper-measured |
| On-screen copy | **1–3 words** | Matches visual pattern + VO density |

---

## Suggested agent workflow

1. Read this file + `AUDIO-ANALYSIS.md` numbers.
2. Compare against current `claude/motion-graphic/references/` (audio, typography, camera-transition, smooth-motion).
3. If proposing a skill edit, open a case under `EVALS-DESIGN.md` — do not silently rewrite Irfan’s rules from this folder.
