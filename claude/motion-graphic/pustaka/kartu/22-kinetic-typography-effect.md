# 22 · Kinetic typography + effect "Tutorial Fisheye"

> **Status: standar kualitas Irfan.** Video ini target yang harus dicapai, bukan contoh opsional.
> Sumber: `Kinetictypography,effect 2.mp4` (folder asal: Motion) · 4:3 (960×720), 30 fps, 51,8 dtk (1552 frame) · analisis asal: canvas-skill-library, reference_id LOC-25da6909e2ae · Frame: `../../guide/referensi/sheets/22-kinetic-typography-effect.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/22-k*.jpg` · Bedah lengkap: `canvas-skill-library: skills/canvas-reference-director/references/cards.json (reference_id LOC-25da6909e2ae)`; data ukur: `ukuran.md`
> Kedalaman bedah: **dalam** (ukur piksel dari video sumber 960×720; batas: lihat `ukuran.md`)

**DNA (satu kalimat):** Tutorial efek bertempo tinggi di mana hampir setiap kata yang diucap muncul di layar: kata sans tebal kuning/putih bercahaya menempel dan melengkung mengikuti subjek (kepala, siluet, bola fisheye), huruf kolase ala surat kaleng untuk kata judul, lalu caption satu kata di bawah tengah untuk langkah UI yang gelap.
**Cocok untuk:** tutorial efek/editing, hook konten kreator, penjelasan "3 cara" dengan demo before/after · **Tidak cocok untuk:** narasi tenang/premium, teks panjang yang harus dibaca, brand korporat yang kalem
**Kata kunci gaya:** energik, kuning-hitam, kolase, kata menempel subjek, teks lengkung, glow
**Diambil untuk:** `Kinetictypography,effect 2.mp4`: "Kinetic typography" → animasi teks (bagian 2, dibedah paling dalam); "effect" → efek visual (bagian 5 dan 6). Bagian terkuat: teks yang menempel/melengkung mengikuti subjek.

## PENGIKAT (diambil utuh dari SATU kiblat; ini yang membuat video terasa satu keluarga)

### 1. Warna & tekstur
- Teks kuning `#EDDE40`–`#EFE247` (inti huruf) dengan glow kuning lembut; teks putih dengan bayangan gelap tipis. Hanya dua warna teks; huruf kolase membawa warnanya sendiri.
- Bidang kuning pekat `#FCFF32` berbentuk petir/gerigi + garis speed-line hitam-putih di adegan hook.
- Latar gelap `#0D0D0D`–`#0E0B0C` (adegan fisheye), UI `#151515`–`#212121`; latar menu "1 2 3" cokelat buram `#241A13` → `#513F2B` (gradien diagonal, terlihat seperti footage yang di-blur berat).
- Vignette kuat di adegan fisheye: sudut lum 12–13 vs tengah 65–74 (0–255). Adegan UI hampir rata (21 vs 24).
- A-roll: dinding biru `#4662E7`–`#4E72ED` dengan bayangan jendela, kulit hangat, kontras tinggi. Siluet: biru `#093AD0` di putih `#FFFFFF`, tepi buram (glow).
- Grain: tidak terlihat; UI diberi garis scanline halus (dialog "Add custom connector").

### 2. Teks
- Font: sans grotesk tebal, mirip Helvetica Neue Bold / Inter ExtraBold, tracking rapat, huruf kecil. Kata judul: huruf kolase surat kaleng (tiap huruf beda font/warna/kotak) yang berganti gaya tiap ±5 frame ("VIDEOS", "VISUAL STORYTELLING").
- Dua mode teks:
  - **Hero kinetik** (hook dan demo efek): 3–8 kata menumpuk di layar, kata tersebar mengelilingi/menempel subjek; bbox kata 5–13 % tinggi frame; ukuran campur 1,8–2× dalam satu frame.
  - **Caption satu kata** (UI dan A-roll penutup): SATU kata di x 50 %, y 66 %, bbox 4,0–5,0 % tinggi; putih, kata kunci kuning; kata baru menggantikan kata lama.
- Teks mengikuti bentuk subjek: melengkung di atas/bawah bola fisheye ("Let me show you", "The Fisheye Effect", "and bend the world around them."), menurun diagonal di sepanjang kontur siluet kepala ("were ahead of your editing"), busur di atas bahu A-roll ("then realised", "same scene").
- Penekanan: warna kuning + ukuran (hero) atau warna saja (kalimat satu baris "Keep your subject **centered**", semua 4,7 %). Tanda kutip untuk kata CTA ("Comment "Effect"", 7,5 %).
- Masuk: per kata, sigap (pop tanpa fade panjang); kata panjang terbuka per huruf kiri→kanan dalam ±3 frame. Keluar: sekaligus di cut. Kata lama tetap sampai kalimat selesai (hero).

### 3. Ritme
- 19 cut = 22,0/menit, shot median 1,4 dtk, event visual 37/menit (`pace_read.py`, kategori `energi`).
- Porsi: wajah ±21 %, demo efek + grafik ±41 %, rekaman UI ±38 %.
- Babak: hook 0–4,5 dtk paling rapat (kolase, siluet ganti tiap 0,5–1 dtk) → demo 4,5–22,5 bergantian bola/kotak fisheye ↔ menu "1 2 3" → UI 24–46 lebih lambat, tempo dibawa caption per kata → CTA wajah 46,5–51,8.

## TEKNIK (boleh dipinjam referensi lain; selalu dikenakan pengikat kiblat)

### 4. B-roll / footage
- Satu footage contoh (pria di depan kuil, kimono zebra) dipakai berulang sebagai bahan demo efek: kotak bersudut bulat → bola fisheye.
- Kolase hook: potongan thumbnail video miring berbingkai kuning, presenter cutout ber-outline putih di depannya.
- Rekaman layar Claude/Invideo: panel gelap, dimiringkan 3D, sebagian buram; teks UI tidak untuk dibaca, caption yang membawa makna.

### 5. Motion graphic
- Siluet kepala (kuning di hitam, lalu biru di putih) dengan coretan "ide" di dalam kepala = "your ideas"; kata mengalir di sepanjang kontur.
- Menu bab "1 2 3": ubin angka transparan muncul satu per satu, panah putih digambar (stroke) ke nomor aktif, ikon bookmark kuning untuk "save this". Kembali di antara tiap cara.
- Demo efek: kotak footage melengkung menjadi bola fisheye (before → after) sesuai ucapan "bend the world".
- **Skala subjek:** satu subjek besar: bola fisheye 55–62 % lebar × 80–95 % tinggi; kotak footage ±85 % lebar × 82 % tinggi; siluet 41–63 % lebar × 72–86 % tinggi (terpotong bawah); panel UI ±75 × 75 %; ikon bookmark 17 × 27 %.
- **Kedalaman:** 3 lapis: latar (hitam bervignette / cokelat buram / kolase) → subjek (bola, cutout, panel) → teks di depan yang menumpuk ke tepi subjek. Latar selalu redup atau buram; glow di tepi bola/siluet.

### 6. Kamera & transisi
- Footage fisheye nyaris diam (skala 0,93–1,00, geser ≤ 3 %); UI bergerak pelan: pull ±26 % dalam 2,5 dtk, push ±22 % + pan 17 % dalam 3,5 dtk; editor diam.
- Menu "1 2 3" dimiringkan (bidang 3D berputar ±30°).
- Transisi: whip blur/zoom (cutout membesar buram → A-roll buram, ±3 frame), zoom-through putih dengan garis radial (±1–2 frame, 12,0 dan 20,0 dtk) masuk ke fisheye, morph kotak → bola (±1 dtk), cut keras ke bidang kuning. Pemicu: kata kunci kalimat dan nomor cara.

### 7. SFX
- earshot: 363 event (7,0/dtk); bertag 34 hit/sub-drop, 16 pop UI, 4 drum, 2 riser, 1 whoosh (tag = petunjuk lemah).
- Aksen terkuat di transisi: 12,46 dtk (+23 dB, zoom-through), 24,52 (+22 dB, masuk UI), 14,19 (+17 dB).
- Pop/klik mengiringi kata dan klik UI; sub-drop di ganti adegan. Level SFX setara suara (puncak −1 dBFS), tidak ditekan di bawah.

### 8. Musik
- Techno/tech house 0–18,75 dtk → funk dengan vocal chop 18,75–akhir (earshot). librosa 144 bpm, tapi tanpa grid beat tegas (pulse clarity 0,13): bpm belum pasti.
- Mix −14,1 LUFS, true peak +1,5 dBFS (ffmpeg; clip), LRA 2,5 LU; musik dekat level suara, nyaris tanpa dinamika.

## Proporsi terukur (11 Nov 2026, dari video sumber; % terhadap frame 4:3; tinggi = bbox kata termasuk ascender/descender)
| Jenis adegan | Kata kunci (% tinggi) | Kata sambung | Posisi teks | Skala subjek | Kedalaman |
|---|---|---|---|---|---|
| Wajah + kolase (k1) | "So" 12,6; "you" 8,6 | "started" 6,9 (rasio 1,8) | tersebar di kiri-kanan dada dan bahu | cutout presenter ±55 % lebar | kolase miring + speed-line → cutout → kata |
| Siluet + kata (k2) | 7,9–10 | 3,8–6,9 | diagonal di kontur depan wajah | siluet 41–63 × 72–86 % | bidang kuning/putih → siluet bercahaya → kata |
| Bola fisheye + teks lengkung (k3) | "show" 10 (busur) | 6,5–7,2 | busur di atas dan bawah-dalam bola | bola 55–62 × 80–95 % | hitam vignette → bola bercahaya tepi → teks |
| Menu "1 2 3" (k4) | bookmark ikon 27 % | "So save this" 5,4 | kanan-tengah; kalimat diagonal ikut bidang miring | 3 ubin kecil ±9 % | cokelat buram → ubin transparan → panah/teks |
| Wajah + huruf kolase (k5) | "VISUAL" ±12,5 | "This is" ±6,3 (rasio 2) | dada, pusat x 55 %, y 70–85 % | wajah ±30 % tinggi | A-roll → bidang kuning petir → huruf |
| Kotak fisheye + kalimat (k6) | "centered" 3,9 (kuning) | 4,7 (sama) | satu baris, pusat x 50 %, y 50 % | kotak ±85 × 82 % | hitam → kotak bersudut bulat → teks |
| UI + caption (k7) | kuning 4,2 | putih 4,3–5,0 | 1 kata, x 50 %, y 66 % | panel ±75 × 75 % | hitam → panel 3D miring buram → caption |
| Wajah + caption CTA (k8) | "Effect" 7,5 | 3,9–4,2 | 1–2 kata, x 50 %, y 60–68 % | wajah ±30 % tinggi | A-roll → caption |

- Kata kunci : kata sambung = 1,8–2× di adegan hero; di caption satu kata ukurannya sama, beda hanya warna.
- Garis pusat caption konstan (y 66 %) di seluruh babak UI dan CTA.

## Cek kemiripan (dipakai juri saat menyandingkan still)
- Teks hanya kuning (±`#EEDF40`, bercahaya) dan putih; huruf kolase hanya untuk 1–2 kata judul.
- Adegan hero: kata menempel/melengkung mengikuti tepi subjek (busur bola, kontur kepala, bahu), bukan baris subtitle.
- Adegan hero: bbox kata kunci 8–13 % tinggi frame, kata sambung 4–7 %, rasio ±2.
- Caption langkah: satu kata, bbox 4–5 % tinggi, pusat x 50 % y ±66 %.
- Satu subjek besar per adegan (bola/kotak/siluet/panel ≥ 55 % lebar atau ≥ 72 % tinggi), bukan banyak objek kecil.
- 3 lapis: latar redup/buram (vignette sudut ≤ 20 % kecerahan tengah) → subjek terang → teks di depan.
- Latar hanya hitam, cokelat buram, atau bidang kuning `#FCFF32` bergerigi; A-roll berlatar biru.
- Ada still demo before/after: kotak bersudut bulat lalu bola fisheye bertepi bercahaya.
- ±22 cut/menit, shot median ±1,4 dtk; hook 4 dtk pertama lebih rapat dari sisanya.

## Catatan pakai
- Belum pernah dipakai sebagai kiblat di video; baru diuji lewat rekonstruksi still.
- 12 Nov, uji rekonstruksi (Irfan): paling mendekati sejauh ini; kurang bayangan dan pencahayaan supaya tulisan tampak menyala.
