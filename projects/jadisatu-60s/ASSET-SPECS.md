# The Gap: spesifikasi aset gambar (untuk sesi lokal + ChatGPT/Codex)

Pembagian kerja (Irfan, 25 Okt 14:09):
- **Sesi cloud:** menyusun frame, teks, kanvas, layout, kamera, compositing, dan render.
- **Sesi lokal (Mac):** membuat aset gambar dengan ChatGPT/Codex lalu menaruhnya di repo.

Sumber kebenaran per beat: `storyboard.html` (v2). Frame ChatGPT yang disukai Irfan: B02 the gap, Rick Rubin, Not AI company. Frame cloud yang disukai: B03, B04, B16.

## 0. Aturan wajib (berlaku untuk semua aset)

1. **Tanpa teks di dalam gambar.** Semua tulisan (kinetic type) dipasang oleh cloud. Gambar yang berisi teks tidak bisa dianimasikan dan akan ditolak.
2. **Satu objek = satu file, latar transparan** (PNG dengan alpha), kecuali ada catatan "latar penuh". Kamera bergerak di dunia, dan objek ditata di sana sebagai lapisan dengan parallax. Jadi aset harus lapisan, bukan frame jadi.
3. **Latar putih polos.** Tanpa bayangan daun, tanpa tekstur kertas di latar, tanpa vignette (D-024). Bayangan lembut di bawah objek boleh, tapi dalam file terpisah `*-shadow.png`, atau biarkan cloud yang membuatnya.
4. **Tanpa abu-abu.** Gunakan palet: biru kobalt #2563EB, coral/terakota #F97066, navy #0F172A, putih #FFFFFF, putih hangat #FAF8EC. Foto boleh punya warna alami, tapi grade-nya hangat dan tidak pudar.
5. **Cahaya konsisten:** matahari lembut dari kiri atas, ±45°, hangat. Semua aset harus terlihat seperti difoto di meja yang sama.
6. **Ukuran:** sisi terpanjang minimal 3000 px, sRGB. Nama file `B##-nama.png`, simpan di `projects/jadisatu-60s/assets/`, lalu commit + push ke branch `claude/project-thread-742xsr`.
7. **Tokoh nyata (Ira Glass, Rick Rubin) tidak boleh dibuat oleh AI untuk versi final.** Lihat §3.

## 1. Motif utama: vas kobalt (dari frame ChatGPT, dipertahankan)

Vas keramik biru kobalt bermotif bintik putih, di atas balok terakota. Vas ini menjadi "karya" sepanjang video:
- **foto vas** = selera (bentuk yang kamu tahu bagus)
- **sketsa pulpen biru vas yang sama** = kemampuan (hasil yang belum sampai)

Satu vas ini harus identik di semua aset: bentuk, motif bintik, dan balok yang sama. Buat lembar referensi dulu (A00), lalu pakai sebagai acuan setiap prompt berikutnya.

## 2. Daftar aset

| ID | Beat | Aset | Latar | Catatan |
|---|---|---|---|---|
| A00 | semua | Lembar referensi vas: depan, 3/4, samping | putih | untuk konsistensi, tidak tampil di video |
| A01 | B01, B06, B23 | Cetakan foto vas di atas balok terakota, berbingkai putih seperti print fisik, sedikit miring | transparan | "selera". Versi lurus + versi miring 6° |
| A02 | B01, B06 | Sketsa pulpen biru dari vas yang sama, di kertas buku bergaris yang robek di tepi. Proporsinya sengaja meleset sedikit (leher terlalu panjang, badan tidak simetris) | transparan | "kemampuan". Kesalahannya harus terlihat oleh mata awam |
| A03 | B03 | 16 cetakan "karya" terpisah: 6 foto pesisir/arsitektur, 4 potret close-up (tidak mirip orang terkenal), 3 varian vas, 3 sketsa | transparan, 1 file per cetakan | Untuk flashbang. Nanti diganti draft asli Irfan bila tersedia (lebih personal) |
| A04 | B04 | *Bukan gambar.* 5 klip footage asli (lihat storyboard B04) | — | ChatGPT tidak membuat video. Pakai stok atau rekam sendiri |
| A05 | B04, B17 | Tangan memegang pensil coral sedang melingkari cacat di cetakan vas (A01) | transparan | tangan + pensil terpisah dari cetakan bila bisa |
| A06 | B17 | 4 cetakan percobaan vas yang gagal (glasir pecah, bentuk miring, warna salah, retak) | transparan, 1 file per cetakan | coretan merah dibuat oleh cloud, bukan di gambar |
| A07 | B18 | 5 cetakan vas varian, satu jelas paling bagus | transparan, 1 file per cetakan | bingkai pilih dibuat oleh cloud |
| A08 | B19 | Kaca pembesar hitam (lensa kosong, bisa ditembus) | transparan | isi lensa dibuat oleh cloud dari foto di bawahnya |
| A09 | B22 | Tangan berjas menarik cetakan vas dari tumpukan | transparan | tangan + cetakan terpisah bila bisa |
| A10 | B24 | Balok terakota kosong (tanpa vas) | transparan | logo Jadisatu "duduk" di atasnya. Logo SVG dari Irfan |
| A11 | B05, B09 | *Bukan gambar.* UI prompt dibangun ulang oleh cloud dari screenshot asli | — | — |
| A12 | B02, B13, B20, B21 | Foto Ira Glass dan Rick Rubin | — | lihat §3 |

## 3. Tokoh nyata: alasan tidak memakai wajah buatan AI

Frame ChatGPT untuk Ira Glass dan Rick Rubin bagus secara komposisi. Tapi wajahnya buatan AI.
- **Risiko etis dan hukum:** wajah orang nyata yang dibuat AI lalu dipakai di video brand bisa dianggap memalsukan kemiripan seseorang.
- **Risiko pesan:** video ini justru membela taste manusia melawan generate-an AI. Kalau penonton sadar wajah tokohnya palsu, argumennya runtuh di depan mata mereka.

Yang dipakai dari frame ChatGPT adalah **komposisinya**: latar putih, wajah close-up di kiri, teks besar di kanan, dan kamera push. Fotonya harus asli: foto berlisensi (Getty/Alamy/editorial) atau tangkapan layar dari wawancara yang dikutip (fair use untuk komentar, dengan sumber disebut). ChatGPT boleh membantu **memotong latar dan meluaskan kanvas** dari foto asli, tapi tidak boleh mengubah wajahnya.

## 4. Prompt dasar (awali setiap prompt dengan ini)

> Product still-life photograph for an Apple-style brand film. Pure white seamless background (#FFFFFF), no props, no plants, no paper texture, no text, no watermark. Soft warm sunlight from top-left at 45°, gentle contact shadow only. Colour palette strictly cobalt blue #2563EB, terracotta/coral #F97066, navy #0F172A and white; no grey tones, no desaturated look. Shot on 85mm, f/5.6, everything in focus. Isolated subject on transparent background (PNG with alpha), 4000px.

Lalu tambahkan deskripsi objek dari tabel §2. Untuk aset vas, lampirkan A00 sebagai referensi gambar.

## 5. Cara serah terima

1. Sesi lokal menaruh file di `projects/jadisatu-60s/assets/`, lalu commit + push.
2. Sesi lokal memberi tahu sesi cloud ID aset yang sudah masuk.
3. Sesi cloud memasang aset ke storyboard v3 (frame HTML), memeriksa konsistensi vas, cahaya, dan palet, lalu mengembalikan aset yang tidak lolos beserta alasannya.
