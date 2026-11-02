# STATUS: Pengganti Kita Sendiri (@siirfannih)

_Update terakhir: 2 Nov 2026 10.50 WITA — PKS_v10 terkirim ke Irfan, menunggu review._

## Posisi sekarang
- **Versi terakhir: v10** — Mac `pks-studio/out/PKS_v10.mp4` (1080p30, 132,8 s, −14,0 LUFS, peak −1,2 dBFS).
- QC: 4 putaran reviewer segar (`review_log.md`); putaran 4 = SHIP (0 P0/P1, semua rubrik 4; gerbang ketat R6 ≥ 4,5 belum). 9/9 keluhan 06.05 beres.
- P2 ditunda untuk Irfan: ruang gelap kosong 101–103 & 115–120 s, «Tempat kita»/«Tertinggal» di y ≈ 73 %, komposisi 25–28 s, label UI kecil (perlu punch-in), VO p5 2,7 dB.
- Bagian dikunci Irfan: `LOCKED.md`. Cara kerja baru: `claude/motion-graphic/references/three-segment-gate.md` (gerbang 3 segmen, hierarki subagent, aturan teks).

## Alur v10 (dipakai)
- Segmen 1 kode: `tools/seg1_code_check.py` → `OBJECT-MAP.md`.
- Segmen 2 pra-render: `remotion/seg2_probe.mjs` (log OBJ dari DOM + still) → `tools/seg2_layout_check.py` (SAFE/CLASH/CONTR).
- Segmen 3 render: Mac `seg.sh` per segmen → `tools/sfxev_to_cues.py` → `audio-v19/mix_v19.py --sfx-duck 5 --bed-duck 4` → `tools/audio_gate.py` → reviewer segar → `final.sh`.
- Font overlay: Geist Sans 500/600 (`@fontsource/geist-sans`, sudah terpasang di Mac).

## Arsip v9
## Cara kerja (dipakai v9)
- Kode Remotion: repo `remotion/` = sumber kebenaran; disalin per file ke Mac `pks-studio/remotion` (stagedPath unik per sinkron).
- Render per segmen: Mac `pks-studio/seg.sh <nama> <a_s> <b_s>` (50 %, log SFXEV → `seg/<nama>.sfx`). Final: `final.sh`. Tambal rentang tanpa render penuh: `patch.sh <fA> <fB>`.
- Opsi render wajib: `--concurrency=4 --timeout=120000` (matte VP9 alpha 1080p lambat di-decode).
- Bundle menyalin `public/` → setelah menambah media/matte, hapus `seg/.bundle_stamp` dulu.

## Keputusan terkunci v9
- Teks: VO = anchor words saja (1–3 kata, `lib/AnchorWord.tsx`, frame ABSOLUT, posterize 12 fps + grain). Narasumber (berita, Jensen, Altman) = teks per kata bervariasi 4 teknik (`lib/SpeakerWords.tsx`). Bahasa ikut audio.
- Matte narasumber: `tools/make_mattes.py` → `public/mattes/*.webm`. Dipakai untuk berita (Altman: teks ditumpuk di kiri kartu, tidak di belakang kepala); close-up remaja dan Jensen tanpa matte (badan menutup teks).
- 02e "janji ditepati" = checklist tugas 02c dicentang AI + 8 jam → 45 menit (bukan kurva). 05e = orbit 10 landing page berbeda mengitari logo OpenAI vektor.
- Audio v19 (`audio-v19/`):
  - `music_bed.py`: 77 Cycles stems (offset −16 s) + DOX bass −4 st (C min) + Dark Water piano dari 75,2 s. Ducking −6/−8 dB, carving 1–4 kHz −4 dB.
  - `mix_v19.py`: room tone hospital-air −54 dBFS, SFX dari `tools/sfxev_to_cues.py` (penanda kode → library Epidemic, katalog `SFX-CATALOG-V9.md`), SFX duck −4 dB saat VO, limiter, −14 LUFS.
  - QA: dead air 0, VO di atas latar (pita HP 300 Hz–8 kHz) median 17,9 dB, SFX 2–6 kHz 1 %.
- VO tidak diregenerasi, playback 1,0.

## Di mana file berada
- SFX library v9: cloud sesi `/home/claude/pks/sfx_v9/` (40 WAV Epidemic, tidak di git; unduh ulang via ID di `SFX-CATALOG-V9.md`).
- Stem musik: `/home/claude/pks/music_v9/` (ID Epidemic di header `music_bed.py`).
- Dialog stem: Mac `pks-studio/remotion/public/audio/v8/dialog.wav`.
