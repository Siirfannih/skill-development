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

## Putaran v11 (31 Okt 16:06) — cold open supercut berita
Masukan Irfan: tidak boleh ada jeda di awal. Cold open diisi potongan berita yang dipotong cepat (seperti referensi siirfannih_DfDC0I9PHin), lalu transisi masuk ke VO.
- **Bedah referensi** (scribe diarize):
  - 4 pembicara, suara mulai di 0,10 dtk
  - jeda antar sumber 0,10–0,20 dtk, tidak ada keheningan
  - footage berganti per frasa
- **Sumber:**
  - Gates «AI is the biggest technical thing ever in my lifetime» (CNBC)
  - «16-year-old launched a new AI company» (Sky News)
  - «raised over a billion dollars» (Bloomberg)
  - «This time progress was so fast» (Sky News)
  - Masing-masing dipetakan ke teks layar FOUNDER / CEO / SEMALAM.
- **Unduhan:**
  - yt-dlp dari kontainer cloud terkena 429 / «Sign in to confirm you're not a bot».
  - Lewat VM Mac Irfan (jaringan rumah) berhasil dengan `--download-sections`, jadi hanya segmen yang diunduh.
- **Perakitan** (`assemble11.py`, blok `news`):
  - potong di timestamp kata, sambungan internal 30 ms, antar sumber 0,12–0,14 dtk
  - HPF 120 / LPF 9k, loudness −1 LU di bawah VO
  - STT ulang: semua kata utuh
- **Ostinato:** A1 (51,8 dtk) diperpanjang 2 bar tepat di ketukan (`OST_A1x`) karena Jensen bergeser +6,25 dtk.
- **Gerbang:** I −14,1, LRA 7,4, TP −2,0. Berita di atas musik median 20–25 dB.
- **QC Gemini API** (16 dtk pertama): APPROVED, tetapi «temuannya» merujuk 0:45–1:15 di luar potongan yang dikirim. Gemini membaca konteks, bukan audio. Pelajaran: untuk QC potongan, kirim konteks yang relevan saja (tanpa cues di luar rentang).

## Putaran v13 (31 Okt 21:37) — audit audio Modul 1–5
Irfan menyerahkan audit DSP Gemini dan menyatakannya sebagai masukannya sendiri: semua modul diterapkan, devil's advocate dijalankan di QC akhir. Angka diukur ulang dengan `claude/motion-graphic/scripts/audio_qa.py` (definisi sama untuk video kita dan referensi).

| Metrik | v2 | v13 | Ref Krea 2 | Ref Renaissance | Gerbang |
|---|---|---|---|---|---|
| Sub 20–150 Hz | 5,8 % | 26,3 % | 55,4 % | 39,3 % | 25–55 % |
| Low-mid 150–500 Hz | 67,9 % | 41,4 % | 33,6 % | 35,2 % | < 42 % |
| Penurunan > 18 dB/50 ms | 100 | 4 (0 di ujung klip) | 3 | 17 | 0 di ujung klip |
| VO per blok | −14…−16,5 | −14,2…−14,3 | | | −14 ± 1 |
| Klip narasumber | −15,1 / −21,3 (Jensen) / −20,4 (Altman) dB RMS | −14,8…−15,4 LUFS | | | −15…−15,5 |
| Musik di bawah VO | — | −23,5 LUFS | | | −22…−25 |
| Integrated / TP | −14,2 / −1,9 | −14,1 / −1,9 | −14,0 | −14,4 | −14…−14,5 / ≤ −1 |

Pelajaran:
- Low-mid tinggi berasal dari EQ narator sendiri (+1,5 dB @160), bukan hanya dari klip berita.
- Stem dialog mono harus diukur sebagai stereo; kalau tidak, VO terbaca 3 dB lebih pelan.

QC akhir v13 (devil's advocate):
- `loudnorm` dinamis pada klip pendek menaikkan ekor ruangan → dijalankan linear; ditambah mud cut kedua 220 Hz.
- Gate/expander dibuang karena tidak mengurangi gema dan menambah potongan mendadak.
- Room tone hanya di celah, LPF 1,5 kHz.
- Ramp musik di sekitar klip memakai kurva kosinus.
- Metrik gema autokorelasi dinyatakan tidak valid untuk ucapan; diganti ekor energi setelah akhir kata.
- Gemini API blind: APPROVED 9/10/9.

Gerbang final:

| Metrik | Hasil |
|---|---|
| Integrated / TP | −14,1 LUFS / −1,9 dBTP |
| Sub | 26,7 % |
| Low-mid | 40,4 % |
| VO per blok | −14,2…−14,4 LUFS |
| Klip narasumber | −15,1…−15,4 LUFS |
| Musik di bawah VO | −23,6 LUFS |
| Penurunan mendadak | 6, tidak satu pun di ujung klip (artikulasi ucapan asli + pre-drop penutup yang disengaja) |
