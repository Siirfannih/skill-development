# Peran dan bedah referensi (gerbang script)

Nama file referensi = apa yang ditiru (D-005). Bedah dari contact sheet 1 frame / 1,5–3 dtk dan teks layar. Transkrip audio belum dibuat: model Whisper tidak bisa diunduh dari cloud (huggingface diblokir proxy).

| File | Durasi | Ditiru | Temuan |
|---|---|---|---|
| Storytellers.mp4 (9:16) | 80 dtk | Cara bercerita | Hook provokatif ("kalau orang paling berbahaya adalah storyteller") → tokoh yang dikenal → kebenaran yang dialami semua orang ("kita tetap pilih brand yang itu lagi") → dibalik ("kadang bukan karena produknya / karena percaya / karena ada memori") → bukti angka (HMNS 300 → 500 miliar) → "dan kali ini mereka akan bantu kamu" → CTA. Kata sambung berdiri sendiri di layar hitam ("tapi"). Caption pendek, B-roll sinematik. |
| Struktur-script.mp4 (Gawx breakdown) | 72 dtk | Urutan script | Pertanyaan pembuka "what actually makes his work so GAWX" → dibongkar per bagian (cinematic look, environment & props, depth, signature) → penutup comment "GAWX". Kinetik tipografi menempel di footage tokoh. |
| Apple Styele.mp4 | 45 dtk | Visual | "You built / A business" (akui penonton) → "Now" → "Meet [produk]" → daftar kerja (Ads, Socials, Emails, SEO) dengan UI 2D → "Autopilot" → "Generating". Latar putih, gradasi lembut, satu kata per frame. |
| Sound efex.mp4 | 40 dtk | SFX | UI pastel, setiap onset kata/kartu/kursor punya bunyi. Detail SFX dibedah di gerbang audio, bukan sekarang. |
| Holy freak tutorial.mp4, baikovphilipp_ssspin.mp4 | 120 / 67 dtk | (tidak dinamai) | Peran lama di `projects/jadisatu-launch/ART-DIRECTION.md` §5: Holy Freak = penyutradaraan tokoh pixel; Baikov = gerak teks dan penempatan SFX. Dibedah di gerbang storyboard. |

## kaye.creatives (dikirim 25 Okt 12:57, untuk momen tokoh nyata, D-022)

852×720, 99 dtk. Pola saat menyebut Sam Altman (0–6 dtk): nama muncul sebagai teks kinetik kecil ("Sam Altman … said") → potong ke footage Altman → kartu kutipan: tanda kutip besar, label kecil "Sam Altman said:", kalimat diketik kata per kata di kiri atas, kamera push pelan → ganti ke footage kedua dengan kutipan yang sama terus berjalan. Wajah dan kutipan satu subjek, jadi tetap satu fokus. Nama ditaruh di depan karena Altman dikenal; Ira Glass tidak, jadi konsep "the gap" didahulukan (devil's advocate 12:55).

## Kinetictypographyeffect.mp4 (dikirim 25 Okt 13:02): bedah teknik

960×720, 30 fps, 52 dtk. Contact sheet 2 fps. Teknik yang terlihat:

| Kode | Teknik | Detik kira-kira | Cocok Apple? | Usulan pakai di script v1 |
|---|---|---|---|---|
| K1 | Teks mengikuti lengkung (text on path) di tepi bingkai bulat: "Let me show you", "and bend the world around them" | 4–7, 16–20 | Ya | Satu frasa saja, misalnya "Cara melihat" melengkung di tepi lensa |
| K2 | Lensa fisheye pada footage: bingkai membulat, tepi gelap, garis cahaya (lens shine) di tepi atas, distorsi naik bertahap | 4–10, 16–25 | Ya, sekali | Bagian "Cara melihat" (lensa = metafora melihat) |
| K3 | Caption satu kata di tengah bawah, kata kunci kuning + glow lembut, berganti tiap kata | 25–45 | Ya, warna aksen diganti palet Jadisatu | Teks VO untuk bagian demo/penjelasan |
| K4 | Kata-kata disusun bertumpuk dengan ukuran berbeda di sekitar subjek, masuk berurutan dengan tilt 3D | 2–4, 13–15 | Ya | "Mengedit. Menulis. Mencari kerja. Mencari uang." |
| K5 | Siluet kepala terisi warna glow + teks melengkung di atas kepala | 2–3 | Ya, hati-hati | "taste-mu berhenti tumbuh" |
| K6 | Huruf kolase ala ransom note ("VIDEOS", "VISUAL STORYTELLING") | 1, 11 | Tidak | Jangan dipakai |
| K7 | Latar komik kuning dengan garis petir | 2–3, 11 | Tidak | Jangan dipakai |
| K8 | Tiga ubin angka 1-2-3 di latar blur, panah tulisan tangan tergambar (write-on) menunjuk satu ubin | 7–10, 15, 18 | Ya | Kerangka "tiga hal yang tidak bisa di-generate" |
| K9 | Rekaman layar UI dalam perspektif 3D miring, depth of field, caption satu kata di atasnya | 25–45 | Ya | Momen "AI menutup jarak itu dalam tiga detik" (UI generate) |
| K10 | Ikon bookmark pop "save this for later" | 9 | Netral | Tidak perlu |
| K11 | Transisi garis silang (crosshair) dari hitam ke subjek | 15, 20 | Ya | Pergantian bagian |

Cara membuat (dua jalur, dipilih di gerbang build):
- After Effects: K1 = Path Options teks pada mask + keyframe First Margin; K2 = Optics Compensation (Reverse Lens Distortion) atau CC Lens + mask membulat + Inner Glow/stroke untuk lens shine; K3/K4 = Text Animator per kata (Range Selector based on Words) untuk opacity, blur, scale, posisi Z; K8 = shape layer + Trim Paths; K9 = 3D layer + kamera dengan Depth of Field; semua gerak cepat pakai motion blur.
- Engine kode (HyperFrames/Remotion): K1 = SVG `textPath` dengan `startOffset` dianimasikan; K2 = shader WebGL barrel distortion atau SVG `feDisplacementMap`; K3/K4 = span per kata + stagger GSAP; K8 = `stroke-dashoffset`; K9 = CSS `perspective` + `filter: blur`.
Belum diuji. Gerbang build: satu adegan dulu (`motion-graphic` gerbang 7).
