# «Pengganti Kita Sendiri» · build Remotion v1 (31 Okt 2026)

1920×1080, 30 fps, 132,8 dtk. Semua waktu dikunci ke audio master v11.

## Struktur
- `src/panels/`: 37 panel storyboard Wonder (`export/`, 31 Okt), dikonversi otomatis apa adanya. Referensi statis; jangan diedit.
- `src/scenes/S*.tsx`: adegan animasi per panel. Registrasi otomatis lewat `export const SCENE = {Component, covers}`. Panel yang tidak di-cover adegan mana pun tampil statis.
- `src/lib/`: framework.
  - `time.ts`: timestamp kata VO dan panel dari `timeline.json` / `beats.json`.
  - `anim.tsx`: Scene, kamera, KWord, easing.
  - `media.tsx`: Clip.
- `BRIEF-AGENTS.md`: aturan desain untuk agen pembangun adegan.
- `PANEL-TIMING.md`: tabel waktu kata dan SFX per panel.

## Media (tidak di-commit)
Letakkan di `public/`:

| Folder/file | Sumber |
|---|---|
| `audio/mix_v11.wav` | AI-Video/audio/v11 (mix master) |
| `clips/jensen_src_412.mp4` | Video Jensen Huang (Milken 2025), detik 412–428 |
| `clips/altman_src_838.mp4` | Video Sam Altman (Mostly Human), detik 838–852 |
| `news/*.mp4` | AI-Video/assets/news/seg |
| `wonder/*` | Gambar panel dari cdn.wonder.so (URL ada di `export/*.tsx`) |
| `img/` | video3/assets/img |

## Jalankan
```
npm i
npx remotion studio
npx remotion render PenggantiKitaSendiri out.mp4 --crf=20
```
