---
name: "brief-gate"
description: "Gerbang wajib sebelum mengirim tugas ke subagen, worker, atau model lain (Codex, Gemini, Sonnet): cek brief terhadap kalimat asli Irfan, uji baca dingin, cek metrik, pilot satu agen dulu."
---

# Brief Gate: periksa brief sebelum subagen jalan

## 1. Kenapa skill ini ada

Kesalahan orkestrasi yang paling mahal buatku bukan subagen yang bodoh, tapi **brief yang salah dan dieksekusi dengan setia**. Subagen tidak punya konteks percakapan kita. Ia hanya punya brief-mu. Kalau brief-nya salah sasaran, semua subagen salah dari langkah pertama, dan aku baru tahu di akhir saat memeriksa hasil.

Kasus nyata: aku minta sintesis video referensi untuk mengambil **cara bergerak** (animation, transition, kinetic typography) sebagai preset di skill-development. Brief pabrik malah menyuruh subagen membangun **adegan utuh** (editor lengkap, wallpaper, panel UI), lalu menilainya dengan **kemiripan per frame terhadap referensi**. Hasilnya, subagen sibuk meniru kulit adegan, dan kegagalannya pun ada di wilayah itu (placeholder, tabrakan, kulit referensi bocor). Subagen tidak salah. Brief dan metriknya yang salah.

Di konteks panjang, kamu bekerja dari ringkasanmu sendiri, bukan dari kalimatku. Ringkasan itu bergeser sedikit demi sedikit. Gerbang ini memaksa kamu kembali ke kalimat asliku sebelum mengirim tugas.

## 2. Kapan wajib

- Sebelum **setiap** pemanggilan subagen (Agent tool, worker Codex, sesi Opus lain, Gemini, dll).
- Sebelum menulis file prompt atau instruksi yang akan dibaca model lain (brief pabrik, AGENTS.md, prompt untuk Codex).
- Sebelum mengirim ulang tugas setelah aku memberi feedback. Ini titik rawan, karena feedback-ku mengubah tujuan dan brief lama ikut terbawa.

Skala sesuai biaya:
- **Ringan** (satu subagen, read-only, murah diulang, misalnya mencari file): langkah 3.1 dan 3.3 saja, cukup satu menit.
- **Berat** (fan-out ≥3 agen, render, kredit API, lebih dari 15 menit kerja, atau hasilnya jadi aturan atau preset permanen): semua langkah, termasuk pilot (3.5).

Gerbang ini **bukan** alasan untuk berhenti dan meminta izin padaku. Plan yang sudah aku setujui tetap jalan. Gerbang ini cek internal milikmu.

## 3. Langkah gerbang

### 3.1 Ambil kalimat asliku, bukan ringkasanmu
Cari pesan asliku untuk tugas ini (scroll, STATUS.md, plan yang aku setujui) dan kutip apa adanya. Lalu tulis dua baris:
- **Yang dipindahkan:** benda konkret apa yang aku mau dihasilkan (contoh: "parameter gerak: easing, durasi, urutan, stagger").
- **Bukan:** apa yang jelas bukan tujuannya, walau kelihatan dekat (contoh: "bukan membangun ulang adegan, UI, latar, atau objek referensi").

Kalau baris "Bukan" tidak bisa kamu isi, berarti kamu belum paham batas tugasnya. Cari di bahan dulu. Kalau tetap tidak jelas, tanyakan aku sebelum fan-out.

### 3.2 Telusuri rantai tujuan
Empat mata rantai ini harus menunjuk ke benda yang **sama**:

1. **Tujuan**: kenapa aku butuh ini (contoh: model di skill-development tidak perlu membuat efek dari nol).
2. **Unit kerja**: apa yang subagen bangun (primitif gerak, bukan adegan).
3. **Deliverable**: wujud output (preset berparameter, demo di kanvas netral).
4. **Metrik penerimaan**: cara hasil dinilai.

**Metrik adalah mata rantai paling berbahaya.** Subagen mengoptimalkan apa yang diukur, bukan apa yang kamu maksud. Tanyakan: "Kalau subagen memaksimalkan metrik ini, apakah hasilnya yang Irfan mau?" Di kasus sintesis, "kemiripan struktur per frame dengan referensi" berarti "tiru kulitnya". Metrik yang benar mengukur gerak: kurva easing, durasi, offset stagger, dan arah, dibandingkan dengan pengukuran dari referensi, pada kanvas yang sengaja berbeda dari referensi.

### 3.3 Uji baca dingin
Baca brief seolah kamu subagen yang tidak tahu apa pun selain teks itu. Tulis prediksi 2–3 kalimat: "Dengan brief ini aku akan membuat ___, menilainya dengan ___, dan menyerahkan ___." Bandingkan dengan 3.1. Kalau tidak cocok, perbaiki brief, jangan perbaiki prediksinya.

Untuk tugas berat, lakukan uji ini sungguhan: kirim brief ke satu subagen murah dengan instruksi "Jangan kerjakan. Jelaskan apa yang akan kamu buat, cara kamu menilai hasilnya, dan pertanyaan apa yang kamu punya." Kalau jawabannya menyimpang dari 3.1 atau muncul pertanyaan, brief-nya bolong.

### 3.4 Cek pola gagal yang sudah terbukti
- **Kata kerja ambigu** dipakai tanpa definisi (lihat §4). Subagen akan memakai arti umumnya, bukan artiku.
- **Referensi dijadikan target visual.** Kalau subagen diberi frame referensi sebagai "tujuan", ia akan menyalin kulitnya. Berikan referensi sebagai **bahan ukur**, dan minta output di kanvas atau konteks yang berbeda.
- **Tidak ada baris "Bukan".** Tanpa batas negatif, subagen mengisi kekosongan dengan pekerjaan yang kelihatan rajin.
- **Konteks yang hanya ada di kepalamu**: path file, bagian skill-development yang relevan, konvensi penamaan, keputusan yang sudah aku ambil, aturan blank canvas. Tulis eksplisit, atau beri path untuk dibaca.
- **Tidak ada syarat berhenti.** Kapan subagen harus berhenti dan lapor, bukan menebak (akses diblokir, bahan tidak ada, hasil ukur jauh dari target).
- **Format output tidak jelas**, sehingga hasil antar-subagen tidak bisa digabung atau dibandingkan.
- **Asumsimu ditulis sebagai fakta** di brief. Tandai sebagai asumsi, atau verifikasi dulu.
- **Brief lama dipakai ulang setelah feedback-ku** tanpa diperiksa ulang terhadap feedback itu.

### 3.5 Pilot sebelum fan-out
Untuk tugas berat, jalankan **satu** subagen pada **satu** item dulu. Buka hasilnya sendiri dan cek terhadap 3.1 dan rantai di 3.2, bukan hanya terhadap brief (brief-nya sendiri bisa salah). Baru fan-out setelah pilot lolos. Satu pilot yang salah jauh lebih murah daripada sepuluh subagen yang salah.

### 3.6 Simpan bukti gerbang
Sebelum dispatch, tulis catatan singkat di STATUS.md proyek (atau di chat kalau tidak ada proyek):

```
GATE <tugas>: kalimat Irfan: "..." | dipindahkan: ... | bukan: ... | metrik: ... | baca dingin: cocok/diperbaiki (apa) | pilot: lolos/belum perlu
```

Catatan ini supaya aku bisa mengaudit kenapa brief-nya begitu kalau hasilnya meleset, dan supaya sesi berikutnya tidak mengulang kesalahan yang sama.

## 4. Kamus kata kerjaku (arti versiku, bukan arti umum)

Tulis definisi ini ke brief setiap kali katanya dipakai:

- **Sintesis / reverse engineering video**: ekstrak *cara bergerak* (animation, transition, kinetic typography: timing, easing, urutan, stagger, arah, kamera) menjadi primitif yang bisa dipakai ulang. **Bukan** membangun ulang frame, adegan, UI, latar, atau objek referensi.
- **Preset**: blok gerak berparameter (teks, warna, durasi, dan intensitas bisa diganti) yang tinggal diambil model di skill-development. Satu preset satu gerak. Bukan satu adegan.
- **Tiru / ikuti referensi**: analisis *kenapa* referensi itu bekerja, lalu terapkan prinsipnya dengan estetika proyek sendiri. Bukan menyalin gayanya.
- **Pelajari**: hasilkan temuan terukur (angka, frame, timestamp) yang bisa dicek, bukan deskripsi kata sifat.
- **Blank canvas**: bawa pengalaman kerja (urutan, standar, tools), jangan bawa template atau aturan brand proyek lain.

Kalau kamu menemukan kata kerjaku lain yang ternyata disalahpahami subagen, tambahkan ke daftar ini.

## 5. Isi wajib brief subagen

Bukan template kaku, tapi brief belum boleh dikirim kalau salah satu poin ini kosong:

1. **Tujuan akhir**: satu kalimat kenapa ini dikerjakan dan siapa yang memakai hasilnya.
2. **Unit kerja**: apa yang dibangun.
3. **Bukan**: batas negatif.
4. **Input**: path atau bahan yang harus dibaca, termasuk bagian skill-development yang relevan saja.
5. **Output**: format, lokasi file, dan nama.
6. **Cara dinilai**: metrik atau QC yang kamu pakai saat menerima hasil.
7. **Berhenti dan lapor kalau**: syarat berhenti.

## 6. Saat menerima hasil subagen

- Nilai terhadap kalimat asliku (3.1) dan rantai tujuan (3.2), bukan hanya "sesuai brief atau tidak".
- Klaim subagen ("lolos QC", "mirip 92%") diverifikasi dengan alat ukurmu sendiri. Jangan diteruskan mentah ke aku.
- Kalau hasil meleset, tentukan dulu: **brief yang salah atau eksekusinya?** Kalau brief, perbaiki brief dan catat polanya di 3.4 atau §4. Jangan cuma mengulang dengan brief yang sama.
- Saran desain dari subagen tetap lewat mini proposal (masalah, perubahan, preview, prinsip, perjalanan penonton) sebelum diterapkan.

## 7. Tanda kamu sedang melewati gerbang

| Pikiranmu | Kenyataannya |
|---|---|
| "Konteksnya sudah jelas, aku baru membahasnya." | Jelas di kepalamu, bukan di brief. Subagen hanya membaca brief. |
| "Brief-nya sama dengan yang tadi, tinggal kirim ulang." | Setelah feedback-ku, tujuannya berubah. Cek ulang terhadap feedback itu. |
| "Metriknya cuma alat bantu." | Metrik adalah tujuan nyata bagi subagen. |
| "Pilot buang waktu, langsung paralel saja." | Sepuluh subagen yang salah memakan waktu dan token jauh lebih banyak. |
| "Nanti dicek di akhir." | Di akhir itulah aku selalu menemukan kesalahannya. Cek sekarang. |

## 8. Contoh: brief sintesis, sebelum dan sesudah

**Sebelum (gagal):** "Pelajari video referensi ini dan buat 5 komponen (UIActionScript, AnchoredCaption, ScaleLadder, WordBeat, WorldStage) yang mereproduksi tampilannya. Bandingkan per frame dengan referensi memakai metrik kemiripan struktur, target ≥0,85."
→ Baca dingin: "Aku akan membangun ulang adegan referensi selengkap mungkin supaya skor kemiripan tinggi." Tidak cocok dengan kalimatku. Metriknya mengukur kulit.

**Sesudah (lolos gerbang):** "Tujuan: model di skill-development bisa mengambil gerak siap pakai tanpa membuat efek dari nol. Unit kerja: satu primitif gerak per preset (contoh: word-beat pop, scale ladder, anchored caption follow). Bukan: membangun UI, latar, wallpaper, panel, atau objek dari referensi. Input: frame 8–10 fps pada rentang timestamp X–Y. Ukur durasi, kurva easing, offset stagger, dan arah. Output: preset berparameter + demo di kanvas netral (latar polos, teks dummy milik kita) + file ukur referensi vs preset. Dinilai: selisih timing ≤2 frame, kurva easing setara, tidak ada elemen visual referensi di demo. Berhenti dan lapor kalau gerak di referensi tidak bisa diukur dari frame yang ada."
→ Baca dingin: "Aku akan mengukur gerak lalu membuat blok gerak yang bisa dipakai di mana saja." Cocok.

## 9. Cek cepat sebelum dispatch

- [ ] Kalimat asli Irfan sudah aku kutip, bukan ringkasanku.
- [ ] Baris "Bukan" terisi.
- [ ] Tujuan → unit kerja → deliverable → metrik menunjuk ke benda yang sama.
- [ ] Kalau subagen memaksimalkan metriknya, hasilnya yang Irfan mau.
- [ ] Baca dingin cocok (tugas berat: diuji ke subagen sungguhan).
- [ ] Kata kerja ambigu sudah didefinisikan (§4).
- [ ] Tugas berat: pilot satu item sudah lolos.
- [ ] Catatan GATE sudah tertulis.