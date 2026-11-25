# Cookbook · INDEX (Router)

> **Protokol:** Muat `00-core-invariants.md`, lalu **hanya** pack sesuai Loading Matrix di bawah. Dilarang memuat folder lain. Lookup per beat via `pilih_kartu.py` (`CATALOG.md`); detail bedahan penuh di `_vault/` dibuka hanya setelah tabel racikan disetujui.

## 1. Domain Packs

<!-- Tok = jumlah karakter semua .md pack ÷ 3,5 (Core: 00-core-invariants.md; Static: 6 kartu vibedesign/cookbook/0*/; Carousel: Core+Static+Q06), dibulatkan ke puluhan. -->

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

## 2. Loading Matrix
| Tipe Konten | WAJIB Build | Finishing | WAJIB Skip | Tok |
|---|---|---|---|---:|
| **Motion Graphics Explainer** | `Core`, `P01`, `P04`, `P05` | `P06` | `P02`, `P03`, `Static` | ~9.030 / 11.890 |
| **Documentary / Behindwork** | `Core`, `P03`, `P01`, `P05` | `P06` | `P02`, `P04`, `Static` | ~10.030 / 12.890 |
| **Talking-Head Reels** | `Core`, `P02`, `P05` | `P06` | `P01`*, `P03`, `P04`, `Static` | ~6.010 / 8.870 |
| **Coded Carousel (`vibedesign`)** | `Core`, `Static`, `P06/Q06` | `P06/Q06` | `P01`, `P02`, `P03`, `P05` | ~4.650 |

*\*Talking-Head:* jika beat butuh demo UI/whip, ambil 1 kartu `P01` via `pilih_kartu.py`.

## 3. Lookup CLI
- Per beat: `python3 claude/motion-graphic/scripts/cookbook/pilih_kartu.py --pack <01..06> --cari "<trigger>"`
- ID lama: `python3 tools/cookbook.py cari <id_lama>`
