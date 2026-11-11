#!/usr/bin/env python3
"""Salin isi claude/motion-graphic/LANTAI.md ke dalam SKILL.md (di antara penanda LANTAI), supaya lantai ikut termuat
setiap kali skill dimuat. Sumber kebenaran: LANTAI.md. Jalankan setelah mengubah LANTAI.md.

  python3 tools/sync_lantai.py          tulis ulang blok di SKILL.md
  python3 tools/sync_lantai.py --check  keluar 1 bila SKILL.md tidak sama dengan LANTAI.md
"""
import os, re, sys
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "claude", "motion-graphic")
A, B = "<!-- LANTAI:mulai (disalin dari LANTAI.md oleh tools/sync_lantai.py; jangan diedit di sini) -->", "<!-- LANTAI:selesai -->"
lantai = open(os.path.join(R, "LANTAI.md"), encoding="utf-8").read().strip()
body = re.sub(r"^# .*\n", "", lantai, count=1).strip()
body = re.sub(r"^## ", "### ", body, flags=re.M)
p = os.path.join(R, "SKILL.md"); s = open(p, encoding="utf-8").read()
i, j = s.index(A), s.index(B)
new = s[:i] + A + "\n" + body + "\n" + s[j:]
if "--check" in sys.argv:
    print("lantai di SKILL.md sama dengan LANTAI.md" if new == s else "BEDA: jalankan python3 tools/sync_lantai.py"); sys.exit(0 if new == s else 1)
open(p, "w", encoding="utf-8").write(new); print("SKILL.md diperbarui dari LANTAI.md")
