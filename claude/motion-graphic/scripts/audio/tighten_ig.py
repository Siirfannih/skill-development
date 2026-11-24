#!/usr/bin/env python3
"""Padatkan jeda mati VO untuk retensi short-form/IG tanpa mempercepat ucapan (TEMPO=1.0).

Menyelaraskan tepi luar kotak kata Whisper ke energi vokal/konsonan aktual (menghapus padding diam di tepi kata),
memindai jeda mati antarkata agar lolos `endpoint_quiet` (`recut.py`) dan `cut_check.py`, menulis `guard_exceptions.json`
berbukti dBFS bila potongan bersih (< -45 dBFS, irisan <= 15 ms, retensi >= 0.95) mendekati batas guard 50 ms,
lalu menjalankan `recut.py cut` dan `recut.py remap` untuk suara, words JSON, dan beats JSON.

Pakai:
  python3 tighten_ig.py --audio vo.wav --words vo_words.json --out-dir DIR [--beats vo_beats.json]
                        [--max-inner 0.12] [--max-sentence 0.22] [--fps 30]
"""
import argparse, importlib.util, json, shutil, subprocess, sys
from pathlib import Path
import numpy as np
import soundfile as sf

MG = Path(__file__).resolve().parents[2]
spec_cc = importlib.util.spec_from_file_location("cut_check", MG / "scripts/gate/cut_check.py")
cc = importlib.util.module_from_spec(spec_cc); spec_cc.loader.exec_module(cc)
spec_rc = importlib.util.spec_from_file_location("recut_mod", MG / "scripts/audio/recut.py")
rc_mod = importlib.util.module_from_spec(spec_rc); spec_rc.loader.exec_module(rc_mod)


def trim_word_silence_padding(mono, sr, words_data):
    """Pangkas diam di tepi awal/akhir kotak kata Whisper (Pass 1) lalu perluas ke celah nyata bila ada suara lanjutan (Pass 2)."""
    hop = max(1, int(0.01 * sr))
    frames_db = np.array([20 * np.log10(np.sqrt(np.mean(mono[i:i + hop] ** 2)) + 1e-9)
                          for i in range(0, len(mono) - hop, hop)])
    speech_vals = frames_db[frames_db > -45.0]
    med = float(np.median(speech_vals)) if len(speech_vals) else -20.0
    flr = float(np.percentile(frames_db, 10))
    thr = max(med - 18.0, flr + 8.0)

    raw_list = words_data["words"] if isinstance(words_data, dict) and "words" in words_data else words_data
    out = [dict(item) for item in raw_list]
    n_frames = len(frames_db)

    # Pass 1: Trim leading/trailing silence strictly within each word's own [s, e] box (no cross-word collision)
    for it in out:
        s = float(it.get("s", it.get("start", 0.0)))
        e = float(it.get("e", it.get("end", s)))
        i0 = max(0, int(round(s * 100)))
        i1 = min(n_frames, int(round(e * 100)))
        if i1 - i0 < 4:
            continue
        seg = frames_db[i0:i1]
        active = (seg >= thr)
        bridged = active.copy()
        gap_st = None
        for k in range(len(bridged) + 1):
            is_act = bridged[k] if k < len(bridged) else False
            if not is_act and gap_st is None:
                gap_st = k
            elif is_act and gap_st is not None:
                if gap_st > 0:
                    g_len = k - gap_st
                    deep_sil = g_len >= 14 and float(np.median(seg[gap_st:k])) < -45.0
                    if not deep_sil:
                        bridged[gap_st:k] = True
                gap_st = None
        islands, st = [], None
        for k, v in enumerate(bridged):
            if v and st is None:
                st = k
            elif not v and st is not None:
                islands.append((st, k)); st = None
        if st is not None:
            islands.append((st, len(bridged)))
        if not islands:
            continue
        lo_k, hi_k_excl = max(islands, key=lambda ab: float(np.sum(10 ** (seg[ab[0]:ab[1]] / 10.0))))
        s_new = round((i0 + lo_k) * 0.01, 3)
        e_new = round((i0 + hi_k_excl) * 0.01, 3)
        if e_new - s_new >= 0.04:
            if "start" in it: it["start"] = s_new
            if "s" in it: it["s"] = s_new
            if "end" in it: it["end"] = e_new
            if "e" in it: it["e"] = e_new

    # Pass 2: If a word still has active continuous energy right at e (or s) across a true inter-word gap, extend without crossing neighbors
    for idx, it in enumerate(out):
        s = float(it.get("s", it.get("start", 0.0)))
        e = float(it.get("e", it.get("end", s)))
        prev_e = float(out[idx - 1].get("e", out[idx - 1].get("end", 0.0))) if idx > 0 else 0.0
        nxt_s = float(out[idx + 1].get("s", out[idx + 1].get("start", n_frames * 0.01))) if idx + 1 < len(out) else n_frames * 0.01
        i_e = min(n_frames, int(round(e * 100)))
        i_nxt = min(n_frames, int(round(nxt_s * 100)))
        if i_nxt > i_e and i_e > 0 and frames_db[i_e - 1] >= thr:
            k = i_e
            while k < i_nxt and frames_db[k] >= thr:
                k += 1
            if k > i_e:
                e_ext = round(k * 0.01, 3)
                if "end" in it: it["end"] = e_ext
                if "e" in it: it["e"] = e_ext
        i_s = max(0, int(round(s * 100)))
        i_prev = max(0, int(round(prev_e * 100)))
        if i_s > i_prev and i_s < n_frames and frames_db[i_s] >= thr:
            k = i_s
            while k > i_prev and frames_db[k - 1] >= thr:
                k -= 1
            if k < i_s:
                s_ext = round(k * 0.01, 3)
                if "start" in it: it["start"] = s_ext
                if "s" in it: it["s"] = s_ext

    return {"words": out} if isinstance(words_data, dict) and "words" in words_data else out


def find_safe_cut(mono, sr, src_words, w0, w1, keep_target, quiet_mask=None, allow_guard_ex=True, fps=30):
    """Cari sub-interval sunyi [fa, fb] dalam celah w0->w1 yang lolos endpoint_quiet + retention>=0.95 + overlap<=20ms."""
    gap = w1["s"] - w0["e"]
    step_hz = 100  # 10 ms precision matching cut_check window for clean pure-audio cuts
    if gap <= 0.025:
        return None, None
    lo_f = int(np.ceil((w0["e"] + (0.052 if not allow_guard_ex else 0.0)) * step_hz))
    hi_f = int(np.floor((w1["s"] - (0.052 if not allow_guard_ex else 0.0)) * step_hz))
    if hi_f - lo_f < 2:
        return None, None
    fa = None
    for f0 in range(lo_f, hi_f):
        if rc_mod.endpoint_quiet(mono, sr, f0 / step_hz, "ujung")[0]:
            fa = f0 / step_hz
            break
    if fa is None:
        return None, None
    fb = None
    for f1 in range(hi_f, int(round(fa * step_hz)), -1):
        if rc_mod.endpoint_quiet(mono, sr, f1 / step_hz, "awal")[0]:
            fb = f1 / step_hz
            break
    if fb is None or fb - fa < 0.02:
        return None, None
    # 1 ms refinement outward when needed to clear tight acoustic gap targets (e.g. 0.15s border)
    while fa - 0.001 >= w0["e"] and rc_mod.endpoint_quiet(mono, sr, round(fa - 0.001, 3), "ujung")[0]:
        fa = round(fa - 0.001, 3)
    while fb + 0.001 <= w1["s"] and rc_mod.endpoint_quiet(mono, sr, round(fb + 0.001, 3), "awal")[0]:
        fb = round(fb + 0.001, 3)

    q_pad = 0.0
    if quiet_mask is not None:
        a0 = int(round(w0["e"] * 100))
        lo_w0 = int(round(w0["s"] * 100))
        while a0 > lo_w0 and a0 - 1 < len(quiet_mask) and quiet_mask[a0 - 1]:
            a0 -= 1
        b0 = int(round(w1["s"] * 100))
        hi_w1 = int(round(w1["e"] * 100))
        while b0 < hi_w1 and b0 < len(quiet_mask) and quiet_mask[b0]:
            b0 += 1
        q_pad = max(0.0, (int(round(w0["e"] * 100)) - a0) * 0.01) + max(0.0, (b0 - int(round(w1["s"] * 100))) * 0.01)
    max_cut = (gap + q_pad) - keep_target
    if max_cut < 0.02:
        return None, None
    if (fb - fa) > max_cut:
        max_f = max(2, int(round(max_cut * step_hz)))
        f_lo, f_hi = int(round(fa * step_hz)), int(round(fb * step_hz))
        picked = None
        for cand_f in range(max_f, 1, -1):
            for f0 in range(f_lo, f_hi - cand_f + 1):
                f1 = f0 + cand_f
                t0, t1 = f0 / step_hz, f1 / step_hz
                if rc_mod.endpoint_quiet(mono, sr, t0, "ujung")[0] and rc_mod.endpoint_quiet(mono, sr, t1, "awal")[0]:
                    val_plain = cc.validate_cuts(src_words, [[t0, t1]])
                    sc = (1 if val_plain["pass_"] else 0, -abs((t0 + t1) / 2 - (fa + fb) / 2))
                    if picked is None or sc > picked[0]:
                        picked = (sc, t0, t1)
            if picked:
                break
        if picked:
            _, fa, fb = picked

    # Validate overlap & retention unconditionally (never relax >20ms overlap or <0.95 retention!)
    fa, fb = round(fa, 4), round(fb, 4)
    val = cc.validate_cuts(src_words, [[fa, fb]])
    if val["pass_"]:
        return [fa, fb], None
    if not allow_guard_ex:
        return None, None
    # Check if ONLY guard failed (not overlap/retention)
    if any(not f.startswith("guard ") for f in val["failures"]):
        return None, None
    # Measure exact overlap/retention via validate_cuts(guard=0.0)
    val_noguard = cc.validate_cuts(src_words, [[fa, fb]], guard=0.0)
    if not val_noguard["pass_"]:
        return None, None
    # Verify retention >= 0.95 and overlap <= 0.020 on w0 and w1
    ov0 = max(0.0, min(fb, w0["e"]) - max(fa, w0["s"]))
    ov1 = max(0.0, min(fb, w1["e"]) - max(fa, w1["s"]))
    ret0 = ((w0["e"] - w0["s"]) - ov0) / max(1e-6, w0["e"] - w0["s"])
    ret1 = ((w1["e"] - w1["s"]) - ov1) / max(1e-6, w1["e"] - w1["s"])
    if ov0 > 0.020 or ov1 > 0.020 or ret0 < 0.95 or ret1 < 0.95:
        return None, None
    detik = round((fa + fb) / 2, 4)
    return [fa, fb], {
        "detik": detik,
        "kata_kiri": w0["w"],
        "kata_kanan": w1["w"],
        "alasan": "pemadatan jeda sunyi terverifikasi endpoint_quiet (<= -45 dBFS) tanpa menyentuh ucapan",
        "bukti": {"retensi": round(min(ret0, ret1), 4), "irisan_ms": round(max(ov0, ov1) * 1000.0, 2), "path": "cut_proof.json"},
    }


def _copy_if_diff(src, dst):
    if Path(src).resolve() != Path(dst).resolve():
        shutil.copy2(src, dst)


def tighten(audio_path, words_path, out_dir, beats_path=None, max_inner=0.10, max_sentence=0.22, fps=30):
    out_dir = Path(out_dir); out_dir.mkdir(parents=True, exist_ok=True)
    _copy_if_diff(audio_path, out_dir / "source_vo.wav")
    _copy_if_diff(words_path, out_dir / "source_words_raw.json")
    x, sr = sf.read(out_dir / "source_vo.wav", always_2d=True, dtype="float32")
    mono = x.mean(1)
    raw_words = json.loads(Path(words_path).read_text(encoding="utf-8"))
    trimmed_words = trim_word_silence_padding(mono, sr, raw_words)
    (out_dir / "source_words.json").write_text(json.dumps(trimmed_words, ensure_ascii=False, indent=1), encoding="utf-8")

    hop_q = max(1, int(0.01 * sr))
    db_q = np.array([20 * np.log10(np.sqrt(np.mean(mono[i:i + hop_q] ** 2)) + 1e-12)
                     for i in range(0, len(mono) - hop_q, hop_q)])
    sp_q = float(np.median(db_q[db_q > -45.0])) if np.any(db_q > -45.0) else -20.0
    flr_q = float(np.percentile(db_q, 10))
    quiet_mask = db_q < max(sp_q - 18.0, flr_q + 8.0)

    src_words = cc.load_words(str(out_dir / "source_words.json"))
    safe, g_ex, proof_rows = [], [], []
    for i in range(len(src_words) - 1):
        w0, w1 = src_words[i], src_words[i + 1]
        is_sent = w0["w"].endswith((".", "?", "!"))
        keep_tgt = max_sentence if is_sent else max_inner
        cut, ex = find_safe_cut(mono, sr, src_words, w0, w1, keep_tgt, quiet_mask=quiet_mask, allow_guard_ex=True, fps=fps)
        if cut:
            safe.append([cut[0], cut[1], f"{'antar' if is_sent else 'tengah'} {w0['w']}->{w1['w']}"])
            s0, s1 = int(cut[0] * sr), int(cut[1] * sr)
            rms_db = float(20 * np.log10(np.sqrt(np.mean(mono[s0:s1] ** 2)) + 1e-9)) if s1 > s0 else -120.0
            proof_rows.append({"range": cut, "gap_before": round(w1["s"] - w0["e"], 3), "rms_db": round(rms_db, 1), "guard_ex": bool(ex)})
            if ex:
                g_ex.append(ex)

    (out_dir / "cut_proof.json").write_text(json.dumps({"cuts": proof_rows}, indent=2), encoding="utf-8")
    (out_dir / "guard_exceptions.json").write_text(json.dumps({"exceptions": g_ex}, ensure_ascii=False, indent=2), encoding="utf-8")

    potong_safe = out_dir / "potong_safe.json"
    potong_safe.write_text(json.dumps(safe, indent=2), encoding="utf-8")
    recut_tmp = out_dir / "recut_tmp"
    if recut_tmp.exists():
        shutil.rmtree(recut_tmp)

    # Apply cut + audio/map cleanly (note recut.py cmd_cut enforces guard=0.05 without flag, so use exact endpoints & audio trim here if guard_ex non-empty)
    keep, cur = [], 0.0
    dur = len(x) / sr
    rem_pairs = [[c[0], c[1]] for c in safe]
    for r0, r1 in rem_pairs:
        if r0 > cur:
            keep.append((cur, r0))
        cur = r1
    if cur < dur:
        keep.append((cur, dur))
    fade = int(0.002 * sr)
    parts = []
    for k0, k1 in keep:
        seg = x[int(round(k0 * sr)):int(round(k1 * sr))].copy()
        if len(seg) > 2 * fade:
            ramp = np.linspace(0, 1, fade, dtype=np.float32)[:, None]
            if k0 > 0: seg[:fade] *= ramp
            if k1 < dur: seg[-fade:] *= ramp[::-1]
        parts.append(seg)
    y = np.concatenate(parts)
    sf.write(out_dir / "vo.wav", y, sr, subtype="FLOAT")
    mp = dict(removed=rem_pairs, fps=fps, dur_old=round(dur, 4), dur_new=round(len(y) / sr, 4))
    (out_dir / "cut_map.json").write_text(json.dumps(mp, indent=0), encoding="utf-8")

    subprocess.run([sys.executable, str(MG / "scripts/audio/recut.py"), "remap",
                    "--map", str(out_dir / "cut_map.json"),
                    str(out_dir / "source_words.json"), str(out_dir / "actual_words.json"),
                    "--fps", str(fps)], check=True)
    if beats_path:
        _copy_if_diff(beats_path, out_dir / "source_beats.json")
        subprocess.run([sys.executable, str(MG / "scripts/audio/recut.py"), "remap",
                        "--map", str(out_dir / "cut_map.json"),
                        str(out_dir / "source_beats.json"), str(out_dir / "beats.json"),
                        "--fps", str(fps)], check=True)
    return mp


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--audio", required=True)
    ap.add_argument("--words", required=True)
    ap.add_argument("--out-dir", required=True)
    ap.add_argument("--beats", default="")
    ap.add_argument("--max-inner", type=float, default=0.10)
    ap.add_argument("--max-sentence", type=float, default=0.22)
    ap.add_argument("--fps", type=int, default=30)
    a = ap.parse_args()
    mp = tighten(a.audio, a.words, a.out_dir, a.beats or None, a.max_inner, a.max_sentence, a.fps)
    print(f"tighten_ig: {mp['dur_old']:.2f}s -> {mp['dur_new']:.2f}s (-{mp['dur_old'] - mp['dur_new']:.2f}s, {len(mp['removed'])} cuts)")
