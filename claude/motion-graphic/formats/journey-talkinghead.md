# Format Bible: journey-talkinghead

Cerita pribadi yang dibawakan pembicara di depan kamera, 16:9, diselingi dunia visual buatan. Dibaca bersama `../MOTION-CORE.md`; Lantai di sana tetap berlaku.

Acuan keputusan: `projects/kegagalan-eps01/DECISIONS.md` (K-01..K-21). Ledger itu dibuka hanya bila sebuah butir di sini perlu ditelusuri.

## 1. Empat dunia visual

Video berganti antara empat dunia. Tiap beat memilih **satu** dunia.

| Dunia | Isi | Dipakai saat | Teks |
|---|---|---|---|
| A. Talking head | Kamera penuh, pembicara tampil utuh | pengakuan, emosi, punchline, kalimat yang butuh wajah | KT 1–3 kata kontras tinggi di sisi atau atas kepala, tidak menutup wajah |
| B. UI bersih / desktop | Kanvas terang atau desktop komputer dengan jendela aplikasi (boleh layar terbelah), stamp status | proses kerja, software, daftar tugas, hasil lulus/gagal | label UI asli + satu stamp; objek motion pas dengan targetnya (centang tepat di kotaknya) |
| C. Biru tua taktil | Latar biru tua dengan benda bertekstur kertas: bingkai foto instan, kartu perbandingan | kenangan, perbandingan dulu vs sekarang, dua pilihan | judul kartu + 1–3 kata kunci |
| D. Meja kayu 3D / arsip fisik | Ruang kerja atau meja kayu hasil render 3D, binder arsip, diagram titik atau piramida | pembuka, arsip dan tumpukan pengalaman, struktur atau tingkatan | label benda; angka hanya yang diucapkan |

Aturan dunia:

- **Bergantian tiap ±4 dtk** (rentang 2,5–6 dtk per potong). Satu dunia tidak bertahan lebih dari 8 dtk tanpa potong atau perubahan framing, dan dunia yang sama tidak dipakai tiga beat berturut-turut.
- **Dunia A paling sering**; ia rumah cerita, dunia lain menyela lalu kembali.
- **3D (dunia D) dan desktop (dunia B) hanya di momen spesifik**: pembuka, adegan software, adegan arsip atau struktur. Bukan latar bawaan, bukan pengisi.
- Tiap dunia konsisten sepanjang video: warna, tekstur, dan propertinya sama di tiap kemunculan.

## 2. Pembuka

- Frame 0 berisi visual dan musik; tidak ada layar kosong atau judul kecil.
- Pembuka bawaan: ruang kerja 3D (dunia D) dengan wajah pembicara di dalam monitor. Satu zoom pelan yang **berhenti di framing monitor ±73 % lebar frame** (bezel dan meja masih terlihat); kamera tidak menyelam ke dalam layar.
- Hook memuat punchline cerita dalam 3 dtk pertama (kalimat inti + satu visual yang membuktikannya).

## 3. Potong antar-dunia

- **Hard cut-out.** Tiap adegan selesai di dunianya, lalu potong keras ke dunia berikut. Tidak ada morf antar-dunia, tidak ada crossfade, tidak ada jendela wajah kecil yang ditempel di kanvas dunia lain.
- Potong jatuh di batas frasa VO; kata tidak terbelah oleh potong.
- Di dalam satu dunia, perubahan dibawa kamera (push pelan, geser) atau objek yang berubah keadaan, bukan transisi hias.

## 4. Warna

- **Warna asli kamera, tanpa grading berat.** Tidak ada grain tambahan, hitam yang diangkat, atau LUT sinematik. Yang boleh: koreksi eksposur dan white balance ringan yang sama untuk semua klip.
- Dunia buatan (B, C, D) memakai palet profil merek; tidak menyamai footage dengan memberi efek pada footage.

## 5. Teks

- Satu lapisan teks: KT. Tidak ada pita subtitle.
- Di dunia A: 1–3 kata per tampil, kontras ≥ 4,5 : 1 terhadap latar di belakangnya, di sisi atau atas kepala dengan jarak 4–8 % lebar frame dari bahu atau kepala. Wajah, mata, dan mulut tidak pernah tertutup.
- Di dunia B–D: teks menempel pada objek yang dirujuk; tidak ada teks melayang di tengah kanvas kosong.
- Teks hanya dari ucapan.

## 6. Suara, SFX, dan musik

- **Dialog diambil langsung dari sumber** (PCM), tanpa denoise yang membuat suara mendem. Level suara asli tidak diturunkan.
- Potongan: kata sambung dan kata penutup kalimat utuh; pengulangan tak sengaja dibuang sekali; jeda sebelum kalimat reflektif dipertahankan.
- **SFX hanya di perubahan keadaan visual** (objek muncul, berubah, dicap, berpindah). Tidak ada bunyi untuk teks yang sekadar tampil, tidak ada riser atau sub-drop hias. Palet bunyi dipilih user per video; nama file menyebut pemakaiannya. Kerapatan acuan: ±1 cue tiap 0,9 dtk di bagian padat, jauh lebih jarang di bagian bicara.
- **Ujung SFX dipotong di jeda sunyi** setelah serangannya, atau fade 150–300 ms yang selesai di batas objek. Bunyi tidak hilang saat masih keras. Laporan potong ditulis ke `audio/sfx_potong.json`.
- **Musik ada sejak frame 0**, per babak, level setara dari detik ke detik; ekor outro setelah kata terakhir.
- Level SFX ditetapkan per tingkat relatif terhadap suara, bukan angka mutlak per file.

## 7. Skema Input Beat Sheet

Diisi penulis naskah, satu baris per beat, sebelum editing. Kolom kosong = beat sheet dikembalikan.

| Beat | Waktu | Kalimat VO | Jenis adegan | Aset/Subjek | Teks Kunci | Catatan SFX |
|---|---|---|---|---|---|---|
| 01 | 0,0–4,2 | kalimat yang diucapkan, apa adanya dari transkrip take terpilih | dunia A, B, C, atau D | A: timecode klip sumber; B–D: objek yang tampil (jendela aplikasi, bingkai foto, binder, diagram) | 1–3 kata dari ucapan + posisinya terhadap subjek | perubahan keadaan visual yang berbunyi; "—" bila tidak ada |

Aturan pengisian:

- **Waktu** dari timeline potongan suara yang sudah dikunci. Beat > 6 dtk dipecah.
- **Jenis adegan**: hitung sebelum diserahkan, yaitu rata-rata satu potong tiap ±4 dtk, dunia A paling banyak, tidak ada dunia yang sama tiga kali berturut-turut, dan dunia D atau desktop hanya di baris yang alasannya tertulis di kolom Aset/Subjek.
- **Aset/Subjek**: yang butuh render 3D atau aset baru ditandai, supaya dikerjakan sebelum editing mulai.
- **Teks Kunci**: kata yang diucapkan di kalimat itu.
- **Catatan SFX**: kosongkan ("—") untuk beat yang hanya bicara.

## 8. Gerbang format ini

| Kapan | Perintah atau cek | Lulus bila |
|---|---|---|
| Setelah potong suara | `python3 scripts/gate/audio_order.py lock suara …` + `scripts/gate/cut_check.py` | PASS; kata yang dijaga utuh |
| Sebelum kunci visual | frame tahan tiap detik dilihat: wajah tidak tertutup, tidak ada morf atau jendela wajah di dunia lain, warna footage tidak di-grade | `VERDICT.md` tiap potongan LULUS |
| Hitung potong | deteksi potong pada draft (`ffmpeg -vf "select='gt(scene,0.3)',showinfo"`) | durasi ÷ jumlah potong = 3–5 dtk |
| Setelah SFX | `python3 scripts/audio/sfx_potong.py --laporan audio/sfx_potong.json` | keluar 0 |
| Setelah mix | `python3 scripts/audio/audio_phone.py --root <folder stem> --gate` | keluar 0 |
| Final | `bash scripts/juri/render.sh <proyek> final <Comp> <keluaran.mp4>` dengan `projects/<proyek>/FORMAT` berisi `journey-talkinghead` | keluar 0 |

Render hanya untuk rentang yang dipakai timeline (klip + handle), bukan seluruh rekaman.
