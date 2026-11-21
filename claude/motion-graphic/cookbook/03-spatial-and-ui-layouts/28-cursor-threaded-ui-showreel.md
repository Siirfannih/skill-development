---
id: "28"
pola: Cursor-Threaded UI Showreel
kategori: layout
kategori_lain: [camera, texture]
trigger: intro atau portofolio desainer dalam satu menit; demo produk AI dengan kolom prompt; pesan "satu alat menyatukan semua aplikasi"
sumber: freelance motion designer (file kiriman Irfan "Applestyele.mp4"; kartu akhir @jaafar.aid) · 16:9 · 19,4 dtk
dilihat_bergerak: tidak
diukur: ya
alias: []
---
# 28 · Cursor-Threaded UI Showreel

> **Cookbook, bukan template.** Yang dipinjam dari kartu ini: mekanik gerak dan syarat yang membuatnya berhasil. Yang tidak dipinjam: palet, huruf, komposisi, objek, dan kata-katanya. Angka berlabel *pengamatan* berasal dari video asli; angka di **Mekanik Remotion** adalah titik awal yang disesuaikan lewat sanding (`../../scripts/juri/sandingkan.py`), bukan target.
> Sumber: `Applestyele.mp4` (folder asal: Motion; kreator di kartu akhir @jaafar.aid) · 16:9 (1280×720), 30 fps (577 frame), 19,4 dtk, tanpa VO · analisis asal: canvas-skill-library LOC-cc090eec9187; data ukur `ukuran.md` · Frame: `../../guide/referensi/sheets/28-apple-style-cursor-desktop.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/28-k1-grid-teks.jpg` … `28-k8-kartu-akhir.jpg` (k2 timeline gelap, k3 tag neon + kursor, k4 kartu + tile, k5 dock lanskap, k6 monitor + jendela, k7 prompt + kursor)
> Video sumber: `/home/irfan/work/canvas-skill-library-20261102/data/local-videoanalys-20261102/Motion/Applestyele.mp4`
> Dilihat bergerak: **tidak** (bedah dari frame diam dan pengukuran; gerak kamera dari ORB global, bukan keyframe asli; bedah geraknya sebelum meminjam teknik)
> Audit GrokAgent "Apple_Styele" (44,7 dtk, iklan Holo) bukan video ini; angkanya ada di kartu 30.

**Inti mekanik (1 kalimat):** Satu kursor biru 3D menjahit adegan UI: menunjuk, meng-hover (tag menyala), membuka kartu, mengklik tombol kirim, sementara kamera virtual terus push dan pull dan tiap cut jatuh di ketukan musik.
**Narrative trigger:**
- Memperkenalkan beberapa kemampuan sebagai deretan label yang "dipilih" → T1
- Berpindah dari kartu atau ringkasan ke konteks yang lebih besar → T2
- Menunjukkan satu perintah AI yang diketik dan dikirim → T3
- Menutup dengan "semua ini terkumpul di satu tempat" → T4
- Pembuka satu kata dengan anotasi ukuran → T5
**Jangan dipakai untuk:** konten berbasis ucapan atau VO panjang, cerita emosional, label kecil yang wajib terbaca di ponsel.
**Kata kunci gaya:** bersih, kursor biru, kanvas desain, kaca, push-pull terus, techno
**Diambil untuk:** **tampilan visual dan gerak UI** ("Apple style"; dibedah paling dalam: warna (1), motion graphic + skala + kedalaman (5), kamera & transisi (6)).

## Kondisi footage asli
16:9, tanpa footage kamera; satu lanskap bukit (render/foto, 6–11 dtk) sebagai "wallpaper desktop"; rekaman layar aplikasi nyata (chat, Notion, galeri) sebagai jendela bertumpuk. Dua dunia: kanvas terang dengan grid titik dan ruang gelap dengan grid redup. Satu subjek besar di tengah tiap adegan. Kamera virtual bergerak terus kecuali kartu akhir.

## Pengikat (dipakai utuh hanya bila kartu ini dipilih sebagai pengikat video)
### Warna & tekstur
Kanvas terang `#F1F2EA` (putih hangat kehijauan) dengan grid titik; ruang gelap `#0E0A13`. Aksen biru kursor `#2869FA`–`#2D6FFF` (tepi putih, bayangan); oranye `#F87015` hanya di babak gelap. Tag neon: garis tepi biru berpendar; lanskap grade pucat; kartu akhir gradien radial navy `#000417` → biru `#225CE3`. Tanpa grain.
### Teks
Neo-grotesk (mirip Inter / SF Pro): "Hi" Bold rapat (cap 21,2 % tinggi frame), tag Semibold, prompt Regular, diketik per huruf dengan caret. Teks sedikit: satu kata, label per tag, satu kalimat prompt, tiga baris kartu akhir. Penekanan lewat warna atau glow, bukan ukuran; tanpa caption.
### Ritme
7 cut besar = 21,7/menit, shot median 1,4 dtk, ±13 cut keras termasuk montase kilat 5 cut dalam 0,6 dtk (10,1–10,8). Babak: "Hi" 0–1 → ruang gelap 1–5,8 → zoom-through lanskap 5,8–8,1 → desktop 8,1–12 (tercepat) → zoom-out dan prompt 12–16,3 → kartu akhir 16,3–19,4 (diam).

## Pola

### T1 · Cursor-Hover Neon Activation · layout
- **Trigger:** memperkenalkan beberapa kemampuan sebagai deretan label yang "dipilih" satu per satu.
- **Yang terlihat (termasuk gerak):** satu baris tag di ruang gelap (y ±48 %); kursor biru lewat di atas satu tag dan tag itu menyala (pill dengan garis tepi neon dan glow), yang lain redup dan buram. Kamera push 1,84× dengan pan. Di k3 label "Motion" menyala dan label Arab ("أفكار") tepat di bawah kursor. (k3; sekitar 2–5 dtk)
- **Kenapa bekerja:** kursor mengarahkan mata ke satu tag; yang tidak aktif dibuat buram sehingga hanya satu fokus.
- **Mekanik Remotion (titik awal):**
  - Lapisan (bawah → atas): latar gelap + grid titik → tag redup (`blur(2px)`, opacity 0,5) → tag aktif (`box-shadow: 0 0 24px biru`) → kursor.
  - Gerak: kursor berjalan di path dengan `CURVE.heavy` ±24 f dan busur kecil (`arc` di `curves.ts`); tag aktif opacity/blur/glow berubah 6 f saat kursor tiba; push kamera 1,00 → 1,84 `CURVE.heavy` ±45 f.
  - Ruang: datar atau `perspective: 1200px` ringan.
  - Blur & blend: tag buram `filter: blur(2px)`; glow `mixBlendMode: "screen"`.
- **SFX:** hampir tidak ada SFX terpisah; ketukan musik berperan sebagai SFX. Untuk hover aktif: `ES_User Interface, Click, Pops, Glass, UI, Pops` satu per tag aktif, bukan per tag lewat.
- **Pakai bila:** 4–7 label pendek. · **Jangan pakai bila:** label kecil yang wajib terbaca di ponsel (periksa: label 8,4 % tinggi frame, bukan 4–5 % seperti kartu lama).
- **Remix (anti-jiplak):**
  1. Toko UMKM → label produk di pill kayu cokelat, kursor diganti tangan; pertahankan hover menyalakan satu.
  2. Latar terang → pill putih dengan bayangan lembut, tag aktif berwarna aksen.
  3. 9:16 → label dalam kolom, kursor naik-turun.
- *Pengamatan di video asli, bukan target:* periksa: tinggi label "Motion" **8,39 % tinggi frame** (51 px dari 608 px; kartu lama ±4–5 %: dikoreksi); kursor 11 × 17 % saat dekat.

### T2 · Card Zoom-Through to Scene · camera
- **Trigger:** berpindah dari ringkasan (kartu profil) ke konteks yang lebih besar (dunia di balik kartu).
- **Yang terlihat (termasuk gerak):** pull 0,66× ke kartu profil (±56 × 22 % di tengah, dikelilingi 4 tile 15 % lebar di sudut dengan garis oranye bercahaya; periksa: avatar siluet di kiri kartu dan tombol lingkaran oranye "+" di kanan), lalu push 1,6× menembus kartu ke lanskap bukit (5,8–8,1 dtk); dock ikon duduk di tengah vertikal (y 42–58 %, ±52 % lebar), kaca buram di atas lanskap. (k4, k5)
- **Kenapa bekerja:** gerak masuk ke kartu memberi arah "makin dalam"; kartu tetap tajam sampai tepi frame.
- **Mekanik Remotion (titik awal):**
  - Lapisan: gelap + grid → tile → kartu (isi: lanskap) → lanskap penuh (muncul saat scale ≥ 4).
  - Gerak: `scale` kartu 1 → 6 `CURVE.heavy` ±30 f dengan pivot di tengah kartu; saat scale ≥ 4 crossfade 4 f ke lanskap; dock `translateY` 20 → 0 `CURVE.land` ±12 f.
  - Ruang: datar.
  - Blur & blend: motion blur `<CameraMotionBlur shutterAngle={200} samples={16}>`; dock `backdrop-filter: blur(24px)`.
- **SFX:** whoosh sedang di zoom-through (2 whoosh total di referensi: 10,40 dan 14,40 dtk). Padanan: `Woosh.mp3` (gerak kamera sedang).
- **Pakai bila:** kartu berisi gambar yang bisa jadi adegan penuh. · **Jangan pakai bila:** kartu tanpa gambar dalam (zoom ke kosong).
- **Remix (anti-jiplak):**
  1. Produk e-commerce → kartu produk → menembus ke foto lifestyle.
  2. Latar terang → kartu putih bergaris tipis, lanskap diganti foto cerah.
  3. 9:16 → tembus vertikal, dock di tengah.
- *Pengamatan di video asli, bukan target:* dock ikon 8,9 × 15,8 %; kursor 9–11 % tinggi.

### T3 · Typed Prompt Send Click · layout
- **Trigger:** menunjukkan satu perintah AI yang diketik dan dikirim; akhir demo.
- **Yang terlihat (termasuk gerak):** kolom prompt (kotak y 31–69 %, melebar keluar kanan), diketik per huruf dengan caret ("Describe what you want to create…"), mention diberi blok sorot biru muda; kursor di bawah kotak, close-up tombol kirim (kursor 24 % tinggi), klik, cut keras ke kartu akhir. (k7; 12–16,3 dtk)
- **Kenapa bekerja:** hanya satu kalimat dan satu klik; cut tepat setelah klik memberi rasa selesai.
- **Mekanik Remotion (titik awal):**
  - Lapisan: kanvas terang → kotak prompt (bayangan lembut) → teks diketik → kursor.
  - Gerak: ketik 1 f per huruf; sorot biru muda melebar `scaleX` 0 → 1 ±8 f; kursor ke tombol `CURVE.heavy` ±20 f; tombol `scale` 1 → 0,92 → 1 di klik; cut keras 2 f setelah klik.
  - Ruang: datar. Blur & blend: tanpa.
- **SFX:** satu `Enter.mp3` di klik kirim; ketikan senyap atau `Keyboardtyping.mp3` pelan; kick penutup referensi 18,90 dtk (+21 dB).
- **Pakai bila:** demo satu perintah. · **Jangan pakai bila:** alur multilangkah.
- **Remix (anti-jiplak):**
  1. SaaS CRM → kolom pencarian pelanggan; pertahankan klik → cut.
  2. Latar gelap → kolom kaca gelap, glow biru.
  3. 9:16 → kolom prompt lebar penuh di tengah.
- *Pengamatan di video asli, bukan target:* baris prompt 8,9 % tinggi (cap ±6 %).

### T4 · Morph Zoom-Out Collapse · camera
- **Trigger:** menyatukan banyak aplikasi atau fitur ke satu titik atau satu tempat.
- **Yang terlihat (termasuk gerak):** pull bertahap 0,89× → 0,83× → 0,81× dari dock ke monitor; pull cepat 0,32× dalam 0,47 dtk (monitor 75 × 87 % → cincin bulat biru → titik kecil di kanvas terang); lalu pull 0,54× ke kanvas. Montase kilat 5 jendela dalam 0,6 dtk (10,1–10,8 dtk). (k6; 10,1–13 dtk)
- **Kenapa bekerja:** semua jendela mengecil ke satu titik yang menjadi awal adegan berikutnya.
- **Mekanik Remotion (titik awal):**
  - Lapisan: gradien biru → monitor + jendela → cincin SVG → kanvas terang.
  - Gerak: `scale` 1 → 0,32 `CURVE.whip` ±14 f; cincin `borderRadius` 8 % → 50 % ±8 f; warna latar gelap → terang crossfade 6 f.
  - Ruang: datar. Blur & blend: motion blur 200°.
- **SFX:** whoosh di pull cepat (14,40 dtk); padanan `Wooshcameramovementtransisi.mp3`.
- **Pakai bila:** ada ≥ 3 jendela atau fitur untuk dikumpulkan. · **Jangan pakai bila:** hanya satu fitur.
- **Remix (anti-jiplak):**
  1. Aplikasi kasir → jendela mengecil ke ikon kasir.
  2. Latar terang → ring abu, titik hitam.
  3. 9:16 → collapse ke pusat vertikal.
- *Pengamatan di video asli, bukan target:* monitor 75 × 87 %; bezel bawah lebih tebal dengan tiang tengah (periksa).

### T5 · Dimension-Annotated Hero Word · typography
- **Trigger:** pembuka satu kata dengan rasa "dirancang".
- **Yang terlihat (termasuk gerak):** "Hi" bold sangat rapat di tengah kanvas terang (cap 21,2 % tinggi), pusat x 50 % y 50 %; anotasi ukuran "235px/207px" ±1 % menempel di sisi huruf (rasio ±20×), garis bantu putus-putus memotong frame; kursor di kanan atas huruf; shot diam 1,02×. (k1; 0–1 dtk)
- **Kenapa bekerja:** anotasi ukuran memberi kesan alat desain; satu kata di tengah memberi fokus.
- **Mekanik Remotion (titik awal):**
  - Lapisan: kanvas + grid titik → garis bantu → kata → anotasi → kursor.
  - Gerak: kata `scale` 0,9 → 1 `CURVE.land` ±14 f; garis bantu `strokeDashoffset` ±10 f; kursor masuk dari kanan `CURVE.heavy` ±20 f.
  - Ruang: datar. Blur & blend: tanpa.
- **SFX:** swell reverse (+37–46 dB di atas dasar) di 0–1 dtk; padanan `ES_Designed, Riser, Transition, Fast, Short, Clean 01`.
- **Pakai bila:** satu kata sapaan atau nama. · **Jangan pakai bila:** kalimat.
- **Remix (anti-jiplak):**
  1. Nama studio → huruf nama dengan anotasi font size.
  2. Latar gelap → garis bantu putih tipis.
  3. 9:16 → kata dua suku.
- *Pengamatan di video asli, bukan target:* kursor 9 % tinggi.

## Audio (bila dibedah)
Hampir tidak ada SFX terpisah. earshot (161 onset, 8,4/dtk): 77 drum, 4 klik, 2 whoosh (10,40; 14,40), 2 hit, 1 UI; 94 % dari 17 cut punya onset dalam 100 ms (median 21 ms). Kick terakhir 18,90 dtk (+21 dB). Musik tech house (0–8,05) lalu techno dengan perkusi orkestra (8,05–19,3), berganti di cut 8,13; ±117–120 bpm. −14,1 LUFS, TP −0,6 dBTP, LRA 1,7; babak gelap terkeras (−13,4 dB).

## Yang harus terasa sama saat disandingkan
- Kursor terlihat di ≥ 4 adegan dan tiap kali menjadi penunjuk?
- Satu subjek besar di tengah tiap adegan, bukan banyak objek kecil?
- Tiga lapis terbaca: latar, panel berbayang, kursor paling depan?
- Skala berubah besar antara still berurutan (push/pull), kecuali penutup?
- Cut jatuh di ketukan musik?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
