# Penerimaan audio lead · Builder Trap R2 v6

**Status: penilaian audio bersyarat; bukan PASS seluruh delivery gate.** Mix dan VO yang diperiksa masing-masing SHA-256 `a36a2819723fb7f76dc2d8bef2b24e6ac98ec78a6555ed440d0a5aabe4452e02` dan `d56ab12f772c35f7c7c037243974d95c84eb6b60c786523d03dfb1a574e8983f`. Review model terhadap seluruh 83,1 detik melaporkan suara jelas dan tidak menemukan pumping, ekor terpotong, atau kekasaran. Modul 5 tetap **GAGAL** pada sepuluh pemeriksaan angka di bawah. Review konteks dan keputusan R-033 bukan pengganti status mesin dan bukan persetujuan otomatis untuk seluruh deviasi.

## Bukti dengar dan batasnya

Delapan job model `gemini-3.8-flash-low` memeriksa empat rentang bertumpang tindih: 0–21, 20–41, 40–61, dan 60–83,1 detik. Empat job menerima mix penuh dan simulasi mono speaker HP 50%; empat lainnya menerima VO+SFX tanpa musik dan simulasi HP 20%. Seluruh 16 input memiliki hash yang cocok dengan manifest, bukti pembacaan mencatat hanya media yang dimaksud, dan semua delapan job yang digunakan exit 0. Input versi penuh cocok sampel demi sampel dengan potongan mix; input tanpa musik cocok VO+stem SFX. Hasil, bukti pembacaan, stream, prompt, manifest dan hash salinan ada di `native-evidence/`.

Percobaan pertama `nomusic-phone20-2` timeout dan **tidak dipakai**; retry yang exit 0 digunakan. Ketujuh output rinci melaporkan per-file suara jelas, tanpa pumping, tail cut, kekasaran atau defect; retry melaporkan verdict gabungan yang sama tanpa rincian per file. Pada rentang tanpa musik 40–61 detik, model menyebut SFX *low*; pada penutup simulasi 20% disebut *subtle*. Batas potongan dapat memotong frasa, tetapi rentangnya bertumpang tindih; ini bukan bukti fonem terakhir rusak.

Ini review audio oleh model pada file dan filter simulasi, **bukan uji speaker HP fisik** atau audit semua frame video. Verdict konteks tidak membuktikan setiap cue kecil terdengar secara mandiri. Input simulated phone 50% dan 20% menggunakan pembatasan pita dan atenuasi; hasil dapat berbeda pada perangkat, volume, dan lingkungan nyata.

## Pembacaan mesin dan adjudikasi

`audio-qa-module5.json` dan lognya tetap menyatakan **GAGAL**; exit 0 perintah berarti analisis berjalan, bukan gate lulus. Daftar semua temuan mentah:

| Temuan Modul 5 | Hasil / target | Adjudikasi |
|---|---|---|
| Loudness mix | −18,6 LUFS / −14,0…−14,5 | **FAIL angka.** R-033 menerima VO lebih pelan untuk menjaga dinamika alami. Level mix yang lebih rendah berkaitan dengan keputusan tersebut, tetapi target master tidak berubah menjadi PASS. |
| Spektrum sub 20–150 Hz | 6,4% / 25–55% | **FAIL angka.** Rasio mix dipengaruhi isi. Fidelity VO lolos dan review konteks tidak menemukan defect, tetapi keduanya tidak membuktikan target spektrum terpenuhi. Tidak ada EQ tambahan. |
| Spektrum low-mid 150–500 Hz | 59,6% / <42% | **FAIL angka.** Bukti dan batasnya sama: bukan PASS numerik; tidak ada EQ tambahan. |
| VO act 1 | −18,3 LUFS / −14 ±1 | **FAIL angka.** R-033 secara eksplisit menerima deviasi loudness VO tanpa kompresi/limiter. |
| VO act 2 | −18,6 LUFS / −14 ±1 | **FAIL angka.** R-033 seperti di atas. |
| VO act 3 | −19,4 LUFS / −14 ±1 | **FAIL angka.** R-033 seperti di atas. |
| VO act 4 | −18,3 LUFS / −14 ±1 | **FAIL angka.** R-033 seperti di atas. |
| Musik di bawah VO | −35,2 LUFS / −22…−25 | **FAIL angka.** Level musik mengikuti VO dan perbaikan masking; R-033 tidak secara eksplisit mengecualikan target musik. Review mix/phone-model menyebut bed seimbang, tetapi nilai mesin tetap gagal. |
| SFX kelas shutter | median peak −14,0 dBFS, 8 cue / −21…−16 | **FAIL angka.** Modul 5 mengukur maksimum stem SFX gabungan dalam jendela 250 ms, yang bisa memuat cue lain. Itu tidak langsung identik dengan gain per cue E24. Review konteks tidak menandai harshness; temuan tetap gagal. |
| SFX kelas text_pop | median peak −12,0 dBFS, 1 cue / −20…−16 | **FAIL angka.** Metode jendela gabungan dan batas interpretasi sama; tidak menjadi PASS hanya karena konteks dinilai nyaman. |

Fidelity VO dibanding `edit/v6/suara.wav` **PASS**: rasio energi di atas 9 kHz 0,97 (batas ≥0,70) dan perubahan LRA −0,4 LU (batas ≥−2). Ini mendukung kejernihan/fidelity VO, bukan bukti bahwa spektrum mix memenuhi target genre. R-033 menerima deviasi loudness VO; keputusan itu tidak boleh diperluas menjadi waiver otomatis untuk musik, spektrum atau SFX.

`audio_phone.py` menghitung median selisih pita bicara 19,3 dB, terburuk 6,3 dB, dan **5 jendela <8 dB**: tepat memenuhi ambang maksimum 5. Prediktor menilai 46/63 cue terdengar pada 50% dan 38/63 pada 20%; **17 cue gagal pada prediktor 50% tetap tercatat**, bukan PASS. Seluruh cue kamera, impact dan gerak kartu lulus prediktor 50%; jumlah harshness mesin 0. Model native mendengar konteks penuh dengan penilaian umumnya jelas, namun tidak menguji 17 cue tersebut satu per satu. Hasil dan daftar cue tersedia di `qc/v6-audit/sfx-phone-v6.log`.

Empat duck bed sesaat mencapai −3,34 / −7,35 / −6,08 / −2,65 dB; masing-masing sekitar 68 ms. Perubahan RMS musik pada jendela 400 ms adalah −0,457 / −0,466 / −0,441 / −0,292 dB. Native context tidak melaporkan pumping, tetapi nilai gain sesaat tetap dicatat. AAC uji 4× soxr: 192/256/320 kbps masing-masing −1,09737 / −1,07186 / −1,07576 dBTP; ini pengujian audio encode, bukan true peak MP4 final setelah mux.

## Diagnostik tambahan yang tidak disembunyikan

Modul 5 menghitung **108 penurunan RMS mendadak** sebagai diagnostik; tool menyimpan hanya 40 timestamp pertama. Native chunk tidak melaporkan tail cut atau defect, tetapi setiap penurunan belum diatribusikan satu per satu. Tool juga menandai empat jendela mono 100 ms di bawah −45 dBFS pada 41,2 / 56,3 / 57,8 / 57,9 detik. Musik masih ada dalam keempatnya; RMS mono musik masing-masing sekitar −46,49 / −46,50 / −51,36 / −55,34 dBFS. Ini jendela sangat pelan yang perlu dibedakan dari nol digital; review model tidak melaporkan dropout, tetapi keterdengaran di HP fisik belum diuji.

**Temuan E24 terpisah:** 62 dari 63 nilai `gain_dbfs` cue yang dinormalisasi berada di bawah −10 dB (rentang −22…−12 dB); hanya impact −9 dB berada dalam rentang nominal E24 −4…−10 dB. Ini bukan dua temuan kelas Modul 5 di atas, yang memakai puncak stem gabungan selama 250 ms. R-033 tidak secara eksplisit mengecualikan gain SFX; review native konteks positif tidak mengubah angka. Kepatuhan gain E24 **belum PASS dan perlu keputusan lead**.

Cek event pada `sfx-v6-measurements.json`: 63 cue, onset minimum 117,06 ms, maksimum 5 onset dalam 2 detik, jarak onset kamera minimum 2,014 detik, error peak maksimum 0,933 frame, dan 0 miss terhadap 101 objek yang terdaftar (7 senyap beralasan). Ini cakupan **terhadap inventory**, bukan bukti independen bahwa tidak ada objek yang terlewat. `sfx_density` lulus pada video v5 sebagai proxy; gate yang sama pada render v6 menjadi tugas finishing. Canonical `audio/ORDER.json` mempertahankan exception/fail dan tidak diubah.

Data terstruktur, adjudikasi masing-masing temuan, binding hash input dan perbandingan potongan berada di `acceptance.json`. Audio yang dipin, source, provenance dan manifest yang sudah dibekukan tidak diubah dalam laporan ini.
