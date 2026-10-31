# Log uji 1 — «Pengganti Kita Sendiri» (31 Okt 2026)

## VO v9 (3 take/adegan, playback 1,0)
| Adegan | agy (3.8 flash high) | API (3 flash) | Metrik prosodi sendiri | Dipakai |
|---|---|---|---|---|
| s1 | t2 | — | t2 turun −4,6 st | t2 |
| s2 | t2 | — | t2 0 % naik | t2 |
| s3 | t2 | — | t2 turun −3,1 st | t2 |
| s4 | t3 | t1 | t3 turun −5,8 st (terbaik) | t3 |
| s5 | t1 | t3 | t1 turun −4,25 st (terbaik) | t1 |
| s6 | t2 | t3 | t3 9 % naik (terbaik), t2 38 % naik | t3 |

## Musik
CLAP (earshot, 206 track Mixkit): Echoes (Mixkit #188) — tag wajib z ≥ 3,0 di seluruh 0–140 dtk, tag terlarang ≤ 1,5. agy 9,5 USE, API 9 USE → **Echoes**.

## SFX (9 cue)
- agy menolak mk498 («ledakan literal») → boom pembuka diganti mk1686.
- API menolak mk2603 (dianggap tetesan air); agy menerimanya → tidak dipakai. Tekstur dibuat dengan ElevenLabs SFX (CLAP z +4,9 «tape hiss»), LPF 5 kHz, −37 dB, ikut hening saat Jensen.

## QC
| Putaran | Gerbang terukur | Gemini | Temuan diterima | Ditolak (dengan bukti) |
|---|---|---|---|---|
| r1 | LRA 8,7, I −14,2 | API (dengan catatan engineer): APPROVED | — | — (bias: catatan memuat angka) |
| r1 | earshot critique: close, 2 major (puncak 0:05 +4,9 LU; akhir −6,8 LU) | — | VO per adegan disamakan loudness-nya; boom penutup dinaikkan | profil launch film ≠ dokumenter (puncak +4,1 LU dibiarkan) |
| r2 | LRA 8,3 | API blind: REJECTED | hiss −3 dB; tekstur dimatikan saat Jensen; jeda pra-Jensen 1,8 dtk (boom 0,9 dtk + hening) | «musik terdengar saat Jensen» (rms musik 0,0); «jeda ±1 dtk» (terukur 1,5) |
| r3 | LRA 8,2, I −14,2, TP −1,9, jeda 0,8 | API blind: APPROVED (9/10/10) | — | «jeda sesudah klip ±1,0 dtk» (terukur 1,5 + ekor klip 0,4) |

## Putaran v10 (31 Okt 15:21) — ritme untuk visual fast motion
Masukan Irfan: mood sudah bagus, tetapi terlalu ambient dan lambat. Ada 4 perubahan struktural, dan playback VO tetap 1,0.

| Perubahan | Eksekusi | Terukur |
|---|---|---|
| Ostinato 115–122 BPM | 2 komposisi ElevenLabs E minor (A1 0–42 dtk, B2 sesudah Jensen → 06e). CLAP tag terlarang z ≤ 2, Gemini memilih A1 (9) dan B2 (10). Echoes di-LPF 1,2 kHz, −9 dB di bawah ostinato | 117,45 BPM, grid 1/8 = 0,255 dtk (`BEAT_GRID.json`) |
| J-cut rapat | klausa 0,12, daftar 0,05, antar ide 0,30. Jeda panjang hanya pra-Jensen 1,0, pra-Altman 1,05, pasca-Altman 0,66, dan pra-penutup 1,01 | total 126,55 dtk (v9: ±143) |
| Awal kata terpotong («AI akan» → «I akan») | batas potong diambil dari energi audio (ref −40 dB), bukan timestamp STT. Pre-roll 0,10 dtk dengan fade-in 100 ms, diterapkan ke semua potongan | — |
| Micro-tick | 14 tick di poin beruntun (02c, 03a, 05c–05g) + 3 tick agent, dikuantisasi ke grid 1/8, LPF 4 kHz. Tick pengisi tiap ketukan (83 cue) **ditolak**: menumpuk dengan ostinato | 26 cue total |

Gerbang: I −14,1, LRA 7,3, TP −2,0, musik pra −23,2 / pasca −18,0, musik saat Jensen rms 0 → PASS.
VO di atas musik, median / p10 (dB): Babak 1 21,4/8,4, Babak 2 15,6/8,0, Babak 3 11,2/4,3. Babak 3 adalah titik terlemah.

| QC | Hasil | Catatan |
|---|---|---|
| API blind ke-1 | REJECTED | Ditelusuri ke overrides yang masih memuat aturan lama (jeda 1,5 dtk, catatan "VO v8 ceria"). Gemini menilai v10 dengan aturan basi → overrides ditulis ulang ke nilai v10 |
| API blind ke-2 | APPROVED 9,5/10/8,5 | Tick agent −3 dB (diterima) |
| earshot critique fast | launch-grade 19/20 | Minor: hampir mono (side −18,5 dB) |

agy hang (bahkan ping "OK" timeout 2 menit), jadi QC agy tidak dijalankan.

Pelajaran:
- Konsep sound dicocokkan **per panel storyboard** (`STORYBOARD-SYNC.md`) dan diuji dengan devil's advocate (`DEVILS-ADVOCATE.md`). Di v9 hanya batas babak yang dicocokkan, dan itulah sebab v9 terlalu ambient untuk montase 6–8 frame.
- Overrides harus diperbarui setiap kali aturan berubah. Konteks basi membuat QC Gemini salah arah.
