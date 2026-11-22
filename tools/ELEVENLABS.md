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

## Katalog suara (voice ID per akun)

Voice ID hanya berlaku di akun pemiliknya. Suara kloning (IVC) dan rancangan (voice design) harus dibuat ulang di akun lain dari file contohnya; suara pustaka bersama (shared library) cukup ditambahkan lewat `POST /v1/voices/add/{public_owner_id}/{voice_id}` dan ID-nya tetap. Repo ini publik, jadi file contoh audio **tidak** disimpan di sini: ada di Google Drive Irfan `Claude edit/voice-samples/<nama>/`.

Akun yang dipakai: **akun 1** (lama, kunci di Mac), **akun Behindwork** (Starter; di PC kunci di `~/.secrets/elevenlabs_behindwork`, chmod 600), **akun cadangan** (Starter, dipakai bila akun Behindwork habis kredit; kunci di `~/.secrets/elevenlabs_cadangan`; belum berisi suara apa pun, jadi suara kloning/rancangan harus di-IVC ulang dulu). Dicek 22 Nov 2026.

| Suara | Akun | voice_id | Asal | Pindah ke akun lain |
|---|---|---|---|---|
| Jadisatu Narrator V3 — suara VO "The Gap" (perempuan, Indonesia) | akun 1 | `1I8tElkHzrblGqkJtwn3` | IVC | IVC dari 2 sampel di Drive `voice-samples/jadisatu-narrator-v3-the-gap/` |
| Jadisatu Narrator V3 (salinan akun 2) — suara yang sama dengan "The Gap" | akun Behindwork | `qs32dRxpAolcIUaxxAN9` | IVC dari sampel yang sama dengan `1I8t…` | sama seperti baris di atas |
| Jadisatu Narrator (draft V3, Inggris) | akun Irfan (Mac) | `EKW9kJAbsPJUsVgih66R` | voice design | lihat `claude/jadisatu-narrator-vo/SKILL.md` |
| Behindwork Narator B6 (perempuan, dokumenter) | akun Behindwork | `5qMyVFAs7U784uFuHUKh` | voice design `eleven_ttv_v3`; deskripsi di Drive `voice-samples/behindwork-narator-b6/*.json` | IVC dari `b6_design_preview.mp3` (voice design tidak bisa diulang persis) |
| Behindwork Narrator EN (I-wanita-1) — narator Inggris aksen netral, suara final Behindwork | akun Behindwork | `qXZxqSJGeo658ubNsfTl` | voice design `eleven_ttv_v3`; deskripsi + generated_voice_id di `projects/behindwork-batch-1/vo/en-netral/I_wanita_1.json` | IVC dari pratinjau di Drive `voice-samples/behindwork-narrator-en/` |
| Behindwork Narator B6 ringan (C3) | akun Behindwork | `Y62OZ57dKfXyAcWpVXk0` | remix B6 (`prompt_strength` 0,45) | IVC dari `voice-samples/behindwork-narator-b6-ringan-c3/c3_remix_preview.mp3` |
| Zephlyn (pria, Indonesia) | pustaka bersama | `3mAVBNEqop5UbHtD8oxQ` | shared library | tambahkan dari pustaka, ID sama |
| Defasyalala (perempuan, Indonesia) | pustaka bersama | `JaUVfDrFcfwGIsv8X2kN` | shared library | tambahkan dari pustaka, ID sama |
| Mike (pria, Amerika, santai-jenaka) | pustaka bersama | `cBTYF7NiJbR8Bvmdeuse` | shared library | tambahkan dari pustaka, ID sama; untuk teks Indonesia pakai `eleven_multilingual_v2` |
| Ashley (perempuan muda, Amerika, energik) | pustaka bersama | `bxiObU1YDrf7lrFAyV99` | shared library | tambahkan dari pustaka, ID sama; teks Indonesia stabil di `eleven_multilingual_v2` stability 0,45, style 0,20 (Turbo v2.5 membocorkan aksen Inggris) |

Cara IVC ulang di akun baru: `POST /v1/voices/add` (multipart: `name`, `files[]` = file contoh, `description`), lalu catat voice_id barunya di tabel ini.

## Ganti kunci (rotasi)

1. Buat kunci baru di elevenlabs.io → Profile → API Keys, hapus yang lama.
2. Di Mac: `security add-generic-password -U -a "$USER" -s elevenlabs-api-key -w 'KUNCI_BARU'` dan tulis kunci yang sama ke `.secrets/elevenlabs.key` (chmod 600).
