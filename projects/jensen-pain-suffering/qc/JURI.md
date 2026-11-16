# JURI jensen-pain-suffering · r9 · 16 Nov 2026

Bahan: 28 still `qc/stills/` (frame di `handoff/stills.txt`, dirender dari kode r9), `qc/sanding.jpg` (still vs sheet kartu 55), `qc/draft.mp4` (1428 frame dari `render.sh frames`), audit frame `qc/frame_audit/` (5 potongan, Gemini + ChatGPT), `qc/balance.log`, `qc/teks_cek.log`, `audio/ORDER.json`.

## Cek kemiripan kartu 55 (pengikat dicampur brand Behindwork, D-002)
| Butir kartu | Putusan | Bukti |
|---|---|---|
| ≥ 4 material visual per babak, ganti grade tiap babak | YA | Stanford hangat (B01) → bingkai foto putih (B02) → cetakan arsip di meja gelap (B04) → monokrom + kartu SUFFERING (B05) → NVIDIA/keyboard gelap (B06–B07) → tempa/api oranye (B08) → kartu hitam (B12) |
| Teks kinetik di arsip/stok: kata kunci sama tinggi, aksen satu warna, di tengah | YA (amber #E8A33D menggantikan merah, D-002) | B06a "pain", B07a "this is gonna cause", B09a "is not"; R-001 |
| Teks tumpuk di samping subjek (rasio 2–2,5) | YA, diubah jadi rata-lebar | B01b/B01c "HIGH/EXPECTATIONS", "LOW/RESILIENCE" |
| Caption narasi 1–2 kata, bukan blok kalimat | YA | 66 tampil 1–3 kata (D-013 pengecualian 4 kata pendek) |
| Foto fisik di latar bertekstur + bayangan | YA | B04a–c cetakan arsip 60 Minutes, bayangan, vignette |
| Vignette jelas di adegan fisik | YA | B04, B05 |
| Kartu judul satu kata ±50 % tinggi, objek jadi bagian huruf | SEBAGIAN: ±20 % tinggi (Poppins Bold 1 baris maks 82 % lebar, Q3) | B05b "SUFFERING" berisi percikan api |
| Twist dengan grade monokrom + musik berganti, lalu penutup | YA | B05 monokrom @15,27 + cut kontras + track 2 (Victory) masuk; D-011 |
| Teks di belakang kepala subjek | TIDAK (tanpa matte di Linux) | diterima: teks menempel subjek di samping kepala |

## Lantai
- A1 semua ucapan tampil: 66 tampil = semua kata kecuali gagap/salah ulang ("with, with", "to,", "the word,", "the,", "it's" 33,67) — D-005, D-018.
- A2 teks menempel subjek / jarak kepala ≥ 4 %: r6–r9 jangkar kepala per frame (`remotion/src/data/head.json`); audit c01–c05 tidak menandai teks menempel kepala.
- A4 1–3 kata, blok seimbang, tumpuk rata-lebar: rasio baris tumpuk 1,00 (REPORT-r2); B12 rata tengah dua baris rata-lebar (R-001).
- A7 kontras: scrim lembut tanpa tepi B5/B8a (r7), bayangan/glow teks (r5). A9 tanpa kotak: artefak kotak `will-change` dihapus r7.
- A8 urutan & waktu baca: silang 3 f, tidak ada frame tanpa teks di tengah kalimat (audit r8–r9); frasa ≤ 0,5 dtk mendahului diterima (D-016).
- B10–B13 kamera: tiap shot > 2 dtk push/pan; punch-in B3 + flash; jump cut sumber ditutup dengan memajukan cut (f271, f709, f813; D-018) dan reframe f10 (r9).
- C14–C18: satu fokus per momen; b-roll stok teks di tengah (R-001, R-002, R-003). 
- D19–D22: visual harfiah (wisuda, arsip Jensen muda, stres, NVIDIA, keyboard, tempa, PCB, siluet); yang bicara tampil di talking head; tanpa placeholder.
- E23 suara: `cut_check` sisa 7 jeda retoris diterima (D-006); E24 SFX 15 cue 0,32/dtk `sfx_density` PASS, 11–12/15 terdengar di HP (sisanya klik detail); E25 musik 2 track per babak (D-010, D-011).
- F26 urutan render: still → frames/draft → final; F29 juri ini.

## Catatan Irfan & keputusan aktif (DECISIONS.md)
- D-001 16:9 1920×1080: komposisi `Main` 1920×1080 30 fps.
- D-002 kartu 55 campur brand: Poppins + #0E0D0C/#F4F1EA/amber (still B01–B12).
- D-003 tanpa logo: B12 kartu hitam tanpa logo/wordmark (still B12a/b, audit c05).
- D-004 musik & SFX internet: Freesound (`sfx/internet/SOURCES.txt`), YouTube (`musik/kandidat/SOURCES.txt`).
- D-005 / D-006 potongan suara: `audio/suara.wav` 46,1 dtk, ORDER.json suara terkunci.
- D-007 backsound dinamis: level per babak hook −5 / personal −13 / naik −8 / puncak −2 dB di bawah suara (`audio/tools/mix.py`).
- D-008 b-roll landscape: forge_5846379, wisuda dalam bingkai (B02).
- D-009 / D-010 profil musik `sinematik-emosional` (main dfcf7dc), dipakai memilih yt06 + yt04.
- D-011 2 track: Max Richter "On the Nature of Daylight" @151 → Two Steps From Hell "Victory" @202, ganti di 15,27 dtk.
- D-012 Lantai A2/A4/A9 baru: lihat bagian Lantai.
- R-001 b-roll stok = latar, teks tengah/besar/per kata; variasi modus: B02, B06a, B07a, B08b, B09a tengah; modus kata/skala/25d/tumpuk/tenang (REPORT-r2).
- R-002 B5 tengah + "setbacks" raksasa: still B05a.
- R-003 audit semua shot per jenis footage: tabel di DECISIONS; B8b tengah.
- R-004 lapisan film + glow, takaran per jenis footage: `engine/Film.tsx`, `qc/sanding_film.jpg`.
- D-013 pengecualian 4 kata pendek: T15, T22, T34, T63, T65.
- D-014 / D-015 / D-016 / D-018 audit frame r5–r8: semua temuan ditutup (TASK-r6 … r9); putusan per potongan di `qc/frame_audit/*/VERDICT.md`.
- D-017 render: GPU tidak mempercepat, konkurensi 4.

## Audit frame per frame (tanpa sampling)
c01 LULUS (Gemini + GPT, r9) · c02 LULUS (diputus: whoosh geser cetakan) · c03 LULUS (keduanya) · c04 LULUS (diputus: "it's" salah ulang) · c05 LULUS (diputus: frasa ≤ 0,5 dtk). Kode B2–B12 tidak berubah sejak putusan c02–c05 (r9 hanya B1).

## Gate mekanis
teks_cek: TIDAK ADA TANDA (28 still) · audio_order check PASS · sfx_density PASS · mix −14,5 LUFS, true peak −1,4 dBTP · voice_fidelity PASS.

KESEIMBANGAN: 8 still FAIL balance_check (B01c, B04c, B05a, B06a, B07a, B07b, B08b, B09a) dinilai mata lolos — 7 tertangkap di tengah frasa yang dibangun per kata (kata pertama duduk di posisi akhir baris rata tengah: "plenty of", "pain", "this is gonna cause", "in a", "the", "is not"), B04c saat kamera bergeser antar-cetakan, B01c kepala kiri diimbangi "LOW RESILIENCE" kanan; teks tengah di b-roll stok adalah arahan Irfan (R-001).

PUTUSAN: LULUS
