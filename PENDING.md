# Pelajaran yang menunggu keputusan Irfan

Dibaca di awal setiap sesi (lihat `AGENTS.md`). Satu baris per pelajaran. Irfan menjawab **ya** (pindahkan ke skill tujuan lalu hapus barisnya), **tidak** (hapus barisnya), atau membiarkannya. Model tidak memakai baris di sini sebagai aturan.

Sumber: `[I]` = ada kata Irfan, `[A]` = analisis AI.

## Audit audio 6 Nov: aturan yang saling bertentangan (`[A]`, butuh keputusan Irfan)

- A1 · SFX per kata: §14.3/§14.8/§14.9 "setiap kata kinetik berbunyi" vs `three-segment-gate` "subtitle tidak berbunyi" vs §14.A "nada serius = SFX jarang". Usul: bunyi hanya untuk kata penekanan dan teks diegetik; caption tidak berbunyi.
- A2 · Lapis per event: §14.3 "transien + body + bobot (3 lapis)" vs §14.8 "satu event satu bunyi". Usul: satu bunyi; hapus layering §14.3.
- A3 · Ducking musik: §14.1 duck 6–12 dB vs `hybrid-motion-standard` −6…−8 dB vs aturan inti 36 "musik tidak memompa > 1,5 dB". Usul: satu angka, diukur dari video yang Irfan setujui.
- A4 · Level SFX: empat spesifikasi tumpang tindih (§14.1, §14.3, §14.8, §14.10). Usul: satu tabel level di §14.10, yang lain dihapus.
- A5 · Senyap: §14.4 "punchline: semua audio senyap 0,4 dtk" vs aturan inti 32 "backsound tidak boleh bolong; stop-down diisi drone". Usul: ikuti 32 (turun, bukan hilang), §14.4 ditulis ulang.
- A6 · Waktu pop: §14.3 "pop −1…+1 f" vs §14.9 "+1…+2 f setelah objek terlihat" vs aturan inti 37 "SFX tidak mendahului objek". Usul: ikuti 37 dan §14.9.
- A7 · Whoosh: `hybrid-motion-standard` "whoosh rendah 40–80 Hz + sub-impact; glass ping/telemetry blip; panning L/R wajib" vs §14.5/§14.8 "whoosh tanpa sub, pita 400 Hz–2,5 kHz; beep sinus dilarang". Usul: hybrid-motion-standard bagian audio dicabut, §14.5/§14.8 berlaku.
- A8 · Aturan inti 35 merujuk "haptic micro-tick + felt pulse (§14.8)" dan pop LPF 3 kHz, padahal §14.8 mencabutnya 1 Nov dan §14.5 melarang menggelapkan klik. Usul: hapus rujukan itu dari aturan 35.
- A9 · Tempo VO: aturan inti 33 "VO ×1,05 dengan rubberband" vs preferensi Irfan (audit 2 Nov) "VO tidak pernah dipercepat; tempo dari jeda". Perlu keputusan.
- A10 · Resep satu kasus tanpa alasan: §14.4 urutan "senyap 9 f → 15 f", aturan inti 27 "tension bed ±110 bpm" (skor v9). Usul: jadikan contoh, bukan aturan; logikanya sudah di §14.A.
- A11 · Jalur Mac di §14.0 (`~/Downloads/Kenyset`, `~/Proyek/tuntunly-motion`) sementara kerja kini di PC server. Perlu jalur yang benar.
- A12 · `qa14.py` (cek gema §14.10) tidak ada di repo. Perlu file-nya atau ganti alat.

_Kosong._ Daftar 4 Nov (16 pelajaran dari proyek Fore, kartu usulan 30 Okt, dan RETRO 2 Nov) ditolak Irfan 4 Nov: proyek Fore tidak selesai dan pelajarannya bersifat kasus.
