# 65 · Instagram "Save Reminders" (konsep UI, mosycreate)

> **Status: contoh mutu dan sumber teknik, bukan ukuran untuk disalin.** Yang dipindahkan ke video lain adalah tekniknya beserta syarat yang membuatnya berhasil; angka di kartu ini pengamatan di video asli, bukan target.
> Sumber: file Irfan `instagram.mp4` (kartu akhir: "MADE BY A HUMAN · @mosycreate · An unofficial concept for Instagram") · 4:3 (960×720, 30 fps), 39,0 dtk (konten 0–27 dtk, kartu penutup 27–39 dtk) · Frame: `../../guide/referensi/sheets/65-instagram-ref-trojan.jpg` · Frame kunci: `../../guide/referensi/sheets/keyframes/65-k*.jpg` + urutan gerak `65-k9-urutan-objek-jadi-kata.jpg`, `65-k10-urutan-whip-kata-raksasa.jpg` · Bedah lengkap: `ukuran.md`
> Video sumber: `/home/irfan/work/pustaka-video/unggahan/instagram.mp4` (video yang sama dengan kartu 08, `pustaka-video/mac/Motion.mp4`)
> Dilihat bergerak: **ya** (strip semua frame 0,5–1,7; 4,2–5,4; 8,1–9,3; 12,5–13,7; 17,5–18,7; 22,5–23,7 dtk; ikhtisar 1 fps 0–28 dtk). Angka kamera dan audio dari bedah lama, tidak diukur ulang.

**DNA (satu kalimat):** Konsep fitur UI yang diceritakan lewat kamera yang terus menyelam ke elemen UI (bookmark → kartu → notifikasi → feed), diselingi kartu kalimat pendek di latar gelap bergradien, lalu ditutup emosional: foto hangat bercahaya dan musik piano.
**Cocok untuk:** demo fitur/konsep aplikasi, launch produk SaaS, reel "what if" · **Tidak cocok untuk:** wawancara/talking head, konten data berat
**Kata kunci gaya:** UI-cinematic, bersih, sigap, gradien Instagram, emosional di ujung
**Diambil untuk:** nama file "instagram.mp4": nama tidak menyebut bagian; lihat bagian terkuat. Bagian terkuat: gerak kamera ke dalam UI + transisi blur/zoom-through, lalu teks kalimat inline dengan objek UI.

## Kondisi footage asli
- Tidak ada pembicara dan tidak ada footage kamera yang berdiri sendiri. Kanvasnya dua: **abu terang polos** (UI Instagram, kalimat inline) dan **gelap bergradien hangat/dot-matrix** (kartu kalimat). Foto hanya muncul di dalam postingan.
- Kanvas polos dan kosong: kalimat satu baris di tengah tidak bersaing dengan apa pun; satu objek UI dominan per adegan.
- 4:3, kamera virtual terus bergerak (push, pull, scroll, whip berblur berat).
- Babak akhir berganti ke foto hangat bercahaya + piano: register emosional.

## PENGIKAT (diambil utuh dari SATU kiblat; ini yang membuat video terasa satu keluarga)

### 1. Warna & tekstur
- Dua dunia latar: abu UI terang `#ECECEC`–`#EEEEEE` (kartu putih `#F5F6FE`, bayangan lembut) dan gelap: arang `#1F1E1C` dengan gradien hangat di sudut bawah (oranye `#7C5224`, magenta `#72293F`), atau hitam `#090909` dengan dot-matrix abu dan sapuan ungu `#16021B`.
- Aksen = gradien logo Instagram saja: magenta `#D24E98`–`#E85A9D` ke oranye `#E09669`–`#EE8069`, dipakai pada kata kunci ("Reminders") dan ikon IG. Biru tombol UI `#5E97D1` hanya di dalam UI.
- Penutup: grade emas/sepia, foto `#D5983D` di tengah → `#63491C`, vignette hitam pekat ke `#000000`, bloom/glow kuat, tulisan tangan kuning neon menyala ("Forever").
- Motion blur arah gerak sangat berat di setiap transisi (frame transisi nyaris tak terbaca).

### 2. Teks
- Font: sans geometris-humanis mirip SF Pro/Inter; Regular untuk kalimat, Bold untuk kata kunci; UI memakai SF-like Semibold. Satu aksen tulisan tangan (merah "Save", kuning "Forever").
- Kalimat ditaruh tepat di tengah frame (y 46–55 %), satu baris, 2–5 kata per tampil: "And just like that …", "You lose [thumbnail]", "But, what if [ikon IG]", "…Instagram had Save Reminders?", "Instagram's gonna [notifikasi] you", "And done..!".
- Ukuran: lihat Proporsi terukur. Kalimat biasa kecil (±3,5 % tinggi); kata pembuka "But," bold ±8 %; kata raksasa "N YO" / "COLLECTION" penuh lebar saat whip.
- Penekanan: bobot (Bold vs Regular dalam satu baris), warna gradien IG pada satu kata, dan **objek UI menggantikan kata** di tengah kalimat (thumbnail, ikon, kartu notifikasi menyelip di antara kata).
- Masuk/keluar: per kata/per frasa, sigap, dengan blur arah (frame 3,0 dtk "And just" muncul buram kabur); kalimat terus ditimpa kamera yang bergerak ke objek di sampingnya.
- Caption dalam kurung siku kecil ("[That tutorial]", "[that photo of her?]") di bawah foto, dalam pil gelap transparan.

### 3. Ritme
- ffmpeg/pace_read: hanya 4 hard cut (6,2/menit); event visual 32/menit. Hitung manual dari sheet: ±13 shot di 27 dtk konten (±29/menit), shot median ±2 dtk.
- Cepat 0–12 dtk (shot 0,3–2 dtk, whip beruntun); sedang 12–19 dtk (notifikasi, scroll feed); lambat 19–27 dtk (foto hangat ditahan ±8 dtk, push pelan); 27–39 dtk kartu penutup diam.

## TEKNIK (boleh dipinjam referensi lain; selalu dikenakan pengikat kiblat)

### T1 · Objek UI menggantikan kata di tengah kalimat (k5, k9; 12,5–13,7 dtk)
- **Yang terlihat (termasuk gerak):** di kanvas abu polos, "Instagram's" lalu "gonna" muncul per kata di satu baris tengah; di celah berikutnya **kartu notifikasi** muncul dari buram-merah muda ke tajam, kartu kedua menumpuk di belakangnya, lalu "you" menyusul. Kartu notifikasi duduk di baris kalimat, setinggi kata. Kamera drift pelan; keluar dengan blur gerak.
- **Kenapa bekerja di video itu:** kanvas kosong tanpa subjek lain, kalimat pendek satu baris; objek UI adalah kata kerjanya ("gonna [mengingatkan] you"), jadi gambar dan kalimat tidak bersaing.
- **Cara membuatnya:** baris kalimat sebagai susunan kata + slot; objek UI di slot dengan tinggi menyesuaikan tinggi huruf; masuk per kata mengikuti ucapan, objek masuk dengan blur → tajam.
- **Pakai bila:** kalimat di mana satu kata bisa diperagakan oleh benda/UI (notifikasi, ikon, thumbnail), di kanvas polos atau sisipan tanpa pembicara. · **Jangan pakai bila:** di atas footage pembicara yang ramai; kalimat panjang; objek UI tidak benar-benar menggambarkan kata itu.
- **Bila kondisinya beda, sesuaikan:** ada pembicara → potong ke kanvas polos untuk kalimat ini, atau taruh baris di ruang kosong yang polos di samping kepala; latar gelap → objek UI dengan bayangan/tepi terang.

### T2 · Whip kata raksasa bergradien, kursor menyeret (k10; 4,2–5,4 dtk)
- **Yang terlihat (termasuk gerak):** dari kartu "You lose [thumbnail]" di latar gelap, kursor menarik ke kanan dan seluruh layar **whip** ke kanvas terang dengan kata raksasa bergradien magenta-oranye ("IN YOUR") yang lewat horizontal dengan blur gerak berat; kursor ikut terseret; berakhir di grid thumbnail yang bergerak cepat ("COLLECTION").
- **Kenapa bekerja di video itu:** gerak didorong aksi kursor (penonton melihat penyebabnya); kata raksasa hanya lewat, tidak harus dibaca utuh; blur gerak menyambung dua dunia (gelap → terang).
- **Cara membuatnya:** satu kanvas lebar berisi kata raksasa + grid; kamera virtual menggeser cepat dengan motion blur nyata; kursor di lapisan atas mengikuti arah geser.
- **Pakai bila:** pergantian babak cepat di hook, frasa yang terasa "terseret". · **Jangan pakai bila:** kata itu harus terbaca (punchline): whip membuatnya tidak terbaca.
- **Bila kondisinya beda, sesuaikan:** punchline yang harus terbaca → kata raksasa diam di slab (kartu 85 T1), whip hanya sebagai jalan masuk/keluarnya.

### T3 · Kamera menyelam ke elemen UI (k4; 8,1–11 dtk)
- **Yang terlihat (termasuk gerak):** kamera menggeser pelan ke kiri di bawah postingan; kalimat "…Instagram had **Save Reminders**?" berada tepat di bawah ikon bookmark berjam, kata "Reminders" bergradien merah muda-oranye lalu memudar jadi hitam tebal saat kamera bergeser (8,1–9,3 dtk). Di frame kunci k4 ikon sudah besar dan terisi hitam, dan kartu Reminder keluar lewat gelembung dari ikon. Gerak push di antara 9,3 dan 11 dtk belum dilihat di strip.
- **Kenapa bekerja di video itu:** satu objek kecil yang jelas (ikon) di kanvas tenang; kalimat di samping objek menyebut objek itu.
- **Cara membuatnya:** satu kamera pada seluruh UI; keyframe skala/posisi menuju objek; elemen berikutnya lahir dari objek (skala dari titik).
- **Pakai bila:** fitur yang punya titik masuk kecil (ikon, tombol). · **Jangan pakai bila:** UI ramai tanpa satu titik fokus.
- **Bila kondisinya beda, sesuaikan:** UI gelap → objek fokus diberi aksen terang; frame 9:16 → push lebih vertikal, kalimat di atas/bawah objek.

### T4 · Kartu kalimat gelap bergradien sudut (k2, k3; 2,5–4,5 dan 7 dtk)
- **Yang terlihat:** kalimat satu baris kecil di tengah latar arang dengan gradien oranye-magenta merembes dari sudut bawah, atau hitam dengan dot-matrix dan sapuan ungu; kata pembuka bold ("But,") lebih besar; ikon IG di akhir kalimat.
- **Kenapa bekerja, cara membuat, pakai bila, sesuaikan:** kanvas kosong gelap, kalimat sendirian; belum dibedah rinci geraknya.

### T5 · Penutup foto emas bercahaya (k7; 19–27 dtk)
- **Yang terlihat:** foto ditahan ±8 dtk dengan bloom, vignette hitam, push pelan; tulisan tangan kuning neon "Forever" menyala di akhir; musik berganti piano.
- **Kenapa bekerja, cara membuat, pakai bila, sesuaikan:** belum dibedah rinci.

### 4. B-roll / footage (catatan bedah lama; angka = pengamatan di video asli)
- Tidak ada footage live action berdiri sendiri; "footage" selalu di dalam postingan UI (motocross, lanskap hijau, timeline editor, foto perempuan bercahaya).
- Grid thumbnail buram + kursor panah putih besar = "collection yang menumpuk" (5–6,5 dtk).
- Foto penutup diberi bingkai membulat, grade emas, bloom: ilustrasi "postingan yang ingin diingat selamanya".

### 5. Motion graphic
- UI tiruan Instagram yang dibangun ulang: postingan, ikon bookmark dengan jam, kartu Reminder (Month/Day/Time, toggle, tombol "Apply Reminder"), notifikasi iOS bertumpuk, feed scroll.
- Menggambarkan ucapan secara harfiah: "Save Reminders?" → bookmark berjam muncul di samping kata; "gonna … you" → kartu notifikasi menjadi kata kerjanya; "forever" → tulisan tangan menyala.
- Watak: toggle menyala, tombol ditekan (lingkaran tekan), kartu pop dari titik/gelembung kecil, bookmark membesar jadi ikon hitam raksasa ("And done..!").
- **Skala subjek:** satu objek UI dominan per adegan: kartu Reminder ±47×57 % frame, notifikasi besar ±91×35 %, foto ±68×91 %; bookmark/ikon sebagai titik fokus kecil (±10–12 % tinggi) sebelum didekati.
- **Kedalaman:** 2–3 lapis: latar rata (abu/gelap), kartu UI dengan bayangan lembut, teks/ikon di depan; lapis belakang dibuat buram (postingan di belakang kartu, notifikasi belakang miring/pudar). Tidak ada grain di adegan UI; penutup berlapis vignette + bloom.

### 6. Kamera & transisi
- Kamera hampir selalu bergerak (ORB+affine antar-frame 0,5 dtk):
  - push ke bookmark ×1,78 di 8–9,5 dtk lalu pull ×0,62 untuk menampilkan kartu;
  - pull ×0,59 di 6,5–7,5 dtk;
  - scroll feed vertikal ±200 % tinggi frame di 15,5–19 dtk dengan blur gerak;
  - push pelan ×1,64 dalam 4,5 dtk ke "imher / Forever" (23–27,5 dtk);
  - diam di 20–23 dtk (foto ditahan).
- Frame ikut menyusut/melebar: tepi hitam atas-bawah berubah (konten 590–720 px tinggi), panel UI terasa sebagai kanvas yang dikamerai.
- Transisi: whip/zoom-through dengan motion blur berat (2,2; 4,5; 5,3; 11,5; 15 dtk), morph objek (bookmark → ikon raksasa), cut keras hanya 4. Pemicu: kata/frasa baru dan gerak objek (kursor, bookmark).

### 7. SFX
- earshot: 145 event (3,7/dtk); tag 30 nada (glockenspiel/celesta), 20 UI (ding, chat pop), 17 hit (sub drop, impact), 4 drum, 3 foley (bubble pop), 2 whoosh.
- Kosakata: ding/pop untuk kartu dan notifikasi muncul, sub-drop/impact pada whip, nada glockenspiel sebagai aksen; whoosh jarang (whip dibawa hit, bukan whoosh). Sinkron ke cut lemah (27 % dalam 1 frame).
- SFX dicampur sama keras dengan musik (puncak −0,7 sampai −3 dBFS).

### 8. Musik
- Babak 1 (0–19 dtk): tech house / corporate dengan vocal chop, ±89→103 bpm (librosa), −13 LUFS short-term; suara manusia terdeteksi (AST speech 0,6–0,9), tak ditranskrip.
- Babak 2 (19–39 dtk): piano solo sedih (electric lalu grand), −25 sampai −26 LUFS, turun ±13 dB; stop-down 0,7 dtk di 22,5 / 27,7 / 32,3 dtk.
- Mix −14,3 LUFS, true peak +0,3 dBTP (clip), LRA 15,6 LU; tanpa grid beat jelas (pulse clarity 0,11).

## Pengamatan terukur di video asli, bukan target (11 Nov, dari video sumber; % terhadap frame 960×720)
| Jenis adegan | Kata kunci (% tinggi) | Kata sambung | Posisi teks | Skala subjek | Kedalaman |
|---|---|---|---|---|---|
| UI postingan (k1) | headline gambar "SEE" ±15 (dari mosaik) | caption UI ±1,5 | di dalam postingan | postingan ±64×63 % | abu + kartu + coretan merah |
| Teks gradien (k2) | 4,7 ("just" dgn j) | 3,6 | tengah, x 30–70 %, y 47–53 % | tanpa subjek / thumbnail kecil | latar gelap + gradien sudut |
| Teks dot-matrix (k3) | "But," Bold 8,2 | "what if" 7,1 | tengah, x 31–63 %, y 46–56 % | ikon IG ±12 % tinggi | hitam + titik + sapuan ungu |
| UI kartu Reminder (k4) | "eminders?" 5,0 (Bold) | judul kartu 2,9 | kalimat di kiri, kartu di kanan | kartu ±47×57 % | abu + kartu bayangan + bookmark |
| Kalimat + notifikasi (k5) | notifikasi inline ±37 % lebar | "Instagram's gonna" 4,2 / x-height 3,1 | tengah, y 46–52 % | notifikasi = kata | abu + 2 notifikasi bertumpuk |
| Feed scroll (k6) | caption "[…]" 1,8 | — | bawah foto (y 86–93 %) | postingan ±65 % lebar | abu + blur gerak |
| Foto vintage (k7) | caption "[…]" 1,8 (pil) | — | y 86–93 %, tengah | foto ±68×91 % | foto + bloom + vignette hitam |
| Kartu penutup (k8) | "MADE BY A HUMAN" 3,6–3,8 caps Bold | handle/tagline ±1 | tengah, y 48–57 % | tanpa subjek | hitam rata |

- Rasio kata kunci : kata sambung hanya **1,1–1,7** dalam kalimat (dibedakan bobot dan warna, bukan ukuran); yang besar adalah objek UI, bukan huruf.
- Batas: 720p (±0,14 % per piksel); tinggi huruf diukur dari komponen terhubung, ±10 % untuk huruf kecil.

## Yang harus terasa sama saat disandingkan
- Kalimat dan objek UI terasa satu baris kalimat (objek menggantikan kata), bukan dua hal yang berdampingan?
- Tiap adegan UI punya satu objek yang jelas jadi fokus, dan kamera terasa menuju ke sana?
- Kalimat kecil di tengah terbaca tenang karena kanvasnya kosong, bukan karena dibesarkan?
- Gerak cepat terasa didorong sesuatu yang terlihat (kursor, objek), dan blur geraknya menyambung dua dunia?
- Babak akhir terasa berganti register (hangat, lambat, emosional)?

## Catatan pakai
- Belum pernah dipakai sebagai kiblat.
