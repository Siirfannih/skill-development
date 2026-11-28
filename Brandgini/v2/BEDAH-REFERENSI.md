# Bedah referensi: verifikasi klaim v1

Dikerjakan 25 Nov 2026 di PC (`node-c-pc`, ffmpeg 6.1.1). Bukti: contact sheet 1 fps bertimestamp dan potongan 10 fps di `../analisis/` (`*_sheet_*.jpg`, `detail/editing_trans_e*.jpg`, `detail/editing_full_*.jpg`), deteksi adegan (`*_scene_0.3.txt` = cut, `*_scene_0.12.txt` = perubahan), dan analisis suara `edubizz_suara.txt`. Skrip: `~/work/soalnya-gini-studio/analisis/skrip/` di PC.

Tanda: ✅ terbukti · ⚠️ sebagian / perlu koreksi · ❌ tidak terlihat atau salah · ❔ tidak bisa dicek dengan cara ini.

## 0. Berkas dan duplikat

| Berkas | Durasi · ukuran | Catatan |
|---|---|---|
| `editing.mp4` | 51,7 dtk · 716x1274 · 30 fps | **Identik (md5 `ec9b3dea…`) dengan `~/work/pustaka-video/unggahan/95-rt2rj.mp4`.** skill-development sudah membedahnya sebagai kartu cookbook **95 Cutout-Collage Metaphor**. v2 memanggil kartu 95, tidak menulis ulang. |
| `vox.mp4` | 39,8 dtk · 720x1280 | **Bukan Vox Media.** Detik 38–39 berakhir dengan bilah cari "EarnEdits.com": video promosi penjual template editing. |
| `vox2.mp4` | 42,7 dtk · 720x1280 | **Bukan Vox Media.** Detik 39–42: label "Ae AEP" + "EarnEdits.com". |
| `edubizz-1.mp4` | 72,1 dtk · 716x1274 | Identik dengan `riset/referensi-animasi/threads/edubizz-1.mp4`. |
| `riset/…/edubizz-2.mp4` | 14,8 dtk · 1280x720 | Potongan narasi yang sama dengan edubizz-1 ±15–30 dtk. |

## 1. Style A (`editing.mp4`) vs v1 `skills/04-style-a-einstein-editorial`

| Klaim v1 (baris) | Status | Bukti |
|---|---|---|
| Kanvas radial terang di tengah → periwinkle/indigo di tepi (L10) | ✅ | semua frame, mis. 4,3 dtk (`detail/editing_full_4.3.jpg`). Catatan: ini gradien biru-ungu yang dilarang plan §2.3 dan anti-slop §1, dan tepi lebih gelap di latar terang = S-V18. |
| Tekstur halftone/mesh (L11) | ⚠️ | Yang terlihat di 4,3 dan 35,8 dtk adalah **jaring kotak halus**, bukan titik halftone. |
| Cutout monokrom/duotone + bayangan lembut (L14) | ⚠️ | Foto orang B&W + bayangan: ✅ (4,3; 18,8 dtk). Benda **diwarnai ke palet**: bohlam lavender (35,8 dtk), mobil biru (21–23 dtk). |
| Panah orbit putih putus-putus (L16) | ✅ | 4,3 dtk (elips putus-putus melingkari tangan), 24–25 dtk, 41–46 dtk. |
| Aksen piksel retro, grid-sparkle berkedip (L17) | ✅ | kursor piksel 18–20 dtk; kotak piksel larut di atas mobil 21,3–21,7 dtk; "E=MC²" huruf piksel berapi 4,7–6 dtk. |
| Metaphor swap + scale punch 0,92→1,04→1,0 (L18) | ❌ | Tidak terlihat punch. Yang terlihat: **potong keras di kanvas yang sama** lalu benda baru datang (mobil masuk kecil dari atas, 21,0–21,3 dtk; `editing_trans_e4.jpg`). Karena kanvas tidak berubah, detektor adegan mencatat **0 cut > 0,3** walau komposisi berganti ±14 kali (4,7 · 7 · 9,4 · 14 · 15 · 16 · 21 · 24 · 27 · 31 · 32 · 37 · 39 · 47 dtk). |
| Kata sambung **Instrument Serif Italic** atau Jakarta Light Italic, 36–44 px (L23) | ❌ untuk serif · ⚠️ ukuran | Kata sambung ("was losing / a war against" 4,3 dtk; "When the", "replaces the", "you get" 35,8 dtk; "A state / we are" 18,8 dtk) adalah **sans condensed tipis miring, bukan serif**. Tinggi ±2,2 % tinggi frame ≈ 42 px @1080 lebar: di bawah Lantai A7 (≥ 56 px). |
| Kata kunci ALL-CAPS condensed tebal 88–130 px (L24) | ✅ | "ALBERT EINSTEIN GRAVITY" 4,3 dtk ≈ 4,9 % tinggi ≈ 94 px. Ada gaya ketiga yang tidak dicatat v1: **caps tebal miring** untuk penekanan ("FLOW STATE" 16–20 dtk, "CREATIVE INFLATION" 35–36 dtk). |
| Teks muncul mengikuti words.json (L25) | ⚠️ | Benar, dan caranya **diketik per huruf** ("EQUATI→EQUATIONS" 4,7–5,0 dtk; "VIO→VIOLIN" 8,8–9,1 dtk; "THI→THINK" 21,1–21,3 dtk). v1 tidak mencatat ini. |
| Kata sambung membungkus subjek, sebaris dengan kata kunci (L25) | ✅ | "EINSTEIN *was losing*" 4,3 dtk; "CHALK *picked up a*" 9 dtk; "*replaces the* CLIMB" 35,8 dtk. Inilah yang bentrok dengan Lantai A6 (satu baris satu ukuran). Ada juga varian yang **tidak** bentrok: kata sambung di baris sendiri di atas kata kunci ("*When the* / SHORTCUT", "*you get* / CREATIVE", "*Right now,* / THOUSANDS" 40–46 dtk). |
| Ganti komposisi tiap 3–5 dtk lewat hard cut + punch atau whip-slide 6 frame (L28) | ⚠️ | Rata-rata ±3,5 dtk antar komposisi ✅; whip-slide ❌ tidak terlihat. |
| Micro-float ±6 px periode 90 frame (L29) | ❔ | Tidak diukur. Yang terlihat: Einstein biola membesar pelan 9,4→13 dtk (push/scale). Kartu 95 menulis drift ±4 px. |

**Kesimpulan Style A:** mekaniknya nyata dan sudah ada di skill-development (kartu 95, `Kursor.tsx`). Dua klaim v1 salah (serif; scale punch/whip), satu kurang (ketik per huruf, caps miring). Palet dan huruf referensi tidak dibawa (kartu 95: "yang tidak dipinjam: palet, huruf").

## 2. Style B (`vox.mp4`, `vox2.mp4`) vs v1 `skills/05-style-b-vox-documentary`

| Klaim v1 | Status | Bukti |
|---|---|---|
| Asal gaya "Vox" (L7) | ❌ | Kedua video adalah iklan EarnEdits (template After Effects). Gayanya gaya template yang dijual, jadi risiko "template-based" (kebijakan YouTube) lebih tinggi bila ditiru apa adanya. |
| Blueprint grid `#1D3C6B` (L11) | ✅ | vox2 15–16 dtk (kata serif miring tunggal "possible", "infection"). Tidak ada di vox.mp4. |
| Kertas grafik/arsip (L12) | ✅ | vox 18–20 dtk (ubin putih), 29–33 dtk; vox2 37–38 dtk. |
| Papan gelap/kayu (L13) | ✅ | arang: vox 21–25 dtk, vox2 7–8 dtk; kayu: vox 12–16 dtk (abu, tangan merakit sikat tulang), vox2 12–14 dan 17–20 dtk (meja cokelat kemerahan). Kayu + arang = cokelat + hitam (S-V19). |
| Koran miring + stabilo kuning menyapu (L17–19) | ✅ dengan koreksi | vox2 12–13 dtk (kuning); **vox2 18–20 dtk stabilo hijau** di koran ber-logo NBC News asli. |
| Lingkaran spidol merah pada angka (L20) | ✅ | vox2 19–20 dtk, melingkari "200". |
| Polaroid jatuh dengan pegas (L21–22) | ✅ | vox 6–8 dtk (masuk dari bawah), 30–32 dtk. Angka pegas tidak terukur. |
| Stempel tanggal mesin ketik + kursor + garis merah, monospace/condensed (L23–24) | ⚠️ | vox2 7–8 dtk "OCTOBER, 2026\|" dengan garis bawah merah ✅, hurufnya **condensed sans, bukan monospace**. vox 5–6 dtk "1780" miring di latar grid oranye (latar oranye tidak dicatat v1). |
| Pita merah transparan dengan teks miring (L25–26) | ✅ | vox 18–20 dtk, kata-kata serif miring di pita merah. |
| Tipografi bertumpuk warna-warni (L27–28) | ✅ dengan catatan | vox 22–25 dtk: putih, cyan, merah, kuning, hijau + **glow neon** di bingkai putus-putus; vox2 37–38 dtk: teks 3D ekstrusi kuning/merah/biru. Ini palet pelangi (S-V3) dan glow (anti-slop §1). |
| Gerak kamera terus-menerus (L31) | ❔ | Tidak diukur per frame. |
| Whip-pan dengan motion blur, match-cut, keyhole (L32) | ⚠️ | blur gerak vox 1–2 dtk ✅; keyhole vox2 36 dtk ✅; match-cut tidak terlihat. |
| SFX foley taktil di tiap transisi (L38) | ❔ | Audio referensi tidak didengar; tidak bisa dibuktikan dari frame. |
| *Tidak dicatat v1* | — | (1) **Sebagian besar adegan foto-realistis tampak buatan AI generatif**: laboratorium penemu vox 0–4 dtk, penjara 9–11 dtk, pria mata ikan menyikat gigi 27–28 dtk; vox2 perempuan lab dan peti 0–6 dtk, staf berpakaian pelindung 3–6 dtk, konferensi pers 29–33 dtk. Penilaian dari mata, belum dipastikan. (2) Kata tunggal serif miring kecil di tengah (vox 12–16 dtk "a", "bone,", "into", "animal"). (3) Teks bertangga "There has to be a better way" vox 33 dtk (S-T6). (4) Label nama kotak merah vox2 9–10 dtk. (5) Logo merek asli NBC News vox2 18–20 dtk. (6) Ritme: vox 11 cut / 39,8 dtk; vox2 5 cut + 38 perubahan. |

**Kesimpulan Style B:** mekanik arsip (permukaan bergantian, stabilo, spidol, polaroid, stempel, pita, keyhole) terbukti. Yang v1 tidak sebut justru yang paling berisiko: gambar orang foto-realistis AI, logo media asli, dan palet pelangi + glow. v2 mengambil mekaniknya saja (kartu M09/M10/M11 + `HighlighterSweep`), tanpa orang AI foto-realistis dan tanpa logo media.

## 3. Suara (`edubizz-1.mp4`, `edubizz-2.mp4`) vs v1 `skills/03-sg-voice-align`

Transkrip faster-whisper `small` (int8, CPU), lalu `medium` untuk uji cakupan; loudness ebur128.

| Klaim v1 (baris) | Status | Bukti |
|---|---|---|
| Diksi percakapan: "Coba bayangin", "Kok bisa?", "Nah, pas", "Simpel aja" (L12) | ✅ | 0–1 dtk, 6,7–7,9 dtk, 15,7 dtk, 10,8–11,6 dtk. Sapaannya **lo/gue** ("rumah lo", "gue jelasin"), bukan "kamu" seperti naskah plan. v1 menulis "gua"; yang terdengar di transkrip "gue". |
| Jeda 0,25–0,4 dtk setelah pertanyaan retoris (L13) | ⚠️ | Setelah "Kok bisa?" jedanya **0,72 dtk** (7,9 dtk). Jeda antar kalimat median 0,36 dtk (24 jeda ≥ 0,3 dtk; maks 0,90 dtk). |
| Tempo ±150 WPM (L26) | ✅ | 183 kata / 71,5 dtk = **2,56 kata/dtk (154 WPM)**; edubizz-2 2,58 kata/dtk. |
| "Vocal smile", napas mikro, melambat di istilah (L14) | ❔ | Butuh telinga, tidak bisa dibuktikan dari transkrip. |
| Suara perempuan hangat paling dekat: Aoede/Kore/Leda (L19) | ❔ | Perkiraan F0 tidak konsisten (median 182 Hz di edubizz-1, 131 Hz di edubizz-2 yang bercampur musik). Jenis suara dan apakah ini TTS **belum diketahui**: Irfan perlu mendengar. |
| Loudness referensi | ✅ (data baru) | edubizz-1 −14,4 LUFS, LRA 5,0 LU, true peak **−0,6 dBTP** (di atas −1); edubizz-2 −14,3 LUFS. |
| *Visual edubizz (tidak dibahas v1)* | — | Explainer vektor datar berbahasa Indonesia: sans geometris, pil label "CARA KERJA PANEL SURYA", judul dua baris dengan satu kata berwarna, diagram rakit (rumah → lapisan sel → elektron). Lebih dekat ke arah plan (diagram rakit-dari-nol, 1-1-1) daripada Style A/B. |
