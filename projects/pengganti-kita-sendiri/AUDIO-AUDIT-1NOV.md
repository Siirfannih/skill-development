# Audit audio, 1 Nov 2026: kenapa SFX v3 gagal padahal The Gap dan video #2 berhasil

Permintaan Irfan (1 Nov 00.23):
1. Periksa setelan dan feedback audio di The Gap dan video #2.
2. Audit ulang referensi audio.
3. Pakai bagian yang bisa diterima dari audit independen `sd_v14`, hapus semua SFX, lalu susun ulang.

## 1. Apa yang membuat The Gap dan video #2 lulus

Diambil dari `jadisatu-60s/remotion/tools/audio_build.py`, `sync_cues.py`, D-035–D-038, dan `jadisatu-video2/audio/mix_v4.py`.

- **Sumber**: Kenyset dan ElevenLabs dengan prompt "dry, clean, no bass" (video #2), dipakai mentah tanpa LPF gelap.
- **Pita per keluarga**:
  - UI: 300 Hz–8 kHz dengan cekungan −4 dB di 2,8–4,5 kHz;
  - gerak: 400 Hz–2,5 kHz;
  - low: di bawah 2 kHz + body.
  - Tanpa saturasi.
- **Penempatan**:
  - satu bunyi per event;
  - `sync_cues.py` menggeser cue ke onset visual ±7 frame, dan cue yang tidak punya visual dibuang;
  - maksimal 2 bunyi per 100 ms, tidak boleh dua bunyi sekeluarga dalam 100 ms.
- **Mix**:
  - VO kering;
  - SFX −3 dB saat kata diucapkan;
  - musik memompa ≤ 1,5 dB;
  - duck dua pita.
- **Feedback Irfan yang membentuknya**:
  - The Gap 19.20: SFX kasar karena desis, goresan, dan saturasi;
  - The Gap 19.33: transisi pakai whoosh tipis pita tengah atau glitch, tidak ada hantaman tanpa visual, SFX mendarat bersama objek;
  - Tuntunly: "1 frame = 1 message";
  - 31 Okt: setiap SFX harus punya peran (anti-spam);
  - 1 Nov: 1 adegan, 1 pesan, 1 SFX.

## 2. Apa yang berubah di Pengganti Kita Sendiri v12–v13

| Perubahan | Asal | Akibat |
|---|---|---|
| Bank SFX sintetis `pool/bank/b_*.wav` + Mixkit acak | keputusan Claude; gerbang sumber tidak dijalankan | palet bukan "Apple style" |
| Taksonomi Modul 3: felt/wood pop, thock LPF 1,5 kHz, micro-tick + felt pulse, sub thump di bawah setiap whoosh, flutter kertas | **audit Gemini 31 Okt 21.37**, dikodekan ke `audio.md` §14.5/§14.8 dan `sfx_rules.py` | bunyi kayu yang gelap; dua bunyi per event (melanggar 1 event 1 SFX) |
| Gerbang pita "sub 25–55 %, low-mid < 42 %" | **Gemini**, dari referensi musik tanpa VO (Krea 2, Renaissance) | Claude menambah sub-pad **sinus** 41/62/82 Hz supaya lolos gerbang, sehingga bed jadi 5,8 dB di bawah VO dan transien SFX tenggelam |
| `Refference-audio.json`: "Max 5–6 cues per act", "dampened mechanical switches", "UI taps LPF 4,5 kHz" | **Gemini** | pola pikir membatasi SFX dan menggelapkannya |
| Reverb buatan pada VO (`vo_verb_db −22`) | keputusan Claude (terbawa dari permintaan "5 % room reverb" di Tuntunly, yaitu setelan proyek lain) | VO menggema |
| Kata kinetik diberi ketukan kayu; versi `sd_v14` menghapus semuanya | Gemini/sd_v14 | kata tidak punya SFX yang benar |

**Jawaban untuk pertanyaan Irfan: dua-duanya.** Tabel Gemini mengubah aturan workflow (§14.5/§14.8/§14.10). Kesalahan dasarnya ada di Claude: aturan itu diterapkan tanpa dibandingkan dengan data proyek yang sudah lulus (The Gap) dan referensi segenre. Itu melanggar aturan Irfan bahwa laporan Gemini harus diverifikasi.

## 3. Audit referensi (diukur, `scripts/audio/sfx_profile.py`, demucs `no_vocals`)

| | Event menonjol/dtk | Puncak SFX vs puncak VO | Bed vs VO | Sub / low-mid |
|---|---|---|---|---|
| Audio.mp4 (ref Irfan, tanpa VO, gaya motion) | 2,45 | — | — | klik ber-centroid 8–10 kHz; whoosh 1,4–1,9 kHz, tanpa energi > 6 kHz |
| Emotion.mp4 (ref Irfan, narasi dokumenter) | 0,89 | −4 dB | −10,5 dB | 18 % / 64 % |
| The Gap v18 (lulus) | 2,05 | −10 dB | −14,8 dB | 14 % / 63 % |
| PKS v3 (ditolak) | **0,26** | — | **−5,8 dB** | 27 % / 40 % |
| **PKS v4 (audio v14)** | **1,84** | **−9 dB** | **−13,4 dB** | 15 % / 55 % |

## 4. Audit independen `sd_v14`: yang dipakai dan yang tidak

**Dipakai:**
- VO tanpa reverb.
- Rantai EQ narator.
- Ekor kata +70 ms dengan raised-cosine. Timeline sudah diverifikasi identik.
- Kompresor klip release 220 ms.
- Room tone dibatasi. Batasnya dilonggarkan ke −32…−40 dB karena −38…−46 dB menimbulkan celah mati.
- Sub-pad sinus dan akor sinus penutup dihapus.
- Desis dihapus.

**Tidak dipakai:**
- `apple_sfx/*.wav`, yang dipahat dari video referensi orang lain. Ini bukan stok Irfan, termasuk `apple_outro_tail` felt-piano.
- Penghapusan semua SFX kata. Irfan justru meminta setiap kata diberi SFX.

## 5. Penyusunan ulang (v14)

Semua bunyi lama dihapus. Event diambil dari anotasi visual per adegan ditambah log frame kemunculan kata dari render (`KWord`/`SlotWord`, `inputProps.sfxlog`). Satu peran memakai satu bunyi (lihat `audio.md` §14.8), lalu disinkronkan ke onset visual (`sync14.py`).

Hasil: 273 cue, termasuk ketikan yang digabung per kalimat. Ke-81 kata kinetik semuanya bersuara. Gema VO (energi ekor setelah kata) turun dari −19,8 dB menjadi −27,3 dB, dan tidak ada celah < −45 dBFS. File ada di `audio-v14/`.

## 6. Devil's advocate (agent independen) → perbaikan

Verdict pertama: FIX-FIRST. Yang lulus:
- VO kering;
- tidak ada sumber sintetis;
- level setara The Gap;
- bunyi kata tepat 1 frame setelah kata muncul.

Yang diperbaiki:
1. **15 cue mendahului objek 2–5 frame.** `sync14.py` sekarang hanya boleh menggeser cue ke belakang. Hasil: 0 cue mendahului.
2. **Dua bunyi untuk satu event (≤ 2 frame).** Hanya bunyi yang lebih penting yang disimpan, dan riser berakhir 3 frame sebelum hit. Tersisa 1 pasangan.
3. **Musik terlalu dekat dengan VO di babak 2–3** (8,8 dB). Duck ostinato −10 dB dan musik di bawah VO −26,5 LUFS. VO sekarang 10,5–19,6 dB di atas musik di semua blok.
4. **Klik saklar berdesis** (17×). Diganti `soft-ui-pop-light-minimal-click`.
5. **Ujung klip Altman.** Blip suku kata sesudah «tell.» dipotong dengan fade 50 ms.
6. **Whoosh.** Sekarang satu file (`whoosh-gelombang`), sesuai aturan satu peran satu bunyi.
7. **Kode mati** (sub-pad sinus dan IR reverb) dihapus dari `mix14.py`.

Yang sengaja tidak diubah, untuk diputuskan Irfan:
- **Langkah kaki piktogram (99–101 dtk, 54 dtk) dibiarkan tanpa bunyi.** Langkah kartun pernah dilarang, dan pergerakannya sudah diwakili whoosh kamera.
- **Klik kata `ipad_click` tetap dipakai.** Energinya 88 % di 2–6 kHz, tetapi letaknya 16 dB di bawah VO dan sesuai referensi Audio.mp4 (klik terang).
