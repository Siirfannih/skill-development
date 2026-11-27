#!/usr/bin/env python3
"""banding.py: bandingkan frame dengan frame referensi / REF-SPEC.json (KEBIJAKAN-v2 bagian 1.3 dan 3).

  python3 banding.py <frame.png> <ref-frame.png | REF-SPEC.json> [--tipe terang|gelap|light|dark|<tipe penuh>]
                     [--crop x0,y0,x1,y1] [--out banding.png] [--tol-luma 0.40] [--tol-sat 0.20] [--tol-de 15] [--json] [--ketat]

Ukuran (sama dengan ref_spec.py): rentang luma (p95-p5), saturasi median/p95, jarak palet (rata-rata berbobot ΔE2000
tetangga terdekat palet frame -> palet ref), kontras ekstrem (kasar, p2 vs p98 luma), luas fokus (% frame, informasi).
Dengan REF-SPEC.json: jenis frame diambil dari --tipe (terang/gelap, boleh "terang-ui"); tanpa --tipe dipilih otomatis dari
terang/gelap dan kerapatan tepi frame. Toleransi bawaan: rentang luma beda > 40%, sat p95 beda > 0,2, palet ΔE > 15;
REF-SPEC.json boleh menimpa lewat "toleransi", flag menimpa keduanya.
Sidik jari:
  F1 gradien ragu-ragu: rentang luma < 35 DAN sat p95 < 0,15 DAN bukan datar (std luma > 3) -> CATATAN (informasi).
     Dimaafkan bila referensi sendiri berprofil sama (REF-SPEC menyatakan sebaliknya).
  F2 halo di belakang teks: TIDAK diimplementasikan (heuristik dari piksel tidak andal; periksa dengan mata). Kontras ekstrem
     hanya dilaporkan.
Mode tanpa referensi (hanya sidik jari; angka tetap dilaporkan):
  python3 banding.py <frame.png>                F1 + F3
  python3 banding.py --seri <folder>            ringkasan seluruh storyboard: % frame jarang, sebaran rentang luma dan sat p95,
                                                % frame berpola "fokus kecil di tengah" (S-V31, peringatan)
  python3 banding.py <baru.png> --sebelum <lama.png> [--target <ref.png>]   selisih versi frame yang sama (revisi)
  F3 frame jarang (PERINGATAN, bukan gagal): luas fokus < 12 % DAN tidak ada pita tepi mirip teks (>= 3 % tinggi frame
     berisi baris dengan tepi >= 4 % lebar). Butuh scipy (tanpa scipy F3 dilewati). Seri: > 10 % frame jarang dicatat (pertimbangkan:
     isi dengan objek asli beat pada ukuran terbaca, atau gabung beat). Di mode --sebelum, tiap ukuran dicetak lama -> baru
     (selisih); dengan --target ditambah % selisih ke target yang sudah ditutup (langkah wajar revisi: ~30-60 %).
Keluar: 0 (temuan selera/selisih hanya dicetak sebagai CATATAN), 2 masukan salah. Dengan --ketat (atau KETAT=1): 1 bila sidik jari
atau selisih melampaui toleransi. Keluaran: PNG berdampingan (frame | ref) + tabel.
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


F3_FOKUS, F3_BARIS_LEBAR, F3_BAND_TINGGI, SERI_JARANG_MAKS = 12.0, 0.04, 0.03, 10.0
# Pola komposisi berulang (S-V31): fokus kecil (< 20 % frame) dan pusatnya dekat tengah. Peringatan, bukan gagal.
POLA_FOKUS_MAKS, POLA_PUSAT_TOL, POLA_PCT_MAKS, POLA_BERURUT = 20.0, 0.12, 25.0, 3


def pola_tengah(m):
    """None bila tak terukur; True = fokus kecil dan centroid dalam +-12 % dari tengah (pola 'satu benda kecil di tengah')."""
    p = m.get("fokus_pusat")
    if m["fokus_pct"] is None or p is None: return None
    return bool(m["fokus_pct"] < POLA_FOKUS_MAKS and abs(p[0] - .5) <= POLA_PUSAT_TOL and abs(p[1] - .5) <= POLA_PUSAT_TOL)


def pita_teks(img):
    """True bila ada pita tepi mirip teks: baris dengan tepi >= 4 % lebar mencakup >= 3 % tinggi frame."""
    a = np.asarray(RS.kecilkan(img), dtype=np.float32); luma = 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]
    gy, gx = np.gradient(luma); e = np.hypot(gx, gy) > 20
    return bool((e.mean(1) >= F3_BARIS_LEBAR).mean() >= F3_BAND_TINGGI)


def fingerprint_f3(m, img):
    """None bila fokus tidak terukur (tanpa scipy); True = frame jarang."""
    if m["fokus_pct"] is None: return None
    return bool(m["fokus_pct"] < F3_FOKUS and not pita_teks(img))


def ukur(path):
    img = Image.open(path).convert("RGB"); m = RS.metrik(img)
    return img, m, RS.fingerprint_f1(m), fingerprint_f3(m, img)


KUNCI = ("luma_range", "sat_median", "sat_p95", "fokus_pct", "tepi", "kontras_ekstrem")


def ketat(a):
    """Mode ketat (--ketat atau KETAT=1) mengembalikan kode keluar 1 untuk temuan; bawaan: informasi saja."""
    return bool(a.ketat or os.environ.get("KETAT") == "1")


def mode_sendiri(a):
    _, m, f1, f3 = ukur(a.frame)
    out = {"metrik": {k: m[k] for k in KUNCI}, "f1": f1, "f3_jarang": f3, "catatan": ["F1 gradien ragu-ragu"] if f1 else []}
    if a.json: print(json.dumps(out, ensure_ascii=False, indent=1))
    else:
        print(" ".join(f"{k}={m[k]}" for k in KUNCI))
        print("F1 gradien ragu-ragu: " + ("TERPICU (CATATAN)" if f1 else "tidak"))
        print("F3 frame jarang: " + ("tidak terukur (scipy tidak ada)" if f3 is None else "PERINGATAN: jarang (fokus %s %% < %g, tanpa pita teks)" % (m["fokus_pct"], F3_FOKUS) if f3 else "tidak"))
    return 1 if (f1 and ketat(a)) else 0


def mode_seri(a):
    exts = sorted(f for f in os.listdir(a.seri) if os.path.splitext(f)[1].lower() in RS.EXT)
    if not exts: print("tidak ada gambar di " + a.seri, file=sys.stderr); return 2
    baris = []
    for f in exts:
        _, m, f1, f3 = ukur(os.path.join(a.seri, f)); baris.append((f, m, f1, f3))
    n = len(baris); jarang = [b[0] for b in baris if b[3]]; f1s = [b[0] for b in baris if b[2]]
    terukur = [b for b in baris if b[3] is not None]
    pct = round(100 * len(jarang) / len(terukur), 1) if terukur else None
    dist = {}
    for k in ("luma_range", "sat_p95"):
        v = np.array([b[1][k] for b in baris]); dist[k] = {"min": round(float(v.min()), 2), "p50": round(float(np.median(v)), 2), "max": round(float(v.max()), 2)}
    flag = pct is not None and pct > SERI_JARANG_MAKS
    pola = [pola_tengah(b[1]) for b in baris]; ukur_pola = [p for p in pola if p is not None]
    pola_pct = round(100 * sum(ukur_pola) / len(ukur_pola), 1) if ukur_pola else None
    run = best = 0
    for p in pola:
        run = run + 1 if p else 0; best = max(best, run)
    pola_warn = bool(pola_pct is not None and (pola_pct > POLA_PCT_MAKS or best >= POLA_BERURUT))
    out = {"n": n, "jarang_pct": pct, "jarang": jarang, "f1": f1s, "sebaran": dist, "pola_tengah_pct": pola_pct, "pola_tengah_berurutan": best, "pola_peringatan": pola_warn, "catatan": flag or bool(f1s)}
    if a.json: print(json.dumps(out, ensure_ascii=False, indent=1))
    else:
        print(f"{n} frame; frame jarang: " + ("tidak terukur (scipy tidak ada)" if pct is None else f"{len(jarang)} ({pct} %), batas {SERI_JARANG_MAKS:g} %"))
        for k, v in dist.items(): print(f"  {k}: min {v['min']}  p50 {v['p50']}  maks {v['max']}")
        print("  pola fokus kecil di tengah: " + ("tidak terukur (scipy tidak ada)" if pola_pct is None else f"{pola_pct} % frame, terpanjang {best} berurutan" + (f"  PERINGATAN S-V31: > {POLA_PCT_MAKS:g} % atau >= {POLA_BERURUT} berurutan; variasikan ukuran shot dan posisi, atau mata-saja bila sengaja di REF-SPEC" if pola_warn else "")))
        if jarang: print("  jarang: " + ", ".join(jarang))
        if f1s: print("  F1 gradien ragu-ragu (CATATAN): " + ", ".join(f1s))
        if flag: print(f"CATATAN: > {SERI_JARANG_MAKS:g} % frame jarang. Pertimbangkan objek asli beat pada ukuran terbaca, atau gabung beat.")
    return 1 if ((flag or f1s) and ketat(a)) else 0


def mode_sebelum(a):
    if not os.path.isfile(a.sebelum): print("berkas tidak ada: " + a.sebelum, file=sys.stderr); return 2
    _, b, f1b, f3b = ukur(a.frame); _, l, _, f3l = ukur(a.sebelum)
    t = None
    if a.target:
        if not os.path.isfile(a.target): print("berkas tidak ada: " + a.target, file=sys.stderr); return 2
        t = RS.metrik(Image.open(a.target).convert("RGB"))
    hasil = {}
    for k in KUNCI:
        if b[k] is None or l[k] is None: continue
        h = {"sebelum": l[k], "sesudah": b[k], "selisih": round(b[k] - l[k], 3)}
        if t is not None and t[k] is not None and abs(t[k] - l[k]) > 1e-6: h["target"] = t[k]; h["tutup_pct"] = round(100 * (b[k] - l[k]) / (t[k] - l[k]), 0)
        hasil[k] = h
    out = {"metrik": hasil, "f1": f1b, "f3_jarang_sebelum": f3l, "f3_jarang_sesudah": f3b}
    if a.json: print(json.dumps(out, ensure_ascii=False, indent=1))
    else:
        for k, h in hasil.items():
            print(f"{k:<16} {h['sebelum']} -> {h['sesudah']}  (selisih {h['selisih']:+})" + (f"  target {h['target']}: tutup {h['tutup_pct']:.0f} %" if "tutup_pct" in h else ""))
        print(f"F1: {'TERPICU' if f1b else 'tidak'}   F3 jarang: sebelum={f3l} sesudah={f3b}" + ("  PERINGATAN: revisi membuat frame jarang" if f3b and not f3l else ""))
    return 1 if (f1b and ketat(a)) else 0


def main(argv=None):
    ap = argparse.ArgumentParser(description="Banding frame vs referensi")
    ap.add_argument("frame", nargs="?"); ap.add_argument("ref", nargs="?"); ap.add_argument("--tipe")
    ap.add_argument("--seri"); ap.add_argument("--sebelum"); ap.add_argument("--target"); ap.add_argument("--crop")
    ap.add_argument("--out"); ap.add_argument("--json", action="store_true"); ap.add_argument("--ketat", action="store_true")
    ap.add_argument("--tol-luma", type=float); ap.add_argument("--tol-sat", type=float); ap.add_argument("--tol-de", type=float)
    a = ap.parse_args(argv)
    if a.seri:
        if not os.path.isdir(a.seri): print("folder tidak ada: " + a.seri, file=sys.stderr); return 2
        return mode_seri(a)
    if not a.frame: ap.error("butuh <frame> atau --seri <folder>")
    if a.sebelum or not a.ref:
        if not os.path.isfile(a.frame): print("berkas tidak ada: " + a.frame, file=sys.stderr); return 2
        return mode_sebelum(a) if a.sebelum else mode_sendiri(a)
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
    catatan = []
    if f1 and not f1_maaf: catatan.append(f"F1 gradien ragu-ragu (rentang luma {m['luma_range']} < 35, sat p95 {m['sat_p95']} < 0.15, std {m['luma_std']} > 3)")
    for k, (_, _, sel, batas) in d.items():
        if batas is not None and sel is not None and sel > batas: catatan.append(f"selisih {k} {sel:.3g} > toleransi {batas}")
    baris = []
    for k, (fv, rv, sel, batas) in d.items():
        bad = batas is not None and sel is not None and sel > batas
        sv = "-" if sel is None else f"{sel:.3g}"; tg = "" if batas is None else f"  (batas {batas})"
        baris.append((f"{k:<16} frame={fv if fv is not None else '-':<8} ref={rv if rv is not None else '-':<8} selisih={sv}{tg}{'  <-- LUAR' if bad else ''}", bad))
    baris.append((f"F1 gradien ragu-ragu: {'TERPICU' + (' (dimaafkan: ref berprofil sama)' if f1_maaf else '') if f1 else 'tidak'}   F2 halo teks: tidak dicek (tidak andal)", f1 and not f1_maaf))
    baris.append((("CATATAN: " + "; ".join(catatan)) if catatan else "tidak ada catatan", bool(catatan)))
    out = a.out or os.path.splitext(a.frame)[0] + ".banding.png"
    gambar(img, Image.open(ref_png).convert("RGB") if ref_png else None, baris, out, "REF: " + label)
    if a.json:
        print(json.dumps({"ref": label, "toleransi": tol, "metrik_frame": {k: v for k, v in m.items() if k != "palet"}, "banding": {k: v[2] for k, v in d.items()},
                          "f1": f1, "f1_dimaafkan": f1_maaf, "catatan": catatan, "gambar": out}, ensure_ascii=False, indent=1))
    else:
        print(f"ref: {label}  tipe frame: {m['tipe']}")
        for t, _ in baris: print("  " + t)
        print("gambar: " + out)
    return 1 if (catatan and ketat(a)) else 0


if __name__ == "__main__":
    sys.exit(main())
