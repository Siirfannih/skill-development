# Catatan keputusan (ADR, format Nygard)

Status semua: **Diusulkan** sampai Irfan menyetujui, kecuali yang ditandai.

| ADR | Keputusan | Konteks | Konsekuensi |
|---|---|---|---|
| 1 | Storyboard dikunci jadi `contract.json`; hanya Irfan yang bisa mengubah | Agent menafsirkan ulang storyboard bebas | Penyimpangan bisa dicek mesin; storyboard harus lengkap di gerbang 1 |
| 2 | Pembuat dan penilai selalu beda model | Model yang menilai kerjanya sendiri cenderung meluluskan | Butuh ChatGPT + Claude + Gemini (sudah dimiliki) |
| 3 | Runner kecil berbasis file, pola dari orchestrator open-source | Alat yang ada untuk PR/CI; Temporal terlalu berat untuk satu orang | Wajib: state, checkpoint, idempoten, retry terbatas, riwayat. Pindah ke Temporal bila kegagalan state berulang |
| 4 | Eksekusi di PC server; Mac hanya diskusi | Mac tidur saat Irfan menyetir; disk Mac penuh dua kali di pilot | Pasang Codex, Claude CLI, Gemini CLI/agy, Remotion, OmniVoice, gpt-bridge di PC |
| 5 | QC memakai render proxy/potongan per beat; render penuh sekali di akhir | Waktu tunggu render penghambat utama | Cek mekanis diulang pada render penuh |
| 6 | Cek mekanis menang atas kritikus AI; kontrak menang atas semua | Kritikus bisa salah dan menggeser gaya | Kritikus hanya menambah temuan |
| 7 | Uji mundur pada video lama sebelum dipakai untuk video baru | Belum ada bukti sistem menangkap yang Irfan tangkap | Butuh storyboard, render sebelum revisi, masukan Irfan dari proyek itu |
| 8 | **Disetujui Irfan 27 Okt:** jalur affiliate memakai TTS lokal (OmniVoice/VoiceStudio), suara baru dari voice design, bukan clone suara orang dan bukan ElevenLabs | Konten affiliate tidak butuh branding suara; hemat kredit | Suara dipilih sekali lalu jadi referensi tetap (`tools/voice`) |
| 9 | Untuk explainer mekanisme: 3D prosedural lewat kode (`@remotion/three`) dengan kit komponen per niche; model kuat membangun kit, model murah (DeepSeek) mengisi konfigurasi per video | Animasi nyata + potongan presisi + konsisten antar-shot; biaya turun per video | Kit dibangun hanya untuk niche yang lolos riset produk (komisi rupiah per penjualan) |
| 10 | Render oleh runner, bukan builder | Sandbox Codex memblokir port render dan aturan disk < 10 GiB | Builder hanya mengubah kode + typecheck |
