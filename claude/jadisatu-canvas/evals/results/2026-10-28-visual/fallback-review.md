# Review keamanan fallback snapshot

**Cakupan:** diff `37bf128..30e5821` pada `server/mcp.mjs`, empat kasus tambahan `tests/backend-visual-http.test.mjs`, serta satu kalimat skill terkini tentang `snapshot.status:unavailable`.

**Temuan:** tidak ditemukan masalah keamanan yang memerlukan perbaikan dalam cakupan ini. Tidak ada blocker dari review statis ini.

| Pemeriksaan | Kesimpulan dan bukti |
|---|---|
| Reset/edit saat render | Aman pada jalur fallback yang ditinjau. `mcp.mjs:120–125` membuang hasil capture yang gagal dan membaca ulang `store.board(token.boardId)`; tidak mengembalikan JSON/gambar capture lama. Metadata fallback berasal dari board yang baru dibaca. `snapshot.mjs:15–19,60–64` menolak hasil render jika revisi/generasi berubah. |
| Revocation | Penolakan akses tidak diturunkan menjadi sukses. Fallback hanya menerima status 409/429/503; 401/403 dilempar kembali (`mcp.mjs:120`). Token diperiksa sebelum pembacaan fallback (`:123`) dan setelah handler selesai (`:54`), sementara capture juga memeriksanya. |
| Cakupan board | `mcp.mjs:47–52` menolak token tidak aktif, boardId di luar scope, dan izin write yang salah sebelum handler. Fallback selalu membaca `token.boardId`, bukan board yang sedang dirender atau boardId arbitrer. |
| Isi hasil dan kegagalan | Fallback hanya menyertakan teks/structured data dengan `status:'unavailable'`, alasan generik, revisi/generasi aktif, dan `retryAfter:2`; tidak ada blok image atau pesan internal renderer (`:124–125`). `read_canvas_snapshot` tetap menolak capture yang gagal dan tidak berubah menjadi hasil visual semu. |

Empat kasus baru bermakna: renderer sibuk oleh board lain (`tests/backend-visual-http.test.mjs:50–63`), edit dan reset saat render (`:64–80`, dua kasus), serta kegagalan 503 tanpa membocorkan pesan internal (`:81–87`). Kasus reset secara eksplisit memastikan teks konteks lama tidak ada; kedua kasus perubahan memeriksa pembacaan PNG berikutnya pada revisi baru. Kasus revocation yang sudah ada tetap memakai `read_board` dan memastikan `isError` tanpa image (`:44–48`). Ini penilaian isi pengujian, bukan klaim hasil eksekusi.

Kalimat skill `claude/jadisatu-canvas/SKILL.md:27` akurat: fallback **dapat** berisi data aktif, `snapshot.status`, `reason`, `retryAfter`, tanpa PNG, sehingga tidak boleh dianggap sebagai observasi visual. Catatan redaksional opsional: ubah “renderer sibuk/gagal atau berubah saat render” menjadi “renderer sibuk/gagal atau **board** berubah saat render” agar subjek perubahan jelas. Bukan masalah keamanan.

Tidak menjalankan jaringan, tes, model, atau perubahan runtime. Hanya laporan ini yang ditulis. Review ini tidak menggantikan audit Claude atau pengujian integrasi yang dijalankan terpisah.
