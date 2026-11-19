# STATUS · flat-mirip-mirip

Titik lanjut sesi. Sutradara: claude2. Diperbarui 18 Nov 2026 malam.

## Akses dan jalur pekerja (orkestrasi.md §2)
- Codex: `/home/irfan/.local/bin/codex`, login ChatGPT OK → jalur utama via `tools/codex-pc.sh . <TASK>` dari root repo.
- Storage: media `/mnt/storage-projects/flat-mirip-mirip/` (symlink `media/`); SSD `/mnt/ssd-win` (185 GB bebas, exec). Root ±8 GB bebas.
- Remotion: `remotion/` (4.0.380, npm ci OK, tsc OK). Entry sementara `src/index.ts` = komposisi pinjaman (D-07).

## Selesai (18 Nov malam)
| TASK | Pekerja | Hasil |
|---|---|---|
| kartu86-r1 | Codex | kartu 86 + 8 keyframe + ukuran; dinilai Sutradara: diterima (koreksi: penekanan reel ±2,3× kata kecil; kapital ±5 % H) |
| footage-r1 | Codex | 13 kandidat F1–F6, 170 MB, `media/footage/LOG.md`; pilihan awal F1-a, F2-b, F3-a, F4-a, F5-b, F6-b (final setelah keputusan nada P11–P14) |
| studio-acuan-r1 | Codex | 5 PNG Remotion Studio asli + ukuran panel/warna/font; rekonstruksi pakai SF Pro (tampilan Mac Irfan) |

RESEP LULUS (kiblat 86). Profil Behindwork LULUS (gaya baru, tanpa logo, D-09). tema.ts ditulis (tema_cek: tema bersih; 19 butir hanya di kode pinjaman yang akan dipindah).

## Komponen (19 Nov dini hari)
Semua dinilai Sutradara LULUS: A (teks, kanvas, invert, flash, KartuSlop), B r2 (Claude terang netral, Studio, Clawd), C (IG iOS SVG + wordmark asli, iPhone, Premiere), isi editor = video jadi Jensen (D-17), 16 gambar slop image_gen (D-16), PapanFootage r3 (P11/P12 putih, teks menjauhi wajah, tanpa vektor; P14 kartu foto).
Papan acuan r1: `/mnt/storage-projects/flat-mirip-mirip/render/papan-acuan-r1.jpg`, Drive "Claude edit/flat-mirip-mirip/papan-acuan-r1/" (+ still/). MENUNGGU persetujuan Irfan.

## Adegan (19 Nov pagi)
Semua P01–P15 dibangun Codex (w1–w4) dan LULUS penilaian still Sutradara; ronde: P02 r2, P06 r2, P08 r2, P01/P13 r3(+r3b). Master `Video` (src/Video.tsx) dirakit dari NASKAH. Draft utuh tanpa audio: `qc/draft.mp4` → Drive "Claude edit/flat-mirip-mirip/draft-r1/". Waktu kata masih SEMENTARA (`audio/naskah_sementara.py`).

## TERTAHAN: VO
Kunci ElevenLabs dari Irfan → `voice_not_found` untuk 1I8tElkHzrblGqkJtwn3 (klon ada di akun lain). Menunggu Irfan: kunci akun klon / voice ID lain / suara bawaan.

## Berikutnya
1. `tema.ts` (Sutradara) dari RESEP + profil → TASK komponen bersama (satu pekerja Codex) → papan acuan untuk Irfan.
2. Setelah VO: uji 1 kalimat → VO penuh per paragraf → Whisper words.json → potong/kunci (audio_order lock suara, cut_check) → naskah.ts dari waktu VO → draft ulang → `render.sh frames` + frame_audit (Sutradara) → SFX → musik → Devil's Advocate → render 1 → Drive.
3. Sebelum meluncurkan pekerja: `python3 tools/peta.py` + commit (pekerja berhenti bila PETA basi); TMPDIR=/mnt/ssd-win/tmp-flat.
