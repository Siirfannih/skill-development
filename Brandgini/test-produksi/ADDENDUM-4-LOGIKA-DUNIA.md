# Addendum 4 (26 Nov 2026, 00:05) — feedback Irfan atas ep01 v2: lihat dulu, logika dunia nyata

Berlaku untuk semua episode, di atas addendum sebelumnya bila bertentangan.

## 1. Wajib cek visual sebelum render
Model dilarang membangun "buta". Sebelum render penuh:
- Render still di setiap awal, tengah, dan akhir beat **dan** klip draft gerak (skala 0,5) di setiap perpindahan kamera, lalu **lihat** (contact sheet 4–8 fps di rentang transisi).
- Cek tiga kegagalan yang Irfan temukan di ep01 v2: (a) **kamera bolak-balik** (bergeser lalu tertarik kembali; gerak kamera per beat harus satu arah yang mulus, tanpa overshoot/balik kecuali disengaja); (b) **benda melayang** (setiap benda menapak di permukaan logis: gerobak di pasir, bukan di garis air; orang di tanah; bayangan kontak tepat di bawahnya); (c) **skala tidak masuk akal** antar benda (orang vs gerobak vs bangunan mengikuti proporsi nyata).
- Tulis hasil cek di LOG (frame/detik yang dicek, apa yang diperbaiki).

## 2. Pilih POV dari logika ceritanya
Untuk tiap adegan, putuskan dan tulis alasannya: dari mana kamera paling masuk akal melihat agar penonton langsung paham.
- **Atas (top-down/peta)**: untuk gambaran besar dan posisi/jarak (contoh: sebaran minimarket di kota — sudah tepat di ep01 v2).
- **Samping/mata manusia (eye-level, sedikit di atas)**: untuk adegan dunia nyata dengan orang dan benda di tanah (contoh: pantai, penjual, pembeli berjalan). Di sini orang dan gerobak tampil dengan proporsi nyata.
- **Dekat/potongan (close-up, cutaway)**: untuk menjelaskan isi atau cara kerja benda (contoh: telinga bagian dalam, isi tong es).
Satu video boleh berganti POV, asal pergantiannya dijembatani gerak kamera yang jelas.

## 3. Logika gerak dunia nyata
- **Statis**: background, bangunan, jalan, pantai, laut (boleh ombak halus), pohon, perabot.
- **Bergerak**: kamera; benda yang memang bergerak di dunia nyata (orang berjalan, kendaraan melaju, cairan bergoyang, es mencair, asap); maskot saat berinteraksi.
- Jangan menggoyang/mengambangkan semua elemen demi "hidup". Hidup datang dari kamera + benda yang sewajarnya bergerak.

## 4. Bentuk benda mirip aslinya (termasuk anatomi)
Benda dan organ digambar mendekati bentuk aslinya agar langsung dikenali: daun telinga, saluran telinga, gendang telinga, rumah siput/saluran setengah lingkaran berisi cairan, otak, mata; mobil, setir, jalan berkelok; tong kayu, es batu, garam. Penyederhanaan boleh (gaya ilustrasi), bentuk abstrak pengganti tidak.

## 5. Suara (ep03 dan episode baru)
Kuota proyek utama habis sampai ±16:00 WITA. Irfan menyetujui memakai **proyek Key 3** dengan suara rancangan baru (deskripsi sama): `sg-perempuan` = `voice_vy2go8tp73u0`, `sg-laki` = `voice_8wwhff4lw2g2` (`~/work/soalnya-gini-studio/vo-uji/proyek3/voice_ids_proyek3.json`). Key: variabel `GEMINI_API_KEY_3` di `~/.config/soalnya-gini/gemini.env` (jangan dicetak/disalin; jalankan TTS dengan `GEMINI_API_KEY=$GEMINI_API_KEY_3`). Batas 10 permintaan/hari di proyek itu juga — kesalahan take dipotong, bukan di-generate ulang (addendum 2 butir 9).
