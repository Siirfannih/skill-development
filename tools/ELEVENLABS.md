# ElevenLabs — cara akses untuk session Claude

Kunci API **tidak pernah** ada di repo ini, di chat, atau di memori. Kunci disimpan di Mac Irfan, di dua tempat:

| Tempat | Isi | Dipakai oleh |
|---|---|---|
| macOS Keychain, service `elevenlabs-api-key` (akun = user Mac) | kunci (sumber utama) | perintah di Mac: `security find-generic-password -s elevenlabs-api-key -w` |
| `~/Documents/Skill-Development/.secrets/elevenlabs.key` (chmod 600, di-`.gitignore`) | kunci yang sama | skrip; session cloud yang terhubung ke Mac menyalinnya dengan `device_stage_files` (file disalin, isinya tidak pernah dicetak) |

## Cara pakai di session baru

- **Session di Mac (Claude Code / Desktop Commander):** `export ELEVENLABS_API_KEY="$(security find-generic-password -s elevenlabs-api-key -w)"` lalu jalankan skrip. Jangan `echo` kuncinya.
- **Session cloud yang terhubung ke Mac:** stage `…/Skill-Development/.secrets/elevenlabs.key` ke container, lalu salin ke `$MG_ROOT/.el_key` (chmod 600). Jangan `cat` isinya.
- Skrip `claude/motion-graphic/scripts/audio/el_music.py` dan `el_sfx.py` mencari kunci otomatis: `$ELEVENLABS_API_KEY` → `$MG_ROOT/.el_key` → `.secrets/elevenlabs.key`.
- Konektor ElevenLabs di claude.ai (MCP) adalah versi terbatas: bisa TTS dan transkripsi, **tidak bisa musik**. Untuk musik dan SFX, pakai API langsung lewat skrip di atas.

## Fakta akun (per 27 Okt 2026)

- Paket Starter: 40.000 kredit/bulan, maksimal **2 request bersamaan** (lebih dari itu → HTTP 429).
- Endpoint yang dipakai: `POST /v1/music` (`composition_plan`, `model_id: music_v1`), `POST /v1/sound-generation` (`text`, `duration_seconds`, `prompt_influence`), `GET /v1/user/subscription` (cek kredit).
- Suara narator Jadisatu (VO "The Gap"): voice `1I8tElkHzrblGqkJtwn3`, model `eleven_v4`.

## Ganti kunci (rotasi)

1. Buat kunci baru di elevenlabs.io → Profile → API Keys, hapus yang lama.
2. Di Mac: `security add-generic-password -U -a "$USER" -s elevenlabs-api-key -w 'KUNCI_BARU'` dan tulis kunci yang sama ke `.secrets/elevenlabs.key` (chmod 600).
