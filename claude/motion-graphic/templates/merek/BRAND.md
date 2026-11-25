---
# BRAND.md · nilai pasti merek. Bagian atas (YAML) dibaca mesin; jangan dikarang: nilai yang belum diketahui = "?".
merek: <nama merek>
slug: <slug-merek>
bahasa: [id]                  # bahasa teks di layar
warna:                        # hex 6 digit; peran, bukan sekadar daftar
  latar: "#FFFFFF"
  teks: "#0A0A0A"
  aksen: "#2E5BFF"            # satu aksen utama
  aksen_2: "?"                # opsional
  negatif: "?"                # warna tanda salah/peringatan, bila merek punya
huruf:
  judul:   {keluarga: "<nama>", bobot: 700, file: aset/font/<file>}
  isi:     {keluarga: "<nama>", bobot: 400, file: aset/font/<file>}
  huruf_kedua: {keluarga: "?", peran: "?", frekuensi: "?"}
                              # opsional. Satu keluarga utama; huruf kedua (gaya lain, mis. berkontras tinggi atau tulisan tangan) sah bila ia sistem: isi ketiganya.
                              # peran = satu tugas tetap sepanjang video (mis. "suara logo", "kata penutup"); frekuensi = mis. "<= 1 per frame, <= 3 per video".
                              # Keluarga terisi tanpa peran atau frekuensi ditolak profil_cek.py. Tidak dipakai = biarkan "?".
logo:
  terang: aset/logo/logo-terang.svg   # dipakai di latar terang
  gelap:  aset/logo/logo-gelap.svg    # dipakai di latar gelap · merek tanpa logo (dipastikan user): tulis "tidak ada" di keduanya
  ruang_kosong_min: "?"               # mis. "tinggi huruf J di sekeliling logo"
format_utama: ["9:16 1080x1920"]      # rasio yang paling sering dibuat
---

# <nama merek>

## Siapa dan untuk siapa
<2–3 kalimat: apa mereknya, penontonnya, kesan yang harus tertinggal setelah video selesai.>

## Warna di layar video
<Kapan tiap warna dipakai: latar mana yang dominan, aksen untuk apa (kata kunci, ikon, UI), kontras minimal di atas footage. Warna web sering terlalu pucat di video: tulis versi untuk layar bila beda.>

## Huruf di layar video
<Peran tiap bobot keluarga utama: kata hero, narasi/teks kinetik, label UI. Ukuran minimum terbaca di HP. Bila ada huruf kedua: tulis perannya dan kapan ia muncul (slot `huruf.huruf_kedua` di atas).>

## Logo
<Kapan logo muncul (pembuka/penutup/watermark), ukuran, posisi, versi terang/gelap. Yang dilarang: ditarik, diberi efek, warna diganti.>

## Suara merek
<Nada bicara di teks layar dan VO: santai/formal, kata yang dipakai/dihindari, sapaan.>

## Boleh dan jangan
- Boleh: <…>
- Jangan: <…>

## Aset lain
<Ikon, ilustrasi, maskot, foto produk, UI asli: di mana filenya dan kapan dipakai.>
