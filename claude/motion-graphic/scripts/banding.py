#!/usr/bin/env python3
"""banding.py: bandingkan frame dengan frame referensi / REF-SPEC.json (KEBIJAKAN-v2 bagian 1.3 dan 3).

  python3 banding.py <frame.png> <ref-frame.png | REF-SPEC.json> [--tipe terang|gelap|light|dark|<tipe penuh>]
                     [--crop x0,y0,x1,y1] [--out banding.png] [--tol-luma 0.40] [--tol-sat 0.20] [--tol-de 15] [--json]

Ukuran (sama dengan ref_spec.py): rentang luma (p95-p5), saturasi median/p95, jarak palet (rata-rata berbobot ΔE2000
tetangga terdekat palet frame -> palet ref), kontras ekstrem (kasar, p2 vs p98 luma), luas fokus (% frame, informasi).
Dengan REF-SPEC.json: jenis frame diambil dari --tipe (terang/gelap, boleh "terang-ui"); tanpa --tipe dipilih otomatis dari
terang/gelap dan kerapatan tepi frame. Toleransi bawaan: rentang luma beda > 40%, sat p95 beda > 0,2, palet ΔE > 15;
REF-SPEC.json boleh menimpa lewat "toleransi", flag menimpa keduanya.
Sidik jari:
  F1 gradien ragu-ragu: rentang luma < 35 DAN sat p95 < 0,15 DAN bukan datar (std luma > 3) -> GAGAL.
     Dimaafkan bila referensi sendiri berprofil sama (REF-SPEC menyatakan sebaliknya).
  F2 halo di belakang teks: TIDAK diimplementasikan (heuristik dari piksel tidak andal; periksa dengan mata). Kontras ekstrem
     hanya dilaporkan.
Keluar: 0 lulus, 1 sidik jari atau selisih melampaui toleransi, 2 masukan salah. Keluaran: PNG berdampingan (frame | ref) + tabel.
"""
import argparse, importlib.util, json, os, sys
import numpy as np
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
_s = importlib.util.spec_from_file_location("ref_spec", os.path.join(HERE, "ref_spec.py"))
RS = importlib.util.module_from_spec(_s); _s.loader.exec_module(RS)
ALIAS = {"light": "terang", "dark": "gelap"}


def pilih_tipe(spec, tipe, m):
    t = spec["tipe"]
    if tipe:
        tipe = ALIAS.get(tipe, tipe)
        if tipe in t: return tipe
        c = [k for k in t if k.startswith(tipe + "-") or k.startswith(tipe)]
        if not c: raise SystemExit(f"jenis '{tipe}' tidak ada di REF-SPEC (ada: {', '.join(t)})")
        return max(c, key=lambda k: t[k]["n"])
    nada = "gelap" if m["gelap"] else "terang"
    c = [k for k in t if k.startswith(nada + "-")]
    if c:
        return m["tipe"] if m["tipe"] in c else max(c, key=lambda k: t[k]["n"])
    return min(t, key=lambda k: abs(t[k]["rata"]["luma_p50"] - m["luma_p50"]))  # tidak ada nada sama: terdekat


def ref_dari(path, tipe, m):
    """-> (ref metrik ringkas, label, path gambar ref atau None, toleransi dari spec)."""
    if path.lower().endswith(".json"):
        spec = json.load(open(path)); k = pilih_tipe(spec, tipe, m); t = spec["tipe"][k]
        r = dict(t["rata"]); r["palet"] = t["palet"]
        ref_png = None
        for f in t["stills"]:
            c = os.path.join(os.path.dirname(os.path.abspath(path)), f)
            if os.path.isfile(c): ref_png = c; break
        # std luma tidak tersimpan per jenis: ambil dari still pertama untuk cek F1 ref
        ref_f1 = False
        for s in spec["stills"]:
            if s["metrik"]["tipe"] == k: ref_f1 = ref_f1 or RS.fingerprint_f1(s["metrik"])
        r["_f1"] = ref_f1
        return r, f"REF-SPEC[{k}] ({t['n']} still)", ref_png, spec.get("toleransi", {})
    im = Image.open(path); rm = metrik_ref = RS.metrik(im); rm["_f1"] = RS.fingerprint_f1(rm)
    return rm, os.path.basename(path), path, {}


def bandingkan(m, r, tol):
    d = {}
    d["luma_range"] = (m["luma_range"], r["luma_range"], abs(m["luma_range"] - r["luma_range"]) / max(r["luma_range"], 1e-6), tol["luma_range_rel"])
    d["sat_median"] = (m["sat_median"], r["sat_median"], abs(m["sat_median"] - r["sat_median"]), None)
    d["sat_p95"] = (m["sat_p95"], r["sat_p95"], abs(m["sat_p95"] - r["sat_p95"]), tol["sat_p95_abs"])
    d["palet_de"] = (None, None, RS.palet_de(m["palet"], r["palet"]), tol["palet_de"])
    d["kontras_ekstrem"] = (m["kontras_ekstrem"], r["kontras_ekstrem"], abs(m["kontras_ekstrem"] - r["kontras_ekstrem"]), None)
    d["fokus_pct"] = (m["fokus_pct"], r["fokus_pct"], None if m["fokus_pct"] is None or r["fokus_pct"] is None else abs(m["fokus_pct"] - r["fokus_pct"]), None)
    return d


def gambar(frame, ref_img, baris, out, judul):
    h = 540; fw = round(frame.size[0] * h / frame.size[1]); f2 = frame.resize((fw, h))
    rw = round(ref_img.size[0] * h / ref_img.size[1]) if ref_img else fw
    r2 = ref_img.resize((rw, h)) if ref_img else Image.new("RGB", (rw, h), (40, 40, 40))
    lh = 18; W = fw + rw + 10; tab = 20 + lh * (len(baris) + 2)
    im = Image.new("RGB", (W, h + 22 + tab), (20, 20, 20)); d = ImageDraw.Draw(im)
    d.text((4, 4), "FRAME", fill=(255, 255, 255)); d.text((fw + 14, 4), judul, fill=(255, 255, 255))
    im.paste(f2, (0, 22)); im.paste(r2, (fw + 10, 22)); y = h + 28
    for t, bad in baris:
        d.text((8, y), t, fill=(255, 110, 110) if bad else (200, 230, 200)); y += lh
    im.save(out)


def main(argv=None):
    ap = argparse.ArgumentParser(description="Banding frame vs referensi")
    ap.add_argument("frame"); ap.add_argument("ref"); ap.add_argument("--tipe"); ap.add_argument("--crop")
    ap.add_argument("--out"); ap.add_argument("--json", action="store_true")
    ap.add_argument("--tol-luma", type=float); ap.add_argument("--tol-sat", type=float); ap.add_argument("--tol-de", type=float)
    a = ap.parse_args(argv)
    for p in (a.frame, a.ref):
        if not os.path.isfile(p): print("berkas tidak ada: " + p, file=sys.stderr); return 2
    img = Image.open(a.frame).convert("RGB")
    if a.crop:
        img = img.crop(tuple(int(v) for v in a.crop.split(",")))
    m = RS.metrik(img)
    r, label, ref_png, tol_spec = ref_dari(a.ref, a.tipe, m)
    tol = dict(RS.TOLERANSI); tol.update(tol_spec)
    if a.tol_luma is not None: tol["luma_range_rel"] = a.tol_luma
    if a.tol_sat is not None: tol["sat_p95_abs"] = a.tol_sat
    if a.tol_de is not None: tol["palet_de"] = a.tol_de
    d = bandingkan(m, r, tol)
    f1 = RS.fingerprint_f1(m); f1_maaf = f1 and r.get("_f1", False)
    gagal = []
    if f1 and not f1_maaf: gagal.append(f"F1 gradien ragu-ragu (rentang luma {m['luma_range']} < 35, sat p95 {m['sat_p95']} < 0.15, std {m['luma_std']} > 3)")
    for k, (_, _, sel, batas) in d.items():
        if batas is not None and sel is not None and sel > batas: gagal.append(f"selisih {k} {sel:.3g} > toleransi {batas}")
    baris = []
    for k, (fv, rv, sel, batas) in d.items():
        bad = batas is not None and sel is not None and sel > batas
        sv = "-" if sel is None else f"{sel:.3g}"; tg = "" if batas is None else f"  (batas {batas})"
        baris.append((f"{k:<16} frame={fv if fv is not None else '-':<8} ref={rv if rv is not None else '-':<8} selisih={sv}{tg}{'  <-- LUAR' if bad else ''}", bad))
    baris.append((f"F1 gradien ragu-ragu: {'TERPICU' + (' (dimaafkan: ref berprofil sama)' if f1_maaf else '') if f1 else 'tidak'}   F2 halo teks: tidak dicek (tidak andal)", f1 and not f1_maaf))
    baris.append((("GAGAL: " + "; ".join(gagal)) if gagal else "LULUS", bool(gagal)))
    out = a.out or os.path.splitext(a.frame)[0] + ".banding.png"
    gambar(img, Image.open(ref_png).convert("RGB") if ref_png else None, baris, out, "REF: " + label)
    if a.json:
        print(json.dumps({"ref": label, "toleransi": tol, "metrik_frame": {k: v for k, v in m.items() if k != "palet"}, "banding": {k: v[2] for k, v in d.items()},
                          "f1": f1, "f1_dimaafkan": f1_maaf, "gagal": gagal, "gambar": out}, ensure_ascii=False, indent=1))
    else:
        print(f"ref: {label}  tipe frame: {m['tipe']}")
        for t, _ in baris: print("  " + t)
        print("gambar: " + out)
    return 1 if gagal else 0


if __name__ == "__main__":
    sys.exit(main())
