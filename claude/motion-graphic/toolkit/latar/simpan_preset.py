#!/usr/bin/env python3
"""Simpan parameter latar yang disukai sebagai preset baru, dan bangun ulang registri presets/index.js.

  python3 simpan_preset.py <nama> <params.json> [--komponen lightwave|generative] [--varian dark|light] [--catatan "teks"] [--timpa]
  python3 simpan_preset.py --bangun                 hanya bangun ulang presets/index.js dari presets/*.json

params.json = objek datar berisi parameter (colors, mode, glow, glow2, waveSpeed, grain, seed, intensity, saturation, ...), persis props
yang dipakai pada revisi yang disukai. Tanpa --varian: jadi `params` preset. Dengan --varian dark|light: ditambahkan sebagai
varian preset yang sudah ada (hanya kunci yang berbeda yang perlu ditulis). Nama: huruf kecil, angka, tanda minus.
Langkah manual setara: salin salah satu presets/*.json, ubah, lalu jalankan --bangun.
"""
import argparse, json, re, sys
from pathlib import Path

DIR = Path(__file__).resolve().parent / "presets"
KUNCI_BOLEH = {"colors", "mode", "glow", "dir", "waveSpeed", "amp", "grain", "seed", "intensity", "saturation", "quality",
               "base", "zones", "points", "drift", "driftAmp", "glow2"}


def bangun():
    data = {}
    for f in sorted(DIR.glob("*.json")):
        data[f.stem] = json.loads(f.read_text(encoding="utf-8"))
    head = "// DIHASILKAN oleh simpan_preset.py --bangun dari presets/*.json; jangan disunting (sunting JSON-nya).\n"
    (DIR / "index.js").write_text(head + "export const PRESETS = " + json.dumps(data, indent=2, ensure_ascii=False) + ";\n", encoding="utf-8")
    (DIR / "index.d.ts").write_text("export const PRESETS: Record<string, any>;\n", encoding="utf-8")
    return sorted(data)


def di_luar(x, y):
    return x < 0 or x > 1 or y < 0 or y > 1


def cek(params):
    if not isinstance(params, dict):
        sys.exit("params.json harus objek")
    salah = set(params) - KUNCI_BOLEH
    if salah:
        sys.exit(f"kunci tidak dikenal: {sorted(salah)}")
    c = params.get("colors")
    if c is not None and c != "brand" and not (isinstance(c, list) and c):
        sys.exit('colors harus daftar warna atau "brand"')
    # aturan latar: pusat cahaya di luar frame, grain <= 0.02, tanpa noise
    for k in ("glow", "glow2"):
        g = params.get(k)
        if g and not di_luar(g["x"], g["y"]):
            sys.exit(f"{k}: pusat ({g['x']}, {g['y']}) harus di luar frame (x atau y di luar 0..1); hanya ekor cahaya yang masuk")
    for i, z in enumerate(params.get("zones") or []):
        if not di_luar(z["x"], z["y"]):
            sys.exit(f"zones[{i}]: pusat ({z['x']}, {z['y']}) harus di luar frame")
    if params.get("grain", 0) > 0.02:
        sys.exit("grain maksimal 0.02 (film grain anti-banding, bukan tekstur)")
    if params.get("mode") == "noise":
        sys.exit("mode noise dilarang")


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("nama", nargs="?"); ap.add_argument("params", nargs="?")
    ap.add_argument("--komponen", choices=["lightwave", "generative"], default="lightwave")
    ap.add_argument("--varian", choices=["dark", "light"]); ap.add_argument("--catatan", default="")
    ap.add_argument("--timpa", action="store_true"); ap.add_argument("--bangun", action="store_true")
    a = ap.parse_args(argv)
    if a.bangun:
        print("preset:", ", ".join(bangun())); return 0
    if not a.nama or not a.params:
        ap.error("butuh <nama> <params.json>")
    if not re.fullmatch(r"[a-z0-9][a-z0-9-]*", a.nama):
        sys.exit("nama: huruf kecil, angka, minus")
    params = json.loads(Path(a.params).read_text(encoding="utf-8")); cek(params)
    f = DIR / f"{a.nama}.json"
    if a.varian:
        if not f.exists():
            sys.exit(f"preset {a.nama} belum ada; simpan dulu tanpa --varian")
        d = json.loads(f.read_text(encoding="utf-8")); d.setdefault("varian", {})[a.varian] = params
    else:
        if f.exists() and not a.timpa:
            sys.exit(f"preset {a.nama} sudah ada; pakai --timpa atau nama lain")
        d = {"komponen": a.komponen, "catatan": a.catatan, "params": params}
    f.write_text(json.dumps(d, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print("tersimpan:", f.name, "| preset:", ", ".join(bangun())); return 0


if __name__ == "__main__":
    sys.exit(main())
