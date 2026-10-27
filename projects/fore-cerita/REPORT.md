# Laporan pagi — Fore "Kalah Lagi" (unofficial fan project)

**Hasil:** `fore_kalah-lagi_v5.mp4` (1920×1080, 24 fps, 74,6 dtk, −14 LUFS) + `fore_kalah-lagi_v5_SFX-only.mp4` (tanpa lagu, untuk diposting dengan lisensi musik IG pada titik mulai lagu **0:26**).
Lokasi di Mac: `~/Proyek/fore-cerita/render/` (salinan ±28 MB, 2,75 Mbps). Master kualitas penuh (CRF 18, ±83 MB) ada di chat sebagai file `fore_kalah-lagi_v5.mp4` dan `fore_kalah-lagi_v5_SFX-only.mp4`.

## Alur
1. **0–4,6 dtk · kenyataan (gelap hangat):** story teman di HP (wisuda, kantor baru, cincin) → bahu di meja pojok Fore.
2. **4,6–5,6 · ikon mimpi:** tetes embun di gelas membesar jadi gelembung → masuk dimensi bayangan.
3. **5,6–62,3 · bayangan (pudar terang, siluet takut):** kasur rapi (3 framing) → rutinitas berulang dengan framing identik → telentang → kasur melayang di ruang kosong, siluet di horizon → daftar Resolusi 2026 → kalender Jan–Des meluncur ke lensa → teman-teman berlari, ia tertinggal → grup WhatsApp, "aku…" dihapus, HP ditelungkupkan → ragu di pintu → Fore versi bayangan → siluet mengepung meja.
4. **62,3–63,5 · gelembung pecah:** disenggol → kilat negatif 1 frame → kedip bayangan/kenyataan berjangkar gelas.
5. **63,5–74,6 · kenyataan:** kopi tumpah di halaman resolusi → tertawa → baris yang sama dicoret berdua → bangku ramai, siluet takut berubah jadi orang hangat → tagline tulisan tangan putih.

## Proses dan QA
- Storyboard visual dan semua aset (44 gambar) digambar ChatGPT lewat terminal (langganan Pro). Gerak dikerjakan di Remotion 2.5D: kamera bergerak, layer kedalaman, pose-to-pose 12 fps. **Tanpa AI video, tanpa real footage.**
- Gaya diukur, bukan dikira-kira: energi tepi semua detik ≤ 10 (referensi 3–10; storyboard v3 dulu 26).
- Audio: 20 SFX via **API ElevenLabs** (kunci dari Keychain Mac), level otomatis di atas lagu, harmonik tambahan untuk speaker HP, uji speaker HP lolos.
- **3 putaran review oleh reviewer independen** yang tidak melihat prosesnya:

| Area | v2 | v3 | v4 |
|---|---|---|---|
| Cerita | 7 | 8 | 8 |
| Konsistensi tokoh/dunia | 4 | 5 | 7 |
| Gaya vs referensi | 5 | 5 | 6 |
| Komposisi/kamera | 6 | 6 | 7 |
| Keterbacaan teks | 4 | 7 | 8 |

Catatan v4 yang sudah diperbaiki di v5: tagline mulai lebih awal (±2 dtk ditahan), lembar DES menutup lensa (tidak ada frame kosong), grain lebih berat dan hitam diangkat di dunia kenyataan, top-down kasur diterangkan, shot barista diberi gerak kamera.

## Keputusan yang aku ambil sendiri (bisa diubah)
- Tokoh perempuan: varian rambut sebahu.
- Tagline: tulisan tangan putih di atas shot penutup (gaya penutup iklan Fore asli). Versi tulisan di planner dibuang karena tangan/pena tidak bisa dianimasikan meyakinkan.
- Rasa takut = siluet tanpa wajah (ref lampu ungu), menggantikan coretan kapur dan ikon.
- Durasi mengikuti satu potongan lagu tanpa lompat (0:26–1:40) supaya cocok dengan library musik IG.

## Yang masih bisa dinaikkan (revisi berikutnya)
1. Gaya dunia kenyataan masih lebih halus daripada ref 5/7 (skor gaya 6). Langkah berikutnya: gambar ulang 6 shot kenyataan dengan prompt bidang bersudut 2–3 nilai, bukan sekadar grading.
2. Gerak tokoh masih pose-to-pose (sengaja tanpa AI video). Kalau mau gerak tubuh lebih hidup di 2–3 momen (merapikan kasur, senggolan), opsi: inbetween manual 2–3 pose tambahan per aksi.
3. Perempuan belum ditanam sebelum adegan senggolan (bisa ditambah sosok kecil di latar meja Fore bayangan).

## Caption usulan
Hari ini mungkin kalah lagi. Tapi kadang, cerita baru mulai dari meja sebelah. ☕
—
Unofficial fan project · tidak terafiliasi dengan Fore Coffee maupun Biru Baru · musik: Kalah Lagi — Biru Baru.

## File penting
`SCRIPT.md`, `STORYBOARD.md` (v4), `SHOTLIST.md` (v5), `DECISIONS.md` (#1–40), `analisa/01–12`, `video/src` (kode Remotion), `tools/` (prep, ingest, trim, audio_build, visual_qc, el_sfx_batch).
