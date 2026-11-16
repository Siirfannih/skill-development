# Review sutradara · suara v6

Kontrak final: 2.493 frame / 83,1 detik, SHA256 VO `d56ab12f772c35f7c7c037243974d95c84eb6b60c786523d03dfb1a574e8983f`. Suara, wajah, caption, dan peta berasal dari cut yang sama. Tidak ada time stretch.

Input native/ASR aktual adalah varian gain preview `d200737bed8d2ea23e3f300da2296c9f3b72861af15feb35ae73773c85929806`. Finishing mengurangi besar gain tambahan sebesar0,2dB agar AAC mempunyai headroom; seluruh gain dari sumber tetap naik +0,908..7,835dB. Hasil tepat sama per sampel dengan old×float32(0,9772372245788574), correlation1, SNR151,922dB dan crest identik. Bukti dengar berlaku secara transform-invariance yang diverifikasi, bukan klaim hash baru sudah didengar. Truepeak4×soxr: WAV−1,177395dBTP, AAC192−1,200280dBTP. Verifier194artefak dan tiga negativechecks lulus.

Native Gemini membaca WAV aktual utuh 83,1 detik serta empat WAV perbandingan raw/hasil untuk English dan Apa. Transkrip utuh memuat semua konteks, `build something`, `Apa pengalaman yang aku dapatkan`, dan penutup `Share. Ngebagiin apa yang belum sempurna`. Defects kosong; kejernihan tinggi. ASR ulang hasil juga memulihkan Build/something/Apa. Ejaan colloquial dan artefak ASR `Terima kasih` di ekor penutup tidak dipakai untuk memotong suara. Bukti lengkap dan log read_file ada di `edit/v6/native-qc/`.

Keputusan per jenis temuan tetap dibatasi ke hash ini dan occurrence di `canonical-findings.json`, bukan pelonggaran ambang global:

- R-032 menerima sambungan false-start raw105,65→107,15 yang tidak mempunyai guard50ms. Opsi yang memenuhi lembah energi justru memotong Apa; opsi terpilih didengar utuh dan alami. Gate default guard tetap FAIL pada kasus ini.
- Tiga `tuh` dipertahankan sesuai keputusan sutradara R-026. Ini bukan kutipan permintaan user untuk menyimpan filler.
- Residual00/01/03/04/05/06/07/08/10 dinilai native sebagai artikulasi/napas. Untuk02/09, percobaan lebih rapat terbukti merusak fonem/napas; versi saat ini diterima.
- Tambahan enam diam internal, aku/perlu, serta Tapi/satu/hal diterima sutradara berdasarkan pemeriksaan native full-context final yang menyalin kata-katanya utuh dan tidak mendengar jeda berpikir. Ini bukan klaim native memberi label release khusus pada masing-masing occurrence.
- Tiga diagnostik hum PERIKSA diterima berdasarkan jeda final terukur −60,8dBFS dan pemeriksaan full-context tanpa dirty gap. Diagnostik itu tidak menjadi bukti dengung dengan sendirinya.
- R-033 menerima dinamika asli; level finishing −21,7LUFS / peak sampel −1,25dBFS. Hasil `voice_level.py` default tetap FAIL target level, sedangkan tidak turun dari sumber/tidak ditekan/tidak clip dibuktikan terpisah. Ini keputusan eksplisit Irfan setelah preview VO lengkap tersedia, dengan headroom finishing yang tidak mengubah dinamika.

Status: timing dan editorial suara diterima untuk proyek dengan deviasi di atas. Tidak ada klaim `audio_order.py` kanonis PASS. Validator final proyek wajib memeriksa ulang hash, temuan persis, urutan lapisan, serta semua gate yang tidak mendapat deviasi; perubahan atau temuan baru harus memblokir render.
