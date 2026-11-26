#!/usr/bin/env python3
"""uji.py: fase 3. Uji visual otomatis satu kandidat; gagal -> revisi lewat sintesis (maks 3 putaran).

  uji.py <Nama> [--putaran 3] [--tanpa-revisi] [--spec spec/X.json] [--kalibrasi] [--kontrol-positif KARTU]

Tiap putaran: (0) lint + tsc + kontrak demo (palet A/B = tokens-netral.json, hex Demo hanya dari palet); (1) render `remotion render --sequence`:
A skala 1 (dengan probe DOM), A dengan teks disembunyikan (`--props={"sembunyikanTeks":true}`; selisih = mask teks), B skala 0,5;
(2) metrik keras: struktur vs frame referensi SELARAS WAKTU (klip: waktu relatif ternormalisasi; statis: dinyatakan statis, tanpa metrik
struktur/gerak temporal dan status maksimum teruji-sebagian), gerak (lintasan centroid vs kurva spec), dua set token; (3) DAFTAR DOSA biner,
satu "Ya" = TOLAK, tanpa skor:
  skrip : a gradien ragu-ragu (banding.py F1) | d elemen kecil di tengah >= 3 sampel berturut | h teks < 24px@1080 |
          i warna di luar palet token (cek-warna.mjs warna-nyasar + palet_check) | j teks tertutup > 10 % piksel/titik oleh elemen lain,
          teks tabrakan, teks keluar kotak wadah, teks tak terlihat | o lapisan non-teks di atas bbox teks pada frame mana pun |
          p kulit referensi bocor (warna-nyasar yang dekat palet referensi) | m ruang negatif < 50 % | n grain > 2 % (m, n: komponen berlatar)
  vision: b noda radial pojok | c benda 3D generik | e halo di belakang teks | f blur pada teks | g placeholder | k pola warna dari noise |
          l orb/sumber cahaya utuh di dalam frame (k, l: komponen berlatar) | q ada elemen menutupi/memotong teks (per frame) |
          r frame tampak rusak/glitch (per frame)
  jangkar: kandidat mengulang pola salah satu dari 3 jangkar ditolak (Ya/Tidak per jangkar, dosa tambahan)
Kritikus vision menerima SATU gambar gabungan (referensi kiri | kandidat kanan, ukuran sama, pasangan selaras) dan diminta menyebut 5 hal yang
membuat kanan tampak lebih murahan/amatir; daftar itu BUKAN syarat lulus, hanya masukan revisi.
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
    "struktur_paired_min": 0.15,    # rata-rata skor struktur (SSIM+edge)/2 pasangan SELARAS waktu; juga harus >= rata-rata pasangan tak selaras
    "gerak_rms_maks": 0.15,         # RMS progres terukur vs kurva spec (0..1), gerak_kamera (hanya bila referensi berklip)
    "gerak_rasio_durasi": (0.5, 2.0),
    "frame_berubah_min": 0.25,      # bagian pasangan frame berurutan yang berubah (kategori non-kamera)
    "token_edge_min": 0.80,         # struktur sama antar dua set token (edge_warna)
    "token_piksel_min": 12.0,       # selisih RGB rata-rata antar dua set token (0..255)
    "palet_de": 12.0, "palet_luas": 0.005,
    "teks_min_px": 24.0, "fokus_berturut": 3,
    "ruang_negatif_min": 0.5, "grain_maks": 0.02,
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
DOSA_LATAR = {
    "k": "pola warna latar dibentuk noise (tampak seperti asap/lava lamp/awan bergolak) alih-alih gradien Gaussian yang bersih",
    "l": "sumber cahaya/orb UTUH terlihat di dalam frame alih-alih ekor cahaya yang datang dari luar layar",
}
JAWAB_FRAME = {"q": "ada elemen yang menutupi atau memotong teks", "r": "frame ini terlihat rusak/glitch (tumpukan acak, potongan tak wajar, artefak)"}


def _banding():
    s = importlib.util.spec_from_file_location("banding", lib.MG / "scripts/banding.py"); m = importlib.util.module_from_spec(s); s.loader.exec_module(m); return m


PROBE_JS = """
const probeOklusi = (frame: number) => {
  const st = document.createElement('style'); st.textContent = '*{pointer-events:auto !important}'; document.head.appendChild(st);
  const out: any[] = [];
  const eff = (e: Element | null) => { let o = 1; while (e) { const cs = getComputedStyle(e); o *= parseFloat(cs.opacity || '1'); if (cs.visibility === 'hidden' || cs.display === 'none') return 0; e = e.parentElement; } return o; };
  const rel = (a: Element, b: Element) => a === b || a.contains(b) || b.contains(a);
  const punyaTeks = (e: Element) => Array.from(e.childNodes).some((n) => n.nodeType === 3 && (n.textContent || '').trim());
  const dicat = (e: Element) => {
    const cs = getComputedStyle(e); if (parseFloat(cs.opacity) < 0.05 || cs.visibility === 'hidden') return false;
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
        fs: parseFloat(cs.fontSize) * ((el as HTMLElement).offsetWidth > 0 ? r.width / (el as HTMLElement).offsetWidth : 1), op: eff(el),
        tutup: nS ? nT / nS : 0, tutup_objek: nS ? nO / nS : 0,
        wadah_keluar: q.x < r.x - pad || q.y < r.y - pad || q.right > r.right + pad || q.bottom > r.bottom + pad });
    });
  });
  document.head.removeChild(st);
  console.log('PROBE:' + JSON.stringify({ frame, items: out }));
};
"""


def frame_probe(meta):
    d, s = meta["urutan"]["dari"], meta["urutan"]["sampai"]
    return sorted(set(meta["stills"]) | set(range(d, s + 1, 3)))


def tulis_entry(nama, meta):
    d = lib.PABRIK / "kandidat" / nama; fp = json.dumps(frame_probe(meta))
    (d / "entry.tsx").write_text(f"""// dibuat otomatis oleh pabrik/uji.py dari meta.json; jangan disunting.
import React, {{ useLayoutEffect }} from 'react';
import {{ Composition, getInputProps, registerRoot, useCurrentFrame }} from 'remotion';
import {{ DemoA, DemoB }} from './Demo';
import meta from './meta.json';
{PROBE_JS}
const FRAME_PROBE: number[] = {fp};
const SEMBUNYI = '*{{color:transparent !important;-webkit-text-fill-color:transparent !important;text-shadow:none !important}}text,tspan{{fill:transparent !important}}';
const Probe: React.FC<{{ c: React.FC }}> = ({{ c: C }}) => {{
  const frame = useCurrentFrame(); const sembunyi = !!(getInputProps() as any).sembunyikanTeks;
  useLayoutEffect(() => {{ if (!sembunyi && FRAME_PROBE.includes(frame)) probeOklusi(frame); }}, [frame]);
  return <>{{sembunyi ? <style>{{SEMBUNYI}}</style> : null}}<C /></>;
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


def render(nama, comp, dari, sampai, scale, keluar, props=None):
    """-> (daftar path frame berurut, {frame: [item teks probe]})."""
    keluar = Path(keluar)
    if keluar.exists(): shutil.rmtree(keluar)
    cmd = [str(lib.MG / "node_modules/.bin/remotion"), "render", f"kandidat/{nama}/entry.tsx", comp, str(keluar), "--sequence", "--image-format=jpeg",
           "--jpeg-quality=90", f"--scale={scale}", f"--frames={dari}-{sampai}", "--config=remotion.config.ts", "--concurrency=2", "--log=verbose"]
    if props: cmd.append("--props=" + json.dumps(props))
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


# ---------- referensi selaras ----------
def referensi_statis(spec):
    """Keyframe referensi berbeda-beda (bukan lembar klip/strip urutan), urut kartu. Tidak selaras waktu."""
    ps = []
    for b in spec["bukti"]:
        p = lib.MG / b["frame"]
        if p.exists() and "-klip" not in p.name and "urutan" not in p.name and p not in ps: ps.append(p)
    for p in lib.keyframes(spec["kartu"]):
        if "urutan" not in p.name and p not in ps: ps.append(p)
    return ps


def sampel_selaras(spec, meta, n_ekstra=4):
    """Klip: [(frame_demo, t_referensi, PIL ref)] untuk stills + n_ekstra sampel merata (u = posisi relatif di rentang urutan)."""
    path, _, _ = lib.spec_klip(spec); d, s = meta["urutan"]["dari"], meta["urutan"]["sampai"]
    fr = sorted(set(meta["stills"]) | {round(d + (s - d) * k / (n_ekstra + 1)) for k in range(1, n_ekstra + 1)})
    out = []
    for i in fr:
        u = (i - d) / max(1, s - d); t = lib.waktu_referensi(spec, u); out.append((i, t, lib.frame_klip(path, t)))
    return out


def energi(frames, n=20):
    """Kurva energi gerak ternormalisasi (n titik) dari urutan PIL: selisih mutlak antar frame berurutan."""
    g = [np.asarray(f.convert("L").resize((96, 54)), np.float32) for f in frames]
    e = np.array([np.abs(g[k] - g[k - 1]).mean() for k in range(1, len(g))]); e = e / (e.max() + 1e-9)
    return np.interp(np.linspace(0, len(e) - 1, n), np.arange(len(e)), e)


def cek_warna(cmd, *args):
    """Panggil scripts/warna/cek-warna.mjs; -> (kode keluar, json stdout atau None)."""
    r = subprocess.run([str(lib.NODE_BIN / "node"), str(lib.MG / "scripts/warna/cek-warna.mjs"), cmd, *map(str, args), "--json"], capture_output=True, text=True, env=lib.env_node(), timeout=300)
    try: return r.returncode, json.loads(r.stdout)
    except Exception: return r.returncode, None


def hex_acuan(spec, meta, sel, statis, out):
    """Warna referensi (hex_semua dari `cek-warna masuk` pada frame referensi yang dipakai uji)."""
    out.mkdir(parents=True, exist_ok=True); pngs = []
    if statis: srcs = [Image.open(p).convert("RGB") for p in referensi_statis(spec)[:8]]
    else: srcs = [x[2] for x in sel]
    for k, im in enumerate(srcs): p = out / f"ref-{k}.png"; im.save(p); pngs.append(p)
    kode, j = cek_warna("masuk", *pngs, "--out", out / "ref-palet.json")
    return (j or {}).get("hex_semua") or (json.loads((out / "ref-palet.json").read_text()).get("hex_semua") if (out / "ref-palet.json").exists() else [])


def pakai_latar(nama):
    d = lib.PABRIK / "kandidat" / nama
    return any(re.search(r"toolkit/latar/", (d / f).read_text()) for f in (f"{nama}.tsx", "Demo.tsx"))


def ukur_semua(nama, spec, meta, fa, fh, fb, probe, out):
    """-> (metrik, gagal_metrik, dosa_skrip, still, pasangan_lembar). dosa_skrip = {kode: bukti}."""
    B = _banding(); RS = B.RS; dari = meta["urutan"]["dari"]; M = {}; G = []; D = {}
    still = [(i, fa[i - dari]) for i in meta["stills"] if 0 <= i - dari < len(fa)]
    klip = lib.spec_klip(spec) is not None; statis = not klip
    # a, d
    f1, f3, bm = [], 0, []
    for i, p in still:
        _, m, a, c = B.ukur(str(p)); f1.append(bool(a)); f3 += bool(c); bm.append({"frame": i, "luma_range": m["luma_range"], "sat_p95": m["sat_p95"], "fokus_pct": m["fokus_pct"]})
    M["banding"] = {"per_still": bm, "f1_terpicu": int(sum(f1)), "f3_jarang": f3, "n": len(still)}
    if any(f1): D["a"] = f"banding.py F1 gradien ragu-ragu di frame {[i for (i, _), x in zip(still, f1) if x]}"
    run = best = 0; pola = 0
    for k in range(0, len(fa), 2):
        ya = bool(B.pola_tengah(RS.metrik(Image.open(fa[k]).convert("RGB")))); pola += 1
        run = run + 1 if ya else 0; best = max(best, run)
    M["pola_tengah"] = {"sampel": pola, "berturut_maks": best}
    if best >= AMBANG["fokus_berturut"]: D["d"] = f"fokus < 20 % dan pusat dalam ±12 % tengah pada {best} sampel berturut (stride 2 frame)"
    # h, j, o: probe DOM + mask teks
    ph = {"kecil": [], "tabrakan": [], "terpotong": []}; per_frame_vis = {}
    for i, items in probe.items():
        r = metrik.analisis_probe([dict(x, tag="div") for x in items], meta["width"], meta["height"], AMBANG["teks_min_px"])
        for k in ph: ph[k] += [f"f{i}: {x}" for x in r[k]]
    okl = metrik.analisis_oklusi(probe)
    tak = []
    for i, p in still:
        if i in probe and i - dari < len(fh):
            n_vis = sum(1 for x in probe[i] if x["op"] >= 0.9 and x.get("tutup", 0) < 0.5)
            frac, hilang = metrik.teks_tak_terlihat(Image.open(p), Image.open(fh[i - dari]).convert("RGB"), n_vis)
            if hilang: tak.append(f"f{i}: teks ada di DOM tetapi selisih render penuh vs tanpa-teks {frac}")
    M["probe"] = {"frame_terprobe": len(probe), "teks_kecil": len(ph["kecil"]), "tabrakan": len(ph["tabrakan"]), "tutup_j": len(okl["j"]), "lapisan_o": len(okl["o"]), "teks_tak_terlihat": len(tak)}
    if not probe: G.append("probe DOM kosong: dosa h/j/o tidak terukur")
    if ph["kecil"]: D["h"] = "; ".join(ph["kecil"][:4])
    jj = ph["tabrakan"] + okl["j"] + tak
    if jj: D["j"] = "; ".join(jj[:5])
    if okl["o"]: D["o"] = "; ".join(okl["o"][:5])
    # i, p: palet token (cek-warna.mjs + python), referensi
    sel = sampel_selaras(spec, meta) if klip else []
    ref_hex = hex_acuan(spec, meta, sel, statis, out / "ref")
    M["palet"] = {"cek_warna_nyasar": [], "luar_palet": [], "kulit_bocor": [], "referensi_hex": ref_hex[:8]}
    for set_, frames, scale in (("A", still, 1), ("B", [(i, fb[i - dari]) for i, _ in still if i - dari < len(fb)], 0.5)):
        pj = out / f"palet-{set_}.json"; pj.write_text(json.dumps(lib.palet_json(set_)))
        for i, p in frames:
            png = out / f"cw-{set_}-{i}.png"; Image.open(p).convert("RGB").save(png)
            kode, j = cek_warna("keluar", png, "--palet", pj)
            if j is None: G.append(f"cek-warna.mjs tak terukur ({set_} f{i}, kode {kode})"); continue
            for a in j.get("alasan", []):
                if a.get("jenis") == "warna-nyasar":
                    kl = ref_hex and float(np.min(metrik.de2000(metrik._lab([metrik.hex_rgb(a["hex"])])[:, None, :], metrik._lab([metrik.hex_rgb(h) for h in ref_hex])[None, :, :]))) < 12
                    M["palet"]["cek_warna_nyasar"].append(f"{set_} f{i}: {a['hex']} {a['luas']}%" + (" (dekat warna referensi)" if kl else ""))
                    (M["palet"]["kulit_bocor"] if kl else M["palet"]["luar_palet"]).append(f"{set_} f{i}: {a['hex']} {a['luas']}%")
            pd = metrik.palet_dosa(Image.open(p), lib.palet_token(set_), AMBANG["palet_luas"], AMBANG["palet_de"])
            if pd["dosa"]: M["palet"]["luar_palet"].append(f"{set_} f{i} (palet_dosa): {pd['luas'] * 100:.2f}% {pd['warna_dominan']}")
            if ref_hex:
                lp = metrik.luar_palet_dekat(Image.open(p), lib.palet_token(set_), ref_hex)
                if lp["dosa"]: M["palet"]["kulit_bocor"].append(f"{set_} f{i} (palet vs referensi): {lp['luas'] * 100:.2f}% {lp['warna_dominan']}")
    if M["palet"]["kulit_bocor"]: D["p"] = "kulit referensi bocor: " + "; ".join(sorted(set(M["palet"]["kulit_bocor"]))[:4])
    if M["palet"]["luar_palet"]: D["i"] = "warna di luar palet token: " + "; ".join(sorted(set(M["palet"]["luar_palet"]))[:4])
    # k-n (komponen berlatar)
    latar = pakai_latar(nama); M["latar"] = {"dipakai": latar}
    if latar:
        rn = [metrik.ruang_negatif(Image.open(p), lib.TOKENS["A"]["latar"]) for _, p in still]; gr = [metrik.grain_estimasi(Image.open(p)) for _, p in still]
        M["latar"].update({"ruang_negatif_rata": round(float(np.mean(rn)), 3), "grain_maks": round(float(max(gr)), 4)})
        if np.mean(rn) < AMBANG["ruang_negatif_min"]: D["m"] = f"ruang negatif {np.mean(rn):.2f} < {AMBANG['ruang_negatif_min']}"
        if max(gr) > AMBANG["grain_maks"]: D["n"] = f"grain {max(gr):.3f} > {AMBANG['grain_maks']}"
    # struktur (selaras waktu) dan gerak
    seq = [Image.open(p).convert("RGB") for p in fa]
    diffs = [float(np.abs(np.asarray(seq[k].resize((192, 108)), np.float32) - np.asarray(seq[k - 1].resize((192, 108)), np.float32)).mean()) for k in range(1, len(seq))]
    berubah = float(np.mean([d > 0.3 for d in diffs])) if diffs else 0.0
    M["gerak"] = {"frame_berubah": round(berubah, 3), "kategori": spec["kategori"]}
    pasangan = []
    if statis:
        M["struktur"] = {"statis": True, "catatan": "referensi hanya keyframe: tidak ada metrik struktur/gerak temporal; status maksimum teruji-sebagian"}
        ks = referensi_statis(spec)
        for k, (i, p) in enumerate(still[:4]):
            if ks: pasangan.append((i, Image.open(ks[k % len(ks)]).convert("RGB"), f"statis k{k % len(ks) + 1}"))
        if berubah < AMBANG["frame_berubah_min"]: G.append(f"gerak: hanya {berubah:.2f} pasangan frame berubah (< {AMBANG['frame_berubah_min']})")
    else:
        cand = {i: Image.open(fa[i - dari]).convert("RGB") for i, _, _ in sel}
        P = [metrik.struktur(cand[i], r)["skor"] for i, t, r in sel]
        X = [metrik.struktur(cand[i], r2)["skor"] for i, _, _ in sel for j, t2, r2 in sel if j != i]
        M["struktur"] = {"statis": False, "paired": round(float(np.mean(P)), 4), "tak_selaras": round(float(np.mean(X)), 4), "n": len(sel),
                         "per_sampel": [{"frame": i, "t_ref": round(t, 2), "skor": s} for (i, t, _), s in zip(sel, P)]}
        if np.mean(P) < max(AMBANG["struktur_paired_min"], np.mean(X)):
            G.append(f"struktur selaras waktu {np.mean(P):.3f} < max({AMBANG['struktur_paired_min']}, tak-selaras {np.mean(X):.3f})")
        pasangan = [(i, r, f"t={t:.2f}s") for i, t, r in sel if i in dict(still)]
        path, a0, b0 = lib.spec_klip(spec); n = int((b0 - a0) * 10) + 1
        try:
            ref_en = energi([lib.frame_klip(path, a0 + (b0 - a0) * k / max(1, n - 1), 160) for k in range(n)])
            M["gerak"]["energi_korelasi"] = round(float(np.corrcoef(ref_en, energi(seq))[0, 1]), 3)  # informasi, bukan syarat
        except Exception: pass
        if spec["kategori"] == "gerak_kamera":
            prog, rentang = metrik.progres(metrik.lintasan(seq))
            g = metrik.bandingkan_gerak(prog, meta["fps"], spec["parameter"], rentang=rentang); M["gerak"]["rentang_centroid"] = round(rentang, 4)
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
    return M, G, D, still, pasangan, statis


def _kotak(im, w, h):
    im = im.convert("RGB"); r = min(w / im.width, h / im.height); im = im.resize((max(1, int(im.width * r)), max(1, int(im.height * r))), Image.LANCZOS)
    c = Image.new("RGB", (w, h), (128, 128, 128)); c.paste(im, ((w - im.width) // 2, (h - im.height) // 2)); return c


def lembar(still, pasangan, meta, keluar, statis):
    """SATU gambar gabungan: tiap baris [referensi (kiri) | kandidat (kanan)], sel sama besar. Klip: referensi pada waktu relatif yang sama;
    statis: keyframe berbeda berurutan, diberi label 'statis'."""
    from PIL import ImageDraw
    portrait = meta["height"] > meta["width"]; W, H = (270, 480) if portrait else (480, 270); baris = []; cp = dict(still)
    for i, ref, label in pasangan[:4]:
        row = Image.new("RGB", (2 * W + 6, H), (255, 0, 255))
        row.paste(_kotak(ref, W, H), (0, 0)); row.paste(_kotak(Image.open(cp[i]), W, H), (W + 6, 0))
        d = ImageDraw.Draw(row); d.rectangle([0, 0, 150, 13], fill=(0, 0, 0)); d.text((3, 1), f"ref {label}", fill=(255, 255, 0))
        d.rectangle([W + 6, 0, W + 6 + 70, 13], fill=(0, 0, 0)); d.text((W + 9, 1), f"demo f{i}", fill=(255, 255, 0)); baris.append(row)
    L = Image.new("RGB", (2 * W + 6, sum(r.height for r in baris) + 6 * (len(baris) - 1)), (255, 0, 255)); y = 0
    for r in baris: L.paste(r, (0, y)); y += r.height + 6
    L.save(keluar, quality=86); return keluar


def kritikus(nama, spec, lembar_path, n_baris, frames, latar=False, statis=False):
    ja = {k: str(DIR_JANGKAR / v[0]) for k, v in JANGKAR.items()}
    dosa = dict(DOSA_VISION, **(DOSA_LATAR if latar else {}))
    sinkron = ("Referensi di kiri STATIS (keyframe berbeda, tidak selaras waktu dengan demo)." if statis else "Referensi di kiri diambil pada waktu relatif yang sama dengan frame demo di kanan.")
    prompt = f"""Kamu kritikus visual motion graphic yang keras. Baca gambar dengan tool Read (path absolut):
GAMBAR GABUNGAN: {lembar_path}
{n_baris} baris, tiap baris = [KIRI referensi | KANAN kandidat komponen "{nama}"], sel berukuran sama; baris berurutan = frame kandidat {frames}. {sinkron}
JANGKAR DITOLAK (contoh slop yang sudah ditolak pemilik; baca ketiganya):
- j1 {ja['j1']}: {JANGKAR['j1'][1]}
- j2 {ja['j2']}: {JANGKAR['j2'][1]}
- j3 {ja['j3']}: {JANGKAR['j3'][1]}
Yang dinilai HANYA sisi KANAN. Warna, huruf, objek, dan isi kata referensi berbeda dari kandidat itu WAJAR; yang dicari cacat kerja.
Mekanik yang diharapkan tampak (bukan kulit): {json.dumps(spec['mekanik'], ensure_ascii=False)}

TUGAS 1, DAFTAR DOSA (Ya/Tidak biner; "Ya" hanya bila kamu bisa menunjuk baris/lokasi di gambar kanan dan menyebut apa yang terlihat; ragu = Tidak):
""" + "\n".join(f"- {k}: {v}" for k, v in dosa.items()) + f"""
TUGAS 2, PER BARIS (jawab untuk SETIAP baris 1..{n_baris}, Ya/Tidak dengan bukti lokasi):
- menutupi_teks: {JAWAB_FRAME['q']}? (blok warna, grid, panel, kartu, atau tepi frame yang menutupi/memotong huruf)
- rusak: {JAWAB_FRAME['r']}?
TUGAS 3, JANGKAR: untuk j1, j2, j3 jawab Ya bila kandidat MENGULANG pola kegagalan jangkar itu (bukan sekadar mirip warna), dengan bukti.
TUGAS 4, ADVERSARIAL: sebutkan TEPAT 5 hal spesifik (elemen, lokasi, arah perbaikan) yang membuat gambar KANAN terlihat lebih murahan/amatir dibanding KIRI. Hindari kalimat umum.

Balas HANYA satu blok ```json
{{"dosa": {{"b": {{"ya": false, "bukti": ""}}, ...satu entri per kode: {', '.join(dosa)}}},
 "per_baris": [{{"baris": 1, "menutupi_teks": {{"ya": false, "bukti": ""}}, "rusak": {{"ya": false, "bukti": ""}}}}, ...],
 "jangkar": {{"j1": {{"ya": false, "bukti": ""}}, "j2": {{...}}, "j3": {{...}}}},
 "adversarial": ["...", "...", "...", "...", "..."]}} ```"""
    err = None
    for _ in range(2):
        try:
            j = lib.ambil_json(lib.llm(prompt, baca_di=[DIR_JANGKAR, lib.PABRIK]))
            assert all(isinstance(j["dosa"][k]["ya"], bool) for k in dosa) and all(isinstance(j["jangkar"][k]["ya"], bool) for k in JANGKAR)
            assert len(j["per_baris"]) >= n_baris and all(isinstance(r[k]["ya"], bool) for r in j["per_baris"] for k in ("menutupi_teks", "rusak"))
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
    fa, probe = render(nama, "A", dari, sampai, 1, out / "A"); fh, _ = render(nama, "A", dari, sampai, 1, out / "H", props={"sembunyikanTeks": True})
    fb, _ = render(nama, "B", dari, sampai, 0.5, out / "B")
    M, G, D, still, pasangan, statis = ukur_semua(nama, spec, meta, fa, fh, fb, probe, out)
    L = lembar(still, pasangan, meta, d / f"lembar-r{rnd}.jpg", statis)
    sd = d / f"stills-r{rnd}"; sd.mkdir(exist_ok=True)
    for i, p in still:
        Image.open(p).convert("RGB").save(sd / f"A-f{i:03d}.jpg", quality=85)
        if i - dari < len(fb): Image.open(fb[i - dari]).convert("RGB").save(sd / f"B-f{i:03d}.jpg", quality=85)
    n_baris = min(4, len(pasangan)); frames = [i for i, _, _ in pasangan][:4]
    V = kritikus(nama, spec, L, n_baris, frames, latar=M["latar"]["dipakai"], statis=statis)
    for k, v in V["dosa"].items():
        if v["ya"]: D[k] = f"vision: {v['bukti']}"
    for r in V["per_baris"][:n_baris]:
        if r["menutupi_teks"]["ya"]: D["q"] = f"vision baris {r['baris']} (f{frames[min(r['baris'], len(frames)) - 1]}): {r['menutupi_teks']['bukti']}"
        if r["rusak"]["ya"]: D["r"] = f"vision baris {r['baris']} (f{frames[min(r['baris'], len(frames)) - 1]}): {r['rusak']['bukti']}"
    for k, v in V["jangkar"].items():
        if v["ya"]: D[k] = f"jangkar {k} ({JANGKAR[k][1][:40]}...): {v['bukti']}"
    gagal = [f"DOSA {k}: {v}" for k, v in sorted(D.items())] + G
    return {"putaran": rnd, "lulus": not gagal, "gagal": gagal, "dosa": D, "metrik": M, "adversarial": V["adversarial"], "vision": V, "lembar": lib.rel(L), "statis": statis}


def tulis_laporan(nama, spec, hasil):
    d = lib.PABRIK / "kandidat" / nama; L = [f"# Laporan uji {nama}", "", f"Spec: `{spec['id']}` ({spec['kategori']}). Lulus = nol dosa (skrip + vision + jangkar) DAN metrik keras dalam ambang (`uji.py` AMBANG).", ""]
    for h in hasil:
        L += [f"## Putaran {h['putaran']}: {'LULUS' if h['lulus'] else 'GAGAL'}", ""]
        L += ["Dosa terpicu: " + (", ".join(f"{k}" for k in sorted(h.get("dosa", {}))) or "tidak ada"), ""]
        if h.get("gagal"): L += ["Temuan:"] + [f"- {x}" for x in h["gagal"]] + [""]
        if h.get("metrik"):
            M = h["metrik"]; b = M["banding"]; s = M["struktur"]; g = M["gerak"]; t = M.get("dua_token"); p = M["probe"]
            st = "STATIS (keyframe, tanpa metrik struktur/gerak temporal)" if s.get("statis") else f"paired {s['paired']} vs tak-selaras {s['tak_selaras']} (n {s['n']})"
            L += ["| Metrik | Nilai |", "|---|---|",
                  f"| banding F1 terpicu / F3 jarang (dari {b['n']} still) | {b['f1_terpicu']} / {b['f3_jarang']} |",
                  f"| fokus kecil-tengah, sampel berturut maks | {M['pola_tengah']['berturut_maks']} dari {M['pola_tengah']['sampel']} |",
                  f"| probe ({p['frame_terprobe']} frame): teks kecil / tabrakan / tertutup-j / lapisan-o / tak terlihat | {p['teks_kecil']} / {p['tabrakan']} / {p['tutup_j']} / {p['lapisan_o']} / {p['teks_tak_terlihat']} |",
                  f"| warna: nyasar (cek-warna) / luar palet / kulit bocor | {len(M['palet']['cek_warna_nyasar'])} / {len(M['palet']['luar_palet'])} / {len(M['palet']['kulit_bocor'])} |",
                  f"| struktur vs referensi | {st} |",
                  f"| gerak ({g['kategori']}) | frame berubah {g['frame_berubah']}" + (f"; lintasan {json.dumps(g.get('lintasan'))}" if 'lintasan' in g else "") + (f"; korelasi energi vs klip {g['energi_korelasi']}" if 'energi_korelasi' in g else "") + " |",
                  f"| latar | {json.dumps(M['latar'])} |"]
            if t: L.append(f"| dua token (edge / ssim / selisih piksel) | {t['edge_struktur']} / {t['ssim_struktur']} / {t['selisih_piksel']} |")
            L.append("")
        if h.get("adversarial"): L += ["5 hal yang membuat kanan lebih murahan (masukan revisi, bukan syarat lulus):"] + [f"{n}. {x}" for n, x in enumerate(h["adversarial"], 1)] + [""]
        if h.get("lembar"): L += [f"Lembar side-by-side (referensi kiri | kandidat kanan{'; referensi statis' if h.get('statis') else ', selaras waktu'}): `{h['lembar']}`", ""]
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
