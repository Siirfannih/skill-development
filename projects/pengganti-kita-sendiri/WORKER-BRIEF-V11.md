# Brief worker v11 (Irfan 2 Nov 14.18)

Baca dulu: `LOCKED.md` (JANGAN diubah), `claude/motion-graphic/references/three-segment-gate.md`, `GrokAgent/reference-videos/AUDIT-2NOV-B-kinetic.md` (kinetic referensi). Repo: `/home/claude/skill-development`, proyek `projects/pengganti-kita-sendiri/remotion`.
Video terakhir yang dilihat Irfan: `/mnt/user-data/uploads/AI-Video/pks-studio/out/PKS_v10c2.mp4` (132,8 dtk). Contact sheet 1 fps: `/home/claude/pks/aud11/sheet{0,1,2}.jpg`.
Alat: `npx tsc --noEmit`; `node seg2_probe.mjs <dir> <a> <b> <everyN> <scale>` (still + log OBJ/SFXEV); `python3 ../tools/seg2_layout_check.py <dir>`. Disk cloud cukup (12 GB), tapi hapus folder still milikmu setelah selesai.
Commit hanya file milikmu: `git pull --rebase --autostash origin main && git push origin HEAD:main`. Pesan commit diakhiri:
```
Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01QPNycWQtoYsG5NpceQZXbF
```
JANGAN menyentuh audio (`audio-v19/`, `tools/sfxev_*`); itu milik Claude utama.

## Worker T · sistem teks (lib) · file milikmu: `src/lib/CaptionTrack.tsx` (baru), `src/lib/AnchorWord.tsx`, `src/lib/SpeakerWords.tsx`, `src/Video.tsx` (hanya untuk memasang lapisan caption)

Kata Irfan (dikutip): *"Text hanya untuk penekanan tapi bukan berarti alurnya ga kamu perhatikan … jika ada yang bisa diberikan penekanan maka tampilkan penekanan lebih dulu daripada subtitle text, subtitle text itu tetep perlu ketika tidak ada penekanan jadi running text terus ada dari awal sampai akhir mengikuti audio tapi akan berganti dengan penekanan jika ada penekanan."* Saat ini hanya ~54 dari 310 kata VO yang tampil sebagai teks.

1. **CaptionTrack (running text)**
   - Sumber: `src/timeline.json` → `words` (`{w, s, e, src}`).
   - Satu baris di pita bawah: baseline sekitar y 820, rata tengah, di dalam safe zone x 288–1632.
   - Kata muncul satu per satu tepat di `s` dengan masuk blur→tajam 3 f. Baris di-tengahkan ulang setiap kata masuk (sama seperti `SpeakerLine`).
   - Frasa dipecah di tanda baca, di jeda > 0,35 dtk, atau maksimal ±32 karakter. Frasa lama hilang saat frasa baru mulai.
   - Ukuran seragam (±56 px), Geist Sans 500, putih `#FAF8EC`.
   - Shadow halus saja, maksimal `0 1px 2px rgba(0,0,0,.45), 0 2px 10px rgba(0,0,0,.30)`. Tanpa scrim/pita.
   - Kontras ≥ 4,5:1 di latar terang: pada adegan latar putih/langit, warna teks ganti ke tinta gelap `#14161A`. Tentukan per adegan dari `beats.json`/OBJ, atau sampel luminansi.
   - Tanda baca tidak ditampilkan (aturan storyboard Irfan).
2. **Penekanan menggantikan caption.**
   - Saat ada teks penekanan di layar (AnchorWord, SpeakerLine/SpeakerWords, atau teks besar adegan), caption DISEMBUNYIKAN; jangan dua lapis teks.
   - Kata yang sedang ditampilkan penekanan tidak diulang di caption.
   - Caranya bebas, asalkan deterministik per frame. Saran: buat `captionMask.json` (interval frame) dari log OBJ probe untuk objek `anchor:*`/`text`. Jalankan probe seluruh film everyN=2 dengan scale 0.25, lalu CaptionTrack membaca mask itu.
   - Klip narasumber (src `news_*`, `altman`, `jensen`) sudah punya SpeakerLine. Caption hanya muncul bila tidak ada teks narasumber di layar.
3. **Variasi kinetic typography untuk penekanan** (Irfan: *"mekanismemu selalu sama: fade in, fade out, pop up … coba explore per kata, misal 'kita' pakai writing animation k-i-t-a … supaya penonton ga bosen"*).
   - Tambahkan nilai `enter` baru di AnchorWord:
     - `type`: huruf per huruf, 1 huruf / 1–2 f, dengan caret tipis yang hilang setelah selesai;
     - `mask`: naik dari balik mask 3–4 f;
     - `letters`: tiap huruf naik + blur dengan stagger 1 f;
     - `blur` (yang ada sekarang).
   - `scale`/pop hanya untuk angka atau hero.
   - Pilih teknik per PERAN kata, mengikuti AUDIT-2NOV-B. Dalam satu urutan, teknik yang sama tidak boleh muncul lebih dari 2× berturut-turut.
   - Ukuran font tetap seragam dalam satu kalimat; penekanan lewat warna aksen `#FFD25A`, kata sebelumnya diredupkan, atau ketebalan.
   - Kalau perlu menetapkan teknik per adegan, ubah prop `enter` di adegan, tetapi JANGAN mengubah timing, posisi, atau adegan terkunci (BERLOMBA-LOMBA).
   - Setiap kata penekanan yang memakai `type` wajib memancarkan `sfxMark(..., "type", ...)` untuk awal dan akhir ketikan, id `<scene>:type:<teks>:start|end`. Klik kata tetap memakai penanda `word:` yang sudah ada.
4. **Shadow default SpeakerWords**: `0 2px 6px rgba(0,0,0,0.35), 0 4px 36px rgba(0,0,0,0.6)` membuat bayangan gelap seperti pita di belakang teks (Irfan, gambar Bloomberg 0:08). Ganti dengan shadow halus seperti di atas. Periksa juga AnchorWord yang memakai `0 6px 50px rgba(0,0,0,0.5)` (mis. S05f).
5. **Bukti:**
   - still sebelum/sesudah di 0:08, 0:15, 0:25, 0:45, 1:05, 1:45;
   - laporan `seg2_layout_check` LOLOS (SAFE/CLASH/CONTR) untuk seluruh film;
   - tulis `REVIEW-V11-T.md`: apa yang diubah, daftar teknik per penekanan, persentase kata VO yang kini tampil (caption + penekanan) dengan target ≥ 95 %.

## Worker V · kualitas render adegan · file milikmu: `src/scenes/**` kecuali prop `enter` (milik Worker T) dan `src/lib/*` (milik T)

1. **Cahaya "balon putih"** (Irfan gambar 3, 0:30, S02d dan adegan pictogram lain: S01 01c/01d, S03c, S06*).
   - Pendar putih radial terlihat seperti balon, bukan cahaya alami.
   - Ganti dengan berkas cahaya natural: falloff lembut dan memanjang mengikuti arah sumber, intensitas puncak lebih rendah, tanpa tepi bulat yang tegas. Gradien boleh dibuat lebih panjang dengan noise/grain halus.
   - Rim light pictogram tetap.
   - Ini perubahan desain (Tingkat 1). Tulis mini proposal di REVIEW (masalah · usulan · still 480 px sebelum/sesudah · prinsip · urutan mata penonton), terapkan, lalu sertakan still. Claude utama akan menilai.
2. **Crop footage aneh**: 1:32 dan 1:35 (S05f) menampilkan close-up sweater orang tanpa wajah, dengan "CEO" di atasnya. Pilih framing yang menampilkan orang/wajah atau suasana panggung (transformOrigin/zoom).
3. **Frame kosong/hitam**: 1:38 (≈98 dtk) hitam kosong; 2:12 (akhir, boleh fade). Juga 0:23, 1:21–1:22 dan 0:46, yang hampir kosong. Pastikan setiap detik punya objek bermakna. Transisi kosong ≤ 6 f boleh.
4. **"Tempat Kita"** di 0:54: "Kita" tampak buram/tercoret. Periksa apakah efek itu disengaja; kalau terbaca rusak, perbaiki agar terbaca.
5. **Penanda SFX ketikan**: adegan yang mengetik (0:42–0:45 S03a/S03b prompt CEO, 1:27 HP S05d, 1:54–1:56 S06d prompt ChatGPT, dan ketikan lain) harus memancarkan:
   - `sfxMark(t,"type",…,"<scene>:type:start")` di huruf pertama;
   - `…:type:end` di huruf terakhir;
   - tombol kirim/enter memancarkan `"click"` dengan id `<scene>:enter`.
   
   Irfan: *"1 object / 1 visual punya sfx sendiri … typing tidak mempunyai sfx dan hanya suara enter atau click"*.
6. **Audit sendiri** seluruh film dari contact sheet untuk kekeliruan lain (objek terpotong, teks bertumpuk, warna tidak bermakna, teks di atas visual). Daftar temuan + perbaikan masuk `REVIEW-V11-V.md`. Temuan pada bagian terkunci dicatat saja.
