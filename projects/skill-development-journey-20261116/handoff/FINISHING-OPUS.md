# FINISHING-OPUS · Henti 1 (Opus, 16 Nov) — dasar r1 (`henti1/sanding.jpg`), RESEP §6 + §7
**Kiblat mode C = kartu 28 "Cursor & Desktop".** DNA-nya "satu tokoh (kursor biru 3D) menjahit adegan, kamera push/pull mengikutinya" = perjalanan satu subjek yang diminta Irfan. Kanvas putih hangat `#F1F2EA` + grid titik + satu aksen biru serumpun arti warna §4.2 (biru = solusi). Kartu 30 ditolak: inti gradien pink-oranye bertabrakan dengan coral = negatif, dan bahasanya kolase/hero kata, bukan perjalanan. Kiblat 28 hanya dipakai di B3-C (±10 dtk tanpa wajah); mode A tetap 83.

## B3-C · cerita "workflow" (33,0–42,8 dtk, 294 f) — subjek: SATU klip (frame wajah B3)
| f | ucapan | subjek & aksi | kamera | objek (label = nama repo) |
|---|---|---|---|---|
| 0–26 | "aku ngebalik" | wajah B3-A menyusut jadi kartu klip (morph zoom-out, 28-k6) | pull 2,4→1,0 `heavy` | klip + tab `BRIEF` |
| 26–100 | "gimana caranya" | kursor biru datang; di rak kiblat `28`,`30` buram, `83 · talking head` maju tajam, benang biru ke klip; tab → `kiblat 83` | truck 1500 px, push 1,06 | still **C1** f104 |
| 100–170 | "biar AI ini" | simpang dua jalan; kursor klik `Mode A · wajah` (biru), `Mode B · visual` memudar mundur; jalan A menyala; tab → `Mode A` | truck, 0,95 | still **C2** f160 |
| 170–235 | "mempelajari" | klip ke `juri`: sapuan cahaya → centang hijau, tab `LULUS`; kartu `DECISIONS.md` mengetik "bila…, pilih…, karena…" | push 1,08 | — |
| 235–294 | "workflow-nya" | pull-out: seluruh jejak (BRIEF → pustaka → Mode A → juri → DECISIONS.md) dirangkai titik cahaya; **workflow** besar, kursor kanan-atas (rima 28-k1) | pull 1,08→0,33 lalu diam | still **C3** f288 |
Teks besar hanya "workflow" (diucapkan). Tanpa tabel, ubin fase, bentuk Baikov. Jejak titik = gaya Effort yang dipinjam (bermakna: jalan yang dilalui). Masuk = morph wajah→klip; keluar = cut keras ke B4.

## Per panel: masalah → perbaikan
- **B1b** (dasar r1 cincin): kata cincin kecil, maskot kecil, bunga menutupi "decision", `>_` tak terbaca. → cincin Poppins 800 146–160 px di busur lebar sekeliling kepala ("model" lewat di belakang rambut via matte); maskot 240–330 px: crab kiri-bawah depan, bunga kanan-bawah, Gemini kanan-atas; tak ada kata tertutup. Material: lingkungan studio prosedural (RoomEnvironment, tanpa raster), satin + rim light jendela, tepi crab dibulatkan, Gemini lebih tebal dengan bevel lembut, highlight bunga dipersempit ke kiri-atas, `>_` putih emisif lebih tebal dan garis bawah di baseline.
- **B2, B4**: tetap (kode r1 identik).
- **B3-A**: tag dicoret dihapus. UI Claude Code gelap di kiri wajah: kolom prompt, ketik "/" → menu `/storytelling` `/apple-style` `/cinematic` (deskripsi "template") muncul (still A1 f44) → isi menu larut, jendela menyusut, "/" tidak memanggil apa-apa (still A2 f100).
- **B3-C**: lihat tabel. Kartu Effort dihapus dari papan dan kode (`EffortScene.tsx` dihapus).
- **B5**: komposisi r1 (dua jendela Claude Code & ChatGPT, crab + bunga `>_`, amplop, pil loop + centang) tanpa judul dan tanpa garis biru. Pesan pop berurutan: Codex "doctor.sh gagal… Boleh menjalankan --fix?" (f6) → amplop → Claude 2 "Sudah kujalankan doctor --fix…" (f50) → amplop → Codex "Revisi kamera selesai…" (f98) → loop (f112). Tokoh squash saat kirim/terima. Ikon Codex 2D dibirukan sesuai ikon asli `#5E71F6`, crab `#F15B45` dari acuan.
- **B6**: tag → dua bubble chat putih (pop + indikator mengetik), slab tetap.
- Gerak: semua `move/arc/react` dari `curves.ts`; raster hanya footage/matte; font mono JetBrains disalin dari `claude/motion-graphic/fonts`.

## Belum / catatan
- "Claude Max" di kartu B4 = nama paket asli; VO menyebut "Claude Pro yang 5 kali" (tidak diubah, B4 dikunci).
- B3-C3 jejak kecil (zoom 0,33): label "pustaka/juri" ±30 px; kata utama "workflow" yang membawa makna.
- Gerak hanya diperiksa lewat still; belum ada render video.

## Ronde 2 · karakter 2D gaya ClaudeAnimationBase (keputusan Irfan, G2 Sutradara)
- `remotion/src/papan/karakter2d/`: `gerak.ts` (port clawd-motion, EASE → CURVE), `Karakter2D.tsx` (Clawd/Codex/Gemini: SVG + filter kuas prosedural, garis tinta bergetar 12 gbr/dtk, 5 sudut kunci + smear, kedip 3,67 dtk, emosi via `emotions()`), `LembarKarakter.tsx`, `LICENSE-ClaudeAnimationBase` (MIT, atribusi di header).
- Codex/Gemini: bahasa gambar sama (wash, tinta, mata kecil); `>_` dicerminkan balik saat tokoh menghadap kiri supaya tetap `>_`.
- B1b: masuk tepat di nama (ChatGPT 0 dtk, Claude 0,75, Gemini 1,25: pop backOut + take), menoleh ke Irfan di "decision" (turn + smear); bayangan lembut ke dinding + gradien cahaya kamar. B5: crab & bunga 2D, kirim = lompat ber-antisipasi, terima = take.
- B3-C3: titik jejak 2×, label 132 px dunia (±43 px layar) + label `Mode A`. B3-A: panel turun ke kiri-tengah.
