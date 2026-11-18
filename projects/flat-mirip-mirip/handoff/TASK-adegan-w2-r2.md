TUJUAN
Perbaiki P06 bagian "latar krem warna-warni, siluet orang, dan AI Slop" supaya memakai gambar slop asli (tidak terlihat placeholder) dan sekeluarga dengan bagian awal P06. P04, P05, dan P06 sampai "satu sama lain," sudah LULUS dan tidak diubah.

KONTEKS
Baca BRIEF-ADEGAN.md (kontrak + catatan doctor/PETA di atasnya) dan REPORT-adegan-w2-r1.md. Penilaian Sutradara atas still r1:
TEMUAN
- W2-1 "latar krem" (P06-f169) = persegi krem polos, "warna-warni" (P06-f189) = persegi peach polos → terbaca placeholder (Lantai D22). Ganti: 4 gambar slop asli (`media/aset-slop/k1-01, k1-04, k2-01, k3-01` dsb.) di-crop ke area LATARNYA saja (langit/gradien tanpa subjek, mis. 40 % atas gambar) sebagai kartu bertepi berderet; pada "latar krem" yang tampil krem (k1/k2), pada "warna-warni" deret bergeser cepat ke yang warna-warni (k3-01, k3-02) — perubahan warna terbaca sebagai gerak, bukan fade.
- W2-2 "siluet orang" (P06-f212) = siluet SVG polos. Ganti: 3–4 crop rapat siluet dari gambar slop asli (k1-01 kepala-bahu, k2-01, k1-05 orang+laptop, k1-02) berderet masuk dengan react(i): pengulangan siluet yang sama jadi buktinya.
- W2-3 "dan AI Slop." (P06-f236) = KartuSlop SVG, beda keluarga dengan gambar generate. Ganti: kolase cepat semua 16 gambar slop (masuk beruntun react, sedikit miring, bertumpuk rapat memenuhi sisi kanan/latar) + "AI Slop" KataTekan merah di kanvas putih (latar putih; kolase tidak menutup teks).
- W2-4 Hapus pemakaian KartuSlop SVG di P06 (keluarga visual P06 = gambar generate saja).

FILE BOLEH
- projects/flat-mirip-mirip/remotion/src/adegan/P06.tsx, projects/flat-mirip-mirip/remotion/src/adegan/w2-*.ts(x) (hanya bagian yang dipakai P06)
- projects/flat-mirip-mirip/media/acuan/adegan/P06-r2-*.png
- projects/flat-mirip-mirip/handoff/REPORT-adegan-w2-r2.md

FILE JANGAN
P04.tsx, P05.tsx, file pekerja lain, komponen bersama, tema.ts, naskah.ts, Root/index.

LULUS BILA
BRIEF-ADEGAN §Lulus bila + still P06-r2 pada frame "latar krem", "warna-warni", "siluet orang", "dan AI Slop." + still P06 f013/f104/f145 identik piksel dengan r1 (bagian yang lulus tidak berubah).

LAPORAN
REPORT-adegan-w2-r2.md.
