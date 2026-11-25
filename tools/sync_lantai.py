#!/usr/bin/env python3
"""Cek tabel ringkas Lantai di claude/motion-graphic/SKILL.md (di antara penanda LANTAI) terhadap LANTAI.md.
Sumber kebenaran: LANTAI.md (dibaca utuh saat juri, revisi, dan sebelum render). SKILL.md hanya memuat tabel ringkas,
jadi skrip ini tidak menyalin: ia memastikan tiap ID butir LANTAI.md (A1, B13a, F28c, …) muncul di tabel, dan tabel
tidak menyebut ID yang sudah tidak ada. Jalankan setelah menambah, menghapus, atau mengganti nomor butir LANTAI.md.

  python3 tools/sync_lantai.py          tampilkan ID yang kurang/berlebih; keluar 1 bila ada
  python3 tools/sync_lantai.py --check  sama, satu baris ringkas (dipanggil doctor.sh)
"""
import os, re, sys
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "claude", "motion-graphic")
A, B = "<!-- LANTAI:mulai", "<!-- LANTAI:selesai -->"
ID = re.compile(r"(?<![A-Za-z0-9])([A-F]\d{1,2}[a-z]?)(?![A-Za-z0-9])")


def id_lantai(teks):
    """ID butir LANTAI.md: huruf bagian (## A. …) + nomor butir (1., 9a., …)."""
    ids, huruf = [], None
    for b in teks.splitlines():
        m = re.match(r"^## ([A-F])\.", b)
        if m: huruf = m.group(1); continue
        m = re.match(r"^(\d{1,2}[a-z]?)\. ", b)
        if m and huruf: ids.append(huruf + m.group(1))
    return ids


def main():
    lantai = open(os.path.join(R, "LANTAI.md"), encoding="utf-8").read()
    s = open(os.path.join(R, "SKILL.md"), encoding="utf-8").read()
    if A not in s or B not in s:
        print("GAGAL: penanda LANTAI tidak ada di SKILL.md"); sys.exit(1)
    blok = s[s.index(A):s.index(B)]
    ids = id_lantai(lantai); ada = set(ID.findall(blok))
    kurang = [i for i in ids if i not in ada]; lebih = sorted(ada - set(ids))
    if "--check" in sys.argv:
        ok = not kurang and not lebih and ids
        print(f"tabel Lantai di SKILL.md memuat {len(ids)} ID LANTAI.md" if ok else
              f"BEDA: ID kurang {kurang or '-'}, ID tidak ada di LANTAI.md {lebih or '-'}")
        sys.exit(0 if ok else 1)
    print(f"{len(ids)} ID di LANTAI.md; kurang di tabel SKILL.md: {', '.join(kurang) or '-'}; tidak ada di LANTAI.md: {', '.join(lebih) or '-'}")
    sys.exit(1 if kurang or lebih or not ids else 0)


if __name__ == "__main__":
    main()
