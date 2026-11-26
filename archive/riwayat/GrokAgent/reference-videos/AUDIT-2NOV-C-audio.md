# Audit 2 Nov — C: Audio (+ visual singkat)

Video yang diaudit:
- **REF** = `26696d42-Audio.mp4` (23 s, 1280×720, 24 fps): spot promo Zapier. Musik + SFX saja, **tanpa VO** (stem vokal demucs −33 LUFS = sisa bocoran; Whisper pada stem vokal = kosong).
- **OWN** = `ac3ec985-siirfannih_DbDyLzSRqMI.mp4` (91 s, 960×720, 24 fps): talking head + arsip + meme, VO terus-menerus, BGM, caption per kata. Ini video yang sama dengan `03_renaissance` di AUDIO-ANALYSIS.md (90,6 s, −14,4 LUFS, cocok).

Metode: ffmpeg ebur128 (LUFS/true peak), **demucs htdemucs** (vokal | drums+bass+other = non-vokal), RMS 50 ms/300 ms, lantai bed = persentil-20 bergulir 2 s, puncak SFX = lokal-maks ≥6 dB di atas lantai, band FFT per jendela 300 ms, selisih frame 24 fps untuk peristiwa visual. Skrip: `/home/claude/refaudit/C/scripts/`.
Batasan: demucs tidak memisahkan musik dari SFX. "SFX" di sini = aksen non-vokal di atas lantai bed. Di OWN, sebagian besar aksen low-end adalah kick musik (lihat §3).

## 1. Loudness

| | REF | OWN |
|---|---|---|
| Integrated | −17,8 LUFS | −14,4 LUFS |
| True peak | **+2,0 dBTP** (over, jangan ditiru) | +0,1 dBTP |
| LRA | 8,7 LU | 4,3 LU |
| Stem vokal (VO) | — (tanpa VO) | −16,0 LUFS, puncak −0,3 dBFS |
| Musik (bass+other) | −22,2 / −47 LUFS | −24,1 LUFS → **−8 LU dari VO** |
| Non-vokal total | −19,1 LUFS | −20,0 LUFS |

## 2. Verifikasi aturan "−21 s/d −41 dB = BACKSOUND, bukan SFX"

| Ukuran (dBFS, RMS) | REF | OWN |
|---|---|---|
| Lantai backsound (p20/2 s), p5..p95 | **−35,1 .. −23,4** (median −32,8) | **−45,7 .. −19,9** (median −29,7) |
| Porsi waktu bed di dalam [−41, −21] | **100 %** | 72 % (keluar di babak sepi 60–70 s dan babak padat 20–40 s) |
| SFX, RMS 300 ms, p10..p90 | **−25,3 .. −16,1** (median −21,0) | −28,6 .. −17,6 (median −21,7) |
| SFX terkeras | thud logo akhir **−11,6** (puncak −1 dBFS) | — |
| Puncak sampel SFX | −1 .. −9 dBFS | — |
| Ucapan VO, RMS 300 ms | — | **−19,8** |

**Kesimpulan: terkonfirmasi.** −21..−41 dBFS adalah rentang *backsound/bed*. SFX berada di batas atas rentang dan di atasnya (RMS −16..−25, puncak −1..−9 dBFS), yaitu **+6 s/d +25 dB di atas bed** (median sekitar +14). Kalau SFX dipasang di −21..−41, SFX akan tenggelam ke dalam bed.

## 3. Level relatif VO (OWN) dan relatif bed (REF)

| Kelas (dari spektrum + attack) | OWN: N | OWN: RMS300 rel. VO | OWN: di atas bed | REF: N | REF: RMS300 dBFS | REF: di atas bed | Centroid | Attack→puncak |
|---|---|---|---|---|---|---|---|---|
| Impact/sub (≥70 % energi <500 Hz) | 112* | −0,7 dB (−7,7..+2,8) | +12,9 | 11 | −18,8 (−21..−16) | **+17,7** | 45–170 Hz | 50–240 ms |
| Mid tonal / badan whoosh 0,5–2 k | 16 | **−5,7** (−7..−2) | +9,8 | 5 | −21,3 | +14,7 | ~1,3–1,7 kHz | ~400 ms |
| Whoosh/riser/swish (udara 6 k+) | 3 | **−8 .. −22** | +9,3 | 6 | −25,1 | +9,1 | 4–11 kHz | ≥400 ms (riser naik dulu) |
| UI/tik (cepat) | 5 | **−13,2** (−18..−12) | +13,3 | 2+8† | −21 .. −23,5 | +9..+15 | ~1,5–2,3 kHz | 10–50 ms |
| Backsound (lantai) | — | **−10,6 median** (p10 −24, p90 −1) | 0 | — | −32,8 | 0 | — | — |

\* OWN: 112 kejadian low-end punya IOI 0,25–0,55 s (sesuai grid tempo drum ~152 BPM), jadi kebanyakan adalah **kick musik, bukan SFX diskret**. Angka −0,7 dB itu level beat, bukan level SFX.
† REF 10–13,3 s: tiap item daftar ("project management" dst.) memakai **sepasang tik** (jarak ~0,13–0,15 s), ~−21 dan ~−23,5 dBFS, centroid 1,5–2,3 kHz. Tiknya hangat di band mid, bukan piezo 4 kHz.

Backsound per babak (OWN, bed − ucapan, per 5 s): 0–15 s −7..−17 · **20–40 s −1..−2 (musik hampir setara VO, babak klimaks "printing press")** · 45–70 s −17..−25 (babak tenang) · 75–90 s −10..−11.

## 4. Dead air, ducking, sinkronisasi

| | REF | OWN |
|---|---|---|
| Dead air (non-vokal < −55 dBFS ≥300 ms) | **0** (minimum −38 dBFS) | **0** (minimum −49 dBFS) |
| Ducking | t/a (tanpa VO) | **Tidak ada sidechain klasik.** Musik di dalam jeda VO hanya naik median +2,6 dB. Di jeda batas babak (11,3 · 46,2 · 54,6 · 63,9 s) jeda diisi hit/swell **+10..+16 dB**, lalu musik turun lagi saat VO masuk. |
| Sinkronisasi impact ↔ peristiwa visual | **78 % dalam ±83 ms (2 frame)**, median +20 ms (visual sedikit setelah onset; puncak tepat di frame) | 49 % dari kejadian low-end yang dekat cut (wajar, karena ini beat musik) |
| Whoosh/riser | Mulai ~400 ms sebelum visual, puncak di frame transisi | Hanya 3, keduanya di cut (±5 ms) |

Klaim lama di AUDIO-ANALYSIS.md yang dikoreksi:
1. File itu **tidak memuat REF (Zapier)** sama sekali. Isinya 5 video lain.
2. Demucs dulu tidak dijalankan, jadi file lama **tidak punya angka VO vs BGM vs SFX**.
3. "Sync 86,7 % ±80 ms" untuk Renaissance terlalu longgar. Dengan 5,45 onset/s, cocok secara kebetulan saja sudah ~58 %.
4. "0 gap" terkonfirmasi.

## 5. Musik per babak (REF, 23 s)

| Waktu | Visual | Audio |
|---|---|---|
| 0–2,2 | Ketik "Running a business is often chaotic…" | Bed terang (rolloff ~10 kHz), lantai −23,5; sub boom pembuka −19 |
| 2,25–2,7 | Glitch gelap "Not any more" | 2 sub hit −16 dBFS (+18 dB di atas bed), lantai turun ke −28 |
| 3,7–4,7 | Bar oranye → blob | 2 riser udara (−24, centroid 6–9 kHz), puncak di blob |
| 5,5–9,6 | "Automate" raksasa, pan + motion blur | **Bed di-low-pass (rolloff ~4,5 kHz)**; sub hit di tiap pergantian (5,54 · 8,06 · 9,46) |
| 9,6–13,3 | Daftar fitur berganti | Tik pasangan per item, ~0,7 s sekali |
| 13,6 / 15,0 / 16,5 | "And many more" → "9000+" → diagram | Sub thud −16..−21 (+17..+20 dB) |
| 19–21,7 | Prompt box di lanskap | Filter terbuka lagi (rolloff ~10 kHz), swish udara −26..−28 (pelan) |
| 22,06 | Logo/avatar | **Thud akhir −11,6 dBFS RMS, +25 dB di atas bed**, momen terkeras |

Polanya: **satu palet dengan filter sweep per babak** (tertutup saat bagian "fitur", terbuka saat "hasil/solusi"), dan hit paling keras disimpan untuk logo.

## 6. Visual singkat

| | REF | OWN |
|---|---|---|
| Transisi | Glitch/negatif gelap (0,4 s), morph blob-mask, whip-pan kata raksasa + motion blur, hard cut ke oranye penuh, push-in ke UI | Hard cut ~0,56 s (162 peristiwa/91 s), arsip/meme diselingi talking head |
| Kamera | Pan horizontal menyapu kata; zoom-in ke blob/logo | Statis, ganti cut |
| Teks: posisi | Kalimat di tengah (y ≈ 50 %); daftar di tengah dengan label kiri | Caption per kata di tengah-bawah (y ≈ 55–70 %), kadang menyebar kiri-kanan |
| Teks: ukuran | Dua skala: kalimat kecil (~3 % tinggi) vs kata hero raksasa (≥60 % tinggi) | Seragam (~5 %) dengan pengecualian penekanan (serif italic "the Renaissance", "art" besar, "1440" emas 3D, "printing" merah) |
| Kapitalisasi | Sentence case | Sentence case, tanda baca tetap tampil |
| Warna/kontras | Hitam di krem, putih di cokelat gelap, oranye sebagai aksen kata kunci | Putih tebal + bayangan di atas footage (keterbacaan berubah-ubah di latar terang) |
| Tanpa teks | Transisi blob, lanskap (selain UI), avatar akhir | Hampir tidak pernah |

## 7. Apa yang bagus & mengapa
- **Bed tidak pernah mati** (lantai ≥ −38 dBFS), jadi emosi tetap tersambung. Tekanan dibuat dengan *filter* (low-pass ↔ open), bukan dengan senyap.
- **Hierarki SFX jelas**: sub thud = momen kunci (+15..+25 dB di atas bed), tik = item daftar (+9..+15), riser/swish = paling pelan (+9). Momen terkeras disimpan untuk logo.
- **Tik UI hangat** (centroid 1,5–2,3 kHz, bukan 4 kHz), jadi tidak bikin lelah telinga.
- **Riser naik ~400 ms lebih dulu dan memuncak tepat di frame**; impact jatuh ≤2 frame dari visual.
- OWN: musik **tidak ditekan saat VO** (bed −8 LU dari VO). Energi diatur dengan mengisi jeda batas babak memakai hit/swell, dan musik mengikuti babak (klimaks 20–40 s, tenang 45–70 s).

## 8. Aturan angka yang bisa diterapkan (VO dinormalisasi ≈ −16 LUFS / ucapan RMS300 ≈ −20 dBFS)

| Elemen | dBFS (RMS 300 ms) | Relatif VO (RMS ucapan) | Relatif bed |
|---|---|---|---|
| Backsound saat VO | **−21 .. −41** (target median −30) | **−10 dB** (rentang −8..−18; LUFS: −8..−12 LU) | 0 |
| Backsound di babak tenang/reflektif | −36 .. −44 | −17 .. −25 dB | — |
| Backsound di jeda ≥0,3 s | naik +2..+3 dB; di batas babak isi hit/swell +10..+16 dB | — | — |
| Impact/sub thud (momen kunci) | −16 .. −21; maksimal satu thud final −12 | −0 .. +4 dB (impact di jeda VO) / −6 dB bila menimpa VO | +15 .. +20 (final +25) |
| Badan whoosh 0,5–2 kHz (transisi) | −21 .. −25 | **−6 dB** | +10 .. +15 |
| Swish/riser udara 4–10 kHz | −25 .. −28 | **−8 .. −12 dB** (jangan lebih keras) | +9 |
| UI tik/klik (centroid 1,5–2,3 kHz) | −21 .. −24 (pasangan: kedua −2,5 dB) | **−13 dB** di bawah VO | +9 .. +15 |
| Dead air | lantai non-vokal tidak pernah < −45 dBFS selama >300 ms | — | — |
| Ducking | tanpa sidechain dalam; bila dipakai ≤3 dB, attack ~50 ms, release ~300–500 ms | — | — |
| Sinkronisasi | impact: puncak ±1 frame dari visual (±42 ms); riser/whoosh: onset −400 ms, puncak di frame | — | — |
| Master | −14 LUFS, true peak ≤ −1 dBTP (REF +2 dBTP = over) | — | — |

Catatan: level SFX relatif VO dari OWN hanya berlaku untuk mid/udara/UI (5–16 sampel). Level impact relatif bed diambil dari REF yang tanpa VO. Untuk impact yang menimpa VO, angka −6 dB adalah inferensi (impact terkeras REF −16 dBFS dibanding ucapan −20 dBFS), jadi perlu diuji di HP pada volume 20/50/100 %.
