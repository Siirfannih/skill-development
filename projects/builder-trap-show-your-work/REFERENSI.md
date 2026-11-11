# Bedah referensi

Bukti: `bedah/ref02_sheet_0[1-4].png` (2 fps), `bedah/ref01_sheet_01.png` (3 fps), transkrip `bedah/*_tr.txt` (faster-whisper small), cut dari `select='gt(scene,0.3)'`.

## Ref 02 · cinematic story (16:9, 24 fps, 46,3 dtk, 28 cut → 1 cut / 1,65 dtk)

| Dtk | Kalimat | Peran | Visual | Cut |
|---|---|---|---|---|
| 0–5,5 | "Every person who's ever built something that looked impossible, they all share one trait." | Hook klaim universal + janji rahasia | Arsip tokoh nyata (Jobs, Musk, LeBron, MrBeast) kecil di kanvas putih, caption kata-per-kata; lalu kata besar IMPOSSIBLE di atas roket | 8 cut dalam 5,7 dtk (0,5–0,7 dtk/cut) |
| 5,7–9 | "It's not talent, it's not money, it's not even luck." | Tiga negasi berirama (ketegangan) | Satu tokoh per negasi, kata kunci merah di belakang/di depan subjek | 1 kalimat = 1 cut |
| 9–16,8 | "They went all in, delusional enough to bet everything on themselves before a single person believed in them." | Jawaban | delusional/bet everything sebagai tipografi besar-kecil; lower third berita asli (CNBC) dibiarkan | ±1,7 dtk/cut |
| 16,8–30,6 | "If you don't know me, my name is Charles ... worked with ... ran ad campaigns ... pop stars" | Kredibilitas / siapa aku | Foto ter-pin di cutting mat (label tulisan tangan "Age 20, full-time creative"), lalu papan gabus + benang merah berisi kartu bukti | Satu pan panjang 10 dtk (melambat) |
| 30,9–36,5 | "But you see, that full-time part almost never happened." | Belokan / taruhan | Foto yang sama berubah merah, sensor mata, grid merah | 2 cut |
| 36,7–44,3 | "And if you stay to watch my story, you'll also learn my greatest lesson ... not from my highest highs or lowest lows, but actually from a grilled cheese." | Open loop + benda spesifik absurd | Footage vlog nyata, glitch VHS "GREATEST LESSON" | ±1 dtk/cut |
| 45–46 | (layar hitam) COMMENT "YT" | CTA | Teks kecil di hitam | — |

Pola yang diambil: (1) hook = klaim yang membuat penonton ingin tahu jawabannya, dibayar dalam 10 dtk; (2) ritme cut cepat di hook lalu melambat di bagian personal; (3) kredibilitas ditunjukkan dengan artefak nyata, bukan diklaim; (4) belokan dengan perubahan warna; (5) open loop ditutup dengan benda konkret; (6) caption kecil putih 1–3 kata di sepertiga bawah.

## Ref 01 · gaya grafis (9:16, 9,7 dtk, 5 cut)

Talking head di latar polos, tipografi merah besar (Hera / CEO / Marketing Agency / Clients) di belakang & depan subjek, kartu foto nyata dan ikon asli (YouTube) yang masuk dengan piksel/halftone merah. Pelajaran: teks layar = kata yang diucapkan, satu kata besar per frasa, aset nyata bukan ikon buatan.

## Raw Irfan (16:9, 59,94 fps, 1:55, audio mono 48 kHz)

Ruang redup, kaos biru, framing medium close-up, wajah ke kamera. Potongan terkuat:
- 1,4–12,3 "Aku terobsesi sama kesempurnaan ... sampai akhirnya aku nggak menjadi siapapun dan aku nggak melangkah jauh ke mana-mana"
- 18,4–39,9 "Memasuki 20-an ... sesuatu yang nggak orang lain punya ... termakan kata-kata motivasi ... nggak mau jadi orang yang FOMO"
- 47,4–55,9 "aku tidak menjual apapun, tidak mempublikasikan apapun, tidak mendokumentasikan apapun"
- 66,5–81,9 "semua orang tuh bisa membangun ... tapi nggak semua orang bisa mempublikasikan ... ngebagiin apa yang belum sempurna"
- 81,9–91,6 "ngebangun itu bikin kita kecanduan ... nggak pernah kita publish dan nggak pernah selesai"
- 95,0–108,9 "sekarang aku memutuskan untuk kembali ke titik awal ... ngeshare apa yang aku alami, apa yang aku buat"
- 108,9–112,9 kalimat terpotong ("Dan itu, aku pikir itu baru…") → tidak dipakai.

## Musik · Aware (Adrián Berenguer), 3:15

Kontur RMS per 5 dtk: intro sunyi 0–30 (−41→−25 dB), naik 30–65, puncak 65–90 (−14), turun 90–115 (−25), naik lagi 115–130, puncak panjang 130–190. Centroid 1,5 kHz (hangat). Bacaan awal: cocok untuk busur pengakuan → sadar → keputusan; drop 90 dtk bisa dipakai untuk momen sadar. Uji `music_fit.py` tetap di gerbang 10.
