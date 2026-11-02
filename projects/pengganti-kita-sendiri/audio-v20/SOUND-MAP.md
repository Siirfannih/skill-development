# SOUND-MAP PKS v20

Satu peta SFX dipakai di Video 1 dan Video 2 (beda hanya backsound). Waktu = detik visual dari penanda render
(`v11final.sfx`), dikoreksi dari gambar. Level = dB relatif punch VO (persentil-95 RMS 50 ms saat narator bicara).
Dibuat otomatis oleh `tools/write_soundmap.py` dari `build.py`.

## Keluarga bunyi (kata kode = keluarga)

| keluarga | arti / file | level |
|---|---|---|
| WORD | kata kinetik muncul -> Kinetictypography, varian diacak (tidak sama dua kali berturut) | -15 |
| WORD1 | kata pertama frasa kinetik (jeda >0.7 dtk) -> Katapertama | -13 |
| EMPH | kata besar layar penuh / kartu kata (penekanan) -> Katapertama di frame + lapisan basmenyebar tipis (bobot, -6 dB) | Katapertama -11, basmenyebar -13 |
| PHOTO | pergantian foto dalam montase -> Pergantianfoto, 9 varian dirotasi | -15 |
| PHOTO1 | gambar pertama montase -> Pergantianfoto:gambarpertama | -13 |
| CUT | cut ke gambar baru (luminans berubah <0.35) -> Cut | -12 |
| CONTRAST | cut gelap<->terang (luminans berubah >0.35, diukur dari video) -> Cutcontrastransision | -12 |
| CAM | kamera bergerak nyata -> Wooshcameramovementtransisi, puncak digeser ke frame gerak tercepat | -11 |
| WIPE | sapuan wipe layar penuh -> Woosh (puncak di sapuan tercepat) | -8 |
| MOVE | objek bergerak (drag, kembali, terbang, mengecil, kalender dimampatkan) -> Move | -11 |
| STEP | langkah figur user -> Move v01 (ketuk lembut), sangat pelan | -19 |
| TYPE | rentang ketikan -> Keyboardtyping, varian disambung sepanjang rentang | -14 |
| KEY | kata pendek diketik di layar (<0.4 dtk) -> 2-3 tuts tunggal Keyboardtyping | -15 |
| ENTER | tombol kirim -> Enter | -12 |
| AIPOP | AI muncul (agent, ikon AI, logo ChatGPT, kartu AI) -> Popup user interface : AI | -10 |
| AIRESP | jawaban/hasil AI muncul (kartu balasan, landing page di orbit, denyut glyph) -> ResponAI | -11 |
| AISTREAM | teks AI mengalir (bukan manusia mengetik) -> ES Scifi Computer Short Beeps (0.77 dtk ~ rentang 0.83) | -16 |
| TICK | centang tugas selesai -> ES UI Buttons Confirm | -13 |
| GLASS | blok kalender muncul -> ES UI Pops Glass (2 varian) | -14 |
| POP | kartu/foto/titik UI muncul atau mendarat -> pop up | -12 |
| CLICK | klik mouse / ambil kartu / bar -> ES UI Click Phone Tap (varian v02, v03) | -14 |
| GONE | objek hilang (dibuang ke tempat sampah, grid memudar, diserap) -> ES UI Buttons Dissapear | -12 |
| NOTIF | titik tujuan muncul di grafik -> Notif | -13 |
| CURVE | garis/kurva digambar, scan dimulai -> Scanning dan gerak kurva | -11 |
| LIGHT | lampu/sorot/layar menyala -> Lasertransision (nada F#6 bersih) | -14 |
| LIGHTOFF | lampu/layar padam -> Lasertransision -5 semiton, lebih pelan (keluarga sama, arah turun) | -21 |
| IMPACT | hantaman/boom objek -> basmenyebar dipotong ke hit utama, +3 semiton & saturasi ringan agar tidak terlalu deep dan terdengar di HP | -7 |
| SPREAD | grid abu-abu menyebar (ribuan cerita) -> basmenyebar utuh (bas menyebar = makna harfiah) | -5 |
| RISER | zoom-through / bloom menuju momen besar -> ES Riser Clean, puncak tepat di frame tujuan | -13 |

## Penanda yang tidak diberi bunyi sendiri

Satu momen = satu bunyi: bila dua penanda jatuh dalam 50 ms, yang berprioritas lebih tinggi dipakai
(urutan: IMPACT, EMPH, SPREAD, RISER, ENTER, AIPOP, AIRESP, CONTRAST, CAM, WIPE, MOVE, PHOTO1, CUT, PHOTO, WORD1, TICK, GLASS, CLICK, GONE, CURVE, NOTIF, POP, LIGHT, LIGHTOFF, WORD, KEY, STEP, AISTREAM, TYPE); rentang ketik dan riser tidak digabung.

Dibuang dari gambar (alasan di `build.py` DROP): `00a:anchor:biggest`, `00a:anchor:billion`, `00a:anchor:launched`, `00a:cut:0`, `00b:anchor:fast`, `01c:cut:zoomthrough`, `02a:wipe:x09`, `02e:cal:compressed`, `03c:cut:jensen`, `03c:scan:off`, `03e:anchor:somebody`, `04b:cam:snapwide`, `04c:cam:revealout`, `04c:cut:in`, `04c:x13:shrink`, `04d:cut:altman`, `05a:altman:shrink`, `05c:icons:merge`, `05e:in:cut`, `05f:in:cut`, `05g:cam:snap:1`, `05g:cam:snap:2`, `05g:cam:snap:3`, `05g:cam:snap:4`, `06e:snapwide:1`, `06g:cut:in`, `06g:cut:peran`

Tidak dipakai: `scaningfast` (tidak ada scan cepat di gambar), `ES Swooshes Big Cinematic` (terlalu besar untuk gerak
kamera video ini), `ES Glitch Databend` (tidak ada glitch di gambar), `ES Notification Message` (Notif Irfan sudah
mewakili), `ES Click Sci-Fi Open`, `ES Bass Dive` (terlalu deep; kalender dimampatkan diberi Move), `Woosh` hanya untuk wipe.
`Cut` = `Pergantianfoto:gambarpertama` (file identik) dan `Kinetictypography` = `Variasitransisiataucut` (file identik):
Variasitransisiataucut tidak dipakai untuk cut agar kata dan cut tidak berbunyi sama.

## Peristiwa

| detik | objek (penanda) | bunyi + varian | level | catatan |
|---|---|---|---|---|
| 0.067 | `word:AI:2` | WORD1 · Katapertama__v00 | -13 | -3 dB (di atas klip narasumber yang bicara) |
| 0.500 | `word:is:15` | WORD · Kinetictypography_gunakansecaraacak__v02 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 0.733 | `word:the:22` | WORD · Kinetictypography_gunakansecaraacak__v00 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 0.900 | `word:Biggest:27` | WORD · Kinetictypography_gunakansecaraacak__v01 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 1.420 | `00a:cut:1` | CONTRAST · Cutcontrastransision__v00 | -12 | menggabung 00a:photo:0, word:Technical:43 |
| 1.700 | `00a:photo:1` | PHOTO · Pergantianfoto__v00 | -15 |  |
| 1.933 | `00a:photo:2` | PHOTO · Pergantianfoto__v01 | -15 |  |
| 2.067 | `word:thing:62` | WORD · Kinetictypography_gunakansecaraacak__v00 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 2.200 | `00a:photo:3` | PHOTO · Pergantianfoto__v02 | -15 |  |
| 2.450 | `00a:cut:2` | CUT · Cut__v00 | -12 | menggabung 00a:photo:4, word:ever:74 |
| 2.700 | `00a:photo:5` | PHOTO · Pergantianfoto__v03 | -15 | menggabung word:in:81 |
| 2.833 | `word:my:85` | WORD · Kinetictypography_gunakansecaraacak__v02 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 2.967 | `00a:photo:6` | PHOTO · Pergantianfoto__v04 | -15 | menggabung word:lifetime:90 |
| 3.233 | `00a:photo:7` | PHOTO · Pergantianfoto__v05 | -15 |  |
| 3.467 | `00a:photo:8` | PHOTO · Pergantianfoto__v06 | -15 |  |
| 3.650 | `00a:cut:3` | CONTRAST · Cutcontrastransision__v00 | -12 |  |
| 3.733 | `word:16:112` | WORD1 · Katapertama__v00 | -13 | -3 dB (di atas klip narasumber yang bicara) |
| 4.033 | `word:year_old:121` | WORD · Kinetictypography_gunakansecaraacak__v00 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 4.440 | `00a:cut:4` | CUT · Cut__v00 | -12 | menggabung word:Launched:133; -3 dB (di atas klip narasumber yang bicara) |
| 4.767 | `word:a_new:143` | WORD · Kinetictypography_gunakansecaraacak__v01 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 5.233 | `word:AI:157` | WORD · Kinetictypography_gunakansecaraacak__v02 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 5.600 | `word:company:168` | WORD · Kinetictypography_gunakansecaraacak__v00 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 6.210 | `00a:cut:5` | CUT · Cut__v00 | -12 |  |
| 6.267 | `word:Raised:188` | WORD · Kinetictypography_gunakansecaraacak__v01 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 6.567 | `word:over:197` | WORD · Kinetictypography_gunakansecaraacak__v00 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 6.767 | `word:a:203` | WORD · Kinetictypography_gunakansecaraacak__v01 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 6.933 | `word:Billion:208` | WORD · Kinetictypography_gunakansecaraacak__v00 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 7.367 | `word:dollars:221` | WORD · Kinetictypography_gunakansecaraacak__v01 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 8.033 | `00b:shrink:0` | MOVE · Move__v03 | -11 | menggabung 00a:cut:6 |
| 8.100 | `word:This:243` | WORD1 · Katapertama__v00 | -13 | -3 dB (di atas klip narasumber yang bicara) |
| 8.300 | `word:time:249` | WORD · Kinetictypography_gunakansecaraacak__v02 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 8.690 | `00a:cut:7` | CUT · Cut__v00 | -12 | menggabung word:progress:262 |
| 9.067 | `word:was:272` | WORD · Kinetictypography_gunakansecaraacak__v01 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 9.200 | `word:so:276` | WORD · Kinetictypography_gunakansecaraacak__v02 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 9.467 | `word:Fast:284` | WORD · Kinetictypography_gunakansecaraacak__v01 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 10.290 | `01a:cut:horizon` | CUT · Cut__v00 | -12 |  |
| 10.633 | `word:SADAR:319` | WORD1 · Katapertama__v00 | -13 |  |
| 11.365 | `01b:cut:race` | CONTRAST · Cutcontrastransision__v00 | -12 | menggabung 01b:tiles:land |
| 11.633 | `01b:salip:1` | MOVE · Move__v02 | -11 |  |
| 11.825 | `01b:cam:snapwide` | CAM · Wooshcameramovementtransisi__v00 | -11 |  |
| 11.912 | `01b:paint:berlomba` | CURVE · Scanning_dan_gerak_kurva__v00 | -11 |  |
| 12.000 | `01b:salip:2` | MOVE · Move__v03 | -11 |  |
| 12.705 | `01c:cut:room` | CONTRAST · Cutcontrastransision__v00 | -12 |  |
| 12.705 | `01b:zoomthru:hit` | RISER · ES_Designed_Riser_Transition_Fast_Short_Clean_01__v00 | -13 |  |
| 12.805 | `01c:cone:open` | LIGHT · Lasertransision__v00 | -14 |  |
| 12.905 | `01c:wire:draw` | CURVE · Scanning_dan_gerak_kurva__v00 | -11 |  |
| 13.333 | `01c:anchor:pengganti` | EMPH · Katapertama__v00 | -11 | lapisan basmenyebar__v00 |
| 14.633 | `01c:text:out` | MOVE · Move__v02 | -11 | puncak digeser -145 ms ke gerak tercepat |
| 15.145 | `01d:cam:pan` | CAM · Wooshcameramovementtransisi__v00 | -11 |  |
| 18.633 | `01d:cam:snapwide` | CAM · Wooshcameramovementtransisi__v00 | -11 | menggabung word:LEBIH:559 |
| 18.900 | `01d:anchor:cepat` | EMPH · Katapertama__v00 | -11 | lapisan basmenyebar__v00 |
| 19.451 | `02a:card:wiki` | POP · pop_up__v00 | -12 | +4.0 dB (jatuh di suku kata keras VO) |
| 19.530 | `02a:cut:babak` | CONTRAST · Cutcontrastransision__v00 | -12 | menggabung 02a:photo:0 |
| 19.530 | `01d:fill:riser` | RISER · ES_Designed_Riser_Transition_Fast_Short_Clean_01__v00 | -13 |  |
| 19.631 | `02a:photo:1` | POP · pop_up__v00 | -12 | +4.0 dB (jatuh di suku kata keras VO) |
| 19.697 | `02a:photo:2` | POP · pop_up__v00 | -12 | +0.5 dB (jatuh di suku kata keras VO) |
| 21.172 | `02a:cut:zoom` | CUT · Cut__v00 | -12 | menggabung 02a:select:start |
| 22.033 | `02a:cam:snapwide` | CAM · Wooshcameramovementtransisi__v00 | -11 | puncak digeser +48 ms ke gerak tercepat |
| 23.100 | `02a:cut:wipe` | WIPE · Woosh__v01 | -8 | puncak digeser +100 ms ke gerak tercepat |
| 23.235 | `02b:axis:draw` | CURVE · Scanning_dan_gerak_kurva__v00 | -11 |  |
| 23.305 | `02b:line:draw` | CURVE · Scanning_dan_gerak_kurva__v00 | -11 |  |
| 23.767 | `word:JANJI:713` | WORD1 · Katapertama__v00 | -13 |  |
| 24.167 | `word:sederhana:725` | WORD · Kinetictypography_gunakansecaraacak__v02 | -15 |  |
| 24.937 | `02b:dot:goal` | NOTIF · Notif__v00 | -13 |  |
| 25.325 | `02c:grab:0` | CLICK · ES_User_Interface_Click_Button_Double_Click_Fast__v02 | -14 | +0.3 dB (jatuh di suku kata keras VO) |
| 25.767 | `02c:drag:0` | MOVE · Move__v03 | -11 | puncak digeser +150 ms ke gerak tercepat |
| 26.030 | `02c:trash:0` | GONE · ES_User_Interface_Alert_UI_Buttons_Dissapear_Mus__v00 | -12 |  |
| 26.333 | `02c:return:0` | MOVE · Move__v02 | -11 | puncak digeser +118 ms ke gerak tercepat |
| 26.531 | `02c:grab:1` | CLICK · ES_User_Interface_Click_Button_Double_Click_Fast__v03 | -14 | +0.6 dB (jatuh di suku kata keras VO) |
| 26.867 | `02c:drag:1` | MOVE · Move__v03 | -11 | puncak digeser +136 ms ke gerak tercepat |
| 27.051 | `02c:trash:1` | GONE · ES_User_Interface_Alert_UI_Buttons_Dissapear_Mus__v00 | -12 |  |
| 27.367 | `02c:return:1` | MOVE · Move__v02 | -11 | puncak digeser +130 ms ke gerak tercepat |
| 27.553 | `02c:grab:2` | CLICK · ES_User_Interface_Click_Button_Double_Click_Fast__v02 | -14 |  |
| 27.900 | `02c:drag:2` | MOVE · Move__v03 | -11 | puncak digeser +147 ms ke gerak tercepat |
| 28.073 | `02c:trash:2` | GONE · ES_User_Interface_Alert_UI_Buttons_Dissapear_Mus__v00 | -12 |  |
| 28.685 | `02d:cut:x07` | CONTRAST · Cutcontrastransision__v00 | -12 | menggabung 02c:return:2 |
| 29.925 | `02d:beam:on` | LIGHT · Lasertransision__v00 | -14 |  |
| 30.250 | `02d:cam:reveal` | CAM · Wooshcameramovementtransisi__v00 | -11 |  |
| 30.900 | `02d:anchor:kreatif` | EMPH · Katapertama__v00 | -11 | lapisan basmenyebar__v00 |
| 31.855 | `02d:bloom:hit` | RISER · ES_Designed_Riser_Transition_Fast_Short_Clean_01__v00 | -13 |  |
| 32.400 | `02e:tick:0` | TICK · ES_User_Interface_Click_UI_Buttons_Confirm_Menu__v00 | -13 | +4.0 dB (jatuh di suku kata keras VO) |
| 33.033 | `02e:tick:1` | TICK · ES_User_Interface_Click_UI_Buttons_Confirm_Menu__v00 | -13 | +3.8 dB (jatuh di suku kata keras VO) |
| 33.667 | `02e:tick:2` | TICK · ES_User_Interface_Click_UI_Buttons_Confirm_Menu__v00 | -13 | +4.0 dB (jatuh di suku kata keras VO) |
| 34.667 | `02e:cal:block:Input_data_pesanan` | GLASS · ES_User_Interface_Click_Pops_Glass_UI_Pops__v00 | -14 | +4.0 dB (jatuh di suku kata keras VO) |
| 35.033 | `02e:cal:block:Invoice_Oktober` | GLASS · ES_User_Interface_Click_Pops_Glass_UI_Pops__v01 | -14 | +2.5 dB (jatuh di suku kata keras VO) |
| 35.400 | `02e:cal:block:Rekap_penjualan` | GLASS · ES_User_Interface_Click_Pops_Glass_UI_Pops__v00 | -14 | +2.6 dB (jatuh di suku kata keras VO) |
| 35.833 | `02e:time:compress` | MOVE · Move__v02 | -11 |  |
| 37.300 | `02e:tick:3` | TICK · ES_User_Interface_Click_UI_Buttons_Confirm_Menu__v00 | -13 | +3.9 dB (jatuh di suku kata keras VO) |
| 37.933 | `02e:tick:4` | TICK · ES_User_Interface_Click_UI_Buttons_Confirm_Menu__v00 | -13 | +2.7 dB (jatuh di suku kata keras VO) |
| 38.567 | `02e:tick:5` | TICK · ES_User_Interface_Click_UI_Buttons_Confirm_Menu__v00 | -13 | +4.0 dB (jatuh di suku kata keras VO) |
| 38.975 | `02f:cam:snapwide` | CAM · Wooshcameramovementtransisi__v00 | -11 |  |
| 39.200 | `02e:tick:6` | TICK · ES_User_Interface_Click_UI_Buttons_Confirm_Menu__v00 | -13 | +4.0 dB (jatuh di suku kata keras VO) |
| 39.400 | `02e:tick:7` | TICK · ES_User_Interface_Click_UI_Buttons_Confirm_Menu__v00 | -13 | +3.6 dB (jatuh di suku kata keras VO) |
| 39.600 | `02e:tick:8` | TICK · ES_User_Interface_Click_UI_Buttons_Confirm_Menu__v00 | -13 | +4.0 dB (jatuh di suku kata keras VO) |
| 40.950 | `03a:cut:in` | CUT · Cut__v00 | -12 |  |
| 41.833 | `03a:type:prompt` | TYPE · Keyboardtyping__v01 | -14 | rentang 2.90 dtk |
| 45.267 | `03a:cam:snapwide` | CAM · Wooshcameramovementtransisi__v00 | -11 | puncak digeser -28 ms ke gerak tercepat |
| 45.441 | `03a:enter` | ENTER · Enter__v00 | -12 | menggabung 03a:agent:0 |
| 45.729 | `03a:agent:1` | AIPOP · Popup_user_interface_AI__v00 | -10 |  |
| 45.985 | `03a:agent:2` | AIPOP · Popup_user_interface_AI__v00 | -10 |  |
| 46.240 | `03a:agent:3` | AIPOP · Popup_user_interface_AI__v00 | -10 | menggabung 03a:cam:tiltup |
| 46.575 | `03b:cursor:0` | POP · pop_up__v00 | -12 | +3.9 dB (jatuh di suku kata keras VO) |
| 46.635 | `03b:cursor:1` | POP · pop_up__v00 | -12 | +3.2 dB (jatuh di suku kata keras VO) |
| 46.695 | `03b:cursor:2` | POP · pop_up__v00 | -12 | +2.8 dB (jatuh di suku kata keras VO) |
| 46.865 | `03b:enter` | ENTER · Enter__v00 | -12 | menggabung 03b:cursor:3 |
| 47.367 | `03b:ceo:dash` | MOVE · Move__v03 | -11 | menggabung 03b:cutzoom |
| 47.400 | `03b:type:stream` | AISTREAM · ES_Scifi_Computer_Short_Beeps_Glitch_02__v00 | -16 | rentang 0.83 dtk |
| 48.316 | `03b:reply:card` | AIRESP · ResponAI_AIpopup__v00 | -11 | menggabung 03b:cam:snapwide |
| 48.935 | `03b:bar:1` | CLICK · ES_User_Interface_Click_Button_Double_Click_Fast__v03 | -14 |  |
| 49.155 | `03b:bar:2` | CLICK · ES_User_Interface_Click_Button_Double_Click_Fast__v02 | -14 |  |
| 49.395 | `03b:bar:3` | CLICK · ES_User_Interface_Click_Button_Double_Click_Fast__v03 | -14 |  |
| 49.680 | `03b:cam:center` | CAM · Wooshcameramovementtransisi__v00 | -11 |  |
| 50.080 | `03c:land` | IMPACT · basmenyebar__v00 | -7 |  |
| 50.080 | `03b:zoomthrough` | RISER · ES_Designed_Riser_Transition_Fast_Short_Clean_01__v00 | -13 |  |
| 50.390 | `03c:scan:on` | CURVE · Scanning_dan_gerak_kurva__v00 | -11 |  |
| 52.967 | `03c:cam:snapwide` | CAM · Wooshcameramovementtransisi__v00 | -11 | puncak digeser +2 ms ke gerak tercepat |
| 54.101 | `03d:step:1` | LIGHT · Lasertransision__v00 | -14 |  |
| 54.200 | `word:TEMPAT:1626` | WORD1 · Katapertama__v00 | -13 |  |
| 54.319 | `03d:step:2` | LIGHT · Lasertransision__v00 | -14 |  |
| 54.467 | `03d:type:KITA:0` | KEY · Keyboardtyping__v05 | -15 |  |
| 54.633 | `03d:type:KITA:1` | KEY · Keyboardtyping__v04 | -15 |  |
| 54.790 | `03d:step:3` | LIGHT · Lasertransision__v00 | -14 |  |
| 54.910 | `03d:boom` | IMPACT · basmenyebar__v00 | -7 |  |
| 55.608 | `03d:x13:shrink` | MOVE · Move__v02 | -11 |  |
| 55.885 | `03e:clip:in` | CUT · Cut__v00 | -12 |  |
| 56.067 | `word:Not:1682` | WORD1 · Katapertama__v00 | -13 | -3 dB (di atas klip narasumber yang bicara) |
| 56.200 | `word:gonna:1686` | WORD · Kinetictypography_gunakansecaraacak__v00 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 56.400 | `word:lose:1692` | WORD · Kinetictypography_gunakansecaraacak__v02 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 56.600 | `word:a:1698` | WORD · Kinetictypography_gunakansecaraacak__v01 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 56.700 | `word:Job:1701` | WORD · Kinetictypography_gunakansecaraacak__v00 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 59.355 | `03e:cutzoom` | CUT · Cut__v00 | -12 | menggabung word:Somebody:1781 |
| 59.633 | `word:who:1789` | WORD · Kinetictypography_gunakansecaraacak__v01 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 59.800 | `word:uses:1794` | WORD · Kinetictypography_gunakansecaraacak__v02 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 60.133 | `word:AI:1804` | WORD · Kinetictypography_gunakansecaraacak__v00 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 61.255 | `04a:cut:in` | RISER · ES_Designed_Riser_Transition_Fast_Short_Clean_01__v00 | -13 |  |
| 61.267 | `word:TEKNOLOGI_INI:1838` | WORD1 · Katapertama__v00 | -13 |  |
| 62.033 | `word:NGGAK:1861` | WORD1 · Katapertama__v00 | -13 |  |
| 62.367 | `04a:anchor:peduli` | EMPH · Katapertama__v00 | -11 | lapisan basmenyebar__v00 |
| 64.093 | `04a:cam:tiltdown` | CAM · Wooshcameramovementtransisi__v00 | -11 |  |
| 64.467 | `04b:cam:truck` | CAM · Wooshcameramovementtransisi__v00 | -11 | menggabung 04b:card:0; puncak digeser +12 ms ke gerak tercepat |
| 64.745 | `04b:card:1` | POP · pop_up__v00 | -12 | +1.9 dB (jatuh di suku kata keras VO) |
| 64.925 | `04b:card:2` | POP · pop_up__v00 | -12 | +1.9 dB (jatuh di suku kata keras VO) |
| 65.055 | `04b:card:3` | POP · pop_up__v00 | -12 | +2.6 dB (jatuh di suku kata keras VO) |
| 65.145 | `04b:card:4` | POP · pop_up__v00 | -12 | +2.6 dB (jatuh di suku kata keras VO) |
| 65.247 | `04b:card:5` | POP · pop_up__v00 | -12 | +0.8 dB (jatuh di suku kata keras VO) |
| 65.770 | `04b:x01:collapse` | MOVE · Move__v03 | -11 |  |
| 65.967 | `04c:dots:fly` | MOVE · Move__v02 | -11 | menggabung 04c:line:solid; puncak digeser -3 ms ke gerak tercepat |
| 66.149 | `04c:dots:land` | POP · pop_up__v00 | -12 | +1.7 dB (jatuh di suku kata keras VO) |
| 66.670 | `04c:cutzoom` | CUT · Cut__v00 | -12 |  |
| 67.900 | `04c:anchor:arahnya` | WORD1 · Katapertama__v00 | -13 |  |
| 68.027 | `04c:line:bend` | CURVE · Scanning_dan_gerak_kurva__v00 | -11 |  |
| 69.300 | `word:JANJINYA:2079` | WORD1 · Katapertama__v00 | -13 |  |
| 71.025 | `04d:clip:in` | CUT · Cut__v00 | -12 |  |
| 72.067 | `word:SINGLE:2162` | WORD1 · Katapertama__v00 | -13 | -3 dB (di atas klip narasumber yang bicara) |
| 72.300 | `word:PERSON:2169` | WORD · Kinetictypography_gunakansecaraacak__v02 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 72.733 | `04d:anchor:billion` | EMPH · Katapertama__v00 | -11 | lapisan basmenyebar__v00 |
| 72.967 | `word:DOLLAR:2189` | WORD · Kinetictypography_gunakansecaraacak__v00 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 73.633 | `word:COMPANY:2209` | WORD · Kinetictypography_gunakansecaraacak__v01 | -15 | -3 dB (di atas klip narasumber yang bicara) |
| 75.195 | `05a:in:cut` | CONTRAST · Cutcontrastransision__v00 | -12 |  |
| 75.281 | `05a:photo:0` | POP · pop_up__v00 | -12 | +4.0 dB (jatuh di suku kata keras VO) |
| 75.371 | `05a:photo:2` | POP · pop_up__v00 | -12 | menggabung 05a:photo:3; +4.0 dB (jatuh di suku kata keras VO) |
| 75.426 | `05a:photo:1` | POP · pop_up__v00 | -12 | menggabung 05a:photo:4; +3.5 dB (jatuh di suku kata keras VO) |
| 75.500 | `05a:bluecard:land` | POP · pop_up__v00 | -12 | menggabung 05a:photo:5; +3.5 dB (jatuh di suku kata keras VO) |
| 75.596 | `05a:photo:7` | POP · pop_up__v00 | -12 | +3.7 dB (jatuh di suku kata keras VO) |
| 75.651 | `05a:photo:6` | POP · pop_up__v00 | -12 | +3.7 dB (jatuh di suku kata keras VO) |
| 75.741 | `05a:photo:8` | POP · pop_up__v00 | -12 | menggabung 05a:photo:9; +2.5 dB (jatuh di suku kata keras VO) |
| 77.333 | `05a:cam:snapwide` | CAM · Wooshcameramovementtransisi__v00 | -11 | puncak digeser +33 ms ke gerak tercepat |
| 77.400 | `word:SATU:2322` | WORD1 · Katapertama__v00 | -13 |  |
| 78.133 | `05a:type:SUKSES:0` | KEY · Keyboardtyping__v02 | -15 |  |
| 78.267 | `05a:type:SUKSES:1` | KEY · Keyboardtyping__v05 | -15 |  |
| 78.400 | `05a:type:SUKSES:2` | KEY · Keyboardtyping__v04 | -15 |  |
| 78.941 | `05b:grey:spread` | SPREAD · basmenyebar__v00 | -5 | menggabung 05b:in:cut, 05b:cam:revealout; puncak digeser -25 ms ke gerak tercepat |
| 81.309 | `05b:grey:vanish` | GONE · ES_User_Interface_Alert_UI_Buttons_Dissapear_Mus__v00 | -12 |  |
| 82.715 | `05c:in:cut` | CONTRAST · Cutcontrastransision__v00 | -12 |  |
| 82.833 | `05c:photo:1` | PHOTO1 · Pergantianfoto_gambarpertama__v00 | -13 |  |
| 83.100 | `05c:photo:2` | PHOTO · Pergantianfoto__v07 | -15 |  |
| 83.333 | `05c:photo:3` | PHOTO · Pergantianfoto__v08 | -15 |  |
| 83.600 | `05c:photo:4` | PHOTO · Pergantianfoto__v00 | -15 |  |
| 83.800 | `word:SEMUA:2514` | WORD1 · Katapertama__v00 | -13 |  |
| 83.867 | `05c:photo:5` | PHOTO · Pergantianfoto__v01 | -15 |  |
| 84.100 | `05c:photo:6` | PHOTO · Pergantianfoto__v02 | -15 |  |
| 84.367 | `05c:photo:7` | PHOTO · Pergantianfoto__v03 | -15 |  |
| 84.633 | `05c:photo:8` | PHOTO · Pergantianfoto__v04 | -15 |  |
| 84.867 | `05c:photo:9` | PHOTO · Pergantianfoto__v05 | -15 |  |
| 85.133 | `05c:photo:10` | PHOTO · Pergantianfoto__v06 | -15 |  |
| 85.390 | `05c:icon:0` | AIPOP · Popup_user_interface_AI__v00 | -10 | menggabung 05c:photo:11 |
| 85.457 | `05c:icon:1` | AIPOP · Popup_user_interface_AI__v00 | -10 |  |
| 85.524 | `05c:icon:2` | AIPOP · Popup_user_interface_AI__v00 | -10 |  |
| 85.633 | `05c:photo:12` | PHOTO · Pergantianfoto__v07 | -15 |  |
| 85.900 | `05c:photo:13` | PHOTO · Pergantianfoto__v08 | -15 |  |
| 86.167 | `05c:photo:14` | PHOTO · Pergantianfoto__v00 | -15 |  |
| 86.367 | `05c:anchor:sama` | EMPH · Katapertama__v00 | -11 | menggabung 05c:photo:15; lapisan basmenyebar__v00 |
| 86.667 | `05c:photo:16` | PHOTO · Pergantianfoto__v01 | -15 |  |
| 86.975 | `05d:in:cut` | CONTRAST · Cutcontrastransision__v00 | -12 | menggabung 05c:cam:exitpush, 05d:type:laptop:0; puncak digeser +25 ms ke gerak tercepat |
| 87.100 | `05d:type:laptop:1` | KEY · Keyboardtyping__v02 | -15 |  |
| 87.161 | `05d:enter:laptop` | ENTER · Enter__v00 | -12 |  |
| 87.433 | `05d:cut:hp` | CUT · Cut__v00 | -12 | menggabung 05d:type:hp:0 |
| 87.600 | `05d:type:hp:1` | KEY · Keyboardtyping__v05 | -15 |  |
| 87.672 | `05d:enter:hp` | ENTER · Enter__v00 | -12 |  |
| 87.933 | `05d:cut:tablet` | CUT · Cut__v00 | -12 | menggabung 05d:type:tablet:0 |
| 88.100 | `05d:type:tablet:1` | KEY · Keyboardtyping__v04 | -15 |  |
| 88.183 | `05d:enter:tablet` | ENTER · Enter__v00 | -12 |  |
| 88.433 | `05e:orbit:bloom` | AIPOP · Popup_user_interface_AI__v00 | -10 |  |
| 88.800 | `05e:orbit:ping:0` | AIRESP · ResponAI_AIpopup__v02 | -11 | +1.5 dB (jatuh di suku kata keras VO) |
| 89.200 | `05e:orbit:ping:1` | AIRESP · ResponAI_AIpopup__v01 | -11 |  |
| 90.067 | `05e:orbit:ping:2` | AIRESP · ResponAI_AIpopup__v00 | -11 |  |
| 91.333 | `05e:cam:whip` | CAM · Wooshcameramovementtransisi__v00 | -11 | puncak digeser +31 ms ke gerak tercepat |
| 91.400 | `05f:photo:1` | PHOTO1 · Pergantianfoto_gambarpertama__v00 | -13 |  |
| 91.533 | `05f:photo:2` | PHOTO · Pergantianfoto__v02 | -15 |  |
| 91.633 | `05f:photo:3` | PHOTO · Pergantianfoto__v03 | -15 |  |
| 91.767 | `05f:photo:4` | PHOTO · Pergantianfoto__v04 | -15 |  |
| 91.900 | `05f:photo:5` | PHOTO · Pergantianfoto__v05 | -15 |  |
| 92.033 | `05f:photo:6` | PHOTO · Pergantianfoto__v06 | -15 |  |
| 92.167 | `05f:photo:7` | PHOTO · Pergantianfoto__v07 | -15 |  |
| 92.300 | `05f:photo:8` | PHOTO · Pergantianfoto__v08 | -15 |  |
| 92.400 | `05f:photo:9` | PHOTO · Pergantianfoto__v00 | -15 |  |
| 92.533 | `05f:photo:10` | PHOTO · Pergantianfoto__v01 | -15 | menggabung 05f:type:FOUNDER:0 |
| 92.667 | `05f:photo:11` | PHOTO · Pergantianfoto__v02 | -15 | menggabung 05f:type:FOUNDER:1 |
| 92.800 | `05f:photo:12` | PHOTO · Pergantianfoto__v03 | -15 | menggabung 05f:type:FOUNDER:2 |
| 92.933 | `05f:photo:13` | PHOTO · Pergantianfoto__v04 | -15 |  |
| 93.067 | `05f:photo:14` | PHOTO · Pergantianfoto__v05 | -15 |  |
| 93.167 | `05f:photo:15` | PHOTO · Pergantianfoto__v06 | -15 |  |
| 93.300 | `05f:photo:16` | PHOTO · Pergantianfoto__v07 | -15 |  |
| 93.433 | `05f:photo:17` | PHOTO · Pergantianfoto__v08 | -15 |  |
| 93.567 | `05f:photo:18` | PHOTO · Pergantianfoto__v00 | -15 |  |
| 93.700 | `05f:photo:19` | PHOTO · Pergantianfoto__v01 | -15 |  |
| 93.767 | `word:CEO:2813` | WORD1 · Katapertama__v00 | -13 |  |
| 93.833 | `05f:photo:20` | PHOTO · Pergantianfoto__v02 | -15 |  |
| 93.933 | `05f:photo:21` | PHOTO · Pergantianfoto__v03 | -15 |  |
| 94.067 | `05f:photo:22` | PHOTO · Pergantianfoto__v04 | -15 |  |
| 94.200 | `05f:photo:23` | PHOTO · Pergantianfoto__v05 | -15 |  |
| 94.333 | `05f:photo:24` | PHOTO · Pergantianfoto__v06 | -15 |  |
| 94.467 | `05f:photo:25` | PHOTO · Pergantianfoto__v07 | -15 |  |
| 94.600 | `05f:photo:26` | PHOTO · Pergantianfoto__v08 | -15 |  |
| 94.700 | `05f:photo:27` | PHOTO · Pergantianfoto__v00 | -15 |  |
| 94.833 | `05f:photo:28` | PHOTO · Pergantianfoto__v01 | -15 |  |
| 94.967 | `05f:photo:29` | PHOTO · Pergantianfoto__v02 | -15 |  |
| 95.100 | `05f:photo:30` | PHOTO · Pergantianfoto__v03 | -15 |  |
| 95.233 | `05f:photo:31` | PHOTO · Pergantianfoto__v04 | -15 |  |
| 95.367 | `05f:photo:32` | PHOTO · Pergantianfoto__v05 | -15 |  |
| 95.467 | `05f:cam:breakwide` | CAM · Wooshcameramovementtransisi__v00 | -11 | menggabung 05f:photo:33; puncak digeser -133 ms ke gerak tercepat |
| 95.600 | `05f:anchor:semalam` | EMPH · Katapertama__v00 | -11 | menggabung 05f:photo:34; lapisan basmenyebar__v00 |
| 96.320 | `05g:in:cut` | CONTRAST · Cutcontrastransision__v00 | -12 | menggabung 05g:card:0:habit |
| 96.633 | `05g:card:1:resume` | POP · pop_up__v00 | -12 | +2.0 dB (jatuh di suku kata keras VO) |
| 96.900 | `05g:card:2:caption` | POP · pop_up__v00 | -12 | +2.0 dB (jatuh di suku kata keras VO) |
| 97.133 | `05g:card:3:invoice` | POP · pop_up__v00 | -12 | +3.6 dB (jatuh di suku kata keras VO) |
| 97.400 | `05g:card:4:notes` | POP · pop_up__v00 | -12 | +2.0 dB (jatuh di suku kata keras VO) |
| 97.667 | `05g:card:5:recipe` | POP · pop_up__v00 | -12 | +2.7 dB (jatuh di suku kata keras VO) |
| 97.900 | `05g:card:6:trip` | POP · pop_up__v00 | -12 | +0.1 dB (jatuh di suku kata keras VO) |
| 98.033 | `05g:card:7:budget` | POP · pop_up__v00 | -12 | +4.0 dB (jatuh di suku kata keras VO) |
| 98.167 | `05g:card:8:inbox` | POP · pop_up__v00 | -12 |  |
| 98.300 | `05g:card:9:study` | POP · pop_up__v00 | -12 |  |
| 98.467 | `05h:wipe:silhouette` | WIPE · Woosh__v00 | -8 | puncak digeser -80 ms ke gerak tercepat |
| 98.700 | `05h:light:on:2` | LIGHT · Lasertransision__v00 | -14 | menggabung 05h:user:step:0 |
| 98.833 | `05h:light:on:3` | LIGHT · Lasertransision__v00 | -14 |  |
| 98.967 | `05h:light:on:4` | LIGHT · Lasertransision__v00 | -14 | menggabung 05h:user:step:1 |
| 99.100 | `05h:light:on:5` | LIGHT · Lasertransision__v00 | -14 |  |
| 99.275 | `05h:cam:pushin` | CAM · Wooshcameramovementtransisi__v00 | -11 | menggabung 05h:user:step:2 |
| 99.494 | `05h:user:step:3` | STEP · Move__v01 | -19 |  |
| 99.749 | `05h:user:step:4` | STEP · Move__v01 | -19 |  |
| 100.004 | `05h:user:step:5` | STEP · Move__v01 | -19 |  |
| 100.260 | `05h:user:step:6` | STEP · Move__v01 | -19 |  |
| 100.515 | `05h:user:step:7` | STEP · Move__v01 | -19 |  |
| 100.770 | `05h:user:step:8` | STEP · Move__v01 | -19 |  |
| 100.900 | `05h:cam:snapwide` | CAM · Wooshcameramovementtransisi__v00 | -11 | puncak digeser +33 ms ke gerak tercepat |
| 101.026 | `05h:user:step:9` | STEP · Move__v01 | -19 |  |
| 101.281 | `05h:user:step:10` | STEP · Move__v01 | -19 |  |
| 101.536 | `05h:user:step:11` | STEP · Move__v01 | -19 |  |
| 102.533 | `word:SUSAH:3076` | WORD1 · Katapertama__v00 | -13 |  |
| 102.933 | `05h:light:off:5` | LIGHTOFF · Lasertransision__v00 | -21 |  |
| 103.000 | `05h:light:off:4` | LIGHTOFF · Lasertransision__v00 | -21 |  |
| 103.067 | `05h:light:off:3` | LIGHTOFF · Lasertransision__v00 | -21 |  |
| 103.133 | `05h:light:off:2` | LIGHTOFF · Lasertransision__v00 | -21 |  |
| 103.200 | `05h:light:off:1` | LIGHTOFF · Lasertransision__v00 | -21 |  |
| 103.267 | `05h:light:off:0` | LIGHTOFF · Lasertransision__v00 | -21 |  |
| 103.545 | `06a:cut:in` | CUT · Cut__v00 | -12 |  |
| 105.633 | `word:MEMBANGUN:3169` | WORD1 · Katapertama__v00 | -13 |  |
| 106.180 | `06a:cutzoom:1` | CUT · Cut__v00 | -12 |  |
| 107.233 | `06a:type:MERENCANAKAN` | TYPE · Keyboardtyping__v06 | -14 | rentang 0.57 dtk |
| 107.900 | `06b:reveal:1` | CAM · Wooshcameramovementtransisi__v00 | -11 | puncak digeser -23 ms ke gerak tercepat |
| 108.457 | `06b:row:hero` | LIGHT · Lasertransision__v00 | -14 |  |
| 108.877 | `06b:row:top` | LIGHT · Lasertransision__v00 | -14 |  |
| 111.075 | `06c:land:1` | IMPACT · basmenyebar__v00 | -7 |  |
| 111.075 | `06b:push:1` | RISER · ES_Designed_Riser_Transition_Fast_Short_Clean_01__v00 | -13 |  |
| 112.198 | `06c:head:fly` | MOVE · Move__v03 | -11 |  |
| 112.767 | `06c:anchor:ai` | AIPOP · Popup_user_interface_AI__v00 | -10 |  |
| 113.162 | `06c:head:absorb` | GONE · ES_User_Interface_Alert_UI_Buttons_Dissapear_Mus__v00 | -12 |  |
| 113.495 | `06d:bloom:1` | AIPOP · Popup_user_interface_AI__v00 | -10 |  |
| 113.700 | `06d:type:prompt` | TYPE · Keyboardtyping__v00 | -14 | rentang 2.67 dtk |
| 115.295 | `06d:cutzoom:1` | CUT · Cut__v00 | -12 |  |
| 116.600 | `06d:enter` | ENTER · Enter__v00 | -12 |  |
| 117.060 | `06d:relay:off` | LIGHTOFF · Lasertransision__v00 | -21 |  |
| 117.300 | `06e:cut:in` | CUT · Cut__v00 | -12 |  |
| 119.700 | `06e:anchor:tertinggal` | EMPH · Katapertama__v00 | -11 | lapisan basmenyebar__v00 |
| 120.530 | `06f:cut:in` | CUT · Cut__v00 | -12 |  |
| 123.502 | `06f:glyph:all` | AIPOP · Popup_user_interface_AI__v00 | -10 | menggabung 06f:cutzoom:1 |
| 124.382 | `06f:pulse:1` | AIRESP · ResponAI_AIpopup__v02 | -11 |  |
| 126.317 | `06f:crane:1` | CAM · Wooshcameramovementtransisi__v00 | -11 |  |
| 126.950 | `06g:plane:1` | LIGHT · Lasertransision__v00 | -14 |  |
| 127.140 | `06g:plane:8` | LIGHT · Lasertransision__v00 | -14 |  |
| 127.330 | `06g:plane:2` | LIGHT · Lasertransision__v00 | -14 |  |
| 127.520 | `06g:plane:7` | LIGHT · Lasertransision__v00 | -14 |  |
| 127.710 | `06g:plane:3` | LIGHT · Lasertransision__v00 | -14 |  |
| 127.900 | `06g:plane:6` | LIGHT · Lasertransision__v00 | -14 |  |
| 128.033 | `word:PERAN:3841` | WORD1 · Katapertama__v00 | -13 |  |
| 128.090 | `06g:plane:5` | LIGHT · Lasertransision__v00 | -14 |  |
| 129.000 | `06g:punch:in` | CAM · Wooshcameramovementtransisi__v00 | -11 | menggabung 06g:type:KAMU:0 |
| 129.133 | `06g:type:KAMU:1` | KEY · Keyboardtyping__v02 | -15 |  |
| 130.025 | `06g:boom:1` | IMPACT · basmenyebar__v00 | -7 |  |

## Backsound

**Video 1 - Particle Emission penuh + ambience kantor.** Particle Emission (C minor, pad gelap-dreamy) dari detik 0
sampai akhir; file ini membangun sendiri (lebih penuh mulai ~40 dtk dan ~80 dtk) dan itu jatuh di babak AI bekerja (41)
dan "satu sukses di antara ribuan cerita gagal" (79). Ambience kantor (Epidemic, segmen 20-38 dtk file, HPF 150 Hz)
hanya 32-50 dtk di bawah adegan "kita bekerja" (kalender, tugas, ketik prompt), 24 LU di bawah VO.

**Video 2 - Reggae (awal sebelum piano) sebagai bookend + Particle Emission di tengah + ambience kantor.**
Cold open 0-10.29 memakai awal Reggae (E mayor, pluck arpeggio melankolis; piano masuk di ~9.75 dtk file, jadi dipakai
0.30-9.62 lalu diperpanjang satu bar dari fase yang sama, periode 3.12 dtk) dan berhenti bersama cut ke "Sadar" (10.29).
Particle masuk dari cut itu dan membawa babak tengah. Tema Reggae yang sama kembali tepat di awal jeda VO 125.25
(pre-lap 1.1 dtk ke cut "Peran Kamu" 126.35) sampai akhir: dibuka dengan dunia yang kagum pada AI, ditutup kembali
ke manusia. Reggae (E) dan Particle (C minor) bentrok nada, jadi hanya bersilang 0.3 dtk (Particle habis 125.55).
Documenter tidak dipakai: earshot membacanya sebagai rustle (burung mengepak / hewan kecil di rumput) di bawah cold open,
bunyi tanpa objek di gambar.

Level bed per bagian (LU relatif VO): 0s -15, 9.6s -15, 9.9s -8, 10.3s -8, 10.9s -18, 19s -17, 19.6s -16, 40s -16, 50s -15, 54.6s -15, 55s -6, 55.8s -6, 56.2s -19, 61s -19, 61.6s -14, 69.8s -14, 70.2s -6, 70.9s -6, 71.3s -19, 74.4s -19, 74.7s -8, 75.2s -14, 100s -13, 103.5s -14, 124.9s -14, 125.3s -5, 126.2s -5, 126.6s -12, 129.6s -12, 130.6s -9, 132.8s -9
