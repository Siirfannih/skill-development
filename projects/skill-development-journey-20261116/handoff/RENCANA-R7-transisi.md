# RENCANA-R7-transisi (Sutradara, fase finishing; BUKAN tugas pekerja, D-470)
Baca dulu `handoff/R7-BERSAMA.md`. Dikerjakan SETELAH pekerja ktwajah/ui/ig/tokoh selesai: basis `lego/lego_r7.json` (jalankan `python3 lego/r7_gabung.py` dulu) dan rakitan rentangnya.

TUJUAN: tidak ada pergantian adegan yang meloncat; tiap titik ganti punya jembatan gerak yang halus dan dipilih dari hubungan ruang dua adegan, semua bergaya Apple motion yang bersih (tanpa piksel/voxel; voxel hanya tokoh).

## KONTEKS · titik ganti adegan (cek waktu persis di rakitan)
| ± dtk | Dari → ke | Sekarang | Arah usulan |
|---|---|---|---|
| 1,53 | wajah → UI repo | wajah mengecil ke lingkaran (R4) | periksa halus/ease/blur; pertahankan bila sudah baik |
| 4,47 | UI repo → wajah | lingkaran membesar (R4) | idem |
| 15,1 | wajah → bingkai parodi viral | bingkai neon muncul | jembatan: push-in + bingkai masuk dari luar frame (parodi boleh ramai, tapi masuknya halus) |
| 22,9–23,6 | parodi → UI app Claude | (cek) | "parodi runtuh" lalu frame bersih: shape besar putih menyapu frame (kartu 07) atau pull-back ke jendela app |
| 34,4–36,3 | UI app → wajah | (cek) | push-through ke lingkaran wajah di kanan bawah lalu wajah penuh (kartu 63 zoom-through) |
| 48,0 / 50,3 / 53,6 | kartu 20×/5× masuk/keluar | kartu muncul/hilang | kartu masuk dari luar frame dengan `land` + blur, keluar `leave` |
| 57,92 | wajah → workflow Claude | gelombang grid dari jentikan | SUDAH (jangan diubah) |
| 72,07 | workflow Claude → Blender | potong keras | match objek (kartu 07 "match lewat maskot"): kamera mendorong ke Clawd di baris "Selesai" jendela Claude, Clawd memenuhi frame, lalu menjadi Clawd 3D di meja Blender (zoom-out dari Clawd 3D). Alternatif bila tidak bersih: pull-back keluar dari jendela yang mengecil ke layar monitor Blender |
| 76,41 | Blender → IG | (cek) | push ke layar monitor Blender → menjadi video di postingan IG (zoom-through) |
| 78,66 / 79,28 | IG ↔ PROFESIONAL hijau | potong (punchline) | biarkan potong (punchline disengaja), periksa saja |
| akhir 83,8 | — | — | pastikan frame terakhir tidak putus mendadak (tahan + gerak pelan) |
Gaya: maksimal 3 jenis jembatan di seluruh video (mis. zoom-through, shape menyapu, match objek) + gelombang grid khusus. Durasi 0,3–0,6 dtk, kurva `heavy`/`whip` dari `remotion/src/lib/curves.ts`, blur gerak (`@remotion/motion-blur` CameraMotionBlur) saat gerak cepat, tanpa crossfade.

## KARTU
| Kartu | Transisi | Frame kunci |
|---|---|---|
| 07 Baikov | shape yang membesar melewati frame (wipe kilasan), masker lingkaran berisi foto, cut di puncak riser, match lewat maskot (hex → wajah) | `guide/referensi/sheets/keyframes/07-*.jpg` |
| 68 Baikov kedua | transisi dipicu OBJEK ±0,5 dtk: pil cahaya terbang menyapu, lingkaran mask membuka dunia baru, busur "swoosh" menyeret ke adegan berikut | `…/68-*.jpg` bila ada |
| 63 invideo | kamera virtual selalu bergerak; zoom-through/morph dari prompt ke adegan berikut; wash warna | `…/63-k5-prompt-kaca.jpg`, `63-k6-chat-klip.jpg` |
| 02 Dimensi | push-in besar, tangan/objek menutup lensa = ganti shot | `…/02-k5-wide-studio.jpg` |

## FILE BOLEH
BARU: `remotion/src/video/bersama/transisi/**`, `remotion/src/video/Root.tsx` (hanya tambah Composition), `lego/r7_transisi.py`, `lego/r7_override_transisi.json`, `lego/cache/r7_transisi_*`, `qc/r7/transisi/**`. Untuk 72,07 boleh menambah lapisan baru di atas D_RELAY/b10a (tidak mengubah file Blender).
## FILE JANGAN
Override pekerja lain (baca saja; bila transisi butuh lapisan mereka diubah, tulis permintaan di laporan), `lego/r7_gabung.py`, b7.tsx gelombang, teks.json, audio/, edit/.
## LULUS BILA
1. tsc lulus. 2. Untuk tiap titik di tabel: strip 12 frame (±6 f) di `qc/r7/transisi/<dtk>.jpg` dari rakitan rentang; tidak ada frame meloncat, kosong, atau dua adegan bertumpuk transparan (crossfade). 3. Tabel di laporan: titik · jenis jembatan · durasi · alasan (hubungan ruang).
## LAPORAN
`handoff/REPORT-R7-transisi.md` (sebut waktu puncak tiap transisi untuk SFX).
