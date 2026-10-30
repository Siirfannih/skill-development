---
status: principle
scope: autopilot-video
how_to_use: "Cara operasi yang diusulkan untuk autopilot."
---

# ConOps · simulasi pemakaian

Jam adalah perkiraan, belum diukur di PC server.

## Skenario 1: jalur normal
1. **20.00 (Irfan online, bersama Claude):** pilih ide dari radar Maximus, naskah dengan `script-workshop`, lalu storyboard.
2. **21.30 gerbang 1:** Irfan menulis "storyboard final". Orchestrator membuat `contract.json`, ringkasan satu layar (jumlah beat, durasi, referensi + ambil/jangan), lalu mengunci. Audio baru dibuat setelah titik ini.
3. **21.45:** file tugas per beat dibuat; Maximus menerima permintaan aset.
4. **22.00-04.00 (Irfan offline):** per beat: build -> proxy -> cek mekanis -> kritikus -> devil's advocate -> perbaikan. Lulus = dikunci; gagal 3x = `ESKALASI`, lanjut beat lain.
5. **04.00:** render penuh, cek ulang (sambungan, audio utuh, volume HP 20/50/100%).
6. **07.00 laporan pagi:** link video, tabel kepatuhan per beat, skor kritikus, keputusan default + alasan, maks 3 pertanyaan.
7. **Gerbang 2 (10-15 menit):** approve -> antrean posting; masukan kecil -> perbaikan otomatis di beat terkait saja; masukan besar -> permintaan perubahan kontrak untuk beat itu.
8. Setiap masukan Irfan -> kasus uji `evals/` + anchor set lensa Irfan.

## Skenario 2: beat macet
Beat gagal 3x di butir sama setelah 2 pendekatan. Ditandai `ESKALASI`, render penuh tetap jalan dengan versi terbaik, laporan menaruhnya paling atas dengan frame sebelum/sesudah + 2 opsi.

## Skenario 3: kritikus salah
Kritikus menyarankan "ganti ikon AI dengan orang". Devil's advocate menolak (aturan Irfan: AI digambar sebagai AI). Temuan dibuang dan dicatat; builder tidak pernah menerimanya.

## Skenario 4: mesin mati tengah malam
Runner lanjut dari checkpoint; beat terkunci tidak diulang; tugas yang sedang jalan diulang dari awal tugas itu (idempoten).

## Yang benar-benar terjadi di pilot (27 Okt, Mac, bukan PC)
21:26 mulai -> 21:38 kontrak + VO -> 21:44 build selesai -> render gagal 2x (disk) -> 21:52 render per potongan -> QC r0 (5 temuan) -> r1 (2 regresi) -> r2 -> 22:08 final. Masukan Irfan -> r3 (full-bleed, pipa dibelah) 22:47. TTS lokal menggantikan ElevenLabs 23:5x. Detail: `pilot/aff-pompa-01/`.
