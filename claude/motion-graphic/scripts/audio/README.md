---
status: benchmark
scope: the-gap
how_to_use: "Alat bantu yang lahir di The Gap. Ambang di tabel mengikuti aturan 33–37 proyek itu, bukan syarat video lain."
---

# Audio & sync QA kit (lahir di The Gap, v14–v18)

Alat umum untuk video Remotion/motion apa pun. Set `MG_ROOT` ke folder proyek (berisi `render/`, `tools/`, `video/src/vo.json`).
Untuk proyek baru: cue sheet ada di `render/cues.json` (list of `{t, kind, db, visual, align, kw}`), stem di `render/stem_{vo,music,sfx}.wav`, mix di `render/mix.wav`.

| Skrip | Fungsi | Aturan skill |
|---|---|---|
| `vo_gaps.py vo.json vodir` | daftar semua jeda diam di VO (diukur di audio, −42 dB) | 33 |
| `tighten.py` | VO ×1,05 (rubberband) + padatkan jeda, tulis vo.json baru — sesuaikan `CH`/`OVR`/`CHUNK_GAP` per proyek | 33 |
| `el_music.py cues` | musik ElevenLabs per babak (peran tiap babak, durasi dikunci ke VO, minta +3–6 dtk lalu potong) | 34 |
| `music_check.py`, `env.py` | cek envelope/dinamika cue musik (fade, lubang) | 34 |
| `el_sfx.py <kind>` | SFX ElevenLabs dengan prompt "soft/smooth" | 34, 36 |
| `sfx_comfort.py files…` | skor kenyamanan SFX: desis > 6 kHz, 2–6 kHz, roughness, earshot harsh/soft | 36 |
| `audio_phone.py [--list\|--fix]` | simulasi speaker HP 20/50/100 %, kejelasan VO, kekasaran | 35 |
| `visual_coverage.py silent.mp4` | setiap event visual punya suara ±5 frame | 35 |
| `sync_cues.py silent.mp4` | geser SFX ke onset objek, buang yang tidak mengikuti apa pun, maks 2 suara/100 ms | 37 |

Alur v18: build audio `--nosync` → `sync_cues.py` → build → `audio_phone.py --fix` → build → `visual_coverage.py` + `earshot critique`.
Butuh: numpy, scipy, librosa, soundfile, pyloudnorm, pedalboard, ffmpeg (dengan rubberband), earshot (`EARSHOT=/path/to/earshot`). Kunci ElevenLabs dibaca dari `$MG_ROOT/.el_key` — jangan pernah di-commit.
Contoh lengkap pemakaian: `projects/jadisatu-60s/remotion/tools/audio_build.py`.
