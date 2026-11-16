# Koreksi reveal dan diagnosis capture1083

Tiga PNG native1920×1080 dari bundle tanpa perubahan telah dibuka:1082,1083,1084 semuanya menampilkan tulisan biru dengan reveal yang maju. Frame1083 baru SHA8615c60df90efab60a34e993dfecbb101dc5ad1189d024c577f9f6496685f4bb. Ini hanya capture diagnostik; tidak dipasang ke final/chunk.

Koreksi terhadap angka di chatgpt-review dan pesan awal: saya keliru menghitung smoothstep. Kode sebenarnya memakai Easing.bezier(.45,0,.55,1) pada theme.ts:48. ActualDOM mengukur clipright37,2214%→25,6073%→15,9683%, sehingga reveal1082/1083/1084 adalah62,7786%→74,3927%→84,0317%. InitialFrame masing-masing1082/1083/1084, DPR1, renderReadytrue, fontloaded dan16instans H semuanya terkonfirmasi. Kesimpulan bahwa source tidak memerintahkan reset tetap berlaku. Laporan lama tidak ditimpa; diagnosis.json mengikat SHA dan menyebut tepat angka yang dikoreksi.

Capture memakai installed renderStill API, browser sama/fresh perframe, scale1/PNG, core2/nice10, TMPDIR/profil sendiri dan globalheavylock nonblocking. Provenance memuat command, browser/bundle/source/readiness/SHIP/tool/final/comparator hashes. Keenam input beku identik sebelum/sesudah. File final9b10 dan FAIL302 lama tetap utuh.

Keberhasilan capture baru menunjukkan hilangnya tulisan tidak diwajibkan oleh state source1083. Mekanisme transient exporter/compositor/codec lama belum diisolasi. Lead perlu memilih repair transparan dan memverifikasi output video baru, jumlahframe, tetangga/seam/audio dan hash; PNG yang benar bukan bukti eksporH264 sudah diperbaiki.
