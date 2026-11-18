# TASK-R7-ktwajah · teks kinetik di adegan wajah jadi bentuk kartu 83 (D-445, D-462)
Baca dulu `handoff/R7-BERSAMA.md` (aturan bersama, cara menyerahkan, kamera, merek, kartu). Rancangan Sutradara: `handoff/RANCANGAN-KT-R6.md`.

TUJUAN: narasi di adegan wajah tidak lagi kata putih di pita bawah ("caption tempelan"), tapi hidup di ruang yang sama dengan kepala/badan Irfan memakai bentuk kartu 83, dan semua slab ber-matte selaras dengan kamera r7.

## KONTEKS
Blok teks (`teks.json`: id, teks, t, dur, peran, gaya, pos) yang menjadi milik tugas ini, bentuk barunya:
| Rentang | ID | Bentuk baru |
|---|---|---|
| 0,32–0,83 | T001 "Oke," | K4 kata tunggal di dada |
| 4,32–8,5 | T006 T007 T008 T010 T012 T013 | K2 tangga di sisi kiri wajah, turun mengikuti bahu kiri; "baru aja ngebikin" dalam tag kaca (busur workflow/AI model sudah di atas kepala → tangga di sisi lain) |
| 10,5–12,0 | T017 T018 | K1 cincin pendek (≤ 3 kata) mengelilingi kepala, menuju DECISION |
| 12,52–14,72 | T020 T021 T022 T023 T024 | K4 di dada / tangga pendek kanan; "dalam ngebuat video" tetap di bawah DECISION (D-412) |
| 15,28–22,8 (parodi viral, bingkai neon) | T026–T033 T035–T037 | K2 tangga sisi kanan, tag putih polos tipis (parodi jadi pusat; narasi tidak bersaing) |
| 36,65–37,4 | T050 "cuma mempelajari" | label pengantar rapat di atas slab (sudah benar, D-450) — jangan diubah posisinya relatif slab |
| 38,28–41,76 | T052–T056 | K1 cincin di kepala, bagian belakang lewat DI BELAKANG kepala (matte) |
| 42,86–45,4 | T058 T059 T060 T061 T062 | K4 kata di dada + "habis banget" sebagai pil (penekanan) |
| 45,4–53,6 | T063 T064 T068 T069 T071 T072 T073 | K4 kata di dada / tangga kiri bawah. JANGAN T065 "ChatGPT Pro", T066 "Max yang", T067/T070 kartu (milik TASK-R7-ui) |
| 53,97–56,98 | T074 T075 T076 | K1 cincin naik menuju LINTAS AGENT |
Lapisan ber-matte yang harus DIRENDER ULANG (desainnya TIDAK berubah, hanya selaras kamera r7 lewat `lego/lubang.py potong_zoom` dengan zoom dari `lego_r7_kamera.json`): T002 FINALLY, T009, T011, GRADE, T034, T051, T057, T077 (+ label T051_lbl/T057_lbl/T077_lbl tetap rapat ke slab-nya, D-450).
Tidak disentuh: T019 DECISION, T025 VIRAL, S01–S14, T038, bubble/tokoh (K_*, B_*: milik TASK-R7-tokoh), semua adegan UI/IG/D/E.

## FILE BOLEH
BARU: `remotion/src/video/bersama/kt83/**` (komponen Cincin, Tangga, KataDada, Pil), `lego/r7_ktwajah.py`, `lego/r7_override_ktwajah.json`, `lego/cache/r7_ktwajah_*`, `qc/r7/ktwajah/**`. UBAH: `remotion/src/video/Root.tsx` (hanya menambah Composition), `remotion/src/video/bersama/tema.ts` (hanya token baru bertanda D-462).
## FILE JANGAN
`lego/lego_r6.json`, `lego/r6_gabung.py`, `lego/r7_gabung.py`, `lego/bangun.py`, `lego/teks.py`, `teks.json`, file adegan b1–b7, `bersama/KT.tsx` (boleh dibaca), audio/, edit/, file override pekerja lain.

## LARANGAN
- Satu peran = satu gerak di seluruh video: K1 = cincin berputar pelan, K2 = tag masuk bergiliran (`react(i)`), K4 = kata ganti per kata (pop 2–4 f). Tidak ada fade.
- Teks tidak menutupi mata/mulut; cincin melengkung mengikuti kepala (pakai posisi kepala per frame dari matte, bukan konstanta).
- Kontras ≥ 4,5:1 di footage (dinding abu terang): putih di atas dinding terang gagal → beri tag kaca gelap tipis atau bayangan lembut, bukan kotak tebal.
- Warna hanya dari R7-BERSAMA.

## LULUS BILA
1. `npx tsc --noEmit -p .` (di `remotion/`) lulus; `python3 ~/work/skill-development/claude/motion-graphic/scripts/scripts/lego/kt_check.py` tidak berlaku → jalankan `python3 ~/work/skill-development/claude/motion-graphic/scripts/lego/kt_check.py teks.json --w 1920 --h 1080` hanya sebagai info.
2. Rakitan rentang 0–15, 15–23,7, 36–57,7 (`compose.py --rentang`) dan lembar still 2 fps tiap rentang di `qc/r7/ktwajah/` + 6 still resolusi penuh (4,9 / 7,8 / 11,0 / 39,5 / 44,0 / 55,5) berdampingan dengan `83-k1.jpg`/`83-k2.jpg` (`qc/r7/ktwajah/sanding.jpg`).
3. Lapisan ber-matte: still di frame zoom tertinggi tiap slab, tepi rambut menutupi huruf di tempat yang benar.
4. Setiap kata tampil tepat dari onset sampai selesai diucapkan (cek dengan `edit/words.json`, tulis tabel di laporan).
## LAPORAN
`handoff/REPORT-R7-ktwajah.md`: komponen, peta ID → bentuk, path still, hasil cek, hal yang perlu diputus Sutradara.
