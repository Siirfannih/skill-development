#!/usr/bin/env python3
"""uji.py: fase 3. UJI TRANSFER satu primitif (video-reference-deconstructor §6); gagal -> revisi lewat sintesis (maks 3 putaran).

  uji.py spec/<id>.json [--putaran 3] [--model sonnet|opus] [--tanpa-revisi] [--mulai k]

Tiap putaran: (0) lint + lint_demo + tsc + meta; (1) render Demo dengan DUA isian slot netral (A, B: token, teks, wadah berbeda),
probe DOM tiap frame (posisi, opasitas efektif, blur, oklusi teks); (2) gerak tiap unit diukur dari probe dan dibandingkan dengan
ANGKA spec (timing +-2 frame, rentang_aman, RMS progres terhadap data measured <= 0,10); (3) kulit bocor: warna render (k-means Lab)
dalam DeltaE 12 dari jangan_dicuri.warna, teks jangan_dicuri; (4) dosa j: teks tertutup/terpotong; (5) kritikus vision (claude1
sonnet, hanya Read) melihat strip kandidat A dan B SAJA + kalimat mekanik + daftar jangan dicuri. Referensi tidak dirender dan tidak
diperlihatkan: tidak ada perbandingan tampilan demo terhadap referensi, karena itu mengukur kemiripan kulit dan mendorong kloning.
LULUS = semua cek angka di kedua isian + tanpa kulit bocor + tanpa dosa j + vision (terbaca A, terbaca B, sama, tanpa kulit tercuri).
Status = spec.status_maks bila lulus (parameter inti atau kurva estimated -> teruji-sebagian, ditegakkan skema), selain itu ditolak.
Keluaran: kandidat/<Komponen>/{hasil.json, hasil-semua.json, LAPORAN.md, strip-rN-A.jpg, strip-rN-B.jpg, progres-rN.png}.
"""
import argparse, json, re, shutil, subprocess, sys, datetime
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw
sys.path.insert(0, str(Path(__file__).resolve().parent))
import lib, metrik, sintesis

MODEL_BERAT = {"kamera"}  # kategori yang disintesis dengan opus
ISIAN = ("A", "B")
PROBE_JS = """
const probeOklusi = (frame: number) => {
  const st = document.createElement('style'); st.textContent = '*{pointer-events:auto !important}'; document.head.appendChild(st);
  const out: any[] = [];
  const eff = (e: Element | null) => { let o = 1; while (e) { const cs = getComputedStyle(e); o *= parseFloat(cs.opacity || '1'); if (cs.visibility === 'hidden' || cs.display === 'none') return 0; e = e.parentElement; } return o; };
  const blur = (e: Element | null) => { let b = 0; while (e) { const m = getComputedStyle(e).filter.match(/blur\\(([\\d.]+)px\\)/); if (m) b += parseFloat(m[1]); e = e.parentElement; } return b; };
  const rel = (a: Element, b: Element) => a === b || a.contains(b) || b.contains(a);
  const punyaTeks = (e: Element) => Array.from(e.childNodes).some((n) => n.nodeType === 3 && (n.textContent || '').trim());
  const dicat = (e: Element) => {
    const cs = getComputedStyle(e); if (eff(e) < 0.05 || cs.visibility === 'hidden') return false;
    const m = cs.backgroundColor.match(/rgba?\\(([^)]+)\\)/); const al = m ? (m[1].split(',').length > 3 ? parseFloat(m[1].split(',')[3]) : 1) : 0;
    return al > 0.05 || cs.backgroundImage !== 'none' || ['svg', 'img', 'canvas', 'video'].includes(e.tagName.toLowerCase()) || punyaTeks(e) || parseFloat(cs.borderTopWidth) > 0;
  };
  const W = window.innerWidth, H = window.innerHeight;
  document.querySelectorAll('body *').forEach((el) => {
    const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
    Array.from(el.childNodes).filter((n) => n.nodeType === 3 && (n.textContent || '').trim()).forEach((n) => {
      const rg = document.createRange(); rg.selectNodeContents(n); const q = rg.getBoundingClientRect(); if (q.width < 1 || q.height < 1) return;
      let nS = 0, nT = 0, nO = 0;
      for (let i = 0; i < 8; i++) for (let j = 0; j < 3; j++) {
        const x = q.x + q.width * (0.1 + 0.8 * i / 7), y = q.y + q.height * (0.2 + 0.6 * j / 2);
        if (x < 0 || y < 0 || x >= W || y >= H) continue; nS++;
        for (const e of document.elementsFromPoint(x, y)) { if (rel(e, el)) break; if (dicat(e)) { nT++; if (!punyaTeks(e)) nO++; break; } }
      }
      const pad = 0.15 * q.height;
      out.push({ teks: (n.textContent || '').trim().slice(0, 60), x: q.x, y: q.y, w: q.width, h: q.height,
        fs: parseFloat(cs.fontSize) * ((el as HTMLElement).offsetWidth > 0 ? r.width / (el as HTMLElement).offsetWidth : 1), op: eff(el), blur: blur(el),
        tutup: nS ? nT / nS : 0, tutup_objek: nS ? nO / nS : 0,
        wadah_keluar: q.x < r.x - pad || q.y < r.y - pad || q.right > r.right + pad || q.bottom > r.bottom + pad });
    });
  });
  document.head.removeChild(st);
  console.log('PROBE:' + JSON.stringify({ frame, items: out }));
};
"""


def tulis_entry(nama):
    """Dua komposisi DemoA/DemoB dari Demo.tsx; probe DOM tiap frame."""
    d = lib.PABRIK / "kandidat" / nama
    (d / "entry.tsx").write_text(f"""// dibuat otomatis oleh pabrik/uji.py dari meta.json; jangan disunting.
import React, {{ useLayoutEffect }} from 'react';
import {{ Composition, registerRoot, useCurrentFrame }} from 'remotion';
import {{ Demo }} from './Demo';
import meta from './meta.json';
{PROBE_JS}
const P: React.FC<{{ isian: 'A' | 'B' }}> = ({{ isian }}) => {{
  const frame = useCurrentFrame();
  useLayoutEffect(() => {{ probeOklusi(frame); }}, [frame]);
  return <Demo isian={{isian}} />;
}};
const Root: React.FC = () => <>
  {{(['A', 'B'] as const).map((i) => <Composition key={{i}} id={{'Demo' + i}} component={{P}} defaultProps={{{{ isian: i }}}} width={{meta.width}} height={{meta.height}} fps={{meta.fps}} durationInFrames={{meta.durasi}} />)}}
</>;
registerRoot(Root);
""")


def _nomor(p): return int(p.stem.split("-")[-1])


def render(nama, komposisi, keluar, scale=0.5):
    """-> (daftar path frame, {frame: [item teks probe]}). Probe dalam px CSS ukuran komposisi (tidak terpengaruh scale)."""
    keluar = Path(keluar)
    if keluar.exists(): shutil.rmtree(keluar)
    cmd = [str(lib.MG / "node_modules/.bin/remotion"), "render", f"kandidat/{nama}/entry.tsx", komposisi, str(keluar), "--sequence", "--image-format=jpeg",
           "--jpeg-quality=90", f"--scale={scale}", "--config=remotion.config.ts", "--concurrency=2", "--log=verbose"]
    with lib.KunciRender():
        r = subprocess.run(cmd, capture_output=True, text=True, cwd=str(lib.PABRIK), env=lib.env_node(), timeout=900)
    fr = sorted(keluar.glob("element-*.jp*g"), key=_nomor)
    if r.returncode != 0 or not fr:
        raise RuntimeError(f"render gagal: {(r.stderr or r.stdout)[-800:]}")
    probe = {}
    for m in re.finditer(r"PROBE:(\{.*\})", r.stdout + r.stderr):
        try: j = json.loads(m.group(1)); probe[j["frame"]] = j["items"]
        except Exception: pass
    return fr, probe


def seri_unit(probe):
    """{teks: {frame: (cx, cy, h, op, blur)}} dari probe."""
    s = {}
    for f, items in probe.items():
        for it in items:
            s.setdefault(it["teks"], {})[int(f)] = (it["x"] + it["w"] / 2, it["y"] + it["h"] / 2, it["h"], it["op"], it.get("blur", 0.0))
    return s


def _param(spec, nama):
    return next((p for p in spec["parameter"] if p["nama"] == nama), None)


def _rms_progres(p, refs, n=21):
    u = np.linspace(0, 1, n); pc = np.interp(u, np.linspace(0, 1, len(p)), p)
    rr = [np.interp(u, np.linspace(0, 1, len(r)), r) for r in refs]; rr.append(np.mean(rr, axis=0))
    return float(min(np.sqrt(np.mean((pc - r) ** 2)) for r in rr))


def cek_unit_masuk(spec, probe, W, H, frames=None):
    """Cek angka primitif unit-masuk pada satu isian. -> (metrik per unit, daftar gagal, progres per unit)."""
    dm = spec["uji"]["demo"]; seri = seri_unit(probe); gagal = []; met = []; prog = []
    oy, ox, du = _param(spec, "offset_awal_y"), _param(spec, "offset_awal_x"), _param(spec, "durasi_luncur")
    refs = spec["kurva"]["progres_ref"]
    unit = sorted(((t, s) for t, s in seri.items() if any(v[3] > 0.05 for v in s.values())), key=lambda ts: min(f for f, v in ts[1].items() if v[3] > 0.05))
    if len(unit) < len(dm["onset"]): gagal.append(f"hanya {len(unit)} unit terlihat, spec demo {len(dm['onset'])}")
    for i, (t, s) in enumerate(unit):
        fs = sorted(s); f0 = next(f for f in fs if s[f][3] > 0.05); akhir = fs[-1]
        cx0, cy0, h0, op0, b0 = s[f0]; cxr, cyr = s[akhir][0], s[akhir][1]
        dist = {f: float(np.hypot(s[f][0] - cxr, s[f][1] - cyr)) for f in fs if f >= f0}
        d0 = dist[f0]; fd = next((f for f in fs if f >= f0 and all(dist[g] < 0.002 * H for g in fs if g >= f)), akhir)
        dy, dx = (cy0 - cyr) / H, (cx0 - cxr) / W
        p = [1 - dist[f] / d0 for f in range(f0, fd + 1) if f in dist] if d0 > 0 else [1.0]
        lewat = max(((cyr - s[f][1]) / H for f in fs if f >= f0), default=0)
        m = {"unit": t, "muncul_frame": f0, "op_awal": round(op0, 3), "offset_y": round(dy, 4), "offset_x": round(dx, 4), "durasi_luncur": fd - f0,
             "rms_progres": round(_rms_progres(p, refs), 4) if len(p) >= 3 else None, "lewat_diam": round(lewat, 4),
             "blur_awal": round(b0 / H, 4), "blur_diam": round(s[akhir][4], 2)}
        met.append(m); prog.append(p)
        tag = f"unit '{t}'"
        if i < len(dm["onset"]) and abs(f0 - dm["onset"][i]) > 2: gagal.append(f"{tag}: muncul f{f0}, onset spec f{dm['onset'][i]} (> 2 frame)")
        if op0 < 0.9: gagal.append(f"{tag}: opasitas frame pertama {op0:.2f} (< 0,9): bukan potong 1 frame")
        if oy and not oy["rentang_aman"][0] <= dy <= oy["rentang_aman"][1]: gagal.append(f"{tag}: offset_y {dy:.3f} di luar {oy['rentang_aman']}")
        if ox and not ox["rentang_aman"][0] - 0.005 <= dx <= ox["rentang_aman"][1]: gagal.append(f"{tag}: offset_x {dx:.3f} di luar {ox['rentang_aman']}")
        if du and abs((fd - f0) - du["nilai"]) > 2: gagal.append(f"{tag}: durasi luncur {fd - f0} frame, spec {du['nilai']} (> 2 frame)")
        if m["rms_progres"] is None or m["rms_progres"] > 0.10: gagal.append(f"{tag}: RMS progres {m['rms_progres']} > 0,10 terhadap progres_ref measured")
        if lewat > 0.003: gagal.append(f"{tag}: melewati posisi diam {lewat:.3f} H (spec tanpa pantul)")
        if b0 <= 0: gagal.append(f"{tag}: tanpa blur di frame pertama")
        if s[akhir][4] > 0.1: gagal.append(f"{tag}: masih blur saat diam ({s[akhir][4]:.2f} px)")
    return met, gagal, prog


def cek_unit_ganti(spec, probe, W, H, frames=None):
    """Primitif unit-ganti: unit diganti di titik jangkar tetap dengan potong 1 frame, tanpa celah/tumpang, tanpa gerak posisi."""
    dm = spec["uji"]["demo"]; seri = seri_unit(probe); gagal = []; met = []
    tl = _param(spec, "toleransi_jangkar"); tol = tl["nilai"] if tl else 0.01
    unit = sorted(((t, s) for t, s in seri.items() if any(v[3] > 0.05 for v in s.values())), key=lambda ts: min(f for f, v in ts[1].items() if v[3] > 0.05))
    if len(unit) < len(dm["onset"]): gagal.append(f"hanya {len(unit)} unit terlihat, spec demo {len(dm['onset'])}")
    pusat = []
    for i, (t, s) in enumerate(unit):
        vis = sorted(f for f, v in s.items() if v[3] > 0.05); f0, f1 = vis[0], vis[-1]
        cx = [s[f][0] for f in vis]; cy = [s[f][1] for f in vis]; pusat.append((np.mean(cx), np.mean(cy)))
        m = {"unit": t, "muncul_frame": f0, "hilang_frame": f1, "op_awal": round(s[f0][3], 3), "op_akhir": round(s[f1][3], 3),
             "geser_maks": round(float(max(np.ptp(cx) / W, np.ptp(cy) / H)), 4), "celah": (vis[-1] - vis[0] + 1) - len(vis)}
        met.append(m); tag = f"unit '{t}'"
        if i < len(dm["onset"]) and abs(f0 - dm["onset"][i]) > 2: gagal.append(f"{tag}: muncul f{f0}, onset spec f{dm['onset'][i]} (> 2 frame)")
        if m["op_awal"] < 0.9: gagal.append(f"{tag}: opasitas frame pertama {m['op_awal']} (< 0,9): bukan potong")
        if i < len(unit) - 1 and m["op_akhir"] < 0.9: gagal.append(f"{tag}: opasitas frame terakhir {m['op_akhir']} (< 0,9): bukan potong keluar")
        if m["geser_maks"] > 0.002: gagal.append(f"{tag}: posisi bergerak {m['geser_maks']} (spec: diam di jangkar)")
        if m["celah"]: gagal.append(f"{tag}: berkedip/celah {m['celah']} frame")
        if i + 1 < len(unit):
            f_next = min(f for f, v in unit[i + 1][1].items() if v[3] > 0.05)
            if f_next != f1 + 1: gagal.append(f"{tag}: unit berikut muncul f{f_next}, harus f{f1 + 1} (tanpa celah/tumpang)")
    if pusat:
        px, py = np.array(pusat).T
        if np.ptp(px) / W > tol or np.ptp(py) / H > tol: gagal.append(f"pusat unit tidak di satu jangkar: sebaran x {np.ptp(px) / W:.3f} W, y {np.ptp(py) / H:.3f} H (> {tol})")
    return met, gagal, []


def cek_kamera_jalan(spec, probe, W, H, frames=None):
    """Primitif kamera-jalan: gerak global panggung diukur dari PIKSEL render dengan gerak.sinyal (alat yang sama dengan referensi):
    geser x, skala, geser y, potongan, durasi progres 1->99 %, dan progres per frame (waktu absolut sejak onset) terhadap progres_ref."""
    import gerak
    dm = spec["uji"]["demo"]; gagal = []; o = dm["onset"][0]
    sg = gerak.sinyal(gerak.baca_folder(Path(frames[0]).parent), "latar", None)
    x, s, y = (np.asarray(sg[k], float) for k in ("kam_x", "kam_s", "kam_y"))
    dx, rs = float(x[-1] - x[0]), float(s[-1] / s[0]); prog = []
    met = {"geser_x": round(dx, 4), "skala_akhir": round(rs, 4), "geser_y_maks": round(float(np.abs(y).max()), 4), "potong": list(map(int, sg["potong"]))}
    for nama, v, ref in (("x", x, spec["kurva"]["progres_ref"][0]), ("skala", s, spec["kurva"]["progres_ref"][-1])):
        d = v[-1] - v[0]
        if abs(d) < 1e-6: gagal.append(f"tidak ada gerak {nama}"); continue
        p = (v - v[0]) / d; prog.append(p[o:o + len(ref)].tolist())
        n = min(len(ref), len(p) - o); rms = float(np.sqrt(np.mean((p[o:o + n] - np.asarray(ref[:n])) ** 2)))
        a1, a99 = int(np.argmax(p >= 0.01)), int(np.argmax(p >= 0.99))
        met[f"rms_progres_{nama}"] = round(rms, 4); met[f"durasi_1_99_{nama}"] = a99 - a1; met[f"lewat_{nama}"] = round(float(p.max() - 1), 4)
        if rms > 0.10: gagal.append(f"RMS progres {nama} per frame sejak onset f{o} = {rms:.3f} > 0,10 (timing/kurva)")
        du = _param(spec, "durasi_1_99")
        if du and abs((a99 - a1) - du["nilai"]) > 2: gagal.append(f"durasi 1-99 % {nama} = {a99 - a1} frame, spec {du['nilai']} (> 2 frame)")
        if p.max() > 1.02: gagal.append(f"{nama} melewati posisi akhir {p.max() - 1:.3f} (spec tanpa pantul)")
    for k, v in (("geser_x", dx), ("skala_akhir", rs)):
        pr = _param(spec, k)
        if pr and not pr["rentang_aman"][0] <= v <= pr["rentang_aman"][1]: gagal.append(f"{k} {v:.3f} di luar {pr['rentang_aman']}")
    if met["geser_y_maks"] > 0.01: gagal.append(f"geser y {met['geser_y_maks']} (spec 0)")
    if met["potong"]: gagal.append(f"potongan di frame {met['potong']} (spec kontinu)")
    return [met], gagal, prog


CEK = {"unit-masuk": cek_unit_masuk, "unit-ganti": cek_unit_ganti, "kamera-jalan": cek_kamera_jalan}


def _lab(rgb):
    import cv2
    return cv2.cvtColor(np.asarray(rgb, np.uint8).reshape(-1, 1, 3), cv2.COLOR_RGB2LAB).reshape(-1, 3).astype(float) * [100 / 255, 1, 1] - [0, 128, 128]


def token_isian(iz):
    """Hex token satu isian dari demo-netral/Netral.tsx."""
    src = (lib.PABRIK / "demo-netral" / "Netral.tsx").read_text(); a = src.index(f"  {iz}: {{"); b = src.index("kata:", a)
    return re.findall(r"#[0-9A-Fa-f]{6}", src[a:b])


def _ke_segmen(c, a, b):
    ab = b - a; u = float(np.clip(np.dot(c - a, ab) / max(np.dot(ab, ab), 1e-9), 0, 1)); return float(np.linalg.norm(c - (a + u * ab)))


def kulit_bocor(frames, spec, iz=None, ambang=12.0, porsi_min=0.005, campuran=4.0):
    """Warna render (k-means Lab, klaster >= 0,5 % piksel) dalam DeltaE76 `ambang` dari jangan_dicuri.warna -> daftar temuan.
    Token isian sendiri selalu dicek. Klaster yang berada dalam `campuran` DeltaE dari garis campuran dua token isian (antialias,
    blur, opasitas parsial) berasal dari kit, bukan dari referensi, sehingga tidak dihitung."""
    import cv2
    hx = lambda h: _lab([[int(h[i:i + 2], 16) for i in (1, 3, 5)]])[0]
    ref = {h: hx(h) for h in spec["jangan_dicuri"]["warna"]}; tok = [hx(h) for h in (token_isian(iz) if iz else [])]
    out = [f"token isian {h} DeltaE {np.linalg.norm(hx(h) - r):.1f} dari {rh} (jangan dicuri)" for h in (token_isian(iz) if iz else [])
           for rh, r in ref.items() if np.linalg.norm(hx(h) - r) < ambang]
    px = np.concatenate([np.asarray(Image.open(f).convert("RGB").resize((320, 180)))[::2, ::2].reshape(-1, 3) for f in frames[:: max(1, len(frames) // 12)]])
    lab = _lab(px).astype(np.float32)
    _, lb, cen = cv2.kmeans(lab, 8, None, (3, 30, 0.5), 3, cv2.KMEANS_PP_CENTERS)
    cnt = np.bincount(lb.ravel(), minlength=8) / len(lb)
    for c, n in zip(cen, cnt):
        if n < porsi_min: continue
        if len(tok) > 1 and min(_ke_segmen(c, a, b) for i, a in enumerate(tok) for b in tok[i + 1:]) < campuran: continue
        for h, r in ref.items():
            de = float(np.linalg.norm(c - r))
            if de < ambang: out.append(f"warna render (porsi {n:.1%}) DeltaE {de:.1f} dari {h} (jangan dicuri)")
    return out


def teks_bocor(probe, spec):
    kata = {k.lower() for k in spec["jangan_dicuri"]["teks"]}
    return sorted({f"teks '{it['teks']}' ada di jangan_dicuri" for items in probe.values() for it in items if it["teks"].lower().strip("?!.,") in kata})


def dosa_j(probe, W, H, gerak_f):
    okl = metrik.analisis_oklusi(probe); msg = list(okl["j"])
    for f, items in probe.items():
        r = metrik.analisis_probe([dict(x, tag="div") for x in items], W, H, teks_min_px=0)
        msg += [f"f{f}: tabrakan {x}" for x in r["tabrakan"]]
        if f not in gerak_f: msg += [f"f{f}: {x} saat diam" for x in r["terpotong"]]
    return msg


def strip(frames, keluar, dari, sampai, n=10, tinggi=144):
    idx = np.unique(np.linspace(dari, min(sampai, len(frames) - 1), n).round().astype(int))
    ims = [Image.open(frames[i]).convert("RGB") for i in idx]; ims = [im.resize((int(im.width * tinggi / im.height), tinggi)) for im in ims]
    L = Image.new("RGB", (sum(im.width for im in ims), tinggi)); d = ImageDraw.Draw(L); x = 0
    for i, im in zip(idx, ims):
        L.paste(im, (x, 0)); d.text((x + 3, 2), f"f{i}", fill=(255, 0, 255)); x += im.width
    L.save(keluar, quality=85); return keluar


def plot_progres(prog, spec, keluar):
    import matplotlib; matplotlib.use("Agg"); import matplotlib.pyplot as plt
    fig, ax = plt.subplots(figsize=(6, 3.4))
    for r in spec["kurva"]["progres_ref"]: ax.plot(np.linspace(0, 1, len(r)), r, "k--", lw=1.2, alpha=0.7)
    prog = {k: [p for p in v if len(p) > 1] for k, v in prog.items()}
    for iz, ps in prog.items():
        for p in ps: ax.plot(np.linspace(0, 1, len(p)), p, lw=1, color="tab:blue" if iz == "A" else "tab:orange", alpha=0.8)
    ax.set_title("progres luncuran: data ukur referensi (putus) vs kandidat A biru / B oranye", fontsize=8); ax.set_xlabel("waktu ternormalisasi")
    fig.tight_layout(); fig.savefig(keluar, dpi=110); plt.close(fig); return keluar


def kritikus(strips, spec):
    jd = spec["jangan_dicuri"]
    p = f"""Baca dua gambar dengan Read: {strips['A']} (isian A) dan {strips['B']} (isian B). Masing-masing strip frame berurutan dari SATU
primitif gerak yang dirender dengan isian slot netral berbeda (warna, huruf, teks, wadah sengaja beda). Tidak ada gambar referensi.
Kalimat mekanik primitif: "{spec['mekanik']}"
Daftar JANGAN DICURI (kulit referensi yang tidak boleh muncul): warna {jd['warna']}, bentuk {jd['bentuk']}, objek {jd['objek']}, teks {jd['teks']}, tata letak {jd['tata_letak']}.
Jawab biner dari yang terlihat:
1. "terbaca_A": apakah strip A menunjukkan gerak yang dijelaskan kalimat mekanik? Ya/Tidak.
2. "terbaca_B": sama untuk strip B. Ya/Tidak.
3. "sama": apakah gerak A dan B sama (hanya isian yang beda)? Ya/Tidak.
4. "kulit_tercuri": daftar butir JANGAN DICURI yang terlihat di A atau B (kosong bila tidak ada).
5. "revisi": maksimal 3 hal pada GERAK (waktu, jarak, arah, kurva, blur) yang tidak sesuai kalimat mekanik; bukan saran menambah objek atau gaya.
Keluaran: satu blok ```json {{"terbaca_A": "Ya|Tidak", "terbaca_B": "Ya|Tidak", "sama": "Ya|Tidak", "alasan": "...", "kulit_tercuri": [], "revisi": []}}```"""
    return lib.ambil_json(lib.llm(p, model="sonnet", baca_di=[Path(strips["A"]).parent]))


def putaran(spec, rnd):
    nama = spec["komponen"]; d = lib.PABRIK / "kandidat" / nama; dm = spec["uji"]["demo"]; W, H = dm["width"], dm["height"]
    g = sintesis.cek(nama, spec)
    if g: return {"putaran": rnd, "lulus": False, "gagal": [f"cek otomatis: {x}" for x in g], "dosa": {}, "metrik": {}}
    tulis_entry(nama); cek = CEK[spec["uji"]["jenis"]]
    met, gagal, dosa, prog, strips = {}, [], {}, {}, {}
    for iz in ISIAN:
        tmp = Path("/tmp") / f"pabrik-v4-{nama}-r{rnd}-{iz}"
        try:
            frames, probe = render(nama, f"Demo{iz}", tmp)
            if not probe: gagal.append(f"{iz}: probe DOM kosong")
            m, gg, pr = cek(spec, probe, W, H, frames=frames); met[iz] = m; prog[iz] = pr; gagal += [f"{iz}: {x}" for x in gg]
            kb = kulit_bocor(frames, spec, iz) + teks_bocor(probe, spec)
            if kb: dosa[f"kulit_{iz}"] = "; ".join(kb[:4])
            gerak_f = {f for u in m if "muncul_frame" in u for f in range(u["muncul_frame"] - 1, u["muncul_frame"] + u.get("durasi_luncur", 0) + 2)}
            if spec["kategori"] == "kamera": gerak_f = set(range(dm["durasi"]))  # panggung kamera sengaja lebih lebar dari frame: terpotong tepi bukan dosa
            j = dosa_j(probe, W, H, gerak_f)
            if j: dosa[f"j_{iz}"] = "; ".join(j[:4])
            o = dm["onset"][min(1, len(dm["onset"]) - 1)]; ujung = o + 8 if spec["kategori"] == "tipografi" else o + 40
            strips[iz] = strip(frames, d / f"strip-r{rnd}-{iz}.jpg", max(0, o - 1), ujung, n=10)
        finally:
            shutil.rmtree(tmp, ignore_errors=True)
    if spec.get("kurva"): plot_progres(prog, spec, d / f"progres-r{rnd}.png")
    try:
        v = kritikus(strips, spec)
    except lib.BatasAkun:
        raise
    except Exception as e:
        v = {"galat": str(e)}; gagal.append(f"kritikus vision gagal: {e}")
    for k in ("terbaca_A", "terbaca_B", "sama"):
        if not str(v.get(k, "")).lower().startswith("y"): dosa[f"vision_{k}"] = f"{k}={v.get(k)} ({str(v.get('alasan', ''))[:160]})"
    if v.get("kulit_tercuri"): dosa["vision_kulit"] = "; ".join(map(str, v["kulit_tercuri"]))[:200]
    lulus = not dosa and not gagal
    return {"nama": nama, "id": spec["id"], "putaran": rnd, "lulus": lulus, "status": spec["status_maks"] if lulus else "ditolak",
            "spec": lib.rel(spec["_path"]), "gagal": gagal, "dosa": dosa, "metrik": met, "vision": v,
            "strip": {k: lib.rel(p) for k, p in strips.items()}, "progres_plot": lib.rel(d / f"progres-r{rnd}.png"), "tanggal": datetime.date.today().isoformat()}


def bahan_revisi(hs):
    h = hs[-1]
    return {"gagal": h["gagal"], "dosa": h["dosa"], "metrik": h["metrik"], "vision_revisi": h.get("vision", {}).get("revisi"),
            "riwayat": [{"putaran": x["putaran"], "n_gagal": len(x["gagal"]), "dosa": list(x["dosa"])} for x in hs]}


def tulis_laporan(nama, hs):
    L = [f"# {nama}: uji transfer (dua isian slot)", ""]
    for h in hs:
        L += [f"## Putaran {h['putaran']}: {'LULUS' if h['lulus'] else 'GAGAL'} ({h.get('status', '-')})", f"- strip: `{h.get('strip')}` · progres: `{h.get('progres_plot')}`",
              f"- dosa: {json.dumps(h['dosa'], ensure_ascii=False)}", f"- gagal: {json.dumps(h['gagal'], ensure_ascii=False)}",
              f"- metrik: `{json.dumps(h['metrik'], ensure_ascii=False)}`", f"- vision: `{json.dumps(h.get('vision'), ensure_ascii=False)[:1200]}`", ""]
    (lib.PABRIK / "kandidat" / nama / "LAPORAN.md").write_text("\n".join(L))


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("spec"); ap.add_argument("--putaran", type=int, default=3); ap.add_argument("--model")
    ap.add_argument("--tanpa-revisi", action="store_true"); ap.add_argument("--mulai", type=int, default=1)
    a = ap.parse_args(argv)
    sp = Path(a.spec); sp = sp if sp.is_absolute() else lib.PABRIK / sp
    spec = json.loads(sp.read_text()); spec["_path"] = str(sp); nama = spec["komponen"]
    model = a.model or ("opus" if spec["kategori"] in MODEL_BERAT else "sonnet"); d = lib.PABRIK / "kandidat" / nama
    hs = json.loads((d / "hasil-semua.json").read_text()) if a.mulai > 1 and (d / "hasil-semua.json").exists() else []
    if a.mulai > 1 and hs and not hs[-1]["lulus"]:
        sintesis.sintesis(sp, bahan_revisi(hs), model)
    for rnd in range(a.mulai, a.putaran + 1):
        h = putaran(spec, rnd); hs.append(h)
        (d / "hasil.json").write_text(json.dumps(h, ensure_ascii=False, indent=1)); (d / "hasil-semua.json").write_text(json.dumps(hs, ensure_ascii=False, indent=1))
        tulis_laporan(nama, hs)
        print(f"{nama} r{rnd}: {'LULUS' if h['lulus'] else 'GAGAL'} dosa={list(h['dosa'])} gagal={h['gagal'][:4]}", flush=True)
        if h["lulus"] or a.tanpa_revisi or rnd == a.putaran: break
        _, g = sintesis.sintesis(sp, bahan_revisi(hs), model)
        if g: print(f"revisi {nama}: galat {g[:3]}", file=sys.stderr)
    return 0 if hs and hs[-1]["lulus"] else 1


if __name__ == "__main__":
    sys.exit(main())
