# Gerbang 3 Segmen (Irfan, 2 Nov 2026 06.48)

Claude tidak melihat video saat menulis kode. Karena itu kode harus ditulis seperti visualnya sendiri: tiap objek bernama sesuai isinya, punya timecode, perannya di layar, dan bunyinya. Kesalahan ditangkap di tahap paling murah. Setiap segmen harus lolos sebelum segmen berikutnya dimulai. Target: putaran perbaikan ≤ 30 menit, karena yang diperbaiki hanya temuan kecil, bukan seluruh video.

## Segmen 1 · Kode (sebelum render apa pun)
- **Nama objek = isi visual.** Contoh: `Altman ngomong`, `Image1`, `Image2`, `Image3`, `Kalender hari kerja`, `Blok Invoice Oktober`. Penanda SFX memakai id yang sama: `<scene>:<objek>:<peristiwa>` (mis. `02e:cal:block:Invoice_Oktober`).
- **Logika SFX turun dari nama.** Contoh:
  - `<Pembicara> ngomong` berarti ada narasumber, jadi ducking BGM.
  - `Image1..N` berarti pergantian gambar cepat, jadi satu SFX tiap pergantian.
  - `Blok … muncul` berarti satu bunyi UI.
  - Kamera patah ke wide berarti whoosh.
- **Koordinat, warna dan kontras ditetapkan di kode:**
  - Teks memakai komponen bersama (`AnchorWord`, `SpeakerLine`) yang menjepit ke safe zone (`lib/safe.ts`).
  - Warna teks dipilih terhadap latar. Tidak hanya hitam dan putih: warna aksen boleh selama kontrasnya ≥ 3:1.
- **Lolos jika:**
  - Kode rapi dan mudah dikenali.
  - Tiap objek bernama dan terikat ke SFX/BGM-nya.
  - Tidak ada teks di luar komponen bersama tanpa alasan.

## Segmen 2 · Pra-render (kanvas + timeline di Remotion)
- Jalankan `node seg2_probe.mjs <dir> <a> <b> 8 0.25`.
  - Hasilnya: still kecil tiap 8 frame, plus log `OBJ` berisi kotak layar tiap objek bernama. Kotak diambil dari DOM Remotion, sudah termasuk transform kamera.
  - Log `SFXEV` ikut tercatat.
- Jalankan `python3 tools/seg2_layout_check.py <dir>`. Pemeriksaannya:
  - **SAFE:** teks utuh di dalam x 15–85 %, y 20–80 % (1920×1080: x 288–1632, y 216–864). Mengikuti safe zone thumbnail YouTube.
  - **CLASH:** dua teks bertumpuk.
  - **CONTR:** kontras teks vs latar < 3:1. Teks yang tak terbaca atau bertabrakan dengan warna di belakangnya mengurangi 1 poin estetika.
- Lihat contact sheet still ≤ 960 px untuk estetika: ruang kosong, hierarki, variasi.
- **Lolos jika** laporan LOLOS dan contact sheet bersih.

## Segmen 3 · Render MP4
- Render per segmen (Mac `seg.sh`), lalu periksa:
  - durasi;
  - sinkron SFX dan backsound;
  - per frame di sekitar cut;
  - transisi;
  - gerbang audio (keterdengaran SFX, VO di atas latar pada volume HP).
- Render final sekali, setelah reviewer segar memberi SHIP.

## Aturan teks (terkunci)
- **Teks = penekanan, prioritas 2.** Visual kuat tidak butuh teks.
  - Contoh salah di PKS v9: "8 jam", "45 menit", "TIDAK BERHENTI", "PERSIS".
  - Cara yang benar: kalender padat yang bloknya muncul perlahan sudah cukup menjelaskan.
- **Ukuran font seragam dalam satu urutan.**
  - Pembedanya huruf kapital di awal, misalnya "This time progress was so Fast".
  - Bisa juga warna aksen yang kontras. Ukuran tidak dibesarkan.
- **Hindari pola "blok di kiri + teks di kanan" di atas latar hitam polos.** Pola ini menyisakan ruang kosong besar di atas dan bawah, jadi melanggar gaya Apple yang modern dan elegan. Isi frame dengan visualnya, dan kamera fokus ke objek.

## Audio (koreksi)
- **Rentang −21 s/d −41 dB adalah aturan BACKSOUND (BGM), bukan SFX.**
- SFX diatur relatif terhadap ucapan VO, harus terdengar jelas, dan VO tetap raja. Angka per jenis diambil dari audit referensi `GrokAgent/reference-videos/AUDIT-2NOV-C-audio.md`.
