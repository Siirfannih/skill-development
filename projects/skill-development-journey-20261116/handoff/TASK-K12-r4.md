AWAL SESI: Sutradara sudah menjalankan doctor --fix (izin Irfan 16 Nov). Bila doctor GAGAL HANYA karena "skill Codex … salinan", jalankan ./tools/doctor.sh --fix sekali lalu lanjut; jangan bertanya.

# TASK-K12-r4 · Builder Codex (Sol 6.1 High) · pemberi: Sutradara claude2
Baca handoff/REPORT-K12-r2.md (kerjamu r3). G2 sanding (qc/maskot/r2-f090.jpg vs sumber/ref/chatgpt-codex-ikon-asli.png): Claude crab LULUS (bentuk, warna, tiga-perempat, posisi bahu kiri) — jangan diubah kecuali bayangan.
TEMUAN       T1 ChatGPT: terlalu gelap (biru navy) dan kecil (±6 % tinggi frame). Ikon asli = awan/bunga biru CERAH (#3E6BFF di bawah → #8FB2FF di atas) dengan gradien PUTIH seperti kilatan cahaya di kiri atas (highlight lebar, lembut), simbol ">_" putih tebal. Perbaikan: material terang (emissive lembut 0,15–0,25 supaya tidak tenggelam di bayangan kamar), highlight putih tekstur gradien prosedural (bukan raster), tinggi ±13 % frame, posisi sisi kanan kepala (x ±68 %, y ±26 %), tidak menutupi wajah.
             T2 Gemini: tinggi ±12 % frame, gradien Gemini asli (biru #4285F4 → ungu #9B72CB → sedikit merah muda di ujung), tepi membulat tebal, kilau menyapu; posisi kanan bawah (x ±80 %, y ±64 %).
             T3 Bayangan: ketiga maskot wajib melempar bayangan lembut yang TERLIHAT ke dinding/latar di belakangnya (offset kanan-bawah 30–60 px, blur besar, opacity 0,22–0,30) + contact AO tipis; tanpa ini terasa stiker.
             T4 Ukuran Claude naik sedikit ke ±14 % (sekarang ±10 %).
FILE BOLEH   remotion/src/komponen/MaskotAI.tsx, remotion/src/komponen/maskot/**, remotion/src/uji/UjiMaskot.tsx, remotion/src/uji/K12-entry.tsx, qc/maskot/**, handoff/REPORT-K12-r2.md
FILE JANGAN  semua lainnya.
LULUS BILA   tsc lulus; still qc/maskot/r4-f090.jpg (3 maskot) + qc/maskot/r4-sanding.jpg (r4-f090 kiri, ikon asli ChatGPT + Gemini + crab kanan, tinggi sama); crop 100 % ChatGPT.
JANGAN       render video, commit/push.
LAPORAN      bagian "Ronde 4" ≤ 6 baris di REPORT-K12-r2.md.
