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
