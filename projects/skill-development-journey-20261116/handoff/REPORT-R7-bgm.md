# REPORT · TASK-R7-bgm · D-460

**Siap ditinjau. QA teknis TASK lolos, 12/12 pemeriksaan.** Dua track lokal mengganti bed R4; suara dan SFX R6 tetap ×1,0. Pratinjau dipasang pada visual R6 sesuai TASK.

- [Pratinjau BGM baru](../audio/r7/pratinjau_bgmbaru.mp4)
- [Stem musik R7](../audio/r7/stem_musik_r7.wav)
- [Mix BGM baru](../audio/r7/mix_r7_bgmbaru.wav)
- [Mix BGM lama, salinan persis R6](../audio/r7/mix_r7_bgmlama.wav)
- [Pembangun](../audio/r7_bgm.py), [verifikasi](../audio/r7/verification.json), [grafik level](../audio/r7/qa_levels.png)

**Batas QC publikasi:** true peak WAV **-0.3 dBTP** dan AAC **-0.3 dBTP**, sehingga gerbang master −1 dBTP belum lolos. Puncak sampel yang diminta TASK sudah lolos. Laporan R6 mencatat −0,2 dBTP pada basis lama. Detail ini diteruskan kepada Sutradara sebelum master publikasi.

## Cakupan dan dasar pilihan

Ledger **D-460**, “BGM terlalu slow dan kurang cocok”: hanya BGM baru, mix pembanding, mux, kredit, dan bukti di `audio/r7/`. `handoff/R7-BERSAMA.md`, merek siirfan, dan `REPORT-R6-audio.md` dibaca. `profil_cek.py` LULUS. Pemeriksaan awal repo sudah dilakukan Sutradara menurut handoff; tidak menjalankan doctor --fix, PETA, commit, atau push repo proyek.

`pace_read.py` pada visual R6: **83,817 dtk; 3,3 kata/detik; gerak 6,0; 48 event visual/menit; 5 hard cut = 3,6/menit. Kategori energi, 100–140 BPM.** Hard cut tidak mewakili seluruh gerak UI. `edit/words.json` memakai `s/e`; salinan `words_pace.json` memakai `start/end` agar alat bisa membaca waktu yang sama. Sumber asli tetap.

Pilihan: **Relax, Peyruis**, untuk lega-bangga, tokoh, parodi, dan penutup; **Holiday Party, Infraction**, untuk fokus UI, kartu angka, dan puncak kerja agen. Tempo grid sumber terukur **105,00 / 117,99 BPM**. Aransemen hasil bergerak sekitar **102–120 BPM**, dengan pitch dipertahankan; suara tetap ×1,0.

## Kandidat, 20 judul dari dua sumber

Katalog `Asset/musik/MUSIK.md`, kredit proyek, `~/sfx`, dan bank lokal ditelusuri. Bank yang dipakai: **YouTube lokal** di `~/work/behindwork/groups/{S1,S3}/music/` beserta `SOURCES.md`, dan **Epidemic lokal** di `~/work/behindwork/music/epidemic/`. Berkas sumber hanya dibaca. Kandidat dianalisis dari potongan 40 dtk, bukan nama genre pada berkas.

BPM tabel adalah keluaran `music_fit.py`; kunci adalah **estimasi chroma STFT + korelasi profil**, bukan metadata komposer. `(?)` berarti selisih dua estimasi teratas <0,05. Nilai mentah dan hash sumber ada di [candidates.json](../audio/r7/candidates.json) dan [key_estimates.json](../audio/r7/key_estimates.json).

| Judul · artis | Sumber | Offset sumber | BPM alat | Estimasi kunci | Skor | Putusan awal pada level rencana |
|---|---|---:|---:|---|---:|---|
| [Energy · Bensound](https://www.youtube.com/watch?v=rfYbb6WcX1Y) | YouTube lokal | 24–64 s | 117.5 | F major | 100 | masking / dinamika |
| [Feel Good · MBB](https://www.youtube.com/watch?v=wIDKJeLXO5Q) | YouTube lokal | 30–70 s | 123.0 | G major (?) | 100 | masking / dinamika |
| [Champagne Ocean · Ehrling](https://www.youtube.com/watch?v=K1kz8Wf4Wts) | YouTube lokal | 25–65 s | 123.0 | D minor | 100 | masking / dinamika |
| [Movements · Vexento](https://www.youtube.com/watch?v=cxp6FQ0LLtg) | YouTube lokal | 30–70 s | 123.0 | E minor | 91 | masking / dinamika |
| [Holiday Party · Infraction](https://www.youtube.com/watch?v=oD8Bqq8ldgI) | YouTube lokal | 24–64 s | 117.5 | A minor (?) | 100 | PAKAI + EQ |
| [Relax · Peyruis](https://www.youtube.com/watch?v=R74UaQUr1Hw) | YouTube lokal | 24–64 s | 103.4 | A minor | 87 | PAKAI + EQ |
| [Keep Going · Dyalla](https://www.youtube.com/watch?v=2Uq-0CUZ5jk) | YouTube lokal | 24–64 s | 107.7 | D major (?) | 80 | PAKAI |
| [Ascend · Declan DP](https://www.youtube.com/watch?v=wJi7WTRcrUo) | YouTube lokal | 25–65 s | 129.2 | G major | 93 | masking / dinamika |
| [Daydream · Infraction](https://www.youtube.com/watch?v=N1C9gq_554c) | YouTube lokal | 10–50 s | 89.1 | A major | 91 | gugur bpm |
| [Sydney’s Skyline · ALBIS](https://www.youtube.com/watch?v=C9b6YoU5GLc) | YouTube lokal | 24–64 s | 117.5 | B major | 80 | PAKAI |
| [Something Elated · Broke For Free](https://www.youtube.com/watch?v=kxh4S2A8Q4U) | YouTube lokal | 32–72 s | 117.5 | D major (?) | 100 | masking / dinamika |
| [Kyoto · Pratzapp & Another Kid](https://www.youtube.com/watch?v=798Z_3O8r38) | YouTube lokal | 24–64 s | 99.4 | E major (?) | 88 | gugur bpm |
| [Sthlm Sunset · Ehrling](https://www.youtube.com/watch?v=uoEhoGt4mIw) | YouTube lokal | 25–65 s | 123.0 | E minor | 100 | masking / dinamika |
| [Funkorama · Kevin MacLeod](https://www.youtube.com/watch?v=dmIO-dT5BFw) | YouTube lokal | 24–64 s | 99.4 | D major (?) | 100 | gugur bpm |
| [What Comes Next · Ice Cream Cult](https://www.youtube.com/watch?v=Fh7UyRKXPFE) | YouTube lokal | 24–64 s | 89.1 | C# minor | 91 | gugur bpm |
| [Funky Element · Bensound](https://www.youtube.com/watch?v=zDWZUugBGQc) | YouTube lokal | 24–64 s | 95.7 | C minor | 97 | gugur bpm |
| Lens Flare 3 · Peter Sandberg | Epidemic lokal | 24–64 s | 117.5 | C# major | 80 | PAKAI |
| Closer (Instrumental) · Kylie Dailey | Epidemic lokal | 24–64 s | 92.3 | F major | 82 | gugur bpm |
| I Will Be Ok (Instrumental) · OTE | Epidemic lokal | 24–64 s | 86.1 | D# major | 82 | gugur bpm |
| Open Road · Lennon Hutton | Epidemic lokal | 24–64 s | 99.4 | D# major (?) | 80 | gugur bpm |

Profil resmi energi tetap: BPM 100–140, onset 3–8/s, skor ≥70, dan SNR minimum 12 dB. Pada level uji standar −22 LUFS mono, seluruh kandidat menutupi suara; hasil tersebut disimpan di `music_fit_raw.json`. Pengujian kedua memakai **level rencana −30,5 LUFS mono, sekitar −27,5 stereo**, dalam salinan profil lokal. Hanya nilai level berubah; seluruh ambang kecocokan dan SNR tetap, dibuktikan `profile_delta.json`. Alat dan profil resmi tidak diubah.

Sumber Epidemic juga diperiksa lewat ID3: Lens Flare 3 = contemporary classical/romantic; Closer = indie folk; I Will Be Ok = pop/sentimental; Open Road = ambient/suspense. Metadata ini ikut menjelaskan kenapa mereka kalah untuk brief modern, percaya diri, dan playful. Tempo mesin pada instrumen non-drum dapat ambigu.

## Potongan terpilih yang benar-benar digunakan

Offset dipilih ulang untuk melewati breakdown. `music_fit.py` dijalankan kembali pada **22 potongan dari 20 judul**: 18 kandidat lain + empat potongan terpilih. Pool ≥8 dan dua sumber lolos; `earshot rank` aktif, tanpa `--no-earshot`. [Hasil dan alasan per fitur](../audio/r7/logs/music_fit_used_offsets.log).

| Potongan | Sumber asli | Timeline | BPM alat | Estimasi kunci | Skor | SNR uji sebelum EQ |
|---|---|---|---:|---|---:|---:|
| relax_open | 55.730–78.844 s | 0.00–23.600 s | 103.4 | A minor | 90 | 10.8 dB, PAKAI + EQ |
| holiday_main | 112.436–142.946 s | 23.60–53.900 s | 117.5 | A minor | 100 | 9.2 dB, PAKAI + EQ |
| holiday_drive | 32.094–50.400 s | 53.90–72.100 s | 117.5 | A minor (?) | 100 | 9.2 dB, PAKAI + EQ |
| relax_close | 56.557–68.582 s | 72.10–83.817 s | 103.4 | A minor | 84 | 10.8 dB, PAKAI + EQ |

**Holiday Party memperoleh skor tertinggi, 100, untuk kedua potongan utama.** Kandidat lain yang sama-sama mendapat 100 membutuhkan penurunan level/EQ lebih besar pada level rencana. **Relax 90/84** dipilih untuk pembuka dan CTA: lebih ringan dan kurang terang, sesuai ruang bagi tokoh dan punchline; groove tetap >100 BPM. Skor yang lebih rendah berasal dari kecerahan di bawah profil energi, dengan alasan per babak ini dicatat, bukan diabaikan.

`earshot describe` pada potongan terpilih: Relax mengarah ke playful/quirky (z +3,5), confident (z +3,3); Holiday Party confident/cool (z +4,1). AudioSet teratas = Music/House/Dance/Disco; Speech/Singing tidak muncul pada label teratas. [Relax](../audio/r7/describe_relax_used.json), [Holiday Party](../audio/r7/describe_holiday_used.json).

| Klaim | Sumber yang mendukung | Perbedaan sumber | Putusan |
|---|---|---|---|
| Groove modern dan percaya diri | `earshot`, BPM, onset 5,1–6,7/s | Halaman Infraction menyebut funk rock, model menyebut house/tech-house | Sebut funk/electronic groove; label genre mesin bukan fakta mutlak |
| Pembuka/penutup playful | `earshot`, katalog Peyruis dance/funky, groove sumber 105 BPM | Kecerahan Relax lebih rendah dari profil energi | Dipakai untuk konteks ringan, Holiday Party membawa puncak |
| BGM baru lebih dekat ke brief | A/B stem musik lokal: z lama -0.23, baru +2.45 | Penilaian model; selera tetap ditinjau Sutradara/Irfan | Bukti pendamping, bukan persetujuan kreatif. [A/B](../audio/r7/ab_music.json) |

## Alasan per babak

| Pesan | Maksud | Alasan pilihan | Bentuk audio |
|---|---|---|---|
| 0–4,3: finally selesai | Lega dan bangga | Mulai bergerak sejak frame 0, tanpa intro lambat | Relax dari groove stabil, ketukan pembuka pada FINALLY |
| 4,3–13,8: workflow dan tokoh | Ringan dan akrab | Perkenalan tokoh dan candaan memerlukan ruang | Relax; musik turun 0,7 dtk sebelum DECISION |
| 13,8–23,6: AI slop/viral | Parodi konten yang berlebihan | Kontras cukup dari warna bunyi; groove tidak putus | Relax diberi campuran bandwidth lebih sempit; stop-down sebelum “putus-putus” |
| 23,6–36,3: app Claude, cara dibalik | Penjelasan terasa terarah | Groove rapat, midrange diberi ruang untuk kata | Holiday Party, level UI 1 dB lebih rendah |
| 36,3–53,8: workflow, balik modal, kartu | Percaya diri dan lucu | Dorong energi saat manfaat dan angka muncul | Holiday Party naik relatif 1,5 dB dari bagian UI |
| 53,9–72,1: lintas agent dan workflow | Puncak kerja | Potongan drum yang stabil menjaga dorongan | Potongan baru Holiday Party pada ketukan 53,9; stop-down sebelum 57,0 |
| 72,1–76,4: Blender 100% FULL AI | Reveal hasil | Ruang sebelum hero, lalu kembali ke ketukan | Kembali ke Relax di 72,1; stop-down sampai hit 72,6 |
| 76,4–83,817: IG dan gratis | CTA ringan, satu punchline akhir | Kembali ke motif pembuka lalu menutup | Relax; stop-down 81,95–82,65, ketukan “gratis”, ekor 1,167 dtk |

## Sambungan, stop-down, dan ketukan

Track berganti pada **23,6 dan 72,1 dtk**; pada **53,9** Holiday Party berpindah ke frasa baru dari track yang sama. Sambungan memakai handle, crossfade musik 90 ms dan pencocokan ketukan dengan atempo. Semua perubahan ini hanya pada musik.

Stop-down nominal masing-masing **0,7 dtk**: **11,30–12,00; 22,10–22,80; 56,30–57,00; 71,90–72,60; 81,95–82,65**. Gain musik turun 6 dB dengan campuran low-pass 480 Hz; musik tetap berbunyi. Duck ucapan maksimum 1,5 dB dengan envelope 510 ms. Level sumber diratakan sebelum ducking, termasuk penguatan bass asli rekaman pada lembah pendek, agar bed tidak kosong; tidak ada pad sinus/noise atau track ketiga.

Ketukan terukur dari stem R7 terbaru dengan onset detector 5,8 ms; tanda negatif berarti lebih awal. Satu frame = 33,367 ms.

| Momen | Target | Onset musik terdeteksi | Selisih |
|---|---:|---:|---:|
| FINALLY | 0.850 | 0.830 | -19.9 ms |
| DECISION | 12.000 | 11.981 | -18.5 ms |
| putus-putus | 22.800 | 22.814 | +13.6 ms |
| join 23.6 | 23.600 | 23.586 | -14.3 ms |
| join 53.9 | 53.900 | 53.894 | -6.5 ms |
| LINTAS AGENT | 57.000 | 56.976 | -24.0 ms |
| join 72.1 | 72.100 | 72.104 | +3.8 ms |
| 100% | 72.600 | 72.591 | -8.6 ms |
| gratis | 82.650 | 82.651 | +1.4 ms |

Maksimum selisih **24.0 ms**, di bawah satu frame. Ini pengukuran onset musik, bukan pengesahan kreatif atau pengukuran ulang puncak SFX.

Suara + SFX R6 tanpa musik sudah mencapai −0,886 dBFS. Headroom dicapai lewat **offset musik**: 19,7–22,3 dimajukan 54,708 ms; 23,6–53,9 diundur 6,875 ms; 53,9–72,1 dimajukan 1,854 ms. Bagian lain 0 ms. Offset disambung halus dan diukur kembali pada tabel di atas. Tidak ada limiter atau kompresor pada suara/master; gain suara dan SFX tetap ×1,0. [Bukti offset](../audio/r7/music_headroom_offsets.json).

## Hasil gerbang dari hasil terbaru

| Gerbang | Hasil | Bukti |
|---|---|---|
| Format dan durasi | PASS: 48 kHz stereo FLOAT; **4.023.219 sampel = 83,8170625 dtk** | `mix_report.json`; selisih terhadap 2.512 frame hanya −4,17 µs |
| Puncak sampel mix | PASS: **-1.005856 dBFS**, 0 sampel >−1 | `verification.json`; stem musik sendiri -9.26 dBFS |
| Loudness terhadap R4 | PASS: **-15.801981 LUFS**, R4 -15.859987; Δ **+0.058006 LU** | Toleransi TASK ±1 LU; tidak ada normalisasi master |
| Gain suara dan SFX | PASS: mix = suara×1 + SFX R6×1 + musik R7, identik PCM dengan penjumlahan tersebut | Pemulihan suara galat maks 2.98e-08; gain regresi 1.000000000008 |
| `voice_level.py` | PASS, exit 0 | `logs/voice_level.log`; perbandingan mono→mix stereo bukan gain pada stem suara |
| `music_fit.py` | PASS pool dan pilihan: main 100/100; Relax 90/84 beralasan | `music_fit_used_offsets.json`, `profile_delta.json` |
| `audio_phone.py` | PASS target median: **17.3 dB ≥12**; worst 5.8 dB di 80.0; 5 jendela <8 | `logs/audio_phone.log`; bunyi SFX tajam 0 |
| Kontinuitas musik | PASS: mulai frame 0, 100 ms awal **-32.8 dBFS**; **0** jendela 100 ms <−45 di luar stop-down/ekor | `bed_windows.json`; jendela −46,9 pada 56,8 adalah stop-down terencana; ekor setelah gratis dibiarkan mereda |
| Pembanding | PASS: mix lama identik byte dengan `audio/r6/mix_r6.wav` | SHA-256 73714899730a5f8d4e0bd8d74be4b3d5c63c4d4a6ef87af45f81644c216a1591 |
| Input yang dilindungi | PASS: kedelapan hash input awal tetap sama | `inputs_sha256.json`, `verification.json` |
| Mux | PASS: **2.512 paket H.264 beserta PTS/DTS identik** dengan visual R6; AAC 320 kb/s, 48 kHz stereo | `video_copy_proof.json`, `preview_ffprobe.json` |
| Rebuild | PASS: PCM stem musik dan mix identik bit saat pembangun standar dijalankan ulang | `rebuild_identity.json` |

[Verifikasi lengkap](../audio/r7/verification.json), [grafik yang sudah diperiksa](../audio/r7/qa_levels.png), [log HP](../audio/r7/logs/audio_phone.log).

### Batas yang diteruskan ke Sutradara

- **True peak master belum lolos −1 dBTP:** WAV dan AAC -0.3 dBTP. Angka dBFS di tabel adalah puncak sampel, sesuai butir TASK; keduanya dilaporkan terpisah. Default: pertahankan suara dan SFX R6 ×1,0, jangan memasang limiter master. Penanganan true peak publikasi memerlukan peninjauan pada tahap mix/master R7.
- HP 50%/100%: **42/65** SFX terdengar; HP 20% **40/65**. Median kejernihan TASK lolos, tetapi semua SFX warisan belum lolos uji keterdengaran. Rentang lemah suara tercetak pada log HP; cue dan level SFX tidak diubah oleh TASK BGM.
- Pratinjau memakai visual R6. Setelah visual/SFX R7 dirakit Sutradara, jalankan kembali audit sinkron dan mix di atas sumber R7 tersebut. `sfx_density` warisan R6 dan persetujuan kreatif tetap berada pada alur Sutradara.

## Lisensi, kredit, dan biaya

**Biaya baru 0; tidak memakai ElevenLabs/generasi berbayar, tidak membeli langganan, tidak mengunduh ulang lagu.**

- **Peyruis, Relax:** [ketentuan artis](https://peyruis.com/use-my-music) mengizinkan penggunaan media sosial dengan kredit untuk cakupan personal dalam brief. Kredit clickable: `Music by @peyruismusic: Relax.`
- **Infraction, Holiday Party:** [halaman track resmi](https://inaudio.org/track/holiday-party-funk-rock/) memuat ketentuan penggunaan gratis, rujukan CC BY 3.0, dan teks kredit `Music from #InAudio: https://inaudio.org/`, lalu nama track. Katalog resmi juga mengonfirmasi 118 BPM dan funk rock.
- Musik dipotong, disambung, diberi EQ dan penyesuaian tempo; perubahan ini disebut di kredit. [Kredit siap tempel](../musik/KREDIT.md) ditambah tanpa menghapus kredit musik lama. Kandidat berbayar/Epidemic hanya dibandingkan; izin penggunaannya tidak diklaim untuk soundtrack ini.

## Reproduksi dan status serah-terima

Dari folder proyek:

```bash
~/work/mg-venv/bin/python audio/r7_bgm.py --mux
~/work/mg-venv/bin/python ~/work/skill-development/claude/motion-graphic/scripts/audio/audio_phone.py --root audio/r7/phone --list > audio/r7/logs/audio_phone.log
~/work/mg-venv/bin/python audio/r7/verify.py
```

Jalankan berurutan agar penguji tidak membaca log audio_phone yang belum selesai. `arrangement.json` menyimpan offset sumber, kurva, EQ, dan tempo; `source_beats.json` menyimpan grid terukur. Sumber lokal disebut lengkap di `candidates.json`. Rebuild bit-identik memakai pembangun standar, tanpa pengganti cache pada fungsi pembangun.

File kerja diserahkan ke Sutradara untuk digabung. Tidak ada commit/push repo proyek, perubahan visual, lego, remotion, edit, stem/mix R4/R6, atau file pekerja lain.

Token: alat pemakaian token sesi tidak tersedia; tidak ditaksir.

