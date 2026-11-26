# Kartu C11: kalimat kecil dari riset, ditambah atribusi
Masalah: empat celah kerajinan yang jadi tanda amatir (angka bergoyang, aksara RTL, data tiruan tak masuk akal, "perubahan pengganti" saat revisi tanpa temuan) dan satu klausa disiplin steward. Tidak ada gerbang baru; setiap tambahan satu kalimat, dirumuskan ulang dengan kata sendiri (riset-unslop-karpathy §7: tanpa kutipan lebih dari frasa pendek).
- `references/typography.md` (Indonesia): baris `| Data | Angka, kode |`, sel terakhir: ` · angka berubah memakai digit tabular (font-variant-numeric: tabular-nums) supaya lebar tidak bergoyang`; satu baris sesudah tabel: teks non-Latin atau RTL memakai keluarga yang mendukung aksaranya, arah baca dan animasi per kata mengikuti arah tulis, jangan dipecah per huruf.
- `references/copywriting.md`: butir `Consistent mock data` sesudah `Honest`.
- `references/revisi.md`: butir terakhir daftar Rules: bila frame tidak menunjukkan masalah terukur pada yang disebut, katakan dengan angka; jangan mengganti dengan perubahan lain agar tampak responsif. Ukuran 3.497 B (batas 15.360).
- `references/slop-catalog.md` S-A4: klausa `, unless silence is the chosen beat and is written in DECISIONS.md` ditambah di sel kedua (gejala), kata persis seperti baris yang ada, jadi jalur cadangan rencana tidak dipakai.
- `claude/skill-steward/references/writing.md` §6: klausa `every changed line traces to the stated problem, and unrelated finds go to steward/inbox/` ditambah sesudah `The home matches references/placement.md;` (teks sebenarnya berawalan huruf besar "The", bukan "the" seperti di rencana).
- `claude/skill-steward/references/attribution.md`: dua baris tabel (heydamir/unslop, CC BY 4.0, kredit Damir Sokolovsky + tautan repo, hal yang diadaptasi; multica-ai/andrej-karpathy-skills, MIT dinyatakan, "lisensi dinyatakan, file tidak ada", tanpa pemegang hak cipta), kalimat pembuka "lima" menjadi "tujuh" repositori, dan dalam butir Kewajiban: catatan CC BY untuk unslop serta butir MIT-tanpa-berkas.
Bukti: tes 439 OK; `steward_check` 0 error, 52 peringatan; `sumber_cek` bersih (tidak ada nama sumber di teks instruksi; nama hanya di attribution.md); `cek --ketat` 0 GAGAL; vault tidak berubah.
Catatan: kata "unslop" tidak disebut di teks aturan; baris S-A4 bukan dari unslop, jadi tidak ada di baris atribusinya.
Level: Behavior
Persetujuan: perlu ya pemilik sebelum merge ke main
Cara membatalkan: `git revert` commit ini.
