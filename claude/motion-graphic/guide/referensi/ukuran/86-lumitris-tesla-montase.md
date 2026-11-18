# Ukuran 86 · Lumitris, Tesla Roadster

Diukur 18 Nov 2026 dari `/home/irfan/work/pustaka-video/lumitris-tesla-roadster_DezFTyktEUp.mp4`. Tautan identitas: https://www.instagram.com/reel/DezFTyktEUp/; halaman IG tidak dipakai sebagai bukti. Semua observasi berasal dari file lokal. Transkrip merekam ujaran dalam video; isi ujaran tidak diperiksa sebagai fakta peristiwa.

## Sumber dan keluaran

| Ukuran | Hasil | Asal |
|---|---|---|
| Resolusi / rasio | 1280×720 / 16:9 | `ffprobe`, stream video |
| Frame rate | 11987/500 = 23,974 fps | `r_frame_rate` dan `avg_frame_rate` sama |
| Jumlah frame | 1389 | `nb_frames` video |
| Durasi video / audio / container | 57,937766 / 58,046708 / 58,046708 dtk | `ffprobe` |
| Audio | AAC, 48000 Hz, stereo | `ffprobe` |
| Contact sheet | 1920×1416, 29 gambar | 5 kolom × 6 baris; sel 384×236, gambar 384×216 + label |
| Interval contact sheet | nominal 0, 2, …, 56 dtk | `n = round(t × fps)`; label memakai `n/fps`, sel terakhir kosong |
| Frame kunci | 8 JPEG, masing-masing 1280×720 | ekstraksi tanpa resize; quality 96, subsampling 0 |

Nomor frame **berbasis nol**. Timestamp = `n × 500 / 11987`. Karena pembulatan ke frame terdekat, label contact sheet dapat berbeda sekitar satu frame dari detik nominal. Semua persentase memakai frame penuh, termasuk bidang hitam. `H=720`, `W=1280`.

| Kunci | File di `../sheets/keyframes/` | Frame / waktu aktual | Yang terlihat |
|---|---|---|---|
| k1 | `86-k1-kata-kecil-footage.jpg` | 384 / 16,017352 dtk | “whole / line / of”, kendaraan panggung |
| k2 | `86-k2-kartu-terang.jpg` | 182 / 7,591558 dtk | “But / there's”, kartu terang berbintik |
| k3 | `86-k3-kata-besar-start.jpg` | 606 / 25,277384 dtk | “start”, bodi mobil dan robot |
| k4 | `86-k4-grid-kolase.jpg` | 539 / 22,482690 dtk | “you / can't / walk”, empat panel showroom |
| k5 | `86-k5-invert-grid-logo.jpg` | 139 / 5,797948 dtk | grid dengan panel Tesla berubah terang–gelap |
| k6 | `86-k6-kotak-abu-kata.jpg` | 326 / 13,598065 dtk | persegi panjang abu pada “Last week” |
| k7 | `86-k7-ui-dashboard.jpg` | 1247 / 52,014683 dtk | “just / has / to” di depan dashboard |
| k8 | `86-k8-penutup.jpg` | 1343 / 56,019021 dtk | lockup Lumitris di hitam |

## Piksel huruf dan ruang

Koordinat `(x0,y0,x1,y1)` memakai batas kanan/bawah **eksklusif**. Ukuran dihitung dari tinta inti, tidak menyertakan pendar. JPEG terkompresi dan ambang segmentasi memberi ketidakpastian sekitar ±1 px pada tepi bersih; bbox panel/subjek yang ditunjuk dengan mata sekitar ±2 px. Angka kartu dibulatkan satu desimal; bbox subjek/panel dibulatkan ke persen utuh dengan tanda ±.

Rumus: tinggi `% H = 100 × h/720`; lebar atau celah `% W = 100 × w/1280`; posisi y = pusat bbox tinta dibagi H. X-height diambil dari huruf kecil tanpa ascender/descender, bukan dari tinggi seluruh kata. Kapital hanya disebut bila huruf kapital hadir; ascender dilaporkan terpisah bila sampelnya semua lowercase.

| Sampel | ROI pemeriksaan | Tinta/glyph terukur (px) | Konversi yang dipakai kartu |
|---|---|---|---|
| k1 “whole” | `(235,325,700,390)` | “o” `(318,347,344,374)`, “e” `(354,347,379,374)`: 27 tinggi; “h/l”: 36 tinggi | x 3,75 % H; ascender 5,00 % H |
| k1 deret | ROI sama | whole x252–379; line x485–552; of x632–672; y338–374 | pusat y356 = 49,44 % H; celah 106/80 px = 8,28/6,25 % W |
| k2 “But / there's” | `(380,320,700,390)` | B `(398,337,427,374)`: 37 tinggi; u `(429,347,452,375)`: 28; e `(565,346,591,373)`: 27 | kapital 5,14 % H; x 3,75–3,89 % H |
| k2 deret | ROI sama | But x398–468; there's x524–666; gabungan y336–375 | celah 56 px = 4,38 % W; pusat y355,5 = 49,38 % H |
| k3 “start” | `(500,300,755,410)` | s `(529,334,579,395)`: 61 tinggi; a `(612,334,668,395)`: 61; t `(578,319,610,394)`: 75 | x 8,47 % H; ascender 10,42 % H |
| k3 bbox kata | ROI sama | `(529,319,735,395)`; 206 lebar | lebar 16,09 % W; pusat y357 = 49,58 % H; rasio x terhadap k1 = 61/27 = 2,26×, lintas frame |
| k4 kata kecil | `(80,330,665,390)` | o pada “you” 26 tinggi; a pada “can't” 27; a pada “walk” 27; l 36; gabungan y337–380 | x 3,61–3,75 % H; ascender 5,00 % H; pusat gabungan y358,5 = 49,79 % H |
| k4 deret | ROI sama | you x112–186; can't x305–404; walk x540–637 | celah 119/136 px = 9,30/10,63 % W |
| k5 “Elon / Musk” | `(342,325,445,390)` dan `(810,325,917,390)` | E `(342,339,369,376)`: 37; o 27; u 27; s 28 | kapital 5,14 % H; x 3,75–3,89 % H; pusat y357,5 = 49,65 % H |
| k6 “Last week” | `(527,328,757,376)` | L/ascender 36; a 27; w 26; e 27; kata x534–618 dan x637–752; y334–370 | kapital 5,00 % H; x 3,61–3,75 % H; celah 19 px = 1,48 % W; pusat y352 = 48,89 % H |
| k7 narasi | `(463,325,552,390)` dan `(650,325,737,390)` | “just”: u `(483,345,505,371)` 26; “has”: a `(684,349,709,375)` 26, s 27, h 35 | x 3,61–3,75 % H; ascender 4,86 % H; bbox “has” y340–376, pusat 49,72 % H |
| k8 “LUMITRIS” | `(555,350,805,405)` | kapital 35–36 tinggi; kata y360–396 | kapital 4,86–5,00 % H; x-height tidak ada pada kata kapital ini |

Ambang luma (OpenCV grayscale 0–255): k1/k3/k4/k7 `>210`, k2 `<90`, k5 `>140`, k6 `<110`, k8 `>170`. Bbox kata adalah gabungan komponen huruf yang ditunjuk, bukan seluruh piksel ROI. Pada k5 garis panel x338 dan pada k7 garis UI tidak dihitung sebagai huruf. “to” pada k7 berimpit garis UI: ukuran glyph tersendirinya **Tidak terbedah**.

## Bbox objek, bidang, dan warna

| Sampel | Bbox/patch piksel | Hasil / pemakaian |
|---|---|---|
| k1 dua kendaraan, dipilih dengan mata | `(839,319,1201,477)` | 362×158 px = 28,28 % W × 21,94 % H |
| k3 bodi mobil | melintasi x0–1280, terpotong tepi | memenuhi lebar frame; tidak diklaim ukuran mobil utuh |
| k4 panel kiri atas | `(0,0,540,264)` | lebar 42,19 % W |
| k4 panel kanan atas | `(628,0,1280,178)` | lebar 50,94 % W |
| k4 panel kiri bawah | `(56,492,671,720)` | lebar 48,05 % W; bawah terpotong frame |
| k4 panel kanan bawah | `(795,457,1154,700)` | lebar 28,05 % W; rentang empat panel 28–51 % W |
| k5 panel tengah luar | `(311,178,959,541)` | 648×363 px = 50,63 % W × 50,42 % H |
| k5 bidang invert di dalamnya | `(339,196,923,522)` | 584×326 px; pembalikan setempat terlihat dengan membandingkan f138/f139/f140 |
| k6 bidang abu | `(119,217,802,470)` | 683×253 px = 53,36 % W × 35,14 % H; batas dicek dari perubahan luma baris y250 |
| k7 dashboard | x0–1280, y0–720 | memenuhi frame; tulisan narasi di depan tulisan UI |
| k8 lockup | `(453,313,796,404)`, luma >170 | 343×91 px = 26,80 % W × 12,64 % H; pusat (624,5;358,5) = (48,79 % W;49,79 % H) |
| k1 watermark | `(1054,50,1225,94)`, luma >170 | kanan atas; hanya posisi yang dipakai kartu |
| k1 tinta putih | ROI `(240,330,690,380)`, piksel luma >245 | median RGB (253,253,254) = `#FDFDFE` |
| k2 tinta hitam | ROI `(390,330,670,380)`, piksel luma <40 | median RGB (3,2,2) = `#030202` |
| k2 terang tengah | patch `(600,220,680,300)` | median RGB (236,236,236) = `#ECECEC` |
| k2 pojok | patch `(0,0,40,40)` | median RGB (186,186,186) = `#BABABA` |
| k5 abu dalam panel | patch `(365,220,465,270)` | median RGB (116,116,116) = `#747474` |
| k6 abu bidang | patch `(200,240,400,320)` | median RGB (152,152,152) = `#989898` |
| k8 hitam | patch `(0,0,200,200)` | semua piksel RGB (0,0,0) |

Kartu terang tidak memiliki satu warna rata: patch lain memberi median 235 (x500,y200), 234 (x500,y460), 230/229/230 (x500,y520), dan 207 (x100,y300), masing-masing patch 80×80. Karena itu perkiraan awal ±`#E8E8E8` tidak dipakai sebagai warna rata. Bintik/debu dan tepi gelap terlihat pada k2; amplitudo/setelan grain asal **Tidak terbedah**. Nilai warna adalah sampel JPEG frame kunci, bukan hex dari file desain pembuat.

## Ritme, transisi, dan batas isi

Keluaran `pace_read.py` pada seluruh file, tanpa `--words`:

```text
durasi 58.0 dtk · cut 53 = 54.8/menit · shot median 0.5 dtk
gerak layar 7.5 · event visual 78/menit · laju bicara 5.6 suku kata/dtk (proxy kasar)
usulan kategori: energi · musik 100–140 bpm
```

Angka lebih presisi dari fungsi `cuts()` dan `duration()`: 53 deteksi, 54,7834685/menit, median 0,500521 dtk. Denominator 58,046708 dtk **termasuk penutup**. Deteksi memakai `select='gt(scene,0.30)'`; perubahan panel/teks juga dapat melewati ambang. Event visual berasal dari puncak beda frame pada sampling 6 fps, grayscale 64×64, prominence 4, jarak minimal 2 sampel. Laju suku kata adalah proksi mix, bukan hitungan ucapan dari ASR. Saran 100–140 bpm **bukan BPM musik terukur**.

Timestamp deteksi (dtk):

```text
0.500542 0.667390 0.959373 1.042800 1.376490 1.543340 3.920910
4.755150 4.963710 5.714520 6.215070 7.299570 9.134900 12.722100
16.976700 17.477300 17.727500 17.977800 18.436600 23.400400 24.192900
26.487000 29.365100 29.782300 32.910700 33.035800 33.286100 33.578000
34.036900 34.537400 35.038000 35.455100 36.539600 39.459400 40.460500
42.629500 44.089400 44.715100 45.215700 45.883000 46.467000 46.967500
47.259500 47.343000 47.426400 47.593200 47.676600 47.760100 47.843500
47.926900 48.010300 48.093800 51.389000
```

| Bukti temporal tambahan | Yang diperiksa / hasil |
|---|---|
| f138 / f139 / f140 = 5,756236 / 5,797948 / 5,839660 dtk | panel Tesla berubah dari logo hitam ke terang pada abu lalu kembali; pulsa yang diperiksa 1 frame = 500/11987 = 0,041712 dtk |
| f180,182,186,190,192,194,196,200 = sekitar 7,51–8,34 dtk | kata pada kartu terang bertambah; bidang terang kemudian menyempit vertikal di antara hitam atas/bawah |
| f601–f607 = sekitar 25,07–25,32 dtk | “start” menebal/bergeser pada pulsa awal, menjadi bersih; f606 pabrik → f607 jalan kota, kata tetap tampil |
| f1199 = 50,012514 dtk | lima kata terlihat: “The / car / everyone's / talking / about”; dasar jumlah 1–5 kata pada sampel, bukan batas universal |
| f1227 = 51,180445 dtk | serif kapital “THE / MONEY.”; berbeda dari grotesk narasi |
| f1232 / f1251 = 51,389005 / 52,181530 dtk | layar simulasi mobil / dashboard; bukan bukti asal software |
| f1127,1130,1134,1138,1141,1145,1148,1152 = sekitar 47,01–48,05 dtk | gambar uang berganti crop/posisi; jeda deteksi beruntun pada 47,2595–48,0938 dtk sekitar 0,0834–0,1668 dtk. Inilah bukti rentetan cepat yang disebut flash pada catatan awal; tipe flash cahaya tersendiri Tidak terbedah |
| f1295 = 54,016852 dtk | masih footage mobil dengan kata “does.” |
| f1296 = 54,058563 dtk | hampir hitam; mean RGB seluruh frame 0,669/255 |
| f1297 / f1298 / f1299 = 54,100275 / 54,141987 / 54,183699 dtk | logo / hitam / logo; mean RGB seluruh frame 3,474 / 0,00019 / 3,212 |
| k8 dan frame terakhir f1388 = 57,896054 dtk | penutup; stream video berakhir pada 57,937766 dtk, sedikit sebelum audio/container |

Kotak abu dibuktikan oleh k6 pada 13,598 dtk. Frame 12,514 dtk memperlihatkan footage monokrom “supposed” tanpa kotak yang jelas; pada 25,486 dtk bidang abu di belakang “till” mengikuti bentuk bangunan. Kedua perkiraan lokasi awal itu tidak dipakai sebagai bukti kotak grafis. Persegi panjang terang lain terlihat pada f563 / 23,484 dtk di belakang “and”.

## Audio dan transkrip

Keluaran ringkasan `ffmpeg ebur128=peak=true` pada mix penuh:

```text
Integrated loudness I: -14.2 LUFS
LRA: 4.1 LU
True peak: -0.3 dBFS   (true peak hasil filter; dilaporkan sebagai dBTP di kartu)
```

Transkrip otomatis: `Systran/faster-whisper-small`, cache lokal, CPU int8, 3 thread, bahasa Inggris, beam 5, word timestamps aktif, VAD nonaktif. Tidak dikoreksi lewat pemeriksaan dengar; ketepatan setiap fonem **Tidak terbedah**. Pemanggilan decoder PyAV langsung gagal pada argumen `metadata_errors`; input diganti array float32 mono 16 kHz dari ffmpeg tanpa mengubah paket lingkungan.

| Waktu ASR (dtk) | Ujaran hasil ASR |
|---|---|
| 0,00–2,36 | So the world finally has the flying car. |
| 4,70–7,26 | Elon Musk and Tesla just built a flying car. |
| 7,38–8,50 | But there's a slight misunderstanding. |
| 9,20–10,96 | The new Tesla Roadster flying model |
| 10,96–13,00 | is something that you're not really supposed to buy. |
| 13,26–16,00 | Last week, Tesla's new Roadster jumped over a whole line |
| 16,00–18,12 | of other Teslas using SpaceX thrusters |
| 18,12–19,64 | and the video went everywhere. |
| 19,92–21,88 | But here's the thing nobody's talking about. |
| 22,08–24,00 | You can't walk into a showroom and get one. |
| 24,26–26,28 | Production doesn't even start till 2028 |
| 26,28–29,12 | and the version that actually flies is invite only. |
| 29,12–32,54 | So why spend years building a car almost nobody will drive? |
| 32,80–35,30 | Because I don't think the Roadster is the product at all. |
| 35,48–36,34 | I think it's the ad. |
| 36,56–39,42 | Nobody shares a video of a Model 3 sitting in a parking lot, |
| 39,50–41,84 | but everyone shares a car doing a backflip in the air. |
| 42,00–44,42 | Millions of people watch it, start talking about Tesla, |
| 44,78–46,86 | look it up, and some of them end up buying the car |
| 46,86–47,74 | they can actually afford. |
| 48,10–48,66 | That's the trick. |
| 48,84–51,28 | The car everyone's talking about doesn't have to make the money. |
| 51,46–53,76 | It just has to send people to the car that does. |

Jenis/jumlah SFX, sinkron SFX per objek, genre/instrumen/BPM musik, perbandingan level stem, serta perubahan musik per babak: **Tidak terbedah**. Loudness di atas berlaku untuk mix, bukan musik tersendiri.

## Perbandingan kartu 46

Sumber pembanding yang dibaca: `../../../pustaka/kartu/46-lumitris-montase-arsip.md` dan delapan `../sheets/keyframes/46-k*.jpg`. Yang sama terlihat: watermark, penutup hitam, grotesk kecil di tengah, kolase, pembalikan setempat. Angka pembanding **disalin dari kartu 46**, tidak diukur ulang: 1280×534 (2,4:1), x-height kecil 4,7–5,1 % H, rasio besar:kecil 4–15×, dan `pace_read` 71 event deteksi/menit. Kartu 46 membedakan hitungan manual 37 cut pada isi (68/menit) dari 42 event `pace_read` pada file penuh (71/menit); kartu 86 membandingkan hasil alat penuh dengan hasil alat penuh. Kartu 46 juga menampilkan kata “life” sangat besar; k3 kartu 86 hanya penekanan “start” 2,26× kata kecil.

## Perintah yang dipakai

Dijalankan dari root repo. Python media: `/home/irfan/work/mg-venv/bin/python`; `cv2`, Pillow, NumPy, dan faster-whisper tersedia. Skrip ekstraksi di bawah merangkum operasi yang dijalankan dengan frame, format, kualitas, dan rumus yang sama.

```bash
ffprobe -v error -show_entries format=duration:stream=index,codec_name,width,height,r_frame_rate,avg_frame_rate,nb_frames,duration,sample_rate,channels -of json /home/irfan/work/pustaka-video/lumitris-tesla-roadster_DezFTyktEUp.mp4
/home/irfan/work/mg-venv/bin/python claude/motion-graphic/scripts/audio/pace_read.py /home/irfan/work/pustaka-video/lumitris-tesla-roadster_DezFTyktEUp.mp4
ffmpeg -hide_banner -nostats -i /home/irfan/work/pustaka-video/lumitris-tesla-roadster_DezFTyktEUp.mp4 -vn -af ebur128=peak=true -f null -
```

Ekstraksi contact sheet dan frame kunci:

```bash
/home/irfan/work/mg-venv/bin/python - <<'PY'
from pathlib import Path
import cv2
from PIL import Image, ImageDraw, ImageFont
cap = cv2.VideoCapture('/home/irfan/work/pustaka-video/lumitris-tesla-roadster_DezFTyktEUp.mp4')
fps = cap.get(cv2.CAP_PROP_FPS)
def frame(n):
    cap.set(cv2.CAP_PROP_POS_FRAMES, n)
    ok, f = cap.read()
    assert ok
    return Image.fromarray(cv2.cvtColor(f, cv2.COLOR_BGR2RGB))
root = Path('claude/motion-graphic/guide/referensi/sheets')
sheet = Image.new('RGB', (1920,1416), (20,20,20))
draw = ImageDraw.Draw(sheet)
font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',15)
for i,t in enumerate(range(0,58,2)):
    n = round(t*fps)
    x,y = i%5*384, i//5*236
    sheet.paste(frame(n).resize((384,216),Image.Resampling.LANCZOS),(x,y))
    draw.text((x+5,y+218),f'{n/fps:06.3f} s · f{n}',font=font,fill='white')
sheet.save(root/'86-lumitris-tesla-montase.jpg',quality=93,subsampling=0)
items = [(1,384,'kata-kecil-footage'),(2,182,'kartu-terang'),
         (3,606,'kata-besar-start'),(4,539,'grid-kolase'),
         (5,139,'invert-grid-logo'),(6,326,'kotak-abu-kata'),
         (7,1247,'ui-dashboard'),(8,1343,'penutup')]
for k,n,name in items:
    frame(n).save(root/'keyframes'/f'86-k{k}-{name}.jpg',quality=96,subsampling=0)
cap.release()
PY
```

Komponen huruf (diulang untuk ROI/ambang pada tabel; objek/panel ditunjuk pada frame penuh):

```bash
/home/irfan/work/mg-venv/bin/python - <<'PY'
from pathlib import Path
import cv2, numpy as np
base=Path('claude/motion-graphic/guide/referensi/sheets/keyframes')
for k,roi,thr,dark in [(1,(235,325,700,390),210,False),
 (2,(380,320,700,390),90,True),(3,(500,300,755,410),210,False),
 (4,(80,330,665,390),210,False),(5,(342,325,445,390),140,False),
 (6,(527,328,757,376),110,True),(7,(650,325,737,390),210,False),
 (8,(555,350,805,405),170,False)]:
    im=cv2.imread(str(next(base.glob(f'86-k{k}-*.jpg'))),cv2.IMREAD_GRAYSCALE)
    x0,y0,x1,y1=roi; a=im[y0:y1,x0:x1]
    mask=((a<thr) if dark else (a>thr)).astype(np.uint8)
    _,_,stats,_=cv2.connectedComponentsWithStats(mask,8)
    print(k,[(int(x+x0),int(y+y0),int(w),int(h),int(area))
             for x,y,w,h,area in stats[1:] if area>=12 and h>=6])
PY
```

Sampel warna: `im=cv2.imread(path)[:,:,::-1]` (RGB); median tiap kanal dari `im[y0:y1,x0:x1].reshape(-1,3)`, dengan patch/ambang pada tabel. Timestamp deteksi diekstrak dari `pace_read.cuts(src)`; median `np.median(np.diff([0]+cuts+[duration]))`. Untuk melihat frame tambahan, fungsi `frame(n)` di atas dipanggil dengan nomor pada tabel temporal; hasil sementara pemeriksaan disimpan di `/tmp/kartu86/`.

Transkripsi yang berhasil:

```bash
/home/irfan/work/mg-venv/bin/python - <<'PY'
import subprocess, numpy as np
from faster_whisper import WhisperModel
src='/home/irfan/work/pustaka-video/lumitris-tesla-roadster_DezFTyktEUp.mp4'
raw=subprocess.run(['ffmpeg','-v','error','-i',src,'-vn','-ac','1',
                    '-ar','16000','-f','f32le','-'],capture_output=True,check=True).stdout
audio=np.frombuffer(raw,np.float32).copy()
model=WhisperModel('small',device='cpu',compute_type='int8',cpu_threads=3,
                   num_workers=1,local_files_only=True)
segments,info=model.transcribe(audio,language='en',beam_size=5,
                               word_timestamps=True,vad_filter=False)
for s in segments:
    print(f'{s.start:.2f}–{s.end:.2f} {s.text}')
PY
```

## Batas bedah

- Nama/font file dan bobot numerik; preset/setelan grain; kurva easing; konstruksi/jumlah layer asal; pemisahan gerak kamera edit dari gerak kamera klip: **Tidak terbedah**.
- Asal software/footage, teknik pembuatan adegan mobil terbang, dan kebenaran klaim narasi: **Tidak terbedah**.
- SFX dan musik per stem serta ketepatan fonem ASR: **Tidak terbedah**.
