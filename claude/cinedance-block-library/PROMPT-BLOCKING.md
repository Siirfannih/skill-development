# PROMPT BLOCKING · struktur prompt video-generation (Gemini Omni, Veo, Seedance)

Sumber: PDF "Prompt Blocking" yang aku kirim 18 Nov 2026 (contoh asli: video edukasi 10 dtk, 16:9, gaya retro Korea 1970–80-an, dialog Bahasa Melayu). File ini mencatat **strukturnya**, bukan isinya. Pakai setiap kali kamu menulis prompt untuk model video yang menghasilkan orang berbicara (Gemini Omni di Flow, Veo, Seedance), terutama bila orangnya aku (avatar) dan dialognya bukan bahasa Inggris.

## 1. Kenapa blocking bekerja

- Prompt dibagi ke **bagian bernomor dengan satu urusan per bagian** (identitas, kamera, desain, suara, timeline, audio, larangan, prioritas). Model tidak perlu menebak kalimat mana yang mengatur apa. Kegagalan prompt lama kita ("aturan terlalu ketat dan dicampur") datang dari aturan teks, kamera, dan suara yang ditulis dalam satu paragraf; blocking memisahkannya.
- **Kunci (LOCK)** ditulis sekali di atas (wajah, pakaian, bahasa) dan berlaku ke semua adegan, jadi timeline cukup berisi apa yang berubah.
- **Timeline per detik** memberi model jadwal yang bisa diikuti: tiap adegan punya lingkungan, aksi tokoh, kamera, dialog persis, cara bicara, dan transisi.
- **Dialog ditulis dua kali**: di adegannya dan lagi di daftar urutan dialog bagian audio, dengan timestamp. Ini membantu sinkron bibir.
- **Prioritas berperingkat** di akhir memberi tahu model apa yang dikorbankan terakhir bila tidak semua bisa dipenuhi.

## 2. Struktur (urutan dipertahankan)

| # | Bagian | Isi | Catatan |
|---|---|---|---|
| 0 | Header | jenis video, DURATION (pas, "EXACTLY N SECONDS"), ASPECT RATIO, VISUAL STYLE, DIALOGUE (bahasa + kode lokal, mis. id-ID), GENRE | Satu baris per kunci |
| 01 | MASTER CHARACTER IDENTITY LOCK | rujukan identitas (foto/avatar = satu-satunya acuan wajah), deskripsi subjek, daftar fitur yang dijaga (bentuk wajah, mata-alis-hidung-bibir, rahang, rambut, kulit, umur, proporsi), WARDROBE LOCK, posisi/properti tokoh, larangan drift (no beautification, no morphing) | Ditulis sebagai daftar |
| 02 | CAMERA & LIGHTING | bodi kamera, lensa, lampu, setup cahaya (kunci, aksen, bayangan), CAMERA LANGUAGE (daftar gerak yang boleh dipakai) | Nama alat nyata membuat hasil lebih fotografis |
| 03 | VISUAL & MOTION GRAPHIC DESIGN | gaya, elemen desain, palet warna, aturan teks (teks hanya di latar/ruang kosong, tidak menutupi wajah, mulut, tangan) | Untuk B-roll yang teksnya kita bangun sendiri: bagian ini berisi set dan cahaya saja, dan satu kalimat "no on-screen text" |
| 04 | VOICE & LANGUAGE LOCK | bahasa, aksen (kota/daerah), suara (jenis kelamin, umur), DELIVERY, bicara ke kamera + bibir sinkron, larangan menerjemahkan, larangan menambah dialog | Sebut juga bahasa yang TIDAK boleh muncul |
| 05 | EXACT TIMELINE | blok per rentang waktu `[00:00–00:02] SCENE 01 — NAMA`: ENVIRONMENT, TYPOGRAPHY (bila ada), CHARACTER ACTION, CAMERA, DIALOGUE (persis, dalam tanda kutip), DELIVERY, TRANSITION | Contoh PDF: 5 adegan × 2 dtk dalam satu take |
| 06 | AUDIO DESIGN | VOICE, DIALOGUE SEQUENCE (timestamp + kalimat), AUDIO RULES (lip sync, tanpa musik, tanpa subtitle, tanpa dialog tambahan, suara konsisten) | |
| 07 | STRICT NEGATIVE CONSTRAINTS | daftar "DO NOT GENERATE" yang konkret dan bisa dilihat (identity drift, jari ganda, teks di wajah, subtitle, musik, bahasa salah, lip sync salah, cut acak, transisi tanpa alasan, wajah berkedip) | Konkret, bukan sifat umum |
| 08 | FINAL PRODUCTION PRIORITIES | PRIORITY 1…5 berperingkat + FINAL OUTPUT (ringkasan satu paragraf: durasi, rasio, subjek, gaya, dialog) | Prioritas 1 hampir selalu identitas wajah |

## 3. Cara memakainya untuk Gemini Omni (pelajaran kita)

1. **Satu generate = satu shot** untuk B-roll yang akan dipotong ke kalimat VO. Timeline multi-adegan (seperti PDF) hanya dipakai bila klip itu memang dipakai utuh sebagai satu potongan.
2. **Dialog = kalimat VO asliku, kata demi kata**, ditulis apa adanya (bahasa Indonesia santai), angka ditulis sebagai kata ("seratus persen"). Audio Omni nanti diganti suaraku, tetapi dialog ini yang menggerakkan bibir. Unduh hasil **dengan** audio Omni: onset katanya dipakai untuk menyelaraskan klip ke `words.json`.
3. **Bagian 01 memakai avatar**, bukan foto: "Use my avatar as the ONLY facial identity reference." Foto wajah asli sering ditolak; avatar resmi lolos.
4. **Bagian 03 untuk B-roll tanpa teks**: tulis set, cahaya, palet, lalu satu kalimat "No on-screen text, captions or subtitles." Jangan menulis aturan tipografi bila teks akan dibangun di kode. Uji kita 18 Nov: meminta teks 3D ke Omni menghasilkan teks 2D datar; teks berlapis dibangun di kode.
5. **Bagian 04** untuk aku: `LANGUAGE: Bahasa Indonesia (id-ID), casual spoken Indonesian · ACCENT: young urban Indonesian (Bali/Jakarta) · VOICE: male, early 20s, warm · DELIVERY: fast, natural, continuous, no long pauses`. Larangan: "Do not translate the dialogue into English. No Malaysian accent."
6. **Timestamp dialog di bagian 05 dan 06 harus sama** dan jatuh di dalam durasi klip (Omni minimal 3 dtk, bilangan bulat). Sisakan 0,2–0,3 dtk sebelum kata pertama.
7. **Daftar larangan pendek dan visual** (8–15 butir). Larangan yang tidak bisa dilihat di frame tidak membantu.
8. Prioritas yang kupakai: 1 identitas avatar, 2 dialog Indonesia + sinkron bibir, 3 set/cahaya sesuai referensi, 4 durasi dan waktu dialog, 5 gerak kamera.

## 4. Template (isi bagian bertanda < >)

```
CINEMATIC B-ROLL — <NAMA SHOT>
DURATION: EXACTLY <N> SECONDS · ASPECT RATIO: 9:16 VERTICAL · ONE CONTINUOUS SHOT, NO CUTS
VISUAL STYLE: <gaya> · DIALOGUE: BAHASA INDONESIA (id-ID) · GENRE: <genre>

══ 01 — MASTER CHARACTER IDENTITY LOCK ══
Use my avatar as the ONLY facial identity reference.
MAIN SUBJECT: <deskripsi singkat aku: pria Indonesia awal 20-an, rambut hitam berponi, …>
STRICT FACIAL CONSISTENCY: face shape, eyes, nose, lips, jawline, hairline and hairstyle, skin tone and texture, age and proportions must stay identical.
WARDROBE LOCK: <pakaian>.
POSITION: <di mana tokoh berada / pose awal>.
No beautification, face morphing or identity drift.

══ 02 — CAMERA & LIGHTING ══
CAMERA: <bodi> · LENS: <lensa> · LIGHTING: <lampu>
LIGHT SETUP: - <kunci> - <aksen/rim> - <bayangan/kontras>
CAMERA LANGUAGE: <gerak yang boleh: locked-off, slow push-in, …>. All camera movement physically believable.

══ 03 — SET & VISUAL DESIGN ══
SET: <studio/set, properti>
COLOR PALETTE: <palet>
No on-screen text, captions, subtitles or logos.

══ 04 — VOICE & LANGUAGE LOCK ══
LANGUAGE: Bahasa Indonesia (id-ID), casual spoken Indonesian.
ACCENT: young urban Indonesian. VOICE: natural male voice, early 20s.
DELIVERY: <nada>, fast and continuous, no long pauses.
The subject speaks <to the camera / in profile> with perfectly synchronized mouth movements.
Do not translate the dialogue. Do not add any dialogue beyond the exact line.

══ 05 — EXACT TIMELINE ══
[00:00–00:0X] <AKSI AWAL>
CHARACTER ACTION: … · CAMERA: …
[00:0X–00:0Y] DIALOGUE (INDONESIAN): "<kalimat persis>"
DELIVERY: … · CHARACTER ACTION: … · CAMERA: …
[00:0Y–00:0N] <AKSI SETELAH BICARA, mulut tertutup>

══ 06 — AUDIO DESIGN ══
DIALOGUE SEQUENCE: 00:0X — "<kalimat persis>"
AUDIO RULES: perfect Indonesian lip sync · clear natural speech · no music · no subtitles · no additional dialogue · only <room tone / footsteps / keyboard>.

══ 07 — STRICT NEGATIVE CONSTRAINTS ══
DO NOT GENERATE: identity drift · different person · warped hands or extra fingers · on-screen text or subtitles · background music · English or Malaysian speech · wrong lip sync · camera cuts · flickering face · <khusus shot ini>

══ 08 — FINAL PRODUCTION PRIORITIES ══
PRIORITY 1: exact avatar identity. PRIORITY 2: accurate Indonesian dialogue and lip sync. PRIORITY 3: <set & cahaya>. PRIORITY 4: dialogue inside the timestamps. PRIORITY 5: camera movement.
FINAL OUTPUT: one continuous <N>-second 9:16 shot of <ringkasan>, photorealistic, speaking the exact Indonesian line.
```

## 5. Contoh terisi

Prompt per shot video perkenalanku (18 Nov 2026) memakai template ini: lihat `EDITING-GUIDELINE` proyek itu di Drive `Claude edit/Siap edit/Video Perkenalan Irfan/` §6.
