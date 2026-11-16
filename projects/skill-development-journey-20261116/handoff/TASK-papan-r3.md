AWAL SESI: Sutradara sudah menjalankan doctor --fix (izin Irfan 16 Nov). Bila doctor GAGAL HANYA karena "skill Codex … salinan", jalankan ./tools/doctor.sh --fix sekali lalu lanjut; jangan bertanya.

# TASK-papan-r3 · Codex (Sol 6.1 High) · pemberi: Sutradara claude2
G2 sanding-r2: B3-C dan B4-effort LULUS. Dua perbaikan terakhir sebelum storyboard ditunjukkan ke Irfan.
TEMUAN       T1 B5: avatar Codex memakai raster screenshot berbadge merah "12" (melanggar tanpa-raster; badge tidak relevan). Ganti dengan bunga Codex VEKTOR/3D dari komponen maskot (remotion/src/komponen/MaskotAI.tsx model "chatgpt", atau versi 2D vektor setara: awan biru #3E6BFF→#8FB2FF, kilatan putih kiri atas, ">_" putih), tanpa badge. Avatar Claude tetap crab.
             T2 B1b: render ulang memakai maskot 3D final dari MaskotAI.tsx (versi ronde 5: ChatGPT bunga cerah, Claude crab, Gemini bintang cekung) dengan posisi/ukuran/bayangan seperti qc/maskot/r5-f090.jpg; cincin kata dan matte tetap. Pastikan simbol ">_" pada bunga ChatGPT terbaca jelas (menghadap kamera ≥ 70 %, yaw ≤ 25°) di still B1b; atur lewat props pose/fase bila ada, bukan dengan mengubah MaskotAI.
FILE BOLEH   remotion/src/papan/**, remotion/public/papan/**, remotion/src/uji/papan-entry.tsx, handoff/henti1/**, handoff/REPORT-papan.md
FILE JANGAN  semua lainnya (MaskotAI hanya di-import, tidak diubah).
LULUS BILA   tsc lulus; papan-B5.jpg dan papan-B1b.jpg diperbarui; grep raster di src/papan hanya footage/matte; handoff/henti1/storyboard-final.jpg: 8 panel urut B1b, B2, B3-A, B3-C, B4, B4-effort, B5, B6 (grid 2 kolom, lebar 960, label babak kecil) — tanpa kolom acuan.
JANGAN       render video, commit/push.
LAPORAN      bagian "Ronde 3" ≤ 4 baris di REPORT-papan.md.
