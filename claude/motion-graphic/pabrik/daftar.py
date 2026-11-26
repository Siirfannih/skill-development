#!/usr/bin/env python3
"""daftar.py: fase 4. Catat hasil uji transfer satu primitif ke pabrik/registry.json (versi 3).

  daftar.py spec/<id>.json

Membaca spec v4 dan kandidat/<Komponen>/{hasil.json, meta.json, <Komponen>.tsx}. Entri: id, komponen, kategori, fungsi, mekanik,
pemicu, alasan_bekerja, slot, jangan_dicuri, props_schema (teks zod), parameter (berlabel measured/estimated), spec, arsip, bukti uji
(strip kandidat A/B, plot progres), metrik transfer per isian, dosa, vision, putaran, status.
  status "teruji"          lulus uji transfer dua isian; semua parameter inti dan kurva measured
  status "teruji-sebagian" lulus, tetapi parameter inti atau kurva estimated (ditegakkan skema lewat status_maks)
  status "ditolak"         tidak lulus setelah putaran habis; `alasan` = gagal + dosa putaran terakhir
Entri lama dengan id sama diganti. Sesi editing mencocokkan beat naskah dengan `pemicu` lalu memuat primitifnya saja.
"""
import datetime, json, re, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
import lib

REG = lib.PABRIK / "registry.json"


def skema_props(src, nama):
    """Ambil teks `z.object({...})` dari `export const <Nama>PropsSchema = z.object(` dengan pencocokan kurung."""
    m = re.search(rf"export\s+const\s+{re.escape(nama)}PropsSchema\s*=\s*", src)
    if not m: return None
    i = src.find("z.object(", m.end())
    if i < 0: return None
    d = 0
    for j in range(i + len("z.object"), len(src)):
        d += src[j] == "("; d -= src[j] == ")"
        if d == 0: return re.sub(r"\s+", " ", src[i:j + 1]).strip()
    return None


def buat_entri(spec_path):
    sp = json.loads(Path(spec_path).read_text()); nama = sp["komponen"]
    d = lib.PABRIK / "kandidat" / nama; h = json.loads((d / "hasil.json").read_text()); meta = json.loads((d / "meta.json").read_text())
    status = sp["status_maks"] if h["lulus"] else "ditolak"
    e = {"id": sp["id"], "komponen": nama, "kategori": sp["kategori"], "fungsi": meta.get("fungsi", ""), "mekanik": sp["mekanik"],
         "pemicu": sp["pemicu"], "alasan_bekerja": sp["alasan_bekerja"], "slot": sp["slot"], "jangan_dicuri": sp["jangan_dicuri"],
         "props_schema": skema_props((d / f"{nama}.tsx").read_text(), nama), "kode": lib.rel(d / f"{nama}.tsx"),
         "parameter": [{k: p[k] for k in ("nama", "nilai", "satuan", "label") if k in p} for p in sp["parameter"]],
         "spec": lib.rel(Path(spec_path).resolve()), "arsip": sp["sumber"].get("arsip"), "strip": h.get("strip"), "progres_plot": h.get("progres_plot"),
         "metrik_transfer": h["metrik"], "dosa": h["dosa"], "vision": {k: v for k, v in (h.get("vision") or {}).items() if k != "revisi"},
         "putaran": h["putaran"], "status": status, "tanggal": h.get("tanggal") or datetime.date.today().isoformat()}
    if status == "ditolak": e["alasan"] = h["gagal"] + [f"dosa {k}: {v}" for k, v in h["dosa"].items()]
    return e


def muat():
    return json.loads(REG.read_text()) if REG.exists() else {"versi": 3, "primitif": []}


def simpan_entri(e, reg=None, path=REG):
    import fcntl
    with open(str(path) + ".lock", "a") as kunci:  # dua rantai jalankan bisa mendaftar bersamaan
        fcntl.flock(kunci, fcntl.LOCK_EX)
        return _simpan(e, reg, path)


def _simpan(e, reg, path):
    if reg is None: reg = json.loads(Path(path).read_text()) if Path(path).exists() else {"versi": 3, "primitif": []}
    reg["primitif"] = [x for x in reg["primitif"] if x["id"] != e["id"]] + [e]
    reg["primitif"].sort(key=lambda x: x["id"]); Path(path).write_text(json.dumps(reg, ensure_ascii=False, indent=1) + "\n"); return reg


def main(argv=None):
    argv = sys.argv[1:] if argv is None else argv
    if len(argv) != 1: print(__doc__); return 2
    e = buat_entri(argv[0]); simpan_entri(e); print(f"{e['id']}: {e['status']}"); return 0 if e["status"] != "ditolak" else 1


if __name__ == "__main__":
    sys.exit(main())
