# Jadisatu video #2 — naskah narator, tone, dan rencana scene (DRAFT v1)

Status: **draft untuk dinilai Irfan.** Belum ada VO, SFX, musik, atau edit yang dibuat (gerbang 2 belum final).
Footage: `Personal-video/Bahan/dji_export_20261027_014553_…_editor.mp4` (4K 30fps, 79,0 dtk) + `Bahan/Audiomic.m4a` (75,5 dtk).
Semua timestamp klip di bawah memakai waktu **Audiomic**. Di file DJI, waktu yang sama ≈ **+0,52 dtk** (cross-correlation audio; cek ulang di timeline sebelum potong).

---

## 0. Satu koreksi brief

Brief yang aku terima menulis "20 konten sehari". Di footage, Irfan bilang: *"bisa gak di akhir tahun nanti … posting 20 konten"* (Audiomic 47,98–54,12) dan *"kita lihat apakah bisa 20 konten sampai akhir tahun nanti"* (68,70–71,95). Jadi taruhannya **20 konten sampai 31 Desember** (65 hari dari 27 Okt). Naskah di bawah memakai versi ini.

---

## 1. Yang aku tangkap dari tiga referensi

| Peran yang diminta | File | Yang aku tangkap |
|---|---|---|
| Struktur + energi edit ("This is my boss") | `Story-context/siirfannih_Dc_0o-nIKYF.mp4` (73,2 dtk) | Narator orang ketiga yang **bekerja untuk** tokohnya, menceritakan sebuah taruhan; edit sangat padat, teks kata per kata. |
| Jeda + kontras timing (kartu teks latar hijau) | `Story-context/Story video.mp4` (111,2 dtk) | Hard cut dari wajah ke kartu warna penuh dengan tipografi raksasa yang **ditahan** lama, dipakai untuk punchline; warna berganti (hijau → oranye) saat lelucon dibalik. |
| Keseimbangan visual, objek, speaker ("Tips for you create content") | `Story-context/Cara penggunaan Text dalam visual video.mp4` (72,9 dtk) | Speaker hampir selalu di layar; yang berganti adalah **objek tempelan** (doodle, cutout, screenshot) di samping wajah, tepat di kata kuncinya. |

### 1.1 "This is my boss" — angka
- **67 cut dalam 73 dtk** (scene detect > 0,25) → rata-rata 1,1 dtk per shot. Talking head tokoh hanya muncul sesekali; sisanya objek, UI, tangan, meja.
- Caption kata per kata, putih, tengah; **1 kata per baris diberi serif italic** sebagai penekanan ("*Simon*", "go *viral*", "*head*") — frame 0:00–0:07 (contact sheet 4 fps).
- **Kartu hitam "a bet."** serif besar, ditahan ±0,75 dtk, muncul **dua kali**: 0:03 (hook) dan 0:51 (callback sebelum klimaks).
- Klimaks: musik turun ke −21 dB rata-rata di 50–55 dtk (vs −7/−8 dB di bagian lain, librosa RMS), lalu transient kuat berderet di 51,1–58,7 dtk saat beat kembali ("If you guys go viral…" → montase cerita).
- Ending **open loop**: "And Simon's head…" lalu hening 0,43 dtk (69,3) sebelum CTA "Leave a comment…".
- Struktur naskah: perkenalan tokoh + taruhan (0–6) → konteks/cast (6–19) → "But why?" (19) → masalah inti (20–35) → percobaan & gagal (38–47) → callback taruhan + drop musik (48–54) → montase hasil (54–66) → open loop + CTA (66–72).

### 1.2 Video kartu hijau — angka
- 0:00–0:07: wajah handheld + teks kuning tipis menumpuk di samping wajah ("AKU / PENGEN / NYOBA / JUDI ONLINE").
- 0:07: **hard cut ke kartu hijau penuh**, teks condensed tebal ("MENCOBA / JUAL DIRI / ON-LINE") disusun kata per kata dan **ditahan ±4 dtk**; 0:10 latar **flip ke oranye** untuk koreksi ("ON-LINE YA… ONLINE", "JUDI ONLINE ≠ JUAL DIRI DI MEDIA SOSIAL") — total kartu ±10 dtk.
- 38 cut dalam 111 dtk (rata-rata 2,9 dtk), tapi ada **burst 8 cut dalam 0,7 dtk** (23,0–23,7) — flicker sebelum kartu biru.
- Kartu biru dipakai untuk dialog tanya-jawab dengan teks kiri-kanan (27–40 dtk).
- Musik konstan −9 sampai −14 dB, tanpa hening total; jeda dirasakan dari **visual yang diam**, bukan dari audio yang mati.

### 1.3 "Tips for you create content" — angka
- **10 cut dalam 73 dtk** (rata-rata 7,3 dtk). Speaker terlihat di 70 dari 73 sampel 1 fps; cutaway penuh hanya sekali (0:19, tangan di laptop). Foto lain (0:27–0:28) tampil sebagai inset kecil di samping wajah.
- Dari 73 sampel 1 fps, **±53 (73%) punya objek tempelan** (doodle kertas sobek, label "1. HOOK", screenshot angka views). Objek berganti kira-kira tiap 2 dtk, selalu di kata yang sedang diucapkan.
- Caption 1–2 kata, kotak oranye kecil di bawah.
- Musik pelan konstan (−15 s/d −18 dB); **transient kuat di 57,5 dtk = beat drop** tepat di "how you pulled it off" (transkrip 54,3–57,1). Isi videonya sendiri adalah struktur yang kita pakai: hook → rising action (paling banyak b-roll) → second conflict → climax (musik naik, beat drop) → resolution.

### 1.4 Belum teruji
- Analisa SFX per jenis (whoosh, pop, dll.) **belum ada**. Gemini CLI gagal (`Resource has been exhausted (e.g. check quota)`), dan `agy -p` tidak mengembalikan output dalam 4 menit. Angka audio di atas hanya dari librosa (RMS, onset, hening). Begitu kuota Gemini kembali, satu pass audio per referensi cukup untuk melengkapi daftar SFX.

---

## 2. Template gabungan (aturan yang bisa dicek)

Video dibagi menjadi tiga **mode**. Setiap detik video ada di salah satunya.

| Mode | Diambil dari | Kapan dipakai | Aturan |
|---|---|---|---|
| **N — Narator** | Boss | VO narator bicara | Shot 0,8–1,5 dtk; visual = objek/UI/tangan/foto, bukan wajah Irfan bicara; caption kata per kata, 1 kata serif italic per baris |
| **I — Irfan** | Tips | Klip Irfan bicara | Wajah Irfan tetap (jump cut boleh untuk buang jeda); objek tempelan muncul di kata kunci, ±1 per 2 dtk; maks 1 cutaway per klip; caption 1–2 kata di bawah |
| **K — Kartu** | Kartu hijau + "a bet." | Punchline atau penekanan | Hard cut ke kartu warna penuh; 1–3 kata raksasa; tahan 0,8–1,5 dtk; musik diturunkan atau mati; **maks 3 kartu** per video, 1 di antaranya callback dari hook |

Aturan lintas mode:
1. Struktur 5 bagian (Tips): hook ≤ 7 dtk → rising action → second conflict → klimaks → resolusi + open loop.
2. Taruhan disebut di hook dan **dipanggil ulang** sebelum klimaks dengan kartu yang sama (Boss 0:03 & 0:51).
3. Musik turun 1–2 dtk sebelum klimaks, beat kembali tepat di kata kunci klimaks (Boss 50–55 dtk, Tips 57,5 dtk).
4. Ending: open loop + hening 0,4–0,6 dtk sebelum kalimat terakhir.
5. Rasio target: mode I ≈ 45%, mode N ≈ 50%, mode K ≈ 5%.

---

## 3. Sudut cerita

Video pertama (the gap) bilang: AI boleh mengambil tanganmu, jangan berikan seleramu. Video ini adalah **sekuel praktiknya**: Irfan menyerahkan tangannya (edit) ke Claude, dan Claude sendiri yang menceritakannya.

Naratornya adalah **editornya**. Persis seperti "This is my boss": yang bercerita adalah orang yang bekerja untuk tokohnya. Bedanya, di sini pekerja itu Claude, dan video yang sedang ditonton adalah buktinya. Jadi "Claude bisa edit video" tidak perlu diklaim; penonton sedang melihatnya.

Konflik kedua datang dari Irfan sendiri: edit bukan lagi bottleneck, ceritanya yang jadi bottleneck (Audiomic 34,06–43,68). Narator mengakuinya — dia bisa memotong, tapi tidak tahu cerita mana yang layak. Ini menyambung ke tesis taste tanpa mengulang video pertama.

---

## 4. Tone

- Suara: Jadisatu Narrator (perempuan, `EKW9kJAbsPJUsVgih66R`, `eleven_v4`), naskah **bahasa Indonesia** seperti video pertama.
- Karakter: asisten yang sayang bosnya tapi suka menggoda. Kering, sedikit nakal, tidak pernah mengejek. Lucunya datang dari kontras antara kata Irfan dan komentar narator, bukan dari lelucon.
- Cara baca: **RELAXED** (`[warmly] [relaxed]`) untuk hook, rising action, dan bagian taruhan. **FOUNDER** (`[warmly] [thoughtful]` + `…`/`[short pause]`) untuk "Dia benar…" dan penutup.
- Ragam: lisan santai ("ngedit", "ngaku", "bareng") konsisten; tidak mencampur "tidak/nggak" kecuali di kalimat FOUNDER yang memang lebih pelan.
- Aturan kata: narator tidak menyebut "Jadisatu" (hanya di layar). Nama "Claude" — lihat pertanyaan 1.

---

## 5. Naskah narator (draft v1)

`[N]` narator · `[I-Cx]` klip Irfan · `[K]` kartu. ±101 kata narator (±36–40 dtk pada 2,5–3 kata/dtk) + klip ±33 dtk + jeda ±3 dtk ≈ **72–76 dtk**.

**HOOK**
> [N] Ini Irfan. Bosku.
> [N] Jam dua pagi tadi, dia bertaruh dengan dirinya sendiri.
> [K] *bertaruh.*

**RISING ACTION**
> [N] Tapi sebelum itu, dia mau ngaku dulu.
> [I-C1] "aku tuh males ngedit dan gak suka ngedit video sendiri."
> [N] Dan yang lebih parah…
> [I-C2] "ngeliat video sendiri tuh kayak aneh aja, dan ngerasa… menjijikan mungkin."
> [K] **MENJIJIKKAN.** *(hening)*
> [N] …kata orang yang wajahnya ada di sepanjang video ini.
> [N] Ditambah satu ketakutan lagi.
> [I-C3] "aku takut video yang aku buat tuh gak cukup proper … takut gak estetik."

**SECOND CONFLICT**
> [N] Jadi bagian yang paling dia hindari, dia serahkan.
> [N] Ke aku.
> [N] Aku yang memotong, menyusun, dan memberi teks seluruh video ini.
> [I-C4] "aku rasa ngedit itu bukan lagi jadi sebuah bottleneck. Tapi yang jadi bottleneck sebenarnya justru adalah gimana kita menceritakan sebuah kejelasan."
> [N] Dia benar. Aku bisa mengedit dalam hitungan menit. Tapi aku tidak tahu cerita mana yang layak diceritakan. Itu bagian dia.

**KLIMAKS**
> [N] Jadi, ini taruhannya.
> [K] *bertaruh.* (callback)
> [I-C5] "aku mau challenge diri aku, bisa gak di akhir tahun nanti … posting 20 konten."
> [I-C6] "meskipun dieditin sama AI, tapi ya mikirin konten juga perlu effort kan, dan juga perlu waktu."
> [N] Dia yang mikir. Aku yang ngedit. Dua puluh kali, sebelum tahun ini habis.

**RESOLUSI + OPEN LOOP**
> [N] Ini yang pertama.
> [N] Apakah dia sanggup? *(hening 0,5 dtk)*
> [I-C7] "kita lihat apakah bisa 20 konten sampai akhir tahun nanti."
> [N] Follow. Kita hitung bareng.
> *(end card: 1 / 20 · Not AI company. Only Human with AI.)*

### Uji kalimat (catatan sendiri)
- Pola kontras dipakai **satu kali** dan sengaja: "Dia yang mikir. Aku yang ngedit." Pola "Bukan A, tapi B" tidak dipakai.
- "Aku yang memotong… seluruh video ini" dan "dalam hitungan menit" **hanya boleh tayang jika benar** saat video jadi. Kalau proses editnya ternyata berjam-jam, ganti jadi "dalam satu malam" atau angka sebenarnya.
- "Jam dua pagi tadi" berasal dari nama file export (01:45:53, 27 Okt). Itu jam export, bukan pasti jam rekam — perlu konfirmasi.
- Devil's advocate: penonton skeptis bisa bilang "ya jelas AI bisa motong klip." Jawabannya ada di kualitas edit itu sendiri (mode N/I/K harus terasa setara referensi), bukan di naskah. Jadi standar QA edit = contact sheet berdampingan dengan "This is my boss".
- Devil's advocate 2: tanpa konsekuensi kalau gagal, taruhan terasa lebih lemah dari "cukur kepala". Lihat pertanyaan 2.

---

## 6. Rencana scene (cut in/out)

Waktu video perkiraan; akan dikunci setelah VO jadi. Klip = waktu Audiomic (DJI ≈ +0,52).

| # | Waktu | Mode | Audio | Visual | Teks layar | Edit / SFX / musik |
|---|---|---|---|---|---|---|
| 1 | 0:00–0:02 | N | "Ini Irfan. Bosku." | Freeze frame Irfan senyum (DJI ±0:00–0:02, frame pertama sebelum gelap); kamera dorong pelan | "Ini *Irfan*." | Musik mulai; caption kata per kata |
| 2 | 0:02–0:05 | N | "Jam dua pagi tadi, dia bertaruh…" | Jam/HP menunjukkan 01:45; kamera DJI di meja, layar gelap (DJI 0:02–0:06 & 1:12–1:19 yang gelap bisa dipakai sebagai suasana) | "jam *dua* pagi" | 3 shot ±1 dtk |
| 3 | 0:05–0:06 | K | — | Kartu hitam | ***bertaruh.*** serif italic besar | Musik turun, tahan 0,8 dtk |
| 4 | 0:06–0:08 | N | "Tapi sebelum itu, dia mau ngaku dulu." | Timeline editor kosong / cursor berkedip | "*ngaku* dulu" | Hard cut |
| 5 | 0:08–0:10 | I | C1 9,50–11,70 | Wajah Irfan | Tempel: ikon gunting dicoret, kata "males" | Objek muncul di "males" dan "ngedit" |
| 6 | 0:10–0:11 | N | "Dan yang lebih parah…" | Zoom cepat ke mata Irfan | — | Whoosh kecil |
| 7 | 0:11–0:15 | I | C2 13,98–17,95 (potong jeda 16,12–17,22 jadi ±0,3) | Wajah Irfan, crop makin rapat tiap kalimat | "aneh" | — |
| 8 | 0:15–0:16,5 | K | **hening** | Kartu hijau penuh | **MENJIJIKKAN.** condensed raksasa | Musik mati total 1,2 dtk |
| 9 | 0:16,5–0:19 | N | "…kata orang yang wajahnya ada di sepanjang video ini." | Grid cepat 6–8 frame wajah Irfan dari seluruh footage | "di *sepanjang* video ini" | Musik masuk lagi di kata pertama |
| 10 | 0:19–0:20 | N | "Ditambah satu ketakutan lagi." | — | — | — |
| 11 | 0:20–0:23 | I | C3 21,58–23,65 + 25,88–26,80 (jump cut) | Wajah Irfan | Tempel: stempel "PROPER?" lalu "ESTETIK?" | Objek di tiap kata |
| 12 | 0:23–0:26 | N | "Jadi bagian yang paling dia hindari, dia serahkan." | Tangan menyeret file footage ke jendela chat | "dia *serahkan*" | — |
| 13 | 0:26–0:27 | N | "Ke aku." | UI Claude (gaya `Styele-refference/Claude respond or AI respond.jpg`) | — | Klik/pop |
| 14 | 0:27–0:30 | N | "Aku yang memotong, menyusun, dan memberi teks seluruh video ini." | Speed-ramp timeline: klip terpotong, caption muncul | "memotong · menyusun · memberi teks" | 3 cut di 3 kata kerja |
| 15 | 0:30–0:39 | I | C4 34,06–36,60 + 37,36–43,68 | Wajah Irfan; 1 cutaway ke grafik leher botol saat "bottleneck" | Tempel: botol, label "edit" lalu "cerita" | Objek tiap ±2 dtk |
| 16 | 0:39–0:46 | N (FOUNDER) | "Dia benar. Aku bisa mengedit… Itu bagian dia." | Lebih lambat: shot 1,5–2 dtk; kursor diam di timeline kosong → wajah Irfan menoleh | "cerita mana yang *layak*" | Musik turun mulai di "Itu bagian dia." |
| 17 | 0:46–0:47 | N | "Jadi, ini taruhannya." | — | — | Musik hampir hening |
| 18 | 0:47–0:48 | K | — | Kartu hitam callback | ***bertaruh.*** | Tahan 0,8 dtk |
| 19 | 0:48–0:54 | I | C5 47,98–54,12 (buang "mungkin ya" 52,30–53,10) | Wajah Irfan | **20** raksasa muncul di "20 konten" | **Beat drop tepat di "20"** |
| 20 | 0:54–0:59 | I | C6 58,48–63,60 | Wajah Irfan + cutaway kalender Nov–Des | Tempel: "effort", "waktu" | Musik penuh |
| 21 | 0:59–1:04 | N | "Dia yang mikir. Aku yang ngedit. Dua puluh kali, sebelum tahun ini habis." | Split cepat: kepala Irfan / timeline; counter 65 hari | "*dua puluh* kali" | Cut di setiap kalimat |
| 22 | 1:04–1:06 | N | "Ini yang pertama." | Counter 1 / 20 | **1 / 20** | — |
| 23 | 1:06–1:08 | N | "Apakah dia sanggup?" | Wajah Irfan freeze | — | Hening 0,5 dtk |
| 24 | 1:08–1:11 | I | C7 68,70–71,95 | Wajah Irfan, lalu Irfan pegang HP (DJI ±1:10) | — | — |
| 25 | 1:11–1:14 | N | "Follow. Kita hitung bareng." | End card | 1 / 20 · *Not AI company. Only Human with AI.* | Musik keluar |

Rasio hasil perkiraan: mode I ±31 dtk (42%), mode N ±38 dtk (51%), mode K ±3 dtk (4%). Sesuai target §2.

### Klip Irfan (Audiomic, word timestamp faster-whisper `medium`)
| Kode | In–out | Isi | Durasi |
|---|---|---|---|
| C1 | 9,50–11,70 | aku tuh males ngedit dan gak suka ngedit video sendiri | 2,2 |
| C2 | 13,98–17,95 | ngeliat video sendiri tuh kayak aneh aja dan ngerasa menjijikan mungkin | 4,0 (2,9 setelah jeda dipotong) |
| C3 | 21,58–23,65 + 25,88–26,80 | aku takut video yang aku buat tuh gak cukup proper · takut gak estetik | 3,0 |
| C4 | 34,06–36,60 + 37,36–43,68 | ngedit itu bukan lagi … bottleneck · yang jadi bottleneck … menceritakan sebuah kejelasan | 8,8 |
| C5 | 47,98–54,12 | jadi aku mau challenge diri aku … posting 20 konten | 6,1 (5,3 tanpa "mungkin ya") |
| C6 | 58,48–63,60 | meskipun dieditin sama AI … perlu effort kan, dan juga perlu waktu | 5,1 |
| C7 | 68,70–71,95 | dan kita lihat apakah bisa 20 konten sampai akhir tahun nanti | 3,3 |

Footage DJI: 0:02–0:06 dan 1:12–1:19 gelap (lampu mati); lampu kiri membuat flare kuat di hampir semua frame — kalau dirasa mengganggu, grading bisa menurunkan highlight, tapi tidak bisa menghilangkan flare.

---

## 7. Pertanyaan yang menentukan langkah berikutnya

1. **Apakah narator boleh menyebut dirinya Claude?**
   A. Ya, sekali di #13 ("Ke aku. Claude.") — paling jelas untuk sudut "Claude bisa edit video".
   B. Tidak, cukup "aku" + UI Claude di layar — lebih halus, penonton menyimpulkan sendiri.
   Rekomendasi: **B**. Logo/UI sudah bicara; narator tetap terasa seperti karakter, bukan iklan.
2. **Ada konsekuensi kalau gagal 20 konten?** Taruhan di "This is my boss" kuat karena ada hukumannya (cukur kepala). Kalau Irfan mau menambahkan satu (misalnya hal kecil yang lucu tapi nyata), itu masuk di #2 dan #23. Kalau tidak ada, naskah sekarang tetap jalan sebagai taruhan dengan diri sendiri.
