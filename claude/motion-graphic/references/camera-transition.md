# Camera & transition

Baca saat memilih gerak kamera (C) dan transisi (X) per potongan. Nomor § sama dengan motion-director v3 agar rujukan lama tetap berlaku.

## 9. Kamera

**Hemat dan tegas.**
- Gerak kamera global ±10 % durasi (Holy Freak 9 %).
- Adegan informasional (UI, workflow, checklist) diam atau drift ≤ 1,03×.
- Establishing shot boleh bergerak.
- Diam untuk dibaca 0,8–3 dtk; setelah reveal UI ≥ 4 dtk. Lalu bergerak besar: push ≥ 10 %, pan ≥ ½ frame, atau zoom ≥ 2×.
- Gerak kecil terus-menerus terasa lemah. Gerak dalam shot pelan (3–8 dtk ease-in-out), transisi antar shot cepat (2–9 f).
- Kamera tidak mengulang gerak yang sama di dua beat berurutan.

| Kode | Gerak | Angka | Kapan |
|---|---|---|---|
| C01 | Zoom mikro di kata kunci | 1.04–1.16× dalam 13–25 f, mulai tepat di kata kunci | hampir setiap shot |
| C02 | Push-in | 100→115 % dalam 1–2 dtk, ease in-out | membangun tensi |
| C03 | Push-through layar | 2.9–3× dalam 16–26 f, ease-in kuat + motion blur, menembus ke dunia berikut | masuk UI |
| C04 | Seam di puncak kecepatan | keluar ease-in 12–16 f → ganti adegan di frame puncak → mendarat expo-out 18–22 f tanpa overshoot | sambung adegan 2D |
| C05 | Zoom-through ke objek | ±2× (atau 100→1500 %) dalam 9–18 f ease-in expo; warna latar baru = warna objek | masuk ke "dalam" huruf/ikon/kartu |
| C06 | Reveal-out | 3–4× dalam ±60 f (akselerasi 9 f, deselerasi 50 f), lalu diam ≥ 4 dtk | detail → konteks |
| C07 | Whip pan | ±1,2× lebar frame dalam 3–10 f, motion blur, rotasi settle 5–8° | energi |
| C08 | Truck lateral daftar | linear, 1 item per kata VO | daftar ≥ 4 item |
| C09 | Snap punch-in "kamu" | 1.8× dalam 4 f, kembali 4 f | menyapa penonton |
| C10 | Drop-settle | masuk vertikal meluruh 40 f + roll ≤ 6° meluruh | adegan baru jatuh ke tempat |
| C11 | Glyph anchor | kamera mundur 10× dalam 88 f, satu huruf/ikon counter-scale | logo lahir dari huruf |
| C12 | Dolly rangkuman | dolly 3D linear ±8 dtk melewati artefak | rangkuman |
| C13 | Reverse / over-the-shoulder | ke belakang bahu tokoh saat aksi ada di objek yang ia hadapi | family A |
| C14 | Impact shake | ≤ 12 px, ≤ 6–8 f, meluruh, bukan wiggle abadi | slam / benda jatuh |
| C15 | Snap reflow zoom-out | mundur seketika ×0,45 lalu ×0,6, masing-masing 2 f | komposisi bertambah |
| C16 | Rotate-settle setelah cut | −15°→0 dalam ±6 f | objek masuk |
| C17 | Rack focus pop-forward | kartu 1.0→1.25 sementara latar blur 12–20 px, 8–10 f | fokus pindah |
| C18 | Follow | parent kamera ke null objek, lag 3–5 f | bola/kursor |
| C19 | Drift | 1.00→1.03–1.06 selama hold > 3 dtk | hold sinematik |
| C21 | Blur-in landing UI | layer UI masuk blur penuh → tajam 12 f di ujung zoom-through | mendarat di UI |
| C20 | Cut zoom | potong ke subjek sama 2–5× lebih dekat di garis pandang sama, momentum 4–8 f; 1 per 6–10 dtk, di downbeat | editorial |

Aturan arah:
- Di dunia 2D konten bergeser ke kiri (maju).
- Gerak **vertikal** khusus untuk pindah dunia/family.

Motion blur wajib pada gerak cepat (AE: shutter 180, phase −90; engine: subframe 180°). Jejak blur pendek dan bersih:
- smear p90 ≈ 1–1,6 px pada lebar 640
- blur ≤ 2–3 frame
- tanpa salinan gema/ghost

Rig AE: null `CAM` di tengah. Semua konten di-parent ke `CAM`, kecuali BG dan UI overlay. Zoom ke titik P: Anchor CAM = P, Position = tengah, animasikan Scale. Untuk kedalaman nyata pakai layer 3D + Camera 2-node (latar Z +800, objek 0, teks −200).

---

## 10. Transisi (nol crossfade, selalu termotivasi, selalu bersuara)

| Kode | Transisi | Angka | Kapan |
|---|---|---|---|
| X01 | **Object carry / match shape** | benda A berubah bentuk/posisi menjadi benda B (lingkaran → layar, centang → tombol play) | kelas tertinggi, prioritaskan |
| X02 | Mask dari bentuk | bentuk di A menjadi jendela yang membuka B (AURA) | ganti dunia elegan |
| X03 | Banjir warna berlapis | elemen diklik menumpahkan warna; lapisan pendamping memimpin, utama menyusul 3–4 f | ganti bab |
| X04 | Zoom-through / selam | C05/C03 ke elemen yang menjadi latar adegan berikutnya | masuk UI/ke dalam |
| X05 | Zoom-through berlapis ke shape | 3–5 lapis bentuk brand, ≥ 3× per lapis, 3–9 f per lapis, total 20–25 f; satu riser + thud di landing | reveal brand |
| X06 | Whip | C07, cut di tengah blur | energi |
| X07 | Seam / cut on motion | C04; vertikal untuk pindah dunia (ease-in 7–12 f → cut → expo-out 13–14 f) | sambung |
| X08 | Shape wipe | shape brand menutup 100 % frame dari tepi, 5–9 f ease-out | ganti topik cepat |
| X09 | Wipe berlapis | 2 lapis bentuk (A lalu B, jeda 3 f), 9–10 f, bentuk lanjut jadi layout | masuk kanvas putih |
| X10 | Foreground wipe | objek buram dekat lensa melintas 9 f, cut disembunyikan; atau objek menutup lensa ≤ 4 f | family A |
| X11 | Mosaik blok piksel | blok ±60 px warna brand, bangun 3 f → pecah 2–3 f | pemisah bab dunia pixel |
| X12 | Flash exposure / negatif | naik 1 f turun 3–4 f; kilat putih/negatif penuh maksimal 1–2× per video, berkedip di frame keluar (tidak membalik wajah shot baru) | aksen |
| X13 | Frame-in-frame | frame menyusut jadi kartu di ruang gelap 8 f | momen meta |
| X14 | Bloom match | objek menyala memenuhi frame 8 f, objek sama di posisi layar sama | logo |
| X15 | Mask shrink ke logo | adegan menyusut ke bentuk brand 8 f | penutup |
| X16 | Card flip | Rotation Y 3D 8–12 f | ganti kartu UI |
| X17 | Hard cut on beat | hanya di batas babak, di downbeat + SFX hantaman | aksen |

Aturan:
- ≥ 4 tipe per 30 dtk, tidak ada tipe sama berturut-turut.
- Arah konsisten dengan cerita (maju = kanan/ke dalam).
- Pemicu di akhir frase VO (2–6 f setelah suku kata terakhir). Adegan baru mendarat di kata pertama frase berikut (−3…+3 f).
- Pre-roll adegan tidak boleh memotong wipe yang belum selesai.
- Blur-di-tempat sebagai transisi maksimal 1× per video.
