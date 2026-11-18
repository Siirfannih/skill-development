# BEDAH 85 · ritme referensi dan peta penambahan R7

**Status: analisis visual, ASR, level, dan peta B selesai; belum LULUS penuh untuk A4/A5 yang memerlukan verifikasi dengar.** Semua 82,5 detik container tercakup. Jenis SFX, BPM/key lagu, instrumen, dan pergantian lagu tetap diberi status inferensi. Tidak ada visual/audio proyek yang diubah.

## Yang bisa kita tiru · 10 baris

1. Pertahankan VO kita pada ×1,0; referensi mengalir 3,65 token/detik, kita 2,72, sementara median jeda kalimat hampir sama (0,19 vs 0,207 detik).
2. Ganti pusat perhatian pada kata/ide kunci: wajah → kata tunggal → bukti visual → kembali wajah, dengan waktu yang mengikuti ucapan.
3. Pakai cut 1 frame untuk sebagian besar perpindahan; simpan transisi yang terasa untuk perubahan dunia, seperti wipe blok putih 41,267–41,367.
4. Ambil negative flash/piksel sebagai aksen singkat 1–3 frame; rangkaian paling padat berada di hook, bukan sepanjang esai.
5. Bedakan ukuran peran teks: subtitle terukur 3,19% H, hero lazim 12,92–23,61% H; IS 58,89% H hanya ±0,30 detik.
6. Pindahkan peran teks: kata di layar penuh, teks yang menunjuk gestur, teks di balik kepala, lalu label fisik/UI; bentuk berubah sesuai maksud kalimat.
7. Bangun satu aksi utuh per sisipan: counter, mengetik, kartu tunggal menjadi grid, atau wide kartu fisik menjadi close-up; drift saja tidak menjadi peristiwa baru.
8. Siapkan sapuan udara, swell, klik/tap, dan hit pada engsel visual; label ini masih kandidat model pada referensi, jadi dengarkan sebelum memilih bunyinya.
9. Atur beda level dan turun-naiknya bed di bawah VO; estimasi residual tanpa kandidat SFX median 14,16 LU di bawah VO, sedangkan BPM alat belum stabil.
10. Prioritaskan empat rentang B 25,092–28,929; 38,105–42,342; 43,544–48,015; 53,554–56,990 untuk pergantian desain/aksen; jangan menambah di montase 15–23 yang sudah padat.

## Definisi dan bukti

“Hal baru” pada peta utama adalah onset frasa baru, visual/bentuk baru, atau SFX baru. Satu proses ketik/counter/reveal yang berkesinambungan dihitung sebagai satu episode; gerak tangan biasa, drift kamera, setiap huruf, dan beat musik rutin tidak dihitung satu-satu. Peristiwa yang jatuh pada frame yang sama digabung. Deteksi per subframe dan penambahan kata yang lebih rapat disimpan terpisah, sehingga angka tidak diam-diam berubah karena granulasinya. Ini peta bentuk perhatian, bukan pengukuran retensi/bosan penonton.

Video referensi **82,366667 s /2471 frame @30 fps**; container/audio metadata **82,497642 s**; hasil decode audio **82,409025 s**. Jadi tail playable di luar gambar 42,36 ms, sedangkan metadata menyiratkan 130,98 ms. Gambar menjadi hitam mulai **80,833333 s**. Video kita **83,817067 s /2512 frame @30000/1001 fps**. Semua tail tetap tercatat pada angka seluruh durasi.

Bukti gambar: seluruh durasi kedua video **2 fps**, hook **10 fps**, bagian gestur/neon **8 fps**, hero 52,3–55,4 **15 fps**, dan semua **85 puncak scene-detect** dalam triplet sumber **frame−1 / frame / frame+2**. Label lembar memakai PTS frame asli dari `showinfo`, bukan timestamp keluaran filter fps. Tepi cut dari sumber tepat 1 frame; onset layer tanpa puncak scene diberi toleransi 0,10–0,25 s di tabel. OCR subtitle yang kotor disimpan tetapi **tidak** dihitung otomatis sebagai teks baru.

[Peta PNG](../qc/r7/bedah85/novelty_timeline.png) · [PDF](../qc/r7/bedah85/novelty_timeline.pdf) · [manifest input/hash](../qc/r7/bedah85/inputs.json) · [semua angka interval](../qc/r7/bedah85/novelty_metrics.json).

## A1 dan B1 · laju bicara dan jeda

| Ukuran | Referensi | Video kita |
|---|---|---|
| Token ASR | 301 | 228 |
| Token /detik seluruh timeline | 3,6525 (audio decode 82,409 s) | 2.7202 (83,817 s) |
| Token /detik rentang kata pertama–terakhir | 3,7354 | 2.7335 |
| Token /jumlah durasi kata (artikulasi ASR) | 4,0941 | 3.2787 |
| Jeda akhir kalimat median /p90 | 0,190 /0,260 s | 0,2065 /0,2304 s |
| Batas kalimat .?! | 18 ASR; 20 setelah cek tanda baca parsial large-v3 | 26 |
| Celah antarkata >0,30 s | 4, maksimum 0,62 s | 1, maksimum 0,355 s |

Referensi memakai faster-whisper **small CPU int8, English, beam 5, word timestamps**, tanpa VAD/prompt; large-v3 menjadi cek parsial 0–27,06 s. B memakai alignment ASR/FA `edit/words.json` yang sudah ada. Token ASR berbeda dari kata linguistik baku; proper name/angka dan perbedaan bahasa membatasi perbandingan. Rasio token timeline **1,34×** tidak berarti VO kita harus dipercepat. Selisih median jeda hanya 16,5 ms.

| Video | Dari–sampai s | Lama s | Kata sekitar |
|---|---|---|---|
| Ref | 40,980–41,420 | 0,440 | trainer → but |
| Ref | 55,520–56,000 | 0,480 | doubt → friction |
| Ref | 56,260–56,620 | 0,360 | friction → risk |
| Ref | 79,100–79,720 | 0,620 | yours → but |
| Kita | 3,8985–4,2535 | 0,355 | juga. → Ya, |

Celah ASR di atas bukan bukti hening digital. Pada ambang vokal median ucapan−18 dB, run senyap ≥0,30 s referensi hanya muncul di outro 80,75–81,14 dan 81,81–82,40. [ASR A](../qc/r7/bedah85/audio/reference_asr.json), [transkrip berwaktu](../qc/r7/bedah85/audio/reference_transcript.txt), [kata A](../qc/r7/bedah85/audio/reference_words.json), [angka/kata/jeda B](../qc/r7/bedah85/ours/speech_metrics.json).

## A3 dan B · interval hal baru

| Peta | Frame ber-event | Median s | p90 s | Interval terpanjang s | Rentang ≥3 s |
|---|---|---|---|---|---|
| Ref · visual + frasa | 124 | 0.533 | 1.423 | 2.900 (41.267–44.167) | 0 |
| Ref · visual + frasa + kandidat SFX (inferensi) | 163 | 0.367 | 1.233 | 2.333 (77.600–79.933) | 0 |
| Kita · visual + frasa | 143 | 0.500 | 1.181 | 2.069 (70.003–72.072) | 0 |
| Kita · visual + frasa + SFX cue R6 | 181 | 0.334 | 1.001 | 2.002 (65.999–68.001) | 0 |
| Ref · pergantian desain saja | 95 | 0.567 | 1.666 | 6.300 (41.267–47.567) | 6 |
| Kita · pergantian desain saja | 64 | 1.001 | 2.382 | 5.405 (23.590–28.996) | 5 |
| Kita · desain + SFX, tanpa KT narasi rutin | 107 | 0.467 | 1.802 | 4.471 (43.544–48.015) | 4 |

**Dengan definisi literal visual ATAU frasa ATAU SFX, B tidak mempunyai rentang ≥3 detik tanpa hal baru.** Bahkan peta visual+frasa saja tidak mempunyai rentang itu. Menghitung kata tambahan dan subflash yang lebih rapat memberi peta ref 165 frame ber-event, median 0.333 s/p90 1.300 s; peta detail itu tidak dipakai untuk membandingkan jumlah dengan B yang dicatat per frasa.

Untuk desain tanpa KT rutin, referensi sendiri menahan pola selama **6,30 s (41,267–47,567)**; ada hold 3,97; 3,20; 4,67; 3,03; dan 4,53 s. Jadi “3–5 detik selalu baru” tidak terbukti sebagai aturan cut. Kejadian kecil dan pergantian peran teks mengisi bagian di antara perubahan desain. Tidak ada bukti beat grid stabil untuk menyebut musik sebagai pemicu semua cut.

Peta per detik yang dapat dihitung ulang: [ref visual+frasa](../qc/r7/bedah85/ref_visual_text_per_second.csv), [ref + kandidat SFX](../qc/r7/bedah85/ref_visual_text_candidate_sfx_per_second.csv), [B visual+frasa](../qc/r7/bedah85/ours_visual_text_per_second.csv), [B + SFX](../qc/r7/bedah85/ours_visual_text_sfx_per_second.csv), [B desain+SFX](../qc/r7/bedah85/ours_design_sfx_per_second.csv). Daftar onset lengkap berakhiran `_events.json` di folder yang sama.

## B · rentang yang layak ditinjau Sutradara

Tabel ini memakai **desain/objek/aksi baru + SFX**, sambil mengabaikan pergantian narasi rutin. Karena itu ia menandai rentang penyajian yang perlu ditinjau, bukan mengklaim frame beku atau senyap total. Toleransi onset UI isi ±0,25 s; batas utama dari R6 cue/frame. Usulan hanya bentuk dan tetap harus diputuskan Sutradara sebelum mengubah adegan.

| Rentang s | Lama s | Isi frame R6 | Usulan konkret | Kosakata referensi | Titik tambah |
|---|---|---|---|---|---|
| 25,092–28,929 | 3,837 | Jendela Claude terang + wajah lingkaran, narasi “template / Jadi kalau orang-orang kan sering banget bilang edit kayak…” | Sisipkan satu crop dekat ke prompt pada “orang-orang”, lalu kembali untuk /apple-style; atau satu kartu contoh menjadi susunan contoh dalam dunia UI. Jangan menambah kata yang tidak diucapkan. | 6,767 close-up sesudah wide; 47,567 kartu →48,933 grid | ±26,9 s: perubahan framing + satu klik/sapuan pendek; satu arah fokus |
| 38,105–42,342 | 4,238 | Wajah + narasi “Jadi gak usah ditanya kenapa aku gak langsung publish dan open source. Karena perlu…” | Potong ke crop dekat pada “gak langsung publish”, atau gantikan satu frasa KT dengan kata kunci lebih besar; tahan sampai “balik modal”. | 37,467 punch-in untuk “which works”; 20,600 WHY? | ±39,74 s: satu penekanan, tanpa menambah lapisan narasi kedua |
| 43,544–48,015 | 4,471 | Wajah, “habis banget… buat biayanya… Aku sampai harus langganan ChatGPT Pro Max”; kartu angka baru hadir 48,018 | Setelah penekanan habis banget, buat perubahan crop pada “harus langganan”, lalu kartu angka tetap mendarat sesuai ucapan 20×. | 6,767 punch-in b-roll; 28,967 HOW →29,467 TO MAKE →30,133 CONTENT | ±45,86–46,1 s: satu crop/penekanan kata dengan satu tap, lalu beri jarak hingga kartu |
| 53,554–56,990 | 3,437 | Kartu angka sudah keluar; wajah menjelaskan “Dan bahkan sistem workflow ini memungkinkan sistem kerja…” | Ubah skala satu frasa “sistem workflow”, atau perkenalkan satu inset dokumen/diagram yang tumbuh menjadi UI koordinasi pada 57,661; pilih satu bentuk. | 3,400 foreground pembicara + kartu; 34,767 teks ruang pada gestur | ±55,0 s: onset satu bentuk baru; jangan menambah whoosh per kata |

Jika hanya menghitung desain tanpa SFX, ada satu tambahan: **50,284–53,554 (3,270 s)** saat kartu 20×/5× masih tertahan. Audio sudah memberi refresh di dalamnya, jadi ini prioritas rendah; tidak perlu otomatis diberi efek lagi.

| Bentuk ditahan | Durasi | Yang tetap baru di dalamnya | Tindakan yang lebih berguna |
|---|---|---|---|
| UI prompt Claude 23,594–34,600 | 11,006 s | Narasi, /apple-style, /cinematic-storytelling, reset prompt | Gunakan 2–3 ukuran framing prompt, mengikuti contoh cut wide→close; bukan menambah emoji. |
| UI koordinasi 57,661–72,072 | 14,411 s | Teks/pesan, session, balasan, status berkas terus bertambah | Arahkan kamera ke pesan/penulis aktif dan berkas hasil. Pola 59,300 wide kartu fisik →62,500 close detail →64,000 wide dapat dipinjam. |
| Montase slop 15,067–23,594 | 8,527 s | Bingkai, emoji, panah, hero dan keluar layer sudah rapat | Tidak diprioritaskan untuk tambahan; cek fokus tunggal saat dirakit R7. |

## A2 · seluruh pergantian visual

Tabel berikut memuat **95 kelompok/peristiwa visual** sepanjang gambar, termasuk cut, pergantian kata hero, dan kejadian di dalam montase. **85 puncak** `scene >0.30` seluruhnya ditautkan ke kelompoknya; itu bukan 85 hard cut, karena flash dan blur juga memicu detektor. Ambang 0,10/0,20/0,30 menghasilkan **158/104/85** kandidat pada ref; B **36/11/5**. B yang sedikit puncak warna tetap punya banyak teks/objek baru.

Pemicu di tabel adalah asosiasi ucapan/isi yang terlihat, bukan bukti sebab atau ketukan musik. Durasi transisi berbeda dari durasi shot; 1f = 33,33 ms. [CSV kelompok](../qc/r7/bedah85/ref/A2_visual_groups.csv) · [semua 85 puncak + label](../qc/r7/bedah85/ref/A2_all_85_detector_peaks.csv) · [11 lembar triplet](../qc/r7/bedah85/ref/detector_triplets/peaks_01_08.jpg).

| ID | Dari–sampai s | Jenis / yang berubah | Ucapan/kata | Durasi masuk/pergantian | Ketelitian |
|---|---|---|---|---|---|
| R001 | 0.000–0.500 | glitch · Wajah b-roll terbelah, blok piksel/negatif + WHY / DOES | why does | burst 0.57s | frame |
| R002 | 0.500–0.567 | slab · Bidang ungu + garis kotak sebelum slab | all | 2f / 0.067s | ±0.10s |
| R003 | 0.567–0.767 | slab · Slab penuh; ALL membesar/bertambah huruf | all | 1f / ≤0.033s | frame |
| R004 | 0.767–1.167 | hero · ALL diganti CONTENT pada slab yang sama | content | 1f / ≤0.033s | ±0.10s |
| R005 | 1.167–1.567 | hero · Reset skala: FEEL kecil di bidang gelap | feel | 1f / ≤0.033s | frame |
| R006 | 1.567–2.167 | glitch/neon · UNORIGINAL dibangun dengan blok piksel, muka B&W | unoriginal | ±0.57s sampai kata utuh | ±0.10s |
| R007 | 2.167–2.200 | hero/negative · NOW? di atas wajah false-colour/solarized | now | 1f bidang false-colour | frame |
| R008 | 2.200–2.467 | hero · NOW? + wajah abu kembali dari false-colour | now | 1f cut; warna settle ±0.20s | frame |
| R009 | 2.467–3.400 | b-roll · Duduk di bangku, teks tumpuk YOU’RE SCROLLING REELS | you’re scrolling reels | 1f / ≤0.033s | frame |
| R010 | 3.400–4.567 | kartu/counter · Ponsel di tengah, subjek di depan, reels watched bertambah; new tetap 0 | and it’s the same | 1f cut; counter ±1.17s | frame |
| R011 | 4.567–5.000 | neon · CLAUDE + ikon neon, subjek kecil di bawah | Claude has killed the | ±0.27s reveal | ±0.10s |
| R012 | 5.000–5.567 | negative/glitch · Sisipan negatif vertikal lalu blur/pantul ke CLAUDE | seventh video | 3f / 0.10s flash; recovery ±0.23s | frame |
| R013 | 5.567–6.400 | cut · Kembali ke wajah; label daftar kecil di kanan | seventh video editor in a row | 1f / ≤0.033s | frame |
| R014 | 6.400–6.733 | b-roll · Wajah samping di meja | you’ve watched yet | 1f / ≤0.033s | frame |
| R015 | 6.733–6.767 | negative · Flash negatif b-roll meja sebelum close-up | you’ve watched yet | 1f / 0.033s | frame |
| R016 | 6.767–7.367 | punch-in · B-roll meja yang sama dipotong menjadi close-up | you’ve watched yet | 1f / ≤0.033s | frame |
| R017 | 7.367–7.467 | kartu · B-roll orang di bangku dalam kartu pada kertas | another 16:9 city vlog | 1f / ≤0.033s | frame |
| R018 | 7.467–7.533 | negative · Kartu b-roll dibalik negatif singkat | city vlog | 2f / 0.067s | frame |
| R019 | 7.533–7.600 | negative · Kartu bangku kembali positif dari negatif | city vlog | 1f / ≤0.033s | frame |
| R020 | 7.600–7.767 | b-roll · Kartu berganti rel kereta | city vlog | 1f / ≤0.033s | frame |
| R021 | 7.767–7.967 | b-roll · Kartu berganti kota; kotak negatif lokal | city vlog | 1f cut + kotak ±0.20s | frame |
| R022 | 7.967–8.100 | b-roll · Kartu berganti tangan memegang ponsel | city vlog | 1f / ≤0.033s | ±0.10s |
| R023 | 8.100–8.133 | flash · Kartu putih penuh 1 frame | city vlog | 1f / 0.033s | frame |
| R024 | 8.133–8.233 | b-roll · Kartu jalan bertangga setelah flash | city vlog | 1f / ≤0.033s | ±0.10s |
| R025 | 8.233–8.600 | hero/b-roll · Kereta + LONDON condensed; potongan negatif menumpuk | city vlog | 1f cut + overlay ±0.23s | frame |
| R026 | 8.600–9.033 | hero/b-roll · Big Ben + LONDON; kotak negatif lokal | spamming the negative filter | 1f cut; flash lokal ±0.10s | frame |
| R027 | 9.033–9.167 | b-roll · Kartu kota dari jendela bergerak | negative filter | 1f / ≤0.033s | frame |
| R028 | 9.167–9.267 | negative · Seluruh isi kartu dibalik negatif | negative filter | 3f / 0.10s | frame |
| R029 | 9.267–9.400 | negative · Kartu kembali positif | negative filter | 1f / ≤0.033s | frame |
| R030 | 9.400–9.467 | b-roll · Kembali kartu tangga | negative filter | 1f / ≤0.033s | frame |
| R031 | 9.467–9.567 | negative · Tangga negatif | negative filter | 3f / 0.10s | frame |
| R032 | 9.567–9.667 | negative · Tangga positif lagi | negative filter | 1f / ≤0.033s | frame |
| R033 | 9.667–9.867 | b-roll · Kartu rel kereta lagi, kotak negatif lokal | negative filter | 1f cut + kotak ±0.13s | ±0.10s |
| R034 | 9.867–9.967 | negative · Rel kereta negatif penuh | negative filter | 3f / 0.10s | frame |
| R035 | 9.967–10.367 | cut · Kembali wajah; kotak negatif masih menutupi muka | maybe one more | 1f cut; kotak lepas ±0.37s kemudian | frame |
| R036 | 10.367–11.033 | overlay-out · Kotak negatif hilang, wajah utuh | maybe one more | 1f / ≤0.033s | ±0.10s |
| R037 | 11.033–11.233 | b-roll/graphic · Tengkorak berpendar dengan garis lari | epilepsy edit | 1f cut; garis ±0.13s | frame |
| R038 | 11.233–11.400 | hero/graphic · Tengkorak hitam-putih + about | epilepsy edit | 1f / ≤0.033s | frame |
| R039 | 11.400–12.733 | grid · Montase 3×3; sel dan about/beauty/of/the/universe berganti | epilepsy edit | burst 1.33s; cut internal 1–4f | frame |
| R040 | 12.733–13.367 | cut/typography · Wajah; kata sponsor berganti di dada, kemudian kartu logo | it’s the Ocular Sounds | 1f cut; kartu ±0.20s masuk | frame |
| R041 | 13.367–14.533 | kartu · Kartu logo sponsor muncul di dada | Ocular | ±0.20s | ±0.15s |
| R042 | 14.533–15.900 | b-roll · Ponsel vertikal di antara dua kolom putih | you’re hunting through the feed | 1f / ≤0.033s | frame |
| R043 | 15.900–16.567 | cut · Kembali wajah dengan subtitle yang sama | for something | 1f / ≤0.033s | frame |
| R044 | 16.567–17.200 | slab/hero · INTERESTING di bidang penuh; huruf rapat saling menekan | interesting | 1f / ≤0.033s | frame |
| R045 | 17.200–17.600 | slab/hero · ORIGINAL, ganti bidang sekaligus kata | original | 1f / ≤0.033s | frame |
| R046 | 17.600–18.167 | cut · Kembali wajah | you can run through your | 1f / ≤0.033s | frame |
| R047 | 18.167–18.567 | background · Latar adegan film di belakang matte subjek | Kling / Midjourney | 1f / ≤0.033s | frame |
| R048 | 18.567–19.067 | background · Latar halaman Higgsfield Genjutsu | Higgsfield Genjutsu | 1f / ≤0.033s | frame |
| R049 | 19.067–19.633 | background · Latar unggahan perbandingan video | Higgsfield Genjutsu | 1f / ≤0.033s | frame |
| R050 | 19.633–20.600 | b-roll/ketik · B-roll B&W melihat ponsel; BUT NOTHING IS HITTING bertambah | but nothing is hitting | 1f cut; teks ±0.67s | frame |
| R051 | 20.600–21.100 | hero/cut · Wajah + WHY? besar di dada | why | 1f / ≤0.033s | frame |
| R052 | 21.100–23.300 | b-roll · Laptop B&W; caption besar di atas layar, kata aksen berganti | as a beginner / fastest route | 1f cut; word reveal sesuai VO | frame |
| R053 | 23.300–24.467 | cut/overlay · Wajah + potongan b-roll wajah lain; label COOL EFFECT | is by copying a format | 1f cut; sisipan ±0.30s | frame |
| R054 | 24.467–25.767 | glitch/b-roll · B-roll wajah terbelah lagi; LEARN THE EFFECT | learning how to execute it | 1f cut; glitch ±1.30s | frame |
| R055 | 25.767–27.367 | b-roll · Cermin; duplikasi/potongan vertikal bergerak berulang | adding that skill to your inventory | 1f cut; pulse ±0.20s | frame |
| R056 | 27.367–27.900 | hero/glitch · COPYING pada kertas, diawali ketik huruf dan flash | copying | ±0.23s build; 1f flash 27.533 | frame |
| R057 | 27.900–28.967 | typography · Hero mengecil/hilang; kalimat is very useful for learning bertambah | is very useful for learning | ±0.60s word reveal | ±0.10s |
| R058 | 28.967–29.467 | hero/cut · Wajah + HOW | how | 1f / ≤0.033s | frame |
| R059 | 29.467–30.133 | hero/b-roll · B-roll samping + TO MAKE | to make | 1f / ≤0.033s | frame |
| R060 | 30.133–30.433 | hero · CONTENT mengganti TO MAKE | content | 1f / ≤0.033s | frame |
| R061 | 30.433–31.200 | cut · Kembali wajah | but everyone’s trying to be | 1f / ≤0.033s | frame |
| R062 | 31.200–32.467 | b-roll/ketik · Jalan depan toko + teks monospace menumpuk | trying to be a content creator | 1f cut; ketik ±1.10s | frame |
| R063 | 32.467–33.367 | b-roll · Meja editor; kata aktif berganti aksen | we’ve all been advised to copy | 1f / ≤0.033s | frame |
| R064 | 33.367–34.767 | cut · Kembali wajah, tanpa mengulang kartu | copy what’s working | 1f / ≤0.033s | frame |
| R065 | 34.767–35.533 | teks-ruang · ANGLE menempel arah gestur tangan | tweak the angle | ±0.13s build; ±0.67s hidup | ±0.13s |
| R066 | 35.533–35.900 | teks-ruang · VISUAL mengikuti gestur di sisi lain | the visual | ±0.13s build; ±0.37s hidup | ±0.13s |
| R067 | 35.900–37.467 | teks-ruang · HOOK STRUCTURE dua baris bergerak bersama tangan | the hook structure | ±0.13s build; ±0.87s hidup | ±0.13s |
| R068 | 37.467–38.167 | punch-in · Wajah lebih dekat, reset untuk kontras argumen | which works | 1f / ≤0.033s | frame |
| R069 | 38.167–39.767 | neon · Huruf neon ORTHODONTIST terbangun di belakang kepala | for the orthodontist | ±0.70s build; latar penuh ±39.07s | ±0.13s |
| R070 | 39.767–40.400 | neon · THE SAAS FOUNDER + ikon dan garis grafik | the SaaS founder | ±0.30s build | frame |
| R071 | 40.400–41.267 | neon · THE PERSONAL TRAINER + ikon gym/denyut | the personal trainer | ±0.17s build | ±0.13s |
| R072 | 41.267–47.567 | slab/wipe · Bidang putih horizontal menutup neon dalam blok, lalu rumah wajah hangat | but not for the creative innovator | 3f / 0.10s | frame |
| R073 | 47.567–48.867 | kartu · Kartu arsip satu kreator/clip di atas kertas | the innovator innovates | 1f / ≤0.033s | frame |
| R074 | 48.867–48.900 | negative · Kartu arsip dibalik menjadi bidang negatif | the horde of imitators imitate | 1f / 0.033s | frame |
| R075 | 48.900–48.933 | grid/negative · Kolase banyak peniru muncul dalam negatif | the horde of imitators imitate | 1f / 0.033s | frame |
| R076 | 48.933–50.600 | grid · Kolase kembali positif pada kertas krem | the horde of imitators imitate | 1f / ≤0.033s | frame |
| R077 | 50.600–52.400 | cut · Kembali wajah | until the innovator switches it up again | 1f / ≤0.033s | frame |
| R078 | 52.400–52.733 | slab/hero · BEING hitam membentang di layar penuh | being | 1f cut; huruf bergerak ±0.33s | frame |
| R079 | 52.733–52.767 | slab/hero · INNOVATIVE putih pada bidang penuh, blur/tarikan ke settle | innovative | 1f ganti bidang | frame |
| R080 | 52.767–52.800 | slab/hero · INNOVATIVE hitam pada bidang terang selama 1f | innovative | 1f / 0.033s | frame |
| R081 | 52.800–53.400 | slab/hero · INNOVATIVE kembali putih, tahan sampai IS | innovative | 1f / ≤0.033s | frame |
| R082 | 53.400–53.700 | slab/hero · IS raksasa sesaat | is | 1f / ≤0.033s | frame |
| R083 | 53.700–54.067 | slab/hero · HARD menggantikan IS | hard | 1f / ≤0.033s | frame |
| R084 | 54.067–54.133 | glitch · Bidang gelap sekejap dengan serpihan piksel | it requires | 2f / 0.067s | frame |
| R085 | 54.133–55.333 | typography · Bidang krem; it requires struggle bertambah di tengah | it requires struggle | 1f cut; build ±0.67s | frame |
| R086 | 55.333–59.300 | cut · Kembali wajah pada doubt, kalimat dilanjutkan | doubt / friction risk and genius | 1f / ≤0.033s | frame |
| R087 | 59.300–62.500 | b-roll/kartu-fisik · Overhead cutting mat; tangan mengatur content pillars | start experimenting | 1f / ≤0.033s | frame |
| R088 | 62.500–64.000 | punch-in/kartu-fisik · Potong dekat kartu CINEMATIC CLONE SKITS lalu BTS | pillars or formats | 1f cut; pan antar-kartu ±1.50s | frame |
| R089 | 64.000–65.300 | b-roll/kartu-fisik · Kembali overhead; jari menunjuk WORKING dan TESTING | bringing in every now and then | 1f cut; gestur ±1.30s | frame |
| R090 | 65.300–69.967 | cut · Kembali wajah | because even if it flops now | 1f / ≤0.033s | frame |
| R091 | 69.967–73.000 | kolase · Foto/kartu mengelilingi pembicara; subjek mengecil | 10/10 habits creator | 1f cut; kartu settle ±0.20s | frame |
| R092 | 73.000–75.400 | cut · Kembali wajah penuh | you have innovated | 1f / ≤0.033s | frame |
| R093 | 75.400–79.933 | cut/punch · Potongan take/framing kecil; hanya terdeteksi ambang 0.10 | you might think that | 1f / ≤0.033s | frame |
| R094 | 79.933–80.833 | punch-in · Wajah sedikit lebih dekat untuk kalimat akhir | but it’s the opposite | 1f / ≤0.033s | frame |
| R095 | 80.833–82.367 | cut-black · Gambar hitam hingga 82.367; audio masih berekor | akhir kalimat | 1f / ≤0.033s | frame |

## A4 · seluruh rentang audio dan kandidat SFX

Demucs **htdemucs two-stems vocals** menghasilkan [vocals](../qc/r7/bedah85/audio/sep/htdemucs/reference_mix/vocals.wav) dan [no_vocals](../qc/r7/bedah85/audio/sep/htdemucs/reference_mix/no_vocals.wav); penjumlahan stem terhadap decode r=0,9998344. `no_vocals` memuat musik, SFX, dan kebocoran VO. Detektor penuh menemukan **386 onset**; detektor RMS independen **275 kandidat** (165 prominence >6 dB). **80 label model** tersebar pada empat jendela penuh, terdiri atas **53 kandidat non-musik**, **23 nada ambigu**, **2 drum**, **2 VO**. Ini cakupan pencarian seluruh durasi, belum daftar seluruh SFX yang sudah terverifikasi.

**Batas yang menahan kelulusan A4:** model tidak mendukung input audio native dan AGY untuk 8 s timeout 45 s. Semua jenis bunyi di bawah adalah inferensi CLAP/AST. Onset/level dapat diulang; “53 SFX pasti” tidak boleh disimpulkan. Bunyi tanpa label dan transien yang lemah tetap belum diputuskan. Material “kayu/air/langkah” dari label mesin tidak dipakai sebagai fakta maupun rekomendasi palet.

Tabel mencakup semua 53 kandidat non-musik berlabel. Awal/puncak/akhir adalah **inti envelope residual**, bukan in/out file SFX asli; beberapa batas fallback dari panjang event model. ΔVO adalah sample peak residual pada inti dikurangi peak VO dalam ±0,30 s, **bukan LU**. Median 53 kandidat −9,37 dB, p25/p75 −11,78/−3,69 dB; rentang −41,29 sampai +4,01 dB mencakup outlier/ambigu. Δvisual di sini dihitung ulang dari puncak envelope ke tabel A2 terbaru; >150 ms ditandai belum terikat, tidak dipaksakan ke scene jauh.

| ID | Awal/puncak/akhir s | Jenis hipotesis | Dukungan model (z bukan probabilitas) | ΔVO dB peak | Visual terdekat / hubungan | Kata ASR sekitar |
|---|---|---|---|---|---|---|
| E001 | 0.000/0.010/0.030 | klik / ketik | 2.02; model ambigu | +4.01 | 0.000 Wajah b-roll terbelah, blok piksel/negatif + WHY / DOES (Δ+0.010s) | Why does all |
| E002 | 0.200/0.240/0.250 | sapuan udara / whoosh | 2.07; model relatif konsisten | +0.68 | Belum terikat ≤150ms; terdekat 0.000 Wajah b-roll terbelah, blok piksel/negatif + WHY / DOES (Δ+0.240s) | Why does all content |
| E003 | 0.480/0.600/0.700 | klik / ketik | 1.94; model ambigu | -3.37 | 0.567 Slab penuh; ALL membesar/bertambah huruf (Δ+0.033s) | Why does all content |
| E004 | 2.430/2.500/2.540 | tap pendek (langkah belum terpastikan) | 2.01; model ambigu | -9.37 | 2.467 Duduk di bangku, teks tumpuk YOU’RE SCROLLING REELS (Δ+0.033s) | unoriginal now? The scrolling realsness |
| E005 | 3.470/3.490/3.510 | klik / tap / pop | 2.11; model relatif konsisten | -7.84 | 3.400 Ponsel di tengah, subjek di depan, reels watched bertambah; new tetap 0 (Δ+0.090s) | realsness is the same shit. |
| E006 | 4.570/4.590/4.640 | sapuan udara / whoosh | 2.42; model ambigu | -3.49 | 4.567 CLAUDE + ikon neon, subjek kecil di bawah (Δ+0.023s) | Claude has killed the 7th |
| E007 | 5.160/5.250/5.350 | swell / riser | 2.46; model relatif konsisten | -4.38 | Belum terikat ≤150ms; terdekat 5.000 Sisipan negatif vertikal lalu blur/pantul ke CLAUDE (Δ+0.250s) | the 7th video editor |
| E008 | 6.720/6.730/6.780 | klik / tap / pop | 2.16; model relatif konsisten | -6.92 | 6.733 Flash negatif b-roll meja sebelum close-up (Δ-0.003s) | row, you've watched yet another 16x9 |
| E009 | 7.830/7.860/7.870 | swell / riser | 2.86; model relatif konsisten | -19.18 | 7.767 Kartu berganti kota; kotak negatif lokal (Δ+0.093s) | 16x9 city vlog |
| E010 | 9.020/9.040/9.070 | swell / riser | 2.43; model relatif konsisten | -5.15 | 9.033 Kartu kota dari jendela bergerak (Δ+0.007s) | spamming the negative filter, |
| E011 | 9.650/9.660/9.680 | klik / ketik | 2.12; model relatif konsisten | -12.95 | 9.667 Kartu rel kereta lagi, kotak negatif lokal (Δ-0.007s) | negative filter, maybe |
| E012 | 10.230/10.240/10.350 | tap pendek (langkah belum terpastikan) | 1.93; model ambigu | +0.31 | 10.367 Kotak negatif hilang, wajah utuh (Δ-0.127s) | maybe one more epilepsy |
| E013 | 11.020/11.040/11.330 | sapuan udara / whoosh | 1.96; model ambigu | -4.59 | 11.033 Tengkorak berpendar dengan garis lari (Δ+0.007s) | more epilepsy idea about |
| E014 | 11.770/11.800/11.810 | sapuan udara / whoosh | 2.75; model ambigu | -9.59 | Belum terikat ≤150ms; terdekat 11.400 Montase 3×3; sel dan about/beauty/of/the/universe berganti (Δ+0.400s) | idea about the beauty of the |
| E016 | 14.370/14.530/14.620 | hit rendah (perkusi belum disingkirkan) | 2.08; model ambigu | -1.58 | 14.533 Ponsel vertikal di antara dua kolom putih (Δ-0.003s) | pack. You're hunting through |
| E019 | 19.050/19.090/19.110 | swell / riser | 2.76; model relatif konsisten | -5.66 | 19.067 Latar unggahan perbandingan video (Δ+0.023s) | Hicksfield Genjitsu but |
| E020 | 19.560/19.590/19.640 | swell / riser | 2.56; model relatif konsisten | -6.97 | 19.633 B-roll B&W melihat ponsel; BUT NOTHING IS HITTING bertambah (Δ-0.043s) | Genjitsu but nothing is |
| E021 | 20.550/20.590/20.790 | foley pendek (bahan belum terpastikan) | 1.97; model ambigu | -2.00 | 20.600 Wajah + WHY? besar di dada (Δ-0.010s) | is hitting. Why? |
| E022 | 20.550/20.590/20.790 | sapuan udara / whoosh | 2.10; model relatif konsisten | -2.00 | 20.600 Wajah + WHY? besar di dada (Δ-0.010s) | is hitting. Why? |
| E023 | 20.890/21.070/21.130 | sapuan udara / whoosh | 2.13; model relatif konsisten | -1.61 | 21.100 Laptop B&W; caption besar di atas layar, kata aksen berganti (Δ-0.030s) | Why? As a beginner, |
| E024 | 23.260/23.270/23.290 | foley pendek (bahan belum terpastikan) | 2.65; model relatif konsisten | -1.95 | 23.300 Wajah + potongan b-roll wajah lain; label COOL EFFECT (Δ-0.030s) | growth is by copying |
| E025 | 24.460/24.480/24.510 | klik / ketik | 2.33; model ambigu | -4.00 | 24.467 B-roll wajah terbelah lagi; LEARN THE EFFECT (Δ+0.013s) | a format, learning how |
| E026 | 26.140/26.180/26.240 | foley pendek (bahan belum terpastikan) | 2.86; model relatif konsisten | -18.95 | Belum terikat ≤150ms; terdekat 25.767 Cermin; duplikasi/potongan vertikal bergerak berulang (Δ+0.413s) | it and adding that skill to |
| E027 | 27.330/27.340/27.370 | foley pendek (bahan belum terpastikan) | 2.63; model relatif konsisten | -2.28 | 27.367 COPYING pada kertas, diawali ketik huruf dan flash (Δ-0.027s) | inventory. Copying is |
| E028 | 27.920/27.930/27.960 | sapuan udara / whoosh | 2.46; model relatif konsisten | -3.69 | 27.900 Hero mengecil/hilang; kalimat is very useful for learning bertambah (Δ+0.030s) | Copying is very useful |
| E029 | 28.540/28.590/28.600 | klik / ketik | 1.73; model ambigu | -3.87 | Belum terikat ≤150ms; terdekat 28.967 Wajah + HOW (Δ-0.377s) | very useful for learning how |
| E031 | 29.040/29.060/29.080 | foley pendek (bahan belum terpastikan) | 1.92; model ambigu | -11.90 | 28.967 Wajah + HOW (Δ+0.093s) | for learning how to |
| E033 | 30.080/30.090/30.110 | foley pendek (bahan belum terpastikan) | 2.25; model ambigu | -5.85 | 30.133 CONTENT mengganti TO MAKE (Δ-0.043s) | make content. But everyone's |
| E038 | 35.500/35.530/35.550 | klik / tap / pop | 2.82; model relatif konsisten | -11.59 | 35.533 VISUAL mengikuti gestur di sisi lain (Δ-0.003s) | angle, the visual, the hook |
| E039 | 37.460/37.480/37.560 | sapuan udara / whoosh | 2.20; model relatif konsisten | -13.28 | 37.467 Wajah lebih dekat, reset untuk kontras argumen (Δ+0.013s) | it your own. Which works |
| E042 | 42.560/42.570/42.590 | hit rendah (perkusi belum disingkirkan) | 2.29; model relatif konsisten | -11.78 | Belum terikat ≤150ms; terdekat 41.267 Bidang putih horizontal menutup neon dalam blok, lalu rumah wajah hangat (Δ+1.303s) | for the creative |
| E045 | 45.930/46.120/46.190 | sapuan udara / whoosh | 3.02; model relatif konsisten | -8.42 | Belum terikat ≤150ms; terdekat 47.567 Kartu arsip satu kreator/clip di atas kertas (Δ-1.447s) | echo chamber of what's |
| E047 | 47.230/47.250/47.290 | sapuan udara / whoosh | 2.53; model relatif konsisten | -12.27 | Belum terikat ≤150ms; terdekat 47.567 Kartu arsip satu kreator/clip di atas kertas (Δ-0.317s) | already working. The innovator |
| E048 | 47.460/47.500/47.630 | sapuan udara / whoosh | 2.65; model ambigu | -3.05 | 47.567 Kartu arsip satu kreator/clip di atas kertas (Δ-0.067s) | working. The innovator |
| E049 | 48.870/48.920/48.950 | hit rendah (perkusi belum disingkirkan) | 1.96; model ambigu | -10.74 | 48.933 Kolase kembali positif pada kertas krem (Δ-0.013s) | innovates and the horde of imitate |
| E050 | 49.200/49.210/49.280 | hit rendah (perkusi belum disingkirkan) | 1.96; model ambigu | -11.77 | Belum terikat ≤150ms; terdekat 48.933 Kolase kembali positif pada kertas krem (Δ+0.277s) | the horde of imitate is |
| E052 | 50.740/50.880/50.940 | klik / tap / pop | 1.96; model ambigu | -11.74 | Belum terikat ≤150ms; terdekat 50.600 Kembali wajah (Δ+0.280s) | until the innovator |
| E053 | 51.680/51.840/51.920 | sapuan udara / whoosh | 2.63; model ambigu | -9.37 | Belum terikat ≤150ms; terdekat 52.400 BEING hitam membentang di layar penuh (Δ-0.560s) | switches it up again. |
| E054 | 52.360/52.400/52.460 | klik / tap / pop | 2.46; model relatif konsisten | -11.38 | 52.400 BEING hitam membentang di layar penuh (Δ+0.000s) | it up again. Being innovative |
| E055 | 52.360/52.400/52.460 | sapuan udara / whoosh | 1.88; model relatif konsisten | -11.38 | 52.400 BEING hitam membentang di layar penuh (Δ+0.000s) | up again. Being innovative |
| E056 | 53.650/53.660/53.680 | klik / tap / pop | 2.40; model relatif konsisten | -0.76 | 53.700 HARD menggantikan IS (Δ-0.040s) | is hard. It |
| E057 | 55.420/55.450/55.490 | tap pendek (langkah belum terpastikan) | 1.86; model ambigu | -41.29 | 55.333 Kembali wajah pada doubt, kalimat dilanjutkan (Δ+0.117s) | struggle, doubt, |
| E058 | 56.040/56.060/56.130 | hit rendah (perkusi belum disingkirkan) | 1.90; model ambigu | -14.37 | Belum terikat ≤150ms; terdekat 55.333 Kembali wajah pada doubt, kalimat dilanjutkan (Δ+0.727s) | friction, |
| E062 | 62.410/62.420/62.480 | hit rendah (perkusi belum disingkirkan) | 2.03; model relatif konsisten | -13.36 | 62.500 Potong dekat kartu CINEMATIC CLONE SKITS lalu BTS (Δ-0.080s) | pillars or formats that |
| E063 | 63.280/63.290/63.310 | hit rendah (perkusi belum disingkirkan) | 1.83; model ambigu | -16.39 | Belum terikat ≤150ms; terdekat 64.000 Kembali overhead; jari menunjuk WORKING dan TESTING (Δ-0.710s) | that you can just stop bringing |
| E064 | 64.940/64.960/65.020 | hit rendah (perkusi belum disingkirkan) | 2.40; model ambigu | -12.62 | Belum terikat ≤150ms; terdekat 65.300 Kembali wajah (Δ-0.340s) | then to your content. Because |
| E066 | 66.160/66.180/66.270 | hit rendah (perkusi belum disingkirkan) | 2.16; model ambigu | -11.06 | Belum terikat ≤150ms; terdekat 65.300 Kembali wajah (Δ+0.880s) | if it flops now, the fact |
| E067 | 67.460/67.480/67.540 | hit rendah (perkusi belum disingkirkan) | 2.38; model ambigu | -14.87 | Belum terikat ≤150ms; terdekat 65.300 Kembali wajah (Δ+2.180s) | you're trying new things |
| E068 | 68.690/68.710/68.800 | foley pendek (bahan belum terpastikan) | 2.34; model ambigu | -12.69 | Belum terikat ≤150ms; terdekat 69.967 Foto/kartu mengelilingi pembicara; subjek mengecil (Δ-1.257s) | means in six months |
| E072 | 70.010/70.030/70.080 | hit rendah (perkusi belum disingkirkan) | 2.21; model relatif konsisten | -11.75 | 69.967 Foto/kartu mengelilingi pembicara; subjek mengecil (Δ+0.063s) | the fucking 10 out of 10 |
| E076 | 75.090/75.110/75.180 | hit rendah (perkusi belum disingkirkan) | 1.91; model ambigu | -11.38 | Belum terikat ≤150ms; terdekat 75.400 Potongan take/framing kecil; hanya terdeteksi ambang 0.10 (Δ-0.290s) | they're now copying. You might |
| E077 | 75.459/75.459/77.459 | sapuan udara / whoosh | 2.32; model ambigu | -11.59 | 75.400 Potongan take/framing kecil; hanya terdeteksi ambang 0.10 (Δ+0.059s) | copying. You might think that |
| E078 | 77.200/77.330/77.350 | swell / riser | 2.63; model relatif konsisten | -11.44 | Belum terikat ≤150ms; terdekat 75.400 Potongan take/framing kecil; hanya terdeteksi ambang 0.10 (Δ+1.930s) | content looks the same as |

[Semua 275 kandidat + status](../qc/r7/bedah85/audio/candidate_ledger.csv) · [386 onset](../qc/r7/bedah85/audio/earshot_all_onsets.json) · [53 kandidat dengan A2 terbaru](../qc/r7/bedah85/ref/A4_sfx_candidates_visual.csv) · [23 aksen nada ambigu](../qc/r7/bedah85/audio/musical_accent_candidates.csv) · [laporan audio lengkap](../qc/r7/bedah85/audio/REPORT.md). Lembar envelope/spektrum: [0–20](../qc/r7/bedah85/audio/audio_evidence_00_20.png), [20–40](../qc/r7/bedah85/audio/audio_evidence_20_40.png), [40–60](../qc/r7/bedah85/audio/audio_evidence_40_60.png), [60–82,409](../qc/r7/bedah85/audio/audio_evidence_60_82.png).

## A5 · musik

**Angka tempo kasar:** HPSS/librosa global **96,994 BPM**. Earshot per jendela 0–20/20–40/40–60/60–82,409: **88,1 /97,8 /94,9 /95,1 BPM**, seluruhnya `confidence none`; pulse clarity **0,053 /0,037 /0,079 /0,116**, di bawah ambang 0,15. Jangan mengunci edit ke grid 97 BPM dari data ini.

**Kunci kasar:** global **G major**, korelasi **0,5221**, runner-up **C minor 0,4424**, margin **0,0797**. Jendela lokal berpindah D minor/G minor/C minor; SFX/VO leak masih masuk. Status: estimasi residual berkeyakinan rendah. **Genre/rasa:** AudioSet Music 0,69; CLAP lo-fi hip-hop +2,90, funk +2,45, glitch-hop +2,10. Instrumen/mood belum kuat (vocal chop +1,96; bass guitar +1,14; aggressive +1,81). Section 28,7–45,95 dan 60–82 cenderung label lo-fi hip-hop; perubahan label tidak membuktikan ganti lagu.

**Struktur terukur:** sembilan penurunan energi residual di bawah ini. Tidak ada bukti cukup untuk menyebutnya mute musik, drop lagu, atau ganti lagu tertentu; pengukuran mencakup SFX/VO leak. Hubungan ucapan dicantumkan supaya Sutradara dapat mendengar pada titik yang tepat.

| Dari–sampai s | Lama s | Residual LUFS | Ucapan sekitar |
|---|---|---|---|
| 25.75–26.10 | 0.35 | -50.5 | it and adding that skill |
| 44.90–45.80 | 0.9 | -54.2 | social media has become an echo chamber |
| 49.95–50.75 | 0.8 | -51.1 | is imitate until the innovator |
| 54.95–56.05 | 1.1 | -56.8 | struggle, doubt, friction, |
| 65.15–66.05 | 0.9 | -55.3 | content. Because even if it flops now, |
| 67.60–68.65 | 1.05 | -53.6 | trying new things means in six months |
| 69.05–69.40 | 0.35 | -50.6 | six months when the fucking |
| 70.10–71.00 | 0.9 | -56.8 | 10 out of 10 habits creator has |
| 75.30–76.60 | 1.3 | -53.8 | copying. You might think that because everyone's content |

**Level:** mix −14,21 LUFS, VO −14,54 LUFS, residual musik+SFX −26,37 LUFS → **11,83 LU di bawah VO** terintegrasi. Pada **64 jendela 1 s** yang tidak bersinggungan dengan kandidat SFX berlabel dan section Music≥0,3, median residual−VO **−14,16 LU**, p25/p75 **−16,22/−10,82 LU**. Ini estimasi bed di bawah suara dengan kandidat tersaring; belum stem musik murni. [Daftar 64 jendela](../qc/r7/bedah85/audio/bed_windows_without_tagged_sfx.csv) · [drop dan konteks](../qc/r7/bedah85/audio/music_drops.csv) · [ukuran stem](../qc/r7/bedah85/audio/stem_measurements.json).

## A6 · tipografi per peran

Nama keluarga huruf di bawah adalah pengamatan bentuk; file/font aslinya tidak teridentifikasi. Ukuran adalah tinggi glyph aktual terhadap frame 720 px, bukan font-size CSS dan bukan tinggi blok beberapa baris. Bounding box hasil foreground-mask sudah diperiksa pada gambar; halo/blur bukan bagian ukuran bila dapat dipisahkan. Semua kejadian kata hero ada di A2; pergantian frasa dalam peta teks.

| Peran | Kapan / durasi episode | Ukuran yang terlihat | Masuk / keluar / fungsi |
|---|---|---|---|
| Subtitle narasi · sans italic cukup tebal | 3,400–80,833, berganti frasa; contoh 41,267–44,167 ≈2,90 s | 23 px =3,19% H pada 43,00 s | Banyak frasa muncul langsung dan ditahan; kadang kata aktif kuning/magenta lalu putih. Keluar dengan pergantian frasa/cut. |
| Caption kinetik lebih besar pada b-roll laptop | 21,100–23,300 (2,20 s), as a beginner →the fastest route to growth | Sekitar 4–6% H; lebih besar dari subtitle rumah | Kata masuk dari bawah/blur singkat dan bertambah, kata aktif berganti warna; posisinya dekat layar laptop. |
| Hero slab · grotesk sangat tebal rapat | ALL 0,567–0,767; CONTENT 0,767–1,167; INTERESTING 16,567–17,200; ORIGINAL 17,200–17,600 | ALL 170 px=23,61%; INTERESTING 105 px=14,58% | Bidang dan kata mengganti shot; ALL sempat bertambah huruf; cut langsung ke kata berikut. |
| Hero kertas | COPYING 27,367–±27,900 (≈0,53 s) | 135 px=18,75% H pada 27,60 s | Huruf diketik/terbangun C→CO→COPY→COPYING dengan flash 1f, lalu diganti kalimat kecil. |
| Hero di atas footage | WHY? 20,600–21,100 (0,50 s); HOW 28,967–29,467 (0,50 s); TO MAKE 29,467–30,133 (0,67 s); CONTENT 30,133–30,433 (0,30 s) | WHY?127 px=17,64%; HOW122=16,94%; TO MAKE93=12,92% | Cut ke kata utuh; rangkaian HOW/TO MAKE/CONTENT mengganti lokasi/shot sekaligus. |
| Hero klimaks berturut-turut | BEING 52,400–52,733; INNOVATIVE 52,733–53,400; IS 53,400–53,700; HARD 53,700–54,067 | INNOVATIVE105 px=14,58%; IS424=58,89% | BEING sangat lebar; INNOVATIVE punya flash 1f 52,767; IS menjadi lompatan skala singkat; HARD menutup frasa lalu 2f gelap. |
| Kalimat kecil editorial pada kertas | ±27,900–28,967 (≈1,07 s); 54,133–55,333 (1,20 s) | it requires struggle42 px=5,83% H | Teks bertambah per kata; kata baru berwarna/blur lalu menetap hitam, keluar lewat cut ke wajah. |
| Neon outline + matte kepala | UNORIGINAL1,567–2,167; CLAUDE4,567–5,567; ORTHODONTIST38,167–39,767; SAAS FOUNDER39,767–40,400; PERSONAL TRAINER40,400–41,267 | Kira-kira 10–15% H pada tulisan utama; glow membuat bbox lebih besar; bukan ukuran font terverifikasi | Huruf digambar/berkedip bertahap; dunia latar ikut berubah, tulisan lewat di balik kepala; ganti per profesi. |
| Monospace/piksel/ketik di footage | SCROLLING2,467–3,400; BUT NOTHING19,633–20,600; LEARN24,467–25,767; street31,200–32,467 | Sekitar 2–4% H per baris, multi-baris dapat menumpuk | Terbangun per kata/huruf; dipakai saat memberi label proses atau gagasan, bukan satu preset untuk semua narasi. |
| Label pada gestur | ANGLE±34,767–35,300; VISUAL±35,533–35,900; HOOK STRUCTURE35,900–±36,767 | Sekitar 3–5% H per baris, bergantung tracking dan gerak | Mengikuti lokasi/tangan, muncul sigap; HOOK STRUCTURE dua baris lalu turun/hilang. |
| Label/teks di benda dan UI | Counter3,400–4,567; sponsor12,733–14,533; kartu fisik59,300–65,300 | Skala berubah bersama kamera/benda; tidak diberi font-size tunggal | Counter/label milik benda; wide→close 62,500 memperbesar informasi yang dibaca, bukan menambah subtitle terpisah. |

[Ukuran glyph JSON](../qc/r7/bedah85/ref/typography/glyph_measurements.json) · [lembar peran 1](../qc/r7/bedah85/ref/typography/sheet_1.jpg) /[2](../qc/r7/bedah85/ref/typography/sheet_2.jpg) /[3](../qc/r7/bedah85/ref/typography/sheet_3.jpg) /[4](../qc/r7/bedah85/ref/typography/sheet_4.jpg) · [IS terukur](../qc/r7/bedah85/ref/typography/measure_53.60.jpg) · [subtitle terukur](../qc/r7/bedah85/ref/typography/measure_43.00.jpg). Ukuran neon/monospace adalah kisaran pembacaan frame, tidak diberi ketelitian piksel palsu.

## Perubahan kartu dan pemeriksaan akhir

Kartu 85 diubah **hanya §3, §6, §7, §8**. Isi baris yang diubah dan patch tersimpan di [card85.patch](../qc/r7/bedah85/card85.patch), versi sebelum di [card85-before.md](../qc/r7/bedah85/card85-before.md). Header “kedalaman bedah … belum ditranskrip/belum dipisah” dibiarkan karena di luar bagian yang diizinkan; angka dan status terbaru berada di empat bagian yang diperbarui. Asal-usul belum ditambah ke SUMBER/PETA karena kedua file itu di luar izin tugas; laporan ini menyediakan sumber untuk integrasi Sutradara.

| Bagian kartu | Baris sebelum | Baris sesudah | Perubahan |
|---|---|---|---|
| §3 Ritme | 28–32 | 28–33 | Tambah pace/jeda/definisi event, pisahkan scene peak dari cut |
| §6 Kamera/transisi | 50–50 | 51–58 | Waktu, mekanik, panjang transisi dan pergantian skala |
| §7 SFX | 53–53 | 61–65 | Ganti dugaan sumber sponsor dengan ledger kandidat + batas bukti |
| §8 Musik | 56–56 | 68–73 | Tambah LU, BPM/key kasar, genre inferensi dan sembilan drop residual |

Pemeriksaan: seluruh 85 puncak mendapat pasangan kelompok; A2 mencakup awal hingga akhir gambar; tabel A4 53 kandidat dan ledger 275 dapat dibaca ulang; empat jendela audio berurutan tanpa gap; B memakai mix yang cocok dengan final **r=0,9999083, lag0 s**; hash input dicek lagi di `verification.json`. Tidak ada `doctor --fix`, PETA, commit, atau edit render/audio/lego/remotion dari pekerjaan ini.

**Sisa untuk LULUS penuh:** dengar source/stem penuh 82,409 s dan putuskan setiap kandidat A4 (SFX/musik/VO/false positive), tambahkan bunyi yang luput, lalu konfirmasi BPM/rasa/instrumen dan titik perubahan musik. Angka union audio referensi tetap berlabel kandidat sampai langkah itu selesai.
