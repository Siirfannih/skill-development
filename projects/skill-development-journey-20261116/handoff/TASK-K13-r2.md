AWAL SESI: Sutradara sudah menjalankan doctor --fix (izin Irfan 16 Nov: "semua akses diizinkan"). Bila doctor GAGAL HANYA karena baris "skill Codex … salinan, bukan symlink", jalankan ./tools/doctor.sh --fix sekali lalu langsung kerjakan TASK; jangan bertanya.

# TASK-K13-r2 · Builder Codex (Sol 6.1 High) · pemberi: Sutradara claude2
Baca handoff/SPEK-VISUAL.md + REPORT-K13-relay.md (ronde 1). G2 ronde 1: konsep, isi teks, sprite, log bus LULUS. Revisi = koreografi kamera + skala + keterbacaan.
TUJUAN       Penonton sempat membaca tiap kejadian: kamera membawa mata dari satu kejadian ke berikutnya, bukan shot lebar statis.
TEMUAN       T1 semua still: komposisi lebar terus, teks panel ±22 px @1080 tak terbaca di HP, separuh frame kosong.
                Koreografi kamera (semua `heavy` 20–28 f + drift di antaranya, titik zoom = pusat elemen aktif):
                kKayak→+60 f: zoom 1,8× ke panel Claude (baris streaming + spinner terbaca);
                kChatgptKeClaude: pindah ke panel ChatGPT 1,8× (bubble hitam + shimmer), lalu turun ke baris tokoh 1,5× saat amplop terbang ChatGPT→Claude;
                kSebaliknya: tetap di baris tokoh, amplop balik Claude→ChatGPT, lalu bus Claude 2→Claude 1 dengan log monospace ±28 px;
                kSessionBeda: pan ke kanan ke ChatGPT session A→B 1,5×;
                kLoop: reveal-out ke 1,0× menampilkan semua (C06), loop digambar, tahan ≥ 2 dtk.
             T2 tokoh 1,5× lebih besar; jarak antartokoh dirapatkan supaya baris tokoh ±70 % lebar frame.
             T3 label callout: "ChatGPT · session A", "ChatGPT · session B", "Claude 1", "Claude 2" (monospace ±26 px, titik oranye).
             T4 loop: garis kembali dari session B ke Claude 1 dengan kepala panah, satu titik sinyal berjalan di garis (`heavy`), centang muncul berurutan saat titik melewati node (bukan serentak).
FILE BOLEH   remotion/src/komponen/K13-RelayAgen.tsx, remotion/src/komponen/K13/**, remotion/src/komponen/PixelTokoh2D.tsx, remotion/src/uji/K13-entry.tsx, handoff/stills-K13/**, handoff/REPORT-K13-relay.md
FILE JANGAN  semua lainnya.
LULUS BILA   tsc lulus; still f030, f070, f110, f170, f240, f340, f400 (lebar 960).
JANGAN       render video, commit/push.
LAPORAN      bagian "Ronde 2" ≤ 6 baris di REPORT-K13-relay.md.
