# Audit v20 (sebelum revisi v21) — 2 Nov 2026 malam

Bahan: Mac `pks-studio/out/PKS_v20_video1.mp4` (visual = `seg/v11final_v.mp4`), contact sheet 1 fps (`audit21/cs_01..06.jpg`),
still per frasa caption (`audit21/ph_a.jpg`, `ph_b.jpg`), kurva gerak `ears/motion_v11.json` (rata-rata beda frame, jendela 0,5 dtk),
grep kode `remotion/src`.

## (a) Pita/shadow hitam di belakang teks

| Detik | Temuan | Akar | Perbaikan v21 |
|---|---|---|---|
| 0:07,3–0:08,3 | Pita gelap elips di belakang «this time progress was so FAST» | `S00_ColdOpen.tsx` ±200: `radial-gradient(ellipse 900×150 at 960,750, rgba(16,18,22,.85)…)` aktif dari `shrinkAt−0,5`. Perbaikan v11 hanya menyasar text-shadow | Gradien dihapus |
| 0:55–1:01 (Jensen) | Gradien bawah `rgba(0,0,0,.55)` di belakang atribusi | `S03c_MeniruDiri.tsx` ±187 «scrim bawah lembut» | Dihapus |
| semua teks terang | Halo `0 2px 10px rgba(0,0,0,.30)` di `SOFT_SHADOW` | `lib/AnchorWord.tsx` | Halo 10 → 5 px, alfa .30 → .18 |
| 0:29–0:31 | `linear-gradient(… → charcoal)` di 02d | lantai adegan, warna = latar charcoal → tidak terlihat sebagai pita | Dibiarkan (bukan scrim; dicatat) |

Cek otomatis setelah revisi: `grep -rnE "gradient\(.*rgba\((0|1[0-9]|2[0-9]),(0|1[0-9]|2[0-9]),(0|1[0-9]|2[0-9]),0\.[3-9]" src/scenes src/lib` → kosong.

## (b) Jeda / bagian kurang smooth (rawan skip)

Jendela statis (rata-rata beda frame 0,5 dtk < 0,8 selama ≥ 0,8 dtk):
13,6–14,8 (01c piktogram «membangun»), 15,5–16,6 (01d), 28,9–30,0 (02d «kita bisa fokus»), 39,3–40,7 / 41,2–42,2 / 43,6–45,0
(grid checklist → composer 03a), 53,2–54,0 / 54,7–55,5 (03d dua figur), 62,3–63,7 («Nggak Peduli»), 69,0–70,4 (kurva arah janji),
101,2–102,6 / 103,8–105,3 / 106,5–107,7 / 108,9–110,5 (05h–06b gelap), 113,8–115,1 (06d), 117,6–119,3 (06e), 126,6–132,8 (06g penutup, 3,5 dtk diam).
Akar: adegan v11 menahan komposisi setelah aksi selesai, kamera berhenti total; caption satu baris tidak memberi gerak.
Perbaikan: `lib/Breath.tsx` — push-in 2,8 % + geser kecil per jendela (ease in-out, lepas 0,9 dtk), hanya lapisan adegan → teks VO di atasnya
memberi paralaks. Ditambah tipografi kinetik (kata bergerak) di jendela yang sama.

## (c) Objek kaku / terlalu rapi (AI slop)

| Detik | Temuan | Perbaikan v21 |
|---|---|---|
| 1:47–1:51, 1:57–2:06 | Kerumunan piktogram 06a/06b/06e/06f: kepala-badan identik, berbaris sempurna, diam | `_b6_shared.tsx` `useOrganic(seed)`: kepala ±8 %, bahu ±7 %, condong ±2°, napas idle 2,4–4 dtk beda fase |
| 0:31–0:40 | Grid checklist 3×3 identik | **dikunci** (LOCKED.md) — tidak diubah |
| caption | Masuk blur 3 f seragam, lurus | Pegas dengan redaman berbeda per frasa, sudut masuk per kata (seed) |

## (d) Tipografi kinetik VO = subtitle

Temuan dari still per frasa (46 frasa, 3,7–127,8 dtk):
- semua frasa satu baris Geist 500 62 px, rata tengah, y ≈ 800 (pita subtitle), apa pun adegannya;
- menimpa objek: 8 (dock), 13 (kalender), 15 (kartu), 17 (composer), 38–39 (piktogram), 40–41 (figur), 45 (figur tunggal);
- satu cara masuk (blur 3 f) dan satu cara keluar (hilang) di semua frasa;
- tidak ada hierarki kata / perpindahan kata; tinta tunggal (kontras putih di langit/kartu terang bergantung shadow).
Akar: CaptionTrack dibuat untuk memenuhi cakupan kata (feedback 14.18), bukan sebagai kinetic.
Perbaikan: `lib/KineticVO.tsx` — komposisi per frasa (posisi di ruang kosong/menempel objek, 1–3 baris line/stair/column/drop),
kata baru lahir di ujung baris lalu baris bergeser bersama (pegas), blok naik saat baris baru lahir, kata kunci (redup sisanya / kotak sorot
elektrik / baris besar), enter mask·rise·blur·type dan exit rise·blur·wipe·sink dirotasi (≤ 2× sama berturut-turut), chip padat gelap/terang
untuk latar foto/UI ramai (layering, bukan gradien), frasa berikutnya di tempat sama menunggu yang lama keluar, keluar tidak menyeberang cut.

## (e) Temuan lain

- Frasa 0 «16-year-old» (f111) dan 21 «you're» (f1678) tampil 1–2 frame sebelum SpeakerWords menimpanya (kedip). v21: tidak ditampilkan.
- Frasa 33 «dan» hanya 4 frame. v21: tidak ditampilkan.
- Audio v20 tetap: earshot sinkron 94 % ≤ 100 ms, median 15 ms, tidak ada label kasar (LISTEN.md). Revisi v21 tidak menggeser penanda
  SFX (KineticVO tidak berbunyi, Breath tidak memancarkan penanda) → master v20 dipakai ulang; diverifikasi dengan membandingkan `.sfx` render v21 dengan `v11final.sfx`.
