---
status: benchmark
scope: tuntunly
how_to_use: "Resep yang terbukti di Tuntunly. Bukan rumus wajib video lain."
---

# Smooth motion — resep motion blur, teks, dan kamera yang terbukti

Baca saat membangun animasi teks, mengatur motion blur, atau saat Irfan bilang gerak "kurang smooth", "patah-patah", atau "kamera berantakan".

Resep ini diambil dari proyek Tuntunly (repo `Tuntunly-Video/tuntunly-motion`), bukan dari teori. Di sana teks dan kamera akhirnya dinilai halus. Proyek Jadisatu tidak membawanya, dan hasilnya terlihat: motion blur 4–6 subframe meninggalkan "gema" (RETRO Jadisatu 24 Okt).

| Bagian | Sumber | Tanggal |
|---|---|---|
| Peran gerak teks R1–R4 | `ae/v16/gerak.jsx`, commit `17d4fee` | 14 Okt |
| Kamera dihitung per frame + gaussian | `ae/v17/kamera3d.jsx`, feedback r16 | 15 Okt |
| Motion blur 200°, 16–24 sampel | commit `e14fc5c` "v17 MASTER" | 15 Okt |
| Alat ukur kamera | `work/v17/bedah-kamera.py` → disalin ke `scripts/bedah-kamera.py` | 15 Okt |

## Isi

1. Motion blur
2. Teks masuk: naik dari balik garis dasar
3. Kata kunci dan keluar
4. Kamera halus
5. Mengukur, bukan menebak
6. Padanan di Remotion

## 1. Motion blur

| Setelan | Sebelum | Resep |
|---|---|---|
| Shutter angle | 180° | **200°** |
| Shutter phase | −90° | **−100°** (−angle/2) |
| Sampel per frame | 6 | **16** |
| Batas sampel adaptif | 12 | **24** |

- `layer.motionBlur = true` di **setiap** layer teks dan objek yang bergerak, bukan hanya di comp. Di AE, blur comp tidak berlaku pada layer yang saklarnya mati.
- Kamera 2D lewat efek **Transform** di adjustment layer: matikan "Use Composition's Shutter Angle" (`ADBE Geometry2-0009` = 0) lalu set shutter efek ke 180 (`ADBE Geometry2-0010`). Motion blur layer tidak membaca gerak yang datang dari efek, jadi tanpa ini gerak kamera tidak ber-blur.
- Sampel rendah (6) tidak membuat blur halus; ia membuat salinan berjajar (ghosting). Pakai sampel rendah hanya untuk draft, lalu render final dengan 16–24.

## 2. Teks masuk: naik dari balik garis dasar (R1, narasi)

```
mask garis dasar  : persegi dari −size·1,25 sampai +size·0,32 di layer teks, feather [0, 2]
animator per kata : Position 3D [0, size·1,05 + 24, 0] → 0
selector          : Based On = Words, Shape = Ramp Up, Ease High = 100, Ease Low = 0
offset            : −100 → 100 selama 10 f + (kata−1)·3 f, influence 18 / 92
```
Yang membuatnya halus:
- Kata mulai **penuh di bawah mask**, jadi tidak ada huruf yang "mengintip" atau muncul dengan fade.
- **Ease High 100 / Ease Low 0** di selector membuat setiap kata melambat sendiri saat mendarat. Easing tidak hanya ada di keyframe offset.
- Influence 18 / 92: cepat di awal, mendarat sangat pelan.
- Keluar: animator kedua menggeser kata ke atas melewati mask dalam 6 f (influence 80 / 10).

## 3. Kata kunci dan keluar

- **R2 kata kunci** masuk **terakhir**: skala 115 → 98 → 100 (6 f + 4 f, influence 25 / 80), opacity 0 → 100 dalam 2 f, lalu color flash: warna aksen saat mendarat, turun ke warna dasar 2,5 f kemudian.
- **R3 klaim**: skala 160 → 97 → 100 dalam 4 f + 4 f, guncang kamera 8 px yang meluruh `exp(−10·d)` selama 0,3 dtk.
- **Keluar (smear T15)**: dalam 0,17 dtk, skala X ×1,6 dan Y ×0,96, geser −140 px, opacity → 0, ditambah Directional Blur 0 → 90. Blur berasal dari gerak, bukan blur di tempat.

## 4. Kamera halus

Masalah yang diukur (r16): puncak kecepatan p95 234 px/f, sedangkan acuan 140, dan ada 27 henti-mulai mendadak. Penyebabnya: keyframe kamera dengan easing per kunci membuat kamera berhenti dan mulai di setiap kunci.

Resepnya:
1. Hitung pose kamera **per frame**: titik fokus (cx, cy), **log(skala)**, roll, yaw/pitch. Zoom di ruang log membuat dive terasa konstan.
2. Haluskan dengan **filter gaussian σ = 0,12 dtk**, per segmen. Filter tidak boleh melewati potongan HOLD atau cut.
3. Tulis kembali sebagai kunci per frame dengan interpolasi **LINEAR**, karena kehalusannya sudah ada di data.
4. DOF: jarak fokus = jarak kamera ke point of interest, sehingga fokus selalu di subjek. Jangan pakai di panggung UI datar.

Hasil r16: p95 234 → 161 px/f, percepatan rata-rata 35,7 → 16,9, jerk p95 96 → 65, durasi gerak rata-rata 0,48 → 0,86 dtk.

## 5. Mengukur, bukan menebak

`scripts/bedah-kamera.py video.mp4 out.csv` memakai ORB + RANSAC per frame (dianalisis di 640×360, kecepatan dilaporkan dalam px/frame setara 1080p) dan menghasilkan zoom, geser, putar, cut, serta ringkasan kecepatan, percepatan, jerk, dan jumlah henti-mulai. Jalankan pada referensi dan pada render kita, lalu bandingkan p95 kecepatan, percepatan, jerk, dan jumlah henti-mulai. Butuh `opencv-python` dan `numpy`.

Target awal dari Tuntunly: p95 kecepatan ≤ 160 px/f (setara 1080p; acuan Gemini 140), tanpa henti-mulai di tengah satu gerak.

## 6. Padanan di Remotion

| Resep AE | Remotion |
|---|---|
| Shutter 200°, 16 sampel | `@remotion/motion-blur` `<CameraMotionBlur shutterAngle={200} samples={16}>`, atau subframe sendiri ≥ 16. Draft boleh 4–6, final tidak |
| Mask garis dasar + per kata | Wrapper `overflow: hidden` setinggi baris, tiap kata `translateY` dari 105 % + 24 px ke 0 |
| Ease High/Low per kata | Setiap kata punya `interpolate` + `Easing.bezier(0.16, 1, 0.3, 1)` sendiri, jeda 3 f |
| Kamera gaussian | Hitung pose per frame dari keyframe, simpan sebagai array, haluskan dengan gaussian σ = 0,12 dtk (3,6 f) per segmen, lalu baca `array[frame]` |
| Smear keluar | `scaleX(1.6)` + `filter: blur()` searah gerak 4–6 f, atau smear kecepatan dari subframe |

Cek di versi Remotion yang dipakai: `@remotion/motion-blur` 4.0.380 salah menghitung frame di dalam `<Sequence from>` (RETRO Jadisatu §9). Uji dulu dalam Sequence sebelum dipakai.
