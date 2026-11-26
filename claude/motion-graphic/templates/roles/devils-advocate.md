# Creative Devil's Advocate · mata luar sebelum render final

Pembuat video selalu cenderung meloloskan karyanya sendiri. Peran ini memberi satu mata segar yang mencari apa yang **dipaksakan, berlebihan, atau tidak sesuai brief**, lalu mengusulkan perbaikan. Ia tidak memberi LULUS/GAGAL dan tidak mengecek hal mekanik; frame kosong, kedip, patahan, teks bertumpuk atau terpotong, dan sinkron sudah dicek skrip (`scripts/juri/frame_audit.py` tanda otomatis, `teks_cek.py`, `lego/kt_check.py`).

**Kapan:** sekali, setelah audit visual semua frame lulus dan sebelum render final (Lantai F26); boleh juga pada draft bila Sutradara ragu. Tidak tiap ronde revisi.
**Siapa:** satu model yang bisa melihat gambar dan tidak ikut membangun video ini (subagen baru, `claude -p`, atau model lain). Bukan sesi Sutradara, bukan Editor. **Tanpa model lain:** kamu sendiri, satu putaran kritik hanya dari brief steril di bawah, **sebelum** membaca catatan desainmu; tulis di `qc/da/USUL.md` dan putus tiap usul di `qc/JURI.md`.

## Brief steril (ditulis Sutradara ke `qc/da/BRIEF.md`)

Isi hanya:
1. Brief Irfan **verbatim** (kata-katanya, bukan ringkasan Sutradara) dan baris `Irfan` di `DECISIONS.md` yang aktif.
2. Path frame tahan tiap detik (`qc/frame_audit/*/tahan/`) atau lembar video final kandidat.
3. Frame kunci kartu kiblat dan kartu pinjaman (`guide/referensi/sheets/keyframes/<no>-k*.jpg`) = yang bagus.
4. `cookbook/contoh-gagal/` (README + gambar) = yang jelek.

Dilarang masuk brief: catatan bahwa sesuatu "disengaja"/"sengaja"/"intentional", alasan desain Sutradara, `REPORT-*`, baris `usul`, verdict sebelumnya. Catatan seperti itu membuat pemeriksa melewatkan persis elemen yang bermasalah. Cek sebelum mengirim:

```bash
grep -inE "sengaja|intentional|by design" qc/da/BRIEF.md   # harus kosong, kecuali kalimat itu kutipan kata Irfan
```

## Pertanyaan yang dijawab, per adegan

1. Elemen mana yang terasa **dipaksakan atau tempelan** (warna, huruf, tulisan tangan, panah, efek yang tidak sekeluarga dengan frame kunci kiblat)?
2. Apa yang bisa **dihapus** tanpa kehilangan makna ucapan?
3. Di mana mata **bingung harus ke mana**, atau frame berat sebelah?
4. Apa yang **tidak sesuai brief Irfan** atau jauh dari frame kunci kiblat?
5. Apa yang **mirip entri `contoh-gagal/`**?

## Keluaran `qc/da/USUL.md`

Satu baris per temuan: `dtk | frame | yang terlihat | kenapa (brief / kartu+frame kunci / contoh-gagal no.) | usul: hapus / geser / ganti + kartu yang prinsipnya terlihat`. Tanpa skor, tanpa putusan.

## Yang dilakukan Sutradara

Tiap baris diputus dan dicatat di `qc/JURI.md`: **terima** atau **tolak + alasan**. Yang diterima pada bagian yang belum pernah dilihat Irfan langsung jadi TASK Editor. Yang diterima pada bagian yang sudah dilihat Irfan menjadi baris `usul` di `DECISIONS.md` dan ditawarkan ke Irfan di chat dengan still sebelum/sesudah (`references/revision-log.md` §21.1). Elemen yang Irfan minta secara bersyarat ("kalau bisa", "jangan dipaksa") dan ditandai dipaksakan di sini: bawaannya dihapus.
