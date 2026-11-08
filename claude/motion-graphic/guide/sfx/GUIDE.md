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
- Jumlah = jumlah event (aturan 43); kategori audio hanya mengatur karakter: energi punchy, fokus lembut. Berlaku juga di klip podcast.
- Kata kinetik berbunyi per kata (klik mouse); subtitle berbunyi satu kali per frasa (1 pesan = 1 bunyi).

## Cek cepat
- `scripts/gate/sfx_density.py` (kepadatan ≥ 1,5/dtk, cakupan ≥ 85 %, celah senyap ≤ 3 dtk), `visual_coverage.py`, `sync_cues.py`.
- Dengar tiap file dengan `earshot describe` sebelum masuk mix (gerbang DENGAR, `three-segment-gate.md`).
- Dengar di speaker HP 50 %: tiap bunyi terdengar, tidak ada yang tajam/menusuk (`audio_phone.py`, `sfx_comfort.py`).

## Bebas diputuskan
File SFX mana, karakter (lebih lembut/keras), varian, layering musik vs SFX, momen hening yang disengaja.

## Detail lanjut
`../../references/audio.md` §14.A, §14.3, §14.8, §14.9 · `scripts/audio/README.md`
