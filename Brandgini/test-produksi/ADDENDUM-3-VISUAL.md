# Addendum 3 (25 Nov 2026, 22:55) — arah visual merek Soalnya Gini: semua visual dibangun dengan kode

Keputusan Irfan: untuk animasi merek ini model **tidak memakai gambar/foto atau referensi berbasis image** sebagai bahan. Semua aset digambar dan dianimasikan sendiri lewat kode (SVG/CSS di Remotion, atau Three.js lewat `@remotion/three` bila perlu kedalaman 3D). Kiblat foto kolase (kartu 95) **bukan** pembanding visual untuk merek ini; jangan mengejar tampilannya. Lembar sanding membandingkan dengan still kode milik sendiri (kandidat golden), bukan foto.

Acuan prinsip (bukan kode untuk disalin): Bang Motion (MIT) — baca `~/work/soalnya-gini-studio/bang-motion-analisis/ANALISIS.md` §1 dan `bang-motion-src/SKILL.md` bagian "Larangan struktural — uji PPT", `references/explainer.md` (akresi, entitas yang disebut wajib tampil, aksi kontinu), `references/kartun-panggung.md` (panggung hidup).

Yang diharapkan di storyboard dan build:
1. **Anti-PPT**: jangan "satu gambar + satu kalimat per adegan". Satu dunia/hero yang bertahan dan disusuri kamera; adegan berganti karena kamera/dunia bergerak.
2. **Skala**: objek fokus besar (±50–60 % lebar frame), bukan ikon kecil di tengah ruang kosong.
3. **Kamera hidup**: push-in/pan/parallax di tiap beat (zoom ≥ 1,08), bukan kamera diam.
4. **Akresi 3–5 elemen per frasa**; setiap benda yang disebut VO tampil.
5. **Kedalaman**: lapisan depan/tengah/belakang, bayangan lembut, isi bidang (bukan hanya garis tipis).
Semua tetap tunduk pada prinsip butir 7 ADDENDUM-KEPUTUSAN: ini praktik terbaik; kondisi nyata frame yang menang dengan alasan tertulis.

## Struktur layer (keputusan Irfan, wajib jadi struktur komponen Remotion)
1. **Layer Background (paling bawah)**: latar yang memenuhi seluruh frame sesuai dimensi (1080×1920), bukan kanvas kosong; ikut bergerak pelan bersama kamera (parallax paling lambat).
2. **Layer Karakter/Aksi (tengah)**: objek dan karakter yang bergerak, berinteraksi, dan memerankan isi VO (mobil, telinga, otak, dsb.). Di sinilah hero/dunia yang bertahan dan akresi terjadi.
3. **Layer Atas (paling atas)**: teks (KT + caption pelat K-05), maskot yang berbicara/bereaksi, dan visual penunjang (panah, label, highlight).
Tiap layer = komponen terpisah dengan transform kamera sendiri (kedalaman lewat kecepatan parallax berbeda). Catat di STORYBOARD.md isi tiap layer per beat.

## Warna dan bentuk benda (keputusan Irfan 23:17, menggantikan "token merek" untuk visual)
- **Visual merek ini TIDAK memakai palet merek.** Setiap benda digambar **mirip bentuk dan warna aslinya**: santan putih krem, es batu bening kebiruan pucat, garam butiran putih, tong kayu cokelat, gerobak sesuai aslinya, mobil/telinga/otak dengan warna wajar. Penonton harus langsung mengenali bendanya dari bentuk + warnanya.
- Lingkaran/bentuk abstrak berwarna merek untuk mewakili benda (mis. santan = lingkaran biru) **tidak boleh**.
- Yang masih memakai warna tetap: caption pelat putih K-05 (kata aktif biru tetap boleh demi keterbacaan) dan maskot KLIK (desain aslinya). Background boleh netral lembut agar benda berwarna asli menonjol.
- Tetap digambar dengan kode (SVG/CSS/Three.js), tanpa foto.
