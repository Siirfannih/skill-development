# Handoff: sesi revisi PKS v21 (dibuat 2 Nov 22.30)

Kamu melanjutkan video **Pengganti Kita Sendiri** (@siirfannih, Remotion 1920×1080, 30 fps, 132,8 dtk). Versi terakhir yang dilihat Irfan: **v20** (visual v11 + audio v20, Video 1 = backsound Particle Emission, Video 2 = Reggae buka/tutup + Particle). Kerja secara otonom. Irfan memberi akses penuh tanpa perlu minta izin:
- hapus cache/bundle di Mac & cloud;
- spawn subagent;
- Codex/ChatGPT via terminal;
- PC server;
- push repo.

Tanyakan Irfan hanya bila benar-benar ambigu.

## Urutan kerja wajib

1. **Audit dulu video sekarang**: Mac `~/Documents/Skill-Development/AI-Video/pks-studio/out/PKS_v20_video1.mp4`. Stage ke cloud untuk contact sheet dan frame.
   - Audit per kategori:
     - (a) shadow/pita hitam di belakang teks: 0:07–0:08 Bloomberg terulang. Akar masalah sudah diketahui, lihat LEARNINGS B1. Cari SEMUA sumber gradien gelap;
     - (b) jeda/bagian yang tidak smooth dan rawan di-skip: kurva gerak `ears/motion_curve.py` + contact sheet;
     - (c) objek animasi kaku atau terlalu rapi (AI slop);
     - (d) kinetic typography VO yang terlihat seperti subtitle: satu baris datar, tidak ada perpindahan kata, tidak menyesuaikan objek, animasi masuk/keluar diulang, kontras dan keseimbangan, butuh layering baru;
     - (e) temuan lain.
   - Tulis `AUDIT-V20.md`: temuan, detik, akar masalah, perbaikan.
2. **Tarik tools dan konteks:**
   - `projects/pengganti-kita-sendiri/STATUS.md` dan `LEARNINGS-2NOV.md` (wajib, berisi kesalahan berulang dan posisi file);
   - `LOCKED.md`, `FEEDBACK-2NOV-*.md`;
   - `remotion/src` (CaptionTrack, AnchorWord enter type/mask/letters/blur, SpeakerWords, NaturalLight, seg2_probe.mjs);
   - `tools/seg2_layout_check.py`, `tools/caption_mask.py`;
   - `audio-v20/` (build.py, SOUND-MAP.md, LISTEN.md);
   - Mac `pks-studio/seg.sh`, `ears/`.
3. **Baca prinsip kerja:**
   - `claude/motion-graphic/SKILL.md` (aturan inti);
   - `claude/motion-graphic/references/three-segment-gate.md` (gerbang 3 segmen, hierarki subagent, aturan teks, running text, kinetic);
   - preferensi Irfan di memory.

   Audio: pakai `audio-v20/` + prinsip. Jangan memakai settingan audio lama (`audio-v19`, `sfxev_to_cues*`, `audio_gate.py`).
4. **Baca referensi (read-only):**
   - Repo `Siirfannih/canvas-skill-library` (tambahkan dengan add_repo akses read, JANGAN push ke sana). Mulai dari `skills/canvas-reference-director/SKILL.md`, `references/cards.json` (33 kartu: observasi, interpretasi, avoid), `research/deep-20261102/` (22 video, frame evidence), dan `research/editing-pattern-20261102/`.
     - Pakai `scripts/retrieve.py --goal "<fungsi adegan>"` untuk mencari kartu per beat, misalnya "kinetic typography mengikuti objek", "presenter story montage", "workflow AI".
     - Batasnya: library ini riset draft dan belum membuktikan kenaikan mutu. Pakai sebagai bukti observasi (bagaimana kata disusun dan berpindah, layering), lalu uji pada video sendiri.
   - `GrokAgent/reference-videos/AUDIT-2NOV-{A,B,C}.md` dan `STYLE-SYNTHESIS.md`.
   - Mac `~/Documents/Skill-Development/Personal-video/Refference/` (Kinetictypography, effect.mp4; Apple Styele.mp4; Sound efex.mp4).
5. **Mulai bekerja otonom:**
   - Revisi bedah (diff, bukan tulis ulang).
   - Bagian yang dipuji Irfan tetap: BERLOMBA-LOMBA, centang tombol, cahaya natural v11, kalender sky gradient, checklist 3×3, Geist Sans.
   - Alur per perubahan: gerbang 3 segmen → render segmen di Mac (`seg.sh`) → QC contact sheet + earshot (bila audio berubah) → reviewer segar (subagent) → render final sekali → mux dua versi audio → kirim Video 1 & 2 ke Irfan dengan ringkasan jujur.
   - Bila visual/timing berubah, peta bunyi `audio-v20/build.py` dijalankan ulang dari penanda baru (`seg/<nama>.sfx`).

## Kriteria selesai

- Tidak ada pita, scrim, atau shadow besar di belakang teks mana pun. Cek otomatis grep + still di semua teks.
- Kinetic typography VO punya layout bervariasi per beat dan berinteraksi dengan objek; tidak ada lagi baris subtitle datar. Enter/exit tidak sama lebih dari 2× berturut-turut. Kontras ≥ 4,5:1 lewat layering, bukan scrim.
- Tidak ada jeda statis atau mati yang tidak disengaja; gerak objek organik.
- Earshot: tidak ada label kasar (buzz/scratch/engine), sinkron ≤ 100 ms ≥ 90 %, VO jelas di HP.
- Update `STATUS.md`, `LEARNINGS-2NOV.md` (tambah bagian v21), skill bila ada pelajaran baru. Push ke main dengan atribusi commit sesi.
