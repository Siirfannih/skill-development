# Behindwork · Analisis Struktur Script dan Template

Disusun 22 November 2026 dari 22 transkrip Whisper di `transkrip/` (JSON + MD). Isi transkrip diperlakukan sebagai data. Kutipan hook dipotong pendek (≤15 kata) untuk acuan, bukan untuk disalin.

Catatan data:
- `its.sammywu_DcS25CKkmFM` dan `mashaliu_DcS25CKkmFM` **identik** (ID video sama). Dihitung sebagai satu pola.
- `Jadisatu__aslaniedits_DeC-xCeMrS6` adalah **lirik lagu** (music edit tanpa VO). Tidak dianalisis sebagai script dan liriknya tidak dikutip.
- `twirlingpages_DdrTZqtxfDK`: ekor 77,5 sampai 78,1 detik adalah halusinasi Whisper (kalimat berulang). Dipotong; angka di bawah memakai 77,5 detik.
- Words/sec (wps) = jumlah kata ÷ akhir segmen terakhir (termasuk jeda).

---

## 0. Ringkasan cepat

| Hal | Temuan |
|---|---|
| Referensi utama | **rt2rj** (Einstein, 51 dtk) dan **arthurcrockbooks** (dua "dial" emosi, 106 dtk) |
| Paling mirip format Behindwork | **siirfannih_DfH6JYPqNjk** (Alexandr Wang / Scale AI) dan **explore_DfWgYR2TFXR** (sejarah SWIFT) |
| wps VO naratif (EN) | 2,87 sampai 3,40 (referensi utama 2,92 dan 2,99) |
| wps bahasa Indonesia (data) | 2,57 (reflektif) dan 3,13 (santai, cepat) |
| Target VO Behindwork | **2,6 kata/dtk** untuk perencanaan, batas atas 2,9 per beat |
| Hook | Kalimat pertama selesai ≤ 5 dtk; "pembalik" (twist/koreksi) jatuh di 8 sampai 17% durasi |
| Re-hook | Tiap 8 sampai 15 dtk, biasanya kalimat 1 sampai 5 kata ("Why?", "But that's wrong.") |
| Payoff | 15 sampai 25% terakhir: reframe satu kalimat yang bisa dikutip |
| CTA | Referensi naratif **tidak** pakai CTA eksplisit; penutup = aforisme atau open loop. CTA eksplisit muncul di video kreator/iklan, di 5 sampai 10% terakhir |

---

## 1. Analisis per video

Legenda tipe hook: KONTRA (kontrarian/koreksi kepercayaan), FAKTA (fakta mengejutkan), TANYA, LOOP (open loop), SEJARAH ("Tahun X, tokoh Y..."), RAHASIA (kekuatan tersembunyi), OBJEK ("This is X"), OTORITAS (mengutip tokoh), RELATE (pengamatan sehari-hari), ANCAMAN ("Kalau kamu tidak X..."), PROSES, PENGAKUAN.

### 1.1 REFERENSI UTAMA · `Behindwork__referensi-motion__rt2rj` (Einstein dan flow state)

51,3 dtk · 150 kata · **2,92 wps** · 13 kalimat · rata-rata 11,5 kata/kalimat (min 1, maks 24) · jeda maks 0,30 dtk (VO rapat, tanpa napas panjang).

| Waktu | % | Beat | Isi |
|---|---|---|---|
| 0,0 sampai 4,4 | 0 sampai 9 | HOOK · SEJARAH + konflik | "In 1915, Albert Einstein was losing a war against gravity." Tahun + tokoh besar + kata perang |
| 4,6 sampai 6,0 | 9 sampai 12 | Eskalasi | "His equations were collapsing." (4 kata, pukulan pendek) |
| 6,2 sampai 13,4 | 12 sampai 26 | Adegan | Jam 2 pagi, letakkan kapur, ambil biola, Mozart, cahaya lilin, tetangga menggedor dinding. Detail indrawi yang mudah dianimasikan |
| 13,6 sampai 17,2 | 27 sampai 34 | TURNING POINT · reframe | "He wasn't escaping the math, he was entering a flow state." Pola "bukan X, tapi Y" |
| 17,3 sampai 20,8 | 34 sampai 41 | Jembatan ke masa kini (stakes) | Flow state "kita bunuh" dengan jalan pintas AI |
| 21,1 sampai 30,4 | 41 sampai 59 | Analogi + re-hook | Mobil vs sepatu lari. "Why?" (1 kata) lalu jawaban "otot membusuk" |
| 30,5 sampai 39,2 | 59 sampai 76 | LESSON | Pikiran juga begitu; istilah baru "creative inflation"; antitesis "Efficiency goes up, human talent goes down." |
| 39,5 sampai 46,5 | 77 sampai 91 | Open loop baru | Fakta aneh: orang bayar mahal angkat karung pasir di stadion kosong |
| 46,5 sampai 51,3 | 91 sampai 100 | CTA · LOOP/cliffhanger | "...something you aren't ready to hear." Tidak ada ajakan eksplisit; penonton dipancing ke part 2 / follow |

Kenapa bekerja: (1) hook menggabungkan nama besar + tahun + konflik dalam satu kalimat; (2) adegan sangat visual sehingga motion graphic punya bahan; (3) reframe "bukan X, tapi Y" di 27%; (4) topik sejarah ditarik ke masalah penonton hari ini; (5) ritme panjang-pendek (24 kata lalu 1 kata "Why?"); (6) penutup membuka loop baru, bukan menutup.

Peringatan untuk Behindwork: detail "1915, jam 2 pagi, Mozart, cahaya lilin, tetangga menggedor" **tidak terverifikasi** dan kemungkinan dramatisasi. Einstein memang dikenal bermain biola saat berpikir, tapi adegan spesifik ini tidak punya sumber di transkrip. Tiru strukturnya, jangan tiru cara memperlakukan fakta.

### 1.2 REFERENSI UTAMA · `Behindwork__referensi-motion__arthurcrockbooks` (bahagia dan tidak bahagia dua sistem)

105,9 dtk · 317 kata · **2,99 wps** · 32 kalimat · rata-rata 9,9 kata (min 3, maks 19) · jeda maks 0,80 dtk.

| Waktu | % | Beat | Isi |
|---|---|---|---|
| 0,0 sampai 7,9 | 0 sampai 7 | HOOK · KONTRA (setup kepercayaan umum) | "Most people assume that happiness and unhappiness are opposites." + penjelasan "dial" |
| 8,1 sampai 8,9 | 8 | Pembalik | "But that's wrong." (3 kata) |
| 9,1 sampai 12,0 | 9 sampai 11 | Klaim baru | Dua sistem terpisah |
| 12,4 sampai 26,1 | 12 sampai 25 | Bukti | Riset 1988, alat PANAS (Whisper menulis "PANIS"), dua skor; kalimat paralel pendek "You can run high on both. You can run low on both." |
| 26,2 sampai 32,8 | 25 sampai 31 | Implikasi | Orang mengurus satu dial dan mengabaikan yang lain |
| 33,0 sampai 51,7 | 31 sampai 49 | Otoritas berlapis | Evolusi (sistem bertahan hidup) + kitab kuno (Pengkhotbah) |
| 52,0 sampai 61,2 | 49 sampai 58 | TURNING POINT · pengakuan pribadi | "My negative dial runs pretty hot." |
| 61,7 sampai 78,8 | 58 sampai 74 | Perubahan | Berhenti memaksa ceria; atur tidur, olahraga, makan. "the unglamorous machinery of a good life" |
| 78,9 sampai 91,2 | 75 sampai 86 | Musuh + peringatan | Industri wellness; "hapus sedihmu, bahagiamu ikut hilang" |
| 91,4 sampai 100,6 | 86 sampai 95 | LESSON · langkah aksi | Kenali angka afek positif dan negatifmu |
| 100,9 sampai 105,9 | 95 sampai 100 | Penutup aforisme | Kalimat penutup kemungkinan salah dengar (lihat 1.4). Tanpa CTA eksplisit |

Kenapa bekerja: (1) koreksi mitos di 8 dtk pertama; (2) bukti ilmiah bernama + tahun segera setelah klaim; (3) metafora tunggal ("dial") dipakai konsisten dari awal sampai akhir, jadi satu aset visual terus berulang; (4) pengakuan pribadi tepat di tengah sebagai re-hook emosional; (5) ada "musuh" (industri wellness); (6) langkah aksi konkret sebelum penutup.

Relevansi Behindwork: inilah cetakan **koreksi mitos**: "Kebanyakan orang mengira... Salah." lalu bukti bernama, lalu konsekuensi, lalu pelajaran. Untuk channel faceless, "pengakuan pribadi" diganti dengan **momen pribadi founder** (kutipan/pengakuannya sendiri, bersumber).

### 1.3 Video lain

| File | Durasi · kata · wps | Hook (kutipan pendek) · tipe | Beat map singkat | CTA |
|---|---|---|---|---|
| `Behindwork__explore_DfWgYR2TFXR` (SWIFT) | 53,5 · 182 · 3,40 | "This is a telex machine." · OBJEK (1 dtk) | 1 sampai 9 konteks 1960-an · 9,5 sampai 12,7 open loop "But there was one problem. How does London know...?" (18%) · 13 sampai 23 mekanisme buku kode · 25 sampai 29 stakes (pemalsuan) · 29 sampai 32 eskalasi (kertas menumpuk) · 32 sampai 44 turning point 1973, 239 bank, 15 negara (60 sampai 82%) · 44 sampai 53 payoff ke masa kini "kode yang kamu ketik hari ini" | Tidak ada; penutup insight "50 years later..." |
| `Behindwork__julian_forte_DfnMgHSsWQS` | 58,8 · 116 · 1,97 | Pertanyaan pewawancara soal memaafkan diri · TANYA | Klip wawancara: jawaban satu kata "grace" (8 dtk) lalu argumen bertingkat; wps rendah karena jeda berat | Tidak ada |
| `Behindwork__siirfannih_DcMbipLyr_F` | 44,4 · 136 · 3,06 | "...they all share one trait." · RAHASIA/universal | 5 sampai 11 tiga negasi "not talent, not money, not even luck" lalu jawaban · 15 sampai 35 kredensial kreator · 35 sampai 44 open loop eksplisit "if you stay to watch..." | LOOP (trailer part berikut) |
| `Behindwork__siirfannih_DfH6JYPqNjk` (Alexandr Wang) | 70,0 · 201 · 2,87 | "The biggest AI companies on earth were quietly paying one teenager..." · RAHASIA + celah rasa ingin tahu | 6 sampai 19 latar (17 th di Quora, 19 th keluar MIT) · 19 sampai 30 jawaban "benda" itu: data berlabel · 30 sampai 45 Scale AI, metafora "arms dealer" · 45 sampai 52 eskalasi miliarder termuda, "nobody outside tech knew" · 52 sampai 65 turning point Meta $14,3 miliar untuk 49% (75%) · 66 sampai 70 payoff reframe "never building AI. It was feeding it." | Tidak ada; aforisme penutup |
| `Behindwork__siirfannih_DfJkMqKPt47` (ID) | 96,0 · 300 · 3,13 | "Gimana sih caranya nentuin style kita?" · TANYA | Validasi pertanyaan (2 sampai 8) · cara 1 (12 sampai 36) · cara 2 (37 sampai 68) · cara 3 "sabar" (68 sampai 90, jeda dramatis sebelum "sabar") · rangkuman | Lemah: "Semoga berguna" |
| `Behindwork__siirfannih_DfRh4w0SfAk` | 29,8 · 128 · 4,29 | "Discipline is the secret for long-term success." · klaim/aforisme (klise) | Cerita agensi (2 sampai 14) · analogi gym (14 sampai 23) · pelajaran (24 sampai 30) | Tidak ada |
| `Behindwork__siirfannih_Dfm-1RWo57h` | 30,9 · 99 · 3,20 | "So why is everybody a creative now?" · TANYA | Validasi · alasan (sosmed) · kontras "AI slop" (21 sampai 26) | Pertanyaan ke penonton (komentar) |
| `Jadisatu__mahdiology.edit_DdM89KRMPBJ` | 23,5 · 99 · 4,21 | Detail jadwal produksi · PROSES (hook lemah) | Pukulan di akhir: kontras angka "100 ribu dolar lalu 1,5 juta per video" (87 sampai 100%) | Tidak ada |
| `barsolmedia_DcytmYFzR8Q` | 35,5 · 95 · 2,67 | Telepon "...It's your marketing team calling. They don't exist." · skit/pain | Pain (7 sampai 16) · reframe "lewat feed, bukan pintu" · tawaran | DM: "Send us a message" |
| `its.sammywu` / `mashaliu` (identik) | 55,0 · 179 · 3,26 | "Gary Vee says social media no longer exists." · OTORITAS + KONTRA | Peluang 1 asosiasi (7 sampai 31) · peluang 2 discoverability (31 sampai 47) dengan kutipan kedua | FOMO lunak "you could be missing out" |
| `jade.got.curious_DfDgb_3xBNZ` | 74,9 · 265 · 3,54 | "Having too many interests is never a problem, but..." · KONTRA | Cerita rasa ingin tahu (4 sampai 23) · pembalik "none of it made sense..." (24) · konflik DM (37 sampai 44, 50%) · "selfish truth" re-hook (44) · sponsor ManyChat (61 sampai 65) | **Comment-keyword**: "comment weird..." (93 sampai 96%), lalu penutup callback ke hook |
| `jfsephp_DdRlu0HuDUq` | 93,2 · 303 · 3,25 | "I truly believe content is one of the best ways..." · keyakinan | Monolog tanpa beat jelas; kalimat rata-rata 27,5 kata (maks 60) | Dorongan "go for it. Post yourself" |
| `siirfannih_DexJ-qWiWdY` | 55,6 · 228 · 4,10 | "This is the ultimate storytelling caption..." · janji nilai | Bukti angka (15 sampai 24: 1.000 komentar, 100, 700) · struktur 7 bagian · rangkum | Tidak ada; berisi konsep "two-door CTA" |
| `siirfannih_DfkG39Vy4er` (ID) | 47,9 · 123 · 2,57 | "Menurut gue part paling aneh ketika dewasa itu..." · RELATE | Pengamatan (0 sampai 19) · adegan ketemu lagi (19 sampai 27) · canggung (29 sampai 37) | Pertanyaan "Kenapa ya guys?" (komentar) |
| `trace.young_DeZf4B1pqwn` | 38,8 · 196 · 5,05 | "If you're not growing in these five areas..." · ANCAMAN | Daftar 5 area (4 sampai 8) · "shell of a man" (10 sampai 19) · pengakuan (20 sampai 30) · janji seri | **Follow seri**: "follow along..." |
| `trey.pfister_DdwzioqNokx` | 16,0 · 63 · 3,93 | "You're gonna win bro." · sapaan langsung/flattery | Alasan "ahead of 99%" | Follow |
| `twirlingpages_DdrTZqtxfDK` | 77,5 · 251 · 3,24 | "This is how I made this video." · PROSES (self-referential loop) | Perkenalan · naskah · shot list · syuting · edit · teks · aplikasi Edits · "5 sampai 6 jam" | Lunak: "appreciate your love and support" |
| `willdowding_De5Y0rVPBJ2` | 32,2 · 125 · 3,88 | "Hey, this is my first reel. I'm not famous." · PENGAKUAN/underdog | 3 tujuan (10 sampai 23) · pengakuan "2,5 tahun takut posting" (23 sampai 29) | Follow perjalanan |
| `Jadisatu__aslaniedits_DeC-xCeMrS6` | 25,7 · 31 · 1,20 | Lirik lagu, bukan VO | Tidak dianalisis | n/a |

### 1.4 Salah dengar Whisper dan fakta yang perlu dicek

| File | Tertulis | Kemungkinan benar / catatan |
|---|---|---|
| arthurcrockbooks 12,4 dtk | "PANIS" | **PANAS** (Positive and Negative Affect Schedule, Watson, Clark & Tellegen, 1988) |
| arthurcrockbooks 100,9 dtk | "You can't be happy, but you can be happier" | Kalimat janggal; kemungkinan ada kata hilang (mis. "...happy all the time"). Cek audio |
| siirfannih_DcMbipLyr_F 38,7 dtk | "a girl cheaps" | Tidak jelas; cek audio sebelum dikutip |
| siirfannih_DfH6JYPqNjk 6,2 dtk | "Alexander Wang" | Ejaan benar **Alexandr Wang** |
| siirfannih_DfH6JYPqNjk 45 dtk | "youngest self-made billionaire... at 24" | Fakta perlu dicek: Forbes 2022 menyebut usia 25. Contoh angka yang harus masuk lembar riset |
| barsolmedia 24,5 dtk | "Bar Soul Media" | **Barsol Media** (nama akun) |
| siirfannih_DfJkMqKPt47 36,7 dtk | "tindah" | Kemungkinan "comot"/"ambil" (konteks: "comotin aja satu-satu") |
| rt2rj 0 sampai 13 dtk | Adegan Einstein 1915 jam 2 pagi | Bukan salah dengar, tapi **klaim tanpa sumber** (dramatisasi) |
| twirlingpages 77,5+ | Kalimat berulang | Halusinasi Whisper, abaikan |
| aslaniedits | Lirik | Ada salah dengar lirik; tidak relevan |

---

## 2. Pola lintas video

### 2.1 Rumus hook (template isian)

Dari data, urut dari yang paling cocok untuk Behindwork:

1. **Kepercayaan umum lalu bantah** (arthurcrockbooks, jade, sammywu): "Kebanyakan orang mengira [X]. Salah."
2. **Tahun + tokoh + konflik** (rt2rj): "Tahun [tahun], [tokoh] sedang kalah melawan [masalah]."
3. **Kekuatan tersembunyi** (Wang): "[Pihak besar] diam-diam bergantung pada [orang tak dikenal] untuk [hal yang mereka tidak bisa buat]."
4. **Objek + misteri** (SWIFT): "Ini [benda]. [Tahun], [hal penting] bergantung padanya."
5. **Satu sifat bersama dengan tiga negasi** (DcMbipLyr_F): "Semua [kelompok] punya satu kesamaan. Bukan [A]. Bukan [B]. Bukan [C]."
6. **Otoritas yang kontrarian** (sammywu): "[Tokoh] bilang [hal yang mengejutkan]."
7. **Pertanyaan relatable** (DfJkMqKPt47, Dfm-1RWo57h): "Kenapa [fenomena] sekarang?"
8. **Ancaman bersyarat** (trace.young): "Kalau kamu tidak [X], kamu cuma [akibat]."
9. **Kontras angka** (mahdiology, dipindah ke depan): "Dulu [angka kecil]. Sekarang [angka besar]."

Catatan: hook paling kuat di data menaruh **kata benda konkret** (biola, telex, remaja, dial) di kalimat pertama. Hook terlemah adalah aforisme umum ("Discipline is the secret...").

### 2.2 Timing beat sebagai % durasi (4 video naratif: rt2rj, arthurcrockbooks, SWIFT, Wang)

| Beat | Rentang % | Catatan data |
|---|---|---|
| HOOK (kalimat pertama) | 0 sampai 8 | Kalimat pertama 1,0 sampai 5,4 dtk |
| Pembalik / pukulan kedua | 8 sampai 17 | "But that's wrong." 8%; "His equations were collapsing." 9%; open loop SWIFT 18% |
| SETUP / konteks | 10 sampai 30 | Latar singkat, angka usia/tahun |
| Cerita + eskalasi | 25 sampai 75 | Re-hook tiap 8 sampai 15 dtk |
| TURNING POINT | 27 sampai 75 | Video pendek (≤55 dtk) cenderung di 27 sampai 60%; video panjang punya dua (tengah dan 75%) |
| LESSON / payoff | 75 sampai 95 | Satu kalimat reframe yang bisa dikutip |
| Penutup / CTA | 92 sampai 100 | Aforisme, loop baru, atau CTA singkat (≤ 3 dtk) |

### 2.3 Pola CTA

| Tipe | Contoh di data | Posisi | Cocok untuk Behindwork? |
|---|---|---|---|
| Tanpa CTA, aforisme | Wang, SWIFT, arthurcrockbooks | 95 sampai 100% | Ya, default untuk video cerita |
| Cliffhanger / loop ke part 2 | rt2rj, DcMbipLyr_F | 77 sampai 100% | Ya, untuk seri |
| Pertanyaan komentar | Dfm-1RWo57h, DfkG39Vy4er | Akhir | Ya: "Mitos founder mana yang mau dicek?" |
| Comment-keyword | jade.got.curious ("comment weird...") | 93 sampai 96% | Ya, kalau ada lead magnet (mis. lembar sumber/PDF) |
| Follow seri | trace.young, willdowding, trey | Akhir | Sesekali |
| DM / jualan | barsolmedia | Akhir | Tidak |

Pola "callback": CTA terbaik (jade) diikuti satu kalimat yang menggemakan hook, sehingga akhir terasa menyambung ke awal (loop tontonan ulang).

### 2.4 Perangkat retensi

- **Pembalik 1 sampai 5 kata** sebagai re-hook: "But that's wrong." "Why?" "But there was one problem." "Then Zuckerberg paid..."
- **"Bukan X, tapi Y"**: rt2rj 13,6 dtk; Wang penutup; arthurcrockbooks "Not turning it to zero, but managing it."
- **Celah rasa ingin tahu yang dibayar di tengah**: Wang menunda "benda apa" sampai 19 dtk; SWIFT menunda solusi sampai 32 dtk.
- **Satu metafora yang konsisten**: dial (arthurcrockbooks), arms dealer (Wang), mesin vs otot (rt2rj). Bagus untuk motion: satu aset, berulang.
- **Angka spesifik**: 1988, 239 bank, 15 negara, $14,3 miliar, 49%. Angka membuat klaim terasa nyata, karena itu **wajib bersumber**.
- **Jembatan ke masa kini**: sejarah ditarik ke kehidupan penonton (rt2rj ke AI; SWIFT ke "kode yang kamu ketik hari ini").
- **Ritme panjang-pendek**: referensi utama rata-rata 10 sampai 11,5 kata per kalimat, tapi variasinya besar (1 sampai 24). Monolog dengan kalimat 27 kata rata-rata (jfsephp) terasa datar.
- **Jeda rapat**: jeda antar segmen di referensi utama ≤ 0,8 dtk; rt2rj ≤ 0,3 dtk. Diam panjang hanya untuk efek (DfJkMqKPt47 sebelum "sabar").

### 2.5 Rentang kecepatan bicara

| Kelompok | wps |
|---|---|
| VO naratif EN (rt2rj, arthurcrockbooks, Wang, SWIFT) | 2,87 sampai 3,40 |
| Kreator bicara ke kamera EN | 3,06 sampai 5,05 (median ±3,9) |
| Klip wawancara berat | 1,97 |
| Bahasa Indonesia (2 video) | 2,57 (reflektif) dan 3,13 (santai) |

Kalibrasi: kata bahasa Indonesia rata-rata lebih panjang (imbuhan), dan VO dokumenter lebih tenang daripada obrolan santai 3,13 wps. Jadi pakai **2,6 wps** untuk anggaran kata, **2,8 sampai 2,9** maksimum untuk hook dan bagian cepat, **2,3 sampai 2,5** untuk lesson. Angka ini perlu dicek ulang setelah 3 VO Behindwork pertama direkam (ukur dengan Whisper yang sama).

### 2.6 Kenapa dua referensi utama bekerja (ringkas)

1. Kalimat pertama berisi tokoh/konsep konkret + konflik, bukan nasihat.
2. Koreksi atau pembalik datang sebelum detik 9.
3. Ada satu gagasan inti dan satu metafora visual yang dipakai sampai akhir.
4. Bukti bernama (riset, tahun, tokoh) datang tepat setelah klaim.
5. Ada pergeseran dari "cerita mereka" ke "hidup kamu" di sekitar 35 sampai 50%.
6. Penutup adalah kalimat yang bisa dikutip atau loop baru, bukan "terima kasih sudah menonton".
7. Kecepatan ±3 wps dengan jeda pendek: padat tapi masih bisa diikuti teks di layar.

---

## 3. Template script Behindwork

### 3.1 Aturan wajib

1. **Setiap klaim fakta punya ID sumber** dari lembar riset (lihat `RISET-METODE-DAN-PILOT.md` bagian 2.7). Format ID: `[KODE-TOKOH]-[nomor]`, contoh `JH-02`. Kolom "sumber" di naskah tidak boleh kosong untuk kalimat yang berisi nama, angka, tanggal, tempat, atau kutipan.
2. Hanya klaim berlabel **TINGGI** yang ditulis sebagai fakta. **SEDANG** ditulis dengan "menurut [sumber]" atau "ia mengaku". **RENDAH** tidak dipakai. **MITOS** hanya muncul sebagai hal yang dikoreksi.
3. **Sudut koreksi mitos** adalah default: ambil versi populer yang salah, bantah di 3 sampai 6 detik pertama, lalu tunjukkan versi yang terverifikasi.
4. Tidak ada adegan rekaan yang disajikan sebagai fakta (pelajaran dari rt2rj). Kalau visual memakai rekonstruksi, teks layar menandai "ilustrasi".
5. Kutipan langsung hanya dengan URL + timestamp video asli. Tanpa itu, parafrasekan dan tandai "menurut pengakuannya".
6. Angka uang/valuasi selalu dengan "per [tanggal]".
7. Cek berita 30 hari terakhir tentang tokoh sebelum publish; jabatan ditulis sesuai status terkini.
8. Satu video, satu pelajaran, satu metafora visual utama.
9. Kalimat: rata-rata 8 sampai 12 kata; setiap 8 sampai 15 dtk ada satu kalimat 1 sampai 5 kata sebagai re-hook.
10. Kartu sumber di akhir (1 sampai 1,5 dtk) dan daftar sumber lengkap di caption.

### 3.2 Struktur A · 45 sampai 60 detik (target 55 dtk, ±145 kata, rentang 115 sampai 160)

| Beat | Detik | Kata (2,6 wps) | Fungsi |
|---|---|---|---|
| 1. HOOK mitos | 0 sampai 3 | 7 sampai 9 | Versi populer, atau "Sebelum [perusahaan] bernilai..." |
| 2. Pembalik | 3 sampai 6 | 4 sampai 8 | "Salah." + petunjuk versi asli (celah rasa ingin tahu) |
| 3. SETUP | 6 sampai 15 | 20 sampai 24 | Siapa, umur, tempat, tahun; fakta asli pertama |
| 4. Re-hook | 15 sampai 17 | 3 sampai 6 | "Tapi itu belum seberapa." / "Masalahnya..." |
| 5. Eskalasi | 17 sampai 32 | 35 sampai 40 | 2 sampai 3 fakta yang naik tingkat (lebih berat, lebih aneh, lebih besar) |
| 6. TURNING POINT | 32 sampai 42 | 24 sampai 28 | Momen perubahan; tahun + tempat + keputusan |
| 7. Callback | 42 sampai 45 | 6 sampai 8 | Menyambung ke hook (benda/tempat yang sama) |
| 8. LESSON | 45 sampai 52 | 16 sampai 19 | Satu kalimat reframe "bukan X, tapi Y" |
| 9. CTA + kartu sumber | 52 sampai 55 | 6 sampai 10 | Pertanyaan komentar atau loop; kartu sumber di layar |

### 3.3 Struktur B · 75 sampai 90 detik (target 85 dtk, ±220 kata, rentang 195 sampai 245)

| Beat | Detik | Kata (2,6 wps) | Fungsi |
|---|---|---|---|
| 1. HOOK mitos | 0 sampai 3 | 7 sampai 9 | Versi populer |
| 2. Pembalik + janji | 3 sampai 7 | 8 sampai 11 | "Salah. Yang asli lebih [aneh/berat/menarik]." |
| 3. SETUP | 7 sampai 18 | 26 sampai 30 | Latar founder |
| 4. Open loop 1 | 18 sampai 21 | 6 sampai 8 | Pertanyaan yang baru dijawab di beat 7 |
| 5. Cerita 1 | 21 sampai 35 | 34 sampai 38 | Masa sulit / kerja pertama |
| 6. Re-hook | 35 sampai 38 | 4 sampai 8 | Kalimat pendek pembalik |
| 7. Cerita 2 + eskalasi | 38 sampai 52 | 34 sampai 38 | Keterampilan/karier yang mempersiapkan; jawab open loop 1 |
| 8. TURNING POINT | 52 sampai 64 | 28 sampai 32 | Pendirian / keputusan besar; angka bersumber |
| 9. Jembatan ke penonton | 64 sampai 70 | 14 sampai 16 | "Kenapa ini penting buat kamu" |
| 10. LESSON | 70 sampai 80 | 23 sampai 26 | Reframe + koreksi narasi "dari nol" |
| 11. CTA + callback + kartu sumber | 80 sampai 85 | 10 sampai 13 | Pertanyaan komentar / keyword, lalu satu kalimat yang menggemakan hook |

### 3.4 Sepuluh template hook untuk cerita founder

1. "Sebelum [perusahaan] bernilai [angka, per tanggal], [founder] pernah [pekerjaan/kondisi tak terduga]."
2. "Katanya [founder] dulu [mitos populer]. Salah. Yang benar: [fakta pendek]."
3. "Kebanyakan orang mengira [perusahaan] lahir dari [versi populer]. Padahal [lokasi/kejadian asli]."
4. "Tahun [tahun], [founder] sedang kalah melawan [masalah konkret]."
5. "[Perusahaan besar] diam-diam bergantung pada [orang/perusahaan tak dikenal] untuk [hal yang tidak bisa mereka buat]."
6. "Ini [benda/tempat]. Di sinilah [perusahaan] pertama kali [dirancang/dijual/ditolak]."
7. "[Founder] ditolak [jumlah bersumber] kali sebelum [hasil]. Penolakan ke-[n] yang mengubah segalanya."
8. "Umur [angka], [founder] [kondisi]. Umur [angka], ia [pencapaian]. Yang terjadi di antaranya jarang diceritakan."
9. "Semua orang tahu [produk]. Hampir tidak ada yang tahu siapa [orang di baliknya]."
10. "[Founder] pernah menjual [perusahaan/aset] seharga [angka]. Hari ini nilainya [angka, per tanggal]."

Setiap angka dan tanggal di template wajib punya ID sumber. Untuk template 7, angka penolakan yang terlalu bulat adalah lampu merah (lihat protokol riset 2.4).

### 3.5 Format naskah

Kolom wajib:

| waktu | VO | teks layar | visual/B-roll | sumber |
|---|---|---|---|---|
| detik mulai sampai selesai | kalimat yang dibaca narator | maks 6 kata, kata kunci saja | motion/arsip/ilustrasi (+ label "ilustrasi" bila rekonstruksi) | ID klaim (wajib untuk fakta), "-" untuk kalimat opini/transisi |

Di bawah tabel: jumlah kata, estimasi durasi pada 2,6 wps, daftar ID yang dipakai, dan catatan editorial.

---

## 4. Contoh naskah · Jensen Huang (Struktur A, ±55 detik)

ID sumber mengacu ke tabel klaim di `RISET-METODE-DAN-PILOT.md` bagian 1 (nomor baris = nomor ID):
- `JH-01` mitos "tukang cuci mobil" (label MITOS)
- `JH-02` Denny's Portland, umur 15: dishwasher, busboy, waiter (NVIDIA Blog 2023; Stanford GSB 2024)
- `JH-05` umur 9 di Oneida Baptist Institute, Kentucky, membersihkan toilet
- `JH-07` pendirian Nvidia 1993 dari pertemuan di booth Denny's San Jose, bersama Chris Malachowsky dan Curtis Priem
- `JH-08` karier sebelum Nvidia: AMD lalu LSI Logic
- `JH-09` pendidikan teknik elektro (Oregon State, Stanford)
- `JH-10` (tambahkan ke lembar riset) Form 8-K NVIDIA, 12 Nov 2026: Huang mundur sebagai CEO; Colette Kress CEO interim

Judul kerja: **"Jensen Huang bukan tukang cuci mobil"**. Pelajaran: cerita "dari nol" sering dibumbui; versi aslinya kerja kasar + bertahun-tahun belajar di industri.

| waktu | VO | teks layar | visual/B-roll | sumber |
|---|---|---|---|---|
| 0 sampai 3 | Katanya, sebelum mendirikan Nvidia, Jensen Huang adalah tukang cuci mobil. | "TUKANG CUCI MOBIL?" | Kartu kutipan viral (ilustrasi, bukan unggahan asli) dengan ikon mobil + busa | JH-01 |
| 3 sampai 6 | Salah. Tidak ada sumber kredibel yang menyebut itu. | stempel "MITOS" | Stempel merah menghantam kartu; kartu retak | JH-01 |
| 6 sampai 8 | Yang ia cuci bukan mobil. Tapi piring. | "BUKAN MOBIL. PIRING." | Mobil berubah bentuk jadi tumpukan piring (morph) | JH-02 |
| 8 sampai 15 | Umur lima belas, di Portland, Oregon, ia dapat kerja pertama di Denny's. Pencuci piring, lalu busboy, lalu pelayan. | "15 TAHUN · DENNY'S PORTLAND" lalu tiga anak tangga: pencuci piring → busboy → pelayan | Peta Oregon zoom ke Portland; ikon tangga naik tiga anak tangga | JH-02 |
| 15 sampai 17 | Tapi itu bukan titik terendahnya. | "BELUM SEBERAPA" | Tangga turun cepat ke bawah layar | - |
| 17 sampai 24 | Umur sembilan, ia dikirim ke sekolah asrama di Kentucky. Salah satu tugasnya: membersihkan toilet. | "9 TAHUN · KENTUCKY" | Siluet anak kecil, ember, sikat; label kecil "Oneida Baptist Institute" | JH-05 |
| 24 sampai 32 | Ia tumbuh, belajar teknik elektro, lalu merancang chip di AMD, kemudian di LSI Logic. | "AMD → LSI LOGIC" | Garis waktu horizontal; ikon chip menyala per titik | JH-08, JH-09 |
| 32 sampai 42 | Lalu tahun sembilan belas sembilan puluh tiga, di sebuah booth Denny's di San Jose, ia dan dua rekannya merancang perusahaan baru. Namanya Nvidia. | "1993 · SAN JOSE" lalu "NVIDIA" | Denah booth dari atas, tiga gelas kopi, kertas sketsa; logo muncul dari sketsa | JH-07 |
| 42 sampai 45 | Di jaringan restoran yang sama tempat ia dulu mencuci piring. | "DENNY'S. LAGI." | Callback: tumpukan piring dari detik 6 muncul di samping booth | JH-02, JH-07 |
| 45 sampai 52 | Pelajarannya: cerita "dari nol" sering dibumbui. Versi aslinya kerja kasar, bertahun-tahun di industri chip, baru mendirikan perusahaan. | "BUKAN DARI NOL. DARI BAWAH." | Tiga balok bertumpuk: kerja kasar, industri chip, Nvidia | JH-02, JH-05, JH-08 |
| 52 sampai 55 | Mitos founder mana lagi yang harus kami cek? Tulis di komentar. | "KOMENTAR: NAMA FOUNDER" + baris kecil "Jensen Huang · salah satu pendiri dan mantan CEO Nvidia" | Kartu sumber: "Sumber: NVIDIA Blog (2023), Stanford GSB (2024), Fortune (2025), bio NVIDIA, Form 8-K NVIDIA (12 Nov 2026)" | JH-10 (untuk jabatan) |

Jumlah kata VO: ±135 kata → ±52 dtk pada 2,6 wps, ±48 dtk pada 2,8 wps. Sisa 3 sampai 7 dtk untuk napas, transisi, dan kartu sumber. Kalau perlu memanjang ke 60 dtk, tambahkan di beat eskalasi satu fakta TINGGI lain (mis. ia kuliah S2 di Stanford sambil bekerja, `JH-09`).

Catatan editorial:
- Status jabatan: Huang tidak lagi CEO sejak 12 Nov 2026 (`JH-10`). VO tidak menyebut jabatan masa kini; teks layar penutup menulis "salah satu pendiri dan mantan CEO Nvidia". Video ini tidak membahas pengunduran diri atau beritanya.
- Jangan menulis "car washer berasal dari salah ingat dishwasher" sebagai fakta; itu dugaan, bukan temuan bersumber.
- "Sekolah asrama" dipakai, bukan "reform school" (istilah beda antar sumber, lihat riset #5).
- Kutipan Huang soal "tidak ada tugas yang di bawah saya" sengaja tidak dipakai sampai timestamp video Stanford GSB tercatat di lembar riset.
- Keputusan kapan video Jensen tayang (tunda atau jalan dengan teks netral) tetap di tangan Irfan, sesuai catatan di `RISET-METODE-DAN-PILOT.md`.
