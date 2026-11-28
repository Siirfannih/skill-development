---
name: sg-voice-align
description: Menghasilkan voiceover bahasa Indonesia natural via Google AI Studio Gemini TTS (atau fallback ElevenLabs), mastering -14 LUFS, dan ekstraksi words.json via Whisper lokal.
---
# Skill 03: Voiceover Synthesis & Word Alignment (Zero-LLM Token)

## Trigger
Dijalankan otomatis oleh skrip worker segera setelah `script.md` lolos Gate 02.

## Analisa Racikan Suara Natural (Dari Referensi `edubizz-1.mp4`)
Mengapa suara bahasa Indonesia di `edubizz-1.mp4` terdengar sangat natural (bukan seperti robot/pembaca berita)?
1. **Diksi Percakapan Harian**: Menggunakan partikel dan ritme obrolan (*"Coba bayangin..."*, *"Kok bisa?"*, *"Nah, pas..."*, *"Simpel aja"*), bukan bahasa baku tertulis.
2. **Napas Mikro & Jeda Retoris**: Ada tarikan napas halus sebelum kalimat baru dan jeda 0,25–0,4 detik setelah pertanyaan retoris (*"Kok bisa? ... Sini, gua jelasin."*).
3. **Intonasi "Vocal Smile" + Variasi Tempo**: Nada sedikit naik saat penasaran, melambat tipis saat menyebut istilah kunci (*"foton"*, *"listrik DC"*, *"inverter"*), lalu kembali hangat dan mengalir.

## Racikan Google AI Studio (Gemini TTS) — Primary Engine
Gunakan `tools/tts_gemini.py` dengan model `gemini-2.5-flash-tts` atau `gemini-2.5-pro-tts` (atau `gemini-3.8-flash-tts` jika tersedia di API key).
- **Voice Preset Rekomendasi**:
  - Perempuan hangat & santai (paling dekat dengan `edubizz-1.mp4`): `Aoede` atau `Kore` atau `Leda`.
  - Laki-laki santai & penasaran: `Puck` atau `Charon`.
- **Director's Notes Wajib (disuntikkan ke prompt/instructions)**:
  ```text
  # AUDIO PROFILE: Narator Explainer Indonesia
  Style: Warm, curious, conversational friend explaining an interesting everyday fact over coffee. Natural vocal smile, subtle natural breath intakes between thoughts. NOT a stiff news anchor, NOT overly theatrical.
  Accent: Natural modern Jakarta Indonesian (bahasa Indonesia santai sehari-hari).
  Pacing: Medium-brisk (~150 WPM), with deliberate 0.3s micro-pauses after rhetorical questions and slight emphasis on key technical words.
  ```

## Alternatif Fallback: ElevenLabs
Jika kuota Gemini TTS habis atau ingin suara kloning konsisten:
- Model: `eleven_multilingual_v2` atau `eleven_turbo_v2_5`
- Parameter: `stability: 0.35`, `similarity_boost: 0.78`, `style: 0.35`, `use_speaker_boost: true`.
- Gunakan `tools/tts_gemini.py --engine elevenlabs` (membutuhkan `ELEVENLABS_API_KEY` dan `ELEVENLABS_VOICE_ID`).

## Alur Eksekusi Otomatis
1. Sintesis VO mentah: `python3 tools/tts_gemini.py --input episodes/epXX/script.md --out episodes/epXX/vo_raw.wav`
2. Mastering audio ke standar Shorts (`-14 LUFS`, True Peak `-1.0 dBTP`, high-pass filter 80Hz):
   ```bash
   ffmpeg -y -i vo_raw.wav -af "highpass=f=80,loudnorm=I=-14:TP=-1.0:LRA=7" -ar 48000 -ac 2 vo.wav
   ```
3. Ekstrak *word-level timestamps* via Whisper lokal (0 token LLM):
   ```bash
   whisper vo.wav --language Indonesian --model medium --word_timestamps True --output_format json --output_dir episodes/epXX/
   ```
   Lalu konversi ke `words.json` (`[{word, start, end}]`).

## Gate (Wajib Lulus)
- Durasi `vo.wav` berada di rentang **45.0 – 59.5 detik**.
- Loudness terukur di `-14.0 ± 1.0 LUFS` (`ffprobe` / `ebur128`).
- `words.json` memiliki timestamp valid untuk >= 95% kata di `script.md`.
