# Teknik: video peluncuran produk dalam kode (bedah skill `launch-motion`)

Ini lembar TEKNIK: pola di sini boleh dipinjam untuk video apa pun yang menampilkan UI, angka, atau alur kerja produk.
Warna, font, tekstur, dan tempo selalu dari kartu kiblat proyek (pengikat). Timing dari audio/storyboard proyek. LANTAI tetap berlaku.

Asal: skill `launch-motion` + blog "How to Make SaaS Launch Videos With Claude" (@sanjii, Higgsfield, Okt 2026); dibedah 16 Nov atas permintaan Irfan ("animation yang dia buat beneran bagus … sound effect-nya tepat … ambil bagian yang bagus"). Skill itu tidak butuh Higgsfield: 4 file markdown + Remotion. Status: kandidat, dilihat dari blog dan skill, belum diuji pada video kita. SFX-nya **tidak didokumentasikan** di sumber (pertanyaan pembaca soal sound design tidak dijawab), jadi §4 adalah dugaan yang harus diukur dari videonya sebelum dipakai sebagai acuan.

## 1. Kenapa hasilnya bagus: Fix dipisah dari Polish
Render pertama mereka jelek (font jatuh ke Times New Roman, teks bertumpuk, counter lompat 0→200 dalam 1 frame, kartu menumpuk, pan terlalu cepat). Mutu datang dari dua putaran yang jenisnya berbeda:

| | Fix | Polish |
|---|---|---|
| Isi | kebenaran teknis | makna/emosi |
| Contoh | kanvas dikunci + posisi dari tengah, font dimuat sebelum frame 0, count-up ±1 dtk, kartu masuk satu-satu, kamera ber-easing | glow pada counter, kursor ragu, kartu berdenyut, checkmark beruntun, kamera mundur |
| Nasib | masuk checklist skill → tidak terulang | tetap per video, terikat cerita |

Di repo kita, Fix sudah dijaga alat (`render.sh` still→draft→final, `motion_lint.py`, `teks_cek.py`, `curves.ts`). Yang dipinjam dari sini adalah **cara memilih Polish**.

## 2. Pola yang dipinjam

### a. Satu emosi mikro per adegan, lewat satu gerak
Setiap adegan diberi satu emosi yang mau dirasakan penonton, lalu **satu** gerak yang membawanya. Tidak ada gerak dekoratif.

| Babak | Emosi | Gerak | Blok |
|---|---|---|---|
| hook | tekanan menumpuk | angka naik + glow menguat mengikuti nilai | `Penghitung` (`cahaya`) |
| masalah | lelah, manusiawi | kursor diam ±1 dtk di antara tab "seperti lupa tadi copy apa" | `Kursor` (`ragu`) |
| produk | hidup, mulai bekerja | denyut kecil sekali saat status berubah | `curves.ts` `move(…, "whip")` pada skala 1→1,04→1 |
| payoff | ritme, puas | checkmark turun satu per satu | `react(i)` di `curves.ts` |
| payoff | lega, ada ruang | kamera mundur saat angka tepat mencapai 0 | `move(…, "heavy")` dipicu frame event |

Tulis di storyboard per beat: `emosi: … · gerak pembawa: …`. Beat tanpa emosi yang jelas tidak diberi polish.

### b. Benda diberi akting
Kursor, kartu, dan angka diperlakukan sebagai karakter: kursor tidak lurus (lengkung), sedikit lewat lalu kembali saat tiba, menekan saat klik (skala 0,96 selama 8 frame), dan boleh ragu. Keraguan inilah yang membuat adegan "copy-paste" terasa melelahkan tanpa satu kata pun.

### c. Urutan sebab-akibat terlihat
Item mendarat **dulu**, baru statusnya muncul (kartu tiba → baru checkmark). Kamera bergerak karena sesuatu terjadi (angka = 0 → mundur), bukan karena waktunya.

### d. Masukan kurang diisi, bukan ditebak
Bila produk/brief belum jelas: tanya **maksimal 3 pertanyaan** singkat, lalu isi semua baris brief (perusahaan satu kalimat, audiens, tujuan, satu pesan, 5 hal wajib tampil: hook, masalah, produk, payoff, logo+CTA). Aset yang belum ada (2–3 warna hex, satu pasangan font, logo SVG, latar, UI sebagai **SVG**, bukan screenshot) dibuat dulu sebelum animasi.

### e. Revisi satu baris
Angka, copy, dan warna di satu file config. "Counter jadi 999" = ubah satu nilai → still adegan itu → render rentang adegan itu (`render.sh final <Comp> <out> <awal-akhir>`), bukan seluruh video.

## 3. Angka dari sumber (usulan, belum teruji; bandingkan dengan `curves.ts`)
- Teks/angka penting tampil ≥ 1,5 dtk. Count-up ±1 dtk ease-out.
- Masuk ±0,5 dtk dengan overshoot kecil; keluar ±60 % durasi masuk (kita: `exitDur` 0,65×, sejalan).
- Elemen satu grup masuk berjeda 2–4 frame @60 fps (kita: `react(i)` tidak rata, lebih baik dari jeda rata).
- Pan selebar layar ≥ 0,8 dtk, ease-in-out.
- Hold tidak pernah mati: drift skala 1→1,02 atau ±4 px (kita: `drift()`).
- Kursor: lengkung dengan titik kontrol tergeser ±15 % jarak, tiba dengan sedikit overshoot.
- Elemen kunci di dalam kotak tengah 1080×1080, judul 5 % dari tepi, posisi dari tengah kanvas → versi 9:16 dan 1:1 hampir gratis.

## 4. SFX (dugaan, ukur dulu)
Dari struktur storyboard-nya, bunyi menempel pada event gerak yang sudah ada: klik (press), kartu mendarat, tiap checkmark, tik counter, logo terbentuk; jumlahnya hemat, tanpa whoosh dekoratif. Ini sejalan dengan aturan kita "1 SFX untuk 1 objek/visual". Sebelum dijadikan acuan level/kepadatan: unduh videonya, ukur onset SFX vs frame gerak dan level SFX vs musik dengan alat audio kita.

## 5. Jangan dipinjam
- Struktur 5 babak sebagai template untuk video yang bukan peluncuran produk.
- Detail khusus contohnya ("red glow on the counter", "agent cards") tanpa alasan cerita di video kita.
- Satu music bed rata dari awal sampai akhir (kita: musik per babak, `audio.md`).
