# Peta nada → gerak (dari transkrip + audio)

Dibaca di gerbang storyboard (4), sebelum `motion-mechanics.md`. Nada kalimat menentukan **kapan dan seberapa kuat** gerak; `motion-mechanics.md` menentukan **mekanik mana** dari hubungan dua adegan. Hasilnya ditulis ke tabel beat (kolom: nada · bukti · gerak · cut · tipografi) supaya Irfan bisa mengoreksi nada sebelum render (Irfan 6 Nov).

## 1. Alat (pasang sendiri di mesin kerja)
```sh
pip install faster-whisper librosa praat-parselmouth pyloudnorm   # + ffmpeg
pip install demucs   # opsional: pisahkan VO dari musik bila audionya sudah dicampur
```
- `faster-whisper` (`word_timestamps=True`): kata + waktu, lalu dikelompokkan per kalimat.
- `librosa` / `pyloudnorm`: loudness per kalimat, jeda sebelum kalimat (diam < −42 dB, sama dengan `vo_gaps.py`).
- `parselmouth`: rentang nada (pitch) per kalimat.
- Tempo bicara = suku kata (atau kata) per detik per kalimat.
Semua angka audio dibaca **relatif terhadap video itu sendiri** (z-score terhadap median video), bukan nilai mutlak, karena tiap pembicara berbeda.

## 2. Menentukan nada
Teks menentukan **kategori**, audio menentukan **intensitas** (lemah / sedang / kuat).

| Nada | Ciri di transkrip | Ciri di audio (relatif) |
|---|---|---|
| Serius / klaim | kalimat pendek, kata absolut, vonis | jeda sebelum panjang, loudness naik |
| Data / angka | angka, satuan, nama studi | tempo turun, artikulasi jelas |
| Penjelasan | "karena", "jadi", "caranya", kalimat panjang | tempo stabil |
| Analogi | "seperti", "bayangkan", "it's like" | nada naik ringan |
| Cerita / refleksi | kala lampau, "dulu", "aku ingat" | tempo lambat, jeda panjang |
| Emosional | kata perasaan, pengakuan | loudness turun, nada rendah |
| Ringan / hiburan | pertanyaan retoris, hiperbola, contoh sehari-hari | nada naik, cepat, tawa |
| Ganti topik | "oke", "sekarang", "yang kedua" | jeda paling panjang |
| Puncak | pengulangan, superlatif, hasil akhir | energi tertinggi |
| Penutup / CTA | ajakan, kalimat perintah | melambat |

## 3. Nada → gerak (vocabulary)

| Nada | Kamera | Cut | Tipografi |
|---|---|---|---|
| Serius / klaim | punch-in di onset kata kunci, **tahan sampai kalimat selesai, lepas di kalimat berikutnya** | tidak di tengah kalimat | satu kata penekanan, latar bersih |
| Data / angka | diam atau drift; kamera ke objek data | sedikit | label tenang, angka besar di barisnya sendiri |
| Penjelasan | drift | cut in/out antar framing di batas kalimat | visual atau caption |
| Analogi | pindah ke dunia analogi (layar penuh) | hard cut masuk, hard cut keluar | teks diegetik di objek analogi |
| Cerita / refleksi | kamera melewati tipografi, dolly pelan | jarang, B-roll | editorial: kecil, serif boleh |
| Emosional | push sangat pelan, close-up | paling jarang | minim teks |
| Ringan / hiburan | snap zoom, whip, guncangan kecil | cepat | diegetik, ikon |
| Ganti topik | whip atau push-through | hard cut ke framing baru | label bab |
| Puncak | gerak tercepat video, flash montage | tercepat | kata XL |
| Penutup / CTA | pull-back, wide | melambat | CTA paling terbaca |

## 4. Kekuatan per jenis video
Angka shot diukur dari referensi yang Irfan setujui (6 Nov); angka zoom adalah titik awal.

| Jenis video | Rata-rata shot | Punch-in serius | Cut in/out penjelasan |
|---|---|---|---|
| Talking head energik | ±1,1–1,2 dtk | 115–130 %, snap 4–6 f | tiap kalimat |
| Explainer layar terbagi | ±5 dtk | 108–115 %, ease 10–15 f | tiap 2–3 kalimat |
| Dokumenter VO + footage arsip | ±0,7–1 dtk (foto berganti, bukan kamera) | 103–108 %, push pelan sepanjang kalimat | ganti foto, bukan zoom |
| Motion / iklan produk | ±3 dtk + transisi di dalam shot | kamera virtual ke objek, bukan zoom footage | ganti di tempat |

## 5. Aturan supaya tidak jadi formula
1. **Kontras, bukan mutlak.** Gerak dipilih relatif terhadap segmen sebelumnya. Penekanan hanya terasa bila sekitarnya tenang; bila tiga kalimat serius berturut-turut, hanya yang terkuat (intensitas audio) yang di-punch-in.
2. **Mekanik sama maksimal 2× berturut-turut.**
3. **Kurva energi video:** hook tinggi → penjelasan turun → naik ke puncak → turun ke CTA. Nada per kalimat diletakkan di atas kurva ini; puncak gerak video hanya satu.
4. **Nada adalah tebakan model**, jadi selalu ditulis di tabel beat beserta buktinya (kata + angka audio) untuk dikoreksi Irfan.

## 6. Contoh kasus: DOAC (Dr Sahar Yousef), talking head 9:16
Teks direkonstruksi dari caption yang terbaca di frame preview (bukan transkrip penuh); kolom audio diisi setelah alat dijalankan.

| Waktu | Kalimat (rekonstruksi) | Nada | Gerak | Catatan |
|---|---|---|---|---|
| 0:00 | "The algorithm knows you really well" | Serius / klaim (hook) | punch-in 120 % di "knows", tahan | Hook: satu-satunya visual = footage + kata ALGORITHM; ponsel dibuang |
| 0:03 | "right before you are about to leave…" | Penjelasan | cut ke framing lebar | Bar "boredom" boleh, tanpa caption bersamaan |
| 0:05 | "Like a slot machine, BANG" | Analogi | hard cut ke dunia slot machine layar penuh | Satu dunia, bukan slot di atas footage blur |
| 0:13 | "bad business, don't you think?" | Ringan | snap zoom kecil | Tanpa grafik |
| 0:17 | "the fact it's intermittent and somewhat variable" | Data / konsep | kamera ke grafik reward, diam | Kata "intermittent" = label di grafik, bukan caption kuning terpisah |
| 0:23 | "This is how slot machines work" | Serius | punch-in, tahan | Jangan ulang slot machine: sudah tampil di 0:05 |
| 0:26 | "infinite scroll… all you can eat buffet" | Analogi + ringan | hard cut ke dunia buffet | Pilih satu: buffet ATAU infinite scroll |
| 0:37 | "they get you hooked" | Serius / klaim | punch-in terkuat sejauh ini | HOOKED besar, footage bersih |
| 0:41 | "reverse neuroscience… grayscale" | Ganti topik (solusi) | whip ke framing baru | Label bab "solusi"; GRAY: teks dihapus, ponsel grayscale cukup |
| 0:53 | "In my study… Berkeley lab… healthy working professionals" | Data | drift, objek data | Label sumber kecil; tidak ada frame blur kosong |
| 1:01 | "three weeks" | Data | angka besar | 21 DAYS dan THREE WEEKS adalah kata yang sama: pilih satu |
| 1:08 | "seven hours every week" | **Puncak** | gerak tercepat video | Satu-satunya puncak |
| 1:10 | "Well, one will give you…" | Penutup | pull-back ke wide | CTA paling terbaca |
