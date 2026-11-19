# TAHAP · video perkenalan v6 (19 Nov 2026)

| Tahap | Status | Bukti |
|---|---|---|
| Audio lama (Rain in L.A. + Otis) dibuang | selesai | `kerja/AUDIO-KEPUTUSAN.md` |
| Paket Drive diunduh & digabung (`gabung.sh`) | selesai | `sumber/` |
| Matte subjek RVM (0–1799) | selesai | `kerja/matte/fg.webm`, `fg_b.webm` |
| Posisi kepala per shot | selesai | `kerja/kepala_shot.json`, `remotion/src/data/kepala.ts` |
| Tangkapan UI asli (Jadisatu, Workspace, Canvas, greatstock, Tuntunly, GitHub, Claude Code, profil IG) | selesai | `aset/ui/`, `remotion/public/ui/` |
| 23 shot ditulis (Hook, Produk, Trap, Jembatan, Bukti, Penutup) | selesai | `remotion/src/shot/` |
| Audit still ronde 1 (60 frame) | selesai, 20+ temuan | `qc/still/`, `qc/sheet/` |
| Perbaikan + audit ronde 2 (35 frame) | selesai | `qc/still2/`, `qc/still3/`, `qc/sheet3/`; DECISIONS D4–D8 |
| Cue SFX + mix (suara tidak diubah) | selesai | `alat/mix.py`, `kerja/mix/cues.json`; 72 cue, 1,08 cue/dtk, −16,4 LUFS, puncak −0,87 dBFS |
| Gerbang audio HP | 60/72 cue terdengar, 0 kasar | `audio_phone.py --root kerja/mix` |
| Render penuh 1080p + mux | selesai (93 menit) | `hasil/video-perkenalan_v6_final_tanpa-musik.mp4`, Drive `…/hasil` |
| Musik Aware → Relax (pilihan Irfan) | final, disetujui Irfan | `alat/musik.py`, `hasil/video-perkenalan_v6_final.mp4`, `KREDIT.md` |

## Belum / perlu keputusan
- (opsional, butuh render ulang ±93 menit) 3 masalah visual kecil di LAPORAN "Masalah yang diketahui".
- Reel "Ini Irfan" resolusi penuh untuk menyelam di #23 (sekarang tile 623×834).
- 12 cue yang tertutup kata di model speaker HP (lihat `--list`), terutama hantam ULANGI f18 yang menumpuk dengan suara keras "ulangi".
