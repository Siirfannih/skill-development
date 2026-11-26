#!/usr/bin/env python3
"""uji.py: fase 3. Uji visual otomatis satu kandidat; gagal -> revisi lewat sintesis (maks 3 putaran).

  uji.py <Nama> [--putaran 3] [--tanpa-revisi] [--spec spec/X.json] [--kalibrasi]

Tiap putaran: (0) lint + tsc; (1) render `remotion render --sequence` (A skala 1, B skala 0,5; kunci render global flock) dengan
probe DOM (bbox + ukuran font teks pada frame kunci, lewat log browser); (2) metrik keras: struktur vs keyframe referensi
(grayscale+equalize, SSIM + peta tepi), gerak (lintasan centroid vs kurva spec untuk gerak_kamera; selain itu frame benar-benar
berubah), dua set token (struktur sama, piksel beda); (3) DAFTAR DOSA biner, satu "Ya" = TOLAK, tanpa skor:
  skrip : a gradien ragu-ragu (banding.py F1) | d elemen kecil di tengah >= 3 sampel berturut | h teks < 24px@1080 (probe) |
          i warna di luar palet meta.json (palet_check ΔE2000 > 12, luas >= 0,5 %) | j tabrakan teks-teks/teks-objek dan teks terpotong (probe)
  vision: b noda radial pojok | c benda 3D generik | e halo di belakang teks | f blur pada teks | g placeholder   (Ya/Tidak + bukti frame)
  jangkar: kandidat mengulang pola salah satu dari 3 jangkar ditolak (Ya/Tidak per jangkar, dosa tambahan)
Kritikus vision menerima SATU gambar gabungan (referensi kiri | kandidat kanan, ukuran sama) dan diminta menyebut 5 hal yang membuat
kanan tampak lebih murahan/amatir; daftar itu BUKAN syarat lulus, hanya masukan revisi.
LULUS = nol dosa DAN metrik keras dalam AMBANG. Keluaran: kandidat/<Nama>/{LAPORAN.md, hasil.json, lembar-r<N>.jpg, stills-r<N>/}.
Keluar 0 lulus, 1 gagal.
"""
import argparse, importlib.util, json, re, shutil, subprocess, sys, datetime
from pathlib import Path
import numpy as np
from PIL import Image
sys.path.insert(0, str(Path(__file__).resolve().parent))
import lib, lint, metrik, sintesis


AMBANG = {
    "struktur_terbaik_min": 0.20,   # skor struktur (SSIM+edge)/2 terbaik kandidat vs keyframe referensi (kalibrasi: --kalibrasi; tak berhubungan p95 ~0,25)
    "gerak_rms_maks": 0.15,         # RMS progres terukur vs kurva spec (0..1), gerak_kamera
    "gerak_rasio_durasi": (0.5, 2.0),
    "frame_berubah_min": 0.25,      # bagian pasangan frame berurutan yang berubah (kategori non-kamera)
    "token_edge_min": 0.80,         # struktur sama antar dua set token (korelasi tepi)
    "token_piksel_min": 12.0,       # selisih RGB rata-rata antar dua set token (0..255)
    "palet_de": 12.0, "palet_luas": 0.005,
    "teks_min_px": 24.0, "fokus_berturut": 3,
}
JANGKAR = {
    "j1": ("DITOLAK-1-bw-v4-board.png", "bola 3D tanpa makna, garis acak, kartu blur, serif italic di kata emosional (AI slop)"),
    "j2": ("DITOLAK-2-v6-racing.png", "gradien pucat ragu-ragu, halo di belakang teks, teks abu di latar hampir putih"),
    "j3": ("DITOLAK-3-L3r2-pojok.jpg", "zona biru selalu di pojok kanan bawah yang sama (template), objek terlalu kecil, teks tak terbaca"),
}
DIR_JANGKAR = Path.home() / "work/pabrik-run/jangkar"
DOSA_VISION = {
    "b": "noda atau gradien radial bulat di pojok tanpa arah cahaya yang jelas",
    "c": "bola atau benda 3D generik tanpa makna (hapus benda itu: pesan tidak berkurang)",
    "e": "halo/glow di belakang teks yang menurunkan kontras",
    "f": "blur pada konten yang harus dibaca (teks atau objek utama tidak tajam)",
    "g": "placeholder: kotak kosong, garis abu pengganti teks, border putus-putus",
}


def _banding():
    s = importlib.util.spec_from_file_location("banding", lib.MG / "scripts/banding.py"); m = importlib.util.module_from_spec(s); s.loader.exec_module(m); return m


PROBE_JS = """
const probe = (frame: number) => {
  const out: any[] = [];
  const eff = (e: Element | null) => { let o = 1; while (e) { const cs = getComputedStyle(e); o *= parseFloat(cs.opacity || '1'); if (cs.visibility === 'hidden' || cs.display === 'none') return 0; e = e.parentElement; } return o; };
  document.querySelectorAll('body *').forEach((el) => {
    const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
    const tag = el.tagName.toLowerCase();
    Array.from(el.childNodes).filter((n) => n.nodeType === 3 && (n.textContent || '').trim()).forEach((n) => {
      const rg = document.createRange(); rg.selectNodeContents(n); const q = rg.getBoundingClientRect();
      out.push({ tag, teks: (n.textContent || '').trim().slice(0, 60), x: q.x, y: q.y, w: q.width, h: q.height, fs: parseFloat(cs.fontSize) * ((el as HTMLElement).offsetWidth > 0 ? r.width / (el as HTMLElement).offsetWidth : 1), op: eff(el), vis: (() => { const t = document.elementFromPoint(q.x + q.width / 2, q.y + q.height / 2); return !!t && (t === el || el.contains(t) || t.contains(el)); })() });
    });
    if (tag === 'svg' || tag === 'img' || tag === 'canvas') out.push({ tag, teks: '', x: r.x, y: r.y, w: r.width, h: r.height, fs: 0, op: eff(el), isi_teks: tag === 'svg' && !!el.querySelector('text') });
  });
  console.log('PROBE:' + JSON.stringify({ frame, items: out }));
};
"""


def tulis_entry(nama, meta):
    d = lib.PABRIK / "kandidat" / nama
    (d / "entry.tsx").write_text(f"""// dibuat otomatis oleh pabrik/uji.py dari meta.json; jangan disunting.
import React, {{ useLayoutEffect }} from 'react';
import {{ Composition, registerRoot, useCurrentFrame }} from 'remotion';
import {{ DemoA, DemoB }} from './Demo';
import meta from './meta.json';
{PROBE_JS}
const Probe: React.FC<{{ c: React.FC }}> = ({{ c: C }}) => {{
  const frame = useCurrentFrame();
  useLayoutEffect(() => {{ if ((meta.stills as number[]).includes(frame)) probe(frame); }}, [frame]);
  return <C />;
}};
const A: React.FC = () => <Probe c={{DemoA}} />;
const B: React.FC = () => <Probe c={{DemoB}} />;
const Root: React.FC = () => (
  <>
    <Composition id="A" component={{A}} width={{meta.width}} height={{meta.height}} fps={{meta.fps}} durationInFrames={{meta.durasi}} />
    <Composition id="B" component={{B}} width={{meta.width}} height={{meta.height}} fps={{meta.fps}} durationInFrames={{meta.durasi}} />
  </>
);
registerRoot(Root);
""")


def _nomor(p): return int(p.stem.split("-")[-1])


def render(nama, comp, dari, sampai, scale, keluar):
    """-> (daftar path frame berurut, {frame: [item probe]})."""
    keluar = Path(keluar)
    if keluar.exists(): shutil.rmtree(keluar)
    cmd = [str(lib.MG / "node_modules/.bin/remotion"), "render", f"kandidat/{nama}/entry.tsx", comp, str(keluar), "--sequence", "--image-format=jpeg",
           "--jpeg-quality=90", f"--scale={scale}", f"--frames={dari}-{sampai}", "--config=remotion.config.ts", "--concurrency=2", "--log=verbose"]
    with lib.KunciRender():
        r = subprocess.run(cmd, capture_output=True, text=True, cwd=str(lib.PABRIK), env=lib.env_node(), timeout=900)
    fr = sorted(keluar.glob("element-*.jp*g"), key=_nomor)
    if r.returncode != 0 or not fr:
        raise RuntimeError(f"render {comp} gagal: {(r.stderr or r.stdout)[-800:]}")
    probe = {}
    for m in re.finditer(r"PROBE:(\{.*\})", r.stdout + r.stderr):
        try: j = json.loads(m.group(1)); probe[j["frame"]] = j["items"]
        except Exception: pass
    return fr, probe


def referensi(spec):
    """Keyframe referensi (bukan lembar klip, bukan strip urutan) yang bisa dibaca."""
    ps = []
    for b in spec["bukti"]:
        p = lib.MG / b["frame"]
        if p.exists() and "-klip" not in p.name and p not in ps: ps.append(p)
    for p in lib.keyframes(spec["kartu"]):
        if "urutan" not in p.name and p not in ps: ps.append(p)
    return ps[:12]


def ukur_semua(nama, spec, meta, fa, fb, probe):
    """-> (metrik, gagal_metrik, dosa_skrip, still). dosa_skrip = {kode: bukti}."""
    B = _banding(); RS = B.RS; dari = meta["urutan"]["dari"]; M = {}; G = []; D = {}
    still = [(i, fa[i - dari]) for i in meta["stills"] if 0 <= i - dari < len(fa)]
    f1, f3, bm = [], 0, []
    for i, p in still:
        _, m, a, c = B.ukur(str(p)); f1.append(bool(a)); f3 += bool(c); bm.append({"frame": i, "luma_range": m["luma_range"], "sat_p95": m["sat_p95"], "fokus_pct": m["fokus_pct"]})
    M["banding"] = {"per_still": bm, "f1_terpicu": int(sum(f1)), "f3_jarang": f3, "n": len(still)}
    if any(f1): D["a"] = f"banding.py F1 gradien ragu-ragu di frame {[i for (i, _), x in zip(still, f1) if x]}"
    # d: fokus kecil di tengah, >= 3 sampel berturut (stride 2)
    run = best = 0; pola = []
    for k in range(0, len(fa), 2):
        im = Image.open(fa[k]).convert("RGB"); m = RS.metrik(im); ya = bool(B.pola_tengah(m)); pola.append(ya)
        run = run + 1 if ya else 0; best = max(best, run)
    M["pola_tengah"] = {"sampel": len(pola), "berturut_maks": best}
    if best >= AMBANG["fokus_berturut"]: D["d"] = f"fokus < 20 % dan pusat dalam ±12 % tengah pada {best} sampel berturut (stride 2 frame)"
    # h, j: probe
    ph = {"kecil": [], "tabrakan": [], "terpotong": []}
    for i in meta["stills"]:
        if i in probe:
            r = metrik.analisis_probe(probe[i], meta["width"], meta["height"], AMBANG["teks_min_px"])
            for k in ph: ph[k] += [f"f{i}: {x}" for x in r[k]]
    M["probe"] = {"frame_terprobe": sorted(probe), "teks_kecil": len(ph["kecil"]), "tabrakan": len(ph["tabrakan"]), "terpotong": len(ph["terpotong"])}
    if not probe: G.append("probe DOM kosong: dosa h/j tidak terukur")
    if ph["kecil"]: D["h"] = "; ".join(ph["kecil"][:4])
    if ph["tabrakan"]: D["j"] = "; ".join(ph["tabrakan"][:4])  # terpotong = informasi (kamera boleh memotong dunia), bukan dosa
    # i: palet
    pal = meta["palet"]; pd = []; pB = []
    for i, p in still:
        r = metrik.palet_dosa(Image.open(p), pal["A"], AMBANG["palet_luas"], AMBANG["palet_de"])
        if r["dosa"]: pd.append(f"A f{i}: {r['luas'] * 100:.2f}% {r['warna_dominan']}")
        j = i - dari
        if j < len(fb):
            r = metrik.palet_dosa(Image.open(fb[j]), pal["B"], AMBANG["palet_luas"], AMBANG["palet_de"])
            if r["dosa"]: pB.append(f"B f{i}: {r['luas'] * 100:.2f}% {r['warna_dominan']}")
    M["palet"] = {"luar_palet": pd + pB}
    if pd or pB: D["i"] = "warna di luar palet: " + "; ".join((pd + pB)[:4])
    # struktur vs referensi
    refs = referensi(spec); terbaik = {"skor": -1}; per_ref = {}
    for i, p in still:
        a = Image.open(p).convert("RGB")
        for r in refs:
            s = metrik.struktur(a, Image.open(r).convert("RGB")); per_ref[r] = max(per_ref.get(r, -1), s["skor"])
            if s["skor"] > terbaik["skor"]: terbaik = dict(s, frame=i, ref=lib.rel(r))
    M["struktur"] = dict(terbaik, rata_terbaik_per_ref=round(float(np.mean(list(per_ref.values()))), 4) if per_ref else None, n_ref=len(refs))
    if not refs or terbaik["skor"] < AMBANG["struktur_terbaik_min"]: G.append(f"struktur vs referensi {terbaik['skor']} < {AMBANG['struktur_terbaik_min']}")
    # gerak
    seq = [Image.open(p).convert("RGB") for p in fa]
    diffs = [float(np.abs(np.asarray(seq[k].resize((192, 108)), np.float32) - np.asarray(seq[k - 1].resize((192, 108)), np.float32)).mean()) for k in range(1, len(seq))]
    berubah = float(np.mean([d > 0.3 for d in diffs])) if diffs else 0.0
    M["gerak"] = {"frame_berubah": round(berubah, 3), "kategori": spec["kategori"]}
    if spec["kategori"] == "gerak_kamera":
        prog, rentang = metrik.progres(metrik.lintasan(seq))
        g = metrik.bandingkan_gerak(prog, meta["fps"], spec["parameter"], rentang=rentang)
        M["gerak"]["rentang_centroid"] = round(rentang, 4)
        if g is None: M["gerak"]["lintasan"] = None; G.append("gerak: kamera diam atau gerak tidak terdeteksi dari urutan frame")
        else:
            M["gerak"]["lintasan"] = g; lo, hi = AMBANG["gerak_rasio_durasi"]
            if g["rms"] > AMBANG["gerak_rms_maks"]: G.append(f"gerak RMS {g['rms']} > {AMBANG['gerak_rms_maks']}")
            if not lo <= g["rasio_durasi"] <= hi: G.append(f"gerak rasio durasi {g['rasio_durasi']} di luar {lo}-{hi}")
    elif berubah < AMBANG["frame_berubah_min"]: G.append(f"gerak: hanya {berubah:.2f} pasangan frame berubah (< {AMBANG['frame_berubah_min']})")
    # dua token
    dt = [metrik.dua_token(Image.open(p).convert("RGB"), Image.open(fb[i - dari]).convert("RGB")) for i, p in still if i - dari < len(fb)]
    if dt:
        M["dua_token"] = {"edge_struktur": round(float(np.mean([x["edge_struktur"] for x in dt])), 4), "ssim_struktur": round(float(np.mean([x["ssim_struktur"] for x in dt])), 4),
                          "selisih_piksel": round(float(np.mean([x["selisih_piksel"] for x in dt])), 2)}
        if M["dua_token"]["edge_struktur"] < AMBANG["token_edge_min"]: G.append(f"dua token: struktur tepi {M['dua_token']['edge_struktur']} < {AMBANG['token_edge_min']}")
        if M["dua_token"]["selisih_piksel"] < AMBANG["token_piksel_min"]: G.append(f"dua token: piksel nyaris sama ({M['dua_token']['selisih_piksel']} < {AMBANG['token_piksel_min']})")
    else: G.append("dua token: frame B tidak tersedia")
    return M, G, D, still


def _kotak(im, w, h):
    im = im.convert("RGB"); r = min(w / im.width, h / im.height); im = im.resize((max(1, int(im.width * r)), max(1, int(im.height * r))), Image.LANCZOS)
    c = Image.new("RGB", (w, h), (128, 128, 128)); c.paste(im, ((w - im.width) // 2, (h - im.height) // 2)); return c


def lembar(still, spec, meta, keluar):
    """SATU gambar gabungan: tiap baris [referensi (kiri) | kandidat (kanan)], sel berukuran sama. Referensi = struktur terdekat."""
    portrait = meta["height"] > meta["width"]; W, H = (270, 480) if portrait else (480, 270); refs = referensi(spec); baris = []
    for i, p in still[:4]:
        a = Image.open(p).convert("RGB"); best, bs = None, -1
        for r in refs:
            s = metrik.struktur(a, Image.open(r).convert("RGB"))["skor"]
            if s > bs: best, bs = r, s
        row = Image.new("RGB", (2 * W + 6, H), (255, 0, 255))
        if best: row.paste(_kotak(Image.open(best), W, H), (0, 0))
        row.paste(_kotak(a, W, H), (W + 6, 0)); baris.append(row)
    L = Image.new("RGB", (2 * W + 6, sum(r.height for r in baris) + 6 * (len(baris) - 1)), (255, 0, 255)); y = 0
    for r in baris: L.paste(r, (0, y)); y += r.height + 6
    L.save(keluar, quality=86); return keluar


def kritikus(nama, spec, lembar_path, n_baris, frames):
    ja = {k: str(DIR_JANGKAR / v[0]) for k, v in JANGKAR.items()}
    prompt = f"""Kamu kritikus visual motion graphic yang keras. Baca gambar dengan tool Read (path absolut):
GAMBAR GABUNGAN: {lembar_path}
{n_baris} baris, tiap baris = [KIRI referensi terdekat | KANAN kandidat komponen "{nama}"], sel berukuran sama; baris berurutan = frame kandidat {frames}.
JANGKAR DITOLAK (contoh slop yang sudah ditolak pemilik; baca ketiganya):
- j1 {ja['j1']}: {JANGKAR['j1'][1]}
- j2 {ja['j2']}: {JANGKAR['j2'][1]}
- j3 {ja['j3']}: {JANGKAR['j3'][1]}
Yang dinilai HANYA sisi KANAN. Warna, huruf, objek, dan isi kata referensi berbeda dari kandidat itu WAJAR; yang dicari cacat kerja.
Mekanik yang diharapkan tampak (bukan kulit): {json.dumps(spec['mekanik'], ensure_ascii=False)}

TUGAS 1, DAFTAR DOSA (Ya/Tidak biner; "Ya" hanya bila kamu bisa menunjuk baris/lokasi di gambar kanan dan menyebut apa yang terlihat; ragu = Tidak):
""" + "\n".join(f"- {k}: {v}" for k, v in DOSA_VISION.items()) + f"""
TUGAS 2, JANGKAR: untuk j1, j2, j3 jawab Ya bila kandidat MENGULANG pola kegagalan jangkar itu (bukan sekadar mirip warna), dengan bukti.
TUGAS 3, ADVERSARIAL: sebutkan TEPAT 5 hal spesifik (elemen, lokasi, arah perbaikan) yang membuat gambar KANAN terlihat lebih murahan/amatir dibanding KIRI. Hindari kalimat umum.

Balas HANYA satu blok ```json
{{"dosa": {{"b": {{"ya": false, "bukti": ""}}, "c": {{...}}, "e": {{...}}, "f": {{...}}, "g": {{...}}}},
 "jangkar": {{"j1": {{"ya": false, "bukti": ""}}, "j2": {{...}}, "j3": {{...}}}},
 "adversarial": ["...", "...", "...", "...", "..."]}} ```"""
    err = None
    for _ in range(2):
        try:
            j = lib.ambil_json(lib.llm(prompt, baca_di=[DIR_JANGKAR, lib.PABRIK]))
            assert all(isinstance(j["dosa"][k]["ya"], bool) for k in DOSA_VISION) and all(isinstance(j["jangkar"][k]["ya"], bool) for k in JANGKAR)
            j["adversarial"] = [str(x) for x in j["adversarial"]][:5]; assert len(j["adversarial"]) == 5
            return j
        except Exception as e:
            err = e
    raise RuntimeError(f"kritikus gagal: {err}")


def putaran(nama, spec, rnd):
    d = lib.PABRIK / "kandidat" / nama; meta = json.loads((d / "meta.json").read_text())
    pra = sintesis.cek(nama)
    if pra: return {"putaran": rnd, "lulus": False, "gagal": [f"pra-render: {x}" for x in pra], "dosa": {}, "metrik": None, "adversarial": []}
    tulis_entry(nama, meta); out = lib.PABRIK / "out" / nama / f"r{rnd}"
    dari, sampai = meta["urutan"]["dari"], meta["urutan"]["sampai"]
    fa, probe = render(nama, "A", dari, sampai, 1, out / "A"); fb, _ = render(nama, "B", dari, sampai, 0.5, out / "B")
    M, G, D, still = ukur_semua(nama, spec, meta, fa, fb, probe)
    L = lembar(still, spec, meta, d / f"lembar-r{rnd}.jpg")
    sd = d / f"stills-r{rnd}"; sd.mkdir(exist_ok=True)
    for i, p in still:
        Image.open(p).convert("RGB").save(sd / f"A-f{i:03d}.jpg", quality=85)
        if i - dari < len(fb): Image.open(fb[i - dari]).convert("RGB").save(sd / f"B-f{i:03d}.jpg", quality=85)
    V = kritikus(nama, spec, L, min(4, len(still)), [i for i, _ in still][:4])
    for k, v in V["dosa"].items():
        if v["ya"]: D[k] = f"vision: {v['bukti']}"
    for k, v in V["jangkar"].items():
        if v["ya"]: D[k] = f"jangkar {k} ({JANGKAR[k][1][:40]}...): {v['bukti']}"
    gagal = [f"DOSA {k}: {v}" for k, v in sorted(D.items())] + G
    return {"putaran": rnd, "lulus": not gagal, "gagal": gagal, "dosa": D, "metrik": M, "adversarial": V["adversarial"], "vision": V, "lembar": lib.rel(L)}


def tulis_laporan(nama, spec, hasil):
    d = lib.PABRIK / "kandidat" / nama; L = [f"# Laporan uji {nama}", "", f"Spec: `{spec['id']}` ({spec['kategori']}). Lulus = nol dosa (skrip + vision + jangkar) DAN metrik keras dalam ambang (`uji.py` AMBANG).", ""]
    for h in hasil:
        L += [f"## Putaran {h['putaran']}: {'LULUS' if h['lulus'] else 'GAGAL'}", ""]
        L += ["Dosa terpicu: " + (", ".join(f"{k}" for k in sorted(h.get("dosa", {}))) or "tidak ada"), ""]
        if h.get("gagal"): L += ["Temuan:"] + [f"- {x}" for x in h["gagal"]] + [""]
        if h.get("metrik"):
            M = h["metrik"]; b = M["banding"]; s = M["struktur"]; g = M["gerak"]; t = M.get("dua_token")
            L += ["| Metrik | Nilai |", "|---|---|",
                  f"| banding F1 terpicu / F3 jarang (dari {b['n']} still) | {b['f1_terpicu']} / {b['f3_jarang']} |",
                  f"| fokus kecil-tengah, sampel berturut maks | {M['pola_tengah']['berturut_maks']} dari {M['pola_tengah']['sampel']} |",
                  f"| probe: teks kecil / tabrakan / terpotong | {M['probe']['teks_kecil']} / {M['probe']['tabrakan']} / {M['probe']['terpotong']} (frame {M['probe']['frame_terprobe']}) |",
                  f"| warna luar palet | {M['palet']['luar_palet'] or 'tidak ada'} |",
                  f"| struktur vs referensi (terbaik; rata-rata per ref; n ref) | {s['skor']} (ssim {s['ssim']}, edge {s['edge']}; frame {s['frame']} vs `{s['ref']}`); {s['rata_terbaik_per_ref']}; {s['n_ref']} |",
                  f"| gerak ({g['kategori']}) | frame berubah {g['frame_berubah']}" + (f"; lintasan {json.dumps(g.get('lintasan'))}" if 'lintasan' in g else "") + " |"]
            if t: L.append(f"| dua token (edge / ssim / selisih piksel) | {t['edge_struktur']} / {t['ssim_struktur']} / {t['selisih_piksel']} |")
            L.append("")
        if h.get("adversarial"): L += ["5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):"] + [f"{n}. {x}" for n, x in enumerate(h["adversarial"], 1)] + [""]
        if h.get("lembar"): L += [f"Lembar side-by-side (referensi kiri | kandidat kanan): `{h['lembar']}`", ""]
    (d / "LAPORAN.md").write_text("\n".join(L))


def kalibrasi():
    """Cetak sebaran skor struktur: pasangan sama (warna diubah) vs pasangan tak berhubungan, pada keyframe kartu nyata."""
    import random
    ps = sorted(lib.KEYFRAMES.glob("*.jpg"))[:400]; random.seed(3); ps = random.sample(ps, 40)
    same, diff = [], []
    for p in ps:
        a = Image.open(p).convert("RGB"); inv = Image.fromarray(np.asarray(a)[..., ::-1].copy())  # tukar kanal = warna beda, struktur sama
        same.append(metrik.struktur(a, inv)["skor"])
    for k in range(60):
        a, b = random.sample(ps, 2); diff.append(metrik.struktur(Image.open(a).convert("RGB"), Image.open(b).convert("RGB"))["skor"])
    pct = lambda x, q: round(float(np.percentile(x, q)), 3)
    print(f"sama (kanal ditukar): p5={pct(same, 5)} median={pct(same, 50)}\ntak berhubungan: median={pct(diff, 50)} p90={pct(diff, 90)} p95={pct(diff, 95)} maks={round(max(diff), 3)}")


def kontrol_positif(kartu):
    """Kontrol instrumen: referensi bagus dijadikan 'kandidat' (kiri = kanan). Kritikus yang sehat menjawab Tidak pada hampir semua dosa."""
    kf = [p for p in lib.keyframes(kartu) if "urutan" not in p.name][:3]; W, H = 480, 270
    L = Image.new("RGB", (2 * W + 6, 3 * H + 12), (255, 0, 255))
    for r, p in enumerate(kf):
        im = _kotak(Image.open(p), W, H); L.paste(im, (0, r * (H + 6))); L.paste(im, (W + 6, r * (H + 6)))
    out = lib.PABRIK / "out" / f"kontrol-{kartu}.jpg"; out.parent.mkdir(exist_ok=True); L.save(out, quality=86)
    spec = {"mekanik": ["(kontrol: tata letak dan proporsi apa adanya)"], "kulit": []}
    V = kritikus(f"kontrol-{kartu}", spec, out, len(kf), [0, 1, 2])
    print(json.dumps({k: v["ya"] for k, v in {**V["dosa"], **V["jangkar"]}.items()}, ensure_ascii=False)); print(json.dumps(V, ensure_ascii=False, indent=1)[:1500])


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("nama", nargs="?"); ap.add_argument("--putaran", type=int, default=3); ap.add_argument("--tanpa-revisi", action="store_true")
    ap.add_argument("--spec"); ap.add_argument("--kalibrasi", action="store_true"); ap.add_argument("--kontrol-positif", metavar="KARTU")
    a = ap.parse_args(argv)
    if a.kalibrasi: kalibrasi(); return 0
    if a.kontrol_positif: kontrol_positif(a.kontrol_positif); return 0
    if not a.nama: ap.error("nama kandidat wajib")
    d = lib.PABRIK / "kandidat" / a.nama
    if a.spec: (d / "spec.txt").write_text(a.spec + "\n")
    sp = Path((d / "spec.txt").read_text().strip()); sp = sp if sp.is_absolute() else lib.PABRIK / sp
    spec = json.loads(sp.read_text())
    hasil = []
    for rnd in range(1, a.putaran + 1):
        print(f"== {a.nama}: putaran {rnd}", file=sys.stderr)
        try:
            h = putaran(a.nama, spec, rnd)
        except Exception as e:
            h = {"putaran": rnd, "lulus": False, "gagal": [f"galat render/uji: {str(e)[:600]}"], "dosa": {}, "metrik": None, "adversarial": []}
        hasil.append(h); tulis_laporan(a.nama, spec, hasil)
        print(f"   {'LULUS' if h['lulus'] else 'GAGAL'}: " + ("; ".join(h["gagal"])[:400] if h["gagal"] else "nol dosa, metrik lolos"), file=sys.stderr)
        if h["lulus"] or rnd == a.putaran or a.tanpa_revisi: break
        sintesis.sintesis(sp, a.nama, revisi={"dosa_terpicu": h["gagal"], "adversarial_5_hal": h["adversarial"], "metrik": h["metrik"]})
    fin = hasil[-1]
    (d / "hasil.json").write_text(json.dumps({"nama": a.nama, "spec": lib.rel(sp), "lulus": fin["lulus"], "putaran": fin["putaran"],
                                              "metrik": fin["metrik"], "dosa": fin.get("dosa", {}), "adversarial": fin.get("adversarial", []), "gagal": fin["gagal"], "lembar": fin.get("lembar"),
                                              "riwayat": [{"putaran": h["putaran"], "lulus": h["lulus"], "dosa": sorted(h.get("dosa", {})), "gagal": h["gagal"], "adversarial": h.get("adversarial", [])} for h in hasil],
                                              "tanggal": datetime.date.today().isoformat()}, ensure_ascii=False, indent=1) + "\n")
    return 0 if fin["lulus"] else 1


if __name__ == "__main__":
    sys.exit(main())
