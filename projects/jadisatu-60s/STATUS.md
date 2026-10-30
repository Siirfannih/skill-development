---
status: evidence
scope: jadisatu-60s
how_to_use: "Catatan fase The Gap. Bukan kriteria sukses proyek lain."
---

# STATUS — The Gap (Jadisatu) · Remotion

_Update terakhir: 26 Okt 2026, 18:00 WITA · versi terakhir: **v18** (`render/TheGap-Jadisatu-v18.mp4`, 95,0 dtk, 1920×1080 @ 30 fps; versi lama ada di riwayat git)_

## Fase sekarang
Video sudah lolos penilaian Irfan ("udah oke untuk kualitasmu saat ini", 26 Okt 17:06). v13 = evaluasi mandiri terhadap referensi setelah itu. v14 = finishing: durasi dipadatkan lewat VO (D-034). v15 = audio diorkestrasi ulang dengan ElevenLabs Music/SFX + fisheye di penutup (D-035). v16 = finishing review CD + audit audio HP (D-036). v17 = audio nyaman: palet SFX halus + disiplin pita (D-037). v18 = SFX disinkronkan ke onset objek, pembuka tanpa hantaman (D-038). Fase berikutnya: iterasi lanjutan bila Irfan memberi catatan baru, lalu turunan format (Reels 9:16) bila diminta.

## Keputusan terkunci (jangan diubah tanpa Irfan)
- **Naskah & VO**: `SCRIPT.md` final; VO ElevenLabs suara Jadisatu (clone `1I8tElkHzrblGqkJtwn3`, eleven_v4). Kata Inggris ditulis dalam kutip (`"taste"`) agar dibaca Inggris. Tanpa VO Jadisatu di akhir, hanya wordmark.
- **Timing VO v14**: `vo/v3` = VO v2 dipercepat 5 % + jeda dipadatkan oleh `tools/tighten.py` (sumber: `video/src/vo_v13.json` + `vo/v2`). Ubah target jeda di skrip itu, jangan edit `vo.json` manual. Cek dengan `tools/vo_gaps.py video/src/vo.json vo/v3`.
- **Palet**: ink #0A0A0A, putih, biru #2563EB hanya di latar terang, coral #F97066 sebagai tanda salah. Tidak ada teks/elemen biru di latar gelap. Tanpa abu-abu (D-024).
- **Font**: Geist (UI/teks), Instrument Serif italic hanya untuk "the gap", Inter/Source Serif untuk UI ChatGPT/Claude, Fraunces/Bricolage/DM Sans di desain hasil karya.
- **Aturan teks/visual**: teks dulu di tengah lalu visual; visual kuat = tanpa teks; hitam = fokus, putih = transformasi; tidak ada headline pojok kiri atas.
- **UI produk asli**: ChatGPT (S2) dan Claude (S3), satu kegiatan = satu sesi. Tanpa logo merek yang digambar ulang (nama produk saja; logo resmi bisa dipasang bila Irfan memberi file).
- **Negative effect** hanya di "taste berhenti", SFX camera click.
- **Musik per babak (v15)**: 6 cue ElevenLabs di `music/` (hook → longing → acceleration, stop keras di "berhenti" → held breath → braam + pressure → sameness/void) lalu "nightfall future bass" (Kenyset) dengan drop di "seleramu.". SFX: Kenyset + `sfx/el/` (ElevenLabs; di repo: `remotion/sfx-el/`).

## Struktur adegan (frame @30 fps, ikut `video/src/vo.json`)
| Adegan | File | Isi |
|---|---|---|
| S1 0–7 dtk | `S1.tsx` | "Ada ⟷ jarak" terbelah, kurva SELERA/KEMAMPUAN dengan kamera mengikuti ujung garis, menyelam ke Ira Glass "the gap" |
| S2 7–24 dtk | `S2.tsx` | karya di bawah garis selera; grid "Dan rasa kecewa…" (kamera baca per kata); ChatGPT landing page; dinding hasil; taste berhenti (close-up → negative → wide) |
| S3 24–45,5 dtk | `S3.tsx` | lingkaran "kita" vs tile ChatGPT/Claude/Gemini; kalimat dibangun kata per kata (gaya Baikov); 4 sesi Claude; hasil nyata + "cukup."; kartu beragam → template AI identik, disapu kamera |
| S4 45,5–55,4 dtk | `S4.tsx` | "Ira Glass bilang," grafik banyak karya; ribuan titik; lensa "0 yang mengecewakan" |
| S5 55,4–72,3 dtk | `S5.tsx`, `S5Art.tsx` | 3 kartu foto; Pengalaman (8 draft logo Senja, kamera menyusuri coretan); Direction (5 arah desain); Cara melihat (loupe di landing page) |
| S6 72,3–95 dtk | `S6.tsx`, `S6Art.tsx` | Rick Rubin (foto kiri, teks kanan); album; studio Logic 8 take → "bagus."; "AI bisa…" + chip gambar; pusaran → orbit → kartu kaca + kursor; wordmark |
| Desain hasil AI | `Designs.tsx` | 11 desain nyata (landing page Senja, app lari, poster, IG, deck, toko, reel, CV, rencana bisnis, caption, template AI generik); papan QA = komposisi `Board` |
| UI produk | `RealUI.tsx` | ChatGPT & Claude (empty state, composer, lampiran, Berpikir, streaming) |
| Efek | `FX.tsx` + `fx.json` | RGB split, flash, negative; `fx.json` juga dibaca `tools/audio_build.py` untuk SFX |

## File kunci
- `remotion/video/` — proyek Remotion 4.0.538 (`npm i` lalu `npx remotion render TheGap out.mp4 --muted`).
- `remotion/tools/audio_build.py` — VO + SFX (Kenyset + sintetis) + musik per babak + mix −14 LUFS / −1,5 dBTP stereo. Lembar cue → `render/cues.json`.
- `remotion/tools/timing.py`, `wh.py` — timestamp kata VO (faster-whisper) → `vo.json`.
- `remotion/vo/` — VO per chunk (mp3 + trim wav). `remotion/sfx-extra/` — shutter/click Remotion + katalog earshot pack Kenyset.
- Path di tools masih absolut ke `/home/claude/thegap` (lingkungan cloud). Untuk dijalankan di Mac: ganti `ROOT` dan arahkan `SFXD` ke `~/Downloads/Kenyset [FREE SFX PACK]` + `sfx-extra/`.
- Alur audio v18: `audio_build.py --nosync` → `sync_cues.py render/<silent>.mp4` → `audio_build.py` → `audio_phone.py --fix` (opsional) → `audio_build.py`.
- QA audio v16: `tools/audio_phone.py [--list|--fix]` (HP 20/50/100 %, kejelasan VO, 2–6 kHz) dan `tools/visual_coverage.py render/<video>.mp4` (setiap event visual harus punya suara).
- QA: earshot (`earshot critique`, `measure`), contact sheet `tools/stills.sh`, cek gap musik (RMS per 0,5 dtk pada stem musik).

## Sisa pekerjaan / ide iterasi berikutnya
- Logo resmi ChatGPT/Claude/Gemini di tile beat "takut digantikan" (butuh file dari Irfan).
- Versi 9:16 untuk Reels (reframe per adegan, bukan crop).
- Riwayat revisi & pelajaran: `DECISIONS.md` (D-028 dst.) dan `claude/motion-graphic/RETRO.md` + rules inti 15–32.
