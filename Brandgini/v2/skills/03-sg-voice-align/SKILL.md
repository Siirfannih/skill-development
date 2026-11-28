---
name: sg-voice-align
description: Pakai saat naskah Soalnya Gini sudah disetujui dan item masuk tahap suara; membuat VO dengan suara rancangan Gemini Voice Design bergantian per episode, mastering tanpa loudnorm, dan words.json lokal yang lolos voice_level dan cek kata KT, 0 token LLM.
---
# 03 · Suara dan waktu kata (bagian awal tahap Storyboard/block out)

## 1. Sumber suara (sudah diputuskan Irfan 25 Nov 2026: KEPUTUSAN-IRFAN D-01…D-05)
- **Engine: Gemini Voice Design**, model `gemini-3.8-flash-tts`, id-ID. Dua suara rancangan di proyek AI Studio Irfan, dicatat di `kit/suara.json`: `sg-perempuan` = `voice_58jatqol9qwd`, `sg-laki` = `voice_wbxo7x53a5kc` (TTL 1 tahun; `tts_gemini.py` memperingatkan < 30 hari sebelum kedaluwarsa).
- **Bergantian per episode**: nomor ganjil sg-perempuan, genap sg-laki (menggantikan aturan plan §3 "satu narator konsisten"; Irfan bisa mengubah `giliran` atau memaksa `--suara`).
- **Tanpa anotasi `style`**: sampel yang Irfan suka dibuat tanpa style dan dari naskah lisan (skill 02 §2).
- **Kunci API hanya di PC** `~/.config/soalnya-gini/gemini.env` (600, `GEMINI_API_KEY`). `tts_gemini.py` menolak berkas berizin longgar dan tidak pernah mencetak/menyalin kunci. Jangan menaruh kunci di argumen, log, atau berkas lain.
- Biaya: panggilan API tetap butuh `--izin-biaya "<ID DECISIONS>"`; tanpa itu dry-run (mencetak suara terpilih + body).
- Uji A/B (naskah baku vs lisan, `vo-uji/ab-*.wav`) **menunggu penilaian Irfan**; sampai ada putusan, default = lisan.
- Acuan tempo: sampel lisan yang disukai ±2,9 kata/dtk (laporan uji Irfan); edubizz-1 2,56 kata/dtk (`BEDAH-REFERENSI.md` §3).

## 2. Langkah
```
python3 tools/tts_gemini.py --input script.md --out vo_raw.wav --episode sgNNN                       # dry-run
python3 tools/tts_gemini.py --input script.md --out vo_raw.wav --episode sgNNN --izin-biaya D-VO-01  # di PC
bash tools/vo_master.sh vo_raw.wav vo.wav --sumber tts
~/work/mg-venv/bin/python tools/words_align.py vo.wav script.md words.json --model medium --shotlist shotlist.json
```
Loudness mentah Gemini terukur −18,3…−20,6 LUFS dengan true peak −0,7…−4,9 dBTP (uji T10). `vo_master.sh` menaikkan gain linear sampai −16 LUFS atau sampai batas −1 dBTP, mana yang lebih dulu; take yang **pelan tetapi berpuncak di atas −1 dBFS** (T10b: sg-laki −19,1 LUFS / −0,7 dBFS) gagal `voice_level` dan tidak boleh ditekan limiter: default buat ulang take itu sekali (biaya kecil, K-07); masih panas → `antrean.py tahan`.
Lalu potong jeda mati dan kunci suara memakai alat induk: `$MG/gate/cut_check.py` + `$MG/audio/recut.py`, `$MG/gate/audio_order.py lock suara …` (Lantai E23; MOTION-CORE §1 "padatkan jeda, bukan kecepatan bicara", `TEMPO = 1.0`). Waktu beat di `shotlist.json` disesuaikan ke `words.json` hasil potong.

## 3. Yang dilarang (dan kenapa v1 diganti)
- `loudnorm` pada stem suara, kompresor, limiter, mempercepat suara (Lantai E23; `references/audio.md` §14.6 "tanpa kompresor, limiter, atau loudnorm pada suara asli"). Uji v2: `loudnorm=I=-14:LRA=7` pada sumber −11,9 LUFS menurunkannya 2,1 dB → `voice_level.py` FAIL "turun" (uji T2e).
- HPF pada TTS: uji T2b2 menunjukkan HPF 70 Hz menaikkan true peak −2,0 → 0,0 dBTP; TTS memakai `--sumber tts` (tanpa HPF).
- v1 `tts_gemini.py` memakai voice preset (Aoede/Kore/…) dan menyebut model `gemini-3.8-flash-tts` hanya "jika tersedia"; v2 memakai suara rancangan Irfan lewat endpoint `interactions`.

## 4. Gerbang
- `vo_master.sh` exit 0 (di dalamnya `voice_level.py`: tidak turun, crest tidak ditekan, ≥ −17 LUFS atau `--terima-pelan` beralasan, puncak ≤ −1 dBFS).
- `words_align.py` exit 0: cakupan ≥ 85 % dengan model medium (v1 95 % tidak realistis: uji T4 = 91,9 % medium, 75,7 % small pada suara manusia 37 kata), durasi 45–59,5 dtk, **semua kata KT punya timestamp**. Kata KT salah dengar ASR (contoh uji: "foton" → "photon") = beri waktu manual di shotlist atau ganti kata KT.
- Lolos → `antrean.py pindah <id> storyboard --oleh mesin`.
