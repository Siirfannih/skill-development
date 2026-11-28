---
name: sg-qc-auditor
description: Pakai setelah render.sh final Soalnya Gini lulus; menjalankan gerbang deterministik sg_qc.sh lalu penilaian mata berbasis golden frame per beat, dan memasukkan episode ke antrean review final Irfan. Tidak pernah mengunggah.
---
# 07 · QC dan antrean review (tahap kanonik: Deliver)

v1 mengambil 6 frame di detik tetap (0, 3, 15, 30, 45, akhir) dan memberi skor absolut ≥ 8/10 oleh model yang sama. v2 mengganti keduanya: frame diambil **per beat** dari `shotlist.json` (frame yang sama dengan still storyboard), dan penilaian **membandingkan** dengan golden frame yang disetujui Irfan, bukan skor bebas. Alasan: skor absolut model sendiri tidak terkalibrasi, dan `cookbook/contoh-gagal/` 09–11 adalah frame yang lulus juri berbasis catatan tetapi ditolak saat dilihat.

## 1. Tahap 1 · deterministik (0 token)
`bash tools/sg_qc.sh episodes/sgNNN` → `qc/qc-report.json`, exit 1 bila satu gerbang gagal:

| Gerbang | Isi | Sumber aturan |
|---|---|---|
| G0 jalur render | `qc/jobs.jsonl`: final terakhir rc 0 (render lewat `render.sh`) | MOTION-CORE §4 |
| G1 format | 1080x1920, 30 fps, durasi = target ±0,5 dan 45–60,5 dtk | plan §3 |
| G2 pengiriman | `$MG/gate/delivery_probe.py`: H.264 High, yuv420p, bt709 ×3 + tv, faststart, AAC-LC 48 k stereo, −14…−16 LUFS ±0,5, TP ≤ −1 | `references/delivery-spec.md` |
| G3 slop | `tools/slop-grep.sh` naskah + caption + kode + cue | `references/slop-catalog.md`, anti-slop §1 |
| G4 palet | `$MG/palette_check.py` ≤ 2 keluarga aksen, dominan ≥ 70 % | Lantai C18a |
| G5 beat | `beat_frames.py cek` + ekstrak keyframe per beat dari MP4 | — |
| G6 golden | `golden_cek.py`: KOSONG, LUAR-TOKEN, TANPA-GOLDEN = gagal; selisih terang/kepadatan = PERLU-MATA | Lantai D22, C18a |

Gagal → kembali ke skill 06 dengan daftar gerbang gagal: `antrean.py pindah <id> build --oleh mesin --catatan "<gerbang>"` (mundur diizinkan; hanya lompat maju yang ditolak). Maks 2 putaran; ke-3 → `antrean.py tahan <id>`.

## 2. Tahap 2 · mata, dibandingkan dengan golden
Penilai: Sonnet vision, **bukan sesi yang membangun episode** (Lantai F26 satu penilai, `templates/roles/pemeriksa-frame.md`). Bahan: `qc/golden/sanding.jpg` (golden kiri, keyframe kanan), `qc/golden/golden.json` (PERLU-MATA), `cookbook/contoh-gagal/README.md`.

Per beat jawab ya/tidak + satu baris bukti:
1. Gaya sekeluarga dengan golden (kanvas, cutout, tipografi, aksen) tanpa menyalin komposisinya.
2. Satu fokus, urutan baca jelas, kata sambung ≥ 56 px terbaca di 360 px (Lantai C14, C17, A7).
3. Teks dekat subjek, tidak di zona tepi/UI (A2, C16; zona `kit/tema.ts` ZONA).
4. Visual menggambarkan makna kalimat, bukan hiasan (D19, S-V14, S-V24).
5. Maskot sesuai sheet dan melakukan aksi yang tertulis (KRK-01).
6. Tiap PERLU-MATA dijawab: disengaja (alasan) atau perbaiki.
Putusan per beat LULUS/PERBAIKI. Satu PERBAIKI → kembali ke 06 untuk beat itu saja (Lantai F27). Bila angka golden dan putusan penilai bertentangan dua kali → Opus sebagai penilai kedua.

Devil's Advocate dari luar sekali sebelum review final (`templates/roles/devils-advocate.md`): usul, bukan gerbang.

## 3. Ke Irfan
- Lulus → salin `render.mp4`, `qc-report.json`, `sanding.jpg`, caption YT/FB (lolos slop-grep), dan daftar pengungkapan (K-02/K-06: AI/sintetis? afiliasi?) ke `ready-for-review/sgNNN/`; `antrean.py pindah <id> review_final --oleh mesin`.
- Ringkasan 5 baris di sesi review berikutnya (08:00/20:00 WITA). **Tidak ada upload otomatis.** Irfan setuju → `antrean.py pindah <id> siap_unggah --oleh irfan`; upload (manual atau terjadwal) lalu `pindah tayang --oleh irfan` dan tambah baris ke `arsip/tayang.jsonl` + salin naskah ke `arsip/naskah/` (bahan `variasi_cek.py`).
