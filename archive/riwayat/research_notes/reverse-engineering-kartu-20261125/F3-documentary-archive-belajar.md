# F3 · Jejak Belajar Tema `documentary-archive` (15 Kartu Utama)

Dokumen ini merekam jejak belajar langsung dari pembacaan file `_vault/**/*.md` dan pengamatan keyframe `.jpg` asli di `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/` untuk 15 kartu utama tema `documentary-archive`. Seluruh klaim gerak, animasi, transisi, dan tempo dari kartu yang berstatus `dilihat_bergerak` bukan `ya` ditandai eksplisit `(belum dilihat bergerak)`.

---

## Kartu 04 · Centerline Weight-Contrast Caption

- **Kasus:** `04` (`claude/motion-graphic/cookbook/_vault/02-typography-and-captions/04-centerline-weight-contrast-caption.md`) | Keyframe dibuka:
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/04-k1-arsip-foto-teks.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/04-k2-kartu-merah.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/04-k3-logo-terang.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/04-k7-kliping-majalah.jpg`
  | `dilihat_bergerak: tidak`
- **Yang terlihat:**
  - Di `04-k1-arsip-foto-teks.jpg` (9:16), foto potret Alexandr Wang memenuhi layar tanpa bingkai (`±90%` tinggi frame, bahu-dada memenuhi lebar frame); wajah di sepertiga atas, sedangkan kata tunggal putih sans bold kecil `"Alexander"` (`2,0–2,8%` tinggi frame) duduk tepat di garis tengah vertikal (`y 50,08%`) menimpa area dada/dasi gelap tanpa kotak atau bayangan, dan seluruh gambar dilapisi raster titik halftone halus (periode `±2,6 px` pada `720p`).
  - Di `04-k2-kartu-merah.jpg`, bidang polos merah tua (`#BE0011`–`#BF0012`) ber-vignette sudut `±13%` lebih gelap hanya memuat satu frasa sambung serif italic tipis putih `"they want"` tepat di `y ±50%`.
  - Di `04-k3-logo-terang.jpg`, latar kertas abu terang bergrain kasar (`#D9D9D9`–`#E3E3E3`) menaruh logo monokrom hitam `"scale"` di tengah (`lebar 42,92%`, tinggi wordmark `3,8–4,9%`) dengan caption angka serif italic hitam kecil `"$5"` di atasnya (`y 34,5%`, tinggi `2,3–2,9%`).
  - Di `04-k7-kliping-majalah.jpg`, kliping cetak majalah Forbes (`±55×70%` frame) diletakkan sedikit miring di atas latar merah tua dengan bayangan lembut miring dan pencahayaan diagonal (sudut kanan atas merah lebih gelap `L 75` vs kanan bawah `L 161`).
  - Menurut pengukuran di kartu (`belum dilihat bergerak`), teks tumbuh menumpuk sebaris (`1–4` kata) lalu diganti utuh oleh hard cut (`±59,9–83,9 cut/menit`, median shot `0,8 dtk`), sementara foto digerakkan push/pull/pan virtual kecil (`±10%/dtk` di `41` shot terukur).
- **Kenapa ini bekerja:**
  - Mengunci garis tengah (`y 50%`) pada ukuran huruf seragam (`2,0–2,8% H`) membuat mata penonton tetap diam di satu titik fokus meski gambar berganti cepat tiap `±0,8 dtk` `(belum dilihat bergerak)`. Perbedaan bobot/keluarga di baseline yang sama (serif miring tipis vs sans grotesk tebal) terbaca sebagai penekanan intonasi suara tanpa perlu mengubah skala teks.
  - Raster halftone tunggal di seluruh foto, kartu merah, dan kliping mengikat sumber gambar yang berbeda kualitasnya menjadi satu bahasa arsip, sementara kartu merah polos (`±16%` durasi) dan kartu logo kertas abu (`±16%` durasi) memecah kepadatan foto agar tidak melelahkan.
- **Prinsip yang bisa dipindah ke konten lain:**
  - Gunakan satu sumbu tetap (`y 50%`) hanya jika foto potret memenuhi layar dengan area tengah gelap/netral (jas, kaus gelap, ruang dada) dan wajah aman di sepertiga atas (`y 15–40%`).
  - Saat memakai foto/arsip dari banyak sumber berbeda kualitas, lapis seluruh bidang dengan satu tekstur pemersatu (halftone/grain `opacity 0,10–0,15`) dan sisipkan kartu warna datar minimal `15%` durasi total sebagai jeda napas di frasa sambung.
- **Cara menerapkannya di konteks baru:**
  - Di proyek profil pendiri atau sejarah brand `Jadisatu`/`Behindwork` (`1080×1920` atau `1920×1080`), kunci blok caption `1–4` kata di `y 50%` dengan tinggi huruf `2,4–3,0% H` (`±46–58 px` di `1080p` lebar/tinggi sesuai orientasi; `rasio ukuran sans:serif = 1:1`), pisahkan kata sambung (*Instrument Serif Italic*) dan kata kunci (*Inter Display Bold*). Setiap `3–5` foto tokoh, selipkan kartu warna brand solid (`#101216` atau `#F5F5F7`) selama `0,5–1,0 dtk` untuk frasa transisi, dan pada logo klien/perusahaan tempatkan logo monokrom `25–43%` lebar di `y 50%` dengan angka/keterangan konteks di `y 34–35%`.

---

## Kartu 18 · Sentence-Role Scene Matching

- **Kasus:** `18` (`claude/motion-graphic/cookbook/_vault/06-script-and-story/18-sentence-role-scene-matching.md`) | Keyframe dibuka:
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/18-k1-wajah-caption.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/18-k2-lukisan-teks.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/18-k3-garis-teks.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/18-k5-ilustrasi-tengah.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/18-k8-teks-biru.jpg`
  | `dilihat_bergerak: tidak`
- **Yang terlihat:**
  - Di `18-k1-wajah-caption.jpg` (9:16), wajah pembicara mengisi sepertiga atas-tengah, sementara di bawah dagu (`pusat x 50%, y 58%`, menimpa area dada/mikrofon) terdapat tumpukan `≤ 5` kata: `"There are"` kecil (`±1,85% H`) duduk di celah kiri-atas tepat di atas kata hero sans bold `"transitories"` (`±6,0% H`), tanpa kotak.
  - Di `18-k2-lukisan-teks.jpg`, lukisan klasik memenuhi frame di sebelah kiri (`±76×68%`), sedangkan dinding kosong lukisan di kanan atas menampung kolom teks rata kiri (`lebar kolom 37–40%`, `pusat x 72–74%, y 29–35%`): kata pengantar sans kecil `"And I fell in love / with a girl in"` dipasangkan dengan serif italic besar `"San / Diego."` (`5,4–7,1% H`).
  - Di `18-k3-garis-teks.jpg`, di atas kertas putih dingin ber-halftone tipis (`#F0F0F2`) dan vignette sudut tipis (`±7%`), sebuah garis biru elektrik tebal (`6,8%` lebar panel) melengkung dari kiri bawah dan berhenti tepat di bawah kata hero `"agility"` (`9,8% H`) dengan kata sambung kecil `"because you"` dan `"have the"` di celah atas kiri-kanan kata utama.
  - Di `18-k5-ilustrasi-tengah.jpg`, figur biru bertekstur cat kasar dengan tepi "berdarah" duduk di separuh bawah (`62×61%` frame, pusat `45, 68%`) dengan halo biru muda buram di belakang kepala; teks mengapit sisi kiri-kanan kepala dan di atas kepala (`"Because it was"`, `"secure"`, `"and because it was / low..."`, satu kata di kanan tampak kabur saat masih proses muncul `(belum dilihat bergerak)`).
  - Di `18-k8-teks-biru.jpg`, kanvas biru gelap ber-vignette radial (`#233993` tengah ke `#0C1644` sudut) menampilkan kutipan `3` baris rata tengah-kiri (`lebar blok 82%`) dengan tanda kutip penutup sejajar baris, kontras ukuran antara `"that's what it means to live an"` kecil, `"entrepreneurial"` besar bold (`4,8% H`), dan `"life"` serif italic (`7,7% H`) dengan blur gerak `(belum dilihat bergerak)`.
  - Menurut catatan bedah `(belum dilihat bergerak)`, porsi pembicara `±35%` dan adegan grafis/lukisan `±65%` (`27,4 cut/menit`, median `1,7 dtk`), pemilihan adegan dipicu peran kalimat (umumkan kategori → wajah; jelaskan → lukisan/grafik; ulang kata → grafik naik; sebut orang → callout), dan tekstur cat/kertas menempel ke tiap layer bukan mengambang statis di atas komposisi.
- **Kenapa ini bekerja:**
  - Menghubungkan jenis adegan langsung ke fungsi kalimat mencegah montase terasa acak; pembicara di awal menjaga koneksi manusia, lalu lukisan/grafik memperagakan poinnya saat penjelasan masuk.
  - Rasio skala kata kunci terhadap kata sambung `≥ 3:1` (mis. `6,0–8,8%` vs `1,6–1,9%`) dengan kata sambung diletakkan di celah dekat kata hero menciptakan satu kelompok baca yang padat sekaligus menjaga wajah dan objek tidak tertutup.
  - Tekstur kertas/cat yang menempel per layer dan hanya satu warna aksen biru (`#0F69DF`–`#1F5FE0`) menjaga klip wawancara, lukisan klasik, dan ilustrasi terasa berasal dari satu film yang sama.
- **Prinsip yang bisa dipindah ke konten lain:**
  - Buat tabel pemetaan **peran kalimat → jenis adegan** sebelum animasi: pembuka/pengumuman kategori tetap di pembicara (`±35%`), cerita personal/sejarah ke lukisan/foto arsip dengan kolom teks `≤ 40%` lebar di ruang dinding/latar kosong, rangkaian kata kunci ke grafik penuntun garis, dan ide tunggal ke ilustrasi satu subjek di separuh bawah.
  - Gunakan maksimal `≤ 5` kata per tampilan dengan rasio kata kunci : kata sambung `≥ 3×`, kata sambung `1` ukuran saja menempel di celah atas/bawah kata hero, dan hindari radial biru terlalu kecil yang menyisakan pinggiran gelap aneh di dalam frame.
- **Cara menerapkannya di konteks baru:**
  - Untuk konten esai/podcast `@siirfannih` atau `Jadisatu` (`9:16`, `1080×1920`), pertahankan talking head `30–40%` durasi untuk hook dan peralihan bab, lalu potong ke arsip foto/lukisan/UI di `60–70%` sisanya pada tengah kalimat dua bagian (`median 1,5–2,0 dtk`, `(belum dilihat bergerak)`). Di foto arsip dengan tokoh di kiri, tempatkan kolom teks di `x 60–90%` (`lebar ≤ 38%`) setinggi `y 25–45%`; gunakan *Inter Bold* (`115–170 px`) untuk hero, *Inter Regular* (`32–44 px`) untuk kata sambung, dan *Instrument Serif Italic* (`100–140 px`) khusus kata emosional/nama tempat, ditambah `1` warna aksen merek saja.

---

## Kartu 19 · Archive Photo Spotlight

- **Kasus:** `19` (`claude/motion-graphic/cookbook/_vault/03-spatial-and-ui-layouts/19-archive-photo-spotlight.md`) | Keyframe dibuka:
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/19-k1-inset-foto-teks.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/19-k2-sorot-wajah-kapital.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/19-k3-teks-zoom-through.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/19-k6-footage-caption.jpg`
  | `dilihat_bergerak: tidak`
- **Yang terlihat:**
  - Di `19-k1-inset-foto-teks.jpg` (16:9), latar hitam pekat dengan vignette radial lembut menampung satu foto arsip kelompok berbingkai putih tipis (`±0,6%` lebar frame, ukuran kartu `36,2×36,7%` frame) tepat di tengah; dua frasa serif italic putih berpendar lembut (`#FEFCFE`, tinggi `±6,25%`) mengapit sejajar garis tengah di kiri (`x ±19%`) dan kanan (`x ±81%`) membaca `"class photos in [foto] startup history"`.
  - Di `19-k2-sorot-wajah-kapital.jpg`, foto kelompok yang sama dibuat penuh layar tetapi kerumunan didesaturasi abu-abu redup (`saturasi ±5`) dan diburamkan (`blur`), kecuali satu wajah di tengah (`±16×31%` frame) yang tetap berwarna hangat dan diberi cahaya halo hangat kekuningan di belakang kepala; tiga kata serif kondensasi KAPITAL putih berpendar (`11,6–13,2% H`) duduk sebaris pada garis dada `"HE  BUILT  REDDIT"` (`x 18/50/81%, y 56,7%`), mengapit bahu-dada tanpa menutup wajah tersorot.
  - Di `19-k3-teks-zoom-through.jpg`, huruf putih berpendar raksasa (`>60%` tinggi frame, memotong tepi) berada di depan foto kelompok penuh warna dalam fase melintas/zoom-through `(belum dilihat bergerak)`.
  - Di `19-k6-footage-caption.jpg`, rekaman kerja nyata di monitor ruang gelap bernuansa oranye-cokelat hangat (`#53372D`, vignette ringan) menaruh satu frasa serif italic putih berpendar `"no distractions"` (`5,2–5,3% H`) tepat di celah gelap antara kepala subjek di kiri-tengah dan monitor terang di kanan.
  - Menurut catatan pengukuran `(belum dilihat bergerak)`, kata menyala per kata di tempat tanpa translasi, berpindah ke montase kilat (`9` batas flash `1–2 f`, inversi negatif `2 f`, whip blur, serta sub-bass drop `+18 dB` di titik pindah arsip → angkatan baru), dengan kepadatan `≥ 50` batas shot (`≥ 90 cut/menit`) dan musik berganti di tiap babak.
- **Kenapa ini bekerja:**
  - Didesaturasinya kerumunan bersama blur ringan menurunkan kompetisi visual seketika; wajah berwarna + halo hangat otomatis menjadi satu-satunya titik tarik mata tanpa perlu panah atau kotak, dan penempatan kapital di garis dada memanfaatkan area tubuh yang tidak mengandung informasi wajah.
  - Pemisahan grade antara arsip lama (abu-abu redup / hitam-putih / inset di hitam pekat) dan dunia baru (footage hangat oranye-cokelat) memberi penanda waktu ("dulu vs sekarang") secara visual tanpa perlu label tanggal di layar.
  - Teks satu ukuran per adegan yang hanya menyala di tempat (plus glow putih tipis di latar gelap/padat) menjaga ritme sinematik agar perhatian tetap ke foto, tidak ke loncatan animasi teks.
- **Prinsip yang bisa dipindah ke konten lain:**
  - Ketika membahas satu orang/produk dari foto kelompok/rak ramai, pakai aturan 3 lapis: latar kelompok `grayscale + blur + brightness 0,55` → mask subjek utama berwarna penuh + halo radial hangat di belakangnya → teks serif/judul pendek di garis dada atau celah kosong (`≤ 5` kata, ukuran seragam dalam adegan).
  - Gunakan dikotomi grade warna untuk memisahkan era/status narasi: arsip/masalah = monokrom abu redup atau inset di hitam murni; kenyataan baru/solusi = footage hangat penuh layar dengan vignette ringan.
- **Cara menerapkannya di konteks baru:**
  - Di video studi kasus pendiri atau kisah tim `Behindwork`/`Jadisatu` (`16:9` `1920×1080`), buka dengan foto kelompok dalam bingkai putih `6–10 px` berukuran `36%` frame di atas `#000000` dengan frasa pengapit di `x 19%` dan `81%`, lalu potong/zoom ke wajah penuh dengan kerumunan di-desaturasi (`saturate(0) blur(2px) brightness(0.55)`). Taruh `1–3` kata kapital *Instrument Serif* (`125–140 px @1080p`) di `y 56–60%` di bawah dagu/garis dada, dan tandai transisi "dulu → sekarang" dengan `1` teks skala besar melintas plus flash putih `1–2` frame `(belum dilihat bergerak)` masuk ke B-roll ruang kerja hangat.

---

## Kartu 21 · Beat-Locked Day Montage

- **Kasus:** `21` (`claude/motion-graphic/cookbook/_vault/01-camera-and-transitions/21-beat-locked-day-montage.md`) | Keyframe dibuka:
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/21-k1-teks-tangan.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/21-k2-ruang-lebar.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/21-k3-punggung-teks.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/21-k4-closeup-tangan.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/21-k8-malam-turntable.jpg`
  | `dilihat_bergerak: tidak`
- **Yang terlihat:**
  - Di `21-k1-teks-tangan.jpg` (16:9), sudut kamera rendah di kolong ranjang menampilkan kaki berkaus putih sebagai objek depan gelap/siluet di kiri-tengah, meja kerja terang di latar belakang, dan kerangka besi ranjang di kanan; tulisan tangan spidol putih rata kiri `"ITS / DAY / 310"` (`4,8–5,7% H`) menempel di area gelap di samping tiang besi ranjang (`x ±81%, y 32%`).
  - Di `21-k2-ruang-lebar.jpg`, ruangan kamar diambil dengan lensa ultra-lebar sehingga subjek di meja tampak kecil (`±14×50%` frame) dikelilingi tepi gelap/lapis depan kanan atas, grade siang pudar bernoda ungu pada bayangan (`#120F14`–`#18141A`) dan sorot hijau-krem (`#C7CABA`), sementara satu baris caption tulisan tangan putih kecil `"WITHOUT A BOSS"` (`3,06% H`) berada di pita bawah-tengah di atas karpet.
  - Di `21-k3-punggung-teks.jpg`, framing berubah ke shot sedang dari belakang punggung subjek menghadap kalender dan meja (`±39×70%`), tumpukan tulisan tangan `"YOOOO, / WHAT'S / THE / UPDATE?"` menempel di celah kanan kepala dekat kap lampu hangat (`x 68%, y 49%`).
  - Di `21-k4-closeup-tangan.jpg`, skala melompat ke close-up POV tampak atas tangan memegang kardus paket (`41%` lebar frame, mengisi penuh bingkai dengan pola karpet di bawah), lalu di `21-k8-malam-turntable.jpg`, keseluruhan palet bergeser ke oranye-tembaga pekat malam (`median #5A1F13`, saturasi `57%` vs `17–30%` siang) dengan piringan hitam putih tampak atas mengisi tengah frame (`46×84%`).
  - Menurut pengukuran `(belum dilihat bergerak)`, seluruh transisi adalah hard cut tanpa transisi efek, `58%` cut jatuh dalam `±80 ms` ketukan musik `96–98 bpm` dengan kepadatan meningkat dari lambat (`1,4–3,9 dtk`, `0–7,7 dtk`) ke sedang (`0,5–2,5 dtk`) ke sangat rapat (`0,4–0,6 dtk`), lalu diperlambat kembali ke `1,0–1,2 dtk` plus dua jeda musik `0,3 dtk` dan kamera mundur `0,71×` di penutup.
- **Kenapa ini bekerja:**
  - Pergantian skala yang ekstrem antar-shot (ruang ultra-lebar di mana manusia hanya `11–14%` tinggi vs close-up POV tangan/objek mengisi frame) menciptakan dinamika visual meski tanpa grafik atau transisi efek.
  - Perubahan grade dari siang pudar dingin (`saturasi 17–30%`) ke malam oranye pekat (`saturasi 57%`) menjadi penanda waktu dan kedalaman emosi tanpa memerlukan kartu teks.
  - Penempelan tulisan tangan berukuran konsisten kecil (`3–5% H`) pada celah gelap di dekat benda properti membuat teks terasa bagian dari ruangan, tidak mengganggu visual saat vlog berpindah ke montase murni.
- **Prinsip yang bisa dipindah ke konten lain:**
  - Selang-selingkan komposisi ruang lebar (`subjek ≤ 15%` lebar frame dengan benda depan gelap di tepi) dan close-up aksi tangan POV (`≥ 40%` lebar frame) tiap `1–2` shot agar montase dokumenter harian terasa berdimensi.
  - Gunakan dua kondisi color grading terpisah untuk menandai peralihan fase waktu/emosi (misal awal/masalah: pudar dingin bersaturasi rendah `20–30%`; penutup/solusi: hangat pekat bersaturasi tinggi `50–60%`), sambil menaikkan lalu menurunkan kerapatan cut sesuai kurva energi musik `(belum dilihat bergerak)`.
- **Cara menerapkannya di konteks baru:**
  - Pada vlog proses kerja/founder `day-in-life` `@siirfannih` (`16:9` atau `9:16` dengan B-roll sendiri), tahan pembuka `0–7 dtk` pada shot `1,5–3,5 dtk` disertai `2–3` frasa tulisan tangan/marker kecil (`3–5% H`, `32–54 px @1080p`) yang menempel di area gelap samping benda kerja (`x 68–82%`), kemudian masuk montase tanpa teks di tengah (`0,4–0,6 dtk` per shot di ketukan musik `(belum dilihat bergerak)`), selang-selingkan wide shot studio vs close-up tangan mengetik/membuka sketsa, dan tutup kembali di meja yang sama dengan grade hangat malam serta kamera mundur perlahan `(belum dilihat bergerak)`.

---

## Kartu 32 · Presenter Archive Intercut

- **Kasus:** `32` (`claude/motion-graphic/cookbook/_vault/01-camera-and-transitions/32-presenter-archive-intercut.md`) | Keyframe dibuka:
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/32-k1-wajah-caption.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/32-k2-arsip-berita.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/32-k3-judul-angka-tekstur.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/32-k4-gravir-kertas.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/32-k6-dokumen-ui.jpg`
  | `dilihat_bergerak: tidak`
- **Yang terlihat:**
  - Di `32-k1-wajah-caption.jpg` (4:3), presenter berkaos marun (`#78414B`) di ruang hangat berdinding cokelat (`#563522`, bokeh latar + vignette sudut `0,74×`) memiliki caption sans grotesk bold putih rapat `"renaissance"` (`±14,3% H`) tepat di dada (`y 76,3%`, menutup sebagian mikrofon genggam), sementara dua kata sambung kecil `"of a"` dan `"new"` mengapit wajah di kiri dan kanan (`x ±23%` dan `77%`), dan jari tangan kanan pembicara masuk sebagai lapis depan buram di depan huruf `"ce"`.
  - Di `32-k2-arsip-berita.jpg`, arsip siaran berita penuh layar (`4:3`) mempertahankan pita berita asli di bawah, sementara ruang kosong di kiri dan kanan wajah pembawa berita diisi dua kata putih bersih `"News"` dan `"stations"` setinggi bahu/telinga.
  - Di `32-k3-judul-angka-tekstur.jpg`, kartu pembuka zaman menaruh angka tahun raksasa `"1440"` (`±45,7% H`, `±90%` lebar) berisi potongan lukisan Michelangelo berwarna krem hangat, dikontraskan dengan lukisan yang sama di latar belakang yang di-grade biru tua/negatif (`#10132F`), dengan subjudul putih `"The year is"` di atas angka (`y 25%`).
  - Di `32-k4-gravir-kertas.jpg`, gravir tokoh sejarah (Gutenberg) memenuhi separuh kiri frame di atas tekstur kertas abu kusut (`#D8D6DB`), sementara kolom teks grotesk rata kiri menempel di samping wajah (`x 45–73%`): `"invents / the / printing / press."` hitam seluruhnya kecuali satu kata kunci `"printing"` berwarna merah `#CB1F28`.
  - Di `32-k6-dokumen-ui.jpg`, halaman artikel web putih (`#FDFBFE`) ditampilkan miring (`rotateX/Z`) dengan blur kedalaman hanya pada tepi dan paragraf di kiri-atas/bawah, sedangkan blok fokus tengah (`"this guy / decided"` hitam bold), kalimat bukti ber-stabilo biru muda tipis di belakangnya, potret tokoh berbingkai tajam di kanan (`28,5%` lebar dengan ikon kaca pembesar di pojok), dan panah merah melengkung tangan menunjuk potret tampil tajam sepenuhnya.
  - Menurut pengukuran `(belum dilihat bergerak)`, presenter kembali tiap `2–5 dtk` sebagai jangkar di sela sisipan arsip sepanjang `105 cut` (`69,4/menit`, median `0,71 dtk`), yang memotong keras tepat pada kata yang diilustrasikan; babak sejarah `1440` sengaja melambat (`56/menit`) sebagai kontras tempo.
- **Kenapa ini bekerja:**
  - Setiap sisipan arsip jatuh tepat pada satu kata/klaim literal (berita untuk `"News stations"`, gravir Gutenberg untuk penemuan mesin cetak), sementara presenter yang selalu muncul kembali setiap `2–5 dtk` mencegah video terasa seperti kumpulan klip acak.
  - Memisahkan teks di dada (`y 72–76%`) atau mengapit di kiri-kanan telinga pada footage berita menjaga wajah presenter dan narasumber tetap utuh, sedangkan pada dokumen artikel miring, mengaburkan tepi sambil menjaga potret dan kata kunci tetap tajam mengarahkan mata ke bukti tanpa mengorbankan keaslian dokumen.
  - Membatasi aksen warna menjadi tepat `1` per still (`#CB1F28` di kertas kusut atau panah merah + stabilo biru muda di artikel) memastikan hierarki langsung terbaca dalam shot `< 1 dtk`.
- **Prinsip yang bisa dipindah ke konten lain:**
  - Ketika memadukan narator kamera dan arsip bukti berdensitas tinggi (`> 60 cut/menit`, `(belum dilihat bergerak)`), kembalikan shot pembicara minimal setiap `2–5 dtk` untuk mereset jangkar cerita, dan tahan kartu bab/era lebih lama agar ritme punya lembah napas.
  - Untuk kutipan artikel atau halaman web sebagai bukti argumen, jangan blur seluruh halaman: miringkan bidang (`3–8°`), blur hanya di tepi luar/paragraf pengisi, pertahankan kalimat bukti + potret tajam di tengah/sisi dengan `1` warna penunjuk (stabilo lembut + panah tipis).
- **Cara menerapkannya di konteks baru:**
  - Untuk video esai/analogi `@siirfannih` atau studi kasus klien (`4:3` atau `9:16`), gunakan presenter bermikrofon di ruang hangat sebagai poros (kepala `45–55%` tinggi frame, caption `1–3` kata di dada `y 72–76%`, tanpa kotak/outline). Tiap klaim produk/sejarah, potong keras tepat di onset kata `(belum dilihat bergerak)` ke kliping berita/dokumen di atas alas kertas kusut `#D8D6DB` (kolom teks rata kiri `x 45–75%` menempel wajah gravir/foto dengan tepat `1` kata merah `#C91F29`), atau ke kartu zaman berangka `40–50%` tinggi berisi foto terang di atas latar ber-grade biru tua `#10132F`.

---

## Kartu 39 · Selective-Color Group Index

- **Kasus:** `39` (`claude/motion-graphic/cookbook/_vault/03-spatial-and-ui-layouts/39-selective-color-group-index.md`) | Keyframe dibuka:
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/39-k1-foto-kelompok.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/39-k2-kartu-judul.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/39-k3-arsip-caption.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/39-k4-kata-besar.jpg`
  | `dilihat_bergerak: tidak`
- **Yang terlihat:**
  - Di `39-k1-foto-kelompok.jpg` (16:9), foto kelompok YC kembali dipakai sebagai panggung indeks: dua tokoh depan yang dibahas (Sam Altman & Paul Graham) tetap berwarna utuh dan lebih besar, sementara figur di latar belakang didesaturasi abu-abu dan dibuat lebih buram; nama besar `"Paul Graham"` semi-transparan (`13,23% H`) duduk di **belakang** lapisan kepala Paul Graham, sedangkan kata sambung kecil putih `"next to"` (`±3,9% H`) berada di celah kosong atas tepat di antara kepala tokoh.
  - Di `39-k2-kartu-judul.jpg`, kanvas jeda putih bergradien radial lembut (`#FCFAFD` pusat → `#CDCACE` sudut) hanya berisi satu frasa sans grotesk hitam `"Five thousand more"` (`4,0% H`, rata tengah di `x ±50%, y ±50%`).
  - Di `39-k3-arsip-caption.jpg`, pada arsip wawancara Garry Tan berlaptop, frasa putih kecil `"before it"` (`3,9% H`) dikunci di pusat frame (`y ±50%`); karena wajah tokoh pada shot ini juga turun ke garis tengah, caption putih tersebut menyentuh area dagu/bibir tokoh — bukti konkret keterbatasan posisi tengah terkunci.
  - Di `39-k4-kata-besar.jpg`, di atas foto uang dolar agak kabur, satu nilai angka putih `"$43 Million"` (`11,98% H`, rasio `±3×` dari caption standar) duduk di tengah frame tanpa kotak.
  - Menurut pengukuran di kartu `(belum dilihat bergerak)`, foto kelompok dikunjungi ulang `5×` sebagai jangkar indeks dengan push lambat ke tokoh aktif (`+8–13%` ke kiri-atas), sementara montase arsip melaju di `74–83 cut/menit` (median `0,5–0,58 dtk`), diselingi kartu jeda putih/hitam polos dan kilat putih/negatif/RGB-split.
- **Kenapa ini bekerja:**
  - Menggunakan satu foto kelompok yang sama sebagai indeks berulang (`5×`) memberi peta mental bagi penonton tentang siapa saja yang terhubung sebelum masuk ke arsip masing-masing tokoh; pemisahan warna selektif + lapisan teks besar di belakang kepala menciptakan kedalaman 3 lapis tanpa animasi 3D rumit.
  - Kartu jeda putih/hitam polos bergradien vignette sangat ringan di tengah montase arsip `±0,58 dtk` memaksa mata melambat sesaat agar klaim besar ("five thousand more") sempat dicerna sebelum ritme kembali ngebut `(belum dilihat bergerak)`.
- **Prinsip yang bisa dipindah ke konten lain:**
  - Ketika cerita bercabang ke `≥ 3` tokoh atau produk dari satu himpunan yang sama (tim, angkatan, kumpulan proyek), jadikan satu foto/tampilan indeks utama yang dikunjungi berulang dengan menyorot berwarna + memperbesar (`1,08–1,13×`) satu target aktif setiap kembali.
  - Jangan mengunci caption di `y 50%` secara membabi buta di atas arsip wawancara (`39-k3`): bila subjek di shot arsip mengisi garis tengah, pindahkan caption ke ruang dada/samping kepala atau beri jeda kartu polos seperti `39-k2`.
- **Cara menerapkannya di konteks baru:**
  - Dalam konten `Behindwork` tentang ekosistem startup/kreator atau bedah `3` produk sekaligus (`16:9` `1920×1080`), pakai satu foto tim/papan indeks yang disorot bergantian (hanya `≤ 30%` area frame berwarna, sisanya abu-abu + `blur(2px)`), taruh nama tokoh ukuran `12–13% H` (`±130–140 px @1080p`) di belakang kepala/bahu (pakai matte cutout) dan kata sambung `3,8–4,0% H` (`±42 px`) di celah atas antar-kepala. Selipkan `1` kartu jeda off-white `#FAF7FB` untuk klaim rekor tiap `15–20 dtk` dan pakai angka besar `12% H` (`±130 px`) hanya di atas arsip literal uang/data yang diburamkan tipis `3 px`.

---

## Kartu 46 · Giant-Word Scale Jump

- **Kasus:** `46` (`claude/motion-graphic/cookbook/_vault/02-typography-and-captions/46-giant-word-scale-jump.md`) | Keyframe dibuka:
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/46-k1-pembuka-monitor.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/46-k2-kolase-kotak-kata.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/46-k3-kata-raksasa.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/46-k4-kata-kecil-tersebar.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/46-k5-kata-latar-ubin.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/46-k6-pasangan-skala.jpg`
  | `dilihat_bergerak: tidak`
- **Yang terlihat:**
  - Di `46-k1-pembuka-monitor.jpg` (rasio sinemaskop `2,4:1`), sebuah monitor komputer krem retro berisi klip Steve Jobs duduk di atas meja kayu di padang hijau berkabut dengan daun buram melayang di lapisan depan; dua kata serif italic putih tipis `"one simple"` dan `"fact"` mengapit sisi kiri dan kanan monitor di garis tengah (`x ±18%` dan `82%`).
  - Di `46-k2-kolase-kotak-kata.jpg`, kolase beberapa foto arsip hitam-putih dan berwarna (wajah Jobs & Wozniak muda) berlapis dengan bayangan di pinggir, sementara di pusat (`y 49,67%`) sebuah pita putih (`tinggi 11–12% H, lebar ±24%`) menampung kata sans hitam `"everything around"` yang sengaja dibiarkan meluber keluar dari ujung kanan pita putih ke atas foto gelap di belakangnya.
  - Di `46-k3-kata-raksasa.jpg`, di atas lanskap padang rumput hijau berkabut dengan satu sosok kecil berdiri di tengah, kata sans putih `"life"` meledak dengan x-height `58,89%` tinggi frame (mencapai tepi atas dan bawah bidang pandang), diapit diagonal oleh dua kata kecil `"you"` di kiri atas dan `"call"` di kanan bawah.
  - Di `46-k4-kata-kecil-tersebar.jpg`, deretan `1–6` kata putih kecil (`x-height 4,89% H`) `"push   in   and   something   will   pop"` tersebar selebar `35–70%` frame di sepanjang garis tengah `y 48–51%` dengan jarak antarkata lebar (`±7%` lebar frame) dan sedikit offset vertikal `±1,5%`, sehingga tidak menutupi wajah para tokoh di belakangnya secara blok padat.
  - Di `46-k5-kata-latar-ubin.jpg`, kata raksasa abu-abu `#848185` `"Change"` (`lebar 98%`, `x-height 38%`) ditempatkan di latar hitam `#080609`, diinjak di bagian bawah oleh satu inset foto kecil (`±21×29%` frame) yang memunculkan kedalaman tanpa blur.
  - Di `46-k6-pasangan-skala.jpg`, kata raksasa `"understand"` (`x-height 20,8%`, bertepi sedikit kasar + bloom putih `±15 px`) berpasangan dengan empat kata kecil (`3,7% H`, `"that   you   can   poke"`) yang duduk rapat tepat di puncak ascender kata raksasa (`rasio terukur 5,53×`) tanpa ukuran perantara.
  - Menurut pengukuran di kartu `(belum dilihat bergerak)`, montase bergerak konstan di `±68–71 cut/menit` (median `0,7–0,8 dtk`) tanpa babak lambat di tengah setelah pembuka monitor (`+48%` push-in selama `4 dtk`), dan kata raksasa sering menempel melewati cut footage di belakangnya.
- **Kenapa ini bekerja:**
  - Menghilangkan ukuran teks perantara—langsung melompat `4–15×` antara kata kecil (`3,7–5,1% H`) dan kata hero raksasa (`20,8–58,9% H`)—membuat kata kunci benar-benar terasa sebagai "ledakan" manifesto sementara footage di sela huruf tetap terbaca.
  - Menyebar kata-kata kecil secara horizontal di garis tengah dengan jarak lebar `±7% W` membedakannya dari subtitle film tradisional dan menjaga arsip ramai di belakang tetap terlihat di celah antarkata.
- **Prinsip yang bisa dipindah ke konten lain:**
  - Ketika menyusun tipografi manifesto di atas montase cepat, batasi sistem ke tepat **2 tingkat skala ekstrem** (kecil `4–5% H` vs raksasa `20–55% H`, lompatan `≥ 4×`) tanpa ukuran sedang perantara; pasangkan kata pengantar kecil tepat di puncak ascender kata raksasa atau mengapit diagonalnya.
  - Jika memasang kotak putih pas-badan di atas kolase foto gelap seperti `46-k2`, jangan biarkan huruf hitam meluber keluar kotak ke area foto gelap karena huruf kehilangan kontras (bagian *"nd"* di `46-k2` nyaris tenggelam).
- **Cara menerapkannya di konteks baru:**
  - Pada video manifesto/intro brand `Jadisatu` (`16:9` `1920×1080` atau `21:9`), pakai huruf sans netral tanpa serif (*Neue Haas Grotesk / Inter Regular*) berukuran kecil `45–55 px` (`4–5% H`) tersebar di `y 50%` dengan `gap 6–8% W` (`115–150 px`) selama montase cepat `0,6–0,9 dtk/shot` `(belum dilihat bergerak)`, lalu ledakkan tepat `1` kata kunci per `8–12 dtk` ke `220–600 px` (`20–55% H`) yang bertahan melintasi `1–2` cut di belakangnya; gunakan kombinasi kata raksasa abu redup `#848185` di belakang inset foto kecil `22–28%` lebar untuk menciptakan kedalaman tanpa efek blur.

---

## Kartu 48 · Highlighter Caption Box

- **Kasus:** `48` (`claude/motion-graphic/cookbook/_vault/02-typography-and-captions/48-highlighter-caption-box.md`) | Keyframe dibuka:
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/48-k1-objek-warna.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/48-k3-arsip-caption-kuning.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/48-k4-gelap-teks-bebas.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/48-k6-tahun-besar.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/48-k7-split-teks-inset.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/48-k8-koran-sorot.jpg`
  | `dilihat_bergerak: tidak`
- **Yang terlihat:**
  - Di `48-k1-objek-warna.jpg` (9:16), latar tangan memegang tumpukan uang abu-abu kabur, sementara selembar uang dolar hijau berwarna penuh tajam melintang lebar memenuhi kanan-kiri bingkai dengan teks serif italic putih polos `"Printed right on it"` di atas ruang gelap atas.
  - Di `48-k3-arsip-caption-kuning.jpg`, foto arsip imigran monokrom penuh layar diberi vignette kuat; tepat di tengah frame (`x 50%, y 50%`) menimpa area dada/baju bertekstur, terdapat kotak stabilo kuning lemon padat (`#F9FC30`–`#FBFF27`, tinggi kotak `±3,8–4,2% H`, padding sangat sempit `±0,3%`) berisi teks serif kondensasi italic hitam `"Wherever you"`.
  - Di `48-k4-gelap-teks-bebas.jpg`, di atas foto gelap tangan memegang rosario salib bercahaya dengan butiran debu halus, teks keluar dari kotak dan duduk di sisi kosong kiri dengan warna putih untuk kata sambung (`"suddenly / turn"`) dan kuning bercahaya lembut untuk kata kunci (`"Christian"`, `3,9% H`).
  - Di `48-k6-tahun-besar.jpg`, foto arsip gedung jam dipudarkan ke kabut putih sangat terang di tengah sehingga angka tahun kuning italic besar `"1954"` (`6,7% H`) dengan bayangan jatuh tipis kanan-bawah tetap kontras, dipimpin pengantar serif italic hitam kecil `"one sunday"` (`2,66% H`, rata kiri di atas angka).
  - Di `48-k7-split-teks-inset.jpg`, foto arsip monokrom menempatkan siluet belakang jemaat gelap di kanan depan (lapis depan), pendeta kabur di kanan belakang, sebuah inset lingkaran bangunan gereja (`±29%` lebar) di kiri tengah, dan frasa pengapit di ruang langit kosong atas `"when / the"` kecil mengapit `"preacher"` hitam besar (`±5,6% H`).
  - Di `48-k8-koran-sorot.jpg`, potongan koran cetak asli tampil miring dengan stabilo kuning menyapu kalimat headline cetak `"IN GOD WE TRUST"` (`mixBlendMode: multiply` sehingga tinta koran tetap terbaca), sekaligus caption kotak kuning padat `"In God We Trust"` di pusat frame.
  - Menurut pengukuran di kartu (sumber `12 fps`, `(belum dilihat bergerak)`), kotak kuning dibangun melebar per kata mengikuti frasa (`22,1 cut/menit`, median `2,3 dtk`, `1–4` frasa per shot) dan hilang berganti langsung ke frasa berikutnya.
- **Kenapa ini bekerja:**
  - Pada foto arsip hitam-putih yang kaya tekstur batu/kain/kerumunan di tengah frame, teks polos (putih atau hitam) sering gagal kontras di atas motif terang-gelap bergantian. Kotak stabilo kuning pas-badan (`padding ±0,3%`, warna tunggal di seluruh adegan arsip) menyelesaikan keterbacaan secara instan sekaligus menjadi penanda identitas tema editorial/dokumenter.
  - Penghentian kotak secara selektif—kata dilepas dari kotak dan diperbesar `2–2,5×` pada tahun/kata kunci atau di adegan gelap polos (`48-k4`, `48-k6`, `48-k7`)—mencegah kotak terasa sebagai template kaku, sementara kabut putih di belakang tahun kuning (`48-k6`) atau vignette kuat melindungi kontras di foto kompleks.
- **Prinsip yang bisa dipindah ke konten lain:**
  - Pakai kotak stabilo pas-badan (`tinggi 3,8–5% H`, `padding vertikal ≤ 0,4% H`, maksimal `2–4` kata) **khusus** saat teks jatuh di atas foto arsip monokrom/bertekstur padat yang kontras lokalnya tidak stabil—jangan pasang kotak jika latar gelap/terang sudah polos bersih (`S-T4` dan `48-k4`).
  - Untuk sorotan dokumen cetak (koran/buku), bedakan **stabilo bukti** (kotak semi-transparan/`multiply` di atas kalimat asli dokumen, menyapu kiri→kanan `(belum dilihat bergerak)`) dengan **caption narasi** (kotak solid terpisah atau tanpa kotak).
- **Cara menerapkannya di konteks baru:**
  - Di dokumenter sejarah/asal-usul produk UMKM atau cerita lama untuk `@siirfannih` (`9:16` `1080×1920`), ubah semua foto arsip berbeda era menjadi monokrom (`grayscale(1) contrast(1.1)`) dengan vignette radial, sisakan warna asli hanya pada `1` objek simbol pembuka, pasang caption italic serif hitam (`±42 px`) dalam kotak aksen pas-badan (`tinggi ±72–80 px`, lebar dinamis sesuai `measureText`) di `y 50%` (atau turun ke `y 60%` bila wajah ada di tengah), lalu lepaskan kata tahun/kata kunci menjadi `110–130 px` di atas area yang diberi kabut putih lembut atau ruang gelap bebas tanpa kotak.

---

## Kartu 55 · Material-Shift Story Arc

- **Kasus:** `55` (`claude/motion-graphic/cookbook/_vault/06-script-and-story/55-material-shift-story-arc.md`) | Keyframe dibuka:
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/55-k1-arsip-bingkai-putih.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/55-k2-kartu-judul.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/55-k3-arsip-teks-kinetik.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/55-k5-foto-alas-potong.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/55-k6-dinding-foto.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/55-k7-fisheye-grid-merah.jpg`
  | `dilihat_bergerak: tidak`
- **Yang terlihat:**
  - Di `55-k1-arsip-bingkai-putih.jpg` (16:9), kanvas putih murni `#FDFBFE` menaruh satu klip arsip Steve Jobs dalam bingkai tanpa sudut membulat (`±66×66%` frame) dengan barisan caption sans grotesk rapat satu baris di bawah bingkai (`"Every person who has ever built"`, kata akhir abu-abu saat belum/baru masuk `(belum dilihat bergerak)`).
  - Di `55-k2-kartu-judul.jpg`, satu kata judul serif kondensasi KAPITAL raksasa `"IMPOSIBLE"` warna biru langit pucat (`#A1D5F4`, tinggi `52–66% H`, memenuhi hampir seluruh lebar frame) berada di depan langit biru gelap, sementara roket nyata meluncur vertikal menembus di antara huruf `"O"` dan `"S"` (dengan jejak api oranye di bawah).
  - Di `55-k3-arsip-teks-kinetik.jpg`, klip wawancara arsip MrBeast berjaket kulit hitam di ruangan gelap berlampu gantung oranye hangat dilapis raster halftone dot rapat; tepat di dada (`y 45–54%`), frasa satu baris satu ukuran sans bold `"it's not talent."` menaruh kata sambung putih dan kata kunci merah (`#C8080B`) tanpa kotak.
  - Di `55-k5-foto-alas-potong.jpg`, material berpindah ke dunia fisik: foto cetak polaroid berpinggir putih dengan bayangan jatuh nyata dipaku pin merah di atas alas potong hijau A3 bergrid putih, diberi label tulisan tangan putih `"Charles"` + panah menunjuk tokoh, vignette gelap kuat, dan distorsi fisheye ringan + aberasi kromatik tipis di grid.
  - Di `55-k6-dinding-foto.jpg`, material berpindah lagi ke papan gabus oranye hangat ber-grain dengan `3–4` foto polaroid yang terhubung oleh benang merah fisik menuju satu foto utama di atas, disertai caption sans putih kecil di pita bawah-tengah (`y ±92%`).
  - Di `55-k7-fisheye-grid-merah.jpg`, di titik balik (*twist*), foto yang sama di atas alas potong hijau mendadak mengalami distorsi fisheye barrel ekstrem (`elips ±62%`), berganti ke monokrom merah pekat (`#AA1703`–`#B7000F`), dan mata tokoh ditutup batang sensor hitam dengan satu kata putih `"almost"` di bawah.
  - Menurut pengukuran `(belum dilihat bergerak)`, cerita 8 babak berdurasi `46,3 dtk` bergerak dari cepat (`0,25–0,5 dtk/shot` di arsip orang lain) ke lambat dengan kamera menyusuri meja/dinding (`4,5–10,4 dtk`), meledak ke twist monokrom merah (musik naik `+6 dB`), lalu masuk vlog pucat & CTA hitam rata (`#010002`, kapital `2,4%`).
- **Kenapa ini bekerja:**
  - Pergantian "material visual" per babak—putih kertas → arsip TV ber-halftone → alas potong hijau → papan gabus berbenang → monokrom merah twist → vlog pucat → hitam CTA—membuat audiens merasakan perpindahan babak cerita dari "bukti dunia luar" ke "pengalaman pribadi" ke "hampir gagal" tanpa memerlukan kartu bab atau teks penjelasan tambahan.
  - Foto pribadi yang dicetak ulang ke benda fisik (pin merah, benang merah di papan gabus, label tulisan tangan) menjadikan kredensial diri terasa nyata dan tidak narsis, sementara penyensoran mata + tint merah hanya dipakai `1×` di seluruh video sehingga kejutan *twist* maksimal.
- **Prinsip yang bisa dipindah ke konten lain:**
  - Pada esai personal `40–60 dtk` bertema perjalanan/asal-usul, bangun alur **bukti orang lain → pengakuan diri di dunia fisik → twist kelemahan (1× perubahan grade ekstrem + musik) → open loop + humor + CTA polos**.
  - Di bagian pengakuan diri yang memakai bukti foto/kredensial (`3–5` item), ikat foto secara spasial (di meja kerja/papan gabus/benang penghubung) dan biarkan satu gerak kamera lambat menyusurinya agar ritme melambat sebagai kontras dari montase cepat sebelumnya `(belum dilihat bergerak)`.
- **Cara menerapkannya di konteks baru:**
  - Kartu `55` sudah menjadi kiblat `jensen-pain-suffering`, `builder-trap-r2`, dan `bali-digifest-day1` (`F1-decisions-visual.md`). Untuk proyek `Jadisatu`/`Behindwork` berikutnya (`1920×1080`):
    - Babak 1 (`0–15 dtk`): arsip tokoh di kanvas putih (`#F5F5F7`) dengan bingkai persegi tanpa radius (`66%` lebar) lalu triad negasi (`"bukan X, bukan Y"` satu ukuran `7% H`, warna teks utama + aksen `#D6202B`/`#E8A33D` pada kata kunci) di depan jaket/dada tokoh ber-halftone.
    - Babak 2 (`15–30 dtk`): foto/bukti kerja fisik di alas potong/meja kerja dengan jarak kamera panjang `4–10 dtk` dan label tangan putih kecil (`3–4% H`).
    - Babak 3 (`30–35 dtk`, *twist* 1× saja): tint merah/monokrom kuat + batang sensor atau inversi, sebelum penutup vlog terang dan end-card polos `#0A0A0A` atau `#F5F5F7`.

---

## Kartu 66 · Silhouette Flicker Cut

- **Kasus:** `66` (`claude/motion-graphic/cookbook/_vault/01-camera-and-transitions/66-silhouette-flicker-cut.md`) | Keyframe dibuka:
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/66-k2-flash-putih.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/66-k3-flicker-siluet.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/66-k4-siluet-transparan.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/66-k5-cutout-lapis.jpg`
  | `dilihat_bergerak: tidak`
- **Yang terlihat:**
  - Keempat keyframe berasal dari rekaman layar UI CapCut (preview `1,43:1` di atas timeline yang memperlihatkan ikon potongan flash, penanda klik kamera/stinger, dan adjustment layer `Green Orange`).
  - Di `66-k2-flash-putih.jpg`, bidang preview tertutup penuh oleh warna putih krem hangat rata (`#F4EFEB`, `240/255`, bukan putih murni `#FFFFFF`).
  - Di `66-k3-flicker-siluet.jpg`, di atas footage jalanan kota yang tetap tajam, diam, dan bernuansa hangat-pudar, sepasang subjek manusia di tengah (`±16×57%` preview) diisi siluet putih krem penuh bertepi tajam tanpa glow, bayangan, atau blur.
  - Di `66-k4-siluet-transparan.jpg`, siluet putih semi-transparan (`opasitas ±60%`, tinggi `±65,5%` preview) bergeser sedikit ke kiri sementara subjek asli tetap terlihat di sebelah kanannya, menghasilkan efek bayangan posisi ganda.
  - Di `66-k5-cutout-lapis.jpg`, subjek manusia dari shot berikutnya (gadis memegang minuman) muncul lebih dulu sebagai cut-out penuh warna dengan garis tepi putih tipis di atas latar taman shot lama sebelum latar berganti.
  - Menurut catatan pengukuran `(belum dilihat bergerak)`, siluet berkedip biner `2 frame nyala / 2 frame mati` (`±7,5 Hz`, `4–5` kali) disinkronkan ke rentetan klik rana kamera (`12` tik tiap `0,04–0,08 dtk`), kilat penuh jatuh tepat `1–3 frame` di titik cut di atas beat `136 bpm`, dan cut-out subjek baru mendahului latar selama `5 frame` (`0,17 dtk`).
- **Kenapa ini bekerja:**
  - Kedipan siluet krem bertepi tajam di atas latar yang sepenuhnya diam menciptakan efek psikologis "subjek sedang difoto / dibekukan oleh lampu kilat", sehingga potongan B-roll jalanan terasa seperti lembaran album foto hidup.
  - Memunculkan cut-out subjek shot berikutnya `5 frame` lebih awal di atas latar lama memindahkan fokus mata ke objek baru sebelum seluruh lingkungan di belakangnya ikut berganti `(belum dilihat bergerak)`.
- **Prinsip yang bisa dipindah ke konten lain:**
  - Gunakan mekanik **Siluet Flicker** (`2f nyala / 2f mati`, tanpa glow/blur) dan **Cut-Out Lead** (`4–5f` mendahului latar) **hanya** pada B-roll aksi/travel dengan subjek tunggal yang terpisah jelas dari latar agar matte potongan bersih.
  - Jangan menggabungkan kilat putih (`flash cut`) di setiap potong; batasi pada cut puncak/ketukan musik agar mata tidak lelah dan tetap gunakan putih hangat/krem (`#F4EFEB`) agar kilat tidak menusuk layar ponsel.
- **Cara menerapkannya di konteks baru:**
  - Pada bagian transisi montase cepat atau teaser B-roll acara/workshop (`Jadisatu` / `Bali Digifest`, `30 fps`), jika ada klip subjek orang terpisah latar, pakai *Next-Subject Cut-Out Lead* `5` frame (`0,17 dtk`) tepat sebelum cut B-roll di ketukan beat `(belum dilihat bergerak)` disertai `1` bunyi klik rana halus; untuk momen penekanan "tertangkap kamera", kedipkan siluet `#F4EFEB` (atau `#1A1A1A` di latar terang) `2f` nyala / `2f` mati sebanyak `3–4×` saja—**jangan** pakai di talking head edukatif panjang atau latar ramai yang membuat matte bergerigi.

---

## Kartu 76 · Meaning-Triggered Desaturation

- **Kasus:** `76` (`claude/motion-graphic/cookbook/_vault/04-tactile-textures-and-grading/76-meaning-triggered-desaturation.md`) | Keyframe dibuka:
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/76-k1-wajah-warna-caption.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/76-k2-transisi-ke-abu.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/76-k5-statistik-angka.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/76-k7-kartu-penutup.jpg`
  | `dilihat_bergerak: tidak`
- **Yang terlihat:**
  - Di `76-k1-wajah-warna-caption.jpg` (9:16), Dr. Sahar Yousef dalam klip podcast *The Diary Of A CEO* tampil berwarna hangat penuh (baju cokelat, kulit hangat, cincin cahaya merah di tepi kanan); satu baris caption *Inter Bold* putih-redup (`"your"` terang `#F4F4F4`, `"phone in"` redup `±55–60%`) duduk tepat di area dada (`pusat x ±45–50%, y 65–69%`) dengan kredit kecil di bawahnya, menyisakan `55%` atas frame bersih dari teks.
  - Di `76-k2-transisi-ke-abu.jpg`, tepat pada kata `"gray."`, seluruh gambar kehilangan saturasi menjadi monokrom abu netral tanpa tint sepia/biru dan dengan hitam sedikit terangkat (`#343434`–`#3A3A3A`), sementara caption `"gray."` tetap putih bersih di luar lapisan filter.
  - Di `76-k5-statistik-angka.jpg`, masih dalam keadaan monokrom abu netral, area dada menampung satu blok angka statistik bertingkat (`x 24–71%, y 57–81%`): label atas kecil `"back every"`, angka raksasa `"1"` (`11,35% H`) berdampingan satuan `"hour"` di kanan-bawah (`rasio angka:satuan 3,63:1`), dan label bawah `"day"`.
  - Di `76-k7-kartu-penutup.jpg`, frame berpindah ke kartu hitam rata murni (`#0D0D0D`) dengan satu kalimat putih rata tengah `"Turn your phone gray."` (`3,7% H`) dan kredit abu terang `#CBCBCB` (`1,98% H`) di bawahnya, tanpa ikon atau ornamen apa pun.
  - Menurut pengukuran di kartu `(belum dilihat bergerak)`, transisi ke abu berlangsung linier `11 frame` (`0,45 dtk`) saat kata `"gray"` terucap, bertahan sepanjang reaksi pendengar bisu (`2,75 dtk`) dan blok angka (`1 → 7` swap keras `1–2 f`), lalu kembali berwarna dalam `9 frame` (`0,37 dtk`) pada ajakan penutup; video asli nyaris tanpa musik dan tanpa SFX (kartu penutup sunyi total `−69 LUFS`).
- **Kenapa ini bekerja:**
  - Menjadikan perubahan *color grade* sebagai visualisasi harfiah isi kalimat ("ponsel menjadi membosankan/abu → layar ikut mati ke abu netral → solusi/ajakan mengembalikan warna") membuat efek visual tidak terasa sebagai hiasan tempelan.
  - Menempatkan lapisan `saturate` di bawah caption menjaga teks tetap tajam `#F4F4F4` sepanjang fase redup, sementara gaya karaoke murni berbasis opasitas (`0,58 → 1` dalam `2f`, `(belum dilihat bergerak)`) di satu posisi dada tidak bersaing dengan ekspresi pembicara maupun reaksi pendengar.
  - Kartu penutup hitam polos yang diam dan hening selama `±1,3 dtk` memberi berat kesimpulan moral setelah bukti statistik disampaikan.
- **Prinsip yang bisa dipindah ke konten lain:**
  - Hanya gunakan animasi desaturasi atau perubahan suhu warna bila naskah secara eksplisit menyebut kondisi makna yang diwakilinya (*"mati", "hambar", "jenuh", "kosong", "fokus kembali"*) dan kondisi itu bertahan minimal `6–10 dtk` sebelum dikembalikan pada solusi `(belum dilihat bergerak)`.
  - Saat menyajikan perbandingan angka yang diucapkan (*"X per hari → Y per minggu"*), pecah satu blok menjadi `[label atas kecil] + [ANGKA HERO + satuan kanan-bawah] + [label bawah]` di ruang dada, pertahankan posisinya konstan, dan ganti nilainya dengan swap langsung tanpa animasi keluar-masuk yang menunda baca.
- **Cara menerapkannya di konteks baru:**
  - Pada klip talking head/podcast pendek (`9:16`, `1080×1920`) untuk `@siirfannih` atau wawancara klien yang membahas masalah *burnout*/AI *slop*/kehilangan arah, biarkan pembicara berwarna normal selama hook, turunkan saturasi linear ke `0,05–0,10` selama `10–12 frame` tepat di kata masalah (`"generik"`, `"sama"`, `"mati"`, `(belum dilihat bergerak)`), tahan monokrom selama bukti angka (`angka 11–12% H` = `±215 px`, satuan `±60 px`), lalu kembalikan saturasi `1,0` selama `9 frame` saat solusi dimulai dan tutup dengan `1` kalimat ajakan putih di kartu `#0D0D0D` selama `1,2–1,5 dtk`.

---

## Kartu 77 · Brightness-Spotlight Caption

- **Kasus:** `77` (`claude/motion-graphic/cookbook/_vault/02-typography-and-captions/77-brightness-spotlight-caption.md`) | Keyframe dibuka:
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/77-k2-objek-teks-mengapit.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/77-k3-grid-arsip-teks.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/77-k4-kartu-hitam-teks.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/77-k5-footage-teks-tengah.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/77-k6-kartu-putih-teks.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/77-k7-angka-besar.jpg`
  | `dilihat_bergerak: tidak`
- **Yang terlihat:**
  - Di `77-k2-objek-teks-mengapit.jpg` (16:9 ter-rectify dari layar trailer), sebuah TV tabung vintage di atas meja kayu ruang hangat ber-lampu kiri-kanan menayangkan klip Steve Jobs di dalam layar CRT bergaris pindai (`68,6%` tinggi frame); kalimat sans medium putih satu ukuran `"Everything [TV] around you"` mengapit di dinding gelap kiri dan kanan TV tepat di `y ±50%`.
  - Di `77-k3-grid-arsip-teks.jpg`, grid `3×3` menampilkan `8` sel wajah tokoh teknologi (Musk, Zuckerberg, Jobs, Gates, Jensen Huang) dengan sel tengah dibiarkan hitam polos menampung teks putih bersih `"By People"`, menyisakan satu sel kiri-bawah masih bertekstur kertas/menunggu terisi `(belum dilihat bergerak)`.
  - Di `77-k4-kartu-hitam-teks.jpg`, kanvas hitam murni `#000000` menampilkan kalimat utuh `"The future of currency"` satu baris satu ukuran di pusat `(50%, 50%)`: hanya kata aktif `"future"` menyala putih tajam, sedangkan `"The"` dan `"of currency"` redup abu gelap (`#333333`–`#484848`) dan diburamkan ringan (`blur ±3 px`).
  - Di `77-k5-footage-teks-tengah.jpg`, di atas footage reaktor nuklir berwarna teal gelap bertekstur garis horizontal, kata tunggal putih tajam `"Nuclear"` (`x-height 5,43%`) duduk diam tepat di pusat `y 50%`.
  - Di `77-k6-kartu-putih-teks.jpg`, pola sorot kecerahan dibalik di atas kanvas putih murni `#FFFFFF`: kata aktif `"the"` berwarna hitam tajam (`#202020`) sedangkan kata tidak aktif `"sun"` berwarna abu pucat (`#D1D1D1`) dan buram ringan.
  - Di `77-k7-angka-besar.jpg`, klimaks penutup berpindah ke latar gradien senja merah-ungu-biru (`#AF686B` → `#313766`) dengan lingkaran matahari kuning buram di tengah yang tampak menembus celah di dalam angka raksasa `"100%"` (`25,2% H`, putih bersih) di atas subjudul `"of all energy"` (`7–8% H`, rasio `±3,3×`).
  - Menurut pengukuran di kartu `(belum dilihat bergerak)`, sorot kata berpindah dalam `1–2 frame` antar kata, teks yang sama diam di tengah sementara `2–4` shot cepat (`±4 frame` per gambar di semburan daftar kata benda `Nuclear / Wind / Solar` hingga `100–120 cut/menit`) berganti di bawahnya tepat pada onset kata VO (`92%` cut `≤ 100 ms` dari kata), ditutup satu lompatan skala pada `"100%"` berpenghitung `85→100%`.
- **Kenapa ini bekerja:**
  - Menyusun kalimat seragam lalu memakai kontras kombinasi **kecerahan + ketajaman** (tajam penuh pada kata aktif vs abu + `blur(3px)` pada kata pasif) menuntun mata menyusuri kalimat tanpa mengubah posisi, menggeser kerning, atau membesarkan ukuran teks.
  - Mempertahankan kata benda tunggal (`"Nuclear"`) diam di pusat sementara `2–4` shot kilat berganti di bawahnya menjadikan teks sebagai jangkar persepsi, sehingga rentetan cut ekstrem `0,17–0,35 dtk/shot` `(belum dilihat bergerak)` tidak membingungkan penonton.
  - Menyimpan satu-satunya lompatan skala ekstrem (`3,3×`) ke angka klimaks penutup (`"100%"`) membuat seluruh video terasa terarah menuju satu puncak bukti.
- **Prinsip yang bisa dipindah ke konten lain:**
  - Gunakan **Brightness + Blur Spotlight** (`aktif: kontras penuh + blur(0); pasif: opasitas 0,30–0,35 + blur(2–3px)`) pada kartu pernyataan visi polos hitam atau putih untuk kalimat `3–4` kata tanpa menggerakkan posisi kata.
  - Pada montase cepat daftar kategori (`≥ 3` kata benda berurutan), kunci `1` kata jangkar di `(50%, 50%)` melintasi `2–4` gambar harfiah singkat per kata, dan pisahkan teks di dalam grid foto dengan menyisakan `1` sel grid polos khusus untuk teks (`77-k3`) agar tidak menimpa wajah.
- **Cara menerapkannya di konteks baru:**
  - Cocok untuk teaser/trailer visi `Jadisatu` (`16:9` `1920×1080`, `20–30 dtk`): gunakan kartu hitam `#000000` atau putih `#FFFFFF` untuk kalimat premis (`4` kata, *SF Pro / Inter Medium* `60–65 px` seragam, pasif `opacity 0.35 + blur(3px)`), sisipkan grid `3×3` tokoh/karya dengan sel tengah hitam polos untuk judul `3` kata, tahan kata kunci di tengah `y 50%` melintasi `3–4` B-roll kilat `4–6 frame` `(belum dilihat bergerak)` per item produk/industri, dan tutup dengan tepat `1` angka metrik puncak (`25% H` = `±270 px`, hitung naik `15–22 frame`) di depan elemen bulat/gradien bermakna.

---

## Kartu 86 · Midline Word-Growth Montage

- **Kasus:** `86` (`claude/motion-graphic/cookbook/_vault/02-typography-and-captions/86-midline-word-growth-montage.md`) | Keyframe dibuka:
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/86-k1-kata-kecil-footage.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/86-k2-kartu-terang.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/86-k3-kata-besar-start.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/86-k4-grid-kolase.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/86-k5-invert-grid-logo.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/86-k6-kotak-abu-kata.jpg`
  | `dilihat_bergerak: sebagian`
- **Yang terlihat:**
  - Di `86-k1-kata-kecil-footage.jpg` (16:9), di atas footage gelap malam truk dan mobil Tesla dengan cahaya merah garis di aspal, tiga kata sans grotesk putih lembut (`x-height 3,75% H`, `y 49,44%`) `"whole    line    of"` duduk di garis tengah bagian kiri-tengah yang gelap dengan jarak antarkata lebar (`6,25–8,28%` lebar frame) dan pendar putih sangat tipis agar tetap terbaca tanpa kotak.
  - Di `86-k2-kartu-terang.jpg`, potongan masuk ke kanvas terang berbintik/debu halus (`#ECECEC` tengah ke `#BABABA` pojok, vignette gelap halus di tepi) berisi kata hitam `#030202` (`5,14% H`, celah `4,38% W`) `"But   there's"` di tengah; pada pemeriksaan urutan frame `(f182–200, dilihat_bergerak: sebagian)`, kartu terang ini menyempit secara vertikal meninggalkan pita hitam di atas dan bawah.
  - Di `86-k3-kata-besar-start.jpg`, di atas footage lengan robot pabrik perakitan mobil yang kontras, satu kata titik balik `"start"` membesar hanya `2,26×` kata kecil (`x-height 8,5% H`, ascender `10,4% H`), cukup tegas sebagai penanda tanpa menutup seluruh badan robot di belakangnya; dalam sekuens `f601–607` (`sebagian`), kata `"start"` ini bertahan melintasi cut dari pabrik ke jalan kota.
  - Di `86-k4-grid-kolase.jpg`, empat panel foto showroom mobil (`28–51%` lebar) dipasang di sudut kiri atas, kanan atas, kiri bawah, dan kanan bawah di atas hitam pekat sehingga menyisakan jalur pita hitam horizontal yang bersih di tengah (`y 40–60%`) tempat frasa `"you     can't     walk"` duduk tanpa menyentuh foto mana pun.
  - Di `86-k5-invert-grid-logo.jpg`, grid foto penuh menampilkan panel tengah lokal (`±51×50%` frame) yang sedang terbalik/terdesaturasi ke latar abu `#747474` berisi logo Tesla dan teks pengapit `"Elon [logo] Musk"` pada momen pembalikan terang–gelap `3 frame` (`f138–140`, `sebagian`).
  - Di `86-k6-kotak-abu-kata.jpg`, di atas panggung peluncuran Cybercab yang ramai, sebuah bidang abu-abu semi-transparan lokal (`±53×35%` frame) menutup area kiri-tengah footage (masih menyisakan siluet mobil di baliknya) agar teks abu-gelap `"Last week"` di dalamnya terbaca jelas tanpa menggelapkan figur Elon Musk dan pembicara di sisi kanan.
  - Untuk bagian lain yang belum diamati berurutan (`sebagian`, mis. rentetan uang `f1127–1152` dan ritme keseluruhan `54,8 cut/menit`, median `0,501 dtk` `(belum dilihat bergerak)`), kartu mencatat bahwa kecepatan cut menanjak ekstrem di montase uang.
- **Kenapa ini bekerja:**
  - Dibanding kartu `46` (kata raksasa `4–15×`), kartu `86` membuktikan bahwa untuk esai analisis bisnis yang harus menjaga kejelasan B-roll teknologi/produk, membatasi penekanan ke `±2,3×` dan menjaga kata kecil di `3,8% H` bercelah `6–10% W` di garis tengah membuat footage tetap jelas sekaligus ritmis.
  - Menyisipkan kartu terang berbintik (`86-k2`) hanya saat membuka salah paham dan memakai bidang abu lokal atau celah kolase hitam (`86-k4`, `86-k6`) menyelesaikan konflik keterbacaan di atas B-roll ramai tanpa merusak subjek utama di sisi lain frame.
- **Prinsip yang bisa dipindah ke konten lain:**
  - Ketika footage 16:9 penuh detail objek (produk, pabrik, arsitektur) yang tidak boleh tertutup huruf raksasa, pakai **proporsi tengah-ramping**: kata kecil `3,5–4% H` berjarak lebar `6–8% W` di `y 50%` dan batasi kata kunci penekanan di `2,2–2,5×` (`8–10% H`) saja, bertahan melintasi cut.
  - Untuk menyisipkan `3–4` foto lokasi/produk dalam satu layar sekaligus teks, tata panel foto di sudut-sudut tepi sehingga terbentuk "koridor hitam" kosong di garis tengah untuk menaruh teks (`86-k4`) daripada menumpuk teks di atas grid penuh.
- **Cara menerapkannya di konteks baru:**
  - Kartu `86` adalah patokan resmi proyek `flat-mirip-mirip` (`F1-decisions-visual.md`: *"Patokan selesai = reel Tesla (kartu 86)"* & tempo tanpa jeda mati). Untuk video esai analisis industri `Jadisatu` (`16:9` `1920×1080`): pakai kata sans grotesk regular putih `40–44 px` (`3,7–4,0% H`, celah antar kata `115–155 px`) tumbuh per kata di `y 50%` di atas B-roll tergrade gelap/sejuk dengan pendar lembut `0 0 12px rgba(255,255,255,0.35)`, ledakkan `1` kata balik per `20 dtk` ke `±95–110 px` (`2,3×`), pakai kartu terang `#ECECEC` berbintik untuk kalimat sanggahan `"Tapi faktanya..."` yang menyempit ke bar hitam `(sebagian)`, dan gunakan celah hitam kolase 4 sudut (`86-k4`) saat merangkum banyak studi kasus sekaligus.

---

## Kartu 89 · Block-Reveal Essay Montage

- **Kasus:** `89` (`claude/motion-graphic/cookbook/_vault/02-typography-and-captions/89-block-reveal-essay-montage.md`) | Keyframe dibuka:
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/89-k2-kata-tersebar-pink.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/89-k3-mozaik-wajah-hijau.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/89-k4-let-me-explain-garis.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/89-k5-judul-film-pink-keterangan-kuning.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/89-k10-urutan-kata-masuk-bingkai.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/89-k11-urutan-mozaik-membuka.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/89-k12-peta-bunyi-pembuka-mozaik.jpg`
  | `dilihat_bergerak: ya`
- **Yang terlihat:**
  - Di `89-k10-urutan-kata-masuk-bingkai.jpg` dan `89-k2-kata-tersebar-pink.jpg` (9:16), klip film hangat `16:9` ber-sudut membulat (`borderRadius 8–12 px`) duduk di tengah di atas latar hitam murni; kata-kata pink muda muncul satu per satu tepat pada saat diucapkan (`selisih ≤ 1 frame`) dan **tidak menghapus kata sebelumnya**, mula-mula di dalam ruang kosong bingkai (`"SAID"` kiri, `"THIS"` kanan, script miring `"about"` di dahi atas), lalu menumpuk di ruang hitam di atas bingkai (`"She / will / never be"`) hingga kalimat selesai sebelum klip berganti.
  - Di `89-k3-mozaik-wajah-hijau.jpg` dan `89-k11-urutan-mozaik-membuka.jpg`, di titik balik personal (`8,0–10,2 dtk`), adegan memotong ke latar hijau zaitun datar; wajah pembicara muncul bukan lewat fade, melainkan dibuka melalui `5` blok persegi panjang tidak beraturan dalam ±1,2 dtk (`8,0→9,2 dtk`): mata kiri/tengah muncul dulu (`±4%` lebar frame), lalu blok atas, mulut-mikrofon, dan bahu terbuka menyatu membentuk potret utuh yang tetap bergerak (kedipan mata terlihat di dalam mozaik), dengan keterangan kuning kecil `"I don't know what"` di bawahnya. Di `89-k12-peta-bunyi-pembuka-mozaik.jpg`, peta gelombang bunyi memperlihatkan 5 tik impuls lembut (`±3 ms`, `> 8 kHz`, `−20 dB` di bawah vokal) tepat mendarat setiap blok selesai terbuka.
  - Di `89-k4-let-me-explain-garis.jpg`, masih di latar hijau zaitun datar (`25,2–26,2 dtk`), tiga kata pink `"LET / ME / EXPLAIN"` membentuk tangga diagonal dengan garis tipis yang menggambar menyambungkan ujung kata satu ke kata berikutnya (`±1,0 dtk` total, 3 pop lembut rendah pada tiap kata sedangkan garis senyap).
  - Di `89-k5-judul-film-pink-keterangan-kuning.jpg`, klip film penuh layar `9:16` memisahkan dua lapisan teks yang tidak bertabrakan: judul karya pink 2 baris berukuran sangat kecil (`±1,5% H`, `"Bones and All / 2022"`) diam di tengah (`y ±50%`), sementara keterangan ucapan kuning kecil `2–4` kata (`"in a coming of age"`) berganti di tempat pada `y ±75%` tiap `0,5–1,0 dtk` tanpa gerak masuk dan **tanpa SFX** sepanjang `24 dtk` montase film (cut mengikuti awal kata/celah napas, bukan beat musik).
- **Kenapa ini bekerja:**
  - Tiga "lantai" visual yang dipetakan ketat ke fungsi kalimat—bingkai hitam + kata sebar untuk vonis luar, mozaik di hijau zaitun datar untuk pengakuan rapuh diri sendiri, dan klip penuh berlabel kecil untuk contoh argumen—menjaga struktur esai tetap jernih tanpa perlu grafik atau efek mencolok.
  - Membuka potret secara bertahap dimulai dari mata sebagai jangkar lalu membiarkan video tetap berjalan sejajar di semua salinan `clipPath` membuat jeda pengakuan terasa manusiawi sekaligus unik, sementara suara musik berlapis yang tidak di-ducking menyembunyikan sambungan antar-potongan dan menghemat SFX hanya di titik transisi bermakna (`9` SFX dalam `73,7 dtk`).
- **Prinsip yang bisa dipindah ke konten lain:**
  - Ketika mengerjakan esai vertikal `9:16` dengan klip horizontal `16:9`, jadikan ruang hitam di atas dan bawah bingkai membulat sebagai "meja" penumpuk kata sebar untuk kutipan `≤ 15` kata; jangan hapus kata sampai kalimat selesai, dan selalu simpan posisi kata di luar wajah tokoh.
  - Pisahkan peran warna teks secara konsisten sepanjang video bila memakai `2` lapisan informasi di klip: `1` warna untuk **label/identitas bukti** (diam selama klip, ukuran kecil `1,5–2% H` di area tengah aman) dan `1` warna lain untuk **keterangan ucapan aktif** (berganti per `2–4` kata di `y 75%`, senyap tanpa SFX).
- **Cara menerapkannya di konteks baru:**
  - Untuk esai personal/refleksi founder `@siirfannih` (`9:16` `1080×1920`, `60–75 dtk`):
    - Lantai 1 (hook kutipan kritik/masalah): klip `16:9` ber-`borderRadius 12 px` di tengah `y 50%` di atas hitam `#000000`, kata sebar muncul bertahap (`reveal 5f`, `±0,3–0,5 dtk/kata`) di area hitam atas `y 18–30%`.
    - Lantai 2 (titik balik pengakuan): latar warna datar brand yang diredam (olive/slate gelap), ungkap wajah pembicara lewat `4–5` blok `clipPath: inset()` dimulai dari kotak mata `±5%` lebar dalam `1,0–1,2 dtk` dengan 1 tik lembut per blok (`−20 dB` di bawah vokal), lalu lanjutkan 3 kata pengantar (`"IZINKAN / AKU / JELASKAN"`) tersambung garis tipis `4–5 f`.
    - Lantai 3 (bukti contoh karya/klien): klip penuh `9:16` ber-scrim tipis `15–20%`, label proyek kecil (`±28 px`) di tengah atas-tengah, dan frasa kuning/aksen (`2–4` kata, `±34–40 px`) di `y 75%` dipotong pada celah napas VO tanpa SFX klik per kata.

---

## Kartu 92 · Negative-Space Cumulative Caption

- **Kasus:** `92` (`claude/motion-graphic/cookbook/_vault/02-typography-and-captions/92-negative-space-cumulative-caption.md`) | Keyframe dibuka:
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/92-k1-judul-tahun-wipe-blueprint.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/92-k3-inset-foto-kecil-di-hitam.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/92-k5-tumpukan-kata-ruang-kosong.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/92-k7-kutipan-sorot-halaman-kosong.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/92-k8-teks-di-sisi-objek-diam.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/92-k9-kata-kiri-atas-diagram.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/92-k10-kata-di-wajah-closeup.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/92-k11-urutan-judul-kata-per-kata.jpg`
  - `/Users/igedeirfankusumaputra/wonder/repos/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes/92-k12-urutan-inset-membesar.jpg`
  | `dilihat_bergerak: ya`
- **Yang terlihat:**
  - Di `92-k1-judul-tahun-wipe-blueprint.jpg` dan `92-k11-urutan-judul-kata-per-kata.jpg` (16:9), judul pembuka di latar hitam pekat menampilkan satu kata/angka per slot yang melompat secara horizontal (`"The"` kanan → `"year"` kanan → `"is"` kiri → `"1 → 19 → 199 → 1992"` tengah raksasa setinggi `±30–55%` frame, `±0,125 dtk` per digit), dibarengi bilah vertikal tipis tekstur blueprint hijau teknis (`clip-path inset`) yang berganti sisi tiap kata sebelum meledak penuh sesaat dan cut ke footage isi.
  - Di `92-k3-inset-foto-kecil-di-hitam.jpg` dan `92-k12-urutan-inset-membesar.jpg`, foto pribadi muncul sebagai inset kecil (`±25%` lebar frame) di tengah latar hitam dengan teks grotesk tebal huruf kecil putih `"and / when / she was 17"` menumpuk kumulatif di kiri-tengah foto; setelah ditahan `±0,5 dtk`, foto membesar ke layar penuh dalam `±0,1–0,2 dtk` sementara ukuran caption tetap konstan (`±6–7% H`) dan berpindah ke ruang kosong kiri-tengah jendela/laptop.
  - Di `92-k5-tumpukan-kata-ruang-kosong.jpg`, `92-k8-teks-di-sisi-objek-diam.jpg`, dan `92-k9-kata-kiri-atas-diagram.jpg`, caption huruf kecil semua tanpa kotak/bayangan menumpuk rata kiri ke bawah (`2–4` baris, antarbaris rapat) dan selalu pindah mengikuti ruang negatif paling lapang pada tiap shot: kiri atas ruang kosong di sebelah anak kecil (`k5`), kanan atas di sisi hitam sebelah segel institusi MIT (`k8`), dan ruang hitam kiri-tengah di samping sinar diagram satelit (`k9`).
  - Di `92-k7-kutipan-sorot-halaman-kosong.jpg`, tempo melambat saat memotong ke halaman abu-terang bersih (`#F0F0F2`, hampir kosong) berisi `2` baris kutipan kecil rata kiri yang disorot stabilo biru transparan sepanjang baris dengan zoom pelan `±8%` selama `3,5 dtk` sebelum cut ke hitam dan `"But one day"`.
  - Di `92-k10-kata-di-wajah-closeup.jpg`, terekam satu kasus peringatan: karena shot close-up wajah memenuhi hampir seluruh lebar frame tanpa sisi kosong, caption `"underestimate what is"` yang dipaksakan tampil di tengah menimpa tepat di atas batang hidung dan mata tokoh.
- **Kenapa ini bekerja:**
  - Memperlakukan posisi caption sebagai variabel per shot—ditempatkan secara aktif di sisi ruang negatif lawan subjek, bukan dipaku di margin bawah—menjadikan teks terasa terintegrasi dengan foto arsip tanpa butuh kotak, scrim gelap, atau bayangan tebal.
  - Menumpuk kata secara kumulatif (`translateY 6px→0` dalam `3–4f` tanpa keluar) pada ritme `±1,0 dtk/shot` dan langsung mengubahnya menjadi `1` kata berganti di tempat saat shot berubah lebih cepat dari `1 dtk` menjamin kalimat tetap selalu sempat dibaca mata.
  - Halaman kutipan abu terang bersorot biru yang sunyi di tengah video memberi pengesahan fakta tertulis sekaligus memperlambat denyut sebelum tikungan `"BUT"`.
- **Prinsip yang bisa dipindah ke konten lain:**
  - Gunakan aturan **Anchor Ruang Negatif**: petakan bounding-box subjek/wajah tiap shot lebih dulu; taruh tumpukan caption (`2–4` baris rata kiri menghadap subjek, tanpa kotak/shadow) di sisi kosong lawan subjek (tepi kiri/kanan subjek `4–8%` frame), dan jika shot adalah *extreme close-up* tanpa ruang kosong seperti `92-k10`, pindahkan kalimat ke shot sebelum/sesudahnya atau potong ke kanvas polos alih-alih menimpa mata/hidung.
  - Saat ritme cut mengetat di bawah `1,0 dtk` per shot, hentikan penumpukan baris dan pindah ke mode *Single-Word Replace* (`1` kata di satu anchor tetap per kata VO).
- **Cara menerapkannya di konteks baru:**
  - Kartu `92` sudah menjadi acuan resmi penempatan narasi di `behindwork-batch-1` (`F1-decisions-visual.md` D-08 & D-31). Untuk profil pendiri atau video dokumenter produk di `Behindwork`/`Jadisatu` (`16:9` `1920×1080`):
    - Pembuka tahun/angka (`0–2,1 dtk`): slot-jump horizontal di `#000000` dengan `1` bilah tekstur arsitektur/blueprint/produk berganti sisi per kata hingga digit tahun penuh (`40–55% H`).
    - Narasi arsip (`50 cut/menit`, median `±1,0 dtk`): tumpukan `2–4` baris *Inter Bold* huruf kecil (`6–7% H` = `65–75 px @1080p`, `line-height 0,95–1,05`) muncul kata demi kata (`translateY 6px→0` dalam `3–4 f`) di sisi ruang kosong lawan tokoh (`x` jarak `4–8%` dari bahu/objek).
    - Bukti tertulis: halaman abu terang (`94%` luma) sunyi selama `3,0–3,5 dtk` (`zoom +8%`) dengan teks `22–26 px @1080p` disorot stabilo biru `rgba(80,140,255,0.45)`, lalu hard cut ke `"TAPI"` kapital di hitam sebelum babak berikutnya.
