# Cookbook · INDEX (Router)

> **Protokol:** Muat `00-core-invariants.md`, lalu cari kartu per beat dengan `pilih_kartu.py` (`CATALOG.md`) dan buka hanya 2–4 kartu untuk seluruh video. Pack utuh tidak dimuat; tabel §2 hanya memberi filter `--pack`. Detail bedahan penuh di `_vault/` dibuka hanya setelah tabel racikan disetujui.

## 1. Domain Packs

<!-- Tok = jumlah karakter semua .md pack ÷ 3,5 (Core: 00-core-invariants.md; Static: 6 kartu vibedesign/cookbook/0*/), dibulatkan ke puluhan. Ukuran ini menjelaskan kenapa pack tidak dimuat utuh. -->

| Pack | Path | Cakupan | Tok |
|---|---|---|---:|
| **Core** | `00-core-invariants.md` | 7 invarian universal Kelas H (wajib) | ~1.000 |
| **P01** | `01-motion-camera-transitions/` | Kamera 2D, UI stage, burst, zoom-chain, montase | ~2.640 |
| **P02** | `02-typography-talking-head/` | KT wajah, slab belakang kepala, orbit, cutaway | ~3.350 |
| **P03** | `03-documentary-story-narrative/` | Arsip, spotlight, grading, naskah `S01–S12` | ~4.720 |
| **P04** | `04-ui-cutout-dataviz-visuals/` | UI SaaS, cutout kolase, stiker, diagram, dataviz | ~3.720 |
| **P05** | `05-audio-sfx-pacing/` | 5 Pilar SFX, tick mode, sting, VO, musik | ~1.670 |
| **P06** | `06-qc-and-verification/` | Pre-build, anti-slop, frame audit, audio HP, token | ~2.860 |
| **Static** | `../../vibedesign/cookbook/` | 6 kartu statis carousel/poster PNG 2× | ~3.290 |

## 2. Filter `--pack` per tipe konten
| Tipe Konten | `--pack` dicari dulu | Finishing | Jarang relevan |
|---|---|---|---|
| **Motion Graphics Explainer** | `01`, `04`, `05` | `06` | `02`, `03`, Static |
| **Documentary / Behindwork** | `03`, `01`, `05` | `06` | `02`, `04`, Static |
| **Talking-Head Reels** | `02`, `05` | `06` | `01`*, `03`, `04`, Static |
| **Coded Carousel (`vibedesign`)** | Static (`vibedesign/cookbook/INDEX.md`), `06` (Q06) | `06` (Q06) | `01`, `02`, `03`, `05` |

*\*Talking-Head:* jika beat butuh demo UI/whip, cari tanpa filter atau dengan `--pack 01`.

## 3. Lookup CLI
- Per beat: `python3 claude/motion-graphic/scripts/cookbook/pilih_kartu.py --pack <01..06> --cari "<trigger>"`
- ID lama: `python3 tools/cookbook.py cari <id_lama>`
