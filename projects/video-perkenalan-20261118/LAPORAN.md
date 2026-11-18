# LAPORAN · video perkenalan v6, draf tanpa musik (19 Nov 2026)

**Hasil:** `hasil/video-perkenalan_v6_draft.mp4`. 1080×1920, 30 fps, 2006 f (66,87 dtk), H.264 CRF 16, AAC 320k, −16,4 LUFS, puncak −0,87 dBFS.
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

## Usulan musik (pilih satu; semuanya file lokal)
Dipilih dari metadata dan pemakaian sebelumnya di repo; **belum saya dengarkan bersama video ini**. Setelah kamu memilih, saya buat mix pratinjau dan cek masking suara.
1. **Aware (Adrián Berenguer) → Relax (Peyruis), sambung di f772.** Paling dekat dengan struktur rencana awal: sinematik minor yang pelan dan membangun untuk hook sampai anxiety, lalu hangat dan ringan mulai titik balik "Tapi, gimana kalau…". Keduanya sudah pernah dipakai dengan kredit di video Skill Development. Catatan alat fit: Aware menutupi suara di ±3 kHz, jadi harus jauh di bawah suara (±−11 dB) dengan EQ.
2. **Ecosystem | The Creator (Adrián Berenguer), satu lagu penuh.** Sinematik dokumenter tanpa sambungan; paling sederhana.
3. **Another Christmas Alone (Auxjack).** Lo-fi santai, sudah ada di folder musik proyek ini. Lisensinya belum dicek.
