# STATUS · ai-change-everything ("Pengganti kita sendiri")

**Fase:** build visual Remotion (gerbang 7–8) dengan timing VO sementara. VO final belum dipilih (Irfan: suara perempuan, serius, dalam, tegang tapi natural — casting belum ada yang cocok). Audio SFX/musik belum dibuat.

## Keputusan terkunci
- Script FINAL v3 (Irfan 29 Okt 18:28) + hook "Tapi anehnya, kita menginginkan hal tersebut." (18:48) → `SCRIPT.md` di repo.
- Data vibe coding hanya sebagai visual (App Store +84 %, TrustMRR 54 % $0); VO tidak berubah.
- Narator: perempuan saja. Suara Jadisatu lama ditolak (terlalu santai/fun).
- Timeline sementara: VO v1 (voice Jadisatu) tempo ×1,05–1,06 + jeda dipangkas ke ±0,28 dtk → `vo/vo.json`. Saat VO final masuk: jalankan ulang `gapcut.py` + `assemble.py`, semua frame adegan mengikuti `wf()` otomatis.
- Build: Remotion 4.0.539, 2.5D tiga layer (BG 0,55 · MID 1 · TXT 1,3), kamera gaussian σ 0,12 dtk.
- Palet: hitam #0A0A0A, kertas #F6F5F2, biru #2563EB hanya di latar terang. Font Inter / Instrument Serif italic / JetBrains Mono / Source Serif 4 (UI Claude).

## File kunci
- `remotion/src/scenes/S1..S5.tsx` — adegan; `src/comp/products.tsx` — UI asli (ChatGPT, Claude, WhatsApp Business, editor, form, tweet, analytics, grafik).
- `remotion/stills.mjs` + `shots.sh` — still QA; `render_draft.sh` — draft 540p.
- `STORYBOARD.md`, `CREDITS.md`.

## Sisa pekerjaan
1. Review draft visual oleh Irfan.
2. Casting VO perempuan lanjutan (atau voice design ElevenLabs) → VO final → retime.
3. Musik per babak + SFX per objek (sumber: folder SFX Irfan → gratis → ElevenLabs).
4. Render final 1080p dengan motion blur (CameraMotionBlur 16 sampel) — idealnya di Mac.
