# Profil merek untuk desain statis

Nilai merek (warna, huruf, logo, nada) punya satu rumah: folder data user `merek/<slug>/BRAND.md`, sama dengan motion-graphic (struktur dan cara membuatnya: `../../../motion-graphic/templates/merek/README.md`). Vibedesign tidak menyalin nilai itu.

Yang khusus desain statis ditulis di `merek/<slug>/DESIGN.md` di folder yang sama, dari `DESIGN.md` di folder ini: layout, zona aman, komponen dunia, elevasi, bentuk wadah, dan contoh benar/salah. Token warna dan huruf di sana menunjuk ke `BRAND.md`, bukan diisi ulang. Contoh yang disetujui atau ditolak masuk `merek/<slug>/contoh/bagus|ditolak/` yang sama dengan video.

Proyek yang punya dunia visual sendiri boleh menimpa sebagian di `projects/<proyek>/DESIGN.md`; yang tidak ditimpa diambil dari profil merek.

Belum ada profil: buat draf dari logo dan aset yang ada, tandai `DRAF` di baris pertama, ajukan bersama sketsa pertama, dan lanjut bekerja. Jangan memakai palet tanpa sumber, jangan menunggu.
