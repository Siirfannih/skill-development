# Handoff fase <n> · <proyek> · <tanggal>

Kamu subagen untuk **satu fase saja**. Kamu tidak melihat percakapanku dengan sutradara; semua yang perlu ada di file ini dan file yang dirujuknya. Jangan bertanya "lanjut?": kerjakan sampai gerbang fase ini PASS, lalu berhenti dan laporkan.

## Baca dulu (urut, hanya ini)
1. `claude/_bersama/NEGATIF.md`
2. Cabang fase ini: <mis. `references/audio.md` §14.0C–14.0D untuk fase 2>
   Fase 3 (visual): `projects/<proyek>/RESEP.md`, `qc/kondisi/KONDISI.md`, `qc/spine/SPINE.md`, lalu **Brief bergambar** di bawah: buka semua gambar yang disebutnya. Kartu penuh tidak perlu dibaca; blok teknik yang dipakai sudah disalin Sutradara.
3. `projects/<proyek>/STATUS.md`, `contract.json`, `audio/ORDER.json`

## Brief bergambar (ditulis Sutradara; wajib untuk fase visual)
Sutradara sudah membedah kartu yang dipakai dan mencocokkan syarat tekniknya dengan footage kita. Brief ini gambar dan syarat, bukan tabel angka. Satu blok per beat:

### <beat · detik>
- **Maksud adegan:** <satu kalimat: apa yang harus dirasakan penonton di sini>
- **Footage kita:** <`qc/kondisi/<beat>.jpg`> · kondisi: <latar gelap/terang, pakaian polos/bermotif, skala wajah, ruang kosong di mana, kamera diam/bergerak>
- **Spine gaya:** <`qc/spine/R2.jpg`, `qc/spine/R6.jpg`>: peran teks yang muncul di beat ini dan wujudnya yang sudah dikunci
- **Teknik yang dipinjam:** <kartu 83 T3b · frame kunci/klip `guide/referensi/sheets/keyframes/83-k8-urutan-pengantar-at.jpg`>
  - Kenapa bekerja di aslinya: <salin dari kartu>
  - Kondisi kita beda di: <mis. latar kita terang> → sesuaikan: <salin "Bila kondisinya beda" yang cocok>
  - Jangan pakai bila: <salin; Sutradara sudah memastikan tidak berlaku di beat ini>
- **Lulus bila:** still sanding (`qc/sanding/<beat>.jpg`: still kita · frame kunci kartu · still spine) dinilai Sutradara dengan pertanyaan "Yang harus terasa sama" dari kartu: <salin 2–4 pertanyaan yang relevan>

Angka dari kartu tidak ditulis sebagai target. Bila pekerja butuh angka awal, tulis "pengamatan di video asli: …" dan biarkan still sanding yang memutuskan.

**Pelajaran yang berlaku di beat ini** (disalin dari `guide/<urusan>/GUIDE.md` §Cara memutuskan, hanya yang kondisinya cocok):
- <bila …, jangan/pilih …, karena …; yang boleh: …>

**Jangan seperti ini** (dari `cookbook/contoh-gagal/`, yang mirip dengan beat ini):
- <nomor entri + satu kalimat sebabnya>

## Tujuan fase
<satu kalimat: apa yang harus benar setelah fase ini>

## Masukan terkunci (jangan diubah)
- <file + sha dari fase sebelumnya>

## Keluaran
- <file yang harus ada, path persis>
- Gerbang yang harus PASS: <perintah persis, mis. `audio_order.py lock suara … --voice-source …`>

## Batas
- Tidak mengubah fase hulu. Bila masukan terkunci salah, berhenti dan tulis temuannya di `STATUS.md` §Blok.
- Render hanya draft/still; render final hanya di fase 5.

## Laporan balik (≤ 15 baris)
PASS/FAIL tiap gerbang + bukti angka, file yang dibuat, penyimpangan beserta alasannya, titik lanjut.
