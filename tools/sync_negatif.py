#!/usr/bin/env python3
"""Jaga daftar NEGATIF tetap sama di semua tempat.

Kanonik: claude/_bersama/NEGATIF.md (di antara <!-- NEGATIF:mulai --> dan <!-- NEGATIF:selesai -->). claude/motion-graphic/SKILL.md memuat
salinan yang sama persis (model membaca SKILL.md, bukan file bersama). claude/vibedesign/SKILL.md memuat penunjuk ke file bersama.

  python3 tools/sync_negatif.py          tampilkan beda; keluar 1 bila ada
  python3 tools/sync_negatif.py --check  satu baris ringkas (dipanggil doctor.sh)
  python3 tools/sync_negatif.py --tulis  salin blok kanonik ke SKILL.md motion-graphic
"""
import os, re, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
KANON = os.path.join(ROOT, "claude/_bersama/NEGATIF.md")
SKILL = os.path.join(ROOT, "claude/motion-graphic/SKILL.md")
VIBE = os.path.join(ROOT, "claude/vibedesign/SKILL.md")
A, B = "<!-- NEGATIF:mulai -->", "<!-- NEGATIF:selesai -->"


def blok(teks):
    if A not in teks or B not in teks: return None
    return teks[teks.index(A):teks.index(B) + len(B)]


def main():
    k = blok(open(KANON, encoding="utf-8").read())
    s_teks = open(SKILL, encoding="utf-8").read()
    masalah = []
    if k is None: masalah.append("penanda NEGATIF tidak ada di _bersama/NEGATIF.md")
    elif len(re.findall(r"^\d+\. \*\*", k, flags=re.M)) != 10: masalah.append("daftar kanonik bukan 10 butir")
    if "--tulis" in sys.argv and k and blok(s_teks):
        s_teks = s_teks.replace(blok(s_teks), k); open(SKILL, "w", encoding="utf-8").write(s_teks)
    s = blok(s_teks)
    if s is None: masalah.append("penanda NEGATIF tidak ada di motion-graphic/SKILL.md")
    elif k and s != k: masalah.append("daftar di motion-graphic/SKILL.md beda dari _bersama/NEGATIF.md (jalankan --tulis)")
    if "_bersama/NEGATIF.md" not in open(VIBE, encoding="utf-8").read(): masalah.append("vibedesign/SKILL.md tidak menunjuk _bersama/NEGATIF.md")
    if "--check" in sys.argv:
        print("daftar NEGATIF sama di _bersama, motion-graphic/SKILL.md; vibedesign menunjuk" if not masalah else "BEDA: " + "; ".join(masalah))
    else:
        print("\n".join(masalah) or "NEGATIF sinkron")
    sys.exit(1 if masalah else 0)


if __name__ == "__main__":
    main()
