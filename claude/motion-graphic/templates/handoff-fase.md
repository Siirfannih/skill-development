# Handoff fase <n> · <proyek> · <tanggal>

Kamu subagen untuk **satu fase saja**. Kamu tidak melihat percakapanku dengan sutradara; semua yang perlu ada di file ini dan file yang dirujuknya. Jangan bertanya "lanjut?": kerjakan sampai gerbang fase ini PASS, lalu berhenti dan laporkan.

## Baca dulu (urut, hanya ini)
1. `claude/motion-graphic/LANTAI.md`
2. Cabang fase ini: <mis. `references/audio.md` §14.0C–14.0D untuk fase 2>
3. `projects/<proyek>/STATUS.md`, `contract.json`, `audio/ORDER.json`

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
