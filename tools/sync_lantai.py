#!/usr/bin/env python3
"""Cek MIGRASI-LANTAI.md terhadap LANTAI.md.

LANTAI.md kini arsip referensi (pintu aktif: claude/motion-graphic/SKILL.md). Setiap butir LANTAI tetap harus punya rumah baru:
claude/motion-graphic/MIGRASI-LANTAI.md memetakan ID -> file tujuan -> penegak. Skrip ini memastikan (1) tiap ID LANTAI.md ada di tabel,
(2) tabel tidak menyebut ID yang tidak ada di LANTAI.md, (3) file tujuan pertama tiap baris benar-benar ada. Jalankan setelah menambah,
menghapus, atau mengganti nomor butir LANTAI.md, atau memindah file tujuan.

  python3 tools/sync_lantai.py          tampilkan beda; keluar 1 bila ada
  python3 tools/sync_lantai.py --check  sama, satu baris ringkas (dipanggil doctor.sh)
"""
import os, re, sys
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "claude", "motion-graphic")


def id_lantai(teks):
    """ID butir LANTAI.md: huruf bagian (## A. …) + nomor butir (1., 9a., …)."""
    ids, huruf = [], None
    for b in teks.splitlines():
        m = re.match(r"^## ([A-F])\.", b)
        if m: huruf = m.group(1); continue
        m = re.match(r"^(\d{1,2}[a-z]?)\. ", b)
        if m and huruf: ids.append(huruf + m.group(1))
    return ids


def baris_migrasi(teks):
    """{ID: kolom 'Rumah baru'} dari tabel MIGRASI-LANTAI.md."""
    out = {}
    for b in teks.splitlines():
        m = re.match(r"^\| ([A-F]\d{1,2}[a-z]?) \| (.*?) \| (.*) \|$", b)
        if m: out[m.group(1)] = m.group(2)
    return out


def tujuan_pertama(rumah):
    m = re.search(r"`([^`]+)`", rumah)
    return re.split(r"\s", m.group(1))[0] if m else None


def periksa():
    ids = id_lantai(open(os.path.join(R, "LANTAI.md"), encoding="utf-8").read())
    peta = baris_migrasi(open(os.path.join(R, "MIGRASI-LANTAI.md"), encoding="utf-8").read())
    kurang = [i for i in ids if i not in peta]; lebih = sorted(set(peta) - set(ids))
    hilang = []
    for i, rumah in peta.items():
        t = tujuan_pertama(rumah)
        if not t or not os.path.exists(os.path.normpath(os.path.join(R, t))): hilang.append(f"{i}->{t}")
    return ids, kurang, lebih, hilang


def main():
    ids, kurang, lebih, hilang = periksa()
    ok = ids and not kurang and not lebih and not hilang
    if "--check" in sys.argv:
        print(f"MIGRASI-LANTAI.md memetakan {len(ids)} ID LANTAI.md ke file yang ada" if ok else
              f"BEDA: ID tanpa rumah {kurang or '-'}, ID tidak ada di LANTAI.md {lebih or '-'}, tujuan hilang {hilang or '-'}")
        sys.exit(0 if ok else 1)
    print(f"{len(ids)} ID di LANTAI.md; tanpa rumah: {', '.join(kurang) or '-'}; tidak ada di LANTAI.md: {', '.join(lebih) or '-'}; tujuan hilang: {', '.join(hilang) or '-'}")
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
