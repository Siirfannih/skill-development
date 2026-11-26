# Laporan uji UIActionScript

Spec: `63-T5` (permukaan_ui). Lulus = nol dosa (skrip + vision + jangkar) DAN metrik keras dalam ambang (`uji.py` AMBANG).

## Putaran 1: LULUS

Dosa terpicu: tidak ada

| Metrik | Nilai |
|---|---|
| banding F1 terpicu / F3 jarang (dari 4 still) | 0 / 0 |
| fokus kecil-tengah, sampel berturut maks | 0 dari 60 |
| probe: teks kecil / tabrakan / terpotong | 0 / 0 / 1 (frame [8, 34, 64, 88]) |
| warna luar palet | tidak ada |
| struktur vs referensi (terbaik; rata-rata per ref; n ref) | 0.2412 (ssim 0.2965, edge 0.186; frame 88 vs `guide/referensi/sheets/keyframes/63-k4-kartu-ui-gelap.jpg`); 0.137; 8 |
| gerak (permukaan_ui) | frame berubah 0.437 |
| dua token (edge / ssim / selisih piksel) | 0.9963 / 0.8943 / 47.14 |

5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):
1. Baris 4 (sapuan grid): sel-selnya hampir opak dan menutup seluruh kotak prompt, sehingga 'tambah sfx dan musik' dan 'Model A Sedang' nyaris tak terbaca. Tepinya kotak keras dan seragam, jadi tampak seperti overlay tempelan, bukan sapuan. Ubah jadi sapuan bertahap: sel depan opak, sel belakang tembus pandang, dengan jeda antar sel dan tanpa menutup teks yang sedang dibaca.
2. Baris 1 dan 2 (isi jendela): empat thumbnail identik (gambar matahari yang sama diulang 4x), slider tanpa label, dan klip timeline tanpa nama atau waveform. Isinya terbaca sebagai wireframe berwarna. Kiri punya teks, tombol, dan hirarki nyata. Beri tiap thumbnail frame berbeda, label slider, nama klip, dan waveform di track audio.
3. Baris 1 dan 2 (pemisahan jendela dari wallpaper): bagian atas wallpaper ungu-maroon gelap, sehingga luma jendela hampir sama dengan latar di sekitar bar judul. Jendela tidak terbaca mengambang karena tidak ada bayangan lembut di bawah tepinya. Naikkan kecerahan dan saturasi wallpaper di sisi atas, dan tambahkan bayangan jatuh yang terlihat.
4. Baris 1 dan 2 (titik-titik oranye di bukit dan dock): butiran tersebar acak di bawah, tanpa fungsi dan tanpa arah gerak. Terbaca sebagai confetti atau noise pengisi. Dock berisi kotak kecil berwarna dengan glyph generik, sama bentuknya dan tanpa label. Buang titik-titik itu, atau buat jadi sumber cahaya yang jelas (misalnya ember). Beri ikon dock bentuk dan identitas masing-masing.
5. Baris 3 (hold setelah punch): kotak prompt berupa panel abu-gelap datar dengan border tipis, tanpa kesan kaca (tidak ada blur latar, tidak ada refleksi tepi) dan tanpa bayangan. Label 'Sedang' abu dim di atas abu gelap, kontrasnya lemah. Dock hanya tersisa seiris di tepi bawah, jadi konteks desktop berkurang. Beri kaca semi-transparan dengan blur ringan, naikkan kontras label, dan jaga dock lebih terlihat.

Lembar side-by-side (referensi kiri | kandidat kanan): `pabrik/kandidat/UIActionScript/lembar-r1.jpg`
