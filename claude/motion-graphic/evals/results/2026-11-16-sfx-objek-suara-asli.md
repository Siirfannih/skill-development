# Evaluasi · 1 SFX per objek, suara asli tidak diturunkan, ekor kata, audio bus · 16 Nov 2026

## Akar masalah (dari riwayat git)
1. `ce2a696` (8 Nov) aturan 43 = "1 SFX per frame/pesan/objek/gerakan". `a35456a` (14 Nov) mengganti seluruhnya dengan "momen cerita, kepadatan dari kiblat" saat menerapkan koreksi 13 Nov "jangan bunyi per kata": koreksi sempit dijadikan aturan umum.
2. "Satu peran satu bunyi" hanya ada di `guide/sfx` dan `audio.md` §14.8, tidak di Lantai, tanpa gerbang.
3. Level suara asli punya tiga aturan bertabrakan: §14.6 kompresor + loudnorm −15,5; delivery-gate wajib −14 LUFS (mendorong limiter/loudness global); `b84f8fa` gain 0 dB (v3 −22,8 LUFS).
4. `cut_check --suggest` menyisakan 30 ms setelah ambang diam (median −18 dB), ekor konsonan di bawah ambang ikut terbuang; `recut.py` memakai ambang absolut −38 dBFS.
5. Larangan laser/sci-fi di SFXIRFAN (c6ad7ce) adalah tebakan Codex; regex `sine`/`wood` salah tangkap "Business"/"Hollywood".

## Perubahan
- Lantai E23 (+ level suara) dan E24 (ditulis ulang) sesuai jawaban Irfan 16 Nov (stagger terpisah > 2 f berbunyi, KT per kata senyap, opsi B: gain naik bersih ke ±−16 LUFS).
- `gate/voice_level.py` baru; `audio_order.py lock suara` wajib `--voice-source`, `lock sfx` wajib `--objects`.
- `sfx_density.py`: objek tanpa SFX, peran↔file tidak konsisten, flam < 100 ms; kepadatan hanya info; regex berbatas kata; laser/sci-fi dicabut.
- `cut_check.py` melindungi ekor 80 ms + napas 40 ms; `recut.py` ambang relatif ke rekaman.
- `juri/audio_bus_check.py` + `render.sh final`; `build.md` audio bus.
- SKILL.md §4: lima fase, subagen baru per fase, `templates/handoff-fase.md`.
- Aturan bertabrakan diganti di tempat: `audio.md` §14.6/§14.9/§14.10/tabel peran, `delivery-gate.md`, `guide/audio`, `guide/sfx`, `SFXIRFAN.md`.

## Bukti uji
- `python3 -m unittest scripts/tests/test_audio_gates.py`: **18/18 PASS** (10 lama + 8 baru: regex batas kata & laser boleh, satu peran satu file, objek tanpa SFX, flam, suara diturunkan FAIL / gain naik PASS, suara ditekan FAIL, ambang relatif ekor −40 dBFS FAIL, audio di dalam Sequence FAIL).
- `tools/sync_lantai.py --check` PASS, `bash -n render.sh` PASS.
- Belum diuji pada proyek nyata: proyek lama gagal `audio_order.py check` sampai di-lock ulang dengan `--voice-source` dan `--objects` (fail-closed, disengaja).

Status: **PASS untuk gerbang dan aturan; uji di video berikutnya.**
