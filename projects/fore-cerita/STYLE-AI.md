# STYLE-AI — v6 (AI video per shot, dirakit di Remotion)

Pemicu: feedback Irfan 28 Okt 08:39 atas v5.
> "kamu pakai sistem kerja yang sama… layers… menyebabkan efek melayang… video seperti ini harusnya enggak bisa dibikin pakai sistem 3JS atau remotion… kita bisa pakai ini itu sebagai acuan storyboard. Terus kita bikin ulang lagi pakai AI, pakai seedance atau Google Flow."
> "Tone - warnanya harus dibikin 1 tone warna dan 1 karakter… Transision logicnya… masih salah karena gelembung warna putih… buat perframe atau beberapa detik video generationnya bisa pakai flow atau idea.ai kemudian nanti hasilnya digabungkan di video editor remotion"

## Diagnosis v5 (contact sheet `storyboard/v5_contact.jpg`)
- Dua palet: bayangan abu-mint pucat vs kenyataan amber gelap → melanggar "1 tone".
- Tokoh pria beda proporsi/wajah antar shot (kos jangkung, bus beda wajah, kerumunan S21).
- Sprite di atas latar = melayang (tidak ada kontak bayangan/oklusi).
- Gelembung transisi = bola kaca putih opaque, tanpa sebab visual.

## Satu tone (semua shot)
Amber-madu, bayangan cokelat tua (umber), aksen hijau zaitun redup (daun Fore, apron, tanaman). Tidak ada biru/teal/abu-mint.
- **Kenyataan**: low-key malam, lampu gantung amber, bokeh.
- **Bayangan**: palet SAMA, dibedakan oleh cahaya: lebih terang, kabut keemasan, bloom, debu cahaya, tepi frame memudar krem.
- **Siluet takut**: cokelat tua tanpa wajah, rim light amber tipis.
Gaya: lukisan anime 2D, bidang cel bersudut 2–3 nilai, tanpa lineart, kontras rendah, hitam diangkat, grain film.

## Satu tokoh
- Pria: `ai/keys/sheet_man.jpg` (rambut hitam bongkah, kemeja putih lengan pendek, lanyard zaitun, celana arang), dewasa ±26.
- Perempuan: `ai/keys/sheet_woman.jpg` (rambut sebahu cokelat tua berponi, kemeja krem terbuka, atasan & rok zaitun, tote kanvas).
Setiap keyframe memakai sheet sebagai referensi identitas.

## Logika transisi baru (menggantikan gelembung putih)
- **Masuk**: tetes embun di gelas = lensa. Di dalam tetes terlihat bayangan terbalik kamarnya pagi hari (refraksi). Kamera menyelam ke tetes → kamar memenuhi frame (first/last frame Flow: k03 → k04a).
- **Keluar**: tetes yang sama, di dalamnya meja bayangan dikepung siluet. Siku perempuan menyenggol meja → tetes bergetar, meluncur, pecah → gelas tumpah (k16 → k17). Cermin dari masuk, jadi penonton paham aturannya.

## Pipeline
1. Keyframe per shot: Flow Nano Banana Pro (0 kredit), referensi = sheet tokoh + frame gaya `N_two_laugh` + frame v5 (komposisi saja). Generator: `video/ai/mkjobs.py`.
2. QC angka: hue/suhu rata-rata per keyframe harus dalam satu rentang; energi tepi ≤ 10; cek tokoh manual.
3. Image-to-video per shot di Flow (model dipilih setelah uji 1 shot), kamera terkunci untuk shot yang diberi teks.
4. Remotion: klip `OffthreadVideo` mengikuti tabel waktu v5 (lagu sama), teks planner/WA/kalender/tagline tetap dari kode, satu grade + grain global.
