# Pelajaran yang menunggu keputusan Irfan

Dibaca di awal setiap sesi (lihat `AGENTS.md`). Satu baris per pelajaran. Irfan menjawab **ya** (pindahkan ke skill tujuan lalu hapus barisnya), **tidak** (hapus barisnya), atau membiarkannya. Model tidak memakai baris di sini sebagai aturan.

Sumber: `[I]` = ada kata Irfan, `[A]` = analisis AI. Ringkasan dibuat 4 Nov dari branch dan RETRO yang belum masuk skill.

## Audio / SFX

| # | Pelajaran | Sumber | Tujuan |
|---|---|---|---|
| A1 | SFX dan musik ElevenLabs selalu lewat API (kunci dari Keychain Mac), bukan konektor/plugin | [I] Fore #36: "harus digenerate via api bukan via plugins" | `audio.md` |
| A2 | Video berbasis lagu berlirik: level SFX relatif lagu (utama −9 dB, halus −14 dB), duck lagu ≤ 1,5 dB, cek speaker HP | [A] Fore R9: 35 dari 50 SFX tenggelam | `audio.md` |
| A3 | Gerbang keterdengaran: gain dari RMS 300 ms terkeras relatif ucapan; ≥ 85 % cue ≥ −10 dB terhadap dialog+bed. Sebagian sudah ada di aturan 30 dan `three-segment-gate.md` | [I] keluhan 2 Nov "tidak ada sfx sama sekali" + [A] akar masalah | `audio.md` |
| A4 | Pita 2–6 kHz jangan dipotong sampai nol; fraksi ≤ ±0,30 dianggap wajar | [A] bedah 5 referensi (Maximus) | `audio.md` |
| A5 | Target global: potongan ≤ 80 ms dari beat/onset, −14,5…−12,5 LUFS, VO 2,5–3,7 kata/dtk | [A] bedah 5 referensi (Maximus) | `audio.md` |
| A6 | Kenyset bukan pustaka wajib; "hanya rekaman asli" dan "5 efek per 10 dtk" bukan syarat lulus | [A] kartu kandidat 30 Okt | `audio.md` |

## Visual / build

| # | Pelajaran | Sumber | Tujuan |
|---|---|---|---|
| V1 | Tokoh yang menyentuh benda (kasur, meja, pintu) tidak dibuat dari sprite 2.5D; pakai klip AI per shot, Remotion untuk perakitan | [I] Fore v5 "efek melayang" | `build.md` |
| V2 | Ukur energi tepi aset AI vs referensi (640 px, FIND_EDGES); target ≤ referensi, kalau lebih → sederhanakan | [A] Fore R3: aset 3–8× lebih padat → "AI slop" | `analysis-qa.md` |
| V3 | Jangan posterize render jadi; bidang bersudut datang dari gambar, grading hanya angkat hitam/grain | [A] Fore R4 | `direction.md` |
| V4 | Overlay di adegan berkamera ikut transformasi kamera; pan dijepit abs(x) ≤ 960·(s−1) | [A] Fore R5, R6 | `build.md`, `camera-transition.md` |
| V5 | Ganti pose = ganti framing (cut); setiap transisi dunia butuh pemicu yang terlihat | [A] Fore R8, R15 | `storyboard.md` |
| V6 | Maksimal 2 job ChatGPT paralel; Flow pakai path lokal, bukan `asset:`; referensi shot tanpa tokoh = gambar tanpa orang | [A] Fore R2, R12, R13 | `build.md` |
| V7 | Pelat/kotak aksen boleh sekali bila brief meminta (pengecualian aturan 6) | [A] kartu usulan 30 Okt | `SKILL.md` aturan 6 |
| V8 | Montase banyak fokus boleh sebagai satu babak bernama (pengecualian aturan 1) | [A] kartu usulan 30 Okt | `SKILL.md` aturan 1 |
| V9 | QC visual ≥ 2 fps @960 px oleh reviewer segar; revisi komposisi gagal 2× → ganti pendekatan | [I] keluhan 2 Nov + [A] | `analysis-qa.md` |
| V10 | Karya portfolio: minimal 2 putaran reviewer independen sebelum kirim | [A] Fore R10 | `working-with-irfan` |

## Perlu ditutup

- RETRO 17–18 Okt (Jadisatu launch) masih berstatus "menunggu persetujuan", padahal isinya sudah terserap ke gerbang `motion-graphic` (format master, storyboard = struktur, validasi satu adegan). Usul: tandai "diterapkan".
- Kartu prinsip di branch `cursor/skill-load-order-3827` (`claude/principles/`) yang bukan usulan sudah sama dengan aturan inti; branch itu tidak perlu di-merge.
