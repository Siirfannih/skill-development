# 33 · Island enterprise agent control explainer

> **Status: standar kualitas Irfan.** Video ini target yang harus dicapai, bukan contoh opsional.
> Sumber: "Island enterprise agent control explainer", https://www.instagram.com/p/Dbn1uwLOphN/ (file Irfan "IG Dbn1uwLOphN") · 16:9 (1276×720, 25 fps), 103,1 dtk, ber-VO · analisis asal: canvas-skill-library, reference_id Dbn1uwLOphN · Frame: `../../guide/referensi/sheets/33-island-agent-control.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/33-k*.jpg` · Bedah lengkap: `canvas-skill-library: skills/canvas-reference-director/references/cards.json (reference_id Dbn1uwLOphN)`; data ukur: `ukuran.md`
> Catatan silang: `GrokAgent/reference-videos/AUDIT-2NOV-B-kinetic.md` membedah video Island LAIN (pengumuman pendanaan, 21,1 dtk). Angka di kartu ini semua dari video 103 dtk ini.
> Kedalaman bedah: **dalam**

**DNA (satu kalimat):** Masalah "agen di mana-mana" digambar sebagai titik hitam di bidang off-white yang terus berubah bentuk tanpa cut selama 27 dtk, lalu "Well… there is" membuka lanskap hijau berbingkai tempat UI kaca produk melayang, ditutup grotesk + serif italic mint di hijau nyaris hitam.
**Cocok untuk:** explainer produk B2B/keamanan/AI agent, masalah abstrak → demo kontrol, launch SaaS · **Tidak cocok untuk:** talking head, konten personal, gaya energik/meme
**Kata kunci gaya:** korporat tenang, off-white, titik hitam, lanskap hijau, UI kaca, serif italic
**Diambil untuk:** "IG Dbn1uwLOphN": nama tidak menyebut bagian; lihat bagian terkuat (motion graphic titik → UI dan sistem dua dunia off-white/lanskap; teks kata raksasa vs kalimat kecil).

## PENGIKAT (diambil utuh dari SATU kiblat; ini yang membuat video terasa satu keluarga)

### 1. Warna & tekstur
- Dunia masalah (0–34 dtk): latar off-white `#F0EBE8` rata, tanpa grain/vignette; tinta titik/teks `#393436` (bukan hitam murni); abu bayangan angka `#797476`; satu aksen merah lembut `#E08487` (label "Skipped", ikon tool merah muda).
- Kata pembuka bergradien pastel horizontal: lavender `#BCABD8` → hijau `#83BD9E`; satu-satunya gradien di video.
- Dunia produk (34–92 dtk): foto lanskap hijau (langit `#8BADC1`, rumput `#345237`) dalam kartu bersudut bulat dengan bingkai off-white ±2–3 %; panel gelap `#051414`; toggle/kartu mint `#8FDDBE`/`#C6EBE3`; adegan "tool call" berlatar lanskap senja oranye; jendela chat `#232024`.
- Penutup: hijau nyaris hitam `#051414` rata, teks mint `#A7EFD4` atau putih `#EDF8F3`.
- Tekstur: tidak ada grain. Kedalaman dibuat oleh blur (DOF titik, lanskap buram di belakang UI kaca) dan bayangan lembut, bukan noise.

### 2. Teks
- Font: grotesk neo Regular (paling mirip Suisse Int'l / Inter Display), tanpa bold; penekanan memakai serif kontras tinggi italic (mirip Instrument Serif Italic): "*Control Plane*", "*enterprise work*", "*done*".
- Dua skala ekstrem, tanpa ukuran perantara: kata raksasa "Agents" x-height 34,7 %, kapital ±46,5 % tinggi, melebihi lebar frame, baseline di y 94 %, huruf "g" terpotong tepi bawah. Kalimat narasi kecil di tengah: x-height ±3,6 % (kapital ±5 %), lebar 54–67 %.
- Angka biaya "-$0.42" tinggi ±32 % (dengan $), terpotong tepi kanan, menumpuk dengan angka sebelumnya yang memudar ke abu; label agen "Delegating.." 4,2 % di kiri. Rasio angka : label ±7.
- UI judul "Onboarding" 10,1 % dengan label "Getting Started" 2,1 % (rasio ±5); kolom "1/2/3" + pil "✕ Skipped".
- Judul merek di lanskap: 2 baris, kapital 8,9 %, blok 56–60 % lebar, pusat (50 %, 50 %), putih di atas langit, satu frasa serif italic.
- Penutup: satu frasa dalam pil bergaris tipis (56×17 % frame) + kotak centang; atau 2 baris tengah (blok 64,5 % lebar, 20 % tinggi) dengan frasa italic.
- Masuk: per kata (kalimat "Except / your / agent / are / people" tersebar acak lalu merapat jadi satu baris kecil, sheet 0:08→0:09), per kata berwarna ("So your *agents* / Approving / Automating" berganti di slot yang sama, 1:32–1:34), daftar 3 kata kecil "Let's / talk / about" lalu kata raksasa. Keluar: kata raksasa menyusut menjadi satu titik.
- Satu tampil: 1 kata raksasa, atau 3–7 kata kalimat kecil.

### 3. Ritme
- 26–30 cut (pace_read 15,1/menit; ffmpeg scene 0,25: 17,5/menit), shot median 2,5–2,7 dtk, event visual 35/menit.
- Lambat: 6,8–33,9 dtk satu shot 27 dtk tanpa cut; semua perubahan lewat morph titik. Cepat: 54–66 dtk dan 88–99 dtk (shot 1,4–2,3 dtk).
- Struktur: masalah (0–34) → pertanyaan "But what if there was a way to make sure your agents worked on your terms?" → "Well… there is." → merek (34–38) → 5 demo kontrol (38–92) → slogan + logo (92–103).

## TEKNIK (boleh dipinjam referensi lain; selalu dikenakan pengikat kiblat)

### 4. B-roll / footage
- Tanpa footage orang. Foto lanskap (pohon cemara, bukit, sungai, hutan pinus, senja) dipakai sebagai latar 100 % adegan produk, selalu di kartu bersudut bulat dengan bingkai off-white.
- Lanskap tidak menggambarkan ucapan; ia penanda "dunia yang terkendali". Di belakang UI dibuat sangat buram (Laplacian var 2–7 vs 75 pada lanskap tajam).

### 5. Motion graphic
- Agen = titik bulat hitam; agen tak aktif = lingkaran garis. Medan 381 titik kecil = "They're everywhere"; titik berbaris di jalur putus-putus = alur kerja; titik melewati ikon merah = tool yang disentuh; titik menabrak kartu "Training" = melewati pelatihan.
- Masalah biaya = angka negatif raksasa yang terus berganti (-$2.24 → -$1.18 → -$0.42 → -$1,68 → -$782).
- Produk = UI nyata yang diperbesar: diagram cincin produk, tabel "AI Skills"/"MCP Servers", label CRITICAL/MEDIUM/LOW, kartu GitHub/Salesforce/HomeOps + panel "Identity Gateway" dengan toggle, chat "How can I help you, Sarah?", popup "Tool Call Protected", tabel "AI Model Usage & Cost", donut insight.
- Kursor + label nama ("Sarah", "Admin") menjadi aktor di UI.
- **Skala subjek:** dua mode. Masalah: banyak objek kecil (titik 4,3 % tinggi di medan) atau 7–10 titik besar 13,6 % (sampai ±20 % untuk titik depan). Produk: SATU panel besar 60–100 % frame, sering terpotong tepi (tabel, kartu tool); diagram cincin ±51 % lebar × 91 % tinggi.
- **Kedalaman:** 3 lapis. Adegan titik: titik tajam di tengah, titik buram (DOF) di depan/belakang dengan tinta lebih pucat `#514C4A`. Adegan produk: lanskap buram → panel kaca beku dengan bayangan lembut → kursor/label tajam di depan. Judul merek: lanskap tajam + orb kaca kecil + teks.

### 6. Kamera & transisi
- Kamera virtual (cv2, per shot): umumnya diam (skala 0,98–1,03). Push 12 % pada diagram cincin (37,7–41,8), push 15 % pada popup (72,8–76,6), scroll vertikal 19 % (76,6–78,8), pan lateral 50 % menyusuri kolom tabel biaya (84,0–88,6) dan 25 % (90,2–91,8). Shot titik 6,8–33,9: tarik keluar ±26 % + turun 14 %.
- Transisi: morph objek (medan titik → jalur, kata raksasa → titik), hard cut ke kartu lanskap, kartu UI masuk dari kanan, zoom-in ke label. Pemicu: kata VO (mis. "Well…" → lanskap).

### 7. SFX
- earshot: 689 onset (6,7/dtk); tag: 37 UI pop/klik, 13 whoosh, 10 not glockenspiel, 5 hit, 3 riser, 2 tuts (tag = petunjuk).
- Pop/klik pada tiap titik/kata yang muncul (aksen terkuat +44 dB di 0:00,47); klik toggle +34 dB (1:01,5); ding/glockenspiel pada reveal merek (+39 dB, 0:34,2); whoosh pada geser panel; riser sebelum adegan chat (1:00,4).
- 91 % cut punya onset dalam 100 ms (median 38 ms).
- Musik berhenti sesaat 0,3–0,6 dtk di 2,4 / 5,3 / 7,35 / 9,95 / 61,15 dtk untuk memberi tekanan.

### 8. Musik
- Pembuka mirip tech house tipis (0–14 dtk), lalu corporate inspiratif dengan pizzicato strings dan glockenspiel; ±122–123 bpm (librosa 123, earshot 122), pulsa lemah (clarity 0,16). Nada dominan A, G, G#.
- Mix −14,3 LUFS, true peak +0,2 dBTP (klip), LRA 4,5 LU; blok 8 dtk −21…−17 dB RMS, ekor −24,8.
- Level musik terhadap VO: Tidak terukur: tanpa pemisahan stem.

## Proporsi terukur (11 Nov 2026, dari video sumber 1276×720; % terhadap frame)
Rinci: `ukuran.md`. Frame kunci: `keyframes/33-k1…k8-*.jpg`.

| Jenis adegan | Kata kunci (% tinggi) | Kata sambung | Posisi teks | Skala subjek | Kedalaman |
|---|---|---|---|---|---|
| Kata raksasa (k1) | x-height 34,7, kapital ±46,5 | daftar 3 kata kecil, Tidak terukur (fade) | baseline y 94 %, melebihi lebar, terpotong | kata = subjek | 1 lapis, off-white rata |
| Medan titik (k2) | kalimat 2–3 kata kecil ±4 | — | di celah medan, kiri-tengah | 381 titik, Ø 4,3 % | 1 lapis |
| Titik + UI garis (k3) | "Onboarding" 10,1 | 2,1 (rasio ±5) | kiri bawah, di bawah jalur titik | titik Ø 13,6 %; panel UI 50 % bawah | titik tajam + titik buram DOF |
| Angka biaya (k4) | "-$0.42" ±32 | label 4,2 (rasio ±7) | angka kanan terpotong; label kiri, y 51 % | angka 44 % lebar | angka lama memudar abu di belakang |
| Kalimat tengah (sheet 0:09, 0:30) | x-height 3,6 / kapital ±5 | satu ukuran | tengah (50 %, 50 %), lebar 54–67 % | tanpa subjek | off-white rata |
| Judul lanskap (k5) | kapital 8,9 (italic serif pada frasa) | sama ukuran | tengah (50 %, 50 %), 56–60 % lebar | kartu foto 96×94 % | foto tajam + orb kaca |
| UI kaca + panel gelap (k6) | judul panel 4,6; judul tabel 6,1 | isi 3,2–5,7 | kiri-atas tiap panel | kartu kiri 63 % lebar, panel gelap 31 %, tinggi 93 % | lanskap buram → kaca → kursor |
| Penutup hijau tua (k8) | 't' 8,3, baris 10,4 | sama ukuran | tengah, pil 56×17 % | tanpa subjek | 1 lapis rata |

- Rasio kata kunci : kata kecil **5–7** di adegan masalah; di adegan produk teks UI 3–6 % karena UI diperbesar.
- Batas: font tidak teridentifikasi pasti; ukuran ±1 px (0,14 %); kata yang sedang memudar dapat terukur lebih kecil.

## Cek kemiripan (dipakai juri saat menyandingkan still)
- Adegan masalah: latar off-white `#F0EBE8` rata, tinta `#393436` (bukan hitam murni), tanpa grain; aksen merah lembut hanya untuk "gagal/dilewati".
- Kata pembuka: satu kata x-height 30–40 % tinggi, melebar melewati tepi kiri-kanan, baseline di 10 % bawah, gradien lavender → hijau.
- Kalimat narasi kecil (kapital ±5 %) di tengah; tidak ada ukuran perantara antara kalimat kecil dan kata/angka raksasa (rasio ≥ 5).
- Agen selalu titik hitam/lingkaran garis yang sama; titik besar 13–20 % tinggi dengan titik buram DOF di lapisan lain.
- Adegan produk: UI di atas foto lanskap hijau yang buram, dalam kartu bersudut bulat dengan bingkai off-white 2–3 %.
- UI tampil besar (panel 60–100 % frame, boleh terpotong), dengan kursor + label nama sebagai pelaku.
- Panel gelap `#051414` dengan aksen mint `#8FDDBE`/`#A7EFD4`; tidak ada biru atau ungu di dunia produk.
- Penekanan teks = serif italic pada satu frasa, bukan bold atau warna terang.
- Penutup: bidang `#051414` rata, teks tengah, tanpa elemen lain kecuali pil/logo.

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
