#!/usr/bin/env python3
"""Cek RESEP.md sebelum build: 8 bagian terisi, tiga pengikat dari SATU sumber, kartu kiblat ada.

Pakai:  python3 resep_check.py projects/<proyek>/RESEP.md
Keluar 0 = LULUS, 1 = GAGAL (alasan dicetak).
"""
import os, re, sys

BAGIAN = ["warna & tekstur", "teks", "ritme", "b-roll / footage", "motion graphic", "kamera & transisi", "sfx", "musik"]
PENGIKAT = BAGIAN[:3]

def main():
    if len(sys.argv) != 2 or sys.argv[1] in ("-h", "--help"):
        print(__doc__); sys.exit(0 if len(sys.argv) == 2 else 1)
    p = sys.argv[1]
    if not os.path.exists(p):
        print(f"GAGAL: {p} tidak ada. Salin pustaka/RESEP-TEMPLATE.md dan isi."); sys.exit(1)
    s = open(p, encoding="utf-8").read(); salah = []
    rows = {}
    for line in s.splitlines():
        c = [x.strip() for x in line.strip().strip("|").split("|")]
        if len(c) >= 3 and c[0].lower() in BAGIAN:
            rows[c[0].lower()] = (c[2] if len(c) > 2 else "", c[3] if len(c) > 3 else "")
    for b in BAGIAN:
        if b not in rows: salah.append(f"baris '{b}' tidak ada di tabel")
        elif not rows[b][0] or "<" in rows[b][0]: salah.append(f"sumber '{b}' belum diisi")
    src = {rows[b][0].lower() for b in PENGIKAT if b in rows and rows[b][0] and "<" not in rows[b][0]}
    if len(src) > 1:
        salah.append("pengikat (warna & tekstur, teks, ritme) berasal dari lebih dari satu sumber: " + ", ".join(sorted(src)))
    kiblat = src.pop() if len(src) == 1 else None
    for b in BAGIAN[3:]:
        if b in rows and kiblat and rows[b][0].lower() != kiblat and "<" not in rows[b][0] and len(rows[b][1]) < 10:
            salah.append(f"'{b}' dipinjam dari '{rows[b][0]}' tanpa catatan alasan dan penyesuaian ke pengikat kiblat")
    m = re.search(r"\*\*Kartu:\*\*\s*`([^`]+)`", s)
    if not m or "<" in m.group(1): salah.append("path kartu kiblat belum diisi")
    else:
        kp = m.group(1); cand = [kp, os.path.join(os.path.dirname(p), kp), os.path.join(os.path.dirname(__file__), "..", "..", kp),
                                 os.path.join(os.path.dirname(__file__), "..", "..", "pustaka", kp)]
        if not any(os.path.exists(c) for c in cand): salah.append(f"kartu kiblat tidak ditemukan: {kp}")
    for label in ("Prompt Irfan", "Alasan memilih", "Penyesuaian karena LANTAI", "Kamera diam?"):
        mm = re.search(r"\*\*" + re.escape(label) + r"[^*]*\*\*\s*(.*)", s)
        nxt = ""
        if mm:
            nxt = mm.group(1).strip() or (s[mm.end():].strip().splitlines() or [""])[0].lstrip("> ").strip()
        if not mm or not nxt or nxt.startswith("<"): salah.append(f"'{label}' belum diisi")
    if salah:
        print("GAGAL resep:"); [print("  -", x) for x in salah]; sys.exit(1)
    print(f"LULUS resep: kiblat = {kiblat}; pinjaman teknik: " +
          (", ".join(f"{b} ← {rows[b][0]}" for b in BAGIAN[3:] if rows[b][0].lower() != kiblat) or "tidak ada"))

if __name__ == "__main__":
    main()
