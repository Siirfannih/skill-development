# Handoff fase <n> · <proyek> · <tanggal>

Kamu subagen untuk **satu fase saja**. Kamu tidak melihat percakapanku dengan sutradara; semua yang perlu ada di file ini dan file yang dirujuknya. Jangan bertanya "lanjut?": kerjakan sampai gerbang fase ini PASS, lalu berhenti dan laporkan.

## Baca dulu (urut, hanya ini)
1. `claude/motion-graphic/LANTAI.md`
2. Cabang fase ini: <mis. `references/audio.md` §14.0C–14.0D untuk fase 2>
   Fase 3 (visual): `projects/<proyek>/RESEP.md` dan **Ringkasan kartu** di bawah, lalu buka gambar frame kunci yang disebut tabelnya. Kartu dan guide tidak perlu dibaca; isinya sudah diringkas Sutradara.
3. `projects/<proyek>/STATUS.md`, `contract.json`, `audio/ORDER.json`

## Ringkasan kartu (ditulis Sutradara; wajib untuk fase visual)
Sutradara sudah membuka kartu dan frame kuncinya. Pekerja tidak membaca kartu atau guide; ia bekerja dari tabel ini. Satu baris per kartu yang dipakai (kiblat dulu, lalu kartu pinjaman), isinya hanya yang dipakai video ini:

| Kartu | Dipakai untuk (beat) | Warna & latar | Huruf & skala teks | Posisi & susunan | Kedalaman & kamera | Frame kunci (lihat gambarnya) |
|---|---|---|---|---|---|---|
| <83 · kiblat> | <semua beat wajah> | <gelap bernada merah, putih + merah> | <condensed tebal; kata hero 35–55 % tinggi frame; narasi kecil> | <kata hero di belakang kepala; cincin kata melingkari kepala; narasi di dada> | <2–3 lapis, matte pembicara di depan teks; push pelan> | <`guide/referensi/sheets/keyframes/83-k3.jpg`, `83-k4.jpg`> |
| <23 · pinjaman> | <B7 b-roll kata> | <satu warna aksen layar penuh> | <kata raksasa putih memenuhi frame> | <tengah, satu kata> | <whip-pan menyapu kata> | <`…/23-k3-kata-raksasa.jpg`> |

**Pelajaran yang berlaku di beat ini** (disalin dari `guide/<urusan>/GUIDE.md` §Cara memutuskan, hanya yang kondisinya cocok):
- <bila …, jangan/pilih …, karena …; yang boleh: …>

**Jangan seperti ini** (dari `pustaka/contoh-gagal/`, yang mirip dengan beat ini):
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
