# Riset suara narator · Behindwork Batch 1

Dicek 22 Nov 2026. Arah dari Irfan: suara dokumenter storytelling yang personal, bukan suara pustaka generik; boleh TTS terbuka; kredit ElevenLabs terbatas.

## Profil narator kiblat (`startup.mp4`, vokal dipisah demucs)
Laki-laki, nada median 135 Hz (p10 106, p90 196, rentang 10,6 semiton), tempo 2,89 kata/dtk, dibaca rapat dengan jeda pendek di koma, kering dekat mik (ekor −19,8 dB). Bahasa Inggris. Tidak di-clone: suara itu identitas kreator lain; yang dipinjam hanya karakternya (dewasa, rendah-sedang, rapat, kering).

## Opsi yang dicek

| Opsi | Bahasa Indonesia | Suara personal | Biaya | Catatan |
|---|---|---|---|---|
| **OmniVoice** (k2-fsa, terbuka) | ya, 6.328 jam data latih (`docs/languages.md`) | voice design dari atribut (gender, usia, nada) + clone dari contoh rekaman milik sendiri | gratis, lokal | terpasang di PC: `~/work/tts/omni-venv` (torch CPU), model di `/mnt/storage-projects/tts/hf`. CPU lambat ±50× waktu nyata (±150 dtk per kalimat 3 dtk, `num_step` 16). Teks panjang sekaligus gagal (keluaran tak terbaca) → generate per kalimat. Atribut voice design dilatih dari data Cina/Inggris, kontrol terbatas |
| **ElevenLabs Voice Design** (`/v1/text-to-voice/design`, `eleven_ttv_v3`) | ya | suara baru dari deskripsi bebas, disimpan jadi milik akun | ±1 kredit per karakter teks contoh (±240 per panggilan, 3 kandidat) | kandidat B1–B6 |
| **ElevenLabs pustaka** (Arunika, Dhea, Ahmad, Dany Saputra) | ya | tidak, suara generik pustaka | ±216 kredit untuk 4 suara × 179 karakter | ditolak Irfan: terdengar seperti suara video AI pada umumnya |
| **Gemini TTS** (`gemini-3.8-flash-tts`, Google AI Studio) | ya (daftar bahasa resmi) | voice design dari deskripsi bahasa alami + voice replication | perlu API key Gemini dari AI Studio | belum diuji: butuh API key dari Irfan |
| Google Flow | — | — | — | alat pembuat video (Veo), bukan TTS; narator konsisten sepanjang video tidak terjamin |
| Qwen3-TTS VoiceDesign | tidak (10 bahasa: zh en ja ko de fr ru pt es it) | — | — | — |
| Fish Speech / OpenAudio S1, Chatterbox Multilingual, IndexTTS2 | tidak tercantum | — | — | — |

## Sumber
- OmniVoice: https://github.com/k2-fsa/OmniVoice (README, `docs/languages.md`, `docs/voice-design.md`), https://huggingface.co/k2-fsa/OmniVoice
- Gemini TTS: https://ai.google.dev/gemini-api/docs/speech-generation, https://ai.google.dev/gemini-api/docs/voice-design
- Qwen3-TTS: https://github.com/QwenLM/Qwen3-TTS
- ElevenLabs API: `/v1/models`, `/v1/shared-voices`, `/v1/text-to-voice/design` (dipanggil langsung)
