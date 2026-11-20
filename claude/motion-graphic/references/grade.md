# Color grading footage dengan ffmpeg

Dibuka saat footage (talking head, b-roll) perlu look tertentu. Arah look (hangat-dingin, film pudar, kontras) adalah selera dan ditulis di `projects/<proyek>/RESEP.md` atau `DECISIONS.md`; file ini cara mengerjakan dan mengeceknya.

## Urutan

1. **Ukur footage asli dulu**: 3 momen yang mewakili (wajah dekat, wajah normal, momen berbeda cahaya), PNG 16-bit (`format=rgb48le`). `scripts/gate/grade_ukur.py` mencetak hue/saturasi kulit, arah warna bayangan, dan persentil luma. Footage yang sudah netral tidak perlu "dinetralkan"; jangan memperbaiki cast yang tidak ada.
2. **Rantai grading tetap 10/16-bit.** Kerjakan di `format=rgb48le` (curves, colorbalance, selectivecolor) atau `yuv420p10le` (hue); `eq` dan `noise`/`vignette` hanya 8-bit dan diam-diam menurunkan kedalaman warna, jadi `eq` diganti curves + `hue=s=`, dan vignette + grain (bila dipakai, lihat takaran di bawah) ditaruh paling akhir. Cek: `ffmpeg -v verbose … -vf "format=X,<filter>,format=X"` tidak menyisipkan `auto_scale` tambahan.
3. **Buat 2–4 varian dan ukur semuanya** di momen yang sama, lalu lihat berdampingan (asli | varian) di satu lembar. Angka menunjuk apa yang harus dilihat; putusan tetap dari mata.
4. **Nilai look di pemutar tujuan** (preview Google Drive, unggahan IG/TikTok), bukan hanya di PNG atau file lokal: platform mengompres ulang, dan grain/noise halus berubah jadi blok. Look yang hanya bagus di file lokal ditolak.
5. **Render hanya rentang yang dipakai** (klip timeline + handle ±1 dtk, timecode sumber ditulis ke tiap klip), bukan seluruh rekaman.
6. **Preview 10 dtk** dari bagian yang paling sulit (ruang paling gelap, kulit paling dekat) sebelum render penuh; render penuh HEVC 10-bit ±0,2× realtime di PC server, jadi ia langkah terakhir.
7. Keluaran: skrip satu file (`grade_film.sh`-gaya: input, output, mulai, durasi, pilihan look), tag warna bt709/range tv ditulis eksplisit, audio di-copy.

## Takaran yang aman untuk talking head di ruangan redup

- Kulit: hue 13–18°, saturasi naik ≤ +0,04 dari asli.
- Bayangan: hitam diangkat ke arah teal per kanal (`curves=r='0/0.03':g='0/0.04':b='0/0.055'`), bukan dengan menarik merah bayangan jauh di bawah nol.
- Highlight: titik putih 0,92–0,96; tidak ada piksel > 0,95 di dinding/tirai.
- Grain: tidak dipakai untuk footage ruangan redup yang ditonton di platform terkompresi; hitam yang diangkat sudah menampakkan noise sensor, dan grain tambahan pecah jadi blok kompresi. Warna asli kamera adalah pilihan yang sah bila tidak ada look yang lolos di pemutar tujuan.
- Kecerahan median turun ≤ 30 % dari asli (vignette ikut dihitung); lebih gelap dari itu, wajah sisi gelap dan pakaian hitam tenggelam di layar HP.
