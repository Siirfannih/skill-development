#!/usr/bin/env python3
"""Periksa file SFX sebelum dipasang (Tier 3 sumber SFX, guide/sfx/FAMILI.md §Periksa).

Mengukur, per file:
  - awal sunyi (ms sampai selubung pertama kali > puncak −30 dB) dan letak puncak → untuk `align: peak`;
  - serangan (ms dari puncak −20 dB ke puncak −1 dB) dan lonjakan terbesar dalam 50 ms dari bunyi yang sudah terdengar (dB);
  - ekor (ms dari puncak sampai < puncak −30 dB) dan level 20 ms terakhir (file terpotong kering?);
  - desis: run terpanjang bunyi aktif yang > 50 % energinya di atas 10 kHz (klik renyah ±10–20 ms, desis ≥ 100 ms);
  - pita: % energi > 10 kHz, 300 Hz–3 kHz (terdengar di speaker HP), < 60 Hz (hanya terasa);
  - centroid, durasi, clipping terekam (% sampel di puncak rata ≥ 3 sampel di 0 dBFS);
  - opsional `--earshot`: label `earshot describe` teratas dan skor realness (rekaman nyata vs sintetis).

Putusan per file: LULUS / PERIKSA / GAGAL, dengan alasan. Dengan `--famili <id>` (id dari FAMILI.json),
durasi, centroid, dan serangan dibandingkan juga dengan rentang yang terukur di video referensi famili itu.

Pakai:
  python3 sfx_vet.py file1.mp3 [file2.wav ...] [--famili air] [--earshot] [--json out.json]
Keluar 1 bila ada GAGAL.
"""
import argparse, json, os, subprocess, sys
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
FAMILI_JSON = os.path.join(HERE, "..", "..", "guide", "sfx", "FAMILI.json")
SR = 44100


def load(path):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"],
                         check=True, capture_output=True).stdout
    return np.frombuffer(raw, dtype=np.float32)


def env_db(y, win_ms=5):
    hop = max(1, int(SR * win_ms / 1000))
    n = max(1, len(y) // hop)
    fr = y[: n * hop].reshape(n, hop)
    return 20 * np.log10(np.sqrt((fr ** 2).mean(axis=1)) + 1e-9), win_ms


def band_pct(y):
    spec = np.abs(np.fft.rfft(y * np.hanning(len(y)))) ** 2
    f = np.fft.rfftfreq(len(y), 1 / SR)
    tot = spec.sum() + 1e-12
    pct = lambda lo, hi: round(100 * spec[(f >= lo) & (f < hi)].sum() / tot, 1)
    centroid = float((f * spec).sum() / tot)
    return dict(diatas_10k=pct(10000, SR / 2), hp_300_3k=pct(300, 3000), sub_60=pct(0, 60)), int(centroid)


def hiss_run_ms(y):
    """Run terpanjang frame 10 ms aktif (≥ puncak−20 dB) yang > 50 % energinya di atas 10 kHz.
    Desis berkelanjutan menghasilkan run panjang; transien klik yang renyah hanya 10–20 ms."""
    n = int(SR * 0.01)
    m = len(y) // n
    if m < 1:
        return 0
    fr = y[: m * n].reshape(m, n) * np.hanning(n)
    S = np.abs(np.fft.rfft(fr, axis=1)) ** 2
    f = np.fft.rfftfreq(n, 1 / SR)
    tot = S.sum(1) + 1e-12
    lv = 10 * np.log10(tot)
    bright = (lv > lv.max() - 20) & (S[:, f >= 10000].sum(1) / tot >= 0.5)
    best = cur = 0
    for b in bright:
        cur = cur + 1 if b else 0
        best = max(best, cur)
    return best * 10


def clip_flat_pct(y):
    """% sampel di puncak rata: ≥ 3 sampel berturut-turut di |y| ≥ 0,999 (clipping terekam, bukan sekadar normalisasi 0 dBFS)."""
    hot = np.abs(y) >= 0.999
    if not hot.any():
        return 0.0
    d = np.diff(np.concatenate(([0], hot.astype(np.int8), [0])))
    st, en = np.where(d == 1)[0], np.where(d == -1)[0]
    flat = sum(int(e - s) for s, e in zip(st, en) if e - s >= 3)
    return round(100 * flat / len(y), 3)


def measure(path):
    try:
        y = load(path)
    except (subprocess.CalledProcessError, OSError):
        return dict(file=path, error="tidak bisa dibaca ffmpeg (bukan audio atau rusak)")
    if len(y) < SR // 100:
        return dict(file=path, error="terlalu pendek/rusak")
    e, w = env_db(y)
    pk = int(np.argmax(e))
    peak_db = float(e[pk])
    above = np.where(e > peak_db - 30)[0]
    lead_ms = int(above[0] * w) if len(above) else 0
    # serangan: titik terakhir sebelum puncak yang masih < puncak−20 dB → titik pertama ≥ puncak−1 dB
    pre = e[: pk + 1]
    lo = np.where(pre < peak_db - 20)[0]
    start = int(lo[-1]) if len(lo) else 0
    hi = np.where(pre >= peak_db - 1)[0]
    attack_ms = int((hi[0] - start) * w) if len(hi) else 0
    k = max(1, 50 // w)
    # lonjakan dalam 50 ms yang dimulai dari bunyi yang sudah terdengar (≥ puncak−27 dB), lantai puncak−30 dB:
    # whoosh yang pra-gulung lalu menyentak (kasar) terukur ±24 dB; whoosh yang mengembang lembut ±12–15 dB.
    ef = np.maximum(e, peak_db - 30)
    if len(ef) > k:
        d = ef[k:] - ef[:-k]
        ok = e[:-k] > peak_db - 27
        rise = float(np.max(d[ok])) if ok.any() else 0.0
    else:
        rise = 0.0
    post = np.where(e[pk:] < peak_db - 30)[0]
    tail_ms = int(post[0] * w) if len(post) else int((len(e) - pk) * w)
    end_rel = float(np.mean(e[-max(1, 20 // w):]) - peak_db)
    bands, centroid = band_pct(y)
    return dict(
        file=path, dur_ms=int(1000 * len(y) / SR), lead_ms=lead_ms, peak_ms=int(pk * w),
        attack_ms=attack_ms, max_rise_50ms_db=round(rise, 1), tail_ms=tail_ms,
        akhir_rel_db=round(end_rel, 1), clip_pct=clip_flat_pct(y),
        centroid_hz=centroid, desis_run_ms=hiss_run_ms(y), **bands,
    )


def earshot_info(path):
    exe = os.environ.get("EARSHOT") or os.path.expanduser("~/work/mg-venv/bin/earshot")
    out = {}
    try:
        d = json.loads(subprocess.run([exe, "describe", path, "--json"], capture_output=True, text=True, timeout=300).stdout)
        tags = d.get("tags") or d.get("calibrated_tags") or []
        out["tags"] = [f'{t.get("tag")} ({t.get("z")})' for t in tags[:3]] if isinstance(tags, list) else tags
        r = json.loads(subprocess.run([exe, "realness", path, "--json"], capture_output=True, text=True, timeout=300).stdout)
        out["realness"] = r.get("verdict") or r.get("label") or r
    except Exception as ex:  # earshot opsional; kegagalan dilaporkan, bukan disembunyikan
        out["error"] = str(ex)[:120]
    return out


def verdict(m, fam=None):
    gagal, periksa = [], []
    if m.get("error"):
        return "GAGAL", [m["error"]], []
    if m["clip_pct"] >= 1.0:
        gagal.append(f'clipping terekam: {m["clip_pct"]} % sampel di puncak rata 0 dBFS')
    elif m["clip_pct"] > 0:
        periksa.append(f'{m["clip_pct"]} % sampel di puncak rata 0 dBFS: dengarkan puncaknya')
    bed = bool(fam and fam.get("pilar") == "bed")  # pilar 1: bed boleh berdesis lembut dan berupa loop
    if m["desis_run_ms"] >= 100 and bed:
        periksa.append(f'bed berdesis {m["desis_run_ms"]} ms: pastikan ≤ −35 LUFS di mix dan terdengar hangat, bukan tajam')
    elif m["desis_run_ms"] >= 100:
        gagal.append(f'desis berkelanjutan {m["desis_run_ms"]} ms (> 50 % energi di atas 10 kHz; ≥ 100 ms)')
    elif m["desis_run_ms"] >= 50:
        periksa.append(f'cerah/berdesis {m["desis_run_ms"]} ms berturut-turut di atas 10 kHz')
    if m["akhir_rel_db"] > -25 and bed:
        periksa.append("bed berakhir tanpa peluruhan (loop): pastikan sambungan loop tidak terdengar")
    elif m["akhir_rel_db"] > -25:
        gagal.append(f'file berakhir terpotong ({m["akhir_rel_db"]} dB dari puncak di 20 ms terakhir): beri fade-out kurva S 150–400 ms')
    if m["lead_ms"] > 50:
        periksa.append(f'awal sunyi {m["lead_ms"]} ms: pasang dengan align peak (puncak di {m["peak_ms"]} ms) atau potong awalnya')
    if m["hp_300_3k"] < 10:
        periksa.append(f'hanya {m["hp_300_3k"]} % energi di 300 Hz–3 kHz: hampir tak terdengar di speaker HP')
    if fam:
        lo, hi = fam.get("dur_ms", [0, 1e9])
        if not lo <= m["dur_ms"] <= hi and not lo <= m["tail_ms"] <= hi:
            periksa.append(f'panjang {m["dur_ms"]} ms di luar rentang famili {lo}–{hi} ms (boleh dipotong di peluruhan)')
        clo, chi = fam.get("centroid_hz", [0, 1e9])
        if not clo <= m["centroid_hz"] <= chi:
            periksa.append(f'centroid {m["centroid_hz"]} Hz di luar famili {clo}–{chi} Hz')
        if fam.get("serangan_min_ms") and m["max_rise_50ms_db"] >= 20:
            gagal.append(f'serangan menyentak: +{m["max_rise_50ms_db"]} dB dalam 50 ms dari bunyi yang sudah terdengar '
                         f'(famili ini butuh mengembang ≥ {fam["serangan_min_ms"]} ms; lembut ±12–15 dB)')
    return ("GAGAL" if gagal else "PERIKSA" if periksa else "LULUS"), gagal, periksa


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("files", nargs="+")
    ap.add_argument("--famili")
    ap.add_argument("--earshot", action="store_true")
    ap.add_argument("--json")
    a = ap.parse_args()
    fam = None
    if a.famili:
        fams = json.load(open(FAMILI_JSON)).get("famili", {})
        if a.famili not in fams:
            sys.exit(f"famili '{a.famili}' tidak ada; pilihan: {', '.join(fams)}")
        fam = fams[a.famili]
    rows, bad = [], 0
    for f in a.files:
        m = measure(f)
        if a.earshot and not m.get("error"):
            m["earshot"] = earshot_info(f)
        v, g, p = verdict(m, fam)
        m.update(putusan=v, gagal=g, periksa=p)
        bad += v == "GAGAL"
        rows.append(m)
        print(f'{v:8} {os.path.basename(f)}')
        if not m.get("error"):
            print(f'         {m["dur_ms"]} ms · awal sunyi {m["lead_ms"]} ms · puncak {m["peak_ms"]} ms · serangan {m["attack_ms"]} ms '
                  f'(lonjakan {m["max_rise_50ms_db"]} dB/50 ms) · ekor {m["tail_ms"]} ms · centroid {m["centroid_hz"]} Hz · '
                  f'desis {m["desis_run_ms"]} ms · >10k {m["diatas_10k"]} % · HP {m["hp_300_3k"]} % · <60 Hz {m["sub_60"]} %')
        for x in g:
            print(f'         GAGAL: {x}')
        for x in p:
            print(f'         periksa: {x}')
        if m.get("earshot"):
            print(f'         earshot: {m["earshot"]}')
    if a.json:
        json.dump(rows, open(a.json, "w"), indent=1, ensure_ascii=False)
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
