# RESEP · Skill Development (G1, Sutradara claude2, 16 Nov malam)

Kartu: 83-barsolmedia-kt-talking-head (mode A, teks di sekitar kepala) · 07-baikov-shapes (mode B/C, bidang & bentuk besar) · 37-pixel-character-skill-file (tokoh pixel)

## 0. Kenapa ronde komponen pertama gagal (Irfan 16 Nov: "jelek, aneh, tidak sesuai prinsip")
Komponen dibangun sebelum RESEP ini dan dinilai di atas latar abu polos, bukan footage, tanpa sanding dengan keyframe kiblat. Hasilnya bahasa UI generik: chip/pil kecil bertitik + panah di bidang kosong, teks bergaris tepi murah, maskot seperti stiker. Semua itu **dilarang** di video ini:
- Tidak ada elemen < 8 % tinggi frame yang membawa makna utama; tidak ada "chip" pil kecil berderet sebagai visual utama.
- Tidak ada bidang kosong > 40 % frame tanpa bentuk/subjek (07 selalu penuh: bidang warna + bentuk raksasa + UI besar).
- Teks bergaris tepi tebal (stroke) dilarang; keterbacaan di atas footage dicapai lewat posisi di area gelap, bayangan lembut, slab di belakang kepala, atau tag semi-transparan (83 K2).
- Still dinilai **hanya** di atas footage asli (`edit/wajah.mp4`) atau di kanvas finalnya, berdampingan dengan keyframe kiblat (`guide/referensi/sheets/keyframes/83-k*.jpg`, lembar 07, lembar 37).

## 1. Bahasa visual per mode
**Mode A · wajah penuh (kiblat 83).** Teks hidup di sekitar kepala, selalu dari ucapan:
- K1 cincin kata: kata kecil-tebal (Poppins 700, huruf kecil, ±4,5 % tinggi frame, putih hangat + bayangan lembut) di busur elips mengelilingi kepala; belakang busur lewat di belakang kepala (matte). Untuk kalimat narasi berjalan.
- K2 tangga tag: kata bertumpuk diagonal di sisi wajah yang kosong (sisi kiri = pintu biru/dinding), tiap kata di tag membulat semi-transparan gelap (rgba(20,22,26,.55), blur latar 12 px); kata klimaks = tag lebih besar bergradien + bevel (pil 3D), miring 4–8°.
- K3 slab raksasa di belakang kepala: Anton 38–55 % tinggi frame, berdiri di belakang kepala (kepala menutupi sebagian huruf), huruf bergelombang sinus lalu tenang; warna mengikuti arti (coral = negatif, putih hangat = netral, hijau = terverifikasi). Footage boleh di-grade sedikit lebih gelap −12…−18 % hanya selama slab (bukan meredupkan ruang jadi hitam).
- K4 kata tunggal di dada: satu kata per tampil, putih ±4 %, saat wajah harus dominan.
- Kamera: punch-in/out di kata kunci (C01 1,04–1,16), blur gerak di potongan; keyframe + ease (curves.ts).

**Mode B/C · visual & motion graphic (kiblat 07).** Bidang warna penuh + bentuk geometris raksasa (rounded-hexagon/blob/lingkaran 60–120 % tinggi frame) yang masuk-keluar sebagai transisi + UI besar (kartu/jendela ≥ 50 % lebar frame) yang di-zoom kamera. Bidang: biru `#2E5BFF` (beat solusi) atau putih hangat `#F6F5F0` (netral); bentuk sekunder biru muda `#C9D6FF`, kuning `#FFD54A`, coral `#F97066`. Teks di bidang biru = putih, besar (Poppins 800 ≥ 9 % tinggi). Transisi khas yang berulang (satu keluarga): **bentuk raksasa menyapu frame** (rounded-hexagon putih/biru membesar dari objek ke luar frame dalam 12–16 f, `whip`), dipakai di setiap pindah A↔B/C.

**Karakter = gambar ulang karakter/ikon ASLI tiap AI (Irfan 16 Nov 20:55), bukan desain baru:**
- **Claude** = crab pixel Claude Code (`sumber/ref/maskot-acuan-pixel-crab.png`), warna merah-coral bawaannya (ambil warna dari file acuan). Claude 1 dan Claude 2 = karakter sama + label.
- **ChatGPT/Codex** = ikon aplikasi asli (`sumber/ref/chatgpt-codex-ikon-asli.png`): bunga/awan bergelombang biru dengan gradien putih seperti kilatan cahaya di kiri atas, simbol `>_` putih di tengah. Bukan kotak hitam (ditolak Irfan: `sumber/ref/k13-r1-ditandai-irfan.png`, tanda X). Session A dan B = karakter sama + label.
- **Gemini** = bintang empat sudut Gemini dengan gradien biru→ungu aslinya.
- Boleh ditambah mata kecil/gerak tubuh supaya hidup, tapi siluet dan warna harus langsung dikenali sebagai ikon aslinya. Versi 3D (B1b, di ruangan) dan 2D (B5, kanvas) satu keluarga.
- Animasi wajib hidup, bukan geser datar: squash & stretch saat lompat/kirim pesan, kilatan cahaya menyapu badan ChatGPT, crab Claude berjalan dengan kaki bergantian, bintang Gemini berputar pelan + berkilau; amplop terbang dengan jejak busur dan tiba dengan pop; kamera ikut (07: kedalaman lapis, bentuk besar di belakang).

**Tokoh (kiblat 37 + permintaan Irfan).** Maskot 3D di ruang (B1b) dan sprite pixel 2D di mode C (B5) adalah keluarga yang sama. Tokoh selalu besar: 20–35 % tinggi frame, tidak pernah ikon kecil berderet.

## 2. Per babak (usulan kerja, dikunci setelah storyboard Henti 1)
| Babak | Mode | Visual |
|---|---|---|
| B1 hook | A → B | f0 wajah + K4 "finally"; punch di "finally"; bentuk hexagon putih menyapu → K-01 repo GitHub penuh, wajah jadi lingkaran kanan bawah (< 3 dtk); kamera push ke centang hijau di "selesai"; slab "SELESAI" putih di atas repo. |
| B1b model | A | maskot 3D ChatGPT, Claude, Gemini muncul di kata namanya, di kedalaman berbeda sekitar kepala (Claude bahu kiri dekat kamera, ChatGPT sisi kanan kepala, Gemini kanan bawah); K1 cincin kata untuk narasi "workflow … decision". |
| B2 pain | A (+ objek) | K3 slab "AI SLOP" coral di belakang kepala, guncangan kecil; timeline patah sebagai **kartu besar 3D miring** di sisi kiri (≥ 45 % lebar), klip warna patah; "putus-putus" suku kata di klip. |
| B3 solusi | A → C → A → C | K2 tangga tag "Apple style" / "cinematic storytelling" / "template" (klimaks) di sisi kiri wajah; "template" dicoret lalu tag dilempar; sapuan hexagon → bidang biru: tabel keputusan §8a sebagai jendela putih besar (≥ 60 % lebar) di-zoom ke baris menyala; rel 5 fase = **5 ubin besar** (bukan pil) dirakit, kata "workflow" putih raksasa. |
| B4 stakes | A | K3 slab "BALIK MODAL" putih hangat bergelombang di belakang kepala, zoom pelan ke wajah; kartu paket ChatGPT Pro 20x + Claude Max 5x mendarat di sisi kiri sebagai K5 kartu 3D miring (bevel, bayangan), tanpa stroke. |
| B5 aha | C | di "kayak yang kalian lihat ini" sapuan hexagon → bidang biru: jendela transkrip Claude Code dan chat ChatGPT sebagai **dua jendela putih besar** (masing-masing ±45 % lebar) yang di-zoom bergantian; tokoh pixel 2D besar (±28 % tinggi) di depan jendela menyerahkan amplop; loop besar menutup + centang hijau di atas kartu putih. |
| B6 penutup | A | K3 slab "100% FULL AI" putih + kilat (rima dengan B1); kapsul "profesional?" / "masih kerasa AI?" sebagai K2 pil 3D bevel di kiri-kanan wajah; K4 "comment di bawah" di dada. |

## 3. Matte (prasyarat K1/K3)
Tidak ada koneksi PC→Mac (tanpa host Mac di `~/.ssh/config`), jadi Apple Vision tidak bisa dipakai. Matte di PC: Robust Video Matting (torch, sudah terpasang di mg-venv) atas `edit/wajah.mp4`; gerbang: jumlah frame matte = frame wajah, 6 frame uji tepi rambut/bahu bersih. Bila gagal 2× → lapor Irfan (tidak diam-diam membuang efek belakang kepala).

## 4. Gerbang still (G2) mulai sekarang
Lembar sanding: still kita **di atas footage/kanvas final** di kiri, keyframe kiblat yang setara di kanan, maks 960 px. Lulus bila: skala & kepadatan setara kiblat, tidak ada pelanggaran §0, arti warna benar, teks dari ucapan.

## 5. Tambahan Irfan 16 Nov ±21:15 (menang atas §2 bila bertabrakan)
- **Percakapan antar-agen = UI chat** (acuan `sumber/ref/chat-ui-putih-fun.png`, `chat-ui-langit.png`, `chat-ui-gelap-elegan.webp`). Dipilih: **gaya putih fun** (bubble besar membulat, avatar karakter asli, reaksi/pilihan seperti iMessage) untuk B5, karena serumpun dengan kanvas terang 07 dan lebih hidup; gaya gelap elegan (bubble berbingkai gradien, glow ungu di bawah) disimpan untuk kartu "Effort" B4. Avatar: Claude = crab coral, ChatGPT/Codex = bunga biru `>_`. Pesan = percakapan ASLI dari kerja video ini (`handoff/PAHAM-SKILL-DEV.md` §D), mis. Codex: "Boleh saya jalankan doctor --fix?" → Claude: "Sudah kujalankan, langsung kerjakan TASK." Bubble masuk dengan pop + indikator mengetik, bukan muncul diam. Bubble ≥ 7 % tinggi huruf terbaca (teks ±44 px), satu adegan maks 4 bubble di layar.
- **Isi yang diceritakan = alur kerja skill-development yang sebenarnya** (`handoff/PAHAM-SKILL-DEV.md` §A–C): tiap pesan/objek dipecah dulu maknanya → cara visual (aturan repo di §B dokumen itu) sebelum TASK visual ditulis.
- **Kartu "Effort" (mode kecerdasan model)** dari `sumber/ref/ref-woinlesss-spin.mp4` (lembar: `ref-woinlesss-spin-sheet.jpg`): kartu UI gelap, slider Faster↔Smarter, ikon otak sebagai pegangan, jejak titik pixel ungu-merah muda bercahaya. Dipakai di B4 pada "ChatGPT Pro Max yang 20 kali": slider meluncur Low→High→Max (label tiap tingkat mengganti dengan blur, `whip`), jejak pixel menyala; lalu kartu paket 20x/5x. Label tingkat hanya kata UI (Low/Medium/High/Max), bukan klaim baru.

## 6. Koreksi Irfan atas storyboard Henti 1 (16 Nov ±21:30) — menang atas §1–§5
- **Mode C bukan Baikov/07.** Irfan minta *storytelling*, bukan pameran struktur. Tabel keputusan + lima ubin + bentuk bertumpuk di B3-C ditolak ("kenapa Baikov? kenapa banyak shape? kenapa tabel?"). Mode C diganti kiblat **Apple-style motion** (kandidat kartu 28 "Cursor & Desktop" / 30 "Gradient Marketing" — finisher Opus memilih satu dan menulis alasannya): bersih, modern, satu ide per frame, ruang lega, kedalaman lembut, kamera mengikuti satu subjek. Workflow diceritakan sebagai **perjalanan** (satu subjek berpindah dari langkah ke langkah, sebab → akibat), bukan tabel/diagram statis.
- **Kartu "Effort" dihapus.** `ref-woinlesss-spin.mp4` adalah contoh GAYA (UI gelap elegan, jejak cahaya pixel), bukan konten. Gayanya boleh dipinjam untuk menghaluskan objek lain; tidak ada kartu "Effort/Max" di video.
- **Finishing render tokoh** (Claude crab, bunga Codex, bintang Gemini) masih kasar: tepi, material, cahaya, integrasi dengan kamar/kanvas harus setara produk Apple (halus, bersih), bukan hanya "bentuk benar".
- Alur kerja baru: sketsa Sonnet/Codex → **finishing Opus** → G2 Sutradara → Irfan (`orkestrasi.md`).

## 7. Koreksi Irfan kedua (16 Nov ±21:45) — menang atas §1–§6
Irfan: storyboard-final (r3) = "cerminan AI slop"; sanding r1 (`handoff/henti1/sanding.jpg`) "secara visual better meskipun masih kurang". Aturan utama tetap skill-development; referensi hanya gaya.
- **Kunci versi yang sudah benar** (jangan diturunkan lagi): B5 r1 "jendela + tokoh + loop" (dua jendela Claude Code & ChatGPT asli, crab + bunga, amplop, loop + centang) = BENAR; B1b r1 cincin kata (workflow · model · decision) = sesuai.
- **B5:** pakai komposisi r1, tanpa judul "koordinasi" (visual sudah bercerita), tanpa garis/panah biru penghubung; pesan muncul pop-up berurutan (pesan 1 → Claude 2 merespons → Codex merespons lagi).
- **B3-A "template":** jangan tag dicoret. Visualkan secara harfiah dengan UI Claude Code asli: kolom prompt, user mengetik "/" → menu slash-command muncul berisi template ("storytelling", "Apple style", "cinematic"…); karena skill ini bukan template, "/" tidak memunculkan apa-apa / daftar kosong ("nothing"). Makna: tidak ada template yang dipanggil.
- **B1b:** kata cincin ("workflow") terlalu kecil dan maskot terlalu kecil. Perbesar maksimal seperti skala slab BALIK MODAL, tetap miring/melengkung mengikuti busur di sekitar kepala; maskot jauh lebih besar.
- **B6:** "profesional?" / "masih kerasa AI?" = bubble chat seperti B5 (pop-up), bukan tag.
- **Pelajaran Sutradara:** setiap revisi disanding juga dengan versi sebelumnya yang sudah disetujui; revisi yang menurunkan kualitas ditolak (gagal: storyboard r3 16 Nov).

## 8. Karakter 2D gaya repo (Irfan 16 Nov ±22:00)
Irfan memilih: semua karakter (Claude, Codex/ChatGPT, Gemini) = 2D gaya ClaudeAnimationBase (kuas, 5 sudut kunci + smear, sistem emosi/kedip/take), juga di kamar (B1b) — menggantikan maskot 3D K-12. Teknik: `claude/motion-graphic/pustaka/teknik/animasi-karakter-clawd.md`. B4 tetap "Claude Max" (Wajib GUIDELINE); latar B5 r1 tetap.
