# SFX: tiap objek, frame, bagian bersuara

**Tujuan.** Yang bergerak atau muncul terdengar. Penonton merasakan layar "hidup" tanpa sadar ada SFX.

## Bagus itu seperti apa
- 01: ding tiap kunci muncul (0:02–0:05), whoosh di cut ke close-up (catatan Gemini).
- 02: camera shutter saat cut ke close-up, paper rip saat scrapbook muncul (catatan Gemini).
- 04: shutter tiap foto arsip berganti.
- 05: klik/tap di UI asli, ketikan di notes app.

## Cara
- Daftar semua event visual dari storyboard (muncul, mendarat, klik, ganti foto, transisi, angka jalan). Tiap event = satu bunyi.
- Satu peran = satu bunyi yang sama sepanjang video (pop kartu selalu pop yang sama).
- Bunyi sesuai bahan objek: kertas → rip/rustle; foto → shutter; UI → tap; kunci/ikon → ding/pop; transisi → whoosh tipis.
- Waktu: pop 1–2 frame setelah objek jelas; whoosh memuncak di puncak gerak/cut; tidak pernah mendahului objek.
- Kepadatan ikut kategori audio: energi rapat dan punchy; fokus jarang dan lembut (format B: hanya di sisipan grafik).
- Caption biasa tidak berbunyi; kata penekanan boleh.

## Cek cepat
- `scripts/audio/visual_coverage.py` (event visual punya suara ±5 frame) dan `sync_cues.py`.
- Dengar di speaker HP 50 %: tiap bunyi terdengar, tidak ada yang tajam/menusuk (`audio_phone.py`, `sfx_comfort.py`).

## Bebas diputuskan
File SFX mana, karakter (lebih lembut/keras), varian, layering musik vs SFX, momen hening yang disengaja.

## Detail lanjut
`../../references/audio.md` §14.A, §14.3, §14.8, §14.9 · `scripts/audio/README.md`
