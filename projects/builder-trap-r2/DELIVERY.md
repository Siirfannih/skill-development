# Delivery · Builder trap r2 v1 (12 Nov 2026)

File: `out/builder-trap-r2_v1.mp4` (PC) · Drive: `Claude edit/builder-trap-r2/builder-trap-r2_v1.mp4` · 1920×1080, 30 fps, 94,97 dtk, H.264 + AAC 256k.

## Gerbang (bukti)
| Gerbang | Hasil | Bukti |
|---|---|---|
| 0 doctor | PASS | `tools/doctor.sh` "Siap." |
| 2 naskah | final (Irfan R-011) | `naskah/SCRIPT.md`, `edit/naskah_A.json` |
| 6 suara dikunci | PASS | `audio/ORDER.json`; 6 jeda mati dirapatkan, tempo tidak diubah |
| Resep | LULUS | `resep_check.py` |
| Teks satu kali | PASS | `node remotion/scripts/cekkata.mjs 0 94.97`: semua kata tampil tepat sekali |
| teks_cek still juri | 20 tanda, semua teks UI asli/gerak kamera | `qc/JURI.md` |
| JURI | LULUS | `qc/JURI.md`, `qc/sanding.jpg` |
| SFX (aturan 43) | PASS: 324 cue, 3,41/dtk, cakupan 87 %, celah 0 dtk | `sfx_density.py qc/draft.mp4 audio/cues.json` |
| Urutan sound design | PASS suara → visual → SFX → musik | `audio_order.py check` |
| Loudness | −14,8 LUFS, puncak −1,1 dBFS | ebur128 pada MP4 (target −14,0…−14,5: 0,3 LU di bawah karena −0,4 dB pengaman AAC) |
| Suara asli tidak rusak | PASS (ΔLRA −0,5 LU) | `voice_fidelity.py` |
| Bed musik per 3 dtk | sebaran 3,5 dB (≤ 4) | `audio/mix.py` auto-gain |
| HP speaker | 241/324 cue terdengar (sisanya tick per kata −19 dB, sengaja sangat lembut); kejelasan suara median 12 dB | `audio_phone.py` |
| Palet | keluarga dominan 64 % (target ≥ 70 %): keluarga kedua = biru kaos/dinding footage wajah, bukan grafik | `palette_check.py` |
| Radial | tidak ada `radial-gradient` di src | grep |

## Penyimpangan (ditulis, bukan disembunyikan)
1. Musik "Aware" dipertahankan walau `music_fit` kategori energi menggugurkannya (membaca 143 bpm sebagai 71,8); alasan di DECISIONS R-015.
2. Kartu judul "mempublikasikan" ±16 % tinggi (kiblat ±50 %): kata 15 huruf.
3. Teks di belakang kepala (kiblat 55) tidak dipakai: tidak ada matte wajah.
4. Render final pertama gagal di frame 2596 (Img timeout 28 dtk saat PC beban tinggi); `remotion.config.ts` diberi timeout 180 dtk, render ulang penuh.
5. Kontras footage wajah: grade ringan saja; kamar asli redup.

## Bahan lain
Storyboard/rencana: `handoff/PLAN.json` · review per ronde: `handoff/REVIEW-r*.md` · cue sheet: `audio/cues.json` · laporan Editor: `handoff/REPORT-r*.md` (r2a/r2b/r2c di balasan sesi).
