---
status: principle
scope: autopilot-video
how_to_use: "Rencana sistem. ADR di dalamnya masih menunggu Irfan, bukan kriteria video lain."
---

# PRD · Autopilot produksi video

## Masalah
Di The Gap dan video berikutnya polanya sama: ide, bedah storyboard, dikerjakan, Irfan memberi masukan, revisi, render lagi. Waktu Irfan habis untuk menunggu render dan memeriksa revisi satu per satu. Sebagian besar masukannya sebenarnya bisa diturunkan dari yang sudah tertulis: storyboard, referensi, aturan `motion-graphic`, dan pola masukan Irfan sebelumnya.

## Pengguna
| Siapa | Butuh |
|---|---|
| Irfan (owner, taste gate) | Membahas rencana saat online; menerima video yang sudah layak dinilai; tidak memantau revisi |
| Agent pembuat (ChatGPT/Codex, DeepSeek) | Tugas jelas per beat, kriteria lulus yang bisa dicek, tidak menebak |
| Agent penilai (Claude, Gemini) | Acuan yang sama: kontrak, referensi, rubrik, lensa Irfan |
| Maximus (Grok) | Riset dan aset yang terikat ke butir antrean |

## Tujuan
1. Setelah gerbang 1, video sampai "siap dinilai Irfan" tanpa interaksi Irfan.
2. Setiap penyimpangan dari storyboard tertangkap sebelum Irfan melihat, atau tercatat dengan alasan.
3. Beat yang sudah lulus tidak rusak oleh perbaikan beat lain.
4. Setiap masukan Irfan di gerbang 2 menjadi aturan atau kasus uji (`EVALS-DESIGN.md`).
5. Waktu per tahap dan biaya per video tercatat otomatis (dasar ROI per video).

## Bukan tujuan (v1)
- Menulis naskah dan storyboard otomatis tanpa Irfan (tetap dibahas bersama).
- Posting otomatis.
- Menggantikan selera Irfan.

## Ukuran berhasil (usulan, dikunci Irfan)
| Ukuran | Cara ukur | Target |
|---|---|---|
| Tangkapan penyimpangan | Uji mundur: % masukan Irfan dulu yang juga ditemukan sistem | >= 70% |
| Interaksi Irfan per video | Pesan antara gerbang 1 dan 2 | 0 |
| Ronde masukan setelah gerbang 2 | Ledger | <= 1 |
| Beat terkunci yang rusak | `baseline_lock.py check` | 0 |
| Biaya marjinal per video | Kredit + token murah + menit Irfan | Tercatat tiap video |

## ROI per video (jalur affiliate)
```
Biaya video = kredit (0 bila TTS lokal) + token model murah + menit Irfan x nilai jam
Pendapatan  = views x CTR keranjang x konversi x komisi rupiah per penjualan (+ monetisasi FB)
ROI         = (pendapatan 30 hari - biaya) / biaya
```
Budget model AI Irfan: +-Rp3,6 jt/bulan (mulai Nov 2026: ChatGPT Pro 5x + Claude Max 5x). Budget naik hanya setelah ada jalur yang menghasilkan. Simulasi Irfan: 10 video x 10 penjualan perlu komisi rata-rata +-Rp36.000/penjualan untuk impas.
