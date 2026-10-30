---
status: evidence
scope: ai-change-everything
how_to_use: "Catatan fase. Bukan kriteria sukses. Kriteria ada di BRIEF-STANDARD.md. Build v4 di bawah sudah diganti."
---

# STATUS · ai-change-everything ("Pengganti kita sendiri")

**Fase:** disusun ulang dari nol, termasuk naskah dan sound design (Irfan, 30 Oktober 2026). Arah visual dan suara: D-005, D-006, D-009. Gaya sunting: D-013.

Yang tidak dipakai lagi: naskah v4, storyboard v4, mix suara pertama (`music/c1`–`c5`, `remotion/src/comp/sound.tsx`).

## Riwayat build v4 (diganti)

Catatan di bawah menggambarkan draft yang sudah diganti. Jangan dilanjutkan.

**Fase saat itu:** build visual Remotion (gerbang 7–8) dengan timing VO sementara. VO final belum dipilih (Irfan: suara perempuan, serius, dalam, tegang tapi natural — casting belum ada yang cocok). Audio SFX/musik belum dibuat pada catatan ini. Ledger kemudian mencatat mix lima cue; mix itu juga sudah diganti (D-012).

- Script FINAL v3 (Irfan 29 Okt 18:28) + hook "Tapi anehnya, kita menginginkan hal tersebut." (18:48) → `SCRIPT.md` di repo. Naskah itu sekarang diganti.
- Data vibe coding hanya sebagai visual (App Store +84 %, TrustMRR 54 % $0); VO tidak berubah.
- Narator: perempuan saja. Suara Jadisatu lama ditolak (terlalu santai/fun). Kemudian diganti klon suara Irfan (D-009), dan klon itu yang berlaku.
- Timeline sementara: VO v1 (voice Jadisatu) tempo ×1,05–1,06 + jeda dipangkas ke ±0,28 dtk → `vo/vo.json`.
- Build: Remotion 4.0.539, 2.5D tiga layer (BG 0,55 · MID 1 · TXT 1,3), kamera gaussian σ 0,12 dtk.
- Palet draft: hitam #0A0A0A, kertas #F6F5F2, biru #2563EB hanya di latar terang. Font Inter / Instrument Serif italic / JetBrains Mono / Source Serif 4 (UI Claude). Palet yang berlaku sekarang adalah D-005, bukan baris ini.

## File kunci draft itu

- `remotion/src/scenes/S1..S5.tsx` — adegan; `src/comp/products.tsx` — UI asli (ChatGPT, Claude, WhatsApp Business, editor, form, tweet, analytics, grafik).
- `remotion/stills.mjs` + `shots.sh` — still QA; `render_draft.sh` — draft 540p.
- `STORYBOARD.md`, `CREDITS.md`.
