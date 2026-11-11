# 72 · arpan.motions "Relocate" (storyboard vs final)

> **Status: standar kualitas Irfan.** Video ini target yang harus dicapai, bukan contoh opsional.
> Sumber: arpan.motions (Instagram `DfCMjSySmJd`), file `~/work/pustaka-video/mac/arpan.motions_DfCMjSySmJd.mp4` · 9:16 (720×1280, 30 fps), 22,4 dtk; isinya video promo 16:9 (720×410) di tengah · Frame: `../../guide/referensi/sheets/72-arpan-motions.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/72-k*.jpg` · Bedah lengkap: `ukuran.md` (folder audit 72)
> Kedalaman bedah: **dalam** (resolusi 720 p: panel final hanya 410 px tinggi, ±0,25 % per piksel)
> Cek PETA (11 Nov): kartu baru, bukan kartu lama. Durasi mirip 52 Energy & The Sun (21,9 dtk) tetapi isinya lain (bukan montase kutipan tokoh).

**DNA (satu kalimat):** Promo aplikasi 16:9 yang lembut: kata ber-VO muncul per kata di atas gradien krem-hijau yang "bernapas", diselingi render 3D cerah (pesawat, kartu kaca, ponsel) dan satu kata kunci besar per gagasan, dipamerkan dalam reel tiga tingkat (sketsa storyboard / hasil / CTA).
**Cocok untuk:** promo aplikasi atau layanan ber-VO 15–30 dtk, explainer produk SaaS, reel "di balik layar" storyboard → hasil · **Tidak cocok untuk:** talking head, konten arsip gelap, ceramah panjang
**Kata kunci gaya:** lembut, gradien bernapas, hijau segar, UI kaca, per kata, premium-ramah
**Diambil untuk:** nama file "arpan.motions" (`arpan.motions_DfCMjSySmJd.mp4`): nama tidak menyebut bagian; lihat bagian terkuat: Motion graphic (gradien + objek 3D + UI) dan Teks per kata.

## PENGIKAT (diambil utuh dari SATU kiblat; ini yang membuat video terasa satu keluarga)

### 1. Warna & tekstur
- Latar inti: gradien krem `#F4F4ED` di tengah, pita atas `#D4E2D6`, kabut hijau radial naik dari bawah `#6BAC86`. Sama persis di 7 adegan teks/UI (hex identik 5,5–19,5 dtk).
- Aksen tunggal hijau: teks `#2C8856`, pil pesan `#2C8856`, adegan coordinator `#6DE4A3` / `#2A8654` / `#9DE7BD`.
- Pembuka dan babak masalah memakai warna sendiri: langit `#2E9EFB` → `#BADDFD` (pesawat), lanskap senja oranye-ungu (UI cari); penutup gelap `#1A1812` dengan cokelat `#735732`.
- Satu kontras: bingkai ponsel oranye `#CC7D30` di dunia hijau.
- Tanpa grain. Kabut hijau bawah menutupi bagian bawah objek (kartu, ponsel) sehingga objek "tenggelam" ke latar.
- Panel storyboard: abu terang ±`#F7F7F7`, garis pensil hitam, catatan tulisan tangan + panah. Panel CTA: hitam di atas timeline After Effects yang diburamkan.

### 2. Teks
- Font: sans geometris-grotesk bobot medium, tracking rapat (paling mirip Satoshi / General Sans Medium; perkiraan). Penutup "relocate": serif tipis hanya garis luar (outline). Judul pembuka "Netherlands": sans putih semi-transparan.
- Kata sambung (kalimat 3–4 kata: "and still arrive", "and a dedicated", "You always know"): tinggi huruf 5,1–5,6 % panel (7,1 % bila ada huruf turun). Lebar blok 25–31 %. Pusat (50 %, 50 %).
- Kata kunci sendirian: "unsettled" 13,2 %, pil "one message away" 14,6 % (teks di dalamnya ±7 %), "coordinator" di kartu 7,8 %, "relocate" ±20 %, "Netherlands" 22–24 % (keluar tepi kanan). Rasio kunci : sambung **±2,4×** (judul pembuka ±4×).
- Kata per tampil: kalimat 3–4 kata ATAU satu kata kunci; tidak pernah paragraf. Kalimat VO dipecah: kalimat kecil → layar kata kunci besar ("and still arrive" → "unsettled").
- Penekanan: ukuran + wadah (grid dengan titik sudut, kartu putih, pil hijau), bukan warna lain. Teks selalu hijau tua di latar terang, putih di langit.
- Masuk: per kata, tiap kata naik/turun ±2 % sambil memudar ("know" masih di bawah garis, "next" masih di atas). "Netherlands" per huruf. "coordinator" diacak lalu terkunci (frame "cooryinator", "coordinatoc"). Watak pelan-halus (catatan storyboard: "fades in with slight upward motion").
- Posisi terhadap subjek: teks di tengah sendirian, atau di dalam objek (kartu, pil, bar cari), atau di belakang objek sebagai pola samar (coordinator berulang, opasitas rendah).

### 3. Ritme
- Panel final: 13 shot dalam 22,4 dtk = **±32 pergantian/menit**, shot median **±1,3 dtk** (0,5–6,1 dtk).
- Cepat: 17,2–18,6 dtk (tiga ketukan teks ±0,5–0,7 dtk). Lambat: ponsel chat 11,2–17,3 dtk (6,1 dtk, satu-satunya shot panjang).
- Teks di gradien berganti tanpa cut (latar tetap, hanya kata berganti); `pace_read.py` pada frame penuh membaca 1 cut karena tata letak 3 panel tetap, event visual 35/menit.

## TEKNIK (boleh dipinjam referensi lain; selalu dikenakan pengikat kiblat)

### 4. B-roll / footage
- Tidak ada footage kamera. "B-roll" = render 3D/AI: pesawat di awan, lanskap senja padang bunga, lanskap buram gerak di penutup.
- Hubungan dengan ucapan harfiah: "Moving to the Netherlands" → pesawat; "Most students spend months" → langit; keluhan pencarian → bar cari "Student housing Netherlands" + 3 kartu komentar.
- Perlakuan: penuh frame, warna jenuh, penutup diburamkan arah (motion blur) ±kuat sebagai latar kata.

### 5. Motion graphic
- Gradien bernapas sebagai panggung tetap; objek UI kaca (kartu layanan transparan, mengipas melengkung 3D, tepinya larut ke kabut).
- Simbol kecil (@ $ # % ^ *) melayang di sekitar kalimat untuk "urusan administrasi"; grid tipis + 4 titik sudut membingkai "unsettled".
- Kartu putih miring "coordinator" di atas lingkaran + oktagon hijau berlapis, pola kata samar di belakang.
- Ponsel oranye dengan chat Relocate: gelembung muncul bergantian, layar menggulir; penutup pil pesan + avatar memantul.
- **Skala subjek:** satu subjek besar per adegan: pesawat 59×33 %, ponsel 44 % lebar × >100 % tinggi (terpotong bawah), kartu coordinator 37×57 %, lingkaran ±61 % lebar; bar cari 57 % lebar. Pengecualian: kipas 7 kartu kaca (±20 % lebar tiap kartu) dan simbol kecil.
- **Kedalaman:** 2–4 lapis: latar gradien / objek / kabut hijau depan di bawah. Coordinator 4 lapis (latar hijau muda, oktagon, lingkaran + pola teks, kartu bersudut tumpul dengan bayangan). Pesawat: awan di depan dan di belakang + garis kecepatan. Tidak ada blur kedalaman kecuali penutup.

### 6. Kamera & transisi
- Kamera virtual sebagian besar diam; gerak datang dari objek. Terukur (ORB, panel final): lanskap UI tarik mundur −5 %; "unsettled" diam (±0,4 %); kartu coordinator dorong +7,6 %; penutup geser ±18 % lebar ke kiri.
- Pesawat: "fast lateral move" (catatan storyboard), awan melayang pelan.
- Transisi: cut dengan sisa gerak 0,3–0,45 dtk (1,43 dtk, 11,17 dtk: kartu coordinator menjadi panel, kata pindah ke kiri atas, ponsel naik dari bawah = match-move); cut keras ke gelap di 20,97 dtk; antar-kalimat di gradien = ganti kata, latar tetap.
- Pemicu: kata VO (tiap gagasan baru = adegan baru).

### 7. SFX
- earshot: 157 event (7,0/dtk): 41 UI ("chat message pop", "bubble pop", "notification ding"), 33 hit ("sub bass drop"), 15 voice. Aksen terkuat: pop chat 13,86 dtk (+27 dB di atas bed).
- Pop/klik untuk tiap kata, kartu, gelembung chat; sub-drop pada pergantian adegan; whoosh pendek (16,22 dtk). Level SFX terhadap VO: tidak terukur (tanpa stem).

### 8. Musik
- House dengan vocal chop, "confident and cool" (earshot); 110 bpm (earshot, pulse lemah 0,16) / 117 bpm (librosa). Satu babak rata; puncak keras 19–22 dtk (−12,7 LUFS short-term).
- Mix −14,2 LUFS, true peak +0,8 dBFS (ebur128; terpotong), LRA 1,7 LU. VO narasi terdeteksi (AST 0,6–0,85); teks layar tampaknya mengikuti VO (transkrip tidak dibuat).

## Proporsi terukur (11 Nov, dari video sumber; % terhadap panel final 16:9, 720×410)
Rinci: `ukuran.md`. Frame kunci ukuran penuh: `keyframes/72-k1…k8-*.jpg`.

| Jenis adegan | Kata kunci (% tinggi) | Kata sambung | Posisi teks | Skala subjek | Kedalaman |
|---|---|---|---|---|---|
| Judul + pesawat (k1) | 22–24 ("Netherlands") | label pil ±3 | judul kiri atas keluar tepi; label menempel ekor pesawat | pesawat 59×33 % | awan depan/belakang + garis cepat |
| UI cari + lanskap (k2) | tidak ada | komentar ±2,5 | bar cari pusat atas (y 15–26 %), 3 kartu tersebar | bar 57 % lebar, kartu ±27 % | lanskap / kartu putih ber-bayangan |
| Kata kunci + grid (k3) | 13,2 ("unsettled") | – | pusat, dibingkai grid + 4 titik sudut | tanpa subjek | gradien + grid tipis |
| Kipas kartu kaca (k4) | judul kartu ±3 | isi ±2 | di dalam kartu | 7 kartu ±20 % lebar, busur penuh lebar | kartu kaca larut ke kabut |
| Kalimat + simbol (k5) | – | 5,6 | pusat (50, 50) | simbol kecil ±3 % | gradien + simbol melayang |
| Kartu coordinator (k6) | 7,8 di kartu; pola belakang ±25 | – | di dalam kartu miring | kartu 37×57 %, lingkaran ±61 % | 4 lapis + bayangan |
| Ponsel chat (k7) | nama app ±3 | gelembung ±2,5 | di dalam layar | ponsel 44 % lebar, >100 % tinggi | gradien / ponsel / kabut depan |
| Pil + penutup (k8) | pil 14,6 (teks ±7); "relocate" ±20 | 5,1 ("the next") | pusat; penutup pusat-kanan | pil ±41 % lebar | gelap buram-gerak + outline serif |

- Rasio kata kunci : kata sambung **±2,4×**; kata sambung satu ukuran (5,1–5,6 %).
- Batas ukur: panel 410 px (±0,25 % per piksel); angka kata kecil ±10 %; "relocate" dan skala objek k1/k4/k6 dibaca dari koordinat piksel gambar, bukan mask otomatis.

## Cek kemiripan (dipakai juri saat menyandingkan still)
- Latar adegan teks: krem `#F4F4ED` di tengah dengan kabut hijau `#6BAC86` dari bawah; sama di semua adegan teks.
- Satu aksen hijau (`#2C8856`) untuk teks dan wadah; warna lain hanya dari objek/render (langit biru, ponsel oranye).
- Kata sambung 5–6 % tinggi frame di tengah, blok ≤ 31 % lebar; kata kunci ±13–15 % (rasio ±2,4×).
- Tiap layar: 3–4 kata ATAU satu kata kunci di wadah (grid bertitik, kartu, pil); tidak ada paragraf.
- Satu subjek besar per adegan (40–60 % lebar), boleh terpotong tepi; objek bawah larut ke kabut hijau.
- Objek UI bersudut tumpul dengan bayangan lembut; kartu kaca transparan.
- Tidak ada grain; tidak ada footage kamera; render 3D cerah untuk adegan harfiah.
- Penutup: kata merek serif outline di atas latar gelap buram-gerak.

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
