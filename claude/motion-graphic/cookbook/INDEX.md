# Cookbook · INDEX (Router)

> **Protokol:** Muat `00-core-invariants.md`, lalu **hanya** pack sesuai Loading Matrix di bawah. Dilarang memuat folder lain. Lookup per beat via `pilih_kartu.py` (`CATALOG.md`); detail bedahan penuh di `_vault/` dibuka hanya setelah tabel racikan disetujui.

## 1. Domain Packs
| Pack | Path | Cakupan | Tok |
|---|---|---|---:|
| **Core** | `00-core-invariants.md` | 7 invarian universal Kelas H (wajib) | ~620 |
| **P01** | `01-motion-camera-transitions/` | Kamera 2D, UI stage, burst, zoom-chain, montase | ~1.540 |
| **P02** | `02-typography-talking-head/` | KT wajah, slab belakang kepala, orbit, cutaway | ~1.320 |
| **P03** | `03-documentary-story-narrative/` | Arsip, spotlight, grading, naskah `S01–S12` | ~2.420 |
| **P04** | `04-ui-cutout-dataviz-visuals/` | UI SaaS, cutout kolase, stiker, diagram, dataviz | ~1.980 |
| **P05** | `05-audio-sfx-pacing/` | 5 Pilar SFX, tick mode, sting, VO, musik | ~880 |
| **P06** | `06-qc-and-verification/` | Pre-build, anti-slop, frame audit, audio HP, token | ~1.540 |
| **Static** | `../../vibedesign/cookbook/` | 6 kartu statis carousel/poster PNG 2× | ~1.100 |

## 2. Loading Matrix
| Tipe Konten | WAJIB Build | Finishing | WAJIB Skip | Tok |
|---|---|---|---|---:|
| **Motion Graphics Explainer** | `Core`, `P01`, `P04`, `P05` | `P06` | `P02`, `P03`, `Static` | ~5.020 / 6.560 |
| **Documentary / Behindwork** | `Core`, `P03`, `P01`, `P05` | `P06` | `P02`, `P04`, `Static` | ~5.460 / 7.000 |
| **Talking-Head Reels** | `Core`, `P02`, `P05` | `P06` | `P01`*, `P03`, `P04`, `Static` | ~2.820 / 4.360 |
| **Coded Carousel (`vibedesign`)** | `Core`, `Static`, `P06/Q06` | `P06/Q06` | `P01`, `P02`, `P03`, `P05` | ~2.380 |

*\*Talking-Head:* jika beat butuh demo UI/whip, ambil 1 kartu `P01` via `pilih_kartu.py`.

## 3. Lookup CLI
- Per beat: `python3 claude/motion-graphic/scripts/cookbook/pilih_kartu.py --pack <01..06> --cari "<trigger>"`
- ID lama: `python3 tools/cookbook.py cari <id_lama>`
