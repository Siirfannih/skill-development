AWAL SESI: Sutradara sudah menjalankan doctor --fix (izin Irfan 16 Nov). Bila doctor GAGAL HANYA karena "skill Codex … salinan", jalankan ./tools/doctor.sh --fix sekali lalu lanjut; jangan bertanya.

# TASK-K12-r5 · Codex (Sol 6.1 High) · pemberi: Sutradara claude2 · HANYA Gemini
G2 qc/maskot/r4-sanding.jpg: Claude LULUS, ChatGPT LULUS (jangan disentuh). Gemini GAGAL bentuk: sekarang belah ketupat menggembung; logo asli (qc/maskot/r4-ref-gemini-2024.svg) = bintang empat sudut RAMPING dengan keempat sisi melengkung ke DALAM (cekung), ujung runcing panjang, pinggang sempit (lebar pinggang ±18–22 % lebar total).
TEMUAN       T1 Bangun ulang geometri Gemini dari path SVG asli itu (extrude 3D, ketebalan ±12 % lebar, bevel kecil membulat), gradien asli dipertahankan. Ukuran visual sama (±229 px tinggi di f090), posisi sama.
FILE BOLEH   remotion/src/komponen/maskot/** (bagian Gemini), remotion/src/komponen/MaskotAI.tsx bila perlu, qc/maskot/**, handoff/REPORT-K12-r2.md
FILE JANGAN  semua lainnya.
LULUS BILA   tsc lulus; qc/maskot/r5-f090.jpg + r5-sanding.jpg (kita vs ikon Gemini asli setinggi sama).
JANGAN       render video, commit/push.
LAPORAN      bagian "Ronde 5" ≤ 4 baris di REPORT-K12-r2.md.
