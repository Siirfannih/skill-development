# Tugas builder: aff-pompa-01 (Remotion, 1080x1920, 30 fps, 40 dtk)

Kamu builder. Kontrak di `contract.json` adalah sumber kebenaran: jangan mengubahnya, jangan mengubah naskah atau audio VO.
Folder kerja: proyek ini. `node_modules` sudah terpasang (remotion 4.0.534, react 19). Jangan menjalankan audit-bridge.

1. Buka `public/img/well-cutaway.png` dan verifikasi sendiri koordinat piksel pompa, pipa, tanah, dan permukaan air (angka di kontrak hanya perkiraan). Pakai koordinat hasil verifikasimu.
2. Buat `src/index.ts` (registerRoot) dan `src/Root.tsx` dengan komposisi `Main` (1080x1920, 30 fps, 1200 frame), lalu `src/Main.tsx` dan komponen per beat. Waktu teks dari `contract.json` (detik x 30). Struktur 2.5D: lapisan teks di atas (tidak ikut kamera), lapisan ilustrasi + overlay vektor (panah, penggaris, kolom air, label) di tengah dan ikut kamera, latar putih pucat di belakang. Overlay vektor harus menempel pada gambar (berada di dalam container yang sama dengan gambar, jadi ikut transform kamera).
3. Audio: `<Audio src={staticFile('audio/vo_tight.wav')}/>`. Kalau `public/audio/music.mp3` ada, tambahkan dengan volume 0.12 dan fade out 1 dtk di akhir. Kalau `public/audio/sfx/` ada, pakai file di sana sesuai `public/audio/sfx/CUES.json` bila tersedia.
4. Semua gerak pakai `interpolate`/`spring` dengan easing halus; tidak ada lompatan tanpa alasan kecuali break kamera di B5.
5. Render: `npx remotion render src/index.ts Main out/final.mp4 --concurrency=4` (jalankan di background dengan log ke `runs/render.log`, baca 20 baris terakhir saja). Juga render still per beat untuk QC: `npx remotion still src/index.ts Main out/stills/B1.png --frame=<frame tengah beat>` untuk B1-B7.
6. Cek sendiri tiap still terhadap `lulus_bila` di kontrak dan perbaiki sebelum melapor.

Lapor dengan format BRIEF (STATUS/HASIL/FILE/MENIT/KURANG). Sebutkan koordinat hasil verifikasimu dan butir `lulus_bila` yang belum terpenuhi.
