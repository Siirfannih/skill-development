# STATUS: Pengganti Kita Sendiri (@siirfannih)

_Update terakhir: 2 Nov 2026 malam — sesi revisi v21 (otonom, atas feedback 22.25). Lihat `AUDIT-V20.md` dan `LEARNINGS-2NOV.md` §E._

## Posisi sekarang (v21)
- **Sesi routine QC (3 Nov ±00.40 WITA):** render final sesi sebelumnya (kode 8d06af6) DIHENTIKAN di 2536/3984 karena QC still menemukan
  bug (frasa menyeberang cut, tumpuk kata baris baru, frasa 14–17 kembali jadi chip subtitle, teks menimpa figur 05h). Render penuh ulang dari
  kode 474d041 → `seg/v21final_v.mp4` (sfx sama persis dengan v11 → master v20 dipakai). Reviewer segar: blocker kerumunan klon →
  tambal f3106–3790 (`patch21.sh`). Hasil akhir tetap `out/PKS_v21_video{1,2}.mp4`. Rincian: `AUDIT-V20.md` bagian QC lanjutan.
- **v21 TERKIRIM ke Irfan (3 Nov ±00.55 WITA)**: 3984 f / 132,8 dtk, penanda SFX render + tambal ⊂ v21final.sfx = v11final.sfx.
  Belum dilakukan di v21: earshot ulang (audio tidak berubah), kurva gerak `motion_curve.py` pada render v21 (Breath belum diukur ulang),
  minor reviewer (kontras «Raised over a», kata menyentuh garis siluet 17/30/51 dtk). Menunggu feedback Irfan.
- **Versi terakhir: v21.** Mac `pks-studio/out/PKS_v21_video1.mp4` (Particle Emission) dan `PKS_v21_video2.mp4` (Reggae buka/tutup + Particle).
  Visual = render v21 (`seg/v21final_v.mp4`), audio = master v20 (`seg/master_v20_video{1,2}.flac`) karena penanda SFX tidak bergeser.
- Perubahan v21: `lib/KineticVO.tsx` (tipografi kinetik VO per frasa, menggantikan baris subtitle CaptionTrack — logika frasa/mask tetap di
  CaptionTrack), `lib/Breath.tsx` (napas kamera di jendela statis), scrim S00/S03c dihapus + SOFT_SHADOW lebih kecil, variasi organik
  piktogram kerumunan (`_b6_shared.tsx` `useOrganic`).
- Alat Mac baru: `pks-studio/sync21.sh` (sinkron src dari origin/main), `stills.sh` (still QC per frame → lembar), `audit21/`.

## Arsip v20
## Posisi v20
- **Versi terakhir: v20.** Mac `pks-studio/out/PKS_v20_video1.mp4` (Particle Emission) dan `PKS_v20_video2.mp4` (Reggae buka/tutup + Particle). Visual = render v11 (`seg/v11final_v.mp4`), audio = `audio-v20/` (master FLAC di `seg/master_v20_video{1,2}.flac`).
- v11 visual: CaptionTrack (running text), AnchorWord enter type/mask/letters/blur, NaturalLight (ganti pendar balon), crop wajah S05f, penanda `type`/`enter`.
- v20 audio: disusun ulang dari nol oleh sesi segar tanpa aturan lama (BRIEF di `audio-v20/BRIEF.md`). 309 peristiwa, SFX dari folder SFXIrfan (varian family), −14 LUFS, TP −1,2.
- **Feedback terbuka (22.25):** shadow hitam 0:07–0:08 terulang (akar: radial-gradient di S00), jeda/kurang smooth, objek terlalu rapi (AI slop), kinetic typography VO jadi subtitle datar. Rincian: `LEARNINGS-2NOV.md` §C.
- Pelajaran sesi: `LEARNINGS-2NOV.md`. Bagian terkunci: `LOCKED.md`.

## Arsip v10
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
