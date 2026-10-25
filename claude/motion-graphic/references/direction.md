# Direction — prinsip sutradara, family visual, elemen, warna

Baca saat menentukan apa yang terjadi di setiap beat: tokoh, subjek, metafora, family visual, palet. Nomor § sama dengan motion-director v3 agar rujukan lama tetap berlaku.

## 5. Tiga family visual (pilih per babak, jangan dicampur dalam satu shot)

| Family | Dunia | Aset | Kamera | Untuk |
|---|---|---|---|---|
| **A. Kolase + karakter** | Ruang pixel/voxel hangat (Jadisatu: ruang kerja malam Irfan) | Plate latar tanpa objek utama + model 3D low-poly objek utama + sprite pixel karakter (beberapa pose, tampak belakang terpisah) | Kamera 3D sungguhan, parallax/DoF nyata | Masalah, tokoh, cerita personal |
| **B. Tipografi gelap** | Navy/hitam, gradasi lembut | Teks 2.5D berlapis kedalaman, kursor ketik | 2D CAM / kamera AE, zoom mikro, slam | Klaim, pertanyaan, titik balik |
| **C. Kanvas putih UI** | Putih/off-white | UI datar asli: avatar, kursor, kartu, konektor, tiap elemen bergerak independen | 2D CAM, reflow, reveal-out | Solusi, workflow, produk, CTA |

Aturan family A:
- Storyboard tidak pernah jadi background yang ditumpuk teks.
- Objek utama adalah elemen terpisah dengan volume dan perspektif konsisten.
- **Sprite tidak pernah diputar seperti kartu.** Sudut berubah berarti pakai aset sudut itu.
- **Subjek = yang dilihat/dikerjakan tokoh.** Laptop di depan tokoh berarti over-the-shoulder dari belakang, bukan zoom ke monitor latar.
- Render 3D di ½ resolusi lalu diperbesar *pixelated*. Teks dan UI tetap tajam 1080p.

Perpindahan family adalah momen cerita, memakai transisi bab (§10) + engsel senyap (§14.4).

---

## 6. Prinsip sutradara

1. **Tokoh dan dunia yang sudah diperkenalkan konsisten sampai akhir.**
   - Masalah dan solusi dialami tokoh yang sama di dunia yang sama.
   - Bagian solusi tidak berubah menjadi slide UI + teks.
   - Tokoh utama hadir di setiap babak; di adegan UI boleh sebagai reaksi kecil.
2. **Tunjukkan, jangan labeli.** Emosi diperlihatkan lewat aksi dan ekspresi tokoh, bukan awan kata.
3. **Satu frame, satu titik fokus.**
   - Maksimal 1 blok teks + 1 subjek.
   - **Dilarang layout "teks besar di kiri + kartu/UI di kanan"** yang memaksa mata membaca dua hal. Tampilkan di beat berbeda, atau biarkan kamera masuk ke UI.
   - Frame boleh berisi banyak objek, tapi hanya SATU yang difokuskan atau dianimasikan pada satu saat.
4. **Objek pembicaraan menentukan komposisi.** Tetapkan per beat:
   - objek yang dibicarakan
   - elemen pertama yang dilihat mata
   - gerak yang mengantar ke elemen berikutnya

   Teks memimpin hanya bila teks membawa pesan. Teks pindah posisi karena OBJEK yang dijelaskan berubah, bukan demi variasi (Holy Freak).
5. **Teks pendek, kata kerja, bertitik.** Kalimat panjang hanya untuk tagline penutup.
6. **Metafora literal dan spasial.**
   - Jarak = jarak ruang (kamera menjauh).
   - Lupa = benda masuk tong.
   - Jangan mewakili makna dengan efek huruf, misalnya tracking melebar untuk "jauh".
7. **Pengulangan komposisi untuk rutinitas**: frame sama, hanya aksi tokoh dan satu kata yang berubah.
8. **Gelap = masalah/tekanan, terang = netral/solusi.** Pergantian latar menandai pergantian emosi.
9. **Setiap efek punya alasan.** Jawab dulu "efek ini membantu penonton memahami apa?". Tidak ada jawaban berarti hapus.
10. **Kamera mengikuti subjek.** Blur hanya akibat gerak atau DoF, bukan efek tersendiri.
11. **Gerak mengikuti logika dunia nyata.**
    - Memilih = bergeser seperti layar pilih karakter.
    - Membuang = jatuh ke dalam tong, ter-mask bibir wadah.
    - **Elemen yang diperbesar keluar dari frame dengan wajar**: barisnya dibiarkan memanjang keluar tepi layar, tidak terpotong oleh kontainer/kolom (contoh: post Threads yang di-zoom).
12. **UI harus UI asli produk** (atau rekonstruksi per elemen dari screenshot asli). Proses yang dianimasikan adalah proses yang benar-benar terjadi.
13. **Highlight (warna aksen pada huruf, bukan kotak di belakang kata) hanya di kata yang membawa makna**, maksimal 1 per frame, tidak otomatis di kata pertama.
14. **Variasi datang dari cerita, bukan template.** Layout sama maksimal 2 beat berturut-turut, kecuali disengaja untuk rutinitas.

---

## 12. Ikon, karakter, kursor, kartu, UI
- Satu gaya ikon per video.
  - Ukuran: inline 90–110 % cap-height, mandiri 10–18 % H, hero 30–40 % H.
  - Masuk: 0→110→100 + rotasi −12→0 (10 f), grup stagger 3–5 f, bukan berbaris kaku.
- Kartu:
  - sudut 24–32 px, bayangan lembut besar (blur 40–60, opasitas 8–12 %), boleh miring ±3–6°
  - tiga lapis kedalaman: latar, tengah, depan
  - aktif = skala 115–130 % + cincin; lainnya 85–100 %
- Tokoh/maskot > 1 dtk punya idle halus (kedip, napas). Ikon biasa boleh diam.
- Kursor = aktor: kurva, melambat sebelum klik, klik 100→85→100 (4 f) + ripple.
- UI yang dibahas mengisi ≥ 60 % frame (zoom ke elemennya). Mengetik dengan bunyi ketik.
- Latar tidak polos statis: gradasi lambat, grid tipis, grain 3–5 %, atau putih yang disengaja. Tidak ada partikel generik.

---

## 13. Warna
- Jadisatu:
  - biru `#2563EB` (data/AI, aksen di terang)
  - coral `#F97066` (kata kunci di gelap)
  - navy `#0F172A` (latar gelap)
  - off-white `#FBFAF7`, putih hangat `#FAF8EC`
- **Dilarang:** gradasi merah-cokelat atau latar maroon untuk adegan gelap. Gelap selalu navy/hitam + biru.
- Satu aksen per momen. Warna adalah bab: pergantian lewat wipe berlapis, bukan cut warna polos.
- Proyek lain membawa sistemnya (dasar netral + 1 kata aksen + warna data), bukan warnanya.

---

## 18. Jangan ditiru
- Tick digital 3,5–6 kHz, ding/sparkle, strobo invert warna-warni, smear pelangi, frame putih penuh berulang.
- Palet dan identitas referensi: merah/teal dan condensed-caps merah Holy Freak, maskot, pink-cyan Sol, merah AURA.
- Frame padat (sprite + 5 stiker + teks sekaligus), grid 4 fokus, label 2 % H, caption statis kuning.
- Template, preset, dan perintah khusus milik kreator lain. Yang diambil hanya workflow-nya.
- Klaim "dibuat dengan Claude Opus …" yang meniru layar referensi.
