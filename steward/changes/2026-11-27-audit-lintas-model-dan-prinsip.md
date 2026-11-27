# Audit lintas model, perbaikannya, dan lima prinsip kerja

Tanggal: 27 Nov 2026. Cabang: `audit/perbaikan` (belum digabung ke `main`).

## Audit

Dua auditor baca-saja, terpisah, hanya menerima `PURPOSE.md` dan brief pemilik: Gemini Orchestrator (56 temuan) dan Qwen Max (60 temuan). Laporan mentah: di luar repo, `sd-steward-run/audit/`.

## Perbaikan (empat agent, satu perbaikan per commit)

- Skrip penilai selera, kuota, dan isian formulir mencetak CATATAN dan keluar 0; `--ketat`/`KETAT=1` mengembalikan perilaku lama. Cek teknis tetap menggagalkan: teks keluar frame, panel hilang, render error, tabrakan blok teks, kontras.
- Dokumen: referensi dan brief user didahulukan untuk warna dan gaya; tema dan kartu jadi inspirasi; slogan lulus/gagal dan kuota dihapus; analisis video satu definisi (dengar, frame visual, frame gerak, transkrip); nama pemilik di teks otoritas diganti peran.
- Berkas topik ganda digabung: `teks.md`, `kamera-gerak.md`, `revisi.md`, `warna.md`, `pola-salah.md`, `decision-guide.md`. Delapan berkas lama di `archive/riwayat/references-lama/`.
- Render: Chrome yatim setelah SIGKILL/OOM tertutup untuk `still`/`draft` (bukti Chrome nyata: `2026-11-27-render-yatim-lanjutan.md`); TMPDIR per job; `lapisan.py` dan `pabrik/uji.py` dalam grup proses; Codex di `sync.sh` hanya bila diminta.

## Lima prinsip (kata pemilik, ditulis di blok invarian `AGENTS.md`)

1. Gaya = data, bukan aturan.
2. Referensi dan arahan user = masukan nomor satu.
3. Storyboard disetujui pemilik sebelum build atau render.
4. Perbaikan per adegan.
5. Model = co-editor, pemilik = sutradara, skrip = mata (cek teknis saja).

Blok invarian lama (cookbook bukan template, promosi lewat skill-steward, gerbang pemilik, aturan = praktik terbaik, baca dulu) diganti lima prinsip ini; rute skill-steward dan "baca dari repo" tetap ada di tabel rute dan paragraf Kerja. Caption storyboard disederhanakan menjadi: tujuan, ide visual, referensi user yang diikuti, gerak, durasi, VO.

## Belum dibuktikan / belum dikerjakan

- Mode `frames`, `final`, kunci global belum dijalankan dengan Chrome nyata; tidak ada video penuh yang dirender.
- `frame_audit.py` masih meminta render ulang semua frame saat kode berubah (bertentangan dengan perbaikan per adegan).
- Pemilih kartu belum punya sumbu medium; celah kartu (CTA, harga/data, UI sentuh, bisnis lokal, sebelum/sesudah) belum diisi.
- Nama tahap di `TAHAP.md` dan Fase di `PETA.md` masih dikunci skrip; baru diberi pemetaan.
- Scrim hitam: `three-segment-gate.md` melarang, `teks.md` mengizinkan saat kontras gagal. Menunggu pemilik.
- `director-pass` masih berstatus wajib walau baru sekali diuji. Menunggu pemilik.
