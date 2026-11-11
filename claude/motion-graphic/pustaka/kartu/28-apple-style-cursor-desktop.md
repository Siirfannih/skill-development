# 28 · Apple style "Cursor & Desktop"

> **Status: standar kualitas Irfan.** Video ini target yang harus dicapai, bukan contoh opsional.
> Sumber: `Applestyele.mp4` (folder asal: Motion; kreator di kartu akhir: @jaafar.aid, freelance motion designer) · 16:9 (1280×720), 19,4 dtk, 30 fps (577 frame), tanpa VO · analisis asal: canvas-skill-library, reference_id LOC-cc090eec9187 · Frame: `../../guide/referensi/sheets/28-apple-style-cursor-desktop.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/28-k*.jpg` · Bedah lengkap: `canvas-skill-library: skills/canvas-reference-director/references/cards.json (reference_id LOC-cc090eec9187)`; data ukur: `ukuran.md`
> Audit GrokAgent "Apple_Styele" (44,7 dtk, iklan Holo) bukan video ini; angkanya ada di kartu 30.
> Kedalaman bedah: **dalam** (sumber 720p; ukuran teks kecil ±0,15 % per piksel; gerak kamera dari ORB global, bukan keyframe asli)

**DNA (satu kalimat):** Showreel UI 19 dtk yang dijahit satu kursor biru 3D: "Hi" di kanvas desain, timeline, tag neon, dock di atas lanskap, jendela aplikasi, sampai kolom prompt yang diketik dan diklik; kamera terus push/pull, tiap cut jatuh di ketukan techno ±120 bpm.
**Cocok untuk:** intro/portofolio desainer, demo produk SaaS/AI (kolom prompt), video "satu alat menyatukan semua aplikasi" · **Tidak cocok untuk:** konten berbasis ucapan/VO panjang, cerita emosional, label kecil yang wajib terbaca di ponsel
**Kata kunci gaya:** bersih, kursor biru, kanvas desain, kaca, push-pull terus, techno
**Diambil untuk:** `Applestyele.mp4`: "Apple style" → tampilan visual dan gerak UI. Dibedah paling dalam: warna (1), motion graphic + skala + kedalaman (5), kamera & transisi (6).

## PENGIKAT (diambil utuh dari SATU kiblat; ini yang membuat video terasa satu keluarga)

### 1. Warna & tekstur
- Dua dunia bergantian: **kanvas terang** `#F1F2EA`–`#F2F3EB` (putih hangat kehijauan, bukan putih murni) dengan grid titik abu sangat tipis; **ruang gelap** `#0E0A13` (hitam keunguan) dengan grid titik redup.
- Satu aksen utama: **biru kursor** `#2869FA`–`#2D6FFF` (dengan tepi putih dan bayangan). Biru yang sama di batang timeline (`#2260E9`), cincin zoom-out, tombol kirim yang diklik, dan kartu akhir.
- Aksen kedua hanya di babak gelap: oranye `#F87015` (batang timeline, garis tepi tile bercahaya), abu `#CDCACF`.
- Tag di ruang gelap: garis tepi neon biru bercahaya (glow `#223C6E` di sekitar pill); tile ilustrasi berwarna jenuh dengan tepi oranye bercahaya.
- Lanskap: foto/render bukit hijau berkabut, grade lembut pucat (langit `#C5C7CF`, rumput `#53613B`, air `#607F76`); dock = kaca buram kehijauan di atasnya.
- Kartu akhir: gradien radial navy `#000417` (atas) → biru `#225CE3` (cahaya di tengah bawah), sudut `#081E51`.
- Tanpa grain/noise; tekstur hanya grid titik, kaca buram, dan glow.

### 2. Teks
- Font: sans neo-grotesk (paling mirip **Inter / SF Pro**). "Hi" Bold sangat rapat; tag Semibold (satu tag "Design" italic, dua tag Arab "أفكار", "هوية"); prompt Regular; kartu akhir Semibold + Regular.
- Teks sedikit sekali: 1 kata ("Hi"), label 1 kata per tag, satu kalimat prompt, tiga baris kartu akhir.
- "Hi": cap 21,2 % tinggi frame, pusat x 50 %, y 50 %; anotasi ukuran "235px/207px" ±1 % menempel di sisi huruf (rasio ±20×), garis bantu putus-putus memotong frame. Kursor duduk kanan-atas huruf.
- Prompt: diketik **per huruf** dengan caret ("D|" → "Describe what you want to create..."), lalu mention "@jaafar.ai" diberi blok sorot biru muda. Tinggi baris ±8,9 % (cap ±6 %); "Add tabs or files" abu ±3 %. Kursor tepat di bawah kotak.
- Tag neon: label menyala saat kursor lewat; yang lain redup/buram.
- Kartu akhir: handle 7,8 % (baris), jabatan huruf besar 3,2 %, deskripsi 2,1 %; rasio handle : deskripsi ±3,7; terpusat x 50 %, blok y 43–72 %.
- Penekanan: warna (biru/glow), bukan ukuran berganda. Tidak ada caption.

### 3. Ritme
- `pace_read.py`: 7 cut besar = 21,7/menit, shot median 1,4 dtk, event visual 50/menit (gerak tanpa cut mendominasi).
- Hitungan cv2 (beda frame): ±13 cut keras termasuk montase kilat 5 cut dalam 0,6 dtk (10,1–10,8 dtk: jendela aplikasi berganti); shot utama 0,3–3,1 dtk.
- Babak: pembuka "Hi" 0–1 dtk (lambat, swell) → ruang gelap 1–5,8 → zoom-through ke lanskap 5,8–8,1 → desktop/aplikasi 8,1–12 (paling cepat) → zoom-out ke kanvas, prompt 12–16,3 → kartu akhir 16,3–19,4 (diam).
- Tanpa jeda kosong: kamera selalu bergerak kecuali kartu akhir.

## TEKNIK (boleh dipinjam referensi lain; selalu dikenakan pengikat kiblat)

### 4. B-roll / footage
- Tidak ada footage kamera. Satu lanskap bukit (render/foto, 6–11 dtk) berperan sebagai "wallpaper desktop", tanpa bingkai, grade pucat.
- Rekaman layar aplikasi nyata (chat bergaya Discord, Notion "Product roadmap", galeri gelap) dipakai sebagai jendela bertumpuk, bukan layar penuh lama.

### 5. Motion graphic
- Kursor biru 3D (tepi putih, bayangan, bisa miring/berotasi) adalah tokoh utama; ia menunjuk, meng-hover tag (tag menyala), membuka kartu, mengklik tombol kirim.
- Urutan grafik: kanvas desain + garis bantu → timeline batang berwarna (gaya editor animasi) → baris tag neon → kartu profil "stories told in motion" dikelilingi 4 tile → kartu berisi lanskap → dock ikon (Discord, Spotify, Notion, Drive, PlayStation) → jendela bertumpuk → monitor → cincin bulat → kolom prompt.
- Tile: persegi 15 % lebar (±27 % tinggi) di keempat sudut, mengelilingi satu kartu ±56 × 22 % di tengah.
- **Skala subjek:** satu subjek besar per adegan, selalu di tengah: "Hi" 21 % tinggi; kartu profil ±56 % lebar; dock ±52 % lebar di **tengah vertikal** (y 42–58 %, bukan di bawah layar), ikon 8,9 × 15,8 %; monitor 75 × 87 %; kotak prompt 37 % tinggi melebar keluar kanan frame; kursor 9–11 % tinggi (24 % saat close-up tombol kirim).
- **Kedalaman:** 3 lapis tetap: latar (grid titik / lanskap / gradien), panel UI dengan bayangan lembut atau glow, kursor paling depan dengan bayangan sendiri. Kaca buram (dock) dan blur pada tag yang belum aktif; tile memakai glow oranye; tanpa paralaks lanskap yang berarti.

### 6. Kamera & transisi
- Kamera virtual (ORB, skala kumulatif per shot): diam di "Hi" (1,02×); pan kiri di timeline (−26 % lebar); **push 1,84× + pan** di tag neon; **pull 0,66×** ke kartu; **push 1,6×** menembus kartu ke lanskap; pull bertahap 0,89× → 0,83× → 0,81× dari dock ke monitor; **pull cepat 0,32× dalam 0,47 dtk** (cincin); pull 0,54× ke kanvas; geser kecil ke tombol kirim; kartu akhir diam.
- Transisi: cut keras gelap↔terang di 0,3 dan 1,03 dtk; **zoom-through** (masuk ke dalam kartu → lanskap); montase kilat jendela; **morph zoom-out** (layar → monitor → cincin bulat biru → titik kecil di kanvas terang); cut ke close-up tombol kirim; cut keras ke kartu akhir tepat setelah klik.
- Pemicu: aksi kursor (hover, klik) dan ketukan musik (lihat 7).

### 7. SFX
- Hampir tidak ada SFX terpisah; ketukan musik berperan sebagai SFX. earshot (161 onset, 8,4/dtk): 77 drum, 4 key/klik, 2 whoosh (10,40 dan 14,40 dtk, di transisi), 2 hit, 1 UI.
- Sinkron: 94 % dari 17 cut punya onset dalam 100 ms (median selisih 21 ms). Pembuka 0–1 dtk: swell/napas reverse (+37–46 dB di atas dasar). Kick terakhir 18,90 dtk (+21 dB) menutup.

### 8. Musik
- Tech house futuristik (0–8,05) → techno lebih agresif dengan perkusi orkestra (8,05–19,3); berganti tepat di cut ke babak desktop (8,13).
- Tempo ±117–120 bpm (librosa 117,5; earshot 120, kejelasan 0,63); nada dasar sekitar D.
- −14,1 LUFS, true peak −0,6 dBTP, LRA 1,7 LU; RMS: pembuka −19,5 dB, babak gelap −13,4 (terkeras), akhir −16,7. Tanpa suara bicara.

## Proporsi terukur (11 Nov 2026, dari video sumber 1280×720; % terhadap frame)
| Jenis adegan | Kata kunci (% tinggi) | Kata sambung | Posisi teks | Skala subjek | Kedalaman |
|---|---|---|---|---|---|
| Kanvas "Hi" (k1) | cap 21,2 | anotasi px ±1 (±20×) | pusat 50/50, garis bantu memotong | 1 kata + kursor 9 % | grid titik + teks + kursor berbayang |
| Timeline (k2) | tanpa teks | – | – | batang selebar 30–55 % | hitam rata + batang + kursor |
| Tag neon (k3) | pill 10, label ±4–5 (perkiraan) | – | satu baris horizontal y ±48 % | kursor 11×17 % saat dekat | aktif glow, sisanya buram |
| Kartu + tile (k4) | label kartu ±2–3 | – | di dalam kartu | kartu 56×22 % di tengah, 4 tile 15 % di sudut | glow oranye, grid redup |
| Dock lanskap (k5) | tanpa teks | – | – | dock ±52 % lebar, y 42–58 % | lanskap + kaca buram + ikon |
| Monitor (k6) | tanpa teks terbaca | – | – | monitor 75×87 % | gradien biru + monitor + jendela |
| Prompt (k7) | baris 8,9 (cap ±6) | abu ±3 (±2×) | kotak y 31–69 %, keluar kanan | kursor 11 % di bawah kotak | kanvas + kotak berbayang + kursor |
| Kartu akhir (k8) | handle 7,8 | 2,1 (±3,7×) | terpusat, y 43–72 % | tanpa subjek | gradien radial navy→biru |

## Cek kemiripan (dipakai juri saat menyandingkan still)
- Satu kursor biru (±`#2A6BFC`, tepi putih, bayangan) terlihat di still dari ≥ 4 adegan berbeda, tinggi 9–11 % frame.
- Latar terang = putih hangat `#F1F2EA` dengan grid titik tipis, bukan putih murni; latar gelap = `#0E0A13` keunguan, bukan hitam netral.
- Satu subjek besar di tengah tiap adegan (kartu ±56 % lebar, monitor ±75 %, dock ±52 %); bukan banyak objek kecil sejajar.
- Dock/elemen UI duduk di tengah vertikal (y 40–60 %), tidak menempel tepi bawah.
- Tiga lapis terlihat: latar bertekstur ringan, panel berbayang/glow, kursor paling depan.
- Teks sangat sedikit: satu kata besar (cap ±20 % tinggi) atau satu kalimat UI (cap ±6 %); tidak ada caption.
- Aksen kedua (oranye `#F87015`) hanya muncul di adegan gelap.
- Kartu akhir: teks terpusat di atas gradien radial navy → biru cerah dari bawah.
- Antar still yang berurutan, skala berubah besar (push/pull 0,3–1,8×): tidak ada adegan yang kameranya diam kecuali penutup.

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
