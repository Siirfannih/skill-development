# REVIEW v11 · Worker T (sistem teks)

Tanggal 2 Nov 2026. Commit `3b5e656` (lib, caption, enter) dan commit lanjutan (dedupe penekanan, mask v2, laporan ini).

## Yang diubah
| File | Perubahan |
|---|---|
| `src/lib/CaptionTrack.tsx` (baru) | Running text VO dari `timeline.json`. Satu baris dengan baseline y 820, rata tengah di x 288–1632. Geist 500 56 px, `#FAF8EC`, dan tinta `#14161A` bila luminansi pita > 0,19 (dihitung per frame dan dihaluskan). Kata masuk di ceil(s×30) dengan blur→tajam 3 f, lalu baris di-tengahkan ulang. Frasa dipecah di tanda baca, jeda > 0,35 dtk, ganti sumber suara, > 32 karakter, atau batas penekanan/UI. Tanda baca dibuang. Shadow halus. **Tidak memancarkan sfxMark** (subtitle senyap). |
| ↳ penekanan menggantikan caption | (1) CSS `body:has([data-emph]) [data-caption]{visibility:hidden}` membuat caption hilang tepat per frame saat ada AnchorWord atau SpeakerWords di layar. (2) `captionMask.json` dari log OBJ probe: interval teks lain (cat BERLOMBA-LOMBA yang dikunci) dan kata yang diucapkan selama penekanan, yang tidak diulang. Kata yang tampil sebagai penekanan ≤ 1,5 dtk sebelumnya juga tidak diulang. (3) `busy`: pita bawah terisi objek UI (composer 03a/06d, bidang putih 06c, kolase 05e, grid kartu 02e, footage campur) sehingga caption disembunyikan dan tidak menimpa objek. |
| `tools/caption_mask.py` (baru) | Membuat mask (emph, busy, lum) dari folder probe, dan mencetak cakupan kata ke stderr. Regenerasi: `node seg2_probe.mjs <dir> 0 133 2 0.25 && python3 ../tools/caption_mask.py <dir> > src/lib/captionMask.json`. |
| `src/lib/AnchorWord.tsx` | Tambahan `enter`: `blur`, `mask` (naik dari mask 4 f), `letters` (per huruf naik+blur, stagger 1 f), dan `type` (1,5 f/huruf; caret vertikal tipis setinggi cap-height yang berkedip lalu hilang 16 f setelah selesai). `type` memancarkan `sfxMark("type")` `<panel>:type:<teks>:start` dan `:end`, tanpa klik `word:`. Ditambah `data-emph`. `softenShadow`: shadow adegan dengan blur > 10 px (mis. S05f `0 6px 50px`, S05c, S06e, S01) diganti `0 1px 2px rgba(0,0,0,.45), 0 2px 10px rgba(0,0,0,.30)`. Teks terang tanpa shadow memakai shadow halus; teks gelap tanpa shadow. |
| `src/lib/SpeakerWords.tsx` | Shadow default menjadi halus (Bloomberg 0:08). Prop `enter` per kata emph kini dipakai (sebelumnya selalu `scale`), default `blur`. Ditambah `data-emph`. |
| `src/lib/anim.tsx` | `SfxKind` + `"type"`. |
| `src/Video.tsx` | Lapisan `<CaptionTrack/>` di atas semua adegan. |
| `src/scenes/*` | Hanya prop `enter`, daftarnya di bawah. Timing, posisi, dan adegan terkunci (BERLOMBA-LOMBA, grid S02b «Janji sederhana») tidak disentuh. |

## Teknik per penekanan (urutan waktu; tidak ada teknik sama > 2× berturut-turut)
| t | Kata | Teknik | Alasan peran |
|---|---|---|---|
| 0:01 | AI (Gates) | blur | ucapan |
| 0:01 | BIGGEST | left | (tetap) |
| 0:04 | LAUNCHED | right | (tetap) |
| 0:07 | BILLION (Bloomberg) | scale | angka/hero |
| 0:09 | FAST | right | (tetap) |
| 0:10 | SADAR | blur | kesadaran = fokus menajam |
| 0:13 | PENGGANTI | mask | pernyataan tegas |
| 0:18 | LEBIH · CEPAT | left · right | pasangan gerak (tetap) |
| 0:24 | JANJI · sederhana | scale | dikunci S02b, tidak diubah |
| 0:31 | KREATIF | letters | kata ekspresif |
| 0:54 | TEMPAT · KITA | mask · **type** | «kita» diketik k-i-t-a (contoh Irfan) |
| 0:57 | JOB · SOMEBODY · AI | left · right · blur | kontras Jensen (enter kini benar-benar dipakai) |
| 1:01 | TEKNOLOGI INI | blur | ucapan |
| 1:03 | NGGAK · PEDULI | left · right | (tetap) |
| 1:08 | ARAHNYA · JANJINYA | mask · letters | pertanyaan dua kata |
| 1:12 | SINGLE · PERSON · BILLION · DOLLAR · COMPANY | mask · blur · scale · mask · letters | kutipan Altman; BILLION = angka |
| 1:17 | SATU · SUKSES | scale · type | angka · kata personal |
| 1:23 | SEMUA · SAMA | blur · mask | |
| 1:32 | FOUNDER · CEO · SEMALAM | type · letters · blur | |
| 1:42 | SUSAH | mask | |
| 1:46 | MEMBANGUN · MERENCANAKAN | letters · type | membangun = tersusun; merencanakan = diketik |
| 1:52 | AI | blur | |
| 1:58 | TERTINGGAL | right | (tetap, gerak tertinggal) |
| 2:09 | PERAN · KAMU | mask · **type** | sapaan personal |

## Bukti
- Probe sebelum: everyN=2 seluruh film. Probe sesudah: everyN=4 seluruh film. Lembar bukti 960 px dibuat di scratchpad (`ba.jpg` = sebelum|sesudah 0:08, 0:15, 0:25, 0:45, 1:05, 1:45; `ex.jpg` = type KITA/FOUNDER/KAMU + caret).
  - 0:15: «Dan» muncul.
  - 0:45: caption tidak menimpa composer.
  - 1:05: «Ia terus» dengan tinta gelap di latar terang.
  - 1:45: «Terkadang kita terlalu».
- `npx tsc --noEmit` hijau.
- Penanda `type` muncul di sfx.log, contohnya `05a:type:SUKSES:start/end` dan `05f:type:FOUNDER:end`.

## seg2_layout_check (seluruh film, everyN=4): **GAGAL, 28 temuan.** Rinciannya:
- **Bawaan v10, bukan dari perubahan T (13 temuan):** CONTR teks narasumber 00a di atas footage terang (Technical 1,7:1, 16 = 3,2:1, Raised/over/a ≈ 4:1, Billion kuning 2,0:1). Baseline sebelum T sudah 2,0:1. Shadow sekarang lebih halus atas perintah brief. Perbaikan butuh pergeseran posisi atau plate di S00 (adegan, bukan lib).
- **1 frame masuk (blur sedang berjalan):** SADAR, LEBIH, CEPAT, AI, BILLION, SAMA, SEMALAM, caption Tanpa_sadar/AI. Ini artefak checker.
- **Caption:** `Dan_hari` 4,3:1 di footage 1:23 (3 sampel, terbaca). `kita_lagi_berlomba-lomba` 2,7:1 di 0:12,7 sudah diperbaiki sesudah probe dengan dedupe kata «berlomba-lomba» dan penghalusan tinta ±2 sampel.
- SAFE BERLOMBA-LOMBA: dikunci, diterima.
- Temuan CLASH: tidak ada.

## Cakupan kata VO: **232/310 = 74,8 %** (target ≥ 95 % TIDAK tercapai)
Sebelumnya ±54/310 (17 %). Ada 78 kata hilang, dalam tiga kelompok:
1. **34 kata diucapkan saat teks penekanan masih di layar.** Contohnya «kita sendiri» saat PENGGANTI, «sama apa yang kita pikirkan» saat NGGAK PEDULI, «As far as I can tell» saat COMPANY, «orang punya akses ke tools» saat SEMUA, dan «apa yang sedang … mainkan» saat PERAN KAMU. Aturannya «jangan dua lapis teks», jadi kata-kata ini tidak bisa tampil tanpa memendekkan `until` anchor, yang merupakan timing adegan dan bukan wewenang T.
2. **36 kata di adegan UI yang mengisi pita bawah:** 02e grid (0:39–0:40), composer 03a (0:41–0:45), 03b, kolase 05e, bidang/composer 06c–06d. Caption disembunyikan supaya tidak menimpa objek.
3. **8 kata Jensen** sengaja dilewati SpeakerWords («your job to an AI but you're…»).

### Usulan untuk Claude utama (Tingkat 1/2, belum diterapkan)
- **A.** Anchor tanpa `until`, atau yang bertahan > 1 dtk sesudah kata terakhirnya, ditutup di `kataTerakhir.e + 0,4 dtk`, lalu caption melanjutkan. Perkiraan +25–30 kata (≈ 84 %). Dampaknya: penekanan lebih singkat dan ritme adegan berubah.
- **B.** Di adegan UI, ucapan VO dijadikan teks yang hidup di objek, misalnya diketik di composer atau menjadi label kartu, bukan caption terpisah. Perkiraan +20–30 kata. Dampaknya: kerja desain per adegan (Worker V).
- **C.** Terima ±75 % dan anggap visual UI sudah cukup bicara (sesuai prinsip «visual kuat tidak butuh teks»).

## Sisa masalah
- Mask dibuat dari probe baseline. Bila Worker V mengubah adegan (cahaya, crop) atau timing anchor, jalankan ulang perintah regenerasi.
- Tepi mask ±1 sampel (2 f). CSS `:has` menutup teks lib secara tepat. Hanya BERLOMBA-LOMBA dan `busy` yang bergantung pada sampel.
- `busy` memakai heuristik tepi/kontras dari still. Bila ada adegan baru, cek contact sheet.
