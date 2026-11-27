#!/usr/bin/env python3
"""Baca RESEP.md sebelum build: 8 bagian terisi, tiga pengikat dari SATU sumber (kartu kiblat dari referensi user, atau REF-SPEC.md bila user tanpa referensi), kartu kiblat atau REF-SPEC.md ada.

Pakai:  python3 resep_check.py projects/<proyek>/RESEP.md [--ketat]
Isian yang kurang dicetak sebagai CATATAN dan keluar 0 (formulir bukan penilai mutu). Keluar 1 hanya bila RESEP.md tidak ada, atau
berkas yang dirujuk tidak ada (kartu kiblat, REF-SPEC.md). --ketat (atau KETAT=1): catatan juga keluar 1.
Label prompt boleh "Prompt Irfan" atau "Prompt pemilik".
"""
import os, re, sys

BAGIAN = ["warna & tekstur", "teks", "ritme", "b-roll / footage", "motion graphic", "kamera & transisi", "sfx", "musik"]
PENGIKAT = BAGIAN[:3]

def _resolve_nomor(ref):
    """RESEP lama menulis pustaka/kartu/NN-slug.md; cari kartunya lewat nomor di resolver cookbook (tools/cookbook.py)."""
    import importlib.util
    root = os.path.realpath(os.path.join(os.path.dirname(os.path.realpath(__file__)), "..", "..", "..", ".."))
    f = os.path.join(root, "tools", "cookbook.py")
    if not os.path.exists(f): return None
    spec = importlib.util.spec_from_file_location("cookbook_tools", f); mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod.resolve(ref)

def main():
    ketat = "--ketat" in sys.argv or os.environ.get("KETAT") == "1"
    argv = [x for x in sys.argv if x != "--ketat"]
    if len(argv) != 2 or argv[1] in ("-h", "--help"):
        print(__doc__); sys.exit(0 if len(argv) == 2 else 1)
    p = argv[1]
    if not os.path.exists(p):
        print(f"GAGAL: {p} tidak ada. Salin cookbook/RESEP-TEMPLATE.md dan isi."); sys.exit(1)
    s = open(p, encoding="utf-8").read(); salah = []; fakta = []  # salah = catatan isian; fakta = berkas rujukan tidak ada
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
    dari_ref_spec = bool(kiblat) and kiblat.startswith(("ref-spec", "profil merek"))
    if not m or "<" in m.group(1): salah.append("path kartu kiblat belum diisi")
    elif dari_ref_spec and m.group(1).strip().lower() == "tidak ada":
        # Tanpa referensi dari user, pengikat datang dari profil merek + tema lewat REF-SPEC.md, bukan dari satu kartu utuh.
        if not os.path.isfile(os.path.join(os.path.dirname(os.path.abspath(p)), "REF-SPEC.md")):
            fakta.append("pengikat dari REF-SPEC tetapi REF-SPEC.md tidak ada di folder proyek")
    else:
        kp = m.group(1); cand = [kp, os.path.join(os.path.dirname(p), kp), os.path.join(os.path.dirname(__file__), "..", "..", kp),
                                 os.path.join(os.path.dirname(__file__), "..", "..", "cookbook", kp)]
        if not any(os.path.exists(c) for c in cand) and not _resolve_nomor(kp): (salah if kp.strip().lower() == "tidak ada" else fakta).append(f"kartu kiblat tidak ditemukan: {kp}")  # "tidak ada" = isian, path nyata yang hilang = fakta
    for labels in (("Prompt Irfan", "Prompt pemilik"), ("Alasan memilih",), ("Kamera diam?",)):
        ok = False
        for label in labels:
            mm = re.search(r"\*\*" + re.escape(label) + r"[^*]*\*\*\s*(.*)", s)
            if not mm: continue
            nxt = mm.group(1).strip() or (s[mm.end():].strip().splitlines() or [""])[0].lstrip("> ").strip()
            if nxt and not nxt.startswith("<"): ok = True
        if not ok: salah.append(f"'{labels[0]}' belum diisi")
    if salah or fakta:
        print("CATATAN resep:"); [print("  -", x) for x in fakta + salah]
        if fakta or ketat: sys.exit(1)
        sys.exit(0)
    print(f"resep terbaca, tanpa catatan: kiblat = {kiblat}; pinjaman teknik: " +
          (", ".join(f"{b} ← {rows[b][0]}" for b in BAGIAN[3:] if rows[b][0].lower() != kiblat) or "tidak ada"))

if __name__ == "__main__":
    main()
