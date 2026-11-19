# LAPORAN · video perkenalan v6, draf tanpa musik (19 Nov 2026)

**Hasil:** `hasil/video-perkenalan_v6_draft.mp4` (tanpa musik) dan `hasil/video-perkenalan_v6_musik-aware-relax.mp4` (pratinjau musik, lihat bawah). 1080×1920, 30 fps, 2006 f (66,87 dtk), H.264 CRF 16, AAC 320k, −16,4 LUFS, puncak −0,87 dBFS.
Satu file draf menggantikan master A/B Otis di §7.5, karena musik dibatalkan (keputusan Irfan).

## Yang dikerjakan
- Audio lama dibuang. Suara `v6_suara.wav` dipakai tanpa diubah (dual-mono).
- Ke-23 shot sesuai §3/§4: talking head + motion graphic dengan dunia Blue Void / White Studio dari cutout RVM (pengganti Omni), KT R1/R2/R6, orbit, busur, slam, sobek, push-through, whip, motion blur terarah, negative 1 f, film burn, flash, dan grain.
- UI asli: kartu IG siirfannih, Workspace/Jadisatu, Canvas, greatstock, Tuntunly, repo GitHub `Siirfannih/skill-development`, Claude Code, ikon resmi CapCut/Premiere/After Effects, dan profil IG mobile yang dibangun ulang dari screenshot.
- SFX: 72 cue. Isinya tabel §5.3 ditambah whoosh di zoom/transisi, tick di hero R6, dan riser sebelum slam (BUILDER, PALSU, 100%, BERBEDA).

## Gerbang mutu
| Gerbang | Hasil | Catatan |
|---|---|---|
| `sfx_density.py` | PASS | 1,08 cue/dtk. Celah 52,5–57,9 dtk (#20) sengaja tanpa SFX. |
| `audio_phone.py` | 60/72 cue terdengar, 0 kasar | Yang tertutup kata: hantam ULANGI f18 (bertumpuk dengan "ulangi" yang keras) dan beberapa tick/pop di tengah kalimat. |
| `motion_lint.py` | PASS | Stagger orbit diberi `motion-ok`: jeda antarhuruf harus tetap supaya kata terbaca di lintasan. |
| `voice_level.py` | FAIL (bawaan sumber) | Puncak −0,9 dBFS sudah ada di `v6_suara.wav`. Suara memang dilarang diubah. |
| `cut_check.py` | FAIL (bawaan sumber) | 39 jeda dalam kalimat di potongan v6. Suara di luar lingkup draf ini. |
| `kt_check.py` | tidak dijalankan | Belum ada `teks.json`. Waktu KT ditulis di kode = onset kata +3 f (`kt/KT.tsx › at`); timing hero mengikuti §4. |
| Audit visual | 2 ronde (60 + 35 still) + 16 frame dari MP4 final | `qc/sheet/`, `qc/sheet3/`, `qc/final/` |
| Loop | Sambungan audio tanpa lompatan sampel | Ekor SFX di-fade 20 ms. Video: bloom putih → flash f0. |
| Still per beat / Devil's Advocate | dilewati | Keputusan Irfan: langsung draf penuh. |

## Penyimpangan dari guideline
1. Omni batal (Irfan). Shot STUDIO memakai cutout footage TH. #11 dan #21 tidak ada siluet duduk/berjalan seperti plate Omni: subjek tetap bicara ke kamera, gerak masuk di #21 disimulasikan dengan geser.
2. Musik §5.2 dibatalkan (Irfan), jadi tidak ada Otis di f772 dan tidak ada drum bed ±f600.
3. #14: jendela Claude memakai screenshot Claude Code dari `skill-development-journey/sumber/ref`, bukan sesi proyek ini.
4. #21: BUILDER TRAP mendarat sebagai baris di atas kepala, bukan cincin, karena cincin tidak terbaca. Diam f1778–1783, sobek f1783.
5. #23: adegan menyelam memakai tile "Ini Irfan" 623×834, karena reel resolusi penuh tidak bisa diunduh tanpa login IG. Polaroid memakai avatar asli supaya bisa berubah jadi avatar profil.
6. #10: PENYAKIT ada di pita atas kepala, karena di belakang kepala ia tertutup wajah yang memenuhi frame.
7. Peran SFX baru: `tick-hero`, `riser-slam`, dan `hantam-sub-hp` (hantam-sub + saturasi tengah agar terdengar di speaker HP). Sumbernya library SFXIrfan (Epidemic); berkasnya ada di `kerja/sfx_extra/`.
8. Matte RVM dikerjakan di setengah resolusi (CPU dibagi dengan agen lain). Disk bersama sempat penuh, jadi matte dibagi dua file. Tidak ada file milik orang lain yang dihapus.

## Masalah yang diketahui (belum diperbaiki di draf ini)
- f1650–1660: narasi "banyak tips" sempat menumpuk dengan "terkait produk" selama ±0,3 dtk.
- f1990–1996: "dan aku akan" keluar sambil profil mulai di-zoom, jadi menimpa header sebentar.
- Cutout #15 masih memuat kursi gaming hitam (matte RVM).

## Musik: Aware → Relax (pilihan Irfan, pratinjau)
**File:** `hasil/video-perkenalan_v6_musik-aware-relax.mp4` (gambar sama dengan draf, `-c:v copy`). −16,2 LUFS, puncak −0,8 dBFS. Kredit caption: `KREDIT.md`.

| Bagian | Sumber | Frame | Level sesudah duck | Kenapa di situ |
|---|---|---|---|---|
| Aware | 0:09,97–0:35,57 | f0–768 | −30 LUFS, lalu −26,5 dari f595 | Hantaman strings Aware (29,80 dtk) jatuh di jump cut #10 f595 (§5.2 "drum bed ±f600") dan membangun sampai ANXIETY / BELUM LAYAK |
| kantong | — | f768–772 | hening | Sama dengan §5.2: bed berhenti f768, layar gelap |
| Relax | 0:18,53–0:59,13 | f772–1990 | −28,5 / −29 (f1328–1845) / −28 | Hantaman groove masuk di "tapi" (titik balik). Angkatan groove berikutnya jatuh di ±f1869, saat polaroid jadi profil IG |
| kantong | — | f1990–2006 | hening | Musik berhenti sebelum slam ULANGI f1992, lalu loop kembali ke Aware di f0 |

- Proses (`alat/musik.py`): HPF 90 Hz. Saat bicara (dari `words_v6.json`), duck −3 dB (Aware) / −4 dB (Relax), dan dip −6 dB di 0,8–4 kHz. Ramp masuk 60 ms, lepas 250 ms. Suara tidak disentuh, gain SFX sama persis dengan draf.
- Pelindung puncak: musik saja yang turun sesaat (blok 10 ms) bila suara+SFX sudah di ≥ −1 dBFS. Ini terjadi di f5–9, 575–579, 735–739, dan 1106–1107.
- Uji (`alat/cek_musik.py`, `audio_phone.py`):
  - SNR suara terhadap musik, 1–4 kHz per kata: median 18,5 dB.
  - Kejelasan suara di HP: median 13,7 dB (tanpa musik 25,8). Ada 15 jendela < 8 dB: 5 sudah ada tanpa musik (SFX), 10 baru (6,2–7,8 dB, semuanya dekat batas).
  - SFX terdengar di HP: 60/72, sama dengan draf.
  - Kata paling tertutup:
    - "aku" f1220 (#16): suara pelan, pita penuh hanya 2,2 dB di atas musik.
    - "ini" f1895, di angkatan Relax.
  - Loop: sambungan 0 → 0, tanpa klik.
- **Belum didengar telinga manusia.** Yang perlu kamu cek: apakah Aware di hook terlalu tipis dan apakah Relax di tengah (#17–#21) terlalu menonjol.
