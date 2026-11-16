# TASK-1a-potong · Pemotong (Codex; claude1 kena limit 5 jam s.d. 22:10 WITA) · pemberi: Sutradara claude2

TUJUAN       Potongan suara+wajah ±1:25–1:35 dari sumber DJI, 7 babak (B1, B1b, B2–B6), terkunci di batas kata asli dan lulus gerbang potong.
KONTEKS      Sumber: ~/.codex/attachments/d9062ade-e728-4775-b6cd-1b2e61bfd5b8/DJI_20261116162607_0603_D.MP4 (3:29, 1080p 59,94, mono 48k; sudah diverifikasi = file Drive Irfan).
             Transkrip kasar (kalimat + detik): ~/Documents/Codex/2026-11-16/files-mentioned-by-the-user-dji/work/transcript-source.txt (JSON kata: transcript-source.json di folder sama). Verifikasi tiap batas di waveform; buat words.json kata-level sendiri (faster-whisper large-v3, ~/work/mg-venv/bin/python, cache HF sudah ada) bila JSON lama tidak kata-level.
             Alur (detik sumber kira-kira, kalimat persis dari transkrip):
             B1  0,53–4,31   "Oke, finally akhirnya proyek ini selesai juga."
             B1b 4,51–14,83  "aku baru aja ngebikin workflow gimana biar AI model yang kita pake, entah itu CGPT, Claude, Gemini, itu bisa ngebuat sebuah decision dalam ngebuat video" (boleh buang "Ya," dan "gitu")
             B2  14,91–25,39 "belakangan ini … viral banget soal ngedit video pake AI. Tapi, kalo dari pandanganku sendiri, hasilnya tuh masih terasa AI slop dan … masih putus-putus."
             B3  25,39–34,75 + 42,55–61,71 (+ 61,81–69,63 bila muat) — skill untuk membantu model memutuskan; bukan template ("Apple style", "cinematic storytelling"); "aku tuh ngebalik … AI ini cuman mempelajari workflow-nya". Kalimat "merancang skill … memutuskan" kini tumpang tindih dengan B1b: pangkas bila durasi > 1:35. Pangkas pengulangan, bukan kalimat isi.
             B4  96,41–117,23 "jadi gak usah ditanya kenapa aku gak langsung publish dan open source. Karena perlu balik modal, Pak. Ini abis banget … langganan ChatGPT Pro Max yang 20 kali sama Claude Pro yang 5 kali. Hanya untuk uji coba sistem ini."
             B5  159,11–182,17 "sistem workflow ini tuh memungkinkan sistem kerja lintas agent. Kayak yang kalian lihat ini. … ChatGPT bisa koordinasi ke Claude … session yang berbeda … meminimalisir kesalahan yang sama … loop pembelajaran"
             B6  187,75–189,57 "Ini 100% full pakai AI." + 197,71–208,13 "Dan menurut kalian … profesional gak? Atau masih kerasa AI? Comment di bawah. Nanti aku kasih skill gratis bagi yang beruntung."
FILE BOLEH   projects/skill-development-journey-20261116/{edit/**, CUT-MAP-v2.json, transkrip-hasil.md, CUT-SHEET.md (hanya kolom Waktu sumber, Timeline hasil, Naskah), handoff/REPORT-1a-potong.md}
FILE JANGAN  semua file lain; proyek lain; skrip skill; GUIDELINE/DECISIONS/RESEP.
LARANGAN     - Tidak membuat ucapan baru; nama paket persis seperti diucapkan ("ChatGPT Pro Max yang 20 kali", "Cloud/Claude Pro yang 5 kali") — tulis "Claude" untuk "Cloud", "ChatGPT" untuk "CGPT/chat GPT", "slop" untuk "slope", di teks saja.
             - Buang kata sampah, ulangan, jeda berpikir; jeda klausa ≤ 0,5 dtk dipertahankan. Suara tidak dipercepat/di-pitch/di-loudness/di-limit.
             - Kata isi tidak teriris > 20 ms, guard 50 ms tiap batas, durasi kata hasil ≥ 85 % (Lantai E23). Microfade 2 ms hanya di sambungan sunyi.
             - Video dan audio memotong di batas frame yang sama; keluaran wajah 29,97 fps (buang frame selang-seling, tanpa interpolasi).
             - Disk hanya ±1,5 GB: simpan edit/wajah.mp4 (H.264 CRF 16, tanpa audio), edit/suara.wav (48k mono PCM), words; tanpa folder frame, tanpa salinan sumber. Cek `df -h /` sebelum menulis file > 100 MB; bila < 600 MB bebas, berhenti dan laporkan.
LULUS BILA   - `~/work/mg-venv/bin/python claude/motion-graphic/scripts/gate/cut_check.py edit/suara.wav edit/words.json --source-words … --map CUT-MAP-v2.json` LULUS
             - `audio_order.py lock suara --words … --source-words … --cut-map CUT-MAP-v2.json --voice-source <wav sumber>` LULUS (jalankan dari root repo, --dir projects/skill-development-journey-20261116)
             - transkrip ulang PCM hasil tanpa prompt: semua kalimat babak terbaca utuh; durasi wajah = durasi suara ±1 frame.
             - transkrip-hasil.md: per babak, kalimat persis + mulai/akhir (dtk timeline hasil) + per kata kunci: "finally", "CGPT", "Claude", "Gemini", "AI slop", "putus-putus", "template", "workflow", "balik modal", "20 kali", "5 kali", "kayak yang kalian lihat ini", "100%", "profesional", "AI", "Comment".
JANGAN       render visual, memutus mode/visual, menyentuh kolom Mode/Visual/Bunyi, commit/push.
LAPORAN      handoff/REPORT-1a-potong.md ≤ 15 baris: durasi akhir, durasi per babak, yang dipangkas + alasan, hasil dua gerbang (baris PUTUSAN), risiko.
