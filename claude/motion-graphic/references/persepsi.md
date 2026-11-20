# Persepsi — letak orang dan wajah di footage

Baca saat adegan berfootage butuh tahu di mana orang atau wajahnya: teks atau kata hero di belakang kepala, glow di tepi badan, teks mengapit wajah, latar diganti atau diredupkan lewat matte, cutout subjek, still hero dengan rambut rapi.

## Isi

- 1. Tiga alat dan kapan dipakai
- 2. Pasang (sekali per mesin)
- 3. Jalankan
- 4. Keluaran dan cara memakainya di rakit lego
- 5. Batas yang sudah diketahui

## 1. Tiga alat dan kapan dipakai

| Alat | Menghasilkan | Pakai saat | Jangan dipakai untuk |
|---|---|---|---|
| **RVM** (Robust Video Matting, `rvm_mobilenetv3_fp32.onnx`, CPU) | `matte.mp4`: alpha orang di setiap frame (putih = orang), stabil antar frame karena modelnya mengingat frame sebelumnya | Lapisan apa pun yang harus mengikuti orang sepanjang klip: teks di belakang kepala atau badan, glow tepi badan, latar diganti atau diredupkan, cutout subjek | Still tunggal yang butuh helai rambut paling rapi (pakai BiRefNet); objek bukan manusia |
| **MediaPipe Face Landmarker** (`face_landmarker.task`) | `wajah.json`: per frame kotak wajah dan 5 titik (dahi, hidung, dagu, mata kiri, mata kanan) ternormal 0–1 | Menaruh teks mengapit atau di atas wajah, mengecek teks tidak menutup wajah, titik pusat punch-in kamera ke wajah, mencari rentang tanpa wajah | Letak badan atau bahu (pakai matte); klip dengan dua orang (hanya satu wajah dibaca) |
| **BiRefNet portrait** (lewat `rembg`, model ±1 GB) | Satu mask PNG resolusi penuh dengan tepi rambut paling rapi | Thumbnail atau cover, freeze-frame, still hero, pembanding tepi rambut RVM di satu frame | Video per frame: ±25 dtk per frame dan tidak stabil antar frame, jadi tepinya berkedip. Frame tanpa orang: model memotong objek paling menonjol, mis. kursi kosong |

Urutan bawaan untuk video: RVM + MediaPipe dalam satu jalan (`persepsi.py`). BiRefNet hanya untuk still.

## 2. Pasang (sekali per mesin)

Alat ini tidak masuk `requirements.txt` karena berat; pasang di venv terpisah hanya bila tugasnya butuh.

```bash
mkdir -p ~/work/persepsi/models && cd ~/work/persepsi
python3 -m venv .venv            # Python 3.10–3.13
.venv/bin/pip install onnxruntime mediapipe opencv-python-headless numpy "rembg[cpu]"
curl -L -o models/rvm_mobilenetv3_fp32.onnx https://github.com/PeterL1n/RobustVideoMatting/releases/download/v1.0.0/rvm_mobilenetv3_fp32.onnx
curl -L -o models/face_landmarker.task https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task
```

- BiRefNet diunduh otomatis oleh `rembg` saat pertama dipakai, ke `~/.rembg/models/birefnet-portrait/` (973 MB). Puncak RAM ±10 GB.
- MediaPipe butuh `libEGL.so.1`. Bila muncul `OSError: libEGL.so.1: cannot open shared object file`: pasang `sudo apt install libegl1`. Tanpa sudo: `apt-get download libegl1 libegl-mesa0`, ekstrak dengan `dpkg-deb -x <deb> ~/work/persepsi/syslib`, lalu jalankan dengan `LD_LIBRARY_PATH=~/work/persepsi/syslib/usr/lib/x86_64-linux-gnu`.
- Cek pemasangan: `ls ~/work/persepsi/models` berisi dua file model, dan perintah di §3 pada 3 dtk footage selesai dengan `laporan.txt`.

## 3. Jalankan

Skrip: `claude/motion-graphic/scripts/lego/persepsi.py` (salin ke `~/work/persepsi/` atau panggil dengan path repo; modelnya dicari di `--model-dir`, bawaan `~/work/persepsi/models`).

```bash
cd ~/work/persepsi && LD_LIBRARY_PATH=$PWD/syslib/usr/lib/x86_64-linux-gnu \
  .venv/bin/python <repo>/claude/motion-graphic/scripts/lego/persepsi.py <klip.mp4> <out_dir> [--detik 3] [--birefnet]
```

- Pakai `.venv/bin/python`, bukan `python3` sistem. `LD_LIBRARY_PATH` hanya perlu bila libEGL dipasang tanpa sudo.
- Jalankan di background; ±6 dtk proses per detik footage, jadi klip 60 dtk ±6 menit.
- Uji dulu dengan `--detik 3`, lihat `cek.jpg`, baru jalankan seluruh klip.
- Input adalah **klip yang sama persis dengan yang masuk `dasar` lego.json** (sudah dipotong, fps sama), supaya frame matte dan frame footage sejajar.

## 4. Keluaran dan cara memakainya di rakit lego

| File | Isi | Dipakai untuk |
|---|---|---|
| `matte.mp4` | grayscale, putih = orang; resolusi dan fps sama dengan klip | sumber cutout dan glow |
| `wajah.json` | `{fps, w, h, frames: [{t, kotak: [x,y,w,h], titik: {dahi, hidung, dagu, mata_kiri, mata_kanan}}]}`; frame tanpa wajah hanya berisi `t` | posisi teks terhadap wajah |
| `cek.jpg` | 3 frame (0, 1, 2 dtk): matte merah + titik hijau + kotak kuning | **wajib dilihat** sebelum hasil dipakai |
| `laporan.txt` | waktu proses dan jumlah frame berwajah | catatan kecepatan |
| `birefnet_frame0.png` | mask BiRefNet frame 0 (hanya dengan `--birefnet`) | pembanding tepi rambut |

**Cek `cek.jpg` dengan mata:** merah menutup orang saja (bukan kursi, meja, atau latar), titik hijau tepat di dahi, kedua mata, hidung, dan dagu. Frame tanpa orang harus tanpa merah dan tanpa titik. Bila salah, jangan pakai hasilnya.

**Teks di belakang kepala (cutout di atas teks).** Buat subjek ber-alpha dari klip + matte (terbukti jalan, ProRes 4444):

```bash
ffmpeg -i klip.mp4 -i matte.mp4 -filter_complex "[1:v]format=gray[m];[0:v][m]alphamerge" -an \
  -c:v prores_ks -profile:v 4444 -pix_fmt yuva444p10le subjek.mov
```

Di `lego.json`, urutan `lapisan` = urutan tumpuk: lapisan teks dulu, lalu `subjek.mov` frame penuh (`x: 0, y: 0`, `t` = waktu mulai klip dasar). Hasilnya teks tampak di belakang orang. Teks depan (caption) ditaruh sesudah `subjek.mov`.

- `compose.py` tidak menerapkan `kamera` dasar ke lapisan. Bila dasar diberi zoom atau pusat bergerak, `subjek.mov` tidak ikut dan tepi orang bergeser. Untuk rentang teks di belakang kepala: dasar tanpa `kamera`, atau rakit dulu dasar + kamera ke mp4, jalankan `persepsi.py` di mp4 itu, lalu pakai mp4 itu sebagai dasar tanpa kamera.
- Glow tepi badan dirender di dalam lapisan (aturan compose: efek di dalam lapisan, compose hanya overlay alpha), dengan `subjek.mov` atau `matte.mp4` sebagai sumber bentuknya.

**Teks mengapit atau di atas wajah.** Koordinat `wajah.json` ternormal terhadap klip input: piksel = nilai × `w` atau `h`. Bila klip dasar di-crop atau diskalakan saat dirakit, terapkan transformasi yang sama.

- `mata_kiri` dan `mata_kanan` adalah sisi **gambar** (kiri layar), bukan sisi tubuh orang.
- Titik bergoyang: di klip uji, hidung bergerak rata-rata ±4 px per frame dan sampai 29 px saat kepala bergerak (1080×1920). Untuk posisi teks, haluskan dulu (rata-rata bergerak ±5 frame) atau pakai satu nilai per blok teks dari median rentangnya, supaya teks tidak ikut bergetar.
- Frame tanpa wajah tidak punya `kotak`: tahan nilai terakhir, atau sembunyikan elemen yang bergantung pada wajah.
- Cek tidak menutup wajah: kotak blok teks tidak boleh beririsan dengan `kotak` wajah di frame mana pun selama blok tampil (kecuali kata hero di belakang kepala yang memang dipotong cutout).

**BiRefNet untuk frame pilihan.** `--birefnet` selalu memakai frame 0. Bila frame 0 belum berisi orang, jalankan untuk frame lain:

```python
import cv2
from rembg import remove, new_session
from PIL import Image
cap = cv2.VideoCapture("klip.mp4"); cap.set(cv2.CAP_PROP_POS_FRAMES, 30); ok, fr = cap.read()
m = remove(Image.fromarray(cv2.cvtColor(fr, cv2.COLOR_BGR2RGB)), session=new_session("birefnet-portrait"), only_mask=True)
m.save("birefnet_frame30.png")
```

## 5. Batas yang sudah diketahui

- **Kecepatan (dicek 20 Nov 2026, PC 8 core CPU, 32 GB RAM; 3 dtk footage 1080×1920 30 fps):** RVM 5,8 dtk per detik footage; MediaPipe 0,8 dtk per detik footage; BiRefNet muat model 5,5 dtk + 25,5 dtk per frame (unduhan pertama menambah ±80 dtk). VM cloud 2 core: RVM ±7 dtk per detik footage; BiRefNet kehabisan RAM.
- RVM membaca orang utuh; tepi rambut halus lebih kasar dari BiRefNet. Downsample otomatis membuat sisi panjang ±512 px; bila orang kecil di frame (wide shot), naikkan `--downsample` (mis. 0.4) lalu cek ulang `cek.jpg`.
- Frame awal tanpa orang (kursi kosong, b-roll) menghasilkan matte kosong dan frame tanpa wajah; itu benar, bukan kegagalan.
- MediaPipe membaca satu wajah (`num_faces=1`). Podcast dua orang: potong per orang, atau ubah `num_faces` di salinan skrip proyek.
