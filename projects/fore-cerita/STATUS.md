# STATUS — v6 sedang produksi (28 Okt)

Fase: v6 = klip AI per shot (Google Flow, Omni 1.1 Flash) dirakit di Remotion (`video/src/Fore6.tsx`, komposisi `Fore6`). Dasar keputusan: `STYLE-AI.md`.
- Tokoh terkunci: Flow asset `fore-ai-scene-03-v1` (pria), `fore-ai-scene-02` (perempuan); file di Mac `~/Proyek/fore-cerita/ai/keys/`.
- Keyframe: Flow project Oct 28 (akun paymediaindonesia, PRO). Peta id→judul aset: `ai/titles.json`. Batch: keys2 (k01,k03), keys3 (agent, 25), keys4 (ulang 10: k14,k18,k19,k21a,k21b + perbaikan tanpa tokoh k08,k09,k13,k17,k20).
- Klip: `ai/vjobs.py` → batch clips1 (16 klip). Uji model: Omni Flash 7 kr/4 dtk dipilih (Veo Fast tangan berubah).
- flow-mcp: studio dijalankan permanen (`node dist/studio.js`, port 8787); status `~/flow-mcp/st.sh`.
- Sisa: klip batch 2 (v08,v13,v14,v17–v21), salin klip ke `video/public/ai/`, setel OV di `clips6.ts`, render, QC, kirim.

# STATUS
- Fase: **selesai v5** (28 Okt 04:2x WITA). Menunggu review Irfan.
- Hasil: `~/Proyek/fore-cerita/render/fore_kalah-lagi_v5.mp4` + `_SFX-only.mp4`; master CRF18 dikirim di chat. Laporan: REPORT.md. Kandidat aturan: RETRO.md.
- Kode: video/src (Remotion), tools/ (prep, ingest, trim, audio_build, visual_qc, el_sfx_batch). Aset mentah di Mac ~/Proyek/fore-cerita/assets, SFX di ~/Proyek/fore-cerita/sfx.
- Untuk melanjutkan: salin video/src ke proyek Remotion baru, aset diproses dengan tools/ingest.sh ke public/assets, audio dengan tools/audio_build.py (butuh song.wav potongan 26,17→100,75).
- Sisa (opsional): gaya dunia kenyataan lebih bersudut, inbetween gerak tokoh, tanam perempuan sebelum senggolan.
