#!/usr/bin/env python3
"""Seleksi musik terukur: kandidat diukur dan diberi peringkat terhadap kategori suasana + suara video.

Label genre/mood dari model (termasuk earshot) sering salah (earshot docs/LIMITS.md), jadi keputusan
diambil dari ukuran: tempo, kepadatan ketukan, kecerahan, build/drop, dinamika, mayor/minor, dan
benturan frekuensi dengan suara pembicara pada level mix yang direncanakan.

Pakai:
  python3 music_fit.py --category fokus --voice sumber.mp4 kandidat/*.mp3 [--duration 76] [--json out.json]
  python3 music_fit.py --calibrate fokus ref1.mp3 ref2.mp3     # rentang kategori diambil dari track yang Irfan setujui
  python3 music_fit.py --measure track.mp3                     # angka mentah saja

Profil: ../../references/music-profiles.json. Keluaran: peringkat, skor 0-100, dan alasan per fitur.
Lulus pakai = skor >= 70 DAN snr_min terpenuhi DAN bpm/onset di dalam rentang kategori (di luar = GUGUR, bukan
penalti). earshot rank wajib jalan; bila tidak terpasang skrip berhenti (gerbang DENGAR, Irfan 8 Nov).
Kandidat < 8 file atau dari < 2 folder sumber = FAIL (aturan 34; gagal: V5 8 Nov, tiga klip memakai satu piano).
Telinga Irfan tetap hakim terakhir.
"""
import argparse, json, os, subprocess, sys
import numpy as np, librosa, pyloudnorm as pyln

HERE = os.path.dirname(os.path.abspath(__file__))
PROFILES = os.path.normpath(os.path.join(HERE, "../../references/music-profiles.json"))
SR = 22050
BANDS = [125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500, 3150, 4000, 5000, 6300, 8000]
MAJOR = np.array([6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88])
MINOR = np.array([6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17])


def load(path, seconds=None):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, *(["-t", str(seconds)] if seconds else []), "-vn",
                          "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True).stdout
    y = np.frombuffer(raw, np.float32).copy()
    if y.size < SR:
        raise SystemExit(f"{path}: audio < 1 dtk atau tidak terbaca")
    return y


def lufs(y):
    return pyln.Meter(SR).integrated_loudness(y.astype(np.float64))


def band_db(y, active=None):
    S = np.abs(librosa.stft(y, n_fft=4096, hop_length=1024)) ** 2
    if active is not None:
        S = S[:, active[: S.shape[1]]]
    f = librosa.fft_frequencies(sr=SR, n_fft=4096)
    p = S.mean(1)
    out = []
    for c in BANDS:
        m = (f >= c / 2 ** (1 / 6)) & (f < c * 2 ** (1 / 6))
        out.append(10 * np.log10(p[m].sum() + 1e-20))
    return np.array(out)


def measure(path, seconds=None):
    y = load(path, seconds)
    tempo, _ = librosa.beat.beat_track(y=y, sr=SR)
    on = librosa.onset.onset_detect(y=y, sr=SR, units="time")
    cen = librosa.feature.spectral_centroid(y=y, sr=SR)[0]
    rms = librosa.feature.rms(y=y, frame_length=SR, hop_length=SR // 2)[0]
    db = 20 * np.log10(rms + 1e-9)
    act = db > db.max() - 40
    sm = np.convolve(db, np.ones(8) / 8, mode="valid")  # ~4 dtk; 'valid' agar tepi file tidak terbaca sebagai build
    w = 16  # 8 dtk dalam hop 0,5 dtk
    build = max([sm[i + w] - sm[i] for i in range(len(sm) - w)] or [0])
    chroma = librosa.feature.chroma_cqt(y=y, sr=SR).mean(1)
    maj = max(np.corrcoef(np.roll(MAJOR, k), chroma)[0, 1] for k in range(12))
    mnr = max(np.corrcoef(np.roll(MINOR, k), chroma)[0, 1] for k in range(12))
    return {
        "file": path, "dur": round(len(y) / SR, 1), "lufs": round(lufs(y), 1),
        "bpm": round(perceived_bpm(float(np.atleast_1d(tempo)[0])), 1),
        "onset": round(len(on) / (len(y) / SR), 2),
        "centroid": round(float(np.median(cen[cen > 0])), 0),
        "build": round(float(build), 1),
        "dyn": round(float(np.percentile(db[act], 90) - np.percentile(db[act], 10)), 1) if act.any() else 0.0,
        "mode": "major" if maj >= mnr else "minor", "mode_margin": round(float(abs(maj - mnr)), 3),
        "_y": y,
    }


def voice_snr(voice_y, music_y, music_level):
    """selisih suara vs musik per pita 500-4000 Hz, musik diskalakan ke level rencana, suara di level aslinya"""
    rms = librosa.feature.rms(y=voice_y, frame_length=4096, hop_length=1024)[0]
    vdb = 20 * np.log10(rms + 1e-9)
    active = vdb > np.percentile(vdb, 95) - 20  # bingkai yang sedang bicara
    v = band_db(voice_y, active)
    m_scaled = music_y * 10 ** ((music_level - lufs(music_y)) / 20)
    m = band_db(m_scaled)
    core = [i for i, c in enumerate(BANDS) if 500 <= c <= 4000]
    snr = v[core] - m[core]
    worst = BANDS[core[int(np.argmin(snr))]]
    return round(float(snr.min()), 1), worst


def in_range(x, lo, hi, scale):
    if lo <= x <= hi:
        return 1.0, ""
    d = (lo - x) if x < lo else (x - hi)
    return max(0.0, 1 - d / scale), ("terlalu rendah" if x < lo else "terlalu tinggi")


def perceived_bpm(raw):
    """pelacak beat sering salah satu oktaf (75 terbaca 152, 128 terbaca 64). Pilih x0,5/x1/x2 yang paling dekat
    ~100 bpm dalam skala log (resonansi tempo yang dirasakan); tidak pernah 'dicocokkan' ke target kategori."""
    cands = [b for b in (raw / 2, raw, raw * 2) if 50 <= b <= 190] or [raw]
    return min(cands, key=lambda b: abs(np.log(b / 100)))


def score(m, prof, snr):
    parts, why, hard = [], [], []
    for k, scale in (("bpm", 25), ("onset", 2.0), ("centroid", 800), ("build", 6), ("dyn", 6)):
        s, note = in_range(m[k], *prof[k], scale)
        parts.append(s)
        if note:
            why.append(f"{k} {m[k]} {note} (target {prof[k][0]}-{prof[k][1]})")
            if k in ("bpm", "onset"):
                hard.append(k)
    if prof["mode"] != "any":
        ok = m["mode"] == prof["mode"] or m["mode_margin"] < 0.03
        parts.append(1.0 if ok else 0.4)
        if not ok:
            why.append(f"mode {m['mode']} (target {prof['mode']})")
    total = 100 * float(np.mean(parts))
    snr_ok, fix = snr is None or snr[0] >= prof["snr_min"], None
    if snr is not None and not snr_ok:
        need = round(prof["snr_min"] - snr[0], 1)
        if need <= 4:  # sama dengan cekungan musik -4 dB di pita suara (audio.md §14.1)
            snr_ok, fix = True, f"EQ musik -{need} dB di {snr[1]} Hz (Q 1,4)"
            why.append(f"benturan dengan suara di {snr[1]} Hz bisa diatasi: {fix}")
        else:
            why.append(f"menutupi suara: selisih {snr[0]} dB di {snr[1]} Hz, butuh {need} dB (> 4 dB cekungan): ganti track, atau turunkan level musik {round(need - 4, 1)} dB lalu EQ -4 dB bila kategori masih terasa")
    return round(total), snr_ok, why, fix, hard


def earshot_rank(query, paths):
    try:
        out = subprocess.run(["earshot", "rank", query, *paths, "--json"], capture_output=True, text=True, timeout=900)
        res = json.loads(out.stdout)
        items = res.get("results") or res.get("ranked") or []
        return {os.path.abspath(r.get("path", r.get("file", ""))): r.get("z") for r in items}
    except Exception as e:  # gerbang DENGAR: tidak boleh dilewati diam-diam (gagal: V5 8 Nov, earshot_z null)
        raise SystemExit(f"FAIL earshot rank tidak jalan ({e.__class__.__name__}: {e}). Pasang earshot "
                         "(three-segment-gate.md gerbang DENGAR) atau lapor ke Irfan; jangan pilih musik tanpa didengar.")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("files", nargs="*")
    ap.add_argument("--category"); ap.add_argument("--voice", help="audio/video pembicara atau VO (untuk cek benturan)")
    ap.add_argument("--duration", type=float, help="durasi video (dtk); track lebih pendek ditandai")
    ap.add_argument("--no-earshot", action="store_true", help="HANYA untuk uji alat; laporan ditandai TANPA-DENGAR = FAIL di Delivery Gate")
    ap.add_argument("--calibrate", metavar="KATEGORI"); ap.add_argument("--measure", action="store_true")
    ap.add_argument("--profiles", default=PROFILES); ap.add_argument("--json")
    a = ap.parse_args()
    profiles = json.load(open(a.profiles))

    if a.measure:
        for f in a.files:
            m = measure(f); m.pop("_y"); print(json.dumps(m, ensure_ascii=False))
        return

    if a.calibrate:
        ms = [measure(f) for f in a.files]
        p = profiles[a.calibrate]
        for k in ("bpm", "onset", "centroid", "build", "dyn"):
            v = np.array([m[k] for m in ms]); pad = 0.1 * max(v.max() - v.min(), 1e-6) + (2 if k == "bpm" else 0)
            lo = 0.0 if k in ("build", "dyn") else round(float(v.min() - pad), 2)  # build/dyn: hanya batas atas
            p[k] = [lo, round(float(v.max() + pad), 2)]
        modes = {m["mode"] for m in ms}; p["mode"] = modes.pop() if len(modes) == 1 else "any"
        p["kalibrasi"] = {"sumber": [os.path.basename(f) for f in a.files], "n": len(ms)}
        json.dump(profiles, open(a.profiles, "w"), ensure_ascii=False, indent=2)
        print(f"kategori {a.calibrate} dikalibrasi dari {len(ms)} referensi:", {k: p[k] for k in ("bpm", "onset", "centroid", "build", "dyn", "mode")})
        if len(ms) < 3:
            print("PERINGATAN: < 3 referensi, rentang masih sempit; tambah referensi sebelum dipercaya.")
        return

    if a.category not in profiles or a.category.startswith("_"):
        raise SystemExit(f"--category salah satu dari: {[k for k in profiles if not k.startswith('_')]}")
    prof = profiles[a.category]
    voice = load(a.voice, 180) if a.voice else None
    pool_fail = []
    if len(a.files) < 8:
        pool_fail.append(f"kandidat {len(a.files)} < 8")
    if len({os.path.dirname(os.path.abspath(f)) for f in a.files}) < 2:
        pool_fail.append("kandidat dari < 2 folder sumber")
    es = {} if a.no_earshot else earshot_rank(prof["query"], [os.path.abspath(f) for f in a.files])
    rows = []
    for f in a.files:
        m = measure(f, 180)
        snr = voice_snr(voice, m["_y"], prof["level"]) if voice is not None else None
        s, ok, why, fix, hard = score(m, prof, snr)
        if a.duration and m["dur"] < a.duration:
            why.append(f"durasi {m['dur']} < video {a.duration} (perlu loop/sambung)")
        m.pop("_y")
        rows.append({**m, "score": s, "snr": snr[0] if snr else None, "snr_ok": ok, "eq_fix": fix, "why": why,
                     "gugur": hard, "earshot_z": es.get(os.path.abspath(f))})
    rows.sort(key=lambda r: (not r["gugur"], r["snr_ok"], r["score"]), reverse=True)
    if pool_fail:
        print("FAIL kumpulan kandidat: " + "; ".join(pool_fail) + " (cari dari Epidemic, ElevenLabs Music, internet berlisensi, folder Irfan)")
    if a.no_earshot:
        print("TANPA-DENGAR: earshot dimatikan dengan --no-earshot; laporan ini tidak sah untuk Delivery Gate")
    print(f"Kategori: {a.category} ({prof['arti']}) · profil {'terkalibrasi ' + str(prof['kalibrasi']['n']) + ' ref' if prof.get('kalibrasi') else 'awal (belum dikalibrasi)'}")
    print(f"{'#':>2} {'skor':>4} {'snr':>5}  {'bpm':>5} {'onset':>5} {'cent':>5} {'build':>5} {'dyn':>4} {'mode':>5}  file")
    for i, r in enumerate(rows, 1):
        verdict = ("GUGUR " + "/".join(r["gugur"]) if r["gugur"] else
                   ("PAKAI + EQ" if r["eq_fix"] else "PAKAI") if r["score"] >= 70 and r["snr_ok"] else "tolak")
        print(f"{i:>2} {r['score']:>4} {str(r['snr']):>5}  {r['bpm']:>5} {r['onset']:>5} {r['centroid']:>5.0f} {r['build']:>5} {r['dyn']:>4} {r['mode']:>5}  {os.path.basename(r['file'])}  [{verdict}]"
              + (f"  earshot z {r['earshot_z']}" if r["earshot_z"] is not None else ""))
        for w in r["why"]:
            print(f"      - {w}")
    if a.json:
        json.dump({"category": a.category, "profile": prof, "pool_fail": pool_fail, "earshot": not a.no_earshot,
                   "ranked": rows}, open(a.json, "w"), ensure_ascii=False, indent=2)
    if pool_fail:
        sys.exit(1)


if __name__ == "__main__":
    main()
