# Gaya: editorial-bold (talking head cepat)

Template gaya untuk reel talking head yang cepat dan tegas: Anton besar, aksen merah, B-roll hitam-putih, split screen, transisi kamera. Diturunkan dari skill `talking-head-reels` kiriman Irfan (11 Nov), yang aturannya lahir dari 68 ronde catatan klien. Detail lengkap dan alat ada di engine-nya: `engines/talking-head-reels/` (`ENGINE.md` + `references/`). File ini hanya ringkasan untuk Sutradara dan tempat menulis perbedaan dengan skill kita. `SKILL.md` Hard Gate tetap menang.

Cocok: opini, cerita eksperimen, berita, hook provokatif, konten 45–90 dtk. Tidak cocok: suasana tenang/reflektif (pakai `minimal-premium`).

## 1. Token
| Item | Nilai |
|---|---|
| Kanvas | 1080×1920, fps = sumber |
| Ritme | jeda 0,22 dtk antar kalimat, 0,14 dtk di dalam kalimat; layar berubah tiap 2–4 dtk; presenter sendirian ≤ 6 dtk kecuali hook/CTA |
| Palet | merah `#ED3B22`, putih, hitam `#161216` untuk UI; B-roll hitam-putih (kontras +42, hitam `#0E0C0E` → putih kertas `#EDE6DE`), warna hanya ±1 dari 3 shot dan bila bermakna |
| Font | Anton (kata kunci, KAPITAL, 130–270 px) · serif (Didot Bold di Mac / Playfair Display Bold di mesin lain) untuk aksen halus · sub (Helvetica Neue Medium / Inter Medium) untuk subtitle 80–100 px |
| Teks | "centre stack": label → KATA BESAR → subtitle, x 540, y 700–1360, tidak di seperlima bawah, tidak menutupi wajah |
| Look | halftone 24 %, vignette oval 42 %, grain 4 |

## 2. Menu adegan
ID adegan = `kind` insert di EDL (`edl-schema.md` §3), dipilih dari peran kalimat (`edit-planning.md` §2):
| ID | Kalimat membahas… | Tampilkan |
|---|---|---|
| EB-presenter | opini, emosi, pertanyaan ke penonton | presenter wide/tight + kata besar atau subtitle |
| EB-full | benda, tempat, kejadian, tokoh konkret | `full` (1–3 klip bertumpuk "foto di atas foto") |
| EB-split | sesuatu yang harus dilihat sementara pembicara bereaksi | `split` (footage atas, presenter bawah) |
| EB-ui | angka, aturan, mekanisme, sumber | `number`, `bar`, `cards`, `counter` |
| EB-logo | merek, produk, model AI, perusahaan | `logo_flash`, `cards`, `converge` |
| EB-list | daftar "pertama… kedua…" | counter berdampingan (`solid` + teks) |
| EB-vsplit | dua aksi berlawanan | `vsplit` |
| EB-band | kontras dua kata | `band` (+ cut-out bila ada matte) |
| EB-frame | bentuk mirip berurutan (mata, lingkaran, layar) | `frame` match cut |

## 3. Perbedaan dengan skill kita (keputusan sampai Irfan bilang lain)
| Engine/ref bilang | Skill kita | Dipakai |
|---|---|---|
| Tanpa musik kecuali pengguna memberi | Musik dipilih di gerbang 10 (`audio.md`, aturan 25, 32, 45) | Skill kita; bila Irfan minta "tanpa musik", catat di `DECISIONS.md` |
| Subtitle/label keluar dengan fade 0,16 dtk | Aturan 5: nol crossfade | Fade pendek label diterima (bukan transisi adegan); transisi adegan tetap gerak |
| Satu putaran revisi: catat semua catatan, tunggu "go", kerjakan sekaligus | Sama (`roles.md` §5 langkah 7) | Sama |
| SFX tidak dibahas | Aturan 43: SFX di momen cerita + gerak terlihat, tanpa bunyi per kata | Skill kita (cue dari momen di EDL: hook, insert besar, flash, CTA; bukan tiap kata besar) |
| Higgsfield/Seedance untuk B-roll baru | Aturan 10: biaya disebut dulu | Sebut biaya (`get_cost`) sebelum generate |

## 4. Engine
`engines/talking-head-reels/`: persiapan → transkrip → potong jeda → master −14 LUFS → `edl.json` → `validate_edl.py` → `--stills` → render penuh. Diuji di PC Linux 11 Nov dengan font terbuka (lihat `ENGINE.md` "Fonts on Linux"); matte Apple Vision hanya di Mac.
