# Storyboard 2,5D · builder trap / show your work

16:9 1920×1080, 30 fps, 97,5 dtk. Suara = take asli dirapikan (`edit/edl.json`). Kode: `remotion/src/` (`Stage.tsx` = mesin kamera + lapisan).

**Mekanisme lapisan (D-016):** setiap adegan adalah panggung perspektif (P = 1600 px). L1 latar paling jauh (z −900), L2 footage/dunia, L3 teks, L4 objek visual paling dekat. Isi lapisan ditulis dalam px layar dan diskala balik, jadi tata letak presisi saat kamera z = 0; begitu kamera bergerak, parallax muncul sendiri dan lapisan dekat bisa lewat di depan lensa (memudar saat < 520 px dari lensa). Dust bokeh di L4 memberi isyarat kedalaman. HUD di atas semua panggung: caption, sapuan blok piksel, grain.

**Palet (D-015):** Deep Space #0A2353 · #112C70 · #5B58EB · #BB63FF · #56E1E9 + biru elektrik #0133FE; adegan terang lilac #EADDEF → pink #FDCBF2 → lavender #A087FD. Teks putih di gelap, navy di terang. Tidak ada vignette gelap di adegan terang.

| # | Waktu | Ucapan | L1 | L2 | L3 teks | L4 objek | Kamera | Keluar |
|---|---|---|---|---|---|---|---|---|
| 1 | 0–15,7 | "Aku terobsesi … Memasuki 20-an … berbeda" | (footage menutup) | footage wajah z −150, grade split-tone indigo/cyan | "kesempurnaan." · "siapa pun." · "20-an" z +170 | dust z +560 | dolly z 0→150 (A), punch z 330 (B), terbang menembus teks 15,0–15,7 | sapuan blok |
| 2 | 15,7–19,7 | "sesuatu yang unik … nggak orang lain punya" | grid z −900 | 36 siluet orang z −350 | "unik." z +60 | foto (wajah live mengecil jadi foto) z +150 | dolly z 0→980 ke foto | cut |
| 3 | 19,7–25,8 | "termakan kata-kata motivasi … harus menjadi sesuatu yang berbeda" | gradient z −900 | feed kartu z −650 (DoF blur) | kartu kutipan, kata muncul sinkron z 0 | tanda kutip gradient z +260, dust | truck x −90→90, ry 5→−4 | cut |
| 4 | 25,8–32,7 | "nggak mau mencoba … FOMO" | grid z −1100 | 5 baris kartu tren di z −1000…−110 (parallax) | "FOMO" slam z +300 | foto diam melawan arus z +160 | truck x 0→−180, punch + guncang di FOMO | cut |
| 5 | 32,7–40,2 | "investasi waktu pada AI … build something" | grid z −900 | jendela ChatGPT (kode) z 0 | logo + "ChatGPT" z +260 | chip UI + dust z +420 | dari z −600 miring → 0, lalu dolly ke kolom input saat mengetik | sapuan blok |
| 6 | 40,2–48,3 | "tapi … tidak menjual / mempublikasikan / mendokumentasikan" | gradient belokan navy-magenta z −900 | — | tiga kata + coret merah-violet z 0 | garis horizon z +220, dust merah | ry 8→−5, dolly z 0→230 | cut |
| 7 | 48,3–51,9 | "selama satu tahun perjalanan …" | grid z −900 | timeline 31 repo nyata z 0 | nama bulan besar z +240 (parallax 1,35×) | dust | truck sepanjang tahun, ry −7→5 | sapuan blok |
| 8 | 51,9–56,5 | "mencoba belajar, memahami industri ini" | gradient lilac-pink z −800 | jaringan + paket data z −140 | bubble chat real time z +50 | 6 agent OpenBot + piksel z +150 | z −140→90, ry 7→−6 | sapuan blok |
| 9 | 56,5–58,6 | "dan apa yang sudah aku buat" | grid | semua repo (zoom out) z 0 | header GitHub z +120 | 6 agent berbaris z +220 | rx 10→3 | cut |
| 10 | 58,6–62,4 | "sampai akhirnya aku sadar …" | grid | dinding repo meredup + blur z −200 | "sadar." z +140 | dust | dolly z 0→260 | cut |
| 11 | 62,4–73,6 | "semua orang bisa membangun / membuat / bikin software · tapi nggak semua … belum sempurna" | gradient | lautan kartu z −250 (3 langkah zoom out) | kata kunci z +170 | sel yang publish naik z +110, logo platform asli z +320 | dolly z 0→200, ry 4→−4 | cut |
| 12 | 73,6–82,4 | "ngebangun itu bikin kita kecanduan … nggak pernah selesai" | grid | cincin loop z −60 | bar building + "kecanduan." z +90 | dust | orbit ry ±8, dolly; berhenti + guncang di 81,0 | sapuan blok |
| 13 | 82,4–97,5 | "dan sekarang aku memutuskan … pengalaman yang aku dapatkan" | grid | timeline digulung mundur ke repo pertama (Nov 2025) → grid profil | header Instagram z +40 | post terunggah satu per satu z +110, ring fokus | z −250→120 cepat, lalu dolly pelan; fade akhir | hitam |
