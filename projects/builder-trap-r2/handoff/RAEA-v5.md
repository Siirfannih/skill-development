# RAEA parity smoke · Builder trap r2 v5

Tanggal: 16 November 2026

## Tujuan

Menguji port tipis source Remotion yang sama pada tiga still dan rentang 300 frame, lalu hanya mengizinkan render RAEA penuh bila visual SSIM, frame count, timing audio, dan SNR memenuhi gate di `raea-smoke/README.md`.

## Percobaan

1. **RAEA 0.1.0-canary.2 yang sudah terpasang di PC**
   - Adapter source dan paket pinned berhasil disiapkan tanpa mengubah instalasi sistem.
   - Render still berhenti sebelum frame pertama: `raea is not defined` dari paket kompatibilitas yang mengimpor SDK RAEA.
2. **RAEA 0.1.4 portable, checksum release resmi lulus**
   - Binary Linux diunduh hanya ke direktori kerja terisolasi dan checksum `sha256sum -c` lulus.
   - v0.1.4 dipilih karena catatan release resminya menyebut perbaikan untuk paket `node_modules` yang mengimpor `raea`, tepat pada kegagalan canary: <https://github.com/shinyobjectz/raea/releases/tag/v0.1.4>.
   - Render still `Main` frame 1109 dengan `--lite` berhenti sebelum frame pertama: tidak ada GPU adapter yang dapat dipakai; Vulkan/GL driver tidak tersedia pada host headless. Bevy kemudian panic `Unable to find a GPU`.
3. **Mac tidak dipakai sebagai fallback berat**
   - Ruang kosong saat gate diperiksa 7,9 GiB, di bawah batas 10 GiB untuk memulai render/build media baru.

## Putusan

- Tidak ada frame RAEA yang berhasil diproduksi, sehingga SSIM, parity 300 frame, lag audio, dan SNR tidak boleh diklaim.
- Render RAEA penuh **diblokir oleh lingkungan executor**, bukan oleh source Builder trap r2.
- Remotion tetap menjadi renderer final v5 yang tervalidasi.
- Uji berikutnya memerlukan runner Linux dengan Vulkan/GL yang terlihat oleh Bevy, atau Mac setelah ruang kosong di atas 10 GiB. Jalankan kembali gate yang sama; jangan melemahkan ambang audio hanya karena AAC.

PUTUSAN: RAEA BLOCKED · REMOTION FINAL
