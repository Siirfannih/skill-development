#!/usr/bin/env python3
"""Langkah berikutnya dari TAHAP.md proyek: apa yang dikerjakan dan file/bagian mana yang dibaca SEKARANG.

Tujuannya dua: bacaan awal kecil (tiap langkah membuka bagiannya sendiri saat dikerjakan) dan tidak ada langkah
yang terlewat (langkah dianggap selesai hanya bila dicentang DAN punya bukti setelah "→").

  python3 tahap.py projects/<proyek>            tampilkan tahap aktif dan langkah berikutnya
  python3 tahap.py projects/<proyek> cek <n>    cetak CATATAN untuk langkah tahap 1..n tanpa centang atau tanpa bukti (keluar 0)
  python3 tahap.py projects/<proyek> cek final  sama, untuk semua tahap sebelum "Deliver" (dipakai render.sh final);
                                                TAHAP format lama tanpa tahap Deliver: tahap 1–3
  tambah --ketat (atau KETAT=1): catatan itu keluar 1. TAHAP.md tidak ada tetap keluar 1.
Template: claude/motion-graphic/templates/TAHAP.md (disalin ke projects/<proyek>/TAHAP.md di awal video).
"""
import os, re, sys

LANGKAH = re.compile(r"^- \[( |x|X)\] (.*?)(?:→(.*))?$")


def baca(proyek):
    f = os.path.join(proyek, "TAHAP.md")
    if not os.path.exists(f):
        sys.exit(f"GAGAL: {f} tidak ada. Salin claude/motion-graphic/templates/TAHAP.md ke sana dulu.")
    tahap, cur = [], None
    for line in open(f, encoding="utf-8"):
        line = line.rstrip("\n")
        m = re.match(r"^## Tahap (\d+)\s*·\s*(.*)$", line)
        if m:
            cur = {"no": int(m.group(1)), "nama": m.group(2), "langkah": []}; tahap.append(cur); continue
        m = LANGKAH.match(line)
        if m and cur:
            bukti = (m.group(3) or "").strip()
            cur["langkah"].append({"teks": m.group(2).strip(), "centang": m.group(1).lower() == "x", "bukti": bukti})
    return tahap


def batas_final(tahap):
    """Nomor tahap terakhir yang wajib selesai sebelum render final: tahap sebelum "Deliver"; format lama: 3."""
    d = next((t["no"] for t in tahap if t["nama"].strip().lower().startswith("deliver")), None)
    return d - 1 if d else 3


def selesai(l):
    return l["centang"] and bool(l["bukti"])


def main():
    ketat = "--ketat" in sys.argv or os.environ.get("KETAT") == "1"
    sys.argv = [x for x in sys.argv if x != "--ketat"]
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    tahap = baca(sys.argv[1])
    if len(sys.argv) >= 4 and sys.argv[2] == "cek":
        n = batas_final(tahap) if sys.argv[3] == "final" else int(sys.argv[3]); kurang = []
        for t in tahap:
            if t["no"] > n: continue
            for l in t["langkah"]:
                if not selesai(l): kurang.append(f"Tahap {t['no']}: {l['teks'][:90]}{' (dicentang tanpa bukti)' if l['centang'] else ''}")
        for k in kurang: print("  - " + k)
        if kurang:
            print(f"CATATAN: {len(kurang)} langkah tahap 1–{n} belum selesai berbukti.")
            sys.exit(1 if ketat else 0)
        print(f"tahap 1–{n} selesai berbukti."); return
    for t in tahap:
        sisa = [l for l in t["langkah"] if not selesai(l)]
        if sisa:
            print(f"Tahap {t['no']} · {t['nama']}")
            l = sisa[0]
            print(f"  Berikutnya: {l['teks']}")
            if l["centang"]: print("  (sudah dicentang tetapi belum ada bukti setelah →)")
            print(f"  Sisa di tahap ini: {len(sisa) - 1} langkah lain. Baca hanya yang disebut 'baca:' di atas.")
            return
    print("Semua tahap selesai.")


if __name__ == "__main__":
    main()
