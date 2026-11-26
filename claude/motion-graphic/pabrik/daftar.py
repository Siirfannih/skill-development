#!/usr/bin/env python3
"""daftar.py: fase 4. Catat hasil uji ke pabrik/registry.json.

  daftar.py <Nama>

Membaca kandidat/<Nama>/{hasil.json, meta.json, <Nama>.tsx} dan spec. Entri: nama, fungsi, kartu_sumber, kategori, props_schema
(teks zod), stills demo, metrik akhir, status, tanggal.
  status "teruji"          lulus (nol dosa + metrik keras) dan gerak/lintasan spec diukur dari klip
  status "teruji-sebagian" lulus, tetapi spec hanya dari keyframe statis (gerak/kurva perkiraan, tidak terverifikasi terhadap klip)
  status "ditolak"         tidak lulus setelah putaran habis; `alasan` = dosa + metrik gagal putaran terakhir
Entri lama dengan nama sama diganti. Komponen yang lolos dipindah ke toolkit setelah merge (registry ikut).
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


def buat_entri(nama):
    d = lib.PABRIK / "kandidat" / nama; h = json.loads((d / "hasil.json").read_text())
    meta = json.loads((d / "meta.json").read_text()); sp = json.loads((lib.MG / h["spec"]).read_text())  # hasil.json menyimpan path relatif ke claude/motion-graphic
    # referensi tanpa klip yang bisa dibaca = statis: status maksimum teruji-sebagian (tak ada metrik struktur/gerak temporal)
    if h["lulus"]: status = "teruji" if (sp["terukur"]["dari_klip"] and lib.spec_klip(sp)) else "teruji-sebagian"
    else: status = "ditolak"
    stills = sorted(str(p.relative_to(lib.PABRIK)) for p in (d / f"stills-r{h['putaran']}").glob("*.jpg")) if (d / f"stills-r{h['putaran']}").exists() else []
    e = {"nama": nama, "fungsi": meta.get("fungsi", ""), "kartu_sumber": [f"{sp['kartu']}.{sp['teknik']}"], "kategori": sp["kategori"],
         "spec": h["spec"], "props_schema": skema_props((d / f"{nama}.tsx").read_text(), nama), "demo_stills": stills, "lembar": h.get("lembar"),
         "metrik_akhir": h["metrik"], "putaran": h["putaran"], "status": status, "tanggal": h.get("tanggal") or datetime.date.today().isoformat()}
    if status == "teruji-sebagian": e["catatan"] = "spec dari keyframe statis: kurva/lintasan gerak adalah perkiraan, tidak diukur dari klip. " + sp["terukur"].get("catatan", "")
    if status == "ditolak": e["alasan"] = h["gagal"]
    return e


def muat():
    return json.loads(REG.read_text()) if REG.exists() else {"versi": 1, "komponen": []}


def simpan_entri(e, reg=None, path=REG):
    import fcntl
    with open(str(path) + ".lock", "a") as kunci:  # dua rantai jalankan bisa mendaftar bersamaan
        fcntl.flock(kunci, fcntl.LOCK_EX)
        return _simpan(e, reg, path)


def _simpan(e, reg, path):
    if reg is None: reg = json.loads(Path(path).read_text()) if Path(path).exists() else {"versi": 1, "komponen": []}
    reg["komponen"] = [x for x in reg["komponen"] if x["nama"] != e["nama"]] + [e]
    reg["komponen"].sort(key=lambda x: x["nama"]); Path(path).write_text(json.dumps(reg, ensure_ascii=False, indent=1) + "\n"); return reg


def main(argv=None):
    argv = sys.argv[1:] if argv is None else argv
    if len(argv) != 1: print(__doc__); return 2
    e = buat_entri(argv[0]); simpan_entri(e); print(f"{e['nama']}: {e['status']}"); return 0 if e["status"] != "ditolak" else 1


if __name__ == "__main__":
    sys.exit(main())
