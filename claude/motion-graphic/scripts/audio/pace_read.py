#!/usr/bin/env python3
"""Baca tempo video lalu usulkan kategori suasana untuk audio (aturan 45).

Audio mengikuti video, bukan selera: pembicara cepat + cut rapat = musik cepat (energi);
penjelasan tenang + cut jarang = musik tenang (fokus); pelan dan jarang = slowdown.
Isi (masalah/ancaman = tegang, harapan/CTA = hangat) tetap diputuskan dari naskah.

Pakai:  python3 pace_read.py video.mp4 [--words words.json] [--json out.json]
        words.json = daftar kata STT [{"start":..,"end":..,"word":..}] (faster-whisper); tanpa itu,
        laju bicara memakai proxy suku kata yang kasar (musik ikut terhitung).
Keluaran: cut/menit, panjang shot, gerak layar, laju bicara, kategori usulan + rentang bpm musik.
Ambang awal diturunkan dari 6 video referensi Irfan (6 Nov); lihat audio.md §14.0A.
"""
import argparse, json, re, subprocess
import numpy as np


def cuts(path):
    err = subprocess.run(["ffmpeg", "-hide_banner", "-i", path, "-vf", "select='gt(scene,0.30)',showinfo", "-an",
                          "-f", "null", "-"], capture_output=True, text=True).stderr
    return [float(t) for t in re.findall(r"pts_time:([\d.]+)", err)]


def duration(path):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path],
                                capture_output=True, text=True).stdout)


def motion(path):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-vf", "fps=6,scale=64:64,format=gray", "-f", "rawvideo",
                          "-"], capture_output=True).stdout
    f = np.frombuffer(raw, np.uint8).reshape(-1, 64, 64).astype(np.float32)
    d = np.abs(np.diff(f, axis=0)).mean((1, 2))
    import scipy.signal as ss
    pk, _ = ss.find_peaks(d, prominence=4, distance=2)  # event visual: cut, pop, slam, ganti grafik
    # median: cut tunggal tidak menaikkan angka, gerak terus-menerus menaikkan
    return float(np.median(d)), 60 * len(pk) / (len(f) / 6)


def speech_rate(path, words):
    if words:
        w = json.load(open(words)); w = w.get("words", w) if isinstance(w, dict) else w
        span = sum(min(x["end"] - x["start"], 1.0) for x in w)
        return len(w) / max(span, 1e-6) * 1.0, "kata/dtk (STT)"
    import librosa, scipy.signal as ss
    sr = 16000
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-vn", "-ac", "1", "-ar", str(sr), "-f", "f32le", "-"],
                         capture_output=True).stdout
    y = np.frombuffer(raw, np.float32).copy()
    b, a = ss.butter(4, [300 / (sr / 2), 3400 / (sr / 2)], "band")
    H, _ = librosa.effects.hpss(ss.filtfilt(b, a, y))
    e = librosa.feature.rms(y=H, frame_length=400, hop_length=160)[0]
    edb = 20 * np.log10(np.maximum(ss.savgol_filter(e, 9, 2), 1e-9)); thr = np.percentile(edb, 97) - 18
    pk, _ = ss.find_peaks(edb, distance=10, prominence=3, height=thr)
    return len(pk) / max((edb > thr).sum() / 100, 1e-6), "suku kata/dtk (proxy kasar)"


def classify(cpm, mot, rate, unit, ev=0.0):
    stt = unit.startswith("kata")
    fast_speech = rate >= (2.8 if stt else 4.8)
    slow_speech = rate <= (2.0 if stt else 3.5)
    if cpm >= 15 or ev >= 65 or (fast_speech and mot >= 6):  # ev: motion tanpa cut (referensi cepat 66-73/menit)
        return "energi", [100, 140], "cut rapat / bicara cepat: musik harus menyaingi tempo"
    if cpm < 6 and mot < 3 and slow_speech:
        return "slowdown", [55, 85], "cut jarang, layar tenang, bicara pelan"
    return "fokus", [70, 100], "tempo sedang: musik menemani, tidak mendorong"


def main():
    ap = argparse.ArgumentParser(); ap.add_argument("video"); ap.add_argument("--words"); ap.add_argument("--json")
    a = ap.parse_args()
    dur = duration(a.video); c = cuts(a.video); cpm = 60 * len(c) / dur
    shots = np.diff([0] + c + [dur]); mot, ev = motion(a.video); rate, unit = speech_rate(a.video, a.words)
    cat, bpm, why = classify(cpm, mot, rate, unit, ev)
    print(f"{a.video}\n  durasi {dur:.1f} dtk · cut {len(c)} = {cpm:.1f}/menit · shot median {np.median(shots):.1f} dtk"
          f"\n  gerak layar {mot:.1f} · event visual {ev:.0f}/menit (motion tanpa cut: pakai angka ini, bukan cut) · laju bicara {rate:.1f} {unit}"
          f"\n  usulan kategori: {cat} ({why}) · musik {bpm[0]}-{bpm[1]} bpm"
          f"\n  cek isi naskah: masalah/ancaman -> tegang, harapan/CTA -> hangat (bisa per babak)")
    if a.json:
        json.dump({"video": a.video, "dur": dur, "cuts_per_min": cpm, "shot_median": float(np.median(shots)),
                   "motion": mot, "visual_events_per_min": ev, "speech_rate": rate, "unit": unit, "category": cat, "music_bpm": bpm}, open(a.json, "w"))


if __name__ == "__main__":
    main()
