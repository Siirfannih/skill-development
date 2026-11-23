# Format Terkunci: router

Satu video = satu format. Sesi produksi rutin memuat `../MOTION-CORE.md` + satu file di folder ini, tidak lebih.

| Slug (isi `projects/<proyek>/FORMAT`) | Untuk | File |
|---|---|---|
| `story-doc-16x9` | Esai dokumenter ber-VO di atas footage dan foto arsip, 16:9, 60–100 dtk; narator tidak tampil | `story-doc-16x9.md` |
| `journey-talkinghead` | Cerita pribadi dengan pembicara di depan kamera (talking head), diselingi dunia visual buatan, 16:9 | `journey-talkinghead.md` |

## Cara memilih

1. Ada pembicara yang direkam kamera dan ia tokoh ceritanya → `journey-talkinghead`.
2. Cerita dibawakan narator di atas arsip (foto, klip, tangkapan layar) → `story-doc-16x9`.
3. Tidak cocok dengan keduanya → bukan sesi produksi rutin. Pakai rute gaya baru di `../SKILL.md` (kiblat + racikan kartu `cookbook/`), dan usulkan format baru setelah videonya disetujui.

## Aturan router

- Tulis slug di `projects/<proyek>/FORMAT` sebelum beat sheet diisi. `scripts/juri/render.sh final` menolak slug yang tidak ada di tabel ini.
- Format tidak dicampur dalam satu video, dan tidak diganti di tengah produksi tanpa keputusan user yang dicatat di `DECISIONS.md`.
- Kartu `cookbook/` tidak diracik bebas di sesi produksi rutin. Bentuk adegan yang boleh dipakai adalah kolom "Jenis adegan" di Format Bible; bentuk lain diajukan ke user dulu.
- Nilai merek (warna, huruf, logo) tetap dari profil merek (`BRAND.md`, `EDITING.md`); Format Bible mengatur struktur, ritme, dan gerbang.
- Format baru masuk folder ini hanya setelah satu video dengan gaya itu disetujui user dan mesin serta gerbangnya ada; isinya: kapan dipakai, jenis adegan, aturan teks dan bunyi, skema Beat Sheet, gerbang.
